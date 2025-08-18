/* eslint-disable no-restricted-globals */

import { Button, Input, message, Modal, Pagination, Tabs, Tooltip } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import RadioCom from "../Components/RadioCom.jsx";
import {
  getYearAndMonth,
  handleKeyDown,
  printDateFormat,
  slashFormatDate,
} from "../util/util.js";

const RodentBoxFull = () => {
  const role = localStorage.getItem("role");
  const { state } = useLocation();
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);

  const [isDataDeleted, setIsDataDeleted] = useState(false);

  const [eSign, setESign] = useState({
    pci_sign: "",
    qa_mr_sign: "",
  });

  const [rejectReason, setRejectReason] = useState();

  // // const handleBulkUpdate = (value, field) => {
  // //   const updatedDetails = formData.details.map((item, index) => {
  // //     // Only update rows that are in the current page
  // //     const isInCurrentPage =
  // //       index >= indexOfFirstRow && index < indexOfLastRow;

  // //     return isInCurrentPage ? { ...item, [field]: value } : item;
  // //   });

  // //   setFormData({
  // //     ...formData,
  // //     details: updatedDetails,
  // //   });
  // // };;
  // const handleBulkUpdate = (value) => {
  //   // List of target field suffixes
  //   const targetFields = ["replaced", "fixed", "identified", "found"];

  //   // Update the details array
  //   const updatedDetails = formData.details.map((item) => {
  //     const updatedItem = { ...item };
  //     // Update fields ending with the target suffix
  //     Object.keys(item).forEach((key) => {
  //       if (targetFields.some((suffix) => key.endsWith(suffix))) {
  //         updatedItem[key] = value;
  //       }
  //     });
  //     return updatedItem;
  //   });

  //   // Update formData state
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     details: updatedDetails,
  //   }));
  // };

  const handleBulkUpdate = (value) => {
    // List of target field suffixes to update
    const targetFields = ["replaced", "fixed", "identified"];

    // Update the details array
    const updatedDetails = formData.details.map((item) => {
      const updatedItem = { ...item };
      // Update fields ending with the target suffix, excluding "dead_rodent_found"
      Object.keys(item).forEach((key) => {
        if (targetFields.some((suffix) => key.endsWith(suffix))) {
          updatedItem[key] = value;
        }
      });
      return updatedItem;
    });

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      details: updatedDetails,
    }));
  };

  const navigate = useNavigate();
  const initialized = useRef(false);
  const [gluePaper, setGluePaper] = useState("");
  const [open, setOpen] = useState(false);

  const { year, month } = getYearAndMonth(state.date);

  const [formData, setFormData] = useState({
    format_name: "Rodent Box Check List",
    format_no: "RC-001",
    revision_no: 2,
    sop_number: "SOP-123",
    unit: "Unit H",
    frequency: "Fortnightly",
    date: state.date,
    year: year,
    month: month,
    remarks: "",
    pci_status: "",
    pci_save_on: "",
    pci_save_by: "",

    pci_submit_on: "",
    pci_submit_by: "",

    pci_sign: "",
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
        rodent_box_no: "RBS-27",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 82,
        rodent_box_no: "RBS-28",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 83,
        rodent_box_no: "RBS-29",
        location: "Raw Cotton Godown",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 84,
        rodent_box_no: "RBS-30",
        location: "Humidification Plant",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
      {
        sno: 85,
        rodent_box_no: "RBS-31",
        location: "Humidification Plant",
        rodent_box_type: "RBS",
        glue_paper_replaced: "",
        rodent_box_fixed: "",
        box_no_identified: "",
        dead_rodent_found: "",
      },
    ],
  });

  // paginations

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = formData.details.slice(indexOfFirstRow, indexOfLastRow);

  const handleChange = (e, index, field) => {
    // console.log('formData', formData)
    // console.log('formData details', formData.details)
    // const updatedFormData = [...formData];

    // updatedFormData[index][field] = e.target.value;

    // setFormData(updatedFormData);

    const formArray = formData.details;

    formArray[index][field] = e.target.value;

    // updatedFormData.details = formArray;

    setFormData({
      ...formData,
      details: formArray,
    });
  };

  const handleDelete = (index, id) => {
    if (id === undefined) {
      const updatedDetails = formData.details.filter((_, i) => i !== index);

      // Update the state with the new    array
      setFormData({
        ...formData,
        details: updatedDetails,
      });
    } else {
      const token = localStorage.getItem("token");

      axios
        .delete(
          `${API.prodUrl}/Precot/api/QA/Service/RodentBox/delete?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          initialized.current = false;
          setIsDataDeleted(true);
          message.success(response.data.message);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  // const [remark, setRemark] = useState('');
  const data = formData;

  const handleRemarkChange = (e) => {
    // setRemark(e.target.value);

    setFormData({
      ...formData,
      remarks: e.target.value,
    });
  };

  const handleSave = () => {
    setStatusLoader(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/RodentBox/SaveRodentBox`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success("Rodent Box saved succesfully!");
        navigate("/Precot/QA/rodentBoxSummary");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };
  const handleSubmit = () => {
    setStatusLoader(true);
    const token = localStorage.getItem("token");

    // this is submission of pci after qa rejected need to remove qa

    let updatedFormData = { ...formData };

    if (updatedFormData.remarks === "") {
      updatedFormData.remarks = "NA";
    }

    updatedFormData.reason = "NA";

    updatedFormData.details = updatedFormData.details.map((detail) => {
      // Check for empty fields and set defaults
      if (detail.dead_rodent_found === "") {
        detail.dead_rodent_found = "NO";
      }
      if (detail.glue_paper_replaced === "") {
        detail.glue_paper_replaced = "NO";
      }
      if (detail.rodent_box_fixed === "") {
        detail.rodent_box_fixed = "NO";
      }
      if (detail.box_no_identified === "") {
        detail.box_no_identified = "NO";
      }

      return detail;
    });

    // if contains remarks when resubmission need to set as NA

    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/RodentBox/SubmitRodentBox`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success(response.data.message);
        navigate("/Precot/QA/rodentBoxSummary");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };
  const handleApprove = () => {
    setStatusLoader(true);
    const token = localStorage.getItem("token");
    const payload = {
      id: formData["list_id"],
      status: "Approve",
    };
    axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/RodentBox/approveOrReject`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success(response.data.message);
        navigate("/Precot/QA/rodentBoxSummary");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };
  const handleReject = () => {
    setStatusLoader(true);
    const token = localStorage.getItem("token");
    const payload = {
      id: formData["list_id"],
      status: "Reject",
      remarks: rejectReason,
    };
    axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/RodentBox/approveOrReject`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success(response.data.message);
        navigate("/Precot/QA/rodentBoxSummary");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const navigateBack = (response) => {
    if (role === "ROLE_PCI_TRAINED_PERSON") {
      if (response["pci_status"] === "PCI_SUBMITTED") {
      }
    } else if (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") {
      if (response.pci_status !== "PCI_SUBMITTED") {
        message.error("PCI not Submitted yet!");
        navigate("/Precot/QA/rodentBoxSummary");
      }

      if (response.qa_mr_status === "QA_MR_REJECTED") {
        message.warning("PCI not Approved Yet");
        navigate("/Precot/QA/rodentBoxSummary");
      }
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/rodentBoxSummary");
  };

  const handleOpenRejectModal = () => {
    setRejectModal(true);
  };

  const handleCancel = () => {
    setRejectModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [statusLoader, setStatusLoader] = useState(false);
  const formName = "RODENT BOX CHECK LIST";
  const formatNo = "PH-HRD01-F-013";
  const showDrawer = () => {
    setOpen(true);
  };

  const canSaveDisplayButtons = () => {
    if (role === "ROLE_PCI_TRAINED_PERSON") {
      if (formData["pci_status"] === "PCI_SUBMITTED") {
        return "none";
      }
      return "block";
    } else if (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") {
      if (formData["qa_mr_status"] === "QA_MR_APPROVED") {
        return "none";
      }

      return "block";
    }
  };

  const canDisplayButtons = () => {
    if (role === "ROLE_PCI_TRAINED_PERSON") {
      if (formData["pci_status"] === "PCI_SUBMITTED") {
        if (formData["qa_mr_status"] === "QA_MR_REJECTED") {
          return "block";
        }
        return "none";
      }
      return "block";
    } else if (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") {
      if (formData["qa_mr_status"] === "QA_MR_APPROVED") {
        return "none";
      }

      return "block";
    }
  };

  const canDisplayAddRowButton = () => {
    if (role != "ROLE_PCI_TRAINED_PERSON") {
      return "none";
    }
    if (formData["pci_status"] === "PCI_SUBMITTED") {
      if (formData["qa_mr_status"] === "QA_MR_REJECTED") {
        return "block";
      }
      return "none";
    }
    return "block";
  };

  const canDisable = () => {
    if (role === "ROLE_PCI_TRAINED_PERSON") {
      if (formData["pci_status"] === "PCI_SUBMITTED") {
        if (formData["qa_mr_status"] === "QA_MR_REJECTED") {
          return false;
        }

        return true;
      }
      return false;
    } else if (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") {
      // if(formData["qa_mr_status"]==="QA_SUBMITTED"){
      //     return true;
      // }

      return true;
    }

    return false;
  };

  const handleAddRow = () => {
    const nextSno = formData.details.length + 1; // Increment sno

    // Create a new object with default values for the new row
    const newRow = {
      sno: nextSno,
      rodent_box_no: "",
      location: "",
      rodent_box_type: "",
      glue_paper_replaced: "",
      rodent_box_fixed: "",
      box_no_identified: "",
      dead_rodent_found: "",
    };

    // Update the state by adding the new row to the details array
    setFormData({
      ...formData,
      details: [...formData.details, newRow], // Append the new row
    });
  };

  // const handleRemoveLastRow = () => {
  //     if (formData.details.length > 1) {
  //         setFormData(formData.slice(0, -1));
  //     }
  // };

  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: 1,
      label: <p>Rodent Box Check List</p>,
      children: (
        <>
          <Input
            addonBefore="Frequency"
            value="Fortnightly"
            disabled
            style={{ width: "40%", margin: "8px" }}
          />
          <Input
            addonBefore="Date"
            value={slashFormatDate(state.date)}
            disabled
            style={{ width: "40%", margin: "8px" }}
          />
          <Input
            addonBefore="Pest Control Service"
            value={
              "Pied Piper Service, done for Rats, Mouse, Bandicoots, Norway Rat etc."
            }
            disabled
            style={{ width: "48%", margin: "8px" }}
          />
          <Input
            addonBefore="Note"
            value={
              "Using for GTS ( Glue trap station): Trubble Gum and RBS (Rodent bit statin): Roban Cake"
            }
            disabled
            style={{ width: "48%", margin: "8px" }}
          />

          <div>
            <button
              style={{
                backgroundColor: "#1a8cff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleBulkUpdate("YES")}
            >
              Bulk Yes
            </button>
            <button
              style={{
                backgroundColor: "#1a8cff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleBulkUpdate("NO")}
            >
              Bulk No
            </button>
          </div>
          <table style={{ margin: "10px", width: "98%" }}>
            <tbody>
              {/* <tr>
                                <td style={{ padding: '8px' }} colSpan={5}>
                                    Frequency: {"Fortnightly"}
                                </td>
                                <td style={{ padding: '8px' }} colSpan={3}>
                                    Date: {formatDate(state.date)}
                                </td>

                            </tr> */}
              {/* <tr>
                                <td style={{ padding: '8px' }} colSpan={8}>
                                    Pest Control Service : Pied Piper Service, done for Rats, Mouse, Bandicoots, Norway Rat etc.
                                </td>
                            </tr>

                            <tr>
                                <td style={{ padding: '8px' }} colSpan={8}>
                                    Note: Using for GTS ( Glue trap station): Trubble Gum and RBS (Rodent bit statin): Roban Cake
                                </td>
                            </tr> */}
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
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

              {currentRows.map((data, index) => (
                <tr key={index}>
                  <td
                    style={{ height: "20px", textAlign: "center", width: "5%" }}
                  >
                    {String(
                      index + 1 + (currentPage - 1) * rowsPerPage
                    ).padStart(2, "0")}
                  </td>
                  <td
                    style={{
                      height: "20px",
                      textAlign: "center",
                      width: "10%",
                    }}
                  >
                    {(currentPage - 1) * rowsPerPage + index > 84 ? (
                      <Input
                        value={data.rodent_box_no}
                        onChange={(e) =>
                          handleChange(
                            e,
                            (currentPage - 1) * rowsPerPage + index,
                            "rodent_box_no"
                          )
                        }
                        disabled={canDisable()}
                        style={{ textAlign: "center" }}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      data.rodent_box_no
                    )}
                  </td>
                  <td
                    style={{
                      height: "20px",
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    {/* {data.location} */}
                    {(currentPage - 1) * rowsPerPage + index > 84 ? (
                      <Input
                        value={data.location}
                        onChange={(e) =>
                          handleChange(
                            e,
                            (currentPage - 1) * rowsPerPage + index,
                            "location"
                          )
                        }
                        disabled={canDisable()}
                        style={{ textAlign: "center" }}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      data.location
                    )}
                  </td>
                  <td
                    style={{
                      height: "20px",
                      textAlign: "center",
                      width: "10%",
                    }}
                  >
                    {/* {data.rodent_box_type} */}
                    {(currentPage - 1) * rowsPerPage + index > 84 ? (
                      <Input
                        value={data.rodent_box_type}
                        onChange={(e) =>
                          handleChange(
                            e,
                            (currentPage - 1) * rowsPerPage + index,
                            "rodent_box_type"
                          )
                        }
                        disabled={canDisable()}
                        style={{ textAlign: "center" }}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      data.rodent_box_type
                    )}
                  </td>
                  <td
                    style={{
                      height: "20px",
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    {/* {data.glue_paper_replaced} */}
                    {/* <Input value={data.glue_paper_replaced} onChange={(e) => handleChange(e, index, 'glue_paper_replaced')} /> */}
                    <RadioCom
                      value={data.glue_paper_replaced || ""}
                      onChange={(e) =>
                        handleChange(
                          e,
                          (currentPage - 1) * rowsPerPage + index,
                          "glue_paper_replaced"
                        )
                      }
                      disabled={canDisable()}
                    />
                  </td>
                  <td
                    style={{
                      height: "20px",
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    {/* {data.rodent_box_fixed} */}
                    {/* <Input value={data.rodent_box_fixed} onChange={(e) => handleChange(e, index, 'rodent_box_fixed')} /> */}
                    <RadioCom
                      value={data.rodent_box_fixed}
                      onChange={(e) =>
                        handleChange(
                          e,
                          (currentPage - 1) * rowsPerPage + index,
                          "rodent_box_fixed"
                        )
                      }
                      disabled={canDisable()}
                    />
                  </td>
                  <td
                    style={{
                      height: "20px",
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    {/* {data.box_no_identified} */}
                    {/* <Input value={data.box_no_identified} onChange={(e) => handleChange(e, index, 'box_no_identified')} /> */}
                    <RadioCom
                      value={data.box_no_identified}
                      onChange={(e) =>
                        handleChange(
                          e,
                          (currentPage - 1) * rowsPerPage + index,
                          "box_no_identified"
                        )
                      }
                      disabled={canDisable()}
                    />
                  </td>
                  <td
                    style={{
                      height: "20px",
                      textAlign: "center",
                      width: "15%",
                    }}
                  >
                    {/* {data.dead_rodent_found */}
                    <Input
                      value={data.dead_rodent_found}
                      onChange={(e) =>
                        handleChange(
                          e,
                          (currentPage - 1) * rowsPerPage + index,
                          "dead_rodent_found"
                        )
                      }
                      disabled={canDisable()}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  {(currentPage - 1) * rowsPerPage + index > 84 && (
                    <DeleteOutlined
                      style={{ fontSize: "24px", color: "#ff4d4f" }}
                      onClick={() =>
                        handleDelete(
                          (currentPage - 1) * rowsPerPage + index,
                          data.line_id
                        )
                      }
                    />
                  )}
                </tr>
              ))}
            </tbody>
            {/* <tfoot> */}

            {/* </tfoot> */}
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <Button
                onClick={handleAddRow}
                style={{ margin: "5px", display: canDisplayAddRowButton() }}
              >
                Add Row
              </Button>

              {/* <Button onClick={handleRemoveLastRow} style={{ margin: '5px', display: canDisplayAddRowButton() }}>Remove Row</Button> */}
            </div>

            {/* <div style={{ textAlign: 'center', margin: '10px' }}>
                            <Button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>

                            <span style={{ margin: '0 10px' }}>Page {currentPage}</span>

                            <Button
                                onClick={() => setCurrentPage(prev => (indexOfLastRow < formData.details.length ? prev + 1 : prev))}
                                disabled={indexOfLastRow >= formData.details.length}
                            >
                                Next
                            </Button>
                        </div> */}
            <div style={{ textAlign: "center", margin: "10px" }}>
              {/* Your table content goes here */}

              <Pagination
                current={currentPage}
                pageSize={rowsPerPage}
                total={formData.details.length}
                onChange={handlePageChange}
                showSizeChanger={false}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      key: 2,
      label: <p>Remarks and Signatures</p>,
      children: (
        <table>
          <tr>
            <td style={{ height: "100px", padding: "8px" }} colSpan={2}>
              Remark(s), if any
              <br></br>
              <textarea
                rows={5}
                cols={150}
                value={formData.remarks}
                onChange={handleRemarkChange}
                disabled={canDisable()}
                style={{ padding: "5px" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ padding: "16px", textAlign: "center" }}>
              PCI PERSON
              <br></br>
              <b>
                {formData.pci_sign}
                <br></br>
                {printDateFormat(formData.pci_submit_on)}
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
            <td style={{ padding: "16px", textAlign: "center" }}>
              QA MANAGER/DESIGNEE
              <br></br>
              {formData.qa_mr_status != "WAITING_FOR_APPROVAL" && (
                <>
                  <b>
                    {formData.qa_mr_sign}
                    <br></br>
                    {printDateFormat(formData.qa_mr_submit_on)}
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
            <td colSpan={2} style={{ padding: "8px" }}>
              Note : All Rodent Box installed inside the plant area are of GTS
              type, considering product safety, while outside plant are of RBS
              type. Nomenclature - GTS stands for Glue Trapping Station and RBS
              stands for Rodent Bait Station.
            </td>
          </tr>
        </table>
      ),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["pci_sign", "qa_mr_sign"];
    signatureKeys.forEach((key) => {
      if (formData) {
        const username = formData[key];

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
  }, [formData, formData && formData.pci_sign]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = () => {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        // const month = "October";
        // const year = "2024";
        const date = state.date;

        axios
          .get(
            `${API.prodUrl}/Precot/api/QA/Service/RodentBox/getByparam?month=${month}&year=${year}&date=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
              },
            }
          )
          .then((response) => {
            if (response.data.message !== "No data") {
              setFormData(response.data);
            }

            navigateBack(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error); // Handle any errors
          })
          .finally(() => {
            // This useEffected is rendered based on isDataDeleted while delete API is called isDataDeleted is set to true leads to true.
            // that cause render after deleted so here set isDataDeleted to false
            setIsDataDeleted(false);
          });
      };

      fetchData();
    }
  }, [isDataDeleted]);

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
              role == "ROLE_PCI_TRAINED_PERSON" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={
              role == "ROLE_PCI_TRAINED_PERSON" ? handleSave : handleApprove
            }
            loading={statusLoader}
          >
            {role == "ROLE_PCI_TRAINED_PERSON" ? "Save" : "Approve"}
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
              role == "ROLE_PCI_TRAINED_PERSON" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={
              role == "ROLE_PCI_TRAINED_PERSON"
                ? handleSubmit
                : handleOpenRejectModal
            }
            loading={statusLoader}
          >
            {role == "ROLE_PCI_TRAINED_PERSON" ? " Submit" : "   Reject"}
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

      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </>
  );
};

export default RodentBoxFull;
