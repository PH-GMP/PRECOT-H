// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import { Button, Form, Input, message, Select, Spin } from "antd";
// import axios from "axios";
// import API from "../../baseUrl.json";

// const Process_Delay = (props) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [checkedItems, setCheckedItems] = useState({});
//   const [userLov, setUserLov] = useState({
//     prodlov: "",
//     qalov: "",
//   });
//   const [primaryKeys, setPrimaryKeys] = useState({
//     fromDate: "",
//     toDate: "",
//     Machine: "",
//   });
//   const [pdeSignatureNew, setPdeSignatureNew] = useState({});
//   const [pdeDateNew, setPdeDateNew] = useState({});
//   const [disable, setDisable] = useState(false);
//   const [hadData, setHadData] = useState(true);

//   const onchangePdeSign = (val, index) => {
//     setPdeSignatureNew((prev) => ({
//       ...prev,
//       [index]: val,
//     }));
//   };

//   const onchangePdeDate = (val, index) => {
//     setPdeDateNew((prev) => ({
//       ...prev,
//       [index]: val,
//     }));
//   };

//   const updateState = (updates) => {
//     setPrimaryKeys((prevState) => ({
//       ...prevState,
//       ...updates,
//     }));
//   };

//   const handleCheckboxChange = (e, index) => {
//     setCheckedItems((prevCheckedItems) => ({
//       ...prevCheckedItems,
//       [index]: e.target.checked,
//     }));
//   };

//   useEffect(() => {
//     axios
//       .get(`${ API.prodUrl}/Precot/api/padpunching/MachineLov`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         console.log("Res", res.data);
//         const a = res.data.map((option) => ({
//           value: option.MCN,
//           label: option.MCN,
//         }));
//         console.log("User Lov", a);
//       })
//       .catch((err) => {
//         console.log("ERRor", err);
//       });

//     //getStoppagesBybatch
//     axios
//       .get(
//         `${ API.prodUrl}/Precot/api/punching/bmr/getStoppagesBybatch?batchNo=${props.batchNo}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Res", res.data);
//         if (res.data.length > 0) {
//           setDisable(true);
//           setHadData(false);
//           setData(res.data[0].details);
//           res.data[0].details.map((x, i) => {
//             return () => {
//               onchangePdeDate(x.supervisorDate, i);
//               onchangePdeSign(x.supervisorName, i);
//             };
//           });
//         } else {
//           setDisable(false);
//           setHadData(true);
//         }
//       })
//       .catch((err) => {
//         console.log("ERRor", err);
//       });
//   }, []);

//   const fetchData = () => {
//     setLoading(true);
//     axios
//       .get(
//         `${ API.prodUrl}/Precot/api/punching/bmr/stoppageReports?fromdate=${moment(
//           primaryKeys.fromDate
//         ).format("YYYY-MM-DD")}&todate=${moment(primaryKeys.toDate).format(
//           "YYYY-MM-DD"
//         )}&machine=${primaryKeys.Machine}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((response) => {
//         setLoading(false);
//         console.log("Response Data :", response.data);
//         setData(response.data);
//         if (response.data.length > 0) {
//           //setDisable(true);
//           setHadData(false);
//         } else {
//           //setDisable(false);
//           setHadData(true);
//         }
//       })
//       .catch((err) => {
//         console.log("Error", err);
//         setLoading(false);
//         message.error("Unable to fetch data due to network error");
//       });
//   };

//   const handleSubmit = () => {
//     const checkedData = data.filter((_, index) => checkedItems[index]);

