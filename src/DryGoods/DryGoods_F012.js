/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Tabs,
  Tooltip,
  message
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const DryGoods_F012 = () => {
  const [open, setOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const roleauth = localStorage.getItem("role");
  const [ballsNo1, setBallsNo1] = useState("");
  const [ballsNo2, setBallsNo2] = useState("");
  const [sliverMakingMc, setSliverMakingMc] = useState("");
  const [rollMc, setRollMc] = useState("");
  const [pleatMc, setPleatMc] = useState("");
  const [editResponse, seteditResponse] = useState(null);
  const [rollPleateLine, setRollPleateLine] = useState("");
  const [mcId, setMcId] = useState("");
  const [nameOfChemical, setNameofChemical] = useState("");
  const [chemicalBatchNo, setChemicalBatchNo] = useState("");
  const [expDate, setExpDate] = useState("");
  const [sliverOutputArea, setSliverOutputArea] = useState("");
  const [sliverCarryingDrums, setSliverCarryingDrums] = useState("");
  const [sliverFeedingMechanism, setSliverFeedingMechanism] = useState("");
  const [ballsOutputAreas, setBallsOutputAreas] = useState("");
  const [packingTableBalls, setPackingTableBalls] = useState("");
  const [cardedWebOutputArea, setCardedOutputArea] = useState("");
  const [conveyor, setConveyor] = useState("");
  const [rollWinter, setRollWinter] = useState("");
  const [trolleys, setTrolleys] = useState("");
  const [rollPleatMachine, setRollPleattMachine] = useState("");
  const [packingTables, setPackingTables] = useState("");
  const [remarks, setRemarks] = useState("");
  const [sanitizedBy, setSanitizedBy] = useState("");
  const [supervisorSign, setSupervisorSign] = useState(null);
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState(null);
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [hodSign, setHodSign] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate("");
  const [hodSubmitOn, setHodSubmitOn] = useState("");
  const [date1, setDate1] = useState("");
  const location = useLocation();
  const { state } = location;
  const { monthState, yearState, weekState } = state || {};
  const token = localStorage.getItem("token");
  const initialized = useRef(false);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [reviews, setReviews] = useState({
    operator_sign: "",
    operator_submitted_on: "",
    hod_sign: "",
    hod_submit_on: "",
    operator_status: "",
    supervisor_sign: "",
    hod_status: "",
    supervisor_submit_on: "",
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const formatDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const formattedDate = formatDate(supervisorSubmitOn);
  const formattedDateHod = formatDate(hodSubmitOn);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
 

  const [rejectModal, setRejectModal] = useState(false);

  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setRejectRemarks("");
  };

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      (responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "HOD_APPROVED")
    ) {
      console.log("Condition 2");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      console.log("Condition 2");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_APPROVED"
    ) {
      console.log("Condition 4");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-012/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      !responseData.supervisor_status
    ) {
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-012/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {},
    });
  };

 
  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = reviews[key];
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            console.log("Response:", res.data);
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [reviews]);

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
          editResponse?.hod_status == "WAITING_FOR_APPROVAL") ||
        editResponse?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (editResponse?.hod_status == "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleBack = () => {
    navigate("/Precot/DryGoods/F-012/Summary");
  };

  const mapRadioValue = (value) => {
    switch (value) {
      case "TICK":
        return "Yes";
      case "CROSS":
        return "No";
      case "NA":
        return "NA";
      case null:
        return "NA";
      default:
        return "NA";
    }
  };

  const mapApiValueToRadioValue = (value) => {
    switch (value) {
      case "Yes":
        return "TICK";
      case "No":
        return "CROSS";
      case "NA":
        return "NA";
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        setStatus((prevStatus) => ({
          ...prevStatus,
          fieldStatus: true,
        }));
      }
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        if (role == "ROLE_OPERATOR") {
          setStatus((prevStatus) => ({
            ...prevStatus,
            fieldStatus: true,
          }));
        }
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Drygoods/Service/getSaniParamDetailsbyF12?year=${yearState}&month=${monthState}&week=${weekState}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.length == 0 && role !== "ROLE_SUPERVISOR") {
            message.warning("Supervisor Yet To Submit");
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-012/Summary");
            }, 1000);
          }

          if (response.data.length > 0) {
            const data = response.data[0];
            console.log("Responsed", data);
            setMcId(data.mc_id);
            setNameofChemical(data.name_of_chemical);
            setChemicalBatchNo(data.chemical_batch_no);
            setExpDate(data.exp_date);
            setBallsNo1(mapApiValueToRadioValue(data.balls_mc_no_01));
            setBallsNo2(mapApiValueToRadioValue(data.balls_mc_no_02));
            setSliverMakingMc(mapApiValueToRadioValue(data.sliver_making_mc));
            setRollMc(mapApiValueToRadioValue(data.rolls_mc));
            setPleatMc(mapApiValueToRadioValue(data.pleat_mc));
            setRollPleateLine(mapApiValueToRadioValue(data.roll_pleat_line));
            setSliverOutputArea(
              mapApiValueToRadioValue(data.sliver_output_area)
            );
            setSliverCarryingDrums(
              mapApiValueToRadioValue(data.sliver_carrying_drums)
            );
            setSliverFeedingMechanism(
              mapApiValueToRadioValue(data.sliver_feeding_mechanisms)
            );
            setBallsOutputAreas(
              mapApiValueToRadioValue(data.balls_output_area)
            );
            setPackingTableBalls(
              mapApiValueToRadioValue(data.packing_tables_balls)
            );
            setCardedOutputArea(
              mapApiValueToRadioValue(data.carded_web_output_area)
            );
            setConveyor(mapApiValueToRadioValue(data.conveyor));
            setRollWinter(mapApiValueToRadioValue(data.roll_winder));
            setTrolleys(mapApiValueToRadioValue(data.trolleys));
            setRollPleattMachine(
              mapApiValueToRadioValue(data.roll_pleat_machine)
            );
            setPackingTables(mapApiValueToRadioValue(data.packing_tables));
            setRemarks(data.remarks);
            setSanitizedBy(data.sanitized_by);
            setReviews((prevState) => ({
              ...prevState,
              operator_sign: data.operator_sign,
              operator_submitted_on: data.operator_submitted_on,
              hod_sign: data.hod_sign,
              hod_submit_on: data.hod_submit_on,
              operator_status: data.operator_status,
              hod_status: data.hod_status,
              supervisor_sign: data.supervisor_sign,
              supervisor_submit_on: data.supervisor_submit_on,
            }));
            statusFunction(data);
          }
        } catch (error) {
          // if (role === "ROLE_SUPERVISOR") {
          message.error(error.response.data.message);
          // }
        }
      };
      fetchData();
    }
  });

  const handleSave = () => {
    setSaveLoading(true);
    const payload = {
      mc_id: mcId,
      unit: "Unit H",
      formatNo: "PH-PRD04/F-012",
      revisionNo: "01",
      sopNumber: "PH-PRD04-D-03",
      formatName: "Sanitization Of Machines & Surfaces - Dry Goods",
      week: weekState,
      month: monthState,
      year: yearState,
      name_of_chemical: nameOfChemical,
      chemical_batch_no: chemicalBatchNo,
      exp_date: expDate,
      balls_mc_no_01: mapRadioValue(ballsNo1),
      balls_mc_no_02: mapRadioValue(ballsNo2),
      sliver_making_mc: mapRadioValue(sliverMakingMc),
      rolls_mc: mapRadioValue(rollMc),
      pleat_mc: mapRadioValue(pleatMc),
      roll_pleat_line: mapRadioValue(rollPleateLine),
      sliver_output_area: mapRadioValue(sliverOutputArea),
      sliver_carrying_drums: mapRadioValue(sliverCarryingDrums),
      sliver_feeding_mechanisms: mapRadioValue(sliverFeedingMechanism),
      balls_output_area: mapRadioValue(ballsOutputAreas),
      packing_tables_balls: mapRadioValue(packingTableBalls),
      carded_web_output_area: mapRadioValue(cardedWebOutputArea),
      conveyor: mapRadioValue(conveyor),
      roll_winder: mapRadioValue(rollWinter),
      trolleys: mapRadioValue(trolleys),
      roll_pleat_machine: mapRadioValue(rollPleatMachine),
      packing_tables: mapRadioValue(packingTables),
      remarks: remarks,
      sanitized_by: sanitizedBy,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/Drygoods/Service/saveSanitiziationF12`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Sanitization Of Machines details Save Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-012/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    if (!nameOfChemical) {
      message.error("Name Of Chemical field is required");
      return;
    }
    if (!chemicalBatchNo) {
      message.error("Chemical Batch No field is required");
      return;
    }
    if (!expDate) {
      message.error("Exp Date field is required");
      return;
    }
    if (!remarks) {
      message.error("Remarks field is required");
      return;
    }
    if (!sanitizedBy) {
      message.error("Sanitized By field is required");
      return;
    }

    setSubmitLoading(true);
    const payload = {
      mc_id: mcId,
      unit: "Unit H",
      formatNo: "PH-PRD04/F-012",
      revisionNo: "01",
      sopNumber: "PH-PRD04-D-03",
      formatName: "Sanitization Of Machines & Surfaces - Dry Goods",
      week: weekState,
      month: monthState,
      year: yearState,
      name_of_chemical: nameOfChemical,
      chemical_batch_no: chemicalBatchNo,
      exp_date: expDate,
      balls_mc_no_01: mapRadioValue(ballsNo1),
      balls_mc_no_02: mapRadioValue(ballsNo2),
      sliver_making_mc: mapRadioValue(sliverMakingMc),
      rolls_mc: mapRadioValue(rollMc),
      pleat_mc: mapRadioValue(pleatMc),
      roll_pleat_line: mapRadioValue(rollPleateLine),
      sliver_output_area: mapRadioValue(sliverOutputArea),
      sliver_carrying_drums: mapRadioValue(sliverCarryingDrums),
      sliver_feeding_mechanisms: mapRadioValue(sliverFeedingMechanism),
      balls_output_area: mapRadioValue(ballsOutputAreas),
      packing_tables_balls: mapRadioValue(packingTableBalls),
      carded_web_output_area: mapRadioValue(cardedWebOutputArea),
      conveyor: mapRadioValue(conveyor),
      roll_winder: mapRadioValue(rollWinter),
      trolleys: mapRadioValue(trolleys),
      roll_pleat_machine: mapRadioValue(rollPleatMachine),
      packing_tables: mapRadioValue(packingTables),
      remarks: remarks,
      sanitized_by: sanitizedBy,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/Drygoods/Service/submitSanitiziationF12`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Sanitization Of Machines details Submit Successfully");
        setSubmitLoading(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-012/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setLoadingApprove(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Drygoods/Service/approveOrRejectF12`,
        {
          id: mcId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoadingApprove(false);

        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-012/Summary");
      })
      .catch((err) => {
        setLoadingApprove(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoadingApprove(false);
      });
  };

  const handleReject = async () => {
    setStatusLoader(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setStatusLoader(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Drygoods/Service/approveOrRejectF12`,
        {
          id: mcId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setStatusLoader(false);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-012/Summary");
      })
      .catch((err) => {
        setStatusLoader(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const items = [
    {
      key: "1",
      label: "Form 1",
      children: (
        <>
          <table align="left" style={{ width: "40%", alignItems: "center" }}>
            <thead>
              <tr style={{ height: "2em" }}>
                <th
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    width: "1%",
                  }}
                >
                  S No
                </th>
                <th
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                    width: "3%",
                  }}
                >
                  Check Points
                </th>
                <th
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                    width: "3%",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>Balls M/c. No.1</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                    }}
                  >
                    <Radio.Group
                      value={ballsNo1}
                      onChange={(e) => setBallsNo1(e.target.value)}
                      // readOnly={status.fieldStatus}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>2</p>
                </td>
                <td>
                  <p>Balls M/c. No. 2</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                    }}
                  >
                    <Radio.Group
                      value={ballsNo2}
                      onChange={(e) => setBallsNo2(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>3</p>
                </td>
                <td>
                  <p>Sliver Making M/c. </p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={sliverMakingMc}
                      onChange={(e) => setSliverMakingMc(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>4</p>
                </td>
                <td>
                  <p>Rolls M/c.</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={rollMc}
                      onChange={(e) => setRollMc(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>5</p>
                </td>
                <td>
                  <p>Pleat M/c.</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={pleatMc}
                      onChange={(e) => setPleatMc(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>6</p>
                </td>
                <td>
                  <p>Roll & Pleat Line</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={rollPleateLine}
                      onChange={(e) => setRollPleateLine(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      key: "2",
      label: "Form 2",
      children: (
        <>
          <table align="left" style={{ width: "50%", alignItems: "left" }}>
            <thead>
              <tr style={{ height: "5em" }}>
                <th
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    width: "10%",
                  }}
                >
                  S No
                </th>
                <th
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                    width: "50%",
                  }}
                >
                  Activity
                </th>
                <th
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                    width: "50%",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>A</p>
                </td>{" "}
                <td colSpan={2}>
                  <p>SLIVER & BALL MAKING: </p>
                </td>{" "}
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>Sliver output area (Card delivery)</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={sliverOutputArea}
                      onChange={(e) => setSliverOutputArea(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>2</p>
                </td>
                <td>
                  <p>Sliver Carrying Drums</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={sliverCarryingDrums}
                      onChange={(e) => setSliverCarryingDrums(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>3</p>
                </td>
                <td>
                  <p>Sliver Feeding mechanisms</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={sliverFeedingMechanism}
                      onChange={(e) =>
                        setSliverFeedingMechanism(e.target.value)
                      }
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>4</p>
                </td>
                <td>
                  <p>Balls output area</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={ballsOutputAreas}
                      onChange={(e) => setBallsOutputAreas(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>5</p>
                </td>
                <td>
                  <p>Packing Tables - Balls</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={packingTableBalls}
                      onChange={(e) => setPackingTableBalls(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      key: "3",
      label: "Form 3",
      children: (
        <>
          <table align="left" style={{ width: "50%", alignItems: "left" }}>
            <thead>
              <tr style={{ height: "5em" }}>
                <th
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    width: "10%",
                  }}
                >
                  S No
                </th>
                <th
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                    width: "50%",
                  }}
                >
                  Activity
                </th>
                <th
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                    width: "50%",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td style={{ width: "5%" }}>
                  <p>B</p>
                </td>{" "}
                <td colSpan={2}>
                  <p>ROLLS & PLEAT MAKING: </p>
                </td>{" "}
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>Carded web output area (Card delivery)</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={cardedWebOutputArea}
                      onChange={(e) => setCardedOutputArea(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>2</p>
                </td>
                <td>
                  <p>Conveyor</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={conveyor}
                      onChange={(e) => setConveyor(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>3</p>
                </td>
                <td>
                  <p>Roll winder</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={rollWinter}
                      onChange={(e) => setRollWinter(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>4</p>
                </td>
                <td>
                  <p>Trolleys</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={trolleys}
                      onChange={(e) => setTrolleys(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>5</p>
                </td>
                <td>
                  <p>Roll & Pleat machine</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={rollPleatMachine}
                      onChange={(e) => setRollPleattMachine(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <p>6</p>
                </td>
                <td>
                  <p>Packing Tables</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={packingTables}
                      onChange={(e) => setPackingTables(e.target.value)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      key: "4",
      label: "Remarks",
      children: (
        <table align="left" style={{ width: 500, alignItems: "left" }}>
          <p>Remark/Comment</p>
          <Input.TextArea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            style={{ width: 600, height: 100 }}
            readOnly={status.fieldStatus}
          />
        </table>
      ),
    },
    {
      key: "5",
      label: "Reviews",
      children: (
        <>
          <table align="left" style={{ width: "40%", alignItems: "left" }}>
            <tr>
              <td
                style={{
                  padding: "1em",
                  borderRight: "1px solid black ",
                }}
              >
                <b>Sanitized By</b>
                <p>(Trained person)</p>
              </td>
              <td
                style={{ textAlign: "center", fontfamily: "Times New Roman" }}
              >
                <Input
                  className="inp-new"
                  value={sanitizedBy}
                  style={{ border: "none", textAlign: "center" }}
                  onChange={(e) => setSanitizedBy(e.target.value)}
                  readOnly={status.fieldStatus}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <b>Verified By</b>
                <p>(Supervisor)</p>
              </td>
              <td>
                <div style={{ textAlign: "center" }}>
                  {reviews.supervisor_sign}
                  <br />
                  {formatDateAndTime(reviews.supervisor_submit_on)}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  {eSign.supervisor_sign ? (
                    <img
                      src={eSign.supervisor_sign}
                      alt="Operator eSign"
                      style={{
                        width: "150px",
                        height: "70px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                </div>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                }}
              >
                <b>Reviewed by HOD </b>
                <p>(at least once in a month)</p>
              </td>
              <td>
                <div style={{ textAlign: "center" }}>
                  {reviews.hod_sign}
                  <br />
                  {formatDateAndTime(reviews.hod_submit_on)}
                </div>
                <div style={{ marginLeft: "28px" }}>
                  {eSign.hod_sign ? (
                    <img
                      src={eSign.hod_sign}
                      alt="Operator eSign"
                      style={{
                        width: "150px",
                        height: "70px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                </div>
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];
  const onChange = (key) => {
    // console.log(key);
  };

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Sanitization Of Machines & Surfaces - Dry Goods"
        formatNo="PH-PRD04/F-012"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        frequencyComponents={
          <Form
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {" "}
            <Form.Item
              label="Department"
              style={{
                marginRight: "20px",
              }}
            >
              <b>Spunlace</b>
            </Form.Item>
            <Form.Item
              label="Month"
              style={{
                marginRight: "20px",
              }}
            >
              {" "}
              <b>{month}</b>
            </Form.Item>
            <Form.Item
              label="Year"
              style={{
                marginRight: "20px",
              }}
            >
              <b>{year}</b>
            </Form.Item>
            <Form.Item label="Frequency">
              <b>Weekly</b>
            </Form.Item>
          </Form>
        }
        buttonsArray={[
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
          </Button>,

          role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={loadingApprove}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={rejectFlow}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                  display: status.saveStatus ? "none" : "flex",
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: status.submitStatus ? "none" : "flex",
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={handleLogout}
          >
            Logout
          </Button>,

          <Tooltip
            trigger="click"
            style={{
              backgroundColor: "#fff",
            }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
              }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
        ]}
      />

      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={380}
        showSearch
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleReject}
            loading={statusLoader}
          >
            Reject
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
      <div style={{ paddingBottom: "2em" }}></div>
   
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          marginTop: "5px",
        }}
      >
        <Input
          addonBefore="Week"
          placeholder="Week"
          value={weekState}
          readOnly
 
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="Month & Year"
          placeholder="Month & Year"
          readOnly
          value={`${monthState} / ${yearState}`}
          style={{ width: "100%", height: "35px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "5px",
        }}
      >
        <Input
          addonBefore="Name of the Chemical"
          placeholder="Name of the Chemical"
          value={nameOfChemical}
          onChange={(e) => setNameofChemical(e.target.value)}
          style={{ width: "120%", height: "35px" }}
          readOnly={status.fieldStatus}
        />

        <Input
          addonBefore="Chemical Batch Number:"
          placeholder="Chemical Batch Number:"
          value={chemicalBatchNo}
       
          onChange={(e) => setChemicalBatchNo(e.target.value)}
          type="text"
          min="0"
          style={{ width: "140%", height: "35px" }}
          readOnly={status.fieldStatus}
        />
        <Input
          addonBefore="Exp. Date"
          placeholder="Exp. Date"
          value={expDate}
 
          onChange={(e) => setExpDate(e.target.value)}
          type="date"
          min="0"
          onKeyPress={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          style={{ width: "140%", height: "35px" }}
          readOnly={status.fieldStatus}
        />
      </div>
      <Row>
        <Tabs
          items={items}
          onChange={onChange}
          style={{
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
      </Row>
    </div>
  );
};
export default DryGoods_F012;
