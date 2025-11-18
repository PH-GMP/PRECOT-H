/* eslint-disable use-isnan */
/* eslint-disable eqeqeq */
import { Button, Empty, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Product_Reconciliation = (props) => {
  const [inputQuantity, setInputQuantity] = useState("");
  const [outputQuantity, setOutputQuantity] = useState("");
  const [noData, setNoData] = useState(false);
  const token = localStorage.getItem("token")
  const a = localStorage.getItem("prod_start_date");
  console.log("Start Date", a);
  const b = localStorage.getItem("prod_end_date");
  console.log(b);
  const [isDisabled, setIsDisabled] = useState(false);
  const [pdeData, setPdeData] = useState({
    input_quantity: "",
    output_quantity: "",
    yield_quantity: "",
  });


  const handleSubmit = async () => {
    const params = {
      batchNo: props.batchNo,
      order_no: props.orderNo,
      input_quantity: pdeData.input_quantity,
      output_quantity: pdeData.output_quantity,
      yield_quantity: pdeData.yield_quantity,
    };

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/punching/bmr/SubmitProductReconillation`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        message.success("Product reconciliation submitted successfully.");
        // const fetchSavedData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/punching/bmr/getReconillationByBatchNo`,
            {
              params: {
                batchNo: props.batchNo,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200 && response.data) {
            if (response.data.length === 1) {
              setIsDisabled(true);
            } else {
              setIsDisabled(false);
            }

            const { input_quantity, output_quantity, yield_quantity } =
              response.data[0];
            setPdeData({
              input_quantity: input_quantity || "",
              output_quantity: output_quantity || "",
              yield_quantity: yield_quantity || "",
            });
          } else {
            message.warning("No reconciliation data found for the batch.");
          }
        } catch (error) {
          console.log("error", error)
        }

      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to submit reconciliation."
      );
    }
  };

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/punching/bmr/getReconillationByBatchNo`,
          {
            params: {
              batchNo: props.batchNo,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data) {
          if (response.data.length === 1) {
            setIsDisabled(true);
          } else {
            fetchData()
            setIsDisabled(false);
          }

          const { input_quantity, output_quantity, yield_quantity } =
            response.data[0];
          setPdeData({
            input_quantity: input_quantity || "",
            output_quantity: output_quantity || "",
            yield_quantity: yield_quantity || "",
          });
        } else {
          message.warning("No reconciliation data found for the batch.");
        }
      } catch (error) {
        console.log("error", error)
      }
    };

    if (props.batchNo) {
      fetchSavedData();
    }
  }, [props.batchNo, token]);

  const handlePde = async (batchNo, startDate, endDate) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/punching/bmr/productReconillation?order=${props.orderNo
        }&batchNo=${batchNo}&fromdate=${startDate}&todate=${endDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      if (response.data) {
        setPdeData((prevState) => ({
          ...prevState,
          input_quantity: response.data.input,
          output_quantity: response.data.output,
          yield_quantity: response.data.yield,
        }));
      }
    } catch (error) {
      // message.error(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/punching/bmr/getProductionDetails?order=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length == 0) {
        message.warning("No data found");
      } else if (response.data.length > 0) {
        const data = response.data[0];
        const manufactureStartDate = data.manufactureStartDate
          ? data.manufactureStartDate.split("T")[0]
          : "";
        const manufactureEndDate = data.manufactureEndDate
          ? data.manufactureEndDate.split("T")[0]
          : "";
        handlePde(data.batchNo, manufactureStartDate, manufactureEndDate);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div>

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
              value={pdeData.input_quantity}
              onChange={(e) => {
                setPdeData((prev) => ({
                  ...prev,
                  input_quantity: e.target.value,
                }))
                let yieldValue = "";
                if (e.target.value && pdeData.output_quantity) {
                  yieldValue =
                    (parseFloat(pdeData.output_quantity) /
                      parseFloat(e.target.value)) *
                    100;
                  setPdeData((prev) => {
                    return {
                      ...prev,
                      yield_quantity: yieldValue.toFixed(2),
                    };
                  });
                }
              }
              }
              className="inp-new"
            />
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            {" "}
            OutPut Quantity (Kgs){" "}
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            <input
              value={pdeData.output_quantity}
              onChange={(e) => {
                setPdeData((prev) => ({
                  ...prev,
                  output_quantity: e.target.value,
                }))
                let yieldValue = "";
                if (e.target.value && pdeData.input_quantity) {
                  yieldValue =
                    (parseFloat(e.target.value) /
                      parseFloat(pdeData.input_quantity)) *
                    100;
                  setPdeData((prev) => {
                    return {
                      ...prev,
                      yield_quantity: yieldValue.toFixed(2),
                    };
                  });
                }
              }
              }
              className="inp-new"
            />
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            % Yield (Specification: 55% to 70%)
          </td>
          <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
            <input
              value={pdeData.yield_quantity}
              onChange={(e) =>
                setPdeData((prev) => ({
                  ...prev,
                  yield_quantity: e.target.value,
                }))
              }
              className="inp-new"
            />
          </td>
        </tr>
      </table>
      <div style={{ marginTop: "1em", textAlign: "end" }}>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Product_Reconciliation;
