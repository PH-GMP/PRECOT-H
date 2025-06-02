/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";

import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";

import { GoArrowLeft } from "react-icons/go";

import logo from "../Assests/logo.png";

import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";

import { GrDocumentStore } from "react-icons/gr";

const Spunlace_f17 = () => {
  const initial = useRef(false);
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [ORDER_No, SetORDER_No] = useState("");
  const [STD_WIDTH, SetSTD_WIDTH] = useState("");
  const [MIXING, SetMIXING] = useState("");
  const [MATERIAL_CODE, SetMATERIAL_CODE] = useState("");
  const [STD_ROLL_DIA, SetSTD_ROLL_DIA] = useState("");
  const [PRODUCT_NAME, SetPRODUCT_NAME] = useState("");
  const [PATTERN, SetPATTERN] = useState("");
  const [STD_THICKNESS, SetSTD_THICKNESS] = useState("");
  const [STD_GSM, SetSTD_GSM] = useState("");
  const [SHAFT_No, SetSHAFT_No] = useState("");
  const [ROLL_No, SetROLL_No] = useState("");
  const [LENGTH_MTRS, SetLENGTH_MTRS] = useState("");
  const [WIDTH_MM, SetWIDTH_MM] = useState("");
  const [NET_WT, SetNET_WT] = useState("");
  const [ROLL_GSM, SetROLL_GSM] = useState("");
  const [MOISTURE, SetMOISTURE] = useState("");
  const [ROLL_DIA, SetROLL_DIA] = useState("");
  const [REMARKS, SetREMARKS] = useState("");
  const [STD_MOISTURE, SetSTD_MOISTURE] = useState("");
  const [orderDetails, SetOrderDetails] = useState([]);
  const [orderDetails_sliterWinderLeft, SetOrderDetails_sliterWinderLeft] =
    useState([]);
  const [getOrderDetails, SetGetOrderDetails] = useState([]);
  const [NewSave, setNewSave] = useState(false);

  const [formattedOperatordate, setformattedOperatorDate] = useState("");
  const [formattedSupervisordate, setformattedSupervisorDate] = useState("");
  const [formattedHODdate, setformattedHODDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  console.log("state of selected", selectedRow[0]);
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const [modalData, setmodalData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [orderDescription, setOrderDescription] = useState("");
  const [OverallID, setOverallID] = useState("");
  const [id, setid] = useState("");

  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState("");
  const [OperatorSign, setOperatorSign] = useState("");
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState("");
  const [Operatorstatus, setOperatorstatus] = useState("");
  const [SupervisorStatus, setSupervisorStatus] = useState("");
  const [HodStatus, setHodStatus] = useState("");
  const [ReportDetails, setReportDetails] = useState([]);

  const [summaryData, setSummaryData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  console.log("supervisor", selectedRow?.supervisor_status);

  const roleBase = localStorage.getItem("role");
  const canDisplayButtons = () => {
    if (roleBase === "ROLE_OPERATOR") {
      if (
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status === "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      }
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleBase == "ROLE_OPERATOR") {
      if (selectedRow?.operator_status == "OPERATOR_APPROVED") {
        return "none";
      } else if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status == "WAITING_FOR_APPROVAL" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canEdit = () => {
    if (roleBase === "ROLE_OPERATOR") {
      return !(
        (selectedRow && selectedRow?.operator_status === "OPERATOR_APPROVED")
        //  &&
        // selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED" &&
        // selectedRow?.hod_status !== "HOD_REJECTED"
      );
    } else if (roleBase === "ROLE_SUPERVISOR") {
      return !(
        (selectedRow &&
          selectedRow?.operator_status === "OPERATOR_APPROVED" &&
          (selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
            selectedRow?.supervisor_status === "WAITING_FOR_APPROVAL") &&
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
        "HOD_APPROVED"
      );
    } else if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        (selectedRow?.hod_status === "HOD_APPROVED" ||
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-17/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-17/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };
  const isEditable = canEdit();
  const data1 = [
    { id: 1, name: "John", age: 28 },
    { id: 2, name: "Jane", age: 32 },
    { id: 3, name: "Doe", age: 24 },
    { id: 4, name: "Doe", age: 24 },
  ];

  const data2 = [
    { id: 1, city: "New York", country: "USA" },
    { id: 2, city: "London", country: "UK" },
    { id: 3, city: "London", country: "UK" },
    // Uncomment to simulate uneven rows
    // { id: 3, city: 'Paris', country: 'France' },
  ];
  const maxRows = Math.max(
    orderDetails.length,
    orderDetails_sliterWinderLeft.length
  );
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { state } = location;
  const { newdate, shiftvalue, orderNo } = state || {};

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      console.log("Date new", newdate);
      if (newdate) {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(newdate));

        setDate(formattedDate);

        console.log("PHNo create", newdate);
      }
      if (shiftvalue) {
        setShift(shiftvalue);
        console.log("Supplier create", shiftvalue);
      }
      if (orderNo) {
        SetORDER_No(orderNo);
        console.log("Supplier create", orderNo);
      }

      // Fetch data from API
      const fetchOrderDescription = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/spulance/sampleReportOrders`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data;

          const order = data.find((item) => item.value === orderNo);
          if (order) {
            setOrderDescription(`${order.value}/${order.description}`);
          } else {
            setOrderDescription(orderNo);
          }
        } catch (error) {
          console.error("Error fetching order description:", error);
        }
      };

      fetchOrderDescription();
    }
  }, [newdate, shiftvalue, orderNo]);

  const handleClick = () => {
    // handleSubmit();
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const token = localStorage.getItem("token");

  const handlePrint = () => {
    window.print();
  };

  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    // setGotobtn(false);
  };

  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift; // Return the original value if it doesn't match any case
    }
  };

  const handleSave = () => {
    setSaveLoading(true);

    console.log("Date1", token);
    console.log("Orderdetails", orderDetails);
    console.log("Orderdetailssliter", orderDetails_sliterWinderLeft);
    if (orderDetails.length == 0 || orderDetails == "[]") {
      message.warning("No data Found");
      navigate("/Precot/Spunlace/F-17/Summary");
    } else {
      const parsedDate = moment(date, "DD/MM/YYYY"); // Parse the date
      const dateformat = parsedDate.format("YYYY-MM-DD");

      const payload = {
        reportId: id,
        unit: "Unit H",
        formatNo: "PH-PRD02/F-016",
        formatName: "SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        date: dateformat,
        orderNo: ORDER_No,
        materialCode: MATERIAL_CODE,
        productName: PRODUCT_NAME,
        pattern: PATTERN,
        stdGsm: STD_GSM,

        reportDetails: orderDetails_sliterWinderLeft.map((detail, index) => ({
          detail_id: detail.detailId,
          splShaftNo: orderDetails[index].ShaftID || "" || null || [],
          splRollNo: detail.BaleCount,
          splRollWeight: detail.TotalGrsWt,
          splRollWidth: detail.TotalTWid,
          splRollLength: detail.TotalPLen,
          reportId: detail.id,

          //
        })),
        sliterWinderDetails: orderDetails.map((detail, index) => ({
          swId: detail.swId,
          swRollNo: detail.ShaftID || "" || null || [],
          swRollLength: detail.PLen || "",
          swSingleRollWeight: detail.GrsWt || "",
          splNoOfRolls: detail.BaleCount || "",
          swTotalWeight: detail.GrsWt || "",
          swSideTrimWaste: detail.GrsWt,
          remarks: remarks[index] || "NA",
          reportId: detail.reportId,

          // remarks: remarks[index]
        })),
      };
      console.log("payload value", payload);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${ API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/SaveShiftWiseSliterWinderProdReport
   `,
          payload,
          { headers }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate("/Precot/Spunlace/F-17/Summary");
        })
        .catch((err) => {
          console.log("Error", err);
          const errorMessage =
            err?.response?.data?.message ||
            "An error occurred while saving the form";
          message.error(errorMessage);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
    // console.log("Orderdetails23",orderDetails_sliterWinderLeft);
  };

  const handleSubmit = () => {
    setSaveLoading(true);
    console.log("Date1", token);
    const parsedDate = moment(date, "DD/MM/YYYY"); // Parse the date
    const dateformat = parsedDate.format("YYYY-MM-DD");
    const payload = {
      reportId: id,
      unit: "Unit H",
      formatNo: "PH-PRD02/F-016",
      formatName: "SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT",
      refSopNo: "PH-PRD02-D-03",
      revisionNo: "01",
      shift: shift,
      date: dateformat,
      orderNo: ORDER_No,
      materialCode: MATERIAL_CODE,
      productName: PRODUCT_NAME,
      pattern: PATTERN,
      stdGsm: STD_GSM,

      reportDetails: orderDetails_sliterWinderLeft.map((detail, index) => ({
        detail_id: detail.detailId,
        splShaftNo: orderDetails[index].ShaftID,
        splRollNo: detail.BaleCount,
        splRollWeight: detail.TotalGrsWt,
        splRollWidth: detail.TotalTWid,
        splRollLength: detail.TotalPLen,
        reportId: detail.id,

        //
      })),
      sliterWinderDetails: orderDetails.map((detail, index) => ({
        swId: detail.swId,
        swRollNo: detail.ShaftID || "",
        swRollLength: detail.PLen || "",
        swSingleRollWeight: detail.GrsWt || "",
        splNoOfRolls: detail.BaleCount || "",
        swTotalWeight: detail.GrsWt || "",
        swSideTrimWaste: detail.GrsWt,
        remarks: remarks[index] || "NA",
        reportId: detail.reportId,

        // remarks: remarks[index]
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/SubmitShiftWiseSliterWinderProdReport`,
        payload,
        { headers }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Form Submit Successfully");
        navigate("/Precot/Spunlace/F-17/Summary");
      })
      .catch((err) => {
        console.log("Error", err);
        const errorMessage =
          err?.response?.message || "An error occurred while saving the form";
        message.error(errorMessage);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  useEffect(() => {
    if (orderNo) {
      checkBmrExists(orderNo);
    }
  }, [orderNo]);

  const checkBmrExists = async (orderNo) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/orderDetails?order=${orderNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      if (response.data && response.data.length > 0) {
        const data = response.data;
        console.log("data", data);

        console.log("inside data", data);
        SetPRODUCT_NAME(data[0].customerName);
        SetSTD_GSM(data[0].gsm);
        SetMATERIAL_CODE(data[0].material);
        SetMIXING(data[0].mix);
        SetPATTERN(data[0].patternDescription);
        SetSTD_WIDTH(data[0].width);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (orderNo) {
      fetchPDEData();
    }
  }, []);

  const fetchPDEData = async () => {
    const { newdate, shiftvalue, orderNo } = state || {};

    console.log("new Date", newdate);

    const numberShift = convertShiftValue(shiftvalue);
    try {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${ API.prodUrl}/Precot/api/spulance/roleGoodDetails?order=${orderNo}&date=${newdate}&shift=${numberShift}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const { sliterWinder, sliterWinderLeft } = response.data;
          console.log("response shift", sliterWinder);
          if (Array.isArray(sliterWinder) && sliterWinder.length > 0) {
            SetOrderDetails(sliterWinder);
          } else {
            console.log("sliterWinder is empty or not an array");
          }

          if (Array.isArray(sliterWinderLeft) && sliterWinderLeft.length > 0) {
            SetOrderDetails_sliterWinderLeft(sliterWinderLeft);
          } else {
            console.log("sliterWinderLeft is empty or not an array");
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;

      const fetchDataAsync = async () => {
        const data = await fetchGet(token);
        if (data && data.reportDetails) {
          SetOrderDetails(data.reportDetails);
          const newRemarks = data.reportDetails.map((detail) => detail.remarks);
          setRemarks(newRemarks);
        } else {
          console.error("Invalid data format", data);
        }
      };

      fetchDataAsync();
    }
  }, []);

  useEffect(() => {
    if (!initial.current) {
      if (ReportDetails) {
        const initialRemarks = ReportDetails.map((detail) => detail.remarks);
        setRemarks(initialRemarks);
      }
    }
  }, [ReportDetails]);

  useEffect(() => {
    initial.current = true;

    fetchGet();
  }, []);

  const fetchGet = async () => {
    const { newdate, shiftvalue, orderNo } = state || {};

    try {
      const token = localStorage.getItem("token");
      const response = await axios
        .get(
          `${ API.prodUrl}/Precot/api/spunlace/Service/ShiftWiseSliterWinderProdReport/getByDateShiftOrderNo?orderNo=${orderNo}&date=${newdate}&shift=${shiftvalue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("response Fecthget", response.data.operator_submitted_on);

          console.log("responsedata", response.data);
          console.log("appi", response.data.operator_sign);
          setHodSign(response.data.hod_sign);
          setOperatorSign(response.data.operator_sign);
          setSelectedRow(response.data);
          setSupervisorSign(response.data.supervisor_sign);
          const formattedOperatorDate = moment(
            response.data.operator_submitted_on
          ).format("DD/MM/YYYY HH:mm");

          setformattedOperatorDate(formattedOperatorDate);
          const formattedSupervisordate = moment(
            response.data.supervisor_submit_on
          ).format("DD/MM/YYYY HH:mm");

          setformattedSupervisorDate(formattedSupervisordate);

          const formattedHoddate = moment(response.data.hod_submit_on).format(
            "DD/MM/YYYY HH:mm"
          );

          setformattedHODDate(formattedHoddate);

          setOverallID(response.data.reportId);
          setid(response.data.reportId);
          console.log("recordid", OverallID);
          setReportDetails(response.data.sliterWinderDetails);
          setSupervisorSign(response.data.supervisor_sign);
          setSelectedRow(response.data);
          if (roleBase === "ROLE_SUPERVISOR") {
            if (
              response.data.supervisor_status === "SUPERVISOR_REJECTED" ||
              response.data.hod_status === "HOD_REJECTED"
            ) {
              message.warning(
                "Operator Not Yet Approved or Previous Stage Rejected"
              );
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-17/Summary");
              }, 1500);
            }
          }
          if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
            if (
              response.data.operator_status !== "OPERATOR_APPROVED" ||
              response.data.supervisor_status !== "SUPERVISOR_APPROVED" ||
              response.data.supervisor_status === "SUPERVISOR_REJECTED" ||
              response.data.hod_status === "HOD_REJECTED"
            ) {
              message.warning(
                "Operator Not Yet Approved or Previous Stage Rejected"
              );
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-17/Summary");
              }, 1500);
            }
          }

          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data?.operator_sign}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              console.log("Response:", res.data);
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImageOP(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          //////////////////
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data?.supervisor_sign}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              console.log("Response:", res.data);
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImageSUP(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          /////////////////////
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${response.data?.hod_sign}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              console.log("Response:", res.data);
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImageHOD(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
          const newRemarkvalue = response.data.sliterWinderDetails.map(
            (detail) => detail.remarks
          );
          setRemarks(newRemarkvalue);
          const reportdetail = response.data.reportDetails.map((details) => {
            return details.detailId;
          });
          console.log("reportdetailid", reportdetail);

          console.log("Report id", response.data.reportDetails);
          console.log("values", ReportDetails);
          response.data.length == 0 ? setNewSave(true) : setNewSave(false);

          SetGetOrderDetails(response.data);

          // console.log("selectedRow", response.data[0])

          setHodStatus(response.data.hod_status);

          setHodSubmitOn(response.data.hod_submit_on);

          setOperatorstatus(response.data[0].operator_status);
          setOperatorSubmitOn(response.data[0].operator_submitted_on);

          setSupervisorStatus(response.data[0].supervisor_status);
          setSupervisorSubmitOn(response.data[0].supervisor_submit_on);

          const newRemarks = response.data[0].sliterWinderDetails.map(
            (detail) => detail.remarks
          );
          setRemarks(newRemarks);

          setOverallID(response.data[0].report_id);
          console.log("Report id", response.data[0].report_id);

          // SetMATERIAL_CODE(response.data.materialCode);
          console.log("responsedata1", response.data.operator_sign);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-17/Summary");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const processData = (data) => {
    if (!Array.isArray(data)) {
      console.error("Input data is not an array");
      return [];
    }
    // Create a map to group items by ShaftID
    const groupedByShaftID = data.reduce((acc, item) => {
      if (!acc[item.ShaftID]) {
        acc[item.ShaftID] = [];
      }
      acc[item.ShaftID].push(item);
      return acc;
    }, {});

    // Add index to each item within the same ShaftID group
    const processedData = Object.values(groupedByShaftID).flatMap((group) =>
      group.map((item, index) => ({
        ...item,
        ShaftIndex: index,
      }))
    );

    return processedData;
  };

  // Processed sliterWinder data with added index
  const processedSliterWinder = processData(orderDetails);

  console.log("value data", processedSliterWinder);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orderDetails.length / itemsPerPage);

  const [remarks, setRemarks] = useState(Array(currentItems.length).fill(""));

  const handleRemarksChange = (e, index) => {
    const newRemarks = [...remarks];
    newRemarks[indexOfFirstItem + index] = e.target.value;
    setRemarks(newRemarks);
  };

  const formattedOperatorDate = OperatorSubmitOn
    ? moment(OperatorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedSupervisorDate = SupervisorSubmitOn
    ? moment(SupervisorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = HodSubmitOn
    ? moment(HodSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const items = [
    {
      key: "1",
      label: <p>SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table border="1">
            <thead>
              <tr>
                <th colSpan={13}>SPUNLACE SHAFT/ROLL DETAILS</th>
                <th colSpan={15}>SLITER WINDER</th>
              </tr>

              <tr>
                <th colSpan="1" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  SHAFT NO
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  ROLL NO
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  ROLL WEIGHT IN KG
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  ROLL WIDTH IN MM
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  ROLL LENGTH IN MTRS
                </th>
                {/* rightside values  */}
                <th colSpan="2" style={{ textAlign: "center" }}>
                  ROLL NO
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  ROLL LENGTH IN MTRS
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  SINGLE ROLL WEIGHT IN KG
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  NO OF ROLLS SLITED
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  TOTAL WEIGHT IN KG
                </th>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  SIDE TRIM WASTE IN KG
                </th>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  REMARKS
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((order, index) => {
                // Determine the index for sliterWinderLeftData
                const uniqueShaftIDs = [
                  ...new Set(orderDetails.map((item) => item.ShaftID)),
                ];
                const shaftIndex = uniqueShaftIDs.indexOf(order.ShaftID);
                const sliterWinderLeftData =
                  orderDetails_sliterWinderLeft[shaftIndex] || {};

                return (
                  <tr key={index}>
                    {/* sliterWinderLeft data */}
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {order.ShaftID}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {sliterWinderLeftData.BaleCount || ""}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {sliterWinderLeftData.TotalGrsWt || ""}
                    </td>

                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {sliterWinderLeftData.TotalTWid || ""}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {sliterWinderLeftData.TotalPLen || ""}
                    </td>
                    {/* orderDetails data */}
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {order.BaleNo}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {order.PLen}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {order.GrsWt}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {order.BaleCount}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {order.PWid}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {order.GrsWt}
                    </td>

                    <td
                      colSpan="3"
                      style={{ textAlign: "center", width: "100px" }}
                    >
                      <input
                        type="text"
                        value={remarks[indexOfFirstItem + index] || ""}
                        onChange={(e) => handleRemarksChange(e, index)}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          border: "none",
                          outline: "none",
                          paddingLeft: "5px",
                        }}
                        disabled={!isEditable}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto" }}>
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Operator Sign & Date
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>

              <td colSpan="10" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
            </tr>

            <tr>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                {selectedRow?.operator_status === "OPERATOR_APPROVED" && (
                  <>
                    {OperatorSign}
                    <br />
                    {formattedOperatordate}
                    <br />

                    {getImageOP && (
                      <>
                        <br />
                        <img
                          src={getImageOP}
                          alt="logo"
                          className="signature"
                        />
                      </>
                    )}
                  </>
                )}
              </td>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                {(selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
                  selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
                  selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED") && (
                  <>
                    {SupervisorSign}
                    <br />
                    {formattedSupervisordate}
                    <br />
                    {getImageSUP && (
                      <>
                        <br />
                        <img
                          src={getImageSUP}
                          alt="logo"
                          className="signature"
                        />
                      </>
                    )}
                  </>
                )}
              </td>

              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                {(selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED") && (
                  <>
                    {HodSign}
                    <br />
                    {formattedHODdate}
                    <br />

                    {getImageHOD && (
                      <>
                        <br />
                        <img
                          src={getImageHOD}
                          alt="logo"
                          className="signature"
                        />
                      </>
                    )}
                  </>
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
      <BleachingHeader
        unit="Unit-H"
        formName="SHIFT WISE DAILY SLITER WINDER PRODUCTION REPORT"
        formatNo="PH-PRD02/F-016"
        sopNo="PH-PRD02-D-03"
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
          ...(roleBase === "ROLE_HOD" ||
          roleBase === "ROLE_SUPERVISOR" ||
          roleBase === "ROLE_QC" ||
          roleBase === "ROLE_DESIGNEE"
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
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButton2(),
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSubmit}
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
                navigate("/Precot"); // Ensure navigate is defined or imported
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "5px",
        }}
      >
        <Input
          addonBefore="Date"
          placeholder="Date"
          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Shift"
          placeholder="SHIFT"
          readOnly
          value={shift}
          style={{ width: "100%", height: "35px" }}

          // onChange={(e) => setBmr_No(e.target.value)}
        />

        <Input
          addonBefore="Order No"
          placeholder="ORDER No"
          readOnly
          value={orderDescription}
          style={{ width: "100%", height: "35px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          marginTop: "5px",
        }}
      >
        <Input
          addonBefore="Product Name"
          placeholder="PRODUCT NAME"
          readOnly
          value={PRODUCT_NAME}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Material Code"
          placeholder="MATERIAL CODE"
          readOnly
          value={MATERIAL_CODE}
          style={{ width: "100%", height: "35px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
        <Input
          addonBefore="STD GSM"
          placeholder="STD GSM"
          readOnly
          value={STD_GSM}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Pattern"
          placeholder="PATTERN"
          readOnly
          value={PATTERN}
          style={{ width: "100%", height: "35px" }}
        />
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

export default Spunlace_f17;
