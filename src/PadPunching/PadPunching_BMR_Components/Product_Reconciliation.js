/* eslint-disable use-isnan */
/* eslint-disable eqeqeq */
import { Button, Empty, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Product_Reconciliation = (props) => {
  const [inputQuantity, setInputQuantity] = useState("");
  const [outputQuantity, setOutputQuantity] = useState("");
  const [calculation, setCalculation] = useState("");
  const [noData, setNoData] = useState(false);
   const a=localStorage.getItem("prod_start_date")
  console.log("Start Date",a)
  const b=localStorage.getItem("prod_end_date")
  console.log(b)

  useEffect(() => {
    console.log("fcgh", props.batchNo);
    // /Precot/api/punching/bmr/productReconillation?order=800017415&batchNo=95134010-1&fromdate=2023-07-23&todate=2023-07-25
    axios
      .get(
        `${API.prodUrl}/Precot/api/punching/bmr/productReconillation?order=${
          props.orderNo
        }&batchNo=${props.batchNo}&fromdate=${localStorage.getItem(
          "prod_start_date"
        )}&todate=${localStorage.getItem("prod_end_date")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("ddd", response.data);
        // if (response.data.length > 0) {
        console.log("Prod details", response.data);
        setInputQuantity(response.data.input);
        setOutputQuantity(response.data.output);
        setCalculation(
          Math.abs((response.data.input / response.data.output) * 100)
        );
        setNoData(false);
        // } else {
        //   setNoData(true);
        // }
        // message.success("Closed BMR Values Fetched Successfully");
      })
      .catch((err) => {
        console.log("ERRor", err);
      });
  }, []);

  console.log("calc", calculation);

  return (
    <div>
      {noData ? (
        <Empty />
      ) : (
        <table
          style={{
            width: "100%",
          }}
        >
          <th colSpan="6">
            PRODUCT RECONCILIATION: <br></br>
            Yield in % = (Output Qty / Input Qty) x 100{" "}
          </th>
          <tr>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              Input Quantity (Kgs){" "}
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              <input
                // type="number"
                value={inputQuantity}
                // onChange={(e) => setInputQuantity(e.target.value)}
                className="inp-new"
              />
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              {" "}
              OutPut Quantity (Kgs){" "}
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              <input
                // type="number"
                value={outputQuantity}
                // onChange={(e) => setOutputQuantity(e.target.value)}
                className="inp-new"
              />
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              % Yield (Specification: 55% to 70%)
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              <input
                // type="number"
                value={calculation}
                // onChange={(e) => setCalculation(e.target.value)}
                className="inp-new"
              />
            </td>
          </tr>
        </table>
      )}
    </div>
  );
};

export default Product_Reconciliation;
