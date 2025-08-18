import { Button, Input, message, Radio, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Verification_Of_Records = (props) => {
  const [status, setStatus] = useState({
    supervisor_saved: false,
    supervisor_approved: false,
    qa_saved: false,
    qa_approved: false,
    new_save: false,
    masterId: "",
    supervisor_status: "",
  });
  const updateState = (updates) => {
    setStatus((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const [verificationData, setVerificationData] = useState([
    {
      id: 1,
      recordName: "Housekeeping Cleaning Check List",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
      lineId: "",
      checked_id: "",
      verified_id: "",
    },
    {
      id: 2,
      recordName: "Machine Cleaning check list",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
      lineId: "",
      checked_id: "",
      verified_id: "",
    },
    {
      id: 3,
      recordName: "Production Details-Logbook",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
      lineId: "",
      checked_id: "",
      verified_id: "",
    },
    {
      id: 4,
      recordName: "Daily Roll consumption report",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
      lineId: "",
      checked_id: "",
      verified_id: "",
    },
    {
      id: 5,
      recordName: "Daily Production Packing details",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
      lineId: "",
      checked_id: "",
      verified_id: "",
    },
    {
      id: 6,
      recordName: "Product change over",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
    },
    {
      id: 7,
      recordName: "Sharp tool issue record",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
      lineId: "",
      checked_id: "",
      verified_id: "",
    },
    {
      id: 8,
      recordName: "Sanitization of machines & surfaces",
      performedBySign: "",
      performedByDate: "",
      verifiedBySign: "",
      verifiedByDate: "",
      activity: "",
      lineId: "",
      checked_id: "",
      verified_id: "",
    },
  ]);

  const updateVerification = (id, field, newValue) => {
    const updatedItems = verificationData.map((item) =>
      item.id === id ? { ...item, [field]: newValue } : item
    );
    console.log("Updated Items: ", updatedItems);
    setVerificationData(updatedItems);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Extract YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Extract HH:MM
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  useEffect(() => {
    // Precot/api/punching/bmr/getVerificationRecords?order=7000
    axios
      .get(
        `${API.prodUrl}/Precot/api/punching/bmr/getVerificationRecords?order=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("response", res.data);

        // Update the status based on the response
        updateState({
          supervisor_saved:
            res.data[0].supervisor_status === "SUPERVISOR_SAVED",
          supervisor_approved:
            res.data[0].supervisor_status === "SUPERVISOR_APPROVED",
          qa_saved: res.data[0].qa_status === "QA_SAVED",
          qa_approved: res.data[0].qa_status === "QA_APPROVED",
          new_save:
            res.data[0].supervisor_status === "" ||
            res.data[0].supervisor_status == null,
          masterId: res.data[0].verificationId,
          supervisor_status: res.data[0].supervisor_status,
        });

        // Update verificationData from the response
        setVerificationData(
          res.data[0].details.map((item, index) => ({
            id: index + 1,
            recordName: verificationData[index].recordName, // Keep original names
            performedBySign: item.checked_sign,
            performedByDate: formatDateTime(item.checked_date),
            verifiedBySign: item.verified_sign,
            verifiedByDate: formatDateTime(item.verified_date),
            activity: item.satisfactory,
            lineId: item.lineId,
            verified_id: item.verified_id,
            checked_id: item.checked_id,
          }))
        );
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [props.batchNo]);

  const submitVerification = () => {
    const submitPayload_1 = {
      orderNo: props.orderNo,
      department: "Pad punching",
      batchNo: props.batchNo,
      details: [
        {
          recordName: verificationData[0].recordName,
          checked_date: verificationData[0].performedByDate,
          checked_sign: verificationData[0].performedBySign,
          verified_date: verificationData[0].verifiedByDate,
          satisfactory: verificationData[0].activity,
          verified_sign: verificationData[0].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[0].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[0].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[1].recordName,
          checked_date: verificationData[1].performedByDate,
          checked_sign: verificationData[1].performedBySign,
          verified_date: verificationData[1].verifiedByDate,
          satisfactory: verificationData[1].activity,
          verified_sign: verificationData[1].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[1].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[1].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[2].recordName,
          checked_date: verificationData[2].performedByDate,
          checked_sign: verificationData[2].performedBySign,
          verified_date: verificationData[2].verifiedByDate,
          satisfactory: verificationData[2].activity,
          verified_sign: verificationData[2].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[2].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[2].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[3].recordName,
          checked_date: verificationData[3].performedByDate,
          checked_sign: verificationData[3].performedBySign,
          verified_date: verificationData[3].verifiedByDate,
          satisfactory: verificationData[3].activity,
          verified_sign: verificationData[3].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[3].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[3].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[4].recordName,
          checked_date: verificationData[4].performedByDate,
          checked_sign: verificationData[4].performedBySign,
          verified_date: verificationData[4].verifiedByDate,
          satisfactory: verificationData[4].activity,
          verified_sign: verificationData[4].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[4].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[4].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[5].recordName,
          checked_date: verificationData[5].performedByDate,
          checked_sign: verificationData[5].performedBySign,
          verified_date: verificationData[5].verifiedByDate,
          satisfactory: verificationData[5].activity,
          verified_sign: verificationData[5].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[5].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[5].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[6].recordName,
          checked_date: verificationData[6].performedByDate,
          checked_sign: verificationData[6].performedBySign,
          verified_date: verificationData[6].verifiedByDate,
          satisfactory: verificationData[6].activity,
          verified_sign: verificationData[6].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[6].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[6].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[7].recordName,
          checked_date: verificationData[7].performedByDate,
          checked_sign: verificationData[7].performedBySign,
          verified_date: verificationData[7].verifiedByDate,
          satisfactory: verificationData[7].activity,
          verified_sign: verificationData[7].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[7].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[7].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
      ],
    };

    const submitPayload_2 = {
      orderNo: props.orderNo,
      department: "Pad punching",
      batchNo: props.batchNo,
      verificationId: status.masterId,
      supervisor_status: status.supervisor_status,
      details: [
        {
          recordName: verificationData[0].recordName,
          checked_date: verificationData[0].performedByDate,
          checked_sign: verificationData[0].performedBySign,
          verified_date: verificationData[0].verifiedByDate,
          satisfactory: verificationData[0].activity,
          verified_sign: verificationData[0].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[0].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[0].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[0].lineId,
          checked_id: verificationData[0].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[1].recordName,
          checked_date: verificationData[1].performedByDate,
          checked_sign: verificationData[1].performedBySign,
          verified_date: verificationData[1].verifiedByDate,
          satisfactory: verificationData[1].activity,
          verified_sign: verificationData[1].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[1].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[1].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[1].lineId,
          checked_id: verificationData[1].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[2].recordName,
          checked_date: verificationData[2].performedByDate,
          checked_sign: verificationData[2].performedBySign,
          verified_date: verificationData[2].verifiedByDate,
          satisfactory: verificationData[2].activity,
          verified_sign: verificationData[2].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[2].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[2].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[2].lineId,
          checked_id: verificationData[2].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[3].recordName,
          checked_date: verificationData[3].performedByDate,
          checked_sign: verificationData[3].performedBySign,
          verified_date: verificationData[3].verifiedByDate,
          satisfactory: verificationData[3].activity,
          verified_sign: verificationData[3].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[3].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[3].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[3].lineId,
          checked_id: verificationData[3].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[4].recordName,
          checked_date: verificationData[4].performedByDate,
          checked_sign: verificationData[4].performedBySign,
          verified_date: verificationData[4].verifiedByDate,
          satisfactory: verificationData[4].activity,
          verified_sign: verificationData[4].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[4].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[4].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[4].lineId,
          checked_id: verificationData[4].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[5].recordName,
          checked_date: verificationData[5].performedByDate,
          checked_sign: verificationData[5].performedBySign,
          verified_date: verificationData[5].verifiedByDate,
          satisfactory: verificationData[5].activity,
          verified_sign: verificationData[5].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[5].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[5].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[5].lineId,
          checked_id: verificationData[5].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[6].recordName,
          checked_date: verificationData[6].performedByDate,
          checked_sign: verificationData[6].performedBySign,
          verified_date: verificationData[6].verifiedByDate,
          satisfactory: verificationData[6].activity,
          verified_sign: verificationData[6].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[6].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[6].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[6].lineId,
          checked_id: verificationData[6].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[7].recordName,
          checked_date: verificationData[7].performedByDate,
          checked_sign: verificationData[7].performedBySign,
          verified_date: verificationData[7].verifiedByDate,
          satisfactory: verificationData[7].activity,
          verified_sign: verificationData[7].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[7].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[7].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[7].lineId,
          checked_id: verificationData[7].checked_id,
          verified_id: status.masterId,
        },
      ],
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/punching/bmr/submitVerificationRecords`,
        status.supervisor_saved || status.supervisor_approved
          ? submitPayload_2
          : submitPayload_1,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("response", res.data);
        message.success("Verification of Record Submitted Successfully");
        axios
          .get(
            `${API.prodUrl}/Precot/api/punching/bmr/getVerificationRecords?order=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("response", res.data);

            // Update the status based on the response
            updateState({
              supervisor_saved:
                res.data[0].supervisor_status === "SUPERVISOR_SAVED",
              supervisor_approved:
                res.data[0].supervisor_status === "SUPERVISOR_APPROVED",
              qa_saved: res.data[0].qa_status === "QA_SAVED",
              qa_approved: res.data[0].qa_status === "QA_APPROVED",
              new_save:
                res.data[0].supervisor_status === "" ||
                res.data[0].supervisor_status == null,
              masterId: res.data[0].verificationId,
              supervisor_status: res.data[0].supervisor_status,
            });

            // Update verificationData from the response
            setVerificationData(
              res.data[0].details.map((item, index) => ({
                id: index + 1,
                recordName: verificationData[index].recordName, // Keep original names
                performedBySign: item.checked_sign,
                performedByDate: formatDateTime(item.checked_date),
                verifiedBySign: item.verified_sign,
                verifiedByDate: formatDateTime(item.verified_date),
                activity: item.satisfactory,
                lineId: item.lineId,
                verified_id: item.verified_id,
                checked_id: item.checked_id,
              }))
            );
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  //Save API
  const saveVerification = () => {
    const submitPayload_1 = {
      orderNo: props.orderNo,
      department: "Pad punching",
      batchNo: props.batchNo,
      details: [
        {
          recordName: verificationData[0].recordName,
          checked_date: verificationData[0].performedByDate,
          checked_sign: verificationData[0].performedBySign,
          verified_date: verificationData[0].verifiedByDate,
          satisfactory: verificationData[0].activity,
          verified_sign: verificationData[0].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[0].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[0].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[1].recordName,
          checked_date: verificationData[1].performedByDate,
          checked_sign: verificationData[1].performedBySign,
          verified_date: verificationData[1].verifiedByDate,
          satisfactory: verificationData[1].activity,
          verified_sign: verificationData[1].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[1].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[1].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[2].recordName,
          checked_date: verificationData[2].performedByDate,
          checked_sign: verificationData[2].performedBySign,
          verified_date: verificationData[2].verifiedByDate,
          satisfactory: verificationData[2].activity,
          verified_sign: verificationData[2].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[2].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[2].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[3].recordName,
          checked_date: verificationData[3].performedByDate,
          checked_sign: verificationData[3].performedBySign,
          verified_date: verificationData[3].verifiedByDate,
          satisfactory: verificationData[3].activity,
          verified_sign: verificationData[3].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[3].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[3].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[4].recordName,
          checked_date: verificationData[4].performedByDate,
          checked_sign: verificationData[4].performedBySign,
          verified_date: verificationData[4].verifiedByDate,
          satisfactory: verificationData[4].activity,
          verified_sign: verificationData[4].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[4].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[4].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[5].recordName,
          checked_date: verificationData[5].performedByDate,
          checked_sign: verificationData[5].performedBySign,
          verified_date: verificationData[5].verifiedByDate,
          satisfactory: verificationData[5].activity,
          verified_sign: verificationData[5].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[5].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[5].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[6].recordName,
          checked_date: verificationData[6].performedByDate,
          checked_sign: verificationData[6].performedBySign,
          verified_date: verificationData[6].verifiedByDate,
          satisfactory: verificationData[6].activity,
          verified_sign: verificationData[6].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[6].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[6].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
        {
          recordName: verificationData[7].recordName,
          checked_date: verificationData[7].performedByDate,
          checked_sign: verificationData[7].performedBySign,
          verified_date: verificationData[7].verifiedByDate,
          satisfactory: verificationData[7].activity,
          verified_sign: verificationData[7].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[7].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[7].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
        },
      ],
    };

    const submitPayload_2 = {
      orderNo: props.orderNo,
      department: "Pad punching",
      batchNo: props.batchNo,
      verificationId: status.masterId,
      supervisor_status: status.supervisor_status,
      details: [
        {
          recordName: verificationData[0].recordName,
          checked_date: verificationData[0].performedByDate,
          checked_sign: verificationData[0].performedBySign,
          verified_date: verificationData[0].verifiedByDate,
          satisfactory: verificationData[0].activity,
          verified_sign: verificationData[0].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[0].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[0].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[0].lineId,
          checked_id: verificationData[0].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[1].recordName,
          checked_date: verificationData[1].performedByDate,
          checked_sign: verificationData[1].performedBySign,
          verified_date: verificationData[1].verifiedByDate,
          satisfactory: verificationData[1].activity,
          verified_sign: verificationData[1].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[1].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[1].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[1].lineId,
          checked_id: verificationData[1].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[2].recordName,
          checked_date: verificationData[2].performedByDate,
          checked_sign: verificationData[2].performedBySign,
          verified_date: verificationData[2].verifiedByDate,
          satisfactory: verificationData[2].activity,
          verified_sign: verificationData[2].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[2].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[2].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[2].lineId,
          checked_id: verificationData[2].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[3].recordName,
          checked_date: verificationData[3].performedByDate,
          checked_sign: verificationData[3].performedBySign,
          verified_date: verificationData[3].verifiedByDate,
          satisfactory: verificationData[3].activity,
          verified_sign: verificationData[3].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[3].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[3].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[3].lineId,
          checked_id: verificationData[3].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[4].recordName,
          checked_date: verificationData[4].performedByDate,
          checked_sign: verificationData[4].performedBySign,
          verified_date: verificationData[4].verifiedByDate,
          satisfactory: verificationData[4].activity,
          verified_sign: verificationData[4].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[4].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[4].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[4].lineId,
          checked_id: verificationData[4].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[5].recordName,
          checked_date: verificationData[5].performedByDate,
          checked_sign: verificationData[5].performedBySign,
          verified_date: verificationData[5].verifiedByDate,
          satisfactory: verificationData[5].activity,
          verified_sign: verificationData[5].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[5].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[5].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[5].lineId,
          checked_id: verificationData[5].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[6].recordName,
          checked_date: verificationData[6].performedByDate,
          checked_sign: verificationData[6].performedBySign,
          verified_date: verificationData[6].verifiedByDate,
          satisfactory: verificationData[6].activity,
          verified_sign: verificationData[6].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[6].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[6].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[6].lineId,
          checked_id: verificationData[6].checked_id,
          verified_id: status.masterId,
        },
        {
          recordName: verificationData[7].recordName,
          checked_date: verificationData[7].performedByDate,
          checked_sign: verificationData[7].performedBySign,
          verified_date: verificationData[7].verifiedByDate,
          satisfactory: verificationData[7].activity,
          verified_sign: verificationData[7].verifiedBySign,
          checked_time: "",
          checked_name: verificationData[7].performedBySign,
          checked_status: "",
          verified_time: "",
          verified_name: verificationData[7].verifiedBySign,
          verified_status: "",
          non_satisfactory: "",
          lineId: verificationData[7].lineId,
          checked_id: verificationData[7].checked_id,
          verified_id: status.masterId,
        },
      ],
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/punching/bmr/saveVerificationRecords`,
        status.supervisor_saved ? submitPayload_2 : submitPayload_1,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("response", res.data);
        message.success("Verification of Record Saved Successfully");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    // Format the date to 'YYYY-MM-DDTHH:mm'
    return date.toISOString().slice(0, 16);
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
              display:
                (props.loggedInSupervisor && status.supervisor_approved) ||
                props.loggedInHod ||
                (props.loggedInQa && status.supervisor_approved) ||
                (status.supervisor_approved && status.qa_approved)
                  ? "none"
                  : "block",
            }}
            shape="round"
            onClick={saveVerification}
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
                (props.loggedInSupervisor && status.supervisor_approved) ||
                props.loggedInHod ||
                (status.supervisor_approved && status.qa_approved)
                  ? "none"
                  : "block",
            }}
            shape="round"
            onClick={submitVerification}
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
            <td colSpan="3" style={{ padding: "1em" }} align="center">
              <b>Name of the Record</b>
            </td>
            <td colSpan="3" style={{ padding: "1em" }} align="center">
              <b>Checked By Sign & Date</b>
            </td>
            <td colSpan="3" style={{ padding: "1em" }} align="center">
              <b>Verified By Sign & Date</b>
            </td>
            <td colSpan="3" style={{ padding: "1em" }} align="center">
              <b>Status</b>
            </td>
          </tr>
          {verificationData.map((x, i) => {
            return (
              <tr key={x.id}>
                <td colSpan="3" style={{ padding: "1em" }}>
                  <b>{x.recordName}</b>
                </td>
                <td colSpan="3">
                  <Select
                    options={props.supLov}
                    style={{
                      width: "100%",
                    }}
                    value={x.performedBySign}
                    onChange={(e) =>
                      updateVerification(x.id, "performedBySign", e)
                    }
                    disabled={
                      (props.loggedInSupervisor &&
                        status.supervisor_approved) ||
                      !props.loggedInSupervisor ||
                      props.loggedInHod ||
                      (status.supervisor_approved && status.qa_approved)
                    }
                  />
                  <Input
                    type="datetime-local"
                    value={x.performedByDate ? x.performedByDate : ""}
                    onChange={(e) =>
                      updateVerification(
                        x.id,
                        "performedByDate",
                        e.target.value
                      )
                    }
                    disabled={
                      (props.loggedInSupervisor &&
                        status.supervisor_approved) ||
                      !props.loggedInSupervisor ||
                      props.loggedInHod ||
                      (status.supervisor_approved && status.qa_approved)
                    }
                  />
                </td>
                <td colSpan="3">
                  <Select
                    options={props.qaLov}
                    style={{
                      width: "100%",
                    }}
                    value={x.verifiedBySign}
                    onChange={(e) =>
                      updateVerification(x.id, "verifiedBySign", e)
                    }
                    disabled={
                      (props.loggedInSupervisor &&
                        status.supervisor_approved) ||
                      !props.loggedInQa ||
                      props.loggedInHod ||
                      (status.supervisor_approved && status.qa_approved)
                    }
                  />
                  <Input
                    type="datetime-local"
                    value={x.verifiedByDate ? x.verifiedByDate : ""}
                    onChange={(e) =>
                      updateVerification(x.id, "verifiedByDate", e.target.value)
                    }
                    disabled={
                      (props.loggedInSupervisor &&
                        status.supervisor_approved) ||
                      !props.loggedInQa ||
                      props.loggedInHod ||
                      (status.supervisor_approved && status.qa_approved)
                    }
                  />
                </td>
                <td colSpan="3">
                  <Radio.Group
                    value={x.activity}
                    onChange={(e) =>
                      updateVerification(x.id, "activity", e.target.value)
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    disabled={
                      (props.loggedInSupervisor &&
                        status.supervisor_approved) ||
                      props.loggedInHod ||
                      !props.loggedInQa ||
                      (status.supervisor_approved && status.qa_approved)
                    }
                  >
                    <Radio value="SATISFACTORY">Satisfactory</Radio>
                    <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                    <Radio value="NA">NA</Radio>
                  </Radio.Group>
                </td>
              </tr>
            );
          })}
        </table>
      </>
    </div>
  );
};

export default Verification_Of_Records;
