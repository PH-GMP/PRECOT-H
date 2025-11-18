

import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Input, message, Spin, Select, Empty, Checkbox } from "antd";
import axios from "axios";
import API from "../../baseUrl.json";


const Process_Delay = (props) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [signatures, setSignatures] = useState({});
  const [dates, setDates] = useState({});
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  console.log("2345", data1);


  useEffect(() => {
    if (props.batchNo) {
      clearFields();
      fetchProcessDelayData(props.batchNo);
    }
  }, [props.batchNo]);

  const clearFields = () => {
    setData([]);
    setFromDate(null);
    setToDate(null);
    setSelectedMachine([]);
    setSignatures({});
    setDates({});
    setSelectedRows(new Set());
  };

  useEffect(() => {
    axios
      .get(`${API.prodUrl}/Precot/api/padpunching/MachineLov`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.MCN,
          label: option.MCN,
        }));
        console.log("User Lov", a);
      })
      .catch((err) => {
        console.log("ERRor", err);
      });
  }, []);

  const fetchProcessDelayData = (batchNo) => {
    setLoading(true);
    axios
      .get(
        `${API.prodUrl}/Precot/api/punching/bmr/getStoppagesBybatch?batchNo=${props.batchNo}`,
        {
          // params: { batch_no: batchNo },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setData1(response.data[0]);
        if (response.data && response.data.length > 0) {
          const processDelayData = response.data[0];
          if (processDelayData.details && processDelayData?.details.length > 0) {
            setData(processDelayData.details);
            // setFieldsDisabled(true);
            if (processDelayData.status === "SUPERVISOR_APPROVED") {
              setFieldsDisabled(true);
            } else if (processDelayData.status === "SAVED") {
              setFieldsDisabled(false);
            }
          } else {
            fetchStoppageData();
            setFieldsDisabled(false);
          }
        } else {
          clearFields();
          fetchStoppageData();
          setFieldsDisabled(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching process delay data:", err);
        message.error("Error fetching process delay data");
      });
  };

  const fetchStoppageData = () => {
    if (fromDate && toDate && selectedMachine) {
      setLoading(true);

      const machineList = selectedMachine.join(",");


      axios
        .get(`${API.prodUrl}/Precot/api/punching/bmr/stoppageReportsMultiple`, {
          params: {
            fromdate: moment(fromDate).format("YYYY-MM-DD"),
            todate: moment(toDate).format("YYYY-MM-DD"),
            machine: machineList,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setLoading(false);
          setData(response.data);
        })
        .catch((err) => {
          console.log("Error fetching stoppage data:", err);
          setLoading(false);
          message.error("Error fetching stoppage data");
        });
    } else {
      // message.warning("Please select both dates and machine.");
    }
  };

  const handleSave = () => {
    if (selectedRows.size > 0 && props.batchNo) {
      const recordsToSubmit = Array.from(selectedRows).map((rowIndex) => {
        const selectedRecord = data[rowIndex];
        return {
          id: selectedRecord.id,
          date:
            moment(selectedRecord.packdate).format("YYYY-MM-DD") ||
            data1?.details[0]?.date,
          fromTime: selectedRecord.fromTime || data1?.details[0]?.fromTime,
          toTime: selectedRecord.toTime || data1?.details[0]?.toTime,
          totalTime:
            (parseFloat(selectedRecord.totalTime) / 60).toFixed(1) ||
            (parseFloat(data1?.details[0]?.totalTime) / 60).toFixed(1),
          remarks: selectedRecord.remarks || data1?.details.remarks,
          supervisorName: signatures[rowIndex] || data1?.details.supervisorName,
          supervisorDate:
            moment(dates[rowIndex]).format("YYYY-MM-DD") ||
            data1?.details.supervisorDate,
          // supervisorName: signatures[rowIndex] || "",
          // supervisorDate: dates[rowIndex] || "",
        };
      });

      const payload = {
        stoppageId: data1?.stoppageId,
        batchNo: props.batchNo,
        orderNo: props.orderNo,
        department: "Punching Department",
        fromdate: fromDate || data1?.fromdate,
        todate: toDate || data1?.todate,
        // machineName: selectedMachine,
        details: recordsToSubmit,
      };

      axios
        .post(`${API.prodUrl}/Precot/api/punching/bmr/saveStoppage`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          message.success("Process Delay Saved successfully!");
          setSelectedRows(new Set());
          setSignatures({});
          setDates({});
          axios
            .get(
              `${API.prodUrl}/Precot/api/punching/bmr/getStoppagesBybatch?batchNo=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              setData1(response.data[0]);
              setLoading(false);
              if (response.data && response.data.length > 0) {
                const processDelayData = response.data[0];
                if (
                  processDelayData.details &&
                  processDelayData?.details.length > 0
                ) {
                  setData(processDelayData.details);
                  // setFieldsDisabled(true);
                  if (processDelayData.status === "SUPERVISOR_APPROVED") {
                    setFieldsDisabled(true);
                  } else if (processDelayData.status === "SAVED") {
                    setFieldsDisabled(false);
                  }
                } else {
                  fetchStoppageData();
                  setFieldsDisabled(false);
                }
              } else {
                clearFields();
                fetchStoppageData();
                setFieldsDisabled(false);
              }
            })
            .catch((err) => {
              setLoading(false);
              console.error("Error fetching process delay data:", err);
              message.error("Error fetching process delay data");
            });
        })
        .catch((error) => {
          console.error("Error submitting data", error);
          message.error(error.response.data.message);
        });
    } else {
      message.warning(
        "Please select at least one row and make sure batch number is valid."
      );
    }
  };

  const handleSubmit = () => {
    if (selectedRows.size > 0 && props.batchNo) {
      const recordsToSubmit = Array.from(selectedRows).map((rowIndex) => {
        const selectedRecord = data[rowIndex];
        return {
          id: selectedRecord.id,
          date:
            moment(selectedRecord.packdate).format("YYYY-MM-DD") ||
            data1?.details[0]?.date,
          fromTime: selectedRecord.fromTime || data1?.details[0]?.fromTime,
          toTime: selectedRecord.toTime || data1?.details[0]?.toTime,
          totalTime: selectedRecord.totalTime || data1?.details[0]?.totalTime,
          remarks: selectedRecord.remarks || data1?.details[0]?.remarks,
          supervisorName:
            signatures[rowIndex] || data1?.details[0]?.supervisorName,
          supervisorDate:
            moment(dates[rowIndex]).format("YYYY-MM-DD") ||
            data1?.details[0]?.supervisorDate,
        };
      });

      const payload = {
        stoppageId: data1?.stoppageId,
        batchNo: props.batchNo,
        orderNo: props.orderNo || data1?.orderNo,
        department: "Punching Department",
        fromdate: fromDate || data1?.fromdate,
        todate: toDate || data1?.todate,
        // machineName: selectedMachine || data1?.machineName,
        details: recordsToSubmit,
      };

      axios
        .post(`${API.prodUrl}/Precot/api/punching/bmr/submitStoppage`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          message.success("Process Delay Submitted successfully!");
          setSelectedRows(new Set());
          setSignatures({});
          setDates({});
          axios
            .get(
              `${API.prodUrl}/Precot/api/punching/bmr/getStoppagesBybatch?batchNo=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              setData1(response.data[0]);
              setLoading(false);
              if (response.data && response.data.length > 0) {
                const processDelayData = response.data[0];
                if (
                  processDelayData.details &&
                  processDelayData?.details.length > 0
                ) {
                  setData(processDelayData.details);
                  // setFieldsDisabled(true);
                  if (processDelayData.status === "SUPERVISOR_APPROVED") {
                    setFieldsDisabled(true);
                  } else if (processDelayData.status === "SAVED") {
                    setFieldsDisabled(false);
                  }
                } else {
                  fetchStoppageData();
                  setFieldsDisabled(false);
                }
              } else {
                clearFields();
                fetchStoppageData();
                setFieldsDisabled(false);
              }
            })
            .catch((err) => {
              setLoading(false);
              console.error("Error fetching process delay data:", err);
              message.error("Error fetching process delay data");
            });
        })
        .catch((error) => {
          console.error("Error submitting data", error);
          message.error(error.response.data.message);
        });
    } else {
      message.warning(
        "Please select at least one row and make sure batch number is valid."
      );
    }
  };

  const isSubmitDisabled = selectedRows.size === 0 || !props.batchNo;

  const handleSignatureChange = (value) => {
    setSignatures((prevSignatures) => {
      const newSignatures = { ...prevSignatures };
      selectedRows.forEach((index) => {
        newSignatures[index] = value;
      });
      return newSignatures;
    });
  };

  const handleDateChange = (value) => {
    setDates((prevDates) => {
      const newDates = { ...prevDates };
      selectedRows.forEach((index) => {
        newDates[index] = value;
      });
      return newDates;
    });
  };

  const handleRowSelection = (rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(rowIndex)) {
        newSelectedRows.delete(rowIndex);
      } else {
        newSelectedRows.add(rowIndex);
      }
      return newSelectedRows;
    });
  };

  return (
    <>
      <Spin spinning={loading}>
        <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
          <Input
            type="date"
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="Select From Date"
            style={{ width: "150px" }}
            value={fromDate || ""}
            disabled={fieldsDisabled}
          />
          <Input
            type="date"
            onChange={(e) => setToDate(e.target.value)}
            placeholder="Select To Date"
            style={{ width: "150px" }}

            value={toDate || ""}
            disabled={fieldsDisabled}
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: "300px" }}
            placeholder="Select Machines"
            value={selectedMachine}
            onChange={(value) => {
              console.log("Selected Machines: ", value);
              setSelectedMachine(value);
            }}
            options={props.machineLov}
            disabled={fieldsDisabled}
          />
          <Button
            type="primary"
            onClick={fetchStoppageData}
            disabled={fieldsDisabled}
          >
            Fetch Data
          </Button>
        </div>
        <Button
          type="primary"
          onClick={handleSave}
          disabled={isSubmitDisabled || fieldsDisabled}
          style={{
            marginTop: "0.4em",
            marginBottom: "0.4em",
            marginRight: "1em",
          }}
        >
          Save
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={isSubmitDisabled || fieldsDisabled}
          style={{ marginTop: "0em" }}
        >
          Submit
        </Button>

        {data.length === 0 ? (
          <Empty description="No data available" />
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th rowSpan={2}></th>
                <th rowSpan={2}>S.No</th>
                <th rowSpan={2}>Date</th>
                <th colSpan={3}>Process Delay / Down Time</th>
                <th rowSpan={2}>Remarks</th>
                <th rowSpan={2}>Sign & Date</th>
              </tr>
              <tr>
                <th>From Time</th>
                <th>To Time</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>
                    <Checkbox
                      checked={selectedRows.has(index)}
                      onChange={() => handleRowSelection(index)}
                      disabled={fieldsDisabled}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{record.date || record.packdate}</td>
                  <td>{record.from_hour || record.fromTime}</td>
                  <td>{record.to_hour || record.toTime}</td>
                  <td>{record.total_hour || record.totalTime}</td>
                  <td>{record.remarks}</td>
                  <td>
                    <Select
                      options={props.supLov}
                      style={{ width: "50%" }}
                      value={signatures[index] || record.supervisorName || ""}
                      onChange={(value) => {
                        setSignatures((prevSignatures) => ({
                          ...prevSignatures,
                          [index]: value,
                        }));
                        handleSignatureChange(value);
                      }}
                      disabled={fieldsDisabled}
                    />
                    <Input
                      type="date"
                      style={{ width: "50%" }}
                      value={dates[index] || record.date || ""}
                      disabled={fieldsDisabled}
                      onChange={(e) => {
                        setDates((prevDates) => ({
                          ...prevDates,
                          [index]: e.target.value,
                        }));
                        handleDateChange(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Spin>
    </>
  );
};

export default Process_Delay;
