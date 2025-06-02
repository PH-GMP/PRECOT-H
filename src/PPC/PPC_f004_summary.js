/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
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

const PPC_f004_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [shift, setShift] = useState("");

  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [productName, setProductName] = useState("");
  const [gsm, setGsm] = useState("");
  const [width, setWidth] = useState("");
  const [unwinder, setUnwinder] = useState("");
  const [rewinder, setRewinder] = useState("");
  const [cutterTrim, setCutterTrim] = useState("");
  const [layonTrim, setLayonTrim] = useState("");
  const [noOfFlagsInRoll, setNoOfFlagsInRoll] = useState("");
  const [pressureAtMinDia, setPressureAtMinDia] = useState("");
  const [uwData, setUwData] = useState("");
  const [tension, setTension] = useState("");
  const [diameter, setDiameter] = useState("");
  const [mixing, setMixing] = useState("");
  const [pattern, setPattern] = useState("");
  const [moisture, setMoisture] = useState("");
  const [thickness, setThickness] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [signImages, setSignImages] = useState({});

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDates = (dateStr) => {
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
  const date1 = formatDates(date);
  const date2 = formatDates(selectedDate);

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
  }
`;

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
      render: (text) => formatDates(text),
    },
    {
      title: "Assistant Status",
      dataIndex: "assistantStatus",
      key: "assistantStatus",
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
            Review
          </Button>
        </>
      ),
    },
  ];

  let columns = baseColumns;

  const handlePrint = () => {
    setShowModal(true);

    // console.loglog("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });

        // console.loglog("edit response", res);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              // Handle potential null or undefined values
              date: x.date || "N/A",
              assistantStatus: x.assistantStatus || "N/A",
              index: x.index,
            }))
          );
        } else {
          setSummary([]); // Set an empty array if data is not as expected
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
      }
    };
    const summaryUrl = `${API.prodUrl}/Precot/api/Ppc/GetPreproductionSummary`;
    if (["ROLE_QA"].includes(userRole)) {
      fetchSummary(summaryUrl);
    }
  }, []);

  console.log("selectedShift", selectedDate);
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  const handleEdit = (x) => {
    // console.loglog("particular ", x);
    navigate("/Precot/PPC/F-004", {
      state: {
        date: x.date,
      },
    });
    // console.loglog("edit screen", x);
  };

  // console.loglog("orderNo", orderNo);
  const handleModalClose = () => {
    setShowModal(false);
    setPrintLoading(false);
    setSelectedDate("");
    setSelectedMonth("");
    setSelectedYear("");
    form.resetFields();
  };

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

  const printSubmit = () => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const selectedMonthFromDate = dateObj.getMonth() + 1; // Months are zero-indexed in JS
      const selectedYearFromDate = dateObj.getFullYear();

      if (
        selectedMonth &&
        selectedYear &&
        (selectedMonthFromDate !== Number(selectedMonth) ||
          selectedYearFromDate !== Number(selectedYear))
      ) {
        message.error(
          "The selected date does not match the selected month and year."
        );
        setSelectedMonth("");
        setSelectedYear("");
        form.resetFields();
        return;
      }
    }
    fetchPrintData();
  };

  const fetchPrintData = () => {
    let baseUrl = `${API.prodUrl}/Precot/api/Ppc/GetPreproductionMeetingPrint?`;
    let query = [];

    // Construct the query based on selected fields
    if (selectedDate) {
      query.push(`date=${selectedDate}`);
    }
    if (selectedMonth) {
      query.push(`month=${selectedMonth}`);
    }
    if (selectedYear) {
      query.push(`year=${selectedYear}`);
    }

    // Join the query parameters to the base URL
    let finalUrl = baseUrl + query.join("&");
    console.log("finalUrl", finalUrl);

    // Make the API call using axios
    const token = localStorage.getItem("token");
    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        console.log("Fetched data:", response.data);

        // Ensure that the response is an array, even if no data is found
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintResponseData(response.data);
          setPrintLoading(true);

          // Extract the participant names
          const participants =
            response.data[0]?.detailsMeeting[0]?.participateName || [];

          // Fetch the signature for each participant
          const fetchSignatures = participants.map((participant) => {
            return axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${participant}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                // Convert image data to base64 string
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;

                // Use the username as the key in signImages
                setSignImages((prev) => ({ ...prev, [participant]: url }));
              })
              .catch((error) => {
                console.error(
                  `Error fetching signature for ${participant}:`,
                  error
                );
              });
          });

          // Wait for all signature requests to finish
          Promise.all(fetchSignatures).then(() => {
            setTimeout(() => {
              window.print(); // Proceed with printing
              handleModalClose(); // Close the modal after printing
            }, 3000);
          });

          console.log("print data", response.data);
        } else {
          setPrintResponseData([]); // Ensure printData is always an array
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose(); // Close modal if no details found
        }
      })
      .catch((error) => {
        setPrintLoading(false);
      });
  };

  const handleNavigate = () => {
    if (date == "") {
      // setError('Please select a date');
      message.warning("Please Select date");
      return;
    }
    navigate("/Precot/PPC/F-004", {
      state: { date: date },
    });
  };

  const formatDate = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
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

  const [pageNumbers, setPageNumbers] = useState([]);
  const itemsPerPage = 1; // Adjust this value based on how many items you want per page

  useEffect(() => {
    // Calculate page numbers based on the response data
    const totalPages = Math.ceil(printResponseData.length / itemsPerPage);
    setPageNumbers(Array.from({ length: totalPages }, (_, index) => index + 1));
  }, [printResponseData]);

  return (
    <div>
      <div id="section-to-print">
        {printResponseData.map((data, index) => (
          <table style={{ marginTop: "30px", scale: "95%" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td
                  style={{ border: "none", padding: "5px" }}
                  colSpan="15"
                ></td>
              </tr>
              <tr style={{ height: "20px" }}>
                <td
                  colSpan="2"
                  rowSpan="4"
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
                <td rowSpan="4" colSpan="5" style={{ textAlign: "center" }}>
                  <b>Pre Production Meeting </b>{" "}
                </td>
                <td colSpan="1">Format No.:</td>
                <td colSpan="3">PH-PPC01-/F-004</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="3">01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="3">PH-PPC01-D-01</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan="1">Page No.:</td>
                <td colSpan="3">
                  {/* {index + 1} of {printResponseData.length} */}
                  {Math.floor(index / itemsPerPage) + 1} of {pageNumbers.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr colSpan="11">
                <td colSpan="11" style={{ height: "15px", width: "50%" }}>
                  DATE: {formatDates(data?.date)}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Customer :</td>
                <td colSpan="6">{data?.customer || "NA"}</td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Brand :</td>
                <td colSpan="6">{data?.brand || "NA"}</td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Product Code</td>
                <td colSpan="6">{data?.productCode || "NA"}</td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Product Description :</td>
                <td colSpan="6">{data?.productDescription || "NA"}</td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">PDS No.: </td>
                <td colSpan="6">{data?.pdsNo || "NA"}</td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Details </td>
                <td colSpan="2">Standard as per PDS</td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Customer <br /> SOP
                </td>
                <td colSpan="2">Observations</td>
              </tr>
              <tr>
                <td colSpan="11" style={{ fontWeight: "bolder" }}>
                  Packaging Details:
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Outer carton Artwork </td>
                <td colSpan="2">
                  {Array.isArray(data?.detailsMeeting) &&
                  data.detailsMeeting.length > 0
                    ? data.detailsMeeting?.[0]?.outerCartonArtwork
                    : "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonArtworkSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonArtworkObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Outer carton Bar-code </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonBarcode || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonBarcodeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonBarcodeObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Outer carton Dimension in mm (L x W x H) </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.outerCartonDimensionLWH || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonDimensionLWH_SOP ||
                    "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]
                    ?.outerCartonDimensionLWHObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Outer carton - Stamp (PO no, Lot no) </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonStamp || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonStampSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerCartonStampObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Odour </td>
                <td colSpan="2">{data?.detailsMeeting?.[0]?.odour || "NA"}</td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.odourSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.odourObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Inner carton Artwork </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonArtwork || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonArtworkSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonArtworkObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Inner carton Bar-code </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonBarcode || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonBarcodeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonBarcodeObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Inner carton Dimension in mm (L x W x H) </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonDimensionLWH || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonDimensionLWH_SOP ||
                    "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]
                    ?.innerCartonDimensionLWHObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Inner carton - Stamp (PO no, Lot no) </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonStamp || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonStampSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerCartonStampObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">
                  Bag appearance on box (bags Height uniformity)
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.bagAppearance || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.bagAppearanceSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.bagAppearanceObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Cello tape (gum tape) pasted shape 75mm </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.celloTapShape || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.celloTapShapeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.celloTapShapeObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Bag orientation in carton (L x W x H) </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.bagOrientation || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.bagOrientationSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.bagOrientationObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">No of inner per outer box </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfInnerBox || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfInnerBoxSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfInnerBoxObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">No of packs per outer bag </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfPacksPerOuterBag || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfPacksPerOuterBagSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]
                    ?.noOfPacksPerOuterBagObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">No of packs per inner carton </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfPacksPerInnerCarton || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfPacksPerInnerCartonSOP ||
                    "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]
                    ?.noOfPacksPerInnerCartonObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">No of packs per outer carton </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfPacksPerOuterCarton || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.noOfPacksPerOuterCartonSOP ||
                    "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]
                    ?.noOfPacksPerOuterCartonObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">
                  Inner box fill the bags artwork towards front side
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBoxArtwork || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.innerBoxArtworkSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.innerBoxArtworkObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">
                  Carton box fill the bags artwork towards front side
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.cartonBoxArtwork || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.cartonBoxArtworkSop || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.cartonBoxArtworkObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Outer bag - Artwork </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagArtwork || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagArtworkSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagArtworkObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Outer bag - Lot code </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagLotcode || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagLotcodeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagLotcodeObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Outer bag - Bar code </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagBarcode || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagBarcodeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.outerBagBarcodeObservations ||
                    "NA"}
                </td>
              </tr>

              <tr colSpan="11">
                <td colSpan="5">Inner bag - Artwork</td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagArtwork || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagArtworkSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagArtworkObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Inner bag - Lot code</td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagLotcode || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagLotcodeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagLotcodeObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Inner bag - Bar code</td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagBarcode || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagBarcodeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.innerBagBarcodeObservations ||
                    "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="11" style={{ fontWeight: "bolder" }}>
                  Parameter Details:
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Carton box gross wt </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.cartonBoxGrossWt || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.cartonBoxGrossWtSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.cartonBoxGrossWtObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Net Wt. of filled bag </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.netWtFilledBag || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.netWtFilledBagSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.netWtFilledBagObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Gross Wt. of filled bag </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.grossWtFilledBag || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.grossWtFilledBagSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.grossWtFilledBagObservations ||
                    "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Count per pack (Nos.) </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.countPerPack || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.countPerPackSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.countPerPackObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Shape </td>
                <td colSpan="2">{data?.detailsMeeting?.[0]?.shape || "NA"}</td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.shapeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.shapeObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Size (mm) </td>
                <td colSpan="2">{data?.detailsMeeting?.[0]?.size || "NA"}</td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.sizeSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.sizeObservations || "NA"}
                </td>
              </tr>
              <tr>
                <td rowSpan="2" colSpan="3">
                  Pattern
                </td>
                <td colSpan="2" rowSpan="1">
                  Side 1
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.patternSide1 || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.patternSide1SOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.patternSide1Observations || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="2" rowSpan="1">
                  Side 2
                </td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.patternSide2 || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.patternSide2SOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.patternSide2Observations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Edge Condition</td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.edgeCondition || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.edgeConditionSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.edgeConditionObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Filling Height (mm)</td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.fillingHeight || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.fillingHeightSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.fillingHeightObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">Spec update in Medline Portal</td>
                <td colSpan="2">
                  {data?.detailsMeeting?.[0]?.specUpdateMedlinePortal || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.specUpdateMedlinePortalSOP ||
                    "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]
                    ?.specUpdateMedlinePortalObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="5">CCP</td>
                <td colSpan="2">{data?.detailsMeeting?.[0]?.ccp || "NA"}</td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.ccpSOP || "NA"}
                </td>
                <td colSpan="2">
                  {" "}
                  {data?.detailsMeeting?.[0]?.ccpObservations || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td
                  colSpan="11"
                  style={{ height: "30px", verticalAlign: "top" }}
                >
                  Remarks: {data?.detailsMeeting?.[0]?.remarks || "NA"}
                </td>
              </tr>
              <tr colSpan="11">
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Department
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Participate Name
                </td>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Sign & Date
                </td>
              </tr>
              {data?.memberDetails?.map((item, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }} colSpan="4">
                    {item.department}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan="5">
                    {item.participate_name}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan="7">
                    <img
                      src={`data:image/png;base64,${item.signature}`}
                      alt="Signature"
                      style={{ maxHeight: "50px" }}
                    />
                    <div>{formatDates(data?.date)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
            <br />
            <tfoot>
              <br />
              <tr style={{ height: "30px" }}>
                <td colSpan={4}>Particulars</td>
                <td colSpan={2}>Prepared by</td>
                <td colSpan={2}>Reviewed by</td>
                <td colSpan={4}>Approved by</td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={4}>Name</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={4}></td>
              </tr>
              <tr style={{ height: "30px" }}>
                <td colSpan={4}>Signature & Date</td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={4}></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

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
          <Form.Item label="Date">
            <Input
              type="date"
              value={date}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setDate(e.target.value)}
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
        />
      </div>
      <Modal
        title="Print"
        open={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printSubmit}
            loading={printLoading}
            disabled={!selectedDate && (!selectedMonth || !selectedYear)}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Select Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
            validateStatus={selectedDate ? "success" : "NA"}
          >
            <Input
              max={today}
              type="date"
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="month"
            label="Select Month"
            rules={[{ required: true, message: "Please select a month" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onChange={(value) => setSelectedMonth(value)}
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
          </Form.Item>
          <Form.Item
            name="year"
            label="Select Year"
            rules={[{ required: true, message: "Please select a year" }]}
          >
            <Select
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onChange={(value) => {
                setSelectedYear(value);
              }}
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
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PPC_f004_summary;
