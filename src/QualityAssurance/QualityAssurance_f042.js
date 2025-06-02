import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QualityAssuranceF042 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCNo, entryType } = location.state || {};
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const token = localStorage.getItem("token");
  const { confirm } = Modal;
  const roleauth = localStorage.getItem("role");
  const [mainId, setMainId] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [canDisplayButton, setCanDisplayButton] = useState("block");
  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState(null);
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
    12: "COTTEN_BUDS",
    13: "MARKETING",
  };

  const [inputFieldsData, setInputFieldsData] = useState([
    {
      detailsId: "",
      changeInitiationDate: "",
      changeControlNo: selectedCNo,
      descriptionOfChange: "",
      issuedToDept: "",
      tentativeClosureDate: "",
      actualClosureDate: "",
      isNewRow: false,
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...inputFieldsData];
    updatedData[index][field] = value;
    setInputFieldsData(updatedData);
  };

  const addRow = () => {
    const lastRow = inputFieldsData[inputFieldsData.length - 1];

    setInputFieldsData([
      ...inputFieldsData,
      {
        detailsId: "",
        changeInitiationDate: "",
        changeControlNo: lastRow.changeControlNo,
        descriptionOfChange: lastRow.descriptionOfChange,
        issuedToDept: lastRow.issuedToDept,
        tentativeClosureDate: "",
        actualClosureDate: "",
        remarks: "",
        isNewRow: true,
        disableActualAndRemarks: false,
      },
    ]);

    setCanDisplayButton("block");
  };

  const hasActualClosureDate = inputFieldsData.some(
    (row) => row.actualClosureDate
  );

  const hasTentativeClosureDate = inputFieldsData.some(
    (row) => !row.tentativeClosureDate
  );

  useEffect(() => {
    if (inputFieldsData[0]?.changeInitiationDate) {
      const dateObj = new Date(inputFieldsData[0].changeInitiationDate);

      const year = dateObj.getFullYear();
      const monthNumber = dateObj.getMonth();

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

      setMonth(monthNames[monthNumber]);
      setYear(year);
    }
  }, [inputFieldsData[0]?.changeInitiationDate]);

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/changeControlLogBook/GetAllDepartments`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      )
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const deleteRow = (index) => {
    if (inputFieldsData.length === 1) {
      alert("At least one row is required.");
      return;
    }

    const { detailsId } = inputFieldsData[index];

    confirm({
      title: "Are you sure you want to delete this row?",
      content: "This action cannot be undone.",
      onOk() {
        setCanDisplayButton("none");

        fetch(
          `${API.prodUrl}/Precot/api/QA/Service/changeControlLogBook/deleteChildEntry/${detailsId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        )
          .then((response) => {
            if (response.ok) {
              const updatedRows = inputFieldsData.filter(
                (row, i) => i !== index
              );
              setInputFieldsData(updatedRows);

              message.info("Row deleted successfully");
            } else {
              console.error("Failed to delete row:", response.statusText);
              alert("Failed to delete row. Please try again.");
            }
          })
          .catch((error) => {
            console.error("Error deleting row:", error);
            alert("An error occurred. Please try again.");
          });
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    const initializeDepartmentName = async () => {
      const departmentID = localStorage.getItem("departmentId");

      if (departmentID && departmentMap[departmentID]) {
        setDepartmentName(departmentMap[departmentID]);
      } else {
        setDepartmentName("Unknown Department");
      }

      if (departmentID && departmentMap[departmentID] !== departmentName) {
        setError(
          "Selected department does not match the department in the system."
        );
      } else {
        setError(null);
      }
    };

    initializeDepartmentName();
  }, [departmentName]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/changeControlLogBook/GetByChangeControlNO?changeControlNo=${selectedCNo}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        )
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const responseData = response.data[0];
            setSelectedRow(responseData);
            setMainId(responseData.id);

            const fetchedData = responseData.details.map(
              (detail, index, arr) => {
                const isLastRow = index === arr.length - 1;
                const isTentativeClosureEmpty = !detail.tentativeClosureDate;

                return {
                  detailsId: detail.detailsId,
                  changeInitiationDate: detail.changeInitiationDate,
                  changeControlNo: responseData.changeControlNo,
                  descriptionOfChange: responseData.descriptionOfChange,
                  issuedToDept: responseData.issuedToDepartment,
                  tentativeClosureDate: detail.tentativeClosureDate,
                  actualClosureDate: responseData.actualClouserDate,
                  remarks: responseData.remark,
                  isDisabled: index < arr.length - 1,
                  disableActualAndRemarks: isLastRow && isTentativeClosureEmpty,
                };
              }
            );

            setInputFieldsData(fetchedData);

            const username = response.data[0]?.hodOrDesigneeSign;

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

            const username2 = response.data[0]?.mrOrQaManagerSign;

            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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
          } else {
            if (roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") {
              message.info("Designee or HOD not yet approved");
              navigate("/Precot/QA/QA_F042_Summary");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  const handleSave = async () => {
    setSaveLoading(true);

    if (inputFieldsData[0].issuedToDept !== departmentName) {
      setSaveLoading(false);
      message.error(
        "The selected department cannot be the same as the current department."
      );
      return;
    }

    const payload = {
      id: mainId || "",
      unit: "Unit H",
      formatNo: "PH-QAD01-F-042",
      formatName: "Change control log book",
      sopNumber: "PH-QAD01-D-37",
      revisionNo: "1",
      sNo: 1,
      month: month,
      year: year,
      changeControlNo: selectedCNo,
      descriptionOfChange: inputFieldsData[0].descriptionOfChange,
      issuedToDepartment: inputFieldsData[0].issuedToDept,
      details: inputFieldsData.map((field) => ({
        detailsId: field.detailsId,
        changeInitiationDate: field.changeInitiationDate,
        tentativeClosureDate: field.tentativeClosureDate,
      })),
    };

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/saveChangeControlLogBook`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Change control log book saved successfully!");
      setSaveLoading(false);
      navigate("/Precot/QA/QA_F042_Summary");
    } catch (error) {
      setSaveLoading(false);
      message.error(
        "Failed to save change control log book. Please try again."
      );
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    const hasInitiationDate = inputFieldsData.some(
      (row) => !row.changeInitiationDate
    );

    if (
      !selectedCNo ||
      !inputFieldsData[0].descriptionOfChange?.trim() ||
      !inputFieldsData[0].issuedToDept ||
      hasInitiationDate
    ) {
      setSubmitLoading(false);
      message.warning("Please fill in all required fields.");
      return;
    }

    if (inputFieldsData[0].issuedToDept !== departmentName) {
      setSubmitLoading(false);
      message.error(
        "The selected department cannot be the same as the current department."
      );
      return;
    }

    const payload = {
      id: mainId || "",
      unit: "Unit H",
      formatNo: "PH-QAD01-F-042",
      formatName: "Change control log book",
      sopNumber: "PH-QAD01-D-37",
      revisionNo: "1",
      sNo: 1,
      month: month,
      year: year,
      changeControlNo: selectedCNo,
      descriptionOfChange: inputFieldsData[0].descriptionOfChange,
      issuedToDepartment: inputFieldsData[0].issuedToDept,
      details: inputFieldsData.map((field) => ({
        detailsId: field.detailsId,
        changeInitiationDate: field.changeInitiationDate,
        tentativeClosureDate: field.tentativeClosureDate,
      })),
    };

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitChangeControlLogBook`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Change control log book submitted successfully!");
      setSubmitLoading(false);
      navigate("/Precot/QA/QA_F042_Summary");
    } catch (error) {
      setSubmitLoading(false);
      message.error(
        "Failed to submit change control log book. Please try again."
      );
    }
  };

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      if (
        selectedRow &&
        (selectedRow?.hodOrDesigneeStatus === "HOD_SUBMITTED" ||
          selectedRow?.hodOrDesigneeStatus === "DESIGNEE_SUBMITTED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtonSubmit = () => {
    if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      if (
        selectedRow &&
        (selectedRow.hodOrDesigneeStatus === "HOD_SUBMITTED" ||
          selectedRow.hodOrDesigneeStatus === "DESIGNEE_SUBMITTED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtonApprove = () => {
    if (roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") {
      if (
        (selectedRow &&
          selectedRow?.mrOrQaManagerStatus === "TENTATIVE_DATE_FIXED") ||
        selectedRow?.hodOrDesigneeStatus === "DESIGNEE_SAVED" ||
        selectedRow?.hodOrDesigneeStatus === "HOD_SAVED"
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  useEffect(() => {
    setCanDisplayButton(canDisplayButtonSubmit());
  }, [roleauth, selectedRow]);

  const canEdit = () => {
    if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        (selectedRow && selectedRow?.hodOrDesigneeStatus === "HOD_SUBMITTED") ||
        selectedRow?.hodOrDesigneeStatus === "DESIGNEE_SUBMITTED"
      );
    } else if (roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") {
      return !(
        (selectedRow &&
          selectedRow?.mrOrQaManagerStatus === "TENTATIVE_DATE_FIXED") ||
        selectedRow?.hodOrDesigneeStatus === "DESIGNEE_SAVED" ||
        selectedRow?.hodOrDesigneeStatus === "HOD_SAVED"
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const handleApprove = async () => {
    setSaveLoading(true);

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fieldData = inputFieldsData[inputFieldsData.length - 1] || {};

    if (!fieldData.tentativeClosureDate) {
      message.warning("Tentative Closure Date is Missing");
      setSaveLoading(false);
      return;
    }

    const payload = fieldData.actualClosureDate
      ? {
          id: mainId || "",
          detailsId: fieldData.detailsId,
          formatNo: "PH-QAD01-F-042",
          actualClouserDate: fieldData.actualClosureDate || "N/A",
          remarks: fieldData.remarks || "N/A",
        }
      : {
          id: mainId || "",
          detailsId: fieldData.detailsId,
          formatNo: "PH-QAD01-F-042",
          tentativeClosureDate: fieldData.tentativeClosureDate || "N/A",
        };

    const proceedApproval = async () => {
      try {
        const res = await axios.put(
          `${API.prodUrl}/Precot/api/QA/Service/approveChangeControlLogBook`,
          payload,
          { headers }
        );
        message.success(res.data.message);
        navigate("/Precot/QA/QA_F042_Summary");
      } catch (err) {
        setSaveLoading(false);
        message.error(err.response?.data?.message || "An error occurred");
      } finally {
        setSaveLoading(false);
      }
    };

    if (fieldData.actualClosureDate) {
      Modal.confirm({
        title: "Are you sure to close this log using actual closure date?",
        okText: "Yes",
        cancelText: "No",
        onOk: proceedApproval,
        onCancel: () => setSaveLoading(false),
      });
    } else {
      await proceedApproval();
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleBack = () => {
    navigate("/Precot/QA/QA_F042_Summary");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  let formattedHODDESDate;
  let formattedMRQADate;

  if (selectedRow) {
    if (selectedRow.hodOrDesigneeSubmittedOn) {
      formattedHODDESDate = moment(selectedRow.hodOrDesigneeSubmittedOn).format(
        "DD/MM/YYYY HH:mm"
      );
    } else {
      formattedHODDESDate = "";
    }

    if (selectedRow.mrOrQaManagerSavedOn) {
      formattedMRQADate = moment(selectedRow.mrOrQaManagerSavedOn).format(
        "DD/MM/YYYY HH:mm"
      );
    } else {
      formattedMRQADate = "";
    }
  }

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Change control log book details</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                width: "100%",
                marginLeft: "20px",
                marginTop: "30px",
              }}
            >
              <thead>
                <tr style={{ border: "1px solid black" }}>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    S.No.
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Change Initiation Date
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Change Control No.
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Description of change
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Issued to Dept.
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Tentative Closure Date
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Actual Closure Date
                  </th>
                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Remarks
                  </th>
                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {inputFieldsData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      {index + 1}
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Input
                        type="date"
                        value={row.changeInitiationDate}
                        min={
                          index > 0
                            ? inputFieldsData[index - 1].tentativeClosureDate
                            : ""
                        }
                        max={getCurrentDate()}
                        disabled={
                          (roleauth == "ROLE_MR" ||
                            roleauth == "QA_MANAGER" ||
                            !isEditable) &&
                          !row.isNewRow
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "changeInitiationDate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      {row.changeControlNo}
                    </td>
                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <TextArea
                        value={row.descriptionOfChange}
                        disabled={
                          (roleauth == "ROLE_MR" ||
                            roleauth == "QA_MANAGER" ||
                            !isEditable) &&
                          !row.isNewRow
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "descriptionOfChange",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Select
                        value={row.issuedToDept}
                        onChange={(value) =>
                          handleInputChange(index, "issuedToDept", value)
                        }
                        disabled={
                          (roleauth == "ROLE_MR" ||
                            roleauth == "QA_MANAGER" ||
                            !isEditable) &&
                          !row.isNewRow
                        }
                        style={{ width: "160px" }}
                        placeholder="Select Department"
                      >
                        {departments.map((dept) => (
                          <Select.Option key={dept} value={dept}>
                            {dept}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>

                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Input
                        type="date"
                        value={row.tentativeClosureDate}
                        min={row.changeInitiationDate}
                        disabled={
                          roleauth == "ROLE_HOD" ||
                          roleauth == "ROLE_DESIGNEE" ||
                          !isEditable ||
                          row.isDisabled
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "tentativeClosureDate",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Input
                        type="date"
                        value={row.actualClosureDate}
                        min={row.changeInitiationDate}
                        max={row.tentativeClosureDate}
                        disabled={
                          roleauth == "ROLE_HOD" ||
                          roleauth == "ROLE_DESIGNEE" ||
                          row.isDisabled ||
                          row.disableActualAndRemarks
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "actualClosureDate",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <TextArea
                        value={row.remarks}
                        disabled={
                          roleauth == "ROLE_HOD" ||
                          roleauth == "ROLE_DESIGNEE" ||
                          row.isDisabled ||
                          row.disableActualAndRemarks
                        }
                        onChange={(e) =>
                          handleInputChange(index, "remarks", e.target.value)
                        }
                      />
                    </td>

                    <td style={{ textAlign: "center", padding: "5px" }}>
                      <Button
                        type="primary"
                        danger
                        icon={<FaTrash style={{ fontSize: "10px" }} />}
                        disabled={
                          roleauth === "ROLE_MR" || roleauth === "QA_MANAGER"
                        }
                        onClick={() => deleteRow(index)}
                        style={{
                          padding: "2px 4px",
                          fontSize: "10px",
                          height: "24px",
                          backgroundColor: "#ff4d4f",
                          borderColor: "#ff4d4f",
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "50%",
                marginLeft: "35px",
                marginTop: "10px",
              }}
              onClick={addRow}
              disabled={
                entryType === "New Entry" ||
                roleauth == "ROLE_MR" ||
                roleauth == "QA_MANAGER" ||
                hasTentativeClosureDate
              }
            >
              <AiOutlinePlus style={{ marginRight: "5px" }} />
              Add Row
            </Button>
          </div>
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
                <b>Issued by HOD/Designee Sign & Date</b>
              </td>

              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Received by MR/QA Manager Sign & Date</b>
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
                {(selectedRow?.hodOrDesigneeStatus === "DESIGNEE_SUBMITTED" ||
                  selectedRow?.hodOrDesigneeStatus === "HOD_SUBMITTED") && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.hodOrDesigneeSign}
                    <br />
                    {formattedHODDESDate}
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
                {selectedRow?.mrOrQaManagerStatus ===
                  "TENTATIVE_DATE_FIXED" && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.mrOrQaManagerSign}
                    <br />
                    {formattedMRQADate}
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
        unit="Unit H"
        formName="Change control log book"
        formatNo="PH-QAD01-F-042"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_MR" || roleauth === "QA_MANAGER" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtonApprove(),
                }}
                onClick={handleApprove}
                shape="round"
                icon={
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                }
              >
                &nbsp;{"Submit"}
              </Button>

              {hasActualClosureDate && (
                <>
                  <Button
                    loading={saveLoading}
                    type="primary"
                    style={{
                      backgroundColor: "#E5EEF9",
                      color: "#00308F",
                      fontWeight: "bold",
                    }}
                    onClick={handleApprove}
                    shape="round"
                    icon={
                      <img
                        src={approveIcon}
                        alt="Approve Icon"
                        color="#00308F"
                      />
                    }
                  >
                    &nbsp;{"Approve"}
                  </Button>
                </>
              )}
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
                  display: canDisplayButton,
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

export default QualityAssuranceF042;
