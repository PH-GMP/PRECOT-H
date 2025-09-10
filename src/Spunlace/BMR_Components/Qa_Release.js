import React, { useEffect, useState } from "react";
import { Button, Input, message, Radio, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import API from "../../baseUrl.json";

const Qa_Release = (props) => {
  const [messageApi, contextHolder] = useMessage();
  const [newSave, setNewSave] = useState(false);
  const [disable, setDisable] = useState(false);
  const [QaRelease, setQaRelease] = useState({
    observation1: "",
    observation2: "",
    observation3: "",
    observation4: "",
    observation5: "",
    sign1: "",
    sign2: "",
    sign3: "",
    sign4: "",
    sign5: "",
    date1: "",
    date2: "",
    date3: "",
    date4: "",
    date5: "",
  });
  const [ids, setIds] = useState({
    masterId: "",
    id1: "",
    id2: "",
    id3: "",
    id4: "",
    id5: "",
  });
  const role = localStorage.getItem("role");

  const [qaSaved, setQaSaved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);
  const usernameQA = role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");

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

    if (role === "ROLE_QA") {
      const formattedDateQA = formatDateTime(now);
      setCurrentDateTimeQA(formattedDateQA);
    }
  }, [role]);

  const updateQaRelease = (updates) => {
    setQaRelease((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateId = (updates) => {
    setIds((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const onChange1 = (values) => {
    updateQaRelease({ sign1: values });
  };
  const onChange2 = (values) => {
    updateQaRelease({ sign2: values });
  };
  const onChange3 = (values) => {
    updateQaRelease({ sign3: values });
  };
  const onChange4 = (values) => {
    updateQaRelease({ sign4: values });
  };
  const onChange5 = (values) => {
    updateQaRelease({ sign5: values });
  };
  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/summary/13.GetQaRelease?order_no=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        if (res.data.length > 0) {
          console.log("ghjbk");
          setNewSave(true);
          console.log("dd", res.data[0].status);
          setQaApproved(res.data[0].status == "QA_APPROVED" ? true : false);
          setQaSaved(res.data[0].status == "QA_SAVED" ? true : false);
        } else {
          setNewSave(false);
        }
        updateId({
          masterId: res.data[0].rls_id,
          id1: res.data[0].details[0].id,
          id2: res.data[0].details[1].id,
          id3: res.data[0].details[2].id,
          id4: res.data[0].details[3].id,
          id5: res.data[0].details[4].id,
        });
        updateQaRelease({
          observation1: res.data[0].details[0].status_1,
          observation2: res.data[0].details[1].status_1,
          observation3: res.data[0].details[2].status_1,
          observation4: res.data[0].details[3].status_1,
          observation5: res.data[0].details[4].status_1,
          sign1: res.data[0].details[0].sign,
          sign2: res.data[0].details[1].sign,
          sign3: res.data[0].details[2].sign,
          sign4: res.data[0].details[3].sign,
          sign5: res.data[0].details[4].sign,
          date1: res.data[0].details[0].date,
          date2: res.data[0].details[1].date,
          date3: res.data[0].details[2].date,
          date4: res.data[0].details[3].date,
          date5: res.data[0].details[4].date,
        });
        if (
          res.data[0].details[0].status_1 !== "" &&
          res.data[0].details[1].status_1 !== "" &&
          res.data[0].details[2].status_1 !== "" &&
          res.data[0].details[3].status_1 !== "" &&
          res.data[0].details[4].status_1 !== "" &&
          res.data[0].details[0].sign !== "" &&
          res.data[0].details[1].sign !== "" &&
          res.data[0].details[2].sign !== "" &&
          res.data[0].details[3].sign !== "" &&
          res.data[0].details[4].sign !== "" &&
          res.data[0].details[0].date !== "" &&
          res.data[0].details[1].date !== "" &&
          res.data[0].details[2].date !== "" &&
          res.data[0].details[3].date !== "" &&
          res.data[0].details[4].date !== ""
        ) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, [props.batchNo]);

  const w = () => {
    const payload_2 = {
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      rls_id: ids.masterId,
      batchNo: props.batchNo,
      details: [
        {
          date: QaRelease.date1 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign1 || usernameQA,
          status_1: QaRelease.observation1,
          status_2: "",
          rls_id: ids.masterId,
          id: ids.id1,
        },
        {
          date: QaRelease.date2 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign2 || usernameQA,
          status_1: QaRelease.observation2,
          status_2: "",
          id: ids.id2,
          rls_id: ids.masterId,
        },
        {
          date: QaRelease.date3 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign3 || usernameQA,
          status_1: QaRelease.observation3,
          status_2: "",
          id: ids.id3,
          rls_id: ids.masterId,
        },
        {
          date: QaRelease.date4 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign4 || usernameQA,
          status_1: QaRelease.observation4,
          status_2: "",
          id: ids.id4,
          rls_id: ids.masterId,
        },
        {
          date: QaRelease.date5 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign5 || usernameQA,
          status_1: QaRelease.observation5,
          status_2: "",
          id: ids.id5,
          rls_id: ids.masterId,
        },
      ],
    };
    console.log("new", newSave);
    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/summary/13.SubmitQaRelease`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        message.success("Qa Release Submitted");
        axios
          .get(
            `${API.prodUrl}/Precot/api/spunlace/summary/13.GetQaRelease?order_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("res", res.data);
            if (res.data.length > 0) {
              console.log("ghjbk");
              setNewSave(true);
              console.log("dd", res.data[0].status);
              setQaApproved(res.data[0].status == "QA_APPROVED" ? true : false);
              setQaSaved(res.data[0].status == "QA_SAVED" ? true : false);
            } else {
              setNewSave(false);
            }
            updateId({
              masterId: res.data[0].rls_id,
              id1: res.data[0].details[0].id,
              id2: res.data[0].details[1].id,
              id3: res.data[0].details[2].id,
              id4: res.data[0].details[3].id,
              id5: res.data[0].details[4].id,
            });
            updateQaRelease({
              observation1: res.data[0].details[0].status_1,
              observation2: res.data[0].details[1].status_1,
              observation3: res.data[0].details[2].status_1,
              observation4: res.data[0].details[3].status_1,
              observation5: res.data[0].details[4].status_1,
              sign1: res.data[0].details[0].sign,
              sign2: res.data[0].details[1].sign,
              sign3: res.data[0].details[2].sign,
              sign4: res.data[0].details[3].sign,
              sign5: res.data[0].details[4].sign,
              date1: res.data[0].details[0].date,
              date2: res.data[0].details[1].date,
              date3: res.data[0].details[2].date,
              date4: res.data[0].details[3].date,
              date5: res.data[0].details[4].date,
            });
            if (
              res.data[0].details[0].status_1 !== "" &&
              res.data[0].details[1].status_1 !== "" &&
              res.data[0].details[2].status_1 !== "" &&
              res.data[0].details[3].status_1 !== "" &&
              res.data[0].details[4].status_1 !== "" &&
              res.data[0].details[0].sign !== "" &&
              res.data[0].details[1].sign !== "" &&
              res.data[0].details[2].sign !== "" &&
              res.data[0].details[3].sign !== "" &&
              res.data[0].details[4].sign !== "" &&
              res.data[0].details[0].date !== "" &&
              res.data[0].details[1].date !== "" &&
              res.data[0].details[2].date !== "" &&
              res.data[0].details[3].date !== "" &&
              res.data[0].details[4].date !== ""
            ) {
              setDisable(true);
            } else {
              setDisable(false);
            }
          })
          .catch((err) => {
            console.log("Err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  //////////////////

  const saveQaRelease = () => {
    const payload_2 = {
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      rls_id: ids.masterId,
      batchNo: props.batchNo,
      details: [
        {
          date: QaRelease.date1 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign1 || usernameQA,
          status_1: QaRelease.observation1,
          status_2: "",
          rls_id: ids.masterId,
          id: ids.id1,
        },
        {
          date: QaRelease.date2 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign2 || usernameQA,
          status_1: QaRelease.observation2,
          status_2: "",
          id: ids.id2,
          rls_id: ids.masterId,
        },
        {
          date: QaRelease.date3 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign3 || usernameQA,
          status_1: QaRelease.observation3,
          status_2: "",
          id: ids.id3,
          rls_id: ids.masterId,
        },
        {
          date: QaRelease.date4 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign4 || usernameQA,
          status_1: QaRelease.observation4,
          status_2: "",
          id: ids.id4,
          rls_id: ids.masterId,
        },
        {
          date: QaRelease.date5 || currentDateTimeQA,
          time: "",
          name: "",
          sign: QaRelease.sign5 || usernameQA,
          status_1: QaRelease.observation5,
          status_2: "",
          id: ids.id5,
          rls_id: ids.masterId,
        },
      ],
    };
    console.log("new", newSave);
    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/summary/13.SaveQaRelease`,
        payload_2,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        message.success("Qa Release Saved");
        axios
          .get(
            `${API.prodUrl}/Precot/api/spunlace/summary/13.GetQaRelease?order_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("res", res.data);
            if (res.data.length > 0) {
              console.log("ghjbk");
              setNewSave(true);
              console.log("dd", res.data[0].status);
              setQaApproved(res.data[0].status == "QA_APPROVED" ? true : false);
              setQaSaved(res.data[0].status == "QA_SAVED" ? true : false);
            } else {
              setNewSave(false);
            }
            updateId({
              masterId: res.data[0].rls_id,
              id1: res.data[0].details[0].id,
              id2: res.data[0].details[1].id,
              id3: res.data[0].details[2].id,
              id4: res.data[0].details[3].id,
              id5: res.data[0].details[4].id,
            });
            updateQaRelease({
              observation1: res.data[0].details[0].status_1,
              observation2: res.data[0].details[1].status_1,
              observation3: res.data[0].details[2].status_1,
              observation4: res.data[0].details[3].status_1,
              observation5: res.data[0].details[4].status_1,
              sign1: res.data[0].details[0].sign,
              sign2: res.data[0].details[1].sign,
              sign3: res.data[0].details[2].sign,
              sign4: res.data[0].details[3].sign,
              sign5: res.data[0].details[4].sign,
              date1: res.data[0].details[0].date,
              date2: res.data[0].details[1].date,
              date3: res.data[0].details[2].date,
              date4: res.data[0].details[3].date,
              date5: res.data[0].details[4].date,
            });
            if (
              res.data[0].details[0].status_1 !== "" &&
              res.data[0].details[1].status_1 !== "" &&
              res.data[0].details[2].status_1 !== "" &&
              res.data[0].details[3].status_1 !== "" &&
              res.data[0].details[4].status_1 !== "" &&
              res.data[0].details[0].sign !== "" &&
              res.data[0].details[1].sign !== "" &&
              res.data[0].details[2].sign !== "" &&
              res.data[0].details[3].sign !== "" &&
              res.data[0].details[4].sign !== "" &&
              res.data[0].details[0].date !== "" &&
              res.data[0].details[1].date !== "" &&
              res.data[0].details[2].date !== "" &&
              res.data[0].details[3].date !== "" &&
              res.data[0].details[4].date !== ""
            ) {
              setDisable(true);
            } else {
              setDisable(false);
            }
          })
          .catch((err) => {
            console.log("Err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

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
              display: !props.loggedInQa || qaApproved ? "none" : "block",
            }}
            shape="round"
            onClick={saveQaRelease}
          >
            Save
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: !props.loggedInQa || qaApproved ? "none" : "block",
            }}
            shape="round"
            onClick={w}
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
                onChange={(e) =>
                  updateQaRelease({
                    observation1: e.target.value,
                  })
                }
                value={QaRelease.observation1}
                disabled={!props.loggedInQa || qaApproved}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign1 || usernameQA}
                onChange={onChange1}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
              />
              <Input
                type="datetime-local"
                value={QaRelease.date1 || currentDateTimeQA}
                onChange={(e) => updateQaRelease({ date1: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
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
                onChange={(e) =>
                  updateQaRelease({
                    observation2: e.target.value,
                  })
                }
                value={QaRelease.observation2}
                disabled={!props.loggedInQa || qaApproved}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign2 || usernameQA}
                onChange={onChange2}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
              />
              <Input
                type="datetime-local"
                value={QaRelease.date2 || currentDateTimeQA}
                onChange={(e) => updateQaRelease({ date2: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
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
                onChange={(e) =>
                  updateQaRelease({
                    observation3: e.target.value,
                  })
                }
                value={QaRelease.observation3}
                disabled={!props.loggedInQa || qaApproved}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign3 || usernameQA}
                onChange={onChange3}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
              />
              <Input
                type="datetime-local"
                value={QaRelease.date3 || currentDateTimeQA}
                onChange={(e) => updateQaRelease({ date3: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
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
                onChange={(e) =>
                  updateQaRelease({
                    observation4: e.target.value,
                  })
                }
                value={QaRelease.observation4}
                disabled={!props.loggedInQa || qaApproved}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign4 || usernameQA}
                onChange={onChange4}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
              />
              <Input
                type="datetime-local"
                value={QaRelease.date4 || currentDateTimeQA}
                onChange={(e) => updateQaRelease({ date4: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
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
                onChange={(e) =>
                  updateQaRelease({
                    observation5: e.target.value,
                  })
                }
                value={QaRelease.observation5}
                disabled={!props.loggedInQa || qaApproved}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign5 || usernameQA}
                onChange={onChange5}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
              />
              <Input
                type="datetime-local"
                value={QaRelease.date5 || currentDateTimeQA}
                onChange={(e) => updateQaRelease({ date5: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={!props.loggedInQa || qaApproved}
              />
            </td>
          </tr>
        </table>
      </>
      {contextHolder}
    </div>
  );
};

export default Qa_Release;
