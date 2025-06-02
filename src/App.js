/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./General/SignIn";
import Welcome from "./General/Welcome";
import ProtectedRoute from "./General/ProtectedRoute";
import LogoutTimer from "./General/LogoutTimer";
// import Bleaching_f01 from "./Bleaching/Bleaching_f01";
import UserCreate from "./General/UserCreate";
import UserList from "./General/UserList";
import UserEdit from "./General/UserEdit";
import ChoosenScreen from "./General/ChoosenScreen";

import Report from "./General/Report";
import BleachingSummary from "./Bleaching/BleachingSummary";
import Bleaching from "./Bleaching/Bleaching";
import Bleaching_f33 from "./Bleaching/Bleaching_f33";
import Bleaching_f04 from "./Bleaching/Bleaching_f04";

import Bleaching_f05 from "./Bleaching/Bleaching_f05";
import Bleaching_f05_summary from "./Bleaching/Bleaching_f05_summary";
import Bleaching_f41 from "./Bleaching/Bleaching_f41";
import Bleaching_f41_Summary from "./Bleaching/Bleaching_f41_Summary";
import Bleaching_f42 from "./Bleaching/Bleaching_f42";

import CreateBMR from "./General/CreateBMR";
import Mapping from "./General/Mapping";
import Bleaching_Mapping from "./General/Bleaching_Mapping";
import Bleaching_f04_summary from "./Bleaching/Bleaching_f04_summary";
import Bleaching_f33_summary from "./Bleaching/Bleaching_f33_summary";
import Bleaching_f42_summary from "./Bleaching/Bleaching_f42_summary";
import Bleach_f11 from "./Bleaching/Bleaching_f11";
import Bleaching_f11_Summary from "./Bleaching/Bleaching_f11_Summary";
import Bleaching_f18 from "./Bleaching/Bleaching_f18";
import Bleaching_f18_summary from "./Bleaching/Bleaching_f18_summary";
import Bleaching_f01_summary from "./Bleaching/Bleaching_f01_summary";
import Bleaching_f01 from "./Bleaching/Bleaching_f01";
import Bmr_Closing from "./General/Bmr_Closing";
import Raw_Material_Issue from "./General/Raw_Material_Issue";
import Bleaching_f08_summary from "./Bleaching/Bleaching_f08_summary";
import Bleaching_f08 from "./Bleaching/Bleaching_f08";
import Bleaching_Bmr_Summary from "./Bleaching/Bleaching_Bmr_Summary";
import Bleaching_f36 from "./Bleaching/Bleaching_f36";
import Bleaching_f36_summary from "./Bleaching/Bleaching_f36_summary";
import Bleaching_f36_edit from "./Bleaching/Bleaching_f36_edit";
import Bleaching_f41_edit from "./Bleaching/Bleaching_f41_edit";
import Bleaching_f38 from "./Bleaching/Bleaching_f38";
import Bleaching_f38_hod_summary from "./Bleaching/Bleaching_f38_hod_summary";
import Bleaching_f38_sup_summary from "./Bleaching/Bleaching_f38_sup_summary";
import Bleaching_f38_edit from "./Bleaching/Bleaching_f38_edit";
import Bleaching_f02A from "./Bleaching/Bleaching_f02-A";
import Bleaching_f02A_edit from "./Bleaching/Bleaching_f02A_edit ";
import Bleaching_f02A_Summary from "./Bleaching/Bleaching_f02-A_Summary";
import Bleaching_f03 from "./Bleaching/Bleaching_f03";
import Bleaching_f03_summary from "./Bleaching/Bleaching_f03_summary";
import Bleaching_f02_edit from "./Bleaching/Bleaching_f02_edit";
import Bleaching_f02 from "./Bleaching/Bleaching_f02";
import Bleaching_f02_Summary from "./Bleaching/Bleaching_f02_summary";
import Bleaching_f13_Summary from "./Bleaching/Bleaching_13_Summary";
import Bleaching_f13 from "./Bleaching/Bleaching_13";
import Bleach_f09 from "./Bleaching/Bleaching_f09";
import Bleaching_f09_Summary from "./Bleaching/Bleaching_f09_Summary";
import Bleaching_f34_Summary from "./Bleaching/Bleaching_f34_Summary";
import Bleaching_f34 from "./Bleaching/Bleaching_f34";
import Bleaching_f16 from "./Bleaching/Bleaching_f16";
import Bleaching_f16_Summary from "./Bleaching/Bleaching_f16_Summary";
import ReprocessSummary from "./Bleaching/ReprocessSummary";
import ReprocessForm from "./Bleaching/Reprocess";
import Storeusers from "./General/Storeusers";
import StoreuserSummary from "./General/StoreuserSummary";
import Spunlace_packing_Material from "./General/Spunlace_Packing_Material";

import ForgetPassword from "./General/forgetpassword";
import Changepassword from "./General/Changepassword";
import Dashboard from "./General/Dashboard";
import Audittrail from "../src/General/Audittrail";
import Traceability from "./General/Traceability";
import SignatureUpload from "./General/SignatureUpload";

import Spunlace_f01_Summary from "./Spunlace/Spunlace_f01_summary";
import Spunlace_f01 from "./Spunlace/Spunlace_f01";
import Spunlace_f02_summary from "./Spunlace/Spunlace_f02_Summary";
import Spunlace_f02 from "./Spunlace/Spunlace_f02";
import Spunlace_f03_summary from "./Spunlace/Spunlace_f03_Summary";
import Spunlace_f03 from "./Spunlace/Spunlace_f03";
import Spunlace_f04_summary from "./Spunlace/Spunlace_f04_summary";
import Spunlace_f04 from "./Spunlace/Spunlace_f04";
import Spunlace_f05 from "./Spunlace/Spunlace_f05";
import Spunlace_f05_summary from "./Spunlace/Spunlace_f05_Summary";
import Spunlace_f06_summary from "./Spunlace/Spunlace_f06_Summary";
import Spunlace_f06 from "./Spunlace/Spunlace_f06";
import Spunlace_f07 from "./Spunlace/Spunlace_f07";
import Spunlace_f07_Summary from "./Spunlace/Spunlace_f07_summary";
import Spunlace_f09_summary from "./Spunlace/Spunlace_f09_summary";
import Spunlace_f08 from "./Spunlace/Spunlace_f08";
import Spunlace_f08_Summary from "./Spunlace/Spunlace_f08_Summary";
import Spunlace_f09 from "./Spunlace/Spunlace_f09";
import Spunlace_f10_summary from "./Spunlace/Spunlace_f10_summary";
import Spunlace_f10 from "./Spunlace/Spunlace_f10";
import Spunlace_f12_summary from "./Spunlace/Spunlace_f12_Summary";
import Spunlace_f12 from "./Spunlace/Spunlace_f12";
import Spunlace_f13_summary from "./Spunlace/Spunlace_f13_Summary";
import Spunlace_f13 from "./Spunlace/Spunlace_f13";
import Spunlace_f16_summary from "./Spunlace/Spunlace_f16_summary";
import Spunlace_f16 from "./Spunlace/Spunlace_f16";
import Spunlace_f19 from "./Spunlace/Spunlace_f19";
import Spunlace_f19_Summary from "./Spunlace/Spunlace_f19_Summary";
import Spunlace_f14 from "./Spunlace/Spunlace_f14";
import Spunlace_f14_summary from "./Spunlace/Spunlace_f14_summary";
import Spunlace_f17 from "./Spunlace/Spunlace_f17";
import Spunlace_f17_Summary from "./Spunlace/Spunlace_f17_Summary";
import Spunlace_f18 from "./Spunlace/Spunlace_f18";
import Spunlace_f18_Summary from "./Spunlace/Spunlace_f18_summary";
import Metal_detector_checklist from "./Reused Codes/Metal_detector_checklist";
import Metal_detector_checklist_Summary from "./Reused Codes/Metal_detector_checklist_Summary";
import Spunlace_f15 from "./Spunlace/Spunlace_f15";
import Spunlace_f15_Summary from "./Spunlace/Spunlace_f15_Summary";
import Spunlace_f24 from "./Spunlace/Spunlace_f24";
import Spunlace_f24_Summary from "./Spunlace/Spunlace_f24_summary";
import Spunlace_f23 from "./Spunlace/Spunlace_f23";
import Spunlace_f23_Summary from "./Spunlace/Spunlace_f23_Summary";
import Spunlace_f25 from "./Spunlace/Spunlace_f25";
import Spunlace_f25_Summary from "./Spunlace/Spunlace_f25_summary";
import Spunlace_f25_edit from "./Spunlace/Spunlace_f25_edit";
import Spunlace_f11_summary from "./Spunlace/Spunlace_f11_Summary";
import Spunlace_f11 from "./Spunlace/Spunlace_f11";
import BmrSummaryRP from "./Spunlace/Spunlace_RP_BMR";
import Spunlace_BMR from "./Spunlace/Spunlace_BMR";

