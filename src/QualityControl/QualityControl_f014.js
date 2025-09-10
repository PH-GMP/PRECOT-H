import React from "react";
import { useState, useEffect, useRef } from "react";
import { Button, Input, Tabs, Select, Tooltip, message, Modal } from "antd";
import { TbMenuDeep } from "react-icons/tb";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { BiFontSize, BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import PrecotSidebar from "../Components/PrecotSidebar";
import rejectIcon from "../Assests/outlined-reject.svg";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import moment from "moment";

const QualityControlF014 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uniqueLoadNo, uniqueEqNo, uniqueDate } = location.state || {};
  const token = localStorage.getItem("token");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [mainID, setMainID] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    date: uniqueDate,
    loadNo: uniqueLoadNo,
    EQNo: uniqueEqNo,
    year: "",
    month: "",
    chemicalIndicatorStrip: "",
    remarks: "",
    status: "",
  });

  console.log(
    "uniqueLoadNo, uniqueEqNo, uniqueDate",
    uniqueLoadNo,
    uniqueEqNo,
    uniqueDate,
    formValues.month,
    formValues.year
  );

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    console.log(formValues); // Debug: see the updated form values in console
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // extract month year from date
  useEffect(() => {
    console.log("uniqueDate", uniqueDate);
    if (uniqueDate) {
      const dateObj = new Date(uniqueDate); // Convert string to Date object

      // Extract the year and month
      const year = dateObj.getFullYear();
      const monthNumber = dateObj.getMonth(); // getMonth() returns 0-11 (Jan-Dec)

      // Array of month names
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

      // Update the formValues state directly with the month and year
      setFormValues((prevValues) => ({
        ...prevValues,
        month: monthNames[monthNumber],
        year: year,
      }));
    }
  }, [uniqueDate]);

  // get api
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const date = formValues.date; // Use the current date in formValues
      const eqno = formValues.EQNo;

      axios
        .get(
          `${   API.prodUrl}/Precot/api/qc/ValidationForAutoclaveChemistF014/GetByDate?date=${date}&eqIdNo=${eqno}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const data = response.data[0];
            setMainID(response.data[0].id);
            setSelectedRow(response.data[0]);

            const username = response.data[0]?.microbiologist_submit_by;
            console.log("username", username);
            //getImage
            axios
              .get(
                `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
                setGetImage1(url);
              })
              .catch((err) => {
                // console.log("Error in fetching image:", err);
              });

            const username2 = response.data[0]?.manager_submit_by;
            console.log("username", username2);
            //getImage

            axios
              .get(
                `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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
                setGetImage2(url);
              })
              .catch((err) => {
                // console.log("Error in fetching image:", err);
              });

            if (
              roleauth === "QA_MANAGER" ||
              roleauth === "QC_MANAGER" ||
              roleauth === "MICRO_DESIGNEE"
            ) {
              if (
                (response.data[0]?.microbiologist_status ===
                  "MICROBIOLOGIST_APPROVED" &&
                  response.data[0]?.manager_status === "QC_REJECTED") ||
                (response.data[0]?.microbiologist_status ===
                  "MICROBIOLOGIST_APPROVED" &&
                  response.data[0]?.manager_status === "QA_REJECTED") ||
                (response.data[0]?.microbiologist_status ===
                  "MICROBIOLOGIST_APPROVED" &&
                  response.data[0]?.manager_status ===
                    "MICRO_DESIGNEE_REJECTED")
              ) {
                message.warning("Microbiologist Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-014/Summary");
                }, 1500);
              }
            }

            setFormValues({
              date: date,
              month: data.month,
              year: data.year,
              loadNo: data.loadNo,
              EQNo: data.eqId,
              chemicalIndicatorStrip: data.chemicalIndicatorStrip,
              remarks: data.remark,
              status: data.status,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching form data by date:", error);
        });
    }
  }, [uniqueDate]);

  const handleSave = async () => {
    setSaveLoading(true);
    console.log("mainID", mainID);
    const payload = {
      id: mainID || "",
      formatNo: "PH-QCL01/F-014",
      revisionNo: "01",
      formatName: "Validation For AutoClave By Chemical Indicator",
      refSopNo: "PH-QCL01-D-03",
      frequency: "Load Wise",
      eqId: formValues.EQNo,
      date: formValues.date,
      month: formValues.month,
      year: formValues.year,
      loadNo: formValues.loadNo,
      chemicalIndicatorStrip: formValues.chemicalIndicatorStrip,
      remark: formValues.remarks,
      status: formValues.status,
    };
    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SavevalidationForAutoclaveChemistF014`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success(
        "Validation For AutoClave By Chemical Indicator saved successfully!"
      );
      console.log("Save successful:", response.data);
      setSaveLoading(false);

      navigate("/Precot/QualityControl/F-014/Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("Error saving the form:", error);
      alert("There was an error saving the form.");
    }
  };

  const handleSubmit = async () => {
    console.log("mainID", mainID);

    setSubmitLoading(true);

    if (!formValues.chemicalIndicatorStrip.trim()) {
      setSubmitLoading(false);
      message.error("Chemical Indicator Strip is required.");
      return; // Exit the function if validation fails
    }

    const payload = {
      id: mainID || "",
      formatNo: "PH-QCL01/F-014",
      revisionNo: "01",
      formatName: "Validation For AutoClave By Chemical Indicator",
      refSopNo: "PH-QCL01-D-03",
      frequency: "Load Wise",
      eqId: formValues.EQNo,
      date: formValues.date,
      month: formValues.month,
      year: formValues.year,
      loadNo: formValues.loadNo,
      chemicalIndicatorStrip: formValues.chemicalIndicatorStrip?.trim() || "NA",
      remark: formValues.remarks?.trim() || "NA",
      status: formValues.status?.trim() || "NA",
    };
    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SubmitvalidationForAutoclaveChemistF014`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success(
        "Validation For AutoClave By Chemical Indicator submitted successfully!"
      );
      console.log("submit successful:", response.data);
      setSubmitLoading(false);

      navigate("/Precot/QualityControl/F-014/Summary");
    } catch (error) {
      setSubmitLoading(false);

      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form.");
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios
      .put(
        `${   API.prodUrl}/Precot/api/qc/ApproveValidationForAutoclaveChemistF014`,
        {
          id: mainID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("res in approve", res);
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-014/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleReject = async () => {
    setSubmitLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${   API.prodUrl}/Precot/api/qc/ApproveValidationForAutoclaveChemistF014`,
        {
          id: mainID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage reject", res.data.message);
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-014/Summary");
      })
      .catch((err) => {
        // console.log("Err in reject", err.response.data.message);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const canEdit = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      return !(
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "QC_APPROVED") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "QA_APPROVED") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "MICRO_DESIGNEE_APPROVED")
      );
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "MICRO_DESIGNEE"
    ) {
      return !(
        (selectedRow &&
          selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          (selectedRow.manager_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.manager_status === "QC_REJECTED" ||
            selectedRow.manager_status === "QC_APPROVED" ||
            selectedRow.manager_status === "QA_REJECTED" ||
            selectedRow.manager_status === "QA_APPROVED" ||
            selectedRow.manager_status === "MICRO_DESIGNEE_APPROVED" ||
            selectedRow.manager_status === "MICRO_DESIGNEE_REJECTED")) ||
        selectedRow.microbiologist_status === "MICROBIOLOGIST_SAVED"
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_REJECTED")
      ) {
        return "block";
      }
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "MICRO_DESIGNEE"
    ) {
      if (
        selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
        selectedRow?.manager_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "MICRO_DESIGNEE_APPROVED") ||
        selectedRow.microbiologist_status === "MICROBIOLOGIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  let formattedMicroDate;
  if (selectedRow.microbiologist_submit_on) {
    formattedMicroDate = moment(selectedRow.microbiologist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedManagerDate;
  if (selectedRow.manager_submit_on) {
    formattedManagerDate = moment(selectedRow.manager_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedManagerDate = ""; // Or any other default value or error handling
  }

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-014/Summary");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Validation For AutoClave By Chemical Indicator details</b>
        </p>
      ),
      children: (
        <div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>Frequency: Load Wise</div>
            <div>EQ. ID No: {formValues.EQNo}</div>
          </div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
              marginLeft: "35px",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                    padding: "10px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                    padding: "10px",
                  }}
                >
                  Load No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                    padding: "10px",
                  }}
                >
                  Chemical indicator strip
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                    padding: "10px",
                  }}
                >
                  Remarks
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                    padding: "10px",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {formatDate(formValues.date)}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {formValues.loadNo}
                </td>
                <td
                  className="chemicalIndicatorStrip"
                  style={{ padding: "10px" }}
                >
                  <Input
                    type="text"
                    value={formValues.chemicalIndicatorStrip}
                    disabled={!isEditable}
                    onChange={(e) =>
                      handleInputChange(
                        "chemicalIndicatorStrip",
                        e.target.value
                      )
                    }
                     
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  <Input
                    type="text"
                    value={formValues.remarks}
                    onChange={(e) =>
                      handleInputChange("remarks", e.target.value)
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  <Input
                    type="text"
                    value={formValues.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    disabled={!isEditable}
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
      label: (
        <p>
          <b> Reviews </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Created by Microbiologist Sign & Date</b>
              </td>

              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>
                  Verified by QC/QA Manager or Microbiologist Designee Sign &
                  Date
                </b>
              </td>
            </tr>
            <tr style={{ height: "35px" }}>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {selectedRow?.microbiologist_status ===
                  "MICROBIOLOGIST_APPROVED" && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.microbiologist_sign}
                    <br />
                    {formattedMicroDate}
                  </>
                )}
              </td>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {(selectedRow?.manager_status === "QC_REJECTED" ||
                  selectedRow?.manager_status === "QC_APPROVED" ||
                  selectedRow?.manager_status === "QA_REJECTED" ||
                  selectedRow?.manager_status === "QA_APPROVED" ||
                  selectedRow?.manager_status === "MICRO_DESIGNEE_APPROVED" ||
                  selectedRow?.manager_status ===
                    "MICRO_DESIGNEE_REJECTED") && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.manager_sign}
                    <br />
                    {formattedManagerDate}
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
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="UNIT H"
        formName="Validation For AutoClave By Chemical Indicator"
        formatNo="PH-QCL01/F-014"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QC_MANAGER" ||
          roleauth === "QA_MANAGER" ||
          roleauth === "MICRO_DESIGNEE" ? (
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
                icon={
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                }
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
                  display: canDisplayButtonSave(),
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
                  // display: submitBtnStatus ? "block" : "none",
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
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
              if (window.confirm("Are you sure want to logout")) {
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
    </>
  );
};

export default QualityControlF014;
