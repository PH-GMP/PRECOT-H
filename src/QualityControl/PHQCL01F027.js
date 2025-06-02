import React, { useState, useEffect } from "react";
import {
  InputNumber,
  Dropdown,
  Space,
  Input,
  input,
  Form,
  DatePicker,
  Button,
  Tabs,
  message,
  Tooltip,
  Modal,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import API from "../baseUrl.json";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { FaUserCircle } from "react-icons/fa";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const PHQCL01F027 = () => {
  const formatName = "DISTILLED WATER CONSUMPTION REPORT";
  const formatNo = "PH-QCL01/F-027";
  const revisionNo = "05";
  const sopNo = "PH-QCL01-D-13";
  const unit = "Unit H";
  const [getImage3, setGetImage3] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { uniqueDate, uniqueEqNo } = location.state || {};
  const [selectedRow, setSelectedRow] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    test_id: "",
    eq_id: uniqueEqNo || "", // Initial value, can be changed
    remarks: "", // Initial value, can be changed
    taken_by: "", // Initial value, can be changed
    quantity_taken: "", // Initial value, can be changed
    quantity_prepared: "",
    op_stock: "", // Initial value, can be changed
    remaining_stock: "", // Initial value, can be changed
    date: uniqueDate || "", // Initial value, can be changed
    month: "", // Initial value, can be changed
    year: "", // Initial value, can be changed
  });

  let formattedMicroDate;
  if (selectedRow.micro_submit_on) {
    formattedMicroDate = moment(selectedRow.micro_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }
  let formattedChemistDate;
  if (selectedRow.chemist_submit_on) {
    formattedChemistDate = moment(selectedRow.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where chemist_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }

  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const onClose = () => {
    setOpen(false);
  };

  const canDisplayButtons = () => {
    if (roleauth === "LAB_ASSISTANT") {
      if (selectedRow?.chemist_status === "LAB_ASSISTANT_APPROVED") {
        return "none";
      } else {
        return "block";
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.micro_sign || selectedRow?.chemist_sign; // Check both signs

    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          setGetImage3(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow.micro_sign, selectedRow.chemist_sign,      API.prodUrl]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const params = {
      eq_no: uniqueEqNo,
      date: uniqueDate,
    };

    // Function to merge the API response and keep existing payload fields
    const mergePayload = (newData) => {
      setFormData((prevPayload) => ({
        ...prevPayload,
        ...newData,
        date: newData.date || prevPayload.date, // Preserving date if not provided in newData
      }));
    };

    // Fetch data based on date or eq
    if (uniqueDate) {
      axios
        .get(`${    API.prodUrl}/Precot/api/chemicaltest/CLF027`, { headers, params })
        .then((response) => {
          if (
            response.data &&
            response.data !== "No data found for the provided parameters" &&
            Array.isArray(response.data) &&
            response.data.length > 0
          ) {
            console.log("Data found for date:", uniqueDate);
            const dataItem = response.data[0]; // Get the first item
            setSelectedRow(dataItem);

            mergePayload(dataItem); // Merging first response item into payload
          } else {
            console.log(
              "No data found, updating payload with the provided date:",
              uniqueDate
            );
            mergePayload({ date: uniqueDate }); // Updating only the date
          }
        })
        .catch((err) => {
          console.error("Error fetching data by date:", err);
        });
    }
  }, [uniqueDate, uniqueEqNo, token]);

  useEffect(() => {
    console.log("uniqueDate", uniqueDate, uniqueEqNo);
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

      // Update the formData state directly with the month and year
      setFormData((prevValues) => ({
        ...prevValues,
        month: monthNames[monthNumber],
        year: year,
      }));
    }
  }, [uniqueDate]);

  const handleChange = (e) => {
    console.log(e); // Debugging line
    if (e.target) {
      const { name, value } = e.target; // Destructure only if target is defined
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      console.error("Event target is undefined");
    }
  };

  const handleSubmit = async () => {
    // Constructing the payload
    const payload = {
      test_id: formData.test_id || "",
      format: "PDF",
      format_no: "F001",
      ref_sop_no: "SOP-123",
      unit: "mg",

      date: formData.date || uniqueDate, // From state
      year: formData.year, // From state
      month: formData.month, // From state
      op_stock: formData.op_stock || "N/A", // You might want to set this dynamically
      quantity_taken: formData.quantity_taken || "N/A", // From state
      taken_by: formData.taken_by || "N/A", // From state
      remaining_stock: formData.remaining_stock || "N/A", // From state
      quantity_prepared: formData.quantity_prepared || "N/A", // From state
      remarks: formData.remarks || "N/A", // From state
      frequency: "Monthly", // Replace with dynamic value if needed
      eq_id: formData.eq_id || uniqueEqNo, // From state
      reason: "", // Replace with dynamic value if needed
    };
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(`${    API.prodUrl}/Precot/api/chemicaltest/CLF027/submit/temp`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Report submitted Successfully");

        // Update form values with new data from the response if needed
        setFormData((prevFormData) => ({
          ...prevFormData,
          test_id: response.data.test_id || prevFormData.test_id, // Update ID from backend if available
          date: response.data.date || prevFormData.date, // Update date from backend if available
          year: response.data.year || prevFormData.year, // Update year from backend if available
          month: response.data.month || prevFormData.month, // Update month from backend if available
          quantity_taken:
            response.data.quantity_taken || prevFormData.quantity_taken, // Update quantity taken from backend
          taken_by: response.data.taken_by || prevFormData.taken_by, // Update taken by from backend
          remaining_stock:
            response.data.remaining_stock || prevFormData.remaining_stock, // Update remaining stock from backend
          quantity_prepared:
            response.data.quantity_prepared || prevFormData.quantity_prepared, // Update quantity prepared from backend
          remarks: response.data.remarks || prevFormData.remarks, // Update remarks from backend
          eq_id: response.data.eq_id || prevFormData.eq_id, // Update eq_id from backend

          status: response.data.status || prevFormData.status, // Update status from backend if available
          // Add other fields if required
        }));

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/Precot/QualityControl/PH-QCF-027/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/PH-QCF-027/Summary");
  };
  const handleSave = () => {
    // Check if test_id exists to determine whether to create or update

    // Constructing the payload
    const payload = {
      test_id: formData.test_id || "", // Use the existing test_id if available, else keep it empty
      format: "PDF", // Static or predefined value
      format_no: "F001", // Static or predefined value
      ref_sop_no: "SOP-123", // Static or predefined value
      unit: "mg", // Static or predefined value
      date: formData.date || uniqueDate, // Date from formData or uniqueDate
      year: formData.year || "", // Year from formData
      month: formData.month || "", // Month from formData
      op_stock: formData.op_stock || "0", // From formData
      quantity_taken: formData.quantity_taken || "0", // From formData
      taken_by: formData.taken_by, // From formData
      remaining_stock: formData.remaining_stock || "0", // From formData
      quantity_prepared: formData.quantity_prepared || "0", // From formData
      remarks: formData.remarks || "N/A", // From formData
      frequency: "Monthly", // Static or predefined value
      eq_id: formData.eq_id || uniqueEqNo, // Equipment No. from formData or uniqueEqNo
      reason: "Test approved", // Static or predefined value
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(`${    API.prodUrl}/Precot/api/chemicaltest/CLF027/save/temp`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Report Saved Successfully");

        // Update form data with new data from the response if needed
        if (response.data.test_id) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            test_id: response.data.test_id, // Update ID from backend
            date: response.data.date || prevFormData.date || "N/A", // Update date from backend
            quantity_taken: response.data.quantity_taken || "N/A", // Update quantity taken from backend
            taken_by: response.data.taken_by || "N/A", // Update taken by from backend
            remaining_stock: response.data.remaining_stock || "N/A", // Update remaining stock from backend
            quantity_prepared: response.data.quantity_prepared || "N/A", // Update quantity prepared from backend
            remarks: response.data.remarks || "N/A", // Update remarks from backend
            status: response.data.status || prevFormData.status || "N/A", // Update status from backend if available
          }));
        }

        // Navigate to summary page after a delay
        setTimeout(() => {
          navigate("/Precot/QualityControl/PH-QCF-027/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
          <table
            className="table-1"
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",

              maxWidth: "90%",
              marginLeft: "50px",
              marginTop: "30px",
            }}
          >
            <tbody>
              <tr>
                <th style={{ padding: "10px" }}>Date</th>
                <th colSpan="5" style={{ padding: "10px" }}>
                  Opening Stock (approx. In Lit.){" "}
                </th>
                <th colSpan="5" style={{ padding: "10px" }}>
                  Quantity Taken (approx. In Lit.)
                </th>
                <th colSpan="5" style={{ padding: "10px" }}>
                  Remaining Stock (approx. In Lit.)
                </th>
                <th colSpan="5" style={{ padding: "10px" }}>
                  Quantity Prepared (approx. In Lit.)
                </th>
                <th colSpan="5" style={{ padding: "10px" }}>
                  Remarks
                </th>
              </tr>
              <tr>
                <td style={{ padding: "10px" }}>{uniqueDate}</td>
                <td colSpan="5" style={{ padding: "10px" }}>
                  <Input
 
                    min="0"
                    step="0.1"
                    onChange={handleChange}
                    name="op_stock" // Update status
                    value={formData.op_stock}
                    // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      maxWidth: "100%",
                    }}
                  />
                </td>
                <td colSpan="5" style={{ padding: "10px" }}>
                  <Input
                    min="0"
                    step="0.1"
                    onChange={handleChange}
                    name="quantity_taken" // Update status
                    value={formData.quantity_taken} // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      maxWidth: "100%",
                    }}
                  />
                </td>

                <td colSpan="5" style={{ padding: "10px" }}>
                  <Input
                      
                    min="0"
                    step="0.1"
                    onChange={handleChange}
                    name="remaining_stock" // Update status
                    value={formData.remaining_stock}
                    // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      maxWidth: "100%",
                    }}
                  />
                </td>
                <td colSpan="5" style={{ padding: "10px" }}>
                  <Input
                    
                    min="0"
                    step="0.1"
                    onChange={handleChange}
                    name="quantity_prepared" // Update status
                    value={formData.quantity_prepared}
                    // Bind value to formValues state
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      maxWidth: "100%",
                    }}
                  />
                </td>
                <td colSpan="5" style={{ padding: "10px" }}>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      maxWidth: "100%",
                    }}
                    onChange={handleChange}
                    name="remarks"
                    value={formData.remarks}
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
      label: <p>Review</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                Checked By:
              </td>
            </tr>

            <tr>
              <td
                colSpan="12"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {selectedRow?.micro_status === "MICROBIOLOGIST_APPROVED" && (
                  <>
                    {getImage3 && (
                      <img
                        className="signature"
                        src={getImage3}
                        alt="Microbiologist Signature"
                      />
                    )}
                    <br />
                    {selectedRow.micro_sign}
                    <br />
                    {formattedMicroDate}
                  </>
                )}

                {selectedRow?.chemist_status === "CHEMIST_APPROVED" && (
                  <>
                    {getImage3 && (
                      <img
                        className="signature"
                        src={getImage3}
                        alt="Chemist Signature"
                      />
                    )}
                    <br />
                    {selectedRow.chemist_sign}
                    <br />
                    {formattedChemistDate}{" "}
                    {/* Replace with actual date format for chemist */}
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
      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <BleachingHeader
          unit={unit}
          formName={formatName}
          formatNo={formatNo}
          // MenuBtn={
          //   <Button
          //     type="primary"
          //     icon={<TbMenuDeep />}
          //     onClick={showDrawer}
          //   ></Button>
          // }
          buttonsArray={[
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
            </>,
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
      </div>

      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Input
          addonBefore="date"
          placeholder="date"
          value={uniqueDate}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="EQ.id"
          placeholder="EQ.id"
          value={uniqueEqNo}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        style={{
          display: "flex",
          width: "100%",
          position: "relative",
          left: "2%",
        }}
      />
    </>
  );
};

export default PHQCL01F027;
