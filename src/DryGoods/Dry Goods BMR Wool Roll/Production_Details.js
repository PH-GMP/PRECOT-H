import { Button, Form, Input, message, Radio, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { GrDocumentStore } from "react-icons/gr";
import axios from "axios";
import API from "../../baseUrl.json";
import useMessage from "antd/es/message/useMessage";

const { TextArea } = Input;
const Production_Details = (props) => {
  const [messageApi, contextHolder] = useMessage();
  const [loading, setLoading] = useState(false);
  const [hadData, setHadData] = useState(false);
  const [newSave, setNewSave] = useState(false);
  const [userLov, setUserLov] = useState({
    prodlov: "",
    qalov: "",
  });
  const token = localStorage.getItem("token");
  const [orderNoLov, setOrderNoLov] = useState([]);
  const [productionDetails, setProductionDetails] = useState({
    batch_no: "",
    form_no: "",
    order_no: "",
    lot_no: "",
    prod_id: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    issued_by: "",
    issued_on: "",
    issued_name: "",
    received_by: "",
    received_on: "",
    received_name: "",
    po_no: "",
    prod_desc: "",
    prod_code: "",
    quantity: "",
    bagPackQty: "",
    rem_qty_bag: "",
    bagPackDate: "",
    po_comp_status: "",
    boxQuantity: "",
    boxPackQty: "",
    rem_qty_box: "",
    boxPackDate: "",
    po_comp_box: "",
  });
  const [submitStatus, setSubmitStatus] = useState(false);
  const [idData, setIdData] = useState("");
  const [supervisorApproved, setSupervisorApproved] = useState(false);
  const [qaApproved, setQaApproved] = useState(false);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const today = getCurrentDate();
  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const role = localStorage.getItem("role");
  const username =
  role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
  role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";

  const todayDateTime = getCurrentDateTime();
  const batchNo = props.batchNo.split("-")[0];
  // ------------------ Cody By Me -------------------------
  useEffect(() => {
    setSubmitStatus(false);
    setHadData(false);
    setProductionDetails((prevState) => ({
      ...prevState,
      batch_no: props.batchNo,
      order_no: "",
    }));
  }, [props.batchNo]);

  console.log("LOV FOR Verification Of Records", props);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the hard cord ${props.batchNo}  ${productionDetails.order_no}
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/CottonWoolRall/01.GetProductionDetails?batch_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          setIdData(data);
          if (
            role == "ROLE_SUPERVISOR" &&
            response.data[0].received_by !== "" &&
            response.data[0].received_on !== ""
          ) {
            setHadData(true);
          }
          if (
            role == "ROLE_QA" &&
            response.data[0].issued_by !== "" &&
            response.data[0].issued_on !== ""
          ) {
            setHadData(true);
          }
          if (role !== "ROLE_QA") {
            console.log("Qa Condition Entered");
            setSubmitStatus(true);
          }
          if (
            role == "ROLE_QA" &&
            // response.data[0].issued_by !== "" &&
            // response.data[0].issued_on !== ""
            productionDetails.status == "QA_APPROVED"
          ) {
            setSubmitStatus(true);
          }
          console.log("Data", data);
          setProductionDetails((prevState) => ({
            ...prevState,
            ...data,
          }));
          setSupervisorApproved(
            response.data[0].status == "SUPERVISOR_APPROVED" ? true : false
          );
          setQaApproved(
            response.data[0].status == "QA_APPROVED" ? true : false
          );
        } else if (response.data.length == 0) {
          setSupervisorApproved(false);
          setQaApproved(true);
          if (role !== "ROLE_SUPERVISOR") {
            console.log("Supervisor Condition entered");
            setSubmitStatus(true);
          }

          setProductionDetails({
            batch_no: props.batchNo,
            form_no: "",
            order_no: "",
            machine_no: "",
            lot_no: "",
            start_date: "",
            start_time: "",
            end_date: "",
            end_time: "",
            issued_by: "",
            issued_on: "",
            issued_name: "",
            received_by: "",
            received_on: "",
            received_name: "",
            po_no: "",
            prod_desc: "",
            prod_code: "",
            quantity: "",
            bagPackQty: "",
            rem_qty_bag: "",
            bagPackDate: "",
            po_comp_status: "",
            boxQuantity: "",
            boxPackQty: "",
            rem_qty_box: "",
            boxPackDate: "",
            po_comp_box: "",
          });
        }
      } catch (error) {}
    };
    fetchData();
  }, [props.batchNo]);

  const handleOrderNo = (e) => {
    setProductionDetails((prevState) => ({
      ...prevState,
      order_no: e,
    }));
    handlePDE(batchNo, e);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/cottonBall/getOrderByBatchNo?batchNo=${batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length > 0) {
          const a = response.data.map((option) => ({
            value: option.value,
            label: option.value,
          }));
          setOrderNoLov(a);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.batchNo]);

  const handlePDE = async (prodBatchNo, prodOrderNo) => {
    if (prodBatchNo !== "" && prodOrderNo !== "") {
      try {
        // --------- Replace the hardcord batchNo ${props.batchNo}
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/CottonWoolRall/getProductionDetailsBatchOrder?batchNo=${props.batchNo}&orderNo=${productionDetails.order_no}&fromdate=${productionDetails.start_date}&todate=${productionDetails.end_date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length == 0) {
          message.warning("No Data Found For The Selected Order No");
        }
        if (response.data.length > 0) {
          const data = response.data[0];
          setProductionDetails((prevState) => ({
            ...prevState,
            po_no: data.poNumber,
            prod_desc: data.productionDescription,
            prod_code: data.productCode,
            quantity: data.quantity,
            boxQuantity: data.boxQuantity,
            bagPackQty: data.bagPackQty,
            boxPackQty: data.boxPackQty,
            rem_qty_bag: Number(data.quantity) - Number(data.bagPackQty),
            rem_qty_box: Number(data.boxQuantity) - Number(data.boxPackQty),
            bagPackDate: data.bagPackDate,
            boxPackDate: data.boxPackDate,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (productionDetails.start_date && productionDetails.end_date) {
      handlePDE(batchNo, productionDetails.order_no);
    }
  }, [productionDetails.start_date, productionDetails.end_date]);

  useEffect(() => {}, [batchNo, productionDetails.order_no]);

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

  const handleProductionDetails = (e, name, type) => {
    if (
      (name == "end_date" || name == "end_time") &&
      (productionDetails.start_date == "" || productionDetails.start_time == "")
    ) {
      message.warning("Please Select Manufacturing Start Date and Time");
      return;
    }
    if (name == "end_time") {
      const startDateTime = new Date(
        `${productionDetails.start_date}T${productionDetails.start_time}`
      );
      const endDateTime = new Date(
        `${productionDetails.end_date}T${e.target.value}`
      );
      if (endDateTime <= startDateTime) {
        message.warning("End Time Should Start After Start Time");
        return;
      }
    }
    if (type == "select") {
      setProductionDetails((prevState) => ({
        ...prevState,
        [name]: e,
      }));
    } else if (type == "input") {
      setProductionDetails((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  };

  useEffect(() => {}, [productionDetails]);
 

  const SaveProductionDetails = async () => {
    setLoading(true);
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    const payload = {
      prod_id: idData.prod_id,
      batch_no: productionDetails.batch_no,
      form_no: productionDetails.form_no,
      order_no: productionDetails.order_no,
      lot_no: productionDetails.lot_no,
      start_date: productionDetails.start_date,
      start_time: productionDetails.start_time,
      end_date: productionDetails.end_date,

      end_time: productionDetails.end_time,
      manufactureCompletionDate:productionDetails.manufactureCompletionDate,
      manufactureCompletionTime:productionDetails.manufactureCompletionTime,
      issued_by: productionDetails.issued_by,
      issued_on: productionDetails.issued_on,
      issued_name: productionDetails.issued_name,
      received_by: productionDetails.received_by,
      received_on: productionDetails.received_on,
      received_name: productionDetails.received_name,
      po_no: productionDetails.po_no,
      prod_desc: productionDetails.prod_desc,
      prod_code: productionDetails.prod_code,
      po_qty_bag: productionDetails.quantity,
      far_qty_bag: productionDetails.bagPackQty,
      rem_qty_bag: productionDetails.rem_qty_bag,
      on_date_pack: productionDetails.bagPackDate,
      po_comp_status: productionDetails.po_comp_status,
      po_qty_box: productionDetails.boxQuantity,
      far_qty_box: productionDetails.boxPackQty,
      rem_qty_box: productionDetails.rem_qty_box,
      on_date_box: productionDetails.boxPackDate,
      po_comp_box: productionDetails.po_comp_box,
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/CottonWoolRall/01.SaveProductionDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Production Details Saved Succesfully");
        setLoading(false);
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/CottonWoolRall/01.GetProductionDetails?batch_no=${props.batchNo}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            const data = response.data[0];
            setIdData(data);
            if (
              role == "ROLE_SUPERVISOR" &&
              response.data[0].received_by !== "" &&
              response.data[0].received_on !== ""
            ) {
              setHadData(true);
            }
            if (
              role == "ROLE_QA" &&
              response.data[0].issued_by !== "" &&
              response.data[0].issued_on !== ""
            ) {
              setHadData(true);
            }
            if (
              role == "ROLE_QA" &&
              // response.data[0].issued_by !== "" &&
              // response.data[0].issued_on !== ""
              productionDetails.status == "QA_APPROVED"
            ) {
              setSubmitStatus(true);
            }

            if (role !== "ROLE_QA") {
              console.log("Qa Condition Entered");
              setSubmitStatus(true);
              setHadData(true);
            }
            setSupervisorApproved(
              response.data[0].status == "SUPERVISOR_APPROVED" ? true : false
            );
            setQaApproved(
              response.data[0].status == "QA_APPROVED" ? true : false
            );
          } else {
            setSupervisorApproved(false);
            setQaApproved(true);
          }
        } catch (err) {}
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };

  const submitProductionDetails = async () => {
    if (props.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    if (props.loggedInSupervisor) {
      const keysToCheck = [
        "batch_no",
        "order_no",
        "lot_no",
        "start_date",
        "start_time",
        "end_date",
        "end_time",
        "received_by",
        "received_on",
        "po_comp_status",
      
      ];
      for (let key of keysToCheck) {
        if (productionDetails[key] == "") {
          const formattedKey = key.replace(/_/g, " ");
          console.log("That Key", key);
          message.warning(formattedKey + " required");
         
          return;
        }
      }
      try {
        setLoading(true);
        const data = {
          prod_id: idData.prod_id,
          batch_no: productionDetails.batch_no,
          form_no: productionDetails.form_no,
          order_no: productionDetails.order_no,
          lot_no: productionDetails.lot_no,
          start_date: productionDetails.start_date,
          start_time: productionDetails.start_time,
          end_date: productionDetails.end_date,
          end_time: productionDetails.end_time,
          manufactureCompletionDate:productionDetails.manufactureCompletionDate,
          manufactureCompletionTime:productionDetails.manufactureCompletionTime,
          issued_by: productionDetails.issued_by,
          issued_on: productionDetails.issued_on,
          issued_name: productionDetails.issued_name,
          received_by: productionDetails.received_by,
          received_on: productionDetails.received_on,
          received_name: productionDetails.received_name,
          po_no: productionDetails.po_no,
          prod_desc: productionDetails.prod_desc,
          prod_code: productionDetails.prod_code,
          po_qty_bag: productionDetails.quantity,
          far_qty_bag: productionDetails.bagPackQty,
          rem_qty_bag: productionDetails.rem_qty_bag,
          on_date_pack: productionDetails.bagPackDate,
          po_comp_status: productionDetails.po_comp_status,
          po_qty_box: productionDetails.boxQuantity,
          far_qty_box: productionDetails.boxPackQty,
          rem_qty_box: productionDetails.rem_qty_box,
          on_date_box: productionDetails.boxPackDate,
          po_comp_box: productionDetails.po_comp_box,
        };

        const data2 = {
          prod_id: idData.prod_id,
          batch_no: productionDetails.batch_no,
          form_no: productionDetails.form_no,
          order_no: productionDetails.order_no,
          lot_no: productionDetails.lot_no,
          start_date: productionDetails.start_date,
          start_time: productionDetails.start_time,
          end_date: productionDetails.end_date,
          end_time: productionDetails.end_time,
          issued_by: productionDetails.issued_by,
          issued_on: productionDetails.issued_on,
          issued_name: productionDetails.issued_name,
          received_by: productionDetails.received_by,
          received_on: productionDetails.received_on,
          received_name: productionDetails.received_name,
          po_no: productionDetails.po_no,
          prod_desc: productionDetails.prod_desc,
          prod_code: productionDetails.prod_code,
          po_qty_bag: productionDetails.quantity,
          far_qty_bag: productionDetails.bagPackQty,
          rem_qty_bag: productionDetails.rem_qty_bag,
          on_date_pack: productionDetails.bagPackDate,
          po_comp_status: productionDetails.po_comp_status,
          po_qty_box: productionDetails.boxQuantity,
          far_qty_box: productionDetails.boxPackQty,
          rem_qty_box: productionDetails.rem_qty_box,
          on_date_box: productionDetails.boxPackDate,
          po_comp_box: productionDetails.po_comp_box,
        };

        const response = await axios.post(
          `${API.prodUrl}/Precot/api/CottonWoolRall/01.SubmitProductionDetails`,
          newSave ? data2 : data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200 || response.status == 201) {
          message.success("Production details submitted successfully");
          setLoading(false);
          try {
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/CottonWoolRall/01.GetProductionDetails?batch_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              const data = response.data[0];
              setIdData(data);
              if (
                role == "ROLE_SUPERVISOR" &&
                response.data[0].received_by !== "" &&
                response.data[0].received_on !== ""
              ) {
                setHadData(true);
              }
              if (
                role == "ROLE_QA" &&
                response.data[0].issued_by !== "" &&
                response.data[0].issued_on !== ""
              ) {
                setHadData(true);
              }
              if (
                role == "ROLE_QA" &&
            
                productionDetails.status == "QA_APPROVED"
              ) {
                setSubmitStatus(true);
              }

              if (role !== "ROLE_QA") {
                console.log("Qa Condition Entered");
                setSubmitStatus(true);
                setHadData(true);
              }
              setSupervisorApproved(
                response.data[0].status == "SUPERVISOR_APPROVED" ? true : false
              );
              setQaApproved(
                response.data[0].status == "QA_APPROVED" ? true : false
              );
            } else {
              setSupervisorApproved(false);
              setQaApproved(true);
            }
          } catch (err) {}
        }
      } catch (error) {
        console.error(error);
        // message.error(error.response.data.message);
        setLoading(false);
      }
    } else if (props.loggedInQa) {
      if (
        productionDetails.issued_on == "" ||
        productionDetails.issued_by == ""
      ) {
        message.warning("Please Fill All Required Fields");
        return;
      }

      try {
        setLoading(true);
        const payload = {
          prod_id: idData.prod_id,
          batch_no: productionDetails.batch_no,
          form_no: productionDetails.form_no,
          order_no: productionDetails.order_no,
          lot_no: productionDetails.lot_no,
          start_date: productionDetails.start_date,
          start_time: productionDetails.start_time,
          end_date: productionDetails.end_date,
          end_time: productionDetails.end_time,
          issued_by: productionDetails.issued_by,
          issued_on: productionDetails.issued_on,
          issued_name: productionDetails.issued_name,
          received_by: productionDetails.received_by,
          received_on: productionDetails.received_on,
          received_name: productionDetails.received_name,
          po_no: productionDetails.po_no,
          prod_desc: productionDetails.prod_desc,
          prod_code: productionDetails.prod_code,
          po_qty_bag: productionDetails.quantity,
          far_qty_bag: productionDetails.bagPackQty,
          rem_qty_bag: productionDetails.rem_qty_bag,
          on_date_pack: productionDetails.bagPackDate,
          po_comp_status: productionDetails.po_comp_status,
          po_qty_box: productionDetails.boxQuantity,
          far_qty_box: productionDetails.boxPackQty,
          rem_qty_box: productionDetails.rem_qty_box,
          on_date_box: productionDetails.boxPackDate,
          po_comp_box: productionDetails.po_comp_box,
        };

        const response = await axios.post(
          `${API.prodUrl}/Precot/api/CottonWoolRall/01.SubmitProductionDetails`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200 || response.status == 201) {
          message.success("Production details submitted successfully");
          setLoading(false);
          try {
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/CottonWoolRall/01.GetProductionDetails?batch_no=${props.batchNo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.data.length > 0) {
              const data = response.data[0];
              setIdData(data);
              if (
                role == "ROLE_SUPERVISOR" &&
                response.data[0].received_by !== "" &&
                response.data[0].received_on !== ""
              ) {
                setHadData(true);
              }
              if (
                role == "ROLE_QA" &&
                response.data[0].issued_by !== "" &&
                response.data[0].issued_on !== ""
              ) {
                setHadData(true);
              }
              if (
                role == "ROLE_QA" &&
                // response.data[0].issued_by !== "" &&
                // response.data[0].issued_on !== ""
                productionDetails.status == "QA_APPROVED"
              ) {
                setSubmitStatus(true);
              }

              if (role !== "ROLE_QA") {
                console.log("Qa Condition Entered");
                setSubmitStatus(true);
                setHadData(true);
              }
              setSupervisorApproved(
                response.data[0].status == "SUPERVISOR_APPROVED" ? true : false
              );
              setQaApproved(
                response.data[0].status == "QA_APPROVED" ? true : false
              );
            } else {
              setSupervisorApproved(false);
              setQaApproved(true);
            }
          } catch (err) {}
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };
 
  useEffect(() => {
    console.log("Submit Status", hadData);
    console.log("Submit Status", submitStatus);
  }, [hadData, submitStatus]);

 

  return (
    <div>
      <Spin spinning={loading}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1em",
          }}
        >
          <b>BATCH NO: {props.batchNo}</b>
          <div style={{ display: "flex", gap: "1em" }}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:
                  props.loggedInHod ||
                  props.loggedInQa ||
                  productionDetails.status == "QA_APPROVED" ||
                  (props.loggedInSupervisor && supervisorApproved)
                    ? "none"
                    : "flex",
              }}
              icon={<GrDocumentStore color="#00308F" />}
              shape="round"
              onClick={SaveProductionDetails}
            >
              Save
            </Button>
            <Button
              onClick={submitProductionDetails}
              type="primary"
              icon={<GrDocumentStore color="#00308F" />}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:
                  props.loggedInHod ||
                  (props.loggedInQa && qaApproved) ||
                  productionDetails.status == "QA_APPROVED" ||
                  (props.loggedInSupervisor && supervisorApproved) ||
                  (qaApproved && supervisorApproved)
                    ? "none"
                    : "block",
              }}
              shape="round"
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
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                PO No.:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.po_no}
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                Production Order No.:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                <Select
                  options={orderNoLov}
                  placeholder={"Select Order No"}
                  onChange={(e) => {
                    handleOrderNo(e);
                  }}
                  value={productionDetails.order_no}
                  style={{ textAlign: "center", width: "100%" }}
                  dropdownStyle={{ textAlign: "center" }}
                  disabled={
                    props.loggedInHod ||
                    props.loggedInQa ||
                    productionDetails.status == "QA_APPROVED" ||
                    (props.loggedInSupervisor && supervisorApproved)
                  }
                ></Select>
              </td>
            </tr>
            <tr>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                Product Descripiton:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.prod_desc}
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
                {productionDetails.prod_code}
              </td>
            </tr>
            <tr>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                PO Qty. in No of Bag:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.quantity}
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                PO Qty. in No of Boxes:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.boxQuantity}
              </td>
            </tr>
            <tr>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                So far Packed Qty. in No of Bags:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.bagPackQty}
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                So far Packed Qty. in No of Boxes:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.boxPackQty}
              </td>
            </tr>
            <tr>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                Remaining Qty.in No of Bags:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.rem_qty_bag}
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                Remaining Qty.in No of Boxes:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.rem_qty_box}
              </td>
            </tr>
            <tr>
              <td
                colSpan="1"
                style={{
                  padding: "0.5em",
                }}
              >
                On date packed Qty.in No of Bags:
              </td>
              <td
                colSpan="1"
                style={{
                  padding: "1em",
                }}
              >
                {productionDetails.bagPackDate}
         
              </td>

              <td colSpan={1} style={{}} align="left">
                On date packed Qty.in No of Boxes:
              </td>
              <td style={{}}>
                {productionDetails.boxPackDate}
            
              </td>
            </tr>
            <tr>
              <td
                colSpan={1}
                style={{
                  padding: "0.5em",
                }}
              >
                {" "}
                PO Completion Status
              </td>
              <td colSpan={3} style={{ textAlign: "center" }}>
                <Radio.Group
                  value={productionDetails.po_comp_status}
                  disabled={
                    props.loggedInHod ||
                    props.loggedInQa ||
                    productionDetails.status == "QA_APPROVED" ||
                    (props.loggedInSupervisor && supervisorApproved)
                  }
                  onChange={(e) => {
                    handleProductionDetails(e, "po_comp_status", "input");
                  }}
                >
                  <Radio value="Open">Open</Radio>
                  <Radio value="Close">Close</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: "2.0em",
                }}
              >
                Lot No.:{" "}
                <TextArea
                  style={{
                    width: "80%",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  value={productionDetails.lot_no}
                  onChange={(e) => {
                    handleProductionDetails(e, "lot_no", "input");
                  }}
                  // onKeyDown={(e) => handleKeyDown_text(e)}
                  readOnly={
                    props.loggedInHod ||
                    props.loggedInQa ||
                    productionDetails.status == "QA_APPROVED" ||
                    (props.loggedInSupervisor && supervisorApproved)
                  }
                ></TextArea>{" "}
              </td>
            </tr>
 
          
<tr>
  <td
    colSpan="1"
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
      position:"center"
    }}
  >
    Manufacturing End Date
  </td>
  <td
    colSpan="1"
    style={{
      padding: "1em",
      
    }}
  >
    Manufacturing Completion Date
  </td>
