import { Button, Input, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
import moment from "moment/moment";

const Product_Release = (props) => {
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
    getData()
  }, [props.batchNo]);

  const getData = () => {
    axios
      .get(
        `${ API.prodUrl}/Precot/api/buds/bmr/getProductRelease?batchNo=${props.batchNo}`,
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
            qaName: res.data[0].checkerSign,
            qaManager: res.data[0].approverSign,
            qaDate: res.data[0].checkerDate,
            qaManagerDate: res.data[0].approverDate,
          });
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
  const submitQa = () => {
    if (
      ProductRelease.qaDate == "" ||
      ProductRelease.qaManager == "" ||
      ProductRelease.qaManagerDate == "" ||
      ProductRelease.qaName == ""
    ) {
      message.error("Please select all fields");
    }
    const payload = {
      id:"",
      orderNo: props.orderNo,
      batchNo: props.batchNo,
      department: "Cotton Buds",
      checkerSign: ProductRelease.qaName,
      checkerName: ProductRelease.qaName,
      approverName: ProductRelease.qaManager,
      approverSign: ProductRelease.qaManager,
      checkerDate: ProductRelease.qaDate,
      approverDate: ProductRelease.qaManagerDate,
      approverStatus: "",
      checkerStatus: ""
    };

    axios
      .post(`${ API.prodUrl}/Precot/api/buds/bmr/submitProductRelease`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Response", res.data);
        message.success("Product Release Submitted Successfully");
        getData();
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
              value={ProductRelease.qaName}
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
              value={ProductRelease.qaManager}
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
              value={ProductRelease.qaName}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
            <Input
              type="datetime-local"
              value={moment(ProductRelease.qaDate).format("YYYY-MM-DDTHH:MM")}
              //"YYYY-MM-DDTHH:MM"
              onChange={(e) => updateProductRelease({ qaDate: e.target.value })}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
          </td>
          <td>
            <Select
              value={ProductRelease.qaManager}
              style={{
                width: "50%",
              }}
              disabled={!props.loggedInQa || disabled}
            />
            <Input
              type="datetime-local"
              value={moment(ProductRelease.qaManagerDate).format(
                "YYYY-MM-DDTHH:MM"
              )}
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
