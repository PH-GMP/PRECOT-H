import { Button, Input, Radio, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GrDocumentStore } from "react-icons/gr";
import API from "../../baseUrl.json";

const Manufacturing_Steps = (props) => {
  const token = localStorage.getItem("token");
  const [messageApi, contextHolder] = message.useMessage();
  const [newSave, setNewSave] = useState(false);
  const initialized = useRef(false);
  const [status, setStatus] = useState({
    supervisor_saved: false,
    supervisor_approved: false,
    qa_saved: false,
    qa_approved: false,
    supervisor_status: "",
  });
  const [primaryKeys, setPrimaryKeys] = useState({
    masterId: "",
    id_1: "",
    id_2: "",
    id_3: "",
    id_4: "",
  });
  const [ManufacturingSteps, setManufacturingSteps] = useState({
    operation_1_observation: "",
    operation_1_performed_Sign: "",
    operation_1_performed_Date: "",
    operation_1_checked_Sign: "",
    operation_1_checked_Date: "",
    operation_2_1: "",
    operation_2_2: "",
    operation_2_3: "",
    operation_2_4: "",
    operation_2_5: "",
    operation_2_observation1: "",
    operation_2_observation2: "",
    operation_2_observation3: "",
    operation_2_performed_Sign: "",
    operation_2_performed_Date: "",
    operation_2_checked_Sign: "",
    operation_2_checked_Date: "",
    operation_3_observation1: "",
    operation_3_performed_Sign: "",
    operation_3_performed_Date: "",
    operation_3_checked_Sign: "",
    operation_3_checked_Date: "",
    operation_4_1: "",
    operation_4_observation1: "",
    operation_4_performed_Sign: "",
    operation_4_performed_Date: "",
    operation_4_checked_Sign: "",
    operation_4_checked_Date: "",
  });

  const updateStatus = (updates) => {
    setStatus((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateState = (updates) => {
    setManufacturingSteps((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateKeys = (updates) => {
    setPrimaryKeys((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  useEffect(() => {
    getData();
  }, [props.batchNo]);
  //console.log("Prod Lov Res", props.supLov);
  const getData = () => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getManufacturerStepsByBatch?batchNo=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        if (res.data.length > 0) {
          setNewSave(false);
          updateStatus({
            supervisor_saved:
              res.data[0].supervisor_status === "SUPERVISOR_SAVED"
                ? true
                : false,
            supervisor_approved:
              res.data[0].supervisor_status === "SUPERVISOR_APPROVED"
                ? true
                : false,
            qa_saved: res.data[0].qa_status === "QA_SAVED" ? true : false,
            qa_approved: res.data[0].qa_status === "QA_APPROVED" ? true : false,
            supervisor_status: res.data[0].supervisor_status,
          });
          updateKeys({
            masterId: res.data[0].id,
            id_1: res.data[0].details[0].lineId,
            id_2: res.data[0].details[1].lineId,
            id_3: res.data[0].details[2].lineId,
            id_4: res.data[0].details[3].lineId,
          });
          updateState({
            operation_1_observation: res.data[0].details[0].observation,
            operation_1_performed_Sign: res.data[0].details[0].performed_sign,
            operation_1_performed_Date: res.data[0].details[0].performed_date,
            operation_1_checked_Sign: res.data[0].details[0].checked_sign,
            operation_1_checked_Date: res.data[0].details[0].checked_date,
            operation_2_1: res.data[0].machineName2,
            operation_2_2: res.data[0].machineStartTime2,
            operation_2_3: res.data[0].machineEndTime2,
            operation_2_4: res.data[0].machineSpeed2,
            operation_2_5: res.data[0].rpm2,
            operation_2_observation1: res.data[0].details[1].observation,
            operation_2_observation2: res.data[0].details[1].padCount,
            operation_2_observation3: res.data[0].details[1].machineSpeed,
            operation_2_performed_Sign: res.data[0].details[1].performed_sign,
            operation_2_performed_Date: res.data[0].details[1].performed_date,
            operation_2_checked_Sign: res.data[0].details[1].checked_sign,
            operation_2_checked_Date: res.data[0].details[1].checked_date,
            operation_3_observation1: res.data[0].details[2].observation,
            operation_3_performed_Sign: res.data[0].details[2].performed_sign,
            operation_3_performed_Date: res.data[0].details[2].performed_date,
            operation_3_checked_Sign: res.data[0].details[2].checked_sign,
            operation_3_checked_Date: res.data[0].details[2].checked_date,
            operation_4_1: res.data[0].pdsNumber4,
            operation_4_observation1: res.data[0].details[3].observation,
            operation_4_performed_Sign: res.data[0].details[3].performed_sign,
            operation_4_performed_Date: res.data[0].details[3].performed_date,
            operation_4_checked_Sign: res.data[0].details[3].checked_sign,
            operation_4_checked_Date: res.data[0].details[3].checked_date,
          });
        } else {
          setNewSave(true);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const submitData = () => {
    const payload_2 = {
      batchNo: props.batchNo,
      orderNo: props.orderNo,
      department: "PadPunching",
      id: primaryKeys.masterId,
      machineName2: ManufacturingSteps.operation_2_1,
      machineStartTime2: ManufacturingSteps.operation_2_2,
      machineEndTime2: ManufacturingSteps.operation_2_3,
      machineSpeed2: ManufacturingSteps.operation_2_4,
      rpm2: ManufacturingSteps.operation_2_5,
      pdsNumber4: ManufacturingSteps.operation_4_1,
      details: [
        {
          machineName: "Machine1",
          observation: ManufacturingSteps.operation_1_observation,
          checked_date: ManufacturingSteps.operation_1_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_1_checked_Sign,
          checked_sign: ManufacturingSteps.operation_1_checked_Sign,
          performed_date: ManufacturingSteps.operation_1_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_1_performed_Sign,
          performed_sign: ManufacturingSteps.operation_1_performed_Sign,
          lineId: primaryKeys.id_1,
        },
        {
          machineName: "Machine2",
          observation: ManufacturingSteps.operation_2_observation1,
          checked_date: ManufacturingSteps.operation_2_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_2_checked_Sign,
          checked_sign: ManufacturingSteps.operation_2_checked_Sign,
          performed_date: ManufacturingSteps.operation_2_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_2_performed_Sign,
          performed_sign: ManufacturingSteps.operation_2_performed_Sign,
          lineId: primaryKeys.id_2,
          padCount: ManufacturingSteps.operation_2_observation2,
          machineSpeed: ManufacturingSteps.operation_2_observation3,
        },
        {
          machineName: "Machine3",
          observation: ManufacturingSteps.operation_3_observation1,
          checked_date: ManufacturingSteps.operation_3_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_3_checked_Sign,
          checked_sign: ManufacturingSteps.operation_3_checked_Sign,
          performed_date: ManufacturingSteps.operation_3_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_3_performed_Sign,
          performed_sign: ManufacturingSteps.operation_3_performed_Sign,
          lineId: primaryKeys.id_3,
        },
        {
          machineName: "Machine4",
          observation: ManufacturingSteps.operation_4_observation1,
          checked_date: ManufacturingSteps.operation_4_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_4_checked_Sign,
          checked_sign: ManufacturingSteps.operation_4_checked_Sign,
          performed_date: ManufacturingSteps.operation_4_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_4_performed_Sign,
          performed_sign: ManufacturingSteps.operation_4_performed_Sign,
          lineId: primaryKeys.id_4,
        },
      ],
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/buds/bmr/submitManufacturerSteps`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        message.success("Manufacturing Steps Submitted Successfully");
        getData();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const saveData = () => {
    const payload_2 = {
      batchNo: props.batchNo,
      orderNo: props.orderNo,
      department: "PadPunching",
      id: primaryKeys.masterId,
      machineName2: ManufacturingSteps.operation_2_1,
      machineStartTime2: ManufacturingSteps.operation_2_2,
      machineEndTime2: ManufacturingSteps.operation_2_3,
      machineSpeed2: ManufacturingSteps.operation_2_4,
      rpm2: ManufacturingSteps.operation_2_5,
      pdsNumber4: ManufacturingSteps.operation_4_1,
      details: [
        {
          machineName: "Machine1",
          observation: ManufacturingSteps.operation_1_observation,
          checked_date: ManufacturingSteps.operation_1_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_1_checked_Sign,
          checked_sign: ManufacturingSteps.operation_1_checked_Sign,
          performed_date: ManufacturingSteps.operation_1_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_1_performed_Sign,
          performed_sign: ManufacturingSteps.operation_1_performed_Sign,
          lineId: primaryKeys.id_1,
        },
        {
          machineName: "Machine2",
          observation: ManufacturingSteps.operation_2_observation1,
          checked_date: ManufacturingSteps.operation_2_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_2_checked_Sign,
          checked_sign: ManufacturingSteps.operation_2_checked_Sign,
          performed_date: ManufacturingSteps.operation_2_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_2_performed_Sign,
          performed_sign: ManufacturingSteps.operation_2_performed_Sign,
          lineId: primaryKeys.id_2,
          padCount: ManufacturingSteps.operation_2_observation2,
          machineSpeed: ManufacturingSteps.operation_2_observation3,
        },
        {
          machineName: "Machine3",
          observation: ManufacturingSteps.operation_3_observation1,
          checked_date: ManufacturingSteps.operation_3_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_3_checked_Sign,
          checked_sign: ManufacturingSteps.operation_3_checked_Sign,
          performed_date: ManufacturingSteps.operation_3_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_3_performed_Sign,
          performed_sign: ManufacturingSteps.operation_3_performed_Sign,
          lineId: primaryKeys.id_3,
        },
        {
          machineName: "Machine4",
          observation: ManufacturingSteps.operation_4_observation1,
          checked_date: ManufacturingSteps.operation_4_checked_Date,
          checked_time: "",
          checked_name: ManufacturingSteps.operation_4_checked_Sign,
          checked_sign: ManufacturingSteps.operation_4_checked_Sign,
          performed_date: ManufacturingSteps.operation_4_performed_Date,
          performed_time: "",
          performed_name: ManufacturingSteps.operation_4_performed_Sign,
          performed_sign: ManufacturingSteps.operation_4_performed_Sign,
          lineId: primaryKeys.id_4,
        },
      ],
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/buds/bmr/saveManufacturerSteps`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        message.success("Manufacturing Steps Saved Successfully");
        getData();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <b>MANUFACTURING STEPS</b>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          // marginBottom: "0.5em",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginBottom: "5px",
            display:
              (props.loggedInSupervisor && status.supervisor_approved) ||
              props.loggedInHod ||
              (props.loggedInQa && status.qa_approved) ||
              status.qa_approved
                ? "none"
                : "block",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          shape="round"
          onClick={saveData}
        >
          Save
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginBottom: "5px",
            display:
              (props.loggedInSupervisor && status.supervisor_approved) ||
              props.loggedInHod ||
              status.qa_approved
                ? "none"
                : "block",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          shape="round"
          onClick={submitData}
        >
          Submit
        </Button>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <tr>
          <th colSpan="1">Step No</th>
          <th colSpan="1">Operation</th>
          <th colSpan="2">Observation</th>
          <th colSpan="1">Performed by (Sign & Date) </th>
          <th colSpan="1">Checked by(Sign & Date) </th>
        </tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            1
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            Sliver material arrangement: Cleanliness and verify the arrangement
            of the Sliver for the readiness of process of allocated machine.
          </td>
          <td colSpan="2" style={{ padding: "0.9em" }}>
            <Radio.Group
              onChange={(e) => {
                updateState({
                  operation_1_observation: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_1_observation}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            >
              <Radio value="READY">Ready</Radio>
              <Radio value="NOT READY">Not Ready</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              onChange={(e) => {
                updateState({
                  operation_1_performed_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_1_performed_Sign}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="wbo_date_prod"
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_1_performed_Date: e.target.value,
                });
              }}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
              value={ManufacturingSteps.operation_1_performed_Date}
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              onChange={(e) => {
                updateState({
                  operation_1_checked_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_1_checked_Sign}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="wbo_date_qa"
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_1_checked_Date: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_1_checked_Date}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            2
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            Switch ON the
            <br />{" "}
            <Select
              style={{
                width: "100%",
              }}
              options={props.machineLov}
              onChange={(e) => {
                updateState({
                  operation_2_1: e,
                });
              }}
              value={ManufacturingSteps.operation_2_1}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />{" "}
            <br />
            machine. Machine start time:{" "}
            <Input
              type="time"
              onChange={(e) => {
                updateState({
                  operation_2_2: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_2}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />{" "}
            <br />
            Machine end time:{" "}
            <Input
              type="time"
              onChange={(e) => {
                updateState({
                  operation_2_3: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_3}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />{" "}
            <br />
            Set parameters. No of Buds:{" "}
            <Input
              type="number"
              onChange={(e) => {
                updateState({
                  operation_2_4: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_4}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />{" "}
            <br />
            Speed (RPM):{" "}
            <Input
              type="number"
              onChange={(e) => {
                updateState({
                  operation_2_5: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_5}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />{" "}
            <br />
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <Radio.Group
              onChange={(e) => {
                updateState({
                  operation_2_observation1: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_observation1}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            >
              <Radio value="READY">Ready</Radio>
              <Radio value="NOT READY">Not Ready</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
            <br />
            No of Buds:
            <br />
            <Input
              type="number"
              onChange={(e) => {
                updateState({
                  operation_2_observation2: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_observation2}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <br />
            Machine Speed (RPM):
            <br />
            <Input
              type="number"
              onChange={(e) => {
                updateState({
                  operation_2_observation3: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_observation3}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <br />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              onChange={(e) => {
                updateState({
                  operation_2_performed_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_2_performed_Sign}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="alc1_date_prod"
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_2_performed_Date: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_performed_Date}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              onChange={(e) => {
                updateState({
                  operation_2_checked_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_2_checked_Sign}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="alc1_date_qa"
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_2_checked_Date: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_2_checked_Date}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            3
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            Check the metal detector setting with FE – 1.0 mm & SS – 1.2 mm
            Refer Metal detector calibration record. (Format No.: QAD01/F-35)
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <Radio.Group
              onChange={(e) => {
                updateState({
                  operation_3_observation1: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_3_observation1}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            >
              <Radio value="CHECKED">Checked</Radio>
              <Radio value="NOT CHECKED">Not Checked</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              onChange={(e) => {
                updateState({
                  operation_3_performed_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_3_performed_Sign}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="reiter01_date_prod"
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_3_performed_Date: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_3_performed_Date}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              onChange={(e) => {
                updateState({
                  operation_3_checked_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_3_checked_Sign}
              options={props.qaLov}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="reiter01_date_qa"
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_3_checked_Date: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_3_checked_Date}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            4
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            Perform the packing as per the Product Development Sheet (Format #
            PH-DVP01/F-005) <br />
            PDS No{" "}
            <Input
              onChange={(e) => {
                updateState({
                  operation_4_1: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_4_1}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            .
          </td>
          <td colSpan="2" style={{ textAlign: "center", padding: "0.9em" }}>
            <Radio.Group
              onChange={(e) => {
                updateState({
                  operation_4_observation1: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_4_observation1}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            >
              <Radio value="PERFORMED">Performed</Radio>
              <Radio value="NOT PERFORMED">Not Performed</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              onChange={(e) => {
                updateState({
                  operation_4_performed_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_4_performed_Sign}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              name="alc2_date_prod"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_4_performed_Date: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_4_performed_Date}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInSupervisor ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
          </td>
          <td
            colSpan="1"
            rowSpan="2"
            style={{ textAlign: "center", padding: "0.9em" }}
          >
            <Select
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              onChange={(e) => {
                updateState({
                  operation_4_checked_Sign: e,
                });
              }}
              value={ManufacturingSteps.operation_4_checked_Sign}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="alc2_date_qa"
              type="datetime-local"
              onChange={(e) => {
                updateState({
                  operation_4_checked_Date: e.target.value,
                });
              }}
              value={ManufacturingSteps.operation_4_checked_Date}
              disabled={
                (props.loggedInSupervisor && status.supervisor_approved) ||
                !props.loggedInQa ||
                props.loggedInHod ||
                status.qa_approved
              }
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Manufacturing_Steps;
