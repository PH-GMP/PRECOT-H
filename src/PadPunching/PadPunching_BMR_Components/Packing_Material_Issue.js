import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Input, message, Select, Spin, Empty, Checkbox } from "antd";
import axios from "axios";
import API from "../../baseUrl.json";

const Packing_Material_Issue = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [remarks, setRemarks] = useState({});
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

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
    setRemarks({});
  };

  const fetchProcessDelayData = (batchNo) => {
    setLoading(true);
    axios
      .get(`${API.prodUrl}/Precot/api/punching/bmr/03.GetPackingMeterial`, {
        params: { batch_no: batchNo },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.data && response.data.length > 0) {
          const processDelayData = response.data[0];
          if (
            processDelayData.pckdetails &&
            processDelayData.pckdetails.length > 0
          ) {
            setData(processDelayData.pckdetails);
            setFieldsDisabled(true);
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
    if (fromDate && toDate) {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/punching/bmr/03.GetPackingMeterialPde?batch_no=${props.orderNo}&fromdate=${moment(fromDate).format('DD.MM.YYYY')}&todate=${moment(toDate).format('DD.MM.YYYY')}`,
          // `${ API.prodUrl}/Precot/api/punching/bmr/03.GetPackingMeterialPde?batch_no=000800010480&fromdate=29.06.2024&todate=29.06.2024`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          setData(response.data);
        })
        .catch((err) => {
          console.log("Error fetching stoppage data:", err);
          setLoading(false);
          message.error("Error fetching stoppage data");
        });
    }
  };

  const handleSubmit = () => {
    if (props.batchNo) {
      const recordsToSubmit = data.map((record, index) => {
        return {
          date: record.DATE,
          packing_batch_no: record.batchNo,
          name_of_the_meterial: record.Material,
          qty: record.quantity,
          remarks: remarks[index] || "",
          unit: record.unit,
        };
      });

      const payload = {
        batch_no: props.batchNo,
        order_no: props.orderNo,
        pckdetails: recordsToSubmit,
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/punching/bmr/03.SubmitPackingMeterialIssue`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          message.success("Submitted successfully!");
          axios
            .get(`${API.prodUrl}/Precot/api/punching/bmr/03.GetPackingMeterial`, {
              params: { batch_no: props.batchNo },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              setLoading(false);
              if (response.data && response.data.length > 0) {
                const processDelayData = response.data[0];
                if (
                  processDelayData.pckdetails &&
                  processDelayData.pckdetails.length > 0
                ) {
                  setData(processDelayData.pckdetails);
                  setFieldsDisabled(true);
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
      message.warning("Please make sure batch number is valid.");
    }
  };

  const isSubmitDisabled = !props.batchNo || !fromDate || !toDate;

  const handleRemarksChange = (value, rowIndex) => {
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [rowIndex]: value,
    }));
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
                <th>S.No</th>
                <th>Date</th>
                <th>Batch No</th>
                <th>Name of the Material</th>
                <th>QTY</th>
                <th>Units</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{index + 1}</td>
                  <td>{record.DATE || record.date}</td>
                  <td>{record.batchNo || record.packing_batch_no}</td>
                  <td>{record.Material || record.name_of_the_meterial}</td>
                  <td>{record.quantity || record.qty}</td>
                  <td>{record.unit}</td>
                  <td>
                    <Input
                      style={{ width: "100%" }}
                      value={remarks[index] || record.remarks || ""}
                      disabled={fieldsDisabled}
                      onChange={(e) =>
                        handleRemarksChange(e.target.value, index)
                      }
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

export default Packing_Material_Issue;
