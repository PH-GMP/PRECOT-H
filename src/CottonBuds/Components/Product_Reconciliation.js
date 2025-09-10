 
import { Empty } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Product_Reconciliation = (props) => {
  const [inputQuantity, setInputQuantity] = useState("");
  const [outputQuantity, setOutputQuantity] = useState("");
  const [calculation, setCalculation] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    console.log("fcgh", props.batchNo);
     axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/productReconillation?orderNumber=${
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
         console.log("Prod details", response.data);
        setInputQuantity(response.data.inputQuantity);
        setOutputQuantity(response.data.outputQuantity);
        setCalculation(response.data.yield);
        setNoData(false);
 
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
                 value={inputQuantity}
                 className="inp-new"
              />
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              {" "}
              OutPut Quantity (Kgs){" "}
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              <input
                 value={outputQuantity}
                 className="inp-new"
              />
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              % Yield (Specification: 55% to 70%)
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              <input
                 value={calculation}
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
