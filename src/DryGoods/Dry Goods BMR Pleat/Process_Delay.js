import { Button, Checkbox, Empty, Input, message, Select, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Process_Delay = (props) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [signatures, setSignatures] = useState({});
  const [dates, setDates] = useState({});
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const today = getCurrentDate();  console.log("2345", data1);

  const machineLov = [
    { value: "PL1", label: "PL1" },
    { value: "PL2", label: "PL2" },
  ];

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
    setSelectedMachine(null);
    setSignatures({});
    setDates({});
    setSelectedRows(new Set());
  };

  const fetchProcessDelayData = (batchNo) => {
    setLoading(true);
    axios
      .get(`${ API.prodUrl}/Precot/api/cottonPleat/10.GetProcessDelayEqupment`, {
        params: { batch_no: batchNo },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("34", response.data[0]);
        setData1(response.data[0]);
        if (response.data && response.data.length > 0) {
          const processDelayData = response.data[0];
          if (
            processDelayData.detailsDly &&
            processDelayData.detailsDly.length > 0
          ) {
            setData(processDelayData.detailsDly);
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
      axios
        .get(`${ API.prodUrl}/Precot/api/cottonPleat/stoppageReports`, {
          params: {
            fromdate: moment(fromDate).format("YYYY-MM-DD"),
            todate: moment(toDate).format("YYYY-MM-DD"),
            machine: selectedMachine,
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
            data1.detailsDly[0]?.date,
          from_hour:
            selectedRecord.fromTime || data1.detailsDly?.[0]?.from_hour,
          to_hour: selectedRecord.toTime || data1.detailsDly[0]?.to_hour,
          total_hour:
            selectedRecord.totalTime || data1.detailsDly[0]?.total_hour,
          remarks: selectedRecord.remarks || data1.detailsDly[0]?.remarks,
          sign: signatures[rowIndex] || data1.detailsDly[0]?.sign,
          // sign_date:
          //   moment(dates[rowIndex]).format("YYYY-MM-DD") ||
          //   data1.detailsDly[0]?.sign_date,
        };
      });

      const payload = {
        process_id: data1?.process_id,
        batch_no: props.batchNo,
        order_no: props.orderNo,
        detailsDly: recordsToSubmit,
      };

      axios
        .post(
          `${ API.prodUrl}/Precot/api/cottonPleat/10.SaveProcessDelayEqupment`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          message.success("Submitted successfully!");
          setSelectedRows(new Set());
          setSignatures({});
          setDates({});
          axios
            .get(
              `${ API.prodUrl}/Precot/api/cottonPleat/10.GetProcessDelayEqupment`,
              {
                params: { batch_no: props.batchNo },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              setLoading(false);
              if (response.data && response.data.length > 0) {
                const processDelayData = response.data[0];
                if (
                  processDelayData.detailsDly &&
                  processDelayData.detailsDly.length > 0
                ) {
                  setData(processDelayData.detailsDly);
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
            data1.detailsDly[0]?.date,
          from_hour: selectedRecord.fromTime || data1.detailsDly[0]?.from_hour,
          to_hour: selectedRecord.toTime || data1.detailsDly[0]?.to_hour,
          total_hour:
            selectedRecord.totalTime || data1.detailsDly[0]?.total_hour,
          remarks: selectedRecord.remarks || data1.detailsDly[0]?.remarks,
          sign: signatures[rowIndex] || data1.detailsDly[0]?.sign,
    
        };
      });

      const payload = {
        process_id: data1?.process_id,
        batch_no: props.batchNo,
        order_no: props.orderNo,
        detailsDly: recordsToSubmit,
      };

      axios
        .post(
          `${ API.prodUrl}/Precot/api/cottonPleat/10.SubmitProcessDelayEqupment`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          message.success("Submitted successfully!");
          setSelectedRows(new Set());
          setSignatures({});
          setDates({});
          axios
            .get(
              `${ API.prodUrl}/Precot/api/cottonPleat/10.GetProcessDelayEqupment`,
              {
                params: { batch_no: props.batchNo },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              setLoading(false);
              if (response.data && response.data.length > 0) {
                const processDelayData = response.data[0];
                if (
                  processDelayData.detailsDly &&
                  processDelayData.detailsDly.length > 0
                ) {
                  setData(processDelayData.detailsDly);
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
            value={fromDate || ""}
            disabled={fieldsDisabled}
          />
          <Input
            type="date"
            onChange={(e) => setToDate(e.target.value)}
            placeholder="Select To Date"
            value={toDate || ""}
            disabled={fieldsDisabled}
          />
          <Select
            options={machineLov}
            placeholder="Select Machine"
            onChange={(value) => setSelectedMachine(value)}
            value={selectedMachine || ""}
            style={{ width: "200px" }}
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
                      style={{ width: "100%" }}
                      value={signatures[index] || record.sign || ""}
                      onChange={(value) => {
                        setSignatures((prevSignatures) => ({
                          ...prevSignatures,
                          [index]: value,
                        }));
                        handleSignatureChange(value);
                      }}
                      disabled={fieldsDisabled}
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
