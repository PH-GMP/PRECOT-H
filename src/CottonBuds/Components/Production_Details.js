import { Button, Input, message, Radio, Select, Spin } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";

const Production_Details = (props) => {
  
  const [messageApi, contextHolder] = useMessage();
  const [loading, setLoading] = useState(false);
  const [hadData, setHadData] = useState(false);
  const [newSave, setNewSave] = useState(false);
  const [orderNoLov, setOrderNoLov] = useState([]);
  const [productionId, setProductionId] = useState("");
  const [supervisorId,setSupervisorId] = useState("");
  const [qaId,setQaId] = useState("");
  console.log("Prodid", productionId);
  const [primaryKeys, setPrimaryKeys] = useState({
    supApproved: false,
    qaApproved: false,
    supSaved: false,
    qaSaved: false,
    productionId: "",
  });
  const [productionDetails, setProductionDetails] = useState({
    batchNo: props.batchNo,
    Product_Description: "",
    PO_No: "",
    PO_quantity: "",
    Product_Code: "",
    No_Of_Bags: "",
    Lot_No: "",
    MStart_Date: "",
    MEnd_Date: "",
    MStart_Time: "",
    MEnd_Time: "",
    IssuedBy_Sign: "",
    IssuedBy_Date: "",
    ReceivedBy_Sign: "",
    ReceivedBy_Date: "",
    orderNo: "",
    poStatus: "",
    SFQ_Bags:"",
    SFQ_Boxes:"",
    RQ_Bags:"",
    RQ_Boxes:"",
    OD_Bags:"",
    OD_Boxes:""
  });

  //State update here in standard approach
  const updateProductionDetails = (updates) => {
    setProductionDetails((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  //State update here in standard approach
  const updateKeys = (updates) => {
    setPrimaryKeys((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  useEffect(() => {
    updateProductionDetails({ batchNo: props.batchNo });
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getSubmittedProductionDetails?batchNumber=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Res", response.data);
        if (response.data.length > 0) {
          setNewSave(false);
          localStorage.setItem("prod_end_date",response.data[0].manufactureEndDate)
          localStorage.setItem("prod_start_date",response.data[0].manufactureStartDate)
          setProductionId(response.data[0].productionId);
          setQaId(response.data[0].qaId);
          setSupervisorId(response.data[0].supervisiorId);
          updateProductionDetails({
            Product_Description: response.data[0].productionDescription,
            PO_No: response.data[0].poNumber,
            PO_quantity: response.data[0].poQuantityBoxes,
            Product_Code: response.data[0].productCode,
            No_Of_Bags: response.data[0].poQuantityBags,
            Lot_No: response.data[0].lotNumber,
            MStart_Date: response.data[0].manufactureStartDate,
            MEnd_Date: response.data[0].manufactureEndDate,
            MStart_Time: response.data[0].manufactureStartTime,
            MEnd_Time: response.data[0].manufactureEndTime,
            IssuedBy_Sign: response.data[0].qaName,
            IssuedBy_Date: response.data[0].qaDate,
            ReceivedBy_Sign: response.data[0].supervisiorName,
            ReceivedBy_Date: response.data[0].supervisiorDate,
            orderNo: response.data[0].orderNumber,
            poStatus: response.data[0].poStatus,
            SFQ_Bags: response.data[0].packedQuantityBags,
            SFQ_Boxes: response.data[0].packedQuantityBoxes,
            RQ_Bags:response.data[0].remainingQuantityBags,
            RQ_Boxes:response.data[0].remainingQuantityBoxes,
            OD_Bags:response.data[0].packDateQtyBag,
            OD_Boxes:response.data[0].packDateQtyBox
          });
          updateKeys({
            supApproved:
              response.data[0].supervisiorStatus == "SUPERVISOR_APPROVED"
                ? true
                : false,
            qaApproved:
              response.data[0].qaStatus == "QA_APPROVED" ? true : false,
            supSaved:
              response.data[0].supervisiorStatus == "SUPERVISOR_SAVED"
                ? true
                : false,
            qaSaved: response.data[0].qaStatus == "QA_SAVED" ? true : false,
            productionId: response.data[0].productionId,
          });
        } else if (response.data.length == 0) {
          setProductionDetails({
            batch_no: props.batchNo,
            Product_Description: "",
            PO_No: "",
            PO_quantity: "",
            Product_Code: "",
            No_Of_Bags: "",
            Lot_No: "",
            MStart_Date: "",
            MEnd_Date: "",
            MStart_Time: "",
            MEnd_Time: "",
            IssuedBy_Sign: "",
            IssuedBy_Date: "",
            ReceivedBy_Sign: "",
            ReceivedBy_Date: "",
            orderNo: "",
            poStatus:"",
            SFQ_Bags: "",
            SFQ_Boxes: "",
            RQ_Bags:"",
            RQ_Boxes:"",
            OD_Bags:"",
            OD_Boxes:""
          });
         // message.info("Please Select From Date and To Date");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [props.batchNo]);

  const saveData = () => {
    console.log("Data12", productionDetails);
    const payload = {
      productionId: productionId,
      batchNo: props.batchNo,
      productDescription: productionDetails.Product_Description,
      machine: "",
      poNumber: productionDetails.PO_No,
      orderNumber: productionDetails.orderNo,
      productCode: productionDetails.Product_Code,
      poQuantityBags: productionDetails.PO_quantity,
      poQuantityBoxes: productionDetails.No_Of_Bags,
      packedQuantityBags: productionDetails.SFQ_Bags,
      packedQuantityBoxes: productionDetails.SFQ_Boxes,
      remainingQuantityBags: productionDetails.RQ_Bags,
      remainingQuantityBoxes: productionDetails.RQ_Boxes,
      packDateQtyBag: productionDetails.OD_Bags,
      packDateQtyBox: productionDetails.OD_Boxes,
      poStatus: productionDetails.poStatus,
      lotNumber: productionDetails.Lot_No,
      manufactureStartDate: productionDetails.MStart_Date,
      manufactureStartTime: productionDetails.MStart_Time,
      manufactureEndDate: productionDetails.MEnd_Date,
      manufactureEndTime: productionDetails.MEnd_Time,
      manufactureCompletionDate:productionDetails.manufactureCompletionDate,
      supervisiorName: productionDetails.ReceivedBy_Sign,
      supervisiorStatus: "",
      supervisiorDate: productionDetails.ReceivedBy_Date,
      qaStatus: "",
      qaName: productionDetails.IssuedBy_Sign,
      qaDate: productionDetails.IssuedBy_Date,
      supervisiorId:supervisorId,
      qaId:qaId
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/buds/bmr/saveProductionDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("response", res.data);
        message.success("Saved Successfully");
        axios
          .get(
            `${API.prodUrl}/Precot/api/buds/bmr/getSubmittedProductionDetails?batchNumber=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log("Res", response.data);
            setProductionId(response.data[0].productionId);
            setQaId(response.data[0].qaId);
            setSupervisorId(response.data[0].supervisiorId);
            console.log("3", productionId);
            if (response.data.length > 0) {
              setNewSave(false);
              updateProductionDetails({
                Product_Description: response.data[0].productionDescription,
                PO_No: response.data[0].poNumber,
                PO_quantity: response.data[0].poQuantityBoxes,
                Product_Code: response.data[0].productCode,
                No_Of_Bags: response.data[0].poQuantityBags,
                Lot_No: response.data[0].lotNumber,
                MStart_Date: response.data[0].manufactureStartDate,
                MEnd_Date: response.data[0].manufactureEndDate,
                MStart_Time: response.data[0].manufactureStartTime,
                MEnd_Time: response.data[0].manufactureEndTime,
                IssuedBy_Sign: response.data[0].qaName,
                IssuedBy_Date: response.data[0].qaDate,
                ReceivedBy_Sign: response.data[0].supervisiorName,
                ReceivedBy_Date: response.data[0].supervisiorDate,
                orderNo: response.data[0].orderNumber,
              });
              updateKeys({
                supApproved:
                  response.data[0].supervisiorStatus == "SUPERVISOR_APPROVED"
                    ? true
                    : false,
                qaApproved:
                  response.data[0].qaStatus == "QA_APPROVED" ? true : false,
                supSaved:
                  response.data[0].supervisiorStatus == "SUPERVISOR_SAVED"
                    ? true
                    : false,
                qaSaved: response.data[0].qaStatus == "QA_SAVED" ? true : false,
                productionId: response.data[0].productionId,
              });
            } else if (response.data.length == 0) {
              setProductionDetails({
                batch_no: props.batchNo,
                Product_Description: "",
                PO_No: "",
                PO_quantity: "",
                Product_Code: "",
                No_Of_Bags: "",
                Lot_No: "",
                MStart_Date: "",
                MEnd_Date: "",
                MStart_Time: "",
                MEnd_Time: "",
                IssuedBy_Sign: "",
                IssuedBy_Date: "",
                ReceivedBy_Sign: "",
                ReceivedBy_Date: "",
                orderNo: "",
              });
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const submitData = () => {
    console.log("Data", productionDetails);
    // /Precot/api/punching/bmr/productionDetails
    localStorage.setItem("prod_start_date",productionDetails.MStart_Date);
    localStorage.setItem("prod_end_date",productionDetails.MEnd_Date)
    const payload = {
      productionId: productionId,
      batchNo: props.batchNo,
      productDescription: productionDetails.Product_Description,
      machine: "",
      manufactureCompletionDate:productionDetails.manufactureCompletionDate,
    
      poNumber: productionDetails.PO_No,
      orderNumber: productionDetails.orderNo,
      productCode: productionDetails.Product_Code,
      poQuantityBags: productionDetails.PO_quantity,
      poQuantityBoxes: productionDetails.No_Of_Bags,
      packedQuantityBags: productionDetails.SFQ_Bags,
      packedQuantityBoxes: productionDetails.SFQ_Boxes,
      remainingQuantityBags: productionDetails.RQ_Bags,
      remainingQuantityBoxes: productionDetails.RQ_Boxes,
      packDateQtyBag: productionDetails.OD_Bags,
      packDateQtyBox: productionDetails.OD_Boxes,
      poStatus: productionDetails.poStatus,
      lotNumber: productionDetails.Lot_No,
      manufactureStartDate: productionDetails.MStart_Date,
      manufactureStartTime: productionDetails.MStart_Time,
      manufactureEndDate: productionDetails.MEnd_Date,
      manufactureEndTime: productionDetails.MEnd_Time,
      
      supervisiorName: productionDetails.ReceivedBy_Sign,
      supervisiorStatus: "",
      supervisiorDate: productionDetails.ReceivedBy_Date,
      qaStatus: "",
      qaName: productionDetails.IssuedBy_Sign,
      qaDate: productionDetails.IssuedBy_Date,
      supervisiorId:supervisorId,
      qaId:qaId
    };
    
    axios
      .post(
        `${API.prodUrl}/Precot/api/buds/bmr/submitProductionDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("response", res.data);
        message.success("Submitted Successfully");
        axios
          .get(
            `${API.prodUrl}/Precot/api/buds/bmr/getSubmittedProductionDetails?batchNumber=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log("Res", response.data);
            setProductionId(response.data[0].productionId);
            setQaId(response.data[0].qaId);
            setSupervisorId(response.data[0].supervisiorId);
            console.log("3", productionId);
            if (response.data.length > 0) {
              setNewSave(false);
              updateProductionDetails({
                Product_Description: response.data[0].productionDescription,
                PO_No: response.data[0].poNumber,
                PO_quantity: response.data[0].poQuantityBoxes,
                Product_Code: response.data[0].productCode,
                No_Of_Bags: response.data[0].poQuantityBags,
                Lot_No: response.data[0].lotNumber,
                MStart_Date: response.data[0].manufactureStartDate,
                MEnd_Date: response.data[0].manufactureEndDate,
                MStart_Time: response.data[0].manufactureStartTime,
                MEnd_Time: response.data[0].manufactureEndTime,
                IssuedBy_Sign: response.data[0].qaName,
                IssuedBy_Date: response.data[0].qaDate,
                ReceivedBy_Sign: response.data[0].supervisiorName,
                ReceivedBy_Date: response.data[0].supervisiorDate,
                orderNo: response.data[0].orderNumber,
              });
              updateKeys({
                supApproved:
                  response.data[0].supervisiorStatus == "SUPERVISOR_APPROVED"
                    ? true
                    : false,
                qaApproved:
                  response.data[0].qaStatus == "QA_APPROVED" ? true : false,
                supSaved:
                  response.data[0].supervisiorStatus == "SUPERVISOR_SAVED"
                    ? true
                    : false,
                qaSaved: response.data[0].qaStatus == "QA_SAVED" ? true : false,
                productionId: response.data[0].productionId,
              });
            } else if (response.data.length == 0) {
              setProductionDetails({
                batch_no: props.batchNo,
                Product_Description: "",
                PO_No: "",
                PO_quantity: "",
                Product_Code: "",
                No_Of_Bags: "",
                Lot_No: "",
                MStart_Date: "",
                MEnd_Date: "",
                MStart_Time: "",
                MEnd_Time: "",
                IssuedBy_Sign: "",
                IssuedBy_Date: "",
                ReceivedBy_Sign: "",
                ReceivedBy_Date: "",
                orderNo: "",
                
              });
            } else {
              setNewSave(true);
               axios
                .get(
                  `${
                 API.prodUrl
                  }/Precot/api/buds/bmr/getProductionDetails?batchNo=${
                    props.batchNo
                  }&orderNo=${props.orderNo}&fromdate=${
                    productionDetails.MStart_Date
                  }&todate=${productionDetails.MEnd_Date},`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((res) => {
                  updateProductionDetails({
                    Product_Description: res.data[0].productionDescription,
                    PO_No: res.data[0].poNumber,
                    PO_quantity: res.data[0].quantity,
                    Product_Code: res.data[0].material,
                    No_Of_Bags: res.data[0].bags,
                  });
                })
                .catch((err) => {
                  console.log("Error", err);
                });
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const fetchApi = (endDate) => {
    axios
      .get(
        `${
       API.prodUrl
        }/Precot/api/buds/bmr/getProductionDetails?batchNo=${
          props.batchNo
        }&orderNo=${props.orderNo}&fromDate=${moment(
          productionDetails.MStart_Date
        ).format("YYYY-MM-DD")}&toDate=${moment(endDate).format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Res", response.data);
 
        if (response.data.length > 0) {
         
          updateProductionDetails({
            Product_Description: response.data[0].productionDescription,
            PO_No: response.data[0].poNumber,
            PO_quantity: response.data[0].quantity,
            Product_Code: "",
            No_Of_Bags: response.data[0].bags,
            orderNo: response.data[0].orderNumber,
            SFQ_Bags: response.data[0].bagPackQty,
            SFQ_Boxes: response.data[0].boxPackQty,
            RQ_Bags: (response.data[0].quantity - response.data[0].bagPackQty),
            RQ_Boxes: (response.data[0].bags - response.data[0].boxPackQty),
            OD_Bags:response.data[0].bagPackDate,
            OD_Boxes:response.data[0].boxPackDate
          });
    
          console.log("Response", response.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    updateProductionDetails({
      poStatus: e.target.value,
    });
  };
  return (
    <div>
      <Spin spinning={loading}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1em",
          }}
        >
          <b>
            BATCH NO: {props.batchNo} <br />{" "}
          </b>
          <div style={{ display: "flex", gap: "1em" }}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:
                  !props.loggedInSupervisor ||
                  props.loggedInHod ||
                  (props.loggedInSupervisor && primaryKeys.supApproved) ||
                  (props.loggedInQa && primaryKeys.qaApproved) ||
                  primaryKeys.qaApproved 
                    ? "none"
                    : "block",
              }}
  
              shape="round"
              onClick={saveData}
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
                  props.loggedInHod ||
                  (props.loggedInSupervisor && primaryKeys.supApproved) ||
                  (props.loggedInQa && primaryKeys.qaApproved) ||
                  primaryKeys.qaApproved 
                    ? "none"
                    : "block",
              }}
              shape="round"
              onClick={submitData}
            >
              Submit
            </Button>
          </div>
        </div>

        <>
          <table
            style={{
              width: "100%",
            }}
          >
            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                Manufacturing Start Date
              </td>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                Manufacturing End Date
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: "1em" }}>
                <Input
                  type="date"
                  value={productionDetails.MStart_Date}
                  onChange={(e) =>
                    updateProductionDetails({ MStart_Date: e.target.value })
                  }
                  readOnly={
                    !props.loggedInSupervisor ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    primaryKeys.qaApproved
                  }
                />
              </td>
             
              <td colSpan="2" style={{ padding: "1em" }}>
                <Input
                  type="date"
                  value={productionDetails.MEnd_Date}
                  onChange={(e) => {
                    updateProductionDetails({ MEnd_Date: e.target.value });
                    fetchApi(e.target.value);
                  }}
                  readOnly={
                    !props.loggedInSupervisor ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    primaryKeys.qaApproved
                  }
                />
              </td>
          
            </tr>
             <tr>
                        <td
                            colSpan="2"
                            style={{
                              padding: "1em",
                            }}
                          >
                            Manufacturing Completion Date
                          </td>
                          <td colSpan="2" style={{ padding: "1em" }}>
                            <Input
                              type="datetime-local"
                              value={productionDetails.manufactureCompletionDate}
                              onChange={(e) => {
                                updateProductionDetails({ manufactureCompletionDate: e.target.value });
                                fetchApi(e.target.value);
                              }}
                              readOnly={
                                !props.loggedInSupervisor ||
                                props.loggedInHod ||
                                (props.loggedInSupervisor && primaryKeys.supApproved) ||
                                (props.loggedInQa && primaryKeys.qaApproved) ||
                                primaryKeys.qaApproved
                              }
                            />
                          </td>
                        </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                Batch No:
              </td>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                {" "}
                {props.batchNo}
              </td>
            </tr>
            <tr>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                Product Description:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.Product_Description}
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                Product Code:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.Product_Code}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                PO Qty. in Bags:{productionDetails.PO_quantity}
              </td>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                PO Qty. in Boxes:{productionDetails.No_Of_Bags}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                So far Packed Qty. in No of Bags:{productionDetails.SFQ_Bags}
              </td>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                So far Packed Qty. in No of Boxes:{productionDetails.SFQ_Boxes}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                Remaining Qty.in No of Bags::{productionDetails.RQ_Bags}
              </td>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                Remaining Qty.in No of Boxes:{productionDetails.RQ_Boxes}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
               On date packed Qty.in No of Bags:{productionDetails.OD_Bags}
              </td>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                On date packed Qty.in No of Boxes:{productionDetails.OD_Boxes}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                Lot No
              </td>
              <td
                colSpan="2"
                style={{
                  padding: "1em",
                }}
              >
                <Input
                  type="text"
                  onKeyDown={(e) => handleKeyDown(e)}
                  value={productionDetails.Lot_No}
                  onChange={(e) =>
                    updateProductionDetails({ Lot_No: e.target.value })
                  }
                  readOnly={
                    !props.loggedInSupervisor ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    primaryKeys.qaApproved
                  }
                />
       
              </td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td colSpan="4" style={{ padding: "1em", border: "none" }}>
                PO Completion Status{" "}
                <Radio.Group
                  onChange={onChange}
                  value={productionDetails.poStatus}
                  disabled={
                    !props.loggedInSupervisor ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    primaryKeys.qaApproved
                  }
                >
                  <Radio value="Open">Open</Radio>
                  <Radio value="Close">Close</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="4" style={{ padding: "1em", border: "none" }}>
                PRODUCTION BATCH RECORD ISSUANCE DETAILS
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: "1em" }}>
                Issued By (QA)
                <br />
                <Select
                  style={{
                    width: "100%",
                  }}
                  options={props.qaLov}
                  value={productionDetails.IssuedBy_Sign}
                  onChange={(e) =>
                    updateProductionDetails({ IssuedBy_Sign: e })
                  }
                  disabled={
                    !props.loggedInQa ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    primaryKeys.qaApproved
                  }
                />
                <br />
                <Input
                  type="datetime-local"
                  value={moment(productionDetails.IssuedBy_Date).format(
                    "YYYY-MM-DDTHH:MM"
                  )}
                  onChange={(e) =>
                    updateProductionDetails({ IssuedBy_Date: e.target.value })
                  }
                  disabled={
                    !props.loggedInQa ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    (primaryKeys.qaApproved)
                  }
                />
              </td>
              <td colSpan="2" style={{ padding: "1em" }}>
                Received By (Production)
                <Select
                  style={{
                    width: "100%",
                  }}
                  options={props.supLov}
                  value={productionDetails.ReceivedBy_Sign}
                  onChange={(e) =>
                    updateProductionDetails({ ReceivedBy_Sign: e })
                  }
                  disabled={
                    !props.loggedInSupervisor ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    (primaryKeys.qaApproved)
                  }
                />
                <br />
                <Input
                  type="datetime-local"
                  value={moment(productionDetails.ReceivedBy_Date).format(
                    "YYYY-MM-DDTHH:MM"
                  )}
                  onChange={(e) =>
                    updateProductionDetails({ ReceivedBy_Date: e.target.value })
                  }
                  disabled={
                    !props.loggedInSupervisor ||
                    props.loggedInHod ||
                    (props.loggedInSupervisor && primaryKeys.supApproved) ||
                    (props.loggedInQa && primaryKeys.qaApproved) ||
                    (primaryKeys.qaApproved)
                  }
                />
              </td>
            </tr>
          </table>
        </>
      </Spin>
    </div>
  );
};

export default Production_Details;