import { Button, Input, message, Radio, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import API from "../../baseUrl.json";
import React, { useEffect, useState } from "react";

const Verification_Of_Records = (props) => {
  //All states entered here

  const role = localStorage.getItem("role");
  const [username, setUsername] = useState("");
  const [usernameQA, setUsernameQA] = useState("");

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");
  // Function to format the date and time as 'YYYY-MM-DDTHH:mm'
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

    if (role === "ROLE_SUPERVISOR") {
      const formattedDate = formatDateTime(now);
      setCurrentDateTime(formattedDate);
    }

    if (role === "ROLE_QA") {
      const formattedDateQA = formatDateTime(now);
      setCurrentDateTimeQA(formattedDateQA);
    }
  }, [role]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && role == "ROLE_SUPERVISOR") {
      setUsername(storedUsername);
    } else if (storedUsername && role == "ROLE_QA") {
      setUsernameQA(storedUsername);
    }
    console.log("username", storedUsername);
  }, []);

  const defaultValue = props.supLov.find((option) => option.value === username);
  const defaultValueQA = props.qaLov.find(
    (option) => option.value === usernameQA
  );

  const [newSave, setNewSave] = useState(false);
  const [verificationRecords, setVerificationRecords] = useState({
    houseKeepingCleaningStatus: "",
    machineCleaningRecordStatus: "",
    logbookStatus: "",
    productionRecordStatus: "",
    baleConsumptionRecordStatus: "",
    productChangeOverStatus: "",
    sharpToolIssueRecordStatus: "",
    machineSanitizerStatus: "",
    VerifiedBySign1: "",
    VerifiedBySign2: "",
    VerifiedBySign3: "",
    VerifiedBySign4: "",
    VerifiedBySign5: "",
    VerifiedBySign6: "",
    VerifiedBySign7: "",
    VerifiedBySign8: "",
    CheckedBySign1: "",
    CheckedBySign2: "",
    CheckedBySign3: "",
    CheckedBySign4: "",
    CheckedBySign5: "",
    CheckedBySign6: "",
    CheckedBySign7: "",
    CheckedBySign8: "",
    VerifiedByDate1: "",
    VerifiedByDate2: "",
    VerifiedByDate3: "",
    VerifiedByDate4: "",
    VerifiedByDate5: "",
    VerifiedByDate6: "",
    VerifiedByDate7: "",
    VerifiedByDate8: "",
    CheckedByDate1: "",
    CheckedByDate2: "",
    CheckedByDate3: "",
    CheckedByDate4: "",
    CheckedByDate5: "",
    CheckedByDate6: "",
    CheckedByDate7: "",
    CheckedByDate8: "",
  });

  const [id, setId] = useState({
    masterId: "",
    Id1: "",
    Id2: "",
    Id3: "",
    Id4: "",
    Id5: "",
    Id6: "",
    Id7: "",
    Id8: "",
  });
  const [supervisorApproved, setSupervisorApproved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);
  const [supervisorSaved, setSupervisorSaved] = useState(false);
  const [qaSaved, setQaSaved] = useState(false);

  //Message
  const [messageApi, contextHolder] = useMessage();

  //State update here in standard approach
  const updateVerification = (updates) => {
    setVerificationRecords((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  //State update here in standard approach
  const updateIDs = (updates) => {
    setId((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  useEffect(() => {
    console.log("props", props.orderNo);
    if (props.batchNo.length > 0) {
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/summary/06.GetVerificationOfRecords?order_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("Prod details", response.data);
          //  setVerificationRecords(response.data);
          if (response.data[0].detailsRecords06.length > 0) {
            setNewSave(true);
            setQaApproved(
              response.data[0].qa_status == "QA_APPROVED" ? true : false
            );
            setSupervisorApproved(
              response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                ? true
                : false
            );
            setSupervisorSaved(
              response.data[0].supervisor_status == "SUPERVISOR_SAVED"
                ? true
                : false
            );
            const observation1 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation1";
              }
            );
            const observation2 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation2";
              }
            );
            const observation3 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation3";
              }
            );
            const observation4 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation4";
              }
            );
            const observation5 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation5";
              }
            );
            const observation6 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation6";
              }
            );
            const observation7 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation7";
              }
            );
            const observation8 = response.data[0].detailsRecords06.filter(
              (x) => {
                return x.observation == "Observation8";
              }
            );
            updateVerification({
              houseKeepingCleaningStatus: observation1[0].details,
              machineCleaningRecordStatus: observation2[0].details,
              logbookStatus: observation3[0].details,
              productionRecordStatus: observation4[0].details,
              baleConsumptionRecordStatus: observation5[0].details,
              productChangeOverStatus: observation6[0].details,
              sharpToolIssueRecordStatus: observation7[0].details,
              machineSanitizerStatus: observation8[0].details,
              VerifiedBySign1: observation1[0].verified_sign,
              VerifiedBySign2: observation2[0].verified_sign,
              VerifiedBySign3: observation3[0].verified_sign,
              VerifiedBySign4: observation4[0].verified_sign,
              VerifiedBySign5: observation5[0].verified_sign,
              VerifiedBySign6: observation6[0].verified_sign,
              VerifiedBySign7: observation7[0].verified_sign,
              VerifiedBySign8: observation8[0].verified_sign,
              CheckedBySign1: observation1[0].checked_sign,
              CheckedBySign2: observation2[0].checked_sign,
              CheckedBySign3: observation3[0].checked_sign,
              CheckedBySign4: observation4[0].checked_sign,
              CheckedBySign5: observation5[0].checked_sign,
              CheckedBySign6: observation6[0].checked_sign,
              CheckedBySign7: observation7[0].checked_sign,
              CheckedBySign8: observation8[0].checked_sign,
              VerifiedByDate1: observation1[0].verified_date,
              VerifiedByDate2: observation2[0].verified_date,
              VerifiedByDate3: observation3[0].verified_date,
              VerifiedByDate4: observation4[0].verified_date,
              VerifiedByDate5: observation5[0].verified_date,
              VerifiedByDate6: observation6[0].verified_date,
              VerifiedByDate7: observation7[0].verified_date,
              VerifiedByDate8: observation8[0].verified_date,
              CheckedByDate1: observation1[0].checked_date,
              CheckedByDate2: observation2[0].checked_date,
              CheckedByDate3: observation3[0].checked_date,
              CheckedByDate4: observation4[0].checked_date,
              CheckedByDate5: observation5[0].checked_date,
              CheckedByDate6: observation6[0].checked_date,
              CheckedByDate7: observation7[0].checked_date,
              CheckedByDate8: observation8[0].checked_date,
            });
            updateIDs({
              masterId: response.data[0].verification_id,
              Id1: observation1[0].id,
              Id2: observation2[0].id,
              Id3: observation3[0].id,
              Id4: observation4[0].id,
              Id5: observation5[0].id,
              Id6: observation6[0].id,
              Id7: observation7[0].id,
              Id8: observation8[0].id,
            });
            message.success("Verification Fetched Successfully");
          } else if (response.data[0].detailsRecords06.length == 0) {
            setNewSave(false);
          }
        })
        .catch((err) => {
          console.log("ERRor", err);
        });
    } else {
      message.error("Please Select Order No Before Proceed");
    }
  }, [props.batchNo]);

  const arrayOfOnChange = {
    onChangeCheckedBy1: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign1: value,
      });
    },
    onChangeCheckedBy2: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign2: value,
      });
    },
    onChangeCheckedBy3: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign3: value,
      });
    },
    onChangeCheckedBy4: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign4: value,
      });
    },
    onChangeCheckedBy5: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign5: value,
      });
    },
    onChangeCheckedBy6: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign6: value,
      });
    },
    onChangeCheckedBy7: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign7: value,
      });
    },
    onChangeCheckedBy8: (value) => {
      console.log("value", value);
      updateVerification({
        CheckedBySign8: value,
      });
    },
    onChangeVerifiedBy9: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign1: value,
      });
    },
    onChangeVerifiedBy10: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign2: value,
      });
    },
    onChangeVerifiedBy11: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign3: value,
      });
    },
    onChangeVerifiedBy12: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign4: value,
      });
    },
    onChangeVerifiedBy13: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign5: value,
      });
    },
    onChangeVerifiedBy14: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign6: value,
      });
    },
    onChangeVerifiedBy15: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign7: value,
      });
    },
    onChangeVerifiedBy16: (value) => {
      console.log("value", value);
      updateVerification({
        VerifiedBySign8: value,
      });
    },
  };

  //State Save API
  const saveVerificationRecords = async () => {
    const payload = {
      order_no: props.orderNo,
      batchNo: props.batchNo,
      detailsRecords06: [
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate1 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign1 || username,
          verified_date:
            verificationRecords.VerifiedByDate1 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign1 || usernameQA,
          details: verificationRecords.houseKeepingCleaningStatus,
          observation: "Observation1",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate2 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign2 || username,
          verified_date:
            verificationRecords.VerifiedByDate2 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign2 || usernameQA,
          details: verificationRecords.machineCleaningRecordStatus,
          observation: "Observation2",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate3 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign3 || username,
          verified_date:
            verificationRecords.VerifiedByDate3 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign3 || usernameQA,
          details: verificationRecords.logbookStatus,
          observation: "Observation3",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate4 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign4 || username,
          verified_date:
            verificationRecords.VerifiedByDate4 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign4 || usernameQA,
          details: verificationRecords.productionRecordStatus,
          observation: "Observation4",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate5 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign5 || username,
          verified_date:
            verificationRecords.VerifiedByDate5 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign5 || usernameQA,
          details: verificationRecords.baleConsumptionRecordStatus,
          observation: "Observation5",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate6 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign6 || username,
          verified_date:
            verificationRecords.VerifiedByDate6 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign6 || usernameQA,
          details: verificationRecords.productChangeOverStatus,
          observation: "Observation6",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate7 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign7 || username,
          verified_date:
            verificationRecords.VerifiedByDate7 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign7 || usernameQA,
          details: verificationRecords.sharpToolIssueRecordStatus,
          observation: "Observation7",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate8 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign8 || username,
          verified_date:
            verificationRecords.VerifiedByDate8 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign8 || usernameQA,
          details: verificationRecords.machineSanitizerStatus,
          observation: "Observation8",
        },
      ],
    };

    //Payload2
    const payload_2 = {
      order_no: props.orderNo,
      verification_id: id.masterId,
      batchNo: props.batchNo,
      detailsRecords06: [
        {
          verification_id: id.masterId,
          id: id.Id1,
          checked_date: verificationRecords.CheckedByDate1 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign1 || username,
          verified_date:
            verificationRecords.VerifiedByDate1 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign1 || usernameQA,
          details: verificationRecords.houseKeepingCleaningStatus,
          observation: "Observation1",
        },
        {
          verification_id: id.masterId,
          id: id.Id2,
          checked_date: verificationRecords.CheckedByDate2 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign2 || username,
          verified_date:
            verificationRecords.VerifiedByDate2 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign2 || usernameQA,
          details: verificationRecords.machineCleaningRecordStatus,
          observation: "Observation2",
        },
        {
          verification_id: id.masterId,
          id: id.Id3,
          checked_date: verificationRecords.CheckedByDate3 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign3 || username,
          verified_date:
            verificationRecords.VerifiedByDate3 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign3 || usernameQA,
          details: verificationRecords.logbookStatus,
          observation: "Observation3",
        },
        {
          verification_id: id.masterId,
          id: id.Id4,
          checked_date: verificationRecords.CheckedByDate4 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign4 || username,
          verified_date:
            verificationRecords.VerifiedByDate4 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign4 || usernameQA,
          details: verificationRecords.productionRecordStatus,
          observation: "Observation4",
        },
        {
          verification_id: id.masterId,
          id: id.Id5,
          checked_date: verificationRecords.CheckedByDate5 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign5 || username,
          verified_date:
            verificationRecords.VerifiedByDate5 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign5 || usernameQA,
          details: verificationRecords.baleConsumptionRecordStatus,
          observation: "Observation5",
        },
        {
          verification_id: id.masterId,
          id: id.Id6,
          checked_date: verificationRecords.CheckedByDate6 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign6 || username,
          verified_date:
            verificationRecords.VerifiedByDate6 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign6 || usernameQA,
          details: verificationRecords.productChangeOverStatus,
          observation: "Observation6",
        },
        {
          verification_id: id.masterId,
          id: id.Id7,
          checked_date: verificationRecords.CheckedByDate7 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign7 || username,
          verified_date:
            verificationRecords.VerifiedByDate7 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign7 || usernameQA,
          details: verificationRecords.sharpToolIssueRecordStatus,
          observation: "Observation7",
        },
        {
          verification_id: id.masterId,
          id: id.Id8,
          checked_date: verificationRecords.CheckedByDate8 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign8 || username,
          verified_date:
            verificationRecords.VerifiedByDate8 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign8 || usernameQA,
          details: verificationRecords.machineSanitizerStatus,
          observation: "Observation8",
        },
      ],
    };

    // const validation = Object.entries(verificationRecords).every(
    //   (value) => value[1].length > 0
    // );

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/summary/06.SaveVerificationOfRecords`,
        newSave ? payload_2 : payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        message.success("Verification of Record Saved Sucessfully");
        axios
          .get(
            `${API.prodUrl}/Precot/api/spunlace/summary/06.GetVerificationOfRecords?order_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log("Prod details", response.data);
            //  setVerificationRecords(response.data);
            if (response.data[0].detailsRecords06.length > 0) {
              setNewSave(true);
              setQaApproved(
                response.data[0].qa_status == "QA_APPROVED" ? true : false
              );
              setSupervisorApproved(
                response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
              setSupervisorSaved(
                response.data[0].supervisor_status == "SUPERVISOR_SAVED"
                  ? true
                  : false
              );
              const observation1 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation1";
                }
              );
              const observation2 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation2";
                }
              );
              const observation3 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation3";
                }
              );
              const observation4 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation4";
                }
              );
              const observation5 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation5";
                }
              );
              const observation6 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation6";
                }
              );
              const observation7 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation7";
                }
              );
              const observation8 = response.data[0].detailsRecords06.filter(
                (x) => {
                  return x.observation == "Observation8";
                }
              );
              updateVerification({
                houseKeepingCleaningStatus: observation1[0].details,
                machineCleaningRecordStatus: observation2[0].details,
                logbookStatus: observation3[0].details,
                productionRecordStatus: observation4[0].details,
                baleConsumptionRecordStatus: observation5[0].details,
                productChangeOverStatus: observation6[0].details,
                sharpToolIssueRecordStatus: observation7[0].details,
                machineSanitizerStatus: observation8[0].details,
                VerifiedBySign1: observation1[0].verified_sign,
                VerifiedBySign2: observation2[0].verified_sign,
                VerifiedBySign3: observation3[0].verified_sign,
                VerifiedBySign4: observation4[0].verified_sign,
                VerifiedBySign5: observation5[0].verified_sign,
                VerifiedBySign6: observation6[0].verified_sign,
                VerifiedBySign7: observation7[0].verified_sign,
                VerifiedBySign8: observation8[0].verified_sign,
                CheckedBySign1: observation1[0].checked_sign,
                CheckedBySign2: observation2[0].checked_sign,
                CheckedBySign3: observation3[0].checked_sign,
                CheckedBySign4: observation4[0].checked_sign,
                CheckedBySign5: observation5[0].checked_sign,
                CheckedBySign6: observation6[0].checked_sign,
                CheckedBySign7: observation7[0].checked_sign,
                CheckedBySign8: observation8[0].checked_sign,
                VerifiedByDate1: observation1[0].verified_date,
                VerifiedByDate2: observation2[0].verified_date,
                VerifiedByDate3: observation3[0].verified_date,
                VerifiedByDate4: observation4[0].verified_date,
                VerifiedByDate5: observation5[0].verified_date,
                VerifiedByDate6: observation6[0].verified_date,
                VerifiedByDate7: observation7[0].verified_date,
                VerifiedByDate8: observation8[0].verified_date,
                CheckedByDate1: observation1[0].checked_date,
                CheckedByDate2: observation2[0].checked_date,
                CheckedByDate3: observation3[0].checked_date,
                CheckedByDate4: observation4[0].checked_date,
                CheckedByDate5: observation5[0].checked_date,
                CheckedByDate6: observation6[0].checked_date,
                CheckedByDate7: observation7[0].checked_date,
                CheckedByDate8: observation8[0].checked_date,
              });
              updateIDs({
                masterId: response.data[0].verification_id,
                Id1: observation1[0].id,
                Id2: observation2[0].id,
                Id3: observation3[0].id,
                Id4: observation4[0].id,
                Id5: observation5[0].id,
                Id6: observation6[0].id,
                Id7: observation7[0].id,
                Id8: observation8[0].id,
              });
              message.success("Verification Fetched Successfully");
            } else if (response.data[0].detailsRecords06.length == 0) {
              setNewSave(false);
            }
          })
          .catch((err) => {
            console.log("ERRor", err);
          });
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  //c
  //State Submission API
  const submitVerificationRecords = async () => {
    const payload = {
      order_no: props.orderNo,
      batchNo: props.batchNo,
      detailsRecords06: [
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate1 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign1 || username,
          verified_date:
            verificationRecords.VerifiedByDate1 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign1 || usernameQA,
          details: verificationRecords.houseKeepingCleaningStatus,
          observation: "Observation1",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate2 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign2 || username,
          verified_date:
            verificationRecords.VerifiedByDate2 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign2 || usernameQA,
          details: verificationRecords.machineCleaningRecordStatus,
          observation: "Observation2",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate3 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign3 || username,
          verified_date:
            verificationRecords.VerifiedByDate3 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign3 || usernameQA,
          details: verificationRecords.logbookStatus,
          observation: "Observation3",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate4 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign4 || username,
          verified_date:
            verificationRecords.VerifiedByDate4 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign4 || usernameQA,
          details: verificationRecords.productionRecordStatus,
          observation: "Observation4",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate5 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign5 || username,
          verified_date:
            verificationRecords.VerifiedByDate5 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign5 || usernameQA,
          details: verificationRecords.baleConsumptionRecordStatus,
          observation: "Observation5",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate6 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign6 || username,
          verified_date:
            verificationRecords.VerifiedByDate6 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign6 || usernameQA,
          details: verificationRecords.productChangeOverStatus,
          observation: "Observation6",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate7 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign7 || username,
          verified_date:
            verificationRecords.VerifiedByDate7 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign7 || usernameQA,
          details: verificationRecords.sharpToolIssueRecordStatus,
          observation: "Observation7",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate8 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign8 || username,
          verified_date:
            verificationRecords.VerifiedByDate8 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign8 || usernameQA,
          details: verificationRecords.machineSanitizerStatus,
          observation: "Observation8",
        },
      ],
    
    };

    //Payload2
    const payload_2 = {
      order_no: props.orderNo,
      verification_id: id.masterId,
      batchNo: props.batchNo,
      detailsRecords06: [
        {
          verification_id: id.masterId,
          id: id.Id1,
          checked_date: verificationRecords.CheckedByDate1 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign1 || username,
          verified_date:
            verificationRecords.VerifiedByDate1 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign1 || usernameQA,
          details: verificationRecords.houseKeepingCleaningStatus,
          observation: "Observation1",
        },
        {
          verification_id: id.masterId,
          id: id.Id2,
          checked_date: verificationRecords.CheckedByDate2 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign2 || username,
          verified_date:
            verificationRecords.VerifiedByDate2 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign2 || usernameQA,
          details: verificationRecords.machineCleaningRecordStatus,
          observation: "Observation2",
        },
        {
          verification_id: id.masterId,
          id: id.Id3,
          checked_date: verificationRecords.CheckedByDate3 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign3 || username,
          verified_date:
            verificationRecords.VerifiedByDate3 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign3 || usernameQA,
          details: verificationRecords.logbookStatus,
          observation: "Observation3",
        },
        {
          verification_id: id.masterId,
          id: id.Id4,
          checked_date: verificationRecords.CheckedByDate4 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign4 || username,
          verified_date:
            verificationRecords.VerifiedByDate4 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign4 || usernameQA,
          details: verificationRecords.productionRecordStatus,
          observation: "Observation4",
        },
        {
          verification_id: id.masterId,
          id: id.Id5,
          checked_date: verificationRecords.CheckedByDate5 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign5 || username,
          verified_date:
            verificationRecords.VerifiedByDate5 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign5 || usernameQA,
          details: verificationRecords.baleConsumptionRecordStatus,
          observation: "Observation5",
        },
        {
          verification_id: id.masterId,
          id: id.Id6,
          checked_date: verificationRecords.CheckedByDate6 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign6 || username,
          verified_date:
            verificationRecords.VerifiedByDate6 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign6 || usernameQA,
          details: verificationRecords.productChangeOverStatus,
          observation: "Observation6",
        },
        {
          verification_id: id.masterId,
          id: id.Id7,
          checked_date: verificationRecords.CheckedByDate7 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign7 || username,
          verified_date:
            verificationRecords.VerifiedByDate7 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign7 || usernameQA,
          details: verificationRecords.sharpToolIssueRecordStatus,
          observation: "Observation7",
        },
        {
          verification_id: id.masterId,
          id: id.Id8,
          checked_date: verificationRecords.CheckedByDate8 || currentDateTime,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign8 || username,
          verified_date:
            verificationRecords.VerifiedByDate8 || currentDateTimeQA,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign8 || usernameQA,
          details: verificationRecords.machineSanitizerStatus,
          observation: "Observation8",
        },
      ],
   
    };
    if (
      props.loggedInQa &&
      verificationRecords.houseKeepingCleaningStatus !== "" &&
      verificationRecords.machineCleaningRecordStatus !== "" &&
      verificationRecords.logbookStatus !== "" &&
      verificationRecords.productionRecordStatus !== "" &&
      verificationRecords.baleConsumptionRecordStatus !== "" &&
      verificationRecords.productChangeOverStatus !== "" &&
      verificationRecords.sharpToolIssueRecordStatus !== "" &&
      verificationRecords.machineSanitizerStatus !== "" &&
      verificationRecords.VerifiedBySign1 !== null &&
      verificationRecords.VerifiedBySign2 !== null &&
      verificationRecords.VerifiedBySign3 !== null &&
      verificationRecords.VerifiedBySign4 !== null &&
      verificationRecords.VerifiedBySign5 !== null &&
      verificationRecords.VerifiedBySign6 !== null &&
      verificationRecords.VerifiedBySign7 !== null &&
      verificationRecords.VerifiedBySign8 !== null &&
      verificationRecords.CheckedBySign1 !== null &&
      verificationRecords.CheckedBySign2 !== null &&
      verificationRecords.CheckedBySign3 !== null &&
      verificationRecords.CheckedBySign4 !== null &&
      verificationRecords.CheckedBySign5 !== null &&
      verificationRecords.CheckedBySign6 !== null &&
      verificationRecords.CheckedBySign7 !== null &&
      verificationRecords.CheckedBySign8 !== null &&
      verificationRecords.VerifiedByDate1 !== null &&
      verificationRecords.VerifiedByDate2 !== null &&
      verificationRecords.VerifiedByDate3 !== null &&
      verificationRecords.VerifiedByDate4 !== null &&
      verificationRecords.VerifiedByDate5 !== null &&
      verificationRecords.VerifiedByDate6 !== null &&
      verificationRecords.VerifiedByDate7 !== null &&
      verificationRecords.VerifiedByDate8 !== null &&
      verificationRecords.CheckedByDate1 !== null &&
      verificationRecords.CheckedByDate2 !== null &&
      verificationRecords.CheckedByDate3 !== null &&
      verificationRecords.CheckedByDate4 !== null &&
      verificationRecords.CheckedByDate5 !== null &&
      verificationRecords.CheckedByDate6 !== null &&
      verificationRecords.CheckedByDate7 !== null &&
      verificationRecords.CheckedByDate8 !== null
    ) {
      axios
        .post(
          `${API.prodUrl}/Precot/api/spunlace/summary/06.SubmitVerificationOfRecords`,
          newSave ? payload_2 : payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success("Verification of Record Submitted Sucessfully");
          axios
            .get(
              `${API.prodUrl}/Precot/api/spunlace/summary/06.GetVerificationOfRecords?order_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              console.log("Prod details", response.data);
              //  setVerificationRecords(response.data);
              if (response.data[0].detailsRecords06.length > 0) {
                setNewSave(true);
                setQaApproved(
                  response.data[0].qa_status == "QA_APPROVED" ? true : false
                );
                setSupervisorApproved(
                  response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                    ? true
                    : false
                );
                setSupervisorSaved(
                  response.data[0].supervisor_status == "SUPERVISOR_SAVED"
                    ? true
                    : false
                );
                const observation1 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation1";
                  }
                );
                const observation2 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation2";
                  }
                );
                const observation3 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation3";
                  }
                );
                const observation4 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation4";
                  }
                );
                const observation5 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation5";
                  }
                );
                const observation6 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation6";
                  }
                );
                const observation7 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation7";
                  }
                );
                const observation8 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation8";
                  }
                );
                updateVerification({
                  houseKeepingCleaningStatus: observation1[0].details,
                  machineCleaningRecordStatus: observation2[0].details,
                  logbookStatus: observation3[0].details,
                  productionRecordStatus: observation4[0].details,
                  baleConsumptionRecordStatus: observation5[0].details,
                  productChangeOverStatus: observation6[0].details,
                  sharpToolIssueRecordStatus: observation7[0].details,
                  machineSanitizerStatus: observation8[0].details,
                  VerifiedBySign1: observation1[0].verified_sign,
                  VerifiedBySign2: observation2[0].verified_sign,
                  VerifiedBySign3: observation3[0].verified_sign,
                  VerifiedBySign4: observation4[0].verified_sign,
                  VerifiedBySign5: observation5[0].verified_sign,
                  VerifiedBySign6: observation6[0].verified_sign,
                  VerifiedBySign7: observation7[0].verified_sign,
                  VerifiedBySign8: observation8[0].verified_sign,
                  CheckedBySign1: observation1[0].checked_sign,
                  CheckedBySign2: observation2[0].checked_sign,
                  CheckedBySign3: observation3[0].checked_sign,
                  CheckedBySign4: observation4[0].checked_sign,
                  CheckedBySign5: observation5[0].checked_sign,
                  CheckedBySign6: observation6[0].checked_sign,
                  CheckedBySign7: observation7[0].checked_sign,
                  CheckedBySign8: observation8[0].checked_sign,
                  VerifiedByDate1: observation1[0].verified_date,
                  VerifiedByDate2: observation2[0].verified_date,
                  VerifiedByDate3: observation3[0].verified_date,
                  VerifiedByDate4: observation4[0].verified_date,
                  VerifiedByDate5: observation5[0].verified_date,
                  VerifiedByDate6: observation6[0].verified_date,
                  VerifiedByDate7: observation7[0].verified_date,
                  VerifiedByDate8: observation8[0].verified_date,
                  CheckedByDate1: observation1[0].checked_date,
                  CheckedByDate2: observation2[0].checked_date,
                  CheckedByDate3: observation3[0].checked_date,
                  CheckedByDate4: observation4[0].checked_date,
                  CheckedByDate5: observation5[0].checked_date,
                  CheckedByDate6: observation6[0].checked_date,
                  CheckedByDate7: observation7[0].checked_date,
                  CheckedByDate8: observation8[0].checked_date,
                });
                updateIDs({
                  masterId: response.data[0].verification_id,
                  Id1: observation1[0].id,
                  Id2: observation2[0].id,
                  Id3: observation3[0].id,
                  Id4: observation4[0].id,
                  Id5: observation5[0].id,
                  Id6: observation6[0].id,
                  Id7: observation7[0].id,
                  Id8: observation8[0].id,
                });
                message.success("Verification Fetched Successfully");
              } else if (response.data[0].detailsRecords06.length == 0) {
                setNewSave(false);
              }
            })
            .catch((err) => {
              console.log("ERRor", err);
            });
        })
        .catch((err) => {
          console.log("Err", err);
        });
    } else if (
      props.loggedInSupervisor &&
      verificationRecords.CheckedBySign1 !== null &&
      verificationRecords.CheckedBySign2 !== null &&
      verificationRecords.CheckedBySign3 !== null &&
      verificationRecords.CheckedBySign4 !== null &&
      verificationRecords.CheckedBySign5 !== null &&
      verificationRecords.CheckedBySign6 !== null &&
      verificationRecords.CheckedBySign7 !== null &&
      verificationRecords.CheckedBySign8 !== null &&
      verificationRecords.CheckedByDate1 !== null &&
      verificationRecords.CheckedByDate2 !== null &&
      verificationRecords.CheckedByDate3 !== null &&
      verificationRecords.CheckedByDate4 !== null &&
      verificationRecords.CheckedByDate5 !== null &&
      verificationRecords.CheckedByDate6 !== null &&
      verificationRecords.CheckedByDate7 !== null &&
      verificationRecords.CheckedByDate8 !== null
    ) {
      axios
        .post(
          `${API.prodUrl}/Precot/api/spunlace/summary/06.SubmitVerificationOfRecords`,
          newSave ? payload_2 : payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          message.success("Verification of Record Submitted Sucessfully");
          axios
            .get(
              `${API.prodUrl}/Precot/api/spunlace/summary/06.GetVerificationOfRecords?order_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              console.log("Prod details", response.data);
              //  setVerificationRecords(response.data);
              if (response.data[0].detailsRecords06.length > 0) {
                setNewSave(true);
                setQaApproved(
                  response.data[0].qa_status == "QA_APPROVED" ? true : false
                );
                setSupervisorApproved(
                  response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                    ? true
                    : false
                );
                setSupervisorSaved(
                  response.data[0].supervisor_status == "SUPERVISOR_SAVED"
                    ? true
                    : false
                );
                const observation1 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation1";
                  }
                );
                const observation2 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation2";
                  }
                );
                const observation3 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation3";
                  }
                );
                const observation4 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation4";
                  }
                );
                const observation5 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation5";
                  }
                );
                const observation6 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation6";
                  }
                );
                const observation7 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation7";
                  }
                );
                const observation8 = response.data[0].detailsRecords06.filter(
                  (x) => {
                    return x.observation == "Observation8";
                  }
                );
                updateVerification({
                  houseKeepingCleaningStatus: observation1[0].details,
                  machineCleaningRecordStatus: observation2[0].details,
                  logbookStatus: observation3[0].details,
                  productionRecordStatus: observation4[0].details,
                  baleConsumptionRecordStatus: observation5[0].details,
                  productChangeOverStatus: observation6[0].details,
                  sharpToolIssueRecordStatus: observation7[0].details,
                  machineSanitizerStatus: observation8[0].details,
                  VerifiedBySign1: observation1[0].verified_sign,
                  VerifiedBySign2: observation2[0].verified_sign,
                  VerifiedBySign3: observation3[0].verified_sign,
                  VerifiedBySign4: observation4[0].verified_sign,
                  VerifiedBySign5: observation5[0].verified_sign,
                  VerifiedBySign6: observation6[0].verified_sign,
                  VerifiedBySign7: observation7[0].verified_sign,
                  VerifiedBySign8: observation8[0].verified_sign,
                  CheckedBySign1: observation1[0].checked_sign,
                  CheckedBySign2: observation2[0].checked_sign,
                  CheckedBySign3: observation3[0].checked_sign,
                  CheckedBySign4: observation4[0].checked_sign,
                  CheckedBySign5: observation5[0].checked_sign,
                  CheckedBySign6: observation6[0].checked_sign,
                  CheckedBySign7: observation7[0].checked_sign,
                  CheckedBySign8: observation8[0].checked_sign,
                  VerifiedByDate1: observation1[0].verified_date,
                  VerifiedByDate2: observation2[0].verified_date,
                  VerifiedByDate3: observation3[0].verified_date,
                  VerifiedByDate4: observation4[0].verified_date,
                  VerifiedByDate5: observation5[0].verified_date,
                  VerifiedByDate6: observation6[0].verified_date,
                  VerifiedByDate7: observation7[0].verified_date,
                  VerifiedByDate8: observation8[0].verified_date,
                  CheckedByDate1: observation1[0].checked_date,
                  CheckedByDate2: observation2[0].checked_date,
                  CheckedByDate3: observation3[0].checked_date,
                  CheckedByDate4: observation4[0].checked_date,
                  CheckedByDate5: observation5[0].checked_date,
                  CheckedByDate6: observation6[0].checked_date,
                  CheckedByDate7: observation7[0].checked_date,
                  CheckedByDate8: observation8[0].checked_date,
                });
                updateIDs({
                  masterId: response.data[0].verification_id,
                  Id1: observation1[0].id,
                  Id2: observation2[0].id,
                  Id3: observation3[0].id,
                  Id4: observation4[0].id,
                  Id5: observation5[0].id,
                  Id6: observation6[0].id,
                  Id7: observation7[0].id,
                  Id8: observation8[0].id,
                });
                message.success("Verification Fetched Successfully");
              } else if (response.data[0].detailsRecords06.length == 0) {
                setNewSave(false);
              }
            })
            .catch((err) => {
              console.log("ERRor", err);
            });
        })
        .catch((err) => {
          console.log("Err", err);
        });
    } else {
      if (props.loggedInQa) {
        message.error("Please fill all fields");
      } else if (props.loggedInSupervisor) {
        message.error("Please fill Supervisor fields");
      }
    }
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
                !props.loggedInSupervisor || supervisorApproved
                  ? "none"
                  : "block",
            }}
            shape="round"
            onClick={saveVerificationRecords}
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
                props.loggedInHod ||
                (supervisorApproved && props.loggedInSupervisor) ||
                (!supervisorApproved && props.loggedInQa) ||
                (supervisorApproved && qaApproved)
                  ? "none"
                  : "block",
            }}
            shape="round"
            onClick={submitVerificationRecords}
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
          {/* first */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Housekeeping cleaning checking list</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign1}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign1
                }
                onChange={arrayOfOnChange.onChangeCheckedBy1}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate1: e.target.value,
                  })
                }
                value={verificationRecords.CheckedByDate1 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.VerifiedBySign1}
                value={
                  defaultValueQA ||
                  usernameQA ||
                  verificationRecords.VerifiedBySign1
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy9}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate1: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate1 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                onChange={(e) =>
                  updateVerification({
                    houseKeepingCleaningStatus: e.target.value,
                  })
                }
                value={verificationRecords.houseKeepingCleaningStatus}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
          {/* second */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Machine Cleaning Record</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign2}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign2
                }
                onChange={arrayOfOnChange.onChangeCheckedBy2}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate2: e.target.value,
                  })
                }
                value={verificationRecords.CheckedByDate2 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.VerifiedBySign2}
                value={
                  defaultValueQA ||
                  usernameQA ||
                  verificationRecords.VerifiedBySign2
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy10}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate2: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate2 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) =>
                  updateVerification({
                    machineCleaningRecordStatus: e.target.value,
                  })
                }
                value={verificationRecords.machineCleaningRecordStatus}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
          {/* third */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Logbook</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign3}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign3
                }
                onChange={arrayOfOnChange.onChangeCheckedBy3}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate3: e.target.value,
                  })
                }
                value={verificationRecords.CheckedByDate3 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.VerifiedBySign3}
                value={
                  defaultValueQA ||
                  usernameQA ||
                  verificationRecords.VerifiedBySign3
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy11}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate3: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate3 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                onChange={(e) =>
                  updateVerification({
                    logbookStatus: e.target.value,
                  })
                }
                value={verificationRecords.logbookStatus}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
          {/* fourth */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Production Records</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign4}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign4
                }
                onChange={arrayOfOnChange.onChangeCheckedBy4}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate4: e.target.value,
                  })
                }
                value={verificationRecords.CheckedByDate4 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.VerifiedBySign4}
                value={
                  defaultValueQA ||
                  usernameQA ||
                  verificationRecords.VerifiedBySign4
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy12}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate4: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate4 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) =>
                  updateVerification({
                    productionRecordStatus: e.target.value,
                  })
                }
                value={verificationRecords.productionRecordStatus}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
          {/* fifth */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Bale Consumption Record</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign5}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign5
                }
                onChange={arrayOfOnChange.onChangeCheckedBy5}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate5: e.target.value,
                  })
                }
                value={verificationRecords.CheckedByDate5 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.VerifiedBySign5}
                value={
                  defaultValueQA ||
                  usernameQA ||
                  verificationRecords.VerifiedBySign5
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy13}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate5: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate5 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) =>
                  updateVerification({
                    baleConsumptionRecordStatus: e.target.value,
                  })
                }
                value={verificationRecords.baleConsumptionRecordStatus}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
          {/* six */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Product change over</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign6}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign6
                }
                onChange={arrayOfOnChange.onChangeCheckedBy6}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate6: e.target.value,
                  })
                }
                value={verificationRecords.CheckedByDate6 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.VerifiedBySign6}
                value={
                  defaultValueQA ||
                  usernameQA ||
                  verificationRecords.VerifiedBySign6
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy14}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate6: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate6 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) =>
                  updateVerification({
                    productChangeOverStatus: e.target.value,
                  })
                }
                value={verificationRecords.productChangeOverStatus}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
          {/* seven */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Sharp tool issue record</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign7}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign7
                }
                onChange={arrayOfOnChange.onChangeCheckedBy7}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate7: e.target.value,
                  })
                }
                value={verificationRecords.CheckedByDate7 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.VerifiedBySign7}
                value={
                  defaultValueQA ||
                  usernameQA ||
                  verificationRecords.VerifiedBySign7
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy15}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate7: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate7 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) =>
                  updateVerification({
                    sharpToolIssueRecordStatus: e.target.value,
                  })
                }
                value={verificationRecords.sharpToolIssueRecordStatus}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
          {/* eight */}
          <tr>
            <td colSpan="3" style={{ padding: "1em" }}>
              <b>Machine Sanitizer</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                // value={verificationRecords.CheckedBySign8}
                value={
                  defaultValue || username || verificationRecords.CheckedBySign8
                }
                onChange={arrayOfOnChange.onChangeCheckedBy8}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    CheckedByDate8: e.target.value,
                  })
                }
                // value={verificationRecords.CheckedByDate8}
                value={verificationRecords.CheckedByDate8 || currentDateTime}
                disabled={!props.loggedInSupervisor || supervisorApproved}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={
                  verificationRecords.VerifiedBySign8 ||
                  usernameQA ||
                  defaultValueQA
                }
                onChange={arrayOfOnChange.onChangeVerifiedBy16}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  updateVerification({
                    VerifiedByDate8: e.target.value,
                  })
                }
                value={verificationRecords.VerifiedByDate8 || currentDateTimeQA}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              />
            </td>
            <td colSpan="3">
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) =>
                  updateVerification({
                    machineSanitizerStatus: e.target.value,
                  })
                }
                value={verificationRecords.machineSanitizerStatus}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
              >
                <Radio value="SATISFACTORY">Satisfactory</Radio>
                <Radio value="NOT SATISFACTORY">Not Satisfactory</Radio>
                <Radio value="NA">NA</Radio>
              </Radio.Group>
            </td>
          </tr>
        </table>
      </>
      {contextHolder}
    </div>
  );
};

export default Verification_Of_Records;
