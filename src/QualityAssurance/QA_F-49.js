import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
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
import logo from "../Assests/logo.png";
import approveIcon from "../Assests/outlined-approve.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_F49 = () => {
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [bo_striper_roller_speed, setbo_striper_roller_speed] = useState("");
  const [bo_complaint_Reeived_date, setbo_complaint_Reeived_date] =
    useState("");
  const [deletedIds, setDeletedIds] = useState([]);
  const [Batch_No, setBatch_No] = useState("");
  const [Container_No, setContainer_No] = useState("");
  const [id, setid] = useState("");
  const { Option } = Select;
  const [Packing, setPacking] = useState("");
  const [Contamination, setContamination] = useState("");
  const [Critical, setCritical] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [Grammage, setGrammage] = useState("");
  const [Major, setMajor] = useState("");
  const [date, setdate] = useState("");
  const [complaint_Reeived_date, setcomplaint_Reeived_date] = useState("");
  const [complaint_Reeived_date_for, setcomplaint_Reeived_date_for] =
    useState("");
  const [minor, setminor] = useState("");
  const [complaint_Reeived_date_foa, setcomplaint_Reeived_date_foa] =
    useState("");
  const [feed_roller_speed_por, setfeed_roller_speed_por] = useState("");
  const [feed_roller_speed_por_2, setfeed_roller_speed_por_2] = useState("");
  const [complaint_Reeived_date_por, setcomplaint_Reeived_date_por] =
    useState("");
  const [minor_2, setminor_2] = useState("");
  const [complaint_Reeived_date_foa_2, setcomplaint_Reeived_date_foa_2] =
    useState("");

  const [feed_roller_speed_poa, setfeed_roller_speed_poa] = useState("");
  const [feed_roller_speed_poa_2, setfeed_roller_speed_poa_2] = useState("");
  const [complaint_Reeived_date_poa, setcomplaint_Reeived_date_poa] =
    useState("");
  const [complaint_Reeived_date_poa_2, setcomplaint_Reeived_date_poa_2] =
    useState("");

  const [why1, setwhy1] = useState("");
  const [why2, setwhy2] = useState("");
  const [why3, setwhy3] = useState("");
  const [why4, setwhy4] = useState("");
  const [why5, setwhy5] = useState("");
  const [why5_2, setwhy5_2] = useState("");

  const [collecting_belt_speed, setcollecting_belt_speed] = useState("");
  const [collecting_belt_speed_2, setcollecting_belt_speed_2] = useState("");

  const [alc_feed_roller_speed, setalc_feed_roller_speed] = useState("");
  const [alc_feed_roller_speed_2, setalc_feed_roller_speed_2] = useState("");
  const [turbo_roller_speed, setturbo_roller_speed] = useState("");
  const [press_roller_speed, setpress_roller_speed] = useState("");
  const [press_roller_speed_2, setpress_roller_speedd_2] = useState("");
  const [mesh_belt_speed, setmesh_belt_speed] = useState("");
  const [mesh_belt_speed_2, setmesh_belt_speed_2] = useState("");
  const [loading, setLoading] = useState(true);
  const [endTime, setEndTime] = useState("");
  const [print, printdata] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [supersigndate, setsupersigndate] = useState(false);
  const [operator_signsignaturedate, setoperator_signsignaturedate] =
    useState("");
  const [hodsign, sethodsigndate] = useState("");
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const [selectedRow, setSelectedRow] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [dateprintsec, setisdateprintsec] = useState(false);
  const initial = useRef(false);
  const [startTime, setStartTime] = useState("");
  const roleBase = localStorage.getItem("role");
  const onChange = (key) => {
    //
  };
  const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [rows, setRows] = useState([
    {
      date: "",
      batchNo: "",
      productName: "",
      quantity: "",
      uom: "",
      reasonForDisposal: "",
    },
  ]);
  const { state } = location;
  const { datevalue, depno } = state || {};
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
  const handleKeyPress_number = (e) => {
    if (
      !/[0-9]/.test(e.key) && // Allow only numbers
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
      item_description: "",
      identification_no: "",
      verification_frequency: "",
      location: "",
      remarks: "",
    }; // New empty row
    setRows([...rows, newRow]);
  };

  // Handle delete row
  const handleDeleteRow = async (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (isConfirmed) {
      const id = rows[index].line_id;

      if (id) {
        // Add the `line_id` to the deletedIds array
        setDeletedIds((prevDeletedIds) => [...prevDeletedIds, id]);
      }

      // Remove the row locally regardless of `line_id` value
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      alert("Row deleted successfully.");
    }
  };
  // Function to delete rows by IDs in deletedIds
  const deleteRows = async () => {
    for (const id of deletedIds) {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/QA/Service/api/deleteProductDispositionLogBook?id=${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(`Failed to delete row with ID: ${id}`);
        }
      } catch (error) {
        console.error(`Error deleting row with ID: ${id}`, error);
      }
    }
    // Clear deletedIds after deletion
    setDeletedIds([]);
  };
  // Handle input change for each row
  const handleInputChange = (field, value, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const canDisplayButtons = () => {
    if (roleBase === "ROLE_QA") {
      if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" && // Not submitted
        (selectedRow?.qa_mr_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_mr_status == "QA_MR_APPROVED")
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      } else if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" && // Not submitted
        selectedRow?.qa_mr_status == "QA_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (
      roleBase == "QA_MANAGER" ||
      roleBase == "ROLE_DESIGNEE" ||
      roleBase === "ROLE_MR"
    ) {
      if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" && // Not submitted
        selectedRow?.qa_mr_status == "QA_MR_APPROVED"
      ) {
        return "none";
      } else if (selectedRow?.qa_mr_status == "QA_REJECTED") {
        return "none";
      }
    }
  };
  const canDisplayButton2 = () => {
    if (roleBase === "ROLE_QA") {
      if (
        selectedRow &&
        // Approved condition
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" && // Not submitted
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL" // HOD not waiting for approval
      ) {
        return "none";
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mr_status === "QA_MR_APPROVED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mr_status === "QA_MR_REJECTED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mr_status === "QA_MR_APPROVED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      }
    }

    if (
      roleBase === "QA_MANAGER" ||
      roleBase == "ROLE_DESIGNEE" ||
      roleBase === "ROLE_MR"
    ) {
      if (selectedRow?.qa_mr_status === "QA_MANAGER_APPROVED") {
        return "none";
      }
    }

    // Default return if none of the conditions match
    // return "block"; // You can return "block" or any other default value you need
  };
  const canEdit = () => {
    if (roleBase === "ROLE_QA") {
      if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mr_status === "QA_MR_APPROVED"
      ) {
        return "false";
      }
      if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false";
      }
      if (
        (selectedRow?.qa_inspector_status === "QA_MR_SUBMITTED" ||
          selectedRow?.qa_inspector_status === "QA_MR_APPROVED") &&
        (selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_mr_status === "QA_MR_APPROVED")
      ) {
        return "true";
      }
      if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_mr_status === "QA_MR_APPROVED"
      ) {
        return "false";
      }
    } else if (
      roleBase === "QA_MANAGER" ||
      roleBase == "ROLE_DESIGNEE" ||
      roleBase == "ROLE_MR"
    ) {
      return !(
        selectedRow &&
        selectedRow?.qa_inspector_status === "QA_MR_APPROVED" &&
        (selectedRow?.qa_mr_status === "QA_MANAGER_APPROVED" ||
          selectedRow?.qa_mr_status === "WAITING_FOR_APPROVAL")
      );
    } else {
      return false;
    }
  };
  const isEditable = canEdit();

  const fetchData_date = async () => {
    try {
      setLoading(true);
      const date_month = moment(datevalue, "YYYY-MM-DD");
      const year = date_month.year();
      const month = date_month.format("MMMM");
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/api/findByParamProductDispositionLogBook?date=${datevalue}&month=${month}&year=${year} `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (
            roleBase === "QA_MANAGER" ||
            roleBase === "ROLE_DESIGNEE" ||
            roleBase === "ROLE_MR"
          ) {
            if (res.data[0]?.message === "No data") {
              navigate("/Precot/QA/F-49/Summary");
              message.error("No Data found to approve");
            }
          }

          if (res.data[0]?.length === 0 || res.data[0] == undefined) {
          } else {
            if (res.data[0]?.qa_inspector_submit_on) {
              const dateformat_hod = moment(
                res.data[0]?.qa_inspector_submit_on
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
            setAvailableShiftslov(res.data[0]?.department);

            setid(res.data[0]?.productId);
            setSelectedRow(res.data[0]);

            if (
              roleBase === "QA_MANAGER" ||
              roleBase == "ROLE_DESIGNEE" ||
              roleBase == "ROLE_MR"
            ) {
              if (res.data[0]?.qa_mr_status === "QA_MR_REJECTED") {
                message.warning(
                  "QA INSPECTOR Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/QA/F-49/Summary");
                }, 1500);
              }
            }

            setemptyarraycheck(res.data.body?.length);

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
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.qa_inspector_sign}`,
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
                line_id: item.line_id,
                date: item.date,
                batchNo: item.batchNo,
                productName: item.productName,
                quantity: item.quantity,
                uom: item.uom,
                reasonForDisposal: item.reasonForDisposal,
                productId: item.productId,
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
          !row.batchNo ||
          !row.productName ||
          !row.quantity ||
          !row.uom ||
          !row.reasonForDisposal
      );

      // If a row with empty/null bmr is found, throw an error
      if (invalidRowIndex !== -1) {
        message.error(`Record is required for  S.No.${invalidRowIndex + 1}`);
        setSaveLoading(false);
      } else {
        listofsharptools_submit();
        await deleteRows();
        setSaveBtnStatus(true);
        setSubmitBtnStatus(true);
      }

      //// console.log("Date Format :",new Date(INcharge_Date).toLocaleDateString() + " " +new Date(INcharge_Date).toLocaleDateString )
      // alert("Bleaching job card submitted successfully!");
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-49/Summary");
  };

  const sharptools_save = () => {
    const isValid = () => {};
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);

    const date_month = moment(datevalue, "YYYY-MM-DD");
    const year = date_month.year();
    const month = date_month.format("MMMM");

    const payload = {
      productId: id,
      formatName: "PRODUCT DISPOSITION LOG BOOK",
      formatNo: "PH-QAD01/F-049",
      revisionNo: 1,
      sopNumber: "PH-QAD01-D-26",
      unit: "Unit H",
      date: datevalue,
      month: month,
      year: year,
      details: rows.map((row) => ({
        line_id: row.line_id,
        date: row.date || "NA",
        batchNo: row.batchNo || "NA",
        productName: row.productName || "NA",
        uom: row.uom || "NA",
        quantity: row.quantity || "NA",
        reasonForDisposal: row.reasonForDisposal || "NA",
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
        `${API.prodUrl}/Precot/api/QA/Service/api/saveProductDispositionLogBook`,
        payload,
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success("Form Saved successfully");

        //
        navigate("/Precot/QA/F-49/Summary");
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
    try {
      sharptools_save();
      await deleteRows();
      setSaveBtnStatus(true); // Example to disable after saving
      setSubmitBtnStatus(true);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  //SAve API

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
    const date_month = moment(datevalue, "YYYY-MM-DD");
    const year = date_month.year();
    const month = date_month.format("MMMM");
    // Format the payload according to the API documentation
    const payload = {
      productId: id,
      formatName: "PRODUCT DISPOSITION LOG BOOK",
      formatNo: "PH-QAD01/F-049",
      revisionNo: 1,
      sopNumber: "PH-QAD01-D-26",
      unit: "Unit H",
      date: datevalue,
      month: month,
      year: year,
      details: rows.map((row) => ({
        date: row.date || "NA",
        batchNo: row.batchNo || "NA",
        productName: row.productName || "NA",
        uom: row.uom || "NA",
        quantity: row.quantity || "NA",
        reasonForDisposal: row.reasonForDisposal || "NA",
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
        `${API.prodUrl}/Precot/api/QA/Service/api/SubmitProductDispositionLogBook`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Form Submitted successfully");
        navigate("/Precot/QA/F-49/Summary");
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
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectProductDispositionLogBook`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/F-49/Summary");
      })
      .catch((err) => {
        setLoading(false);
        //
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
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectProductDispositionLogBook`,
        {
          id: id,
          status: "Reject",
          remarks: Critical,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/F-49/Summary");
      })
      .catch((err) => {
        setLoading(false);
        //
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

  const items = [
    {
      key: "1",
      label: <p>PRODUCT DISPOSITION LOG BOOK</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Batch No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>UOM</th>
                <th>Reason for disposal</th>

                <th>Action</th>
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
                      type="text"
                      name="date"
                      value={datefomrat} // Change this to item_description
                      disabled="disabled"
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="batchNo"
                      value={row.batchNo}
                      onChange={(e) =>
                        handleInputChange("batchNo", e.target.value, index)
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="productName"
                      value={row.productName}
                      onChange={(e) =>
                        handleInputChange("productName", e.target.value, index)
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="quantity"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", e.target.value, index)
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress_number}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="uom"
                      value={row.uom}
                      onChange={(e) =>
                        handleInputChange("uom", e.target.value, index)
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="reasonForDisposal"
                      value={row.reasonForDisposal}
                      onChange={(e) =>
                        handleInputChange(
                          "reasonForDisposal",
                          e.target.value,
                          index
                        )
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteRow(index)}
                      style={{ cursor: isEditable ? "not-allowed" : "pointer" }}
                      disabled={isEditable}
                    >
                      {" "}
                      <FaTrash color="red" />
                    </button>
                  </td>
                </tr>
              ))}
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
                disabled={isEditable}
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
      label: <p>Reviews</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colspan={50}>Prepared bY</td>
                <td colspan={50}>Verified by</td>
              </tr>
              <tr>
                <td colspan={50}>
                  {selectedRow?.qa_inspector_status ===
                    "QA_INSPECTOR_APPROVED" && (
                    <>
                      <div>{selectedRow?.qa_inspector_sign}</div>
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
        formName="PRODUCT DISPOSITION LOG BOOK"
        formatNo="PH-QAD01/F-049"
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
          roleBase === "QA_MANAGER" ||
          roleBase === "ROLE_DESIGNEE" ||
          roleBase === "ROLE_MR"
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
                value={Critical}
                onChange={(e) => setCritical(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>,
        ]}
      />
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
      </div>
      ,
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

export default QA_F49;
