/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Select,
  Tabs,
  Tooltip,
  message,
  Modal,
  Upload,
  List,
} from "antd";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import {
  DeleteOutlined,
  PlusOutlined,
  DeleteTwoTone,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import SignatureCanvas from "react-signature-canvas";
import TextArea from "antd/es/input/TextArea.js";
const PPC_f003 = () => {
  const { state } = useLocation();
  const signatureRefs = useRef({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [id, setId] = useState(null);
  const [formatNo, setFormatNo] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [refSopNo, setRefSopNo] = useState("");
  const [date, setDate] = useState("");
  const [memberDetails, setMemberDetails] = useState([]);
  const [details, setDetails] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [incoterm, setIncoterm] = useState("");
  const [piPoNo, setPiPoNo] = useState("");
  const [approvedsamplereqNo, setApprovedsamplereqNo] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState("");
  const [plPoDate, setPlPoDate] = useState("");
  const [finalArtworkApprovedDate, setFinalArtworkApprovedDate] = useState("");
  const [deliveryTerm, setDeliveryTerm] = useState("");
  const [customerDispatchDate, setCustomerDispatchDate] = useState("");
  const [firstProductionSample, setFirstProductionSample] = useState("");
  const [portOfShipment, setPortOfShipment] = useState("");
  const [plantCommitmentDate, setPlantCommitmentDate] = useState("");
  const [portOfDestination, setPortOfDestination] = useState("");
  const [customerMasterSAPNo, setCustomerMasterSAPNo] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [transporter, setTransporter] = useState("");
  const [priceUpdateStatusInSap, setPriceUpdateStatusInSap] = useState("");
  const [insurance, setInsurance] = useState("");
  const [currency, setCurrency] = useState("");
  const [coaRequirements, setCoaRequirements] = useState("");
  const [freightLiner, setFreightLiner] = useState("");
  const [penalty, setPenalty] = useState("");
  const [commissionDetails, setCommissionDetails] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [inspectionMethod, setInspectionMethod] = useState("");
  const [inspectionDetails, setInspectionDetails] = useState("");
  const [remarks, setRemarks] = useState("");
  const [assistantStatus, setAssistantStatus] = useState("");
  const [assistantSubmitOn, setAssistantSubmitOn] = useState("");
  const [assistantSubmitBy, setAssistantSubmitBy] = useState("");
  const [plantHead, setPlantHead] = useState("");
  const [seniorManager, setSeniorManager] = useState("");
  const [businessDevelopment, setBusinessDevelopment] = useState("");
  const [businessDevelopment1, setBusinessDevelopment1] = useState("");
  const [developmentPurchase, setDevelopmentPurchase] = useState("");
  const [planning, setPlanning] = useState("");
  const [stores, setStores] = useState("");
  const [abCotton, setAbCotton] = useState("");
  const [spunlace, setSpunlace] = useState("");
  const [padPunching, setPadPunching] = useState("");
  const [ballPleatWoolRoll, setBallPleatWoolRoll] = useState("");
  const [bagMaking, setBagMaking] = useState("");
  const [qaQc, setQaQc] = useState("");
  const [logisticDispatch, setLogisticDispatch] = useState("");
  const [dttSignature, setDttSignature] = useState("");
  const [seniorManagerSignature, setSeniorManagerSignature] = useState("");
  const [businessDevelopmentSignature, setBusinessDevelopmentSignature] =
    useState("");
  const [businessDevelopmentSignature1, setBusinessDevelopmentSignature1] =
    useState("");
  const [developmentPurchaseSignature, setDevelopmentPurchaseSignature] =
    useState("");
  const [planningSignature, setPlanningSignature] = useState("");
  const [storesSignature, setStoresSignature] = useState("");
  const [abCottonSignature, setAbCottonSignature] = useState("");
  const [spunlaceSignature, setSpunlaceSignature] = useState("");
  const [padPunchingSignature, setPadPunchingSignature] = useState("");
  const [ballPleatWoolRollSignature, setBallPleatWoolRollSignature] =
    useState("");
  const [bagMakingSignature, setBagMakingSignature] = useState("");
  const [qaQcSignature, setQaQcSignature] = useState("");
  const [logisticDispatchSignature, setLogisticDispatchSignature] =
    useState("");
  const [plantHeadId, setPlantHeadId] = useState(null);
  const [seniorManagerId, setSeniorManagerId] = useState(null);
  const [businessDevelopmentId, setBusinessDevelopmentId] = useState(null);
  const [businessDevelopmentId1, setBusinessDevelopmentId1] = useState(null);
  const [developmentPurchaseId, setDevelopmentPurchaseId] = useState(null);
  const [planningId, setPlanningId] = useState(null);
  const [storesId, setStoresId] = useState(null);
  const [abCottonId, setAbCottonId] = useState(null);
  const [spunlaceId, setSpunlaceId] = useState(null);
  const [padPunchingId, setPadPunchingId] = useState(null);
  const [ballPleatWoolRollId, setBallPleatWoolRollId] = useState(null);
  const [bagMakingId, setBagMakingId] = useState(null);
  const [qaQcId, setQaQcId] = useState(null);
  const [logisticDispatchId, setLogisticDispatchId] = useState(null);
  const [commissionSelected, setCommissionSelected] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const canDisplay = () => {
    return true;
  };
  const Customer1 = state.CustomerName;
  console.log("Customer====>", Customer1);
  console.log("Customer====>", state.CustomerName);
  useEffect(() => {
    fetchExcelData();
  }, []);

  const fetchExcelData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Ppc/getbydate?date=${state.date}&customer=${Customer1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setExcelData(response.data);
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setExcelData(response.data);
      } else {
        setExcelData([]);
      }
    } catch (error) {
      // message.error("Failed to load Excel files.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("date", state.date);
    formData.append("customerName", state.CustomerName);
    try {
      await axios.post(`${API.prodUrl}/Precot/api/Ppc/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("File uploaded successfully.");
      fetchExcelData();
    } catch (error) {
      message.error("File upload failed.");
    }
  };
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Ppc/downloadexcel?date=${state.date}&customer=${Customer1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Important for handling binary files
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      let filename = `download_${state.date}.zip`;

      if (contentDisposition && contentDisposition.includes("filename=")) {
        filename = contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/['"]/g, "");
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
      message.error("Failed to download file");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this file?",
      onOk: async () => {
        try {
          await axios.delete(`${API.prodUrl}/Precot/api/Ppc/delete?id=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          message.success("File deleted successfully.");
          // fetchExcelData();
          setExcelData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
          message.error("Failed to delete file.");
        }
      },
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/PPC/F-003/Summary");
  };
  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");

  const [rows, setRows] = useState([
    { Sno: "", Product: "", PDSNo: "", POQty: "", Price: "", currency: "" },
  ]);
  const [addrows, setAddrows] = useState(false);
  const addRow = () => {
    setAddrows(true);
    setRows([
      ...rows,
      { Sno: "", Product: "", PDSNo: "", POQty: "", Price: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleNumberInput = (index, field, value) => {
    if (!isNaN(value) && value.trim() !== "") {
      handleInputChange(index, field, value);
    }
  };

  const removeRow = (index) => {
    const newRows = rows.filter((row, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  const formatDateUser = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const date1 = formatDateUser(state.date);

  const canDisplayButtons = () => {
    if (
      roleauth === "MARKET_REPRESENTATIVE" &&
      editResponse?.marketRepresentativeStatus ===
        "MARKET_REPRESENTATIVE_APPROVED"
    ) {
      return "none";
    }
    if (roleauth === "PPC_ASSISTANT") {
      if (
        editResponse?.marketRepresentativeStatus !==
        "MARKET_REPRESENTATIVE_APPROVED"
      ) {
        return "none";
      }
      if (editResponse?.assistantStatus === "ASSISANT_APPROVED") {
        return "none";
      }
      return "block";
    }
    return "block";
  };

  const token = localStorage.getItem("token");

  const handleCommissionChange = (value) => {
    setCommissionSelected(value);

    if (value === "No") {
      setCommissionDetails("");
    }
  };

  const handleCommissionDetailsChange = (e) => {
    setCommissionDetails(e.target.value);
  };

  const departments = [
    { department: "Plant Head", setId: setPlantHeadId },
    { department: "Senior Manager", setId: setSeniorManagerId },
    { department: "Business Development", setId: setBusinessDevelopmentId },
    { department: "Business Development1", setId: setBusinessDevelopmentId1 },
    { department: "Development /Purchase", setId: setDevelopmentPurchaseId },
    { department: "Planning", setId: setPlanningId },
    { department: "Stores", setId: setStoresId },
    { department: "AB Cotton", setId: setAbCottonId },
    { department: "Spunlace", setId: setSpunlaceId },
    { department: "Pad Punching", setId: setPadPunchingId },
    { department: "Ball / Pleat / Wool roll", setId: setBallPleatWoolRollId },
    { department: "Bag Making", setId: setBagMakingId },
    { department: "QA & QC", setId: setQaQcId },
    { department: "Logistic / Dispatch", setId: setLogisticDispatchId },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Ppc/GetContractReviewMeetingByDate?Date=${state.date}&customer=${Customer1}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("edit data", data[0]);

      if (data && data[0]) {
        setEditResponse(data[0]);
        setId(data[0].id);
        setFormatNo(data[0].formatNo);
        setRevisionNo(data[0].revisionNo);
        setRefSopNo(data[0].refSopNo);
        setDate(data[0].date);
        setMemberDetails(data[0].memberDetails);
        setCustomerName(data[0].customerName);
        setBillingAddress(data[0].billingAddress);
        setShippingAddress(data[0].shippingAddress);
        setIncoterm(data[0].incoterm);
        setPiPoNo(data[0].piPoNo);
        setApprovedsamplereqNo(data[0].approvedsamplereqNo);
        setProductDetails(data[0].productDetails);
        setPaymentTerm(data[0].paymentTerm);
        setPlPoDate(data[0].plPoDate);
        setFinalArtworkApprovedDate(data[0].finalArtworkApprovedDate);
        setDeliveryTerm(data[0].deliveryTerm);
        setCustomerDispatchDate(data[0].customerDispatchDate);
        setFirstProductionSample(data[0].firstProductionSample);
        setPortOfShipment(data[0].portOfShipment);
        setPlantCommitmentDate(data[0].plantCommitmentDate);
        setPortOfDestination(data[0].portOfDestination);
        setCustomerMasterSAPNo(data[0].customerMasterSAPNo);
        setSpecialInstructions(data[0].specialInstructions);
        setTransporter(data[0].transporter);
        setPriceUpdateStatusInSap(data[0].priceUpdateStatusInSap);
        setInsurance(data[0].insurance);
        setCurrency(data[0].currency);
        setCoaRequirements(data[0].coaRequirements);
        setFreightLiner(data[0].freightLiner);
        setCommissionDetails(data[0].commissionDetails);
        setCommissionSelected(data[0].commissionSelected);
        setHsCode(data[0].hsCode);
        setPenalty(data[0].penalty);
        setInspectionMethod(data[0].inspectionMethod);
        setInspectionDetails(data[0].inspectionMethodExternal);
        setAssistantStatus(data[0].assistantStatus);
        setAssistantSubmitOn(data[0].assistantSubmitOn);
        setAssistantSubmitBy(data[0].assistantSubmitBy);
        setRemarks(data[0].remarks);

        const memberDetails = data[0].memberDetails;

        memberDetails.forEach((member) => {
          switch (member.department) {
            case "Plant Head":
              setPlantHead(member.name || "");
              setDttSignature(member.signature || "");
              break;
            case "Senior Manager":
              setSeniorManager(member.name || "");
              setSeniorManagerSignature(member.signature || "");
              break;
            case "Business Development":
              setBusinessDevelopment(member.name || "");
              setBusinessDevelopmentSignature(member.signature || "");
              break;
            case "Business Development1":
              setBusinessDevelopment1(member.name || "");
              setBusinessDevelopmentSignature1(member.signature || "");
              break;
            case "Development /Purchase":
              setDevelopmentPurchase(member.name || "");
              setDevelopmentPurchaseSignature(member.signature || "");
              break;
            case "Planning":
              setPlanning(member.name || "");
              setPlanningSignature(member.signature || "");
              break;
            case "Stores":
              setStores(member.name || "");
              setStoresSignature(member.signature || "");
              break;
            case "AB Cotton":
              setAbCotton(member.name || "");
              setAbCottonSignature(member.signature || "");
              break;
            case "Spunlace":
              setSpunlace(member.name || "");
              setSpunlaceSignature(member.signature || "");
              break;
            case "Pad Punching":
              setPadPunching(member.name || "");
              setPadPunchingSignature(member.signature || "");
              break;
            case "Ball / Pleat / Wool roll":
              setBallPleatWoolRoll(member.name || "");
              setBallPleatWoolRollSignature(member.signature || "");
              break;
            case "Bag Making":
              setBagMaking(member.name || "");
              setBagMakingSignature(member.signature || "");
              break;
            case "QA & QC":
              setQaQc(member.name || "");
              setQaQcSignature(member.signature || "");
              break;
            case "Logistic / Dispatch":
              setLogisticDispatch(member.name || "");
              setLogisticDispatchSignature(member.signature || "");
              break;
            default:
              break;
          }
        });

        departments.forEach(({ department, setId }) => {
          const member = memberDetails.find(
            (member) => member.department === department
          );
          setId(member?.reviewDepartmentId || null);
        });

        setRows(
          data[0].productDetails
            .filter(
              (product) =>
                product.productName ||
                product.pdsNo ||
                product.poQtyInBags !== null ||
                product.pricePerBag !== null
            )
            .map((product) => ({
              reviewproductId: product.reviewproductId,
              srNo: product.srNo,
              Product: product.productName,
              PDSNo: product.pdsNo,
              POQty: product.poQtyInBags,
              Price: product.pricePerBag,
              currency: product.currency,
            }))
        );

        if (roleauth === "PPC_ASSISTANT") {
          if (
            data[0]?.marketRepresentativeStatus !==
            "MARKET_REPRESENTATIVE_APPROVED"
          ) {
            message.warning("Market Representative Not Yet Approved");
            setTimeout(() => {
              navigate("/Precot/PPC/F-003/Summary");
            }, 1500);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = () => {
    setSaveLoading(true);
    const payload = {
      id: id,
      formatName: "CONTRACT REVIEW MEETING",
      formatNo: "PH-PPC01/F-003",
      revisionNo: "2",
      refSopNo: "PH-PPC01-D-02",
      date: state.date,
      unit: "H",
      // details: details,
      customerName: customerName || Customer1,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      incoterm: incoterm,
      piPoNo: piPoNo,
      approvedsamplereqNo: approvedsamplereqNo,
      paymentTerm: paymentTerm,
      plPoDate: plPoDate,
      finalArtworkApprovedDate: finalArtworkApprovedDate,
      deliveryTerm: deliveryTerm,
      customerDispatchDate: customerDispatchDate,
      firstProductionSample: firstProductionSample,
      portOfShipment: portOfShipment,
      plantCommitmentDate: plantCommitmentDate,
      portOfDestination: portOfDestination,
      customerMasterSAPNo: customerMasterSAPNo,
      specialInstructions: specialInstructions,
      transporter: transporter,
      priceUpdateStatusInSap: priceUpdateStatusInSap,
      insurance: insurance,
      currency: currency,
      coaRequirements: coaRequirements,
      freightLiner: freightLiner,
      commissionDetails: commissionDetails,
      hsCode: hsCode,
      inspectionMethod: inspectionMethod,
      inspectionMethodExternal: inspectionDetails,
      penalty: penalty,
      commissionSelected: commissionSelected || "No",
      remarks: remarks || "",
      memberDetails: [
        {
          department: "Plant Head",
          name: plantHead,
          reviewDepartmentId: plantHeadId,
          signature: dttSignature,
        },
        {
          department: "Senior Manager",
          name: seniorManager,
          reviewDepartmentId: seniorManagerId,
          signature: seniorManagerSignature,
        },
        {
          department: "Business Development",
          name: businessDevelopment,
          reviewDepartmentId: businessDevelopmentId,
          signature: businessDevelopmentSignature,
        },
        {
          department: "Business Development1",
          name: businessDevelopment1,
          reviewDepartmentId: businessDevelopmentId1,
          signature: businessDevelopmentSignature1,
        },
        {
          department: "Development /Purchase",
          name: developmentPurchase,
          reviewDepartmentId: developmentPurchaseId,
          signature: developmentPurchaseSignature,
        },
        {
          department: "Planning",
          name: planning,
          reviewDepartmentId: planningId,
          signature: planningSignature,
        },
        {
          department: "Stores",
          name: stores,
          reviewDepartmentId: storesId,
          signature: storesSignature,
        },
        {
          department: "AB Cotton",
          name: abCotton,
          reviewDepartmentId: abCottonId,
          signature: abCottonSignature,
        },
        {
          department: "Spunlace",
          name: spunlace,
          reviewDepartmentId: spunlaceId,
          signature: spunlaceSignature,
        },
        {
          department: "Pad Punching",
          name: padPunching,
          reviewDepartmentId: padPunchingId,
          signature: padPunchingSignature,
        },
        {
          department: "Ball / Pleat / Wool roll",
          name: ballPleatWoolRoll,
          reviewDepartmentId: ballPleatWoolRollId,
          signature: ballPleatWoolRollSignature,
        },
        {
          department: "Bag Making",
          name: bagMaking,
          reviewDepartmentId: bagMakingId,
          signature: bagMakingSignature,
        },
        {
          department: "QA & QC",
          name: qaQc,
          reviewDepartmentId: qaQcId,
          signature: qaQcSignature,
        },
        {
          department: "Logistic / Dispatch",
          name: logisticDispatch,
          reviewDepartmentId: logisticDispatchId,
          signature: logisticDispatchSignature,
        },
      ],
      productDetails: rows.map((row, index) => ({
        reviewproductId: row.reviewproductId || null,
        srNo: index + 1,
        productName: row.Product,
        pdsNo: row.PDSNo,
        poQtyInBags: row.POQty,
        pricePerBag: row.Price,
        currency: row.currency,
      })),
    };
    console.log("payload", payload);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    let url;
    if (roleauth === "PPC_ASSISTANT") {
      url = `${API.prodUrl}/Precot/api/Ppc/ContractReviewMeeting/Save`;
    } else if (roleauth === "MARKET_REPRESENTATIVE") {
      url = `${API.prodUrl}/Precot/api/Ppc/BussinessContractReviewMeeting/Save`;
    }
    axios
      .post(url, payload, {
        headers,
      })
      .then((res) => {
        console.log("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/PPC/F-003/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSaveLoading(false);
        message.error(err.response?.data?.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      formatName: "CONTRACT REVIEW MEETING",
      formatNo: "PH-PPC01/F-003",
      revisionNo: "2",
      refSopNo: "PH-PPC01-D-02",
      date: state.date,
      unit: "H",
      // details: details || "NA",
      customerName: customerName || Customer1 || "NA",
      billingAddress: billingAddress || "NA",
      shippingAddress: shippingAddress || "NA",
      incoterm: incoterm || "NA",
      piPoNo: piPoNo || "NA",
      approvedsamplereqNo: approvedsamplereqNo || "NA",
      paymentTerm: paymentTerm || "NA",
      plPoDate: plPoDate || "NA",
      finalArtworkApprovedDate: finalArtworkApprovedDate || "NA",
      deliveryTerm: deliveryTerm || "NA",
      customerDispatchDate: customerDispatchDate || "NA",
      firstProductionSample: firstProductionSample || "NA",
      portOfShipment: portOfShipment || "NA",
      plantCommitmentDate: plantCommitmentDate || "NA",
      portOfDestination: portOfDestination || "NA",
      customerMasterSAPNo: customerMasterSAPNo || "NA",
      specialInstructions: specialInstructions || "NA",
      transporter: transporter || "NA",
      priceUpdateStatusInSap: priceUpdateStatusInSap || "NA",
      insurance: insurance || "NA",
      currency: currency || "NA",
      coaRequirements: coaRequirements || "NA",
      freightLiner: freightLiner || "NA",
      commissionDetails: commissionDetails || "NA",
      hsCode: hsCode || "NA",
      inspectionMethod: inspectionMethod || "NA",
      inspectionMethodExternal: inspectionDetails || "NA",
      penalty: penalty || "NA",
      commissionSelected: commissionSelected || "No",
      remarks: remarks || "NA",
      memberDetails: [
        {
          department: "Plant Head",
          name: plantHead,
          reviewDepartmentId: plantHeadId,
          signature: dttSignature,
        },
        {
          department: "Senior Manager",
          name: seniorManager,
          reviewDepartmentId: seniorManagerId,
          signature: seniorManagerSignature,
        },
        {
          department: "Business Development",
          name: businessDevelopment,
          reviewDepartmentId: businessDevelopmentId,
          signature: businessDevelopmentSignature,
        },
        {
          department: "Business Development1",
          name: businessDevelopment1,
          reviewDepartmentId: businessDevelopmentId1,
          signature: businessDevelopmentSignature1,
        },
        {
          department: "Development /Purchase",
          name: developmentPurchase,
          reviewDepartmentId: developmentPurchaseId,
          signature: developmentPurchaseSignature,
        },
        {
          department: "Planning",
          name: planning,
          reviewDepartmentId: planningId,
          signature: planningSignature,
        },
        {
          department: "Stores",
          name: stores,
          reviewDepartmentId: storesId,
          signature: storesSignature,
        },
        {
          department: "AB Cotton",
          name: abCotton,
          reviewDepartmentId: abCottonId,
          signature: abCottonSignature,
        },
        {
          department: "Spunlace",
          name: spunlace,
          reviewDepartmentId: spunlaceId,
          signature: spunlaceSignature,
        },
        {
          department: "Pad Punching",
          name: padPunching,
          reviewDepartmentId: padPunchingId,
          signature: padPunchingSignature,
        },
        {
          department: "Ball / Pleat / Wool roll",
          name: ballPleatWoolRoll,
          reviewDepartmentId: ballPleatWoolRollId,
          signature: ballPleatWoolRollSignature,
        },
        {
          department: "Bag Making",
          name: bagMaking,
          reviewDepartmentId: bagMakingId,
          signature: bagMakingSignature,
        },
        {
          department: "QA & QC",
          name: qaQc,
          reviewDepartmentId: qaQcId,
          signature: qaQcSignature,
        },
        {
          department: "Logistic / Dispatch",
          name: logisticDispatch,
          reviewDepartmentId: logisticDispatchId,
          signature: logisticDispatchSignature,
        },
      ],
      productDetails: rows.map((row, index) => ({
        reviewproductId: row.reviewproductId || null,
        srNo: index + 1,
        productName: row.Product === "" ? "NA" : row.Product,
        pdsNo: row.PDSNo === "" ? "NA" : row.PDSNo,
        poQtyInBags: row.POQty === "" ? "NA" : row.POQty,
        pricePerBag: row.Price === "" ? "NA" : row.Price,
        currency: row.currency === "" ? "NA" : row.currency,
      })),
    };
    console.log("payload", payload);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    let url;
    if (roleauth === "PPC_ASSISTANT") {
      url = `${API.prodUrl}/Precot/api/Ppc/ContractReviewMeeting/Submit`;
    } else if (roleauth === "MARKET_REPRESENTATIVE") {
      url = `${API.prodUrl}/Precot/api/Ppc/BussinessContractReviewMeeting/Submit`;
    }
    axios
      .post(url, payload, { headers })
      .then((res) => {
        console.log("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/PPC/F-003/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const items = [
    {
      key: "1",
      label: <p> Shipment Details - 1</p>,
      children: (
        <div>
          <table
            align="left"
            style={{ height: "100%", width: "100%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <td
                colSpan={140}
                style={{
                  height: "35px",
                  textAlign: "center",
                  fontWeight: "bolder",
                }}
              >
                Details{" "}
              </td>
            </tr>
            <tr>
              <td
                colSpan={50}
                style={{
                  height: "35px",
                  paddingLeft: "15px",
                  textAlign: "start",
                }}
              >
                Customer Name:
              </td>
              <td colSpan={90}>
                <input
                  style={{ paddingLeft: "15px", textAlign: "start" }}
                  className="inp-new"
                  value={Customer1}
                  //onChange={(e) => setCustomerName(e.target.value)}
                  // disabled={
                  //   (roleauth === "MARKET_REPRESENTATIVE" && editResponse?.marketRepresentativeStatus === "MARKET_REPRESENTATIVE_APPROVED") ||
                  //   (roleauth === "PPC_ASSISTANT" && (
                  //     editResponse?.marketRepresentativeStatus !== "MARKET_REPRESENTATIVE_APPROVED" ||
                  //     editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  //   ))
                  // }
                  disabled
                />
              </td>
            </tr>

            {/* Billing and Shipping Address */}
            <tr>
              <td
                colSpan={20}
                style={{
                  height: "100%",
                  paddingLeft: "15px",
                  textAlign: "start",
                }}
              >
                Billing address:
              </td>
              <td colSpan={60} style={{ height: "100%", textAlign: "center" }}>
                <textarea
                  className="inp-new"
                  value={billingAddress}
                  style={{
                    minWidth: "100%",
                    minHeight: "125px",
                    textAlign: "left",
                  }}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td
                colSpan={40}
                style={{
                  height: "100%",
                  paddingLeft: "15px",
                  textAlign: "start",
                }}
              >
                Shipping address:
              </td>
              <td colSpan={20} style={{ height: "100%", textAlign: "left" }}>
                <textarea
                  className="inp-new"
                  value={shippingAddress}
                  style={{
                    minWidth: "100%",
                    minHeight: "125px",
                    textAlign: "left",
                  }}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
            </tr>

            {/* Other fields */}
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Incoterm:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                PI/PO No.:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={piPoNo}
                  onChange={(e) => setPiPoNo(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Approved Sample Req. No.:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={approvedsamplereqNo}
                  onChange={(e) => setApprovedsamplereqNo(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Payment Term:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                PI/PO Date :{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={plPoDate}
                  max={today}
                  onChange={(e) => setPlPoDate(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Final artworks approved date:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={finalArtworkApprovedDate}
                  max={today}
                  onChange={(e) => setFinalArtworkApprovedDate(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Delivery Term:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={deliveryTerm}
                  onChange={(e) => setDeliveryTerm(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Customer required dispatch date:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  value={customerDispatchDate}
                  max={today}
                  onChange={(e) => setCustomerDispatchDate(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                First production sample requirements (Yes/No) :<br /> if yes,
                only possible during bulk production
              </td>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                <Select
                  value={firstProductionSample}
                  placeholder="Select or Enter Value"
                  onChange={(value) => setFirstProductionSample(value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setFirstProductionSample(e.target.value);
                    }
                  }}
                  showSearch
                  filterOption={false}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                  style={{ border: "none", width: "100%" }}
                >
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Port of Shipment :{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={portOfShipment}
                  onChange={(e) => setPortOfShipment(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Plant commitment date:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={plantCommitmentDate}
                  max={today}
                  onChange={(e) => setPlantCommitmentDate(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Port of Destination:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={portOfDestination}
                  onChange={(e) => setPortOfDestination(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Customer Master SAP No.:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={customerMasterSAPNo}
                  onChange={(e) => setCustomerMasterSAPNo(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                Special instructions for packing & Packaging :{" "}
              </td>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p> Shipment Details - 2</p>,
      children: (
        <div>
          <table
            align="left"
            style={{ height: "100%", width: "100%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Transporter :{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={transporter}
                  onChange={(e) => setTransporter(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Price updated status in SAP:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={priceUpdateStatusInSap}
                  onChange={(e) => setPriceUpdateStatusInSap(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Insurance :{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Currency :{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                COA Requirements for shipment:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={coaRequirements}
                  onChange={(e) => setCoaRequirements(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Freight Liner:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={freightLiner}
                  onChange={(e) => setFreightLiner(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                HS Code :{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={hsCode}
                  onChange={(e) => setHsCode(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Penalty:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                ></input>
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                Commission (Yes/No) - if yes, update details here
              </td>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                <Select
                  onChange={handleCommissionChange}
                  showSearch
                  filterOption={false}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCommissionSelected(e.target.value);
                    }
                  }}
                  value={commissionSelected}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                  style={{ border: "none", width: "100%", textAlign: "center" }}
                >
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
                {commissionSelected === "Yes" && (
                  <input
                    className="inp-new"
                    value={commissionDetails}
                    onChange={handleCommissionDetailsChange}
                    placeholder="Fill the details here"
                    style={{ height: "auto", width: "auto" }}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "auto", textAlign: "center" }}>
                Inspection Method (Precot/External) :
                <br />
                If external,give brief details
              </td>
              <td
                colSpan={70}
                style={{
                  height: "65px",
                  textAlign: "center",
                  alignContent: "space-evenly",
                }}
              >
                <Select
                  className="inp-new"
                  value={inspectionMethod}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setInspectionMethod(e.target.value);
                    }
                  }}
                  showSearch
                  filterOption={false}
                  onChange={(value) => setInspectionMethod(value)}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                >
                  <Select.Option value="Internal">
                    Precot Standard
                  </Select.Option>
                </Select>
                {inspectionMethod === "External" && (
                  <input
                    className="inp-new"
                    placeholder="Enter details"
                    style={{ marginTop: "20px" }}
                    value={inspectionDetails}
                    onChange={(e) => setInspectionDetails(e.target.value)}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Products</p>,
      children: (
        <div>
          <table
            align="left"
            style={{ height: "100%", width: "100%", margin: "auto" }}
          >
            <thead>
              <tr>
                <td colSpan={5} style={{ height: "35px", textAlign: "center" }}>
                  Sr. No.
                </td>
                <td
                  colSpan={35}
                  style={{ height: "35px", textAlign: "center", width: "40px" }}
                >
                  Product
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  PDS No.
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  PO Qty. in Bags
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Price / Bag
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Currency
                </td>
              </tr>
            </thead>
            {rows.map((row, index) => (
              <tr key={index}>
                <td colSpan={5} style={{ height: "35px", textAlign: "left" }}>
                  <Input className="inp-new" value={index + 1} disabled />
                </td>
                <td colSpan={35} style={{ height: "35px", textAlign: "start" }}>
                  <TextArea
                    style={{ textAlign: "start" }}
                    className="inp-new"
                    value={row.Product}
                    onChange={(e) =>
                      handleInputChange(index, "Product", e.target.value)
                    }
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                    placeholder="Product"
                  />
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <Input
                    className="inp-new"
                    value={row.PDSNo}
                    onChange={(e) =>
                      handleInputChange(index, "PDSNo", e.target.value)
                    }
                    placeholder="PDS No."
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <Input
                    className="inp-new"
                    value={row.POQty}
                    onChange={(e) =>
                      handleInputChange(index, "POQty", e.target.value)
                    }
                    placeholder="PO Qty in bags"
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <Input
                    className="inp-new"
                    value={row.Price}
                    onChange={(e) =>
                      handleInputChange(index, "Price", e.target.value)
                    }
                    placeholder=" Price/Bags"
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <Select
                    className="inp-new"
                    value={row.currency}
                    placeholder="Currency"
                    style={{ width: "180px" }}
                    showSearch
                    filterOption={false}
                    onChange={(value) =>
                      handleInputChange(index, "currency", value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleInputChange(index, "currency", e.target.value);
                      }
                    }}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  >
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="INR">INR</Select.Option>
                    <Select.Option value="EURO">EURO</Select.Option>
                  </Select>
                </td>
                {index !== 0 &&
                  editResponse?.assistantStatus !== "ASSISANT_SAVED" &&
                  editResponse?.assistantStatus !== "ASSISANT_APPROVED" &&
                  editResponse?.marketRepresentativeStatus !==
                    "MARKET_REPRESENTATIVE_APPROVED" && (
                    <button
                      onClick={() => removeRow(index)}
                      style={{
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px",
                        fontSize: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      <DeleteTwoTone
                        style={{ fontSize: "20px", color: "red" }}
                      />
                    </button>
                  )}
              </tr>
            ))}
            {editResponse?.assistantStatus !== "ASSISANT_SAVED" &&
              editResponse?.assistantStatus !== "ASSISANT_APPROVED" &&
              editResponse?.marketRepresentativeStatus !==
                "MARKET_REPRESENTATIVE_APPROVED" && (
                <button
                  onClick={addRow}
                  style={{
                    backgroundColor: "green",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    fontSize: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    display: canDisplay(),
                  }}
                >
                  <PlusOutlined style={{ marginRight: "8px" }} />
                  Add Row
                </button>
              )}
          </table>
          <p>Remarks: </p>
          <Input.TextArea
            className="new-inp"
            style={{ paddingTop: "5px", minHeight: "90px" }}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            disabled={
              (roleauth === "MARKET_REPRESENTATIVE" &&
                editResponse?.marketRepresentativeStatus ===
                  "MARKET_REPRESENTATIVE_APPROVED") ||
              (roleauth === "PPC_ASSISTANT" &&
                (editResponse?.marketRepresentativeStatus !==
                  "MARKET_REPRESENTATIVE_APPROVED" ||
                  editResponse?.assistantStatus === "ASSISANT_APPROVED"))
            }
          />
        </div>
      ),
    },
    {
      key: "4",
      label: <p> Attachment </p>,
      children: (
        <div>
          <div style={{ padding: "20px", alignContent: "center" }}>
            <List
              loading={loading}
              dataSource={excelData}
              renderItem={(item) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <span style={{ flex: 1 }}>{item.value}</span>
                    {/* {
                      (roleauth === "MARKET_REPRESENTATIVE" && editResponse?.marketRepresentativeStatus !== "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" && (
                        editResponse?.marketRepresentativeStatus === "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus !== "ASSISANT_APPROVED"
                      )) && */}
                    <Button
                      type="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(item.id)}
                    ></Button>
                    {/* } */}
                  </div>
                </List.Item>
              )}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Upload
              beforeUpload={(file) => {
                handleUpload(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
                disabled={
                  (roleauth === "MARKET_REPRESENTATIVE" &&
                    editResponse?.marketRepresentativeStatus ===
                      "MARKET_REPRESENTATIVE_APPROVED") ||
                  (roleauth === "PPC_ASSISTANT" &&
                    (editResponse?.marketRepresentativeStatus !==
                      "MARKET_REPRESENTATIVE_APPROVED" ||
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                }
              >
                Upload Excel File
              </Button>
            </Upload>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={handleDownload}
            >
              Download Excel File
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "5",
      label: <p> Members Details - 1 </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ height: "100%", width: "70%", margin: "auto" }}
            pagination={{ pageSize: 5 }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center", width: "20%" }}>
                  Department
                </th>
                <th style={{ width: "40%" }}>Name</th>
                <th style={{ width: "40%" }}>Sign</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ height: "50px" }}>Plant Head</td>
                <td>
                  <input
                    className="inp-new"
                    value={plantHead}
                    onChange={(e) => setPlantHead(e.target.value)}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                    !dttSignature ? (
                      <div>
                        <SignatureCanvas
                          ref={(ref) =>
                            (signatureRefs.current["PlantHead"] = ref)
                          }
                          penColor="green"
                          canvasProps={{
                            width: 300,
                            height: 100,
                            className: "sigCanvas",
                          }}
                          backgroundColor="#f9e5e1"
                        />
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            type="primary"
                            onClick={() => {
                              const canvas = signatureRefs.current["PlantHead"];
                              if (canvas) {
                                canvas.getTrimmedCanvas().toBlob((blob) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64Signature =
                                      reader.result.split(",")[1];
                                    setDttSignature(base64Signature);
                                  };
                                  reader.readAsDataURL(blob);
                                }, "image/png");
                              }
                            }}
                          >
                            Save Signature
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              const canvas = signatureRefs.current["PlantHead"];
                              if (canvas) {
                                canvas.clear();
                                setDttSignature("");
                              }
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`data:image/png;base64,${dttSignature}`}
                        alt="Signature"
                        style={{ height: "35px" }}
                      />
                    )
                  ) : dttSignature ? (
                    <img
                      src={`data:image/png;base64,${dttSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  ) : (
                    "No signature selected"
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ height: "35px" }}>Senior Manager</td>
                <td>
                  <input
                    className="inp-new"
                    value={seniorManager}
                    onChange={(e) => setSeniorManager(e.target.value)}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                    !seniorManagerSignature ? (
                      <div>
                        <SignatureCanvas
                          ref={(ref) =>
                            (signatureRefs.current["SeniorManager"] = ref)
                          }
                          penColor="green"
                          canvasProps={{
                            width: 300,
                            height: 100,
                            className: "sigCanvas",
                          }}
                          backgroundColor="#f9e5e1"
                        />
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            type="primary"
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["SeniorManager"];
                              if (canvas) {
                                canvas.getTrimmedCanvas().toBlob((blob) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64Signature =
                                      reader.result.split(",")[1];
                                    setSeniorManagerSignature(base64Signature);
                                  };
                                  reader.readAsDataURL(blob);
                                }, "image/png");
                              }
                            }}
                          >
                            Save Signature
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["SeniorManager"];
                              if (canvas) {
                                canvas.clear();
                                setSeniorManagerSignature("");
                              }
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`data:image/png;base64,${seniorManagerSignature}`}
                        alt="Signature"
                        style={{ height: "35px" }}
                      />
                    )
                  ) : seniorManagerSignature ? (
                    <img
                      src={`data:image/png;base64,${seniorManagerSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  ) : (
                    "No signature selected"
                  )}
                </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ height: "75px" }}>
                  Business Development
                </td>
                <td rowSpan={2}>
                  <input
                    className="inp-new"
                    value={businessDevelopment}
                    onChange={(e) => {
                      setBusinessDevelopment(e.target.value);
                    }}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />

                  <input
                    className="inp-new"
                    value={businessDevelopment1}
                    onChange={(e) => {
                      setBusinessDevelopment1(e.target.value);
                    }}
                    style={{ paddingTop: "50px" }}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                    !businessDevelopmentSignature ? (
                      <div>
                        <SignatureCanvas
                          ref={(ref) =>
                            (signatureRefs.current["BusinessDevelopment"] = ref)
                          }
                          penColor="green"
                          canvasProps={{
                            width: 300,
                            height: 100,
                            className: "sigCanvas",
                          }}
                          backgroundColor="#f9e5e1"
                        />
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            type="primary"
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["BusinessDevelopment"];
                              if (canvas) {
                                canvas.getTrimmedCanvas().toBlob((blob) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64Signature =
                                      reader.result.split(",")[1];
                                    setBusinessDevelopmentSignature(
                                      base64Signature
                                    );
                                  };
                                  reader.readAsDataURL(blob);
                                }, "image/png");
                              }
                            }}
                          >
                            Save Signature
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["BusinessDevelopment"];
                              if (canvas) {
                                canvas.clear();
                                setBusinessDevelopmentSignature("");
                              }
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`data:image/png;base64,${businessDevelopmentSignature}`}
                        alt="Signature"
                        style={{ height: "35px" }}
                      />
                    )
                  ) : businessDevelopmentSignature ? (
                    <img
                      src={`data:image/png;base64,${businessDevelopmentSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  ) : (
                    "No signature selected"
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                    !businessDevelopmentSignature1 ? (
                      <div>
                        <SignatureCanvas
                          ref={(ref) =>
                            (signatureRefs.current["BusinessDevelopment1"] =
                              ref)
                          }
                          penColor="green"
                          canvasProps={{
                            width: 300,
                            height: 100,
                            className: "sigCanvas",
                          }}
                          backgroundColor="#f9e5e1"
                        />
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            type="primary"
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["BusinessDevelopment1"];
                              if (canvas) {
                                canvas.getTrimmedCanvas().toBlob((blob) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64Signature =
                                      reader.result.split(",")[1];
                                    setBusinessDevelopmentSignature1(
                                      base64Signature
                                    );
                                  };
                                  reader.readAsDataURL(blob);
                                }, "image/png");
                              }
                            }}
                          >
                            Save Signature
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["BusinessDevelopment1"];
                              if (canvas) {
                                canvas.clear();
                                setBusinessDevelopmentSignature1("");
                              }
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`data:image/png;base64,${businessDevelopmentSignature1}`}
                        alt="Signature"
                        style={{ height: "35px" }}
                      />
                    )
                  ) : businessDevelopmentSignature1 ? (
                    <img
                      src={`data:image/png;base64,${businessDevelopmentSignature1}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  ) : (
                    "No signature selected"
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ height: "35px" }}>Development / Purchase</td>
                <td>
                  <input
                    className="inp-new"
                    value={developmentPurchase}
                    onChange={(e) => {
                      setDevelopmentPurchase(e.target.value);
                    }}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                    !developmentPurchaseSignature ? (
                      <div>
                        <SignatureCanvas
                          ref={(ref) =>
                            (signatureRefs.current["Development / Purchase"] =
                              ref)
                          }
                          penColor="green"
                          canvasProps={{
                            width: 300,
                            height: 100,
                            className: "sigCanvas",
                          }}
                          backgroundColor="#f9e5e1"
                        />
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            type="primary"
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["Development / Purchase"];
                              if (canvas) {
                                canvas.getTrimmedCanvas().toBlob((blob) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64Signature =
                                      reader.result.split(",")[1];
                                    setDevelopmentPurchaseSignature(
                                      base64Signature
                                    );
                                  };
                                  reader.readAsDataURL(blob);
                                }, "image/png");
                              }
                            }}
                          >
                            Save Signature
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              const canvas =
                                signatureRefs.current["Development / Purchase"];
                              if (canvas) {
                                canvas.clear();
                                setDevelopmentPurchaseSignature("");
                              }
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`data:image/png;base64,${developmentPurchaseSignature}`}
                        alt="Signature"
                        style={{ height: "35px" }}
                      />
                    )
                  ) : developmentPurchaseSignature ? (
                    <img
                      src={`data:image/png;base64,${developmentPurchaseSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  ) : (
                    "No signature selected"
                  )}
                </td>
              </tr>

              <tr>
                <td style={{ height: "35px" }}>Planning</td>
                <td>
                  <input
                    className="inp-new"
                    value={planning}
                    onChange={(e) => {
                      setPlanning(e.target.value);
                    }}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                    !planningSignature ? (
                      <div>
                        <SignatureCanvas
                          ref={(ref) =>
                            (signatureRefs.current["Planning"] = ref)
                          }
                          penColor="green"
                          canvasProps={{
                            width: 300,
                            height: 100,
                            className: "sigCanvas",
                          }}
                          backgroundColor="#f9e5e1"
                        />
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            type="primary"
                            onClick={() => {
                              const canvas = signatureRefs.current["Planning"];
                              if (canvas) {
                                canvas.getTrimmedCanvas().toBlob((blob) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64Signature =
                                      reader.result.split(",")[1];
                                    setPlanningSignature(base64Signature);
                                  };
                                  reader.readAsDataURL(blob);
                                }, "image/png");
                              }
                            }}
                          >
                            Save Signature
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              const canvas = signatureRefs.current["Planning"];
                              if (canvas) {
                                canvas.clear();
                                setPlanningSignature("");
                              }
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`data:image/png;base64,${planningSignature}`}
                        alt="Signature"
                        style={{ height: "35px" }}
                      />
                    )
                  ) : planningSignature ? (
                    <img
                      src={`data:image/png;base64,${planningSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  ) : (
                    "No signature selected"
                  )}
                </td>
              </tr>

              <tr>
                <td style={{ height: "35px" }}>Stores</td>
                <td>
                  <input
                    className="inp-new"
                    value={stores}
                    onChange={(e) => {
                      setStores(e.target.value);
                    }}
                    disabled={
                      (roleauth === "MARKET_REPRESENTATIVE" &&
                        editResponse?.marketRepresentativeStatus ===
                          "MARKET_REPRESENTATIVE_APPROVED") ||
                      (roleauth === "PPC_ASSISTANT" &&
                        (editResponse?.marketRepresentativeStatus !==
                          "MARKET_REPRESENTATIVE_APPROVED" ||
                          editResponse?.assistantStatus ===
                            "ASSISANT_APPROVED"))
                    }
                  />
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                    !storesSignature ? (
                      <div>
                        <SignatureCanvas
                          ref={(ref) => (signatureRefs.current["Stores"] = ref)}
                          penColor="green"
                          canvasProps={{
                            width: 300,
                            height: 100,
                            className: "sigCanvas",
                          }}
                          backgroundColor="#f9e5e1"
                        />
                        <div style={{ marginTop: "10px" }}>
                          <Button
                            type="primary"
                            onClick={() => {
                              const canvas = signatureRefs.current["Stores"];
                              if (canvas) {
                                canvas.getTrimmedCanvas().toBlob((blob) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const base64Signature =
                                      reader.result.split(",")[1];
                                    setStoresSignature(base64Signature);
                                  };
                                  reader.readAsDataURL(blob);
                                }, "image/png");
                              }
                            }}
                          >
                            Save Signature
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              const canvas = signatureRefs.current["Stores"];
                              if (canvas) {
                                canvas.clear();
                                setStoresSignature("");
                              }
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={`data:image/png;base64,${storesSignature}`}
                        alt="Signature"
                        style={{ height: "35px" }}
                      />
                    )
                  ) : storesSignature ? (
                    <img
                      src={`data:image/png;base64,${storesSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  ) : (
                    "No signature selected"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "6",
      label: <p> Members Details -2 </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ height: "100%", width: "70%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <th style={{ textAlign: "center", width: "20%" }}>Department</th>
              <th style={{ width: "40%" }}>Name</th>
              <th style={{ width: "40%" }}>Sign</th>
            </tr>
            <tr>
              <td style={{ height: "35px" }}>AB Cotton</td>
              <td>
                <input
                  className="inp-new"
                  value={abCotton}
                  onChange={(e) => {
                    setAbCotton(e.target.value);
                  }}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                  !abCottonSignature ? (
                    <div>
                      <SignatureCanvas
                        ref={(ref) =>
                          (signatureRefs.current["AB Cotton"] = ref)
                        }
                        penColor="green"
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "sigCanvas",
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            const canvas = signatureRefs.current["AB Cotton"];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64Signature =
                                    reader.result.split(",")[1];
                                  setAbCottonSignature(base64Signature);
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save Signature
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            const canvas = signatureRefs.current["AB Cotton"];
                            if (canvas) {
                              canvas.clear();
                              setAbCottonSignature("");
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${abCottonSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  )
                ) : abCottonSignature ? (
                  <img
                    src={`data:image/png;base64,${abCottonSignature}`}
                    alt="Signature"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "No signature selected"
                )}
              </td>
            </tr>

            <tr>
              <td style={{ height: "35px" }}>Spunlace</td>
              <td>
                <input
                  className="inp-new"
                  value={spunlace}
                  onChange={(e) => {
                    setSpunlace(e.target.value);
                  }}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                  !spunlaceSignature ? (
                    <div>
                      <SignatureCanvas
                        ref={(ref) => (signatureRefs.current["Spunlace"] = ref)}
                        penColor="green"
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "sigCanvas",
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            const canvas = signatureRefs.current["Spunlace"];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64Signature =
                                    reader.result.split(",")[1];
                                  setSpunlaceSignature(base64Signature);
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save Signature
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            const canvas = signatureRefs.current["Spunlace"];
                            if (canvas) {
                              canvas.clear();
                              setSpunlaceSignature("");
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${spunlaceSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  )
                ) : spunlaceSignature ? (
                  <img
                    src={`data:image/png;base64,${spunlaceSignature}`}
                    alt="Signature"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "No signature selected"
                )}
              </td>
            </tr>

            <tr>
              <td style={{ height: "35px" }}>Pad Punching</td>
              <td>
                <input
                  className="inp-new"
                  value={padPunching}
                  onChange={(e) => {
                    setPadPunching(e.target.value);
                  }}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                  !padPunchingSignature ? (
                    <div>
                      <SignatureCanvas
                        ref={(ref) =>
                          (signatureRefs.current["Pad Punching"] = ref)
                        }
                        penColor="green"
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "sigCanvas",
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            const canvas =
                              signatureRefs.current["Pad Punching"];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64Signature =
                                    reader.result.split(",")[1];
                                  setPadPunchingSignature(base64Signature);
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save Signature
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            const canvas =
                              signatureRefs.current["Pad Punching"];
                            if (canvas) {
                              canvas.clear();
                              setPadPunchingSignature("");
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${padPunchingSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  )
                ) : padPunchingSignature ? (
                  <img
                    src={`data:image/png;base64,${padPunchingSignature}`}
                    alt="Signature"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "No signature selected"
                )}
              </td>
            </tr>

            <tr>
              <td style={{ height: "35px" }}>Ball / Pleat / Wool roll</td>
              <td>
                <input
                  className="inp-new"
                  value={ballPleatWoolRoll}
                  onChange={(e) => {
                    setBallPleatWoolRoll(e.target.value);
                  }}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                  !ballPleatWoolRollSignature ? (
                    <div>
                      <SignatureCanvas
                        ref={(ref) =>
                          (signatureRefs.current["Ball / Pleat / Wool roll"] =
                            ref)
                        }
                        penColor="green"
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "sigCanvas",
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            const canvas =
                              signatureRefs.current["Ball / Pleat / Wool roll"];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64Signature =
                                    reader.result.split(",")[1];
                                  setBallPleatWoolRollSignature(
                                    base64Signature
                                  );
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save Signature
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            const canvas =
                              signatureRefs.current["Ball / Pleat / Wool roll"];
                            if (canvas) {
                              canvas.clear();
                              setBallPleatWoolRollSignature("");
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${ballPleatWoolRollSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  )
                ) : ballPleatWoolRollSignature ? (
                  <img
                    src={`data:image/png;base64,${ballPleatWoolRollSignature}`}
                    alt="Signature"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "No signature selected"
                )}
              </td>
            </tr>

            <tr>
              <td style={{ height: "35px" }}>Bag Making</td>
              <td>
                <input
                  className="inp-new"
                  value={bagMaking}
                  onChange={(e) => {
                    setBagMaking(e.target.value);
                  }}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                  !bagMakingSignature ? (
                    <div>
                      <SignatureCanvas
                        ref={(ref) =>
                          (signatureRefs.current["Bag Making"] = ref)
                        }
                        penColor="green"
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "sigCanvas",
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            const canvas = signatureRefs.current["Bag Making"];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64Signature =
                                    reader.result.split(",")[1];
                                  setBagMakingSignature(base64Signature);
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save Signature
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            const canvas = signatureRefs.current["Bag Making"];
                            if (canvas) {
                              canvas.clear();
                              setBagMakingSignature("");
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${bagMakingSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  )
                ) : bagMakingSignature ? (
                  <img
                    src={`data:image/png;base64,${bagMakingSignature}`}
                    alt="Signature"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "No signature selected"
                )}
              </td>
            </tr>

            <tr>
              <td style={{ height: "35px" }}>QA & QC</td>
              <td>
                <input
                  className="inp-new"
                  value={qaQc}
                  onChange={(e) => {
                    setQaQc(e.target.value);
                  }}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                  !qaQcSignature ? (
                    <div>
                      <SignatureCanvas
                        ref={(ref) => (signatureRefs.current["QA & QC"] = ref)}
                        penColor="green"
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "sigCanvas",
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            const canvas = signatureRefs.current["QA & QC"];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64Signature =
                                    reader.result.split(",")[1];
                                  setQaQcSignature(base64Signature);
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save Signature
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            const canvas = signatureRefs.current["QA & QC"];
                            if (canvas) {
                              canvas.clear();
                              setQaQcSignature("");
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${qaQcSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  )
                ) : qaQcSignature ? (
                  <img
                    src={`data:image/png;base64,${qaQcSignature}`}
                    alt="Signature"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "No signature selected"
                )}
              </td>
            </tr>

            <tr>
              <td style={{ height: "35px" }}>Logistic / Dispatch</td>
              <td>
                <input
                  className="inp-new"
                  value={logisticDispatch}
                  onChange={(e) => {
                    setLogisticDispatch(e.target.value);
                  }}
                  disabled={
                    (roleauth === "MARKET_REPRESENTATIVE" &&
                      editResponse?.marketRepresentativeStatus ===
                        "MARKET_REPRESENTATIVE_APPROVED") ||
                    (roleauth === "PPC_ASSISTANT" &&
                      (editResponse?.marketRepresentativeStatus !==
                        "MARKET_REPRESENTATIVE_APPROVED" ||
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"))
                  }
                />
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                  !logisticDispatchSignature ? (
                    <div>
                      <SignatureCanvas
                        ref={(ref) =>
                          (signatureRefs.current["Logistic / Dispatch"] = ref)
                        }
                        penColor="green"
                        canvasProps={{
                          width: 300,
                          height: 100,
                          className: "sigCanvas",
                        }}
                        backgroundColor="#f9e5e1"
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            const canvas =
                              signatureRefs.current["Logistic / Dispatch"];
                            if (canvas) {
                              canvas.getTrimmedCanvas().toBlob((blob) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64Signature =
                                    reader.result.split(",")[1];
                                  setLogisticDispatchSignature(base64Signature);
                                };
                                reader.readAsDataURL(blob);
                              }, "image/png");
                            }
                          }}
                        >
                          Save Signature
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            const canvas =
                              signatureRefs.current["Logistic / Dispatch"];
                            if (canvas) {
                              canvas.clear();
                              setLogisticDispatchSignature("");
                            }
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${logisticDispatchSignature}`}
                      alt="Signature"
                      style={{ height: "35px" }}
                    />
                  )
                ) : logisticDispatchSignature ? (
                  <img
                    src={`data:image/png;base64,${logisticDispatchSignature}`}
                    alt="Signature"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "No signature selected"
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
      <>
        <BleachingHeader
          unit="Unit-H"
          formName="CONTRACT REVIEW MEETING"
          formatNo="PH-PPC01/F-003"
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[
            (roleauth === "PPC_ASSISTANT" || "MARKET_REPRESENTATIVE") && (
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
                  onClick={handleSave}
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
                    display: canDisplayButtons(),
                  }}
                  icon={<GrDocumentStore color="#00308F" />}
                  onClick={handleSubmit}
                  shape="round"
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
                marginRight: "20px",
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
                if (window.confirm("Are you sure you want to logout?")) {
                  localStorage.removeItem("token");
                  navigate("/Precot");
                }
              }}
            >
              Logout
            </Button>,
            <Tooltip
              trigger="click"
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
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Input
            addonBefore="Date:"
            placeholder="Date"
            required
            value={date1}
            max={today}
            disabled
            style={{ width: "15%", height: "35px" }}
          />
          <Input
            addonBefore="Customer Name"
            placeholder="Customer Name"
            required
            value={Customer1}
            disabled
            style={{ width: "30%", height: "35px", textAlign: "left" }}
          />
        </div>

        <div style={{ paddingBottom: "2em" }}></div>

        <Row>
          <Tabs
            items={items}
            style={{
              width: "90%",
              position: "relative",
              left: "2%",
            }}
          />
        </Row>
      </>
    </div>
  );
};

export default PPC_f003;
