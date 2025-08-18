import { Button, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import API from "../../baseUrl.json";
import moment from "moment/moment";

const Equipment_Used_Process = (props) => {
  const [EquipmentData, setEquipmentData] = useState(
    Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      childId: "",
      equipmentName: "",
      calibration: "",
      equipmentCode: "",
      startDate: "",
      endDate: "",
      checked_by_sign: "",
      checked_by_date: "",
      calibration: ""
    }))
  );
  console.log("EquipmentData", EquipmentData)

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

  ];
  const [mainId, setMainId] = useState("");
  const [supApproved, setSupApproved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);

  const updateEquipment = (id, field, value) => {
    setEquipmentData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const fetchEquipmentDetails = async (equipmentName, rowId) => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/punching/bmr/getEquipmentAnnexureByName?equipmentName=${encodeURIComponent(
          equipmentName
        )}`,
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

      console.log("index rowId", rowId)
      // Update current row with first item
      if (data[0]) {
        console.log(", data[0].endDate", data[0].endDate)
        updateEquipment(rowId, "equipmentCode", data[0].equipmentCode);
        updateEquipment(rowId, "startDate", data[0].startDate);
        updateEquipment(rowId, "endDate", data[0].endDate);
        updateEquipment(rowId, "calibration", data[0].calibration);
        updateEquipment(
          rowId,
          "equipmentName",
          data[0].calibration === "Metal Detector" ? data[0].calibration : data[0].equipmentName
        );
      }

      console.log("index rowId", rowId + 1)
      // Update next row with second item if it exists
      console.log("data[1]", data[1])
      console.log("rowId + 1", rowId + 1)
      console.log("EquipmentData.length", EquipmentData.length)
      if (data[1] && rowId + 1) {


        console.log("data[1].endDate", data[1].endDate)
        updateEquipment(rowId + 1, "equipmentCode", data[1].equipmentCode);
        updateEquipment(rowId + 1, "startDate", data[1].startDate);
        updateEquipment(rowId + 1, "endDate", data[1].endDate);
        updateEquipment(rowId + 1, "calibration", data[1].calibration);
        updateEquipment(
          rowId + 1,
          "equipmentName",
          data[1].calibration === "Metal Detector" ? data[1].calibration : data[1].equipmentName
        );
      }

    } catch (error) {
      console.error("Error fetching equipment details:", error);
    }
  };

  useEffect(() => {
    getEquimentData();
  }, [props.batchNo]);

  const getEquimentData = () => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/punching/bmr/getEquipmentAnnexure?order=${props.batchNo}`,
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
        setMainId(res.data[0].equipmentId);
        // Utility function to convert DD-MM-YYYY → YYYY-MM-DD
        const formatDateForInput = (dateStr) => {
          if (!dateStr || dateStr.includes("T")) return dateStr?.split("T")[0]; // already in ISO format
          const [dd, mm, yyyy] = dateStr.split("-");
          return `${yyyy}-${mm}-${dd}`;
        };

        const transformedData = res.data[0]?.details.map((item, index) => ({
          childId: item.id,
          id: item.id,
          equipmentName: item.equipmentName || "",
          equipmentCode: item.equipmentCode || "",
          calibration: item.calibration || "",
          startDate: formatDateForInput(item.dateOfCalibration),
          endDate: formatDateForInput(item.calibrationDueOn),
          checked_by_sign: item.checked_name || "",
          checked_by_date: item.checked_time || "",
        }));

        console.log("transformedData", transformedData)

        if (transformedData) setEquipmentData(transformedData);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  const saveEquipment = () => {
    console.log("saving Data", EquipmentData);
    const payload = {
      equipmentId: mainId || "",
      orderNo: props.orderNo,
      batchNo: props.batchNo,
      department: "Pad Punching",
      details: EquipmentData.map((item) => ({
        id: item.childId || "",
        equipmentName: item.equipmentName,
        equipmentCode: item.equipmentCode,
        calibration: item.calibration,
        dateOfCalibration: item.startDate
          ? moment(item.startDate).format("DD-MM-YYYY")
          : "",
        calibrationDueOn: item.endDate
          ? moment(item.endDate).format("DD-MM-YYYY")
          : "",
        checked_name: item.checked_by_sign,
        checked_time: item.checked_by_date,
      })),
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/punching/bmr/saveEquipmentAnnexure2`,
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
        getEquimentData();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

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
        orderNo: props.orderNo,
        batchNo: props.batchNo,
        equipmentId: mainId || "",
        department: "Pad Punching",
        details: EquipmentData.map((item) => ({
          id: item.childId || "",
          equipmentName: item.equipmentName,
          equipmentCode: item.equipmentCode,
          calibration: item.calibration,
          dateOfCalibration: item.startDate
            ? moment(item.startDate).format("DD-MM-YYYY")
            : "",
          calibrationDueOn: item.endDate
            ? moment(item.endDate).format("DD-MM-YYYY")
            : "",
          checked_name: item.checked_by_sign,
          checked_time: item.checked_by_date,
        })),
      };
      axios
        .post(
          `${API.prodUrl}/Precot/api/punching/bmr/submitEquipmentAnnexure2`,
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
          getEquimentData();
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
          gap: "10px"

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
          onClick={saveEquipment}
        >
          Save
        </Button>
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
          {EquipmentData.map((x, i) => {

            console.log("  {EquipmentData.map((x, i) => {", x)

            return (< tr key={x.id} >
              <td align="center">{i + 1}</td>
              <td>
                <Select
                  className="inp-new"
                  showSearch
                  options={equipmentLov}
                  value={x.equipmentName}
                  onChange={(equipmentName) => {
                    updateEquipment(x.id, "equipmentName", equipmentName);
                    console.log("eequipmentName, x.id)ui", x.id);
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
            </tr>)
          }

          )}
        </tbody>
      </table>
    </div >
  );
};

export default Equipment_Used_Process;
