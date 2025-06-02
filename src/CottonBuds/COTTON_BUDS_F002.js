import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
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
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const COTTON_BUDS_F002 = () => {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const navigate = useNavigate("");

  const [date, setDate] = useState("");
  const [shift, setShift] = useState(null);

  const [totalHr, setTotalHr] = useState(0);

  const [statusLoader, setStatusLoader] = useState(false);

  const [orderNo, setOrderNo] = useState([]);
  const [mixingLov, setMixingLov] = useState([]);
  const [laydownLov, setLaydownLov] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    formNumber: "",
    formName: "",
    sopNumber: "",
    sopNumber: "",
    rejectReason: "",
    machineName: "",
    machineDate: "",
    shift: "",
    orderNumber: "",
    mixing: "",
    customerName: "",
    laydownNumber: "",
    stdWeight: "",
    gpm: "",
    draft: "",
    dofferSpeed: "",
    sliverLength: "",
    totalProduction: "",
    compactorWaste: "",
    sliverWeight: "",
    total1: "",
    total2: "",
    sliverLine: [
      {
        sliverCanNumber1: "",
        gpm1: "",
        cardingMachineNumber1: "",
        netWeight1: "",
        sliverCanNumber2: "",
        gpm2: "",
        cardingMachineNumber2: "",
        netWeight2: "",
      },
    ],
    stoppageDetails: [
      {
        problemNature: "",
        stopTime: "",
        restartTime: "",
        idleTime: "",
      },
    ],
  });
  const [deleteId, setDeleteId] = useState({
    stoppageId: [],
    sliverTabId: [],
  });
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
  const initialized = useRef(false);
  const { newdate, shiftvalue, machineName } = location.state;
  const [MACHINEname, setMACHINEname] = useState("");

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
  }, [formData.operator_sign, formData.supervisor_sign, formData.hod_sign]);

  const [hourValues, setHourValues] = useState({
    firstHr: 0,
    secondHr: 0,
    thirdHr: 0,
    fourthHr: 0,
    fifthHr: 0,
    sixHr: 0,
    sevenHr: 0,
    eightHr: 0,
  });

  useEffect(() => {
    const total = Object.values(hourValues).reduce(
      (sum, value) => sum + parseFloat(value || 0),
      0
    );
    setTotalHr(total);
  }, [hourValues]);

  useEffect(() => {
    const findPDE = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${formData.orderNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          setFormData((prevState) => ({
            ...prevState,
            mixing: data.mix,
            customerName: data.customerName || "NA",
          }));
        }
      } catch (error) {}
    };
    findPDE();
  }, [formData.orderNumber]);

  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      rejectReason: text,
    }));
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
    navigate("/Precot/COTTON_BUDS/F-002/Summary");
  };

  const handleSelectText = (e) => {
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

  const { confirm } = Modal;

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

  const handleE = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      if (
        role == "ROLE_SUPERVISOR" ||
        role == "ROLE_HOD" ||
        role == "ROLE_DESIGNEE"
      ) {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/Service/getSliverProduction?date=${newdate}&shift=${shiftvalue}&machineName=${machineName}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Log the full response to check its structure
          console.log("API Response:", response);

          if (response.data.length == 0) {
            if (role == "ROLE_SUPERVISOR") {
              message.warning("Operator yet To approve!");
              setTimeout(() => {
                navigate("/Precot/COTTON_BUDS/F-002/Summary");
              }, 1000);
              return;
            }
            if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
              message.warning("Operator or Supervisor yet to approve!");
              setTimeout(() => {
                navigate("/Precot/COTTON_BUDS/F-002/Summary");
              }, 1000);
              return;
            }
          }

          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              role == "ROLE_SUPERVISOR" &&
              data.operator_status != "OPERATOR_APPROVED"
            ) {
              message.warning("Operator yet to approve!");
              setTimeout(() => {
                navigate("/Precot/COTTON_BUDS/F-002/Summary");
              }, 1000);
              return;
            }
            if (
              (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
              (data.operator_status != "OPERATOR_APPROVED" ||
                data.supervisor_status != "SUPERVISOR_APPROVED")
            ) {
              message.warning("Operator or Supervisor yet to approve!");
              setTimeout(() => {
                navigate("/Precot/COTTON_BUDS/F-002/Summary");
              }, 1000);
              return;
            }
            console.log("Processed Data:", data);
            setFormData(response.data[0]);
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

      fetchData();
      const fetchPDEDataLOV = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/sap/Service/orderLOV`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data) {
            const data = response.data;
            console.log("ResponsedPDE", data);
            setOrderNo(response.data);
            setMixingLov(response.data);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchPDEDataLOV();
    }
  }, []);

  const [rejectModal, setRejectModal] = useState(false);

  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setRejectRemarks("");
    setFormData((formData) => ({
      ...formData,
      rejectReason: "",
    }));
  };

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_OPERATOR" &&
      responseData.operator_status == "OPERATOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_OPERATOR" &&
      responseData.operator_status == "OPERATOR_APPROVED" &&
      (responseData.supervisor_status == "SUPERVISOR_APPROVED" ||
        responseData.supervisor_status == "WAITING_FOR_APPROVAL") &&
      (responseData.hod_status == "HOD_APPROVED" ||
        responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      message.warning("Operator Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-002/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      (responseData.hod_status == "HOD_APPROVED" ||
        responseData.hod_status == "WAITING_FOR_APPROVAL")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_REJECTED"
    ) {
      message.warning("Operator Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-002/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.supervisor_status == "WAITING_FOR_APPROVAL"
    ) {
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-002/Summary");
      }, 1000);
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      (responseData.hod_status == "HOD_REJECTED" ||
        responseData.hod_status == "HOD_APPROVED")
    ) {
      message.warning("Operator Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-002/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_OPERATOR") {
      if (deleteId.sliverTabId.length > 0) {
        console.log("Sliver");
        try {
          for (let i = 0; i < deleteId.sliverTabId.length; i++) {
            handleDelete(deleteId.sliverTabId[i], "sliver");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }

      if (deleteId.stoppageId.length > 0) {
        console.log("Sliver");
        try {
          for (let i = 0; i < deleteId.stoppageId.length; i++) {
            console.log();
            handleDelete(deleteId.stoppageId[i], "stoppage");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }

      succesMsg = "Data Saved Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/buds/Service/saveSliverProduction`;
      payload = {
        id: formData.id,
        department: "COTTON BUDS",
        unit: "Unit H",
        formNumber: "PH-PRD06/F-003",
        formName: "DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS",
        sopNumber: "PH-PRD06-D-03",
        revisionNo: "01",
        rejectReason: "",
        machineName: machineName,
        machineDate: newdate,
        shift: shiftvalue,
        orderNumber: formData.orderNumber,
        mixing: formData.mixing,
        customerName: formData.customerName,
        laydownNumber: formData.laydownNumber,
        stdWeight: formData.stdWeight,
        gpm: formData.gpm,
        draft: formData.draft,
        dofferSpeed: formData.dofferSpeed,
        sliverLength: formData.sliverLength,
        totalProduction: formData.totalProduction,
        compactorWaste: formData.compactorWaste,
        sliverWeight: formData.sliverWeight,
        total1: formData.total1,
        total2: formData.total2,
        sliverLine: formData.sliverLine.map((row, index) => ({
          ...row,
          lineId: row.lineId,
          sliverCanNumber1: row.sliverCanNumber1,
          gpm1: row.gpm1,
          cardingMachineNumber1: row.cardingMachineNumber1,
          netWeight1: row.netWeight1,
          sliverCanNumber2: row.sliverCanNumber2,
          gpm2: row.gpm2,
          cardingMachineNumber2: row.cardingMachineNumber2,
          netWeight2: row.netWeight2,
        })),
        stoppageDetails: formData.stoppageDetails.map((row, index) => ({
          ...row,
          stoppageId: row.stoppageId,
          problemNature: row.problemNature,
          stopTime: row.stopTime,
          restartTime: row.restartTime,
          idleTime: row.idleTime,
        })),
      };
    } else if (
      role == "ROLE_SUPERVISOR" ||
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE"
    ) {
      apiurl = `${API.prodUrl}/Precot/api/buds/Service/approveSliverProduction`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.id,
        formatNo: "PH-PRD06/F-003",
        status: "Approve",
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_OPERATOR" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/COTTON_BUDS/F-002/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      { field: formData.orderNumber, name: "Order Number" },
      { field: formData.gpm, name: "GPM" },
      { field: formData.draft, name: "Draft" },
      { field: formData.dofferSpeed, name: "Doffer Speed" },
      { field: formData.sliverLength, name: "Sliver Length" },
    ];

    for (let i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].field) {
        message.warning(`Please enter ${requiredFields[i].name}`);
        return;
      }
    }

    for (let i = 0; i < formData.sliverLine.length; i++) {
      const row = formData.sliverLine[i];
      if (
        !row.sliverCanNumber1 ||
        !row.gpm1 ||
        !row.cardingMachineNumber1 ||
        !row.netWeight1
      ) {
        message.warning(
          `Please fill all mandatory fields in Sliver Line row ${i + 1}`
        );
        return;
      }
    }

    const requiredFields1 = [
      { field: formData.totalProduction, name: "Total Production" },
      { field: formData.compactorWaste, name: "Compactor Waste" },
      { field: formData.sliverWeight, name: "Sliver Weight" },
    ];

    for (let i = 0; i < requiredFields1.length; i++) {
      if (!requiredFields1[i].field) {
        message.warning(`Please enter ${requiredFields1[i].name}`);
        return;
      }
    }

    for (let i = 0; i < formData.stoppageDetails.length; i++) {
      const row = formData.stoppageDetails[i];
      if (
        !row.problemNature ||
        !row.stopTime ||
        !row.restartTime ||
        !row.idleTime
      ) {
        message.warning(
          `Please fill all mandatory fields in Stoppage Details row ${i + 1}`
        );
        return;
      }
    }

    let apiurl, payload, succesMsg;
    if (role == "ROLE_OPERATOR") {
      for (let index = 0; index < formData.sliverLine.length; index++) {
        const row = formData.sliverLine[index];
        if (row.noOfBmr === "") {
          message.warning(`Please Enter BMR Count in row ${index + 1}`);
          return;
        }
      }

      if (deleteId.sliverTabId.length > 0) {
        console.log("Sliver");
        try {
          for (let i = 0; i < deleteId.sliverTabId.length; i++) {
            handleDelete(deleteId.sliverTabId[i], "sliver");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }

      if (deleteId.stoppageId.length > 0) {
        console.log("Sliver");
        try {
          for (let i = 0; i < deleteId.stoppageId.length; i++) {
            console.log();
            handleDelete(deleteId.stoppageId[i], "stoppage");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Submitted Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/buds/Service/submitSliverProduction`;
      payload = {
        id: formData.id,
        department: "COTTON BUDS",
        unit: "Unit H",
        formNumber: "PH-PRD06/F-003",
        formName: "DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS",
        sopNumber: "PH-PRD06-D-03",
        revisionNo: "01",
        rejectReason: "",
        machineName: machineName,
        machineDate: newdate,
        shift: shiftvalue,
        orderNumber: formData.orderNumber,
        mixing: formData.mixing,
        customerName: formData.customerName,
        laydownNumber: formData.laydownNumber,
        stdWeight: formData.stdWeight,
        gpm: formData.gpm,
        draft: formData.draft,
        dofferSpeed: formData.dofferSpeed,
        sliverLength: formData.sliverLength,
        totalProduction: formData.totalProduction,
        compactorWaste: formData.compactorWaste,
        sliverWeight: formData.sliverWeight,
        total1: formData.total1,
        total2: formData.total2,
        sliverLine: formData.sliverLine.map((row, index) => ({
          ...row,
          lineId: row.lineId,
          sliverCanNumber1: row.sliverCanNumber1,
          gpm1: row.gpm1,
          cardingMachineNumber1: row.cardingMachineNumber1,
          netWeight1: row.netWeight1,
          sliverCanNumber2: row.sliverCanNumber2,
          gpm2: row.gpm2,
          cardingMachineNumber2: row.cardingMachineNumber2,
          netWeight2: row.netWeight2,
        })),
        stoppageDetails: formData.stoppageDetails.map((row, index) => ({
          ...row,
          stoppageId: row.stoppageId,
          problemNature: row.problemNature,
          stopTime: row.stopTime,
          restartTime: row.restartTime,
          idleTime: row.idleTime,
        })),
      };
    } else if (
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE" ||
      role == "ROLE_SUPERVISOR"
    ) {
      if (formData.rejectReason == "" || formData.rejectReason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }

      apiurl = `${API.prodUrl}/Precot/api/buds/Service/approveSliverProduction`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.id,
        formatNo: "PH-PRD06/F-003",
        status: "Reject",
        remarks: formData.rejectReason,
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_OPERATOR" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/COTTON_BUDS/F-002/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      // message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const totalNetWeight1 = formData.sliverLine.reduce((acc, row) => {
      const netWeight = row.netWeight1 ? parseFloat(row.netWeight1) : 0;
      return acc + netWeight;
    }, 0);
    const totalNetWeight2 = formData.sliverLine.reduce((acc, row) => {
      const netWeight = row.netWeight2 ? parseFloat(row.netWeight2) : 0;
      return acc + netWeight;
    }, 0);

    const xy = totalNetWeight1 + totalNetWeight2;

    handleObject(totalNetWeight1, "total1", 0);
    handleObject(totalNetWeight2, "total2", 0);
    handleObject(xy, "totalProduction", 0);
  }, [formData]);

  const handleObject = (value, key) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleFormParams = (value, name, index) => {
    setFormData((prevState) => ({
      ...prevState,
      sliverLine: prevState.sliverLine.map((item, i) =>
        i == index ? { ...item, [name]: value } : item
      ),
    }));
  };
  const handleFormParams2 = (value, name, index) => {
    setFormData((prevState) => ({
      ...prevState,
      stoppageDetails: prevState.stoppageDetails.map((item, i) =>
        i == index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleDelete = async (rowId, type) => {
    console.log(rowId, type);
    let apiUrl;
    if (type == "sliver") {
      apiUrl = `${API.prodUrl}/Precot/api/buds/Service/deleteSliverProductionLine?id=${rowId}`;
    } else if (type == "stoppage") {
      apiUrl = `${API.prodUrl}/Precot/api/buds/Service/deleteStoppageProductionLine?id=${rowId}`;
    }
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200 || response.status == 201) {
      }
    } catch (err) {
      setStatusLoader(false);
      console.log("error", err);
    }
  };
  const handleDeleteRow = async (index, rowId, type) => {
    if (type == "sliverTab") {
      if (formData.sliverLine.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId && formData.sliverLine.length !== 1) {
          setDeleteId((prevState) => ({
            ...prevState,
            sliverTabId: [...prevState.sliverTabId, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            sliverLine: prevState.sliverLine.filter((_, i) => i !== index),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            sliverLine: prevState.sliverLine.filter((_, i) => i !== index),
          }));
        }
      }
    } else if (type == "stoppageReport") {
      if (formData.stoppageDetails.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId && formData.stoppageDetails.length !== 1) {
          setDeleteId((prevState) => ({
            ...prevState,
            stoppageId: [...prevState.stoppageId, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            stoppageDetails: prevState.stoppageDetails.filter(
              (_, i) => i !== index
            ),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            stoppageDetails: prevState.stoppageDetails.filter(
              (_, i) => i !== index
            ),
          }));
        }
      }
    }
  };

  const handleAddRow = (type) => {
    if (type == "sliverTab") {
      setFormData((prevState) => ({
        ...prevState,
        sliverLine: [
          ...prevState.sliverLine,
          {
            sliverCanNumber1: "",
            gpm1: "",
            cardingMachineNumber1: "",
            netWeight1: "",
            sliverCanNumber2: "",
            gpm2: "",
            cardingMachineNumber2: "",
            netWeight2: "",
          },
        ],
      }));
    } else if (type == "stoppageReport") {
      setFormData((prevState) => ({
        ...prevState,
        stoppageDetails: [
          ...prevState.stoppageDetails,
          {
            problemNature: "",
            stopTime: "",
            restartTime: "",
            idleTime: "",
          },
        ],
      }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
                  GMP
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
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={formData.gpm}
                    min={1}
                    onChange={(e) => {
                      handleObject(e.target.value, "gpm");
                    }}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    type="text"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    // type="number"
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    value={formData.draft}
                    onChange={(e) => {
                      handleObject(e.target.value, "draft");
                    }}
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
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    value={formData.dofferSpeed}
                    min={1}
                    onChange={(e) => {
                      handleObject(e.target.value, "dofferSpeed");
                    }}
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
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    value={formData.sliverLength}
                    min={1}
                    onChange={(e) => {
                      handleObject(e.target.value, "sliverLength");
                    }}
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
      label: <p>Perfect Card Sliver Production I</p>,
      children: (
        <div style={{ height: "50vh" }}>
          <table style={{ width: "50%" }}>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>S. No.</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Sliver Can No
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>GPM</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Carding M/c No
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Net Wet (kgs)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>S.No.</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Sliver Can No
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>GPM</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Carding M/c No
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Net Wet (kgs)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>Action</td>
            </tr>
            {formData.sliverLine.map((row, index) => (
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  {index + 1}
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="text"
                    value={row.sliverCanNumber1}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(
                        e.target.value,
                        "sliverCanNumber1",
                        index
                      );
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="text"
                    value={row.gpm1}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(e.target.value, "gpm1", index);
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="text"
                    value={row.cardingMachineNumber1}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(
                        e.target.value,
                        "cardingMachineNumber1",
                        index
                      );
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="number"
                    value={row.netWeight1}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(e.target.value, "netWeight1", index);
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={handleE}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  {index + 1}
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="text"
                    value={row.sliverCanNumber2}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(
                        e.target.value,
                        "sliverCanNumber2",
                        index
                      );
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="text"
                    value={row.gpm2}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(e.target.value, "gpm2", index);
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="text"
                    value={row.cardingMachineNumber2}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(
                        e.target.value,
                        "cardingMachineNumber2",
                        index
                      );
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Input
                    type="number"
                    value={row.netWeight2}
                    min={1}
                    onChange={(e) => {
                      handleFormParams(e.target.value, "netWeight2", index);
                    }}
                    style={{ width: "105px", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                    onKeyDown={handleE}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  <Button
                    style={{
                      textAlign: "center",
                      backgroundColor: "red",
                      color: "white",
                      gap: "0px",
                    }}
                    onClick={() => {
                      handleDeleteRow(index, row.line_id, "sliverTab");
                    }}
                    disabled={status.fieldStatus || statusLoader}
                    loading={statusLoader}
                  >
                    {" "}
                    <DeleteOutlined />
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                Total in Kg
              </td>
              <td style={{ textAlign: "center" }}>{formData.total1}</td>
              <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                Total in Kg
              </td>
              <td style={{ textAlign: "center" }}>{formData.total2}</td>
            </tr>
            <Button
              onClick={() => {
                handleAddRow("sliverTab");
              }}
              disabled={status.fieldStatus || statusLoader}
              style={{ width: "100px", marginTop: "10px" }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </Button>
          </table>
        </div>
      ),
    },

    {
      key: "4",
      label: <p>Production KG</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td style={{ padding: "10px" }} colSpan={3}>
                Total Production in Kg: {formData.totalProduction}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "20px" }} rowSpan={2}>
                Waste in Kg
              </td>
              <td style={{ textAlign: "center", padding: "20px" }}>
                Compactor waste
              </td>
              <td style={{ textAlign: "center", padding: "20px" }}>
                Sliver Weight in Kgs
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "20px" }}>
                <Input
                  type="text"
                  value={formData.compactorWaste}
                  onKeyDown={(e) => {
                    handleSelectText(e);
                  }}
                  onChange={(e) => {
                    handleObject(e.target.value, "compactorWaste");
                  }}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "20px" }}>
                <Input
                  type="text"
                  value={formData.sliverWeight}
                  onKeyDown={(e) => {
                    handleSelectText(e);
                  }}
                  onChange={(e) => {
                    handleObject(e.target.value, "sliverWeight");
                  }}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
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
          <table className="f18table" style={{ width: "107%", margin: "auto" }}>
            <thead>
              <tr>
                <td
                  colSpan="1"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Nature Of Problem
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Stop. Time
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Restart Time
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Idle Time (in Min)
                </td>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {formData.stoppageDetails.map((row, rowIndex) => (
                <tr>
                  <td
                    colSpan="1"
                    style={{ textAlign: "center", padding: "4px" }}
                  >
                    <Input
                      type="text"
                      value={row.problemNature}
                      style={{ textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleFormParams2(
                          e.target.value,
                          "problemNature",
                          rowIndex
                        );
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    <Input
                      type="text"
                      value={row.stopTime}
                      style={{ textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleFormParams2(e.target.value, "stopTime", rowIndex);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    <Input
                      type="text"
                      value={row.restartTime}
                      style={{ textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleFormParams2(
                          e.target.value,
                          "restartTime",
                          rowIndex
                        );
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                  <td colSpan="1" style={{ textAlign: "center" }}>
                    <Input
                      type="text"
                      value={row.idleTime}
                      style={{ textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleFormParams2(e.target.value, "idleTime", rowIndex);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Button
                      style={{
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "white",
                        gap: "0px",
                      }}
                      onClick={() => {
                        handleDeleteRow(
                          rowIndex,
                          row.stoppageId,
                          "stoppageReport"
                        );
                      }}
                      disabled={status.fieldStatus || statusLoader}
                      loading={statusLoader}
                    >
                      {" "}
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
              <Button
                onClick={() => {
                  handleAddRow("stoppageReport");
                }}
                disabled={status.fieldStatus || statusLoader}
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "6",
      label: <p>Reviews</p>,
      children: (
        <div style={{ height: "40vh" }}>
          <table style={{ height: "60%", tableLayout: "fixed" }}>
            <tr>
              <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                Performed by Operator Sign & Date
              </td>
              <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                Checked by Supervisor Sign & Date
              </td>
              <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                Reviewed by HOD/ Designee Sign & Date
              </td>
            </tr>
            <tr>
              <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
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
                      {formData.operator_status == "OPERATOR_APPROVED" ? (
                        <>{formData.operator_sign}</>
                      ) : null}
                      <br />
                      {formatDateAndTime(formData.operator_submitted_on)}
                    </div>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    {formData.operator_status == "OPERATOR_APPROVED" ? (
                      <>
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
                      </>
                    ) : null}
                  </div>
                </div>
              </td>

              <td colspan="2" style={{ height: "60%", textAlign: "center" }}>
                {formData.supervisor_status !== "WAITING_FOR_APPROVAL" &&
                  formData.supervisor_status !== "" && (
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
                          {formData.supervisor_sign}
                          <br />
                          {formatDateAndTime(formData.supervisor_submit_on)}
                        </div>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        {eSign.supervisor_sign ? (
                          <img
                            src={eSign.supervisor_sign}
                            alt="eSign"
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
              <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
                {formData.hod_status !== "WAITING_FOR_APPROVAL" &&
                  formData.hod_status !== "" && (
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
                          {formData.hod_submit_by}
                          <br />
                          {formatDateAndTime(formData.hod_submit_on)}
                        </div>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        {eSign.hod_submit_by ? (
                          <img
                            src={eSign.hod_submit_by}
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
        formName={"DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS"}
        formatNo={"PH-PRD04/F-003"}
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
              display: status.saveStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_OPERATOR" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_OPERATOR" ? "Save" : "Approve"}
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.submitStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_OPERATOR" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_OPERATOR" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_OPERATOR" ? " Submit" : "   Reject"}
          </Button>,
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
            onClick={handleSubmit}
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
          onChange={handleRejectReason}
        ></TextArea>
      </Modal>
      <div
        style={{
          display: "flex",

          gap: "10px",
          marginTop: "5px",
        }}
      >
        <Input
          addonBefore="Machine Name"
          placeholder="Machine Name"
          readOnly
          value={machineName}
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
          addonBefore="Date"
          placeholder="Date"
          value={formatDate(newdate)}
          readOnly
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Shift"
          placeholder="Shift"
          readOnly
          value={shiftvalue}
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
          placeholder="Select Laydown No"
          value={formData.laydownNumber}
          onChange={(e) => {
            handleObject(e, "laydownNumber");
          }}
          options={laydownLov}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            width: "700px",
            marginLeft: "-1rem",
          }}
          disabled={status.fieldStatus}
        ></Select>
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
          value={formData.orderNumber}
          onChange={(e) => {
            handleObject(e, "orderNumber");
          }}
          style={{
            backgroundColor: "#E5EEF9",
            fontWeight: "bold",
            width: "400px",
           }}
          disabled={status.fieldStatus}
        >
          {orderNo.map((option) => (
            <Select.Option key={option.id} value={option.value}>
              {option.value}
            </Select.Option>
          ))}
        </Select>
        <Input
          addonBefore="Mixing"
          value={formData.mixing}
          readOnly
           style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Customer Name"
          value={formData.customerName}
          readOnly
     
          style={{ width: "100%", height: "35px" }}
        />
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

export default COTTON_BUDS_F002;
