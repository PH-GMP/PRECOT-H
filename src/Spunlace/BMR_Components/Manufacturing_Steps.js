import { Button, Input, Radio, Select, message } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { GrDocumentStore } from "react-icons/gr";
import API from "../../baseUrl.json";
import axios from "axios";
import { FormProvider } from "antd/es/form/context";

const Manufacturing_Steps = (props) => {
  const token = localStorage.getItem("token");
  const [messageApi, contextHolder] = message.useMessage();
  const [newSave, setNewSave] = useState(false);
  const initialized = useRef(false);
  const [supervisorApproved, setSupervisorApproved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);
  const [userLov, setUserLov] = useState({
    prodlov: "",
    qalov: "",
  });
  const role = localStorage.getItem("role");

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");
  // Function to format the date and time as 'YYYY-MM-DDTHH:mm'
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  useEffect(() => {
    const now = new Date();

    if (role === "ROLE_SUPERVISOR") {
      const formattedDate = formatDateTime(now);
      setCurrentDateTime(formattedDate);
    }

    if (role === "ROLE_QA") {
      const formattedDateQA = formatDateTime(now);
      setCurrentDateTimeQA(formattedDateQA);
    }
  }, [role]);

  const [username, setUsername] = useState("");
  const [usernameQA, setUsernameQA] = useState("");
  const userQA = role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
    role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";
  const [formData, setFormData] = useState({
    order_no: props.orderNo,
    form_no: "",
    status: "",
    ab_cotton: "",
    rp_cotton: "",
    wbo_date_prod: currentDateTime,
    wbo_time_prod: "",
    wbo_name_prod: usernameSupervisor,
    wbo_sign_sign: "",
    wbo_date_qa: "",
    wbo_time_qa: "",
    wbo_name_qa: "",
    wbo_sign_qa: "",
    alc1_actual_set_gsm: "",
    alc1_date_prod: currentDateTime,
    alc1_time_prod: "",
    alc1_name_prod: usernameSupervisor,
    alc1_sign_prod: "",
    alc1_date_qa: "",
    alc1_time_qa: "",
    alc1_name_qa: "",
    alc1_sign_qa: "",
    reiter01_actual_set_gsm: "",
    reiter01_date_prod: currentDateTime,
    reiter01_time_prod: "",
    reiter01_name_prod: usernameSupervisor,
    reiter01_sign_prod: "",
    reiter01_date_qa: "",
    reiter01_time_qa: "",
    reiter01_name_qa: "",
    reiter01_sign_qa: "",
    alc2_actual_set_gsm: "",
    alc2_date_prod: currentDateTime,
    alc2_time_prod: "",
    alc2_name_prod: usernameSupervisor,
    alc2_sign_prod: "",
    alc2_date_qa: "",
    alc2_time_qa: "",
    alc2_name_qa: "",
    alc2_sign_qa: "",
    reiter02_actual_set_gsm: "",
    reiter02_date_prod: currentDateTime,
    reiter02_time_prod: "",
    reiter02_name_prod: usernameSupervisor,
    reiter02_sign_prod: "",
    reiter02_date_qa: "",
    reiter02_time_qa: "",
    reiter02_name_qa: "",
    reiter02_sign_qa: "",
    jetlace_car_speed: "",
    jetlace_vacum_section: "",
    jetlace_pre_wetting: "",
    jetlace_pattern: "",
    injector_ipa: "",
    injector_11: "",
    injector_21: "",
    injector_12: "",
    jetlace_date_prod: currentDateTime,
    jetlace_time_prod: "",
    jetlace_name_prod: usernameSupervisor,
    jetlace_sign_prod: "",
    jetlace_date_qa: "",
    jetlace_time_qa: "",
    jetlace_name_qa: "",
    jetlace_sign_qa: "",
    dryera_temp: "",
    dryera_blow_speed: "",
    dryera_drum_speed: "",
    dryera__intel_drum_speed: "",
    dryera__outlet_drum_speed: "",
    dryera_date_prod: currentDateTime,
    dryera_time_prod: "",
    dryera_name_prod: usernameSupervisor,
    dryera_sign_prod: "",
    dryera_date_qa: "",
    dryera_time_qa: "",
    dryera_name_qa: "",
    dryera_sign_qa: "",
    dryera_temp: "",
    dryerb_blow_speed: "",
    dryerb_drum_speed: "",
    dryerb__intel_drum_speed: "",
    dryerb__outlet_drum_speed: "",
    dryerb_date_prod: currentDateTime,
    dryerb_time_prod: "",
    dryerb_name_prod: usernameSupervisor,
    dryerb_sign_prod: "",
    dryerb_date_qa: "",
    dryerb_time_qa: "",
    dryerb_name_qa: "",
    dryerb_sign_qa: "",
    dryerb_temp: "",
    winder_line_speed: "",
    winder_roll_width: "",
    winder_roll_thickness: "",
    winder_date_prod: "",
    winder_time_prod: "",
    winder_name_prod: usernameSupervisor,
    winder_sign_prod: "",
    winder_date_qa: currentDateTime,
    winder_time_qa: "",
    winder_name_qa: "",
    winder_sign_qa: "",
    mahlo_shaft_no: "",
    mahlo_actual_gsm: "",
    mahlo_actual_moisture: "",
    mahlo_date_prod: currentDateTime,
    mahlo_time_prod: "",
    mahlo_name_prod: usernameSupervisor,
    mahlo_sign_prod: "",
    mahlo_date_qa: "",
    mahlo_time_qa: "",
    mahlo_name_qa: "",
    mahlo_sign_qa: "",
    injector_01: "",
    roll_gsm: "",
    target_gsm: "",
    targer_moisture: "",
    lucid_observed_01: "",
    lucid_observed_02: "",
    lucid_date_prod: currentDateTime,
    lucid_time_prod: "",
    lucid_name_prod: usernameSupervisor,
    lucid_sign_prod: "",
    lucid_date_qa: "",
    lucid_time_qa: "",
    lucid_name_qa: "",
    lucid_sign_qa: "",
    winder_roll_gsm: "",
    supervisor_status: "",
    qa_status: "",
  });
  //console.log("Selected Order No", props.orderNo);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && role == "ROLE_SUPERVISOR") {
      setUsername(storedUsername);
    } else if (storedUsername && role == "ROLE_QA") {
      setUsernameQA(storedUsername);
    }
    console.log("username", storedUsername, username);
  }, []);

  const defaultValue = props.supLov.find((option) => option.value === username);
  console.log("defaultValue", defaultValue);
  const defaultValueQA = props.qaLov.find(
    (option) => option.value === usernameQA
  );

  const getData = () => {
    axios
      .get(
        `${ API.prodUrl}/Precot/api/spunlace/summary/07.GetManufacturingSteps?order_no=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response data", res.data);
        if (res.data.length > 0) {
          setFormData(res.data[0]);
          //qa_status
          //supervisor_status
          setQaApproved(res.data[0].qa_status == "QA_APPROVED" ? true : false);
          setSupervisorApproved(
            res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
              ? true
              : false
          );
          setNewSave(true);
        } else {
          setNewSave(false);
          setQaApproved(false);
          setSupervisorApproved(false);
          setFormData({
            form_no: "",
            status: "",
            ab_cotton: "",
            rp_cotton: "",
            wbo_date_prod: "",
            wbo_time_prod: "",
            wbo_name_prod: "",
            wbo_sign_sign: "",
            wbo_date_qa: "",
            wbo_time_qa: "",
            wbo_name_qa: "",
            wbo_sign_qa: "",
            alc1_actual_set_gsm: "",
            alc1_date_prod: "",
            alc1_time_prod: "",
            alc1_name_prod: "",
            alc1_sign_prod: "",
            alc1_date_qa: "",
            alc1_time_qa: "",
            alc1_name_qa: "",
            alc1_sign_qa: "",
            reiter01_actual_set_gsm: "",
            reiter01_date_prod: "",
            reiter01_time_prod: "",
            reiter01_name_prod: "",
            reiter01_sign_prod: "",
            reiter01_date_qa: "",
            reiter01_time_qa: "",
            reiter01_name_qa: "",
            reiter01_sign_qa: "",
            alc2_actual_set_gsm: "",
            alc2_date_prod: "",
            alc2_time_prod: "",
            alc2_name_prod: "",
            alc2_sign_prod: "",
            alc2_date_qa: "",
            alc2_time_qa: "",
            alc2_name_qa: "",
            alc2_sign_qa: "",
            reiter02_actual_set_gsm: "",
            reiter02_date_prod: "",
            reiter02_time_prod: "",
            reiter02_name_prod: "",
            reiter02_sign_prod: "",
            reiter02_date_qa: "",
            reiter02_time_qa: "",
            reiter02_name_qa: "",
            reiter02_sign_qa: "",
            jetlace_car_speed: "",
            jetlace_vacum_section: "",
            jetlace_pre_wetting: "",
            jetlace_pattern: "",
            injector_ipa: "",
            injector_01: "",
            roll_gsm: "",
            target_gsm: "",
            targer_moisture: "",
            injector_11: "",
            injector_12: "",
            injector_21: "",
            jetlace_date_prod: "",
            jetlace_time_prod: "",
            jetlace_name_prod: "",
            jetlace_sign_prod: "",
            jetlace_date_qa: "",
            jetlace_time_qa: "",
            jetlace_name_qa: "",
            jetlace_sign_qa: "",
            dryera_temp: "",
            dryera_blow_speed: "",
            dryera_drum_speed: "",
            dryera__intel_drum_speed: "",
            dryera__outlet_drum_speed: "",
            dryera_date_prod: "",
            dryera_time_prod: "",
            dryera_name_prod: "",
            dryera_sign_prod: "",
            dryera_date_qa: "",
            dryera_time_qa: "",
            dryera_name_qa: "",
            dryera_sign_qa: "",
            dryera_temp: "",
            dryerb_blow_speed: "",
            dryerb_drum_speed: "",
            dryerb__intel_drum_speed: "",
            dryerb__outlet_drum_speed: "",
            dryerb_date_prod: "",
            dryerb_time_prod: "",
            dryerb_name_prod: "",
            dryerb_sign_prod: "",
            dryerb_date_qa: "",
            dryerb_time_qa: "",
            dryerb_name_qa: "",
            dryerb_sign_qa: "",
            dryerb_temp: "",
            winder_line_speed: "",
            winder_roll_width: "",
            winder_roll_thickness: "",
            winder_date_prod: "",
            winder_time_prod: "",
            winder_name_prod: "",
            winder_sign_prod: "",
            winder_date_qa: "",
            winder_time_qa: "",
            winder_name_qa: "",
            winder_sign_qa: "",
            mahlo_shaft_no: "",
            mahlo_actual_gsm: "",
            mahlo_actual_moisture: "",
            mahlo_date_prod: "",
            mahlo_time_prod: "",
            mahlo_name_prod: "",
            mahlo_sign_prod: "",
            mahlo_date_qa: "",
            mahlo_time_qa: "",
            mahlo_name_qa: "",
            mahlo_sign_qa: "",
            lucid_observed_01: "",
            lucid_observed_02: "",
            lucid_date_prod: "",
            lucid_time_prod: "",
            lucid_name_prod: "",
            lucid_sign_prod: "",
            lucid_date_qa: "",
            lucid_time_qa: "",
            lucid_name_qa: "",
            lucid_sign_qa: "",
            winder_roll_gsm: "",
          });
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };
  useEffect(() => {
    if (props.batchNo == "" || props.batchNo == null) {
      message.warning("No Order No Selected");
      return;
    }
    getData();
  }, [props.batchNo]);

  const SaveManufacturingSteps = () => {
    const payload_2 = {
      id: formData.id,
      batchNo: props.batchNo,
      order_no: props.orderNo,
      form_no: formData.form_no,
      status: formData.status,
      ab_cotton: formData.ab_cotton,
      rp_cotton: formData.rp_cotton,
      wbo_date_prod: formData.wbo_date_prod || currentDateTime,
      wbo_time_prod: formData.wbo_time_prod,
      wbo_name_prod: formData.wbo_name_prod || usernameSupervisor,
      wbo_sign_sign: formData.wbo_sign_sign,
      wbo_date_qa: formData.wbo_date_qa || currentDateTimeQA,
      wbo_time_qa: formData.wbo_time_qa,
      wbo_name_qa: formData.wbo_name_qa || userQA,
      wbo_sign_qa: formData.wbo_name_qa || userQA,
      alc1_actual_set_gsm: formData.alc1_actual_set_gsm,
      alc1_date_prod: formData.alc1_date_prod || currentDateTime,
      alc1_time_prod: formData.alc1_time_prod,
      alc1_name_prod: formData.alc1_name_prod || usernameSupervisor,
      alc1_sign_prod: formData.alc1_sign_prod,
      alc1_date_qa: formData.alc1_date_qa || currentDateTimeQA,
      alc1_time_qa: formData.alc1_time_qa,
      alc1_name_qa: formData.alc1_name_qa || userQA,
      alc1_sign_qa: formData.alc1_name_qa || userQA,
      reiter01_actual_set_gsm: formData.reiter01_actual_set_gsm,
      reiter01_date_prod: formData.reiter01_date_prod || currentDateTime,
      reiter01_time_prod: formData.reiter01_time_prod,
      reiter01_name_prod: formData.reiter01_name_prod || usernameSupervisor,
      reiter01_sign_prod: formData.reiter01_sign_prod,
      reiter01_date_qa: formData.reiter01_date_qa || currentDateTimeQA,
      reiter01_time_qa: formData.reiter01_time_qa,
      reiter01_name_qa: formData.reiter01_name_qa || userQA,
      reiter01_sign_qa: formData.reiter01_name_qa || userQA,
      alc2_actual_set_gsm: formData.alc2_actual_set_gsm,
      alc2_date_prod: formData.alc2_date_prod || currentDateTime,
      alc2_time_prod: formData.alc2_time_prod,
      alc2_name_prod: formData.alc2_name_prod || usernameSupervisor,
      alc2_sign_prod: formData.alc2_sign_prod,
      alc2_date_qa: formData.alc2_date_qa || currentDateTimeQA,
      alc2_time_qa: formData.alc2_time_qa,
      alc2_name_qa: formData.alc2_name_qa || userQA,
      alc2_sign_qa: formData.alc2_name_qa || userQA,
      reiter02_actual_set_gsm: formData.reiter02_actual_set_gsm,
      reiter02_date_prod: formData.reiter02_date_prod || currentDateTime,
      reiter02_time_prod: formData.reiter02_time_prod,
      reiter02_name_prod: formData.reiter02_name_prod || usernameSupervisor,
      reiter02_sign_prod: formData.reiter02_sign_prod,
      reiter02_date_qa: formData.reiter02_date_qa || currentDateTimeQA,
      reiter02_time_qa: formData.reiter02_time_qa,
      reiter02_name_qa: formData.reiter02_name_qa || userQA,
      reiter02_sign_qa: formData.reiter02_name_qa || userQA,
      jetlace_car_speed: formData.jetlace_car_speed,
      jetlace_vacum_section: formData.jetlace_vacum_section,
      jetlace_pre_wetting: formData.jetlace_pre_wetting,
      jetlace_pattern: formData.jetlace_pattern,
      injector_ipa: formData.injector_ipa,
      roll_gsm: formData.roll_gsm,
      target_gsm: formData.target_gsm,
      targer_moisture: formData.targer_moisture,
      injector_01: formData.injector_01,
      injector_11: formData.injector_11,
      injector_12: formData.injector_12,
      injector_21: formData.injector_21,
      jetlace_date_prod: formData.jetlace_date_prod || currentDateTime,
      jetlace_time_prod: formData.jetlace_time_prod,
      jetlace_name_prod: formData.jetlace_name_prod || usernameSupervisor,
      jetlace_sign_prod: formData.jetlace_sign_prod,
      jetlace_date_qa: formData.jetlace_date_qa || currentDateTimeQA,
      jetlace_time_qa: formData.jetlace_time_qa,
      jetlace_name_qa: formData.jetlace_name_qa || userQA,
      jetlace_sign_qa: formData.jetlace_name_qa || userQA,
      dryera_temp: formData.dryera_temp,
      dryera_blow_speed: formData.dryera_blow_speed,
      dryera_drum_speed: formData.dryera_drum_speed,
      dryera__intel_drum_speed: formData.dryera__intel_drum_speed,
      dryera__outlet_drum_speed: formData.dryera__outlet_drum_speed,
      dryera_date_prod: formData.dryera_date_prod || currentDateTime,
      dryera_time_prod: formData.dryera_time_prod,
      dryera_name_prod: formData.dryera_name_prod || usernameSupervisor,
      dryera_sign_prod: formData.dryera_sign_prod,
      dryera_date_qa: formData.dryera_date_qa || currentDateTimeQA,
      dryera_time_qa: formData.dryera_time_qa,
      dryera_name_qa: formData.dryera_name_qa || userQA,
      dryera_sign_qa: formData.dryera_name_qa || userQA,
      dryerb_blow_speed: formData.dryera_blow_speed,
      dryerb_drum_speed: formData.dryerb_drum_speed,
      dryerb__intel_drum_speed: formData.dryerb__intel_drum_speed,
      dryerb__outlet_drum_speed: formData.dryerb__outlet_drum_speed,
      dryerb_date_prod: formData.dryerb_date_prod || currentDateTime,
      dryerb_time_prod: formData.dryerb_time_prod,
      dryerb_name_prod: formData.dryerb_name_prod || usernameSupervisor,
      dryerb_sign_prod: formData.dryerb_sign_prod,
      dryerb_date_qa: formData.dryerb_date_qa || currentDateTimeQA,
      dryerb_time_qa: formData.dryerb_time_qa,
      dryerb_name_qa: formData.dryerb_name_qa || userQA,
      dryerb_sign_qa: formData.dryerb_name_qa || userQA,
      dryerb_temp: formData.dryerb_temp,
      winder_line_speed: formData.winder_line_speed,
      winder_roll_width: formData.winder_roll_width,
      winder_roll_thickness: formData.winder_roll_thickness,
      winder_date_prod: formData.winder_date_prod || currentDateTime,
      winder_time_prod: formData.winder_time_prod,
      winder_name_prod: formData.winder_name_prod || usernameSupervisor,
      winder_sign_prod: formData.winder_sign_prod,
      winder_date_qa: formData.winder_date_qa || currentDateTimeQA,
      winder_time_qa: formData.winder_time_qa,
      winder_name_qa: formData.winder_name_qa || userQA,
      winder_sign_qa: formData.winder_name_qa || userQA,
      mahlo_shaft_no: formData.mahlo_shaft_no,
      mahlo_actual_gsm: formData.mahlo_actual_gsm,
      mahlo_actual_moisture: formData.mahlo_actual_moisture,
      mahlo_date_prod: formData.mahlo_date_prod || currentDateTime,
      mahlo_time_prod: formData.mahlo_time_prod,
      mahlo_name_prod: formData.mahlo_name_prod || usernameSupervisor,
      mahlo_sign_prod: formData.mahlo_sign_prod,
      mahlo_date_qa: formData.mahlo_date_qa || currentDateTimeQA,
      mahlo_time_qa: formData.mahlo_time_qa,
      mahlo_name_qa: formData.mahlo_name_qa || userQA,
      mahlo_sign_qa: formData.mahlo_name_qa || userQA,
      lucid_observed_01: formData.lucid_observed_01,
      lucid_observed_02: formData.lucid_observed_02,
      lucid_date_prod: formData.lucid_date_prod || currentDateTime,
      lucid_time_prod: formData.lucid_time_prod,
      lucid_name_prod: formData.lucid_name_prod || usernameSupervisor,
      lucid_sign_prod: formData.lucid_sign_prod,
      lucid_date_qa: formData.lucid_date_qa || currentDateTimeQA,
      lucid_time_qa: formData.lucid_time_qa,
      lucid_name_qa: formData.lucid_name_qa || userQA,
      lucid_sign_qa: formData.lucid_name_qa || userQA,
      winder_roll_gsm: formData.winder_roll_gsm,
      supervisor_status: formData.supervisor_status,
      qa_status: formData.qa_status,
    };
    // try {
    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/07.SaveManufacturingSteps`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("res", response.data);
        message.success("Manufacturing Steps Saved");
        getData();
      })
      .catch((err) => {
        console.log("Error", err);
        message.error(err.response.data.message);
      });
  };
  const SubmitManufacturingSteps = () => {
    // const payload_1 = {
    //   id: formData.id,
    //   batchNo: props.batchNo,
    //   order_no: props.orderNo,
    //   form_no: formData.form_no,
    //   status: formData.status,
    //   ab_cotton: formData.ab_cotton,
    //   rp_cotton: formData.rp_cotton,
    //   wbo_date_prod: formData.wbo_date_prod || currentDateTime,
    //   wbo_time_prod: formData.wbo_time_prod,
    //   // wbo_name_prod: formData.wbo_name_prod,
    //   // wbo_sign_sign: formData.wbo_name_prod,
    //   wbo_name_prod: defaultValue || usernameSupervisor,
    //   wbo_sign_sign: defaultValue || usernameSupervisor,
    //   wbo_date_qa: formData.wbo_date_qa || currentDateTimeQA,
    //   wbo_time_qa: formData.wbo_time_qa,
    //   // wbo_name_qa: formData.wbo_name_qa || userQA,
    //   // wbo_sign_qa: formData.wbo_name_qa || userQA,

    //   wbo_name_qa: defaultValue || userQA,
    //   wbo_sign_qa: defaultValue || userQA,
    //   roll_gsm: formData.roll_gsm,
    //   target_gsm: formData.target_gsm,
    //   targer_moisture: formData.targer_moisture,
    //   injector_01: formData.injector_01,

    //   alc1_actual_set_gsm: formData.alc1_actual_set_gsm,
    //   alc1_date_prod: formData.alc1_date_prod || currentDateTime,
    //   alc1_time_prod: formData.alc1_time_prod,
    //   // alc1_name_prod: formData.alc1_name_prod,
    //   // alc1_sign_prod: formData.alc1_name_prod,
    //   alc1_name_prod: defaultValue || usernameSupervisor,
    //   alc1_sign_prod: defaultValue || usernameSupervisor,
    //   alc1_date_qa: formData.alc1_date_qa || currentDateTimeQA,
    //   alc1_time_qa: formData.alc1_time_qa,
    //   // alc1_name_qa: formData.alc1_name_qa || userQA,
    //   // alc1_sign_qa: formData.alc1_name_qa || userQA,
    //   alc1_name_qa: defaultValue || userQA,
    //   alc1_sign_qa: defaultValue || userQA,
    //   reiter01_actual_set_gsm: formData.reiter01_actual_set_gsm,
    //   reiter01_date_prod: formData.reiter01_date_prod || currentDateTime,
    //   reiter01_time_prod: formData.reiter01_time_prod,
    //   // reiter01_name_prod: formData.reiter01_name_prod,
    //   // reiter01_sign_prod: formData.reiter01_name_prod,
    //   reiter01_name_prod: defaultValue || usernameSupervisor,
    //   reiter01_sign_prod: defaultValue || usernameSupervisor,
    //   reiter01_date_qa: formData.reiter01_date_qa || currentDateTimeQA,
    //   reiter01_time_qa: formData.reiter01_time_qa,
    //   // reiter01_name_qa: formData.reiter01_name_qa || userQA,
    //   // reiter01_sign_qa: formData.reiter01_name_qa || userQA,
    //   reiter01_name_qa: defaultValue || userQA,
    //   reiter01_sign_qa: defaultValue || userQA,
    //   alc2_actual_set_gsm: formData.alc2_actual_set_gsm,
    //   alc2_date_prod: formData.alc2_date_prod || currentDateTime,
    //   alc2_time_prod: formData.alc2_time_prod,
    //   // alc2_name_prod: formData.alc2_name_prod,
    //   // alc2_sign_prod: formData.alc2_name_prod,
    //   alc2_name_prod: defaultValue || usernameSupervisor,
    //   alc2_sign_prod: defaultValue || usernameSupervisor,
    //   alc2_date_qa: formData.alc2_date_qa || currentDateTimeQA,
    //   alc2_time_qa: formData.alc2_time_qa,
    //   // alc2_name_qa: formData.alc2_name_qa || userQA,
    //   // alc2_sign_qa: formData.alc2_name_qa || userQA,
    //   alc2_name_qa: defaultValue || userQA,
    //   alc2_sign_qa: defaultValue || userQA,
    //   reiter02_actual_set_gsm: formData.reiter02_actual_set_gsm,
    //   reiter02_date_prod: formData.reiter02_date_prod || currentDateTime,
    //   reiter02_time_prod: formData.reiter02_time_prod,
    //   // reiter02_name_prod: formData.reiter02_name_prod,
    //   // reiter02_sign_prod: formData.reiter02_name_prod,
    //   reiter02_name_prod: defaultValue || usernameSupervisor,
    //   reiter02_sign_prod: defaultValue || usernameSupervisor,
    //   reiter02_date_qa: formData.reiter02_date_qa || currentDateTimeQA,
    //   reiter02_time_qa: formData.reiter02_time_qa,
    //   // reiter02_name_qa: formData.reiter02_name_qa || userQA,
    //   // reiter02_sign_qa: formData.reiter02_name_qa || userQA,
    //   reiter02_name_qa: defaultValue || userQA,
    //   reiter02_sign_qa: defaultValue || userQA,
    //   jetlace_car_speed: formData.jetlace_car_speed,
    //   jetlace_vacum_section: formData.jetlace_vacum_section,
    //   jetlace_pre_wetting: formData.jetlace_pre_wetting,
    //   jetlace_pattern: formData.jetlace_pattern,
    //   injector_ipa: formData.injector_ipa,
    //   roll_gsm: formData.roll_gsm,
    //   target_gsm: formData.target_gsm,
    //   targer_moisture: formData.targer_moisture,
    //   injector_01: formData.injector_01,
    //   injector_11: formData.injector_11,
    //   injector_12: formData.injector_12,
    //   injector_21: formData.injector_21,
    //   jetlace_date_prod: formData.jetlace_date_prod || currentDateTime,
    //   jetlace_time_prod: formData.jetlace_time_prod,
    //   // jetlace_name_prod: formData.jetlace_name_prod,
    //   // jetlace_sign_prod: formData.jetlace_name_prod,
    //   jetlace_name_prod: defaultValue || usernameSupervisor,
    //   jetlace_sign_prod: defaultValue || usernameSupervisor,
    //   jetlace_date_qa: formData.jetlace_date_qa || currentDateTimeQA,
    //   jetlace_time_qa: formData.jetlace_time_qa,
    //   // jetlace_name_qa: formData.jetlace_name_qa || userQA,
    //   // jetlace_sign_qa: formData.jetlace_name_qa || userQA,
    //   jetlace_name_qa: defaultValue || userQA,
    //   jetlace_sign_qa: defaultValue || userQA,
    //   dryera_temp: formData.dryera_temp,
    //   dryera_blow_speed: formData.dryera_blow_speed,
    //   dryera_drum_speed: formData.dryera_drum_speed,
    //   dryera__intel_drum_speed: formData.dryera__intel_drum_speed,
    //   dryera__outlet_drum_speed: formData.dryera__outlet_drum_speed,
    //   dryera_date_prod: formData.dryera_date_prod || currentDateTime,
    //   dryera_time_prod: formData.dryera_time_prod,
    //   // dryera_name_prod: formData.dryera_name_prod,
    //   // dryera_sign_prod: formData.dryera_name_prod,
    //   dryera_name_prod: defaultValue || usernameSupervisor,
    //   dryera_sign_prod: defaultValue || usernameSupervisor,
    //   dryera_date_qa: formData.dryera_date_qa || currentDateTimeQA,
    //   dryera_time_qa: formData.dryera_time_qa,
    //   // dryera_name_qa: formData.dryera_name_qa || userQA,
    //   // dryera_sign_qa: formData.dryera_name_qa || userQA,
    //   dryera_name_qa: defaultValue || userQA,
    //   dryera_sign_qa: defaultValue || userQA,
    //   dryerb_blow_speed: formData.dryera_blow_speed,
    //   dryerb_drum_speed: formData.dryerb_drum_speed,
    //   dryerb__intel_drum_speed: formData.dryerb__intel_drum_speed,
    //   dryerb__outlet_drum_speed: formData.dryerb__outlet_drum_speed,
    //   dryerb_date_prod: formData.dryerb_date_prod || currentDateTime,
    //   dryerb_time_prod: formData.dryerb_time_prod,
    //   // dryerb_name_prod: formData.dryerb_name_prod,
    //   // dryerb_sign_prod: formData.dryerb_name_prod,
    //   dryerb_name_prod: defaultValue || usernameSupervisor,
    //   dryerb_sign_prod: defaultValue || usernameSupervisor,
    //   dryerb_date_qa: formData.dryerb_date_qa || currentDateTimeQA,
    //   dryerb_time_qa: formData.dryerb_time_qa,
    //   // dryerb_name_qa: formData.dryerb_name_qa || userQA,
    //   // dryerb_sign_qa: formData.dryerb_name_qa || userQA,
    //   dryerb_name_qa: defaultValue || userQA,
    //   dryerb_sign_qa: defaultValue || userQA,
    //   dryerb_temp: formData.dryerb_temp,
    //   winder_line_speed: formData.winder_line_speed,
    //   winder_roll_width: formData.winder_roll_width,
    //   winder_roll_thickness: formData.winder_roll_thickness,
    //   winder_date_prod: formData.winder_date_prod || currentDateTime,
    //   winder_time_prod: formData.winder_time_prod,
    //   // winder_name_prod: formData.winder_name_prod,
    //   // winder_sign_prod: formData.winder_name_prod,
    //   winder_name_prod: defaultValue || usernameSupervisor,
    //   winder_sign_prod: defaultValue || usernameSupervisor,
    //   winder_date_qa: formData.winder_date_qa || currentDateTimeQA,
    //   winder_time_qa: formData.winder_time_qa,
    //   // winder_name_qa: formData.winder_name_qa || userQA,
    //   // winder_sign_qa: formData.winder_name_qa || userQA,
    //   winder_name_qa: defaultValue || userQA,
    //   winder_sign_qa: defaultValue || userQA,
    //   mahlo_shaft_no: formData.mahlo_shaft_no,
    //   mahlo_actual_gsm: formData.mahlo_actual_gsm,
    //   mahlo_actual_moisture: formData.mahlo_actual_moisture,
    //   mahlo_date_prod: formData.mahlo_date_prod || currentDateTime,
    //   mahlo_time_prod: formData.mahlo_time_prod,
    //   // mahlo_name_prod: formData.mahlo_name_prod,
    //   // mahlo_sign_prod: formData.mahlo_name_prod,
    //   mahlo_name_prod: defaultValue || usernameSupervisor,
    //   mahlo_sign_prod: defaultValue || usernameSupervisor,
    //   mahlo_date_qa: formData.mahlo_date_qa || currentDateTimeQA,
    //   mahlo_time_qa: formData.mahlo_time_qa,
    //   // mahlo_name_qa: formData.mahlo_name_qa || userQA,
    //   // mahlo_sign_qa: formData.mahlo_name_qa || userQA,
    //   mahlo_name_qa: defaultValue || userQA,
    //   mahlo_sign_qa: defaultValue || userQA,
    //   lucid_observed_01: formData.lucid_observed_01,
    //   lucid_observed_02: formData.lucid_observed_02,
    //   lucid_date_prod: formData.lucid_date_prod || currentDateTime,
    //   lucid_time_prod: formData.lucid_time_prod,
    //   // lucid_name_prod: formData.lucid_name_prod,
    //   // lucid_sign_prod: formData.lucid_name_prod,
    //   lucid_name_prod: defaultValue || usernameSupervisor,
    //   lucid_sign_prod: defaultValue || usernameSupervisor,
    //   lucid_date_qa: formData.lucid_date_qa || currentDateTimeQA,
    //   lucid_time_qa: formData.lucid_time_qa,
    //   // lucid_name_qa: formData.lucid_name_qa || userQA,
    //   // lucid_sign_qa: formData.lucid_name_qa || userQA,
    //   lucid_name_qa: defaultValue || userQA,
    //   lucid_sign_qa: defaultValue || userQA,
    //   winder_roll_gsm: formData.winder_roll_gsm,
    //   supervisor_status: formData.supervisor_status,
    //   qa_status: formData.qa_status,
    // };
    const payload_1 = {
      id: formData.id,
      batchNo: props.batchNo,
      order_no: props.orderNo,
      form_no: formData.form_no,
      status: formData.status,
      ab_cotton: formData.ab_cotton,
      rp_cotton: formData.rp_cotton,
      wbo_date_prod: formData.wbo_date_prod || currentDateTime,
      wbo_time_prod: formData.wbo_time_prod,
      wbo_name_prod: formData.wbo_name_prod || usernameSupervisor,
      wbo_sign_sign: formData.wbo_sign_sign,
      wbo_date_qa: formData.wbo_date_qa || currentDateTimeQA,
      wbo_time_qa: formData.wbo_time_qa,
      wbo_name_qa: formData.wbo_name_qa || userQA,
      wbo_sign_qa: formData.wbo_name_qa || userQA,
      alc1_actual_set_gsm: formData.alc1_actual_set_gsm,
      alc1_date_prod: formData.alc1_date_prod || currentDateTime,
      alc1_time_prod: formData.alc1_time_prod,
      alc1_name_prod: formData.alc1_name_prod || usernameSupervisor,
      alc1_sign_prod: formData.alc1_sign_prod,
      alc1_date_qa: formData.alc1_date_qa || currentDateTimeQA,
      alc1_time_qa: formData.alc1_time_qa,
      alc1_name_qa: formData.alc1_name_qa || userQA,
      alc1_sign_qa: formData.alc1_name_qa || userQA,
      reiter01_actual_set_gsm: formData.reiter01_actual_set_gsm,
      reiter01_date_prod: formData.reiter01_date_prod || currentDateTime,
      reiter01_time_prod: formData.reiter01_time_prod,
      reiter01_name_prod: formData.reiter01_name_prod || usernameSupervisor,
      reiter01_sign_prod: formData.reiter01_sign_prod,
      reiter01_date_qa: formData.reiter01_date_qa || currentDateTimeQA,
      reiter01_time_qa: formData.reiter01_time_qa,
      reiter01_name_qa: formData.reiter01_name_qa || userQA,
      reiter01_sign_qa: formData.reiter01_name_qa || userQA,
      alc2_actual_set_gsm: formData.alc2_actual_set_gsm,
      alc2_date_prod: formData.alc2_date_prod || currentDateTime,
      alc2_time_prod: formData.alc2_time_prod,
      alc2_name_prod: formData.alc2_name_prod || usernameSupervisor,
      alc2_sign_prod: formData.alc2_sign_prod,
      alc2_date_qa: formData.alc2_date_qa || currentDateTimeQA,
      alc2_time_qa: formData.alc2_time_qa,
      alc2_name_qa: formData.alc2_name_qa || userQA,
      alc2_sign_qa: formData.alc2_name_qa || userQA,
      reiter02_actual_set_gsm: formData.reiter02_actual_set_gsm,
      reiter02_date_prod: formData.reiter02_date_prod || currentDateTime,
      reiter02_time_prod: formData.reiter02_time_prod,
      reiter02_name_prod: formData.reiter02_name_prod || usernameSupervisor,
      reiter02_sign_prod: formData.reiter02_sign_prod,
      reiter02_date_qa: formData.reiter02_date_qa || currentDateTimeQA,
      reiter02_time_qa: formData.reiter02_time_qa,
      reiter02_name_qa: formData.reiter02_name_qa || userQA,
      reiter02_sign_qa: formData.reiter02_name_qa || userQA,
      jetlace_car_speed: formData.jetlace_car_speed,
      jetlace_vacum_section: formData.jetlace_vacum_section,
      jetlace_pre_wetting: formData.jetlace_pre_wetting,
      jetlace_pattern: formData.jetlace_pattern,
      injector_ipa: formData.injector_ipa,
      roll_gsm: formData.roll_gsm,
      target_gsm: formData.target_gsm,
      targer_moisture: formData.targer_moisture,
      injector_01: formData.injector_01,
      injector_11: formData.injector_11,
      injector_12: formData.injector_12,
      injector_21: formData.injector_21,
      jetlace_date_prod: formData.jetlace_date_prod || currentDateTime,
      jetlace_time_prod: formData.jetlace_time_prod,
      jetlace_name_prod: formData.jetlace_name_prod || usernameSupervisor,
      jetlace_sign_prod: formData.jetlace_sign_prod,
      jetlace_date_qa: formData.jetlace_date_qa || currentDateTimeQA,
      jetlace_time_qa: formData.jetlace_time_qa,
      jetlace_name_qa: formData.jetlace_name_qa || userQA,
      jetlace_sign_qa: formData.jetlace_name_qa || userQA,
      dryera_temp: formData.dryera_temp,
      dryera_blow_speed: formData.dryera_blow_speed,
      dryera_drum_speed: formData.dryera_drum_speed,
      dryera__intel_drum_speed: formData.dryera__intel_drum_speed,
      dryera__outlet_drum_speed: formData.dryera__outlet_drum_speed,
      dryera_date_prod: formData.dryera_date_prod || currentDateTime,
      dryera_time_prod: formData.dryera_time_prod,
      dryera_name_prod: formData.dryera_name_prod || usernameSupervisor,
      dryera_sign_prod: formData.dryera_sign_prod,
      dryera_date_qa: formData.dryera_date_qa || currentDateTimeQA,
      dryera_time_qa: formData.dryera_time_qa,
      dryera_name_qa: formData.dryera_name_qa || userQA,
      dryera_sign_qa: formData.dryera_name_qa || userQA,
      dryerb_blow_speed: formData.dryera_blow_speed,
      dryerb_drum_speed: formData.dryerb_drum_speed,
      dryerb__intel_drum_speed: formData.dryerb__intel_drum_speed,
      dryerb__outlet_drum_speed: formData.dryerb__outlet_drum_speed,
      dryerb_date_prod: formData.dryerb_date_prod || currentDateTime,
      dryerb_time_prod: formData.dryerb_time_prod,
      dryerb_name_prod: formData.dryerb_name_prod || usernameSupervisor,
      dryerb_sign_prod: formData.dryerb_sign_prod,
      dryerb_date_qa: formData.dryerb_date_qa || currentDateTimeQA,
      dryerb_time_qa: formData.dryerb_time_qa,
      dryerb_name_qa: formData.dryerb_name_qa || userQA,
      dryerb_sign_qa: formData.dryerb_name_qa || userQA,
      dryerb_temp: formData.dryerb_temp,
      winder_line_speed: formData.winder_line_speed,
      winder_roll_width: formData.winder_roll_width,
      winder_roll_thickness: formData.winder_roll_thickness,
      winder_date_prod: formData.winder_date_prod || currentDateTime,
      winder_time_prod: formData.winder_time_prod,
      winder_name_prod: formData.winder_name_prod || usernameSupervisor,
      winder_sign_prod: formData.winder_sign_prod,
      winder_date_qa: formData.winder_date_qa || currentDateTimeQA,
      winder_time_qa: formData.winder_time_qa,
      winder_name_qa: formData.winder_name_qa || userQA,
      winder_sign_qa: formData.winder_name_qa || userQA,
      mahlo_shaft_no: formData.mahlo_shaft_no,
      mahlo_actual_gsm: formData.mahlo_actual_gsm,
      mahlo_actual_moisture: formData.mahlo_actual_moisture,
      mahlo_date_prod: formData.mahlo_date_prod || currentDateTime,
      mahlo_time_prod: formData.mahlo_time_prod,
      mahlo_name_prod: formData.mahlo_name_prod || usernameSupervisor,
      mahlo_sign_prod: formData.mahlo_sign_prod,
      mahlo_date_qa: formData.mahlo_date_qa || currentDateTimeQA,
      mahlo_time_qa: formData.mahlo_time_qa,
      mahlo_name_qa: formData.mahlo_name_qa || userQA,
      mahlo_sign_qa: formData.mahlo_name_qa || userQA,
      lucid_observed_01: formData.lucid_observed_01,
      lucid_observed_02: formData.lucid_observed_02,
      lucid_date_prod: formData.lucid_date_prod || currentDateTime,
      lucid_time_prod: formData.lucid_time_prod,
      lucid_name_prod: formData.lucid_name_prod || usernameSupervisor,
      lucid_sign_prod: formData.lucid_sign_prod,
      lucid_date_qa: formData.lucid_date_qa || currentDateTimeQA,
      lucid_time_qa: formData.lucid_time_qa,
      lucid_name_qa: formData.lucid_name_qa || userQA,
      lucid_sign_qa: formData.lucid_name_qa || userQA,
      winder_roll_gsm: formData.winder_roll_gsm,
      supervisor_status: formData.supervisor_status,
      qa_status: formData.qa_status,
    };
    // try {
    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/07.SubmitManufacturingSteps`,
        payload_1,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response", response.data);
        message.success("Manufacturing steps submitted");
        getData();
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });

    // } catch (error) {
    //   messageApi.error(error.response.data.message);
    // }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log("Input Field", name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUser = (name, selectedOption) => {
    console.log("Selected User", name);
    console.log("Selected Option", selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption,
    }));
  };

  const handleRadio = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      lucid_observed_01: value,
    }));
  };
  console.log("Prod Lov Res", props.supLov);
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <b>MANUFACTURING STEPS</b>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          // marginBottom: "0.5em",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginBottom: "5px",
            display:
              props.loggedInHod ||
              (props.loggedInQa && qaApproved) ||
              (props.loggedInSupervisor && supervisorApproved) ||
              (qaApproved && supervisorApproved)
                ? "none"
                : "block",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          shape="round"
          onClick={SaveManufacturingSteps}
        >
          Save
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginBottom: "5px",
            display:
              props.loggedInHod ||
              (props.loggedInQa && qaApproved) ||
              (props.loggedInSupervisor && supervisorApproved) ||
              (qaApproved && supervisorApproved)
                ? "none"
                : "block",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          shape="round"
          onClick={SubmitManufacturingSteps}
        >
          Submit
        </Button>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <tr>
          <th colSpan="1">Step No</th>
          <th colSpan="1">Operation</th>
          <th colSpan="2">Observation</th>
          <th colSpan="1">Performed by (Sign & Date) </th>
          <th colSpan="1">Checked by(Sign & Date) </th>
        </tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            1
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <span style={{ fontWeight: "bold", fontSize: "12px" }}>
              WBO 01 & 02:
            </span>{" "}
            Set the mixing ratio in HMI. Take the AB cotton bales and feed them
            to the feed table. Start the WBO-1 and WBO -2 by pushing. ALC-
            opening button in operating panel. BALE OPENER: Take the AB cotton
            bales and feed them onto the feed table. Start BO by pushing C-60
            opening button in operating panel.
          </td>
          <td colSpan="2" style={{ padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Mixing Radio AB-Cotton :
              <Input
                name="ab_cotton"
                value={formData.ab_cotton}
                style={{
                  width: "100%",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (formData.ab_cotton < 40 || formData.ab_cotton > 100) {
                    message.error("Please Choose Between 40 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  props.loggedInHod ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved) ||
                  !props.loggedInSupervisor
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              RP-Cotton :
              <Input
                name="rp_cotton"
                value={formData.rp_cotton}
                type="number"
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                onBlur={() => {
                  if (formData.rp_cotton < 40 || formData.rp_cotton > 80) {
                    message.error("Please Choose Between 40 and 80");
                  }
                }}
                onChange={handleInput}
                disabled={
                  props.loggedInHod ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved) ||
                  !props.loggedInSupervisor
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              // value={formData.wbo_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.wbo_name_prod
              }
              onChange={(selectedOption) =>
                handleUser("wbo_name_prod", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved) ||
                !props.loggedInSupervisor
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="wbo_date_prod"
              value={formData.wbo_date_prod || currentDateTime}
              type="datetime-local"
              onChange={handleInput}
              // onChange={(e) => {
              //   updateManufacturingStepsPerformedByDate({
              //     one: e.target.value,
              //   });
              // }}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              // value={formData.wbo_name_qa}
              value={defaultValueQA || userQA || formData.wbo_name_qa}
              onChange={(selectedOption) =>
                handleUser("wbo_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="wbo_date_qa"
              type="datetime-local"
              value={formData.wbo_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            2
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            CARDING M/C ALC-: Start the push button main on HMI. <br /> Set GSM:
            20 to 300 <br /> Switch “ON” feeding
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Actual Set GSM :
              <Input
                name="alc1_actual_set_gsm"
                value={formData.alc1_actual_set_gsm}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                onChange={(selectedOption) =>
                  handleUser("alc1_actual_set_gsm", selectedOption.target.value)
                }
                //  disabled={!props.loggedInSupervisor}
                type="number"
                onBlur={() => {
                  if (
                    formData.alc1_actual_set_gsm < 20 ||
                    formData.alc1_actual_set_gsm > 300
                  ) {
                    message.error("Please Choose Between 20 and 300");
                  }
                }}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              // value={formData.alc1_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.alc1_name_prod
              }
              onChange={(selectedOption) =>
                handleUser("alc1_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="alc1_date_prod"
              type="datetime-local"
              value={formData.alc1_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.alc1_name_qa}
              value={defaultValueQA || userQA || formData.alc1_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("alc1_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="alc1_date_qa"
              type="datetime-local"
              value={formData.alc1_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            3
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            CARDING M/C REITER 01: Press the start button on HMI Set the GSM and
            Web delivery to collecting belt. <br /> Set GSM: 8 to 57
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Actual Set GSM :
              <Input
                name="reiter01_actual_set_gsm"
                value={formData.reiter01_actual_set_gsm}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.reiter01_actual_set_gsm < 8 ||
                    formData.reiter01_actual_set_gsm > 57
                  ) {
                    message.error("Please Choose Between 8 and 57");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.reiter01_name_prod}
              value={
                defaultValue ||
                usernameSupervisor ||
                formData.reiter01_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("reiter01_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="reiter01_date_prod"
              type="datetime-local"
              value={formData.reiter01_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.reiter01_name_qa}
              value={defaultValueQA || userQA || formData.reiter01_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("reiter01_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="reiter01_date_qa"
              value={formData.reiter01_date_qa || currentDateTimeQA}
              type="datetime-local"
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            4
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            CARDING M/C ALC-2: Start the main “ON” in HMI by Push the ALC-1 PUSH
            button. <br /> Set GSM: 20 to 300 <br /> Switch “ON” the feeding.
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Actual Set GSM :
              <Input
                name="alc2_actual_set_gsm"
                value={formData.alc2_actual_set_gsm}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
                type="number"
                onBlur={() => {
                  if (
                    formData.alc2_actual_set_gsm < 20 ||
                    formData.alc2_actual_set_gsm > 300
                  ) {
                    message.error("Please Choose Between 8 and 57");
                  }
                }}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.alc2_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.alc2_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("alc2_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="alc2_date_prod"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              value={formData.alc2_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.alc2_name_qa}
              value={defaultValueQA || userQA || formData.alc2_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("alc2_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="alc2_date_qa"
              type="datetime-local"
              value={formData.alc2_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            5
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            CARDING M/C REITER 02: Press the start button on HMI Set the GSM and
            Pressure of transmitter Web delivery to collecting belt. <br /> Set
            GSM: 8 to 57
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Actual Set GSM :
              <Input
                name="reiter02_actual_set_gsm"
                value={formData.reiter02_actual_set_gsm}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.reiter02_actual_set_gsm < 8 ||
                    formData.reiter02_actual_set_gsm > 57
                  ) {
                    message.error("Please Choose Between 8 and 57");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              // value={formData.reiter02_name_prod}
              style={{
                width: "12em",
              }}
              // options={props.supLov}
              value={
                defaultValue ||
                usernameSupervisor ||
                formData.reiter02_name_prod
              }
              onChange={(selectedOption) =>
                handleUser("reiter02_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="reiter02_date_prod"
              value={formData.reiter02_date_prod || currentDateTime}
              type="datetime-local"
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.reiter02_name_qa}
              value={defaultValueQA || userQA || formData.reiter02_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("reiter02_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="reiter02_date_qa"
              style={{
                width: "12em",
              }}
              value={formData.reiter02_date_qa || currentDateTimeQA}
              type="datetime-local"
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>

        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            6
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            JETLACE: Switch “ON” the filtration. Start the conveyors and water
            pressure and link Jetlace to card Pass the card web, jet lace
            through dryer and winder and change the production mode after
            reached required speed ensure the fleece weight (GSM), thickness,
            bonding, drying, moisture and folding. <br /> Card Speed (MPM): 8 to
            100 <br /> Vacuum suction in %: 0 to 100 <br /> Pre-Wetting water
            pressure (BAR): 0 to 12 <br /> All Injector water pressure (BAR) - 0
            to 120
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Card Speed:
              <Input
                name="jetlace_car_speed"
                value={formData.jetlace_car_speed}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.jetlace_car_speed < 8 ||
                    formData.jetlace_car_speed > 100
                  ) {
                    message.error("Please Choose Between 8 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Vacuum suction:
              <Input
                name="jetlace_vacum_section"
                value={formData.jetlace_vacum_section}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.jetlace_vacum_section < 0 ||
                    formData.jetlace_vacum_section > 100
                  ) {
                    message.error("Please Choose Between 0 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Pre-Wetting:
              <Input
                name="jetlace_pre_wetting"
                value={formData.jetlace_pre_wetting}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.jetlace_pre_wetting < 0 ||
                    formData.jetlace_pre_wetting > 12
                  ) {
                    message.error("Please Choose Between 0 and 12");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Injector 01:
              <Input
                name="injector_01"
                value={formData.injector_01}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                // onBlur={() => {
                //   if (
                //     formData.injector_11 < 0 ||
                //     formData.injector_11 > 120
                //   ) {
                //     message.error("Please Choose Between 0 and 120");
                //   }
                // }}
                onChange={handleInput}
                disabled={
                  props.loggedInHod ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Injector 01:
              <Input
                name="injector_ipa"
                value={formData.injector_ipa}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
              />
            </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Injector IPA:
              <Input
                name="injector_ipa"
                value={formData.injector_ipa}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.injector_ipa < 0 ||
                    formData.injector_ipa > 120
                  ) {
                    message.error("Please Choose Between 0 and 120");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Injector 11:
              <Input
                name="injector_11"
                value={formData.injector_11}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (formData.injector_11 < 0 || formData.injector_11 > 120) {
                    message.error("Please Choose Between 0 and 120");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Injector 12:
              <Input
                name="injector_12"
                value={formData.injector_12}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (formData.injector_12 < 0 || formData.injector_12 > 120) {
                    message.error("Please Choose Between 0 and 120");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Injector 21:
              <Input
                name="injector_21"
                value={formData.injector_21}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (formData.injector_21 < 0 || formData.injector_21 > 120) {
                    message.error("Please Choose Between 0 and 120");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.jetlace_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.jetlace_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("jetlace_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="jetlace_date_prod"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              value={formData.jetlace_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              // value={formData.jetlace_name_qa}
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              value={defaultValueQA || userQA || formData.jetlace_name_qa}
              onChange={(selectedOption) =>
                handleUser("jetlace_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="jetlace_date_qa"
              type="datetime-local"
              value={formData.jetlace_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            7
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            DRYER A: Start the blowers and simultaneously start the dryer drums.{" "}
            <br />
            Set the temperature Min 50 – Max 200°C <br /> Set the blower Speed
            Min 50 – Max 100% <br /> Drum speed Min 8 - Max 100 mtrs/min <br />{" "}
            Inlet damper Setting: Min 0 – Max 100% <br /> Outlet damper Setting:
            Min 0 – Max 100%
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Dryer A Temperature:
              <Input
                name="dryera_temp"
                value={formData.dryera_temp}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (formData.dryera_temp < 50 || formData.dryera_temp > 200) {
                    message.error("Please Choose Between 50 and 200");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Blower speed:
              <Input
                name="dryera_blow_speed"
                value={formData.dryera_blow_speed}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryera_blow_speed < 50 ||
                    formData.dryera_blow_speed > 100
                  ) {
                    message.error("Please Choose Between 50 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
                // borderBottom: "1.5px solid #000",
              }}
            >
              Drum speed:
              <Input
                name="dryera_drum_speed"
                value={formData.dryera_drum_speed}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryera_drum_speed < 8 ||
                    formData.dryera_drum_speed > 100
                  ) {
                    message.error("Please Choose Between 8 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Inlet Damper setting:
              <Input
                name="dryera__intel_drum_speed"
                value={formData.dryera__intel_drum_speed}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryera__intel_drum_speed < 0 ||
                    formData.dryera__intel_drum_speed > 100
                  ) {
                    message.error("Please Choose Between 0 and 120");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Outlet damper setting:
              <Input
                name="dryera__outlet_drum_speed"
                value={formData.dryera__outlet_drum_speed}
                style={{
                  width: "9.5em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryera__outlet_drum_speed < 0 ||
                    formData.dryera__outlet_drum_speed > 100
                  ) {
                    message.error("Please Choose Between 0 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.dryera_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.dryera_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("dryera_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              type="datetime-local"
              name="dryera_date_prod"
              value={formData.dryera_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.dryera_name_qa}
              value={defaultValueQA || userQA || formData.dryera_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("dryera_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="dryera_date_qa"
              type="datetime-local"
              value={formData.dryera_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            8
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            DRYER B: Start the blowers and simultaneously start the dryer drums.
            <br />
            Set the temperature Min 50 – Max 200°C <br />
            Set the blower Speed Min 50 – Max 100% <br />
            Drum speed Min 8 - Max 100 Mtrs/min <br />
            Inlet damper Setting: Min 0 – Max 100% <br />
            Outlet damper Setting: Min 0 – Max 100%
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Dryer B Temperature:
              <Input
                name="dryerb_temp"
                value={formData.dryerb_temp}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (formData.dryerb_temp < 50 || formData.dryerb_temp > 200) {
                    message.error("Please Choose Between 0 and 120");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Blower speed:
              <Input
                name="dryerb_blow_speed"
                value={formData.dryerb_blow_speed}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryerb_blow_speed < 50 ||
                    formData.dryerb_blow_speed > 100
                  ) {
                    message.error("Please Choose Between 0 and 120");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
                // borderBottom: "1.5px solid #000",
              }}
            >
              Drum speed:
              <Input
                name="dryerb_drum_speed"
                value={formData.dryerb_drum_speed}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryerb_drum_speed < 8 ||
                    formData.dryerb_drum_speed > 100
                  ) {
                    message.error("Please Choose Between 8 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Inlet Damper setting:
              <Input
                name="dryerb__intel_drum_speed"
                value={formData.dryerb__intel_drum_speed}
                style={{
                  width: "10em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryerb__intel_drum_speed < 0 ||
                    formData.dryerb__intel_drum_speed > 100
                  ) {
                    message.error("Please Choose Between 0 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Outlet damper setting:
              <Input
                name="dryerb__outlet_drum_speed"
                value={formData.dryerb__outlet_drum_speed}
                style={{
                  width: "9.5em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.dryerb__outlet_drum_speed < 0 ||
                    formData.dryerb__outlet_drum_speed > 100
                  ) {
                    message.error("Please Choose Between 0 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.dryerb_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.dryerb_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("dryerb_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="dryerb_date_prod"
              type="datetime-local"
              value={formData.dryerb_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.dryerb_name_qa}
              value={defaultValueQA || userQA || formData.dryerb_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("dryerb_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="dryerb_date_qa"
              type="datetime-local"
              value={formData.dryerb_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            9
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            WINDER: Set the cutter & Width As per Product Planning. <br /> Keep
            paper tubes of the required size near the m/c. and set the paper
            tubes in the shaft and proper air lock. Thread the fabric from
            let-off stand into the m/c. <br /> Start the winder: Take a sample
            of the 1st shaft of every batch for testing (GSM, thickness, and
            strength of the fabric).
            <br /> Line Speed (mtrs/min) – Min 08 to Max100
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Line Speed:
              <Input
                name="winder_line_speed"
                value={formData.winder_line_speed}
                style={{
                  width: "12em",
                  // marginLeft: "1em",
                }}
                type="number"
                onBlur={() => {
                  if (
                    formData.winder_line_speed < 8 ||
                    formData.winder_line_speed > 100
                  ) {
                    message.error("Please Choose Between 8 and 100");
                  }
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Roll width:
              <Input
                name="winder_roll_width"
                value={formData.winder_roll_width}
                style={{
                  width: "12em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
                // borderBottom: "1.5px solid #000",
              }}
            >
              Roll GSM (g):
              <Input
                name="roll_gsm"
                value={formData.roll_gsm}
                style={{
                  width: "12em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
                disabled={
                  props.loggedInHod ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Roll thickness:
              <Input
                name="winder_roll_thickness"
                value={formData.winder_roll_thickness}
                style={{
                  width: "12em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.winder_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.winder_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("winder_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="winder_date_prod"
              type="datetime-local"
              value={formData.winder_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.winder_name_qa}
              value={defaultValueQA || userQA || formData.winder_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("winder_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="winder_date_qa"
              type="datetime-local"
              value={formData.winder_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            10
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            MAHLO: Switch “ON” the main. Set GSM and moisture as per product
            requirement. <br /> Target GSM{" "}
            <Input
              name="target_gsm"
              value={formData.target_gsm}
              style={{
                width: "10em",
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
                // marginLeft: "1em",
                borderBottom: "1px solid black",
              }}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            ></Input>{" "}
            (± 10 %) <br />
            Target Moisture (%){" "}
            <Input
              name="targer_moisture"
              value={formData.targer_moisture}
              style={{
                width: "10em",
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
                borderBottom: "1px solid black",
                // marginLeft: "1em",
              }}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            ></Input>
            (± 0.5) START traverse movement.
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              1st Shaft No.:
              <Input
                name="mahlo_shaft_no"
                value={formData.mahlo_shaft_no}
                style={{
                  width: "12em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
              }}
            >
              Actual GSM:
              <Input
                name="mahlo_actual_gsm"
                value={formData.mahlo_actual_gsm}
                style={{
                  width: "12em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5em",
                // borderBottom: "1.5px solid #000",
              }}
            >
              Actual Moisture:
              <Input
                name="mahlo_actual_moisture"
                value={formData.mahlo_actual_moisture}
                style={{
                  width: "11em",
                  // marginLeft: "1em",
                }}
                onChange={handleInput}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInQa && qaApproved) ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
              />
            </div>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "11em",
              }}
              // value={formData.mahlo_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.mahlo_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("mahlo_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "11em",
              }}
              name="mahlo_date_prod"
              type="datetime-local"
              value={formData.mahlo_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.mahlo_name_qa}
              value={defaultValueQA || userQA || formData.mahlo_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("mahlo_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="mahlo_date_qa"
              type="datetime-local"
              value={formData.mahlo_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            11
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            LUCID: Switch “ON” desktop with operator log in web inspection
            <br /> Go to create job and Create report of contamination/square
            meter every day. Verify detected contaminations really exist in
            fleece or not. Any abnormalities inform to shift supervisor
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <Radio.Group
              onChange={handleRadio}
              value={formData.lucid_observed_01}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            >
              <Radio value="Yes">YES</Radio>
              <Radio value="No">NO</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>{" "}
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.lucid_name_prod}
              value={
                defaultValue || usernameSupervisor || formData.lucid_name_prod
              }
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("lucid_name_prod", selectedOption)
              }
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="lucid_date_prod"
              type="datetime-local"
              value={formData.lucid_date_prod || currentDateTime}
              onChange={handleInput}
              disabled={
                !props.loggedInSupervisor ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              // value={formData.lucid_name_qa}
              value={defaultValueQA || userQA || formData.lucid_name_qa}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("lucid_name_qa", selectedOption)
              }
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="lucid_date_qa"
              type="datetime-local"
              value={formData.lucid_date_qa || currentDateTimeQA}
              onChange={handleInput}
              disabled={
                !props.loggedInQa ||
                (props.loggedInQa && qaApproved) ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Manufacturing_Steps;
