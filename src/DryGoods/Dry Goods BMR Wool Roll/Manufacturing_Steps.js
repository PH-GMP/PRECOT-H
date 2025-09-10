import { Button, Input, Radio, Select, message, Row, Col, Form } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { GrDocumentStore } from "react-icons/gr";
import API from "../../baseUrl.json";
import axios from "axios";
import { FormProvider } from "antd/es/form/context";

const Manufacturing_Steps = (props) => {
  const token = localStorage.getItem("token");
  const batchNo = props.batchNo.split("-")[0];
  console.log("Api Called", batchNo);
  const [messageApi, contextHolder] = message.useMessage();
  const [newSave, setNewSave] = useState(false);
  const initialized = useRef(false);
  const [supervisorApproved, setSupervisorApproved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);
  const [userLov, setUserLov] = useState({
    prodlov: "",
    qalov: "",
  });

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

  const [formData, setFormData] = useState({
    id: "",
    order_no: props.orderNo,
    batch_no: props.batchNo,
    observation01: "",
    rdyNoRdy01: "",
    rdy01DateProd: "",
    rdy01NameProd: "",
    rdy01SignProd: "",
    rdy01DateQa: "",
    rdy01NameQa: "",
    rdy01SignQa: "",
    observation02: " ",
    rdyNoRdy02: "",
    rdy02DateProd: "",
    rdy02NameProd: "",
    rdy02SignProd: "",
    rdy02DateQa: "",
    rdy02NameQa: "",
    rdy02SignQa: "",
    observation03: "",
    cardLineSpeed: "",
    cardGsm: "",
    cardWidth: "",
    cardDateProd: "",
    cardNameProd: "",
    cardSignProd: "",
    cardDateQa: "",
    cardNameQa: "",
    cardSignQa: "",
    observation04: "",
    observation04Value: "",
    woolRollDateProd: "",
    woolRollNameProd: "",
    woolRollSignProd: "",
    woolRollDateQa: "",
    woolRollNameQa: "",
    woolRollSignQa: "",
    observation05: "",
    rdyNoRdy05: "",
    rdy05DateProd: "",
    rdy05NameProd: "",
    rdy05SignProd: "",
    rdy05DateQa: "",
    rdy05NameQa: "",
    rdy05SignQa: "",
    observation06: "",
    pdsNo06: "",
    no06DateProd: "",
    no06NameProd: "",
    no06SignProd: "",
    no06DateQa: "",
    no06NameQa: "",
    no06SignQa: "",
  });
  console.log("Selected Order No", props.orderNo);

 

  useEffect(() => {
    if (props.batchNo !== "") {
      setFormData({
        id: "",
        order_no: props.orderNo,
        batch_no: props.batchNo,
        observation01: "",
        rdyNoRdy01: "",
        rdy01DateProd: "",
        rdy01NameProd: "",
        rdy01SignProd: "",
        rdy01DateQa: "",
        rdy01NameQa: "",
        rdy01SignQa: "",
        observation02: "",
        rdyNoRdy02: "",
        rdy02DateProd: "",
        rdy02NameProd: "",
        rdy02SignProd: "",
        rdy02DateQa: "",
        rdy02NameQa: "",
        rdy02SignQa: "",
        observation03: "",
        cardLineSpeed: "",
        cardGsm: "",
        cardWidth: "",
        cardDateProd: "",
        cardNameProd: "",
        cardSignProd: "",
        cardDateQa: "",
        cardNameQa: "",
        cardSignQa: "",
        observation04: "",
        observation04Value: "",
        woolRollDateProd: "",
        woolRollNameProd: "",
        woolRollSignProd: "",
        woolRollDateQa: "",
        woolRollNameQa: "",
        woolRollSignQa: "",
        observation05: "",
        rdyNoRdy05: "",
        rdy05DateProd: "",
        rdy05NameProd: "",
        rdy05SignProd: "",
        rdy05DateQa: "",
        rdy05NameQa: "",
        rdy05SignQa: "",
        observation06: "",
        pdsNo06: "",
        no06DateProd: "",
        no06NameProd: "",
        no06SignProd: "",
        no06DateQa: "",
        no06NameQa: "",
        no06SignQa: "",
      });
      axios
        .get(
          `${API.prodUrl}/Precot/api/CottonWoolRall/07.GetManufacturingSteps?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.length > 0) {
            setFormData(res.data[0]);
            setQaApproved(
              res.data[0].qa_status == "QA_APPROVED" ? true : false
            );
            setSupervisorApproved(
              res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                ? true
                : false
            );
          } else if (res.data.length == 0) {
            setSupervisorApproved(false);
            setQaApproved(true);
          }
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  }, [props.batchNo]);

  const SaveManufacturingSteps = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    const payload = {
      id: formData.id,
      order_no: props.orderNo,
      batch_no: props.batchNo,
      observation01: formData.observation01,
      rdyNoRdy01: formData.rdyNoRdy01,
      rdy01DateProd: formData.rdy01DateProd,
      rdy01NameProd: formData.rdy01NameProd,
      rdy01SignProd: formData.rdy01SignProd,
      rdy01DateQa: formData.rdy01DateQa,
      rdy01NameQa: formData.rdy01NameQa,
      rdy01SignQa: formData.rdy01SignQa,
      observation02: formData.observation02,
      rdyNoRdy02: formData.rdyNoRdy02,
      rdy02DateProd: formData.rdy02DateProd,
      rdy02NameProd: formData.rdy02NameProd,
      rdy02SignProd: formData.rdy02SignProd,
      rdy02DateQa: formData.rdy02DateQa,
      rdy02NameQa: formData.rdy02NameQa,
      rdy02SignQa: formData.rdy02SignQa,
      observation03: formData.observation03,
      cardLineSpeed: formData.cardLineSpeed,
      cardGsm: formData.cardGsm,
      cardWidth: formData.cardWidth,
      cardDateProd: formData.cardDateProd,
      cardNameProd: formData.cardNameProd,
      cardSignProd: formData.cardSignProd,
      cardDateQa: formData.cardDateQa,
      cardNameQa: formData.cardNameQa,
      cardSignQa: formData.cardSignQa,
      observation04: formData.observation04,
      observation04Value: formData.observation04Value,
      woolRollDateProd: formData.woolRollDateProd,
      woolRollNameProd: formData.woolRollNameProd,
      woolRollSignProd: formData.woolRollSignProd,
      woolRollDateQa: formData.woolRollDateQa,
      woolRollNameQa: formData.woolRollNameQa,
      woolRollSignQa: formData.woolRollSignQa,
      observation05: formData.observation05,
      rdyNoRdy05: formData.rdyNoRdy05,
      rdy05DateProd: formData.rdy05DateProd,
      rdy05NameProd: formData.rdy05NameProd,
      rdy05SignProd: formData.rdy05SignProd,
      rdy05DateQa: formData.rdy05DateQa,
      rdy05NameQa: formData.rdy05NameQa,
      rdy05SignQa: formData.rdy05SignQa,
      observation06: formData.observation06,
      pdsNo06: formData.pdsNo06,
      no06DateProd: formData.no06DateProd,
      no06NameProd: formData.no06NameProd,
      no06SignProd: formData.no06SignProd,
      no06DateQa: formData.no06DateQa,
      no06NameQa: formData.no06NameQa,
      no06SignQa: formData.no06SignQa,
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/CottonWoolRall/07.SaveManufacturingSteps`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Manufacturing Steps Saved Succesfully");
        axios
          .get(
            `${API.prodUrl}/Precot/api/CottonWoolRall/07.GetManufacturingSteps?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.length > 0) {
              setFormData(res.data[0]);
              setQaApproved(
                res.data[0].qa_status == "QA_APPROVED" ? true : false
              );
              setSupervisorApproved(
                res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
            } else if (res.data.length == 0) {
              setSupervisorApproved(false);
              setQaApproved(true);
            }
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const SubmitManufacturingSteps = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }

     

    const fieldNames = {
      rdy01DateProd: "Row 1 Production Date",
      rdy01SignProd: "Row 1 Production Signature",
      rdy02DateProd: "Row 2 Production Date",
      rdy02SignProd: "Row 2 Production Signature",
      cardLineSpeed: "Line Speed",
      cardGsm: "GSM",
      cardWidth: "Width",
      cardDateProd: "Row 3 Production Date",
      cardSignProd: "Row 3 Production Signature",
      woolRollDateProd: "Row 4 Production Date",
      woolRollSignProd: "Row 4 Production Signature",
      rdy05DateProd: "Row 5 Production Date",
      rdy05SignProd: "Row 5 Production Signature",
      pdsNo06: "PDS No",
      no06DateProd: "Row 6 Production Date",
      no06SignProd: "Row 6 Production Signature",
      rdy01DateQa: "Row 1 QA Date",
      rdy01SignQa: "Row 1 QA Signature",
      rdy02DateQa: "Row 2 QA Date",
      rdy02SignQa: "Row 2 QA Signature",
      cardDateQa: "Row 3 QA Date",
      cardSignQa: "Row 3 QA Signature",
      woolRollDateQa: "Row 4 QA Date",
      woolRollSignQa: "Row 4 QA Signature",
      rdy05DateQa: "Row 5 QA Date",
      rdy05SignQa: "Row 5 QA Signature",
      no06DateQa: "Row 6 QA Date",
      no06SignQa: "Row 6 QA Signature",
    };

    const checkRequiredFields = (keysToCheck) => {
      for (let key of keysToCheck) {
        if (formData[key] === "") {
          const formattedKey = fieldNames[key] || key.replace(/_/g, " ");
          message.warning(`${formattedKey} is required`);
          return false;
        }
      }
      return true;
    };

    if (props.loggedInSupervisor) {
      const supervisorKeys = [
        "rdy01DateProd",
        "rdy01SignProd",
        "rdy02DateProd",
        "rdy02SignProd",
        "cardLineSpeed",
        "cardGsm",
        "cardWidth",
        "cardDateProd",
        "cardSignProd",
        "woolRollDateProd",
        "woolRollSignProd",
        "rdy05DateProd",
        "rdy05SignProd",
        "pdsNo06",
        "no06DateProd",
        "no06SignProd",
      ];
      if (!checkRequiredFields(supervisorKeys)) return;
    }

    if (props.loggedInQa) {
      const qaKeys = [
        "rdy01DateProd",
        "rdy01SignProd",
        "rdy01DateQa",
        "rdy01SignQa",
        "rdy02DateProd",
        "rdy02SignProd",
        "rdy02DateQa",
        "rdy02SignQa",
        "cardLineSpeed",
        "cardGsm",
        "cardWidth",
        "cardDateProd",
        "cardSignProd",
        "cardDateQa",
        "cardSignQa",
        "woolRollDateProd",
        "woolRollSignProd",
        "woolRollDateQa",
        "woolRollSignQa",
        "rdy05DateProd",
        "rdy05SignProd",
        "rdy05DateQa",
        "rdy05SignQa",
        "pdsNo06",
        "no06DateProd",
        "no06SignProd",
        "no06DateQa",
        "no06SignQa",
      ];
      if (!checkRequiredFields(qaKeys)) return;
    }

    const payload = {
      id: formData.id,
      order_no: props.orderNo,
      batch_no: props.batchNo,
      observation01: formData.observation01,
      rdyNoRdy01: formData.rdyNoRdy01 || "NA",
      rdy01DateProd: formData.rdy01DateProd,
      rdy01NameProd: formData.rdy01NameProd,
      rdy01SignProd: formData.rdy01SignProd,
      rdy01DateQa: formData.rdy01DateQa,
      rdy01NameQa: formData.rdy01NameQa,
      rdy01SignQa: formData.rdy01SignQa,
      observation02: formData.observation02,
      rdyNoRdy02: formData.rdyNoRdy02 || "NA",
      rdy02DateProd: formData.rdy02DateProd,
      rdy02NameProd: formData.rdy02NameProd,
      rdy02SignProd: formData.rdy02SignProd,
      rdy02DateQa: formData.rdy02DateQa,
      rdy02NameQa: formData.rdy02NameQa,
      rdy02SignQa: formData.rdy02SignQa,
      observation03: formData.observation03,
      cardLineSpeed: formData.cardLineSpeed,
      cardGsm: formData.cardGsm,
      cardWidth: formData.cardWidth,
      cardDateProd: formData.cardDateProd,
      cardNameProd: formData.cardNameProd,
      cardSignProd: formData.cardSignProd,
      cardDateQa: formData.cardDateQa,
      cardNameQa: formData.cardNameQa,
      cardSignQa: formData.cardSignQa,
      observation04: formData.observation04,
      observation04Value: formData.observation04Value,
      woolRollDateProd: formData.woolRollDateProd,
      woolRollNameProd: formData.woolRollNameProd,
      woolRollSignProd: formData.woolRollSignProd,
      woolRollDateQa: formData.woolRollDateQa,
      woolRollNameQa: formData.woolRollNameQa,
      woolRollSignQa: formData.woolRollSignQa,
      observation05: formData.observation05,
      rdyNoRdy05: formData.rdyNoRdy05 || "NA",
      rdy05DateProd: formData.rdy05DateProd,
      rdy05NameProd: formData.rdy05NameProd,
      rdy05SignProd: formData.rdy05SignProd,
      rdy05DateQa: formData.rdy05DateQa,
      rdy05NameQa: formData.rdy05NameQa,
      rdy05SignQa: formData.rdy05SignQa,
      observation06: formData.observation06,
      pdsNo06: formData.pdsNo06,
      no06DateProd: formData.no06DateProd,
      no06NameProd: formData.no06NameProd,
      no06SignProd: formData.no06SignProd,
      no06DateQa: formData.no06DateQa,
      no06NameQa: formData.no06NameQa,
      no06SignQa: formData.no06SignQa,
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/CottonWoolRall/07.SubmitManufacturingSteps`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Manufacturing Steps Submitted Succesfully");
        axios
          .get(
            `${API.prodUrl}/Precot/api/CottonWoolRall/07.GetManufacturingSteps?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.length > 0) {
              setFormData(res.data[0]);
              setQaApproved(
                res.data[0].qa_status == "QA_APPROVED" ? true : false
              );
              setSupervisorApproved(
                res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
            } else if (res.data.length == 0) {
              setSupervisorApproved(false);
              setQaApproved(true);
            }
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log("Input Field", name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
 
  const role = localStorage.getItem("role");
  const username =
  role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
  role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  const handleUser = (name, selectedOption) => {
    console.log("Selected User", name);
    console.log("Selected Option", selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption,
    }));
  };

  const handleRadio = (e, fieldName) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  console.log("Prod Lov Res", props.supLov);
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
              props.loggedInHod ||
              props.loggedInQa ||
              (props.loggedInSupervisor && supervisorApproved)
                ? "none"
                : "flex",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          shape="round"
          onClick={SaveManufacturingSteps}
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
              props.loggedInHod ||
              (props.loggedInQa && qaApproved) ||
              (props.loggedInSupervisor && supervisorApproved) ||
              (qaApproved && supervisorApproved)
                ? "none"
                : "block",
          }}
          icon={<GrDocumentStore color="#00308F" />}
          shape="round"
          onClick={SubmitManufacturingSteps}
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
          <th colSpan="1">Observation</th>
          <th colSpan="1">Performed by (Sign & Date) </th>
          <th colSpan="1">Checked by(Sign & Date) </th>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            1
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            Switch ON all the machines & Sub machines: Bale Plucker, MBO, ERM, C
            1/3 (1 to 4), Wool roll machine, Sealing machine, Metal detector.
          </td>
          <td>
            <Radio.Group
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              onChange={(e) => handleRadio(e, "rdyNoRdy01")}
              value={formData.rdyNoRdy01}
            >
              <Radio value="Ready">Ready</Radio>
              <Radio value="NotReady">Not Ready</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              value={formData.rdy01SignProd || usernameSupervisor}
              onChange={(selectedOption) =>
                handleUser("rdy01SignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="rdy01DateProd"
              value={formData.rdy01DateProd}
              type="datetime-local"
              onChange={handleInput}
              // onChange={(e) => {
              //   updateManufacturingStepsPerformedByDate({
              //     one: e.target.value,
              //   });
              // }}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              max={todayDateTime}
            />
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              value={formData.rdy01SignQa || username}
              onChange={(selectedOption) =>
                handleUser("rdy01SignQa", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="rdy01DateQa"
              type="datetime-local"
              value={formData.rdy01DateQa}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
              max={todayDateTime}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            2
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            Bale Plucker: Check the lay down area for Cleanliness and verify the
            arrangement of the bales for the readiness of process in Bale
            Plucker.
          </td>
          <td>
            <Radio.Group
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              onChange={(e) => handleRadio(e, "rdyNoRdy02")}
              value={formData.rdyNoRdy02}
            >
              <Radio value="Ready">Ready</Radio>
              <Radio value="NotReady">Not Ready</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              value={formData.rdy02SignProd || usernameSupervisor}
              onChange={(selectedOption) =>
                handleUser("rdy02SignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="rdy02DateProd"
              type="datetime-local"
              value={formData.rdy02DateProd}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              max={todayDateTime}
            />
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.rdy02SignQa || username}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("rdy02SignQa", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="rdy02DateQa"
              type="datetime-local"
              value={formData.rdy02DateQa}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
              max={todayDateTime}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            3
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            CARD-01,02,03&04: Switch ON main in machine and set the Line Speed:
            0 to 30 RPM GSM: 150 to 400 Width: 90 to 280 mm Whenever the jam
            occurs, remove the jam, and start again
          </td>
          <td style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>
                Line<br></br> Speed:
              </span>
              <Input
                readOnly={
                  props.loggedInHod ||
                  props.loggedInQa ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
                addonAfter="RPM"
                type="text"
                style={{ width: "150px", textAlign: "center" }}
                // min={0}
                // max={30}
                value={formData.cardLineSpeed}
                name="cardLineSpeed"
                onChange={handleInput}
                // onKeyDown={(e) => handleKeyDown(e, "cardLineSpeed")}
              />
            </div>
            <br></br>
            <Input
              addonBefore="GSM"
              type="text"
              // min={150}
              // max={400}
              style={{ textAlign: "center" }}
              value={formData.cardGsm}
              onChange={handleInput}
              name="cardGsm"
              // onKeyDown={(e) => {
              //   handleKeyDown(e, "cardGsm");
              // }}
              readOnly={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            ></Input>
            <br></br>
            <br />
            <Input
              addonBefore="Width"
              addonAfter="mm"
              type="text"
              // min={90}
              // max={280}
              value={formData.cardWidth}
              onChange={handleInput}
              name="cardWidth"
              style={{ textAlign: "center" }}
             
              readOnly={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            ></Input>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.cardSignProd || usernameSupervisor}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("cardSignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="cardDateProd"
              type="datetime-local"
              value={formData.cardDateProd}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              max={todayDateTime}
            />
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.cardSignQa || username}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("cardSignQa", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="cardDateQa"
              value={formData.cardDateQa}
              type="datetime-local"
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
              max={todayDateTime}
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            4
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            WOOL ROLL: Feed mini rolls manually. Start the panel and set the
            product parameters in sensor cut length, weight, and as per PDS and
            start the machine Paring each and weighing each bag as per stander
            wool roll weight Check metal detector working and ensure sensitive
            level Bag alignment and box packing as per PDS
          </td>
          <td
            style={{
              textAlign: "center",
              padding: "0.9em",
              textAlign: "center",
            }}
          >
            NA
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.woolRollSignProd}
              options={props.supLov || usernameSupervisor}
              onChange={(selectedOption) =>
                handleUser("woolRollSignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="woolRollDateProd"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              value={formData.woolRollDateProd}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              max={todayDateTime}
            />
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.woolRollSignQa || username}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("woolRollSignQa", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="woolRollDateQa"
              type="datetime-local"
              value={formData.woolRollDateQa}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
              max={todayDateTime}
            />
          </td>
        </tr>

        <tr></tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            5
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            Check the metal detector setting with FE – 1.0 mm & SS – 1.8 mm
            Refer Metal detector calibration record. (Format No.: QAD01/F-35)
          </td>
          <td>
            <Radio.Group
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              value={formData.rdyNoRdy05}
              onChange={(e) => handleRadio(e, "rdyNoRdy05")}
            >
              <Radio value="Checked">Checked</Radio>
              <Radio value="NotChecked">Not Checked</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              value={formData.rdy05SignProd || usernameSupervisor}
              style={{
                width: "12em",
              }}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("rdy05SignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="rdy05DateProd"
              value={formData.rdy05DateProd}
              type="datetime-local"
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              max={todayDateTime}
            />
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.rdy05SignQa || username}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("rdy05SignQa", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
            />
            <Input
              name="rdy05DateQa"
              style={{
                width: "12em",
              }}
              value={formData.rdy05DateQa}
              type="datetime-local"
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
              max={todayDateTime}
            />
          </td>
        </tr>

        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            6
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            Perform the packing as per the Product Development Sheet (Format #
            DVP01/F-05)
          </td>
          <td style={{ textAlign: "center", padding: "0.9em" }}>
            {" "}
            <Input
              addonBefore="PDS No"
              addonAfter="SAP"
              type="text"
              // min={150}
              // max={400}
              style={{ textAlign: "center" }}
              value={formData.pdsNo06}
              name="pdsNo06"
              onChange={handleInput}
              // onKeyDown={(e) => {
              //   handleKeyDown(e, "pdsNo06");
              // }}
              readOnly={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            ></Input>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.no06SignProd || usernameSupervisor}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("no06SignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="no06DateProd"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              value={formData.no06DateProd}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              max={todayDateTime}
            />
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              value={formData.no06SignQa || username}
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("no06SignQa", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
            />
            <Input
              style={{
                width: "12em",
              }}
              name="no06DateQa"
              type="datetime-local"
              value={formData.no06DateQa}
              onChange={handleInput}
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
              max={todayDateTime}
            />
          </td>
        </tr>
        <tr></tr>
      </table>
    </div>
  );
};

export default Manufacturing_Steps;
