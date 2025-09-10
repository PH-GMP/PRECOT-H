import { Button, Checkbox, Empty, Input, message, Select } from "antd";
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
  console.log("2345", data1);

  useEffect(() => {
    setFromDate(localStorage.getItem("prod_start_date"));
    setToDate(localStorage.getItem("prod_end_date"));
    if (props.batchNo) {
      // clearFields();
      fetchProcessDelayData();
    }
  }, [props.batchNo]);

  const clearFields = () => {
    setData([]);
    // setFromDate(null);
    // setToDate(null);
    setSelectedMachine(null);
    setSignatures({});
    setDates({});
    setSelectedRows(new Set());
  };


  const fetchProcessDelayData = () => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getStoppageByBatch?batchNumber=${props.batchNo}`,
        {
          // params: { batch_no: batchNo },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Response Data", response.data[0]);
        setData1(response.data[0]);
        if (response.data && response.data.length > 0) {
          const processDelayData = response.data[0];
          if (processDelayData.details && processDelayData.details.length > 0) {
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
      axios
        .get(`${API.prodUrl}/Precot/api/buds/bmr/getStoppageSAP`, {
          params: {
            fromDate: moment(fromDate).format("YYYY-MM-DD"),
            toDate: moment(toDate).format("YYYY-MM-DD"),
            shiftId: selectedMachine,
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
     }
  };

  const handleSave = () => {
    if (selectedRows.size > 0 && props.batchNo) {
      const recordsToSubmit = Array.from(selectedRows).map((rowIndex,i) => {
        const selectedRecord = data[rowIndex];
         return {
          id: selectedRecord.id || data1?.details[i].id,
          date: moment(selectedRecord.packDate).format("YYYY-MM-DD"),
          fromTime: selectedRecord.fromTime,
          toTime: selectedRecord.toTime,
          totalTime: selectedRecord.totalHours || data1?.details[i].totalHours,
          remarks: selectedRecord.reason || selectedRecord.remarks,
          supervisorName: signatures[rowIndex] || selectedRecord.supervisorName,
          supervisorDate: dates[rowIndex] || selectedRecord.supervisorDate || data1?.details[i].supervisorDate,
          supervisorStatus: "",
          supervisorId: "",
     
        };
      });
      console.log("Details", selectedRows);
      const payload = {
        stoppageId: data1?.stoppageId,
        batchNo: props.batchNo,
        orderNo: props.orderNo,
        department: "Buds Department",
        fromdate: fromDate || data1?.fromdate,
        todate: toDate || data1?.todate,
        machineName: selectedMachine,
        status: "Completed",
        supervisor_id: data1?.supervisor_id,
        details: recordsToSubmit,
      };
      console.log("Pde Save Payload", payload);
      axios
        .post(`${API.prodUrl}/Precot/api/buds/bmr/saveStoppage`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          message.success("Process Delay Saved successfully!");
          fetchProcessDelayData()
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
      const recordsToSubmit = Array.from(selectedRows).map((rowIndex,i) => {
        const selectedRecord = data[rowIndex];
        // console.log("GG",data1)
        return {
          id: selectedRecord.id || data1?.details[i].id,
          date: moment(selectedRecord.packDate).format("YYYY-MM-DD"),
          fromTime: selectedRecord.fromTime,
          toTime: selectedRecord.toTime,
          totalTime: selectedRecord.totalHours || data1?.details[i].totalHours,
          remarks: selectedRecord.reason || selectedRecord.remarks,
          supervisorName: signatures[rowIndex] || selectedRecord.supervisorName,
          supervisorDate: dates[rowIndex] || selectedRecord.supervisorDate || data1?.details[i].supervisorDate,
          supervisorStatus: "",
          supervisorId: "",
          // supervisorName: signatures[rowIndex] || "",
          // supervisorDate: dates[rowIndex] || "",
        };
      });
      console.log("Details", selectedRows);
      const payload = {
        stoppageId: data1?.stoppageId,
        batchNo: props.batchNo,
        orderNo: props.orderNo,
        department: "Buds Department",
        fromdate: fromDate || data1?.fromdate,
        todate: toDate || data1?.todate,
        machineName: selectedMachine,
        status: "Completed",
        supervisor_id: data1?.supervisor_id,
        details: recordsToSubmit,
      };
      console.log("Pde Save Payload", payload);
      axios
        .post(`${API.prodUrl}/Precot/api/buds/bmr/submitStoppage`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          message.success("Process Delay Submitted successfully!");
          fetchProcessDelayData()
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
      <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
        <Input
          type="text"
 
          placeholder="Select From Date"
          value={fromDate}
          disabled={true}
        />
        <Input
          type="text"
           placeholder="Select To Date"
          value={toDate}
          disabled={true}
        />
        <Select
          options={[
            {
              label: "I",
              value: "1",
            },
            {
              label: "II",
              value: "2",
            },
            {
              label: "III",
              value: "3",
            },
          ]}
          placeholder="Select Shift"
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
                <td>{record.date || record.packDate}</td>
                <td>{record.from_hour || record.fromTime}</td>
                <td>{record.to_hour || record.toTime}</td>
                <td>{record.totalHours || record.totalTime}</td>
                <td>{record.reason || record.remarks}</td>
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
                    value={dates[index] || record.supervisorDate || ""}
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
    </>
  );
};

export default Process_Delay;
