import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import {
  getYearAndMonth,
  handleDecimalNumberKeyDown,
  printDateFormat,
  slashFormatDate,
} from "../util/util.js";

export default function QA_F028_AnnualProductReview() {
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { TextArea } = Input;
  const handleKeyDown = () => {};
  const { date } = location.state || {};
  const today = new Date().toISOString().split("T")[0];
  const [rejectModal, setRejectModal] = useState(false);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [isSaveButton, setIsSaveButton] = useState("block");
  const [isSubmitButton, setIsSubmitButton] = useState("block");
  const [isApprovalButtons, setIsApprovalButtons] = useState("block");
  const [isLoading, setIsLoading] = useState(false);
  const [eSign, setESign] = useState({
    qaDesigneeSign: null,
    qaManagerOrMrSign: null,
  });
  const { year, month } = getYearAndMonth(date);
  const [formData, setFormData] = useState({
    date: date,
    month: month,
    year: year,
    unit: "Unit H",
    formatNo: "PH-QAD01/F-028",
    formatName: "ANNUAL PRODUCT REVIEW",
    sopNumber: "PH-QAD01-D-25",
    revisionNo: "01",
    productName: "",
    productNameA: "",
    productCode: "",
    productCodeA: "",
    shelfLife: "",
    shelfLifeA: "",
    packSize: "",
    packSizeA: "",
    noOfBatches: "",
    noOfBatchesA: "",
    reviewPeriod: "",
    reviewPeriodA: "",
    preparedBy: "",
    preparedByA: "",
    preparedDate: "",
    preparedDateA: "",
    reviewedBy: "",
    reviewedByA: "",
    reviewdDate: "",
    reviewdDateA: "",
    approvedBy: "",
    approvedByA: "",
    approvedDate: "",
    approvedDateA: "",
    rawmater1: "",
    summaryline1: [
      {
        particulars: "Raw Materials",
        noOfTotalLots: "",
        accepted: "",
        rejected: "",
        summaryRemarks: "",
      },
      {
        particulars: "Packing Materials",
        noOfTotalLots: "",
        accepted: "",
        rejected: "",
        summaryRemarks: "",
      },
      {
        particulars: "Out Of Specifications",
        noOfTotalLots: "",
        accepted: "",
        rejected: "",
        summaryRemarks: "",
      },
      {
        particulars: "Deviation",
        noOfTotalLots: "",
        accepted: "",
        rejected: "",
        summaryRemarks: "",
      },
      {
        particulars: "Complaints",
        noOfTotalLots: "",
        accepted: "",
        rejected: "",
        summaryRemarks: "",
      },
      {
        particulars: "Product Recalls",
        noOfTotalLots: "",
        accepted: "",
        rejected: "",
        summaryRemarks: "",
      },
      {
        particulars: "Qualification Status Of Production Equipment's",
        noOfTotalLots: "",
        accepted: "",
        rejected: "",
        summaryRemarks: "",
      },
    ],

    summaryparametersline1: [
      {
        parameterValues: "Dimension (mm)",
        maximumValue: "",
        minimumValue: "",
        average: "",
        std: "",
        cpk: "",
      },
      {
        parameterValues: "Whiteness Indices",
        maximumValue: "",
        minimumValue: "",
        average: "",
        std: "",
        cpk: "",
      },
      {
        parameterValues: "Sinking time (Sec.)",
        maximumValue: "",
        minimumValue: "",
        average: "",
        std: "",
        cpk: "",
      },
      {
        parameterValues: "Absorption Capacity",
        maximumValue: "",
        minimumValue: "",
        average: "",
        std: "",
        cpk: "",
      },
      {
        parameterValues: "Moisture content",
        maximumValue: "",
        minimumValue: "",
        average: "",
        std: "",
        cpk: "",
      },
    ],

    rawmaterialsdetailsline2: [
      {
        rmCode: "",
        nameOfMaterialRaw: "",
        supplierRaw: "",
        manufacturerRaw: "",
        noOfLotsRaw: "",
        rejectedRaw: "",
        approvedRaw: "",
      },
    ],
    packingmaterialdetailsline3: [
      {
        pmCode: "",
        nameOfMaterialPack: "",
        manufacturerPack: "",
        supplierPack: "",
        noOfLotsPack: "",
        rejectedPack: "",
        approvedPack: "",
      },
    ],
    listofequipmentandqualificationline4: [
      {
        utility: "",
        equipmentNo: "",
        qualificationDoneDate: "",
        qualificationDueDate: "",
        qualificationRemarks: "",
      },
    ],
    reviewofcriticalparameterchecksofline5: [
      {
        reviewProductCode: "",
        totalOrderNo: "",
        noOfLotsTested: "",
        productDimension: "",
        whiteness: "",
        sinkingTime: "",
        absorptionCapacity: "",
        moisture: "",
        reviewRemarks: "",
      },
    ],
    reviewofallnonconformityproductline6: [
      {
        product: "",
        reasonForNc: "",
        implicationOnPassedBatches: "",
      },
    ],
    reviewofdeviationline7: [
      {
        dateOrDeviationNo: "",
        detailsOfDeviation: "",
        rootCause: "",
        capa: "",
        closureDate: "",
        deviationRemarks: "",
      },
    ],
    reviewofchangecontrolsystemline8: [
      {
        changeControlNumber: "",
        dateInitiated: "",
        descriptionProposedOfChange: "",
        initiatedDepartment: "",
        clouserDate: "",
      },
    ],
    complaintsrejectsandproductrecallsline9: [
      {
        complaintDate: "",
        complaintCapa: "",
        description: "",
        correctiveOrPreventiveAction: "",
        openOrClosed: "",
        complaintRemarks: "",
      },
    ],
    reviewofproductrecallline10: [
      {
        recallNo: "",
        recallDate: "",
        batchNo: "",
        reasonForRecall: "",
        investigationSummary: "",
        recallRemarks: "",
      },
    ],
    recommendations: "",
    qaDesigneeStatus: null,
    qaDesigneeSaveOn: null,
    qaDesigneeSaveBy: null,
    qaDesigneeSaveId: null,
    qaDesigneeSubmitOn: null,
    qaDesigneeSubmitBy: null,
    qaDesigneeSubmitId: null,
    qaDesigneeSign: null,
    qaManagerOrMrStatus: null,
    qaManagerOrMrApprovedOn: null,
    qaManagerOrMrApprovedBy: null,
    qaManagerOrMrApproverId: null,
    qaManagerOrMrSign: null,
  });

  const productDimensionMax = Math.max(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.productDimension, 10) || 0
    )
  );

  const productDimensionMin = Math.min(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.productDimension, 10) || 0
    )
  );

  const totalDimension = formData.reviewofcriticalparameterchecksofline5.reduce(
    (sum, item) => sum + (parseFloat(item.productDimension, 10) || 0),
    0
  );

  const count = formData.reviewofcriticalparameterchecksofline5.length;
  const productDimensionAvg =
    count > 0 ? parseFloat((totalDimension / count).toFixed(3)) : 0;

  const whitenessMax = Math.max(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseInt(item.whiteness) || 0
    )
  );
  const whitenessMin = Math.min(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseInt(item.whiteness) || 0
    )
  );

  const whitenessTotal = formData.reviewofcriticalparameterchecksofline5.reduce(
    (sum, item) => {
      const value = parseFloat(item.whiteness);
      return value ? sum + value : sum;
    },
    0
  );

  const whitenessCount = formData.reviewofcriticalparameterchecksofline5.length;
  const whitenessAvg =
    whitenessCount > 0
      ? parseFloat((whitenessTotal / whitenessCount).toFixed(3))
      : 0;

  const sinkingMax = Math.max(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.sinkingTime) || 0
    )
  );
  const sinkingMin = Math.min(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.sinkingTime) || 0
    )
  );
  const sinkingTotal = formData.reviewofcriticalparameterchecksofline5.reduce(
    (sum, item) => {
      const value = parseFloat(item.sinkingTime);
      return value ? sum + value : sum;
    },
    0
  );

  const sinkingCount = formData.reviewofcriticalparameterchecksofline5.length;
  const sinkingAvg =
    sinkingCount > 0 ? parseFloat((sinkingTotal / sinkingCount).toFixed(3)) : 0;

  const absorptionMax = Math.max(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.absorptionCapacity) || 0
    )
  );
  const absorptionMin = Math.min(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.absorptionCapacity) || 0
    )
  );
  const absorptionTotal =
    formData.reviewofcriticalparameterchecksofline5.reduce((sum, item) => {
      const value = parseFloat(item.absorptionCapacity);
      return value ? sum + value : sum;
    }, 0);

  const absorptionCount =
    formData.reviewofcriticalparameterchecksofline5.length;
  const absorptionAvg =
    absorptionCount > 0
      ? parseFloat((absorptionTotal / absorptionCount).toFixed(3))
      : 0;

  const moistureMax = Math.max(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.moisture) || 0
    )
  );
  const moistureMin = Math.min(
    ...formData.reviewofcriticalparameterchecksofline5.map(
      (item) => parseFloat(item.moisture) || 0
    )
  );
  const moistureTotal = formData.reviewofcriticalparameterchecksofline5.reduce(
    (sum, item) => {
      const value = parseFloat(item.moisture);
      return value ? sum + value : sum;
    },
    0
  );

  const moistureCount = formData.reviewofcriticalparameterchecksofline5.length;
  const moistureAvg =
    moistureCount > 0
      ? parseFloat((moistureTotal / moistureCount).toFixed(3))
      : 0;

  const transformedWhitenessIndex = () => {
    return formData.reviewofcriticalparameterchecksofline5.map((data) => ({
      name: "",
      value: data.whiteness,
    }));
  };

  const transformedSinkingTime = () => {
    return formData.reviewofcriticalparameterchecksofline5.map((data) => ({
      name: "",
      value: data.sinkingTime,
    }));
  };

  const transformedAbsorptionCapacity = () => {
    return formData.reviewofcriticalparameterchecksofline5.map((data) => ({
      name: "",
      value: data.absorptionCapacity,
    }));
  };

  const transformedMoisture = () => {
    return formData.reviewofcriticalparameterchecksofline5.map((data) => ({
      name: "",
      value: data.moisture,
    }));
  };

  const addRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rawmaterialsdetailsline2: [
        ...prevFormData.rawmaterialsdetailsline2,
        {
          rmCode: "",
          nameOfMaterialRaw: "",
          supplierRaw: "",
          manufacturerRaw: "",
          noOfLotsRaw: "",
          rejectedRaw: "",
          approvedRaw: "",
        },
      ],
    }));
  };

  const packingAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      packingmaterialdetailsline3: [
        ...prevFormData.packingmaterialdetailsline3,
        {
          pmCode: "",
          nameOfMaterialPack: "",
          manufacturerPack: "",
          supplierPack: "",
          noOfLotsPack: "",
          rejectedPack: "",
          approvedPack: "",
        },
      ],
    }));
  };

  const listOfEquipAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      listofequipmentandqualificationline4: [
        ...prevFormData.listofequipmentandqualificationline4,
        {
          utility: "",
          equipmentNo: "",
          qualificationDoneDate: "",
          qualificationDueDate: "",
          qualificationRemarks: "",
        },
      ],
    }));
  };

  const criticalParamCheckAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      reviewofcriticalparameterchecksofline5: [
        ...prevFormData.reviewofcriticalparameterchecksofline5,
        {
          reviewProductCode: "",
          totalOrderNo: "",
          noOfLotsTested: "",
          productDimension: "",
          whiteness: "",
          sinkingTime: "",
          absorptionCapacity: "",
          moisture: "",
          reviewRemarks: "",
        },
      ],
    }));
  };

  const reviewOfNCProductAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      reviewofallnonconformityproductline6: [
        ...prevFormData.reviewofallnonconformityproductline6,
        {
          product: "",
          reasonForNc: "",
          implicationOnPassedBatches: "",
        },
      ],
    }));
  };

  const reviewOfDeviationsAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      reviewofdeviationline7: [
        ...prevFormData.reviewofdeviationline7,
        {
          product: "",
          reason: "",
          implications: "",
        },
      ],
    }));
  };
  const reviewOfChangeControlsAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      reviewofchangecontrolsystemline8: [
        ...prevFormData.reviewofchangecontrolsystemline8,
        {
          changeControlNumber: "",
          dateInitiated: "",
          descriptionProposedOfChange: "",
          initiatedDepartment: "",
          clouserDate: "",
        },
      ],
    }));
  };
  const reviewOfComplaintsAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      complaintsrejectsandproductrecallsline9: [
        ...prevFormData.complaintsrejectsandproductrecallsline9,
        {
          complaintDate: "",
          complaintCapa: "",
          description: "",
          correctiveOrPreventiveAction: "",
          openOrClosed: "",
          complaintRemarks: "",
        },
      ],
    }));
  };
  // reviewOfProductRecalls
  const reviewOfProductRecallsAddRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      reviewofproductrecallline10: [
        ...prevFormData.reviewofproductrecallline10,
        {
          recallNo: "",
          recallDate: "",
          batchNo: "",
          reasonForRecall: "",
          investigationSummary: "",
          remarks: "",
        },
      ],
    }));
  };

  const deleteSelectedRows = (parentKey) => {
    const selectedIdsArray = formData[parentKey]
      .filter((row) => row.selected)
      .map((row) => row.lineId);

    if (selectedIdsArray.length === 0) {
      message.warning("No rows selected for deletion");
      return;
    }

    const token = localStorage.getItem("token");

    if (selectedIdsArray[0] !== undefined) {
      axios
        .delete(
          `${API.prodUrl}/Precot/api/qa/AnnualProductReview/delete?listName=${parentKey}&id=${selectedIdsArray[0]}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          message.success("Deleted successfully");
          fetchDataBydate();
        })
        .catch((error) => {
          message.error("Failed to delete selected rows");
        });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: prevFormData[parentKey].filter((row) => !row.selected),
      }));
    }
  };

  const [rejectReason, setRejectReason] = useState();

  const handleOpenRejectModal = () => {
    setRejectModal(true);
  };

  const handleCancel = () => {
    setRejectModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckBoxChange = (index, parentKey) => {
    setFormData((prevData) => {
      const updatedDetails = prevData[parentKey].map((detail, i) => ({
        ...detail,
        selected: i === index ? !detail.selected : false, // Toggle selection only for the clicked checkbox
      }));
      return {
        ...prevData,
        [parentKey]: updatedDetails,
      };
    });
  };

  const handleArrayChange = (e, index, field, parentKey) => {
    const { value } = e.target;

    setFormData((prevFormData) => {
      const updatedRawmaterDetails = [...prevFormData[parentKey]];
      updatedRawmaterDetails[index] = {
        ...updatedRawmaterDetails[index],
        [field]: value,
      };

      return {
        ...prevFormData,
        [parentKey]: updatedRawmaterDetails,
      };
    });
  };

  const handleOnWhitenessBlur = (e, index) => {
    const { value } = e.target;
    if (value < 80) {
      message.warning("value must be greater than or equal to 80");
      setFormData((prevFormData) => {
        const updatedRawmaterDetails = [
          ...prevFormData.reviewofcriticalparameterchecksofline5,
        ];
        updatedRawmaterDetails[index] = {
          ...updatedRawmaterDetails[index],
          whiteness: "",
        };

        return {
          ...prevFormData,
          reviewofcriticalparameterchecksofline5: updatedRawmaterDetails,
        };
      });
    }
  };

  const handleOnSinkingTimeBlur = (e, index) => {
    const { value } = e.target;
    if (value > 10) {
      message.warning("value must be Lesser than or equal to 10");
      setFormData((prevFormData) => {
        const updatedRawmaterDetails = [
          ...prevFormData.reviewofcriticalparameterchecksofline5,
        ];
        updatedRawmaterDetails[index] = {
          ...updatedRawmaterDetails[index],
          sinkingTime: "",
        };

        return {
          ...prevFormData,
          reviewofcriticalparameterchecksofline5: updatedRawmaterDetails,
        };
      });
    }
  };
  const handleAbsorptionCapBlur = (e, index) => {
    const { value } = e.target;
    if (value < 23) {
      message.warning("value must be Lesser than or equal to 10");
      setFormData((prevFormData) => {
        const updatedRawmaterDetails = [
          ...prevFormData.reviewofcriticalparameterchecksofline5,
        ];
        updatedRawmaterDetails[index] = {
          ...updatedRawmaterDetails[index],
          absorptionCapacity: "",
        };

        return {
          ...prevFormData,
          reviewofcriticalparameterchecksofline5: updatedRawmaterDetails,
        };
      });
    }
  };

  const handleMoistureCapBlur = (e, index) => {
    const { value } = e.target;
    if (value > 8) {
      message.warning("value must be Lesser than or equal to 8");
      setFormData((prevFormData) => {
        const updatedRawmaterDetails = [
          ...prevFormData.reviewofcriticalparameterchecksofline5,
        ];
        updatedRawmaterDetails[index] = {
          ...updatedRawmaterDetails[index],
          moisture: "",
        };

        return {
          ...prevFormData,
          reviewofcriticalparameterchecksofline5: updatedRawmaterDetails,
        };
      });
    }
  };

  const handleSelectArrayChange = (value, index, field, parentKey) => {
    setFormData((prevFormData) => {
      const updatedRawmaterDetails = [...prevFormData[parentKey]];
      updatedRawmaterDetails[index] = {
        ...updatedRawmaterDetails[index],
        [field]: value,
      };

      return {
        ...prevFormData,
        [parentKey]: updatedRawmaterDetails,
      };
    });
  };

  const role = localStorage.getItem("role");

  const mandatoryFields = [
    { path: "preparedDate", message: "Prepared Date is required" },
    { path: "reviewdDate", message: "Reviewed Date is required" },
    { path: "approvedDate", message: "Approved Date is required" },
    { path: "preparedDateA", message: "Prepared Date 1 is required" },
    { path: "reviewdDateA", message: "Reviewed Date 1 is required" },
    { path: "approvedDateA", message: "Approved Date 1 is required" },
    {
      path: "listofequipmentandqualificationline4.qualificationDoneDate",
      message: "Qualification Done Date is required for equipment",
    },
    {
      path: "listofequipmentandqualificationline4.qualificationDueDate",
      message: "Qualification Due Date is required for equipment",
    },
    {
      path: "reviewofdeviationline7.closureDate",
      message: "Closure Date is required for deviation review",
    },
    {
      path: "reviewofchangecontrolsystemline8.dateInitiated",
      message: "Date Initiated is required for change control",
    },
    {
      path: "reviewofchangecontrolsystemline8.clouserDate",
      message: "Closure Date is required for change control",
    },
    {
      path: "complaintsrejectsandproductrecallsline9.complaintDate",
      message: "Complaint Date is required",
    },

    {
      path: "complaintsrejectsandproductrecallsline9.openOrClosed",
      message: "Open / closed in Review of Complaints is required",
    },
    {
      path: "reviewofproductrecallline10.recallDate",
      message: "Recall Date is required",
    },
  ];

  const validateFormData = () => {
    const newErrors = {};

    // Helper function to validate each field path
    const validateFieldPath = (fieldPath, data, message) => {
      const fieldParts = fieldPath.split(".");
      let value = data;

      for (const part of fieldParts) {
        if (Array.isArray(value)) {
          // Validate each item in the array
          value.forEach((item, index) => {
            validateFieldPath(
              fieldParts.slice(1).join("."),
              item,
              `${message} (Item ${index + 1})`
            );
          });
          return;
        } else if (value && typeof value === "object") {
          value = value[part];
        } else {
          value = undefined;
          break;
        }
      }

      // Check if the final value is empty, indicating a required field is missing
      if (!value) {
        newErrors[fieldPath] = message;
      }
    };

    // Validate each mandatory field path with its custom message
    mandatoryFields.forEach(({ path, message }) => {
      validateFieldPath(path, formData, message);
    });
    return newErrors;
  };

  const updateEmptyStringsToNA = (data, excludeFields = []) => {
    // Check if the input is an array
    if (Array.isArray(data)) {
      return data.map((item) => updateEmptyStringsToNA(item, excludeFields));
    }
    // Check if the input is an object
    else if (typeof data === "object" && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        // If the field is in excludeFields, leave it as is
        if (excludeFields.includes(key)) {
          acc[key] = data[key];
        } else {
          // Recursively update values
          acc[key] = updateEmptyStringsToNA(data[key], excludeFields);
        }
        return acc;
      }, {});
    }
    // If it's an empty string, replace it with "N/A" (unless it's an excluded field)
    else {
      return data === "" ? "N/A" : data;
    }
  };

  const validateDisableFields = (response) => {
    if (role === "ROLE_DESIGNEE") {
      if (
        response.qaDesigneeStatus === "QA_DESIGNIEE_SUBMITTED" &&
        (response.qaManagerOrMrStatus === null ||
          response.qaManagerOrMrStatus === "" ||
          response.qaManagerOrMrStatus === "WAITING_FOR_APPROVAL" ||
          response.qaManagerOrMrStatus === "QA_MANAGER_MR_APPROVED")
      ) {
        setIsFieldsDisabled(true);
      } else {
        setIsFieldsDisabled(false);
      }
    } else if (role === "QA_MANAGER" || role === "ROLE_MR") {
      setIsFieldsDisabled(true);
      if (
        response.qaManagerOrMrStatus === "QA_MANAGER_MR_REJECTED" ||
        response.qaManagerOrMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
      }

      if (response.qaManagerOrMrStatus === "WAITING_FOR_APPROVAL") {
      }
    }
    // other roles than Manager MR and Designee
    else {
      setIsFieldsDisabled(true);
    }
  };

  const validateHideButtons = (response) => {
    if (role === "ROLE_DESIGNEE") {
      if (response.qaDesigneeStatus === "QA_DESIGNIEE_SUBMITTED") {
        setIsSaveButton("none");
        setIsSubmitButton("none");
      }

      if (response.qaManagerOrMrStatus === "QA_MANAGER_MR_REJECTED") {
        setIsSaveButton("none");
        setIsSubmitButton("block");
      }
    } else if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (
        response.qaManagerOrMrStatus === "QA_MANAGER_MR_REJECTED" ||
        response.qaManagerOrMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        setIsApprovalButtons("none");
      }

      if (response.qaDesigneeStatus === "QA_DESIGNIEE_SUBMITTED") {
        // add row remove row
        setIsSaveButton("none");
        setIsSubmitButton("none");
      }
    } else {
      setIsSaveButton("none");
      setIsSubmitButton("none");
    }
  };

  const navigateBack = (responseData) => {
    if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (responseData.qaManagerOrMrStatus === "QA_MANAGER_MR_REJECTED") {
        message.warning("QA Designee is not submitted Yet!");
        navigate("/Precot/QA/F-028_summary");
      }

      if (responseData.qaDesigneeStatus !== "QA_DESIGNIEE_SUBMITTED") {
        message.warning("QA Designee is not submitted Yet!");
        navigate("/Precot/QA/F-028_summary");
      }
    }
  };

  const graphItems = [
    {
      key: "1",
      label: "Whiteness Index (WI)",
      children: (
        <>
          <ResponsiveContainer width="50%" height={300}>
            <BarChart
              data={transformedWhitenessIndex()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" barSize={50}>
                <LabelList dataKey="value" position="bottom" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      ),
    },
    {
      key: "2",
      label: "Sinking Time(s)",
      children: (
        <>
          <ResponsiveContainer width="50%" height={300}>
            <BarChart
              data={transformedSinkingTime()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" barSize={50}>
                <LabelList dataKey="value" position="bottom" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      ),
    },
    {
      key: "3",
      label: "Absorption Capacity",
      children: (
        <>
          <ResponsiveContainer width="50%" height={300}>
            <BarChart
              data={transformedAbsorptionCapacity()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" barSize={50}>
                <LabelList dataKey="value" position="bottom" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      ),
    },
    {
      key: "4",
      label: "Moisture %",
      children: (
        <>
          <ResponsiveContainer width="50%" height={300}>
            <BarChart
              data={transformedMoisture()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" barSize={50}>
                <LabelList dataKey="value" position="bottom" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "PRODUCT DETAILS",
      children: (
        <>
          <table>
            <tr>
              <td style={{ padding: "0.5rem" }} colSpan={3}>
                Date:
                <span style={{ margin: "0.5rem" }}>
                  {slashFormatDate(formData.date)}
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Product Name:</td>
              <td>
                <Input
                  name="productName"
                  onChange={handleChange}
                  value={formData.productName}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="productNameA"
                  onChange={handleChange}
                  value={formData.productNameA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Product Code:</td>
              <td>
                <Input
                  name="productCode"
                  onChange={handleChange}
                  value={formData.productCode}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="productCodeA"
                  onChange={handleChange}
                  value={formData.productCodeA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Shelf Life:</td>
              <td>
                <Input
                  name="shelfLife"
                  onChange={handleChange}
                  value={formData.shelfLife}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="shelfLifeA"
                  onChange={handleChange}
                  value={formData.shelfLifeA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Pack Size:</td>
              <td>
                <Input
                  name="packSize"
                  onChange={handleChange}
                  value={formData.packSize}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="packSizeA"
                  onChange={handleChange}
                  value={formData.packSizeA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>
                No. Of Batches:
              </td>
              <td>
                <Input
                  name="noOfBatches"
                  onChange={handleChange}
                  value={formData.noOfBatches}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="noOfBatchesA"
                  onChange={handleChange}
                  value={formData.noOfBatchesA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>
                Review Period:
              </td>
              <td>
                <Input
                  name="reviewPeriod"
                  onChange={handleChange}
                  value={formData.reviewPeriod}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="reviewPeriodA"
                  onChange={handleChange}
                  value={formData.reviewPeriodA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Prepared By:</td>
              <td>
                <Input
                  name="preparedBy"
                  onChange={handleChange}
                  value={formData.preparedBy}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="preparedByA"
                  onChange={handleChange}
                  value={formData.preparedByA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Date:</td>
              <td>
                <input
                  name="preparedDate"
                  type="date"
                  onChange={handleChange}
                  value={formData.preparedDate}
                  disabled={isFieldsDisabled}
                  max={today}
                />
              </td>
              <td>
                <input
                  name="preparedDateA"
                  type="date"
                  onChange={handleChange}
                  value={formData.preparedDateA}
                  disabled={isFieldsDisabled}
                  max={today}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Reviewed By:</td>
              <td>
                <Input
                  name="reviewedBy"
                  onChange={handleChange}
                  value={formData.reviewedBy}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="reviewedByA"
                  onChange={handleChange}
                  value={formData.reviewedByA}
                  disabled={isFieldsDisabled}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Date:</td>
              <td>
                <input
                  name="reviewdDate"
                  type="date"
                  onChange={handleChange}
                  value={formData.reviewdDate}
                  disabled={isFieldsDisabled}
                  max={today}
                />
              </td>
              <td>
                <input
                  name="reviewdDateA"
                  type="date"
                  onChange={handleChange}
                  value={formData.reviewdDateA}
                  disabled={isFieldsDisabled}
                  max={today}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Approved By:</td>
              <td>
                <Input
                  name="approvedBy"
                  onChange={handleChange}
                  value={formData.approvedBy}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td>
                <Input
                  name="approvedByA"
                  onChange={handleChange}
                  value={formData.approvedByA}
                  disabled={isFieldsDisabled}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem", width: "10%" }}>Date:</td>
              <td>
                <input
                  name="approvedDate"
                  type="date"
                  onChange={handleChange}
                  value={formData.approvedDate}
                  disabled={isFieldsDisabled}
                  max={today}
                />
              </td>
              <td>
                <input
                  name="approvedDateA"
                  type="date"
                  onChange={handleChange}
                  value={formData.approvedDateA}
                  disabled={isFieldsDisabled}
                  max={today}
                />
              </td>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: "2",
      label: "PARTICULARS",
      children: (
        <div style={{ display: "flex" }}>
          <div style={{ width: "60%" }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>S. No</th>
                  <th style={{ padding: "0.3rem" }}>Particulars</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ padding: "0.3rem" }}>Objectives</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>2</td>
                  <td style={{ padding: "0.3rem" }}>Introduction</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>3</td>
                  <td style={{ padding: "0.3rem" }}>Raw Materials details</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>4</td>
                  <td style={{ padding: "0.3rem" }}>
                    Packing Materials details
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>5</td>
                  <td style={{ padding: "0.3rem" }}>
                    Review Of Critical In Process Controls And Finished Product
                    Results
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>6</td>
                  <td style={{ padding: "0.3rem" }}>
                    Review Of All Failed Batches (OOS)
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>7</td>
                  <td style={{ padding: "0.3rem" }}>
                    Review of Deviation & CAPA
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>8</td>
                  <td style={{ padding: "0.3rem" }}>
                    Review of Change Control
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>9</td>
                  <td style={{ padding: "0.3rem" }}>
                    Review of analytical method
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>10</td>
                  <td style={{ padding: "0.3rem" }}>
                    Control sample Monitoring
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>11</td>
                  <td style={{ padding: "0.3rem" }}>
                    Complaints and Product Recalls
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>12</td>
                  <td style={{ padding: "0.3rem" }}>
                    Qualification Status of Equipment and Utilities
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>13</td>
                  <td style={{ padding: "0.3rem" }}>Summary & Conclusion</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>14</td>
                  <td style={{ padding: "0.3rem" }}>Recommendations</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ width: "40%" }}>
            <p style={{ fontSize: "1rem" }}>
              <b>1. OBJECTIVE:</b>
            </p>
            <p style={{ marginLeft: "3rem" }}>
              The objective of the product quality review is a comprehensive
              review of all the Critical in process parameters, production,
              analytical, complaints, changes, deviation, recalls and customer
              data associated with the product so as to monitor the drug product
              quality and improve where necessary.
            </p>
            <br></br>
            <p style={{ fontSize: "1rem" }}>
              <b>2. INTRODUCTION:</b>
            </p>
            <p style={{ marginLeft: "3rem" }}>
              A comprehensive review of all batches manufactured, which includes
              deviations, investigations, trend analysis of the test results of
              starting materials, in-process parameters and finished products,
              change control, investigation into OOS, environmental monitoring
              data and market complaints, reprocess, recall etc., with an
              objective mentioned above.
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "SUMMARY",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0.2rem" }}>S. No.</th>
                <th style={{ padding: "0.2rem" }}>Particulars</th>
                <th style={{ padding: "0.2rem" }}>No. of Total Batches/Lots</th>
                <th style={{ padding: "0.2rem" }}>Accepted</th>
                <th style={{ padding: "0.2rem" }}>Rejected</th>
                <th style={{ padding: "0.2rem" }} colSpan={2}>
                  Remark
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.summaryline1.map((eachLine, index) => (
                <tr>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    {eachLine.particulars}
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "noOfTotalLots",
                          "summaryline1"
                        )
                      }
                      value={eachLine.noOfTotalLots}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(e, index, "accepted", "summaryline1")
                      }
                      value={eachLine.accepted}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(e, index, "rejected", "summaryline1")
                      }
                      value={eachLine.rejected}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td colSpan={2}>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "summaryRemarks",
                          "summaryline1"
                        )
                      }
                      value={eachLine.summaryRemarks}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td style={{ textAlign: "center" }}>8</td>
                <td style={{ textAlign: "center" }}>Parameters/Values</td>
                <td style={{ padding: "0.2rem", textAlign: "center" }}>
                  Maximum Value
                </td>
                <td style={{ padding: "0.2rem", textAlign: "center" }}>
                  Minimum Value
                </td>
                <td style={{ padding: "0.2rem", textAlign: "center" }}>
                  Average
                </td>
                <td style={{ padding: "0.2rem", textAlign: "center" }}>STD</td>
                <td style={{ padding: "0.2rem", textAlign: "center" }}>CPK</td>
              </tr>

              <tr>
                <td style={{ textAlign: "center" }}>(i)</td>
                <td style={{ textAlign: "center" }}>
                  {formData.summaryparametersline1[0].parameterValues}
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        0,
                        "maximumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[0].maximumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        0,
                        "minimumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[0].minimumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        0,
                        "average",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[0].average}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 0, "std", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[0].std}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 0, "cpk", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[0].cpk}
                    onKeyDown={handleKeyDown}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>(ii)</td>
                <td style={{ textAlign: "center" }}>Whiteness Indices</td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        1,
                        "maximumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[1].maximumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        1,
                        "minimumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[1].minimumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        1,
                        "average",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[1].average}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 1, "std", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[1].std}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 1, "cpk", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[1].cpk}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>(iii)</td>
                <td style={{ textAlign: "center" }}>Sinking time (Sec.)</td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        2,
                        "maximumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[2].maximumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        2,
                        "minimumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[2].minimumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        2,
                        "average",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[2].average}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 2, "std", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[2].std}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 2, "cpk", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[2].cpk}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>(iv)</td>
                <td style={{ textAlign: "center" }}>Absorption Capacity</td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        3,
                        "maximumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[3].maximumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        3,
                        "minimumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[3].minimumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        3,
                        "average",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[3].average}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 3, "std", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[3].std}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 3, "cpk", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[3].cpk}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>(v)</td>
                <td style={{ textAlign: "center" }}>Moisture content</td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        4,
                        "maximumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[4].maximumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        4,
                        "minimumValue",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[4].minimumValue}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        4,
                        "average",
                        "summaryparametersline1"
                      )
                    }
                    value={formData.summaryparametersline1[4].average}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 4, "std", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[4].std}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td>
                  <Input
                    onChange={(e) =>
                      handleArrayChange(e, 4, "cpk", "summaryparametersline1")
                    }
                    value={formData.summaryparametersline1[4].cpk}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      key: "5",
      label: "RAW MATERIALS DETAILS",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>RM Code</th>
                <th style={{ padding: "0.5rem" }}>Name of Material</th>
                <th style={{ padding: "0.5rem" }}>Supplier</th>
                <th style={{ padding: "0.5rem" }}>Manufacturer</th>
                <th style={{ padding: "0.5rem" }}>No. of Lots/ Batch</th>
                <th style={{ padding: "0.5rem" }}>Rejected</th>
                <th style={{ padding: "0.5rem" }}>Approved</th>
              </tr>
            </thead>
            <tbody>
              {formData.rawmaterialsdetailsline2.map((rawmaterial, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={rawmaterial.selected}
                      onChange={(e) =>
                        handleCheckBoxChange(index, "rawmaterialsdetailsline2")
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {index + 1}
                  </td>

                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "rmCode",
                          "rawmaterialsdetailsline2"
                        )
                      }
                      value={rawmaterial.rmCode}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "nameOfMaterialRaw",
                          "rawmaterialsdetailsline2"
                        )
                      }
                      value={rawmaterial.nameOfMaterialRaw}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "supplierRaw",
                          "rawmaterialsdetailsline2"
                        )
                      }
                      value={rawmaterial.supplierRaw}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "manufacturerRaw",
                          "rawmaterialsdetailsline2"
                        )
                      }
                      value={rawmaterial.manufacturerRaw}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "noOfLotsRaw",
                          "rawmaterialsdetailsline2"
                        )
                      }
                      value={rawmaterial.noOfLotsRaw}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "rejectedRaw",
                          "rawmaterialsdetailsline2"
                        )
                      }
                      value={rawmaterial.rejectedRaw}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "approvedRaw",
                          "rawmaterialsdetailsline2"
                        )
                      }
                      value={rawmaterial.approvedRaw}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={addRow}
              style={{ margin: "0.5rem", display: isSubmitButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSubmitButton }}
              onClick={() => deleteSelectedRows("rawmaterialsdetailsline2")}
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "6",
      label: "PACKING MATERIALS DETAILS",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>PM Code</th>
                <th style={{ padding: "0.5rem" }}>Name of Material</th>

                <th style={{ padding: "0.5rem" }}>Manufacturer Name</th>
                <th style={{ padding: "0.5rem" }}>Supplier Name</th>
                <th style={{ padding: "0.5rem" }}>Number of Lots/Batch</th>
                <th style={{ padding: "0.5rem" }}>Rejected</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              {formData.packingmaterialdetailsline3.map(
                (packingMaterial, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={packingMaterial.selected}
                        onChange={(e) =>
                          handleCheckBoxChange(
                            index,
                            "packingmaterialdetailsline3"
                          )
                        }
                        disabled={isFieldsDisabled}
                      />
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "pmCode",
                            "packingmaterialdetailsline3"
                          )
                        }
                        value={packingMaterial.pmCode}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "nameOfMaterialPack",
                            "packingmaterialdetailsline3"
                          )
                        }
                        value={packingMaterial.nameOfMaterialPack}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "manufacturerPack",
                            "packingmaterialdetailsline3"
                          )
                        }
                        value={packingMaterial.manufacturerPack}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "supplierPack",
                            "packingmaterialdetailsline3"
                          )
                        }
                        value={packingMaterial.supplierPack}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "noOfLotsPack",
                            "packingmaterialdetailsline3"
                          )
                        }
                        value={packingMaterial.noOfLotsPack}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "rejectedPack",
                            "packingmaterialdetailsline3"
                          )
                        }
                        value={packingMaterial.rejectedPack}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "approvedPack",
                            "packingmaterialdetailsline3"
                          )
                        }
                        value={packingMaterial.approvedPack}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={packingAddRow}
              style={{ margin: "0.5rem", display: isSubmitButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSubmitButton }}
              onClick={() => deleteSelectedRows("packingmaterialdetailsline3")}
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "7",
      label: "LIST OF EQUIPMENT AND QUALIFICATION",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>Utility/ Equipment</th>
                <th style={{ padding: "0.5rem" }}>Equipment No.</th>

                <th style={{ padding: "0.5rem" }}>Qualification Done Date</th>
                <th style={{ padding: "0.5rem" }}>Qualification Due Date</th>
                <th style={{ padding: "0.5rem" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.listofequipmentandqualificationline4.map(
                (data, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={data.selected}
                        onChange={(e) =>
                          handleCheckBoxChange(
                            index,
                            "listofequipmentandqualificationline4"
                          )
                        }
                        disabled={isFieldsDisabled}
                      />
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "utility",
                            "listofequipmentandqualificationline4"
                          )
                        }
                        value={data.utility}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "equipmentNo",
                            "listofequipmentandqualificationline4"
                          )
                        }
                        value={data.equipmentNo}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "qualificationDoneDate",
                            "listofequipmentandqualificationline4"
                          )
                        }
                        value={data.qualificationDoneDate}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "0.4rem",
                        }}
                        disabled={isFieldsDisabled}
                        max={today}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "qualificationDueDate",
                            "listofequipmentandqualificationline4"
                          )
                        }
                        value={data.qualificationDueDate}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "0.4rem",
                        }}
                        disabled={isFieldsDisabled}
                        max={today}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "qualificationRemarks",
                            "listofequipmentandqualificationline4"
                          )
                        }
                        value={data.qualificationRemarks}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={listOfEquipAddRow}
              style={{ margin: "0.5rem", display: isSubmitButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSubmitButton }}
              onClick={() =>
                deleteSelectedRows("listofequipmentandqualificationline4")
              }
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "8",
      label: "REVIEW OF CRITICAL PARAMETER CHECKS OF",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>Product Code</th>
                <th style={{ padding: "0.5rem" }}>Total Order No.</th>

                <th style={{ padding: "0.5rem" }}>No of lots tested</th>
                <th style={{ padding: "0.5rem" }}>
                  Product Dimension +/-10%(mm)
                </th>
                <th style={{ padding: "0.5rem" }}>Whiteness Index ≥ 80</th>
                <th style={{ padding: "0.5rem" }}>Sinking time (Sec.) ≤ 10</th>
                <th style={{ padding: "0.5rem" }}>
                  Absorption Capacity ≥ 23 (g/g)
                </th>
                <th style={{ padding: "0.5rem" }}>Moisture content (%)≤ 8</th>
                <th style={{ padding: "0.5rem" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.reviewofcriticalparameterchecksofline5.map(
                (data, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={data.selected}
                        onChange={(e) =>
                          handleCheckBoxChange(
                            index,
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        disabled={isFieldsDisabled}
                      />
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "reviewProductCode",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.reviewProductCode}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "totalOrderNo",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.totalOrderNo}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "noOfLotsTested",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.noOfLotsTested}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "productDimension",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.productDimension}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleDecimalNumberKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "whiteness",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.whiteness}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleDecimalNumberKeyDown}
                        min={80}
                        onBlur={(e) => handleOnWhitenessBlur(e, index)}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "sinkingTime",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.sinkingTime}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleDecimalNumberKeyDown}
                        onBlur={(e) => handleOnSinkingTimeBlur(e, index)}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "absorptionCapacity",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.absorptionCapacity}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleDecimalNumberKeyDown}
                        onBlur={(e) => handleAbsorptionCapBlur(e, index)}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "moisture",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.moisture}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleDecimalNumberKeyDown}
                        onBlur={(e) => handleMoistureCapBlur(e, index)}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "reviewRemarks",
                            "reviewofcriticalparameterchecksofline5"
                          )
                        }
                        value={data.reviewRemarks}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td colSpan={5} style={{ padding: "0.5rem" }}>
                  Maximum Value
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {productDimensionMaxcalculation()} */}
                  {productDimensionMax}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {whitenessMax}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {sinkingMaxCalculation()} */}
                  {sinkingMax}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {absorptionMaxCalculation()} */}
                  {absorptionMax}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {moistureMaxCalculation()} */}
                  {moistureMax}
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={5} style={{ padding: "0.5rem" }}>
                  Minimum Value
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {productDimensionMincalculation()} */}
                  {productDimensionMin}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {wihtenessMinCalculation()} */}
                  {whitenessMin}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {sinkingMinCalculation()} */}
                  {sinkingMin}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {absorptionMinCalculation()} */}
                  {absorptionMin}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {moistureMinCalculation()} */}
                  {moistureMin}
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={5} style={{ padding: "0.5rem" }}>
                  Average
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {productDimensionavgcalculation()} */}
                  {productDimensionAvg}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {wihtenessavgCalculation()} */}
                  {whitenessAvg}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {sinkingavgCalculation()} */}
                  {sinkingAvg}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {absorptionavgCalculation()} */}
                  {absorptionAvg}
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  {/* {moistureavgCalculation()} */}
                  {moistureAvg}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={criticalParamCheckAddRow}
              style={{ margin: "0.5rem", display: isSubmitButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSubmitButton }}
              onClick={() =>
                deleteSelectedRows("reviewofcriticalparameterchecksofline5")
              }
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "9",
      label: "GRAPHICAL REPRESENTATION OF ANALYTICAL DATA",
      children: (
        <>
          <Tabs items={graphItems} />
        </>
      ),
    },
    {
      key: "10",
      label: "REVIEW OF ALL NONCONFORMITY PRODUCT",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>Product/Process</th>
                <th style={{ padding: "0.5rem" }}>Reason for NC</th>

                <th style={{ padding: "0.5rem" }}>
                  Implication on Passed Batches
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.reviewofallnonconformityproductline6.map(
                (data, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={data.selected}
                        onChange={(e) =>
                          handleCheckBoxChange(
                            index,
                            "reviewofallnonconformityproductline6"
                          )
                        }
                        disabled={isFieldsDisabled}
                      />
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "product",
                            "reviewofallnonconformityproductline6"
                          )
                        }
                        value={data.product}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "reasonForNc",
                            "reviewofallnonconformityproductline6"
                          )
                        }
                        value={data.reasonForNc}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "implicationOnPassedBatches",
                            "reviewofallnonconformityproductline6"
                          )
                        }
                        value={data.implicationOnPassedBatches}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={reviewOfNCProductAddRow}
              style={{ margin: "0.5rem", display: isSubmitButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSubmitButton }}
              onClick={() =>
                deleteSelectedRows("reviewofallnonconformityproductline6")
              }
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "11",
      label: "REVIEW OF DEVIATION",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>Date / Deviation No.</th>
                <th style={{ padding: "0.5rem" }}>Details of deviation</th>

                <th style={{ padding: "0.5rem" }}>Root Cause</th>
                <th style={{ padding: "0.5rem" }}>CAPA</th>
                <th style={{ padding: "0.5rem" }}>Closure Date</th>

                <th style={{ padding: "0.5rem" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.reviewofdeviationline7.map((data, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={data.selected}
                      onChange={(e) =>
                        handleCheckBoxChange(index, "reviewofdeviationline7")
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {index + 1}
                  </td>

                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "dateOrDeviationNo",
                          "reviewofdeviationline7"
                        )
                      }
                      value={data.dateOrDeviationNo}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "detailsOfDeviation",
                          "reviewofdeviationline7"
                        )
                      }
                      value={data.detailsOfDeviation}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "rootCause",
                          "reviewofdeviationline7"
                        )
                      }
                      value={data.rootCause}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "capa",
                          "reviewofdeviationline7"
                        )
                      }
                      value={data.capa}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "closureDate",
                          "reviewofdeviationline7"
                        )
                      }
                      value={data.closureDate}
                      style={{ width: "100%", boxSizing: "border-box" }}
                      disabled={isFieldsDisabled}
                      max={today}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "deviationRemarks",
                          "reviewofdeviationline7"
                        )
                      }
                      value={data.deviationRemarks}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={reviewOfDeviationsAddRow}
              style={{ margin: "0.5rem", display: isSubmitButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSubmitButton }}
              onClick={() => deleteSelectedRows("reviewofdeviationline7")}
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "12",
      label: "REVIEW OF CHANGE CONTROL SYSTEM",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>Change Control Number</th>
                <th style={{ padding: "0.5rem" }}>Date Initiated</th>

                <th style={{ padding: "0.5rem" }}>
                  Description Proposed of Change
                </th>
                <th style={{ padding: "0.5rem" }}>Initiated Department</th>
                <th style={{ padding: "0.5rem" }}>Closure Date</th>
              </tr>
            </thead>
            <tbody>
              {formData.reviewofchangecontrolsystemline8.map((data, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={data.selected}
                      onChange={(e) =>
                        handleCheckBoxChange(
                          index,
                          "reviewofchangecontrolsystemline8"
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {index + 1}
                  </td>

                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "changeControlNumber",
                          "reviewofchangecontrolsystemline8"
                        )
                      }
                      value={data.changeControlNumber}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "dateInitiated",
                          "reviewofchangecontrolsystemline8"
                        )
                      }
                      value={data.dateInitiated}
                      disabled={isFieldsDisabled}
                      max={today}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "descriptionProposedOfChange",
                          "reviewofchangecontrolsystemline8"
                        )
                      }
                      value={data.descriptionProposedOfChange}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "initiatedDepartment",
                          "reviewofchangecontrolsystemline8"
                        )
                      }
                      value={data.initiatedDepartment}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "clouserDate",
                          "reviewofchangecontrolsystemline8"
                        )
                      }
                      value={data.clouserDate}
                      disabled={isFieldsDisabled}
                      max={today}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={reviewOfChangeControlsAddRow}
              style={{ margin: "0.5rem", display: isSubmitButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSubmitButton }}
              onClick={() =>
                deleteSelectedRows("reviewofchangecontrolsystemline8")
              }
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "13",
      label: "REVIEW OF COMPLAINTS",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No</th>

                <th style={{ padding: "0.5rem" }}>Date</th>
                <th style={{ padding: "0.5rem" }}>CAPA</th>
                <th style={{ padding: "0.5rem" }}>Description</th>

                <th style={{ padding: "0.5rem" }}>
                  Corrective action/ Preventive action
                </th>
                <th style={{ padding: "0.5rem" }}>Open/ Closed</th>
                <th style={{ padding: "0.5rem" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.complaintsrejectsandproductrecallsline9.map(
                (data, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={data.selected}
                        onChange={(e) =>
                          handleCheckBoxChange(
                            index,
                            "complaintsrejectsandproductrecallsline9"
                          )
                        }
                        disabled={isFieldsDisabled}
                      />
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td>
                      <input
                        type="date"
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "complaintDate",
                            "complaintsrejectsandproductrecallsline9"
                          )
                        }
                        value={data.complaintDate}
                        disabled={isFieldsDisabled}
                        max={today}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "complaintCapa",
                            "complaintsrejectsandproductrecallsline9"
                          )
                        }
                        value={data.complaintCapa}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "description",
                            "complaintsrejectsandproductrecallsline9"
                          )
                        }
                        value={data.description}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "correctiveOrPreventiveAction",
                            "complaintsrejectsandproductrecallsline9"
                          )
                        }
                        value={data.correctiveOrPreventiveAction}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                    <td>
                      <Select
                        onChange={(value) =>
                          handleSelectArrayChange(
                            value,
                            index,
                            "openOrClosed",
                            "complaintsrejectsandproductrecallsline9"
                          )
                        }
                        value={data.openOrClosed}
                        style={{ width: "100%" }}
                        disabled={isFieldsDisabled}
                      >
                        <Select.Option value="Open">Open</Select.Option>
                        <Select.Option value="Closed">Closed</Select.Option>
                        <Select.Option value="NA">NA</Select.Option>
                      </Select>
                    </td>
                    <td>
                      <Input
                        onChange={(e) =>
                          handleArrayChange(
                            e,
                            index,
                            "complaintRemarks",
                            "complaintsrejectsandproductrecallsline9"
                          )
                        }
                        value={data.complaintRemarks}
                        disabled={isFieldsDisabled}
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={reviewOfComplaintsAddRow}
              style={{ margin: "0.5rem", display: isSaveButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSaveButton }}
              onClick={() =>
                deleteSelectedRows("complaintsrejectsandproductrecallsline9")
              }
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "14",
      label: "REVIEW OF PRODUCT RECALLS",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "1rem" }}></th>
                <th style={{ padding: "0.5rem" }}>S. No.</th>
                <th style={{ padding: "0.5rem" }}>Recall No.</th>
                <th style={{ padding: "0.5rem" }}>Date</th>
                <th style={{ padding: "0.5rem" }}>Batch No.</th>
                <th style={{ padding: "0.5rem" }}>Reason for recall</th>
                <th style={{ padding: "0.5rem" }}>Investigation summary</th>
                <th style={{ padding: "0.5rem" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formData.reviewofproductrecallline10.map((data, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={data.selected}
                      onChange={(e) =>
                        handleCheckBoxChange(
                          index,
                          "reviewofproductrecallline10"
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {index + 1}
                  </td>

                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "recallNo",
                          "reviewofproductrecallline10"
                        )
                      }
                      value={data.recallNo}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "recallDate",
                          "reviewofproductrecallline10"
                        )
                      }
                      value={data.recallDate}
                      disabled={isFieldsDisabled}
                      max={today}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "batchNo",
                          "reviewofproductrecallline10"
                        )
                      }
                      value={data.batchNo}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "reasonForRecall",
                          "reviewofproductrecallline10"
                        )
                      }
                      value={data.reasonForRecall}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "investigationSummary",
                          "reviewofproductrecallline10"
                        )
                      }
                      value={data.investigationSummary}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={(e) =>
                        handleArrayChange(
                          e,
                          index,
                          "recallRemarks",
                          "reviewofproductrecallline10"
                        )
                      }
                      value={data.recallRemarks}
                      disabled={isFieldsDisabled}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ margin: "1rem", display: "flex" }}>
            <Button
              onClick={reviewOfProductRecallsAddRow}
              style={{ margin: "0.5rem", display: isSaveButton }}
            >
              Add Row
            </Button>
            <Button
              style={{ margin: "0.5rem", display: isSaveButton }}
              onClick={() => deleteSelectedRows("reviewofproductrecallline10")}
            >
              Delete{" "}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "15",
      label: "RECOMMENDATIONS",
      children: (
        <>
          <table>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <Input
                    name="recommendations"
                    onChange={handleChange}
                    value={formData.recommendations}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  <div>Prepared By:</div>

                  <div>{formData.qaDesigneeSign}</div>
                  <div>{printDateFormat(formData.qaDesigneeSubmitOn)}</div>
                  <div>
                    {eSign.qaDesigneeSign ? (
                      <img
                        src={eSign.qaDesigneeSign}
                        alt="qaDesigneeSign"
                        style={{
                          width: "100px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </div>
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  <div>Approved By:</div>
                  {formData.qaManagerOrMrStatus !== "WAITING_FOR_APPROVAL" && (
                    <div>
                      <div>{formData.qaManagerOrMrSign}</div>
                      <div>
                        {printDateFormat(formData.qaManagerOrMrApprovedOn)}
                      </div>
                      <div>
                        {eSign.qaManagerOrMrSign ? (
                          <img
                            src={eSign.qaManagerOrMrSign}
                            alt="qaDesigneeSign"
                            style={{
                              width: "100px",
                              height: "50px",
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
            </tbody>
          </table>
        </>
      ),
    },
  ];

  const fetchDataBydate = () => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `${API.prodUrl}/Precot/api/qa/getdetailsbyParamAnnualProductReview?date=${formData.date}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.body.message !== "No data") {
          setFormData(response.data.body);
          navigateBack(response.data.body);
          validateHideButtons(response.data.body);
          validateDisableFields(response.data.body);
        } else {
          if (role === "QA_MANAGER" || role === "ROLE_MR") {
            message.warning("QA Designee is not submitted Yet!");
            navigate("/Precot/QA/F-028_summary");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchDataBydate();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["qaDesigneeSign", "qaManagerOrMrSign"];
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
  }, [formData]);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    axios
      .post(`${API.prodUrl}/Precot/api/qa/saveAnnualProductReview`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFormData(response.data);
        message.success("saved succesfully!");
        navigate("/Precot/QA/F-028_summary");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const errors = validateFormData();

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, error]) => {
        message.warning(error);
      });
      setIsLoading(false);
      return;
    }

    const updatedData = updateEmptyStringsToNA(formData, []);

    updatedData["reason"] = null;

    const token = localStorage.getItem("token");
    try {
      const response = axios.post(
        `${API.prodUrl}/Precot/api/qa/submitAnnualProductReview`,
        updatedData, // Ensure the payload is sent in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Submitted Successfully");
      setIsLoading(false);
      navigate("/Precot/QA/F-028_summary");
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Submit Form");
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qa/AnnualProductReview/approveOrReject`,
        {
          id: formData.id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setIsLoading(false);
        navigate("/Precot/QA/F-028_summary");
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {});
  };

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qa/AnnualProductReview/approveOrReject`,
        {
          id: formData.id,
          status: "Reject",
          remarks: rejectReason,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setIsLoading(false);
        navigate("/Precot/QA/F-028_summary");
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {});
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-028_summary");
  };

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="ANNUAL PRODUCT REVIEW"
        formatNo="PH-QAD01/F-028"
        sopNo="PH-QAD01-D-25"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        const
        buttonsArray={[
          role === "QA_MANAGER" || role === "ROLE_MR" ? (
            <>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isApprovalButtons,
                  // display: 'block',
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isApprovalButtons,
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={handleOpenRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSaveButton,
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSubmitButton,
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                // Clear role state
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
            loading={isLoading}
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

      <Tabs items={items} style={{ margin: "0.5rem" }} />
    </div>
  );
}