// Pad Punching
import Padpunching_f04 from "./PadPunching/Padpunching_f04";
import Padpunching_f04_summary from "./PadPunching/Padpunching_f04_Summary";
import PadPunching_14 from "./PadPunching/PadPunching_14";
import PadPunching_14_Summary from "./PadPunching/PadPunching_14_Summary";
import PadPunching_f05 from "./PadPunching/PadPunching_f05";
import PadPunching_f05_Summary from "./PadPunching/padPunching_f05_Summary";
import Padpunching_f05_f001 from "./PadPunching/Padpunching_f05_f001";
import Padpunching_f05_f001_Summary from "./PadPunching/Padpunching_f05_f001_Summary";
import PadPunching_f08_Summary from "./PadPunching/PadPunching_f08_Summary";
import PadPunching_f08 from "./PadPunching/PadPunching_f08";
import Padpunching_f24_Summary from "./PadPunching/Padpunching_f24_Summary";
import Padpunching_f24_Edit from "./PadPunching/Padpunching_f24_edit";
import Padpunching_f24 from "./PadPunching/Padpunching_f24";
import HouseKeeping from "./PadPunching/HouseKeepingF010";
import HouseKeepingSummary from "./PadPunching/HouseKeepingSummaryF010";
import HouseKeeping1 from "./PadPunching/HouseKeepingF006";
import HouseKeepingSummary1 from "./PadPunching/HouseKeepingSummaryF006";
import PadPunching_f02_Summary from "./PadPunching/padPunching_f02_Summary";
import PadPunching_f02 from "./PadPunching/PadPunching_f02";
import Padpunching_f00 from "./PadPunching/Padpunching_f00";
import Padpunching_f00_summary from "./PadPunching/Padpunching_f00_summary";
import PadPunching_f03_Summary from "./PadPunching/PadPunching_f03_Summary";
import PadPunching_f03 from "./PadPunching/PadPunching_f03";
import PadPunching_Production_Summary from "./PadPunching/PadPunching_F-01_Production_Summary";
import PadPunching_Production from "./PadPunching/PadPunching_F-01_Production";
import Pad_Punching_BMR from "./PadPunching/Pad_Punching_BMR";

// Dry Goods
import DryGoods_f01 from "./DryGoods/DryGoods_f01";
import DryGoods_f01_Summary from "./DryGoods/DryGoods_f01_Summary";
import DryGoods_F011_Summary from "./DryGoods/DryGoods_F011_Summary";
import DryGoods_F011 from "./DryGoods/DryGoods_F011";
import Drygoods_f03_Summary from "./DryGoods/DryGoods_F003_summary";
import DryGoods_f03 from "./DryGoods/DryGoods_F003";
import DryGoods_F002_Summary from "./DryGoods/DryGoods_F002_Summary";
import DryGoods_F002 from "./DryGoods/DryGoods_F002";
import DryGoods_f06 from "./DryGoods/DryGoods_F006";
import Drygoods_f06_Summary from "./DryGoods/DryGoods_F006_summary";
import DryGoods_f05 from "./DryGoods/DryGoods_f05";
import DryGoods_f05_Summary from "./DryGoods/DryGoods_f05_Summary";
import DryGoods_f10_Summary from "./DryGoods/DryGoods_f10_Summary";
import DryGoods_f10 from "./DryGoods/DryGoods_f10";
import HouseKeepingSummary_14 from "./DryGoods/DryGoods_F14_Summary";
import HouseKeeping_14 from "./DryGoods/DryGoods_F14";
import DryGoods_F012_Summary from "./DryGoods/DryGoods_F012_Summary";
import DryGoods_F012 from "./DryGoods/DryGoods_F012";
import Drygoods_f09_Summary from "./DryGoods/DryGoods_F009_summary";
import DryGoods_f09 from "./DryGoods/DryGoods_F009";
import DryGoods_F013_Summary from "./DryGoods/DryGoods_F013_Summary";
import DryGoods_F013 from "./DryGoods/DryGoods_F013";
import DryGoods_BMR_Pleat from "./DryGoods/DryGoods_BMR_Pleat";
import DryGoods_BMR_WoolRoll from "./DryGoods/DryGoods_BMR_WoolRoll";
import DryGoods_BMR_CottonBall from "./DryGoods/DryGoods_BMR_CottonBall";

// Quality Control...
import QualityControl_f03_Summary from "./QualityControl/QualityControl_f03_Summary";
import QualityControl_f03 from "./QualityControl/QualityControl_f03";
import QualityControl_f01_Form from "./QualityControl/QualityControl_f01_Form";
import QualityControl_f01_Summary from "./QualityControl/QualityControl_f01_Summary";
import QualityControl_Microbiology_Summary from "./QualityControl/QualityControl_Microbiology_Summary";
import QualityControl_Microbiology from "./QualityControl/QualityControl_Microbiological";
import QualityControl_f024 from "./QualityControl/QualityControl_f024";
import QualityControl_f024_Summary from "./QualityControl/QualityControl_f024_Summary";
import QC_f04 from "./QualityControl/QC_f04";
import QC_f04_Summary from "./QualityControl/QC_f04_Summary";
import QualityControl_f05 from "./QualityControl/QualityControl_f05";
import QualityControl_f05_Summary from "./QualityControl/QualityControl_f05_Summary";
import QualityControl_f11 from "./QualityControl/QualityControl_f11";
import QualityControl_f11_Summary from "./QualityControl/QualityControl_f11_Summary";
import QualityControl_f13 from "./QualityControl/QualityControl_f13";
import QualityControl_f13_Summary from "./QualityControl/QualityControl_f13_Summary";
import QualityControl_f16 from "./QualityControl/QualityControl_f16";
import QualityControl_f16_Summary from "./QualityControl/QualityControl_f16_Summary";
import QualityControl_f013 from "./QualityControl/QualityControl_f013";
import QualityControl_f013_Summary from "./QualityControl/QualityControl_f013_Summary";
import QualityControl_f15 from "./QualityControl/QualityControl_f15";
import QualityControl_f15_Summary from "./QualityControl/QualityControl_f15_Summary";
import QualityControl_f17 from "./QualityControl/QualityControl_f17";
import QualityControl_f17_Summary from "./QualityControl/QualityControl_f17_Summary";
import QualityControl_f19_Summary from "./QualityControl/QualityControl_f19_Summary";
import QualityControl_f19 from "./QualityControl/QualityControl_f19";
// import QualityControl_f19_bck from "./QualityControl/QualityControl_f19_bck";
// import QualityControl_f20 from "./QualityControl/QualityControl_f20";
// import QualityControl_f20_Summary from "./QualityControl/QualityControl_f20_Summary";
import QualityControl_f25 from "./QualityControl/QualityControl_f25";
import QualityControl_f25_Summary from "./QualityControl/QualityControl_f25_Summary";
import QualityControl_f28 from "./QualityControl/QualityControl_f28";
import QualityControl_f28_Summary from "./QualityControl/QualityControl_f28_Summary";
import QualityControl_f002 from "./QualityControl/QualityControl_f002";
import QualityControl_InwardBook_Summary from "./QualityControl/QualityControl_InwardBook_Summary";
import QualityControl_f001 from "./QualityControl/QualityControl_f001";
import QualityControl_f003 from "./QualityControl/QualityControl_f003";
import QualityControl_AR_f012 from "./QualityControl/QualityControl_AR_f012";
import QualityControl_AR_f012_Summary from "./QualityControl/QualityControl_AR_f012_Summary";
import QualityControl_AR_f014 from "./QualityControl/QualityControl_AR_f014";
import QualityControl_AR_f014_Summary from "./QualityControl/QualityControl_AR_f014_Summary";
import QualityControl_f26_Summary from "./QualityControl/QualityControl_f26_Summary";
import QualityControl_f26 from "./QualityControl/QualityControl_f26";
import QualityControl_f26A_Summary from "./QualityControl/QualityControl_f26A_Summary";
import QualityControl_f26A from "./QualityControl/QualityControl_f26A";
import QualityControl_AR_f005_Summary from "./QualityControl/QualityControl_AR_f005_Summary";
import QualityControl_AR_f005 from "./QualityControl/QualityControl_AR_f005";
import QualityControl_f26B_Summary from "./QualityControl/QualityControl_f26B_Summary";
import QualityControl_f26B from "./QualityControl/QualityControl_f26B";
import QualityControl_f26C from "./QualityControl/QualityControl_f26C";
import QualityControl_f26C_Summary from "./QualityControl/QualityControl_f26C_Summary";
import QualityControl_f26D from "./QualityControl/QualityControl_f26D";
import QualityControl_f26D_Summary from "./QualityControl/QualityControl_f26D_Summary";
import QualityControl_f26E from "./QualityControl/QualityControl_f26E";
import QualityControl_f26E_Summary from "./QualityControl/QualityControl_f26E_Summary";
import QualityControl_f26F from "./QualityControl/QualityControl_f26F";
import QualityControl_f26F_Summary from "./QualityControl/QualityControl_f26F_Summary";
import QualityControl_f26G from "./QualityControl/QualityControl_f26G";
import QualityControl_f26G_Summary from "./QualityControl/QualityControl_f26G_Summary";
import QualityControl_f008_Summary from "./QualityControl/QualityControl_f008_Summary";
import QualityControl_f008 from "./QualityControl/QualityControl_f008";
import QualityControl_f010 from "./QualityControl/QualityControl_f010";
import QualityControl_f010_Summary from "./QualityControl/QualityControl_f010_Summary";
import QualityControl_f23 from "./QualityControl/QualityControl_f23";
import QualityControl_f23_Summary from "./QualityControl/QualityControl_f23_Summary";
import QualityControl_f007_Summary from "./QualityControl/QualityControl_f007_Summary";
import QualityControl_f007 from "./QualityControl/QualityControl_f007";
import QualityControl_f014 from "./QualityControl/QualityControl_f014";
import QualityControl_f014_Summary from "./QualityControl/QualityControl_f014_Summary";
import QualityControl_f009_Summary from "./QualityControl/QualityControl_f009_Summary";
import QualityControl_f009 from "./QualityControl/QualityControl_f009";
import QualityControl_f018 from "./QualityControl/QualityControl_f018";
import QualityControl_f018_Summary from "./QualityControl/QualityControl_f018_Summary";
import QualityControl_f20 from "./QualityControl/QualityControl_f20";
import QualityControl_f20_Summary from "./QualityControl/QualityControl_f20_Summary";