</tr>
<tr>
  <td colSpan="1" style={{ padding: "1em" }}>
    Date:{" "}
    <Input
      style={{ marginLeft: "1em", width: "80%" }}
      type="date"
      value={productionDetails.start_date}
      max={today}
      onChange={(e) => {
        handleProductionDetails(e, "start_date", "input");
      }}
      readOnly={
        props.loggedInHod ||
        props.loggedInQa ||
        productionDetails.status == "QA_APPROVED" ||
        (props.loggedInSupervisor && supervisorApproved)
      }
    />
  </td>
  <td colSpan="2" style={{ padding: "1em" }}>
    Date
    <Input
      style={{ marginLeft: "1em", width: "80%" }}
      type="date"
      value={productionDetails.end_date}
      max={today}
      onChange={(e) => {
        handleProductionDetails(e, "end_date", "input");
      }}
      readOnly={
        props.loggedInHod ||
        props.loggedInQa ||
        productionDetails.status == "QA_APPROVED" ||
        (props.loggedInSupervisor && supervisorApproved)
      }
    />
  </td>
  <td colSpan="1" style={{ padding: "1em" }}>
    Date
    <Input
      style={{ marginLeft: "1em", width: "80%" }}
      type="date"
      value={productionDetails.manufactureCompletionDate}
      max={today}
      onChange={(e) => {
        handleProductionDetails(e, "manufactureCompletionDate", "input");
      }}
      readOnly={
        props.loggedInHod ||
        props.loggedInQa ||
        productionDetails.status == "QA_APPROVED" ||
        (props.loggedInSupervisor && supervisorApproved)
      }
    />
  </td>
