import {
  Button,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const DryGoods_F002 = () => {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const navigate = useNavigate("");
  const [selectedRow, setSelectedRow] = useState("");
  const [stoppage, setstoppage] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  // const [order_no, Setorder_no] = useState("");
  const [STD_WIDTH, SetSTD_WIDTH] = useState("");
  const [MIXING, SetMIXING] = useState("");
  const [STD_GSM, SetSTD_GSM] = useState("");
  const [layDownNo, SetLayDownNo] = useState("");
  const [stdWtGrams, SetStdWtGrams] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState(null);
  const [gmp, setGmp] = useState("");
  const [draft, setDraft] = useState("");
  const [dofferSpeed, setDofferSpeed] = useState("");
  const [sliverLength, setSliverLength] = useState("");
  const [firtsHr, setFirstHr] = useState(0);
  const [secondHr, setSecondHr] = useState(0);
  const [thridHr, setThirdHr] = useState(0);
  const [fourthHr, setFourthHr] = useState(0);
  const [fifthHr, setFifthHr] = useState(0);
  const [sixHr, setSixHr] = useState(0);
  const [sevenHr, setSevenHr] = useState(0);
  const [eightHr, setEightHr] = useState(0);
  const [totalHr, setTotalHr] = useState(0);
  const [Operatorstatus, setOperatorstatus] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sliverId, setSliverId] = useState();
  const [compactWt, setCompactWt] = useState();
  const [sliverWt, setSliverWt] = useState();
  const [statusLoader, setStatusLoader] = useState(false);
  const [natureOfProblem, setNAtureofProblem] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [restartTime, setRestartTime] = useState("");
  const [idleTime, setIdleTime] = useState("");
  const [orderNo, setOrderNo] = useState([]);
  const [mixingLov, setMixingLov] = useState([]);
  const [laydownLov, setLaydownLov] = useState([]);
  const [reviews, setReviews] = useState({
    operator_sign: "",
    operator_submitted_on: "",
    hod_sign: "",
    hod_submit_on: "",
    operator_status: "",
    hod_status: "",
  });
  const location = useLocation();
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const { state } = location;
  const initialized = useRef(false);
  const { newdate, shiftvalue, machineName, order_no } = state || {};
  console.log("dateee", newdate);
  console.log("MachineNameee", machineName);
  console.log("shiftvalue", shiftvalue);
  console.log("order_no", order_no);
  const [MACHINEname, setMACHINEname] = useState("");
  const stdWtGramsLOV = [
    { value: "4.0", label: "4.0" },
    { value: "5.0", label: "5.0" },
  ];
  const CardingLov = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
  ];

 

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const initialized3 = useRef(false);

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = reviews[key];
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [reviews]);

  const [loadingApprove, setLoadingApprove] = useState(false);

  const [hourValues, setHourValues] = useState({
    firstHr: "",
    secondHr: "",
    thirdHr: "",
    fourthHr: "",
    fifthHr: "",
    sixHr: "",
    sevenHr: "",
    eightHr: "",
  });

  useEffect(() => {
    const total = Object.values(hourValues).reduce((sum, value) => {
      const numericValue = parseFloat(value); // Convert to number
      return !isNaN(numericValue) ? sum + numericValue : sum; // Add only if it's a valid number
    }, 0);
    setTotalHr(total); // Set the total
  }, [hourValues]);

  const handleHourChange = (name) => (e) => {
    setHourValues((prevValues) => ({
      ...prevValues,
      [name]: e.target.value,
    }));
  };

  const [details, setRows] = useState([
    { id: "", can_no: "", gpm: "", carding_mc_no: "", net_wt: "" },
  ]);

  const handleSelectText = (e) => {
    if (e.key === "Enter") {
      SetMIXING(e.target.value);
    }
  };

  const handleSelectText1 = (e) => {
    if (e.key === "Enter") {
      SetStdWtGrams(e.target.value);
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
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
    if (roleauth == "ROLE_OPERATOR") {
      if (
        (selectedRow?.operator_status == "OPERATOR_APPROVED" &&
          selectedRow?.supervisor_status == "SUPERVISOR_REJECTED") ||
        ("SUPERVISOR_APPROVED" && selectedRow?.hod_status == "HOD_REJECTED")
      ) {
        return "none";
      } else if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status == "WAITING_FOR_APPROVAL" &&
        (selectedRow?.hod_status == "" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleauth == "ROLE_SUPERVISOR") {
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
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
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

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/DryGoods/F-002/Summary");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // const handleInputChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const newRows = [...details];
  //   newRows[index][name] = value;
  //   setRows(newRows);
  // };

  useEffect(() => {
    if (!initialized3.current) {
      const token = localStorage.getItem("token");
      initialized3.current = true;
      const fetchDatas = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/goodsLaydown/LaydownLov`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data.map((option) => ({
              value: option.drygoods_laydown_number,
              label: option.drygoods_laydown_number,
            }));
            setLaydownLov(a);
          }
        } catch (error) {
          // message.error(error.response.data.message);
        }
      };
      fetchDatas();
    }
  });

  const handleInputChange = (index, name, value) => {
    const newRows = [...details];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...details,
      {
        can_no: "",
        gpm: "",
        carding_mc_no: "",
        net_wt: "",
      },
    ]);
  };

  const { confirm } = Modal;

  const deleteRow = (rowIndex, id) => {
    if (rowIndex == 0) {
      message.warning("One Row Mandatory");
      return;
    }
    if (id && Operatorstatus == "OPERATOR_SAVE") {
      return;
    }
    confirm({
      title: "Are you sure you want to delete this row?",
      onOk() {
        setRows(details.filter((_, index) => index !== rowIndex));
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    if (newdate) {
      setDate(newdate);
    }

    if (shiftvalue) {
      setShift(shiftvalue);
    }
    if (machineName) {
      setMACHINEname(machineName);
    }
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!initialized.current) {
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        setStatus((prevStatus) => ({
          ...prevStatus,
          fieldStatus: true,
        }));
      }
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        if (role == "ROLE_OPERATOR") {
          setStatus((prevStatus) => ({
            ...prevStatus,
            fieldStatus: true,
          }));
        }
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Drygoods/Service/getSliverdetailsbyF02?date=${newdate}&shift=${shiftvalue}&machine_name=${machineName}&order_no=${order_no}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Log the full response to check its structure
          console.log("API Response:", response);

          if (
            (!response.data[0] && role !== "ROLE_OPERATOR") ||
            (response.data[0]?.operator_status !== "OPERATOR_APPROVED" &&
              role !== "ROLE_OPERATOR")
          ) {
            message.warning("Operator Yet To Submit");
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-002/Summary");
            }, 1000);
          }

          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              role !== "ROLE_OPERATOR" &&
              data?.operator_status !== "OPERATOR_APPROVED"
            ) {
              message.warning("Operator Yet To Submit");
              setTimeout(() => {
                navigate("/Precot/DryGoods/F-002/Summary");
              }, 1000);
            }
            console.log("Processed Data:", data);
            setOperatorstatus(data.operator_status);
            setSliverId(data.sliver_id);
            SetMIXING(data.mixing);
            SetLayDownNo(data.laydown_no);
            // Setorder_no(data.order_no);
            SetStdWtGrams(data.std_wt);
            setHourValues({
              firstHr: data.hours_01,
              secondHr: data.hours_02,
              thirdHr: data.hours_03,
              fourthHr: data.hours_04,
              fifthHr: data.hours_05,
              sixHr: data.hours_06,
              sevenHr: data.hours_07,
              eightHr: data.hours_08,
            });
            setTotalHr(data.total_sum);
            setCompactWt(data.compactor_wt);
            setSliverWt(data.sliver_wt);
            setGmp(data.gmp);
            setDraft(data.draft);
            setDofferSpeed(data.doffer_speed);
            setSliverLength(data.sliver_length);
            setReviews((prevState) => ({
              ...prevState,
              operator_sign: data.operator_sign,
              operator_submitted_on: data.operator_submitted_on,
              hod_sign: data.hod_sign,
              hod_submit_on: data.hod_submit_on,
              operator_status: data.operator_status,
              hod_status: data.hod_status,
            }));

            if (data.details) {
              setRows(
                data.details.map((detail) => ({
                  id: detail.id,
                  can_no: detail.can_no,
                  gpm: detail.gpm,
                  carding_mc_no: detail.carding_mc_no,
                  net_wt: detail.net_wt,
                }))
              );
            }

            statusFunction(data);
          } else {
            console.log("Empty array received");
          }
        } catch (error) {
          console.error("Error:", error);
          // Provide a more detailed error message
          message.error(error.response.data.message);
        }
      };

      const fetchPDEData = async () => {
        let pdeShift;
        switch (shiftvalue) {
          case "I":
            pdeShift = 1;
            break;
          case "II":
            pdeShift = 2;
            break;
          case "III":
            pdeShift = 3;
            break;
        }
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/goods/api/sliverStoppage?date=${newdate}&shift=${pdeShift}&machine_name=${machineName}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data) {
            const data = response.data;
            setstoppage(response.data);
            console.log("ResponsedPDE", data);
            setNAtureofProblem(response.data.Scause);
            setStopTime(response.data.FTime);
            setRestartTime(response.data.TTime);
            setIdleTime(response.data.TotHrs);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      const fetchPDEDataLOV = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/goods/getSliver`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data) {
            const data = response.data;
            console.log("ResponsedPDE", data);
            // setOrderNo(response.data);
            setMixingLov(response.data);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
      fetchPDEData();
      fetchPDEDataLOV();
    }
  }, [shift, date, MACHINEname, token, role, navigate]);

  const [rejectModal, setRejectModal] = useState(false);

  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setRejectRemarks("");
  };

  const handleSave = () => {
    setSaveLoading(true);
    const payload = {
      sliver_id: sliverId,
      unit: "Unit H",
      formatNo: "PH-PRD04/F-002",
      revisionNo: "01",
      sopNumber: "PH-PRD04-D-03",
      formatName: "Daily Production - Sliver Making",
      date: date,
      shift: shift,
      machine_name: MACHINEname,
      laydown_no: layDownNo,
      order_no: order_no,
      mixing: MIXING,
      std_wt: stdWtGrams,
      gmp: gmp,
      draft: draft,
      doffer_speed: dofferSpeed,
      sliver_length: sliverLength,
      hours_01: hourValues.firstHr,
      hours_02: hourValues.secondHr,
      hours_03: hourValues.thirdHr,
      hours_04: hourValues.fourthHr,
      hours_05: hourValues.fifthHr,
      hours_06: hourValues.sixHr,
      hours_07: hourValues.sevenHr,
      hours_08: hourValues.eightHr,
      total_sum: totalHr,
      sliver_wt: sliverWt,
      compactor_wt: compactWt,
      details: details.map((detail) => ({
        id: detail.id,
        can_no: detail.can_no,
        gpm: detail.gpm,
        carding_mc_no: detail.carding_mc_no,
        net_wt: detail.net_wt,
      })),
    };
    console.log("payload", payload);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/Drygoods/Service/saveSliverDetails02`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Sliver Making Details Save Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-002/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_OPERATOR" &&
      responseData.operator_status == "OPERATOR_APPROVED" &&
      (responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "HOD_APPROVED")
    ) {
      console.log("Condition 2");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "ROLE_OPERATOR" &&
      responseData.operator_status == "OPERATOR_APPROVED" &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      console.log("Condition 2");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_APPROVED"
    ) {
      console.log("Condition 4");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      message.warning("Operator Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-002/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSubmit = () => {
    if (!date) {
      message.error("Date is required");
      return;
    }
    if (!shift) {
      message.error("Shift is required");
      return;
    }
    if (!MACHINEname) {
      message.error("Machine Name is required");
      return;
    }
    if (!layDownNo) {
      message.error("Laydown No is required");
      return;
    }
    if (!order_no) {
      message.error("Order No is required");
      return;
    }
    if (!MIXING) {
      message.error("Mixing is required");
      return;
    }
    if (!hourValues.firstHr) {
      message.error("First Hour value is required");
      return;
    }
    if (!hourValues.secondHr) {
      message.error("Second Hour value is required");
      return;
    }
    if (!hourValues.thirdHr) {
      message.error("Third Hour value is required");
      return;
    }
    if (!hourValues.fourthHr) {
      message.error("Fourth Hour value is required");
      return;
    }
    if (!hourValues.fifthHr) {
      message.error("Fifth Hour value is required");
      return;
    }
    if (!hourValues.sixHr) {
      message.error("Sixth Hour value is required");
      return;
    }
    if (!hourValues.sevenHr) {
      message.error("Seventh Hour value is required");
      return;
    }
    if (!hourValues.eightHr) {
      message.error("Eighth Hour value is required");
      return;
    }
    if (!totalHr) {
      message.error("Total Sum is required");
      return;
    }
    if (!sliverWt) {
      message.error("Sliver Weight is required");
      return;
    }
    if (!compactWt) {
      message.error("Compactor Weight is required");
      return;
    }
    if (!details || details.length === 0) {
      message.error("Details are required");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      sliver_id: sliverId,
      unit: "Unit H",
      formatNo: "PH-PRD04/F-002",
      revisionNo: "01",
      sopNumber: "PH-PRD04-D-03",
      formatName: "Daily Production - Sliver Making",
      date: date,
      shift: shift,
      machine_name: MACHINEname,
      laydown_no: layDownNo,
      order_no: order_no,
      mixing: MIXING,
      std_wt: stdWtGrams,
      gmp: gmp,
      draft: draft,
      doffer_speed: dofferSpeed,
      sliver_length: sliverLength,
      hours_01: hourValues.firstHr,
      hours_02: hourValues.secondHr,
      hours_03: hourValues.thirdHr,
      hours_04: hourValues.fourthHr,
      hours_05: hourValues.fifthHr,
      hours_06: hourValues.sixHr,
      hours_07: hourValues.sevenHr,
      hours_08: hourValues.eightHr,
      total_sum: totalHr,
      sliver_wt: sliverWt,
      compactor_wt: compactWt,
      details: details.map((detail) => ({
        id: detail.id,
        can_no: detail.can_no,
        gpm: detail.gpm,
        carding_mc_no: detail.carding_mc_no,
        net_wt: detail.net_wt,
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/Drygoods/Service/submitSliverDetails02`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Sliver Making Details Submit Successfully");
        setSubmitLoading(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-002/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setLoadingApprove(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Drygoods/Service/approveOrReject`,
        {
          id: sliverId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoadingApprove(false);

        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-002/Summary");
      })
      .catch((err) => {
        setLoadingApprove(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoadingApprove(false);
      });
  };

  const handleReject = async () => {
    setStatusLoader(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setStatusLoader(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Drygoods/Service/approveOrReject`,
        {
          id: sliverId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setStatusLoader(false);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-002/Summary");
      })
      .catch((err) => {
        setStatusLoader(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const items = [
    {
      key: "1",
      label: <p>Parameters</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "107%", margin: "auto" }}>
            <thead>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  GPM
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Draft
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Doffer Speed in RPM
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Sliver Length in MTRS
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    // onKeyDown={(e) => handleKeyDown(e)}
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={gmp}
                    onChange={(e) => setGmp(e.target.value)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    type="text"
                    // onKeyDown={(e) => handleKeyDown(e)}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    readOnly={status.fieldStatus}
                  />{" "}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    type="text"
                    // onKeyDown={(e) => handleKeyDown(e)}
                    value={dofferSpeed}
                    onChange={(e) => setDofferSpeed(e.target.value)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    type="text"
                    // onKeyDown={(e) => handleKeyDown(e)}
                    value={sliverLength}
                    onChange={(e) => setSliverLength(e.target.value)}
                    readOnly={status.fieldStatus}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Sliver Receipt</p>,
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "107%",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                  }}
                >
                  S.No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Sliver Can No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  GPM
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Carding M/C No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Net Wt In Kg
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {details.map((row, index) => (
                <tr key={index}>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="can_no"
                      value={row.can_no}
                      //   disabled={disable}
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      }
                      readOnly={status.fieldStatus}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      value={row.gpm}
                     
                      type="text"
                     
                      style={{ width: "200px" }}
                      onChange={(e) =>
                        handleInputChange(index, "gpm", e.target.value)
                      }
                      disabled={status.fieldStatus}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    
                    <Select
                      value={row.carding_mc_no}
                      options={CardingLov}
                     
                      style={{ width: "200px" }}
                      onChange={(value) =>
                        handleInputChange(index, "carding_mc_no", value)
                      }
                      disabled={status.fieldStatus}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="net_wt"
                      type="text"
                   
                      value={row.net_wt}
                    
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      }
                      readOnly={status.fieldStatus}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      minWidth: "50px",
                      width: "50px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash style={{ fontSize: "10px" }} />}
                      onClick={() => deleteRow(index, row.id)}
                      disabled={status.fieldStatus}
                      style={{
                        padding: "2px 4px",
                        fontSize: "10px",
                        lineHeight: "12px",
                        height: "24px",
                        width: "auto",
                        minWidth: "auto",
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              border: "1px solid #00308F",
              padding: "8px 12px",
              fontSize: "12px",
              marginRight: "50%",
              marginLeft: "35px",
              display: status.fieldStatus ? "none" : "flex",
            }}
            disabled={status.fieldStatus}
            // disabled={disable}
            // disabled={!isEditable}
            onClick={addRow}
            icon={
              <AiOutlinePlus style={{ color: "#00308F", marginRight: "1px" }} />
            }
          >
            Add Row
          </Button>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Output Details</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "107%", margin: "auto" }}>
            <thead>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Hours
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Total
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: "center", width: "10%" }}>
                  Wt. In Kg
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.firstHr}
                    onChange={handleHourChange("firstHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />{" "}
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.secondHr}
                    onChange={handleHourChange("secondHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.thirdHr}
                    onChange={handleHourChange("thirdHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.fourthHr}
                    onChange={handleHourChange("fourthHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.fifthHr}
                    onChange={handleHourChange("fifthHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.sixHr}
                    onChange={handleHourChange("sixHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.sevenHr}
                    onChange={handleHourChange("sevenHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "45%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={hourValues.eightHr}
                    onChange={handleHourChange("eightHr")}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="number"
                    style={{
                      width: "70%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={totalHr}
                    // onChange={(e) => setTotalHr(e.target.value)}
                    readOnly
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={20} rowSpan={4} style={{ textAlign: "center" }}>
                  Waste in Kg
                </td>
                <td colSpan={15} style={{ textAlign: "center" }}>
                  Compactor Wt. in Kg
                </td>
                <td colSpan={15} style={{ textAlign: "center" }}>
                  Sliver Weight in Kg
                </td>
              </tr>
              <tr>
                <td colSpan={15} style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    style={{
                      width: "70%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={compactWt}
                    onChange={(e) => setCompactWt(e.target.value)}
                    readOnly={status.fieldStatus}
                    // onKeyDown={(e) => handleKeyDown(e)}
                  />{" "}
                </td>
                <td colSpan={15} style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    style={{
                      width: "70%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={sliverWt}
                    onChange={(e) => setSliverWt(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    readOnly={status.fieldStatus}
                  />{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>Stoppage</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "107%", margin: "auto" }}>
            <thead>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Nature Of Problem
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Stop. Time
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Restart Time
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Idle Time (in Min)
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Remarks
                </td>
              </tr>
            </thead>
            <tbody>
              {stoppage &&
                stoppage.map((detail, index) => (
                  <tr>
                    <td
                      colSpan="1"
                      style={{ textAlign: "center", padding: "4px" }}
                    >
                      {detail.Scause}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {detail.FTime}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {detail.TTime}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {detail.TotHrs}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {detail.SRemarks}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "5",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "107%", margin: "auto" }}>
            <tr>
              <td
                colSpan="10"
                style={{
                  textAlign: "center",
                }}
              >
                Operator Sign & Date
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "center",
                }}
              >
                HOD / Designee Sign & Date
              </td>
            </tr>

            <tr>
              <td
                colSpan="10"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      {reviews.operator_sign}
                      <br />
                      {formatDateAndTime(reviews.operator_submitted_on)}
                    </div>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    {eSign.operator_sign ? (
                      <img
                        src={eSign.operator_sign}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </td>

              <td
                colSpan="10"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {reviews.hod_status !== "WAITING_FOR_APPROVAL" &&
                  reviews.hod_status !== "" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          {reviews.hod_sign}
                          <br />
                          {formatDateAndTime(reviews.hod_submit_on)}
                        </div>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        {eSign.hod_sign ? (
                          <img
                            src={eSign.hod_sign}
                            alt="HOD eSign"
                            style={{
                              width: "150px",
                              height: "70px",
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
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName={"Daily Production - Sliver Making "}
        formatNo={"PH-PRD04/F-002"}
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
          role === "ROLE_SUPERVISOR" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE"
            ? [
                <Button
                  key="approve"
                  loading={loadingApprove}
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
                  //   loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<img src={rejectIcon} alt="Reject Icon" />}
                  onClick={rejectFlow}
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
                    display: status.saveStatus ? "none" : "flex",
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={submitLoading}
                  type="primary"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: status.submitStatus ? "none" : "flex",
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
                navigate("/Precot");
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
        ]}
      />
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleReject}
            loading={statusLoader}
          >
            Reject
          </Button>,
        ]}
      >
        <label>Reason : </label>
        <br></br>
        <br></br>
        <TextArea
          type="textArea"
          style={{ height: "100px" }}
          value={rejectRemarks}
          onChange={(e) => setRejectRemarks(e.target.value)}
        ></TextArea>
      </Modal>

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
          addonBefore="Machine Name"
          placeholder="Machine Name"
          readOnly
          value={MACHINEname}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Date"
          placeholder="Date"
          value={formatDate(date)}
          readOnly
          // onChange={handleDateChange}
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Shift"
          placeholder="Shift"
          readOnly
          value={shift}
          style={{ width: "100%", height: "35px" }}
        />
 
        <span
          style={{
            marginRight: "1rem",
            fontWeight: "400px",
            fontSize: "14px",
            width: "100px",
          }}
        >
          Laydown No
        </span>
        <Select
          showSearch
          mode="multiple"
          placeholder="Select Laydown No"
          value={layDownNo ? layDownNo.split(",") : []}
          onChange={(values) => SetLayDownNo(values.join(","))}
          options={laydownLov}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            width: "700px",
            marginLeft: "-1rem",
          }}
          disabled={status.fieldStatus}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "5px",
        }}
      >
        <span
          style={{
            marginLeft: "0.5rem",
            fontWeight: "400px",
            fontSize: "14px",
          }}
        >
          Order Number
        </span>
        <Select
          showSearch
          placeholder="Select Order Number"
          value={order_no}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            width: "400px",
            marginLeft: "-1rem",
          }}
          disabled
        />
      
        <span
          style={{
            marginLeft: "0.5rem",
            fontWeight: "400px",
            fontSize: "14px",
          }}
        >
          Mixing
        </span>
        <Select
          showSearch
          placeholder="Select Mixing"
          value={MIXING}
          onChange={(e) => SetMIXING(e)}
          onKeyDown={handleSelectText} // Handle key inputs
          filterOption={false}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            width: "400px",
          }}
          disabled={status.fieldStatus}
        >
          {mixingLov.map((option) => (
            <Select.Option key={option.id} value={option.Material}>
              {option.Material}
            </Select.Option>
          ))}
        </Select>
       
        <span
          style={{
            marginLeft: "0.5rem",
            fontWeight: "400px",
            fontSize: "14px",
          }}
        >
          Std. Wt in Grams
        </span>
        <Select
          showSearch
          placeholder="Select Weight"
          value={stdWtGrams}
          onKeyDown={handleSelectText1} // Handle key inputs
          filterOption={false}
          onChange={(value) => SetStdWtGrams(value)}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            width: "400px",
            marginLeft: "-1rem",
          }}
          disabled={status.fieldStatus}
        >
          {stdWtGramsLOV.map((option) => (
            <Select.Option key={option.id} value={option.value}>
              {option.value}
            </Select.Option>
          ))}
        </Select>
      </div>
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
export default DryGoods_F002;