import PHQCL01F012 from "./QualityControl/PHQCL01F012";
import QualityControl_f012_Summary from "./QualityControl/PHQCL01F012_Summary";

import QualityControl_f006_Summary from "./QualityControl/QualityControl_f006_Summary";
import QualityControl_f006 from "./QualityControl/QualityControl_f006";

import QualityControl_f021 from "./QualityControl/QualityControl_f021";
import QualityControl_f021_Summary from "./QualityControl/QualityControl_f021_Summary";
import QualityControl_f027_Summary from "./QualityControl/PHQCL01F027_Summary";
import PHQCL01F027 from "./QualityControl/PHQCL01F027";
import QualityControl_AR_f02 from "./QualityControl/QualityControl_AR_f02";
import QualityControl_AR_f02_Summary from "./QualityControl/QualityControl_AR_f02_Summary";

import QualityControl_ARf006 from "./QualityControl/QualityControl_AR-F-006";
import QualityControl_ARf006_Summary from "./QualityControl/QualityControl_AR-F-006_Summary";

import QualityControl_AR_f04 from "./QualityControl/QualityControl_AR_f04";
import QualityControl_AR_f04_Summary from "./QualityControl/QualityControl_AR_f04_Summary";

import QualityControl_f030_Summary from "./QualityControl/PHQCL01F030_Summary";
import QualityControl_f030 from "./QualityControl/PHQCL01F030";

import QualityControl_AR_f07 from "./QualityControl/QualityControl_AR_f07";
import QualityControl_AR_f07_Summary from "./QualityControl/QualityControl_AR_f07_Summary";
import QC_f07 from "./QualityControl/QC_f07";
import QC_f07_Summary from "./QualityControl/QC_f07_Summary";
import QualityControl_f022 from "./QualityControl/QualityControl_f022";
import QualityControl_f022_Summary from "./QualityControl/QualityControl_f022_Summary";
import QualityControl_f029 from "./QualityControl/QualityControl_f029";
import QualityControl_f029_Summary from "./QualityControl/QualityControl_f029_Summary";
import QC_f05_Summary from "./QualityControl/QC_f05_Summary";
import QC_f05 from "./QualityControl/QC_f05";
import QualityControl_ARF011_Summary from "./QualityControl/QualityControl_ARF_011_Summary";
import QualityControl_ARF011 from "./QualityControl/QualityControl_ARF_011";

