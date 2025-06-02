/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-label-var */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { Button, Input, message, Select } from "antd";
import axios from "axios";
import API from "../../baseUrl.json";

const Equipment_Used_Process = (props) => {
  console.log("props", props);
  const [messageApi, contextHolder] = message.useMessage();
  const [userLov, setUserLov] = useState([]);
  const role = localStorage.getItem("role");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [equipmentData, setEquipmentData] = useState([
    {
      equipmentName: "BALE PLUCKER",
      equipmentCode: "PH-E/I-BAL02",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "MBO",
      equipmentCode: "PH-E/I-WRL/PLT08",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "ERM",
      equipmentCode: "PH-E/I-WRL/PLT09",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "C1/3 Card - 1",
      equipmentCode: "PH-E/I-WRL/PLT10",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "C1/3 Card - 3",
      equipmentCode: "PH-E/I-WRL/PLT12",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "C1/3 Card - 4",
      equipmentCode: "PH-E/I-WRL/PLT13",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "Pleat M/C 1",
      equipmentCode: "PH-E/I-PLT14",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "Pleat M/C 2",
      equipmentCode: "PH-E/I-PLT15",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "WEIGHING SCALE",
      equipmentCode: "PH-WM-12",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
    {
      equipmentName: "Metal Detector",
      equipmentCode: "PH-E/I-WRL/PLT17",
      calibrationDate: "",
      dueDate: "",
      checked_by: "",
      remarks: "",
    },
  ]);

  const usernameSupervisor =
  role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

 

  useEffect(() => {
    // Fetch role-based department names for dropdown
    axios
      .get(
        `${ API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=DRY_GOODS`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        let a;
        switch (role) {
          case "ROLE_QA":
            a = res.data
              .filter((option) => option.role === "ROLE_QA")
              .map((option) => ({
                value: option.username,
                label: option.username,
              }));
            break;

          case "ROLE_SUPERVISOR":
            a = res.data
              .filter((option) => option.role === "ROLE_SUPERVISOR")
              .map((option) => ({
                value: option.username,
                label: option.username,
              }));
            break;

          case "ROLE_DESIGNEE":
          case "ROLE_HOD":
            a = res.data
              .filter(
                (option) =>
                  option.role === "ROLE_DESIGNEE" || option.role === "ROLE_HOD"
              )
              .map((option) => ({
                value: option.username,
                label: option.username,
              }));
            break;

          default:
            a = [];
        }
        setUserLov(a);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Unable to fetch QA Caused Network Error",
        });
      });
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const today = getCurrentDate();
  useEffect(() => {
    if (props.batchNo) {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/cottonPleat/05.GetProcessEqupDetails?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("res", response.data[0].equp_id);
          const data = response.data[0]?.details || [];
          setData1(response.data[0].equp_id);
          console.log("234", data1.equp_id);
          if (data.length > 0) {
            setEquipmentData(data);
            // setIsSubmitted(true);
            if (response.data[0].status === "SUPERVISOR_APPROVED") {
              setIsSubmitted(true);
            } else {
              setIsSubmitted(false);
            }
          } else {
            // Clear the old data if the response is empty
            setEquipmentData([
              {
                equipmentName: "BALE PLUCKER",
                equipmentCode: "PH-E/I-BAL02",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "MBO",
                equipmentCode: "PH-E/I-WRL/PLT08",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "ERM",
                equipmentCode: "PH-E/I-WRL/PLT09",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "C1/3 Card - 1",
                equipmentCode: "PH-E/I-WRL/PLT10",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "C1/3 Card - 3",
                equipmentCode: "PH-E/I-WRL/PLT12",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "C1/3 Card - 4",
                equipmentCode: "PH-E/I-WRL/PLT13",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "Pleat M/C 1",
                equipmentCode: "PH-E/I-PLT14",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "Pleat M/C 2",
                equipmentCode: "PH-E/I-PLT15",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "WEIGHING SCALE",
                equipmentCode: "PH-WM-12",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
              {
                equipmentName: "Metal Detector",
                equipmentCode: "PH-E/I-WRL/PLT17",
                calibrationDate: "",
                dueDate: "",
                checked_by: "",
                remarks: "",
              },
            ]);
            setIsSubmitted(false);
          }
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: "Failed to load equipment data",
          });
          setIsSubmitted(false);
        });
    }
  }, [props.batchNo]);

  console.log("equii", equipmentData);

  const handleInputChange = (index, field, value) => {
    const newData = [...equipmentData];
    newData[index][field] = value;
    setEquipmentData(newData);
  };

  

  const handleSave = async () => {
    if (!props.batchNo) {
      message.error("Batch No is required");
      return;
    }
    try {
      const payload = {
        equp_id: data1,
        order_no: props.orderNo,
        batch_no: props.batchNo,
        details: equipmentData.map((detail) => {
          const details = {
            id: detail.id,
            equipmentName: detail.equipmentName,
            equipmentCode: detail.equipmentCode,
            calibrationDate: detail.calibrationDate,
            dueDate: detail.dueDate,
            checked_by: detail.checked_by,
            remarks: detail.remarks || "",
          };
          return details;
        }),
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/cottonPleat/05.SaveProcessingEquipments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Data Saved successfully");
      setIsSubmitted(true);
      axios
        .get(
          `${ API.prodUrl}/Precot/api/cottonPleat/05.GetProcessEqupDetails?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          const data = response.data[0]?.details || [];
          setData1(response.data[0].equp_id);
          console.log("234", data1.equp_id);
          if (data.length > 0) {
            setEquipmentData(data);
            // setIsSubmitted(true);
            if (response.data[0].status === "SUPERVISOR_APPROVED") {
              setIsSubmitted(true);
            } else {
              setIsSubmitted(false);
            }
          }
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: "Failed to load equipment data",
          });
          setIsSubmitted(false);
        });
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!props.batchNo) {
      message.error("Batch No is required");
      return;
    }
    try {
      const payload = {
        equp_id: data1,
        order_no: props.orderNo,
        batch_no: props.batchNo,
        // details: equipmentData,
        details: equipmentData.map((detail) => {
          const details = {
            id: detail.id,
            equipmentName: detail.equipmentName,
            equipmentCode: detail.equipmentCode,
            calibrationDate: detail.calibrationDate,
            dueDate: detail.dueDate,
            checked_by: detail.checked_by,
            remarks: detail.remarks || "NA",
          };
          return details;
        }),
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/cottonPleat/05.SubmitProcessingEquipments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Data submitted successfully");
      setIsSubmitted(true);
      axios
        .get(
          `${ API.prodUrl}/Precot/api/cottonPleat/05.GetProcessEqupDetails?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          const data = response.data[0]?.details || [];
          setData1(response.data[0].equp_id);
          console.log("234", data1.equp_id);
          if (data.length > 0) {
            setEquipmentData(data);
            // setIsSubmitted(true);
            if (response.data[0].status === "SUPERVISOR_APPROVED") {
              setIsSubmitted(true);
            } else {
              setIsSubmitted(false);
            }
          }
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: "Failed to load equipment data",
          });
          setIsSubmitted(false);
        });
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  console.log("Logged in as QA:", props.loggedInQa);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1em",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginRight: "10px",
          }}
          shape="round"
          onClick={handleSave}
          disabled={isSubmitted}
        >
          Save
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          disabled={isSubmitted}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th colSpan="7" style={{ textAlign: "left" }}>
              5.0 EQUIPMENT USED FOR THE PROCESS:
            </th>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>S. No.</th>
            <th>Equipment Name</th>
            <th>Equipment code</th>
            <th>Date of Calibration</th>
            <th>Calibration due on</th>
            <th>Checked by</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {equipmentData.map((equipment, index) => (
            <tr style={{ textAlign: "center" }} key={index}>
              <td>{index + 1}</td>
              <td>{equipment.equipmentName}</td>
              <td>{equipment.equipmentCode}</td>
              <td>
                <Input
                  type="date"
                  value={equipment.calibrationDate}
                  max={today}
                  onChange={(e) =>
                    handleInputChange(index, "calibrationDate", e.target.value)
                  }
                  readOnly={
                    isSubmitted || props.loggedInHod || props.loggedInQa
                  }
                />
              </td>
              <td>
                <Input
                  type="date"
                  max={today}
                  value={equipment.dueDate}
                  onChange={(e) =>
                    handleInputChange(index, "dueDate", e.target.value)
                  }
                  readOnly={
                    isSubmitted || props.loggedInHod || props.loggedInQa
                  }
                />
              </td>
              <td>
                <div style={{ display: "flex" }}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    options={userLov}
                    value={equipment.checked_by || usernameSupervisor}
                    onChange={(e) => handleInputChange(index, "checked_by", e)}
                    disabled={
                      isSubmitted || props.loggedInHod || props.loggedInQa
                    }
                  />
                </div>
              </td>
              <td>
                <Input
                  value={equipment.remarks}
                  onChange={(e) =>
                    handleInputChange(index, "remarks", e.target.value)
                  }
                  placeholder="Remarks"
                  readOnly={
                    isSubmitted || props.loggedInHod || props.loggedInQa
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Equipment_Used_Process;
