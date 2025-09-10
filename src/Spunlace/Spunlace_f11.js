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
  Radio,
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
import TextArea from "antd/es/input/TextArea";
// import approveIcon from "../Assests/outlined-approve.svg";
// import rejectIcon from "../Assests/outlined-reject.svg";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";

const Spunlace_f11 = () => {
  const [values, setValues] = useState("");
  const [ORDER_No, SetORDER_No] = useState("");
  const [getdatabyrollnumber, Setgetdatabyrollnumber] = useState("");
  const [SHAFT_NUMBER, SetSHAFT_NUMBER] = useState("");
  const [ROLL_NUMBER, SetROLL_NUMBER] = useState("");
  const [STD_WIDTH, SetSTD_WIDTH] = useState("");
  const [MIXING, SetMIXING] = useState("");
  const [MIXING_FROM, SetMIXING_FROM] = useState("");
  const [MIXING_TO, SetMIXING_TO] = useState("");
  const [MATERIAL_CODE, SetMATERIAL_CODE] = useState("");
 

  const [QC_Checked_And_approval, SetQC_Checked_And_approval] = useState("");
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
  const [id, Setid] = useState("");
  const [REMARKS, SetREMARKS] = useState("");
  const [STD_MOISTURE, SetSTD_MOISTURE] = useState("");
  const [orderDetails, SetOrderDetails] = useState("");
  const [machineCleanedThoroughly, SetmachineCleanedThoroughly] = useState("");
  const [materialMixingChangedvalue, SetmaterialMixingChangedvalue] =
    useState("");
  const [settingAndParametersChanged, setsettingAndParametersChanged] =
    useState("");
  const [qcCheckedApprovalTrialRun, setqcCheckedApprovalTrialRun] =
    useState("");
  const [NewSave, setNewSave] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const initial = useRef(false);
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
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState("");
  const [QASign, setQASign] = useState("");
  const [QASubmitOn, setQASubmitOn] = useState("");
  const [QAstatus, setQAstatus] = useState("");
  const [SupervisorStatus, setSupervisorStatus] = useState("");
  const [HodStatus, setHodStatus] = useState("");
  const [ReportDetails, setReportDetails] = useState([]);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  console.log("supervisor", selectedRow?.supervisor_status);
  const [getImageQA, setGetImageQA] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const roleBase = localStorage.getItem("role");
  const [cd, setcd] = useState("");
  const [md, setmd] = useState("");
  const [GSM, setGSM] = useState("");
  const [Moisture, setMoisture] = useState("");
  const [Thickness, setThickness] = useState("");
  const [remark, setremark] = useState("");
  const [productNameOperatingParam, setproductNameOperatingParam] =
    useState("");
  const [patternTop, setpatternTop] = useState("");
  const [patternBottom, setpatternBottom] = useState("");
  const [noOfRollsWidth, setnoOfRollsWidth] = useState("");
  const [gsmOperatingParam, setgsmOperatingParam] = useState("");
  const [moisture, setmoisture] = useState("");
  const [rollNetWt, setrollNetWt] = useState("");
  const [rollDia, setrollDia] = useState("");
  const [rollLength, setrollLength] = useState("");
  const [materialBO, setmaterialBO] = useState("");
  const [materialWBO1, setmaterialWBO1] = useState("");
  const [materialWBO2, setmaterialWBO2] = useState("");
  const [percentageBO, setpercentageBO] = useState("");
  const [percentageWBO1, setpercentageWBO1] = useState("");
  const [percentageWBO2, setpercentageWBO2] = useState("");
  const [gsmAlc1, setgsmAlc1] = useState("");
  const [gsmAlc2, setgsmAlc2] = useState("");
  const [gsmRc601, setgsmRc601] = useState("");
  const [gsmRc602, setgsmRc602] = useState("");
  const [jetlaceVacuumStd, setjetlaceVacuumStd] = useState("");
  const [jetlacePwStd, setjetlacePwStd] = useState("");
  const [jetlaceInj01Std, setjetlaceInj01Std] = useState("");
  const [jetlaceIpaStd, setjetlaceIpaStd] = useState("");
  const [jetlaceInj11Std, setjetlaceInj11Std] = useState("");
  const [jetlaceInj12Std, setjetlaceInj12Std] = useState("");
  const [jetlaceInj21Std, setjetlaceInj21Std] = useState("");
  const [jetlaceVacuumSet, setjetlaceVacuumSet] = useState("");
  const [jetlacePwSet, setjetlacePwSet] = useState("");
  const [jetlaceInj01Set, setjetlaceInj01Set] = useState("");
  const [jetlaceIpaSet, setjetlaceIpaSet] = useState("");
  const [jetlaceInj11Set, setjetlaceInj11Set] = useState("");
  const [jetlaceInj12Set, setjetlaceInj12Set] = useState("");
  const [jetlaceInj21Set, setjetlaceInj21Set] = useState("");
  const [orderno, setorderno] = useState([]);
  const [ordernolist, setordernolist] = useState("Select Order No");
  const [rollno, setrollno] = useState([]);
  const [rollnolist, setrollnolist] = useState("Select Roll Number");
  const { Option } = Select;
  const [orderNoFrom, setorderNoFrom] = useState("");
  const [response, setResponse] = useState([]);

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      if (
        selectedRow &&
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.qa_status !== "QA_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" &&
        selectedRow?.qa_status == "QA_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.hod_status == "HOD_APPROVED" &&
          selectedRow?.qa_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.qa_status == "QA_APPORVED"
      ) {
        return "none";
      } else if (
        (selectedRow?.hod_status == "HOD_APPROVED" &&
          selectedRow?.supervisor_status == "SUPERVISOR_APPROVED") ||
        selectedRow?.qa_status == "QA_APPORVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_QA") {
      if (
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
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED"
        //  &&
        // selectedRow?.hod_status == "HOD_REJECTED" || "HOD_APPROVED" &&
        // selectedRow?.qa_status == "QA_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL" &&
        (selectedRow?.qa_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_status == "QA_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
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
    } else if (roleauth == "ROLE_QA") {
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
        selectedRow?.qa_status == "QA_APPROVED" ||
        selectedRow?.qa_status == "QA_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const handleApprove = async () => {
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProductChangeOverCheckList/approveOrReject`,
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
        navigate("/Precot/Spunlace/F-11/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProductChangeOverCheckList/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-11/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { state } = location;
  const { newdate, shiftvalue, orderNo } = state || {};

  const handleorderno = (value) => {
    setordernolist(value); // Update the selected value in state
    console.log("Selected Batch No:", value);
    fetchDataRollnumber(value);
  };
  const fetchDataOrderNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/spulance/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("Shift details fetched:", res.data);
          const data = res.data.map((laydownno) => laydownno.value);
          // console.log("data format",data);
          console.log("order no from", orderDescription);

          const filteredOptions = data.filter((MacLOV) => MacLOV !== orderNo);
          setorderno(filteredOptions);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchDatabyfromorder_toorder_rollnumber = async (value) => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/mixingChangeOverDetails?fromOrderNo=${orderNo}&toOrderNo=${ordernolist}&baleNo=${value}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data[0].productName);
          if (res.data && res.data.length > 0) {
            // console.log("Shift details fetched:", res.data);
            const data = res.data.map((laydownno) => laydownno.value);
            console.log("data format rollnumber", res.data[0].ProductName);
            Setgetdatabyrollnumber(data);
            const pattern = res.data[0].PatternDesc;
            console.log("resvalue", res.data[0].PatternDesc);
            const [beforePlus, afterPlus] = pattern.split("+");
            console.log("top value", beforePlus);
            console.log("bottomvalue", afterPlus);
            SetPRODUCT_NAME(res.data[0].ProductName);

            SetMIXING_FROM(res.data[0].MixingFrom);
            SetMIXING_TO(res.data[0].MixingTo);
            SetSHAFT_NUMBER(res.data[0].ShaftNo);
            setproductNameOperatingParam(res.data[0].ProductName);
            setpatternTop(beforePlus);
            setpatternBottom(afterPlus);
            setnoOfRollsWidth(res.data[0].NoOfRollsCrossWidth);
            setgsmOperatingParam(res.data[0].PGSM);
            setmoisture(res.data[0].Moisture);
            setrollNetWt(res.data[0].RNWt);
            setrollDia(res.data[0].RDia);
            setrollLength(res.data[0].PLen);
          } else {
            message.warning("No Data Found");
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/Service/ProductChangeOverCheckList/findByDateShiftOrderNo?date=${newdate}&shift=${shiftvalue}&orderNo=${orderNo}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("Shift details fetched:", res.data);
          const setValueOrNull = (value) => (value === 0 ? null : value);

          if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
            if (
              res.data?.hod_status === "HOD_REJECTED" ||
              res.data?.qa_status === "QA_REJECTED"
            ) {
              message.warning(
                "Supervisor Not Yet Approved or Previous Stage Rejected"
              );
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-11/Summary");
              }, 1500);
            }
          }

          if (roleBase === "ROLE_QA") {
            if (
              res.data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
              res.data?.hod_status !== "HOD_APPROVED" ||
              res.data?.hod_status === "HOD_REJECTED" ||
              res.data?.qa_status === "QA_REJECTED"
            ) {
              message.warning(
                "Supervisor Not Yet Approved or Previous Stage Rejected"
              );
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-11/Summary");
              }, 1500);
            }
          }
          setResponse(res.data);
          setordernolist(res.data.orderNoTo);
          setrollnolist(res.data.rollNumber);
          SetPRODUCT_NAME(res.data.productName);
          SetMIXING_FROM(res.data.mixingFrom);
          SetMIXING_TO(res.data.mixingTo);
          SetSHAFT_NUMBER(res.data.shaftNumber);
          setproductNameOperatingParam(res.data?.ProductName);
          setpatternTop(res.data.patternTop);
          setpatternBottom(res.data.patternBottom);
          setnoOfRollsWidth(res.data.noOfRollsWidth);
          setgsmOperatingParam(res.data.gsmOperatingParam);
          setmoisture(res.data.moisture);
          setrollNetWt(res.data.rollNetWt);
          setrollDia(res.data.rollDia);
          setrollLength(res.data.rollLength);

          SetmachineCleanedThoroughly(res.data.machineCleanedThoroughly);
          SetmaterialMixingChangedvalue(res.data.materialMixingChanged);
          setsettingAndParametersChanged(res.data.settingAndParametersChanged);
          setqcCheckedApprovalTrialRun(res.data.trialRollTakenQcApproval);
          SetQC_Checked_And_approval(res.data.qcCheckedApprovalTrialRun);
          setcd(res.data.qcCd);
          setSelectedRow(res.data);
          setmd(res.data.qcMd);
          Setid(res.data.listId);
          setGSM(res.data.qcGsm);
          setMoisture(res.data.qcMoisture);
          setThickness(res.data.qcThickness);
          setmaterialBO(res.data.materialBO);
          setmaterialWBO1(res.data.materialWBO1);
          setmaterialWBO2(res.data.materialWBO2);
          setpercentageBO(res.data.percentageBO);
          setpercentageWBO1(res.data.percentageWBO1);
          setpercentageWBO2(res.data.percentageWBO2);
          setgsmAlc1(res.data.gsmAlc1);
          setgsmAlc2(res.data.gsmAlc2);
          setgsmRc601(res.data.gsmRc601);
          setgsmRc602(res.data.gsmRc602);

          setjetlaceVacuumStd(setValueOrNull(res.data.jetlaceVacuumStd));
          setjetlacePwStd(setValueOrNull(res.data.jetlacePwStd));
          setjetlaceInj01Std(setValueOrNull(res.data.jetlaceInj01Std));
          setjetlaceIpaStd(setValueOrNull(res.data.jetlaceIpaStd));
          setjetlaceInj11Std(setValueOrNull(res.data.jetlaceInj11Std));
          setjetlaceInj12Std(setValueOrNull(res.data.jetlaceInj12Std));
          setjetlaceInj21Std(setValueOrNull(res.data.jetlaceInj21Std));
          setjetlaceVacuumSet(setValueOrNull(res.data.jetlaceVacuumSet));
          setjetlacePwSet(setValueOrNull(res.data.jetlacePwSet));
          setjetlaceInj01Set(setValueOrNull(res.data.jetlaceInj01Set));
          setjetlaceIpaSet(setValueOrNull(res.data.jetlaceIpaSet));
          setjetlaceInj11Set(setValueOrNull(res.data.jetlaceInj11Set));
          setjetlaceInj12Set(setValueOrNull(res.data.jetlaceInj12Set));
          setjetlaceInj21Set(setValueOrNull(res.data.jetlaceInj21Set));

          setremark(res.data.remarks);

          setSupervisorSubmitOn(res.data.supervisor_submit_on);
          setQASubmitOn(res.data.qa_submit_on);
          setHodSubmitOn(res.data.hod_submit_on);
          setQASign(res.data.qa_sign);
          setQAstatus(res.data.qa_status);
          setHodStatus(res.data.hod_status);
          setHodSign(res.data.hod_sign);
          setSupervisorSign(res.data.supervisor_sign);
          setSupervisorStatus(res.data.supervisor_status);
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.supervisor_sign}`,
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

          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hod_sign}`,
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
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.qa_sign}`,
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
              setGetImageQA(url);
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handlerollno = (value) => {
    setrollnolist(value); // Update the selected value in state
    console.log("Selected Batch No:", value);
    fetchDatabyfromorder_toorder_rollnumber(value);
  };
  const fetchDataRollnumber = async (value) => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/getBaleLovByOrderNo?order=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log("Shift details fetched:", res.data);
          const data = res.data.map((laydownno) => laydownno.RollNumber);
          setrollno(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      console.log("Date new", newdate);
      fetchData();
      fetchDataOrderNumber();
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
            `${API.prodUrl}/Precot/api/spulance/sampleReportOrders`,
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

  const handleBlur_range60_95 = () => {
    if (jetlaceVacuumStd < 60 || jetlaceVacuumStd > 95) {
      message.error(
        "Range Should be between 60 to 95 for JETLACE SETTINGS Vacuum in %"
      );
      setjetlaceVacuumStd("");
    }
  };

  const handleChangejetlaceVacuumStd = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 2) {
      setjetlaceVacuumStd(inputValue);
    }
  };

  const handleBlur_range60_95_SET = () => {
    if (jetlaceVacuumSet < 50 || jetlaceVacuumSet > 100) {
      message.error(
        "Range Should be between 50 to 100 for JETLACE SETTINGS Vacuum in % SET"
      );
      setjetlaceVacuumSet("");
    }
  };

  const handleChangejetlaceVacuumSet = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceVacuumSet(inputValue);
    }
  };
  const handleBlur_range0_10 = () => {
    if (jetlacePwStd < 0 || jetlacePwStd > 10) {
      message.error(
        "Range Should be between 0 to 10 for JETLACE SETTINGS PW in PSI"
      );
      setjetlacePwStd("");
    }
  };

  const handleChangejetlacePwStd = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 2) {
      setjetlacePwStd(inputValue);
    }
  };
  const handleBlur_range0_10_set = () => {
    if (jetlacePwSet < 0 || jetlacePwSet > 10) {
      message.error(
        "Range Should be between 0 to 10 for JETLACE SETTINGS PW in PSI SET"
      );
      setjetlacePwSet("");
    }
  };

  const handleChangejetlacePwSet = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 2) {
      setjetlacePwSet(inputValue);
    }
  };
  const handleBlur_range10_50INJ01_std = () => {
    if (jetlaceInj01Std < 10 || jetlaceInj01Std > 50) {
      message.error(
        "Range Should be between 10 to 50 for JETLACE SETTINGS in INJ01 in Bar STD"
      );
      setjetlaceInj01Std("");
    }
  };

  const handleChangeINJ01_std = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 2) {
      setjetlaceInj01Std(inputValue);
    }
  };
  const handleBlur_range10_50INJ01_set = () => {
    if (jetlaceInj01Set < 0 || jetlaceInj01Set > 120) {
      message.error(
        "Range Should be between 0 to 120 for JETLACE SETTINGS in INJ01 in Bar SET"
      );
      setjetlaceInj01Set("");
    }
  };

  const handleChangeINJ01_set = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceInj01Set(inputValue);
    }
  };
  const handleBlur_range10_90_jetlaceIpaStd = () => {
    if (jetlaceIpaStd < 10 || jetlaceIpaStd > 90) {
      message.error(
        "Range Should be between 10 to 90 for JETLACE SETTINGS  IPA in Bar"
      );
      setjetlaceIpaStd("");
    }
  };

  const handleChangejetlaceIpaStd = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceIpaStd(inputValue);
    }
  };
  const handleBlur_range10_90_jetlaceIpaSet = () => {
    if (jetlaceIpaSet < 0 || jetlaceIpaSet > 120) {
      message.error(
        "Range Should be between 10 to 90 for JETLACE SETTINGS  IPA in Bar SET"
      );
      setjetlaceIpaSet("");
    }
  };

  const handleChangejetlaceIpaSet = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceIpaSet(inputValue);
    }
  };

  const handleBlur_range10_90_jetlaceInj11Std = () => {
    if (jetlaceInj11Std < 10 || jetlaceInj11Std > 90) {
      message.error(
        "Range Should be between 10 to 50 for JETLACE SETTINGS  INJ11 in Bar"
      );
      setjetlaceInj11Std("");
    }
  };

  const handleChangejetlaceInj11Std = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceInj11Std(inputValue);
    }
  };
  const handleBlur_range10_90_jetlaceInj11Set = () => {
    if (jetlaceInj11Set < 0 || jetlaceInj11Set > 120) {
      message.error(
        "Range Should be between 10 to 90 for JETLACE SETTINGS  INJ11 in Bar SET"
      );
      setjetlaceInj11Set("");
    }
  };

  const handleChangejetlaceInj11Set = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceInj11Set(inputValue);
    }
  };
  const handleBlur_range10_90_jetlaceInj12Std = () => {
    if (jetlaceInj12Std < 10 || jetlaceInj12Std > 90) {
      message.error(
        "Range Should be between 10 to 50 for JETLACE SETTINGS  INJ12 in Bar"
      );
      setjetlaceInj12Std("");
    }
  };

  const handleChangejetlaceInj12Std = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 2) {
      setjetlaceInj12Std(inputValue);
    }
  };
  const handleBlur_range10_90_jetlaceInj12Set = () => {
    if (jetlaceInj12Set < 0 || jetlaceInj12Set > 120) {
      message.error(
        "Range Should be between 10 to 90 for JETLACE SETTINGS  INJ12 in Bar"
      );
      setjetlaceInj12Set("");
    }
  };

  const handleChangejetlaceInj12Set = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceInj12Set(inputValue);
    }
  };
  const handleBlur_range10_90_jetlaceInj21Std = () => {
    if (jetlaceInj21Std < 10 || jetlaceInj21Std > 90) {
      message.error(
        "Range Should be between 10 to 50 for JETLACE SETTINGS  INJ21 in Bar"
      );
      setjetlaceInj21Std("");
    }
  };

  const handleChangejetlaceInj21Std = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 2) {
      setjetlaceInj21Std(inputValue);
    }
  };

  const handleBlur_range10_90_jetlaceInj21Set = () => {
    if (jetlaceInj21Set < 0 || jetlaceInj21Set > 120) {
      message.error(
        "Range Should be between 10 to 90 for JETLACE SETTINGS  INJ21 in Bar SET"
      );
      setjetlaceInj21Set("");
    }
  };
  const canEdit = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        selectedRow &&
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.qa_status !== "QA_REJECTED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        (selectedRow &&
          selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
          (selectedRow?.hod_status === "HOD_APPROVED" ||
            selectedRow?.hod_status === "WAITING_FOR_APPROVAL") &&
          selectedRow?.qa_status === "WAITING_FOR_APPROVAL ") ||
        "QA_APPROVED"
      );
    } else if (roleauth === "ROLE_QA") {
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

  const handleChangejetlaceInj21Set = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (inputValue.length <= 3) {
      setjetlaceInj21Set(inputValue);
    }
  };
  const handleKeyPress = (e) => {
    const allowedKeys = /[0-9]/;
    const specialKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    // Check if the pressed key is allowed
    if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    // Check current input length
    if (values.length >= 3 && !specialKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
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
    const isValid = () => {
      if (!ordernolist) return "Order NoTo is required";
      if (!rollnolist) return "Roll Number  is required";
      if (!machineCleanedThoroughly)
        return "Machine cleaned thoroughly status is required";
      if (!settingAndParametersChanged)
        return "Setting and parameters changed status is required";
      if (!materialMixingChangedvalue)
        return "Material mixing changed status is required";
      if (!qcCheckedApprovalTrialRun)
        return "QC checked approval for trial run is required";
      if (!QC_Checked_And_approval)
        return "Trial roll taken QC approval is required";

      // if (!cd) return "QC CD is required";
      // if (!md) return "QC MD is required";
      // if (!GSM) return "QC GSM is required";
      // if (!Moisture) return "QC Moisture is required";
      // if (!Thickness) return "QC Thickness is required";

      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);
    console.log("Date1", token);
    // const remarkToSave = String(remarks).trim() === "" ? "NA" : String(remarks).trim();
    const remarkToSave = (remark || "").trim() === "" ? "NA" : remark;
    const parsedDate = moment(date, "DD/MM/YYYY"); // Parse the date
    const dateformat = parsedDate.format("YYYY-MM-DD");
    const payload = {
      listId: id,
      formatName: "PRODUCT CHANGE OVER CHECK LIST SPUNLACE",
      formatNo: "PH-PRD02/F-010",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      unit: "H",
      date: dateformat || "",
      shift: shift || "",
      orderNoFrom: orderNo || "",
      orderNoTo: ordernolist || "",
      shaftNumber: SHAFT_NUMBER || "",

      productName: PRODUCT_NAME || "",
      mixingFrom: MIXING_FROM || "",
      mixingTo: MIXING_TO || "",
      rollNumber: rollnolist || "",

      machineCleanedThoroughly: machineCleanedThoroughly || "",
      settingAndParametersChanged: settingAndParametersChanged || "",
      materialMixingChanged: materialMixingChangedvalue || "",
      qcCheckedApprovalTrialRun: qcCheckedApprovalTrialRun || "",
      trialRollTakenQcApproval: QC_Checked_And_approval || "",

      qcCd: cd || "",
      qcMd: md || "",
      qcGsm: GSM || "",
      qcMoisture: Moisture || "",
      qcThickness: Thickness || "",

      productNameOperatingParam: productNameOperatingParam || "",
      patternTop: patternTop || "",
      patternBottom: patternBottom || "",
      noOfRollsWidth: noOfRollsWidth || "",

      gsmOperatingParam: gsmOperatingParam || "",
      moisture: moisture || "",
      rollNetWt: rollNetWt || "",
      rollDia: rollDia || "",
      rollLength: rollLength || "",

      materialBO: materialBO || "",
      materialWBO1: materialWBO1 || "",
      materialWBO2: materialWBO2 || "",
      

      percentageBO: percentageBO || "",
      percentageWBO1: percentageWBO1 || "",
      percentageWBO2: percentageWBO2 || "",

      gsmAlc1: gsmAlc1 || "",
      gsmAlc2: gsmAlc2 || "",
      gsmRc601: gsmRc601 || "",
      gsmRc602: gsmRc602 || "",

      jetlaceVacuumStd: jetlaceVacuumStd === "" ? "NA" : jetlaceVacuumStd,
      jetlacePwStd: jetlacePwStd === "" ? "NA" : jetlacePwStd,
      jetlaceInj01Std: jetlaceInj01Std === "" ? "NA" : jetlaceInj01Std,
      jetlaceIpaStd: jetlaceIpaStd === "" ? "NA" : jetlaceIpaStd,

      jetlaceInj11Std: jetlaceInj11Std === "" ? "NA" : jetlaceInj11Std,
      jetlaceInj12Std: jetlaceInj12Std === "" ? "NA" : jetlaceInj12Std,
      jetlaceInj21Std: jetlaceInj21Std === "" ? "NA" : jetlaceInj21Std,
      jetlaceVacuumSet: jetlaceVacuumSet === "" ? "NA" : jetlaceVacuumSet,
      jetlacePwSet: jetlacePwSet === "" ? "NA" : jetlacePwSet,
      jetlaceInj01Set: jetlaceInj01Set === "" ? "NA" : jetlaceInj01Set,

      jetlaceIpaSet: jetlaceIpaSet === "" ? "NA" : jetlaceIpaSet,
      jetlaceInj11Set: jetlaceInj11Set === "" ? "NA" : jetlaceInj11Set,
      jetlaceInj12Set: jetlaceInj12Set === "" ? "NA" : jetlaceInj12Set,
      jetlaceInj21Set: jetlaceInj21Set === "" ? "NA" : jetlaceInj21Set,
      remarks: remarkToSave || "",
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProductChangeOverCheckList/SaveProductChangeOverCheckList`,
        payload,
        { headers }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Form Saved Successfully");
        navigate("/Precot/Spunlace/F-11/Summary");
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
  };

  const handleSubmit = () => {
    const isValid = () => {
      if (!machineCleanedThoroughly)
        return "Machine cleaned thoroughly status is required";
      if (!settingAndParametersChanged)
        return "Setting and parameters changed status is required";
      if (!materialMixingChangedvalue)
        return "Material mixing changed status is required";
      if (!qcCheckedApprovalTrialRun)
        return "QC checked approval for trial run is required";
      if (!QC_Checked_And_approval)
        return "Trial roll taken QC approval is required";

      if (!cd) return "QC CD is required";
      if (!md) return "QC MD is required";
      if (!GSM) return "QC GSM is required";
      if (!Moisture) return "QC Moisture is required";
      if (!Thickness) return "QC Thickness is required";

      if (!percentageBO) return "Percentage BO is required";
      if (!percentageWBO1) return "Percentage WBO1 is required";
      if (!percentageWBO2) return "Percentage WBO2 is required";
      if (!materialBO) return "Material BO is required";
      if (!materialWBO1) return "Material WBO1 is required";
      if (!materialWBO2) return "Material WBO2 is required";

      if (!gsmAlc1) return "GSM Alc1 is required";
      if (!gsmAlc2) return "GSM Alc2 is required";
      if (!gsmRc601) return "GSM Rc601 is required";
      if (!gsmRc602) return "GSM Rc602 is required";

      if (!jetlaceIpaSet) return "Jetlace IPA set is required";
      if (!jetlaceInj11Set) return "Jetlace injection 11 set is required";
      if (!jetlaceInj12Set) return "Jetlace injection 12 set is required";
      if (!jetlaceInj21Set) return "Jetlace injection 21 set is required";
      if (!remarks) return "Remarks are required";

      return null;
      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);
    console.log("Date1", token);
    // const remarkToSave = String(remarks).trim() === "" ? "NA" : String(remarks).trim();
    const remarkToSave = (remark || "").trim() === "" ? "NA" : remark;
    const parsedDate = moment(date, "DD/MM/YYYY"); // Parse the date
    const dateformat = parsedDate.format("YYYY-MM-DD");

    const payload = {
      listId: id,
      formatName: "PRODUCT CHANGE OVER CHECK LIST SPUNLACE",
      formatNo: "PH-PRD02/F-010",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      unit: "H",
      date: dateformat || "",
      shift: shift || "",
      orderNoFrom: orderNo || "",
      orderNoTo: ordernolist || "",
      shaftNumber: SHAFT_NUMBER || "",

      productName: PRODUCT_NAME || "",
      mixingFrom: MIXING_FROM || "",
      mixingTo: MIXING_TO || "",
      rollNumber: rollnolist || "",

      machineCleanedThoroughly: machineCleanedThoroughly || "",
      settingAndParametersChanged: settingAndParametersChanged || "",
      materialMixingChanged: materialMixingChangedvalue || "",
      qcCheckedApprovalTrialRun: qcCheckedApprovalTrialRun || "",
      trialRollTakenQcApproval: QC_Checked_And_approval || "",

      qcCd: cd || "",
      qcMd: md || "",
      qcGsm: GSM || "",
      qcMoisture: Moisture || "",
      qcThickness: Thickness || "",

      productNameOperatingParam: productNameOperatingParam || "",
      patternTop: patternTop || "",
      patternBottom: patternBottom || "",
      noOfRollsWidth: noOfRollsWidth || "",

      gsmOperatingParam: gsmOperatingParam || "",
      moisture: moisture || "",
      rollNetWt: rollNetWt || "",
      rollDia: rollDia || "",
      rollLength: rollLength || "",

      materialBO: materialBO || "",
      materialWBO1: materialWBO1 || "",
      materialWBO2: materialWBO2 || "",
      

      percentageBO: percentageBO || "",
      percentageWBO1: percentageWBO1 || "",
      percentageWBO2: percentageWBO2 || "",

      gsmAlc1: gsmAlc1 || "",
      gsmAlc2: gsmAlc2 || "",
      gsmRc601: gsmRc601 || "",
      gsmRc602: gsmRc602 || "",

      // jetlaceVacuumStd: jetlaceVacuumStd || "",
      // jetlacePwStd: jetlacePwStd || "",
      // jetlaceInj01Std: jetlaceInj01Std || "",
      // jetlaceIpaStd: jetlaceIpaStd || "",

      // jetlaceInj11Std: jetlaceInj11Std || "",
      // jetlaceInj12Std: jetlaceInj12Std || "",
      // jetlaceInj21Std: jetlaceInj21Std || "",
      // jetlaceVacuumSet: jetlaceVacuumSet || "",
      // jetlacePwSet: jetlacePwSet || "",
      // jetlaceInj01Set: jetlaceInj01Set || "",

      // jetlaceIpaSet: jetlaceIpaSet || "",
      // jetlaceInj11Set: jetlaceInj11Set || "",
      // jetlaceInj12Set: jetlaceInj12Set || "",
      // jetlaceInj21Set: jetlaceInj21Set || "",
      jetlaceVacuumStd: jetlaceVacuumStd === "" ? "NA" : jetlaceVacuumStd,
      jetlacePwStd: jetlacePwStd === "" ? "NA" : jetlacePwStd,
      jetlaceInj01Std: jetlaceInj01Std === "" ? "NA" : jetlaceInj01Std,
      jetlaceIpaStd: jetlaceIpaStd === "" ? "NA" : jetlaceIpaStd,

      jetlaceInj11Std: jetlaceInj11Std === "" ? "NA" : jetlaceInj11Std,
      jetlaceInj12Std: jetlaceInj12Std === "" ? "NA" : jetlaceInj12Std,
      jetlaceInj21Std: jetlaceInj21Std === "" ? "NA" : jetlaceInj21Std,
      jetlaceVacuumSet: jetlaceVacuumSet === "" ? "NA" : jetlaceVacuumSet,
      jetlacePwSet: jetlacePwSet === "" ? "NA" : jetlacePwSet,
      jetlaceInj01Set: jetlaceInj01Set === "" ? "NA" : jetlaceInj01Set,

      jetlaceIpaSet: jetlaceIpaSet === "" ? "NA" : jetlaceIpaSet,
      jetlaceInj11Set: jetlaceInj11Set === "" ? "NA" : jetlaceInj11Set,
      jetlaceInj12Set: jetlaceInj12Set === "" ? "NA" : jetlaceInj12Set,
      jetlaceInj21Set: jetlaceInj21Set === "" ? "NA" : jetlaceInj21Set,
      remarks: remarkToSave || "",
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProductChangeOverCheckList/SubmitProductChangeOverCheckList`,
        payload,
        { headers }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Form Submit Successfully");
        navigate("/Precot/Spunlace/F-11/Summary");
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
        `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${orderNo}`,
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (orderNo) {
      checkBmrExist();
    }
  }, []);

  const checkBmrExist = async () => {
    const { newdate, shiftvalue, orderNo } = state || {};

    console.log("new Date", newdate, shiftvalue, orderNo);

    const numberShift = convertShiftValue(shiftvalue);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/splSampleOrders?order=${orderNo}&date=${newdate}&shift=${numberShift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response shift", response.data);
      SetOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (ReportDetails) {
      const initialRemarks = ReportDetails.map((detail) => detail.remarks);
      setRemarks(initialRemarks);
    }
  }, [ReportDetails]);

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = response.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [response,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = response.hod_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [response,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = response.qa_sign;
    if (username) {
      console.log("usernameparams", username);

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
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [response,API.prodUrl, token]);

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-11/Summary");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleChange_Machine_Cleaned = (event) => {
    SetmachineCleanedThoroughly(event.target.value);
  };
  const handleqcCheckedApprovalTrialRun = (event) => {
    setqcCheckedApprovalTrialRun(event.target.value);
  };
  const handleQC_Checked_And_approval = (event) => {
    SetQC_Checked_And_approval(event.target.value);
  };

  const handlesettingAndParametersChanged = (event) => {
    setsettingAndParametersChanged(event.target.value);
  };
  const handlematerialMixingChanged = (event) => {
    SetmaterialMixingChangedvalue(event.target.value);
  };
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

  const formattedQADate = QASubmitOn
    ? moment(QASubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedSupervisorDate = SupervisorSubmitOn
    ? moment(SupervisorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = HodSubmitOn
    ? moment(HodSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const handleMaterialBO = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 2) {
      setmaterialBO(inputValue);
    }
  };

  const handleMaterialWBO1 = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 2) {
      setmaterialWBO1(inputValue);
    }
  };

  const handleMaterialWBO2 = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 2) {
      setmaterialWBO2(inputValue);
    }
  };

  const handleMaterialALCGSM = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 2) {
      setgsmAlc1(inputValue);
    }
  };

  const handleMaterialRCGSM = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 2) {
      setgsmRc601(inputValue);
    }
  };
  const items = [
    {
      key: "1",
      label: <p>PRODUCT CHANGE OVER CHECK LIST SPUNLACE</p>,
      children: (
        <div>
          <table
            style={{
              width: "100%",
              margin: "auto",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          >
            <tbody>
              <tr>
                <td
                  colSpan={20}
                  style={{ paddingLeft: "5px", fontSize: "14px" }}
                >
                  For Organic: Material from All Machine Removed and Packed
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "8px" }}>
                  Machine Cleaned Thoroughly
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Yes/No
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={handleChange_Machine_Cleaned}
                    value={machineCleanedThoroughly}
                    style={{ textAlign: "center" }}
                    disabled={!isEditable}
                  >
                    <Radio
                      value="Yes"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "8px" }}>
                  Setting And Parameters changed
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Yes/No
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={handlesettingAndParametersChanged}
                    value={settingAndParametersChanged}
                    style={{ textAlign: "center" }}
                    disabled={!isEditable}
                  >
                    <Radio
                      value="Yes"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "8px" }}>
                  Material Mixing Changed
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Yes/No
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={handlematerialMixingChanged}
                    value={materialMixingChangedvalue}
                    style={{ textAlign: "center" }}
                    disabled={!isEditable}
                  >
                    <Radio
                      value="Yes"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>

              <tr>
                <td colSpan={8} style={{ paddingLeft: "8px" }}>
                  Trail roll Taken and Send for QC Approval
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Yes/No
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={handleqcCheckedApprovalTrialRun}
                    value={qcCheckedApprovalTrialRun}
                    style={{ textAlign: "center" }}
                    disabled={!isEditable}
                  >
                    <Radio
                      value="Yes"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "8px" }}>
                  QC Checked And approval For Trail Run
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Yes/No
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={handleQC_Checked_And_approval}
                    value={QC_Checked_And_approval}
                    style={{ textAlign: "center" }}
                    disabled={!isEditable}
                  >
                    <Radio
                      value="Yes"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan={20} style={{ paddingLeft: "8px" }}>
                  QC Report:
                </td>
              </tr>
              <tr>
                <td colSpan={10} style={{ paddingLeft: "8px" }}>
                  CD :
                </td>
                <td colSpan={10}>
                  <Input
                    type="number"
                    value={cd}
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setcd(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={10} style={{ paddingLeft: "8px" }}>
                  MD :
                </td>
                <td colSpan={10}>
                  <Input
                    type="number"
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    value={md}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setmd(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={10} style={{ paddingLeft: "8px" }}>
                  GSM :
                </td>
                <td colSpan={10}>
                  <Input
                    type="number"
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    value={GSM}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setGSM(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={10} style={{ paddingLeft: "8px" }}>
                  MOISTURE :
                </td>
                <td colSpan={10}>
                  <Input
                    type="number"
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    value={Moisture}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setMoisture(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={10} style={{ paddingLeft: "8px" }}>
                  THICKNESS :
                </td>
                <td colSpan={10}>
                  <Input
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="number"
                    value={Thickness}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setThickness(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div
            className="pagination"
            style={{ textAlign: "right", marginTop: "20px" }}
          >
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="pagination-button"
                style={{
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Previous
              </button>
            )}

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="pagination-button"
                style={{
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>PRODUCT CHANGE OVER CHECK LIST SPUNLACE</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto" }}>
            <tbody>
              <tr>
                <td colSpan={20}>SPUNLACE STANDARD OPERATING PARAMETERS</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Product Name
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Pattern Top
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Pattern-Bottom
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No of Rolls x Width
                </td>
              </tr>
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {productNameOperatingParam}
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {patternTop}
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {patternBottom}
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {noOfRollsWidth}
                </td>
              </tr>
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  GSM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  MOISTURE
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  ROLL NET WT KG
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  ROLL DIA IN MM
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ROLL LENGTH in MTRS
                </td>
              </tr>
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {gsmOperatingParam}
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {moisture}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  {rollNetWt}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  {rollDia}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {rollLength}
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Bale opener{" "}
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  BO
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  WBO-1
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  WBO-2
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ALC Cards
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  GSM
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  REITER Cards
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  GSM
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Material
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  {/* CN100 */}
                  <Input
                    type="text"
                    onChange={(e) => {
                      setmaterialBO(e.target.value);
                    }}
                    value={materialBO}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {/* CN100 */}
                  <Input
                    type="text"
                    onChange={(e) => {
                      setmaterialWBO1(e.target.value);
                    }}
                    value={materialWBO1}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {/* Rp */}
                  <Input
                    type="text"
                    onChange={(e) => {
                      setmaterialWBO2(e.target.value);
                    }}
                    value={materialWBO2}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ALC1
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    // onKeyDown={(e) => {
                    //   if (
                    //     e.key === 'e' ||
                    //     e.key === 'E' ||
                    //     e.key === '-' ||
                    //     e.key === '+' ||
                    //     (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    value={gsmAlc1}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setgsmAlc1(e.target.value)}
                    // onChange={handleMaterialALCGSM}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  R C60 1
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    // onKeyDown={(e) => {
                    //   if (
                    //     e.key === 'e' ||
                    //     e.key === 'E' ||
                    //     e.key === '-' ||
                    //     e.key === '+' ||
                    //     (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    value={gsmRc601}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setgsmRc601(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Percentage
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={percentageBO}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setpercentageBO(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={percentageWBO1}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setpercentageWBO1(e.target.value)}
                    disabled={!isEditable}
                  />{" "}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={percentageWBO2}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setpercentageWBO2(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  ALC2
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    // onKeyDown={(e) => {
                    //   if (
                    //     e.key === 'e' ||
                    //     e.key === 'E' ||
                    //     e.key === '-' ||
                    //     e.key === '+' ||
                    //     (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    value={gsmAlc2}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setgsmAlc2(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  R C60 2
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    // onKeyDown={(e) => {
                    //   if (
                    //     e.key === 'e' ||
                    //     e.key === 'E' ||
                    //     e.key === '-' ||
                    //     e.key === '+' ||
                    //     (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    value={gsmRc602}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onChange={(e) => setgsmRc602(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={20} style={{ paddingLeft: "5px" }}>
                  JETLACE SETTINGS:
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  &nbsp;
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Vacuum in %
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  PW in PSI
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  INJ01 in Bar
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  IPA in Bar
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  INJ11 in Bar
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  INJ12 in Bar
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  INJ21 in Bar
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  STD
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  50 to 100
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  0 to 10
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  0 to 120
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  0 to 120
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 to 120
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 to 120
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 to 120
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  SET
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={jetlaceVacuumSet}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onBlur={handleBlur_range60_95_SET}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangejetlaceVacuumSet}
                    onChange={handleChangejetlaceVacuumSet}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={jetlacePwSet}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onBlur={handleBlur_range0_10_set}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangejetlacePwSet}
                    onChange={handleChangejetlacePwSet}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={jetlaceInj01Set}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onBlur={handleBlur_range10_50INJ01_set}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangeINJ01_set}
                    onChange={handleChangeINJ01_set}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={jetlaceIpaSet}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onBlur={handleBlur_range10_90_jetlaceIpaSet}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangejetlaceIpaSet}
                    onChange={handleChangejetlaceIpaSet}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={jetlaceInj11Set}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onBlur={handleBlur_range10_90_jetlaceInj11Set}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangejetlaceInj11Set}
                    onChange={handleChangejetlaceInj11Set}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={jetlaceInj12Set}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onBlur={handleBlur_range10_90_jetlaceInj12Set}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangejetlaceInj12Set}
                    onChange={handleChangejetlaceInj12Set}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={jetlaceInj21Set}
                    style={{
                      width: "100%",
                      fontSize: "11px",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onBlur={handleBlur_range10_90_jetlaceInj21Set}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangejetlaceInj21Set}
                    onChange={handleChangejetlaceInj21Set}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={20}>
                  <div> Remarks:</div>
                  <textarea
                    value={remark}
                    style={{ width: "100%" }}
                    onChange={(e) => setremark(e.target.value)}
                    disabled={!isEditable}
                    rows="4"
                    cols="50"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto" }}>
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>

              <td colSpan="10" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                QA Sign & Date
              </td>
            </tr>

            <tr>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                <div>
                  {response?.supervisor_status === "SUPERVISOR_APPROVED" && (
                    <>
                      {SupervisorSign}
                      <br />
                      {formattedSupervisorDate}

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
                </div>
              </td>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                <div>
                  {(response?.hod_status === "HOD_APPROVED" ||
                    response?.hod_status === "HOD_REJECTED" ||
                    response?.qa_status === "QA_APPROVED" ||
                    response?.qa_status === "QA_REJECTED") && (
                    <>
                      {HodSign}
                      <br />
                      {formattedhodDate}

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
                </div>
              </td>
              <td colSpan="10" style={{ height: "70px", textAlign: "center" }}>
                <div>
                  {(response?.qa_status === "QA_APPROVED" ||
                    response?.qa_status === "QA_REJECTED") && (
                    <>
                      {QASign}
                      <br />
                      {formattedQADate}

                      {getImageQA && (
                        <>
                          <br />
                          <img
                            src={getImageQA}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
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
        formName="PRODUCT CHANGE OVER CHECK LIST SPUNLACE "
        formatNo="PH-PRD02/F-010"
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
          ...(role === "ROLE_HOD" ||
          role === "ROLE_QC" ||
          role === "ROLE_QA" ||
          role === "ROLE_DESIGNEE"
            ? [
                <Button
                  key="approve"
                  loading={loading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  onClick={handleApprove}
                  shape="round"
                  // icon={<img src={approveIcon} alt="Approve Icon" />}
                  icon={<IoSave color="#00308F" />}
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
                  // icon={<img src={rejectIcon} alt="Reject Icon" />}
                  icon={<GrDocumentStore color="#00308F" />}
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
          disabled
          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Shift"
          placeholder="SHIFT"
          disabled
          readOnly
          value={shift}
          style={{ width: "100%", height: "35px" }}

          // onChange={(e) => setBmr_No(e.target.value)}
        />

        <Input
          addonBefore="Order No From"
          placeholder="ORDER No From"
          readOnly
          value={orderNo}
          disabled
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
        <div
          style={{
            fontSize: "14px",
            borderRadius: "3px 0px 0px 3px",
            padding: "7px 0px 7px 7px",
            position: "relative",
            border: "1px solid #dddd",
            width: "40%",
            left: "11px",
            zIndex: 9,

            backgroundColor: "#fafafa",
          }}
        >
          {" "}
          OrderNo To:
        </div>
        <Select
          style={{ width: "150px" }}
          placeholder="Select Order No"
          value={ordernolist}
          onChange={handleorderno}
          showSearch
          disabled={!isEditable}
        >
          {orderno.map((MacLOV, index) => (
            <Option key={index} value={MacLOV}>
              {MacLOV}
            </Option>
          ))}
        </Select>
        <div
          style={{
            fontSize: "14px",
            borderRadius: "3px 0px 0px 3px",
            padding: "10px 0px 7px 3px",
            position: "relative",
            border: "1px solid #dddd",
            width: "20%",
            left: "11px",
            zIndex: 9,

            backgroundColor: "#fafafa",
          }}
        >
          Select Roll No :
        </div>
        <Select
          style={{ width: "40%" }}
          placeholder="Select Roll No"
          value={rollnolist}
          onChange={handlerollno}
          showSearch
          disabled={!isEditable}
        >
          {rollno.map((MacLOV, index) => (
            <Option key={index} value={MacLOV}>
              {MacLOV}
            </Option>
          ))}
        </Select>
        <Input
          addonBefore="Product Name"
          placeholder="PRODUCT NAME"
          readOnly
          value={PRODUCT_NAME}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
        <Input
          addonBefore="Mixing From"
          placeholder="Mixing From"
          readOnly
          value={MIXING_FROM}
          style={{ width: "100%", height: "35px" }}
          disabled
        />
        <Input
          addonBefore="Mixing To"
          placeholder="Mixing To"
          readOnly
          value={MIXING_TO}
          style={{ width: "100%", height: "35px" }}
          disabled
        />
        <Input
          addonBefore="Shaft Number"
          placeholder="Shaft Number"
          readOnly
          disabled
          value={SHAFT_NUMBER}
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

export default Spunlace_f11;
