import { Button, Input, message, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
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

  const role = localStorage.getItem("role");

  const username =
    role === "QA_MANAGER" || role === "QA_DESIGNEE"
      ? localStorage.getItem("username")
      : "";

  const usernameSupervisor =
    role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  const usernameHod =
    role === "ROLE_HOD" ? localStorage.getItem("username") : "";

  const todayDateTime = getCurrentDateTime();
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
        `${API.prodUrl}/Precot/api/CottonWoolRall/12.GetPostProductionReview?batch_no=${props.batchNo}`,
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
            supervisor_sign: res.data[0].sup_sign,
            hod_sign: res.data[0].designee_sign,
            qa_sign: res.data[0].qa_sign,
            supervisor_date: res.data[0].sup_date,
            hod_date: res.data[0].designee_date,
            qa_date: res.data[0].qa_date,
            id: res.data[0].id,
            status: res.data[0].status,
          });
          updatePostProdValidate({
            supervisor_sign: res.data[0].sup_sign,
            hod_sign: res.data[0].designee_sign,
            qa_sign: res.data[0].qa_sign,
            supervisor_date: res.data[0].sup_date,
            hod_date: res.data[0].designee_date,
            qa_date: res.data[0].qa_date,
            status: res.data[0].status,
          });
        } else {
          // If the response is empty, reset the state
          setNewSave(false);
          updatePostProd({
            supervisor_sign: "",
            hod_sign: "",
            qa_sign: "",
            supervisor_date: "",
            hod_date: "",
            qa_date: "",
            id: "",
            status: "",
          });
          updatePostProdValidate({
            supervisor_sign: "",
            hod_sign: "",
            qa_sign: "",
            supervisor_date: "",
            hod_date: "",
            qa_date: "",
            status: "",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [props.batchNo]);

  const sendPostProd = () => {
    const role = localStorage.getItem("role");

    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }

    const payload = {
      batch_no: props.batchNo,
      order_no: props.orderNo,
      sup_sign: postprod.supervisor_sign || usernameSupervisor,
      sup_date: postprod.supervisor_date,
      sup_time: "",
      designee_sign: postprod.hod_sign || usernameHod,
      designee_date: postprod.hod_date,
      designee_time: "",
      qa_sign: postprod.qa_sign || username,
      qa_date: postprod.qa_date,
      qa_time: "",
      status: postprod.status,
    };
    const payload_2 = {
      batch_no: props.batchNo,
      order_no: props.orderNo,
      sup_sign: postprod.supervisor_sign || usernameSupervisor,
      sup_date: postprod.supervisor_date,
      sup_time: "",
      designee_sign: postprod.hod_sign || usernameHod,
      designee_date: postprod.hod_date,
      designee_time: "",
      qa_sign: postprod.qa_sign || username,
      qa_date: postprod.qa_date,
      qa_time: "",
      id: postprod.id,
      status: postprod.status,
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/CottonWoolRall/12.SubmitPostProductionReview`,
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
        axios
          .get(
            `${API.prodUrl}/Precot/api/CottonWoolRall/12.GetPostProductionReview?batch_no=${props.batchNo}`,
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
              if (
                res.data[0].sup_sign.length != 0 ||
                res.data[0].sup_date.length != 0 ||
                res.data[0].designee_date.length != 0 ||
                res.data[0].designee_sign.length != 0 ||
                res.data[0].qa_date.length != 0 ||
                res.data[0].qa_sign.length != 0 ||
                res.data[0].status != 0
              ) {
                //alert("jhgh")
              }
              updatePostProd({
                supervisor_sign: res.data[0].sup_sign,
                hod_sign: res.data[0].designee_sign,
                qa_sign: res.data[0].qa_sign,
                supervisor_date: res.data[0].sup_date,
                hod_date: res.data[0].designee_date,
                qa_date: res.data[0].qa_date,
                id: res.data[0].id,
                status: res.data[0].status,
              });
              updatePostProdValidate({
                supervisor_sign: res.data[0].sup_sign,
                hod_sign: res.data[0].designee_sign,
                qa_sign: res.data[0].qa_sign,
                supervisor_date: res.data[0].sup_date,
                hod_date: res.data[0].designee_date,
                qa_date: res.data[0].qa_date,
                status: res.data[0].status,
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
                  postprodvalidate.supervisor_date.length > 0 &&
                  postprodvalidate.supervisor_sign.length > 0) ||
                (props.loggedInQAManandQAdes &&
                  postprodvalidate.qa_date.length > 0 &&
                  postprodvalidate.qa_sign.length > 0) ||
                (props.loggedInHod &&
                  postprodvalidate.hod_date.length > 0 &&
                  postprodvalidate.hod_sign.length > 0)
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
                value={postprod.supervisor_sign || usernameSupervisor}
                style={{
                  width: "100%",
                }}
                placeholder="Choose Production"
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInSupervisor &&
                    postprodvalidate.supervisor_date.length > 0 &&
                    postprodvalidate.supervisor_sign.length > 0)
                }
              />
            </td>
            <td>
              <Select
                options={props.hodLov}
                onChange={onChange2}
                value={postprod.hod_sign || usernameHod}
                style={{
                  width: "100%",
                }}
                placeholder="Choose HOD"
                disabled={
                  !props.loggedInHod ||
                  (props.loggedInHod &&
                    postprodvalidate.hod_date.length > 0 &&
                    postprodvalidate.hod_sign.length > 0)
                }
              />
            </td>
            <td>
              <Select
                options={props.qaLov}
                onChange={onChange3}
                value={postprod.qa_sign || username}
                style={{
                  width: "100%",
                }}
                placeholder="Choose QA"
                disabled={
                  !props.loggedInQAManandQAdes ||
                  (props.loggedInQAManandQAdes &&
                    postprodvalidate.qa_date.length > 0 &&
                    postprodvalidate.qa_sign.length > 0)
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
                value={postprod.supervisor_sign || usernameSupervisor}
                style={{
                  width: "50%",
                }}
                placeholder="Choose Production"
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInSupervisor &&
                    postprodvalidate.supervisor_date.length > 0 &&
                    postprodvalidate.supervisor_sign.length > 0)
                }
              />
              <Input
                type="datetime-local"
                style={{
                  width: "50%",
                }}
                value={postprod.supervisor_date}
                onChange={(e) => {
                  updatePostProd({ supervisor_date: e.target.value });
                }}
                disabled={
                  !props.loggedInSupervisor ||
                  (props.loggedInSupervisor &&
                    postprodvalidate.supervisor_date.length > 0 &&
                    postprodvalidate.supervisor_sign.length > 0)
                }
                max={todayDateTime}
              />
            </td>
            <td>
              <Select
                // options={hodLov}
                // onChange={ppOnchangeSign2}
                value={postprod.hod_sign || usernameHod}
                style={{
                  width: "50%",
                }}
                placeholder="Choose Hod"
                disabled={
                  !props.loggedInHod ||
                  (props.loggedInHod &&
                    postprodvalidate.hod_date.length > 0 &&
                    postprodvalidate.hod_sign.length > 0)
                }
              />
              <Input
                type="datetime-local"
                style={{
                  width: "50%",
                }}
                value={postprod.hod_date}
                onChange={(e) => {
                  updatePostProd({ hod_date: e.target.value });
                }}
                disabled={
                  !props.loggedInHod ||
                  (props.loggedInHod &&
                    postprodvalidate.hod_date.length > 0 &&
                    postprodvalidate.hod_sign.length > 0)
                }
                max={todayDateTime}
              />
            </td>
            <td>
              <Select
                // options={qaLov}
                // onChange={ppOnchangeSign3}
                value={postprod.qa_sign || username}
                style={{
                  width: "50%",
                }}
                placeholder="Choose QA"
                disabled={
                  !props.loggedInQAManandQAdes ||
                  (props.loggedInQAManandQAdes &&
                    postprodvalidate.qa_date.length > 0 &&
                    postprodvalidate.qa_sign.length > 0)
                }
              />
              <Input
                type="datetime-local"
                style={{
                  width: "50%",
                }}
                value={postprod.qa_date}
                onChange={(e) => {
                  updatePostProd({ qa_date: e.target.value });
                }}
                disabled={
                  !props.loggedInQAManandQAdes ||
                  (props.loggedInQAManandQAdes &&
                    postprodvalidate.qa_date.length > 0 &&
                    postprodvalidate.qa_sign.length > 0)
                }
                max={todayDateTime}
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
