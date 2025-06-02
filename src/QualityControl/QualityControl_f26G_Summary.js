/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  Select,
  Table,
  Tooltip,
  message,
  Input,
  Modal,
  DatePicker,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  BiBorderLeft,
  BiBorderNone,
  BiBorderRight,
  BiLock,
  BiNavigation,
} from "react-icons/bi";
import BleachingTail from "../Components/BleachingTail.js";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import "../index.css";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import dayjs from "dayjs";

const QualityControl_f26G_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [printParams, setPrintParams] = useState({
    customerName: "",
    productName: "",
    testingDate: "",
  });
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [formLov, setFormLov] = useState({
    customerLov: [],
    productLov: [],
    printProductLov: [],
  });
  const [formParams, setFormParams] = useState({
    customerName: "",
    productName: "",
    date: "",
  });
  const [eSign, setESign] = useState({
    chemist_sign: "",
    qa_exe_sign: "",
    manager_sign: "",
  });

  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "qa_exe_sign", "manager_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
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
  }, [
    token,
    printData.chemist_sign,
    printData.qa_exe_sign,
    printData.manager_sign,
  ]);

  // useEffect(() => {
  //   const customerLovApi = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${  API.prodUrl}/Precot/api/QcForm/CustomerName`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const options = response.data.map((option) => ({
  //         value: option.value,
  //         label: option.value,
  //       }));
  //       console.log(response.data, "Api Response");
  //       setFormLov((prevState) => ({
  //         ...prevState,
  //         customerLov: options,
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching Job Order Options:", error);
  //     }
  //   };
  //   customerLovApi();
  // }, [token]);

  const productLovApi = async (value, type) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QcForm/ProductNameMedline`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Job Order Lov:", response.data);
      const options = response.data.map((option) => ({
        value: option.value,
        label: option.value,
      }));

      if (type == "Form") {
        console.log("Condition Entered");
        setFormLov((prevState) => ({
          ...prevState,
          productLov: options,
        }));
      }
    } catch (error) {
      console.error("Error fetching Job Order Options:", error);
    }
  };

  const productLovApiPrint = async (value, type) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QcForm/ProductF26?customer=${value}&formNo=F26G`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Job Order Lov:", response.data);
      const options = response.data.map((option) => ({
        value: option.value,
        label: option.value,
      }));

      if (type == "print") {
        setFormLov((prevState) => ({
          ...prevState,
          printProductLov: options,
        }));
      }
    } catch (error) {
      console.error("Error fetching Job Order Options:", error);
    }
  };

  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QcForm/F26GMoistureSummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (
          data.qa_exe_status == "QA_EXE_REJECTED" ||
          data.manager_status == "QC_REJECTED" ||
          data.manager_status == "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  //---------------------------------------------------------------------------

  // ---------------------------- Summary Table Column -------------------------
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "QA Exe Status",
      dataIndex: "qa_exe_status",
      key: "qa_exe_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "manager_status",
      key: "manager_status",
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

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
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

  const handleOk = () => {
    if (formParams.customerName == "") {
      message.warning("Please Select Customer");
      return;
    }
    if (formParams.productName == "") {
      message.warning("Please Select The Product");
      return;
    }
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }
    navigate(`/Precot/QualityControl/F-026G`, {
      state: {
        customerName: formParams.customerName,
        productName: formParams.productName,
        date: formParams.date,
      },
    });
  };
  const handleEdit = (record) => {
    navigate(`/Precot/QualityControl/F-026G`, {
      state: {
        customerName: record.customer,
        productName: record.product,
        date: record.testing_date || formParams.date,
      },
    });
  };

  const handleSelect = (e, name) => {
    if (name == "customerName") {
      productLovApi(e, "Form");
    }

    setFormParams((prevState) => ({
      ...prevState,
      [name]: e,
    }));
    console.log("[name]: e,", name, e);
  };
  const handlePrintParams = (e, name) => {
    if (name == "customerName") {
      setPrintParams((prevState) => ({
        ...prevState,
        productName: "",
      }));
      productLovApiPrint(e, "print");
    }

    setPrintParams((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const handlePrint = async () => {
    if (printParams.customerName == "") {
      message.warning("Please Choose The Customer");
      return;
    }
    if (printParams.productName == "") {
      message.warning("Please Choose The Product");
      return;
    }
    if (printParams.testingDate == "") {
      message.warning("Please Choose The date");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QcForm/PrintApiF26G?product=${printParams.productName}&customer=${printParams.customerName}&testingDate=${printParams.testingDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
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
  useEffect(() => {
    if (Object.keys(printData).length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [2000]);
    }
  }, [printData]);
  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      customerName: "",
      productName: "",
      testingDate: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
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

  return (
    <>
      <div id="section-to-print">
        <style>
          {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print-san table th,
  #section-to-print-san table td {
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
                CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%)
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01/F-026G</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>01</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>01 of 01</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ height: "100%" }}>
            <tr>
              <td colSpan={2}>Date </td>
              <td colSpan={5}>{formatDate(printData.date)}</td>
            </tr>
            <tr>
              <td colSpan={2}>Product </td>
              <td colSpan={5}>{printData.product}</td>
            </tr>
            <tr>
              <td colSpan={2}>Customer </td>
              <td colSpan={5}>{printData.customer}</td>
            </tr>
            <tr>
              <td colSpan={2}>Batch No.</td>
              <td colSpan={5}>{printData.batch_no}</td>
            </tr>
            <tr>
              <td colSpan={2}>Lot No. </td>
              <td colSpan={5}>{printData.lot_no}</td>
            </tr>
            <tr>
              <td colSpan={2}>PO No. </td>
              <td colSpan={5}>{printData.po_no}</td>
            </tr>
            <tr>
              <td colSpan={2}>Quantity (EA) </td>
              <td colSpan={5}>{printData.quantity}</td>
            </tr>
          </table>
          <br/>
          <table border="1">
  <thead>
    <tr>
      <th style={{ textAlign: "center" }} rowSpan={2}>S.No.</th>
      <th style={{ textAlign: "center" }} rowSpan={2}>Testing Date</th>
      <th style={{ textAlign: "center" }} rowSpan={printData.details?.length || 1}>Standard Moisture (%)</th>
      <th style={{ textAlign: "center" }} colSpan={3}>Observations</th>
      <th style={{ textAlign: "center" }} rowSpan={2}>Remarks</th>
    </tr>
    <tr>
      <th style={{ textAlign: "center" }}>Initial Weight (g)</th>
      <th style={{ textAlign: "center" }}>Final Weight (g)</th>
      <th style={{ textAlign: "center" }}>Result Moisture Content (%)</th>
    </tr>
  </thead>
  <tbody>
    {printData.details && printData.details.length > 0 ? (
      printData.details.map((item, index) => (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{index + 1}</td>
          <td style={{ textAlign: "center" }}>{formatDate(printData.testing_date)}</td>
          
          {/* Render Standard Moisture only for the first row */}
          {index === 0 && (
            <td style={{ textAlign: "center" }} rowSpan={printData.details.length}>
              ≤ 7.0
            </td>
          )}

          <td style={{ textAlign: "center" }}>{item.initial_weight}</td>
          <td style={{ textAlign: "center" }}>{item.final_weight}</td>
          <td style={{ textAlign: "center" }}>{item.result}</td>
          <td style={{ textAlign: "center" }}>{item.remarks}</td>
        </tr>
      ))
    ) : null
      }
  </tbody>
</table>


          <br/>
          <table>
            <tr>
              <td
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={2}
              >
                Prepared By.
              </td>
              <td
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={2}
              >
                Verified By.
              </td>
              <td
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={3}
              >
                Approved By.
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.chemist_sign ? (
                  <img
                    src={eSign.chemist_sign}
                    alt="Operator eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.chemist_sign}
                <br></br>
                {formatDateAndTime(printData.chemist_submit_on)}
              </td>
              <td
                colspan="2"
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.qa_exe_sign ? (
                  <img
                    src={eSign.qa_exe_sign}
                    alt="eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.qa_exe_sign}
                <br></br>
                {formatDateAndTime(printData.qa_exe_submit_on)}
              </td>
              <td
                colSpan={3}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.manager_sign ? (
                  <img
                    src={eSign.manager_sign}
                    alt="HOD eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.manager_sign}
                <br></br>
                {formatDateAndTime(printData.manager_submit_on)}
              </td>
            </tr>
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
      <BleachingHeader
        formName={"CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%)"}
        formatNo={"PH-QCL01/F-026G"}
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
            icon={<FaPrint color="#00308F" />}
            onClick={showPrintModal}
            shape="round"
          >
            Print
          </Button>,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            shape="round"
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="COA FOR MOISTURE CONTENT (%) (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
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
        <label> Customer &nbsp;&nbsp;&nbsp;&nbsp; : </label>
        <br></br>
        <Select
          value={printParams.customerName}
          onChange={(e) => {
            handlePrintParams(e, "customerName");
          }}
          showSearch
          style={{
            width: "300px",
            marginLeft: 10,
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        >
          <Select.Option value="Medline">Medline</Select.Option>
        </Select>
        <br></br>
        <br></br>
        <label>
          Product &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
        </label>
        <br></br>
        <Select
          options={formLov.printProductLov}
          value={printParams.productName}
          onChange={(e) => {
            handlePrintParams(e, "productName");
          }}
          style={{
            width: "300px",
            marginLeft: 10,
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
        <br></br>
        <br></br>
        <br></br>
        <label>Date:</label>
        <DatePicker
          placeholder="Testing Date"
          style={{ width: "300px" }}
          value={
            printParams.testingDate
              ? dayjs(printParams.testingDate, "YYYY-MM-DD")
              : null
          }
          onChange={(date) => {
            handlePrintParams(
              date ? date.format("YYYY-MM-DD") : null,
              "testingDate"
            );
          }}
          format={"YYYY-MM-DD"}
        ></DatePicker>
      </Modal>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <label style={{ marginTop: "8px" }}>Customer : </label>
        <Select
          style={{ width: "400px", textAlign: "center" }}
          value={formParams.customerName}
          onChange={(e) => {
            handleSelect(e, "customerName");
          }}
          dropdownStyle={{ textAlign: "center" }}
          showSearch
        >
          <Select.Option value="Medline">Medline</Select.Option>
        </Select>
        <label style={{ marginTop: "8px" }}>Product : </label>
        <Select
          options={formLov.productLov}
          style={{ width: "300px", textAlign: "center" }}
          value={formParams.productName}
          onChange={(e) => {
            handleSelect(e, "productName");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSelect(e.target.value, "productName");
            }
          }}
          filterOption={false}
          dropdownStyle={{ textAlign: "center" }}
          showSearch
        ></Select>
        <label style={{ marginTop: "8px" }}>Date : </label>
        <Input
          style={{ width: "300px", textAlign: "center" }}
          type="date"
          onChange={(e) => {
            setFormParams((prevState) => ({
              ...prevState,
              date: e.target.value,
            }));
          }}
        />
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={handleOk}
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default QualityControl_f26G_Summary;
