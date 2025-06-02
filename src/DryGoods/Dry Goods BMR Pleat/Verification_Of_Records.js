/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-label-var */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Radio, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrDocumentStore } from "react-icons/gr";
import API from "../../baseUrl.json";
const Verification_Of_Records = (props) => {
  //All states entered here
  const [newSave, setNewSave] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
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
  const today = new Date().toISOString().split("T")[0];
  console.log("Selected order No", props.orderNo);
  const [messageApi, contextHolder] = useMessage();
  const role = localStorage.getItem("role");
  const batchNo = props.batchNo.split("-")[0];
  const username = role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
    role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const todayDateTime = getCurrentDateTime();

  useEffect(() => {
    setSupervisorApproved(false);
  }, [props.batchNo]);

  useEffect(() => {
    console.log("Here Is The Verification Record", verificationRecords);
  }, [verificationRecords]);
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
    console.log("props", props.batchNo);
    if (props.batchNo.length > 0) {
      axios
        .get(
          `${API.prodUrl}/Precot/api/cottonPleat/06.GetVerificationOfRecords?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.length == 0) {
            setVerificationRecords({
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
            setId({
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
          }
          console.log("Prod details", response.data);
          //  setVerificationRecords(response.data);
          if (response.data[0].detailsVerificationRecords.length > 0) {
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
            const observation1 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation1";
              });
            const observation2 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation2";
              });
            const observation3 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation3";
              });
            const observation4 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation4";
              });
            const observation5 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation5";
              });
            const observation6 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation6";
              });
            const observation7 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation7";
              });
            const observation8 =
              response.data[0].detailsVerificationRecords.filter((x) => {
                return x.name_of_record == "Observation8";
              });
            updateVerification({
              houseKeepingCleaningStatus: observation1[0].activity,
              machineCleaningRecordStatus: observation2[0].activity,
              logbookStatus: observation3[0].activity,
              productionRecordStatus: observation4[0].activity,
              baleConsumptionRecordStatus: observation5[0].activity,
              productChangeOverStatus: observation6[0].activity,
              sharpToolIssueRecordStatus: observation7[0].activity,
              machineSanitizerStatus: observation8[0].activity,
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
            // message.success("Verification Fetched Successfully");
          } else if (response.data[0].detailsVerificationRecords.length == 0) {
            setNewSave(false);
          }
        })
        .catch((err) => {
          console.log("ERRor", err);
        });
    } else {
    }
  }, [props.batchNo]);
  useEffect(() => {
    console.log("Verified By Sign 1", verificationRecords);
  }, [verificationRecords]);
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

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const formattedDate = currentDate
  //     .toISOString()
  //     .slice(0, 19)
  //     .replace("T", " ");
  //   const localDate = new Date(
  //     currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  //   )
  //     .toISOString()
  //     .slice(0, 16);
  //   role == "ROLE_QA" ? updateVerification({ VerifiedByDate1: localDate }) : "";
  //   role == "ROLE_SUPERVISOR"
  //     ? updateVerification({ CheckedByDate1: localDate })
  //     : "";
  //   role == "ROLE_QA" ? updateVerification({ VerifiedByDate2: localDate }) : "";
  //   role == "ROLE_SUPERVISOR"
  //     ? updateVerification({ CheckedByDate2: localDate })
  //     : "";
  //     role == "ROLE_QA" ? updateVerification({ VerifiedByDate3: localDate }) : "";
  //     role == "ROLE_SUPERVISOR"
  //       ? updateVerification({ CheckedByDate3: localDate })
  //       : "";
  //       role == "ROLE_QA" ? updateVerification({ VerifiedByDate4: localDate }) : "";
  //       role == "ROLE_SUPERVISOR"
  //         ? updateVerification({ CheckedByDate4: localDate })
  //         : "";
  //         role == "ROLE_QA" ? updateVerification({ VerifiedByDate5: localDate }) : "";
  //         role == "ROLE_SUPERVISOR"
  //           ? updateVerification({ CheckedByDate5: localDate })
  //           : "";
  //           role == "ROLE_QA" ? updateVerification({ VerifiedByDate6: localDate }) : "";
  //           role == "ROLE_SUPERVISOR"
  //             ? updateVerification({ CheckedByDate6: localDate })
  //             : "";
  //             role == "ROLE_QA" ? updateVerification({ VerifiedByDate7: localDate }) : "";
  //             role == "ROLE_SUPERVISOR"
  //               ? updateVerification({ CheckedByDate7: localDate })
  //               : "";
  //               role == "ROLE_QA" ? updateVerification({ VerifiedByDate8: localDate }) : "";
  //             role == "ROLE_SUPERVISOR"
  //               ? updateVerification({ CheckedByDate8: localDate })
  //               : "";
  // }, []);

  const saveVerificationRecords = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    const payload = {
      batch_no: props.batchNo,
      order_no: props.orderNo,
      detailsVerificationRecords: [
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate1,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign1,
          verified_date: verificationRecords.VerifiedByDate1,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign1,
          activity: verificationRecords.houseKeepingCleaningStatus,
          name_of_record: "Observation1",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate2,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign2,
          verified_date: verificationRecords.VerifiedByDate2,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign2,
          activity: verificationRecords.machineCleaningRecordStatus,
          name_of_record: "Observation2",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate3,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign3,
          verified_date: verificationRecords.VerifiedByDate3,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign3,
          activity: verificationRecords.logbookStatus,
          name_of_record: "Observation3",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate4,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign4,
          verified_date: verificationRecords.VerifiedByDate4,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign4,
          activity: verificationRecords.productionRecordStatus,
          name_of_record: "Observation4",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate5,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign5,
          verified_date: verificationRecords.VerifiedByDate5,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign5,
          activity: verificationRecords.baleConsumptionRecordStatus,
          name_of_record: "Observation5",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate6,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign6,
          verified_date: verificationRecords.VerifiedByDate6,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign6,
          activity: verificationRecords.productChangeOverStatus,
          name_of_record: "Observation6",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate7,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign7,
          verified_date: verificationRecords.VerifiedByDate7,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign7,
          activity: verificationRecords.sharpToolIssueRecordStatus,
          name_of_record: "Observation7",
        },
        {
          // verification_id: "",
          checked_date: verificationRecords.CheckedByDate8,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign8,
          verified_date: verificationRecords.VerifiedByDate8,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign8,
          activity: verificationRecords.machineSanitizerStatus,
          name_of_record: "Observation8",
        },
      ],
    };
    const payload_2 = {
      batch_no: props.batchNo,
      order_no: props.orderNo,
      verification_id: id.masterId,
      detailsVerificationRecords: [
        {
          verification_id: id.masterId,
          id: id.Id1,
          checked_date: verificationRecords.CheckedByDate1,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign1,
          verified_date: verificationRecords.VerifiedByDate1,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign1,
          activity: verificationRecords.houseKeepingCleaningStatus,
          name_of_record: "Observation1",
        },
        {
          verification_id: id.masterId,
          id: id.Id2,
          checked_date: verificationRecords.CheckedByDate2,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign2,
          verified_date: verificationRecords.VerifiedByDate2,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign2,
          activity: verificationRecords.machineCleaningRecordStatus,
          name_of_record: "Observation2",
        },
        {
          verification_id: id.masterId,
          id: id.Id3,
          checked_date: verificationRecords.CheckedByDate3,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign3,
          verified_date: verificationRecords.VerifiedByDate3,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign3,
          activity: verificationRecords.logbookStatus,
          name_of_record: "Observation3",
        },
        {
          verification_id: id.masterId,
          id: id.Id4,
          checked_date: verificationRecords.CheckedByDate4,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign4,
          verified_date: verificationRecords.VerifiedByDate4,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign4,
          activity: verificationRecords.productionRecordStatus,
          name_of_record: "Observation4",
        },
        {
          verification_id: id.masterId,
          id: id.Id5,
          checked_date: verificationRecords.CheckedByDate5,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign5,
          verified_date: verificationRecords.VerifiedByDate5,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign5,
          activity: verificationRecords.baleConsumptionRecordStatus,
          name_of_record: "Observation5",
        },
        {
          verification_id: id.masterId,
          id: id.Id6,
          checked_date: verificationRecords.CheckedByDate6,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign6,
          verified_date: verificationRecords.VerifiedByDate6,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign6,
          activity: verificationRecords.productChangeOverStatus,
          name_of_record: "Observation6",
        },
        {
          verification_id: id.masterId,
          id: id.Id7,
          checked_date: verificationRecords.CheckedByDate7,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign7,
          verified_date: verificationRecords.VerifiedByDate7,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign7,
          activity: verificationRecords.sharpToolIssueRecordStatus,
          name_of_record: "Observation7",
        },
        {
          verification_id: id.masterId,
          id: id.Id8,
          checked_date: verificationRecords.CheckedByDate8,
          checked_time: "",
          checked_name: "",
          checked_sign: verificationRecords.CheckedBySign8,
          verified_date: verificationRecords.VerifiedByDate8,
          verified_time: "",
          verified_name: "",
          verified_sign: verificationRecords.VerifiedBySign8,
          activity: verificationRecords.machineSanitizerStatus,
          name_of_record: "Observation8",
        },
      ],
    };

    setButtonLoader(true);
    axios
      .post(
        `${API.prodUrl}/Precot/api/cottonPleat/06.SaveVerificationOfRecords`,
        newSave ? payload_2 : payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          message.success("Verification of Record Saved Successfully");
          setButtonLoader(false);
        }

        axios
          .get(
            `${API.prodUrl}/Precot/api/cottonPleat/06.GetVerificationOfRecords?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log("Prod details", response.data);
            //  setVerificationRecords(response.data);
            if (response.data.length == 0) {
              setVerificationRecords({
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
              setId({
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
            }
            if (response.data[0].detailsVerificationRecords.length > 0) {
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
              const observation1 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation1";
                });
              const observation2 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation2";
                });
              const observation3 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation3";
                });
              const observation4 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation4";
                });
              const observation5 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation5";
                });
              const observation6 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation6";
                });
              const observation7 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation7";
                });
              const observation8 =
                response.data[0].detailsVerificationRecords.filter((x) => {
                  return x.name_of_record == "Observation8";
                });
              updateVerification({
                houseKeepingCleaningStatus: observation1[0].activity,
                machineCleaningRecordStatus: observation2[0].activity,
                logbookStatus: observation3[0].activity,
                productionRecordStatus: observation4[0].activity,
                baleConsumptionRecordStatus: observation5[0].activity,
                productChangeOverStatus: observation6[0].activity,
                sharpToolIssueRecordStatus: observation7[0].activity,
                machineSanitizerStatus: observation8[0].activity,
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
              // message.success("Verification Fetched Successfully");
            } else if (
              response.data[0].detailsVerificationRecords.length == 0
            ) {
              setNewSave(false);
            }
          })
          .catch((err) => {
            setButtonLoader(false);
            console.log("ERRor", err);
          });
      })
      .catch((err) => {
        setButtonLoader(false);
        console.log("Err", err);
      });
  };

  //c
  //State Submission API
  const submitVerificationRecords = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    // if (props.orderNo == "") {
    //   message.warning('Selected Batch No Dont Have Order No');
    //   return;
    // }
    if (props.loggedInQa) {
      const payload = {
        batch_no: props.batchNo,
        order_no: props.orderNo,
        detailsVerificationRecords: [
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate1,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign1,
            verified_date: verificationRecords.VerifiedByDate1,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign1,
            activity: verificationRecords.houseKeepingCleaningStatus || "NA",
            name_of_record: "Observation1",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate2,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign2,
            verified_date: verificationRecords.VerifiedByDate2,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign2,
            activity: verificationRecords.machineCleaningRecordStatus || "NA",
            name_of_record: "Observation2",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate3,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign3,
            verified_date: verificationRecords.VerifiedByDate3,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign3,
            activity: verificationRecords.logbookStatus || "NA",
            name_of_record: "Observation3",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate4,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign4,
            verified_date: verificationRecords.VerifiedByDate4,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign4,
            activity: verificationRecords.productionRecordStatus || "NA",
            name_of_record: "Observation4",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate5,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign5,
            verified_date: verificationRecords.VerifiedByDate5,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign5,
            activity: verificationRecords.baleConsumptionRecordStatus || "NA",
            name_of_record: "Observation5",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate6,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign6,
            verified_date: verificationRecords.VerifiedByDate6,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign6,
            activity: verificationRecords.productChangeOverStatus || "NA",
            name_of_record: "Observation6",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate7,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign7,
            verified_date: verificationRecords.VerifiedByDate7,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign7,
            activity: verificationRecords.sharpToolIssueRecordStatus || "NA",
            name_of_record: "Observation7",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate8,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign8,
            verified_date: verificationRecords.VerifiedByDate8,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign8,
            activity: verificationRecords.machineSanitizerStatus || "NA",
            name_of_record: "Observation8",
          },
        ],
      };
      const payload_2 = {
        batch_no: props.batchNo,
        order_no: props.orderNo,
        verification_id: id.masterId,
        detailsVerificationRecords: [
          {
            verification_id: id.masterId,
            id: id.Id1,
            checked_date: verificationRecords.CheckedByDate1,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign1,
            verified_date: verificationRecords.VerifiedByDate1,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign1,
            activity: verificationRecords.houseKeepingCleaningStatus || "NA",
            name_of_record: "Observation1",
          },
          {
            verification_id: id.masterId,
            id: id.Id2,
            checked_date: verificationRecords.CheckedByDate2,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign2,
            verified_date: verificationRecords.VerifiedByDate2,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign2,
            activity: verificationRecords.machineCleaningRecordStatus || "NA",
            name_of_record: "Observation2",
          },
          {
            verification_id: id.masterId,
            id: id.Id3,
            checked_date: verificationRecords.CheckedByDate3,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign3,
            verified_date: verificationRecords.VerifiedByDate3,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign3,
            activity: verificationRecords.logbookStatus || "NA",
            name_of_record: "Observation3",
          },
          {
            verification_id: id.masterId,
            id: id.Id4,
            checked_date: verificationRecords.CheckedByDate4,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign4,
            verified_date: verificationRecords.VerifiedByDate4,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign4,
            activity: verificationRecords.productionRecordStatus || "NA",
            name_of_record: "Observation4",
          },
          {
            verification_id: id.masterId,
            id: id.Id5,
            checked_date: verificationRecords.CheckedByDate5,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign5,
            verified_date: verificationRecords.VerifiedByDate5,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign5,
            activity: verificationRecords.baleConsumptionRecordStatus || "NA",
            name_of_record: "Observation5",
          },
          {
            verification_id: id.masterId,
            id: id.Id6,
            checked_date: verificationRecords.CheckedByDate6,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign6,
            verified_date: verificationRecords.VerifiedByDate6,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign6,
            activity: verificationRecords.productChangeOverStatus || "NA",
            name_of_record: "Observation6",
          },
          {
            verification_id: id.masterId,
            id: id.Id7,
            checked_date: verificationRecords.CheckedByDate7,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign7,
            verified_date: verificationRecords.VerifiedByDate7,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign7,
            activity: verificationRecords.sharpToolIssueRecordStatus || "NA",
            name_of_record: "Observation7",
          },
          {
            verification_id: id.masterId,
            id: id.Id8,
            checked_date: verificationRecords.CheckedByDate8,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign8,
            verified_date: verificationRecords.VerifiedByDate8,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign8,
            activity: verificationRecords.machineSanitizerStatus || "NA",
            name_of_record: "Observation8",
          },
        ],
      };

      if (
        verificationRecords.VerifiedBySign1 == "" ||
        verificationRecords.VerifiedBySign2 == "" ||
        verificationRecords.VerifiedBySign3 == "" ||
        verificationRecords.VerifiedBySign4 == "" ||
        verificationRecords.VerifiedBySign5 == "" ||
        verificationRecords.VerifiedBySign6 == "" ||
        verificationRecords.VerifiedBySign7 == "" ||
        verificationRecords.VerifiedBySign8 == "" ||
        verificationRecords.VerifiedByDate1 == "" ||
        verificationRecords.VerifiedByDate2 == "" ||
        verificationRecords.VerifiedByDate3 == "" ||
        verificationRecords.VerifiedByDate4 == "" ||
        verificationRecords.VerifiedByDate5 == "" ||
        verificationRecords.VerifiedByDate6 == "" ||
        verificationRecords.VerifiedByDate7 == "" ||
        verificationRecords.VerifiedByDate8 == ""
      ) {
        message.warning("Please Select All Required Fields");
        return;
      }
      setButtonLoader(true);
      axios
        .post(
          `${API.prodUrl}/Precot/api/cottonPleat/06.SubmitVerificationOfRecords`,
          newSave ? payload_2 : payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            message.success("Verification of Record Submitted Successfully");
            setButtonLoader(false);

            axios
              .get(
                `${API.prodUrl}/Precot/api/cottonPleat/06.GetVerificationOfRecords?batch_no=${props.batchNo}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((response) => {
                console.log("Prod details", response.data);
                //  setVerificationRecords(response.data);
                if (response.data[0].detailsVerificationRecords.length > 0) {
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
                  const observation1 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation1";
                    });
                  const observation2 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation2";
                    });
                  const observation3 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation3";
                    });
                  const observation4 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation4";
                    });
                  const observation5 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation5";
                    });
                  const observation6 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation6";
                    });
                  const observation7 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation7";
                    });
                  const observation8 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation8";
                    });
                  updateVerification({
                    houseKeepingCleaningStatus: observation1[0].activity,
                    machineCleaningRecordStatus: observation2[0].activity,
                    logbookStatus: observation3[0].activity,
                    productionRecordStatus: observation4[0].activity,
                    baleConsumptionRecordStatus: observation5[0].activity,
                    productChangeOverStatus: observation6[0].activity,
                    sharpToolIssueRecordStatus: observation7[0].activity,
                    machineSanitizerStatus: observation8[0].activity,
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
                  // message.success("Verification Fetched Successfully");
                } else if (
                  response.data[0].detailsVerificationRecords.length == 0
                ) {
                  setNewSave(false);
                }
              })
              .catch((err) => {
                message.error(err.response.data.message);
              });
          }
        })
        .catch((err) => {
          message.error(err.res.data.message);
        });
    } else if (props.loggedInSupervisor) {
      const payload = {
        batch_no: props.batchNo,
        order_no: props.orderNo,
        detailsVerificationRecords: [
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate1,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign1,
            verified_date: verificationRecords.VerifiedByDate1,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign1,
            activity: verificationRecords.houseKeepingCleaningStatus,
            name_of_record: "Observation1",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate2,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign2,
            verified_date: verificationRecords.VerifiedByDate2,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign2,
            activity: verificationRecords.machineCleaningRecordStatus,
            name_of_record: "Observation2",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate3,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign3,
            verified_date: verificationRecords.VerifiedByDate3,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign3,
            activity: verificationRecords.logbookStatus,
            name_of_record: "Observation3",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate4,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign4,
            verified_date: verificationRecords.VerifiedByDate4,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign4,
            activity: verificationRecords.productionRecordStatus,
            name_of_record: "Observation4",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate5,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign5,
            verified_date: verificationRecords.VerifiedByDate5,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign5,
            activity: verificationRecords.baleConsumptionRecordStatus,
            name_of_record: "Observation5",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate6,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign6,
            verified_date: verificationRecords.VerifiedByDate6,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign6,
            activity: verificationRecords.productChangeOverStatus,
            name_of_record: "Observation6",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate7,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign7,
            verified_date: verificationRecords.VerifiedByDate7,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign7,
            activity: verificationRecords.sharpToolIssueRecordStatus,
            name_of_record: "Observation7",
          },
          {
            // verification_id: "",
            checked_date: verificationRecords.CheckedByDate8,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign8,
            verified_date: verificationRecords.VerifiedByDate8,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign8,
            activity: verificationRecords.machineSanitizerStatus,
            name_of_record: "Observation8",
          },
        ],
      };
      const payload_2 = {
        batch_no: props.batchNo,
        order_no: props.orderNo,
        verification_id: id.masterId,
        detailsVerificationRecords: [
          {
            verification_id: id.masterId,
            id: id.Id1,
            checked_date: verificationRecords.CheckedByDate1,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign1,
            verified_date: verificationRecords.VerifiedByDate1,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign1,
            activity: verificationRecords.houseKeepingCleaningStatus,
            name_of_record: "Observation1",
          },
          {
            verification_id: id.masterId,
            id: id.Id2,
            checked_date: verificationRecords.CheckedByDate2,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign2,
            verified_date: verificationRecords.VerifiedByDate2,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign2,
            activity: verificationRecords.machineCleaningRecordStatus,
            name_of_record: "Observation2",
          },
          {
            verification_id: id.masterId,
            id: id.Id3,
            checked_date: verificationRecords.CheckedByDate3,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign3,
            verified_date: verificationRecords.VerifiedByDate3,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign3,
            activity: verificationRecords.logbookStatus,
            name_of_record: "Observation3",
          },
          {
            verification_id: id.masterId,
            id: id.Id4,
            checked_date: verificationRecords.CheckedByDate4,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign4,
            verified_date: verificationRecords.VerifiedByDate4,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign4,
            activity: verificationRecords.productionRecordStatus,
            name_of_record: "Observation4",
          },
          {
            verification_id: id.masterId,
            id: id.Id5,
            checked_date: verificationRecords.CheckedByDate5,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign5,
            verified_date: verificationRecords.VerifiedByDate5,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign5,
            activity: verificationRecords.baleConsumptionRecordStatus,
            name_of_record: "Observation5",
          },
          {
            verification_id: id.masterId,
            id: id.Id6,
            checked_date: verificationRecords.CheckedByDate6,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign6,
            verified_date: verificationRecords.VerifiedByDate6,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign6,
            activity: verificationRecords.productChangeOverStatus,
            name_of_record: "Observation6",
          },
          {
            verification_id: id.masterId,
            id: id.Id7,
            checked_date: verificationRecords.CheckedByDate7,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign7,
            verified_date: verificationRecords.VerifiedByDate7,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign7,
            activity: verificationRecords.sharpToolIssueRecordStatus,
            name_of_record: "Observation7",
          },
          {
            verification_id: id.masterId,
            id: id.Id8,
            checked_date: verificationRecords.CheckedByDate8,
            checked_time: "",
            checked_name: "",
            checked_sign: verificationRecords.CheckedBySign8,
            verified_date: verificationRecords.VerifiedByDate8,
            verified_time: "",
            verified_name: "",
            verified_sign: verificationRecords.VerifiedBySign8,
            activity: verificationRecords.machineSanitizerStatus,
            name_of_record: "Observation8",
          },
        ],
      };

      if (
        verificationRecords.CheckedBySign1 == "" ||
        verificationRecords.CheckedBySign2 == "" ||
        verificationRecords.CheckedBySign3 == "" ||
        verificationRecords.CheckedBySign4 == "" ||
        verificationRecords.CheckedBySign5 == "" ||
        verificationRecords.CheckedBySign6 == "" ||
        verificationRecords.CheckedBySign7 == "" ||
        verificationRecords.CheckedBySign8 == "" ||
        verificationRecords.CheckedByDate1 == "" ||
        verificationRecords.CheckedByDate2 == "" ||
        verificationRecords.CheckedByDate3 == "" ||
        verificationRecords.CheckedByDate4 == "" ||
        verificationRecords.CheckedByDate5 == "" ||
        verificationRecords.CheckedByDate6 == "" ||
        verificationRecords.CheckedByDate7 == "" ||
        verificationRecords.CheckedByDate8 == ""
      ) {
        message.warning("Please Select All Required Fields");
        return;
      }
      axios
        .post(
          `${API.prodUrl}/Precot/api/cottonPleat/06.SubmitVerificationOfRecords`,
          newSave ? payload_2 : payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            message.success("Verification of Record Submitted Sucessfully");
            setButtonLoader(false);
            axios
              .get(
                `${API.prodUrl}/Precot/api/cottonPleat/06.GetVerificationOfRecords?batch_no=${props.batchNo}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((response) => {
                console.log("Prod details", response.data);
                if (response.data[0].detailsVerificationRecords.length > 0) {
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
                  const observation1 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation1";
                    });
                  const observation2 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation2";
                    });
                  const observation3 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation3";
                    });
                  const observation4 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation4";
                    });
                  const observation5 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation5";
                    });
                  const observation6 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation6";
                    });
                  const observation7 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation7";
                    });
                  const observation8 =
                    response.data[0].detailsVerificationRecords.filter((x) => {
                      return x.name_of_record == "Observation8";
                    });
                  console.log("Observation", observation1);
                  updateVerification({
                    houseKeepingCleaningStatus: observation1[0].activity,
                    machineCleaningRecordStatus: observation2[0].activity,
                    logbookStatus: observation3[0].activity,
                    productionRecordStatus: observation4[0].activity,
                    baleConsumptionRecordStatus: observation5[0].activity,
                    productChangeOverStatus: observation6[0].activity,
                    sharpToolIssueRecordStatus: observation7[0].activity,
                    machineSanitizerStatus: observation8[0].activity,
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
                  // message.success("Verification Fetched Successfully");
                } else if (
                  response.data[0].detailsVerificationRecords.length == 0
                ) {
                  setNewSave(false);
                }
              })
              .catch((err) => {
                console.log("ERRor", err);
                message.error(err.res.data.message);
              });
          }
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
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
            loading={buttonLoader}
            icon={<GrDocumentStore color="#00308F" />}
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
            loading={buttonLoader}
            icon={<GrDocumentStore color="#00308F" />}
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
              <b>Department Cleaning Records</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.CheckedBySign1 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate1}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign1 || username}
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
                value={verificationRecords.VerifiedByDate1}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
                value={verificationRecords.CheckedBySign2 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate2}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign2 || username}
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
                value={verificationRecords.VerifiedByDate2}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
                value={verificationRecords.CheckedBySign3 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate3}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign3 || username}
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
                value={verificationRecords.VerifiedByDate3}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
                value={verificationRecords.CheckedBySign4 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate4}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign4 || username}
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
                value={verificationRecords.VerifiedByDate4}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
              <b>Mini roll issue Record</b>
            </td>
            <td colSpan="3">
              <Select
                options={props.supLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.CheckedBySign5 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate5}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign5 || username}
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
                value={verificationRecords.VerifiedByDate5}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
                value={verificationRecords.CheckedBySign6 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate6}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign6 || username}
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
                value={verificationRecords.VerifiedByDate6}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
                value={verificationRecords.CheckedBySign7 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate7}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign7 || username}
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
                value={verificationRecords.VerifiedByDate7}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
                value={verificationRecords.CheckedBySign8 || usernameSupervisor}
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
                value={verificationRecords.CheckedByDate8}
                disabled={!props.loggedInSupervisor || supervisorApproved}
                max={todayDateTime}
              />
            </td>
            <td colSpan="3">
              <Select
                options={props.qaLov}
                style={{
                  width: "100%",
                }}
                value={verificationRecords.VerifiedBySign8 || username}
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
                value={verificationRecords.VerifiedByDate8}
                disabled={
                  !props.loggedInQa ||
                  qaApproved ||
                  (!supervisorApproved && props.loggedInQa)
                }
                max={todayDateTime}
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
