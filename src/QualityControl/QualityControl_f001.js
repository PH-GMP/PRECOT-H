import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Tabs, Button, Select, Input, Tooltip, message, Modal } from "antd";
import { FaLock, FaTrash } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
const { confirm } = Modal;

const QCLF001 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedDate,
    entryDate,
    selectedShift,
    selectedMonth,
    selectedYear,
  } = location.state || {};
  const [mainId, setMainId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const roleauth = localStorage.getItem("role");
  const [getImage1, setGetImage1] = useState("");
  const [open, setOpen] = useState(false);

  const [uniqueMonth, setUniqueMonth] = useState("");
  const [uniqueYear, setUniqueYear] = useState("");

  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate); // Convert string to Date object

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

      // Set the states for month and year
      setUniqueYear(year);
      setUniqueMonth(monthNames[monthNumber]);
    }
  }, [selectedDate]);

  const determineDate = () => {
    return formatDate(entryDate || selectedDate);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [formValues, setFormValues] = useState([
    {
      id: "",
      date: determineDate(),
      month: selectedMonth || uniqueMonth,
      year: selectedYear || uniqueYear,
      shift: selectedShift,
      materialDescription: "",
      quantity: "",
      uom: "",
      BMRNo: "",
      sampleGivenBy: "",
      remarks: "",
    },
  ]);

  const addRow = () => {
    setFormValues([
      ...formValues,
      {
        date: determineDate(),
        month: selectedMonth || uniqueMonth,
        year: selectedYear || uniqueYear,
        shift: selectedShift,
        materialDescription: "",
        quantity: "",
        uom: "",
        BMRNo: "",
        sampleGivenBy: "",
        remarks: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...formValues];
    updatedData[index][field] = value;
    setFormValues(updatedData);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("selected month", selectedMonth);
    console.log("selected year", selectedYear);
    console.log("selected dates", selectedDate, entryDate);
    console.log("shift", selectedShift);
    const fetchData = (date) => {
      const token = localStorage.getItem("token");

      axios
        .get(
          `${   API.prodUrl}/Precot/api/qc/SampleInwardBookF1F2F3/GetByDateF001?dateF001=${date}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        )
        .then((response) => {
          console.log("GET API Response:", response.data);

          if (response.data && response.data.length > 0) {
            const data = response.data[0]; // First record

            setSelectedRow(response.data[0]);

            const username = response.data[0]?.chemist_sign;
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

            // Set the main ID for saving data later
            setMainId(data.id);

            setFormValues(
              data.details.map((detail) => ({
                id: detail.id,
                date: formatDate(data.dateF001),
                month: data.month,
                year: data.year,
                shift: detail.shift,
                materialDescription: detail.descriptionOfMaterial,
                quantity: detail.quantity,
                uom: detail.uom,
                BMRNo: detail.bmrNo,
                sampleGivenBy: detail.sampleGivenBy,
                remarks: detail.remark,
              }))
            );
          } else {
            // If no data is returned, reset the form fields
            setFormValues([
              {
                id: "",
                date: formatDate(date),
                month: selectedMonth || uniqueMonth,
                year: selectedYear || uniqueYear,
                shift: selectedShift,
                materialDescription: "",
                quantity: "",
                uom: "",
                BMRNo: "",
                sampleGivenBy: "",
                remarks: "",
              },
            ]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    // Use entryDate or selectedDate if available
    if (entryDate) {
      fetchData(entryDate);
    } else if (selectedDate) {
      fetchData(selectedDate);
    }
  }, [entryDate, selectedDate]);

  const handleSave = () => {
    setSaveLoading(true);

    console.log("selected month", selectedMonth);
    console.log("selected year", selectedYear);
    console.log("selected dates", selectedDate, entryDate);

    const payload = {
      id: mainId || "",
      formatNo: "PH-QCL01/F-001",
      revisionNo: "01",
      formatName: "Physical And Chemical Lab Sample Inward Book",
      refSopNo: "PH-QCL01-D-05",
      dateF001: selectedDate || entryDate,
      month: selectedMonth || uniqueMonth,
      year: selectedYear || uniqueYear,
      details: formValues.map((form) => ({
        id: form.id || "",
        shift: parseInt(form.shift),
        descriptionOfMaterial: form.materialDescription?.trim(),
        quantity: parseInt(form.quantity),
        bmrNo: form.BMRNo?.trim(),
        uom: form.uom,
        sampleGivenBy: form.sampleGivenBy?.trim(),
        remark: form.remarks?.trim(),
      })),
    };

    console.log("payload:", payload);

    const token = localStorage.getItem("token");

    axios
      .post(
        `${   API.prodUrl}/Precot/api/qc/SaveSampleInwardBookF1F2F3`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success(
          "Physical And Chemical Lab Sample Inward Book Saved Successfully.."
        );
        console.log("Data saved successfully:", response.data);
        setSaveLoading(false);
        navigate("/Precot/QualityControl/inwardBook/Summary");
      })
      .catch((error) => {
        message.error(error.response?.data?.message || "Failed to save report");
        console.error("Error saving data:", error);
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    setSubmitLoading(true);

    for (let i = 0; i < formValues.length; i++) {
      const row = formValues[i];
      if (!row.materialDescription?.trim()) {
        message.error(`Row ${i + 1}: Material Description is required.`);
        setSubmitLoading(false);
        return;
      }
      if (!row.quantity) {
        message.error(`Row ${i + 1}: Quantity is required.`);
        setSubmitLoading(false);
        return;
      }
      if (!row.BMRNo?.trim()) {
        message.error(`Row ${i + 1}: BMR No is required.`);
        setSubmitLoading(false);
        return;
      }
      if (!row.uom) {
        message.error(`Row ${i + 1}: UOM is required.`);
        setSubmitLoading(false);
        return;
      }
      if (!row.sampleGivenBy?.trim()) {
        message.error(`Row ${i + 1}: Sample Given By is required.`);
        setSubmitLoading(false);
        return;
      }
    }

    console.log("selected month", selectedMonth);
    console.log("selected year", selectedYear);
    console.log("selected dates", selectedDate, entryDate);
    const payload = {
      id: mainId || null,
      formatNo: "PH-QCL01/F-001",
      revisionNo: "01",
      formatName: "Physical And Chemical Lab Sample Inward Book",
      refSopNo: "PH-QCL01-D-05",
      dateF001: selectedDate || entryDate, // Adjusted to match date format if necessary
      month: selectedMonth || uniqueMonth,
      year: selectedYear || uniqueYear,
      details: formValues.map((form) => ({
        id: form.id || "",
        shift: parseInt(form.shift),
        descriptionOfMaterial: form.materialDescription?.trim(),
        quantity: parseInt(form.quantity),
        bmrNo: form.BMRNo?.trim(),
        uom: form.uom,
        sampleGivenBy: form.sampleGivenBy?.trim(),
        remark: form.remarks?.trim(),
      })),
    };
    console.log("payload", payload);
    const token = localStorage.getItem("token");
    axios
      .post(
        `${   API.prodUrl}/Precot/api/qc/SubmitSampleInwardBookF1F2F3`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        message.success(
          "Physical And Chemical Lab Sample Inward Book Report Submitted Successfully.."
        );
        setSubmitLoading(false);
        navigate("/Precot/QualityControl/inwardBook/Summary");
      })
      .catch((error) => {
        message.error(
          error.response?.data?.message || "Failed to submit report"
        );
        setSubmitLoading(false);
        console.error("Error saving data:", error);
      });
  };

  const deleteRow = (index) => {
    if (formValues.length === 1) {
      alert("At least one row is required.");
      return;
    }
    confirm({
      title: "Are you sure you want to delete this row?",
      content: "This action cannot be undone.",
      onOk() {
        const updatedRows = formValues.filter((row, i) => i !== index); // Filter out the row at the specified index
        setFormValues(updatedRows); // Update the rows state
      },
      onCancel() {
        console.log("User canceled deletion.");
      },
    });
  };

  const canEdit = () => {
    if (
      roleauth === "ROLE_CHEMIST" ||
      roleauth === "ROLE_MICROBIOLOGIST" ||
      roleauth === "ROLE_ETP"
    ) {
      return !(selectedRow?.chemist_status === "CHEMIST_APPROVED");
    } else {
      return false;
    }
  };

  const isEditable = canEdit();

  const canDisplayButtons = () => {
    // console.log("canDisplayButtons entered");
    // If the role is CHEMIST, check chemist_status
    if (roleauth === "ROLE_CHEMIST") {
      // If status is approved, hide the buttons, otherwise, display them
      if (selectedRow.chemist_status === "CHEMIST_APPROVED") {
        // console.log("button hidden");
        return "none";
      } else {
        // console.log("buttonvisibled");
        return "block";
      }
    }
  };

  let formattedOperatorDate;
  if (selectedRow.chemist_submit_on) {
    formattedOperatorDate = moment(selectedRow.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedOperatorDate = ""; // Or any other default value or error handling
  }

  const handleBack = () => {
    navigate("/Precot/QualityControl/inwardBook/Summary");
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Physical And Chemical Lab Sample Inward Book</b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
              marginLeft: "35px",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Shift
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Description of material
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  UOM
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  BMR No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Sample given/Done by (sign)
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Remarks
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {formValues.map((row, index) => (
                <tr key={index}>
                  {/* Date */}
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <div>{row.date}</div>
                  </td>

                  {/* Shift */}
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {row.shift}
                    </div>
                  </td>

                  {/* Material Description */}
                  <td style={{ padding: "5px" }}>
                    <Input
                      value={row.materialDescription}
                      disabled={!isEditable}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "materialDescription",
                          e.target.value
                        )
                      }
                      style={{
                        outline: "none",
                        border: "none",
                        padding: "5px",
                        width: "90%",
                      }}
                    />
                  </td>

                  {/* Quantity */}
                  <td style={{ padding: "5px" }}>
                    <Input
                      type="number"
                      value={row.quantity}
                      disabled={!isEditable}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>

                  {/* UOM */}
                  <td style={{ padding: "5px" }}>
                    <Select
                      value={row.uom}
                      onChange={(value) =>
                        handleInputChange(index, "uom", value)
                      }
                      style={{ width: "100%" }}
                      disabled={!isEditable}
                    >
                      <Select.Option value="Kg">Kg</Select.Option>
                      <Select.Option value="ml">ml</Select.Option>
                      <Select.Option value="g">g</Select.Option>
                      <Select.Option value="Nos">Nos</Select.Option>
                      <Select.Option value="Bags">Bags</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </td>

                  {/* BMR No */}
                  <td style={{ padding: "5px" }}>
                    <Input
                      type="text"
                      value={row.BMRNo}
                      onChange={(e) =>
                        handleInputChange(index, "BMRNo", e.target.value)
                      }
                      disabled={!isEditable}
                    />
                  </td>

                  {/* Sample Given By */}
                  <td style={{ padding: "5px" }}>
                    <Input
                      value={row.sampleGivenBy}
                      style={{
                        outline: "none",
                        border: "none",
                        padding: "5px",
                        width: "90%",
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "sampleGivenBy",
                          e.target.value
                        )
                      }
                      disabled={!isEditable}
                    />
                  </td>

                  {/* Remarks */}
                  <td style={{ padding: "5px" }}>
                    <Input
                      value={row.remarks}
                      style={{
                        outline: "none",
                        border: "none",
                        padding: "5px",
                        width: "90%",
                      }}
                      disabled={!isEditable}
                      onChange={(e) =>
                        handleInputChange(index, "remarks", e.target.value)
                      }
                    />
                  </td>

                  {/* Delete Button */}
                  <td style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash style={{ fontSize: "10px" }} />}
                      onClick={() => deleteRow(index)}
                      disabled={!isEditable}
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
            disabled={!isEditable}
          >
            <AiOutlinePlus style={{ marginRight: "5px" }} />
            Add Row
          </Button>
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
                <b>Created by Chemist Sign & Date</b>
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
                {(selectedRow?.chemist_status === "CHEMIST_SUBMITTED" ||
                  selectedRow?.chemist_status === "CHEMIST_APPROVED") && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.chemist_sign}
                    <br />
                    {formattedOperatorDate}
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
        formName="Physical And Chemical Lab Sample Inward Book"
        formatNo="PH-QCL01/F-001"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_CHEMIST" ? (
            <>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                loading={saveLoading}
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
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ) : (
            <></>
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

export default QCLF001;
