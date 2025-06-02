import { Button, message, Radio } from "antd";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
import axios from "axios";

const List_Of_Enclosure = (props) => {
  const [state, setState] = useState({
    baleConsumption: "",
    PE_calibration_report: "",
    freetext: "",
    freetextRemarks: "",
  });
  const [disableBtn,setDisableBtn] = useState(false);
  const updateState = (updates) => {
    setState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  
  useEffect(() => {
    axios
      .get(
        `${ API.prodUrl}/Precot/api/spunlace/summary/11.GetListOFEnclousers?order_no=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res",res.data)
        if(res.data.length > 0){
          setDisableBtn(true)
          updateState({
            baleConsumption:res.data[0].remarks_1,
            PE_calibration_report:res.data[0].remarks_2
          })
        }else{
          setDisableBtn(false)
        }
      }).catch((err) => {
        console.log("er",err)
      })
  },[props.batchNo])

  const sendListOfEnclosures = () => {
    const payload = {
      order_no: props.orderNo,
      batchNo:props.batchNo,
      form_no: "PRD02/F-26",
      remarks_1: state.baleConsumption == "" ? "NA" : state.baleConsumption,
      remarks_2: state.PE_calibration_report == "" ? "NA" : state.PE_calibration_report,
    };
    axios
      .post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/11.SaveListOFEnclousers`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        message.success("List of enclousres Submitted");
        //////////////
        axios
        .get(
          `${ API.prodUrl}/Precot/api/spunlace/summary/11.GetListOFEnclousers?order_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res",res.data)
          if(res.data.length > 0){
            setDisableBtn(true)
            updateState({
              baleConsumption:res.data[0].remarks_1,
              PE_calibration_report:res.data[0].remarks_2
            })
          }else{
            setDisableBtn(false)
          }
        }).catch((err) => {
          console.log("errr",err)
        })
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
            display: disableBtn || !props.loggedInSupervisor ? "none" : "block"
          }}
          shape="round"
          onClick={sendListOfEnclosures}
        >
          Submit
        </Button>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <th colSpan="5">List of Enclosure</th>
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            S.No
          </td>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            Title
          </td>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            Remarks
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            1
          </td>
          <td style={{ padding: "1em" }} align="center">
            Bale Consumptions Report
          </td>
          <td>
            <Radio.Group
              onChange={(e) =>
                updateState({
                  baleConsumption: e.target.value,
                })
              }
              value={state.baleConsumption}
              disabled={disableBtn || !props.loggedInSupervisor}
            >
              <Radio value="ATTACHED">Attached</Radio>
              <Radio value="NOT ATTACHED">Not Attached</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "1em",
            }}
            align="center"
          >
            2
          </td>
          <td style={{ padding: "1em" }} align="center">
            Processing Equipment’s (Measuring Devices) Calibration Report
          </td>
          <td>
            <Radio.Group
              onChange={(e) =>
                updateState({
                  PE_calibration_report: e.target.value,
                })
              }
              value={state.PE_calibration_report}
              disabled={disableBtn || !props.loggedInSupervisor}
            >
              <Radio value="ATTACHED">Attached</Radio>
              <Radio value="NOT ATTACHED">Not Attached</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default List_Of_Enclosure;
