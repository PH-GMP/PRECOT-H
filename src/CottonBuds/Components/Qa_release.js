import { Button, Input, message, Radio, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
    observation6: "",
    sign1: "",
    sign2: "",
    sign3: "",
    sign4: "",
    sign5: "",
    sign6: "",
    date1: "",
    date2: "",
    date3: "",
    date4: "",
    date5: "",
    date6: "",
  });
  const [ids, setIds] = useState({
    masterId: "",
    id1: "",
    id2: "",
    id3: "",
    id4: "",
    id5: "",
    id6: "",
    qaId1: "",
    qaId2: "",
    qaId3: "",
    qaId4: "",
    qaId5: "",
    qaId6: "",
  });

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
  const onChange6 = (values) => {
    updateQaRelease({ sign6: values });
  };

  function formatDateForInput(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  }

  useEffect(() => {
    getAPI();
  }, [props.batchNo]);

  const getAPI = () => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getQualityRelease?batchNumber=${props.batchNo}`,
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
        } else {
          setNewSave(false);
        }
        updateId({
          masterId: res.data[0].qualityId,
          id1: res.data[0].details[0].id,
          id2: res.data[0].details[1].id,
          id3: res.data[0].details[2].id,
          id4: res.data[0].details[3].id,
          id5: res.data[0].details[4].id,
          qaId1: res.data[0].details[0].qaId,
          qaId2: res.data[0].details[1].qaId,
          qaId3: res.data[0].details[2].qaId,
          qaId4: res.data[0].details[3].qaId,
          qaId5: res.data[0].details[4].qaId,
          qaId6: res.data[0].details[5].qaId,
        });
        updateQaRelease({
          observation1: res.data[0].details[0].qaStatus,
          observation2: res.data[0].details[1].qaStatus,
          observation3: res.data[0].details[2].qaStatus,
          observation4: res.data[0].details[3].qaStatus,
          observation5: res.data[0].details[4].qaStatus,
          observation6: res.data[0].details[5].qaStatus,
          sign1: res.data[0].details[0].qaName,
          sign2: res.data[0].details[1].qaName,
          sign3: res.data[0].details[2].qaName,
          sign4: res.data[0].details[3].qaName,
          sign5: res.data[0].details[4].qaName,
          sign6: res.data[0].details[5].qaName,
          date1: res.data[0].details[0].qaDate,
          date2: res.data[0].details[1].qaDate,
          date3: res.data[0].details[2].qaDate,
          date4: res.data[0].details[3].qaDate,
          date5: res.data[0].details[4].qaDate,
          date6: res.data[0].details[5].qaDate,
        });
        if (res.data[0].status == "QA_APPROVED") {
          setDisable(true);
        } else {
          setDisable(false);
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }

  const submitQaRelease = () => {
    const payload = {
      orderNo: props.orderNo,
      batchNo: props.batchNo,
      department: "Cotton_Buds",
      status: "Approved",
      qualityId: ids.masterId,
      details: [
        {
          description: "Description1",
          qaName: QaRelease.sign1,
          qaDate: QaRelease.date1,
          qaStatus: QaRelease.observation1,
          id: ids.id1,
          qaId: ids.qaId1
        },
        {
          description: "Description2",
          qaName: QaRelease.sign2,
          qaDate: QaRelease.date2,
          qaStatus: QaRelease.observation2,
          id: ids.id2,
          qaId: ids.qaId2
        },
        {
          // "id": 2,
          description: "Description3",
          qaName: QaRelease.sign3,
          qaDate: QaRelease.date3,
          qaStatus: QaRelease.observation3,
          id: ids.id3,
          qaId: ids.qaId3
        },
        {
          // "id": 2,
          description: "Description4",
          qaName: QaRelease.sign4,
          qaDate: QaRelease.date4,
          qaStatus: QaRelease.observation4,
          id: ids.id4,
          qaId: ids.qaId4
        },
        {
          // "id": 2,
          description: "Description5",
          qaName: QaRelease.sign5,
          qaDate: QaRelease.date5,
          qaStatus: QaRelease.observation5,
          id: ids.id5,
          qaId: ids.qaId5
        },
        {
          // "id": 2,
          description: "Description6",
          qaName: QaRelease.sign6,
          qaDate: QaRelease.date6,
          qaStatus: QaRelease.observation6,
          id: ids.id6,
          qaId: ids.qaId6
        },
      ],
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/buds/bmr/submitQualityRelease`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        message.success("Qa Release Successfully Submitted");
        getAPI();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const saveQaRelease = () => {
    const payload = {
      orderNo: props.orderNo,
      batchNo: props.batchNo,
      department: "Cotton_Buds",
      status: "Approved",
      qualityId: ids.masterId,
      details: [
        {
          description: "Description1",
          qaName: QaRelease.sign1,
          qaDate: QaRelease.date1,
          qaStatus: QaRelease.observation1,
          id: ids.id1,
          qaId: ids.qaId1
        },
        {
          description: "Description2",
          qaName: QaRelease.sign2,
          qaDate: QaRelease.date2,
          qaStatus: QaRelease.observation2,
          id: ids.id2,
          qaId: ids.qaId2
        },
        {
          // "id": 2,
          description: "Description3",
          qaName: QaRelease.sign3,
          qaDate: QaRelease.date3,
          qaStatus: QaRelease.observation3,
          id: ids.id3,
          qaId: ids.qaId3
        },
        {
          // "id": 2,
          description: "Description4",
          qaName: QaRelease.sign4,
          qaDate: QaRelease.date4,
          qaStatus: QaRelease.observation4,
          id: ids.id4,
          qaId: ids.qaId4
        },
        {
          // "id": 2,
          description: "Description5",
          qaName: QaRelease.sign5,
          qaDate: QaRelease.date5,
          qaStatus: QaRelease.observation5,
          id: ids.id5,
          qaId: ids.qaId5
        },
        {
          // "id": 2,
          description: "Description6",
          qaName: QaRelease.sign6,
          qaDate: QaRelease.date6,
          qaStatus: QaRelease.observation6,
          id: ids.id6,
          qaId: ids.qaId6
        },
      ],
    };
    axios
      .post(`${API.prodUrl}/Precot/api/buds/bmr/saveQualityRelease`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        message.success("Qa Release Successfully Saved");
        getAPI();
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
              display: disable || !props.loggedInQa ? "none" : "block",
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
              display: disable || !props.loggedInQa ? "none" : "block",
            }}
            shape="round"
            onClick={submitQaRelease}
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
                disabled={disable || !props.loggedInQa}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign1}
                onChange={onChange1}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
              <Input
                type="datetime-local"
                // value={QaRelease.date1}
                value={
                  QaRelease.date1 ? formatDateForInput(QaRelease.date1) : ""
                }
                onChange={(e) => updateQaRelease({ date1: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
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
                disabled={disable || !props.loggedInQa}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign2}
                onChange={onChange2}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
              <Input
                type="datetime-local"
                // value={QaRelease.date2}
                value={
                  QaRelease.date2 ? formatDateForInput(QaRelease.date2) : ""
                }
                onChange={(e) => updateQaRelease({ date2: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
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
                disabled={disable || !props.loggedInQa}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign3}
                onChange={onChange3}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
              <Input
                type="datetime-local"
                // value={QaRelease.date3}
                value={
                  QaRelease.date3 ? formatDateForInput(QaRelease.date3) : ""
                }
                onChange={(e) => updateQaRelease({ date3: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
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
                disabled={disable || !props.loggedInQa}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign4}
                onChange={onChange4}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
              <Input
                type="datetime-local"
                // value={QaRelease.date4}
                value={
                  QaRelease.date4 ? formatDateForInput(QaRelease.date4) : ""
                }
                onChange={(e) => updateQaRelease({ date4: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
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
            Batch Release Checklist (QC & QA Report)
            </td>
            <td>
              <Radio.Group
                onChange={(e) =>
                  updateQaRelease({
                    observation5: e.target.value,
                  })
                }
                value={QaRelease.observation5}
                disabled={disable || !props.loggedInQa}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign5}
                onChange={onChange5}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
              <Input
                type="datetime-local"
                // value={QaRelease.date5}
                value={
                  QaRelease.date5 ? formatDateForInput(QaRelease.date5) : ""
                }
                onChange={(e) => updateQaRelease({ date5: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
            </td>
          </tr>
           {/* six */}
           <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              6
            </td>
            <td style={{ padding: "1em" }}>
            The Batch is released to next step.
            </td>
            <td>
              <Radio.Group
                onChange={(e) =>
                  updateQaRelease({
                    observation6: e.target.value,
                  })
                }
                value={QaRelease.observation6}
                disabled={disable || !props.loggedInQa}
              >
                <Radio value="REVIEWED">Reviewed</Radio>
                <Radio value="NOT REVIEWED">Not Reviewed</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
            <td>
              <Select
                value={QaRelease.sign6}
                onChange={onChange6}
                options={props.qaLov}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
              <Input
                type="datetime-local"
                // value={QaRelease.date5}
                value={
                  QaRelease.date6 ? formatDateForInput(QaRelease.date6) : ""
                }
                onChange={(e) => updateQaRelease({ date6: e.target.value })}
                style={{
                  width: "50%",
                }}
                disabled={disable || !props.loggedInQa}
              />
            </td>
          </tr>
          {/* ended */}
        </table>
      </>
      {contextHolder}
    </div>
  );
};

export default Qa_Release;
