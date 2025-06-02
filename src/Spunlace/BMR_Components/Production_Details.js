import { Button, Form, Input, message, Radio, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../baseUrl.json";
import useMessage from "antd/es/message/useMessage";
import moment from "moment";

const Production_Details = (props) => {
  console.log("propsdata", props.orderNo);
  const [messageApi, contextHolder] = useMessage();
  const [loading, setLoading] = useState(false);
  const [hadData, setHadData] = useState(false);
  const [shaftData, setShaftData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [error, setError] = useState(null);
  const [newSave, setNewSave] = useState(false);
  const [userLov, setUserLov] = useState({
    prodlov: "",
    qalov: "",
  });
  const role = localStorage.getItem("role");
  const usernameQA = role === "ROLE_QA" ? localStorage.getItem("username") : "";

  const usernameSupervisor =
    role === "ROLE_SUPERVISOR" ? localStorage.getItem("username") : "";
  const [supervisorStatus, setSupervisorStatus] = useState(false);
  const [qaStatus, setQaStatus] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");

  const [productionDetails, setProductionDetails] = useState({
    batchNo: "",
    Product_Description: "",
    Width_in_mm: "",
    Mixing: "",
    No_of_Rolls_Shaft: "",
    Batch_Quantity: "",
    No_of_Shaft: "",
    Shaft_Number_Start_From: "",
    Shaft_Number_Ended: "",
    IN_HOUSE_EXPORT: "",
    suppluExport: "",
    manufacturingStartDate: "",
    manufacturingEndDate: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    time2: "",
    time1: "",
    issued_on: "",
    received_on: currentDateTime,
    received_by: usernameSupervisor,
    issued_by: "",
    bmr01rp01productiondetailsSap: [],
    prod_id: "",
    poStatus: "",
    qa_id: "",
    status: "",
    nextBatch: "",
    supervisor_id: "",
  });

  const updateProductionDetails = (updates) => {
    setProductionDetails((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const userName = localStorage.getItem("username");

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValues, setSelectedValues] = useState("");
  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      const matchedValue = props.supLov.find((item) => item.value === userName);
      if (matchedValue) {
        setSelectedValue(matchedValue.value); // Set the matched value
      } else {
        setSelectedValue(productionDetails.received_by); // Fallback to existing value
      }
    } else {
      setSelectedValue(productionDetails.received_by); // Fallback to existing value
    }
  }, [props.supLov, productionDetails.received_by]);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName && role=="ROLE_QA") {
      const matchedValue = props.qaLov.find((item) => item.value === userName);
      if (matchedValue) {
        setSelectedValues(matchedValue.value); // Set the matched value
      } else {
        setSelectedValues(productionDetails.issued_by); // Fallback to existing value
      }
    } else {
      setSelectedValues(productionDetails.issued_by); // Fallback to existing value
    }
  }, [props.qaLov, productionDetails.issued_by]);

  const getApi = () => {
    if (props.orderNo == "") {
      message.error("Please Select Order No");
    } else {
      updateProductionDetails({
        batchNo: "",
        Product_Description: "",
        Width_in_mm: "",
        Mixing: "",
        No_of_Rolls_Shaft: "",
        Batch_Quantity: "",
        No_of_Shaft: "",
        Shaft_Number_Start_From: "",
        Shaft_Number_Ended: "",
        IN_HOUSE_EXPORT: "",
        suppluExport: "",
        manufacturingStartDate: "",
        manufacturingEndDate: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        time2: "",
        time1: "",
        issued_on: "",
        issued_by: "",
        received_on: "",
        received_by: "",
        issued_name: "",
        bmr01rp01productiondetailsSap: [],
        prod_id: "",
      });
      setLoading(true);
      console.log("f", props.orderNo);
      axios
        .get(
          `${ API.prodUrl}/Precot/api/spunlace/summary/01.fetchProductionDetailsByBatch?order_no=${props.batchNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("ResponsfetchProductionDetailsByBatche", response.data);

          localStorage.setItem("start_date_sp", response.data[0].start_date);
          localStorage.setItem("end_date_sp", response.data[0].end_date);
          setSupervisorStatus(response.data[0].status == "SUPERVISOR_APPROVED");
          setQaStatus(response.data[0].status == "QA_APPROVED");

          if (
            response.data[0].status === "SUPERVISOR_SAVED" ||
            response.data[0].status === "SUPERVISOR_APPROVED"
          ) {
            localStorage.setItem("batch_qty", response.data[0].batchQuantity);
          }
          updateProductionDetails({
            Product_Description: response.data[0].productDescription,
            Width_in_mm: response.data[0].width,
            Mixing: response.data[0].mixing,
            No_of_Rolls_Shaft: response.data[0].rollShaftCount,
            Batch_Quantity: response.data[0].batchQuantity,
            No_of_Shaft: response.data[0].shaftCount,
            Shaft_Number_Start_From: response.data[0].shaftFrom,
            Shaft_Number_Ended: response.data[0].shaftTo,
            IN_HOUSE_EXPORT: response.data[0].productSupply,
            manufacturingStartDate: response.data[0].start_date,
            manufacturingEndDate: response.data[0].end_date,
            start_date: response.data[0].start_date,
            start_time: response.data[0].start_time,
            end_date: response.data[0].end_date,
            end_time: response.data[0].end_time,
            issued_on: response.data[0].issued_on,
            received_on: response.data[0].received_on,
            received_by: response.data[0].received_by,
            issued_by: response.data[0].issued_by,
            poStatus: response.data[0].poStatus,
            status: response.data[0].status,
            prod_id: response.data[0].prod_id,
            qa_id: response.data[0].qa_id,
            supervisor_id: response.data[0].supervisor_id,
          });
          // axios
          //   .get(
          //     `${
          //     API.prodUrl
          //     }/Precot/api/spunlace/summary/01.GetProductionDetails?order_no=${
          //       props.orderNo
          //     }&fromDate=${moment(response.data[0].start_date).format(
          //       "YYYY-MM-DD"
          //     )}&toDate=${moment(response.data[0].end_date).format(
          //       "YYYY-MM-DD"
          //     )}`,
          //     {
          //       headers: {
          //         Authorization: `Bearer ${localStorage.getItem("token")}`,
          //       },
          //     }
          //   )
          //   .then((response) => {
          //     console.log(
          //       "ResGetProductionDetailsGetProductionDetails",
          //       response.data
          //     );
          //     // localStorage.setItem(
          //     //   "batch_qty",
          //     //   response.data.bmr01rp01productiondetailsSap[0].Batch_Quantity
          //     // );
          //     setLoading(false);
          //     const data = response.data;
          //     console.log("gfh", data.bmr01rp01productiondetailsSap[0]);
          //     updateProductionDetails({
          //       Product_Description:
          //         data.bmr01rp01productiondetailsSap[0].Product_Description,
          //       Width_in_mm: data.bmr01rp01productiondetailsSap[0].Width_in_mm,
          //       Mixing: data.bmr01rp01productiondetailsSap[0].Mixing,
          //       No_of_Rolls_Shaft:
          //         data.bmr01rp01productiondetailsSap[0].No_of_Rolls_Shaft,
          //       Batch_Quantity:
          //         data.bmr01rp01productiondetailsSap[0].Batch_Quantity,
          //       No_of_Shaft: data.bmr01rp01productiondetailsSap[0].No_of_Shaft,
          //       Shaft_Number_Start_From:
          //         data.bmr01rp01productiondetailsSap[0].Shaft_Number_Start_From,
          //       Shaft_Number_Ended:
          //         data.bmr01rp01productiondetailsSap[0].Shaft_Number_Ended,
          //       IN_HOUSE_EXPORT:
          //         data.bmr01rp01productiondetailsSap[0].IN_HOUSE_EXPORT,
          //     });
          //   })
          //   .catch((err) => {
          //     setLoading(false);
          //     // messageApi.open({
          //     //   type: "error",
          //     //   content: "Unable to fetch BMR Caused Network Error",
          //     // });
          //   });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // messageApi.open({
          //   type: "error",
          //   content: "Unable to fetch BMR Caused Network Error",
          // });
        });
    }
  };
  useEffect(() => {
    getApi();
  }, [props.batchNo]);

  // useEffect(() => {
  //   const API_URL = `${ API.prodUrl}/Precot/api/spunlace/summary/getShaftNoByOrderDate?orderNumber=${props.orderNo}&fromDate=${productionDetails.start_date}&toDate=${productionDetails.end_date}`;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(API_URL, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setShaftData(response.data);
  //     } catch (err) {
  //       console.error("Error fetching shaft data:", err);
  //       setError(err.message || "Failed to fetch data.");
  //     }
  //   };

  //   if (props.orderNo && productionDetails.start_date && productionDetails.end_date) {
  //     fetchData();
  //   }
  // }, [props.orderNo, productionDetails.start_date, productionDetails.end_date]);

  useEffect(() => {
    const API_URL = `${ API.prodUrl}/Precot/api/spunlace/summary/getShaftNoByOrderDate?orderNumber=${props.orderNo}&fromDate=${productionDetails.start_date}&toDate=${productionDetails.end_date}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setShaftData(response.data || []); // Ensure data is an array
      } catch (err) {
        console.error("Error fetching shaft data:", err);
        setError(err.message || "Failed to fetch data.");
      }
    };

    if (
      props.orderNo &&
      productionDetails.start_date &&
      productionDetails.end_date
    ) {
      fetchData(); // Fetch data when dependencies are valid
    }
  }, [props.orderNo, productionDetails.start_date, productionDetails.end_date]);

  const handleChange = (selected) => {
    setSelectedOption(selected); // Update state with selected option
    console.log("Selected Shaft:", selected);
  };

  const handleendChange = (selected) => {
    setSelectedOptions(selected); // Update state with selected option
    console.log("Selected Shaft:", selected);
  };

  // Map the shaft data to options for the Select component
  const options = shaftData.map((item) => ({
    value: item.value,
    label: ` ${item.value}`,
  }));

  // const newGet = (endDate) => {
  //   axios
  //     .get(
  //       `${
  //       API.prodUrl
  //       }/Precot/api/spunlace/summary/getProductionDetailsByShaftDateOrder?orderNumber=${
  //         props.orderNo
  //       }&fromdate=${moment(productionDetails.start_date).format(
  //         "YYYY-MM-DD"
  //       )}&todate=${moment(endDate).format("YYYY-MM-DD")}&fromShaft=${selectedOption}&toShaft=${selectedOptions}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Res", response.data);
  //       localStorage.setItem(
  //         "batch_qty",
  //         response.data.bmr01rp01productiondetailsSap[0].Batch_Quantity
  //       );
  //       setLoading(false);
  //       const data = response.data;
  //       console.log("gfh", data.bmr01rp01productiondetailsSap[0]);
  //       updateProductionDetails({
  //         Product_Description:
  //           data.bmr01rp01productiondetailsSap[0].Product_Description,
  //         Width_in_mm: data.bmr01rp01productiondetailsSap[0].Width_in_mm,
  //         Mixing: data.bmr01rp01productiondetailsSap[0].Mixing,
  //         No_of_Rolls_Shaft:
  //           data.bmr01rp01productiondetailsSap[0].No_of_Rolls_Shaft,
  //         Batch_Quantity:
  //           data.bmr01rp01productiondetailsSap[0].Batch_Quantity,
  //         No_of_Shaft: data.bmr01rp01productiondetailsSap[0].No_of_Shaft,
  //         Shaft_Number_Start_From:
  //           data.bmr01rp01productiondetailsSap[0].Shaft_Number_Start_From,
  //         Shaft_Number_Ended:
  //           data.bmr01rp01productiondetailsSap[0].Shaft_Number_Ended,
  //         IN_HOUSE_EXPORT:
  //           data.bmr01rp01productiondetailsSap[0].IN_HOUSE_EXPORT,
  //       });
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       messageApi.open({
  //         type: "error",
  //         content: "Unable to fetch BMR Caused Network Error",
  //       });
  //     });
  // };
  const [newGetData, setNewGetData] = useState({});

  useEffect(() => {
    const now = new Date();

    if (role === "ROLE_SUPERVISOR") {
      const formattedDate = formatDateTime(now);
      setCurrentDateTime(formattedDate);
    }

    if (role === "ROLE_QA") {
      const formattedDateQA = formatDateTime(now);
      setCurrentDateTimeQA(formattedDateQA);
    }
  }, [role]);

  // Function to format the date and time as 'YYYY-MM-DDTHH:mm'
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const newGet = (endDate) => {
    console.log("Inside newGet");
    console.log("From Shaft:", selectedOption);
    console.log("To Shaft:", selectedOptions);
    console.log("End Date:", endDate);

    if (selectedOption && selectedOptions) {
      setLoading(true);
      const apiUrl = `${
      API.prodUrl
      }/Precot/api/spunlace/summary/getProductionDetailsByShaftDateOrder?orderNumber=${
        props.orderNo
      }&fromDate=${moment(productionDetails.start_date).format(
        "YYYY-MM-DD"
      )}&toDate=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&fromShaft=${selectedOption}&toShaft=${selectedOptions}`;
      console.log("API URL:", apiUrl);

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data);
          const data = response.data[0];
          setNewGetData(data);
          updateProductionDetails({
            Product_Description: data.Product_Description,
            Width_in_mm: data.Width_in_mm,
            Mixing: data.Mixing,
            No_of_Rolls_Shaft: data.No_of_Rolls_Shaft,
            Batch_Quantity: data.Batch_Quantity,
            No_of_Shaft: data.No_of_Shaft,
            Shaft_Number_Start_From: data.Shaft_Number_Start_From || null,
            Shaft_Number_Ended: data.Shaft_Number_Ended || null,
            IN_HOUSE_EXPORT: data.IN_HOUSE_EXPORT,
          });
        })
        .catch((err) => {
          console.error("Error fetching production details:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.warn("Both 'From Shaft' and 'To Shaft' must be selected.");
    }
  };

  useEffect(() => {
    if (selectedOption && selectedOptions) {
      console.log("Triggering newGet...");
      newGet(productionDetails.end_date);
    }
  }, [selectedOption, selectedOptions, productionDetails.end_date]);

  const saveProductionDetails = async () => {
    try {
      setLoading(true);
      const data = {
        prod_id: productionDetails.prod_id,
        order_no: props.orderNo,
        form_no: "PRD02/F-26",
        start_date: productionDetails.start_date,
        start_time: productionDetails.start_time,
        end_date: productionDetails.end_date,
        end_time: productionDetails.end_time,
        issued_by: productionDetails.issued_by,
        issued_on: productionDetails.issued_on,
        issued_name: productionDetails.issued_by,
        received_by: productionDetails.received_by || usernameSupervisor,
        received_on: productionDetails.received_on || currentDateTime,
        received_name: productionDetails.received_by,
        batchNo: props.batchNo,
        poStatus: productionDetails.poStatus,
        nextBatch: productionDetails.nextBatch,
        status: productionDetails.status,
        supervisor_id: productionDetails.supervisor_id,
        qa_id: productionDetails.qa_id,
        productDescription: newGetData.Product_Description,
        width: newGetData.Width_in_mm,
        mixing: newGetData.Mixing,
        rollShaftCount: newGetData.No_of_Rolls_Shaft,
        batchQuantity: newGetData.Batch_Quantity,
        shaftCount: newGetData.No_of_Shaft,
        productSupply: newGetData.IN_HOUSE_EXPORT,
        shaftFrom: selectedOption,
        shaftTo: selectedOptions,
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/01.SaveProductionDetails`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Submitted Data", response.data);
      // localStorage.setItem("batch_qty", newGetData.Batch_Quantity);
      message.success("Production details saved successfully");
      setLoading(false);
      getApi();
    } catch (error) {
      console.error(error);
      message.error("Already Submitted");
      setLoading(false);
    }
  };

  //submit api here
  const submitProductionDetails = async () => {
    try {
      if (!productionDetails.start_date) {
        message.error("Manufacturing Start Date is required!");
        return;
      }
      if (!productionDetails.end_date) {
        message.error("Manufacturing End Date is required!");
        return;
      }
      setLoading(true);
      const data = {
        prod_id: productionDetails.prod_id,
        order_no: props.orderNo,
        form_no: "PRD02/F-26",
        start_date: productionDetails.start_date,
        start_time: productionDetails.start_time,
        end_date: productionDetails.end_date,
        end_time: productionDetails.end_time,
        issued_by: productionDetails.issued_by,
        issued_on: productionDetails.issued_on,
        issued_name: productionDetails.issued_by,
        received_by: productionDetails.received_by || usernameSupervisor,
        received_on: productionDetails.received_on || currentDateTime,
        received_name: productionDetails.received_by,
        batchNo: props.batchNo,
        poStatus: productionDetails.poStatus,
        nextBatch: productionDetails.nextBatch,
        status: productionDetails.status,
        supervisor_id: productionDetails.supervisor_id,
        qa_id: productionDetails.qa_id,
        productDescription: newGetData.Product_Description,
        width: newGetData.Width_in_mm,
        mixing: newGetData.Mixing,
        rollShaftCount: newGetData.No_of_Rolls_Shaft,
        batchQuantity: newGetData.Batch_Quantity,
        shaftCount: newGetData.No_of_Shaft,
        productSupply: newGetData.IN_HOUSE_EXPORT,
        shaftFrom: selectedOption,
        shaftTo: selectedOptions,
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/spunlace/summary/01.SubmitProductionDetails`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Submitted Data", response.data);
      message.success("Production details submitted successfully");
      setLoading(false);
      getApi();
    } catch (error) {
      console.error(error);
      message.error("Already Submitted");
      setLoading(false);
    }
  };

  const getInHouseRadioValue = () => {
    if (productionDetails?.IN_HOUSE_EXPORT?.length > 0) {
      if (productionDetails?.IN_HOUSE_EXPORT === "In House") {
        return "TICK";
      } else {
        return "NA";
      }
    }
    return "NA";
  };
  // const getInHouseRadioValue = () => {
  //   if (productionDetails?.IN_HOUSE_EXPORT && productionDetails?.IN_HOUSE_EXPORT.length > 0) {
  //     return productionDetails.IN_HOUSE_EXPORT === "In House" ? "TICK" : "NA";
  //   }
  //   return "NA";
  // };

  const getExportRadioValue = () => {
    // Ensure IN_HOUSE_EXPORT is not null or undefined and is a string
    if (productionDetails?.IN_HOUSE_EXPORT?.length > 0) {
      if (productionDetails.IN_HOUSE_EXPORT === "Export") {
        return "TICK";
      } else {
        return "NA";
      }
    }
    return "NA";
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
          <b>BATCH NO: {props.orderNo}</b>
          <div
            style={{
              display: "flex",
            }}
          >
            <Button
              onClick={saveProductionDetails}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:
                  (supervisorStatus && props.loggedInSupervisor) ||
                  !props.loggedInSupervisor ||
                  qaStatus
                    ? "none"
                    : "block",
              }}
              shape="round"
            >
              Save
            </Button>
            <Button
              onClick={submitProductionDetails}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display:
                  (supervisorStatus && props.loggedInSupervisor) ||
                  props.loggedInHod ||
                  qaStatus
                    ? "none"
                    : "block",
              }}
              shape="round"
            >
              Submit
            </Button>
          </div>
        </div>
        {hadData ? (
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
                  Production Descripiton
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
                  Width in mm
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Width_in_mm}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Mixing
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Mixing}
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  No Of Rolls / Shaft
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.No_of_Rolls_Shaft}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Batch Quantity (Kgs)
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Batch_Quantity}
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Shaft Number Start From
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Shaft_Number_Start_From}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  No Of Shaft
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.No_of_Shaft}
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Shaft Number Ended
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Shaft_Number_Ended}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    padding: "0.5em",
                  }}
                >
                  Product Supply
                </td>
                <td colSpan="2">
                  <tr>
                    <td
                      style={{
                        width: "60%",
                        borderBottom: "none",
                        borderLeft: "none",
                        borderTop: "none",
                      }}
                      align="center"
                    >
                      In House
                    </td>
                    <td
                      style={{
                        border: "none",
                        display: "flex",
                        marginLeft: "0.5em",
                      }}
                    >
                      <Radio.Group value={getInHouseRadioValue()}>
                        <Radio value="TICK">✓</Radio>
                        <Radio value="NA">NA</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        borderBottom: "none",
                        borderLeft: "none",
                      }}
                      align="center"
                    >
                      Export
                    </td>
                    <td
                      style={{
                        border: "none",
                        display: "flex",
                        marginLeft: "0.5em",
                      }}
                    >
                      <Radio.Group value={getExportRadioValue()}>
                        <Radio value="TICK">✓</Radio>
                        <Radio value="NA">NA</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                </td>
              </tr>
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
                  Manufacturing Completion Date
                </td>
              </tr>
              <tr>
                <td colSpan="1" style={{ padding: "1em" }}>
                  Date: {productionDetails.start_date}
                </td>
                <td colSpan="1" style={{ padding: "1em" }}>
                  Time
                  {productionDetails.start_time}
                </td>
                <td colSpan="1" style={{ padding: "1em" }}>
                  Date
                  {productionDetails.end_date}
                </td>
                <td colSpan="1" style={{ padding: "1em" }}>
                  Time
                  {productionDetails.end_time}
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
                  {productionDetails.issued_by}
                  <br />
                  {productionDetails.issued_on}
                </td>
                <td colSpan="2" style={{ padding: "1em" }}>
                  Received By (Production)
                  <br />
                  {productionDetails.received_by}
                  <br />
                  {productionDetails.received_on}
                </td>
              </tr>
            </table>
          </>
        ) : (
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
                    onChange={(e) =>
                      updateProductionDetails({ start_date: e.target.value })
                    }
                    disabled={
                      !props.loggedInSupervisor ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                </td>
                <td colSpan="1" style={{ padding: "1em" }}>
                  Time
                  <Input
                    style={{ marginLeft: "1em", width: "80%" }}
                    type="time"
                    value={productionDetails.start_time}
                    onChange={(e) =>
                      updateProductionDetails({ start_time: e.target.value })
                    }
                    disabled={
                      !props.loggedInSupervisor ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                </td>
                <td colSpan="1" style={{ padding: "1em" }}>
                  Date
                  <Input
                    style={{ marginLeft: "1em", width: "80%" }}
                    type="date"
                    value={productionDetails.end_date}
                    onChange={(e) => {
                      updateProductionDetails({ end_date: e.target.value });
                      console.log("new get calling//")
                      newGet(e.target.value);
                    }}
                    disabled={
                      !props.loggedInSupervisor ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                </td>
                <td colSpan="1" style={{ padding: "1em" }}>
                  Time
                  <Input
                    style={{ marginLeft: "1em", width: "80%" }}
                    type="time"
                    value={productionDetails.end_time}
                    onChange={(e) =>
                      updateProductionDetails({ end_time: e.target.value })
                    }
                    disabled={
                      !props.loggedInSupervisor ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Production Descripiton
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
                  Width in mm
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Width_in_mm}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Mixing
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Mixing}
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  No Of Rolls / Shaft
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.No_of_Rolls_Shaft}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Batch Quantity (Kgs)
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.Batch_Quantity}
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Shaft Number Start From
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {/* {productionDetails.Shaft_Number_Start_From} */}
                  <Select
                    options={options}
                    value={
                      selectedOption ||
                      productionDetails.Shaft_Number_Start_From
                    }
                    style={{ width: "170px" }}
                    onChange={handleChange}
                    placeholder="Select a Shaft Number"
                    isClearable
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  No Of Shaft
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {productionDetails.No_of_Shaft}
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  Shaft Number Ended
                </td>
                <td
                  colSpan="1"
                  style={{
                    padding: "1em",
                  }}
                >
                  {/* {productionDetails.Shaft_Number_Ended} */}
                  <Select
                    options={options}
                    value={
                      selectedOptions || productionDetails.Shaft_Number_Ended
                    }
                    style={{ width: "170px" }}
                    onChange={handleendChange}
                    placeholder="Select a Shaft Number"
                    isClearable
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    padding: "0.5em",
                  }}
                >
                  Product Supply
                </td>
                <td colSpan="2">
                  <tr>
                    <td
                      style={{
                        width: "60%",
                        borderBottom: "none",
                        borderLeft: "none",
                        borderTop: "none",
                      }}
                      align="center"
                    >
                      In House
                    </td>
                    <td
                      style={{
                        border: "none",
                        display: "flex",
                        marginLeft: "0.5em",
                      }}
                    >
                      <Radio.Group
                        value={getInHouseRadioValue()}
                        // onChange={(e) =>
                        //   setpd_ProductsupplyInhouse(e.target.value)
                        // } machineOperationsBmr?bmr_no=24/AB/0007
                        // disabled={bmrStatus}
                      >
                        <Radio value="TICK">✓</Radio>
                        <Radio value="NA">NA</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        borderBottom: "none",
                        borderLeft: "none",
                      }}
                      align="center"
                    >
                      Export
                    </td>
                    <td
                      style={{
                        border: "none",
                        display: "flex",
                        marginLeft: "0.5em",
                      }}
                    >
                      <Radio.Group
                        value={getExportRadioValue()}
                        // value={pd_ProductsupplyExport}
                        // onChange={(e) =>
                        //   setpd_ProductsupplyExport(e.target.value)
                        // }
                        // disabled={bmrStatus}
                      >
                        <Radio value="TICK">✓</Radio>
                        <Radio value="NA">NA</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
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
                <td colSpan="4">
                  PO Status
                  <Radio.Group
                    onChange={(e) =>
                      updateProductionDetails({ poStatus: e.target.value })
                    }
                    value={productionDetails.poStatus}
                    disabled={
                      props.loggedInHod ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  >
                    <Radio value="OPEN">Open</Radio>
                    <Radio value="CLOSE">Close</Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ padding: "1em" }}>
                  Issued By (QA)
                  <br />
                  <Select
                    style={{ width: "100%" }}
                    options={props.qaLov}
                    value={selectedValues || productionDetails.issued_by}
                    onChange={(e) => updateProductionDetails({ issued_by: e })}
                    disabled={
                      !props.loggedInQa ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                  <br />
                  <Input
                    type="datetime-local"
                    value={productionDetails.issued_on || currentDateTimeQA}
                    onChange={(e) =>
                      updateProductionDetails({ issued_on: e.target.value })
                    }
                    disabled={
                      !props.loggedInQa ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                </td>
                <td colSpan="2" style={{ padding: "1em" }}>
                  Received By (Production)
                  <br />
                  <Select
                    style={{ width: "100%" }}
                    options={props.supLov}
                    value={
                      selectedValue ||
                      productionDetails.received_by ||
                      usernameSupervisor
                    }
                    onChange={(e) =>
                      updateProductionDetails({ received_by: e })
                    }
                    disabled={
                      !props.loggedInSupervisor ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                  <br />
                  {/* <Input
                    type="datetime-local"
                    value={productionDetails.received_on}
                    onChange={(e) =>
                      updateProductionDetails({ received_on: e.target.value })
                    }
                    disabled={
                      !props.loggedInSupervisor ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  /> */}
                  <Input
                    type="datetime-local"
                    value={productionDetails.received_on || currentDateTime} // Fallback to current date and time if no value
                    onChange={(e) =>
                      updateProductionDetails({ received_on: e.target.value })
                    }
                    disabled={
                      !props.loggedInSupervisor ||
                      (props.loggedInSupervisor && supervisorStatus) ||
                      qaStatus
                    }
                  />
                </td>
              </tr>
            </table>
          </>
        )}
      </Spin>
    </div>
  );
};

export default Production_Details;
