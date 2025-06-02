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
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f10 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  // console.log("date from smmary",date)
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [splInstruction, setSplInstruction] = useState("");
  const [planId, setplanId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderDetails, setOrderDetails] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOrderNumbers, setSelectedOrderNumbers] = useState({});
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [deleteId, setDeleteId] = useState([]);

  const [rows, setRows] = useState([{}]);
  const { Option } = Select;

  const handleOrderNumberChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].orderNumber = value;
    setRows(updatedRows);

    setSelectedOrderNumbers((prevSelectedOrderNumbers) => ({
      ...prevSelectedOrderNumbers,
      [index]: value,
    }));
  };
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
    if (username) {
      // console.log("usernameparams", username);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
    if (username) {
      // console.log("usernameparams", username);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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

  const filteredOrderNumberLov = (index) => {
    const selectedOrderNumbersList = Object.values(selectedOrderNumbers);
    return orderNumberLov.filter(
      (order) =>
        !selectedOrderNumbersList.includes(order.value) ||
        selectedOrderNumbers[index] === order.value
    );
  };

  const handleAddRow = () => {
    setRows([...rows, { orderNumber: "" }]);
  };

  const handleDeleteRow = (index, id) => {
    console.log("ID", id);
    console.log("ID", index);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (confirmDelete) {
      if (id) {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
        setDeleteId((prevDeleteId) => [...prevDeleteId, id]);

        setSelectedOrderNumbers((prevSelectedOrderNumbers) => {
          const updatedSelectedOrderNumbers = { ...prevSelectedOrderNumbers };
          delete updatedSelectedOrderNumbers[index];
          return updatedSelectedOrderNumbers;
        });
      } else {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
        setSelectedOrderNumbers((prevSelectedOrderNumbers) => {
          const updatedSelectedOrderNumbers = { ...prevSelectedOrderNumbers };
          delete updatedSelectedOrderNumbers[index];
          return updatedSelectedOrderNumbers;
        });
      }
    }
  };

  const handleDelete = async (rowID) => {
    console.log("entered", rowID);

    try {
      const response = await axios.delete(
        `${ API.prodUrl}/Precot/api/spunlace/Service/deleteLogbookLine?id=${rowID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  // Spunlace row
  const [spunlaceStdPh, setSpunlaceStdPh] = useState("");
  const [spunlaceStdOther, setSpunlaceStdOther] = useState("");
  const [spunlacePh1S, setSpunlacePh1S] = useState("");
  const [spunlaceOther1S, setSpunlaceOther1S] = useState("");
  const [spunlacePh2S, setSpunlacePh2S] = useState("");
  const [spunlaceOther2S, setSpunlaceOther2S] = useState("");
  const [spunlacePh3S, setSpunlacePh3S] = useState("");
  const [spunlaceOther3S, setSpunlaceOther3S] = useState("");
  const [spunlacePhGS, setSpunlacePhGS] = useState("");
  const [spunlaceOtherGS, setSpunlaceOtherGS] = useState("");

  // rp
  const [rpBaleStdPh, setRpBaleStdPh] = useState("");
  const [rpBaleStdOther, setRpBaleStdOther] = useState("");
  const [rpBalePh1S, setRpBalePh1S] = useState("");
  const [rpBaleOther1S, setRpBaleOther1S] = useState("");
  const [rpBalePh2S, setRpBalePh2S] = useState("");
  const [rpBaleOther2S, setRpBaleOther2S] = useState("");
  const [rpBalePh3S, setRpBalePh3S] = useState("");
  const [rpBaleOther3S, setRpBaleOther3S] = useState("");
  const [rpBalePhGS, setRpBalePhGS] = useState("");
  const [rpBaleOtherGS, setRpBaleOtherGS] = useState("");

  // data entry
  const [sliterWinderStdPh, setSliterWinderStdPh] = useState("");
  const [sliterWinderStdOther, setSliterWinderStdOther] = useState("");
  const [sliterWinderPh1S, setSliterWinderPh1S] = useState("");
  const [sliterWinderOther1S, setSliterWinderOther1S] = useState("");
  const [sliterWinderPh2S, setSliterWinderPh2S] = useState("");
  const [sliterWinderOther2S, setSliterWinderOther2S] = useState("");
  const [sliterWinderPh3S, setSliterWinderPh3S] = useState("");
  const [sliterWinderOther3S, setSliterWinderOther3S] = useState("");
  const [sliterWinderPhGS, setSliterWinderPhGS] = useState("");
  const [sliterWinderOtherGS, setSliterWinderOtherGS] = useState("");

  // total
  const [totalStdPh, setTotalStdPh] = useState("");
  const [totalStdOther, setTotalStdOther] = useState("");
  const [totalPh1S, setTotalPh1S] = useState("");
  const [totalOther1S, setTotalOther1S] = useState("");
  const [totalPh2S, setTotalPh2S] = useState("");
  const [totalOther2S, setTotalOther2S] = useState("");
  const [totalPh3S, setTotalPh3S] = useState("");
  const [totalOther3S, setTotalOther3S] = useState("");
  const [totalPhGS, setTotalPhGS] = useState("");
  const [totalOtherGS, setTotalOtherGS] = useState("");
  const [showModal, setShowModal] = useState(false);

  const roleauth = localStorage.getItem("role");

  const disabled =
    (roleauth === "ROLE_SUPERVISOR" &&
      planingDetailsByDate?.supervisor_status === "SUPERVISOR_APPROVED" &&
      planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL") ||
    planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
    (roleauth === "ROLE_HOD" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED")) ||
    (roleauth === "ROLE_DESIGNEE" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED"));

  const calculateStdPh = () => {
    let total = 0;

    const apunlacestdphInput = document.getElementById("spunlacestd-ph");
    if (apunlacestdphInput) {
      total += parseInt(apunlacestdphInput.value || "0");
    }

    const rpbasedstdphInput = document.getElementById("rpBalestd-ph");
    if (rpbasedstdphInput) {
      total += parseInt(rpbasedstdphInput.value || "0");
    }

    const sliterwinderstdphInput =
      document.getElementById("sliterWinderstd-ph");
    if (sliterwinderstdphInput) {
      total += parseInt(sliterwinderstdphInput.value || "0");
    }
    setTotalStdPh(total.toString());
  };

  const calculateStdothers = () => {
    let total = 0;

    const apunlacestdotherInput = document.getElementById("spunlacestd-other");
    if (apunlacestdotherInput) {
      total += parseInt(apunlacestdotherInput.value || "0");
    }

    const rpbasedstdotherInput = document.getElementById("rpBalestd-other");
    if (rpbasedstdotherInput) {
      total += parseInt(rpbasedstdotherInput.value || "0");
    }

    const sliterwinderstdotherInput = document.getElementById(
      "sliterWinderstd-other"
    );
    if (sliterwinderstdotherInput) {
      total += parseInt(sliterwinderstdotherInput.value || "0");
    }
    setTotalStdOther(total.toString());
  };

  const calculate1sPh = () => {
    let total = 0;

    const spunlace1sphInput = document.getElementById("spunlace1s-ph");
    if (spunlace1sphInput) {
      total += parseInt(spunlace1sphInput.value || "0");
    }

    const rpbased1sphInput = document.getElementById("rpBale1s-ph");
    if (rpbased1sphInput) {
      total += parseInt(rpbased1sphInput.value || "0");
    }

    const sliterwinder1sphInput = document.getElementById("sliterWinder1s-ph");
    if (sliterwinder1sphInput) {
      total += parseInt(sliterwinder1sphInput.value || "0");
    }
    setTotalPh1S(total.toString());
  };
  const calculate1sothers = () => {
    let total = 0;

    const spunlace1sotherInput = document.getElementById("spunlace1s-other");
    if (spunlace1sotherInput) {
      total += parseInt(spunlace1sotherInput.value || "0");
    }

    const rpbased1sotherInput = document.getElementById("rpBale1s-other");
    if (rpbased1sotherInput) {
      total += parseInt(rpbased1sotherInput.value || "0");
    }

    const sliterwinder1sotherInput = document.getElementById(
      "sliterWinder1s-other"
    );
    if (sliterwinder1sotherInput) {
      total += parseInt(sliterwinder1sotherInput.value || "0");
    }
    setTotalOther1S(total.toString());
  };

  const calculate2sPh = () => {
    let total = 0;

    const spunlace2sphInput = document.getElementById("spunlace2s-ph");
    if (spunlace2sphInput) {
      total += parseInt(spunlace2sphInput.value || "0");
    }

    const rpbased2sphInput = document.getElementById("rpBale2s-ph");
    if (rpbased2sphInput) {
      total += parseInt(rpbased2sphInput.value || "0");
    }

    const sliterwinder2sphInput = document.getElementById("sliterWinder2s-ph");
    if (sliterwinder2sphInput) {
      total += parseInt(sliterwinder2sphInput.value || "0");
    }
    setTotalPh2S(total.toString());
  };

  const calculate2sothers = () => {
    let total = 0;

    const spunlace2sotherInput = document.getElementById("spunlace2s-other");
    if (spunlace2sotherInput) {
      total += parseInt(spunlace2sotherInput.value || "0");
    }

    const rpbased2sotherInput = document.getElementById("rpBale2s-other");
    if (rpbased2sotherInput) {
      total += parseInt(rpbased2sotherInput.value || "0");
    }

    const sliterwinder2sotherInput = document.getElementById(
      "sliterWinder2s-other"
    );
    if (sliterwinder2sotherInput) {
      total += parseInt(sliterwinder2sotherInput.value || "0");
    }
    setTotalOther2S(total.toString());
  };
  const calculate3sPh = () => {
    let total = 0;

    const spunlace3sphInput = document.getElementById("spunlace3s-ph");
    if (spunlace3sphInput) {
      total += parseInt(spunlace3sphInput.value || "0");
    }

    const rpbased3sphInput = document.getElementById("rpBale3s-ph");
    if (rpbased3sphInput) {
      total += parseInt(rpbased3sphInput.value || "0");
    }

    const sliterwinder3sphInput = document.getElementById("sliterWinder3s-ph");
    if (sliterwinder3sphInput) {
      total += parseInt(sliterwinder3sphInput.value || "0");
    }
    setTotalPh3S(total.toString());
  };

  const calculate3sothers = () => {
    let total = 0;

    const spunlace3sotherInput = document.getElementById("spunlace3s-other");
    if (spunlace3sotherInput) {
      total += parseInt(spunlace3sotherInput.value || "0");
    }

    const rpbased3sotherInput = document.getElementById("rpBale3s-other");
    if (rpbased3sotherInput) {
      total += parseInt(rpbased3sotherInput.value || "0");
    }

    const sliterwinder3sotherInput = document.getElementById(
      "sliterWinder3s-other"
    );
    if (sliterwinder3sotherInput) {
      total += parseInt(sliterwinder3sotherInput.value || "0");
    }
    setTotalOther3S(total.toString());
  };

  const calculateGsPh = () => {
    let total = 0;

    const spunlaceGsphInput = document.getElementById("spunlaceGs-ph");
    if (spunlaceGsphInput) {
      total += parseInt(spunlaceGsphInput.value || "0");
    }

    const rpbasedGsphInput = document.getElementById("rpBaleGs-ph");
    if (rpbasedGsphInput) {
      total += parseInt(rpbasedGsphInput.value || "0");
    }

    const sliterwinderGsphInput = document.getElementById("sliterWinderGs-ph");
    if (sliterwinderGsphInput) {
      total += parseInt(sliterwinderGsphInput.value || "0");
    }
    setTotalPhGS(total.toString());
  };

  const calculateGsothers = () => {
    let total = 0;

    const spunlaceGsotherInput = document.getElementById("spunlaceGs-other");
    if (spunlaceGsotherInput) {
      total += parseInt(spunlaceGsotherInput.value || "0");
    }

    const rpbasedGsotherInput = document.getElementById("rpBaleGs-other");
    if (rpbasedGsotherInput) {
      total += parseInt(rpbasedGsotherInput.value || "0");
    }

    const sliterwinderGsotherInput = document.getElementById(
      "sliterWinderGs-other"
    );
    if (sliterwinderGsotherInput) {
      total += parseInt(sliterwinderGsotherInput.value || "0");
    }
    setTotalOtherGS(total.toString());
  };

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/spulance/orders`,
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
  }, [token]);

  const formattedDate = () => {
    if (planingDetailsByDate?.hod_submit_on) {
      const date = moment(planingDetailsByDate?.hod_submit_on);
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

  // order based details
  const fetchOrderDetails = async (value, index) => {
    try {
      const updatedRows = [...rows];
      updatedRows[index].orderNumber = value;
      setRows(updatedRows);

      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/orderDetails?order=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        const updatedRows = [...rows];
        updatedRows[index] = {
          ...updatedRows[index],
          material: data.material,
          mix: data.mix,
          patternDescription: data.patternDescription,
          gsm: data.gsm,
          width: data.width,
          customerName: data.customerName,
        };
        setRows(updatedRows);
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
    }
  };
  const handlePlanedProdChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].planedProd = value;
    setRows(updatedRows);
  };
  const handleThicknessChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].thickness = value;
    setRows(updatedRows);
  };
  const handleMoistureChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].moisture = value;
    setRows(updatedRows);
  };

  const handleRemarksChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].remarks = value;
    setRows(updatedRows);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
          planingDetailsByDate?.hod_status == "WAITING_FOR_APPROVAL") ||
        planingDetailsByDate?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (planingDetailsByDate?.hod_status == "WAITING_FOR_APPROVAL" ||
          planingDetailsByDate?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayAddDelete = () => {
    if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      return "none";
    }
  };

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
        `${ API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/approveOrReject`,
        {
          id: planId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-10/Summary");
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
        `${ API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/approveOrReject`,
        {
          id: planId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-10/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const containerStyle = {
    position: "relative",
    // marginLeft:'60px',
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
    if (deleteId.length > 0) {
      try {
        for (let i = 0; i < deleteId.length; i++) {
          handleDelete(deleteId[i]);
        }
      } catch (error) {
        message.warning("Issues Occured While Delete");
        return;
      }
    }
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "LOGBOOK – SPUNLACE PLANNING",
        formatNo: "PH-QAD01/F-052",
        revisionNo: 1,
        refSopNo: "PH-PRD02-D-03",
        unit: "H",
        planId: planId,
        date: date,
        splInstruction: splInstruction,
        spunlace_stdPh: spunlaceStdPh,
        spunlace_stdOther: spunlaceStdOther,
        spunlace_ph_1S: spunlacePh1S,
        spunlace_Other_1S: spunlaceOther1S,
        spunlace_ph_2S: spunlacePh2S,
        spunlace_Other_2S: spunlaceOther2S,
        spunlace_ph_3S: spunlacePh3S,
        spunlace_Other_3S: spunlaceOther3S,
        spunlace_ph_GS: spunlacePhGS,
        spunlace_Other_GS: spunlaceOtherGS,
        rpBale_stdPh: rpBaleStdPh,
        rpBale_stdOther: rpBaleStdOther,
        rpBale_ph_1S: rpBalePh1S,
        rpBale_Other_1S: rpBaleOther1S,
        rpBale_ph_2S: rpBalePh2S,
        rpBale_Other_2S: rpBaleOther2S,
        rpBale_ph_3S: rpBalePh3S,
        rpBale_Other_3S: rpBaleOther3S,
        rpBale_ph_GS: rpBalePhGS,
        rpBale_Other_GS: rpBaleOtherGS,
        sliterWinder_stdPh: sliterWinderStdPh,
        sliterWinder_stdOther: sliterWinderStdOther,
        sliterWinder_ph_1S: sliterWinderPh1S,
        sliterWinder_Other_1S: sliterWinderOther1S,
        sliterWinder_ph_2S: sliterWinderPh2S,
        sliterWinder_Other_2S: sliterWinderOther2S,
        sliterWinder_ph_3S: sliterWinderPh3S,
        sliterWinder_Other_3S: sliterWinderOther3S,
        sliterWinder_ph_GS: sliterWinderPhGS,
        sliterWinder_Other_GS: sliterWinderOtherGS,
        total_stdPh: totalStdPh,
        total_stdOther: totalStdOther,
        total_ph_1S: totalPh1S,
        total_Other_1S: totalOther1S,
        total_ph_2S: totalPh2S,
        total_Other_2S: totalOther2S,
        total_ph_3S: totalPh3S,
        total_Other_3S: totalOther3S,
        total_ph_GS: totalPhGS,
        total_Other_GS: totalOtherGS,
        prodPlanDetails: rows.map((row) => ({
          orderNo: row.orderNumber,
          prodName: row.customerName,
          mixing: row.mix,
          plannedProdKG: row.planedProd,
          gsm: row.gsm,
          width: row.width,
          thickness: row.thickness,
          moisture: row.moisture,
          pattern: row.patternDescription,
          remarks: row.remarks,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/SaveLogbookSpunlacePlanning`,
        payload,
        { headers }
      );
      // console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/Spunlace/F-10/Summary");
      }, 1500);
      message.success("Logbook - Spunlace Planning Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Logbook - Spunlace Planning !!");
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const sendContaminationCheck = async () => {
    setSubmitLoading(true);
    if (deleteId.length > 0) {
      try {
        for (let i = 0; i < deleteId.length; i++) {
          handleDelete(deleteId[i]);
        }
      } catch (error) {
        message.warning("Issues Occured While Delete");
        return;
      }
    }
    try {
      const payload = {
        formatName: "LOGBOOK – SPUNLACE PLANNING",
        formatNo: "PH-QAD01/F-052",
        revisionNo: 1,
        refSopNo: "PH-PRD02-D-03",
        unit: "H",
        planId: planId,
        date: date,
        splInstruction: splInstruction,
        spunlace_stdPh: spunlaceStdPh,
        spunlace_stdOther: spunlaceStdOther,
        spunlace_ph_1S: spunlacePh1S,
        spunlace_Other_1S: spunlaceOther1S,
        spunlace_ph_2S: spunlacePh2S,
        spunlace_Other_2S: spunlaceOther2S,
        spunlace_ph_3S: spunlacePh3S,
        spunlace_Other_3S: spunlaceOther3S,
        spunlace_ph_GS: spunlacePhGS,
        spunlace_Other_GS: spunlaceOtherGS,
        rpBale_stdPh: rpBaleStdPh,
        rpBale_stdOther: rpBaleStdOther,
        rpBale_ph_1S: rpBalePh1S,
        rpBale_Other_1S: rpBaleOther1S,
        rpBale_ph_2S: rpBalePh2S,
        rpBale_Other_2S: rpBaleOther2S,
        rpBale_ph_3S: rpBalePh3S,
        rpBale_Other_3S: rpBaleOther3S,
        rpBale_ph_GS: rpBalePhGS,
        rpBale_Other_GS: rpBaleOtherGS,
        sliterWinder_stdPh: sliterWinderStdPh,
        sliterWinder_stdOther: sliterWinderStdOther,
        sliterWinder_ph_1S: sliterWinderPh1S,
        sliterWinder_Other_1S: sliterWinderOther1S,
        sliterWinder_ph_2S: sliterWinderPh2S,
        sliterWinder_Other_2S: sliterWinderOther2S,
        sliterWinder_ph_3S: sliterWinderPh3S,
        sliterWinder_Other_3S: sliterWinderOther3S,
        sliterWinder_ph_GS: sliterWinderPhGS,
        sliterWinder_Other_GS: sliterWinderOtherGS,
        total_stdPh: totalStdPh,
        total_stdOther: totalStdOther,
        total_ph_1S: totalPh1S,
        total_Other_1S: totalOther1S,
        total_ph_2S: totalPh2S,
        total_Other_2S: totalOther2S,
        total_ph_3S: totalPh3S,
        total_Other_3S: totalOther3S,
        total_ph_GS: totalPhGS,
        total_Other_GS: totalOtherGS,
        prodPlanDetails: rows.map((row) => ({
          orderNo: row.orderNumber,
          prodName: row.customerName,
          mixing: row.mix,
          plannedProdKG: row.planedProd,
          gsm: row.gsm,
          width: row.width,
          thickness: row.thickness,
          moisture: row.moisture,
          pattern: row.patternDescription,
          remarks: row.remarks,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/SubmitLogbookSpunlacePlanning`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/Spunlace/F-10/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit Logbook - Spunlace Planning!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-10/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      // const dateapi =moment(date).format('DD/MM/YYYY');
      // console.log("stored Date inside Api", date);

      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getByDate?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response (details based on date)", response.data);
      setemptyarraycheck(response.data.length);
      setPlaningDetailsByDate(response.data);
      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-10/Summary");
        }, 1500);
      }
      // console.log("seted planing response",planingDetailsByDate);

      if (response.data) {
        const data = response.data;
        // console.log("set response date for all fields", data)
        setplanId(data.planId);

        if (data && data.splInstruction) {
          setSplInstruction(data.splInstruction);
        } else if (data && data.message === "No data") {
          setSplInstruction("");
        } else {
          setSplInstruction("N/A");
        }

        if (data && data.message !== "No data") {
          setSpunlaceStdPh(data.spunlace_stdPh ? data.spunlace_stdPh : 0);
          setSpunlaceStdOther(
            data.spunlace_stdOther ? data.spunlace_stdOther : 0
          );
          setSpunlacePh1S(data.spunlace_ph_1S ? data.spunlace_ph_1S : 0);
          setSpunlaceOther1S(
            data.spunlace_Other_1S ? data.spunlace_Other_1S : 0
          );
          setSpunlacePh2S(data.spunlace_ph_2S ? data.spunlace_ph_2S : 0);
          setSpunlaceOther2S(
            data.spunlace_Other_2S ? data.spunlace_Other_2S : 0
          );
          setSpunlacePh3S(data.spunlace_ph_3S ? data.spunlace_ph_3S : 0);
          setSpunlaceOther3S(
            data.spunlace_Other_3S ? data.spunlace_Other_3S : 0
          );
          setSpunlacePhGS(data.spunlace_ph_GS ? data.spunlace_ph_GS : 0);
          setSpunlaceOtherGS(
            data.spunlace_Other_GS ? data.spunlace_Other_GS : 0
          );
          // ----------------------------------------
          setRpBaleStdPh(data.rpBale_stdPh ? data.rpBale_stdPh : 0);
          setRpBaleStdOther(data.rpBale_stdOther ? data.rpBale_stdOther : 0);
          setRpBalePh1S(data.rpBale_ph_1S ? data.rpBale_ph_1S : 0);
          setRpBaleOther1S(data.rpBale_Other_1S ? data.rpBale_Other_1S : 0);
          setRpBalePh2S(data.rpBale_ph_2S ? data.rpBale_ph_2S : 0);
          setRpBaleOther2S(data.rpBale_Other_2S ? data.rpBale_Other_2S : 0);
          setRpBalePh3S(data.rpBale_ph_3S ? data.rpBale_ph_3S : 0);
          setRpBaleOther3S(data.rpBale_Other_3S ? data.rpBale_Other_3S : 0);
          setRpBalePhGS(data.rpBale_ph_GS ? data.rpBale_ph_GS : 0);
          setRpBaleOtherGS(data.rpBale_Other_GS ? data.rpBale_Other_GS : 0);
          //----------------------------------------------
          setSliterWinderStdPh(
            data.sliterWinder_stdPh ? data.sliterWinder_stdPh : 0
          );
          setSliterWinderStdOther(
            data.sliterWinder_stdOther ? data.sliterWinder_stdOther : 0
          );
          setSliterWinderPh1S(
            data.sliterWinder_ph_1S ? data.sliterWinder_ph_1S : 0
          );
          setSliterWinderOther1S(
            data.sliterWinder_Other_1S ? data.sliterWinder_Other_1S : 0
          );
          setSliterWinderPh2S(
            data.sliterWinder_ph_2S ? data.sliterWinder_ph_2S : 0
          );
          setSliterWinderOther2S(
            data.sliterWinder_Other_2S ? data.sliterWinder_Other_2S : 0
          );
          setSliterWinderPh3S(
            data.sliterWinder_ph_3S ? data.sliterWinder_ph_3S : 0
          );
          setSliterWinderOther3S(
            data.sliterWinder_Other_3S ? data.sliterWinder_Other_3S : 0
          );
          setSliterWinderPhGS(
            data.sliterWinder_ph_GS ? data.sliterWinder_ph_GS : 0
          );
          setSliterWinderOtherGS(
            data.sliterWinder_Other_GS ? data.sliterWinder_Other_GS : 0
          );
          // ------------------------------------------------
          setTotalStdPh(data.total_stdPh ? data.total_stdPh : 0);
          setTotalStdOther(data.total_stdOther ? data.total_stdOther : 0);
          setTotalPh1S(data.total_ph_1S ? data.total_ph_1S : 0);
          setTotalOther1S(data.total_Other_1S ? data.total_Other_1S : 0);
          setTotalPh2S(data.total_ph_2S ? data.total_ph_2S : 0);
          setTotalOther2S(data.total_Other_2S ? data.total_Other_2S : 0);
          setTotalPh3S(data.total_ph_3S ? data.total_ph_3S : 0);
          setTotalOther3S(data.total_Other_3S ? data.total_Other_3S : 0);
          setTotalPhGS(data.total_ph_GS ? data.total_ph_GS : 0);
          setTotalOtherGS(data.total_Other_GS ? data.total_Other_GS : 0);
        }

        if (data && data.prodPlanDetails) {
          setRows(
            data.prodPlanDetails.map((item) => ({
              orderNumber: item.orderNo,
              customerName: item.prodName,
              mix: item.mixing,
              planedProd: item.plannedProdKG,
              width: item.width,
              gsm: item.gsm,
              thickness: item.thickness,
              moisture: item.moisture,
              patternDescription: item.pattern,
              status: item.remarks,
              remarks: item.remarks || null,
              prodId: item.prodId,
            }))
          );
        } else {
          setRows([]);
        }
      } else {
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>DAILY PRODUCTION PLAN</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                S. No.
              </th>
              <th colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                Order No.
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Product Name
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Mixing
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Planned Prod. in KG
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                GSM
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Width in mm
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Thickness in mm
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Moisture in %
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Pattern
              </th>
              <th colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Remarks
              </th>
            </tr>
            {/* array....... */}
            {rows.map((row, index) => (
              <tr key={index}>
                <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                  <Select
                    showSearch
                    value={row.orderNumber}
                    onChange={(value) => {
                      handleOrderNumberChange(value, index);
                      fetchOrderDetails(value, index);
                    }}
                    style={{ width: "100%" }}
                    placeholder="Search Order Number"
                    optionFilterProp="children"
                    disabled={disabled}
                    // filterOption={(input, option) =>
                    //   option.children && option.children.toString().includes(input)
                    // }
                  >
                    <Select.Option value="" disabled selected>
                      Select Order Number
                    </Select.Option>
                    {/* {filteredOrderNumberLov(index).map((order) => (
                 <Select.Option key={order.value} value={order.value}>
                 {order.value}
                 </Select.Option>

                 ))} */}
                    {orderNumberLov.map((order) => (
                      <Select.Option key={order.value} value={order.value}>
                        {order.value}
                      </Select.Option>
                    ))}
                  </Select>
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.customerName}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.mix}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    type="number"
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.planedProd}
                    onChange={(e) =>
                      handlePlanedProdChange(e.target.value, index)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={disabled}
                  />
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.gsm}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.width}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    type="number"
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.thickness}
                    onChange={(e) =>
                      handleThicknessChange(e.target.value, index)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={disabled}
                  />
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <input
                    type="number"
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.moisture}
                    onChange={(e) =>
                      handleMoistureChange(e.target.value, index)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={disabled}
                  />
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  {row.patternDescription}
                </td>
                <td
                  colSpan="10"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <Select
                    value={row.remarks}
                    onChange={(value) => handleRemarksChange(value, index)}
                    style={{ width: "100%" }}
                    disabled={disabled}
                    placeholder="Remarks"
                  >
                    <Select.Option value="" disabled selected>
                      Remarks
                    </Select.Option>
                    <Select.Option value="Cancelled">Cancelled</Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                    <Select.Option value="Running">Running</Select.Option>
                    <Select.Option value="Next">Next</Select.Option>
                  </Select>
                </td>
                <td
                  colSpan="1"
                  style={{
                    height: "35px",
                    textAlign: "center",
                    cursor: "pointer",
                    size: "40px",
                    border: "none",
                    display: canDisplayAddDelete(),
                  }}
                  onClick={() => handleDeleteRow(index, row.prodId)}
                >
                  <DeleteOutlined
                    style={{ fontSize: "24px", color: "#ff4d4f" }}
                  />
                </td>
              </tr>
            ))}

            <tr>
              <th
                colSpan="100"
                style={{
                  height: "100px",
                  textAlign: "left",
                  verticalAlign: "top",
                  padding: "5px",
                }}
              >
                SPECIAL INSTRUCTION:{" "}
                <textarea
                  value={splInstruction}
                  className="inp-new"
                  onChange={(e) => setSplInstruction(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100px",
                    resize: "none",
                    border: "none",
                    textAlign: "left",
                  }}
                  disabled={disabled}
                />
                <br />
              </th>
            </tr>
          </table>

          <button
            onClick={handleAddRow}
            style={{
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              display: canDisplayButtons(),
            }}
          >
            <PlusOutlined style={{ marginRight: "8px" }} />
            Add Row
          </button>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Manpower Details</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th
                colSpan="15"
                rowSpan="3"
                style={{ height: "35px", textAlign: "center" }}
              >
                MACHINE
              </th>
              <th
                colSpan="15"
                rowSpan="2"
                style={{ height: "35px", textAlign: "center" }}
              >
                STD FOR SHIFT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                1st SHIFT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                2nd SHIFT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                3rd SHIFT{" "}
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                GENERAL SHIFT{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                PRESENT
              </th>
            </tr>
            <tr>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                PH{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                OTHERS{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                SPUNLACE{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlacestd-ph"
                  value={spunlaceStdPh}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      calculateStdPh();
                      setSpunlaceStdPh(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlacestd-other"
                  value={spunlaceStdOther}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      calculateStdothers();
                      setSpunlaceStdOther(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlace1s-ph"
                  value={spunlacePh1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlacePh1S(value);
                      calculate1sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlace1s-other"
                  value={spunlaceOther1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlaceOther1S(value);
                      calculate1sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlace2s-ph"
                  value={spunlacePh2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlacePh2S(value);
                      calculate2sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlace2s-other"
                  value={spunlaceOther2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlaceOther2S(value);
                      calculate2sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlace3s-ph"
                  value={spunlacePh3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlacePh3S(value);
                      calculate3sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlace3s-other"
                  value={spunlaceOther3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlaceOther3S(value);
                      calculate3sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlaceGs-ph"
                  value={spunlacePhGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlacePhGS(value);
                      calculateGsPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="spunlaceGs-other"
                  value={spunlaceOtherGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSpunlaceOtherGS(value);
                      calculateGsothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
            </tr>
            {/* ------------------------------------------------------------ */}
            <tr>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                RP BALE PRESS{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input
                  id="rpBalestd-ph"
                  value={rpBaleStdPh}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      calculateStdPh();
                      setRpBaleStdPh(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBalestd-other"
                  value={rpBaleStdOther}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      calculateStdothers();
                      setRpBaleStdOther(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBale1s-ph"
                  value={rpBalePh1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBalePh1S(value);
                      calculate1sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBale1s-other"
                  value={rpBaleOther1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBaleOther1S(value);
                      calculate1sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBale2s-ph"
                  value={rpBalePh2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBalePh2S(value);
                      calculate2sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBale2s-other"
                  value={rpBaleOther2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBaleOther2S(value);
                      calculate2sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBale3s-ph"
                  value={rpBalePh3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBalePh3S(value);
                      calculate3sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBale3s-other"
                  value={rpBaleOther3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBaleOther3S(value);
                      calculate3sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBaleGs-ph"
                  value={rpBalePhGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBalePhGS(value);
                      calculateGsPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="rpBaleGs-other"
                  value={rpBaleOtherGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setRpBaleOtherGS(value);
                      calculateGsothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>{" "}
              </th>
            </tr>
            {/* ------------------------------------------------------------------------ */}
            <tr>
              <th colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                SLITERWINDER/DATA ENTRY{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input
                  id="sliterWinderstd-ph"
                  value={sliterWinderStdPh}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      calculateStdPh();
                      setSliterWinderStdPh(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinderstd-other"
                  value={sliterWinderStdOther}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderStdOther(value);
                      calculateStdothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinder1s-ph"
                  value={sliterWinderPh1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderPh1S(value);
                      calculate1sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinder1s-other"
                  value={sliterWinderOther1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderOther1S(value);
                      calculate1sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinder2s-ph"
                  value={sliterWinderPh2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderPh2S(value);
                      calculate2sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinder2s-other"
                  value={sliterWinderOther2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderOther2S(value);
                      calculate2sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinder3s-ph"
                  value={sliterWinderPh3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderPh3S(value);
                      calculate3sPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinder3s-other"
                  value={sliterWinderOther3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderOther3S(value);
                      calculate3sothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinderGs-ph"
                  value={sliterWinderPhGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderPhGS(value);
                      calculateGsPh();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  id="sliterWinderGs-other"
                  value={sliterWinderOtherGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setSliterWinderOtherGS(value);
                      calculateGsothers();
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled={disabled}
                ></input>
              </th>
            </tr>
            {/* -----------------------------------Totals................ */}
            <tr>
              <th
                colSpan="15"
                style={{
                  height: "35px",
                  textAlign: "right",
                  paddingRight: "10px",
                }}
              >
                TOTAL{" "}
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input
                  value={totalStdPh}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalStdPh(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalStdOther}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalStdOther(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalPh1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalPh1S(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalOther1S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalOther1S(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalPh2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalPh2S(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalOther2S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalOther2S(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalPh3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalPh3S(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalOther3S}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalOther3S(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="7" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalPhGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalPhGS(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
              <th colSpan="8" style={{ height: "35px", textAlign: "center" }}>
                <input
                  value={totalOtherGS}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9\b]+$/.test(value)) {
                      setTotalOtherGS(value);
                    }
                  }}
                  inputMode="numeric"
                  className="inp-new"
                  style={{ height: "35px", border: "none" }}
                  disabled
                ></input>
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              {/* <td colSpan="34" style={{ height: "35px", textAlign: "center" }}>Performed by Operator</td> */}
              <td colSpan="50" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
            </tr>
            <tr>
              {/* <td colSpan="50" style={{ textAlign: "center",height:"100px" }}>{planingDetailsByDate.supervisor_sign}<br/>{formattedDatesupervisor()}
              </td> */}
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {planingDetailsByDate?.supervisor_status ===
                  "SUPERVISOR_APPROVED" && (
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
                colSpan="50"
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
        formName="LOGBOOK – SPUNLACE PLANNING"
        formatNo="PH-QAD01/F-052"
        sopNo="PH-PRD02-D-03"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ? (
            <>
              <Button
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
              </Button>
              <Button
                loading={submitLoading}
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
                  display: canDisplayButton2(),
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
                  display: canDisplayButtons(),
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

      {/* date row */}
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
          type="date"
          // max ={ formattedToday }
          value={date}
          disabled
          style={{ width: "20%", height: "35px" }}
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

export default Spunlace_f10;
