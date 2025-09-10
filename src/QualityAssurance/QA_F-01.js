import { Button, Input, message, Modal, Tabs, Tooltip } from "antd";
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

const QA_F60 = () => {
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [bo_striper_roller_speed, setbo_striper_roller_speed] = useState("");
  const [bo_complaint_Reeived_date, setbo_complaint_Reeived_date] =
    useState("");
  const [Batch_No, setBatch_No] = useState("");
  const [Container_No, setContainer_No] = useState("");
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
  const [complaint_Reeived_date_foa_2, setcomplaint_Reeived_date_foa_2] =
    useState("");

  const [feed_roller_speed_poa, setfeed_roller_speed_poa] = useState("");
  const [feed_roller_speed_poa_2, setfeed_roller_speed_poa_2] = useState("");
  const [complaint_Reeived_date_poa, setcomplaint_Reeived_date_poa] =
    useState("");
  const [complaint_Reeived_date_poa_2, setcomplaint_Reeived_date_poa_2] =
    useState("");
  const [id, setid] = useState("");
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
  const [print, printdata] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [supersigndate, setsupersigndate] = useState(false);
  const [operator_signsignaturedate, setoperator_signsignaturedate] =
    useState("");
  const [hodsign, sethodsigndate] = useState("");
  const [sample_received_on, setsample_received_on] = useState("");
  const numbers = [1, 2, 3];
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const [selectedRow, setSelectedRow] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [dateprintsec, setisdateprintsec] = useState(false);
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
  const [rows, setRows] = useState([
    {
      item_description: "",
      identification_no: "",
      verification_frequency: "",
      location: "",
      remarks: "",
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

  const handleDeleteRow = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row?",
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
    if (roleBase === "QA_INSPECTOR") {
      if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_SUBMITTED" && // Not submitted
        (selectedRow?.qa_manager_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_manager_status == "QA_MR_APPROVED")
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      } else if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_APPROVED" && // Not submitted
        selectedRow?.qa_manager_status == "QA_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (
      roleBase == "QA_MANAGER" ||
      roleBase == "ROLE_DESIGNEE" ||
      roleBase === "ROLE_MR"
    ) {
      if (
        selectedRow?.qa_inspector_status == "QA_INSPECTOR_SUBMITTED" && // Not submitted
        selectedRow?.qa_manager_status == "QA_MR_APPROVED"
      ) {
        return "none";
      } else if (selectedRow?.qa_manager_status == "QA_REJECTED") {
        return "none";
      }
    }
  };
  const canDisplayButton2 = () => {
    if (roleBase === "QA_INSPECTOR") {
      if (
        selectedRow &&
        // Approved condition
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_SUBMITTED" && // Not submitted
        selectedRow?.qa_manager_status === "WAITING_FOR_APPROVAL" // HOD not waiting for approval
      ) {
        return "none";
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_manager_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_manager_status === "QA_MR_APPROVED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qa_manager_status === "QA_MR_REJECTED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      } else if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qa_manager_status === "QA_MR_APPROVED"
      ) {
        return "none"; // Added condition to check for QA_MANAGER_APPROVED
      }
    }

    if (
      roleBase === "QA_MANAGER" ||
      roleBase == "ROLE_DESIGNEE" ||
      roleBase === "ROLE_MR"
    ) {
      if (selectedRow?.qa_manager_status === "QA_MANAGER_APPROVED") {
        return "none";
      }
    }

    // Default return if none of the conditions match
    // return "block"; // You can return "block" or any other default value you need
  };
  const canEdit = () => {
    if (roleBase === "QA_INSPECTOR") {
      if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qa_manager_status === "QA_MR_APPROVED"
      ) {
        return "false"; // Return false for this specific condition
      }
      if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qa_manager_status === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      }
      if (
        (selectedRow?.qa_inspector_status === "QA_MR_SUBMITTED" ||
          selectedRow?.qa_inspector_status === "QA_MR_APPROVED") &&
        (selectedRow?.qa_manager_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.qa_manager_status === "QA_MR_APPROVED")
      ) {
        return "true";
      }
      if (
        selectedRow?.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        selectedRow?.qa_manager_status === "QA_MR_APPROVED"
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
        (selectedRow?.qa_manager_status === "QA_MANAGER_APPROVED" ||
          selectedRow?.qa_manager_status === "WAITING_FOR_APPROVAL")
      );
    } else {
      return false;
    }
  };
  const isEditable = canEdit();

  const fetchData_date = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/qa/getdetailsbyParamSharpTools?date=${datevalue}&department=${depno} `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (
            roleBase === "QA_MANAGER" ||
            roleBase === "ROLE_DESIGNEE" ||
            roleBase === "ROLE_MR"
          ) {
            if (res.data.body.message === "No data") {
              navigate("/Precot/QA/F-60/Summary");
              message.error("No Data found to approve");
            }
          }
          //

          if (res.data.body?.length === 0 || res.data.body == undefined) {
            //
          } else {
            //
            if (res.data.body?.qa_inspector_saved_on) {
              const dateformat_hod = moment(
                res.data.body?.qa_inspector_saved_on,
              ).format("DD/MM/YYYY HH:mm");
              sethodsigndate(dateformat_hod);
            } else {
              sethodsigndate("");
            }
            if (res.data.body?.qa_manager_approved_on) {
              const dateformat_supervisor = moment(
                res.data.body?.qa_manager_approved_on,
              ).format("DD/MM/YYYY HH:mm");
              setsupersigndate(dateformat_supervisor);
            } else {
              setsupersigndate("");
            }
            if (res.data.body?.operator_submitted_on) {
              const dateformat_op = moment(
                res.data.body?.operator_submitted_on,
              ).format("DD/MM/YYYY HH:mm");
              setoperator_signsignaturedate(dateformat_op);
            } else {
              setoperator_signsignaturedate("");
            }
          }

          if (
            res.data.body &&
            (res.data.body?.length > 0 || res.data.body?.length == undefined)
          ) {
            setAvailableShiftslov(res.data.body?.department);
            setid(res.data.body?.tool_id);
            setSelectedRow(res.data.body);

            if (
              roleBase === "QA_MANAGER" ||
              roleBase == "ROLE_DESIGNEE" ||
              roleBase == "ROLE_MR"
            ) {
              if (res.data.body?.qa_manager_status === "QA_MR_REJECTED") {
                message.warning(
                  "QA INSPECTOR Not Yet Approved or Previous Stage Rejected",
                );
                setTimeout(() => {
                  navigate("/Precot/QA/F-60/Summary");
                }, 1500);
              }
            }

            setemptyarraycheck(res.data.body?.length);

            //opimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data.body?.operator_sign}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                },
              )
              .then((res) => {
                //
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    "",
                  ),
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
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data.body?.qa_manager_sign}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                },
              )
              .then((res) => {
                //
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    "",
                  ),
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
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data.body?.qa_inspector_sign}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                },
              )
              .then((res) => {
                //
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    "",
                  ),
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

          if (res.data.body?.listofsharptoolslines) {
            setRows(
              res.data.body?.listofsharptoolslines.map((item) => ({
                item_description: item.item_description,
                identification_no: item.identification_no,
                verification_frequency: item.verification_frequency,
                location: item.location,
                remarks: item.remarks,
                id: item.id,
              })),
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
          !row.item_description ||
          !row.identification_no ||
          !row.verification_frequency ||
          !row.location ||
          !row.remarks,
      );

      // If a row with empty/null bmr is found, throw an error
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
    navigate("/Precot/QA/F-60/Summary");
  };

  const sharptools_save = () => {
    const isValid = () => {};
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);
    const payload = {
      tool_id: id,
      format_name: "LIST OF SHARP TOOLS",
      format_no: "PH-QAD01/F-060",
      revision_no: 3,
      sop_number: "PH-QAD01-D-45",
      unit: "Unit H",
      date: datevalue,
      department: depno,
      listofsharptoolslines: rows.map((row) => ({
        item_description: row.item_description || "NA",
        identification_no: row.identification_no || "NA",
        verification_frequency: row.verification_frequency || "NA",
        location: row.location || "NA",
        remarks: row.remarks || "NA",
        id: row.id,
      })),
    };

    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(`${API.prodUrl}/Precot/api/qa/saveSharpTools`, payload, { headers })
      .then((res) => {
        setSaveLoading(false);
        message.success("Form Saved successfully");
        navigate("/Precot/QA/F-60/Summary");
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
      // alert("Bleaching job card Saved successfully!");
      //  message.success("Bleaching job card Saved successfully!");
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
    // Format the payload according to the API documentation
    const payload = {
      tool_id: id,
      format_name: "LIST OF SHARP TOOLS",
      format_no: "PH-QAD01/F-060",
      revision_no: 3,
      sop_number: "PH-QAD01-D-45",
      unit: "Unit H",
      date: datevalue,
      department: depno,
      listofsharptoolslines: rows.map((row) => ({
        item_description: row.item_description || "NA",
        identification_no: row.identification_no || "NA",
        verification_frequency: row.verification_frequency || "NA",
        location: row.location || "NA",
        remarks: row.remarks || "NA",
        id: row.id,
      })),
    };
    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(`${API.prodUrl}/Precot/api/qa/submitSharpTools`, payload, {
        headers,
      })
      .then((res) => {
        message.success("Form Submitted successfully");
        navigate("/Precot/QA/F-60/Summary");
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
        `${API.prodUrl}/Precot/api/qa/SharpTools/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers },
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/F-60/Summary");
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
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qa/SharpTools/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: Critical,
        },
        { headers },
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QA/F-60/Summary");
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
      // const roleBase = localStorage.getItem("role");

      fetchData_date();
    }
  }, [token]);

  //
  const items = [
    {
      key: "1",
      label: <p>LIST OF SHARP TOOLS</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Item Description</th>
                <th>Identification No. On The Tool</th>
                <th>Verification Frequency</th>
                <th>Location</th>
                <th>Remarks</th>
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
                      key={row.id} // Use a unique key
                      type="text"
                      name="item_description"
                      value={row.item_description} // Change this to item_description
                      onChange={(e) =>
                        handleInputChange(
                          "item_description",
                          e.target.value,
                          index,
                        )
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="identification_no"
                      value={row.identification_no}
                      onChange={(e) =>
                        handleInputChange(
                          "identification_no",
                          e.target.value,
                          index,
                        )
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="verification_frequency"
                      value={row.verification_frequency}
                      onChange={(e) =>
                        handleInputChange(
                          "verification_frequency",
                          e.target.value,
                          index,
                        )
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="location"
                      value={row.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value, index)
                      }
                      disabled={isEditable}
                      onKeyDown={handleKeyPress}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="remarks"
                      value={row.remarks}
                      onChange={(e) =>
                        handleInputChange("remarks", e.target.value, index)
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
      label: <p>LIST OF SHARP TOOLS</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colspan={50}>Prepared BY</td>
                <td colspan={50}>Verified by</td>
              </tr>
              <tr>
                <td colspan={50}>
                  {selectedRow?.qa_inspector_status ===
                    "QA_INSPECTOR_SUBMITTED" && (
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
                  {selectedRow?.qa_inspector_status ===
                    "QA_INSPECTOR_SUBMITTED" && (
                    <>
                      <div>{selectedRow?.qa_manager_sign}</div>
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
        formName="LIST OF SHARP TOOLS"
        formatNo="PH-QAD01/F-060"
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
              <td colSpan="3"> 1 of 1</td>
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
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
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

            {/* Nutralizing Wash */}

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
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                // contentEditable="false"
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

            {/* PH */}
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
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                {/* <span style={{ textAlign: "center" }}>  {print && print.newtralizing_act_temp}</span> */}
                pH actual:
                <span style={{ textAlign: "center" }}>
                  {" "}
                  {print && print.final_process_ph_temp}{" "}
                </span>
                <div>
                  Surface Activity actual:
                  <span>{print && print.final_process_act_temp}</span>
                </div>
                {/* <span style={{ textAlign: "center" }}>  

              </span> */}
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
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
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
          value={depno}
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

export default QA_F60;
