/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Drawer,
  Tooltip,
  Row,
  Col,
  Avatar,
  Menu,
  Tabs,
  Form,
  Select,
  Input,
  Radio,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import axios from "axios";
import API from "../baseUrl.json";
import { useReactToPrint } from "react-to-print";

const Raw_Material_Issue = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [initialDate, setInitialDate] = useState("");
  const [bmrList, setBmrList] = useState([]);
  const [bmr, setBmr] = useState("");
  const [status, setStatus] = useState("");
  const [packingDetails, setPackingDetails] = useState([]);
  const [hydrogen_peroxidebatch, setHydrogenbatch] = useState("");
  const [hydrogen_peroxidequantity, setHydrogenquantity] = useState("");
  const [caustic_soda_flakesbatch, setCausticSodaflakesbatch] = useState("");
  const [caustic_soda_flakesquantity, setCausticSodaflakesquantity] =
    useState("");
  const [citric_acidbatch, setCitricacidbatch] = useState("");
  const [citric_acidquantity, setCitricacidquantity] = useState("");
  const [sarofombatch, setSarofombatch] = useState("");
  const [sarofomquantity, setSarofomquantity] = useState("");
  const [haipolenebatch, setHaipolenebatch] = useState("");
  const [haipolenequantity, setHaipolenequantity] = useState("");
  const [optionalbatch, setOptionalbatch] = useState("");
  const [optionalquantity, setOptionalquantity] = useState("");
  const [hdpe_bagbatch, setHdpeBagBatch] = useState("");
  const [hdpe_bagquantity, setHdpeBagQuantity] = useState("");
  const [strapperbatch, setStrapperBatch] = useState("");
  const [strapperquantity, setStrapperQuantity] = useState("");
  const [optionalState, setOptionalState] = useState("");
  const [storePersons, setStorePersons] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issuedBy1, setIssuedBy1] = useState("");
  const [departmentPersons, setDepartmentPersons] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("");
  const [verifiedBy1, setVerifiedBy1] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [bmrDetails, setBmrDetails] = useState("");
  const [error, setError] = useState("");
  const [issuebtnstatus, setIssueBtnStatus] = useState(false);
  const [buttonColor, setButtonColor] = useState("defaultColor");
  const [disable, setDisable] = useState(false);
  const [state, setState] = useState({
    _1_id: "",
    _2_id: "",
    _3_id: "",
    _4_id: "",
    _5_id: "",
    _6_id: "",
    _7_id: "",
    _8_id: "",
    master_Id: "",
  });
  const updateState = (updates) => {
    setState((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (key) => {
    // console.log(key);
  };
  const bmrChange = (values) => {
    // console.log("values", values);
    setBmr(values);
  };
  const radioChange = (value) => {
    // console.log("radio", value.target.value);
    setOptionalState(value.target.value);
  };

  const clearStateValues = () => {
    setHydrogenbatch("");
    setHydrogenquantity("");
    setCausticSodaflakesbatch("");
    setCausticSodaflakesquantity("");
    setCitricacidbatch("");
    setCitricacidquantity("");
    setSarofombatch("");
    setSarofomquantity("");
    setHaipolenebatch("");
    setHaipolenequantity("");
    setOptionalbatch("");
    setOptionalquantity("");
    setHdpeBagBatch("");
    setHdpeBagQuantity("");
    setStrapperBatch("");
    setStrapperQuantity("");
    setOptionalState("");
    setIssuedBy("");
    setVerifiedBy("");
  };

  // Function to handle setting multiple states for optional chemicals
  const updateOptionalChemicalState = (chemical) => {
    setOptionalState(chemical.chemicalName);
    setOptionalbatch(chemical.batchNo);
    setOptionalquantity(chemical.quantity);
  };

  // Get the Bmr Details.....
  const handleBmrChange = (values) => {
    // console.log("Value bmr ", values);
    setBmr(values);
    // console.log("bmr", bmr);
    // Fetch shift options from the API
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/summary/chemicalDetailsbyBmr`, {
        headers,
        params: {
          bmr_no: values,
        },
      })
      .then((res) => {
        console.log(res.data[0].status);
        switch (res.data[0].status) {
          case null:
            setStatus("NULL");
            setDisable(false);
            break;
          case "SAVE":
            setStatus("SAVE");
            setDisable(false);
            break;
          case "SUBMIT":
            setStatus("SUBMIT");
            setDisable(true);
            break;
          default:
            setStatus("NULL");
            setDisable(false);
            break;
        }

        setBmrDetails(res.data);
        clearStateValues();
        if (res.data.length > 0) {
          updateState({ master_Id: res.data[0].id });
          setIssueBtnStatus(true);
          setInitialDate(res.data[0].date);
          setBmr(res.data[0].bmr_no);

          res.data[0].chemicalDetails.forEach((chemical) => {
            switch (chemical.chemicalName) {
              case "Hydrogen Peroxide":
                setHydrogenbatch(chemical.batchNo);
                setHydrogenquantity(chemical.quantity);
                setIssuedBy(chemical.issuedBy);
                setVerifiedBy(chemical.verifiedBy);
                console.log("HP", chemical);
                updateState({ _1_id: chemical.chemicalId });
                break;
              case "Caustic Soda Flakes":
                setCausticSodaflakesbatch(chemical.batchNo);
                setCausticSodaflakesquantity(chemical.quantity);
                updateState({ _2_id: chemical.chemicalId });
                break;
              case "Citric Acid":
                setCitricacidbatch(chemical.batchNo);
                setCitricacidquantity(chemical.quantity);
                updateState({ _3_id: chemical.chemicalId });
                break;
              case "Sarofom":
                setSarofombatch(chemical.batchNo);
                setSarofomquantity(chemical.quantity);
                updateState({ _4_id: chemical.chemicalId });
                break;
              case "Haipolene":
                setHaipolenebatch(chemical.batchNo);
                setHaipolenequantity(chemical.quantity);
                updateState({ _5_id: chemical.chemicalId });
                break;
              case "Persoftal 9490":
              case "Setilon KN":
                // updateOptionalChemicalState(chemical);
                console.log("gg", chemical.chemicalName);
                if (chemical.chemicalName == "Setilon KN") {
                  setOptionalState("SETILON");
                  setOptionalbatch(chemical.batchNo);
                  setOptionalquantity(chemical.quantity);
                  updateState({ _6_id: chemical.chemicalId });
                } else if (chemical.chemicalName == "Persoftal 9490") {
                  setOptionalState("PERSOFTAL");
                  setOptionalbatch(chemical.batchNo);
                  setOptionalquantity(chemical.quantity);
                  updateState({ _6_id: chemical.chemicalId });
                }
                // setOptionalState(chemical.chemicalName);

                break;

              default:
                break;
            }
          });

          // Assuming the packing details array contains specific objects for each packing material
          res.data[0].packingDetails.forEach((packing) => {
            switch (packing.packingName) {
              case "HDPE Bag":
                setHdpeBagBatch(packing.batchNo);
                setHdpeBagQuantity(packing.quantity);
                setIssuedBy(packing.issuedBy);
                setVerifiedBy(packing.verifiedBy);
                updateState({ _7_id: packing.packingId });
                break;
              case "Strapper":
                setStrapperBatch(packing.batchNo);
                setStrapperQuantity(packing.quantity);
                updateState({ _8_id: packing.packingId });
                break;
              default:
                break;
            }
          });
        } else {
          // console.log("No Data Found !!!");
          clearStateValues();
          setIssueBtnStatus(false);
          setDisable(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          console.log(err.response.data.message);
          // messageApi.error(err.response.data.message);
          clearStateValues();
          setIssueBtnStatus(false);
          setDisable(false);
        } else {
          // console.log("Error", err);
          messageApi.error(err.response.data.message)
        }
      });
  };

  const handleHydroChanges = (e) => {
    let value = e.target.value;
    // Allow only numeric values
    if (/^\d*$/.test(value)) {
      setHydrogenquantity(value);
      setError("");
    } else {
      setError("Please enter a valid non-negative number.");
    }
  };

  const materialIssue = () => {
    if (bmr === "") {
      message.warning("Please Select BMR");
      return;
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const commonChemicalDetails = [
      {
        chemicalName: "Hydrogen Peroxide",
        batchNo: hydrogen_peroxidebatch,
        quantity: hydrogen_peroxidequantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Liter",
      },
      {
        chemicalName: "Caustic Soda Flakes",
        batchNo: caustic_soda_flakesbatch,
        quantity: caustic_soda_flakesquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
      },
      {
        chemicalName: "Citric Acid",
        batchNo: citric_acidbatch,
        quantity: citric_acidquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
      },
      {
        chemicalName: "Sarofom",
        batchNo: sarofombatch,
        quantity: sarofomquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
      },
      {
        chemicalName: "Haipolene",
        batchNo: haipolenebatch,
        quantity: haipolenequantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
      },
    ];

    if (optionalState === "PERSOFTAL") {
      commonChemicalDetails.push({
        chemicalName: "Persoftal 9490",
        batchNo: optionalbatch,
        quantity: optionalquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
      });
    } else if (optionalState === "SETILON") {
      commonChemicalDetails.push({
        chemicalName: "Setilon KN",
        batchNo: optionalbatch,
        quantity: optionalquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
      });
    }

    const payload = {
      bmr_no: bmr,
      date: new Date(initialDate).toISOString().slice(0, 10),
      id: state.master_Id,
      chemicalDetails: commonChemicalDetails,
      packingDetails: [
        {
          packingName: "Strapper",
          batchNo: strapperbatch,
          quantity: strapperquantity,
          issuedBy: issuedBy,
          verifiedBy: verifiedBy,
          unit: "Meter",
        },
        {
          packingName: "HDPE Bag",
          batchNo: hdpe_bagbatch,
          quantity: hdpe_bagquantity,
          issuedBy: issuedBy,
          verifiedBy: verifiedBy,
          unit: "Set",
        },
      ],
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/createChemicals`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.log(res.data);
        messageApi.open({
          type: "success",
          content: "Material Issued Saved Successfully",
        });
        // navigate("/Precot/choosenScreen");
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1000);
      })
      .catch((err) => {
        console.log("err", err);
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
        console.log(err);
      });
  };

  //Submit
  const materialIssueSubmit = () => {
    if (bmr === "") {
      message.warning("Please Select BMR");
      return;
    }
    const requiredFields = [
      { name: "Hydrogen Peroxide Batch Number", value: hydrogen_peroxidebatch },
      { name: "Hydrogen Peroxide Quantity", value: hydrogen_peroxidequantity },
      {
        name: "Caustic Soda Flakes Batch Number",
        value: caustic_soda_flakesbatch,
      },
      {
        name: "Caustic Soda Flakes Quantity",
        value: caustic_soda_flakesquantity,
      },
      { name: "Citric Acid Batch Number", value: citric_acidbatch },
      { name: "Citric Acid Quantity", value: citric_acidquantity },
      { name: "Sarofom Batch Number", value: sarofombatch },
      { name: "Sarofom Quantity", value: sarofomquantity },
      { name: "Haipolene Batch Number", value: haipolenebatch },
      { name: "Haipolene Quantity", value: haipolenequantity },
      { name: "Strapper Batch Number", value: strapperbatch },
      { name: "Strapper Quantity", value: strapperquantity },
      { name: "HDPE Bag Batch Number", value: hdpe_bagbatch },
      { name: "HDPE Bag Quantity", value: hdpe_bagquantity },
      { name: "Issued By", value: issuedBy },
      { name: "Verified By", value: verifiedBy },
    ];
    if (optionalState === "PERSOFTAL" || optionalState === "SETILON") {
      requiredFields.push(
        {
          name:
            optionalState === "PERSOFTAL"
              ? "Persoftal Batch Number"
              : "Setilon Batch Number",
          value: optionalbatch,
        },
        {
          name:
            optionalState === "PERSOFTAL"
              ? "Persoftal Quantity"
              : "Setilon Quantity",
          value: optionalquantity,
        }
      );
    }
    for (const field of requiredFields) {
      if (!field.value) {
        message.warning(`Please enter ${field.name}`);
        return;
      }
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const commonChemicalDetails = [
      {
        chemicalName: "Hydrogen Peroxide",
        batchNo: hydrogen_peroxidebatch,
        quantity: hydrogen_peroxidequantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Liter",
        chemicalId: state._1_id,
      },
      {
        chemicalName: "Caustic Soda Flakes",
        batchNo: caustic_soda_flakesbatch,
        quantity: caustic_soda_flakesquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
        chemicalId: state._2_id,
      },
      {
        chemicalName: "Citric Acid",
        batchNo: citric_acidbatch,
        quantity: citric_acidquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
        chemicalId: state._3_id,
      },
      {
        chemicalName: "Sarofom",
        batchNo: sarofombatch,
        quantity: sarofomquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
        chemicalId: state._4_id,
      },
      {
        chemicalName: "Haipolene",
        batchNo: haipolenebatch,
        quantity: haipolenequantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
        chemicalId: state._5_id,
      },
    ];

    if (optionalState === "PERSOFTAL") {
      commonChemicalDetails.push({
        chemicalName: "Persoftal 9490",
        batchNo: optionalbatch,
        quantity: optionalquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
        chemicalId: state._6_id,
      });
    } else if (optionalState === "SETILON") {
      commonChemicalDetails.push({
        chemicalName: "Setilon KN",
        batchNo: optionalbatch,
        quantity: optionalquantity,
        issuedBy: issuedBy,
        verifiedBy: verifiedBy,
        unit: "Kg",
        chemicalId: state._6_id,
      });
    }

    const payload = {
      bmr_no: bmr,
      date: new Date(initialDate).toISOString().slice(0, 10),
      id: state.master_Id,
      chemicalDetails: commonChemicalDetails,
      packingDetails: [
        {
          packingName: "Strapper",
          batchNo: strapperbatch,
          quantity: strapperquantity,
          issuedBy: issuedBy,
          verifiedBy: verifiedBy,
          unit: "Meter",
          packingId: state._7_id,
        },
        {
          packingName: "HDPE Bag",
          batchNo: hdpe_bagbatch,
          quantity: hdpe_bagquantity,
          issuedBy: issuedBy,
          verifiedBy: verifiedBy,
          unit: "Set",
          packingId: state._8_id,
        },
      ],
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/summary/SubmitChemicals`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.log(res.data);
        messageApi.open({
          type: "success",
          content: "Material Issued Successfully",
        });
        // navigate("/Precot/choosenScreen");
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1000);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
        // console.log(err);
      });
  };
  const items = [
    {
      key: "1",
      label: "Chemical Issue and Consumption",
      children: (
        <>
          <table>
            <tr>
              <th style={{ padding: "1em" }}>S.No</th>
              <th>Name of the Chemicals</th>
              <th>Chemical Batch No</th>
              <th>Quantity</th>
              <th>Units</th>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                1
              </td>
              <td>
                <b>Hydrogen Peroxide</b>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={hydrogen_peroxidebatch}
                  onChange={(e) => setHydrogenbatch(e.target.value)}
                  type="text"
                  disabled={disable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={hydrogen_peroxidequantity}
                  // onChange={(e) => setHydrogenquantity(e.target.value)}
                  onChange={handleHydroChanges}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td align="center">
                <b>Liter</b>
              </td>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                2
              </td>
              <td>
                <b>Caustic Soda Flakes</b>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={caustic_soda_flakesbatch}
                  onChange={(e) => setCausticSodaflakesbatch(e.target.value)}
                  type="text"
                  disabled={disable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={caustic_soda_flakesquantity}
                  onChange={(e) => setCausticSodaflakesquantity(e.target.value)}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td align="center">
                <b>Kg</b>
              </td>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                3
              </td>
              <td>
                <b>Citric acid</b>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={citric_acidbatch}
                  onChange={(e) => setCitricacidbatch(e.target.value)}
                  type="text"
                  disabled={disable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={citric_acidquantity}
                  onChange={(e) => setCitricacidquantity(e.target.value)}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td align="center">
                <b>Kg</b>
              </td>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                4
              </td>
              <td>
                <b>Sarofom</b>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={sarofombatch}
                  onChange={(e) => setSarofombatch(e.target.value)}
                  type="text"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={sarofomquantity}
                  onChange={(e) => setSarofomquantity(e.target.value)}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td align="center">
                <b>Kg</b>
              </td>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                5
              </td>
              <td>
                <b>Haipolene</b>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={haipolenebatch}
                  onChange={(e) => setHaipolenebatch(e.target.value)}
                  type="text"
                  disabled={disable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={haipolenequantity}
                  onChange={(e) => setHaipolenequantity(e.target.value)}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td align="center">
                <b>Kg</b>
              </td>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                6
              </td>
              <td>
                <Radio.Group onChange={radioChange} value={optionalState} disabled={disable}>
                  <Radio
                    value="PERSOFTAL"
                    style={{
                      fontSize: "12px",
                      fontWeight: "medium",
                    }}
                  >
                    <b>Persoftal 9490</b>
                  </Radio>
                  <Radio
                    value="SETILON"
                    style={{
                      fontSize: "12px",
                      fontWeight: "medium",
                    }}
                  >
                    <b>Setilon KN</b>
                  </Radio>
                  <Radio
                    value="NA"
                    style={{
                      fontSize: "12px",
                      fontWeight: "medium",
                    }}
                  >
                    <b>NA</b>
                  </Radio>
                </Radio.Group>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={optionalbatch}
                  onChange={(e) => setOptionalbatch(e.target.value)}
                  type="text"
                  disabled={disable || optionalState == "NA"}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={optionalquantity}
                  onChange={(e) => setOptionalquantity(e.target.value)}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable || optionalState == "NA"}
                />
              </td>
              <td align="center">
                <b>Kg</b>
              </td>
            </tr>
          </table>
          <td style={{ border: "none", justifyContent: "flex" }}>
            <Form
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Form.Item
                label="Issued By"
                style={{
                  marginLeft: "50px",
                }}
              >
                <Select
                  onChange={(value) => setIssuedBy(value)}
                  // Assuming setIssuedBy is the state updater for issuedBy

                  options={storePersons}
                  value={issuedBy}
                  placeholder="Select Issued By"
                  style={{ width: "200px" }}
                  disabled={disable}
                />
              </Form.Item>
              <Form.Item
                label="Verified By"
                style={{
                  marginRight: "80px",
                }}
              >
                <Select
                  onChange={(value) => setVerifiedBy(value)}
                  options={departmentPersons}
                  value={verifiedBy}
                  placeholder="Verified By"
                  style={{ width: "200px" }}
                  disabled={disable}
                />
              </Form.Item>
            </Form>
          </td>
        </>
      ),
    },
    {
      key: "2",
      label: "Packing Material Issue",
      children: (
        <>
          <table>
            <tr>
              <th style={{ padding: "1em" }}>S.No</th>
              <th>Name of the Packing Material</th>
              <th>Batch No</th>
              <th>Quantity</th>
              <th>Units</th>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                1
              </td>
              <td>
                <b>Strapper</b>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={strapperbatch}
                  onChange={(e) => setStrapperBatch(e.target.value)}
                  type="text"
                  disabled={disable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={strapperquantity}
                  onChange={(e) => setStrapperQuantity(e.target.value)}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td align="center">
                <b>Meter</b>
              </td>
            </tr>
            <tr>
              <td align="center" style={{ padding: "1em" }}>
                2
              </td>
              <td>
                <b>HDPE Bag</b>
              </td>
              <td>
                <input
                  className="inp-new"
                  value={hdpe_bagbatch}
                  onChange={(e) => setHdpeBagBatch(e.target.value)}
                  type="text"
                  disabled={disable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  value={hdpe_bagquantity}
                  onChange={(e) => setHdpeBagQuantity(e.target.value)}
                  type="number"
                  min="0"
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  disabled={disable}
                />
              </td>
              <td align="center">
                <b>Set</b>
              </td>
            </tr>
          </table>
          <td style={{ border: "none", justifyContent: "flex" }}>
            <Form
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Form.Item
                label="Issued By"
                style={{
                  marginLeft: "50px",
                }}
              >
                <Select
                  onChange={(value) => setIssuedBy(value)} // Assuming setIssuedBy is the state updater for issuedBy
                  options={storePersons}
                  value={issuedBy}
                  placeholder="Select Issued By"
                  style={{ width: "200px" }}
                  disabled={disable}
                />
              </Form.Item>
              <Form.Item
                label="Verified By"
                style={{
                  marginRight: "80px",
                }}
              >
                <Select
                  onChange={(value) => setVerifiedBy(value)}
                  options={departmentPersons}
                  value={verifiedBy}
                  placeholder="Verified By"
                  style={{ width: "200px" }}
                  disabled={disable}
                />
              </Form.Item>
            </Form>
          </td>
        </>
      ),
    },
  ];

  useEffect(() => {
    setInitialDate(new Date().toISOString().substring(0, 10));
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`, {
        headers,
      })
      .then((res) => {
        // console.log("BMRLOV", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.BMR_NO,
            label: x.BMR_NO,
          };
        });
        // console.log("aa", a);
        setBmrList(a);
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  }, []);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getSupervisor?departmentId=1`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log("DepartmentPersons", res.data);

        // Filter items where name is not null

        // Map filtered data to options array
        const options = res.data.map((item) => ({
          label: item.username,
          value: item.username,
        }));

        // console.log("Options Department:", options);
        setDepartmentPersons(options); // Update state with filtered options
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  }, []);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${API.prodUrl}/Precot/api/bleaching/bleachStorePersons/getAll`, {
        headers,
      })
      .then((res) => {
        // console.log("storePersons", res.data);

        // Filter items where name is not null
        const filteredData = res.data.filter((item) => item.name !== null);

        // Map filtered data to options array
        const options = filteredData.map((item) => ({
          id: item.id,
          value: item.name,
        }));

        // console.log("Options:", options);
        setStorePersons(options); // Update state with filtered options
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  }, []);

  return (
    <div>
      <BleachingHeader
        formName="Chemical Issue"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status == "SUBMIT" ? "none" : "block",
            }}
            shape="round"
            onClick={materialIssue}
            // disabled={issuebtnstatus}
          >
            Save
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status == "SUBMIT" ? "none" : "block",
            }}
            shape="round"
            onClick={materialIssueSubmit}
            // disabled={issuebtnstatus}
          >
            Submit
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={() => navigate("/Precot/choosenScreen")}
          >
            Back
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<FaLock color="#00308F" />}
            onClick={() => {
              if (confirm("You Want to logged out")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
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
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            localStorage.getItem("role") == "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Raw Material Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "6",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <div>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Form.Item
            label="Date"
            style={{
              marginRight: "20px",
            }}
          >
            <Input
              type="date"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              max={initialDate}
            />
          </Form.Item>
          <Form.Item label="BMR NO">
            <Select
              onChange={(values) => handleBmrChange(values)}
              options={bmrList}
              placeholder="Choose BMR"
            />
          </Form.Item>
        </Form>
      </div>
      <Tabs
        style={{ width: "90%", position: "relative", left: "2%" }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      {contextHolder}
    </div>
  );
};

export default Raw_Material_Issue;
