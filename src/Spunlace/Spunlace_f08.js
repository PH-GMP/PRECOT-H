/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  message,
  Select,
  Tooltip,
  Tabs,
  Input,
  Space,
  Row,
  Col,
} from "antd";
import { IoSave, IoPrint } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader.js";
import BleachingTail from "../Components/BleachingTail.js";
import { GoArrowLeft } from "react-icons/go";
import "../index.css";
import { Pagination } from "antd";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

import API from "../baseUrl.json";
import { IoCreate } from "react-icons/io5";
import { Table, Modal, DatePicker, Form, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import { buildQueries } from "@testing-library/react";

const { Option } = Select;
const { TabPane } = Tabs;

const Spunlace_f08 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = location.state;
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  const [formStatus, setFormStatus] = useState(false);
  const [isModalShift, setIsModalShift] = useState(false);
  const [open, setOpen] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [formData, setFormData] = useState({
    unit: "",
    formatNo: "",
    formatName: "",
    sopNumber: "",
    revisionNo: "",
    date: "",
    product_sum: "",
    shiftId: "",
    lc_sum: "",
    strip_clean_sum: "",
    gr_clean_sum: "",
    mis_sum: "",
    others_sum: "",
    downtime_total_sum: "",
    er_sum: "",
    mr_sum: "",
    breakdown_total_sum: "",
    reason: "",
    stoppageDetails: [],
  });
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const initialized = useRef(false);
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const [totalSum, setTotalSum] = useState({
    lc_sum: 0,
    strip_clean_sum: 0,
    gr_clean_sum: 0,
    mis_sum: 0,
    others_sum: 0,
    downtime_total_sum: 0,
    er_sum: 0,
    mr_sum: 0,
    breakdown_total_sum: 0,
  });
  const [eSign, setESign] = useState({
    supervisor_sign: "",
    hod_sign: "",
  });
  const [rowData, setRowData] = useState({
    CL: [],
    SCL: [],
    CL: [],
    MI: [],
    Others: [],
    ER: [],
    MR: [],
  });
  // console.log("Role", role);
  // const createStoppageDetails = (num, response) => {
  //   const details = [];
  //   response.data.forEach((responseData) => {
  //     // console.log("create stoppage details for each", responseData)
  //     const data = responseData.response;
  //     const maxLength = mapLengthForEach(data);
  //     // console.log("response data length", maxLength);
  //     for (let i = 0; i < maxLength; i++) {
  //       details.push({
  //         shiftId: responseData.shiftId,
  //         product_name: responseData.brand,
  //         order_number: responseData.order,
  //         product_in_kg: responseData.weight,
  //         lc: data.LC?.[i]?.totalHours || "N/A",
  //         strip_clean: data.SCL?.[i]?.totalHours || "N/A",
  //         gr_clean: data.CL?.[i]?.totalHours || "N/A",
  //         mis: data.MI?.[i]?.totalHours || "N/A",
  //         others: data.Others?.[i]?.totalHours || "N/A",
  //         downtime_total:
  //           (data.LC?.[i]?.totalHours || 0) +
  //           (data.SCL?.[i]?.totalHours || 0) +
  //           (data.CL?.[i]?.totalHours || 0) +
  //           (data.MI?.[i]?.totalHours || 0) +
  //           (data.Others?.[i]?.totalHours || 0),
  //         er: data.ER?.[i]?.totalHours || "N/A",
  //         mr: data.MR?.[i]?.totalHours || "N/A",
  //         breakdown_total:
  //           (data.ER?.[i]?.totalHours || 0) + (data.MR?.[i]?.totalHours || 0),
  //       });
  //     }
  //   });

  //   // console.log("Details", details);
  //   return details;
  // };

  // const mapLengthForEach = (data) => {
  //   const maxLength = Math.max(
  //     data.Others?.length || 0,
  //     data.MR?.length || 0,
  //     data.LC?.length || 0,
  //     data.CL?.length || 0,
  //     data.MI?.length || 0,
  //     data.SCL?.length || 0,
  //     data.ER?.length || 0
  //   );
  //   return maxLength;
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            // console.log("Error in fetching image:", err);
          });
      }
    });
  }, [token, formData.supervisor_sign, formData.hod_sign]);

  const mapApiResponseToState = (response) => {
    // console.log("mapApiResponseToState", response.data)
    const dataArray = response.data;
    let maxLength = 0;
    let sumOfMaxLengths = 0;
    // console.log("Comming Response", response.data)
    dataArray.forEach((data) => {
      const lengths = [
        data.response.Others?.length || 0,
        data.response.MR?.length || 0,
        data.response.LC?.length || 0,
        data.response.CL?.length || 0,
        data.response.MI?.length || 0,
        data.response.SCL?.length || 0,
        data.response.ER?.length || 0,
      ];
      const currentMaxLength = Math.max(...lengths);
      if (currentMaxLength > maxLength) {
        maxLength = currentMaxLength;
      }
      sumOfMaxLengths += currentMaxLength;
    });
    return { maxLength, sumOfMaxLengths };
  };
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/spulance/getdetailsbyParamF008?date=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log("Response Data", response.data);
          // console.log("Response data length", response.data.length)
          if (
            (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            response.data.length == 0
          ) {
            message.warning("Supervisor yet to approve!");
            setTimeout(() => {
              navigate("/Precot/Spunlace/F-08/Summary");
            }, 1000);
            return;
          }

          if (response.data.length > 0) {
            // console.log("If entered");
            const data = response.data[0];
            // console.log("Responses Datas", data)
            statusFunction(data);
            if (
              (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
              data.supervisor_status != "SUPERVISOR_APPROVED"
            ) {
              message.warning("Supervisor yet to approve!");
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-08/Summary");
              }, 1000);
              return;
            }

            // console.log("Getted Data", data);
            setFormData(data);

            // console.log("If Entered");
          }
          fetchJob();
        } catch (error) {
          console.error("Error fetching Job Order Options:", error);
        }
      };
      fetchData();
    }
  }, [date, token, API.prodUrl, navigate]);

  const statusFunction = (responseData) => {
    // console.log("ResponseData", responseData);
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      (responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "HOD_APPROVED")
    ) {
      // console.log("Condition 2")
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_APPROVED"
    ) {
      // console.log("Condition 4")
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
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/Spunlace/F-08/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };
  const shiftConvert = (value) =>
    value === "1" ? "I" : value === "2" ? "II" : value === "3" ? "III" : "";

  const fetchJob = async () => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/splResponse1?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        console.log("api called....");
        // const maxLength = mapApiResponseToState(response);
        console.log("responsesplResponse1", response.data);

        const details = [];
        response.data.forEach((responseData) => {
          details.push({
            shiftId: shiftConvert(responseData.shiftId),
            product_name: responseData.brand,
            order_number: responseData.porder,
            product_in_kg: responseData.maxRNwt,
            lc: responseData.lcTotalHours || "N/A",
            strip_clean: responseData.sclTotalHours || "N/A",
            gr_clean: responseData.clTotalHours || "N/A",
            mis: responseData.miTotalHours || "N/A",
            others: responseData.othersTotalHours || "N/A",
            downtime_total:
              (responseData.lcTotalHours || 0) +
              (responseData.sclTotalHours || 0) +
              (responseData.clTotalHours || 0) +
              (responseData.miTotalHours || 0) +
              (responseData.othersTotalHours || 0),
            er: responseData.erTotalHours || "N/A",
            mr: responseData.mrTotalHours || "N/A",
            breakdown_total:
              (responseData.erTotalHours || 0) +
              (responseData.mrTotalHours || 0),
          });
        });
        console.log(" details.push", details);
        setFormData((prevFormData) => ({
          ...prevFormData,
          stoppageDetails: details,
        }));
        // console.log("details", details);
        // console.log("Form Data ", formData);
      } else if (
        response.data.length == 0 ||
        response.data.response.length == 0
      ) {
        message.warning("No details found for the given date.");
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-08/Summary");
        }, 1000);
      }
    } catch (error) {
      // message.error(error.response.data.message);
      // setTimeout(() => {
      //   navigate("/Precot/Spunlace/F-08/Summary");
      // }, 1000);
    }
  };

  const handleSave = async () => {
    setStatusLoader(true);
    let apiurl, payload, successMsg;
    if (role == "ROLE_SUPERVISOR") {
      apiurl = `${ API.prodUrl}/Precot/api/spulance/saveDailyStoppageDetailsF008`;
      successMsg = "Data Saved Succesfully";
      payload = {
        unit: "Unit-H",
        formatNo: "PH-PRD02/F-008",
        formatName: "Daily Stoppage Report - Spunlace",
        sopNumber: "PH-PRD02-D-03",
        revisionNo: "01",
        date: date,
        product_sum: "",
        lc_sum: "",
        strip_clean_sum: "",
        gr_clean_sum: "",
        mis_sum: "",
        others_sum: "",
        downtime_total_sum: "",
        er_sum: "",
        mr_sum: "",
        breakdown_total_sum: "",
        stoppageDetails: [],
      };
      if (formData.stoppage_id) {
        payload.stoppage_id = formData.stoppage_id;
      }
      if (formData.createdAt) {
        payload.createdAt = formData.createdAt;
      }
      if (formData.updatedAt) {
        payload.updatedAt = formData.updatedAt;
      }
      if (formData.createdBy) {
        payload.createdBy = formData.createdBy;
      }
      if (formData.updatedBy) {
        payload.updatedBy = formData.updatedBy;
      }
      if (formData.supervisor_status) {
        payload.supervisor_status = formData.supervisor_status;
      }
      if (formData.supervisor_save_on) {
        payload.supervisor_save_on = formData.supervisor_save_on;
      }
      if (formData.supervisor_save_by) {
        payload.supervisor_save_by = formData.supervisor_save_by;
      }
      if (formData.supervisor_save_id) {
        payload.supervisor_save_id = formData.supervisor_save_id;
      }
      if (formData.supervisor_submit_on) {
        payload.supervisor_submit_on = formData.supervisor_submit_on;
      }
      if (formData.supervisor_submit_by) {
        payload.supervisor_submit_by = formData.supervisor_submit_by;
      }
      if (formData.supervisor_submit_id) {
        payload.supervisor_submit_id = formData.supervisor_submit_id;
      }
      if (formData.supervisor_sign) {
        payload.supervisor_sign = formData.supervisor_sign;
      }

      if (formData.hod_status) {
        payload.hod_status = formData.hod_status;
      }
      if (formData.hod_save_on) {
        payload.hod_save_on = formData.hod_save_on;
      }
      if (formData.hod_save_by) {
        payload.hod_save_by = formData.hod_save_by;
      }
      if (formData.hod_save_id) {
        payload.hod_save_id = formData.hod_save_id;
      }
      if (formData.hod_submit_on) {
        payload.hod_submit_on = formData.hod_submit_on;
      }
      if (formData.hod_submit_by) {
        payload.hod_submit_by = formData.hod_submit_by;
      }
      if (formData.hod_submit_id) {
        payload.hod_submit_id = formData.hod_submit_id;
      }
      if (formData.hod_sign) {
        payload.hod_sign = formData.hod_sign;
      }
      if (formData.hod_mail_status) {
        payload.hod_mail_status = formData.hod_mail_status;
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      apiurl = `${ API.prodUrl}/Precot/api/spulance/DailyStoppageDetailsF008/approveOrReject`;
      successMsg = "Approved Succesfully!";
      payload = {
        id: formData.stoppage_id,
        status: "Approve",
      };
    }

    try {
      const requestMethod = role == "ROLE_SUPERVISOR" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(successMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-08/Summary");
        }, 1000);
      }
    } catch (error) {
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
    setRejectModal(false);
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };
  const handleSubmit = async () => {
    setStatusLoader(true);
    let apiurl, payload;
    if (role == "ROLE_SUPERVISOR") {
      apiurl = `${ API.prodUrl}/Precot/api/spulance/submitDailyStoppageDetailsF008`;
      payload = {
        unit: "Unit-H",
        formatNo: "PH-PRD02/F-008",
        formatName: "Daily Stoppage Report - Spunlace",
        sopNumber: "PH-PRD02-D-03",
        revisionNo: "01",
        date: date,
        product_sum: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        lc_sum: "",
        strip_clean_sum: "",
        gr_clean_sum: "",
        mis_sum: "",
        others_sum: "",
        downtime_total_sum: "",
        er_sum: "",
        mr_sum: "",
        breakdown_total_sum: "",
        stoppageDetails: [],
      };

      if (formData.stoppage_id) {
        payload.stoppage_id = formData.stoppage_id;
      }
      if (formData.createdAt) {
        payload.createdAt = formData.createdAt;
      }
      if (formData.updatedAt) {
        payload.updatedAt = formData.updatedAt;
      }
      if (formData.createdBy) {
        payload.createdBy = formData.createdBy;
      }
      if (formData.updatedBy) {
        payload.updatedBy = formData.updatedBy;
      }
      if (formData.supervisor_status) {
        payload.supervisor_status = formData.supervisor_status;
      }
      if (formData.supervisor_save_on) {
        payload.supervisor_save_on = formData.supervisor_save_on;
      }
      if (formData.supervisor_save_by) {
        payload.supervisor_save_by = formData.supervisor_save_by;
      }
      if (formData.supervisor_save_id) {
        payload.supervisor_save_id = formData.supervisor_save_id;
      }
      if (formData.supervisor_submit_on) {
        payload.supervisor_submit_on = formData.supervisor_submit_on;
      }
      if (formData.supervisor_submit_by) {
        payload.supervisor_submit_by = formData.supervisor_submit_by;
      }
      if (formData.supervisor_submit_id) {
        payload.supervisor_submit_id = formData.supervisor_submit_id;
      }
      if (formData.supervisor_sign) {
        payload.supervisor_sign = formData.supervisor_sign;
      }

      if (formData.hod_status) {
        payload.hod_status = formData.hod_status;
      }
      if (formData.hod_save_on) {
        payload.hod_save_on = formData.hod_save_on;
      }
      if (formData.hod_save_by) {
        payload.hod_save_by = formData.hod_save_by;
      }
      if (formData.hod_save_id) {
        payload.hod_save_id = formData.hod_save_id;
      }
      if (formData.hod_submit_on) {
        payload.hod_submit_on = formData.hod_submit_on;
      }
      if (formData.hod_submit_by) {
        payload.hod_submit_by = formData.hod_submit_by;
      }
      if (formData.hod_submit_id) {
        payload.hod_submit_id = formData.hod_submit_id;
      }
      if (formData.hod_sign) {
        payload.hod_sign = formData.hod_sign;
      }
      if (formData.hod_mail_status) {
        payload.hod_mail_status = formData.hod_mail_status;
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter The Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${ API.prodUrl}/Precot/api/spulance/DailyStoppageDetailsF008/approveOrReject`;
      payload = {
        id: formData.stoppage_id,
        status: "Reject",
        remarks: formData.reason,
      };
    }

    try {
      const requestMethod = role == "ROLE_SUPERVISOR" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(response.data.message);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-08/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const paginatedData = formData.stoppageDetails
    ? formData.stoppageDetails.slice(startIndex, endIndex)
    : [];

  // ------------------------------- Funtions ----------------------------------------
  const handleBack = () => {
    navigate("/Precot/Spunlace/F-08/Summary");
  };
  const handleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const options = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];
  const handleShift = (index, selectedShift) => {
    const updatedStoppageDetails = [...formData.stoppageDetails];
    updatedStoppageDetails[index] = {
      ...updatedStoppageDetails[index],
      shift: selectedShift,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      stoppageDetails: updatedStoppageDetails,
    }));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSizeChange = (current, size) => {
    setRecordsPerPage(size);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const handleHeaderKey = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // ------------------------- New Flow Works --------------------------
  let prodInKgSum = 0;
  let lcSum = 0;
  let stripCleanSum = 0;
  let grCleanSum = 0;
  let misSum = 0;
  let othersSum = 0;
  let downtimeTotalSum = 0;
  let erSum = 0;
  let mrSum = 0;
  let breakdownTotalSum = 0;

  paginatedData.forEach((details) => {
    prodInKgSum +=
      details.product_in_kg == null || details.product_in_kg == "N/A"
        ? 0
        : details.product_in_kg;
    lcSum += details.lc == null || details.lc == "N/A" ? 0 : details.lc;
    stripCleanSum +=
      details.strip_clean == null || details.strip_clean == "N/A"
        ? 0
        : details.strip_clean;
    grCleanSum +=
      details.gr_clean == null || details.gr_clean == "N/A"
        ? 0
        : details.gr_clean;
    misSum += details.mis == null || details.mis == "N/A" ? 0 : details.mis;
    othersSum +=
      details.others == null || details.others == "N/A" ? 0 : details.others;
    downtimeTotalSum +=
      details.downtime_total == null || details.downtime_total == "N/A"
        ? 0
        : details.downtime_total;
    erSum += details.er == null || details.er == "N/A" ? 0 : details.er;
    mrSum += details.mr == null || details.mr == "N/A" ? 0 : details.mr;
    breakdownTotalSum +=
      details.breakdown_total == null || details.breakdown_total == "N/A"
        ? 0
        : details.breakdown_total;
  });

  const pageSizeOptions = [
    "5",
    "10",
    "20",
    "50",
    "100",
    formData.stoppageDetails.length.toString(),
  ].map(Number);
  pageSizeOptions.sort((a, b) => a - b);

  // console.log("Form Data Details", formData);
  return (
    <>
      <BleachingHeader
        formName={"DAILY STOPPAGE REPORT - SPUNLACE"}
        formatNo={"PH-PRD02/F-008"}
        unit={"UNIT H"}
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
              role == "ROLE_SUPERVISOR" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_SUPERVISOR" ? "Save" : "Approve"}
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
              role == "ROLE_SUPERVISOR" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_SUPERVISOR" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_SUPERVISOR" ? " Submit" : "   Reject"}
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
          margin: "10px",
          width: "15%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Input type="date" value={date} readOnly addonBefore="Date"></Input>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Product Details" key="1" style={{ alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div style={{ width: "100%" }}>
              <table>
                <tr>
                  <th rowSpan={2}>S.No</th>
                  <th rowSpan={2}> Shift</th>
                  <th rowSpan={2} style={{ padding: "10px" }}>
                    PRODUCT NAME
                  </th>
                  <th rowSpan={2}>ORDER NO</th>
                  <th rowSpan={2}>PROD .in KG</th>
                  <th colspan="6" style={{ padding: "10px" }}>
                    DOWN TIME in MIN
                  </th>
                  <th colSpan={3} style={{ padding: "10px" }}>
                    BREAK TIME in MIN
                  </th>
                </tr>
                <tr>
                  <th style={{ padding: "10px" }}>LC</th>
                  <th>STRIP CLEAN</th>
                  <th>GR CLEAN</th>
                  <th>MIS.</th>
                  <th>OTHERS</th>
                  <th>TOTAL</th>
                  <th style={{ padding: "10px" }}>ER</th>
                  <th>MR</th>
                  <th>TOTAL</th>
                </tr>
                {paginatedData.map((details, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {startIndex + index + 1}
                    </td>
                    <td style={{ textAlign: "center" }}>{details.shiftId}</td>
                    <td style={{ textAlign: "center" }}>
                      {details.product_name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {details.order_number}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {details.product_in_kg}
                    </td>
                    <td style={{ textAlign: "center" }}>{details.lc}</td>
                    <td style={{ textAlign: "center" }}>
                      {details.strip_clean}
                    </td>
                    <td style={{ textAlign: "center" }}>{details.gr_clean}</td>
                    <td style={{ textAlign: "center" }}>{details.mis}</td>
                    <td style={{ textAlign: "center" }}>{details.others}</td>
                    <td style={{ textAlign: "center" }}>
                      {details.downtime_total}
                    </td>
                    <td style={{ textAlign: "center" }}>{details.er}</td>
                    <td style={{ textAlign: "center" }}>{details.mr}</td>
                    <td style={{ textAlign: "center" }}>
                      {details.breakdown_total}
                    </td>
                  </tr>
                ))}
                <br></br>
                <tr>
                  <th
                    colSpan={4}
                    style={{
                      border: "none",
                      textAlign: "end",
                      fontSize: "14px",
                    }}
                  >
                    Total : &nbsp;
                  </th>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {prodInKgSum == 0 ? prodInKgSum : prodInKgSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {lcSum == 0 ? lcSum : lcSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {stripCleanSum == 0
                      ? stripCleanSum
                      : stripCleanSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {grCleanSum == 0 ? grCleanSum : grCleanSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {misSum == 0 ? misSum : misSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {othersSum == 0 ? othersSum : othersSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {downtimeTotalSum == 0
                      ? downtimeTotalSum
                      : downtimeTotalSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {erSum == 0 ? erSum : erSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {mrSum == 0 ? mrSum : mrSum.toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {breakdownTotalSum == 0
                      ? breakdownTotalSum
                      : breakdownTotalSum.toFixed(2)}
                  </td>
                </tr>
              </table>
              <Pagination
                current={currentPage}
                pageSize={recordsPerPage}
                total={formData.stoppageDetails.length}
                onChange={handlePageChange}
                onShowSizeChange={handleSizeChange}
                showSizeChanger
                pageSizeOptions={pageSizeOptions.map((size) => size.toString())}
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  float: "right",
                }}
              />
            </div>
          </div>
        </TabPane>

        <TabPane tab="Reviews " key="2">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div style={{ width: "80%" }}>
              <table style={{ tableLayout: "fixed" }}>
                <tr>
                  <th style={{ padding: "10px", width: "25%" }}>
                    PRODUCTION SUPERVISOR SIGN & DATE{" "}
                  </th>
                  <th style={{ padding: "10px", width: "25%" }}>
                    HOD/DESIGNEE SIGN & DATE{" "}
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: "30px", textAlign: "center" }}>
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
                          {formatDate(formData.supervisor_submit_on)}
                        </div>
                      </div>

                      <div style={{ marginLeft: "20px" }}>
                        {eSign.supervisor_sign ? (
                          <img
                            src={eSign.supervisor_sign}
                            alt="eSign"
                            style={{
                              width: "150px",
                              height: "80px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "30px", textAlign: "center" }}>
                    {formData.hod_status !== "WAITING_FOR_APPROVAL" && (
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
                            {formData.hod_sign}
                            <br />
                            {formatDate(formData.hod_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.hod_sign ? (
                            <img
                              src={eSign.hod_sign}
                              alt="HOD eSign"
                              style={{
                                width: "150px",
                                height: "80px",
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
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Spunlace_f08;
