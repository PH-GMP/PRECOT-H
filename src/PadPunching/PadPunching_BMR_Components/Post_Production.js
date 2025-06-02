import { Button, Input, message, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
import moment from "moment/moment";
const Post_Production = (props) => {
  const [messageApi, contextHolder] = useMessage();
  const [postprod, setPostProd] = useState({
    supervisor_sign: "",
    hod_sign: "",
    qa_sign: "",
    supervisor_date: "",
    hod_date: "",
    qa_date: "",
    id: "",
    sup_id: "",
    hod_id: "",
    qa_id: "",
    qaStatus: "",
    hodStatus: "",
    supervisorStatus: "",
  });
  const [postprodvalidate, setPostProdvalidate] = useState({
    supervisor_sign: "",
    hod_sign: "",
    qa_sign: "",
    supervisor_date: "",
    hod_date: "",
    qa_date: "",
  });
  const [newSave, setNewSave] = useState(false);
  const [supdisable, setSupDisable] = useState(false);
  const [hoddisable, setHodDisable] = useState(false);
  const [qadisable, setQaDisable] = useState(false);
  //State update here in standard approach
  const updatePostProd = (updates) => {
    setPostProd((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const updatePostProdValidate = (updates) => {
    setPostProdvalidate((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const onChange1 = (values) => {
    updatePostProd({
      supervisor_sign: values,
    });
  };

  const onChange2 = (values) => {
    updatePostProd({
      hod_sign: values,
    });
  };
  const onChange3 = (values) => {
    updatePostProd({
      qa_sign: values,
    });
  };
  useEffect(() => {
    axios
      .get(
        `${ API.prodUrl}/Precot/api/punching/bmr/postProductionReview?order=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        if (res.data.length > 0) {
          setNewSave(true);
          updatePostProd({
            supervisor_sign: res.data[0].supervisorName,
            hod_sign: res.data[0].hodName,
            qa_sign: res.data[0].qaName,
            supervisor_date: res.data[0].supervisiorSubmittedDate,
            hod_date: res.data[0].hodSubmittedDate,
            qa_date: res.data[0].qaSubmittedDate,
            id: res.data[0].productionId,
            sup_id: res.data[0].supervisorId,
            hod_id: res.data[0].hodId,
            qa_id: res.data[0].qaId,
            qaStatus: res.data[0].qaStatus,
            hodStatus: res.data[0].hodStatus,
            supervisorStatus: res.data[0].supervisorStatus,
          });
          updatePostProdValidate({
            supervisor_sign: res.data[0].supervisorName,
            hod_sign: res.data[0].hodName,
            qa_sign: res.data[0].qaName,
            supervisor_date: res.data[0].supervisiorSubmittedDate,
            hod_date: res.data[0].hodSubmittedDate,
            qa_date: res.data[0].qaSubmittedDate,
          });
        } else {
          setNewSave(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [props.orderNo]);

  const sendPostProd = () => {
    const payload = {
      // productionId: "",
      order_no: props.orderNo,
      batchNo: props.batchNo,
      department: "",
      status: "",
      qaStatus: "",
      qaName: postprod.qa_sign,
      //qaId: "",
      qaSubmittedDate: postprod.qa_date,
      hodStatus: "",
      hodName: postprod.hod_sign,
      //hodId: "",
      hodSubmittedDate: postprod.hod_date,
      supervisorStatus: "",
      supervisorName: postprod.supervisor_sign,
      // supervisorId: "",
      supervisiorSubmittedDate: postprod.supervisor_date,
    };
    const payload_2 = {
      productionId: postprod.id,
      order_no: props.orderNo,
      batchNo: props.batchNo,
      department: "",
      status: "",
      qaStatus: postprod.qaStatus,
      qaName: postprod.qa_sign,
      qaId: postprod.qa_id,
      qaSubmittedDate: postprod.qa_date,
      hodStatus: postprod.hodStatus,
      hodName: postprod.hod_sign,
      hodId: postprod.hod_id,
      hodSubmittedDate: postprod.hod_date,
      supervisorStatus: postprod.supervisorStatus,
      supervisorName: postprod.supervisor_sign,
      supervisorId: postprod.sup_id,
      supervisiorSubmittedDate: postprod.supervisor_date,
    };
    axios
      .post(
        `${ API.prodUrl}/Precot/api/punching/bmr/submitPostProductionReview`,
        newSave ? payload_2 : payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        message.success("Post Production Submitted Successfully");
        // get api
        axios
        .get(
          `${ API.prodUrl}/Precot/api/punching/bmr/postProductionReview?order=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res", res.data);
          if (res.data.length > 0) {
            setNewSave(true);
            updatePostProd({
              supervisor_sign: res.data[0].supervisorName,
              hod_sign: res.data[0].hodName,
              qa_sign: res.data[0].qaName,
              supervisor_date: res.data[0].supervisiorSubmittedDate,
              hod_date: res.data[0].hodSubmittedDate,
              qa_date: res.data[0].qaSubmittedDate,
              id: res.data[0].productionId,
              sup_id: res.data[0].supervisorId,
              hod_id: res.data[0].hodId,
              qa_id: res.data[0].qaId,
              qaStatus: res.data[0].qaStatus,
              hodStatus: res.data[0].hodStatus,
              supervisorStatus: res.data[0].supervisorStatus,
            });
            updatePostProdValidate({
              supervisor_sign: res.data[0].supervisorName,
              hod_sign: res.data[0].hodName,
              qa_sign: res.data[0].qaName,
              supervisor_date: res.data[0].supervisiorSubmittedDate,
              hod_date: res.data[0].hodSubmittedDate,
              qa_date: res.data[0].qaSubmittedDate,
            });
          } else {
            setNewSave(false);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      })
      .catch((err) => {
        console.log("Err", err);
      });
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
                (props.loggedInSupervisor &&
                  postprod.supervisorStatus == "SUPERVISOR_APPROVED") ||
                (props.loggedInQa && postprod.qaStatus == "QA_APPROVED") ||
                (props.loggedInHod && postprod.hodStatus == "HOD_APPROVED")
                  ? "none"
                  : "block",
            }}
            shape="round"
            onClick={sendPostProd}
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
            <td
              style={{
                padding: "1em",
              }}
            >
              Designation
            </td>
            <td
              style={{
                padding: "1em",
              }}
            >
              Production Supervisor
            </td>
            <td
              style={{
                padding: "1em",
              }}
            >
              Head of the Department / Designee
            </td>
            <td
              style={{
                padding: "1em",
              }}
            >
              Approved By Manager-QA / Designee
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              Name
            </td>
            <td style={{ padding: "1em" }}>
              <Select
                options={props.supLov}
                onChange={onChange1}
                value={postprod.supervisor_sign}
                style={{
                  width: "100%",
                }}
                placeholder="Choose Production"
                disabled={
                  !props.loggedInSupervisor ||
                  postprod.supervisorStatus == "SUPERVISOR_APPROVED"
                }
              />
            </td>
            <td>
              <Select
                options={props.hodLov}
                onChange={onChange2}
                value={postprod.hod_sign}
                style={{
                  width: "100%",
                }}
                placeholder="Choose HOD"
                disabled={
                  !props.loggedInHod || postprod.hodStatus == "HOD_APPROVED"
                }
              />
            </td>
            <td>
              <Select
                options={props.qaLov}
                onChange={onChange3}
                value={postprod.qa_sign}
                style={{
                  width: "100%",
                }}
                placeholder="Choose QA"
                disabled={
                  !props.loggedInQa || postprod.qaStatus == "QA_APPROVED"
                }
              />
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "1em",
              }}
            >
              Sign & Date
            </td>
            <td style={{ padding: "1em" }}>
              <Select
                // options={prodLov}
                // onChange={ppOnchangeSign1}
                value={postprod.supervisor_sign}
                style={{
                  width: "50%",
                }}
                placeholder="Choose Production"
                disabled={
                  !props.loggedInSupervisor ||
                  postprod.supervisorStatus == "SUPERVISOR_APPROVED"
                }
              />
              <Input
                type="datetime-local"
                style={{
                  width: "50%",
                }}
                value={moment(postprod.supervisor_date).format(
                  "YYYY-MM-DDTHH:MM"
                )}
                onChange={(e) => {
                  updatePostProd({ supervisor_date: e.target.value });
                }}
                disabled={
                  !props.loggedInSupervisor ||
                  postprod.supervisorStatus == "SUPERVISOR_APPROVED"
                }
              />
            </td>
            <td>
              <Select
                // options={hodLov}
                // onChange={ppOnchangeSign2}
                value={postprod.hod_sign}
                style={{
                  width: "50%",
                }}
                placeholder="Choose Hod"
                disabled={
                  !props.loggedInHod || postprod.hodStatus == "HOD_APPROVED"
                }
              />
              <Input
                type="datetime-local"
                style={{
                  width: "50%",
                }}
                value={moment(postprod.hod_date).format("YYYY-MM-DDTHH:MM")}
                onChange={(e) => {
                  updatePostProd({ hod_date: e.target.value });
                }}
                disabled={
                  !props.loggedInHod || postprod.hodStatus == "HOD_APPROVED"
                }
              />
            </td>
            <td>
              <Select
                // options={qaLov}
                // onChange={ppOnchangeSign3}
                value={postprod.qa_sign}
                style={{
                  width: "50%",
                }}
                placeholder="Choose QA"
                disabled={
                  !props.loggedInQa || postprod.qaStatus == "QA_APPROVED"
                }
              />
              <Input
                type="datetime-local"
                style={{
                  width: "50%",
                }}
                value={moment(postprod.qa_date).format("YYYY-MM-DDTHH:MM")}
                onChange={(e) => {
                  updatePostProd({ qa_date: e.target.value });
                }}
                disabled={
                  !props.loggedInQa || postprod.qaStatus == "QA_APPROVED"
                }
              />
            </td>
          </tr>
        </table>{" "}
      </>
      {contextHolder}
    </div>
  );
};

export default Post_Production;
