
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-mixed-operators */
import { Button, Col, Input, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";

const BleachingEdit = (props) => {
  const [PW_waterFill, setPW_waterFill] = useState("");
  const [PW_temp, setPW_temp] = useState("");
  const [PW_circulation, setPW_circulation] = useState("");
  const [PW_draining, setPW_draining] = useState("");
  const [PW_Observation, setPW_Observation] = useState("");

  const [SB_waterFill, setSB_waterFill] = useState("");
  const [SB_temp, setSB_temp] = useState("");
  const [SB_causticTransfer, setSB_causticTransfer] = useState("");
  const [SB_haipoleneTranfer, setSB_haipoleneTranfer] = useState("");
  const [SB_HydrogenTransfer, setSB_HydrogenTransfer] = useState("");
  const [SB_NA_temp, setSB_NA_temp] = useState("");
  const [SB_circulation, setSB_circulation] = useState("");
  const [SB_draining, setSB_draining] = useState("");
  const [SB_Observation, setSB_Observation] = useState("");
  const [HW_waterFill, setHW_waterFill] = useState("");
  const [HW_temp, setHW_temp] = useState("");
  const [HW_circulation, setHW_circulation] = useState("");
  const [HW_draining, setHW_draining] = useState("");
  const [HW_Observation, setHW_Observation] = useState("");
  const [HW_waterFill2, setHW_waterFill2] = useState("");
  const [HW_temp2, setHW_temp2] = useState("");
  const [HW_circulation2, setHW_circulation2] = useState("");
  const [HW_draining2, setHW_draining2] = useState("");
  const [NW_waterFill, setNW_waterFill] = useState("");
  const [NW_cheTransfer, setNW_cheTransfer] = useState("");
  const [NW_temp, setNW_temp] = useState("");
  const [NW_circulation, setNW_circulation] = useState("");
  const [NW_draining, setNW_draining] = useState("");
  const [NW_Observation, setNW_Observation] = useState("");
  const [FC_waterFill, setFC_waterFill] = useState("");
  const [FC_circulation, setFC_circulation] = useState("");
  const [FC_ciruclationPH, setFC_ciruclationPH] = useState("");
  const [FC_surface, setFC_surface] = useState("");
  const [FC_surfacePH, setFC_surfacePH] = useState("");
  const [FC_Draining, setFC_Draining] = useState("");
  const [FC_Observation, setFC_Observation] = useState("");
  const [CH_caustic, setCH_caustic] = useState("");
  const [CH_haipaloene, setCH_haipaloene] = useState("");
  const [CH_sarofom, setCH_sarofom] = useState("");
  const [CH_Hydrogen, setCH_Hydrogen] = useState("");
  const [CH_setilon, setCH_setilon] = useState("");
  const [CH_citric, setCH_citric] = useState("");
  const [CH_remark, setCH_remark] = useState("");
  const [INcharge_sign, setINcharge_sign] = useState("");
  const [INcharge_Date, setINcharge_Date] = useState("");
  const [HOD_sign, setHOD_sign] = useState("");
  const [HOD_date, setHOD_date] = useState("");
  const [QA_sign, setQA_sign] = useState("");
  const [QA_date, setQA_date] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  //   new state

  const [bmrNumber, setBmrNumber] = useState("");
  const [mcNumber, setMcNumber] = useState("");
  const [newDate, setNewDate] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [shift, setShift] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finish, setFinish] = useState("");
  const [endTime, setEndTime] = useState("");

  const [remarks, setremarks] = useState("");
  const [shiftInchargeFlag, setshiftInchargeFlag] = useState(false);
  const [hodIncharge, sethodIncharge] = useState(false);
  const [supervisor, setsupervisor] = useState(false);
  const [qa, setQa] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [BtnStatus, setBtnStatus] = useState(false);

  // const [shiftApproveBtn, setShiftApproveBtn] = useState(false);
  // const [hodApprove, sethodApprove] = useState(false);
  // const [qaApprove, setQaApprove] = useState(false);

  const [approveBtnEnable, setApproveBtnEnable] = useState(false);
  const [restrictionFlag, setRestrictionFlag] = useState(false);

  const [person, setPerson] = useState("");

  const [alreadyApprove, setAlreadyApprove] = useState(false);

  const navigate = useNavigate();

  const onChange = (key) => {
    // console.log(key);
  };

  const token = localStorage.getItem("token");

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    // console.log("Props Data :", props.data);
    // // console.log("KK",props.data.createdAt)
    setBmrNumber(props.data[0].bmr_no);
    setNewDate(props.data[0].date);
    setShift(props.data[0].shift);
    setFinish(props.data[0].finish);
    setMcNumber(props.data[0].mc_no);
    setBatchNo(props.data[0].batch_no);
    setStartTime(props.data[0].start_time);
    setEndTime(props.data[0].end_time);
    setPW_waterFill(props.data[0].wetting[0].water_level);
    setPW_temp(props.data[0].wetting[0].temp_raising);
    setPW_circulation(props.data[0].wetting[0].circulation);
    setPW_draining(props.data[0].wetting[0].draining);
    setPW_Observation(props.data[0].wetting[0].actual_temp);

    setSB_waterFill(props.data[0].scouring[0].water_level);
    setSB_temp(props.data[0].scouring[0].temp_raising_one);
    setSB_NA_temp(props.data[0].scouring[0].temp_raising_two);

    setSB_circulation(props.data[0].scouring[0].circulation);
    setSB_draining(props.data[0].scouring[0].draining);
    setSB_Observation(props.data[0].scouring[0].actual_temp);
    setSB_causticTransfer(props.data[0].scouring[0].chemical_trans_one);
    setSB_haipoleneTranfer(props.data[0].scouring[0].chemical_trans_two);
    setSB_HydrogenTransfer(props.data[0].scouring[0].chemical_trans_three);

    setHW_waterFill(props.data[0].hotwashOne[0].water_level);
    setHW_temp(props.data[0].hotwashOne[0].temp_raising);
    setHW_circulation(props.data[0].hotwashOne[0].circulation);
    setHW_draining(props.data[0].hotwashOne[0].draining);
    setHW_Observation(props.data[0].hotwashOne[0].actual_temp);

    setHW_waterFill2(props.data[0].hotwashTwo[0].water_level);
    setHW_temp2(props.data[0].hotwashTwo[0].temp_raising);
    setHW_circulation2(props.data[0].hotwashTwo[0].circulation);
    setHW_draining2(props.data[0].hotwashTwo[0].draining);

    setNW_Observation(props.data[0].newtralizing[0].actual_temp);
    setNW_cheTransfer(props.data[0].newtralizing[0].chemical_transf);
    setNW_circulation(props.data[0].newtralizing[0].circulation);
    setNW_draining(props.data[0].newtralizing[0].draining);
    setNW_temp(props.data[0].newtralizing[0].temp_raising);
    setNW_waterFill(props.data[0].newtralizing[0].water_level);

    setFC_Draining(props.data[0].finalprocess[0].draining);
    setFC_Observation(props.data[0].finalprocess[0].water_level);
    setFC_circulation(props.data[0].finalprocess[0].circulation_temp);
    setFC_ciruclationPH(props.data[0].finalprocess[0].water_level);
    setFC_surface(props.data[0].finalprocess[0].surface);
    setFC_surfacePH(props.data[0].finalprocess[0].ph_actual);
    setFC_waterFill(props.data[0].finalprocess[0].water_level);

    setCH_remark(props.data[0].remarks);
    setCH_Hydrogen(props.data[0].hydrogen_peroxide);
    setCH_caustic(props.data[0].caustic_soda_flakes);
    setCH_citric(props.data[0].citric_acid);
    setCH_haipaloene(props.data[0].haipolene);
    setCH_sarofom(props.data[0].sarofom);
    setCH_setilon(props.data[0].setilon_kn);

    setINcharge_sign(props.data[0].shift_sign);
    setINcharge_Date(props.data[0].shift_date);
    setHOD_sign(props.data[0].department_sign);
    setHOD_date(props.data[0].department_date);
    setQA_sign(props.data[0].qa_sign);
    setQA_date(props.data[0].qa_date);
    //setNewStatus(props.data[0].status);

    // setHW_Observation()
    //setNewStatus(props.status)
    // console.log("first", props.status);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const roleBase = localStorage.getItem("role");
    if (roleBase == "SHIFT IN-CHARGE") {
      setRestrictionFlag(true);
      setApproveBtnEnable(true);
      setPerson("SHIFT");
      setshiftInchargeFlag(false);
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Caking/Service/getshiftsign/${props.data[0].header_id}`,
          { headers }
        )
        .then((res) => {
          const now = new Date();
          const ISTOffset = 330; // Offset in minutes for IST (5 hours 30 minutes)
          const ISTTime = new Date(now.getTime() + ISTOffset * 60000); // Convert offset to milliseconds
          const formattedDate = ISTTime.toISOString().slice(0, 16);
          setINcharge_Date(formattedDate);

          // console.log("sa", res.data);
          setINcharge_sign(localStorage.getItem("username"))
          // setINcharge_Date(new Date())
          if (res.data == true) {
            setBtnStatus(true)
          } else {
            setBtnStatus(false)
          }
        })
        .catch((err) => {
          // console.log("error", err);
        });
      if (props.status == "SUBMIT") {
        setsupervisor(true);
        sethodIncharge(true);
        setBtnStatus(true);
      } else {
        setsupervisor(true);
        sethodIncharge(true);
        setBtnStatus(false);
      }
    } else if (roleBase == "HOD") {
      setRestrictionFlag(true);
      setsupervisor(true);
      sethodIncharge(false);
      setshiftInchargeFlag(true);
      setApproveBtnEnable(true);
      setPerson("HOD");
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Caking/Service/gethodsign/${props.data[0].header_id}`,
          { headers }
        )
        .then((res) => {
          const now = new Date();
          const ISTOffset = 330; // Offset in minutes for IST (5 hours 30 minutes)
          const ISTTime = new Date(now.getTime() + ISTOffset * 60000); // Convert offset to milliseconds
          const formattedDate = ISTTime.toISOString().slice(0, 16);
          setHOD_date(formattedDate);
          setHOD_sign(localStorage.getItem("username"))
          // console.log("sa", res.data);
          if (res.data == true) {
            setBtnStatus(true)
          }
        })
        .catch((err) => {
          // console.log("error", err);
        });
    } else if (roleBase == "SUPERVISOR") {
      setRestrictionFlag(true);
    } else if (roleBase == "QA") {
      setRestrictionFlag(true);
      setsupervisor(false);
      sethodIncharge(true);
      setshiftInchargeFlag(true);
      setApproveBtnEnable(true);
      setPerson("QA");
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Caking/Service/getqasign/${props.data[0].header_id}`,
          { headers }
        )
        .then((res) => {
          const now = new Date();
          const ISTOffset = 330; // Offset in minutes for IST (5 hours 30 minutes)
          const ISTTime = new Date(now.getTime() + ISTOffset * 60000); // Convert offset to milliseconds
          const formattedDate = ISTTime.toISOString().slice(0, 16);
          setQA_date(formattedDate);
          setQA_sign(localStorage.getItem("username"))
          // console.log("sa", res.data);
          if (res.data == true) {
            setBtnStatus(true)
          }

        })
        .catch((err) => {
          // console.log("error", err);
        });
    } else if (roleBase == "OPERATOR") {
      setRestrictionFlag(false);
      if (props.status == "SUBMIT") {
        setsupervisor(true);
        sethodIncharge(true);
        setshiftInchargeFlag(true);
        setBtnStatus(true);
      } else {
        setsupervisor(true);
        sethodIncharge(true);
        setshiftInchargeFlag(true);
        setBtnStatus(false);
      }
    }
    if (props.status == "SUBMIT") {
      setRestrictionFlag(true);
    }
    if (props.status === "SAVE" && roleBase == "OPERATOR") {
      setRestrictionFlag(false);
    }

    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 16);
      setINcharge_Date(formattedDate.replace('T', ' ')); // Replace 'T' with a space
    }, 1000 * 60); // Update every minute
    // Clean up
    return () => clearInterval(intervalId);


  }, [props]);

  // Function to handle submitting
  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      await sendBleachingJobCard();

      alert("Bleaching job card submitted successfully!");
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/welcome");
  };

  const handleSave = async () => {
    setSaveLoading(true);
    // Here you can add your logic for saving the data
    try {
      await sendBleachingJobCard2();
      alert("Bleaching job card Saved successfully!");
      setSaveLoading(false);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
      setSaveLoading(false);
    }
  };

  const sendBleachingJobCard = async () => {
    try {
      // Format the payload according to the API documentation
      const payload = {
        unit: "Unit H",
        formatName: "Bleaching Job Card",
        formatNo: "PRD-(R-01)-F-13",
        header_id: props.data[0].header_id,
        pages: "1",
        bmr_no: bmrNumber,
        date: newDate,
        shift: shift,
        finish: finish,
        mc_no: mcNumber,
        batch_no: batchNo,
        start_time: startTime,
        end_time: endTime,
        caustic_soda_flakes: CH_caustic,
        haipolene: CH_haipaloene,
        sarofom: CH_sarofom,
        hydrogen_peroxide: CH_Hydrogen,
        setilon_kn: CH_setilon,
        citric_acid: CH_citric,
        remarks: CH_remark,
        shift_sign: INcharge_sign,
        shift_date: INcharge_Date,
        department_sign: HOD_sign,
        department_date: HOD_date,
        qa_date: QA_date,
        qa_sign: QA_sign,

        wetting: [
          {
            wetting_id: props.data[0].wetting[0].wetting_id,
            water_level: PW_waterFill,
            temp_raising: PW_temp,
            circulation: PW_circulation,
            draining: PW_draining,
            actual_temp: PW_Observation,
          },
        ],
        scouring: [
          {
            scouring_id: props.data[0].scouring[0].scouring_id,
            water_level: SB_waterFill,
            temp_raising_one: SB_temp,
            chemical_trans_one: SB_causticTransfer,
            chemical_trans_two: SB_haipoleneTranfer,
            chemical_trans_three: SB_HydrogenTransfer,
            temp_raising_two: SB_NA_temp,
            circulation: SB_circulation,
            draining: SB_draining,
            actual_temp: SB_Observation,
          },
        ],
        hotwashOne: [
          {
            wash_one_id: props.data[0].hotwashOne[0].wash_one_id,
            water_level: HW_waterFill,
            temp_raising: HW_temp,
            circulation: HW_circulation,
            draining: HW_draining,
            actual_temp: HW_Observation,
          },
        ],
        hotwashTwo: [
          {
            wash_two_id: props.data[0].hotwashTwo[0].wash_two_id,
            water_level: HW_waterFill2,
            temp_raising: HW_temp2,
            circulation: HW_circulation2,
            draining: HW_draining2,
            actual_temp: setHW_Observation, // Add actual temperature for hotwashTwo
          },
        ],
        newtralizing: [
          {
            newtraliz_id: props.data[0].newtralizing[0].newtraliz_id,
            water_level: NW_waterFill,
            chemical_transf: NW_cheTransfer,
            temp_raising: NW_temp,
            circulation: NW_circulation,
            draining: NW_draining,
            actual_temp: NW_Observation,
          },
        ],
        finalprocess: [
          {
            final_id: props.data[0].finalprocess[0].final_id,
            water_level: FC_waterFill,
            circulation_temp: FC_circulation,
            surface: FC_surface,
            draining: FC_Draining,
            ph_actual: FC_ciruclationPH,
            surface_act_actual: FC_surfacePH,
          },
        ],
      };

      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/Caking/Service/UpdateBleachingJobCard`,
        payload,
        { headers }
      );

      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send bleaching job card");
    }
  };

  //SAve API

  const sendBleachingJobCard2 = async () => {
    try {
      // Format the payload according to the API documentation
      const payload = {
        unit: "Unit H",
        formatName: "Bleaching Job Card",
        formatNo: "PRD-(R-01)-F-13",
        header_id: props.data[0].header_id,
        pages: "1",
        bmr_no: bmrNumber,
        date: newDate,
        shift: shift,
        finish: finish,
        mc_no: mcNumber,
        batch_no: batchNo,
        start_time: startTime,
        end_time: endTime,
        caustic_soda_flakes: CH_caustic,
        haipolene: CH_haipaloene,
        sarofom: CH_sarofom,
        hydrogen_peroxide: CH_Hydrogen,
        setilon_kn: CH_setilon,
        citric_acid: CH_citric,
        remarks: CH_remark,
        shift_sign: INcharge_sign,
        shift_date: INcharge_Date,
        department_sign: HOD_sign,
        department_date: HOD_date,
        qa_date: QA_date,
        qa_sign: QA_sign,
        wetting: [
          {
            wetting_id: props.data[0].wetting[0].wetting_id,
            water_level: PW_waterFill,
            temp_raising: PW_temp,
            circulation: PW_circulation,
            draining: PW_draining,
            actual_temp: PW_Observation,
          },
        ],
        scouring: [
          {
            scouring_id: props.data[0].scouring[0].scouring_id,
            water_level: SB_waterFill,
            temp_raising_one: SB_temp,
            chemical_trans_one: SB_causticTransfer,
            chemical_trans_two: SB_haipoleneTranfer,
            chemical_trans_three: SB_HydrogenTransfer,
            temp_raising_two: SB_NA_temp,
            circulation: SB_circulation,
            draining: SB_draining,
            actual_temp: SB_Observation,
          },
        ],
        hotwashOne: [
          {
            wash_one_id: props.data[0].hotwashOne[0].wash_one_id,
            water_level: HW_waterFill,
            temp_raising: HW_temp,
            circulation: HW_circulation,
            draining: HW_draining,
            actual_temp: HW_Observation,
          },
        ],
        hotwashTwo: [
          {
            wash_two_id: props.data[0].hotwashTwo[0].wash_two_id,
            water_level: HW_waterFill2,
            temp_raising: HW_temp2,
            circulation: HW_circulation2,
            draining: HW_draining2,
            actual_temp: setHW_Observation, // Add actual temperature for hotwashTwo
          },
        ],
        newtralizing: [
          {
            newtraliz_id: props.data[0].newtralizing[0].newtraliz_id,
            water_level: NW_waterFill,
            chemical_transf: NW_cheTransfer,
            temp_raising: NW_temp,
            circulation: NW_circulation,
            draining: NW_draining,
            actual_temp: NW_Observation,
          },
        ],
        finalprocess: [
          {
            final_id: props.data[0].finalprocess[0].final_id,
            water_level: FC_waterFill,
            circulation_temp: FC_circulation,
            surface: FC_surface,
            draining: FC_Draining,
            ph_actual: FC_ciruclationPH,
            surface_act_actual: FC_surfacePH,
          },
        ],
      };

      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/Caking/Service/creatBleachingJobCard`,
        payload,
        { headers }
      );

      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send bleaching job card");
    }
  };

  const sendNewApi = (x) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // console.log("Clicked", x);
    if (x == "HOD") {
      // console.log("hod");
      axios
        .post(
          `${ API.prodUrl}/Precot/api/Caking/Service/hodApprove/${props.data[0].header_id}`,
          {
            dateTime: HOD_date,
            signature: HOD_sign,
          },
          { headers }
        )
        .then((res) => {
          // console.log("response", res.data);
          alert(res.data);
        })
        .catch((err) => {
          // console.log("error", err);
        });
    } else if (x == "SHIFT") {
      // console.log("shift");
      axios
        .post(
          `${ API.prodUrl}/Precot/api/Caking/Service/ShiftInchargeApprove/${props.data[0].header_id}`,
          {
            dateTime: INcharge_Date,
            signature: INcharge_sign,
          },
          { headers }
        )
        .then((res) => {
          // console.log("response", res.data);
          alert(res.data);
        })
        .catch((err) => {
          // console.log("error", err);
        });
    } else if (x == "QA") {
      // console.log("QA");
      axios
        .post(
          `${ API.prodUrl}/Precot/api/Caking/Service/QaApprove/${props.data[0].header_id}`,
          {
            dateTime: QA_date,
            signature: QA_sign,
          },
          { headers }
        )
        .then((res) => {
          // console.log("response", res.data);
          alert(res.data);
        })
        .catch((err) => {
          // console.log("error", err);
        });
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Activity Form - 1</p>,
      children: (
        <div>
          <table
            style={{ borderCollapse: "collapse", border: "1px solid black" }}
          >
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                S.No
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Process Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemicals Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Activity
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Standard Time in Minutes
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual Time in Minutes
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Observations
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                1
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Pre - Wetting
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                02 +/-1
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                }}
              >
                <input
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  className="inp-new"
                  value={PW_waterFill}
                  onChange={(e) => setPW_waterFill(e.target.value)}
                  disabled={restrictionFlag}
                />
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                <input
                  value={PW_Observation}
                  onChange={(e) => setPW_Observation(e.target.value)}
                  disabled={restrictionFlag}
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                />
                ℃
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Temperature raising to 70 ℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                10 +/- 3
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                }}
              >
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  value={PW_temp}
                  onChange={(e) => setPW_temp(e.target.value)}
                  disabled={restrictionFlag}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Circulation @ 70 +/- 5 ℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                09 +/-1
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                }}
              >
                <input
                  className="inp-new"
                  value={PW_circulation}
                  onChange={(e) => setPW_circulation(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Draining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                03 +/-1
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                }}
              >
                <input
                  className="inp-new"
                  value={PW_draining}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onChange={(e) => setPW_draining(e.target.value)}
                  disabled={restrictionFlag}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                2
              </td>
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Sourcing & Bleaching
              </td>
              <td
                colSpan="2"
                rowspan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                02 +/-1
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                }}
              >
                <input
                  className="inp-new"
                  value={SB_waterFill}
                  onChange={(e) => setSB_waterFill(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                rowspan="8"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                <input
                  className="inp-new"
                  value={SB_Observation}
                  onChange={(e) => setSB_Observation(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                />
                ℃
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Temperature raising to 70 ℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                08 +/-3
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                }}
              >
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  value={SB_temp}
                  disabled={restrictionFlag}
                  onChange={(e) => setSB_temp(e.target.value)}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Caustic Soda Flakes
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemical transfering
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                10 +/-2
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={SB_causticTransfer}
                  disabled={restrictionFlag}
                  onChange={(e) => setSB_causticTransfer(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Haipolene & Sarofom
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemical transfering
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                05 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={SB_haipoleneTranfer}
                  disabled={restrictionFlag}
                  onChange={(e) => setSB_haipoleneTranfer(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hydrogen peroxide
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemical transfering
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                05 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={SB_HydrogenTransfer}
                  disabled={restrictionFlag}
                  onChange={(e) => setSB_HydrogenTransfer(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                rowspan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Temperature raising to 110 ℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                15 +/-5
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={SB_NA_temp}
                  disabled={restrictionFlag}
                  onChange={(e) => setSB_NA_temp(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Circulation @ 110+/-5℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                50 +/-10
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={SB_circulation}
                  disabled={restrictionFlag}
                  onChange={(e) => setSB_circulation(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Draining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                05 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={SB_draining}
                  disabled={restrictionFlag}
                  onChange={(e) => setSB_draining(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            {/* Hot wash1 */}
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                3
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 01
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                02 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_waterFill}
                  disabled={restrictionFlag}
                  onChange={(e) => setHW_waterFill(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                rowspan="4"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :{" "}
                <input
                  className="inp-new"
                  value={HW_Observation}
                  disabled={restrictionFlag}
                  onChange={(e) => setHW_Observation(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                />
                ℃
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Temperature raising to 95 ℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                10 +/-3
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_temp}
                  disabled={restrictionFlag}
                  onChange={(e) => setHW_temp(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Circulation @ 95+/-5℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                09 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_circulation}
                  disabled={restrictionFlag}
                  onChange={(e) => setHW_circulation(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Draining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                03 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_draining}
                  onChange={(e) => setHW_draining(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            {/* Hot wash2 */}
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Activity Form - 2</p>,
      children: (
        <div>
          <table
            style={{ borderCollapse: "collapse", border: "1px solid black" }}
          >
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                4
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 02
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                02 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_waterFill2}
                  onChange={(e) => setHW_waterFill2(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                <input
                  className="inp-new"
                  value={HW_Observation}
                  onChange={(e) => setHW_Observation(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                />
                ℃
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Temperature raising to 90 ℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                10 +/-3
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_temp2}
                  onChange={(e) => setHW_temp2(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Circulation @ 90+/-5℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                09 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_circulation2}
                  onChange={(e) => setHW_circulation2(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Draining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                03 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HW_draining2}
                  onChange={(e) => setHW_draining2(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            {/* Nutralizing Wash */}

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                5
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Nutralizing Wash{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                02 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={NW_waterFill}
                  onChange={(e) => setNW_waterFill(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                rowspan="5"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                <input
                  value={NW_Observation}
                  onChange={(e) => setNW_Observation(e.target.value)}
                  disabled={restrictionFlag}
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                />
                ℃
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Citric Acid, Sarofom, Setilon KN/Persoftal 9490 (for Crispy
                finish Only)
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemical transfering
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                10 +/-3
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={NW_cheTransfer}
                  onChange={(e) => setNW_cheTransfer(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                rowspan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Temperature raising to 70 ℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                7 +/-3
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={NW_temp}
                  onChange={(e) => setNW_temp(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Circulation @ 70+/-5℃
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                09 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={NW_circulation}
                  onChange={(e) => setNW_circulation(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Draining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                03 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={NW_draining}
                  onChange={(e) => setNW_draining(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
            {/* Final Cloud*/}

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                6
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Final Cloud{" "}
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                02 +/-1
              </td>
              <td
                colSpan="2"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={FC_waterFill}
                  onChange={(e) => setFC_waterFill(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                pH Standard:5.5-6.5
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Circulation @ Normal Temperature
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                10 +/-3
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={FC_circulation}
                  onChange={(e) => setFC_circulation(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                pH actual:{" "}
                <input
                  className="inp-new"
                  value={FC_ciruclationPH}
                  onChange={(e) => setFC_ciruclationPH(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                    textAlign: "center",
                  }}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Surface Activity & pH conformation
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                05 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={FC_surface}
                  onChange={(e) => setFC_surface(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                pH actual:{" "}
                <input
                  className="inp-new"
                  value={FC_surfacePH}
                  onChange={(e) => setFC_surfacePH(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                    textAlign: "center",
                  }}
                />
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Draining
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                03 +/-1
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={FC_Draining}
                  onChange={(e) => setFC_Draining(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Surface Activity Standard: 6 sec
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Chemical Consumption Details / Batch</p>,
      children: (
        <div>
          <table
            style={{ borderCollapse: "collapse", border: "1px solid black" }}
          >
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemical Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Standards
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                unit
              </td>
              <td
                colSpan="3"
                rowSpan="7"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <textarea
                  value={CH_remark}
                  onChange={(e) => setCH_remark(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    margin: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    padding: "1em 0em 1em 0em",
                  }}
                />
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Caustic soda Flakes
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                28-42
              </td>
              <td
                colSpan="1"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={CH_caustic}
                  onChange={(e) => setCH_caustic(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                kgs
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Haipolene
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                10-12
              </td>
              <td
                colSpan="1"
                //  contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={CH_haipaloene}
                  onChange={(e) => setCH_haipaloene(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                kgs
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Sarofom
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                7.0-16.0
              </td>
              <td
                colSpan="1"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={CH_sarofom}
                  onChange={(e) => setCH_sarofom(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                kgs
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hydrogen peroxide
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                50-70
              </td>
              <td
                colSpan="1"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={CH_Hydrogen}
                  onChange={(e) => setCH_Hydrogen(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                liters
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Setilon KN / Persoftal 9490
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                1.5-3.5
              </td>
              <td
                colSpan="1"
                //contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={CH_setilon}
                  onChange={(e) => setCH_setilon(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                kgs
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Citric acid
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                6.5-9.5
              </td>
              <td
                colSpan="1"
                //contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={CH_citric}
                  onChange={(e) => setCH_citric(e.target.value)}
                  disabled={restrictionFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                kgs
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            style={{ borderCollapse: "collapse", border: "1px solid black" }}
          >
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Shift IN-Charge
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Reviewed by Head of the Department/Production In-Charge
              </td>
              <td
                colSpan="6"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                QA
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Signature
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Date
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Signature
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Date
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Signature
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Date
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={INcharge_sign}
                  onChange={(e) => setINcharge_sign(e.target.value)}
                  disabled={shiftInchargeFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="2"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={INcharge_Date}
                  type="datetime-local"
                  onChange={(e) => setINcharge_Date(e.target.value)}
                  disabled={shiftInchargeFlag}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="1"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HOD_sign}
                  onChange={(e) => setHOD_sign(e.target.value)}
                  disabled={hodIncharge}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="1"
                //contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={HOD_date}
                  type="datetime-local"
                  onChange={(e) => setHOD_date(e.target.value)}
                  disabled={hodIncharge}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  value={QA_sign}
                  onChange={(e) => setQA_sign(e.target.value)}
                  disabled={supervisor}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
              <td
                colSpan="3"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <input
                  className="inp-new"
                  type="datetime-local"
                  value={QA_date}
                  onChange={(e) => setQA_date(e.target.value)}
                  disabled={supervisor}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                />
              </td>
            </tr>
          </table>
          {/* Container for buttons positioned at the right */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="BLEACHING JOB CARD"
        formatNo="PH-PRD01/F-015"
        buttonsArray={[
          <Button
            loading={saveLoading}
            onClick={handleSave}
            style={{ marginRight: "10px", display: BtnStatus == false ? "block" : "none" }}
            type="primary"
          >
            Save
          </Button>,
          <Button
            onClick={() => sendNewApi(person)}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: 12,
              display: alreadyApprove == false && approveBtnEnable == true && BtnStatus == false ? "block" : "none"
            }}
            type="primary"
          >
            Approve
          </Button>,
          <Button
            loading={submitLoading}
            onClick={handleSubmit}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: 12,
              display: approveBtnEnable == false && BtnStatus == false ? "block" : "none"
            }}
            type="primary"
          >
            Submit
          </Button>
        ]}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            marginRight: "1em",
            display: "flex",
          }}
        >
          <Input
            addonBefore="BMR Number"
            placeholder="BMR Number"
            size="small"
            disabled={restrictionFlag}
            value={bmrNumber}
            onChange={(e) => setBmrNumber(e.target.value)}
          />
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            disabled={restrictionFlag}
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Input
            addonBefore="Shift"
            placeholder="Shift"
            type="number"
            size="small"
            disabled={restrictionFlag}
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          />
          <Input
            addonBefore="Finish"
            placeholder="Finish"
            disabled={restrictionFlag}
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            size="small"
          />
        </div>
        <div
          style={{
            width: "100%",
            marginRight: "1em",
            display: "flex",
          }}
        >
          <Input
            addonBefore="M/C Number"
            placeholder="M/C Number"
            size="small"
            type="number"
            disabled={restrictionFlag}
            value={mcNumber}
            onChange={(e) => setMcNumber(e.target.value)}
          />
          <Input
            addonBefore="Batch No"
            placeholder="Batch No"
            size="small"
            type="number"
            disabled={restrictionFlag}
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)}
          />
          <Input
            addonBefore="Start Time"
            placeholder="Start Time"
            size="small"
            type="time"
            disabled={restrictionFlag}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            addonBefore="End Time"
            placeholder="End Time"
            size="small"
            disabled={restrictionFlag}
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default BleachingEdit;
