import { Button, Empty, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Product_Reconciliation = (props) => {
  const [inputQuantity, setInputQuantity] = useState("");
  const [outputQuantity, setOutputQuantity] = useState("");

  const [calculation, setCalculation] = useState();
  const [noData, setNoData] = useState(false);
  const [freeze, setFreeze] = useState(false);
  let batch_qty = localStorage.getItem("batch_qty");

  useEffect(() => {
    console.log("localStorage.getIte ", localStorage.getItem("batch_qty"));
    setOutputQuantity(batch_qty);
  }, [batch_qty]);

  useEffect(() => {
    const handleStorageChange = () => {
      setOutputQuantity(localStorage.getItem("batch_qty"));
    };

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Also update when component mounts
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (props.orderNo.length <= 0) {
      setNoData(true);
      message.warning("No Order Number Selected");
    } else {
      setInputQuantity("");
      setCalculation("");

      console.log("fcgh", props.orderNo);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/spunlace/summary/08.GetProductReconciliation?order_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.length > 0) {
            setFreeze(true);
            console.log("Prod details", response.data);
            setInputQuantity(response.data[0].input_quantity || "");
            setCalculation(response.data[0].calculation);

            //  console.log("54g45g",(outputQuantity / response.data[0].input_quantity) * 100)
            setNoData(false);
          } else {
            setNoData(true);
            setInputQuantity("");
            setFreeze(false);
          }
          // message.success("Closed BMR Values Fetched Successfully");
        })
        .catch((err) => {
          console.log("ERRor", err);
        });
    }
  }, [props.batchNo]);

  const saveData = () => {
    //  Precot/api/spunlace/summary/08.SaveProductReconciliation
    const payload = {
      id: "",
      order_no: props.orderNo,
      form_no: "PRD02/F-26",
      input_quantity: inputQuantity,
      output_quantity: outputQuantity || localStorage.getItem("batch_qty"),
      calculation: calculation,
      batchNo: props.batchNo,
    };
    console.log("payload", payload);
    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/08.SaveProductReconciliation`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        message.success("Product Reconcilliation Submitted");
        axios
          .get(
            `${ API.prodUrl}/Precot/api/spunlace/summary/08.GetProductReconciliation?order_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.length > 0) {
              setFreeze(true);
              console.log("Prod details", response.data);
              setInputQuantity(response.data[0].input_quantity || "");
              setCalculation(response.data[0].calculation);
              setOutputQuantity(localStorage.getItem("batch_qty"));

              //  console.log("54g45g",(outputQuantity / response.data[0].input_quantity) * 100)
              setNoData(false);
            } else {
              setInputQuantity("");
              setNoData(true);
              setFreeze(false);
            }
            // message.success("Closed BMR Values Fetched Successfully");
          })
          .catch((err) => {
            console.log("ERRor", err);
          });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  // console.log("calc", calculation);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          onClick={saveData}
          style={{
            marginBottom: "1em",
            display: freeze ? "none" : "block",
          }}
        >
          Save Reconciliation
        </Button>
      </div>
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
              onChange={(e) => {
                setInputQuantity(e.target.value);

                let batchQty =
                  outputQuantity || localStorage.getItem("batch_qty");
                let calculatedValue =
                  batchQty && e.target.value
                    ? (parseFloat(batchQty) / parseFloat(e.target.value)) * 100
                    : "";

                setCalculation(isNaN(calculatedValue) ? 0 : calculatedValue);
              }}
              className="inp-new"
              disabled={freeze}
            />
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            {" "}
            OutPut Quantity (Kgs){" "}
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            <input
              value={outputQuantity == "null" ? "" : outputQuantity}
              className="inp-new"
              disabled={true}
            />
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            % Yield (Specification: 80% to 100%)
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            <input
              value={calculation}
              className="inp-new"
              disabled={true}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Product_Reconciliation;
