/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5"; // Importing the save icon
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { Td, Th } from "../Components/TableUtils";

const QA_Inward029 = () => {
  const { Option } = Select; 
  const [LotQty, setLotQty] = useState(""); 
  const [Remarks, setRemarks] = useState(""); 
  const [AQl_Sample, setAQl_Sample] = useState("");
  const [PDS, setPDS] = useState("");
  const [Item_code, setItem_code] = useState("");
  const [IIR_No, setIIR_No] = useState("");
  const [lotStatus, setLotStatus] = useState("");
  const [GRNO, SetGRNO] = useState(""); 
  const [selectedItem, setSelectedItem] = useState("");
  const [fetchedId, setFetchedId] = useState(null);
  const [Coreference, setCoreference] = useState(""); 

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleLotStatusChange = (value) => {
    setLotStatus(value);
  };
  

  const [Specification1, SetSpecification1] = useState("");
  const [Specification2, SetSpecification2] = useState("");
  const [Specification3, SetSpecification3] = useState("");
  const [Specification4, SetSpecification4] = useState("");
  const [Specification5, SetSpecification5] = useState("");
  const [Specification6, SetSpecification6] = useState("");
  const [Specification7, SetSpecification7] = useState(""); 

  const [observation1, setobsevation1] = useState("");
  const [observation2, setobsevation2] = useState("");
  const [observation3, setobsevation3] = useState("");
  const [observation4, setobsevation4] = useState("");
  const [observation5, setobsevation5] = useState("");
  const [observation6, setobsevation6] = useState("");
  const [observation7, setobsevation7] = useState(""); 

  const [Number1, setNumber1] = useState("");
  const [Number2, setNumber2] = useState("");
  const [Number3, setNumber3] = useState("");
  const [Number4, setNumber4] = useState("");
  const [Number5, setNumber5] = useState("");
  const [Number6, setNumber6] = useState("");
  const [Number7, setNumber7] = useState("");
  const [Number8, setNumber8] = useState("");
  const [Number9, setNumber9] = useState("");
  const [Number10, setNumber10] = useState("");
  const [Number11, setNumber11] = useState("");
  const [Number12, setNumber12] = useState("");
  const [Number13, setNumber13] = useState("");
  const [Number14, setNumber14] = useState("");
  const [Number15, setNumber15] = useState("");
  const [Accepted, setAccepted] = useState("");
  const [Rejected, setRejected] = useState("");

  const [lineId1, setlineId1] = useState("");
  const [lineId2, setlineId2] = useState("");
  const [lineId3, setlineId3] = useState("");
  const [lineId4, setlineId4] = useState("");
  const [lineId5, setlineId5] = useState("");
  const [lineId6, setlineId6] = useState("");
  const [lineId7, setlineId7] = useState("");
  const [lineId8, setlineId8] = useState("");
  const [lineId9, setlineId9] = useState("");
  const [lineId10, setlineId10] = useState("");
  const [lineId11, setlineId11] = useState("");
  const [lineId12, setlineId12] = useState("");
  const [lineId13, setlineId13] = useState("");
  const [lineId14, setlineId14] = useState("");
  const [lineId15, setlineId15] = useState("");
  const [lineId16, setlineId16] = useState("");
  const [lineId17, setlineId17] = useState("");
  const [lineId18, setlineId18] = useState("");
  const [lineId19, setlineId19] = useState("");
  const [lineId20, setlineId20] = useState("");
  const [lineId21, setlineId21] = useState("");
  const [lineId22, setlineId22] = useState("");
  const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [total3, setTotal3] = useState(0);
  const [observ1, setobserv1] = useState("");
  const [Maxdefect1, setMaxdefect1] = useState("");
  const [Maxdefect2, setMaxdefect2] = useState("");
  const [Maxdefect3, setMaxdefect3] = useState("");
  const [PoNo, setPoNo] = useState("");

   

  const handleBlur2_range6to9 = () => {
    if (observation6 < 6 || observation6 > 10) {
      message.error("Please enter a number between 6 and 10"); 
    }
  };

  useEffect(() => {
    const sum1 = Number(Number1) + Number(Number2);
    setTotal1(sum1);

    const sum2 =
      Number(Number3) +
      Number(Number4) +
      Number(Number5) +
      Number(Number6) +
      Number(Number7) +
      Number(Number8);
    setTotal2(sum2);

    const sum3 =
      Number(Number9) +
      Number(Number10) +
      Number(Number11) +
      Number(Number12) +
      Number(Number13) +
      Number(Number14) +
      Number(Number15);
    setTotal3(sum3);
    
  });
 
  const location = useLocation();
  const { state } = location;
  const { newDate, Suppliers, invoice, productdesc } = state || {}; 
  const [dates, setDates] = useState("");
  const [BatchNo, setBatchNo] = useState("");
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(""); 
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role"); 
  const [loading, setLoading] = useState(false); 
  const [saveLoading, setSaveLoading] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const initial = useRef(false);
  const [open, setOpen] = useState(false);   
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qa_inspector_sign;
    if (username) {
      

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
          
        });
    }
  }, [selectedRow, API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qa_manager_sign;
    if (username) {
      

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
          
        });
    }
  }, [selectedRow, API.prodUrl]);

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_QA") {
      if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qa_manager_status == "QA_MR_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.qa_inspector_status == "QA_INSPECTOR_SUBMITTED" &&
          selectedRow?.qa_manager_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.qa_manager_status == "QA_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER") {
      if (
        selectedRow?.qa_manager_status == "QA_MR_APPROVED" ||
        selectedRow?.qa_manager_status == "QA_MR_REJECTED" 
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.qa_manager_status == "QA_MR_APPROVED" ||
        selectedRow?.qa_manager_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_QA") {
      if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qa_manager_status == "QA_MR_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_SUBMITTED" &&
        (selectedRow?.qa_manager_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_manager_status == "QA_MR_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER") {
      if (
        selectedRow?.qa_manager_status == "QA_MR_APPROVED" ||
        selectedRow?.qa_manager_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.qa_manager_status == "QA_MR_APPROVED" ||
        selectedRow?.qa_manager_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const condition =
    (roleauth === "ROLE_QA" &&
      selectedRow?.qa_inspector_status === "QA_INSPECTOR_SUBMITTED" &&
      selectedRow?.qa_manager_status === "WAITING_FOR_APPROVAL") ||
    selectedRow?.qa_manager_status === "QA_MR_APPROVED" ||
    roleauth === "QA_MANAGER" ||
    (roleauth === "ROLE_DESIGNEE" &&
      (selectedRow?.qa_manager_status === "WAITING_FOR_APPROVAL" ||
        selectedRow?.qa_manager_status === "QA_MR_APPROVED" ||
        selectedRow?.qa_manager_status === "QA_MR_REJECTED"));

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/qa/InwardInspection/approveOrReject`,
        {
          formatNo: "PH-QAD01-F-029",
          id: fetchedId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        
        message.success(res.data.message);
        navigate("/Precot/QA/Inward029/Summary");
      })
      .catch((err) => {
        setLoading(false);
        
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/qa/InwardInspection/approveOrReject`,
        {
          formatNo: "PH-QAD01-F-029",
          id: fetchedId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false); 
        message.success(res.data.message);
        navigate("/Precot/QA/Inward029/Summary");
      })
      .catch((err) => {
        setLoading(false);
        
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;

      checkgetExists();
    }
  }, []);

  const checkgetExists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
         API.prodUrl
        }/Precot/api/qa/getdetailsbyParamInward?formatNo=${"PH-QAD01-F-029"}&gr_date=${newDate}&supplierName=${Suppliers}&invoice_no=${invoice}&item_description=${productdesc}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        ((roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") &&
          response.data.body.qa_inspector_status !==
            "QA_INSPECTOR_SUBMITTED") ||
        ((roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") &&
          response.data.body.qa_manager_status === "QA_MR_REJECTED")
      ) {
        message.error("QA Inspector Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QA/Inward029/Summary");
        }, 1500);
      }
      setSelectedRow(response.data.body);
      setFetchedId(response.data.body.id);
      SetGRNO(response.data.body.gr_no);
      if (response.data.body.message === "No data") {
        await IIrgeneration();
      } else {
        setIIR_No(response.data.body.iir_no);
      }
      setLotStatus(response.data.body.lot_status);
      setSelectedItem(response.data.body.item_description);
      setDates(response.data.body.date);
      setLotQty(response.data.body.lot_qty);
      setAQl_Sample(response.data.body.aql_sample_size);
      setPoNo(response.data.body.po_no);
      setBatchNo(response.data.body.batch_no);
      setItem_code(response.data.body.item_code);
      setPDS(response.data.body.pds_no);
      setLotStatus(response.data.body.lot_status);
      setlineId1(response.data.body.line1[0].line_id);
      SetSpecification1(response.data.body.line1[0].specification);
      setobsevation1(response.data.body.line1[0].observation);
      setlineId2(response.data.body.line1[1].line_id);
      SetSpecification2(response.data.body.line1[1].specification);
      setobsevation2(response.data.body.line1[1].observation);
      setlineId3(response.data.body.line1[2].line_id);
      SetSpecification3(response.data.body.line1[2].specification);
      setobsevation3(response.data.body.line1[2].observation);
      setlineId4(response.data.body.line1[3].line_id);
      SetSpecification4(response.data.body.line1[3].specification);
      setobsevation4(response.data.body.line1[3].observation);
      setlineId5(response.data.body.line1[4].line_id);
      SetSpecification5(response.data.body.line1[4].specification);
      setobsevation5(response.data.body.line1[4].observation);
      setlineId6(response.data.body.line1[5].line_id);
      SetSpecification6(response.data.body.line1[5].specification);
      setobsevation6(response.data.body.line1[5].observation);
      setlineId7(response.data.body.line1[6].line_id);
      SetSpecification7(response.data.body.line1[6].specification);
      setobsevation7(response.data.body.line1[6].observation);
      setNumber1(response.data.body.line2[0].no_of_defects);
      setlineId8(response.data.body.line2[0].line_id);
      setMaxdefect1(response.data.body.line2[0].maximum_no_of_defects);
      setTotal1(response.data.body.line2[0].total_no_of_defects);
      setNumber2(response.data.body.line2[1].no_of_defects);
      setlineId9(response.data.body.line2[1].line_id);
      //MAjor
      setlineId10(response.data.body.line2[2].line_id);
      setNumber3(response.data.body.line2[2].no_of_defects);
      setMaxdefect2(response.data.body.line2[2].maximum_no_of_defects);
      setTotal2(response.data.body.line2[2].total_no_of_defects);
      setlineId11(response.data.body.line2[3].line_id);
      setNumber4(response.data.body.line2[3].no_of_defects);
      setlineId12(response.data.body.line2[4].line_id);
      setNumber5(response.data.body.line2[4].no_of_defects);
      setlineId13(response.data.body.line2[5].line_id);
      setNumber6(response.data.body.line2[5].no_of_defects);
      setlineId14(response.data.body.line2[6].line_id);
      setNumber7(response.data.body.line2[6].no_of_defects);
      setlineId15(response.data.body.line2[7].line_id);
      setNumber8(response.data.body.line2[7].no_of_defects);
      //Minor
      setlineId16(response.data.body.line2[8].line_id);
      setNumber9(response.data.body.line2[8].no_of_defects);
      setTotal3(response.data.body.line2[8].total_no_of_defects);
      setMaxdefect3(response.data.body.line2[8].maximum_no_of_defects);
      setlineId17(response.data.body.line2[9].line_id);
      setNumber10(response.data.body.line2[9].no_of_defects);
      setlineId18(response.data.body.line2[10].line_id);
      setNumber11(response.data.body.line2[10].no_of_defects);
      setlineId19(response.data.body.line2[11].line_id);
      setNumber12(response.data.body.line2[11].no_of_defects);
      setlineId20(response.data.body.line2[12].line_id);
      setNumber13(response.data.body.line2[12].no_of_defects);
      setlineId21(response.data.body.line2[13].line_id);
      setNumber14(response.data.body.line2[13].no_of_defects);
      setlineId22(response.data.body.line2[14].line_id);
      setNumber15(response.data.body.line2[14].no_of_defects);
      setRejected(response.data.body.rejected);
      setAccepted(response.data.body.accepted);
      setCoreference(response.data.body.coa_reference_no);
      setRemarks(response.data.body.remarks);
 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const IIrgeneration = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
         API.prodUrl
        }/Precot/api/qa/number/generation?formNumber=${"PH-QAD01-F-029"}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ); 
      setIIR_No(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const validateForm = () => { 
    if (!dates || dates.length === 0) {
      message.error("Please select the inspection date");
      return false;
    }

    if (!selectedItem || selectedItem.length === 0) {
      message.error("Please select Item Description");
      return false;
    }

    if (!lotStatus || lotStatus.length === 0) {
      message.error("Please select Lot Status");
      return false;
    }

    return true;
  };

  const saveData = () => {
    setSaveLoading(true); 
    const payload = {
      unit: "Unit H",
      formatNo: "PH-QAD01-F-029",
      formatName: "INWARD INSPECTION REPORT(for Carton)",
      sopNumber: "PH-QAD01-D-30",
      revisionNo: "01",
      iir_no: IIR_No,
      date: dates,
      batch_no: BatchNo,
      lot_qty: LotQty,
      item_description: selectedItem,
      aql_sample_size:
        AQl_Sample === "" || AQl_Sample === null || AQl_Sample === undefined
          ? "NA"
          : AQl_Sample,
      supplier_name: Suppliers,
      po_no: PoNo,
      item_code: Item_code,
      invoice_no: invoice,
      gr_date: newDate,
      gr_no: GRNO,
      pds_no: PDS === "" || PDS === null || PDS === undefined ? "NA" : PDS,
      coa_reference_no: Coreference === "" ? "NA" : Coreference,
      accepted: Accepted === "" ? "0" : Accepted,
      rejected: Rejected === "" ? "0" : Rejected,
      lot_status: lotStatus,
      remarks: Remarks === "" ? "NA" : Remarks,
      no_of_rolls: "",
      no_of_sample_rolls: "",
      sample_quantity: "",
      ...(fetchedId && { id: fetchedId }),

      line1: [
        {
          parameter: "Box Dimension - L x W x H (mm)",
          specification: Specification1 === "" ? "NA" : Specification1,
          observation: observation1 === "" ? "NA" : observation1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId1 && { line_id: lineId1 }),
        },
        {
          parameter: "Net Weight (gm)",
          specification: Specification2 === "" ? "NA" : Specification2,
          observation: observation2 === "" ? "NA" : observation2,
          ...(lineId2 && { line_id: lineId2 }),
        },
        {
          parameter: "Bar code Number ",
          specification: Specification3 === "" ? "NA" : Specification3,
          observation: observation3 === "" ? "NA" : observation3,
          ...(lineId3 && { line_id: lineId3 }),
        },
        {
          parameter: "Box Flute",
          specification: Specification4 === "" ? "NA" : Specification4,
          observation: observation4 === "" ? "NA" : observation4,
          ...(lineId4 && { line_id: lineId4 }),
        },
        {
          parameter: "No of Layers",
          specification: Specification5 === "" ? "NA" : Specification5,
          observation: observation5 === "" ? "NA" : observation5,
          ...(lineId5 && { line_id: lineId5 }),
        },
        {
          parameter: "Moisture %",
          specification: Specification6 === "" ? "0" : Specification6,
          observation: observation6 === "" ? "0" : observation6,
          ...(lineId6 && { line_id: lineId6 }),
        },
        {
          parameter: "Artwork & Printed Text Matter",
          specification: Specification7 === "" ? "NA" : Specification7,
          observation: observation7 === "" ? "NA" : observation7,
          ...(lineId7 && { line_id: lineId7 }),
        },
      ],

      line2: [
        {
          category: "Critical(AQL - Nil)",
          defects: "Old / Obsolete/Incorrect Artwork",
          no_of_defects: Number1 === "" ? 0 : Number1,
          total_no_of_defects: total1,
          maximum_no_of_defects: Maxdefect1 === "" ? 0 : Maxdefect1,
          defect_observation: "",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId8 && { line_id: lineId8 }),
        },
        {
          category: "Critical(AQL - Nil)",
          defects: "Bar code Wrong / Not Scanning",
          no_of_defects: Number2 === "" ? 0 : Number2,
          total_no_of_defects: total1,
          maximum_no_of_defects: Maxdefect1 === "" ? 0 : Maxdefect1,
          defect_observation: "",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId9 && { line_id: lineId9 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Wrong/Incorrect Dimension",
          no_of_defects: Number3 === "" ? 0 : Number3,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId10 && { line_id: lineId10 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Improper Printing / Text Font",
          no_of_defects: Number4 === "" ? 0 : Number4,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId11 && { line_id: lineId11 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Major colour shade Deviation ",
          no_of_defects: Number5 === "" ? 0 : Number5,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1,
          ...(lineId12 && { line_id: lineId12 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "High Moisture ",
          no_of_defects: Number6 === "" ? 0 : Number6,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1,
          ...(lineId13 && { line_id: lineId13 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Bad Odour / Smell",
          no_of_defects: Number7 === "" ? 0 : Number7,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1,
          ...(lineId14 && { line_id: lineId14 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Improper Perforation",
          no_of_defects: Number8 === "" ? 0 : Number8,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1,
          ...(lineId15 && { line_id: lineId15 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Unwanted Colour Spot",
          no_of_defects: Number9 === "" ? 0 : Number9,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1,
          ...(lineId16 && { line_id: lineId16 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Paper Cutting Not Proper",
          no_of_defects: Number10 === "" ? 0 : Number10,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1,
          ...(lineId17 && { line_id: lineId17 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Different Printing font(Eligible )",
          no_of_defects: Number11 === "" ? 0 : Number11,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1,
          ...(lineId18 && { line_id: lineId18 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Open/Improper joints of cartons",
          no_of_defects: Number12 === "" ? 0 : Number12,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1,
          ...(lineId19 && { line_id: lineId19 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Fold mark / Wrinkles",
          no_of_defects: Number13 === "" ? 0 : Number13,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1,
          ...(lineId20 && { line_id: lineId20 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Shifting of Artwork",
          no_of_defects: Number14 === "" ? 0 : Number14,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1,
          ...(lineId21 && { line_id: lineId21 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Less Weight",
          no_of_defects: Number15 === "" ? 0 : Number15,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1,
          ...(lineId22 && { line_id: lineId22 }),
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${ API.prodUrl}/Precot/api/qa/saveInwardInspectionReport`, payload, {
        headers,
      })
      .then((res) => {
        
        message.success("Form Saved Successfully");
        navigate("/Precot/QA/Inward029/Summary");
      })
      .catch((err) => {
        
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const submitData = () => {
    setSubmitLoading(true);
    

    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    }

    const payload = {
      unit: "Unit H",
      formatNo: "PH-QAD01-F-029",
      formatName: "INWARD INSPECTION REPORT(for Carton)",
      sopNumber: "PH-QAD01-D-30",
      revisionNo: "01",
      iir_no: IIR_No,
      date: dates,
      batch_no: BatchNo,
      lot_qty: LotQty,
      item_description: selectedItem,
      aql_sample_size: AQl_Sample === "" ? "NA" : AQl_Sample,
      supplier_name: Suppliers,
      po_no: PoNo,
      item_code: Item_code,
      invoice_no: invoice,
      gr_date: newDate,
      gr_no: GRNO,
      pds_no: PDS === "" ? "NA" : PDS,
      coa_reference_no: Coreference === "" ? "NA" : Coreference,
      accepted: Accepted === "" ? "0" : Accepted,
      rejected: Rejected === "" ? "0" : Rejected,
      lot_status: lotStatus,
      remarks: Remarks === "" ? "NA" : Remarks,
      no_of_rolls: "NA",
      no_of_sample_rolls: "NA",
      sample_quantity: "NA",
      ...(fetchedId && { id: fetchedId }),

      line1: [
        {
          parameter: "Box Dimension - L x W x H (mm)",
          specification: Specification1 === "" ? "NA" : Specification1,
          observation: observation1 === "" ? "NA" : observation1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId1 && { line_id: lineId1 }),
        },
        {
          parameter: "Net Weight (gm)",
          specification: Specification2 === "" ? "NA" : Specification2,
          observation: observation2 === "" ? "NA" : observation2,
          ...(lineId2 && { line_id: lineId2 }),
        },
        {
          parameter: "Bar code Number ",
          specification: Specification3 === "" ? "NA" : Specification3,
          observation: observation3 === "" ? "NA" : observation3,
          ...(lineId3 && { line_id: lineId3 }),
        },
        {
          parameter: "Box Flute",
          specification: Specification4 === "" ? "NA" : Specification4,
          observation: observation4 === "" ? "NA" : observation4,
          ...(lineId4 && { line_id: lineId4 }),
        },
        {
          parameter: "No of Layers",
          specification: Specification5 === "" ? "NA" : Specification5,
          observation: observation5 === "" ? "NA" : observation5,
          ...(lineId5 && { line_id: lineId5 }),
        },

        {
          parameter: "Moisture %",
          specification: Specification6 === "" ? "NA" : Specification6,
          observation: observation6 === "" ? "NA" : observation6,
          ...(lineId6 && { line_id: lineId6 }),
        },
        {
          parameter: "Artwork & Printed Text Matter",
          specification: Specification7 === "" ? "NA" : Specification7,
          observation: observation7 === "" ? "NA" : observation7,
          ...(lineId7 && { line_id: lineId7 }),
        },
      ],

      line2: [
        {
          category: "Critical(AQL - Nil)",
          defects: "Old / Obsolete/Incorrect Artwork",
          no_of_defects: Number1 === "" ? 0 : Number1,
          total_no_of_defects: total1,
          maximum_no_of_defects: Maxdefect1 === "" ? 0 : Maxdefect1,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId8 && { line_id: lineId8 }),
        },
        {
          category: "Critical(AQL - Nil)",
          defects: "Bar code Wrong / Not Scanning",
          no_of_defects: Number2 === "" ? 0 : Number2,
          total_no_of_defects: total1,
          maximum_no_of_defects: Maxdefect1 === "" ? 0 : Maxdefect1,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId9 && { line_id: lineId9 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Wrong/Incorrect Dimension",
          no_of_defects: Number3 === "" ? 0 : Number3,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId10 && { line_id: lineId10 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Improper Printing / Text Font",
          no_of_defects: Number4 === "" ? 0 : Number4,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId11 && { line_id: lineId11 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Major colour shade Deviation ",
          no_of_defects: Number5 === "" ? 0 : Number5,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId12 && { line_id: lineId12 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "High Moisture ",
          no_of_defects: Number6 === "" ? 0 : Number6,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId13 && { line_id: lineId13 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Bad Odour / Smell",
          no_of_defects: Number7 === "" ? 0 : Number7,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId14 && { line_id: lineId14 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Improper Perforation",
          no_of_defects: Number8 === "" ? 0 : Number8,
          total_no_of_defects: total2,
          maximum_no_of_defects: Maxdefect2 === "" ? 0 : Maxdefect2,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId15 && { line_id: lineId15 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Unwanted Colour Spot",
          no_of_defects: Number9 === "" ? 0 : Number9,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId16 && { line_id: lineId16 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Paper Cutting Not Proper",
          no_of_defects: Number10 === "" ? 0 : Number10,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId17 && { line_id: lineId17 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Different Printing font(Eligible )",
          no_of_defects: Number11 === "" ? 0 : Number11,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId18 && { line_id: lineId18 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Open/Improper joints of cartons",
          no_of_defects: Number12 === "" ? 0 : Number12,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId19 && { line_id: lineId19 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Fold mark / Wrinkles",
          no_of_defects: Number13 === "" ? 0 : Number13,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId20 && { line_id: lineId20 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Shifting of Artwork",
          no_of_defects: Number14 === "" ? 0 : Number14,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId21 && { line_id: lineId21 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Less Weight",
          no_of_defects: Number15 === "" ? 0 : Number15,
          total_no_of_defects: total3,
          maximum_no_of_defects: Maxdefect3 === "" ? 0 : Maxdefect3,
          defect_observation: observ1 === "" ? 0 : observ1,
          ...(lineId22 && { line_id: lineId22 }),
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${ API.prodUrl}/Precot/api/qa/submitInwardInspectionReport`, payload, {
        headers,
      })
      .then((res) => {
        
        message.success("Form Submitted Successfully");
        navigate("/Precot/QA/Inward029/Summary");
      })
      .catch((err) => {
        
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  }; 
  const token = localStorage.getItem("token");
 
  const handleRejectModal = () => {
    setShowModal(true);

    
  };

  const formatDate = (inputDate) => {
    if (!inputDate) return "";

    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleItem = async (selectedItem) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = formatDate(newDate);

      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/qa/inwardPde/details?grDate=${formattedDate}&supplier=${Suppliers}&invoice=${invoice}&materialDescription=${selectedItem}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ); 
      if (response.data && response.data.materialDetails) {
        setBatchNo(response.data.materialDetails.batchNo);
        setLotQty(response.data.materialDetails.lotQuantity);
        setItem_code(response.data.materialDetails.materialCode);
        setPoNo(response.data.materialDetails.purchaseOrderNo);
        SetGRNO(response.data.materialDetails.grNo);
        
      } else {
        console.error("materialDetails not found in the response");
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/Inward029/Summary", {
      state: {},
    });
  };

  let formatted_qa_inspectorDate;
  if (selectedRow?.qa_inspector_submitted_on) {
    formatted_qa_inspectorDate = moment(
      selectedRow?.qa_inspector_submitted_on
    ).format("DD/MM/YYYY HH:mm");
  } else {
    formatted_qa_inspectorDate = "";
  }
  let formatted_qa_managerDate;
  if (selectedRow?.qa_manager_submitted_on) {
    formatted_qa_managerDate = moment(
      selectedRow?.qa_manager_submitted_on
    ).format("DD/MM/YYYY HH:mm");
  } else {
    formatted_qa_managerDate = "";
  }

  const items = [
    {
      key: "1",
      label: <p>INWARD INSPECTION REPORT</p>,
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "90%",
              marginLeft: "50px",
              marginRight: "0px",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr>
                <Th colSpan="1">Sr. No.</Th>
                <Th colSpan="5">Parameter</Th>
                <Th colSpan="5">Specification</Th>
                <Th colSpan="4">Observation</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td colSpan="1">1</Td>
                <Td colSpan="5">Box Dimension - L x W x H (mm)</Td>
                <Td colSpan="5">
                  <input
                    type="text"
                    value={Specification1}
                    className="inp-new"
                    onChange={(e) => SetSpecification1(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    value={observation1}
                    className="inp-new"
                    onChange={(e) => setobsevation1(e.target.value)}
                    disabled={condition}
                    style={{ width: "100%" }}
                   
                  />
                </Td>
              </tr>
              <tr>
                <Td colSpan="1">2</Td>
                <Td colSpan="5">Net Weight (gm)</Td>
                <Td colSpan="5">
                  <input
                    type="text"
                    value={Specification2}
                    className="inp-new"
                    onChange={(e) => SetSpecification2(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
                <Td colSpan="4">
                  {" "}
                  <input
                    type="text"
                    value={observation2}
                    className="inp-new"
                    onChange={(e) => setobsevation2(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
              </tr>
              <tr>
                <Td colSpan="1">3</Td>
                <Td colSpan="5">Bar code Number</Td>
                <Td colSpan="5">
                  <input
                    type="text"
                    className="inp-new"
                    value={Specification3}
                    onChange={(e) => SetSpecification3(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={observation3}
                    onChange={(e) => setobsevation3(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
              </tr>
              <tr>
                <Td colSpan="1">4</Td>
                <Td colSpan="5">Box Flute</Td>
                <Td colSpan="5">
                  {" "}
                  <input
                    type="text"
                    className="inp-new"
                    value={Specification4}
                    disabled={condition}
                    onChange={(e) => SetSpecification4(e.target.value)}
                    style={{ width: "100%" }}
                   
                  />
                </Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={observation4}
                    disabled={condition}
                    onChange={(e) => setobsevation4(e.target.value)}
                    style={{ width: "100%" }}
                   
                  />
                </Td>
              </tr>
              <tr>
                <Td colSpan="1">5</Td>
                <Td colSpan="5">No of Layers</Td>
                <Td colSpan="5">
                  <input
                    type="text"
                    className="inp-new"
                    value={Specification5}
                    onChange={(e) => SetSpecification5(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={observation5}
                    disabled={condition}
                    onChange={(e) => setobsevation5(e.target.value)}
                    style={{ width: "100%" }}
                   
                  />
                </Td>
              </tr>

              <tr>
                <Td colSpan="1">6</Td>
                <Td colSpan="5">Moisture %</Td>
                <Td colSpan="5"> 6 to 10</Td>
                <Td colSpan="4">
                  {" "}
                  <input
                    type="number"
                    className="inp-new"
                    value={observation6}
                    onChange={(e) => setobsevation6(e.target.value)}
                    onBlur={handleBlur2_range6to9}
                    style={{ width: "100%" }}
                    disabled={condition}
                    min="6"
                    max="10"
                  />
                </Td>
              </tr>

              <tr>
                <Td colSpan="1">7</Td>
                <Td colSpan="5">Artwork & Printed Text Matter</Td>
                <Td colSpan="5">
                  <input
                    type="text"
                    className="inp-new"
                    value={Specification7}
                    onChange={(e) => SetSpecification7(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={observation7}
                    onChange={(e) => setobsevation7(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                   
                  />
                </Td>
              </tr>
            </tbody>
          </table>
          <br />

          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "90%",
              marginLeft: "50px",
              marginRight: "0px",
              tableLayout: "fixed",
            }}
          >
            <tr>
              <Th colSpan="1">Sr. No.</Th>
              <Th colSpan="4">Category</Th>
              <Th colSpan="4">Defects</Th>
              <Th colSpan="4">No. Of Defects Observed</Th>
              <Th colSpan="4">Total No. of Defects Observed</Th>
              <Th colSpan="3">Maximum No. of Defects Allowed</Th>
            </tr>

            <>
              <tr>
                <Td colSpan="1">1</Td>
                <Td colSpan="4" rowSpan="2">
                  Critical (AQL - Nil)
                </Td>
                <Td colSpan="4">Old / Obsolete/Incorrect Artwork</Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={Number1}
                    disabled={condition}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setNumber1(value);
                      }
                    }}
                    min="0"
                  />
                </Td>
                <Td colSpan="4" rowSpan="2" disabled={condition}>
                  {" "}
                  {total1}
                </Td>
                <Td colSpan="3" rowSpan="2">
                  <input
                    type="text"
                    className="inp-new"
                    value={Maxdefect1}
                    disabled={condition}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMaxdefect1(value);
                      }
                    }}
                    min="0"
                  />
                </Td>
              </tr>
              <tr>
                <Td colSpan="1">2</Td>
                <Td colSpan="4">Bar code Wrong / Not Scanning</Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={Number2}
                    disabled={condition}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setNumber2(value);
                      }
                    }}
                    min="0"
                  />
                </Td>
              </tr>
            </>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>INWARD INSPECTION REPORT</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "80%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <Td colSpan="1">1</Td>
              <Td colSpan="4" rowSpan="6">
                Major (AQL - 2.5)
              </Td>
              <Td colSpan="4">Wrong/Incorrect Dimension </Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number3}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber3(value);
                    }
                  }}
                  min="0"
                />
              </Td>
              <Td colSpan="4" rowSpan={6} disabled={condition}>
                {total2}
              </Td>
              <Td colSpan="3" rowSpan={6}>
                <input
                  type="text"
                  className="inp-new"
                  value={Maxdefect2}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setMaxdefect2(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">2</Td>
              <Td colSpan="4">Improper Printing / Text Font</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number4}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber4(value);
                    }
                  }}
                  disabled={condition}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">3</Td>
              <Td colSpan="4">Major colour shade Deviation </Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number5}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber5(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">4</Td>
              <Td colSpan="4">High Moisture </Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number6}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber6(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">5</Td>
              <Td colSpan="4">Bad Odour / Smell</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number7}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber7(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">6</Td>
              <Td colSpan="4">Improper Perforation</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number8}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber8(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">1</Td>
              <Td colSpan="4" rowSpan={7}>
                Major (AQL - 4)
              </Td>
              <Td colSpan="4">Unwanted Colour Spot</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number9}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber9(value);
                    }
                  }}
                  min="0"
                />
              </Td>
              <Td colSpan="4" rowSpan={7} disabled={condition}>
                {total3}
              </Td>
              <Td colSpan="3" rowSpan={7}>
                <input
                  type="text"
                  className="inp-new"
                  value={Maxdefect3}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setMaxdefect3(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">2</Td>
              <Td colSpan="4">Paper Cutting Not Proper</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number10}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber10(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">3</Td>
              <Td colSpan="4">Different Printing font(Eligible )</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number11}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber11(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">4</Td>
              <Td colSpan="4">Open/Improper joints of cartons</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number12}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber12(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">5</Td>
              <Td colSpan="4">Fold mark / Wrinkles</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number13}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber13(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">6</Td>
              <Td colSpan="4">Shifting of Artwork</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number14}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber14(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">7</Td>
              <Td colSpan="4">Less Weight</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={Number15}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setNumber15(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan={7} rowSpan={2}>
                COA Reference No:
                <input
                  type="text"
                  className="inp-new"
                  value={Coreference}
                  disabled={condition}
                  onChange={(e) => setCoreference(e.target.value)}
                  style={{ width: "100%" }}
                 
                />
              </Td>
              <Td colSpan={5}>Quantity Accepted:</Td>
              <Td colSpan={8}>
                <input
                  type="text"
                  className="inp-new"
                  value={Accepted}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (value)) {
                      setAccepted(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan={5}>Quantity Rejected</Td>
              <Td colSpan={8}>
                <input
                  type="text"
                  className="inp-new"
                  value={Rejected}
                  disabled={condition}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (value)) {
                      setRejected(value);
                    }
                  }}
                  min="0"
                />
              </Td>
            </tr>

            <tr>
              <td colSpan={20} style={{ textAlign: "left" }}>
                Remarks Remarks/Reason for Rejection, if any:
                <input
                  type="text"
                  className="inp-new"
                  value={Remarks}
                  disabled={condition}
                  onChange={(e) => setRemarks(e.target.value)}
                  style={{ width: "100%" }}
                />
              </td>
            </tr>

            {/* <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px', width: '90%' , marginTop:'10px' }}>
  <Input.Group compact style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', width: '75%', marginLeft: '10px' }}> */}
            <tr>
              <td colSpan={20}>
                <label
                  htmlFor="lot-status-select"
                  style={{ marginRight: "10px", alignSelf: "center" }}
                >
                  Lot Status:
                </label>

                <Select
                  id="lot-status-select"
                  defaultValue="Select Lot Status"
                  style={{ width: "30%", marginRight: "10px" }}
                  value={lotStatus}
                  disabled={condition}
                  onChange={handleLotStatusChange}
                >
                  <Option value="Accepted">Accepted</Option>
                  <Option value="Rejected">Rejected</Option>
                  <Option value="AcceptedUnderDeviation">
                    Accepted Under Deviation
                  </Option>
                  <Option value="OnHold">On Hold</Option>
                  <Option value="Rework">Rework</Option>
                </Select>
              </td>
            </tr>
            {/* </Input.Group>
</div> */}
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                Inspected by:Signature & Date
              </td>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                Approved by: Signature & Date
              </td>
            </tr>

            <tr>
              <td
                colSpan="15"
                style={{
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                  borderRight: "1px solid black",
                }}
              >
                {selectedRow &&
                  selectedRow?.qa_inspector_status ===
                    "QA_INSPECTOR_SUBMITTED" && (
                    <div>
                      {getImage && (
                        <img
                          src={getImage}
                          alt="Supervisor Sign"
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
                      <br />

                      {selectedRow && selectedRow.qa_inspector_sign && (
                        <span>{selectedRow.qa_inspector_sign}</span>
                      )}
                      <br />
                      {formatted_qa_inspectorDate}
                    </div>
                  )}
                {/* Signature & Date */}
              </td>

              <td
                colSpan="15"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {((selectedRow &&
                  selectedRow?.qa_manager_status === "QA_MR_REJECTED") ||
                  (selectedRow &&
                    selectedRow?.qa_manager_status === "QA_MR_APPROVED")) && (
                  <div>
                    {getImage1 && (
                      <img
                        src={getImage1}
                        alt="Hod Sign"
                        style={{
                          width: "70px",
                          height: "50px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "space-evenly",
                        }}
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.qa_manager_sign && (
                      <span>{selectedRow.qa_manager_sign}</span>
                    )}
                    <br />
                    {formatted_qa_managerDate}
                  </div>
                )} 
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="INWARD INSPECTION REPORT (for Carton)"
        formatNo="PH-QAD01-F-029"
        sopNo="PH-QAD01-D-15"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(role === "QA_MANAGER" || role === "ROLE_DESIGNEE"
            ? [
                <Button
                  key="approve"
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
                </Button>,
                <Button
                  key="reject"
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
                </Button>,
              ]
            : [
                <Button
                  key="save"
                  loading={saveLoading}
                  type="primary"
                  onClick={saveData}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButton2(),
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={submitLoading}
                  type="primary"
                  onClick={submitData}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<GrDocumentStore color="#00308F" />}
                  shape="round"
                >
                  Submit
                </Button>,
              ]),
          <Button
            key="logout"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiLock color="#00308F" />}
            onClick={() => {
              if (window.confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot"); // Ensure navigate is defined or imported
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
          <PrecotSidebar
            open={open}
            onClose={onClose}
            role={localStorage.getItem("role")}
          />,
          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
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
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>,
        ]}
      />

      <Input
        addonBefore="IIR No.:"
        placeholder="IIR No.:"
        type="text"
        style={{ width: "25%", marginLeft: "10px" }}
        value={IIR_No}
        disabled={condition}
        onChange={(e) => setIIR_No(e.target.value)}
        readOnly
      />

      <Input
        addonBefore="Calendar:"
        placeholder="Calendar"
        type="date"
        max={getCurrentDate()}
        style={{ width: "20%", marginLeft: "10px" }}
        value={dates}
        disabled={condition}
        onChange={(e) => setDates(e.target.value)}
      />

      <Input
        addonBefore="GR Date: "
        placeholder="GR Date: "
        type="date"
        style={{ width: "25%", marginLeft: "10px" }}
        value={newDate}
        disabled={condition}
        readOnly
      />

      <Select
        placeholder="Select Item Description"
        style={{ width: "25%", marginLeft: "10px" }}
        value={selectedItem}
        disabled={condition}
        onChange={(value) => {
          setSelectedItem(value);
          handleItem(value);
        }}
      >
        {(productdesc && Array.isArray(productdesc) ? productdesc : []).map(
          (prod) => (
            <Option key={prod} value={prod}>
              {prod}
            </Option>
          )
        )}
      </Select>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "0px",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <Input
          addonBefore="GR NO:"
          placeholder="GR NO:"
          type="Text"
          disabled={condition}
          style={{ width: "25%", marginLeft: "10px" }}
          value={GRNO}
          readOnly
        />

        <Input
          addonBefore="Batch No:"
          placeholder="Batch No:"
          type="Text"
          disabled={condition}
          style={{ width: "25%", marginLeft: "10px" }}
          value={BatchNo}
          readOnly
        />

        <Input
          addonBefore="Lot Qty.:"
          placeholder="Lot Qty.:"
          type="Text"
          disabled={condition}
          style={{ width: "25%", marginLeft: "10px" }}
          value={LotQty}
          readOnly
        />

        <Input
          addonBefore="Supplier Name.:"
          placeholder="Supplier Name.:"
          type="text"
          style={{ width: "20%", marginLeft: "10px" }}
          disabled={condition}
          value={Suppliers}
          readOnly
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "0px",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <Input
          addonBefore="Invoice No.: "
          placeholder="Invoice No.: "
          type="text"
          disabled={condition}
          style={{ width: "25%", marginLeft: "10px" }}
          value={invoice}
          readOnly
        />

        <Input
          addonBefore="Item Code"
          placeholder="Item Code"
          type="text"
          disabled={condition}
          style={{ width: "20%", marginLeft: "10px" }}
          value={Item_code}
          readOnly
        />

        <Input
          addonBefore="AQL Sample Size"
          placeholder="AQL Sample Size"
          type="text"
          disabled={condition}
          style={{ width: "25%", marginLeft: "10px" }}
          value={AQl_Sample}
          onChange={(e) => setAQl_Sample(e.target.value)} 
        />

        <Input
          addonBefore="PDS No: "
          placeholder="PDS No: "
          type="text"
          disabled={condition}
          style={{ width: "25%", marginLeft: "10px" }}
          value={PDS}
          onChange={(e) => setPDS(e.target.value)} 
        />

        <Input
          addonBefore="Po No: "
          placeholder="Po No: "
          type="text"
          disabled={condition}
          style={{ width: "25%", marginLeft: "10px" }}
          value={PoNo}
          readOnly
        />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items} 
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default QA_Inward029;