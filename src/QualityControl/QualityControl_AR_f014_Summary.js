/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Row,
  Avatar,
  Col,
  Drawer,
  message,
  Form,
  notification,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";

const { Option } = Select;

const QualityControl_f01_Summary = () => {
  const [payload, setPayload] = useState({
    test_id: "",
    format: "",
    format_no: "",
    ref_sop_no: "",
    unit: "",
    s_no: "",
    date: "",
    an_re_number: "",
    supplier_name: "",
    invoice_no: "",
    ashContent1FlWtObr: "",
    ashContent1IlWtObr: "",
    ashContent1BaObr: "",
    ashContent1ResObr: "",
    ashContent2FlWtObr: "",
    ashContent2IlWtObr: "",
    ashContent2BaObr: "",
    ashContent2ResObr: "",
    moisture1FlWtObr: "",
    moisture1IlWtObr: "",
    moisture1XyObr: "",
    moisture1ResObr: "",
    moisture2FlWtObr: "",
    moisture2IlWtObr: "",
    moisture2XyObr: "0.55",
    moisture2ResObr: "",
    remarks: "",
    remarks1: "",
    status: "",
    revision_no: "",
    chemist_status: "",
    chemist_saved_on: "",
    chemist_saved_by: "",
    chemist_saved_id: "",
    chemist_submit_on: "",
    chemist_submit_by: "",
    chemist_submit_id: 98765,
    chemist_sign: "",
    qc_status: "",
    qc_submit_on: "",
    qc_submit_by: "",
    qc_submit_id: "",
    qc_sign: "",
    reason: "",
    report_date: "",
    tested_by: "",
    tested_sign: "",
    tested_sign_date: "",
    approved_by: "",
    approved_sign: "",
    approved_date: "",
  });

  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [reason, setReason] = useState(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);

  const [availableBMRnoLov, setAvailableBMRnoLov] = useState(null);
  const [availableBMRnoPrint, setAvailableBMRnoPrint] = useState([]);
  const [availableBMRnoLovPrint, setAvailableBMRnoLovPrint] = useState(null);
  const [cakingData, setCakingData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno, setbatchno] = useState([]);
  const [batchnoprint, setbatchnoprint] = useState([]);
  const [batchNolist, setBatchNolist] = useState("Select Batch No");
  const [batchNolistPrint, setBatchNolistPrint] = useState("PH002");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const role = localStorage.getItem("role");
  const [messageApi, contextHolder] = message.useMessage();
  const [bmrListPrint, setBmrListPrint] = useState([]);
  const [PrintBmr, setPrintBmr] = useState(null);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [printRecord, setPrintRecord] = useState([]);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };

  const [formParams, setFormParams] = useState({
    subBatchNo: "",
    supplierSelect: "",
    invoiceSelect: "",
  });

  const [invoiceOptions, setInvoiceOptions] = useState([]);
  const [invoiceLov, setInvoiceLov] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [invoiceOptionsPrint, setInvoiceOptionsPrint] = useState([]);
  const [selectedInvoicePrint, setSelectedInvoicePrint] = useState("");

  // Effect to update invoice options when supplier changes
  useEffect(() => {
    if (availableBMRnoLov) {
      const supplierData = availableBMRno.find(
        (item) => item.supplier === availableBMRnoLov
      );
      if (supplierData) {
        const invoices = Array.isArray(supplierData.invoice_no)
          ? supplierData.invoice_no.map((inv) => inv.invoice_no)
          : [supplierData.invoice_no];
        setInvoiceOptions(invoices);
      }
    } else {
      setInvoiceOptions([]);
    }
  }, [availableBMRnoLov, availableBMRno]);

  const [showModal, setShowModal] = useState(false);

  const [getImage, setGetImage] = useState("");

  const [supplierLov, setSupplierLov] = useState([]);

  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [token, printData.chemist_sign, printData.micro_sign, printData.qc_sign]);

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchDatamillbatch = async () => {
      try {
        const response = await axios.get(
          `${   API.prodUrl}/Precot/api/chemicaltest/ARF014/PDE`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setSupplierLov(response.data);
        setAvailableBMRno(response.data);
        setAvailableBMRnoPrint(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatamillbatch();
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (data.qc_status === "QC_REJECTED") {
          setReason(true);
          break;
        } else {
          setReason(false);
        }
      }
    };
    findReason();
  }, [getData]);

  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrint = async () => {
    if (selectedInvoicePrint == "" || print == "") {
      message.warning("Please Select the Fields");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/chemicaltest/ARF014/print/?invoice=${selectedInvoicePrint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No Data Available To Print");
        setPrintButtonLoading(false);
        return;
      }

      setPrintData(response.data[0]);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };
  console.log("print", printData.date);

  useEffect(() => {
    if (Object.keys(printData).length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [2000]);
    }
  }, [printData]);

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

  const handlePrintCancel = () => {
    setFormParams((prevState) => ({
      ...prevState,
      supplierSelect: "",
      invoiceSelect: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData?.[0]?.supervisor_sign,     API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData?.[0]?.hod_sign,     API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qa_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData?.[0]?.qa_sign,     API.prodUrl, token]);

  useEffect(() => {
    if (token) {
      if (localStorage.getItem("role") === "ROLE_CHEMIST") {
        fetchData_getBleachingJobSupervisorSummeryF13();
      } else if (localStorage.getItem("role") === "ROLE_MICROBIOLOGIST") {
        fetchData_geBleachingJobtHodSummeryF13();
      } else if (localStorage.getItem("role") === "QC_MANAGER") {
        geBleachingJobQaSummeryF13();
      } else if (localStorage.getItem("role") === "QA_MANAGER") {
        geBleachingJobQaSummeryF13();
      }
    }
    fetchBmrOptionsPrint();
  }, []);

  const handleBmrChangePrint = (value) => {
    console.log("value of print bmr", value);
    setPrintBmr(value);
    fetchDatabatchByBleachPrint(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintBmr(null);
    setBatchNolistPrint(null);
  };

  const fetchBmrOptionsPrint = async () => {
    try {
      const response = await fetch(
        `${   API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      console.log(data);

      if (Array.isArray(data)) {
        // Extract the bmr_no values into a separate array
        const bmrOptions = data.map((item) => ({
          value: item.bmr_no,
          label: item.bmr_no,
        }));
        setBmrListPrint(bmrOptions);
        console.log("new laydown", bmrListPrint);
      } else {
        console.error("API response is not an array", data);
        setBmrListPrint([]);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBmrListPrint([]);
    }
  };

  const fetchDatabatchByBleachPrint = async (value) => {
    try {
      setLoading(true);
      console.log("inside print bmr", value);
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/bleaching/summary/batchByBleach?bmr_no=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.map((laydownno) => laydownno.value);
      setbatchnoprint(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData_getBleachingJobSupervisorSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/chemicaltest/ARF014/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length !== 0) {
        setReason(true);
      } else {
        setReason(false);
      }
      setGetData(response.data);

      const a = response.data;

      console.log("response data : ", a);

      const v = response.data.map((x, i) => {
        return {
          formatName: x.format,
          formatNo: x.format_no,
          revisionNo: x.revision_no,
          refSopNo: x.ref_sop_no,
          unit: x.unit,
          date: x.updatedAt,
          id: x.test_id,
          chemist_status: x.chemist_status,
          microbiologist_status: x.micro_status,
          qc_status: x.qc_status,
          millBatchNo: x.invoice_no,
          supplier: x.supplier_name,
          reason: x.reason,
        };
      });

      setSummary(v);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData_geBleachingJobtHodSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/chemicaltest/ARF014/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length !== 0) {
        setReason(true);
      } else {
        setReason(false);
      }
      setGetData(response.data);

      const a = response.data;

      console.log("response data : ", a);

      const v = response.data.map((x, i) => {
        return {
          formatName: x.format,
          formatNo: x.format_no,
          revisionNo: x.revision_no,
          refSopNo: x.ref_sop_no,
          unit: x.unit,
          date: x.updatedAt,
          id: x.test_id,
          chemist_status: x.chemist_status,
          microbiologist_status: x.micro_status,
          qc_status: x.qc_status,
          millBatchNo: x.invoice_no,
          supplier: x.supplier_name,
          reason: x.reason,
        };
      });

      setSummary(v);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const geBleachingJobQaSummeryF13 = async () => {
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/chemicaltest/ARF014/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length !== 0) {
        setReason(true);
      } else {
        setReason(false);
      }
      setGetData(response.data);

      const a = response.data;

      console.log("response data : ", a);

      const v = response.data.map((x, i) => {
        return {
          formatName: x.format,
          formatNo: x.format_no,
          revisionNo: x.revision_no,
          refSopNo: x.ref_sop_no,
          unit: x.unit,
          date: x.updatedAt,
          id: x.test_id,
          chemist_status: x.chemist_status,
          microbiologist_status: x.micro_status,
          qc_status: x.qc_status,
          millBatchNo: x.invoice_no,
          supplier: x.supplier_name,
          reason: x.reason,
        };
      });

      setSummary(v);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of modalData) {
        if (
          data.qc_status == "QC_REJECTED" ||
          data.qc_status === "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [modalData]);

  const handleEdit = (record) => {
    console.log("edit selected id", record);

    console.log("x", record);

    navigate("/Precot/QualityControl/AR_F-014", {
      state: {
        subbatch: batchNolist,
        bmrnos2: selectedInvoice,
        bmrnos3: availableBMRnoLov,
        formID: record,
      },
    });
  };

  const handlePrintChange = (value) => {
    try {
      setBatchNolistPrint(value);
      axios
        .get(
          `${   API.prodUrl}/Precot/api/Bleaching/Service/getBmrbatchNoDetails13?bmr_no=${PrintBmr}&batchNo=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setPrintResponseData(res.data);
            console.log("laydown print value", printResponseData);
            // setPrintLaydown(value);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
          }
        })
        .catch((err) => {
          setPrintResponseData([]);
          console.log("Error", err);
          notification.warning({
            message: "Notification",
            description: err.response.data.message,
          });
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };
  const getInvoicesBySupplier = (supplierName) => {
    const supplierData = supplierLov.find(
      (item) => item.supplier === supplierName
    );
    return supplierData ? supplierData.invoice_no : [];
  };
  const handleAvailableBMRnoLovChange = (supplierName) => {
    console.log("BMR Value", supplierName);
    setAvailableBMRnoLov(supplierName);

    // if (value) {
    //   const supplierData = availableBMRno.find(
    //     (item) => item.supplier === value
    //   );
    //   if (supplierData) {
    //     const invoices = Array.isArray(supplierData.invoice_no)
    //       ? supplierData.invoice_no.map((inv) => inv.invoice_no)
    //       : [supplierData.invoice_no];
    //     setInvoiceOptions(invoices);
    //   }
    // } else {
    //   setInvoiceOptions([]);
    // }

    const invoiceLovData = getInvoicesBySupplier(supplierName);
    if (invoiceLovData.length > 0) {
      const options = invoiceLovData
        .filter((option) => option.invoice_no !== "")
        .map((option) => ({
          value: option.invoice_no,
          label: option.invoice_no,
        }));
      setInvoiceLov(options);
    }
  };

  const handleAvailableBMRnoLovChangePrint = (supplierName) => {
    console.log("BMR supplierName", supplierName);
    setAvailableBMRnoLovPrint(supplierName);

    // if (value) {
    //   const supplierData = availableBMRnoPrint.find(
    //     (item) => item.supplier === value
    //   );
    //   if (supplierData) {
    //     const invoices = Array.isArray(supplierData.invoice_no)
    //       ? supplierData.invoice_no.map((inv) => inv.invoice_no)
    //       : [supplierData.invoice_no];
    //     setInvoiceOptionsPrint(invoices);
    //   }
    // } else {
    //   setInvoiceOptionsPrint([]);
    // }
    const invoiceLovData = getInvoicesBySupplier(supplierName);
    if (invoiceLovData.length > 0) {
      const options = invoiceLovData
        .filter((option) => option.invoice_no !== "")
        .map((option) => ({
          value: option.invoice_no,
          label: option.invoice_no,
        }));
      setInvoiceOptionsPrint(options);
    }
  };

  const handleAvailableBMRnoLovChange1 = (value) => {
    console.log("BMR Value", value);
    setSelectedInvoice(value);
  };

  const handleAvailableBMRnoLovChange1Print = (value) => {
    console.log("BMR Value", value);
    setSelectedInvoicePrint(value);
  };

  const handleGo = async () => {
    console.log(availableBMRno, batchNolist);

    navigate("/Precot/QualityControl/AR_F-014", {
      state: {
        subbatch: batchNolist,
        bmrnos2: selectedInvoice,
        bmrnos3: availableBMRnoLov,
        formID: null,
      },
    });
  };

  // const handleEdit = (record) => {
  //   console.log("wer", record);
  //   const x = newData.filter((x, i) => {
  //     return record.headerID === x.header_id;
  //   });
  //   console.log("x", x);
  //   navigate("/Precot/QualityControl/F-001", {
  //     state: {
  //       subbatch: batchNolist,
  //       bmrnos2: availableBMRnoLov,
  //     },
  //   });
  // };

  const handleCreate = () => {
    navigate("/Precot/Bleaching/F-13");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier",
      key: "supplier",
      align: "center",
    },

    {
      title: "Invoice No",
      dataIndex: "millBatchNo",
      key: "millBatchNo",
      align: "center",
    },

    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },

    {
      title: "Manager Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(id)}
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

  let columns;

  if (reason) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const forDate = formatDate(printResponseData?.[0]?.date);
  console.log("Date ", forDate);
  return (
    <div>
      <div id="section-to-print">
        <style>
          {`
      @media print {
       @page {
      size: landscape;
       margin: 0;
    }
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print table th,
  #section-to-print table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
        </style>
        <div className="page-break">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "80px",
                      height: "auto",
                      textAlign: "center",
                    }}
                  />
                  <br></br>
                  <br></br>

                  <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                </div>
              </td>

              <td
                style={{
                  padding: "0.5em",
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "60%",
                }}
                rowSpan={4}
              >
                BRIQUETTES ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-014</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>1 of 1</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>

          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                S.No.
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                DATE
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                ANALYTICAL REFERENCE NUMBER
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                SUPPLIER NAME
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                INVOICE . No
              </td>
              <td
                colSpan={8}
                style={{
                  textAlign: "center",
                  // writingMode: "vertical-rl",
                  // transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                Specification
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                TESTED BY
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                APRROVED BY
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                REMARKS
              </td>
            </tr>
            <tr>
              <td
                colSpan={4}
                rowSpan={3}
                style={{
                  textAlign: "center",
                  // writingMode: "vertical-rl",
                  // transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                ASH CONTENT % &lt; 10.0
              </td>
              <td
                rowSpan={3}
                colSpan={4}
                style={{
                  textAlign: "center",
                  // writingMode: "vertical-rl",
                  // transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                MOISTURE % &lt; 12.0
              </td>
            </tr>
          </table>
          <table
            style={{
              tableLayout: "fixed",
              width: "100%",
            }}
          >
            <tr>
              <td
                rowSpan={4}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                1
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {formatDate(printData?.date)}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.an_re_number}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {" "}
                {printData?.supplier_name}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.invoice_no}
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                FINAL Wt.(g)-B
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                {printData?.ashContent1FlWtObr}
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                INITIAL Wt.(g)-X
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                {printData?.moisture1IlWtObr}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.chemist_sign}
                <br />
                {formatDateAndTime(printData?.chemist_submit_on)}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.qc_sign}
                <br />
                {formatDateAndTime(printData?.qc_submit_on)}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.remarks}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                INITIAL Wt.(g)-A
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printData?.ashContent1IlWtObr}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                FINAL Wt.(g)-Y
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printData?.moisture1FlWtObr}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                [FINAL - INITIAL].Wt(g)B-A
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.ashContent1BaObr}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                [INITIAL- FINAL].Wt(g) X-Y
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.moisture1XyObr}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                RESULTS (%) [(B-A)×100]/5
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.ashContent1ResObr}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                RESULTS (%) [(X-Y)×100]/X
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.moisture1ResObr}
              </td>
            </tr>

            {/* <tr>
              <td
                rowSpan={4}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                2
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {formatDate(printData?.report_date)}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.an_re_number_b}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {" "}
                {printData?.supplier_name}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.invoice_no}
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                FINAL Wt.(g)-B
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                {printData?.ashContent2FlWtObr}
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                INITIAL Wt.(g)-X
              </td>
              <td
                colSpan={2}
                style={{ textAlign: "center", borderTop: "none" }}
              >
                {printData?.moisture2IlWtObr}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.chemist_sign}
                <br />
                {formatDateAndTime(printData?.chemist_submit_on)}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.qc_sign}
                <br />
                {formatDateAndTime(printData?.qc_submit_on)}
              </td>
              <td
                rowSpan={4}
                style={{
                  textAlign: "center",
                  borderTop: "none",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {printData?.remarks1}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                INITIAL Wt.(g)-A
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printData?.ashContent2IlWtObr}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                FINAL Wt.(g)-Y
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {printData?.moisture2FlWtObr}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                [FINAL - INITIAL].Wt(g)B-A
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.ashContent2BaObr}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                [INITIAL- FINAL].Wt(g) X-Y
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.moisture2XyObr}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                RESULTS (%) [(B-A)×100]/5
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.ashContent2ResObr}
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                RESULTS (%) [(X-Y)×100]/X
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {" "}
                {printData?.moisture2ResObr}
              </td>
            </tr> */}
          </table>
          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
            role === "ROLE_QA"
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
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
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
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
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
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
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
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
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
      <BleachingHeader
        unit="Unit-H"
        formName="BRIQUETTES ANALYSIS REPORT"
        formatNo="PH-QCL01-AR-014"
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
            onClick={showPrintModal}
            shape="round"
          >
            Print
          </Button>,
          <Button
            key="create"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            style={{
              marginRight: "12px",
              display:
                localStorage.getItem("role") === "OPERATOR" ? "block" : "none",
            }}
            type="primary"
          >
            Create
          </Button>,
          <Button
            key="back"
            // icon={<LeftOutlined />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            type="primary"
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
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
              if (confirm("Are you sure want to logout")) {
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Supplier :
          </div>
          <Select
            style={{ width: "150px" }}
            placeholder="Select Supplier"
            showSearch
            value={availableBMRnoLov}
            onChange={handleAvailableBMRnoLovChange}
            // onBlur={fetchDatabatchByBleach}
          >
            {availableBMRno.map((Bmrnolist, index) => (
              <Option key={index} value={Bmrnolist.supplier}>
                {Bmrnolist.supplier}
              </Option>
            ))}
          </Select>

          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Invoice No :
          </div>

          <Select
            style={{ width: "150px" }}
            placeholder="Select Mill Batch No"
            showSearch
            value={selectedInvoice}
            onChange={handleAvailableBMRnoLovChange1}
            options={invoiceLov}
            // onBlur={fetchDatabatchByBleach}
          >
            {/* {invoiceOptions.map((Bmrnolist, index) => (
              <Option key={index} value={Bmrnolist}>
                {Bmrnolist}
              </Option>
            ))} */}
          </Select>

          {availableBMRnoLov && selectedInvoice && (
            <Button
              key="go"
              onClick={handleGo}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              icon={<BiNavigation color="#00308F" />}
              type="primary"
            >
              Go To
            </Button>
          )}
        </div>

        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={summary}
        />
        <Modal
          title="Print"
          open={isModalPrint}
          onCancel={handlePrintCancel}
          destroyOnClose={true}
          footer={[
            <Button key="cancel" onClick={handlePrintCancel}>
              Cancel
            </Button>,
            <Button
              key="reject"
              type="primary"
              onClick={handlePrint}
              loading={printButtonLoading}
            >
              OK
            </Button>,
          ]}
        >
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px" }}>Supplier :</label>
            <Select
              style={{ width: "250px" }}
              placeholder="Select Mill Batch No"
              showSearch
              value={availableBMRnoLovPrint}
              onChange={handleAvailableBMRnoLovChangePrint}
              // onBlur={fetchDatabatchByBleach}
            >
              {availableBMRnoPrint.map((Bmrnolist, index) => (
                <Option key={index} value={Bmrnolist.supplier}>
                  {Bmrnolist.supplier}
                </Option>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px" }}>Invoice Number:</label>
            <Select
              style={{ width: "150px" }}
              placeholder="Select Mill Batch No"
              showSearch
              value={selectedInvoicePrint}
              onChange={handleAvailableBMRnoLovChange1Print}
              // onBlur={fetchDatabatchByBleach}
              options={invoiceOptionsPrint}
            >
              {/* {invoiceOptionsPrint.map((Bmrnolist, index) => (
                <Option key={index} value={Bmrnolist}>
                  {Bmrnolist}
                </Option>
              ))} */}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_f01_Summary;
