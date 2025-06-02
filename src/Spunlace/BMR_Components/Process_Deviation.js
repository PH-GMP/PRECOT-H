import { Button, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Process_Deviation = (props) => {
  console.log("props", props.orderNo);
  const [data, setData] = useState([]);
  const [newSave, setNewSave] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnDisableSup, setBtnDisableSup] = useState(false);

  const [supervisorDisable, setSupervisorDisable] = useState(false);
  const [qadisable, setQadisable] = useState(false);
  const [userLov, setUserLov] = useState({
    prodlov: "",
    qalov: "",
  });
  const role = localStorage.getItem("role");
  const [username, setUsername] = useState("");
  const [usernameQA, setUsernameQA] = useState("");

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");

  // Function to format the date and time as 'YYYY-MM-DDTHH:mm'
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  useEffect(() => {
    const now = new Date();

    if (role === "ROLE_SUPERVISOR") {
      const formattedDate = formatDateTime(now);
      setCurrentDateTime(formattedDate);
    }

    if (role === "ROLE_QA") {
      const formattedDateQA = formatDateTime(now);
      setCurrentDateTimeQA(formattedDateQA);
    }
  }, [role]);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && role == "ROLE_SUPERVISOR") {
      setUsername(storedUsername);
    } else if (storedUsername && role == "ROLE_QA") {
      setUsernameQA(storedUsername);
    }
    console.log("username", storedUsername);
  }, []);

  const [deviation, setDeviation] = useState({
    deviation_log_no_01: "",
    deviation_log_no_02: "",
    form_no: "",
    id: "",
    order_no: "",
    qa1_date_01: "",
    qa1_date_02: "",
    qa1_sign_01: "",
    qa1_sign_02: "",
    qa2_date_01: "",
    qa2_date_02: "",
    qa2_sign_01: "",
    qa2_sign_02: "",
    remarks_01: "",
    remarks_02: "",
    qa_id: "",
    supervisor_id: "",
    status: "",
  });

  //State update here in standard approach
  const updateDeviation = (updates) => {
    setDeviation((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const onChange1 = (values) => {
    updateDeviation({
      qa1_sign_01: values,
    });
  };
  const onChange2 = (values) => {
    updateDeviation({
      qa1_sign_02: values,
    });
  };
  const onChange3 = (values) => {
    updateDeviation({
      qa2_sign_01: values,
    });
  };
  const onChange4 = (values) => {
    updateDeviation({
      qa2_sign_02: values,
    });
  };

  useEffect(() => {
    if (props.orderNo == "") {
      message.warning("No Order Number Selected");
    } else {
      axios
        .get(
          `${ API.prodUrl}/Precot/api/spunlace/summary/10.GetProcessDeviationRecord?order_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          // setData(response.data);
          console.log("data", response.data[0].deviation_log_no_01.length);
          if (response.data.length > 0) {
            setNewSave(true);
            setDeviation(response.data[0]);
            // if (response.data[0].status == "QA_APPROVED") {
            //   console.log("if (response.data[0].status == QA_APPROVED)");
            //   setBtnDisable(true);
            //   setQadisable(true);
            // } else if (
            //   response.data[0].status == "SUPERVISOR_APPROVED" &&
            //   props.loggedInSupervisor
            // ) {
            //   console.log("calling if");

            //   setBtnDisable(true);
            //   setSupervisorDisable(true);
            // } else {
            //   console.log("calling else");
            //   setBtnDisable(false);
            //   setSupervisorDisable(false);
            // }
            if (response.data[0].status == "QA_APPROVED" && props.loggedInQa) {
              console.log("calling if main");
              setBtnDisable(true);
              setQadisable(true);
            } else if (
              response.data[0].status == "SUPERVISOR_APPROVED" &&
              username
            ) {
              console.log("calling if");
              setBtnDisableSup(true);
              setBtnDisable(true);
              setSupervisorDisable(true);
            } else if (
              response.data[0].status == "SUPERVISOR_SAVED" &&
              props.loggedInSupervisor
            ) {
              console.log("calling if SUPERVISOR_SAVED");
              setBtnDisableSup(false);
              setSupervisorDisable(false);
            } else {
              console.log("calling else");
              setBtnDisable(false);
              setBtnDisableSup(false);
              setSupervisorDisable(false);
            }
          } else {
            setNewSave(false);
          }
        })
        .catch((err) => {
          console.log("Error", err);
          // message.error("Unable to fetch data due to network error");
        });
    }
  }, [props.batchNo]);

  const handleSubmit = () => {
    const payload_2 = {
      id: deviation.id,
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      batchNo: props.batchNo,
      status: deviation.status,
      susupervisor_id: deviation.supervisor_id,
      qa_id: deviation.qa_id,
      deviation_log_no_01: deviation.deviation_log_no_01,
      remarks_01: deviation.remarks_01,
      qa1_date_01: deviation.qa1_date_01 || currentDateTimeQA,
      qa1_sign_01: deviation.qa1_sign_01 || usernameQA,
      qa1_date_02: deviation.qa1_date_02 || currentDateTime,
      qa1_sign_02: deviation.qa1_sign_02 || username,
      deviation_log_no_02: deviation.deviation_log_no_02,
      remarks_02: deviation.remarks_02,
      qa2_date_01: deviation.qa2_date_01 || currentDateTimeQA,
      qa2_sign_01: deviation.qa2_sign_01 || usernameQA,
      qa2_date_02: deviation.qa2_date_02 || currentDateTime,
      qa2_sign_02: deviation.qa2_sign_02 || username,
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/10.SubmitProcessDeviationRecord`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        message.success("Submitted Successfully!");
        axios
          .get(
            `${ API.prodUrl}/Precot/api/spunlace/summary/10.GetProcessDeviationRecord?order_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            // setData(response.data);
            console.log("data", response.data[0].deviation_log_no_01.length);
            if (response.data.length > 0) {
              setNewSave(true);
              setDeviation(response.data[0]);
              // if (
              //   response.data[0].status == "QA_APPROVED" &&
              //   props.loggedInQa
              // ) {
              //   setBtnDisable(true);
              //   setQadisable(true);
              // } else if (
              //   response.data[0].status == "SUPERVISOR_APPROVED" &&
              //   props.loggedInSupervisor
              // ) {
              //   console.log("calling if");
              //   setBtnDisable(true);
              //   setSupervisorDisable(true);
              // } else {
              //   console.log("calling else");
              //   setBtnDisable(false);
              //   setSupervisorDisable(false);
              // }
              if (
                response.data[0].status == "QA_APPROVED" &&
                props.loggedInQa
              ) {
                console.log("calling if main");
                setBtnDisable(true);
                setQadisable(true);
              } else if (
                response.data[0].status == "SUPERVISOR_APPROVED" &&
                username
              ) {
                console.log("calling if");
                setBtnDisableSup(true);
                setBtnDisable(true);
                setSupervisorDisable(true);
              } else if (
                response.data[0].status == "SUPERVISOR_SAVED" &&
                props.loggedInSupervisor
              ) {
                console.log("calling if SUPERVISOR_SAVED");
                setBtnDisableSup(false);
                setSupervisorDisable(false);
              } else {
                console.log("calling else");
                setBtnDisable(false);
                setBtnDisableSup(false);
                setSupervisorDisable(false);
              }
            } else {
              setNewSave(false);
            }
          })
          .catch((err) => {
            console.log("Error", err);
            // message.error("Unable to fetch data due to network error");
          });
      })
      .catch((error) => {
        console.error("There was an error making the request!", error);
        message.error("Failed to Submit");
      });
  };

  //save
  const handleSave = () => {
    const payload_2 = {
      id: deviation.id,
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      batchNo: props.batchNo,
      status: deviation.status,
      susupervisor_id: deviation.supervisor_id,
      qa_id: deviation.qa_id,
      deviation_log_no_01: deviation.deviation_log_no_01,
      remarks_01: deviation.remarks_01,
      qa1_date_01: deviation.qa1_date_01 || currentDateTimeQA,
      qa1_sign_01: deviation.qa1_sign_01 || usernameQA,
      qa1_date_02: deviation.qa1_date_02 || currentDateTime,
      qa1_sign_02: deviation.qa1_sign_02 || username,
      deviation_log_no_02: deviation.deviation_log_no_02,
      remarks_02: deviation.remarks_02,
      qa2_date_01: deviation.qa2_date_01 || currentDateTimeQA,
      qa2_sign_01: deviation.qa2_sign_01 || usernameQA,
      qa2_date_02: deviation.qa2_date_02 || currentDateTime,
      qa2_sign_02: deviation.qa2_sign_02 || username,
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/10.SaveProcessDeviationRecord`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        message.success("Saved Successfully!");
        axios
          .get(
            `${ API.prodUrl}/Precot/api/spunlace/summary/10.GetProcessDeviationRecord?order_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            // setData(response.data);
            console.log("data", response.data[0].deviation_log_no_01.length);
            if (response.data.length > 0) {
              setNewSave(true);
              setDeviation(response.data[0]);
              // if (
              //   response.data[0].status == "QA_APPROVED" &&
              //   props.loggedInQa
              // ) {
              //   setBtnDisable(true);
              //   setQadisable(true);
              // } else if (
              //   response.data[0].status == "SUPERVISOR_APPROVED" &&
              //   props.loggedInSupervisor
              // ) {
              //   console.log("calling if");
              //   setBtnDisableSup(true);
              //   setBtnDisable(true);
              //   setSupervisorDisable(true);
              // } else if (
              //   response.data[0].status != "QA_APPROVED" &&
              //   props.loggedInSupervisor
              // ) {
              //   console.log("calling if QA_APPROVED");
              //   setBtnDisableSup(true);
              //   setSupervisorDisable(true);
              // } else {
              //   console.log("calling else");
              //   setBtnDisable(false);
              //   setBtnDisableSup(false);
              //   setSupervisorDisable(false);
              // }

              if (
                response.data[0].status == "QA_APPROVED" &&
                props.loggedInQa
              ) {
                console.log("calling if main");
                setBtnDisable(true);
                setQadisable(true);
              } else if (
                response.data[0].status == "SUPERVISOR_APPROVED" &&
                username
              ) {
                console.log("calling if");
                setBtnDisableSup(true);
                setBtnDisable(true);
                setSupervisorDisable(true);
              } else if (
                response.data[0].status == "SUPERVISOR_SAVED" &&
                props.loggedInSupervisor
              ) {
                console.log("calling if SUPERVISOR_SAVED");
                setBtnDisableSup(false);
                setSupervisorDisable(false);
              } else {
                console.log("calling else");
                setBtnDisable(false);
                setBtnDisableSup(false);
                setSupervisorDisable(false);
              }
            } else {
              setNewSave(false);
            }
          })
          .catch((err) => {
            console.log("Error", err);
            //message.error("Unable to fetch data due to network error");
          });
      })
      .catch((error) => {
        console.error("There was an error making the request!", error);
        message.error("Failed to Submit");
      });
  };

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
        <div
          style={{
            display: "flex",
          }}
        >
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display:
                btnDisable || btnDisableSup || props.loggedInHod
                  ? "none"
                  : "block",
            }}
            onClick={handleSave}
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
              display:
                btnDisable || btnDisableSup || props.loggedInHod
                  ? "none"
                  : "block",
            }}
            onClick={handleSubmit}
            shape="round"
          >
            Submit
          </Button>
        </div>
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
              value={deviation.deviation_log_no_01}
              onChange={(e) => {
                updateDeviation({
                  deviation_log_no_01: e.target.value,
                });
              }}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
              disabled={!props.loggedInQa || qadisable}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              value={deviation.qa1_sign_01 || usernameQA}
              placeholder="Choose Signature"
              options={props.qaLov}
              onChange={onChange1}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
              disabled={!props.loggedInQa || qadisable}
            />
            <input
              type="datetime-local"
              value={deviation.qa1_date_01 || currentDateTimeQA}
              onChange={(e) => {
                updateDeviation({
                  qa1_date_01: e.target.value,
                });
              }}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
              disabled={!props.loggedInQa || qadisable}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              value={deviation.remarks_01}
              onChange={(e) => {
                updateDeviation({
                  remarks_01: e.target.value,
                });
              }}
              disabled={!props.loggedInQa || qadisable}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              value={deviation.qa1_sign_02 || username}
              placeholder="Choose Signature"
              options={props.supLov}
              onChange={onChange2}
              // disabled={!props.loggedInQa || qadisable}
              disabled={!props.loggedInSupervisor || supervisorDisable}
            />
            <input
              type="datetime-local"
              value={deviation.qa1_date_02 || currentDateTime}
              onChange={(e) => {
                updateDeviation({
                  qa1_date_02: e.target.value,
                });
              }}
              // disabled={!props.loggedInQa || qadisable}
              disabled={!props.loggedInSupervisor || supervisorDisable}
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
              value={deviation.deviation_log_no_02}
              onChange={(e) => {
                updateDeviation({
                  deviation_log_no_02: e.target.value,
                });
              }}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
              disabled={!props.loggedInQa || qadisable}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              value={deviation.qa2_sign_01 || usernameQA}
              placeholder="Choose Signature"
              options={props.qalov}
              onChange={onChange3}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
              disabled={!props.loggedInQa || qadisable}
            />
            <input
              type="datetime-local"
              value={deviation.qa2_date_01 || currentDateTimeQA}
              onChange={(e) => {
                updateDeviation({
                  qa2_date_01: e.target.value,
                });
              }}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
              disabled={!props.loggedInQa || qadisable}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              value={deviation.remarks_02}
              onChange={(e) => {
                updateDeviation({
                  remarks_02: e.target.value,
                });
              }}
              disabled={!props.loggedInQa || qadisable}
              // disabled={
              //   !props.loggedInSupervisor || supervisorDisable || qadisable
              // }
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              value={deviation.qa2_sign_02 || username}
              placeholder="Choose Signature"
              options={props.supLov}
              onChange={onChange4}
              // disabled={!props.loggedInQa || qadisable}
              disabled={!props.loggedInSupervisor || supervisorDisable}
            />
            <input
              type="datetime-local"
              value={deviation.qa2_date_02 || currentDateTime}
              onChange={(e) => {
                updateDeviation({
                  qa2_date_02: e.target.value,
                });
              }}
              // disabled={!props.loggedInQa || qadisable}
              disabled={!props.loggedInSupervisor || supervisorDisable}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Process_Deviation;
