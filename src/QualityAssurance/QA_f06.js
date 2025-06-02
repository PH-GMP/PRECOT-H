/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Tabs, Tooltip } from "antd";
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

const QA_f06 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { year } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [Id, setId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [nameOfNewTopic, setNameOfNewTopic] = useState("");
  const [showModalNewTopic, setShowModalNewTopic] = useState(false);
  const [newTopic, setNewTopic] = useState([]);
  const [lineId, setLineId] = useState([]);
  const [topicId, setTopicId] = useState([]);
  const [topicTableDelete, setTopicTableDelete] = useState([]);
  const [RecordTableDelete, setRecordTableDelete] = useState([]);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const currentDate = new Date();
  const [showModal, setShowModal] = useState(false);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  function isJanuaryDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 0);
  }
  const isJanuaryDisabled = isJanuaryDisabledForYear(year);
  function isFebDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 1);
  }
  const isFebDisabled = isFebDisabledForYear(year);
  function isMarDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 2);
  }
  const isMarDisabled = isMarDisabledForYear(year);
  function isAprDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 3);
  }
  const isAprDisabled = isAprDisabledForYear(year);
  function isMayDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 4);
  }
  const isMayDisabled = isMayDisabledForYear(year);
  function isJuneDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 5);
  }
  const isJuneDisabled = isJuneDisabledForYear(year);
  function isJulyDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 6);
  }
  const isJulyDisabled = isJulyDisabledForYear(year);
  function isAugDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 7);
  }
  const isAugDisabled = isAugDisabledForYear(year);
  function isSepDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 8);
  }
  const isSepDisabled = isSepDisabledForYear(year);
  function isOctDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 9);
  }
  const isOctDisabled = isOctDisabledForYear(year);
  function isNovDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 10);
  }
  const isNovDisabled = isNovDisabledForYear(year);
  function isDecDisabledForYear(year) {
    return year < currentYear || (year == currentYear && currentMonth > 11);
  }
  const isDecDisabled = isDecDisabledForYear(year);

  const [rows, setRows] = useState([
    {
      lineIdF: "",
      trainingTopics: "",
      JanPlan: "",
      JanAct: "",
      FebPlan: "",
      FebAct: "",
      MarPlan: "",
      MarAct: "",
      AprPlan: "",
      AprAct: "",
      MayPlan: "",
      MayAct: "",
      JunPlan: "",
      JunAct: "",
      JulPlan: "",
      JulAct: "",
      AugPlan: "",
      AugAct: "",
      SeptPlan: "",
      SeptAct: "",
      OctPlan: "",
      OctAct: "",
      NovPlan: "",
      NovAct: "",
      DecPlan: "",
      DecAct: "",
    },
  ]);

  const handleKeyDown3 = (e) => {
    const isAlphanumeric = /^[a-zA-Z.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  const handleAddTopic = () => {
    setShowModalNewTopic(true);
  };

  const handleAddNewTopic = () => {
    if (!nameOfNewTopic) {
      message.warning("Please Enter the Name of New Topic!");
      return;
    }
    setRows((prevRows) => [
      ...prevRows,
      {
        lineIdF: "",
        trainingTopics: nameOfNewTopic,
        JanPlan: "",
        JanAct: "",
        FebPlan: "",
        FebAct: "",
        MarPlan: "",
        MarAct: "",
        AprPlan: "",
        AprAct: "",
        MayPlan: "",
        MayAct: "",
        JunPlan: "",
        JunAct: "",
        JulPlan: "",
        JulAct: "",
        AugPlan: "",
        AugAct: "",
        SeptPlan: "",
        SeptAct: "",
        OctPlan: "",
        OctAct: "",
        NovPlan: "",
        NovAct: "",
        DecPlan: "",
        DecAct: "",
      },
    ]);
    setNewTopic((prev) => [...prev, nameOfNewTopic]);
    message.success(
      "New Training Topic marked for addition. It will be added after saving."
    );
    handleModalClose();
    setNameOfNewTopic("");
  };
  const handleModalClose = () => {
    setShowModalNewTopic(false);
    setNameOfNewTopic(null);
  };
  // onchange functions

  const handlePlanChange = (index, month, value) => {
    if (value.length > 1) {
      return;
    }
    if (value === "p" || value === "c") {
      value = value.toUpperCase();
    }
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][month] = value;

      return updatedRows;
    });
  };

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
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

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.qaDesigneeSign;
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
  }, [DetailsByParam, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.qaManagerMrSign;
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
  }, [DetailsByParam, API.prodUrl, token]);

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      const TopicIdToDelete = topicId[index];
      const lineIdToDelete = lineId[index];
      if (TopicIdToDelete !== undefined) {
        setTopicTableDelete((prev) => [...prev, TopicIdToDelete]);
      }
      if (lineIdToDelete !== undefined) {
        setRecordTableDelete((prev) => [...prev, lineIdToDelete]);
      }
      const updatedTopics = rows.filter((_, i) => i !== index);
      setRows(updatedTopics);
    } else {
    }
  };

  const handleKeyDown = (event) => {
    if (!["C", "c"].includes(event.key) && event.key.length === 1) {
      event.preventDefault();
    }
  };
  const handleKeyDown2 = (event) => {
    if (!["P", "p"].includes(event.key) && event.key.length === 1) {
      event.preventDefault();
    }
  };

  const roleauth = localStorage.getItem("role");
  const disabled =
    roleauth === "ROLE_MR" ||
    roleauth === "QA_MANAGER" ||
    (roleauth === "ROLE_DESIGNEE" &&
      DetailsByParam?.qaDesigneeStatus === "QA_DESIGNIEE_SUBMITTED" &&
      DetailsByParam?.qaManagerMrStatus !== "QA_MANAGER_MR_REJECTED");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (role == "ROLE_DESIGNEE") {
      if (
        DetailsByParam?.qaDesigneeStatus == "QA_DESIGNIEE_SUBMITTED" &&
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "block";
      } else if (
        (DetailsByParam?.qaDesigneeStatus == "QA_DESIGNIEE_SUBMITTED" &&
          DetailsByParam?.qaManagerMrStatus == "WAITING_FOR_APPROVAL") ||
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "QA_MANAGER" || role == "ROLE_MR") {
      if (
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED" ||
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_DESIGNEE") {
      if (
        DetailsByParam?.qaDesigneeStatus == "QA_DESIGNIEE_SUBMITTED" &&
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "none";
      } else if (
        DetailsByParam?.qaDesigneeStatus == "QA_DESIGNIEE_SUBMITTED" &&
        (DetailsByParam?.qaManagerMrStatus == "WAITING_FOR_APPROVAL" ||
          DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED")
      ) {
        return "none";
      }
    } else if (role == "QA_MANAGER" || role == "ROLE_MR") {
      if (
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED" ||
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED" ||
        DetailsByParam?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const fetchTrainingTopics = async (formNo) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/getTrainingTopics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;

      if (DetailsByParam?.message == "No data") {
        const topicsData = responseData.map((item) => ({
          lineIdF: item.id,
          trainingTopics: item.topic,
          JanPlan: "",
          JanAct: "",
          FebPlan: "",
          FebAct: "",
          MarPlan: "",
          MarAct: "",
          AprPlan: "",
          AprAct: "",
          MayPlan: "",
          MayAct: "",
          JunPlan: "",
          JunAct: "",
          JulPlan: "",
          JulAct: "",
          AugPlan: "",
          AugAct: "",
          SeptPlan: "",
          SeptAct: "",
          OctPlan: "",
          OctAct: "",
          NovPlan: "",
          NovAct: "",
          DecPlan: "",
          DecAct: "",
        }));

        setRows(topicsData);
      }
      setTopicId(responseData.map((item) => item.id));
    } catch (error) {
    } finally {
    }
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await SaveRecord();
    } catch (error) {
      console.error("Error saving Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitRecord();
    } catch (error) {
      console.error("Error submitting Record..", error);
    }
  };
  const handleConfirmSubmit = () => {
    Modal.confirm({
      title: "Are you sure you want to submit?",
      content:
        "Once submitted, this cannot be edited again. Please confirm if you want to proceed.",
      okText: "Yes, Submit",
      cancelText: "Cancel",
      onOk: handleSubmit,
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
        `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/approveOrReject`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-06/Summary");
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

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/approveOrReject`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-06/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const SaveRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "TRAINING CALENDAR",
        formatNo: "PH-QAD01-F-006",
        revisionNo: 1,
        sopNumber: "PH-QAD01-D-15",
        unit: "Unit H",
        year: year,
        calendarId: Id,
        trainingSessionList: rows.map((row) => ({
          ...(DetailsByParam.message !== "No data" && {
            sessionId: row.lineIdF,
          }),
          trainingTopic: row.trainingTopics,
          januaryPlan: row.JanPlan,
          januaryActual: row.JanAct,
          februaryPlan: row.FebPlan,
          februaryActual: row.FebAct,
          marchPlan: row.MarPlan,
          marchActual: row.MarAct,
          aprilPlan: row.AprPlan,
          aprilActual: row.AprAct,
          mayPlan: row.MayPlan,
          mayActual: row.MayAct,
          junePlan: row.JanPlan,
          juneActual: row.JunAct,
          julyPlan: row.JulPlan,
          julyActual: row.JulAct,
          augustPlan: row.AugPlan,
          augustActual: row.AugAct,
          septemberPlan: row.SeptPlan,
          septemberActual: row.SeptAct,
          octoberPlan: row.OctPlan,
          octoberActual: row.OctAct,
          novemberPlan: row.NovPlan,
          novemberActual: row.NovAct,
          decemberPlan: row.DecPlan,
          decemberActual: row.DecAct,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/saveTrainingCalendar`,
        payload,
        { headers }
      );
      if (topicTableDelete.length > 0) {
        await Promise.all(
          topicTableDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/deleteTrainingTopic?id=${id}`,
              { headers }
            );
          })
        );
        setTopicTableDelete([]);
      }
      if (RecordTableDelete.length > 0) {
        await Promise.all(
          RecordTableDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/deleteSessionInfoFromCalendar?id=${id}`,
              { headers }
            );
          })
        );
        setRecordTableDelete([]);
      }

      if (newTopic.length > 0) {
        await Promise.all(
          newTopic.map(async (topic) => {
            try {
              await axios.post(
                `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/addTrainingTopic`,
                {
                  formatNo: "PH-QAD01-F-006",
                  topic: topic,
                },
                { headers }
              );
            } catch (error) {
              console.error(
                `Failed to add area ${topic}:`,
                error.response?.data?.message || error.message
              );
              message.error(`Failed to add area ${topic}`);
            }
          })
        );
        setNewTopic([]);
      }
      setTimeout(() => {
        navigate("/Precot/QA/F-06/Summary");
      }, 1500);
      message.success("Record Saved Successfully");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to save Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitRecord = async () => {
    setSubmitLoading(true);

    try {
      const payload = {
        formatName: "TRAINING CALENDAR",
        formatNo: "PH-QAD01-F-006",
        revisionNo: 1,
        sopNumber: "PH-QAD01-D-15",
        unit: "Unit H",
        year: year,
        calendarId: Id,
        trainingSessionList: rows.map((row) => ({
          ...(DetailsByParam.message !== "No data" && {
            sessionId: row.lineIdF,
          }),
          trainingTopic: row.trainingTopics,
          januaryPlan: row.JanPlan || "-",
          januaryActual: row.JanAct || "-",
          februaryPlan: row.FebPlan || "-",
          februaryActual: row.FebAct || "-",
          marchPlan: row.MarPlan || "-",
          marchActual: row.MarAct || "-",
          aprilPlan: row.AprPlan || "-",
          aprilActual: row.AprAct || "-",
          mayPlan: row.MayPlan || "-",
          mayActual: row.MayAct || "-",
          junePlan: row.JanPlan || "-",
          juneActual: row.JunAct || "-",
          julyPlan: row.JulPlan || "-",
          julyActual: row.JulAct || "-",
          augustPlan: row.AugPlan || "-",
          augustActual: row.AugAct || "-",
          septemberPlan: row.SeptPlan || "-",
          septemberActual: row.SeptAct || "-",
          octoberPlan: row.OctPlan || "-",
          octoberActual: row.OctAct || "-",
          novemberPlan: row.NovPlan || "-",
          novemberActual: row.NovAct || "-",
          decemberPlan: row.DecPlan || "-",
          decemberActual: row.DecAct || "-",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/submitTrainingCalendar`,
        payload,
        { headers }
      );
      if (topicTableDelete.length > 0) {
        await Promise.all(
          topicTableDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/deleteTrainingTopic?id=${id}`,
              { headers }
            );
          })
        );
        setTopicTableDelete([]);
      }
      if (RecordTableDelete.length > 0) {
        await Promise.all(
          RecordTableDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/deleteSessionInfoFromCalendar?id=${id}`,
              { headers }
            );
          })
        );
        setRecordTableDelete([]);
      }

      if (newTopic.length > 0) {
        await Promise.all(
          newTopic.map(async (topic) => {
            try {
              await axios.post(
                `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/addTrainingTopic`,
                {
                  formatNo: "PH-QAD01-F-006",
                  topic: topic,
                },
                { headers }
              );
            } catch (error) {
              console.error(
                `Failed to add area ${topic}:`,
                error.response?.data?.message || error.message
              );
              message.error(`Failed to add area ${topic}`);
            }
          })
        );
        setNewTopic([]);
      }

      setTimeout(() => {
        navigate("/Precot/QA/F-06/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-06/Summary");
  };

  useEffect(() => {
    fetchDetailsByParam();
  }, []);
  useEffect(() => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        const updatedRow = { ...row };

        if (isJanuaryDisabled) {
          updatedRow.JanPlan = updatedRow.JanPlan || "-";
          updatedRow.JanAct = updatedRow.JanAct || "-";
        }
        if (isFebDisabled) {
          updatedRow.FebPlan = updatedRow.FebPlan || "-";
          updatedRow.FebAct = updatedRow.FebAct || "-";
        }
        if (isMarDisabled) {
          updatedRow.MarPlan = updatedRow.MarPlan || "-";
          updatedRow.MarAct = updatedRow.MarAct || "-";
        }
        if (isAprDisabled) {
          updatedRow.AprPlan = updatedRow.AprPlan || "-";
          updatedRow.AprAct = updatedRow.AprAct || "-";
        }
        if (isMayDisabled) {
          updatedRow.MayPlan = updatedRow.MayPlan || "-";
          updatedRow.MayAct = updatedRow.MayAct || "-";
        }
        if (isJuneDisabled) {
          updatedRow.JunPlan = updatedRow.JunPlan || "-";
          updatedRow.JunAct = updatedRow.JunAct || "-";
        }
        if (isJulyDisabled) {
          updatedRow.JulPlan = updatedRow.JulPlan || "-";
          updatedRow.JulAct = updatedRow.JulAct || "-";
        }
        if (isAugDisabled) {
          updatedRow.AugPlan = updatedRow.AugPlan || "-";
          updatedRow.AugAct = updatedRow.AugAct || "-";
        }
        if (isSepDisabled) {
          updatedRow.SeptPlan = updatedRow.SeptPlan || "-";
          updatedRow.SeptAct = updatedRow.SeptAct || "-";
        }
        if (isOctDisabled) {
          updatedRow.OctPlan = updatedRow.OctPlan || "-";
          updatedRow.OctAct = updatedRow.OctAct || "-";
        }
        if (isNovDisabled) {
          updatedRow.NovPlan = updatedRow.NovPlan || "-";
          updatedRow.NovAct = updatedRow.NovAct || "-";
        }
        if (isDecDisabled) {
          updatedRow.DecPlan = updatedRow.DecPlan || "-";
          updatedRow.DecAct = updatedRow.DecAct || "-";
        }

        return updatedRow;
      });
    });
  }, [topicId, DetailsByParam]);

  useEffect(() => {
    fetchTrainingTopics();
  }, [DetailsByParam]);

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/trainingCalendar/getTrainingCalendar?year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setDetailsByParam(response.data);

      if (response.data && response.data.message !== "No data") {
        const data = response.data;
        setId(data.calendarId);
        setRows(
          data.trainingSessionList?.map((item) => ({
            lineIdF: item.sessionId,
            date: item.date,
            trainingTopics: item.trainingTopic,
            JanPlan: item.januaryPlan,
            JanAct: item.januaryActual,
            FebPlan: item.februaryPlan,
            FebAct: item.februaryActual,
            MarPlan: item.marchPlan,
            MarAct: item.marchActual,
            AprPlan: item.aprilPlan,
            AprAct: item.aprilActual,
            MayPlan: item.mayPlan,
            MayAct: item.mayActual,
            JunPlan: item.junePlan,
            JunAct: item.juneActual,
            JulPlan: item.julyPlan,
            JulAct: item.julyActual,
            AugPlan: item.augustPlan,
            AugAct: item.augustActual,
            SeptPlan: item.septemberPlan,
            SeptAct: item.septemberActual,
            OctPlan: item.octoberPlan,
            OctAct: item.octoberActual,
            NovPlan: item.novemberPlan,
            NovAct: item.novemberActual,
            DecPlan: item.decemberPlan,
            DecAct: item.decemberActual,
          }))
        );
        setLineId(
          response.data.trainingSessionList.map((item) => item.sessionId)
        );
        if (
          ((role == "QA_MANAGER" || role == "ROLE_MR") &&
            response.data.qaDesigneeStatus != "QA_DESIGNIEE_SUBMITTED") ||
          ((role == "QA_MANAGER" || role == "ROLE_MR") &&
            response.data.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED")
        ) {
          message.error("Designee Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/QA/F-06/Summary");
          }, 1500);
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
      label: <p>Annual Plan</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="20" rowSpan="2" style={{ textAlign: "center" }}>
                Training Topics
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Jan.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Feb.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Mar.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Apr.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                May.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Jun.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Jul.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Aug.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Sept.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Oct.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Nov.
              </th>
              <th colSpan="8" style={{ textAlign: "center" }}>
                Dec.
              </th>
            </tr>
            <tr>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Plan
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Act.
              </th>
            </tr>

            {rows?.map((row, index) => (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {index + 1}
                </td>

                <td colSpan="20" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    className="inp-new"
                    style={{
                      width: "85%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.trainingTopics}
                  />
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isJanuaryDisabled}
                    className="inp-new"
                    style={{
                      width: "85%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.JanPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "JanPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isJanuaryDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.JanAct}
                    onChange={(e) =>
                      handlePlanChange(index, "JanAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isFebDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.FebPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "FebPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isFebDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.FebAct}
                    onChange={(e) =>
                      handlePlanChange(index, "FebAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isMarDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.MarPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "MarPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isMarDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.MarAct}
                    onChange={(e) =>
                      handlePlanChange(index, "MarAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isAprDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.AprPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "AprPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isAprDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.AprAct}
                    onChange={(e) =>
                      handlePlanChange(index, "AprAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isMayDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.MayPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "MayPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isMayDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.MayAct}
                    onChange={(e) =>
                      handlePlanChange(index, "MayAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isJuneDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.JunPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "JunPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isJuneDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.JunAct}
                    onChange={(e) =>
                      handlePlanChange(index, "JunAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isJulyDisabled}
                    className="inp-new"
                    style={{
                      width: "85%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.JulPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "JulPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isJulyDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.JulAct}
                    onChange={(e) =>
                      handlePlanChange(index, "JulAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isAugDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.AugPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "AugPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isAugDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.AugAct}
                    onChange={(e) =>
                      handlePlanChange(index, "AugAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isSepDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.SeptPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "SeptPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isSepDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.SeptAct}
                    onChange={(e) =>
                      handlePlanChange(index, "SeptAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isOctDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.OctPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "OctPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isOctDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.OctAct}
                    onChange={(e) =>
                      handlePlanChange(index, "OctAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isNovDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.NovPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "NovPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isNovDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.NovAct}
                    onChange={(e) =>
                      handlePlanChange(index, "NovAct", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown2}
                    disabled={disabled || isDecDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.DecPlan}
                    onChange={(e) =>
                      handlePlanChange(index, "DecPlan", e.target.value)
                    }
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isDecDisabled}
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.DecAct}
                    onChange={(e) =>
                      handlePlanChange(index, "DecAct", e.target.value)
                    }
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
                    display: disabled ? "none" : "block",
                  }}
                  onClick={() => handleDeleteRow(index)}
                >
                  <DeleteOutlined
                    style={{ fontSize: "24px", color: "#ff4d4f" }}
                  />
                </td>
              </tr>
            ))}
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddTopic}
              style={{
                backgroundColor: "#E5EEF9",
                border: "none",
                color: "#00308F",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "8px",
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <table style={{ border: "none", borderCollapse: "collapse" }}>
              <tr>
                <td style={{ border: "none" }}>
                  <u>Note:</u> This annual plan can be updated as and when
                  required considering the need and demand by the user
                  department.
                </td>
              </tr>
              <tr>
                <td style={{ border: "none" }}>
                  <u>Legends:</u> Two-digit numbers indicate the date of a
                  particular month; 'P' indicates Plan; 'C' indicates Completed.
                </td>
              </tr>
            </table>
          </div>
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
                QA - Designee Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                QA Manager/ MR Sign & Date
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
                {DetailsByParam?.qaDesigneeStatus ===
                  "QA_DESIGNIEE_SUBMITTED" && (
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
                        <div>{DetailsByParam?.qaDesigneeSign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.qaDesigneeSubmitOn
                          )}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Designee Sign"
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
                  </>
                )}
              </td>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(DetailsByParam?.qaManagerMrStatus ===
                  "QA_MANAGER_MR_APPROVED" ||
                  DetailsByParam?.qaManagerMrStatus ===
                    "QA_MANAGER_MR_REJECTED") && (
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
                        <div>{DetailsByParam?.qaManagerMrSign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.qaManagerMrSubmitOn
                          )}
                        </div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="MR/QA Manager Sign"
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
        formName="TRAINING CALENDAR"
        formatNo="PH-QAD01-F-006"
        sopNo="PH-QAD01-D-15"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth == "QA_MANAGER" || roleauth == "ROLE_MR" ? (
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
                onClick={handleConfirmSubmit}
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

      {/* Unique Param Row*/}
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
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          type="text"
          readOnly
          addonBefore="Updated on Date:"
          className="inp-new"
          value={formattedDate(DetailsByParam?.updatedAt)}
          style={{ width: "30%", height: "35px", marginLeft: "10px" }}
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

      <Modal
        title="Add New Topic"
        open={showModalNewTopic}
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
              if (confirm("Are you sure want to Add the New Topic ??")) {
                handleAddNewTopic();
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
            Training Topic:
          </label>
          <TextArea
            value={nameOfNewTopic}
            onChange={(e) => setNameOfNewTopic(e.target.value)}
            rows={4}
            placeholder="Enter the Name of New Training Topic"
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

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
    </div>
  );
};

export default QA_f06;
