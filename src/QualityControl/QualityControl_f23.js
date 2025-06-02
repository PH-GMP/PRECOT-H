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
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { TiTick } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";
import API from "../baseUrl.json";
import { Table, Modal, DatePicker, Form, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import QualityControl_f16 from "./QualityControl_f16.js";

const { TabPane } = Tabs;

const QualityControl_f23 = () => {
  const location = useLocation();
  const { date, week, serlzDate, clave } = location.state;
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    formatNo: "",
    revisionNo: "",
    formatName: "",
    refSopNo: "",
    eqIdLab7: "",
    eqIdLab3: "",
    date: "",
    lab7CleanedBy: "",
    labe7VerifiedBY: "",
    lab3CleanedBy: "",
    lab3VerifiedBy: "",
    month: "",
    year: "",
    week: "",
  });
  const [equipId, setEquipID] = useState("PH-E/I-LAB07");
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    microbiologist_sign: "",
  });
  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityControl/F-023/Summary");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };
  useEffect(() => {
    const signatureKeys = ["microbiologist_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
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
  }, [token, formData.microbiologist_sign]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${    API.prodUrl}/Precot/api/qc/CleaningOfAutoclavesF023/FetchF028ByDate?date=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data !== "No data found for the provided parameters") {
            console.log("Entered");
            const data = response.data[0];
            setFormData(data);
            if (data.microbiologist_status == "MICROBIOLOGIST_APPROVED") {
              setStatus(true);
            }
          }
        } catch (error) {
          console.log(error);
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, []);

  const handleSave = async () => {
    let selectedDate = new Date(date);
    const payload = {
      id: formData.id,
      formatNo: "PH-QCL01/F-023",
      revisionNo: "01",
      formatName: "CLEANING OF AUTOCLAVES",
      refSopNo: "PH-QCL01-D-03",
      eqIdLab7: "PH-E/I-LAB07",
      eqIdLab3: "PH-E/I-LAB03",
      date: date,
      lab7CleanedBy: formData.lab7CleanedBy || "NA",
      lab3CleanedBy: formData.lab3CleanedBy || "NA",
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
      week: getISOWeekString(selectedDate),
    };

    console.log(payload);
    try {
      setStatusLoader(true);
      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SaveCleaningOfAutoclaveF023`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Data Saved Successfully");
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-023/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };
  const handleSubmit = async () => {
    let selectedDate = new Date(date);
    if (
      (formData.lab7CleanedBy == "NA" && formData.lab3CleanedBy == "NA") ||
      (formData.lab7CleanedBy == "" && formData.lab3CleanedBy == "")
    ) {
      message.warning("Please Fill Atleast One Autoclave Cleaner");
      return;
    }
    const payload = {
      id: formData.id,
      formatNo: "PH-QCL01/F-023",
      revisionNo: "01",
      formatName: "CLEANING OF AUTOCLAVES",
      refSopNo: "PH-QCL01-D-03",
      eqIdLab7: "PH-E/I-LAB07",
      eqIdLab3: "PH-E/I-LAB03",
      date: date,
      lab7CleanedBy: formData.lab7CleanedBy || "NA",
      lab3CleanedBy: formData.lab3CleanedBy || "NA",
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
      week: getISOWeekString(selectedDate),
    };

    console.log(payload);
    try {
      setStatusLoader(true);
      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SubmitCleaningOfAutoclavesF023`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Data Submitted Successfully");
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-023/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleKeyDown_text = (e) => {
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

  const handleInput = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleTab = (e) => {
    console.log(e);
    switch (e) {
      case "1":
        setEquipID("PH-E/I-LAB07");
        break;
      case "2":
        setEquipID("PH-E/I-LAB03");
        break;
    }
  };
  const getISOWeek = (date) => {
    const target = new Date(date);
    target.setDate(target.getDate() + 4 - (target.getDay() || 7));
    const yearStart = new Date(target.getFullYear(), 0, 1);
    return Math.ceil(((target - yearStart) / 86400000 + 1) / 7);
  };
  const getISOWeekString = (date) => {
    const targetDate = new Date(date);
    const year = targetDate.getFullYear();
    const weekNumber = getISOWeek(targetDate);
    const formattedWeek = String(weekNumber).padStart(2, "0");
    return `${year}-W${formattedWeek}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
  return (
    <>
      <BleachingHeader
        formName={"CLEANING OF AUTOCLAVES"}
        formatNo={"PH-QCL01/F-023"}
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
              display: status ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={<IoSave color="#00308F" />}
            onClick={handleSave}
            loading={statusLoader}
          >
            Save
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={<GrDocumentStore color="#00308F" />}
            onClick={role == "ROLE_MICROBIOLOGIST" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            Submit
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

      <div style={{ margin: "10px" }}>
        <Input
          value={formatDate(date)}
          style={{ width: "200px", textAlign: "center" }}
          addonBefore={"Date : "}
          readOnly
        ></Input>
        <Input
          value={equipId}
          style={{ width: "220px", textAlign: "center", marginLeft: "5px" }}
          addonBefore={"EQ. ID.No.: "}
          readOnly
        ></Input>
      </div>

      <Tabs
        defaultActiveKey="1"
        onChange={(e) => {
          handleTab(e);
        }}
      >
        <TabPane tab="Discarding Autoclave" key="1">
          <div
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <table
              style={{ height: "70%", width: "70%", tableLayout: "fixed" }}
            >
              <tr>
                <td
                  style={{ textAlign: "center", padding: "10px", width: "50%" }}
                >
                  S. No.
                </td>
                <td style={{ textAlign: "center" }}>Cleaned By</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>1</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    value={formData.lab7CleanedBy}
                    onChange={(e) => {
                      handleInput(e, "lab7CleanedBy");
                    }}
                    type="text"
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                    }}
                    onKeyDown={(e) => {
                      handleKeyDown_text(e);
                    }}
                    readOnly={status}
                  ></Input>
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Sterilization Autoclave" key="2">
          <div
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <table
              style={{ height: "70%", width: "70%", tableLayout: "fixed" }}
            >
              <tr>
                <td
                  style={{ textAlign: "center", padding: "10px", width: "50%" }}
                >
                  S. No.
                </td>
                <td style={{ textAlign: "center" }}>Cleaned By</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>1</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={formData.lab3CleanedBy}
                    onChange={(e) => {
                      handleInput(e, "lab3CleanedBy");
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                    }}
                   
                    readOnly={status}
                  ></Input>
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <div
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <table
              style={{ height: "70%", width: "30%", tableLayout: "fixed" }}
            >
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Verified By.
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
                        {formData.microbiologist_sign}
                        <br />
                        {formatDateAndTime(formData.microbiologist_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.microbiologist_sign ? (
                        <img
                          src={eSign.microbiologist_sign}
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
              </tr>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default QualityControl_f23;
