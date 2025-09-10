import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
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
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_F018 = () => {
  const [count, setcount] = useState("");
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [production_date, setproduction_date] = useState("");
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [customer_name, setcustomer_name] = useState("");
  const [product_name, setproduct_name] = useState("");
  const [customer_complaint_ref, setcustomer_complaint_ref] = useState("");
  const [sales_orderno, setsales_orderno] = useState("");
  const [Batch_No, setBatch_No] = useState("");
  const [Container_No, setContainer_No] = useState("");
  const [Complaint_Sample_Received, setComplaint_Sample_Received] =
    useState("");
  const [Strength_of_Product, setStrength_of_Product] = useState("");
  const [Lesser_count, setLesser_count] = useState("");
  const [corrective_action, setcorrective_action] = useState("");
  const [id, setid] = useState("");
  const [verification_for_effectiveness, setverification_for_effectiveness] =
    useState("");
  const { Option } = Select;
  const [Packing, setPacking] = useState("");
  const [Contamination, setContamination] = useState("");
  const [Critical, setCritical] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [Grammage, setGrammage] = useState("");
  const [Less_Qty, setLess_Qty] = useState("");
  const [Major, setMajor] = useState("");
  const [Chemical, setChemical] = useState("");
  const [CCFNo, setCCFNo] = useState("");
  const [complaint_Reeived_date, setcomplaint_Reeived_date] = useState("");
  const [others, setothers] = useState("");
  const [Nature_of_Non_Conformity, setNature_of_Non_Conformity] = useState("");
  const [why1, setwhy1] = useState("");
  const [why2, setwhy2] = useState("");
  const [why3, setwhy3] = useState("");
  const [why4, setwhy4] = useState("");
  const [why5, setwhy5] = useState("");
  const [Invoice_No, setInvoice_No] = useState("");
  const [date, setdate] = useState("");
  const [department, setdepartment] = useState("");
  const [minor, setminor] = useState("");
  const [CH_remark, setCH_remark] = useState("");
  const [loading, setLoading] = useState(true);
  const [remarks, setremarks] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [supersigndate, setsupersigndate] = useState(false);
  const [operator_signsignaturedate, setoperator_signsignaturedate] =
    useState("");
  const [hodsign, sethodsigndate] = useState("");
  const [sample_received_on, setsample_received_on] = useState("");
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const [selectedRow, setSelectedRow] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [complaint_replied_on, setcomplaint_replied_on] = useState("");
  const [Target_Date, setTarget_Date] = useState("");
  const [financialYear, setfinancialYear] = useState("");
  const initial = useRef(false);
  const roleBase = localStorage.getItem("role");
  const onChange = (key) => {
    //
  };
  const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const location = useLocation();
  const { state } = location;
  const { ccfno } = state || {};

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const departmentMap = {
    1: "BLEACHING",
    2: "SPUNLACE",
    3: "PAD_PUNCHING",
    4: "DRY_GOODS",
    5: "QUALITY_CONTROL",
    6: "QUALITY_ASSURANCE",
    7: "PPC",
    8: "STORE",
    9: "DISPATCH",
    10: "PRODUCT_DEVELOPMENT",
    11: "ENGINEERING",
    12: "COTTON_BUDS",
    13: "MARKETING",
    14: "HR",
  };
  const storedIds = localStorage.getItem("departmentId");

  const getDepartmentName = storedIds
    ?.split(",")
    .map((id) => departmentMap[parseInt(id)])
    .filter(Boolean)
    .join(",");

  const Desginee_access = getDepartmentName?.includes("QUALITY_ASSURANCE");
  const canDisplayButtons_reject = () => { };
  const canDisplayButtons = () => {
    if (
      roleBase === "QA_MANAGER" ||
      (roleBase === "ROLE_DESIGNEE" && Desginee_access)
    ) {
      console.log("(roleBase === ROLE_DESIGNEE && Desginee_access)")
      if (
        selectedRow?.qa_mr_status == "QA_MR_SUBMITTED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      } else if (
        selectedRow?.qa_mr_status == "QA_MR_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (
      roleBase == "ROLE_HOD" ||
      (roleBase == "ROLE_DESIGNEE" && !Desginee_access)
    ) {
      console.log("")
      if (
        selectedRow?.qa_mr_status == "QA_MR_SUBMITTED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      } else if (selectedRow?.hod_status == "HOD_REJECTED") {
        return "none";
      }
    }
  };
  const canDisplayButton2 = () => {
    if (
      roleBase === "QA_MANAGER" ||
      (roleBase === "ROLE_DESIGNEE" && Desginee_access)
    ) {
      if (
        selectedRow &&
        selectedRow?.qa_mr_status === "QA_MR_SUBMITTED" &&
        selectedRow?.hod_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
        selectedRow?.hod_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
        selectedRow?.hod_status === "HOD_APPROVED"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_mr_status === "QA_MR_SUBMITTED" &&
        selectedRow?.hod_status === "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_mr_status === "QA_MR_SUBMITTED" &&
        selectedRow?.hod_status === "HOD_APPROVED"
      ) {
        return "none"; // Added condition to check for HOD_APPROVED
      }
    }
    if (
      roleBase === "ROLE_HOD" ||
      (roleBase == "ROLE_DESIGNEE" && !Desginee_access)
    ) {
      if (selectedRow?.hod_status === "HOD_APPROVED") {
        return "none";
      }
    }
  };
  const canEdit = () => {
    if (
      roleBase === "QA_MANAGER" ||
      (roleBase === "ROLE_DESIGNEE" && Desginee_access)
    ) {
      if (
        selectedRow?.qa_mr_status === "QA_MR_SUBMITTED" &&
        selectedRow?.hod_status === "HOD_APPROVED"
      ) {
        return "false"; // Return false for this specific condition
      }

      if (
        (selectedRow?.qa_mr_status === "QA_MR_SUBMITTED" ||
          selectedRow?.qa_mr_status === "QA_MR_APPROVED") &&
        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status === "HOD_APPROVAL")
      ) {
        return "true";
      }
      if (
        selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
        selectedRow?.hod_status === "HOD_APPROVED"
      ) {
        return "false";
      }
    } else if (
      roleBase === "ROLE_HOD" ||
      (roleBase == "ROLE_DESIGNEE" && !Desginee_access)
    ) {
      return !(
        selectedRow &&
        selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
        (selectedRow?.hod_status === "HOD_APPROVED" ||
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL")
      );
    } else {
      return false;
    }
  };
  const isEditable = canEdit();

  const fetchData_ccfno_data = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getByparam?ccf_no=${ccfno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.length === 0 || res.data == undefined) {
          } else {
            if (res.data.hod_submit_on) {
              const dateformat_hod = moment(res.data.hod_submit_on).format(
                "DD/MM/YYYY HH:mm"
              );
              sethodsigndate(dateformat_hod);
            } else {
              sethodsigndate("");
            }
            if (res.data.qa_mr_submit_on) {
              const dateformat_supervisor = moment(
                res.data.qa_mr_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setsupersigndate(dateformat_supervisor);
            } else {
              setsupersigndate("");
            }
            if (res.data.operator_submitted_on) {
              const dateformat_op = moment(
                res.data.operator_submitted_on
              ).format("DD/MM/YYYY HH:mm");
              setoperator_signsignaturedate(dateformat_op);
            } else {
              setoperator_signsignaturedate("");
            }
          }

          if (
            res.data &&
            (res.data.length > 0 || res.data.length == undefined)
          ) {
            setwhy1(res.data.why1);
            setwhy2(res.data.why2);
            setwhy3(res.data.why3);
            setwhy4(res.data.why4);
            setwhy5(res.data.why5);
            setdate(res.data.date);
            setcomplaint_replied_on(res.data.complaint_replied_on);
            setAvailableShiftslov(res.data.department);
            setid(res.data.complaint_id);
            setSelectedRow(res.data);
            setComplaint_Sample_Received(res.data.complaint_sample_received);
            setcomplaint_Reeived_date(res.data.complaint_received_date);
            setInvoice_No(res.data.invoice_no);
            setcustomer_name(res.data.customer_name);
            setproduct_name(res.data.product_name);
            setcustomer_complaint_ref(res.data.customer_complaint_ref_no);
            setBatch_No(res.data.batch_no);
            setsales_orderno(res.data.sale_order_no);
            setContainer_No(res.data.container_no);
            setproduction_date(res.data.production_date);
            setcomplaint_replied_on(res.data.complaint_replied_on);
            setsample_received_on(res.data.sample_received_on);
            setStrength_of_Product(res.data.strength_of_product);
            setLesser_count(res.data.lesser_count);
            setPacking(res.data.packing);
            setContamination(res.data.contamination);
            setChemical(res.data.chemical);
            setGrammage(res.data.grammage);
            setLess_Qty(res.data.less_qty);
            setothers(res.data.others);
            let yesCount = 0;

            // Check each property and increment the counter if the value is "yes"
            if (res.data.strength_of_product === "YES") yesCount++;
            if (res.data.lesser_count === "YES") yesCount++;
            if (res.data.packing === "YES") yesCount++;
            if (res.data.contamination === "YES") yesCount++;
            if (res.data.chemical === "YES") yesCount++;
            if (res.data.grammage === "YES") yesCount++;
            if (res.data.less_qty === "YES") yesCount++;
            if (res.data.others !== "NA") yesCount++;

            setcount(yesCount);
            setMajor(res.data.major);
            setminor(res.data.minor);
            setCritical(res.data.critical);
            setremarks(res.data.remarks);

            setNature_of_Non_Conformity(res.data.nature_of_non_conformity);
            setcorrective_action(res.data.corrective_action);
            setverification_for_effectiveness(
              res.data.verification_for_effectiveness
            );
            setTarget_Date(res.data.target_date);

            fetchdata_departmentid();
            if (ccfno) {
              setCCFNo(ccfno);
              const financialYear = CCFNo.split("/")[0];
              setfinancialYear(financialYear);
            } else {
              setCCFNo(CCFNo); // Use the entered value if ccNo doesn't exist
              const financialYear = CCFNo.split("/")[0];
              setfinancialYear(financialYear);
            }
            if (
              roleBase === "ROLE_HOD" ||
              (roleBase == "ROLE_DESIGNEE" &&
                !Desginee_access)
            ) {
              if (res.data?.hod_status === "HOD_REJECTED") {
                message.warning(
                  "QA MANAGER Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/QA/F-18/Summary");
                }, 1500);
              }
            }
            if (
              roleBase === "ROLE_HOD" ||
              roleBase === "QA_MANAGER" ||
              roleBase == "ROLE_DESIGNEE"
            ) {
              // Allow access to the form
            } else {
              message.warning(
                "The current user role does not have access to the form."
              );
              setTimeout(() => {
                navigate("/Precot/QA/F-18/Summary");
              }, 1500);
            }

            setemptyarraycheck(res.data.length);

            //opimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.operator_sign}`,
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
                setGetImageOP(url);
              })
              .catch((err) => {
                //
              });

            //---------------------------------------
            //supimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.qa_mr_sign}`,
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
                setGetImageSUP(url);
              })
              .catch((err) => {
                //
              });

            //---------------------------------------
            //opimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hod_sign}`,
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
                setGetImageHOD(url);
              })
              .catch((err) => {
                //
              });
          } else {
          }
        });

      // Assuming the response data structure matches the payload structure you provided
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    try {
      customercomplaint_submit();

      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };
  const handlePrint = () => {
    window.print();
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
      const ccfno = response.data.map((shift) => shift.department);
      setAvailableShifts(ccfno);
      let dep_id = localStorage.getItem("departmentId");

      const foundDepartment = response.data.find((dept) => {
        // Log each department ID

        const numericDepId = Number(dep_id);

        if (dept.id === numericDepId) {
          return true;
        } else {
          // Log if ID is not found
          return false; // Return false to continue searching
        }
      });

      if (foundDepartment) {
        setdepartment(foundDepartment.department);
      } else {
        setdepartment("Department not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-18/Summary");
  };

  const customercomplaint_save = () => {
    const isValid = () => {
      if (!date) return " Date is required";
      if (!CCFNo) return " CCF No is required";
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }

    if (date) {
      const date1 = date;
      const date_month = moment(date1, "YYYY-MM-DD");
      const year = date_month.year();
      const month = date_month.format("MMMM");
      setyear(year);
      setmonth(month);

      setSaveLoading(true);
      const financialYear = CCFNo.split("/")[0];
      const payload = {
        complaint_id: id,
        format_name: "Customer Complaint Register Form",
        format_no: "PH-QAD01/F-018",
        revision_no: 3,
        sop_number: "PH-QAD01-D-19",
        unit: "Unit H",
        date: date,
        month: month,
        year: year,
        financial_year: financialYear,
        department: availableshiftlov,
        ccf_no: CCFNo,
        complaint_received_date: complaint_Reeived_date,
        customer_name: customer_name,
        customer_complaint_ref_no: customer_complaint_ref,
        batch_no: Batch_No,
        production_date: production_date,
        invoice_no: Invoice_No,
        product_name: product_name,
        sale_order_no: sales_orderno,
        container_no: Container_No,
        complaint_sample_received: Complaint_Sample_Received,
        strength_of_product: Strength_of_Product || "NA",
        packing: Packing || "NA",
        grammage: Grammage || "NA",
        chemical: Chemical || "NA",
        lesser_count: Lesser_count || "NA",
        contamination: Contamination || "NA",
        less_qty: Less_Qty || "NA",
        others: others || "NA",
        count_of_nature_of_complaints: count,
        critical: Critical || "NA",
        major: minor || "NA",
        minor: Major || "NA",
        nature_of_non_conformity: Nature_of_Non_Conformity || "NA",
        why1: why1 || "NA",
        why2: why2 || "NA",
        why3: why3 || "NA",
        why4: why4 || "NA",
        why5: why5 || "NA",
        corrective_action: corrective_action || "NA",
        verification_for_effectiveness: verification_for_effectiveness || "NA",
        target_date: Target_Date,
        sample_received_on: sample_received_on,
        complaint_replied_on: complaint_replied_on,
      };

      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      axios
        .post(
          `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/Save`,
          payload,
          { headers }
        )
        .then((res) => {
          setSaveLoading(false);
          message.success("Form Saved successfully");
          navigate("/Precot/QA/F-18/Summary");
        })
        .catch((err) => {
          setSaveLoading(false);

          message.error(err.response.data.message);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
  };

  const handleSave = async () => {
    try {
      customercomplaint_save();

      setSaveBtnStatus(true); // Example to disable after saving
      setSubmitBtnStatus(true);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  //SAve API

  const customercomplaint_submit = () => {


    const isValid = () => {
      if (!date) return " Date is required";
      if (!complaint_Reeived_date) return "Complaint Received Date is required";
      if (!Invoice_No) return "Invoice No is required";
      if (!availableshiftlov) return "Department is required";
      if (availableshiftlov == "Select Department") {
        return "Department is required";
      }
      if (!customer_name) return "Customer Name is required";
      if (!product_name) return "Product Name is required";
      if (!customer_complaint_ref) return "Customer Complaint Ref is required";
      if (!sales_orderno) return "SaleOrder Number is required";
      if (!Batch_No) return "Batch No is required";
      if (!Container_No) return "Container No is required";
      if (!production_date) return "Production Date is required";


      if (Complaint_Sample_Received === "YES") {
        console.log("yes")
        if (!sample_received_on) return "Sample received is required";
      }
      if (!Complaint_Sample_Received)
        return "Complaint Sample Received  is required";
      if (!complaint_Reeived_date) return "Complaint Reeived Date  is required";
      if (!complaint_replied_on) return "Complaint Replied On  is required";
      if (!Target_Date) return "Target Date  is required";

      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);

    if (date) {
      const date1 = date;
      const date_month = moment(date1, "YYYY-MM-DD");
      const year = date_month.year();
      const month = date_month.format("MMMM");
      setyear(year);
      setmonth(month);
      setSaveLoading(true);

      const financialYear = CCFNo.split("/")[0];

      // Format the payload according to the API documentation
      const payload = {
        complaint_id: id,
        format_name: "Customer Complaint Register Form",
        format_no: "PH-QAD01/F-018",
        revision_no: 3,
        sop_number: "PH-QAD01-D-19",
        unit: "Unit H",
        date: date,
        month: month,
        year: year,
        financial_year: financialYear,
        department: availableshiftlov,
        ccf_no: CCFNo,
        complaint_received_date: complaint_Reeived_date,
        customer_name: customer_name,
        customer_complaint_ref_no: customer_complaint_ref,
        batch_no: Batch_No,
        production_date: production_date,
        invoice_no: Invoice_No,
        product_name: product_name,
        sale_order_no: sales_orderno,
        container_no: Container_No,
        complaint_sample_received: Complaint_Sample_Received,
        strength_of_product: Strength_of_Product || "NA",
        packing: Packing || "NA",
        grammage: Grammage || "NA",
        chemical: Chemical || "NA",
        lesser_count: Lesser_count || "NA",
        contamination: Contamination || "NA",
        less_qty: Less_Qty || "NA",
        others: others || "NA",
        count_of_nature_of_complaints: count,
        critical: Critical || "NA",
        major: minor || "NA",
        minor: Major || "NA",
        nature_of_non_conformity: Nature_of_Non_Conformity || "NA",
        why1: why1 || "NA",
        why2: why2 || "NA",
        why3: why3 || "NA",
        why4: why4 || "NA",
        why5: why5 || "NA",
        corrective_action: corrective_action || "NA",
        verification_for_effectiveness: verification_for_effectiveness || "NA",
        target_date: Target_Date,
        sample_received_on: sample_received_on,
        complaint_replied_on: complaint_replied_on,
      };
      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      axios
        .post(
          `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/Submit`,
          payload,
          { headers }
        )
        .then((res) => {
          message.success("Form Submitted successfully");
          navigate("/Precot/QA/F-18/Summary");
        })
        .catch((err) => {
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
  };

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
  const handleKeyPress_space = (e) => {
    if (
      !/[0-9a-zA-Z./]/.test(e.key) && // Removed '_' and '-'
      e.key !== " " && // Allow space bar
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

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/F-18/Summary");
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: remarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/F-18/Summary");
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchData_ccfno_data();
    }
  }, [token]);

  const allowedDepartments = [
    "BLEACHING",
    "SPUNLACE",
    "COTTON_BUDS",
    "DRY_GOODS",
    "PAD_PUNCHING"
  ];

  const items = [
    {
      key: "1",
      label: <p>CUSTOMER COMPLAINT REGISTER FORM</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  CCF No.:
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={CCFNo}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setCCFNo(e.target.value)}
                    disabled
                  />
                </td>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Date.:
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="date"
                    value={date}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    max={getCurrentDate()}
                    onChange={(e) => setdate(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Department:{" "}
                </td>
                <td colSpan={16}>
                  <Select
                    style={{
                      width: "100%",
                      height: "40x",
                      borderRadius: "0px",
                      border: "1px solid #dddd",
                      backgroundColor: "white",
                    }}
                    placeholder="Select Department"
                    value={availableshiftlov}
                    onChange={setAvailableShiftslov}
                    disabled={isEditable}
                  >
                    {availableshift
                      .filter((shiftvalue => allowedDepartments.includes(shiftvalue)))
                      .map((shiftvalue, index) => {

                        return (
                          <Option key={index} value={shiftvalue}>
                            {shiftvalue}
                          </Option>
                        )
                      })}
                  </Select>
                </td>

                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Complaint Received Date:{" "}
                </td>

                <td colSpan={16} style={{ textAlign: "center" }}>
                  <Input
                    type="date"
                    value={complaint_Reeived_date}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setcomplaint_Reeived_date(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Invoice No. / Date:
                </td>

                <td colSpan={16} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={Invoice_No}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setInvoice_No(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Customer Name:{" "}
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={customer_name}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setcustomer_name(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Product Name:
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={product_name}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setproduct_name(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Customer Complaint Ref. No.:{" "}
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={customer_complaint_ref}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setcustomer_complaint_ref(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Sale Order No. /Date:{" "}
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={sales_orderno}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setsales_orderno(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Batch No. / Lot No. /FG No.:
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={Batch_No}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setBatch_No(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Container No.:{" "}
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={Container_No}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setContainer_No(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Production Date:
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={production_date}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setproduction_date(e.target.value)}
                    disabled={isEditable}
                  />
                </td>

                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Sample Received On :
                </td>
                <td colSpan={25}>
                  <Input
                    type="date"
                    value={sample_received_on}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setsample_received_on(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Complaint Sample Received On:
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Radio.Group
                    onChange={(e) =>
                      setComplaint_Sample_Received(e.target.value)
                    }
                    value={Complaint_Sample_Received}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NO
                    </Radio>
                  </Radio.Group>
                </td>

                <td colSpan={25} style={{ paddingLeft: "10px" }}>
                  Complaint Replied On:
                </td>

                <td colSpan={25} style={{ textAlign: "center" }}>
                  <Input
                    type="date"
                    value={complaint_replied_on}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setcomplaint_replied_on(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={100}
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Nature of Complaint:
                </td>
              </tr>
              <tr>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Strength of Product
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setStrength_of_Product(e.target.value)}
                    value={Strength_of_Product}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Lesser count
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setLesser_count(e.target.value)}
                    value={Lesser_count}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Classification:
                </td>
              </tr>

              <tr>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Packing:
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setPacking(e.target.value)}
                    value={Packing}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Contamination:
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setContamination(e.target.value)}
                    value={Contamination}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Critical :
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setCritical(e.target.value)}
                    value={Critical}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
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
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Grammage (GSM){" "}
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setGrammage(e.target.value)}
                    value={Grammage}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Less Qty, (Load ability)
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setLess_Qty(e.target.value)}
                    value={Less_Qty}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Major
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setMajor(e.target.value)}
                    value={Major}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
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
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Chemical; pH
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setChemical(e.target.value)}
                    value={Chemical}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NA"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      NA
                    </Radio>
                  </Radio.Group>
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Others:
                </td>
                <td colSpan={16}>
                  <Input
                    type="text"
                    value={others}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setothers(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  Minor
                </td>
                <td colSpan={16} style={{ paddingLeft: "10px" }}>
                  <Radio.Group
                    onChange={(e) => setminor(e.target.value)}
                    value={minor}
                    disabled={isEditable}
                  >
                    <Radio
                      value="YES"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CheckOutlined Left color="#00308F" />}
                    </Radio>
                    <Radio
                      value="NO"
                      style={{ fontSize: "11px", marginLeft: "0px" }}
                    >
                      {<CloseOutlined Left color="#00308F" />}
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
                <td colSpan={100}>
                  Nature of Non-Conformity (in detail) :
                  <Input
                    type="text"
                    value={Nature_of_Non_Conformity}
                    style={{ textAlign: "left", width: "100%" }}
                    onKeyDown={handleKeyPress}
                    onChange={(e) =>
                      setNature_of_Non_Conformity(e.target.value)
                    }
                    disabled={isEditable}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>CUSTOMER COMPLAINT REGISTER FORM -2</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colSpan={100} style={{ paddingLeft: "10px" }}>
                  Complaint Investigation / Analysis:
                </td>
              </tr>
              <tr>
                <td colSpan={100}>
                  Why1
                  <Input
                    type="text"
                    value={why1}
                    style={{ textAlign: "left", width: "100%" }}
                    onKeyDown={handleKeyPress_space}
                    onChange={(e) => setwhy1(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={100}>
                  Why2:
                  <Input
                    type="text"
                    value={why2}
                    style={{ textAlign: "left", width: "100%" }}
                    onKeyDown={handleKeyPress_space}
                    onChange={(e) => setwhy2(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={100}>
                  Why3:
                  <Input
                    type="text"
                    value={why3}
                    style={{ textAlign: "left", width: "100%" }}
                    onKeyDown={handleKeyPress_space}
                    onChange={(e) => setwhy3(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={100}>
                  Why4:
                  <Input
                    type="text"
                    value={why4}
                    style={{ textAlign: "left", width: "100%" }}
                    onKeyDown={handleKeyPress_space}
                    onChange={(e) => setwhy4(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={100}>
                  Why5:
                  <Input
                    type="text"
                    value={why5}
                    style={{ textAlign: "left", width: "100%" }}
                    onKeyDown={handleKeyPress_space}
                    onChange={(e) => setwhy5(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },

    {
      key: "4",
      label: <p>CUSTOMER COMPLAINT REGISTER FORM-3</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colspan={70} rowSpan={2}>
                  <div>Corrective Action / Preventive Action:</div>

                  <textarea
                    value={corrective_action}
                    onKeyDown={handleKeyPress_space}
                    rows="4" // Number of rows
                    cols="60" // Number of columns
                    style={{ width: "100%" }}
                    onChange={(e) => setcorrective_action(e.target.value)}
                    placeholder="Type your text here..."
                    disabled={isEditable}
                  />
                </td>
                <td colSpan={30}>
                  {" "}
                  Responsibility
                  {(selectedRow?.hod_status === "HOD_APPROVED" ||
                    selectedRow?.hod_status === "HOD_REJECTED") && (
                      <>
                        <div>{selectedRow?.hod_sign}</div>
                        <div>{hodsign}</div>

                        {getImageHOD && (
                          <>
                            <br />
                            <img
                              src={getImageHOD}
                              alt="logo"
                              className="signature"
                            />
                          </>
                        )}
                      </>
                    )}
                </td>
              </tr>
              <tr>
                <td colSpan={30}>
                  Target Date :
                  <Input
                    type="date"
                    value={Target_Date}
                    style={{ textAlign: "center", width: "100%" }}
                    onKeyDown={handleKeyPress_space}
                    min={getCurrentDate()}
                    onChange={(e) => setTarget_Date(e.target.value)}
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colspan={70} rowSpan={2}>
                  <div>
                    Verification for Effectiveness of Action(s) Taken :{" "}
                  </div>

                  <textarea
                    value={verification_for_effectiveness}
                    onKeyDown={handleKeyPress_space}
                    rows="4" // Number of rows
                    cols="60" // Number of columns
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      setverification_for_effectiveness(e.target.value)
                    }
                    placeholder="Type your text here..."
                    disabled={isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={30} style={{ textAlign: "center" }}>
                  {selectedRow?.qa_mr_status === "QA_MR_APPROVED" && (
                    <>
                      <div>{selectedRow?.qa_mr_sign}</div>
                      <div>{supersigndate}</div>

                      {getImageSUP && (
                        <>
                          <br />
                          <img
                            src={getImageSUP}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                  <div style={{ width: "100%" }}>
                    --------------------------------------
                  </div>
                  <div style={{ width: "100%" }}>
                    (Signature of Manager - QA)
                  </div>
                </td>
              </tr>
            </tbody>
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
        formName="CUSTOMER COMPLAINT REGISTER FORM"
        formatNo="PH-QAD01/F-018"
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
          roleBase === "ROLE_HOD" ||
            (roleBase === "ROLE_DESIGNEE" && !Desginee_access)
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

              // Only render the Reject button if the roleBase is "ROLE_HOD"
              roleBase === "ROLE_HOD" ||
                (roleBase === "ROLE_DESIGNEE" &&
                  !Desginee_access) ? (
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
                  icon={<img src={approveIcon} alt="Approve Icon" />}
                  onClick={handleRejectModal}
                  shape="round"
                >
                  &nbsp;Reject
                </Button>
              ) : null,
            ]
            : [
              (roleBase === "QA_MANAGER" ||
                (roleBase === "ROLE_DESIGNEE" &&
                  Desginee_access)) &&
                selectedRow?.qa_mr_status === "QA_MR_SUBMITTED" &&
                selectedRow?.hod_status === "HOD_APPROVED" ? (
                <Button
                  key="approve"
                  loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons_reject(),
                  }}
                  icon={<img src={rejectIcon} alt="Reject Icon" />}
                  onClick={handleApprove}
                  shape="round"
                >
                  &nbsp;Approve
                </Button>
              ) : null,
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
            ],
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
                value={remarks}
                onChange={(e) => setremarks(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>,
        ]}
      />

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
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

export default QA_F018;
