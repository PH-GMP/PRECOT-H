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
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader.js";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment, { max } from "moment";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f007 = () => {
  const formatName = "WEIGHING SCALE CALIBRATION REPORT";
  const formatNo = "PH-QCL01/F-007";
  const revisionNo = 1;
  const refSopNo = "PH-QCL01-D-04";
  const unit = "unit-H";

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { formNo, formId, equipment, date } = location.state;
  // const { date,equipment} = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [planId, setplanId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const monthIndex = dateObject.getMonth();
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
  const monthName = monthNames[monthIndex];
  const [rows, setRows] = useState([{}]);

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const [maxWeight, setMaxWeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [tolerance, setTolerance] = useState("");
  const [customTextmax, setCustomTextmax] = useState("");
  const [customTextmin, setCustomTextmin] = useState("");
  const [customTexttolerance, setCustomTexttolerance] = useState("");

  const handleMaxWeightChange = (value) => {
    setMaxWeight(value);
    if (value === "Other") {
      setCustomTextmax("");
    }
  };
  const handleMinWeightChange = (value) => {
    setMinWeight(value);
    if (value === "Other") {
      setCustomTextmin("");
    }
  };
  const handleToleranceChange = (value) => {
    setTolerance(value);
    if (value === "Other") {
      setCustomTexttolerance("");
    }
  };

  // Initialize state with the array of objects
  const [obser, setObser] = useState([
    {
      id: "",
      // standard_weight: "",
      test_lov: "",
      number_a: "",
      number_b: "",
      remark: "",
      status: "",
      s_no: "001",
      // calibrated_by: "John Doe",
      // verified_by: "Jane Smith",
      // lab_id: 1001,
    },
  ]);

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...obser];
    updatedRows[index][field] = value;
    setObser(updatedRows);
  };

  const maxWeightLov = [
    { id: 1, value: "220g" },
    { id: 2, value: "820g" },
    { id: 3, value: "300g" },
  ];
  const minWeightLov = [
    { id: 1, value: "0.001g" },
    { id: 2, value: "0.01g" },
    { id: 3, value: "0.005g" },
    { id: 3, value: "0.1g" },
  ];

  const toleranceLov = [
    { id: 1, value: "0.0003g" },
    { id: 2, value: "0.06g " },
    { id: 3, value: "0.03" },
  ];

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [planingDetailsByDate,      API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [planingDetailsByDate,      API.prodUrl, token]);

  const roleauth = localStorage.getItem("role");

  const disabled =
    (roleauth === "ROLE_SUPERVISOR" &&
      planingDetailsByDate?.supervisor_status === "SUPERVISOR_APPROVED" &&
      planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL") ||
    planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
    (roleauth === "ROLE_HOD" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED")) ||
    (roleauth === "ROLE_DESIGNEE" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED"));

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
          planingDetailsByDate?.hod_status == "WAITING_FOR_APPROVAL") ||
        planingDetailsByDate?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (planingDetailsByDate?.hod_status == "WAITING_FOR_APPROVAL" ||
          planingDetailsByDate?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/approveOrReject`,
        {
          id: 2,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("'/Precot/QualityControl/F-007/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    if (formId) {
      fetchDetails();
    }
  }, []);

  const fetchDetails = async () => {
    // console.log("Format No " , formNo);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF007/Id/`,
        { headers }
      );
      console.log("response (details based on date)", response.data);

      // if (
      //   role == "ROLE_CHEMIST" &&
      //   (response.data[0].chemist_status == "CHEMIST_APPROVED" || response.data[0].chemist_status == "CHEMIST_SUBMITTED")
      // ) {
      //   console.log("condition 1")
      //   setSaveBtnStatus(false);
      //   setSubmitBtnStatus(false);
      //   setDisable(true);
      // }

      // if (
      //   role == "ROLE_MICROBIOLOGIST" &&
      //   (response.data[0].microbiologist_status == "CHEMIST_APPROVED" || response.data[0].microbiologist_status == "CHEMIST_SUBMITTED")
      // ) {
      //   console.log("condition 1")
      //   setSaveBtnStatus(false);
      //   setSubmitBtnStatus(false);
      //   setDisable(true);
      // }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/approveOrReject`,
        {
          // id : id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-007/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSave = async () => {
    try {
      await SaveGlassWareBreakage();
    } catch (error) {
      console.error("Error saving Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitGlasswareBreakage();
    } catch (error) {
      console.error("Error submitting Record..", error);
    }
  };

  const SaveGlassWareBreakage = async () => {
    const { date, equipment } = state || {};
    setSaveLoading(true);
    try {
      const payload = {
        //   format: formatName,
        //   format_no: formatNo,
        //   revision_no: revisionNo,
        //   ref_sop_no: refSopNo,
        //   unit: unit,
        //   lab_id: lab_id,
        //   date: date,
        //   frequency: "Monthly",
        //   eq_id_no: equipment,
        //   month: monthName,
        //   year: year,
        // balancemaxweight: balancemaxweight,
        //   balanceminweight: balanceminweight,
        //   tolerance: tolerance ,
        //   obser:obser,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF007/save/wigClf007`,
        payload,
        { headers }
      );
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-007/Summary");
      }, 1500);
      message.success("Record Saved Successfully..");
    } catch (error) {
      message.error(error.response.data.message);

      throw new Error("Failed to save Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitGlasswareBreakage = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        //   formatName: formatName,
        //   formatNo: formatNo,
        //   revisionNo: revisionNo,
        //   refSopNo: refSopNo,
        //   unit: unit,
        //   lab_id: lab_id,
        //   date: date,
        //   frequency: "Monthly",
        //   eq_id_no: equipment,
        //   month: monthName,
        //   year: year,
        // balancemaxweight: balancemaxweight,
        //   balanceminweight: balanceminweight,
        //   tolerance: tolerance ,
        //   obser:obser,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF007/Submit/wigClf007`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QualityControl/F-007/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-007/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getByDate?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setPlaningDetailsByDate(response.data);
      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-007/Summary");
        }, 1500);
      }

      if (response.data) {
        const data = response.data;
        setplanId(data.planId);
        if (data && data.prodPlanDetails) {
        } else {
          setRows([]);
        }
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>WEIGHING SCALE CALIBRATION</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="5"
                rowSpan="2"
                style={{ textAlign: "center", height: "25px" }}
              >
                S.No.
              </th>
              <th colSpan="15" style={{ textAlign: "center", height: "25px" }}>
                Standard Weights in g/Kg{" "}
              </th>
              <td colSpan="15" style={{ textAlign: "center" }}>
                <input
                  className="inp-new"
                  // value={QuantityVerificationRemarks}
                  // onChange={(e) => setQuantityVerificationRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown}
                  type="number"
                />
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                <input
                  className="inp-new"
                  // value={QuantityVerificationRemarks}
                  // onChange={(e) => setQuantityVerificationRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown}
                  type="number"
                />
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                <input
                  className="inp-new"
                  // value={QuantityVerificationRemarks}
                  // onChange={(e) => setQuantityVerificationRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown}
                  type="number"
                />
              </td>
              <th colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                Remark{" "}
              </th>
              <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                Status{" "}
              </th>
              {/* <th colSpan="15" rowSpan="2" style={{ textAlign: 'center' }}>Calibrated By </th>
    <th colSpan="15" rowSpan="2" style={{ textAlign: 'center' }}>Verified By </th> */}
            </tr>
            <tr>
              <th colSpan="15" style={{ textAlign: "center", height: "25px" }}>
                Date{" "}
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Observed readings{" "}
              </th>
            </tr>
            {obser.map((obser, index) => (
              <tr key={index}>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", height: "3  0px" }}
                >
                  {index + 1}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {date}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    value={obser.test_lov}
                    onChange={(e) =>
                      handleInputChange(index, "test_lov", e.target.value)
                    }
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    onKeyDown={handleKeyDown}
                    type="number"
                  />
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    value={obser.number_a}
                    onChange={(e) =>
                      handleInputChange(index, "number_a", e.target.value)
                    }
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    onKeyDown={handleKeyDown}
                    type="number"
                  />
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    value={obser.number_b}
                    onChange={(e) =>
                      handleInputChange(index, "number_b", e.target.value)
                    }
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    onKeyDown={handleKeyDown}
                    type="number"
                  />
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    value={obser.remark}
                    onChange={(e) =>
                      handleInputChange(index, "remark", e.target.value)
                    }
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    type="text"
                  />
                </td>
                <td colSpan="10">
                  <Radio.Group
                    value={obser.status}
                    onChange={(e) =>
                      handleInputChange(index, "status", e.target.value)
                    }
                    style={{ marginLeft: "9px" }}
                  >
                    <Radio value="Y">OK</Radio>
                    <Radio value="N">NOT OK</Radio>
                  </Radio.Group>
                </td>
                {/* <td colSpan="15"  style={{ textAlign: 'center' }}></td>
    <td colSpan="15"  style={{ textAlign: 'center' }}></td> */}
              </tr>
            ))}
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
        formName="WEIGHING SCALE CALIBRATION REPORT "
        formatNo="PH-QCL01/F-007"
        sopNo="PH-QCL01-D-04"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
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
          addonBefore="Month & Year:"
          placeholder="Month & Year"
          value={`${monthName} / ${year}`}
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Equipment Name:"
          placeholder="Equipment Name"
          value={equipment}
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Frequency:"
          value={"Daily"}
          style={{ width: "90%", height: "35px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input.Group compact>
          <div style={{ width: "32%" }}>
            <Input
              addonBefore="Balance Max. Wt:"
              style={{ width: "100%", height: "35px" }}
              disabled
            />
          </div>
          <div style={{ width: "68%" }}>
            <Select
              value={maxWeight}
              onChange={handleMaxWeightChange}
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              disabled={disabled}
            >
              <Select.Option value="" disabled selected>
                Select Balance Max. Weight
              </Select.Option>
              {maxWeightLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
              <option value="Other">Other</option>
            </Select>
            {maxWeight === "Other" && (
              <input
                type="text"
                className="inp-new"
                value={customTextmax}
                onChange={(e) => setCustomTextmax(e.target.value)}
                placeholder="Enter Max wt."
                style={{
                  width: "100%",
                  height: "36x",
                  borderRadius: "0px",
                  border: "1px solid #dddd",
                  backgroundColor: "white",
                  marginLeft: "2px",
                }}
              />
            )}
          </div>
        </Input.Group>
        <Input.Group compact>
          <div style={{ width: "31%" }}>
            <Input
              addonBefore="Balance Min. Wt:"
              style={{ width: "100%", height: "35px" }}
              disabled
            />
          </div>
          <div style={{ width: "69%" }}>
            <Select
              value={minWeight}
              onChange={handleMinWeightChange}
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              disabled={disabled}
            >
              <Select.Option value="" disabled selected>
                Select Balance Min. Weight
              </Select.Option>
              {minWeightLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
              <option value="Other">Other</option>
            </Select>

            {minWeight === "Other" && (
              <input
                className="inp-new"
                type="text"
                value={customTextmin}
                onChange={(e) => setCustomTextmin(e.target.value)}
                placeholder="Enter Min Wt."
                style={{
                  width: "100%",
                  height: "36x",
                  borderRadius: "0px",
                  border: "1px solid #dddd",
                  backgroundColor: "white",
                  marginLeft: "2px",
                }}
              />
            )}
          </div>
        </Input.Group>
        <Input.Group compact>
          <div style={{ width: "20%" }}>
            <Input
              addonBefore="Tolerance:"
              style={{ width: "100%", height: "35px" }}
              disabled
            />
          </div>
          <div style={{ width: "80%" }}>
            <Select
              value={tolerance}
              onChange={handleToleranceChange}
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              disabled={disabled}
            >
              <Select.Option value="" disabled selected>
                Select Tolerance
              </Select.Option>
              {toleranceLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
              <option value="Other">Other</option>
            </Select>
            {tolerance === "Other" && (
              <input
                className="inp-new"
                type="text"
                value={customTexttolerance}
                onChange={(e) => setCustomTexttolerance(e.target.value)}
                style={{
                  width: "100%",
                  height: "36x",
                  borderRadius: "0px",
                  border: "1px solid #dddd",
                  backgroundColor: "white",
                  marginLeft: "2px",
                }}
                placeholder="Enter Tolerance"
              />
            )}
          </div>
        </Input.Group>
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

export default QualityControl_f007;