// Quality Assurance......
import QA_list_of_sharp_summary from "./QualityAssurance/QA_F-01_Summary";
import QA_list_of_sharp from "./QualityAssurance/QA_F-01";
import QA_PestControl from "./QualityAssurance/QA_PestControl";
import QA_PestControl_Summary from "./QualityAssurance/QA_PestControl_Summary";
import QA_f01_Summary from "./QualityAssurance/QA_f01_Summary";
import QA_f01 from "./QualityAssurance/QA_F01";
import RodentBoxSummary from "./QualityAssurance/RodentBoxSummary";
import RodentBoxFull from "./QualityAssurance/RodentBoxFull";
import QA_F018_Summary from "./QualityAssurance/QA_F-018_Summary";
import QA_F018 from "./QualityAssurance/QA_F-018";
import QA_f15_Summary from "./QualityAssurance/QA_f15_Summary";
import QA_f15 from "./QualityAssurance/QA_f15";
import QA_Inward029 from "./QualityAssurance/QA-Inward029";
import QA_Inward029_Sum from "./QualityAssurance/QA-Inward029_Summary";
import QA_Inward030_Sum from "./QualityAssurance/QA-inward030_Summary";
import QA_Inward030 from "./QualityAssurance/QA-inward030";
import QA_Inward031 from "./QualityAssurance/QA-Inward031";
import QA_Inward031_Sum from "./QualityAssurance/QA-Inward031_Summary";
import QA_Inward032 from "./QualityAssurance/QA-Inward032";
import QA_Inward032_Sum from "./QualityAssurance/QA-Inward032_Summary";
import QA_Inward033 from "./QualityAssurance/QA-Inward33";
import QA_Inward033_Sum from "./QualityAssurance/QA-inward033_Summary";
import CustomerComplaint from "./QualityAssurance/QA_F019";
import QA_F019_summary from "./QualityAssurance/QA_F019_summary";
import QA_F002_Summary from "./QualityAssurance/QA_F-002_Summary";
import QA_F002 from "./QualityAssurance/QA_F-002";
import QA_F01_Summary from "./QualityAssurance/QA_F-01_Summary";
import QA_F01 from "./QualityAssurance/QA_F-01";
import QualityAssurance_f010_internal_audit_schedule from "./QualityAssurance/QualityAssurance_f010_internal_audit_schedule";
import QA_f010_internal_audit_schedule_summary from "./QualityAssurance/QA_f010_internal_audit_schedule_summary";
import QA_f16 from "./QualityAssurance/QA_f16";
import QA_f16_Summary from "./QualityAssurance/QA_f16_Summary";
import QA_F017_Summary from "./QualityAssurance/QA_F017_Summary";
import QA_F017 from "./QualityAssurance/QA_F017";
import QA_f39_summary from "./QualityAssurance/QA_f39_Summary";
import QA_f39 from "./QualityAssurance/QA_f39";
import QA_F013_Summary from "./QualityAssurance/QA_F013_Summary";
import QA_F013 from "./QualityAssurance/QA_F013";
import QA_F21_Summary from "./QualityAssurance/QA_F-21_Summary";
import QA_f14 from "./QualityAssurance/QAD01-F-014";
import QA_f14_Summary from "./QualityAssurance/QAD01-F-014_Summary";
import QA_f22 from "./QualityAssurance/QAD01-F-022";
import QA_f22_Summary from "./QualityAssurance/QAD01-F-022_summary";
import QA_f23 from "./QualityAssurance/QAD01-F023";
import QA_f23_Summary from "./QualityAssurance/QAD01-F023_Summary";
import QA_f034_Inprocess_Inspection_Report from "./QualityAssurance/QA_f034_Inprocess_Inspection_Report";
import QA_f012_internal_audit_report from "./QualityAssurance/QA_f012_internal_audit_report";
import QA_f012_internal_audit_report_summary from "./QualityAssurance/QA_f012_internal_audit_report_summary";
import QA_f034_Inprocess_Inspection_Report_summary from "./QualityAssurance/QA_f034_Inprocess_Inspection_Report_summary";
import QA_f035_Inprocess_Inspection_Report_summary from "./QualityAssurance/QA_f035_Inprocess_Inspection_Report_Summary";
import QA_f035_Inprocess_Inspection_Report from "./QualityAssurance/QA_f035_Inprocess_Inspection_Report";
import QA_f036_Inprocess_Inspection_Report_summary from "./QualityAssurance/QA_f036_Inprocess_Inspection_Report_Summary";
import QA_f036_Inprocess_Inspection_Report from "./QualityAssurance/QA_f036_Inprocess_Inspection_Report";
import QA_F49_Summary from "./QualityAssurance/QA_F-49_Summary";
import QA_F49 from "./QualityAssurance/QA_F-49";
import QA_f26_Summary from "./QualityAssurance/QA_f26_Summary";
import QA_f26 from "./QualityAssurance/QA_f26";
import QualityAssurance_f45_Summary from "./QualityAssurance/QualityAssurance_f45_Summary";
import QualityAssurance_f45 from "./QualityAssurance/QualityAssurance_f45";
import QualityAssurance_f51_Summary from "./QualityAssurance/QualityAssurance_f51_Summary";
import QualityAssurance_f51 from "./QualityAssurance/QualityAssurance_f51";
import QA_f52_Summary from "./QualityAssurance/QA_f52_Summary";
import QA_f52 from "./QualityAssurance/QA_f52";
import QA_f58_Summary from "./QualityAssurance/QA_f58_Summary";
import QA_f58 from "./QualityAssurance/QA_f58";
import QA_F59_Summary from "./QualityAssurance/QA_F-59_Summary";
import QA_F59 from "./QualityAssurance/QA_F-59";
import QualityAssurance_f43_Summary from "./QualityAssurance/QualityAssurance_f43_Summary";
import QualityAssurance_f43 from "./QualityAssurance/QualityAssurance_f43";
import QA_f50 from "./QualityAssurance/QAD01-F050";
import QA_f50_Summary from "./QualityAssurance/QAD01-F050_Summary";
import QA_F042_Summary from "./QualityAssurance/QualityAssurance_f042_Summary";
import QA_F042 from "./QualityAssurance/QualityAssurance_f042";
import QA_F048 from "./QualityAssurance/QA_F048";
import QA_F048_Summary from "./QualityAssurance/QA_F048_Summary";
import QA_f06 from "./QualityAssurance/QA_f06";
import QA_f06_Summary from "./QualityAssurance/QA_f06_Summary";
import QA_F007_TrainingRec_summary from "./QualityAssurance/QA_F007_TrainingRec_summary";
import QA_F007_TrainingRec from "./QualityAssurance/QA_F007_TrainingRec";
import QA_f62 from "./QualityAssurance/QA_f62";
import QAD01_005 from "./QualityAssurance/QAD01-F-005_Summary";
import QA_f005 from "./QualityAssurance/QAD01-F-005";
import QA_f60 from "./QualityAssurance/QAD01-F060";
import QA_f60_Summary from "./QualityAssurance/QAD01-F060_Summary";
import QualityAssurance_f27_Summary from "./QualityAssurance/QualityAssurance_f27_Summary";
import QualityAssurance_f27 from "./QualityAssurance/QualityAssurance_f27";
import QA_f029_new_sample_request from "./QualityAssurance/QA_f029_NEW SAMPLE REQUEST";
import QA_f029_new_sample_request_summary from "./QualityAssurance/QA_f029_NEW SAMPLE REQUEST_summary";
import QA_F047_Summary from "./QualityAssurance/QualityAssurance_f047_Summary";
import QA_F047 from "./QualityAssurance/QualityAssurance_f047";
import QA_F_041 from "./QualityAssurance/QA_F_041";
import QA_F_041_Summary from "./QualityAssurance/QA_F_041_Summary";
import QA_F028_AnnualProductReview_Summary from "./QualityAssurance/QA_F028_AnnualProductReview_Summary";
import QA_F028_AnnualProductReview from "./QualityAssurance/QA_F028_AnnualProductReview";
import QualityAssurance_f40_Summary from "./QualityAssurance/QualityAssurance_f40_Summary";
import QualityAssurance_f40 from "./QualityAssurance/QualityAssurance_f40";
import QA_F09 from "./QualityAssurance/QA_F-09";
import QA_F09_Summary from "./QualityAssurance/QA_F-09_Summary";
import QA_F008_Summary from "./QualityAssurance/QualityAssurance_f008_Summary";
import QA_F008 from "./QualityAssurance/QualityAssurance_f008";
import QA_F_046 from "./QualityAssurance/QA_F_046";
import QA_F_046_Summary from "./QualityAssurance/QA_F_046-Summary";
import QA_f076_training_session_allotment_register_summary from "./QualityAssurance/QA_f076_training_session_allotment_register_summary";
import QA_f076_training_session_allotment_register from "./QualityAssurance/QA_f076_training_session_allotment_register";
import QA_f25 from "./QualityAssurance/QA_F-025_Traceability";
import QA_f25_Summary from "./QualityAssurance/QA_F-025_Traceability_Summary";
import QA_f044_Corrective from "./QualityAssurance/QA_f044_Corrective";
import QA_f044_Corrective_summary from "./QualityAssurance/QA_f044_Corrective_summary";
import QA_F037_Summary from "./QualityAssurance/QA_F037_summary";
import QA_F037 from "./QualityAssurance/QA_F037";
import QA_F020_Summary from "./QualityAssurance/QA_F020_Summary";
import QA_F020 from "./QualityAssurance/QA_F020";
import QA_f03 from "./QualityAssurance/QA_f03";
import QA_f03_Summary from "./QualityAssurance/QA_f03_Summary";

// Store Form.......
import Stores_f003_Summary from "./Store/Stores_f003_summary";
import Stores_f001_summary from "./Store/Stores_f001_summary";
import Stores_f001 from "./Store/Stores_f001";
import Store_f003 from "./Store/Stores_f003";
import Stores_f006_Summary from "./Store/Stores_f006_summary";
import Store_f006 from "./Store/Stores_f006";
import Stores_f008_Summary from "./Store/Stores_f008_summary";
import Store_f008 from "./Store/Stores_f008";
import Stores_f009_Summary from "./Store/Stores_f009_summary";
import Store_f009 from "./Store/Stores_f009";

// PPC Form.........
import PPC_f002_summary from "./PPC/PPC_f002_summary";
import PPC_f002 from "./PPC/PPC_f002";
import PPC_f003_summary from "./PPC/PPC_f003_summary";
import PPC_f003 from "./PPC/PPC_f003";
import PPC_f004_summary from "./PPC/PPC_f004_summary";
import PPC_f004 from "./PPC/PPC_f004";

import Dispatch_f001_summary from "./Dispatch/Dispatch_f001_Summary";
import Dispatch_f001 from "./Dispatch/Dispatch_f001";
import Development_f001_summary from "./Development/Development_f001_Summary";
import Development_f001 from "./Development/Development_f001";

import Engineering_FC004_Summary from "./Engineering/Enginnering_FC004_Summary";
import Engineering_FC004 from "./Engineering/Engineering_FC004";

import Engineering_FC020_Summary from "./Engineering/Enginnering_FC020_Summary";
import Engineering_FC020 from "./Engineering/Engineering_FC020";

import Engineering_FC016_Summary from "./Engineering/Enginnering_FC016_Summary";
import Engineering_FC016 from "./Engineering/Engineering_FC016";

import Engineering_FC003_Summary from "./Engineering/Enginnering_FC003_Summary";
import Engineering_FC003 from "./Engineering/Engineering_FC003";

// Buds

import COTTON_BUDS_f04_Summary from "./CottonBuds/COTTON_BUDS_f04_Summary";
import COTTON_BUDS_f04 from "./CottonBuds/COTTON_BUDS_f04";

import COTTON_BUDS_f02_Summary from "./CottonBuds/COTTON_BUDS_f02_Summary";
import COTTON_BUDS_f02 from "./CottonBuds/COTTON_BUDS_f02";

import CottonBuds_BMR from "./CottonBuds/CottonBuds_BMR";
import Buds_F038 from "./CottonBuds/Buds_f038";
import Buds_F038_Summary from "./CottonBuds/Buds_f038_Summary";
import COTTON_BUDS_F002 from "./CottonBuds/COTTON_BUDS_F002";
import COTTON_BUDS_F002_Summary from "./CottonBuds/COTTON_BUDS_F002_Summary";
import BudsF001EquipSummary from "./CottonBuds/budsF001EquipSummary";
import BudsF001Equip from "./CottonBuds/budsF001Equip";