</tr>
<tr>
  <td colSpan="1" style={{ padding: "1em" }}>
    Time
    <Input
      style={{ marginLeft: "1em", width: "80%" }}
      type="time"
      value={productionDetails.start_time}
      onChange={(e) => {
        handleProductionDetails(e, "start_time", "input");
      }}
      readOnly={
        props.loggedInHod ||
        props.loggedInQa ||
        productionDetails.status == "QA_APPROVED" ||
        (props.loggedInSupervisor && supervisorApproved)
      }
    />
  </td>
  <td colSpan="2" style={{ padding: "1em" }}>
    Time
    <Input
      style={{ marginLeft: "1em", width: "80%" }}
      type="time"
      value={productionDetails.end_time}
      onChange={(e) => {
        handleProductionDetails(e, "end_time", "input");
      }}
      readOnly={
        props.loggedInHod ||
        props.loggedInQa ||
        productionDetails.status == "QA_APPROVED" ||
        (props.loggedInSupervisor && supervisorApproved)
      }
    />
  </td>
  <td colSpan="1" style={{ padding: "1em" }}>
    Time
    <Input
      style={{ marginLeft: "1em", width: "80%" }}
      type="time"
      value={productionDetails.manufactureCompletionTime}
      onChange={(e) => {
        handleProductionDetails(e, "manufactureCompletionTime", "input");
      }}
      readOnly={
        props.loggedInHod ||
        props.loggedInQa ||
        productionDetails.status == "QA_APPROVED" ||
        (props.loggedInSupervisor && supervisorApproved)
      }
    />
  </td>
