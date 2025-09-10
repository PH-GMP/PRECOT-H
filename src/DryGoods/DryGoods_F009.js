/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
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

const DryGoods_f09 = () => {
  const initial = useRef(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const [batchno, setbatchno] = useState([]);
  const [batchno2, setbatchno2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [batchNolist, setBatchNolist] = useState("Select Order No");
  const { date, shift, orderNo, machineName } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [splInstruction, setSplInstruction] = useState("");
  const [id, setid] = useState("");
  const [ID, setID] = useState("");
  const [salesorder2, setsalesorder2] = useState("");
  const [salesorder1, setsalesorder1] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderDetails, setOrderDetails] = useState("");
  const [stoppagedata, setstoppagedata] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOrderNumbers, setSelectedOrderNumbers] = useState({});
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [availableshiftlov, setAvailableShiftslov] = useState("Select OrderNo");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [Product, setProduct] = useState("");
  const [customer_Name, setcustomer_Name] = useState("");
  const [Ball_Bag, setBall_Bag] = useState("");
  const [Sale_Order_No, setSale_Order_No] = useState("");
  const [Brand, setBrand] = useState("");
  const [Cutting_Length, setCutting_Length] = useState("");
  const [Feed_Roller_speed, setFeed_Roller_speed] = useState("");
  const [std_Bags, setstd_Bags] = useState("");
  const [Bag_Box, setBag_Box] = useState("");
  const [count_Bags, setcount_Bags] = useState("");
  const [Ball_weight, setBall_weight] = useState("");
  const [Sliver_Weight, setSliver_Weight] = useState("");
  const [Cutting_Roller, setCutting_Roller] = useState("");
  const [Feed_Roller_percentage, setFeed_Roller_percentage] = useState("");
  const [Cutting_Length_in_mm, setCutting_Length_in_mm] = useState("");
  const [productName1, setproductName1] = useState("");
  const [orderNo1, setorderNo1] = useState("");
  const [lotNo1, setlotNo1] = useState("");
  const [pdsNumber1, setpdsNumber1] = useState("");
  const [sliverWeight1, setsliverWeight1] = useState("");
  const [packSize1, setpackSize1] = useState("");
  const [productName2, setproductName2] = useState("");
  const [orderNo2, setorderNo2] = useState("");
  const [lotNo2, setlotNo2] = useState("");
  const [sliverWeight2, setsliverWeight2] = useState("");
  const [packSize2, setpackSize2] = useState("");
  const [pdsNumber2, setpdsNumber2] = useState("");
  const [innerBag, setinnerBag] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [outerBag, setouterBag] = useState("");
  const [innerCarton, setinnerCarton] = useState("");
  const [outerCarton, setouterCarton] = useState("");
  const [silverWeight, setsilverWeight] = useState("");
  const [rollNo, setrollNo] = useState("");
  const [rollNoRemove, setrollNoRemove] = useState("");
  const [innerBagRemove, setinnerBagRemove] = useState("");
  const [outerBagRemove, setouterBagRemove] = useState("");
  const [innerCartonRemove, setinnerCartonRemove] = useState("");
  const [outerCartonRemove, setouterCartonRemove] = useState("");
  const [silverWeightRemove, setsilverWeightRemove] = useState("");
  const [toolChangeRequired, settoolChangeRequired] = useState("");
  const [toolChangeRequiredRemove, settoolChangeRequiredRemove] = useState("");
  const [toolChangeDone, settoolChangeDone] = useState("");
  const [toolChangeDoneRemove, settoolChangeDoneRemove] = useState("");
  const [machineSetting, setmachineSetting] = useState("");
  const [machineSettingRemove, setmachineSettingRemove] = useState("");
  const [metalDetectorTeach, setmetalDetectorTeach] = useState("");
  const [metalDetectorCheck, setmetalDetectorCheck] = useState("");
  const [productionCheck, setproductionCheck] = useState("");
  const [qualityVerification, setqualityVerification] = useState("");
  const [productionCheckRemarks, setproductionCheckRemarks] = useState("");
  const [qualityVerificationRemarks, setqualityVerificationRemarks] =
    useState("");
  const [ccpMaintainedBy, setccpMaintainedBy] = useState("");
  const [ccpMaintainedDate, setccpMaintainedDate] = useState("");
  const [availableshiftlov1, setAvailableShiftLov1] = useState(
    "Select Running Production"
  );
  const [availableshiftlov2, setAvailableShiftLov2] = useState(
    "Select Change Over To"
  );
  const machineNameLov = [
    { value: "TC10-1", label: "TC10-1 " },
    { value: "TC10-2", label: "TC10-2" },
  ];
  const [rows, setRows] = useState([{}]);
  const { Option } = Select;

  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift;
    }
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const roleBase = localStorage.getItem("role");
  const datefomrat = moment(date).format("DD/MM/YYYY");
  const handleOrderNumberChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].orderNumber = value;
    setRows(updatedRows);

    setSelectedOrderNumbers((prevSelectedOrderNumbers) => ({
      ...prevSelectedOrderNumbers,
      [index]: value,
    }));
  };
  const handleKeyDown_text = (e) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    if (
      !/[0-9._]/.test(e.key) &&
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
    console.log("state value", date, shift, orderNo);
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [planingDetailsByDate,API.prodUrl, token]);
  useEffect(() => {
    console.log("state value", date, shift, orderNo);
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.qa_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {});
    }
  }, [planingDetailsByDate,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {});
    }
  }, [planingDetailsByDate,API.prodUrl, token]);

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

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);

      setSelectedOrderNumbers((prevSelectedOrderNumbers) => {
        const updatedSelectedOrderNumbers = { ...prevSelectedOrderNumbers };
        delete updatedSelectedOrderNumbers[index];
        return updatedSelectedOrderNumbers;
      });
    }
  };
  // Spunlace row

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

  useEffect(() => {
    fetchDataOrderNumber();
  }, [token]);

  const fetchDataOrderNumber = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/goods/getDrygoodsProductChangeOrderNoLov`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavalues", data);

      if (data && data.length >= 0) {
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
  const fetchData_drygoodsdetailsDetails = async (value, identifier) => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const numberShift = convertShiftValue(shift);
      let apiUrl = `${API.prodUrl}/Precot/api/goods/getDrygoodsProductChangeOrderDetails?orderNo=${value}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavalues", data);
      console.log(identifier);
      if (identifier === "one") {
        if (data && data.length >= 0) {
          const brand = data[0]?.Material.substring(0, 3);
          setproductName1(data[0]?.ProdDesc);

          setorderNo1(availableshiftlov1);
          setsalesorder1(data[0].SaleOrder);

          setsliverWeight1(data[0].Qty);

          setpackSize1(data[0].Bags);
        } else {
          message.error(data.message);
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        }
      } else if (identifier === "two") {
        if (data && data.length >= 0) {
          const brand = data[0]?.Material.substring(0, 3);

          setproductName2(data[0]?.ProdDesc);

          setsalesorder2(data[0].SaleOrder);
          setorderNo2(availableshiftlov2);

          setsliverWeight2(data[0].Qty);

          setpackSize2(data[0].Bags);

          console.log("setstoppage", data);
        } else {
          message.error(data.message);
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const formattedDate_hod = () => {
    if (planingDetailsByDate?.hod_submit_on) {
      const date = moment(planingDetailsByDate?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate_QA = () => {
    if (planingDetailsByDate?.qa_submit_on) {
      const date = moment(planingDetailsByDate?.qa_submit_on);
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

  const canEdit = () => {
    if (roleBase === "ROLE_SUPERVISOR") {
      return !(
        selectedRow &&
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.qa_status !== "QA_REJECTED"
      );
    } else if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
      return !(
        (selectedRow &&
          selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
          (selectedRow?.hod_status === "HOD_APPROVED" ||
            selectedRow?.hod_status === "WAITING_FOR_APPROVAL") &&
          selectedRow?.qa_status === "WAITING_FOR_APPROVAL") ||
        "QA_APPROVED"
      );
    } else if (roleBase === "ROLE_QA") {
      return !(
        selectedRow &&
        (selectedRow?.qa_status === "QA_APPROVED" ||
          selectedRow?.qa_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_status === "QA_REJECTED")
      );
    } else {
      return false;
    }
  };
  const isEditable = canEdit();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleBase === "ROLE_SUPERVISOR") {
      if (
        selectedRow &&
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_status !== "QA_REJECTED" &&
        selectedRow?.hod_status !== "HOD_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status === "HOD_APPROVED" &&
        selectedRow?.qa_status === "QA_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.hod_status == "HOD_APPROVED" &&
          selectedRow?.qa_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.qa_status == "QA_APPROVED"
      ) {
        return "none";
      } else if (
        selectedRow?.hod_status == "HOD_REJECTED" &&
        selectedRow?.qa_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      }
    } else if (roleBase == "ROLE_QA") {
      if (
        selectedRow?.hod_status === "HOD_REJECTED" ||
        selectedRow?.qa_status == "QA_APPROVED" ||
        selectedRow?.qa_status == "QA_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.qa_status == "QA_APPROVED" ||
        selectedRow?.qa_status == "QA_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleBase == "ROLE_SUPERVISOR") {
      if (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED") {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "supervisor_APPROVED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL" &&
        (selectedRow?.qa_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_status == "QA_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" &&
        selectedRow?.qa_status == "QA_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.hod_status == "HOD_APPROVED" &&
        (selectedRow?.qa_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_status == "QA_APPROVED")
      ) {
        return "none";
      }
    } else if (roleBase == "ROLE_QA") {
      if (
        selectedRow?.qa_status == "QA_APPROVED" ||
        selectedRow?.qa_status == "QA_REJECTED" ||
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

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };
  const handleOrderChange = (value, identifier) => {
    if (identifier === "one") {
      // Logic for the first Select
      setAvailableShiftLov1(value);
      fetchData_drygoodsdetailsDetails(value, identifier);
    } else if (identifier === "two") {
      // Logic for the second Select
      setAvailableShiftLov2(value);
      fetchData_drygoodsdetailsDetails(value, identifier);
    }
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/goods/approveProductChangeOverF09`,
        {
          id: ID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-09/Summary");
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
        `${API.prodUrl}/Precot/api/goods/approveProductChangeOverF09`,
        {
          id: ID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-09/Summary");
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
      console.error("Error saving Product Change Over :", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await sendContaminationCheck();
    } catch (error) {
      console.error("Error submitting Product Change Over :", error);
    }
  };

  const sendContaminationCheck2 = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatNo: "PH-PRD04/F-009",
        formatName: "Product Change Over",
        revisionNumber: "01",
        sopNumber: "PH-PRD04-D-03",
        productId: ID,
        date: date,
        section: shift,

        machineName: machineName,

        ccpMaintainedBy: ccpMaintainedBy,
        ccpMaintainedDate: ccpMaintainedDate,

        productName1: productName1,
        orderNo1: availableshiftlov1,
        salesorder1: salesorder1,
        salesorder2: salesorder2,
        lotNo1: lotNo1,
        sliverWeight1: sliverWeight1,
        packSize1: packSize1,
        pdsNumber1: pdsNumber1 || 0,

        productName2: productName2,
        orderNo2: availableshiftlov2,
        lotNo2: lotNo2 || 0,
        sliverWeight2: sliverWeight2,
        packSize2: packSize2,
        pdsNumber2: pdsNumber2 || 0,

        innerBag: innerBag || 0,
        innerBagRemove: innerBagRemove || "NO",
        outerBag: outerBag || 0,
        outerBagRemove: outerBagRemove || "NO",
        innerCarton: innerCarton || 0,
        innerCartonRemove: innerCartonRemove || "NO",
        outerCartonRemove: outerCartonRemove || "NO",
        outerCarton: outerCarton || 0,
        silverWeight: silverWeight || 0,
        silverWeightRemove: silverWeightRemove || "NO",
        rollNo: rollNo || 0,
        rollNoRemove: rollNoRemove || "NO",

        toolChangeRequired: toolChangeRequired || "NO",
        toolChangeRequiredRemove: toolChangeRequiredRemove || "NO",
        toolChangeDone: toolChangeDone || "NO",
        toolChangeDoneRemove: toolChangeDoneRemove || "NO",
        machineSetting: machineSetting || "NO",
        machineSettingRemove: machineSettingRemove || "NO",

        metalDetectorTeach: metalDetectorTeach || "NA",
        metalDetectorCheck: metalDetectorCheck || "NA",

        productionCheck: productionCheck || "NO",
        productionCheckRemarks: productionCheckRemarks || "NA",
        qualityVerification: qualityVerification || "NO",

        qualityVerificationRemarks: qualityVerificationRemarks || "NA",
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/goods/saveProductChangeOverF09`,
        payload,
        { headers }
      );

      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-09/Summary");
      }, 1500);
      message.success("Product Change Over  Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Product Change Over  !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const sendContaminationCheck = async () => {
    const isValid = () => {
      if (!ccpMaintainedBy) return "ccpMaintainedBy is required";
      if (!ccpMaintainedDate) return "ccpMaintainedDate is required";

      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSubmitLoading(true);
    try {
      const payload = {
        formatNo: "PH-PRD04/F-009",
        formatName: "Product Change Over",
        revisionNumber: "01",
        sopNumber: "PH-PRD04-D-03",
        productId: ID,
        date: date,
        section: shift,
        machineName: machineName,
        ccpMaintainedBy: ccpMaintainedBy || "NA",
        ccpMaintainedDate: ccpMaintainedDate,
        productName1: productName1,
        orderNo1: availableshiftlov1,
        lotNo1: lotNo1,
        sliverWeight1: sliverWeight1,
        packSize1: packSize1,
        pdsNumber1: pdsNumber1 || 0,
        salesorder1: salesorder1,
        salesorder2: salesorder2,
        productName2: productName2,
        orderNo2: availableshiftlov2,
        lotNo2: lotNo2 || 0,
        sliverWeight2: sliverWeight2,
        packSize2: packSize2,
        pdsNumber2: pdsNumber2 || 0,
        innerBag: innerBag || 0,
        innerBagRemove: innerBagRemove || "NO",
        outerBag: outerBag || 0,
        outerBagRemove: outerBagRemove || "NO",
        innerCarton: innerCarton || 0,
        innerCartonRemove: innerCartonRemove || "NO",
        outerCartonRemove: outerCartonRemove || "NO",
        outerCarton: outerCarton || 0,
        silverWeight: silverWeight || 0,
        silverWeightRemove: silverWeightRemove || "NO",
        rollNo: rollNo || 0,
        rollNoRemove: rollNoRemove || "NO",
        toolChangeRequired: toolChangeRequired || "NO",
        toolChangeRequiredRemove: toolChangeRequiredRemove || "NO",
        toolChangeDone: toolChangeDone || "NO",
        toolChangeDoneRemove: toolChangeDoneRemove || "NO",
        machineSetting: machineSetting || "NO",
        machineSettingRemove: machineSettingRemove || "NO",
        metalDetectorTeach: metalDetectorTeach || "NA",
        metalDetectorCheck: metalDetectorCheck || "NA",
        productionCheck: productionCheck || "NO",
        productionCheckRemarks: productionCheckRemarks || "NA",
        qualityVerification: qualityVerification || "NO",

        qualityVerificationRemarks: qualityVerificationRemarks || "NA",
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/goods/submitProductChangeOverF09`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/DryGoods/F-09/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit Product Change Over !!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/DryGoods/F-09/Summary");
  };

  useEffect(() => {
    if (!initial.current) {
      fetchDetailsByDate();

      initial.current = true;
    }
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/goods/getproductChangeOverF09?date=${date}&shift=${shift}&machine=${machineName} `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setID(response.data?.productId);
      console.log(ID);

      console.log("product id", response.data?.productId);
      setemptyarraycheck(response.data?.length);
      setSelectedRow(response.data);
      setPlaningDetailsByDate(response.data);
      console.log("planingdata", response.data);

      setccpMaintainedBy(response.data?.ccpMaintainedBy);
      setccpMaintainedDate(response.data?.ccpMaintainedDate);
      setproductName1(response.data?.productName1);
      setBatchNolist(response.data?.orderNo1);
      setorderNo1(response.data?.orderNo1);
      setAvailableShiftLov1(response.data?.orderNo1);
      setAvailableShiftLov2(response.data?.orderNo2);
      setlotNo1(response.data?.lotNo1);
      setsliverWeight1(response.data?.sliverWeight1);
      setpackSize1(response.data?.packSize1);
      setpdsNumber1(response.data?.pdsNumber1);
      setsalesorder1(response.data.salesorder1);
      setsalesorder2(response.data.salesorder2);
      setproductName2(response.data?.productName2);
      setorderNo2(response.data?.orderNo2);
      setlotNo2(response.data?.lotNo2);
      setsliverWeight2(response.data?.sliverWeight2);
      setpackSize2(response.data?.packSize2);
      setpdsNumber2(response.data?.pdsNumber2);

      setinnerBag(response.data?.innerBag);
      setinnerBagRemove(response.data?.innerBagRemove);
      setouterBag(response.data?.outerBag);
      setouterBagRemove(response.data?.outerBagRemove);
      setinnerCarton(response.data?.innerCarton);
      setinnerCartonRemove(response.data?.innerCartonRemove);
      setouterCarton(response.data?.outerCarton);
      setouterCartonRemove(response.data?.outerCartonRemove);

      setsilverWeight(response.data?.silverWeight);
      setsilverWeightRemove(response.data?.silverWeightRemove);
      setrollNo(response.data?.rollNo);
      setrollNoRemove(response.data?.rollNoRemove);

      settoolChangeRequired(response.data?.toolChangeRequired);
      settoolChangeRequiredRemove(response.data?.toolChangeRequiredRemove);
      settoolChangeDone(response.data?.toolChangeDone);
      settoolChangeDoneRemove(response.data?.toolChangeDoneRemove);
      setmachineSetting(response.data?.machineSetting);
      setmachineSettingRemove(response.data?.machineSettingRemove);

      setmetalDetectorTeach(response.data?.metalDetectorTeach);
      setmetalDetectorCheck(response.data?.metalDetectorCheck);

      setproductionCheck(response.data?.productionCheck);
      setproductionCheckRemarks(response.data?.productionCheckRemarks);
      setqualityVerification(response.data?.qualityVerification);
      setqualityVerificationRemarks(response.data?.qualityVerificationRemarks);

      console.log("responsedata", response.data);
      console.log("responsedata", response.data?.sliverreceiptdetails);

      if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
        if (
          response.data?.hod_status === "HOD_REJECTED" ||
          response.data?.qa_status === "QA_REJECTED"
        ) {
          message.warning(
            "Supervisor Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/DryGoods/F-09/Summary");
          }, 1500);
        }
      }

      if (roleBase === "ROLE_QA") {
        if (
          response.data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
          response.data?.hod_status !== "HOD_APPROVED" ||
          response.data?.hod_status === "HOD_REJECTED" ||
          response.data?.qa_status === "QA_REJECTED"
        ) {
          message.warning(
            "Supervisor Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/DryGoods/F-09/Summary");
          }, 1500);
        }
      }

      if (response.data) {
        const data = response.data;

        if (data && data.splInstruction) {
          setSplInstruction(data.splInstruction);
        } else if (data && data.message === "No data") {
          setSplInstruction("");
        } else {
          setSplInstruction("N/A");
        }

        if (data && data.sliverreceiptdetails) {
          setRows(
            data.sliverreceiptdetails.map((item) => ({
              can_no: item.can_no,
              gram_or_mtrs: item.gram_or_mtrs,
              carding_mc_no: item.carding_mc_no,
              net_weight_kg: item.net_weight_kg,
              cottonballs_id: item.cottonballs_id,
            }))
          );
        } else {
          setRows([]);
        }
      } else {
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error.message);
      if (error.message === "Request failed with status code 400") {
        setPlaningDetailsByDate([]);
        setRows([]);

        return;
      } else {
        message.error(error.message);
      }
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>A. Product Details:</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                A. Product Details:
              </th>
            </tr>
            <tr>
              <th colSpan={10}>S.No.</th>
              <th colSpan={40}>Check Points</th>
              <th colSpan={25}>Running Production</th>
              <th colSpan={25}>Change Over To</th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Order No.
              </td>
              <td colSpan={25}>
                <Select
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "0px",
                    border: "1px solid #dddd",
                    backgroundColor: "white",
                    textAlign: "center",
                  }}
                  showSearch
                  placeholder="Select Order No"
                  value={availableshiftlov1}
                  onChange={(value) => handleOrderChange(value, "one")}
                >
                  {batchno.map((shiftvalue, index) => (
                    <Option key={index} value={shiftvalue}>
                      {shiftvalue}
                    </Option>
                  ))}
                </Select>
              </td>
              <td colSpan={25}>
                <Select
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "0px",
                    border: "1px solid #dddd",
                    backgroundColor: "white",
                    textAlign: "center",
                  }}
                  showSearch
                  placeholder="Select Order No"
                  value={availableshiftlov2}
                  onChange={(value) => handleOrderChange(value, "two")}
                >
                  {batchno.map((shiftvalue, index) => (
                    <Option key={index} value={shiftvalue}>
                      {shiftvalue}
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Product Name
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={productName1}
                  onChange={(e) => setproductName1(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={productName2}
                  onChange={(e) => setproductName2(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Sales Order No
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={salesorder1}
                  onChange={(e) => setsalesorder1(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={salesorder2}
                  onChange={(e) => setsalesorder2(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Lot No
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={lotNo1}
                  onChange={(e) => setlotNo1(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={lotNo2}
                  onChange={(e) => setlotNo2(e.target.value)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Roll gm/Sliver Weight
              </td>
              <td colSpan={25}>
                <input
                  type="number"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={sliverWeight1}
                  onChange={(e) => setsliverWeight1(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
              <td colSpan={25}>
                <input
                  type="number"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={sliverWeight2}
                  onChange={(e) => setsliverWeight2(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Pack Size (qty per bag)
              </td>
              <td colSpan={25}>
                <input
                  type="number"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={packSize1}
                  onChange={(e) => setpackSize1(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
              <td colSpan={25}>
                <input
                  type="number"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={packSize2}
                  onChange={(e) => setpackSize2(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                PDS No./ Rev.No
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={pdsNumber1}
                  onChange={(e) => setpdsNumber1(e.target.value)}
                  // disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={pdsNumber2}
                  onChange={(e) => setpdsNumber2(e.target.value)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>B.Removed of Unwanted Packing Materials</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                B.Removed of Unwanted Packing Materials of Running Product:
              </th>
            </tr>
            <tr>
              <th colSpan={10}>S.No.</th>
              <th colSpan={40}>Packing Materials </th>
              <th colSpan={25}>Qty.</th>
              <th colSpan={25}>Remove (Yes/No)</th>
            </tr>
            {/* array....... */}

            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Inner Bag in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={innerBag}
                  onChange={(e) => setinnerBag(e.target.value)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setinnerBagRemove(e.target.value)}
                  value={innerBagRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Outer Bag in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={outerBag}
                  onChange={(e) => setouterBag(e.target.value)}
                  min="0"
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setouterBagRemove(e.target.value)}
                  value={outerBagRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Inner Carton in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={innerCarton}
                  onChange={(e) => setinnerCarton(e.target.value)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setinnerCartonRemove(e.target.value)}
                  value={innerCartonRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Outer carton in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={outerCarton}
                  onChange={(e) => setouterCarton(e.target.value)}
                  min="0"
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setouterCartonRemove(e.target.value)}
                  value={outerCartonRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Sliver in Kg
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={silverWeight}
                  onChange={(e) => setsilverWeight(e.target.value)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setsilverWeightRemove(e.target.value)}
                  value={silverWeightRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Roll in Nos
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={rollNo}
                  onChange={(e) => setrollNo(e.target.value)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setrollNoRemove(e.target.value)}
                  value={rollNoRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>C.Tool & Machine Settings</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                C.Tool & Machine Settings:
              </th>
            </tr>
            <tr>
              <th colSpan={10}>S.No.</th>
              <th colSpan={40}>Activity</th>
              <th colSpan={25}>Completed Status</th>
              <th colSpan={25}>Remove </th>
            </tr>

            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Tool Change required
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => settoolChangeRequired(e.target.value)}
                  value={toolChangeRequired}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => settoolChangeRequiredRemove(e.target.value)}
                  value={toolChangeRequiredRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Tool Change Done
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => settoolChangeDone(e.target.value)}
                  value={toolChangeDone}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => settoolChangeDoneRemove(e.target.value)}
                  value={toolChangeDoneRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Machine Setting
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setmachineSetting(e.target.value)}
                  value={machineSetting}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setmachineSettingRemove(e.target.value)}
                  value={machineSettingRemove}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>D. CCP Setting</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                D. CCP Setting
              </th>
            </tr>
            <tr>
              <th colSpan={10}>S.No.</th>
              <th colSpan={75}>Activity</th>
              <th colSpan={25}>Status</th>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={75} style={{ textAlign: "center" }}>
                Teaching of Metal Detector
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={metalDetectorTeach}
                  onChange={(e) => setmetalDetectorTeach(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown_text(e)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={75} style={{ textAlign: "center" }}>
                Functioning Check Of Metal Detector
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={metalDetectorCheck}
                  onChange={(e) => setmetalDetectorCheck(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown_text(e)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "5",
      label: <p>E. Production Start</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                E. Production Start:
              </th>
            </tr>
            <tr>
              <th colSpan={10}>S.No.</th>
              <th colSpan={40}>Activity</th>
              <th colSpan={25}>Completed (Yes/No)</th>
              <th colSpan={25}>Remarks </th>
            </tr>

            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                Production Ready To Start
              </td>

              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setproductionCheck(e.target.value)}
                  value={productionCheck}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>

              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={productionCheckRemarks}
                  onChange={(e) => setproductionCheckRemarks(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown_text(e)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={40} style={{ textAlign: "center" }}>
                First Piece Inspection /Quality verification
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setqualityVerification(e.target.value)}
                  value={qualityVerification}
                  disabled={!isEditable}
                >
                  <Radio
                    value="YES"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="NO"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan={25} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={qualityVerificationRemarks}
                  onChange={(e) =>
                    setqualityVerificationRemarks(e.target.value)
                  }
                  // onKeyDown={(e) => handleKeyDown_text(e)}
                  disabled={!isEditable}
                />
              </td>
            </tr>
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
                Production Supervisor
              </td>
              <td colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                CCP Maintained by
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                Verified by (QA Inspector)
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
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
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  placeholder="CCP Maintained by"
                  style={{
                    width: "98%",
                    border: "1px solid #dddd",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={ccpMaintainedBy}
                  onChange={(e) => setccpMaintainedBy(e.target.value)}
                  onKeyDown={(e) => handleKeyDown_text(e)}
                  disabled={!isEditable}
                />
                <input
                  type="date"
                  className="inp-new"
                  placeholder="ccp Maintained Date"
                  style={{
                    width: "98%",
                    border: "1",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={ccpMaintainedDate}
                  onChange={(e) => setccpMaintainedDate(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td
                colSpan="30"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(planingDetailsByDate?.qa_status === "QA_REJECTED" ||
                  planingDetailsByDate?.qa_status === "QA_APPROVED") && (
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
                        <div>{planingDetailsByDate?.qa_sign}</div>
                        <div>{formattedDate_QA()}</div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="QA Sign"
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
                colSpan="30"
                style={{
                  textAlign: "center",
                }}
              >
                {(planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
                  planingDetailsByDate?.hod_status === "HOD_REJECTED" ||
                  planingDetailsByDate?.qa_status === "QA_APPROVED" ||
                  planingDetailsByDate?.qa_status === "QA_REJECTED") && (
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
                        <div>{formattedDate_hod()}</div>
                      </div>
                      {getImage3 && (
                        <img
                          src={getImage3}
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

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="Product Change Over "
        formatNo="PH-PRD04/F-009"
        sopNo="PH-PRD04-D-03"
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
          addonBefore="Machince Name:"
          placeholder="Machince Name"
          type="text"
          value={orderNo}
          disabled
          style={{ width: "30%", height: "35px" }}
        />

        <Input
          addonBefore="Date:"
          placeholder="Date"
          type="text"
          value={datefomrat}
          disabled
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="OrderNo:"
          placeholder="OrderNo"
          type="text"
          value={shift}
          disabled
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

export default DryGoods_f09;
