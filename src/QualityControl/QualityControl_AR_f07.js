/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
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
  Pagination,
} from "antd";
import { IoSave, IoPrint } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader.js";
import BleachingTail from "../Components/BleachingTail.js";
import { GoArrowLeft } from "react-icons/go";
import "../index.css";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { TiTick } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";
import API from "../baseUrl.json";
import { Table, Modal, DatePicker, Form, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import QualityControl_f16 from "./QualityControl_f16.js";
import TabPane from "antd/es/tabs/TabPane.js";

const QualityControl_AR_f07 = () => {
  const location = useLocation();
  const { date } = location.state;
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [tabNo, setTabNo] = useState("1");
  const today = new Date().toISOString().split("T")[0];
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    // "water_id": 1,
    formatNo: "",
    revisionNo: "",
    formatName: "",
    refSopNo: "",
    ar_no: "",
    date: "",
    chemistDetails: [
      {
        // "chemist_id": 1,
        equalization_ph_act: "",
        equalization_hardness_act: "",
        equalization_tds_act: "",
        equalization_turbidity_act: "",
        equalization_frc_act: "",
        equalization_tss_act: "",
        equalization_do_act: "",
        equalization_cod_act: "",
        equalization_bod_act: "",
        equalization_mlss_act: "",
        equalization_mlvss_act: "",
        equalization_sv_act: "",
        primary_il_ph_act: "",
        primary_il_hardness_act: "",
        primary_il_tds_act: "",
        primary_il_turbidity_act: "",
        primary_il_frc_act: "",
        primary_il_tss_act: "",
        primary_il_do_act: "",
        primary_il_cod_act: "",
        primary_il_bod_act: "",
        primary_il_mlss_act: "",
        primary_il_mlvss_act: "",
        primary_il_sv_act: "",
        primary_ol_ph_act: "",
        primary_ol_hardness_act: "",
        primary_ol_tds_act: "",
        primary_ol_turbidity_act: "",
        primary_ol_frc_act: "",
        primary_ol_tss_act: "",
        primary_ol_do_act: "",
        primary_ol_cod_act: "",
        primary_ol_bod_act: "",
        primary_ol_mlss_act: "",
        primary_ol_mlvss_act: "",
        primary_ol_sv_act: "",
        aeration_tant_1_ph_act: "",
        aeration_tant_1_hardness_act: "",
        aeration_tant_1_tds_act: "",
        aeration_tant_1_turbidity_act: "",
        aeration_tant_1_frc_act: "",
        aeration_tant_1_tss_act: "",
        aeration_tant_1_do_act: "",
        aeration_tant_1_cod_act: "",
        aeration_tant_1_bod_act: "",
        aeration_tant_1_mlss_act: "",
        aeration_tant_1_mlvss_act: "",
        aeration_tant_1_sv_act: "",
        aeration_tant_6_ph_act: "",
        aeration_tant_6_hardness_act: "",
        aeration_tant_6_tds_act: "",
        aeration_tant_6_turbidity_act: "",
        aeration_tant_6_frc_act: "",
        aeration_tant_6_tss_act: "",
        aeration_tant_6_do_act: "",
        aeration_tant_6_cod_act: "",
        aeration_tant_6_bod_act: "",
        aeration_tant_6_mlss_act: "",
        aeration_tant_6_mlvss_act: "",
        aeration_tant_6_sv_act: "",
        secondary_ol_ph_act: "",
        secondary_ol_hardness_act: "",
        secondary_ol_tds_act: "",
        secondary_ol_turbidity_act: "",
        secondary_ol_frc_act: "",
        secondary_ol_tss_act: "",
        secondary_ol_do_act: "",
        secondary_ol_cod_act: "",
        secondary_ol_bod_act: "",
        secondary_ol_mlss_act: "",
        secondary_ol_mlvss_act: "",
        secondary_ol_sv_act: "",
        uf_feed_ph_act: "",
        uf_feed_hardness_act: "",
        uf_feed_tds_act: "",
        uf_feed_turbidity_act: "",
        uf_feed_frc_act: "",
        uf_feed_tss_act: "",
        uf_feed_do_act: "",
        uf_feed_cod_act: "",
        uf_feed_bod_act: "",
        uf_feed_mlss_act: "",
        uf_feed_mlvss_act: "",
        uf_feed_sv_act: "",
        ro_01_feed_ph_act: "",
        ro_01_feed_hardness_act: "",
        ro_01_feed_tds_act: "",
        ro_01_feed_turbidity_act: "",
        ro_01_feed_frc_act: "",
        ro_01_feed_tss_act: "",
        ro_01_feed_do_act: "",
        ro_01_feed_cod_act: "",
        ro_01_feed_bod_act: "",
        ro_01_feed_mlss_act: "",
        ro_01_feed_mlvss_act: "",
        ro_01_feed_sv_act: "",
        ro_01_permeate_ph_act: "",
        ro_01_permeate_hardness_act: "",
        ro_01_permeate_tds_act: "",
        ro_01_permeate_turbidity_act: "",
        ro_01_permeate_frc_act: "",
        ro_01_permeate_tss_act: "",
        ro_01_permeate_do_act: "",
        ro_01_permeate_cod_act: "",
        ro_01_permeate_bod_act: "",
        ro_01_permeate_mlss_act: "",
        ro_01_permeate_mlvss_act: "",
        ro_01_permeate_sv_act: "",
        ro_02_feed_ph_act: "",
        ro_02_feed_hardness_act: "",
        ro_02_feed_tds_act: "",
        ro_02_feed_turbidity_act: "",
        ro_02_feed_frc_act: "",
        ro_02_feed_tss_act: "",
        ro_02_feed_do_act: "",
        ro_02_feed_cod_act: "",
        ro_02_feed_bod_act: "",
        ro_02_feed_mlss_act: "",
        ro_02_feed_mlvss_act: "",
        ro_02_feed_sv_act: "",
        ro_02_permeate_ph_act: "",
        ro_02_permeate_hardness_act: "",
        ro_02_permeate_tds_act: "",
        ro_02_permeate_turbidity_act: "",
        ro_02_permeate_frc_act: "",
        ro_02_permeate_tss_act: "",
        ro_02_permeate_do_act: "",
        ro_02_permeate_cod_act: "",
        ro_02_permeate_bod_act: "",
        ro_02_permeate_mlss_act: "",
        ro_02_permeate_mlvss_act: "",
        ro_02_permeate_sv_act: "",
        ro_03_feed_ph_act: "",
        ro_03_feed_hardness_act: "",
        ro_03_feed_tds_act: "",
        ro_03_feed_turbidity_act: "",
        ro_03_feed_frc_act: "",
        ro_03_feed_tss_act: "",
        ro_03_feed_do_act: "",
        ro_03_feed_cod_act: "",
        ro_03_feed_bod_act: "",
        ro_03_feed_mlss_act: "",
        ro_03_feed_mlvss_act: "",
        ro_03_feed_sv_act: "",
        ro_03_permeate_ph_act: "",
        ro_03_permeate_hardness_act: "",
        ro_03_permeate_tds_act: "",
        ro_03_permeate_turbidity_act: "",
        ro_03_permeate_frc_act: "",
        ro_03_permeate_tss_act: "",
        ro_03_permeate_do_act: "",
        ro_03_permeate_cod_act: "",
        ro_03_permeate_bod_act: "",
        ro_03_permeate_mlss_act: "",
        ro_03_permeate_mlvss_act: "",
        ro_03_permeate_sv_act: "",
        //13
        ro_04_feed_ph_act: "",
        ro_04_feed_hardness_act: "",
        ro_04_feed_tds_act: "",
        ro_04_feed_turbidity_act: "",
        ro_04_feed_frc_act: "",
        ro_04_feed_tss_act: "",
        ro_04_feed_do_act: "",
        ro_04_feed_cod_act: "",
        ro_04_feed_bod_act: "",
        ro_04_feed_mlss_act: "",
        ro_04_feed_mlvss_act: "",
        ro_04_feed_sv_act: "",
        ro_04_permeate_ph_act: "",
        ro_04_permeate_hardness_act: "",
        ro_04_permeate_tds_act: "",
        ro_04_permeate_turbidity_act: "",
        ro_04_permeate_frc_act: "",
        ro_04_permeate_tss_act: "",
        ro_04_permeate_do_act: "",
        ro_04_permeate_cod_act: "",
        ro_04_permeate_bod_act: "",
        ro_04_permeate_mlss_act: "",
        ro_04_permeate_mlvss_act: "",
        ro_04_permeate_sv_act: "",
        mee_feed_ph_act: "",
        mee_feed_hardness_act: "",
        mee_feed_tds_act: "",
        mee_feed_turbidity_act: "",
        mee_feed_frc_act: "",
        mee_feed_tss_act: "",
        mee_feed_do_act: "",
        mee_feed_cod_act: "",
        mee_feed_bod_act: "",
        mee_feed_mlss_act: "",
        mee_feed_mlvss_act: "",
        mee_feed_sv_act: "",
        mee_condensate_ph_act: "",
        mee_condensate_hardness_act: "",
        mee_condensate_tds_act: "",
        mee_condensate_turbidity_act: "",
        mee_condensate_frc_act: "",
        mee_condensate_tss_act: "",
        mee_condensate_do_act: "",
        mee_condensate_cod_act: "",
        mee_condensate_bod_act: "",
        mee_condensate_mlss_act: "",
        mee_condensate_mlvss_act: "",
        mee_condensate_sv_act: "",
        mee_concentrate_ph_act: "",
        mee_concentrate_hardness_act: "",
        mee_concentrate_tds_act: "",
        mee_concentrate_turbidity_act: "",
        mee_concentrate_frc_act: "",
        mee_concentrate_tss_act: "",
        mee_concentrate_do_act: "",
        mee_concentrate_cod_act: "",
        mee_concentrate_bod_act: "",
        mee_concentrate_mlss_act: "",
        mee_concentrate_mlvss_act: "",
        mee_concentrate_sv_act: "",
        ro_tank_ph_act: "",
        ro_tank_hardness_act: "",
        ro_tank_tds_act: "",
        ro_tank_turbidity_act: "",
        ro_tank_frc_act: "",
        ro_tank_tss_act: "",
        ro_tank_do_act: "",
        ro_tank_cod_act: "",
        ro_tank_bod_act: "",
        ro_tank_mlss_act: "",
        ro_tank_mlvss_act: "",
        ro_tank_sv_act: "",
        soft_water_ph_act: "",
        soft_water_hardness_act: "",
        soft_water_tds_act: "",
        soft_water_turbidity_act: "",
        soft_water_frc_act: "",
        soft_water_tss_act: "",
        soft_water_do_act: "",
        soft_water_cod_act: "",
        soft_water_bod_act: "",
        soft_water_mlss_act: "",
        soft_water_mlvss_act: "",
        soft_water_sv_act: "",
        kiadb_ph_act: "",
        kiadb_hardness_act: "",
        kiadb_tds_act: "",
        kiadb_turbidity_act: "",
        kiadb_frc_act: "",
        kiadb_tss_act: "",
        kiadb_do_act: "",
        kiadb_cod_act: "",
        kiadb_bod_act: "",
        kiadb_mlss_act: "",
        kiadb_mlvss_act: "",
        kiadb_sv_act: "",
        softner_ph_act: "",
        softner_hardness_act: "",
        softner_tds_act: "",
        softner_turbidity_act: "",
        softner_frc_act: "",
        softner_tss_act: "",
        softner_do_act: "",
        softner_cod_act: "",
        softner_bod_act: "",
        softner_mlss_act: "",
        softner_mlvss_act: "",
        softner_sv_act: "",
        stp_treated_ph_act: "",
        stp_treated_hardness_act: "",
        stp_treated_tds_act: "",
        stp_treated_turbidity_act: "",
        stp_treated_frc_act: "",
        stp_treated_tss_act: "",
        stp_treated_do_act: "",
        stp_treated_cod_act: "",
        stp_treated_bod_act: "",
        stp_treated_mlss_act: "",
        stp_treated_mlvss_act: "",
        stp_treated_sv_act: "",
        bag_filter_ph_act: "",
        bag_filter_hardness_act: "",
        bag_filter_tds_act: "",
        bag_filter_turbidity_act: "",
        bag_filter_frc_act: "",
        bag_filter_tss_act: "",
        bag_filter_do_act: "",
        bag_filter_cod_act: "",
        bag_filter_bod_act: "",
        bag_filter_mlss_act: "",
        bag_filter_mlvss_act: "",
        bag_filter_sv_act: "",
        storage_tank_ph_act: "",
        storage_tank_hardness_act: "",
        storage_tank_tds_act: "",
        storage_tank_turbidity_act: "",
        storage_tank_frc_act: "",
        storage_tank_tss_act: "",
        storage_tank_do_act: "",
        storage_tank_cod_act: "",
        storage_tank_bod_act: "",
        storage_tank_mlss_act: "",
        storage_tank_mlvss_act: "",
        storage_tank_sv_act: "",
        remarks: "",
      },
    ],
    microDetails: [
      {
        equalization_sampled: "",
        equalization_incubation: "",
        equalization_test_completion: "",
        ro_tank_total_vaible: "",
        ro_tank_total_fungal: "",
        ro_tank_gram: "",
        ro_tank_escherechia: "",
        ro_tank_staphylococcos: "",
        ro_tank_pseudomonas: "",
        ro_tank_salmonella: "",
        soft_water_total_vaible: "",
        soft_water_total_fungal: "",
        soft_water_gram: "",
        soft_water_escherechia: "",
        soft_water_staphylococcos: "",
        soft_water_pseudomonas: "",
        soft_water_salmonella: "",
        bag_filter_total_vaible: "",
        bag_filter_total_fungal: "",
        bag_filter_gram: "",
        bag_filter_escherechia: "",
        bag_filter_staphylococcos: "",
        bag_filter_pseudomonas: "",
        bag_filter_salmonella: "",
        storage_tank_total_vaible: "",
        storage_tank_total_fungal: "",
        storage_tank_gram: "",
        storage_tank_escherechia: "",
        storage_tank_staphylococcos: "",
        storage_tank_pseudomonas: "",
        storage_tank_salmonella: "",
        water_bleaching_total_vaible: "",
        water_bleaching_total_fungal: "",
        water_bleaching_gram: "",
        water_bleaching_escherechia: "",
        water_bleaching_staphylococcos: "",
        water_bleaching_pseudomonas: "",
        water_bleaching_salmonella: "",
        ppd_ahu_inlet_total_vaible: "",
        ppd_ahu_inlet_total_fungal: "",
        ppd_ahu_inlet_gram: "",
        ppd_ahu_inlet_escherechia: "",
        ppd_ahu_inlet_staphylococcos: "",
        ppd_ahu_inlet_pseudomonas: "",
        ppd_ahu_inlet_salmonella: "",
        ppd_ahu_fog_total_vaible: "",
        ppd_ahu_fog_total_fungal: "",
        ppd_ahu_fog_gram: "",
        ppd_ahu_fog_escherechia: "",
        ppd_ahu_fog_staphylococcos: "",
        ppd_ahu_fog_pseudomonas: "",
        ppd_ahu_fog_salmonella: "",
        uv_inlet_total_vaible: "",
        uv_inlet_total_fungal: "",
        uv_inlet_gram: "",
        uv_inlet_escherechia: "",
        uv_inlet_staphylococcos: "",
        uv_inlet_pseudomonas: "",
        uv_inlet_salmonella: "",
        uv_outlet_total_vaible: "",
        uv_outlet_total_fungal: "",
        uv_outlet_gram: "",
        uv_outlet_escherechia: "",
        uv_outlet_staphylococcos: "",
        uv_outlet_pseudomonas: "",
        uv_outlet_salmonella: "",
        remarks: "",
      },
    ],
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    chemist_sign: "",
    qa_exe_sign: "",
    manager_sign: "",
    micro_sign: "",
  });
  const initialized = useRef(false);
  // ---------- For Pagination ----------------
  // ------------- PHYSICAL AND CHEMCAL TEST --------------
  const pHData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "6 to 10",
      act: formData.chemistDetails[0].equalization_ph_act,
      keyName: "equalization_ph_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "6 to 8",
      act: formData.chemistDetails[0].primary_il_ph_act,
      keyName: "primary_il_ph_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "6 to 8",
      act: formData.chemistDetails[0].primary_ol_ph_act,
      keyName: "primary_ol_ph_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "6 to 8",
      act: formData.chemistDetails[0].aeration_tant_1_ph_act,
      keyName: "aeration_tant_1_ph_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "6 to 8",
      act: formData.chemistDetails[0].aeration_tant_6_ph_act,
      keyName: "aeration_tant_6_ph_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "7 to 9",
      act: formData.chemistDetails[0].secondary_ol_ph_act,
      keyName: "secondary_ol_ph_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "6.5 to 8",
      act: formData.chemistDetails[0].uf_feed_ph_act,
      keyName: "uf_feed_ph_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "6 to 8",
      act: formData.chemistDetails[0].ro_01_feed_ph_act,
      keyName: "ro_01_feed_ph_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "6 to 7",
      act: formData.chemistDetails[0].ro_01_permeate_ph_act,
      keyName: "ro_01_permeate_ph_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "6 to 8",
      act: formData.chemistDetails[0].ro_02_feed_ph_act,
      keyName: "ro_02_feed_ph_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "6 to 7",
      act: formData.chemistDetails[0].ro_02_permeate_ph_act,
      keyName: "ro_02_permeate_ph_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "6 to 8",
      act: formData.chemistDetails[0].ro_03_feed_ph_act,
      keyName: "ro_03_feed_ph_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "6 to 7",
      act: formData.chemistDetails[0].ro_03_permeate_ph_act,
      keyName: "ro_03_permeate_ph_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "6 to 8",
      act: formData.chemistDetails[0].ro_04_feed_ph_act,
      keyName: "ro_04_feed_ph_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "6 to 7",
      act: formData.chemistDetails[0].ro_04_permeate_ph_act,
      keyName: "ro_04_permeate_ph_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "6 to 8",
      act: formData.chemistDetails[0].mee_feed_ph_act,
      keyName: "mee_feed_ph_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "6.5 to 7.5",
      act: formData.chemistDetails[0].mee_condensate_ph_act,
      keyName: "mee_condensate_ph_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "8.5 to 9.5",
      act: formData.chemistDetails[0].mee_concentrate_ph_act,
      keyName: "mee_concentrate_ph_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "6 to 7.5",
      act: formData.chemistDetails[0].ro_tank_ph_act,
      keyName: "ro_tank_ph_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "6 to 7.5",
      act: formData.chemistDetails[0].soft_water_ph_act,
      keyName: "soft_water_ph_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "6 to 8",
      act: formData.chemistDetails[0].kiadb_ph_act,
      keyName: "kiadb_ph_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "6.5 to 8",
      act: formData.chemistDetails[0].softner_ph_act,
      keyName: "softner_ph_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "6.5 to 7.5",
      act: formData.chemistDetails[0].stp_treated_ph_act,
      keyName: "stp_treated_ph_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "6 to 7.5",
      act: formData.chemistDetails[0].bag_filter_ph_act,
      keyName: "bag_filter_ph_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "6 to 7.5",
      act: formData.chemistDetails[0].storage_tank_ph_act,
      keyName: "storage_tank_ph_act",
    },
  ];
  const hardnessData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_hardness_act,
      keyName: "equalization_hardness_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_hardness_act,
      keyName: "primary_il_hardness_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_hardness_act,
      keyName: "primary_ol_hardness_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_1_hardness_act,
      keyName: "aeration_tant_1_hardness_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_6_hardness_act,
      keyName: "aeration_tant_6_hardness_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "< 200",
      act: formData.chemistDetails[0].secondary_ol_hardness_act,
      keyName: "secondary_ol_hardness_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "< 200",
      act: formData.chemistDetails[0].uf_feed_hardness_act,
      keyName: "uf_feed_hardness_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "< 200",
      act: formData.chemistDetails[0].ro_01_feed_hardness_act,
      keyName: "ro_01_feed_hardness_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "< 10",
      act: formData.chemistDetails[0].ro_01_permeate_hardness_act,
      keyName: "ro_01_permeate_hardness_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: " < 375",
      act: formData.chemistDetails[0].ro_02_feed_hardness_act,
      keyName: "ro_02_feed_hardness_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "< 10",
      act: formData.chemistDetails[0].ro_02_permeate_hardness_act,
      keyName: "ro_02_permeate_hardness_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "< 750",
      act: formData.chemistDetails[0].ro_03_feed_hardness_act,
      keyName: "ro_03_feed_hardness_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "< 10",
      act: formData.chemistDetails[0].ro_03_permeate_hardness_act,
      keyName: "ro_03_permeate_hardness_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "< 1000",
      act: formData.chemistDetails[0].ro_04_feed_hardness_act,
      keyName: "ro_04_feed_hardness_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "< 10",
      act: formData.chemistDetails[0].ro_04_permeate_hardness_act,
      keyName: "ro_04_permeate_hardness_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "< 500",
      act: formData.chemistDetails[0].mee_feed_hardness_act,
      keyName: "mee_feed_hardness_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "< 10",
      act: formData.chemistDetails[0].mee_condensate_hardness_act,
      keyName: "mee_condensate_hardness_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "NA",
      act: formData.chemistDetails[0].mee_concentrate_hardness_act,
      keyName: "mee_concentrate_hardness_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "< 10",
      act: formData.chemistDetails[0].ro_tank_hardness_act,
      keyName: "ro_tank_hardness_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "< 10",
      act: formData.chemistDetails[0].soft_water_hardness_act,
      keyName: "soft_water_hardness_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "< 500",
      act: formData.chemistDetails[0].kiadb_hardness_act,
      keyName: "kiadb_hardness_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "< 10",
      act: formData.chemistDetails[0].softner_hardness_act,
      keyName: "softner_hardness_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_hardness_act,
      keyName: "stp_treated_hardness_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "≤ 20",
      act: formData.chemistDetails[0].bag_filter_hardness_act,
      keyName: "bag_filter_hardness_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_hardness_act,
      keyName: "storage_tank_hardness_act",
    },
  ];
  const tDSData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "< 3000",
      act: formData.chemistDetails[0].equalization_tds_act,
      keyName: "equalization_tds_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "< 3000",
      act: formData.chemistDetails[0].primary_il_tds_act,
      keyName: "primary_il_tds_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "< 3000",
      act: formData.chemistDetails[0].primary_ol_tds_act,
      keyName: "primary_ol_tds_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "< 3000",
      act: formData.chemistDetails[0].aeration_tant_1_tds_act,
      keyName: "aeration_tant_1_tds_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "< 3000",
      act: formData.chemistDetails[0].aeration_tant_6_tds_act,
      keyName: "aeration_tant_6_tds_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "< 2500",
      act: formData.chemistDetails[0].secondary_ol_tds_act,
      keyName: "secondary_ol_tds_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "< 3000",
      act: formData.chemistDetails[0].uf_feed_tds_act,
      keyName: "uf_feed_tds_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "< 5000",
      act: formData.chemistDetails[0].ro_01_feed_tds_act,
      keyName: "ro_01_feed_tds_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "< 200",
      act: formData.chemistDetails[0].ro_01_permeate_tds_act,
      keyName: "ro_01_permeate_tds_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "< 8750",
      act: formData.chemistDetails[0].ro_02_feed_tds_act,
      keyName: "ro_02_feed_tds_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "< 250",
      act: formData.chemistDetails[0].ro_02_permeate_tds_act,
      keyName: "ro_02_permeate_tds_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "< 17500",
      act: formData.chemistDetails[0].ro_03_feed_tds_act,
      keyName: "ro_03_feed_tds_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "< 300",
      act: formData.chemistDetails[0].ro_03_permeate_tds_act,
      keyName: "ro_03_permeate_tds_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "< 21000",
      act: formData.chemistDetails[0].ro_04_feed_tds_act,
      keyName: "ro_04_feed_tds_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "< 500",
      act: formData.chemistDetails[0].ro_04_permeate_tds_act,
      keyName: "ro_04_permeate_tds_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "< 40000",
      act: formData.chemistDetails[0].mee_feed_tds_act,
      keyName: "mee_feed_tds_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "< 500",
      act: formData.chemistDetails[0].mee_condensate_tds_act,
      keyName: "mee_condensate_tds_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "≤ 150000",
      act: formData.chemistDetails[0].mee_concentrate_tds_act,
      keyName: "mee_concentrate_tds_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "< 250",
      act: formData.chemistDetails[0].ro_tank_tds_act,
      keyName: "ro_tank_tds_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "< 250",
      act: formData.chemistDetails[0].soft_water_tds_act,
      keyName: "soft_water_tds_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "< 1000",
      act: formData.chemistDetails[0].kiadb_tds_act,
      keyName: "kiadb_tds_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "< 250",
      act: formData.chemistDetails[0].softner_tds_act,
      keyName: "softner_tds_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_tds_act,
      keyName: "stp_treated_tds_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "≤ 250",
      act: formData.chemistDetails[0].bag_filter_tds_act,
      keyName: "bag_filter_tds_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "≤ 250",
      act: formData.chemistDetails[0].storage_tank_tds_act,
      keyName: "storage_tank_tds_act",
    },
  ];
  const turbudityData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_turbidity_act,
      keyName: "equalization_turbidity_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_turbidity_act,
      keyName: "primary_il_turbidity_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_turbidity_act,
      keyName: "primary_ol_turbidity_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_1_turbidity_act,
      keyName: "aeration_tant_1_turbidity_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_6_turbidity_act,
      keyName: "aeration_tant_6_turbidity_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].secondary_ol_turbidity_act,
      keyName: "secondary_ol_turbidity_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "< 50",
      act: formData.chemistDetails[0].uf_feed_turbidity_act,
      keyName: "uf_feed_turbidity_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_01_feed_turbidity_act,
      keyName: "ro_01_feed_turbidity_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_turbidity_act,
      keyName: "ro_01_permeate_turbidity_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_turbidity_act,
      keyName: "ro_02_feed_turbidity_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_turbidity_act,
      keyName: "ro_02_permeate_turbidity_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_turbidity_act,
      keyName: "ro_03_feed_turbidity_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_turbidity_act,
      keyName: "ro_03_permeate_turbidity_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_turbidity_act,
      keyName: "ro_04_feed_turbidity_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_turbidity_act,
      keyName: "ro_04_permeate_turbidity_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_turbidity_act,
      keyName: "mee_feed_turbidity_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_turbidity_act,
      keyName: "mee_condensate_turbidity_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_turbidity_act,
      keyName: "mee_concentrate_turbidity_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "< 2",
      act: formData.chemistDetails[0].ro_tank_turbidity_act,
      keyName: "ro_tank_turbidity_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "< 2",
      act: formData.chemistDetails[0].soft_water_turbidity_act,
      keyName: "soft_water_turbidity_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_turbidity_act,
      keyName: "kiadb_turbidity_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "< 2",
      act: formData.chemistDetails[0].softner_turbidity_act,
      keyName: "softner_turbidity_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_turbidity_act,
      keyName: "stp_treated_turbidity_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "< 2",
      act: formData.chemistDetails[0].bag_filter_turbidity_act,
      keyName: "bag_filter_turbidity_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_turbidity_act,
      keyName: "storage_tank_turbidity_act",
    },
  ];
  const fRCData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_frc_act,
      keyName: "equalization_frc_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_frc_act,
      keyName: "primary_il_frc_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_frc_act,
      keyName: "primary_ol_frc_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_1_frc_act,
      keyName: "aeration_tant_1_frc_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_6_frc_act,
      keyName: "aeration_tant_6_frc_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "< 2",
      act: formData.chemistDetails[0].secondary_ol_frc_act,
      keyName: "secondary_ol_frc_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "< 2",
      act: formData.chemistDetails[0].uf_feed_frc_act,
      keyName: "uf_feed_frc_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "Nil",
      act: formData.chemistDetails[0].ro_01_feed_frc_act,
      keyName: "ro_01_feed_frc_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_frc_act,
      keyName: "ro_01_permeate_frc_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_frc_act,
      keyName: "ro_02_feed_frc_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_frc_act,
      keyName: "ro_02_permeate_frc_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_frc_act,
      keyName: "ro_03_feed_frc_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_frc_act,
      keyName: "ro_03_permeate_frc_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_frc_act,
      keyName: "ro_04_feed_frc_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_frc_act,
      keyName: "ro_04_permeate_frc_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_frc_act,
      keyName: "mee_feed_frc_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_frc_act,
      keyName: "mee_condensate_frc_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_frc_act,
      keyName: "mee_concentrate_frc_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "Nil",
      act: formData.chemistDetails[0].ro_tank_frc_act,
      keyName: "ro_tank_frc_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "Nil",
      act: formData.chemistDetails[0].soft_water_frc_act,
      keyName: "soft_water_frc_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_frc_act,
      keyName: "kiadb_frc_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_frc_act,
      keyName: "softner_frc_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_frc_act,
      keyName: "stp_treated_frc_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "0.1 - 0.3",
      act: formData.chemistDetails[0].bag_filter_frc_act,
      keyName: "bag_filter_frc_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_frc_act,
      keyName: "storage_tank_frc_act",
    },
  ];
  const tSSData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_tss_act,
      keyName: "equalization_tss_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_tss_act,
      keyName: "primary_il_tss_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_tss_act,
      keyName: "primary_ol_tss_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_1_tss_act,
      keyName: "aeration_tant_1_tss_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_6_tss_act,
      keyName: "aeration_tant_6_tss_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "< 30",
      act: formData.chemistDetails[0].secondary_ol_tss_act,
      keyName: "secondary_ol_tss_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "< 20",
      act: formData.chemistDetails[0].uf_feed_tss_act,
      keyName: "uf_feed_tss_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "< 10",
      act: formData.chemistDetails[0].ro_01_feed_tss_act,
      keyName: "ro_01_feed_tss_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_tss_act,
      keyName: "ro_01_permeate_tss_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_tss_act,
      keyName: "ro_02_feed_tss_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_tss_act,
      keyName: "ro_02_permeate_tss_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_tss_act,
      keyName: "ro_03_feed_tss_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_tss_act,
      keyName: "ro_03_permeate_tss_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_tss_act,
      keyName: "ro_04_feed_tss_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_tss_act,
      keyName: "ro_04_permeate_tss_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_tss_act,
      keyName: "mee_feed_tss_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_tss_act,
      keyName: "mee_condensate_tss_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_tss_act,
      keyName: "mee_concentrate_tss_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "Nil",
      act: formData.chemistDetails[0].ro_tank_tss_act,
      keyName: "ro_tank_tss_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "Nil",
      act: formData.chemistDetails[0].soft_water_tss_act,
      keyName: "soft_water_tss_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_tss_act,
      keyName: "kiadb_tss_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_tss_act,
      keyName: "softner_tss_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "< 20",
      act: formData.chemistDetails[0].stp_treated_tss_act,
      keyName: "stp_treated_tss_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "< 2",
      act: formData.chemistDetails[0].bag_filter_tss_act,
      keyName: "bag_filter_tss_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_tss_act,
      keyName: "storage_tank_tss_act",
    },
  ];
  const dOData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_do_act,
      keyName: "equalization_do_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_do_act,
      keyName: "primary_il_do_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_do_act,
      keyName: "primary_ol_do_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "1 to 3",
      act: formData.chemistDetails[0].aeration_tant_1_do_act,
      keyName: "aeration_tant_1_do_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "1 to 3",
      act: formData.chemistDetails[0].aeration_tant_6_do_act,
      keyName: "aeration_tant_6_do_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].secondary_ol_do_act,
      keyName: "secondary_ol_do_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "-",
      act: formData.chemistDetails[0].uf_feed_do_act,
      keyName: "uf_feed_do_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_01_feed_do_act,
      keyName: "ro_01_feed_do_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_do_act,
      keyName: "ro_01_permeate_do_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_do_act,
      keyName: "ro_02_feed_do_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_do_act,
      keyName: "ro_02_permeate_do_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_do_act,
      keyName: "ro_03_feed_do_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_do_act,
      keyName: "ro_03_permeate_do_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_do_act,
      keyName: "ro_04_feed_do_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_do_act,
      keyName: "ro_04_permeate_do_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_do_act,
      keyName: "mee_feed_do_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_do_act,
      keyName: "mee_condensate_do_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_do_act,
      keyName: "mee_concentrate_do_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "-",
      act: formData.chemistDetails[0].ro_tank_do_act,
      keyName: "ro_tank_do_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "-",
      act: formData.chemistDetails[0].soft_water_do_act,
      keyName: "soft_water_do_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_do_act,
      keyName: "kiadb_do_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_do_act,
      keyName: "softner_do_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_do_act,
      keyName: "stp_treated_do_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "-",
      act: formData.chemistDetails[0].bag_filter_do_act,
      keyName: "bag_filter_do_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_do_act,
      keyName: "storage_tank_do_act",
    },
  ];
  const cODData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "< 2000",
      act: formData.chemistDetails[0].equalization_cod_act,
      keyName: "equalization_cod_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_cod_act,
      keyName: "primary_il_cod_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_cod_act,
      keyName: "primary_ol_cod_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_1_cod_act,
      keyName: "aeration_tant_1_cod_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_6_cod_act,
      keyName: "aeration_tant_6_cod_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "< 250",
      act: formData.chemistDetails[0].secondary_ol_cod_act,
      keyName: "secondary_ol_cod_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "-",
      act: formData.chemistDetails[0].uf_feed_cod_act,
      keyName: "uf_feed_cod_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_01_feed_cod_act,
      keyName: "ro_01_feed_cod_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_cod_act,
      keyName: "ro_01_permeate_cod_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_cod_act,
      keyName: "ro_02_feed_cod_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_cod_act,
      keyName: "ro_02_permeate_cod_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_cod_act,
      keyName: "ro_03_feed_cod_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_cod_act,
      keyName: "ro_03_permeate_cod_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_cod_act,
      keyName: "ro_04_feed_cod_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_cod_act,
      keyName: "ro_04_permeate_cod_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_cod_act,
      keyName: "mee_feed_cod_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_cod_act,
      keyName: "mee_condensate_cod_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_cod_act,
      keyName: "mee_concentrate_cod_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "-",
      act: formData.chemistDetails[0].ro_tank_cod_act,
      keyName: "ro_tank_cod_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "-",
      act: formData.chemistDetails[0].soft_water_cod_act,
      keyName: "soft_water_cod_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_cod_act,
      keyName: "kiadb_cod_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_cod_act,
      keyName: "softner_cod_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "< 50",
      act: formData.chemistDetails[0].stp_treated_cod_act,
      keyName: "stp_treated_cod_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "< 200",
      act: formData.chemistDetails[0].bag_filter_cod_act,
      keyName: "bag_filter_cod_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_cod_act,
      keyName: "storage_tank_cod_act",
    },
  ];
  const bODData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "< 500",
      act: formData.chemistDetails[0].equalization_bod_act,
      keyName: "equalization_bod_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_bod_act,
      keyName: "primary_il_bod_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_bod_act,
      keyName: "primary_ol_bod_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_1_bod_act,
      keyName: "aeration_tant_1_bod_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "-",
      act: formData.chemistDetails[0].aeration_tant_6_bod_act,
      keyName: "aeration_tant_6_bod_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "< 20",
      act: formData.chemistDetails[0].secondary_ol_bod_act,
      keyName: "secondary_ol_bod_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "-",
      act: formData.chemistDetails[0].uf_feed_bod_act,
      keyName: "uf_feed_bod_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_01_feed_bod_act,
      keyName: "ro_01_feed_bod_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_bod_act,
      keyName: "ro_01_permeate_bod_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_bod_act,
      keyName: "ro_02_feed_bod_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_bod_act,
      keyName: "ro_02_permeate_bod_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_bod_act,
      keyName: "ro_03_feed_bod_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_bod_act,
      keyName: "ro_03_permeate_bod_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_bod_act,
      keyName: "ro_04_feed_bod_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_bod_act,
      keyName: "ro_04_permeate_bod_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_bod_act,
      keyName: "mee_feed_bod_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_bod_act,
      keyName: "mee_condensate_bod_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_bod_act,
      keyName: "mee_concentrate_bod_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "-",
      act: formData.chemistDetails[0].ro_tank_bod_act,
      keyName: "ro_tank_bod_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "-",
      act: formData.chemistDetails[0].soft_water_bod_act,
      keyName: "soft_water_bod_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_bod_act,
      keyName: "kiadb_bod_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_bod_act,
      keyName: "softner_bod_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "< 10",
      act: formData.chemistDetails[0].stp_treated_bod_act,
      keyName: "stp_treated_bod_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "-",
      act: formData.chemistDetails[0].bag_filter_bod_act,
      keyName: "bag_filter_bod_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_bod_act,
      keyName: "storage_tank_bod_act",
    },
  ];
  const mLSSData = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_mlss_act,
      keyName: "equalization_mlss_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_mlss_act,
      keyName: "primary_il_mlss_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_mlss_act,
      keyName: "primary_ol_mlss_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "≥ 3500",
      act: formData.chemistDetails[0].aeration_tant_1_mlss_act,
      keyName: "aeration_tant_1_mlss_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "≥ 3500",
      act: formData.chemistDetails[0].aeration_tant_6_mlss_act,
      keyName: "aeration_tant_6_mlss_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].secondary_ol_mlss_act,
      keyName: "secondary_ol_mlss_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "-",
      act: formData.chemistDetails[0].uf_feed_mlss_act,
      keyName: "uf_feed_mlss_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_01_feed_mlss_act,
      keyName: "ro_01_feed_mlss_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_mlss_act,
      keyName: "ro_01_permeate_mlss_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_mlss_act,
      keyName: "ro_02_feed_mlss_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_mlss_act,
      keyName: "ro_02_permeate_mlss_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_mlss_act,
      keyName: "ro_03_feed_mlss_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_mlss_act,
      keyName: "ro_03_permeate_mlss_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_mlss_act,
      keyName: "ro_04_feed_mlss_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_mlss_act,
      keyName: "ro_04_permeate_mlss_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_mlss_act,
      keyName: "mee_feed_mlss_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_mlss_act,
      keyName: "mee_condensate_mlss_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_mlss_act,
      keyName: "mee_concentrate_mlss_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "-",
      act: formData.chemistDetails[0].ro_tank_mlss_act,
      keyName: "ro_tank_mlss_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "-",
      act: formData.chemistDetails[0].soft_water_mlss_act,
      keyName: "soft_water_mlss_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_mlss_act,
      keyName: "kiadb_mlss_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_mlss_act,
      keyName: "softner_mlss_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_mlss_act,
      keyName: "stp_treated_mlss_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "-",
      act: formData.chemistDetails[0].bag_filter_mlss_act,
      keyName: "bag_filter_mlss_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_mlss_act,
      keyName: "storage_tank_mlss_act",
    },
  ];
  const mLVSSDATA = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_mlvss_act,
      keyName: "equalization_mlvss_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_mlvss_act,
      keyName: "primary_il_mlvss_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_mlvss_act,
      keyName: "primary_ol_mlvss_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "≥ 2500",
      act: formData.chemistDetails[0].aeration_tant_1_mlvss_act,
      keyName: "aeration_tant_1_mlvss_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "≥ 2500",
      act: formData.chemistDetails[0].aeration_tant_6_mlvss_act,
      keyName: "aeration_tant_6_mlvss_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].secondary_ol_mlvss_act,
      keyName: "secondary_ol_mlvss_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "-",
      act: formData.chemistDetails[0].uf_feed_mlvss_act,
      keyName: "uf_feed_mlvss_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_01_feed_mlvss_act,
      keyName: "ro_01_feed_mlvss_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_mlvss_act,
      keyName: "ro_01_permeate_mlvss_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_mlvss_act,
      keyName: "ro_02_feed_mlvss_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_mlvss_act,
      keyName: "ro_02_permeate_mlvss_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_mlvss_act,
      keyName: "ro_03_feed_mlvss_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_mlvss_act,
      keyName: "ro_03_permeate_mlvss_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_mlvss_act,
      keyName: "ro_04_feed_mlvss_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_mlvss_act,
      keyName: "ro_04_permeate_mlvss_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_mlvss_act,
      keyName: "mee_feed_mlvss_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_mlvss_act,
      keyName: "mee_condensate_mlvss_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_mlvss_act,
      keyName: "mee_concentrate_mlvss_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "-",
      act: formData.chemistDetails[0].ro_tank_mlvss_act,
      keyName: "ro_tank_mlvss_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "-",
      act: formData.chemistDetails[0].soft_water_mlvss_act,
      keyName: "soft_water_mlvss_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_mlvss_act,
      keyName: "kiadb_mlvss_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_mlvss_act,
      keyName: "softner_mlvss_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_mlvss_act,
      keyName: "stp_treated_mlvss_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "-",
      act: formData.chemistDetails[0].bag_filter_mlvss_act,
      keyName: "bag_filter_mlvss_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_mlvss_act,
      keyName: "storage_tank_mlvss_act",
    },
  ];
  const sV30Data = [
    {
      id: 1,
      description: "Equalization Tank",
      std: "-",
      act: formData.chemistDetails[0].equalization_sv_act,
      keyName: "equalization_sv_act",
    },
    {
      id: 2,
      description: "Primary clarifier I/L",
      std: "-",
      act: formData.chemistDetails[0].primary_il_sv_act,
      keyName: "primary_il_sv_act",
    },
    {
      id: 3,
      description: "Primary clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].primary_ol_sv_act,
      keyName: "primary_ol_sv_act",
    },
    {
      id: 4,
      description: "Aeration Tank 1",
      std: "≤ 950",
      act: formData.chemistDetails[0].aeration_tant_1_sv_act,
      keyName: "aeration_tant_1_sv_act",
    },
    {
      id: 5,
      description: "Aeration Tank 6",
      std: "≤ 950",
      act: formData.chemistDetails[0].aeration_tant_6_sv_act,
      keyName: "aeration_tant_6_sv_act",
    },
    {
      id: 6,
      description: "Secondary Clarifier O/L",
      std: "-",
      act: formData.chemistDetails[0].secondary_ol_sv_act,
      keyName: "secondary_ol_sv_act",
    },
    {
      id: 7,
      description: "UF Feed",
      std: "-",
      act: formData.chemistDetails[0].uf_feed_sv_act,
      keyName: "uf_feed_sv_act",
    },
    {
      id: 8,
      description: "RO-01 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_01_feed_sv_act,
      keyName: "ro_01_feed_sv_act",
    },
    {
      id: 9,
      description: "RO-01 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_01_permeate_sv_act,
      keyName: "ro_01_permeate_sv_act",
    },
    {
      id: 10,
      description: "RO-02 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_02_feed_sv_act,
      keyName: "ro_02_feed_sv_act",
    },
    {
      id: 11,
      description: "RO-02 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_02_permeate_sv_act,
      keyName: "ro_02_permeate_sv_act",
    },
    {
      id: 12,
      description: "RO-03 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_03_feed_sv_act,
      keyName: "ro_03_feed_sv_act",
    },
    {
      id: 13,
      description: "RO-03 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_03_permeate_sv_act,
      keyName: "ro_03_permeate_sv_act",
    },
    {
      id: 14,
      description: "RO-04 Feed",
      std: "-",
      act: formData.chemistDetails[0].ro_04_feed_sv_act,
      keyName: "ro_04_feed_sv_act",
    },
    {
      id: 15,
      description: "RO-04 Permeate",
      std: "-",
      act: formData.chemistDetails[0].ro_04_permeate_sv_act,
      keyName: "ro_04_permeate_sv_act",
    },
    {
      id: 16,
      description: "MEE Feed",
      std: "-",
      act: formData.chemistDetails[0].mee_feed_sv_act,
      keyName: "mee_feed_sv_act",
    },
    {
      id: 17,
      description: "MEE Condensate",
      std: "-",
      act: formData.chemistDetails[0].mee_condensate_sv_act,
      keyName: "mee_condensate_sv_act",
    },
    {
      id: 18,
      description: "MEE Concentrate",
      std: "-",
      act: formData.chemistDetails[0].mee_concentrate_sv_act,
      keyName: "mee_concentrate_sv_act",
    },
    {
      id: 19,
      description: "RO Tank",
      std: "-",
      act: formData.chemistDetails[0].ro_tank_sv_act,
      keyName: "ro_tank_sv_act",
    },
    {
      id: 20,
      description: "Soft water Tank",
      std: "-",
      act: formData.chemistDetails[0].soft_water_sv_act,
      keyName: "soft_water_sv_act",
    },
    {
      id: 21,
      description: "KIADB Feed",
      std: "-",
      act: formData.chemistDetails[0].kiadb_sv_act,
      keyName: "kiadb_sv_act",
    },
    {
      id: 22,
      description: "Softner O/L",
      std: "-",
      act: formData.chemistDetails[0].softner_sv_act,
      keyName: "softner_sv_act",
    },
    {
      id: 23,
      description: "STP Treated Water",
      std: "-",
      act: formData.chemistDetails[0].stp_treated_sv_act,
      keyName: "stp_treated_sv_act",
    },
    {
      id: 24,
      description: "Bag Filter O/L",
      std: "-",
      act: formData.chemistDetails[0].bag_filter_sv_act,
      keyName: "bag_filter_sv_act",
    },
    {
      id: 25,
      description: "Storage Tank",
      std: "-",
      act: formData.chemistDetails[0].storage_tank_sv_act,
      keyName: "storage_tank_sv_act",
    },
  ];
  const rowsPerPageForPh = 5;
  const rowsPerPage = 9;
  const [currentPage, setCurrentPage] = useState({
    pHcurrentPage: 1,
    hardnessCurrentPage: 1,
    tDSCurrentPage: 1,
    turbidityCurrentPage: 1,
    fRCCurrentPage: 1,
    tssCurrentPage: 1,
    doCurrentPage: 1,
    codCCurrentPage: 1,
    bodCurrentPage: 1,
    mlssCurrentPage: 1,
    mlvssCurrentPage: 1,
    sv30CurrentPage: 1,
    viableCurrentPage: 1,
  });

  const handlePageChange = (page, tab) => {
    setCurrentPage((prevState) => ({
      ...prevState,
      [tab]: page,
    }));
  };

  const currentpHData = pHData.slice(
    (currentPage.pHcurrentPage - 1) * rowsPerPageForPh,
    currentPage.pHcurrentPage * rowsPerPageForPh
  );
  const currentHardness = hardnessData.slice(
    (currentPage.hardnessCurrentPage - 1) * rowsPerPageForPh,
    currentPage.hardnessCurrentPage * rowsPerPageForPh
  );
  const currentTDS = tDSData.slice(
    (currentPage.tDSCurrentPage - 1) * rowsPerPageForPh,
    currentPage.tDSCurrentPage * rowsPerPageForPh
  );
  const currentTurbidity = turbudityData.slice(
    (currentPage.turbidityCurrentPage - 1) * rowsPerPageForPh,
    currentPage.turbidityCurrentPage * rowsPerPageForPh
  );
  const currentFRC = fRCData.slice(
    (currentPage.fRCCurrentPage - 1) * rowsPerPageForPh,
    currentPage.fRCCurrentPage * rowsPerPageForPh
  );
  const currentTSS = tSSData.slice(
    (currentPage.tssCurrentPage - 1) * rowsPerPageForPh,
    currentPage.tssCurrentPage * rowsPerPageForPh
  );
  const currentDo = dOData.slice(
    (currentPage.doCurrentPage - 1) * rowsPerPageForPh,
    currentPage.doCurrentPage * rowsPerPageForPh
  );
  const currentCOD = cODData.slice(
    (currentPage.codCCurrentPage - 1) * rowsPerPageForPh,
    currentPage.codCCurrentPage * rowsPerPageForPh
  );
  const currentBOD = bODData.slice(
    (currentPage.bodCurrentPage - 1) * rowsPerPageForPh,
    currentPage.bodCurrentPage * rowsPerPageForPh
  );
  const currentMLSS = mLSSData.slice(
    (currentPage.mlssCurrentPage - 1) * rowsPerPageForPh,
    currentPage.mlssCurrentPage * rowsPerPageForPh
  );
  const currentMLVSS = mLVSSDATA.slice(
    (currentPage.mlvssCurrentPage - 1) * rowsPerPageForPh,
    currentPage.mlvssCurrentPage * rowsPerPageForPh
  );
  const currentSV30 = sV30Data.slice(
    (currentPage.sv30CurrentPage - 1) * rowsPerPageForPh,
    currentPage.sv30CurrentPage * rowsPerPageForPh
  );

  // ---------------------------------------------------------------

  // ------------ MICROBIOLOGICAL TEST -----------------------------
  const totalViableData = [
    {
      id: 1,
      description: "RO Tank",
      field: formData.microDetails[0].ro_tank_total_vaible,
      keyName: "ro_tank_total_vaible",
    },
    {
      id: 2,
      description: "Soft water Tank",
      field: formData.microDetails[0].soft_water_total_vaible,
      keyName: "soft_water_total_vaible",
    },
    {
      id: 3,
      description: "Bag Filter O/L",
      field: formData.microDetails[0].bag_filter_total_vaible,
      keyName: "bag_filter_total_vaible",
    },
    {
      id: 4,
      description: "Storage Tank",
      field: formData.microDetails[0].storage_tank_total_vaible,
      keyName: "storage_tank_total_vaible",
    },
    {
      id: 5,
      description: "Water for Bleaching ",
      field: formData.microDetails[0].water_bleaching_total_vaible,
      keyName: "water_bleaching_total_vaible",
    },
    {
      id: 6,
      description: "PPD- AHU Inlet water to foggers",
      field: formData.microDetails[0].ppd_ahu_inlet_total_vaible,
      keyName: "ppd_ahu_inlet_total_vaible",
    },
    {
      id: 7,
      description: "PPD-AHU Fog chamber outlet water",
      field: formData.microDetails[0].ppd_ahu_fog_total_vaible,
      keyName: "ppd_ahu_fog_total_vaible",
    },
    {
      id: 8,
      description: "UV inlet  water",
      field: formData.microDetails[0].uv_inlet_total_vaible,
      keyName: "uv_inlet_total_vaible",
    },
    {
      id: 9,
      description: "UV outlet  water",
      field: formData.microDetails[0].uv_outlet_total_vaible,
      keyName: "uv_outlet_total_vaible",
    },
  ];
  const totalFungalData = [
    {
      id: 1,
      description: "RO Tank",
      field: formData.microDetails[0].ro_tank_total_fungal,
      keyName: "ro_tank_total_fungal",
    },
    {
      id: 2,
      description: "Soft water Tank",
      field: formData.microDetails[0].soft_water_total_fungal,
      keyName: "soft_water_total_fungal",
    },
    {
      id: 3,
      description: "Bag Filter O/L",
      field: formData.microDetails[0].bag_filter_total_fungal,
      keyName: "bag_filter_total_fungal",
    },
    {
      id: 4,
      description: "Storage Tank",
      field: formData.microDetails[0].storage_tank_total_fungal,
      keyName: "storage_tank_total_fungal",
    },
    {
      id: 5,
      description: "Water for Bleaching ",
      field: formData.microDetails[0].water_bleaching_total_fungal,
      keyName: "water_bleaching_total_fungal",
    },
    {
      id: 6,
      description: "PPD- AHU Inlet water to foggers",
      field: formData.microDetails[0].ppd_ahu_inlet_total_fungal,
      keyName: "ppd_ahu_inlet_total_fungal",
    },
    {
      id: 7,
      description: "PPD-AHU Fog chamber outlet water",
      field: formData.microDetails[0].ppd_ahu_fog_total_fungal,
      keyName: "ppd_ahu_fog_total_fungal",
    },
    {
      id: 8,
      description: "UV inlet  water",
      field: formData.microDetails[0].uv_inlet_total_fungal,
      keyName: "uv_inlet_total_fungal",
    },
    {
      id: 9,
      description: "UV outlet  water",
      field: formData.microDetails[0].uv_outlet_total_fungal,
      keyName: "uv_outlet_total_fungal",
    },
  ];
  const gramNegativeData = [
    {
      id: 1,
      description: "RO Tank",
      field: formData.microDetails[0].ro_tank_gram,
      keyName: "ro_tank_gram",
    },
    {
      id: 2,
      description: "Soft water Tank",
      field: formData.microDetails[0].soft_water_gram,
      keyName: "soft_water_gram",
    },
    {
      id: 3,
      description: "Bag Filter O/L",
      field: formData.microDetails[0].bag_filter_gram,
      keyName: "bag_filter_gram",
    },
    {
      id: 4,
      description: "Storage Tank",
      field: formData.microDetails[0].storage_tank_gram,
      keyName: "storage_tank_gram",
    },
    {
      id: 5,
      description: "Water for Bleaching ",
      field: formData.microDetails[0].water_bleaching_gram,
      keyName: "water_bleaching_gram",
    },
    {
      id: 6,
      description: "PPD- AHU Inlet water to foggers",
      field: formData.microDetails[0].ppd_ahu_inlet_gram,
      keyName: "ppd_ahu_inlet_gram",
    },
    {
      id: 7,
      description: "PPD-AHU Fog chamber outlet water",
      field: formData.microDetails[0].ppd_ahu_fog_gram,
      keyName: "ppd_ahu_fog_gram",
    },
    {
      id: 8,
      description: "UV inlet  water",
      field: formData.microDetails[0].uv_inlet_gram,
      keyName: "uv_inlet_gram",
    },
    {
      id: 9,
      description: "UV outlet  water",
      field: formData.microDetails[0].uv_outlet_gram,
      keyName: "uv_outlet_gram",
    },
  ];
  const EcoliData = [
    {
      id: 1,
      description: "RO Tank",
      field: formData.microDetails[0].ro_tank_escherechia,
      keyName: "ro_tank_escherechia",
    },
    {
      id: 2,
      description: "Soft water Tank",
      field: formData.microDetails[0].soft_water_escherechia,
      keyName: "soft_water_escherechia",
    },
    {
      id: 3,
      description: "Bag Filter O/L",
      field: formData.microDetails[0].bag_filter_escherechia,
      keyName: "bag_filter_escherechia",
    },
    {
      id: 4,
      description: "Storage Tank",
      field: formData.microDetails[0].storage_tank_escherechia,
      keyName: "storage_tank_escherechia",
    },
    {
      id: 5,
      description: "Water for Bleaching ",
      field: formData.microDetails[0].water_bleaching_escherechia,
      keyName: "water_bleaching_escherechia",
    },
    {
      id: 6,
      description: "PPD- AHU Inlet water to foggers",
      field: formData.microDetails[0].ppd_ahu_inlet_escherechia,
      keyName: "ppd_ahu_inlet_escherechia",
    },
    {
      id: 7,
      description: "PPD-AHU Fog chamber outlet water",
      field: formData.microDetails[0].ppd_ahu_fog_escherechia,
      keyName: "ppd_ahu_fog_escherechia",
    },
    {
      id: 8,
      description: "UV inlet  water",
      field: formData.microDetails[0].uv_inlet_escherechia,
      keyName: "uv_inlet_escherechia",
    },
    {
      id: 9,
      description: "UV outlet  water",
      field: formData.microDetails[0].uv_outlet_escherechia,
      keyName: "uv_outlet_escherechia",
    },
  ];
  const staphyData = [
    {
      id: 1,
      description: "RO Tank",
      field: formData.microDetails[0].ro_tank_staphylococcos,
      keyName: "ro_tank_staphylococcos",
    },
    {
      id: 2,
      description: "Soft water Tank",
      field: formData.microDetails[0].soft_water_staphylococcos,
      keyName: "soft_water_staphylococcos",
    },
    {
      id: 3,
      description: "Bag Filter O/L",
      field: formData.microDetails[0].bag_filter_staphylococcos,
      keyName: "bag_filter_staphylococcos",
    },
    {
      id: 4,
      description: "Storage Tank",
      field: formData.microDetails[0].storage_tank_staphylococcos,
      keyName: "storage_tank_staphylococcos",
    },
    {
      id: 5,
      description: "Water for Bleaching ",
      field: formData.microDetails[0].water_bleaching_staphylococcos,
      keyName: "water_bleaching_staphylococcos",
    },
    {
      id: 6,
      description: "PPD- AHU Inlet water to foggers",
      field: formData.microDetails[0].ppd_ahu_inlet_staphylococcos,
      keyName: "ppd_ahu_inlet_staphylococcos",
    },
    {
      id: 7,
      description: "PPD-AHU Fog chamber outlet water",
      field: formData.microDetails[0].ppd_ahu_fog_staphylococcos,
      keyName: "ppd_ahu_fog_staphylococcos",
    },
    {
      id: 8,
      description: "UV inlet  water",
      field: formData.microDetails[0].uv_inlet_staphylococcos,
      keyName: "uv_inlet_staphylococcos",
    },
    {
      id: 9,
      description: "UV outlet  water",
      field: formData.microDetails[0].uv_outlet_staphylococcos,
      keyName: "uv_outlet_staphylococcos",
    },
  ];
  const pseudoData = [
    {
      id: 1,
      description: "RO Tank",
      field: formData.microDetails[0].ro_tank_pseudomonas,
      keyName: "ro_tank_pseudomonas",
    },
    {
      id: 2,
      description: "Soft water Tank",
      field: formData.microDetails[0].soft_water_pseudomonas,
      keyName: "soft_water_pseudomonas",
    },
    {
      id: 3,
      description: "Bag Filter O/L",
      field: formData.microDetails[0].bag_filter_pseudomonas,
      keyName: "bag_filter_pseudomonas",
    },
    {
      id: 4,
      description: "Storage Tank",
      field: formData.microDetails[0].storage_tank_pseudomonas,
      keyName: "storage_tank_pseudomonas",
    },
    {
      id: 5,
      description: "Water for Bleaching ",
      field: formData.microDetails[0].water_bleaching_pseudomonas,
      keyName: "water_bleaching_pseudomonas",
    },
    {
      id: 6,
      description: "PPD- AHU Inlet water to foggers",
      field: formData.microDetails[0].ppd_ahu_inlet_pseudomonas,
      keyName: "ppd_ahu_inlet_pseudomonas",
    },
    {
      id: 7,
      description: "PPD-AHU Fog chamber outlet water",
      field: formData.microDetails[0].ppd_ahu_fog_pseudomonas,
      keyName: "ppd_ahu_fog_pseudomonas",
    },
    {
      id: 8,
      description: "UV inlet  water",
      field: formData.microDetails[0].uv_inlet_pseudomonas,
      keyName: "uv_inlet_pseudomonas",
    },
    {
      id: 9,
      description: "UV outlet  water",
      field: formData.microDetails[0].uv_outlet_pseudomonas,
      keyName: "uv_outlet_pseudomonas",
    },
  ];
  const salmonellaData = [
    {
      id: 1,
      description: "RO Tank",
      field: formData.microDetails[0].ro_tank_salmonella,
      keyName: "ro_tank_salmonella",
    },
    {
      id: 2,
      description: "Soft water Tank",
      field: formData.microDetails[0].soft_water_salmonella,
      keyName: "soft_water_salmonella",
    },
    {
      id: 3,
      description: "Bag Filter O/L",
      field: formData.microDetails[0].bag_filter_salmonella,
      keyName: "bag_filter_salmonella",
    },
    {
      id: 4,
      description: "Storage Tank",
      field: formData.microDetails[0].storage_tank_salmonella,
      keyName: "storage_tank_salmonella",
    },
    {
      id: 5,
      description: "Water for Bleaching ",
      field: formData.microDetails[0].water_bleaching_salmonella,
      keyName: "water_bleaching_salmonella",
    },
    {
      id: 6,
      description: "PPD- AHU Inlet water to foggers",
      field: formData.microDetails[0].ppd_ahu_inlet_salmonella,
      keyName: "ppd_ahu_inlet_salmonella",
    },
    {
      id: 7,
      description: "PPD-AHU Fog chamber outlet water",
      field: formData.microDetails[0].ppd_ahu_fog_salmonella,
      keyName: "ppd_ahu_fog_salmonella",
    },
    {
      id: 8,
      description: "UV inlet  water",
      field: formData.microDetails[0].uv_inlet_salmonella,
      keyName: "uv_inlet_salmonella",
    },
    {
      id: 9,
      description: "UV outlet  water",
      field: formData.microDetails[0].uv_outlet_salmonella,
      keyName: "uv_outlet_salmonella",
    },
  ];

  const currentViable = totalViableData.slice(
    (currentPage.viableCurrentPage - 1) * rowsPerPage,
    currentPage.viableCurrentPage * rowsPerPage
  );
  const currentFungal = totalFungalData.slice(
    (currentPage.viableCurrentPage - 1) * rowsPerPage,
    currentPage.viableCurrentPage * rowsPerPage
  );
  const currentGramNegative = gramNegativeData.slice(
    (currentPage.viableCurrentPage - 1) * rowsPerPage,
    currentPage.viableCurrentPage * rowsPerPage
  );
  const currentEColi = EcoliData.slice(
    (currentPage.viableCurrentPage - 1) * rowsPerPage,
    currentPage.viableCurrentPage * rowsPerPage
  );
  const currentStaphy = staphyData.slice(
    (currentPage.viableCurrentPage - 1) * rowsPerPage,
    currentPage.viableCurrentPage * rowsPerPage
  );
  const currentPseudo = pseudoData.slice(
    (currentPage.viableCurrentPage - 1) * rowsPerPage,
    currentPage.viableCurrentPage * rowsPerPage
  );
  const currentSalmonella = salmonellaData.slice(
    (currentPage.viableCurrentPage - 1) * rowsPerPage,
    currentPage.viableCurrentPage * rowsPerPage
  );

  // ---------------------------------------------------------------

  // ----------------------------------------
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityControl/AR-F-007/Summary");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };
  useEffect(() => {
    const signatureKeys = [
      "chemist_sign",
      "qa_exe_sign",
      "manager_sign",
      "micro_sign",
    ];
    signatureKeys.forEach((key) => {
      const username = formData[key];
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [
    token,
    formData.chemist_sign,
    formData.qa_exe_sign,
    formData.manager_sign,
    formData.micro_sign,
  ]);

  useEffect(() => {
    if (!initialized.current) {
      if (
        role == "QA_MANAGER" ||
        role == "QC_MANAGER" ||
        role == "QA_EXECUTIVE"
      ) {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${  API.prodUrl}/Precot/api/QcForm/getWaterAnalysisReport?date=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "QA_EXECUTIVE") {
              message.warning("Chemist yet to submit");
              setTimeout(() => {
                navigate("/Precot/QualityControl/AR-F-007/Summary");
              }, 1000);
              return;
            }
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Chemist,QA Executive and Micro yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/AR-F-007/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              role == "QA_EXECUTIVE" &&
              data.chemist_status != "CHEMIST_APPROVED"
            ) {
              message.warning("Chemist yet to Submit");
              setTimeout(() => {
                navigate("/Precot/QualityControl/AR-F-007/Summary");
              }, 1000);
            }
            if (
              (role == "QA_MANAGER" || role == "QC_MANAGER") &&
              (data.chemist_status != "CHEMIST_APPROVED" ||
                data.qa_exe_status != "QA_EXE_APPROVED" ||
                data.micro_status != "MICROBIOLOGIST_APPROVED")
            ) {
              message.warning(
                "Chemist or QA Executive or Micro yet to approve!"
              );
              setTimeout(() => {
                navigate("/Precot/QualityControl/AR-F-007/Summary");
              }, 1000);
              return;
            }
            statusFunction(data);
            setFormData((prevState) => ({
              ...prevState,
              ...data,
              chemistDetails:
                data.chemistDetails && data.chemistDetails.length > 0
                  ? [
                      {
                        ...prevState.chemistDetails[0],
                        ...data.chemistDetails[0],
                      },
                    ]
                  : prevState.chemistDetails,
              microDetails:
                data.microDetails && data.microDetails.length > 0
                  ? [{ ...prevState.microDetails[0], ...data.microDetails[0] }]
                  : prevState.microDetails,
            }));
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, []);

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED" &&
      (responseData.qa_exe_status == "QA_EXE_APPROVED" ||
        responseData.qa_exe_status == "WAITING_FOR_APPROVAL" ||
        responseData.qa_exe_status == "") &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "WAITING_FOR_APPROVAL" ||
        responseData.manager_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      (responseData.manager_status == "QA_REJECTED" ||
        responseData.manager_status == "QC_REJECTED")
    ) {
      message.warning("Chemist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/AR-F-007/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      responseData.qa_exe_status == "QA_EXE_APPROVED" &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "WAITING_FOR_APPROVAL" ||
        responseData.manager_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      responseData.qa_exe_status == "QA_EXE_REJECTED"
    ) {
      message.warning("Chemist Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/AR-F-007/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.micro_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.micro_status == "MICROBIOLOGIST_APPROVED" &&
      (responseData.manager_status == "WAITING_FOR_APPROVAL" ||
        responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      responseData.qa_exe_status == "WAITING_FOR_APPROVAL"
    ) {
      message.warning("QA Executive Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/AR-F-007/Summary");
      }, 1000);
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.manager_status == "QC_REJECTED" ||
        responseData.manager_status == "QA_REJECTED")
    ) {
      message.warning("Chemist/Excutive or Micro Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/AR-F-007/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${  API.prodUrl}/Precot/api/QcForm/SaveWaterAnalysisReportF007`;
      if (role == "ROLE_CHEMIST") {
        payload = {
          water_id: formData.water_id,
          formatNo: "PH-QCL01-AR-F-007",
          revisionNo: "02",
          formatName: "WATER ANALYSIS REPORT",
          refSopNo: "PH-QCL01-D-05",
          ar_no: formData.ar_no,
          date: date,
          chemistDetails: [
            {
              chemist_id: formData.chemistDetails[0].chemist_id,
              equalization_ph_act:
                formData.chemistDetails[0].equalization_ph_act,
              equalization_hardness_act:
                formData.chemistDetails[0].equalization_hardness_act,
              equalization_tds_act:
                formData.chemistDetails[0].equalization_tds_act,
              equalization_turbidity_act:
                formData.chemistDetails[0].equalization_turbidity_act,
              equalization_frc_act:
                formData.chemistDetails[0].equalization_frc_act,
              equalization_tss_act:
                formData.chemistDetails[0].equalization_tss_act,
              equalization_do_act:
                formData.chemistDetails[0].equalization_do_act,
              equalization_cod_act:
                formData.chemistDetails[0].equalization_cod_act,
              equalization_bod_act:
                formData.chemistDetails[0].equalization_bod_act,
              equalization_mlss_act:
                formData.chemistDetails[0].equalization_mlss_act,
              equalization_mlvss_act:
                formData.chemistDetails[0].equalization_mlvss_act,
              equalization_sv_act:
                formData.chemistDetails[0].equalization_sv_act,
              primary_il_ph_act: formData.chemistDetails[0].primary_il_ph_act,
              primary_il_hardness_act:
                formData.chemistDetails[0].primary_il_hardness_act,
              primary_il_tds_act: formData.chemistDetails[0].primary_il_tds_act,
              primary_il_turbidity_act:
                formData.chemistDetails[0].primary_il_turbidity_act,
              primary_il_frc_act: formData.chemistDetails[0].primary_il_frc_act,
              primary_il_tss_act: formData.chemistDetails[0].primary_il_tss_act,
              primary_il_do_act: formData.chemistDetails[0].primary_il_do_act,
              primary_il_cod_act: formData.chemistDetails[0].primary_il_cod_act,
              primary_il_bod_act: formData.chemistDetails[0].primary_il_bod_act,
              primary_il_mlss_act:
                formData.chemistDetails[0].primary_il_mlss_act,
              primary_il_mlvss_act:
                formData.chemistDetails[0].primary_il_mlvss_act,
              primary_il_sv_act: formData.chemistDetails[0].primary_il_sv_act,
              primary_ol_ph_act: formData.chemistDetails[0].primary_ol_ph_act,
              primary_ol_hardness_act:
                formData.chemistDetails[0].primary_ol_hardness_act,
              primary_ol_tds_act: formData.chemistDetails[0].primary_ol_tds_act,
              primary_ol_turbidity_act:
                formData.chemistDetails[0].primary_ol_turbidity_act,
              primary_ol_frc_act: formData.chemistDetails[0].primary_ol_frc_act,
              primary_ol_tss_act: formData.chemistDetails[0].primary_ol_tss_act,
              primary_ol_do_act: formData.chemistDetails[0].primary_ol_do_act,
              primary_ol_cod_act: formData.chemistDetails[0].primary_ol_cod_act,
              primary_ol_bod_act: formData.chemistDetails[0].primary_ol_bod_act,
              primary_ol_mlss_act:
                formData.chemistDetails[0].primary_ol_mlss_act,
              primary_ol_mlvss_act:
                formData.chemistDetails[0].primary_ol_mlvss_act,
              primary_ol_sv_act: formData.chemistDetails[0].primary_ol_sv_act,
              aeration_tant_1_ph_act:
                formData.chemistDetails[0].aeration_tant_1_ph_act,
              aeration_tant_1_hardness_act:
                formData.chemistDetails[0].aeration_tant_1_hardness_act,
              aeration_tant_1_tds_act:
                formData.chemistDetails[0].aeration_tant_1_tds_act,
              aeration_tant_1_turbidity_act:
                formData.chemistDetails[0].aeration_tant_1_turbidity_act,
              aeration_tant_1_frc_act:
                formData.chemistDetails[0].aeration_tant_1_frc_act,
              aeration_tant_1_tss_act:
                formData.chemistDetails[0].aeration_tant_1_tss_act,
              aeration_tant_1_do_act:
                formData.chemistDetails[0].aeration_tant_1_do_act,
              aeration_tant_1_cod_act:
                formData.chemistDetails[0].aeration_tant_1_cod_act,
              aeration_tant_1_bod_act:
                formData.chemistDetails[0].aeration_tant_1_bod_act,
              aeration_tant_1_mlss_act:
                formData.chemistDetails[0].aeration_tant_1_mlss_act,
              aeration_tant_1_mlvss_act:
                formData.chemistDetails[0].aeration_tant_1_mlvss_act,
              aeration_tant_1_sv_act:
                formData.chemistDetails[0].aeration_tant_1_sv_act,
              aeration_tant_6_ph_act:
                formData.chemistDetails[0].aeration_tant_6_ph_act,
              aeration_tant_6_hardness_act:
                formData.chemistDetails[0].aeration_tant_6_hardness_act,
              aeration_tant_6_tds_act:
                formData.chemistDetails[0].aeration_tant_6_tds_act,
              aeration_tant_6_turbidity_act:
                formData.chemistDetails[0].aeration_tant_6_turbidity_act,
              aeration_tant_6_frc_act:
                formData.chemistDetails[0].aeration_tant_6_frc_act,
              aeration_tant_6_tss_act:
                formData.chemistDetails[0].aeration_tant_6_tss_act,
              aeration_tant_6_do_act:
                formData.chemistDetails[0].aeration_tant_6_do_act,
              aeration_tant_6_cod_act:
                formData.chemistDetails[0].aeration_tant_6_cod_act,
              aeration_tant_6_bod_act:
                formData.chemistDetails[0].aeration_tant_6_bod_act,
              aeration_tant_6_mlss_act:
                formData.chemistDetails[0].aeration_tant_6_mlss_act,
              aeration_tant_6_mlvss_act:
                formData.chemistDetails[0].aeration_tant_6_mlvss_act,
              aeration_tant_6_sv_act:
                formData.chemistDetails[0].aeration_tant_6_sv_act,
              secondary_ol_ph_act:
                formData.chemistDetails[0].secondary_ol_ph_act,
              secondary_ol_hardness_act:
                formData.chemistDetails[0].secondary_ol_hardness_act,
              secondary_ol_tds_act:
                formData.chemistDetails[0].secondary_ol_tds_act,
              secondary_ol_turbidity_act:
                formData.chemistDetails[0].secondary_ol_turbidity_act,
              secondary_ol_frc_act:
                formData.chemistDetails[0].secondary_ol_frc_act,
              secondary_ol_tss_act:
                formData.chemistDetails[0].secondary_ol_tss_act,
              secondary_ol_do_act:
                formData.chemistDetails[0].secondary_ol_do_act,
              secondary_ol_cod_act:
                formData.chemistDetails[0].secondary_ol_cod_act,
              secondary_ol_bod_act:
                formData.chemistDetails[0].secondary_ol_bod_act,
              secondary_ol_mlss_act:
                formData.chemistDetails[0].secondary_ol_mlss_act,
              secondary_ol_mlvss_act:
                formData.chemistDetails[0].secondary_ol_mlvss_act,
              secondary_ol_sv_act:
                formData.chemistDetails[0].secondary_ol_sv_act,
              uf_feed_ph_act: formData.chemistDetails[0].uf_feed_ph_act,
              uf_feed_hardness_act:
                formData.chemistDetails[0].uf_feed_hardness_act,
              uf_feed_tds_act: formData.chemistDetails[0].uf_feed_tds_act,
              uf_feed_turbidity_act:
                formData.chemistDetails[0].uf_feed_turbidity_act,
              uf_feed_frc_act: formData.chemistDetails[0].uf_feed_frc_act,
              uf_feed_tss_act: formData.chemistDetails[0].uf_feed_tss_act,
              uf_feed_do_act: formData.chemistDetails[0].uf_feed_do_act,
              uf_feed_cod_act: formData.chemistDetails[0].uf_feed_cod_act,
              uf_feed_bod_act: formData.chemistDetails[0].uf_feed_bod_act,
              uf_feed_mlss_act: formData.chemistDetails[0].uf_feed_mlss_act,
              uf_feed_mlvss_act: formData.chemistDetails[0].uf_feed_mlvss_act,
              uf_feed_sv_act: formData.chemistDetails[0].uf_feed_sv_act,
              ro_01_feed_ph_act: formData.chemistDetails[0].ro_01_feed_ph_act,
              ro_01_feed_hardness_act:
                formData.chemistDetails[0].ro_01_feed_hardness_act,
              ro_01_feed_tds_act: formData.chemistDetails[0].ro_01_feed_tds_act,
              ro_01_feed_turbidity_act:
                formData.chemistDetails[0].ro_01_feed_turbidity_act,
              ro_01_feed_frc_act: formData.chemistDetails[0].ro_01_feed_frc_act,
              ro_01_feed_tss_act: formData.chemistDetails[0].ro_01_feed_tss_act,
              ro_01_feed_do_act: formData.chemistDetails[0].ro_01_feed_do_act,
              ro_01_feed_cod_act: formData.chemistDetails[0].ro_01_feed_cod_act,
              ro_01_feed_bod_act: formData.chemistDetails[0].ro_01_feed_bod_act,
              ro_01_feed_mlss_act:
                formData.chemistDetails[0].ro_01_feed_mlss_act,
              ro_01_feed_mlvss_act:
                formData.chemistDetails[0].ro_01_feed_mlvss_act,
              ro_01_feed_sv_act: formData.chemistDetails[0].ro_01_feed_sv_act,
              ro_01_permeate_ph_act:
                formData.chemistDetails[0].ro_01_permeate_ph_act,
              ro_01_permeate_hardness_act:
                formData.chemistDetails[0].ro_01_permeate_hardness_act,
              ro_01_permeate_tds_act:
                formData.chemistDetails[0].ro_01_permeate_tds_act,
              ro_01_permeate_turbidity_act:
                formData.chemistDetails[0].ro_01_permeate_turbidity_act,
              ro_01_permeate_frc_act:
                formData.chemistDetails[0].ro_01_permeate_frc_act,
              ro_01_permeate_tss_act:
                formData.chemistDetails[0].ro_01_permeate_tss_act,
              ro_01_permeate_do_act:
                formData.chemistDetails[0].ro_01_permeate_do_act,
              ro_01_permeate_cod_act:
                formData.chemistDetails[0].ro_01_permeate_cod_act,
              ro_01_permeate_bod_act:
                formData.chemistDetails[0].ro_01_permeate_bod_act,
              ro_01_permeate_mlss_act:
                formData.chemistDetails[0].ro_01_permeate_mlss_act,
              ro_01_permeate_mlvss_act:
                formData.chemistDetails[0].ro_01_permeate_mlvss_act,
              ro_01_permeate_sv_act:
                formData.chemistDetails[0].ro_01_permeate_sv_act,
              ro_02_feed_ph_act: formData.chemistDetails[0].ro_02_feed_ph_act,
              ro_02_feed_hardness_act:
                formData.chemistDetails[0].ro_02_feed_hardness_act,
              ro_02_feed_tds_act: formData.chemistDetails[0].ro_02_feed_tds_act,
              ro_02_feed_turbidity_act:
                formData.chemistDetails[0].ro_02_feed_turbidity_act,
              ro_02_feed_frc_act: formData.chemistDetails[0].ro_02_feed_frc_act,
              ro_02_feed_tss_act: formData.chemistDetails[0].ro_02_feed_tss_act,
              ro_02_feed_do_act: formData.chemistDetails[0].ro_02_feed_do_act,
              ro_02_feed_cod_act: formData.chemistDetails[0].ro_02_feed_cod_act,
              ro_02_feed_bod_act: formData.chemistDetails[0].ro_02_feed_bod_act,
              ro_02_feed_mlss_act:
                formData.chemistDetails[0].ro_02_feed_mlss_act,
              ro_02_feed_mlvss_act:
                formData.chemistDetails[0].ro_02_feed_mlvss_act,
              ro_02_feed_sv_act: formData.chemistDetails[0].ro_02_feed_sv_act,
              ro_02_permeate_ph_act:
                formData.chemistDetails[0].ro_02_permeate_ph_act,
              ro_02_permeate_hardness_act:
                formData.chemistDetails[0].ro_02_permeate_hardness_act,
              ro_02_permeate_tds_act:
                formData.chemistDetails[0].ro_02_permeate_tds_act,
              ro_02_permeate_turbidity_act:
                formData.chemistDetails[0].ro_02_permeate_turbidity_act,
              ro_02_permeate_frc_act:
                formData.chemistDetails[0].ro_02_permeate_frc_act,
              ro_02_permeate_tss_act:
                formData.chemistDetails[0].ro_02_permeate_tss_act,
              ro_02_permeate_do_act:
                formData.chemistDetails[0].ro_02_permeate_do_act,
              ro_02_permeate_cod_act:
                formData.chemistDetails[0].ro_02_permeate_cod_act,
              ro_02_permeate_bod_act:
                formData.chemistDetails[0].ro_02_permeate_bod_act,
              ro_02_permeate_mlss_act:
                formData.chemistDetails[0].ro_02_permeate_mlss_act,
              ro_02_permeate_mlvss_act:
                formData.chemistDetails[0].ro_02_permeate_mlvss_act,
              ro_02_permeate_sv_act:
                formData.chemistDetails[0].ro_02_permeate_sv_act,
              ro_03_feed_ph_act: formData.chemistDetails[0].ro_03_feed_ph_act,
              ro_03_feed_hardness_act:
                formData.chemistDetails[0].ro_03_feed_hardness_act,
              ro_03_feed_tds_act: formData.chemistDetails[0].ro_03_feed_tds_act,
              ro_03_feed_turbidity_act:
                formData.chemistDetails[0].ro_03_feed_turbidity_act,
              ro_03_feed_frc_act: formData.chemistDetails[0].ro_03_feed_frc_act,
              ro_03_feed_tss_act: formData.chemistDetails[0].ro_03_feed_tss_act,
              ro_03_feed_do_act: formData.chemistDetails[0].ro_03_feed_do_act,
              ro_03_feed_cod_act: formData.chemistDetails[0].ro_03_feed_cod_act,
              ro_03_feed_bod_act: formData.chemistDetails[0].ro_03_feed_bod_act,
              ro_03_feed_mlss_act:
                formData.chemistDetails[0].ro_03_feed_mlss_act,
              ro_03_feed_mlvss_act:
                formData.chemistDetails[0].ro_03_feed_mlvss_act,
              ro_03_feed_sv_act: formData.chemistDetails[0].ro_03_feed_sv_act,
              ro_03_permeate_ph_act:
                formData.chemistDetails[0].ro_03_permeate_ph_act,
              ro_03_permeate_hardness_act:
                formData.chemistDetails[0].ro_03_permeate_hardness_act,
              ro_03_permeate_tds_act:
                formData.chemistDetails[0].ro_03_permeate_tds_act,
              ro_03_permeate_turbidity_act:
                formData.chemistDetails[0].ro_03_permeate_turbidity_act,
              ro_03_permeate_frc_act:
                formData.chemistDetails[0].ro_03_permeate_frc_act,
              ro_03_permeate_tss_act:
                formData.chemistDetails[0].ro_03_permeate_tss_act,
              ro_03_permeate_do_act:
                formData.chemistDetails[0].ro_03_permeate_do_act,
              ro_03_permeate_cod_act:
                formData.chemistDetails[0].ro_03_permeate_cod_act,
              ro_03_permeate_bod_act:
                formData.chemistDetails[0].ro_03_permeate_bod_act,
              ro_03_permeate_mlss_act:
                formData.chemistDetails[0].ro_03_permeate_mlss_act,
              ro_03_permeate_mlvss_act:
                formData.chemistDetails[0].ro_03_permeate_mlvss_act,
              ro_03_permeate_sv_act:
                formData.chemistDetails[0].ro_03_permeate_sv_act,
              ro_04_feed_ph_act: formData.chemistDetails[0].ro_04_feed_ph_act,
              ro_04_feed_hardness_act:
                formData.chemistDetails[0].ro_04_feed_hardness_act,
              ro_04_feed_tds_act: formData.chemistDetails[0].ro_04_feed_tds_act,
              ro_04_feed_turbidity_act:
                formData.chemistDetails[0].ro_04_feed_turbidity_act,
              ro_04_feed_frc_act: formData.chemistDetails[0].ro_04_feed_frc_act,
              ro_04_feed_tss_act: formData.chemistDetails[0].ro_04_feed_tss_act,
              ro_04_feed_do_act: formData.chemistDetails[0].ro_04_feed_do_act,
              ro_04_feed_cod_act: formData.chemistDetails[0].ro_04_feed_cod_act,
              ro_04_feed_bod_act: formData.chemistDetails[0].ro_04_feed_bod_act,
              ro_04_feed_mlss_act:
                formData.chemistDetails[0].ro_04_feed_mlss_act,
              ro_04_feed_mlvss_act:
                formData.chemistDetails[0].ro_04_feed_mlvss_act,
              ro_04_feed_sv_act: formData.chemistDetails[0].ro_04_feed_sv_act,
              ro_04_permeate_ph_act:
                formData.chemistDetails[0].ro_04_permeate_ph_act,
              ro_04_permeate_hardness_act:
                formData.chemistDetails[0].ro_04_permeate_hardness_act,
              ro_04_permeate_tds_act:
                formData.chemistDetails[0].ro_04_permeate_tds_act,
              ro_04_permeate_turbidity_act:
                formData.chemistDetails[0].ro_04_permeate_turbidity_act,
              ro_04_permeate_frc_act:
                formData.chemistDetails[0].ro_04_permeate_frc_act,
              ro_04_permeate_tss_act:
                formData.chemistDetails[0].ro_04_permeate_tss_act,
              ro_04_permeate_do_act:
                formData.chemistDetails[0].ro_04_permeate_do_act,
              ro_04_permeate_cod_act:
                formData.chemistDetails[0].ro_04_permeate_cod_act,
              ro_04_permeate_bod_act:
                formData.chemistDetails[0].ro_04_permeate_bod_act,
              ro_04_permeate_mlss_act:
                formData.chemistDetails[0].ro_04_permeate_mlss_act,
              ro_04_permeate_mlvss_act:
                formData.chemistDetails[0].ro_04_permeate_mlvss_act,
              ro_04_permeate_sv_act:
                formData.chemistDetails[0].ro_04_permeate_sv_act,
              mee_feed_ph_act: formData.chemistDetails[0].mee_feed_ph_act,
              mee_feed_hardness_act:
                formData.chemistDetails[0].mee_feed_hardness_act,
              mee_feed_tds_act: formData.chemistDetails[0].mee_feed_tds_act,
              mee_feed_turbidity_act:
                formData.chemistDetails[0].mee_feed_turbidity_act,
              mee_feed_frc_act: formData.chemistDetails[0].mee_feed_frc_act,
              mee_feed_tss_act: formData.chemistDetails[0].mee_feed_tss_act,
              mee_feed_do_act: formData.chemistDetails[0].mee_feed_do_act,
              mee_feed_cod_act: formData.chemistDetails[0].mee_feed_cod_act,
              mee_feed_bod_act: formData.chemistDetails[0].mee_feed_bod_act,
              mee_feed_mlss_act: formData.chemistDetails[0].mee_feed_mlss_act,
              mee_feed_mlvss_act: formData.chemistDetails[0].mee_feed_mlvss_act,
              mee_feed_sv_act: formData.chemistDetails[0].mee_feed_sv_act,
              mee_condensate_ph_act:
                formData.chemistDetails[0].mee_condensate_ph_act,
              mee_condensate_hardness_act:
                formData.chemistDetails[0].mee_condensate_hardness_act,
              mee_condensate_tds_act:
                formData.chemistDetails[0].mee_condensate_tds_act,
              mee_condensate_turbidity_act:
                formData.chemistDetails[0].mee_condensate_turbidity_act,
              mee_condensate_frc_act:
                formData.chemistDetails[0].mee_condensate_frc_act,
              mee_condensate_tss_act:
                formData.chemistDetails[0].mee_condensate_tss_act,
              mee_condensate_do_act:
                formData.chemistDetails[0].mee_condensate_do_act,
              mee_condensate_cod_act:
                formData.chemistDetails[0].mee_condensate_cod_act,
              mee_condensate_bod_act:
                formData.chemistDetails[0].mee_condensate_bod_act,
              mee_condensate_mlss_act:
                formData.chemistDetails[0].mee_condensate_mlss_act,
              mee_condensate_mlvss_act:
                formData.chemistDetails[0].mee_condensate_mlvss_act,
              mee_condensate_sv_act:
                formData.chemistDetails[0].mee_condensate_sv_act,
              mee_concentrate_ph_act:
                formData.chemistDetails[0].mee_concentrate_ph_act,
              mee_concentrate_hardness_act:
                formData.chemistDetails[0].mee_concentrate_hardness_act,
              mee_concentrate_tds_act:
                formData.chemistDetails[0].mee_concentrate_tds_act,
              mee_concentrate_turbidity_act:
                formData.chemistDetails[0].mee_concentrate_turbidity_act,
              mee_concentrate_frc_act:
                formData.chemistDetails[0].mee_concentrate_frc_act,
              mee_concentrate_tss_act:
                formData.chemistDetails[0].mee_concentrate_tss_act,
              mee_concentrate_do_act:
                formData.chemistDetails[0].mee_concentrate_do_act,
              mee_concentrate_cod_act:
                formData.chemistDetails[0].mee_concentrate_cod_act,
              mee_concentrate_bod_act:
                formData.chemistDetails[0].mee_concentrate_bod_act,
              mee_concentrate_mlss_act:
                formData.chemistDetails[0].mee_concentrate_mlss_act,
              mee_concentrate_mlvss_act:
                formData.chemistDetails[0].mee_concentrate_mlvss_act,
              mee_concentrate_sv_act:
                formData.chemistDetails[0].mee_concentrate_sv_act,
              ro_tank_ph_act: formData.chemistDetails[0].ro_tank_ph_act,
              ro_tank_hardness_act:
                formData.chemistDetails[0].ro_tank_hardness_act,
              ro_tank_tds_act: formData.chemistDetails[0].ro_tank_tds_act,
              ro_tank_turbidity_act:
                formData.chemistDetails[0].ro_tank_turbidity_act,
              ro_tank_frc_act: formData.chemistDetails[0].ro_tank_frc_act,
              ro_tank_tss_act: formData.chemistDetails[0].ro_tank_tss_act,
              ro_tank_do_act: formData.chemistDetails[0].ro_tank_do_act,
              ro_tank_cod_act: formData.chemistDetails[0].ro_tank_cod_act,
              ro_tank_bod_act: formData.chemistDetails[0].ro_tank_bod_act,
              ro_tank_mlss_act: formData.chemistDetails[0].ro_tank_mlss_act,
              ro_tank_mlvss_act: formData.chemistDetails[0].ro_tank_mlvss_act,
              ro_tank_sv_act: formData.chemistDetails[0].ro_tank_sv_act,
              soft_water_ph_act: formData.chemistDetails[0].soft_water_ph_act,
              soft_water_hardness_act:
                formData.chemistDetails[0].soft_water_hardness_act,
              soft_water_tds_act: formData.chemistDetails[0].soft_water_tds_act,
              soft_water_turbidity_act:
                formData.chemistDetails[0].soft_water_turbidity_act,
              soft_water_frc_act: formData.chemistDetails[0].soft_water_frc_act,
              soft_water_tss_act: formData.chemistDetails[0].soft_water_tss_act,
              soft_water_do_act: formData.chemistDetails[0].soft_water_do_act,
              soft_water_cod_act: formData.chemistDetails[0].soft_water_cod_act,
              soft_water_bod_act: formData.chemistDetails[0].soft_water_bod_act,
              soft_water_mlss_act:
                formData.chemistDetails[0].soft_water_mlss_act,
              soft_water_mlvss_act:
                formData.chemistDetails[0].soft_water_mlvss_act,
              soft_water_sv_act: formData.chemistDetails[0].soft_water_sv_act,
              kiadb_ph_act: formData.chemistDetails[0].kiadb_ph_act,
              kiadb_hardness_act: formData.chemistDetails[0].kiadb_hardness_act,
              kiadb_tds_act: formData.chemistDetails[0].kiadb_tds_act,
              kiadb_turbidity_act:
                formData.chemistDetails[0].kiadb_turbidity_act,
              kiadb_frc_act: formData.chemistDetails[0].kiadb_frc_act,
              kiadb_tss_act: formData.chemistDetails[0].kiadb_tss_act,
              kiadb_do_act: formData.chemistDetails[0].kiadb_do_act,
              kiadb_cod_act: formData.chemistDetails[0].kiadb_cod_act,
              kiadb_bod_act: formData.chemistDetails[0].kiadb_bod_act,
              kiadb_mlss_act: formData.chemistDetails[0].kiadb_mlss_act,
              kiadb_mlvss_act: formData.chemistDetails[0].kiadb_mlvss_act,
              kiadb_sv_act: formData.chemistDetails[0].kiadb_sv_act,
              softner_ph_act: formData.chemistDetails[0].softner_ph_act,
              softner_hardness_act:
                formData.chemistDetails[0].softner_hardness_act,
              softner_tds_act: formData.chemistDetails[0].softner_tds_act,
              softner_turbidity_act:
                formData.chemistDetails[0].softner_turbidity_act,
              softner_frc_act: formData.chemistDetails[0].softner_frc_act,
              softner_tss_act: formData.chemistDetails[0].softner_tss_act,
              softner_do_act: formData.chemistDetails[0].softner_do_act,
              softner_cod_act: formData.chemistDetails[0].softner_cod_act,
              softner_bod_act: formData.chemistDetails[0].softner_bod_act,
              softner_mlss_act: formData.chemistDetails[0].softner_mlss_act,
              softner_mlvss_act: formData.chemistDetails[0].softner_mlvss_act,
              softner_sv_act: formData.chemistDetails[0].softner_sv_act,
              stp_treated_ph_act: formData.chemistDetails[0].stp_treated_ph_act,
              stp_treated_hardness_act:
                formData.chemistDetails[0].stp_treated_hardness_act,
              stp_treated_tds_act:
                formData.chemistDetails[0].stp_treated_tds_act,
              stp_treated_turbidity_act:
                formData.chemistDetails[0].stp_treated_turbidity_act,
              stp_treated_frc_act:
                formData.chemistDetails[0].stp_treated_frc_act,
              stp_treated_tss_act:
                formData.chemistDetails[0].stp_treated_tss_act,
              stp_treated_do_act: formData.chemistDetails[0].stp_treated_do_act,
              stp_treated_cod_act:
                formData.chemistDetails[0].stp_treated_cod_act,
              stp_treated_bod_act:
                formData.chemistDetails[0].stp_treated_bod_act,
              stp_treated_mlss_act:
                formData.chemistDetails[0].stp_treated_mlss_act,
              stp_treated_mlvss_act:
                formData.chemistDetails[0].stp_treated_mlvss_act,
              stp_treated_sv_act: formData.chemistDetails[0].stp_treated_sv_act,
              bag_filter_ph_act: formData.chemistDetails[0].bag_filter_ph_act,
              bag_filter_hardness_act:
                formData.chemistDetails[0].bag_filter_hardness_act,
              bag_filter_tds_act: formData.chemistDetails[0].bag_filter_tds_act,
              bag_filter_turbidity_act:
                formData.chemistDetails[0].bag_filter_turbidity_act,
              bag_filter_frc_act: formData.chemistDetails[0].bag_filter_frc_act,
              bag_filter_tss_act: formData.chemistDetails[0].bag_filter_tss_act,
              bag_filter_do_act: formData.chemistDetails[0].bag_filter_do_act,
              bag_filter_cod_act: formData.chemistDetails[0].bag_filter_cod_act,
              bag_filter_bod_act: formData.chemistDetails[0].bag_filter_bod_act,
              bag_filter_mlss_act:
                formData.chemistDetails[0].bag_filter_mlss_act,
              bag_filter_mlvss_act:
                formData.chemistDetails[0].bag_filter_mlvss_act,
              bag_filter_sv_act: formData.chemistDetails[0].bag_filter_sv_act,
              storage_tank_ph_act:
                formData.chemistDetails[0].storage_tank_ph_act,
              storage_tank_hardness_act:
                formData.chemistDetails[0].storage_tank_hardness_act,
              storage_tank_tds_act:
                formData.chemistDetails[0].storage_tank_tds_act,
              storage_tank_turbidity_act:
                formData.chemistDetails[0].storage_tank_turbidity_act,
              storage_tank_frc_act:
                formData.chemistDetails[0].storage_tank_frc_act,
              storage_tank_tss_act:
                formData.chemistDetails[0].storage_tank_tss_act,
              storage_tank_do_act:
                formData.chemistDetails[0].storage_tank_do_act,
              storage_tank_cod_act:
                formData.chemistDetails[0].storage_tank_cod_act,
              storage_tank_bod_act:
                formData.chemistDetails[0].storage_tank_bod_act,
              storage_tank_mlss_act:
                formData.chemistDetails[0].storage_tank_mlss_act,
              storage_tank_mlvss_act:
                formData.chemistDetails[0].storage_tank_mlvss_act,
              storage_tank_sv_act:
                formData.chemistDetails[0].storage_tank_sv_act,
              remarks:
                role == "ROLE_CHEMIST" &&
                formData.chemistDetails[0].remarks !== ""
                  ? formData.chemistDetails[0].remarks
                  : "NA",
            },
          ],
        };
      }
      if (role == "ROLE_MICROBIOLOGIST") {
        payload = {
          water_id: formData.water_id,
          formatNo: "PH-QCL01-AR-F-007",
          revisionNo: "02",
          formatName: "WATER ANALYSIS REPORT",
          refSopNo: "PH-QCL01-D-05",
          ar_no: formData.ar_no,
          date: date,
          microDetails: [
            {
              micro_id: formData.microDetails[0].micro_id,
              equalization_sampled:
                formData.microDetails[0].equalization_sampled,
              equalization_incubation: date,
              equalization_test_completion:
                formData.microDetails[0].equalization_test_completion,
              ro_tank_total_vaible:
                formData.microDetails[0].ro_tank_total_vaible,
              ro_tank_total_fungal:
                formData.microDetails[0].ro_tank_total_fungal,
              ro_tank_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_gram !== ""
                  ? formData.microDetails[0].ro_tank_gram
                  : "NA",
              ro_tank_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_escherechia !== ""
                  ? formData.microDetails[0].ro_tank_escherechia
                  : "NA",
              ro_tank_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_staphylococcos !== ""
                  ? formData.microDetails[0].ro_tank_staphylococcos
                  : "NA",
              ro_tank_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_pseudomonas !== ""
                  ? formData.microDetails[0].ro_tank_pseudomonas
                  : "NA",
              ro_tank_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_salmonella !== ""
                  ? formData.microDetails[0].ro_tank_salmonella
                  : "NA",
              soft_water_total_vaible:
                formData.microDetails[0].soft_water_total_vaible,
              soft_water_total_fungal:
                formData.microDetails[0].soft_water_total_fungal,
              soft_water_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_gram !== ""
                  ? formData.microDetails[0].soft_water_gram
                  : "NA",
              soft_water_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_escherechia !== ""
                  ? formData.microDetails[0].soft_water_escherechia
                  : "NA",
              soft_water_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_staphylococcos !== ""
                  ? formData.microDetails[0].soft_water_staphylococcos
                  : "NA",
              soft_water_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_pseudomonas !== ""
                  ? formData.microDetails[0].soft_water_pseudomonas
                  : "NA",
              soft_water_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_salmonella !== ""
                  ? formData.microDetails[0].soft_water_salmonella
                  : "NA",
              bag_filter_total_vaible:
                formData.microDetails[0].bag_filter_total_vaible,
              bag_filter_total_fungal:
                formData.microDetails[0].bag_filter_total_fungal,
              bag_filter_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_gram !== ""
                  ? formData.microDetails[0].bag_filter_gram
                  : "NA",
              bag_filter_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_escherechia !== ""
                  ? formData.microDetails[0].bag_filter_escherechia
                  : "NA",
              bag_filter_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_staphylococcos !== ""
                  ? formData.microDetails[0].bag_filter_staphylococcos
                  : "NA",
              bag_filter_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_pseudomonas !== ""
                  ? formData.microDetails[0].bag_filter_pseudomonas
                  : "NA",
              bag_filter_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_salmonella !== ""
                  ? formData.microDetails[0].bag_filter_salmonella
                  : "NA",
              storage_tank_total_vaible:
                formData.microDetails[0].storage_tank_total_vaible,
              storage_tank_total_fungal:
                formData.microDetails[0].storage_tank_total_fungal,
              storage_tank_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_gram !== ""
                  ? formData.microDetails[0].storage_tank_gram
                  : "NA",
              storage_tank_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_escherechia !== ""
                  ? formData.microDetails[0].storage_tank_escherechia
                  : "NA",
              storage_tank_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_staphylococcos !== ""
                  ? formData.microDetails[0].storage_tank_staphylococcos
                  : "NA",
              storage_tank_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_pseudomonas !== ""
                  ? formData.microDetails[0].storage_tank_pseudomonas
                  : "NA",
              storage_tank_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_salmonella !== ""
                  ? formData.microDetails[0].storage_tank_salmonella
                  : "NA",
              water_bleaching_total_vaible:
                formData.microDetails[0].water_bleaching_total_vaible,
              water_bleaching_total_fungal:
                formData.microDetails[0].water_bleaching_total_fungal,
              water_bleaching_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_gram !== ""
                  ? formData.microDetails[0].water_bleaching_gram
                  : "NA",
              water_bleaching_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_escherechia !== ""
                  ? formData.microDetails[0].water_bleaching_escherechia
                  : "NA",
              water_bleaching_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_staphylococcos !== ""
                  ? formData.microDetails[0].water_bleaching_staphylococcos
                  : "NA",
              water_bleaching_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_pseudomonas !== ""
                  ? formData.microDetails[0].water_bleaching_pseudomonas
                  : "NA",
              water_bleaching_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_salmonella !== ""
                  ? formData.microDetails[0].water_bleaching_salmonella
                  : "NA",
              ppd_ahu_inlet_total_vaible:
                formData.microDetails[0].ppd_ahu_inlet_total_vaible,
              ppd_ahu_inlet_total_fungal:
                formData.microDetails[0].ppd_ahu_inlet_total_fungal,
              ppd_ahu_inlet_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_gram !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_gram
                  : "NA",
              ppd_ahu_inlet_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_escherechia !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_escherechia
                  : "NA",
              ppd_ahu_inlet_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_staphylococcos !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_staphylococcos
                  : "NA",
              ppd_ahu_inlet_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_pseudomonas !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_pseudomonas
                  : "NA",
              ppd_ahu_inlet_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_salmonella !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_salmonella
                  : "NA",
              ppd_ahu_fog_total_vaible:
                formData.microDetails[0].ppd_ahu_fog_total_vaible,
              ppd_ahu_fog_total_fungal:
                formData.microDetails[0].ppd_ahu_fog_total_fungal,
              ppd_ahu_fog_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_gram !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_gram
                  : "NA",
              ppd_ahu_fog_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_escherechia !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_escherechia
                  : "NA",
              ppd_ahu_fog_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_staphylococcos !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_staphylococcos
                  : "NA",
              ppd_ahu_fog_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_pseudomonas !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_pseudomonas
                  : "NA",
              ppd_ahu_fog_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_salmonella !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_salmonella
                  : "NA",
              uv_inlet_total_vaible:
                formData.microDetails[0].uv_inlet_total_vaible,
              uv_inlet_total_fungal:
                formData.microDetails[0].uv_inlet_total_fungal,
              uv_inlet_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_gram !== ""
                  ? formData.microDetails[0].uv_inlet_gram
                  : "NA",
              uv_inlet_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_escherechia !== ""
                  ? formData.microDetails[0].uv_inlet_escherechia
                  : "NA",
              uv_inlet_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_staphylococcos !== ""
                  ? formData.microDetails[0].uv_inlet_staphylococcos
                  : "NA",
              uv_inlet_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_pseudomonas !== ""
                  ? formData.microDetails[0].uv_inlet_pseudomonas
                  : "NA",
              uv_inlet_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_salmonella !== ""
                  ? formData.microDetails[0].uv_inlet_salmonella
                  : "NA",
              uv_outlet_total_vaible:
                formData.microDetails[0].uv_outlet_total_vaible,
              uv_outlet_total_fungal:
                formData.microDetails[0].uv_outlet_total_fungal,
              uv_outlet_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_gram !== ""
                  ? formData.microDetails[0].uv_outlet_gram
                  : "NA",
              uv_outlet_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_escherechia !== ""
                  ? formData.microDetails[0].uv_outlet_escherechia
                  : "NA",
              uv_outlet_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_staphylococcos !== ""
                  ? formData.microDetails[0].uv_outlet_staphylococcos
                  : "NA",
              uv_outlet_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_pseudomonas !== ""
                  ? formData.microDetails[0].uv_outlet_pseudomonas
                  : "NA",
              uv_outlet_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_salmonella !== ""
                  ? formData.microDetails[0].uv_outlet_salmonella
                  : "NA",
              remarks:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].remarks !== ""
                  ? formData.microDetails[0].remarks
                  : "NA",
            },
          ],
        };
      }
    } else if (
      role == "QA_MANAGER" ||
      role == "QC_MANAGER" ||
      role == "QA_EXECUTIVE"
    ) {
      apiurl = `${  API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF007`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.water_id,
        formatNo: "PH-QCL01-AR-F-007",
        status: "Approve",
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod =
        role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
          ? axios.post
          : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/AR-F-007/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      if (role == "ROLE_CHEMIST") {
        if (formData.ar_no == "" || formData.ar_no == null) {
          message.warning("Please fill Ar Details");
          return;
        }

        // if (!handleEmptyFieldForChemist()) {
        //   return;
        // }

        payload = {
          water_id: formData.water_id,
          formatNo: "PH-QCL01-AR-F-007",
          revisionNo: "02",
          formatName: "WATER ANALYSIS REPORT",
          refSopNo: "PH-QCL01-D-05",
          ar_no: formData.ar_no,
          date: date,
          chemistDetails: [
            {
              chemist_id: formData.chemistDetails[0].chemist_id,
              equalization_ph_act:
                formData.chemistDetails[0].equalization_ph_act,
              equalization_hardness_act:
                formData.chemistDetails[0].equalization_hardness_act,
              equalization_tds_act:
                formData.chemistDetails[0].equalization_tds_act,
              equalization_turbidity_act:
                formData.chemistDetails[0].equalization_turbidity_act,
              equalization_frc_act:
                formData.chemistDetails[0].equalization_frc_act,
              equalization_tss_act:
                formData.chemistDetails[0].equalization_tss_act,
              equalization_do_act:
                formData.chemistDetails[0].equalization_do_act,
              equalization_cod_act:
                formData.chemistDetails[0].equalization_cod_act,
              equalization_bod_act:
                formData.chemistDetails[0].equalization_bod_act,
              equalization_mlss_act:
                formData.chemistDetails[0].equalization_mlss_act,
              equalization_mlvss_act:
                formData.chemistDetails[0].equalization_mlvss_act,
              equalization_sv_act:
                formData.chemistDetails[0].equalization_sv_act,
              primary_il_ph_act: formData.chemistDetails[0].primary_il_ph_act,
              primary_il_hardness_act:
                formData.chemistDetails[0].primary_il_hardness_act,
              primary_il_tds_act: formData.chemistDetails[0].primary_il_tds_act,
              primary_il_turbidity_act:
                formData.chemistDetails[0].primary_il_turbidity_act,
              primary_il_frc_act: formData.chemistDetails[0].primary_il_frc_act,
              primary_il_tss_act: formData.chemistDetails[0].primary_il_tss_act,
              primary_il_do_act: formData.chemistDetails[0].primary_il_do_act,
              primary_il_cod_act: formData.chemistDetails[0].primary_il_cod_act,
              primary_il_bod_act: formData.chemistDetails[0].primary_il_bod_act,
              primary_il_mlss_act:
                formData.chemistDetails[0].primary_il_mlss_act,
              primary_il_mlvss_act:
                formData.chemistDetails[0].primary_il_mlvss_act,
              primary_il_sv_act: formData.chemistDetails[0].primary_il_sv_act,
              primary_ol_ph_act: formData.chemistDetails[0].primary_ol_ph_act,
              primary_ol_hardness_act:
                formData.chemistDetails[0].primary_ol_hardness_act,
              primary_ol_tds_act: formData.chemistDetails[0].primary_ol_tds_act,
              primary_ol_turbidity_act:
                formData.chemistDetails[0].primary_ol_turbidity_act,
              primary_ol_frc_act: formData.chemistDetails[0].primary_ol_frc_act,
              primary_ol_tss_act: formData.chemistDetails[0].primary_ol_tss_act,
              primary_ol_do_act: formData.chemistDetails[0].primary_ol_do_act,
              primary_ol_cod_act: formData.chemistDetails[0].primary_ol_cod_act,
              primary_ol_bod_act: formData.chemistDetails[0].primary_ol_bod_act,
              primary_ol_mlss_act:
                formData.chemistDetails[0].primary_ol_mlss_act,
              primary_ol_mlvss_act:
                formData.chemistDetails[0].primary_ol_mlvss_act,
              primary_ol_sv_act: formData.chemistDetails[0].primary_ol_sv_act,
              aeration_tant_1_ph_act:
                formData.chemistDetails[0].aeration_tant_1_ph_act,
              aeration_tant_1_hardness_act:
                formData.chemistDetails[0].aeration_tant_1_hardness_act,
              aeration_tant_1_tds_act:
                formData.chemistDetails[0].aeration_tant_1_tds_act,
              aeration_tant_1_turbidity_act:
                formData.chemistDetails[0].aeration_tant_1_turbidity_act,
              aeration_tant_1_frc_act:
                formData.chemistDetails[0].aeration_tant_1_frc_act,
              aeration_tant_1_tss_act:
                formData.chemistDetails[0].aeration_tant_1_tss_act,
              aeration_tant_1_do_act:
                formData.chemistDetails[0].aeration_tant_1_do_act,
              aeration_tant_1_cod_act:
                formData.chemistDetails[0].aeration_tant_1_cod_act,
              aeration_tant_1_bod_act:
                formData.chemistDetails[0].aeration_tant_1_bod_act,
              aeration_tant_1_mlss_act:
                formData.chemistDetails[0].aeration_tant_1_mlss_act,
              aeration_tant_1_mlvss_act:
                formData.chemistDetails[0].aeration_tant_1_mlvss_act,
              aeration_tant_1_sv_act:
                formData.chemistDetails[0].aeration_tant_1_sv_act,
              aeration_tant_6_ph_act:
                formData.chemistDetails[0].aeration_tant_6_ph_act,
              aeration_tant_6_hardness_act:
                formData.chemistDetails[0].aeration_tant_6_hardness_act,
              aeration_tant_6_tds_act:
                formData.chemistDetails[0].aeration_tant_6_tds_act,
              aeration_tant_6_turbidity_act:
                formData.chemistDetails[0].aeration_tant_6_turbidity_act,
              aeration_tant_6_frc_act:
                formData.chemistDetails[0].aeration_tant_6_frc_act,
              aeration_tant_6_tss_act:
                formData.chemistDetails[0].aeration_tant_6_tss_act,
              aeration_tant_6_do_act:
                formData.chemistDetails[0].aeration_tant_6_do_act,
              aeration_tant_6_cod_act:
                formData.chemistDetails[0].aeration_tant_6_cod_act,
              aeration_tant_6_bod_act:
                formData.chemistDetails[0].aeration_tant_6_bod_act,
              aeration_tant_6_mlss_act:
                formData.chemistDetails[0].aeration_tant_6_mlss_act,
              aeration_tant_6_mlvss_act:
                formData.chemistDetails[0].aeration_tant_6_mlvss_act,
              aeration_tant_6_sv_act:
                formData.chemistDetails[0].aeration_tant_6_sv_act,
              secondary_ol_ph_act:
                formData.chemistDetails[0].secondary_ol_ph_act,
              secondary_ol_hardness_act:
                formData.chemistDetails[0].secondary_ol_hardness_act,
              secondary_ol_tds_act:
                formData.chemistDetails[0].secondary_ol_tds_act,
              secondary_ol_turbidity_act:
                formData.chemistDetails[0].secondary_ol_turbidity_act,
              secondary_ol_frc_act:
                formData.chemistDetails[0].secondary_ol_frc_act,
              secondary_ol_tss_act:
                formData.chemistDetails[0].secondary_ol_tss_act,
              secondary_ol_do_act:
                formData.chemistDetails[0].secondary_ol_do_act,
              secondary_ol_cod_act:
                formData.chemistDetails[0].secondary_ol_cod_act,
              secondary_ol_bod_act:
                formData.chemistDetails[0].secondary_ol_bod_act,
              secondary_ol_mlss_act:
                formData.chemistDetails[0].secondary_ol_mlss_act,
              secondary_ol_mlvss_act:
                formData.chemistDetails[0].secondary_ol_mlvss_act,
              secondary_ol_sv_act:
                formData.chemistDetails[0].secondary_ol_sv_act,
              uf_feed_ph_act: formData.chemistDetails[0].uf_feed_ph_act,
              uf_feed_hardness_act:
                formData.chemistDetails[0].uf_feed_hardness_act,
              uf_feed_tds_act: formData.chemistDetails[0].uf_feed_tds_act,
              uf_feed_turbidity_act:
                formData.chemistDetails[0].uf_feed_turbidity_act,
              uf_feed_frc_act: formData.chemistDetails[0].uf_feed_frc_act,
              uf_feed_tss_act: formData.chemistDetails[0].uf_feed_tss_act,
              uf_feed_do_act: formData.chemistDetails[0].uf_feed_do_act,
              uf_feed_cod_act: formData.chemistDetails[0].uf_feed_cod_act,
              uf_feed_bod_act: formData.chemistDetails[0].uf_feed_bod_act,
              uf_feed_mlss_act: formData.chemistDetails[0].uf_feed_mlss_act,
              uf_feed_mlvss_act: formData.chemistDetails[0].uf_feed_mlvss_act,
              uf_feed_sv_act: formData.chemistDetails[0].uf_feed_sv_act,
              ro_01_feed_ph_act: formData.chemistDetails[0].ro_01_feed_ph_act,
              ro_01_feed_hardness_act:
                formData.chemistDetails[0].ro_01_feed_hardness_act,
              ro_01_feed_tds_act: formData.chemistDetails[0].ro_01_feed_tds_act,
              ro_01_feed_turbidity_act:
                formData.chemistDetails[0].ro_01_feed_turbidity_act,
              ro_01_feed_frc_act: formData.chemistDetails[0].ro_01_feed_frc_act,
              ro_01_feed_tss_act: formData.chemistDetails[0].ro_01_feed_tss_act,
              ro_01_feed_do_act: formData.chemistDetails[0].ro_01_feed_do_act,
              ro_01_feed_cod_act: formData.chemistDetails[0].ro_01_feed_cod_act,
              ro_01_feed_bod_act: formData.chemistDetails[0].ro_01_feed_bod_act,
              ro_01_feed_mlss_act:
                formData.chemistDetails[0].ro_01_feed_mlss_act,
              ro_01_feed_mlvss_act:
                formData.chemistDetails[0].ro_01_feed_mlvss_act,
              ro_01_feed_sv_act: formData.chemistDetails[0].ro_01_feed_sv_act,
              ro_01_permeate_ph_act:
                formData.chemistDetails[0].ro_01_permeate_ph_act,
              ro_01_permeate_hardness_act:
                formData.chemistDetails[0].ro_01_permeate_hardness_act,
              ro_01_permeate_tds_act:
                formData.chemistDetails[0].ro_01_permeate_tds_act,
              ro_01_permeate_turbidity_act:
                formData.chemistDetails[0].ro_01_permeate_turbidity_act,
              ro_01_permeate_frc_act:
                formData.chemistDetails[0].ro_01_permeate_frc_act,
              ro_01_permeate_tss_act:
                formData.chemistDetails[0].ro_01_permeate_tss_act,
              ro_01_permeate_do_act:
                formData.chemistDetails[0].ro_01_permeate_do_act,
              ro_01_permeate_cod_act:
                formData.chemistDetails[0].ro_01_permeate_cod_act,
              ro_01_permeate_bod_act:
                formData.chemistDetails[0].ro_01_permeate_bod_act,
              ro_01_permeate_mlss_act:
                formData.chemistDetails[0].ro_01_permeate_mlss_act,
              ro_01_permeate_mlvss_act:
                formData.chemistDetails[0].ro_01_permeate_mlvss_act,
              ro_01_permeate_sv_act:
                formData.chemistDetails[0].ro_01_permeate_sv_act,
              ro_02_feed_ph_act: formData.chemistDetails[0].ro_02_feed_ph_act,
              ro_02_feed_hardness_act:
                formData.chemistDetails[0].ro_02_feed_hardness_act,
              ro_02_feed_tds_act: formData.chemistDetails[0].ro_02_feed_tds_act,
              ro_02_feed_turbidity_act:
                formData.chemistDetails[0].ro_02_feed_turbidity_act,
              ro_02_feed_frc_act: formData.chemistDetails[0].ro_02_feed_frc_act,
              ro_02_feed_tss_act: formData.chemistDetails[0].ro_02_feed_tss_act,
              ro_02_feed_do_act: formData.chemistDetails[0].ro_02_feed_do_act,
              ro_02_feed_cod_act: formData.chemistDetails[0].ro_02_feed_cod_act,
              ro_02_feed_bod_act: formData.chemistDetails[0].ro_02_feed_bod_act,
              ro_02_feed_mlss_act:
                formData.chemistDetails[0].ro_02_feed_mlss_act,
              ro_02_feed_mlvss_act:
                formData.chemistDetails[0].ro_02_feed_mlvss_act,
              ro_02_feed_sv_act: formData.chemistDetails[0].ro_02_feed_sv_act,
              ro_02_permeate_ph_act:
                formData.chemistDetails[0].ro_02_permeate_ph_act,
              ro_02_permeate_hardness_act:
                formData.chemistDetails[0].ro_02_permeate_hardness_act,
              ro_02_permeate_tds_act:
                formData.chemistDetails[0].ro_02_permeate_tds_act,
              ro_02_permeate_turbidity_act:
                formData.chemistDetails[0].ro_02_permeate_turbidity_act,
              ro_02_permeate_frc_act:
                formData.chemistDetails[0].ro_02_permeate_frc_act,
              ro_02_permeate_tss_act:
                formData.chemistDetails[0].ro_02_permeate_tss_act,
              ro_02_permeate_do_act:
                formData.chemistDetails[0].ro_02_permeate_do_act,
              ro_02_permeate_cod_act:
                formData.chemistDetails[0].ro_02_permeate_cod_act,
              ro_02_permeate_bod_act:
                formData.chemistDetails[0].ro_02_permeate_bod_act,
              ro_02_permeate_mlss_act:
                formData.chemistDetails[0].ro_02_permeate_mlss_act,
              ro_02_permeate_mlvss_act:
                formData.chemistDetails[0].ro_02_permeate_mlvss_act,
              ro_02_permeate_sv_act:
                formData.chemistDetails[0].ro_02_permeate_sv_act,
              ro_03_feed_ph_act: formData.chemistDetails[0].ro_03_feed_ph_act,
              ro_03_feed_hardness_act:
                formData.chemistDetails[0].ro_03_feed_hardness_act,
              ro_03_feed_tds_act: formData.chemistDetails[0].ro_03_feed_tds_act,
              ro_03_feed_turbidity_act:
                formData.chemistDetails[0].ro_03_feed_turbidity_act,
              ro_03_feed_frc_act: formData.chemistDetails[0].ro_03_feed_frc_act,
              ro_03_feed_tss_act: formData.chemistDetails[0].ro_03_feed_tss_act,
              ro_03_feed_do_act: formData.chemistDetails[0].ro_03_feed_do_act,
              ro_03_feed_cod_act: formData.chemistDetails[0].ro_03_feed_cod_act,
              ro_03_feed_bod_act: formData.chemistDetails[0].ro_03_feed_bod_act,
              ro_03_feed_mlss_act:
                formData.chemistDetails[0].ro_03_feed_mlss_act,
              ro_03_feed_mlvss_act:
                formData.chemistDetails[0].ro_03_feed_mlvss_act,
              ro_03_feed_sv_act: formData.chemistDetails[0].ro_03_feed_sv_act,
              ro_03_permeate_ph_act:
                formData.chemistDetails[0].ro_03_permeate_ph_act,
              ro_03_permeate_hardness_act:
                formData.chemistDetails[0].ro_03_permeate_hardness_act,
              ro_03_permeate_tds_act:
                formData.chemistDetails[0].ro_03_permeate_tds_act,
              ro_03_permeate_turbidity_act:
                formData.chemistDetails[0].ro_03_permeate_turbidity_act,
              ro_03_permeate_frc_act:
                formData.chemistDetails[0].ro_03_permeate_frc_act,
              ro_03_permeate_tss_act:
                formData.chemistDetails[0].ro_03_permeate_tss_act,
              ro_03_permeate_do_act:
                formData.chemistDetails[0].ro_03_permeate_do_act,
              ro_03_permeate_cod_act:
                formData.chemistDetails[0].ro_03_permeate_cod_act,
              ro_03_permeate_bod_act:
                formData.chemistDetails[0].ro_03_permeate_bod_act,
              ro_03_permeate_mlss_act:
                formData.chemistDetails[0].ro_03_permeate_mlss_act,
              ro_03_permeate_mlvss_act:
                formData.chemistDetails[0].ro_03_permeate_mlvss_act,
              ro_03_permeate_sv_act:
                formData.chemistDetails[0].ro_03_permeate_sv_act,
              ro_04_feed_ph_act: formData.chemistDetails[0].ro_04_feed_ph_act,
              ro_04_feed_hardness_act:
                formData.chemistDetails[0].ro_04_feed_hardness_act,
              ro_04_feed_tds_act: formData.chemistDetails[0].ro_04_feed_tds_act,
              ro_04_feed_turbidity_act:
                formData.chemistDetails[0].ro_04_feed_turbidity_act,
              ro_04_feed_frc_act: formData.chemistDetails[0].ro_04_feed_frc_act,
              ro_04_feed_tss_act: formData.chemistDetails[0].ro_04_feed_tss_act,
              ro_04_feed_do_act: formData.chemistDetails[0].ro_04_feed_do_act,
              ro_04_feed_cod_act: formData.chemistDetails[0].ro_04_feed_cod_act,
              ro_04_feed_bod_act: formData.chemistDetails[0].ro_04_feed_bod_act,
              ro_04_feed_mlss_act:
                formData.chemistDetails[0].ro_04_feed_mlss_act,
              ro_04_feed_mlvss_act:
                formData.chemistDetails[0].ro_04_feed_mlvss_act,
              ro_04_feed_sv_act: formData.chemistDetails[0].ro_04_feed_sv_act,
              ro_04_permeate_ph_act:
                formData.chemistDetails[0].ro_04_permeate_ph_act,
              ro_04_permeate_hardness_act:
                formData.chemistDetails[0].ro_04_permeate_hardness_act,
              ro_04_permeate_tds_act:
                formData.chemistDetails[0].ro_04_permeate_tds_act,
              ro_04_permeate_turbidity_act:
                formData.chemistDetails[0].ro_04_permeate_turbidity_act,
              ro_04_permeate_frc_act:
                formData.chemistDetails[0].ro_04_permeate_frc_act,
              ro_04_permeate_tss_act:
                formData.chemistDetails[0].ro_04_permeate_tss_act,
              ro_04_permeate_do_act:
                formData.chemistDetails[0].ro_04_permeate_do_act,
              ro_04_permeate_cod_act:
                formData.chemistDetails[0].ro_04_permeate_cod_act,
              ro_04_permeate_bod_act:
                formData.chemistDetails[0].ro_04_permeate_bod_act,
              ro_04_permeate_mlss_act:
                formData.chemistDetails[0].ro_04_permeate_mlss_act,
              ro_04_permeate_mlvss_act:
                formData.chemistDetails[0].ro_04_permeate_mlvss_act,
              ro_04_permeate_sv_act:
                formData.chemistDetails[0].ro_04_permeate_sv_act,
              mee_feed_ph_act: formData.chemistDetails[0].mee_feed_ph_act,
              mee_feed_hardness_act:
                formData.chemistDetails[0].mee_feed_hardness_act,
              mee_feed_tds_act: formData.chemistDetails[0].mee_feed_tds_act,
              mee_feed_turbidity_act:
                formData.chemistDetails[0].mee_feed_turbidity_act,
              mee_feed_frc_act: formData.chemistDetails[0].mee_feed_frc_act,
              mee_feed_tss_act: formData.chemistDetails[0].mee_feed_tss_act,
              mee_feed_do_act: formData.chemistDetails[0].mee_feed_do_act,
              mee_feed_cod_act: formData.chemistDetails[0].mee_feed_cod_act,
              mee_feed_bod_act: formData.chemistDetails[0].mee_feed_bod_act,
              mee_feed_mlss_act: formData.chemistDetails[0].mee_feed_mlss_act,
              mee_feed_mlvss_act: formData.chemistDetails[0].mee_feed_mlvss_act,
              mee_feed_sv_act: formData.chemistDetails[0].mee_feed_sv_act,
              mee_condensate_ph_act:
                formData.chemistDetails[0].mee_condensate_ph_act,
              mee_condensate_hardness_act:
                formData.chemistDetails[0].mee_condensate_hardness_act,
              mee_condensate_tds_act:
                formData.chemistDetails[0].mee_condensate_tds_act,
              mee_condensate_turbidity_act:
                formData.chemistDetails[0].mee_condensate_turbidity_act,
              mee_condensate_frc_act:
                formData.chemistDetails[0].mee_condensate_frc_act,
              mee_condensate_tss_act:
                formData.chemistDetails[0].mee_condensate_tss_act,
              mee_condensate_do_act:
                formData.chemistDetails[0].mee_condensate_do_act,
              mee_condensate_cod_act:
                formData.chemistDetails[0].mee_condensate_cod_act,
              mee_condensate_bod_act:
                formData.chemistDetails[0].mee_condensate_bod_act,
              mee_condensate_mlss_act:
                formData.chemistDetails[0].mee_condensate_mlss_act,
              mee_condensate_mlvss_act:
                formData.chemistDetails[0].mee_condensate_mlvss_act,
              mee_condensate_sv_act:
                formData.chemistDetails[0].mee_condensate_sv_act,
              mee_concentrate_ph_act:
                formData.chemistDetails[0].mee_concentrate_ph_act,
              mee_concentrate_hardness_act:
                formData.chemistDetails[0].mee_concentrate_hardness_act,
              mee_concentrate_tds_act:
                formData.chemistDetails[0].mee_concentrate_tds_act,
              mee_concentrate_turbidity_act:
                formData.chemistDetails[0].mee_concentrate_turbidity_act,
              mee_concentrate_frc_act:
                formData.chemistDetails[0].mee_concentrate_frc_act,
              mee_concentrate_tss_act:
                formData.chemistDetails[0].mee_concentrate_tss_act,
              mee_concentrate_do_act:
                formData.chemistDetails[0].mee_concentrate_do_act,
              mee_concentrate_cod_act:
                formData.chemistDetails[0].mee_concentrate_cod_act,
              mee_concentrate_bod_act:
                formData.chemistDetails[0].mee_concentrate_bod_act,
              mee_concentrate_mlss_act:
                formData.chemistDetails[0].mee_concentrate_mlss_act,
              mee_concentrate_mlvss_act:
                formData.chemistDetails[0].mee_concentrate_mlvss_act,
              mee_concentrate_sv_act:
                formData.chemistDetails[0].mee_concentrate_sv_act,
              ro_tank_ph_act: formData.chemistDetails[0].ro_tank_ph_act,
              ro_tank_hardness_act:
                formData.chemistDetails[0].ro_tank_hardness_act,
              ro_tank_tds_act: formData.chemistDetails[0].ro_tank_tds_act,
              ro_tank_turbidity_act:
                formData.chemistDetails[0].ro_tank_turbidity_act,
              ro_tank_frc_act: formData.chemistDetails[0].ro_tank_frc_act,
              ro_tank_tss_act: formData.chemistDetails[0].ro_tank_tss_act,
              ro_tank_do_act: formData.chemistDetails[0].ro_tank_do_act,
              ro_tank_cod_act: formData.chemistDetails[0].ro_tank_cod_act,
              ro_tank_bod_act: formData.chemistDetails[0].ro_tank_bod_act,
              ro_tank_mlss_act: formData.chemistDetails[0].ro_tank_mlss_act,
              ro_tank_mlvss_act: formData.chemistDetails[0].ro_tank_mlvss_act,
              ro_tank_sv_act: formData.chemistDetails[0].ro_tank_sv_act,
              soft_water_ph_act: formData.chemistDetails[0].soft_water_ph_act,
              soft_water_hardness_act:
                formData.chemistDetails[0].soft_water_hardness_act,
              soft_water_tds_act: formData.chemistDetails[0].soft_water_tds_act,
              soft_water_turbidity_act:
                formData.chemistDetails[0].soft_water_turbidity_act,
              soft_water_frc_act: formData.chemistDetails[0].soft_water_frc_act,
              soft_water_tss_act: formData.chemistDetails[0].soft_water_tss_act,
              soft_water_do_act: formData.chemistDetails[0].soft_water_do_act,
              soft_water_cod_act: formData.chemistDetails[0].soft_water_cod_act,
              soft_water_bod_act: formData.chemistDetails[0].soft_water_bod_act,
              soft_water_mlss_act:
                formData.chemistDetails[0].soft_water_mlss_act,
              soft_water_mlvss_act:
                formData.chemistDetails[0].soft_water_mlvss_act,
              soft_water_sv_act: formData.chemistDetails[0].soft_water_sv_act,
              kiadb_ph_act: formData.chemistDetails[0].kiadb_ph_act,
              kiadb_hardness_act: formData.chemistDetails[0].kiadb_hardness_act,
              kiadb_tds_act: formData.chemistDetails[0].kiadb_tds_act,
              kiadb_turbidity_act:
                formData.chemistDetails[0].kiadb_turbidity_act,
              kiadb_frc_act: formData.chemistDetails[0].kiadb_frc_act,
              kiadb_tss_act: formData.chemistDetails[0].kiadb_tss_act,
              kiadb_do_act: formData.chemistDetails[0].kiadb_do_act,
              kiadb_cod_act: formData.chemistDetails[0].kiadb_cod_act,
              kiadb_bod_act: formData.chemistDetails[0].kiadb_bod_act,
              kiadb_mlss_act: formData.chemistDetails[0].kiadb_mlss_act,
              kiadb_mlvss_act: formData.chemistDetails[0].kiadb_mlvss_act,
              kiadb_sv_act: formData.chemistDetails[0].kiadb_sv_act,
              softner_ph_act: formData.chemistDetails[0].softner_ph_act,
              softner_hardness_act:
                formData.chemistDetails[0].softner_hardness_act,
              softner_tds_act: formData.chemistDetails[0].softner_tds_act,
              softner_turbidity_act:
                formData.chemistDetails[0].softner_turbidity_act,
              softner_frc_act: formData.chemistDetails[0].softner_frc_act,
              softner_tss_act: formData.chemistDetails[0].softner_tss_act,
              softner_do_act: formData.chemistDetails[0].softner_do_act,
              softner_cod_act: formData.chemistDetails[0].softner_cod_act,
              softner_bod_act: formData.chemistDetails[0].softner_bod_act,
              softner_mlss_act: formData.chemistDetails[0].softner_mlss_act,
              softner_mlvss_act: formData.chemistDetails[0].softner_mlvss_act,
              softner_sv_act: formData.chemistDetails[0].softner_sv_act,
              stp_treated_ph_act: formData.chemistDetails[0].stp_treated_ph_act,
              stp_treated_hardness_act:
                formData.chemistDetails[0].stp_treated_hardness_act,
              stp_treated_tds_act:
                formData.chemistDetails[0].stp_treated_tds_act,
              stp_treated_turbidity_act:
                formData.chemistDetails[0].stp_treated_turbidity_act,
              stp_treated_frc_act:
                formData.chemistDetails[0].stp_treated_frc_act,
              stp_treated_tss_act:
                formData.chemistDetails[0].stp_treated_tss_act,
              stp_treated_do_act: formData.chemistDetails[0].stp_treated_do_act,
              stp_treated_cod_act:
                formData.chemistDetails[0].stp_treated_cod_act,
              stp_treated_bod_act:
                formData.chemistDetails[0].stp_treated_bod_act,
              stp_treated_mlss_act:
                formData.chemistDetails[0].stp_treated_mlss_act,
              stp_treated_mlvss_act:
                formData.chemistDetails[0].stp_treated_mlvss_act,
              stp_treated_sv_act: formData.chemistDetails[0].stp_treated_sv_act,
              bag_filter_ph_act: formData.chemistDetails[0].bag_filter_ph_act,
              bag_filter_hardness_act:
                formData.chemistDetails[0].bag_filter_hardness_act,
              bag_filter_tds_act: formData.chemistDetails[0].bag_filter_tds_act,
              bag_filter_turbidity_act:
                formData.chemistDetails[0].bag_filter_turbidity_act,
              bag_filter_frc_act: formData.chemistDetails[0].bag_filter_frc_act,
              bag_filter_tss_act: formData.chemistDetails[0].bag_filter_tss_act,
              bag_filter_do_act: formData.chemistDetails[0].bag_filter_do_act,
              bag_filter_cod_act: formData.chemistDetails[0].bag_filter_cod_act,
              bag_filter_bod_act: formData.chemistDetails[0].bag_filter_bod_act,
              bag_filter_mlss_act:
                formData.chemistDetails[0].bag_filter_mlss_act,
              bag_filter_mlvss_act:
                formData.chemistDetails[0].bag_filter_mlvss_act,
              bag_filter_sv_act: formData.chemistDetails[0].bag_filter_sv_act,
              storage_tank_ph_act:
                formData.chemistDetails[0].storage_tank_ph_act,
              storage_tank_hardness_act:
                formData.chemistDetails[0].storage_tank_hardness_act,
              storage_tank_tds_act:
                formData.chemistDetails[0].storage_tank_tds_act,
              storage_tank_turbidity_act:
                formData.chemistDetails[0].storage_tank_turbidity_act,
              storage_tank_frc_act:
                formData.chemistDetails[0].storage_tank_frc_act,
              storage_tank_tss_act:
                formData.chemistDetails[0].storage_tank_tss_act,
              storage_tank_do_act:
                formData.chemistDetails[0].storage_tank_do_act,
              storage_tank_cod_act:
                formData.chemistDetails[0].storage_tank_cod_act,
              storage_tank_bod_act:
                formData.chemistDetails[0].storage_tank_bod_act,
              storage_tank_mlss_act:
                formData.chemistDetails[0].storage_tank_mlss_act,
              storage_tank_mlvss_act:
                formData.chemistDetails[0].storage_tank_mlvss_act,
              storage_tank_sv_act:
                formData.chemistDetails[0].storage_tank_sv_act,
              remarks:
                role == "ROLE_CHEMIST" &&
                formData.chemistDetails[0].remarks !== ""
                  ? formData.chemistDetails[0].remarks
                  : "NA",
            },
          ],
        };
      }

      if (role == "ROLE_MICROBIOLOGIST") {
        if (formData.microDetails[0].equalization_sampled == "") {
          message.warning("Please Select Sampled on Date");
          return;
        }
        if (formData.microDetails[0].equalization_test_completion == "") {
          message.warning("Please Select Test Completion Date");
          return;
        }

        // if (!handleEmptyFieldForMicro()) {
        //   return;
        // }

        payload = {
          water_id: formData.water_id,
          formatNo: "PH-QCL01-AR-F-007",
          revisionNo: "02",
          formatName: "WATER ANALYSIS REPORT",
          refSopNo: "PH-QCL01-D-05",
          ar_no: formData.ar_no,
          date: date,
          microDetails: [
            {
              micro_id: formData.microDetails[0].micro_id,
              equalization_sampled:
                formData.microDetails[0].equalization_sampled,
              equalization_incubation: date,
              equalization_test_completion:
                formData.microDetails[0].equalization_test_completion,
              ro_tank_total_vaible:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_total_vaible !== ""
                  ? formData.microDetails[0].ro_tank_total_vaible
                  : "NA",
              ro_tank_total_fungal:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_total_fungal !== ""
                  ? formData.microDetails[0].ro_tank_total_fungal
                  : "NA",
              ro_tank_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_gram !== ""
                  ? formData.microDetails[0].ro_tank_gram
                  : "NA",
              ro_tank_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_escherechia !== ""
                  ? formData.microDetails[0].ro_tank_escherechia
                  : "NA",
              ro_tank_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_staphylococcos !== ""
                  ? formData.microDetails[0].ro_tank_staphylococcos
                  : "NA",
              ro_tank_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_pseudomonas !== ""
                  ? formData.microDetails[0].ro_tank_pseudomonas
                  : "NA",
              ro_tank_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ro_tank_salmonella !== ""
                  ? formData.microDetails[0].ro_tank_salmonella
                  : "NA",
              soft_water_total_vaible:
                formData.microDetails[0].soft_water_total_vaible,
              soft_water_total_fungal:
                formData.microDetails[0].soft_water_total_fungal,
              soft_water_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_gram !== ""
                  ? formData.microDetails[0].soft_water_gram
                  : "NA",
              soft_water_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_escherechia !== ""
                  ? formData.microDetails[0].soft_water_escherechia
                  : "NA",
              soft_water_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_staphylococcos !== ""
                  ? formData.microDetails[0].soft_water_staphylococcos
                  : "NA",
              soft_water_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_pseudomonas !== ""
                  ? formData.microDetails[0].soft_water_pseudomonas
                  : "NA",
              soft_water_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].soft_water_salmonella !== ""
                  ? formData.microDetails[0].soft_water_salmonella
                  : "NA",
              bag_filter_total_vaible:
                formData.microDetails[0].bag_filter_total_vaible,
              bag_filter_total_fungal:
                formData.microDetails[0].bag_filter_total_fungal,
              bag_filter_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_gram !== ""
                  ? formData.microDetails[0].bag_filter_gram
                  : "NA",
              bag_filter_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_escherechia !== ""
                  ? formData.microDetails[0].bag_filter_escherechia
                  : "NA",
              bag_filter_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_staphylococcos !== ""
                  ? formData.microDetails[0].bag_filter_staphylococcos
                  : "NA",
              bag_filter_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_pseudomonas !== ""
                  ? formData.microDetails[0].bag_filter_pseudomonas
                  : "NA",
              bag_filter_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].bag_filter_salmonella !== ""
                  ? formData.microDetails[0].bag_filter_salmonella
                  : "NA",
              storage_tank_total_vaible:
                formData.microDetails[0].storage_tank_total_vaible,
              storage_tank_total_fungal:
                formData.microDetails[0].storage_tank_total_fungal,
              storage_tank_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_gram !== ""
                  ? formData.microDetails[0].storage_tank_gram
                  : "NA",
              storage_tank_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_escherechia !== ""
                  ? formData.microDetails[0].storage_tank_escherechia
                  : "NA",
              storage_tank_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_staphylococcos !== ""
                  ? formData.microDetails[0].storage_tank_staphylococcos
                  : "NA",
              storage_tank_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_pseudomonas !== ""
                  ? formData.microDetails[0].storage_tank_pseudomonas
                  : "NA",
              storage_tank_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].storage_tank_salmonella !== ""
                  ? formData.microDetails[0].storage_tank_salmonella
                  : "NA",
              water_bleaching_total_vaible:
                formData.microDetails[0].water_bleaching_total_vaible,
              water_bleaching_total_fungal:
                formData.microDetails[0].water_bleaching_total_fungal,
              water_bleaching_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_gram !== ""
                  ? formData.microDetails[0].water_bleaching_gram
                  : "NA",
              water_bleaching_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_escherechia !== ""
                  ? formData.microDetails[0].water_bleaching_escherechia
                  : "NA",
              water_bleaching_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_staphylococcos !== ""
                  ? formData.microDetails[0].water_bleaching_staphylococcos
                  : "NA",
              water_bleaching_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_pseudomonas !== ""
                  ? formData.microDetails[0].water_bleaching_pseudomonas
                  : "NA",
              water_bleaching_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].water_bleaching_salmonella !== ""
                  ? formData.microDetails[0].water_bleaching_salmonella
                  : "NA",
              ppd_ahu_inlet_total_vaible:
                formData.microDetails[0].ppd_ahu_inlet_total_vaible,
              ppd_ahu_inlet_total_fungal:
                formData.microDetails[0].ppd_ahu_inlet_total_fungal,
              ppd_ahu_inlet_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_gram !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_gram
                  : "NA",
              ppd_ahu_inlet_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_escherechia !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_escherechia
                  : "NA",
              ppd_ahu_inlet_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_staphylococcos !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_staphylococcos
                  : "NA",
              ppd_ahu_inlet_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_pseudomonas !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_pseudomonas
                  : "NA",
              ppd_ahu_inlet_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_inlet_salmonella !== ""
                  ? formData.microDetails[0].ppd_ahu_inlet_salmonella
                  : "NA",
              ppd_ahu_fog_total_vaible:
                formData.microDetails[0].ppd_ahu_fog_total_vaible,
              ppd_ahu_fog_total_fungal:
                formData.microDetails[0].ppd_ahu_fog_total_fungal,
              ppd_ahu_fog_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_gram !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_gram
                  : "NA",
              ppd_ahu_fog_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_escherechia !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_escherechia
                  : "NA",
              ppd_ahu_fog_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_staphylococcos !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_staphylococcos
                  : "NA",
              ppd_ahu_fog_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_pseudomonas !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_pseudomonas
                  : "NA",
              ppd_ahu_fog_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].ppd_ahu_fog_salmonella !== ""
                  ? formData.microDetails[0].ppd_ahu_fog_salmonella
                  : "NA",
              uv_inlet_total_vaible:
                formData.microDetails[0].uv_inlet_total_vaible,
              uv_inlet_total_fungal:
                formData.microDetails[0].uv_inlet_total_fungal,
              uv_inlet_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_gram !== ""
                  ? formData.microDetails[0].uv_inlet_gram
                  : "NA",
              uv_inlet_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_escherechia !== ""
                  ? formData.microDetails[0].uv_inlet_escherechia
                  : "NA",
              uv_inlet_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_staphylococcos !== ""
                  ? formData.microDetails[0].uv_inlet_staphylococcos
                  : "NA",
              uv_inlet_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_pseudomonas !== ""
                  ? formData.microDetails[0].uv_inlet_pseudomonas
                  : "NA",
              uv_inlet_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_inlet_salmonella !== ""
                  ? formData.microDetails[0].uv_inlet_salmonella
                  : "NA",
              uv_outlet_total_vaible:
                formData.microDetails[0].uv_outlet_total_vaible,
              uv_outlet_total_fungal:
                formData.microDetails[0].uv_outlet_total_fungal,
              uv_outlet_gram:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_gram !== ""
                  ? formData.microDetails[0].uv_outlet_gram
                  : "NA",
              uv_outlet_escherechia:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_escherechia !== ""
                  ? formData.microDetails[0].uv_outlet_escherechia
                  : "NA",
              uv_outlet_staphylococcos:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_staphylococcos !== ""
                  ? formData.microDetails[0].uv_outlet_staphylococcos
                  : "NA",
              uv_outlet_pseudomonas:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_pseudomonas !== ""
                  ? formData.microDetails[0].uv_outlet_pseudomonas
                  : "NA",
              uv_outlet_salmonella:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].uv_outlet_salmonella !== ""
                  ? formData.microDetails[0].uv_outlet_salmonella
                  : "NA",
              remarks:
                role == "ROLE_MICROBIOLOGIST" &&
                formData.microDetails[0].remarks !== ""
                  ? formData.microDetails[0].remarks
                  : "NA",
            },
          ],
        };
      }
      succesMsg = "Submitted Successfully ";
      apiurl = `${  API.prodUrl}/Precot/api/QcForm/SubmitWaterAnalysisReportF007`;
    } else if (
      role == "QA_EXECUTIVE" ||
      role == "QA_MANAGER" ||
      role == "QC_MANAGER"
    ) {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${  API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF007`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.water_id,
        status: "Reject",
        formatNo: "PH-QCL01-AR-F-007",
        remarks: formData.reason,
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod =
        role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
          ? axios.post
          : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/AR-F-007/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleEmptyFieldForChemist = () => {
    const pHTabKeys = [
      "equalization_ph_act",
      "primary_il_ph_act",
      "primary_ol_ph_act",
      "aeration_tant_1_ph_act",
      "aeration_tant_6_ph_act",
      "secondary_ol_ph_act",
      "uf_feed_ph_act",
      "ro_01_feed_ph_act",
      "ro_01_permeate_ph_act",
      "ro_02_feed_ph_act",
      "ro_02_permeate_ph_act",
      "ro_03_feed_ph_act",
      "ro_03_permeate_ph_act",
      "ro_04_feed_ph_act",
      "ro_04_permeate_ph_act",
      "mee_feed_ph_act",
      "mee_condensate_ph_act",
      "mee_concentrate_ph_act",
      "ro_tank_ph_act",
      "soft_water_ph_act",
      "kiadb_ph_act",
      "softner_ph_act",
      "stp_treated_ph_act",
      "bag_filter_ph_act",
      "storage_tank_ph_act",
    ];

    for (let i = 0; i < pHTabKeys.length; i++) {
      if (formData.chemistDetails[0][pHTabKeys[i]] == "") {
        message.warning(`Please fill the ${getRowName(i + 1)} pH act field`);
        return false;
      }
    }

    const hardnessTabkeys = [
      "equalization_hardness_act",
      "primary_il_hardness_act",
      "primary_ol_hardness_act",
      "aeration_tant_1_hardness_act",
      "aeration_tant_6_hardness_act",
      "secondary_ol_hardness_act",
      "uf_feed_hardness_act",
      "ro_01_feed_hardness_act",
      "ro_01_permeate_hardness_act",
      "ro_02_feed_hardness_act",
      "ro_02_permeate_hardness_act",
      "ro_03_feed_hardness_act",
      "ro_03_permeate_hardness_act",
      "ro_04_feed_hardness_act",
      "ro_04_permeate_hardness_act",
      "mee_feed_hardness_act",
      "mee_condensate_hardness_act",
      "mee_concentrate_hardness_act",
      "ro_tank_hardness_act",
      "soft_water_hardness_act",
      "kiadb_hardness_act",
      "softner_hardness_act",
      "stp_treated_hardness_act",
      "bag_filter_hardness_act",
      "storage_tank_hardness_act",
    ];

    for (let i = 0; i < hardnessTabkeys.length; i++) {
      if (formData.chemistDetails[0][hardnessTabkeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} Hardness (ppm) act field`
        );
        return false;
      }
    }

    const tDSTabKeys = [
      "equalization_tds_act",
      "primary_il_tds_act",
      "primary_ol_tds_act",
      "aeration_tant_1_tds_act",
      "aeration_tant_6_tds_act",
      "secondary_ol_tds_act",
      "uf_feed_tds_act",
      "ro_01_feed_tds_act",
      "ro_01_permeate_tds_act",
      "ro_02_feed_tds_act",
      "ro_02_permeate_tds_act",
      "ro_03_feed_tds_act",
      "ro_03_permeate_tds_act",
      "ro_04_feed_tds_act",
      "ro_04_permeate_tds_act",
      "mee_feed_tds_act",
      "mee_condensate_tds_act",
      "mee_concentrate_tds_act",
      "ro_tank_tds_act",
      "soft_water_tds_act",
      "kiadb_tds_act",
      "softner_tds_act",
      "stp_treated_tds_act",
      "bag_filter_tds_act",
      "storage_tank_tds_act",
    ];

    for (let i = 0; i < tDSTabKeys.length; i++) {
      if (formData.chemistDetails[0][tDSTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} TDS (ppm) act field`
        );
        return false;
      }
    }
    const turbudityTabKeys = [
      "equalization_turbidity_act",
      "primary_il_turbidity_act",
      "primary_ol_turbidity_act",
      "aeration_tant_1_turbidity_act",
      "aeration_tant_6_turbidity_act",
      "secondary_ol_turbidity_act",
      "uf_feed_turbidity_act",
      "ro_01_feed_turbidity_act",
      "ro_01_permeate_turbidity_act",
      "ro_02_feed_turbidity_act",
      "ro_02_permeate_turbidity_act",
      "ro_03_feed_turbidity_act",
      "ro_03_permeate_turbidity_act",
      "ro_04_feed_turbidity_act",
      "ro_04_permeate_turbidity_act",
      "mee_feed_turbidity_act",
      "mee_condensate_turbidity_act",
      "mee_concentrate_turbidity_act",
      "ro_tank_turbidity_act",
      "soft_water_turbidity_act",
      "kiadb_turbidity_act",
      "softner_turbidity_act",
      "stp_treated_turbidity_act",
      "bag_filter_turbidity_act",
      "storage_tank_turbidity_act",
    ];

    for (let i = 0; i < turbudityTabKeys.length; i++) {
      if (formData.chemistDetails[0][turbudityTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} Turbidity (NTU) act field`
        );
        return false;
      }
    }

    const fRCTabKeys = [
      "equalization_frc_act",
      "primary_il_frc_act",
      "primary_ol_frc_act",
      "aeration_tant_1_frc_act",
      "aeration_tant_6_frc_act",
      "secondary_ol_frc_act",
      "uf_feed_frc_act",
      "ro_01_feed_frc_act",
      "ro_01_permeate_frc_act",
      "ro_02_feed_frc_act",
      "ro_02_permeate_frc_act",
      "ro_03_feed_frc_act",
      "ro_03_permeate_frc_act",
      "ro_04_feed_frc_act",
      "ro_04_permeate_frc_act",
      "mee_feed_frc_act",
      "mee_condensate_frc_act",
      "mee_concentrate_frc_act",
      "ro_tank_frc_act",
      "soft_water_frc_act",
      "kiadb_frc_act",
      "softner_frc_act",
      "stp_treated_frc_act",
      "bag_filter_frc_act",
      "storage_tank_frc_act",
    ];

    for (let i = 0; i < fRCTabKeys.length; i++) {
      if (formData.chemistDetails[0][fRCTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} FRC (ppm) act field`
        );
        return false;
      }
    }

    const tSSTabKeys = [
      "equalization_tss_act",
      "primary_il_tss_act",
      "primary_ol_tss_act",
      "aeration_tant_1_tss_act",
      "aeration_tant_6_tss_act",
      "secondary_ol_tss_act",
      "uf_feed_tss_act",
      "ro_01_feed_tss_act",
      "ro_01_permeate_tss_act",
      "ro_02_feed_tss_act",
      "ro_02_permeate_tss_act",
      "ro_03_feed_tss_act",
      "ro_03_permeate_tss_act",
      "ro_04_feed_tss_act",
      "ro_04_permeate_tss_act",
      "mee_feed_tss_act",
      "mee_condensate_tss_act",
      "mee_concentrate_tss_act",
      "ro_tank_tss_act",
      "soft_water_tss_act",
      "kiadb_tss_act",
      "softner_tss_act",
      "stp_treated_tss_act",
      "bag_filter_tss_act",
      "storage_tank_tss_act",
    ];

    for (let i = 0; i < tSSTabKeys.length; i++) {
      if (formData.chemistDetails[0][tSSTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} TSS (ppm) act field`
        );
        return false;
      }
    }

    const dOTabKeys = [
      "equalization_do_act",
      "primary_il_do_act",
      "primary_ol_do_act",
      "aeration_tant_1_do_act",
      "aeration_tant_6_do_act",
      "secondary_ol_do_act",
      "uf_feed_do_act",
      "ro_01_feed_do_act",
      "ro_01_permeate_do_act",
      "ro_02_feed_do_act",
      "ro_02_permeate_do_act",
      "ro_03_feed_do_act",
      "ro_03_permeate_do_act",
      "ro_04_feed_do_act",
      "ro_04_permeate_do_act",
      "mee_feed_do_act",
      "mee_condensate_do_act",
      "mee_concentrate_do_act",
      "ro_tank_do_act",
      "soft_water_do_act",
      "kiadb_do_act",
      "softner_do_act",
      "stp_treated_do_act",
      "bag_filter_do_act",
      "storage_tank_do_act",
    ];

    for (let i = 0; i < dOTabKeys.length; i++) {
      if (formData.chemistDetails[0][dOTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} DO (ppm) act field`
        );
        return false;
      }
    }

    const cODTabKeys = [
      "equalization_cod_act",
      "primary_il_cod_act",
      "primary_ol_cod_act",
      "aeration_tant_1_cod_act",
      "aeration_tant_6_cod_act",
      "secondary_ol_cod_act",
      "uf_feed_cod_act",
      "ro_01_feed_cod_act",
      "ro_01_permeate_cod_act",
      "ro_02_feed_cod_act",
      "ro_02_permeate_cod_act",
      "ro_03_feed_cod_act",
      "ro_03_permeate_cod_act",
      "ro_04_feed_cod_act",
      "ro_04_permeate_cod_act",
      "mee_feed_cod_act",
      "mee_condensate_cod_act",
      "mee_concentrate_cod_act",
      "ro_tank_cod_act",
      "soft_water_cod_act",
      "kiadb_cod_act",
      "softner_cod_act",
      "stp_treated_cod_act",
      "bag_filter_cod_act",
      "storage_tank_cod_act",
    ];

    for (let i = 0; i < cODTabKeys.length; i++) {
      if (formData.chemistDetails[0][cODTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} COD (ppm) act field`
        );
        return false;
      }
    }

    const bODTabKeys = [
      "equalization_bod_act",
      "primary_il_bod_act",
      "primary_ol_bod_act",
      "aeration_tant_1_bod_act",
      "aeration_tant_6_bod_act",
      "secondary_ol_bod_act",
      "uf_feed_bod_act",
      "ro_01_feed_bod_act",
      "ro_01_permeate_bod_act",
      "ro_02_feed_bod_act",
      "ro_02_permeate_bod_act",
      "ro_03_feed_bod_act",
      "ro_03_permeate_bod_act",
      "ro_04_feed_bod_act",
      "ro_04_permeate_bod_act",
      "mee_feed_bod_act",
      "mee_condensate_bod_act",
      "mee_concentrate_bod_act",
      "ro_tank_bod_act",
      "soft_water_bod_act",
      "kiadb_bod_act",
      "softner_bod_act",
      "stp_treated_bod_act",
      "bag_filter_bod_act",
      "storage_tank_bod_act",
    ];

    for (let i = 0; i < bODTabKeys.length; i++) {
      if (formData.chemistDetails[0][bODTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} BOD (ppm) act field`
        );
        return false;
      }
    }

    const mLSSTabKeys = [
      "equalization_mlss_act",
      "primary_il_mlss_act",
      "primary_ol_mlss_act",
      "aeration_tant_1_mlss_act",
      "aeration_tant_6_mlss_act",
      "secondary_ol_mlss_act",
      "uf_feed_mlss_act",
      "ro_01_feed_mlss_act",
      "ro_01_permeate_mlss_act",
      "ro_02_feed_mlss_act",
      "ro_02_permeate_mlss_act",
      "ro_03_feed_mlss_act",
      "ro_03_permeate_mlss_act",
      "ro_04_feed_mlss_act",
      "ro_04_permeate_mlss_act",
      "mee_feed_mlss_act",
      "mee_condensate_mlss_act",
      "mee_concentrate_mlss_act",
      "ro_tank_mlss_act",
      "soft_water_mlss_act",
      "kiadb_mlss_act",
      "softner_mlss_act",
      "stp_treated_mlss_act",
      "bag_filter_mlss_act",
      "storage_tank_mlss_act",
    ];

    for (let i = 0; i < mLSSTabKeys.length; i++) {
      if (formData.chemistDetails[0][mLSSTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} MLSS (ppm) act field`
        );
        return false;
      }
    }

    const mLVSSTabKeys = [
      "equalization_mlvss_act",
      "primary_il_mlvss_act",
      "primary_ol_mlvss_act",
      "aeration_tant_1_mlvss_act",
      "aeration_tant_6_mlvss_act",
      "secondary_ol_mlvss_act",
      "uf_feed_mlvss_act",
      "ro_01_feed_mlvss_act",
      "ro_01_permeate_mlvss_act",
      "ro_02_feed_mlvss_act",
      "ro_02_permeate_mlvss_act",
      "ro_03_feed_mlvss_act",
      "ro_03_permeate_mlvss_act",
      "ro_04_feed_mlvss_act",
      "ro_04_permeate_mlvss_act",
      "mee_feed_mlvss_act",
      "mee_condensate_mlvss_act",
      "mee_concentrate_mlvss_act",
      "ro_tank_mlvss_act",
      "soft_water_mlvss_act",
      "kiadb_mlvss_act",
      "softner_mlvss_act",
      "stp_treated_mlvss_act",
      "bag_filter_mlvss_act",
      "storage_tank_mlvss_act",
    ];

    for (let i = 0; i < mLVSSTabKeys.length; i++) {
      if (formData.chemistDetails[0][mLVSSTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} MLVSS (ppm) act field`
        );
        return false;
      }
    }

    const sV30TabKeys = [
      "equalization_sv_act",
      "primary_il_sv_act",
      "primary_ol_sv_act",
      "aeration_tant_1_sv_act",
      "aeration_tant_6_sv_act",
      "secondary_ol_sv_act",
      "uf_feed_sv_act",
      "ro_01_feed_sv_act",
      "ro_01_permeate_sv_act",
      "ro_02_feed_sv_act",
      "ro_02_permeate_sv_act",
      "ro_03_feed_sv_act",
      "ro_03_permeate_sv_act",
      "ro_04_feed_sv_act",
      "ro_04_permeate_sv_act",
      "mee_feed_sv_act",
      "mee_condensate_sv_act",
      "mee_concentrate_sv_act",
      "ro_tank_sv_act",
      "soft_water_sv_act",
      "kiadb_sv_act",
      "softner_sv_act",
      "stp_treated_sv_act",
      "bag_filter_sv_act",
      "storage_tank_sv_act",
    ];

    for (let i = 0; i < sV30TabKeys.length; i++) {
      if (formData.chemistDetails[0][sV30TabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowName(i + 1)} SV 30 (mg/l) act field`
        );
        return false;
      }
    }

    return true;
  };

  const handleEmptyFieldForMicro = () => {
    const totalViableTabKeys = [
      "ro_tank_total_vaible",
      "soft_water_total_vaible",
      "bag_filter_total_vaible",
      "storage_tank_total_vaible",
      "water_bleaching_total_vaible",
      "ppd_ahu_inlet_total_vaible",
      "ppd_ahu_fog_total_vaible",
      "uv_inlet_total_vaible",
      "uv_outlet_total_vaible",
    ];

    for (let i = 0; i < totalViableTabKeys.length; i++) {
      if (formData.microDetails[0][totalViableTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowNameForMicro(
            i + 1
          )} Total Viable Count field`
        );
        return false;
      }
    }
    const totalFungalTabKeys = [
      "ro_tank_total_fungal",
      "soft_water_total_fungal",
      "bag_filter_total_fungal",
      "storage_tank_total_fungal",
      "water_bleaching_total_fungal",
      "ppd_ahu_inlet_total_fungal",
      "ppd_ahu_fog_total_fungal",
      "uv_inlet_total_fungal",
      "uv_outlet_total_fungal",
    ];
    for (let i = 0; i < totalFungalTabKeys.length; i++) {
      if (formData.microDetails[0][totalFungalTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowNameForMicro(
            i + 1
          )} Total Fungal Count field`
        );
        return false;
      }
    }
    const gramNegativeTabkeys = [
      "ro_tank_gram",
      "soft_water_gram",
      "bag_filter_gram",
      "storage_tank_gram",
      "water_bleaching_gram",
      "ppd_ahu_inlet_gram",
      "ppd_ahu_fog_gram",
      "uv_inlet_gram",
      "uv_outlet_gram",
    ];
    for (let i = 0; i < gramNegativeTabkeys.length; i++) {
      if (formData.microDetails[0][gramNegativeTabkeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowNameForMicro(
            i + 1
          )} Gram Negative Data field`
        );
        return false;
      }
    }
    const EcoliDataTabkeys = [
      "ro_tank_escherechia",
      "soft_water_escherechia",
      "bag_filter_escherechia",
      "storage_tank_escherechia",
      "water_bleaching_escherechia",
      "ppd_ahu_inlet_escherechia",
      "ppd_ahu_fog_escherechia",
      "uv_inlet_escherechia",
      "uv_outlet_escherechia",
    ];
    for (let i = 0; i < EcoliDataTabkeys.length; i++) {
      if (formData.microDetails[0][EcoliDataTabkeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowNameForMicro(i + 1)} E.coli field`
        );
        return false;
      }
    }
    const staphyDataTabKeys = [
      "ro_tank_staphylococcos",
      "soft_water_staphylococcos",
      "bag_filter_staphylococcos",
      "storage_tank_staphylococcos",
      "water_bleaching_staphylococcos",
      "ppd_ahu_inlet_staphylococcos",
      "ppd_ahu_fog_staphylococcos",
      "uv_inlet_staphylococcos",
      "uv_outlet_staphylococcos",
    ];
    for (let i = 0; i < staphyDataTabKeys.length; i++) {
      if (formData.microDetails[0][staphyDataTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowNameForMicro(i + 1)} S.aur field`
        );
        return false;
      }
    }
    const pseudoDataTabKeys = [
      "ro_tank_pseudomonas",
      "soft_water_pseudomonas",
      "bag_filter_pseudomonas",
      "storage_tank_pseudomonas",
      "water_bleaching_pseudomonas",
      "ppd_ahu_inlet_pseudomonas",
      "ppd_ahu_fog_pseudomonas",
      "uv_inlet_pseudomonas",
      "uv_outlet_pseudomonas",
    ];

    for (let i = 0; i < pseudoDataTabKeys.length; i++) {
      if (formData.microDetails[0][pseudoDataTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowNameForMicro(i + 1)} P.aer field`
        );
        return false;
      }
    }
    const salmonellaDataTabKeys = [
      "ro_tank_salmonella",
      "soft_water_salmonella",
      "bag_filter_salmonella",
      "storage_tank_salmonella",
      "water_bleaching_salmonella",
      "ppd_ahu_inlet_salmonella",
      "ppd_ahu_fog_salmonella",
      "uv_inlet_salmonella",
      "uv_outlet_salmonella",
    ];

    for (let i = 0; i < salmonellaDataTabKeys.length; i++) {
      if (formData.microDetails[0][salmonellaDataTabKeys[i]] == "") {
        message.warning(
          `Please fill the ${getRowNameForMicro(i + 1)} Salmonella field`
        );
        return false;
      }
    }
    return true;
  };
  const getRowName = (num) => {
    switch (num) {
      case 1:
        return "Equalization Tank";
      case 2:
        return "Primary clarifier I/L";
      case 3:
        return "Primary clarifier O/L";
      case 4:
        return "Aeration Tank 1";
      case 5:
        return "Aeration Tank 6";
      case 6:
        return "Secondary Clarifier O/L";
      case 7:
        return "UF Feed";
      case 8:
        return "RO-01 Feed";
      case 9:
        return "RO-01 Permeate";
      case 10:
        return "RO-02 Feed";
      case 11:
        return "RO-02 Permeate";
      case 12:
        return "RO-03 Feed";
      case 13:
        return "RO-03 Permeate";
      case 14:
        return "RO-04 Feed";
      case 15:
        return "RO-04 Permeate";
      case 16:
        return "MEE Feed";
      case 17:
        return "MEE Condensate";
      case 18:
        return "MEE Concentrate";
      case 19:
        return "RO Tank";
      case 20:
        return "Soft water Tank";
      case 21:
        return "KIADB Feed";
      case 22:
        return "Softner O/L";
      case 23:
        return "STP Treated Water";
      case 24:
        return "Bag Filter O/L";
      case 25:
        return "Storage Tank";
    }
  };

  const getRowNameForMicro = (num) => {
    switch (num) {
      case 1:
        return "RO Tank";
      case 2:
        return "Soft water Tank";
      case 3:
        return "Bag Filter O/L";
      case 4:
        return "Storage Tank";
      case 5:
        return "Water for Bleaching";
      case 6:
        return "PPD- AHU Inlet water to foggers";
      case 7:
        return "PPD-AHU Fog chamber outlet water";
      case 8:
        return "UV inlet water";
      case 9:
        return "UV outlet water";
    }
  };
  const handleInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      chemistDetails: prevState.chemistDetails.map((item, i) =>
        i == 0 ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleMicroInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      microDetails: prevState.microDetails.map((item, i) =>
        i == 0 ? { ...item, [name]: value } : item
      ),
    }));
  };
  const handleObjectInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleE = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const handleClearForChemist = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      chemistDetails: [
        {
          ...prevState.chemistDetails[0],
          [name]: "",
        },
      ],
    }));
  };

  const handleClearForMicro = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      microDetails: [
        {
          ...prevState.microDetails[0],
          [name]: "",
        },
      ],
    }));
  };
  const validateFieldForChemist = (value, key, min, max, errorMessage) => {
    if (
      (Number(value) < min || (max !== null && Number(value) > max)) &&
      value !== ""
    ) {
      message.warning(errorMessage);
    }
  };

  const validateFieldForMicro = (value, key, min, max, errorMessage) => {
    if (
      (Number(value) < min || (max !== null && Number(value) > max)) &&
      value !== ""
    ) {
      message.warning(errorMessage);
    }
  };

  const handleBlur = () => {
    if (status.fieldStatus) {
      return;
    }
    // ----------------------------------- For pH Tab ------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].equalization_ph_act,
      "equalization_ph_act",
      6,
      10,
      "Equalization Tank pH act Should be within the range of 6 to 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].primary_il_ph_act,
      "primary_il_ph_act",
      6,
      8,
      "Primary clarifier I/L pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].primary_ol_ph_act,
      "primary_ol_ph_act",
      6,
      8,
      "Primary clarifier O/L pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_1_ph_act,
      "aeration_tant_1_ph_act",
      6,
      8,
      "Aeration Tank 1 pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_6_ph_act,
      "aeration_tant_6_ph_act",
      6,
      8,
      "Aeration Tank 6 pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].secondary_ol_ph_act,
      "secondary_ol_ph_act",
      7,
      9,
      "Secondary Clarifier O/L pH act Should be within the range of 7 to 9"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_01_feed_ph_act,
      "ro_01_feed_ph_act",
      6,
      8,
      "RO-01 Feed pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_02_feed_ph_act,
      "ro_02_feed_ph_act",
      6,
      8,
      "RO-02 Feed pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_03_feed_ph_act,
      "ro_03_feed_ph_act",
      6,
      8,
      "RO-03 Feed pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_04_feed_ph_act,
      "ro_04_feed_ph_act",
      6,
      8,
      "RO-04 Feed pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_feed_ph_act,
      "mee_feed_ph_act",
      6,
      8,
      "MEE Feed pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].kiadb_ph_act,
      "kiadb_ph_act",
      6,
      8,
      "KIADB Feed pH act Should be within the range of 6 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_01_permeate_ph_act,
      "ro_01_permeate_ph_act",
      6,
      7,
      "RO-01 Permeate pH act Should be within the range of 6 to 7"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_02_permeate_ph_act,
      "ro_02_permeate_ph_act",
      6,
      7,
      "RO-02 Permeate pH act Should be within the range of 6 to 7"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_03_permeate_ph_act,
      "ro_03_permeate_ph_act",
      6,
      7,
      "RO-03 Permeate pH act Should be within the range of 6 to 7"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_04_permeate_ph_act,
      "ro_04_permeate_ph_act",
      6,
      7,
      "RO-04 Permeate pH act Should be within the range of 6 to 7"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].softner_ph_act,
      "softner_ph_act",
      6.5,
      8,
      "Softner O/L pH act Should be within the range of 6.5 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].uf_feed_ph_act,
      "uf_feed_ph_act",
      6.5,
      8,
      "UF Feed pH act Should be within the range of 6.5 to 8"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_condensate_ph_act,
      "mee_condensate_ph_act",
      6.5,
      7.5,
      "MEE Condensate pH act Should be within the range of 6.5 to 7.5"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].stp_treated_ph_act,
      "stp_treated_ph_act",
      6.5,
      7.5,
      "STP Treated Water pH act Should be within the range of 6.5 to 7.5"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_concentrate_ph_act,
      "mee_concentrate_ph_act",
      8.5,
      9.5,
      "MEE Concentrate pH act Should be within the range of 8.5 to 9.5"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].soft_water_ph_act,
      "soft_water_ph_act",
      6,
      7.5,
      "Soft water Tank pH act Should be within the range of 6 to 7.5"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_tank_ph_act,
      "ro_tank_ph_act",
      6,
      7.5,
      "RO Tank pH act Should be within the range of 6 to 7.5"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].bag_filter_ph_act,
      "bag_filter_ph_act",
      6,
      7.5,
      "Bag Filter O/L pH act Should be within the range of 6 to 7.5"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].storage_tank_ph_act,
      "storage_tank_ph_act",
      6,
      7.5,
      "Storage Tank pH act Should be within the range of 6 to 7.5"
    );
    // -----------------------------------------------------------------------------------

    // ---------------------------------- Hardness Tab -----------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].secondary_ol_hardness_act,
      "secondary_ol_hardness_act",
      0,
      199.99,
      "Secondary Clarifier O/L hardness act should be less than 200"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].uf_feed_hardness_act,
      "uf_feed_hardness_act",
      0,
      199.99,
      "UF Feed hardness act should be less than 200"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_01_feed_hardness_act,
      "ro_01_feed_hardness_act",
      0,
      199.99,
      "RO-01 Feed hardness act should be less than 200"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_01_permeate_hardness_act,
      "ro_01_permeate_hardness_act",
      0,
      9.99,
      "RO-01 Permeate hardness act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_02_feed_hardness_act,
      "ro_02_feed_hardness_act",
      0,
      374.99,
      "RO-02 Feed hardness act should be less than 375"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_02_permeate_hardness_act,
      "ro_02_permeate_hardness_act",
      0,
      9.99,
      "RO-02 Permeate hardness act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_03_feed_hardness_act,
      "ro_03_feed_hardness_act",
      0,
      749.99,
      "RO-03 Feed hardness act should be less than 750"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_03_permeate_hardness_act,
      "ro_03_permeate_hardness_act",
      0,
      9.99,
      "RO-03 Permeate hardness act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_04_feed_hardness_act,
      "ro_04_feed_hardness_act",
      0,
      999.99,
      "RO-04 Feed hardness act should be less than 1000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_04_permeate_hardness_act,
      "ro_04_permeate_hardness_act",
      0,
      9.99,
      "RO-04 Permeate hardness act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_feed_hardness_act,
      "mee_feed_hardness_act",
      0,
      499.99,
      "MEE Feed hardness act should be less than 500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_condensate_hardness_act,
      "mee_condensate_hardness_act",
      0,
      9.99,
      "MEE Condensate hardness act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_tank_hardness_act,
      "ro_tank_hardness_act",
      0,
      9.99,
      "RO Tank hardness act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].soft_water_hardness_act,
      "soft_water_hardness_act",
      0,
      9.99,
      "Soft Water Tank hardness act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].kiadb_hardness_act,
      "kiadb_hardness_act",
      0,
      499.99,
      "KIADB Feed hardness act should be less than 500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].softner_hardness_act,
      "softner_hardness_act",
      0,
      9.99,
      "Softner O/L hardness act should be less than 10"
    );

    validateFieldForChemist(
      formData.chemistDetails[0].bag_filter_hardness_act,
      "bag_filter_hardness_act",
      0,
      20,
      "Bag Filter O/L hardness act should be less than or equal to 20"
    );

    //------------------------------------------------------------------------------------------

    // ----------------------------- TDS Tab ---------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].equalization_tds_act,
      "equalization_tds_act",
      0,
      2999.99,
      "Equalization Tank TDS act should be less than 3000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].primary_il_tds_act,
      "primary_il_tds_act",
      0,
      2999.99,
      "Primary clarifier I/L TDS act should be less than 3000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].primary_ol_tds_act,
      "primary_ol_tds_act",
      0,
      2999.99,
      "Primary clarifier O/L TDS act should be less than 3000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_1_tds_act,
      "aeration_tant_1_tds_act",
      0,
      2999.99,
      "Aeration Tank 1 TDS act should be less than 3000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_6_tds_act,
      "aeration_tant_6_tds_act",
      0,
      2999.99,
      "Aeration Tank 6 TDS act should be less than 3000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].secondary_ol_tds_act,
      "secondary_ol_tds_act",
      0,
      2499.99,
      "Secondary Clarifier O/L TDS act should be less than 2500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].uf_feed_tds_act,
      "uf_feed_tds_act",
      0,
      2999.99,
      "UF Feed TDS act should be less than 3000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_01_feed_tds_act,
      "ro_01_feed_tds_act",
      0,
      4999.99,
      "RO-01 Feed TDS act should be less than 5000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_01_permeate_tds_act,
      "ro_01_permeate_tds_act",
      0,
      199.99,
      "RO-01 Permeate TDS act should be less than 200"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_02_feed_tds_act,
      "ro_02_feed_tds_act",
      0,
      8749.99,
      "RO-02 Feed TDS act should be less than 8750"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_02_permeate_tds_act,
      "ro_02_permeate_tds_act",
      0,
      249.99,
      "RO-02 Permeate TDS act should be less than 250"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_03_feed_tds_act,
      "ro_03_feed_tds_act",
      0,
      17499.99,
      "RO-03 Feed TDS act should be less than 17500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_03_permeate_tds_act,
      "ro_03_permeate_tds_act",
      0,
      299.99,
      "RO-03 Permeate TDS act should be less than 300"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_04_feed_tds_act,
      "ro_04_feed_tds_act",
      0,
      20999.99,
      "RO-04 Feed TDS act should be less than 21000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_04_permeate_tds_act,
      "ro_04_permeate_tds_act",
      0,
      499.99,
      "RO-04 Permeate TDS act should be less than 500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_feed_tds_act,
      "mee_feed_tds_act",
      0,
      39999.99,
      "MEE Feed TDS act should be less than 40000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_condensate_tds_act,
      "mee_condensate_tds_act",
      0,
      499.99,
      "MEE Condensate TDS act should be less than 500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].mee_concentrate_tds_act,
      "mee_concentrate_tds_act",
      0,
      150000,
      "MEE Concentrate TDS act should be less than or equal to 150000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_tank_tds_act,
      "ro_tank_tds_act",
      0,
      249.99,
      "RO Tank TDS act should be less than 250"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].soft_water_tds_act,
      "soft_water_tds_act",
      0,
      249.99,
      "Soft Water Tank TDS act should be less than 250"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].kiadb_tds_act,
      "kiadb_tds_act",
      0,
      999.99,
      "KIADB Feed TDS act should be less than 1000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].softner_tds_act,
      "softner_tds_act",
      0,
      249.99,
      "Softner O/L TDS act should be less than 250"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].bag_filter_tds_act,
      "bag_filter_tds_act",
      0,
      250,
      "Bag Filter O/L TDS act should be less than or equal to 250"
    );

    validateFieldForChemist(
      formData.chemistDetails[0].storage_tank_tds_act,
      "storage_tank_tds_act",
      0,
      250,
      "Storage Tank TDS act should be less than or equal to 200"
    );
    //------------------------------------------------------------------------------------------

    // -------------------------- Turbidity Tab ------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].uf_feed_turbidity_act,
      "uf_feed_turbidity_act",
      0,
      49.99,
      "UF Feed turbidity act should be less than 50"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_tank_turbidity_act,
      "ro_tank_turbidity_act",
      0,
      1.99,
      "RO Tank turbidity act should be less than 2"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].soft_water_turbidity_act,
      "soft_water_turbidity_act",
      0,
      1.99,
      "Soft water Tank turbidity act should be less than 2"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].softner_turbidity_act,
      "softner_turbidity_act",
      0,
      1.99,
      "Softner O/L turbidity act should be less than 2"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].bag_filter_turbidity_act,
      "bag_filter_turbidity_act",
      0,
      1.99,
      "Bag Filter O/L turbidity act should be less than 2"
    );

    // -----------------------------------------------------------------------------------------

    // ------------------------------- FRC Tab-------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].secondary_ol_frc_act,
      "secondary_ol_frc_act",
      0,
      1.99,
      "Secondary Clarifier O/L FRC act should be less than 2"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].uf_feed_frc_act,
      "uf_feed_frc_act",
      0,
      1.99,
      "UF Feed FRC act should be less than 2"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].bag_filter_frc_act,
      "bag_filter_frc_act",
      0.1,
      0.3,
      "Bag Filter O/L FRC act should be between 0.1 to 0.3"
    );

    // -----------------------------------------------------------------------------------------

    // ---------------------------------  TSS TAB ----------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].secondary_ol_tss_act,
      "secondary_ol_tss_act",
      0,
      29.99,
      "Secondary Clarifier O/L TSS act should be less than 30"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].uf_feed_tss_act,
      "uf_feed_tss_act",
      0,
      19.99,
      "UF Feed TSS act should be less than 20"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].ro_01_feed_tss_act,
      "ro_01_feed_tss_act",
      0,
      9.99,
      "RO-01 Feed TSS act should be less than 10"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].stp_treated_tss_act,
      "stp_treated_tss_act",
      0,
      19.99,
      "STP Treated Water TSS act should be less than 20"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].bag_filter_tss_act,
      "bag_filter_tss_act",
      0,
      1.99,
      "Bag Filter O/L TSS act should be less than 2"
    );

    // -----------------------------------------------------------------------------------------

    // -------------------------------- DO Tab  ------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_1_do_act,
      "aeration_tant_1_do_act",
      1,
      3,
      "Aeration Tank 1 DO act should be between 1 to 3"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_6_do_act,
      "aeration_tant_6_do_act",
      1,
      3,
      "Aeration Tank 6 DO act should be between 1 to 3"
    );

    // -----------------------------------------------------------------------------------------

    // -------------------------------- COD TAB ------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].equalization_cod_act,
      "equalization_cod_act",
      0,
      1999.99,
      "Equalization Tank COD act should be less than 2000"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].secondary_ol_cod_act,
      "secondary_ol_cod_act",
      0,
      249.99,
      "Secondary Clarifier O/L COD act should be less than 250"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].stp_treated_cod_act,
      "stp_treated_cod_act",
      0,
      49.99,
      "STP Treated Water COD act should be less than 50"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].bag_filter_cod_act,
      "bag_filter_cod_act",
      0,
      199.99,
      "Bag Filter O/L COD act should be less than 200"
    );
    // ------------------------------------------------------------------------------------------

    // --------------------------------- BOD TAB ---------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].equalization_bod_act,
      "equalization_bod_act",
      0,
      499.99,
      "Equalization Tank BOD act should be less than 500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].secondary_ol_bod_act,
      "secondary_ol_bod_act",
      0,
      19.99,
      "Secondary Clarifier O/L BOD act should be less than 20"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].stp_treated_bod_act,
      "stp_treated_bod_act",
      0,
      9.99,
      "STP Treated Water BOD act should be less than 10"
    );
    //----------------------------------------------------------------------------------------------

    //--------------------------------------MLSS TAB --------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_1_mlss_act,
      "aeration_tant_1_mlss_act",
      3500,
      1000000000,
      "Aeration Tank 1 MLSS act should be greater than or equal to 3500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_6_mlss_act,
      "aeration_tant_6_mlss_act",
      3500,
      1000000000,
      "Aeration Tank 6 MLSS act should be greater than or equal to 3500"
    );

    //----------------------------------------------------------------------------------------------

    //----------------------------------------MLVSS TAB ------------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_1_mlvss_act,
      "aeration_tant_1_mlvss_act",
      2500,
      1000000000000000,
      "Aeration Tank 1 MLVS act should be less than or equal to 2500"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_6_mlvss_act,
      "aeration_tant_6_mlvss_act",
      2500,
      1000000000000000,
      "Aeration Tank 6 MLVS act should be less than or equal to 2500"
    );

    //----------------------------------------------------------------------------------------------

    // ----------------------------------------SV30 TAB ----------------------------------------------
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_1_sv_act,
      "aeration_tant_1_sv_act",
      0,
      950,
      "Aeration Tank 1 SV act should be less than or equal to 950"
    );
    validateFieldForChemist(
      formData.chemistDetails[0].aeration_tant_6_sv_act,
      "aeration_tant_6_sv_act",
      0,
      950,
      "Aeration Tank 6 SV act should be less than or equal to 950"
    );
    // -----------------------------------------------------------------------------------------------
  };

  const handleMicroBlur = () => {
    if (status.fieldStatus) {
      return;
    }

    validateFieldForMicro(
      formData.microDetails[0].ro_tank_total_vaible,
      "ro_tank_total_vaible",
      0,
      1000,
      "RO Tank Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].soft_water_total_vaible,
      "soft_water_total_vaible",
      0,
      1000,
      "Soft water Tank Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].bag_filter_total_vaible,
      "bag_filter_total_vaible",
      0,
      1000,
      "Bag Filter O/L Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].storage_tank_total_vaible,
      "storage_tank_total_vaible",
      0,
      1000,
      "Storage Tank Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].water_bleaching_total_vaible,
      "water_bleaching_total_vaible",
      0,
      1000,
      "Water for Bleaching Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].ppd_ahu_inlet_total_vaible,
      "ppd_ahu_inlet_total_vaible",
      0,
      1000,
      "PPD- AHU Inlet water Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].ppd_ahu_fog_total_vaible,
      "ppd_ahu_fog_total_vaible",
      0,
      1000,
      "PPD-AHU Fog chamber Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].uv_inlet_total_vaible,
      "uv_inlet_total_vaible",
      0,
      1000,
      "UV inlet water Total Viable Count should be less than or equal to 1000"
    );
    validateFieldForMicro(
      formData.microDetails[0].uv_outlet_total_vaible,
      "uv_outlet_total_vaible",
      0,
      1000,
      "UV outlet water Total Viable Count should be less than or equal to 1000"
    );

    validateFieldForMicro(
      formData.microDetails[0].ro_tank_total_fungal,
      "ro_tank_total_fungal",
      0,
      100,
      "RO Tank Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].soft_water_total_fungal,
      "soft_water_total_fungal",
      0,
      100,
      "Soft water Tank Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].bag_filter_total_fungal,
      "bag_filter_total_fungal",
      0,
      100,
      "Bag Filter O/L Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].storage_tank_total_fungal,
      "storage_tank_total_fungal",
      0,
      100,
      "Storage Tank Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].water_bleaching_total_fungal,
      "water_bleaching_total_fungal",
      0,
      100,
      "Water for Bleaching Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].ppd_ahu_inlet_total_fungal,
      "ppd_ahu_inlet_total_fungal",
      0,
      100,
      "PPD- AHU Inlet water Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].ppd_ahu_fog_total_fungal,
      "ppd_ahu_fog_total_fungal",
      0,
      100,
      "PPD-AHU Fog chamber Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].uv_inlet_total_fungal,
      "uv_inlet_total_fungal",
      0,
      100,
      "UV inlet water Total Fungal Count should be less than or equal to 100"
    );
    validateFieldForMicro(
      formData.microDetails[0].uv_outlet_total_fungal,
      "uv_outlet_total_fungal",
      0,
      100,
      "UV outlet water Total Fungal Count should be less than or equal to 100"
    );
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSelectText = (e) => {
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
  };

  const handleTabNo = (e) => {
    if (e == "24") {
      return;
    }
    setTabNo(e);
  };
  useEffect(() => {
    if (role == "ROLE_MICROBIOLOGIST") {
      setTabNo("15");
    }
  }, [role]);

  useEffect(() => {
    console.log("Tab No", tabNo);
  }, [tabNo]);

  useEffect(() => {
    console.log("FormData ", formData);
  }, [formData]);

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  return (
    <>
      <BleachingHeader
        formName={"WATER ANALYSIS REPORT"}
        formatNo={"PH-QCL01-AR-F-007"}
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
              display: status.saveStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
              ? "Save"
              : "Approve"}
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.submitStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={
              role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
                ? handleSubmit
                : rejectFlow
            }
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
              ? " Submit"
              : "   Reject"}
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
            onClick={handleSubmit}
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
          onChange={handleRejectReason}
        ></TextArea>
      </Modal>
      {(role == "ROLE_CHEMIST" ||
        role == "QA_EXECUTIVE" ||
        role == "QC_MANAGER" ||
        role == "QA_MANAGER") &&
        Number(tabNo) <= 14 && (
          <>
            <div style={{ margin: "10px" }}>
              <Input
                value={formatDate(date)}
                style={{ textAlign: "center", width: "250px" }}
                addonBefore={"Tested Date : "}
                readOnly
              ></Input>
              <Input
                type="text"
                style={{
                  textAlign: "center",
                  width: "230px",
                  marginLeft: "5px",
                }}
                value={formData.ar_no}
                onChange={(e) => {
                  handleObjectInput(e.target.value, "ar_no");
                }}
                addonBefore="A.R.No :"
                min={0}
                readOnly={status.fieldStatus}
              ></Input>
            </div>
          </>
        )}
      {(role == "ROLE_MICROBIOLOGIST" ||
        role == "QC_MANAGER" ||
        role == "QA_MANAGER") &&
        Number(tabNo) > 14 && (
          <>
            <div style={{ margin: "10px" }}>
              <Input
                type="date"
                value={formData.microDetails[0].equalization_sampled}
                onChange={(e) => {
                  handleMicroInput(e.target.value, "equalization_sampled");
                }}
                max={today}
                style={{ width: "250px", textAlign: "center" }}
                addonBefore={"Sampled On"}
                readOnly={status.fieldStatus}
              ></Input>
              <Input
                value={formatDate(date)}
                addonBefore="Tested /Incubation Start on"
                style={{
                  textAlign: "center",
                  width: "300px",
                  marginLeft: "5px",
                }}
                readOnly
              ></Input>
              <Input
                type="date"
                value={formData.microDetails[0].equalization_test_completion}
                onChange={(e) => {
                  handleMicroInput(
                    e.target.value,
                    "equalization_test_completion"
                  );
                }}
                addonBefore="Test Completion Date"
                min={date}
                style={{
                  textAlign: "center",
                  width: "300px",
                  marginLeft: "38px",
                }}
                readOnly={status.fieldStatus}
              ></Input>
            </div>
          </>
        )}

      {/* ------------------- (PHYSICAL AND CHEMCAL TEST )ROLE CHEMIST ETP IN CHarge And QC  */}
      <Tabs
        defaultActiveKey="1"
        onChange={(e) => {
          handleTabNo(e);
        }}
      >
        {(role == "ROLE_CHEMIST" ||
          role == "QA_EXECUTIVE" ||
          role == "QC_MANAGER" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane tab="pH" key="1">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      pH
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentpHData.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          value={row.act}
                          onKeyDown={(e) => handleE(e)}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.pHcurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={pHData.length}
                    onChange={(page) => {
                      handlePageChange(page, "pHcurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Hardness (ppm)" key="2">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      Hardness (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentHardness.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.hardnessCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={hardnessData.length}
                    onChange={(page) => {
                      handlePageChange(page, "hardnessCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="TDS (ppm)" key="3">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      TDS (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentTDS.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.tDSCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={tDSData.length}
                    onChange={(page) => {
                      handlePageChange(page, "tDSCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Turbidity   (NTU)" key="4">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      Turbidity (NTU)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentTurbidity.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.turbidityCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={turbudityData.length}
                    onChange={(page) => {
                      handlePageChange(page, "turbidityCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="FRC (ppm)" key="5">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      FRC (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentFRC.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.fRCCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={fRCData.length}
                    onChange={(page) => {
                      handlePageChange(page, "fRCCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="TSS  (ppm)" key="6">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      TSS (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentTSS.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.tssCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={tSSData.length}
                    onChange={(page) => {
                      handlePageChange(page, "tssCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="DO (ppm)" key="7">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      DO (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentDo.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.doCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={dOData.length}
                    onChange={(page) => {
                      handlePageChange(page, "doCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="COD (ppm)" key="8">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      COD (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentCOD.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.codCCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={cODData.length}
                    onChange={(page) => {
                      handlePageChange(page, "codCCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="BOD (ppm)" key="9">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      BOD (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentBOD.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.bodCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={bODData.length}
                    onChange={(page) => {
                      handlePageChange(page, "bodCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="MLSS (ppm)" key="10">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      MLSS (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentMLSS.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.mlssCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={mLSSData.length}
                    onChange={(page) => {
                      handlePageChange(page, "mlssCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="MLVSS (ppm)" key="11">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      MLVSS (ppm)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentMLVSS.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.mlvssCurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={mLVSSDATA.length}
                    onChange={(page) => {
                      handlePageChange(page, "mlvssCurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="SV 30 (mg/l)" key="12">
              <div style={{ height: "50vh" }}>
                <table style={{ tableLayout: "fixed" }}>
                  <tr>
                    <td style={{ textAlign: "center" }} rowSpan={2}>
                      {" "}
                      S.No
                    </td>
                    <td
                      style={{ textAlign: "center", width: "30%" }}
                      rowSpan={2}
                    >
                      {" "}
                      Sample Description
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "60%",
                        padding: "10px",
                      }}
                      colSpan={2}
                    >
                      {" "}
                      SV 30 (mg/l)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Std
                    </td>
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      {" "}
                      Act
                    </td>
                  </tr>
                  {currentSV30.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.id}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.description}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {row.std}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <Input
                          type="number"
                          style={{ textAlign: "center" }}
                          onKeyDown={(e) => handleE(e)}
                          value={row.act}
                          onBlur={handleBlur}
                          min={0}
                          onChange={(e) =>
                            handleInput(e.target.value, row.keyName)
                          }
                          readOnly={status.fieldStatus}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <Pagination
                    current={currentPage.sv30CurrentPage}
                    pageSize={rowsPerPageForPh}
                    total={sV30Data.length}
                    onChange={(page) => {
                      handlePageChange(page, "sv30CurrentPage");
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Che Test Remarks" key="13">
              <div style={{ height: "40vh" }}>
                <table style={{ width: "50%" }}>
                  <tr>
                    <td style={{ padding: "20px" }}>Remark</td>
                    <td>
                      <TextArea
                        value={formData.chemistDetails[0].remarks}
                        style={{ resize: "none", textAlign: "center" }}
                        onChange={(e) => handleInput(e.target.value, "remarks")}
                        readOnly={status.fieldStatus}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                      ></TextArea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ padding: "2px" }}>
                      PPM= Parts per million, NTU= Nephelometer Turbidity unit ,
                      O/L= Outlet , I/L= Inlet RO - Reverse osmosis, UV-Ultra
                      violet PPD - Pad Punching Department, AHU - Air Handling
                      Unit, cfu/ml- Colony forming unit per milliliter,
                      Ab-Absent, Pr- Present, A.R. No.-Analytical Reference
                      Number{" "}
                    </td>
                  </tr>
                </table>
              </div>
            </TabPane>
          </>
        )}
        {(role == "ROLE_CHEMIST" || role == "QA_EXECUTIVE") && (
          <>
            <TabPane tab="Reviews" key="14">
              <div style={{ height: "40vh" }}>
                <table style={{ height: "60%", tableLayout: "fixed" }}>
                  <tr>
                    <td
                      colspan="1"
                      style={{ textAlign: "center", width: "30%" }}
                    >
                      Tested By (Chemist).
                    </td>
                    <td
                      colspan="2"
                      style={{ textAlign: "center", width: "35%" }}
                    >
                      Verified By :
                    </td>
                    <td
                      colspan="1"
                      style={{ textAlign: "center", width: "35%" }}
                    >
                      Approved By :
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="1"
                      style={{ height: "60%", textAlign: "center" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            {formData.chemist_sign}
                            <br />
                            {formatDateAndTime(formData.chemist_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.chemist_sign ? (
                            <img
                              src={eSign.chemist_sign}
                              alt="Operator eSign"
                              style={{
                                width: "150px",
                                height: "70px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </td>

                    <td
                      colspan="2"
                      style={{ height: "60%", textAlign: "center" }}
                    >
                      {formData.qa_exe_status !== "WAITING_FOR_APPROVAL" &&
                        formData.qa_exe_status !== "" && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {formData.qa_exe_sign}
                                <br />
                                {formatDateAndTime(formData.qa_exe_submit_on)}
                              </div>
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                              {eSign.qa_exe_sign ? (
                                <img
                                  src={eSign.qa_exe_sign}
                                  alt="eSign"
                                  style={{
                                    width: "150px",
                                    height: "70px",
                                    objectFit: "contain",
                                    mixBlendMode: "multiply",
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        )}
                    </td>
                    <td
                      colspan="1"
                      style={{ height: "60%", textAlign: "center" }}
                    >
                      {formData.manager_status !== "WAITING_FOR_APPROVAL" &&
                        formData.manager_status !== "" && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {formData.manager_sign}
                                <br />
                                {formatDateAndTime(formData.manager_submit_on)}
                              </div>
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                              {eSign.manager_sign ? (
                                <img
                                  src={eSign.manager_sign}
                                  alt="HOD eSign"
                                  style={{
                                    width: "150px",
                                    height: "70px",
                                    objectFit: "contain",
                                    mixBlendMode: "multiply",
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        )}
                    </td>
                  </tr>
                </table>
              </div>
            </TabPane>
          </>
        )}
        {(role == "ROLE_MICROBIOLOGIST" ||
          role == "QC_MANAGER" ||
          role == "QA_MANAGER") && (
          <>
            <TabPane tab="Total Viable Count" key="15">
              <table>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={1}>
                    {" "}
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "30%" }} rowSpan={1}>
                    {" "}
                    Sample Description
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "60%",
                      padding: "15px",
                    }}
                    colSpan={1}
                  >
                    {" "}
                    Total Viable Count TVC -cfu/g (Limit ≤1000)
                  </td>
                </tr>
                {currentViable.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{row.id}</td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td>
                      <Input
                        type="number"
                        value={row.field}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, row.keyName);
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={handleE}
                        readOnly={status.fieldStatus}
                        style={{ width: "100%", textAlign: "center" }}
                      ></Input>
                    </td>
                  </tr>
                ))}
              </table>
            </TabPane>
            <TabPane tab="Total Fungal Count" key="16">
              <table>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={1}>
                    {" "}
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "30%" }} rowSpan={1}>
                    {" "}
                    Sample Description
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "60%",
                      padding: "15px",
                    }}
                    colSpan={1}
                  >
                    Total Fungal Count (TFC-cfu/g)(Limit ≤ 100)
                  </td>
                </tr>
                {currentFungal.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{row.id}</td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td>
                      <Input
                        type="number"
                        value={row.field}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, row.keyName);
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={handleE}
                        readOnly={status.fieldStatus}
                        style={{ width: "100%", textAlign: "center" }}
                      ></Input>
                    </td>
                  </tr>
                ))}
              </table>
            </TabPane>
            <TabPane tab="Gram Negative Data" key="17">
              <table>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={1}>
                    {" "}
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "30%" }} rowSpan={1}>
                    {" "}
                    Sample Description
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "60%",
                      padding: "15px",
                    }}
                    colSpan={1}
                  >
                    Gram negative bacteria or Coliform(Should be Absent)
                  </td>
                </tr>
                {currentGramNegative.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{row.id}</td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td>
                      <Input
                        type="text"
                        value={row.field}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, row.keyName);
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        readOnly={status.fieldStatus}
                        style={{ width: "100%", textAlign: "center" }}
                      ></Input>
                    </td>
                  </tr>
                ))}
              </table>
            </TabPane>
            <TabPane tab="E.coli" key="18">
              <table>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={1}>
                    {" "}
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "30%" }} rowSpan={1}>
                    {" "}
                    Sample Description
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "60%",
                      padding: "15px",
                    }}
                    colSpan={1}
                  >
                    Escherechia coli (E.coli)(Should be Absent)
                  </td>
                </tr>
                {currentEColi.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{row.id}</td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td>
                      <Input
                        type="text"
                        value={row.field}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, row.keyName);
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        readOnly={status.fieldStatus}
                        style={{ width: "100%", textAlign: "center" }}
                      ></Input>
                    </td>
                  </tr>
                ))}
              </table>
            </TabPane>
            <TabPane tab="S.aur" key="19">
              <table>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={1}>
                    {" "}
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "30%" }} rowSpan={1}>
                    {" "}
                    Sample Description
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "60%",
                      padding: "15px",
                    }}
                    colSpan={1}
                  >
                    Staphylococcos aures (S.aur )(Should be Absent)
                  </td>
                </tr>
                {currentStaphy.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{row.id}</td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td>
                      <Input
                        type="text"
                        value={row.field}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, row.keyName);
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        readOnly={status.fieldStatus}
                        style={{ width: "100%", textAlign: "center" }}
                      ></Input>
                    </td>
                  </tr>
                ))}
              </table>
            </TabPane>
            <TabPane tab="P.aer" key="20">
              <table>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={1}>
                    {" "}
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "30%" }} rowSpan={1}>
                    {" "}
                    Sample Description
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "60%",
                      padding: "15px",
                    }}
                    colSpan={1}
                  >
                    Pseudomonas aerogenosa (P.aer) (Should be Absent)
                  </td>
                </tr>
                {currentPseudo.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{row.id}</td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td>
                      <Input
                        type="text"
                        value={row.field}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, row.keyName);
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        readOnly={status.fieldStatus}
                        style={{ width: "100%", textAlign: "center" }}
                      ></Input>
                    </td>
                  </tr>
                ))}
              </table>
            </TabPane>
            <TabPane tab="Salmonella" key="21">
              <table>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={1}>
                    {" "}
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "30%" }} rowSpan={1}>
                    {" "}
                    Sample Description
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      width: "60%",
                      padding: "15px",
                    }}
                    colSpan={1}
                  >
                    Salmonella (Sal.)(Should be Absent)
                  </td>
                </tr>
                {currentSalmonella.map((row, index) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{row.id}</td>
                    <td style={{ textAlign: "center" }}>{row.description}</td>
                    <td>
                      <Input
                        type="text"
                        value={row.field}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, row.keyName);
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        readOnly={status.fieldStatus}
                        style={{ width: "100%", textAlign: "center" }}
                      ></Input>
                    </td>
                  </tr>
                ))}
              </table>
            </TabPane>
            <TabPane tab="Micro Test Remarks" key="22">
              <div style={{ height: "40vh" }}>
                <table style={{ width: "50%" }}>
                  <tr>
                    <td style={{ padding: "20px" }}>Remark</td>
                    <td>
                      <TextArea
                        value={formData.microDetails[0].remarks}
                        onChange={(e) => {
                          handleMicroInput(e.target.value, "remarks");
                        }}
                        onBlur={handleMicroBlur}
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        style={{ resize: "none", textAlign: "center" }}
                        readOnly={status.fieldStatus}
                      ></TextArea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ padding: "2px" }}>
                      PPM= Parts per million, NTU= Nephelometer Turbidity unit ,
                      O/L= Outlet , I/L= Inlet RO - Reverse osmosis, UV-Ultra
                      violet PPD - Pad Punching Department, AHU - Air Handling
                      Unit, cfu/ml- Colony forming unit per milliliter,
                      Ab-Absent, Pr- Present, A.R. No.-Analytical Reference
                      Number{" "}
                    </td>
                  </tr>
                </table>
              </div>
            </TabPane>
            {role == "ROLE_MICROBIOLOGIST" && (
              <>
                <TabPane tab="Reviews" key="23">
                  <div style={{ height: "40vh" }}>
                    <table style={{ height: "60%", tableLayout: "fixed" }}>
                      <tr>
                        <td
                          colspan="1"
                          style={{ textAlign: "center", width: "30%" }}
                        >
                          Tested By (Microbiologist):
                        </td>
                        <td
                          colspan="1"
                          style={{ textAlign: "center", width: "35%" }}
                        >
                          Approved By :
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style={{ height: "60%", textAlign: "center" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {formData.micro_sign}
                                <br />
                                {formatDateAndTime(formData.micro_submit_on)}
                              </div>
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                              {eSign.micro_sign ? (
                                <img
                                  src={eSign.micro_sign}
                                  alt="Operator eSign"
                                  style={{
                                    width: "150px",
                                    height: "70px",
                                    objectFit: "contain",
                                    mixBlendMode: "multiply",
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td
                          colspan="1"
                          style={{ height: "60%", textAlign: "center" }}
                        >
                          {formData.manager_status !== "WAITING_FOR_APPROVAL" &&
                            formData.manager_status !== "" && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ textAlign: "center" }}>
                                    {formData.manager_sign}
                                    <br />
                                    {formatDateAndTime(
                                      formData.manager_submit_on
                                    )}
                                  </div>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                  {eSign.manager_sign ? (
                                    <img
                                      src={eSign.manager_sign}
                                      alt="HOD eSign"
                                      style={{
                                        width: "150px",
                                        height: "70px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            )}
                        </td>
                      </tr>
                    </table>
                  </div>
                </TabPane>
              </>
            )}
            {(role == "QA_MANAGER" || role == "QC_MANAGER") && (
              <>
                <TabPane tab="Reviews" key="24">
                  <div style={{ height: "40vh" }}>
                    <table style={{ height: "60%", tableLayout: "fixed" }}>
                      <tr>
                        <td
                          colSpan={2}
                          style={{ textAlign: "center", padding: "10px" }}
                        >
                          {" "}
                          PHYSICAL AND CHEMCAL TEST
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {" "}
                          MICROBIOLOGICAL TEST
                        </td>
                        <td
                          colspan="1"
                          rowSpan={2}
                          style={{ textAlign: "center", width: "35%" }}
                        >
                          Approved By :
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style={{ textAlign: "center", width: "30%" }}
                        >
                          Tested By (Chemist).
                        </td>
                        <td style={{ textAlign: "center", width: "35%" }}>
                          Verified By :
                        </td>
                        <td
                          colspan="1"
                          style={{ textAlign: "center", width: "30%" }}
                        >
                          Tested By (Microbiologist):
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="1"
                          style={{ height: "60%", textAlign: "center" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {formData.chemist_sign}
                                <br />
                                {formatDateAndTime(formData.chemist_submit_on)}
                              </div>
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                              {eSign.chemist_sign ? (
                                <img
                                  src={eSign.chemist_sign}
                                  alt="Operator eSign"
                                  style={{
                                    width: "150px",
                                    height: "70px",
                                    objectFit: "contain",
                                    mixBlendMode: "multiply",
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td
                          colspan="1"
                          style={{ height: "60%", textAlign: "center" }}
                        >
                          {formData.qa_exe_status !== "WAITING_FOR_APPROVAL" &&
                            formData.qa_exe_status !== "" && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ textAlign: "center" }}>
                                    {formData.qa_exe_sign}
                                    <br />
                                    {formatDateAndTime(
                                      formData.qa_exe_submit_on
                                    )}
                                  </div>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                  {eSign.qa_exe_sign ? (
                                    <img
                                      src={eSign.qa_exe_sign}
                                      alt="eSign"
                                      style={{
                                        width: "150px",
                                        height: "70px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            )}
                        </td>
                        <td
                          colspan="1"
                          style={{ height: "60%", textAlign: "center" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ textAlign: "center" }}>
                                {formData.micro_sign}
                                <br />
                                {formatDateAndTime(formData.micro_submit_on)}
                              </div>
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                              {eSign.micro_sign ? (
                                <img
                                  src={eSign.micro_sign}
                                  alt="Operator eSign"
                                  style={{
                                    width: "150px",
                                    height: "70px",
                                    objectFit: "contain",
                                    mixBlendMode: "multiply",
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td
                          colspan="1"
                          style={{ height: "60%", textAlign: "center" }}
                        >
                          {formData.manager_status !== "WAITING_FOR_APPROVAL" &&
                            formData.manager_status !== "" && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ textAlign: "center" }}>
                                    {formData.manager_sign}
                                    <br />
                                    {formatDateAndTime(
                                      formData.manager_submit_on
                                    )}
                                  </div>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                  {eSign.manager_sign ? (
                                    <img
                                      src={eSign.manager_sign}
                                      alt="HOD eSign"
                                      style={{
                                        width: "150px",
                                        height: "70px",
                                        objectFit: "contain",
                                        mixBlendMode: "multiply",
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            )}
                        </td>
                      </tr>
                    </table>
                  </div>
                </TabPane>
              </>
            )}
          </>
        )}
      </Tabs>
    </>
  );
};

export default QualityControl_AR_f07;
