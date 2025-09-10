/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { printDateFormat, slashFormatDate } from "../util/util.js";

const QA_F028_AnnualProductReview_Summary = () => {
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
    date: "",
  });
  const [selectedValue, setSelectedValue] = useState({
    date: "",
    month: "",
    year: "",
  });

  const initialized = useRef(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [summary, setSummaryData] = useState([]);
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [printDatas, setPrintDatas] = useState([
    {
      date: "",
      month: "",
      year: "",
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
          whiteness: "10",
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
    },
  ]);

  const transformedWhitenessIndex = (index) => {
    return printDatas[index].reviewofcriticalparameterchecksofline5.map(
      (data) => ({
        name: "",
        value: data.whiteness,
      })
    );
  };

  const transformedSinkingTime = (index) => {
    return printDatas[index].reviewofcriticalparameterchecksofline5.map(
      (data) => ({
        name: "",
        value: data.sinkingTime,
      })
    );
  };

  const transformedAbsorptionCapacity = (index) => {
    return printDatas[index].reviewofcriticalparameterchecksofline5.map(
      (data) => ({
        name: "",
        value: data.absorptionCapacity,
      })
    );
  };

  const transformedMoisture = (index) => {
    return printDatas[index].reviewofcriticalparameterchecksofline5.map(
      (data) => ({
        name: "",
        value: data.moisture,
      })
    );
  };

  const productDimensionMax = (index) =>
    Math.max(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.productDimension, 10) || 0
      )
    );

  const productDimensionMin = (index) =>
    Math.min(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.productDimension, 10) || 0
      )
    );

  const productDimensionAvg = (index) => {
    const items = printDatas[index].reviewofcriticalparameterchecksofline5;
    const totalDimension = items.reduce(
      (sum, item) => sum + (parseInt(item.productDimension, 10) || 0),
      0
    );
    return items.length > 0
      ? parseFloat((totalDimension / items.length).toFixed(3))
      : 0;
  };

  const whitenessMax = (index) =>
    Math.max(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.whiteness) || 0
      )
    );

  const whitenessMin = (index) =>
    Math.min(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.whiteness) || 0
      )
    );

  const whitenessAvg = (index) => {
    const items = printDatas[index].reviewofcriticalparameterchecksofline5;
    const totalWhiteness = items.reduce((sum, item) => {
      const value = parseFloat(item.whiteness);
      return value ? sum + value : sum;
    }, 0);
    return items.length > 0
      ? parseFloat((totalWhiteness / items.length).toFixed(3))
      : 0;
  };

  const sinkingMax = (index) =>
    Math.max(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.sinkingTime) || 0
      )
    );

  const sinkingMin = (index) =>
    Math.min(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.sinkingTime) || 0
      )
    );

  const sinkingAvg = (index) => {
    const items = printDatas[index].reviewofcriticalparameterchecksofline5;
    const totalSinkingTime = items.reduce((sum, item) => {
      const value = parseFloat(item.sinkingTime);
      return value ? sum + value : sum;
    }, 0);
    return items.length > 0
      ? parseFloat((totalSinkingTime / items.length).toFixed(3))
      : 0;
  };

  const absorptionMax = (index) =>
    Math.max(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.absorptionCapacity) || 0
      )
    );

  const absorptionMin = (index) =>
    Math.min(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.absorptionCapacity) || 0
      )
    );

  const absorptionAvg = (index) => {
    const items = printDatas[index].reviewofcriticalparameterchecksofline5;
    const totalAbsorptionCapacity = items.reduce((sum, item) => {
      const value = parseFloat(item.absorptionCapacity);
      return value ? sum + value : sum;
    }, 0);
    return items.length > 0
      ? parseFloat((totalAbsorptionCapacity / items.length).toFixed(3))
      : 0;
  };

  const moistureMax = (index) =>
    Math.max(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.moisture) || 0
      )
    );

  const moistureMin = (index) =>
    Math.min(
      ...printDatas[index].reviewofcriticalparameterchecksofline5.map(
        (item) => parseInt(item.moisture) || 0
      )
    );

  const moistureAvg = (index) => {
    const items = printDatas[index].reviewofcriticalparameterchecksofline5;
    const totalMoisture = items.reduce((sum, item) => {
      const value = parseFloat(item.moisture);
      return value ? sum + value : sum;
    }, 0);
    return items.length > 0
      ? parseFloat((totalMoisture / items.length).toFixed(3))
      : 0;
  };

  const [pickerType, setPickerType] = useState(null);

  const handleRadioChange = (e) => {
    setPickerType(e.target.value);
    setSelectedValue(null);
  };

  const handleDateChange = (value) => {
    let year, month, date;

    if (pickerType === "date") {
      // For the date picker, get the value as a string (YYYY-MM-DD)
      date = value.target.value;
      year = dayjs(date).year();
      month = dayjs(date).format("MMMM");
    } else {
      // For year and month pickers, use dayjs to format
      if (pickerType === "year") {
        year = value.year();
        month = "";
        date = "";
      } else if (pickerType === "month") {
        year = value.year();
        month = value.format("MMMM");
        date = "";
      }
    }

    setSelectedValue({ year, month, date });

    // Call the API with the selected values
  };

  const [eSign, setESign] = useState([
    {
      qaDesigneeSign: "",
      qaManagerOrMrSign: "",
    },
  ]);

  useEffect(() => {
    const signatureKeys = ["qaDesigneeSign", "qaManagerOrMrSign"];
    signatureKeys.forEach((key) => {
      if (printDatas && printDatas.length > 0) {
        printDatas.forEach((dataItem, index) => {
          let newSign = {}; // Create a new object for the current printData item

          signatureKeys.forEach((key) => {
            const username = dataItem[key];

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
                  newSign[key] = url;

                  setESign((prevSign) => {
                    const updatedSigns = [...prevSign];
                    updatedSigns[index] = {
                      ...updatedSigns[index],
                      ...newSign,
                    };
                    return updatedSigns;
                  });
                })
                .catch((err) => {});
            }
          });
        });
      }
    });
  }, [printDatas]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qa/getSummaryAnnualProductReview`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
          const hasReason = response.data.some(
            (item) => item.reason !== null && item.reason !== "NA"
          );

          setReason(hasReason);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => slashFormatDate(text),
    },

    {
      title: "QA Designee Status",
      dataIndex: "qaDesigneeStatus",
      key: "qaDesigneeStatus",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Manager Status",
      dataIndex: "qaManagerOrMrStatus",
      key: "qaManagerOrMrStatus",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              navigate("/Precot/QA/F-028", {
                state: {
                  date: record.date,
                },
              })
            }
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;

  if (reason) {
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }

  const showDrawer = () => {
    setOpen(true);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGo = () => {
    if (formParams.date == "") {
      message.warning("Please Select the Date");
      return;
    }

    navigate("/Precot/QA/F-028", {
      state: {
        date: formParams.date,
      },
    });
  };

  const handlePrint = async () => {
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/getdetailsForPrintAnnualProductReview?year=${selectedValue["year"]}&month=${selectedValue["month"]}&date=${selectedValue["date"]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.body.message === "No data") {
        message.warning("No Data Available To Print");
        setPrintButtonLoading(false);
        return;
      }

      setPrintDatas(response.data.body);

      setTimeout(() => {
        setPrintButtonLoading(false);
        window.print();
      }, 1000);
    } catch (error) {
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  const handlePrintCancel = () => {
    setPrintParams({
      month: "",
      year: "",
      date: "",
    });
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  return (
    <div>
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

        {printDatas.map((printData, printDataIndex) => (
          <>
            <table>
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "30px" }}></td>
                </tr>

                <tr>
                  <th
                    colSpan="1"
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
                  <th colSpan="5" rowSpan="4" style={{ textAlign: "center" }}>
                    {"Annual Product Review"}
                  </th>
                  <th colSpan={2}>Format No.:</th>
                  <th colSpan={2}>PH-QAD01/F-028</th>
                </tr>
                <tr>
                  <th colSpan={2}>Revision No.:</th>
                  <th colSpan={2}>01</th>
                </tr>
                <tr>
                  <th colSpan={2}>Ref. SOP No.:</th>
                  <th colSpan={2}>PH-QAD01-D-25</th>
                </tr>
                <tr>
                  <th colSpan={2}>Page No.:</th>
                  <th colSpan={2}> </th>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", border: "none" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={10}>
                    Date:{slashFormatDate(printData.date)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Product Name:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.productName}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.productNameA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Product Code:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.productCode}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.productCodeA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Shelf Life:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.shelfLife}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.shelfLifeA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Pack Size:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.packSize}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.packSizeA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    No. Of Batches:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.noOfBatches}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.noOfBatchesA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Review Period:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.reviewPeriod}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.reviewPeriodA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Prepared By:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.preparedBy}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.preparedByA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Date:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {slashFormatDate(printData.preparedDate)}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {slashFormatDate(printData.preparedDateA)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Reviewed By:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.reviewedBy}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.reviewedByA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Date:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {slashFormatDate(printData.reviewdDate)}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {slashFormatDate(printData.reviewdDateA)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Approved By:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.approvedBy}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {printData.approvedByA}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }} colSpan={2}>
                    Date:
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {slashFormatDate(printData.approvedDate)}
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={4}>
                    {slashFormatDate(printData.approvedDateA)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>

                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No
                  </td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Particulars
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>1</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Objectives
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>2</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Introduction
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>3</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Raw Materials details
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>4</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Packing Materials details
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>5</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Review Of Critical In Process Controls And Finished Product
                    Results
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>6</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Review Of All Failed Batches (OOS)
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>7</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Review of Deviation & CAPA
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>8</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Review of Change Control
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>9</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Review of analytical method
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>10</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Control sample Monitoring
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>11</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Complaints and Product Recalls
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>12</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Qualification Status of Equipment and Utilities
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>13</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Summary & Conclusion
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>14</td>
                  <td style={{ padding: "0.5rem" }} colSpan={9}>
                    Recommendations
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>1. OBJECTIVE:</b>
                    </p>
                    <p style={{ margin: "0 2rem" }}>
                      {" "}
                      The objective of the product quality review is a
                      comprehensive review of all the Critical in process
                      parameters, production, analytical, complaints, changes,
                      deviation, recalls and customer data associated with the
                      product so as to monitor the drug product quality and
                      improve where necessary
                    </p>
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>2. INTRODUCTION:</b>
                    </p>
                    <p style={{ margin: "0 2rem" }}>
                      {" "}
                      A comprehensive review of all batches manufactured, which
                      includes deviations, investigations, trend analysis of the
                      test results of starting materials, in-process parameters
                      and finished products, change control, investigation into
                      OOS, environmental monitoring data and market complaints,
                      reprocess, recall etc., with an objective mentioned above.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}>
                    <p>
                      <b>3. Summary:</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={3}
                  >
                    Particulars
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    No. of Total Batches/Lots
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Accepted
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Rejected
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Remark
                  </td>
                </tr>
                {printData.summaryline1.map((eachLine, index) => (
                  <tr>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td
                      style={{ padding: "0.5rem", textAlign: "center" }}
                      colSpan={3}
                    >
                      {eachLine.particulars}
                    </td>
                    <td
                      style={{ padding: "0.5rem", textAlign: "center" }}
                      colSpan={2}
                    >
                      {eachLine.noOfTotalLots}
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {eachLine.accepted}
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {eachLine.rejected}
                    </td>
                    <td
                      colSpan={2}
                      style={{ padding: "0.5rem", textAlign: "center" }}
                    >
                      {eachLine.summaryRemarks}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ textAlign: "center" }}>8</td>
                  <td style={{ textAlign: "center" }} colSpan={3}>
                    Parameters/Values
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Maximum Value
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Minimum Value
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Average
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    STD
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    CPK
                  </td>
                </tr>

                <tr>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    (i)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={3}
                  >
                    {printData.summaryparametersline1[0].parameterValues}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    {printData.summaryparametersline1[0].maximumValue}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[0].minimumValue}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[0].average}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[0].std}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[0].cpk}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    (ii)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={3}
                  >
                    {printData.summaryparametersline1[1].parameterValues}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    {printData.summaryparametersline1[1].maximumValue}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[1].minimumValue}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[1].average}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[1].std}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.summaryparametersline1[1].cpk}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    (iii)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={3}
                  >
                    {printData.summaryparametersline1[2].parameterValues}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={2}
                  >
                    {printData.summaryparametersline1[2].maximumValue}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[2].minimumValue}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[2].average}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[2].std}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[2].cpk}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    (iv)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={3}
                  >
                    {printData.summaryparametersline1[3].parameterValues}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={2}
                  >
                    {printData.summaryparametersline1[3].maximumValue}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[3].minimumValue}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[3].average}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[3].std}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[3].cpk}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    (v)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={3}
                  >
                    {printData.summaryparametersline1[4].parameterValues}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "0.5rem" }}
                    colSpan={2}
                  >
                    {printData.summaryparametersline1[4].maximumValue}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[4].minimumValue}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[4].average}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[4].std}
                  </td>
                  <td style={{ textAlign: "center", padding: "0.5rem" }}>
                    {printData.summaryparametersline1[4].cpk}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>4. RAW MATERIALS DETAILS:</b>
                    </p>
                  </td>
                </tr>

                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    RM Code
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={3}
                  >
                    Name of Material
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Supplier
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Manufacturer
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    No. of Lots/ Batch
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Rejected
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Approved
                  </th>
                </tr>
                {printData.rawmaterialsdetailsline2.map(
                  (rawmaterial, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {rawmaterial.rmCode}
                      </td>
                      <td
                        style={{ padding: "0.5rem", textAlign: "center" }}
                        colSpan={3}
                      >
                        {rawmaterial.nameOfMaterialRaw}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {rawmaterial.supplierRaw}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {rawmaterial.manufacturerRaw}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {rawmaterial.noOfLotsRaw}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {rawmaterial.rejectedRaw}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {rawmaterial.approvedRaw}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>5. PACKING MATERIALS DETAILS:</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    PM Code
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Name of Material
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Manufacturer Name
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Supplier Name
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Number of Lots/Batch
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Rejected
                  </th>
                  <th>Approved</th>
                </tr>
                {printData.packingmaterialdetailsline3.map(
                  (packingMaterial, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {packingMaterial.pmCode}
                      </td>
                      <td
                        style={{ padding: "0.5rem", textAlign: "center" }}
                        colSpan={2}
                      >
                        {packingMaterial.nameOfMaterialPack}
                      </td>
                      <td
                        style={{ padding: "0.5rem", textAlign: "center" }}
                        colSpan={2}
                      >
                        {packingMaterial.manufacturerPack}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {packingMaterial.supplierPack}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {packingMaterial.noOfLotsPack}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {packingMaterial.rejectedPack}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {packingMaterial.approvedPack}
                      </td>
                    </tr>
                  )
                )}

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>6. LIST OF EQUIPMENT AND QUALIFICATION:</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Utility/ Equipment
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Equipment No.
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Qualification Done Date
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Qualification Due Date
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Remarks
                  </th>
                </tr>

                {printData.listofequipmentandqualificationline4.map(
                  (data, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        {data.utility}
                      </td>
                      <td style={{ textAlign: "center", padding: "0.5rem" }}>
                        {data.equipmentNo}
                      </td>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        {slashFormatDate(data.qualificationDoneDate)}
                      </td>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        {slashFormatDate(data.qualificationDueDate)}
                      </td>
                      <td
                        style={{ textAlign: "center", padding: "0.5rem" }}
                        colSpan={2}
                      >
                        {data.qualificationRemarks}
                      </td>
                    </tr>
                  )
                )}

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>7. REVIEW OF CRITICAL PARAMETER CHECKS OF:</b>
                    </p>
                  </td>
                </tr>

                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Product Code
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Total Order No.
                  </th>

                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    No of lots tested
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Product Dimension +/-10%(mm)
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Whiteness Index ≥ 80
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Sinking time (Sec.) ≤ 10
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Absorption Capacity ≥ 23 (g/g)
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Moisture content (%)≤ 8
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Remarks
                  </th>
                </tr>

                {printData.reviewofcriticalparameterchecksofline5.map(
                  (data, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.reviewProductCode}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.totalOrderNo}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.noOfLotsTested}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.productDimension}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.whiteness}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.sinkingTime}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.absorptionCapacity}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.moisture}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.reviewRemarks}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Maximum Value
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {productDimensionMax(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {whitenessMax(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {sinkingMax(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {absorptionMax(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {moistureMax(printDataIndex)}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Minimum Value
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {productDimensionMin(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {whitenessMin(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {sinkingMin(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {absorptionMin(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {moistureMin(printDataIndex)}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Average
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {productDimensionAvg(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {whitenessAvg(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {sinkingAvg(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {absorptionAvg(printDataIndex)}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {moistureAvg(printDataIndex)}
                  </td>
                  <td></td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>Graphical Representations of Analytical data: </b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>7.1 Product testing - Whiteness Index (WI) </b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={10} style={{ border: "none" }}> 
                    <BarChart
                      data={transformedWhitenessIndex(printDataIndex)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      width={500}
                      height={300}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976d2" barSize={50}>
                        <LabelList dataKey="value" position="bottom" />
                      </Bar>
                    </BarChart>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>7.2 Product testing Average Sinking time (S) </b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={10} style={{ border: "none" }}>
                    <BarChart
                      data={transformedSinkingTime(printDataIndex)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      width={500}
                      height={300}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976d2" barSize={50}>
                        <LabelList dataKey="value" position="bottom" />
                      </Bar>
                    </BarChart>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>7.3 Product testing average Absorption Capacity </b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={10} style={{ border: "none" }}>
                    <BarChart
                      data={transformedAbsorptionCapacity(printDataIndex)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      width={500}
                      height={300}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976d2" barSize={50}>
                        <LabelList dataKey="value" position="bottom" />
                      </Bar>
                    </BarChart>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>7.4 Product testing average Moisture % </b>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan={10} style={{ border: "none" }}>
                    <BarChart
                      data={transformedMoisture(printDataIndex)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      width={500}
                      height={300}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976d2" barSize={50}>
                        <LabelList dataKey="value" position="bottom" />
                      </Bar>
                    </BarChart>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>8. REVIEW OF ALL NONCONFORMITY PRODUCT:</b>
                    </p>
                  </td>
                </tr>

                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={3}
                  >
                    Product/Process
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={3}
                  >
                    Reason for NC
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={3}
                  >
                    Implication on Passed Batches
                  </th>
                </tr>

                {printData.reviewofallnonconformityproductline6.map(
                  (data, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td colSpan={3} style={{ textAlign: "center" }}>
                        {data.product}
                      </td>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        {data.reasonForNc}
                      </td>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        {data.implicationOnPassedBatches}
                      </td>
                    </tr>
                  )
                )}

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>9. REVIEW OF DEVIATION:</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Date / Deviation No.
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Details of deviation
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Root Cause
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    CAPA
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Closure Date
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Remarks
                  </th>
                </tr>
                {printData.reviewofdeviationline7.map((data, index) => (
                  <tr key={index}>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {data.dateOrDeviationNo}
                    </td>
                    <td
                      style={{ padding: "0.5rem", textAlign: "center" }}
                      colSpan={2}
                    >
                      {data.detailsOfDeviation}
                    </td>
                    <td
                      style={{ padding: "0.5rem", textAlign: "center" }}
                      colSpan={2}
                    >
                      {data.rootCause}
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {data.capa}
                    </td>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {slashFormatDate(data.closureDate)}
                    </td>
                    <td
                      colSpan={2}
                      style={{ padding: "0.5rem", textAlign: "center" }}
                    >
                      {data.deviationRemarks}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>10. REVIEW OF CHANGE CONTROL SYSTEM:</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Change Control Number
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Date Initiated
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={3}
                  >
                    Description Proposed of Change
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Initiated Department
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Closure Date
                  </th>
                </tr>
                {printData.reviewofchangecontrolsystemline8.map(
                  (data, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.changeControlNumber}
                      </td>
                      <td
                        colSpan={2}
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        {slashFormatDate(data.dateInitiated)}
                      </td>
                      <td
                        colSpan={3}
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        {data.descriptionProposedOfChange}
                      </td>
                      <td
                        colSpan={2}
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        {data.initiatedDepartment}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {slashFormatDate(data.clouserDate)}
                      </td>
                    </tr>
                  )
                )}

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>11. COMPLAINTS, REJECTS AND PRODUCT RECALLS :</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }} colSpan={2}>
                    <p>
                      <b>Review of Complaints:</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No
                  </th>

                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Date
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    CAPA
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Description
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Corrective action/ Preventive action
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Open/ Closed
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Remarks
                  </th>
                </tr>
                {printData.complaintsrejectsandproductrecallsline9.map(
                  (data, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {slashFormatDate(data.complaintDate)}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.complaintCapa}
                      </td>
                      <td
                        style={{ padding: "0.5rem", textAlign: "center" }}
                        colSpan={2}
                      >
                        {data.description}
                      </td>
                      <td
                        style={{ padding: "0.5rem", textAlign: "center" }}
                        colSpan={2}
                      >
                        {data.correctiveOrPreventiveAction}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {data.openOrClosed}
                      </td>
                      <td
                        colSpan={2}
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        {data.complaintRemarks}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>Review of Product Recalls:</b>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    S. No.
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Recall No.
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Date
                  </th>

                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Batch No.
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Reason for recall
                  </th>
                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Investigation summary
                  </th>

                  <th
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={2}
                  >
                    Remarks
                  </th>
                </tr>
                {printData.reviewofproductrecallline10.map((data, index) => (
                  <tr key={index}>
                    <td style={{ padding: "0.5rem", textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td style={{ textAlign: "center", padding: "0.5rem" }}>
                      {data.recallNo}
                    </td>
                    <td style={{ textAlign: "center", padding: "0.5rem" }}>
                      {slashFormatDate(data.recallDate)}
                    </td>
                    <td style={{ textAlign: "center", padding: "0.5rem" }}>
                      {data.batchNo}
                    </td>
                    <td
                      style={{ textAlign: "center", padding: "0.5rem" }}
                      colSpan={2}
                    >
                      {data.reasonForRecall}
                    </td>
                    <td
                      style={{ textAlign: "center", padding: "0.5rem" }}
                      colSpan={2}
                    >
                      {data.investigationSummary}
                    </td>
                    <td
                      style={{ textAlign: "center", padding: "0.5rem" }}
                      colSpan={2}
                    >
                      {data.recallRemarks}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td
                    style={{ padding: "0.5rem", border: "none" }}
                    colSpan={10}
                  >
                    <p>
                      <b>12. RECOMMENDATIONS:</b>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan={10}
                    style={{ padding: "0.5rem", textAlign: "center" }}
                  >
                    {printData.recommendations}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={5}
                  >
                    <div>Prepared By:</div>

                    <div>{printData.qaDesigneeSign}</div>
                    <div>{printDateFormat(printData.qaDesigneeSubmitOn)}</div>
                    <div>
                      {eSign[printDataIndex]?.qaDesigneeSign ? (
                        <img
                          src={eSign[printDataIndex].qaDesigneeSign}
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
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    colSpan={5}
                  >
                    <div>Approved By:</div>
                    {printData.qaManagerOrMrStatus !==
                      "WAITING_FOR_APPROVAL" && (
                      <div>
                        <div>{printData.qaManagerOrMrSign}</div>
                        <div>
                          {printDateFormat(printData.qaManagerOrMrApprovedOn)}
                        </div>
                        <div>
                          {eSign[printDataIndex]?.qaManagerOrMrSign ? (
                            <img
                              src={eSign[printDataIndex].qaManagerOrMrSign}
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
              <tfoot>
                <tr>
                  <th style={{ padding: "0.5rem", border: "none" }}></th>
                </tr>
                <tr>
                  <th colSpan={1} style={{ padding: "0.5rem" }}>
                    Particulars
                  </th>
                  <th colSpan={3} style={{ padding: "0.5rem" }}>
                    Prepared By
                  </th>
                  <th colSpan={3} style={{ padding: "0.5rem" }}>
                    Reviewed By
                  </th>
                  <th colSpan={3} style={{ padding: "0.5rem" }}>
                    Approved By
                  </th>
                </tr>
                <tr>
                  <td colSpan={1} style={{ padding: "0.5rem" }}>
                    Name
                  </td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={1} style={{ padding: "0.5rem" }}>
                    Signature & Date
                  </td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
              </tfoot>
            </table>
          </>
        ))}
      </div>
      <BleachingHeader
        formName={"ANNUAL PRODUCT REVIEW"}
        formatNo={"PH-QAD01/F-028"}
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
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Date :
          </div>
          <Input
            type="date"
            max={today}
            onChange={(e) => {
              handleFormParams(e.target.value, "date");
            }}
            style={{ width: "150px", textAlign: "center" }}
          ></Input>

          <Button
            key="go"
            onClick={handleGo}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            type="primary"
          >
            Go To
          </Button>
        </div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={summary}
        />
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <Modal
          title="ANNUAL PRODUCT REVIEW (Print)"
          open={isModalPrint}
          onCancel={handlePrintCancel}
          width={380}
          destroyOnClose={true}
          footer={[
            <Button key="cancel" onClick={handlePrintCancel}>
              Cancel
            </Button>,
            <Button
              key="reject"
              type="primary"
              onClick={handlePrint}
              loading={printButtonLoading}
            >
              Print
            </Button>,
          ]}
        >
          <div>
            <h3>Select a Picker Type:</h3>
            <Radio.Group onChange={handleRadioChange} value={pickerType}>
              <Radio value="year">Year</Radio>
              <Radio value="month">Month</Radio>
              <Radio value="date">Date</Radio>
            </Radio.Group>

            {pickerType === "year" && (
              <DatePicker
                picker="year"
                placeholder="Select year"
                style={{ display: "block", marginTop: 16 }}
                onChange={handleDateChange}
              />
            )}

            {pickerType === "month" && (
              <DatePicker
                picker="month"
                placeholder="Select month"
                style={{ display: "block", marginTop: 16 }}
                onChange={handleDateChange}
              />
            )}

            {pickerType === "date" && (
              <input
                type="date"
                placeholder="Select date"
                style={{
                  display: "block",
                  marginTop: 16,
                  padding: "6px",
                  fontSize: "16px",
                }}
                onChange={handleDateChange}
              />
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F028_AnnualProductReview_Summary;
