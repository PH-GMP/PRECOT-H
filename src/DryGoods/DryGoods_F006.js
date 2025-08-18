/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { CheckOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Tabs,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
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

const DryGoods_f06 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const initial = useRef(false);
  const location = useLocation();
  const { state } = location;
  const [batchno, setbatchno] = useState([]);
  const [batchno2, setbatchno2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [batchNolist, setBatchNolist] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  // console.log("date from smmary",date)
  const [selectedRow, setSelectedRow] = useState(null);
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [planId, setplanId] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [stoppagedata, setstoppagedata] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  const [waste_kg, setwaste_kg] = useState("");
  const [customer_Name, setcustomer_Name] = useState("");

  const [Brand, setBrand] = useState("");
  const [Grams, setGrams] = useState("");
  const [Width, setWidth] = useState("");
  const [Height, setHeight] = useState("");
  const [Bag_Box, setBag_Box] = useState("");
  const [count_Bags, setcount_Bags] = useState("");

  const [Bags1, setBags1] = useState("");
  const [id, setId] = useState("");
  const [fleecedetails, setfleecedetails] = useState("");
  const [Bags2, setBags2] = useState("");
  const [Bags3, setBags3] = useState("");
  const [Bags4, setBags4] = useState("");
  const [Bags5, setBags5] = useState("");
  const [Bags6, setBags6] = useState("");
  const [Bags7, setBags7] = useState("");
  const [Bags8, setBags8] = useState("");
  const [BagsTotal, setBagsTotal] = useState("");
  const [Box1, setBox1] = useState("");
  const [Box2, setBox2] = useState("");
  const [Box3, setBox3] = useState("");
  const [Box4, setBox4] = useState("");
  const [Box5, setBox5] = useState("");
  const [Box6, setBox6] = useState("");
  const [Box7, setBox7] = useState("");
  const [Box8, setBox8] = useState("");
  const [Perforate_Type, setPerforate_Type] = useState("");
  const [BoxTotal, setBoxTotal] = useState("");

  const [Not_Perforate_Type, setNot_Perforate_Type] = useState("");

  const [selectedProductName, setSelectedProductName] = useState("");
  const { date, shift, order_no, machineName } = state || {};

  const datefomrat = moment(date).format("DD/MM/YYYY");

  useEffect(() => {
    console.log(
      " date, shift, orderNo, machineName",
      date,
      shift,
      order_no,
      machineName
    );
    fetchBagByBox(order_no, date, shift);
    fetchData_drygoodsdetailsDetails(order_no);
    fetchData_StoppageDetails(order_no);
    // fetchCustomerName(order_no);
    fetchDetailsByFleecetDetails(order_no);
  }, []);

  const fetchBagByBox = async (order_no, date, shift) => {
    let shiftValue =
      shift == "I" ? 1 : shift == "II" ? 2 : shift == "III" ? 3 : "";

    try {
      const token = localStorage.getItem("token");
      let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getHeaderDetailsbyOrderNoF006Bag?orderNo=${order_no}&date=${date}&shift=${shiftValue}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavaluesgetHeaderDetailsbyOrderNoF006Bag", data);
      setBag_Box(data[0].Bag);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const calculateTotal = () => {
    const isValidNumber = (value) => {
      const number = Number(value);
      return !isNaN(number) && typeof number === "number";
    };

    return (
      (isValidNumber(Bags1) ? Number(Bags1) : 0) +
      (isValidNumber(Bags2) ? Number(Bags2) : 0) +
      (isValidNumber(Bags3) ? Number(Bags3) : 0) +
      (isValidNumber(Bags4) ? Number(Bags4) : 0) +
      (isValidNumber(Bags5) ? Number(Bags5) : 0) +
      (isValidNumber(Bags6) ? Number(Bags6) : 0) +
      (isValidNumber(Bags7) ? Number(Bags7) : 0) +
      (isValidNumber(Bags8) ? Number(Bags8) : 0)
    );
  };

  const calculateTotal_box = () => {
    const isValidNumber = (value) => {
      const number = Number(value);
      return !isNaN(number) && typeof number === "number";
    };

    return (
      (isValidNumber(Box1) ? Number(Box1) : 0) +
      (isValidNumber(Box2) ? Number(Box2) : 0) +
      (isValidNumber(Box3) ? Number(Box3) : 0) +
      (isValidNumber(Box4) ? Number(Box4) : 0) +
      (isValidNumber(Box5) ? Number(Box5) : 0) +
      (isValidNumber(Box6) ? Number(Box6) : 0) +
      (isValidNumber(Box7) ? Number(Box7) : 0) +
      (isValidNumber(Box8) ? Number(Box8) : 0)
    );
  };

  // Function to handle changes in any of the bag inputs
  const handleBagChange = (value, setBagState) => {
    setBagState(value); // Update the state of the specific bag input
  };
  // Function to handle changes in any of the bag inputs
  const handleBoxChange = (value, setBagState) => {
    setBagState(value); // Update the state of the specific bag input
  };

  const handleChange = (event) => {
    setPerforate_Type(event.target.value);
  };

  const handleChange_notpreffered = (event) => {
    setNot_Perforate_Type(event.target.value);
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
  const roleBase = localStorage.getItem("role");

  const handleKeyDown = (e) => {
    // Allow numbers, underscore, dot, backspace, delete, arrow keys, and tab
    if (
      !/[0-9._]/.test(e.key) && // Check if the key is not a digit, underscore, or dot
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    console.log("state value", date, shift, order_no);
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [planingDetailsByDate, API.prodUrl, token]);
  useEffect(() => {
    console.log("state value", date, shift, order_no);
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.operator_sign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [planingDetailsByDate, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [planingDetailsByDate, API.prodUrl, token]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };

    fetchOrderNumberOptions();
    fetchDataOrderNumber();
  }, [token]);

  const fetchDataOrderNumber = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/drygoods/OrderLovForF006`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavalues", data);

      // console.log("Summary Get List",data)
      if (data && data.length >= 0) {
        // setOrderdetails(data);
        setbatchno(data);
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.data.message);
    } finally {
    }
  };

  const fetchData_drygoodsdetailsDetails = async (value) => {
    try {
      const token = localStorage.getItem("token");
      let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getHeaderDetailsbyOrderNoF006?order_no=${value}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavalues", data);

      // console.log("Summary Get List",data)
      if (data && data.length >= 0) {
        // setdrygoodsdetails(data);
        setSelectedProductName(data[0].Product);
        console.log("setstoppage", data);
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const formattedDate = () => {
    if (planingDetailsByDate?.hod_submit_on) {
      const date = moment(planingDetailsByDate?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedDate_operator = () => {
    if (planingDetailsByDate?.operator_submitted_on) {
      const date = moment(planingDetailsByDate?.operator_submitted_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedDatesupervisor = () => {
    if (planingDetailsByDate?.supervisor_submit_on) {
      const date = moment(planingDetailsByDate?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  //fetch Machine name
  const fetchDataMachineNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/drygoods/OrderLovForF006`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          const data = res.data.map((laydownno) => laydownno);
          setbatchno(data);
          setbatchno2(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
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
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status !== "HOD_REJECTED"
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

  const isEditable = canEdit();

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/drygoods/DailyProductionCottonBallsF006/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-06/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
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
        `${API.prodUrl}/Precot/api/drygoods/DailyProductionCottonBallsF006/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-06/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSave = async () => {
    try {
      await sendContaminationCheck2();
    } catch (error) {
      console.error("Error saving Logbook - Spunlace Planning:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await sendContaminationCheck();
    } catch (error) {
      console.error("Error submitting Logbook - Spunlace Planning:", error);
    }
  };

  const sendContaminationCheck2 = async () => {
    setSaveLoading(true);
    const boxtotal =
      Number(Box1 || 0) +
      Number(Box2 || 0) +
      Number(Box3 || 0) +
      Number(Box4 || 0) +
      Number(Box5 || 0) +
      Number(Box6 || 0) +
      Number(Box7 || 0) +
      Number(Box8 || 0);
    const bagtotal =
      Number(Bags1 || 0) +
      Number(Bags2 || 0) +
      Number(Bags3 || 0) +
      Number(Bags4 || 0) +
      Number(Bags5 || 0) +
      Number(Bags6 || 0) +
      Number(Bags7 || 0) +
      Number(Bags8 || 0);
    try {
      const payload = {
        formatName: "Daily Production(Pleate /Wool Roll)",
        formatNo: "PH-PRD04/F-006",
        revisionNo: 1,
        sopNumber: "PH-PRD04-D-03",
        unit: "H",
        date: date,
        pleate_id: id,
        shift: shift,
        product_name: selectedProductName,
        machine_name: machineName,
        order_no: batchNolist || order_no,
        coustomer_name: customer_Name,
        perforate_type: Perforate_Type || "NA",
        non_perforate_type: Not_Perforate_Type || "NA",
        brand: Brand,
        bag_or_box: Bag_Box,
        grams: Grams || 0,
        width: Width || 0,
        height: Height || 0,
        bag_hour1: Bags1 || 0,
        bag_hour2: Bags2 || 0,
        bag_hour3: Bags3 || 0,
        bag_hour4: Bags4 || 0,
        bag_hour5: Bags5 || 0,
        bag_hour6: Bags6 || 0,
        bag_hour7: Bags7 || 0,
        bag_hour8: Bags8 || 0,
        box_hour1: Box1 || 0,
        box_hour2: Box2 || 0,
        box_hour3: Box3 || 0,
        box_hour4: Box4 || 0,
        box_hour5: Box5 || 0,
        box_hour6: Box6 || 0,
        box_hour7: Box7 || 0,
        box_hour8: Box8 || 0,
        box_total_hour: boxtotal || 0,
        bag_total_hour: bagtotal || 0,
        waste_kg: waste_kg || 0,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/drygoods/saveDailyProductionWoolRollAndPleateF006`,
        payload,
        { headers }
      );
      // console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-06/Summary");
      }, 1500);
      message.success(
        "Daily Production (Pleate /Wool Roll) Saved Successfully.."
      );
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error(
        "Failed to save Daily Production (Pleate /Wool Roll)   !!"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const sendContaminationCheck = async () => {
    const boxtotal =
      Number(Box1 || 0) +
      Number(Box2 || 0) +
      Number(Box3 || 0) +
      Number(Box4 || 0) +
      Number(Box5 || 0) +
      Number(Box6 || 0) +
      Number(Box7 || 0) +
      Number(Box8 || 0);
    const bagtotal =
      Number(Bags1 || 0) +
      Number(Bags2 || 0) +
      Number(Bags3 || 0) +
      Number(Bags4 || 0) +
      Number(Bags5 || 0) +
      Number(Bags6 || 0) +
      Number(Bags7 || 0) +
      Number(Bags8 || 0);
    setSubmitLoading(true);
    console.log("order_no", order_no);
    const isValid = () => {
      if (!order_no) return "Order No is required";

      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    try {
      const payload = {
        formatName: "Daily Production(Pleate /Wool Roll)",
        formatNo: "PH-PRD04/F-006",
        revisionNo: 1,
        sopNumber: "PH-PRD04-D-03",
        unit: "Unit H",
        date: date,
        pleate_id: id,
        shift: shift,
        product_name: selectedProductName,
        machine_name: machineName,
        order_no: batchNolist || order_no,
        coustomer_name: customer_Name,
        perforate_type: Perforate_Type,
        non_perforate_type: Not_Perforate_Type,
        brand: Brand,
        bag_or_box: Bag_Box,
        grams: Grams || 0,
        width: Width || 0,
        height: Height || 0,
        bag_hour1: Bags1 || 0,
        bag_hour2: Bags2 || 0,
        bag_hour3: Bags3 || 0,
        bag_hour4: Bags4 || 0,
        bag_hour5: Bags5 || 0,
        bag_hour6: Bags6 || 0,
        bag_hour7: Bags7 || 0,
        bag_hour8: Bags8 || 0,
        box_hour1: Box1 || 0,
        box_hour2: Box2 || 0,
        box_hour3: Box3 || 0,
        box_hour4: Box4 || 0,
        box_hour5: Box5 || 0,
        box_hour6: Box6 || 0,
        box_hour7: Box7 || 0,
        box_hour8: Box8 || 0,
        box_total_hour: boxtotal || 0,
        bag_total_hour: bagtotal || 0,
        waste_kg: waste_kg || 0,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/drygoods/submitDailyProductionWoolRollAndPleateF006`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/DryGoods/F-06/Summary");
      }, 1500);

      message.success(response.data.message);
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      setSubmitLoading(false);
      throw new Error(
        "Failed to submit Daily Production (Pleate /Wool Roll)!!"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/DryGoods/F-06/Summary");
  };

  useEffect(() => {
    if (!initial.current) {
      fetchDetailsByDate();
      fetchDataMachineNumber();
      initial.current = true;
    }
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/drygoods/getdetailsbyParamF006?date=${date}&shift=${shift}&machine_name=${machineName}&order_no=${order_no} `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("responsedata", response);
      // console.log("response (details based on date)", response.data);
      if (response.data) {
        console.log("if entered");
        setemptyarraycheck(response.data?.length);
        setPlaningDetailsByDate(response.data);
        setSelectedRow(response.data);
        fetchData_StoppageDetails_edit(response.data);
        fetchDetailsByFleecetDetails_edit(response.data);
        console.log("response data ds", response.data);
        setBags1(response.data?.bag_hour1);
        setId(response.data?.pleate_id);
        setBags2(response.data?.bag_hour2);
        setBags3(response.data?.bag_hour3);
        setBags4(response.data?.bag_hour4);
        setBags5(response.data?.bag_hour5);
        setBags6(response.data?.bag_hour6);
        setBags7(response.data?.bag_hour7);
        setBags8(response.data?.bag_hour8);
        setBagsTotal(response.data?.bag_total_hour);
        setBox1(response.data?.box_hour1);
        setBox2(response.data?.box_hour2);
        setBox3(response.data?.box_hour3);
        setBox4(response.data?.box_hour4);
        setBox5(response.data?.box_hour5);
        setBox6(response.data?.box_hour6);
        setBox7(response.data?.box_hour7);
        setBox8(response.data?.box_hour8);
        setBoxTotal(response.data?.box_total_hour);
        setplanId(response.data?.cottonballs_id);

        setGrams(response.data?.grams);
        setWidth(response.data?.width);
        setHeight(response.data?.height);
        setwaste_kg(response.data?.waste_kg);
        setBatchNolist(response.data?.order_no);

        setPerforate_Type(response.data?.perforate_type);
        setNot_Perforate_Type(response.data?.non_perforate_type);
        setcount_Bags(response.data?.bag_counts);
        console.log("responsedata", response.data);
        console.log("responsedata", response.data?.Grams);

        setcustomer_Name(response.data?.coustomer_name);
        setBrand(response.data?.brand);
        setBag_Box(response.data?.bag_or_box);
        setSelectedProductName(response.data?.product_name);
        console.log("Supervisor Status data", response.data);
        console.log("Supervisor Status", response.data?.supervisor_status);

        if (roleBase === "ROLE_SUPERVISOR") {
          if (
            response.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
            response.data?.hod_status === "HOD_REJECTED"
          ) {
            message.warning(
              "Operator Not Yet Approved or Previous Stage Rejected"
            );
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-06/Summary");
            }, 1500);
          }
        }

        if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
          if (
            response.data?.operator_status !== "OPERATOR_APPROVED" ||
            response.data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
            response.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
            response.data?.hod_status === "HOD_REJECTED"
          ) {
            message.warning(
              "Operator Not Yet Approved or Previous Stage Rejected"
            );
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-06/Summary");
            }, 1500);
          }
        }
      }

      // console.log("seted planing response",planingDetailsByDate);

      if (response.data) {
        const data = response.data;
        // console.log("set response date for all fields", data)
        setplanId(data.planId);
      } else {
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    } finally {
    }
  };

  const fetchData_StoppageDetails = async (value) => {
    if (value) {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const numberShift = convertShiftValue(shift);

        let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getStoppageDetailsF006?date=${date}&shift=${numberShift}&machine_name=${machineName}&order_no=${value}`;
        // let apiUrl = `${ API.prodUrl}/Precot/api/drygoods/getStoppageDetailsF006?date=${date}&shift=${numberShift}&order_no=${'800005272'}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("datavalues", data);

        // console.log("Summary Get List",data)
        if (data && data.length >= 0) {
          setstoppagedata(data);
          console.log("setstoppage", data);
        } else {
          // message.error(data.message)
          // setTimeout(() => {
          //   navigate("/Precot/choosenScreen");
          // }, 1500)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.data.message);
      } finally {
      }
    }
  };

  const fetchData_StoppageDetails_edit = async (value) => {
    if (value) {
      try {
        console.log("valuesss", value.order_no);
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const numberShift = convertShiftValue(value.shift);

        console.log("value of batch", batchNolist);
        let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getStoppageDetailsF006?date=${date}&machine_name=${machineName}&shift=${numberShift}&order_no=${value.order_no}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("datavalues", data);

        // console.log("Summary Get List",data)
        if (data && data.length >= 0) {
          setstoppagedata(data);
          console.log("setstoppage", data);
        } else {
          message.error(data.message);
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.data.message);
      } finally {
      }
    }
  };

  const fetchDetailsByFleecetDetails = async (e) => {
    try {
      console.log("shift", shift);
      const numberShift = convertShiftValue(shift);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/drygoods/FleecetDetailsF006?date=${date}&shift=${numberShift}&
order_no=${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("responsedata", response);
      // console.log("response (details based on date)", response.data);

      // console.log("seted planing response",planingDetailsByDate);

      if (response.data) {
        const data = response.data;
        console.log("FleecetDetails", response.data);
        // console.log("set response date for all fields", data)
        setplanId(data.planId);
        setfleecedetails(response.data);
        // setWidth(response.data[2]?.width_in_mm);
      } else {
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    } finally {
    }
  };

  const fetchDetailsByFleecetDetails_edit = async (value) => {
    if (value) {
      try {
        console.log("shift", shift);
        const numberShift = convertShiftValue(shift);
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/drygoods/FleecetDetailsF006?date=${date}&shift=${numberShift}&order_no=${value.order_no}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("responsedata", response);
        // console.log("response (details based on date)", response.data);

        // console.log("seted planing response",planingDetailsByDate);

        if (response.data) {
          const data = response.data;
          console.log("FleecetDetails", response.data);
          console.log("set response date for all fields", data);
          setplanId(data.planId);
          setfleecedetails(response.data);

          // setWidth(response.data[2]?.width_in_mm);
        } else {
        }
      } catch (error) {
        console.error("Error checking BMR existence:", error);
        message.error(error.message);
      } finally {
      }
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Parameters:</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                1.Parameters:
              </th>
            </tr>
            <tr>
              <th colSpan={50}>Grams</th>
              <th colSpan={50}>Width</th>
            </tr>
            <tr>
              <td colSpan={50}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Grams}
                  onChange={(e) => setGrams(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  min="0"
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={50}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Width}
                  min="0"
                  onChange={(e) => setWidth(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              {/* <td colSpan={30}>
                <input
                  type="number"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Height}
                  min="0"
                  onChange={(e) => setHeight(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td> */}
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p> Fleece Receipt</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                2.Fleece Receipt:
              </th>
            </tr>
            <tr>
              <th colSpan="10" style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                RollNo.
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Width in MM{" "}
              </th>
              <th colSpan="30" style={{ textAlign: "center" }}>
                GSM
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Net Wt. in Kg
              </th>
            </tr>
            {/* array....... */}

            {(fleecedetails || []).map((item, index) => (
              <tr key={index}>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {index + 1}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.rollNo}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.width_in_mm}
                </td>
                <td colSpan={30} style={{ textAlign: "center" }}>
                  {item.gsm}
                </td>
                <td colSpan={20} style={{ textAlign: "center" }}>
                  {item.net_wt}
                </td>
              </tr>
            ))}
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Out Put Details</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                OutPut Details:
              </th>
            </tr>
            <tr>
              <th colSpan={10}>Hours</th>
              <th colSpan={10}>1</th>
              <th colSpan={10}>2</th>
              <th colSpan={10}>3</th>
              <th colSpan={10}>4</th>
              <th colSpan={10}>5</th>
              <th colSpan={10}>6</th>
              <th colSpan={10}>7</th>
              <th colSpan={10}>8</th>
              <th colSpan={10}>Total</th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Box
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box1}
                  onChange={(e) => handleBoxChange(e.target.value, setBox1)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box2}
                  onChange={(e) => handleBoxChange(e.target.value, setBox2)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box3}
                  onChange={(e) => handleBoxChange(e.target.value, setBox3)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box4}
                  onChange={(e) => handleBoxChange(e.target.value, setBox4)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box5}
                  min="0"
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  onChange={(e) => handleBoxChange(e.target.value, setBox5)}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box6}
                  onChange={(e) => handleBoxChange(e.target.value, setBox6)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box7}
                  onChange={(e) => handleBoxChange(e.target.value, setBox7)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box8}
                  onChange={(e) => handleBoxChange(e.target.value, setBox8)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  min="0"
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="number"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={calculateTotal_box()}
                  onChange={(e) => setBoxTotal(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  min="0"
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Bags
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags1}
                  min="0"
                  onChange={(e) => handleBagChange(e.target.value, setBags1)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags2}
                  onChange={(e) => handleBagChange(e.target.value, setBags2)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  min="0"
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags3}
                  onChange={(e) => handleBagChange(e.target.value, setBags3)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags4}
                  onChange={(e) => handleBagChange(e.target.value, setBags4)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags5}
                  onChange={(e) => handleBagChange(e.target.value, setBags5)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags6}
                  onChange={(e) => handleBagChange(e.target.value, setBags6)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags7}
                  onChange={(e) => handleBagChange(e.target.value, setBags7)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags8}
                  onChange={(e) => handleBagChange(e.target.value, setBags8)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={calculateTotal()}
                  onChange={(e) => setBagsTotal(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  min="0"
                  disabled={!isEditable}
                />
              </td>
            </tr>

            <tr>
              <th colSpan={30}>Waste in Kg:</th>
              <th colspan={70}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={waste_kg}
                  onChange={(e) => setwaste_kg(e.target.value)}
                  disabled={!isEditable}
                  // onKeyDown={(e) => handleKeyDown(e)}
                />
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "5",
      label: <p>Stoppage</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <thead>
              <tr>
                <th colSpan={125} style={{ textAlign: "left" }}>
                  4.Stoppage:
                </th>
              </tr>
              <tr>
                <th colSpan={25}>Nature Of Problem</th>
                <th colSpan={25}>Stop. Time</th>
                <th colSpan={25}>Restart Time</th>
                <th colSpan={25}>Idle Time (in Min)</th>
                <th colSpan={25}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {(stoppagedata || []).map((item, index) => (
                <tr key={index}>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.SCAUSE}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.FTime}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.TTime}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.TotHrs}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.Remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },

    {
      key: "6",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="30" style={{ height: "35px", textAlign: "center" }}>
                Performed by Operator
              </td>
              <td colSpan="35" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="35" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="30"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {planingDetailsByDate?.operator_status ===
                  "OPERATOR_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{planingDetailsByDate?.operator_sign}</div>
                        <div>{formattedDate_operator()}</div>
                      </div>
                      {getImage3 && (
                        <img
                          src={getImage3}
                          alt="Supervisor Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>
              <td
                colSpan="35"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {(planingDetailsByDate?.supervisor_status ===
                  "SUPERVISOR_APPROVED" ||
                  planingDetailsByDate?.supervisor_status ===
                    "SUPERVISOR_REJECTED" ||
                  planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
                  planingDetailsByDate?.hod_status === "HOD_REJECTED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{planingDetailsByDate?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Supervisor Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>
              {/* <td colSpan="50" style={{ textAlign: "center"}}>{planingDetailsByDate.hod_sign}<br/>{formattedDate()}
              </td> */}
              <td
                colSpan="35"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(planingDetailsByDate?.hod_status === "HOD_REJECTED" ||
                  planingDetailsByDate?.hod_status === "HOD_APPROVED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{planingDetailsByDate.hod_sign}</div>
                        <div>{formattedDate()}</div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="HOD Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                    </div>{" "}
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const formatName = "CONTAMINATION CHECKING REPORT(Absorbent Bleached Cotton)";
  const formatNo = "PRD01/F-18";
  const revisionNo = "02";
  const sopNo = "PRD01-D-09";

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="Daily Production
(Pleate /Wool Roll)"
        formatNo="PH-PRD04/F-006"
        sopNo="PH-PRD04-D-03"
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

      {/* date row */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Machine Name:"
          placeholder="Machine Name"
          type="text"
          value={machineName}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />

        <Input
          addonBefore="Date:"
          placeholder="Date"
          type="text"
          // max ={ formattedToday }
          value={datefomrat}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="Shift:"
          placeholder="Shift"
          type="text"
          // max ={ formattedToday }
          value={shift}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "30%",
            height: "35px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0px 10px",
              border: "1px solid #d9d9d9",
              borderRight: "none",
              borderRadius: "2px 0 0 2px",
              backgroundColor: "#f5f5f5",
              fontSize: "13px",
              height: "100%",
              width: "100px",
            }}
          >
            Order No:
          </span>
          <Select
            style={{ width: "180px", height: "100%" }}
            placeholder="Select Order No"
            value={batchNolist || order_no}
            // onChange={handleChangeOrderNo}
            showSearch
            disabled
          />
          {/* {batchno.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
              </Option>
            ))}
          </Select> */}
        </div>
        <Input
          addonBefore="Customer Name:"
          placeholder="Customer Name"
          type="text"
          // max ={ formattedToday }
          value={customer_Name}
          onChange={(e) => {
            setcustomer_Name(e.target.value);
          }}
          disabled={!isEditable}
          style={{ width: "30%", height: "35px" }}
        />

        <Input
          addonBefore="Brand:"
          placeholder="Brand"
          type="text"
          // max ={ formattedToday }
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          value={Brand}
          style={{ width: "30%", height: "35px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "96px",
          marginTop: "20px",
        }}
      >
        <label style={{ fontSize: "14px", paddingLeft: "10px" }}>
          Perforate Type:{" "}
        </label>
        <Radio.Group
          onChange={handleChange}
          value={Perforate_Type}
          disabled={!isEditable}
        >
          <Radio value="Ok" style={{ fontSize: "11px", marginLeft: "0px" }}>
            {<CheckOutlined Left color="#00308F" />}
          </Radio>
          <Radio value="NA" style={{ fontSize: "11px", marginLeft: "0px" }}>
            NA
          </Radio>
        </Radio.Group>
        <label style={{ fontSize: "14px" }}>Non Perforated Type: </label>
        <Radio.Group
          onChange={handleChange_notpreffered}
          value={Not_Perforate_Type}
          disabled={!isEditable}
        >
          <Radio value="Ok" style={{ fontSize: "11px", marginLeft: "0px" }}>
            {<CheckOutlined Left color="#00308F" />}
          </Radio>
          <Radio value="NA" style={{ fontSize: "11px", marginLeft: "0px" }}>
            NA
          </Radio>
        </Radio.Group>
        <Input
          addonBefore="Bag/Box:"
          placeholder="Bag/Box"
          type="text"
          // max ={ formattedToday }
          value={Bag_Box}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="Product Name:"
          placeholder="Product Name"
          type="text"
          value={selectedProductName}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
      </div>
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
      </Modal>

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

export default DryGoods_f06;
