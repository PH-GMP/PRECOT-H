/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined } from "@ant-design/icons";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Modal, Radio, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoAdd, IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_PestControl = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { formNo, date, month, year } = state || {};
  const token = localStorage.getItem("token");
  const roleauth = localStorage.getItem("role");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [getByParam, setGetByParam] = useState([]);
  const [getByParam2, setGetByParam2] = useState([]);
  const [getResponse, setGetResponse] = useState();
  const [getapicheck, setGetApiCheck] = useState([]);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [nameOfNewArea, setNameOfNewArea] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [changeableDate, setChangeableDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalNewArea, setShowModalNewArea] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [monthName, setMonthName] = useState("");
  const [yearName, setYearName] = useState(""); 
  const [pciName, setPciName] = useState("");
  const [finalRemarks, setFinalRemarks] = useState("");
  const [pestControlId, setPestControlId] = useState("");
  const [toDelete, setToDelete] = useState([]);
  const [toRecordDelete, setToRecordDelete] = useState([]);
  const [newAreas, setNewAreas] = useState([]); 
  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yearF}-${monthF}-${day}`;

  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const selectedMonth = monthMap[month];
  const MinDate = `${year}-${selectedMonth}-01`;

  const lastDay = new Date(year, selectedMonth, 0).getDate();
  const MaxDate = `${year}-${selectedMonth}-${lastDay}`;

  useEffect(() => {
    if (
      formNo === "PH-HRD01/F-015" ||
      formNo === "PH-HRD01/F-019" ||
      formNo === "PH-HRD01/F-014"
    ) {
      const dateObject = new Date(date);
      const monthIndex = dateObject.getMonth();
      const year = dateObject.getFullYear();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      setMonthName(monthNames[monthIndex]);
      setYearName(year);
    } else {
      setYearName(year);
      setMonthName(month);
    }
  }, [formNo, date, month, year]);
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const formattedDate1 = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const handleBulkYes = () => {
    setTreatmentProvided(Array(areasOfTreatment.length).fill("Y"));
  };
  const handleBulkNo = () => {
    setTreatmentProvided(Array(areasOfTreatment.length).fill("N"));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = getResponse?.qa_mr_sign;
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
  }, [getResponse,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = getResponse?.pci_sign;
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
  }, [getResponse,API.prodUrl, token]);

  const handleAddArea = () => {
    setShowModalNewArea(true);
  };
  const handleModalClose = () => {
    setShowModalNewArea(false);
    setNameOfNewArea(null);
  };
  const disable =
    (roleauth == "ROLE_PCI_TRAINED_PERSON" &&
      getResponse?.pci_status == "PCI_SUBMITTED" &&
      (getResponse?.qa_mr_status == "WAITING_FOR_APPROVAL" ||
        getResponse?.qa_mr_status == "QA_MR_APPROVED")) ||
    roleauth == "QA_MANAGER";

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_PCI_TRAINED_PERSON") {
      if (
        getResponse?.pci_status == "PCI_SUBMITTED" &&
        getResponse?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "block";
      } else if (
        (getResponse?.pci_status == "PCI_SUBMITTED" &&
          getResponse?.qa_mr_status == "WAITING_FOR_APPROVAL") ||
        getResponse?.qa_mr_status == "QA_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") {
      if (
        getResponse?.qa_mr_status == "QA_MR_APPROVED" ||
        getResponse?.qa_mr_status == "QA_MR_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        getResponse?.qa_mr_status == "QA_MR_APPROVED" ||
        getResponse?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_PCI_TRAINED_PERSON") {
      if (
        getResponse?.pci_status == "PCI_SUBMITTED" &&
        getResponse?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      } else if (
        getResponse?.pci_status == "PCI_SUBMITTED" &&
        (getResponse?.qa_mr_status == "WAITING_FOR_APPROVAL" ||
          getResponse?.qa_mr_status == "QA_MR_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") {
      if (
        getResponse?.qa_mr_status == "QA_MR_APPROVED" ||
        getResponse?.qa_mr_status == "QA_MR_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        getResponse?.qa_mr_status == "QA_MR_APPROVED" ||
        getResponse?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleSave = async () => {
    try {
      await savePestControlRecord();
    } catch (error) {
      console.error("Error saving Pest Control :", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await submitPestControlRecord();
    } catch (error) {
      console.error("Error submitting Pest Control Record:", error);
    }
  };

  const [typeOfService, setTypeOfService] = useState("");
  const [chemicalAndDosage, setChemicalAndDosage] = useState("");
  const [Frequency, setFrequency] = useState("");
  const [formName, setformName] = useState("");
  useEffect(() => {
    if (formNo === "PH-HRD01/F-015") {
      setformName("PEST CONTROL REPORT - IFIM for House, Drain, Flesh Flies");
      setTypeOfService(
        "Integrated Flying Insect Management for House Flies, Drain Flies, Flesh Flies"
      );
      setChemicalAndDosage(
        "Deltamethrin 2.5%SC, Propoxur 2% Bait, Propoxur 20% EC, Lambda cyhalothrin 10% WP"
      );
      setFrequency("Fortnightly");
    } else if (formNo === "PH-HRD01/F-016") {
      setformName(
        "PEST CONTROL SERVICE REPORT - ILM Service for House Lizards"
      );
      setTypeOfService(
        "Integrated Lizard Management (ILM) Service for House Lizards"
      );
      setChemicalAndDosage("Turbble Gum");
      setFrequency("Monthly");
    } else if (formNo === "PH-HRD01/F-017") {
      setformName("PEST CONTROL REPORT - ISMS for Spider & Crawling Insects");
      setTypeOfService(
        "Integrated Spider Management Service for Spider & Crawling Insects"
      );
      setChemicalAndDosage("Propoxur 20% EC");
      setFrequency("Half Yearly");
    } else if (formNo === "PH-HRD01/F-018") {
      setformName("PEST CONTROL SERVICE REPORT - IPM for Mosquitoes");
      setTypeOfService("IPM (Thermal Fogging) for Mosquitoes");
      setChemicalAndDosage("Deltamethrin 1.25% w/w or 1.% w/v  ");
      setFrequency("Monthly");
    } else if (formNo === "PH-HRD01/F-019") {
      setformName(
        "PEST CONTROL REPORT - Pro-Guard Service for Crawling Insects"
      );
      setTypeOfService("Pro-Guard Service for Crawling Insects");
      setChemicalAndDosage(
        "Deltamethrin 2.5%SC, Propoxur 20% EC, Cyfluthrin 5% EW."
      );
      setFrequency("Fortnightly");
    } else if (formNo === "PH-HRD01/F-014") {
      setformName("PEST CONTROL SERVICE REPORT - IMM Service for Mosquitoes");
      setTypeOfService(
        "IMM (Integrated Mosquito Management) Service for Mosquitoes"
      );
      setChemicalAndDosage(
        "Cyfluthrin 5% EW, Lambda cyhalothrin 10% WP, Deltamethrin 2.5% SC"
      );
      setFrequency("Fortnightly");
    } else {
      setformName("");
      setTypeOfService("");
      setChemicalAndDosage("");
    }
  }, [formNo]);

  const savePestControlRecord = async () => {
    setSaveLoading(true);
    const finalDate =
      typeof date === "string" && date.trim() !== "" ? date : changeableDate;

    try {
      const payload = {
        control_id: pestControlId,
        format_name: "PEST CONTROL SERVICE REPORT",
        format_no: formNo,
        revision_no: "01",
        sop_number: "PH-HRD01-D-02",
        unit: "Unit H",
        frequency: Frequency,
        date: finalDate,
        year: yearName,
        month: monthName,
        next_due_date: nextDueDate,
        type_of_service: typeOfService,
        name_of_chemical: chemicalAndDosage,
        pci_trained_person: pciName,
        remarks: finalRemarks || "NA",
        details: areasOfTreatment.map((area, index) => ({
          area_of_treatments: area,
          treatment_provided: treatmentProvided[index] || "NA",
          remarks: remarks[index] || "NA",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/PestController/SavePestController`,
        payload,
        { headers }
      );
      if (toDelete.length > 0) {
        await Promise.all(
          toDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/PestController/deleteAreaOfTreatments?id=${id}`,
              { headers }
            );
          })
        );
        setToDelete([]);
      }
      if (toRecordDelete.length > 0) {
        await Promise.all(
          toRecordDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/PestController/delete?id=${id}`,
              { headers }
            );
          })
        );
        setToRecordDelete([]);
      }
      if (newAreas.length > 0) {
        await Promise.all(
          newAreas.map(async (area) => {
            try {
              await axios.post(
                `${API.prodUrl}/Precot/api/QA/Service/PestController/addArea`,
                {
                  format_no: formNo,
                  area_of_treatments: area,
                },
                { headers }
              );
            } catch (error) {
              console.error(
                `Failed to add area ${area}:`,
                error.response?.data?.message || error.message
              );
              message.error(`Failed to add area ${area}`);
            }
          })
        );
        setNewAreas([]);
      }

      setTimeout(() => {
        navigate("/Precot/QA/PestControl/Summary", {
          state: {
            formNo: formNo,
          },
        });
      }, 1500);

      message.success("Pest Control Record Saved Successfully..");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to save Pest Control Record!!"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const submitPestControlRecord = async () => {
    setSubmitLoading(true);
    if (pciName == "null" || pciName == "") {
      message.warning("PCI Name Required");
      setSubmitLoading(false);
      return;
    }
    if (
      formNo !== "PH-HRD01/F-015" &&
      (nextDueDate == "null" || nextDueDate == "")
    ) {
      message.warning("Next Due Date Required");
      setSubmitLoading(false);
      return;
    }
    if (
      (formNo == "PH-HRD01/F-016" ||
        formNo == "PH-HRD01/F-017" ||
        formNo == "PH-HRD01/F-018") &&
      (changeableDate == "null" || changeableDate == "")
    ) {
      message.warning("Date Required");
      setSubmitLoading(false);
      return;
    }
    const finalDate =
      typeof date === "string" && date.trim() !== "" ? date : changeableDate;
    try {
      const payload = {
        control_id: pestControlId,
        format_name: "PEST CONTROL SERVICE REPORT",
        format_no: formNo,
        revision_no: "01",
        sop_number: "PH-HRD01-D-02",
        unit: "Unit H",
        frequency: Frequency,
        date: finalDate,
        year: yearName,
        month: monthName,
        next_due_date: nextDueDate || "NA",
        type_of_service: typeOfService,
        name_of_chemical: chemicalAndDosage,
        pci_trained_person: pciName,
        remarks: finalRemarks || "NA",
        details: areasOfTreatment.map((area, index) => ({
          area_of_treatments: area,
          treatment_provided: treatmentProvided[index] || "NA",
          remarks: remarks[index] || "NA",
        })),
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/PestController/SubmitPestController`,
        payload,
        { headers }
      );

      if (toDelete.length > 0) {
        await Promise.all(
          toDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/PestController/deleteAreaOfTreatments?id=${id}`,
              { headers }
            );
          })
        );
        setToDelete([]);
      }
      if (toRecordDelete.length > 0) {
        await Promise.all(
          toRecordDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/PestController/delete?id=${id}`,
              { headers }
            );
          })
        );
        setToRecordDelete([]);
      }

      if (newAreas.length > 0) {
        await Promise.all(
          newAreas.map(async (area) => {
            try {
              await axios.post(
                `${API.prodUrl}/Precot/api/QA/Service/PestController/addArea`,
                {
                  format_no: formNo,
                  area_of_treatments: area,
                },
                { headers }
              );
            } catch (error) {
              console.error(
                `Failed to add area ${area}:`,
                error.response?.data?.message || error.message
              );
              message.error(`Failed to add area ${area}`);
            }
          })
        );
        setNewAreas([]);
      }
      setTimeout(() => {
        navigate("/Precot/QA/PestControl/Summary", {
          state: {
            formNo: formNo,
          },
        });
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Pest Control Record !!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/PestControl/Summary", {
      state: {
        formNo: formNo,
      },
    });
  };

  useEffect(() => {
    if (monthName && yearName) {
      fetchDetailsByDate();
    }
  }, [monthName, yearName]);
  useEffect(() => {
    const { formNo, date, month, year } = state || {};
    if (getResponse?.message == "No data") {
      fetchAreaOfTreatment(formNo);
    }
  }, [getResponse]);

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
        `${API.prodUrl}/Precot/api/QA/Service/PestController/approveOrReject`,
        {
          id: pestControlId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setTimeout(() => {
          navigate("/Precot/QA/PestControl/Summary", {
            state: {
              formNo: formNo,
            },
          });
        }, 1500);
      })
      .catch((err) => {
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
        `${API.prodUrl}/Precot/api/QA/Service/PestController/approveOrReject`,
        {
          id: pestControlId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setTimeout(() => {
          navigate("/Precot/QA/PestControl/Summary", {
            state: {
              formNo: formNo,
            },
          });
        }, 1500);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const handleAddNewArea = () => {
    if (!nameOfNewArea) {
      message.warning("Please Enter the Name of New Area!");
      return;
    }
    setAreasOfTreatment((prev) => [...prev, nameOfNewArea]);
    setNewAreas((prev) => [...prev, nameOfNewArea]);
    message.success(
      "New Area marked for addition. It will be added after saving."
    );
    handleModalClose();
    setNameOfNewArea("");
  };

  const fetchDetailsByDate = async () => {
    let api;
    if (
      formNo == "PH-HRD01/F-015" ||
      formNo == "PH-HRD01/F-019" ||
      formNo == "PH-HRD01/F-014"
    ) {
      api = `${API.prodUrl}/Precot/api/QA/Service/PestController/getByparam?format_no=${formNo}&month=${monthName}&year=${yearName}&date=${date}`;
    } else if (
      formNo == "PH-HRD01/F-016" ||
      formNo == "PH-HRD01/F-017" ||
      formNo == "PH-HRD01/F-018"
    ) {
      api = `${API.prodUrl}/Precot/api/QA/Service/PestController/getByparam?format_no=${formNo}&month=${monthName}&year=${yearName}`;
    } else {
      api = "";
    }

    try {
      const response = await axios.get(
        api,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setGetResponse(response.data);

      if (
        ((roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") &&
          response.data.pci_status !== "PCI_SUBMITTED") ||
        ((roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") &&
          response.data.qa_mr_status == "QA_MR_REJECTED")
      ) {
        message.error("PCI Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/QA/PestControl/Summary", {
            state: {
              formNo: formNo,
            },
          });
        }, 1500);
      }
      setGetApiCheck(response.data);
      if (response.data && response.data.message !== "No data") {
        const data = response.data;
        setNextDueDate(response.data.next_due_date);
        setFinalRemarks(response.data.remarks);
        setPciName(response.data.pci_trained_person);
        setPestControlId(response.data.control_id);
        setGetByParam2(response.data.details.map((item) => item.line_id));
        setAreasOfTreatment(
          response.data.details.map((item) => item.area_of_treatments)
        );
        setTreatmentProvided(
          response.data.details.map((item) => item.treatment_provided)
        );
        setChangeableDate(response.data.date);
        setRemarks(response.data.details.map((item) => item.remarks)); 
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };
  const fetchAreaOfTreatment = async (formNo) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/PestController/getAreaOfTreatments?format_no=${formNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response1 = response.data; 

      setAreasOfTreatment(response1.map((item) => item.area_of_treatments));

      setGetByParam(response1.map((item) => item.id));
    } catch (error) {
    } finally {
    }
  };

  const [areasOfTreatment, setAreasOfTreatment] = useState([]);
  const [treatmentProvided, setTreatmentProvided] = useState([]);
  const [remarks, setRemarks] = useState([]);

  const handleTreatmentProvidedChange = (index, value) => {
    const newTreatmentProvided = [...treatmentProvided];
    newTreatmentProvided[index] = value;
    setTreatmentProvided(newTreatmentProvided);
  };

  const handleRemarksChange = (index, value) => {
    const newRemarks = [...remarks];
    newRemarks[index] = value;
    setRemarks(newRemarks);
  };
  const handlePCIName = (e) => {
    setPciName(e.target.value);
  };
  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      const lineIdToDelete = getByParam[index];
      const lineIdToDelete2 = getByParam2[index];
      if (lineIdToDelete !== undefined) {
        setToDelete((prev) => [...prev, lineIdToDelete]);
      }
      if (lineIdToDelete2 !== undefined) {
        setToRecordDelete((prev) => [...prev, lineIdToDelete2]);
      }
      const updatedAreas = areasOfTreatment.filter((_, i) => i !== index);
      const updatedTreatmentProvided = treatmentProvided.filter(
        (_, i) => i !== index
      );
      const updatedRemarks = remarks.filter((_, i) => i !== index);
      setAreasOfTreatment(updatedAreas);
      setTreatmentProvided(updatedTreatmentProvided);
      setRemarks(updatedRemarks);

      // alert('Row marked for deletion. It will be deleted after saving.');
    } else {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Pest Control Service</p>,
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              gap: "10px",
              marginTop: "2px",
              marginRight: "5px",
              marginBottom: "8px",
            }}
          >
            <button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "none",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              shape="round"
              onClick={() => handleBulkYes()}
              disabled={disable}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ marginRight: "5px" }}
              />
              Bulk Yes
            </button>
            <button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "none",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              shape="circle"
              onClick={() => handleBulkNo()}
              disabled={disable}
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                style={{ marginRight: "5px" }}
              />
              Bulk No
            </button>
          </div>
          {/* colums = 100 */}
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="5" style={{ height: "35px" }}>
                Sr. No.{" "}
              </th>
              <th colSpan="35">Area of Treatment</th>
              <th colSpan="30">
                Treatment Provided
                <br />
                (Yes / No)
              </th>
              <th colSpan="30">Remark</th>
            </tr>
            {areasOfTreatment.map((area, index) => (
              <tr key={index}>
                <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {area}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={(e) =>
                      handleTreatmentProvidedChange(index, e.target.value)
                    }
                    value={treatmentProvided[index]}
                    disabled={disable}
                  >
                    <Radio value="Y">Yes</Radio>
                    <Radio value="N">No</Radio>
                    <Radio value="NA">NA</Radio>
                  </Radio.Group>
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    disabled={disable}
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={remarks[index]}
                    onChange={(e) => handleRemarksChange(index, e.target.value)}
                  />
                </td>
                <td
                  colSpan="1"
                  style={{
                    height: "35px",
                    textAlign: "center",
                    cursor: "pointer",
                    size: "40px",
                    border: "none",
                    display: disable ? "none" : "block",
                  }}
                  onClick={() => handleDeleteRow(index)}
                >
                  <DeleteOutlined
                    style={{ fontSize: "24px", color: "#ff4d4f" }}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <th colSpan="100" style={{ height: "35px", textAlign: "left" }}>
                {" "}
                Remarks:{" "}
                <TextArea
                  value={finalRemarks}
                  disabled={disable}
                  onChange={(e) => setFinalRemarks(e.target.value)}
                  rows={4}
                  style={{ width: "100%" }}
                />
              </th>
            </tr>
          </table>
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "8px",
            }}
            icon={<IoAdd color="#00308F" />}
            onClick={handleAddArea}
            shape="round"
            disabled={disable}
          >
            Add New Area
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Pest Control Done by (PCI){" "}
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Manager - QA Sign & Date
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
                <div style={{ textAlign: "center" }}>
                  <Input
                    placeholder="PCI Name"
                    value={pciName}
                    onChange={handlePCIName}
                    disabled={disable}
                    onKeyDown={handleKeyDown2}
                    style={{
                      width: "100%",
                      height: "40px",
                      border: "none",
                      textAlign: "center",
                    }}
                  />
                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    {formattedDate(getResponse?.pci_submit_on) || ""}
                  </div>
                </div>
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
                {(getResponse?.qa_mr_status === "QA_MR_APPROVED" ||
                  getResponse?.qa_mr_status === "QA_MR_REJECTED") && (
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
                        <div>{getResponse?.qa_mr_sign}</div>
                        <div>{formattedDate(getResponse?.qa_mr_submit_on)}</div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="QA manager Sign"
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
        formName="PEST CONTROL SERVICE REPORT"
        formatNo={formNo}
        sopNo="PH-PRD04-D-04"
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

          role === "QA_MANAGER" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ||
          role === "QA_MANAGER" ? (
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
          marginLeft: "2px",
        }}
      >
        <Input
          addonBefore="Frequency : "
          placeholder="Frequency : "
          value={Frequency}
          style={{ width: "15%", height: "35px" }}
        />
        {(formNo === "PH-HRD01/F-015" ||
          formNo === "PH-HRD01/F-019" ||
          formNo === "PH-HRD01/F-014") && (
          <Input
            addonBefore="Date:"
            placeholder="Date"
            value={formattedDate1(date)}
            style={{ width: "20%", height: "35px" }}
          />
        )}
        <Input
          addonBefore="Month:"
          placeholder="Month"
          value={monthName}
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={yearName}
          style={{ width: "20%", height: "35px" }}
        />
        {formNo !== "PH-HRD01/F-015" && (
          <Input
            addonBefore="Next Due Date:"
            placeholder="Next Due Date"
            type="date"
            disabled={disable}
            value={nextDueDate}
            min={formattedToday}
            onChange={(e) => setNextDueDate(e.target.value)}
            style={{ width: "20%", height: "35px" }}
          />
        )}
        {(formNo == "PH-HRD01/F-016" ||
          formNo == "PH-HRD01/F-017" ||
          formNo == "PH-HRD01/F-018") && (
          <Input
            addonBefore="Date:"
            placeholder="Date"
            type="date"
            disabled={disable}
            value={changeableDate}
            min={MinDate}
            max={MaxDate}
            onChange={(e) => setChangeableDate(e.target.value)}
            style={{ width: "20%", height: "35px" }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "2px",
          marginLeft: "2px",
        }}
      >
        <Input
          addonBefore="Type of Service : "
          placeholder="Type of Service"
          value={typeOfService}
          style={{ width: "100%", height: "35px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "2px",
          marginLeft: "2px",
        }}
      >
        <Input
          addonBefore="Name of the chemical& Dosage:  "
          placeholder="Name of the chemical& Dosage"
          value={chemicalAndDosage}
          style={{ width: "100%", height: "35px" }}
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

      <Modal
        title="Add New Area of Treatment"
        open={showModalNewArea}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            icon={<IoAdd color="#00308F" />}
            onClick={() => {
              if (
                confirm("Are you sure want to Add the New Area Of Treatment ??")
              ) {
                handleAddNewArea();
              }
            }}
          >
            Add
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Area of Treatment:
          </label>
          <TextArea
            value={nameOfNewArea}
            onChange={(e) => setNameOfNewArea(e.target.value)}
            rows={4}
            placeholder="Enter the Name of New Area"
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default QA_PestControl;
