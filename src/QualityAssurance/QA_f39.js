/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Tabs,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
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

const QA_f39 = () => {
  const initial = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [qa_date, set_qa_date] = useState("");
  const [securitydate, setsecuritydate] = useState("");
  const [dispatch_supervisor_submit_on, setdispatch_supervisor_submit_on] =
    useState("");
  const [qa_manager, setqa_manager] = useState("");
  const [department, setdepartment] = useState("");
  const [bmrno, setbmr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [batchNolist, setBatchNolist] = useState("");
  const [special_req, setspecial_req] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedRow, setSelectedRow] = useState(null);
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [Id, setId] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [stoppagedata, setstoppagedata] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOrderNumbers, setSelectedOrderNumbers] = useState({});
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [getImage4, setGetImage4] = useState("");
  const [Product, setProduct] = useState("");
  const [customer_Name, setcustomer_Name] = useState("");
  const [Ball_Bag, setBall_Bag] = useState("");
  const [Sale_Order_No, setSale_Order_No] = useState("");
  const [Brand, setBrand] = useState("");
  const [Outside_UnderCarriage, setOutside_UnderCarriage] = useState("");
  const [engine, setEngine] = useState("");
  const [tyre, setTyre] = useState("");
  const [truckFloor, setTruckFloor] = useState("");
  const [fuelTank, setFuelTank] = useState("");
  const [cabStorageCompartment, setCabStorageCompartment] = useState("");
  const [airTanks, setAirTanks] = useState("");
  const [driveShafts, setDriveShafts] = useState("");
  const [fifthWheel, setFifthWheel] = useState("");
  const [outsideInsideDoors, setOutsideInsideDoors] = useState("");
  const [insideFloor, setInsideFloor] = useState("");
  const [sideWalls, setSideWalls] = useState("");
  const [frontWalls, setFrontWalls] = useState("");
  const [ceilingRoof, setCeilingRoof] = useState("");
  const [refrigerationUnit, setRefrigerationUnit] = useState("");
  const [exhaust, setExhaust] = useState("");
  const [Condition, setCondition] = useState("");
  const [Fumigation_done, setFumigation_done] = useState("");
  const [roofCondition, setRoofCondition] = useState("");
  const [sidesCondition, setSidesCondition] = useState("");
  const [jointGaps, setJointGaps] = useState("");
  const [rustFree, setRustFree] = useState("");
  const [painted, setPainted] = useState("");
  const [overallCondition, setOverallCondition] = useState("");
  const [cleaned, setCleaned] = useState("");
  const [smellFree, setSmellFree] = useState("");
  const [hasStuffingPlan, setHasStuffingPlan] = useState("");
  const [stuffedAsPerPlan, setStuffedAsPerPlan] = useState("");
  const [numPackagesAsPerPlan, setNumPackagesAsPerPlan] = useState("");
  const [hasContractCopy, setHasContractCopy] = useState("");
  const [stuffedAsPerInstructions, setStuffedAsPerInstructions] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [stuffedAsPerSpecialInstruction, setStuffedAsPerSpecialInstruction] =
    useState("");
  const [polytheneUsed, setPolytheneUsed] = useState("");
  const [polytheneClean, setPolytheneClean] = useState("");
  const [packagesIdentified, setPackagesIdentified] = useState("");
  const [bumper, setbumper] = useState("");
  const [stemer_seal, setstemer_seal] = useState("");
  const [high_security_seal, sethigh_security_seal] = useState("");
  const [Seal_Affixed_Properly, setSeal_Affixed_Properly] = useState("");
  const [Container_No, setContainer_No] = useState("");
  const [Customer, setCustomer] = useState("");
  const [product_desc, setproduct_desc] = useState("");
  const [lot_no, setlot_no] = useState("");
  const [invoice_no, setinvoice_no] = useState("");
  const [one_time_lock, setone_time_lock] = useState("");
  const [Status, setStatus] = useState("");
  const [staindust, setsatindust] = useState("");

  const machineNameLov = [
    { value: "TC10-1", label: "TC10-1 " },
    { value: "TC10-2", label: "TC10-2" },
  ];
  const [rows, setRows] = useState([{}]);
  const { Option } = Select;
  const { date, cir, departments } = state || {};

  const handleKeyPress = (e) => {
    if (
      !/[0-9a-zA-Z._/\- ]/.test(e.key) && // Added space (' ') to the regex pattern
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };

  const roleBase = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
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
  }, [planingDetailsByDate, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.operator_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {});
    }
  }, [planingDetailsByDate, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
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
          //
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
          //
        });
    }
  }, [planingDetailsByDate, API.prodUrl, token]);

  const filteredOrderNumberLov = (index) => {
    const selectedOrderNumbersList = Object.values(selectedOrderNumbers);
    return orderNumberLov.filter(
      (order) =>
        !selectedOrderNumbersList.includes(order.value) ||
        selectedOrderNumbers[index] === order.value
    );
  };

  const handleAddRow = () => {
    // Add a new row and reset the input fields
    setRows([...rows, { bmr: "" }]); // Adding a new row with empty value
    // setBatchNolist("");  // Resetting the batch number or other state
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);

      setSelectedOrderNumbers((prevSelectedOrderNumbers) => {
        const updatedSelectedOrderNumbers = { ...prevSelectedOrderNumbers };
        delete updatedSelectedOrderNumbers[index];
        return updatedSelectedOrderNumbers;
      });
    }
  };

  // total
  const [totalStdPh, setTotalStdPh] = useState("");
  const [totalStdOther, setTotalStdOther] = useState("");
  const [totalPh1S, setTotalPh1S] = useState("");
  const [totalOther1S, setTotalOther1S] = useState("");
  const [totalPh2S, setTotalPh2S] = useState("");
  const [totalOther2S, setTotalOther2S] = useState("");
  const [totalPh3S, setTotalPh3S] = useState("");
  const [totalOther3S, setTotalOther3S] = useState("");
  const [totalPhGS, setTotalPhGS] = useState("");
  const [totalOtherGS, setTotalOtherGS] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };

    fetchOrderNumberOptions();
  }, [token]);

  const datefomrat = moment(date).format("DD/MM/YYYY");

  const handleChange = (value) => {
    setStatus(value);
  };

  const handlechange_seal = (value) => {
    setSeal_Affixed_Properly(value);
  };
  const handlechange_sec = (value) => {
    sethigh_security_seal(value);
  };

  // order based details

  const handleInputChange = (index, name, value) => {
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleBase === "ROLE_QA") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.security_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.qa_mr_status === "WATING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      }
    } else if (roleBase == "DISPATCH_SUPERVISOR") {
      if (
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED"
      ) {
        return "none";
      }
    } else if (roleBase == "SECURITY") {
      if (
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED"
      ) {
        return "none";
      }
    }
  };
  const canDisplayButton2 = () => {
    if (roleBase == "ROLE_QA") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      }
    }

    if (roleBase == "DISPATCH_SUPERVISOR") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED"
      ) {
        return "none"; // Return false for this specific condition
      }
    }

    if (roleBase == "SECURITY") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED"
      ) {
        return "none"; // Return false for this specific condition
      }
    } else {
      if (
        selectedRow?.qa_mr_status == "HOD_APPROVED" ||
        selectedRow?.qa_mr_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canEdit = () => {
    if (roleBase === "ROLE_QA") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_mr_status !== "QA_MR_REJECTED"
      ) {
        return "false"; // Return false for this specific condition
      }
    } else if (roleBase === "SECURITY") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" ||
        selectedRow?.security_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      }
    } else if (roleBase === "DISPATCH_SUPERVISOR") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_REJECTED"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED"
      ) {
        return "false";
      }
    } else if (roleBase === "QA_MANAGER") {
      if (
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false";
      }
    }
  };
  const isEditable = canEdit();

  const issecurity = (roleBase, selectedRow) => {
    if (roleBase === "SECURITY") {
      if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED"
      ) {
        return false; // Disable fields
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.security_status === "SECURITY_REJECTED"
      ) {
        return false; // Disable fields
      } else if (
        selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
        selectedRow?.security_status === "SECURITY_APPROVED" &&
        selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED"
      ) {
        return false; // Disable fields
      }
      return true; // Enable fields for "SECURITY" role
    }
    return false; // Disable fields for other roles
  };

  const isFieldEnabled = (roleBase, selectedRow) => {
    if (roleBase !== "ROLE_QA") {
      return false; // Disable fields if the role is not QA_INSPECTOR
    }

    // Additional conditions for QA_INSPECTOR role
    if (
      selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
      selectedRow?.dispatch_supervisor_status === "WAITING_FOR_APPROVAL"
    ) {
      return false; // Disable fields for this condition
    } else if (
      selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
      selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
      selectedRow?.security_status === "WAITING_FOR_APPROVAL"
    ) {
      return false; // Disable fields for this condition
    } else if (
      selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
      selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
      selectedRow?.security_status === "SECURITY_APPROVED" &&
      selectedRow?.qa_mr_status !== "QA_MR_REJECTED"
    ) {
      return false; // Disable fields for this condition
    }

    return true; // Enable fields by default for QA_INSPECTOR
  };

  const isdispatch = (roleBase, selectedRow) => {
    // Check if the role is DISPATCH_SUPERVISOR
    if (roleBase !== "DISPATCH_SUPERVISOR") {
      return false; // Disable all fields for other roles
    }

    // Additional conditions for DISPATCH_SUPERVISOR role
    if (
      selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
      selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
      selectedRow?.security_status === "WAITING_FOR_APPROVAL"
    ) {
      return false; // Disable fields for this condition
    } else if (
      selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
      selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
      selectedRow?.security_status === "SECURITY_REJECTED"
    ) {
      return false; // Disable fields for this condition
    } else if (
      selectedRow?.qa_inspector_status === "QA_INS_APPROVED" &&
      selectedRow?.dispatch_supervisor_status === "SUPERVISOR_APPROVED" &&
      selectedRow?.security_status === "SECURITY_APPROVED"
    ) {
      return false; // Disable fields for this condition
    }

    return true; // Enable fields by default for DISPATCH_SUPERVISOR
  };

  const canDisplayAddDelete = () => {
    // if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    //   return "none";
    // }
  };

  const handleRejectModal = () => {
    setShowModal(true);
    setRejectRemarks(null);
    //
  };
  const handleReject = async () => {
    // Proceed with the request if role is not QA_MANAGER or if the final conclusion check has passed
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectContainerInspectionReport`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
          finalConclusion: Status, // Final conclusion passed as Status
        },
        { headers }
      );
      message.success(res.data.message);
      navigate("/Precot/QA/F-39/Summary");
    } catch (err) {
      message.error(err.response.data.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchdata_departmentid = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let dep_id = localStorage.getItem("departmentId");

      const foundDepartment = response.data?.find((dept) => {
        // Log each department ID

        const numericDepId = Number(dep_id);

        if (dept.id === numericDepId) {
          // Log if ID is found

          return true; // Return true to indicate a match
        } else {
          // Log if ID is not found
          return false; // Return false to continue searching
        }
      });

      if (foundDepartment) {
        setdepartment(foundDepartment.department);

        fetchData_dep_by_id(foundDepartment.department);
      } else {
        setdepartment("Department not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData_dep_by_id = async () => {
    try {
      setLoading(true);

      const response = await axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/closingBmr?department=${departments}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const firstElements = res.data.map((item) => item[0]);

          const batchOptions = firstElements.map((batch) => ({
            value: batch, // The actual value used by <Select>
            label: batch, // The label shown in the dropdown
          }));
          setbmr(batchOptions);
        });
    } catch (error) {
      // Check if the error is a 403 Forbidden error
      if (error.response && error.response.status === 403) {
        message.warning("You do not have permission to access this form.");
        setTimeout(() => {
          navigate("/Precot/choosenScreen"); // Redirect to the summary page
        }, 1500);
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    // Proceed with the request if role is not QA_MANAGER or if the final conclusion check has passed
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectContainerInspectionReport`,
        {
          id: Id,
          status: "Approve",
          finalConclusion: Status, // Final conclusion passed as Status
        },
        { headers }
      );
      message.success(res.data.message);
      navigate("/Precot/QA/F-39/Summary");
    } catch (err) {
      message.error(err.response.data.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await sendContaminationCheck2();
    } catch (error) {
      console.error(
        "Error saving Request & Issunce of Document - Ensured:",
        error
      );
    }
  };
  const handleSubmit = async () => {
    await sendContaminationCheck();
    setSaveLoading(false);
  };

  const sendContaminationCheck2 = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        unit: "H",
        containerId: Id,
        formatName: "Request & Issuance of Document ",
        formatNo: "PH-QAD01/F-002",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-12",
        department: departments,
        cirNo: cir,
        date: date,
        productDescription: product_desc,
        customer: Customer,
        containerNO: Container_No,
        lotNo: lot_no,
        invoiceNo: invoice_no,
        sealOneTimeLockNo: one_time_lock,
        sealSteamerSealNo: stemer_seal,
        highSecuritySeal: high_security_seal,
        sealAffixPropertyVerified: Seal_Affixed_Properly,
        bumper: bumper || "NOT_OK",
        engine: engine || "NOT_OK",
        tyre: tyre || "NOT_OK",
        truckFloor: truckFloor || "NOT_OK",
        fuelTank: fuelTank || "NOT_OK",
        cabSotrageCompartment: cabStorageCompartment || "NOT_OK",
        airTanks: airTanks || "NOT_OK",
        driveShafts: driveShafts || "NOT_OK",
        fifthWheel: fifthWheel || "NOT_OK",
        outsideUnderCarriage: Outside_UnderCarriage || "NOT_OK",
        outsideInsideDoors: outsideInsideDoors || "NOT_OK",
        insideFloor: insideFloor || "NOT_OK",
        sideWalls: sideWalls || "NOT_OK",
        frontWalls: frontWalls || "NOT_OK",
        ceilingRoof: ceilingRoof || "NOT_OK",
        refrigerationUnit: refrigerationUnit || "NOT_OK",
        exhaust: exhaust || "NOT_OK",
        conditionOfContainer: Condition || "NOT_OK",
        roofFreeFromDamagesHoles: roofCondition || "NOT_OK",
        allTheSidesFreeFromDamagesHoles: sidesCondition || "NOT_OK",
        freeFromJointGraps: jointGaps || "NOT_OK",
        freeFromRust: rustFree || "NOT_OK",
        properlyPainted: painted || "NOT_OK",
        overallGoodCondition: overallCondition || "NOT_OK",
        freeFromStaindirt: staindust || "NOT_OK",
        properlyCleaned: cleaned || "NOT_OK",
        freeFromAnyUnwantedSmell: smellFree || "NOT_OK",
        departmentHavingAnyStuffingPlan: hasStuffingPlan || "NOT_OK",
        stuffedAsPerPlan: stuffedAsPerPlan || "NOT_OK",
        noOfPackagesStuffed: numPackagesAsPerPlan || "NOT_OK",
        departmentHavingCopyOfContract: hasContractCopy || "NOT_OK",
        stuffingIsCarriedOutAsPerInstruction:
          stuffedAsPerSpecialInstruction || "NOT_OK",
        isThereAnySpecialInstruction: specialInstruction || "NOT_OK",
        isTheStuffingIsDoneAsPerSpecialInstruction:
          stuffedAsPerSpecialInstruction || "NOT_OK",
        isPolytheneSheetUsedForFloorCovering: polytheneUsed || "No",
        isPolytheneClean: polytheneClean || "No",
        allThePackagesProperlyIdentified: packagesIdentified || "NOT_OK",
        famigationDone: Fumigation_done || "NOT_OK",
        anyOtherSpecialRequriement: special_req || "NOT_OK",
        remarks: Remarks || "NA",
        finalConclusion: Status,

        details: rows.map((row) => ({
          bmr: row.bmr,
          containerId: row.containerId,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/api/saveContainerInspectionReport`,
        payload,
        { headers }
      );
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QA/F-39/Summary");
      }, 1500);
      message.success("Form  Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Form  !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const sendContaminationCheck = async () => {
    setSaveLoading(true);

    const isValid = () => {
      if (roleBase === "ROLE_QA") {
        if (!Customer) return "Customer is required";
        if (!Container_No) return "Container No is required";
        if (!Status) return "Final Conclusion is required";
      }
      if (roleBase === "DISPATCH_SUPERVISOR") {
        if (!product_desc) return "Product Description is required";
        if (!lot_no) return "Lot No is required";
        if (!invoice_no) return "Invoice No is required";
        if (!one_time_lock) return "One Time Lock No is required";
        if (!stemer_seal) return "Stemer Seal No is required";
      }

      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }

    try {
      const payload = {
        unit: "H",
        formatName: "Request & Issuance of Document ",
        formatNo: "PH-QAD01/F-002",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-12",
        department: departments,
        cirNo: cir,
        date: date,
        productDescription: product_desc,
        customer: Customer,
        containerNO: Container_No,
        lotNo: lot_no,
        invoiceNo: invoice_no,
        sealOneTimeLockNo: one_time_lock,
        sealSteamerSealNo: stemer_seal,
        highSecuritySeal: high_security_seal,
        sealAffixPropertyVerified: Seal_Affixed_Properly,
        bumper: bumper || "NOT_OK",
        engine: engine || "NOT_OK",
        tyre: tyre || "NOT_OK",
        truckFloor: truckFloor || "NOT_OK",
        fuelTank: fuelTank || "NOT_OK",
        cabSotrageCompartment: cabStorageCompartment || "NOT_OK",
        airTanks: airTanks || "NOT_OK",
        driveShafts: driveShafts || "NOT_OK",
        fifthWheel: fifthWheel || "NOT_OK",
        outsideUnderCarriage: Outside_UnderCarriage || "NOT_OK",
        outsideInsideDoors: outsideInsideDoors || "NOT_OK",
        insideFloor: insideFloor || "NOT_OK",
        sideWalls: sideWalls || "NOT_OK",
        frontWalls: frontWalls || "NOT_OK",
        ceilingRoof: ceilingRoof || "NOT_OK",
        refrigerationUnit: refrigerationUnit || "NOT_OK",
        exhaust: exhaust || "NOT_OK",
        conditionOfContainer: Condition || "NOT_OK",
        roofFreeFromDamagesHoles: roofCondition || "NOT_OK",
        allTheSidesFreeFromDamagesHoles: sidesCondition || "NOT_OK",
        freeFromJointGraps: jointGaps || "NOT_OK",
        freeFromRust: rustFree || "NOT_OK",
        properlyPainted: painted || "NOT_OK",
        overallGoodCondition: overallCondition || "NOT_OK",
        freeFromStaindirt: staindust || "NOT_OK",
        properlyCleaned: cleaned || "NOT_OK",
        freeFromAnyUnwantedSmell: smellFree || "NOT_OK",
        departmentHavingAnyStuffingPlan: hasStuffingPlan || "NOT_OK",
        stuffedAsPerPlan: stuffedAsPerPlan || "NOT_OK",
        noOfPackagesStuffed: numPackagesAsPerPlan || "NOT_OK",
        departmentHavingCopyOfContract: hasContractCopy || "NOT_OK",
        stuffingIsCarriedOutAsPerInstruction:
          stuffedAsPerSpecialInstruction || "NOT_OK",
        isThereAnySpecialInstruction: specialInstruction || "NOT_OK",
        isTheStuffingIsDoneAsPerSpecialInstruction:
          stuffedAsPerSpecialInstruction || "NOT_OK",
        isPolytheneSheetUsedForFloorCovering: polytheneUsed || "No",
        isPolytheneClean: polytheneClean || "No",
        allThePackagesProperlyIdentified: packagesIdentified || "NOT_OK",
        famigationDone: Fumigation_done || "NOT_OK",
        anyOtherSpecialRequriement: special_req || "NOT_OK",
        remarks: Remarks || "NA",
        ...(Id && { containerId: Id }),
        finalConclusion: Status,

        details: rows.map((row) => ({
          ...(row.bmr && { bmr: row.bmr }),
          ...(row.containerId && { containerId: row.containerId }),
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/api/SubmitContainerInspectionReport`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-39/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      setSaveLoading(false);
      throw new Error("Failed to submit the form !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-39/Summary");
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchDetailsByDate();

      fetchdata_departmentid();
      fetchData_dep_by_id();
    }
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/findByDateCirNoContainerInspectionReport?date=${date}&cirNo=${cir}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setemptyarraycheck(response.data[0]?.length);
      setPlaningDetailsByDate(response.data[0]);
      setSelectedRow(response.data[0]);

      if (roleBase === "SECURITY") {
        if (response.data[0]?.security_status === "SECURITY_REJECTED") {
          message.warning(
            "QA INSPECTOR Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/QA/F-39/Summary");
          }, 1500);
        } else if (
          response.data[0]?.security_status === "WAITING_FOR_APPROVAL"
        ) {
        }
      }

      if (roleBase === "DISPATCH_SUPERVISOR") {
        if (
          (response.data[0]?.qa_inspector_status == "QA_INS_APPROVED" &&
            response.data[0]?.security_status == "SECURITY_APPROVED" &&
            response.data[0]?.dispatch_supervisor_status ==
              "SUPERVISOR_REJECTED") ||
          response.data[0]?.dispatch_supervisor_status == "" ||
          response.data[0]?.dispatch_supervisor_status == null
        ) {
          message.warning(
            "Dispatch_Supervisor Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/QA/F-39/Summary");
          }, 1500);
        }
      }
      if (roleBase === "QA_MANAGER" || roleBase === "ROLE_DESIGNEE") {
        if (
          (response.data[0]?.security_status === "SECURITY_APPROVED" &&
            response.data[0]?.dispatch_supervisor_status ===
              "SUPERVISOR_APPROVED" &&
            response.data[0]?.qa_mr_status === "QA_MR_REJECTED") ||
          response.data[0]?.qa_mr_status === ""
        ) {
          message.warning(
            "SECURITY Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/QA/F-39/Summary");
          }, 1500);
        }
      }
      if (response.data[0]?.qa_inspector_submit_on) {
        const dateformat_qa = moment(
          response.data[0]?.qa_inspector_submit_on
        ).format("DD/MM/YYYY HH:mm");
        set_qa_date(dateformat_qa);
      } else {
        set_qa_date("");
      }
      if (response.data[0]?.security_submit_on) {
        const dateformat_security = moment(
          response.data[0]?.security_submit_on
        ).format("DD/MM/YYYY HH:mm");
        setsecuritydate(dateformat_security);
      } else {
        setsecuritydate("");
      }
      if (response.data[0]?.dispatch_supervisor_submit_on) {
        const dateformat_dispatch = moment(
          response.data[0]?.dispatch_supervisor_submit_on
        ).format("DD/MM/YYYY HH:mm");
        setdispatch_supervisor_submit_on(dateformat_dispatch);
      } else {
        setdispatch_supervisor_submit_on("");
      }
      if (response.data[0]?.qa_mr_submit_on) {
        const dateformat_qa = moment(response.data[0]?.qa_mr_submit_on).format(
          "DD/MM/YYYY HH:mm"
        );
        setqa_manager(dateformat_qa);
      } else {
        setqa_manager("");
      }
      if (response.data[0]) {
        const data = response.data[0];
        setId(response.data[0]?.containerId);
        setStatus(response.data[0]?.finalConclusion);
        setspecial_req(response.data[0].anyOtherSpecialRequriement);
        setproduct_desc(response.data[0]?.productDescription);
        setCustomer(response.data[0]?.customer);
        setContainer_No(response.data[0]?.containerNO);
        setlot_no(response.data[0]?.lotNo);
        setinvoice_no(response.data[0]?.invoiceNo);
        setone_time_lock(response.data[0]?.sealOneTimeLockNo);
        setstemer_seal(response.data[0]?.sealSteamerSealNo);
        sethigh_security_seal(response.data[0]?.highSecuritySeal);
        setSeal_Affixed_Properly(response.data[0]?.sealAffixPropertyVerified);
        setbumper(response.data[0]?.bumper);
        setEngine(response.data[0]?.engine);
        setTyre(response.data[0]?.tyre);
        setTruckFloor(response.data[0]?.truckFloor);
        setFuelTank(response.data[0]?.fuelTank);
        setCabStorageCompartment(response.data[0]?.cabSotrageCompartment);
        setAirTanks(response.data[0]?.airTanks);
        setDriveShafts(response.data[0]?.driveShafts);
        setFifthWheel(response.data[0]?.fifthWheel);
        setOutside_UnderCarriage(response.data[0]?.outsideUnderCarriage);
        setOutsideInsideDoors(response.data[0].outsideInsideDoors);
        setInsideFloor(response.data[0]?.insideFloor);
        setSideWalls(response.data[0]?.sideWalls);
        setFrontWalls(response.data[0]?.frontWalls);
        setCeilingRoof(response.data[0]?.ceilingRoof);
        setRefrigerationUnit(response.data[0]?.refrigerationUnit);
        setRemarks(response.data[0]?.remarks);
        setExhaust(response.data[0]?.exhaust);
        setCondition(response.data[0]?.conditionOfContainer);
        setRoofCondition(response.data[0]?.roofFreeFromDamagesHoles);
        setSidesCondition(response.data[0]?.allTheSidesFreeFromDamagesHoles);
        setJointGaps(response.data[0]?.freeFromJointGraps);
        setRustFree(response.data[0]?.freeFromRust);
        setPainted(response.data[0]?.properlyPainted);
        setOverallCondition(response.data[0]?.overallGoodCondition);
        setsatindust(response.data[0]?.freeFromStaindirt);
        setCleaned(response.data[0]?.properlyCleaned);
        setSmellFree(response.data[0]?.freeFromAnyUnwantedSmell);
        setHasStuffingPlan(response.data[0]?.departmentHavingAnyStuffingPlan);
        setStuffedAsPerPlan(response.data[0]?.stuffedAsPerPlan);
        setNumPackagesAsPerPlan(response.data[0]?.noOfPackagesStuffed);
        setHasContractCopy(response.data[0]?.departmentHavingCopyOfContract);
        setStuffedAsPerInstructions(
          response.data[0]?.stuffingIsCarriedOutAsPerInstruction
        );
        setSpecialInstruction(response.data[0]?.isThereAnySpecialInstruction);
        setStuffedAsPerSpecialInstruction(
          response.data[0]?.isTheStuffingIsDoneAsPerSpecialInstruction
        );
        setPolytheneUsed(
          response.data[0]?.isPolytheneSheetUsedForFloorCovering
        );
        setPolytheneClean(response.data[0]?.isPolytheneClean);
        setPackagesIdentified(
          response.data[0]?.allThePackagesProperlyIdentified
        );
        setFumigation_done(response.data[0]?.famigationDone);
        setStatus(response.data[0]?.finalConclusion);

        //getimage1->qa_inspector

        //getimage1->qa_inspector
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.qa_inspector_sign}`,
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

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.security_sign}`,
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

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.dispatch_supervisor_sign}`,
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
            setGetImage3(url);
          })
          .catch((err) => {});

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0]?.qa_mr_sign}`,
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
            setGetImage4(url);
          })
          .catch((err) => {});
        if (response.data[0]?.details) {
          setRows(
            response.data[0]?.details.map((item) => ({
              bmr: item.bmr,
              containerId: item.containerId,
            }))
          );
        } else {
          setRows([]);
        }
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    }
  };

  const stateSetters = [
    setbumper,
    setOutside_UnderCarriage,
    setEngine,
    setOutsideInsideDoors,
    setTyre,
    setInsideFloor,
    setTruckFloor,
    setSideWalls,
    setFuelTank,
    setFrontWalls,
    setCabStorageCompartment,
    setCeilingRoof,
    setAirTanks,
    setDriveShafts,
    setFifthWheel,
    setRefrigerationUnit,
    setExhaust,
  ];

  const handleBulkUpdate = (status) => {
    stateSetters.forEach((setter) => setter(status));
  };

  // Usage for different statuses:
  const handleBulkOK = () => handleBulkUpdate("OK");
  const handleBulkNotOK = () => handleBulkUpdate("NOT_OK");
  const handleBulkNA = () => handleBulkUpdate("NA");

  const stateSetters3 = [
    setCondition,
    setHasStuffingPlan,
    setRoofCondition,
    setStuffedAsPerPlan,
    setSidesCondition,
    setNumPackagesAsPerPlan,
    setJointGaps,
    setHasContractCopy,
    setRustFree,
    setStuffedAsPerInstructions,
    setPainted,
    setSpecialInstruction,
    setOverallCondition,
    setStuffedAsPerSpecialInstruction,
    setsatindust,
    setPolytheneUsed,
    setCleaned,

    setPolytheneClean,
    setSmellFree,
    setPackagesIdentified,
    setFumigation_done,
    setspecial_req,
  ];

  const handleBulkUpdate3 = (status) => {
    stateSetters3.forEach((setter) => setter(status));
  };

  // Specific bulk handlers
  const handleBulkOK3 = () => handleBulkUpdate3("OK");
  const handleBulkNOTOK3 = () => handleBulkUpdate3("NOT_OK");
  const handleBulkNA3 = () => handleBulkUpdate3("NA");
  const items = [
    {
      key: "1",
      label: <p>CONTAINER INSPECTION REPORT</p>,
      children: (
        <div>
          <div>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <label>Product Description & Quantity:</label>
                    <TextArea
                      rows="18"
                      cols="30"
                      value={product_desc}
                      style={{ textAlign: "left", width: "100%" }}
                      onChange={(e) => setproduct_desc(e.target.value)}
                      disabled={!isdispatch(roleBase, selectedRow)}
                    />
                  </td>
                  <td>
                    <div>
                      <label>Customer:</label>
                      <Input
                        type="text"
                        value={Customer}
                        style={{ textAlign: "left", width: "100%" }}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setCustomer(e.target.value)}
                        disabled={!isFieldEnabled(roleBase, selectedRow)}
                      />
                    </div>
                    <div>
                      <label>Container No.:</label>
                      <Input
                        type="text"
                        value={Container_No}
                        style={{ textAlign: "left", width: "100%" }}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setContainer_No(e.target.value)}
                        disabled={!isFieldEnabled(roleBase, selectedRow)}
                      />
                    </div>
                    <div>
                      <label>Lot No.:</label>
                      <Input
                        type="text"
                        value={lot_no}
                        style={{ textAlign: "left", width: "100%" }}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setlot_no(e.target.value)}
                        disabled={!isdispatch(roleBase, selectedRow)}
                      />
                    </div>
                    <div>
                      <label>Invoice No.:</label>
                      <Input
                        type="text"
                        value={invoice_no}
                        style={{ textAlign: "left", width: "100%" }}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setinvoice_no(e.target.value)}
                        disabled={!isdispatch(roleBase, selectedRow)}
                      />
                    </div>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td
                            rowSpan="2"
                            style={{
                              verticalAlign: "middle",
                              textAlign: "center",
                              fontSize: "12px",
                              lineHeight: "1",
                            }}
                          >
                            <div>S</div>
                            <div>E</div>
                            <div>A</div>
                            <div>L</div>
                          </td>
                          <td>
                            <label>One Time Lock (OTL) No.:</label>
                            <Input
                              type="text"
                              value={one_time_lock}
                              style={{ textAlign: "left", width: "100%" }}
                              onKeyDown={handleKeyPress}
                              onChange={(e) => setone_time_lock(e.target.value)}
                              disabled={!isdispatch(roleBase, selectedRow)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Stemer Seal No.:</label>
                            <Input
                              type="text"
                              value={stemer_seal}
                              style={{ textAlign: "left", width: "100%" }}
                              onKeyDown={handleKeyPress}
                              onChange={(e) => setstemer_seal(e.target.value)}
                              disabled={!isdispatch(roleBase, selectedRow)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      <label>High Security Seal:</label>
                      <Select
                        placeholder="Select High Security Seal"
                        value={high_security_seal || undefined}
                        style={{ width: "100%" }}
                        onChange={handlechange_sec}
                        disabled={!issecurity(roleBase, selectedRow)}
                      >
                        <Option value="YES">YES</Option>
                        <Option value="NO">NO</Option>
                      </Select>
                    </div>
                    <div>
                      <label>Seal Affixed Properly Verified:</label>
                      <Select
                        placeholder="Select Seal Affixed Properly Verified"
                        value={Seal_Affixed_Properly || undefined}
                        style={{ width: "100%" }}
                        onChange={handlechange_seal}
                        disabled={!issecurity(roleBase, selectedRow)}
                      >
                        <Option value="YES">YES</Option>
                        <Option value="NO">NO</Option>
                      </Select>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>CONTAINER INSPECTION REPORT</p>,
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              type="primary"
              onClick={handleBulkOK}
              style={{ marginRight: "20px" }}
              disabled={!isFieldEnabled(roleBase, selectedRow)}
            >
              Bulk OK
            </Button>
            <Button
              type="primary"
              onClick={handleBulkNotOK}
              style={{ marginRight: "20px" }}
              disabled={!isFieldEnabled(roleBase, selectedRow)}
            >
              Bulk Not OK
            </Button>

            <Button
              type="primary"
              onClick={handleBulkNA}
              disabled={!isFieldEnabled(roleBase, selectedRow)}
            >
              Bulk NA
            </Button>
          </div>

          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td col="100"> 17 POINTS CONTAINER INSPECTION REVIEW</td>
            </tr>
            <tr>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Point No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Points
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Observation
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Point No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Check Points
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Observation
              </th>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                01
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Bumper
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setbumper(e.target.value)}
                  value={bumper}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>

                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                10
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Outside / Under Carriage
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setOutside_UnderCarriage(e.target.value)}
                  value={Outside_UnderCarriage}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                02
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Engine
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setEngine(e.target.value)}
                  value={engine}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                11
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Outside / Inside Doors
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setOutsideInsideDoors(e.target.value)}
                  value={outsideInsideDoors}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                03
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Tyre
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setTyre(e.target.value)}
                  value={tyre}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                12
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                InsideFloor
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setInsideFloor(e.target.value)}
                  value={insideFloor}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                04
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Truck Floor
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setTruckFloor(e.target.value)}
                  value={truckFloor}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                13
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Side (Left & Right) Walls{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setSideWalls(e.target.value)}
                  value={sideWalls}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                05
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Fuel Tank
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setFuelTank(e.target.value)}
                  value={fuelTank}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                14
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Front Walls{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setFrontWalls(e.target.value)}
                  value={frontWalls}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                06
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Cab/Storage Compartment
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setCabStorageCompartment(e.target.value)}
                  value={cabStorageCompartment}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                15
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Ceiling / Roof{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setCeilingRoof(e.target.value)}
                  value={ceilingRoof}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                07
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Air Tanks
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setAirTanks(e.target.value)}
                  value={airTanks}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                16
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Refrigeration Unit
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setRefrigerationUnit(e.target.value)}
                  value={refrigerationUnit}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                08
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Drive Shafts
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setDriveShafts(e.target.value)}
                  value={driveShafts}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                17
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Exhaust{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <Radio.Group
                  onChange={(e) => setExhaust(e.target.value)}
                  value={exhaust}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                09
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Fifth Wheel
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setFifthWheel(e.target.value)}
                  value={fifthWheel}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Radio
                    value="OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="NOT_OK"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NOT OK
                  </Radio>
                  <Radio
                    value="NA"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    NA
                  </Radio>
                </Radio.Group>
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                &nbsp;
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                &nbsp;
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                &nbsp;
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>CONTAINER INSPECTION REPORT</p>,
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              type="primary"
              onClick={handleBulkOK3}
              style={{ marginRight: "20px" }}
              disabled={!isFieldEnabled(roleBase, selectedRow)}
            >
              Bulk OK
            </Button>
            <Button
              type="primary"
              onClick={handleBulkNOTOK3}
              style={{ marginRight: "20px" }}
              disabled={!isFieldEnabled(roleBase, selectedRow)}
            >
              Bulk Not OK
            </Button>

            <Button
              type="primary"
              onClick={handleBulkNA3}
              disabled={!isFieldEnabled(roleBase, selectedRow)}
            >
              Bulk NA
            </Button>
          </div>

          <div>
            <table style={{ width: "100%", margin: "auto" }}>
              <tr>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Sr No.
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Check List
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Result
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Sr No.
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Check List
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Result
                </th>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  01
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Condition of container
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setCondition(e.target.value)}
                    value={Condition}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Department having any stuffing plan
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setHasStuffingPlan(e.target.value)}
                    value={hasStuffingPlan}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  a
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Roof free from damages & holes
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setRoofCondition(e.target.value)}
                    value={roofCondition}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  a
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Stuffed as per plan.
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setStuffedAsPerPlan(e.target.value)}
                    value={stuffedAsPerPlan}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  b
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  All the sides free from damages & hole
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setSidesCondition(e.target.value)}
                    value={sidesCondition}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  b
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  No. of packages stuffed as per plan
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setNumPackagesAsPerPlan(e.target.value)}
                    value={numPackagesAsPerPlan}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  C
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Free from Joint Gaps
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setJointGaps(e.target.value)}
                    value={jointGaps}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  4 a
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Department having copy of contract
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setHasContractCopy(e.target.value)}
                    value={hasContractCopy}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  d
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Free from rust
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setRustFree(e.target.value)}
                    value={rustFree}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  b
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Stuffing is carried out as per instructions?
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) =>
                      setStuffedAsPerInstructions(e.target.value)
                    }
                    value={stuffedAsPerInstructions}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  e
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Properly painted
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setPainted(e.target.value)}
                    value={painted}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  c
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Is there any special instruction?
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setSpecialInstruction(e.target.value)}
                    value={specialInstruction}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  f
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Over all good condition
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setOverallCondition(e.target.value)}
                    value={overallCondition}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  d
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Is the stuffing is done as per special instruction?
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) =>
                      setStuffedAsPerSpecialInstruction(e.target.value)
                    }
                    value={stuffedAsPerSpecialInstruction}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  g
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Free from stains / dirt
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setsatindust(e.target.value)}
                    value={staindust}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  5 a
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Is polythene sheet used for floor covering?
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setPolytheneUsed(e.target.value)}
                    value={polytheneUsed}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      No
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  h
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Properly Cleaned
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setCleaned(e.target.value)}
                    value={cleaned}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  b
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Is polythene clean?
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setPolytheneClean(e.target.value)}
                    value={polytheneClean}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      No
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  i
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Free from any unwanted smell
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setSmellFree(e.target.value)}
                    value={smellFree}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  All the packages properly identified.
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setPackagesIdentified(e.target.value)}
                    value={packagesIdentified}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Fumigation done ?
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={(e) => setFumigation_done(e.target.value)}
                    value={Fumigation_done}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan="15" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Any other Special requirements?
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {" "}
                  <Radio.Group
                    onChange={(e) => setspecial_req(e.target.value)}
                    value={special_req}
                    disabled={!isFieldEnabled(roleBase, selectedRow)}
                  >
                    <Radio
                      value="OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      OK
                    </Radio>
                    <Radio
                      value="NOT_OK"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NOT OK
                    </Radio>

                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
            </table>
          </div>
        </>
      ),
    },
    {
      key: "4",
      label: <p>CONTAINER INSPECTION REPORT</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="100">
                Remarks:
                <TextArea
                  value={Remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  style={{ width: "100%" }}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                />
              </td>
            </tr>
            <br />

            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                CONTAINER INSPECTION REPORT
              </th>
            </tr>
            <tr>
              <th colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                S. No.
              </th>
              <th colSpan="93" style={{ height: "35px", textAlign: "center" }}>
                BMR
              </th>

              <th
                colSpan="5"
                style={{
                  height: "35px",
                  textAlign: "center",
                  display: canDisplayAddDelete(),
                }}
              >
                Delete
              </th>
            </tr>
            {rows.map((row, index) => {
              // Get a list of already selected bmr numbers
              const selectedBmrs = rows
                .map((row) => row.bmr)
                .filter((bmr) => bmr !== null && bmr !== "");

              // Filter options to exclude selected bmr numbers
              const filteredOptions = bmrno.filter(
                (option) => !selectedBmrs.includes(option.value)
              );

              return (
                <tr key={index}>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {index + 1}
                  </td>
                  <td colSpan="93">
                    <input
                      type="text"
                      value={row.bmr}
                      style={{ width: "90%", border: "none", outline: "none" }}
                      onChange={(e) =>
                        handleInputChange(index, "bmr", e.target.value)
                      } // Handle text input
                      disabled={!isdispatch(roleBase, selectedRow)} // Dynamically disable based on role and row conditions
                    />
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    <button
                      onClick={() => handleDeleteRow(index)}
                      style={{ cursor: isEditable ? "not-allowed" : "pointer" }}
                      disabled={!isdispatch(roleBase, selectedRow)}
                    >
                      <FaTrash color="red" />
                    </button>
                  </td>
                </tr>
              );
            })}

            <Button
              onClick={handleAddRow}
              disabled={!isdispatch(roleBase, selectedRow)}
            >
              Add Row
            </Button>
          </table>
        </div>
      ),
    },

    {
      key: "5",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table>
            <tr>
              <td style={{ borderBottom: "1px solid #ffff" }}></td>
              <td style={{ padding: "10px" }}>Description</td>
              <td style={{ padding: "10px" }}>Sign & Date</td>
            </tr>
            <tr>
              <td rowspan="5" style={{ padding: "10px" }}>
                Final Conclusion:
                <Select
                  defaultValue="Select Status"
                  value={Status}
                  style={{ width: "200px" }}
                  onChange={handleChange}
                  disabled={!isFieldEnabled(roleBase, selectedRow)}
                >
                  <Option value="Accepted">Accepted</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </td>

              <td style={{ padding: "10px" }}>
                Container Checked by (Security) :
              </td>
              <td style={{ padding: "10px" }}>
                {(selectedRow?.security_status === "SECURITY_APPROVED" ||
                  selectedRow?.security_status === "SECURITY_REJECTED") && (
                  <>
                    <div>{selectedRow?.security_sign}</div>
                    <div>{securitydate}</div>

                    {getImage2 && (
                      <>
                        <br />
                        <img src={getImage2} alt="logo" className="signature" />
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>
                Reviewed by (Container & Seal - Dispatch) :
              </td>
              <td style={{ padding: "10px" }}>
                {(selectedRow?.dispatch_supervisor_status ===
                  "SUPERVISOR_APPROVED" ||
                  selectedRow?.dispatch_supervisor_status ===
                    "SUPERVISOR_REJECTED") && (
                  <>
                    <div>{selectedRow?.dispatch_supervisor_sign}</div>
                    <div>{dispatch_supervisor_submit_on}</div>

                    {getImage3 && (
                      <>
                        <br />
                        <img src={getImage3} alt="logo" className="signature" />
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Inspected by (QA Inspector) :</td>
              <td style={{ padding: "10px" }}>
                {selectedRow?.qa_inspector_status === "QA_INS_APPROVED" && (
                  <>
                    <div>{selectedRow?.qa_inspector_sign}</div>
                    <div>{qa_date}</div>

                    {getImage1 && (
                      <>
                        <br />
                        <img src={getImage1} alt="logo" className="signature" />
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>
                Approved by (Manager QA/Designee) :
              </td>
              <td style={{ padding: "10px" }}>
                {" "}
                {(selectedRow?.qa_mr_status === "QA_MR_APPROVED" ||
                  selectedRow?.qa_mr_status === "QA_MR_REJECTED") && (
                  <>
                    <div>{selectedRow?.qa_mr_sign}</div>
                    <div>{qa_manager}</div>

                    {getImage4 && (
                      <>
                        <br />
                        <img src={getImage4} alt="logo" className="signature" />
                      </>
                    )}
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
        formName="CONTAINER INSPECTION REPORT"
        formatNo="PH-QAD01-F-039"
        sopNo="PH-QAD01-D-35"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(roleBase === "QA_MANAGER" || roleBase === "ROLE_DESIGNEE"
            ? [
                <Button
                  key="approve"
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
                </Button>,
                <Button
                  key="reject"
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
                </Button>,
              ]
            : [
                <Button
                  key="save"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButton2(),
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<GrDocumentStore color="#00308F" />}
                  shape="round"
                >
                  Submit
                </Button>,
              ]),
          <Button
            key="logout"
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
                navigate("/Precot"); // Ensure navigate is defined or imported
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
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
          </Modal>,
        ]}
      />

      {/* date row */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="CIR No:"
          placeholder="CIR No"
          type="text"
          value={cir}
          disabled
          style={{ width: "30%", height: "35px" }}
        />

        <Input
          addonBefore="Date:"
          placeholder="Date"
          type="text"
          value={datefomrat}
          disabled
          style={{ width: "30%", height: "35px" }}
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

export default QA_f39;
