import { Button, message, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrDocumentStore } from "react-icons/gr";
import API from "../../baseUrl.json";

const List_Of_Enclosure = (props) => {
  
  const [loeData, setLoeData] = useState({
    
    "batch_no": "",
    "order_no": "",
    "form_no": "",
    "status": "",
    "detailsEncloser": [
        {
            "title": "BaleConsumption",
            "remarks": ""
        },
        {
            "title": "PackingMaterial",
            "remarks": ""
        }
    ]
  });
  const [buttonLoader,setButtonLoader] = useState(false);

  const [disableBtn,setDisableBtn] = useState(false);
  useEffect (() => {
    setDisableBtn(false);
  },[props.batchNo])

  
  useEffect(() => {
    setLoeData ({
          
    "batch_no": "",
    "order_no": "",
    "form_no": "",
    "status": "",
    "detailsEncloser": [
        {
            "title": "BaleConsumption",
            "remarks": ""
        },
        {
            "title": "PackingMaterial",
            "remarks": ""
        }
    ]
    })
    axios
      .get(
        `${API.prodUrl}/Precot/api/cottonPleat/11.GetListOfEnclosurs?batch_no=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {

        if(res.data.length > 0){
          setLoeData(res.data[0]);
          setDisableBtn(true)
        }
      })
      .catch((err) => {
        message.error(err.res.data.message)
      });
  },[props.batchNo])


  const sendListOfEnclosures = () => {
    if(props.batchNo == ""){
      message.warning("Please Select Batch No");
      return;
    }
    if(props.orderNo == ""){
      message.warning("Selected Batch No Dont have order No");
      return;
    }
    const payload = {
      "batch_no": props.batchNo,
      "order_no": props.orderNo,
      "form_no": "",
      "status": "",
      "detailsEncloser": [
          {
              "title": "BaleConsumption",
              "remarks": loeData.detailsEncloser[0].remarks ? loeData.detailsEncloser[0].remarks : "NA"
          },
          {
              "title": "PackingMaterial",
              "remarks": loeData.detailsEncloser[1].remarks ? loeData.detailsEncloser[1].remarks : "NA"
          }
      ]
    };
    setButtonLoader(true);
    axios
      .post(
        `${API.prodUrl}/Precot/api/cottonPleat/11.submitListOfEnclosurs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if(res.status == 200 || res.status == 201){
          setButtonLoader(false);
          message.success("List of enclousres Submitted");
          axios
          .get(
            `${API.prodUrl}/Precot/api/cottonPleat/11.GetListOfEnclosurs?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if(res.data.length > 0){
              setDisableBtn(true)
              setLoeData(res.data[0]);
            }
          })
          .catch((err) => {
            message.error(err.res.data.message)
          });
        }
      })
      .catch((err) => {
        message.error(err.res.data.message)
        setButtonLoader(false)
      });
  };

  useEffect (()=>{
    console.log("LOE Data",loeData)
  },[loeData])

  const handleInput = (e,name,field) => {
    const value = e.target.value
    const index = loeData.detailsEncloser.findIndex(
      (details) => details.title == name
    );
    const updatedDetails = [...loeData.detailsEncloser];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value
    };
    setLoeData({
      ...loeData,
      detailsEncloser: updatedDetails
    });
  }
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

            display: (disableBtn || !props.loggedInSupervisor )  ? "none" : "block"
          }}
          shape="round"
          onClick={sendListOfEnclosures}
          loading={buttonLoader}
          icon={<GrDocumentStore color="#00308F" />}
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
          Bale Consumption for Mini roll Report
          </td>
          <td>
            <Radio.Group
              value={loeData.detailsEncloser.find((details) => details.title == "BaleConsumption")?.remarks}
              onChange={(e) => {handleInput(e,'BaleConsumption','remarks')}}
              disabled={!props.loggedInSupervisor || disableBtn}
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
          Packing Material Consumption Report
          </td>
          <td>
            <Radio.Group
              value={loeData.detailsEncloser.find((details) => details.title == "PackingMaterial")?.remarks}
              onChange={(e) => {handleInput(e,'PackingMaterial','remarks')}}
              disabled={!props.loggedInSupervisor || disableBtn}
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
