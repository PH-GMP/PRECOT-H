import { Button, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrDocumentStore } from "react-icons/gr";
import API from "../../baseUrl.json";

const Process_Deviation = (props) => {
  const [data, setData] = useState("");
  const [data1, setDat1] = useState("");
  const [devData, setDevData] = useState({
    batchNo: props.batchNo,
    orderNo: "",
    form_no: "",
    details: [
      {
        deviationLogNo: "",
        qaRemarks: "",
        supervisorName: "",
        supervisorDate: "",
        qaName: "",
        qaDate: "",
      },
      {
        deviationLogNo: "",
        qaRemarks: "",
        supervisorName: "",
        supervisorDate: "",
        qaName: "",
        qaDate: "",
      },
      {
        deviationLogNo: "",
        qaRemarks: "",
        supervisorName: "",
        supervisorDate: "",
        qaName: "",
        qaDate: "",
      },
      {
        deviationLogNo: "",
        qaRemarks: "",
        supervisorName: "",
        supervisorDate: "",
        qaName: "",
        qaDate: "",
      },
    ],
  });
  const token = localStorage.getItem("token");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [fieldStatus, setFieldStatus] = useState(false);
  const role = localStorage.getItem("role");
  console.log("rolw", role);
  useEffect(() => {
    setFieldStatus(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/buds/bmr/getDeviationList?batchNumber=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          setData(response.data[0].deviationId);
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
            batchNo: props.batchNo,
            orderNo: "",
            form_no: "",
            details: [
              {
                deviationLogNo: "",
                qaRemarks: "",
                supervisorName: "",
                supervisorDate: "",
                qaName: "",
                qaDate: "",
              },
              {
                deviationLogNo: "",
                qaRemarks: "",
                supervisorName: "",
                supervisorDate: "",
                qaName: "",
                qaDate: "",
              },
              {
                deviationLogNo: "",
                qaRemarks: "",
                supervisorName: "",
                supervisorDate: "",
                qaName: "",
                qaDate: "",
              },
              {
                deviationLogNo: "",
                qaRemarks: "",
                supervisorName: "",
                supervisorDate: "",
                qaName: "",
                qaDate: "",
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
        deviationId: data,
        batchNo: props.batchNo,
        orderNo: props.orderNo,
        form_no: "",
        details: devData.details.map((detail) => {
          const details = {
            id: detail.id,
            deviationLogNo: detail.deviationLogNo,
            qaRemarks: detail.qaRemarks,
            supervisorName: detail.supervisorName,
            supervisorDate: detail.supervisorDate,
            qaName: detail.qaName,
            qaDate: detail.qaDate,
          };
          return details;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    } else if (props.loggedInQa) {
      payload = {
        deviationId: data,
        batchNo: props.batchNo,
        orderNo: props.orderNo,
        form_no: "",
        details: devData.details.map((detail) => {
          const details = {
            id: detail.id,
            deviationLogNo: detail.deviationLogNo,
            qaRemarks: detail.qaRemarks,
            supervisorName: detail.supervisorName,
            supervisorDate: detail.supervisorDate,
            qaName: detail.qaName,
            qaDate: detail.qaDate,
          };
          return details;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    }
    setButtonLoader(true);
    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/buds/bmr/saveProcessDeviation`,
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
              `${ API.prodUrl}/Precot/api/buds/bmr/getDeviationList?batchNumber=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              const data = response.data[0];
              setData(response.data[0].deviationId);
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
                batchNo: props.batchNo,
                orderNo: "",
                form_no: "",
                details: [
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
                  },
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
                  },
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
                  },
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
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

  useEffect(() => {
    console.log("edfv", devData.details[0]?.supervisorDate);
  });

  function formatDateForInput(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  }

  const handleSubmit = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    let payload;
    if (props.loggedInSupervisor) {
      payload = {
        deviationId: data,
        batchNo: props.batchNo,
        orderNo: props.orderNo,
        form_no: "",
        details: devData.details.map((detail) => {
          const details = {
            id: detail.id,
            deviationLogNo: detail.deviationLogNo,
            qaRemarks: detail.qaRemarks,
            supervisorName: detail.supervisorName,
            supervisorDate: detail.supervisorDate,
            qaName: detail.qaName,
            qaDate: detail.qaDate,
          };
          return details;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    } else if (props.loggedInQa) {
      payload = {
        deviationId: data,
        batchNo: props.batchNo,
        orderNo: props.orderNo,
        form_no: "",
        details: devData.details.map((detail) => {
          const details = {
            id: detail.id,
            deviationLogNo: detail.deviationLogNo,
            qaRemarks: detail.qaRemarks,
            supervisorName: detail.supervisorName,
            supervisorDate: detail.supervisorDate,
            qaName: detail.qaName,
            qaDate: detail.qaDate,
          };
          return details;
        }),
      };
      if (devData.dev_id) {
        payload.dev_id = devData.dev_id;
      }
    }
    setButtonLoader(true);
    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/buds/bmr/submitProcessDeviation`,
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
              `${ API.prodUrl}/Precot/api/buds/bmr/getDeviationList?batchNumber=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              const data = response.data[0];
              setData(response.data[0].deviationId);
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
                batchNo: props.batchNo,
                orderNo: "",
                form_no: "",
                details: [
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
                  },
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
                  },
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
                  },
                  {
                    deviationLogNo: "",
                    qaRemarks: "",
                    supervisorName: "",
                    supervisorDate: "",
                    qaName: "",
                    qaDate: "",
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

  const handleInput = (e, index, field, type) => {
    let value;
    if (type === "input") {
      value = e.target.value;
    } else if (type === "select") {
      value = e;
    }

    const updatedDetails = [...devData.details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };

    setDevData({
      ...devData,
      details: updatedDetails,
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
              value={devData.details[0]?.deviationLogNo}
              onChange={(e) => handleInput(e, 0, "deviationLogNo", "input")}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              options={props.supLov}
              value={devData.details[0]?.supervisorName}
              placeholder="Choose Signature"
              onChange={(e) => handleInput(e, 0, "supervisorName", "select")}
              disabled={!props.loggedInSupervisor || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.details[0]?.supervisorDate
                  ? formatDateForInput(devData.details[0].supervisorDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 0, "supervisorDate", "input")}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={devData.details[0]?.qaRemarks}
              onChange={(e) => handleInput(e, 0, "qaRemarks", "input")}
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
              value={devData.details[0]?.qaName}
              onChange={(e) => handleInput(e, 0, "qaName", "select")}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.details[0]?.qaDate
                  ? formatDateForInput(devData.details[0].qaDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 0, "qaDate", "input")}
              readOnly={!props.loggedInQa || fieldStatus}
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
              value={devData.details[1]?.deviationLogNo}
              onChange={(e) => handleInput(e, 1, "deviationLogNo", "input")}
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
              value={devData.details[1]?.supervisorName}
              onChange={(e) => handleInput(e, 1, "supervisorName", "select")}
              disabled={!props.loggedInSupervisor || fieldStatus}
              options={props.supLov}
            />
            <input
              type="datetime-local"
              value={
                devData.details[1]?.supervisorDate
                  ? formatDateForInput(devData.details[1].supervisorDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 1, "supervisorDate", "input")}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={devData.details[1]?.qaRemarks}
              onChange={(e) => handleInput(e, 1, "qaRemarks", "input")}
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
              value={devData.details[1]?.qaName}
              onChange={(e) => handleInput(e, 1, "qaName", "select")}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.details[1]?.qaDate
                  ? formatDateForInput(devData.details[1].qaDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 1, "qaDate", "input")}
              readOnly={!props.loggedInQa || fieldStatus}
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
              value={devData.details[2]?.deviationLogNo}
              onChange={(e) => handleInput(e, 2, "deviationLogNo", "input")}
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
              value={devData.details[2]?.supervisorName}
              onChange={(e) => handleInput(e, 2, "supervisorName", "select")}
              disabled={!props.loggedInSupervisor || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.details[2]?.supervisorDate
                  ? formatDateForInput(devData.details[2].supervisorDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 2, "supervisorDate", "input")}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={devData.details[2]?.qaRemarks}
              onChange={(e) => handleInput(e, 2, "qaRemarks", "input")}
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
              value={devData.details[2]?.qaName}
              onChange={(e) => handleInput(e, 2, "qaName", "select")}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.details[2]?.qaDate
                  ? formatDateForInput(devData.details[2].qaDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 2, "qaDate", "input")}
              readOnly={!props.loggedInQa || fieldStatus}
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
              value={devData.details[3]?.deviationLogNo}
              onChange={(e) => handleInput(e, 3, "deviationLogNo", "input")}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <Select
              style={{
                width: "12em",
              }}
              value={devData.details[3]?.supervisorName}
              placeholder="Choose Signature"
              onChange={(e) => handleInput(e, 3, "supervisorName", "select")}
              options={props.supLov}
              disabled={!props.loggedInSupervisor || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.details[3]?.supervisorDate
                  ? formatDateForInput(devData.details[3].supervisorDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 3, "supervisorDate", "input")}
              readOnly={!props.loggedInSupervisor || fieldStatus}
            />
          </td>
          <td align="center">
            <input
              type="text"
              className="inp-new"
              onKeyDown={(e) => handleKeyDown_text(e)}
              value={devData.details[3]?.qaRemarks}
              onChange={(e) => handleInput(e, 3, "qaRemarks", "input")}
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
              value={devData.details[3]?.qaName}
              onChange={(e) => handleInput(e, 3, "qaName", "select")}
              disabled={!props.loggedInQa || fieldStatus}
            />
            <input
              type="datetime-local"
              value={
                devData.details[3]?.qaDate
                  ? formatDateForInput(devData.details[3].qaDate)
                  : ""
              }
              onChange={(e) => handleInput(e, 3, "qaDate", "input")}
              readOnly={!props.loggedInQa || fieldStatus}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Process_Deviation;