function App() {
  return (
    <BrowserRouter>
      {/* <LogoutTimer />  */}
      <Routes>
        <Route
          path="/Precot/signatureUpload"
          element={
            <ProtectedRoute>
              <SignatureUpload />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Traceability"
          element={
            <ProtectedRoute>
              <Traceability />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/PackingMaterial"
          element={
            <ProtectedRoute>
              <Spunlace_packing_Material />
            </ProtectedRoute>
          }
        />
        <Route path="/Precot" element={<SignIn />} />
        <Route
          path="/Precot/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/Precot/usercreate"
          element={
            <ProtectedRoute>
              <UserCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/userlist"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/useredit/:id"
          element={
            <ProtectedRoute>
              <UserEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/choosenScreen"
          element={
            <ProtectedRoute>
              <ChoosenScreen />
            </ProtectedRoute>
          }
        />
                <Route
          path="/Precot/reportDown"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/BleachingSummary"
          element={
            <ProtectedRoute>
              <BleachingSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/storeuser"
          element={
            <ProtectedRoute>
              {" "}
              <Storeusers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/storeusersummary"
          element={
            <ProtectedRoute>
              <StoreuserSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/bleaching"
          element={
            <ProtectedRoute>
              <Bleaching />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-01/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f01_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-01"
          element={
            <ProtectedRoute>
              <Bleaching_f01 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-33"
          element={
            <ProtectedRoute>
              <Bleaching_f33 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-04"
          element={
            <ProtectedRoute>
              <Bleaching_f04 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-05"
          element={
            <ProtectedRoute>
              <Bleaching_f05 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-05/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f05_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-41"
          element={
            <ProtectedRoute>
              <Bleaching_f41 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-41/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f41_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-41/edit"
          element={
            <ProtectedRoute>
              <Bleaching_f41_edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-42"
          element={
            <ProtectedRoute>
              <Bleaching_f42 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-42/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f42_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Generate"
          element={
            <ProtectedRoute>
              <CreateBMR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Mapping"
          element={
            <ProtectedRoute>
              <Mapping />
            </ProtectedRoute>
          }
        />
          <Route
          path="/Precot/Bleaching_Mapping"
          element={
            <ProtectedRoute>
              <Bleaching_Mapping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-04/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f04_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-33/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f33_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-11"
          element={
            <ProtectedRoute>
              <Bleach_f11 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-11/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f11_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-18"
          element={
            <ProtectedRoute>
              <Bleaching_f18 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-18/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f18_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Closing"
          element={
            <ProtectedRoute>
              <Bmr_Closing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/RawMaterialIssue"
          element={
            <ProtectedRoute>
              <Raw_Material_Issue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-08"
          element={
            <ProtectedRoute>
              <Bleaching_f08 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-08/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f08_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/BMR/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_Bmr_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-36"
          element={
            <ProtectedRoute>
              <Bleaching_f36 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-36/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f36_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-36/Edit"
          element={
            <ProtectedRoute>
              <Bleaching_f36_edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-38"
          element={
            <ProtectedRoute>
              <Bleaching_f38 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-38/HOD_Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f38_hod_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-38/Supervisor_Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f38_sup_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-38/Edit/:id"
          element={
            <ProtectedRoute>
              <Bleaching_f38_edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-02A"
          element={
            <ProtectedRoute>
              <Bleaching_f02A />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-02A/Edit"
          element={
            <ProtectedRoute>
              <Bleaching_f02A_edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-02A/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f02A_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-03"
          element={
            <ProtectedRoute>
              <Bleaching_f03 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-03/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f03_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-02/Edit"
          element={
            <ProtectedRoute>
              <Bleaching_f02_edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-02"
          element={
            <ProtectedRoute>
              <Bleaching_f02 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-02/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f02_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-13"
          element={
            <ProtectedRoute>
              <Bleaching_f13 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-13/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f13_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-09"
          element={
            <ProtectedRoute>
              <Bleach_f09 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Report/Generation"
          element={
            <ProtectedRoute>
              <Audittrail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-09/create"
          element={
            <ProtectedRoute>
              <Bleach_f09 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-09/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f09_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-34"
          element={
            <ProtectedRoute>
              <Bleaching_f34 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-34/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f34_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-16"
          element={
            <ProtectedRoute>
              <Bleaching_f16 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Bleaching/F-16/Summary"
          element={
            <ProtectedRoute>
              <Bleaching_f16_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/ReprocessSummary"
          element={
            <ProtectedRoute>
              <ReprocessSummary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/Reprocess"
          element={
            <ProtectedRoute>
              <ReprocessForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/Bleaching/forgetpassword"
          element={
            <ProtectedRoute>
              <ForgetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/api/auth/updateNewPassword/resetPwd/:token"
          element={<Changepassword />}
        />
        {/* spunlace departement */}
        <Route
          path="/Precot/Spunlace/F-01"
          element={
            <ProtectedRoute>
              <Spunlace_f01 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-01/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f01_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-02"
          element={
            <ProtectedRoute>
              <Spunlace_f02 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-02/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f02_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-03"
          element={
            <ProtectedRoute>
              <Spunlace_f03 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-03/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f03_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-04/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <Spunlace_f04_summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-04"
          element={
            <ProtectedRoute>
              {" "}
              <Spunlace_f04 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-05/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f05_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-05"
          element={
            <ProtectedRoute>
              <Spunlace_f05 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-06"
          element={
            <ProtectedRoute>
              <Spunlace_f06 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-06/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f06_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-07/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f07_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-07"
          element={
            <ProtectedRoute>
              <Spunlace_f07 />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/Precot/Spunlace/F-08" element={<ProtectedRoute><Spunlace_f08 /></ProtectedRoute>} />
          <Route path="/Precot/Spunlace/F-08/Summary" element={<ProtectedRoute><Spunlace_f08_summary/></ProtectedRoute>} /> */}
        <Route
          path="/Precot/Spunlace/F-09/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <Spunlace_f09_summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-09"
          element={
            <ProtectedRoute>
              {" "}
              <Spunlace_f09 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-10"
          element={
            <ProtectedRoute>
              <Spunlace_f10 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-10/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f10_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-11/Summary"
          element={<Spunlace_f11_summary />}
        />
        <Route path="/Precot/Spunlace/F-11" element={<Spunlace_f11 />} />
        <Route
          path="/Precot/Spunlace/F-12"
          element={
            <ProtectedRoute>
              <Spunlace_f12 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-12/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f12_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-13"
          element={
            <ProtectedRoute>
              <Spunlace_f13 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-13/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f13_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-16"
          element={
            <ProtectedRoute>
              <Spunlace_f16 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-16/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f16_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-20"
          element={
            <ProtectedRoute>
              <Metal_detector_checklist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-20/Summary"
          element={
            <ProtectedRoute>
              <Metal_detector_checklist_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-19"
          element={
            <ProtectedRoute>
              <Spunlace_f19 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-19/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f19_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-14"
          element={
            <ProtectedRoute>
              <Spunlace_f14 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-14/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f14_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-17"
          element={
            <ProtectedRoute>
              <Spunlace_f17 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-17/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f17_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-18/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f18_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-18"
          element={
            <ProtectedRoute>
              <Spunlace_f18 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-08"
          element={
            <ProtectedRoute>
              <Spunlace_f08 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-08/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f08_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-15/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f15_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-15"
          element={
            <ProtectedRoute>
              <Spunlace_f15 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-24/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f24_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-24"
          element={
            <ProtectedRoute>
              <Spunlace_f24 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-23/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f23_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-23"
          element={
            <ProtectedRoute>
              <Spunlace_f23 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-25/Edit"
          element={
            <ProtectedRoute>
              <Spunlace_f25_edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-25/Summary"
          element={
            <ProtectedRoute>
              <Spunlace_f25_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-25"
          element={
            <ProtectedRoute>
              <Spunlace_f25 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-21/BMR-RP"
          element={
            <ProtectedRoute>
              <BmrSummaryRP />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Spunlace/F-26"
          element={
            <ProtectedRoute>
              <Spunlace_BMR />
            </ProtectedRoute>
          }
        />

        {/* Pad Punching Forms */}
        <Route
          path="/Precot/PadPunching/F-02/Summary"
          element={
            <ProtectedRoute>
              <PadPunching_f02_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-02"
          element={
            <ProtectedRoute>
              <PadPunching_f02 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-04/Summary"
          element={
            <ProtectedRoute>
              <Padpunching_f04_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-04"
          element={
            <ProtectedRoute>
              <Padpunching_f04 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-14/Summary"
          element={
            <ProtectedRoute>
              <PadPunching_14_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-14"
          element={
            <ProtectedRoute>
              <PadPunching_14 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-05"
          element={
            <ProtectedRoute>
              <PadPunching_f05 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-05/Summary"
          element={
            <ProtectedRoute>
              <PadPunching_f05_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-05_f001"
          element={
            <ProtectedRoute>
              {" "}
              <Padpunching_f05_f001 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-05_f001/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <Padpunching_f05_f001_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-08/Summary"
          element={
            <ProtectedRoute>
              <PadPunching_f08_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-08"
          element={
            <ProtectedRoute>
              <PadPunching_f08 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-06/Summary"
          element={
            <ProtectedRoute>
              <Padpunching_f24_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-06/edit"
          element={
            <ProtectedRoute>
              <Padpunching_f24_Edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-06"
          element={
            <ProtectedRoute>
              <Padpunching_f24 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/houseKeepingSummaryF010"
          element={<HouseKeepingSummary />}
        />
        <Route
          path="/Precot/PadPunching/houseKeepingF010"
          element={<HouseKeeping />}
        />
        <Route
          path="/Precot/PadPunching/houseKeepingSummaryF006"
          element={<HouseKeepingSummary1 />}
        />
        <Route
          path="/Precot/PadPunching/houseKeepingF006"
          element={<HouseKeeping1 />}
        />
        <Route
          path="/Precot/PadPunching/F-17"
          element={
            <ProtectedRoute>
              <Metal_detector_checklist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-17/Summary"
          element={
            <ProtectedRoute>
              <Metal_detector_checklist_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-00/Summary"
          element={<Padpunching_f00_summary />}
        />
        <Route path="/Precot/PadPunching/F-00" element={<Padpunching_f00 />} />
        <Route
          path="/Precot/PadPunching/F-03/Summary"
          element={
            <ProtectedRoute>
              <PadPunching_f03_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-03"
          element={
            <ProtectedRoute>
              <PadPunching_f03 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-01/Summary"
          element={
            <ProtectedRoute>
              <PadPunching_Production_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-01"
          element={
            <ProtectedRoute>
              <PadPunching_Production />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PadPunching/F-009"
          element={
            <ProtectedRoute>
              <Pad_Punching_BMR />
            </ProtectedRoute>
          }
        />

        {/* Dry Goods */}
        <Route
          path="/Precot/DryGoods/F-01/Summary"
          element={
            <ProtectedRoute>
              <DryGoods_f01_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-01"
          element={
            <ProtectedRoute>
              <DryGoods_f01 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-011/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <DryGoods_F011_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-011"
          element={
            <ProtectedRoute>
              {" "}
              <DryGoods_F011 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-03/Summary"
          element={
            <ProtectedRoute>
              <Drygoods_f03_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-03"
          element={
            <ProtectedRoute>
              <DryGoods_f03 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-002/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <DryGoods_F002_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-002"
          element={
            <ProtectedRoute>
              {" "}
              <DryGoods_F002 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-06/Summary"
          element={
            <ProtectedRoute>
              <Drygoods_f06_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-06"
          element={
            <ProtectedRoute>
              <DryGoods_f06 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-05/Summary"
          element={
            <ProtectedRoute>
              <DryGoods_f05_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-05"
          element={
            <ProtectedRoute>
              <DryGoods_f05 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-10/Summary"
          element={
            <ProtectedRoute>
              <DryGoods_f10_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-10"
          element={
            <ProtectedRoute>
              <DryGoods_f10 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-14/summary"
          element={
            <ProtectedRoute>
              <HouseKeepingSummary_14 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-14"
          element={
            <ProtectedRoute>
              <HouseKeeping_14 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-012/Summary"
          element={
            <ProtectedRoute>
              <DryGoods_F012_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-012"
          element={
            <ProtectedRoute>
              <DryGoods_F012 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-09/Summary"
          element={
            <ProtectedRoute>
              <Drygoods_f09_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-09"
          element={
            <ProtectedRoute>
              <DryGoods_f09 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-013/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <DryGoods_F013_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-013"
          element={
            <ProtectedRoute>
              {" "}
              <DryGoods_F013 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-07/BMRSummary/Pleat"
          element={
            <ProtectedRoute>
              <DryGoods_BMR_Pleat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-08/BMRSummary/WoolRoll"
          element={
            <ProtectedRoute>
              <DryGoods_BMR_WoolRoll />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/DryGoods/F-08/BMRSummary/CottonBall"
          element={
            <ProtectedRoute>
              <DryGoods_BMR_CottonBall />
            </ProtectedRoute>
          }
        />

        {/* Quality Control */}
        <Route
          path="/Precot/QualityControl/F-03/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f03_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-03"
          element={
            <ProtectedRoute>
              <QualityControl_f03 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/Microbiology/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_Microbiology_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/Microbiology"
          element={
            <ProtectedRoute>
              <QualityControl_Microbiology />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QC/F-04/Summary"
          element={
            <ProtectedRoute>
              <QC_f04_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QC/F-04"
          element={
            <ProtectedRoute>
              <QC_f04 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-005/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f05_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-005"
          element={
            <ProtectedRoute>
              <QualityControl_f05 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-007/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f007_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-007"
          element={
            <ProtectedRoute>
              <QualityControl_f007 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-011/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f11_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-011"
          element={
            <ProtectedRoute>
              <QualityControl_f11 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-13/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f13_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-13"
          element={
            <ProtectedRoute>
              <QualityControl_f13 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-013/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f013_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-013"
          element={
            <ProtectedRoute>
              <QualityControl_f013 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR_F-014/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f014_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR_F-014"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f014 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-015/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f15_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-015"
          element={
            <ProtectedRoute>
              <QualityControl_f15 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-016/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f16_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-016"
          element={
            <ProtectedRoute>
              <QualityControl_f16 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-017/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f17_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-017"
          element={
            <ProtectedRoute>
              <QualityControl_f17 />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/Precot/QualityControl/F-020/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f20_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-020"
          element={
            <ProtectedRoute>
              <QualityControl_f20 />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/Precot/QualityControl/F-019/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f19_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-019"
          element={
            <ProtectedRoute>
              <QualityControl_f19 />{" "}
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/Precot/QualityControl/F-019/:id"
          element={
            <ProtectedRoute>
              <QualityControl_f19 />{' '}
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/Precot/QualityControl/F-020/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f20_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-020"
          element={
            <ProtectedRoute>
              <QualityControl_f20 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/F-028/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f28_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-028"
          element={
            <ProtectedRoute>
              <QualityControl_f28 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/InwardBook/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_InwardBook_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-002"
          element={
            <ProtectedRoute>
              <QualityControl_f002 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-001"
          element={
            <ProtectedRoute>
              <QualityControl_f001 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-003"
          element={
            <ProtectedRoute>
              <QualityControl_f003 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR_F-012"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f012 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR_F-012/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f012_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PH-QCL01-AR-F-001/edit/"
          element={
            <ProtectedRoute>
              <QualityControl_f01_Form />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PH-QCL01-AR-F-001/Summary/"
          element={
            <ProtectedRoute>
              <QualityControl_f01_Summary />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="precot/QualityControl/PH-QCF-012"
          element={
            <ProtectedRoute>
              <PHQCL01F012 />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/Precot/QualityControl/AR_F-005"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f005 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR_F-005/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f005_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/precot/QualityControl/F-025/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f25_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/precot/QualityControl/F-025"
          element={
            <ProtectedRoute>
              <QualityControl_f25 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/F-026/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026"
          element={
            <ProtectedRoute>
              <QualityControl_f26 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026A"
          element={
            <ProtectedRoute>
              <QualityControl_f26A />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026A/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26A_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026C/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26C_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026C"
          element={
            <ProtectedRoute>
              <QualityControl_f26C />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026B/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26B_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026B"
          element={
            <ProtectedRoute>
              <QualityControl_f26B />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026D/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26D_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026D"
          element={
            <ProtectedRoute>
              <QualityControl_f26D />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026E/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26E_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026E"
          element={
            <ProtectedRoute>
              <QualityControl_f26E />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026F/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26F_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026F"
          element={
            <ProtectedRoute>
              <QualityControl_f26F />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026G/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f26G_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-026G"
          element={
            <ProtectedRoute>
              <QualityControl_f26G />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-024"
          element={
            <ProtectedRoute>
              <QualityControl_f024 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-024/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f024_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-008"
          element={
            <ProtectedRoute>
              <QualityControl_f008 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-008/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f008_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-010"
          element={
            <ProtectedRoute>
              <QualityControl_f010 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-010/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f010_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/F-023/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f23_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-023"
          element={
            <ProtectedRoute>
              <QualityControl_f23 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-014"
          element={
            <ProtectedRoute>
              <QualityControl_f014 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-014/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f014_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-009"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f009 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-009/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f009_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-018"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f018 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-018/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f018_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-012"
          element={
            <ProtectedRoute>
              <PHQCL01F012 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-012/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f012_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-006"
          element={
            <ProtectedRoute>
              <QualityControl_f006 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-006/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f006_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/F-021"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f021 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-021/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f021_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/precot/QualityControl/PH-QCF-027"
          element={
            <ProtectedRoute>
              <PHQCL01F027 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/precot/QualityControl/PH-QCF-027/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f027_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR-F-002/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f02_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR-F-002"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f02 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/ARF-006/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_ARf006_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/ARF-006"
          element={
            <ProtectedRoute>
              <QualityControl_ARf006 />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/AR-F-004/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f04_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR-F-004"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f04 />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/precot/QualityControl/PH-QCF-030/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_f030_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/precot/QualityControl/PH-QCF-030"
          element={
            <ProtectedRoute>
              <QualityControl_f030 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/AR-F-007/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f07_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/AR-F-007"
          element={
            <ProtectedRoute>
              <QualityControl_AR_f07 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QC/F-07/Summary"
          element={
            <ProtectedRoute>
              <QC_f07_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QC/F-07"
          element={
            <ProtectedRoute>
              <QC_f07 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-022"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f022 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-022/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f022_Summary />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/F-029"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f029 />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/F-029/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QualityControl_f029_Summary />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QC/F-05/Summary"
          element={
            <ProtectedRoute>
              <QC_f05_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QC/F-05"
          element={
            <ProtectedRoute>
              <QC_f05 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityControl/ARF011/Summary"
          element={
            <ProtectedRoute>
              <QualityControl_ARF011_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityControl/F-ARF011"
          element={
            <ProtectedRoute>
              <QualityControl_ARF011 />{" "}
            </ProtectedRoute>
          }
        />

        {/* Quality Assurance */}
        <Route
          path="/Precot/QA/PestControl/Summary"
          element={
            <ProtectedRoute>
              <QA_PestControl_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/PestControl"
          element={
            <ProtectedRoute>
              <QA_PestControl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-01"
          element={
            <ProtectedRoute>
              <QA_f01 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-01/Summary"
          element={
            <ProtectedRoute>
              <QA_f01_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/rodentFull"
          element={
            <ProtectedRoute>
              <RodentBoxFull />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/rodentBoxSummary"
          element={
            <ProtectedRoute>
              <RodentBoxSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-18/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QA_F018_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-18"
          element={
            <ProtectedRoute>
              {" "}
              <QA_F018 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-15/Summary"
          element={
            <ProtectedRoute>
              <QA_f15_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-15"
          element={
            <ProtectedRoute>
              <QA_f15 />
            </ProtectedRoute>
          }
        />

        {/* /Precot/QA/QA_F020_Summary */}
        <Route
          path="/Precot/QA/QA_F020_Summary"
          element={
            <ProtectedRoute>
              <QA_F020_Summary />
            </ProtectedRoute>
          }
        />
        {/* /Precot/QA/QA_F020 */}
        <Route
          path="/Precot/QA/QA_F020"
          element={
            <ProtectedRoute>
              <QA_F020 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward029/Summary"
          element={
            <ProtectedRoute>
              <QA_Inward029_Sum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward029"
          element={
            <ProtectedRoute>
              <QA_Inward029 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward030/Summary"
          element={
            <ProtectedRoute>
              <QA_Inward030_Sum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward030"
          element={
            <ProtectedRoute>
              <QA_Inward030 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward031/Summary"
          element={
            <ProtectedRoute>
              <QA_Inward031_Sum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward031"
          element={
            <ProtectedRoute>
              <QA_Inward031 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward032/Summary"
          element={
            <ProtectedRoute>
              <QA_Inward032_Sum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward032"
          element={
            <ProtectedRoute>
              <QA_Inward032 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward033/Summary"
          element={
            <ProtectedRoute>
              <QA_Inward033_Sum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/Inward033"
          element={
            <ProtectedRoute>
              <QA_Inward033 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/cusRegisterSummary"
          element={
            <ProtectedRoute>
              <QA_F019_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-010/internal_audit_schedule"
          element={
            <ProtectedRoute>
              <QualityAssurance_f010_internal_audit_schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-010/internal_audit_schedule_summary"
          element={
            <ProtectedRoute>
              <QA_f010_internal_audit_schedule_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-39/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QA_f39_summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-39"
          element={
            <ProtectedRoute>
              {" "}
              <QA_f39 />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-49/Summary"
          element={
            <ProtectedRoute>
              <QA_F49_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-49"
          element={
            <ProtectedRoute>
              <QA_F49 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-59/Summary"
          element={
            <ProtectedRoute>
              <QA_F59_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-59"
          element={
            <ProtectedRoute>
              <QA_F59 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/customerComplaint"
          element={
            <ProtectedRoute>
              <CustomerComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-002/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QA_F002_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-002"
          element={
            <ProtectedRoute>
              {" "}
              <QA_F002 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-01/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QA_F01_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-01"
          element={
            <ProtectedRoute>
              {" "}
              <QA_F01 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-16"
          element={
            <ProtectedRoute>
              <QA_f16 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-16/Summary"
          element={
            <ProtectedRoute>
              <QA_f16_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/QA_F017_Summary"
          element={
            <ProtectedRoute>
              <QA_F017_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F017"
          element={
            <ProtectedRoute>
              <QA_F017 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F013_Summary"
          element={
            <ProtectedRoute>
              <QA_F013_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F013"
          element={
            <ProtectedRoute>
              <QA_F013 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-21/Summary"
          element={
            <ProtectedRoute>
              {" "}
              <QA_F21_Summary />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-14"
          element={
            <ProtectedRoute>
              <QA_f14 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-14/Summary"
          element={
            <ProtectedRoute>
              <QA_f14_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-22"
          element={
            <ProtectedRoute>
              <QA_f22 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-22/Summary"
          element={
            <ProtectedRoute>
              <QA_f22_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-23"
          element={
            <ProtectedRoute>
              <QA_f23 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-23/Summary"
          element={
            <ProtectedRoute>
              <QA_f23_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-034/inprocess_inspection_report"
          element={
            <ProtectedRoute>
              <QA_f034_Inprocess_Inspection_Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
          element={
            <ProtectedRoute>
              <QA_f034_Inprocess_Inspection_Report_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-012/internal_audit_report"
          element={
            <ProtectedRoute>
              <QA_f012_internal_audit_report />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Precot/QualityAssurance/F-012/internal_audit_report_summary"
          element={
            <ProtectedRoute>
              <QA_f012_internal_audit_report_summary />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
          element={
            <ProtectedRoute>
              <QA_f035_Inprocess_Inspection_Report_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-035/inprocess_inspection_report"
          element={
            <ProtectedRoute>
              <QA_f035_Inprocess_Inspection_Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-036/inprocess_inspection_report_summary"
          element={
            <ProtectedRoute>
              <QA_f036_Inprocess_Inspection_Report_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-036/inprocess_inspection_report"
          element={
            <ProtectedRoute>
              <QA_f036_Inprocess_Inspection_Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/QA_F037"
          element={
            <ProtectedRoute>
              <QA_F037 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/QA_F037_Summary"
          element={
            <ProtectedRoute>
              <QA_F037_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-048/Summary"
          element={
            <ProtectedRoute>
              <QA_F048_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-048"
          element={
            <ProtectedRoute>
              <QA_F048 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-043/Summary"
          element={
            <ProtectedRoute>
              <QualityAssurance_f43_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-043"
          element={
            <ProtectedRoute>
              <QualityAssurance_f43 />
            </ProtectedRoute>
          }
        />

        {/* next QA phase */}
        <Route
          path="/Precot/QualityAssurance/F-045/Summary"
          element={
            <ProtectedRoute>
              <QualityAssurance_f45_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-045"
          element={
            <ProtectedRoute>
              <QualityAssurance_f45 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-26/Summary"
          element={
            <ProtectedRoute>
              <QA_f26_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-26"
          element={
            <ProtectedRoute>
              <QA_f26 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-051/Summary"
          element={
            <ProtectedRoute>
              <QualityAssurance_f51_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-051"
          element={
            <ProtectedRoute>
              <QualityAssurance_f51 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-52/Summary"
          element={
            <ProtectedRoute>
              <QA_f52_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-52"
          element={
            <ProtectedRoute>
              <QA_f52 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-58/Summary"
          element={
            <ProtectedRoute>
              <QA_f58_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-58"
          element={
            <ProtectedRoute>
              <QA_f58 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-50"
          element={
            <ProtectedRoute>
              <QA_f50 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-50/Summary"
          element={
            <ProtectedRoute>
              <QA_f50_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F042_Summary"
          element={
            <ProtectedRoute>
              <QA_F042_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/QA_F042"
          element={
            <ProtectedRoute>
              <QA_F042 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-06/Summary"
          element={
            <ProtectedRoute>
              <QA_f06_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-06"
          element={
            <ProtectedRoute>
              <QA_f06 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-027/Summary"
          element={
            <ProtectedRoute>
              <QualityAssurance_f27_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-027"
          element={
            <ProtectedRoute>
              <QualityAssurance_f27 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-028_summary"
          element={
            <ProtectedRoute>
              <QA_F028_AnnualProductReview_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-028"
          element={
            <ProtectedRoute>
              <QA_F028_AnnualProductReview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F007/Summary"
          element={
            <ProtectedRoute>
              <QA_F007_TrainingRec_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F007"
          element={
            <ProtectedRoute>
              <QA_F007_TrainingRec />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-62"
          element={
            <ProtectedRoute>
              <QA_f62 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityAssurance/QA_F005_Summary"
          element={
            <ProtectedRoute>
              <QAD01_005 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityAssurance/QA_F005"
          element={
            <ProtectedRoute>
              <QA_f005 />
            </ProtectedRoute>
          }
        />
        {/* {/* masterlistofsharptools */}
        <Route
          path="/Precot/QA/F-060"
          element={
            <ProtectedRoute>
              <QA_f60 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-060/Summary"
          element={
            <ProtectedRoute>
              <QA_f60_Summary />
            </ProtectedRoute>
          }
        />
        {/* listofsharptools */}
        <Route
          path="/Precot/QA/f-60"
          element={
            <ProtectedRoute>
              <QA_list_of_sharp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/f-60/Summary"
          element={
            <ProtectedRoute>
              <QA_list_of_sharp_summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QualityAssurance/F-029/QA_f029_new_sample_request_summary"
          element={
            <ProtectedRoute>
              <QA_f029_new_sample_request_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-029/QA_f029_new_sample_request"
          element={
            <ProtectedRoute>
              <QA_f029_new_sample_request />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F047_Summary"
          element={
            <ProtectedRoute>
              <QA_F047_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F047"
          element={
            <ProtectedRoute>
              <QA_F047 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/QA_F_041"
          element={
            <ProtectedRoute>
              <QA_F_041 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/QA_F_041_Summary"
          element={
            <ProtectedRoute>
              <QA_F_041_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-040/Summary"
          element={
            <ProtectedRoute>
              <QualityAssurance_f40_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-040"
          element={
            <ProtectedRoute>
              <QualityAssurance_f40 />
            </ProtectedRoute>
          }
        />
        {/* */}
        <Route
          path="/Precot/QA/F-03"
          element={
            <ProtectedRoute>
              <QA_f03 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-03/Summary"
          element={
            <ProtectedRoute>
              <QA_f03_Summary />
            </ProtectedRoute>
          }
        />
        {/*  */}
        <Route
          path="/Precot/QA/F-09"
          element={
            <ProtectedRoute>
              <QA_F09 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-09/Summary"
          element={
            <ProtectedRoute>
              <QA_F09_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F008_Summary"
          element={
            <ProtectedRoute>
              <QA_F008_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/QA_F008"
          element={
            <ProtectedRoute>
              <QA_F008 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/QA_F_046"
          element={
            <ProtectedRoute>
              <QA_F_046 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/QA_F_046_Summary"
          element={
            <ProtectedRoute>
              <QA_F_046_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary"
          element={
            <ProtectedRoute>
              <QA_f076_training_session_allotment_register_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register"
          element={
            <ProtectedRoute>
              <QA_f076_training_session_allotment_register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-25"
          element={
            <ProtectedRoute>
              <QA_f25 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-25/Summary"
          element={
            <ProtectedRoute>
              <QA_f25_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/QA/F-044/corrective"
          element={
            <ProtectedRoute>
              <QA_f044_Corrective />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/QA/F-044/corrective_summary"
          element={
            <ProtectedRoute>
              <QA_f044_Corrective_summary />
            </ProtectedRoute>
          }
        />

        {/* PPC Forms... */}
        <Route
          path="/Precot/PPC/F-002/Summary"
          element={
            <ProtectedRoute>
              <PPC_f002_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PPC/F-002"
          element={
            <ProtectedRoute>
              <PPC_f002 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PPC/F-003/Summary"
          element={
            <ProtectedRoute>
              <PPC_f003_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PPC/F-003"
          element={
            <ProtectedRoute>
              <PPC_f003 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PPC/F-004/Summary"
          element={
            <ProtectedRoute>
              <PPC_f004_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/PPC/F-004"
          element={
            <ProtectedRoute>
              <PPC_f004 />
            </ProtectedRoute>
          }
        />

        {/* Store Forms */}
        <Route path="/Precot/Stores/F-001/Summary" element={<ProtectedRoute><Stores_f001_summary /></ProtectedRoute>} />
        <Route path="/Precot/Stores/F-001" element={<ProtectedRoute><Stores_f001 /></ProtectedRoute>} />
        <Route
          path="/Precot/Stores/F-003/Summary"
          element={
            <ProtectedRoute>
              <Stores_f003_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Stores/F-003"
          element={
            <ProtectedRoute>
              <Store_f003 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Stores/F-006/Summary"
          element={
            <ProtectedRoute>
              <Stores_f006_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Stores/F-006"
          element={
            <ProtectedRoute>
              <Store_f006 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Stores/F-008/Summary"
          element={
            <ProtectedRoute>
              <Stores_f008_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Stores/F-008"
          element={
            <ProtectedRoute>
              <Store_f008 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Stores/F-009/Summary"
          element={
            <ProtectedRoute>
              <Stores_f009_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Stores/F-009"
          element={
            <ProtectedRoute>
              <Store_f009 />
            </ProtectedRoute>
          }
        />
        {/* dispatch */}
        <Route
          path="/Precot/Dispatch/F-001/Summary"
          element={
            <ProtectedRoute>
              <Dispatch_f001_summary />
            </ProtectedRoute>
          }
        />
        {/* Dispatch */}
        <Route
          path="/Precot/Dispatch/F-001"
          element={
            <ProtectedRoute>
              <Dispatch_f001 />
            </ProtectedRoute>
          }
        />

        {/* Development */}
        <Route
          path="/Precot/Development/F-001/Summary"
          element={
            <ProtectedRoute>
              <Development_f001_summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Development/F-001"
          element={
            <ProtectedRoute>
              <Development_f001 />
            </ProtectedRoute>
          }
        />

        {/* Engineering */}

        <Route
          path="/Precot/Engineering/FC-016/Summary"
          element={
            <ProtectedRoute>
              <Engineering_FC016_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Engineering/FC-016"
          element={
            <ProtectedRoute>
              <Engineering_FC016 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Engineering/FC-004/Summary"
          element={
            <ProtectedRoute>
              <Engineering_FC004_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Engineering/FC-004"
          element={
            <ProtectedRoute>
              <Engineering_FC004 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Engineering/FC-020/Summary"
          element={
            <ProtectedRoute>
              <Engineering_FC020_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Engineering/FC-020"
          element={
            <ProtectedRoute>
              <Engineering_FC020 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Engineering/FC-003/Summary"
          element={
            <ProtectedRoute>
              <Engineering_FC003_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Engineering/FC-003"
          element={
            <ProtectedRoute>
              <Engineering_FC003 />
            </ProtectedRoute>
          }
        />

        {/* buds */}

        <Route
          path="/Precot/COTTON_BUDS/F-04"
          element={
            <ProtectedRoute>
              <COTTON_BUDS_f04 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/COTTON_BUDS/F-04/Summary"
          element={
            <ProtectedRoute>
              <COTTON_BUDS_f04_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/COTTON_BUDS/F-02"
          element={
            <ProtectedRoute>
              <COTTON_BUDS_f02 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/COTTON_BUDS/F-02/Summary"
          element={
            <ProtectedRoute>
              <COTTON_BUDS_f02_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/CottonBuds/BMR"
          element={
            <ProtectedRoute>
              <CottonBuds_BMR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Buds/Buds_F038"
          element={
            <ProtectedRoute>
              <Buds_F038 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/Buds/Buds_F038_Summary"
          element={
            <ProtectedRoute>
              <Buds_F038_Summary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Precot/COTTON_BUDS/F-002"
          element={
            <ProtectedRoute>
              <COTTON_BUDS_F002 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/COTTON_BUDS/F-002/Summary"
          element={
            <ProtectedRoute>
              <COTTON_BUDS_F002_Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/CottonBuds/F-001"
          element={
            <ProtectedRoute>
              <BudsF001Equip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Precot/CottonBuds/F-001/Summary"
          element={
            <ProtectedRoute>
              <BudsF001EquipSummary />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function ErrorPage() {
  // hello
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}

export default App;
