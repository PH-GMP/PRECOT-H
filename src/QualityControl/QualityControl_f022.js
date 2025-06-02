import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Tabs,
  Select,
  Tooltip,
  message,
  Modal,
  TimePicker,
} from "antd";
import { DatePicker } from "antd";
import { TbMenuDeep } from "react-icons/tb";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { BiFontSize, BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import PrecotSidebar from "../Components/PrecotSidebar";
import rejectIcon from "../Assests/outlined-reject.svg";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import moment from "moment";
const { Option } = Select;

const QualityControl_f022 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uniqueDate } = location.state || {};
  const token = localStorage.getItem("token");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [mainID, setMainID] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    date: uniqueDate,
    mediaName: "SCDA, SDA,VJ, BGA, Mac.Con., VRBA, CITRI",
    usedForTesting: "",
    loadno: "",
    disposedDate: "",
    autoclaveFrom: "",
    autoclaveTo: "",
    tempc: "",
    tempmin: "",
    Discarded: "",
    remarks: "",

    date2: uniqueDate,
    mediaName2: "SCDA, SDA,VJ, BGA, Mac.Con., VRBA, CITRI",
    usedForTesting2: "",
    loadno2: "",
    disposedDate2: "",
    autoclaveFrom2: "",
    autoclaveTo2: "",
    tempc2: "",
    tempmin2: "",
    Discarded2: "",
    remarks2: "",

    date3: uniqueDate,
    mediaName3: "SCDA, SDA,VJ, BGA, Mac.Con., VRBA, CITRI",
    usedForTesting3: "",
    loadno3: "",
    disposedDate3: "",
    autoclaveFrom3: "",
    autoclaveTo3: "",
    tempc3: "",
    tempmin3: "",
    Discarded3: "",
    remarks3: "",
  });

  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
    console.log(field, value); // For debugging
  };

  // getdata
  useEffect(() => {
    console.log(" uniqueEqNo, uniqueDate", uniqueDate, formValues.date);
    if (!initialized.current) {
      initialized.current = true;
      const date = formValues.date;
      axios
        .get(`${ API.prodUrl}/Precot/api/chemicaltest/CLF022?year=${date}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const data = response.data[0];
            setMainID(response.data[0].test_id);
            setSelectedRow(response.data[0]);

            const username = response.data[0]?.micro_sign;
            console.log("username", username);
            //getImage
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

            const username2 = response.data[0]?.qc_submit_by;
            console.log("username", username2);
            //getImage

            axios
              .get(
                `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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

            if (
              roleauth === "QA_MANAGER" ||
              roleauth === "QC_MANAGER" ||
              roleauth === "MICRO_DESIGNEE"
            ) {
              if (
                (response.data[0]?.micro_status === "MICROBIOLOGIST_APPROVED" &&
                  response.data[0]?.qc_status === "QC_REJECTED") ||
                (response.data[0]?.micro_status === "MICROBIOLOGIST_APPROVED" &&
                  response.data[0]?.qc_status === "QA_REJECTED") ||
                (response.data[0]?.micro_status === "MICROBIOLOGIST_APPROVED" &&
                  response.data[0]?.qc_status === "MICRO_DESIGNEE_REJECTED")
              ) {
                message.warning("Microbiologist Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-022/Summary");
                }, 1500);
              }
            }

            setFormValues({
              date: data.testDate || uniqueDate,
              mediaName: data.nameofMedia,
              usedForTesting: data.usedForTesting || "",
              loadno: data.loadNumber || "",
              disposedDate: data.disposedDate || "",
              autoclaveFrom: data.autoclaveRunningTime || "",
              autoclaveTo: data.autoclaveRunningTime_to || "",
              tempc: data.temperatureInCelsius || "",
              tempmin: data.timeInMinutes || "",
              Discarded: data.discardedBy || "",
              remarks: data.remarks || "",

              mediaName2: data.nameofMedia_c,
              usedForTesting2: data.usedForTesting_c || "",
              loadno2: data.loadNumber_c || "",
              disposedDate2: data.disposedDate_c || "",
              autoclaveFrom2: data.autoclaveRunningTime_c || "",
              autoclaveTo2: data.autoclaveRunningTime_c_to || "",
              tempc2: data.temperatureInCelsius_c || "",
              tempmin2: data.timeInMinutes_c || "",
              Discarded2: data.discardedBy_c || "",
              remarks2: data.remarks_c || "",

              mediaName3: data.nameofMedia_d,
              usedForTesting3: data.usedForTesting_d || "",
              loadno3: data.loadNumber_d || "",
              disposedDate3: data.disposedDate_d || "",
              autoclaveFrom3: data.autoclaveRunningTime_d || "",
              autoclaveTo3: data.autoclaveRunningTime_d_to || "",
              tempc3: data.temperatureInCelsius_d || "",
              tempmin3: data.timeInMinutes_d || "",
              Discarded3: data.discardedBy_d || "",
              remarks3: data.remarks_d || "",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching form data by date:", error);
        });
    }
  }, [uniqueDate]);

  const handleSave = async () => {
    console.log("mainID", mainID);

    const payload = {
      test_id: mainID || "",
      format: "Media Disposal Record",
      unit: "Unit H",
      format_no: "PH-QCL01/F-022",
      ref_sop_no: "PH-QCL01-D-13",
      revision_no: "02",
      testDate: formValues.date,
      nameofMedia: formValues.mediaName,
      usedForTesting: formValues.usedForTesting,
      loadNumber: formValues.loadno,
      disposedDate: formValues.disposedDate,
      autoclaveRunningTime: formValues.autoclaveFrom,
      autoclaveRunningTime_to: formValues.autoclaveTo,
      discardedBy: formValues.Discarded, // Replace with actual data if available
      temperatureInCelsius: parseFloat(formValues.tempc),
      timeInMinutes: formValues.tempmin,
      remarks: formValues.remarks,

      nameofMedia_c: formValues.mediaName2,
      usedForTesting_c: formValues.usedForTesting2,
      loadNumber_c: formValues.loadno2,
      disposedDate_c: formValues.disposedDate2,
      autoclaveRunningTime_c: formValues.autoclaveFrom2,
      autoclaveRunningTime_c_to: formValues.autoclaveTo2,
      discardedBy_c: formValues.Discarded2,
      temperatureInCelsius_c: parseFloat(formValues.tempc2),
      timeInMinutes_c: formValues.tempmin2,
      remarks_c: formValues.remarks2,

      nameofMedia_d: formValues.mediaName3,
      usedForTesting_d: formValues.usedForTesting3,
      loadNumber_d: formValues.loadno3,
      disposedDate_d: formValues.disposedDate3,
      autoclaveRunningTime_d: formValues.autoclaveFrom3,
      autoclaveRunningTime_d_to: formValues.autoclaveTo3,
      discardedBy_d: formValues.Discarded3,
      temperatureInCelsius_d: parseFloat(formValues.tempc3),
      timeInMinutes_d: formValues.tempmin3,
      remarks_d: formValues.remarks3,
    };
    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/chemicaltest/CLF022/save/media`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Media Disposal Record saved successfully!");
      console.log("Save successful:", response.data);
      setSaveLoading(false);

      navigate("/Precot/QualityControl/F-022/Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("Error saving the form:", error);
      message.warning("There was an error saving the form.");
    }
  };

  const handleSubmit = async () => {
    console.log("mainID", mainID);

    // Define required fields
    const requiredFields = [
      formValues.date,
      formValues.mediaName,
      formValues.usedForTesting,
      formValues.loadno,
      formValues.disposedDate,
      formValues.autoclaveFrom,
      formValues.autoclaveTo,
      formValues.Discarded,
      formValues.tempc,
      formValues.tempmin,

      formValues.mediaName2,
      formValues.usedForTesting2,
      formValues.loadno2,
      formValues.disposedDate2,
      formValues.autoclaveFrom2,
      formValues.autoclaveTo2,
      formValues.Discarded2,
      formValues.tempc2,
      formValues.tempmin2,

      formValues.mediaName3,
      formValues.usedForTesting3,
      formValues.loadno3,
      formValues.disposedDate3,
      formValues.autoclaveFrom3,
      formValues.autoclaveTo3,
      formValues.Discarded3,
      formValues.tempc3,
      formValues.tempmin3,
    ];

    // Check for empty required fields
    const isAnyFieldEmpty = requiredFields.some(
      (field) => !field || field === ""
    );

    if (isAnyFieldEmpty) {
      message.warning("Please fill in all mandatory fields before submitting.");
      return; // Exit the function if any field is empty
    }

    const payload = {
      test_id: mainID || "",
      format: "Media Disposal Record",
      unit: "Unit H",
      format_no: "PH-QCL01/F-022",
      ref_sop_no: "PH-QCL01-D-13",
      revision_no: "02",

      testDate: formValues.date,
      nameofMedia: formValues.mediaName,
      usedForTesting: formValues.usedForTesting,
      loadNumber: formValues.loadno,
      disposedDate: formValues.disposedDate,
      autoclaveRunningTime: formValues.autoclaveFrom,
      autoclaveRunningTime_to: formValues.autoclaveTo,
      discardedBy: formValues.Discarded, // Replace with actual data if available
      temperatureInCelsius: parseFloat(formValues.tempc),
      timeInMinutes: formValues.tempmin,
      remarks: formValues.remarks || "NA",

      nameofMedia_c: formValues.mediaName2,
      usedForTesting_c: formValues.usedForTesting2,
      loadNumber_c: formValues.loadno2,
      disposedDate_c: formValues.disposedDate2,
      autoclaveRunningTime_c: formValues.autoclaveFrom2,
      autoclaveRunningTime_c_to: formValues.autoclaveTo2,
      discardedBy_c: formValues.Discarded2,
      temperatureInCelsius_c: parseFloat(formValues.tempc2),
      timeInMinutes_c: formValues.tempmin2,
      remarks_c: formValues.remarks2 || "NA",

      nameofMedia_d: formValues.mediaName3,
      usedForTesting_d: formValues.usedForTesting3,
      loadNumber_d: formValues.loadno3,
      disposedDate_d: formValues.disposedDate3,
      autoclaveRunningTime_d: formValues.autoclaveFrom3,
      autoclaveRunningTime_d_to: formValues.autoclaveTo3,
      discardedBy_d: formValues.Discarded3,
      temperatureInCelsius_d: parseFloat(formValues.tempc3),
      timeInMinutes_d: formValues.tempmin3,
      remarks_d: formValues.remarks3,
    };
    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/chemicaltest/CLF022/submit/media`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Media Disposal Record saved successfully!");
      console.log("Save successful:", response.data);
      setSaveLoading(false);

      navigate("/Precot/QualityControl/F-022/Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("Error saving the form:", error);
      message.warning("There was an error saving the form.");
      navigate("/Precot/QualityControl/F-022/Summary");
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/chemicaltest/CLF022/approval`,
        {
          id: mainID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("res in approve", res);
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-022/Summary");
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

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleReject = async () => {
    setSubmitLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/chemicaltest/CLF022/approval`,
        {
          id: mainID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage reject", res.data.message);
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-022/Summary");
      })
      .catch((err) => {
        // console.log("Err in reject", err.response.data.message);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const canEdit = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      return !(
        (selectedRow.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.qc_status === "QC_APPROVED") ||
        (selectedRow.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.qc_status === "QA_APPROVED")
      );
    } else if (roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER") {
      return !(
        (selectedRow &&
          selectedRow.micro_status === "MICROBIOLOGIST_APPROVED" &&
          (selectedRow.qc_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.qc_status === "QC_REJECTED" ||
            selectedRow.qc_status === "QC_APPROVED" ||
            selectedRow.qc_status === "QA_REJECTED" ||
            selectedRow.qc_status === "QA_APPROVED")) ||
        selectedRow.micro_status === "MICROBIOLOGIST_SAVED"
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED")
      ) {
        return "block";
      }
    } else if (roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER") {
      if (
        selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
        selectedRow?.qc_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        selectedRow.micro_status === "MICROBIOLOGIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  let formattedMicroDate;
  if (selectedRow.micro_submit_on) {
    formattedMicroDate = moment(selectedRow.micro_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedManagerDate;
  if (selectedRow.qc_submit_on) {
    formattedManagerDate = moment(selectedRow.qc_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedManagerDate = ""; // Or any other default value or error handling
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-022/Summary");
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Media Disposal Record Details</b>
        </p>
      ),
      children: (
        <div>
          <div style={{ display: "flex", gap: "20px" }}></div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
              marginLeft: "35px",

              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Tested Date
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Name of the Media
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Used for testing
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Load number
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Disposed Date
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Autoclave running time (From)
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Autoclave running time (To)
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={1}
                  colSpan={2}
                >
                  Setting for Discarding Autoclave
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Discarded by
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={2}
                >
                  Remarks
                </th>
              </tr>
              <tr>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={1}
                >
                  Temp in °C
                </th>
                <th
                  style={{ padding: "10px", textAlign: "center" }}
                  rowSpan={1}
                >
                  Time in min
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {formatDate(formValues.date)}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TextArea
                    disabled={!isEditable}
                    type="text"
                    value={formValues.mediaName}
                    style={{ width: "150px" }}
                    onChange={(e) =>
                      handleInputChange("mediaName", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Select
                    disabled={!isEditable}
                    value={formValues.usedForTesting}
                    style={{ width: "100px" }}
                    onChange={(value) =>
                      handleInputChange("usedForTesting", value)
                    }
                  >
                    <Option value="TVC">TVC</Option>
                    <Option value="TFC">TFC</Option>
                    <Option value="Pathogens">Pathogens</Option>
                  </Select>
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.loadno}
                    style={{ width: "150px" }}
                    onChange={(e) =>
                      handleInputChange("loadno", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="date"
                    value={formValues.disposedDate}
                    style={{ width: "120px" }}
                    onChange={(e) =>
                      handleInputChange("disposedDate", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TimePicker
                    disabled={!isEditable}
                    value={
                      formValues.autoclaveFrom
                        ? moment(formValues.autoclaveFrom, "HH:mm")
                        : null
                    }
                    style={{ width: "80px" }}
                    onChange={(time, timeString) =>
                      handleInputChange("autoclaveFrom", timeString)
                    }
                    format="HH:mm"
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TimePicker
                    disabled={!isEditable}
                    value={
                      formValues.autoclaveTo
                        ? moment(formValues.autoclaveTo, "HH:mm")
                        : null
                    }
                    style={{ width: "80px" }}
                    onChange={(time, timeString) =>
                      handleInputChange("autoclaveTo", timeString)
                    }
                    format="HH:mm"
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    step="0.01"
                    min={0}
                    value={formValues.tempc}
                    style={{ width: "80px" }}
                    onChange={(e) => handleInputChange("tempc", e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    type="number"
                    disabled={!isEditable}
                    value={formValues.tempmin}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleInputChange("tempmin", e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.Discarded}
                    onChange={(e) =>
                      handleInputChange("Discarded", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.remarks}
                    onChange={(e) =>
                      handleInputChange("remarks", e.target.value)
                    }
                  />
                </td>
              </tr>

              {/* Second Row */}
              <tr>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {formatDate(formValues.date)}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TextArea
                    disabled={!isEditable}
                    type="text"
                    value={formValues.mediaName2}
                    onChange={(e) =>
                      handleInputChange("mediaName2", e.target.value)
                    }
                    style={{ width: "150px" }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Select
                    disabled={!isEditable}
                    value={formValues.usedForTesting2}
                    onChange={(value) =>
                      handleInputChange("usedForTesting2", value)
                    }
                    style={{ width: "100px" }}
                  >
                    <Option value="TVC">TVC</Option>
                    <Option value="TFC">TFC</Option>
                    <Option value="Pathogens">Pathogens</Option>
                  </Select>
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.loadno2}
                    style={{ width: "150px" }}
                    onChange={(e) =>
                      handleInputChange("loadno2", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="date"
                    value={formValues.disposedDate2}
                    style={{ width: "120px" }}
                    onChange={(e) =>
                      handleInputChange("disposedDate2", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TimePicker
                    disabled={!isEditable}
                    value={
                      formValues.autoclaveFrom2
                        ? moment(formValues.autoclaveFrom2, "HH:mm")
                        : null
                    }
                    onChange={(time, timeString) =>
                      handleInputChange("autoclaveFrom2", timeString)
                    }
                    style={{ width: "80px" }}
                    format="HH:mm"
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TimePicker
                    disabled={!isEditable}
                    value={
                      formValues.autoclaveTo2
                        ? moment(formValues.autoclaveTo2, "HH:mm")
                        : null
                    }
                    style={{ width: "80px" }}
                    onChange={(time, timeString) =>
                      handleInputChange("autoclaveTo2", timeString)
                    }
                    format="HH:mm"
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    step="0.01"
                    min={0}
                    value={formValues.tempc2}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleInputChange("tempc2", e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    type="number"
                    disabled={!isEditable}
                    value={formValues.tempmin2}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleInputChange("tempmin2", e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.Discarded2}
                    onChange={(e) =>
                      handleInputChange("Discarded2", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.remarks2}
                    onChange={(e) =>
                      handleInputChange("remarks2", e.target.value)
                    }
                  />
                </td>
              </tr>

              {/* third row */}
              <tr>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {formatDate(formValues.date)}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TextArea
                    disabled={!isEditable}
                    type="text"
                    value={formValues.mediaName3}
                    onChange={(e) =>
                      handleInputChange("mediaName3", e.target.value)
                    }
                    style={{ width: "150px" }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Select
                    disabled={!isEditable}
                    value={formValues.usedForTesting3}
                    onChange={(value) =>
                      handleInputChange("usedForTesting3", value)
                    }
                    style={{ width: "100px" }}
                  >
                    <Option value="TVC">TVC</Option>
                    <Option value="TFC">TFC</Option>
                    <Option value="Pathogens">Pathogens</Option>
                  </Select>
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.loadno3}
                    style={{ width: "150px" }}
                    onChange={(e) =>
                      handleInputChange("loadno3", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="date"
                    value={formValues.disposedDate3}
                    style={{ width: "120px" }}
                    onChange={(e) =>
                      handleInputChange("disposedDate3", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TimePicker
                    disabled={!isEditable}
                    value={
                      formValues.autoclaveFrom3
                        ? moment(formValues.autoclaveFrom3, "HH:mm")
                        : null
                    }
                    onChange={(time, timeString) =>
                      handleInputChange("autoclaveFrom3", timeString)
                    }
                    style={{ width: "80px" }}
                    format="HH:mm"
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <TimePicker
                    disabled={!isEditable}
                    value={
                      formValues.autoclaveTo3
                        ? moment(formValues.autoclaveTo3, "HH:mm")
                        : null
                    }
                    style={{ width: "80px" }}
                    onChange={(time, timeString) =>
                      handleInputChange("autoclaveTo3", timeString)
                    }
                    format="HH:mm"
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    step="0.01"
                    min={0}
                    value={formValues.tempc3}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleInputChange("tempc3", e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    type="number"
                    disabled={!isEditable}
                    value={formValues.tempmin3}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleInputChange("tempmin3", e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.Discarded3}
                    onChange={(e) =>
                      handleInputChange("Discarded3", e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.remarks3}
                    onChange={(e) =>
                      handleInputChange("remarks3", e.target.value)
                    }
                  />
                </td>
              </tr>

              <tr>
                <td
                  colSpan={11}
                  style={{ padding: "10px", textAlign: "start" }}
                >
                  Note: Soybean Casein Digest Agar [SCDA], Sabouraud Dextrose
                  Agar (SDA), Violet Red Bile Agar (VRBA), Mac-Conkey Agar (
                  Mac.Con. ), Vogel- Johnson Agar Base( VJ), Brilliant Green
                  Agar [BGA], Cetrimide Agar( Citri), Burkholderia Cepacia
                  selective agar [BCSA]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          <b> Reviews </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Created by Microbiologist Sign & Date</b>
              </td>

              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Verified by QC/QA Manager Sign & Date</b>
              </td>
            </tr>
            <tr style={{ height: "35px" }}>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.micro_sign}
                    <br />
                    {formattedMicroDate}
                  </>
                )}
              </td>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {(selectedRow?.qc_status === "QC_REJECTED" ||
                  selectedRow?.qc_status === "QC_APPROVED" ||
                  selectedRow?.qc_status === "QA_REJECTED" ||
                  selectedRow?.qc_status === "QA_APPROVED") && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        getImage2
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.qc_submit_by}
                    <br />
                    {formattedManagerDate}
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
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Media Disposal Record"
        formatNo="PH-QCL01/F-022"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER" ? (
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
                icon={
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                }
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
                  display: canDisplayButtonSave(),
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
                  // display: submitBtnStatus ? "block" : "none",
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
    </>
  );
};

export default QualityControl_f022;
