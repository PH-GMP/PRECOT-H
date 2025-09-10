import { Button, Input, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Product_Release = (props) => {
  const batchNo = props.batchNo.split("-")[0];
  console.log("Api Called", batchNo);
  const [ProductRelease, setProductRelease] = useState({
    qaName: "",
    qaManager: "",
    qaDate: "",
    qaManagerDate: "",
  });
  const [disabled, setDisabled] = useState(false);
  const updateProductRelease = (updates) => {
    setProductRelease((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
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

  const role = localStorage.getItem("role");
  const username =
  role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
  role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/cottonPleat/14.GetProductRelease?batch_no=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Product Release", res.data);
        if (res.data.length > 0) {
          updateProductRelease({
            qaName: res.data[0].chk_qa_sign,
            qaManager: res.data[0].apr_qa_sign,
            qaDate: res.data[0].chk_qa_date,
            qaManagerDate: res.data[0].apr_qa_date,
          });
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [props.orderNo]);
  const submitQa = () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    if (
      ProductRelease.qaDate == "" ||
      ProductRelease.qaManager == "" ||
      ProductRelease.qaManagerDate == "" ||
      ProductRelease.qaName == ""
    ) {
      message.error("Please select all fields");
      return;
    }
    const payload = {
      batch_no: props.batchNo,
      order_no: props.orderNo,
      chk_qa_name: "",
      chk_qa_date: ProductRelease.qaDate,
      chk_qa_time: "",
      chk_qa_sign: ProductRelease.qaName,
      apr_qa_name: "",
      apr_qa_date: ProductRelease.qaManagerDate,
      apr_qa_time: "",
      apr_qa_sign: ProductRelease.qaManager,
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/cottonPleat/14.SubmitProductRelease`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Product Release Submitted Successfully");
        axios
          .get(
            `${API.prodUrl}/Precot/api/cottonPleat/14.GetProductRelease?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("Product Release", res.data);
            if (res.data.length > 0) {
              updateProductRelease({
                qaName: res.data[0].chk_qa_sign,
                qaManager: res.data[0].apr_qa_sign,
                qaDate: res.data[0].chk_qa_date,
                qaManagerDate: res.data[0].apr_qa_date,
              });
              setDisabled(true);
            } else {
              setDisabled(false);
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onChange1 = (values) => {
    updateProductRelease({
      qaName: values,
    });
  };

  const onChange2 = (values) => {
    updateProductRelease({
      qaManager: values,
    });
  };
  return (
    <div>
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
            display: !props.loggedInQa || disabled ? "none" : "block",
          }}
          shape="round"
          onClick={submitQa}
        >
          Submit
        </Button>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <th colSpan="5">
          The material produced through the execution of this Batch Record shall
          be archival by QA according to Product Release Procedure
          (SOP-QAD01-D-61) and documented as per the Format: QAD01/F-34
        </th>
        <tr>
          <td
            style={{
              padding: "1em",
            }}
          ></td>
          <td
            style={{
              padding: "1em",
            }}
          >
            Checked by QA
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
              value={ProductRelease.qaName || username}
              onChange={onChange1}
              options={props.qaLov}
              style={{
                width: "100%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
          </td>
          <td>
            <Select
              value={ProductRelease.qaManager || username}
              onChange={onChange2}
              options={props.qaLov}
              style={{
                width: "100%",
              }}
              disabled={!props.loggedInQa || disabled}
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
              value={ProductRelease.qaName || username}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
            <Input
              type="datetime-local"
              value={ProductRelease.qaDate}
              onChange={(e) => updateProductRelease({ qaDate: e.target.value })}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
              max={todayDateTime}
            />
          </td>
          <td>
            <Select
              value={ProductRelease.qaManager || username}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
            <Input
              type="datetime-local"
              value={ProductRelease.qaManagerDate}
              onChange={(e) =>
                updateProductRelease({ qaManagerDate: e.target.value })
              }
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
              max={todayDateTime}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Product_Release;
