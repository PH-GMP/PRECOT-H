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

const { Option } = Select;
const { TabPane } = Tabs;

const Spunlace_f05 = () => {
  const location = useLocation();
  const { TextArea } = Input;
  const token = localStorage.getItem("token");
  const { shift, date, orderNo } = location.state;
  const [messageApi, contextHolder] = message.useMessage();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const [formData, setFormData] = useState({
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
    operator_status: "",
    operator_save_by: "",
    operator_save_on: "",
    operator_submitted_by: "",
    operator_submitted_on: "",
    operator_sign: "",
    supervisor_status: "",
    supervisor_save_on: "",
    supervisor_save_by: "null",
    supervisor_submit_on: "",
    supervisor_submit_by: "",
    supervisor_sign: "",
    supervisior_mail_status: "",
    hod_status: "",
    hod_save_on: "",
    hod_save_by: "",
    hod_submit_on: "",
    hod_submit_by: "",
    hod_sign: "",
    hod_mail_status: "",
    unit: "",
    format_name: "PROCESS SETUP DETAILS-WINDER",
    format_no: "PH-PRD02/F-005",
    revision_no: "1",
    ref_sop_no: "SOP123",
    date: date,
    shift: shift,
    order_no: orderNo,
    mixing: "",
    product_name: "",
    sdt_gsm: "",
    width: "",
    pattern: "",
    moisturt: "",
    thickness: "",
    line_speed: "",
    roller_speed: "",
    line_draw: "",
    group_speed: "",
    wind_grp_draw: "",
    wind_arms_pressuer: "",
    srolls_winder_draw: "",
    tension: "",
    taper_on: "",
    tens_per_cut: "",
    tens_post_cut: "",
    length: "",
    reason: "",
  });
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();

  // ------------------------ API Section ---------------------------

  // ------------- > Get Api By Using Order No

  const [count, setCount] = useState("");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
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
  }, [token, formData]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (
        role == "ROLE_SUPERVISOR" ||
        role == "ROLE_HOD" ||
        role == "ROLE_DESIGNEE"
      ) {
        setStatus((formStatus) => ({
          ...formStatus,
          fieldStatus: true,
        }));
      }
      const fetchJobOrder = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/spulance/getWinderOperatorOrderDetailsF005?order_no=${orderNo}&date=${date}&shift=${shift}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log("Response Data", response.data[0]);

          if (response.data.length > 0) {
            const responseData = response.data[0];
            if (
              role == "ROLE_SUPERVISOR" &&
              responseData.operator_status != "OPERATOR_APPROVED"
            ) {
              message.warning("Operator yet To approve!").then(() => {
                navigate("/Precot/Spunlace/F-05/Summary");
              });
              // setTimeout(() => {

              // }, 1000);
              // return;
            }
            if (
              (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
              (responseData.operator_status != "OPERATOR_APPROVED" ||
                responseData.supervisor_status != "SUPERVISOR_APPROVED")
            ) {
              message.warning("Operator or Supervisor yet to approve!");
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-05/Summary");
              }, 1000);
              return;
            }
            // -------------- (Button and Field hiding) ----------------------
            statusFunction(responseData);
            //----------------------------------------------------------------
            // console.log("Responsed Data", responseData);
            setFormData(responseData);

            // console.log("If Entered");
          } else if (response.data.length == 0) {
            if (role == "ROLE_SUPERVISOR") {
              message.warning("Operator yet To approve!");
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-05/Summary");
              }, 1000);
              return;
            }
            if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
              message.warning("Operator or Supervisor yet to approve!");
              setTimeout(() => {
                navigate("/Precot/Spunlace/F-05/Summary");
              }, 1000);
              return;
            }
            const fetchJob = async () => {
              try {
                const response = await axios.get(
                  `${ API.prodUrl}/Precot/api/spulance/orderDetails?order=${orderNo}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (response.data.length > 0) {
                  const responseData = response.data[0];
                  setFormData((prevState) => ({
                    ...prevState,
                    mixing: responseData.mix,
                    sdt_gsm: responseData.gsm,
                    width: responseData.width,
                    pattern: responseData.patternDescription,
                    product_name: responseData.customerName,
                  }));
                } else {
                  message.warning(
                    "No job order details found for the given order number."
                  );
                  setTimeout(() => {
                    navigate("/Precot/Spunlace/F-05/Summary");
                  }, 1000);
                }
              } catch (error) {
                console.error("Error fetching job order details:", error);
                message.error(error.response.data.message);
              }
            };

            // Call the fetchJobOrder function
            fetchJob();
          }
        } catch (error) {
          console.error("Error fetching Job Order Options:", error);
        }
      };
      fetchJobOrder();
    }
  }, [orderNo]);

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
        navigate("/Precot/Spunlace/F-05/Summary");
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
        navigate("/Precot/Spunlace/F-05/Summary");
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
        navigate("/Precot/Spunlace/F-05/Summary");
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
      responseData.hod_status == "HOD_REJECTED"
    ) {
      message.warning("Operator Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/Spunlace/F-05/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  //--------------> Get Api by using order no,date and shift

  //--------------------> Save Api

  const handleSave = async () => {
    setStatusLoader(true);
    let apiurl, payload, succesMsg;
    if (role == "ROLE_OPERATOR") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${ API.prodUrl}/Precot/api/spulance/saveWinderF005`;
      payload = {
        unit: "Unit H",
        format_name: "PROCESS SETUP DETAILS-WINDER",
        format_no: "PH-PRD02/F-005",
        revision_no: "1",
        ref_sop_no: "PH-PRD02-D-03",
        date: formData.date,
        shift: formData.shift,
        order_no: formData.order_no,
        mixing: formData.mixing,
        product_name: formData.product_name,
        sdt_gsm: formData.sdt_gsm,
        width: formData.width,
        pattern: formData.pattern,
        moisturt: formData.moisturt || null,
        thickness: formData.thickness || null,
        line_speed: formData.line_speed || null,
        roller_speed: formData.roller_speed || null,
        line_draw: formData.line_draw || null,
        group_speed: formData.group_speed || null,
        wind_grp_draw: formData.wind_grp_draw || null,
        wind_arms_pressuer: formData.wind_arms_pressuer || null,
        srolls_winder_draw: formData.srolls_winder_draw || null,
        tension: formData.tension || null,
        taper_on: formData.taper_on || null,
        tens_per_cut: formData.tens_per_cut || null,
        tens_post_cut: formData.tens_post_cut || null,
        length: formData.length || null,
      };
      if (formData.id) {
        payload.id = formData.id;
      }
      if (formData.operator_save_id) {
        payload.operator_save_id = formData.operator_save_id;
      }
      if (formData.operator_submitted_id) {
        payload.operator_submitted_id = formData.operator_submitted_id;
      }
      if (formData.supervisor_save_id) {
        payload.supervisor_save_id = formData.supervisor_save_id;
      }
      if (formData.supervisor_submit_id) {
        payload.supervisor_submit_id = formData.supervisor_submit_id;
      }
      if (formData.hod_save_id) {
        payload.hod_save_id = formData.hod_save_id;
      }
      if (formData.hod_submit_id) {
        payload.hod_submit_id = formData.hod_submit_id;
      }
    } else if (
      role == "ROLE_SUPERVISOR" ||
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE"
    ) {
      apiurl = `${ API.prodUrl}/Precot/api/spulance/approveOrReject`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.id,
        status: "Approve",
      };
    }

    // console.log("payload", payload);
    try {
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
          navigate("/Precot/Spunlace/F-05/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
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
    if (role == "ROLE_OPERATOR") {
      apiurl = `${ API.prodUrl}/Precot/api/spulance/submitWinderF005`;
      const mpmRange = (speed, name) => {
        if (speed == "" || speed == null) {
          message.warning(`${name} required`);
          return false;
        }

        const numericSpeed = Number(speed);
        if (numericSpeed > 100 || numericSpeed < 0) {
          message.warning(`${name} needs to be within the given range`);
          return false;
        }

        return true;
      };
      const nmRange = (speed, name) => {
        if (speed == "" || speed == null) {
          message.warning(`${name} required`);
          return false;
        }
        

        const numericSpeed = Number(speed);
        if (numericSpeed > 100 || numericSpeed < 0) {
          message.warning(`${name} should be within the given range`);
          return false;
        }

        return true;
      };

      const emptyFieldsCheck = (speed, name) => {
        if (speed == "" || speed == null) {
          message.warning(`${name} required`);
          return false;
        }
        return true;
      };
      if (!emptyFieldsCheck(formData.date, "Date")) {
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.shift, "Shift")) {
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.moisturt, "Moisture")) {
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.thickness, "Thickness")) {
        setStatusLoader(false);
        return;
      }

      if (!mpmRange(formData.line_speed, "Line speed")) {
        setStatusLoader(false);
        return;
      }
      if (!mpmRange(formData.roller_speed, "S Roller speed")) {
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.line_draw, "Line Draw")) {
        setStatusLoader(false);
        return;
      }
      if (
        Number(formData.line_draw) > 5 ||
        Number(formData.line_draw) < -5
      ) {
        message.warning("Line Draw should within the given range");
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.group_speed, "Group Speed")) {
        setStatusLoader(false);
        return;
      }
      if (!mpmRange(formData.group_speed, "Group Speed")) {
        setStatusLoader(false);
        return;
      }

      if (!emptyFieldsCheck(formData.wind_grp_draw, "Wind Grp Draw")) {
        setStatusLoader(false);
        return;
      }
      if (
        Number(formData.wind_grp_draw) > 5 ||
        Number(formData.wind_grp_draw) < -5
      ) {
        message.warning("Wind-Grp Draw should within the given range");
        setStatusLoader(false);
        return;
      }
      if (
        !emptyFieldsCheck(formData.wind_arms_pressuer, "Winding Arms Pressure")
      ) {
        setStatusLoader(false);
        return;
      }

      if (
        Number(formData.wind_arms_pressuer) > 2.0 ||
        Number(formData.wind_arms_pressuer) < 0.5
      ) {
        message.warning("Winding arms pressure should within the given range");
        setStatusLoader(false);
        return;
      }
      if (
        !emptyFieldsCheck(formData.srolls_winder_draw, "S.Rolls Winder Draw")
      ) {
        setStatusLoader(false);
        return;
      }
      if (
        Number(formData.srolls_winder_draw) > 4.0 ||
        Number(formData.srolls_winder_draw) < -1.0
      ) {
        message.warning("S.Rolls Winder Draw should within the given range");
        setStatusLoader(false);
        return;
      }
      if (!nmRange(formData.tension, "Tension")) {
        setStatusLoader(false);
        return;
      }
      if (!nmRange(formData.taper_on, "Taper On")) {
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.tens_per_cut, "Tens Pre Cut")) {
        setStatusLoader(false);
        return;
      }
      if (
        Number(formData.tens_per_cut) > 5 ||
        Number(formData.tens_per_cut) < -5
      ) {
        // console.log("IF Entered");
        message.warning("Tens pre cut should within the given range");
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.tens_post_cut, "Tens Post Cut")) {
        setStatusLoader(false);
        return;
      }
      if (
        Number(formData.tens_post_cut) > 15 ||
        Number(formData.tens_post_cut) < 0
      ) {
        message.warning("Tens post cut should within the given range");
        setStatusLoader(false);
        return;
      }
      if (!emptyFieldsCheck(formData.length, "Length")) {
        setStatusLoader(false);
        return;
      }
      if (Number(formData.length) > 3000 || Number(formData.length) < 0) {
        message.warning("Length should within given range");
        setStatusLoader(false);
        return;
      }
      payload = {
        createdAt: formData.createdAt,
        updatedAt: formData.updatedAt,
        createdBy: formData.createdBy,
        updatedBy: formData.updatedBy,
        operator_status: formData.operator_status,
        operator_save_by: formData.operator_save_by,
        operator_save_on: formData.operator_save_on,
        operator_submitted_by: formData.operator_submitted_by,
        operator_submitted_on: formData.operator_submitted_on,
        operator_sign: formData.operator_sign,
        supervisor_status: formData.supervisor_status,
        supervisor_save_on: formData.supervisor_save_on,
        supervisor_save_by: formData.supervisor_save_by,
        supervisor_submit_on: formData.supervisor_submit_on,
        supervisor_submit_by: formData.supervisor_submit_by,
        supervisor_sign: formData.supervisor_sign,
        supervisior_mail_status: formData.supervisior_mail_status,
        hod_status: formData.supervisior_mail_status,
        hod_save_on: formData.hod_save_on,
        hod_save_by: formData.hod_save_by,
        hod_submit_on: formData.hod_submit_on,
        hod_submit_by: formData.hod_submit_by,
        hod_sign: formData.hod_sign,
        hod_mail_status: formData.hod_mail_status,
        unit: "Unit H",
        format_name: "PROCESS SETUP DETAILS-WINDER",
        format_no: "PH-PRD02/F-005",
        revision_no: "1",
        ref_sop_no: "PH-PRD02-D-03",
        date: formData.date,
        shift: formData.shift,
        order_no: formData.order_no,
        mixing: formData.mixing,
        product_name: formData.product_name,
        sdt_gsm: formData.sdt_gsm,
        width: formData.width,
        pattern: formData.pattern,
        moisturt: formData.moisturt,
        thickness: formData.thickness,
        line_speed: formData.line_speed,
        roller_speed: formData.roller_speed,
        line_draw: formData.line_draw,
        group_speed: formData.group_speed,
        wind_grp_draw: formData.wind_grp_draw,
        wind_arms_pressuer: formData.wind_arms_pressuer,
        srolls_winder_draw: formData.srolls_winder_draw,
        tension: formData.tension,
        taper_on: formData.taper_on,
        tens_per_cut: formData.tens_per_cut,
        tens_post_cut: formData.tens_post_cut,
        length: formData.length,
      };

      if (formData.id) {
        payload.id = formData.id;
      }
      if (formData.operator_save_id) {
        payload.operator_save_id = formData.operator_save_id;
      }
      if (formData.operator_submitted_id) {
        payload.operator_submitted_id = formData.operator_submitted_id;
      }
      if (formData.supervisor_save_id) {
        payload.supervisor_save_id = formData.supervisor_save_id;
      }
      if (formData.supervisor_submit_id) {
        payload.supervisor_submit_id = formData.supervisor_submit_id;
      }
      if (formData.hod_save_id) {
        payload.hod_save_id = formData.hod_save_id;
      }
      if (formData.hod_submit_id) {
        payload.hod_submit_id = formData.hod_submit_id;
      }
    } else if (
      role == "ROLE_SUPERVISOR" ||
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE"
    ) {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = apiurl = `${ API.prodUrl}/Precot/api/spulance/approveOrReject`;
      payload = {
        id: formData.id,
        status: "Reject",
        remarks: formData.reason,
      };
    }
    try {
      const requestMethod = role === "ROLE_OPERATOR" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(response.data.message);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-05/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  //--------------------------- X -----------------------------------

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-05/Summary");
  };
  ("");
  const handleKeyDown = (e) => {
    const { name } = e.target;
    if (
      name == "lineSpeed" ||
      name == "RollerSpeed" ||
      name == "tension" ||
      name == "taperOn" ||
      name == "tensPostCut" ||
      name == "sRollsWinderDraw" ||
      name == "groupSpeed"
    ) {
      if (
        ["e", "E", "+"].includes(e.key) ||
        (e.target.value.length >= 5 && e.key !== "Backspace")
      ) {
        e.preventDefault();
      }
      if (e.target.value.length >= 5 && e.key !== "Backspace") {
        e.preventDefault();
      }
    } else if (
      name == "lineDraw" ||
      name == "windGrpDraw" ||
      name == "windArmsPressure" ||
      name == "tensPreCut"
    ) {
      if (
        ["e", "E", "+"].includes(e.key) ||
        (e.target.value.length >= 4 && e.key !== "Backspace")
      ) {
        e.preventDefault();
      }
      if (e.target.value.length >= 4 && e.key !== "Backspace") {
        e.preventDefault();
      }
    }
  };
  const handleLengthKey = (e) => {
    if (
      ["e", "E", "+", "-"].includes(e.key) ||
      (e.target.value.length >= 7 && e.key !== "Backspace")
    ) {
      e.preventDefault();
    }
    if (e.target.value.length >= 7 && e.key !== "Backspace") {
      e.preventDefault();
    }
  };
  const handleHeaderKey = (e) => {
    if (
      ["e", "E", "+", "-"].includes(e.key) ||
      (e.target.value.length >= 100 && e.key !== "Backspace")
    ) {
      e.preventDefault();
    }
  };
  const handleInput = (event) => {
    const { name, value } = event.target;
    // console.log(value);

    const updatedFormData = {
      moisture: "moisturt",
      thickness: "thickness",
      lineSpeed: "line_speed",
      sRollerSpeed: "roller_speed",
      lineDraw: "line_draw",
      groupSpeed: "group_speed",
      windGrpDraw: "wind_grp_draw",
      windArmsPressure: "wind_arms_pressuer",
      sRollsWinderDraw: "srolls_winder_draw",
      tension: "tension",
      taperOn: "taper_on",
      tensPreCut: "tens_per_cut",
      tensPostCut: "tens_post_cut",
      length: "length",
    };

    if (updatedFormData[name]) {
      // console.log([updatedFormData[name]], value);
      setFormData({
        ...formData,
        [updatedFormData[name]]: value,
      });
    }
  };
  let validation = new Set();
  const handleBlur = (event) => {
    if (status.fieldStatus) {
      return;
    }
    // console.log("line speed data", formData.line_speed);

    const { name, value } = event.target;
    // --------------------- For Tab 1 -----------------------------
    if (
      formData.line_speed !== "" &&
      formData.line_speed !== null &&
      (formData.line_speed > 80 || formData.line_speed < 18)
    ) {
      validation.add("Line speed range should be  within 18 - 80");
    }
    if (
      formData.roller_speed !== "" &&
      formData.roller_speed !== null &&
      (formData.roller_speed > 80 || formData.roller_speed < 18)
    ) {
      validation.add("Roller speed range should be  within 18 - 80");
    }
    if (
      formData.line_draw !== "" &&
      formData.line_draw !== null &&
      (formData.line_draw > 5 || formData.line_draw < -5)
    ) {
      validation.add("Line Draw range should be  within range -5 - +5");
    }
    if (
      formData.group_speed !== "" &&
      formData.group_speed !== null &&
      (formData.group_speed > 80 || formData.group_speed < 18)
    ) {
      validation.add("Group Speed  range should be  within 18 - 80");
    }
    if (
      formData.wind_grp_draw !== "" &&
      formData.wind_grp_draw !== null &&
      (formData.wind_grp_draw > 5 || formData.wind_grp_draw < 1-5)
    ) {
      validation.add("Wind Grp Draw range should be  within -5 to 5");
    }
    if (
      formData.wind_arms_pressuer !== "" &&
      formData.wind_arms_pressuer !== null &&
      (formData.wind_arms_pressuer > 2.0 || formData.wind_arms_pressuer < 0.5)
    ) {
      validation.add(
        "Winding arms pressure  range Should be  within range 0.5 - 2.0"
      );
    }
    // ------------------ For Tab 2 ---------------------------
    if (
      formData.srolls_winder_draw !== "" &&
      formData.srolls_winder_draw !== null &&
      (formData.srolls_winder_draw > 4.0 || formData.srolls_winder_draw < -1.0)
    ) {
      validation.add("Srolls winder draw range should be  within -1.0 - 4.0");
    }
    if (
      formData.tension !== "" &&
      formData.tension !== null &&
      (formData.tension > 100 || formData.tension < 0)
    ) {
      validation.add("Tension range speed should be  within 0 - 100");
    }
    if (
      formData.taper_on !== "" &&
      formData.taper_on !== null &&
      (formData.taper_on > 100 || formData.taper_on < 0)
    ) {
      validation.add("Taper on range should be  within range 0 - 100");
    }
    if (
      formData.tens_per_cut !== "" &&
      formData.tens_per_cut !== null &&
      (formData.tens_per_cut > 5 || formData.tens_per_cut < -5)
    ) {
      validation.add("Tens pre cut range should be  within -5 to 5");
    }
    if (
      formData.tens_post_cut !== "" &&
      formData.tens_post_cut !== null &&
      (formData.tens_post_cut > 15 || formData.tens_post_cut < 0)
    ) {
      validation.add("Tens Post Cut range should be  within 0 - 15");
    }
    if (
      formData.length !== "" &&
      formData.length !== null &&
      (formData.length > 3000 || formData.length < 0)
    ) {
      validation.add("Length range should be  within range 0 - 3000");
    }
    if (validation.size > 0) {
      validation.forEach((msg) => {
        message.warning(msg);
      });
    }
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

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  return (
    <div>
      {contextHolder}
      <BleachingHeader
        formName={"PROCESS SETUP DETAILS - WINDER"}
        formatNo={"PH-PRD02/F-005"}
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

      <div style={{ margin: "10px", display: "flex" }}>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                type="date"
                addonBefore="Date :"
                value={formData.date}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
                max={today}
              />
              <Input
                type="text"
                addonBefore="Width in mm:"
                value={formData.width}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                type="text"
                value={orderNo}
                addonBefore="Order No .:"
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />

              <Input
                type="text"
                addonBefore="Pattern:"
                value={formData.pattern}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
            </Space>
          </Col>
          <br></br>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                type="text"
                name="shift"
                addonBefore="Shift :"
                value={formData.shift}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
              <Input
                type="number"
                name="moisture"
                addonBefore="Moisture in % :"
                value={formData.moisturt}
                onChange={handleInput}
                onKeyDown={handleHeaderKey}
                style={{
                  width: "100%",
                  backgroundColor: "none",
                  textAlign: "center",
                }}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                type="number"
                addonBefore="STD GSM :"
                value={formData.sdt_gsm}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
              <Input
                type="number"
                name="thickness"
                addonBefore="Thickness in mm :"
                onKeyDown={handleHeaderKey}
                value={formData.thickness}
                onChange={handleInput}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
        </Row>
      </div>
      <div
        style={{
          width: "100%",
          marginLeft: "10px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Input
          type="text"
          addonBefore="Product Name :"
          value={formData.product_name}
          style={{ width: "30%" }}
          readOnly
        />
        <Input
          type="text"
          addonBefore="Mixing:"
          value={formData.mixing}
          style={{ width: "200px" }}
          readOnly
        />
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Setup Details I" key="1">
          <div style={{ height: "50vh" }}>
            <table style={{ height: "100%" }}>
              <tr>
                <th>DESCRIPTIONS</th>
                <th>STANDARDS</th>
                <th>UNITS</th>
                <th>SET PARAMETERS</th>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>LINE SPEED</td>
                <td style={{ textAlign: "center" }}> 18-80</td>
                <td rowspan="2" style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Input
                    type="number"
                    name="lineSpeed"
                    onChange={handleInput}
                    value={formData.line_speed}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onFocusOut={true}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={18}
                    max={80}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>S.ROLLER SPEED</td>
                <td style={{ textAlign: "center" }}> 18-80</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="sRollerSpeed"
                    onChange={handleInput}
                    value={formData.roller_speed}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={18}
                    max={80}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>LINE DRAW</td>
                <td style={{ textAlign: "center" }}>-5 - +5</td>
                <td style={{ textAlign: "center" }}>%</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="lineDraw"
                    onChange={handleInput}
                    value={formData.line_draw}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    step="0.1"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={0.0}
                    max={4.0}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>GROUP SPEED</td>
                <td style={{ textAlign: "center" }}>18 - 80</td>
                <td style={{ textAlign: "center" }}>MPM</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="groupSpeed"
                    onChange={handleInput}
                    value={formData.group_speed}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={18}
                    max={80}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>WIND-GRP DRAW</td>
                <td style={{ textAlign: "center" }}>-5 - +5</td>
                <td style={{ textAlign: "center" }}>%</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="windGrpDraw"
                    value={formData.wind_grp_draw}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    step="0.1"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={1.0}
                    max={4.0}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>WINDING ARMS PRESSURE</td>
                <td style={{ textAlign: "center" }}>0.5 - 2.0</td>
                <td style={{ textAlign: "center" }}>BAR</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="windArmsPressure"
                    value={formData.wind_arms_pressuer}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    step="0.1"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={0.5}
                    max={2.0}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Setup Details II" key="2">
          <div style={{ height: "50vh" }}>
            <table style={{ height: "100%" }}>
              <tr>
                <th style={{ fontSize: "14px" }}>DESCRIPTIONS</th>
                <th>STANDARDS</th>
                <th>UNITS</th>
                <th>SET PARAMETERS</th>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>SROLLS - WINDER DRAW</td>
                <td style={{ textAlign: "center" }}>-1.0 - 4.0</td>
                <td style={{ textAlign: "center" }}>%</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="sRollsWinderDraw"
                    onChange={handleInput}
                    value={formData.srolls_winder_draw}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    step="0.1"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={-1.0}
                    max={4.0}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>TENSION</td>
                <td style={{ textAlign: "center" }}>0 - 100</td>
                <td rowspan="2" style={{ textAlign: "center" }}>
                  N/M
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="tension"
                    onChange={handleInput}
                    value={formData.tension}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={0}
                    max={50}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>TAPER ON</td>
                <td style={{ textAlign: "center" }}>0 - 100</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="taperOn"
                    onChange={handleInput}
                    value={formData.taper_on}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={0}
                    max={50}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>TENS PRE-CUT</td>
                <td style={{ textAlign: "center" }}>-5 - +5</td>
                <td style={{ textAlign: "center" }} rowspan="2">
                  %
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="tensPreCut"
                    onChange={handleInput}
                    value={formData.tens_per_cut}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={0}
                    max={5}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>TENS POST-CUT</td>
                <td style={{ textAlign: "center" }}>0 - 15</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="tensPostCut"
                    onChange={handleInput}
                    value={formData.tens_post_cut}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={0}
                    max={15}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>LENGTH</td>
                <td style={{ textAlign: "center" }}>0 - 3000</td>
                <td style={{ textAlign: "center" }}>MTR</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    name="length"
                    onChange={handleInput}
                    value={formData.length}
                    onKeyDown={handleLengthKey}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    min={100}
                    max={200}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
            </table>
          </div>
        </TabPane>

        <TabPane tab="Reviews" key="3">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  OPERATOR SIGN & DATE
                </td>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  PRODUCTION SUPERVISOR SIGN & DATE
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  HOD/DESIGNEE SIGN & DATE
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
                        {formData.operator_sign}
                        <br />
                        {formatDate(formData.operator_submitted_on)}
                      </div>
                    </div>
                      <div style={{ marginLeft: "20px" }}>
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
                      ):null}
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
                                height: "70px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ): null }
                          </div>
                      </div>
                    )}
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Spunlace_f05;
