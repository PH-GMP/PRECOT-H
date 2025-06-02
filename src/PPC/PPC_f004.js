/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Row, Select, Tabs, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader.js";

import SignatureCanvas from "react-signature-canvas";
import API from "../baseUrl.json";

import { DeleteOutlined, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const { Option } = Select;
const PPC_f004 = () => {
  const { state } = useLocation();
  const signatureRefs = useRef({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [brand, setBrand] = useState(null);
  const [productCode, setProductCode] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [pdsNo, setPdsNo] = useState("");
  const [assistantStatus, setAssistantStatus] = useState("");
  const [departmentList, setdepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [newparticipant, setNewparticipant] = useState("");
  const [saveDisable, setSaveDisable] = useState(false);

  const [detailsMeeting, setDetailsMeeting] = useState([]);
  const [id, setId] = useState(null);
  const [meetingid, setMeetingId] = useState(null);

  const [customerObservations, setCustomerObservations] = useState("");
  const [customerSOP, setCustomerSOP] = useState("");

  const [brandObservations, setBrandObservations] = useState("");
  const [brandSOP, setBrandSOP] = useState("");

  const [productCodeObservations, setProductCodeObservations] = useState("");
  const [productCodeSOP, setProductCodeSOP] = useState("");

  const [productDescriptionObservations, setProductDescriptionObservations] =
    useState("");
  const [productDescriptionSOP, setProductDescriptionSOP] = useState("");

  const [outerCartonArtwork, setOuterCartonArtwork] = useState("");
  const [outerCartonArtworkSOP, setOuterCartonArtworkSOP] = useState("");
  const [outerCartonArtworkObservations, setOuterCartonArtworkObservations] =
    useState("");

  const [outerCartonBarcode, setOuterCartonBarcode] = useState("");
  const [outerCartonBarcodeSOP, setOuterCartonBarcodeSOP] = useState("");
  const [outerCartonBarcodeObservations, setOuterCartonBarcodeObservations] =
    useState("");

  const [outerCartonDimensionLWH, setOuterCartonDimensionLWH] = useState("");
  const [outerCartonDimensionLWH_SOP, setOuterCartonDimensionLWH_SOP] =
    useState("");
  const [
    outerCartonDimensionLWHObservations,
    setOuterCartonDimensionLWHObservations,
  ] = useState("");

  const [outerCartonStamp, setOuterCartonStamp] = useState("");
  const [outerCartonStampSOP, setOuterCartonStampSOP] = useState("");
  const [outerCartonStampObservations, setOuterCartonStampObservations] =
    useState("");

  const [odour, setOdour] = useState("");
  const [odourSOP, setOdourSOP] = useState("");
  const [odourObservations, setOdourObservations] = useState("");

  const [innerCartonArtwork, setInnerCartonArtwork] = useState("");
  const [innerCartonArtworkSOP, setInnerCartonArtworkSOP] = useState("");
  const [innerCartonArtworkObservations, setInnerCartonArtworkObservations] =
    useState("");

  const [innerCartonBarcode, setInnerCartonBarcode] = useState("");
  const [innerCartonBarcodeSOP, setInnerCartonBarcodeSOP] = useState("");
  const [innerCartonBarcodeObservations, setInnerCartonBarcodeObservations] =
    useState("");

  const [innerCartonDimensionLWH, setInnerCartonDimensionLWH] = useState("");
  const [innerCartonDimensionLWH_SOP, setInnerCartonDimensionLWH_SOP] =
    useState("");
  const [
    innerCartonDimensionLWHObservations,
    setInnerCartonDimensionLWHObservations,
  ] = useState("");

  const [innerCartonStamp, setInnerCartonStamp] = useState("");
  const [innerCartonStampSOP, setInnerCartonStampSOP] = useState("");
  const [innerCartonStampObservations, setInnerCartonStampObservations] =
    useState("");

  const [bagAppearance, setBagAppearance] = useState("");
  const [bagAppearanceSOP, setBagAppearanceSOP] = useState("");
  const [bagAppearanceObservations, setBagAppearanceObservations] =
    useState("");

  const [celloTapShape, setCelloTapShape] = useState("");
  const [celloTapShapeSOP, setCelloTapShapeSOP] = useState("");
  const [celloTapShapeObservations, setCelloTapShapeObservations] =
    useState("");

  const [bagOrientation, setBagOrientation] = useState("");
  const [bagOrientationSOP, setBagOrientationSOP] = useState("");
  const [bagOrientationObservations, setBagOrientationObservations] =
    useState("");

  const [noOfInnerBox, setNoOfInnerBox] = useState("");
  const [noOfInnerBoxSOP, setNoOfInnerBoxSOP] = useState("");
  const [noOfInnerBoxObservations, setNoOfInnerBoxObservations] = useState("");

  const [noOfPacksPerOuterBag, setNoOfPacksPerOuterBag] = useState("");
  const [noOfPacksPerOuterBagSOP, setNoOfPacksPerOuterBagSOP] = useState("");
  const [
    noOfPacksPerOuterBagObservations,
    setNoOfPacksPerOuterBagObservations,
  ] = useState("");

  const [noOfPacksPerInnerCarton, setNoOfPacksPerInnerCarton] = useState("");
  const [noOfPacksPerInnerCartonSOP, setNoOfPacksPerInnerCartonSOP] =
    useState("");
  const [
    noOfPacksPerInnerCartonObservations,
    setNoOfPacksPerInnerCartonObservations,
  ] = useState("");

  const [noOfPacksPerOuterCarton, setNoOfPacksPerOuterCarton] = useState("");
  const [noOfPacksPerOuterCartonSOP, setNoOfPacksPerOuterCartonSOP] =
    useState("");
  const [
    noOfPacksPerOuterCartonObservations,
    setNoOfPacksPerOuterCartonObservations,
  ] = useState("");

  const [innerBoxArtwork, setInnerBoxArtwork] = useState("");
  const [innerBoxArtworkSOP, setInnerBoxArtworkSOP] = useState("");
  const [innerBoxArtworkObservations, setInnerBoxArtworkObservations] =
    useState("");

  const [cartonBoxArtwork, setCartonBoxArtwork] = useState("");
  const [cartonBoxArtworkSOP, setCartonBoxArtworkSOP] = useState("");
  const [cartonBoxArtworkObservations, setCartonBoxArtworkObservations] =
    useState("");

  const [outerBagArtwork, setOuterBagArtwork] = useState("");
  const [outerBagArtworkSOP, setOuterBagArtworkSOP] = useState("");
  const [outerBagArtworkObservations, setOuterBagArtworkObservations] =
    useState("");

  const [outerBagLotcode, setOuterBagLotcode] = useState("");
  const [outerBagLotcodeSOP, setOuterBagLotcodeSOP] = useState("");
  const [outerBagLotcodeObservations, setOuterBagLotcodeObservations] =
    useState("");

  const [outerBagBarcode, setOuterBagBarcode] = useState("");
  const [outerBagBarcodeSOP, setOuterBagBarcodeSOP] = useState("");
  const [outerBagBarcodeObservations, setOuterBagBarcodeObservations] =
    useState("");

  const [innerBagArtwork, setInnerBagArtwork] = useState("");
  const [innerBagArtworkSOP, setInnerBagArtworkSOP] = useState("");
  const [innerBagArtworkObservations, setInnerBagArtworkObservations] =
    useState("");

  const [innerBagLotcode, setInnerBagLotcode] = useState("");
  const [innerBagLotcodeSOP, setInnerBagLotcodeSOP] = useState("");
  const [innerBagLotcodeObservations, setInnerBagLotcodeObservations] =
    useState("");

  const [innerBagBarcode, setInnerBagBarcode] = useState("");
  const [innerBagBarcodeSOP, setInnerBagBarcodeSOP] = useState("");
  const [innerBagBarcodeObservations, setInnerBagBarcodeObservations] =
    useState("");

  const [cartonBoxGrossWt, setCartonBoxGrossWt] = useState("");
  const [cartonBoxGrossWtSOP, setCartonBoxGrossWtSOP] = useState("");
  const [cartonBoxGrossWtObservations, setCartonBoxGrossWtObservations] =
    useState("");

  const [netWtFilledBag, setNetWtFilledBag] = useState("");
  const [netWtFilledBagSOP, setNetWtFilledBagSOP] = useState("");
  const [netWtFilledBagObservations, setNetWtFilledBagObservations] =
    useState("");

  const [grossWtFilledBag, setGrossWtFilledBag] = useState("");
  const [grossWtFilledBagSOP, setGrossWtFilledBagSOP] = useState("");
  const [grossWtFilledBagObservations, setGrossWtFilledBagObservations] =
    useState("");

  const [countPerPack, setCountPerPack] = useState("");
  const [countPerPackSOP, setCountPerPackSOP] = useState("");
  const [countPerPackObservations, setCountPerPackObservations] = useState("");

  const [shape, setShape] = useState("");
  const [shapeSOP, setShapeSOP] = useState("");
  const [shapeObservations, setShapeObservations] = useState("");

  const [size, setSize] = useState("");
  const [sizeSOP, setSizeSOP] = useState("");
  const [sizeObservations, setSizeObservations] = useState("");

  const [patternSide1, setPatternSide1] = useState("");
  const [patternSide1SOP, setPatternSide1SOP] = useState("");
  const [patternSide1Observations, setPatternSide1Observations] = useState("");

  const [patternSide2, setPatternSide2] = useState("");
  const [patternSide2SOP, setPatternSide2SOP] = useState("");
  const [patternSide2Observations, setPatternSide2Observations] = useState("");

  const [edgeCondition, setEdgeCondition] = useState("");
  const [edgeConditionSOP, setEdgeConditionSOP] = useState("");
  const [edgeConditionObservations, setEdgeConditionObservations] =
    useState("");

  const [fillingHeight, setFillingHeight] = useState("");
  const [fillingHeightSOP, setFillingHeightSOP] = useState("");
  const [fillingHeightObservations, setFillingHeightObservations] =
    useState("");

  const [specUpdateMedlinePortal, setSpecUpdateMedlinePortal] = useState("");
  const [specUpdateMedlinePortalSOP, setSpecUpdateMedlinePortalSOP] =
    useState("");
  const [
    specUpdateMedlinePortalObservations,
    setSpecUpdateMedlinePortalObservations,
  ] = useState("");

  const [ccp, setCcp] = useState("");
  const [ccpSOP, setCcpSOP] = useState("");
  const [ccpObservations, setCcpObservations] = useState("");

  const [remarks, setRemarks] = useState("");

  const [rows, setRows] = useState([
    {
      reviewDepartmentId: "",
      department: "",
      participant: "",
      signature: "",
    },
  ]);
  const [usernames, setUsernames] = useState([]);

  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productCodes, setProductCodes] = useState([]);
  const [productDescriptions, setProductDescriptions] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const fetchDep = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );

        setdepartmentList(response.data);
        console.log("setdepartmentList", response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchDep();
  }, []);

  useEffect(() => {
    fetch(`${API.prodUrl}/Precot/api/Ppc/customerNameList`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.error("Error fetching customer list:", error));
  }, []);

  // Fetch brands when a customer is selected
  const handleCustomerChange = (value) => {
    setCustomer(value);
    setBrand(null);
    setProductCode(null);
    setProductDescription(null);

    fetch(`${API.prodUrl}/Precot/api/Ppc/getBrandByCustomer?customer=${value}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.Brand);
        setProductCodes(data.ProductCode);
        setProductDescriptions([]);
      })
      .catch((error) => console.error("Error fetching brands:", error));
  };
  console.log("productcodes", productCodes);
  // Fetch product codes when a brand is selected
  const handleBrandChange = (value) => {
    setBrand(value);
    //  setProductCode(null);
    setProductDescription(null);

    fetch(
      `${API.prodUrl}/Precot/api/Ppc/getDescriptionByProduct?customer=${customer}&brand=${value}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // setProductCodes(data.map((item) => item.productCode));
        setProductDescriptions(data);
      })
      .catch((error) => console.error("Error fetching product codes:", error));
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/PPC/F-004/Summary");
  };

  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");

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

  const token = localStorage.getItem("token");
  const canDisplayButtons = () => {
    if (
      roleauth === "ROLE_QA" &&
      editResponse?.assistantStatus === "ASSISANT_APPROVED"
    ) {
      return "none";
    }
    return "block";
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Ppc/preProduction/getAuditParticipants`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Don't map to just participants - keep the full objects
        setUsernames(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };
    fetchUsernames();
  }, []);

  const handleAddparticipant = async () => {
    if (
      !newparticipant ||
      !Array.isArray(usernames) ||
      usernames.includes(newparticipant)
    )
      return;

    try {
      const res = await axios.post(
        `${API.prodUrl}/Precot/api/Ppc/preProduction/addAuditParticipant`,
        {
          participant: newparticipant,
          formatNo: "PH-PPC01-/F-004",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        setUsernames((prev) => [...prev, newparticipant]);
        setNewparticipant("");
        message.success("Participant added successfully.");

        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Ppc/preProduction/getAuditParticipants`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsernames(response.data);
      }
    } catch (err) {
      console.error(err);
      message.error("Error while adding participant.");
    }
  };

  const handleDeleteName = async (id, index) => {
    try {
      const res = await axios.delete(
        `${API.prodUrl}/Precot/api/Ppc/preProduction/deleteAuditParticipant?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Participant deleted successfully");

      // Refresh the list after deletion
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Ppc/preProduction/getAuditParticipants`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsernames(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      message.error("Error while deleting participant.");
    }
  };

  const handleDepartmentChange = (index, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, department: value } : row))
    );
  };

  const handleNameChange = (index, value) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? { ...row, participant: value.participant, signature: "" }
          : row
      )
    );
  };

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { department: "", participant: "", signature: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // For signature handling
  const handleSaveSignature = (index, base64Image) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, signature: base64Image } : row
      )
    );
  };

  const handleClearSignature = (index) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, signature: "" } : row))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Ppc/GetPreproductionMeetingByDate?Date=${state.date}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("edit data", data[0]);

      if (data) {
        setEditResponse(data[0]);
        const editData = data[0];
        setDate(editData.date || "");
        setId(editData.id || null);
        setCustomer(editData.customer || "");
        setBrand(editData.brand || "");
        setProductCode(editData.productCode || "");
        setPdsNo(editData.pdsNo || "");

        setProductDescription(editData.productDescription || "");
        setProductDescriptionSOP(editData.productDescriptionSOP || "");
        setProductDescriptionObservations(
          editData.productDescriptionObservations || ""
        );

        setAssistantStatus(editData.assistantStatus || "");

        const meetingDetails = editData.detailsMeeting[0];

        setMeetingId(meetingDetails.meetingid || null);

        setOuterCartonArtwork(meetingDetails.outerCartonArtwork || "");
        setOuterCartonArtworkSOP(meetingDetails.outerCartonArtworkSOP || "");
        setOuterCartonArtworkObservations(
          meetingDetails.outerCartonArtworkObservations || ""
        );

        setOuterCartonBarcode(meetingDetails.outerCartonBarcode || "");
        setOuterCartonBarcodeSOP(meetingDetails.outerCartonBarcodeSOP || "");
        setOuterCartonBarcodeObservations(
          meetingDetails.outerCartonBarcodeObservations || ""
        );

        setOuterCartonDimensionLWH(
          meetingDetails.outerCartonDimensionLWH || ""
        );
        setOuterCartonDimensionLWH_SOP(
          meetingDetails.outerCartonDimensionLWH_SOP || ""
        );
        setOuterCartonDimensionLWHObservations(
          meetingDetails.outerCartonDimensionLWHObservations || ""
        );

        setOuterCartonStamp(meetingDetails.outerCartonStamp || "");
        setOuterCartonStampSOP(meetingDetails.outerCartonStampSOP || "");
        setOuterCartonStampObservations(
          meetingDetails.outerCartonStampObservations || ""
        );

        setOdour(meetingDetails.odour || "");
        setOdourSOP(meetingDetails.odourSOP || "");
        setOdourObservations(meetingDetails.odourObservations || "");

        setInnerCartonArtwork(meetingDetails.innerCartonArtwork || "");
        setInnerCartonArtworkSOP(meetingDetails.innerCartonArtworkSOP || "");
        setInnerCartonArtworkObservations(
          meetingDetails.innerCartonArtworkObservations || ""
        );

        setInnerCartonBarcode(meetingDetails.innerCartonBarcode || "");
        setInnerCartonBarcodeSOP(meetingDetails.innerCartonBarcodeSOP || "");
        setInnerCartonBarcodeObservations(
          meetingDetails.innerCartonBarcodeObservations || ""
        );

        setInnerCartonDimensionLWH(
          meetingDetails.innerCartonDimensionLWH || ""
        );
        setInnerCartonDimensionLWH_SOP(
          meetingDetails.innerCartonDimensionLWH_SOP || ""
        );
        setInnerCartonDimensionLWHObservations(
          meetingDetails.innerCartonDimensionLWHObservations || ""
        );

        setInnerCartonStamp(meetingDetails.innerCartonStamp || "");
        setInnerCartonStampSOP(meetingDetails.innerCartonStampSOP || "");
        setInnerCartonStampObservations(
          meetingDetails.innerCartonStampObservations || ""
        );

        setBagAppearance(meetingDetails.bagAppearance || "");
        setBagAppearanceSOP(meetingDetails.bagAppearanceSOP || "");
        setBagAppearanceObservations(
          meetingDetails.bagAppearanceObservations || ""
        );

        setCelloTapShape(meetingDetails.celloTapShape || "");
        setCelloTapShapeSOP(meetingDetails.celloTapShapeSOP || "");
        setCelloTapShapeObservations(
          meetingDetails.celloTapShapeObservations || ""
        );

        setBagOrientation(meetingDetails.bagOrientation || "");
        setBagOrientationSOP(meetingDetails.bagOrientationSOP || "");
        setBagOrientationObservations(
          meetingDetails.bagOrientationObservations || ""
        );

        setNoOfInnerBox(meetingDetails.noOfInnerBox || "");
        setNoOfInnerBoxSOP(meetingDetails.noOfInnerBoxSOP || "");
        setNoOfInnerBoxObservations(
          meetingDetails.noOfInnerBoxObservations || ""
        );

        setNoOfPacksPerOuterBag(meetingDetails.noOfPacksPerOuterBag || "");
        setNoOfPacksPerOuterBagSOP(
          meetingDetails.noOfPacksPerOuterBagSOP || ""
        );
        setNoOfPacksPerOuterBagObservations(
          meetingDetails.noOfPacksPerOuterBagObservations || ""
        );

        setNoOfPacksPerInnerCarton(
          meetingDetails.noOfPacksPerInnerCarton || ""
        );
        setNoOfPacksPerInnerCartonSOP(
          meetingDetails.noOfPacksPerInnerCartonSOP || ""
        );
        setNoOfPacksPerInnerCartonObservations(
          meetingDetails.noOfPacksPerInnerCartonObservations || ""
        );

        setNoOfPacksPerOuterCarton(
          meetingDetails.noOfPacksPerOuterCarton || ""
        );
        setNoOfPacksPerOuterCartonSOP(
          meetingDetails.noOfPacksPerOuterCartonSOP || ""
        );
        setNoOfPacksPerOuterCartonObservations(
          meetingDetails.noOfPacksPerOuterCartonObservations || ""
        );

        setInnerBoxArtwork(meetingDetails.innerBoxArtwork || "");
        setInnerBoxArtworkSOP(meetingDetails.innerBoxArtworkSOP || "");
        setInnerBoxArtworkObservations(
          meetingDetails.innerBoxArtworkObservations || ""
        );

        setCartonBoxArtwork(meetingDetails.cartonBoxArtwork || "");
        setCartonBoxArtworkSOP(meetingDetails.cartonBoxArtworkSop || "");
        setCartonBoxArtworkObservations(
          meetingDetails.cartonBoxArtworkObservations || ""
        );

        setOuterBagArtwork(meetingDetails.outerBagArtwork || "");
        setOuterBagArtworkSOP(meetingDetails.outerBagArtworkSOP || "");
        setOuterBagArtworkObservations(
          meetingDetails.outerBagArtworkObservations || ""
        );

        setOuterBagLotcode(meetingDetails.outerBagLotcode || "");
        setOuterBagLotcodeSOP(meetingDetails.outerBagLotcodeSOP || "");
        setOuterBagLotcodeObservations(
          meetingDetails.outerBagLotcodeObservations || ""
        );

        setOuterBagBarcode(meetingDetails.outerBagBarcode || "");
        setOuterBagBarcodeSOP(meetingDetails.outerBagBarcodeSOP || "");
        setOuterBagBarcodeObservations(
          meetingDetails.outerBagBarcodeObservations || ""
        );

        setInnerBagArtwork(meetingDetails.innerBagArtwork || "");
        setInnerBagArtworkSOP(meetingDetails.innerBagArtworkSOP || "");
        setInnerBagArtworkObservations(
          meetingDetails.innerBagArtworkObservations || ""
        );

        setInnerBagLotcode(meetingDetails.innerBagLotcode || "");
        setInnerBagLotcodeSOP(meetingDetails.innerBagLotcodeSOP || "");
        setInnerBagLotcodeObservations(
          meetingDetails.innerBagLotcodeObservations || ""
        );

        setInnerBagBarcode(meetingDetails.innerBagBarcode || "");
        setInnerBagBarcodeSOP(meetingDetails.innerBagBarcodeSOP || "");
        setInnerBagBarcodeObservations(
          meetingDetails.innerBagBarcodeObservations || ""
        );

        setCartonBoxGrossWt(meetingDetails.cartonBoxGrossWt || "");
        setCartonBoxGrossWtSOP(meetingDetails.cartonBoxGrossWtSOP || "");
        setCartonBoxGrossWtObservations(
          meetingDetails.cartonBoxGrossWtObservations || ""
        );

        setNetWtFilledBag(meetingDetails.netWtFilledBag || "");
        setNetWtFilledBagSOP(meetingDetails.netWtFilledBagSOP || "");
        setNetWtFilledBagObservations(
          meetingDetails.netWtFilledBagObservations || ""
        );

        setGrossWtFilledBag(meetingDetails.grossWtFilledBag || "");
        setGrossWtFilledBagSOP(meetingDetails.grossWtFilledBagSOP || "");
        setGrossWtFilledBagObservations(
          meetingDetails.grossWtFilledBagObservations || ""
        );

        setCountPerPack(meetingDetails.countPerPack || "");
        setCountPerPackSOP(meetingDetails.countPerPackSOP || "");
        setCountPerPackObservations(
          meetingDetails.countPerPackObservations || ""
        );

        setShape(meetingDetails.shape || "");
        setShapeSOP(meetingDetails.shapeSOP || "");
        setShapeObservations(meetingDetails.shapeObservations || "");

        setSize(meetingDetails.size || "");
        setSizeSOP(meetingDetails.sizeSOP || "");
        setSizeObservations(meetingDetails.sizeObservations || "");

        setPatternSide1(meetingDetails.patternSide1 || "");
        setPatternSide1SOP(meetingDetails.patternSide1SOP || "");
        setPatternSide1Observations(
          meetingDetails.patternSide1Observations || ""
        );

        setPatternSide2(meetingDetails.patternSide2 || "");
        setPatternSide2SOP(meetingDetails.patternSide2SOP || "");
        setPatternSide2Observations(
          meetingDetails.patternSide2Observations || ""
        );

        setEdgeCondition(meetingDetails.edgeCondition || "");
        setEdgeConditionSOP(meetingDetails.edgeConditionSOP || "");
        setEdgeConditionObservations(
          meetingDetails.edgeConditionObservations || ""
        );

        setFillingHeight(meetingDetails.fillingHeight || "");
        setFillingHeightSOP(meetingDetails.fillingHeightSOP || "");
        setFillingHeightObservations(
          meetingDetails.fillingHeightObservations || ""
        );

        setSpecUpdateMedlinePortal(
          meetingDetails.specUpdateMedlinePortal || ""
        );
        setSpecUpdateMedlinePortalSOP(
          meetingDetails.specUpdateMedlinePortalSOP || ""
        );
        setSpecUpdateMedlinePortalObservations(
          meetingDetails.specUpdateMedlinePortalObservations || ""
        );

        setCcp(meetingDetails.ccp || "");
        setCcpSOP(meetingDetails.ccpSOP || "");
        setCcpObservations(meetingDetails.ccpObservations || "");

        setRemarks(meetingDetails.remarks || "");

        if (editData.memberDetails && editData.memberDetails.length > 0) {
          const formattedRows = editData.memberDetails.map((member) => ({
            reviewDepartmentId: member.reviewDepartmentId || "",
            department: member.department || "",
            participant: member.participate_name || "",
            signature: member.signature
              ? `data:image/png;base64,${member.signature}`
              : "",
          }));
          setRows(formattedRows);
        }
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  const handleSave = () => {
    setSaveLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;
    const payload = {
      id: id || null,
      formatName: "Pre-Production Meeting",
      formatNo: "PH-PPC01-/F-004",
      revisionNo: "01",
      refSopNo: "PH-PPC01-D-01",
      unit: "Unit H",
      date: state.date,
      customer: customer,
      brand: brand,
      productCode: productCode,
      pdsNo: pdsNo,
      productDescription: productDescription,
      detailsMeeting: [
        {
          meetingid: meetingid || null,
          outerCartonArtwork: outerCartonArtwork,
          outerCartonBarcode: outerCartonBarcode,
          outerCartonDimensionLWH: outerCartonDimensionLWH,
          outerCartonStamp: outerCartonStamp,
          odour: odour,
          innerCartonArtwork: innerCartonArtwork,
          innerCartonBarcode: innerCartonBarcode,
          innerCartonDimensionLWH: innerCartonDimensionLWH,
          innerCartonStamp: innerCartonStamp,
          bagAppearance: bagAppearance,
          celloTapShape: celloTapShape,
          bagOrientation: bagOrientation,
          noOfInnerBox: noOfInnerBox,
          noOfPacksPerOuterBag: noOfPacksPerOuterBag,
          noOfPacksPerInnerCarton: noOfPacksPerInnerCarton,
          noOfPacksPerOuterCarton: noOfPacksPerOuterCarton,
          innerBoxArtwork: innerBoxArtwork,
          cartonBoxArtwork: cartonBoxArtwork,
          outerBagArtwork: outerBagArtwork,
          outerBagLotcode: outerBagLotcode,
          outerBagBarcode: outerBagBarcode,
          innerBagArtwork: innerBagArtwork,
          innerBagLotcode: innerBagLotcode,
          innerBagBarcode: innerBagBarcode,
          cartonBoxGrossWt: cartonBoxGrossWt,
          netWtFilledBag: netWtFilledBag,
          grossWtFilledBag: grossWtFilledBag,
          countPerPack: countPerPack,
          shape: shape,
          size: size,
          patternSide1: patternSide1,
          patternSide2: patternSide2,
          edgeCondition: edgeCondition,
          fillingHeight: fillingHeight,
          specUpdateMedlinePortal: specUpdateMedlinePortal,
          ccp: ccp,
          outerCartonArtworkObservations: outerCartonArtworkObservations,
          outerCartonArtworkSOP: outerCartonArtworkSOP,
          outerCartonBarcodeObservations: outerCartonBarcodeObservations,
          outerCartonBarcodeSOP: outerCartonBarcodeSOP,
          outerCartonDimensionLWHObservations:
            outerCartonDimensionLWHObservations,
          outerCartonDimensionLWH_SOP: outerCartonDimensionLWH_SOP,
          outerCartonStampObservations: outerCartonStampObservations,
          outerCartonStampSOP: outerCartonStampSOP,
          odourObservations: odourObservations,
          odourSOP: odourSOP,
          innerBoxArtworkObservations: innerBoxArtworkObservations,
          innerBoxArtworkSOP: innerBoxArtworkSOP,
          cartonBoxArtworkObservations: cartonBoxArtworkObservations,
          cartonBoxArtworkSop: cartonBoxArtworkSOP,
          innerCartonArtworkObservations: innerCartonArtworkObservations,
          innerCartonArtworkSOP: innerCartonArtworkSOP,
          innerCartonBarcodeObservations: innerCartonBarcodeObservations,
          innerCartonBarcodeSOP: innerCartonBarcodeSOP,
          innerCartonDimensionLWHObservations:
            innerCartonDimensionLWHObservations,
          innerCartonDimensionLWH_SOP: innerCartonDimensionLWH_SOP,
          innerCartonStampObservations: innerCartonStampObservations,
          innerCartonStampSOP: innerCartonStampSOP,
          bagAppearanceObservations: bagAppearanceObservations,
          bagAppearanceSOP: bagAppearanceSOP,
          celloTapShapeObservations: celloTapShapeObservations,
          celloTapShapeSOP: celloTapShapeSOP,
          bagOrientationObservations: bagOrientationObservations,
          bagOrientationSOP: bagOrientationSOP,
          noOfInnerBoxObservations: noOfInnerBoxObservations,
          noOfInnerBoxSOP: noOfInnerBoxSOP,
          noOfPacksPerOuterBagObservations: noOfPacksPerOuterBagObservations,
          noOfPacksPerOuterBagSOP: noOfPacksPerOuterBagSOP,
          noOfPacksPerInnerCartonObservations:
            noOfPacksPerInnerCartonObservations,
          noOfPacksPerInnerCartonSOP: noOfPacksPerInnerCartonSOP,
          noOfPacksPerOuterCartonObservations:
            noOfPacksPerOuterCartonObservations,
          noOfPacksPerOuterCartonSOP: noOfPacksPerOuterCartonSOP,
          outerBagArtworkObservations: outerBagArtworkObservations,
          outerBagArtworkSOP: outerBagArtworkSOP,
          outerBagLotcodeObservations: outerBagLotcodeObservations,
          outerBagLotcodeSOP: outerBagLotcodeSOP,
          outerBagBarcodeObservations: outerBagBarcodeObservations,
          outerBagBarcodeSOP: outerBagBarcodeSOP,
          innerBagArtworkObservations: innerBagArtworkObservations,
          innerBagArtworkSOP: innerBagArtworkSOP,
          innerBagLotcodeObservations: innerBagLotcodeObservations,
          innerBagLotcodeSOP: innerBagLotcodeSOP,
          innerBagBarcodeObservations: innerBagBarcodeObservations,
          innerBagBarcodeSOP: innerBagBarcodeSOP,
          cartonBoxGrossWtObservations: cartonBoxGrossWtObservations,
          cartonBoxGrossWtSOP: cartonBoxGrossWtSOP,
          netWtFilledBagObservations: netWtFilledBagObservations,
          netWtFilledBagSOP: netWtFilledBagSOP,
          grossWtFilledBagObservations: grossWtFilledBagObservations,
          grossWtFilledBagSOP: grossWtFilledBagSOP,
          countPerPackObservations: countPerPackObservations,
          countPerPackSOP: countPerPackSOP,
          shapeObservations: shapeObservations,
          shapeSOP: shapeSOP,
          sizeObservations: sizeObservations,
          sizeSOP: sizeSOP,
          patternSide1Observations: patternSide1Observations,
          patternSide1SOP: patternSide1SOP,
          patternSide2Observations: patternSide2Observations,
          patternSide2SOP: patternSide2SOP,
          edgeConditionObservations: edgeConditionObservations,
          edgeConditionSOP: edgeConditionSOP,
          fillingHeightObservations: fillingHeightObservations,
          fillingHeightSOP: fillingHeightSOP,
          specUpdateMedlinePortalObservations:
            specUpdateMedlinePortalObservations,
          specUpdateMedlinePortalSOP: specUpdateMedlinePortalSOP,
          ccpObservations: ccpObservations,
          ccpSOP: ccpSOP,
          remarks: remarkToSave,
        },
      ],
      memberDetails: rows.map((row) => ({
        reviewDepartmentId: row.reviewDepartmentId,
        department: row.department,
        participate_name: row.participant,
        signature: row.signature ? row.signature.split(",")[1] : null,
      })),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/Ppc/PreProductionMeeting/Save `,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        message.success("Sucessfully Saved");
        navigate("/Precot/PPC/F-004/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    setSubmitLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;
    const payload = {
      id: id || null,
      formatName: "Pre-Production Meeting",
      formatNo: "PH-PPC01-/F-004",
      revisionNo: "01",
      refSopNo: "PH-PPC01-D-01",
      unit: "Unit H",
      date: state.date,
      customer: customer,
      brand: brand,
      productCode: productCode,
      pdsNo: pdsNo,
      productDescription: productDescription,
      detailsMeeting: [
        {
          meetingid: meetingid || null,
          outerCartonArtwork: outerCartonArtwork || "NA",
          outerCartonBarcode: outerCartonBarcode || "NA",
          outerCartonDimensionLWH: outerCartonDimensionLWH || "NA",
          outerCartonStamp: outerCartonStamp || "NA",
          odour: odour || "NA",
          innerCartonArtwork: innerCartonArtwork || "NA",
          innerCartonBarcode: innerCartonBarcode || "NA",
          innerCartonDimensionLWH: innerCartonDimensionLWH || "NA",
          innerCartonStamp: innerCartonStamp || "NA",
          bagAppearance: bagAppearance || "NA",
          celloTapShape: celloTapShape || "NA",
          bagOrientation: bagOrientation || "NA",
          noOfInnerBox: noOfInnerBox || "NA",
          noOfPacksPerOuterBag: noOfPacksPerOuterBag || "NA",
          noOfPacksPerInnerCarton: noOfPacksPerInnerCarton || "NA",
          noOfPacksPerOuterCarton: noOfPacksPerOuterCarton || "NA",
          innerBoxArtwork: innerBoxArtwork || "NA",
          cartonBoxArtwork: cartonBoxArtwork || "NA",
          outerBagArtwork: outerBagArtwork || "NA",
          outerBagLotcode: outerBagLotcode || "NA",
          outerBagBarcode: outerBagBarcode || "NA",
          innerBagArtwork: innerBagArtwork || "NA",
          innerBagLotcode: innerBagLotcode || "NA",
          innerBagBarcode: innerBagBarcode || "NA",
          cartonBoxGrossWt: cartonBoxGrossWt || "NA",
          netWtFilledBag: netWtFilledBag || "NA",
          grossWtFilledBag: grossWtFilledBag || "NA",
          countPerPack: countPerPack || "NA",
          shape: shape || "NA",
          size: size || "NA",
          patternSide1: patternSide1 || "NA",
          patternSide2: patternSide2 || "NA",
          edgeCondition: edgeCondition || "NA",
          fillingHeight: fillingHeight || "NA",
          specUpdateMedlinePortal: specUpdateMedlinePortal || "NA",
          ccp: ccp || "NA",
          outerCartonArtworkObservations:
            outerCartonArtworkObservations || "NA",
          outerCartonArtworkSOP: outerCartonArtworkSOP || "NA",
          outerCartonBarcodeObservations:
            outerCartonBarcodeObservations || "NA",
          outerCartonBarcodeSOP: outerCartonBarcodeSOP || "NA",
          outerCartonDimensionLWHObservations:
            outerCartonDimensionLWHObservations || "NA",
          outerCartonDimensionLWH_SOP: outerCartonDimensionLWH_SOP || "NA",
          outerCartonStampObservations: outerCartonStampObservations || "NA",
          outerCartonStampSOP: outerCartonStampSOP || "NA",
          odourObservations: odourObservations || "NA",
          odourSOP: odourSOP || "NA",
          innerBoxArtworkObservations: innerBoxArtworkObservations || "NA",
          innerBoxArtworkSOP: innerBoxArtworkSOP || "NA",
          cartonBoxArtworkObservations: cartonBoxArtworkObservations || "NA",
          cartonBoxArtworkSop: cartonBoxArtworkSOP || "NA",
          innerCartonArtworkObservations:
            innerCartonArtworkObservations || "NA",
          innerCartonArtworkSOP: innerCartonArtworkSOP || "NA",
          innerCartonBarcodeObservations:
            innerCartonBarcodeObservations || "NA",
          innerCartonBarcodeSOP: innerCartonBarcodeSOP || "NA",
          innerCartonDimensionLWHObservations:
            innerCartonDimensionLWHObservations || "NA",
          innerCartonDimensionLWH_SOP: innerCartonDimensionLWH_SOP || "NA",
          innerCartonStampObservations: innerCartonStampObservations || "NA",
          innerCartonStampSOP: innerCartonStampSOP || "NA",
          bagAppearanceObservations: bagAppearanceObservations || "NA",
          bagAppearanceSOP: bagAppearanceSOP || "NA",
          celloTapShapeObservations: celloTapShapeObservations || "NA",
          celloTapShapeSOP: celloTapShapeSOP || "NA",
          bagOrientationObservations: bagOrientationObservations || "NA",
          bagOrientationSOP: bagOrientationSOP || "NA",
          noOfInnerBoxObservations: noOfInnerBoxObservations || "NA",
          noOfInnerBoxSOP: noOfInnerBoxSOP || "NA",
          noOfPacksPerOuterBagObservations:
            noOfPacksPerOuterBagObservations || "NA",
          noOfPacksPerOuterBagSOP: noOfPacksPerOuterBagSOP || "NA",
          noOfPacksPerInnerCartonObservations:
            noOfPacksPerInnerCartonObservations || "NA",
          noOfPacksPerInnerCartonSOP: noOfPacksPerInnerCartonSOP || "NA",
          noOfPacksPerOuterCartonObservations:
            noOfPacksPerOuterCartonObservations || "NA",
          noOfPacksPerOuterCartonSOP: noOfPacksPerOuterCartonSOP || "NA",
          outerBagArtworkObservations: outerBagArtworkObservations || "NA",
          outerBagArtworkSOP: outerBagArtworkSOP || "NA",
          outerBagLotcodeObservations: outerBagLotcodeObservations || "NA",
          outerBagLotcodeSOP: outerBagLotcodeSOP || "NA",
          outerBagBarcodeObservations: outerBagBarcodeObservations || "NA",
          outerBagBarcodeSOP: outerBagBarcodeSOP || "NA",
          innerBagArtworkObservations: innerBagArtworkObservations || "NA",
          innerBagArtworkSOP: innerBagArtworkSOP || "NA",
          innerBagLotcodeObservations: innerBagLotcodeObservations || "NA",
          innerBagLotcodeSOP: innerBagLotcodeSOP || "NA",
          innerBagBarcodeObservations: innerBagBarcodeObservations || "NA",
          innerBagBarcodeSOP: innerBagBarcodeSOP || "NA",
          cartonBoxGrossWtObservations: cartonBoxGrossWtObservations || "NA",
          cartonBoxGrossWtSOP: cartonBoxGrossWtSOP || "NA",
          netWtFilledBagObservations: netWtFilledBagObservations || "NA",
          netWtFilledBagSOP: netWtFilledBagSOP || "NA",
          grossWtFilledBagObservations: grossWtFilledBagObservations || "NA",
          grossWtFilledBagSOP: grossWtFilledBagSOP || "NA",
          countPerPackObservations: countPerPackObservations || "NA",
          countPerPackSOP: countPerPackSOP || "NA",
          shapeObservations: shapeObservations || "NA",
          shapeSOP: shapeSOP || "NA",
          sizeObservations: sizeObservations || "NA",
          sizeSOP: sizeSOP || "NA",
          patternSide1Observations: patternSide1Observations || "NA",
          patternSide1SOP: patternSide1SOP || "NA",
          patternSide2Observations: patternSide2Observations || "NA",
          patternSide2SOP: patternSide2SOP || "NA",
          edgeConditionObservations: edgeConditionObservations || "NA",
          edgeConditionSOP: edgeConditionSOP || "NA",
          fillingHeightObservations: fillingHeightObservations || "NA",
          fillingHeightSOP: fillingHeightSOP || "NA",
          specUpdateMedlinePortalObservations:
            specUpdateMedlinePortalObservations || "NA",
          specUpdateMedlinePortalSOP: specUpdateMedlinePortalSOP || "NA",
          ccpObservations: ccpObservations || "NA",
          ccpSOP: ccpSOP || "NA",
          remarks: remarkToSave || "NA",
        },
      ],
      memberDetails: rows.map((row) => ({
        reviewDepartmentId: row.reviewDepartmentId || null,
        department: row.department,
        participate_name: row.participant,
        signature: row.signature ? row.signature.split(",")[1] : null,
      })),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/Ppc/PreProductionMeeting/Submit`,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        message.success("Sucessfully submitted");
        navigate("/Precot/PPC/F-004/Summary");
      })
      .catch((err) => {
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
      label: <p> Details </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "100%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <td colSpan={40} style={{ height: "25px", textAlign: "left" }}>
                Customer{" "}
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <Select
                  placeholder="Select Customer"
                  style={{ width: "100%" }}
                  onChange={handleCustomerChange}
                  value={customer}
                >
                  {customers?.map((cust) => (
                    <Option key={cust.id} value={cust.value}>
                      {cust.value}
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ height: "25px", textAlign: "left" }}>
                Brand{" "}
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <Select
                  placeholder="Select Brand"
                  style={{ width: "100%" }}
                  onChange={handleBrandChange}
                  value={brand}
                  disabled={
                    !customer ||
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                >
                  {brands.map((br, index) => (
                    <Option key={index} value={br}>
                      {br}
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ height: "25px", textAlign: "left" }}>
                Product Code{" "}
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <Select
                  placeholder="Select Product Code"
                  style={{ width: "100%" }}
                  onChange={(value) => setProductCode(value)}
                  value={productCode}
                  // disabled={!brand}
                  disabled={
                    !customer ||
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                >
                  {productCodes && productCodes.length > 0 ? (
                    productCodes.map((code, index) => (
                      <Option key={index} value={code}>
                        {code}
                      </Option>
                    ))
                  ) : (
                    <Option disabled></Option>
                  )}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ height: "25px", textAlign: "left" }}>
                Product Description{" "}
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <Select
                  placeholder="Select Product Description"
                  style={{ width: "100%" }}
                  onChange={(value) => setProductDescription(value)}
                  value={productDescription}
                  // disabled={!productCode}
                  disabled={
                    !customer ||
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                >
                  {productDescriptions.length > 0 ? (
                    productDescriptions.map((desc) => (
                      <Option key={desc.id} value={desc.value}>
                        {desc.value}
                      </Option>
                    ))
                  ) : (
                    <Option disabled></Option>
                  )}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ height: "25px", textAlign: "left" }}>
                PDS No.:{" "}
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={pdsNo}
                  onChange={(e) => setPdsNo(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p> Packaging Details-1 </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "80%", margin: "auto" }}
            pagination={{ pageSize: 5 }}
          >
            <tbody>
              <tr>
                <th
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Details
                </th>
                <th
                  colSpan={40}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Standard as per PDS
                </th>
                <th
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Customer SOP
                </th>
                <th
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Observations
                </th>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Outer carton Artwork
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonArtwork}
                    onChange={(e) => setOuterCartonArtwork(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonArtworkSOP}
                    onChange={(e) => setOuterCartonArtworkSOP(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonArtworkObservations}
                    onChange={(e) =>
                      setOuterCartonArtworkObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Outer carton Bar-code
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonBarcode}
                    onChange={(e) => setOuterCartonBarcode(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonBarcodeSOP}
                    onChange={(e) => setOuterCartonBarcodeSOP(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonBarcodeObservations}
                    onChange={(e) =>
                      setOuterCartonBarcodeObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Outer carton Dimension
                  <br /> in mm (L x W x H)
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonDimensionLWH}
                    onChange={(e) => setOuterCartonDimensionLWH(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonDimensionLWH_SOP}
                    onChange={(e) =>
                      setOuterCartonDimensionLWH_SOP(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonDimensionLWHObservations}
                    onChange={(e) =>
                      setOuterCartonDimensionLWHObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Outer carton - <br /> Stamp (PO no, Lot no)
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonStamp}
                    onChange={(e) => setOuterCartonStamp(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonStampSOP}
                    onChange={(e) => setOuterCartonStampSOP(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={outerCartonStampObservations}
                    onChange={(e) =>
                      setOuterCartonStampObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Odour
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={odour}
                    onChange={(e) => setOdour(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={odourSOP}
                    onChange={(e) => setOdourSOP(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={odourObservations}
                    onChange={(e) => setOdourObservations(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Inner carton Artwork
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonArtwork}
                    onChange={(e) => setInnerCartonArtwork(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonArtworkSOP}
                    onChange={(e) => setInnerCartonArtworkSOP(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonArtworkObservations}
                    onChange={(e) =>
                      setInnerCartonArtworkObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Inner carton Bar-code
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonBarcode}
                    onChange={(e) => setInnerCartonBarcode(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonBarcodeSOP}
                    onChange={(e) => setInnerCartonBarcodeSOP(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonBarcodeObservations}
                    onChange={(e) =>
                      setInnerCartonBarcodeObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Inner carton Dimension
                  <br /> in mm (L x W x H)
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonDimensionLWH}
                    onChange={(e) => setInnerCartonDimensionLWH(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonDimensionLWH_SOP}
                    onChange={(e) =>
                      setInnerCartonDimensionLWH_SOP(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonDimensionLWHObservations}
                    onChange={(e) =>
                      setInnerCartonDimensionLWHObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ height: "25px", textAlign: "left" }}>
                  Inner carton - <br /> Stamp (PO no, Lot no)
                </td>
                <td
                  colSpan={40}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonStamp}
                    onChange={(e) => setInnerCartonStamp(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonStampSOP}
                    onChange={(e) => setInnerCartonStampSOP(e.target.value)}
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
                    }
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "25px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    value={innerCartonStampObservations}
                    onChange={(e) =>
                      setInnerCartonStampObservations(e.target.value)
                    }
                    disabled={
                      editResponse?.assistantStatus === "ASSISANT_APPROVED"
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
      label: <p> Packaging Details-2 </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "80%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Details
              </th>
              <th colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Standard as per PDS
              </th>
              <th colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Customer SOP
              </th>
              <th colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Observations
              </th>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Bag appearance on box(bags Height uniformity)
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bagAppearance}
                  onChange={(e) => setBagAppearance(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bagAppearanceSOP}
                  onChange={(e) => setBagAppearanceSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bagAppearanceObservations}
                  onChange={(e) => setBagAppearanceObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Cello tap(gum tape) pasted shape75mm
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={celloTapShape}
                  onChange={(e) => setCelloTapShape(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={celloTapShapeSOP}
                  onChange={(e) => setCelloTapShapeSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={celloTapShapeObservations}
                  onChange={(e) => setCelloTapShapeObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Bag orientation in carton (L x W x H)
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bagOrientation}
                  onChange={(e) => setBagOrientation(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bagOrientationSOP}
                  onChange={(e) => setBagOrientationSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bagOrientationObservations}
                  onChange={(e) =>
                    setBagOrientationObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                No of inner per outer box
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfInnerBox}
                  onChange={(e) => setNoOfInnerBox(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfInnerBoxSOP}
                  onChange={(e) => setNoOfInnerBoxSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfInnerBoxObservations}
                  onChange={(e) => setNoOfInnerBoxObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                No of packs per outer bag
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerOuterBag}
                  onChange={(e) => setNoOfPacksPerOuterBag(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerOuterBagSOP}
                  onChange={(e) => setNoOfPacksPerOuterBagSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerOuterBagObservations}
                  onChange={(e) =>
                    setNoOfPacksPerOuterBagObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                No of Packs Per Inner Carton
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerInnerCarton}
                  onChange={(e) => setNoOfPacksPerInnerCarton(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerInnerCartonSOP}
                  onChange={(e) =>
                    setNoOfPacksPerInnerCartonSOP(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerInnerCartonObservations}
                  onChange={(e) =>
                    setNoOfPacksPerInnerCartonObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                No of Packs Per Outer Carton
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerOuterCarton}
                  onChange={(e) => setNoOfPacksPerOuterCarton(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerOuterCartonSOP}
                  onChange={(e) =>
                    setNoOfPacksPerOuterCartonSOP(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfPacksPerOuterCartonObservations}
                  onChange={(e) =>
                    setNoOfPacksPerOuterCartonObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Inner box fill the bags artwork towards front side
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBoxArtwork}
                  onChange={(e) => setInnerBoxArtwork(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBoxArtworkSOP}
                  onChange={(e) => setInnerBoxArtworkSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBoxArtworkObservations}
                  onChange={(e) =>
                    setInnerBoxArtworkObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Carton box fill the bags artwork towards front side
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={cartonBoxArtwork}
                  onChange={(e) => setCartonBoxArtwork(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={cartonBoxArtworkSOP}
                  onChange={(e) => setCartonBoxArtworkSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={cartonBoxArtworkObservations}
                  onChange={(e) =>
                    setCartonBoxArtworkObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: <p> Packaging Details-3 </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "80%", height: "100%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <th colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                Details
              </th>
              <th colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Standard as per PDS
              </th>
              <th colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Customer SOP
              </th>
              <th colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Observations
              </th>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "25px", textAlign: "left" }}>
                Outer Bag - Artwork
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagArtwork}
                  onChange={(e) => setOuterBagArtwork(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagArtworkSOP}
                  onChange={(e) => setOuterBagArtworkSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagArtworkObservations}
                  onChange={(e) =>
                    setOuterBagArtworkObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "25px", textAlign: "left" }}>
                Outer Bag - Lot code
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagLotcode}
                  onChange={(e) => setOuterBagLotcode(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagLotcodeSOP}
                  onChange={(e) => setOuterBagLotcodeSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagLotcodeObservations}
                  onChange={(e) =>
                    setOuterBagLotcodeObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "25px", textAlign: "left" }}>
                Outer Bag - Bar code
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagBarcode}
                  onChange={(e) => setOuterBagBarcode(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagBarcodeSOP}
                  onChange={(e) => setOuterBagBarcodeSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={outerBagBarcodeObservations}
                  onChange={(e) =>
                    setOuterBagBarcodeObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "25px", textAlign: "left" }}>
                Inner Bag - Artwork
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagArtwork}
                  onChange={(e) => setInnerBagArtwork(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagArtworkSOP}
                  onChange={(e) => setInnerBagArtworkSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagArtworkObservations}
                  onChange={(e) =>
                    setInnerBagArtworkObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "25px", textAlign: "left" }}>
                Inner Bag - Lot code
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagLotcode}
                  onChange={(e) => setInnerBagLotcode(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagLotcodeSOP}
                  onChange={(e) => setInnerBagLotcodeSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagLotcodeObservations}
                  onChange={(e) =>
                    setInnerBagLotcodeObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={70} style={{ height: "25px", textAlign: "left" }}>
                Inner Bag - Bar code
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagBarcode}
                  onChange={(e) => setInnerBagBarcode(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagBarcodeSOP}
                  onChange={(e) => setInnerBagBarcodeSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={innerBagBarcodeObservations}
                  onChange={(e) =>
                    setInnerBagBarcodeObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "5",
      label: <p> Parameter Details </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "80%", height: "100%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Details
              </th>
              <th colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Standard as per PDS
              </th>
              <th colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Customer SOP
              </th>
              <th colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Observations
              </th>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Carton box gross wt
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={cartonBoxGrossWt}
                  onChange={(e) => setCartonBoxGrossWt(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={cartonBoxGrossWtSOP}
                  onChange={(e) => setCartonBoxGrossWtSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={cartonBoxGrossWtObservations}
                  onChange={(e) =>
                    setCartonBoxGrossWtObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Net Wt Filled Bag
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={netWtFilledBag}
                  onChange={(e) => setNetWtFilledBag(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={netWtFilledBagSOP}
                  onChange={(e) => setNetWtFilledBagSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={netWtFilledBagObservations}
                  onChange={(e) =>
                    setNetWtFilledBagObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Gross Wt Filled Bag
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={grossWtFilledBag}
                  onChange={(e) => setGrossWtFilledBag(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={grossWtFilledBagSOP}
                  onChange={(e) => setGrossWtFilledBagSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={grossWtFilledBagObservations}
                  onChange={(e) =>
                    setGrossWtFilledBagObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Count per Pack (Nos.)
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={countPerPack}
                  onChange={(e) => setCountPerPack(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={countPerPackSOP}
                  onChange={(e) => setCountPerPackSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={countPerPackObservations}
                  onChange={(e) => setCountPerPackObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Shape
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={shapeSOP}
                  onChange={(e) => setShapeSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={shapeObservations}
                  onChange={(e) => setShapeObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Size (mm)
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={sizeSOP}
                  onChange={(e) => setSizeSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={sizeObservations}
                  onChange={(e) => setSizeObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>

            <tr>
              <td
                colSpan={30}
                rowSpan={2}
                style={{ height: "25px", textAlign: "left" }}
              >
                Pattern
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                Side 1{" "}
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                {" "}
                <input
                  className="inp-new"
                  value={patternSide1}
                  onChange={(e) => setPatternSide1(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={patternSide1SOP}
                  onChange={(e) => setPatternSide1SOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                {" "}
                <input
                  className="inp-new"
                  value={patternSide1Observations}
                  onChange={(e) => setPatternSide1Observations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />{" "}
              </td>
            </tr>

            <tr>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                Side 2{" "}
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={patternSide2}
                  onChange={(e) => setPatternSide2(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={patternSide2SOP}
                  onChange={(e) => setPatternSide2SOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={patternSide2Observations}
                  onChange={(e) => setPatternSide2Observations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Edge Condition
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={edgeCondition}
                  onChange={(e) => setEdgeCondition(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={edgeConditionSOP}
                  onChange={(e) => setEdgeConditionSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={edgeConditionObservations}
                  onChange={(e) => setEdgeConditionObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Filling Height (mm)
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={fillingHeight}
                  onChange={(e) => setFillingHeight(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={fillingHeightSOP}
                  onChange={(e) => setFillingHeightSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={fillingHeightObservations}
                  onChange={(e) => setFillingHeightObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                Spec Update Medline Portal
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={specUpdateMedlinePortal}
                  onChange={(e) => setSpecUpdateMedlinePortal(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={specUpdateMedlinePortalSOP}
                  onChange={(e) =>
                    setSpecUpdateMedlinePortalSOP(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={specUpdateMedlinePortalObservations}
                  onChange={(e) =>
                    setSpecUpdateMedlinePortalObservations(e.target.value)
                  }
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "25px", textAlign: "left" }}>
                CCP
              </td>
              <td colSpan={40} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={ccp}
                  onChange={(e) => setCcp(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={ccpSOP}
                  onChange={(e) => setCcpSOP(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
              <td colSpan={30} style={{ height: "25px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={ccpObservations}
                  onChange={(e) => setCcpObservations(e.target.value)}
                  disabled={
                    editResponse?.assistantStatus === "ASSISANT_APPROVED"
                  }
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "6",
      label: <p>Remarks</p>,
      children: (
        <table align="left" style={{ width: "80%", alignItems: "left" }}>
          <p>Remarks:</p>
          <Input.TextArea
            style={{ height: "100%" }}
            value={remarks}
            onChange={(e) => {
              setRemarks(e.target.value);
            }}
          />
        </table>
      ),
    },
    {
      key: "7",
      label: <p>Participate</p>,
      children: (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={{ padding: "12px 15px", width: "30%" }}>
                  Department Name
                </th>
                <th style={{ padding: "12px 15px", width: "40%" }}>
                  Participant Name
                </th>
                <th style={{ padding: "12px 15px", width: "60%" }}>
                  Sign & Date
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} style={{ height: "50px" }}>
                  <td style={{ padding: "12px 15px" }}>
                    <Select
                      value={row.department || ""}
                      style={{ width: "80%" }}
                      onChange={(value) => handleDepartmentChange(index, value)}
                    >
                      {Array.isArray(departmentList) &&
                        departmentList.map((dep) => (
                          <Select.Option key={dep.id} value={dep.department}>
                            {dep.department}
                          </Select.Option>
                        ))}
                    </Select>
                  </td>
                  <td style={{ padding: "12px 15px" }}>
                    <Select
                      id={`participant-name-${index}`}
                      value={row.participant || ""}
                      onChange={(value) => handleNameChange(index, value)}
                      style={{ width: "100%" }}
                      disabled={
                        editResponse?.assistantStatus === "ASSISANT_APPROVED"
                      }
                      dropdownRender={(menu) => (
                        <>
                          {Array.isArray(usernames) &&
                            usernames.map((name, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "6px 12px",
                                  borderBottom: "1px solid #f0f0f0",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleNameChange(index, name)}
                              >
                                <span>{name.participant}</span>
                                <DeleteOutlined
                                  onClick={(e) => {
                                    window.confirm(
                                      "Are you sure you want to delete this participant?"
                                    ) && e.stopPropagation();
                                    handleDeleteName(name.id, index);
                                  }}
                                  style={{ color: "red", cursor: "pointer" }}
                                />
                              </div>
                            ))}

                          <div style={{ display: "flex", padding: 8, gap: 8 }}>
                            <Input
                              style={{ flex: "auto" }}
                              value={newparticipant}
                              onChange={(e) =>
                                setNewparticipant(e.target.value)
                              }
                              placeholder="Add new participant"
                              disabled={saveDisable}
                            />
                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={() => {
                                handleAddparticipant();
                                setNewparticipant("");
                              }}
                              disabled={saveDisable}
                            >
                              Add
                            </Button>
                          </div>
                        </>
                      )}
                    />
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {editResponse?.assistantStatus !== "ASSISANT_APPROVED" ? (
                      !row.signature ? (
                        <>
                          <SignatureCanvas
                            ref={(ref) => (signatureRefs.current[index] = ref)}
                            penColor="green"
                            canvasProps={{
                              width: 400,
                              height: 150,
                              className: "sigCanvas",
                              style: { border: "1px solid #ccc" },
                            }}
                            backgroundColor="#f9e5e1"
                          />
                          <div style={{ marginTop: "5px" }}>
                            <Button
                              type="primary"
                              size="small"
                              onClick={() => {
                                const canvas = signatureRefs.current[index];
                                if (canvas) {
                                  canvas.getTrimmedCanvas().toBlob((blob) => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const base64 =
                                        reader.result.split(",")[1];
                                      handleSaveSignature(
                                        index,
                                        `data:image/png;base64,${base64}`
                                      );
                                    };
                                    reader.readAsDataURL(blob);
                                  }, "image/png");
                                }
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              size="small"
                              style={{ marginLeft: "8px" }}
                              onClick={() => {
                                const canvas = signatureRefs.current[index];
                                if (canvas) {
                                  canvas.clear();
                                  handleClearSignature(index);
                                }
                              }}
                            >
                              Clear
                            </Button>
                          </div>
                        </>
                      ) : (
                        <img
                          src={row.signature}
                          alt="Signature"
                          style={{ height: "50px", objectFit: "contain" }}
                        />
                      )
                    ) : row.signature ? (
                      <img
                        src={row.signature}
                        alt="Signature"
                        style={{ height: "50px", objectFit: "contain" }}
                      />
                    ) : (
                      "No signature selected"
                    )}
                  </td>
                  {editResponse?.assistantStatus !== "ASSISANT_APPROVED" && (
                    <button
                      onClick={() => handleDeleteRow(index)}
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
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  border: "none",
                }}
              >
                {editResponse?.assistantStatus !== "ASSISANT_APPROVED" && (
                  <button
                    onClick={handleAddRow}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "12px 20px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    <PlusOutlined style={{ marginRight: "8px" }} />
                    Add Row
                  </button>
                )}
              </td>
            </tbody>
          </table>
        </>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="PRE PRODUCTION MEETING"
        formatNo="PH-PPC01-/F-004"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
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
          </Button>,
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
          </Button>,
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
          value={formatDateUser(state.date)}
          disabled
          style={{ width: "15%", height: "35px" }}
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
    </div>
  );
};

export default PPC_f004;
