/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Form,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const { Option } = Select;

const Development_f001_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [shift, setShift] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [printMonth, setPrintMonth] = useState("");
  const [printYear, setPrintYear] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const [assistantDate, setAssistanatDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [shiftLov, setShiftLov] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [assistant, setAssistant] = useState("");
  const [hod_status, setHod_status] = useState("");
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedmonth, setSelectedmonth] = useState(null);
  const [monthyear, setMonthyear] = useState("");

  const [getImageDev, setGetImageDev] = useState(null);
  const [getImageQC, setGetImageQC] = useState(null);
  const [getImageQA, setGetImageQA] = useState(null);
  const [getImagePPC, setGetImagePPC] = useState(null);
  const [getImageBleaching, setGetImageBleaching] = useState(null);
  const [getImageSpunlace, setGetImageSpunlace] = useState(null);
  const [getImagePadPunching, setGetImagePadPunching] = useState(null);
  const [getImageDryGoods, setGetImageDryGoods] = useState(null);

  const [getImageInnerFilmI, setGetImageInnerFilmI] = useState(null);
  const [getImageOuterFilmII, setGetImageOuterFilmII] = useState(null);
  const [getImageInnerCartonIII, setGetImageInnerCartonIII] = useState(null);
  const [getImageOuterCartonIV, setGetImageOuterCartonIV] = useState(null);
  const [getSlipSheetImage, setGetSlipSheetImage] = useState(null);

  const [pdsPrint, setPdsPrint] = useState([]);
  const [pdsNo, setPdsNo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const shiftSelector = [
    { label: "I", value: "I" },
    { label: "II", value: "II" },
    { label: "III", value: "III" },
  ];

  useEffect(() => {
    const fetchPdsNo = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/ProductDevelopment/api/pds`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pdsNo = response.data.map((pdsNo) => ({
          value: pdsNo,
          label: pdsNo,
        }));

        setPdsPrint(pdsNo);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };

    fetchPdsNo();
  }, []);

  const handlePdsNoChange = (e) => {
    setPdsNo(e);
  };

  const formatDates = (dateString) => {
    if (dateString === "NA") return "NA";
    if (!dateString) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateString)) {
      return dateString;
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const date1 = formatDates(selectedDate);

  const GlobalStyle = createGlobalStyle`
  @media print {
    .page-number::after {
      content: "Page " counter(page) " of " counter(pages);
    }
  }
`;

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "PDS NO.",
      dataIndex: "pdsNo",
      key: "pdsNo",
      align: "center",
    },
    {
      title: " Product Code",
      dataIndex: "productCode",
      key: "productCode",
      align: "center",
    },
    {
      title: "Development Supervisor Status ",
      dataIndex: "sup_status",
      key: "sup_status",
      align: "center",
    },
    {
      title: "QC Status",
      dataIndex: "qcStatus",
      key: "qcStatus",
      align: "center",
    },
    {
      title: "QA Status",
      dataIndex: "qa_Status",
      key: "qa_Status",
      align: "center",
    },
    {
      title: "PPC Status",
      dataIndex: "ppc_status",
      key: "ppc_status",
      align: "center",
    },
    {
      title: "Bleaching Status",
      dataIndex: "bleaching_status",
      key: "bleaching_status",
      align: "center",
    },
    {
      title: "Spunlace Status",
      dataIndex: "spunlace_status",
      key: "spunlace_status",
      align: "center",
    },
    {
      title: "Pad Punching Status",
      dataIndex: "pad_punching_status",
      key: "pad_punching_status",
      align: "center",
    },
    {
      title: "Dry Goods Status",
      dataIndex: "dry_goods_status",
      key: "dry_goods_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      render: (_, x) => (
        <>
          <Button
            icon={<BiEdit />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%", border: "none" }}
          >
            Edit
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
    columns = [...baseColumns.slice(0, 11), Reason, ...baseColumns.slice(11)];
  } else {
    columns = baseColumns;
  }

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handlePrint = () => {
    setShowModal(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handleCancel = () => {
    setShowModal(false);
    setPdsNo(null);
    setButtonLoading(false);
    form.resetFields();
  };

  const formatdate = (dateStr) => {
    if (!dateStr) return "";
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

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        if (res.data && res.data.length !== 0) {
          const isHODRejected = res.data.some(
            (data) =>
              data.qcStatus === "QC_REJECTED" ||
              data.qa_Status === "QA_REJECTED"
          );
          setReason(isHODRejected);
        }

        res.data.forEach((item, index) => {});
        setGetData(res.data);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              pdsNo: x.pdsNo || "",
              id: x.id,
              sup_status: x.developmentSupervisorStatus || "",
              qcStatus: x.qcStatus,
              qa_Status: x.qa_Status,
              ppc_status: x.ppc_status,
              productCode: x.productCode || "",
              bleaching_status: x.bleaching_status,
              spunlace_status: x.spunlace_status,
              pad_punching_status: x.pad_punching_status,
              dry_goods_status: x.dry_goods_status,
              year: x.year || "",
              reason: x.reason || "",
            }))
          );
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
        navigate("/Precot/Development/F-001/Summary");
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/ProductDevelopment/getProductDevelopmentSummary`;

    fetchSummary(summaryUrl);
  }, []);

  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }

  const years = generateYearOptions(2024, 2040);

  const handleEdit = (x) => {
    navigate("/Precot/Development/F-001", {
      state: {
        pdsNo: x.pdsNo,
      },
    });
  };
  const hasFetched = useRef(false);

  const [previousPdsNo, setPreviousPdsNo] = useState("");
  const [currentPdsNo, setcurrentPdsNo] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);
  const printDataSubmit = () => {
    fetchOptions();
  };

  const fetchOptions = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(
        `${API.prodUrl}/Precot/api/ProductDevelopment/ProductDevelopmentprint?pdsNo=${pdsNo}`,
        { headers }
      );
      const data = res.data;

      if (data && data.length > 0) {
        const record = data[0];
        setPrintResponseData(record);

        setTimeout(() => {
          window.print();
        }, 6000);
        const imageUrls = [
          { key: "developmentSupervisorSign", setter: setGetImageDev },
          { key: "qcSign", setter: setGetImageQC },
          { key: "qa_sign", setter: setGetImageQA },
          { key: "ppc_sign", setter: setGetImagePPC },
          { key: "bleaching_sign", setter: setGetImageBleaching },
          { key: "spunlace_sign", setter: setGetImageSpunlace },
          { key: "pad_punching_sign", setter: setGetImagePadPunching },
          { key: "dry_goods_sign", setter: setGetImageDryGoods },
        ];

        await Promise.all(
          imageUrls.map(async (img) => {
            try {
              const username = record[img.key];
              if (username) {
                const response = await axios.get(
                  `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
                  {
                    headers,
                    responseType: "arraybuffer",
                  }
                );
                const base64 = btoa(
                  new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;
                img.setter(url);
              } else {
                console.error(`Username for ${img.key} is undefined`);
              }
            } catch (err) {
              console.error(`Error in fetching ${img.key} image:`, err);
            }
          })
        );

        const response = await axios.get(
          `${API.prodUrl}/Precot/api/ProductDevelopment/images?pdsNo=${pdsNo}`,
          { headers }
        );

        const {
          innerFilmI,
          outerFilmII,
          innerCartonIII,
          outerCartonIV,
          slipSheet,
        } = response.data;

        if (innerFilmI)
          setGetImageInnerFilmI(`data:image/jpeg;base64,${innerFilmI}`);
        if (outerFilmII)
          setGetImageOuterFilmII(`data:image/jpeg;base64,${outerFilmII}`);
        if (innerCartonIII)
          setGetImageInnerCartonIII(`data:image/jpeg;base64,${innerCartonIII}`);
        if (outerCartonIV)
          setGetImageOuterCartonIV(`data:image/jpeg;base64,${outerCartonIV}`);
        if (slipSheet)
          setGetSlipSheetImage(`data:image/jpeg;base64,${slipSheet}`);

        setButtonLoading(true);
      } else {
        setPrintResponseData([]);
        message.error("no data found...!");
        setButtonLoading(false);
      }
    } catch (err) {
      console.error("Error", err);
      setButtonLoading(false);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleNavigate = () => {
    if (currentPdsNo == "") {
      message.warning("Please Provide the PDS No");
    } else {
      navigate("/Precot/Development/F-001", {
        state: { pdsNo: currentPdsNo },
      });
    }
  };

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

  const recordsPerPage = 8;

  window.onload = function () {
    const pageNumbers = document.querySelectorAll(".page-number");

    // Add page numbers for dynamic print
    window.onbeforeprint = function () {
      let totalPages = Math.ceil(
        document.body.scrollHeight / window.innerHeight
      );
      pageNumbers.forEach((element, index) => {
        element.innerHTML = `Page ${index + 1} of ${totalPages}`;
      });
    };
  };

  return (
    <div>
      <div id="section-to-print">
        <div>
          <table style={{ scale: "90%" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="10"
                ></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="10"
                ></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="10"
                ></td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td
                  rowSpan="4"
                  colSpan="2"
                  style={{ textAlign: "center", width: "10%" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "80px", height: "auto" }}
                  />
                  <br />
                  <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                    Unit H
                  </b>
                </td>
                <td rowspan="4" colSpan="9" style={{ textAlign: "center" }}>
                  <b>Product Development Sheet</b>{" "}
                </td>
                <td colSpan="2">Format No.:</td>
                <td colSpan="3">PH-DVP01/F-001</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="2">Revision No.:</td>
                <td colSpan="3">01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="2">Ref.SOP No.:</td>
                <td colSpan="3">PH-DVP01-D-01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="2">Page No.:</td>
                <td colSpan="3" className="page-number"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  PDS No. :
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData.pdsNo}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Rev. No:
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData.revisionNo}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Rev.Date:
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {formatDates(printResponseData.revisionDate)}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  PDS Effective Date:
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {formatDates(printResponseData.pdseffectiveDate)}
                </td>
              </tr>
              <tr>
                <td colSpan="9">
                  Product Description :{printResponseData.productDescription}{" "}
                </td>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Customer Approved Sample Details
                </td>
              </tr>
              <tr>
                <td colSpan="9">
                  Customer Name: {printResponseData.customerName}{" "}
                </td>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Sample Requisition No:
                </td>
                <td colSpan="5" style={{ textAlign: "left" }}>
                  {printResponseData.sampleRequisitionNo}
                </td>
              </tr>
              <tr>
                <td colSpan="9">
                  Product Code : {printResponseData.productCode}{" "}
                </td>
                <td colSpan="2" style={{ textAlign: "left", height: "30px" }}>
                  Mixing :{" "}
                </td>
                <td
                  colSpan="5"
                  style={{ textAlign: "left", verticalAlign: "top" }}
                >
                  {printResponseData.mixingRatio}
                </td>
              </tr>
              <tr>
                <td colSpan="9">Brand : {printResponseData.brand} </td>
                <td
                  colSpan="7"
                  rowSpan={2}
                  style={{ textAlign: "left", verticalAlign: "top" }}
                >
                  Customer comments if any: {printResponseData.customerComment}
                </td>
              </tr>
              <tr>
                <td colSpan="9">Country:{printResponseData.country} </td>
              </tr>
              <tr>
                <td
                  rowSpan={
                    printResponseData?.details?.length +
                    printResponseData?.gsmSlideDetails?.length +
                    printResponseData?.gsmDetails?.length +
                    11
                  }
                  style={{ width: "2%" }}
                >
                  A
                </td>
                <td colSpan={8}>Product Details :</td>
                <td
                  rowSpan={
                    printResponseData?.skuDetails?.length +
                    printResponseData?.details?.length +
                    printResponseData?.gsmSlideDetails?.length +
                    printResponseData?.gsmDetails?.length +
                    9
                  }
                  style={{ width: "2%", borderBottom: "none" }}
                >
                  B
                </td>
                <td colSpan={6}>SKU Details : (Weight in grams)</td>
              </tr>

              <tr>
                <td colSpan={2} rowSpan={2} style={{ textAlign: "center" }}>
                  Parameter
                </td>
                <td colSpan={1} rowSpan={2} style={{ textAlign: "center" }}>
                  Specification
                </td>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Tolerance
                </td>

                <td colSpan={1} rowSpan={2} style={{ textAlign: "center" }}>
                  Parameter
                </td>
                <td colSpan={1} rowSpan={2} style={{ textAlign: "center" }}>
                  Standard in gms
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Tolerance
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Limit
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Min.
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Max.
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Limit
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Min.
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Max.
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Shape
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.shapeSpecification}
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  {printResponseData.shapeTolerence}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Weight of inner Empty Bag
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightInnerEmptyBag}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.weightInnerEmptyBagLimit}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightInnerEmptyBagMin}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightInnerEmptyBagMax}
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Size (mm)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.size}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.sizelimit}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.sizeMin}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.sizeMax}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Weight of outer Empty Bag
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightOuterEmptyBag}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.weightOuterEmptyBagLimit}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightOuterEmptyBagMin}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightOuterEmptyBagMax}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Count per pack (Nos.)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.countPerPack}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ±{printResponseData.countPerPackLimit}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.countPerPackMin}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.countPerPackMax}
                </td>

                <td colSpan={1} style={{ textAlign: "center" }}>
                  Weight of empty inner carton
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyInnerCarton}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyInnerCartonLimit}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyInnerCartonMin}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyInnerCartonMax}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  No. of Packs per Inner Carton (Nos)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.packsPerInnerCarton}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ±{printResponseData.packsPerInnerCartonLimit}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.packsPerInnerCartonMin}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.packsPerInnerCartonMax}
                </td>

                <td colSpan={1} style={{ textAlign: "center" }}>
                  Weight of empty outer carton
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyOuterCarton}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyOuterCartonLimit}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyOuterCartonMin}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.weightEmptyOuterCartonMax}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  No. of Inner per Outer Carton (Nos)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.innerPerOuterCarton}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ±{printResponseData.innerPerOuterCartonLimit}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.innerPerOuterCartonMin}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.innerPerOuterCartonMax}
                </td>

                <td colSpan={1} style={{ textAlign: "center" }}>
                  Net Wt. of filled pack
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.netWtFilledPack}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.netWtFilledPackLimit}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.netWtFilledPackMin}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.netWtFilledPackMax}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  No Packs per Outer Carton (Nos)
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.packsPerOuterCarton}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ±{printResponseData.packsPerOuterCartonLimit}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.packsPerOuterCartonMin}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.packsPerOuterCartonMax}
                </td>

                <td colSpan={1} style={{ textAlign: "center" }}>
                  Gross Wt. of filled pack
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.grossWtFilledPack}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {printResponseData.grossWtFilledPackLimit}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.grossWtFilledPackMin}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  {printResponseData.grossWtFilledPackMax}
                </td>
              </tr>
              <>
                {printResponseData?.gsmDetails?.map((data, index) => (
                  <tr key={index}>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {data.parameter}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {data.gsmSpec}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {data.gsmTolerenceLimit}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {data.gsmTolerenceMin}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {data.gsmTolerenceMax}
                    </td>
                    {index === 0 && (
                      <>
                        <td
                          rowSpan={printResponseData?.gsmDetails?.length}
                          colSpan={1}
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          Net Wt. of filled Inner Carton
                        </td>
                        <td
                          rowSpan={printResponseData?.gsmDetails?.length}
                          colSpan={1}
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          {printResponseData.netWtFilledInnerCarton}
                        </td>
                        <td
                          rowSpan={printResponseData?.gsmDetails?.length}
                          colSpan={2}
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          {printResponseData.netWtFilledInnerCartonLimit}
                        </td>
                        <td
                          rowSpan={printResponseData?.gsmDetails?.length}
                          colSpan={1}
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          {printResponseData.netWtFilledInnerCartonMin}
                        </td>
                        <td
                          rowSpan={printResponseData?.gsmDetails?.length}
                          colSpan={1}
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          {printResponseData.netWtFilledInnerCartonMax}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </>
              <>
                {printResponseData?.gsmSlideDetails?.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        rowSpan={2}
                        colSpan={1}
                        style={{ width: "5%", textAlign: "center" }}
                      >
                        {data.parameter}
                      </td>
                      <td colSpan={0.5} style={{ textAlign: "center" }}>
                        {data.gsmPatternSide1SlideParameter}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {data.gsmPatternSide1Specification}
                      </td>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        {data.gsmPatternSide1Tolerance}
                      </td>
                      {index === 0 && (
                        <>
                          <td
                            rowSpan={
                              (printResponseData?.gsmSlideDetails?.length + 1) /
                              2
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            Gross Wt. of filled Inner Carton
                          </td>
                          <td
                            rowSpan={
                              (printResponseData?.gsmSlideDetails?.length + 1) /
                              2
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.grossWtFilledInnerCarton}
                          </td>
                          <td
                            rowSpan={
                              (printResponseData?.gsmSlideDetails?.length + 1) /
                              2
                            }
                            colSpan={2}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.grossWtFilledInnerCartonLimit}
                          </td>
                          <td
                            rowSpan={
                              (printResponseData?.gsmSlideDetails?.length + 1) /
                              2
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.grossWtFilledInnerCartonMin}
                          </td>
                          <td
                            rowSpan={
                              (printResponseData?.gsmSlideDetails?.length + 1) /
                              2
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.grossWtFilledInnerCartonMax}
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <td colSpan={0.5} style={{ textAlign: "center" }}>
                        {data.gsmPatternSide2SlideParameter}
                      </td>
                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {data.gsmPatternSide2Specification}
                      </td>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        {data.gsmPatternSide2Tolerance}
                      </td>
                      {index === 0 && (
                        <>
                          <td
                            rowSpan={
                              printResponseData?.gsmSlideDetails?.length / 2 +
                              printResponseData?.gsmSlideDetails?.length
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            Net Wt. of filled Outer Carton
                          </td>
                          <td
                            rowSpan={
                              printResponseData?.gsmSlideDetails?.length / 2 +
                              printResponseData?.gsmSlideDetails?.length
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.netWtFilledOuterCarton}
                          </td>
                          <td
                            rowSpan={
                              printResponseData?.gsmSlideDetails?.length / 2 +
                              printResponseData?.gsmSlideDetails?.length
                            }
                            colSpan={2}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.netWtFilledOuterCartonLimit}
                          </td>
                          <td
                            rowSpan={
                              printResponseData?.gsmSlideDetails?.length / 2 +
                              printResponseData?.gsmSlideDetails?.length
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.netWtFilledOuterCartonMin}
                          </td>
                          <td
                            rowSpan={
                              printResponseData?.gsmSlideDetails?.length / 2 +
                              printResponseData?.gsmSlideDetails?.length
                            }
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            {printResponseData.netWtFilledOuterCartonMax}
                          </td>
                        </>
                      )}
                    </tr>
                  </React.Fragment>
                ))}
              </>

              {printResponseData?.details?.map((detail, index) => {
                const sku = printResponseData?.skuDetails?.[index] || {};
                return (
                  <tr key={`row-${index}`}>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {detail.parameter}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {detail.productsizeSpec}
                    </td>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      {detail.productsizeTolerence}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.parameter || "NA"}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCarton || "NA"}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCartonLimit || "NA"}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCartonMin || "NA"}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCartonMax || "NA"}
                    </td>
                  </tr>
                );
              })}
              {printResponseData?.skuDetails
                ?.slice(printResponseData.details.length)
                .map((sku, index) => (
                  <tr key={`sku-only-${index}`}>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      NA
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      NA
                    </td>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      NA
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.parameter}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCarton}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCartonLimit}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCartonMin}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.grossWtFilledOuterCartonMax}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={16} style={{ textAlign: "center" }}>
                  Packaging & Packing Method Details
                </td>
              </tr>
              <tr>
                <td
                  rowSpan={printResponseData?.packingDetails?.length + 7}
                  style={{ width: "2%", verticalAlign: "top" }}
                >
                  A
                </td>
                <td colSpan="8">Primary Packaging Details : (Film & Bag) </td>
                <td
                  rowSpan={printResponseData?.packingDetails?.length + 7}
                  style={{ width: "2%", verticalAlign: "top" }}
                >
                  F
                </td>
                <td colSpan="6">Packaging Requirements : </td>
              </tr>
              <tr>
                <td rowSpan={2} colSpan={2} style={{ textAlign: "center" }}>
                  Parameter
                </td>
                <td rowSpan={2} colSpan={1} style={{ textAlign: "center" }}>
                  Specification
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Tolerance
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Packaging Type
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Section No.
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Limit</td>
                <td colSpan={2}>Min.</td>
                <td colSpan={2}>Max.</td>
                <td colSpan={1}>1</td>
                <td colSpan={2}>Inner Bag</td>
                <td colSpan={3}>{printResponseData.innerbag}</td>
              </tr>
              <tr>
                <td colSpan={2}>Film Type</td>
                <td colSpan={7}>{printResponseData.primaryfilmType}</td>
                <td colSpan={1}>2</td>
                <td colSpan={2}>Outer bag</td>
                <td colSpan={3}>{printResponseData.outerbag}</td>
              </tr>
              <tr>
                <td colSpan={2}>Film Thickness in Micron</td>
                <td colSpan={1}>
                  {printResponseData.primaryfilmThicknessMicron}
                </td>
                <td colSpan={2}>
                  ±{printResponseData.primaryfilmThicknessMicronLimit}
                </td>
                <td colSpan={2}>
                  {printResponseData.primaryfilmThicknessMicronMin}
                </td>
                <td colSpan={2}>
                  {printResponseData.primaryfilmThicknessMicronMax}
                </td>
                <td colSpan={1}>3</td>
                <td colSpan={2}>Inner Carton</td>
                <td colSpan={3}>{printResponseData.innercarton}</td>
              </tr>
              <tr>
                <td colSpan={2}>Bag Type</td>
                <td colSpan={7}>{printResponseData.primarybagType}</td>
                <td colSpan={1}>4</td>
                <td colSpan={2}>Outer Carton</td>
                <td colSpan={3}>{printResponseData.outercarton}</td>
              </tr>
              <>
                <tr>
                  {printResponseData?.packingDetails?.length > 0 && (
                    <>
                      <td
                        rowSpan={printResponseData?.packingDetails?.length + 1}
                        colSpan={2}
                      >
                        Bag Dimension
                      </td>
                      <td
                        rowSpan={printResponseData?.packingDetails?.length + 1}
                        colSpan={7}
                      >
                        {printResponseData?.primarybagDimension}
                      </td>
                    </>
                  )}
                </tr>
                {printResponseData?.packingDetails?.map((data, index) => (
                  <tr key={index}>
                    <td colSpan={1} style={{ textAlign: "left" }}>
                      {index + 5}
                    </td>
                    <td colSpan={2}>{data.parameter}</td>
                    <td colSpan={3}>{data.bopptape}</td>
                  </tr>
                ))}
              </>
              {printResponseData?.secondaryPackingDetails?.map(
                (item, index) => (
                  <React.Fragment key={item.id}>
                    <tr>
                      {index === 0 && (
                        <td
                          rowSpan={
                            printResponseData.secondaryPackingDetails.length * 8
                          }
                          style={{ width: "2%", verticalAlign: "top" }}
                        >
                          B
                        </td>
                      )}
                      <td colSpan={8}>{item.packingDetails}</td>
                      {index === 0 && (
                        <td
                          rowSpan={
                            (printResponseData?.printLocationOuterbagDetails
                              ?.length || 0) *
                              3 +
                            (printResponseData?.customerRequirementDetails
                              ?.length || 0) +
                            21
                          }
                          style={{ width: "2%", verticalAlign: "top" }}
                        >
                          G
                        </td>
                      )}
                      {index === 0 && (
                        <>
                          <td colSpan={6}>
                            Lot Coding System & Customer requirements{" "}
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <td rowSpan={2} colSpan={2}>
                        Parameter
                      </td>
                      <td rowSpan={2} colSpan={1}>
                        Specification
                      </td>
                      <td colSpan={6}>Tolerance</td>
                      {index === 0 && (
                        <>
                          <td rowSpan={7} colSpan={1}>
                            On outer bag :<br />
                            (online printing)
                          </td>
                          <td colSpan={2}>Customer/Julian coding</td>
                          <td colSpan={3}>
                            {printResponseData.customerJulianCoding}
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <td colSpan={2}>Limit</td>
                      <td colSpan={2}>Min.</td>
                      <td colSpan={2}>Max.</td>
                      {index === 0 && (
                        <>
                          <td colSpan={2}>PO No.</td>
                          <td colSpan={3}>{printResponseData.poNoOuterBag}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <td colSpan={2}>Film Type</td>
                      <td colSpan={7}>{item.filmType}</td>
                      {index === 0 && (
                        <>
                          <td colSpan={2}>Mfg. Date</td>
                          <td colSpan={3}>
                            {printResponseData.mfgDateOuterBag}
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <td colSpan={2}>Film Thickness in Micron</td>
                      <td colSpan={1}>{item.filmThicknessMicron}</td>
                      <td colSpan={2}>{item.filmThicknessMicronLimit}</td>
                      <td colSpan={2}>{item.filmThicknessMicronMin}</td>
                      <td colSpan={2}>{item.filmThicknessMicronMax}</td>
                      {index === 0 && (
                        <>
                          <td colSpan={2}>Expiry Date</td>
                          <td colSpan={3}>
                            {printResponseData.expiryDateOuterBag}
                          </td>
                        </>
                      )}
                    </tr>

                    <tr>
                      <td colSpan={2}>Bag Type</td>
                      <td colSpan={7}>{item.bagType}</td>
                      {index === 0 && (
                        <td colSpan={5} style={{ padding: "0" }}>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              border: "1px solid black",
                            }}
                          >
                            <thead></thead>
                            <tbody>
                              {printResponseData.printLocationOuterbagDetails.map(
                                (customerItem, i) => (
                                  <tr key={i}>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        border: "1px solid black",
                                        width: "55%",
                                      }}
                                    >
                                      {customerItem.outerBagparameter}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "left",
                                        border: "1px solid black",
                                        width: "45%",
                                      }}
                                    >
                                      {customerItem.printLocationOuterBag}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </td>
                      )}
                    </tr>
                    <tr>
                      {/* Bag Dimension */}
                      <td colSpan={2}>Bag Dimension</td>
                      <td colSpan={7}>{item.bagDimension}</td>
                      {index === 0 && (
                        <>
                          <td colSpan={2}>MRP</td>
                          <td colSpan={3}>{printResponseData.mrp}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <td colSpan={9} style={{ borderLeft: "none" }}></td>
                      {index === 0 && (
                        <td colSpan={5} style={{ padding: "0" }}>
                          <table
                            style={{ width: "100%", border: "1px solid black" }}
                          >
                            <thead></thead>
                            <tbody>
                              {printResponseData.customerRequirementDetails.map(
                                (customerItem, i) => (
                                  <tr key={i}>
                                    <td
                                      colSpan={2}
                                      style={{
                                        textAlign: "left",
                                        border: "1px solid black",
                                        width: "55%",
                                      }}
                                    >
                                      {customerItem.parameter}
                                    </td>
                                    <td
                                      colSpan={3}
                                      style={{
                                        textAlign: "left",
                                        border: "1px solid black",
                                        width: "45%",
                                      }}
                                    >
                                      {customerItem.usp}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </td>
                      )}
                    </tr>
                  </React.Fragment>
                )
              )}
              <tr>
                <td
                  rowSpan={
                    printResponseData?.innercottonDetails?.length +
                    printResponseData?.printLocationOuterbagDetails?.length +
                    printResponseData?.printLocationOuterbagDetails?.length +
                    printResponseData?.innerplyColors?.length +
                    7
                  }
                  style={{ width: "2%", verticalAlign: "top" }}
                >
                  C
                </td>
                <td colSpan={9}>Inner Carton</td>

                <td
                  rowSpan={
                    printResponseData?.printLocationOuterbagDetails?.length +
                    printResponseData?.printLocationOuterbagDetails?.length +
                    7
                  }
                  colSpan={1}
                >
                  {printResponseData?.onInnerBagTitle}
                </td>
                <td colSpan={2}>Julian coding -</td>
                <td colSpan={3}>
                  {printResponseData.innerCustomerJulianCoding}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Parameter</td>
                <td colSpan={7}>Specification</td>
                <td colSpan={2}>PO No.</td>
                <td colSpan={3}>{printResponseData.poNoInnerBag}</td>
              </tr>
              <tr>
                <td colSpan={2}>Carton Type</td>
                <td colSpan={7}>{printResponseData.innercartonType}</td>
                <td colSpan={2}>Mfg. Date - </td>
                <td colSpan={3}>{printResponseData.mfgDateInnerBag}</td>
              </tr>
              <tr>
                <td colSpan={2}>Dimension (Outer) in mm</td>
                <td colSpan={7}>{printResponseData.innerdimensionOuterMm}</td>
                <td colSpan={2}>Expiry Date -</td>
                <td colSpan={3}>{printResponseData.expiryDateInnerBag}</td>
              </tr>
              <>
                {printResponseData?.printLocationOuterbagDetails?.length >
                  0 && (
                  <>
                    <td
                      rowSpan={
                        printResponseData?.printLocationOuterbagDetails
                          ?.length + 1
                      }
                      colSpan={2}
                    >
                      No. of Ply
                    </td>
                    <td
                      rowSpan={
                        printResponseData?.printLocationOuterbagDetails
                          ?.length + 1
                      }
                      colSpan={7}
                    >
                      {printResponseData.innernumberOfPly}
                    </td>
                  </>
                )}
                {printResponseData?.printLocationOuterbagDetails?.map(
                  (data, index) => (
                    <tr key={index}>
                      <td colSpan={2}>{data?.innerBagparameter}</td>
                      <td colSpan={3}>{data?.printLocationInnerBag}</td>
                    </tr>
                  )
                )}
              </>
              <tr>
                <td colSpan={2}>Flute</td>
                <td colSpan={7}>{printResponseData.innerflute}</td>
                {/* <td rowSpan={((printResponseData?.printLocationOuterbagDetails?.length) + (printResponseData?.innercottonDetails?.length)) + 4} align="center">On Outer Carton :   <br />(To be stamped)</td> */}
                <td colSpan={2}>MRP </td>
                <td colSpan={3}>{printResponseData.mrpInner}</td>
              </tr>

              <>
                {printResponseData?.printLocationOuterbagDetails?.length >
                  0 && (
                  <>
                    <td
                      rowSpan={
                        printResponseData?.printLocationOuterbagDetails
                          ?.length + 1
                      }
                      colSpan={2}
                    >
                      Bursting Strength
                    </td>
                    <td
                      rowSpan={
                        printResponseData?.printLocationOuterbagDetails
                          ?.length + 1
                      }
                      colSpan={7}
                    >
                      {printResponseData.innerburstingstrenght}
                    </td>
                  </>
                )}
                {printResponseData?.customerRequirementDetails?.map(
                  (data, index) => (
                    <tr key={index}>
                      <td colSpan={2}>{data?.uspInnerparameter}</td>
                      <td colSpan={3}>{data?.uspInner}</td>
                    </tr>
                  )
                )}
              </>
              <>
                {printResponseData?.innercottonDetails?.map((data, index) => (
                  <tr key={index}>
                    <td colSpan={2}>{data.parameter}</td>
                    <td colSpan={7}>{data.innerboardgsm}</td>

                    {index === 0 &&
                      printResponseData?.printLocationOuterbagDetails?.length >
                        0 && (
                        <>
                          <td
                            rowSpan={
                              printResponseData?.printLocationOuterbagDetails
                                ?.length +
                              printResponseData?.innercottonDetails?.length +
                              printResponseData?.innerplyColors?.length +
                              3
                            }
                          >
                            On Inner Carton :<br /> (To be stamped)
                          </td>
                          <td
                            rowSpan={
                              printResponseData?.innercottonDetails?.length
                            }
                            colSpan={2}
                          >
                            Julian coding{" "}
                          </td>
                          <td
                            rowSpan={
                              printResponseData?.innercottonDetails?.length
                            }
                            colSpan={3}
                          >
                            {printResponseData.julianCodingInnerCarton}
                          </td>
                        </>
                      )}
                  </tr>
                ))}
              </>
              <>
                {printResponseData?.innerplyColors?.map((detail, index) => (
                  <tr key={index}>
                    <td colSpan={2}>{detail.colorName}</td>
                    <td colSpan={2}>{detail.plycolor1}</td>
                    <td colSpan={2}>{detail.plycolor2}</td>
                    <td colSpan={3}>{detail.plycolor3}</td>
                    {index === 0 &&
                      printResponseData?.printLocationOuterbagDetails?.length >
                        0 && (
                        <>
                          <td
                            rowSpan={printResponseData?.innerplyColors?.length}
                            colSpan={2}
                          >
                            PO No.
                          </td>
                          <td
                            rowSpan={printResponseData?.innerplyColors?.length}
                            colSpan={3}
                          >
                            {printResponseData?.poNoInnerCarton}
                          </td>
                        </>
                      )}
                  </tr>
                ))}
              </>

              <tr style={{ borderTop: "none" }}>
                <td
                  rowSpan={
                    printResponseData?.plyColors?.length +
                    printResponseData?.printLocationOuterbagDetails?.length *
                      2 +
                    7
                  }
                  style={{
                    width: "2%",
                    verticalAlign: "top",
                    borderTop: "none",
                  }}
                >
                  D
                </td>
                <td colSpan={9}>
                  Outer Carton {printResponseData.outercartonname}
                </td>
                <td colSpan={2}>Mfg. Date - </td>
                <td colSpan={3}>{printResponseData.mfgDateOuterCarton}</td>
              </tr>
              <tr>
                <td colSpan={2}>Parameter</td>
                <td colSpan={7}>Specification</td>
                <td colSpan={2}>Expiry Date -</td>
                <td colSpan={3}>{printResponseData?.expiryDateOuterCarton}</td>
              </tr>
              <>
                {printResponseData?.printLocationOuterbagDetails?.length >
                  0 && (
                  <>
                    <td
                      rowSpan={
                        printResponseData?.printLocationOuterbagDetails
                          ?.length + 1
                      }
                      colSpan={2}
                    >
                      Carton Type
                    </td>
                    <td
                      rowSpan={
                        printResponseData?.printLocationOuterbagDetails
                          ?.length + 1
                      }
                      colSpan={7}
                    >
                      {printResponseData.innerdimensionOuterMm}
                    </td>
                  </>
                )}
                {printResponseData?.printLocationOuterbagDetails?.map(
                  (data, index) => (
                    <tr key={index}>
                      <td colSpan={2}>{data.innerCartonparameter}</td>
                      <td colSpan={3}>{data.printLocationInnerCarton}</td>
                    </tr>
                  )
                )}
              </>
              <tr>
                <td colSpan={2}>Dimension (Outer) in mm</td>
                <td colSpan={7}>{printResponseData.outerdimensionOuterMm}</td>
                <td
                  rowSpan={
                    printResponseData?.printLocationOuterbagDetails?.length + 4
                  }
                  colSpan={1}
                >
                  On Outer Carton :<br /> (To be stamped)
                </td>
                <td colSpan={2}>Lotcode</td>
                <td colSpan={3}>{printResponseData.outernumberOfPly}</td>
              </tr>

              <tr>
                <td colSpan={2}>No. of Ply</td>
                <td colSpan={7}>{printResponseData.outernumberOfPly}</td>
                <td colSpan={2}>PO No.</td>
                <td colSpan={3}>{printResponseData.poNoInnerCarton}</td>
              </tr>
              <tr>
                <td colSpan={2}>Flute</td>
                <td colSpan={7}>{printResponseData.outerflute}</td>
                <td colSpan={2}>Mfg. Date - </td>
                <td colSpan={3}>{printResponseData.mfgDateOuterCarton}</td>
              </tr>
              <tr>
                <td colSpan={2}>Bursting Strength</td>
                <td colSpan={7}>{printResponseData.outerburstingstrenght}</td>
                <td colSpan={2}>Expiry date</td>
                <td colSpan={3}>{printResponseData.expiryDateOuterCarton}</td>
              </tr>

              {printResponseData?.plyColors?.map((detail, index) => {
                const sku =
                  printResponseData?.printLocationOuterbagDetails?.[index] ||
                  {};
                return (
                  <tr key={`row-${index}`}>
                    <td colSpan={2}>{detail.colorName}</td>
                    <td colSpan={2}>{detail.plycolor1}</td>
                    <td colSpan={2}>{detail.plycolor2}</td>
                    <td colSpan={3}>{detail.plycolor3}</td>
                    <td colSpan={2}>{sku.outerCartonparameter || "NA"}</td>
                    <td colSpan={3}>{sku.printLocationOuterCarton || "NA"}</td>
                  </tr>
                );
              })}
              {printResponseData?.printLocationOuterbagDetails
                ?.slice(printResponseData.plyColors.length)
                .map((sku, index) => (
                  <tr key={`sku-only-${index}`}>
                    <td colSpan={2}>NA</td>
                    <td colSpan={2}>NA</td>
                    <td colSpan={2}>NA</td>
                    <td colSpan={3}>NA</td>
                    <td colSpan={2}>{sku.outerCartonparameter}</td>
                    <td colSpan={3}>{sku.printLocationOuterCarton}</td>
                  </tr>
                ))}
              <>
                {printResponseData?.outercottonDetails?.map((data, index) => (
                  <tr key={index}>
                    <td colSpan={2}>{data.parameter}</td>
                    <td colSpan={7}>{data.boardgsm}</td>
                    {index === 0 &&
                      printResponseData?.outercottonDetails?.length > 0 && (
                        <>
                          <td
                            rowSpan={
                              printResponseData?.outercottonDetails?.length
                            }
                            colSpan={6}
                            style={{
                              textAlign: "center",
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                              maxWidth: "200px",
                            }}
                          >
                            {printResponseData?.nomenclature}
                          </td>
                        </>
                      )}
                  </tr>
                ))}
              </>
              <tr>
                <td
                  rowSpan={printResponseData?.sealingqualityDetails?.length + 2}
                  style={{
                    width: "2%",
                    verticalAlign: "top",
                    borderTop: "none",
                  }}
                >
                  E
                </td>
                <td colSpan={8}>Sealing Quality :</td>
                <td
                  rowSpan={
                    printResponseData?.productDevStrikerDetails?.length + 2
                  }
                  colSpan={1}
                >
                  H
                </td>
                <td colSpan={6}> Sticker requirements:</td>
              </tr>
              <tr>
                <td colSpan={2}>Bag Seal : </td>
                <td colSpan={7}>{printResponseData.bagseal}</td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  Barcode Sticker:
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {printResponseData?.barcodesticker}
                </td>
              </tr>
              {printResponseData?.sealingqualityDetails?.map(
                (detail, index) => {
                  const sku =
                    printResponseData?.productDevStrikerDetails?.[index] || {};
                  return (
                    <tr key={`row-${index}`}>
                      <td colSpan={2}>{detail.parameter}</td>
                      <td colSpan={7}>{detail.cartonseal}</td>

                      <td colSpan={1} style={{ textAlign: "center" }}>
                        {sku.parameter || "NA"}
                      </td>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        {sku.plainboxsticker || "NA"}
                      </td>
                    </tr>
                  );
                }
              )}
              {printResponseData?.sealingqualityDetails
                ?.slice(printResponseData.productDevStrikerDetails.length)
                .map((sku, index) => (
                  <tr key={`sku-only-${index}`}>
                    <td colSpan={2}>NA</td>
                    <td colSpan={7}>NA</td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      {sku.parameter}
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {sku.plainboxsticker}
                    </td>
                  </tr>
                ))}
              <tr>
                <td
                  colspan={9}
                  rowSpan={printResponseData?.packingMethodDetails?.length + 4}
                >
                  Nature of Change :<br /> {printResponseData.natureofchange}
                </td>
                <td
                  colSpan={1}
                  rowSpan={printResponseData?.packingMethodDetails?.length + 4}
                >
                  I
                </td>
                <td colSpan={6}>Packing Method :</td>
              </tr>
              <tr>
                <td colSpan={1}>
                  Alignment of Inner <br /> Carton : (LxWxH)
                </td>
                <td colSpan={5}>{printResponseData.alighmentofinnercarton}</td>
              </tr>
              <tr>
                <td colSpan={1}>
                  Orientation of Inner
                  <br /> Carton :
                </td>
                <td colSpan={5}>
                  {printResponseData.orienatationofinnercarton}
                </td>
              </tr>
              <tr>
                <td colSpan={1}>
                  Alignment of packs :<br /> (LxWxH)
                </td>
                <td colSpan={5}>{printResponseData?.alighmentofpacks}</td>
              </tr>
              <>
                {printResponseData?.packingMethodDetails?.map((data, index) => (
                  <tr key={index}>
                    <td colSpan={1}>{data.parameter}</td>
                    <td colSpan={5}>{data.orientationofpacks}</td>
                  </tr>
                ))}
              </>
              <tr>
                {printResponseData?.packingMethodDetails?.length > 0 && (
                  <>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      Prepared by :<br />
                      (Development)
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      Reviewed by <br />
                      (QC)
                    </td>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      Approved by <br />
                      (QA)
                    </td>
                  </>
                )}
              </tr>
              <tr>
                <td colSpan={4} style={{ height: "50px", textAlign: "center" }}>
                  {getImageDev && (
                    <img
                      src={getImageDev}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.developmentSupervisorSign}
                  <br />
                  {formatDate(printResponseData.developmentSupervisorSubmitOn)}
                </td>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  {" "}
                  {getImageQC && (
                    <img
                      src={getImageQC}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.qcSign}
                  <br />
                  {formatDate(printResponseData.qcSubmitOn)}
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  {" "}
                  {getImageQA && (
                    <img
                      src={getImageQA}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.qa_sign}
                  <br />
                  {formatDate(printResponseData.qa_submit_on)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  rowSpan={2}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Accepted by HOD <br />/ Designee
                  <br /> Sign & Date
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  PPC
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Bleaching
                </td>
                <td colSpan={2} style={{ height: "35px", textAlign: "center" }}>
                  Spunlace
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Pad Punching
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Dry Goods
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {" "}
                  {getImagePPC && (
                    <img
                      src={getImagePPC}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.ppc_sign}
                  <br />
                  {formatDate(printResponseData.ppc_submit_on)}
                </td>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {" "}
                  {getImageBleaching && (
                    <img
                      src={getImageBleaching}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.bleaching_sign}
                  <br />
                  {formatDate(printResponseData.bleaching_submit_on)}
                </td>
                <td colSpan={2} style={{ height: "60px", textAlign: "center" }}>
                  {" "}
                  {getImageSpunlace && (
                    <img
                      src={getImageSpunlace}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.spunlace_sign}
                  <br />
                  {formatDate(printResponseData.spunlace_submit_on)}
                </td>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {" "}
                  {getImagePadPunching && (
                    <img
                      src={getImagePadPunching}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.pad_punching_sign}
                  <br />
                  {formatDate(printResponseData.pad_punching_submit_on)}
                </td>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {" "}
                  {getImageDryGoods && (
                    <img
                      src={getImageDryGoods}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.dry_goods_sign}
                  <br />
                  {formatDate(printResponseData.dry_goods_submit_on)}
                </td>
              </tr>
              <tr style={{ pageBreakBefore: "always" }}>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  PDS No. :
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData.pdsNo}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Rev. No:
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData.revisionNo}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Rev.Date:
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  {formatDates(printResponseData.revisionDate)}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  PDS Effective Date:
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {formatDates(printResponseData.pdseffectiveDate)}
                </td>
              </tr>
              <tr>
                <td colSpan={17}></td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  I Inner Film:
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  {getImageInnerFilmI &&
                  getImageInnerFilmI.startsWith("data:image") ? (
                    <img
                      src={getImageInnerFilmI}
                      style={{
                        width: "80%",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                      alt="Inner Film I"
                    />
                  ) : (
                    <span>NA</span>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  II Outer Film:
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  {getImageOuterFilmII &&
                  getImageOuterFilmII.startsWith("data:image") ? (
                    <img
                      src={getImageOuterFilmII}
                      style={{
                        width: "80%",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                      alt="Outer Film II"
                    />
                  ) : (
                    <span>NA</span>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  III Inner Carton:
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  {getImageInnerCartonIII &&
                  getImageInnerCartonIII.startsWith("data:image") ? (
                    <img
                      src={getImageInnerCartonIII}
                      style={{
                        width: "80%",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                      alt="Inner Carton III"
                    />
                  ) : (
                    <span>NA</span>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  IV Outer Carton:
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  {getImageOuterCartonIV &&
                  getImageOuterCartonIV.startsWith("data:image") ? (
                    <img
                      src={getImageOuterCartonIV}
                      style={{
                        width: "80%",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                      alt="Outer Carton IV"
                    />
                  ) : (
                    <span>NA</span>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  Slip Sheet:
                </td>
              </tr>
              <tr>
                <td colSpan={17} style={{ textAlign: "center" }}>
                  {getSlipSheetImage &&
                  getSlipSheetImage.startsWith("data:image") ? (
                    <img
                      src={getSlipSheetImage}
                      style={{
                        width: "80%",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                      alt="Outer Carton IV"
                    />
                  ) : (
                    <span>NA</span>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Slip sheet Specifications
                </td>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  Cartons per Slip Sheet
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ padding: "8px", textAlign: "center" }}>
                  Length
                </td>
                <td colSpan={3} style={{ padding: "8px", textAlign: "center" }}>
                  {printResponseData.length}
                </td>
                <td colSpan={3} style={{ padding: "8px", textAlign: "center" }}>
                  Length-Wise
                </td>
                <td colSpan={2} style={{ padding: "8px", textAlign: "center" }}>
                  {printResponseData.lengthWise}
                </td>
                <td colSpan={5} style={{ padding: "8px", textAlign: "center" }}>
                  {printResponseData.lengthWiseDimension}
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ padding: "8px", textAlign: "center" }}>
                  Width
                </td>
                <td colSpan={3} style={{ padding: "8px", textAlign: "center" }}>
                  {printResponseData.width}
                </td>
                <td colSpan={3} style={{ padding: "8px", textAlign: "center" }}>
                  Width-Wise
                </td>
                <td colSpan={2} style={{ padding: "8px", textAlign: "center" }}>
                  {printResponseData.widthWise}
                </td>
                <td colSpan={5} style={{ padding: "8px", textAlign: "center" }}>
                  {printResponseData.widthWiseDimension}
                </td>
              </tr>
              <>
                <tr>
                  {printResponseData?.cartonsperSlipSheetDetails?.length >
                    0 && (
                    <>
                      <td
                        rowSpan={
                          printResponseData?.cartonsperSlipSheetDetails
                            ?.length + 1
                        }
                        colSpan={3}
                        style={{ padding: "8px", textAlign: "center" }}
                      >
                        Thickness
                      </td>
                      <td
                        rowSpan={
                          printResponseData?.cartonsperSlipSheetDetails
                            ?.length + 1
                        }
                        colSpan={3}
                        style={{ padding: "8px", textAlign: "center" }}
                      >
                        {printResponseData.thickness}
                      </td>
                    </>
                  )}
                </tr>
                {printResponseData?.cartonsperSlipSheetDetails?.map(
                  (data, index) => (
                    <tr key={index}>
                      <td
                        colSpan={3}
                        style={{ padding: "8px", textAlign: "center" }}
                      >
                        {data.parameter}
                      </td>
                      <td
                        colSpan={2}
                        style={{ padding: "8px", textAlign: "center" }}
                      >
                        {data.heightWise}
                      </td>
                      <td
                        colSpan={5}
                        style={{ padding: "8px", textAlign: "center" }}
                      >
                        {data.heightWiseDimension}
                      </td>
                    </tr>
                  )
                )}
              </>
              <>
                {printResponseData?.slipsheetSpecificationsDetails?.map(
                  (data, index) => (
                    <tr key={index}>
                      <td
                        colSpan={3}
                        style={{ padding: "8px", textAlign: "center" }}
                      >
                        {data.parameter}
                      </td>
                      <td
                        colSpan={3}
                        style={{ padding: "8px", textAlign: "center" }}
                      >
                        {data.pullSide}
                      </td>
                      {index === 0 &&
                        printResponseData?.slipsheetSpecificationsDetails
                          ?.length > 0 && (
                          <>
                            <td
                              rowSpan={
                                printResponseData
                                  ?.slipsheetSpecificationsDetails?.length
                              }
                              colSpan={3}
                              style={{ padding: "8px", textAlign: "center" }}
                            >
                              Total
                            </td>
                            <td
                              rowSpan={
                                printResponseData
                                  ?.slipsheetSpecificationsDetails?.length
                              }
                              colSpan={7}
                              style={{ textAlign: "center" }}
                            >
                              {printResponseData?.total}
                            </td>
                          </>
                        )}
                    </tr>
                  )
                )}
              </>
              <tr>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Prepared by :<br />
                  (Development)
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Reviewed by <br />
                  (QC)
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Approved by <br />
                  (QA)
                </td>
                <td colSpan={7} rowSpan={2} style={{ height: "50px" }}>
                  Nature of Change :{printResponseData.natureofchange}
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ height: "50px" }}>
                  {getImageDev && (
                    <img
                      src={getImageDev}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.developmentSupervisorSign}
                  <br />
                  {formatDate(printResponseData.developmentSupervisorSubmitOn)}
                </td>
                <td colSpan={3}>
                  {" "}
                  {getImageQC && (
                    <img
                      src={getImageQC}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.qcSign}
                  <br />
                  {formatDate(printResponseData.qcSubmitOn)}
                </td>
                <td colSpan={3}>
                  {" "}
                  {getImageQA && (
                    <img
                      src={getImageQA}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.qa_sign}
                  <br />
                  {formatDate(printResponseData.qa_submit_on)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  rowSpan={2}
                  style={{ height: "35px", textAlign: "center" }}
                >
                  Accepted by HOD <br />/ Designee
                  <br /> Sign & Date
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  PPC
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Bleaching
                </td>
                <td colSpan={2} style={{ height: "35px", textAlign: "center" }}>
                  Spunlace
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Pad Punching
                </td>
                <td colSpan={3} style={{ height: "35px", textAlign: "center" }}>
                  Dry Goods
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {getImagePPC && (
                    <img
                      src={getImagePPC}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.ppc_sign}
                  <br />
                  {formatDate(printResponseData.ppc_submit_on)}
                </td>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {getImageBleaching && (
                    <img
                      src={getImageBleaching}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.bleaching_sign}
                  <br />
                  {formatDate(printResponseData.bleaching_submit_on)}
                </td>
                <td colSpan={2} style={{ height: "60px", textAlign: "center" }}>
                  {getImageSpunlace && (
                    <img
                      src={getImageSpunlace}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.spunlace_sign}
                  <br />
                  {formatDate(printResponseData.spunlace_submit_on)}
                </td>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {getImagePadPunching && (
                    <img
                      src={getImagePadPunching}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.pad_punching_sign}
                  <br />
                  {formatDate(printResponseData.pad_punching_submit_on)}
                </td>
                <td colSpan={3} style={{ height: "60px", textAlign: "center" }}>
                  {getImageDryGoods && (
                    <img
                      src={getImageDryGoods}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                        margin: "10px 0",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData.dry_goods_sign}
                  <br />
                  {formatDate(printResponseData.dry_goods_submit_on)}
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Particulars</td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Prepard by
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Reviewed by
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Approved by
                </td>
              </tr>

              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Name</td>
                <td colSpan={5}></td>
                <td colSpan={4}></td>
                <td colSpan={4}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={3}>Signature & Date</td>
                <td colSpan={5}></td>
                <td colSpan={4}></td>
                <td colSpan={4}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* ))} */}
      </div>

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
          <Button
            type="primary"
            onClick={handlePrint}
            icon={<FaPrint color="#00308F" />}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <div style={{ paddingBottom: "2em" }}></div>

      {/* header code above */}

      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <Form.Item>
            <label>PDS No. : </label>
            <input
              placeholder="PDS No"
              value={currentPdsNo}
              style={{ width: "150px", textAlign: "center" }}
              onChange={(e) => setcurrentPdsNo(e.target.value)}
              className="inp-new"
            />
          </Form.Item>
          <Form.Item>
            <Button
              key="Create"
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
              shape="round"
              icon={<BiNavigation />}
              onClick={handleNavigate}
            >
              Go To
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summary}
          pagination={{
            ...pagination,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
          }}
          onChange={handleTableChange}
        />
      </div>

      <Modal
        title="Print"
        open={showModal}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDataSubmit}
            disabled={!pdsNo}
            loading={buttonLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="PDS NO.">
            <Select
              value={pdsNo}
              onChange={handlePdsNoChange}
              options={pdsPrint}
              showSearch
              placeholder="PDS No."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Development_f001_summary;
