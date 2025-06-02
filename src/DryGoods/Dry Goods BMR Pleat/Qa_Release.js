import React, { useEffect, useState } from "react";
import { Button, Input, message, Radio, Select } from "antd";
import { GrDocumentStore } from "react-icons/gr";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import API from "../../baseUrl.json";

const Qa_Release = (props) => {
  const token = localStorage.getItem("token");
  const [formStatus, setFormStatus] = useState({
    fieldStatus: false,
    buttonLoader: false,
  });

  const [qaData, setQaData] = useState({
    batch_no: "",
    order_no: "",
    form_no: "",
    details: [
      {
        date: "",
        time: "",
        name: "tr1",
        sign: "",
        status_1: "",
        status_2: "",
      },
      {
        date: "",
        time: "",
        name: "tr2",
        sign: "",
        status_1: "",
        status_2: "",
      },
      {
        date: "",
        time: "",
        name: "tr3",
        sign: "",
        status_1: "",
        status_2: "",
      },
      {
        date: "",
        time: "",
        name: "tr4",
        sign: "",
        status_1: "",
        status_2: "",
      },
      {
        date: "",
        time: "",
        name: "tr5",
        sign: "",
        status_1: "",
        status_2: "",
      },
    ],
  });

  const role = localStorage.getItem("role");

  const username =
    role === "QA_MANAGER" || role === "QA_DESIGNEE"
      ? localStorage.getItem("username")
      : "";

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
  const todayDateTime =
    role === "QA_MANAGER" || role === "QA_DESIGNEE" ? getCurrentDateTime() : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/cottonPleat/13.GetQaRelease?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          setQaData(response.data[0]);
          console.log("first", qaData.status);
          if (response.data[0].status == "QA_APPROVED") {
            setFormStatus((prevState) => ({
              ...prevState,
              fieldStatus: true,
            }));
          }
        }
        if (response.data.length == 0) {
          setFormStatus({
            buttonLoader: false,
            fieldStatus: false,
          });
          setQaData({
            batch_no: props.batchNo,
            order_no: props.orderNo,
            form_no: "",
            details: [
              {
                date: "",
                time: "",
                name: "tr1",
                sign: "",
                status_1: "",
                status_2: "",
              },
              {
                date: "",
                time: "",
                name: "tr2",
                sign: "",
                status_1: "",
                status_2: "",
              },
              {
                date: "",
                time: "",
                name: "tr3",
                sign: "",
                status_1: "",
                status_2: "",
              },
              {
                date: "",
                time: "",
                name: "tr4",
                sign: "",
                status_1: "",
                status_2: "",
              },
              {
                date: "",
                time: "",
                name: "tr5",
                sign: "",
                status_1: "",
                status_2: "",
              },
            ],
          });
        }
      } catch (error) {
        message.error(error.response.data.message);
      }
    };
    fetchData();
  }, [props.batchNo]);

  console.log("qa Data", qaData);

  const handleSave = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }

    const payload = {
      rls_id: qaData.rls_id,
      batch_no: props.batchNo,
      order_no: props.orderNo,
      form_no: "",
      details: qaData.details.map((detail) => {
        const details = {
          id: detail.id,
          date: detail.date || todayDateTime,
          time: detail.time,
          name: detail.name || username,
          sign: detail.sign || username,
          status_1: detail.status_1,
          status_2: detail.status_2,
        };
        return details;
      }),
    };
    try {
      setFormStatus((prevState) => ({
        ...prevState,
        buttonLoader: true,
      }));
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/cottonPleat/13.SaveQaRelease`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        message.success("Qa Release Saved Succesfully");
        setFormStatus((prevState) => ({
          ...prevState,
          buttonLoader: false,
        }));
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/cottonPleat/13.GetQaRelease?batch_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              setQaData(response.data[0]);
            }
          } catch (error) {
            message.error(error.response.data.message);
            setFormStatus((prevState) => ({
              ...prevState,
              buttonLoader: false,
            }));
          }
        };
        fetchData();
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }

    const payload = {
      rls_id: qaData.rls_id,
      batch_no: props.batchNo,
      order_no: props.orderNo,
      form_no: "",
      details: qaData.details.map((detail) => {
        const details = {
          id: detail.id,
          date: detail.date || todayDateTime,
          time: detail.time,
          name: detail.name || username,
          sign: detail.sign || username,
          status_1: detail.status_1 || "NA",
          status_2: detail.status_2 || "NA",
        };
        return details;
      }),
    };
    try {
      setFormStatus((prevState) => ({
        ...prevState,
        buttonLoader: true,
      }));
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/cottonPleat/13.SubmitQaRelease`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        message.success("Qa Release Submitted Succesfully");
        setFormStatus((prevState) => ({
          ...prevState,
          buttonLoader: false,
        }));
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/cottonPleat/13.GetQaRelease?batch_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              setQaData(response.data[0]);
            }
            if (response.data.length > 0) {
              setQaData(response.data[0]);
              console.log("first", qaData.status);
              if (response.data[0].status == "QA_APPROVED") {
                setFormStatus((prevState) => ({
                  ...prevState,
                  fieldStatus: true,
                }));
              }
            }
          } catch (error) {
            message.error(error.response.data.message);
            setFormStatus((prevState) => ({
              ...prevState,
              buttonLoader: false,
            }));
          }
        };
        fetchData();
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const handleInput = (e, name, field, type) => {
    let value;
    if (type == "input") {
      value = e.target.value;
    } else if (type == "select") {
      value = e;
    }
    const index = qaData.details.findIndex((details) => details.name == name);
    const updatedDetails = [...qaData.details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setQaData({
      ...qaData,
      details: updatedDetails,
    });
  };
  useEffect(() => {
    console.log(qaData);
  }, [qaData]);

  return (
    <div>
      <>
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
              display:
                !props.loggedInQaManQADes || formStatus.fieldStatus
                  ? "none"
                  : "block",
            }}
            shape="round"
            loading={formStatus.buttonLoader}
            icon={<GrDocumentStore color="#00308F" />}
            onClick={handleSave}
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
                !props.loggedInQaManQADes || formStatus.fieldStatus
                  ? "none"
                  : "block",
            }}
            shape="round"
            loading={formStatus.buttonLoader}
            icon={<GrDocumentStore color="#00308F" />}
            onClick={handleSubmit}
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
            <td
              style={{
                padding: "1em",
              }}
            >
              S.No
            </td>
            <td
              style={{
                padding: "1em",
              }}
            >
              Description
            </td>
            <td
              style={{
                padding: "1em",
              }}
            >
              Status
            </td>
            <td
              style={{
                padding: "1em",
              }}
            >
              Sign and Date
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              1
            </td>
            <td style={{ padding: "1em" }}>
              All critical process parameters reviewed. (Within/Not within
              range)
            </td>
            <td>
              <Radio.Group
                value={
                  qaData.details.find((details) => details.name == "tr1")
                    ?.status_1
                }
                onChange={(e) => {
                  handleInput(e, "tr1", "status_1", "input");
                }}
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                options={props.qaLov}
                onChange={(e) => {
                  handleInput(e, "tr1", "sign", "select");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr1")
                    ?.sign || username
                }
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
              />
              <Input
                type="datetime-local"
                onChange={(e) => {
                  handleInput(e, "tr1", "date", "input");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr1")
                    ?.date || todayDateTime
                }
                style={{
                  width: "50%",
                }}
                readOnly={formStatus.fieldStatus || !props.loggedInQaManQADes}
                max={todayDateTime}
              />
            </td>
          </tr>

          {/* two */}
          <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              2
            </td>
            <td style={{ padding: "1em" }}>
              In process checks reviewed. (Meeting/Not meeting the
              specification)
            </td>
            <td>
              <Radio.Group
                value={
                  qaData.details.find((details) => details.name == "tr2")
                    ?.status_1
                }
                onChange={(e) => {
                  handleInput(e, "tr2", "status_1", "input");
                }}
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                options={props.qaLov}
                onChange={(e) => {
                  handleInput(e, "tr2", "sign", "select");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr2")
                    ?.sign || username
                }
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
              />
              <Input
                type="datetime-local"
                value={
                  qaData.details.find((details) => details.name == "tr2")
                    ?.date || todayDateTime
                }
                onChange={(e) => {
                  handleInput(e, "tr2", "date", "input");
                }}
                style={{
                  width: "50%",
                }}
                readOnly={formStatus.fieldStatus || !props.loggedInQaManQADes}
                max={todayDateTime}
              />
            </td>
          </tr>
          {/* three */}
          <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              3
            </td>
            <td style={{ padding: "1em" }}>
              Deviations reviewed. (Found/Not found)
            </td>
            <td>
              <Radio.Group
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
                onChange={(e) => {
                  handleInput(e, "tr3", "status_1", "input");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr3")
                    ?.status_1
                }
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={
                  qaData.details.find((details) => details.name == "tr3")
                    ?.sign || username
                }
                onChange={(e) => {
                  handleInput(e, "tr3", "sign", "select");
                }}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
              />
              <Input
                type="datetime-local"
                value={
                  qaData.details.find((details) => details.name == "tr3")
                    ?.date || todayDateTime
                }
                onChange={(e) => {
                  handleInput(e, "tr3", "date", "input");
                }}
                style={{
                  width: "50%",
                }}
                readOnly={formStatus.fieldStatus || !props.loggedInQaManQADes}
                max={todayDateTime}
              />
            </td>
          </tr>
          {/* four */}
          <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              4
            </td>
            <td style={{ padding: "1em" }}>If deviations are logged</td>
            <td>
              <Radio.Group
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
                onChange={(e) => {
                  handleInput(e, "tr4", "status_1", "input");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr4")
                    ?.status_1
                }
              >
                <Radio value="CLOSED">Closed</Radio>
                <Radio value="NOT CLOSED">Not Closed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                options={props.qaLov}
                value={
                  qaData.details.find((details) => details.name == "tr4")
                    ?.sign || username
                }
                onChange={(e) => {
                  handleInput(e, "tr4", "sign", "select");
                }}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
              />
              <Input
                type="datetime-local"
                onChange={(e) => {
                  handleInput(e, "tr4", "date", "input");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr4")
                    ?.date || todayDateTime
                }
                style={{
                  width: "50%",
                }}
                readOnly={formStatus.fieldStatus || !props.loggedInQaManQADes}
                max={todayDateTime}
              />
            </td>
          </tr>
          {/* five */}
          <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              5
            </td>
            <td style={{ padding: "1em" }}>
              The Batch is released to next step.
            </td>
            <td>
              <Radio.Group
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
                onChange={(e) => {
                  handleInput(e, "tr5", "status_1", "input");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr5")
                    ?.status_1
                }
              >
                <Radio value="RELEASED">Released</Radio>
                <Radio value="NOT RELEASED">Not Released</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                options={props.qaLov}
                onChange={(e) => {
                  handleInput(e, "tr5", "sign", "select");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr5")
                    ?.sign || username
                }
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQaManQADes || formStatus.fieldStatus}
              />
              <Input
                type="datetime-local"
                onChange={(e) => {
                  handleInput(e, "tr5", "date", "input");
                }}
                value={
                  qaData.details.find((details) => details.name == "tr5")
                    ?.date || todayDateTime
                }
                style={{
                  width: "50%",
                }}
                readOnly={formStatus.fieldStatus || !props.loggedInQaManQADes}
                max={todayDateTime}
              />
            </td>
          </tr>
        </table>
      </>
    </div>
  );
};

export default Qa_Release;
