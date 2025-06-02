/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteTwoTone, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tabs,
  Tooltip,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;
const Development_f001 = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [assistantDate, setAssistantDate] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const { state } = useLocation();
  const [operatorDate, setOperatorDate] = useState("");
  const [id, setId] = useState("");
  const [reportDetails, setReportDetails] = useState([]);
  const [pdsNo, setPdsNo] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [revisionDate, setRevisionDate] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [mixingRatio, setMixingRatio] = useState("");
  const [sampleRequisitionNo, setSampleRequisitionNo] = useState("");
  const [shapeSpecification, setShapeSpecification] = useState("");
  const [shapeTolerence, setShapeTolerence] = useState("");
  const [shapeMin, setShapeMin] = useState("");
  const [shapeMax, setShapeMax] = useState("");
  const [size, setSize] = useState("");
  const [sizelimit, setSizeLimit] = useState("");
  const [sizeMin, setSizeMin] = useState("");
  const [sizeMax, setSizeMax] = useState("");
  const [countPerPack, setCountPerPack] = useState("");
  const [countPerPackMin, setCountPerPackMin] = useState("");
  const [countPerPackMax, setCountPerPackMax] = useState("");
  const [countPerPackLimit, setCountPerPackLimit] = useState("");
  const [packsPerInnerCarton, setPacksPerInnerCarton] = useState("");
  const [packsPerInnerCartonMin, setPacksPerInnerCartonMin] = useState("");
  const [packsPerInnerCartonMax, setPacksPerInnerCartonMax] = useState("");
  const [packsPerInnerCartonLimit, setPacksPerInnerCartonLimit] = useState("");
  const [innerPerOuterCarton, setInnerPerOuterCarton] = useState("");
  const [innerPerOuterCartonMin, setInnerPerOuterCartonMin] = useState("");
  const [innerPerOuterCartonMax, setInnerPerOuterCartonMax] = useState("");
  const [innerPerOuterCartonLimit, setInnerPerOuterCartonLimit] = useState("");
  const [packsPerOuterCarton, setPacksPerOuterCarton] = useState("");
  const [packsPerOuterCartonMin, setPacksPerOuterCartonMin] = useState("");
  const [packsPerOuterCartonMax, setPacksPerOuterCartonMax] = useState("");
  const [packsPerOuterCartonLimit, setPacksPerOuterCartonLimit] = useState("");
  const [gsm, setGsm] = useState("");
  const [gsmLimit, setGsmLimit] = useState("");
  const [gsmMax, setGsmMax] = useState("");
  const [gsmMin, setGsmMin] = useState("");
  const [side1Pattern, setSide1Pattern] = useState("");
  const [side2Pattern, setSide2Pattern] = useState("");
  const [side1PatternTolerance, setSide1PatternTolerance] = useState("");
  const [side2PatternTolerance, setSide2PatternTolerance] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productTolerance, setProductTolerance] = useState("");
  const [weightInnerEmptyBag, setWeightInnerEmptyBag] = useState("");
  const [weightInnerEmptyBagMin, setWeightInnerEmptyBagMin] = useState("");
  const [weightInnerEmptyBagMax, setWeightInnerEmptyBagMax] = useState("");
  const [weightInnerEmptyBagLimit, setWeightInnerEmptyBagLimit] = useState("");
  const [weightOuterEmptyBag, setWeightOuterEmptyBag] = useState("");
  const [weightOuterEmptyBagMin, setWeightOuterEmptyBagMin] = useState("");
  const [weightOuterEmptyBagMax, setWeightOuterEmptyBagMax] = useState("");
  const [weightOuterEmptyBagLimit, setWeightOuterEmptyBagLimit] = useState("");
  const [weightEmptyInnerCarton, setWeightEmptyInnerCarton] = useState("");
  const [weightEmptyInnerCartonMin, setWeightEmptyInnerCartonMin] =
    useState("");
  const [weightEmptyInnerCartonMax, setWeightEmptyInnerCartonMax] =
    useState("");
  const [weightEmptyInnerCartonLimit, setWeightEmptyInnerCartonLimit] =
    useState("");
  const [weightEmptyOuterCarton, setWeightEmptyOuterCarton] = useState("");
  const [weightEmptyOuterCartonMin, setWeightEmptyOuterCartonMin] =
    useState("");
  const [weightEmptyOuterCartonMax, setWeightEmptyOuterCartonMax] =
    useState("");
  const [weightEmptyOuterCartonLimit, setWeightEmptyOuterCartonLimit] =
    useState("");
  const [netWtFilledPack, setNetWtFilledPack] = useState("");
  const [netWtFilledPackMin, setNetWtFilledPackMin] = useState("");
  const [netWtFilledPackMax, setNetWtFilledPackMax] = useState("");
  const [netWtFilledPackLimit, setNetWtFilledPackLimit] = useState("");
  const [grossWtFilledPack, setGrossWtFilledPack] = useState("");
  const [grossWtFilledPackMin, setGrossWtFilledPackMin] = useState("");
  const [grossWtFilledPackMax, setGrossWtFilledPackMax] = useState("");
  const [grossWtFilledPackLimit, setGrossWtFilledPackLimit] = useState("");
  const [netWtFilledInnerCarton, setNetWtFilledInnerCarton] = useState("");
  const [netWtFilledInnerCartonMin, setNetWtFilledInnerCartonMin] =
    useState("");
  const [netWtFilledInnerCartonMax, setNetWtFilledInnerCartonMax] =
    useState("");
  const [netWtFilledInnerCartonLimit, setNetWtFilledInnerCartonLimit] =
    useState("");
  const [grossWtFilledInnerCarton, setGrossWtFilledInnerCarton] = useState("");
  const [grossWtFilledInnerCartonMin, setGrossWtFilledInnerCartonMin] =
    useState("");
  const [grossWtFilledInnerCartonMax, setGrossWtFilledInnerCartonMax] =
    useState("");
  const [grossWtFilledInnerCartonLimit, setGrossWtFilledInnerCartonLimit] =
    useState("");
  const [netWtFilledOuterCarton, setNetWtFilledOuterCarton] = useState("");
  const [netWtFilledOuterCartonMin, setNetWtFilledOuterCartonMin] =
    useState("");
  const [netWtFilledOuterCartonMax, setNetWtFilledOuterCartonMax] =
    useState("");
  const [netWtFilledOuterCartonLimit, setNetWtFilledOuterCartonLimit] =
    useState("");
  const [grossWtFilledOuterCarton, setGrossWtFilledOuterCarton] = useState("");
  const [grossWtFilledOuterCartonMin, setGrossWtFilledOuterCartonMin] =
    useState("");
  const [grossWtFilledOuterCartonMax, setGrossWtFilledOuterCartonMax] =
    useState("");
  const [grossWtFilledOuterCartonLimit, setGrossWtFilledOuterCartonLimit] =
    useState("");
  const [primaryfilmType, setPrimaryFilmType] = useState(
    "3 layer LDPE Natural printed film"
  );
  const [primaryfilmThicknessMicron, setPrimaryFilmThicknessMicron] =
    useState("");
  const [primaryfilmThicknessMicronLimit, setPrimaryFilmThicknessMicronLimit] =
    useState("");
  const [primaryfilmThicknessMicronMin, setPrimaryFilmThicknessMicronMin] =
    useState("");
  const [primaryfilmThicknessMicronMax, setPrimaryFilmThicknessMicronMax] =
    useState("");
  const [primarybagType, setPrimaryBagType] = useState("");
  const [primarybagDimension, setPrimaryBagDimension] = useState("");
  const [filmType, setFilmType] = useState("");
  const [filmThicknessMicron, setFilmThicknessMicron] = useState("");
  const [filmThicknessMicronLimit, setFilmThicknessMicronLimit] = useState("");
  const [filmThicknessMicronMin, setFilmThicknessMicronMin] = useState("");
  const [filmThicknessMicronMax, setFilmThicknessMicronMax] = useState("");
  const [bagType, setBagType] = useState("");
  const [bagDimension, setBagDimension] = useState("");
  const [innerBag, setInnerBag] = useState("");
  const [outerBag, setOuterBag] = useState("");
  const [innerCarton, setInnerCarton] = useState("");
  const [outerCarton, setOuterCarton] = useState("");
  const [bopptape, setBoppTape] = useState("");
  const [julianCodingInnerCarton, setJulianCodingInnerCarton] = useState("");
  const [poNoInnerCarton, setPoNoInnerCarton] = useState("");
  const [mfgDateInnerCarton, setMfgDateInnerCarton] = useState("");
  const [expiryDateInnerCarton, setExpiryDateInnerCarton] = useState("");
  const [printLocationInnerCarton, setPrintLocationInnerCarton] = useState("");
  const [lotCode, setLotCode] = useState("");
  const [mrp, setMrp] = useState("");
  const [usp, setUsp] = useState("");
  const [customerJulianCoding, setCustomerJulianCoding] = useState("");
  const [poNoOuterBag, setPoNoOuterBag] = useState("");
  const [mfgDateOuterBag, setMfgDateOuterBag] = useState("");
  const [expiryDateOuterBag, setExpiryDateOuterBag] = useState("");
  const [printLocationOuterBag, setPrintLocationOuterBag] = useState("");
  const [poNoOuterCarton, setPoNoOuterCarton] = useState("");
  const [mfgDateOuterCarton, setMfgDateOuterCarton] = useState("");
  const [expiryDateOuterCarton, setExpiryDateOuterCarton] = useState("");
  const [printLocationOuterCarton, setPrintLocationOuterCarton] = useState("");
  const [innerCartonType, setInnerCartonType] = useState("");
  const [innerDimensionOuterMm, setInnerDimensionOuterMm] = useState("");
  const [innerNumberOfPly, setInnerNumberOfPly] = useState("");
  const [innerFlute, setInnerFlute] = useState("");
  const [innerBurstingStrength, setInnerBurstingStrength] = useState("");
  const [innerBoardGsm, setInnerBoardGsm] = useState("");
  const [outerCartonName, setOuterCartonName] = useState("");
  const [outerCartonType, setOuterCartonType] = useState("");
  const [outerDimensionOuterMm, setOuterDimensionOuterMm] = useState("");
  const [outerNumberOfPly, setOuterNumberOfPly] = useState("");
  const [outerFlute, setOuterFlute] = useState("");
  const [outerBurstingStrength, setOuterBurstingStrength] = useState("");
  const [outerBoardGsm, setOuterBoardGsm] = useState("");
  const [plyColor1, setPlyColor1] = useState("");
  const [plyColor2, setPlyColor2] = useState("");
  const [plyColor3, setPlyColor3] = useState("");
  const [bagSeal, setBagSeal] = useState("");
  const [cartonSeal, setCartonSeal] = useState("");
  const [barcodeSticker, setBarcodeSticker] = useState("");
  const [plainBoxSticker, setPlainBoxSticker] = useState("");
  const [alignmentOfInnerCarton, setAlignmentOfInnerCarton] = useState("");
  const [orientationOfInnerCarton, setOrientationOfInnerCarton] = useState("");
  const [alignmentOfPacks, setAlignmentOfPacks] = useState("");
  const [orientationOfPacks, setOrientationOfPacks] = useState("");
  const [customerComment, setCustomerComment] = useState("");
  const [pdsEffectiveDate, setPdsEffectiveDate] = useState("");
  const [notesOfRequirement, setNotesOfRequirement] = useState("");
  const [natureOfChange, setNatureOfChange] = useState("");
  const [developmentSupervisorSign, setDevelopmentSupervisorSign] =
    useState("");
  const [developmentSupervisorStatus, setDevelopmentSupervisorStatus] =
    useState("");
  const [developmentSupervisorSubmitOn, setDevelopmentSupervisorSubmitOn] =
    useState("");
  const [qcSign, setQcSign] = useState("");
  const [qcStatus, setQcStatus] = useState("");
  const [qcSubmitOn, setQcSubmitOn] = useState("");
  const [qaSign, setQaSign] = useState("");
  const [qaStatus, setQaStatus] = useState("");
  const [qaSubmitOn, setQaSubmitOn] = useState("");
  const [ppcSign, setPpcSign] = useState("");
  const [ppcStatus, setPpcStatus] = useState("");
  const [ppcSubmitOn, setPpcSubmitOn] = useState("");
  const [bleachingSign, setBleachingSign] = useState("");
  const [bleachingStatus, setBleachingStatus] = useState("");
  const [bleachingSubmitOn, setBleachingSubmitOn] = useState("");
  const [spunlaceSign, setSpunlaceSign] = useState("");
  const [spunlaceStatus, setSpunlaceStatus] = useState("");
  const [spunlaceSubmitOn, setSpunlaceSubmitOn] = useState("");
  const [padPunchingSign, setPadPunchingSign] = useState("");
  const [padPunchingStatus, setPadPunchingStatus] = useState("");
  const [padPunchingSubmitOn, setPadPunchingSubmitOn] = useState("");
  const [dryGoodsSign, setDryGoodsSign] = useState("");
  const [dryGoodsStatus, setDryGoodsStatus] = useState("");
  const [dryGoodsSubmitOn, setDryGoodsSubmitOn] = useState("");
  const [getImageInnerFilmI, setGetImageInnerFilmI] = useState(null);
  const [getImageOuterFilmII, setGetImageOuterFilmII] = useState(null);
  const [getImageInnerCartonIII, setGetImageInnerCartonIII] = useState(null);
  const [getImageOuterCartonIV, setGetImageOuterCartonIV] = useState(null);
  const [getSlipSheetImage, setGetSlipSheetImage] = useState(null);
  const [innerFilmImage, setInnerFilmImage] = useState(null);
  const [outerFilmImage, setOuterFilmImage] = useState(null);
  const [innerCartonImage, setInnerCartonImage] = useState(null);
  const [outerCartonImage, setOuterCartonImage] = useState(null);
  const [slipSheetImage, setSlipSheetImage] = useState(null);
  const roleauth = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [editResponse, seteditResponse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [Nomenclature, setNomenclature] = useState("");
  const [innerCustomerJulianCoding, setInnerCustomerJulianCoding] =
    useState("");
  const [poNoInnerBag, setPoNoInnerBag] = useState("");
  const [mfgDateInnerBag, setMfgDateInnerBag] = useState("");
  const [expiryDateInnerBag, setExpiryDateInnerBag] = useState("");
  const [mrpInner, setMrpInner] = useState("");
  const [OnInnerBagTitle, setOnInnerBagTitle] = useState("On Inner bag");
  const [innerBagParameter, setInnerBagParameter] = useState("");
  const [printLocationInnerBag, setPrintLocationInnerBag] = useState("");
  const [uspInnerParameter, setUspInnerParameter] = useState("");
  const [uspInner, setUspInner] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [lengthWiseDimension, setLengthWiseDimension] = useState("");
  const [widthWiseDimension, setWidthWiseDimension] = useState("");
  const [lengthWise, setLengthWise] = useState("");
  const [widthWise, setWidthWise] = useState("");
  const [total, setTotal] = useState("");

  const [detailsRows, setDetailsRows] = useState([
    { parameter: "", specs: "", limit: "", min: "", max: "" },
  ]);

  const [shapeRows, setShapeRows] = useState([
    { parameter: "", productsizeSpec: "", tolerance: "" },
  ]);

  const [rows, setRows] = useState([
    {
      parameter: null,
      gsmPatternSide1Specification: null,
      gsmPatternSide1Tolerance: null,
      gsmPatternSide1SlideParameter: null,
      gsmPatternSide2Specification: null,
      gsmPatternSide2Tolerance: null,
      gsmPatternSide2SlideParameter: null,
    },
  ]);

  const [skuDetailsRows, setSkuDetailsRows] = useState([
    {
      parameter: "",
      grossWtFilledOuterCarton: "",
      grossWtFilledOuterCartonMin: "",
      grossWtFilledOuterCartonMax: "",
      grossWtFilledOuterCartonLimit: "",
    },
  ]);

  const [SecondaryPackingDetailsRows, setSecondaryPackingDetailsRows] =
    useState([
      {
        packingDetails: "",
        filmType: "",
        filmThicknessMicron: "",
        filmThicknessMicronLimit: "",
        filmThicknessMicronMin: "",
        filmThicknessMicronMax: "",
        bagType: "",
        bagDimension: "",
      },
    ]);

  const [innerCartonRows, setInnerCartonRows] = useState([
    { parameter: "BoardGSM", innerboardgsm: "", isFixed: true },
  ]);
  const [outerCartonRows, setOuterCartonRows] = useState([
    {
      parameter: "",
      boardgsm: "",
    },
  ]);
  const [plycolorsRows, setPlycolorsRows] = useState([
    {
      parameter: "",
      plycolor1: "",
      plycolor2: "",
      plycolor3: "",
    },
  ]);
  const [plycolorsInnerCartonRows, setPlycolorsInnerCartonRows] = useState([
    {
      parameter: "",
      plycolor1: "",
      plycolor2: "",
      plycolor3: "",
    },
  ]);

  const [sealingQualityDetails, setSealingQualityDetails] = useState([
    { parameter: "", cartonseal: "" },
  ]);

  const [packingDetails, setPackingDetails] = useState([
    { parameter: "", bopptape: "" },
  ]);

  const [printLocationOuterbagDetails, setPrintLocationOuterbagDetails] =
    useState([
      {
        printLocationOuterBag: "",
        printLocationInnerCarton: "",
        innerCartonparameter: "",
        printLocationOuterCarton: "",
        outerBagparameter: "",
        outerCartonparameter: "",
        InnerBagparameter: "",
        printLocationInnerBag: "",
      },
    ]);

  const [printLocationInnerCartonDetails, setPrintLocationInnerCartonDetails] =
    useState([{ parameter: "", printLocationInnerCarton: "" }]);

  const [printLocationOutercartonDetails, setPrintLocationOutercartonDetails] =
    useState([{ parameter: "", printLocationOuterCarton: "" }]);
  const [customerRequirementDetails, setCustomerRequirementDetails] = useState([
    { parameter: "", usp: "", UspInnerparameter: "", UspInner: "" },
  ]);
  const [productDevStrikerDetails, setProductDevStrikerDetails] = useState([
    { plainboxsticker: "", parameter: "" },
  ]);

  const [packingMethodDetails, setPackingMethodDetails] = useState([
    { orientationofpacks: "", parameter: "" },
  ]);

  const [slipsheetSpecificationsDetails, setSlipsheetSpecificationsDetails] =
    useState([
      {
        parameter: "",
        pullSide: "",
      },
    ]);

  const [cartonsperSlipSheetDetails, setCartonsperSlipSheetDetails] = useState([
    {
      parameter: "",
      heightWise: "",
      heightWiseDimension: "",
    },
  ]);

  const handleAddRow = (stateSetter, newRow) => {
    stateSetter((prevRows) => [...prevRows, newRow]);
  };
  const handleInputChange = (stateSetter, index, field, value) => {
    stateSetter((prevRows) => {
      const updatedRows = [...(prevRows || [])];

      if (!updatedRows[index]) {
        updatedRows[index] = {};
      }

      updatedRows[index][field] = value;

      return updatedRows;
    });
  };
  const handleRemoveRow = (stateSetter, index) => {
    stateSetter((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const addDetailsRow = () =>
    handleAddRow(setDetailsRows, {
      parameter: "",
      specs: "",
      limit: "",
      min: "",
      max: "",
    });
  const addShapeRow = () =>
    handleAddRow(setShapeRows, {
      parameter: "",
      productsizeSpec: "",
      productsizeTolerence: "",
    });
  const addPatternRow = () =>
    handleAddRow(setRows, {
      side1Pattern: "",
      side1PatternTolerance: "",
      side2Pattern: "",
      side2PatternTolerance: "",
    });
  const addSkuDetailsRow = () =>
    handleAddRow(setSkuDetailsRows, {
      parameter: "",
      grossWtFilledOuterCarton: "",
      grossWtFilledOuterCartonMin: "",
      grossWtFilledOuterCartonMax: "",
      grossWtFilledOuterCartonLimit: "",
    });
  const addSecondaryPackingDetails = () =>
    handleAddRow(setSecondaryPackingDetailsRows, {
      packingDetails: "",
      filmType: "",
      filmThicknessMicron: "",
      filmThicknessMicronLimit: "",
      filmThicknessMicronMin: "",
      filmThicknessMicronMax: "",
      bagType: "",
      bagDimension: "",
    });

  const addInnercartonRow = () => {
    setInnerCartonRows((prevRows) => [
      ...prevRows,
      { parameter: "", innerboardgsm: "", isFixed: false },
    ]);
  };
  const addOutercartonRow = () =>
    handleAddRow(setOuterCartonRows, { parameter: "", boardgsm: "" });
  const addPlyColorRow = () =>
    handleAddRow(setPlycolorsRows, {
      parameter: "",
      plycolor1: "",
      plycolor2: "",
      plycolor3: "",
    });
  const addPlyColorInnerCartonRow = () =>
    handleAddRow(setPlycolorsInnerCartonRows, {
      parameter: "",
      plycolor1: "",
      plycolor2: "",
      plycolor3: "",
    });
  const addSealingQualityRow = () =>
    handleAddRow(setSealingQualityDetails, { parameter: "", cartonseal: "" });
  const addPackingDetailsRow = () =>
    handleAddRow(setPackingDetails, { parameter: "", bopptape: "" });
  const addPrintLocationOuterBagRow = () =>
    handleAddRow(setPrintLocationOuterbagDetails, {
      printLocationOuterBag: "",
      printLocationInnerCarton: "",
      innerCartonparameter: "",
      printLocationOuterCarton: "",
      outerBagparameter: "",
      outerCartonparameter: "",
      InnerBagparameter: "",
      printLocationInnerBag: "",
    });
  const addcustomerRequirementDetailsRow = () =>
    handleAddRow(setCustomerRequirementDetails, {
      parameter: "",
      usp: "",
      UspInnerparameter: "",
      UspInner: "",
    });
  const addProductDevStrikerRow = () =>
    handleAddRow(setProductDevStrikerDetails, {
      plainboxsticker: "",
      parameter: "",
    });
  const addPackingMethodRow = () =>
    handleAddRow(setPackingMethodDetails, {
      orientationofpacks: "",
      parameter: "",
    });
  const addSlipSheetSpecRow = () =>
    handleAddRow(setSlipsheetSpecificationsDetails, {
      parameter: "",
      length: "",
      width: "",
      thickness: "",
      pullSide: "",
    });
  const addSlipSheetCartonRow = () =>
    handleAddRow(setCartonsperSlipSheetDetails, {
      parameter: "",
      lengthWise: "",
      widthWise: "",
      heightWise: "",
      lengthWiseDimension: "",
      widthWiseDimension: "",
      heightWiseDimension: "",
      total: "",
    });

  const updateDetailsRow = (index, field, value) =>
    handleInputChange(setDetailsRows, index, field, value);
  const updateShapeRow = (index, field, value) =>
    handleInputChange(setShapeRows, index, field, value);
  const updatePatternRow = (index, field, value) =>
    handleInputChange(setRows, index, field, value);
  const updateSkuDetailsRow = (index, field, value) =>
    handleInputChange(setSkuDetailsRows, index, field, value);
  const updateSecondaryPackingDetails = (index, field, value) =>
    handleInputChange(setSecondaryPackingDetailsRows, index, field, value);
  const updateInnerCarton = (index, field, value) =>
    handleInputChange(setInnerCartonRows, index, field, value);
  const updateOuterCarton = (index, field, value) =>
    handleInputChange(setOuterCartonRows, index, field, value);
  const updatePlycolor = (index, field, value) =>
    handleInputChange(setPlycolorsRows, index, field, value);
  const updatePlycolorInnerCarton = (index, field, value) =>
    handleInputChange(setPlycolorsInnerCartonRows, index, field, value);
  const updateSealingQualityRow = (index, field, value) =>
    handleInputChange(setSealingQualityDetails, index, field, value);
  const updatePackingDetailsRow = (index, field, value) =>
    handleInputChange(setPackingDetails, index, field, value);
  const updatePrintLocationOuterBagRow = (index, field, value) =>
    handleInputChange(setPrintLocationOuterbagDetails, index, field, value);
  const updateCustomerRequirementDetailsRow = (index, field, value) =>
    handleInputChange(setCustomerRequirementDetails, index, field, value);
  const updateProductDevStrikerRow = (index, field, value) =>
    handleInputChange(setProductDevStrikerDetails, index, field, value);
  const updatePackingMethodRow = (index, field, value) =>
    handleInputChange(setPackingMethodDetails, index, field, value);
  const updateSlipSheetSpecRow = (index, field, value) =>
    handleInputChange(setSlipsheetSpecificationsDetails, index, field, value);
  const updateSlipsheetCartonRow = (index, field, value) =>
    handleInputChange(setCartonsperSlipSheetDetails, index, field, value);

  const removeDetailsRow = (index) => handleRemoveRow(setDetailsRows, index);
  const removeShapeRow = (index) => handleRemoveRow(setShapeRows, index);
  const removePatternRow = (index) => handleRemoveRow(setRows, index);
  const removeSkuDetailsRow = (index) =>
    handleRemoveRow(setSkuDetailsRows, index);
  const removeSecondaryPackingDetails = (index) =>
    handleRemoveRow(setSecondaryPackingDetailsRows, index);
  const removeInnerCarton = (index) =>
    handleRemoveRow(setInnerCartonRows, index);
  const removeOuterCarton = (index) =>
    handleRemoveRow(setOuterCartonRows, index);
  const removeSealingQualityRow = (index) =>
    handleRemoveRow(setSealingQualityDetails, index);
  const removePackingDetailsRow = (index) =>
    handleRemoveRow(setPackingDetails, index);
  const removePrintLocationOuterBagRow = (index) =>
    handleRemoveRow(setPrintLocationOuterbagDetails, index);
  const removePrintLocationInnerCartonRow = (index) =>
    handleRemoveRow(setPrintLocationInnerCartonDetails, index);
  const removePrintLocationOuterCartonRow = (index) =>
    handleRemoveRow(setPrintLocationOutercartonDetails, index);
  const removeCustomerRequirementDetailsRow = (index) =>
    handleRemoveRow(setCustomerRequirementDetails, index);
  const removeProductDevStrikerRow = (index) =>
    handleRemoveRow(setProductDevStrikerDetails, index);
  const removePackingMethodRow = (index) =>
    handleRemoveRow(setPackingMethodDetails, index);

  useEffect(() => {
    const fetchNomenclature = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/ProductDevelopment/lastnomenclature`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setNomenclature(response.data || "");
        }
      } catch (error) {
        console.error("Error fetching the note:", error);
      }
    };

    fetchNomenclature();
  }, []);
  const formatDate = (dateStr) => {
    if (!dateStr) {
      return "";
    }
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return "";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const [getImage1, setGetImage1] = useState(null);
  const [getImageQC, setGetImageQC] = useState(null);
  const [getImageQA, setGetImageQA] = useState(null);
  const [getImagePPC, setGetImagePPC] = useState(null);
  const [getImageBleaching, setGetImageBleaching] = useState(null);
  const [getImageSpunlace, setGetImageSpunlace] = useState(null);
  const [getImagePadPunching, setGetImagePadPunching] = useState(null);
  const [getImageDryGoods, setGetImageDryGoods] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
 
      const response = await fetch(
        `${API.prodUrl}/Precot/api/ProductDevelopment/getProductDevelopment?pdsNo=${state.pdsNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      seteditResponse(data[0]);
   
      setId(data[0].id);
      setPdsNo(data[0].pdsNo);
      setRevisionNo(data[0].revisionNo);
      setRevisionDate(data[0].revisionDate);
      setProductDescription(data[0].productDescription);
      setCustomerName(data[0].customerName);
      setProductCode(data[0].productCode);
      setBrand(data[0].brand);
      setCountry(data[0].country);
      setMixingRatio(data[0].mixingRatio);
      setSampleRequisitionNo(data[0].sampleRequisitionNo);
      setShapeSpecification(data[0].shapeSpecification);
      setShapeTolerence(data[0].shapeTolerence);
      setShapeMin(data[0].shapeMin);
      setShapeMax(data[0].shapeMax);
      setSize(data[0].size);
      setSizeLimit(data[0].sizelimit);
      setSizeMin(data[0].sizeMin);
      setSizeMax(data[0].sizeMax);
      setCountPerPack(data[0].countPerPack);
      setCountPerPackMin(data[0].countPerPackMin);
      setCountPerPackMax(data[0].countPerPackMax);
      setCountPerPackLimit(data[0].countPerPackLimit);
      setPacksPerInnerCarton(data[0].packsPerInnerCarton);
      setPacksPerInnerCartonMin(data[0].packsPerInnerCartonMin);
      setPacksPerInnerCartonMax(data[0].packsPerInnerCartonMax);
      setPacksPerInnerCartonLimit(data[0].packsPerInnerCartonLimit);
      setInnerPerOuterCarton(data[0].innerPerOuterCarton);
      setInnerPerOuterCartonMin(data[0].innerPerOuterCartonMin);
      setInnerPerOuterCartonMax(data[0].innerPerOuterCartonMax);
      setInnerPerOuterCartonLimit(data[0].innerPerOuterCartonLimit);
      setPacksPerOuterCarton(data[0].packsPerOuterCarton);
      setPacksPerOuterCartonMin(data[0].packsPerOuterCartonMin);
      setPacksPerOuterCartonMax(data[0].packsPerOuterCartonMax);
      setPacksPerOuterCartonLimit(data[0].packsPerOuterCartonLimit);
      const rows = data[0].gsmDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.parameter,
        specs: detail.gsmSpec,
        limit: detail.gsmTolerenceLimit,
        min: detail.gsmTolerenceMin,
        max: detail.gsmTolerenceMax,
      }));
      setDetailsRows(rows);
      setGsm(data[0].gsmDetails[0].gsmSpec);
      setGsmLimit(data[0].gsmDetails[0].gsmTolerenceLimit);
      setGsmMax(data[0].gsmDetails[0].gsmTolerenceMax);
      setGsmMin(data[0].gsmDetails[0].gsmTolerenceMin);
      setSide1Pattern(data[0].side1Pattern);
      setSide2Pattern(data[0].side2Pattern);
      setSide1PatternTolerance(data[0].side1Patterntolerance);
      setSide2PatternTolerance(data[0].side2Patterntolerance);
      const patternRows = data[0].gsmSlideDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.parameter,
        gsmPatternSide1Specification: detail.gsmPatternSide1Specification,
        gsmPatternSide1Tolerance: detail.gsmPatternSide1Tolerance,
        gsmPatternSide1SlideParameter: detail.gsmPatternSide1SlideParameter,
        gsmPatternSide2Specification: detail.gsmPatternSide2Specification,
        gsmPatternSide2Tolerance: detail.gsmPatternSide2Tolerance,
        gsmPatternSide2SlideParameter: detail.gsmPatternSide2SlideParameter,
      }));
      setRows(patternRows);
      const productRows = data[0].details.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.parameter,
        productsizeSpec: detail.productsizeSpec,
        productsizeTolerence: detail.productsizeTolerence,
      }));
      setShapeRows(productRows);
      const secondaryPackingDetails = data[0].secondaryPackingDetails.map(
        (detail) => ({
          id: detail.id,
          parentId: detail.parentId,
          packingDetails: detail.packingDetails,
          filmType: detail.filmType,
          filmThicknessMicron: detail.filmThicknessMicron,
          filmThicknessMicronLimit: detail.filmThicknessMicronLimit,
          filmThicknessMicronMin: detail.filmThicknessMicronMin,
          filmThicknessMicronMax: detail.filmThicknessMicronMax,
          bagType: detail.bagType,
          bagDimension: detail.bagDimension,
        })
      );
      setSecondaryPackingDetailsRows(secondaryPackingDetails);
      const skuDetails = data[0].skuDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        grossWtFilledOuterCarton: detail.grossWtFilledOuterCarton,
        grossWtFilledOuterCartonMin: detail.grossWtFilledOuterCartonMin,
        grossWtFilledOuterCartonMax: detail.grossWtFilledOuterCartonMax,
        grossWtFilledOuterCartonLimit: detail.grossWtFilledOuterCartonLimit,
        parameter: detail.parameter,
      }));
      setSkuDetailsRows(skuDetails);
      const innerCarton = data[0].innercottonDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        innerboardgsm: detail.innerboardgsm,
        parameter: detail.parameter,
      }));
      setInnerCartonRows(innerCarton);
      const outerCarton = data[0].outercottonDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        boardgsm: detail.boardgsm,
        parameter: detail.parameter,
      }));
      setOuterCartonRows(outerCarton);
      const plycolor = data[0].plyColors.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.colorName,
        plycolor1: detail.plycolor1,
        plycolor2: detail.plycolor2,
        plycolor3: detail.plycolor3,
      }));
      setPlycolorsRows(plycolor);
      const plycolorInnerbag = data[0].innerplyColors.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.colorName,
        plycolor1: detail.plycolor1,
        plycolor2: detail.plycolor2,
        plycolor3: detail.plycolor3,
      }));
      setPlycolorsInnerCartonRows(plycolorInnerbag);
      setWeightInnerEmptyBag(data[0]?.weightInnerEmptyBag);
      setWeightInnerEmptyBagMin(data[0]?.weightInnerEmptyBagMin);
      setWeightInnerEmptyBagMax(data[0]?.weightInnerEmptyBagMax);
      setWeightInnerEmptyBagLimit(data[0]?.weightInnerEmptyBagLimit);
      setWeightOuterEmptyBag(data[0]?.weightOuterEmptyBag);
      setWeightOuterEmptyBagMin(data[0]?.weightOuterEmptyBagMin);
      setWeightOuterEmptyBagMax(data[0]?.weightOuterEmptyBagMax);
      setWeightOuterEmptyBagLimit(data[0]?.weightOuterEmptyBagLimit);
      setWeightEmptyInnerCarton(data[0]?.weightEmptyInnerCarton);
      setWeightEmptyInnerCartonMin(data[0]?.weightEmptyInnerCartonMin);
      setWeightEmptyInnerCartonMax(data[0]?.weightEmptyInnerCartonMax);
      setWeightEmptyInnerCartonLimit(data[0]?.weightEmptyInnerCartonLimit);
      setWeightEmptyOuterCarton(data[0]?.weightEmptyOuterCarton);
      setWeightEmptyOuterCartonMin(data[0]?.weightEmptyOuterCartonMin);
      setWeightEmptyOuterCartonMax(data[0]?.weightEmptyOuterCartonMax);
      setWeightEmptyOuterCartonLimit(data[0]?.weightEmptyOuterCartonLimit);
      setNetWtFilledPack(data[0]?.netWtFilledPack);
      setNetWtFilledPackMin(data[0]?.netWtFilledPackMin);
      setNetWtFilledPackMax(data[0]?.netWtFilledPackMax);
      setNetWtFilledPackLimit(data[0]?.netWtFilledPackLimit);
      setGrossWtFilledPack(data[0]?.grossWtFilledPack);
      setGrossWtFilledPackMin(data[0]?.grossWtFilledPackMin);
      setGrossWtFilledPackMax(data[0]?.grossWtFilledPackMax);
      setGrossWtFilledPackLimit(data[0]?.grossWtFilledPackLimit);
      setNetWtFilledInnerCarton(data[0]?.netWtFilledInnerCarton);
      setNetWtFilledInnerCartonMin(data[0]?.netWtFilledInnerCartonMin);
      setNetWtFilledInnerCartonMax(data[0]?.netWtFilledInnerCartonMax);
      setNetWtFilledInnerCartonLimit(data[0]?.netWtFilledInnerCartonLimit);
      setGrossWtFilledInnerCarton(data[0]?.grossWtFilledInnerCarton);
      setGrossWtFilledInnerCartonMin(data[0]?.grossWtFilledInnerCartonMin);
      setGrossWtFilledInnerCartonMax(data[0]?.grossWtFilledInnerCartonMax);
      setGrossWtFilledInnerCartonLimit(data[0]?.grossWtFilledInnerCartonLimit);
      setNetWtFilledOuterCarton(data[0]?.netWtFilledOuterCarton);
      setNetWtFilledOuterCartonMin(data[0]?.netWtFilledOuterCartonMin);
      setNetWtFilledOuterCartonMax(data[0]?.netWtFilledOuterCartonMax);
      setNetWtFilledOuterCartonLimit(data[0]?.netWtFilledOuterCartonLimit);
      setGrossWtFilledOuterCarton(data[0]?.grossWtFilledOuterCarton);
      setGrossWtFilledOuterCartonMin(data[0]?.grossWtFilledOuterCartonMin);
      setGrossWtFilledOuterCartonMax(data[0]?.grossWtFilledOuterCartonMax);
      setGrossWtFilledOuterCartonLimit(data[0]?.grossWtFilledOuterCartonLimit);
      setPrimaryFilmType(data[0].primaryfilmType);
      setPrimaryFilmThicknessMicron(data[0].primaryfilmThicknessMicron);
      setPrimaryFilmThicknessMicronLimit(
        data[0].primaryfilmThicknessMicronLimit
      );
      setPrimaryFilmThicknessMicronMin(data[0].primaryfilmThicknessMicronMin);
      setPrimaryFilmThicknessMicronMax(data[0].primaryfilmThicknessMicronMax);
      setPrimaryBagType(data[0].primarybagType);
      setPrimaryBagDimension(data[0].primarybagDimension);
      setFilmType(data[0].filmType);
      setFilmThicknessMicron(data[0].filmThicknessMicron);
      setFilmThicknessMicronLimit(data[0].filmThicknessMicronLimit);
      setFilmThicknessMicronMin(data[0].filmThicknessMicronMin);
      setFilmThicknessMicronMax(data[0].filmThicknessMicronMax);
      setBagType(data[0].bagType);
      setBagDimension(data[0].bagDimension);
      setInnerBag(data[0].innerbag);
      setOuterBag(data[0].outerbag);
      setInnerCarton(data[0].innercarton);
      setOuterCarton(data[0].outercarton);
      const packingDetails = data[0].packingDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.parameter,
        bopptape: detail.bopptape,
      }));
      setPackingDetails(packingDetails);
      setJulianCodingInnerCarton(data[0].julianCodingInnerCarton);
      setPoNoInnerCarton(data[0].poNoInnerCarton);
      setMfgDateInnerCarton(data[0].mfgDateInnerCarton);
      setExpiryDateInnerCarton(data[0].expiryDateInnerCarton);
      setLotCode(data[0].lotCode);
      setMrp(data[0].mrp);
      const customerRequirement = data[0].customerRequirementDetails.map(
        (detail) => ({
          id: detail.id,
          parentId: detail.parentId,
          parameter: detail.parameter,
          usp: detail.usp,
          UspInner: detail.uspInner,
          UspInnerparameter: detail.uspInnerparameter,
        })
      );
      setCustomerRequirementDetails(customerRequirement);
      const printLocation = data[0].printLocationOuterbagDetails.map(
        (detail) => ({
          id: detail.id,
          parentId: detail.parentId,
          printLocationOuterBag: detail.printLocationOuterBag,
          printLocationInnerCarton: detail.printLocationInnerCarton,
          innerCartonparameter: detail.innerCartonparameter,
          printLocationOuterCarton: detail.printLocationOuterCarton,
          outerBagparameter: detail.outerBagparameter,
          outerCartonparameter: detail.outerCartonparameter,
          printLocationInnerBag: detail.printLocationInnerBag,
          InnerBagparameter: detail.innerBagparameter,
        })
      );
      setPrintLocationOuterbagDetails(printLocation);
      setCustomerJulianCoding(data[0].customerJulianCoding);
      setPoNoOuterBag(data[0].poNoOuterBag);
      setMfgDateOuterBag(data[0].mfgDateOuterBag);
      setExpiryDateOuterBag(data[0].expiryDateOuterBag);
      setInnerCustomerJulianCoding(data[0].innerCustomerJulianCoding);
      setPoNoInnerBag(data[0].poNoInnerBag);
      setMfgDateInnerBag(data[0].mfgDateInnerBag);
      setExpiryDateInnerBag(data[0].expiryDateInnerBag);
      setMrpInner(data[0].mrpInner);
      setOnInnerBagTitle(data[0].onInnerBagTitle);
      setPoNoOuterCarton(data[0].poNoOuterCarton);
      setMfgDateOuterCarton(data[0].mfgDateOuterCarton);
      setExpiryDateOuterCarton(data[0].expiryDateOuterCarton);
      setInnerCartonType(data[0].innercartonType);
      setInnerDimensionOuterMm(data[0].innerdimensionOuterMm);
      setInnerNumberOfPly(data[0].innernumberOfPly);
      setInnerFlute(data[0].innerflute);
      setInnerBurstingStrength(data[0].innerburstingstrenght);
      setInnerBoardGsm(data[0].innerboardgsm);
      setOuterCartonName(data[0].outercartonName);
      setOuterCartonType(data[0].outercartontype);
      setOuterDimensionOuterMm(data[0].outerdimensionOuterMm);
      setOuterNumberOfPly(data[0].outernumberOfPly);
      setOuterFlute(data[0].outerflute);
      setOuterBurstingStrength(data[0].outerburstingstrenght);
      setOuterBoardGsm(data[0].outerboardgsm);
      setBagSeal(data[0].bagseal);
      setLength(data[0].length);
      setWidth(data[0].width);
      setThickness(data[0].thickness);
      setLengthWise(data[0].lengthWise);
      setWidthWise(data[0].widthWise);
      setLengthWiseDimension(data[0].lengthWiseDimension);
      setWidthWiseDimension(data[0].widthWiseDimension);
      setTotal(data[0].total);
      const sealingQuality = data[0].sealingqualityDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.parameter,
        cartonseal: detail.cartonseal,
      }));
      setSealingQualityDetails(sealingQuality);
      setBarcodeSticker(data[0].barcodesticker);
      const stickerdetails = data[0].productDevStrikerDetails.map((detail) => ({
        id: detail.id,
        parentId: detail.parentId,
        parameter: detail.parameter,
        plainboxsticker: detail.plainboxsticker,
      }));
      setProductDevStrikerDetails(stickerdetails);
      setAlignmentOfInnerCarton(data[0].alighmentofinnercarton);
      setOrientationOfInnerCarton(data[0].orienatationofinnercarton);
      setAlignmentOfPacks(data[0].alighmentofpacks);
      const packingMethodDetails = data[0].packingMethodDetails.map(
        (detail) => ({
          id: detail.id,
          parentId: detail.parentId,
          parameter: detail.parameter,
          orientationofpacks: detail.orientationofpacks,
        })
      );
      setPackingMethodDetails(packingMethodDetails);
      const SlipsheetSpecDetails = data[0].slipsheetSpecificationsDetails.map(
        (detail) => ({
          id: detail.id,
          parentId: detail.parentId,
          parameter: detail.parameter,
          pullSide: detail.pullSide,
        })
      );
      setSlipsheetSpecificationsDetails(SlipsheetSpecDetails);
      const SlipsheetcartonDetails = data[0].cartonsperSlipSheetDetails.map(
        (detail) => ({
          id: detail.id,
          parentId: detail.parentId,
          parameter: detail.parameter,
          heightWise: detail.heightWise,
          heightWiseDimension: detail.heightWiseDimension,
        })
      );
      setCartonsperSlipSheetDetails(SlipsheetcartonDetails);
      setPdsEffectiveDate(data[0].pdseffectiveDate);
      setCustomerComment(data[0].customerComment);
      setNatureOfChange(data[0].natureofchange);
      setNotesOfRequirement(data[0].notesofrequirement);
      setDevelopmentSupervisorSign(data[0].developmentSupervisorSign);
      setDevelopmentSupervisorStatus(data[0].developmentSupervisorStatus);
      setDevelopmentSupervisorSubmitOn(data[0].developmentSupervisorSubmitOn);
      setQcSign(data[0].qcSign);
      setQcStatus(data[0].qcStatus);
      setQcSubmitOn(data[0].qcSubmitOn);
      setQaSign(data[0].qa_sign);
      setQaStatus(data[0].qa_Status);
      setQaSubmitOn(data[0].qa_submit_on);
      setPpcSign(data[0].ppc_sign);
      setPpcStatus(data[0].ppc_status);
      setPpcSubmitOn(data[0].ppc_submit_on);
      setBleachingSign(data[0].bleaching_sign);
      setBleachingStatus(data[0].bleaching_status);
      setBleachingSubmitOn(data[0].bleaching_submit_on);
      setSpunlaceSign(data[0].spunlace_sign);
      setSpunlaceStatus(data[0].spunlace_status);
      setSpunlaceSubmitOn(data[0].spunlace_submit_on);
      setPadPunchingSign(data[0].pad_punching_sign);
      setPadPunchingStatus(data[0].pad_punching_status);
      setPadPunchingSubmitOn(data[0].pad_punching_submit_on);
      setDryGoodsSign(data[0].dry_goods_sign);
      setDryGoodsStatus(data[0].dry_goods_status);
      setDryGoodsSubmitOn(data[0].dry_goods_submit_on);
      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].developmentSupervisorSign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          console.error("Error in fetching assistant image:", err);
        });

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].qcSign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          setGetImageQC(url);
        })
        .catch((err) => {
          console.error("Error in fetching QC image:", err);
        });

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].qa_sign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          setGetImageQA(url);
        })
        .catch((err) => {
          console.error("Error in fetching QA image:", err);
        });

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].ppc_sign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          setGetImagePPC(url);
        })
        .catch((err) => {
          console.error("Error in fetching PPC image:", err);
        });

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].bleaching_sign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          setGetImageBleaching(url);
        })
        .catch((err) => {
          console.error("Error in fetching Bleaching image:", err);
        });

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].spunlace_sign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          setGetImageSpunlace(url);
        })
        .catch((err) => {
          console.error("Error in fetching Spunlace image:", err);
        });

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].pad_punching_sign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          setGetImagePadPunching(url);
        })
        .catch((err) => {
          console.error("Error in fetching Pad Punching image:", err);
        });

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].dry_goods_sign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
          setGetImageDryGoods(url);
        })
        .catch((err) => {
          console.error("Error in fetching Dry Goods image:", err);
        });

      const supervisorApproved =
        data[0]?.developmentSupervisorStatus === "SUPERVISOR_APPROVED";
      const qcApproved = data[0]?.qcStatus === "QC_APPROVED";
      const qaApproved = data[0]?.qa_Status === "QA_APPROVED";
      const qcRejected = data[0]?.qcStatus === "QC_REJECTED";
      const qaRejected = data[0]?.qa_Status === "QA_REJECTED";

      if (roleauth === "QC_MANAGER") {
        if (!supervisorApproved || qcRejected || qaRejected) {
          message.warning("Development Supervisor has not Submitted yet");
          setTimeout(() => {
            navigate("/Precot/Development/F-001/Summary");
          }, 1500);
          return;
        }
      }

      if (roleauth === "QA_MANAGER") {
        if (!qcApproved || qaRejected || qcRejected) {
          message.warning("QC Manager has not Approved yet");
          setTimeout(() => {
            navigate("/Precot/Development/F-001/Summary");
          }, 1500);
          return;
        }
      }
      const departmentStatuses = [
        { name: "PPC", status: data[0]?.ppc_status },
        { name: "BLEACHING", status: data[0]?.bleaching_status },
        { name: "SPUNLANCE", status: data[0]?.spunlace_status },
        { name: "PADPUNCHING", status: data[0]?.pad_punching_status },
        { name: "DRYGOODS", status: data[0]?.dry_goods_status },
      ];

      for (const department of departmentStatuses) {
        if (department.status === `${department.name.toUpperCase()}_REJECTED`) {
          message.warning(`${department.name} status rejected`);
          setTimeout(() => {
            navigate("/Precot/Development/F-001/Summary");
          }, 1500);
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    if (!state.pdsNo) return;

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/ProductDevelopment/images?pdsNo=${state.pdsNo}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const {
        innerFilmI,
        outerFilmII,
        innerCartonIII,
        outerCartonIV,
        slipSheet,
      } = response.data;

      setGetImageInnerFilmI(`data:image/jpeg;base64,${innerFilmI}`);
      setGetImageOuterFilmII(`data:image/jpeg;base64,${outerFilmII}`);
      setGetImageInnerCartonIII(`data:image/jpeg;base64,${innerCartonIII}`);
      setGetImageOuterCartonIV(`data:image/jpeg;base64,${outerCartonIV}`);
      setGetSlipSheetImage(`data:image/jpeg;base64,${slipSheet}`);
    } catch (error) {
      console.error("Error in fetching images:", error);
    }
  };

  const handleImageUpload = (image, type) => {
    if (!image) {
      message.error(`No image selected for ${type}`);
      return;
    }

    const formData = new FormData();
    formData.append("pdsNo", state.pdsNo);
    formData.append(type, image);
    fetch(`${API.prodUrl}/Precot/api/ProductDevelopment/uploadImage`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const result = response.json();
 
      setInnerFilmImage(null);
      setOuterFilmImage(null);
      setInnerCartonImage(null);
      setOuterCartonImage(null);
      setSlipSheetImage(null);
      message.success("Successfully uploaded");

      fetchImages();
    });
  };

  const handleImageRemove = async (type) => {
    Modal.confirm({
      title: "Are you sure you want to delete this image?",
      content: `This action will permanently remove the image for ${type}. Do you want to proceed?`,
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await fetch(
            `${API.prodUrl}/Precot/api/ProductDevelopment/deleteField?pdsNo=${state.pdsNo}&fieldName=${type}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            switch (type) {
              case "INNER_FILM_I":
                setGetImageInnerFilmI(null);
                break;
              case "OUTER_FILM_II":
                setGetImageOuterFilmII(null);
                break;
              case "INNER_CARTON_III":
                setGetImageInnerCartonIII(null);
                break;
              case "OUTER_CARTON_IV":
                setGetImageOuterCartonIV(null);
                break;
              case "SLIP_SHEET":
                setGetSlipSheetImage(null);
                break;
              default:
                break;
            }

     
            message.success(`Image removed for ${type} successfully`);

            await fetchImages();
          } else {
            message.error("Failed to delete image");
          }
        } catch (error) {
          console.error("Error while deleting image:", error);
          message.error("Failed to delete image.");
        }
      },
      onCancel() {
       
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
    navigate("/Precot/Development/F-001/Summary");
  };

  const canDisplaySubmitButton = () => {
    if (roleauth === "DEVELOPMENT_MANAGER") {
      return editResponse?.developmentSupervisorStatus !==
        "SUPERVISOR_APPROVED" ||
        editResponse?.qcStatus === "QC_REJECTED" ||
        editResponse?.qa_Status === "QA_REJECTED" ||
        editResponse?.ppc_status === "PPC_REJECTED" ||
        editResponse?.bleaching_status === "BLEACHING_REJECTED" ||
        editResponse?.spunlace_status === "SPUNLACE_REJECTED" ||
        editResponse?.pad_punching_status === "PADPUNCHING_REJECTED" ||
        editResponse?.dry_goods_status === "DRYGOODS_REJECTED"
        ? "block"
        : "none";
    }
    return "none";
  };

  const canDisplaySaveButton = () => {
    if (roleauth === "DEVELOPMENT_MANAGER") {
      return editResponse?.developmentSupervisorStatus !==
        "SUPERVISOR_APPROVED" &&
        editResponse?.qcStatus !== "QC_REJECTED" &&
        editResponse?.qa_Status !== "QA_REJECTED" &&
        editResponse?.ppc_status !== "PPC_REJECTED" &&
        editResponse?.bleaching_status !== "BLEACHING_REJECTED" &&
        editResponse?.spunlace_status !== "SPUNLACE_REJECTED" &&
        editResponse?.pad_punching_status !== "PADPUNCHING_REJECTED" &&
        editResponse?.dry_goods_status !== "DRYGOODS_REJECTED"
        ? "block"
        : "none";
    }

    return "none";
  };
  const departmentId = localStorage.getItem("departmentId");

  const canShowButtons = (buttonType) => {
    if (
      editResponse?.qcStatus === "QC_REJECTED" ||
      editResponse?.qa_Status === "QA_REJECTED"
    ) {
      return false;
    }

    switch (roleauth) {
      case "QC_MANAGER":
      case "ROLE_QC":
        if (editResponse?.qcStatus === "QC_APPROVED") return false;
        return buttonType === "approve" || buttonType === "reject";

      case "QA_MANAGER":
      case "ROLE_QA":
        if (editResponse?.qa_Status === "QA_APPROVED") return false;
        return buttonType === "approve" || buttonType === "reject";

      case "ROLE_HOD":
        if (
          (departmentId === "1" &&
            editResponse?.bleaching_status === "BLEACHING_APPROVED") ||
          (departmentId === "2" &&
            editResponse?.spunlace_status === "SPUNLANCE_APPROVED") ||
          (departmentId === "3" &&
            editResponse?.pad_punching_status === "PADPUNCHING_APPROVED") ||
          (departmentId === "4" &&
            editResponse?.dry_goods_status === "DRYGOODS_APPROVED") ||
          (departmentId === "7" && editResponse?.ppc_status === "PPC_APPROVED")
        ) {
          return false;
        }

        return buttonType === "approve";

      default:
        return true;
    }
  };

  const handleSave = () => {
    setSaveLoading(true);
    const monthYear = `${state.year}-${state.month}`;
 
    const payload = {
      id: id || null,
      format: "PRODUCT DEVELOPMENT SHEET ",
      format_no: "PH-DVP01/F-001",
      revisionNo: "01",
      ref_sop_no: "PH-DVP01-D-01",
      unit: "Unit H",
      pdsNo: state.pdsNo,
      revisionNo: revisionNo,
      revisionDate: revisionDate,
      productDescription: productDescription,
      customerName: customerName,
      productCode: productCode,
      brand: brand,
      country: country,
      mixingRatio: mixingRatio,
      sampleRequisitionNo: sampleRequisitionNo,
      size: size,
      sizelimit: sizelimit,
      sizeMin: sizeMin,
      sizeMax: sizeMax,
      countPerPack: countPerPack,
      countPerPackMin: countPerPackMin,
      countPerPackMax: countPerPackMax,
      countPerPackLimit: countPerPackLimit,
      packsPerInnerCarton: packsPerInnerCarton,
      packsPerInnerCartonMin: packsPerInnerCartonMin,
      packsPerInnerCartonMax: packsPerInnerCartonMax,
      packsPerInnerCartonLimit: packsPerInnerCartonLimit,
      innerPerOuterCarton: innerPerOuterCarton,
      innerPerOuterCartonMin: innerPerOuterCartonMin,
      innerPerOuterCartonMax: innerPerOuterCartonMax,
      innerPerOuterCartonLimit: innerPerOuterCartonLimit,
      packsPerOuterCarton: packsPerOuterCarton,
      packsPerOuterCartonMin: packsPerOuterCartonMin,
      packsPerOuterCartonMax: packsPerOuterCartonMax,
      packsPerOuterCartonLimit: packsPerOuterCartonLimit,
      shapeSpecification: shapeSpecification,
      shapeTolerence: shapeTolerence,
      productSize: productSize,
      producttolerance: productTolerance,
      side1Pattern: side1Pattern,
      side2Pattern: side2Pattern,
      side1Patterntolerance: side1PatternTolerance,
      side2Patterntolerance: side2PatternTolerance,
      details: shapeRows.map((row, index) => ({
        id: row.id || shapeRows?.id,
        parentId: row.parentId || shapeRows[0]?.parentId,
        parameter: index === 0 ? "Product size (mm)" : row.parameter,
        productsizeSpec: row.productsizeSpec,
        productsizeTolerence: row.productsizeTolerence,
      })),
      gsmDetails: detailsRows.map((row, index) => ({
        id: row.id || detailsRows[0]?.id,
        parentId: row.parentId || detailsRows[0]?.parentId,
        parameter: index === 0 ? "GSM" : row.parameter,
        gsmSpec: index === 0 ? gsm : row.specs,
        gsmTolerenceLimit: index === 0 ? gsmLimit : row.limit,
        gsmTolerenceMin: index === 0 ? gsmMin : row.min,
        gsmTolerenceMax: index === 0 ? gsmMax : row.max,
      })),
      gsmSlideDetails: rows.map((row, index) => ({
        id: row.id || rows?.id,
        parentId: row.parentId || rows[0]?.parentId,
        parameter: index === 0 ? "Pattern" : row.parameter,
        gsmPatternSide1Specification: row.gsmPatternSide1Specification,
        gsmPatternSide1Tolerance: row.gsmPatternSide1Tolerance,
        gsmPatternSide1SlideParameter: row.gsmPatternSide1SlideParameter,
        gsmPatternSide2Specification: row.gsmPatternSide2Specification,
        gsmPatternSide2Tolerance: row.gsmPatternSide2Tolerance,
        gsmPatternSide2SlideParameter: row.gsmPatternSide2SlideParameter,
      })),
      skuDetails: skuDetailsRows.map((row, index) => ({
        id: row.id || rows?.id,
        parentId: row.parentId || rows[0]?.parentId,
        grossWtFilledOuterCarton: row.grossWtFilledOuterCarton,
        grossWtFilledOuterCartonMin: row.grossWtFilledOuterCartonMin,
        grossWtFilledOuterCartonMax: row.grossWtFilledOuterCartonMax,
        grossWtFilledOuterCartonLimit:
          index === 0 ? "±10%" : row.grossWtFilledOuterCartonLimit,
        parameter:
          index === 0 ? "Gross Wt. of filled outer carton" : row.parameter,
      })),
      weightInnerEmptyBag: weightInnerEmptyBag,
      weightInnerEmptyBagMin: weightInnerEmptyBagMin,
      weightInnerEmptyBagMax: weightInnerEmptyBagMax,
      weightInnerEmptyBagLimit: weightInnerEmptyBagLimit,
      weightOuterEmptyBag: weightOuterEmptyBag,
      weightOuterEmptyBagMin: weightOuterEmptyBagMin,
      weightOuterEmptyBagMax: weightOuterEmptyBagMax,
      weightOuterEmptyBagLimit: weightOuterEmptyBagLimit,
      weightEmptyInnerCarton: weightEmptyInnerCarton,
      weightEmptyInnerCartonMin: weightEmptyInnerCartonMin,
      weightEmptyInnerCartonMax: weightEmptyInnerCartonMax,
      weightEmptyInnerCartonLimit: weightEmptyInnerCartonLimit,
      weightEmptyOuterCarton: weightEmptyOuterCarton,
      weightEmptyOuterCartonMin: weightEmptyOuterCartonMin,
      weightEmptyOuterCartonMax: weightEmptyOuterCartonMax,
      weightEmptyOuterCartonLimit: weightEmptyOuterCartonLimit,
      netWtFilledPack: netWtFilledPack,
      netWtFilledPackMin: netWtFilledPackMin,
      netWtFilledPackMax: netWtFilledPackMax,
      netWtFilledPackLimit: netWtFilledPackLimit,
      grossWtFilledPack: grossWtFilledPack,
      grossWtFilledPackMin: grossWtFilledPackMin,
      grossWtFilledPackMax: grossWtFilledPackMax,
      grossWtFilledPackLimit: grossWtFilledPackLimit,
      netWtFilledInnerCarton: netWtFilledInnerCarton,
      netWtFilledInnerCartonMin: netWtFilledInnerCartonMin,
      netWtFilledInnerCartonMax: netWtFilledInnerCartonMax,
      netWtFilledInnerCartonLimit: netWtFilledInnerCartonLimit,
      grossWtFilledInnerCarton: grossWtFilledInnerCarton,
      grossWtFilledInnerCartonMin: grossWtFilledInnerCartonMin,
      grossWtFilledInnerCartonMax: grossWtFilledInnerCartonMax,
      grossWtFilledInnerCartonLimit: grossWtFilledInnerCartonLimit,
      netWtFilledOuterCarton: netWtFilledOuterCarton,
      netWtFilledOuterCartonMin: netWtFilledOuterCartonMin,
      netWtFilledOuterCartonMax: netWtFilledOuterCartonMax,
      netWtFilledOuterCartonLimit: netWtFilledOuterCartonLimit,
      primaryfilmType: primaryfilmType,
      primaryfilmThicknessMicron: primaryfilmThicknessMicron,
      primaryfilmThicknessMicronLimit: primaryfilmThicknessMicronLimit,
      primaryfilmThicknessMicronMin: primaryfilmThicknessMicronMin,
      primaryfilmThicknessMicronMax: primaryfilmThicknessMicronMax,
      primarybagType: primarybagType,
      primarybagDimension: primarybagDimension,
      secondaryPackingDetails: SecondaryPackingDetailsRows.map(
        (row, index) => ({
          id: row.id,
          parentId: row.parentId || SecondaryPackingDetailsRows[0]?.parentId,
          packingDetails:
            index === 0
              ? "Secondary Packaging Details: (Film & Bag)"
              : row.packingDetails,
          filmType: row.filmType,
          filmThicknessMicron: row.filmThicknessMicron,
          filmThicknessMicronLimit: row.filmThicknessMicronLimit,
          filmThicknessMicronMin: row.filmThicknessMicronMin,
          filmThicknessMicronMax: row.filmThicknessMicronMax,
          bagType: row.bagType,
          bagDimension: row.bagDimension,
        })
      ),
      innerbag: innerBag,
      outerbag: outerBag,
      innercarton: innerCarton,
      outercarton: outerCarton,
      packingDetails: packingDetails.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || packingDetails[0]?.parentId,
        parameter: index === 0 ? "BOPP Tape" : row.parameter,
        bopptape: row.bopptape,
      })),
      julianCodingInnerCarton: julianCodingInnerCarton,
      poNoInnerCarton: poNoInnerCarton,
      mfgDateInnerCarton: mfgDateInnerCarton,
      expiryDateInnerCarton: expiryDateInnerCarton,
      lotCode: lotCode,
      mrp: mrp,

      innerCustomerJulianCoding: innerCustomerJulianCoding,
      poNoInnerBag: poNoInnerBag,
      mfgDateInnerBag: mfgDateInnerBag,
      expiryDateInnerBag: expiryDateInnerBag,
      mrpInner: mrpInner,
      onInnerBagTitle: OnInnerBagTitle,

      nomenclature: Nomenclature,
      customerRequirementDetails: customerRequirementDetails.map(
        (row, index) => ({
          id: row.id,
          parentId: row.parentId || customerRequirementDetails[0]?.parentId,
          parameter: index === 0 ? "USP" : row.parameter,
          usp: row.usp,
          uspInner: row.UspInner,
          uspInnerparameter: row.UspInnerparameter,
        })
      ),
      printLocationOuterbagDetails: printLocationOuterbagDetails.map(
        (row, index) => ({
          id: row.id,
          parentId: row.parentId || printLocationOuterbagDetails[0]?.parentId,
          printLocationOuterBag: row.printLocationOuterBag,
          printLocationInnerCarton: row.printLocationInnerCarton,
          innerCartonparameter:
            index === 0 ? "Print location - " : row.innerCartonparameter,
          printLocationOuterCarton: row.printLocationOuterCarton,
          outerBagparameter:
            index === 0 ? "Print location" : row.outerBagparameter,
          outerCartonparameter:
            index === 0 ? "Print location - " : row.outerCartonparameter,
          innerBagparameter:
            index === 0 ? "Print location - " : row.InnerBagparameter,
          printLocationInnerBag: row.printLocationInnerBag,
        })
      ),
      customerJulianCoding: customerJulianCoding,
      poNoOuterBag: poNoOuterBag,
      mfgDateOuterBag: mfgDateOuterBag,
      expiryDateOuterBag: expiryDateOuterBag,
      poNoOuterCarton: poNoOuterCarton,
      mfgDateOuterCarton: mfgDateOuterCarton,
      expiryDateOuterCarton: expiryDateOuterCarton,
      innercartonType: innerCartonType,
      innerdimensionOuterMm: innerDimensionOuterMm,
      innernumberOfPly: innerNumberOfPly,
      innerflute: innerFlute,
      innerburstingstrenght: innerBurstingStrength,
      innercottonDetails: innerCartonRows.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || innerCartonRows[0]?.parentId,
        innerboardgsm: row.innerboardgsm,
        parameter: index === 0 ? "BoardGSM" : row.parameter,
      })),
      outercartonName: outerCartonName,
      outercartontype: outerCartonType,
      outerdimensionOuterMm: outerDimensionOuterMm,
      outernumberOfPly: outerNumberOfPly,
      outerflute: outerFlute,
      outerburstingstrenght: outerBurstingStrength,
      outercottonDetails: outerCartonRows.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || outerCartonRows[0]?.parentId,
        boardgsm: row.boardgsm,
        parameter: index === 0 ? "BoardGSM" : row.parameter,
      })),
      plyColors: plycolorsRows.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || plycolorsRows[0]?.parentId,
        plycolor1: row.plycolor1,
        plycolor2: row.plycolor2,
        plycolor3: row.plycolor3,
        colorName: index === 0 ? "3 ply Colour" : row.parameter,
      })),
      innerplyColors: plycolorsInnerCartonRows.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || plycolorsInnerCartonRows[0]?.parentId,
        plycolor1: row.plycolor1 === "" ? "NA" : row.plycolor1,
        plycolor2: row.plycolor2 === "" ? "NA" : row.plycolor2,
        plycolor3: row.plycolor3 === "" ? "NA" : row.plycolor3,
        colorName: index === 0 ? "3 ply Colour" : row.parameter,
      })),
      bagseal: bagSeal,
      sealingqualityDetails: sealingQualityDetails.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || sealingQualityDetails[0]?.parentId,
        parameter: index === 0 ? "Carton Seal :" : row.parameter,
        cartonseal: row.cartonseal,
      })),
      barcodesticker: barcodeSticker,
      productDevStrikerDetails: productDevStrikerDetails.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || productDevStrikerDetails[0]?.parentId,
        parameter:
          index === 0
            ? "Product Details Sticker for Plain Box:"
            : row.parameter,
        plainboxsticker: row.plainboxsticker,
      })),
      alighmentofinnercarton: alignmentOfInnerCarton,
      orienatationofinnercarton: orientationOfInnerCarton,
      alighmentofpacks: alignmentOfPacks,
      packingMethodDetails: packingMethodDetails.map((row, index) => ({
        id: row.id,
        parentId: row.parentId || packingMethodDetails[0]?.parentId,
        parameter: index === 0 ? "Orientation of packs :" : row.parameter,
        orientationofpacks: row.orientationofpacks,
      })),
      slipsheetSpecificationsDetails: slipsheetSpecificationsDetails.map(
        (row, index) => ({
          id: row.id,
          parentId: row.parentId || slipsheetSpecificationsDetails[0]?.parentId,
          parameter: index === 0 ? "Pull Side" : row.parameter,
          pullSide: row.pullSide,
        })
      ),
      cartonsperSlipSheetDetails: cartonsperSlipSheetDetails.map(
        (row, index) => ({
          id: row.id,
          parentId: row.parentId || cartonsperSlipSheetDetails[0]?.parentId,
          parameter: index === 0 ? "Height-Wise" : row.parameter,
          heightWise: row.heightWise,
          heightWiseDimension: row.heightWiseDimension,
        })
      ),
      customerComment: customerComment,
      pdseffectiveDate: pdsEffectiveDate,
      notesofRequirment: notesOfRequirement,
      natureofchange: natureOfChange,
      length: length,
      width: width,
      thickness: thickness,
      lengthWise: lengthWise,
      widthWise: widthWise,
      lengthWiseDimension: lengthWiseDimension,
      widthWiseDimension: widthWiseDimension,
      total: total,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/ProductDevelopment/ProductDevelopment/Save`,
        payload,
        { headers }
      )
      .then((res) => {
   
        message.success("Sucessfully Saved");
        navigate("/Precot/Development/F-001/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      format: "PRODUCT DEVELOPMENT SHEET ",
      format_no: "PH-DVP01/F-001",
      revisionNo: "01",
      ref_sop_no: "PH-DVP01-D-01",
      unit: "Unit H",
      pdsNo: state.pdsNo,
      revisionNo: revisionNo || "NA",
      revisionDate: revisionDate || "NA",
      productDescription: productDescription || "NA",
      customerName: customerName || "NA",
      productCode: productCode || "NA",
      brand: brand || "NA",
      country: country || "NA",
      mixingRatio: mixingRatio || "NA",
      sampleRequisitionNo: sampleRequisitionNo || "NA",
      size: size || "NA",
      sizelimit: sizelimit || "NA",
      sizeMin: sizeMin || "NA",
      sizeMax: sizeMax || "NA",
      countPerPack: countPerPack || "NA",
      countPerPackMin: countPerPackMin || "NA",
      countPerPackMax: countPerPackMax || "NA",
      countPerPackLimit: countPerPackLimit || "NA",
      packsPerInnerCarton: packsPerInnerCarton || "NA",
      packsPerInnerCartonMin: packsPerInnerCartonMin || "NA",
      packsPerInnerCartonMax: packsPerInnerCartonMax || "NA",
      packsPerInnerCartonLimit: packsPerInnerCartonLimit || "NA",
      innerPerOuterCarton: innerPerOuterCarton || "NA",
      innerPerOuterCartonMin: innerPerOuterCartonMin || "NA",
      innerPerOuterCartonMax: innerPerOuterCartonMax || "NA",
      innerPerOuterCartonLimit: innerPerOuterCartonLimit || "NA",
      packsPerOuterCarton: packsPerOuterCarton || "NA",
      packsPerOuterCartonMin: packsPerOuterCartonMin || "NA",
      packsPerOuterCartonMax: packsPerOuterCartonMax || "NA",
      packsPerOuterCartonLimit: packsPerOuterCartonLimit || "NA",
      shapeSpecification: shapeSpecification || "NA",
      shapeTolerence: shapeTolerence || "NA",
      productSize: productSize || "NA",
      producttolerance: productTolerance || "NA",
      side1Pattern: side1Pattern || "NA",
      side2Pattern: side2Pattern || "NA",
      side1Patterntolerance: side1PatternTolerance || "NA",
      side2Patterntolerance: side2PatternTolerance || "NA",
      details: shapeRows.map((row, index) => ({
        id: row.id || shapeRows?.id || null,
        parentId: row.parentId || shapeRows?.parentId || null,
        parameter: index === 0 ? "Product size (mm)" : row.parameter || "NA",
        productsizeSpec: row.productsizeSpec || "NA",
        productsizeTolerence: row.productsizeTolerence || "NA",
      })),
      gsmDetails: detailsRows.map((row, index) => ({
        id: row.id || detailsRows[0]?.id,
        parentId: row.parentId || detailsRows[0]?.parentId,
        parameter: index === 0 ? "GSM" : row.parameter || "NA",
        gsmSpec: index === 0 ? gsm || "NA" : row.specs || "NA",
        gsmTolerenceLimit: index === 0 ? gsmLimit || "NA" : row.limit || "NA",
        gsmTolerenceMin: index === 0 ? gsmMin || "NA" : row.min || "NA",
        gsmTolerenceMax: index === 0 ? gsmMax || "NA" : row.max || "NA",
      })),
      gsmSlideDetails: rows.map((row, index) => ({
        id: row.id || rows?.id || null,
        parentId: row.parentId || rows?.parentId || null,
        parameter: index === 0 ? "Pattern" : row.parameter || "NA",
        gsmPatternSide1Specification: row.gsmPatternSide1Specification || "NA",
        gsmPatternSide1Tolerance: row.gsmPatternSide1Tolerance || "NA",
        gsmPatternSide1SlideParameter:
          index === 0 ? "Side 1" : row.gsmPatternSide1SlideParameter || "NA",
        gsmPatternSide2Specification: row.gsmPatternSide2Specification || "NA",
        gsmPatternSide2Tolerance: row.gsmPatternSide2Tolerance || "NA",
        gsmPatternSide2SlideParameter:
          index === 0 ? "Side 2" : row.gsmPatternSide2SlideParameter || "NA",
      })),
      skuDetails: skuDetailsRows.map((row, index) => ({
        id: row.id || rows?.id,
        parentId: row.parentId || rows[0]?.parentId,
        grossWtFilledOuterCarton: row.grossWtFilledOuterCarton || "NA",
        grossWtFilledOuterCartonMin: row.grossWtFilledOuterCartonMin || "NA",
        grossWtFilledOuterCartonMax: row.grossWtFilledOuterCartonMax || "NA",
        grossWtFilledOuterCartonLimit:
          index === 0 ? "±10%" : row.grossWtFilledOuterCartonLimit || "NA",
        parameter:
          index === 0
            ? "Gross Wt. of filled outer carton"
            : row.parameter || "NA",
      })),
      weightInnerEmptyBag: weightInnerEmptyBag || "NA",
      weightInnerEmptyBagMin: weightInnerEmptyBagMin || "NA",
      weightInnerEmptyBagMax: weightInnerEmptyBagMax || "NA",
      weightInnerEmptyBagLimit: "±10%",
      //  weightInnerEmptyBagLimit || "NA",
      weightOuterEmptyBag: weightOuterEmptyBag || "NA",
      weightOuterEmptyBagMin: weightOuterEmptyBagMin || "NA",
      weightOuterEmptyBagMax: weightOuterEmptyBagMax || "NA",
      weightOuterEmptyBagLimit: "±10%",
      //  weightOuterEmptyBagLimit || "NA",
      weightEmptyInnerCarton: weightEmptyInnerCarton || "NA",
      weightEmptyInnerCartonMin: weightEmptyInnerCartonMin || "NA",
      weightEmptyInnerCartonMax: weightEmptyInnerCartonMax || "NA",
      weightEmptyInnerCartonLimit: "±10%",
      // weightEmptyInnerCartonLimit || "NA",
      weightEmptyOuterCarton: weightEmptyOuterCarton || "NA",
      weightEmptyOuterCartonMin: weightEmptyOuterCartonMin || "NA",
      weightEmptyOuterCartonMax: weightEmptyOuterCartonMax || "NA",
      weightEmptyOuterCartonLimit: "±10%",
      //  weightEmptyOuterCartonLimit || "NA",
      netWtFilledPack: netWtFilledPack || "NA",
      netWtFilledPackMin: netWtFilledPackMin || "NA",
      netWtFilledPackMax: netWtFilledPackMax || "NA",
      netWtFilledPackLimit: "±10%",
      //  netWtFilledPackLimit || "NA",
      grossWtFilledPack: grossWtFilledPack || "NA",
      grossWtFilledPackMin: grossWtFilledPackMin || "NA",
      grossWtFilledPackMax: grossWtFilledPackMax || "NA",
      grossWtFilledPackLimit: "±10%",
      // grossWtFilledPackLimit || "NA",
      netWtFilledInnerCarton: netWtFilledInnerCarton || "NA",
      netWtFilledInnerCartonMin: netWtFilledInnerCartonMin || "NA",
      netWtFilledInnerCartonMax: netWtFilledInnerCartonMax || "NA",
      netWtFilledInnerCartonLimit: "±10%",
      //  netWtFilledInnerCartonLimit || "NA",
      grossWtFilledInnerCarton: grossWtFilledInnerCarton || "NA",
      grossWtFilledInnerCartonMin: grossWtFilledInnerCartonMin || "NA",
      grossWtFilledInnerCartonMax: grossWtFilledInnerCartonMax || "NA",
      grossWtFilledInnerCartonLimit: "±10%",
      //  grossWtFilledInnerCartonLimit || "NA",
      netWtFilledOuterCarton: netWtFilledOuterCarton || "NA",
      netWtFilledOuterCartonMin: netWtFilledOuterCartonMin || "NA",
      netWtFilledOuterCartonMax: netWtFilledOuterCartonMax || "NA",
      netWtFilledOuterCartonLimit: "±10%",
      //  netWtFilledOuterCartonLimit || "NA",
      primaryfilmType: primaryfilmType || "NA",
      primaryfilmThicknessMicron: primaryfilmThicknessMicron || "NA",
      primaryfilmThicknessMicronLimit: primaryfilmThicknessMicronLimit || "NA",
      primaryfilmThicknessMicronMin: primaryfilmThicknessMicronMin || "NA",
      primaryfilmThicknessMicronMax: primaryfilmThicknessMicronMax || "NA",
      primarybagType: primarybagType || "NA",
      primarybagDimension: primarybagDimension || "NA",
      secondaryPackingDetails: SecondaryPackingDetailsRows.map(
        (row, index) => ({
          id: row.id || null,
          parentId:
            row.parentId || SecondaryPackingDetailsRows[0]?.parentId || null,
          packingDetails:
            index === 0
              ? "Secondary Packaging Details: (Film & Bag)"
              : row.packingDetails || "NA",
          filmType: row.filmType || "NA",
          filmThicknessMicron: row.filmThicknessMicron || "NA",
          filmThicknessMicronLimit: row.filmThicknessMicronLimit || "NA",
          filmThicknessMicronMin: row.filmThicknessMicronMin || "NA",
          filmThicknessMicronMax: row.filmThicknessMicronMax || "NA",
          bagType: row.bagType || "NA",
          bagDimension: row.bagDimension || "NA",
        })
      ),
      innerbag: innerBag || "NA",
      outerbag: outerBag || "NA",
      innercarton: innerCarton || "NA",
      outercarton: outerCarton || "NA",
      packingDetails: packingDetails.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || packingDetails[0]?.parentId || null,
        parameter: index === 0 ? "BOPP Tape" : row.parameter || "NA",
        bopptape: row.bopptape || "NA",
      })),
      julianCodingInnerCarton: julianCodingInnerCarton || "NA",
      poNoInnerCarton: poNoInnerCarton || "NA",
      mfgDateInnerCarton: mfgDateInnerCarton || "NA",
      expiryDateInnerCarton: expiryDateInnerCarton || "NA",
      lotCode: lotCode || "NA",
      mrp: mrp || "NA",
      nomenclature: Nomenclature,
      customerRequirementDetails: customerRequirementDetails.map(
        (row, index) => ({
          id: row.id || null,
          parentId:
            row.parentId || customerRequirementDetails[0]?.parentId || null,
          parameter: index === 0 ? "USP" : row.parameter || "NA",
          usp: row.usp || "NA",
          uspInner: row.UspInner || "NA",
          uspInnerparameter:
            index === 0 ? "USP" : row.UspInnerparameter || "NA",
        })
      ),
      printLocationOuterbagDetails: printLocationOuterbagDetails.map(
        (row, index) => ({
          id: row.id || null,
          parentId:
            row.parentId || printLocationOuterbagDetails[0]?.parentId || null,
          printLocationOuterBag: row.printLocationOuterBag || "NA",
          printLocationInnerCarton: row.printLocationInnerCarton || "NA",
          innerCartonparameter:
            index === 0
              ? "Print location - "
              : row.innerCartonparameter || "NA",
          printLocationOuterCarton: row.printLocationOuterCarton || "NA",
          outerBagparameter:
            index === 0 ? "Print location" : row.outerBagparameter || "NA",
          outerCartonparameter:
            index === 0
              ? "Print location - "
              : row.outerCartonparameter || "NA",
          innerBagparameter:
            index === 0 ? "Print location - " : row.InnerBagparameter || "NA",
          printLocationInnerBag: row.printLocationInnerBag || "NA",
        })
      ),
      customerJulianCoding: customerJulianCoding || "NA",
      poNoOuterBag: poNoOuterBag || "NA",
      mfgDateOuterBag: mfgDateOuterBag || "NA",
      expiryDateOuterBag: expiryDateOuterBag || "NA",
      innerCustomerJulianCoding: innerCustomerJulianCoding || "NA",
      poNoInnerBag: poNoInnerBag || "NA",
      mfgDateInnerBag: mfgDateInnerBag || "NA",
      expiryDateInnerBag: expiryDateInnerBag || "NA",
      mrpInner: mrpInner || "NA",
      onInnerBagTitle: OnInnerBagTitle || "NA",
      poNoOuterCarton: poNoOuterCarton || "NA",
      mfgDateOuterCarton: mfgDateOuterCarton || "NA",
      expiryDateOuterCarton: expiryDateOuterCarton || "NA",
      innercartonType: innerCartonType || "NA",
      innerdimensionOuterMm: innerDimensionOuterMm || "NA",
      innernumberOfPly: innerNumberOfPly || "NA",
      innerflute: innerFlute || "NA",
      innerburstingstrenght: innerBurstingStrength || "NA",
      innercottonDetails: innerCartonRows.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || innerCartonRows[0]?.parentId || null,
        innerboardgsm: row.innerboardgsm || "NA",
        parameter: index === 0 ? "BoardGSM" : row.parameter || "NA",
      })),
      outercartonName: outerCartonName || "NA",
      outercartontype: outerCartonType || "NA",
      outerdimensionOuterMm: outerDimensionOuterMm || "NA",
      outernumberOfPly: outerNumberOfPly || "NA",
      outerflute: outerFlute || "NA",
      outerburstingstrenght: outerBurstingStrength || "NA",
      outercottonDetails: outerCartonRows.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || outerCartonRows[0]?.parentId || null,
        boardgsm: row.boardgsm || "NA",
        parameter: index === 0 ? "BoardGSM" : row.parameter || "NA",
      })),
      plyColors: plycolorsRows.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || plycolorsRows[0]?.parentId || null,
        plycolor1: row.plycolor1 || "NA",
        plycolor2: row.plycolor2 || "NA",
        plycolor3: row.plycolor3 || "NA",
        colorName: index === 0 ? "3 ply Colour" : row.parameter || "NA",
      })),
      innerplyColors: plycolorsInnerCartonRows.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || plycolorsInnerCartonRows[0]?.parentId || null,
        plycolor1: row.plycolor1 || "NA",
        plycolor2: row.plycolor2 || "NA",
        plycolor3: row.plycolor3 || "NA",
        colorName: index === 0 ? "3 ply Colour" : row.parameter || "NA",
      })),
      bagseal: bagSeal || "NA",
      sealingqualityDetails: sealingQualityDetails.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || sealingQualityDetails[0]?.parentId || null,
        parameter: index === 0 ? "Carton Seal :" : row.parameter || "NA",
        cartonseal: row.cartonseal || "NA",
      })),
      barcodesticker: barcodeSticker || "NA",
      productDevStrikerDetails: productDevStrikerDetails.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || productDevStrikerDetails[0]?.parentId || null,
        parameter:
          index === 0
            ? "Product Details Sticker for Plain Box:"
            : row.parameter || "NA",
        plainboxsticker: row.plainboxsticker || "NA",
      })),
      alighmentofinnercarton: alignmentOfInnerCarton || "NA",
      orienatationofinnercarton: orientationOfInnerCarton || "NA",
      alighmentofpacks: alignmentOfPacks || "NA",
      packingMethodDetails: packingMethodDetails.map((row, index) => ({
        id: row.id || null,
        parentId: row.parentId || packingMethodDetails[0]?.parentId || null,
        parameter:
          index === 0 ? "Orientation of packs :" : row.parameter || "NA",
        orientationofpacks: row.orientationofpacks || "NA",
      })),
      slipsheetSpecificationsDetails: slipsheetSpecificationsDetails.map(
        (row, index) => ({
          id: row.id || null,
          parentId:
            row.parentId || slipsheetSpecificationsDetails[0]?.parentId || null,
          parameter: index === 0 ? "Pull Side" : row.parameter || "NA",
          pullSide: row.pullSide || "NA",
        })
      ),
      cartonsperSlipSheetDetails: cartonsperSlipSheetDetails.map(
        (row, index) => ({
          id: row.id || null,
          parentId:
            row.parentId || cartonsperSlipSheetDetails[0]?.parentId || null,
          parameter: index === 0 ? "Height-Wise" : row.parameter || "NA",
          heightWise: row.heightWise || "NA",
          heightWiseDimension: row.heightWiseDimension || "NA",
        })
      ),
      customerComment: customerComment || "NA",
      pdseffectiveDate: pdsEffectiveDate || "NA",
      notesofRequirment: notesOfRequirement || "NA",
      natureofchange: natureOfChange || "NA",
      length: length || "NA",
      width: width || "NA",
      thickness: thickness || "NA",
      lengthWise: lengthWise || "NA",
      widthWise: widthWise || "NA",
      lengthWiseDimension: lengthWiseDimension || "NA",
      widthWiseDimension: widthWiseDimension || "NA",
      total: total || "NA",
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/ProductDevelopment/ProductDevelopment/Submit`,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        setSubmitLoading(false);
        message.success("Sucessfully Submitted");
        navigate("/Precot/Development/F-001/Summary");
      })
      .catch((err) => {
        setSubmitLoading(false);
        message.error(err.response.data.message);
      });
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/ProductDevelopment/approveReject`,
        {
          id: id,
          status: "Approve",
          remarks: "",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/Development/F-001/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/ProductDevelopment/approveReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/Development/F-001/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const canEdit = () => {
    if (roleauth === "DEVELOPMENT_MANAGER") {
      return (
        editResponse?.developmentSupervisorStatus !== "SUPERVISOR_APPROVED" ||
        editResponse?.qcStatus === "QC_REJECTED" ||
        editResponse?.qa_Status === "QA_REJECTED" ||
        editResponse?.ppc_status === "PPC_REJECTED" ||
        editResponse?.bleaching_status === "BLEACHING_REJECTED" ||
        editResponse?.spunlace_status === "SPUNLACE_REJECTED" ||
        editResponse?.pad_punching_status === "PADPUNCHING_REJECTED" ||
        editResponse?.dry_goods_status === "DRYGOODS_REJECTED"
      );
    }
    return false;
  };
  const isEditable = canEdit();

  const handleSizeValidation = (size, sizelimit) => {
    const sizeParts = size.split("*").map(Number);
    const limit = parseInt(sizelimit, 10);

    if (sizeParts.length === 2 && !isNaN(limit)) {
      const [width, height] = sizeParts;

      const minWidth = width - limit;
      const maxWidth = width + limit;
      const minHeight = height - limit;
      const maxHeight = height + limit;

      setSizeMin(`${minWidth}*${minHeight}`);
      setSizeMax(`${maxWidth}*${maxHeight}`);
      if (
        width < minWidth ||
        width > maxWidth ||
        height < minHeight ||
        height > maxHeight
      ) {
        message.error(
          `Size out of range! It should be between ${minWidth}*${minHeight} and ${maxWidth}*${maxHeight}.`
        );
      }
    } else {
      setSizeMin("");
      setSizeMax("");
    }
  };

  const handleSpecificationChange1 = (
    specValue,
    limitValue,
    setMin,
    setMax
  ) => {
    if (specValue && limitValue !== undefined && limitValue !== "") {
      const spec = parseFloat(specValue);
      const limit = parseFloat(limitValue);
      if (!isNaN(spec) && !isNaN(limit)) {
        const minValue = spec - limit < 0 ? 0 : spec - limit;
        const maxValue = spec + limit;
        setMin(minValue);
        setMax(maxValue);
      }
    } else {
      setMin("");
      setMax("");
    }
  };
  const handleSpecificationChange = (specValue, limitValue, setMin, setMax) => {
    if (specValue && limitValue !== undefined && limitValue !== "") {
      const spec = parseFloat(specValue);
      const limit = parseFloat(limitValue);
      if (!isNaN(spec) && !isNaN(limit)) {
        setMin(spec - limit);
        setMax(spec + limit);
      }
    }
    if (specValue === undefined || specValue === "") {
      setMin("");
      setMax("");
    }
    if (limitValue === undefined || limitValue === "") {
      setMin("");
      setMax("");
    }
  };

  const handleGsmChange = (gsmValue, gsmLimit, setGsmMin, setGsmMax) => {
    // Parse gsmValue and gsmLimit as numbers
    const gsm = parseFloat(gsmValue);
    const limit = parseFloat(gsmLimit);

    // Only proceed with calculation if gsm and limit are valid numbers
    if (!isNaN(gsm) && !isNaN(limit)) {
      // Calculate the minimum and maximum based on the percentage limit
      const gsmMin = gsm - gsm * (limit / 100);
      const gsmMax = gsm + gsm * (limit / 100);

      // Set the calculated min and max values
      setGsmMin(gsmMin.toFixed(2)); // Round to 2 decimal places if needed
      setGsmMax(gsmMax.toFixed(2));
    } else {
      // Clear the values if gsm or limit is invalid
      setGsmMin("");
      setGsmMax("");
    }
  };

  // Validation function to ensure value is within the min/max range
  const validateMinMax = (fieldName, value, min, max, setter) => {
    const numValue = parseFloat(value);

    if (numValue < 0) {
      numValue = 0;
      message.error(`${fieldName} cannot be negative and has been set to 0.`);
    }
    if (!isNaN(min) && !isNaN(max)) {
      if (numValue < min || numValue > max) {
        message.error(`${fieldName} must be between ${min} and ${max}`);
        setter(""); // Clear the invalid value
      }
    }
  };

  const items = [
    {
      key: "1",
      label: <p> Details </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "100%", margin: "auto", textSizeAdjust: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                PDS No. :
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={state.pdsNo}
                  onChange={(e) => setPdsNo(e.target.value)}
                  disabled
                />
              </td>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Rev. No:
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={revisionNo}
                  onChange={(e) => setRevisionNo(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Rev.Date:
              </td>
              <td colSpan={10} style={{ height: "35px" }}>
                <input
                  className="inp-new"
                  type="date"
                  value={revisionDate}
                  onChange={(e) => setRevisionDate(e.target.value)}
                  max={today}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                PDS Effective Date:
              </td>
              <td colSpan={10} style={{ height: "35px" }}>
                <input
                  className="inp-new"
                  type="date"
                  value={pdsEffectiveDate}
                  onChange={(e) => setPdsEffectiveDate(e.target.value)}
                  max={today}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan={10}
                style={{
                  textAlign: "left",
                  height: "35px",
                  paddingLeft: "5em",
                }}
              >
                Product Description :{" "}
              </td>
              <td colSpan={90}>
                <input
                  className="inp-new"
                  type="text"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  style={{ textAlign: "left", paddingLeft: "3em" }}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan={30}
                style={{
                  textAlign: "left",
                  height: "35px",
                  paddingLeft: "5em",
                }}
              >
                Customer Name:{" "}
              </td>
              <td colSpan={30}>
                <input
                  className="inp-new"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td
                colSpan={30}
                style={{
                  textAlign: "left",
                  height: "35px",
                  paddingLeft: "5em",
                }}
              >
                Product Code :{" "}
              </td>
              <td colSpan={30}>
                <input
                  className="inp-new"
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan={30}
                style={{
                  textAlign: "left",
                  height: "35px",
                  paddingLeft: "5em",
                }}
              >
                Brand :
              </td>
              <td colSpan={30}>
                <input
                  className="inp-new"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td
                colSpan={30}
                style={{
                  textAlign: "left",
                  height: "35px",
                  paddingLeft: "5em",
                }}
              >
                Country :{" "}
              </td>
              <td colSpan={30}>
                <input
                  className="inp-new"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={100} style={{ textAlign: "center", height: "35px" }}>
                {" "}
                Customer Approved Sample Details{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: "center", height: "55px" }}>
                Sample Requisition No:
              </td>
              <td colSpan={40} style={{ textAlign: "center", height: "55px" }}>
                <textarea
                  className="inp-new"
                  type="text"
                  value={sampleRequisitionNo}
                  style={{ height: "75px", width: "300px" }}
                  onChange={(e) => setSampleRequisitionNo(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20} style={{ textAlign: "center", height: "85px" }}>
                Mixing :{" "}
              </td>
              <td
                colSpan={40}
                style={{ textAlign: "center", minHeight: "350px" }}
              >
                <textarea
                  className="inp-new"
                  type="text"
                  value={mixingRatio}
                  style={{ height: "75px", width: "500px" }}
                  onChange={(e) => setMixingRatio(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "50px" }}>
                Customer comments if any:{" "}
              </td>
              <td colSpan={90}>
                <input
                  className="inp-new"
                  type="text"
                  value={customerComment}
                  onChange={(e) => setCustomerComment(e.target.value)}
                  style={{ textAlign: "left", paddingLeft: "3em" }}
                  disabled={!isEditable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: "Product Details",
      children: (
        <table align="left" style={{ width: "100%", alignItems: "left" }}>
          <tr>
            <td rowSpan={2} colSpan={20} style={{ textAlign: "center" }}>
              Parameter
            </td>
            <td rowSpan={2} colSpan={20} style={{ textAlign: "center" }}>
              Specification
            </td>
            <td colSpan={60} style={{ textAlign: "center" }}>
              Tolerance
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center" }}>
              Limit
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              Min.
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              Max.
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Shape
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={shapeSpecification}
                onChange={(e) => setShapeSpecification(e.target.value)}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={60}>
              <input
                className="inp-new"
                type="text"
                value={shapeTolerence}
                onChange={(e) => setShapeTolerence(e.target.value)}
                disabled={!isEditable}
              />
            </td>
          </tr>
          {shapeRows.map((row, index) => (
            <tr key={index}>
              <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
                {index === 0 ? (
                  <span>Product size (mm)</span>
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.parameter}
                    onChange={(e) =>
                      updateShapeRow(index, "parameter", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20} style={{ textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={row.productsizeSpec}
                  onChange={(e) =>
                    updateShapeRow(index, "productsizeSpec", e.target.value)
                  }
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={60}>
                <input
                  className="inp-new"
                  type="text"
                  value={row.productsizeTolerence}
                  onChange={(e) =>
                    updateShapeRow(
                      index,
                      "productsizeTolerence",
                      e.target.value
                    )
                  }
                  disabled={!isEditable}
                />
              </td>
              {index !== 0 &&
                developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                  <button
                    onClick={() => removeShapeRow(index)}
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
                    <DeleteTwoTone style={{ fontSize: "20px", color: "red" }} />
                  </button>
                )}
            </tr>
          ))}
          {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
            <button
              onClick={addShapeRow}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          )}
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Size (mm)
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                // onBlur={(e) => handleSizeValidation(e.target.value, sizelimit)}
                placeholder="eg: 100*100"
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={sizelimit}
                onChange={(e) => {
                  const value = e.target.value; // Remove ± and spaces before setting value
                  setSizeLimit(value);
                  handleSizeValidation(size, value); // Validate the size with the new value
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={sizeMin}
                onChange={(e) => {
                  const value = e.target.value;
                  setSizeMin(value);
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={sizeMax}
                onChange={(e) => {
                  const value = e.target.value;
                  setSizeMax(value);
                }}
                disabled={!isEditable}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Count per pack (Nos.)
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={countPerPack}
 
                onChange={(e) => {
                  setCountPerPack(e.target.value);
                  handleSpecificationChange1(
                    e.target.value,
                    countPerPackLimit,
                    setCountPerPackMin,
                    setCountPerPackMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={countPerPackLimit ? `± ${countPerPackLimit}` : "±"} // Display the symbol even for new entries
                onChange={(e) => {
                  // Remove the ± symbol and spaces before storing the value
                  const limitValue = e.target.value.replace(/[±\s]/g, "");
                  setCountPerPackLimit(limitValue);
                  handleSpecificationChange1(
                    countPerPack,
                    limitValue,
                    setCountPerPackMin,
                    setCountPerPackMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={countPerPackMin}
                onChange={(e) => setCountPerPackMin(e.target.value)}
 
                readOnly
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={countPerPackMax}
                onChange={(e) => setCountPerPackMax(e.target.value)}
                 
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              No. of Packs per Inner Carton (Nos)
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={packsPerInnerCarton}
                onChange={(e) => {
                  setPacksPerInnerCarton(e.target.value);
                  handleSpecificationChange(
                    e.target.value,
                    packsPerInnerCartonLimit,
                    setPacksPerInnerCartonMin,
                    setPacksPerInnerCartonMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={
                  packsPerInnerCartonLimit
                    ? `± ${packsPerInnerCartonLimit}`
                    : "±"
                } // Display the symbol even for new entries
                onChange={(e) => {
                  // Remove the ± symbol and spaces before storing the value
                  const limitValue = e.target.value.replace(/[±\s]/g, "");
                  setPacksPerInnerCartonLimit(limitValue);
                  handleSpecificationChange(
                    packsPerInnerCarton,
                    limitValue,
                    setPacksPerInnerCartonMin,
                    setPacksPerInnerCartonMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={packsPerInnerCartonMin}
                onChange={(e) => setPacksPerInnerCartonMin(e.target.value)}
                //    onBlur={(e) => validateMinMax('Packs per Inner Carton Min', e.target.value, packsPerInnerCartonMin, packsPerInnerCartonMax, setPacksPerInnerCartonMin)}
                readOnly
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={packsPerInnerCartonMax}
                onChange={(e) => setPacksPerInnerCartonMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              No. of Inner per Outer Carton (Nos)
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={innerPerOuterCarton}
                onChange={(e) => {
                  setInnerPerOuterCarton(e.target.value);
                  handleSpecificationChange(
                    e.target.value,
                    innerPerOuterCartonLimit,
                    setInnerPerOuterCartonMin,
                    setInnerPerOuterCartonMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={
                  innerPerOuterCartonLimit
                    ? `± ${innerPerOuterCartonLimit}`
                    : "±"
                }
                onChange={(e) => {
                  const limitValue = e.target.value.replace(/[±\s]/g, ""); // Remove ± and spaces
                  setInnerPerOuterCartonLimit(limitValue);
                  handleSpecificationChange(
                    innerPerOuterCarton,
                    limitValue,
                    setInnerPerOuterCartonMin,
                    setInnerPerOuterCartonMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={innerPerOuterCartonMin}
                onChange={(e) => setInnerPerOuterCartonMin(e.target.value)}
                 readOnly
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={innerPerOuterCartonMax}
                onChange={(e) => setInnerPerOuterCartonMax(e.target.value)}
                //    onBlur={(e) => validateMinMax('Inner per Outer Carton Max', e.target.value, innerPerOuterCartonMin, innerPerOuterCartonMax, setInnerPerOuterCartonMax)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              No Packs per Outer Carton (Nos)
            </td>

            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={packsPerOuterCarton}
                // onChange={(e) => setPacksPerOuterCarton(e.target.value)}
                onChange={(e) => {
                  setPacksPerOuterCarton(e.target.value);
                  handleSpecificationChange(
                    e.target.value,
                    packsPerOuterCarton,
                    setPacksPerOuterCartonMin,
                    setPacksPerOuterCartonMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={
                  packsPerOuterCartonLimit
                    ? `± ${packsPerOuterCartonLimit}`
                    : "±"
                }
                onChange={(e) => {
                  const limitValue = e.target.value.replace(/[±\s]/g, "");
                  setPacksPerOuterCartonLimit(limitValue);
                  handleSpecificationChange(
                    packsPerOuterCarton,
                    limitValue,
                    setPacksPerOuterCartonMin,
                    setPacksPerOuterCartonMax
                  );
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={packsPerOuterCartonMin}
                onChange={(e) => setPacksPerOuterCartonMin(e.target.value)}
                readOnly
              />
            </td>
            <td colSpan={20}>
              <input
                className="inp-new"
                type="text"
                value={packsPerOuterCartonMax}
                onChange={(e) => setPacksPerOuterCartonMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          {detailsRows.map((row, index) => (
            <tr>
              <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
                {index === 0 ? (
                  <span>GSM</span>
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.parameter}
                    onChange={(e) =>
                      updateDetailsRow(index, "parameter", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20} style={{ textAlign: "center" }}>
                {index === 0 ? (
                  <input
                    className="inp-new"
                    type="text"
                    value={gsm}
                    onChange={(e) => {
                      setGsm(e.target.value);
                      handleGsmChange(
                        e.target.value,
                        gsmLimit,
                        setGsmMin,
                        setGsmMax
                      );
                    }}
                    disabled={!isEditable}
                  />
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.specs}
                    onChange={(e) =>
                      updateDetailsRow(index, "specs", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20} style={{ textAlign: "center" }}>
                {index === 0 ? (
                  <input
                    className="inp-new"
                    type="text"
                    value={gsmLimit ? `± ${gsmLimit}` : "±"}
                    onChange={(e) => {
                      const limitValue = e.target.value.replace(/[±\s]/g, "");
                      setGsmLimit(limitValue);
                      handleGsmChange(gsm, limitValue, setGsmMin, setGsmMax);
                    }}
                    disabled={!isEditable}
                  />
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.limit}
                    onChange={(e) =>
                      updateDetailsRow(index, "limit", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20}>
                {index === 0 ? (
                  <input
                    className="inp-new"
                    type="text"
                    value={gsmMin}
                    onChange={(e) => setGsmMin(e.target.value)}
                    readOnly
                  />
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.min}
                    onChange={(e) =>
                      updateDetailsRow(index, "min", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20}>
                {index === 0 ? (
                  <input
                    className="inp-new"
                    type="text"
                    value={gsmMax}
                    onChange={(e) => setGsmMax(e.target.value)}
                    readOnly
                  />
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.max}
                    onChange={(e) =>
                      updateDetailsRow(index, "max", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              {index !== 0 &&
                developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                  <button
                    onClick={() => removeDetailsRow(index)}
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
                    <DeleteTwoTone style={{ fontSize: "20px", color: "red" }} />
                  </button>
                )}
            </tr>
          ))}
          {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
            <button
              onClick={addDetailsRow}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          )}
          {rows.map((row, index) => (
            <React.Fragment key={index + 1}>
              <tr>
                <td colSpan={10} rowSpan={2} style={{ textAlign: "center" }}>
                  {index === 0 ? (
                    <span>Pattern</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updatePatternRow(index, "parameter", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  {index === 0 ? (
                    <span>Side 1</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.gsmPatternSide1SlideParameter}
                      onChange={(e) =>
                        updatePatternRow(
                          index,
                          "gsmPatternSide1SlideParameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={20}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.gsmPatternSide1Specification}
                    onChange={(e) =>
                      updatePatternRow(
                        index,
                        "gsmPatternSide1Specification",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={60}>
                  <input
                    className="inp-new"
                    type="text"
                    value={row.gsmPatternSide1Tolerance}
                    onChange={(e) =>
                      updatePatternRow(
                        index,
                        "gsmPatternSide1Tolerance",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  {index === 0 ? (
                    <span>Side 2</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.gsmPatternSide2SlideParameter}
                      onChange={(e) =>
                        updatePatternRow(
                          index,
                          "gsmPatternSide2SlideParameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={20}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.gsmPatternSide2Specification}
                    onChange={(e) =>
                      updatePatternRow(
                        index,
                        "gsmPatternSide2Specification",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={60}>
                  <input
                    className="inp-new"
                    type="text"
                    value={row.gsmPatternSide2Tolerance}
                    onChange={(e) =>
                      updatePatternRow(
                        index,
                        "gsmPatternSide2Tolerance",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() => removePatternRow(index)}
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
            </React.Fragment>
          ))}
          {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
            <button
              onClick={addPatternRow}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          )}
        </table>
      ),
    },
    {
      key: "3",
      label: "SKU Details : (Weight in grams)",
      children: (
        <table align="left" style={{ width: "100%", alignItems: "left" }}>
          <tr>
            <td rowSpan={2} colSpan={20} style={{ textAlign: "center" }}>
              Parameter
            </td>
            <td rowSpan={2} colSpan={20} style={{ textAlign: "center" }}>
              {" "}
              Standard in gms
            </td>
            <td colSpan={60} style={{ textAlign: "center" }}>
              Tolerance
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center" }}>
              Limit
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              Min.
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              Max.
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Weight of inner Empty Bag
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightInnerEmptyBag}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setWeightInnerEmptyBag(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setWeightInnerEmptyBagMin(minValue);
                  setWeightInnerEmptyBagMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>

            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>

            <td colSpan={20}>
              {" "}
              <input
                className="inp-new"
                type="text"
                value={weightInnerEmptyBagMin}
                readOnly
                onChange={(e) => setWeightInnerEmptyBagMin(e.target.value)}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20}>
              {" "}
              <input
                className="inp-new"
                type="text"
                value={weightInnerEmptyBagMax}
                readOnly
                onChange={(e) => setWeightInnerEmptyBagMax(e.target.value)}
                disabled={!isEditable}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Weight of outer Empty Bag
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightOuterEmptyBag}
                // onChange={(e) => setWeightOuterEmptyBag(e.target.value)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setWeightOuterEmptyBag(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setWeightOuterEmptyBagMin(minValue);
                  setWeightOuterEmptyBagMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightOuterEmptyBagMin}
                onChange={(e) => setWeightOuterEmptyBagMin(e.target.value)}
                disabled={!isEditable}
                readOnly
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightOuterEmptyBagMax}
                onChange={(e) => setWeightOuterEmptyBagMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Weight of empty inner carton
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightEmptyInnerCarton}
                // onChange={(e) => setWeightEmptyInnerCarton(e.target.value)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setWeightEmptyInnerCarton(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setWeightEmptyInnerCartonMin(minValue);
                  setWeightEmptyInnerCartonMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightEmptyInnerCartonMin}
                readOnly
                onChange={(e) => setWeightEmptyInnerCartonMin(e.target.value)}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightEmptyInnerCartonMax}
                readOnly
                onChange={(e) => setWeightEmptyInnerCartonMax(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Weight of empty outer carton
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              {" "}
              <input
                className="inp-new"
                type="text"
                value={weightEmptyOuterCarton}
                // onChange={(e) => setWeightEmptyOuterCarton(e.target.value)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setWeightEmptyOuterCarton(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setWeightEmptyOuterCartonMin(minValue);
                  setWeightEmptyOuterCartonMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightEmptyOuterCartonMin}
                onChange={(e) => setWeightEmptyOuterCartonMin(e.target.value)}
                readOnly
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={weightEmptyOuterCartonMax}
                onChange={(e) => setWeightEmptyOuterCartonMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Net Wt. of filled pack
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              {" "}
              <input
                className="inp-new"
                type="text"
                value={netWtFilledPack}
                // onChange={(e) => setNetWtFilledPack(e.target.value)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setNetWtFilledPack(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setNetWtFilledPackMin(minValue);
                  setNetWtFilledPackMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={netWtFilledPackMin}
                onChange={(e) => setNetWtFilledPackMin(e.target.value)}
                readOnly
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={netWtFilledPackMax}
                onChange={(e) => setNetWtFilledPackMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Gross Wt. of filled pack
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              {" "}
              <input
                className="inp-new"
                type="text"
                value={grossWtFilledPack}
               
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setGrossWtFilledPack(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setGrossWtFilledPackMin(minValue);
                  setGrossWtFilledPackMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={grossWtFilledPackMin}
                onChange={(e) => setGrossWtFilledPackMin(e.target.value)}
                readOnly
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={grossWtFilledPackMax}
                onChange={(e) => setGrossWtFilledPackMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Net Wt. of filled Inner Carton
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              {" "}
              <input
                className="inp-new"
                type="text"
                value={netWtFilledInnerCarton}
                // onChange={(e) => setNetWtFilledInnerCarton(e.target.value)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setNetWtFilledInnerCarton(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setNetWtFilledInnerCartonMin(minValue);
                  setNetWtFilledInnerCartonMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={netWtFilledInnerCartonMin}
                onChange={(e) => setNetWtFilledInnerCartonMin(e.target.value)}
                readOnly
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={netWtFilledInnerCartonMax}
                onChange={(e) => setNetWtFilledInnerCartonMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Gross Wt. of filled Inner Carton{" "}
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              {" "}
              <input
                className="inp-new"
                type="text"
                value={grossWtFilledInnerCarton}
                // onChange={(e) => setGrossWtFilledInnerCarton(e.target.value)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setGrossWtFilledInnerCarton(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setGrossWtFilledInnerCartonMin(minValue);
                  setGrossWtFilledInnerCartonMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={grossWtFilledInnerCartonMin}
                onChange={(e) => setGrossWtFilledInnerCartonMin(e.target.value)}
                readOnly
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={grossWtFilledInnerCartonMax}
                onChange={(e) => setGrossWtFilledInnerCartonMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
              Net Wt. of filled outer carton
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={netWtFilledOuterCarton}
                // onChange={(e) => setNetWtFilledOuterCarton(e.target.value)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setNetWtFilledOuterCarton(e.target.value);
                  const limit = 0.1;
                  const minValue = (value * (1 - limit)).toFixed(2);
                  const maxValue = (value * (1 + limit)).toFixed(2);

                  setNetWtFilledOuterCartonMin(minValue);
                  setNetWtFilledOuterCartonMax(maxValue);
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9.]*$/.test(value)) {
                    e.target.value = value.slice(0, -1);
                  }
                }}
                disabled={!isEditable}
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center", width: "20%" }}>
              ±10%
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={netWtFilledOuterCartonMin}
                onChange={(e) => setNetWtFilledOuterCartonMin(e.target.value)}
                readOnly
              />
            </td>
            <td colSpan={20} style={{ textAlign: "center" }}>
              <input
                className="inp-new"
                type="text"
                value={netWtFilledOuterCartonMax}
                onChange={(e) => setNetWtFilledOuterCartonMax(e.target.value)}
                readOnly
              />
            </td>
          </tr>
          {skuDetailsRows.map((row, index) => (
            <tr key={index}>
              <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
                {index === 0 ? (
                  <span>Gross Wt. of filled outer carton</span>
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.parameter}
                    onChange={(e) =>
                      updateSkuDetailsRow(index, "parameter", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20}>
                {index === 0 ? (
                  <input
                    className="inp-new"
                    type="text"
                    value={
                      row.grossWtFilledOuterCarton !== undefined &&
                      row.grossWtFilledOuterCarton !== null
                        ? row.grossWtFilledOuterCarton
                        : grossWtFilledOuterCarton
                    }
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      if (inputValue === "") {
                        // Clear values
                        setGrossWtFilledOuterCarton("");
                        setGrossWtFilledOuterCartonMin("");
                        setGrossWtFilledOuterCartonMax("");

                        // Update row object
                        const updatedRows = [...skuDetailsRows];
                        updatedRows[index].grossWtFilledOuterCarton = "";
                        updatedRows[index].grossWtFilledOuterCartonMin = "";
                        updatedRows[index].grossWtFilledOuterCartonMax = "";
                        setSkuDetailsRows(updatedRows);

                        return;
                      }

                      const value = parseFloat(inputValue) || 0;
                      const limit = 0.1;
                      const minValue = (value * (1 - limit)).toFixed(2);
                      const maxValue = (value * (1 + limit)).toFixed(2);

                      // Update individual state and row object
                      setGrossWtFilledOuterCarton(inputValue);
                      setGrossWtFilledOuterCartonMin(
                        minValue === "0.00" ? "0" : minValue
                      );
                      setGrossWtFilledOuterCartonMax(maxValue);

                      const updatedRows = [...skuDetailsRows];
                      updatedRows[index].grossWtFilledOuterCarton = inputValue;
                      updatedRows[index].grossWtFilledOuterCartonMin =
                        minValue === "0.00" ? "0" : minValue;
                      updatedRows[index].grossWtFilledOuterCartonMax = maxValue;
                      setSkuDetailsRows(updatedRows);
                    }}
                    onInput={(e) => {
                      const value = e.target.value;

                      // Prevent non-numeric input
                      if (!/^[0-9.]*$/.test(value)) {
                        e.target.value = value.slice(0, -1);
                      }
                    }}
                    disabled={!isEditable}
                  />
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.grossWtFilledOuterCarton}
                    onChange={(e) =>
                      updateSkuDetailsRow(
                        index,
                        "grossWtFilledOuterCarton",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>

              <td colSpan={20}>
                {index === 0 ? (
                  <div style={{ textAlign: "center" }}>±10%</div>
                ) : (
                  // <span style={{textAlign:'center'}} >±10%</span>
                  <input
                    className="inp-new"
                    type="text"
                    value={row.grossWtFilledOuterCartonLimit}
                    onChange={(e) =>
                      updateSkuDetailsRow(
                        index,
                        "grossWtFilledOuterCartonLimit",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20}>
                {index === 0 ? (
                  <input
                    className="inp-new"
                    type="text"
                    value={
                      grossWtFilledOuterCartonMin ||
                      row.grossWtFilledOuterCartonMin
                    }
                    onChange={(e) =>
                      setGrossWtFilledOuterCartonMin(e.target.value)
                    }
                    readOnly
                  />
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.grossWtFilledOuterCartonMin}
                    onChange={(e) =>
                      updateSkuDetailsRow(
                        index,
                        "grossWtFilledOuterCartonMin",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              <td colSpan={20}>
                {index === 0 ? (
                  <input
                    className="inp-new"
                    type="text"
                    value={
                      grossWtFilledOuterCartonMax ||
                      row.grossWtFilledOuterCartonMax
                    }
                    onChange={(e) =>
                      setGrossWtFilledOuterCartonMax(e.target.value)
                    }
                    readOnly
                  />
                ) : (
                  <input
                    className="inp-new"
                    type="text"
                    value={row.grossWtFilledOuterCartonMax}
                    onChange={(e) =>
                      updateSkuDetailsRow(
                        index,
                        "grossWtFilledOuterCartonMax",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                )}
              </td>
              {index !== 0 &&
                developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                  <button
                    onClick={() => removeSkuDetailsRow(index)}
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
                    <DeleteTwoTone style={{ fontSize: "20px", color: "red" }} />
                  </button>
                )}
            </tr>
          ))}

          {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
            <button
              onClick={addSkuDetailsRow}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          )}
        </table>
      ),
    },
    {
      key: "4",
      label: "Primary & Secondary Packaging Details(Film & Bag)",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr>
              <th colSpan={100} style={{ height: "35px" }}>
                Primary Packaging Details : (Film & Bag)
              </th>
            </tr>
            <tr>
              <td
                rowSpan={2}
                colSpan={20}
                style={{ textAlign: "center", height: "35px" }}
              >
                Parameter
              </td>
              <td rowSpan={2} colSpan={20} style={{ textAlign: "center" }}>
                {" "}
                Standard in gms
              </td>
              <td colSpan={60} style={{ textAlign: "center" }}>
                Tolerance
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ textAlign: "center" }}>
                Limit
              </td>
              <td colSpan={20} style={{ textAlign: "center" }}>
                Min.
              </td>
              <td colSpan={20} style={{ textAlign: "center" }}>
                Max.
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ height: "35px" }}>
                Film Type
              </td>
              <td colSpan={80} style={{ height: "35px" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={
                    primaryfilmType
                      ? primaryfilmType
                      : "3 layer LDPE Natural printed film"
                  }
                  onChange={(e) => setPrimaryFilmType(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ height: "35px" }}>
                Film Thickness in Micron
              </td>
              <td colSpan={20}>
                <input
                  className="inp-new"
                  type="text"
                  value={primaryfilmThicknessMicron}
                  onChange={(e) => {
                    setPrimaryFilmThicknessMicron(e.target.value);
                  }}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20}>
                <input
                  className="inp-new"
                  type="text"
                  value={primaryfilmThicknessMicronLimit}
                  onChange={(e) => {
                    const limitValue = e.target.value;
                    setPrimaryFilmThicknessMicronLimit(limitValue);
                  }}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20}>
                <input
                  className="inp-new"
                  type="text"
                  value={primaryfilmThicknessMicronMin}
                  onChange={(e) =>
                    setPrimaryFilmThicknessMicronMin(e.target.value)
                  }
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20}>
                <input
                  className="inp-new"
                  type="text"
                  value={primaryfilmThicknessMicronMax}
                  onChange={(e) =>
                    setPrimaryFilmThicknessMicronMax(e.target.value)
                  }
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ height: "35px" }}>
                Bag Type
              </td>
              <td colSpan={80}>
                <input
                  className="inp-new"
                  type="text"
                  value={primarybagType}
                  onChange={(e) => setPrimaryBagType(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ height: "35px" }}>
                Bag Dimension
              </td>
              <td colSpan={80} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={primarybagDimension}
                  onChange={(e) => setPrimaryBagDimension(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {SecondaryPackingDetailsRows.map((row, index) => (
              <React.Fragment key={`row-${index}`}>
                <tr>
                  <th colSpan={100} style={{ height: "35px" }}>
                    {index === 0 ? (
                      <span>Secondary Packaging Details: (Film & Bag)</span>
                    ) : (
                      <input
                        className="inp-new"
                        type="text"
                        value={row.packingDetails}
                        onChange={(e) =>
                          updateSecondaryPackingDetails(
                            index,
                            "packingDetails",
                            e.target.value
                          )
                        }
                        disabled={!isEditable}
                      />
                    )}
                  </th>
                </tr>
                <tr>
                  <td
                    rowSpan={2}
                    colSpan={20}
                    style={{ textAlign: "center", height: "35px" }}
                  >
                    Parameter
                  </td>
                  <td rowSpan={2} colSpan={20} style={{ textAlign: "center" }}>
                    Standard in gms
                  </td>
                  <td colSpan={60} style={{ textAlign: "center" }}>
                    Tolerance
                  </td>
                </tr>
                <tr>
                  <td colSpan={20} style={{ textAlign: "center" }}>
                    Limit
                  </td>
                  <td colSpan={20} style={{ textAlign: "center" }}>
                    Min.
                  </td>
                  <td colSpan={20} style={{ textAlign: "center" }}>
                    Max.
                  </td>
                </tr>
                <tr>
                  <td colSpan={20} style={{ height: "35px" }}>
                    Film Type
                  </td>
                  <td colSpan={80} style={{ height: "35px" }}>
                    <input
                      className="inp-new"
                      type="text"
                      value={row.filmType}
                      onChange={(e) =>
                        updateSecondaryPackingDetails(
                          index,
                          "filmType",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={20} style={{ height: "35px" }}>
                    Film Thickness in Micron
                  </td>
                  <td colSpan={20}>
                    <input
                      className="inp-new"
                      type="text"
                      value={row.filmThicknessMicron}
                      onChange={(e) =>
                        updateSecondaryPackingDetails(
                          index,
                          "filmThicknessMicron",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td colSpan={20}>
                    <input
                      className="inp-new"
                      type="text"
                      value={row.filmThicknessMicronLimit}
                      onChange={(e) =>
                        updateSecondaryPackingDetails(
                          index,
                          "filmThicknessMicronLimit",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td colSpan={20}>
                    <input
                      className="inp-new"
                      type="text"
                      value={row.filmThicknessMicronMin}
                      onChange={(e) =>
                        updateSecondaryPackingDetails(
                          index,
                          "filmThicknessMicronMin",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                  <td colSpan={20}>
                    <input
                      className="inp-new"
                      type="text"
                      value={row.filmThicknessMicronMax}
                      onChange={(e) =>
                        updateSecondaryPackingDetails(
                          index,
                          "filmThicknessMicronMax",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={20} style={{ height: "35px" }}>
                    Bag Type
                  </td>
                  <td colSpan={80}>
                    <input
                      className="inp-new"
                      type="text"
                      value={row.bagType}
                      onChange={(e) =>
                        updateSecondaryPackingDetails(
                          index,
                          "bagType",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={20} style={{ height: "35px" }}>
                    Bag Dimension
                  </td>
                  <td
                    colSpan={80}
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.bagDimension}
                      onChange={(e) =>
                        updateSecondaryPackingDetails(
                          index,
                          "bagDimension",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>

                  {index !== 0 &&
                    developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                    developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                      <button
                        onClick={() => removeSecondaryPackingDetails(index)}
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
              </React.Fragment>
            ))}
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addSecondaryPackingDetails}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
          </table>
        </>
      ),
    },
    {
      key: "5",
      label: "Inner Carton",
      children: (
        <>
          <table
            align="left"
            style={{ width: "80%", borderCollapse: "collapse" }}
          >
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Parameter
              </td>
              <td colSpan={80} style={{ height: "35px", textAlign: "center" }}>
                Specification
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Carton Type
              </td>
              <td colSpan={80}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerCartonType}
                  onChange={(e) => setInnerCartonType(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Dimension (Outer) in mm
              </td>
              <td colSpan={80}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerDimensionOuterMm}
                  onChange={(e) => setInnerDimensionOuterMm(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                No. of Ply
              </td>
              <td colSpan={80}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerNumberOfPly}
                  onChange={(e) => setInnerNumberOfPly(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Flute
              </td>
              <td colSpan={80}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerFlute}
                  onChange={(e) => setInnerFlute(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Bursting Strength
              </td>
              <td colSpan={80}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerBurstingStrength}
                  onChange={(e) => setInnerBurstingStrength(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {innerCartonRows.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan={10}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.isFixed ? (
                    <span>{row.parameter}</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updateInnerCarton(index, "parameter", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td colSpan={80}>
                  <input
                    className="inp-new"
                    type="text"
                    value={row.innerboardgsm}
                    onChange={(e) =>
                      updateInnerCarton(index, "innerboardgsm", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                {!row.isFixed &&
                  index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() => handleRemoveRow(setInnerCartonRows, index)}
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addInnercartonRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
            {plycolorsInnerCartonRows.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan={10}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>3 ply Colour</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updatePlycolorInnerCarton(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.plycolor1}
                    onChange={(e) =>
                      updatePlycolorInnerCarton(
                        index,
                        "plycolor1",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.plycolor2}
                    onChange={(e) =>
                      updatePlycolorInnerCarton(
                        index,
                        "plycolor2",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.plycolor3}
                    onChange={(e) =>
                      updatePlycolorInnerCarton(
                        index,
                        "plycolor3",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() =>
                        handleRemoveRow(setPlycolorsInnerCartonRows, index)
                      }
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addPlyColorInnerCartonRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
          </table>
        </>
      ),
    },
    {
      key: "6",
      label: "Outer Carton",
      children: (
        <>
          <table
            align="left"
            style={{ width: "80%", borderCollapse: "collapse" }}
          >
            <tr>
              <td colSpan={100} style={{ height: "35px", textAlign: "left" }}>
                Outer Carton :
                <input
                  className="inp-new"
                  type="text"
                  value={outerCartonName}
                  onChange={(e) => setOuterCartonName(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Parameter
              </th>
              <th colSpan={90} style={{ height: "35px", textAlign: "center" }}>
                Specification
              </th>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Carton Type
              </td>
              <td colSpan={90} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={outerCartonType}
                  onChange={(e) => setOuterCartonType(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Dimension (Outer) in mm
              </td>
              <td colSpan={90}>
                <input
                  className="inp-new"
                  type="text"
                  value={outerDimensionOuterMm}
                  onChange={(e) => setOuterDimensionOuterMm(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                No. of Ply
              </td>
              <td colSpan={90}>
                <input
                  className="inp-new"
                  type="text"
                  value={outerNumberOfPly}
                  onChange={(e) => setOuterNumberOfPly(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Flute
              </td>
              <td colSpan={90}>
                <input
                  className="inp-new"
                  type="text"
                  value={outerFlute}
                  onChange={(e) => setOuterFlute(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Bursting Strength
              </td>
              <td colSpan={90}>
                <input
                  className="inp-new"
                  type="text"
                  value={outerBurstingStrength}
                  onChange={(e) => setOuterBurstingStrength(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {outerCartonRows.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan={10}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>BoardGSM</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updateOuterCarton(index, "parameter", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td colSpan={90}>
                  <input
                    className="inp-new"
                    type="text"
                    value={row.boardgsm}
                    onChange={(e) =>
                      updateOuterCarton(index, "boardgsm", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() => handleRemoveRow(setOuterCartonRows, index)}
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addOutercartonRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
            {plycolorsRows.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan={10}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>3 ply Colour</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updatePlycolor(index, "parameter", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.plycolor1}
                    onChange={(e) =>
                      updatePlycolor(index, "plycolor1", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.plycolor2}
                    onChange={(e) =>
                      updatePlycolor(index, "plycolor2", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.plycolor3}
                    onChange={(e) =>
                      updatePlycolor(index, "plycolor3", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() => handleRemoveRow(setPlycolorsRows, index)}
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addPlyColorRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
          </table>
        </>
      ),
    },
    {
      key: "7",
      label: "Sealing Quality & Packaging Requirements",
      children: (
        <>
          <table
            align="left"
            style={{ width: "80%", borderCollapse: "collapse" }}
          >
            <tr>
              <th colSpan={100} style={{ height: "35px", textAlign: "center" }}>
                Sealing Quality
              </th>
            </tr>
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Bag Seal :
              </td>
              <td colSpan={90} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={bagSeal}
                  onChange={(e) => setBagSeal(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>

            {sealingQualityDetails.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan={10}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>Carton Seal :</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updateSealingQualityRow(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>

                <td
                  colSpan={90}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.cartonseal}
                    onChange={(e) =>
                      updateSealingQualityRow(
                        index,
                        "cartonseal",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() =>
                        handleRemoveRow(setSealingQualityDetails, index)
                      }
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addSealingQualityRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
            <tr>
              <th colSpan={100} style={{ height: "35px", textAlign: "center" }}>
                Packaging Requirements{" "}
              </th>
            </tr>
            <tr>
              <td colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Packaging Type
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                Section No.
              </td>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                1
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Inner Bag
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerBag}
                  onChange={(e) => setInnerBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                2
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Outer Bag
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={outerBag}
                  onChange={(e) => setOuterBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                3
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Inner Carton
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerCarton}
                  onChange={(e) => setInnerCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                4
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Outer Carton
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={outerCarton}
                  onChange={(e) => setOuterCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {packingDetails.map((row, index) => (
              <tr>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index + 5}
                </td>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>BOPP Tape</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updatePackingDetailsRow(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={40}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.bopptape}
                    onChange={(e) =>
                      updatePackingDetailsRow(index, "bopptape", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() => handleRemoveRow(setPackingDetails, index)}
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addPackingDetailsRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
          </table>
        </>
      ),
    },
    {
      key: "8",
      label: "Lot Coding System & Customer requirements",
      children: (
        <>
          <table
            align="left"
            style={{
              width: "100%",
              height: "250%",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <th colSpan={30}>On Outer bag:(online printing)</th>
              <th colSpan={30}>
                <input
                  className="inp-new"
                  type="text"
                  value={OnInnerBagTitle}
                  onChange={(e) => setOnInnerBagTitle(e.target.value)}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan={30}>On Inner Carton:(To be stamped)</th>
              <th colSpan={40}>On Outer Carton:(To be stamped)</th>
            </tr>
            <tr>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Customer/Julian coding
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={customerJulianCoding}
                  onChange={(e) => setCustomerJulianCoding(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Customer/Julian coding
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={innerCustomerJulianCoding}
                  onChange={(e) => setInnerCustomerJulianCoding(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Julian coding -
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={julianCodingInnerCarton}
                  onChange={(e) => setJulianCodingInnerCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Lot Code
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={lotCode}
                  onChange={(e) => setLotCode(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                PO No.
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={poNoOuterBag}
                  onChange={(e) => setPoNoOuterBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                PO No.
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={poNoInnerBag}
                  onChange={(e) => setPoNoInnerBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                PO No.
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={poNoInnerCarton}
                  onChange={(e) => setPoNoInnerCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                PO No.
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={poNoOuterCarton}
                  onChange={(e) => setPoNoOuterCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Mfg. Date
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={mfgDateOuterBag}
                  onChange={(e) => setMfgDateOuterBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Mfg. Date
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={mfgDateInnerBag}
                  onChange={(e) => setMfgDateInnerBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Mfg. Date-
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={mfgDateInnerCarton}
                  onChange={(e) => setMfgDateInnerCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Mfg. Date-
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={mfgDateOuterCarton}
                  onChange={(e) => setMfgDateOuterCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Expiry Date
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={expiryDateOuterBag}
                  onChange={(e) => setExpiryDateOuterBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Expiry Date
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={expiryDateInnerBag}
                  onChange={(e) => setExpiryDateInnerBag(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                Expiry Date-
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={expiryDateInnerCarton}
                  onChange={(e) => setExpiryDateInnerCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Expiry Date-
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={expiryDateOuterCarton}
                  onChange={(e) => setExpiryDateOuterCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {printLocationOuterbagDetails.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>Print location</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.outerBagparameter}
                      onChange={(e) =>
                        updatePrintLocationOuterBagRow(
                          index,
                          "outerBagparameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.printLocationOuterBag}
                    onChange={(e) =>
                      updatePrintLocationOuterBagRow(
                        index,
                        "printLocationOuterBag",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>Print location</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.InnerBagparameter}
                      onChange={(e) =>
                        updatePrintLocationOuterBagRow(
                          index,
                          "InnerBagparameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.printLocationInnerBag}
                    onChange={(e) =>
                      updatePrintLocationOuterBagRow(
                        index,
                        "printLocationInnerBag",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>Print location-</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.innerCartonparameter}
                      onChange={(e) =>
                        updatePrintLocationOuterBagRow(
                          index,
                          "innerCartonparameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.printLocationInnerCarton}
                    onChange={(e) =>
                      updatePrintLocationOuterBagRow(
                        index,
                        "printLocationInnerCarton",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>Print location-</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.outerCartonparameter}
                      onChange={(e) =>
                        updatePrintLocationOuterBagRow(
                          index,
                          "outerCartonparameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={20}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.printLocationOuterCarton}
                    onChange={(e) =>
                      updatePrintLocationOuterBagRow(
                        index,
                        "printLocationOuterCarton",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() =>
                        handleRemoveRow(setPrintLocationOuterbagDetails, index)
                      }
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addPrintLocationOuterBagRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
            <tr>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                MRP
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                MRP
              </td>
              <td colSpan={15} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={mrpInner}
                  onChange={(e) => setMrpInner(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td rowSpan={2} colSpan={70} style={{ textAlign: "center" }}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{ minHeight: "60px", width: "650px" }}
                  value={Nomenclature}
                  onChange={(e) => setNomenclature(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {customerRequirementDetails.map((row, index) => (
              <tr>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>USP</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updateCustomerRequirementDetailsRow(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.usp}
                    onChange={(e) =>
                      updateCustomerRequirementDetailsRow(
                        index,
                        "usp",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>USP</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.UspInnerparameter}
                      onChange={(e) =>
                        updateCustomerRequirementDetailsRow(
                          index,
                          "UspInnerparameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={15}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.UspInner}
                    onChange={(e) =>
                      updateCustomerRequirementDetailsRow(
                        index,
                        "UspInner",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() =>
                        handleRemoveRow(setCustomerRequirementDetails, index)
                      }
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addcustomerRequirementDetailsRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
          </table>
        </>
      ),
    },
    {
      key: "9",
      label: "Sticker requirements & Packing Method",
      children: (
        <>
          <table
            align="left"
            style={{
              width: "100%",
              height: "auto",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <th colSpan={100} style={{ height: "35px", textAlign: "center" }}>
                Sticker requirements
              </th>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Barcode Sticker:
              </td>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={barcodeSticker}
                  onChange={(e) => setBarcodeSticker(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {productDevStrikerDetails.map((row, index) => (
              <tr>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>Product Details Sticker for Plain Box:</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updateProductDevStrikerRow(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={70}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.plainboxsticker}
                    onChange={(e) =>
                      updateProductDevStrikerRow(
                        index,
                        "plainboxsticker",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() =>
                        handleRemoveRow(setProductDevStrikerDetails, index)
                      }
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addProductDevStrikerRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
            <tr>
              <th colSpan={100} style={{ height: "35px", textAlign: "center" }}>
                Packing Method
              </th>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Alignment of Inner Carton : (LxWxH)
              </td>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={alignmentOfInnerCarton}
                  onChange={(e) => setAlignmentOfInnerCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Orientation of Inner Carton:{" "}
              </td>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={orientationOfInnerCarton}
                  onChange={(e) => setOrientationOfInnerCarton(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                Alignment of packs : (LxWxH)
              </td>
              <td colSpan={70} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="text"
                  value={alignmentOfPacks}
                  onChange={(e) => setAlignmentOfPacks(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            {packingMethodDetails.map((row, index) => (
              <tr>
                <td
                  colSpan={30}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {index === 0 ? (
                    <span>Orientation of packs :</span>
                  ) : (
                    <input
                      className="inp-new"
                      type="text"
                      value={row.parameter}
                      onChange={(e) =>
                        updatePackingMethodRow(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  )}
                </td>
                <td
                  colSpan={70}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.orientationofpacks}
                    onChange={(e) =>
                      updatePackingMethodRow(
                        index,
                        "orientationofpacks",
                        e.target.value
                      )
                    }
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                  developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={() =>
                        handleRemoveRow(setPackingMethodDetails, index)
                      }
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
            {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
              <button
                onClick={addPackingMethodRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
            <tr>
              <td
                colSpan={10}
                style={{ height: "100px", width: "10%", textAlign: "center" }}
              >
                Nature of Change :
              </td>
              <td
                colSpan={90}
                style={{ height: "100px", width: "100%", textAlign: "center" }}
              >
                <Input.TextArea
                  className="inp-new"
                  style={{
                    height: "100%",
                    textAlign: "left",
                    paddingLeft: "5em",
                  }}
                  value={natureOfChange}
                  onChange={(e) => setNatureOfChange(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: "10",
      label: "Inner Film",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr style={{ textAlign: "center" }}>
              {getImageInnerFilmI && getImageInnerFilmI ? (
                <img
                  src={getImageInnerFilmI}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    margin: "10px 0",
                  }}
                />
              ) : (
                <span>No image available for Inner Film I</span>
              )}
            </tr>
            <tr style={{ textAlign: "center" }}>
              <Upload
                accept="image/*,application/pdf"
                beforeUpload={(file) => {
                  const isValid =
                    file.type === "application/pdf" ||
                    file.type.startsWith("image/");
                  if (!isValid) {
                    message.error("You can only upload PDF or image files!");
                  } else {
                    setInnerFilmImage(file);
                  }
                  return false;
                }}
                showUploadList={false}
              >
                <Button
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "normal",

                    marginLeft: "10px",
                  }}
                  disabled={!isEditable && getImageInnerFilmI}
                  icon={<UploadOutlined />}
                >
                  Select Inner Film
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={() => handleImageUpload(innerFilmImage, "innerFilmI")}
                disabled={!innerFilmImage}
                style={{
                  color: "#00308F",
                  fontWeight: "normal",

                  marginLeft: "10px",
                }}
              >
                Upload Inner Film
              </Button>
              <Button
                type="danger"
                onClick={() => handleImageRemove("INNER_FILM_I")}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "normal",

                  marginLeft: "10px",
                }}
                disabled={!isEditable}
              >
                Remove Inner Film
              </Button>
              <tr
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {innerFilmImage && (
                  <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                    Selected File : {innerFilmImage.name}
                  </span>
                )}
              </tr>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: "11",
      label: "Outer Film",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr style={{ textAlign: "center" }}>
              {getImageOuterFilmII && getImageOuterFilmII ? (
                <img
                  src={getImageOuterFilmII}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    margin: "10px 0",
                  }}
                />
              ) : (
                <span>No image available for Outer Film II</span>
              )}
            </tr>
            <tr style={{ textAlign: "center" }}>
              <Upload
                accept="image/*,.pdf"
                beforeUpload={(file) => {
                  if (
                    file.type.startsWith("image/") ||
                    file.type === "application/pdf"
                  ) {
                    setOuterFilmImage(file);
                    return false;
                  } else {
                    console.error("Only image and PDF files are allowed.");
                    return false;
                  }
                }}
                showUploadList={false}
              >
                <Button
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "normal",

                    marginLeft: "10px",
                  }}
                  disabled={!isEditable}
                  icon={<UploadOutlined />}
                >
                  Select Outer Film
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={() =>
                  handleImageUpload(outerFilmImage, "outerFilmII", state.pdsNo)
                }
                disabled={!outerFilmImage}
                style={{
                  color: "#00308F",
                  fontWeight: "normal",

                  marginLeft: "10px",
                }}
              >
                Upload Outer Film
              </Button>
              <Button
                type="danger"
                onClick={() => handleImageRemove("OUTER_FILM_II")}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "normal",

                  marginLeft: "10px",
                }}
                disabled={!isEditable}
              >
                Remove Outer Film
              </Button>
              <tr
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {outerFilmImage && (
                  <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                    Selected File : {outerFilmImage.name}
                  </span>
                )}
              </tr>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: "12",
      label: "Inner Carton:",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr style={{ textAlign: "center" }}>
              {getImageInnerCartonIII ? (
                <img
                  src={getImageInnerCartonIII}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    margin: "10px 0",
                  }}
                />
              ) : (
                <span>No image available for Inner Carton III</span>
              )}
            </tr>
            <tr style={{ textAlign: "center" }}>
              <Upload
                accept="image/*,.pdf"
                beforeUpload={(file) => {
                  if (
                    file.type.startsWith("image/") ||
                    file.type === "application/pdf"
                  ) {
                    setInnerCartonImage(file);
                    return false;
                  } else {
                    console.error("Only image and PDF files are allowed.");
                    return false;
                  }
                }}
                showUploadList={false}
              >
                <Button
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "normal",
                    marginLeft: "10px",
                  }}
                  disabled={!isEditable}
                  icon={<UploadOutlined />}
                >
                  Select Inner Carton
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={() =>
                  handleImageUpload(
                    innerCartonImage,
                    "innerCartonIII",
                    state.pdsNo
                  )
                }
                disabled={!innerCartonImage}
                style={{
                  color: "#00308F",
                  fontWeight: "normal",
                  marginLeft: "10px",
                }}
              >
                Upload Inner Carton
              </Button>
              <Button
                type="danger"
                onClick={() => handleImageRemove("INNER_CARTON_III")}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "normal",
                  marginLeft: "10px",
                }}
                disabled={!isEditable}
              >
                Remove Inner Carton
              </Button>
              <tr
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {innerCartonImage && (
                  <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                    Selected File : {innerCartonImage.name}
                  </span>
                )}
              </tr>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: "13",
      label: "Outer Carton:",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr style={{ textAlign: "center" }}>
              {getImageOuterCartonIV ? (
                <img
                  src={getImageOuterCartonIV}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    margin: "10px 0",
                  }}
                />
              ) : (
                <span>No image available for Outer Carton IV</span>
              )}
            </tr>
            <tr style={{ textAlign: "center", verticalAlign: "bottom" }}>
              <Upload
                accept="image/*,.pdf"
                beforeUpload={(file) => {
                  if (
                    file.type.startsWith("image/") ||
                    file.type === "application/pdf"
                  ) {
                    setOuterCartonImage(file);
                    return false;
                  } else {
                    console.error("Only image and PDF files are allowed.");
                    return false;
                  }
                }}
                showUploadList={false}
              >
                <Button
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "normal",
                    marginLeft: "10px",
                  }}
                  disabled={!isEditable}
                  icon={<UploadOutlined />}
                >
                  Select Outer Carton
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={() =>
                  handleImageUpload(
                    outerCartonImage,
                    "outerCartonIV",
                    state.pdsNo
                  )
                }
                disabled={!outerCartonImage || !isEditable}
                style={{
                  color: "#00308F",
                  fontWeight: "normal",
                  marginLeft: "10px",
                }}
              >
                Upload Outer Carton
              </Button>
              <Button
                type="danger"
                onClick={() => handleImageRemove("OUTER_CARTON_IV")}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "normal",

                  marginLeft: "10px",
                }}
                disabled={!isEditable}
              >
                Remove Outer Carton
              </Button>
              <tr
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {outerCartonImage && (
                  <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                    Selected File : {outerCartonImage.name}
                  </span>
                )}
              </tr>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: "14",
      label: "SlipSheet",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr style={{ textAlign: "center" }}>
              {getSlipSheetImage ? (
                <img
                  src={getSlipSheetImage}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    margin: "10px 0",
                  }}
                />
              ) : (
                <span>No image available for Slip Sheet</span>
              )}
            </tr>
            <tr style={{ textAlign: "center", verticalAlign: "bottom" }}>
              <Upload
                accept="image/*,.pdf"
                beforeUpload={(file) => {
                  if (
                    file.type.startsWith("image/") ||
                    file.type === "application/pdf"
                  ) {
                    setSlipSheetImage(file);
                    return false;
                  } else {
                    console.error("Only image and PDF files are allowed.");
                    return false;
                  }
                }}
                showUploadList={false}
              >
                <Button
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "normal",
                    marginLeft: "10px",
                  }}
                  disabled={!isEditable}
                  icon={<UploadOutlined />}
                >
                  Select Slip Sheet
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={() =>
                  handleImageUpload(slipSheetImage, "slipSheet", state.pdsNo)
                }
                disabled={!slipSheetImage || !isEditable}
                style={{
                  color: "#00308F",
                  fontWeight: "normal",
                  marginLeft: "10px",
                }}
              >
                Upload Slip Sheet
              </Button>
              <Button
                type="danger"
                onClick={() => handleImageRemove("SLIP_SHEET")}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "normal",
                  marginLeft: "10px",
                }}
                disabled={!isEditable}
              >
                Remove Slip Sheet
              </Button>
              <tr
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {slipSheetImage && (
                  <span style={{ marginLeft: "10px", fontStyle: "italic" }}>
                    Selected File : {slipSheetImage.name}
                  </span>
                )}
              </tr>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: "15",
      label: "Specifications",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "10px",
                paddingBottom: "50px",
              }}
            >
              <table style={{ borderCollapse: "collapse", width: "48%" }}>
                <tbody>
                  <tr>
                    <td
                      colSpan={50}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Slip sheet Specifications
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={25}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Length
                    </td>
                    <td colSpan={25}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={25}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Width
                    </td>
                    <td colSpan={25}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={25}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Thickness
                    </td>
                    <td colSpan={25}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                  </tr>
                  {slipsheetSpecificationsDetails.map((row, index) => (
                    <tr>
                      <td
                        colSpan={25}
                        style={{ textAlign: "center", height: "35px" }}
                      >
                        {index === 0 ? (
                          <span>Pull Side</span>
                        ) : (
                          <input
                            className="inp-new"
                            type="text"
                            value={row.parameter}
                            onChange={(e) =>
                              updateSlipSheetSpecRow(
                                index,
                                "parameter",
                                e.target.value
                              )
                            }
                            disabled={!isEditable}
                          />
                        )}
                      </td>
                      <td colSpan={25}>
                        <input
                          className="inp-new"
                          style={{ textAlign: "center", height: "35px" }}
                          value={row.pullSide}
                          onChange={(e) =>
                            updateSlipSheetSpecRow(
                              index,
                              "pullSide",
                              e.target.value
                            )
                          }
                          disabled={!isEditable}
                        />
                      </td>
                      {index !== 0 &&
                        developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                        developmentSupervisorStatus !==
                          "SUPERVISOR_APPROVED" && (
                          <button
                            onClick={() =>
                              handleRemoveRow(
                                setSlipsheetSpecificationsDetails,
                                index
                              )
                            }
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
                  {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={addSlipSheetSpecRow}
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 20px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <PlusOutlined style={{ marginRight: "8px" }} />
                      Add Row
                    </button>
                  )}
                </tbody>
              </table>
              <table style={{ borderCollapse: "collapse", width: "48%" }}>
                <tbody>
                  <tr>
                    <td
                      colSpan={60}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Cartons per Slip Sheet
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={20}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Length - Wise
                    </td>
                    <td colSpan={20}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={lengthWise}
                        onChange={(e) => setLengthWise(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                    <td colSpan={20}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={lengthWiseDimension}
                        onChange={(e) => setLengthWiseDimension(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={20}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Width - Wise
                    </td>
                    <td colSpan={20}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={widthWise}
                        onChange={(e) => setWidthWise(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                    <td colSpan={20}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={widthWiseDimension}
                        onChange={(e) => setWidthWiseDimension(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                  </tr>
                  {cartonsperSlipSheetDetails.map((row, index) => (
                    <tr>
                      <td
                        colSpan={20}
                        style={{ textAlign: "center", height: "35px" }}
                      >
                        {index === 0 ? (
                          <span>Height - Wise</span>
                        ) : (
                          <input
                            className="inp-new"
                            type="text"
                            value={row.parameter}
                            onChange={(e) =>
                              updateSlipsheetCartonRow(
                                index,
                                "parameter",
                                e.target.value
                              )
                            }
                            disabled={!isEditable}
                          />
                        )}
                      </td>
                      <td colSpan={20}>
                        <input
                          className="inp-new"
                          style={{ textAlign: "center", height: "35px" }}
                          value={row.heightWise}
                          onChange={(e) =>
                            updateSlipsheetCartonRow(
                              index,
                              "heightWise",
                              e.target.value
                            )
                          }
                          disabled={!isEditable}
                        />
                      </td>
                      <td colSpan={20}>
                        <input
                          className="inp-new"
                          style={{ textAlign: "center", height: "35px" }}
                          value={row.heightWiseDimension}
                          onChange={(e) =>
                            updateSlipsheetCartonRow(
                              index,
                              "heightWiseDimension",
                              e.target.value
                            )
                          }
                          disabled={!isEditable}
                        />
                      </td>
                      {index !== 0 &&
                        developmentSupervisorStatus !== "SUPERVISOR_SAVED" &&
                        developmentSupervisorStatus !==
                          "SUPERVISOR_APPROVED" && (
                          <button
                            onClick={() =>
                              handleRemoveRow(
                                setCartonsperSlipSheetDetails,
                                index
                              )
                            }
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

                  <tr>
                    <td
                      colSpan={20}
                      style={{ textAlign: "center", height: "35px" }}
                    >
                      Total
                    </td>
                    <td colSpan={40}>
                      <input
                        className="inp-new"
                        style={{ textAlign: "center", height: "35px" }}
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        disabled={!isEditable}
                      />
                    </td>
                  </tr>
                  {developmentSupervisorStatus !== "SUPERVISOR_APPROVED" && (
                    <button
                      onClick={addSlipSheetCartonRow}
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 20px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <PlusOutlined style={{ marginRight: "8px" }} />
                      Add Row
                    </button>
                  )}
                </tbody>
              </table>
            </div>
          </table>
        </>
      ),
    },

    {
      key: "16",
      label: "Reviews",
      children: (
        <>
          <table
            align="left"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr>
              <td colSpan={40} style={{ textAlign: "center", height: "35px" }}>
                Prepared by: <br /> (Development)
              </td>
              <td colSpan={30} style={{ textAlign: "center", height: "35px" }}>
                Reviewed by <br /> (QC):
              </td>
              <td colSpan={20} style={{ textAlign: "center", height: "35px" }}>
                Approved by <br />
                (QA):
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ textAlign: "center", height: "60px" }}>
                {getImage1 && (
                  <img
                    src={getImage1}
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                  />
                )}
                <br />
                {developmentSupervisorSign}
                <br />
                {formatDate(developmentSupervisorSubmitOn)}
              </td>
              <td colSpan={30} style={{ textAlign: "center", height: "60px" }}>
                {getImageQC && (
                  <img
                    src={getImageQC}
                    alt="kk"
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                  />
                )}
                <br />
                {qcSign}
                <br />
                {formatDate(qcSubmitOn)}
              </td>
              <td colSpan={20} style={{ textAlign: "center", height: "60px" }}>
                {getImageQA && (
                  <img
                    src={getImageQA}
                    alt="alt"
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                  />
                )}
                <br />
                {qaSign}
                <br />
                {formatDate(qaSubmitOn)}
              </td>
            </tr>
            <br />
            <br />
            <br />
            <br />
            <tr>
              <td rowSpan={2} colSpan={20} style={{ height: "150px" }}>
                Accepted by HOD / Designee <br /> Sign & Date
              </td>
              <td
                colSpan={20}
                style={{ height: "40px", width: "20%", textAlign: "center" }}
              >
                PPC
              </td>
              <td
                colSpan={20}
                style={{ height: "40px", width: "20%", textAlign: "center" }}
              >
                Bleaching
              </td>
              <td
                colSpan={20}
                style={{ height: "40px", width: "20%", textAlign: "center" }}
              >
                Spunlace
              </td>
              <td
                colSpan={20}
                style={{ height: "40px", width: "20%", textAlign: "center" }}
              >
                Pad Punching
              </td>
              <td
                colSpan={20}
                style={{ height: "40px", width: "20%", textAlign: "center" }}
              >
                Dry Goods
              </td>
            </tr>
            <tr>
              <td colSpan={20} style={{ width: "20%", textAlign: "center" }}>
                {getImagePPC && (
                  <img
                    src={getImagePPC}
                    alt="alt"
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                  />
                )}
                <br />
                {ppcSign}
                <br />
                {formatDate(ppcSubmitOn)}
              </td>
              <td colSpan={20} style={{ width: "20%", textAlign: "center" }}>
                {getImageBleaching && (
                  <img
                    src={getImageBleaching}
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                    alt="alt"
                  />
                )}
                <br />
                {bleachingSign}
                <br />
                {formatDate(bleachingSubmitOn)}
              </td>
              <td colSpan={20} style={{ width: "20%", textAlign: "center" }}>
                {getImageSpunlace && (
                  <img
                    src={getImageSpunlace}
                    alt="alt"
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                  />
                )}
                <br />
                {spunlaceSign}
                <br />
                {formatDate(spunlaceSubmitOn)}
              </td>
              <td colSpan={20} style={{ width: "20%", textAlign: "center" }}>
                {getImagePadPunching && (
                  <img
                    src={getImagePadPunching}
                    alt="alt"
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                  />
                )}
                <br />
                {padPunchingSign}
                <br />
                {formatDate(padPunchingSubmitOn)}
              </td>
              <td colSpan={20} style={{ width: "20%", textAlign: "center" }}>
                {getImageDryGoods && (
                  <img
                    src={getImageDryGoods}
                    alt="alt"
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                      margin: "10px 0",
                    }}
                  />
                )}
                <br />
                {dryGoodsSign}
                <br />
                {formatDate(dryGoodsSubmitOn)}
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="PRODUCT DEVELOPMENT SHEET"
        formatNo="PH-DVP01/F-001"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QC_MANAGER" ||
          roleauth === "QA_MANAGER" ||
          roleauth === "ROLE_HOD" ||
          roleauth === "ROLE_QA" ||
          roleauth === "ROLE_QC" ||
          roleauth === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",

                  display: canShowButtons("approve") ? "inline-block" : "none",
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

                  display: canShowButtons("reject") ? "inline-block" : "none",
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
                  display: canDisplaySaveButton(),
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
                  display: canDisplaySubmitButton(),
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
            disabled={!rejectRemarks}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          dataSource={reportDetails}
          pagination={{ pageSize: 5 }}
          bordered
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

export default Development_f001;
