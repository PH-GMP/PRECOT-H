/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Select, Tooltip, Tabs } from "antd";
import { IoSave, IoPrint } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader.js";
import BleachingTail from "../Components/BleachingTail.js";
import { GoArrowLeft } from "react-icons/go";
import "../index.css";
import TextArea from "antd/es/input/TextArea.js";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

import API from "../baseUrl.json";
import { IoCreate } from "react-icons/io5";
import {
  Table,
  Modal,
  DatePicker,
  Form,
  Drawer,
  Menu,
  Avatar,
  Row,
  Col,
} from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import moment from "moment";

const { Option } = Select;
const { TabPane } = Tabs;

function Bleach_f09() {
  const { state } = useLocation();
  //  const { bmrNoParam, subBatchNo } = location.state;
  const { bmrNoParam, subBatchNoParam } = state || {};
  const location = useLocation();
  // const { bmrNoParam, subBatchNoParam } = location.state;
  // console.log("subBatchNoParam", state?.subBatchNoParam);
  // console.log("bmrNoParam", state?.bmrNoParam);
  const [rows, setRows] = useState({});
  const [mixingOptions, setMixingOptions] = useState([]);
  const [formStatus, setFormStatus] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [printStatus, setPrintStatus] = useState(true);
  const [statusLoader, setStatusLoader] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const numberOptions = Array.from({ length: 21 }, (_, index) => 40 + index);
  const [open, setOpen] = useState(false);
  const [lastDateTime, setLastDateTime] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [emptyarraycheck, setEmptyarraycheck] = useState("");
  const [id, setId] = useState("");
  function getTodayDateTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return;
    `${year}/${month}/${day}T${hours}:${minutes}`;
  }
  const [showModal, setShowModal] = useState(false);
  const [maxDateTime, setMaxDateTime] = useState("");
  useEffect(() => {
    setMaxDateTime(getTodayDateTime());
  }, []);

  // useEffect(() => {
  //   const {bmrNoParam,subBatchNoParam} = state || {};

  // })

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // // console.log(subBatchNoParam);

  const role = localStorage.getItem("role");
  // console.log("role",role);

  useEffect(() => {
    const fetchMixingOptions = async () => {
      try {
        // Step 1: Fetching job order number from getMapLaydown API
        const mapLaydownResponse = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMapLaydown?MappingBmr_No=${bmrNoParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (mapLaydownResponse.data.length > 0) {
          const jobOrderNo = mapLaydownResponse.data[0].job_order_no;

          // Step 2: Fetching mixing options based on job order number
          const mixingResponse = await axios.get(
            `${API.prodUrl}/Precot/api/bleaching/generation/getMixingLov?orderNo=${jobOrderNo}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRows((prevState) => ({
            ...prevState,
            mixing: mixingResponse.data[0]?.mix,
          }));
          setMixingOptions(
            mixingResponse.data.map((option) => ({
              label: option.mix,
              value: option.mix,
            }))
          );
        } else {
          console.error("No data found for job order number");
        }
      } catch (error) {
        console.error("Error fetching Mixing options:", error);
      }
    };

    fetchMixingOptions();
  }, [token]);
  useEffect(() => {
    const getLastDate = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleach/getLastSubbatchNo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedDate = response.data[0].START_DATE;
        // console.log("Fetched Data:", fetchedDate);
        setLastDateTime(fetchedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getLastDate();
  }, []);
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

  const formatPlaceholder = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero indexed
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const { bmrNoParam, subBatchNoParam } = state || {};
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleach/bleachequipmentusagelogbookByBatchAndBmr?bmrNumber=${bmrNoParam}&subbatchNo=${subBatchNoParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setId(response.data.equipc_id);
        // console.log("Fetched Data:", response.data);
        if (
          userRole == "ROLE_SUPERVISOR" &&
          (response.data.supervisor_status == "SUPERVISOR_APPROVED" ||
            response.data.hod_status == "HOD_APPROVED" ||
            response.data.hod_status == "DESIGNEE_APPROVED")
        ) {
          setFormStatus(true);
          // console.log("Form status worked for ROLE_SUPERVISOR");
        } else if (
          (userRole == "ROLE_HOD" || userRole == "ROLE_DESIGNEE") &&
          (response.data.hod_status == "HOD_APPROVED" ||
            response.data.hod_status == "DESIGNEE_APPROVED")
        ) {
          setFormStatus(true);
          // console.log("Form status worked for ROLE_HOD or ROLE_DESIGNEE");
        } else {
          // console.log("Form status didn't work:", userRole, rows);
        }

        if (
          !response.data ||
          Object.keys(response.data).length == 0 ||
          response.data.length == 0 ||
          response.data.status === "No Data"
        ) {
          const addRow = {
            stNo: 1,
            formatNo: "PRD01-D-09",
            formatName: "Equipment usage log book - Cake Press",
            sopNumber: "PRD01-D-11",
            bmrNumber: bmrNoParam,
            mixing: "",
            subbatch_no: subBatchNoParam,
            mc_no: "",
            temperature: "",
            start_date: "",
            end_date: "",
            remarks: "",
            supervisor_sign: "",
            hod_sign: "",
            revisionNo: "02",
          };

          setRows(addRow);
        } else {
          setEmptyarraycheck(0);
          setRows(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-09/Summary");
  };

  const handleTabChange = (key) => {
    // console.log("Current Tab:", key);
  };
  const handleTemperatureChange = (value) => {
    setRows((prevRows) => ({ ...prevRows, temperature: value }));
  };
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (new Date(lastDateTime) >= new Date(newStartDate)) {
      message.warning(
        `Start date and time must be after the previous sub-batch. ${moment(
          lastDateTime
        ).format("DD/MM/YYYY HH:mm")}`
      );
      return;
    }
    setRows((prevRows) => ({
      ...prevRows,
      start_date: newStartDate,
      end_date:
        prevRows.end_date &&
        new Date(prevRows.end_date) < new Date(newStartDate)
          ? ""
          : prevRows.end_date,
    }));
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (new Date(newEndDate) >= new Date(rows.start_date)) {
      setRows((prevRows) => ({
        ...prevRows,
        end_date: newEndDate,
      }));
    } else {
      // Optionally, show a message to the user if end_date is before start_date
      messageApi.warning("End date and time must be after start date");
    }
  };

  const canDisplayButtons = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (
        rows?.supervisor_status == "SUPERVISOR_APPROVED" &&
        rows?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (rows?.supervisor_status == "SUPERVISOR_APPROVED" &&
          rows?.hod_status == "WAITING_FOR_APPROVAL") ||
        rows?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        (role === "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
        rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
        rows?.hod_status === "WAITING_FOR_APPROVAL"
      ) {
        // console.log("first")
        return false; // Enable the button
      }
      if (
        rows?.hod_status == "HOD_APPROVED" ||
        rows?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        rows?.hod_status == "HOD_APPROVED" ||
        rows?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (
        rows?.supervisor_status == "SUPERVISOR_APPROVED" &&
        rows?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        rows?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (rows?.hod_status == "WAITING_FOR_APPROVAL" ||
          rows?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        rows?.hod_status == "HOD_APPROVED" ||
        rows?.hod_status == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        rows?.hod_status == "HOD_APPROVED" ||
        rows?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/bleach/approveOrRejectF09`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-09/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/bleach/approveOrRejectF09`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-09/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = rows?.supervisor_sign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [rows, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = rows?.hod_sign;
    if (username) {
      // console.log("usernameparams", username);

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
    }
  }, [rows, API.prodUrl, token]);

  const handleSave = async () => {
    setStatusLoader(true);
    // console.log("subbatch_no before saving:", rows.subbatch_no);
    const payload = {
      stNo: 1,
      formatNo: "PRD01-D-09",
      formatName: "Equipment usage log book - Cake Press",
      sopNumber: "PRD01-D-11",
      bmrNumber: rows.bmrNumber,
      revisionNo: rows.revisionNo || "",
      remarks: rows.remarks || "N/A",
      mixing: rows.mixing,
      subbatch_no: rows.subbatch_no,
      mc_no: rows.mc_no || "",
      temperature: rows.temperature || "",
      start_date: rows.start_date || "",
      end_date: rows.end_date || "",
      mail_status: rows.mail_status || "",
      supervisor_status: rows.supervisor_status || "",
      supervisor_saved_on: rows.supervisor_saved_on || "",
      supervisor_saved_by: rows.supervisor_saved_by || "",
      supervisor_saved_id: rows.supervisor_saved_id || "",
      supervisor_submit_on: rows.supervisor_submit_on || null,
      supervisor_submit_by: rows.supervisor_submit_by || "",
      supervisor_submit_id: rows.supervisor_submit_id || "",
      supervisor_sign: rows.supervisor_sign || "",
      hod_status: rows.hod_status || "",
      hod_saved_on: rows.hod_saved_on || null,
      hod_saved_by: rows.hod_saved_by || "",
      hod_saved_id: rows.hod_saved_id || "",
      hod_submit_on: rows.hod_submit_on || null,
      hod_submit_by: rows.hod_submit_by || "",
      hod_submit_id: rows.hod_submit_id || "",
      hod_sign: rows.hod_sign || "",
      equipc_id: rows.equipc_id || "",
    };

    // console.log("payload", payload);

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/bleach/saveEquipmentUsagelogbookCakepressF09`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        messageApi.success("Data saved successfully!");

        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Bleaching/F-09/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      if (error.response && error.response.data.message) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("An error occurred while saving data.");
      }
    }
  };

  const handleSubmit = async () => {
    setStatusLoader(true);
    const payload = {
      bmrNumber: rows.bmrNumber,
      formatNo: rows.formatNo,
      formatName: rows.formatName,
      sopNumber: rows.sopNumber,
      revisionNo: rows.revisionNo || "",
      remarks: rows.remarks || "N/A",
      mixing: rows.mixing,
      subbatch_no: rows.subbatch_no,
      mc_no: rows.mc_no,
      temperature: rows.temperature,
      start_date: rows.start_date || "",
      end_date: rows.end_date || "",
      mail_status: rows.mail_status || "",
      supervisor_status: rows.supervisor_status || "",
      supervisor_saved_on: rows.supervisor_saved_on || "",
      supervisor_saved_by: rows.supervisor_saved_by || "",
      supervisor_saved_id: rows.supervisor_saved_id || "",
      supervisor_submit_on: rows.supervisor_submit_on,
      supervisor_submit_by: rows.supervisor_submit_by || "",
      supervisor_submit_id: rows.supervisor_submit_id || "",
      supervisor_sign: rows.supervisor_sign || "",
      hod_status: rows.hod_status || "",
      hod_saved_on: rows.hod_saved_on || "",
      hod_saved_by: rows.hod_saved_by || "",
      hod_saved_id: rows.hod_saved_id || "",
      hod_submit_on: rows.hod_submit_on,
      hod_submit_by: rows.hod_submit_by || "",
      hod_submit_id: rows.hod_submit_id || "",
      hod_sign: rows.hod_sign,
    };
    // console.log("id", rows.equipc_id);
    if (rows.equipc_id) {
      payload.equipc_id = rows.equipc_id;
    }
    // console.log("payload", payload);

    let isValid = true;
    if (rows.mixing == "") {
      messageApi.open({
        type: "warning",
        content: "Mixing Field is Required",
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }

    if (rows.mc_no == "") {
      messageApi.open({
        type: "warning",
        content: "MC No Field is Required",
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }
    if (rows.temperature == "") {
      messageApi.open({
        type: "warning",
        content: "Temparature Field is Required",
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }
    if (rows.start_date == "") {
      messageApi.open({
        type: "warning",
        content: "Start Date and Time Required",
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }
    if (rows.end_date == "") {
      messageApi.open({
        type: "warning",
        content: "End Date And Time Required",
      });
      setStatusLoader(false);
      isValid = false;
      return;
    }

    if (!isValid) {
      setStatusLoader(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/bleach/submitEquipmentUsagelogbookCakepressF09`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        messageApi.success("Data Submitted successfully!");
        setFormStatus(true);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Bleaching/F-09/Summary");
        }, 1000);
      }
    } catch (error) {
      setStatusLoader(false);
      console.error("Error saving data:", error);
      messageApi.error(error.response.data.message);
    }
  };

  const handleRemarksChange = (e) => {
    setRows((prevRows) => ({ ...prevRows, remarks: e.target.value }));
  };

  const items = [
    { key: "1", label: "0.3" },
    { key: "2", label: "0.4" },
    { key: "3", label: "0.5" },
    { key: "4", label: "0.6" },
    { key: "5", label: "0.7" },
  ];

  const itemsMc = [
    { key: "1", label: "01" },
    { key: "2", label: "02" },
  ];

  return (
    <div
      className="form09-div"
      style={{ letterSpacing: "0.4px", fontSize: "14px!important" }}
    >
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            role === "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      {contextHolder}
      <div className="bleachHeaderPrint">
        <BleachingHeader
          formName={"EQUIPMENT USAGE LOGBOOK - CAKE PRESS"}
          formatNo={"PH-PRD01/F-006"}
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
                  loading={statusLoader}
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
                  loading={statusLoader}
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
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Equipment Usage Log" key="1">
          <div className="table-container">
            <table
              className="logbook-table"
              style={{
                width: "90%",
                marginTop: "5px",
                borderCollapse: "collapse",
                letterSpacing: "0.4px",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ letterSpacing: "0.4px", fontSize: "14px" }}>
                  <th
                    style={{
                      height: "40px",
                      fontWeight: "bold",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      border: "1px solid black",
                    }}
                  >
                    S.No
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    BMR No
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    Mixing
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    Sub Batch No
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    M/C No
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    Temperature in °C <br></br>(40 to 60)
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    Start date & Time
                  </th>
                  <th
                    style={{
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    End date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  >
                    1
                  </td>
                  <td
                    className="form-09"
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                    disabled={
                      (role === "ROLE_SUPERVISOR" &&
                        rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
                        rows?.hod_status === "WAITING_FOR_APPROVAL") ||
                      rows?.hod_status === "HOD_APPROVED" ||
                      role === "ROLE_HOD" ||
                      (role === "ROLE_DESIGNEE" && emptyarraycheck === 0) ||
                      (role === "ROLE_HOD" &&
                        (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                          rows?.hod_status === "HOD_APPROVED" ||
                          rows?.hod_status === "HOD_REJECTED")) ||
                      (role === "ROLE_DESIGNEE" &&
                        (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                          rows?.hod_status === "HOD_APPROVED" ||
                          rows?.hod_status === "HOD_REJECTED"))
                    }
                  >
                    {rows.bmrNumber}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  >
                    <Select
                      style={{ width: "100%", fontSize: "14px" }}
                      value={rows.mixing}
                      className="custom-select"
                      showSearch
                      // disabled={formStatus}
                      onChange={(value) =>
                        setRows((prevRows) => ({ ...prevRows, mixing: value }))
                      }
                      dropdownStyle={{ border: "none" }}
                      disabled={
                        (role === "ROLE_SUPERVISOR" &&
                          rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
                          rows?.hod_status === "WAITING_FOR_APPROVAL") ||
                        rows?.hod_status === "HOD_APPROVED" ||
                        role === "ROLE_HOD" ||
                        (role === "ROLE_DESIGNEE" && emptyarraycheck === 0) ||
                        (role === "ROLE_HOD" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED")) ||
                        (role === "ROLE_DESIGNEE" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED"))
                      }
                    >
                      {mixingOptions.map((option) => (
                        <Option
                          key={option.value}
                          value={option.value}
                          style={{ fontSize: "14px" }}
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td
                    className="form-09"
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontWeight: "normal",
                    }}
                    disabled={
                      (role === "ROLE_SUPERVISOR" &&
                        rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
                        rows?.hod_status === "WAITING_FOR_APPROVAL") ||
                      rows?.hod_status === "HOD_APPROVED" ||
                      role === "ROLE_HOD" ||
                      (role === "ROLE_DESIGNEE" && emptyarraycheck === 0) ||
                      (role === "ROLE_HOD" &&
                        (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                          rows?.hod_status === "HOD_APPROVED" ||
                          rows?.hod_status === "HOD_REJECTED")) ||
                      (role === "ROLE_DESIGNEE" &&
                        (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                          rows?.hod_status === "HOD_APPROVED" ||
                          rows?.hod_status === "HOD_REJECTED"))
                    }
                  >
                    {rows.subbatch_no}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontWeight: "normal",
                    }}
                  >
                    <Select
                      style={{ width: "100%" }}
                      value={rows.mc_no || "M/C No"}
                      className="custom-select"
                      showSearch
                      // disabled={formStatus}
                      onChange={(value) =>
                        setRows((prevRows) => ({ ...prevRows, mc_no: value }))
                      }
                      disabled={
                        (role === "ROLE_SUPERVISOR" &&
                          rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
                          rows?.hod_status === "WAITING_FOR_APPROVAL") ||
                        rows?.hod_status === "HOD_APPROVED" ||
                        role === "ROLE_HOD" ||
                        (role === "ROLE_DESIGNEE" && emptyarraycheck === 0) ||
                        (role === "ROLE_HOD" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED")) ||
                        (role === "ROLE_DESIGNEE" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED"))
                      }
                    >
                      {itemsMc.map((option) => (
                        <Option key={option.key} value={option.label}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  >
                    <Select
                      style={{ width: "100%" }}
                      // disabled={formStatus}
                      value={rows.temperature || "Select Temp"}
                      onChange={handleTemperatureChange}
                      disabled={
                        (role === "ROLE_SUPERVISOR" &&
                          rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
                          rows?.hod_status === "WAITING_FOR_APPROVAL") ||
                        rows?.hod_status === "HOD_APPROVED" ||
                        role === "ROLE_HOD" ||
                        (role === "ROLE_DESIGNEE" && emptyarraycheck === 0) ||
                        (role === "ROLE_HOD" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED")) ||
                        (role === "ROLE_DESIGNEE" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED"))
                      }
                    >
                      {numberOptions.map((number) => (
                        <Option key={number} value={number}>
                          {number}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  >
                    <input
                      type="datetime-local"
                      onChange={handleStartDateChange}
                      pattern="\d{4}/\d{2}-\d{2}T\d{2}:\d{2}"
                      value={rows.start_date}
                      placeholder="dd/mm/yyyy"
                      max={new Date().toISOString().slice(0, 16)}
                      onKeyDown={(e) => e.preventDefault()} 
                      disabled={
                        (role === "ROLE_SUPERVISOR" &&
                          rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
                          rows?.hod_status === "WAITING_FOR_APPROVAL") ||
                        rows?.hod_status === "HOD_APPROVED" ||
                        role === "ROLE_HOD" ||
                        (role === "ROLE_DESIGNEE" && emptyarraycheck === 0) ||
                        (role === "ROLE_HOD" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED")) ||
                        (role === "ROLE_DESIGNEE" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED"))
                      }
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                    disabled
                  >
                    <input
                      type="datetime-local"
                      value={rows.end_date}
                      onChange={handleEndDateChange}
                      pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}"
                      min={rows.start_date}
                      onKeyDown={(e) => e.preventDefault()} 
                      
                      placeholder={formatPlaceholder()}
                      // max={maxDateTime}
                      disabled={
                        (role === "ROLE_SUPERVISOR" &&
                          rows?.supervisor_status === "SUPERVISOR_APPROVED" &&
                          rows?.hod_status === "WAITING_FOR_APPROVAL") ||
                        rows?.hod_status === "HOD_APPROVED" ||
                        role === "ROLE_HOD" ||
                        (role === "ROLE_DESIGNEE" && emptyarraycheck === 0) ||
                        (role === "ROLE_HOD" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED")) ||
                        (role === "ROLE_DESIGNEE" &&
                          (rows?.hod_status === "WAITING_FOR_APPROVAL" ||
                            rows?.hod_status === "HOD_APPROVED" ||
                            rows?.hod_status === "HOD_REJECTED"))
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Remarks" key="2">
          <div className="table-container">
            <table
              className="logbook-table"
              style={{
                width: "50%",
                marginTop: "5px",
                borderCollapse: "collapse",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      height: "40px",
                      fontWeight: "bold",
                      padding: "3px",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="form-09"
                    style={{
                      height: "80px",
                      borderTop: "1px solid black",
                      fontWeight: "bold",
                      padding: "3px",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  >
                    <textarea
                      className="form-09"
                      style={{
                        resize: "none",
                        width: "100%",
                        height: "100%",
                        outline: "none",
                        border: "none",
                      }}
                      value={rows.remarks}
                      onChange={handleRemarksChange}
                      readOnly={formStatus}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Signatures" key="3">
          <div className="table-container">
            <table
              className="logbook-table"
              style={{
                width: "50%",
                marginTop: "5px",
                borderCollapse: "collapse",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      height: "40px",
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    Performed by Prod.Supervisor
                    <br /> Date & Sign
                  </th>
                  <th
                    style={{
                      height: "40px",
                      fontWeight: "bold",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                    }}
                  >
                    Reviewed by HOD/ Designee
                    <br /> Date & Sign
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="signature"
                    id="form-09"
                    style={{
                      height: "50px",
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      textAlign: "center",
                      fontWeight: "normal",
                    }}
                  >
                    {rows.supervisor_status === "SUPERVISOR_APPROVED" && (
                      <>
                        {rows.supervisor_sign}
                        <br></br>
                        {formatDate(rows.supervisor_submit_on)}
                        <br />
                        {getImage !== "" && (
                          <img
                            className="signature"
                            src={getImage}
                            alt="Supervisor"
                          />
                        )}
                      </>
                    )}
                  </td>
                  <td
                    className="signature"
                    id="form-09"
                    style={{
                      border: "1px solid black",
                      letterSpacing: "0.4px",
                      fontSize: "14px",
                      textAlign: "center",
                      fontWeight: "normal",
                    }}
                  >
                    {(rows.hod_status === "HOD_APPROVED" ||
                      rows.hod_status === "HOD_REJECTED") && (
                      <>
                        {rows.hod_sign}
                        <br></br>
                        {formatDate(rows.hod_submit_on)}
                        <br />
                        {getImage1 !== "" && (
                          <img
                            className="signature"
                            src={getImage1}
                            alt="HOD"
                          />
                        )}
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Bleach_f09;
