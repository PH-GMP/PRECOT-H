import React, { useState } from "react";
import { Table, Row, Col, Input, Button, message, Form, Select } from "antd";
import axios from "axios";
import { useEffect } from "react";
import API from "../../baseUrl.json";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

export default function Rework(props) {
  const token = localStorage.getItem("token");
  const [id, setId] = useState("");

  // State to manage form fields
  const [formData, setFormData] = useState({
    reworkDate: "",
    machineName: "",
    lotNumber: "",
    reworkReason: "",
    reworkQuantity: "",
    referenceNcNumber: "",
    actionTaken: "",
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const role = localStorage.getItem("role");

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getReworkByBatch?batchNumber=${props.batchNo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const responseData = response.data[0] || {};
        // Clear the form data if no response data is found
        setId(responseData.id || "");
        console.log("id", responseData.id);

        // Set form data only if responseData has values, else reset to empty
        setFormData({
          reworkDate: responseData.reworkDate || "",
          departmentName: responseData.departmentName || "",
          machineName: responseData.machineName || "",
          bmrNumber: responseData.bmrNumber || "",
          lotNumber: responseData.lotNumber || "N/A",
          reworkReason: responseData.reworkReason || "N/A",
          reworkQuantity: responseData.reworkQuantity || "N/A",
          referenceNcNumber: responseData.referenceNcNumber || "N/A",
          actionTaken: responseData.actionTaken || "N/A",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, [props.batchNo]);

  // Function to save form data

  const saveData = async () => {
    if (!props.batchNo) {
      message.warning("Please select Batch No");
      return;
    }
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/buds/bmr/saveReworkForm`,

        {
          ...formData,
          bmrNumber: props.batchNo,
          departmentName: "COTTON_BUDS",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data saved successfully:", response.data);
      if (response.data?.id) {
        setId(response.data.id);
      }
      message.success("Saved Successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Save");
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const submitData = async () => {
    if (!props.batchNo) {
      message.warning("Please select Batch No");
      return;
    }
    try {
      let response;
      if (role === "ROLE_HOD" || role === "ROLE_QA") {
        response = await axios.put(
          `${API.prodUrl}/Precot/api/buds/bmr/approveReworkForm`,
          {
            id: id,
            status: "Approve",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Submitted Successfully");
        setIsDisabled(true);
      } else {
        response = await axios.post(
          `${API.prodUrl}/Precot/api/buds/bmr/submitReworkForm`,
          {
            ...formData,
            bmrNumber: props.batchNo,
            departmentName: "COTTON_BUDS",
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        message.success("Submitted Successfully");
        setIsSubmitted(true);
        setIsDisabled(true);
      }

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting/approving data:", error);
      message.error("Unable to Submit ");
    }
  };

  const [machineOptions, setMachineOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API.prodUrl}/Precot/api/buds/sap/Service/machineList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMachineOptions(res.data);
        console.log("machine options", res.data.value);
      })
      .catch((error) => {
        console.error("Error fetching machine options:", error);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1em",
          gap: "1em",
        }}
      >
        {role !== "ROLE_HOD" && role !== "ROLE_QA" && (
          <Button
            type="primary"
            style={{
              backgroundColor: isDisabled ? "#F5F5F5" : "#E5EEF9",
              color: isDisabled ? "#F5F5F5" : "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={saveData}
          >
            Save
          </Button>
        )}

        <Button
          type="primary"
          style={{
            backgroundColor: isDisabled ? "#F5F5F5" : "#E5EEF9",
            color: isDisabled ? "#F5F5F5" : "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          onClick={submitData}
        >
          Submit
        </Button>
      </div>
      <Table
        bordered
        pagination={false}
        columns={[
          {
            title: "",
            dataIndex: "value",
            key: "value",
            render: (text, record) => {
              switch (record.key) {
                case "1":
                  return (
                    <Row gutter={17} align="middle" style={{ height: "40px" }}>
                      <Col span={1.5}>
                        <label>Date:</label>
                      </Col>
                      <Col span={3.5}>
                        <Input
                          type="date"
                          placeholder="Select Date"
                          value={formData.reworkDate}
                          max={new Date().toISOString().split("T")[0]} // Sets max to today's date
                          disabled={
                            isSubmitted ||
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA"
                          }
                          onChange={(e) =>
                            handleChange("reworkDate", e.target.value)
                          }
                        />
                      </Col>
                    </Row>
                  );
                case "2":
                  return (
                    <Row gutter={18} align="middle" style={{ height: "40px" }}>
                      <Col span={3}>
                        <label>Department Name:</label>
                      </Col>
                      <Col span={7}>
                        <Input
                          placeholder="Enter Department Name"
                          value={"COTTON_BUDS"}
                          disabled
                          onChange={(e) =>
                            handleChange("departmentName", e.target.value)
                          }
                        />
                      </Col>
                      <Col span={2}>
                        <label>Machine No:</label>
                      </Col>
                      <Col span={7}>
                        <Select
                          placeholder="Select Machine No"
                          value={formData.machineName}
                          disabled={
                            isSubmitted ||
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA"
                          }
                          onChange={(value) =>
                            handleChange("machineName", value)
                          }
                          style={{ width: "200px" }}
                        >
                          {machineOptions.map((option) => (
                            <Select.Option key={option.id} value={option.value}>
                              {option.value} {/* Display the value here */}
                            </Select.Option>
                          ))}
                        </Select>
                      </Col>
                    </Row>
                  );
                case "3":
                  return (
                    <Row gutter={18} align="middle" style={{ height: "40px" }}>
                      <Col span={2}>
                        <label>BMR No:</label>
                      </Col>
                      <Col span={7}>
                        <Input
                          placeholder="Enter BMR No"
                          value={props.batchNo}
                          disabled
                          required
                          onChange={(e) =>
                            handleChange("bmrNumber", e.target.value)
                          }
                        />
                      </Col>
                      <Col span={3.5}>
                        <label>Lot No.:/ Julian Date:</label>
                      </Col>
                      <Col span={7}>
                        <Input
                          placeholder="Enter Lot No.:/ Julian Date"
                          value={formData.lotNumber}
                          disabled={
                            isSubmitted ||
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA"
                          }
                          onChange={(e) =>
                            handleChange("lotNumber", e.target.value)
                          }
                        />
                      </Col>
                    </Row>
                  );
                case "4":
                  return (
                    <Row gutter={18} align="middle" style={{ height: "40px" }}>
                      <Col span={3}>
                        <label>Reason for Work:</label>
                      </Col>
                      <Col span={9}>
                        <Input
                          placeholder="Enter Reason for Work"
                          value={formData.reworkReason}
                          disabled={
                            isSubmitted ||
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA"
                          }
                          onChange={(e) =>
                            handleChange("reworkReason", e.target.value)
                          }
                        />
                      </Col>
                    </Row>
                  );
                case "5":
                  return (
                    <Row gutter={18} align="middle" style={{ height: "45px" }}>
                      <Col span={3}>
                        <label>Rework Qty. In Bags/ Boxes:</label>
                      </Col>
                      <Col span={9}>
                        <Input
                          placeholder="Enter Rework Qty. In Bags/ Boxes"
                          value={formData.reworkQuantity}
                          disabled={
                            isSubmitted ||
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA"
                          }
                          onChange={(e) =>
                            handleChange("reworkQuantity", e.target.value)
                          }
                        />
                      </Col>
                    </Row>
                  );
                case "6":
                  return (
                    <Row gutter={18} align="middle" style={{ height: "40px" }}>
                      <Col span={3.5}>
                        <label>Reference NC No (if):</label>
                      </Col>
                      <Col span={9}>
                        <Input
                          placeholder="Enter Reference NC No (if)"
                          value={formData.referenceNcNumber}
                          disabled={
                            isSubmitted ||
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA"
                          }
                          onChange={(e) =>
                            handleChange("referenceNcNumber", e.target.value)
                          }
                        />
                      </Col>
                    </Row>
                  );
                case "7":
                  return (
                    <Row
                      gutter={18}
                      span={1.5}
                      align="middle"
                      style={{ minHeight: "90px" }}
                    >
                      {" "}
                      {/* Adjust minHeight as needed */}
                      <Col span={3}>
                        <label>Action taken:</label>
                      </Col>
                      <Col span={15}>
                        <Input.TextArea
                          placeholder="Enter Action taken"
                          value={formData.actionTaken}
                          onChange={(e) =>
                            handleChange("actionTaken", e.target.value)
                          }
                          rows={1.7}
                          disabled={
                            isSubmitted ||
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA"
                          }
                          style={{ minHeight: "80px" }}
                        />
                      </Col>
                    </Row>
                  );
                default:
                  return (
                    <Input placeholder={`Enter ${record.field}`} value={text} />
                  );
              }
            },
          },
        ]}
        dataSource={[
          { key: "1", field: "Date" },
          { key: "2", field: "Department Name, Machine No" },
          { key: "3", field: "BMR No , Lot No.:/ Julian Date" },
          { key: "4", field: "Reason for Rework" },
          { key: "5", field: "Rework Qty. In Bags/ Boxes" },
          { key: "6", field: "Reference NC No (if)" },
          { key: "7", field: "Action taken:" },
        ]}
      />
    </div>
  );
}
