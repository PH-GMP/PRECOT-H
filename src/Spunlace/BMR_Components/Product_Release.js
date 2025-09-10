import { Button, Input, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Product_Release = (props) => {
  const role = localStorage.getItem("role");

  const usernameQA = role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");

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

    if (role === "ROLE_QA") {
      const formattedDateQA = formatDateTime(now);
      setCurrentDateTimeQA(formattedDateQA);
    }
  }, [role]);

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

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/summary/14.GetProductRelease?order_no=${props.batchNo}`,
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
  }, [props.batchNo]);
  const submitQa = () => {
    // if (
    //   ProductRelease.qaDate == "" ||
    //   ProductRelease.qaManager == "" ||
    //   ProductRelease.qaManagerDate == "" ||
    //   ProductRelease.qaName == ""
    // ) {
    //   message.error("Please select all fields");
    // }
    const payload = {
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      batchNo: props.batchNo,
      chk_qa_name: "",
      chk_qa_date: ProductRelease.qaDate || currentDateTimeQA,
      chk_qa_time: "",
      chk_qa_sign: ProductRelease.qaName || usernameQA,
      apr_qa_name: "",
      apr_qa_date: ProductRelease.qaManagerDate || currentDateTimeQA,
      apr_qa_time: "",
      apr_qa_sign: ProductRelease.qaManager || usernameQA,
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/summary/14.SaveProductRelease`,
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
            `${API.prodUrl}/Precot/api/spunlace/summary/14.GetProductRelease?order_no=${props.batchNo}`,
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
              value={ProductRelease.qaName || usernameQA}
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
              value={ProductRelease.qaManager || usernameQA}
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
              value={ProductRelease.qaName || usernameQA}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
            <Input
              type="datetime-local"
              value={ProductRelease.qaDate || currentDateTimeQA}
              onChange={(e) => updateProductRelease({ qaDate: e.target.value })}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
          </td>
          <td>
            <Select
              value={ProductRelease.qaManager || usernameQA}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
            <Input
              type="datetime-local"
              value={ProductRelease.qaManagerDate || currentDateTimeQA}
              onChange={(e) =>
                updateProductRelease({ qaManagerDate: e.target.value })
              }
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Product_Release;
