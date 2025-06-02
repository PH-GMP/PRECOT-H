import { Button, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
import { GrDocumentStore } from "react-icons/gr";

const Process_Deviation = (props) => {
  const [data, setData] = useState("");
  const [data1, setDat1] = useState("");
  const [devData, setDevData] = useState({
    batch_no: props.batchNo,
    order_no: "",
    form_no: "",
    detailsDevRecords: [
      {
        step_no: "STEP1",
        deviation: "",
        signature: "",
        sig_date: "",
        qa_remarks: "",
        signature2: "",
        sig_date2: "",
      },
      {
        step_no: "STEP2",
        deviation: "",
        signature: "",
        sig_date: "",
        qa_remarks: "",
        signature2: "",
        sig_date2: "",
      },
      {
        step_no: "STEP3",
        deviation: "",
        signature: "",
        sig_date: "",
        qa_remarks: "",
        signature2: "",
        sig_date2: "",
      },
      {
        step_no: "STEP4",
        deviation: "",
        signature: "",
        sig_date: "",
        qa_remarks: "",
        signature2: "",
        sig_date2: "",
      },
    ],
  });
  const token = localStorage.getItem("token");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [fieldStatus, setFieldStatus] = useState(false);
  const role = localStorage.getItem("role");

  const username =
  role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
  role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";
 const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const todayDateTime = getCurrentDateTime();
  console.log("rolw", role);
  useEffect(() => {
    setFieldStatus(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/CottonWoolRall/09.GetProcessDevRecord?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          setData(response.data[0].dev_id);
          setDat1(response.data[0]);

          if (
            (role === "ROLE_SUPERVISOR" &&
              data.status === "SUPERVISOR_APPROVED") ||
            data.status === "QA_APPROVED"
          ) {
            setFieldStatus(true);
          } else if (role === "ROLE_QA") {
            if (data.status === "QA_APPROVED") {
              setFieldStatus(true);
            } else {
              setFieldStatus(false);
            }
          }
          setDevData(data);
        } else {
          if (role === "QA") {
            setFieldStatus(true);
          }
          setDevData({
            batch_no: props.batchNo,
            order_no: "",
            form_no: "",
            detailsDevRecords: [
              {
                step_no: "STEP1",
                deviation: "",
                signature: "",
                sig_date: "",
                qa_remarks: "",
                signature2: "",
                sig_date2: "",
              },
              {
                step_no: "STEP2",
                deviation: "",
                signature: "",
                sig_date: "",
                qa_remarks: "",
                signature2: "",
                sig_date2: "",
              },
              {
                step_no: "STEP3",
                deviation: "",
                signature: "",
                sig_date: "",
                qa_remarks: "",
                signature2: "",
                sig_date2: "",
              },
              {
                step_no: "STEP4",
                deviation: "",
                signature: "",
                sig_date: "",
                qa_remarks: "",
                signature2: "",
                sig_date2: "",
              },
            ],
          });
        }
      } catch (error) {
        message.error(error.response?.data?.message);
      }
    };
    fetchData();
  }, [props.batchNo]);

  const handleSave = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    let payload;
    if (props.loggedInSupervisor) {
      payload = {
        dev_id: data,
        batch_no: props.batchNo,
        order_no: props.orderNo,
        form_no: "",
        detailsDevRecords: devData.detailsDevRecords.map((detail) => {
          const detailsDevRecords = {
            id: detail.id,
            dev_id: detail.dev_id,
            step_no: detail.step_no,
            deviation: detail.deviation || "",
            signature: detail.signature,
            qa_remarks: detail.qa_remarks,
            sig_date: detail.sig_date,
            signature2: detail.signature2,
            sig_date2: detail.sig_date2,
          };
          return detailsDevRecords;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    } else if (props.loggedInQa) {
      payload = {
        dev_id: data,
        batch_no: props.batchNo,
        order_no: props.orderNo,
        form_no: "",
        detailsDevRecords: devData.detailsDevRecords.map((detail) => {
          const detailsDevRecords = {
            id: detail.id,
            dev_id: detail.dev_id,
            step_no: detail.step_no,
            deviation: detail.deviation,
            signature: detail.signature,
            qa_remarks: detail.qa_remarks || "",
            sig_date: detail.sig_date,
            signature2: detail.signature2,
            sig_date2: detail.sig_date2,
          };
          return detailsDevRecords;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    }
    setButtonLoader(true);
    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/CottonWoolRall/09.SaveProcessDevRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        setButtonLoader(false);
        message.success("Process Deviation Saved Sucessfully");
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${ API.prodUrl}/Precot/api/CottonWoolRall/09.GetProcessDevRecord?batch_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              const data = response.data[0];
              setData(response.data[0].dev_id);
              setDat1(response.data[0]);

              if (
                (role === "ROLE_SUPERVISOR" &&
                  data.status === "SUPERVISOR_APPROVED") ||
                data.status === "QA_APPROVED"
              ) {
                setFieldStatus(true);
              } else if (role === "ROLE_QA") {
                if (data.status === "QA_APPROVED") {
                  setFieldStatus(true);
                } else {
                  setFieldStatus(false);
                }
              }
              setDevData(data);
            } else {
              if (role === "QA") {
                setFieldStatus(true);
              }
              setDevData({
                batch_no: props.batchNo,
                order_no: "",
                form_no: "",
                detailsDevRecords: [
                  {
                    step_no: "STEP1",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                  {
                    step_no: "STEP2",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                  {
                    step_no: "STEP3",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                  {
                    step_no: "STEP4",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                ],
              });
            }
          } catch (error) {
            message.error(error.response?.data?.message);
          }
        };
        fetchData();
      }
    } catch (error) {
      message.error(error.response.data.message);
      setButtonLoader(false);
    }
  };

  const handleSubmit = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    let payload;
    if (props.loggedInSupervisor) {
      payload = {
        dev_id: data,
        batch_no: props.batchNo,
        order_no: props.orderNo,
        form_no: "",
        detailsDevRecords: devData.detailsDevRecords.map((detail) => {
          const detailsDevRecords = {
            id: detail.id,
            dev_id: detail.dev_id,
            step_no: detail.step_no,
            deviation: detail.deviation || "NA",
            signature: detail.signature,
            qa_remarks: detail.qa_remarks,
            sig_date: detail.sig_date,
            signature2: detail.signature2,
            sig_date2: detail.sig_date2,
          };
          return detailsDevRecords;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    } else if (props.loggedInQa) {
      payload = {
        dev_id: data,
        batch_no: props.batchNo,
        order_no: props.orderNo,
        form_no: "",
        detailsDevRecords: devData.detailsDevRecords.map((detail) => {
          const detailsDevRecords = {
            id: detail.id,
            dev_id: detail.dev_id,
            step_no: detail.step_no,
            deviation: detail.deviation,
            signature: detail.signature,
            qa_remarks: detail.qa_remarks || "NA",
            sig_date: detail.sig_date,
            signature2: detail.signature2,
            sig_date2: detail.sig_date2,
          };
          return detailsDevRecords;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    }
    setButtonLoader(true);
    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/CottonWoolRall/09.SubmitProcessDevRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        setButtonLoader(false);
        message.success("Process Deviation Submitted Sucessfully");
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${ API.prodUrl}/Precot/api/CottonWoolRall/09.GetProcessDevRecord?batch_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              const data = response.data[0];
              setData(response.data[0].dev_id);
              setDat1(response.data[0]);

              if (
                (role === "ROLE_SUPERVISOR" &&
                  data.status === "SUPERVISOR_APPROVED") ||
                data.status === "QA_APPROVED"
              ) {
                setFieldStatus(true);
              } else if (role === "ROLE_QA") {
                if (data.status === "QA_APPROVED") {
                  setFieldStatus(true);
                } else {
                  setFieldStatus(false);
                }
              }
              setDevData(data);
            } else {
              if (role === "QA") {
                setFieldStatus(true);
              }
              setDevData({
                batch_no: props.batchNo,
                order_no: "",
                form_no: "",
                detailsDevRecords: [
                  {
                    step_no: "STEP1",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                  {
                    step_no: "STEP2",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                  {
                    step_no: "STEP3",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                  {
                    step_no: "STEP4",
                    deviation: "",
                    signature: "",
                    sig_date: "",
                    qa_remarks: "",
                    signature2: "",
                    sig_date2: "",
                  },
                ],
              });
            }
          } catch (error) {
            message.error(error.response?.data?.message);
          }
        };
        fetchData();
      }
    } catch (error) {
      message.error(error.response.data.message);
      setButtonLoader(false);
    }
  };

  const handleKeyDown_text = (e) => {
    // Allow only numbers, letters, underscore, and dot
    if (
      !/[0-9a-zA-Z._]/.test(e.key) && // Exclude the space character from the regex pattern
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault(); // Prevent the default action if the key is not allowed
    }
  };

  const handleInput = (e, name, field, type) => {
    let value;
    if (type == "input") {
      value = e.target.value;
    } else if (type == "select") {
      value = e;
    }
    const index = devData.detailsDevRecords.findIndex(
      (details) => details.step_no == name
    );
    const updatedDetails = [...devData.detailsDevRecords];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setDevData({
      ...devData,
      detailsDevRecords: updatedDetails,
    });
  };

  useEffect(() => {
    console.log("Deviation Data", devData);
  }, [devData]);

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
            display: fieldStatus || role == "ROLE_QA" ? "none" : "block",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          onClick={handleSave}
          loading={buttonLoader}
          shape="round"
        >
          Save
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            display: fieldStatus ? "none" : "block",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          onClick={handleSubmit}
          loading={buttonLoader}
          shape="round"
        >
          Submit
        </Button>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <th colSpan="5">PROCESS DEVIATION RECORD</th>
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            S.No
          </td>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            Deviation Log No
          </td>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            Sign and Date
          </td>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            QA Remarks
          </td>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            Sign and Date
          </td>
        </tr>
        {/* starting Initially */}
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            1
          </td>
          <td align="center">
            <input
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP1"
                )?.deviation
              }
              onChange={(e) => {
                handleInput(e, "STEP1", "deviation", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP1"
                )?.signature || usernameSupervisor
              }
              placeholder="Choose Signature"
              onChange={(e) => {
                handleInput(e, "STEP1", "signature", "select");
              }}
              disabled={!props.loggedInSupervisor || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP1"
                )?.sig_date
              }
              onChange={(e) => {
                handleInput(e, "STEP1", "sig_date", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
              max={todayDateTime}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP1"
                )?.qa_remarks
              }
              onChange={(e) => {
                handleInput(e, "STEP1", "qa_remarks", "input");
              }}
              readOnly={!props.loggedInQa || fieldStatus}
              max={todayDateTime}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              placeholder="Choose Signature"
              options={props.qaLov}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP1"
                )?.signature2 || username
              }
              onChange={(e) => {
                handleInput(e, "STEP1", "signature2", "select");
              }}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP1"
                )?.sig_date2
              }
              onChange={(e) => {
                handleInput(e, "STEP1", "sig_date2", "input");
              }}
              readOnly={!props.loggedInQa || fieldStatus}
              max={todayDateTime}
            />
          </td>
        </tr>
        {/* second Initially */}
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            2
          </td>
          <td align="center">
            <input
              className="inp-new"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP2"
                )?.deviation
              }
              onChange={(e) => {
                handleInput(e, "STEP2", "deviation", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
              onKeyDown={(e) => handleKeyDown_text(e)}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              placeholder="Choose Signature"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP2"
                )?.signature || usernameSupervisor
              }
              onChange={(e) => {
                handleInput(e, "STEP2", "signature", "select");
              }}
              options={props.supLov}
              disabled={!props.loggedInSupervisor || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP2"
                )?.sig_date
              }
              onChange={(e) => {
                handleInput(e, "STEP2", "sig_date", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
              max={todayDateTime}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP2"
                )?.qa_remarks
              }
              onChange={(e) => {
                handleInput(e, "STEP2", "qa_remarks", "input");
              }}
              readOnly={!props.loggedInQa || fieldStatus}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              placeholder="Choose Signature"
              options={props.qaLov}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP2"
                )?.signature2 || username
              }
              onChange={(e) => {
                handleInput(e, "STEP2", "signature2", "select");
              }}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              onChange={(e) => {
                handleInput(e, "STEP2", "sig_date2", "input");
              }}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP2"
                )?.sig_date2
              }
              readOnly={!props.loggedInQa || fieldStatus}
              max={todayDateTime}
            />
          </td>
        </tr>
        {/* Third Row */}
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            3
          </td>
          <td align="center">
            <input
              className="inp-new"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP3"
                )?.deviation
              }
              onChange={(e) => {
                handleInput(e, "STEP3", "deviation", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
              onKeyDown={(e) => handleKeyDown_text(e)}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              placeholder="Choose Signature"
              options={props.supLov}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP3"
                )?.signature || usernameSupervisor
              }
              onChange={(e) => {
                handleInput(e, "STEP3", "signature", "select");
              }}
              disabled={!props.loggedInSupervisor || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP3"
                )?.sig_date
              }
              onChange={(e) => {
                handleInput(e, "STEP3", "sig_date", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
              max={todayDateTime}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP3"
                )?.qa_remarks
              }
              onChange={(e) => {
                handleInput(e, "STEP3", "qa_remarks", "input");
              }}
              readOnly={!props.loggedInQa || fieldStatus}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              placeholder="Choose Signature"
              options={props.qaLov}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP3"
                )?.signature2 || username
              }
              onChange={(e) => {
                handleInput(e, "STEP3", "signature2", "select");
              }}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP3"
                )?.sig_date2
              }
              onChange={(e) => {
                handleInput(e, "STEP3", "sig_date2", "input");
              }}
              readOnly={!props.loggedInQa || fieldStatus}
              max={todayDateTime}
            />
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            4
          </td>
          <td align="center">
            <input
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP4"
                )?.deviation
              }
              onChange={(e) => {
                handleInput(e, "STEP4", "deviation", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP4"
                )?.signature || usernameSupervisor
              }
              onChange={(e) => {
                handleInput(e, "STEP4", "signature", "select");
              }}
              placeholder="Choose Signature"
              options={props.supLov}
              disabled={!props.loggedInSupervisor || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP4"
                )?.sig_date
              }
              onChange={(e) => {
                handleInput(e, "STEP4", "sig_date", "input");
              }}
              readOnly={!props.loggedInSupervisor || fieldStatus}
              max={todayDateTime}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP4"
                )?.qa_remarks
              }
              onChange={(e) => {
                handleInput(e, "STEP4", "qa_remarks", "input");
              }}
              readOnly={!props.loggedInQa || fieldStatus}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              placeholder="Choose Signature"
              options={props.qaLov}
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP4"
                )?.signature2 || username
              }
              onChange={(e) => {
                handleInput(e, "STEP4", "signature2", "select");
              }}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.detailsDevRecords.find(
                  (details) => details.step_no == "STEP4"
                )?.sig_date2
              }
              onChange={(e) => {
                handleInput(e, "STEP4", "sig_date2", "input");
              }}
              readOnly={!props.loggedInQa || fieldStatus}
              max={todayDateTime}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Process_Deviation;
