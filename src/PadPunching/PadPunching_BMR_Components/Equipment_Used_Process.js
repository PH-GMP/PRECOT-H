import { Button, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import API from "../../baseUrl.json";
import moment from "moment/moment";

const Equipment_Used_Process = (props) => {
  const [EquipmentData, setEquipmentData] = useState([
    {
      id: 1,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 2,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 3,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 4,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 5,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 6,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 7,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 8,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 9,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 10,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 11,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 12,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 13,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 14,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 15,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 16,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 17,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 18,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 19,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 20,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 21,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 22,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 23,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 24,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 25,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 26,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 27,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
    {
      id: 28,
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
    },
  ]);
  const [disable, setDisable] = useState(false);
  const equipmentLov = [
    { value: "HCI-700", label: "HCI-700" },
    { value: "ACE-500", label: "ACE-500" },
    { value: "ACE-300-01", label: "ACE-300-01" },
    { value: "ACE-300-02", label: "ACE-300-02" },
    { value: "ACE-300-03", label: "ACE-300-03" },
    { value: "ACE-300-04", label: "ACE-300-04" },
    { value: "FALU-01", label: "FALU-01" },
    { value: "FALU-02", label: "FALU-02" },
    { value: "FINGER PAD-02", label: "FINGER PAD-02" },
    { value: "TEXKOR 5*6", label: "TEXKOR 5*6" },
    { value: "PUFF-01", label: "PUFF-01" },
    { value: "PUFF-02", label: "PUFF-02" },
    { value: "BUD MACHINE  -01", label: "BUD MACHINE  -01" },
    { value: "BUD MACHINE  -02", label: "BUD MACHINE  -02" },
  ];

  const [supApproved, setSupApproved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);

  const handleAddRow = () => {
    const newRow = { 
      equipmentName: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
     };
     setEquipmentData([...EquipmentData, newRow]);
  };

  const handleDeleteRow = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this row?");
    
    if (isConfirmed) {
      const updatedRows = [...EquipmentData];
      updatedRows.splice(index, 1);
      setEquipmentData(updatedRows);
    }
  };

  // const updateEquipment = (id, field, newValue) => {
  //   const updatedItems = EquipmentData.map((item) =>
  //     item.id === id ? { ...item, [field]: newValue } : item
  //   );
  //   setEquipmentData(updatedItems);
  // };

  const updateEquipment = (id, field, value) => {
    setEquipmentData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // const fetchEquipmentDetails = async (equipmentName, rowId) => {
  //   try {
  //     const response = await fetch(
  //       `${ API.prodUrl}/Precot/api/punching/bmr/getEquipmentAnnexureByName?equipmentName=${encodeURIComponent(equipmentName)}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch equipment details");
  //     }
  //     const data = await response.json();
  
  //     updateEquipment(rowId, "equipmentCode", data.equipmentCode);
  //     updateEquipment(rowId, "startDate", data.dateOfCalibration);
  //     updateEquipment(rowId, "endDate", data.calibrationDueOn);
  //   } catch (error) {
  //     console.error("Error fetching equipment details:", error);
  //   }
  // };

  const fetchEquipmentDetails = async (equipmentName, rowId, rowIndex) => {
    try {
      const response = await fetch(
        `${ API.prodUrl}/Precot/api/punching/bmr/getEquipmentAnnexureByName?equipmentName=${encodeURIComponent(equipmentName)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch equipment details");
      }
      const data = await response.json();

      data.map((value , index) => {
        updateEquipment(rowId + index, "equipmentCode", value.equipmentCode);
        updateEquipment(rowId + index, "startDate", value.startDate);
        updateEquipment(rowId + index, "endDate", value.endDate);
        updateEquipment(rowId + index, "equipmentName", value.equipmentName);
      })
  

  
      if (rowIndex === EquipmentData.length - 1) {
        const newRow = {
          id: EquipmentData.length + 1,
          equipmentName: "",
          equipmentCode: "",
          startDate: "",
          endDate: "",
          checked_by_sign: "",
          checked_by_date: "",
        };
        setEquipmentData((prevData) => [...prevData, newRow]);
  
        setTimeout(() => {
          const nextEquipment = data[1];
          if (nextEquipment) {
            updateEquipment(newRow.id, "equipmentName", nextEquipment.equipmentName);
            updateEquipment(newRow.id, "equipmentCode", nextEquipment.equipmentCode);
            updateEquipment(newRow.id, "startDate", nextEquipment.startDate);
            updateEquipment(newRow.id, "endDate", nextEquipment.endDate);
          }
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching equipment details:", error);
    }
  };
  

  useEffect(() => {
    axios
      .get(
        `${ API.prodUrl}/Precot/api/punching/bmr/getEquipmentAnnexure?order=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        //supervisor_status
        setDisable(
          res.data[0].supervisor_status == "SUPERVISOR_APPROVED" ? true : false
        );
        setQaApproved(
          res.data[0].supervisor_status == "QA_APPROVED" ? true : false
        );
        setSupApproved(
          res.data[0].supervisor_status == "SUPERVISOR_APPROVED" ? true : false
        );
        const transformedData = res.data[0]?.details.map((item, index) => ({
          equipmentName: item.equipmentName || "",
          equipmentCode: item.equipmentName || "",
          startDate: item.dateOfCalibration || "",
          endDate: item.calibrationDueOn || "",
          checked_by_sign: item.checked_name || "",
          checked_by_date: item.checked_date || "",
        }));

        if (transformedData) setEquipmentData(transformedData);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [props.batchNo]);

  const submitEquipment = () => {
    if (
      props.loggedInQa &&
      EquipmentData.every(
        (x) =>
          x.endDate.length == 0 ||
          x.checked_by_date.length == 0 ||
          x.checked_by_sign.length == 0 ||
          x.startDate == 0 ||
          x.equipmentName.length == 0
      )
    ) {
      message.error("Please Select All Fields Before Submit");
    } else {
      console.log("Submitting Data", EquipmentData);
      const payload = {
        equipmentId: 1,
        orderNo: props.orderNo,
        batchNo: props.batchNo,
        department: "Pad Punching",
        details: EquipmentData.map((item) => ({
          equipmentName: item.equipmentName,
          equipmentCode: item.equipmentName,
          dateOfCalibration: item.startDate,
          calibrationDueOn: item.endDate,
          checked_name: item.checked_by_sign,
          checked_time: item.checked_by_date,
        })),
      };
      axios
        .post(
          `${ API.prodUrl}/Precot/api/punching/bmr/submitEquipmentAnnexure`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Equipment Used Process Submitted Successfully");

          //get api called here
          axios
            .get(
              `${ API.prodUrl}/Precot/api/punching/bmr/getEquipmentAnnexure?order=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              console.log("Response", res.data);
              //supervisor_status
              setDisable(
                res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
              setQaApproved(
                res.data[0].supervisor_status == "QA_APPROVED" ? true : false
              );
              setSupApproved(
                res.data[0].supervisor_status == "SUPERVISOR_APPROVED"
                  ? true
                  : false
              );
              const transformedData = res.data[0]?.details.map(
                (item, index) => ({
                  id: EquipmentData[index]?.id || index + 1, // Preserve current id or assign a new one if undefined
                  equipmentName: item.equipmentName || "",
                  equipmentCode: item.equipmentName || "",
                  startDate: item.dateOfCalibration || "",
                  endDate: item.calibrationDueOn || "",
                  checked_by_sign: item.checked_name || "",
                  checked_by_date: item.checked_date || "",
                })
              );

              if (transformedData) setEquipmentData(transformedData);
            })
            .catch((err) => {
              console.log("Error", err);
            });
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            display:
              disable ||
              (props.loggedInQa && qaApproved) ||
              !props.loggedInSupervisor
                ? "none"
                : "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
          }}
          shape="round"
          onClick={submitEquipment}
        >
          Submit
        </Button>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Equipment Name</th>
            <th>Equipment Code</th>
            <th>Date Of Calibration</th>
            <th>Calibration Due On</th>
            <th>Checked By Sign & Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {EquipmentData.map((x, i) => (
            <tr key={x.id}>
              <td align="center">{i + 1}</td>
              <td>
                  <Select
          className="inp-new"
          showSearch
          options={equipmentLov}
          value={x.equipmentName}
          onChange={(equipmentName) => {
            updateEquipment(x.id, "equipmentName", equipmentName);
            fetchEquipmentDetails(equipmentName, x.id);
          }}
          disabled={
            disable ||
            (props.loggedInQa && qaApproved) ||
            !props.loggedInSupervisor || 
              x.equipmentName === "Metal Detector"
          }
        />
              </td>
              <td>
              <Input
        className="inp-new"
        value={x.equipmentCode}
        onChange={(e) =>
          updateEquipment(x.id, "equipmentCode", e.target.value)
        }
        readOnly
      />
                
              </td>
              <td>
                <Input
                  className="inp-new"
                  type="date"
                  value={x.startDate}
                  onChange={(e) =>
                    updateEquipment(x.id, "startDate", e.target.value)
                  }
                 readOnly
                />
              </td>
              <td>
                <Input
                  className="inp-new"
                  type="date"
                  value={x.endDate}
                  onChange={(e) =>
                    updateEquipment(x.id, "endDate", e.target.value)
                  }
                  readOnly
                />
              </td>
              <td>
                <Select
                  className="inp-new"
                  options={props.supLov}
                  value={x.checked_by_sign}
                  onChange={(e) => updateEquipment(x.id, "checked_by_sign", e)}
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }
                />
                <br />
                <Input
                  className="inp-new"
                  type="datetime-local"
                  value={moment(x.checked_by_date).format("YYYY-MM-DDTHH:MM")}
                  onChange={(e) =>
                    updateEquipment(x.id, "checked_by_date", e.target.value)
                  }
                  disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }
                />
              </td>
              {/* <td style={{textAlign: "center"}}>
                    <button onClick={() => handleDeleteRow(i)} style={{ cursor: disable ? "not-allowed" : "pointer" }}   disabled={
                    disable ||
                    (props.loggedInQa && qaApproved) ||
                    !props.loggedInSupervisor
                  }>   <FaTrash color="red" /></button>
                  </td>
                 */}
            </tr>
          ))}
        </tbody>
        {/* <div style={{ textalign: "center", paddingLeft: "15px", width: "100%", paddingTop: "10px", cursor: disable ? "not-allowed" : "pointer" }}><button onClick={handleAddRow}
              style={{ backgroundColor: "green", border: "none", color: "white", padding: "6px", borderRadius: "3px", cursor: disable ? "not-allowed" : "pointer" }}   disabled={
                disable ||
                (props.loggedInQa && qaApproved) ||
                !props.loggedInSupervisor
              }>Add Row</button></div> */}
      </table>
    </div>
  );
};

export default Equipment_Used_Process;
