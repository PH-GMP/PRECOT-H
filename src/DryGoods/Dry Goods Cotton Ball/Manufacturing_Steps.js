import { Button, Input, Radio, Select, message, Row, Col, Form } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { GrDocumentStore } from "react-icons/gr";
import API from "../../baseUrl.json";
import axios from "axios";
import { FormProvider } from "antd/es/form/context";

const Manufacturing_Steps = (props) => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
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

  const role = localStorage.getItem("role");
  const username = role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
    role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  let supervisorDate = "";
  if (role === "ROLE_SUPERVISOR") {
    supervisorDate = todayDateTime;
  }

  let qaDate = "";
  if (role === "ROLE_QA") {
    qaDate = todayDateTime;
  }

  const [formData, setFormData] = useState({
    id: "",
    order_no: props.orderNo,
    batch_no: props.batchNo,
    observation01: "",
    rdyNoRdy01: "",
    rdy01DateProd: "",
    rdy01SignProd: "",
    rdy01DateQa: "",
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
    tc01DelvSpeed: "",
    tc01Draft: "",
    tc01DateProd: "",
    tc01SignProd: "",
    tc01DateQa: "",
    tc01SignQa: "",
    cardNameQa: "",
    observation04: "",
    tc02DelvSpeed: "",
    tc02Draft: "",
    tc02DateProd: "",
    tc02SignProd: "",
    tc02DateQa: "",
    tc02SignQa: "",
    observation05: "",
    psdNo05: "",
    no05DateProd: "",
    no05SignProd: "",
    no05DateQa: "",
    no05SignQa: "",
    observation06: "",
    psdNo06: "",
    no06DateProd: "",
    no06NameProd: "",
    no06SignProd: "",
    no06DateQa: "",
    no06NameQa: "",
    no06SignQa: "",
    observation07: "",
    rdyNoRdy07: "",
    rdy07DateProd: "",
    rdy07SignProd: "",
    rdy07DateQa: "",
    rdy07SignQa: "",
    observation08: "",
    psdNo08: "",
    no08DateProd: "",
    no08SignProd: "",
    no08DateQa: "",
    no08SignQa: "",
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
        rdy01SignProd: "",
        rdy01DateQa: "",
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
        tc01DelvSpeed: "",
        tc01Draft: "",
        tc01DateProd: "",
        tc01SignProd: "",
        tc01DateQa: "",
        tc01SignQa: "",
        cardNameQa: "",
        observation04: "",
        tc02DelvSpeed: "",
        tc02Draft: "",
        tc02DateProd: "",
        tc02SignProd: "",
        tc02DateQa: "",
        tc02SignQa: "",
        observation05: "",
        psdNo05: "",
        no05DateProd: "",
        no05SignProd: "",
        no05DateQa: "",
        no05SignQa: "",
        observation06: "",
        psdNo06: "",
        no06DateProd: "",
        no06NameProd: "",
        no06SignProd: "",
        no06DateQa: "",
        no06NameQa: "",
        no06SignQa: "",
        observation07: "",
        rdyNoRdy07: "",
        rdy07DateProd: "",
        rdy07SignProd: "",
        rdy07DateQa: "",
        rdy07SignQa: "",
        observation08: "",
        psdNo08: "",
        no08DateProd: "",
        no08SignProd: "",
        no08DateQa: "",
        no08SignQa: "",
      });
      axios
        .get(
          `${API.prodUrl}/Precot/api/cottonBall/07.GetManufacturingSteps?batch_no=${props.batchNo}`,
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
    setLoading(true);
    const payload = {
      id: formData.id,
      order_no: props.orderNo,
      batch_no: props.batchNo,
      observation01: formData.observation01,
      rdyNoRdy01: formData.rdyNoRdy01,
      rdy01DateProd: formData.rdy01DateProd || supervisorDate,
      rdy01SignProd: formData.rdy01SignProd || usernameSupervisor,
      rdy01DateQa: formData.rdy01DateQa || qaDate,
      rdy01SignQa: formData.rdy01SignQa || username,
      observation02: formData.observation02,
      rdyNoRdy02: formData.rdyNoRdy02,
      rdy02DateProd: formData.rdy02DateProd || supervisorDate,
      rdy02NameProd: formData.rdy02NameProd || usernameSupervisor,
      rdy02SignProd: formData.rdy02SignProd || usernameSupervisor,
      rdy02DateQa: formData.rdy02DateQa || qaDate,
      rdy02NameQa: formData.rdy02NameQa || username,
      rdy02SignQa: formData.rdy02SignQa || username,
      observation03: formData.observation03,
      tc01DelvSpeed: formData.tc01DelvSpeed,
      tc01Draft: formData.tc01Draft,
      tc01DateProd: formData.tc01DateProd || supervisorDate,
      tc01SignProd: formData.tc01SignProd || usernameSupervisor,
      tc01DateQa: formData.tc01DateQa || qaDate,
      tc01SignQa: formData.tc01SignQa || username,
      cardNameQa: formData.cardNameQa,
      observation04: formData.observation04,
      tc02DelvSpeed: formData.tc02DelvSpeed,
      tc02Draft: formData.tc02Draft,
      tc02DateProd: formData.tc02DateProd || supervisorDate,
      tc02SignProd: formData.tc02SignProd || usernameSupervisor,
      tc02DateQa: formData.tc02DateQa || qaDate,
      tc02SignQa: formData.tc02SignQa || username,
      observation05: formData.observation05,
      psdNo05: formData.psdNo05,
      no05DateProd: formData.no05DateProd || supervisorDate,
      no05SignProd: formData.no05SignProd || usernameSupervisor,
      no05DateQa: formData.no05DateQa || qaDate,
      no05SignQa: formData.no05SignQa || username,
      observation06: formData.observation06,
      psdNo06: formData.psdNo06,
      no06DateProd: formData.no06DateProd || supervisorDate,
      no06NameProd: formData.no06NameProd || usernameSupervisor,
      no06SignProd: formData.no06SignProd || usernameSupervisor,
      no06DateQa: formData.no06DateQa || qaDate,
      no06NameQa: formData.no06NameQa || username,
      no06SignQa: formData.no06SignQa || username,
      observation07: formData.observation07,
      rdyNoRdy07: formData.rdyNoRdy07,
      rdy07DateProd: formData.rdy07DateProd || supervisorDate,
      rdy07SignProd: formData.rdy07SignProd || usernameSupervisor,
      rdy07DateQa: formData.rdy07DateQa || qaDate,
      rdy07SignQa: formData.rdy07SignQa || username,
      observation08: formData.observation08,
      psdNo08: formData.psdNo08,
      no08DateProd: formData.no08DateProd || supervisorDate,
      no08SignProd: formData.no08SignProd || usernameSupervisor,
      no08DateQa: formData.no08DateQa || qaDate,
      no08SignQa: formData.no08SignQa || username,
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/cottonBall/07.SaveManufacturingSteps`,
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
            `${API.prodUrl}/Precot/api/cottonBall/07.GetManufacturingSteps?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            if (res.data.length > 0) {
              setLoading(false);
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
              setLoading(false);
            }
          })
          .catch((err) => {
            setLoading(false);
            message.error(err.response.data.message);
          });
      }
    } catch (error) {
      setLoading(false);
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
      rdy01DateQa: "Row 1 Qa Date",
      rdy01SignQa: "Row 1 Qa Signature",
      rdy02DateProd: "Row 2 Production Date",
      rdy02SignProd: "Row 2 Production Signature",
      rdy02DateQa: "Row 2 Qa Date",
      rdy02SignQa: "Row 2 Qa Signature",
      tc01DelvSpeed: "Delivery Speed",
      tc01Draft: "Draft",
      tc01DateProd: "Row 3 Production Date",
      tc01SignProd: "Row 3 Production Signature",
      tc01DateQa: "Row 3 Qa Date",
      tc01SignQa: "Row 3 Qa Sign",
      tc02DelvSpeed: "Delivery Speed 2",
      tc02Draft: "Draft 2",
      tc02DateProd: "Row 4 Production Date",
      tc02SignProd: "Row 4 Production Signature",
      tc02DateQa: "Row 4 Qa Date",
      tc02SignQa: "Row 4 Qa Signature",
      psdNo05: "PDS No 1",
      no05DateProd: "Row 5 Production Date",
      no05SignProd: "Row 5 Production Signature",
      no05DateQa: "Row 5 Qa Date",
      no05SignQa: "Row 5 Qa Signature",
      psdNo06: "PDS 2",
      no06DateProd: "Row 6 Production Date",
      no06SignProd: "Row 6 Production Signature",
      no06DateQa: "Row 6 Qa Date",
      no06SignQa: "Row 6 Qa Signature",
      rdy07DateProd: "Row 7 Production Date",
      rdy07SignProd: "Row 7 Production Signature",
      rdy07DateQa: "Row 7 Qa Date",
      rdy07SignQa: "Row 7 Qa Signature",
      psdNo08: "Pds No 3",
      no08DateProd: "Row 8 Production Date",
      no08SignProd: "Row 8 Production Signature",
      no08DateQa: "Row 8 Qa Date",
      no08SignQa: "Row 8 Qa Signature",
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
        "tc01DelvSpeed",
        "tc01Draft",
        "tc02DelvSpeed",
        "tc02Draft",
        "psdNo05",
        "psdNo06",
        "psdNo08",
      ];
      if (!checkRequiredFields(supervisorKeys)) return;
    }

    // QA validation
    if (props.loggedInQa) {
      const qaKeys = [
        "tc01DelvSpeed",
        "tc01Draft",

        "tc02DelvSpeed",
        "tc02Draft",

        "psdNo05",

        "psdNo06",

        "psdNo08",
      ];
      if (!checkRequiredFields(qaKeys)) return;
    }

    const payload = {
      id: formData.id,
      order_no: props.orderNo,
      batch_no: props.batchNo,
      observation01: formData.observation01,
      rdyNoRdy01: formData.rdyNoRdy01,
      rdy01DateProd: formData.rdy01DateProd || supervisorDate,
      rdy01SignProd: formData.rdy01SignProd || usernameSupervisor,
      rdy01DateQa: formData.rdy01DateQa || qaDate,
      rdy01SignQa: formData.rdy01SignQa || username,
      observation02: formData.observation02,
      rdyNoRdy02: formData.rdyNoRdy02,
      rdy02DateProd: formData.rdy02DateProd || supervisorDate,
      rdy02NameProd: formData.rdy02NameProd || usernameSupervisor,
      rdy02SignProd: formData.rdy02SignProd || usernameSupervisor,
      rdy02DateQa: formData.rdy02DateQa || qaDate,
      rdy02NameQa: formData.rdy02NameQa || username,
      rdy02SignQa: formData.rdy02SignQa || username,
      observation03: formData.observation03,
      tc01DelvSpeed: formData.tc01DelvSpeed,
      tc01Draft: formData.tc01Draft,
      tc01DateProd: formData.tc01DateProd || supervisorDate,
      tc01SignProd: formData.tc01SignProd || usernameSupervisor,
      tc01DateQa: formData.tc01DateQa || qaDate,
      tc01SignQa: formData.tc01SignQa || username,
      cardNameQa: formData.cardNameQa,
      observation04: formData.observation04,
      tc02DelvSpeed: formData.tc02DelvSpeed,
      tc02Draft: formData.tc02Draft,
      tc02DateProd: formData.tc02DateProd || supervisorDate,
      tc02SignProd: formData.tc02SignProd || usernameSupervisor,
      tc02DateQa: formData.tc02DateQa || qaDate,
      tc02SignQa: formData.tc02SignQa || username,
      observation05: formData.observation05,
      psdNo05: formData.psdNo05,
      no05DateProd: formData.no05DateProd || supervisorDate,
      no05SignProd: formData.no05SignProd || usernameSupervisor,
      no05DateQa: formData.no05DateQa || qaDate,
      no05SignQa: formData.no05SignQa || username,
      observation06: formData.observation06,
      psdNo06: formData.psdNo06,
      no06DateProd: formData.no06DateProd || supervisorDate,
      no06NameProd: formData.no06NameProd || usernameSupervisor,
      no06SignProd: formData.no06SignProd || usernameSupervisor,
      no06DateQa: formData.no06DateQa || qaDate,
      no06NameQa: formData.no06NameQa || username,
      no06SignQa: formData.no06SignQa || username,
      observation07: formData.observation07,
      rdyNoRdy07: formData.rdyNoRdy07,
      rdy07DateProd: formData.rdy07DateProd || supervisorDate,
      rdy07SignProd: formData.rdy07SignProd || usernameSupervisor,
      rdy07DateQa: formData.rdy07DateQa || qaDate,
      rdy07SignQa: formData.rdy07SignQa || username,
      observation08: formData.observation08,
      psdNo08: formData.psdNo08,
      no08DateProd: formData.no08DateProd || supervisorDate,
      no08SignProd: formData.no08SignProd || usernameSupervisor,
      no08DateQa: formData.no08DateQa || qaDate,
      no08SignQa: formData.no08SignQa || username,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/cottonBall/07.SubmitManufacturingSteps`,
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
            `${API.prodUrl}/Precot/api/cottonBall/07.GetManufacturingSteps?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            if (res.data.length > 0) {
              setLoading(false);
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
              setLoading(false);
              setSupervisorApproved(false);
              setQaApproved(true);
            }
          })
          .catch((err) => {
            setLoading(false);
            message.error(err.response.data.message);
          });
      }
    } catch (error) {
      setLoading(false);
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
          loading={loading}
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
          loading={loading}
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
            Switch ON all the machines & Sub machines: Bale plucker, MBO, ERM,
            TC-10 (1&2), Ball Machine (Link & Texcore), Sealing machine, Metal
            detector.
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
              value={formData.rdy01DateProd || supervisorDate}
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
              value={formData.rdy01DateQa || qaDate}
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
              value={formData.rdy02DateProd || supervisorDate}
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
              value={formData.rdy02DateQa || qaDate}
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
            TC10 - 01: Check the input cotton flow, and machine parameters as
            per the below specification. Sliver GPM: Min 3 - Max 6 Delivery
            speed (Mtrs/min) Standard: Min 100 to Max 408 Draft Standard: Min 40
            to Max 250
          </td>
          <td style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>Delivery Speed:</span>
              <Input
                readOnly={
                  props.loggedInHod ||
                  props.loggedInQa ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
                addonAfter="Mtrs/min"
                type="text"
                style={{ width: "150px", textAlign: "center" }}
                // min={0}
                // max={30}
                value={formData.tc01DelvSpeed}
                name="tc01DelvSpeed"
                onChange={handleInput}
                // onKeyDown={(e) => handleKeyDown(e, "tc01DelvSpeed")}
              />
            </div>
            <br></br>
            <br />
            <Input
              addonBefore="Draft:"
              type="text"
              // min={90}
              // max={280}
              value={formData.tc01Draft}
              onChange={handleInput}
              name="tc01Draft"
              style={{ textAlign: "center" }}
              // onKeyDown={(e) => {
              //   handleKeyDown(e, "tc01Draft");
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
              value={formData.tc01SignProd || usernameSupervisor}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("tc01SignProd", selectedOption)
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
              name="tc01DateProd"
              type="datetime-local"
              value={formData.tc01DateProd || supervisorDate}
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
              value={formData.tc01SignQa || username}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("tc01SignQa", selectedOption)
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
              name="tc01DateQa"
              value={formData.tc01DateQa || qaDate}
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
            TC10 - 02: Check the input cotton flow, and machine parameters as
            per the below specification. Sliver GPM: Min 3 - Max 6 Delivery
            speed (Mtrs/min) Standard: Min 100 to Max 408 Draft Standard: Min 40
            to Max 250
          </td>
          <td style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>Delivery Speed:</span>
              <Input
                readOnly={
                  props.loggedInHod ||
                  props.loggedInQa ||
                  (props.loggedInSupervisor && supervisorApproved)
                }
                addonAfter="Mtrs/min"
                type="text"
                style={{ width: "150px", textAlign: "center" }}
                // min={0}
                // max={30}
                value={formData.tc02DelvSpeed}
                name="tc02DelvSpeed"
                onChange={handleInput}
                // onKeyDown={(e) => handleKeyDown(e, "tc02DelvSpeed")}
              />
            </div>
            <br></br>
            <br />
            <Input
              addonBefore="Draft:"
              type="text"
              // min={90}
              // max={280}
              value={formData.tc02Draft}
              onChange={handleInput}
              name="tc02Draft"
              style={{ textAlign: "center" }}
              // onKeyDown={(e) => {
              //   handleKeyDown(e, "tc02Draft");
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
              value={formData.tc02SignProd || usernameSupervisor}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("tc02SignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="tc02DateProd"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              value={formData.tc02DateProd || supervisorDate}
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
              value={formData.tc02SignQa || username}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("tc02SignQa", selectedOption)
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
              name="tc02DateQa"
              type="datetime-local"
              value={formData.tc02DateQa || qaDate}
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
            5
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            Link: Feed the sliver into all 10 tubes. follow the Ball weight
            settings for as per the Product Development Sheet.
          </td>
          <td style={{ textAlign: "center", padding: "0.9em" }}>
            {" "}
            <Input
              readOnly={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              addonBefore="PDS No"
              addonAfter="SAP"
              type="text"
              // min={150}
              // max={400}
              style={{ textAlign: "center" }}
              value={formData.psdNo05}
              name="psdNo05"
              onChange={handleInput}
              // onKeyDown={(e) => {
              //   handleKeyDown(e, "psdNo05");
              // }}
            ></Input>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.no05SignProd || usernameSupervisor}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("no05SignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="no05DateProd"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              value={formData.no05DateProd || supervisorDate}
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
              value={formData.no05SignQa || username}
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("no05SignQa", selectedOption)
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
              name="no05DateQa"
              type="datetime-local"
              value={formData.no05DateQa || qaDate}
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
            Texcore: Feed the sliver into all 10 tubes and set the cutting
            length depending up on the Ball weight.
          </td>
          <td style={{ textAlign: "center", padding: "0.9em" }}>
            {" "}
            <Input
              readOnly={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              addonBefore="PDS No"
              addonAfter="SAP"
              type="text"
              // min={150}
              // max={400}
              style={{ textAlign: "center" }}
              value={formData.psdNo06}
              name="psdNo06"
              onChange={handleInput}
              // onKeyDown={(e) => {
              //   handleKeyDown(e, "psdNo06");
              // }}
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
              value={formData.no06DateProd || supervisorDate}
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
              value={formData.no06DateQa || qaDate}
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
            7
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
              value={formData.rdyNoRdy07}
              onChange={(e) => handleRadio(e, "rdyNoRdy07")}
            >
              <Radio value="Checked">Checked</Radio>
              <Radio value="NotChecked">Not Checked</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              value={formData.rdy07SignProd || usernameSupervisor}
              style={{
                width: "12em",
              }}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("rdy07SignProd", selectedOption)
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
              name="rdy07DateProd"
              value={formData.rdy07DateProd || supervisorDate}
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
              value={formData.rdy07SignQa || username}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("rdy07SignQa", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                (props.loggedInQa && qaApproved) ||
                props.loggedInSupervisor
              }
            />
            <Input
              name="rdy07DateQa"
              style={{
                width: "12em",
              }}
              value={formData.rdy07DateQa || qaDate}
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
            8
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            Perform the packing as per the Product Development Sheet (Format #
            DVP01/F-05)
          </td>
          <td style={{ textAlign: "center", padding: "0.9em" }}>
            {" "}
            <Input
              readOnly={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
              addonBefore="PDS No"
              addonAfter="SAP"
              type="text"
              // min={150}
              // max={400}
              style={{ textAlign: "center" }}
              value={formData.psdNo08}
              name="psdNo08"
              onChange={handleInput}
              // onKeyDown={(e) => {
              //   handleKeyDown(e, "psdNo08");
              // }}
            ></Input>
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.9em" }}>
            <Select
              style={{
                width: "12em",
              }}
              value={formData.no08SignProd || usernameSupervisor}
              options={props.supLov}
              onChange={(selectedOption) =>
                handleUser("no08SignProd", selectedOption)
              }
              disabled={
                props.loggedInHod ||
                props.loggedInQa ||
                (props.loggedInSupervisor && supervisorApproved)
              }
            />
            <Input
              name="no08DateProd"
              style={{
                width: "12em",
              }}
              type="datetime-local"
              value={formData.no08DateProd || supervisorDate}
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
              value={formData.no08SignQa || username}
              style={{
                width: "12em",
              }}
              options={props.qaLov}
              onChange={(selectedOption) =>
                handleUser("no08SignQa", selectedOption)
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
              name="no08DateQa"
              type="datetime-local"
              value={formData.no08DateQa || qaDate}
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
