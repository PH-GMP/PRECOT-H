/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Tooltip,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const { TabPane } = Tabs;
const DryGoods_f10 = () => {
  const location = useLocation();
  const { shift, date } = location.state;
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const [currentPage2, setCurrentPage2] = useState(1);
  const [recordsPerPage2, setRecordsPerPage2] = useState(5);
  const startIndex2 = (currentPage2 - 1) * recordsPerPage2;
  const endIndex2 = startIndex2 + recordsPerPage2;
  const [statusLoader, setStatusLoader] = useState(false);
  const [machineLov, setMachineLov] = useState([]);
  const [supervisorLov, setSupervisorLov] = useState([]);
  const [formData, setFormData] = useState({
    supervisor_status: "",
    supervisor_save_on: "",
    supervisor_save_by: "",
    supervisor_save_id: "",
    supervisor_submit_on: "",
    supervisor_submit_by: "",
    supervisor_submit_id: "",
    supervisor_sign: "",
    hod_status: "",
    hod_save_on: "",
    hod_save_by: "",
    hod_save_id: "",
    hod_submit_on: "",
    hod_submit_by: "",
    hod_submit_id: "",
    hod_sign: "",
    hod_mail_status: "",
    log_id: "",
    date: date,
    shift: shift,
    other_communication: "",
    julain_date: "",
    no_of_sliver: "",
    no_of_woll_roll: "",
    planed_prod_details: "",
    tc_a: "",
    tc_b: "",
    tc_total: "",
    tc_a_brk: "",
    tc_b_brk: "",
    hours_06: "",
    ball_mc_one_a: "",
    ball_mc_one_b: "",
    ball_mc_one_c: "",
    ball_mc_one_total: "",
    ball_mc_two_a: "",
    ball_mc_two_b: "",
    ball_mc_two_c: "",
    ball_mc_two_total: "",
    po_no_one: "",
    millRollProductionDetails: "",
    po_no_two: "",
    po_no_three: "",
    product_name_one: "",
    product_name_two: "",
    product_name_three: "",
    reason: "",
    waste_in_kg: "",
    nxt_prod_sup_date: "",
    nxt_prod_sup_sign: "",
    workAllocationDetails: [
      {
        mc_no: "Pleat Line C1/3 (M/c. 1, 2 & 3)",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "PTC-10 Sliver Making V",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "Pleat M/c. No. 1 (M/c. No. 3)",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "Pleat M/c. No. 2(M/c. No. 4)",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "Links Machine",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "Tex-core Machine",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "Printing",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
      {
        mc_no: "FG Transfer",
        person_req: "",
        person_present: "",
        running: "",
        next: "",
      },
    ],
    manpowerDetails: [
      {
        category: "PH - Male",
        on_pay_roll: "",
        present: "",
        leave: "",
        absent: "",
      },
      {
        category: "PH - Female",
        on_pay_roll: "",
        present: "",
        leave: "",
        absent: "",
      },
      {
        category: "Contract - Male",
        on_pay_roll: "",
        present: "",
        leave: "",
        absent: "",
      },
      {
        category: "Contract - Female",
        on_pay_roll: "",
        present: "",
        leave: "",
        absent: "",
      },
      {
        category: "Total",
        on_pay_roll: "",
        present: "",
        leave: "",
        absent: "",
      },
    ],
    prodDetails: [],
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    supervisor_sign: "",
    nxt_prod_sup_sign: "",
    hod_sign: "",
  });
  const initialized = useRef(false);
  const initialized2 = useRef(false);
  const initialized3 = useRef(false);
  const today = new Date().toISOString().slice(0, 16);
  const paginatedData = formData.consumptionReports
    ? formData.consumptionReports.slice(startIndex, endIndex)
    : [];
  const paginatedData2 = formData.consumptionReports
    ? formData.consumptionReports.slice(startIndex2, endIndex2)
    : [];
  const [selectedMachineLov, setSelectedMachineLov] = useState("");
  const [machine, setMachine] = useState({
    choosedMachine: "",
    clearedMachine: "",
  });

  useEffect(() => {
    const uniqueMachineNames = Array.from(
      new Set(
        formData.prodDetails
          .filter((detail) => !("pln_id" in detail))
          .map((detail) => detail.macine_name)
      )
    );
    console.log("unique machine", uniqueMachineNames);
    const filteredMachineLov = machineLov.filter((option) =>
      uniqueMachineNames.includes(option.value)
    );
    setSelectedMachineLov(filteredMachineLov);
  }, [formData.prodDetails]);

  useEffect(() => {
    if (!initialized3.current) {
      initialized3.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=DRY_GOODS`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const a = response.data
              .filter((option) => option.role == "ROLE_SUPERVISOR")
              .map((option) => ({
                value: option.username,
                label: option.username,
              }));
            setSupervisorLov(a);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  });

  //get data
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        setStatus((prevStatus) => ({
          ...prevStatus,
          fieldStatus: true,
        }));
      }
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/Drygoods/Service/getDryParamF10?date=${date}&shift=${shift}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (
            (!response.data && role !== "ROLE_SUPERVISOR") ||
            (response.data.supervisor_status !== "SUPERVISOR_APPROVED" &&
              role !== "ROLE_SUPERVISOR")
          ) {
            message.warning("Supervisor Yet To Submit");
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-10/Summary");
            }, 1000);
          }
          if (response.data) {
            const data = response.data;
            statusFunction(data);
            setFormData((prevState) => ({
              ...prevState,
              ...data,
            }));
          }
        } catch (error) {
          message.error(error.response.data.message);
          setTimeout(() => {
            navigate("/Precot/DryGoods/F-10/Summary");
          }, 1000);
        }
      };
      fetchData();
    }
  }, [token]);

  const statusFunction = (responseData) => {
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
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
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
      message.warning("Supervisor Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-10/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  useEffect(() => {
    if (!initialized2.current) {
      initialized2.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${ API.prodUrl}/Precot/api/goods/getLogBookMechineNoLov`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const options = response.data.map((options) => ({
            value: options,
            label: options,
          }));

          setMachineLov(options);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, [token]);
  useEffect(() => {
    const signatureKeys = ["nxt_prod_sup_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
      if (username) {
        console.log("usernameparams", username);

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
  }, [token, formData]);

  useEffect(() => {
    console.log("Machine Lov", machineLov);
  }, [machineLov]);

  const handleSave = async () => {
    let apiUrl, payload;
    if (role == "ROLE_SUPERVISOR") {
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/saveLogBookF10`;
      payload = {
        unit: "Unit H",
        formatNo: "PH-PRD04/F-010",
        formatName: "LOG BOOK - DRY GOODS",
        sopNumber: "PH-PRD04-D-03",
        revisionNo: "01",
        date: date,
        shift: shift,
        other_communication: formData.other_communication
          ? formData.other_communication
          : "NA",
        julain_date: formData.julain_date ? formData.julain_date : "NA",
        no_of_sliver: formData.no_of_sliver ? formData.no_of_sliver : "NA",
        no_of_woll_roll: formData.no_of_woll_roll
          ? formData.no_of_woll_roll
          : "NA",
        planed_prod_details: formData.planed_prod_details,
        tc_a: formData.tc_a,
        tc_b: formData.tc_b,
        tc_total: (Number(formData.tc_a) + Number(formData.tc_b)).toFixed(2),
        tc_a_brk: formData.tc_a_brk,
        tc_b_brk: formData.tc_b_brk,
        hours_06: formData.hours_06 ? formData.hours_06 : "NA",
        ball_mc_one_a: formData.ball_mc_one_a,
        ball_mc_one_b: formData.ball_mc_one_b,
        ball_mc_one_c: formData.ball_mc_one_c,
        ball_mc_one_total: (
          Number(formData.ball_mc_one_a) +
          Number(formData.ball_mc_one_b) +
          Number(formData.ball_mc_one_c)
        ).toFixed(2),
        ball_mc_two_a: formData.ball_mc_two_a,
        ball_mc_two_b: formData.ball_mc_two_b,
        ball_mc_two_c: formData.ball_mc_two_c,
        ball_mc_two_total: (
          Number(formData.ball_mc_two_a) +
          Number(formData.ball_mc_two_b) +
          Number(formData.ball_mc_two_c)
        ).toFixed(2),
        po_no_one: formData.po_no_one ? formData.po_no_one : "NA",
        millRollProductionDetails: formData.millRollProductionDetails
          ? formData.millRollProductionDetails
          : "NA",
        po_no_two: formData.po_no_two ? formData.po_no_two : "NA",
        po_no_three: formData.po_no_three ? formData.po_no_three : "NA",
        product_name_one: formData.product_name_one
          ? formData.product_name_one
          : "NA",
        product_name_two: formData.product_name_two
          ? formData.product_name_two
          : "NA",
        product_name_three: formData.product_name_three
          ? formData.product_name_three
          : "NA",
        nxt_prod_sup_date: formData.nxt_prod_sup_date,
        nxt_prod_sup_sign: formData.nxt_prod_sup_sign,
        workAllocationDetails: formData.workAllocationDetails.map((detail) => {
          const workAllocationDetails = {
            mc_no: detail.mc_no,
            person_req: detail.person_req ? detail.person_req : "NA",
            person_present: detail.person_present
              ? detail.person_present
              : "NA",
            running: detail.running ? detail.running : "NA",
            next: detail.next ? detail.next : "NA",
          };
          if (detail.work_id) {
            workAllocationDetails.work_id = detail.work_id;
          }
          return workAllocationDetails;
        }),
        manpowerDetails: formData.manpowerDetails.map((detail) => {
          const manpowerDetails = {
            category: detail.category,
            on_pay_roll: detail.on_pay_roll ? detail.on_pay_roll : "NA",
            present: detail.present ? detail.present : "NA",
            leave: detail.leave ? detail.leave : "NA",
            absent: detail.absent ? detail.absent : "NA",
          };
          if (detail.id) {
            manpowerDetails.id = detail.id;
          }
          return manpowerDetails;
        }),
        prodDetails: formData.prodDetails.map((detail) => {
          const prodDetails = {
            macine_name: detail.macine_name,
            order_no: detail.order_no,
            prod_name: detail.prod_name,
            order_qty: detail.order_qty,
            bag: detail.bag,
            box: detail.box,
            prod_blnc_qty: (detail.order_qty - detail.box).toFixed(2),
          };
          if (detail.pln_id) {
            prodDetails.pln_id = detail.pln_id;
          }
          return prodDetails;
        }),
      };
      if (formData.log_id) {
        payload.log_id = formData.log_id;
      }
      const keysToCheck = [
        "supervisor_status",
        "supervisor_save_on",
        "supervisor_save_id",
        "supervisor_submitted_by",
        "supervisor_submitted_on",
        "supervisor_submitted_id",
        "hod_status",
        "hod_submit_on",
        "hod_submit_by",
        "hod_submit_id",
        "hod_save_on",
        "hod_save_by",
        "hod_save_id",
        "hod_sign",
        "roll_id",
      ];
      keysToCheck.forEach((key) => {
        if (formData[key]) {
          payload[key] = formData[key];
        }
      });
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/approveOrRejectF10`;
      payload = {
        id: formData.log_id,
        status: "Approve",
      };
    }
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_SUPERVISOR" ? axios.post : axios.put;
      const response = await requestMethod(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200 || response.status == 201) {
        let successMsg;
        if (role == "ROLE_SUPERVISOR") {
          successMsg = "Form Saved Succesfully";
        } else {
          successMsg = response.data.message;
        }
        message.success(successMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-10/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setStatusLoader(false);
    }
  };
  const handleSubmit = async () => {
    let apiUrl, payload;
    if (role == "ROLE_SUPERVISOR") {
      const keysToValidate = [
        "tc_a",
        "tc_b",
        "tc_a_brk",
        "tc_b_brk",
        "ball_mc_one_a",
        "ball_mc_one_b",
        "ball_mc_one_c",
        "ball_mc_two_a",
        "ball_mc_two_b",
        "ball_mc_two_c",
        "nxt_prod_sup_date",
        "nxt_prod_sup_sign",
      ];
      const getName = (key) => {
        switch (key) {
          case "tc_a":
            return "TC-10-1";
          case "tc_b":
            return "TC-10-2";
          case "tc_a_brk":
            return "TC-10-1 Breakages";
          case "tc_b_brk":
            return "TC-10-2 Breakages";
 
          case "ball_mc_two_c":
            return "All Required Ball MC-2 production";
          case "nxt_prod_sup_date":
          case "nxt_prod_sup_sign":
            return "Next Production Supervisor Details";
        }
      };
 
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/submitLogBookF10`;
      payload = {
        unit: "Unit H",
        formatNo: "PH-PRD04/F-010",
        formatName: "LOG BOOK - DRY GOODS",
        sopNumber: "PH-PRD04-D-03",
        revisionNo: "01",
        date: date,
        shift: shift,
        other_communication: formData.other_communication
          ? formData.other_communication
          : "NA",
        julain_date: formData.julain_date ? formData.julain_date : "NA",
        no_of_sliver: formData.no_of_sliver ? formData.no_of_sliver : "NA",
        no_of_woll_roll: formData.no_of_woll_roll
          ? formData.no_of_woll_roll
          : "NA",
        planed_prod_details: formData.planed_prod_details,
        tc_a: formData.tc_a,
        tc_b: formData.tc_b,
        tc_total: formData.tc_total,
        tc_a_brk: formData.tc_a_brk,
        tc_b_brk: formData.tc_b_brk,
        hours_06: formData.hours_06 ? formData.hours_06 : "NA",
        ball_mc_one_a: formData.ball_mc_one_a,
        ball_mc_one_b: formData.ball_mc_one_b,
        ball_mc_one_c: formData.ball_mc_one_c,
        ball_mc_one_total: formData.ball_mc_one_total,
        ball_mc_two_a: formData.ball_mc_two_a,
        ball_mc_two_b: formData.ball_mc_two_b,
        ball_mc_two_c: formData.ball_mc_two_c,
        ball_mc_two_total: formData.ball_mc_two_total,
        po_no_one: formData.po_no_one ? formData.po_no_one : "NA",
        millRollProductionDetails: formData.millRollProductionDetails
          ? formData.millRollProductionDetails
          : "NA",
        po_no_two: formData.po_no_two ? formData.po_no_two : "NA",
        po_no_three: formData.po_no_three ? formData.po_no_three : "NA",
        product_name_one: formData.product_name_one
          ? formData.product_name_one
          : "NA",
        product_name_two: formData.product_name_two
          ? formData.product_name_two
          : "NA",
        product_name_three: formData.product_name_three
          ? formData.product_name_three
          : "NA",
        nxt_prod_sup_date: formData.nxt_prod_sup_date,
        nxt_prod_sup_sign: formData.nxt_prod_sup_sign,
        workAllocationDetails: formData.workAllocationDetails.map((detail) => {
          const workAllocationDetails = {
            mc_no: detail.mc_no,
            person_req: detail.person_req ? detail.person_req : "NA",
            person_present: detail.person_present
              ? detail.person_present
              : "NA",
            running: detail.running ? detail.running : "NA",
            next: detail.next ? detail.next : "NA",
          };
          if (detail.work_id) {
            workAllocationDetails.work_id = detail.work_id;
          }
          return workAllocationDetails;
        }),
        manpowerDetails: formData.manpowerDetails.map((detail) => {
          const manpowerDetails = {
            category: detail.category,
            on_pay_roll: detail.on_pay_roll ? detail.on_pay_roll : "NA",
            present: detail.present ? detail.present : "NA",
            leave: detail.leave ? detail.leave : "NA",
            absent: detail.absent ? detail.absent : "NA",
          };
          if (detail.id) {
            manpowerDetails.id = detail.id;
          }
          return manpowerDetails;
        }),
        prodDetails: formData.prodDetails.map((detail) => {
          const prodDetails = {
            macine_name: detail.macine_name,
            order_no: detail.order_no,
            prod_name: detail.prod_name,
            order_qty: detail.order_qty,
            bag: detail.bag,
            box: detail.box,
            prod_blnc_qty: (detail.order_qty - detail.box).toFixed(2),
          };
          if (detail.pln_id) {
            prodDetails.pln_id = detail.pln_id;
          }
          return prodDetails;
        }),
      };
      if (formData.log_id) {
        payload.log_id = formData.log_id;
      }
      const keysToCheck = [
        "supervisor_status",
        "supervisor_save_on",
        "supervisor_save_id",
        "supervisor_submitted_by",
        "supervisor_submitted_on",
        "supervisor_submitted_id",
        "hod_status",
        "hod_submit_on",
        "hod_submit_by",
        "hod_submit_id",
        "hod_save_on",
        "hod_save_by",
        "hod_save_id",
        "hod_sign",
      ];
      keysToCheck.forEach((key) => {
        if (formData[key]) {
          payload[key] = formData[key];
        }
      });
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter The Reason");
        return;
      }
      apiUrl = `${ API.prodUrl}/Precot/api/Drygoods/Service/approveOrRejectF10`;
      payload = {
        id: formData.log_id,
        status: "Reject",
        remarks: formData.reason,
      };
    }
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_SUPERVISOR" ? axios.post : axios.put;
      const response = await requestMethod(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200 || response.status == 201) {
        let successMsg;
        if (role == "ROLE_SUPERVISOR") {
          successMsg = "Form Submitted Succesfully";
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          successMsg = response.data.message;
        }
        message.success(successMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-10/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setStatusLoader(false);
    }
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

  const handleInput = (e, name, field) => {
    const { value } = e.target;
    const index = formData.workAllocationDetails.findIndex(
      (details) => details.mc_no === name
    );
    const updatedDetails = [...formData.workAllocationDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      workAllocationDetails: updatedDetails,
    });
  };
  const handleInputManpower = (e, category, field) => {
    const { value } = e.target;

    setFormData((prevFormData) => {
      const updatedManpowerDetails = prevFormData.manpowerDetails.map(
        (details) => {
          if (details.category === category) {
            return { ...details, [field]: value };
          }
          return details;
        }
      );

      const totalRow = updatedManpowerDetails.find(
        (details) => details.category === "Total"
      );
      if (category !== "Total") {
        const fields = ["on_pay_roll", "present", "leave", "absent"];
        fields.forEach((field) => {
          totalRow[field] = updatedManpowerDetails
            .filter((details) => details.category !== "Total")
            .reduce((sum, details) => {
              const fieldValue = details[field];
              return (
                sum +
                (fieldValue === "NA" ||
                fieldValue === "" ||
                isNaN(parseFloat(fieldValue))
                  ? 0
                  : parseFloat(fieldValue))
              );
            }, 0);
        });
      }

      return { ...prevFormData, manpowerDetails: updatedManpowerDetails };
    });
  };
 
  const handleObjectInput = (e, field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };
  const handleLovChange = (e, field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: e,
    }));
  };
 

  const handleMachineChange = async (selectedMachine) => {
    setMachine((prevState) => ({
      ...prevState,
      choosedMachine: "",
    }));

    for (const detail of formData.prodDetails) {
      if (detail.macine_name == selectedMachine) {
        return;
      }
    }

    let pdeShift;
    switch (shift) {
      case "I":
        pdeShift = 1;
        break;
      case "II":
        pdeShift = 2;
        break;
      case "III":
        pdeShift = 3;
        break;
    }

    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/goods/machinedetailsF009?date=${date}&shift=${pdeShift}&machine_name=${selectedMachine}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        let modifiedData = [];

        response.data.forEach((item, index) => {
          let updatedOrderQty = item.OrderQty; // Default OrderQty

          // Check if the previous object has the same order_no
          if (
            index > 0 &&
            item.OrderNumber === modifiedData[index - 1].order_no
          ) {
            updatedOrderQty =
              modifiedData[index - 1].order_qty - modifiedData[index - 1].box;
          }

          modifiedData.push({
            ...item,
            order_no: item.OrderNumber,
            prod_name: item.Material,
            order_qty: updatedOrderQty, // Corrected OrderQty update logic
            bag: item.Bags,
            box: item.Box,
            macine_name: selectedMachine,
          });
        });

        setFormData((prevState) => ({
          ...prevState,
          prodDetails: [...prevState.prodDetails, ...modifiedData],
        }));
      } else if (response.data.length == 0) {
        message.warning("No Records Found For Selected Machine");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleClearMachine = (selectedMachine) => {
    const updatedProdDetails = formData.prodDetails.filter(
      (detail) =>
        detail.macine_name !== selectedMachine ||
        (detail.macine_name == selectedMachine && "pln_id" in detail)
    );
    setFormData((prevState) => ({
      ...prevState,
      prodDetails: updatedProdDetails,
    }));
    setMachine((prevState) => ({
      ...prevState,
      clearedMachine: "",
    }));
  };

  //---------------------------------------------------------------------------------
  const handleKeyDown_text = (e) => {
 
    if (
      !/[0-9a-zA-Z._]/.test(e.key) && // Exclude the space character from the regex pattern
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault(); // Prevent the default action if the key is not allowed
    }
  };

  const handleKeyDown = (e) => {
    const { value } = e.target;
    if (
      !/[0-9a-zA-Z._]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
    if (
      !/^[0-9.]$/.test(e.key) &&
      e.key !== "N" &&
      e.key !== "A" &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
    if (/^[0-9.]$/.test(e.key) && value.length >= 10) {
      e.preventDefault();
    }
  };
  const handleKeyDown3 = (e) => {
    const { value } = e.target;
    if (
      !/[0-9a-zA-Z._]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
    if (
      !/^[0-9]$/.test(e.key) &&
      e.key !== "N" &&
      e.key !== "A" &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDown2 = (e) => {
    const { value } = e.target;
    if (
      !/^[0-9]$/.test(e.key) &&
      e.key !== "N" &&
      e.key !== "A" &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };
  const handleNumberDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSizeChange = (current, size) => {
    setRecordsPerPage(size);
    setCurrentPage(1);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/DryGoods/F-10/Summary");
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
    console.log("FormData", formData);
  }, [formData]);
  const pageSizeOptions = [
    "5",
    "10",
    "20",
    "50",
    "100",
    formData.workAllocationDetails.length.toString(),
  ].map(Number);
  pageSizeOptions.sort((a, b) => a - b);
  let netWeightTotal = 0;
  paginatedData.forEach((details) => {
    netWeightTotal +=
      details.NetWt == null || details.NetWt == "N/A" ? 0 : details.NetWt;
  });
  const pageSizeOptions2 = [
    "5",
    "10",
    "20",
    "50",
    "100",
    formData.workAllocationDetails.length.toString(),
  ].map(Number);
  pageSizeOptions.sort((a, b) => a - b);
  return (
    <>
      <BleachingHeader
        formName={"LOG BOOK - DRY GOODS"}
        formatNo={"PH-PRD04/F-010"}
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
      <div style={{ margin: "5px" }}>
        <Row gutter={[10, 10]} align="middle">
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Date :"
                value={formatDate(formData.date)}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Shift :"
                value={formData.shift}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="JULAIN DATE :"
                onKeyDown={handleKeyDown3}
                onChange={(e) => {
                  handleObjectInput(e, "julain_date");
                }}
                value={formData.julain_date}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="No. of sliver cans stock: "
                onKeyDown={handleKeyDown2}
                onChange={(e) => {
                  handleObjectInput(e, "no_of_sliver");
                }}
                value={formData.no_of_sliver}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={7}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="No. of roll stock for pleat & wool roll:"
                onKeyDown={handleKeyDown2}
                onChange={(e) => {
                  handleObjectInput(e, "no_of_woll_roll");
                }}
                value={formData.no_of_woll_roll}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              ></Input>
            </Space>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Work Allocation I " key="1">
          <table style={{ width: "80%" }}>
            <thead>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "10px", width: "10%" }}
                >
                  Machine No.
                </td>
                <td style={{ textAlign: "center", width: "20%" }}>
                  Min. No. of Persons Required
                </td>
                <td style={{ textAlign: "center", width: "20%" }}>
                  No. of Persons Present
                </td>
                <td style={{ textAlign: "center", width: "50%" }} colSpan={2}>
                  Product Description
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Pleat Line C1/3 (M/c. 1, 2 & 3)
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown(e)}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat Line C1/3 (M/c. 1, 2 & 3)",
                        "person_req"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat Line C1/3 (M/c. 1, 2 & 3)",
                        "person_present"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}> Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat Line C1/3 (M/c. 1, 2 & 3)",
                        "running"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Pleat Line C1/3 (M/c. 1, 2 & 3)", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat Line C1/3 (M/c. 1, 2 & 3)"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  TC-10 Sliver Making V
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "PTC-10 Sliver Making V", "person_req");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "PTC-10 Sliver Making V"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "PTC-10 Sliver Making V",
                        "person_present"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "PTC-10 Sliver Making V"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "PTC-10 Sliver Making V", "running");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "PTC-10 Sliver Making V"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "PTC-10 Sliver Making V", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "PTC-10 Sliver Making V"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Pleat M/c. No. 1 (M/c. No. 3)
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat M/c. No. 1 (M/c. No. 3)",
                        "person_req"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat M/c. No. 1 (M/c. No. 3)",
                        "person_present"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat M/c. No. 1 (M/c. No. 3)",
                        "running"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Pleat M/c. No. 1 (M/c. No. 3)", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 1 (M/c. No. 3)"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
        <TabPane tab="Work Allocation II " key="2">
          <table style={{ width: "80%" }}>
            <thead>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "10px", width: "10%" }}
                >
                  Machine No.
                </td>
                <td style={{ textAlign: "center", width: "20%" }}>
                  Min. No. of Persons Required
                </td>
                <td style={{ textAlign: "center", width: "20%" }}>
                  No. of Persons Present
                </td>
                <td style={{ textAlign: "center", width: "50%" }} colSpan={2}>
                  Product Description
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Pleat M/c. No. 2(M/c. No. 4)
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat M/c. No. 2(M/c. No. 4)",
                        "person_req"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Pleat M/c. No. 2(M/c. No. 4)",
                        "person_present"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Pleat M/c. No. 2(M/c. No. 4)", "running");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Pleat M/c. No. 2(M/c. No. 4)", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no === "Pleat M/c. No. 2(M/c. No. 4)"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Wool Roll M/c. No. 1 (M/c. No. 5 & 6)
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)",
                        "person_req"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no ===
                          "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)",
                        "person_present"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no ===
                          "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)",
                        "running"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no ===
                          "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(
                        e,
                        "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)",
                        "next"
                      );
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) =>
                          details.mc_no ===
                          "Wool Roll M/c. No. 1 (M/c. No. 5 & 6)"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Links Machine{" "}
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "Links Machine", "person_req");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Links Machine"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "Links Machine", "person_present");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Links Machine"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Links Machine", "running");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Links Machine"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Links Machine", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Links Machine"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
        <TabPane tab="Work Allocation III " key="3">
          <table style={{ width: "80%" }}>
            <thead>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "10px", width: "10%" }}
                >
                  Machine No.
                </td>
                <td style={{ textAlign: "center", width: "20%" }}>
                  Min. No. of Persons Required
                </td>
                <td style={{ textAlign: "center", width: "20%" }}>
                  No. of Persons Present
                </td>
                <td style={{ textAlign: "center", width: "50%" }} colSpan={2}>
                  Product Description
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Tex-core Machine{" "}
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "Tex-core Machine", "person_req");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Tex-core Machine"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "Tex-core Machine", "person_present");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Tex-core Machine"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Tex-core Machine", "running");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Tex-core Machine"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Tex-core Machine", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Tex-core Machine"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  Printing{" "}
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "Printing", "person_req");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Printing"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "Printing", "person_present");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Printing"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Printing", "running");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Printing"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "Printing", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "Printing"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  FG Transfer{" "}
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "FG Transfer", "person_req");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "FG Transfer"
                      )?.person_req
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={2}>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      handleInput(e, "FG Transfer", "person_present");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "FG Transfer"
                      )?.person_present
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>Running</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "FG Transfer", "running");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "FG Transfer"
                      )?.running
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Next</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    onChange={(e) => {
                      handleInput(e, "FG Transfer", "next");
                    }}
                    value={
                      formData.workAllocationDetails.find(
                        (details) => details.mc_no === "FG Transfer"
                      )?.next
                    }
                    style={{ textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
        <TabPane tab="Man Power Details" key="4">
          <table style={{ width: "70%" }}>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>Category</td>
              <td style={{ textAlign: "center", padding: "10px" }}>
                On Pay Roll
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>Present</td>
              <td style={{ textAlign: "center", padding: "10px" }}>Leave</td>
              <td style={{ textAlign: "center", padding: "10px" }}>Absent</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                PH - Male
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Male", "on_pay_roll");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Male"
                    )?.on_pay_roll
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Male", "present");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Male"
                    )?.present
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Male", "leave");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Male"
                    )?.leave
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Male", "absent");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Male"
                    )?.absent
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                PH - Female
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Female", "on_pay_roll");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Female"
                    )?.on_pay_roll
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Female", "present");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Female"
                    )?.present
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Female", "leave");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Female"
                    )?.leave
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "PH - Female", "absent");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "PH - Female"
                    )?.absent
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Contract - Male
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Male", "on_pay_roll");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Male"
                    )?.on_pay_roll
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Male", "present");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Male"
                    )?.present
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Male", "leave");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Male"
                    )?.leave
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Male", "absent");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Male"
                    )?.absent
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                Contract - Female
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Female", "on_pay_roll");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Female"
                    )?.on_pay_roll
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Female", "present");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Female"
                    )?.present
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Female", "leave");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Female"
                    )?.leave
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    handleInputManpower(e, "Contract - Female", "absent");
                  }}
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Contract - Female"
                    )?.absent
                  }
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>Total</td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Total"
                    )?.on_pay_roll
                  }
                  style={{ textAlign: "center" }}
                  readOnly
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Total"
                    )?.present
                  }
                  style={{ textAlign: "center" }}
                  readOnly
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Total"
                    )?.leave
                  }
                  style={{ textAlign: "center" }}
                  readOnly
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Input
                  type="text"
                  value={
                    formData.manpowerDetails.find(
                      (details) => details.category === "Total"
                    )?.absent
                  }
                  style={{ textAlign: "center" }}
                  readOnly
                ></Input>
              </td>
            </tr>
            <br></br>
            <tr>
              <td style={{ padding: "10px" }} colSpan={5}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label style={{ marginTop: "15px" }}>
                    If any other Communication :
                  </label>
                  <TextArea
                    style={{ width: "80%" }}
                    onChange={(e) =>
                      handleObjectInput(e, "other_communication")
                    }
                    value={formData.other_communication}
                    readOnly={status.fieldStatus}
                  ></TextArea>
                </div>
              </td>
            </tr>
          </table>
        </TabPane>
        {/* Tab 5 */}
        <TabPane tab="Planned Production Details" key="5">
          <div
            style={{
              width: "70%",
              margin: "0 auto",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ fontSize: "14px", marginRight: "10px" }}>
                <b>Select Machine : &nbsp;</b>
              </label>
              <Select
                options={machineLov}
                value={machine.choosedMachine}
                onChange={(value) => handleMachineChange(value)}
                style={{ textAlign: "center", width: "100px" }}
                dropdownStyle={{ textAlign: "center" }}
                disabled={status.fieldStatus}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                style={{ fontSize: "14px", marginRight: "10px", color: "red" }}
              >
                <b>Clear Machine : &nbsp;</b>
              </label>
              <Select
                options={selectedMachineLov}
                value={machine.clearedMachine}
                onChange={(value) => handleClearMachine(value)}
                style={{ textAlign: "center", width: "100px" }}
                dropdownStyle={{ textAlign: "center" }}
                disabled={status.fieldStatus}
              />
            </div>
          </div>
          <table style={{ width: "70%" }}>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                {" "}
                S.No.
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={2}>
                {" "}
                Machine Name
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                {" "}
                Order Number
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                {" "}
                Product Name
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                {" "}
                Order Qty Required (Box)
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                {" "}
                Production Packed
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                {" "}
                Production Balance Qty. to be Packed (Box)
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> Box</td>
              <td style={{ textAlign: "center", padding: "10px" }}>Bags</td>
            </tr>
            {formData.prodDetails.map((detail, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {" "}
                  {index + 1}
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {detail.macine_name}
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {detail.order_no}
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {detail.prod_name}
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {detail.order_qty}
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {detail.box}
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {detail.bag}
                </td>
                <td style={{ textAlign: "center", padding: "5px" }}>
                  {(detail.order_qty - detail.box).toFixed(2)}
                </td>
              </tr>
            ))}
          </table>
        </TabPane>
        <TabPane tab="Sliver Production Details" key="6">
          <table style={{ width: "70%" }}>
            <tr>
              <td
                style={{ textAlign: "center", padding: "10px", width: "30%" }}
              >
                TC-10-1{" "}
              </td>
              <td style={{ width: "35%" }}>
                <Input
                  type="number"
                  onChange={(e) => handleObjectInput(e, "tc_a")}
                  value={formData.tc_a}
                  style={{ textAlign: "center" }}
                  onKeyDown={handleNumberDown}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ width: "35%" }} colSpan={2}>
                &nbsp;Ball MC-1 production:{" "}
                <Input
                  type="number"
                  onChange={(e) => handleObjectInput(e, "ball_mc_one_a")}
                  value={formData.ball_mc_one_a}
                  style={{ width: "150px", textAlign: "center" }}
                  onKeyDown={handleNumberDown}
                  readOnly={status.fieldStatus}
                />{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", padding: "10px", width: "30%" }}
              >
                TC-10-2{" "}
              </td>
              <td style={{ width: "35%" }}>
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "tc_b")}
                  value={formData.tc_b}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ width: "35%" }} colSpan={2}>
                &nbsp;Ball MC-1 production:{" "}
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "ball_mc_one_b")}
                  value={formData.ball_mc_one_b}
                  style={{ width: "150px", textAlign: "center" }}
                  readOnly={status.fieldStatus}
                />{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", padding: "10px", width: "30%" }}
              >
                Total
              </td>
              <td style={{ width: "35%", textAlign: "center" }}>
                {(Number(formData.tc_a) + Number(formData.tc_b)).toFixed(2)}
              </td>
              <td style={{ width: "35%" }} colSpan={2}>
                &nbsp;Ball MC-1 production:{" "}
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "ball_mc_one_c")}
                  value={formData.ball_mc_one_c}
                  style={{ width: "150px", textAlign: "center" }}
                  readOnly={status.fieldStatus}
                />{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", padding: "10px", width: "30%" }}
              >
                TC-10-1 Breakages{" "}
              </td>
              <td style={{ width: "35%" }}>
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "tc_a_brk")}
                  value={formData.tc_a_brk}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ width: "35%" }} colSpan={2}>
                &nbsp;Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ marginLeft: "80px" }}>
                  {" "}
                  {(
                    Number(formData.ball_mc_one_a) +
                    Number(formData.ball_mc_one_b) +
                    Number(formData.ball_mc_one_c)
                  ).toFixed(2)}
                </span>{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", padding: "10px", width: "30%" }}
              >
                TC-10-2 Breakages{" "}
              </td>
              <td style={{ width: "35%" }}>
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "tc_b_brk")}
                  value={formData.tc_b_brk}
                  style={{ textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ width: "35%" }} colSpan={2}>
                &nbsp;Ball MC-2 production:{" "}
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "ball_mc_two_a")}
                  value={formData.ball_mc_two_a}
                  style={{ width: "150px", textAlign: "center" }}
                  readOnly={status.fieldStatus}
                />{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", padding: "10px", width: "30%" }}
              >
                Total{" "}
              </td>
              <td style={{ width: "35%", textAlign: "center" }}>
                {" "}
                {(
                  Number(formData.tc_a_brk) + Number(formData.tc_b_brk)
                ).toFixed(2)}
              </td>
              <td style={{ width: "35%" }} colSpan={2}>
                &nbsp;Ball MC-2 production:{" "}
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "ball_mc_two_b")}
                  value={formData.ball_mc_two_b}
                  style={{ width: "150px", textAlign: "center" }}
                  readOnly={status.fieldStatus}
                />{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2} rowSpan={2}>
                {" "}
                Waste In Kg :{" "}
                <Input
                  type="number"
                  onKeyDown={handleKeyDown2}
                  onChange={(e) => handleObjectInput(e, "hours_06")}
                  value={formData.hours_06}
                  style={{ width: "150px", textAlign: "center" }}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td colSpan={2}>
                {" "}
                &nbsp;Ball MC-2 production:{" "}
                <Input
                  type="number"
                  onKeyDown={handleNumberDown}
                  onChange={(e) => handleObjectInput(e, "ball_mc_two_c")}
                  value={formData.ball_mc_two_c}
                  style={{ width: "150px", textAlign: "center" }}
                  readOnly={status.fieldStatus}
                />{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", width: "50px", padding: "10px" }}
              >
                {" "}
                Total :{" "}
                {(
                  Number(formData.ball_mc_two_a) +
                  Number(formData.ball_mc_two_b) +
                  Number(formData.ball_mc_two_c)
                ).toFixed(2)}{" "}
              </td>
              <td style={{ textAlign: "center", width: "50px" }}>
                {" "}
                Grand Total :{" "}
                {(
                  Number(formData.ball_mc_one_a) +
                  Number(formData.ball_mc_one_b) +
                  Number(formData.ball_mc_one_c) +
                  Number(formData.ball_mc_two_a) +
                  Number(formData.ball_mc_two_b) +
                  Number(formData.ball_mc_two_c)
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
        </TabPane>
        <TabPane tab="Mini Roll Production Details" key="7">
          <div
            style={{
              display: "flex",
              textAlign: "center",
              marginBottom: "1rem",
              justifyContent: "center",
            }}
          >
            <label>Mini Roll Production Details: </label>{" "}
            <Input
              type="text"
              onChange={(e) => {
                handleObjectInput(e, "millRollProductionDetails");
              }}
              style={{ width: "250px", textAlign: "center" }}
              value={formData.millRollProductionDetails}
              readOnly={status.fieldStatus}
            ></Input>
          </div>
          <table style={{ width: "70%" }}>
            <tr>
              <td style={{ textAlign: "center" }}>
                PO NO :{" "}
                <Input
                  type="text"
                  onChange={(e) => {
                    handleObjectInput(e, "po_no_one");
                  }}
                  style={{ width: "150px", textAlign: "center" }}
                  value={formData.po_no_one}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                Product Name :{" "}
                <Input
                  type="text"
                  onChange={(e) => {
                    handleObjectInput(e, "product_name_one");
                  }}
                  style={{ width: "150px", textAlign: "center" }}
                  value={formData.product_name_one}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                PO NO :{" "}
                <Input
                  type="text"
                  onChange={(e) => {
                    handleObjectInput(e, "po_no_two");
                  }}
                  style={{ width: "150px", textAlign: "center" }}
                  value={formData.po_no_two}
                  readOnly={status.fieldStatus}
                ></Input>{" "}
              </td>
              <td style={{ textAlign: "center" }}>
                Product Name :{" "}
                <Input
                  type="text"
                  onChange={(e) => {
                    handleObjectInput(e, "product_name_two");
                  }}
                  style={{ width: "150px", textAlign: "center" }}
                  value={formData.product_name_two}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                PO NO :{" "}
                <Input
                  type="text"
                  onChange={(e) => {
                    handleObjectInput(e, "po_no_three");
                  }}
                  style={{ width: "150px", textAlign: "center" }}
                  value={formData.po_no_three}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
              <td style={{ textAlign: "center" }}>
                Product Name :{" "}
                <Input
                  type="text"
                  onChange={(e) => {
                    handleObjectInput(e, "product_name_three");
                  }}
                  style={{ width: "150px", textAlign: "center" }}
                  value={formData.product_name_three}
                  readOnly={status.fieldStatus}
                ></Input>
              </td>
            </tr>
          </table>
        </TabPane>
        <TabPane tab="Reviews" key="8">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  Production Supervisor Sign & Date
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "40%" }}>
                  Handed over to Next Production Supervisor Sign & Date
                </td>

                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  HOD/DESIGNEE Sign & Date
                </td>
              </tr>
              <tr>
                <td colspan="1" style={{ height: "35%", textAlign: "center" }}>
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
                        {formatDateAndTime(formData.supervisor_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.supervisor_sign ? (
                        <img
                          src={eSign.supervisor_sign}
                          alt="Supervisor eSign"
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
                <td
                  colspan="1"
                  style={{ height: "30%", textAlign: "center", padding: "5px" }}
                >
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
                        <Select
                          style={{ width: "100%", textAlign: "center" }}
                          options={supervisorLov}
                          value={formData.nxt_prod_sup_sign}
                          onChange={(e) => {
                            handleLovChange(e, "nxt_prod_sup_sign");
                          }}
                          dropdownStyle={{ textAlign: "center" }}
                          disabled={status.fieldStatus}
                        >
                          {" "}
                        </Select>
                        <br />
                        <Input
                          type="dateTime-local"
                          style={{ width: "100%" }}
                          value={formData.nxt_prod_sup_date}
                          max={today}
                          onChange={(e) => {
                            handleObjectInput(e, "nxt_prod_sup_date");
                          }}
                          readOnly={status.fieldStatus}
                        ></Input>
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.nxt_prod_sup_sign ? (
                        <img
                          src={eSign.nxt_prod_sup_sign}
                          alt="Supervisor eSign"
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
                  {/* <div>
                  <Select style={{ width: '50%',textAlign:'center' }} options={supervisorLov} value={formData.nxt_prod_sup_sign} onChange={(e) => {handleLovChange(e,'nxt_prod_sup_sign')}} dropdownStyle={{textAlign:'center'}} disabled={status.fieldStatus}> </Select><br></br><br></br>
                  <Input type="dateTime-local" style={{ width: '60%' }} value={formData.nxt_prod_sup_date} max={today} onChange={(e) => {handleObjectInput(e,'nxt_prod_sup_date')}} readOnly={status.fieldStatus}></Input>
                  <div style={{ marginLeft: "20px" }}>
                      {eSign.supervisor_sign ? (
                        <img
                          src={eSign.supervisor_sign}
                          alt="Supervisor eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div> */}
                </td>
                <td colspan="1" style={{ height: "35%", textAlign: "center" }}>
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
                            {formatDateAndTime(formData.hod_submit_on)}
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
                          ) : null}
                        </div>
                      </div>
                    )}
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default DryGoods_f10;
