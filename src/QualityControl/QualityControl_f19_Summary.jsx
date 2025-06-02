/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import { FaPrint } from "react-icons/fa6";
import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Row,
  Avatar,
  Col,
  Drawer,
  message,
  Form,
  Input,
  notification,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { createGlobalStyle } from "styled-components";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";
import { render } from "@testing-library/react";
import {
  printDateFormat,
  slashFormatDate,
  getFullMonthFromNumber,
} from "../util/util.js";

const { Option } = Select;

const QualityControl_f19_Summary = () => {
  const [invoiceNo, setInvoiceNo] = useState([]);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
    loadno: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
    date: "",
    loadno: "",
  });
  const initialized = useRef(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [summary, setSummaryData] = useState([]);
  const [batchnoprint, setbatchnoprint] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [printDatas, setPrintDatas] = useState([
    {
      formatNo: "F019",
      revisionNo: "02",
      formatName: "MEDIA PREPARATION & CONSUMPTION RECORD",
      refSopNo: "PH-QCL01-D-07",
      month: "",
      year: "",
      preparationDate: "",
      loadNo: "",
      scdaMediaWeight: "",
      scdaDistilledWater: "",
      scdaMediaQuantity: "",
      scdaPhOfMediaRequired: "",
      scdaPhMediaObserved: "",
      scdaNoOfPlates: "",
      scdaMediaPoured: "",
      scdaQuantityUsed: "",
      scdaRemainingQuantiy: null,
      scdaRemarks: "",
      scdaPreparedBy: "",
      scdaVerifiedBy: "",
      sdaMediaWeight: "",
      sdaDistilledWater: "",
      sdaMediaQuantity: "",
      sdaPhOfMediaRequired: "",
      sdaPhMediaObsereved: null,
      sdaNoOfPlates: "",
      sdaMediaPoured: "",
      sdaQuantityUsed: "",
      sdaRemainingQuantiy: null,
      sdaRemarks: "",
      sdaPreparedBy: "",
      sdaVerifiedBy: "",
      vrbaMediaWeight: "",
      vrbaDistilledWater: "",
      vrbaMediaQuantity: "",
      vrbaPhOfMediaRequired: "",
      vrbaPhMediaObsereved: null,
      vrbaNoOfPlates: "",
      vrbaMediaPoured: "",
      vrbaQuantityUsed: "",
      vrbaRemainingQuantiy: null,
      vrbaRemarks: "",
      vrbaPreparedBy: "",
      vrbaVerifiedBy: "",
      maccOnMediaWeight: "",
      maccOnDistilledWater: "",
      maccOnMediaQuantity: "",
      maccOnPhOfMediaRequired: "",
      maccOnPhMediaObsereved: null,
      maccOnNoOfPlates: "",
      maccOnMediaPoured: "",
      maccOnQuantityUsed: "",
      maccOnRemainingQuantiy: null,
      maccOnRemarks: "",
      maccOnPreparedBy: "",
      maccOnVerifiedBy: "",
      citricMediaWeight: "",
      citricDistilledWater: "",
      citricMediaQuantity: "",
      citricPhOfMediaRequired: "",
      citricPhMediaObsereved: null,
      citricNoOfPlates: "",
      citricMediaPoured: "",
      citricQuantityUsed: "",
      citricRemainingQuantiy: null,
      citricRemarks: "",
      citricPreparedBy: "",
      citricVerifiedBy: "",
      vjMediaWeight: "",
      vjDistilledWater: "",
      vjMediaQuantity: "",
      vjPhOfMediaRequired: "",
      vjPhMediaObsereved: null,
      vjNoOfPlates: "",
      vjMediaPoured: "",
      vjQuantityUsed: "",
      vjRemainingQuantiy: null,
      vjRemarks: "",
      vjPreparedBy: "",
      vjVerifiedBy: "",
      bgaMediaWeight: "",
      bgaDistilledWater: "",
      bgaMediaQuantity: "",
      bgaPhOfMediaRequired: "",
      bgaPhMediaObsereved: null,
      bgaNoOfPlates: "",
      bgaMediaPoured: "",
      bgaQuantityUsed: "",
      bgaRemainingQuantiy: null,
      bgaRemarks: "",
      bgaPreparedBy: "",
      bgaVerifiedBy: "",
      naclMediaWeight: "",
      naclDistilledWater: "",
      naclMediaQuantity: "",
      kh2po4MediaWeight: "",
      kh2po4DistilledWater: "",
      kh2po4MediaQuantity: "",
      peptoneWaterMediaWeight: "",
      peptoneWaterDistilledWater: "",
      peptoneWaterMediaQuantity: "",
      tween80MediaWeight: "",
      tween80DistilledWater: "",
      tween80MediaQuantity: "",
      bufferSolPhMediaRequired: "",
      bufferSolPhMediaObsereved: null,
      bufferSolNoOfPlates: "",
      bufferSolMediaPoured: "",
      bufferSolQuantityUsed: "",
      bufferSolRemainingQuantiy: null,
      bufferSolRemarks: "",
      bufferSolPreparedBy: "",
      bufferSolVerifiedBy: "",
      microbiologist_status: "",
      microbiologist_saved_on: null,
      microbiologist_saved_by: null,
      microbiologist_saved_id: null,
      microbiologist_submit_on: "",
      microbiologist_submit_by: "",
      microbiologist_submit_id: "",
      microbiologist_sign: "billa",
      manager_status: "",
      manager_submit_on: "",
      manager_submit_by: "",
      manager_submit_id: "",
      manager_sign: "geetha",
      reason: "",
      mail_status: "",
    },
  ]);

  const pageNoCount = printDatas.length * 3;
  let lastPageNo = 0;

  const [eSign, setESign] = useState([
    {
      microbiologist_sign: "",
      manager_sign: "",
    },
  ]);

  const [yearLov, setYearLov] = useState([]);
  const [monthLov, setMonthLov] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }
    const currentMonth = new Date().getMonth() + 1;
    const allMonths = [
      { value: "01", label: "JAN" },
      { value: "02", label: "FEB" },
      { value: "03", label: "MAR" },
      { value: "04", label: "APR" },
      { value: "05", label: "MAY" },
      { value: "06", label: "JUN" },
      { value: "07", label: "JUL" },
      { value: "08", label: "AUG" },
      { value: "09", label: "SEP" },
      { value: "10", label: "OCT" },
      { value: "11", label: "NOV" },
      { value: "12", label: "DEC" },
    ];

    const filteredMonthBasedOnYear = allMonths.filter(
      (month) => parseInt(month.value) <= currentMonth
    );
    const months =
      printParams.year == currentYear ? filteredMonthBasedOnYear : allMonths;
    setMonthLov(months);

    setYearLov(years);
  }, [formParams.year, formParams.month, printParams.year, printParams.month]);

  useEffect(() => {
    const signatureKeys = ["microbiologist_sign", "manager_sign"];
    signatureKeys.forEach((key) => {
      if (printDatas && printDatas.length > 0) {
        printDatas.forEach((dataItem, index) => {
          let newSign = {}; // Create a new object for the current printData item

          signatureKeys.forEach((key) => {
            const username = dataItem[key];

            if (username) {
              axios
                .get(
                  `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token,
                    },
                    responseType: "arraybuffer",
                  }
                )
                .then((res) => {
                  console.log("Response for item:", index, res.data);
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

                  console.log("esign on each iternation", eSign);
                })
                .catch((err) => {
                  console.log("Error in fetching image for item:", index, err);
                });
            }
          });
        });
      }
    });
  }, [printDatas]);

  useEffect(() => {
    const fetchDatamillbatch = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/chemicaltest/ARF004/PDE`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const options = response.data
          .filter((option) => option.invoice_no !== "")
          .map((option) => ({
            value: option.invoice_no,
            label: option.invoice_no,
          }));

        setInvoiceNo(options);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatamillbatch();
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${    API.prodUrl}/Precot/api/qc/MediaPreparationF019/GetAll`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summary) {
        if (
          data.qc_status == "QC_REJECTED" ||
          data.qc_status == "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Preparation date",
      dataIndex: "preparationDate",
      key: "preparationDate",
      align: "center",
      render: (text) => slashFormatDate(text),
    },
    {
      title: "Load No",
      dataIndex: "loadNo",
      key: "loadNo",
      align: "center",
    },
    {
      title: "Microbiologist Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
      align: "center",
      render: (text) => text || "NA",
    },
    {
      title: "Manager Status",
      dataIndex: "manager_status",
      key: "manager_status",
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
              navigate("/Precot/QualityControl/F-019", {
                state: {
                  date: record.preparationDate,
                  loadno: record.loadNo,
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

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGo = async () => {
    if (formParams.date == "" || formParams.loadno == "") {
      message.warning("Please Select The Date and Load No");
      return;
    }

    navigate("/Precot/QualityControl/F-019", {
      state: {
        date: formParams.date,
        loadno: formParams.loadno,
      },
    });
  };

  const handlePrint = async () => {
    if (
      printParams.year == "" &&
      printParams.month == "" &&
      printParams.date == "" &&
      printParams.loadno == ""
    ) {
      message.warning("Please Select atleast one field");
      return;
    }
    if (printParams.month !== "" && printParams.year == "") {
      message.warning("Please Select Year");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${
               API.prodUrl
        }/Precot/api/qc/MediaPreparationF019/GetByPreparationDateLoadNoMonthYear/print?year=${
          printParams.year
        }&month=${getFullMonthFromNumber(
          printParams.year,
          printParams.month
        )}&preparationDate=${printParams.date}&loadNo=${printParams.loadno}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.length == 0 ||
        response.data === "No data found for the provided parameters"
      ) {
        message.warning("No Data Available To Print");
        setPrintButtonLoading(false);
        return;
      }

      const validStatuses = [
        "QC_APPROVED",
        "QA_APPROVED",
        "MICRO_DESIGNEE_APPROVED",
      ];
      const canPrint = response.data.some((item) =>
        validStatuses.includes(item.manager_status)
      );

      if (!canPrint) {
        message.warning("Manager yet to Approve");
        setPrintButtonLoading(false);
        return;
      }

      setPrintDatas(response.data);

      setTimeout(() => {
        setPrintButtonLoading(false);
        window.print();
      }, 1000);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //     if (Object.keys(printData).length > 0) {
  //         setTimeout(() => {
  //             window.print();
  //             setPrintButtonLoading(false);
  //         }, [2000]);
  //     }
  // }, [printData]);

  const handlePrintCancel = () => {
    setPrintParams({
      month: "",
      year: "",
      date: "",
      loadno: "",
    });
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        year: "",
        month: "",
      }));
    }
  };

  const handlePrintMonthChange = (e) => {
    const [year, month] = e.target.value.split("-");

    setPrintParams({
      year: year,
      month: month,
      date: "",
      loadno: "",
    });
  };

  const GlobalStyle = createGlobalStyle`
@media print {
  @page {
    size: landscape;
  }
  body {
    -webkit-print-color-adjust: exact;
    width: 100%;
    height: 100%;
    transform: scale(0.9); /* Adjust scale as needed */
    transform-origin: top left right bottom; /* Adjust the origin if needed */
  }
                    .page-break {
                page-break-after: always;
            }
}
`;

  return (
    <div>
      <div id="section-to-print">
        <GlobalStyle />

        {printDatas.map((printData, index) => (
          <>
            <table>
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
                  <th colSpan="11" rowSpan="4" style={{ textAlign: "center" }}>
                    {"MEDIA PREPARATION & CONSUMPTION RECORD"}
                  </th>
                  <th>Format No.:</th>
                  <th>PH-QCL01/F-19</th>
                </tr>
                <tr>
                  <th>Revision No.:</th>
                  <th>02</th>
                </tr>
                <tr>
                  <th>Ref. SOP No.:</th>
                  <th>PH-QCL01-D-07</th>
                </tr>
                <tr>
                  <th>Page No.:</th>
                  <th>
                    {++lastPageNo} of {pageNoCount}
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Preparation Date
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Load No
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Media Name
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Media Weight (g)
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Distilled Water (ml)
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Media Quantity (ml)
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    pH of tde Media Required
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    pH of tde Media Observed
                  </td>
                  <td
                    colSpan={3}
                    style={{ padding: "0.5rem", textAlign: "center" }}
                  >
                    Media Consumption
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Remaining Quantity (ml)
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Remarks
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Prepared by
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Verified by
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    No.of plates prepared
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Media poured / Plate (ml.)
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Quantity used (ml)
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "0.5rem",
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                    rowSpan={3}
                  >
                    {slashFormatDate(printData.preparationDate)}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                    rowSpan={3}
                  >
                    {printData.loadNo}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    SCDA
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaMediaQuantity || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaPhOfMediaRequired || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaPhMediaObserved || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaNoOfPlates || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaMediaPoured || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaQuantityUsed || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaRemainingQuantiy || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.scdaRemarks || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    SDA
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaMediaQuantity || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaPhOfMediaRequired || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaPhMediaObsereved || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaNoOfPlates || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaMediaPoured || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaQuantityUsed || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaRemainingQuantiy || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.sdaRemarks || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    VRBA
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaMediaQuantity || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaPhOfMediaRequired || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaPhMediaObsereved || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaNoOfPlates || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaMediaPoured || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaQuantityUsed || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaRemainingQuantiy || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vrbaRemarks || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Particulars
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Prepared By
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Reviewed By
                  </td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}>
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Name
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Signature & Date
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
              </tfoot>
            </table>
            <table>
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
                  <th colSpan="11" rowSpan="4" style={{ textAlign: "center" }}>
                    {"MEDIA PREPARATION & CONSUMPTION RECORD"}
                  </th>
                  <th>Format No.:</th>
                  <th>PH-QCL01/F-19</th>
                </tr>
                <tr>
                  <th>Revision No.:</th>
                  <th>02</th>
                </tr>
                <tr>
                  <th>Ref. SOP No.:</th>
                  <th>PH-QCL01-D-07</th>
                </tr>
                <tr>
                  <th>Page No.:</th>
                  <th>
                    {++lastPageNo} of {pageNoCount}
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "0.5rem",
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                    rowSpan={4}
                  >
                    {slashFormatDate(printData.preparationDate)}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                    rowSpan={4}
                  >
                    {printData.loadNo}
                  </td>

                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Mac.Con
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnMediaQuantity || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnPhOfMediaRequired || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnPhMediaObsereved || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnNoOfPlates || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnMediaPoured || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnQuantityUsed || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnRemainingQuantiy || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.maccOnRemarks || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
                {/* Citric */}
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Citric
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricMediaQuantity || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricPhOfMediaRequired || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricPhMediaObsereved || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricNoOfPlates || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricMediaPoured || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricQuantityUsed || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricRemainingQuantiy || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.citricRemarks || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
                {/* VJ */}
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>VJ</td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjMediaQuantity || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjPhOfMediaRequired || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjPhMediaObsereved || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjNoOfPlates || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjMediaPoured || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjQuantityUsed || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjRemainingQuantiy || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.vjRemarks || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    BGA
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaMediaQuantity || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaPhOfMediaRequired || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaPhMediaObsereved || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaNoOfPlates || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaMediaPoured || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaQuantityUsed || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaRemainingQuantiy || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.bgaRemarks || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Particulars
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Prepared By
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Reviewed By
                  </td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}>
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Name
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Signature & Date
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
              </tfoot>
            </table>
            {/* Mac.Con */}

            <table>
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
                  <th colSpan="11" rowSpan="4" style={{ textAlign: "center" }}>
                    {"MEDIA PREPARATION & CONSUMPTION RECORD"}
                  </th>
                  <th>Format No.:</th>
                  <th>PH-QCL01/F-19</th>
                </tr>
                <tr>
                  <th>Revision No.:</th>
                  <th>02</th>
                </tr>
                <tr>
                  <th>Ref. SOP No.:</th>
                  <th>PH-QCL01-D-07</th>
                </tr>
                <tr>
                  <th>Page No.:</th>
                  <th>
                    {++lastPageNo} of {pageNoCount}
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
              </thead>
              <tbody>
                {/* BGA */}

                <tr>
                  <td colSpan={15} style={{ padding: "0.5rem" }}>
                    Buffer Solution
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "0.5rem",
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                    rowSpan={4}
                  >
                    {slashFormatDate(printData.preparationDate)}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem",
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                    rowSpan={4}
                  >
                    {printData.loadNo}
                  </td>

                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    NaCl
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.naclMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.naclDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.naclMediaQuantity || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    {printData.bufferSolPhMediaRequired || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    {printData.bufferSolPhMediaObsereved || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    {printData.bufferSolNoOfPlates || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    {printData.bufferSolMediaPoured || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    {printData.bufferSolQuantityUsed || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    {printData.bufferSolRemainingQuantiy || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    {printData.bufferSolRemarks || "N/A"}
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    <div>
                      <div>{printData.microbiologist_sign}</div>
                      <div>
                        {printDateFormat(printData.microbiologist_submit_on)}
                      </div>
                      <div>
                        {eSign.length > 0 &&
                        eSign[index]?.microbiologist_sign ? (
                          <img
                            src={
                              eSign.length > 0 &&
                              eSign[index]?.microbiologist_sign
                            }
                            alt="microbiologist_sign"
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
                  </td>
                  <td
                    style={{ padding: "0.5rem", textAlign: "center" }}
                    rowSpan={4}
                  >
                    <div>
                      <div>{printData.manager_sign}</div>
                      <div>{printDateFormat(printData.manager_submit_on)}</div>
                      <div>
                        {eSign.length > 0 && eSign[index]?.manager_sign ? (
                          <img
                            src={eSign.length > 0 && eSign[index]?.manager_sign}
                            alt="manager_sign"
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
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    KH2PO4
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.kh2po4MediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.kh2po4DistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.kh2po4MediaQuantity || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Peptone Water
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.peptoneWaterMediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.peptoneWaterDistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.peptoneWaterMediaQuantity || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    Tween 80
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.tween80MediaWeight || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.tween80DistilledWater || "N/A"}
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center" }}>
                    {printData.tween80MediaQuantity || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={15} style={{ padding: "0.5rem" }}>
                    Note: 1.Soybean Casein Digest Agar [SCDA], Sabouraud
                    Dextrose Agar (SDA), Violet Red Bile Agar (VRBA), Mac-Conkey
                    Agar ( Mac.Con. ), Vogel- Johnson Agar Base( VJ), Brilliant
                    Green Agar [BGA], Cetrimide Agar( Citri), Burkholderia
                    Cepacia selective agar [BCSA], Potassium dihydrogen
                    phosphate [KH2PO4] , Sodium chloride[ NaCl] 2. Media
                    required for pour plate method- 15 to 20ml., for others - 20
                    to 25 ml.
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Particulars
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Prepared By
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Reviewed By
                  </td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}>
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Name
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                    Signature & Date
                  </td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={4} style={{ padding: "0.5rem" }}></td>
                  <td colSpan={3} style={{ padding: "0.5rem" }}></td>
                </tr>
              </tfoot>
            </table>
          </>
        ))}
      </div>
      <BleachingHeader
        formName={"MEDIA PREPARATION & CONSUMPTION RECORD"}
        formatNo={"PH-QCL01/F-19"}
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
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Load No :
          </div>
          <Input
            type="text"
            value={formParams.loadno}
            onChange={(e) => {
              handleFormParams(e.target.value, "loadno");
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
          title="MEDIA PREPARATION & CONSUMPTION RECORD (Print)"
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
          {/* disabled={printParams.date !== ''} */}
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ margin: "0.5rem", width: "30%" }}>
              Month & Year :{" "}
            </span>
            <input
              type="month"
              onChange={handlePrintMonthChange}
              style={{ margin: "0.5rem" }}
              disabled={printParams.date !== ""}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ width: "30%", margin: "0.5rem" }}>Date :</span>
            <Input
              type="date"
              value={printParams.date}
              onChange={(e) => {
                handlePrintParams(e.target.value, "date");
              }}
              max={today}
              style={{ textAlign: "center", width: "50%" }}
              disabled={printParams.year !== "" || printParams.month !== ""}
            />
          </div>
          {/* <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <span style={{ margin: '0.5rem', width: '28%' }}>Load No : </span>{' '}
                        <Input
                            value={printParams.loadno}
                            onChange={(e) => {
                                handlePrintParams(e.target.value, 'loadno');
                            }}
                            max={today}
                            style={{ textAlign: 'center', width: '200px', margin: '0.5rem' }}
                            disabled={printParams.year !== '' || printParams.month !== ''}
                        ></Input>
                    </div> */}
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_f19_Summary;
