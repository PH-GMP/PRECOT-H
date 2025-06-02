import React, { useEffect, useState } from "react";
import { Button, Empty, Select, Spin, Checkbox, message, Input } from "antd";
import axios from "axios"; // Axios to make API calls
import API from "../../baseUrl.json";
import moment from "moment";

const Process_Delay = (props) => {
  const [data, setData] = useState([]);
  const [stoppageData, setStoppageData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [signatureValues, setSignatureValues] = useState({});
  const [dateValues, setDateValues] = useState({});
  const [checkedData, setCheckedData] = useState([]);
  const [id, setId] = useState("");
  const [supervisor_id, setSupervisorID] = useState("");
  const [status, setStatus] = useState(false);
  const handleSignatureChangepde = (value, index) => {
    const updatedSignatureValues = {
      ...signatureValues,
      [index]: value,
    };
    setSignatureValues(updatedSignatureValues);
  };
  const handleDateChange = (e, index) => {
    const updatedDateValues = {
      ...dateValues,
      [index]: e.target.value,
    };
    setDateValues(updatedDateValues);
  };

  const getApi = () => {
    axios
    .get(
      `${
      API.prodUrl
      }/Precot/api/spunlace/summary/09.GetDelayEqupmentBrkDwnRecord?order_no=${
        props.orderNo
      }&from_date=${localStorage.getItem(
        "start_date_sp"
      )}&to_date=${localStorage.getItem("end_date_sp")}&batch_no=${
        props.batchNo
      }`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      console.log("Response of PDE", res.data);
      if (res.data.bmrSummaryDateList.length > 0) {
        setId(res.data.bmrSummaryDateList[0].id);
        setSupervisorID(res.data.bmrSummaryDateList[0].supervisor_id);
        setStatus(res.data.bmrSummaryDateList[0].status);
        setStoppageData(
          res.data.bmrSummaryDateList[0].spunlacrdetails.map((x, i) => ({
            line_id: x.line_id,
            id: id,
            prod_date: x.prod_date,
            prod_time: x.prod_time,
            prod_name: x.prod_name,
            prod_sign: x.prod_sign,
            PackDate: x.pde_date,
            fromTime: x.pde_from_hr,
            toTime: x.pde_to_hr,
            totalHours: x.pde_total_hr,
            remarks: x.remarks,
          }))
        );
      } else {
        setStoppageData(res.data.stoppageMapList);
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
  }

  useEffect(() => {
    getApi()
  }, [props.batchNo]);

  const handleCheckboxChange = (e, index) => {
    const isChecked = e.target.checked;

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: isChecked,
    }));

    if (isChecked) {
      setCheckedData((prevCheckedData) => [
        ...prevCheckedData,
        stoppageData[index],
      ]);
    } else {
      setCheckedData((prevCheckedData) =>
        prevCheckedData.filter((item, i) => i !== index)
      );
    }
  };

  const handleSave = () => {
    const newData = checkedData.map((x, i) => ({
      prod_name: signatureValues[i] || x.prod_name,
      prod_date: dateValues[i] || x.prod_date,
      prod_time: "",
      prod_sign: signatureValues[i] || x.prod_sign,
      pde_date: x.PackDate,
      pde_from_hr: x.fromTime,
      pde_to_hr: x.toTime,
      pde_total_hr: x.totalHours,
      remarks: x.remarks,
      line_id: x.line_id,
      id: id,
    }));
    const payload = {
      order_no: props.orderNo,
      form_no: "FORM001",
      status: status,
      supervisor_id: supervisor_id,
      batchNo: props.batchNo,
      id: id,
      spunlacrdetails: newData,
    };
    console.log("New Data", payload);
    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/09.SaveDelayEqupmentBrkDwnRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Saved Data", res.data);
        message.success("Process Delay Saved Successfully");
        getApi();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleSubmit = () => {
    const newData = checkedData.map((x, i) => ({
      prod_name: signatureValues[i] || x.prod_name,
      prod_date: dateValues[i] || x.prod_date,
      prod_time: "",
      prod_sign: signatureValues[i] || x.prod_sign,
      pde_date: x.PackDate,
      pde_from_hr: x.fromTime,
      pde_to_hr: x.toTime,
      pde_total_hr: x.totalHours,
      remarks: x.remarks,
      line_id: x.line_id,
      id: id,
    }));
    const payload = {
      order_no: props.orderNo,
      form_no: "FORM001",
      status: status,
      supervisor_id: supervisor_id,
      batchNo: props.batchNo,
      id: id,
      spunlacrdetails: newData,
    };
    console.log("New Data", payload);
    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/09.SubmitDelayEqupmentBrkDwnRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Process Delay Submitted Successfully");
        getApi();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "0.5em",
          alignItems: "center",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginRight: "1em",
            display:
              !props.loggedInSupervisor || status == "SUPERVISOR_APPROVED"
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
            backgroundColor: "#00308F",
            color: "white",
            fontWeight: "bold",
            display:
              !props.loggedInSupervisor || status == "SUPERVISOR_APPROVED"
                ? "none"
                : "block",
          }}
          onClick={handleSubmit}
          shape="round"
        >
          Submit
        </Button>
      </div>
      {status == "SUPERVISOR_APPROVED" ? (
        <>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>From (hours: Minutes)</th>
                <th>To (hours: Minutes)</th>
                <th>Total (hours: Minutes)</th>
                <th>Remarks</th>
                <th>Sign and Date</th>
              </tr>
            </thead>
            <tbody>
              {stoppageData.map((x, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{x.PackDate}</td>
                    <td>{x.fromTime}</td>
                    <td>{x.toTime}</td>
                    <td>{x.totalHours}</td>
                    <td>{x.remarks}</td>
                    <td>
                      {x.prod_name}
                      <br></br>
                      {moment(x.prod_date).format("DD/MM/YYYY - HH:mm")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Select</th>
              <th>S.No</th>
              <th>Date</th>
              <th>From (hours: Minutes)</th>
              <th>To (hours: Minutes)</th>
              <th>Total (hours: Minutes)</th>
              <th>Remarks</th>
              <th>Sign and Date</th>
            </tr>
          </thead>
          <tbody>
            {stoppageData.map((x, i) => {
              return (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems[i] || false}
                      onChange={(e) => handleCheckboxChange(e, i)}
                      disabled={
                        !props.loggedInSupervisor ||
                        status == "SUPERVISOR_APPROVED"
                      }
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{x.PackDate}</td>
                  <td>{x.fromTime}</td>
                  <td>{x.toTime}</td>
                  <td>{x.totalHours}</td>
                  <td>{x.remarks}</td>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      options={props.supLov}
                      onChange={(value) => handleSignatureChangepde(value, i)}
                      value={signatureValues[i] || x.prod_name}
                      disabled={
                        !props.loggedInSupervisor ||
                        status == "SUPERVISOR_APPROVED"
                      }
                    />
                    <br></br>
                    <input
                      type="datetime-local"
                      onChange={(e) => handleDateChange(e, i)}
                      value={dateValues[i] || x.prod_date}
                      disabled={
                        !props.loggedInSupervisor ||
                        status == "SUPERVISOR_APPROVED"
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Process_Delay;