</tr>
          </table>
          <table style={{ width: "100%" }}>
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
                  style={{ width: "100%" }}
                  options={props.qaLov}
                  value={productionDetails.issued_by || username}
                  onChange={(e) => {
                    handleProductionDetails(e, "issued_by", "select");
                  }}
                  disabled={
                    submitStatus ||
                    !props.loggedInQa ||
                    productionDetails.status == "QA_APPROVED" ||
                    (props.loggedInQa && qaApproved)
                
                  }
                  max={todayDateTime}
                />
                <br />
                <Input
                  type="datetime-local"
                  value={productionDetails.issued_on}
                  onChange={(e) => {
                    handleProductionDetails(e, "issued_on", "input");
                  }}
                  readOnly={
               
                    props.loggedInHod ||
                    (props.loggedInQa && qaApproved) ||
                    productionDetails.status == "QA_APPROVED" ||
                    (props.loggedInSupervisor && supervisorApproved) ||
                    (qaApproved && supervisorApproved)
                  }
                />
              </td>
              <td colSpan="2" style={{ padding: "1em" }}>
                Received By (Production)
                <br />
                <Select
                  style={{ width: "100%" }}
                  options={props.supLov}
                  value={productionDetails.received_by|| usernameSupervisor }
                  onChange={(e) => {
                    handleProductionDetails(e, "received_by", "select");
                  }}
                  disabled={
                    props.loggedInHod ||
                    props.loggedInQa ||
                    productionDetails.status == "QA_APPROVED" ||
                    (props.loggedInSupervisor && supervisorApproved)
                  }
                />
                <br />
                <Input
                  type="datetime-local"
                  value={productionDetails.received_on}
                  onChange={(e) => {
                    handleProductionDetails(e, "received_on", "input");
                  }}
                  readOnly={
                    props.loggedInHod ||
                    props.loggedInQa ||
                    productionDetails.status == "QA_APPROVED" ||
                    (props.loggedInSupervisor && supervisorApproved)
                  }
                  max={todayDateTime}
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