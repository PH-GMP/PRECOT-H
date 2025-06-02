import { Button, Empty, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Product_Reconciliation = (props) => {
  const token = localStorage.getItem("token");
  const [isDisabled, setIsDisabled] = useState(false);
 
  const [pdeData, setPdeData] = useState({
    input_quantity: "",
    output_quantity: "",
    yield_quantity: "",
  });

  const handleSubmit = async () => {
    const params = {
      batchNo: props.batchNo,
      order_no: "ORDER456",
      form_no: "WoolRoll",
      input_quantity: pdeData.input_quantity,
      output_quantity: pdeData.output_quantity,
      yield_quantity: pdeData.yield_quantity,
    };

    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/CottonWoolRall/SubmitProductReconillation`,
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
              `${ API.prodUrl}/Precot/api/CottonWoolRall/getReconillationByBatchNo`,
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

              const { input_quantity, output_quantity, yield_quantity } = response.data;
              setPdeData({
                input_quantity: input_quantity || "",
                output_quantity: output_quantity || "",
                yield_quantity: yield_quantity || "",
              });
            } else {
              message.warning("No reconciliation data found for the batch.");
            }
          } catch (error) {
            message.error(
              error.response?.data?.message ||
                "Failed to fetch reconciliation data."
            );
          }
         
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to submit reconciliation."
      );
    }
  };

  useEffect(() => {
    setPdeData({
      output: "",
      input: "",
      yield: "",
    });
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/cottonBall/01.GetProductionDetails?batch_no=${props.batchNo}`,
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
          handlePde(data.order_no, data.start_date, data.end_date);
        }
      } catch (error) {
        message.error(error.response.data.message);
      }
    };
    fetchData();
  }, [props.batchNo]);

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/CottonWoolRall/getReconillationByBatchNo`,
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

          const { input_quantity, output_quantity, yield_quantity } = response.data;
          setPdeData({
            input_quantity: input_quantity || "",
            output_quantity: output_quantity || "",
            yield_quantity: yield_quantity || "",
          });
        } else {
          message.warning("No reconciliation data found for the batch.");
        }
      } catch (error) {
        message.error(
          error.response?.data?.message ||
            "Failed to fetch reconciliation data."
        );
      }
    };

    if (props.batchNo) {
      fetchSavedData();
    }
  }, [props.batchNo, token]);

  const handlePde = async (orderNo, startDate, endDate) => {
    if (orderNo && startDate && endDate) {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/cottonBall/productReconillation?order=${orderNo}&fromdate=${startDate}&todate=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setPdeData((prevState) => ({
            ...prevState,
            input: response.data.input,
            output: response.data.output,
            yield: response.data.yield,
          }));
        }
      } catch (error) {
        // message.error(error.response.data.message);
      }
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
              {/* {pdeData.input} */}
              <input
                  // type="number"
                  value={pdeData.input_quantity}
                  onChange={(e) =>
                    setPdeData((prev) => ({
                      ...prev,
                      input_quantity: e.target.value,
                    }))
                  }
                  className="inp-new"
                  readOnly={isDisabled}
                />
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              {" "}
              OutPut Quantity (Kgs){" "}
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              {/* {pdeData.output} */}
              <input
                  // type="number"
                  value={pdeData.output_quantity}
                  onChange={(e) =>
                    setPdeData((prev) => ({
                      ...prev,
                      output_quantity: e.target.value,
                    }))
                  }
                  className="inp-new"
                  readOnly={isDisabled}
                />
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              % Yield (Specification: 80% to 100%)
            </td>
            <td colSpan="1" style={{ padding: "0.7em", textAlign: "center" }}>
              {/* {pdeData.yield} */}
              <input
                  // type="number"
                  value={pdeData.yield_quantity}
                  onChange={(e) =>
                    setPdeData((prev) => ({
                      ...prev,
                      yield_quantity: e.target.value,
                    }))
                  }
                  className="inp-new"
                  readOnly={isDisabled}
                />
            </td>
          </tr>
        </table>
        <div style={{ marginTop: "1em", textAlign: "end" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={isDisabled}
            // disabled={
            //   !pdeData.input_quantity ||
            //   !pdeData.output_quantity ||
            //   !pdeData.yield_quantity
            // }
          >
            Submit
          </Button>
        </div>
      </div>
  );
};

export default Product_Reconciliation;
