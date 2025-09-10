/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  DeleteOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  List,
  message,
  Modal,
  Row,
  Tabs,
  Upload,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useState } from "react";
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

const PPC_002 = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  // const[loading,setLoading]=useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [operator, setOperator] = useState("");
  const [assistant, setAssistant] = useState("");
  const [assistantDate, setAssistantDate] = useState("");
  const [assistantStatus, setAssistantStatus] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [reportId, setReportId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const { state } = useLocation();
  const [operatorDate, setOperatorDate] = useState("");
  const [id, setId] = useState("");
  const [reportDetails, setReportDetails] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [bleaching, setBleaching] = useState("");
  const [spunlace, setSpunlace] = useState("");
  const [padPunching, setPadPunching] = useState("");
  const [ballMaking, setBallMaking] = useState("");
  const [pleatMaking, setPleatMaking] = useState("");
  const [budsMaking, setBudsMaking] = useState("");
  const [woolRoll, setWoolRoll] = useState("");
  const [externalFleece, setExternalFleece] = useState("");
  const [bleachingDays, setBleachingDays] = useState("");
  const [spunlaceDays, setSpunlaceDays] = useState("");
  const [padPunchingDays, setPadPunchingDays] = useState("");
  const [ballMakingDays, setBallMakingDays] = useState("");
  const [pleatMakingDays, setPleatMakingDays] = useState("");
  const [budsMakingDays, setBudsMakingDays] = useState("");
  const [woolRollDays, setWoolRollDays] = useState("");
  const [externalFleeceDays, setExternalFleeceDays] = useState("");
  const [note, setNote] = useState("");
  const [prodId, setProdId] = useState("");
  const [challenge, setChallenge] = useState("");
  const roleauth = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [excelData, setExcelData] = useState([]);
  const [editResponse, seteditResponse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [rows, setRows] = useState([
    { description: "", production: "", days: "", avgProd: "" },
  ]);
  const [addrows, setAddrows] = useState(false);
  const addRow = () => {
    setAddrows(true);
    setRows([
      ...rows,
      { description: "", production: "", days: "", avgProd: "" },
    ]);
  };

  // Common handler for number input
  const handleNumberInput = (e, setStateFunction) => {
    let inputValue = e.target.value;
    //  inputValue = inputValue.replace(/[^0-9.]/g, "");
    setStateFunction(inputValue);
  };

  const formatDateUser = (dateStr) => {
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

  const date1 = formatDateUser(state.date);
  const formattedDateASSISANT = formatDate(assistantDate);
  const formattedDateHod = formatDate(hodDate);
  useEffect(() => {
    fetchExcelData();
  }, []);
  const fetchExcelData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Ppc/monthlyPlanGetbyMonthYear?monthYear=${state.monthyear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setExcelData(response.data);
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setExcelData(response.data);
      } else {
        setExcelData([]);
      }
    } catch (error) {
      // message.error("Failed to load Excel files.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Ppc/monthlyPlanDownloadexcel?monthYear=${state.monthyear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Important for handling binary files
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      let filename = `download_${state.date}.zip`;

      if (contentDisposition && contentDisposition.includes("filename=")) {
        filename = contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/['"]/g, "");
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
      message.error("Failed to download file");
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("monthYear ", state.monthyear);

    try {
      await axios.post(
        `${API.prodUrl}/Precot/api/Ppc/monthlyPlanUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("File uploaded successfully.");
      fetchExcelData();
    } catch (error) {
      message.error("File upload failed.");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this file?",
      onOk: async () => {
        try {
          await axios.delete(
            `${API.prodUrl}/Precot/api/Ppc/deleteMonthlyPlanById?id=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          message.success("File deleted successfully.");
          // fetchExcelData();
          setExcelData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
          message.error("Failed to delete file.");
        }
      },
    });
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Ppc/lastnote`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setNote(response.data || "");
          // console.log("response.data.note",response.data);
        }
      } catch (error) {
        console.error("Error fetching the note:", error);
      }
    };

    fetchNote();
  }, []);
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Ppc/lastchallenges`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setChallenge(response.data || "");
          // console.log("response.data.note",response.data);
        }
      } catch (error) {
        console.error("Error fetching the note:", error);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("monthyr", state.monthyear);
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Ppc/getMonthlyPlanSummaryByMonthYear?monthYear=${state.monthyear}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data && data[0]) {
        seteditResponse(data[0]);
        const prodData = data[0].productionData[0];
        console.log("editResponse", editResponse);

        // Setting production data
        setProdId(prodData.id);
        setBleaching(prodData.bleachingKg);
        setSpunlace(prodData.spunlaceKg);
        setPadPunching(prodData.padPunchingBags);
        setBallMaking(prodData.ballMakingBags);
        setPleatMaking(prodData.pleatMakingBags);
        setBudsMaking(prodData.budsMakingBags);
        setWoolRoll(prodData.woolRollBags);
        setExternalFleece(prodData.externalFleece);

        // Setting workdays data
        setBleachingDays(prodData.workDaysBleaching);
        setSpunlaceDays(prodData.workDaysSpunlace);
        setPadPunchingDays(prodData.workDaysPadPunching);
        setBallMakingDays(prodData.workDaysBallMaking);
        setPleatMakingDays(prodData.workDaysPleatMaking);
        setBudsMakingDays(prodData.workDaysBudsMaking);
        setWoolRollDays(prodData.workDaysWoolRoll);
        setExternalFleeceDays(prodData.workDaysExternalFleece);

        const apiDate = data[0].date;
        setDate(dayjs(apiDate, "DD-MM-YYYY"));
        setNote(data[0].note);
        setId(data[0].id);
        setChallenge(data[0].challenges);
        setAssistant(data[0].assistant_submit_by);
        setAssistantDate(data[0].assistant_submit_on);
        setAssistantStatus(data[0].assistant_status);
        setHod(data[0].ppc_Incharge_sign);
        setHodDate(data[0].ppc_Incharge_submit_on);
        setHodStatus(data[0].ppc_Incharge_status);
        console.log("date", data[0].date);
        console.log("supervisoesdufheiljwkqmnfjknk", data);

        // Fetch the assistant's signature image
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].assistant_sign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
            setGetImage(url);
          })
          .catch((err) => {
            console.error("Error in fetching assistant image:", err);
          });

        // Fetch the HOD's signature image
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data[0].ppc_Incharge_sign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
          .catch((err) => {
            console.error("Error in fetching HOD image:", err);
          });
      }

      if (roleauth === "PPC_INCHARGE") {
        if (
          data[0]?.assistant_status !== "ASSISANT_APPROVED" ||
          data[0]?.ppc_Incharge_status == "INCHARGE_REJECTED"
        ) {
          message.warning("Assistant Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/PPC/F-002/Summary");
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = assistant;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  // Example: Bleaching days handler
  const handleBleachingDaysChange = (e) => {
    handleNumberInput(e, setBleachingDays);
  };

  // Similarly for others
  const handleSpunlaceDaysChange = (e) => {
    handleNumberInput(e, setSpunlaceDays);
  };

  const handlePadPunchingDaysChange = (e) => {
    handleNumberInput(e, setPadPunchingDays);
  };

  const handleBallMakingDaysChange = (e) => {
    handleNumberInput(e, setBallMakingDays);
  };

  const handlePleatMakingDaysChange = (e) => {
    handleNumberInput(e, setPleatMakingDays);
  };

  const handleBudsMakingDaysChange = (e) => {
    handleNumberInput(e, setBudsMakingDays);
  };

  const handleWoolRollDaysChange = (e) => {
    handleNumberInput(e, setWoolRollDays);
  };

  const handleExternalFleeceDaysChange = (e) => {
    handleNumberInput(e, setExternalFleeceDays);
  };

  // const handleBleaching = () => {
  //   const num = Number(bleaching);
  //   if (!/^\d*\.?\d*$/.test(bleaching)) {
  //     message.error("Please enter a valid value");
  //     setBleaching("");
  //   } else {
  //     setBleaching(num.toFixed(1));
  //   }
  // };
  // const handleBleaching = () => {
  //   if (!bleaching) {
  //     // If the input is empty, don't change the value
  //     setBleaching("");
  //   } else {
  //     const num = Number(bleaching);
  //     if (isNaN(num)) {
  //       message.error("Please enter a valid value");
  //       setBleaching("");
  //     } else {
  //       setBleaching(num.toFixed(1));
  //     }
  //   }
  // };

  const handleChangeBleaching = (e) => {
    let inputValue = e.target.value;
    setBleaching(inputValue);
  };

  const handleChangeSpunlace = (e) => {
    let inputValue = e.target.value;
    setSpunlace(inputValue);
  };

  const handleChangePadPunching = (e) => {
    let inputValue = e.target.value;
    setPadPunching(inputValue);
  };

  const handleChangeBallMaking = (e) => {
    let inputValue = e.target.value;
    setBallMaking(inputValue);
  };

  const handleChangePleatMaking = (e) => {
    let inputValue = e.target.value;
    setPleatMaking(inputValue);
  };

  const handleChangeBudsMaking = (e) => {
    let inputValue = e.target.value;
    setBudsMaking(inputValue);
  };

  const handleChangeWoolRoll = (e) => {
    let inputValue = e.target.value;
    setWoolRoll(inputValue);
  };

  const handleChangeExternalFleece = (e) => {
    let inputValue = e.target.value;
    setExternalFleece(inputValue);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const canDisplay = () => (rows.length >= 1 ? "flex" : "none");

  const handleBack = () => {
    navigate("/Precot/PPC/F-002/Summary");
  };
  // const monthyr = `${state.year}-${state.month.toString().padStart(2, "0")}`;
  // console.log("monthyr:", state.monthyear);

  const canDisplayButtons = () => {
    if (roleauth == "PPC_ASSISTANT") {
      if (
        editResponse?.assistant_status == "ASSISANT_APPROVED" &&
        editResponse?.ppc_Incharge_status == "INCHARGE_REJECTED"
      ) {
        return "block";
      } else if (
        (editResponse?.assistant_status == "ASSISANT_APPROVED" &&
          editResponse?.ppc_Incharge_status == "WAITING_FOR_APPROVAL") ||
        editResponse?.ppc_Incharge_status == "INCHARGE_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "PPC_INCHARGE") {
      if (
        editResponse?.ppc_Incharge_status == "INCHARGE_APPROVED" ||
        editResponse?.ppc_Incharge_status == "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.ppc_Incharge_status == "INCHARGE_APPROVED" ||
        editResponse?.ppc_Incharge_status == "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "PPC_ASSISTANT") {
      if (
        editResponse?.assistant_status == "ASSISANT_APPROVED" &&
        editResponse?.ppc_Incharge_status == "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        editResponse?.assistant_status == "ASSISANT_APPROVED" &&
        (editResponse?.ppc_Incharge_status == "WAITING_FOR_APPROVAL" ||
          editResponse?.ppc_Incharge_status == "INCHARGE_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "PPC_INCHARGE") {
      if (
        editResponse?.ppc_Incharge_status == "INCHARGE_APPROVED" ||
        editResponse?.ppc_Incharge_status == "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        editResponse?.ppc_Incharge_status == "INCHARGE_APPROVED" ||
        editResponse?.ppc_Incharge_status == "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const handleSave = () => {
    setSaveLoading(true);
    const monthYear = `${state.year}-${state.month}`;
    console.log("monthyr", monthYear);
    const payload = {
      id: id || null,
      formatName: "Monthly plan Summary Details",
      formatNo: "PH-PPC01/F-002",
      revisionNo: "01",
      refSopNo: "PH-PPC01-D-01",
      unit: "Unit H",
      monthyear: state.monthyear,
      date: formatDateUser(date),
      productionData: [
        {
          id: prodId || null,
          bleachingKg: bleaching,
          spunlaceKg: spunlace,
          padPunchingBags: padPunching,
          ballMakingBags: ballMaking,
          pleatMakingBags: pleatMaking,
          budsMakingBags: budsMaking,
          woolRollBags: woolRoll,
          externalFleece: externalFleece,
          totalProdBleaching: bleach,
          totalProdSpunlace: spun,
          totalProdPadPunching: padpunch,
          totalProdBallMaking: ballmake,
          totalProdPleatMaking: pleatmake,
          totalProdBudsMaking: buds,
          totalProdWoolRoll: wool,
          totalProdExternalFleece: externalFlee,
          workDaysBleaching: bleachingDays,
          workDaysSpunlace: spunlaceDays,
          workDaysPadPunching: padPunchingDays,
          workDaysBallMaking: ballMakingDays,
          workDaysPleatMaking: pleatMakingDays,
          workDaysBudsMaking: budsMakingDays,
          workDaysWoolRoll: woolRollDays,
          workDaysExternalFleece: externalFleeceDays,
        },
        // ...rows.map(row => ({
        //   description: row.description,
        //   production: row.production,
        //   days: row.days,
        //   avgProd: row.avgProd,
        // })),
      ],
      note: note || "NA",
      challenges: challenge || "NA",
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/Ppc/Monthlyplan/save`, payload, {
        headers,
      })
      .then((res) => {
        console.log("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/PPC/F-002/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  console.log("id===", id);

  const handleSubmit = async () => {
    if (!date) {
      message.error("Please fill the date.");
      return;
    }

    if (
      !bleaching ||
      !spunlace ||
      !padPunching ||
      !ballMaking ||
      !pleatMaking ||
      !budsMaking ||
      !woolRoll ||
      !externalFleece
    ) {
      message.error("Please fill all the required production fields.");
      return;
    }

    if (
      !bleachingDays ||
      !spunlaceDays ||
      !padPunchingDays ||
      !ballMakingDays ||
      !pleatMakingDays ||
      !budsMakingDays ||
      !woolRollDays ||
      !externalFleeceDays
    ) {
      message.error("Please fill all the working days fields.");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      id: id,
      formatName: "Monthly plan Summary Details",
      formatNo: "PH-PPC01/F-002",
      revisionNo: "01",
      refSopNo: "PH-PPC01-D-01",
      unit: "Unit H",
      monthyear: state.monthyear,
      date: formatDateUser(date),
      productionData: [
        {
          id: prodId || null,
          bleachingKg: bleaching,
          spunlaceKg: spunlace,
          padPunchingBags: padPunching,
          ballMakingBags: ballMaking,
          pleatMakingBags: pleatMaking,
          budsMakingBags: budsMaking,
          woolRollBags: woolRoll,
          externalFleece: externalFleece,
          totalProdBleaching: bleach,
          totalProdSpunlace: spun,
          totalProdPadPunching: padpunch,
          totalProdBallMaking: ballmake,
          totalProdPleatMaking: pleatmake,
          totalProdBudsMaking: buds,
          totalProdWoolRoll: wool,
          totalProdExternalFleece: externalFlee,
          workDaysBleaching: bleachingDays,
          workDaysSpunlace: spunlaceDays,
          workDaysPadPunching: padPunchingDays,
          workDaysBallMaking: ballMakingDays,
          workDaysPleatMaking: pleatMakingDays,
          workDaysBudsMaking: budsMakingDays,
          workDaysWoolRoll: woolRollDays,
          workDaysExternalFleece: externalFleeceDays,
        },
      ],
      note: note || "NA",
      challenges: challenge || "NA",
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(` ${API.prodUrl}/Precot/api/Ppc/Monthlyplan/submit`, payload, {
        headers,
      })
      .then((res) => {
        // console.log("Response", res.data);
        setSubmitLoading(false);
        message.success("Sucessfully Submitted");
        navigate("/Precot/PPC/F-002/Summary");
      })
      .catch((err) => {
        // console.log("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      });
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .post(
        `${API.prodUrl}/Precot/api/Ppc/approveOrRejectMonthlyPlan`,
        {
          id: id,
          status: "Approve",
          remarks: "",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/PPC/F-002/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .post(
        `${API.prodUrl}/Precot/api/Ppc/approveOrRejectMonthlyPlan`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/PPC/F-002/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const [getImage, setGetImage] = useState("");

  const [getImage1, setGetImage1] = useState("");

  // const handleDateChange = (value) => {
  //   const formattedDate = dayjs(value).format("YYYY-MM-DD");
  //   setDate(formattedDate);
  // };
  const [formattedDate, setFormattedDate] = useState(""); // Store the formatted date as a string
  dayjs.extend(isBetween);

  const handleDateChange = (value) => {
    const selectedDate = dayjs(value);

    if (selectedDate.isValid()) {
      // Extract year and month from state.monthyear
      const [selectedYear, selectedMonth] = state.monthyear
        .split("-")
        .map(Number);

      if (isNaN(selectedYear) || isNaN(selectedMonth)) {
        message.error("Invalid month-year format.");
        return;
      }

      // Calculate the start and end dates of the specified month and year
      const startDate = dayjs()
        .year(selectedYear)
        .month(selectedMonth - 1)
        .startOf("month"); // month is 0-based
      const endDate = dayjs()
        .year(selectedYear)
        .month(selectedMonth - 1)
        .endOf("month");

      if (selectedDate.isBetween(startDate, endDate, null, "[]")) {
        setDate(value); // Set the dayjs object for the DatePicker
        setFormattedDate(selectedDate.format("YYYY-MM-DD")); // Set the formatted string for display in Input
      } else {
        message.warning(
          `Please select a date within ${startDate.format("MM/YYYY")}`
        );
        setDate(null);
        setFormattedDate("");
      }
    } else {
      setDate(null);
      setFormattedDate("");
    }
  };

  const canEdit = () => {
    if (roleauth === "PPC_ASSISTANT") {
      return (
        editResponse?.assistant_status !== "ASSISANT_APPROVED" ||
        editResponse?.ppc_Incharge_status === "INCHARGE_REJECTED"
      );
    }
    if (roleauth === "PPC_INCHARGE") {
      return (
        editResponse?.assistant_status !== "ASSISANT_APPROVED" &&
        (editResponse?.ppc_Incharge_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.ppc_Incharge_status === "INCHARGE_APPROVED" ||
          editResponse?.ppc_Incharge_status === "INCHARGE_REJECTED")
      );
    }

    return false; // Default: no one else can edit
  };

  // Determine if inputs are editable
  const isEditable = canEdit();

  const calculateAverage = (total, days) => {
    if (!days || days === 0) return "";
    const average = total / days;
    return isNaN(average) ? "NA" : average.toFixed(1);
  };

  const bleach = calculateAverage(bleaching, bleachingDays);
  const spun = calculateAverage(spunlace, spunlaceDays);
  const padpunch = calculateAverage(padPunching, padPunchingDays);
  const ballmake = calculateAverage(ballMaking, ballMakingDays);
  const pleatmake = calculateAverage(pleatMaking, pleatMakingDays);
  const buds = calculateAverage(budsMaking, budsMakingDays);
  const wool = calculateAverage(woolRoll, woolRollDays);
  const externalFlee = calculateAverage(externalFleece, externalFleeceDays);

  const items = [
    {
      key: "1",
      label: <p>Summary Details </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "50%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Description
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Total Required Production
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                No of working days
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Required avg. prod./day
              </th>
            </tr>

            {/* Bleaching */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                Bleaching in Kg
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bleaching}
                  onChange={handleChangeBleaching}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={bleachingDays}
                  onChange={handleBleachingDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input className="inp-new" value={bleach} disabled />
              </th>
            </tr>
            {/* Spunlace */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                Spunlace in Kg
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={spunlace}
                  onChange={handleChangeSpunlace}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={spunlaceDays}
                  onChange={handleSpunlaceDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <td colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input className="inp-new" value={spun} disabled />
              </td>
            </tr>
            {/* Pad Punching */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                Pad Punching in Bags
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={padPunching}
                  onChange={handleChangePadPunching}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={padPunchingDays}
                  onChange={handlePadPunchingDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input className="inp-new" value={padpunch} disabled />
              </th>
            </tr>
            {/* Ball Making */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                Ball Making in Bags
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={ballMaking}
                  onChange={handleChangeBallMaking}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={ballMakingDays}
                  onChange={handleBallMakingDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input className="inp-new" value={ballmake} disabled />
              </th>
            </tr>

            {/* Pleat Making */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                Pleat Making in Bags
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={pleatMaking}
                  onChange={handleChangePleatMaking}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={pleatMakingDays}
                  onChange={handlePleatMakingDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input className="inp-new" value={pleatmake} disabled />
              </th>
            </tr>

            {/* Buds Making */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                Buds Making in Bags
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={budsMaking}
                  onChange={handleChangeBudsMaking}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={budsMakingDays}
                  onChange={handleBudsMakingDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input className="inp-new" value={buds} disabled />
              </th>
            </tr>

            {/* Wool Roll */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                Wool Roll in Bags
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={woolRoll}
                  onChange={handleChangeWoolRoll}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={woolRollDays}
                  onChange={handleWoolRollDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input className="inp-new" value={wool} disabled />
              </th>
            </tr>

            {/* External Fleece */}
            <tr>
              <th colSpan="60" style={{ height: "35px", textAlign: "left" }}>
                External Fleece in Kg
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={externalFleece}
                  onChange={handleChangeExternalFleece}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={externalFleeceDays}
                  onChange={handleExternalFleeceDaysChange}
                  disabled={!isEditable}
                />
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                {" "}
                <input className="inp-new" value={externalFlee} disabled />
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: "Remarks",
      children: (
        <table
          align="left"
          style={{ height: "50px", width: "50%", alignItems: "left" }}
        >
          <p>Note:</p>
          <Input.TextArea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ minHeight: "130px" }}
            disabled={!isEditable}
          />
          <p>Challenges: </p>
          <Input.TextArea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            style={{ minHeight: "130px" }}
            disabled={!isEditable}
          />
        </table>
      ),
    },
    {
      key: "3",
      label: <p> Attachment </p>,
      children: (
        <div>
          <div style={{ padding: "20px", alignContent: "center" }}>
            <List
              loading={loading}
              dataSource={excelData}
              renderItem={(item) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <span style={{ flex: 1 }}>{item.value}</span>

                    <Button
                      type="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(item.id)}
                    ></Button>
                    {/* } */}
                  </div>
                </List.Item>
              )}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Upload
              beforeUpload={(file) => {
                handleUpload(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
                disabled={!isEditable}
              >
                Upload Excel File
              </Button>
            </Upload>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={handleDownload}
            >
              Download Excel File
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Reviews",
      children: (
        <>
          <table
            align="left"
            style={{ width: "50%", borderCollapse: "collapse" }}
          >
            <tr>
              <td
                style={{
                  width: "50%",
                  padding: "2em",
                  borderRight: "1px solid",
                }}
              >
                <p>Prepared By</p>
                <b>Sign & Date</b>
              </td>
              <td
                style={{
                  width: "50%",
                  padding: "2em",
                }}
              >
                {" "}
                {(editResponse?.assistant_status === "ASSISANT_APPROVED" ||
                  editResponse?.assistant_status === "ASSISANT_REJECTED" ||
                  editResponse?.ppc_Incharge_status === "INCHARGE_APPROVED" ||
                  editResponse?.ppc_Incharge_status === "INCHARGE_REJECTED") &&
                  getImage && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                        width: "100px",
                      }}
                    />
                  )}
                <p style={{ textAlign: "center" }}></p>
                {(editResponse?.assistant_status === "ASSISANT_REJECTED" ||
                  editResponse?.assistant_status === "ASSISANT_APPROVED") && (
                  <textarea
                    className="inp-new"
                    value={
                      assistant ? `${assistant}\n ${formattedDateASSISANT}` : ""
                    }
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "50%",
                  padding: "2em",
                }}
              >
                <p>Approved By</p>
                <b>Sign & Date</b>
              </td>
              <td
                style={{
                  width: "50%",
                }}
              >
                {" "}
                {(editResponse?.ppc_Incharge_status === "INCHARGE_APPROVED" ||
                  editResponse?.ppc_Incharge_status === "INCHARGE_REJECTED") &&
                  getImage1 && (
                    <img
                      className="signature"
                      src={getImage1}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                        width: "100px",
                      }}
                    />
                  )}
                {(editResponse?.ppc_Incharge_status === "INCHARGE_APPROVED" ||
                  editResponse?.ppc_Incharge_status ===
                    "INCHARGE_REJECTED") && (
                  <textarea
                    className="inp-new"
                    value={hod ? `${hod}\n ${formattedDateHod}` : ""}
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                )}
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="Monthly plan Summary Details"
        formatNo="PH-PPC01/F-002"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "PPC_INCHARGE" ? (
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
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
            disabled={!rejectRemarks}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "50px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Year-Month:"
          placeholder="Month"
          required
          value={state.monthyear}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <DatePicker
          value={date}
          onChange={(e) => setDate(e)}
          format="DD-MM-YYYY"
          placeholder="Choose Date"
          style={{ width: "20%", height: "35px" }}
          disabled={!isEditable}
        />
      </div>

      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          dataSource={reportDetails}
          pagination={{ pageSize: 5 }}
          bordered
          //onChange={onChange}
          style={{
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
      </Row>
    </div>
  );
};

export default PPC_002;
