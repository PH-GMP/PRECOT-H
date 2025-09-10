/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { Tooltip } from "antd";
import moment from "moment";
import API from "../baseUrl.json";
import { FaUserCircle } from "react-icons/fa";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
// import BleContaminationCheckEdit from "./BleContaminationCheckEdit_f05";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { Tabs, Button, Col, Input, Row, message } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { jwtDecode } from "jwt-decode";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
// import Padpunching_f25_summary from "./Padpunching_f25_Summary.js";
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QualityControl_f013_Summary = () => {
  PrintPageOrientation({ orientation: "portrait", scale: 0.9 });
  const navigate = useNavigate();
  const { state } = useLocation();

  const [newDate, setNewDate] = useState("");

  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState([]);
  const [SecondResponseData, setSecondResponseData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectDate, setSelectDate] = useState("");

  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [formNo, setFormNo] = useState("");
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const [images, setImages] = useState({
    chemist: "",
    micro: "",
    qc: "",
  });

  //   const GlobalStyle = createGlobalStyle`
  //   @media print {
  //     @page {
  //       size: portrait;
  //     }
  //     body {
  //       -webkit-print-color-adjust: exact;
  //       width: 100%;
  //       height: 100%;
  //       transform: scale(0.9); /* Adjust scale as needed */
  //       // transform-origin: top right; /* Adjust the origin if needed */
  //       // transform-origin: bottom top ;
  //       transform-origin: bottom top;
  //       // transform-origin: top left;

  //     }
  //   }
  // `;

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const handleModalClose = () => {
    // setPrintBtnStatus(false);
    setShowModal(false);
    setSelectDate("");
    setSelectMonth("");
    setSelectYear("");
  };

  useEffect(() => {
    const { formNo } = state || {};
    console.log("format No : ", formNo);
    setFormNo(formNo);
  }, []);

  console.log("SecondResponse", SecondResponseData);

  let formattedChemistDate;
  if (printData.chemist_submit_on) {
    formattedChemistDate = moment(printData.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }

  let formattedMicroDate;
  if (printData.micro_submit_on) {
    formattedMicroDate = moment(printData.micro_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (printData.qc_submit_on) {
    formattedQCDate = moment(printData.qc_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }
  const fetchImage = async (username, token) => {
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/jpeg;base64,${base64}`;
    } catch (err) {
      console.error("Error in fetching image:", err);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (printData) {
      const fetchAllImages = async () => {
        const chemistImage = await fetchImage(printData?.chemist_sign, token);
        const microImage = await fetchImage(printData?.micro_sign, token);
        const qcImage = await fetchImage(printData?.qc_sign, token);

        setImages({
          chemist: chemistImage,
          micro: microImage,
          qc: qcImage,
        });
      };

      fetchAllImages();
    }
  }, [printData]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (newDate) {
      const formattedDate = formatDateToDDMMYYYY(newDate);
      setDate(formattedDate); // Save formatted date in date state
    }
  }, [newDate]);

  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };

  const handlePrintDate = (e) => {
    // console.log(" date Value", e.target.value);
    setSelectDate(e.target.value);
  };

  const handlePrintChange = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // const a = String(event.target.value).split('-').reverse().join('/');

    // if (selectMonth == "" && selectYear == "") {
    //   // setError('Please select a date');
    //   message.warning("Please Select Month & Year :");
    //   return;
    // }

    axios
      .get(`${   API.prodUrl}/Precot/api/chemicaltest/ARF013`, {
        headers,
        params: {
          date: selectDate,
          month: selectMonth,
          year: selectYear,
        },
      })
      .then((res) => {
        console.log("first response", res.data);
        setPrintData(res.data);
        setTimeout(() => {
          // setLoading(false)
          window.print();
        }, 1000);
      })
      .catch((err) => {
        console.log("Error", err);
        message.error(err.res.message);
      });
  };

  // Get the All Summary.....
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${   API.prodUrl}/Precot/api/chemicaltest/ARF013/getAll`, {
        headers,
      })
      .then((response) => {
        if (response.data && response.data.length !== 0) {
          setReason(true);
        } else {
          setReason(false);
        }
        setGetData(response.data);

        console.log(" Response", response.data);
        const a = response.data.map((x, i) => {
          return {
            formatName: x.format,
            formatNo: x.format_no,
            revisionNo: x.revision_no,
            refSopNo: x.ref_sop_no,
            unit: x.unit,
            date: x.sampled_on,
            id: x.test_id,
            year: x.year,
            month: x.month,
            chemist_status: x.chemist_status,
            micro_status: x.micro_status,
            qc_status: x.qc_status,
            reason: x.reason,
          };
        });
        // console.log("aaa", a);
        setSummary(a);

        const hasRejectedStatus = a.some(
          (item) =>
            item.qc_status === "QC_REJECTED" ||
            item.qc_status === "QA_REJECTED" ||
            item.micro_status === "MICROBIOLOGIST_REJECTED"
        );
        setShowReasonColumn(hasRejectedStatus);
        // setSummary(a);
      })
      .catch(() => {});
  }, []);

  const printSubmit = () => {
    window.print();
  };

  const goTo = () => {
    navigate("/Precot/QualityControl/F-13", {
      state: {
        date: newDate,
        //  year:selectYear,
        //  mon:Months,
      },
    });
  };

  const handleEdit = (record) => {
    console.log("recorddd", record);
    const x = summary.filter((x, i) => {
      return record.id == x.id;
    });
    console.log("Filter Record", x);

    navigate("/Precot/QualityControl/F-13", {
      state: {
        date: x[0].date,
        year: x[0].year,
        month: x[0].month,
        id: x[0].test_id,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new window.Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    // {
    //   title: "Order No",
    //   dataIndex: "orderNo",
    //   key: "orderNo",
    //   align: 'center',
    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      render: (text) => formatDate(text),
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   align:'center'
    // },

    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "Microbiology Status",
      dataIndex: "micro_status",
      key: "micro_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
    },
    ...(showReasonColumn
      ? [
          {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            align: "center",
          },
        ]
      : []),
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
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

  const cellStyle = {
    fontSize: "12pt",
    textAlign: "center",
    height: "70px",
    fontFamily: "Times New Roman, Times, serif",
  };

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {contextHolder}

      {/* <GlobalStyle /> */}
      <div id="section-to-print">
        {printData?.map((slice, index) => (
          <table
            className="f18table"
            style={{
              width: "100%",
              margin: "auto",
              tableLayout: "fixed",
              marginTop: "50px",
            }}
            key={index}
          >
            <br />
            <br />
            <br />
            <thead>
              <tr>
                <td style={{ border: "none", padding: "30px" }}></td>
              </tr>
              <tr>
                <td
                  colspan="5"
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                    marginTop: "50px",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br />
                  Unit H
                </td>
                <th
                  colspan="15"
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  POTABLE WATER ANALYSIS REPORT
                </th>
                <td
                  colspan="5"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Format No.:
                </td>
                <td
                  colspan="10"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {printData?.[index]?.format_no}
                </td>
              </tr>
              <tr>
                <td
                  colspan="5"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Revision No.:
                </td>
                <td
                  colspan="10"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {printData?.[index]?.revision_no}
                </td>
              </tr>

              <tr>
                <td
                  colspan="5"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Ref. SOP No.:
                </td>
                <td
                  colspan="10"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {printData?.[index]?.ref_sop_no}
                </td>
              </tr>

              <tr>
                <td
                  colspan="5"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Page No.:
                </td>
                <td
                  colspan="10"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {index + 1} of {printData.length}
                </td>
              </tr>
            </thead>
            <br />
            <br />
            <tr>
              <td
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  padding: "7px",
                  fontWeight: "bold",
                }}
              >
                Sampled & Tested /Incubation Start on{" "}
              </td>
              <td colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                A. R Number
              </td>
              <td colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                Sample Location
              </td>
              <td colSpan="12" style={{ textAlign: "center" }}>
                Physical and Chemical Test{" "}
              </td>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Microbiological testing Kit Method{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                pH (6.5 to 7.5){" "}
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                {" "}
                Hardness (&lt; 100 ppm)
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Total Dissolved Solids (&lt; 500 ppm){" "}
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Turbidity ( &lt; 2 NTU) 
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Test Completion Date{" "}
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Interpretation  
              </td>
            </tr>

            <tbody>
              <tr>
                <td
                  colSpan="5"
                  rowspan="6"
                  style={{ textAlign: "center", padding: "7px" }}
                >
                  {/* {printData?.[index]?.sampled_on} */}
                  {moment(printData?.[index]?.sampled_on).format("DD/MM/YYYY")}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ar_no}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Bleaching
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ph_level}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.hardness}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.total_DISSOLVED}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.turbidity}
                </td>
                <td colSpan="4" rowspan="6" style={{ textAlign: "center" }}>
                  {/* {printData?.[index]?.test_completion} */}
                  {moment(printData?.[index]?.test_completion).format(
                    "DD/MM/YYYY"
                  )}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {printData?.[index]?.interpretation}
                </td>
              </tr>
              <tr>
                {/* {Row Two} */}
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ar_no_1}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Spunlace
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ph_level_1}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.hardness_1}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.total_dissolved_1}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.turbidity_1}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {printData?.[index]?.interpretation_1}
                </td>
              </tr>
              {/* {Row Three} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ar_no_2}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  VMI
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ph_level_2}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.hardness_2}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.total_dissolved_2}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.turbidity_2}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {printData?.[index]?.interpretation_2}
                </td>
              </tr>

              {/* {Row four} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ar_no_3}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Canteen
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ph_level_3}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.hardness_3}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.total_dissolved_3}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.turbidity_3}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {printData?.[index]?.interpretation_3}
                </td>
              </tr>

              {/* {Row five} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ar_no_4}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Can water{" "}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ph_level_4}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.hardness_4}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.total_dissolved_4}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.turbidity_4}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {printData?.[index]?.interpretation_4}
                </td>
              </tr>

              {/* {Row six} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ar_no_5}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {printData?.[index]?.sample_location}{" "}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.ph_level_5}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.hardness_5}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.total_dissolved_5}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {printData?.[index]?.turbidity_5}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {printData?.[index]?.interpretation_5}
                </td>
              </tr>
              <tr>
                <td colSpan="35" style={{ textAlign: "left", padding: "7px" }}>
                  Remarks: {printData?.[index]?.remarks}
                </td>
              </tr>
              <tr>
                <td colSpan="35" style={{ textAlign: "left", padding: "7px" }}>
                  Note : After incubation media colour remains yellowish brown
                  with no haziness and No blackening, water is portable.Medium
                  colour changes to yellowish brown with haze. H2S negative
                  [Salmonella and Citrobacter absent, other organisms present],
                  water is not portable.Medium colour changes to black. H2S
                  negative [Salmonella and Citrobacter present, and/or other
                  organisms present], water is not portable. Abbreviations:
                  A.R-Analytical Reference, ppm-Parts per million, NTU-
                  Nephelometric Turbidity unit.
                </td>
              </tr>

              <tr>
                <td
                  colSpan="12"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Tested By (Chemist):
                </td>
                <td
                  colSpan="12"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Tested By (Microbiologist):
                </td>
                <td
                  colSpan="11"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Approved By : QC In charge
                </td>
              </tr>
              {printData.map((data, index) => (
                <tr key={index}>
                  <td colSpan="12" style={cellStyle}>
                    {images.chemist && (
                      <img
                        className="signature"
                        src={images.chemist}
                        alt="chemist"
                      />
                    )}
                    <br />
                    {data.chemist_sign}
                    <br />
                    {moment(data.chemist_submit_on).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td colSpan="12" style={cellStyle}>
                    {images.micro && (
                      <img
                        className="signature"
                        src={images.micro}
                        alt="microbiologist"
                      />
                    )}
                    <br />
                    {data.micro_sign}
                    <br />
                    {moment(data.micro_submit_on).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td colSpan="11" style={cellStyle}>
                    {images.qc && (
                      <img className="signature" src={images.qc} alt="qc" />
                    )}
                    <br />
                    {data.qc_sign}
                    <br />
                    {moment(data.qc_submit_on).format("DD/MM/YYYY HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>

            <br />
            <br />

            <tfoot>
              <tr>
                <td colspan="11" style={{ textAlign: "center" }}>
                  Particulars
                </td>
                <td colspan="8" style={{ textAlign: "center" }}>
                  Prepared by
                </td>
                <td colspan="8" style={{ textAlign: "center" }}>
                  Reviewed by
                </td>
                <td colspan="8" style={{ textAlign: "center" }}>
                  Apporved by
                </td>
              </tr>

              <tr>
                <td colspan="11" style={{ textAlign: "center" }}>
                  Name
                </td>
                <td colspan="8" style={{ textAlign: "center" }}></td>
                <td colspan="8" style={{ textAlign: "center" }}></td>
                <td colspan="8" style={{ textAlign: "center" }}></td>
              </tr>

              <tr>
                <td colspan="11" style={{ textAlign: "center" }}>
                  Signature & Date
                </td>
                <td colspan="8" style={{ textAlign: "center" }}></td>
                <td colspan="8" style={{ textAlign: "center" }}></td>
                <td colspan="8" style={{ textAlign: "center" }}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="POTABLE WATER ANALYSIS REPORT"
          formatNo="PH-QCL01-AR-F-013"
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
                marginRight: "10px",
                // display: printBtnStatus ? "block" : "none",
              }}
              shape="round"
              icon={<IoPrint color="#00308F" />}
              onClick={handlePrint}
            >
              &nbsp;Print
            </Button>,
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={handleBack}
              shape="round"
              icon={<GoArrowLeft color="#00308F" />}
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
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="Medium"
            format="DD/MM/YYYY"
            value={newDate}
            style={{
              width: "20%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "3%",
              marginLeft: "20px",
            }}
            onChange={(e) => setNewDate(e.target.value)}
            max={getCurrentDate()}
          />

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              backgroundColor: "#E5EEF9",
              marginBottom: "3%",
              marginLeft: "50px",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={goTo}
          >
            Go To
          </Button>
        </div>
      </div>

      <Table columns={baseColumns} dataSource={summary} />

      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
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
            onClick={handlePrintChange}
            // disabled={printBtnStatus}
          >
            Print
          </Button>,
        ]}
      >
        <h4
          style={{ textAlign: "center", color: "blueviolet" }}
          htmlFor="yearSelect"
        >
          {formNo}
        </h4>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "16px",
          }}
        >
          <label
            htmlFor="yearSelect"
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Select Year
          </label>
          <Select
            id="yearSelect"
            style={{
              width: "100%",
            }}
            onChange={(value) => setSelectYear(value)}
            placeholder="Select Year"
          >
            <Select.Option value="" disabled selected hidden>
              Select Year
            </Select.Option>
            {years.map((year) => (
              <Select.Option key={year.value} value={year.value}>
                {year.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "16px",
          }}
        >
          <>
            <label
              htmlFor="monthSelect"
              style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
            >
              Select Month
            </label>
            <Select
              id="monthSelect"
              style={{
                width: "100%",
              }}
              onChange={(value) => setSelectMonth(value)}
              // onChange={(value) => handleDatePrintChange(value)}
              placeholder="Select Month"
            >
              <Select.Option value="" disabled selected hidden>
                Select Month
              </Select.Option>
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
                </Select.Option>
              ))}
            </Select>
          </>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <label
            htmlFor="monthSelect"
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            placeholder="Date"
            type="date"
            size="small"
            value={selectDate}
            onChange={handlePrintDate}
            style={{ width: "100%" }}
            max={getCurrentDate()}
          />
        </div>
      </Modal>
    </div>
  );
};

export default QualityControl_f013_Summary;
