/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-label-var */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
  Tabs,
  Tooltip,
  message,
} from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";

function Bleaching_Bmr_Summary() {
  const role = localStorage.getItem("role");
  const [checkedItems, setCheckedItems] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [bmrList, setBmrList] = useState([]);
  const elementRef = useRef(null);
  // states of Product Details
  const [chemicalDate, setChemicalDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [pd_BatchQuantity, setPd_BatchQuantity] = useState("");
  const [pd_Mixing, setPd_Mixing] = useState("");
  const [pd_BatchQty1, setPd_BatchQty1] = useState("");
  const [pd_ID, setPd_ID] = useState("");
  const [pd_BatchQty2, setPd_BatchQty2] = useState("");
  const [pd_StartSub, setPd_StartSub] = useState("");
  const [pd_EndSub, setPd_EndSub] = useState("");
  const [pd_qaStatus, setPd_QaStatus] = useState("");
  const [pd_prodStatus, setPd_ProdStatus] = useState("");
  const [pd_status, setPd_Status] = useState("");
  const [pd_qaId, setPd_QaId] = useState("");
  const [pd_ManufacturingStartDate, setPd_ManufacturingStartDate] =
    useState("");
  const [pd_ManufacturingStartTime, setPd_ManufacturingStartTime] =
    useState("");
  const [pd_ManufacturingCompletionDate, setPd_ManufacturingCompletionDate] =
    useState("");
  const [pd_ManufacturingCompletionTime, setPd_ManufacturingCompletionTime] =
    useState("");
  const [pd_ProductsupplyInhouse, setpd_ProductsupplyInhouse] = useState("");
  const [pd_ProductsupplyExport, setpd_ProductsupplyExport] = useState("");
  const [pd_finish_Crish, setpd_pd_finish_Crish] = useState("");
  const [pd_FinishSoft, setpd_FinishSoft] = useState("");


  const [enclosure1Status, setEnclosure1Status] = useState("");
  const [enclosure2Status, setEnclosure2Status] = useState("");
  const [enclosure3Status, setEnclosure3Status] = useState("");

  const [signatureValues, setSignatureValues] = useState({});
  const [dateValues, setDateValues] = useState({});
  const [process_id, setProcessId] = useState("");
  const [localDateValue, setLocaldateValue] = useState("");
  const [localDateValue4, setLocaldateValue4] = useState("");
  const [localDateValue2, setLocaldateValue2] = useState("");
  const [localDateValue3, setLocaldateValue3] = useState("");
  const [localDateValue5, setLocaldateValue5] = useState("");
  const [localDateValue6, setLocaldateValue6] = useState("");

  const [postprodSup, setPostProdSup] = useState(false);
  const [postprodQa, setPostProdQa] = useState(false);
  const [postprodHod, setPostProdHod] = useState(false);
  const [postProdSubmitStatus, setPostProdSubmitStatus] = useState("");

  //pde
  const [pecs_State, setPecs_State] = useState(false);
  const [pecsStateArray, setPecsStateArray] = useState([]);
  const [printValidation, setPrintValidation] = useState(false);
  const [pecsNewVerified, setpecsNewVerified] = useState("");
  const [pecsNewVerifiedDate, setpecsNewVerifiedDate] = useState("");
  const [bmrStore, setBmrStore] = useState();
  const [qaReleaseStore, setQaReleaseStore] = useState();
  const [qualityReleaseStore, setQualityReleaseStore] = useState();
  const [qaStatus, setQastatus] = useState(false);
  const [pdeD, setPdeD] = useState("");
  const [pdeRev, setPdeRev] = useState("");
  const [newDate, setNewDate] = useState("");
  const [supervisorOnlyVerification, setSupervisorOnlyVerifcation] =
    useState(false);
  const [supervisorOnlyMs, setSupervisorOnlyMs] = useState(false);
  const [supervisorOnlyMop, setSupervisorOnlyMop] = useState(false);
  const [qaReleaseSave, setQaReleaseSave] = useState(false);
  const [qaReleaseSubmit, setQaReleaseSubmit] = useState(false);

  const [tabKey, setTabKey] = useState("");
  const [pd_disable, setPd_Disable] = useState(false);
  // raw cotton
  const [rawCottonSupStatus, setRawCottonSupStatus] = useState(false);
  const [rawCottonQaStatus, setRawCottonQaStatus] = useState(false);
  const [freezeEnclosueSup, setFreezeEnclosureSup] = useState(false);
  const [freezeEnclosureQa, setFreezeEnclosureQa] = useState(false);

  //States for Verification Records Ended Here

  const [signatures, setSignatures] = useState({});
  //Machine Operating Parameters starts
  const [MOP_ASB_Observation, setMOP_ASB_Observation] = useState("");
  const [MOP_FDS_Observation, setMOP_FDS_Observation] = useState("");
  const [MOP_MDS_Observation, setMOP_MDS_Observation] = useState("");
  const [MOP_GLP_Line1_Observation, setMOP_GLP_Line1_Observation] =
    useState("");
  const [MOP_GLP_Line2_Observation, setMOP_GLP_Line2_Observation] =
    useState("");
  const [MOP_ERM_Line1_Observation, setMOP_ERM_Line1_Observation] =
    useState("");
  const [MOP_ERM_Line2_Observation, setMOP_ERM_Line2_Observation] =
    useState("");
  const [MOP_CPHP_Observation, setMOP_CPHP_Observation] = useState("");
  const [MOP_CPSWT_Observation, setMOP_CPSWT_Observation] = useState("");
  const [MOP_HET_Line1_Observation, setMOP_HET_Line1_Observation] =
    useState("");
  const [MOP_HET_Line2_Observation, setMOP_HET_Line2_Observation] =
    useState("");
  const [MOP_COS_SLS_Observation, setMOP_COS_SLS_Observation] = useState("");
  const [MOP_COS_Stripper_Observation, setMOP_COS_Stripper_Observation] =
    useState("");
  const [MOP_COS_FRS_Observation, setMOP_COS_FRS_Observation] = useState("");
  const [MOP_COS_OCS_Observation, setMOP_COS_OCS_Observation] = useState("");
  const [MOP_DS_IMSP_Observation, setMOP_DS_IMSP_Observation] = useState("");
  const [MOP_DS_CS_Observation, setMOP_DS_CS_Observation] = useState("");
  const [MOP_DS_SMV_Observation, setMOP_DS_SMV_Observation] = useState("");
  const [MOP_FOS_FRS_Line1_Observation, setMOP_FOS_FRS_Line1_Observation] =
    useState("");
  const [MOP_FOS_FRS_Line2_Observation, setMOP_FOS_FRS_Line2_Observation] =
    useState("");
  const [MOP_FOS_BRS_Line1_Observation, setMOP_FOS_BRS_Line1_Observation] =
    useState("");
  const [MOP_FOS_BRS_Line2_Observation, setMOP_FOS_BRS_Line2_Observation] =
    useState("");
  const [
    MOP_AS_ReferSOP_Line1_Observation,
    setMOP_AS_ReferSOP_Line1_Observation,
  ] = useState("");
  const [
    MOP_AS_ReferSOP_Line2_Observation,
    setMOP_AS_ReferSOP_Line2_Observation,
  ] = useState("");

  const [freeText, setFreeText] = useState("");


  const [bmr, setBmr] = useState("");
  const [fieldsDisabled, setFieldsDisabled] = useState({
    qaInspector: false,
    qaManager: false,
  });



  const [pdeDate, setPdeDate] = useState("");
  const [pdeDate2, setPdeDate2] = useState("");


  const [rawReceivedBy, setRawReceivedBy] = useState("");
  const [rawIssuedBy, setRawIssuedBy] = useState("");
  const token = localStorage.getItem("token");
  const [pdeArray, setPdeArray] = useState();
  const [laydownNo, setLaydownNo] = useState("");
  const [rawCottonIssue, setRawCottonIssue] = useState();
  const [rawweightTotal, setRawWeightTotal] = useState("");
  const [rawweightTotalBaleWeight, setRawWeightTotalBaleWeight] = useState("");


  const [listofEnclosuresArray, setListOfEnclosuresArray] = useState([]);



  const [bmrSummary, setBmrSummary] = useState([]);
  const [chemicalDetailsArray, setChemicalDetailsArray] = useState([]);
  const [packingMaterialsArray, setPackingMaterialsArray] = useState([]);
  const [rawCottonStatus, setRawCottonStatus] = useState(false);
  const [rawCottonStore, setRawCottonStore] = useState();

  const [messageApi, contextHolder] = useMessage();
  const [printBtnEnable, setPrintBtnEnable] = useState(false);
  const [bleachingJobCard, setBlechingJobCard] = useState();
  const [batchLov, setBatchLov] = useState([]);
  const [bleachingModal, setBleachingModal] = useState(false);
  const [batchNoNew, setBatchNoNew] = useState("");
  const [bmrStatus, setBmrStatus] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [verificationArray, setVerificationArray] = useState();
  const [manufacturingStepsStatus, setManufacturingStepsStatus] =
    useState(false);
  const [manufacturingStepsArray, setManufacturingStepsArray] = useState([]);
  const [manufacturingParameterStatus, setManufacturingParameterStatus] =
    useState(false);
  const [manufacturingParametersArray, setManufacturingParametersArray] =
    useState();
  const [manufacturingParametersStore, setManufacturingParametersStore] =
    useState();
  const [processDeviationStatus, setProcessDeviationStatus] = useState(false);
  const [processDeviationArray, setProcessDeviationArray] = useState();
  const [postprodStatus, setPostProdStatus] = useState(false);
  const [postProdArrayNew, setPostProdArrayNew] = useState();
  const [productReleaseStatus, setProductReleaseStatus] = useState(false);
  const [productReleaseArray, setProductReleaseArray] = useState();
  const [listOfEnclosureStatus, setListOfEnclosureStatus] = useState(false);
  const [listOfEnclosureStore, setListOfEnclosureStore] = useState();
  const [stoppageDetailsStatus, setStoppageDetailsStatus] = useState(false);
  const [stoppageDetailsStore, setStoppageDetailsStore] = useState();
  const [hodEditable, setHodEditable] = useState(false);
  const [listOf, setListOf] = useState({
    bleaching: false,
    annexure: false,
    freetext: false,
    summary_record_id1: "",
    enclosureId1: "",
    summary_record_id2: "",
    enclosureId2: "",
    summary_record_id3: "",
    enclosureId3: "",
  });
  const [loggedInSupervisor, setLoggedInSupervisor] = useState(false);
  const [loggedInQa, setLoggedInQa] = useState(false);
  const [loggedInHod, setLoggedInHod] = useState(false);

  const username = role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
    role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  const usernameHod =
    role === "ROLE_HOD" || role === "ROLE_DESIGNEE"
      ? localStorage.getItem("username")
      : "";



  let usernameQADESANDMAN = "";
  if (role == "QA_DESIGNEE" || role == "QA_MANAGER") {
    usernameQADESANDMAN = localStorage.getItem("username");
  }

  const usernameQAManager =
    role === "QA_MANAGER" ? localStorage.getItem("username") : "";


  const [processDeviationValidation, setProcessDeviationValidation] = useState({
    supervisorSaved: false,
    supervisorApproved: false,
    qaSaved: false,
    qaApproved: false,
    beforeQAConditionForSupervisor: false,
  });

  const updateProcessDeviationValidation = (updates) => {
    setProcessDeviationValidation((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    role == "ROLE_SUPERVISOR" ? setRawReceivedBy(formattedDate) : "";
  }, []);

  //Verification Of Record
  const [verificationID, setVerificationID] = useState({
    masterID: "",
    housekeepingId: "",
    machineCleaningId: "",
    logbookId: "",
    productionRecordId: "",
    machineSanitizerId: "",
    housekeepingVerificationId: "",
    machineCleaningVerificationId: "",
    logbookVerificationId: "",
    productionRecordVerificationId: "",
    machineSanitizerVerificationId: "",
  });
  const [manufacturingNewSave, setManufacturingNewSave] = useState(true);
  const [mahcineOpsNewSave, setMachineOpsNewSave] = useState(true);
  const [manufacturingID, setManufacturingID] = useState({
    masterID: "",
    manufacturingId1: "",
    manufacturingId2: "",
    manufacturingId3: "",
    manufacturingId4: "",
    manufacturingId5: "",
    manufacturingId6: "",
    manufacturingId7: "",
    manufacturingId8: "",
    manufacturingId9: "",
    manufacturingStepsId1: "",
    manufacturingStepsId2: "",
    manufacturingStepsId3: "",
    manufacturingStepsId4: "",
    manufacturingStepsId5: "",
    manufacturingStepsId6: "",
    manufacturingStepsId7: "",
    manufacturingStepsId8: "",
    manufacturingStepsId9: "",
  });
  const [machineOpsID, setMachineOpsID] = useState({
    masterID: "",
    machineOpsQualityId1: "",
    machineOpsQualityId2: "",
    machineOpsQualityId3: "",
    machineOpsQualityId4: "",
    machineOpsQualityId5: "",
    machineOpsQualityId6: "",
    machineOpsQualityId7: "",
    machineOpsQualityId8: "",
    machineOpsQualityId9: "",
    machineOpsQualityId10: "",
    machineOpsQualityId11: "",
    machineOpsQualityId12: "",
    machineOpsQualityId13: "",
    machineOpsQualityId14: "",
    machineOpsQualityId15: "",
    machineOpsQualityId16: "",
    machineOpsQualityId17: "",
    machineOpsQualityId18: "",

    machineOpsSummaryId1: "",
    machineOpsSummaryId2: "",
    machineOpsSummaryId3: "",
    machineOpsSummaryId4: "",
    machineOpsSummaryId5: "",
    machineOpsSummaryId6: "",
    machineOpsSummaryId7: "",
    machineOpsSummaryId8: "",
    machineOpsSummaryId9: "",
    machineOpsSummaryId10: "",
    machineOpsSummaryId11: "",
    machineOpsSummaryId12: "",
    machineOpsSummaryId13: "",
    machineOpsSummaryId14: "",
    machineOpsSummaryId15: "",
    machineOpsSummaryId16: "",
    machineOpsSummaryId17: "",
    machineOpsSummaryId18: "",
  });
  const updateVerificationID = (updates) => {
    setVerificationID((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateManufacturingID = (updates) => {
    setManufacturingID((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateMachineOpsID = (updates) => {
    setMachineOpsID((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const [newSave, setNewSave] = useState(true);
  const [hodLov, setHodLov] = useState([]);
  const [rawCottonId, setRawCottonId] = useState("");
  const [rawCottonNewSave, setRawCottonNewSave] = useState(false);
  const [pdrNewSave, setPdrNewSave] = useState(false);
  const [pdrId1, setPdrId1] = useState("");
  const [pdrId2, setPdrId2] = useState("");
  const [pdrId3, setPdrId3] = useState("");
  const [pprNewSave, setPprNewSave] = useState(false);
  const [pprId, setPprId] = useState("");


  const Qa1SignOnchange = (values) => {
    SetQaSign1(values);
  };
  const Prod1SignChange = (val) => {
    setProductionSign1(val);
  };

  const [vorStateObject, setVorStateObject] = useState({
    housekeeping: "",
    machineCleaning: "",
    logbook: "",
    productionRecord: "",
    machineSanitizer: "",
  });



  const [manufacturingSteps, setManufacturingSteps] = useState({
    SwitchOn: "",
    BlowroomRawMaterial: "",
    BlowroomWorkingArea: "",
    BlowroomReferMachine: "",
    BlowroomCardingProcess: "",
    BleachingCakePressing: "",
    BleachingKier: "",
    BleachingHydro: "",
    BleachingProcessCakeOpener: "",
  });

  const [productionReconillationObject, setproductionReconillationObject] =
    useState({
      inputQty: "",
      outPutQty: "",
      YieldSpecification: "",
    });

  const [listofEnclosuresNewArray, setListOfEnclosuresNewArray] = useState({
    bleaching_job_card: "",
    process_equipment_calibration: "",
    freetext_new: "",
  });

  const [qaReleaseArray, setqaReleaseArray] = useState({
    criticalProcessParameter: "",
    ProcessChecksReviewed: "",
    DeviationReviewes: "",
    DeivationLogged: "",
    BatchReleased: "",
    Sign1: "",
    Sign2: "",
    Sign3: "",
    Sign4: "",
    Sign5: "",
  });

  const [flagKeys, setFlagKeys] = useState({
    productionDetailsSubmitted: false,
    verificationOfRecord: false,
    manufacturingSteps: false,
    machineOperationParameters: false,
    listOfEnclosure: false,
    postProduction: false,
    qaRelease: false,
    productRelease: false,
    rawCottonIssued: false,
  });

  const [productionLovStates, setProductionLovStates] = useState({
    produtionProductionSign: "",
    rawCottonIssueProdSign: usernameSupervisor,
    postProductionProductionsign: "",
    productionQADate: "",
    productionDate: "",
  });

  const [performedbySign, setPerformedBySign] = useState({
    housekeeping: "",
    machineCleaning: "",
    logbook: "",
    productionRecord: "",
    machineSanitizer: "",
  });
  const [performedbyDate, setPerformedByDate] = useState({
    housekeeping: "",
    machineCleaning: "",
    logbook: "",
    productionRecord: "",
    machineSanitizer: "",
  });

  const [verifiedbySign, setVerifiedBySign] = useState({
    housekeeping: "",
    machineCleaning: "",
    logbook: "",
    productionRecord: "",
    machineSanitizer: "",
  });
  const [verifiedbyDate, setVerifiedByDate] = useState({
    housekeeping: "",
    machineCleaning: "",
    logbook: "",
    productionRecord: "",
    machineSanitizer: "",
  });

  const [
    manufacturingStepsPerformedbysign,
    setmanufacturingStepsPerformedbysign,
  ] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
  });

  const [
    manufacturingStepsPerformedbydate,
    setmanufacturingStepsPerformedbydate,
  ] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
  });


  const [
    manufacturingStepsVerifiedbysign,
    setmanufacturingStepsVerifiedbysign,
  ] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
  });

  const [
    manufacturingStepsVerifiedbydate,
    setmanufacturingStepsVerifiedbydate,
  ] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
  });


  const [deviationLog, setdeviationLog] = useState({
    one: "",
    two: "",
    three: "",
  });

  const [pdrSign1, setPdrSign1] = useState({
    one: username,
    two: username,
    three: username,
  });

  const [pdrSign2, setPdrSign2] = useState({
    one: usernameSupervisor,
    two: usernameSupervisor,
    three: usernameSupervisor,
  });

  const [pdrDate1, setPdrDate1] = useState({
    one: localDateValue,
    two: localDateValue,
    three: localDateValue,
  });

  const [pdrDate2, setPdrDate2] = useState({
    one: localDateValue4,
    two: localDateValue4,
    three: localDateValue4,
  });

  const [qaRemarks, setqaRemarks] = useState({
    one: "",
    two: "",
    three: "",
  });

  const [postProdArray, setPostProdArray] = useState({
    prodSupName: usernameSupervisor,
    prodSupSign: usernameSupervisor,
    prodSupDate: localDateValue4,
    hodName: usernameHod,
    hodSign: usernameHod,
    hodDate: localDateValue5,
    QaName: usernameQAManager,
    QaSign: usernameQAManager,
    QaDate: localDateValue3,
  });

  const [qaReleaseObj, setQaReleaseObj] = useState({
    Sign1: usernameQADESANDMAN,
    Date1: localDateValue3,
    Sign2: usernameQADESANDMAN,
    Date2: localDateValue3,
    Sign3: usernameQADESANDMAN,
    Date3: localDateValue3,
    Sign4: usernameQADESANDMAN,
    Date4: localDateValue3,
    Sign5: usernameQADESANDMAN,
    Date5: localDateValue3,
  });

  const [prodRelease, setProdRelease] = useState({
    Name1: usernameQADESANDMAN,
    Name2: username,
    Sign1: usernameQADESANDMAN,
    Sign2: username,
    Date1: localDateValue2,
    Date2: localDateValue3,
  });




  const handleDateChange = (e, index) => {
    const updatedDateValues = {
      ...dateValues,
      [index]: e.target.value,
    };
    console.log("Date value for row", index, ":", e.target.value);
    setDateValues(updatedDateValues);
  };

  //pde
  // Handle signature select change
  const handleSignatureChangepde = (value, index) => {
    const updatedSignatureValues = {
      ...signatureValues,
      [index]: value,
    };
    setSignatureValues(updatedSignatureValues);
  };



  //pde

  const manufacturingObservatioArray = [
    "Switch “ON” all the machines & Sub machines: Blendomat, Metal Detector, Fire Detector, CL-P, SPH, MPM, Applied, ERM, XPI, Dustex, Cake press, Kier, Hydro Extractor, Cake opener, Dryer, Rieter, Applied, Metal Detector, Fire Detector Bale Press & Weighing scale.",
    "Raw Material Preparation: Check the lay down area for Cleanliness and verify the arrangement of the bales for the readiness of process in Blendomat area.",
    "Select the working area for the Blendomat (WA1 or WA2) dependingon the location of the bales to be processed.",
    "Refer 9.0 MACHINE OPERATION PARAMETERS.",
    "Verify the carding process machine is ON/OFF Note: It should be “ON” when virgin cotton process requirement.",
    "Cake Pressing Process:Refer 9.0 MACHINE OPERATION PARAMETERS ",
    "KIER (Bleaching):Set the Machine Parameter as per the Check List (Bleaching job card Format# PRD01/F-13.)",
    "Hydro Extraction Process:Refer 9.0 MACHINE OPERATION PARAMETERS",
    "Process of Cake opener, Dryer, Rieter/Fine Opener & Bale Press machines. Refer 9.0 MACHINE OPERATION PARAMETERS",
  ];

  const machineOps = [
    "Advance setting in Blendomat in mm",
    "Fire Divertor switched ON/OFF",
    "Metal Detector switched ON/OFF",
    "CL-P Grid bar setting",
    "ERM grid bar setting",
    "Cake Press - Hydraulic pressure in Bar",
    "Cake Press - Spray water temperature in ℃",
    "Hydro extractor timer setting (Analog)",
    "Spike Lattice Speed in %",
    "Stripper lattice Speed in %",
    "Feed Roller Speed in %",
    "Opening Cylinder Speed in %",
    "Inlet Main Steam Pressure in Bar",
    "Conveyor Speed in MPM",
    "Streat Moisture value in %",
    "Feed Roller Speed in RPM",
    "Beater Roller Speed in RPM",
    "Refer SOP No. PRD01-D-09",
  ];

  const machineData = [
    {
      id: 1,
      name: "BLENDOMAT",
      code: "PH-E/I-BR01",
      startDate: "NA",
      endDate: "NA",
    },
    {
      id: 2,
      name: "Metal Detector",
      code: "PH-E/I-BR24",
      startDate: "2024-09-18",
      endDate: "2025-09-17",
    },
    {
      id: 3,
      name: "Fire Detector",
      code: "PH-E/I-BR25",
      startDate: "2024-09-18",
      endDate: "2025-09-17",
    },
    {
      id: 4,
      name: "CL-P 1",
      code: "PH-E/I-BR02",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 5,
      name: "CL-P 2",
      code: "PH-E/I-BR03",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 6,
      name: "SPH 1",
      code: "PH-E/I-BR04",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 7,
      name: "SPH 2",
      code: "PH-E/I-BR05",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 8,
      name: "MPM 1",
      code: "PH-E/I-BR06",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 9,
      name: "MPM 2",
      code: "PH-E/I-BR07",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 10,
      name: "Applied1",
      code: "PH-E/I-BR08",
      startDate: "2024-10-16",
      endDate: "2025-10-15",
    },
    {
      id: 11,
      name: "Applied2",
      code: "PH-E/I-BR09",
      startDate: "2024-10-16",
      endDate: "2025-10-15",
    },
    {
      id: 12,
      name: "ERM1",
      code: "PH-E/I-BR10",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 13,
      name: "ERM2",
      code: "PH-E/I-BR11",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 14,
      name: "XPI 1",
      code: "PH-E/I-BR12",
      startDate: "2024-10-16",
      endDate: "2025-10-15",
    },
    {
      id: 15,
      name: "XPI 2",
      code: "PH-E/I-BR13",
      startDate: "2024-10-16",
      endDate: "2025-10-15",
    },
    {
      id: 16,
      name: "Dustex 1",
      code: "PH-E/I-BR14",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 17,
      name: "Dustex 2",
      code: "PH-E/I-BR15",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 18,
      name: "Cake Press 1",
      code: "PH-E/I-BL01",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 19,
      name: "Cake Press 2",
      code: "PH-E/I-BL02",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 20,
      name: "Kier 1",
      code: "PH-E/I-BL03",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 21,
      name: "Kier 2",
      code: "PH-E/I-BL04",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 22,
      name: "Kier 3",
      code: "PH-E/I-BL05",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 23,
      name: "Weighing Machine",
      code: "PH-WM-24",
      startDate: "2025-02-08",
      endDate: "2026-02-07",
    },
    {
      id: 24,
      name: "Hydro Extractor1",
      code: "PH-E/I-BL06",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 25,
      name: "Hydro Extractor 2",
      code: "PH-E/I-BL07",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 26,
      name: "Cake opener",
      code: "PH-E/I-BL08",
      startDate: "NA",
      endDate: "NA",
    },
    {
      id: 27,
      name: "Dryer",
      code: "PH-E/I-BL09",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
    {
      id: 28,
      name: "Rieter 1",
      code: "PH-E/I-BL10",
      startDate: "NA",
      endDate: "NA",
    },
    {
      id: 29,
      name: "Rieter 2",
      code: "PH-E/I-BL11",
      startDate: "NA",
      endDate: "NA",
    },
    {
      id: 30,
      name: "Applied 1",
      code: "PH-E/I-BL12",
      startDate: "2024-10-16",
      endDate: "2025-10-15",
    },
    {
      id: 31,
      name: "Applied 2",
      code: "PH-E/I-BL13",
      startDate: "2024-10-16",
      endDate: "2025-10-15",
    },
    {
      id: 32,
      name: "Metal Detector",
      code: "PH-E/I-BL21",
      startDate: "2024-09-18",
      endDate: "2025-09-17",
    },
    {
      id: 33,
      name: "Fire Detector",
      code: "PH-E/I-BL23",
      startDate: "2024-09-18",
      endDate: "2025-09-17",
    },
    {
      id: 34,
      name: "Bale Press",
      code: "PH-E/I-BL14",
      startDate: "2025-02-01",
      endDate: "2027-01-31",
    },
  ];


  const [machineOpsPerformedBy, setMachineOpsPerformedBy] = useState("");
  const [machineOpsCheckedBy, setMachineOpsCheckedBy] = useState("");
  const [machineOpsPerformedByDate, setMachineOpsPerformedByDate] =
    useState("");
  const [machineOpsCheckedByDate, setMachineOpsCheckedByDate] = useState("");
  const [machines, setMachines] = useState(machineData);
  const [ProcessDelay, setProcessDelay] = useState([]);
  const [pecs_verified, setPecsVerified] = useState("");

  const handleSelectText = (e, name) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      setPecsVerified(e.target.value);
    }
  };

  const handleInput = (value, name) => {
    setPecsVerified(value);
  };

  const handleInputChange = (event, id, field) => {
    const { value } = event.target;
    const updatedMachines = machines.map((machine) => {
      if (machine.id === id) {
        return { ...machine, [field]: value };
      }
      return machine;
    });
    setMachines(updatedMachines);
  };

  const handleSubmit = (event) => {
    if (pecs_verified == "" || newDate == "") {
      event.preventDefault();
      message.error("Please Fill Date and Signature");
    } else {
      event.preventDefault();
      const validatedMachines = machines.map((machine) => ({
        equipmentName: machine.name,
        equipmentCode: machine.code,
        calibrationDate: machine.startDate || "NA",
        dueDate: machine.endDate || "NA",
      }));

      const payload = {
        bmr_no: bmr,
        submittedDate: new Date().toISOString() || "NA",
        verifiedBy: pecs_verified,
        verifiedDate:
          moment(newDate).format("DD/MM/YYYY - HH:mm") || localDateValue4,
        annexureDates: validatedMachines,
      };

      console.log("API Payload:", payload);



      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/submitAnnexureCompletion`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("QA", res.data);
          message.success("Annexure-1 Submitted Successfully");
          onChange("6");
        })
        .catch((err) => {
          console.log("ERRor", err);
          messageApi.open({
            type: "error",
            content: "Caused Network Error",
          });
        });
    }
  };

  const pdrSignOnChange1 = (values) => {
    console.log("Values", values);
    updateSignProd({ one: values });
  };
  const pdrSignOnChange2 = (values) => {
    console.log("Values", values);
    updateSignProd({ two: values });
  };
  const pdrSignOnChange3 = (values) => {
    console.log("Values", values);
    updateSignProd({ three: values });
  };

  const pdrSignOnChangeQA1 = (values) => {
    console.log("Values", values);
    updateSignQA({ one: values });
  };
  const pdrSignOnChangeQA2 = (values) => {
    console.log("Values", values);
    updateSignQA({ two: values });
  };
  const pdrSignOnChangeQA3 = (values) => {
    console.log("Values", values);
    updateSignQA({ three: values });
  };

  const maachineOpsPerformedOnchange = (value) => {
    setMachineOpsPerformedBy(value);
  };

  const maachineOpsCheckedOnchange = (value) => {
    setMachineOpsCheckedBy(value);
  };

  const manufacturingStepsVerifiedBySign1 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ one: value });
  };
  const manufacturingStepsVerifiedBySign2 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ two: value });
  };
  const manufacturingStepsVerifiedBySign3 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ three: value });
  };
  const manufacturingStepsVerifiedBySign4 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ four: value });
  };
  const manufacturingStepsVerifiedBySign5 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ five: value });
  };
  const manufacturingStepsVerifiedBySign6 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ six: value });
  };
  const manufacturingStepsVerifiedBySign7 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ seven: value });
  };
  const manufacturingStepsVerifiedBySign8 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ eight: value });
  };
  const manufacturingStepsVerifiedBySign9 = (value) => {
    console.log("values", value);
    updateManufacturingStepsVerifiedBySign({ nine: value });
  };


  const manufacturingStepsPerformedBySign1 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ one: value });
  };
  const manufacturingStepsPerformedBySign2 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ two: value });
  };
  const manufacturingStepsPerformedBySign3 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ three: value });
  };
  const manufacturingStepsPerformedBySign4 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ four: value });
  };
  const manufacturingStepsPerformedBySign5 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ five: value });
  };
  const manufacturingStepsPerformedBySign6 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ six: value });
  };
  const manufacturingStepsPerformedBySign7 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ seven: value });
  };
  const manufacturingStepsPerformedBySign8 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ eight: value });
  };
  const manufacturingStepsPerformedBySign9 = (value) => {
    console.log("values", value);
    updateManufacturingStepsPerformedBySign({ nine: value });
  };

  const newPerformedByChange1 = (value) => {
    console.log("one", value);
    updatePerformedBySign({ housekeeping: value });
  };
  const newPerformedByChange2 = (value) => {
    console.log("two", value);
    updatePerformedBySign({ machineCleaning: value });
  };
  const newPerformedByChange3 = (value) => {
    console.log("three", value);
    updatePerformedBySign({ logbook: value });
  };
  const newPerformedByChange4 = (value) => {
    console.log("four", value);
    updatePerformedBySign({ productionRecord: value });
  };
  const newPerformedByChange5 = (value) => {
    console.log("five", value);
    updatePerformedBySign({ machineSanitizer: value });
  };

  const newVerifiedByChange1 = (value) => {
    console.log("one", value);
    updateVerifiedBySign({ housekeeping: value });
  };
  const newVerifiedByChange2 = (value) => {
    console.log("two", value);
    updateVerifiedBySign({ machineCleaning: value });
  };
  const newVerifiedByChange3 = (value) => {
    console.log("three", value);
    updateVerifiedBySign({ logbook: value });
  };
  const newVerifiedByChange4 = (value) => {
    console.log("four", value);
    updateVerifiedBySign({ productionRecord: value });
  };
  const newVerifiedByChange5 = (value) => {
    console.log("five", value);
    updateVerifiedBySign({ machineSanitizer: value });
  };


  const qaOnchange1 = (value) => {
    updateQa({ Sign1: value });
  };
  const qaOnchange2 = (value) => {
    updateQa({ Sign2: value });
  };
  const qaOnchange3 = (value) => {
    updateQa({ Sign3: value });
  };
  const qaOnchange4 = (value) => {
    updateQa({ Sign4: value });
  };
  const qaOnchange5 = (value) => {
    updateQa({ Sign5: value });
  };



  const [qaSign1, SetQaSign1] = useState("");
  const [productionSign1, setProductionSign1] = useState("");


  const [qaLov, setQaLov] = useState([]);
  const [qaManagerLov, setManagerQaLov] = useState([]);
  const [qaInspectorLov, setQaInspectorLov] = useState([]);
  const [prodLov, setProdLov] = useState([]);
  const [hodnLov, setHodnLov] = useState([]);
  const [verifiedByLov, setVerifiedByLov] = useState([]);
  const [stores, setStores] = useState([]);
  const [findLaydown, setFindLaydown] = useState();
  const [rawCottonProd, setRawCottonProd] = useState("");
  const [loggedInQaInspector, setLoggedInQaInspector] = useState(false);
  const [LoggedInQA_DESIGNEEandQA_MAN, setLoggedInQA_DESIGNEEandQA_MAN] =
    useState(false);
  const [loggedInQaManager, setLoggedInQaManager] = useState(false);


  const rawCottonIssueProdSignOnChange = (values) => {
    console.log("Values", values);
    updateProdLov({ rawCottonIssueProdSign: values });
    setRawCottonProd(values);
  };



  const [store1Sign, setStore1Sign] = useState("");

  const store1Onchange = (values) => {
    setStore1Sign(values);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let roleqamandes = localStorage.getItem("role");
    console.log("localStorage.getItem", roleqamandes);
    setLoggedInQa(localStorage.getItem("role") == "ROLE_QA" ? true : false);
    setLoggedInQaManager(
      localStorage.getItem("role") == "QA_MANAGER" ? true : false
    );
    setLoggedInQaInspector(
      localStorage.getItem("role") == "QA_INSPECTOR" ? true : false
    );

    if (roleqamandes == "QA_DESIGNEE" || roleqamandes == "QA_MANAGER") {
      setLoggedInQA_DESIGNEEandQA_MAN(true);
    }

    setLoggedInSupervisor(
      localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
    );
    setLoggedInHod(
      localStorage.getItem("role") == "ROLE_HOD" ||
        localStorage.getItem("role") == "ROLE_DESIGNEE"
        ? true
        : false
    );
    console.log("Role : ", localStorage.getItem("role"));
    const role = localStorage.getItem("role");
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      setHodEditable(true);
    } else {
      setHodEditable(false);
    }
    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("laydown", res.data);
        setBmrStore(res.data);
        const a = res.data.map((option) => ({
          value: option.bmr_no,
          label: option.bmr_no,
        }));
        setBmrList(a);
        setFindLaydown(res.data);
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch BMR Caused Network Error",
        });
      });

    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getBleachingQA?department=BLEACHING`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("QA", res.data);
        const a = res.data.map((option) => ({
          value: option.name,
          label: option.name,
        }));
        setQaLov(a);

      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch QA Caused Network Error",
        });
      });

    //Department Users List for QA
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getSupervisor?departmentId=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.username,
          label: option.username,
        }));
        setProdLov(a);
      })
      .catch((err) => {
        console.log("ERRor", err);
      });

    axios
      .get(
        `${API.prodUrl}/Precot/api/bleaching/summary/getQAManagerByDepartment?dept_id=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        setManagerQaLov(a);
      })
      .catch((err) => {
        console.log("ERRor", err);

      });

    axios
      .get(
        `${API.prodUrl}/Precot/api/bleaching/summary/getQAInspectorByDepartment?dept_id=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        setQaInspectorLov(a);
      })
      .catch((err) => {
        console.log("ERRor", err);

      });

    axios
      .get(`${API.prodUrl}/Precot/api/Users/Service/getHod?departmentId=1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.username,
          label: option.username,
        }));
        setHodnLov(a);
      })
      .catch((err) => {
        console.log("ERRor", err);

      });

    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/summary/getApprovedVerifiers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        setVerifiedByLov(a);
      })
      .catch((err) => {
        console.log("ERRor", err);

      });

    //Department Users List for HOD
    axios
      .get(`${API.prodUrl}/Precot/api/Users/Service/getHod?departmentId=1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.username,
          label: option.username,
        }));
        setHodLov(a);
      })
      .catch((err) => {
        console.log("ERRor", err);

      });


    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/bleachStorePersons/getAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const a = res.data.map((option) => ({
          value: option.name,
          label: option.name,
        }));
        setStores(a);
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch BMR Caused Network Error",
        });
      });
  }, [bmr]);

  const onBmrChange = (value) => {
    setBmr(value);
  };

  const onChangeSequentially = (x) => {
    console.log("onChangeSequentiallyX", x);
    const numbers = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
    ];

    numbers.forEach((number) => {
      onChange(number, x);
    });

  };

  const datePDE = (value) => {

    console.log("val", value);
  };

  const handleCheckboxChange = (e, index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: e.target.checked,
    }));
  };



  function formatDateForInput1(dateString) {
    if (!dateString) return "";

    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateString)) {
      dateString = dateString.replace(" ", "T");
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.warn("Invalid date received:", dateString);
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes} `;
  }


  function formatDateToYYYYMMDD(dateString) {
    if (dateString && dateString.includes("/")) {
      const parts = dateString.split("/");

      if (parts.length === 3) {
        const [day, month, year] = parts;

        return `${year}-${month}-${day}`;
      }
    }
  }

  const onChange = (key, bm) => {
    setTabKey(key);
    console.log("KEYY", key);
    axios
      .get(
        `${API.prodUrl}/Precot/api/bleaching/summary/getFullSummary?bmr_no=${bm == undefined ? bmr : bm
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("key", key);
        switch (key) {
          case "1":
            console.log("mmmmm", res.data.productionDetails[0]);
            setPd_ID(res.data.productionDetails[0].prodDetailsId);
            setPd_ProdStatus(res.data.productionDetails[0].supervisiorStatus);
            setPd_QaStatus(res.data.productionDetails[0].qaStatus);
            setPd_Status(res.data.productionDetails[0].status);
            setPd_Disable(
              (loggedInSupervisor &&
                (res.data.productionDetails[0].status ==
                  "SUPERVISOR_APPROVED" ||
                  res.data.productionDetails[0]?.status == "QA_APPROVED")) ||
              (loggedInQa &&
                res.data.productionDetails[0].status == "QA_APPROVED")
            );
            setPd_QaId(res.data.productionDetails[0].qaId);
            setPd_Status(res.data.productionDetails[0].status);

            if (res.data.productionDetails[0]?.mixing !== null) {
              if (
                res.data.productionDetails[0]?.mixing
                  ?.toLowerCase()
                  .includes("export")
              ) {
                setpd_ProductsupplyExport("TICK");
                setpd_ProductsupplyInhouse("NA");
              } else {
                setpd_ProductsupplyInhouse("TICK");
                setpd_ProductsupplyExport("NA");
              }
            } else {
              setpd_ProductsupplyInhouse("NA");
              setpd_ProductsupplyExport("NA");
            }

            setPd_BatchQty1(res.data.productionDetails[0].baleCount);
            setPd_BatchQty2(res.data.productionDetails[0].batchCount);
            setPd_BatchQuantity(res.data.productionDetails[0].batchQuantity);
            setPd_Mixing(res.data.productionDetails[0].mixing);
            setPd_StartSub(res.data.productionDetails[0].startSubBatch);
            setPd_EndSub(res.data.productionDetails[0].endSubBatch);

            const finishingValue = res.data.productionDetails[0].finishing;

            setpd_FinishSoft(
              finishingValue ? finishingValue.toLowerCase().trim() === "soft" ? "TICK" : "NA" : "NA"
            );

            setpd_pd_finish_Crish(
              finishingValue
                ? (finishingValue.toLowerCase().trim() === "crisp" || finishingValue.toLowerCase().trim() === "cri")
                  ? "TICK"
                  : "NA"
                : "NA"
            );

            console.log("finishingValue.toLowerCase().trim()", finishingValue.toLowerCase().trim())
            setPd_ManufacturingStartDate(
              res.data.productionDetails[0].startDate.slice(0, 10)
            );
            setPd_ManufacturingCompletionDate(
              res.data.productionDetails[0].endDate.slice(0, 10)
            );
            localStorage.setItem(
              "bleaching_prod_start_date",
              res.data.productionDetails[0].startDate
            );
            localStorage.setItem(
              "bleaching_prod_end_date",
              res.data.productionDetails[0].endDate
            );
            setPd_ManufacturingStartTime(
              res.data.productionDetails[0].startTime
            );
            setPd_ManufacturingCompletionTime(
              res.data.productionDetails[0].endTime
            );
            Qa1SignOnchange(res.data.productionDetails[0].qaName);
            Prod1SignChange(res.data.productionDetails[0].supervisiorName);
            updateProdLov({
              productionDate: res.data.productionDetails[0].supervisiorDate || localDateValue4,
            });
            updateProdLov({
              productionQADate: res.data.productionDetails[0].qaDate,
            });


            break;
          case "2":
            const s = res.data.bmrCompletionTable.filter((x, i) => {
              return x.form == "RAW COTTON ISSUE";
            });
            console.log("hh", s);
            if (s.length == 0) {
              setRawCottonStatus(false);
              setRawCottonIssue(res.data.rawCottonResponse[0].issueResponse);
              setRawWeightTotal(res.data.rawCottonResponse[0].totalBales);
              setRawWeightTotalBaleWeight(
                res.data.rawCottonResponse[0].totalWeight
              );
            } else {

              setRawCottonNewSave(true);
              setRawCottonQaStatus(
                s[0].qaName.length > 0 && s[0].shoppageDate.length > 0
                  ? true
                  : false
              );
              setRawCottonSupStatus(
                s[0].supervisorName.length > 0 && s[0].shoppageDate2.length > 0
                  ? true
                  : false
              );
              store1Onchange(s[0].qaName);
              setRawReceivedBy(s[0].shoppageDate2);
              setRawIssuedBy(s[0].shoppageDate);
              console.log("ghjk", s[0].supervisorName);
              rawCottonIssueProdSignOnChange(s[0].supervisorName);
              setRawCottonProd(s[0].supervisorName);
              setRawCottonId(s[0].id);
              setRawCottonStore(s);
              setRawCottonIssue(res.data.rawCottonResponse[0].issueResponse);
              setRawWeightTotal(res.data.rawCottonResponse[0].totalBales);
              setRawWeightTotalBaleWeight(
                res.data.rawCottonResponse[0].totalWeight
              );
            }
            break;
          case "3":

            setChemicalDetailsArray(res.data.bmrSummary[0].chemicalDetails);
            setChemicalDate(res.data.bmrSummary[0].date);
            break;
          case "4":

            setPackingMaterialsArray(res.data.bmrSummary[0].packingDetails);
            break;
          case "6":
            if (res.data.annexureBleachBmrAnnexureLists.length == 0) {
              setPecs_State(false);
            } else {
              setPecs_State(true);
              setPecsStateArray(
                res.data.annexureBleachBmrAnnexureLists[0].annexureDates
              );
              setpecsNewVerified(
                res.data.annexureBleachBmrAnnexureLists[0].verifiedBy
              );
              setpecsNewVerifiedDate(
                res.data.annexureBleachBmrAnnexureLists[0].verifiedDate
              );
            }
            break;
          case "7":
            console.log("bhg", res.data.summaryRecordVerificationList);

            if (
              res.data.summaryRecordVerificationList.qa_status == "QA_APPROVED"
            ) {
              console.log("Key Called guy");
              setNewSave(false);
              setVerificationStatus(true);
              setVerificationArray(
                res.data.summaryRecordVerificationList.summaryVerification
              );
            } else if (
              res.data.summaryRecordVerificationList.supervisor_status ==
              "SUPERVISOR_APPROVED"
            ) {
              setSupervisorOnlyVerifcation(true);
              setNewSave(true);
              setVerificationStatus(false);
              axios
                .get(
                  `${API.prodUrl
                  }/Precot/api/bleaching/summary/recordVerificationBmr?bmr_no=${bm == undefined ? bmr : bm
                  }`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((res) => {
                  console.log("api calleddddd");
                  console.log("Response Datax", res.data.summaryVerification);
                  const housekeeping = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Housekeeping";
                    }
                  );
                  const Machine = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Machine";
                    }
                  );
                  const Logbook = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Logbook";
                    }
                  );
                  const Production = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Production";
                    }
                  );
                  const Machine_Sanitizer = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Machine Sanitizer";
                    }
                  );
                  updateVerificationID({
                    masterID: res.data.summaryRecordId,
                    housekeepingId: housekeeping[0].summary_record_id,
                    machineCleaningId: Machine[0].summary_record_id,
                    logbookId: Logbook[0].summary_record_id,
                    productionRecordId: Production[0].summary_record_id,
                    machineSanitizerId: Machine_Sanitizer[0].summary_record_id,
                    housekeepingVerificationId:
                      housekeeping[0].summaryVerficationId,
                    machineCleaningVerificationId:
                      Machine[0].summaryVerficationId,
                    logbookVerificationId: Logbook[0].summaryVerficationId,
                    productionRecordVerificationId:
                      Production[0].summaryVerficationId,
                    machineSanitizerVerificationId:
                      Machine_Sanitizer[0].summaryVerficationId,
                  });
                  updateStateObject({
                    housekeeping:
                      housekeeping[0].status == "Satisfactory"
                        ? "TICK"
                        : housekeeping[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    machineCleaning:
                      Machine[0].status == "Satisfactory"
                        ? "TICK"
                        : Machine[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    logbook:
                      Logbook[0].status == "Satisfactory"
                        ? "TICK"
                        : Logbook[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    machineSanitizer:
                      Machine_Sanitizer[0].status == "Satisfactory"
                        ? "TICK"
                        : Machine_Sanitizer[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    productionRecord:
                      Production[0].status == "Satisfactory"
                        ? "TICK"
                        : Production[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                  });
                  updateVerifiedBySign({
                    housekeeping: housekeeping[0].verifiedBy,
                    logbook: Logbook[0].verifiedBy,
                    machineCleaning: Machine[0].verifiedBy,
                    machineSanitizer: Machine_Sanitizer[0].verifiedBy,
                    productionRecord: Production[0].verifiedBy,
                  });
                  updatePerformedBySign({
                    housekeeping: housekeeping[0].reviewedBy,
                    logbook: Logbook[0].reviewedBy,
                    machineCleaning: Machine[0].reviewedBy,
                    machineSanitizer: Machine_Sanitizer[0].reviewedBy,
                    productionRecord: Production[0].reviewedBy,
                  });

                  updateVerifiedByDate({
                    housekeeping: housekeeping[0].date1,
                    logbook: Logbook[0].date1,
                    machineCleaning: Machine[0].date1,
                    machineSanitizer: Machine_Sanitizer[0].date1,
                    productionRecord: Production[0].date1,
                  });
                  updatePerformedByDate({
                    housekeeping: housekeeping[0].date2,
                    logbook: Logbook[0].date2,
                    machineCleaning: Machine[0].date2,
                    machineSanitizer: Machine_Sanitizer[0].date2,
                    productionRecord: Production[0].date2,
                  });
                  console.log("housekeeping[0].date2,", housekeeping[0].date2);
                })
                .catch((err) => {
                  console.log("Error", err);
                });
            } else if (
              res.data.summaryRecordVerificationList == "" ||
              res.data.summaryRecordVerificationList.summaryVerification
                .length == 0 ||
              res.data.summaryRecordVerificationList.supervisor_status ==
              "SUPERVISOR_SAVED" ||
              res.data.summaryRecordVerificationList.supervisor_status ==
              "SUPERVISOR_APPROVED" ||
              res.data.summaryRecordVerificationList.qa_status == "QA_SAVED"
            ) {
              console.log("hghgig");
              setNewSave(true);
              setVerificationStatus(false);
              axios
                .get(
                  `${API.prodUrl
                  }/Precot/api/bleaching/summary/recordVerificationBmr?bmr_no=${bm == undefined ? bmr : bm
                  }`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((res) => {
                  console.log("api calleddddd");
                  console.log("Response Datax", res.data.summaryVerification);
                  const housekeeping = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Housekeeping";
                    }
                  );
                  const Machine = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Machine";
                    }
                  );
                  const Logbook = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Logbook";
                    }
                  );
                  const Production = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Production";
                    }
                  );
                  const Machine_Sanitizer = res.data.summaryVerification.filter(
                    (x, i) => {
                      return x.recordName == "Machine Sanitizer";
                    }
                  );
                  updateVerificationID({
                    masterID: res.data.summaryRecordId,
                    housekeepingId: housekeeping[0].summary_record_id,
                    machineCleaningId: Machine[0].summary_record_id,
                    logbookId: Logbook[0].summary_record_id,
                    productionRecordId: Production[0].summary_record_id,
                    machineSanitizerId: Machine_Sanitizer[0].summary_record_id,
                    housekeepingVerificationId:
                      housekeeping[0].summaryVerficationId,
                    machineCleaningVerificationId:
                      Machine[0].summaryVerficationId,
                    logbookVerificationId: Logbook[0].summaryVerficationId,
                    productionRecordVerificationId:
                      Production[0].summaryVerficationId,
                    machineSanitizerVerificationId:
                      Machine_Sanitizer[0].summaryVerficationId,
                  });
                  updateStateObject({
                    housekeeping:
                      housekeeping[0].status == "Satisfactory"
                        ? "TICK"
                        : housekeeping[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    machineCleaning:
                      Machine[0].status == "Satisfactory"
                        ? "TICK"
                        : Machine[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    logbook:
                      Logbook[0].status == "Satisfactory"
                        ? "TICK"
                        : Logbook[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    productionRecord:
                      Production[0].status == "Satisfactory"
                        ? "TICK"
                        : Production[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                    machineSanitizer:
                      Machine_Sanitizer[0].status == "Satisfactory"
                        ? "TICK"
                        : Machine_Sanitizer[0].status == "Not Satisfactory"
                          ? "CROSS"
                          : "NA",
                  });
                  updateVerifiedBySign({
                    housekeeping: housekeeping[0].verifiedBy,
                    logbook: Logbook[0].verifiedBy,
                    machineCleaning: Machine[0].verifiedBy,
                    machineSanitizer: Machine_Sanitizer[0].verifiedBy,
                    productionRecord: Production[0].verifiedBy,
                  });
                  updatePerformedBySign({
                    housekeeping: housekeeping[0].reviewedBy,
                    logbook: Logbook[0].reviewedBy,
                    machineCleaning: Machine[0].reviewedBy,
                    machineSanitizer: Machine_Sanitizer[0].reviewedBy,
                    productionRecord: Production[0].reviewedBy,
                  });
                  updateVerifiedByDate({
                    housekeeping: housekeeping[0].date1,
                    logbook: Logbook[0].date1,
                    machineCleaning: Machine[0].date1,
                    machineSanitizer: Machine_Sanitizer[0].date1,
                    productionRecord: Production[0].date1,
                  });
                  updatePerformedByDate({
                    housekeeping: housekeeping[0].date2,
                    logbook: Logbook[0].date2,
                    machineCleaning: Machine[0].date2,
                    machineSanitizer: Machine_Sanitizer[0].date2,
                    productionRecord: Production[0].date2,
                  });
                  console.log(
                    "housekeeping[0].date2,22222",
                    housekeeping[0].date2
                  );
                })
                .catch((err) => {
                  console.log("Error", err);
                });
            } else {
              console.log("Key Called guy");
              setNewSave(false);
              setVerificationStatus(true);
              setVerificationArray(
                res.data.summaryRecordVerificationList.summaryVerification
              );
            }
            break;
          case "8":

            console.log(
              "ManufacturingSteps :",
              res.data.manufacturingStepsList
            );
            if (res.data.manufacturingStepsList.length == 0) {
              setManufacturingNewSave(true);
              setManufacturingStepsStatus(false);
            } else if (
              res.data.manufacturingStepsList[0].qa_status == "QA_APPROVED" &&
              res.data.manufacturingStepsList[0].supervisor_status ==
              "SUPERVISOR_APPROVED"
            ) {

              setManufacturingNewSave(false);
              setManufacturingStepsStatus(true);
              setManufacturingStepsArray(
                res.data.manufacturingStepsList[0].manufacturingOperations
              );
            } else if (
              res.data.manufacturingStepsList[0].supervisor_status ==
              "SUPERVISOR_APPROVED"
            ) {
              setSupervisorOnlyMs(true);
              setManufacturingStepsStatus(false);
              setManufacturingNewSave(false);
              const ops1 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation1";
                  }
                );
              const ops2 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation2";
                  }
                );
              console.log("hgu", ops2);
              console.log("first", manufacturingID);
              const ops3 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation3";
                  }
                );
              const ops4 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation4";
                  }
                );
              const ops5 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation5";
                  }
                );
              const ops6 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation6";
                  }
                );
              const ops7 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation7";
                  }
                );
              const ops8 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation8";
                  }
                );
              const ops9 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation9";
                  }
                );
              updateManufacturingStepsObject({
                SwitchOn: String(ops1[0]?.observation1).toUpperCase(),
                BlowroomRawMaterial: String(
                  ops2[0]?.observation1
                ).toUpperCase(),
                BlowroomWorkingArea: String(
                  ops3[0]?.observation1
                ).toUpperCase(),
                BlowroomReferMachine: String(
                  ops4[0]?.observation1
                ).toUpperCase(),
                BlowroomCardingProcess: String(
                  ops5[0]?.observation1
                ).toUpperCase(),
                BleachingCakePressing: String(
                  ops6[0]?.observation1
                ).toUpperCase(),
                BleachingKier: String(ops7[0]?.observation1).toUpperCase(),
                BleachingHydro: String(ops8[0]?.observation1).toUpperCase(),
                BleachingProcessCakeOpener: String(
                  ops9[0]?.observation1
                ).toUpperCase(),
              });

              console.log("jgjhyf", ops2[0]?.observation1);

              updateManufacturingID({
                masterID: res.data.manufacturingStepsList[0].manufacturingId,
                manufacturingId1: ops1[0].operationId,
                manufacturingId2: ops2[0].operationId,
                manufacturingId3: ops3[0].operationId,
                manufacturingId4: ops4[0].operationId,
                manufacturingId5: ops5[0].operationId,
                manufacturingId6: ops6[0].operationId,
                manufacturingId7: ops7[0].operationId,
                manufacturingId8: ops8[0].operationId,
                manufacturingId9: ops9[0].operationId,
                manufacturingStepsId1: ops1[0].manufacturingId,
                manufacturingStepsId2: ops2[0].manufacturingId,
                manufacturingStepsId3: ops3[0].manufacturingId,
                manufacturingStepsId4: ops4[0].manufacturingId,
                manufacturingStepsId5: ops5[0].manufacturingId,
                manufacturingStepsId6: ops6[0].manufacturingId,
                manufacturingStepsId7: ops7[0].manufacturingId,
                manufacturingStepsId8: ops8[0].manufacturingId,
                manufacturingStepsId9: ops9[0].manufacturingId,
              });

              manufacturingStepsPerformedbydate;
              manufacturingStepsPerformedbysign;
              manufacturingStepsVerifiedbydate;
              manufacturingStepsVerifiedbysign;

              updateManufacturingStepsPerformedByDate({
                one: ops1[0].date1,
                two: ops2[0].date1,
                three: ops3[0].date1,
                four: ops4[0].date1,
                five: ops5[0].date1,
                six: ops6[0].date1,
                seven: ops7[0].date1,
                eight: ops8[0].date1,
                nine: ops9[0].date1,
              });

              updateManufacturingStepsPerformedBySign({
                one: ops1[0].performBy,
                two: ops2[0].performBy,
                three: ops3[0].performBy,
                four: ops4[0].performBy,
                five: ops5[0].performBy,
                six: ops6[0].performBy,
                seven: ops7[0].performBy,
                eight: ops8[0].performBy,
                nine: ops9[0].performBy,
              });
              updateManufacturingStepsVerifiedByDate({
                one: ops1[0].date2,
                two: ops2[0].date2,
                three: ops3[0].date2,
                four: ops4[0].date2,
                five: ops5[0].date2,
                six: ops6[0].date2,
                seven: ops7[0].date2,
                eight: ops8[0].date2,
                nine: ops9[0].date2,
              });
              updateManufacturingStepsVerifiedBySign({
                one: ops1[0].cleanedBy,
                two: ops2[0].cleanedBy,
                three: ops3[0].cleanedBy,
                four: ops4[0].cleanedBy,
                five: ops5[0].cleanedBy,
                six: ops6[0].cleanedBy,
                seven: ops7[0].cleanedBy,
                eight: ops8[0].cleanedBy,
                nine: ops9[0].cleanedBy,
              });
            } else if (
              res.data.manufacturingStepsList[0].qa_status == "QA_APPROVED"
            ) {
              setManufacturingNewSave(false);
              setManufacturingStepsStatus(true);
              setManufacturingStepsArray(
                res.data.manufacturingStepsList[0].manufacturingOperations
              );
            } else if (
              res.data.manufacturingStepsList[0].supervisor_status ==
              "SUPERVISOR_SAVED" ||
              res.data.manufacturingStepsList[0].supervisor_status ==
              "SUPERVISOR_APPROVED" ||
              res.data.manufacturingStepsList[0].qa_status == "QA_SAVED"
            ) {
              setManufacturingStepsStatus(false);
              setManufacturingNewSave(false);
              const ops1 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation1";
                  }
                );
              const ops2 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation2";
                  }
                );
              console.log("hgu", ops2);
              console.log("first", manufacturingID);
              const ops3 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation3";
                  }
                );
              const ops4 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation4";
                  }
                );
              const ops5 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation5";
                  }
                );
              const ops6 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation6";
                  }
                );
              const ops7 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation7";
                  }
                );
              const ops8 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation8";
                  }
                );
              const ops9 =
                res.data.manufacturingStepsList[0].manufacturingOperations.filter(
                  (x, i) => {
                    return x.operation == "Operation9";
                  }
                );
              updateManufacturingStepsObject({
                SwitchOn: String(ops1[0]?.observation1).toUpperCase(),
                BlowroomRawMaterial: String(
                  ops2[0]?.observation1
                ).toUpperCase(),
                BlowroomWorkingArea: String(
                  ops3[0]?.observation1
                ).toUpperCase(),
                BlowroomReferMachine: String(
                  ops4[0]?.observation1
                ).toUpperCase(),
                BlowroomCardingProcess: String(
                  ops5[0]?.observation1
                ).toUpperCase(),
                BleachingCakePressing: String(
                  ops6[0]?.observation1
                ).toUpperCase(),
                BleachingKier: String(ops7[0]?.observation1).toUpperCase(),
                BleachingHydro: String(ops8[0]?.observation1).toUpperCase(),
                BleachingProcessCakeOpener: String(
                  ops9[0]?.observation1
                ).toUpperCase(),
              });

              console.log("jgjhyf", ops2[0]?.observation1);
              updateManufacturingID({
                masterID: res.data.manufacturingStepsList[0].manufacturingId,
                manufacturingId1: ops1[0].operationId,
                manufacturingId2: ops2[0].operationId,
                manufacturingId3: ops3[0].operationId,
                manufacturingId4: ops4[0].operationId,
                manufacturingId5: ops5[0].operationId,
                manufacturingId6: ops6[0].operationId,
                manufacturingId7: ops7[0].operationId,
                manufacturingId8: ops8[0].operationId,
                manufacturingId9: ops9[0].operationId,
                manufacturingStepsId1: ops1[0].manufacturingId,
                manufacturingStepsId2: ops2[0].manufacturingId,
                manufacturingStepsId3: ops3[0].manufacturingId,
                manufacturingStepsId4: ops4[0].manufacturingId,
                manufacturingStepsId5: ops5[0].manufacturingId,
                manufacturingStepsId6: ops6[0].manufacturingId,
                manufacturingStepsId7: ops7[0].manufacturingId,
                manufacturingStepsId8: ops8[0].manufacturingId,
                manufacturingStepsId9: ops9[0].manufacturingId,
              });

              manufacturingStepsPerformedbydate;
              manufacturingStepsPerformedbysign;
              manufacturingStepsVerifiedbydate;
              manufacturingStepsVerifiedbysign;

              updateManufacturingStepsPerformedByDate({
                one: ops1[0].date1,
                two: ops2[0].date1,
                three: ops3[0].date1,
                four: ops4[0].date1,
                five: ops5[0].date1,
                six: ops6[0].date1,
                seven: ops7[0].date1,
                eight: ops8[0].date1,
                nine: ops9[0].date1,
              });

              updateManufacturingStepsPerformedBySign({
                one: ops1[0].performBy,
                two: ops2[0].performBy,
                three: ops3[0].performBy,
                four: ops4[0].performBy,
                five: ops5[0].performBy,
                six: ops6[0].performBy,
                seven: ops7[0].performBy,
                eight: ops8[0].performBy,
                nine: ops9[0].performBy,
              });
              updateManufacturingStepsVerifiedByDate({
                one: ops1[0].date2,
                two: ops2[0].date2,
                three: ops3[0].date2,
                four: ops4[0].date2,
                five: ops5[0].date2,
                six: ops6[0].date2,
                seven: ops7[0].date2,
                eight: ops8[0].date2,
                nine: ops9[0].date2,
              });
              updateManufacturingStepsVerifiedBySign({
                one: ops1[0].cleanedBy,
                two: ops2[0].cleanedBy,
                three: ops3[0].cleanedBy,
                four: ops4[0].cleanedBy,
                five: ops5[0].cleanedBy,
                six: ops6[0].cleanedBy,
                seven: ops7[0].cleanedBy,
                eight: ops8[0].cleanedBy,
                nine: ops9[0].cleanedBy,
              });
            }
            break;
          case "9":

            console.log("jgjh", res.data.manufacturingOperationsList[0]);
            if (res.data.manufacturingOperationsList.length == 0) {
              setManufacturingParameterStatus(false);
              setMachineOpsNewSave(true);
            } else if (
              res.data.manufacturingOperationsList[0].qa_status ==
              "QA_APPROVED" &&
              res.data.manufacturingOperationsList[0].supervisor_status ==
              "SUPERVISOR_APPROVED"
            ) {
              setManufacturingParameterStatus(true);
              setManufacturingParametersArray(
                res.data.manufacturingOperationsList[0].operations
              );
              setQaReleaseStore(res.data.manufacturingOperationsList[0]);
            } else if (
              res.data.manufacturingOperationsList[0].qa_status == "QA_APPROVED"
            ) {
              setManufacturingParameterStatus(true);
              setManufacturingParametersArray(
                res.data.manufacturingOperationsList[0].operations
              );
              setQaReleaseStore(res.data.manufacturingOperationsList[0]);
            } else if (
              res.data.manufacturingOperationsList[0].supervisor_status ==
              "SUPERVISOR_APPROVED"
            ) {
              setSupervisorOnlyMop(true);
              setMachineOpsNewSave(false);
              setManufacturingParameterStatus(false);
              setMachineOpsCheckedBy(
                res.data.manufacturingOperationsList[0].reviewedBy
              );
              setMachineOpsCheckedByDate(
                res.data.manufacturingOperationsList[0].reviewedDate
              );
              setMachineOpsPerformedBy(
                res.data.manufacturingOperationsList[0].verifiedBy
              );
              setMachineOpsPerformedByDate(
                res.data.manufacturingOperationsList[0].verfiedDate
              );
              const _1 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc1";
                  }
                );
              const _2 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc2";
                  }
                );
              const _3 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc3";
                  }
                );
              const _4 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc4";
                  }
                );
              const _5 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc5";
                  }
                );
              const _6 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc6";
                  }
                );
              const _7 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc7";
                  }
                );
              const _8 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc8";
                  }
                );
              const _9 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc9";
                  }
                );
              const _10 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc10";
                  }
                );
              const _11 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc11";
                  }
                );
              const _12 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc12";
                  }
                );
              const _13 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc13";
                  }
                );
              const _14 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc14";
                  }
                );
              const _15 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc15";
                  }
                );
              const _16 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc16";
                  }
                );
              const _17 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc17";
                  }
                );
              const _18 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc18";
                  }
                );

              console.log("fghjkl;", _1[0].machineOperationId);
              updateMachineOpsID({
                masterID: res.data.manufacturingOperationsList[0].summaryId,
                machineOpsQualityId1: _1[0].machineOperationId,
                machineOpsQualityId2: _2[0].machineOperationId,
                machineOpsQualityId3: _3[0].machineOperationId,
                machineOpsQualityId4: _4[0].machineOperationId,
                machineOpsQualityId5: _5[0].machineOperationId,
                machineOpsQualityId6: _6[0].machineOperationId,
                machineOpsQualityId7: _7[0].machineOperationId,
                machineOpsQualityId8: _8[0].machineOperationId,
                machineOpsQualityId9: _9[0].machineOperationId,
                machineOpsQualityId10: _10[0].machineOperationId,
                machineOpsQualityId11: _11[0].machineOperationId,
                machineOpsQualityId12: _12[0].machineOperationId,
                machineOpsQualityId13: _13[0].machineOperationId,
                machineOpsQualityId14: _14[0].machineOperationId,
                machineOpsQualityId15: _15[0].machineOperationId,
                machineOpsQualityId16: _16[0].machineOperationId,
                machineOpsQualityId17: _17[0].machineOperationId,
                machineOpsQualityId18: _18[0].machineOperationId,

                machineOpsSummaryId1: _1[0].summaryId,
                machineOpsSummaryId2: _2[0].summaryId,
                machineOpsSummaryId3: _3[0].summaryId,
                machineOpsSummaryId4: _4[0].summaryId,
                machineOpsSummaryId5: _5[0].summaryId,
                machineOpsSummaryId6: _6[0].summaryId,
                machineOpsSummaryId7: _7[0].summaryId,
                machineOpsSummaryId8: _8[0].summaryId,
                machineOpsSummaryId9: _9[0].summaryId,
                machineOpsSummaryId10: _10[0].summaryId,
                machineOpsSummaryId11: _11[0].summaryId,
                machineOpsSummaryId12: _12[0].summaryId,
                machineOpsSummaryId13: _13[0].summaryId,
                machineOpsSummaryId14: _14[0].summaryId,
                machineOpsSummaryId15: _15[0].summaryId,
                machineOpsSummaryId16: _16[0].summaryId,
                machineOpsSummaryId17: _17[0].summaryId,
                machineOpsSummaryId18: _18[0].summaryId,
              });


              setMOP_ASB_Observation(_1[0]?.observation1);
              setMOP_FDS_Observation(_2[0]?.observation1);
              setMOP_MDS_Observation(_3[0]?.observation1);
              setMOP_GLP_Line1_Observation(_4[0]?.observation1);
              setMOP_GLP_Line2_Observation(_4[0]?.observation2);
              setMOP_ERM_Line1_Observation(_5[0]?.observation1);
              setMOP_ERM_Line2_Observation(_5[0]?.observation2);
              setMOP_CPHP_Observation(_6[0]?.observation1);
              setMOP_CPSWT_Observation(_7[0]?.observation1);
              setMOP_HET_Line1_Observation(_8[0]?.observation1);
              setMOP_HET_Line2_Observation(_8[0]?.observation2);
              setMOP_COS_SLS_Observation(_9[0]?.observation1);
              setMOP_COS_Stripper_Observation(_10[0]?.observation1);
              setMOP_COS_FRS_Observation(_11[0]?.observation1);
              setMOP_COS_OCS_Observation(_12[0]?.observation1);
              setMOP_DS_IMSP_Observation(_13[0]?.observation1);
              setMOP_DS_CS_Observation(_14[0]?.observation1);
              setMOP_DS_SMV_Observation(_15[0]?.observation1);
              setMOP_FOS_FRS_Line1_Observation(_16[0]?.observation1);
              setMOP_FOS_FRS_Line2_Observation(_16[0]?.observation2);
              setMOP_FOS_BRS_Line1_Observation(_17[0]?.observation1);
              setMOP_FOS_BRS_Line2_Observation(_17[0]?.observation2);
              setMOP_AS_ReferSOP_Line1_Observation(_18[0]?.observation1);
              setMOP_AS_ReferSOP_Line2_Observation(_18[0]?.observation2);
            } else if (
              res.data.manufacturingOperationsList[0].supervisor_status ==
              "SUPERVISOR_SAVED" ||
              res.data.manufacturingOperationsList[0].supervisor_status ==
              "SUPERVISOR_APPROVED" ||
              res.data.manufacturingOperationsList[0].qa_status == "QA_SAVED"
            ) {
              setMachineOpsNewSave(false);
              setManufacturingParameterStatus(false);
              setMachineOpsCheckedBy(
                res.data.manufacturingOperationsList[0].reviewedBy
              );
              setMachineOpsCheckedByDate(
                res.data.manufacturingOperationsList[0].reviewedDate
              );
              setMachineOpsPerformedBy(
                res.data.manufacturingOperationsList[0].verifiedBy
              );
              setMachineOpsPerformedByDate(
                res.data.manufacturingOperationsList[0].verfiedDate
              );
              const _1 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc1";
                  }
                );
              const _2 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc2";
                  }
                );
              const _3 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc3";
                  }
                );
              const _4 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc4";
                  }
                );
              const _5 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc5";
                  }
                );
              const _6 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc6";
                  }
                );
              const _7 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc7";
                  }
                );
              const _8 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc8";
                  }
                );
              const _9 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc9";
                  }
                );
              const _10 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc10";
                  }
                );
              const _11 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc11";
                  }
                );
              const _12 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc12";
                  }
                );
              const _13 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc13";
                  }
                );
              const _14 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc14";
                  }
                );
              const _15 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc15";
                  }
                );
              const _16 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc16";
                  }
                );
              const _17 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc17";
                  }
                );
              const _18 =
                res.data.manufacturingOperationsList[0].operations.filter(
                  (x, i) => {
                    return x.description == "Desc18";
                  }
                );

              updateMachineOpsID({
                masterID: res.data.manufacturingOperationsList[0].summaryId,
                machineOpsQualityId1: _1[0].machineOperationId,
                machineOpsQualityId2: _2[0].machineOperationId,
                machineOpsQualityId3: _3[0].machineOperationId,
                machineOpsQualityId4: _4[0].machineOperationId,
                machineOpsQualityId5: _5[0].machineOperationId,
                machineOpsQualityId6: _6[0].machineOperationId,
                machineOpsQualityId7: _7[0].machineOperationId,
                machineOpsQualityId8: _8[0].machineOperationId,
                machineOpsQualityId9: _9[0].machineOperationId,
                machineOpsQualityId10: _10[0].machineOperationId,
                machineOpsQualityId11: _11[0].machineOperationId,
                machineOpsQualityId12: _12[0].machineOperationId,
                machineOpsQualityId13: _13[0].machineOperationId,
                machineOpsQualityId14: _14[0].machineOperationId,
                machineOpsQualityId15: _15[0].machineOperationId,
                machineOpsQualityId16: _16[0].machineOperationId,
                machineOpsQualityId17: _17[0].machineOperationId,
                machineOpsQualityId18: _18[0].machineOperationId,
                machineOpsSummaryId1: _1[0].summaryId,
                machineOpsSummaryId2: _2[0].summaryId,
                machineOpsSummaryId3: _3[0].summaryId,
                machineOpsSummaryId4: _4[0].summaryId,
                machineOpsSummaryId5: _5[0].summaryId,
                machineOpsSummaryId6: _6[0].summaryId,
                machineOpsSummaryId7: _7[0].summaryId,
                machineOpsSummaryId8: _8[0].summaryId,
                machineOpsSummaryId9: _9[0].summaryId,
                machineOpsSummaryId10: _10[0].summaryId,
                machineOpsSummaryId11: _11[0].summaryId,
                machineOpsSummaryId12: _12[0].summaryId,
                machineOpsSummaryId13: _13[0].summaryId,
                machineOpsSummaryId14: _14[0].summaryId,
                machineOpsSummaryId15: _15[0].summaryId,
                machineOpsSummaryId16: _16[0].summaryId,
                machineOpsSummaryId17: _17[0].summaryId,
                machineOpsSummaryId18: _18[0].summaryId,
              });
              //state for showing
              setMOP_ASB_Observation(_1[0]?.observation1);
              setMOP_FDS_Observation(_2[0]?.observation1);
              setMOP_MDS_Observation(_3[0]?.observation1);
              setMOP_GLP_Line1_Observation(_4[0]?.observation1);
              setMOP_GLP_Line2_Observation(_4[0]?.observation2);
              setMOP_ERM_Line1_Observation(_5[0]?.observation1);
              setMOP_CPHP_Observation(_6[0]?.observation1);
              setMOP_CPSWT_Observation(_7[0]?.observation1);
              setMOP_HET_Line1_Observation(_8[0]?.observation1);
              setMOP_HET_Line2_Observation(_8[0]?.observation2);
              setMOP_COS_SLS_Observation(_9[0]?.observation1);
              setMOP_COS_Stripper_Observation(_10[0]?.observation1);
              setMOP_COS_FRS_Observation(_11[0]?.observation1);
              setMOP_COS_OCS_Observation(_12[0]?.observation1);
              setMOP_DS_IMSP_Observation(_13[0]?.observation1);
              setMOP_DS_CS_Observation(_14[0]?.observation1);
              setMOP_DS_SMV_Observation(_15[0]?.observation1);
              setMOP_FOS_FRS_Line1_Observation(_16[0]?.observation1);
              setMOP_FOS_FRS_Line2_Observation(_16[0]?.observation2);
              setMOP_FOS_BRS_Line1_Observation(_17[0]?.observation1);
              setMOP_FOS_BRS_Line2_Observation(_17[0]?.observation2);
              setMOP_AS_ReferSOP_Line1_Observation(_18[0]?.observation1);
              setMOP_AS_ReferSOP_Line2_Observation(_18[0]?.observation2);
            }
            break;
          case "10":
            updateProductionReconciliation({
              inputQty: res.data.productionReconillation.inputQuantity,
              outPutQty: res.data.productionReconillation.outputQuantity,
              YieldSpecification:
                res.data.productionReconillation.yieldQuantity,
            });
            break;
          case "11":

            const filterDate = pd_ManufacturingStartDate.split("/");
            const filterDate2 = pd_ManufacturingCompletionDate.split("/");
            console.log(
              "gg76",
              `${filterDate[2]}-${filterDate[1]}-${filterDate[0]}`
            );
            if (res.data.shoppageDetailsList.length == 0) {
              setStoppageDetailsStatus(false);
              axios
                .get(
                  `${API.prodUrl}/Precot/api/bleaching/summary/shoppage?date1=${filterDate[2]}-${filterDate[1]}-${filterDate[0]}&date2=${filterDate2[2]}-${filterDate2[1]}-${filterDate2[0]}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((res) => {
                  console.log("Stoppage Details", res.data);

                  setPdeArray(res.data);
                  if (res.data.length == 0) {
                    message.error("No Data Found");
                  } else {
                    messageApi.open({
                      type: "success",
                      content: "Data Fetched Successfully",
                    });
                  }
                })
                .catch((err) => {
                  console.log("Error", err);
                });
            } else {
              console.log("working here");
              setPdeArray(res.data.shoppageDetailsList[0].details);
              setPdeRev(res.data.shoppageDetailsList[0].reviewedBy);
              setPdeD(res.data.shoppageDetailsList[0].endDate);
              setProcessId(res.data.shoppageDetailsList[0].process_id);
              setStoppageDetailsStore(res.data.shoppageDetailsList[0].details);
              if (
                res.data.shoppageDetailsList[0].status == "SUPERVISOR_APPROVED"
              ) {
                setStoppageDetailsStatus(true);
              } else {
                setStoppageDetailsStatus(false);
              }
            }
            break;
          case "12":
            console.log("entered sase 12 processDeviationRecords")

            if (res.data.processDeviationRecords.length == 0) {
              setProcessDeviationStatus(false);
              updateProcessDeviationValidation({
                beforeQAConditionForSupervisor: true,
              })
              console.log("beforeQAConditionForSupervisor", processDeviationStatus.beforeQAConditionForSupervisor);
            }

            if (
              role == "ROLE_QA" &&
              res.data.processDeviationRecords[0].status == "QA_APPROVED"
            ) {
              setProcessDeviationStatus(true);
            }
            if (
              role == "ROLE_SUPERVISOR" &&
              (res.data.processDeviationRecords[0].status !== "QA_APPROVED" ||
                res.data.processDeviationRecords[0].status ==
                "SUPERVISOR_APPROVED")
            ) {
              setProcessDeviationStatus(true);
            }
            console.log("reches res.data.processDeviationRecords.length == 0)");


            setPdrNewSave(true);
            updateDeviationLogNo({
              one: res.data.processDeviationRecords[0].deviationLogNo,
              two: res.data.processDeviationRecords[1].deviationLogNo,
              three: res.data.processDeviationRecords[2].deviationLogNo,
            });
            updateRemarksQA({
              one: res.data.processDeviationRecords[0].qaRemarks,
              two: res.data.processDeviationRecords[1].qaRemarks,
              three: res.data.processDeviationRecords[2].qaRemarks,
            });
            updateDateProd({
              one: res.data.processDeviationRecords[0].signDate,
              two: res.data.processDeviationRecords[1].signDate,
              three: res.data.processDeviationRecords[2].signDate,
            });
            updateDateQA({
              one: res.data.processDeviationRecords[0].qa_saved_on,
              two: res.data.processDeviationRecords[1].qa_saved_on,
              three: res.data.processDeviationRecords[2].qa_saved_on,
            });
            pdrSignOnChange1(res.data.processDeviationRecords[0].sign);
            pdrSignOnChangeQA1(
              res.data.processDeviationRecords[0].qa_saved_by
            );
            pdrSignOnChange2(res.data.processDeviationRecords[1].sign);
            pdrSignOnChangeQA2(
              res.data.processDeviationRecords[1].qa_saved_by
            );
            pdrSignOnChange3(res.data.processDeviationRecords[2].sign);
            pdrSignOnChangeQA3(
              res.data.processDeviationRecords[2].qa_saved_by
            );
            setPdrId1(res.data.processDeviationRecords[0].id);
            setPdrId2(res.data.processDeviationRecords[1].id);
            setPdrId3(res.data.processDeviationRecords[2].id);
            if (
              res.data.processDeviationRecords[0].status == "QA_APPROVED" ||
              res.data.processDeviationRecords[0].status == "QA_SUBMITTED"
            ) {
              setProcessDeviationArray(res.data.processDeviationRecords);
            } else {
              setProcessDeviationStatus(false);
            }
            updateProcessDeviationValidation({

              supervisorSaved:
                res.data.processDeviationRecords[0].status ==
                  "SUPERVISOR_SAVED"
                  ? true
                  : false,
              supervisorApproved:
                res.data.processDeviationRecords[0].status ==
                  "SUPERVISOR_APPROVED"
                  ? true
                  : false,
              qaSaved:
                res.data.processDeviationRecords[0].status == "QA_APPROVED"
                  ? true
                  : false,
              qaApproved:
                res.data.processDeviationRecords[0].status == "QA_APPROVED"
                  ? true
                  : false,
            });

            break;
          case "13":
            setListOfEnclosuresArray(res.data.summaryRecordVerificationList);
            if (
              res.data.summaryRecordVerificationList == "" ||
              res.data.summaryRecordVerificationList.enclosureList.length == 0
            ) {
              //message.error("Please Submit Verification Of Records");
            } else {
              setListOfEnclosureStore(
                res.data.summaryRecordVerificationList.enclosureList
              );
              setEnclosure1Status(
                res.data.summaryRecordVerificationList.enclosureList[0].status
              );
              setEnclosure2Status(
                res.data.summaryRecordVerificationList.enclosureList[1].status
              );
              setEnclosure3Status(
                res.data.summaryRecordVerificationList.enclosureList[2].status
              );
              updateListOfEnclousres({
                bleaching_job_card:
                  res.data.summaryRecordVerificationList.enclosureList[0]
                    .remark1,
                process_equipment_calibration:
                  res.data.summaryRecordVerificationList.enclosureList[1]
                    .remark1,
                freetext_new:
                  res.data.summaryRecordVerificationList.enclosureList[2]
                    .remark1,
              });
              updateList({
                bleaching:
                  res.data.summaryRecordVerificationList.enclosureList[0]
                    .remark1 == "ATTACHED"
                    ? true
                    : false,
                annexure:
                  res.data.summaryRecordVerificationList.enclosureList[1]
                    .remark1 == "ATTACHED"
                    ? true
                    : false,
                freetext:
                  res.data.summaryRecordVerificationList.enclosureList[2]
                    .remark1 == "ATTACHED"
                    ? true
                    : false,
                summary_record_id1:
                  res.data.summaryRecordVerificationList.enclosureList[0]
                    .summary_record_id,
                enclosureId1:
                  res.data.summaryRecordVerificationList.enclosureList[0]
                    .enclosureId,
                summary_record_id2:
                  res.data.summaryRecordVerificationList.enclosureList[1]
                    .summary_record_id,
                enclosureId2:
                  res.data.summaryRecordVerificationList.enclosureList[1]
                    .enclosureId,
                summary_record_id3:
                  res.data.summaryRecordVerificationList.enclosureList[2]
                    .summary_record_id,
                enclosureId3:
                  res.data.summaryRecordVerificationList.enclosureList[2]
                    .enclosureId,
              });

              setFreezeEnclosureQa(
                res.data.summaryRecordVerificationList.enclosureList[2]
                  .status == "QA_APPROVED"
                  ? true
                  : false
              );
              setFreezeEnclosureSup(
                res.data.summaryRecordVerificationList.enclosureList[0]
                  .status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
              if (
                (res.data.summaryRecordVerificationList.enclosureList[2]
                  .status == "QA_APPROVED" &&
                  loggedInQa) ||
                (res.data.summaryRecordVerificationList.enclosureList[0]
                  .status == "SUPERVISOR_APPROVED" &&
                  loggedInSupervisor)
              ) {
                setListOfEnclosureStatus(true);
              } else {
                setListOfEnclosureStatus(false);
              }
            }
            break;
          case "14":


            // POST PRODUCTOIN DETAILS
            const a = res.data.bmrCompletionTable.filter((x, i) => {
              return x.form == "POST PRODUCTOIN DETAILS";
            });
            console.log(" a[0].status", a[0].status);
            console.log("a", a);
            if (a.length == 0) {
              setPostProdStatus(false);
            } else if (
              a[0].supervisorName.length == 0 ||
              a[0].shoppageDate2.length == 0 ||
              a[0].hodName.length == 0 ||
              a[0].shoppageDate.length == 0 ||
              a[0].qaName.length == 0 ||
              a[0].date.length == 0
            ) {
              setPostProdStatus(false);
              setPprNewSave(true);
              setPostProdHod(
                a[0].hodName.length > 0 && a[0].shoppageDate.length > 0
                  ? true
                  : false
              );
              setPostProdQa(
                a[0].qaName.length > 0 && a[0].date.length > 0 ? true : false
              );
              setPostProdSup(
                a[0].supervisorName.length > 0 && a[0].shoppageDate2.length > 0
                  ? true
                  : false
              );
              console.log("a", a);
              updatePostProduction({
                prodSupName: a[0].supervisorName,
                prodSupDate: a[0].shoppageDate2,
                hodName: a[0].hodName,
                hodDate: a[0].shoppageDate,
                QaName: a[0].qaName,
                QaDate: a[0].date,
              });
              setPostProdSubmitStatus(a[0].status);
              setPprId(a[0].id);
            } else {
              setPostProdStatus(true);
              setPostProdArrayNew(a);
            }

            break;
          case "15":


            if (
              res.data.manufacturingOperationsList[0].qualityRelease.length == 0
            ) {
              setQastatus(false);
            } else {
              setQaReleaseSubmit(
                res.data.manufacturingOperationsList[0].qualityRelease[0]
                  .status == "QA_APPROVED"
                  ? true
                  : false
              );
              setQaReleaseSave(
                res.data.manufacturingOperationsList[0].qualityRelease[0]
                  .status == "QA_SAVED"
                  ? true
                  : false
              );
              if (
                res.data.manufacturingOperationsList[0].qualityRelease[0]
                  .status == "QA_APPROVED"
              ) {
                setQastatus(true);
                setQualityReleaseStore(
                  res.data.manufacturingOperationsList[0].qualityRelease
                );
              } else {
                setQastatus(false);
                console.log(
                  "QA",
                  res.data.manufacturingOperationsList[0].qualityRelease
                );
                updateQaReleaseObject({
                  criticalProcessParameter:
                    res.data.manufacturingOperationsList[0].qualityRelease[0]
                      .status1,
                  ProcessChecksReviewed:
                    res.data.manufacturingOperationsList[0].qualityRelease[1]
                      .status1,
                  DeviationReviewes:
                    res.data.manufacturingOperationsList[0].qualityRelease[2]
                      .status1,
                  DeivationLogged:
                    res.data.manufacturingOperationsList[0].qualityRelease[3]
                      .status1,
                  BatchReleased:
                    res.data.manufacturingOperationsList[0].qualityRelease[4]
                      .status1,

                });
                updateQa({
                  Sign1:
                    res.data.manufacturingOperationsList[0].qualityRelease[0]
                      .signature,
                  Date1:
                    res.data.manufacturingOperationsList[0].qualityRelease[0]
                      .date,
                  Sign2:
                    res.data.manufacturingOperationsList[0].qualityRelease[1]
                      .signature,
                  Date2:
                    res.data.manufacturingOperationsList[0].qualityRelease[1]
                      .date,
                  Sign3:
                    res.data.manufacturingOperationsList[0].qualityRelease[2]
                      .signature,
                  Date3:
                    res.data.manufacturingOperationsList[0].qualityRelease[2]
                      .date,
                  Sign4:
                    res.data.manufacturingOperationsList[0].qualityRelease[3]
                      .signature,
                  Date4:
                    res.data.manufacturingOperationsList[0].qualityRelease[3]
                      .date,
                  Sign5:
                    res.data.manufacturingOperationsList[0].qualityRelease[4]
                      .signature,
                  Date5:
                    res.data.manufacturingOperationsList[0].qualityRelease[4]
                      .date,
                });
              }
            }

            break;

          case "16":
            const b = res.data.bmrCompletionTable.filter(
              (x) => x.form === "PRODUCTION RELEASE"
            );
            console.log("PRODUCTION RELEASE entered to product relaes");
            if (b.length === 0) {
              setProductReleaseStatus(false);

              setProdRelease({
                Name1: "",
                Name2: "",
                Sign1: "",
                Sign2: "",
                Date1: "",
                Date2: "",
              });

              setFieldsDisabled({
                qaInspector: false,
                qaManager: false,
              });
            } else {
              const productionReleaseData = b[0];
              setProductReleaseStatus(true);
              setProductReleaseArray(b);
              setPrintBtnEnable(true);
              setPrintValidation(true);

              setProdRelease({
                Name1: productionReleaseData.supervisorName || "",
                Name2: productionReleaseData.qaName || "",
                Sign1: productionReleaseData.supervisorName || "",
                Sign2: productionReleaseData.qaName || "",
                Date1: productionReleaseData.shoppageDate || "",
                Date2: productionReleaseData.shoppageDate2 || "",
              });
              console.log(
                "productionReleaseData.supervisiorName",
                productionReleaseData.supervisorName,
                productionReleaseData.status
              );
              console.log(
                "productionReleaseData.qaName",
                productionReleaseData.qaName
              );

              const isQaInspectorSubmitted = !!(
                (productionReleaseData.status == "QA_INSPECTOR_SUBMITTED")

              );

              const isQaManagerSubmitted = !!(
                (productionReleaseData.status == "QA_MANAGER_APPROVED")

              );
              console.log("isQaInspectorSubmitted", isQaInspectorSubmitted);
              console.log("isQaManagerSubmitted", isQaManagerSubmitted);


              setFieldsDisabled({

                qaInspector: isQaInspectorSubmitted,
                qaManager: !isQaInspectorSubmitted || isQaManagerSubmitted,
              });
            }

            break;
          default:
            break;
        }

        updateProdLov({
          produtionProductionSign:
            res.data.bmrCompletionTable[0].supervisorName || "",
        });
        updateProdLov({
          rawCottonIssueProdSign:
            res.data.bmrCompletionTable[1].supervisorName || "",
        });

        setBmrSummary(res.data);
        updateFlags({
          postProduction: true,
          rawCottonIssued: true,
        });
      })
      .catch((err) => {
      });
  };

  function fetchGenerationDetails() {
    //QA
    axios
      .get(
        `${API.prodUrl}/Precot/api/bleaching/generation/generationDetailsByBmr?bmrNumber=${bmr}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log("Array of objects from API:", data);

        if (Array.isArray(data) && data.length > 0) {
          console.log("formatDate(data[0]?.createdBy)", data[0]?.createdBy);
          setProductionSign1(usernameSupervisor)
          SetQaSign1(data[0]?.createdBy);
          console.log("formatDate(data[0]?.createdAt)", data[0]?.createdAt);

          setProductionLovStates((prevState) => ({
            ...prevState,
            productionQADate: formatDateForInput1(data[0]?.genDate),
          }));

        } else {
          console.warn("No data received from API");
        }
      })
      .catch((error) => {
        console.error("Error fetching generation details:", error);
      });


  }

  const overallBMR = () => {
    if (role == "ROLE_QA" || role === "ROLE_SUPERVISOR") {
      fetchGenerationDetails();
    }
    datePDE(localStorage.getItem("bleaching_prod_end_date"));
    setPdeDate2(localStorage.getItem("bleaching_prod_end_date"));
    setPdeDate(localStorage.getItem("bleaching_prod_start_date"));
    const filteredBmr = bmrStore.filter((x, i) => {
      return x.bmr_no == bmr;
    });

    if (filteredBmr[0].status == "OPEN") {
      setBmrStatus(true);
    } else if (filteredBmr[0].status == "CLOSED" || "COMPLETED") {
      setBmrStatus(false);
    }

    axios
      .get(
        `${API.prodUrl}/Precot/api/bleaching/summary/batchByBleach?bmr_no=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Resposne of Batch", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
          };
        });
        setBatchLov(a);
      })
      .catch((err) => {
        console.log("Error", err);
      });

    const v = findLaydown.filter((x, i) => {
      return bmr == x.bmr_no;
    });

    console.log("V", v);
    setLaydownNo(v[0].laydown_no);
    setLoading(true);
    axios
      .get(
        `${API.prodUrl}/Precot/api/bleaching/summary/getFullSummary?bmr_no=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        onChangeSequentially(bmr);
        if (res.data.productionDetails.length > 0) {
          console.log("mmmmm", res.data.productionDetails[0]);
          setPd_ID(res.data.productionDetails[0].prodDetailsId);
          setPd_ProdStatus(res.data.productionDetails[0].supervisiorStatus);
          setPd_QaStatus(res.data.productionDetails[0].qaStatus);
          setPd_Status(res.data.productionDetails[0].status);
          setPd_Disable(
            (loggedInSupervisor &&
              (res.data.productionDetails[0].status == "SUPERVISOR_APPROVED" ||
                res.data.productionDetails[0].status == "QA_APPROVED")) ||
            (loggedInQa &&
              res.data.productionDetails[0].status == "QA_APPROVED")
          );
          setPd_QaId(res.data.productionDetails[0].qaId);
          setPd_Status(res.data.productionDetails[0].status);

          if (res.data.productionDetails[0]?.mixing !== null) {
            if (
              res.data.productionDetails[0]?.mixing
                ?.toLowerCase()
                .includes("export")
            ) {
              setpd_ProductsupplyExport("TICK");
              setpd_ProductsupplyInhouse("NA");
            } else {
              setpd_ProductsupplyInhouse("TICK");
              setpd_ProductsupplyExport("NA");
            }
          } else {
            setpd_ProductsupplyInhouse("NA");
            setpd_ProductsupplyExport("NA");
          }

          setPd_BatchQty1(res.data.productionDetails[0].baleCount);
          setPd_BatchQty2(res.data.productionDetails[0].batchCount);
          setPd_BatchQuantity(res.data.productionDetails[0].batchQuantity);
          setPd_Mixing(res.data.productionDetails[0].mixing);
          setPd_StartSub(res.data.productionDetails[0].startSubBatch);
          setPd_EndSub(res.data.productionDetails[0].endSubBatch);



          const finishingValue = res.data.productionDetails[0].finishing;

          setpd_FinishSoft(
            finishingValue ? finishingValue.toLowerCase().trim() === "soft" ? "TICK" : "NA" : "NA"
          );

          setpd_pd_finish_Crish(
            finishingValue
              ? (finishingValue.toLowerCase().trim() === "crisp" || finishingValue.toLowerCase().trim() === "cri")
                ? "TICK"
                : "NA"
              : "NA"
          );

          setPd_ManufacturingStartDate(
            res.data.productionDetails[0].startDate.slice(0, 10)
          );

          setPd_ManufacturingCompletionDate(
            res.data.productionDetails[0].endDate.slice(0, 10)
          );

          localStorage.setItem(
            "bleaching_prod_start_date",
            res.data.productionDetails[0].startDate
          );

          localStorage.setItem(
            "bleaching_prod_end_date",
            res.data.productionDetails[0].endDate
          );

          setPd_ManufacturingStartTime(res.data.productionDetails[0].startTime);

          setPd_ManufacturingCompletionTime(
            res.data.productionDetails[0].endTime
          );

          Qa1SignOnchange(res.data.productionDetails[0].qaName);
          Prod1SignChange(res.data.productionDetails[0].supervisiorName);
          updateProdLov({
            productionDate: res.data.productionDetails[0].supervisiorDate || localDateValue4,
          });
          updateProdLov({
            productionQADate: res.data.productionDetails[0].qaDate,
          });

          setManufacturingParametersStore(res.data.manufacturingOperationsList);

          setLoading(false);
        } else {

          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setLoading(false);

      });
  };

  const saveVerificationRecords = () => {
    console.log("Verification Of Records", vorStateObject);
    const payload = {
      bmr_no: bmr,
      key: "VERIFICATION",
      summaryRecordId: verificationID.masterID,
      summaryVerification: [
        {
          recordName: "Housekeeping",
          status:
            vorStateObject.housekeeping == "TICK"
              ? "Satisfactory"
              : vorStateObject.housekeeping == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          status2:
            vorStateObject.housekeeping == "TICK"
              ? "Satisfactory"
              : vorStateObject.housekeeping == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          verifiedBy: verifiedbySign.housekeeping || username,
          verifiedId: "",
          reviewerId: "",
          reviewedBy: performedbySign.housekeeping || usernameSupervisor,
          date1: verifiedbyDate.housekeeping || localDateValue,
          date2: performedbyDate.housekeeping,
          summaryVerficationId: verificationID.housekeepingVerificationId,
          summary_record_id: verificationID.housekeepingId,
        },
        {
          recordName: "Machine",
          status:
            vorStateObject.machineCleaning == "TICK"
              ? "Satisfactory"
              : vorStateObject.machineCleaning == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          status2:
            vorStateObject.machineCleaning == "TICK"
              ? "Satisfactory"
              : vorStateObject.machineCleaning == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          verifiedBy: verifiedbySign.machineCleaning || username,
          verifiedId: "",
          reviewerId: "",
          reviewedBy: performedbySign.machineCleaning || usernameSupervisor,
          date1: verifiedbyDate.machineCleaning || localDateValue,
          date2: performedbyDate.machineCleaning,
          summaryVerficationId: verificationID.machineCleaningVerificationId,
          summary_record_id: verificationID.machineCleaningId,
        },
        {
          recordName: "Logbook",
          status:
            vorStateObject.logbook == "TICK"
              ? "Satisfactory"
              : vorStateObject.logbook == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          status2:
            vorStateObject.logbook == "TICK"
              ? "Satisfactory"
              : vorStateObject.logbook == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          verifiedBy: verifiedbySign.logbook || username,
          verifiedId: "",
          reviewerId: "",
          reviewedBy: performedbySign.logbook || usernameSupervisor,
          date1: verifiedbyDate.logbook || localDateValue,
          date2: performedbyDate.logbook,
          summaryVerficationId: verificationID.logbookVerificationId,
          summary_record_id: verificationID.logbookId,
        },
        {
          recordName: "Production",
          status:
            vorStateObject.productionRecord == "TICK"
              ? "Satisfactory"
              : vorStateObject.productionRecord == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          status2:
            vorStateObject.productionRecord == "TICK"
              ? "Satisfactory"
              : vorStateObject.productionRecord == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          verifiedBy: verifiedbySign.productionRecord || username,
          verifiedId: "",
          reviewerId: "",
          reviewedBy: performedbySign.productionRecord || usernameSupervisor,
          date1: verifiedbyDate.productionRecord || localDateValue,
          date2: performedbyDate.productionRecord,
          summaryVerficationId: verificationID.productionRecordVerificationId,
          summary_record_id: verificationID.productionRecordId,
        },
        {
          recordName: "Machine Sanitizer",
          status:
            vorStateObject.machineSanitizer == "TICK"
              ? "Satisfactory"
              : vorStateObject.machineSanitizer == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          status2:
            vorStateObject.machineSanitizer == "TICK"
              ? "Satisfactory"
              : vorStateObject.machineSanitizer == "CROSS"
                ? "Not Satisfactory"
                : "NA",
          verifiedBy: verifiedbySign.machineSanitizer || username,
          verifiedId: "",
          reviewerId: "",
          reviewedBy: performedbySign.machineSanitizer || usernameSupervisor,
          date1: verifiedbyDate.machineSanitizer || localDateValue,
          date2: performedbyDate.machineSanitizer,
          summaryVerficationId: verificationID.machineSanitizerVerificationId,
          summary_record_id: verificationID.machineSanitizerId,
        },
      ],
      enclosureList: [],
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/saveRecordVerification`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Verification POST", res.data);

        messageApi.open({
          type: "success",
          content: "Verification Of Records Saved Successfully",
        });
        onChange("7", bmr);
      })
      .catch((err) => {
        console.log("Error", err.response.data.message);
        messageApi.open({
          type: "error",
          content: err.response.data.message + "" + bmr,
        });
      });

  };

  const submitVerificationRecords = () => {
    if (loggedInSupervisor) {
      console.log("Verification Of Records", vorStateObject);
      const payload = {
        bmr_no: bmr,
        key: "VERIFICATION",

        summaryVerification: [
          {
            recordName: "Housekeeping",
            status:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.housekeeping || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.housekeeping || usernameSupervisor,
            date1: verifiedbyDate.housekeeping || localDateValue,
            date2: performedbyDate.housekeeping,

          },
          {
            recordName: "Machine",
            status:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineCleaning || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineCleaning || usernameSupervisor,
            date1: verifiedbyDate.machineCleaning || localDateValue,
            date2: performedbyDate.machineCleaning,

          },
          {
            recordName: "Logbook",
            status:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.logbook || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.logbook || usernameSupervisor,
            date1: verifiedbyDate.logbook || localDateValue,
            date2: performedbyDate.logbook,

          },
          {
            recordName: "Production",
            status:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.productionRecord || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.productionRecord || usernameSupervisor,
            date1: verifiedbyDate.productionRecord || localDateValue,
            date2: performedbyDate.productionRecord,

          },
          {
            recordName: "Machine Sanitizer",
            status:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineSanitizer || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineSanitizer || usernameSupervisor,
            date1: verifiedbyDate.machineSanitizer || localDateValue,
            date2: performedbyDate.machineSanitizer,

          },
        ],
        enclosureList: [],
      };

      const payload_2 = {
        bmr_no: bmr,
        key: "VERIFICATION",
        summaryRecordId: verificationID.masterID,
        summaryVerification: [
          {
            recordName: "Housekeeping",
            status:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.housekeeping || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.housekeeping || usernameSupervisor,
            date1: verifiedbyDate.housekeeping || localDateValue,
            date2: performedbyDate.housekeeping,
            summaryVerficationId: verificationID.housekeepingVerificationId,
            summary_record_id: verificationID.housekeepingId,
          },
          {
            recordName: "Machine",
            status:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineCleaning || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineCleaning || usernameSupervisor,
            date1: verifiedbyDate.machineCleaning || localDateValue,
            date2: performedbyDate.machineCleaning,
            summaryVerficationId: verificationID.machineCleaningVerificationId,
            summary_record_id: verificationID.machineCleaningId,
          },
          {
            recordName: "Logbook",
            status:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.logbook || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.logbook || usernameSupervisor,
            date1: verifiedbyDate.logbook || localDateValue,
            date2: performedbyDate.logbook,
            summaryVerficationId: verificationID.logbookVerificationId,
            summary_record_id: verificationID.logbookId,
          },
          {
            recordName: "Production",
            status:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.productionRecord || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.productionRecord || usernameSupervisor,
            date1: verifiedbyDate.productionRecord || localDateValue,
            date2: performedbyDate.productionRecord,
            summaryVerficationId: verificationID.productionRecordVerificationId,
            summary_record_id: verificationID.productionRecordId,
          },
          {
            recordName: "Machine Sanitizer",
            status:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineSanitizer || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineSanitizer || usernameSupervisor,
            date1: verifiedbyDate.machineSanitizer || localDateValue,
            date2: performedbyDate.machineSanitizer,
            summaryVerficationId: verificationID.machineSanitizerVerificationId,
            summary_record_id: verificationID.machineSanitizerId,
          },
        ],
        enclosureList: [],
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/SubmitRecordVerification`,
          newSave ? payload_2 : payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Verification POST", res.data);

          messageApi.open({
            type: "success",
            content: "Verification Of Records Submitted Successfully",
          });
          onChange("7", bmr);
        })
        .catch((err) => {
          console.log("Error", err.response.data.message);
          messageApi.open({
            type: "error",
            content: err.response.data.message + "" + bmr,
          });
        });

    } else if (loggedInQa) {

      console.log("Verification Of Records", vorStateObject);
      const payload = {
        bmr_no: bmr,
        key: "VERIFICATION",
        summaryVerification: [
          {
            recordName: "Housekeeping",
            status:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.housekeeping || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.housekeeping || usernameSupervisor,
            date1: verifiedbyDate.housekeeping || localDateValue,
            date2: performedbyDate.housekeeping,

          },
          {
            recordName: "Machine",
            status:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineCleaning || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineCleaning || usernameSupervisor,
            date1: verifiedbyDate.machineCleaning || localDateValue,
            date2: performedbyDate.machineCleaning,

          },
          {
            recordName: "Logbook",
            status:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.logbook || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.logbook || usernameSupervisor,
            date1: verifiedbyDate.logbook || localDateValue,
            date2: performedbyDate.logbook,

          },
          {
            recordName: "Production",
            status:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.productionRecord || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.productionRecord || usernameSupervisor,
            date1: verifiedbyDate.productionRecord || localDateValue,
            date2: performedbyDate.productionRecord,

          },
          {
            recordName: "Machine Sanitizer",
            status:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineSanitizer || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineSanitizer || usernameSupervisor,
            date1: verifiedbyDate.machineSanitizer || localDateValue,
            date2: performedbyDate.machineSanitizer,

          },
        ],
        enclosureList: [],
      };

      const payload_2 = {
        bmr_no: bmr,
        key: "VERIFICATION",
        summaryRecordId: verificationID.masterID,
        summaryVerification: [
          {
            recordName: "Housekeeping",
            status:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.housekeeping == "TICK"
                ? "Satisfactory"
                : vorStateObject.housekeeping == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.housekeeping || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.housekeeping || usernameSupervisor,
            date1: verifiedbyDate.housekeeping || localDateValue,
            date2: performedbyDate.housekeeping,
            summaryVerficationId: verificationID.housekeepingVerificationId,
            summary_record_id: verificationID.housekeepingId,
          },
          {
            recordName: "Machine",
            status:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineCleaning == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineCleaning == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineCleaning || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineCleaning || usernameSupervisor,
            date1: verifiedbyDate.machineCleaning || localDateValue,
            date2: performedbyDate.machineCleaning,
            summaryVerficationId: verificationID.machineCleaningVerificationId,
            summary_record_id: verificationID.machineCleaningId,
          },
          {
            recordName: "Logbook",
            status:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.logbook == "TICK"
                ? "Satisfactory"
                : vorStateObject.logbook == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.logbook || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.logbook || usernameSupervisor,
            date1: verifiedbyDate.logbook || localDateValue,
            date2: performedbyDate.logbook,
            summaryVerficationId: verificationID.logbookVerificationId,
            summary_record_id: verificationID.logbookId,
          },
          {
            recordName: "Production",
            status:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.productionRecord == "TICK"
                ? "Satisfactory"
                : vorStateObject.productionRecord == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.productionRecord || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.productionRecord || usernameSupervisor,
            date1: verifiedbyDate.productionRecord || localDateValue,
            date2: performedbyDate.productionRecord,
            summaryVerficationId: verificationID.productionRecordVerificationId,
            summary_record_id: verificationID.productionRecordId,
          },
          {
            recordName: "Machine Sanitizer",
            status:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            status2:
              vorStateObject.machineSanitizer == "TICK"
                ? "Satisfactory"
                : vorStateObject.machineSanitizer == "CROSS"
                  ? "Not Satisfactory"
                  : "NA",
            verifiedBy: verifiedbySign.machineSanitizer || username,
            verifiedId: "",
            reviewerId: "",
            reviewedBy: performedbySign.machineSanitizer || usernameSupervisor,
            date1: verifiedbyDate.machineSanitizer || localDateValue,
            date2: performedbyDate.machineSanitizer,
            summaryVerficationId: verificationID.machineSanitizerVerificationId,
            summary_record_id: verificationID.machineSanitizerId,
          },
        ],
        enclosureList: [],
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/SubmitRecordVerification`,
          newSave ? payload_2 : payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Verification POST", res.data);
          messageApi.open({
            type: "success",
            content: "Verification Of Records Submitted Successfully",
          });
          onChange("7", bmr);
        })
        .catch((err) => {
          console.log("Error", err.response.data.message);
          messageApi.open({
            type: "error",
            content: err.response.data.message + "" + bmr,
          });
        });
    }
  };

  const SubmitManufacturingSteps = () => {
    if (loggedInSupervisor) {
      {
        const payload = {
          stage: "Initial",
          operation: "Switch 'ON' all the machines & Sub machines",
          bmr_no: bmr,
          key: "VERIFICATION",
          manufacturingOperations: [
            {
              operation: "Operation1",
              observation1:
                manufacturingSteps.SwitchOn == "READY"
                  ? "Ready"
                  : manufacturingSteps.SwitchOn == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              observation2:
                manufacturingSteps.SwitchOn == "READY"
                  ? "Ready"
                  : manufacturingSteps.SwitchOn == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.one || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.one || username,
              date1: manufacturingStepsPerformedbydate.one,
              date2: manufacturingStepsVerifiedbydate.one || localDateValue,
            },
            {
              operation: "Operation2",
              observation1:
                manufacturingSteps.BlowroomRawMaterial == "READY"
                  ? "Ready"
                  : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomRawMaterial == "READY"
                  ? "Ready"
                  : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.two || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.two || username,
              date1: manufacturingStepsPerformedbydate.two,
              date2: manufacturingStepsVerifiedbydate.two || localDateValue,
            },
            {
              operation: "Operation3",
              observation1:
                manufacturingSteps.BlowroomWorkingArea == "WA1"
                  ? "WA1"
                  : manufacturingSteps.BlowroomWorkingArea == "WA2"
                    ? "WA2"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomWorkingArea == "WA1"
                  ? "WA1"
                  : manufacturingSteps.BlowroomWorkingArea == "WA2"
                    ? "WA2"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.three || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.three || username,
              date1: manufacturingStepsPerformedbydate.three,
              date2: manufacturingStepsVerifiedbydate.three || localDateValue,
            },
            {
              operation: "Operation4",
              observation1:
                manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.four || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.four || username,
              date1: manufacturingStepsPerformedbydate.four,
              date2: manufacturingStepsVerifiedbydate.four || localDateValue,
            },
            {
              operation: "Operation5",
              observation1:
                manufacturingSteps.BlowroomCardingProcess == "ON"
                  ? "On"
                  : manufacturingSteps.BlowroomCardingProcess == "OFF"
                    ? "Off"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomCardingProcess == "ON"
                  ? "On"
                  : manufacturingSteps.BlowroomCardingProcess == "OFF"
                    ? "Off"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.five || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.five || username,
              date1: manufacturingStepsPerformedbydate.five,
              date2: manufacturingStepsVerifiedbydate.five || localDateValue,
            },
            {
              operation: "Operation6",
              observation1:
                manufacturingSteps.BleachingCakePressing == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingCakePressing == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.six || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.six || username,
              date1: manufacturingStepsPerformedbydate.six,
              date2: manufacturingStepsVerifiedbydate.six || localDateValue,
            },
            {
              operation: "Operation7",
              observation1:
                manufacturingSteps.BleachingKier == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingKier == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.seven || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.seven || username,
              date1: manufacturingStepsPerformedbydate.seven,
              date2: manufacturingStepsVerifiedbydate.seven || localDateValue,
            },
            {
              operation: "Operation8",
              observation1:
                manufacturingSteps.BleachingHydro == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingHydro == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.eight || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.eight || username,
              date1: manufacturingStepsPerformedbydate.eight,
              date2: manufacturingStepsVerifiedbydate.eight || localDateValue,
            },
            {
              operation: "Operation9",
              observation1:
                manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingProcessCakeOpener ==
                    "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingProcessCakeOpener ==
                    "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.nine || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.nine || username,
              date1: manufacturingStepsPerformedbydate.nine,
              date2: manufacturingStepsVerifiedbydate.nine || localDateValue,
            },
          ],
        };

        const payload_2 = {
          stage: "Initial",
          operation: "Switch 'ON' all the machines & Sub machines",
          bmr_no: bmr,
          key: "VERIFICATION",
          manufacturingId: manufacturingID.masterID,
          manufacturingOperations: [
            {
              operation: "Operation1",
              observation1:
                manufacturingSteps.SwitchOn == "READY"
                  ? "Ready"
                  : manufacturingSteps.SwitchOn == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              observation2:
                manufacturingSteps.SwitchOn == "READY"
                  ? "Ready"
                  : manufacturingSteps.SwitchOn == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.one || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.one || username,
              date1: manufacturingStepsPerformedbydate.one,
              date2: manufacturingStepsVerifiedbydate.one || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId1,
              operationId: manufacturingID.manufacturingId1,
            },
            {
              operation: "Operation2",
              observation1:
                manufacturingSteps.BlowroomRawMaterial == "READY"
                  ? "Ready"
                  : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomRawMaterial == "READY"
                  ? "Ready"
                  : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                    ? "Not Ready"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.two || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.two || username,
              date1: manufacturingStepsPerformedbydate.two,
              date2: manufacturingStepsVerifiedbydate.two || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId2,
              operationId: manufacturingID.manufacturingId2,
            },
            {
              operation: "Operation3",
              observation1:
                manufacturingSteps.BlowroomWorkingArea == "WA1"
                  ? "WA1"
                  : manufacturingSteps.BlowroomWorkingArea == "WA2"
                    ? "WA2"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomWorkingArea == "WA1"
                  ? "WA1"
                  : manufacturingSteps.BlowroomWorkingArea == "WA2"
                    ? "WA2"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.three || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.three || username,
              date1: manufacturingStepsPerformedbydate.three,
              date2: manufacturingStepsVerifiedbydate.three || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId3,
              operationId: manufacturingID.manufacturingId3,
            },
            {
              operation: "Operation4",
              observation1:
                manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.four || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.four || username,
              date1: manufacturingStepsPerformedbydate.four,
              date2: manufacturingStepsVerifiedbydate.four || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId4,
              operationId: manufacturingID.manufacturingId4,
            },
            {
              operation: "Operation5",
              observation1:
                manufacturingSteps.BlowroomCardingProcess == "ON"
                  ? "On"
                  : manufacturingSteps.BlowroomCardingProcess == "OFF"
                    ? "Off"
                    : "NA",
              observation2:
                manufacturingSteps.BlowroomCardingProcess == "ON"
                  ? "On"
                  : manufacturingSteps.BlowroomCardingProcess == "OFF"
                    ? "Off"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.five || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.five || username,
              date1: manufacturingStepsPerformedbydate.five,
              date2: manufacturingStepsVerifiedbydate.five || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId5,
              operationId: manufacturingID.manufacturingId5,
            },
            {
              operation: "Operation6",
              observation1:
                manufacturingSteps.BleachingCakePressing == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingCakePressing == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.six || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.six || username,
              date1: manufacturingStepsPerformedbydate.six,
              date2: manufacturingStepsVerifiedbydate.six || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId6,
              operationId: manufacturingID.manufacturingId6,
            },
            {
              operation: "Operation7",
              observation1:
                manufacturingSteps.BleachingKier == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingKier == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.seven || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.seven || username,
              date1: manufacturingStepsPerformedbydate.seven,
              date2: manufacturingStepsVerifiedbydate.seven || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId7,
              operationId: manufacturingID.manufacturingId7,
            },
            {
              operation: "Operation8",
              observation1:
                manufacturingSteps.BleachingHydro == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingHydro == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.eight || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.eight || username,
              date1: manufacturingStepsPerformedbydate.eight,
              date2: manufacturingStepsVerifiedbydate.eight || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId8,
              operationId: manufacturingID.manufacturingId8,
            },
            {
              operation: "Operation9",
              observation1:
                manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingProcessCakeOpener ==
                    "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              observation2:
                manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                  ? "Completed"
                  : manufacturingSteps.BleachingProcessCakeOpener ==
                    "NOT COMPLETED"
                    ? "Not Completed"
                    : "NA",
              performBy:
                manufacturingStepsPerformedbysign.nine || usernameSupervisor,
              cleanedBy: manufacturingStepsVerifiedbysign.nine || username,
              date1: manufacturingStepsPerformedbydate.nine,
              date2: manufacturingStepsVerifiedbydate.nine || localDateValue,
              manufacturingId: manufacturingID.manufacturingStepsId9,
              operationId: manufacturingID.manufacturingId9,
            },
          ],
        };
        console.log("payloaf", payload);
        console.log("payloaf", payload_2);

        axios
          .post(
            `${API.prodUrl}/Precot/api/bleaching/summary/submitManufacturingSteps`,
            manufacturingNewSave ? payload : payload_2,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("Verification POST", res.data);
            // setListOfEnclosuresArray(res.data);
            messageApi.open({
              type: "success",
              content: "Manufactuuring Steps Submitted Successfully",
            });
            onChange("8", bmr);
          })
          .catch((err) => {
            console.log("Error", err);

          });
      }
    } else if (loggedInQa) {

      const payload = {
        stage: "Initial",
        operation: "Switch 'ON' all the machines & Sub machines",
        bmr_no: bmr,
        key: "VERIFICATION",
        manufacturingOperations: [
          {
            operation: "Operation1",
            observation1:
              manufacturingSteps.SwitchOn == "READY"
                ? "Ready"
                : manufacturingSteps.SwitchOn == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            observation2:
              manufacturingSteps.SwitchOn == "READY"
                ? "Ready"
                : manufacturingSteps.SwitchOn == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.one || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.one || username,
            date1: manufacturingStepsPerformedbydate.one,
            date2: manufacturingStepsVerifiedbydate.one || localDateValue,
          },
          {
            operation: "Operation2",
            observation1:
              manufacturingSteps.BlowroomRawMaterial == "READY"
                ? "Ready"
                : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomRawMaterial == "READY"
                ? "Ready"
                : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.two || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.two || username,
            date1: manufacturingStepsPerformedbydate.two,
            date2: manufacturingStepsVerifiedbydate.two || localDateValue,
          },
          {
            operation: "Operation3",
            observation1:
              manufacturingSteps.BlowroomWorkingArea == "WA1"
                ? "WA1"
                : manufacturingSteps.BlowroomWorkingArea == "WA2"
                  ? "WA2"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomWorkingArea == "WA1"
                ? "WA1"
                : manufacturingSteps.BlowroomWorkingArea == "WA2"
                  ? "WA2"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.three || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.three || username,
            date1: manufacturingStepsPerformedbydate.three,
            date2: manufacturingStepsVerifiedbydate.three || localDateValue,
          },
          {
            operation: "Operation4",
            observation1:
              manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.four || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.four || username,
            date1: manufacturingStepsPerformedbydate.four,
            date2: manufacturingStepsVerifiedbydate.four || localDateValue,
          },
          {
            operation: "Operation5",
            observation1:
              manufacturingSteps.BlowroomCardingProcess == "ON"
                ? "On"
                : manufacturingSteps.BlowroomCardingProcess == "OFF"
                  ? "Off"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomCardingProcess == "ON"
                ? "On"
                : manufacturingSteps.BlowroomCardingProcess == "OFF"
                  ? "Off"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.five || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.five || username,
            date1: manufacturingStepsPerformedbydate.five,
            date2: manufacturingStepsVerifiedbydate.five || localDateValue,
          },
          {
            operation: "Operation6",
            observation1:
              manufacturingSteps.BleachingCakePressing == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingCakePressing == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.six || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.six || username,
            date1: manufacturingStepsPerformedbydate.six,
            date2: manufacturingStepsVerifiedbydate.six || localDateValue,
          },
          {
            operation: "Operation7",
            observation1:
              manufacturingSteps.BleachingKier == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingKier == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.seven || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.seven || username,
            date1: manufacturingStepsPerformedbydate.seven,
            date2: manufacturingStepsVerifiedbydate.seven || localDateValue,
          },
          {
            operation: "Operation8",
            observation1:
              manufacturingSteps.BleachingHydro == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingHydro == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.eight || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.eight || username,
            date1: manufacturingStepsPerformedbydate.eight,
            date2: manufacturingStepsVerifiedbydate.eight || localDateValue,
          },
          {
            operation: "Operation9",
            observation1:
              manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingProcessCakeOpener ==
                  "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingProcessCakeOpener ==
                  "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.nine || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.nine || username,
            date1: manufacturingStepsPerformedbydate.nine,
            date2: manufacturingStepsVerifiedbydate.nine || localDateValue,
          },
        ],
      };

      const payload_2 = {
        stage: "Initial",
        operation: "Switch 'ON' all the machines & Sub machines",
        bmr_no: bmr,
        key: "VERIFICATION",
        manufacturingId: manufacturingID.masterID,
        manufacturingOperations: [
          {
            operation: "Operation1",
            observation1:
              manufacturingSteps.SwitchOn == "READY"
                ? "Ready"
                : manufacturingSteps.SwitchOn == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            observation2:
              manufacturingSteps.SwitchOn == "READY"
                ? "Ready"
                : manufacturingSteps.SwitchOn == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.one || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.one || username,
            date1: manufacturingStepsPerformedbydate.one,
            date2: manufacturingStepsVerifiedbydate.one || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId1,
            operationId: manufacturingID.manufacturingId1,
          },
          {
            operation: "Operation2",
            observation1:
              manufacturingSteps.BlowroomRawMaterial == "READY"
                ? "Ready"
                : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomRawMaterial == "READY"
                ? "Ready"
                : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                  ? "Not Ready"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.two || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.two || username,
            date1: manufacturingStepsPerformedbydate.two,
            date2: manufacturingStepsVerifiedbydate.two || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId2,
            operationId: manufacturingID.manufacturingId2,
          },
          {
            operation: "Operation3",
            observation1:
              manufacturingSteps.BlowroomWorkingArea == "WA1"
                ? "WA1"
                : manufacturingSteps.BlowroomWorkingArea == "WA2"
                  ? "WA2"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomWorkingArea == "WA1"
                ? "WA1"
                : manufacturingSteps.BlowroomWorkingArea == "WA2"
                  ? "WA2"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.three || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.three || username,
            date1: manufacturingStepsPerformedbydate.three,
            date2: manufacturingStepsVerifiedbydate.three || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId3,
            operationId: manufacturingID.manufacturingId3,
          },
          {
            operation: "Operation4",
            observation1:
              manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomReferMachine == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.four || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.four || username,
            date1: manufacturingStepsPerformedbydate.four,
            date2: manufacturingStepsVerifiedbydate.four || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId4,
            operationId: manufacturingID.manufacturingId4,
          },
          {
            operation: "Operation5",
            observation1:
              manufacturingSteps.BlowroomCardingProcess == "ON"
                ? "On"
                : manufacturingSteps.BlowroomCardingProcess == "OFF"
                  ? "Off"
                  : "NA",
            observation2:
              manufacturingSteps.BlowroomCardingProcess == "ON"
                ? "On"
                : manufacturingSteps.BlowroomCardingProcess == "OFF"
                  ? "Off"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.five || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.five || username,
            date1: manufacturingStepsPerformedbydate.five,
            date2: manufacturingStepsVerifiedbydate.five || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId5,
            operationId: manufacturingID.manufacturingId5,
          },
          {
            operation: "Operation6",
            observation1:
              manufacturingSteps.BleachingCakePressing == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingCakePressing == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.six || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.six || username,
            date1: manufacturingStepsPerformedbydate.six,
            date2: manufacturingStepsVerifiedbydate.six || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId6,
            operationId: manufacturingID.manufacturingId6,
          },
          {
            operation: "Operation7",
            observation1:
              manufacturingSteps.BleachingKier == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingKier == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.seven || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.seven || username,
            date1: manufacturingStepsPerformedbydate.seven,
            date2: manufacturingStepsVerifiedbydate.seven || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId7,
            operationId: manufacturingID.manufacturingId7,
          },
          {
            operation: "Operation8",
            observation1:
              manufacturingSteps.BleachingHydro == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingHydro == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.eight || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.eight || username,
            date1: manufacturingStepsPerformedbydate.eight,
            date2: manufacturingStepsVerifiedbydate.eight || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId8,
            operationId: manufacturingID.manufacturingId8,
          },
          {
            operation: "Operation9",
            observation1:
              manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingProcessCakeOpener ==
                  "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            observation2:
              manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
                ? "Completed"
                : manufacturingSteps.BleachingProcessCakeOpener ==
                  "NOT COMPLETED"
                  ? "Not Completed"
                  : "NA",
            performBy:
              manufacturingStepsPerformedbysign.nine || usernameSupervisor,
            cleanedBy: manufacturingStepsVerifiedbysign.nine || username,
            date1: manufacturingStepsPerformedbydate.nine,
            date2: manufacturingStepsVerifiedbydate.nine || localDateValue,
            manufacturingId: manufacturingID.manufacturingStepsId9,
            operationId: manufacturingID.manufacturingId9,
          },
        ],
      };
      console.log("payloaf", payload);
      console.log("payloaf", payload_2);
      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/submitManufacturingSteps`,
          manufacturingNewSave ? payload : payload_2,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Verification POST", res.data);

          messageApi.open({
            type: "success",
            content: "Manufactuuring Steps Submitted Successfully",
          });
          onChange("8", bmr);
        })
        .catch((err) => {
          console.log("Error", err);

        });
      console.log("Manufacturing Steps", manufacturingSteps);

    }
  };



  const SaveManufacturingSteps = () => {
    const payload = {
      stage: "Initial",
      operation: "Switch 'ON' all the machines & Sub machines",
      bmr_no: bmr,
      key: "VERIFICATION",
      manufacturingId: manufacturingID.masterID,
      manufacturingOperations: [
        {
          operation: "Operation1",
          observation1:
            manufacturingSteps.SwitchOn == "READY"
              ? "Ready"
              : manufacturingSteps.SwitchOn == "NOT READY"
                ? "Not Ready"
                : "NA",
          observation2:
            manufacturingSteps.SwitchOn == "READY"
              ? "Ready"
              : manufacturingSteps.SwitchOn == "NOT READY"
                ? "Not Ready"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.one || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.one || username,
          date1: manufacturingStepsPerformedbydate.one,
          date2: manufacturingStepsVerifiedbydate.one || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId1,
          operationId: manufacturingID.manufacturingId1,
        },
        {
          operation: "Operation2",
          observation1:
            manufacturingSteps.BlowroomRawMaterial == "READY"
              ? "Ready"
              : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                ? "Not Ready"
                : "NA",
          observation2:
            manufacturingSteps.BlowroomRawMaterial == "READY"
              ? "Ready"
              : manufacturingSteps.BlowroomRawMaterial == "NOT READY"
                ? "Not Ready"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.two || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.two || username,
          date1: manufacturingStepsPerformedbydate.two,
          date2: manufacturingStepsVerifiedbydate.two || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId2,
          operationId: manufacturingID.manufacturingId2,
        },
        {
          operation: "Operation3",
          observation1:
            manufacturingSteps.BlowroomWorkingArea == "WA1"
              ? "WA1"
              : manufacturingSteps.BlowroomWorkingArea == "WA2"
                ? "WA2"
                : "NA",
          observation2:
            manufacturingSteps.BlowroomWorkingArea == "WA1"
              ? "WA1"
              : manufacturingSteps.BlowroomWorkingArea == "WA2"
                ? "WA2"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.three || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.three || username,
          date1: manufacturingStepsPerformedbydate.three,
          date2: manufacturingStepsVerifiedbydate.three || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId3,
          operationId: manufacturingID.manufacturingId3,
        },
        {
          operation: "Operation4",
          observation1:
            manufacturingSteps.BlowroomReferMachine == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          observation2:
            manufacturingSteps.BlowroomReferMachine == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BlowroomReferMachine == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.four || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.four || username,
          date1: manufacturingStepsPerformedbydate.four,
          date2: manufacturingStepsVerifiedbydate.four || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId4,
          operationId: manufacturingID.manufacturingId4,
        },
        {
          operation: "Operation5",
          observation1:
            manufacturingSteps.BlowroomCardingProcess == "ON"
              ? "On"
              : manufacturingSteps.BlowroomCardingProcess == "OFF"
                ? "Off"
                : "NA",
          observation2:
            manufacturingSteps.BlowroomCardingProcess == "ON"
              ? "On"
              : manufacturingSteps.BlowroomCardingProcess == "OFF"
                ? "Off"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.five || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.five || username,
          date1: manufacturingStepsPerformedbydate.five,
          date2: manufacturingStepsVerifiedbydate.five || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId5,
          operationId: manufacturingID.manufacturingId5,
        },
        {
          operation: "Operation6",
          observation1:
            manufacturingSteps.BleachingCakePressing == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          observation2:
            manufacturingSteps.BleachingCakePressing == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingCakePressing == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.six || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.six || username,
          date1: manufacturingStepsPerformedbydate.six,
          date2: manufacturingStepsVerifiedbydate.six || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId6,
          operationId: manufacturingID.manufacturingId6,
        },
        {
          operation: "Operation7",
          observation1:
            manufacturingSteps.BleachingKier == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          observation2:
            manufacturingSteps.BleachingKier == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingKier == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.seven || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.seven || username,
          date1: manufacturingStepsPerformedbydate.seven,
          date2: manufacturingStepsVerifiedbydate.seven || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId7,
          operationId: manufacturingID.manufacturingId7,
        },
        {
          operation: "Operation8",
          observation1:
            manufacturingSteps.BleachingHydro == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          observation2:
            manufacturingSteps.BleachingHydro == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingHydro == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.eight || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.eight || username,
          date1: manufacturingStepsPerformedbydate.eight,
          date2: manufacturingStepsVerifiedbydate.eight || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId8,
          operationId: manufacturingID.manufacturingId8,
        },
        {
          operation: "Operation9",
          observation1:
            manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingProcessCakeOpener == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          observation2:
            manufacturingSteps.BleachingProcessCakeOpener == "COMPLETED"
              ? "Completed"
              : manufacturingSteps.BleachingProcessCakeOpener == "NOT COMPLETED"
                ? "Not Completed"
                : "NA",
          performBy:
            manufacturingStepsPerformedbysign.nine || usernameSupervisor,
          cleanedBy: manufacturingStepsVerifiedbysign.nine || username,
          date1: manufacturingStepsPerformedbydate.nine,
          date2: manufacturingStepsVerifiedbydate.nine || localDateValue,
          manufacturingId: manufacturingID.manufacturingStepsId9,
          operationId: manufacturingID.manufacturingId9,
        },
      ],
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/saveManufacturingSteps`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Verification POST", res.data);

        messageApi.open({
          type: "success",
          content: "Manufactuuring Steps Saved Successfully",
        });
        onChange("8", bmr);
      })
      .catch((err) => {
        console.log("Error", err);

      });
    console.log("Manufacturing Steps", manufacturingSteps);
  };

  const submitMachineOpsParams = () => {
    if (loggedInSupervisor) {
      const requiredObservations = [
        MOP_ASB_Observation,
        MOP_FDS_Observation,
        MOP_MDS_Observation,
        MOP_GLP_Line1_Observation,
        MOP_GLP_Line2_Observation,
        MOP_ERM_Line1_Observation,
        MOP_ERM_Line2_Observation,
        MOP_CPHP_Observation,
        MOP_CPSWT_Observation,
        MOP_HET_Line1_Observation,
        MOP_HET_Line2_Observation,
        MOP_COS_SLS_Observation,
        MOP_COS_Stripper_Observation,
        MOP_COS_FRS_Observation,
        MOP_COS_OCS_Observation,
        MOP_DS_IMSP_Observation,
        MOP_DS_CS_Observation,
        MOP_DS_SMV_Observation,
        MOP_FOS_FRS_Line1_Observation,
        MOP_FOS_FRS_Line2_Observation,
        MOP_FOS_BRS_Line1_Observation,
        MOP_FOS_BRS_Line2_Observation,
        MOP_AS_ReferSOP_Line1_Observation,
        MOP_AS_ReferSOP_Line2_Observation,
      ];


      const emptyFields = requiredObservations.some(
        (field) => field === "" || field === undefined || field === null
      );

      if (emptyFields) {
        message.error(
          "Please fill in all required observations before submitting."
        );
        return;
      }

      const payload = {
        bmrNo: bmr,
        stage: "Machine Operations",
        key: "VERIFICATION",
        verifiedBy: machineOpsPerformedBy || usernameSupervisor,
        reviewedBy: machineOpsCheckedBy || username,
        verfiedDate: machineOpsPerformedByDate,
        reviewedDate: machineOpsCheckedByDate || localDateValue,
        qualityRelease: [],
        operations: [
          {
            description: "Desc1",
            stdRange: "3.0 - 9.0",
            observation1: MOP_ASB_Observation,
            observation2: MOP_ASB_Observation,
          },
          {
            description: "Desc2",
            stdRange: "ON",
            observation1: MOP_FDS_Observation,
            observation2: MOP_FDS_Observation,
          },
          {
            description: "Desc3",
            stdRange: "ON",
            observation1: MOP_MDS_Observation,
            observation2: MOP_MDS_Observation,
          },
          {
            description: "Desc4",
            stdRange: "0.0 - 2.0",
            observation1: MOP_GLP_Line1_Observation,
            observation2: MOP_GLP_Line2_Observation,
          },
          {
            description: "Desc5",
            stdRange: "2.0 - 4.0",
            observation1: MOP_ERM_Line1_Observation,
            observation2: MOP_ERM_Line2_Observation,
          },
          {
            description: "Desc6",
            stdRange: "100 - 112",
            observation1: MOP_CPHP_Observation,
            observation2: MOP_CPHP_Observation,
          },
          {
            description: "Desc7",
            stdRange: "40 - 60",
            observation1: MOP_CPSWT_Observation,
            observation2: MOP_CPSWT_Observation,
          },
          {
            description: "Desc8",
            stdRange: "0.3  - 0.7",
            observation1: MOP_HET_Line1_Observation,
            observation2: MOP_HET_Line2_Observation,
          },
          {
            description: "Desc9",
            stdRange: "75 - 100",
            observation1: MOP_COS_SLS_Observation,
            observation2: MOP_COS_SLS_Observation,
          },
          {
            description: "Desc10",
            stdRange: "75 - 100",
            observation1: MOP_COS_Stripper_Observation,
            observation2: MOP_COS_Stripper_Observation,
          },
          {
            description: "Desc11",
            stdRange: "75 - 100",
            observation1: MOP_COS_FRS_Observation,
            observation2: MOP_COS_FRS_Observation,
          },
          {
            description: "Desc12",
            stdRange: "50 - 65",
            observation1: MOP_COS_OCS_Observation,
            observation2: MOP_COS_OCS_Observation,
          },
          {
            description: "Desc13",
            stdRange: "3.0 - 4.0",
            observation1: MOP_DS_IMSP_Observation,
            observation2: MOP_DS_IMSP_Observation,
          },
          {
            description: "Desc14",
            stdRange: "11.0 - 12.0",
            observation1: MOP_DS_CS_Observation,
            observation2: MOP_DS_CS_Observation,
          },
          {
            description: "Desc15",
            stdRange: "5.5 - 7.5",
            observation1: MOP_DS_SMV_Observation,
            observation2: MOP_DS_SMV_Observation,
          },
          {
            machineOperationId: "",
            description: "Desc16",
            stdRange: "3.5 - 5.5",
            observation1: MOP_FOS_FRS_Line1_Observation,
            observation2: MOP_FOS_FRS_Line2_Observation,
          },
          {
            machineOperationId: "",
            description: "Desc17",
            stdRange: "500 - 800",
            observation1: MOP_FOS_BRS_Line1_Observation,
            observation2: MOP_FOS_BRS_Line2_Observation,
          },
          {
            machineOperationId: "",
            description: "Desc18",
            stdRange: "VSTRICT",
            observation1: MOP_AS_ReferSOP_Line1_Observation,
            observation2: MOP_AS_ReferSOP_Line2_Observation,
          },
        ],
      };

      const payload_2 = {
        bmrNo: bmr,
        stage: "Machine Operations",
        key: "VERIFICATION",
        verifiedBy: machineOpsPerformedBy || usernameSupervisor,
        reviewedBy: machineOpsCheckedBy || username,
        verfiedDate: machineOpsPerformedByDate,
        reviewedDate: machineOpsCheckedByDate || localDateValue,
        summaryId: machineOpsID.masterID,
        qualityRelease: [],
        operations: [
          {
            description: "Desc1",
            stdRange: "3.0 - 9.0",
            observation1: MOP_ASB_Observation,
            observation2: MOP_ASB_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId1,
            summaryId: machineOpsID.machineOpsSummaryId1,
          },
          {
            description: "Desc2",
            stdRange: "ON",
            observation1: MOP_FDS_Observation,
            observation2: MOP_FDS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId2,
            summaryId: machineOpsID.machineOpsSummaryId2,
          },
          {
            description: "Desc3",
            stdRange: "ON",
            observation1: MOP_MDS_Observation,
            observation2: MOP_MDS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId3,
            summaryId: machineOpsID.machineOpsSummaryId3,
          },
          {
            description: "Desc4",
            stdRange: "0.0 - 2.0",
            observation1: MOP_GLP_Line1_Observation,
            observation2: MOP_GLP_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId4,
            summaryId: machineOpsID.machineOpsSummaryId4,
          },
          {
            description: "Desc5",
            stdRange: "2.0 - 4.0",
            observation1: MOP_ERM_Line1_Observation,
            observation2: MOP_ERM_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId5,
            summaryId: machineOpsID.machineOpsSummaryId5,
          },
          {
            description: "Desc6",
            stdRange: "100 - 112",
            observation1: MOP_CPHP_Observation,
            observation2: MOP_CPHP_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId6,
            summaryId: machineOpsID.machineOpsSummaryId6,
          },
          {
            description: "Desc7",
            stdRange: "40 - 60",
            observation1: MOP_CPSWT_Observation,
            observation2: MOP_CPSWT_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId7,
            summaryId: machineOpsID.machineOpsSummaryId7,
          },
          {
            description: "Desc8",
            stdRange: "0.3  - 0.7",
            observation1: MOP_HET_Line1_Observation,
            observation2: MOP_HET_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId8,
            summaryId: machineOpsID.machineOpsSummaryId8,
          },
          {
            description: "Desc9",
            stdRange: "75 - 100",
            observation1: MOP_COS_SLS_Observation,
            observation2: MOP_COS_SLS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId9,
            summaryId: machineOpsID.machineOpsSummaryId9,
          },
          {
            description: "Desc10",
            stdRange: "75 - 100",
            observation1: MOP_COS_Stripper_Observation,
            observation2: MOP_COS_Stripper_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId10,
            summaryId: machineOpsID.machineOpsSummaryId10,
          },
          {
            description: "Desc11",
            stdRange: "75 - 100",
            observation1: MOP_COS_FRS_Observation,
            observation2: MOP_COS_FRS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId11,
            summaryId: machineOpsID.machineOpsSummaryId11,
          },
          {
            description: "Desc12",
            stdRange: "50 - 65",
            observation1: MOP_COS_OCS_Observation,
            observation2: MOP_COS_OCS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId12,
            summaryId: machineOpsID.machineOpsSummaryId12,
          },
          {
            description: "Desc13",
            stdRange: "3.0 - 4.0",
            observation1: MOP_DS_IMSP_Observation,
            observation2: MOP_DS_IMSP_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId13,
            summaryId: machineOpsID.machineOpsSummaryId13,
          },
          {
            description: "Desc14",
            stdRange: "11.0 - 12.0",
            observation1: MOP_DS_CS_Observation,
            observation2: MOP_DS_CS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId14,
            summaryId: machineOpsID.machineOpsSummaryId14,
          },
          {
            description: "Desc15",
            stdRange: "5.5 - 7.5",
            observation1: MOP_DS_SMV_Observation,
            observation2: MOP_DS_SMV_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId15,
            summaryId: machineOpsID.machineOpsSummaryId15,
          },
          {
            description: "Desc16",
            stdRange: "3.5 - 5.5",
            observation1: MOP_FOS_FRS_Line1_Observation,
            observation2: MOP_FOS_FRS_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId16,
            summaryId: machineOpsID.machineOpsSummaryId16,
          },
          {
            description: "Desc17",
            stdRange: "500 - 800",
            observation1: MOP_FOS_BRS_Line1_Observation,
            observation2: MOP_FOS_BRS_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId17,
            summaryId: machineOpsID.machineOpsSummaryId17,
          },
          {
            description: "Desc18",
            stdRange: "VSTRICT",
            observation1: MOP_AS_ReferSOP_Line1_Observation,
            observation2: MOP_AS_ReferSOP_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId18,
            summaryId: machineOpsID.machineOpsSummaryId18,
          },
        ],
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/submitMachineOperations`,
          mahcineOpsNewSave ? payload : payload_2,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Verification POST", res.data);

          messageApi.open({
            type: "success",
            content:
              "Manufactuuring Operations Parameter Submitted Successfully",
          });
          onChange("9", bmr);
        })
        .catch((err) => {
          console.log("Error", err);

        });
    } else if (loggedInQa) {

      const payload = {
        bmrNo: bmr,
        stage: "Machine Operations",
        key: "VERIFICATION",
        verifiedBy: machineOpsPerformedBy || usernameSupervisor,
        reviewedBy: machineOpsCheckedBy || username,
        verfiedDate: machineOpsPerformedByDate,
        reviewedDate: machineOpsCheckedByDate || localDateValue,
        qualityRelease: [],
        operations: [
          {
            description: "Desc1",
            stdRange: "3.0 - 9.0",
            observation1: MOP_ASB_Observation,
            observation2: MOP_ASB_Observation,
          },
          {
            description: "Desc2",
            stdRange: "ON",
            observation1: MOP_FDS_Observation,
            observation2: MOP_FDS_Observation,
          },
          {
            description: "Desc3",
            stdRange: "ON",
            observation1: MOP_MDS_Observation,
            observation2: MOP_MDS_Observation,
          },
          {
            description: "Desc4",
            stdRange: "0.0 - 2.0",
            observation1: MOP_GLP_Line1_Observation,
            observation2: MOP_GLP_Line2_Observation,
          },
          {
            description: "Desc5",
            stdRange: "2.0 - 4.0",
            observation1: MOP_ERM_Line1_Observation,
            observation2: MOP_ERM_Line2_Observation,
          },
          {
            description: "Desc6",
            stdRange: "100 - 112",
            observation1: MOP_CPHP_Observation,
            observation2: MOP_CPHP_Observation,
          },
          {
            description: "Desc7",
            stdRange: "40 - 60",
            observation1: MOP_CPSWT_Observation,
            observation2: MOP_CPSWT_Observation,
          },
          {
            description: "Desc8",
            stdRange: "0.3  - 0.7",
            observation1: MOP_HET_Line1_Observation,
            observation2: MOP_HET_Line2_Observation,
          },
          {
            description: "Desc9",
            stdRange: "75 - 100",
            observation1: MOP_COS_SLS_Observation,
            observation2: MOP_COS_SLS_Observation,
          },
          {
            description: "Desc10",
            stdRange: "75 - 100",
            observation1: MOP_COS_Stripper_Observation,
            observation2: MOP_COS_Stripper_Observation,
          },
          {
            description: "Desc11",
            stdRange: "75 - 100",
            observation1: MOP_COS_FRS_Observation,
            observation2: MOP_COS_FRS_Observation,
          },
          {
            description: "Desc12",
            stdRange: "50 - 65",
            observation1: MOP_COS_OCS_Observation,
            observation2: MOP_COS_OCS_Observation,
          },
          {
            description: "Desc13",
            stdRange: "3.0 - 4.0",
            observation1: MOP_DS_IMSP_Observation,
            observation2: MOP_DS_IMSP_Observation,
          },
          {
            description: "Desc14",
            stdRange: "11.0 - 12.0",
            observation1: MOP_DS_CS_Observation,
            observation2: MOP_DS_CS_Observation,
          },
          {
            description: "Desc15",
            stdRange: "5.5 - 7.5",
            observation1: MOP_DS_SMV_Observation,
            observation2: MOP_DS_SMV_Observation,
          },
          {
            machineOperationId: "",
            description: "Desc16",
            stdRange: "3.5 - 5.5",
            observation1: MOP_FOS_FRS_Line1_Observation,
            observation2: MOP_FOS_FRS_Line2_Observation,
          },
          {
            machineOperationId: "",
            description: "Desc17",
            stdRange: "500 - 800",
            observation1: MOP_FOS_BRS_Line1_Observation,
            observation2: MOP_FOS_BRS_Line2_Observation,
          },
          {
            machineOperationId: "",
            description: "Desc18",
            stdRange: "VSTRICT",
            observation1: MOP_AS_ReferSOP_Line1_Observation,
            observation2: MOP_AS_ReferSOP_Line2_Observation,
          },
        ],
      };

      const payload_2 = {
        bmrNo: bmr,
        stage: "Machine Operations",
        key: "VERIFICATION",
        verifiedBy: machineOpsPerformedBy || usernameSupervisor,
        reviewedBy: machineOpsCheckedBy || username,
        verfiedDate: machineOpsPerformedByDate,
        reviewedDate: machineOpsCheckedByDate || localDateValue,
        summaryId: machineOpsID.masterID,
        qualityRelease: [],
        operations: [
          {
            description: "Desc1",
            stdRange: "3.0 - 9.0",
            observation1: MOP_ASB_Observation,
            observation2: MOP_ASB_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId1,
            summaryId: machineOpsID.machineOpsSummaryId1,
          },
          {
            description: "Desc2",
            stdRange: "ON",
            observation1: MOP_FDS_Observation,
            observation2: MOP_FDS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId2,
            summaryId: machineOpsID.machineOpsSummaryId2,
          },
          {
            description: "Desc3",
            stdRange: "ON",
            observation1: MOP_MDS_Observation,
            observation2: MOP_MDS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId3,
            summaryId: machineOpsID.machineOpsSummaryId3,
          },
          {
            description: "Desc4",
            stdRange: "0.0 - 2.0",
            observation1: MOP_GLP_Line1_Observation,
            observation2: MOP_GLP_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId4,
            summaryId: machineOpsID.machineOpsSummaryId4,
          },
          {
            description: "Desc5",
            stdRange: "2.0 - 4.0",
            observation1: MOP_ERM_Line1_Observation,
            observation2: MOP_ERM_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId5,
            summaryId: machineOpsID.machineOpsSummaryId5,
          },
          {
            description: "Desc6",
            stdRange: "100 - 112",
            observation1: MOP_CPHP_Observation,
            observation2: MOP_CPHP_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId6,
            summaryId: machineOpsID.machineOpsSummaryId6,
          },
          {
            description: "Desc7",
            stdRange: "40 - 60",
            observation1: MOP_CPSWT_Observation,
            observation2: MOP_CPSWT_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId7,
            summaryId: machineOpsID.machineOpsSummaryId7,
          },
          {
            description: "Desc8",
            stdRange: "0.3  - 0.7",
            observation1: MOP_HET_Line1_Observation,
            observation2: MOP_HET_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId8,
            summaryId: machineOpsID.machineOpsSummaryId8,
          },
          {
            description: "Desc9",
            stdRange: "75 - 100",
            observation1: MOP_COS_SLS_Observation,
            observation2: MOP_COS_SLS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId9,
            summaryId: machineOpsID.machineOpsSummaryId9,
          },
          {
            description: "Desc10",
            stdRange: "75 - 100",
            observation1: MOP_COS_Stripper_Observation,
            observation2: MOP_COS_Stripper_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId10,
            summaryId: machineOpsID.machineOpsSummaryId10,
          },
          {
            description: "Desc11",
            stdRange: "75 - 100",
            observation1: MOP_COS_FRS_Observation,
            observation2: MOP_COS_FRS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId11,
            summaryId: machineOpsID.machineOpsSummaryId11,
          },
          {
            description: "Desc12",
            stdRange: "50 - 65",
            observation1: MOP_COS_OCS_Observation,
            observation2: MOP_COS_OCS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId12,
            summaryId: machineOpsID.machineOpsSummaryId12,
          },
          {
            description: "Desc13",
            stdRange: "3.0 - 4.0",
            observation1: MOP_DS_IMSP_Observation,
            observation2: MOP_DS_IMSP_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId13,
            summaryId: machineOpsID.machineOpsSummaryId13,
          },
          {
            description: "Desc14",
            stdRange: "11.0 - 12.0",
            observation1: MOP_DS_CS_Observation,
            observation2: MOP_DS_CS_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId14,
            summaryId: machineOpsID.machineOpsSummaryId14,
          },
          {
            description: "Desc15",
            stdRange: "5.5 - 7.5",
            observation1: MOP_DS_SMV_Observation,
            observation2: MOP_DS_SMV_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId15,
            summaryId: machineOpsID.machineOpsSummaryId15,
          },
          {
            description: "Desc16",
            stdRange: "3.5 - 5.5",
            observation1: MOP_FOS_FRS_Line1_Observation,
            observation2: MOP_FOS_FRS_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId16,
            summaryId: machineOpsID.machineOpsSummaryId16,
          },
          {
            description: "Desc17",
            stdRange: "500 - 800",
            observation1: MOP_FOS_BRS_Line1_Observation,
            observation2: MOP_FOS_BRS_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId17,
            summaryId: machineOpsID.machineOpsSummaryId17,
          },
          {
            description: "Desc18",
            stdRange: "VSTRICT",
            observation1: MOP_AS_ReferSOP_Line1_Observation,
            observation2: MOP_AS_ReferSOP_Line2_Observation,
            machineOperationId: machineOpsID.machineOpsQualityId18,
            summaryId: machineOpsID.machineOpsSummaryId18,
          },
        ],
      };
      console.log("Payload Submit", payload_2);
      //submitMachineOperations
      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/submitMachineOperations`,
          mahcineOpsNewSave ? payload : payload_2,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Verification POST", res.data);

          messageApi.open({
            type: "success",
            content:
              "Manufactuuring Operations Parameter Submitted Successfully",
          });
          onChange("9", bmr);
        })
        .catch((err) => {
          console.log("Error", err);

        });

    }
  };

  //Save Machine Ops

  const saveMachineOpsParams = () => {
    const payload = {
      bmrNo: bmr,
      stage: "Machine Operations",
      key: "VERIFICATION",
      verifiedBy: machineOpsPerformedBy || usernameSupervisor,
      reviewedBy: machineOpsCheckedBy || username,
      verfiedDate: machineOpsPerformedByDate,
      reviewedDate: machineOpsCheckedByDate || localDateValue,
      summaryId: machineOpsID.masterID,
      qualityRelease: [],
      operations: [
        {
          description: "Desc1",
          stdRange: "3.0 - 9.0",
          observation1: MOP_ASB_Observation,
          observation2: MOP_ASB_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId1,
          summaryId: machineOpsID.machineOpsSummaryId1,
        },
        {
          description: "Desc2",
          stdRange: "ON",
          observation1: MOP_FDS_Observation,
          observation2: MOP_FDS_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId2,
          summaryId: machineOpsID.machineOpsSummaryId2,
        },
        {
          description: "Desc3",
          stdRange: "ON",
          observation1: MOP_MDS_Observation,
          observation2: MOP_MDS_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId3,
          summaryId: machineOpsID.machineOpsSummaryId3,
        },
        {
          description: "Desc4",
          stdRange: "0.0 - 2.0",
          observation1: MOP_GLP_Line1_Observation,
          observation2: MOP_GLP_Line2_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId4,
          summaryId: machineOpsID.machineOpsSummaryId4,
        },
        {
          description: "Desc5",
          stdRange: "2.0 - 4.0",
          observation1: MOP_ERM_Line1_Observation,
          observation2: MOP_ERM_Line2_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId5,
          summaryId: machineOpsID.machineOpsSummaryId5,
        },
        {
          description: "Desc6",
          stdRange: "100 - 112",
          observation1: MOP_CPHP_Observation,
          observation2: MOP_CPHP_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId6,
          summaryId: machineOpsID.machineOpsSummaryId6,
        },
        {
          description: "Desc7",
          stdRange: "40 - 60",
          observation1: MOP_CPSWT_Observation,
          observation2: MOP_CPSWT_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId7,
          summaryId: machineOpsID.machineOpsSummaryId7,
        },
        {
          description: "Desc8",
          stdRange: "0.3  - 0.7",
          observation1: MOP_HET_Line1_Observation,
          observation2: MOP_HET_Line2_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId8,
          summaryId: machineOpsID.machineOpsSummaryId8,
        },
        {
          description: "Desc9",
          stdRange: "75 - 100",
          observation1: MOP_COS_SLS_Observation,
          observation2: MOP_COS_SLS_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId9,
          summaryId: machineOpsID.machineOpsSummaryId9,
        },
        {
          description: "Desc10",
          stdRange: "75 - 100",
          observation1: MOP_COS_Stripper_Observation,
          observation2: MOP_COS_Stripper_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId10,
          summaryId: machineOpsID.machineOpsSummaryId10,
        },
        {
          description: "Desc11",
          stdRange: "75 - 100",
          observation1: MOP_COS_FRS_Observation,
          observation2: MOP_COS_FRS_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId11,
          summaryId: machineOpsID.machineOpsSummaryId11,
        },
        {
          description: "Desc12",
          stdRange: "50 - 65",
          observation1: MOP_COS_OCS_Observation,
          observation2: MOP_COS_OCS_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId12,
          summaryId: machineOpsID.machineOpsSummaryId12,
        },
        {
          description: "Desc13",
          stdRange: "3.0 - 4.0",
          observation1: MOP_DS_IMSP_Observation,
          observation2: MOP_DS_IMSP_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId13,
          summaryId: machineOpsID.machineOpsSummaryId13,
        },
        {
          description: "Desc14",
          stdRange: "11.0 - 12.0",
          observation1: MOP_DS_CS_Observation,
          observation2: MOP_DS_CS_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId14,
          summaryId: machineOpsID.machineOpsSummaryId14,
        },
        {
          description: "Desc15",
          stdRange: "5.5 - 7.5",
          observation1: MOP_DS_SMV_Observation,
          observation2: MOP_DS_SMV_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId15,
          summaryId: machineOpsID.machineOpsSummaryId15,
        },
        {
          description: "Desc16",
          stdRange: "3.5 - 5.5",
          observation1: MOP_FOS_FRS_Line1_Observation,
          observation2: MOP_FOS_FRS_Line2_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId16,
          summaryId: machineOpsID.machineOpsSummaryId16,
        },
        {
          description: "Desc17",
          stdRange: "500 - 800",
          observation1: MOP_FOS_BRS_Line1_Observation,
          observation2: MOP_FOS_BRS_Line2_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId17,
          summaryId: machineOpsID.machineOpsSummaryId17,
        },
        {
          description: "Desc18",
          stdRange: "VSTRICT",
          observation1: MOP_AS_ReferSOP_Line1_Observation,
          observation2: MOP_AS_ReferSOP_Line2_Observation,
          machineOperationId: machineOpsID.machineOpsQualityId18,
          summaryId: machineOpsID.machineOpsSummaryId18,
        },
      ],
    };
    //submitMachineOperations
    console.log("New Machine Ops Payload", payload);
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/saveMachineOperations`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Verification POST", res.data);
        messageApi.open({
          type: "success",
          content: "Manufacturing Operations Parameter Saved Successfully",
        });
        onChange("9", bmr);
      })
      .catch((err) => {
        console.log("Error", err);

      });
  };


  const listofEnclosures = () => {
    console.log("!listofEnclosuresArray || !listofEnclosuresArray.enclosureList start")

    if (
      listofEnclosuresNewArray.bleaching_job_card == "" ||
      (listofEnclosuresNewArray.freetext_new == "" && loggedInQa) ||
      listofEnclosuresNewArray.process_equipment_calibration == ""
    ) {
      messageApi.open({
        type: "error",
        content: "Please Select the Values",
      });
    } else {
      if (listofEnclosuresArray.enclosureList.length > 0) {

        if (listofEnclosuresArray.enclosureList[2].status == "QA_APPROVED") {
          setFreezeEnclosureQa(true);
        } else {
          const e = listofEnclosuresArray;
          const c = e.enclosureList;
          c[0] = {
            createdAt: e.enclosureList[0].createdAt,
            createdBy: e.enclosureList[0].createdBy,
            enclosureId: e.enclosureList[0].enclosureId,
            remark1: listofEnclosuresNewArray.bleaching_job_card,
            remark2: listofEnclosuresNewArray.bleaching_job_card,
            status: e.enclosureList[0].status,
            summary_record_id: e.enclosureList[0].summary_record_id,
            title: e.enclosureList[0].title,
            updatedAt: e.enclosureList[0].updatedAt,
            updatedBy: e.enclosureList[0].updatedBy,
          };
          c[1] = {
            createdAt: e.enclosureList[1].createdAt,
            createdBy: e.enclosureList[1].createdBy,
            enclosureId: e.enclosureList[1].enclosureId,
            remark1: listofEnclosuresNewArray.process_equipment_calibration,
            remark2: listofEnclosuresNewArray.process_equipment_calibration,
            status: e.enclosureList[1].status,
            summary_record_id: e.enclosureList[1].summary_record_id,
            title: e.enclosureList[1].title,
            updatedAt: e.enclosureList[1].updatedAt,
            updatedBy: e.enclosureList[1].updatedBy,
          };
          c[2] = {
            createdAt: e.enclosureList[2].createdAt,
            createdBy: e.enclosureList[2].createdBy,
            enclosureId: e.enclosureList[2].enclosureId,
            remark1: listofEnclosuresNewArray.freetext_new,
            remark2: listofEnclosuresNewArray.freetext_new,
            status: e.enclosureList[2].status,
            summary_record_id: e.enclosureList[2].summary_record_id,
            title: freeText,
            updatedAt: e.enclosureList[2].updatedAt,
            updatedBy: e.enclosureList[2].updatedBy,
          };

          axios
            .post(
              `${API.prodUrl}/Precot/api/bleaching/summary/SubmitRecordVerification`,
              e,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              console.log("List Of Enclosures", res.data);
              message.success("List Of Enclosures Submitted Successfully");
              onChange("13", bmr);
            })
            .catch((err) => {
              console.log("Error", err);
            });
        }
      } else {
        listofEnclosuresArray.enclosureList.push({
          title: "Bleaching Job Card",
          remark1:
            listofEnclosuresNewArray.bleaching_job_card == "ATTACHED"
              ? "ATTACHED"
              : listofEnclosuresNewArray.bleaching_job_card == "NOT ATTACHED"
                ? "NOT ATTACHED"
                : "NA",
          remark2:
            listofEnclosuresNewArray.bleaching_job_card == "ATTACHED"
              ? "ATTACHED"
              : listofEnclosuresNewArray.bleaching_job_card == "NOT ATTACHED"
                ? "NOT ATTACHED"
                : "NA",
          enclosureId: listOf.enclosureId1,
          summary_record_id: listOf.summary_record_id1,
        });

        listofEnclosuresArray.enclosureList.push({
          title: "Processing Equipment",
          remark1:
            listofEnclosuresNewArray.process_equipment_calibration == "ATTACHED"
              ? "ATTACHED"
              : listofEnclosuresNewArray.process_equipment_calibration ==
                "NOT ATTACHED"
                ? "NOT ATTACHED"
                : "NA",
          remark2:
            listofEnclosuresNewArray.process_equipment_calibration == "ATTACHED"
              ? "ATTACHED"
              : listofEnclosuresNewArray.process_equipment_calibration ==
                "NOT ATTACHED"
                ? "NOT ATTACHED"
                : "NA",
          enclosureId: listOf.enclosureId2,
          summary_record_id: listOf.summary_record_id2,
        });

        listofEnclosuresArray.enclosureList.push({
          title: freeText,
          remark1:
            listofEnclosuresNewArray.freetext_new == "ATTACHED"
              ? "ATTACHED"
              : listofEnclosuresNewArray.freetext_new == "NOT ATTACHED"
                ? "NOT ATTACHED"
                : "NA",
          remark2:
            listofEnclosuresNewArray.freetext_new == "ATTACHED"
              ? "ATTACHED"
              : listofEnclosuresNewArray.freetext_new == "NOT ATTACHED"
                ? "NOT ATTACHED"
                : "NA",
          enclosureId: listOf.enclosureId3,
          summary_record_id: listOf.summary_record_id3,
        });
        const a = listofEnclosuresArray;
        a.key = "ENCLOSURE";
        console.log("payloaddd", a);
        axios
          .post(
            `${API.prodUrl}/Precot/api/bleaching/summary/SubmitRecordVerification`,
            a,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("List Of Enclosures", res.data);
            message.success("List Of Enclosures Submitted Successfully");
            onChange("13", bmr);
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    }
  };

  //production details submit
  const prodDetails = () => {
    const finishing =
      pd_finish_Crish === "TICK"
        ? "Crisp"
        : pd_FinishSoft === "TICK"
          ? "Soft"
          : "NA";
    const payload = {
      prodDetailsId: pd_ID,
      bmr_no: bmr,
      batchNo: "",
      batchCount: pd_BatchQty2,
      batchQuantity: pd_BatchQuantity,
      mixing: pd_Mixing,
      startSubBatch: pd_StartSub,
      endSubBatch: pd_EndSub,
      baleCount: pd_BatchQty1,
      supply: "Supplier A",
      finishing,
      startDate: pd_ManufacturingStartDate,
      endDate: pd_ManufacturingCompletionDate,
      startTime: pd_ManufacturingStartTime,
      endTime: pd_ManufacturingCompletionTime,
      isHouse: pd_ProductsupplyInhouse,
      isExport: pd_ProductsupplyExport,
      issuedQuality: qaSign1,
      receivedProduction: productionSign1,
      status: pd_status,
      supervisiorName: productionSign1 || usernameSupervisor,
      supervisiorStatus: pd_prodStatus,
      supervisiorDate: productionLovStates.productionDate || localDateValue4,
      qaStatus: pd_qaStatus,
      qaId: pd_qaId,
      qaName: qaSign1,
      qaDate: productionLovStates.productionQADate,
    };
    console.log("payloa", payload);
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/submitProductionDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Production Details", res.data);
        messageApi.open({
          type: "success",
          content: "Production Details Submitted Successfully",
        });
        onChange("1", bmr);
      })
      .catch((err) => {
        console.log("Error", err.response.data.message);
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      });
  };

  //production details save
  const prodDetailsave = () => {
    const finishing =
      pd_finish_Crish === "TICK"
        ? "Crisp"
        : pd_FinishSoft === "TICK"
          ? "Soft"
          : "NA";

    const payload = {
      prodDetailsId: pd_ID,
      bmr_no: bmr,
      batchNo: "",
      batchCount: pd_BatchQty2,
      batchQuantity: pd_BatchQuantity,
      mixing: pd_Mixing,
      startSubBatch: pd_StartSub,
      endSubBatch: pd_EndSub,
      baleCount: pd_BatchQty1,
      supply: "Supplier A",
      finishing,
      startDate: pd_ManufacturingStartDate,
      endDate: pd_ManufacturingCompletionDate,
      startTime: pd_ManufacturingStartTime,
      endTime: pd_ManufacturingCompletionTime,
      isHouse: pd_ProductsupplyInhouse,
      isExport: pd_ProductsupplyExport,
      issuedQuality: qaSign1,
      receivedProduction: productionSign1,
      status: pd_status,
      supervisiorName: productionSign1 || usernameSupervisor,
      supervisiorStatus: pd_prodStatus,
      supervisiorDate: productionLovStates.productionDate || localDateValue4,
      qaStatus: pd_qaStatus,
      qaId: pd_qaId,
      qaName: qaSign1,
      qaDate: productionLovStates.productionQADate,
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/saveProductionDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Production Details", res.data);
        messageApi.open({
          type: "success",
          content: "Production Details Saved Successfully",
        });
        onChange("1", bmr);
      })
      .catch((err) => {
        console.log("Error", err.response.data.message);
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      });
  };

  //Chemical details get api
  const postprodSend = () => {
    console.log("postProdArray.hodName,", postProdArray.hodName);
    const payload = {
      form: "POST PRODUCTOIN DETAILS",
      qaName: postProdArray.QaName || usernameQAManager,
      hodName: postProdArray.hodName || usernameHod,
      supervisorName: postProdArray.prodSupName || usernameSupervisor,
      bmrNo: bmr,
      date: postProdArray.QaDate || localDateValue6,
      store: "Store A",
      shoppageDate: postProdArray.hodDate || localDateValue5,
      shoppageDate2: postProdArray.prodSupDate || localDateValue4,
      status: postProdSubmitStatus || "",
    };
    const payload_2 = {
      form: "POST PRODUCTOIN DETAILS",
      qaName: postProdArray.QaName || usernameQAManager,
      hodName: postProdArray.hodName || usernameHod,
      supervisorName: postProdArray.prodSupName || usernameSupervisor,
      bmrNo: bmr,
      date: postProdArray.QaDate || localDateValue6,
      store: "Store A",
      shoppageDate: postProdArray.hodDate || localDateValue5,
      shoppageDate2: postProdArray.prodSupDate || localDateValue4,
      id: pprId,
      status: postProdSubmitStatus || "",
    };
    console.log("pprNewSave", pprNewSave);
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/submitBmrCompletion`,
        pprNewSave ? payload_2 : payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Stoppage Details", res.data);
        messageApi.open({
          type: "success",
          content: "Post Production Review Submitted Successfully",
        });
        onChange("14", bmr);
      })
      .catch((err) => {
        console.log("Error", err.response.data.message);
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      });
  };

  const postqareleaseSend = () => {
    console.log("qasend called");

    if (qaReleaseStore?.qualityRelease.length > 0) {
      const e = qaReleaseStore;
      const c = e.qualityRelease;
      c[0] = {
        createdAt: e.qualityRelease[0].createdAt,
        createdBy: e.qualityRelease[0].createdBy,
        date: qaReleaseObj.Date1,
        description: e.qualityRelease[0].description,
        qualityId: e.qualityRelease[0].qualityId,
        signature: qaReleaseObj.Sign1,
        signatureId: e.qualityRelease[0].signatureId,
        status: e.qualityRelease[0].status,
        status1: qaReleaseArray.criticalProcessParameter,
        status2: qaReleaseArray.criticalProcessParameter,
        summaryId: e.qualityRelease[0].summaryId,
        updatedAt: e.qualityRelease[0].updatedAt,
        updatedBy: e.qualityRelease[0].updatedBy,
      };
      c[1] = {
        createdAt: e.qualityRelease[1].createdAt,
        createdBy: e.qualityRelease[1].createdBy,
        date: qaReleaseObj.Date2,
        description: e.qualityRelease[1].description,
        qualityId: e.qualityRelease[1].qualityId,
        signature: qaReleaseObj.Sign2,
        signatureId: e.qualityRelease[1].signatureId,
        status: e.qualityRelease[1].status,
        status1: qaReleaseArray.ProcessChecksReviewed,
        status2: qaReleaseArray.ProcessChecksReviewed,
        summaryId: e.qualityRelease[1].summaryId,
        updatedAt: e.qualityRelease[1].updatedAt,
        updatedBy: e.qualityRelease[1].updatedBy,
      };
      c[2] = {
        createdAt: e.qualityRelease[2].createdAt,
        createdBy: e.qualityRelease[2].createdBy,
        date: qaReleaseObj.Date3,
        description: e.qualityRelease[2].description,
        qualityId: e.qualityRelease[2].qualityId,
        signature: qaReleaseObj.Sign3,
        signatureId: e.qualityRelease[2].signatureId,
        status: e.qualityRelease[2].status,
        status1: qaReleaseArray.DeviationReviewes,
        status2: qaReleaseArray.DeviationReviewes,
        summaryId: e.qualityRelease[2].summaryId,
        updatedAt: e.qualityRelease[2].updatedAt,
        updatedBy: e.qualityRelease[2].updatedBy,
      };
      c[3] = {
        createdAt: e.qualityRelease[3].createdAt,
        createdBy: e.qualityRelease[3].createdBy,
        date: qaReleaseObj.Date4,
        description: e.qualityRelease[3].description,
        qualityId: e.qualityRelease[3].qualityId,
        signature: qaReleaseObj.Sign4,
        signatureId: e.qualityRelease[3].signatureId,
        status: e.qualityRelease[3].status,
        status1: qaReleaseArray.DeivationLogged,
        status2: qaReleaseArray.DeivationLogged,
        summaryId: e.qualityRelease[3].summaryId,
        updatedAt: e.qualityRelease[3].updatedAt,
        updatedBy: e.qualityRelease[3].updatedBy,
      };
      c[4] = {
        createdAt: e.qualityRelease[4].createdAt,
        createdBy: e.qualityRelease[4].createdBy,
        date: qaReleaseObj.Date5,
        description: e.qualityRelease[4].description,
        qualityId: e.qualityRelease[4].qualityId,
        signature: qaReleaseObj.Sign5,
        signatureId: e.qualityRelease[4].signatureId,
        status: e.qualityRelease[4].status,
        status1: qaReleaseArray.BatchReleased,
        status2: qaReleaseArray.BatchReleased,
        summaryId: e.qualityRelease[4].summaryId,
        updatedAt: e.qualityRelease[4].updatedAt,
        updatedBy: e.qualityRelease[4].updatedBy,
      };

      console.log("payload qa release", e);

      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/submitMachineOperations`,
          e,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Stoppage Details", res.data);
          messageApi.open({
            type: "success",
            content: "Qa Release Saved Successfully",
          });
          onChange("15", bmr);
        })
        .catch((err) => {
          console.log("Error", err);
          messageApi.open({
            type: "error",
            content: err.response.data.message,
          });
        });
    } else {
      qaReleaseStore?.qualityRelease.push(
        {
          qualityId: "",
          description: "criticalProcessParameter",
          status1: qaReleaseArray.criticalProcessParameter,
          status2: qaReleaseArray.criticalProcessParameter,
          signature: qaReleaseObj.Sign1,
          signatureId: "",
          date: qaReleaseObj.Date1,
        },
        {
          qualityId: "",
          description: "ProcessChecksReviewed",
          status1: qaReleaseArray.ProcessChecksReviewed,
          status2: qaReleaseArray.ProcessChecksReviewed,
          signature: qaReleaseObj.Sign2,
          signatureId: "",
          date: qaReleaseObj.Date2,
        },
        {
          qualityId: "",
          description: "DeviationReviewes",
          status1: qaReleaseArray.DeviationReviewes,
          status2: qaReleaseArray.DeviationReviewes,
          signature: qaReleaseObj.Sign3,
          signatureId: "",
          date: qaReleaseObj.Date3,
        },
        {
          qualityId: "",
          description: "DeivationLogged",
          status1: qaReleaseArray.DeivationLogged,
          status2: qaReleaseArray.DeivationLogged,
          signature: qaReleaseObj.Sign4,
          signatureId: "",
          date: qaReleaseObj.Date4,
        },
        {
          qualityId: "",
          description: "BatchReleased",
          status1: qaReleaseArray.BatchReleased,
          status2: qaReleaseArray.BatchReleased,
          signature: qaReleaseObj.Sign5,
          signatureId: "",
          date: qaReleaseObj.Date5,
        }
      );
      console.log("gg", qaReleaseStore);
      const a = qaReleaseStore || {};
      a.key = "QUALITY";
      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/submitMachineOperations`,
          a,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Stoppage Details", res.data);
          messageApi.open({
            type: "success",
            content: "Qa Release Submitted Successfully",
          });
          onChange("15", bmr);
        })
        .catch((err) => {
          console.log("Error", err);
          messageApi.open({
            type: "error",
            content: err.response.data.message,
          });
        });
    }
  };

  const postqareleaseSave = () => {
    console.log("savecalled");
    if (qaReleaseStore?.qualityRelease?.length > 0) {
      const e = qaReleaseStore;
      const c = e.qualityRelease;
      c[0] = {
        createdAt: e.qualityRelease[0].createdAt,
        createdBy: e.qualityRelease[0].createdBy,
        date: qaReleaseObj.Date1,
        description: e.qualityRelease[0].description,
        qualityId: e.qualityRelease[0].qualityId,
        signature: qaReleaseObj.Sign1,
        signatureId: e.qualityRelease[0].signatureId,
        status: e.qualityRelease[0].status,
        status1: qaReleaseArray.criticalProcessParameter,
        status2: qaReleaseArray.criticalProcessParameter,
        summaryId: e.qualityRelease[0].summaryId,
        updatedAt: e.qualityRelease[0].updatedAt,
        updatedBy: e.qualityRelease[0].updatedBy,
      };
      c[1] = {
        createdAt: e.qualityRelease[1].createdAt,
        createdBy: e.qualityRelease[1].createdBy,
        date: qaReleaseObj.Date2,
        description: e.qualityRelease[1].description,
        qualityId: e.qualityRelease[1].qualityId,
        signature: qaReleaseObj.Sign2,
        signatureId: e.qualityRelease[1].signatureId,
        status: e.qualityRelease[1].status,
        status1: qaReleaseArray.ProcessChecksReviewed,
        status2: qaReleaseArray.ProcessChecksReviewed,
        summaryId: e.qualityRelease[1].summaryId,
        updatedAt: e.qualityRelease[1].updatedAt,
        updatedBy: e.qualityRelease[1].updatedBy,
      };
      c[2] = {
        createdAt: e.qualityRelease[2].createdAt,
        createdBy: e.qualityRelease[2].createdBy,
        date: qaReleaseObj.Date3,
        description: e.qualityRelease[2].description,
        qualityId: e.qualityRelease[2].qualityId,
        signature: qaReleaseObj.Sign3,
        signatureId: e.qualityRelease[2].signatureId,
        status: e.qualityRelease[2].status,
        status1: qaReleaseArray.DeviationReviewes,
        status2: qaReleaseArray.DeviationReviewes,
        summaryId: e.qualityRelease[2].summaryId,
        updatedAt: e.qualityRelease[2].updatedAt,
        updatedBy: e.qualityRelease[2].updatedBy,
      };
      c[3] = {
        createdAt: e.qualityRelease[3].createdAt,
        createdBy: e.qualityRelease[3].createdBy,
        date: qaReleaseObj.Date4,
        description: e.qualityRelease[3].description,
        qualityId: e.qualityRelease[3].qualityId,
        signature: qaReleaseObj.Sign4,
        signatureId: e.qualityRelease[3].signatureId,
        status: e.qualityRelease[3].status,
        status1: qaReleaseArray.DeivationLogged,
        status2: qaReleaseArray.DeivationLogged,
        summaryId: e.qualityRelease[3].summaryId,
        updatedAt: e.qualityRelease[3].updatedAt,
        updatedBy: e.qualityRelease[3].updatedBy,
      };
      c[4] = {
        createdAt: e.qualityRelease[4].createdAt,
        createdBy: e.qualityRelease[4].createdBy,
        date: qaReleaseObj.Date5,
        description: e.qualityRelease[4].description,
        qualityId: e.qualityRelease[4].qualityId,
        signature: qaReleaseObj.Sign5,
        signatureId: e.qualityRelease[4].signatureId,
        status: e.qualityRelease[4].status,
        status1: qaReleaseArray.BatchReleased,
        status2: qaReleaseArray.BatchReleased,
        summaryId: e.qualityRelease[4].summaryId,
        updatedAt: e.qualityRelease[4].updatedAt,
        updatedBy: e.qualityRelease[4].updatedBy,
      };

      console.log("a", e);

      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/saveMachineOperations`,
          e,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Stoppage Details", res.data);
          messageApi.open({
            type: "success",
            content: "Qa Release Saved Successfully",
          });
          onChange("15", bmr);
        })
        .catch((err) => {
          console.log("Error", err);
          messageApi.open({
            type: "error",
            content: err.response.data.message,
          });
        });
    } else {
      qaReleaseStore?.qualityRelease?.push(
        {
          qualityId: "",
          description: "criticalProcessParameter",
          status1: qaReleaseArray.criticalProcessParameter,
          status2: qaReleaseArray.criticalProcessParameter,
          signature: qaReleaseObj.Sign1,
          signatureId: "",
          date: qaReleaseObj.Date1,
        },
        {
          qualityId: "",
          description: "ProcessChecksReviewed",
          status1: qaReleaseArray.ProcessChecksReviewed,
          status2: qaReleaseArray.ProcessChecksReviewed,
          signature: qaReleaseObj.Sign2,
          signatureId: "",
          date: qaReleaseObj.Date2,
        },
        {
          qualityId: "",
          description: "DeviationReviewes",
          status1: qaReleaseArray.DeviationReviewes,
          status2: qaReleaseArray.DeviationReviewes,
          signature: qaReleaseObj.Sign3,
          signatureId: "",
          date: qaReleaseObj.Date3,
        },
        {
          qualityId: "",
          description: "DeivationLogged",
          status1: qaReleaseArray.DeivationLogged,
          status2: qaReleaseArray.DeivationLogged,
          signature: qaReleaseObj.Sign4,
          signatureId: "",
          date: qaReleaseObj.Date4,
        },
        {
          qualityId: "",
          description: "BatchReleased",
          status1: qaReleaseArray.BatchReleased,
          status2: qaReleaseArray.BatchReleased,
          signature: qaReleaseObj.Sign5,
          signatureId: "",
          date: qaReleaseObj.Date5,
        }
      );
      console.log("gg", qaReleaseStore);
      const a = qaReleaseStore || {};
      a.key = "QUALITY";
      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/summary/saveMachineOperations`,
          a,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Stoppage Details", res.data);
          messageApi.open({
            type: "success",
            content: "Qa Release Submitted Successfully",
          });
          onChange("15", bmr);
        })
        .catch((err) => {
          console.log("Error", err);
          messageApi.open({
            type: "error",
            content: err.response.data.message,
          });
        });
    }
  };

  const rawCottonSubmit = () => {
    const payload = {
      form: "RAW COTTON ISSUE",
      qaName: store1Sign,
      hodName: "",
      supervisorName:
        productionLovStates.rawCottonIssueProdSign || usernameSupervisor,
      bmrNo: bmr,
      date: new Date(),
      store: "Store A",
      shoppageDate: rawIssuedBy,
      shoppageDate2: rawReceivedBy || new Date(),
    };
    const payload_2 = {
      form: "RAW COTTON ISSUE",
      qaName: store1Sign,

      supervisorName:
        productionLovStates.rawCottonIssueProdSign | usernameSupervisor,
      bmrNo: bmr,
      date: new Date(),
      store: "Store A",
      shoppageDate: rawIssuedBy,
      shoppageDate2: rawReceivedBy || new Date(),
      id: rawCottonId,
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/submitBmrCompletion`,
        rawCottonNewSave ? payload_2 : payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Stoppage Details", res.data);
        message.success("Raw Cotton Submitted Successfully");
        onChange("2", bmr);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const prodReleaseFunc = () => {

    const payload = {
      form: "PRODUCTION RELEASE",
      qaName: prodRelease.Sign2 || usernameQADESANDMAN,

      supervisorName: prodRelease.Sign1 || username,
      bmrNo: bmr,
      date: new Date().toISOString().slice(0, 10),
      store: "Store A",
      shoppageDate: prodRelease.Date1 || localDateValue,
      shoppageDate2: prodRelease.Date2 || localDateValue3,
      status: "QA_INSPECTOR_SUBMITTED",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/submitBmrCompletion`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Stoppage Details", res.data);
        messageApi.open({
          type: "success",
          content:
            "Product Release Submitted Successfully and Summary Ready to be Print",
        });
        onChange("16", bmr);
        setPrintBtnEnable(true);
        setPrintValidation(true);
      })
      .catch((err) => {
        console.log("Error", err);
        message.error(err.response.data.message);
      });

  };

  const pdeSave = () => {
    const selectedData = pdeArray
      .filter((_, index) => checkedItems[index])
      .map((x, index) => ({
        id: x.id,
        date:
          x.packDt != undefined
            ? moment(x.packDt).format("YYYY-MM-DD")
            : moment(x.date).format("YYYY-MM-DD"),
        machine: x.mcn || x.machine,
        from_hour: x.f_time || x.from_hour,
        to_hour: x.t_time || x.to_hour,
        total_hour: x.totHrs || x.total_hour,
        reason: x.reason,
        remarks: x.remarks,
        shift: x.shift,
        sign: signatureValues[index] || x.sign,
        sign_date:
          dateValues[index] !== null || dateValues[index] !== undefined
            ? moment(dateValues[index]).format("YYYY-MM-DD")
            : moment(x.sign_date).format("YYYY-MM-DD"),
      }));

    const payload = {
      process_id: process_id,
      bmr_no: bmr,
      details: selectedData,
    };

    console.log("paykload", payload);
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/SaveProcessDelayEqupment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Stoppage Details", res.data);
        message.success("Product Delay / Equipment Saved Successfully");
        onChange("11", bmr);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const pdeSubmit = () => {
    const selectedData = pdeArray
      .filter((_, index) => checkedItems[index])
      .map((x, index) => ({
        id: x.id,
        date:
          x.packDt != undefined
            ? moment(x.packDt).format("YYYY-MM-DD")
            : moment(x.date).format("YYYY-MM-DD"),
        machine: x.mcn || x.machine,
        from_hour: x.f_time || x.from_hour,
        to_hour: x.t_time || x.to_hour,
        total_hour: x.totHrs || x.total_hour,
        reason: x.reason,
        remarks: x.remarks,
        shift: x.shift,
        sign: signatureValues[index] || x.sign,
        sign_date:
          dateValues[index] !== null || dateValues[index] !== undefined
            ? moment(dateValues[index]).format("YYYY-MM-DD")
            : moment(x.sign_date).format("YYYY-MM-DD"),
      }));
    const payload = {
      process_id: process_id,
      bmr_no: bmr,
      details: selectedData,
    };
    console.log("paykload", payload);
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/SubmitProcessDelayEqupment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Stoppage Details", res.data);
        message.success("Product Delay / Equipment Submitted Successfully");
        onChange("11", bmr);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const updateStateObject = (updates) => {
    setVorStateObject((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateManufacturingStepsObject = (updates) => {
    setManufacturingSteps((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateProductionReconciliation = (updates) => {
    setproductionReconillationObject((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateListOfEnclousres = (updates) => {
    setListOfEnclosuresNewArray((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateQaReleaseObject = (updates) => {
    setqaReleaseArray((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  //setFlagKeys
  const updateFlags = (updates) => {
    setFlagKeys((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  //setProductionLOV
  const updateProdLov = (updates) => {
    setProductionLovStates((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  // currdate
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const localDate = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);

    if (role == "ROLE_QA") {
      setLocaldateValue(localDate);
    }
    if (role == "ROLE_SUPERVISOR") {
      setLocaldateValue4(localDate);
    }
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      setLocaldateValue5(localDate);
    }
    console.log("localDaterole", localDate, role);

    if (role == "QA_INSPECTOR") {
      setLocaldateValue2(localDate);
    }
    if (role === "QA_DESIGNEE" || role === "QA_MANAGER") {
      setLocaldateValue3(localDate);
    }
    if (role === "QA_MANAGER") {
      setLocaldateValue6(localDate);
    }

    if (role == "ROLE_SUPERVISOR") {
      setMachineOpsPerformedByDate(localDate);
      setNewDate(localDate);
    }
    role == "ROLE_SUPERVISOR"
      ? updatePerformedByDate({ housekeeping: localDate })
      : "";
    role == "ROLE_QA" ? updateVerifiedByDate({ housekeeping: localDate }) : "";

    role == "ROLE_SUPERVISOR"
      ? updatePerformedByDate({ machineCleaning: localDate })
      : "";
    role == "ROLE_QA"
      ? updateVerifiedByDate({ machineCleaning: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updatePerformedByDate({ logbook: localDate })
      : "";
    role == "ROLE_QA" ? updateVerifiedByDate({ logbook: localDate }) : "";
    role == "ROLE_SUPERVISOR"
      ? updatePerformedByDate({ productionRecord: localDate })
      : "";
    role == "ROLE_QA"
      ? updateVerifiedByDate({ productionRecord: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updatePerformedByDate({ machineSanitizer: localDate })
      : "";
    role == "ROLE_QA"
      ? updateVerifiedByDate({ machineSanitizer: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ one: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ one: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ two: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ two: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ three: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ three: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ four: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ four: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ five: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ five: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ six: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ six: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ seven: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ seven: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ eight: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ eight: localDate })
      : "";
    role == "ROLE_SUPERVISOR"
      ? updateManufacturingStepsPerformedByDate({ nine: localDate })
      : "";
    role == "ROLE_QA"
      ? updateManufacturingStepsVerifiedByDate({ nine: localDate })
      : "";
    role == "ROLE_SUPERVISOR" ? updateDateQA({ one: localDate }) : "";
    role == "ROLE_QA" ? updateDateProd({ one: localDate }) : "";
    role == "ROLE_SUPERVISOR" ? updateDateQA({ two: localDate }) : "";
    role == "ROLE_QA" ? updateDateProd({ two: localDate }) : "";
    role == "ROLE_SUPERVISOR" ? updateDateQA({ three: localDate }) : "";
    role == "ROLE_QA" ? updateDateProd({ three: localDate }) : "";
    role == "ROLE_SUPERVISOR"
      ? updatePostProduction({ prodSupDate: localDate })
      : "";
    role == "QA_MANAGER" ? updatePostProduction({ QaDate: localDate }) : "";
    role == "ROLE_HOD" ? updatePostProduction({ hodDate: localDate }) : "";
    if (role === "QA_DESIGNEE" || role === "QA_MANAGER") {
      updateQa({ Date1: localDate });
      updateQa({ Date2: localDate });
      updateQa({ Date3: localDate });
      updateQa({ Date4: localDate });
      updateQa({ Date5: localDate });
    }
    role == "QA_INSPECTOR" ? updateProd({ Date1: localDate }) : "";

    if (role === "QA_DESIGNEE" || role === "QA_MANAGER") {
      updateProd({ Date2: localDate });
    }
  }, []);

  //setProductionLOV
  const updateVerifiedByDate = (updates) => {
    setVerifiedByDate((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  //setProductionLOV
  const updatePerformedByDate = (updates) => {
    setPerformedByDate((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  //setProductionLOV
  const updateVerifiedBySign = (updates) => {
    setVerifiedBySign((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  //setProductionLOV
  const updatePerformedBySign = (updates) => {
    setPerformedBySign((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateManufacturingStepsVerifiedBySign = (updates) => {
    setmanufacturingStepsVerifiedbysign((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateManufacturingStepsVerifiedByDate = (updates) => {
    setmanufacturingStepsVerifiedbydate((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateManufacturingStepsPerformedBySign = (updates) => {
    setmanufacturingStepsPerformedbysign((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateManufacturingStepsPerformedByDate = (updates) => {
    setmanufacturingStepsPerformedbydate((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateDeviationLogNo = (updates) => {
    setdeviationLog((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateSignProd = (updates) => {
    setPdrSign1((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateSignQA = (updates) => {
    setPdrSign2((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateDateProd = (updates) => {
    setPdrDate1((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateDateQA = (updates) => {
    setPdrDate2((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updateRemarksQA = (updates) => {
    setqaRemarks((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updatePostProduction = (updates) => {
    setPostProdArray((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateQa = (updates) => {
    setQaReleaseObj((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateProd = (updates) => {
    setProdRelease((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateList = (updates) => {
    setListOf((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const prodOnchange1 = (value) => {
    updateProd({ Name1: value });
  };
  const prodOnchange2 = (value) => {
    updateProd({ Name2: value });
  };
  const prodOnchange3 = (value) => {
    updateProd({ Sign1: value });
  };
  const prodOnchange4 = (value) => {
    updateProd({ Sign2: value });
  };

  //post production onChange
  const ppOnchangeName1 = (value) => {
    updatePostProduction({ prodSupName: value });
  };
  const ppOnchangeName2 = (value) => {
    updatePostProduction({ hodName: value });
  };
  const ppOnchangeName3 = (value) => {
    updatePostProduction({ QaName: value });
  };



  const processDeviationFunc = () => {
    const payload_2 = [
      {
        deviationLogNo: deviationLog.one,
        qaRemarks: qaRemarks.one,
        sign: pdrSign1.one,
        signDate: pdrDate1.one,
        qa_saved_by: pdrSign2.one || usernameSupervisor,
        qa_saved_on: pdrDate2.one || localDateValue4,
        bmr_no: bmr,
        id: pdrId1,
      },
      {
        deviationLogNo: deviationLog.two,
        qaRemarks: qaRemarks.two,
        sign: pdrSign1.two,
        signDate: pdrDate1.two,
        qa_saved_by: pdrSign2.two || usernameSupervisor,
        qa_saved_on: pdrDate2.two || localDateValue4,
        bmr_no: bmr,
        id: pdrId2,
      },
      {
        deviationLogNo: deviationLog.three,
        qaRemarks: qaRemarks.three,
        sign: pdrSign1.three,
        signDate: pdrDate1.three,
        qa_saved_by: pdrSign2.three || usernameSupervisor,
        qa_saved_on: pdrDate2.three || localDateValue4,
        bmr_no: bmr,
        id: pdrId3,
      },
    ];
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/submitProcessDeviationRecord`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        message.success("Process Deviation Record Submitted Successfully");
        onChange("12", bmr);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };


  const saveprocessDeviationFunc = () => {
    const payload3 = [
      {
        id: pdrId1,
        deviationLogNo: deviationLog.one,
        qaRemarks: qaRemarks.one,
        bmr_no: bmr,
        sign: pdrSign1.one,
        signDate: pdrDate1.one,
        qa_saved_on: pdrDate2.one || localDateValue4,
        qa_saved_by: pdrSign2.one || usernameSupervisor,
      },
      {
        id: pdrId2,
        deviationLogNo: deviationLog.two,
        qaRemarks: qaRemarks.two,
        bmr_no: bmr,
        sign: pdrSign1.two,
        signDate: pdrDate1.two,
        qa_saved_on: pdrDate2.two || localDateValue4,
        qa_saved_by: pdrSign2.two || usernameSupervisor,

      },
      {
        id: pdrId3,
        deviationLogNo: deviationLog.three,
        qaRemarks: qaRemarks.three,
        bmr_no: bmr,
        sign: pdrSign1.three,
        signDate: pdrDate1.three,
        qa_saved_on: pdrDate2.three || localDateValue4,
        qa_saved_by: pdrSign2.three || usernameSupervisor,
      },
    ];
    console.log("payload3", payload3);
    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/saveProcessDeviationRecord`,
        payload3,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        message.success("Process Deviation Record Saved Successfully");
        onChange("12", bmr);
      })
      .catch((err) => {
        console.log("error", err);
        message.error(err.response?.data?.message);
      });
  };

  const printingFunc = () => {
    if (listOf.bleaching == true) {
      setBleachingModal(true);
    } else if (listOf.annexure == true) {
      window.print();
    } else if (listOf.freetext == true) {
      if (elementRef.current) {

        window.print();
      }
    }
    console.log("List Of", listOf);
  };

  const changeBatchNo = (value) => {
    setBatchNoNew(value);
  };

  const confirmPrint = () => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/getBmrbatchNoDetails13?bmr_no=${bmr}&batchNo=${batchNoNew}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("RES", res.data);
        setBlechingJobCard(res.data);
        setTimeout(() => {
          window.print();
        }, 1000);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };




  const items = [
    {
      key: "1",
      label: "Production Details",
      children: (
        <Row>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "0.5em",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: pd_disable || loggedInHod ? "none" : "block",
              }}
              shape="round"
              onClick={prodDetailsave}
              disabled={LoggedInQA_DESIGNEEandQA_MAN}
            >
              Save
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: pd_disable || loggedInHod ? "none" : "block",
              }}
              shape="round"
              onClick={prodDetails}
              disabled={LoggedInQA_DESIGNEEandQA_MAN}
            >
              Submit
            </Button>
          </div>
          <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                Batch Quantity - Output (Unit: Kg)
              </td>
              <td align="center">{pd_BatchQuantity}</td>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                Batch Qty. converted to “n” No. of Sub Batches (Unit: Nos)
              </td>
              <td align="center">{pd_BatchQty2}</td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                Mixing
              </td>
              <td align="center">{pd_Mixing}</td>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                Start Sub Batch No
              </td>
              <td align="center">{pd_StartSub}</td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                Batch Qty. converted to “n” No. of Bales (Unit: Nos)
              </td>
              <td align="center">{pd_BatchQty1}</td>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                End Sub Batch No.
              </td>
              <td align="center">{pd_EndSub}</td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                Product Supply
              </td>
              <td>
                <tr>
                  <td
                    style={{
                      width: "60%",
                      borderBottom: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    align="center"
                  >
                    In House
                  </td>
                  <td
                    style={{
                      border: "none",
                      display: "flex",
                      marginLeft: "0.5em",
                    }}
                  >
                    <Radio.Group
                      value={pd_ProductsupplyInhouse}

                      disabled={pd_disable}
                    >
                      <Radio value="TICK">✓</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "none",
                      borderLeft: "none",
                    }}
                    align="center"
                  >
                    Export
                  </td>
                  <td
                    style={{
                      border: "none",
                      display: "flex",
                      marginLeft: "0.5em",
                    }}
                  >
                    <Radio.Group
                      value={pd_ProductsupplyExport}

                      disabled={pd_disable}
                    >
                      <Radio value="TICK">✓</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
              </td>
              <td
                style={{
                  padding: "0.5em",
                }}
              >
                Finishing
              </td>
              <td>
                <tr>
                  <td
                    style={{
                      width: "60%",
                      borderBottom: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    align="center"
                  >
                    Crisp
                  </td>
                  <td
                    style={{
                      border: "none",
                      display: "flex",
                      marginLeft: "0.5em",
                    }}
                  >
                    <Radio.Group
                      value={pd_finish_Crish}
                      disabled={pd_disable}
                    >
                      <Radio value="TICK">✓</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "none",
                      borderLeft: "none",
                    }}
                    align="center"
                  >
                    Soft
                  </td>
                  <td
                    style={{
                      border: "none",
                      display: "flex",
                      marginLeft: "0.5em",
                    }}
                  >
                    <Radio.Group
                      value={pd_FinishSoft}
                      disabled={pd_disable}
                    >
                      <Radio value="TICK">✓</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
              </td>
            </tr>
          </table>
          <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <td
                align="center"
                style={{
                  padding: "0.5em",
                }}
                colSpan="4"
              >
                <b>Manufacturing Start Date</b>
              </td>
              <td align="center" colSpan="4">
                <b>Manufacturing Completion Date</b>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: "none",
                }}
                align="center"
                colSpan="1"
              >
                <b>Date:</b>
              </td>
              <td
                style={{
                  borderBottom: "none",
                  borderTop: "none",
                }}
                colSpan="1"
                align="center"
              >
                {pd_ManufacturingStartDate}
              </td>
              <td
                style={{
                  border: "none",
                }}
                align="center"
                colSpan="1"
              >
                <b>Time:</b>
              </td>
              <td
                style={{
                  borderBottom: "none",
                  borderTop: "none",
                }}
                colSpan="1"
                align="center"
              >
                {pd_ManufacturingStartTime}
              </td>

              {/* second row here */}
              <td
                style={{
                  border: "none",
                }}
                align="center"
                colSpan="1"
              >
                <b>Date:</b>
              </td>
              <td
                style={{
                  borderBottom: "none",
                  borderTop: "none",
                }}
                colSpan="1"
                align="center"
              >
                {pd_ManufacturingCompletionDate}
              </td>
              <td
                style={{
                  border: "none",
                }}
                align="center"
                colSpan="1"
              >
                <b>Time:</b>
              </td>
              <td
                style={{
                  borderRight: "none",
                  borderBottom: "none",
                  borderTop: "none",
                }}
                colSpan="1"
                align="center"
              >
                {pd_ManufacturingCompletionTime}
              </td>
            </tr>
          </table>
          <table
            style={{
              width: "100%",
            }}
          >
            <tr
              style={{
                textAlign: "center",
              }}
            >
              <th
                colSpan="8"
                style={{
                  padding: "1em",
                }}
              >
                Production Batch Record Issuance Details
              </th>
            </tr>
            <tr>
              <td
                colSpan="4"
                style={{
                  padding: "1em",
                }}
              >
                <b>
                  Issued by: Quality Assurance has reviewed the Batch Record to
                  ensure that the copy is a complete, accurate copy of the
                  Master Batch Record.
                </b>
              </td>
              <td
                colSpan="4"
                style={{
                  padding: "1em",
                }}
              >
                <b>
                  Received by: Production has reviewed the Batch Record to
                  ensure that the copy is complete and correct. Production is
                  responsible for the Batch Record, following the issuance.
                </b>
              </td>
            </tr>
            {bmrStatus == true ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "1em",
                  }}
                >
                  <b>
                    Issued by(QA){" "}
                    <Form>
                      <Form.Item label="QA">
                        <p>{qaSign1}</p>
                      </Form.Item>
                      <Form.Item label="Date">
                        <p>{productionLovStates.productionQADate}</p>
                      </Form.Item>
                    </Form>
                  </b>
                </td>
                <td
                  colSpan="4"
                  style={{
                    padding: "1em",
                  }}
                >
                  <b>
                    Received by(Production)
                    <Form>
                      <Form.Item label="Production">
                        <p>{productionSign1}</p>
                      </Form.Item>
                      <Form.Item label="Date">
                        <p>
                          {productionLovStates.productionDate
                            ? moment(productionLovStates.productionDate).format(
                              "DD/MM/YYYY - HH:mm"
                            )
                            : localDateValue4}
                        </p>
                      </Form.Item>
                    </Form>
                  </b>
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "1em",
                  }}
                >
                  <b>
                    Issued by(QA){" "}
                    <Form>
                      <Form.Item label="Select QA">
                        <Select
                          onChange={Qa1SignOnchange}
                          options={qaLov}
                          placeholder="Select QA"
                          value={qaSign1}
                          disabled={pd_disable || !loggedInQa}
                        />
                      </Form.Item>
                      <Form.Item label="Select Date">
                        <Input
                          type="datetime-local"
                          value={productionLovStates.productionQADate}
                          onChange={(e) =>
                            updateProdLov({ productionQADate: e.target.value })
                          }
                          disabled={pd_disable || !loggedInQa}
                        />
                      </Form.Item>
                    </Form>
                  </b>
                </td>
                <td
                  colSpan="4"
                  style={{
                    padding: "1em",
                  }}
                >
                  <b>
                    Received by(Production)
                    <Form>
                      <Form.Item label="Select Production">
                        <Select
                          onChange={Prod1SignChange}
                          options={prodLov}
                          placeholder="Select Production"
                          value={productionSign1 || usernameSupervisor}
                          disabled={pd_disable || !loggedInSupervisor}
                        />
                      </Form.Item>
                      <Form.Item label="Select Date">
                        <Input
                          type="datetime-local"
                          value={productionLovStates.productionDate || localDateValue4}
                          onChange={(e) =>
                            updateProdLov({ productionDate: e.target.value })
                          }
                          disabled={pd_disable || !loggedInSupervisor}
                        />
                      </Form.Item>
                    </Form>
                  </b>
                </td>
              </tr>
            )}
          </table>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Raw Cotton Issue",
      children: (
        <Row>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "0.5em",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:
                  (loggedInSupervisor && rawCottonSupStatus) ||
                    (loggedInQa && rawCottonQaStatus) ||
                    loggedInQa ||
                    loggedInHod
                    ? "none"
                    : "block",
              }}
              onClick={rawCottonSubmit}
              shape="round"
              disabled={LoggedInQA_DESIGNEEandQA_MAN}
            >
              Submit
            </Button>
          </div>
          <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <th
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                Laydown No
              </th>
              <th colSpan="1">Batch No</th>
              <th colSpan="1">No.of Bales </th>
              <th colSpan="1">Total Bale Wt.(kg) </th>
            </tr>
            {rawCottonIssue &&
              rawCottonIssue.map((x, i) => {
                return (
                  <tr key={i}>
                    <td colSpan="1" style={{ padding: "1em" }} align="center">
                      {laydownNo}
                    </td>
                    <td colSpan="1" align="center">
                      {x.batchNo == undefined ? "" : x.batchNo}
                    </td>
                    <td colSpan="1" align="center">
                      {x.balesCount}
                    </td>
                    <td colSpan="1" align="center">
                      {x.weight}
                    </td>
                  </tr>
                );
              })}
            <tr>

              <td colSpan="2" style={{ height: "50px", textAlign: "Center" }}>
                Total
              </td>
              <td colSpan="1" style={{ height: "50px" }} align="center">
                {rawweightTotal}
              </td>
              <td colSpan="1" style={{ height: "50px" }} align="center">
                {rawweightTotalBaleWeight}
              </td>
            </tr>
            {rawCottonStatus == true ? (
              <>
                {rawCottonStore &&
                  rawCottonStore.map((x, i) => {
                    return (
                      <tr>
                        <td colSpan="2" align="center">
                          {x.qaName}
                          <br />
                          {moment(x.shoppageDate).format("DD/MM/YYYY") || "NA"}
                        </td>
                        <td colSpan="2" align="center">
                          {x.supervisorName}
                          <br />
                          {moment(x.shoppageDate2).format("DD/MM/YYYY") || "NA"}
                        </td>
                      </tr>
                    );
                  })}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan="2"
                    style={{ height: "90px", borderRight: "none" }}
                    align="center"
                  >
                    Issued by (Stores):
                    <br />
                    <Form
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Form.Item
                        style={{
                          width: "12em",
                        }}
                      >
                        <Select
                          options={stores}
                          onChange={store1Onchange}
                          value={store1Sign}
                          placeholder="Select Stores"
                          disabled={
                            (loggedInSupervisor && rawCottonSupStatus) ||
                            (loggedInQa && rawCottonQaStatus) ||
                            loggedInHod ||
                            loggedInQa ||
                            LoggedInQA_DESIGNEEandQA_MAN
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input
                          type="date"
                          value={rawIssuedBy}
                          onChange={(e) => setRawIssuedBy(e.target.value)}
                          disabled={
                            (loggedInSupervisor && rawCottonSupStatus) ||
                            (loggedInQa && rawCottonQaStatus) ||
                            loggedInHod ||
                            loggedInQa ||
                            LoggedInQA_DESIGNEEandQA_MAN
                          }
                        />
                      </Form.Item>

                    </Form>
                  </td>
                  <td
                    colSpan="2"
                    style={{ height: "90px", borderLeft: "none" }}
                    align="center"
                  >
                    Received by (Production):
                    <br />
                    <Form
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Form.Item
                        style={{
                          width: "12em",
                        }}
                      >
                        <Select
                          options={prodLov}
                          onChange={rawCottonIssueProdSignOnChange}
                          value={rawCottonProd || usernameSupervisor}
                          placeholder="Select Production"
                          disabled={
                            (loggedInSupervisor && rawCottonSupStatus) ||
                            (loggedInQa && rawCottonQaStatus) ||
                            loggedInHod ||
                            !loggedInSupervisor
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Input
                          type="date"
                          value={rawReceivedBy}
                          onChange={(e) => setRawReceivedBy(e.target.value)}
                          disabled={
                            (loggedInSupervisor && rawCottonSupStatus) ||
                            (loggedInQa && rawCottonQaStatus) ||
                            loggedInHod ||
                            !loggedInSupervisor
                          }
                        />
                      </Form.Item>
                    </Form>
                  </td>
                </tr>
              </>
            )}
          </table>
        </Row>
      ),
    },
    {
      key: "3",
      label: "Chemical Issue & Consumption",
      children: (
        <Row>
          <table style={{ width: "100%" }}>
            <tr>
              <th colSpan="1">SI No</th>
              <th colSpan="1">Name of the Chemicals</th>
              <th colSpan="1">Chemical Batch No. </th>
              <th colSpan="1">Quanitity </th>
              <th colSpan="1">Units </th>
            </tr>
            {chemicalDetailsArray &&
              chemicalDetailsArray.map((x, i) => {
                return (
                  <tr>
                    <td
                      colSpan="1"
                      style={{ height: "50px", textAlign: "center" }}
                    >
                      {++i}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "50px", textAlign: "center" }}
                    >
                      {x.chemicalName}
                    </td>
                    <td colSpan="1" style={{ height: "50px" }} align="center">
                      {x.batchNo}
                    </td>
                    <td colSpan="1" style={{ height: "50px" }} align="center">
                      {" "}
                      {x.quantity}
                    </td>
                    <td
                      colSpan="1"
                      style={{ height: "50px", textAlign: "center" }}
                    >
                      {x.unit}
                    </td>
                  </tr>
                );
              })}

            <tr>
              <td colSpan="2" style={{ borderRight: "none", padding: "1em" }}>
                Issued by (Stores):
                <br />

                {chemicalDetailsArray.length > 0
                  ? chemicalDetailsArray[0].issuedBy
                  : ""}
                <br />
                {chemicalDate ? moment(chemicalDate).format("DD/MM/YYYY") : ""}
              </td>
              <td colSpan="3" style={{ borderLeft: "none", padding: "1em" }}>
                Received by (Production):
                <br />

                {chemicalDetailsArray.length > 0
                  ? chemicalDetailsArray[0].verifiedBy
                  : ""}
                <br />
                {chemicalDate ? moment(chemicalDate).format("DD/MM/YYYY") : ""}
              </td>
            </tr>
          </table>
        </Row>
      ),
    },
    {
      key: "4",
      label: "Packing Material Details",
      children: (
        <Row>
          <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <td
                colSpan="15"
                align="center"
                style={{
                  padding: "1em",
                }}
              >
                <b>Packing Material Details</b>
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                align="center"
                style={{
                  padding: "1em",
                }}
              >
                <b>Sl.No</b>
              </td>
              <td colSpan="3" align="center">
                <b>Name of Packing Material</b>
              </td>
              <td colSpan="3" align="center">
                <b>Batch No</b>
              </td>
              <td colSpan="3" align="center">
                <b>Quantity</b>
              </td>
              <td colSpan="3" align="center">
                <b>Unit</b>
              </td>
            </tr>
            {packingMaterialsArray &&
              packingMaterialsArray.map((x, i) => {
                return (
                  <tr>
                    <td
                      colSpan="3"
                      align="center"
                      style={{
                        padding: "1em",
                      }}
                    >
                      {++i}
                    </td>
                    <td colSpan="3" align="center">
                      {x.packingName}
                    </td>
                    <td colSpan="3" align="center">
                      {x.batchNo}
                    </td>
                    <td colSpan="3" align="center">
                      {x.quantity}
                    </td>
                    <td colSpan="3" align="center">
                      {x.unit}
                    </td>
                  </tr>
                );
              })}

            <tr>
              <td
                colSpan="8"
                style={{
                  padding: "1em",
                }}
              >
                Issued by (Stores):
                <br />

                {packingMaterialsArray.length > 0
                  ? packingMaterialsArray[0].issuedBy
                  : ""}
                <br />
                {moment(chemicalDate).format("DD/MM/YYYY")}
              </td>
              <td
                colSpan="7"
                style={{
                  padding: "1em",
                }}
              >
                Received by (Production):
                <br />

                {packingMaterialsArray.length > 0
                  ? packingMaterialsArray[0].verifiedBy
                  : ""}
                <br />
                {moment(chemicalDate).format("DD/MM/YYYY")}
              </td>
            </tr>
          </table>
        </Row>
      ),
    },
    {
      key: "5",
      label: "Reference Documents",
      children: (
        <Row>
          <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <th colSpan="1">SI. No.</th>
              <th colSpan="1">Title </th>
              <th colSpan="1">Document </th>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                1
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                Good Documentation Practices
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                PH-QAD01-D-10
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                2
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                Blowroom & Bleaching Operation
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                PH-PRD01-D-03
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                3
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                Cleaning Machine & Sanitization
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                PH-PRD01-D-04
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                4
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                Control of Non-Conforming
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                PH-QAD01-D-20
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                5
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                Out-Of-Specification
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                PH-QCL01-D-17
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                6
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                Deviation Management
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
                PH-QAD01-D-41
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.4em" }}>
                7
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.4em" }}>
                Change Control
              </td>
              <td colSpan="1" style={{ textAlign: "center", padding: "0.4em" }}>
                PH-QAD01-D-37
              </td>
            </tr>
          </table>
        </Row>
      ),
    },
    {
      key: "6",
      label: "Processing Equipments Calibration Status",
      children: (
        <div>
          <div>
            <p>Department: Blowroom & Bleaching</p>
            <p>Batch No: {bmr}</p>
          </div>
          <form>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form>
                <Form.Item label="Verified By">
                  {pecs_State == true ? (
                    <>
                      <b>
                        {pecsNewVerified} {pecsNewVerifiedDate}{" "}
                      </b>
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                      }}
                    >

                      <Select
                        options={verifiedByLov}
                        value={pecs_verified}
                        style={{ textAlign: "center", width: "300px" }}
                        onInputKeyDown={(e) => {
                          handleSelectText(e, "pecs_verified");
                        }}
                        onChange={(value) => {
                          handleInput(value, "pecs_verified");
                        }}
                        dropdownStyle={{ textAlign: "center" }}
                        showSearch
                        filterOption={false}
                        onKeyDown={(e) => {
                          handleSelectText(e, "pecs_verified");
                        }}
                        disabled={!loggedInSupervisor}
                      />
                      <Input
                        type="datetime-local"
                        value={newDate || localDateValue4}
                        onChange={(e) => setNewDate(e.target.value)}
                        disabled={!loggedInSupervisor}
                      />
                    </div>
                  )}
                </Form.Item>
              </Form>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  display: pecs_State || !loggedInSupervisor ? "none" : "block",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>

            <table
              style={{
                width: "100%",
              }}
            >
              <tr>
                <th align="center">Sl. No.</th>
                <th align="center">Name</th>
                <th align="center">Code</th>
                <th align="center">Start Date</th>
                <th align="center">End Date</th>
              </tr>

              {pecs_State == true ? (
                <>
                  {pecsStateArray &&
                    pecsStateArray.map((x, i) => (
                      <tr key={x.annexureId}>
                        <td align="center">{++i}</td>
                        <td align="center">{x.equipmentName}</td>
                        <td align="center">{x.equipmentCode}</td>
                        <td align="center">
                          {x.calibrationDate == "NA"
                            ? x.calibrationDate
                            : moment(x.calibrationDate).format("DD/MM/YYYY")}
                        </td>
                        <td align="center">
                          {x.dueDate == "NA"
                            ? x.dueDate
                            : moment(x.dueDate).format("DD/MM/YYYY")}
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <>
                  {machines.map((machine) => (
                    <tr key={machine.id}>
                      <td align="center">{machine.id}</td>
                      <td align="center">{machine.name}</td>
                      <td align="center">{machine.code}</td>
                      <td align="center">
                        <input
                          type={machine.startDate == "NA" ? "input" : "date"}

                          value={machine.startDate}
                          onChange={(event) =>
                            handleInputChange(event, machine.id, "startDate")
                          }
                          disabled={!loggedInSupervisor}
                          style={{
                            textAlign: "center",
                          }}
                          className="inp-new"
                        />
                      </td>
                      <td align="center">
                        <input
                          type={machine.endDate == "NA" ? "input" : "date"}
                          value={machine.endDate}
                          onChange={(event) =>
                            handleInputChange(event, machine.id, "endDate")
                          }
                          disabled={!loggedInSupervisor}
                          style={{
                            textAlign: "center",
                          }}
                          className="inp-new"
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </table>
          </form>

        </div>
      ),
    },
    {
      key: "7",
      label: "Verification Of Records",
      children: (
        <Row>
          {verificationStatus == true ? (
            <>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Name of the Record</b>
                  </td>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Performed By Sign & Date</b>
                  </td>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Verified By Sign & Date</b>
                  </td>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Status</b>
                  </td>
                </tr>
                {verificationArray &&
                  verificationArray.map((x, i) => {
                    return (
                      <tr>
                        <td
                          colSpan="3"
                          style={{ padding: "0.5em" }}
                          align="center"
                        >
                          <b>{x.recordName}</b>
                        </td>
                        <td
                          colSpan="3"
                          style={{ padding: "0.5em" }}
                          align="center"
                        >
                          <b>
                            {x.reviewedBy} <br />{" "}
                            {moment(x.date2).format("DD/MM/YYYY - HH:mm")}
                          </b>
                        </td>
                        <td
                          colSpan="3"
                          style={{ padding: "0.5em" }}
                          align="center"
                        >
                          <b>
                            {x.verifiedBy} <br />{" "}
                            {moment(x.date1).format("DD/MM/YYYY - HH:mm")}
                          </b>
                        </td>
                        <td
                          colSpan="3"
                          style={{ padding: "0.5em" }}
                          align="center"
                        >
                          <b>{x.status}</b>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      loggedInHod || supervisorOnlyVerification
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={saveVerificationRecords}
                  disabled={LoggedInQA_DESIGNEEandQA_MAN}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      !supervisorOnlyVerification || loggedInQa
                        ? "block"
                        : "none",
                  }}
                  shape="round"
                  onClick={submitVerificationRecords}
                  disabled={
                    (!supervisorOnlyVerification && loggedInQa) ||
                    LoggedInQA_DESIGNEEandQA_MAN ||
                    loggedInHod
                  }
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr
                  style={{
                    textAlign: "center",
                  }}
                >
                  <td
                    colSpan="12"
                    style={{
                      padding: "0.5em",
                    }}
                  >
                    <b>Verification Of Records</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Name of the Record</b>
                  </td>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Performed By Sign & Date</b>
                  </td>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Verified By Sign & Date</b>
                  </td>
                  <td colSpan="3" style={{ padding: "0.5em" }} align="center">
                    <b>Status</b>
                  </td>
                </tr>
                {/* first */}
                <tr>
                  <td colSpan="3" style={{ padding: "0.5em" }}>
                    <b>Housekeeping Cleaning Records</b>
                  </td>
                  <td colSpan="3">
                    <Select
                      options={prodLov}
                      onChange={newPerformedByChange1}
                      value={performedbySign.housekeeping || usernameSupervisor}
                      style={{
                        width: "12em",
                      }}
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                    />
                    <input
                      value={performedbyDate.housekeeping}
                      onChange={(e) =>
                        updatePerformedByDate({ housekeeping: e.target.value })
                      }
                      type="datetime-local"
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Select
                      options={qaLov}
                      onChange={newVerifiedByChange1}
                      value={verifiedbySign.housekeeping || username}
                      style={{
                        width: "12em",
                      }}
                      disabled={!loggedInQa}
                    />
                    <input
                      value={verifiedbyDate.housekeeping || localDateValue}
                      onChange={(e) =>
                        updateVerifiedByDate({ housekeeping: e.target.value })
                      }
                      disabled={!loggedInQa}
                      type="datetime-local"
                    />
                  </td>
                  <td colSpan="3">
                    <Radio.Group
                      onChange={(e) =>
                        updateStateObject({ housekeeping: e.target.value })
                      }
                      disabled={!loggedInQa}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      value={vorStateObject.housekeeping}
                    >
                      <Radio value="TICK">Satisfactory</Radio>
                      <Radio value="CROSS">Not Satisfactory</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {/* second */}
                <tr>
                  <td colSpan="3" style={{ padding: "0.5em" }}>
                    <b>Machine Cleaning Records</b>
                  </td>
                  <td colSpan="3">
                    <Select
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      options={prodLov}
                      onChange={newPerformedByChange2}
                      value={
                        performedbySign.machineCleaning || usernameSupervisor
                      }
                      style={{
                        width: "12em",
                      }}
                    />
                    <input
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      type="datetime-local"
                      value={performedbyDate.machineCleaning}
                      onChange={(e) =>
                        updatePerformedByDate({
                          machineCleaning: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Select
                      disabled={!loggedInQa}
                      options={qaLov}
                      onChange={newVerifiedByChange2}
                      value={verifiedbySign.machineCleaning || username}
                      style={{
                        width: "12em",
                      }}
                    />
                    <input
                      disabled={!loggedInQa}
                      value={verifiedbyDate.machineCleaning || localDateValue}
                      onChange={(e) =>
                        updateVerifiedByDate({
                          machineCleaning: e.target.value,
                        })
                      }
                      type="datetime-local"
                    />
                  </td>
                  <td colSpan="3">
                    <Radio.Group
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      disabled={!loggedInQa}
                      onChange={(e) =>
                        updateStateObject({ machineCleaning: e.target.value })
                      }
                      value={vorStateObject.machineCleaning}
                    >
                      <Radio value="TICK">Satisfactory</Radio>
                      <Radio value="CROSS">Not Satisfactory</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {/* third */}
                <tr>
                  <td colSpan="3" style={{ padding: "0.5em" }}>
                    <b>Logbook (Supervisor Shift Handover)</b>
                  </td>
                  <td colSpan="3">
                    <Select
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      options={prodLov}
                      onChange={newPerformedByChange3}
                      value={performedbySign.logbook || usernameSupervisor}
                      style={{
                        width: "12em",
                      }}
                    />
                    <input
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      type="datetime-local"
                      value={performedbyDate.logbook}
                      onChange={(e) =>
                        updatePerformedByDate({ logbook: e.target.value })
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Select
                      disabled={!loggedInQa}
                      options={qaLov}
                      onChange={newVerifiedByChange3}
                      style={{
                        width: "12em",
                      }}
                      value={verifiedbySign.logbook || username}
                    />
                    <input
                      disabled={!loggedInQa}
                      type="datetime-local"
                      value={verifiedbyDate.logbook || localDateValue}
                      onChange={(e) =>
                        updateVerifiedByDate({ logbook: e.target.value })
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Radio.Group
                      onChange={(e) =>
                        updateStateObject({ logbook: e.target.value })
                      }
                      value={vorStateObject.logbook}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      disabled={!loggedInQa}
                    >
                      <Radio value="TICK">Satisfactory</Radio>
                      <Radio value="CROSS">Not Satisfactory</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {/* fourth */}
                <tr>
                  <td colSpan="3" style={{ padding: "0.5em" }}>
                    <b>Production Records</b>
                  </td>
                  <td colSpan="3">
                    <Select
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      options={prodLov}
                      onChange={newPerformedByChange4}
                      value={
                        performedbySign.productionRecord || usernameSupervisor
                      }
                      style={{
                        width: "12em",
                      }}
                    />
                    <input
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      type="datetime-local"
                      value={performedbyDate.productionRecord}
                      onChange={(e) =>
                        updatePerformedByDate({
                          productionRecord: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      onChange={newVerifiedByChange4}
                      disabled={!loggedInQa}
                      value={verifiedbySign.productionRecord || username}
                    />
                    <input
                      type="datetime-local"
                      value={verifiedbyDate.productionRecord || localDateValue}
                      disabled={!loggedInQa}
                      onChange={(e) =>
                        updateVerifiedByDate({
                          productionRecord: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Radio.Group
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      disabled={!loggedInQa}
                      onChange={(e) =>
                        updateStateObject({ productionRecord: e.target.value })
                      }
                      value={vorStateObject.productionRecord}
                    >
                      <Radio value="TICK">Satisfactory</Radio>
                      <Radio value="CROSS">Not Satisfactory</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {/* fifth */}
                <tr>
                  <td colSpan="3" style={{ padding: "0.5em" }}>
                    <b>Machine Sanitizer</b>
                  </td>
                  <td colSpan="3">
                    <Select
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      options={prodLov}
                      onChange={newPerformedByChange5}
                      value={
                        performedbySign.machineSanitizer || usernameSupervisor
                      }
                      style={{
                        width: "12em",
                      }}
                    />
                    <input
                      disabled={
                        !loggedInSupervisor || supervisorOnlyVerification
                      }
                      type="datetime-local"
                      value={performedbyDate.machineSanitizer}
                      onChange={(e) =>
                        updatePerformedByDate({
                          machineSanitizer: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      onChange={newVerifiedByChange5}
                      value={verifiedbySign.machineSanitizer || username}
                      disabled={!loggedInQa}
                    />
                    <input
                      type="datetime-local"
                      value={verifiedbyDate.machineSanitizer || localDateValue}
                      onChange={(e) =>
                        updateVerifiedByDate({
                          machineSanitizer: e.target.value,
                        })
                      }
                      disabled={!loggedInQa}
                    />
                  </td>
                  <td colSpan="3">
                    <Radio.Group
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onChange={(e) =>
                        updateStateObject({ machineSanitizer: e.target.value })
                      }
                      value={vorStateObject.machineSanitizer}
                      disabled={!loggedInQa}
                    >
                      <Radio value="TICK">Satisfactory</Radio>
                      <Radio value="CROSS">Not Satisfactory</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "8",
      label: "Manufacturing Steps",
      children: (
        <Row>
          {manufacturingStepsStatus == true ? (
            <>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <th colSpan="1">Step No</th>
                  <th colSpan="1">Operation</th>
                  <th colSpan="2">Observation</th>
                  <th colSpan="1">Performed by (Sign & Date) </th>
                  <th colSpan="1">Checked by(Sign & Date) </th>
                </tr>
                {manufacturingStepsArray.map((x, i) => (
                  <tr>
                    <td colSpan="1" align="center" style={{ padding: "0.9em" }}>
                      {i + 1}
                    </td>
                    <td colSpan="1" align="center" style={{ padding: "0.9em" }}>
                      {manufacturingObservatioArray[i]}
                    </td>
                    <td colSpan="2" align="center" style={{ padding: "0.9em" }}>
                      {x.observation1}
                    </td>
                    <td colSpan="1" align="center" style={{ padding: "0.9em" }}>
                      {x.observation1 !== "NA" ? x.performBy : "NA"} <br />{" "}
                      {x.observation1 !== "NA"
                        ? moment(x.date1).format("DD/MM/YYYY - HH:mm")
                        : ""}
                    </td>
                    <td colSpan="1" align="center" style={{ padding: "0.9em" }}>
                      {x.observation1 !== "NA" ? x.cleanedBy : "NA"} <br />{" "}
                      {x.observation1 !== "NA"
                        ? moment(x.date2).format("DD/MM/YYYY - HH:mm")
                        : ""}
                    </td>
                  </tr>
                ))}
              </table>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: loggedInHod || supervisorOnlyMs ? "none" : "block",
                  }}
                  shape="round"
                  onClick={SaveManufacturingSteps}
                  disabled={LoggedInQA_DESIGNEEandQA_MAN}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: !supervisorOnlyMs || loggedInQa ? "block" : "none",
                  }}
                  disabled={
                    (!supervisorOnlyMs && loggedInQa) ||
                    loggedInHod ||
                    LoggedInQA_DESIGNEEandQA_MAN
                  }
                  shape="round"
                  onClick={SubmitManufacturingSteps}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <th colSpan="1">Step No</th>
                  <th colSpan="1">Operation</th>
                  <th colSpan="2">Observation</th>
                  <th colSpan="1">Performed by (Sign & Date) </th>
                  <th colSpan="1">Checked by(Sign & Date) </th>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    1
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Switch “ON” all the machines & Sub machines:Blendomat, Metal
                    Detector, Fire Detector, CL-P, SPH, MPM, Applied, ERM, XPI,
                    Dustex, Cake press, Kier, Hydro Extractor, Cake opener,
                    Dryer, Rieter, Applied, Metal Detector, Fire Detector Bale
                    Press & Weighing scale.{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          SwitchOn: e.target.value,
                        })
                      }
                      value={manufacturingSteps.SwitchOn}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="READY">Ready</Radio>
                      <Radio value="NOT READY">Not Ready</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.one ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign1}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.SwitchOn === "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.one}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          one: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.SwitchOn === "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.one || username}
                      onChange={manufacturingStepsVerifiedBySign1}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.one || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          one: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>
                <tr></tr>
                <td colSpan="6" style={{ padding: "0.5em" }}>
                  Stage: BLOW ROOM{" "}
                </td>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    2
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Raw Material Preparation: Checkthe lay down area for
                    Cleanliness and verify the arrangement of the bales for the
                    readiness of process in Blendomat area.
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BlowroomRawMaterial: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BlowroomRawMaterial}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="READY">Ready</Radio>
                      <Radio value="NOT READY">Not Ready</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.two ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign2}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomRawMaterial == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.two}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          two: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomRawMaterial == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.two || username}
                      onChange={manufacturingStepsVerifiedBySign2}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.two || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          two: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>

                <tr></tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    3
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Select the working area for the Blendomat (WA1 or WA2)
                    depending on the location of the bales to be processed.{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BlowroomWorkingArea: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BlowroomWorkingArea}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="WA1">WA1</Radio>
                      <Radio value="WA2">WA2</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.three ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign3}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomWorkingArea == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.three}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          three: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomWorkingArea == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.three || username}
                      onChange={manufacturingStepsVerifiedBySign3}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.three || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          three: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>

                <tr></tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    4
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Refer 9.0 MACHINE OPERATION PARAMETERS.{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BlowroomReferMachine: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BlowroomReferMachine}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="COMPLETED">Completed</Radio>
                      <Radio value="NOT COMPLETED">Not Completed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.four ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign4}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomReferMachine == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.four}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          four: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomReferMachine == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.four || username}
                      onChange={manufacturingStepsVerifiedBySign4}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.four || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          four: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>

                <tr></tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    5
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Verify the carding process machine is ON/OFF Note: It should
                    be “ON” when virgin cotton process requirement.{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BlowroomCardingProcess: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BlowroomCardingProcess}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="ON">ON</Radio>
                      <Radio value="OFF">OFF</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.five ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign5}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomCardingProcess == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.five}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          five: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BlowroomCardingProcess == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.five || username}
                      onChange={manufacturingStepsVerifiedBySign5}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.five || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          five: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>

                <tr></tr>
                <td colSpan="6" style={{ padding: "0.5em" }}>
                  {" "}
                  Stage: BLEACHING
                </td>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    6
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Cake Pressing Process: Refer 9.0 MACHINE OPERATION
                    PARAMETERS{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BleachingCakePressing: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BleachingCakePressing}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="COMPLETED">Completed</Radio>
                      <Radio value="NOT COMPLETED">Not Completed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.six ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign6}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingCakePressing == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.six}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          six: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingCakePressing == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.six || username}
                      onChange={manufacturingStepsVerifiedBySign6}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.six || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          six: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>

                <tr></tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    7
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    KIER (Bleaching): Set the Machine Parameter as per the Check
                    List (Bleaching job card Format# PRD01/F-13.){" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BleachingKier: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BleachingKier}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="COMPLETED">Completed</Radio>
                      <Radio value="NOT COMPLETED">Not Completed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.seven ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign7}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingKier == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.seven}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          seven: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingKier == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.seven || username}
                      onChange={manufacturingStepsVerifiedBySign7}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.seven || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          seven: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>

                <tr></tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    8
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Hydro Extraction Process: Refer 9.0 MACHINE OPERATION
                    PARAMETERS{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BleachingHydro: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BleachingHydro}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="COMPLETED">Completed</Radio>
                      <Radio value="NOT COMPLETED">Not Completed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.eight ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign8}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingHydro == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.eight}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          eight: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingHydro == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.eight || username}
                      onChange={manufacturingStepsVerifiedBySign8}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.eight || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          eight: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>

                <tr></tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    9
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    Process of Cake opener, Dryer, Rieter/Fine Opener & Bale
                    Press machines. Refer 9.0 MACHINE OPERATION PARAMETERS{" "}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Radio.Group
                      onChange={(e) =>
                        updateManufacturingStepsObject({
                          BleachingProcessCakeOpener: e.target.value,
                        })
                      }
                      value={manufacturingSteps.BleachingProcessCakeOpener}
                      disabled={
                        loggedInHod ||
                        supervisorOnlyMs ||
                        loggedInQa ||
                        LoggedInQA_DESIGNEEandQA_MAN
                      }
                    >
                      <Radio value="COMPLETED">Completed</Radio>
                      <Radio value="NOT COMPLETED">Not Completed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>{" "}
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={prodLov}
                      value={
                        manufacturingStepsPerformedbysign.nine ||
                        usernameSupervisor
                      }
                      onChange={manufacturingStepsPerformedBySign9}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingProcessCakeOpener == "NA"
                      }
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={manufacturingStepsPerformedbydate.nine}
                      onChange={(e) => {
                        updateManufacturingStepsPerformedByDate({
                          nine: e.target.value,
                        });
                      }}
                      disabled={
                        !loggedInSupervisor ||
                        supervisorOnlyMs ||
                        manufacturingSteps.BleachingProcessCakeOpener == "NA"
                      }
                    />
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "0.9em" }}
                  >
                    <Select
                      style={{
                        width: "12em",
                      }}
                      options={qaLov}
                      value={manufacturingStepsVerifiedbysign.nine || username}
                      onChange={manufacturingStepsVerifiedBySign9}
                      disabled={!loggedInQa}
                    />
                    <Input
                      style={{
                        width: "12em",
                      }}
                      type="datetime-local"
                      value={
                        manufacturingStepsVerifiedbydate.nine || localDateValue
                      }
                      onChange={(e) => {
                        updateManufacturingStepsVerifiedByDate({
                          nine: e.target.value,
                        });
                      }}
                      disabled={!loggedInQa}
                    />
                  </td>
                </tr>
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "9",
      label: "Machine Operation Parameters",
      children: (
        <Row>
          {manufacturingParameterStatus == true ? (
            <>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    SI.No
                  </td>
                  <td colSpan="3" align="center">
                    Description
                  </td>
                  <td align="center" colSpan="3">
                    Standard In Range
                  </td>
                  <td align="center" colSpan="3">
                    Observation
                  </td>
                </tr>
                {manufacturingParametersArray &&
                  manufacturingParametersArray.map((x, i) => {
                    return (
                      <tr>
                        <td
                          colSpan="3"
                          style={{
                            padding: "1em",
                          }}
                          align="center"
                        >
                          {i + 1}
                        </td>
                        <td colSpan="3" align="center">
                          {machineOps[i]}
                        </td>
                        <td align="center" colSpan="3">
                          {x.stdRange}
                        </td>
                        {i == 3 || i == 4 || i == 17 || i == 18 || i == 8 ? (
                          <td
                            align="center"
                            colSpan="3"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                              borderLeft: "none",
                              borderTop: "none",
                              borderBottom:
                                i == 17 || i == 18 ? "1px solid" : "none",
                              borderRight: "1px solid",
                              height: "100%",
                              padding: "1em",
                            }}
                          >
                            <b>{x.observation1}</b>
                            <b>{x.observation2}</b>
                          </td>
                        ) : (
                          <td align="center" colSpan="3">
                            {x.observation1}
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </table>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      loggedInHod || supervisorOnlyMop || loggedInQa
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={saveMachineOpsParams}
                  disabled={LoggedInQA_DESIGNEEandQA_MAN}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      !supervisorOnlyMop || loggedInQa ? "block" : "none",
                  }}
                  disabled={
                    (!supervisorOnlyMop && loggedInQa) ||
                    loggedInHod ||
                    LoggedInQA_DESIGNEEandQA_MAN
                  }
                  shape="round"
                  onClick={submitMachineOpsParams}
                >
                  Submit
                </Button>
              </div>
              <table style={{ width: "100%" }}>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    SI.No
                  </td>
                  <td colSpan="3" align="center">
                    Description
                  </td>
                  <td align="center" colSpan="3">
                    Standard In Range
                  </td>
                  <td align="center" colSpan="3">
                    Observation
                  </td>
                </tr>
                {/* one */}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    1
                  </td>
                  <td colSpan="3" align="center">
                    Advance setting in Blendomat in mm
                  </td>
                  <td colSpan="3" align="center">
                    3.0 - 9.0
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) => setMOP_ASB_Observation(e.target.value)}
                      value={MOP_ASB_Observation}
                      onBlur={() => {
                        if (
                          MOP_ASB_Observation < 3.0 ||
                          MOP_ASB_Observation > 9.0
                        ) {
                          message.error("Please Choose Between 3.0 and 9.0");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                {/* two */}
                <tr>
                  <td
                    align="center"
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                  >
                    2
                  </td>
                  <td colSpan="3" align="center">
                    Fire Divertor switched ON/OFF
                  </td>
                  <td colSpan="3" align="center">
                    ON
                  </td>
                  <td colSpan="3" align="center">
                    <Radio.Group
                      onChange={(e) => setMOP_FDS_Observation(e.target.value)}
                      value={MOP_FDS_Observation}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                      disabled={
                        !loggedInSupervisor || supervisorOnlyMop || loggedInQa
                      }
                    >
                      <Radio value="ON">ON</Radio>
                      <Radio value="OFF">OFF</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {/* three */}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    3
                  </td>
                  <td colSpan="3" align="center">
                    Metal Detector switched ON/OFF
                  </td>
                  <td colSpan="3" align="center">
                    ON
                  </td>
                  <td colSpan="3" align="center">
                    <Radio.Group
                      onChange={(e) => setMOP_MDS_Observation(e.target.value)}
                      value={MOP_MDS_Observation}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                      disabled={
                        !loggedInSupervisor || supervisorOnlyMop || loggedInQa
                      }
                    >
                      <Radio value="ON">ON</Radio>
                      <Radio value="OFF">OFF</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {/* four */}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    4
                  </td>
                  <td colSpan="3" align="center">
                    CL-P Grid bar setting
                  </td>
                  <td colSpan="3" align="center">
                    0.0 - 2.0
                  </td>
                  <td colSpan="3" align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <label
                        style={{
                          textAlign: "center",
                          marginBottom: "1em",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 01
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_GLP_Line1_Observation(e.target.value)
                          }
                          value={MOP_GLP_Line1_Observation}
                          onBlur={() => {
                            if (
                              MOP_GLP_Line1_Observation < 0.0 ||
                              MOP_GLP_Line1_Observation > 2.0
                            ) {
                              message.error(
                                "Please Choose Between 0.0 and 2.0"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>

                      <label
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 02
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_GLP_Line2_Observation(e.target.value)
                          }
                          value={MOP_GLP_Line2_Observation}
                          onBlur={() => {
                            if (
                              MOP_GLP_Line2_Observation < 0.0 ||
                              MOP_GLP_Line2_Observation > 2.0
                            ) {
                              message.error(
                                "Please Choose Between 0.0 and 2.0"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                {/* five */}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    5
                  </td>
                  <td colSpan="3" align="center">
                    ERM grid bar setting
                  </td>
                  <td colSpan="3" align="center">
                    2.0 - 4.0
                  </td>
                  <td colSpan="3" align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <label
                        style={{
                          textAlign: "center",
                          marginBottom: "1em",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 01
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_ERM_Line1_Observation(e.target.value)
                          }
                          value={MOP_ERM_Line1_Observation}
                          onBlur={() => {
                            if (
                              MOP_ERM_Line1_Observation < 2.0 ||
                              MOP_ERM_Line1_Observation > 4.0
                            ) {
                              message.error(
                                "Please Choose Between 2.0 and 4.0"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>

                      <label
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 02
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_ERM_Line2_Observation(e.target.value)
                          }
                          value={MOP_ERM_Line2_Observation}
                          onBlur={() => {
                            if (
                              MOP_ERM_Line2_Observation < 2.0 ||
                              MOP_ERM_Line2_Observation > 4.0
                            ) {
                              message.error(
                                "Please Choose Between 2.0 and 4.0"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>
                    </div>

                  </td>
                </tr>
                {/* six */}
                <tr>
                  <td
                    align="center"
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                  >
                    6
                  </td>
                  <td colSpan="3" align="center">
                    Cake Press - Hydraulic pressure in Bar
                  </td>
                  <td colSpan="3" align="center">
                    100 - 112
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) => setMOP_CPHP_Observation(e.target.value)}
                      value={MOP_CPHP_Observation}
                      onBlur={() => {
                        if (
                          MOP_CPHP_Observation < 100 ||
                          MOP_CPHP_Observation > 112
                        ) {
                          message.error("Please Choose Between 100 and 112");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                {/* seven */}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    7
                  </td>
                  <td colSpan="3" align="center">
                    Cake Press - Spray water temperature in ℃
                  </td>
                  <td colSpan="3" align="center">
                    30 - 60
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) => setMOP_CPSWT_Observation(e.target.value)}
                      value={MOP_CPSWT_Observation}
                      onBlur={() => {
                        if (
                          MOP_CPSWT_Observation < 30 ||
                          MOP_CPSWT_Observation > 60
                        ) {
                          message.error("Please Choose Between 30 and 60");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                {/* eight */}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    8
                  </td>
                  <td colSpan="3" align="center">
                    Hydro extractor timer setting (Analog)
                  </td>
                  <td colSpan="3" align="center">
                    0.3 - 0.7
                  </td>
                  <td colSpan="3" align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <label
                        style={{
                          textAlign: "center",
                          marginBottom: "1em",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Hydro-01
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_HET_Line1_Observation(e.target.value)
                          }
                          value={MOP_HET_Line1_Observation}
                          onBlur={() => {
                            if (
                              MOP_HET_Line1_Observation < 0.3 ||
                              MOP_HET_Line1_Observation > 0.7
                            ) {
                              message.error(
                                "Please Choose Between 0.3 and 0.7"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>

                      <label
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Hydro-02
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_HET_Line2_Observation(e.target.value)
                          }
                          value={MOP_HET_Line2_Observation}
                          onBlur={() => {
                            if (
                              MOP_HET_Line2_Observation < 0.3 ||
                              MOP_HET_Line2_Observation > 0.7
                            ) {
                              message.error(
                                "Please Choose Between 0.3 and 0.7"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                {/* nine */}
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="5"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    9
                  </td>
                  <td
                    colSpan="9"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Cake Opener Setting
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                  >
                    Spike Lattice Speed in %
                  </td>
                  <td colSpan="3" align="center">
                    50 - 100
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) =>
                        setMOP_COS_SLS_Observation(e.target.value)
                      }
                      value={MOP_COS_SLS_Observation}
                      onBlur={() => {
                        if (
                          MOP_COS_SLS_Observation < 50 ||
                          MOP_COS_SLS_Observation > 100
                        ) {
                          message.error("Please Choose Between 50 and 100");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Stripper lattice Speed in %
                  </td>
                  <td colSpan="3" align="center">
                    50 - 100
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) =>
                        setMOP_COS_Stripper_Observation(e.target.value)
                      }
                      value={MOP_COS_Stripper_Observation}
                      onBlur={() => {
                        if (
                          MOP_COS_Stripper_Observation < 50 ||
                          MOP_COS_Stripper_Observation > 100
                        ) {
                          message.error("Please Choose Between 50 and 100");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Feed Roller Speed in %
                  </td>
                  <td colSpan="3" align="center">
                    50 - 100
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) =>
                        setMOP_COS_FRS_Observation(e.target.value)
                      }
                      value={MOP_COS_FRS_Observation}
                      onBlur={() => {
                        if (
                          MOP_COS_FRS_Observation < 50 ||
                          MOP_COS_FRS_Observation > 100
                        ) {
                          message.error("Please Choose Between 50 and 100");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Opening Cylinder Speed in %
                  </td>
                  <td colSpan="3" align="center">
                    40 - 65
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) =>
                        setMOP_COS_OCS_Observation(e.target.value)
                      }
                      value={MOP_COS_OCS_Observation}
                      onBlur={() => {
                        if (
                          MOP_COS_OCS_Observation < 40 ||
                          MOP_COS_OCS_Observation > 65
                        ) {
                          message.error("Please Choose Between 40 and 65");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                {/* ten */}
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="4"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    10
                  </td>
                  <td
                    align="center"
                    colSpan="9"
                    style={{
                      padding: "1em",
                    }}
                  >
                    Dryer Setting
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                  >
                    Inlet Main Steam Pressure in Bar
                  </td>
                  <td colSpan="3" align="center">
                    2.0 - 4.0
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) =>
                        setMOP_DS_IMSP_Observation(e.target.value)
                      }
                      value={MOP_DS_IMSP_Observation}
                      onBlur={() => {
                        if (
                          MOP_DS_IMSP_Observation < 2.0 ||
                          MOP_DS_IMSP_Observation > 4.0
                        ) {
                          message.error("Please Choose Between 2.0 and 4.0");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Conveyor Speed in MPM
                  </td>
                  <td colSpan="3" align="center">
                    11.0 - 12.0
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) => setMOP_DS_CS_Observation(e.target.value)}
                      value={MOP_DS_CS_Observation}
                      onBlur={() => {
                        if (
                          MOP_DS_CS_Observation < 11.0 ||
                          MOP_DS_CS_Observation > 12.0
                        ) {
                          message.error("Please Choose Between 11.0 and 12.0");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Streat Moisture value in %
                  </td>
                  <td colSpan="3" align="center">
                    5.0 - 8.0
                  </td>
                  <td colSpan="3" align="center">
                    <input
                      className="inp-new"
                      type="number"
                      onChange={(e) =>
                        setMOP_DS_SMV_Observation(e.target.value)
                      }
                      value={MOP_DS_SMV_Observation}
                      onBlur={() => {
                        if (
                          MOP_DS_SMV_Observation < 5.0 ||
                          MOP_DS_SMV_Observation > 8.0
                        ) {
                          message.error("Please Choose Between 5.0 and 8.0");
                        }
                      }}
                      disabled={!loggedInSupervisor || supervisorOnlyMop}
                    />
                  </td>
                </tr>
                {/* eleven */}
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="3"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    11
                  </td>
                  <td
                    colSpan="9"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Fiber Opener (Rieter) Setting
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                  >
                    Feed Roller Speed in RPM
                  </td>
                  <td colSpan="3" align="center">
                    2.0 - 6.0
                  </td>
                  <td colSpan="3" align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <label
                        style={{
                          textAlign: "center",
                          marginBottom: "1em",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 01
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_FOS_FRS_Line1_Observation(e.target.value)
                          }
                          value={MOP_FOS_FRS_Line1_Observation}
                          onBlur={() => {
                            if (
                              MOP_FOS_FRS_Line1_Observation < 2.0 ||
                              MOP_FOS_FRS_Line1_Observation > 6.0
                            ) {
                              message.error(
                                "Please Choose Between 2.0 and 6.0"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>

                      <label
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 02
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_FOS_FRS_Line2_Observation(e.target.value)
                          }
                          value={MOP_FOS_FRS_Line2_Observation}
                          onBlur={() => {
                            if (
                              MOP_FOS_FRS_Line2_Observation < 2.0 ||
                              MOP_FOS_FRS_Line2_Observation > 6.0
                            ) {
                              message.error(
                                "Please Choose Between 2.0 and 6.0"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                  >
                    Beater Roller Speed in RPM
                  </td>
                  <td colSpan="3" align="center">
                    400 - 800
                  </td>
                  <td colSpan="3" align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <label
                        style={{
                          textAlign: "center",
                          marginBottom: "1em",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 01
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_FOS_BRS_Line1_Observation(e.target.value)
                          }
                          value={MOP_FOS_BRS_Line1_Observation}
                          onBlur={() => {
                            if (
                              MOP_FOS_BRS_Line1_Observation < 400 ||
                              MOP_FOS_BRS_Line1_Observation > 800
                            ) {
                              message.error(
                                "Please Choose Between 400 and 800"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>

                      <label
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 02
                        </p>
                        <input
                          className="inp-new"
                          type="number"
                          onChange={(e) =>
                            setMOP_FOS_BRS_Line2_Observation(e.target.value)
                          }
                          value={MOP_FOS_BRS_Line2_Observation}
                          onBlur={() => {
                            if (
                              MOP_FOS_BRS_Line2_Observation < 400 ||
                              MOP_FOS_BRS_Line2_Observation > 800
                            ) {
                              message.error(
                                "Please Choose Between 400 and 800"
                              );
                            }
                          }}
                          disabled={!loggedInSupervisor || supervisorOnlyMop}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                {/* twelve */}
                <tr>
                  <td
                    colSpan="3"
                    rowspan="2"
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    12
                  </td>
                  <td
                    align="center"
                    colSpan="9"
                    style={{
                      padding: "1em",
                    }}
                  >
                    Applied Setting
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    colSpan="3"
                    style={{
                      padding: "1em",
                    }}
                  >
                    Refer SOP No. PRD01-D-09
                  </td>
                  <td colSpan="3" align="center">
                    VSTRICT
                  </td>
                  <td colSpan="3" align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <label
                        style={{
                          textAlign: "center",
                          marginBottom: "1em",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 01
                        </p>
                        <Radio.Group
                          onChange={(e) =>
                            setMOP_AS_ReferSOP_Line1_Observation(e.target.value)
                          }
                          value={MOP_AS_ReferSOP_Line1_Observation}
                          disabled={
                            !loggedInSupervisor ||
                            supervisorOnlyMop ||
                            loggedInQa
                          }
                        >
                          <Radio value="STRICT">STRICT</Radio>
                          <Radio value="VSTRICT">VSTRICT</Radio>
                        </Radio.Group>
                      </label>

                      <label
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "1em",
                          }}
                        >
                          Line 02
                        </p>
                        <Radio.Group
                          onChange={(e) =>
                            setMOP_AS_ReferSOP_Line2_Observation(e.target.value)
                          }
                          value={MOP_AS_ReferSOP_Line2_Observation}
                          disabled={
                            !loggedInSupervisor ||
                            supervisorOnlyMop ||
                            loggedInQa
                          }
                        >
                          <Radio value="STRICT">STRICT</Radio>
                          <Radio value="VSTRICT">VSTRICT</Radio>
                        </Radio.Group>
                      </label>
                    </div>
                  </td>
                </tr>
                {/* thirteen */}
              </table>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Performed By
                    <br />
                    <Select
                      options={prodLov}
                      onChange={maachineOpsPerformedOnchange}
                      value={machineOpsPerformedBy || usernameSupervisor}
                      style={{
                        width: "100%",
                      }}
                      disabled={!loggedInSupervisor}
                    />
                    <Input
                      value={machineOpsPerformedByDate}
                      onChange={(e) =>
                        setMachineOpsPerformedByDate(e.target.value)
                      }
                      type="datetime-local"
                      disabled={!loggedInSupervisor}
                    />
                  </td>
                  <td align="center">
                    Checked By
                    <br />
                    <Select
                      options={qaLov}
                      onChange={maachineOpsCheckedOnchange}
                      value={machineOpsCheckedBy || username}
                      style={{
                        width: "100%",
                      }}
                      disabled={!loggedInQa}
                    />
                    <Input
                      value={machineOpsCheckedByDate || localDateValue}
                      onChange={(e) =>
                        setMachineOpsCheckedByDate(e.target.value)
                      }
                      disabled={!loggedInQa}
                      type="datetime-local"
                    />
                  </td>
                </tr>
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "10",
      label: "Production Reconciliation",
      children: (
        <Row>
          <table
            style={{
              width: "100%",
            }}
          >
            <th colSpan="6">
              PRODUCT RECONCILIATION: <br></br>
              Yield in % = (Output Qty / Input Qty) x 100{" "}
            </th>
            <tr>
              <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
                Input Quantity (Kgs){" "}
              </td>
              <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
                <input
                  value={productionReconillationObject.inputQty}
                  disabled
                  className="inp-new"
                />
              </td>
              <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
                {" "}
                Out Put Quantity (Kgs){" "}
              </td>
              <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
                <input
                  value={productionReconillationObject.outPutQty}
                  disabled
                  className="inp-new"
                />
              </td>
              <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
                % of Yield Specification: CN- 85% to 95%; Virgin-70% to 90%{" "}
              </td>
              <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
                <input
                  disabled
                  value={productionReconillationObject.YieldSpecification}
                  className="inp-new"
                />
              </td>
            </tr>
          </table>
        </Row>
      ),
    },
    {
      key: "11",
      label: "Process Delay / Equipment",
      children: (
        <Row>
          {stoppageDetailsStatus == true ? (
            <>
              <table style={{ padding: "100px", width: "100%" }}>
                <th colSpan="8">
                  {" "}
                  PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD
                </th>
                <tr>
                  <th colSpan="1" rowSpan="2">
                    S.No
                  </th>
                  <th colSpan="1" rowSpan="2">
                    Date
                  </th>
                  <th colSpan="1" rowSpan="2">
                    Machine Name
                  </th>
                  <th colSpan="3">Process Delay / Down Time </th>
                  <th colSpan="1" rowSpan="2">
                    Reasons
                  </th>
                  <th colSpan="1" rowSpan="2">
                    Remarks
                  </th>
                  <th colSpan="1" rowSpan="2">
                    Sign and Date
                  </th>
                </tr>
                <tr>
                  <th colSpan="1">From (hours: Minutes) </th>
                  <th colSpan="1">To (hours: Minutes) </th>
                  <th colSpan="1">Total (hours: Minutes) </th>
                </tr>
                {stoppageDetailsStore &&
                  stoppageDetailsStore.map((x, i) => {

                    console.log("packDt x.packDt", x.packDt)
                    return (
                      <tr>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {++i}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {moment(x.date).format("DD/MM/YYYY")}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.machine}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.from_hour}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.to_hour}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.total_hour}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.reason}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.remarks}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.sign} <br />{" "}
                          {moment(x.sign_date).format("DD/MM/YYYY - HH:mm")}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5em",
                  alignItems: "center",
                }}
              >
                <Form
                  layout="vertical"
                  style={{
                    display: "flex",
                  }}
                >
                  <Form.Item
                    label="From Date"
                    style={{
                      marginRight: "1em",
                    }}
                  >

                    {pd_ManufacturingStartDate}
                  </Form.Item>
                  <Form.Item label="To Date">

                    {pd_ManufacturingCompletionDate}
                  </Form.Item>
                </Form>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#E5EEF9",
                      color: "#00308F",
                      fontWeight: "bold",
                      display: !loggedInSupervisor ? "none" : "block",
                    }}
                    onClick={pdeSave}
                    disabled={LoggedInQA_DESIGNEEandQA_MAN}
                    shape="round"
                  >
                    Save
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#E5EEF9",
                      color: "#00308F",
                      fontWeight: "bold",
                      display: !loggedInSupervisor ? "none" : "block",
                    }}
                    onClick={pdeSubmit}
                    disabled={LoggedInQA_DESIGNEEandQA_MAN}
                    shape="round"
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <table style={{ padding: "100px", width: "100%" }}>
                <th colSpan="8">
                  {" "}
                  PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD
                </th>
                <tr>
                  <th colSpan="1" rowSpan="2">
                    Check
                  </th>
                  <th colSpan="1" rowSpan="2">
                    S.No
                  </th>
                  <th colSpan="1" rowSpan="2">
                    Date
                  </th>
                  <th colSpan="3">Process Delay / Down Time </th>
                  <th colSpan="1" rowSpan="2">
                    Reasons{" "}
                  </th>
                  <th colSpan="1" rowSpan="2">
                    Remarks{" "}
                  </th>
                  <th colSpan="1" rowSpan="2">
                    Sign and Date{" "}
                  </th>
                </tr>
                <tr>
                  <th colSpan="1">From (hours: Minutes) </th>
                  <th colSpan="1">To (hours: Minutes) </th>
                  <th colSpan="1">Total (hours: Minutes) </th>
                </tr>
                {pdeArray &&
                  pdeArray.map((x, index) => {
                    return (
                      <tr key={index}>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          <input
                            type="checkbox"
                            checked={checkedItems[index] || false}
                            onChange={(e) => handleCheckboxChange(e, index)}
                          />
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.packDt || x.date}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.f_time || x.from_hour}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.t_time || x.to_hour}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.totHrs || x.total_hour}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.reason}
                        </td>
                        <td
                          colSpan="1"
                          style={{ padding: "0.4em", textAlign: "center" }}
                        >
                          {x.remarks}
                        </td>
                        <td
                          colSpan="1"
                          style={{
                            padding: "0.4em",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Select
                            style={{ width: "12em" }}
                            options={prodLov}
                            onChange={(value) =>
                              handleSignatureChangepde(value, index)
                            }
                            value={signatureValues[index] || x.sign}
                            disabled={
                              !checkedItems[index] ||
                              LoggedInQA_DESIGNEEandQA_MAN
                            }
                          />

                          <input
                            type="date"
                            onChange={(e) => handleDateChange(e, index)}
                            value={dateValues[index] || x.sign_date}
                            disabled={
                              !checkedItems[index] ||
                              LoggedInQA_DESIGNEEandQA_MAN
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "12",
      label: "Process Deviation Record",
      children: (
        <Row>
          {processDeviationStatus == true ? (
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
                    }}
                    align="center"
                  >
                    S.No
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Deviation Log No
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Sign and Date
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    QA Remarks
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Sign and Date
                  </td>
                </tr>
                {processDeviationArray &&
                  processDeviationArray.map((x, i) => {
                    return (
                      <tr>
                        <td
                          align="center"
                          style={{
                            padding: "1em",
                          }}
                        >
                          {++i}
                        </td>
                        <td align="center">{x.deviationLogNo}</td>
                        <td align="center">
                          {x.sign} <br />{" "}
                          {x.signDate
                            ? moment(x.signDate).format("DD/MM/YYYY - HH:mm")
                            : ""}
                        </td>
                        <td align="center">{x.qaRemarks || "NA"}</td>
                        <td align="center">
                          {x.qa_saved_by} <br />
                          {x.qa_saved_on
                            ? moment(x.qa_saved_on).format("DD/MM/YYYY - HH:mm")
                            : ""}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      loggedInHod ||
                        (loggedInSupervisor && processDeviationValidation.beforeQAConditionForSupervisor) ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={saveprocessDeviationFunc}
                  disabled={LoggedInQA_DESIGNEEandQA_MAN}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      loggedInHod ||
                        (loggedInSupervisor && processDeviationValidation.beforeQAConditionForSupervisor) ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={processDeviationFunc}
                  disabled={LoggedInQA_DESIGNEEandQA_MAN}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    S.No
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Deviation Log No
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Sign and Date
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    QA Remarks
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Sign and Date
                  </td>
                </tr>
                {/* starting Initially */}
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    1
                  </td>
                  <td align="center">
                    <input
                      className="inp-new"
                      value={deviationLog.one}
                      onChange={(e) => {
                        updateDeviationLogNo({ one: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      value={pdrSign1.one || username}
                      placeholder="Choose Signature"
                      options={qaLov}
                      onChange={pdrSignOnChange1}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                    <input
                      type="datetime-local"
                      value={pdrDate1.one ? pdrDate1.one : ""}
                      onChange={(e) => {
                        updateDateProd({ one: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <input
                      type="text"
                      className="inp-new"
                      value={qaRemarks.one}
                      onChange={(e) => {
                        updateRemarksQA({ one: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      value={pdrSign2.one || usernameSupervisor}
                      placeholder="Choose Signature"
                      options={prodLov}
                      onChange={pdrSignOnChangeQA1}
                      disabled={
                        processDeviationValidation.beforeQAConditionForSupervisor ||
                        !loggedInSupervisor ||

                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                    <input
                      type="datetime-local"
                      value={
                        pdrDate2.one
                          ? pdrDate2.one.slice(0, 16)
                          : localDateValue4
                      }
                      onChange={(e) => {
                        updateDateQA({ one: e.target.value });
                      }}
                      disabled={
                        !loggedInSupervisor || processDeviationValidation.beforeQAConditionForSupervisor ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                </tr>
                {/* second Initially */}
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    2
                  </td>
                  <td align="center">
                    <input
                      className="inp-new"
                      value={deviationLog.two}
                      onChange={(e) => {
                        updateDeviationLogNo({ two: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      value={pdrSign1.two || username}
                      placeholder="Choose Signature"
                      options={qaLov}
                      onChange={pdrSignOnChange2}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                    <input
                      type="datetime-local"
                      value={pdrDate1.two ? pdrDate1.two : ""}
                      onChange={(e) => {
                        updateDateProd({ two: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <input
                      type="text"
                      className="inp-new"
                      value={qaRemarks.two}
                      onChange={(e) => {
                        updateRemarksQA({ two: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      value={pdrSign2.two || usernameSupervisor}
                      placeholder="Choose Signature"
                      options={prodLov}
                      onChange={pdrSignOnChangeQA2}
                      disabled={
                        !loggedInSupervisor || processDeviationValidation.beforeQAConditionForSupervisor ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                    <input
                      type="datetime-local"
                      value={
                        pdrDate2.two
                          ? pdrDate2.two.slice(0, 16)
                          : localDateValue4
                      }
                      onChange={(e) => {
                        updateDateQA({ two: e.target.value });
                      }}
                      disabled={
                        !loggedInSupervisor || processDeviationValidation.beforeQAConditionForSupervisor ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                </tr>
                {/* Third Starting */}
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    3
                  </td>
                  <td align="center">
                    <input
                      className="inp-new"
                      value={deviationLog.three}
                      onChange={(e) => {
                        updateDeviationLogNo({ three: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      value={pdrSign1.three || username}
                      placeholder="Choose Signature"
                      options={qaLov}
                      onChange={pdrSignOnChange3}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                    <input
                      type="datetime-local"
                      value={pdrDate1.three ? pdrDate1.three : ""}
                      onChange={(e) => {
                        updateDateProd({ three: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <input
                      type="text"
                      className="inp-new"
                      value={qaRemarks.three}
                      onChange={(e) => {
                        updateRemarksQA({ three: e.target.value });
                      }}
                      disabled={
                        !loggedInQa ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                  <td align="center">
                    <Select
                      style={{
                        width: "12em",
                      }}
                      value={pdrSign2.three || usernameSupervisor}
                      placeholder="Choose Signature"
                      options={prodLov}
                      onChange={pdrSignOnChangeQA3}
                      disabled={
                        !loggedInSupervisor || processDeviationValidation.beforeQAConditionForSupervisor ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                    <input
                      type="datetime-local"
                      value={
                        pdrDate2.three
                          ? pdrDate2.three.slice(0, 16)
                          : localDateValue4
                      }
                      onChange={(e) => {
                        updateDateQA({ three: e.target.value });
                      }}
                      disabled={
                        !loggedInSupervisor || processDeviationValidation.beforeQAConditionForSupervisor ||
                        (loggedInQa && processDeviationValidation.qaApproved) ||
                        (loggedInSupervisor &&
                          processDeviationValidation.supervisorApproved) ||
                        (processDeviationValidation.qaApproved &&
                          processDeviationValidation.supervisorApproved)
                      }
                    />
                  </td>
                </tr>
                {/* Third Ending */}
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "13",
      label: "List Of Enclosures",
      children: (
        <Row>
          {listOfEnclosureStatus == true ? (
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
                  <th>Title</th>
                  <th>Remarks</th>
                </tr>
                {listOfEnclosureStore &&
                  listOfEnclosureStore.map((x, i) => {
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
                        <td align="center">{x.title}</td>
                        <td align="center">{x.remark1}</td>
                      </tr>
                    );
                  })}
              </table>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      loggedInHod ||
                        (loggedInSupervisor && freezeEnclosueSup) ||
                        freezeEnclosureQa
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={listofEnclosures}
                  disabled={LoggedInQA_DESIGNEEandQA_MAN}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    S.No
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Title
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Remarks
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    1
                  </td>
                  <td style={{ padding: "1em" }} align="center">
                    Bleaching Job Card
                  </td>
                  <td>
                    <Radio.Group
                      onChange={(e) =>
                        updateListOfEnclousres({
                          bleaching_job_card: e.target.value,
                        })
                      }
                      value={listofEnclosuresNewArray.bleaching_job_card}
                      disabled={
                        !loggedInSupervisor ||
                        freezeEnclosueSup ||
                        freezeEnclosureQa
                      }
                    >
                      <Radio value="ATTACHED">Attached</Radio>
                      <Radio value="NOT ATTACHED">Not Attached</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    2
                  </td>
                  <td style={{ padding: "1em" }} align="center">
                    Processing Equipment's Calibration Status (Annexure No.01)
                  </td>
                  <td>
                    <Radio.Group
                      onChange={(e) =>
                        updateListOfEnclousres({
                          process_equipment_calibration: e.target.value,
                        })
                      }
                      value={
                        listofEnclosuresNewArray.process_equipment_calibration
                      }
                      disabled={
                        !loggedInSupervisor ||
                        freezeEnclosueSup ||
                        freezeEnclosureQa
                      }
                    >
                      <Radio value="ATTACHED">Attached</Radio>
                      <Radio value="NOT ATTACHED">Not Attached</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                {loggedInSupervisor ? null : (
                  <tr>
                    <td
                      style={{
                        padding: "1em",
                      }}
                      align="center"
                    >
                      3
                    </td>
                    <td>
                      <input
                        className="inp-new"
                        value={freeText}
                        onChange={(e) => setFreeText(e.target.value)}
                        placeholder="free text up to 100 words"
                        disabled={!loggedInQa || freezeEnclosureQa}
                      />
                    </td>
                    <td>
                      <Radio.Group
                        onChange={(e) =>
                          updateListOfEnclousres({
                            freetext_new: e.target.value,
                          })
                        }
                        value={listofEnclosuresNewArray.freetext_new}
                        disabled={!loggedInQa || freezeEnclosureQa}
                      >
                        <Radio value="ATTACHED">Attached</Radio>
                        <Radio value="NOT ATTACHED">Not Attached</Radio>
                        <Radio value="NA">NA</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                )}
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "14",
      label: "Post Production Review",
      children: (
        <Row>
          {postprodStatus == true ? (
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
                    }}
                    align="center"
                  >
                    Designation
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Production Supervisor
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Head of the Department / Designee
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                    align="center"
                  >
                    Approved By Manager-QA / Designee
                  </td>
                </tr>
                {postProdArrayNew &&
                  postProdArrayNew.map((x, i) => {
                    return (
                      <>
                        <tr>
                          <td align="center" style={{ padding: "1em" }}>
                            Name
                          </td>
                          <td align="center">{x.supervisorName}</td>
                          <td align="center">{x.hodName}</td>
                          <td align="center">{x.qaName}</td>
                        </tr>
                        <tr>
                          <td align="center" style={{ padding: "1em" }}>
                            Sign & Date
                          </td>
                          <td align="center">
                            {x.supervisorName} <br />{" "}
                            {moment(x.date).format("DD/MM/YYYY - HH:mm")}
                          </td>
                          <td align="center">
                            {x.hodName} <br />{" "}
                            {moment(x.shoppageDate).format(
                              "DD/MM/YYYY - HH:mm"
                            )}
                          </td>
                          <td align="center">
                            {x.qaName} <br />{" "}
                            {moment(x.shoppageDate2).format(
                              "DD/MM/YYYY - HH:mm"
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </table>
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      (postprodSup && loggedInSupervisor) ||
                        postprodQa ||
                        loggedInQa ||
                        (postprodHod && loggedInHod)
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={postprodSend}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Designation
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Production Supervisor
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Head of the Department / Designee
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Approved By Manager-QA / Designee
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Name
                  </td>
                  <td style={{ padding: "1em" }}>

                    <Select
                      options={prodLov}
                      onChange={ppOnchangeName1}
                      value={postProdArray.prodSupName || usernameSupervisor}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Choose Production"
                      disabled={!loggedInSupervisor || postprodSup}
                    />
                  </td>
                  <td>
                    <Select
                      options={hodnLov}
                      onChange={ppOnchangeName2}
                      value={postProdArray.hodName || usernameHod}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Choose HOD"
                      disabled={!loggedInHod || postprodHod}
                    />
                  </td>
                  <td>
                    <Select
                      options={qaManagerLov}
                      onChange={ppOnchangeName3}
                      value={postProdArray.QaName || usernameQAManager}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Choose QA"
                      disabled={!loggedInQaManager || postprodQa}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Sign & Date
                  </td>
                  <td style={{ padding: "1em" }}>

                    <Select
                      options={prodLov}
                      onChange={ppOnchangeName1}
                      value={postProdArray.prodSupName || usernameSupervisor}
                      style={{
                        width: "50%",
                      }}
                      placeholder="Choose Production"
                      disabled={!loggedInSupervisor || postprodSup}
                    />
                    <Input
                      type="datetime-local"
                      style={{
                        width: "50%",
                      }}
                      value={postProdArray.prodSupDate}
                      onChange={(e) => {
                        updatePostProduction({ prodSupDate: e.target.value });
                      }}
                      disabled={!loggedInSupervisor || postprodSup}
                    />
                  </td>
                  <td>
                    <Select
                      options={hodnLov}
                      onChange={ppOnchangeName2}
                      value={postProdArray.hodName || usernameHod}
                      style={{
                        width: "50%",
                      }}
                      placeholder="Choose Hod"
                      disabled={!loggedInHod || postprodHod}
                    />
                    <Input
                      type="datetime-local"
                      style={{
                        width: "50%",
                      }}
                      value={postProdArray.hodDate || localDateValue5}
                      onChange={(e) => {
                        updatePostProduction({ hodDate: e.target.value });
                      }}
                      disabled={!loggedInHod || postprodHod}
                    />
                  </td>
                  <td>
                    <Select
                      options={qaManagerLov}
                      onChange={ppOnchangeName3}
                      value={postProdArray.QaName || usernameQAManager}
                      style={{
                        width: "50%",
                      }}
                      placeholder="Choose QA"
                      disabled={!loggedInQaManager || postprodQa}
                    />
                    <Input
                      type="datetime-local"
                      style={{
                        width: "50%",
                      }}
                      value={postProdArray.QaDate || localDateValue3}
                      onChange={(e) => {
                        updatePostProduction({ QaDate: e.target.value });
                      }}
                      disabled={!loggedInQaManager || postprodQa}
                    />
                  </td>
                </tr>
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "15",
      label: "QA Release",
      children: (
        <Row>
          {qaStatus == true ? (
            <>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <th
                    align="center"
                    style={{
                      padding: "1em",
                    }}
                  >
                    S.No
                  </th>
                  <th align="center">Description</th>
                  <th align="center">Status</th>
                  <th align="center">Sign & Date</th>
                </tr>
                {qualityReleaseStore &&
                  qualityReleaseStore.map((x, i) => {
                    return (
                      <tr>
                        <td
                          align="center"
                          style={{
                            padding: "1em",
                          }}
                        >
                          {++i}
                        </td>
                        <td align="center">{x.description}</td>
                        <td align="center">{x.status1}</td>
                        <td align="center">
                          {x.signature} <br />{" "}
                          {moment(x.date).format("DD/MM/YYYY - HH:mm")}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </>
          ) : (
            <>
              {" "}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={postqareleaseSave}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display:
                      !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                        ? "none"
                        : "block",
                  }}
                  shape="round"
                  onClick={postqareleaseSend}
                >
                  Submit
                </Button>
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    S.No
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Description
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Status
                  </td>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    Sign and Date
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    1
                  </td>
                  <td style={{ padding: "1em" }}>
                    All critical process parameters reviewed. (Within/Not within
                    range)
                  </td>
                  <td>
                    <Radio.Group
                      onChange={(e) =>
                        updateQaReleaseObject({
                          criticalProcessParameter: e.target.value,
                        })
                      }
                      value={qaReleaseArray.criticalProcessParameter}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    >
                      <Radio value="REVIEWED">Reviewed</Radio>
                      <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td>
                    <Select
                      value={qaReleaseObj.Sign1 || usernameQADESANDMAN}
                      onChange={qaOnchange1}
                      options={qaManagerLov}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                    <Input
                      type="datetime-local"
                      value={qaReleaseObj.Date1}
                      onChange={(e) => updateQa({ Date1: e.target.value })}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                  </td>
                </tr>

                {/* two */}
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    2
                  </td>
                  <td style={{ padding: "1em" }}>
                    In process checks reviewed. (Meeting/Not meeting the
                    specification)
                  </td>
                  <td>
                    <Radio.Group
                      onChange={(e) =>
                        updateQaReleaseObject({
                          ProcessChecksReviewed: e.target.value,
                        })
                      }
                      value={qaReleaseArray.ProcessChecksReviewed}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    >
                      <Radio value="REVIEWED">Reviewed</Radio>
                      <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td>
                    <Select
                      value={qaReleaseObj.Sign2 || usernameQADESANDMAN}
                      onChange={qaOnchange2}
                      options={qaManagerLov}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                    <Input
                      type="datetime-local"
                      value={qaReleaseObj.Date2}
                      onChange={(e) => updateQa({ Date2: e.target.value })}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                  </td>
                </tr>
                {/* three */}
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    3
                  </td>
                  <td style={{ padding: "1em" }}>
                    Deviations reviewed. (Found/Not found)
                  </td>
                  <td>
                    <Radio.Group
                      onChange={(e) =>
                        updateQaReleaseObject({
                          DeviationReviewes: e.target.value,
                        })
                      }
                      value={qaReleaseArray.DeviationReviewes}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    >
                      <Radio value="REVIEWED">Reviewed</Radio>
                      <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td>
                    <Select
                      value={qaReleaseObj.Sign3 || usernameQADESANDMAN}
                      onChange={qaOnchange3}
                      options={qaManagerLov}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                    <Input
                      type="datetime-local"
                      value={qaReleaseObj.Date3}
                      onChange={(e) => updateQa({ Date3: e.target.value })}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                  </td>
                </tr>
                {/* four */}
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    4
                  </td>
                  <td style={{ padding: "1em" }}>If deviations are logged</td>
                  <td>
                    <Radio.Group
                      onChange={(e) =>
                        updateQaReleaseObject({
                          DeivationLogged: e.target.value,
                        })
                      }
                      value={qaReleaseArray.DeivationLogged}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    >
                      <Radio value="REVIEWED">Reviewed</Radio>
                      <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td>
                    <Select
                      value={qaReleaseObj.Sign4 || usernameQADESANDMAN}
                      onChange={qaOnchange4}
                      options={qaManagerLov}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                    <Input
                      type="datetime-local"
                      value={qaReleaseObj.Date4}
                      onChange={(e) => updateQa({ Date4: e.target.value })}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                  </td>
                </tr>
                {/* five */}
                <tr>
                  <td
                    style={{
                      padding: "1em",
                    }}
                  >
                    5
                  </td>
                  <td style={{ padding: "1em" }}>
                    The Batch is released to next step.
                  </td>
                  <td>
                    <Radio.Group
                      onChange={(e) =>
                        updateQaReleaseObject({ BatchReleased: e.target.value })
                      }
                      value={qaReleaseArray.BatchReleased}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    >
                      <Radio value="REVIEWED">Reviewed</Radio>
                      <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td>

                    <Select
                      value={qaReleaseObj.Sign5 || usernameQADESANDMAN}
                      onChange={qaOnchange5}
                      options={qaManagerLov}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                    <Input
                      type="datetime-local"
                      value={qaReleaseObj.Date5}
                      onChange={(e) => updateQa({ Date5: e.target.value })}
                      style={{
                        width: "50%",
                      }}
                      disabled={
                        !LoggedInQA_DESIGNEEandQA_MAN || qaReleaseSubmit
                      }
                    />
                  </td>
                </tr>
              </table>
            </>
          )}
        </Row>
      ),
    },
    {
      key: "16",
      label: "Product Release",
      children: (
        <Row>
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "0.5em",
              }}
            >
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display:
                    loggedInQa || LoggedInQA_DESIGNEEandQA_MAN
                      ? "block"
                      : "none",
                }}
                shape="round"
                onClick={prodReleaseFunc}
              >
                Submit
              </Button>
            </div>
            <table
              style={{
                width: "100%",
              }}
            >
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Particulars
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Checked by QA
                </td>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Approved By Manager-QA / Designee
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Name
                </td>
                <td style={{ padding: "1em" }}>
                  <Select
                    value={prodRelease.Name1 || username}
                    onChange={prodOnchange1}
                    options={qaLov}
                    style={{
                      width: "100%",
                    }}
                    disabled={!loggedInQa || fieldsDisabled.qaInspector}
                  />
                </td>
                <td>
                  <Select
                    value={prodRelease.Name2 || usernameQADESANDMAN}
                    onChange={prodOnchange2}
                    options={qaManagerLov}
                    style={{
                      width: "100%",
                    }}
                    disabled={
                      !LoggedInQA_DESIGNEEandQA_MAN || fieldsDisabled.qaManager
                    }
                  />
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1em",
                  }}
                >
                  Sign & Date
                </td>
                <td style={{ padding: "1em" }}>
                  <Select
                    value={prodRelease.Sign1 || username}
                    onChange={prodOnchange3}
                    options={qaLov}
                    style={{
                      width: "50%",
                    }}
                    disabled={!loggedInQa || fieldsDisabled.qaInspector}
                  />
                  <Input
                    type="datetime-local"
                    value={prodRelease.Date1 || localDateValue}
                    onChange={(e) => updateProd({ Date1: e.target.value })}
                    style={{
                      width: "50%",
                    }}
                    disabled={!loggedInQa || fieldsDisabled.qaInspector}
                  />
                </td>
                <td>

                  <Select
                    value={prodRelease.Sign2 || usernameQADESANDMAN}
                    onChange={prodOnchange4}
                    options={qaManagerLov}
                    style={{
                      width: "50%",
                    }}
                    disabled={
                      !LoggedInQA_DESIGNEEandQA_MAN || fieldsDisabled.qaManager
                    }
                  />
                  <Input
                    type="datetime-local"
                    value={prodRelease.Date2 || localDateValue3}
                    onChange={(e) => updateProd({ Date2: e.target.value })}
                    style={{
                      width: "50%",
                    }}
                    disabled={
                      !LoggedInQA_DESIGNEEandQA_MAN || fieldsDisabled.qaManager
                    }
                  />
                </td>
              </tr>
            </table>
          </>
          {/* )} */}
        </Row>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <BleachingHeader
        formName={"Batch Manufacturing Record"}
        formatNo={"(BMR)"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            onClick={printingFunc}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: printValidation ? "block" : "none",
            }}
            shape="round"
          >
            Print
          </Button>,
          <Button

            onClick={() => window.history.back()}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
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
            onClick={() => {

              confirm("You Want to logged out") == true
                ? navigate("/Precot")
                : null;
            }}
            shape="round"
            icon={<FaLock color="#00308F" />}
          >
            &nbsp;Logout
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
          display: "flex",
          width: "98%",
          position: "relative",
          left: "1%",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <label>
          Select BMR :
          <Select
            onChange={onBmrChange}
            options={bmrList}
            placeholder="Select BMR"
            showSearch
          />
          <Button
            type="primary"
            onClick={overallBMR}
            style={{
              marginLeft: "2em",
            }}
          >
            Go
          </Button>
        </label>
        <p>
          Department Name:{" "}
          <span
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
          >
            Bleaching
          </span>
        </p>
        <p>
          Product Name:{" "}
          <span
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
          >
            AB Cotton
          </span>
        </p>

        <p>
          Effective Date:{" "}
          <span
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
          >
            12-07-2024
          </span>
        </p>
      </Row>

      {/* print starts here  */}
      <div
        id="section-to-print"
        ref={elementRef}
        style={{ padding: "20px", marginTop: "10px" }}
      >
        {/* =================== Table 1 =========================== */}
        <table style={{ padding: "10px" }}>
          <thead style={{ marginTop: "20px" }}>
            <tr>
              <td
                colSpan={2}
                rowSpan={4}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  marginTop: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <img src={logo} alt="logo" width="50%" />
                <br />
                UNIT H
                <br />
                <p className="page-number"></p>
              </td>
              <th
                colSpan={9}
                rowSpan={4}
                style={{
                  textAlign: "center",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  verticalAlign: "middle",
                  width: "60%",
                  height: "10px",
                }}
              >
                Batch Manufacturing Record
              </th>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  width: "10%",
                }}
              >
                Format No.:
              </td>
              <td
                colSpan={3}
                style={{
                  textAlign: "center",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  width: "10%",
                }}
              >
                PRD01/F-43
              </td>
            </tr>
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Revision No.:
              </td>
              <td
                colSpan={3}
                style={{
                  textAlign: "center",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                01
              </td>
            </tr>
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ref. SOP No.:
              </td>
              <td
                colSpan={3}
                style={{
                  textAlign: "center",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QAD01-D-64
              </td>
            </tr>
            <tr>
              <th colSpan={5} style={{ textAlign: "left" }}>
                Page No.:
              </th>
              <th style={{ textAlign: "center" }} colSpan={7}></th>
            </tr>
            <tr style={{ height: "10px", border: "none" }}>
              <td style={{ border: "none" }} colSpan={20}></td>
            </tr>
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Department Name
              </td>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Bleaching
              </td>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                BMR No./Rev.No
              </td>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {bmr}
              </td>
            </tr>
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Name
              </td>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                AB Cotton
              </td>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Effective Date
              </td>
              <td
                colSpan={5}
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                12-07-2024
              </td>
            </tr>

            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="20"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1.0 PRODUCTION DETAILS
              </th>
            </tr>

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                BATCH NO:
              </th>
            </tr>

            <tr>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Batch Quantity - Output (Unit: Kg)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_BatchQty1 || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Batch Qty. converted to “n” No. of Sub Batches (Unit: Nos)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_BatchQty2 || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Mixing:{" "}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_Mixing || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Start Sub Batch No
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_StartSub || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Batch Qty. converted to “n” No. of Bales (Unit: Nos){" "}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_BatchQuantity || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                End Sub Batch No
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_EndSub || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                rowspan="2"
              >
                Product Supply
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                In House{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_ProductsupplyInhouse
                  ? pd_ProductsupplyInhouse == "TICK"
                    ? "✓"
                    : "NA"
                  : ""}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                rowspan="2"
              >
                Finishing{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Crisp{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_finish_Crish
                  ? pd_finish_Crish == "TICK"
                    ? "✓"
                    : "NA"
                  : ""}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Export
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_ProductsupplyExport
                  ? pd_ProductsupplyExport == "TICK"
                    ? "✓"
                    : "NA"
                  : ""}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Soft
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_FinishSoft ? (pd_FinishSoft == "TICK" ? "✓" : "NA") : ""}
              </td>
            </tr>

            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing Start Date
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing Completion Date
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {String(pd_ManufacturingStartDate)
                  .replace("-", "/")
                  .replace("-", "/") || "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_ManufacturingStartTime || "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {String(pd_ManufacturingCompletionDate || "NA")
                  .replace("-", "/")
                  .replace("-", "/")}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {pd_ManufacturingCompletionTime || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRODUCTION BATCH RECORD ISSUANCE DETAILS{" "}
              </td>
            </tr>
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Issued by: Quality Assurance has reviewed the <br />
                Batch Record to ensure that the copy is a<br />
                complete, accurate copy of the Master Batch Record.
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Received by: Production has reviewed the Batch <br />
                Record to ensure that the copy is complete and correct.
                <br />
                Production is responsible for the Batch Record,
                <br />
                following the issuance.
              </td>
            </tr>
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Issued by (QA) <br />
                {(qaSign1 || "NA") +
                  " - " +
                  moment(productionLovStates.productionQADate).format(
                    "DD/MM/YYYY - HH:mm"
                  ) || "NA"}
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Received by (Production) <br />
                {(productionSign1 || "NA") +
                  " - " +
                  moment(productionLovStates.productionDate).format(
                    "DD/MM/YYYY - HH:mm"
                  ) || "NA"}
              </td>
            </tr>

            <tr
              style={{
                border: "none",
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              <td
                colspan="20"
                style={{
                  border: "none",
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <br />
                <strong>Instructions while filling in BMR:</strong> <br />
                1.Record all data in Blue ink. <br />
                2.Record time as HR: MM in 24 hours format.
                <br />
                3.Record date in DD/MM/YYYY - HH:mm or DD/MM/YY format. <br />
                4.Do not leave any blank space. If there is any blank space, NA
                should be written, and the line should be marked as "Z" Shape
                with sign and date. 5.Blue ink should be used by QA for review.{" "}
                <br />
                6.Immediately do the entry in BMR, along with the completion of
                activity. The time entered should <br />
                be considered as completion time of the activity. <br />
                7.Time of starting the batch shall be considered as start time
                and end of the completion of activity
                <br />
                from the equipment should be considered as completion time of
                batch. <br />
                8.Whenever any Deviation occurs, raise the deviation,
                investigation of deviation shall be performed
                <br />
                & enter the deviation in the BMR. <br />
                9.Note: Tick mark "√" indicates activity selected /completed &
                Cross mark '"×" indicate not selected/ <br />
                not completed. <br />
                <br />
                <strong>Safety Instructions:</strong> <br />
                Use personal Protective Equipment like Apron, Helmet, Safety
                goggles, Nose mask and hand gloves, <br />
                etc., during material handling and sampling. Ear plugs are used
                in high noisy areas.
              </td>
            </tr>
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2.0 RAW COTTON ISSUE
              </th>
            </tr>
            <tr>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Lay down No.
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Batch No.
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                No. of Bales
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Total Bale wt. (Kg)
              </th>
            </tr>
            {rawCottonIssue &&
              rawCottonIssue.map((x, i) => {
                return (
                  <tr>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",

                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {laydownNo}
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.batchNo == undefined ? "" : x.batchNo}
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.balesCount}
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {" "}
                      {x.weight}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "right",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Total
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                {rawweightTotal}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",

                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                {rawweightTotalBaleWeight}
              </td>
            </tr>
            {rawCottonStore &&
              rawCottonStore.map((x, i) => {
                return (
                  <tr>
                    <td colSpan="10" align="center">
                      Issued by (Stores): <br />
                      {x.qaName}
                      <br />
                      {moment(x.shoppageDate).format("DD/MM/YYYY") || "NA"}
                    </td>
                    <td colSpan="10" align="center">
                      Received by (Production): <br />
                      {x.supervisorName}
                      <br />
                      {moment(x.shoppageDate2).format("DD/MM/YYYY") || "NA"}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3.0 CHEMICAL ISSUE AND CONSUMPTION:{" "}
              </th>
            </tr>
            <tr>
              <th
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SI.NO
              </th>
              <th
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name of the Chemicals
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Chemicals Batch No
              </th>
              <th
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Quantity
              </th>
              <th
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Units
              </th>
            </tr>

            {chemicalDetailsArray &&
              chemicalDetailsArray.map((x, i) => {
                return (
                  <tr>
                    <td
                      colspan="2"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {++i}
                    </td>
                    <td
                      colspan="7"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.chemicalName}
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.batchNo}
                    </td>
                    <td
                      colspan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {" "}
                      {x.quantity}
                    </td>
                    <td
                      colspan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.unit}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                  borderRight: "none",
                }}
              >
                Issued by (Stores):
                <br />
                {chemicalDetailsArray.length > 0
                  ? chemicalDetailsArray[0].issuedBy
                  : ""}
                <br /> {moment(chemicalDate).format("DD/MM/YYYY")}
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                  borderLeft: "none",
                }}
              >
                Received by (Production):
                <br />{" "}
                {chemicalDetailsArray.length > 0
                  ? chemicalDetailsArray[0].verifiedBy
                  : ""}
                <br />
                {moment(chemicalDate).format("DD/MM/YYYY")}
              </td>
            </tr>
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4.0 PACKING MATERIAL DETAILS:
              </th>
            </tr>
            <tr>
              <th
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SI.NO
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name of Packing Material
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Batch No
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Quantity
              </th>
              <th
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Units
              </th>
            </tr>
            {packingMaterialsArray &&
              packingMaterialsArray.map((x, i) => {
                return (
                  <tr>
                    <td
                      colspan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {++i}
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.packingName}
                    </td>
                    <td
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.batchNo}
                    </td>
                    <td
                      colSpan="3"
                      align="center"
                      colspan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.quantity}
                    </td>
                    <td
                      colSpan="3"
                      align="center"
                      colspan="2"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.unit}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                  borderRight: "none",
                }}
              >
                Issued by (Stores):
                <br />
                {packingMaterialsArray.length
                  ? packingMaterialsArray[0].issuedBy
                  : ""}
                <br />
                {moment(chemicalDate).format("DD/MM/YYYY")}
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                  borderLeft: "none",
                }}
              >
                Received by (Production):
                <br />{" "}
                {packingMaterialsArray.length > 0
                  ? packingMaterialsArray[0].verifiedBy
                  : ""}
                <br />
                {moment(chemicalDate).format("DD/MM/YYYY")}
              </td>
            </tr>

            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5.0 REFERENCE DOCUMENTS:{" "}
              </th>
            </tr>
            <tr>
              <th
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SI.NO{" "}
              </th>
              <th
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Title
              </th>
              <th
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  height: "10px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Document No{" "}
              </th>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Good Documentation Practices{" "}
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-10
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Blowroom & Bleaching Operation
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD01-D-03
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cleaning Machine & Sanitization
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD01-D-04
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Control of Non-Conforming
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-20
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Out-Of-Specification
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QCL01-D-17
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviation Management
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-41
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Change Control
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-37
              </td>
            </tr>


            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7.0 VERIFICATION OF RECORDS:
              </th>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name of the Record :
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed By
                <br />
                Sign & Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Verified By
                <br />
                Sign & Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Status{" "}
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Housekeeping Cleaning Records{" "}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[0].reviewedBy}
                <br />
                {moment(verificationArray && verificationArray[0].date2).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[0].verifiedBy}
                <br />
                {moment(verificationArray && verificationArray[0].date1).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[0].status == "Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[0].status == "Not Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[0].status == "Not Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[0].status == "Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  rowspan: "2",
                }}
              >
                Machine Cleaning Record{" "}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[1].verifiedBy}
                <br />
                {moment(verificationArray && verificationArray[1].date1).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[1].reviewedBy}
                <br />
                {moment(verificationArray && verificationArray[1].date2).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[1].status == "Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[1].status == "Not Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[1].status == "Not Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[1].status == "Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  rowspan: "2",
                }}
              >
                Logbook (Supervisor Shift Handover){" "}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[2].verifiedBy}
                <br />
                {moment(verificationArray && verificationArray[2].date1).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[2].reviewedBy}
                <br />
                {moment(verificationArray && verificationArray[2].date2).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[2].status == "Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[2].status == "Not Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[2].status == "Not Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[2].status == "Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  rowspan: "2",
                }}
              >
                Production Records{" "}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[3].verifiedBy}
                <br />
                {moment(verificationArray && verificationArray[3].date1).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[3].reviewedBy}
                <br />
                {moment(verificationArray && verificationArray[3].date2).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[3].status == "Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[3].status == "Not Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[3].status == "Not Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[3].status == "Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  rowspan: "2",
                }}
              >
                Machine Sanitizer{" "}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[4].verifiedBy}
                <br />
                {moment(verificationArray && verificationArray[4].date1).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "bottom",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray && verificationArray[4].reviewedBy}
                <br />
                {moment(verificationArray && verificationArray[4].date2).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[4].status == "Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[4].status == "Not Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {verificationArray &&
                  verificationArray[4].status == "Not Satisfactory"
                  ? "✓"
                  : verificationArray &&
                    verificationArray[4].status == "Satisfactory"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                8.0 MANUFACTURING STEPS:
              </th>
            </tr>
            <tr>
              <th
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Step No
              </th>
              <th
                colSpan="7"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Operation
              </th>
              <th
                colSpan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Observation
              </th>
              <th
                colSpan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed by (Sign & Date){" "}
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by(Sign & Date){" "}
              </th>
            </tr>
            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Switch “ON” all the machines & Sub machines:Blendomat, Metal
                Detector, Fire Detector, CL-P, SPH, MPM, Applied, ERM, XPI,
                Dustex, Cake press, Kier, Hydro Extractor, Cake opener, Dryer,
                Rieter, Applied, Metal Detector, Fire Detector Bale Press &
                Weighing scale.{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.observation1 == "Ready"
                  ? "✓"
                  : "✕"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[0]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
                { }
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[0]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Not Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[0]?.observation1 == "Not Ready"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[0]?.observation1 == "Ready"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <strong>Stage: BLOW ROOM</strong>{" "}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Raw Material Preparation: Check the lay down area for
                Cleanliness and verify the arrangement of the bales for the
                readiness of process in Blendomat area
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.observation1 == "Ready"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[1]?.observation1 == "Not Ready"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[1]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[1]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Not Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[1]?.observation1 == "Not Ready"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[1]?.observation1 == "Ready"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Select the working area for the Blendomat (WA1 or WA2) depending
                on the location of the bales to be processed.
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                WA1{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.observation1 == "WA1"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[2]?.observation1 == "WA2"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[2]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[2]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                WA2{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[2]?.observation1 == "WA2"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[2]?.observation1 == "WA1"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Refer 9.0 MACHINE OPERATION PARAMETERS.
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.observation1 == "Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[3]?.observation1 == "Not Completed"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[3]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[3]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[3]?.observation1 == "Not Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[3]?.observation1 == "Completed"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Verify the carding process machine is ON/OFF
                <br />
                Note: It should be “ON” when virgin cotton process requirement..
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                ON
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.observation1 == "On"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[4]?.observation1 == "Off"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[4]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[4]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                OFF
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[4]?.observation1 == "Off"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[4]?.observation1 == "On"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                {" "}
                <strong>Stage: BLEACHING</strong>
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cake Pressing Process:
                <br />
                Refer 9.0 MACHINE OPERATION PARAMETERS
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.observation1 == "Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[5]?.observation1 == "Not Completed"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[5]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[5]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[5]?.observation1 == "Not Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[5]?.observation1 == "Completed"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                KIER (Bleaching): <br />
                Set the Machine Parameter as per the Check List (Bleaching job
                card Format# PRD01/F-13.)
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.observation1 == "Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[6]?.observation1 == "Not Completed"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[6]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[6]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[6]?.observation1 == "Not Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[6]?.observation1 == "Completed"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                8
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Hydro Extraction Process: <br />
                Refer 9.0 MACHINE OPERATION PARAMETERS
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.observation1 == "Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[7]?.observation1 == "Not Completed"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[7]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[7]?.date2
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[7]?.observation1 == "Not Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[7]?.observation1 == "Completed"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                9
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Process of Cake opener, Dryer, Rieter/Fine Opener & Bale Press
                machines. Refer 9.0 MACHINE OPERATION PARAMETERS
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.observation1 == "Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[8]?.observation1 == "Not Completed"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.performBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[8]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.observation1 !== "NA"
                  ? manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.cleanedBy
                  : "NA"}
                <br />
                {manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.observation1 !== "NA"
                  ? moment(
                    manufacturingStepsArray &&
                    manufacturingStepsArray[8]?.date1
                  ).format("DD/MM/YYYY - HH:mm")
                  : ""}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Completed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingStepsArray &&
                  manufacturingStepsArray[8]?.observation1 == "Not Completed"
                  ? "✓"
                  : manufacturingStepsArray &&
                    manufacturingStepsArray[8]?.observation1 == "Completed"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <tr
              style={{
                border: "none",
                textAlign: "left",
                fontSize: "12pt",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              <td
                colspan="20"
                style={{
                  border: "none",
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <br />
                Note: Completed checklists are attached along with this
                document.
              </td>
            </tr>
            <tr>
              <td
                colspan="20"
                style={{
                  border: "none",
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                9.0 MCHINE OPDERATIONS PARAMETER
              </th>
            </tr>
            <tr>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SI.No
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Description
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Standard In Range
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Observation
              </th>
            </tr>
            {/* one */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Advance setting in Blendomat in mm
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3.0 - 9.0
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[0]?.observation1}
              </td>
            </tr>
            {/* two */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Fire Divertor switched ON/OFF
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                ON
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[1]?.observation1}
              </td>
            </tr>
            {/* three */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Metal Detector switched ON/OFF
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                ON
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[2]?.observation1}
              </td>
            </tr>
            {/* four */}
            <tr>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                CL-P Grid bar setting
              </td>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                0.0 - 2.0
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "20px",
                }}
              >
                Line 01{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "20px",
                }}
              >
                Line 02
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "20px",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[3]?.observation1}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[3]?.observation2}
              </td>
            </tr>
            {/* five */}
            <tr>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                ERM grid bar setting
              </td>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2.0 - 4.0
              </td>

              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "20px",
                }}
              >
                Line 01{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "20px",
                }}
              >
                Line 02
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "20px",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[4]?.observation1}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[4]?.observation2}
              </td>
            </tr>
            {/* six */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cake Press - Hydraulic pressure in Bar
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                100 - 112
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[5]?.observation1}
              </td>
            </tr>
            {/* seven */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cake Press - Spray water temperature in ℃
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                30 - 60
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[6]?.observation1}
              </td>
            </tr>
            {/* eight */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "30px",
                }}
              >
                8
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Hydro extractor timer setting (Analog)
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                0.3 - 0.7
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  verticalAlign: "top",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "50px",
                }}
              >
                Hydro-01
                <br />
                {manufacturingParametersArray &&
                  manufacturingParametersArray[7]?.observation1}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  verticalAlign: "top",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "50px",
                }}
              >
                Hydro-02
                <br />
                {manufacturingParametersArray &&
                  manufacturingParametersArray[7]?.observation2}
              </td>
            </tr>
            {/* nine */}
            <tr>
              <td
                colSpan="5"
                rowSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                9
              </td>
              <td
                colSpan="15"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cake Opener Setting
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Spike Lattice Speed in %
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                50 - 100
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[8]?.observation1}
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Stripper lattice Speed in %
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                50 - 100
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[9]?.observation1}
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Feed Roller Speed in %
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                50 - 100
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[10]?.observation1}
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Opening Cylinder Speed in %
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                40 - 65
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[11]?.observation1}
              </td>
            </tr>
            {/* ten */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                rowSpan="4"
              >
                10
              </td>
              <td
                colSpan="15"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Dryer Setting
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Inlet Main Steam Pressure in Bar
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2.0 - 4.0
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[12]?.observation1}
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Conveyor Speed in MPM
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                11.0 - 12.0
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[13]?.observation1}
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Streat Moisture value in %
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5.0 - 8.0
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[14]?.observation1}
              </td>
            </tr>
            {/* eleven */}
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                rowSpan="3"
              >
                11
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Fiber Opener (Rieter) Setting
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Line 01{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Line 02
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Feed Roller Speed in RPM
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2.0 - 6.0
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[15]?.observation1}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[15]?.observation2}
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Beater Roller Speed in RPM
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                400 - 800
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[16]?.observation1}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[16]?.observation2}
              </td>
            </tr>

            {/* twelve */}
            <tr>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                12
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Applied Setting
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Line 01{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Line 02
              </td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Refer SOP No. PRD01-D-09
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                VSTRICT
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[17]?.observation1}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {manufacturingParametersArray &&
                  manufacturingParametersArray[17]?.observation2}
              </td>
            </tr>

            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  borderRight: "none",
                }}
              >
                Performed by <br />
                {manufacturingParametersStore?.[0]?.verifiedBy || ""}
                <br />
                {moment(manufacturingParametersStore?.[0]?.verifiedDate).format(
                  "DD/MM/YYYY - HH:mm"
                ) || ""}
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  borderLeft: "none",
                }}
              >
                Checked by
                <br />
                {manufacturingParametersStore?.[0]?.reviewedBy || ""}
                <br />
                {moment(manufacturingParametersStore?.[0]?.reviewedDate).format(
                  "DD/MM/YYYY - HH:mm"
                ) || ""}
              </td>
            </tr>

            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <strong>10.0 PRODUCT RECONCILIATION: </strong>
                <br />
                Yield in % = (Output Qty / Input Qty) x 100{" "}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Input Quantity (Kgs){" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {productionReconillationObject.inputQty || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Out Put Quantity (Kgs){" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {productionReconillationObject.outPutQty || "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                % of Yield Specification: <br />
                CN- 85% to 95%; <br /> Virgin-70% to 90%{" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {productionReconillationObject.YieldSpecification || "NA"}
              </td>
            </tr>

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                11.0 PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD
              </th>
            </tr>
            <tr>
              <td
                colspan="2"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="3"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Process Delay / Down Time
              </td>
              <td
                colspan="4"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reason
              </td>
              <td
                colspan="4"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remarks
              </td>
              <td
                colspan="5"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </td>
            </tr>

            <tr>
              <th
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                From (hours: Minutes){" "}
              </th>
              <th
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                To (hours: Minutes){" "}
              </th>
              <th
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Total (hours: Minutes){" "}
              </th>
            </tr>
            {stoppageDetailsStore &&
              stoppageDetailsStore.map((x, i) => {
                return (
                  <tr>
                    <td
                      colSpan="2"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {++i}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {moment(x.date).format("DD/MM/YYYY")}
                    </td>
                    <td
                      colSpan="2"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.from_hour}
                    </td>
                    <td
                      colSpan="2"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.to_hour}
                    </td>
                    <td
                      colSpan="2"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.total_hour}
                    </td>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.reason}
                    </td>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.remarks}
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.sign}
                      <br />
                      {moment(x.sign_date).format("DD/MM/YYYY - HH:mm")}
                    </td>
                  </tr>
                );
              })}
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                12.0 PROCESS DEVIATION RECORD
              </th>
            </tr>
            <tr>
              <td
                colSpan="1"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S No{" "}
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Deviation Log No{" "}
              </td>
              <td
                colSpan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and date{" "}
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                QA Remarks{" "}
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Sign and Date{" "}
              </td>
            </tr>
            {processDeviationArray &&
              processDeviationArray.map((x, i) => {
                return (
                  <tr>
                    <td
                      colSpan="1"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {++i}
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.deviationLogNo}
                    </td>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.sign} <br />
                      {moment(x.signDate).format("DD/MM/YYYY - HH:mm")}
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.qaRemarks}
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.qa_saved_by}
                      <br />
                      {moment(x.qa_saved_on).format("DD/MM/YYYY - HH:mm")}
                    </td>
                  </tr>
                );
              })}
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                13.0 LIST OF ENCLOSURES:
              </th>
            </tr>

            <tr>
              <th
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S No.
              </th>
              <th
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Title
              </th>
              <th
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remarks
              </th>
            </tr>

            <tr>
              <td
                colspan="2"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1.
              </td>
              <td
                colspan="9"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Bleaching Job Card.
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {listOfEnclosureStore &&
                  listOfEnclosureStore[0].remark1 == "ATTACHED"
                  ? "✓"
                  : listOfEnclosureStore &&
                    listOfEnclosureStore[0].remark1 == "NOT ATTACHED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {listOfEnclosureStore &&
                  listOfEnclosureStore[0].remark1 == "NOT ATTACHED"
                  ? "✓"
                  : listOfEnclosureStore &&
                    listOfEnclosureStore[0].remark1 == "ATTACHED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                rowspan="2"
              >
                2.
              </td>
              <td
                colspan="9"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                rowspan="2"
              >
                Processing Equipment’s Calibration Status (Annexure No. 01)..
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {listOfEnclosureStore &&
                  listOfEnclosureStore[1].remark1 == "ATTACHED"
                  ? "✓"
                  : listOfEnclosureStore &&
                    listOfEnclosureStore[1].remark1 == "NOT ATTACHED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {listOfEnclosureStore &&
                  listOfEnclosureStore[1].remark1 == "NOT ATTACHED"
                  ? "✓"
                  : listOfEnclosureStore &&
                    listOfEnclosureStore[1].remark1 == "ATTACHED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3.
              </td>
              <td
                colspan="9"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {listOfEnclosureStore && listOfEnclosureStore[2].title}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {listOfEnclosureStore &&
                  listOfEnclosureStore[2].remark1 == "ATTACHED"
                  ? "✓"
                  : listOfEnclosureStore &&
                    listOfEnclosureStore[2].remark1 == "NOT ATTACHED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {listOfEnclosureStore &&
                  listOfEnclosureStore[2].remark1 == "NOT ATTACHED"
                  ? "✓"
                  : listOfEnclosureStore &&
                    listOfEnclosureStore[2].remark1 == "ATTACHED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <br />

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                14.0 POST-PRODUCTION REVIEW:
              </th>
            </tr>

            <tr>
              <th
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Designation
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Production Supervisor
              </th>
              <th
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Head of the Department / Designee
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Approved by Manager-QA / Designee
              </th>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Signature
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {postProdArrayNew && postProdArrayNew[0].supervisorName}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {postProdArrayNew && postProdArrayNew[0].hodName}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {postProdArrayNew && postProdArrayNew[0].qaName}
              </td>
            </tr>
            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {moment(postProdArrayNew && postProdArrayNew[0].date).format(
                  "DD/MM/YYYY - HH:mm"
                )}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {moment(
                  postProdArrayNew && postProdArrayNew[0].shoppageDate
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {moment(
                  postProdArrayNew && postProdArrayNew[0]?.shoppageDate2
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                15.0 QA RELEASE:
              </th>
            </tr>

            <tr>
              <th
                colspan="1"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S No
              </th>
              <th
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Description
              </th>
              <th
                colspan="6"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Status
              </th>
              <th
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </th>
            </tr>

            <tr>
              <td
                colspan="1"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colspan="10"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                All critical process parameters reviewed.
                <br /> (Within/Not within range)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[0]?.status1 == "REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[0]?.status1 == "NOT REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colspan="3"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore && qualityReleaseStore[0]?.signature}
                <br />
                {moment(
                  qualityReleaseStore && qualityReleaseStore[0]?.date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[0]?.status1 == "NOT REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[0]?.status1 == "REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="1"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colspan="10"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                In process checks reviewed. <br />
                (Meeting/Not meeting the specification)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[1]?.status1 == "REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[1]?.status1 == "NOT REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colspan="3"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore && qualityReleaseStore[1]?.signature}
                <br />
                {moment(
                  qualityReleaseStore && qualityReleaseStore[1]?.date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[1]?.status1 == "NOT REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[1]?.status1 == "REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="1"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colspan="10"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviations reviewed. <br />
                (Found/Not found)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[2]?.status1 == "REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[2]?.status1 == "NOT REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colspan="3"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore && qualityReleaseStore[2]?.signature}
                <br />
                {moment(
                  qualityReleaseStore && qualityReleaseStore[2]?.date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[2]?.status1 == "NOT REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[2]?.status1 == "REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="1"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colspan="10"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                If deviations are logged
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[3]?.status1 == "REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[3]?.status1 == "NOT REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colspan="3"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore && qualityReleaseStore[3]?.signature}
                <br />
                {moment(
                  qualityReleaseStore && qualityReleaseStore[3]?.date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[3]?.status1 == "NOT REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[3]?.status1 == "REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="1"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colspan="10"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                The Batch is released to next step.
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[4]?.status1 == "REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[4]?.status1 == "NOT REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
              <td
                colspan="3"
                rowspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore && qualityReleaseStore[4]?.signature}
                <br />
                {moment(
                  qualityReleaseStore && qualityReleaseStore[4]?.date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {qualityReleaseStore &&
                  qualityReleaseStore[4]?.status1 == "NOT REVIEWED"
                  ? "✓"
                  : qualityReleaseStore &&
                    qualityReleaseStore[4]?.status1 == "REVIEWED"
                    ? "✕"
                    : "NA"}
              </td>
            </tr>

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                16.0 PRODUCT RELEASE
              </th>
            </tr>

            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                The material produced through the execution of this Batch Record
                shall be archival by QA according to <br /> Product Release
                Procedure (SOP-QAD01-D-61) and documented as per the Format:
                QAD01/F-34
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Particulars
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checkedby QA
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Approved by Manager-QA / Designee
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {productReleaseArray && productReleaseArray[0]?.qaName}
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {productReleaseArray && productReleaseArray[0]?.supervisorName}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign & Date
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {productReleaseArray && productReleaseArray[0]?.qaName}
                <br />
                {moment(
                  productReleaseArray && productReleaseArray[0]?.shoppageDate
                ).format("DD/MM/YYYY")}
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {productReleaseArray && productReleaseArray[0]?.supervisorName}
                <br />
                {moment(
                  productReleaseArray && productReleaseArray[0]?.shoppageDate2
                ).format("DD/MM/YYYY")}
              </td>
            </tr>

            <br />

            <h1 className="footer_info_Mh"></h1>
            {listOf.bleaching == true ? (
              <>
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    BMR NO
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bmr}
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    M/c No
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.mc_no}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {" "}
                    Date
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.date}
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Batch No
                  </td>
                  <td colSpan="5">{batchNoNew}​</td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Shift
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.shift}
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Start Time
                  </td>
                  <td colSpan="5">
                    {bleachingJobCard && bleachingJobCard[0]?.start_time}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Finish
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.finish}
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    End Time
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.end_time}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    S.No
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Process Name
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Chemicals Name
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Activity
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Standard Time ​in Minutes
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Actual Time ​in Minutes
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Observations
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" align="center">
                    1
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Pre - Wetting
                  </td>

                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    NA
                  </td>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Water Filling and level maintaining
                    <br />
                    Temperature raising to 70 ℃<br />
                    Circulation @ 70 +/- 5 ℃<br />
                    Draining
                    <br />
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    24 +/-5
                  </td>
                  <td colSpan="3">
                    {bleachingJobCard && bleachingJobCard[0]?.wetting}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Actual temperature during circulation :
                    {bleachingJobCard && bleachingJobCard[0]?.wetting_act_temp}
                    ℃
                  </td>
                </tr>

                {/* sorcing */}
                <tr>
                  <td colSpan="2" align="center">
                    2
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Sourcing & Bleaching
                  </td>

                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Caustic soda Flakes
                    <br />
                    Haipolene &<br />
                    Sarofom & <br />
                    Hydrogen Peroxide
                    <br />
                  </td>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Water Filling and level maintaining <br />
                    Temperature raising to 60 ℃<br />
                    Chemical transfering
                    <br />
                    Temperature raising t0 110 ℃<br />
                    circulation @110+/-5 ℃<br />
                    Draining
                    <br />
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    100 +/-20{" "}
                  </td>

                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.scouring}
                  </td>

                  <td
                    colSpan="2"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Actual temperature during circulation :
                    {bleachingJobCard && bleachingJobCard[0]?.scouring_act_temp}
                    ℃
                  </td>
                </tr>

                {/* Hot wash1 */}
                <tr>
                  <td colSpan="2" align="center">
                    3
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Hot Wash 01
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    NA
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Water Filling and level maintaining Temperature raising to
                    95 ℃
                    <br />
                    Circulation @ 95+/-5℃
                    <br />
                    Draining
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    24 +/-5
                  </td>
                  <td colSpan="3" contentEditable="False">
                    {bleachingJobCard && bleachingJobCard[0]?.hotwash_one}
                  </td>
                  <td colSpan="2" contentEditable="False">
                    Actual temperature during circulation :
                    {bleachingJobCard &&
                      bleachingJobCard[0]?.hotwash_one_act_temp}
                    ℃
                  </td>
                </tr>

                {/* Hot wash2 */}
                <tr>
                  <td colSpan="2" align="center">
                    4
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Hot Wash 02
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    NA
                  </td>
                  <td colSpan="4">
                    Water Filling and level maintaining
                    <br />
                    Temperature raising to 90 ℃<br />
                    Circulation @ 90+/-5℃
                    <br />
                    Draining
                    <br />
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    24 +/-5
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.hotwash_two}
                  </td>
                  <td colSpan="2" contentEditable="False">
                    Actual temperature during circulation :
                    {bleachingJobCard &&
                      bleachingJobCard[0]?.hotwash_two_act_temp}
                    ℃
                  </td>
                </tr>

                {/* Nutralizing Wash */}

                <tr>
                  <td colSpan="2" align="center">
                    5
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Nutralizing Wash{" "}
                  </td>

                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Citric Acid,
                    <br />
                    Sarofom, <br />
                    Setilon KN/Persoftal <br />
                    9490 (for Crispy finish Only)
                  </td>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Water Filling and level maintaining <br />
                    Chemical transfering
                    <br />
                    Temperature raising to 70 ℃<br />
                    Circulation @ 70+/-5℃
                    <br />
                    Draining
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    30 +/-6
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.newtralizing}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Actual temperature during circulation :
                    {bleachingJobCard &&
                      bleachingJobCard[0]?.newtralizing_act_temp}
                    ℃
                  </td>
                </tr>

                {/* Final Cloud*/}

                <tr>
                  <td colSpan="2" align="center">
                    6
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Final Cloud{" "}
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    NA
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Water Filling and level maintaining
                    <br />
                    Circulation @ Normal Temperature
                    <br />
                    Surface Activity & pH conformation
                    <br />
                    Draining
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    20 +/-5
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.final_process}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    pH Actual:
                    {bleachingJobCard &&
                      bleachingJobCard[0]?.final_process_ph_temp}
                    <br />
                    Surface Activity Actual:
                    {bleachingJobCard &&
                      bleachingJobCard[0]?.final_process_act_temp}{" "}

                  </td>
                </tr>

                <tr>
                  <td colSpan="20" align="center">
                    Chemical Consumption details / Batch
                  </td>
                </tr>

                <tr>
                  <td colSpan="5" align="center">
                    Chemical Name
                  </td>
                  <td colSpan="5" align="center">
                    Standards
                  </td>
                  <td colSpan="5" align="center">
                    Actual
                  </td>
                  <td colSpan="5" align="center">
                    unit
                  </td>
                </tr>

                <tr>
                  <td colSpan="5">Caustic soda Flakes</td>
                  <td colSpan="5" align="center">
                    28-42
                  </td>
                  <td colSpan="5" align="center" contentEditable="False">

                    {bleachingJobCard &&
                      bleachingJobCard[0]?.caustic_soda_flakes}
                  </td>
                  <td colSpan="5" align="center">
                    kgs
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">Haipolene​</td>
                  <td colSpan="5" align="center">
                    10-12
                  </td>
                  <td colSpan="5" align="center" contentEditable="False">
                    {bleachingJobCard && bleachingJobCard[0]?.haipolene}
                  </td>
                  <td colSpan="5" align="center">
                    kgs
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">Sarofom​</td>
                  <td colSpan="5" align="center">
                    7.0-16.0
                  </td>
                  <td colSpan="5" align="center" contentEditable="False">
                    {bleachingJobCard && bleachingJobCard[0]?.sarofom}
                  </td>
                  <td colSpan="5" align="center">
                    kgs
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">Hydrogen peroxide​</td>
                  <td colSpan="5" align="center">
                    50-70
                  </td>
                  <td colSpan="5" align="center" contentEditable="False">

                    {bleachingJobCard && bleachingJobCard[0]?.hydrogen_peroxide}
                  </td>
                  <td colSpan="5" align="center">
                    liters
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">Setilon KN / Persoftal 9490​</td>
                  <td colSpan="5" align="center">
                    1.5-3.5
                  </td>
                  <td colSpan="5" align="center" contentEditable="False">
                    {bleachingJobCard && bleachingJobCard[0]?.setilon_kn}
                  </td>
                  <td colSpan="5" align="center">
                    kgs
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">Citric acid​</td>
                  <td colSpan="5" align="center">
                    6.5-9.5
                  </td>
                  <td colSpan="5" align="center" contentEditable="False">
                    {bleachingJobCard && bleachingJobCard[0]?.citric_acid}
                  </td>
                  <td colSpan="5" align="center">
                    kgs
                  </td>
                </tr>

                <tr>
                  <td colSpan="20">
                    Note: Setilon KN or Persoftal 9490 chemicals should be added
                    only for Crispy finish.
                  </td>
                </tr>

                <tr>
                  <td colspan="20">Remarks: NA</td>
                </tr>

                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Production Supervisor
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Hod /Designee
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    QA
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: "70px",
                      textAlign: "center",
                      verticalAlign: "bottom",
                    }}
                  >

                    {bleachingJobCard &&
                      bleachingJobCard[0]?.supervisor_submit_by}
                    <br />
                    {bleachingJobCard &&
                      bleachingJobCard[0]?.supervisor_submit_on}
                  </td>

                  <td
                    colSpan="7"
                    style={{
                      height: "70px",
                      textAlign: "center",
                      verticalAlign: "bottom",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.hod_submit_by}
                    <br />
                    {bleachingJobCard && bleachingJobCard[0]?.hod_submit_on}
                  </td>

                  <td
                    colSpan="6"
                    style={{
                      height: "70px",
                      textAlign: "center",
                      verticalAlign: "bottom",
                    }}
                  >
                    {bleachingJobCard && bleachingJobCard[0]?.qa_submit_by}
                    <br />
                    {bleachingJobCard && bleachingJobCard[0]?.qa_submit_on}
                  </td>
                </tr>
              </>
            ) : null}
            {listOf.annexure == true ? (
              <>
                <tr>
                  <th colspan="2">Sl. No. </th>
                  <th colspan="5">Equipment Name </th>
                  <th colspan="5">Equipment code </th>
                  <th colspan="4">
                    Date of Calibration <br />
                    (Gauge){" "}
                  </th>
                  <th colspan="4">
                    Calibration due on <br />
                    (Gauge){" "}
                  </th>
                </tr>
                {pecsStateArray &&
                  pecsStateArray.map((x, i) => (
                    <tr key={x.annexureId}>
                      <td align="center" colspan="2">
                        {++i}
                      </td>
                      <td align="center" colspan="5">
                        {x.equipmentName || "NA"}
                      </td>
                      <td align="center" colspan="5">
                        {x.equipmentCode || "NA"}
                      </td>
                      <td align="center" colspan="4">
                        {x.calibrationDate == "NA"
                          ? x.calibrationDate
                          : moment(x.calibrationDate).format("DD/MM/YYYY")}
                      </td>
                      <td align="center" colspan="4">
                        {x.dueDate == "NA"
                          ? x.dueDate
                          : moment(x.dueDate).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  ))}
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="20"></td>
                </tr>
              </>
            ) : null}
          </tbody>

          <br />

          <tfoot className="footer-bmr" style={{ marginBottom: "10px" }}>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Particulars
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Prepared by
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed by
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Apporved by
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Signature & Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

        <Tabs
          style={{
            width: "98%",
            position: "relative",
          }}
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
        <Modal
          footer={false}
          title="Printing"
          open={bleachingModal}
          onCancel={() => setBleachingModal(false)}
          onOk={() => setBleachingModal(false)}
          onClose={() => setBleachingModal(false)}
        >
          <Form>
            <Form.Item label="Choose Batch No">
              <Select
                options={batchLov}
                value={batchNoNew}
                onChange={changeBatchNo}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={confirmPrint}>
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      {contextHolder}
    </Spin>
  );
}

export default Bleaching_Bmr_Summary;
