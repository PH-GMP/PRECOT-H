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
  import { IoCreate, IoSave } from "react-icons/io5";
  import axios from "axios";
  import API from "../baseUrl.json";
  import { useReactToPrint } from "react-to-print";
import { GrDocumentStore } from "react-icons/gr";
  
  const Raw_Material_Issue = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [initialDate, setInitialDate] = useState("");
    const [bmrList, setBmrList] = useState([]);
    const [bmr, setBmr] = useState("");
    const [status, setStatus] = useState("");
    const [packingDetails, setPackingDetails] = useState([]);
  
    
    const [ropebatch, setRopeBatch] = useState("");
    const [ropequantity, setRopeQuantity] = useState("");
    const [ropeRemarks, setRopeRemarks] = useState("");

    const [palletbatch, setPalletBatch] = useState("");
    const [palletquantity, setPalletQuantity] = useState("");
    const [palletRemarks, setPalletRemarks] = useState("");

    const [stretchbatch, setStretchBatch] = useState("");
    const [stretchquantity, setStretchQuantity] = useState("");
    const [stretchRemarks, setStretchRemarks] = useState("");

    const [hdpecoverbatch, setHdpeCoverBatch] = useState("");
    const [hdpecoverquantity, setHdpeCoverQuantity] = useState("");
    const [hdpeRemarks, setHdpeRemarks] = useState("");

    const [foamSheetbatch, setfoamSheetBatch] = useState("");
    const [foamSheetquantity, setfoamSheetQuantity] = useState("");
    const [foamSheetRemarks, setfoamSheetRemarks] = useState("");


    const [optionalState, setOptionalState] = useState("");
    const [storePersons, setStorePersons] = useState("");
   
    const [departmentPersons, setDepartmentPersons] = useState("");
   
    const [messageApi, contextHolder] = message.useMessage();
   
    const [disable, setDisable] = useState(false);
    const [state, setState] = useState({
      _1_id: "",
      _2_id: "",
      _3_id: "",
      _4_id: "",
      _5_id: "",
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
      setRopeBatch('');
      setRopeQuantity('');
      setRopeRemarks('');
      setStretchBatch('');
      setStretchQuantity('');
      setStretchRemarks('');
      setPalletBatch('');
      setPalletQuantity('');
      setPalletRemarks('');
      setHdpeCoverBatch('');
      setHdpeCoverQuantity('');
      setHdpeRemarks('');
      setfoamSheetBatch('');
      setfoamSheetQuantity('');
      setfoamSheetRemarks('');

    };
  
    // Function to handle setting multiple states for optional chemicals
    // const updateOptionalChemicalState = (chemical) => {
    //   setOptionalState(chemical.chemicalName);
    //   setOptionalbatch(chemical.batchNo);
    //   setOptionalquantity(chemical.quantity);
    // };
  
    // Get the Bmr Details.....
    const handleBmrChange = (values) => {
      console.log("Value bmr ", values);
      setBmr(values);
      // console.log("bmr", bmr);
      // Fetch shift options from the API
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(`${ API.prodUrl}/Precot/api/spunlace/summary/03.GetPackingMeterialIssue`, {
          headers,
          params: {
            order_no: values,
          },
        })
        .then((res) => {
            if(res.data.length > 0){
            setBmr(res.data[0].order_no);
          console.log(res.data[0].status);
          switch (res.data[0].status) {
            case null:
              setStatus("NULL");
              setDisable(false);
              break;
            case "SUPERVISOR_SAVED":
              setStatus("SAVE");
              setDisable(false);
              break;
            case "SUPERVISOR_APPROVED":
              setStatus("SUBMIT");
              setDisable(true);
              break;
            default:
              setStatus("NULL");
              setDisable(false);
              break;
          }
  
        //   setBmrDetails(res.data);
        console.log("pck Id ", res.data[0].pck_id);
        //   clearStateValues();
        updateState({ master_Id: res.data[0].pck_id });
        // setIssueBtnStatus(true);
        // setInitialDate(res.data[0].date);
       
          if (res.data[0].detailsRecords03.length > 0) {
            // console.log("pck Id Lines", res.data[0].detailsRecords03.pck_id);
            // updateState({ master_Id: res.data[0].detailsRecords03.pck_id });
            // Assuming the packing details array contains specific objects for each packing material
            res.data[0].detailsRecords03.forEach((packing) => {
                console.log("Packing" , packing.particulars);
              switch (packing.particulars) {
                case "Rope":
                  setRopeBatch(packing.batch_no);
                  setRopeQuantity(packing.quantity);
                  setRopeRemarks(packing.remarks);
                  updateState({ _1_id: packing.id });
                  break;
                case "Pallets":
                    setPalletBatch(packing.batch_no);
                    setPalletQuantity(packing.quantity);
                    setPalletRemarks(packing.remarks);
                    updateState({ _2_id: packing.id });
                  break;
                  case "Stretch Film":
                    setStretchBatch(packing.batch_no);
                    setStretchQuantity(packing.quantity);
                    setStretchRemarks(packing.remarks);
                    updateState({ _3_id: packing.id });
                  break;
                  case "Hdpe Cover":
                    setHdpeCoverBatch(packing.batch_no);
                    setHdpeCoverQuantity(packing.quantity);
                    setHdpeRemarks(packing.remarks);
                    updateState({ _4_id: packing.id });
                  break;
                  case "Foam Sheet":
                    setfoamSheetBatch(packing.batch_no);
                    setfoamSheetQuantity(packing.quantity);
                    setfoamSheetRemarks(packing.remarks);
                    updateState({ _5_id: packing.id });
                  break;
                default:
                  break;
              }
            });
        //  
          }
        // else {
        //     // console.log("No Data Found !!!");
        //     clearStateValues();
        //     setIssueBtnStatus(false);
        //     setDisable(false);
        //   }
    }
    else {
        // console.log("No Data Found !!!");
        setStatus("NULL");
        clearStateValues();
        // setIssueBtnStatus(false);
        setDisable(false);
      }
        }
    )
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            console.log(err.response.data.message);
            // messageApi.error(err.response.data.message);
            clearStateValues();
            // setIssueBtnStatus(false);
            setDisable(false);
          } else {
            // console.log("Error", err);
            // messageApi.error(err.response.data.message)
          }
        });
    };
  

    const materialIssue = () => {
      if (bmr === "") {
        message.warning("Please Select Order No");
        return;
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
  
    
      const payload = {
        order_no: bmr,
        // date: new Date(initialDate).toISOString().slice(0, 10),
        pck_id: state.master_Id,
        detailsRecords03: [
          {
            particulars: "Rope",
            batch_no: ropebatch,
            quantity: ropequantity,
            unit: "KG",
            remarks:ropeRemarks,
            id: state._1_id,
          },
          {
            particulars: "Pallets",
            batch_no: palletbatch,
            quantity: palletquantity,
            unit: "KG",
            remarks:palletRemarks,
            id: state._2_id,
          },
          {
            particulars: "Stretch Film",
            batch_no: stretchbatch,
            quantity: stretchquantity,
            unit: "KG",
            remarks:stretchRemarks,
            id: state._3_id,
          },
          {
            particulars: "Hdpe Cover",
            batch_no: hdpecoverbatch,
            quantity: hdpecoverquantity,
            unit: "KG",
            remarks:hdpeRemarks,
            id: state._4_id,
          },
          {
            particulars: "Foam Sheet",
            batch_no: foamSheetbatch,
            quantity: foamSheetquantity,
            unit: "KG",
            remarks:foamSheetRemarks,
            id: state._5_id,
          },
          
        ],
      };
  
      axios
        .post(
          `${ API.prodUrl}/Precot/api/spunlace/summary/03.SavePackingMeterialIssue`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log(res.data);
          messageApi.open({
            type: "success",
            content: "Packing Material Saved Successfully",
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
        message.warning("Please Select Order No");
        return;
      }
      const requiredFields = [
        { name: "Rope Batch Number", value: ropebatch },
        { name: "Rope Quantity", value: ropequantity },
        { name: "Rope Remarks", value: ropeRemarks },
        { name: "Pallets Batch Number", value: palletbatch },
        { name: "Pallets Quantity", value: palletquantity },
        { name: "Pallets Remarks", value: palletRemarks },
        { name: "Stretch Film Batch Number", value: stretchbatch },
        { name: "Stretch Film Quantity", value: stretchquantity },
        { name: "Stretch Film Remarks", value: stretchRemarks },
        { name: "HDPE Cover Batch Number", value: hdpecoverbatch },
        { name: "HDPE Cover Quantity", value: hdpecoverquantity },
        { name: "HDPE Cover Remarks", value: hdpeRemarks },
        { name: "Foam Sheet Batch Number", value: foamSheetbatch },
        { name: "Foam Sheet Quantity", value: foamSheetquantity },
        { name: "Foam Sheet Remarks", value: foamSheetRemarks },
      ];
      

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

  
      const payload = {
        order_no: bmr,
        // date: new Date(initialDate).toISOString().slice(0, 10),
        pck_id: state.master_Id,
        detailsRecords03: [
            {
              particulars: "Rope",
              batch_no: ropebatch,
              quantity: ropequantity,
              unit: "KG",
              remarks:ropeRemarks,
              id: state._1_id,
            },
            {
              particulars: "Pallets",
              batch_no: palletbatch,
              quantity: palletquantity,
              unit: "KG",
              remarks:palletRemarks,
              id: state._2_id,
            },
            {
              particulars: "Stretch Film",
              batch_no: stretchbatch,
              quantity: stretchquantity,
              unit: "KG",
              remarks:stretchRemarks,
              id: state._3_id,
            },
            {
              particulars: "Hdpe Cover",
              batch_no: hdpecoverbatch,
              quantity: hdpecoverquantity,
              unit: "KG",
              remarks:hdpeRemarks,
              id: state._4_id,
            },
            {
              particulars: "Foam Sheet",
              batch_no: foamSheetbatch,
              quantity: foamSheetquantity,
              unit: "KG",
              remarks:foamSheetRemarks,
              id: state._5_id,
            },
            
          ],
      };
  
      axios
        .post(
          `${ API.prodUrl}/Precot/api/spunlace/summary/03.SubmitPackingMeterialIssue`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log(res.data);
          messageApi.open({
            type: "success",
            content: "Packing Material Issued Successfully",
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
                <th>Remarks</th>
              </tr>
              <tr>
                <td align="center" style={{ padding: "1em" }}>
                  1
                </td>
                <td align="center" style={{ padding: "1em" }}>
                  <b>Rope</b>
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={ropebatch}
                    onChange={(e) => setRopeBatch(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={ropequantity}
                    onChange={(e) => setRopeQuantity(e.target.value)}
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
                <td>
                <input
                    className="inp-new"
                    value={ropeRemarks}
                    onChange={(e) => setRopeRemarks(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "1em" }}>
                  2
                </td>
                <td align="center" style={{ padding: "1em" }}>
                  <b>Pallets</b>
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={palletbatch}
                    onChange={(e) => setPalletBatch(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={palletquantity}
                    onChange={(e) => setPalletQuantity(e.target.value)}
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
                <td>
                <input
                    className="inp-new"
                    value={palletRemarks}
                    onChange={(e) => setPalletRemarks(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "1em" }}>
                  3
                </td>
                <td align="center" style={{ padding: "1em" }}>
                  <b>Stretch Film</b>
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={stretchbatch}
                    onChange={(e) => setStretchBatch(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={stretchquantity}
                    onChange={(e) => setStretchQuantity(e.target.value)}
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
                <td>
                <input
                    className="inp-new"
                    value={stretchRemarks}
                    onChange={(e) => setStretchRemarks(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "1em" }}>
                  4
                </td>
                <td align="center" style={{ padding: "1em" }}>
                  <b>HDPE Cover</b>
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={hdpecoverbatch}
                    onChange={(e) => setHdpeCoverBatch(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={hdpecoverquantity}
                    onChange={(e) => setHdpeCoverQuantity(e.target.value)}
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
                <td>
                <input
                    className="inp-new"
                    value={hdpeRemarks}
                    onChange={(e) => setHdpeRemarks(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "1em" }}>
                  5
                </td>
                <td align="center" style={{ padding: "1em" }}>
                  <b>Foam Sheet</b>
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={foamSheetbatch}
                    onChange={(e) => setfoamSheetBatch(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
                <td>
                  <input
                    className="inp-new"
                    value={foamSheetquantity}
                    onChange={(e) => setfoamSheetQuantity(e.target.value)}
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
                <td>
                <input
                    className="inp-new"
                    value={foamSheetRemarks}
                    onChange={(e) => setfoamSheetRemarks(e.target.value)}
                    type="text"
                    disabled={disable}
                  />
                </td>
              </tr>
            </table>
            {/* <td style={{ border: "none", justifyContent: "flex" }}>
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
            </td> */}
          </>
        ),
      },
    ];
  
    // useEffect(() => {
    //   setInitialDate(new Date().toISOString().substring(0, 10));
    //   const headers = {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "Content-Type": "application/json", // Adjust content type if needed
    //   };
  
    //   axios
    //     .get(`${ API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`, {
    //       headers,
    //     })
    //     .then((res) => {
    //       // console.log("BMRLOV", res.data);
    //       const a = res.data.map((x, i) => {
    //         return {
    //           value: x.BMR_NO,
    //           label: x.BMR_NO,
    //         };
    //       });
    //       // console.log("aa", a);
    //       setBmrList(a);
    //     })
    //     .catch((err) => {
    //       // console.log("Error", err);
    //     });
    // }, []);

    useEffect(() => {
        const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json", // Adjust content type if needed
              };
         axios.get(
              `${ API.prodUrl}/Precot/api/spulance/orders`,
              {
                headers
              },
            )
            .then((res) => {
                      // console.log("BMRLOV", res.data);
                      const a = res.data.map((x, i) => {
                        return {
                          value: x.value,
                          label: x.value,
                        };
                      });
                      // console.log("aa", a);
                      setBmrList(a);
                    })
                    .catch((err) => {
                      // console.log("Error", err);
                    });
            // setOptions(response.data);
      }, []);
  
    useEffect(() => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
  
      axios
        .get(
          `${ API.prodUrl}/Precot/api/Users/Service/getRoleDetails?departmentId=1`,
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
        .get(`${ API.prodUrl}/Precot/api/bleaching/bleachStorePersons/getAll`, {
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
          formName="Packing Material Issue"
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
              icon={<IoSave color="#00308F" />}
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
              icon={<GrDocumentStore color="#00308F" />}
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
        <div>
          <Form
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* <Form.Item
              label="Date"
              style={{
                marginRight: "20px",
              }}
            >
              <Input
                type="date"
                value={initialDate}
                onChange={(e) => setInitialDate(e.target.value)}
              />
            </Form.Item> */}
            <Form.Item label="Order NO">
              <Select
                onChange={(values) => handleBmrChange(values)}
                options={bmrList}
                placeholder="Choose Order No"
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
  