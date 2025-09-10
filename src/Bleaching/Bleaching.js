/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

import API from "../baseUrl.json";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
const Bleaching = () => {
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
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const onChange = (key) => {
    console.log(key);
  };

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Function to handle submitting
  const handleSubmit = async () => {
    setSubmitLoading(true);
        try {
      await sendBleachingJobCard2();
      //console.log("Date Format :",new Date(INcharge_Date).toLocaleDateString() + " " +new Date(INcharge_Date).toLocaleDateString )
      alert("Bleaching job card submitted successfully!");
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/BleachingSummary");
  };

  const sendBleachingJobCard = async () => {
    try {
      // Format the payload according to the API documentation
      const payload = {
        unit: "Unit H",
        formatName: "Bleaching Job Card",
        formatNo: "PRD-(R-01)-F-13",
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
        remarks: remarks,
        shift_sign: INcharge_sign,
        shift_date: INcharge_Date,
        department_sign: HOD_sign,
        department_date: HOD_date,
        qa_date: QA_date,
        qa_sign: QA_sign,
        wetting: [
          {
            water_level: PW_waterFill,
            temp_raising: PW_temp,
            circulation: PW_circulation,
            draining: PW_draining,
            actual_temp: PW_Observation,
          },
        ],
        scouring: [
          {
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
            water_level: HW_waterFill,
            temp_raising: HW_temp,
            circulation: HW_circulation,
            draining: HW_draining,
            actual_temp: HW_Observation,
          },
        ],
        hotwashTwo: [
          {
            water_level: HW_waterFill2,
            temp_raising: HW_temp2,
            circulation: HW_circulation2,
            draining: HW_draining2,
            actual_temp: setHW_Observation, // Add actual temperature for hotwashTwo
          },
        ],
        newtralizing: [
          {
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
        `${API.prodUrl}/Precot/api/Caking/Service/creatBleachingJobCard`,
        payload,
        { headers }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send bleaching job card");
    }
  };

  const handleSave = async () => {
    setSaveLoading(true);
    // Here you can add your logic for saving the data
    try {
      await sendBleachingJobCard();
      alert("Bleaching job card Saved successfully!");
      setSaveLoading(false);
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
      setSaveLoading(false);
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
        remarks: remarks,
        shift_sign: INcharge_sign,
        shift_date: INcharge_Date,
        department_sign: HOD_sign,
        department_date: HOD_date,
        qa_date: QA_date,
        qa_sign: QA_sign,
        wetting: [
          {
            water_level: PW_waterFill,
            temp_raising: PW_temp,
            circulation: PW_circulation,
            draining: PW_draining,
            actual_temp: PW_Observation,
          },
        ],
        scouring: [
          {
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
            water_level: HW_waterFill,
            temp_raising: HW_temp,
            circulation: HW_circulation,
            draining: HW_draining,
            actual_temp: HW_Observation,
          },
        ],
        hotwashTwo: [
          {
            water_level: HW_waterFill2,
            temp_raising: HW_temp2,
            circulation: HW_circulation2,
            draining: HW_draining2,
            actual_temp: setHW_Observation, // Add actual temperature for hotwashTwo
          },
        ],
        newtralizing: [
          {
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
        `${API.prodUrl}/Precot/api/Caking/Service/UpdateBleachingJobCard`,
        payload,
        { headers }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send bleaching job card");
    }
  };

  useEffect(() => {
    const roleBase = localStorage.getItem("role");
    if (roleBase == "SHIFT IN-CHARGE") {
      setsupervisor(true);
      sethodIncharge(true);
      setshiftInchargeFlag(false);
    } else if (roleBase == "HOD") {
      setsupervisor(true);
      sethodIncharge(false);
      setshiftInchargeFlag(true);
    } else if (roleBase == "QA") {
      setsupervisor(false);
      sethodIncharge(true);
      setshiftInchargeFlag(true);
    } else if (roleBase == "OPERATOR") {
      setsupervisor(true);
      sethodIncharge(true);
      setshiftInchargeFlag(true);
    }
  }, []);
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
                  type="number"
                  // min="1"
                  // max="3"
                  className="inp-new"
                  value={PW_waterFill}
                  onChange={(e) => setPW_waterFill(e.target.value)}
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
                Supervisor
              </td>
              <td
                colSpan="6"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Reviewed by Head of the Department/Production In-Charge
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
                  type="datetime-local"
                  value={INcharge_Date}
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
                  value={HOD_date}
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
        formatNo="PRD01/F-13"
        buttonsArray={[
          <Button
          loading={saveLoading}
            onClick={handleSave}
            style={{ marginRight: "10px" }}
            type="primary"
          >
            Save
          </Button>,
          <Button
          loading={submitLoading}
            onClick={handleSubmit}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
            }}
            type="primary"
          >
            Submit
          </Button>,
          <Button
            onClick={handleBack}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
            }}
            type="primary"
          >
            Back
          </Button>,
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
            value={bmrNumber}
            onChange={(e) => setBmrNumber(e.target.value)}
          />
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Input
            addonBefore="Shift"
            placeholder="Shift"
            type="number"
            size="small"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          />
          <Input
            addonBefore="Finish"
            placeholder="Finish"
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
            value={mcNumber}
            onChange={(e) => setMcNumber(e.target.value)}
          />
          <Input
            addonBefore="Batch No"
            placeholder="Batch No"
            size="small"
            type="number"
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)}
          />
          <Input
            addonBefore="Start Time"
            placeholder="Start Time"
            size="small"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            addonBefore="End Time"
            placeholder="End Time"
            size="small"
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

export default Bleaching;
