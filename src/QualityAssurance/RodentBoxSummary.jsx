/* eslint-disable no-restricted-globals */
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tooltip, message } from "antd";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const RodentBoxSummary = () => {
  const navigate = useNavigate();
  const formName = "RODENT BOX CHECK LIST SUMMARY";
  const formatNo = "PH-HRD01/F-013";
  const [open, setOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedPrintDate, setSelectedPrintDate] = useState();
  const [isReasonColumn, setIsReasonColumn] = useState(false);
  const [eSign, setESign] = useState({
    pci_sign: "",
    qa_mr_sign: "",
  });

  const formatPrintDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const [printData, setPrintData] = useState({
    format_name: "Rodent Box Check List",
    format_no: "RC-001",
    revision_no: 2,
    sop_number: "SOP-123",
    unit: "Unit H",
    frequency: "Fortnightly",
    date: "",
    year: "2024",
    month: "October",
    remarks: "",
    pci_status: "",
    pci_save_on: "",
    pci_save_by: "",

    pci_submit_on: "",
    pci_submit_by: "",

    pci_sign: "aravind",
    qa_mr_status: "",
    qa_mr_submit_on: "",
    qa_mr_submit_by: "",

    qa_mr_sign: "",
    reason: null,
    details: [
      {
        sno: 1,
        rodent_box_no: "GTS-01",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 2,
        rodent_box_no: "GTS-02",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 3,
        rodent_box_no: "GTS-03",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 4,
        rodent_box_no: "GTS-04",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 5,
        rodent_box_no: "GTS-05",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 6,
        rodent_box_no: "GTS-06",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 7,
        rodent_box_no: "GTS-07",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 8,
        rodent_box_no: "GTS-08",
        location: "Raw Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 9,
        rodent_box_no: "GTS-09",
        location: "Blow Room",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 10,
        rodent_box_no: "GTS-10",
        location: "Blow Room",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 11,
        rodent_box_no: "GTS-11",
        location: "Blow Room",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 12,
        rodent_box_no: "GTS-12",
        location: "Blow Room",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 13,
        rodent_box_no: "GTS-13",
        location: "Carding",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 14,
        rodent_box_no: "GTS-14",
        location: "Carding",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 15,
        rodent_box_no: "GTS-15",
        location: "Waste bale press",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 16,
        rodent_box_no: "GTS-16",
        location: "Waste bale press",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 17,
        rodent_box_no: "GTS-17",
        location: "Bleaching",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 18,
        rodent_box_no: "GTS-18",
        location: "Bleaching",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 19,
        rodent_box_no: "GTS-19",
        location: "Bleaching",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 20,
        rodent_box_no: "GTS-20",
        location: "Bleaching",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 21,
        rodent_box_no: "GTS-21",
        location: "Bleaching",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 22,
        rodent_box_no: "GTS-22",
        location: "Absorbent Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 23,
        rodent_box_no: "GTS-23",
        location: "Absorbent Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 24,
        rodent_box_no: "GTS-24",
        location: "Absorbent Cotton Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 25,
        rodent_box_no: "GTS-25",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 26,
        rodent_box_no: "GTS-26",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 27,
        rodent_box_no: "GTS-27",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 28,
        rodent_box_no: "GTS-28",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 29,
        rodent_box_no: "GTS-29",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 30,
        rodent_box_no: "GTS-30",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 31,
        rodent_box_no: "GTS-31",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 32,
        rodent_box_no: "GTS-32",
        location: "Spun Lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 33,
        rodent_box_no: "GTS-33",
        location: "Filtration",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 34,
        rodent_box_no: "GTS-34",
        location: "Filtration",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 35,
        rodent_box_no: "GTS-35",
        location: "Jet lace",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 36,
        rodent_box_no: "GTS-36",
        location: "Pad Punching & Packing",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 37,
        rodent_box_no: "GTS-37",
        location: "Pad Punching & Packing",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 38,
        rodent_box_no: "GTS-38",
        location: "Pad Punching & Packing",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 39,
        rodent_box_no: "GTS-39",
        location: "Pad Punching & Packing",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 40,
        rodent_box_no: "GTS-40",
        location: "Old packing area",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 41,
        rodent_box_no: "GTS-41",
        location: "FG Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 42,
        rodent_box_no: "GTS-42",
        location: "FG Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 43,
        rodent_box_no: "GTS-43",
        location: "FG Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 44,
        rodent_box_no: "GTS-44",
        location: "FG Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 45,
        rodent_box_no: "GTS-45",
        location: "FG Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 46,
        rodent_box_no: "GTS-46",
        location: "FG Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 47,
        rodent_box_no: "GTS-47",
        location: "FG Godown",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 48,
        rodent_box_no: "GTS-48",
        location: "Packing material area",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 49,
        rodent_box_no: "GTS-49",
        location: "Bag making",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 50,
        rodent_box_no: "GTS-50",
        location: "Packing material area",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 51,
        rodent_box_no: "GTS-51",
        location: "Packing material area",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 52,
        rodent_box_no: "GTS-52",
        location: "Store",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 53,
        rodent_box_no: "GTS-53",
        location: "QC Lab",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 54,
        rodent_box_no: "GTS-54",
        location: "QC Lab",
        rodent_box_type: "GTS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 55,
        rodent_box_no: "RBS-01",
        location: "QC Lab",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 56,
        rodent_box_no: "RBS-02",
        location: "Maintenance Room",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 57,
        rodent_box_no: "RBS-03",
        location: "Stores",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 58,
        rodent_box_no: "RBS-04",
        location: "Stores",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 59,
        rodent_box_no: "RBS-05",
        location: "FG Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 60,
        rodent_box_no: "RBS-06",
        location: "FG Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 61,
        rodent_box_no: "RBS-07",
        location: "FG Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 62,
        rodent_box_no: "RBS-08",
        location: "FG Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 63,
        rodent_box_no: "RBS-09",
        location: "FG Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 64,
        rodent_box_no: "RBS-10",
        location: "FG Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 65,
        rodent_box_no: "RBS-11",
        location: "FG Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 66,
        rodent_box_no: "RBS-12",
        location: "Pad Punching & Packing",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 67,
        rodent_box_no: "RBS-13",
        location: "Pad Punching & Packing",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 68,
        rodent_box_no: "RBS-14",
        location: "Ball Making",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 69,
        rodent_box_no: "RBS-15",
        location: "Waste Recovery Area",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 70,
        rodent_box_no: "RBS-16",
        location: "Bleached Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 71,
        rodent_box_no: "RBS-17",
        location: "Bleached Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 72,
        rodent_box_no: "RBS-18",
        location: "Bleaching",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 73,
        rodent_box_no: "RBS-19",
        location: "Bleaching",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 74,
        rodent_box_no: "RBS-20",
        location: "Waste Bale Press",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 75,
        rodent_box_no: "RBS-21",
        location: "Waste Bale Press",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 76,
        rodent_box_no: "RBS-22",
        location: "Blow Room",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 77,
        rodent_box_no: "RBS-23",
        location: "Blow Room",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 78,
        rodent_box_no: "RBS-24",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 79,
        rodent_box_no: "RBS-25",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 80,
        rodent_box_no: "RBS-26",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 81,
        rodent_box_no: "RBS-21",
        location: "Waste Bale Press",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 82,
        rodent_box_no: "RBS-21",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 83,
        rodent_box_no: "RBS-21",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 84,
        rodent_box_no: "RBS-21",
        location: "Humidification Plant",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 85,
        rodent_box_no: "RBS-21",
        location: "Humidification Plant",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
    ],
  });

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const printDateSubmit = () => {
    window.print();
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  const handleGo = () => {
    if (selectedDate === "") {
      message.warning("Please select date first");
      return;
    }
    navigate("/Precot/QA/rodentFull", {
      state: {
        date: selectedDate,
      },
    });
  };

  const handlePrintDateChange = (e) => {
    setSelectedPrintDate(e.target.value);
  };

  const handlePrint = () => {
    if (selectedPrintDate === undefined) {
      message.warning("Kindly select date first to print!");
      return;
    }

    setPrintLoading(true);
    const token = localStorage.getItem("token");
    //
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/RodentBox/print?month&year&date=${selectedPrintDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPrintData(response.data[0]);

          setTimeout(() => {
            window.print();
            setPrintLoading(false);
          }, 2000);
        } else {
          message.warning(response.data.message);
          setPrintLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        // nishadharan
      });
  };

  const [data, setData] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/rodentFull", {
      state: {
        date: record.date,
      },
    });
  };

  const reasonColumn = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => text || "NA",
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },

    {
      title: "PCI Person status",
      dataIndex: "pci_status",
      key: "pci_status",
      align: "center",
    },
    {
      title: "Qa Manager / Designee status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const finalColumns = isReasonColumn
    ? [...columns.slice(0, -1), reasonColumn, columns[columns.length - 1]] // Insert before the last column
    : columns;

  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/RodentBox/getRodentBoxSummary`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
          }
        )
        .then((response) => {
          // Log the response data
          setData(response.data); // Set the data to state

          const hasReason = response.data.some(
            (item) => item.reason !== null && item.reason !== "NA"
          );

          setIsReasonColumn(hasReason);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["pci_sign", "qa_mr_sign"];
    signatureKeys.forEach((key) => {
      if (printData) {
        const username = printData[key];

        if (username) {
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
            .catch((err) => {});
        }
      }
    });
  }, [printData, printData && printData.pci_sign]);

  const handleModalClose = () => {
    setIsModalPrint(false);
    setPrintLoading(false);
    setSelectedPrintDate("");
  };

  const handlePrintScreen = () => {
    window.print();
  };

  const rowsPerPage = 25; // Number of rows you want per page
  const totalPages = Math.ceil(printData.details.length / rowsPerPage);

  return (
    <>
      <BleachingHeader
        formName={formName}
        formatNo={formatNo}
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

      <div>
        <input
          type="date"
          style={{ margin: "8px", padding: "5px" }}
          onChange={handleChange}
          value={selectedDate}
          max={new Date().toISOString().split("T")[0]}
        />
        <Button onClick={handleGo}>GO</Button>
      </div>

      <Modal
        title={formName}
        open={isModalPrint}
        width={380}
        destroyOnClose={true}
        onOk={() => setIsModalPrint(false)}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            type="primary"
            onClick={handlePrint}
            loading={printLoading}
          >
            Print
          </Button>,
        ]}
      >
        <div>
          <label>Select Date: </label>
          <input
            type="date"
            onChange={handlePrintDateChange}
            value={selectedPrintDate}
          />
        </div>
      </Modal>

      <div style={{ margin: "8px" }}>
        <Table
          style={{ textAlign: "center" }}
          columns={finalColumns}
          dataSource={data}
        />
      </div>

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
      #section-to-print table th,
  #section-to-print table td {
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
        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <table style={{ width: "99%", marginTop: "" }}>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "30px" }}></td>
              </tr>

              <tr>
                <th
                  colSpan="2"
                  rowSpan="4"
                  printDateSubmit
                  style={{ textAlign: "center", height: "80px" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />{" "}
                  <br></br>
                  Unit H
                </th>
                <th colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
                  {"RODENT BOX CHECK LIST"}
                </th>
                <th>Format No:</th>
                <th>{formatNo}</th>
              </tr>
              <tr>
                <th>Revision No.:</th>
                <th>03</th>
              </tr>
              <tr>
                <th>Ref. SOP No:</th>
                <th>PH-HRD01-D-10</th>
              </tr>
              <tr>
                <th>Page NO:</th>
                <th>{`Page ${pageIndex + 1} of ${totalPages}`}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", border: "none" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "8px" }} colSpan={5}>
                  Frequency: {"Fortnightly"}
                </td>
                <td style={{ padding: "8px" }} colSpan={3}>
                  Date:
                  {formatDate(selectedPrintDate)}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px" }} colSpan={8}>
                  Pest Control Service : Pied Piper Service, done for Rats,
                  Mouse, Bandicoots, Norway Rat etc.
                </td>
              </tr>

              <tr>
                <td style={{ padding: "8px" }} colSpan={8}>
                  Note: Using for GTS ( Glue trap station): Trubble Gum and RBS
                  (Rodent bit statin): Roban Cake
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px", textAlign: "center" }} rowSpan={2}>
                  Sr. No
                </td>
                <td style={{ padding: "8px", textAlign: "center" }} rowSpan={2}>
                  Rodent Box No.
                </td>
                <td style={{ padding: "8px", textAlign: "center" }} rowSpan={2}>
                  Location
                </td>
                <td style={{ padding: "8px", textAlign: "center" }} rowSpan={2}>
                  Rodent Box Type
                </td>
                <td style={{ padding: "8px", textAlign: "center" }} colSpan={4}>
                  Servicing Done(Yes / No)
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  Glue Paper / Bait Replaced
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  Rodent Box is fixed
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  Box No. identified
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  Dead Rodent Found
                </td>
              </tr>

              {printData.details
                .slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
                .map((data, index) => (
                  <tr key={index}>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {String(index + 1 + pageIndex * rowsPerPage).padStart(
                        2,
                        "0"
                      )}
                    </td>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {data.rodent_box_no}
                    </td>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {data.location}
                    </td>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {data.rodent_box_type}
                    </td>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {data.glue_paper_replaced}
                    </td>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {data.rodent_box_fixed}
                    </td>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {data.box_no_identified}
                    </td>
                    <td style={{ height: "20px", textAlign: "center" }}>
                      {data.dead_rodent_found}
                    </td>
                  </tr>
                ))}
              {pageIndex + 1 === totalPages && (
                <>
                  <tr>
                    <td colSpan={8} style={{ height: "3rem" }}>
                      Remark(s), if any: {printData.remarks}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      style={{ height: "3rem", textAlign: "center" }}
                    >
                      PCI
                      <br></br>
                      <b>
                        {printData.pci_sign}
                        <br></br>
                        {formatPrintDate(printData.pci_submit_on)}
                      </b>
                      <br></br>
                      {eSign.pci_sign ? (
                        <img
                          src={eSign.pci_sign}
                          alt="pci eSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                    <td
                      colSpan={4}
                      style={{ height: "3rem", textAlign: "center" }}
                    >
                      QA MANAGER/DESIGNEE
                      <br></br>
                      {printData.qa_mr_status != "WAITING_FOR_APPROVAL" && (
                        <>
                          <b>
                            {printData.qa_mr_sign}
                            <br></br>
                            {formatPrintDate(printData.qa_mr_submit_on)}
                          </b>
                          <br></br>
                          {eSign.qa_mr_sign ? (
                            <img
                              src={eSign.qa_mr_sign}
                              alt="pci eSign"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ padding: "8px" }}>
                      Note: All Rodent Box installed inside the plant area are
                      of GTS type, considering product safety, while outside
                      plant are of RBS type. Nomenclature - GTS stands for Glue
                      Trapping Station and RBS stands for Rodent Bait Station.
                    </td>
                  </tr>
                </>
              )}
              {/* </React.Fragment> */}
              {/* ))} */}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ padding: "10px", border: "none" }}></td>
              </tr>
              <tr>
                <td colSpan={2}>Particulars</td>
                <td colSpan={2}>Prepared By</td>
                <td colSpan={2}>Reviewed By</td>
                <td colSpan={2}>Approved By</td>
              </tr>
              <tr>
                <td colSpan={2}>Name</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
              </tr>
              <tr>
                <td colSpan={2}>Signature & Date</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>
    </>
  );
};

export default RodentBoxSummary;
