/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const GlobalStyle = createGlobalStyle`
@media print {
  @page {
    size: portrait;
  }
  body {
    -webkit-print-color-adjust: exact;
    width: 100%;
    height: 100%;
    transform: scale(0.9); /* Adjust scale as needed */
    // transform-origin: top right; /* Adjust the origin if needed */
    // transform-origin: bottom top ;
    transform-origin: bottom top;
    // transform-origin: top left;

  }
}
`;
const QA_Inward033_Sum = () => {
  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();
  const [newModal, setNewModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [cakingData, setCakingData] = useState([]);
  const [SelectedPrintSupplier, SetSelectedPrintSupplier] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [shift, setShift] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [printDate, setPrintDate] = useState(null);
  const [gotobtn, setGotobtn] = useState(true);
  const [open, setOpen] = useState(false);

  const [printResponseData, setPrintResponseData] = useState(null);
  const [PrintSupplier, SetPrintSupplier] = useState(null);
  const [iirNumbers, setiirNumbers] = useState([]);
  const [SelectediirNumbers, setSelectediirNumbers] = useState([]);
  const [reason, setReason] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [supplierList, setSupplierList] = useState("");
  const [selectedinvoice, setSelectedinvoice] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [ItemList, setItemList] = useState([]);
  const [InvoicePrint, setInvoicePrint] = useState([]);
  const [SelectedInvoicePrint, setSelectedInvoicePrint] = useState(null);
  const location = useLocation();
  const { state } = location;
  const { formNo } = state || {};

  const checkFormValidity = () => {
    // Enable the button only if all fields have valid values
    if (printDate && SelectedPrintSupplier && SelectedInvoicePrint) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qa_inspector_sign;
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {});
    }
  }, [printResponseData, API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qa_manager_sign;
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [printResponseData, API.prodUrl]);

  const formatDateTime = (inputDate) => {
    const date = new Date(inputDate);

    // Extract date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    // Extract time components
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format date and time as DD/MM/YYYY HH:MM:SS
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const formattedDate =
    Array.isArray(printResponseData) &&
    printResponseData.length > 0 &&
    printResponseData[0]?.date
      ? new Date(printResponseData?.[0]?.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  const formattedgrDate =
    Array.isArray(printResponseData) &&
    printResponseData.length > 0 &&
    printResponseData[0]?.gr_date
      ? new Date(printResponseData?.[0]?.gr_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  const formattedQaManagerDateTime = printResponseData?.[0]
    ?.qa_manager_submitted_on
    ? formatDateTime(printResponseData?.[0]?.qa_manager_submitted_on)
    : "";

  const formattedQaInspectorDateTime = printResponseData?.[0]
    ?.qa_inspector_submitted_on
    ? formatDateTime(printResponseData?.[0]?.qa_inspector_submitted_on)
    : "";

  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  let formattedSupervisorDate;

  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        let apiUrl = `${
          API.prodUrl
        }/Precot/api/qa/getSummarydetailsInward?formatNo=${"PH-QAD01-F-033"}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Parse error response to extract error message
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok.");
        }

        const data = await response.json();

        if (!data || !Array.isArray(data)) {
          throw new Error("Data is not an array or undefined");
        }

        // Set the fetched data
        setCakingData(data);
        setFilteredData(
          data.map((item) => ({
            key: item.header_id, // Assuming header_id is unique
            formatName: item.formatName,
            formNo: item.formNo,
            revisionNo: item.revisionNo,
            gr_date: item.gr_date,
            item_code: item.item_code,
            productName: item.product_name,
            shift: item.shift,
            supplier_name: item.supplier_name,
            status: item.status,
            qa_manager_status: item.qa_manager_status,
            qa_inspector_status: item.qa_inspector_status,
            mailstatus: item.mail_status,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);

        // Show the specific error message
        message.error(
          error.message || "An error occurred while fetching data."
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of filteredData) {
        if (data.qa_manager_status === "QA_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [filteredData]);

  const printDateSubmit = () => {
    window.print();
  };

  const handlePrint = () => {
    setShowModal(true);
  };

  const handleGoToChange = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    } else if (selectedSupplier == "" || selectedSupplier == null) {
      message.warning("Please Select Supplier");
      return;
    } else if (selectedinvoice == "" || selectedinvoice == null) {
      message.warning("Please Select Invoice No");
      return;
    }

    navigate("/Precot/QA/Inward033", {
      state: {
        newDate: newDate,
        Suppliers: selectedSupplier,
        invoice: selectedinvoice,
        productdesc: ItemList,
      },
    });
  };

  const handleEdit = (record) => {
    // Destructure values from record
    const { gr_date, supplier_name, invoice_no, item_description } = record;

    // Navigate and pass the state
    navigate("/Precot/QA/Inward033", {
      state: {
        newDate: gr_date,
        Suppliers: supplier_name,
        invoice: invoice_no,
        productdesc: item_description,
      },
    });

    const x = cakingData.filter((x, i) => {
      return record.formNo == formNo;
      navigate("/Precot/QA/Inward031");
    });
    setNewStatus(x);
    setModalData(record);
    setNewModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintDate(null);
    SetSelectedPrintSupplier(null);
    setiirNumbers(null);
    setInvoicePrint(null);
    SetPrintSupplier(null);
    setSelectedInvoicePrint(null);
    setSelectediirNumbers(null);
    setSubmitButtonDisabled(true);
  };

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const baseColumns = [
    {
      title: "S.No",
      key: "serial",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "gr_date",
      key: "gr_date",
      align: "center",
      render: (text) => formatDates(text),
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier_name",
      key: "supplier_name",
      align: "center",
    },
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "QA Manager Status",
      dataIndex: "qa_manager_status",
      key: "qa_manager_status",
      align: "center",
    },

    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns = [...baseColumns];

  // Insert the "Reason" column before the "Action" column if `reason` exists
  if (reason) {
    const actionIndex = columns.findIndex((col) => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  const formatDate = (inputDate) => {
    if (!inputDate) return "";

    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const fetchGet = async (date) => {
    const formattedDate = formatDate(date);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/inwardPde/details?grDate=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data &&
        response.data.suppliers &&
        response.data.suppliers.length > 0
      ) {
        const suppliers = response.data.suppliers;

        setSupplierList(suppliers);
      } else {
        message.error("No Suppliers available for the particular date.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSupplierSelection = async (selectedSupplier) => {
    try {
      const formattedDate = formatDate(newDate);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/inwardPde/details?grDate=${formattedDate}&supplier=${selectedSupplier}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.invoices) {
        setInvoiceList(response.data.invoices);
      } else {
        console.error("grReceipts not found in the response");
      }
    } catch (error) {
      console.error("Error in second API call:", error);
    }
  };

  const fetchPrintGet = async (date) => {
    const formattedDate = formatDate(date);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          API.prodUrl
        }/Precot/api/qa/getdetailsForPrintInward?formatNo=${"PH-QAD01-F-033"}&gr_date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data &&
        response.data.body &&
        response.data.body.suppliers &&
        response.data.body.suppliers.length > 0
      ) {
        const suppliers = response.data.body.suppliers;

        SetPrintSupplier(suppliers);
      } else {
        message.error("No Data found");
        console.error("Suppliers not found in the response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrintSupplier = async (SelectedPrintSupplier) => {
    try {
      const response = await axios.get(
        `${
          API.prodUrl
        }/Precot/api/qa/getdetailsForPrintInward?formatNo=${"PH-QAD01-F-033"}&gr_date=${printDate}&supplierName=${SelectedPrintSupplier}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.body.invoices) {
        setInvoicePrint(response.data.body.invoices);
      } else {
        console.error("grReceipts not found in the response");
      }
    } catch (error) {
      console.error("Error in second API call:", error);
    }
  };

  const handlePrintInvoiceSelection = async (SelectedInvoicePrint) => {
    try {
      const formattedDate = formatDate(newDate);

      // API call with both selected GRNO and the formatted date
      const response = await axios.get(
        `${
          API.prodUrl
        }/Precot/api/qa/getdetailsForPrintInward?formatNo=${"PH-QAD01-F-033"}&gr_date=${printDate}&supplierName=${SelectedPrintSupplier}&invoice_no=${SelectedInvoicePrint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.body.iirNumbers) {
        setiirNumbers(response.data.body.iirNumbers);
      } else {
        console.error("grReceipts not found in the response");
      }
    } catch (error) {
      console.error("Error in second API call:", error);
    }
  };

  const handlePrintiirselection = async (SelectediirNumbers) => {
    try {
      const formattedDate = formatDate(newDate);

      // API call with both selected GRNO and the formatted date
      const response = await axios.get(
        `${
          API.prodUrl
        }/Precot/api/qa/getdetailsForPrintInward?formatNo=${"PH-QAD01-F-033"}&gr_date=${printDate}&supplierName=${SelectedPrintSupplier}&invoice_no=${SelectedInvoicePrint}&iir_no=${SelectediirNumbers}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.body.inspectionDetails) {
        setPrintResponseData(response.data.body.inspectionDetails);
      } else {
        console.error("grReceipts not found in the response");
      }
    } catch (error) {
      console.error("Error in second API call:", error);
    }
  };

  const handleInvoiceSelection = async (selectedinvoice) => {
    try {
      const formattedDate = formatDate(newDate);

      // API call with both selected GRNO and the formatted date
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/inwardPde/details?grDate=${formattedDate}&supplier=${selectedSupplier}&invoice=${selectedinvoice}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.materialDescriptions) {
        setItemList(response.data.materialDescriptions);
      } else {
        console.error("grReceipts not found in the response");
      }
    } catch (error) {
      console.error("Error in second API call:", error);
    }
  };

  return (
    <div>
      {" "}
      {contextHolder}
      <GlobalStyle />
      <div id="section-to-print">
        <style></style>

        <table style={{ tableLayout: "fixed" }}>
          <thead style={{ marginTop: "20px" }}>
            <tr>
              <td colSpan={20} style={{ border: "none", height: "20px" }}></td>
            </tr>

            <tr>
              <th colSpan={5} rowSpan={4} style={{ textAlign: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "100px",
                    height: "auto",
                    textAlign: "center",
                  }}
                />
                <br />
                Unit H
              </th>
              <th colSpan={9} rowspan={4} style={{ textAlign: "center" }}>
                INWARD INSPECTION REPORT(JAR/BLISTER)
              </th>
              <th colSpan={3}>Format No.:</th>
              <th colSpan={3}>PH-QAD01-F-033</th>
            </tr>
            <tr>
              <th colSpan={3}>Revision No.:</th>
              <th colSpan={3}>01</th>
            </tr>
            <tr>
              <th colSpan={3}>Ref. SOP No.:</th>
              <th colSpan={3}>PH-QAD01-D-30</th>
            </tr>
            <tr>
              <th colSpan={3}>Page No.:</th>
              <th colSpan={3}>1 of 1</th>
            </tr>
          </thead>

          <br />
          <tbody>
            <tr>
              <td colSpan={2}>IIR No.:</td>
              <td colSpan={3}>{printResponseData?.[0]?.iir_no}</td>
              <td colSpan={2}>Date:</td>
              <td colSpan={3}>{formattedDate}</td>
              <td colSpan={2}>Batch No.</td>
              <td colSpan={3}>{printResponseData?.[0]?.batch_no}</td>
              <td colSpan={2}>Lot Qty.:</td>
              <td colSpan={3}>{printResponseData?.[0]?.lot_qty}</td>
            </tr>
            <tr>
              <td colSpan={12}>
                Item Description.:{printResponseData?.[0]?.item_description}{" "}
              </td>
              <td colSpan={8}>
                AQL Sample Size. :{printResponseData?.[0]?.aql_sample_size}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
                Supplier Name.: {printResponseData?.[0]?.supplier_name}
              </td>
              <td colSpan={3}>GR Date:{formattedgrDate} </td>
              <td colSpan={3}>GR No: {printResponseData?.[0]?.gr_no} </td>

              <td colSpan={8}>
                Item Code: {printResponseData?.[0]?.item_code}
              </td>
            </tr>

            <tr>
              <td colSpan={6}>
                Invoice No.:{printResponseData?.[0]?.invoice_no}
              </td>
              <td colSpan={6}>PO No.: {printResponseData?.[0]?.po_no}</td>
              <td colSpan={8}>PDS No.:{printResponseData?.[0]?.pds_no}</td>
            </tr>

            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Sr. No.
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Parameter
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Specification
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Observation
              </td>
            </tr>

            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={6}>Material</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[0].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[0].observation}
              </td>
            </tr>

            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={6}>Quantity per pack</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[1].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[1].observation}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={6}>Length of jar (mm)</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[2].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[2].observation}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan={6}>Diameter of jar (mm)</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[3].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[3].observation}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan={6}>Weight of jar (gms)</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[4].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[4].observation}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan={6}>Length of cap (mm)</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[5].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[5].observation}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                7
              </td>
              <td colSpan={6}>Diameter of cap (mm)</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[6].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[6].observation}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                8
              </td>
              <td colSpan={6}>Weight of cap (gms)</td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[7].specification}
              </td>
              <td colSpan={6}>
                {printResponseData?.[0]?.line1[7].observation}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                Sr.No
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Category
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Defects
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No. Of Defects Observed
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Total No. ofDefects Observed
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Maximum No. of Defects Allowed
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={2} rowSpan={5}>
                {" "}
                Critical
                <br />
                (AQL - Nil)
              </td>
              <td colSpan={5}>Scratches/Dents/Damages</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[0].no_of_defects}
              </td>
              <td colSpan={4} rowSpan={5}>
                {printResponseData?.[0]?.line2[0].total_no_of_defects}
              </td>
              <td colSpan={4} rowSpan={5}>
                {printResponseData?.[0]?.line2[0].maximum_no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={5}>Inconsistent Length</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[1].no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan={5}>Inconsistent Diameter</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[2].no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan={5}>Contamination (Foreign Matl.)</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[3].no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan={5}>Less Weight </td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[4].no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={2} rowSpan={2}>
                Major
                <br />
                (AQL - 2.5)
              </td>
              <td colSpan={5}>No sharp at end</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[5].no_of_defects}
              </td>
              <td colSpan={4} rowSpan={2}>
                {printResponseData?.[0]?.line2[5].total_no_of_defects}
              </td>
              <td colSpan={4} rowSpan={2}>
                {printResponseData?.[0]?.line2[5].maximum_no_of_defects}
              </td>
            </tr>
            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={5}>Color variation</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[6].no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan={2} rowSpan={3}>
                Minor
                <br />
                (AQL - 4)
              </td>
              <td colSpan={5}>Discoloration</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[7].no_of_defects}
              </td>
              <td colSpan={4} rowSpan={3}>
                {printResponseData?.[0]?.line2[7].total_no_of_defects}
              </td>
              <td colSpan={4} rowSpan={3}>
                {printResponseData?.[0]?.line2[7].maximum_no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1} style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan={5}>Minor Scratches</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[8].no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={1}>3</td>
              <td colSpan={5}>Odors</td>
              <td colSpan={4}>
                {printResponseData?.[0]?.line2[9].no_of_defects}
              </td>
            </tr>

            <tr>
              <td colSpan={8} rowspan={2}>
                Supplier’s COA Reference No.:
                <br />
                {printResponseData?.[0]?.coa_reference_no}
              </td>
              <td colSpan={4}>Quantity Accepted:</td>
              <td colSpan={8}>{printResponseData?.[0]?.accepted}</td>
            </tr>
            <tr>
              <td colSpan={4}>Quantity Rejected:</td>
              <td colSpan={8}>{printResponseData?.[0]?.rejected}</td>
            </tr>
            <tr>
              <td colSpan={20}>
                Lot Status:
                {printResponseData?.[0]?.lot_status}
              </td>
            </tr>

            <tr>
              <td colSpan={20}>
                Remarks/Reason for Rejection, if any:
                {printResponseData?.[0]?.remarks}{" "}
              </td>
            </tr>

            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Inspected by:Signature & Date
              </td>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Approved by:Signature & Date
              </td>
            </tr>

            <tr>
              <td colSpan={10} style={{ height: "50px", textAlign: "center" }}>
                {getImage && (
                  <img
                    src={getImage}
                    alt="QA_Inspector Sign"
                    style={{
                      width: "60px",
                      height: "20px",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}
                <br />
                {printResponseData?.[0]?.qa_inspector_sign}
                <br />
                {formattedQaInspectorDateTime}
              </td>
              <td colSpan={10} style={{ height: "50px", textAlign: "center" }}>
                {getImage1 && (
                  <img
                    src={getImage1}
                    alt="QA_Manager Sign"
                    style={{
                      width: "60px",
                      height: "20px",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                )}
                <br />
                {printResponseData?.[0]?.qa_manager_sign}
                <br />
                {formattedQaManagerDateTime}
              </td>
            </tr>
            <br />
          </tbody>
          <br />
          <br />
          <tfoot>
            <tr>
              <td colSpan={5}>Particulars</td>
              <td colSpan={5}>Prepared by</td>
              <td colSpan={5}>Reviewed by</td>
              <td colSpan={5}>Approved by</td>
            </tr>
            <tr>
              <td colSpan={5}>Name</td>
              <td colSpan={5}></td>
              <td colSpan={5}></td>
              <td colSpan={5}></td>
            </tr>
            <tr>
              <td colSpan={5}>Signature & Date</td>
              <td colSpan={5}></td>
              <td colSpan={5}> </td>
              <td colSpan={5}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <BleachingHeader
        unit="Unit-H"
        formName="INWARD INSPECTION REPORT(JAR/BLISTER)"
        formatNo="PH-QAD01-F-033"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
            shape="round"
          >
            Print
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
            icon={<BiLock color="#00308F" />}
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
          <PrecotSidebar
            open={open}
            onClose={onClose}
            role={localStorage.getItem("role")}
          />,
        ]}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",

            alignItems: "center",
          }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            value={newDate}
            style={{ width: "200px", fontWeight: "bold", marginRight: "1em" }}
            onChange={(e) => {
              setNewDate(e.target.value);
              setSupplierList("");
              setInvoiceList("");
              setSelectedSupplier("");
              setSelectedinvoice("");
              fetchGet(e.target.value);
            }}
            max={getCurrentDate()}
          />

          <label>Supplier:</label>
          <Select
            placeholder="Select Supplier"
            style={{ width: "200px", marginLeft: "10px" }}
            value={selectedSupplier}
            onChange={(value) => {
              setSelectedSupplier(value);
              setSelectedinvoice("");
              handleSupplierSelection(value);
            }}
          >
            {(supplierList && Array.isArray(supplierList)
              ? supplierList
              : []
            ).map((Supplier) => (
              <Option key={Supplier} value={Supplier}>
                {Supplier}
              </Option>
            ))}
          </Select>

          <label>Invoice No:</label>
          <Select
            placeholder="Invoice No"
            style={{ width: "200px", marginLeft: "10px" }}
            value={selectedinvoice}
            onChange={(value) => {
              setSelectedinvoice(value);
              handleInvoiceSelection(value);
            }}
          >
            {(invoiceList && Array.isArray(invoiceList) ? invoiceList : []).map(
              (Invoice) => (
                <Option key={Invoice} value={Invoice}>
                  {Invoice}
                </Option>
              )
            )}
          </Select>
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            onClick={handleGoToChange}
          >
            Go To
          </Button>
        </div>
      </div>
      <Table
        bordered
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={apiData || cakingData}
      />
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            disabled={submitButtonDisabled} // Button state based on validity
          >
            Submit
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
            marginLeft: "20px",
          }}
        >
          <label>Date:</label>
          <Input
            type="date"
            size="small"
            value={printDate || ""} // Ensure controlled component
            style={{ fontWeight: "bold", marginRight: "1em", width: "60%" }}
            onChange={(e) => {
              setPrintDate(e.target.value);
              fetchPrintGet(e.target.value);
              checkFormValidity();
              SetPrintSupplier("");
              setInvoicePrint("");
              setiirNumbers("");
              SetSelectedPrintSupplier("");
              setSelectedInvoicePrint("");
              setSelectediirNumbers("");
            }}
            max={getCurrentDate()}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <label>Supplier:</label>
          <Select
            addonBefore="Supplier"
            placeholder="Select Supplier"
            value={SelectedPrintSupplier || undefined} // Ensure controlled component
            onChange={(value) => {
              SetSelectedPrintSupplier(value);
              handlePrintSupplier(value);
              setSelectedInvoicePrint("");
              setSelectediirNumbers("");
              setInvoicePrint("");
              setiirNumbers("");
              checkFormValidity();
            }}
            style={{ fontWeight: "bold", marginRight: "70px", width: "60%" }}
          >
            {(PrintSupplier && Array.isArray(PrintSupplier)
              ? PrintSupplier
              : []
            ).map((Supplier) => (
              <Option key={Supplier} value={Supplier}>
                {Supplier}
              </Option>
            ))}
          </Select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <label>Invoice:</label>
          <Select
            addonBefore="Invoice"
            placeholder="Select Invoice"
            value={SelectedInvoicePrint || undefined} // Ensure controlled component
            onChange={(value) => {
              setSelectedInvoicePrint(value);
              handlePrintInvoiceSelection(value);
              checkFormValidity(); // Validate after invoice selection
            }}
            style={{ fontWeight: "bold", marginRight: "70px", width: "60%" }}
          >
            {(InvoicePrint && Array.isArray(InvoicePrint)
              ? InvoicePrint
              : []
            ).map((invoice) => (
              <Option key={invoice} value={invoice}>
                {invoice}
              </Option>
            ))}
          </Select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <label>IIR No:</label>
          <Select
            addonBefore="IIR Number"
            placeholder="IIR Number"
            value={SelectediirNumbers || undefined} // Ensure controlled component
            onChange={(value) => {
              setSelectediirNumbers(value);
              handlePrintiirselection(value);
              checkFormValidity(); // Validate after IIR selection
            }}
            style={{ fontWeight: "bold", marginRight: "70px", width: "60%" }}
          >
            {(iirNumbers && Array.isArray(iirNumbers) ? iirNumbers : []).map(
              (iirNumber) => (
                <Option key={iirNumber} value={iirNumber}>
                  {iirNumber}
                </Option>
              )
            )}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QA_Inward033_Sum;
