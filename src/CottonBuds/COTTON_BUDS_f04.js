 
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
import React, { useEffect, useState } from "react";
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

const COTTON_BUDS_f04 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { orderNo } = state || {};
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState("");
  const [Id, setId] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [section, setSection] = useState("");
  const [machineNo, setMachineNo] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [machineNameLov, setMachineNameLov] = useState([]);
  const [orderProductDetails, setorderProductDetails] = useState("");
  const [maintainedBy, setmaintainedBy] = useState("");
  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yearF}-${monthF}-${day}`;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const disable =
    (role == "ROLE_SUPERVISOR" &&
      fetchedData?.supervisorStatus == "SUPERVISOR_APPROVED" &&
      fetchedData?.hodStatus !== "HOD_REJECTED" &&
      fetchedData?.qaStatus !== "QA_INSPECTOR_REJECTED") ||
    role == "ROLE_HOD" ||
    role == "ROLE_QA" ||
    role == "ROLE_DESIGNEE";
  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;
    if (
      !isAlphanumeric.test(e.key) &&
      ![
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "_",
        ".",
        ",",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const canDisplayButtons = () => {
    if (role === "ROLE_SUPERVISOR") {
      if (
        fetchedData &&
        fetchedData.supervisorStatus === "SUPERVISOR_APPROVED" &&
        fetchedData.qaStatus !== "QA_INSPECTOR_REJECTED" &&
        fetchedData.hodStatus !== "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (role == "ROLE_QA") {
      if (
        fetchedData?.qaStatus == "QA_INSPECTOR_APPROVED" &&
        fetchedData?.hodStatus == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (fetchedData?.qaStatus == "QA_INSPECTOR_APPROVED" &&
          fetchedData?.hodStatus == "WAITING_FOR_APPROVAL") ||
        fetchedData?.hodStatus == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        fetchedData?.hodStatus == "HOD_APPROVED" ||
        fetchedData?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        fetchedData?.hodStatus == "HOD_APPROVED" ||
        fetchedData?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (fetchedData?.supervisorStatus == "SUPERVISOR_APPROVED") {
        return "none";
      }
    } else if (
      role == "ROLE_QA" ||
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE"
    ) {
      return "none";
    }
  };

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY ");
      }
    }
    return "";
  };
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedData?.supervisorName;
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
  }, [fetchedData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedData?.qaName;
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
  }, [fetchedData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedData?.hodName;
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
          setGetImage3(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [fetchedData,API.prodUrl, token]);

  // tab 1
  const [productNameRp, setProductNameRp] = useState("");
  const [productNameChangeOver, setProductNameChangeOver] = useState("");
  const [LotNoRp, setLotNoRp] = useState("");
  const [LotNoChangeOver, setLotNoChangeOver] = useState("");
  const [BMRChangeOver, setBMRChangleOver] = useState("");
  const [sliverWeightRp, setSliverWeightRp] = useState("");
  const [sliverWeightChangeOver, setSliverWeightChangeOver] = useState("");
  const [packSizeRp, setPackSizeRp] = useState("");
  const [packSizeChangeOver, setPackSizeChangeOver] = useState("");
  const [PDSNoRp, setPDSNoRp] = useState("");
  const [PDSNoChangeOver, setPDSNoChangeOver] = useState("");

  // Tab 2
  const [BlisterRemove, setBlisterRemove] = useState("");
  const [ContainerRemove, setContainerRemove] = useState("");
  const [ZiplockRemove, setZiplockRemove] = useState("");
  const [OuterCartonRemove, setOuterCartonRemove] = useState("");
  const [SliverRemove, setSliverRemove] = useState("");
  const [BlisterRemark, setBlisterRemark] = useState("");
  const [ContainerRemark, setContainerRemark] = useState("");
  const [ZiplockRemark, setZiplockRemark] = useState("");
  const [OuterCartonRemark, setOuterCartonRemark] = useState("");
  const [SliverRemark, setSliverRemark] = useState("");

  // Tab 3
  const [requiredCompleted, setrequiredCompleted] = useState("");
  const [doneCompleted, setdoneCompleted] = useState("");
  const [requiredRemark, setrequiredRemark] = useState("");
  const [doneRemark, setdoneRemark] = useState("");
  const [metalDetectorCheck, setMetalDetectorCheck] = useState("");
  const [metalDetectorCheckRemark, setMetalDetectorCheckRemark] = useState("");
  const [readyToStart, setReadyToStart] = useState("");
  const [qualityVerification, setQualityVerification] = useState("");
  const [readyToStartRemark, setReadyToStartRemark] = useState("");
  const [qualityVerificationRemark, setQualityVerificationRemark] =
    useState("");

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/buds/sap/Service/orderInfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          const orderNumberLov = data.map((order) => ({
            value: order,
          }));
          setOrderNumberLov(orderNumberLov);
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
  }, []);
  useEffect(() => {
    const fetchmachineNameOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/buds/sap/Service/machineList`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setMachineNameLov(data);
        } else {
          console.error("API response is not an array", data);
          setMachineNameLov([]);
        }
      } catch (error) {
        console.error("Error fetching Machine Name options:", error);
        setMachineNameLov([]);
      }
    };

    fetchmachineNameOptions();
  }, [token]);
  useEffect(() => {
    const RunningProductionDetails = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/buds/sap/Service/productChangeDetails?orderNumber=${orderNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProductNameRp(response.data.product);
        setSliverWeightRp(response.data.sliverWeight);
        setPackSizeRp(response.data.packSize);
      } catch (error) {
      } finally {
      }
    };

    RunningProductionDetails();
  }, [orderNo]);

  const ChangeOverDetails = async (value) => {
    setBMRChangleOver(value);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/buds/sap/Service/productChangeDetails?orderNumber=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProductNameChangeOver(response.data.product);
      setSliverWeightChangeOver(response.data.sliverWeight);
      setPackSizeChangeOver(response.data.packSize);
      // setPDSNoChangeOver(response.data.gsm);
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.response.data.message);
    } finally {
    }
  };

  // Save & Submit Api
  const handleSave = async () => {
    try {
      await savefetchedData();
    } catch (error) {
      console.error("Error saving Record :", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await submitfetchedData();
    } catch (error) {
      console.error("Error submitting Record ", error);
    }
  };

  const savefetchedData = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatNo: "PH-PRD04/F-004",
        formatName: "PRODUCT CHANGE OVER - COTTON BUDS",
        revisionNumber: "01",
        sopNumber: "PH-PRD04-D-03",
        orderNo1: orderProductDetails,
        productId: Id,
        date: date,
        section: section,
        time: time,
        machineName: machineNo,
        ccpMaintainedBy: maintainedBy,
        productName1: productNameRp,
        orderNo1: orderNo,
        lotNo1: LotNoRp,
        sliverWeight1: sliverWeightRp,
        packSize1: packSizeRp,
        pdsNumber1: PDSNoRp,
        productName2: productNameChangeOver,
        orderNo2: BMRChangeOver,
        lotNo2: LotNoChangeOver,
        sliverWeight2: sliverWeightChangeOver,
        packSize2: packSizeChangeOver,
        pdsNumber2: PDSNoChangeOver,
        blister: BlisterRemove,
        container: ContainerRemove,
        zipLock: ZiplockRemove,
        outerCarton: OuterCartonRemove,
        silverWeight: SliverRemove,
        blisterRemarks: BlisterRemark,
        containerRemarks: ContainerRemark,
        zipLockRemarks: ZiplockRemark,
        outerCartonRemarks: OuterCartonRemark,
        silverWeightRemarks: SliverRemark,
        toolChangeRequired: requiredCompleted,
        toolChangeDone: doneCompleted,
        toolChangeRequiredRemarks: requiredRemark,
        toolChangeDoneRemarks: doneRemark,
        metalDetectorCheck: metalDetectorCheck,
        metalDetectorRemarks: metalDetectorCheckRemark,
        productionCheck: readyToStart,
        qualityVerification: qualityVerification,
        productionCheckRemarks: readyToStartRemark,
        qualityVerificationRemarks: qualityVerificationRemark,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/buds/Service/saveProductChangeOver`,
        payload,
        { headers }
      );
      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-04/Summary");
      }, 1500);
      message.success("Record  Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save saving Record  !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const submitfetchedData = async () => {
    setSubmitLoading(true);
    if (date == "" || date == null) {
      message.warning("Date Required for Submittion !");
      setSubmitLoading(false);
      return;
    }
    if (time == "" || time == null) {
      message.warning("Time Required for Submittion !");
      setSubmitLoading(false);
      return;
    }
    if (section == "" || section == null) {
      message.warning("Section Required for Submittion !");
      setSubmitLoading(false);
      return;
    }
    if (machineNo == "" || machineNo == null) {
      message.warning("Machine Number Required for Submittion !");
      setSubmitLoading(false);
      return;
    }
    if (maintainedBy == "" || maintainedBy == null) {
      message.warning("Maintained By Required for Submittion !");
      setSubmitLoading(false);
      return;
    }
    try {
      // Helper function to handle the 'NA' default value condition
      const getValueOrDefault = (value) =>
        value === "" || value === null || value === undefined ? "NA" : value;

      const payload = {
        formatNo: "PH-PRD04/F-004",
        formatName: "PRODUCT CHANGE OVER - COTTON BUDS",
        revisionNumber: "01",
        sopNumber: "PH-PRD04-D-03",
        orderNo1: getValueOrDefault(orderProductDetails),
        productId: Id,
        date: date,
        section: getValueOrDefault(section),
        time: getValueOrDefault(time),
        machineName: getValueOrDefault(machineNo),
        ccpMaintainedBy: getValueOrDefault(maintainedBy),
        productName1: getValueOrDefault(productNameRp),
        orderNo1: getValueOrDefault(orderNo),
        lotNo1: getValueOrDefault(LotNoRp),
        sliverWeight1: getValueOrDefault(sliverWeightRp),
        packSize1: getValueOrDefault(packSizeRp),
        pdsNumber1: getValueOrDefault(PDSNoRp),
        productName2: getValueOrDefault(productNameChangeOver),
        orderNo2: getValueOrDefault(BMRChangeOver),
        lotNo2: getValueOrDefault(LotNoChangeOver),
        sliverWeight2: getValueOrDefault(sliverWeightChangeOver),
        packSize2: getValueOrDefault(packSizeChangeOver),
        pdsNumber2: getValueOrDefault(PDSNoChangeOver),
        blister: getValueOrDefault(BlisterRemove),
        container: getValueOrDefault(ContainerRemove),
        zipLock: getValueOrDefault(ZiplockRemove),
        outerCarton: getValueOrDefault(OuterCartonRemove),
        silverWeight: getValueOrDefault(SliverRemove),
        blisterRemarks: getValueOrDefault(BlisterRemark),
        containerRemarks: getValueOrDefault(ContainerRemark),
        zipLockRemarks: getValueOrDefault(ZiplockRemark),
        outerCartonRemarks: getValueOrDefault(OuterCartonRemark),
        silverWeightRemarks: getValueOrDefault(SliverRemark),
        toolChangeRequired: getValueOrDefault(requiredCompleted),
        toolChangeDone: getValueOrDefault(doneCompleted),
        toolChangeRequiredRemarks: getValueOrDefault(requiredRemark),
        toolChangeDoneRemarks: getValueOrDefault(doneRemark),
        metalDetectorCheck: getValueOrDefault(metalDetectorCheck),
        metalDetectorRemarks: getValueOrDefault(metalDetectorCheckRemark),
        productionCheck: getValueOrDefault(readyToStart),
        qualityVerification: getValueOrDefault(qualityVerification),
        productionCheckRemarks: getValueOrDefault(readyToStartRemark),
        qualityVerificationRemarks: getValueOrDefault(
          qualityVerificationRemark
        ),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/buds/Service/submitProductChangeOver`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/COTTON_BUDS/F-04/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit Record !!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/COTTON_BUDS/F-04/Summary");
  };

  useEffect(() => {
    fetchDetailsByParams();
  }, []);
  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/buds/Service/approveProductChangeOver`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/COTTON_BUDS/F-04/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSubmitLoading(false);
      return;
    }
    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/buds/Service/approveProductChangeOver`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/COTTON_BUDS/F-04/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const fetchDetailsByParams = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/buds/Service/getProductChangeOver?orderNumber=${orderNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setFetchedData(response.data[0]);

      if (response.data && response.data.message !== "No data") {
        const data = response.data[0];
        setId(data.productId);
        setDate(data.date);
        setSection(data.section);
        setTime(data.time);
        setMachineNo(data.machineName);
        setmaintainedBy(data.ccpMaintainedBy);
        setProductNameRp(data.productName1);
        setLotNoRp(data.lotNo1);
        setSliverWeightRp(data.sliverWeight1);
        setPackSizeRp(data.packSize1);
        setPDSNoRp(data.pdsNumber1);
        setProductNameChangeOver(data.productName2);
        setBMRChangleOver(data.orderNo2);
        setLotNoChangeOver(data.lotNo2);
        setSliverWeightChangeOver(data.sliverWeight2);
        setPackSizeChangeOver(data.packSize2);
        setPDSNoChangeOver(data.pdsNumber2);
        setBlisterRemove(data.blister);
        setContainerRemove(data.container);
        setZiplockRemove(data.zipLock);
        setOuterCartonRemove(data.outerCarton);
        setSliverRemove(data.silverWeight);
        setBlisterRemark(data.blisterRemarks);
        setContainerRemark(data.containerRemarks);
        setZiplockRemark(data.zipLockRemarks);
        setOuterCartonRemark(data.outerCartonRemarks);
        setSliverRemark(data.silverWeightRemarks);
        setrequiredCompleted(data.toolChangeRequired);
        setdoneCompleted(data.toolChangeDone);
        setrequiredRemark(data.toolChangeRequiredRemarks);
        setdoneRemark(data.toolChangeDoneRemarks);
        setMetalDetectorCheck(data.metalDetectorCheck);
        setReadyToStart(data.productionCheck);
        setQualityVerification(data.qualityVerification);
        setReadyToStartRemark(data.productionCheckRemarks);
        setQualityVerificationRemark(data.qualityVerificationRemarks);
        setMetalDetectorCheckRemark(data.metalDetectorRemarks);

        if (
          ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            response.data[0].qaStatus !== "QA_INSPECTOR_APPROVED") ||
          ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            (response.data[0].qaStatus == "QA_INSPECTOR_REJECTED" ||
              response.data[0].hodStatus == "HOD_REJECTED"))
        ) {
          message.error("QA Inspector Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/COTTON_BUDS/F-04/Summary");
          }, 1500);
        }
        if (
          (role == "ROLE_QA" &&
            response.data[0].supervisorStatus !== "SUPERVISOR_APPROVED") ||
          (role == "ROLE_QA" &&
            response.data[0].qaStatus == "QA_INSPECTOR_REJECTED")
        ) {
          message.error("Supervisor Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/COTTON_BUDS/F-04/Summary");
          }, 1500);
        }
      } else {
      }
    } catch (error) {
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Product Details</p>,
      children: (
        <div>
          <table>
            <tr>
              <th colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Check Points
              </th>
              <th colSpan="30">Running Production</th>
              <th colSpan="25">Change Over To</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Product Name
              </td>
              <td colSpan="30">
                <Input className="inp-new" readOnly value={productNameRp} />
              </td>
              <td colSpan="25">
                <Input
                  className="inp-new"
                  readOnly
                  value={productNameChangeOver}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Lot No.
              </td>
              <td colSpan="30">
                <input
                  className="inp-new"
                  value={LotNoRp}
                  onChange={(e) => setLotNoRp(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={LotNoChangeOver}
                  onChange={(e) => setLotNoChangeOver(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                3
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                BMR No.
              </td>
              <td colSpan="30">
                <Input className="inp-new" readOnly value={orderNo} />
              </td>
              <td colSpan="25">
                {" "}
                <Select
                  showSearch
                  value={BMRChangeOver}
                  onChange={(value) => {
                    ChangeOverDetails(value);
                  }}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search BMR Number"
                  disabled={disable}
                >
                  <Select.Option value="" disabled selected>
                    Select BMR Number
                  </Select.Option>
                  {orderNumberLov.map((order) => (
                    <Select.Option key={order.value} value={order.value}>
                      {order.value}
                    </Select.Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                4
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Sliver Weight{" "}
              </td>
              <td colSpan="30">
                <Input className="inp-new" readOnly value={sliverWeightRp} />
              </td>
              <td colSpan="25">
                <Input
                  className="inp-new"
                  readOnly
                  value={sliverWeightChangeOver}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                5
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Pack Size (Qty. per bag)
              </td>
              <td colSpan="30">
                <Input className="inp-new" readOnly value={packSizeRp} />
              </td>
              <td colSpan="25">
                <Input
                  className="inp-new"
                  readOnly
                  value={packSizeChangeOver}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                6
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                PDS No./Rev. No.
              </td>
              <td colSpan="30">
                <input
                  className="inp-new"
                  value={PDSNoRp}
                  onChange={(e) => setPDSNoRp(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={PDSNoChangeOver}
                  onChange={(e) => setPDSNoChangeOver(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Removal of Packaging Materials of Running Product</p>,
      children: (
        <div>
          {/* colums = 100 */}
          <table>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Packaging Materials
              </th>
              <th colSpan="30">Removed (Yes / No)</th>
              <th colSpan="25">Remark</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Blister
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setBlisterRemove(e.target.value)}
                  value={BlisterRemove}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={BlisterRemark}
                  onChange={(e) => setBlisterRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Container
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setContainerRemove(e.target.value)}
                  value={ContainerRemove}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={ContainerRemark}
                  onChange={(e) => setContainerRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                3
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Zip lock / Drawstring
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setZiplockRemove(e.target.value)}
                  value={ZiplockRemove}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={ZiplockRemark}
                  onChange={(e) => setZiplockRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                4
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Outer Carton
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setOuterCartonRemove(e.target.value)}
                  value={OuterCartonRemove}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={OuterCartonRemark}
                  onChange={(e) => setOuterCartonRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                5
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Sliver if any
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setSliverRemove(e.target.value)}
                  value={SliverRemove}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={SliverRemark}
                  onChange={(e) => setSliverRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "30px", border: "none" }}>
                {" "}
                C.Tool / Dies & Machine Setting:
              </th>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan="30">Completed (Yes / No)</th>
              <th colSpan="25">Remark</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Tool Change required
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setrequiredCompleted(e.target.value)}
                  value={requiredCompleted}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={requiredRemark}
                  onChange={(e) => setrequiredRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Tool Change Done
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setdoneCompleted(e.target.value)}
                  value={doneCompleted}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={doneRemark}
                  onChange={(e) => setdoneRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>CCP Setting</p>,
      children: (
        <div>
          {/* colums = 100 */}
          <table>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan="30">Completed (Yes / No)</th>
              <th colSpan="25">Remarks</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Functioning Check of Metal Detector
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setMetalDetectorCheck(e.target.value)}
                  value={metalDetectorCheck}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={metalDetectorCheckRemark}
                  onChange={(e) => setMetalDetectorCheckRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "30px", border: "none" }}>
                {" "}
                E. Production Start:
              </th>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan="30">Completed (Yes / No)</th>
              <th colSpan="25">Remarks</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Production ready to start
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setReadyToStart(e.target.value)}
                  value={readyToStart}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={readyToStartRemark}
                  onChange={(e) => setReadyToStartRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                First Piece Inspection /Quality verification{" "}
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setQualityVerification(e.target.value)}
                  value={qualityVerification}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={qualityVerificationRemark}
                  onChange={(e) => setQualityVerificationRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 17,
                    border: "none",
                  }}
                  disabled={disable}
                />{" "}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              {/* <td colSpan="34" style={{ height: "35px", textAlign: "center" }}>Performed by Operator</td> */}
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                CCP Maintained by
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Performed by Production Supervisor
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                {" "}
                Verified by QA Inspector
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                Reviewed by HOD / Designee{" "}
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                <Input
                  placeholder="Maintained By"
                  value={maintainedBy}
                  onChange={(e) => setmaintainedBy(e.target.value)}
                  disabled={disable}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    textAlign: "center",
                  }}
                />
              </td>

              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {fetchedData?.supervisorStatus === "SUPERVISOR_APPROVED" && (
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
                        <div>{fetchedData?.supervisorName}</div>
                        <div>
                          {formattedDateWithTime(
                            fetchedData?.supervisorSubmittedDate
                          )}
                        </div>
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

              <td
                colSpan="50"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(fetchedData?.qaStatus === "QA_INSPECTOR_APPROVED" ||
                  fetchedData?.qaStatus === "QA_INSPECTOR_REJECTED") && (
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
                        <div>{fetchedData?.qaName}</div>
                        <div>
                          {formattedDateWithTime(fetchedData?.qaApprovedDate)}
                        </div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="QA Inspector Sign"
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
              <td
                colSpan="50"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(fetchedData?.hodStatus === "HOD_REJECTED" ||
                  fetchedData?.hodStatus === "HOD_APPROVED") && (
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
                        <div>{fetchedData?.hodName}</div>
                        <div>{formattedDateWithTime(fetchedData?.hodDate)}</div>
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
        formName="PRODUCT CHANGE OVER - COTTON BUDS"
        formatNo="PH-PRD04/F-004"
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
          marginLeft: "10px",
        }}
      >
        <label style={{ marginRight: "8px", width: "5%", textAlign: "center" }}>
          Date :
        </label>
        <Input
          onChange={(e) => setDate(e.target.value)}
          type="date"
          value={date}
          size="small"
          style={{ width: "15%", height: "35px" }}
          disabled={disable}
          max={formattedToday}
        />
        <label style={{ marginRight: "8px", width: "5%", textAlign: "center" }}>
          Time :
        </label>
        <Input
          onChange={(e) => setTime(e.target.value)}
          type="time"
          value={time}
          size="small"
          style={{ width: "15%", height: "35px" }}
          disabled={disable}
        />
        <label style={{ marginRight: "8px", width: "5%", textAlign: "center" }}>
          Section :
        </label>
        <Input
          onChange={(e) => setSection(e.target.value)}
          type="text"
          value={section}
          size="small"
          style={{ width: "15%", height: "35px" }}
          disabled={disable}
          onKeyDown={handleKeyDown2}
        />
        <label style={{ marginRight: "8px", width: "8%", textAlign: "center" }}>
          Machine No :
        </label>
        <Select
          showSearch
          value={machineNo}
          onChange={(value) => {
            setMachineNo(value);
          }}
          style={{ width: "15%", height: "35px" }}
          placeholder="Search Machine No"
          disabled={disable}
        >
          <Select.Option value="" disabled selected>
            Select Machine No
          </Select.Option>
          {machineNameLov.map((order) => (
            <Select.Option key={order.value} value={order.value}>
              {order.value}
            </Select.Option>
          ))}
        </Select>
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

export default COTTON_BUDS_f04;
