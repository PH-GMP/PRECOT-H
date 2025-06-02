import { Button, Input, message, Select } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
const Post_Production = (props) => {
  const role = localStorage.getItem("role");
  const usernameHOD =
    role === "ROLE_HOD" || role === "ROLE_DESIGNEE"
      ? localStorage.getItem("username")
      : "";
  const usernameQA = role === "ROLE_QA" ? localStorage.getItem("username") : "";
  const usernameSupervisor =
    role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");
  const [currentDateTimeHOD, setCurrentDateTimeHOD] = useState("");

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
    if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      const formattedDateHOD = formatDateTime(now);
      setCurrentDateTimeHOD(formattedDateHOD);
    }
    console.log("usernameHOD", usernameHOD);
  }, [role]);

  const [messageApi, contextHolder] = useMessage();
  const [postprod, setPostProd] = useState({
    supervisor_sign: "",
    hod_sign: "",
    qa_sign: "",
    supervisor_date: "",
    hod_date: "",
    qa_date: "",
    id: "",
    status: "",
  });
  const [postprodvalidate, setPostProdvalidate] = useState({
    supervisor_sign: "",
    hod_sign: "",
    qa_sign: "",
    supervisor_date: "",
    hod_date: "",
    qa_date: "",
    status: "",
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
    console.log(props.orderNo);
    console.log(props.batchNo);
    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/summary/12.GetPostProductionReview?order_no=${props.batchNo}`,
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
            res.data[0].qa_sign.length != 0
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
  }, [props.batchNo]);

  const sendPostProd = () => {
    const payload = {
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      sup_sign: postprod.supervisor_sign || usernameSupervisor,
      sup_date: postprod.supervisor_date || currentDateTime,
      sup_time: "",
      designee_sign: postprod.hod_sign || usernameHOD,
      designee_date: postprod.hod_date || currentDateTimeHOD,
      designee_time: "",
      qa_sign: postprod.qa_sign || usernameQA,
      qa_date: postprod.qa_date || currentDateTimeQA,
      qa_time: "",
      batchNo: props.batchNo,
      status: postprod.status,
    };
    const payload_2 = {
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      sup_sign: postprod.supervisor_sign || usernameSupervisor,
      sup_date: postprod.supervisor_date || currentDateTime,
      sup_time: "",
      designee_sign: postprod.hod_sign || usernameHOD,
      designee_date: postprod.hod_date || currentDateTimeHOD,
      designee_time: "",
      qa_sign: postprod.qa_sign || usernameQA,
      qa_date: postprod.qa_date || currentDateTimeQA,
      qa_time: "",
      id: postprod.id,
      batchNo: props.batchNo,
      status: postprod.status,
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/summary/12.SubmitPostProductionReview`,
        payload_2,
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
            `${API.prodUrl}/Precot/api/spunlace/summary/12.GetPostProductionReview?order_no=${props.batchNo}`,
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
                res.data[0].qa_sign.length != 0
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
              });
              updatePostProdValidate({
                supervisor_sign: res.data[0].sup_sign,
                hod_sign: res.data[0].designee_sign,
                qa_sign: res.data[0].qa_sign,
                supervisor_date: res.data[0].sup_date,
                hod_date: res.data[0].designee_date,
                qa_date: res.data[0].qa_date,
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
          <div
            style={{
              display: "flex",
            }}
          >
            {/* <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: 
              (props.loggedInSupervisor && postprodvalidate.supervisor_date.length > 0 && postprodvalidate.supervisor_sign.length > 0) || 
              (props.loggedInQa && postprodvalidate.qa_date.length > 0 && postprodvalidate.qa_sign.length > 0) || 
              (props.loggedInHod && postprodvalidate.hod_date.length > 0 && postprodvalidate.hod_sign.length > 0) 
                ? "none" 
                : "block"
            }}
            shape="round"
            onClick={sendPostProd}
          >
            Save
          </Button> */}
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
                  (props.loggedInQa &&
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
                value={postprod.hod_sign || usernameHOD}
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
                value={postprod.qa_sign || usernameQA}
                style={{
                  width: "100%",
                }}
                placeholder="Choose QA"
                disabled={
                  !props.loggedInQa ||
                  (props.loggedInQa &&
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
                value={postprod.supervisor_date || currentDateTime}
                onChange={(e) => {
                  updatePostProd({ supervisor_date: e.target.value });
                }}
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
                // options={hodLov}
                // onChange={ppOnchangeSign2}
                value={postprod.hod_sign || usernameHOD}
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
                value={postprod.hod_date || currentDateTimeHOD}
                onChange={(e) => {
                  updatePostProd({ hod_date: e.target.value });
                }}
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
                // options={qaLov}
                // onChange={ppOnchangeSign3}
                value={postprod.qa_sign || usernameQA}
                style={{
                  width: "50%",
                }}
                placeholder="Choose QA"
                disabled={
                  !props.loggedInQa ||
                  (props.loggedInQa &&
                    postprodvalidate.qa_date.length > 0 &&
                    postprodvalidate.qa_sign.length > 0)
                }
              />
              <Input
                type="datetime-local"
                style={{
                  width: "50%",
                }}
                value={postprod.qa_date || currentDateTimeQA}
                onChange={(e) => {
                  updatePostProd({ qa_date: e.target.value });
                }}
                disabled={
                  !props.loggedInQa ||
                  (props.loggedInQa &&
                    postprodvalidate.qa_date.length > 0 &&
                    postprodvalidate.qa_sign.length > 0)
                }
              />
            </td>
          </tr>
        </table>
      </>
      {contextHolder}
    </div>
  );
};

export default Post_Production;
