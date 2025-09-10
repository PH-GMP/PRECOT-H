/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { Td, Th } from "../Components/TableUtils";

const QA_Inward030 = () => {
  const { Option } = Select;
  const [selectedItem, setSelectedItem] = useState("");
  const [LotQty, setLotQty] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [AQl_Sample, setAQl_Sample] = useState("");
  const [PDS, setPDS] = useState("");
  const [Item_code, setItem_code] = useState("");
  const [IIR_No, setIIR_No] = useState("");
  const [Coreference, setCoreference] = useState("");
  const [Rolls, SetRolls] = useState("");
  const [SampleRolls, setSampleRolls] = useState("");
  const [dates, setDates] = useState("");
  const [GRNO, SetGRNO] = useState("");
  const [fetchedId, setFetchedId] = useState(null);
  const location = useLocation();
  const { state } = location;
  const { newDate, Suppliers, invoice, productdesc } = state || {};

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

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

  const [Specification1, SetSpecification1] = useState("");
  const [Specification2, SetSpecification2] = useState("");
  const [Specification3, SetSpecification3] = useState("");
  const [Specification4, SetSpecification4] = useState("");
  const [Specification5, SetSpecification5] = useState("");
  const [observation1, setobsevation1] = useState("");
  const [observation2, setobsevation2] = useState("");
  const [observation3, setobsevation3] = useState("");
  const [observation4, setobsevation4] = useState("");
  const [observation5, setobsevation5] = useState("");
  const [Accepted, setAccepted] = useState("");
  const [Rejected, setRejected] = useState("");
  const [observ1, setobserv1] = useState("");
  const [observ2, setobserv2] = useState("");
  const [observ3, setobserv3] = useState("");
  const [observ4, setobserv4] = useState("");
  const [observ5, setobserv5] = useState("");
  const [observ6, setobserv6] = useState("");
  const [observ7, setobserv7] = useState("");
  const [observ8, setobserv8] = useState("");
  const [observ9, setobserv9] = useState("");
  const [observ10, setobserv10] = useState("");
  const [observ11, setobserv11] = useState("");
  const [observ12, setobserv12] = useState("");
  const [observ13, setobserv13] = useState("");
  const [observ14, setobserv14] = useState("");
  const [PoNo, setPoNo] = useState("");
  const [lotStatus, setLotStatus] = useState(""); 
  const handleLotStatusChange = (value) => {
    setLotStatus(value);
  };

  const [NewSave, setNewSave] = useState(false);
  const [date, setDate] = useState("");
  const [BatchNo, setBatchNo] = useState("");
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");

  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");

  const [loading, setLoading] = useState(false);
  const [revisionNo, setRevisionNo] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OverallID, setOverallID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sample_quantity, setsample_quantity] = useState("");

  const initial = useRef(false);
  const [open, setOpen] = useState(false);

  const roleBase = localStorage.getItem("role");

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qa_inspector_sign;
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
          setGetImage(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow,API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qa_manager_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow,API.prodUrl]);

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

    if (!IIR_No || IIR_No.length === 0) {
      message.error("Please Enter the IIR No");
      return false;
    }

    return true;
  };

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
        // emptyarraycheck == 0
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
        `${API.prodUrl}/Precot/api/qa/InwardInspection/approveOrReject`,
        {
          formatNo: "PH-QAD01/F-030",
          id: fetchedId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/QA/Inward030/Summary");
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
        `${API.prodUrl}/Precot/api/qa/InwardInspection/approveOrReject`,
        {
          id: fetchedId,
          formatNo: "PH-QAD01/F-030",
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QA/Inward030/Summary");
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
  }, [date]);

  const checkgetExists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
         API.prodUrl
        }/Precot/api/qa/getdetailsbyParamInward?formatNo=${"PH-QAD01/F-030"}&gr_date=${newDate}&supplierName=${Suppliers}&invoice_no=${invoice}&item_description=${productdesc}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        ((roleauth == "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") &&
          response.data.body.qa_inspector_status !==
            "QA_INSPECTOR_SUBMITTED") ||
        ((roleauth == "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") &&
          response.data.body.qa_manager_status == "QA_MR_REJECTED")
      ) {
        message.error("QA Inspector Not Yet  Approved");
        setTimeout(() => {
          navigate("/Precot/QA/Inward030/Summary");
        }, 1500);
      }
      response.data.length == 0 ? setNewSave(true) : setNewSave(false);

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
      SetRolls(response.data.body.no_of_rolls);
      setSampleRolls(response.data.body.no_of_sample_rolls);
      setsample_quantity(response.data.body.sample_quantity);
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
      setlineId6(response.data.body.line2[0].line_id);
      setobserv1(response.data.body.line2[0].defect_observation);
      setlineId7(response.data.body.line2[1].line_id);
      setobserv2(response.data.body.line2[1].defect_observation);
      setlineId8(response.data.body.line2[2].line_id);
      setobserv3(response.data.body.line2[2].defect_observation);
      setlineId9(response.data.body.line2[3].line_id);
      setobserv4(response.data.body.line2[3].defect_observation);
      setlineId10(response.data.body.line2[4].line_id);
      setobserv5(response.data.body.line2[4].defect_observation);
      setlineId11(response.data.body.line2[5].line_id);
      setobserv6(response.data.body.line2[5].defect_observation);
      setlineId12(response.data.body.line2[6].line_id);
      setobserv7(response.data.body.line2[6].defect_observation);
      setlineId13(response.data.body.line2[7].line_id);
      setobserv8(response.data.body.line2[7].defect_observation);
      setlineId14(response.data.body.line2[8].line_id);
      setobserv9(response.data.body.line2[8].defect_observation);
      setlineId15(response.data.body.line2[9].line_id);
      setobserv10(response.data.body.line2[9].defect_observation);
      setlineId16(response.data.body.line2[10].line_id);
      setobserv11(response.data.body.line2[10].defect_observation);
      setlineId17(response.data.body.line2[11].line_id);
      setobserv12(response.data.body.line2[11].defect_observation);
      setlineId18(response.data.body.line2[12].line_id);
      setobserv13(response.data.body.line2[12].defect_observation);
      setlineId19(response.data.body.line2[13].line_id);
      setobserv14(response.data.body.line2[13].defect_observation);
      setAccepted(response.data.body.accepted);
      setRejected(response.data.body.rejected);
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
        }/Precot/api/qa/number/generation?formNumber=${"PH-QAD01/F-030"}`,
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
        `${API.prodUrl}/Precot/api/qa/inwardPde/details?grDate=${formattedDate}&supplier=${Suppliers}&invoice=${invoice}&materialDescription=${selectedItem}`,
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
        SetRolls(response.data.materialDetails.nofRoll);
      } else {
        console.error("materialDetails not found in the response");
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  const saveData = () => {
    const { newdate } = state || {};
    setSaveLoading(true);

    // const payload = {
    //   unit: "Unit H",
    //   formatNo: "PH-QAD01/F-030",
    //   formatName: "INWARD INSPECTION REPORT (for Film)",
    //   sopNumber: "PH-QAD01-D-30",
    //   revisionNo: "01",
    //   iir_no: IIR_No,
    //   date: dates,
    //   batch_no: BatchNo,
    //   lot_qty: LotQty,
    //   item_description: selectedItem,
    //   aql_sample_size: "",
    //   supplier_name: Suppliers,
    //   po_no: PoNo,
    //   item_code: Item_code,
    //   invoice_no: invoice,
    //   gr_date: newDate,
    //   gr_no: GRNO,
    //   pds_no: PDS === "" || PDS === null || PDS === undefined ? "NA" : PDS,
    //   coa_reference_no: Coreference === "" ? "NA" : Coreference,
    //   accepted: Accepted === "" ? "0" : Accepted,
    //   rejected: Rejected === "" ? "0" : Rejected,
    //   lot_status: lotStatus,
    //   remarks: Remarks === "" ? "NA" : Remarks,
    //   no_of_rolls: Rolls === "" ? "NA" : Rolls,
    //   no_of_sample_rolls:
    //     SampleRolls === "" || SampleRolls === null || SampleRolls === undefined
    //       ? "NA"
    //       : SampleRolls,
    //   sample_quantity:
    //     sample_quantity === "" ||
    //     sample_quantity === null ||
    //     sample_quantity === undefined
    //       ? "NA"
    //       : sample_quantity,
    //   ...(fetchedId && { id: fetchedId }),
    //   line1: [
    //     {
    //       parameter: "Width of Film (mm)",
    //       specification: Specification1 === "" ? "NA" : Specification1,
    //       observation: observation1 === "" ? "NA" : observation1,
    //       ...(fetchedId && { id: fetchedId }),
    //       ...(lineId1 && { line_id: lineId1 }),
    //     },
    //     {
    //       parameter: "Thickness of Film (micron)",
    //       specification: Specification2 === "" ? "NA" : Specification2,
    //       observation: observation2 === "" ? "NA" : observation2,
    //       ...(lineId2 && { line_id: lineId2 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },

    //     {
    //       parameter: "Type of Film",
    //       specification: Specification3 === "" ? "NA" : Specification3,
    //       observation: observation3 === "" ? "NA" : observation3,
    //       ...(lineId3 && { line_id: lineId3 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },

    //     {
    //       parameter: "Bar code Number",
    //       specification: Specification4 === "" ? "NA" : Specification4,
    //       observation: observation4 === "" ? "NA" : observation4,
    //       ...(lineId4 && { line_id: lineId4 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       parameter: "Artwork & Printed Text Matter",
    //       specification: Specification5 === "" ? "NA" : Specification5,
    //       observation: observation5 === "" ? "NA" : observation5,
    //       ...(lineId5 && { line_id: lineId5 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //   ],

    //   line2: [
    //     {
    //       category: "Critical(AQL - NA)",
    //       defects: "Old / Obsolete/Incorrect Artwork",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ1 === "" ? "NA" : observ1,
    //       ...(lineId6 && { line_id: lineId6 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Critical(AQL - NA)",
    //       defects: "Bar code Wrong / Not Scanning",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ2 === "" ? "NA" : observ2,
    //       ...(lineId7 && { line_id: lineId7 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Critical(AQL - NA)",
    //       defects: "Different basic film used",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ3 === "" ? "NA" : observ3,
    //       ...(lineId8 && { line_id: lineId8 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Major(AQL - 2.5)",
    //       defects: "Illegible Printing",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ4 === "" ? "NA" : observ4,
    //       ...(lineId9 && { line_id: lineId9 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Major(AQL - 2.5)",
    //       defects: "Shifted Artwork",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ5 === "" ? "NA" : observ5,
    //       ...(lineId10 && { line_id: lineId10 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Major(AQL - 2.5)",
    //       defects: "Major colour shade deviation",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ6 === "" ? "NA" : observ6,
    //       ...(lineId11 && { line_id: lineId11 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Major(AQL - 2.5)",
    //       defects: "Wrong film roll Width",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ7 === "" ? "NA" : observ7,
    //       ...(lineId12 && { line_id: lineId12 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Major(AQL - 2.5)",
    //       defects: "Roll Winding Proper/ Not Proper",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ8 === "" ? "NA" : observ8,
    //       ...(lineId13 && { line_id: lineId13 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Major(AQL - 2.5)",
    //       defects: "Inner core Tube Dimension",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ9 === "" ? "NA" : observ9,
    //       ...(lineId14 && { line_id: lineId14 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Minor(AQL - 4)",
    //       defects: "Unwanted Colour Spot",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ10 === "" ? "NA" : observ10,
    //       ...(lineId15 && { line_id: lineId15 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Minor(AQL - 4)",
    //       defects: "Sticky Film",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ11 === "" ? "NA" : observ11,
    //       ...(lineId16 && { line_id: lineId16 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Minor(AQL - 4)",
    //       defects: "Less/ More Thickness of Film",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ12 === "" ? "NA" : observ12,
    //       ...(lineId17 && { line_id: lineId17 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //     {
    //       category: "Minor(AQL - 4)",
    //       defects: "Minor colour shade deviation",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ13 === "" ? "NA" : observ13,
    //       ...(lineId18 && { line_id: lineId18 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },

    //     {
    //       category: "Minor(AQL - 4)",
    //       defects: "Folding/ Wrinkles",
    //       no_of_defects: "",
    //       total_no_of_defects: "",
    //       maximum_no_of_defects: "",
    //       defect_observation: observ14 === "" ? "NA" : observ14,
    //       ...(lineId19 && { line_id: lineId19 }),
    //       ...(fetchedId && { id: fetchedId }),
    //     },
    //   ],
    // };

    const payload = {
      unit: "Unit H",
      formatNo: "PH-QAD01/F-030",
      formatName: "INWARD INSPECTION REPORT (for Film)",
      sopNumber: "PH-QAD01-D-30",
      revisionNo: "01",
      iir_no: IIR_No || "NA",
      date: dates || "NA",
      batch_no: BatchNo || "NA",
      lot_qty: LotQty || "NA",
      item_description: selectedItem || "NA",
      aql_sample_size: "",
      supplier_name: Suppliers || "NA",
      po_no: PoNo || "NA",
      item_code: Item_code || "NA",
      invoice_no: invoice || "NA",
      gr_date: newDate || "NA",
      gr_no: GRNO || "NA",
      pds_no: PDS ? PDS : "NA",
      coa_reference_no: Coreference || "NA",
      accepted: Accepted || "0",
      rejected: Rejected || "0",
      lot_status: lotStatus || "NA",
      remarks: Remarks || "NA",
      no_of_rolls: Rolls || "NA",
      no_of_sample_rolls: SampleRolls ? SampleRolls : "NA",
      sample_quantity: sample_quantity ? sample_quantity : "NA",
      ...(fetchedId && { id: fetchedId }),

      line1: [
        {
          parameter: "Width of Film (mm)",
          specification: Specification1 || "NA",
          observation: observation1 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId1 && { line_id: lineId1 }),
        },
        {
          parameter: "Thickness of Film (micron)",
          specification: Specification2 || "NA",
          observation: observation2 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId2 && { line_id: lineId2 }),
        },
        {
          parameter: "Type of Film",
          specification: Specification3 || "NA",
          observation: observation3 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId3 && { line_id: lineId3 }),
        },
        {
          parameter: "Bar code Number",
          specification: Specification4 || "NA",
          observation: observation4 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId4 && { line_id: lineId4 }),
        },
        {
          parameter: "Artwork & Printed Text Matter",
          specification: Specification5 || "NA",
          observation: observation5 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId5 && { line_id: lineId5 }),
        },
      ],

      line2: [
        {
          category: "Critical(AQL - NA)",
          defects: "Old / Obsolete/Incorrect Artwork",
          defect_observation: observ1 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId6 && { line_id: lineId6 }),
        },
        {
          category: "Critical(AQL - NA)",
          defects: "Bar code Wrong / Not Scanning",
          defect_observation: observ2 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId7 && { line_id: lineId7 }),
        },
        {
          category: "Critical(AQL - NA)",
          defects: "Different basic film used",
          defect_observation: observ3 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId8 && { line_id: lineId8 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Illegible Printing",
          defect_observation: observ4 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId9 && { line_id: lineId9 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Shifted Artwork",
          defect_observation: observ5 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId10 && { line_id: lineId10 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Major colour shade deviation",
          defect_observation: observ6 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId11 && { line_id: lineId11 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Wrong film roll Width",
          defect_observation: observ7 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId12 && { line_id: lineId12 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Roll Winding Proper/ Not Proper",
          defect_observation: observ8 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId13 && { line_id: lineId13 }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Inner core Tube Dimension",
          defect_observation: observ9 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId14 && { line_id: lineId14 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Unwanted Colour Spot",
          defect_observation: observ10 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId15 && { line_id: lineId15 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Sticky Film",
          defect_observation: observ11 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId16 && { line_id: lineId16 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Less/ More Thickness of Film",
          defect_observation: observ12 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId17 && { line_id: lineId17 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Minor colour shade deviation",
          defect_observation: observ13 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId18 && { line_id: lineId18 }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Folding/ Wrinkles",
          defect_observation: observ14 || "NA",
          ...(fetchedId && { id: fetchedId }),
          ...(lineId19 && { line_id: lineId19 }),
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/qa/saveInwardInspectionReport`, payload, {
        headers,
      })
      .then((res) => {
        message.success("Form Saved Successfully");
        navigate("/Precot/QA/Inward030/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const submitData = () => {
    const { newdate } = state || {};
    setSubmitLoading(true);

    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    }

    const payload = {
      unit: "Unit H",
      formatNo: "PH-QAD01/F-030",
      formatName: "INWARD INSPECTION REPORT (for Film)",
      sopNumber: "PH-QAD01-D-30",
      revisionNo: "01",
      iir_no: IIR_No,
      date: dates,
      batch_no: BatchNo,
      lot_qty: LotQty,
      item_description: selectedItem,
      aql_sample_size: "NA",
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
      no_of_rolls: Rolls === "" ? "NA" : Rolls,
      no_of_sample_rolls:
        SampleRolls === "" || SampleRolls === null || SampleRolls === undefined
          ? "NA"
          : SampleRolls,
      sample_quantity:
        sample_quantity === "" ||
        sample_quantity === null ||
        sample_quantity === undefined
          ? "NA"
          : sample_quantity,
      ...(fetchedId && { id: fetchedId }),
      line1: [
        {
          parameter: "Width of Film (mm)",
          specification: Specification1 === "" ? "NA" : Specification1,
          observation: observation1 === "" ? "NA" : observation1,
          ...(fetchedId && { id: fetchedId }),
          ...(lineId1 && { line_id: lineId1 }),
        },
        {
          parameter: "Thickness of Film (micron)",
          specification: Specification2 === "" ? "NA" : Specification2,
          observation: observation2 === "" ? "NA" : observation2,
          ...(lineId2 && { line_id: lineId2 }),
          ...(fetchedId && { id: fetchedId }),
        },

        {
          parameter: "Type of Film",
          specification: Specification3 === "" ? "NA" : Specification3,
          observation: observation3 === "" ? "NA" : observation3,
          ...(lineId3 && { line_id: lineId3 }),
          ...(fetchedId && { id: fetchedId }),
        },

        {
          parameter: "Bar code Number",
          specification: Specification4 === "" ? "NA" : Specification4,
          observation: observation4 === "" ? "NA" : observation4,
          ...(lineId4 && { line_id: lineId4 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          parameter: "Artwork & Printed Text Matter",
          specification: Specification5 === "" ? "NA" : Specification5,
          observation: observation5 === "" ? "NA" : observation5,
          ...(lineId5 && { line_id: lineId5 }),
          ...(fetchedId && { id: fetchedId }),
        },
      ],

      line2: [
        {
          category: "Critical(AQL - NA)",
          defects: "Old / Obsolete/Incorrect Artwork",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ1 === "" ? "NA" : observ1,
          ...(lineId6 && { line_id: lineId6 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Critical(AQL - NA)",
          defects: "Bar code Wrong / Not Scanning",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ2 === "" ? "NA" : observ2,
          ...(lineId7 && { line_id: lineId7 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Critical(AQL - NA)",
          defects: "Different basic film used",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ3 === "" ? "NA" : observ3,
          ...(lineId8 && { line_id: lineId8 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Illegible Printing",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ4 === "" ? "NA" : observ4,
          ...(lineId9 && { line_id: lineId9 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Shifted Artwork",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ5 === "" ? "NA" : observ5,
          ...(lineId10 && { line_id: lineId10 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Major colour shade deviation",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ6 === "" ? "NA" : observ6,
          ...(lineId11 && { line_id: lineId11 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Wrong film roll Width",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ7 === "" ? "NA" : observ7,
          ...(lineId12 && { line_id: lineId12 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Roll Winding Proper/ Not Proper",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ8 === "" ? "NA" : observ8,
          ...(lineId13 && { line_id: lineId13 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Major(AQL - 2.5)",
          defects: "Inner core Tube Dimension",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ9 === "" ? "NA" : observ9,
          ...(lineId14 && { line_id: lineId14 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Unwanted Colour Spot",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ10 === "" ? "NA" : observ10,
          ...(lineId15 && { line_id: lineId15 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Sticky Film",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ11 === "" ? "NA" : observ11,
          ...(lineId16 && { line_id: lineId16 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Less/ More Thickness of Film",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ12 === "" ? "NA" : observ12,
          ...(lineId17 && { line_id: lineId17 }),
          ...(fetchedId && { id: fetchedId }),
        },
        {
          category: "Minor(AQL - 4)",
          defects: "Minor colour shade deviation",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ13 === "" ? "NA" : observ13,
          ...(lineId18 && { line_id: lineId18 }),
          ...(fetchedId && { id: fetchedId }),
        },

        {
          category: "Minor(AQL - 4)",
          defects: "Folding/ Wrinkles",
          no_of_defects: "NA",
          total_no_of_defects: "NA",
          maximum_no_of_defects: "NA",
          defect_observation: observ14 === "" ? "NA" : observ14,
          ...(lineId19 && { line_id: lineId19 }),
          ...(fetchedId && { id: fetchedId }),
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/qa/submitInwardInspectionReport`,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        message.success("Form Submitted Successfully");
        navigate("/Precot/QA/Inward030/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    const { newdate } = state || {};

    const formattedDate = moment(newdate, "DD/MM/YYYY").format("YYYY-MM-DD");

    setDate(formattedDate);
  });

  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const token = localStorage.getItem("token");

  const handlePrint = () => {
    window.print();
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleBack = () => {
    navigate("/Precot/QA/Inward030/Summary", {});
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
      label: <p>INSPECTION REPORT</p>,
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
                <Td colSpan="5">Width of Film (mm)</Td>
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
                    style={{ width: "100%" }}
                    disabled={condition}
                  />
                </Td>
              </tr>
              <tr>
                <Td colSpan="1">2</Td>
                <Td colSpan="5">Thickness of Film (micron)</Td>
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
                <Td colSpan="5">Type of Film</Td>
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
                <Td colSpan="5">Bar code Number </Td>
                <Td colSpan="5">
                  {" "}
                  <input
                    type="text"
                    className="inp-new"
                    value={Specification4}
                    onChange={(e) => SetSpecification4(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                  />
                </Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={observation4}
                    onChange={(e) => setobsevation4(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                  />
                </Td>
              </tr>
              <tr>
                <Td colSpan="1">5</Td>
                <Td colSpan="5">Artwork & Printed Text Matter</Td>
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
                    onChange={(e) => setobsevation5(e.target.value)}
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
            </tr>

            <>
              <tr>
                <Td colSpan="1">1</Td>
                <Td colSpan="4" rowSpan="3">
                  Critical{" "}
                </Td>
                <Td colSpan="4">Old / Obsolete/Incorrect Artwork</Td>
                <Td colSpan="4">
                  <input
                    type="text"
                    className="inp-new"
                    value={observ1}
                    onChange={(e) => setobserv1(e.target.value)}
                    disabled={condition}
                    style={{ width: "100%" }}
                    onKeyDown={handleKeyDown2}
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
                    value={observ2}
                    onChange={(e) => setobserv2(e.target.value)}
                    style={{ width: "100%" }}
                    disabled={condition}
                    onKeyDown={handleKeyDown2}
                  />
                </Td>
              </tr>
            </>

            <tr>
              <Td colSpan="1">3</Td>
              <Td colSpan="4">Different basic film used</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ3}
                  onChange={(e) => setobserv3(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>
          </table>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>INSPECTION REPORT</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "80%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <Td colSpan="1">1</Td>
              <Td colSpan="4" rowSpan="6">
                Major{" "}
              </Td>
              <Td colSpan="4">Illegible Printing </Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ4}
                  onChange={(e) => setobserv4(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">2</Td>
              <Td colSpan="4">Shifted Artwork</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ5}
                  onChange={(e) => setobserv5(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
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
                  value={observ6}
                  onChange={(e) => setobserv6(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">4</Td>
              <Td colSpan="4">Wrong film roll Width</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ7}
                  onChange={(e) => setobserv7(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">5</Td>
              <Td colSpan="4">Roll Winding Proper/ Not Proper</Td>
              <Td colSpan="4">
                {" "}
                <input
                  type="text"
                  className="inp-new"
                  value={observ8}
                  onChange={(e) => setobserv8(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">6</Td>
              <Td colSpan="4">Inner core Tube Dimension</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ9}
                  onChange={(e) => setobserv9(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">1</Td>
              <Td colSpan="4" rowSpan={5}>
                Major{" "}
              </Td>
              <Td colSpan="4">Unwanted Colour Spot</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ10}
                  onChange={(e) => setobserv10(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">2</Td>
              <Td colSpan="4">Sticky Film</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ11}
                  onChange={(e) => setobserv11(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">3</Td>
              <Td colSpan="4">Less/ More Thickness of Film</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ12}
                  onChange={(e) => setobserv12(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">4</Td>
              <Td colSpan="4">Minor colour shade deviation</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ13}
                  onChange={(e) => setobserv13(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan="1">5</Td>
              <Td colSpan="4">Folding/ Wrinkles</Td>
              <Td colSpan="4">
                <input
                  type="text"
                  className="inp-new"
                  value={observ14}
                  onChange={(e) => setobserv14(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                  onKeyDown={handleKeyDown2}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan={5} rowSpan={2}>
                Supplier’s COA Reference No.
                <input
                  type="text"
                  className="inp-new"
                  value={Coreference}
                  onChange={(e) => setCoreference(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                />
              </Td>

              <Td colSpan={4}>Roll Accepted</Td>
              <Td colSpan={4}>
                <input
                  type="text"
                  className="inp-new"
                  value={Accepted}
                  onChange={(e) => setAccepted(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                />
              </Td>
            </tr>

            <tr>
              <Td colSpan={4}>Roll Rejected</Td>
              <Td colSpan={4}>
                <input
                  type="text"
                  className="inp-new"
                  value={Rejected}
                  onChange={(e) => setRejected(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                />
              </Td>
            </tr>

            <tr>
              <td colSpan={13} style={{ textAlign: "left" }}>
                Remarks Remarks/Reason for Rejection, if any:
                <input
                  type="text"
                  className="inp-new"
                  value={Remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  style={{ width: "100%" }}
                  disabled={condition}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={13}>
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
                          alt="QA_Inspector Sign"
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
                        alt="QA_Manager sign"
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
                {/* Signature & Date */}
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
        formName="INWARD INSPECTION REPORT(for Film)"
        formatNo="PH-QAD01/F-030"
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
                  // icon={<IoSave color="#00308F" />}
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
                navigate("/Precot");
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
        readOnly
        style={{ width: "25%", marginLeft: "10px" }}
        disabled={condition}
        value={IIR_No}
        onChange={(e) => setIIR_No(e.target.value)}
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
          marginTop: "5px",
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
          onChange={(e) => setBatchNo(e.target.value)}
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
          marginTop: "5px",
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
          addonBefore="Po No: "
          placeholder="Po No: "
          type="text"
          style={{ width: "25%", marginLeft: "10px" }}
          disabled={condition}
          value={PoNo}
          onChange={(e) => setPoNo(e.target.value)}
          readOnly
        />
        <Input
          addonBefore="Item Code"
          placeholder="Item Code"
          type="text"
          style={{ width: "20%", marginLeft: "10px" }}
          readOnly
          disabled={condition}
          value={Item_code}
          onChange={(e) => setItem_code(e.target.value)}
        />

        <Input
          addonBefore="Sample Qty.:  "
          placeholder="Sample Qty.:  "
          type="text"
          style={{ width: "25%", marginLeft: "10px" }}
          disabled={condition}
          value={sample_quantity}
          onChange={(e) => setsample_quantity(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "5px",
          width: "90%",
        }}
      >
        <Input.Group
          compact
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            width: "100%",
            marginLeft: "5px",
          }}
        >
          <Input
            addonBefore="No of Rolls"
            placeholder="No of Rolls"
            value={Rolls}
            onChange={(e) => SetRolls(e.target.value)}
            type="text"
            style={{ width: "25%", marginRight: "10px", marginTop: "10px" }}
            disabled={condition}
          />

          <Input
            addonBefore="No of Sample Rolls"
            placeholder="No of Sample Rolls"
            value={SampleRolls}
            onChange={(e) => setSampleRolls(e.target.value)}
            type="text"
            style={{ width: "30%", marginTop: "10px" }}
            disabled={condition}
          />

          <Input
            addonBefore="PDS No: "
            placeholder="PDS No: "
            type="text"
            style={{ width: "25%", marginLeft: "20px", marginTop: "10px" }}
            disabled={condition}
            value={PDS}
            onChange={(e) => setPDS(e.target.value)}
          />
        </Input.Group>
      </div>

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
    </div>
  );
};

export default QA_Inward030;
