import { Button, Input, message, Modal, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import approveIcon from "../Assests/outlined-approve.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_F002 = () => {

  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");

  const [print, printdata] = useState("");
  const [comments, setcomments] = useState("");
  const [id, setid] = useState("");
  const [Critical, setCritical] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [supersigndate, setsupersigndate] = useState(false);
  const [operator_signsignaturedate, setoperator_signsignaturedate] =
    useState("");
  const [hodsign, sethodsigndate] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [dateprintsec, setisdateprintsec] = useState(false);
  const initial = useRef(false);
  const roleBase = localStorage.getItem("role");
  const onChange = (key) => { };
  const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();

  const [rows, setRows] = useState([
    {
      documentName: "",
      documentNo: "",
      revisionNo: "",
      typeOfCopy: "",
      numberOfCopies: "",
      documentGivenBy: "",
      documentCollectedBy: "",
      remark: "",
    },
  ]);
  const { state } = location;

  const { datevalue, department_name } = state || {};
  console.log("datevalue, department_name", datevalue, department_name)
  const [years, months] = datevalue.split("-");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthString = monthNames[parseInt(months, 10) - 1];
  const datefomrat = moment(datevalue).format("DD/MM/YYYY");
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

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Handle add new row
  const handleAddRow = () => {
    const newRow = {
      documentName: "",
      documentNo: "",
      revisionNo: "",
      typeOfCopy: "",
      numberOfCopies: "",
      documentGivenBy: "",
      remark: "",
    }; // New empty row
    setRows([...rows, newRow]);
  };

  // Handle delete row
  const handleDeleteRow = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (isConfirmed) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1); // Remove row at the specified index
      setRows(updatedRows);
    }
  };

  // Handle input change for each row
  const handleInputChange = (field, value, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const canDisplayButtons = () => {
    if (
      roleBase === "ROLE_HOD" ||
      roleBase === "ROLE_DESIGNEE" ||
      roleBase === "ROLE_SUPERVISOR"
    ) {
      if (
        selectedRow?.qa_hod_designee_status == "HOD_DESIGNEE_APPROVED" && // Not submitted
        (selectedRow?.qa_mr_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_mR_status == "QA_MR_APPROVED")
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      } else if (
        selectedRow?.qa_hod_designee_status == "HOD_DESIGNEE_APPROVED" && // Not submitted
        selectedRow?.qa_mr_status == "QA_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (roleBase == "QA_MANAGER" || roleBase == "ROLE_MR") {
      if (
        selectedRow?.qa_hod_designee_status == "QA_INSPECTOR_SUBMITTED" && // Not submitted
        selectedRow?.qa_mr_status == "QA_MR_APPROVED"
      ) {
        return "none";
      } else if (selectedRow?.qa_mr_status == "QA_REJECTED") {
        return "none";
      } else if (
        selectedRow?.qa_mr_status == "QA_MR_APPROVED" &&
        selectedRow?.qa_hod_designee_status == "HOD_DESIGNEE_APPROVED"
      ) {
        return "none";
      }
    }
  };

  const canDisplayButton2 = () => {
    if (
      roleBase === "ROLE_HOD" ||
      roleBase === "ROLE_DESIGNEE" ||
      roleBase === "ROLE_SUPERVISOR"
    ) {
      if (
        selectedRow &&
        // Approved condition
        selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_SUBMITTED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_APPROVED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_APPROVED" &&
        selectedRow?.qa_mr_status === "QA_MR_APPROVED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      } else if (
        (selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_SUBMITTED" ||
          selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_APPROVED") &&
        selectedRow?.qa_mr_status === "QA_MR_REJECTED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      } else if (
        selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_SUBMITTED" &&
        selectedRow?.qa_mr_status === "QA_MANAGER_APPROVED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      }
    }

    if (roleBase === "QA_MANAGER" || roleBase == "ROLE_MR") {
      if (
        selectedRow?.qa_mr_status === "QA_MR_APPROVED" ||
        selectedRow?.qa_mr_status === "QA_MR_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_mr_status == "QA_MR_APPROVED" &&
        selectedRow?.qa_hod_designee_status == "HOD_DESIGNEE_APPROVED"
      ) {
        return "none";
      }
    }
  };

  const canEdit = () => {
    if (
      roleBase === "ROLE_HOD" ||
      roleBase === "ROLE_DESIGNEE" ||
      roleBase === "ROLE_SUPERVISOR"
    ) {
      if (
        selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_APPROVED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false";
      }

      if (
        selectedRow?.qa_hod_designee_status === "HOD_DESIGNEE_APPROVED" &&
        selectedRow?.qa_mr_status === "QA_MR_APPROVED"
      ) {
        return "false";
      }
    }
  };
  const isEditable = canEdit();

  const fetchData_date = async () => {
    const [years, months, day] = datevalue.split("-");
    const monthString = monthNames[parseInt(months, 10) - 1];
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/api/findRequestAndIssunceOfDocument?date=${datevalue}&month=${monthString}&year=${years}&department=${department_name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setid(res.data[0]?.requestId);

          if (roleBase === "QA_MANAGER" || roleBase === "ROLE_MR") {
            if (res.data[0] === 0 || res.data[0] == undefined) {
              setTimeout(() => {
                navigate("/Precot/QA/F-002/Summary");
                message.info("No Data found to approve");
              }, 500);
            }
          }
          if (res.data[0] === 0 || res.data[0] == undefined) {
          } else {
            if (res.data[0]?.qa_hod_designee_save_on) {
              const dateformat_hod = moment(
                res.data[0]?.qa_hod_designee_save_on
              ).format("DD/MM/YYYY HH:mm");
              sethodsigndate(dateformat_hod);
            } else {
              sethodsigndate("");
            }
            if (res.data[0]?.qa_mr_submit_on) {
              const dateformat_supervisor = moment(
                res.data[0]?.qa_mr_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setsupersigndate(dateformat_supervisor);
            } else {
              setsupersigndate("");
            }
          }

          if (
            res.data[0] &&
            (res.data[0]?.length > 0 || res.data[0]?.length == undefined)
          ) {

            setid(res.data[0]?.requestId);
            setSelectedRow(res.data[0]);
            setcomments(res.data[0].comments);

            if (roleBase === "QA_MANAGER" || roleBase == "ROLE_MR") {
              if (res.data[0]?.qa_mr_status === "QA_MR_REJECTED") {
                message.warning(
                  "ROLE HOD Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/QA/F-002/Summary");
                }, 1500);
              }
            }

            setemptyarraycheck(res.data[0]?.length);

            //---------------------------------------
            //supimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.qa_mr_sign}`,
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
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.qa_hod_designee_sign}`,
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

            //---------------------------------------
          } else {
          }

          if (res.data[0]?.details) {
            setRows(
              res.data[0]?.details.map((item) => ({
                lineId: item.lineId,
                department: item.item_description || "NA",
                documentName: item.documentName || "NA",
                documentNo: item.documentNo || "NA",
                revisionNo: item.revisionNo || "NA",
                typeOfCopy: item.typeOfCopy || "NA",
                numberOfCopies: item.numberOfCopies || "NA",
                documentGivenBy: item.documentGivenBy,
                documentCollectedBy: item.documentCollectedBy,
                reason: item.reason || "NA",
                remark: item.remark,
                requestId: id,
              }))
            );
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



  const handleSubmit = async () => {
    try {
      const invalidRowIndex = rows.findIndex(
        (row) =>
          !row.documentName ||
          !row.documentNo ||
          !row.revisionNo ||
          !row.typeOfCopy ||
          !row.numberOfCopies
      );

      if (invalidRowIndex !== -1) {
        message.error(`Record is required for  S.No.${invalidRowIndex + 1}`);
        setSaveLoading(false);
      } else {
        listofsharptools_submit();
        setSaveBtnStatus(true);
        setSubmitBtnStatus(true);
      }

    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };
  const handlePrint = () => {
    window.print();
  };




  const handleBack = () => {
    navigate("/Precot/QA/F-002/Summary");
  };

  const sharptools_save = () => {
    const isValid = () => { };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }

    setSaveLoading(true);

    const [years, months, day] = datevalue.split("-"); // Split the date into day, month, year

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthString = monthNames[parseInt(months, 10) - 1];

    const payload = {
      requestId: id,
      formatName: "Request & Issuance of Document",
      formatNo: "PH-QAD01/F-002",
      revisionNumber: 2,
      sopNumber: "PH-QAD01-D-12",
      unit: "Unit H",
      date: datevalue,
      department: department_name,
      month: monthString,
      year: years,
      comments: comments || "NA",
      details: rows.map((row) => ({
        lineId: row.lineId,
        department: department_name,
        documentName: row.documentName,
        documentNo: row.documentNo,
        revisionNo: row.revisionNo,
        typeOfCopy: row.typeOfCopy,
        numberOfCopies: row.numberOfCopies,
        documentGivenBy: row.documentGivenBy,
        reason: row.reason,
        remark: row.remark,
        requestId: id,
      })),
    };

    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/api/saveRequestDocumentOfIssunce`,
        payload,
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success("Form Saved successfully");

        //
        navigate("/Precot/QA/F-002/Summary");
        // message.success("LaydownChecklist Submitted successfully");
      })
      .catch((err) => {
        setSaveLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSave = async () => {
    // Here you can add your logic for saving the data
    try {
      sharptools_save();

      setSaveBtnStatus(true); // Example to disable after saving
      setSubmitBtnStatus(true);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  //Save API
  const listofsharptools_submit = () => {
    const isValid = () => {
      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);

    setSaveLoading(true);

    // Format the payload according to the API documentation
    const payload = {
      requestId: id,
      formatName: "Request & Issuance of Document",
      formatNo: "PH-QAD01/F-002",
      revisionNumber: 2,
      sopNumber: "PH-QAD01-D-12",
      department: department_name,
      unit: "Unit H",
      date: datevalue,
      month: monthString,
      year: years,
      comments: comments || "NA",
      details: rows.map((row) => ({
        lineId: row.lineId,
        department: department_name,
        documentName: row.documentName,
        documentNo: row.documentNo,
        revisionNo: row.revisionNo,
        typeOfCopy: row.typeOfCopy,
        numberOfCopies: row.numberOfCopies,
        documentGivenBy: row.documentGivenBy,
        documentCollectedBy: row.documentCollectedBy,
        reason: row.reason,
        remark: row.remark,
        requestId: id,
      })),
    };
    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/api/SubmitRequestDocumentOfIssunce`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Form Submitted successfully");

        navigate("/Precot/QA/F-002/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectRequestAndIssunceOfDocument`,
        {
          id: id,
          status: "Approve",
          qaF002Details: rows.map((row) => ({
            lineId: row.lineId,
            documentGivenBy: row.documentGivenBy,
            documentCollectedBy: row.documentCollectedBy,
            remark: row.remark,
            comments: row.reason,
            requestId: id,
          })),
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success("Approved successfully");
        navigate("/Precot/QA/F-002/Summary");
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
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectRequestAndIssunceOfDocument`,
        {
          id: id,
          status: "Reject",
          remarks: Critical,
          qaF002Details: rows.map((row) => ({
            lineId: row.lineId,
            documentGivenBy: row.documentGivenBy,
            documentCollectedBy: row.documentCollectedBy,
            remark: row.remark,
            comments: row.reason,
            requestId: id,
          })),
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success("Approved successfully");
        navigate("/Precot/QA/F-002/Summary");
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

      fetchData_date();
    }
  }, [token]);

  //
  const items = [
    {
      key: "1",
      label: <p>Request & Issuance of Document</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Document Name</th>
                <th>Document No.</th>
                <th>Revision No.</th>
                <th>Type of copy</th>
                <th>No. of copies</th>
                <th>Reason</th>
                <th>Document given by </th>
                <th>Document Collected by </th>
                <th>Remarks </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td style={{ height: "35px", textAlign: "center" }}>
                    {index + 1}
                  </td>
                  <td>
                    <Input
                      key={row.date} // Use a unique key
                      type="text"
                      name="date"
                      value={moment(datevalue).format("DD/MM/YYYY")} // Change this to item_description
                      onChange={(e) =>
                        handleInputChange("date", e.target.value, index)
                      }
                      disabled={
                        isEditable ||
                        !(
                          roleBase === "ROLE_HOD" ||
                          roleBase === "ROLE_DESIGNEE" ||
                          roleBase === "ROLE_SUPERVISOR"
                        )
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="documentName"
                      value={row.documentName} // Change this to item_description
                      onChange={(e) =>
                        handleInputChange("documentName", e.target.value, index)
                      }
                      disabled={
                        isEditable ||
                        !(
                          roleBase === "ROLE_HOD" ||
                          roleBase === "ROLE_DESIGNEE" ||
                          roleBase === "ROLE_SUPERVISOR"
                        )
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="documentNo"
                      value={row.documentNo}
                      onChange={(e) =>
                        handleInputChange("documentNo", e.target.value, index)
                      }
                      disabled={
                        isEditable ||
                        !(
                          roleBase === "ROLE_HOD" ||
                          roleBase === "ROLE_DESIGNEE" ||
                          roleBase === "ROLE_SUPERVISOR"
                        )
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="revisionNo"
                      value={row.revisionNo}
                      onChange={(e) =>
                        handleInputChange("revisionNo", e.target.value, index)
                      }
                      disabled={
                        isEditable ||
                        !(
                          roleBase === "ROLE_HOD" ||
                          roleBase === "ROLE_DESIGNEE" ||
                          roleBase === "ROLE_SUPERVISOR"
                        )
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="typeOfCopy"
                      value={row.typeOfCopy}
                      onChange={(e) =>
                        handleInputChange("typeOfCopy", e.target.value, index)
                      }
                      disabled={
                        isEditable ||
                        !(
                          roleBase === "ROLE_HOD" ||
                          roleBase === "ROLE_DESIGNEE" ||
                          roleBase === "ROLE_SUPERVISOR"
                        )
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="numberOfCopies"
                      value={row.numberOfCopies}
                      onChange={(e) =>
                        handleInputChange(
                          "numberOfCopies",
                          e.target.value,
                          index
                        )
                      }
                      disabled={
                        isEditable ||
                        !(
                          roleBase === "ROLE_HOD" ||
                          roleBase === "ROLE_DESIGNEE" ||
                          roleBase === "ROLE_SUPERVISOR"
                        )
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>

                  <td>
                    <Input
                      type="text"
                      name="reason"
                      value={row.reason}
                      onChange={(e) =>
                        handleInputChange("reason", e.target.value, index)
                      }
                      disabled={
                        isEditable ||
                        !(
                          roleBase === "ROLE_HOD" ||
                          roleBase === "ROLE_DESIGNEE" ||
                          roleBase === "ROLE_SUPERVISOR"
                        )
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="documentGivenBy"
                      value={row.documentGivenBy}
                      onChange={(e) =>
                        handleInputChange(
                          "documentGivenBy",
                          e.target.value,
                          index
                        )
                      }
                      disabled={
                        roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE" ||
                        roleBase === "ROLE_SUPERVISOR" ||
                        (selectedRow?.qa_hod_designee_status ===
                          "HOD_DESIGNEE_APPROVED" &&
                          selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
                          (roleBase === "QA_MANAGER" || roleBase === "ROLE_MR"))
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>

                  <td>
                    <Input
                      type="text"
                      name="documentCollectedBy"
                      value={row.documentCollectedBy}
                      onChange={(e) =>
                        handleInputChange(
                          "documentCollectedBy",
                          e.target.value,
                          index
                        )
                      }
                      disabled={
                        roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE" ||
                        roleBase === "ROLE_SUPERVISOR" ||
                        (selectedRow?.qa_hod_designee_status ===
                          "HOD_DESIGNEE_APPROVED" &&
                          selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
                          (roleBase === "QA_MANAGER" || roleBase === "ROLE_MR"))
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="remark"
                      value={row.remark}
                      onChange={(e) =>
                        handleInputChange("remark", e.target.value, index)
                      }
                      disabled={
                        roleBase === "ROLE_HOD" ||
                        roleBase === "ROLE_DESIGNEE" ||
                        roleBase === "ROLE_SUPERVISOR" ||
                        (selectedRow?.qa_hod_designee_status ===
                          "HOD_DESIGNEE_APPROVED" &&
                          selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
                          (roleBase === "QA_MANAGER" || roleBase === "ROLE_MR"))
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteRow(index)}
                      style={{ cursor: isEditable ? "not-allowed" : "pointer" }}
                      disabled={
                        isEditable ||
                        roleBase === "QA_MANAGER" ||
                        roleBase === "ROLE_MR"
                      }
                    >
                      {" "}
                      <FaTrash color="red" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="100">
                  Comments:
                  <TextArea
                    value={comments}
                    onChange={(e) => setcomments(e.target.value)}
                    rows={4}
                    disabled={
                      roleBase === "ROLE_HOD" ||
                      roleBase === "ROLE_DESIGNEE" ||
                      roleBase === "ROLE_SUPERVISOR" ||
                      (selectedRow?.qa_hod_designee_status ===
                        "HOD_DESIGNEE_APPROVED" &&
                        selectedRow?.qa_mr_status === "QA_MR_APPROVED" &&
                        (roleBase === "QA_MANAGER" || roleBase === "ROLE_MR"))
                    }
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            </tbody>
            <div
              style={{
                textalign: "center",
                paddingLeft: "15px",
                width: "100%",
                paddingTop: "10px",
                cursor: isEditable ? "not-allowed" : "pointer",
              }}
            >
              <button
                onClick={handleAddRow}
                style={{
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  padding: "6px",
                  borderRadius: "3px",
                  cursor: isEditable ? "not-allowed" : "pointer",
                }}
                disabled={
                  isEditable ||
                  roleBase === "QA_MANAGER" ||
                  roleBase === "ROLE_MR"
                }
              >
                Add Row
              </button>
            </div>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Request & Issuance of Document</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colspan={50}>Requested By (Sign & Date)</td>
                <td colspan={50}>Approved by (Sign & Date)</td>
              </tr>
              <tr>
                <td colspan={50}>
                  {selectedRow?.qa_hod_designee_status ===
                    "HOD_DESIGNEE_APPROVED" && (
                      <>
                        <div>{selectedRow?.qa_hod_designee_sign}</div>
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
                <td colspan={50}>
                  {(selectedRow?.qa_mr_status === "QA_MR_APPROVED" ||
                    selectedRow?.qa_mr_status === "QA_MR_REJECTED") && (
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
        formName="Request & Issuance of Document"
        formatNo="PH-QAD01/F-002"
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
          roleBase === "QA_MANAGER" || roleBase === "ROLE_MR"
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

              // Only render the Reject button if the roleBase is "QA_MANAGER"

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
                navigate("/Precot");
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
                value={Critical}
                onChange={(e) => setCritical(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>,
        ]}
      />
      <div id="section-to-print" style={{ padding: "5px" }}>
        <br />

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid #0000",
            padding: "5px",
          }}
        >
          <thead
            style={{ marginTop: "10px", width: "100%", marginBottom: "10px" }}
          >
            <tr>
              <td colSpan="2" rowSpan="4">
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "40px", height: "20px" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>UNIT H</div>
              </td>
              <td colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
                {" "}
                BLEACHING JOB CARD <br></br> PRD01/F-13
              </td>
              <td colSpan="3">Format No:</td>
              <td colSpan="3">PRD01/F-13</td>
            </tr>
            <tr>
              <td colSpan="3">Revision No:</td>
              <td colSpan="3">04</td>
            </tr>
            <tr>
              <td colSpan="3">Ref. SOP No:</td>
              <td colSpan="3">PRD01-D-12</td>
            </tr>
            <tr>
              <td colSpan="3">Page No:</td>
              <td colSpan="3">1 of 1</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">BMR No</td>
              <td colSpan="4">{print && print.bmr_no}</td>
              <td colSpan="3">M/c No</td>
              <td colSpan="3">{print && print.mc_no}</td>
            </tr>
            <tr>
              <td colSpan="2">Date</td>
              <td colSpan="4">{dateprintsec}</td>
              <td colSpan="3">Batch No</td>
              <td colSpan="3">{print && print.sub_batch_no}</td>
            </tr>
            <tr>
              <td colSpan="2">date</td>
              <td colSpan="4">{print && print.date}</td>
              <td colSpan="3">Start Time</td>
              <td colSpan="3">{print && print.start_time}</td>
            </tr>
            <tr>
              <td colSpan="2">Finish</td>
              <td colSpan="4">{print && print.finish}</td>
              <td colSpan="3">End Time</td>
              <td colSpan="3">{print && print.end_time}</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                S.No
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Process Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemicals Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Activity
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Standard Time in Minutes
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual Time in Minutes
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Observations
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                1
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Pre - Wetting
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 70
                ℃, Circulation @ 70 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.wetting}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.wetting_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                2
              </td>
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                }}
              >
                Sourcing & Bleaching
              </td>
              <td
                colSpan="2"
                rowspan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Caustic Soda Flakes, Haipolene & Sarofom & Hydrogen peroxide
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 60
                ℃, Chemical transferring, Temperature raising to 110 ℃,
                Circulation @ 110 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                100 +/- 20
              </td>
              <td
                colSpan="2"
                rowSpan="8"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.scouring}
              </td>
              <td
                colSpan="3"
                rowspan="8"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.scouring_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                3
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 01
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 95
                ℃, Circulation @ 95 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.hotwash_one}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :{" "}
                {print && print.hotwash_one_act_temp}
                <span style={{ fontSize: "11px" }}>℃ </span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                4
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 02
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 90
                ℃, Circulation @ 90 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                {" "}
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.hotwash_two}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.hotwash_two_act_temp}
                <span style={{ fontSize: "11px" }}> ℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                5
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Nutralizing Wash
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Citric Acid, Sarofom, Setilon KN or bo_wiper_roller_speed 9490
                (for Crispy finish Only)
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Chemical transferring,
                Temperature raising to 70 ℃, Circulation @ 70 +/- 5 ℃ and
                Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                30 +/- 6
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.newtralizing_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                6
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Final Cloud{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Circulation @ Normal
                temperature, Surface Activity, pH conformation and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                20 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                pH actual:
                <span style={{ textAlign: "center" }}>
                  {" "}
                  {print && print.final_process_ph_temp}{" "}
                </span>
                <div>
                  Surface Activity actual:
                  <span>{print && print.final_process_act_temp}</span>
                </div>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                fontSize: "14px",
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              <td colSpan="11" style={{ textAlign: "center" }}>
                Chemical Consumption details (Batch Weight range 1250 ± 50 Kg)
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Chemical Name</b>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Standards</b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Actual</b>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Unit</b>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Caustic soda Flakes</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>28-42</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.caustic_soda_flakes}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Haipolene</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>10-12</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.haipolene}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Sarofom </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>7.0-16.0</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.sarofom}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Hydrogen peroxide </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>50-70</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.hydrogen_peroxide}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>liters</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <div>
                  {" "}
                  <p style={{ fontSize: "11px" }}>
                    <div>
                      Setilon KN : {print && print.customer_complaint_ref}
                    </div>
                    <div>
                      bo_wiper_roller_speed 9490 :{" "}
                      {print && print.bo_wiper_roller_speed}
                    </div>
                  </p>
                </div>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>1.5-3.5</p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.setilon_bo_wiper_roller_speed_actual}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Citric acid</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>6.5-9.5 </p>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.citric_acid}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr>
              <td colSpan="11">
                <b style={{ fontSize: "11px" }}>
                  Note: Setilon KN or bo_wiper_roller_speed 9490 chemicals
                  should be added only for Crispy finish.
                </b>
              </td>
            </tr>
            <tr>
              <td colSpan="11">
                {" "}
                Remarks:
                {print && print.remarks}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Production Supervisor
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                HOD / Designees
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                QA
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div align="center">
                  {print && print.supervisor_sign}
                  <br />
                  {supersigndate}
                </div>
              </td>
              <td colSpan="4">
                <div align="center">
                  {print && print.hod_sign}
                  <br />
                  {hodsign}
                </div>
              </td>
              <td colSpan="2">
                {" "}
                <div align="center">
                  {print && print.operator_sign}
                  <br />
                  {operator_signsignaturedate}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <tbody>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                <b style={{ fontSize: "11px", textAlign: "center" }}>
                  Production Supervisor{" "}
                </b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                <b style={{ fontSize: "11px", textAlign: "center" }}>
                  HOD / Designees
                </b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                }}
              >
                <b style={{ fontSize: "11px", textAlign: "center" }}>QA </b>
              </td>
            </tr>

            <tr>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                  height: "60px",
                }}
              >
                <div align="center">
                  {print && print.supervisor_sign}
                  <br />
                  {supersigndate}
                </div>
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <div align="center">
                  {print && print.hod_sign}
                  <br />
                  {hodsign}
                </div>
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <div align="center">
                  {print && print.operator_sign}
                  <br />
                  {operator_signsignaturedate}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ marginTop: 20 }}>
          <tr>
            <th colSpan="5">Particular</th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Prepared by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Reviewed by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Approved by</centre>
            </th>
          </tr>
          <tr>
            <th colSpan="5">Name</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <th colSpan="5">Signature & Date</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
        </table>
      </div>
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
          addonBefore="Date:"
          placeholder="Date"
          type="text"
          value={datefomrat}
          disabled
          style={{ width: "30%", height: "35px" }}
        />

        <Input
          addonBefore="Department:"
          placeholder="Department"
          type="text"
          value={department_name}
          disabled
          style={{ width: "30%", height: "35px" }}
        />
      </div>





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
      ,
    </div>
  );
};

export default QA_F002;
