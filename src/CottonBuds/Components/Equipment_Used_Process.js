import { Button, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../baseUrl.json";
import moment from "moment/moment";

const Equipment_Used_Process = (props) => {
  const [EquipmentData, setEquipmentData] = useState([
    {
      id: 1,
      equipment_name: "",
      equipment_code: "",
      date_of_calibration: "",
      calibration_due_on: "",
      checked_by_sign: "",
      checked_by_date: "",
      checked_id: "",
    },
    {
      id: 2,
      equipment_name: "",
      equipment_code: "",
      date_of_calibration: "",
      calibration_due_on: "",
      checked_by_sign: "",
      checked_by_date: "",
      checked_id: "",
    },
    {
      id: 3,
      equipment_name: "",
      equipment_code: "",
      date_of_calibration: "",
      calibration_due_on: "",
      checked_by_sign: "",
      checked_by_date: "",
      checked_id: "",
    },
    {
      id: 4,
      equipment_name: "",
      equipment_code: "",
      date_of_calibration: "",
      calibration_due_on: "",
      checked_by_sign: "",
      checked_by_date: "",
      checked_id: "",
    },
  ]);
  const [disable, setDisable] = useState(false);
  const [supApproved, setSupApproved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);
  const [equipmentId, setEquipmentId] = useState("");

  const updateEquipment = (id, field, newValue) => {
    const updatedItems = EquipmentData.map((item) =>
      item.id === id ? { ...item, [field]: newValue } : item
    );
    setEquipmentData(updatedItems);
  };

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getEquipmentDetailsByBatch?batchNo=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        //supervisor_status
        setDisable(
          res.data[0].supervisor_status == "SUPERVISOR_APPROVED" ? true : false
        );
        setEquipmentId(res.data[0].equipmentId);
        setQaApproved(
          res.data[0].supervisor_status == "QA_APPROVED" ? true : false
        );
        setSupApproved(
          res.data[0].supervisor_status == "SUPERVISOR_APPROVED" ? true : false
        );
        const transformedData = res.data[0]?.details.map((item, index) => ({
          id: item.id || "",
          equipment_name: item.equipmentName || "",
          equipment_code: item.equipmentCode || "",
          date_of_calibration: item.dateOfCalibration || "",
          calibration_due_on: item.calibrationDueOn || "",
          checked_by_sign: item.checked_name || "",
          checked_by_date: item.checked_time || "",
          checked_id: item.checked_id || "",
        }));

        if (transformedData) setEquipmentData(transformedData);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [props.batchNo]);

  const submitEquipment = () => {
    if (
      props.loggedInQa &&
      EquipmentData.every(
        (x) =>
          x.calibration_due_on.length == 0 ||
          x.checked_by_date.length == 0 ||
          x.checked_by_sign.length == 0 ||
          x.date_of_calibration == 0 ||
          x.equipment_name.length == 0
      )
    ) {
      message.error("Please Select All Fields Before Submit");
    } else {
      console.log("Submitting Data", EquipmentData);
      const payload = {
        equipmentId: equipmentId,
        orderNo: props.orderNo,
        batchNo: props.batchNo,
        department: "Pad Punching",
        details: EquipmentData.map((item) => ({
          equipmentName: item.equipment_name,
          equipmentCode: item.equipment_code,
          dateOfCalibration: item.date_of_calibration,
          calibrationDueOn: item.calibration_due_on,
          checked_name: item.checked_by_sign,
          checked_time: item.checked_by_date,
          checked_id: item.checked_id,
        })),
      };
      axios
        .post(
          `${API.prodUrl}/Precot/api/buds/bmr/submitEquipmentDetails`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Equipment Used Process Submitted Successfully");

          //get api called here
          axios
            .get(
              `${API.prodUrl}/Precot/api/buds/bmr/getEquipmentDetailsByBatch?batchNo=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              console.log("Response", res.data);
              //supervisor_status
              setDisable(
                res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
              setQaApproved(
                res.data[0].supervisor_status == "QA_APPROVED" ? true : false
              );
              setSupApproved(
                res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
              const transformedData = res.data[0]?.details.map(
                (item, index) => ({
                  id: EquipmentData[index]?.id || index + 1, // Preserve current id or assign a new one if undefined
                  equipment_name: item.equipmentName || "",
                  equipment_code: item.equipmentCode || "",
                  date_of_calibration: item.dateOfCalibration || "",
                  calibration_due_on: item.calibrationDueOn || "",
                  checked_by_sign: item.checked_name || "",
                  checked_by_date: item.checked_time || "",
                  checked_id: item.checked_id || "",
                })
              );

              if (transformedData) setEquipmentData(transformedData);
            })
            .catch((err) => {
              console.log("Error", err);
            });
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  //Save
  const saveEquipment = () => {
    console.log("Submitting Data", EquipmentData);
    const payload = {
      equipmentId: equipmentId,
      orderNo: props.orderNo,
      batchNo: props.batchNo,
      department: "Pad Punching",
      details: EquipmentData.map((item) => ({
        equipmentName: item.equipment_name,
        equipmentCode: item.equipment_code,
        dateOfCalibration: item.date_of_calibration,
        calibrationDueOn: item.calibration_due_on,
        checked_name: item.checked_by_sign,
        checked_time: item.checked_by_date,
        checked_id: item.checked_id,
      })),
    };
    axios
      .post(`${API.prodUrl}/Precot/api/buds/bmr/saveEquipmentDetails`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Response", res.data);
        message.success("Equipment Used Process Submitted Successfully");

        //get api called here
        axios
          .get(
            `${API.prodUrl}/Precot/api/buds/bmr/getEquipmentDetailsByBatch?batchNo=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("Response", res.data);
            //supervisor_status
            setDisable(
              res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                ? true
                : false
            );
            setQaApproved(
              res.data[0].supervisor_status == "QA_APPROVED" ? true : false
            );
            setSupApproved(
              res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                ? true
                : false
            );
            const transformedData = res.data[0]?.details.map((item, index) => ({
              id: EquipmentData[index]?.id || index + 1, // Preserve current id or assign a new one if undefined
              equipment_name: item.equipmentName || "",
              equipment_code: item.equipmentCode || "",
              date_of_calibration: item.dateOfCalibration || "",
              calibration_due_on: item.calibrationDueOn || "",
              checked_by_sign: item.checked_name || "",
              checked_by_date: item.checked_time || "",
              checked_id: item.checked_id || "",
            }));

            if (transformedData) setEquipmentData(transformedData);
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
    //  }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            display:
              disable ||
              (props.loggedInQa && qaApproved) ||
              !props.loggedInSupervisor
                ? "none"
                : "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
          }}
          shape="round"
          onClick={saveEquipment}
        >
          Save
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            display:
              disable ||
              (props.loggedInQa && qaApproved) ||
              !props.loggedInSupervisor
                ? "none"
                : "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
          }}
          shape="round"
          onClick={submitEquipment}
        >
          Submit
        </Button>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Equipment Name</th>
            <th>Equipment Code</th>
            <th>Date Of Calibration</th>
            <th>Calibration Due On</th>
            <th>Checked By Sign & Date</th>
          </tr>
        </thead>
        <tbody>
          {EquipmentData.map((x, i) => (
            <tr key={x.id}>
              <td align="center">{i + 1}</td>
              <td>
                <Select
                  className="inp-new"
                  options={props.machineLov}
                  value={x.equipment_name}
                  onChange={(e) => updateEquipment(x.id, "equipment_name", e)}
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }
                />
              </td>
              <td>
                <Input
                  className="inp-new"
                  value={x.equipment_code}
                  onChange={(e) =>
                    updateEquipment(x.id, "equipment_code", e.target.value)
                  }
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }
                />
              </td>
              <td>
                <Input
                  className="inp-new"
                  type="datetime-local"
                  value={x.date_of_calibration}
                  onChange={(e) =>
                    updateEquipment(x.id, "date_of_calibration", e.target.value)
                  }
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }
                />
              </td>
              <td>
                <Input
                  className="inp-new"
                  type="datetime-local"
                  value={x.calibration_due_on}
                  onChange={(e) =>
                    updateEquipment(x.id, "calibration_due_on", e.target.value)
                  }
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }
                />
              </td>
              <td>
                <Select
                  className="inp-new"
                  options={props.supLov}
                  value={x.checked_by_sign}
                  onChange={(e) => updateEquipment(x.id, "checked_by_sign", e)}
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }
                />
                <br />
                <Input
                  className="inp-new"
                  type="datetime-local"
                  value={moment(x.checked_by_date).format("YYYY-MM-DDTHH:MM")}
                  onChange={(e) =>
                    updateEquipment(x.id, "checked_by_date", e.target.value)
                  }
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
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
