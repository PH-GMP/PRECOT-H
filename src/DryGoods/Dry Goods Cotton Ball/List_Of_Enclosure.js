import { Button, message, Radio, Input } from "antd";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
import axios from "axios";
import { GrDocumentStore } from "react-icons/gr";
import { LuEarOff } from "react-icons/lu";

const List_Of_Enclosure = (props) => {
  const { TextArea } = Input;
  const role = localStorage.getItem('role');
  const [loeData, setLoeData] = useState({
    batch_no: "",
    order_no: "",
    form_no: "",
    status: "",
    detailsEncloser: [
      {
        title: "BaleConsumption",
        remarks: "",
      },
      {
        title: "PackingMaterial",
        remarks: "",
      },
      {
        title: "",
        remarks: "",
      },
    ],
  });
  const [buttonLoader, setButtonLoader] = useState(false);

  const [disableBtn, setDisableBtn] = useState(false);
  useEffect(() => {
    setDisableBtn(false);
  }, [props.batchNo]);

  useEffect (() => {
    console.log('Disable Btn',disableBtn)
  },[disableBtn])

  const handleInputText = (e, name) => {
    setLoeData((prevLoeData) => {
      const updatedDetailsEncloser = [...prevLoeData.detailsEncloser];
      updatedDetailsEncloser[2] = {
        ...updatedDetailsEncloser[2],
        [name]: e.target.value,
      };

      return {
        ...prevLoeData,
        detailsEncloser: updatedDetailsEncloser,
      };
    });
  };

  useEffect(() => {
    setLoeData({
      batch_no: "",
      order_no: "",
      form_no: "",
      status: "",
      detailsEncloser: [
        {
          title: "BaleConsumption",
          remarks: "",
        },
        {
          title: "PackingMaterial",
          remarks: "",
        },
        {
          title: "",
          remarks: "",
        },
      ],
    });
    axios
      .get(
        `${API.prodUrl}/Precot/api/cottonBall/11.GetListOfEnclosurs?batch_no=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if(res.data.length == 0){
          if(role !== 'ROLE_SUPERVISOR'){
            setDisableBtn(true);
          }
        }
        if (res.data.length > 0) {
          // setLoeData(res.data[0]);
          // setDisableBtn(true);
          if ( (role == 'ROLE_SUPERVISOR') && ( 
            res.data[0].detailsEncloser[1].remarks !== "" ||
            res.data[0].detailsEncloser[1].title !== "")
          ) {
            console.log('Entered 1')
            setDisableBtn(true);
          }
          else if ( (role == "ROLE_QA") && ( 
            res.data[0].detailsEncloser[2].remarks !== "" ||
            res.data[0].detailsEncloser[2].title !== "")){
              console.log('Entered 1')
              setDisableBtn(true);
          }
          setLoeData(res.data[0]);
        }
      })
      .catch((err) => {
        message.error(err.res.data.message);
      });
  }, [props.batchNo]);

  const sendListOfEnclosures = () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    const payload = {
      enc_id : loeData.enc_id,
      batch_no: props.batchNo,
      order_no: props.orderNo,
      form_no: "",
      status: "",
      detailsEncloser: [
        {
          id : loeData.detailsEncloser[0].id,
          title: "BaleConsumption",
          remarks: loeData.detailsEncloser[0].remarks
            ? loeData.detailsEncloser[0].remarks
            : "NA",
        },
        {
          id : loeData.detailsEncloser[1].id,
          title: "PackingMaterial",
          remarks: loeData.detailsEncloser[1].remarks
            ? loeData.detailsEncloser[1].remarks
            : "NA",
        },
        {
          id : loeData.detailsEncloser[2].id,
          title: loeData.detailsEncloser[2].title,
          remarks: loeData.detailsEncloser[2].remarks,
        },
      ],
    };
    setButtonLoader(true);
    axios
      .post(
        `${API.prodUrl}/Precot/api/cottonBall/11.submitListOfEnclosurs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setButtonLoader(false);
          message.success("List of enclousres Submitted");
          axios
            .get(
              `${API.prodUrl}/Precot/api/cottonBall/11.GetListOfEnclosurs?batch_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              if (res.data.length > 0) {
                if ( role == 'ROLE_SUPERVISOR' && ( 
                  res.data[0].detailsEncloser[1].remarks !== "" ||
                  res.data[0].detailsEncloser[1].title !== "")
                ) {
                  console.log('Entered 1')
                  setDisableBtn(true);
                }
                else if ( role == "ROLE_QA" && (
                  res.data[0].detailsEncloser[2].remarks !== "" ||
                  res.data[0].detailsEncloser[2].title !== "")){
                    console.log('Entered 2')
                    setDisableBtn(true);
                }
                setLoeData(res.data[0]);
              }
            })
            .catch((err) => {
              message.error(err.res.data.message);
            });
        }
      })
      .catch((err) => {
        message.error(err.res.data.message);
        setButtonLoader(false);
      });
  };

  useEffect(() => {
    console.log("LOE Data", loeData);
  }, [loeData]);
  const handleKeyDown_text = (e) => {
    if (
      !/[0-9a-zA-Z._]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    console.log("LOE Data", loeData);
  }, [loeData]);

  const handleInput = (e, name, field) => {
    const value = e.target.value;
    const index = loeData.detailsEncloser.findIndex(
      (details) => details.title == name
    );
    const updatedDetails = [...loeData.detailsEncloser];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value,
    };
    setLoeData({
      ...loeData,
      detailsEncloser: updatedDetails,
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

            display: disableBtn ? "none" : "block",
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
            Bale Consumption for Sliver Report
          </td>
          <td>
            <Radio.Group
              value={
                loeData.detailsEncloser.find(
                  (details) => details.title == "BaleConsumption"
                )?.remarks
              }
              onChange={(e) => {
                handleInput(e, "BaleConsumption", "remarks");
              }}
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
              value={
                loeData.detailsEncloser.find(
                  (details) => details.title == "PackingMaterial"
                )?.remarks
              }
              onChange={(e) => {
                handleInput(e, "PackingMaterial", "remarks");
              }}
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
            3
          </td>
          <td style={{ padding: "1em" }} align="center">
            <TextArea
              type="text"
              value={loeData.detailsEncloser[2].title}
              onKeyDown={(e) => handleKeyDown_text(e)}
              onChange={(e) => {
                handleInputText(e, "title");
              }}
              readOnly={ role !== "ROLE_QA" || disableBtn}
            ></TextArea>
          </td>
          <td>
            <Radio.Group
              value={loeData.detailsEncloser[2].remarks}
              onChange={(e) => {
                handleInputText(e, "remarks");
              }}
              disabled={role !== "ROLE_QA" || disableBtn}
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
