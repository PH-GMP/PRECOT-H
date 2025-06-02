import { Button, Input, message, Radio } from "antd";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
import axios from "axios";

const List_Of_Enclosure = (props) => {
  const [state, setState] = useState({
    baleConsumption: "",
    PE_calibration_report: "",
    freetext: "",
    freetextRemarks: "",
    id: "",
    supApproved: false,
    qaApproved: false,
    newstatus:""
  });
  const [disableBtn, setDisableBtn] = useState(false);
  const updateState = (updates) => {
    setState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  useEffect(() => {
    axios
      .get(
        `${ API.prodUrl}/Precot/api/buds/bmr/enclosureListByBatch?batchNumber=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        if (res.data.length > 0) {
          setDisableBtn(true);
          updateState({
            baleConsumption: res.data[0].remarks1,
            PE_calibration_report: res.data[0].remarks2,
            id: res.data[0].id,
            supApproved:
              res.data[0].supervisiorStatus == "SUPERVISOR_APPROVED"
                ? true
                : false,
            qaApproved: res.data[0].qaStatus == "QA_APPROVED" ? true : false,
            newstatus:res.data[0].supervisiorStatus,
            freetext: res.data[0].title3,
            freetextRemarks: res.data[0].remarks3,
          });
          //console.log("state",res.data[0])
        } else {
          setDisableBtn(false);
        }
      });
  }, [props.batchNo]);

  const sendListOfEnclosures = () => {
    const payload = {
      orderNo: props.orderNo,
      department: "Pad Punching",
      title1: "Enclosure List",
      title2: "Postman",
      remarks1: state.baleConsumption == "" ? "NA" : state.baleConsumption,
      remarks2:
        state.PE_calibration_report == "" ? "NA" : state.PE_calibration_report,
      supervisiorStatus: state.newstatus,
      qaStatus: "",
      batchNo: props.batchNo,
      id: state.id,
    };
    axios
      .post(`${ API.prodUrl}/Precot/api/buds/bmr/saveEnclosureList`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        message.success("List of enclousres Submitted");
        axios
        .get(
          `${ API.prodUrl}/Precot/api/buds/bmr/enclosureListByBatch?batchNumber=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res", res.data);
          if (res.data.length > 0) {
            setDisableBtn(true);
            updateState({
              baleConsumption: res.data[0].remarks1,
              PE_calibration_report: res.data[0].remarks2,
              id: res.data[0].id,
              supApproved:
                res.data[0].supervisiorStatus == "SUPERVISOR_APPROVED"
                  ? true
                  : false,
              qaApproved: res.data[0].qaStatus == "QA_APPROVED" ? true : false,
              newstatus:res.data[0].supervisiorStatus,
              freetext: res.data[0].title3,
              freetextRemarks: res.data[0].remarks3,
            });
            //console.log("state",res.data[0])
          } else {
            setDisableBtn(false);
          }
        });
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
            display:
              props.loggedInHod ||
              (props.loggedInSupervisor && state.supApproved) ||
              props.loggedInQa
                ? "none"
                : "block",
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
            Sliver Consumption Report
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
            Packing Material Issue & Consumption Report
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