//     const payload = {
//       department: "Punching Department",
//       orderNo: "ORD123456",
//       batchNo: props.batchNo,
//       fromdate: moment(primaryKeys.fromDate).format("YYYY-MM-DD"),
//       todate: moment(primaryKeys.toDate).format("YYYY-MM-DD"),
//       machineName: primaryKeys.Machine,
//       details: checkedData.map((x, i) => {
//         return {
//           date: x.packdate,
//           fromTime: x.fromTime,
//           toTime: x.toTime,
//           totalTime: x.totalTime,
//           remarks: x.remarks,
//           supervisorName: pdeSignatureNew[i] || "", // Assigning value for each index
//           supervisorDate: pdeDateNew[i] || "", // Assigning date for each index
//         };
//       }),
//     };
//     axios
//       .post(`${ API.prodUrl}/Precot/api/punching/bmr/saveStoppage`, payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         message.success(
//           "Process Delay Equipment Breakdown Record Submitted Successfully!"
//         );
//       })
//       .catch((error) => {
//         console.error("There was an error making the request!", error);
//         message.error(
//           "Failed to Submit Process Delay Equipment Breakdown Record"
//         );
//       });
//   };

//   return (
//     <>
//       <Spin spinning={loading}>
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "flex-end",
//             marginBottom: "0.5em",
//             alignItems: "center",
//           }}
//         >
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: "#E5EEF9",
//               color: "#00308F",
//               fontWeight: "bold",
//               display: !props.loggedInSupervisor || disable ? "none" : "block",
//             }}
//             onClick={handleSubmit}
//             shape="round"
//           >
//             Submit
//           </Button>
//         </div>
//         {hadData ? (
//           <>
//             <Form>
//               <Form.Item label="From Date">
//                 <Input
//                   type="date"
//                   value={primaryKeys.fromDate}
//                   onChange={(e) => updateState({ fromDate: e.target.value })}
//                 />
//               </Form.Item>
//               <Form.Item label="To Date">
//                 <Input
//                   type="date"
//                   value={primaryKeys.toDate}
//                   onChange={(e) => updateState({ toDate: e.target.value })}
//                 />
//               </Form.Item>
//               <Form.Item label="Machines">
//                 <Select
//                   options={props.machineLov}
//                   value={primaryKeys.Machine}
//                   onChange={(e) => updateState({ Machine: e })}
//                 />
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" onClick={fetchData}>
//                   Fetch PDE
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         ) : (
//           <>
//             <table style={{ padding: "100px", width: "100%" }}>
//               <th colSpan="8"> PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD</th>
//               <tr>
//                 <th colSpan="1" rowSpan="2">
//                   Check
//                 </th>
//                 <th colSpan="1" rowSpan="2">
//                   S.No
//                 </th>
//                 <th colSpan="1" rowSpan="2">
//                   Date
//                 </th>
//                 <th colSpan="3">Process Delay / Down Time </th>
//                 <th colSpan="1" rowSpan="2">
//                   Remarks{" "}
//                 </th>
//                 <th colSpan="1" rowSpan="2">
//                   Sign and Date{" "}
//                 </th>
//               </tr>
//               <tr>
//                 <th colSpan="1">From (hours: Minutes) </th>
//                 <th colSpan="1">To (hours: Minutes) </th>
//                 <th colSpan="1">Total (hours: Minutes) </th>
//               </tr>
//               {data &&
//                 data.map((record, index) => (
//                   <tr key={index}>
//                     <td colSpan="1" align="center">
//                       <input
//                         type="checkbox"
//                         checked={checkedItems[index] || false}
//                         onChange={(e) => handleCheckboxChange(e, index)}
//                         disabled={disable}
//                       />
//                     </td>
//                     <td
//                       colSpan="1"
//                       style={{ padding: "0.4em", textAlign: "center" }}
//                     >
//                       {index + 1}
//                     </td>
//                     <td
//                       colSpan="1"
//                       style={{ padding: "0.4em", textAlign: "center" }}
//                     >
//                       {moment(record.packdate).format("DD/MM/YYYY")}
//                     </td>
//                     <td
//                       colSpan="1"
//                       style={{ padding: "0.4em", textAlign: "center" }}
//                     >
//                       {record.fromTime}
//                     </td>
//                     <td
//                       colSpan="1"
//                       style={{ padding: "0.4em", textAlign: "center" }}
//                     >
//                       {record.toTime}
//                     </td>
//                     <td
//                       colSpan="1"
//                       style={{ padding: "0.4em", textAlign: "center" }}
//                     >
//                       {record.totalTime}
//                     </td>
//                     <td
//                       colSpan="1"
//                       style={{ padding: "0.4em", textAlign: "center" }}
//                     >
//                       {record.remarks}
//                     </td>
//                     <td
//                       colSpan="1"
//                       style={{
//                         padding: "0.4em",
//                         textAlign: "center",
//                         display: "flex",
//                         justifyContent: "space-evenly",
//                       }}
//                     >
//                       <Select
//                         style={{ width: "12em" }}
//                         options={props.supLov}
//                         onChange={(val) => onchangePdeSign(val, index)}
//                         value={pdeSignatureNew[index] || undefined}
//                         disabled={disable}
//                       />
//                       <input
//                         type="datetime-local"
//                         onChange={(e) => onchangePdeDate(e.target.value, index)}
//                         value={pdeDateNew[index] || ""}
//                         disabled={disable}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//             </table>
//           </>
//         )}
//       </Spin>
//     </>
//   );
// };

// export default Process_Delay;

import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Input, message, Select, Spin, Empty, Checkbox } from "antd";
import axios from "axios";
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

  useEffect(() => {
    axios
      .get(`${ API.prodUrl}/Precot/api/padpunching/MachineLov`, {
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
        `${ API.prodUrl}/Precot/api/punching/bmr/getStoppagesBybatch?batchNo=${props.batchNo}`,
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
        .get(`${ API.prodUrl}/Precot/api/punching/bmr/stoppageReports`, {
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
            data1.details[0]?.date,
          fromTime: selectedRecord.fromTime || data1.details[0]?.fromTime,
          toTime: selectedRecord.toTime || data1.details[0]?.toTime,
          totalTime:
            (parseFloat(selectedRecord.totalTime) / 60).toFixed(1) ||
            (parseFloat(data1.details[0]?.totalTime) / 60).toFixed(1),
          remarks: selectedRecord.remarks || data1.details.remarks,
          supervisorName: signatures[rowIndex] || data1.details.supervisorName,
          supervisorDate:
            moment(dates[rowIndex]).format("YYYY-MM-DD") ||
            data1.details.supervisorDate,
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
        machineName: selectedMachine,
        details: recordsToSubmit,
      };

      axios
        .post(`${ API.prodUrl}/Precot/api/punching/bmr/saveStoppage`, payload, {
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
              `${ API.prodUrl}/Precot/api/punching/bmr/getStoppagesBybatch?batchNo=${props.batchNo}`,
              {
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
                  processDelayData.details &&
                  processDelayData.details.length > 0
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
            data1.details[0]?.date,
          fromTime: selectedRecord.fromTime || data1.details[0]?.fromTime,
          toTime: selectedRecord.toTime || data1.details[0]?.toTime,
          totalTime: selectedRecord.totalTime || data1.details[0]?.totalTime,
          remarks: selectedRecord.remarks || data1.details[0]?.remarks,
          supervisorName:
            signatures[rowIndex] || data1.details[0]?.supervisorName,
          supervisorDate:
            moment(dates[rowIndex]).format("YYYY-MM-DD") ||
            data1.details[0]?.supervisorDate,
        };
      });

      const payload = {
        stoppageId: data1?.stoppageId,
        batchNo: props.batchNo,
        orderNo: props.orderNo || data1?.orderNo,
        department: "Punching Department",
        fromdate: fromDate || data1?.fromdate,
        todate: toDate || data1?.todate,
        machineName: selectedMachine || data1?.machineName,
        details: recordsToSubmit,
      };

      axios
        .post(`${ API.prodUrl}/Precot/api/punching/bmr/submitStoppage`, payload, {
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
              `${ API.prodUrl}/Precot/api/punching/bmr/getStoppagesBybatch?batchNo=${props.batchNo}`,
              {
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
                  processDelayData.details &&
                  processDelayData.details.length > 0
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
            options={props.machineLov}
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
