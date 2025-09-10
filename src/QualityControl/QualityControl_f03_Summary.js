/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  Select,
  Form,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  TimePicker,
  Modal,
  Table,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoMdPrint } from "react-icons/io";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import moment from "moment";
import logo from "../Assests/logo.png";
import { GoArrowLeft } from "react-icons/go";
import gif from "../Assests/gif.gif";
import { TbMenuDeep } from "react-icons/tb";

import { createGlobalStyle } from "styled-components";
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QualityControl_f03_Summary = () => {
  const formatName = "Chemical Analysis Report";
  const formatNo = "PH-QCL01-AR-F-003";
  const revisionNo = "02";
  const sopNo = "PH-QCL01-D-05";
  const unit = "Unit H";

  PrintPageOrientation({ orientation: "landscape", scale: 0.9 });

  const navigate = useNavigate();
  const { state } = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // const userName = localStorage.getItem("username");

  // const [loading, setLoading] = useState(true);
  // const [saveLoading, setSaveLoading] = useState(false);
  // const [submitLoading, setSubmitLoading] = useState(false);
  // const [disable, setDisable] = useState(false);
  // const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  // const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [rejectRemarks, setRejectRemarks] = useState("");
  const [reason, setReason] = useState(false);
  const [materialDoc, setMaterialDoc] = useState();
  const [printmaterialDoc, setPrintMaterialDoc] = useState();
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const [printData, setPrintData] = useState("");
  const [pdeResponse, setPdeResponse] = useState([]);
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const { Option } = Select;
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleModalClose = () => {
    setPrintBtnStatus(false);
    setShowModal(false);
    setPrintMaterialDoc("");
  };

  // const GlobalStyle = createGlobalStyle`
  // @media print {
  //   @page {
  //     size: landscape;
  //   }
  //   body {
  //     -webkit-print-color-adjust: exact;
  //     width: 100%;
  //     height: 100%;
  //     transform: scale(0.9); /* Adjust scale as needed */
  //     transform-origin: top left right bottom; /* Adjust the origin if needed */
  //   }
  // }`;

  const values_Specification = [
    { value: "24/1443", label: "24/1443" },
    { value: "24/1444", label: "24/1444" },
    { value: "24/1445", label: "24/1445" },
    { value: "24/1446", label: "24/1446" },
  ];

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.qc_status === "QC_REJECTED" ||
          data.qc_status === "QA_REJECTED"
        ) {
          setReason(true);
          return; // Exit the loop once you find a match
        }
      }
      setReason(false);
    };
    findReason();
  }, [getData]);

  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData.chemist_sign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData.qc_sign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printData,API.prodUrl, token]);

  // Get the PDE details.....
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/GetChemicalAnalysisReportPdeData`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("PDE Response", res.data);
        console.log(
          "first",
          res.data.map((x, i) => {
            return x.matDoc;
          })
        );
        setPdeResponse(
          res.data.map((x, i) => {
            return x.matDoc;
          })
        );

        // const m = res.data.map((x,i) => {
        //   return x.weight
        // })
        // const n = res.data.filter((x,i) => {
        //   return x.weight = m[2]
        // })
        // console.log("filtered",n[0].invoice)
      })
      .catch(() => {});
  }, []);

  // Get the All Summary.....
  useEffect(() => {
    if (localStorage.getItem("role") == "ROLE_CHEMIST") {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .get(`${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/GetAll`, {
          headers,
        })
        .then((response) => {
          if (response.data && response.data.length !== 0) {
            setReason(true);
          } else {
            setReason(false);
          }
          setGetData(response.data);

          console.log(" Response", response.data);
          const a = response.data.map((x, i) => {
            return {
              formatName: x.formatName,
              formatNo: x.formatNo,
              revisionNo: x.revisionNo,
              refSopNo: x.refSopNo,
              unit: x.unit,
              date: x.date,
              id: x.id,
              chemist_status: x.chemist_status,
              qc_status: x.qc_status,
              materialDocNo: x.materialDocNo,
              reason: x.reason || "NA",
            };
          });
          // console.log("aaa", a);
          setSummary(a);
          console.log("  setSummary(a);", a);
          const hasRejectedStatus = a.some(
            (item) =>
              item.qc_status === "QC_REJECTED" ||
              item.qc_status === "QA_REJECTED"
          );
          setShowReasonColumn(hasRejectedStatus);
          // setSummary(a);
        })
        .catch(() => {});
    } else if (
      localStorage.getItem("role") == "QC_MANAGER" ||
      localStorage.getItem("role") == "QA_MANAGER"
    ) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(
          `${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/getAllQcNotSubmitted`,
          {
            headers,
          }
        )
        .then((response) => {
          console.log(" Response", response.data);
          const chemista = response.data.map((x, i) => {
            return {
              formatName: x.formatName,
              formatNo: x.formatNo,
              revisionNo: x.revisionNo,
              refSopNo: x.refSopNo,
              unit: x.unit,
              date: x.date,
              id: x.id,
              chemist_status: x.chemist_status,
              qc_status: x.qc_status,
              materialDocNo: x.materialDocNo,
              reason: x.reason,
            };
          });
          console.log("aaa", chemista);
          setSummary(chemista);
          console.log("  setSummary(a);", chemista);
          const hasRejectedStatus = chemista.some(
            (item) =>
              item.qc_status === "QC_REJECTED" ||
              item.qc_status === "QA_REJECTED"
          );
          setShowReasonColumn(hasRejectedStatus);
          // setSummary(a);
        })
        .catch(() => {});
    }
  }, []);

  const handleGoToChange = () => {
    // if (newDate == "") {
    //   // setError('Please select a date');
    //   message.warning("Please Select Date");
    //   return;
    // }
    if (materialDoc == "" || materialDoc == null) {
      message.warning("Please Select Material Doc No");
      return;
    }
    navigate("/Precot/QualityControl/F-03", {
      state: {
        materialDoc: materialDoc,
      },
    });
  };

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };

  const printDateSubmit = () => {
    window.print();
    handleModalClose();
  };

  let formattedChemistDate;
  if (printData.chemist_submit_on) {
    formattedChemistDate = moment(printData.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (printData.qc_submit_on) {
    formattedQCDate = moment(printData.qc_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  const handlePrintChange = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // const a = String(event.target.value).split('-').reverse().join('/');

    if (printmaterialDoc == "") {
      // setError('Please select a date');
      message.warning("Please Select Material Doc No :");
      return;
    }

    axios
      .get(
        `${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/GetReportForPrint`,
        {
          headers,
          params: {
            materialDocNo: printmaterialDoc,
          },
        }
      )
      .then((res) => {
        console.log("first response", res);
        console.log("Material Doc", materialDoc);
        console.log("Print Material Doc", printmaterialDoc);
        if (
          res.data === `No data found for Material Doc No: ${printmaterialDoc}`
        ) {
          console.log("first response", res.data);
          message.info("No Data Found");
        } else {
          console.log("first response", res.data);
          setPrintData(res.data[0]);
          setTimeout(() => {
            // setLoading(false)
            window.print();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        message.error(err.res.message);
      });
  };

  const handleEdit = (record) => {
    if (role == "ROLE_CHEMIST") {
      const x = summary.filter((x, i) => {
        return record.id == x.id;
      });
      console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      //   setmodalData(x);
      navigate("/Precot/QualityControl/F-03", {
        state: {
          materialDoc: x[0].materialDocNo,
          id: x[0].id,
        },
      });
      // setnewModal(true);
    }

    if (role == "QC_MANAGER" || role == "QA_MANAGER") {
      const x = summary.filter((x, i) => {
        return record.id == x.id;
      });
      console.log("X", x);
      // setNewStatus(x[0].supervisor_status);
      //   setmodalData(x);
      navigate("/Precot/QualityControl/F-03", {
        state: {
          materialDoc: x[0].materialDocNo,
          id: x[0].id,
        },
      });
      // setnewModal(true);
    }
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Mill Batch No",
      dataIndex: "materialDocNo",
      key: "materialDocNo",
      align: "center",
      // render: (text) => formatDate(text),
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "QC Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
    },
    ...(showReasonColumn
      ? [
          {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            align: "center",
            render: (text) => text || "NA", // Set default value to "nA" if text is falsy
          },
        ]
      : []),
    {
      title: "Action",
      dataIndex: "slb_id",
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

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit={unit}
        formName={formatName}
        formatNo={formatNo}
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
              // display: printBtnStatus ? "block" : "none",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            &nbsp;Print
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            // icon={<IoCaretBackCircleSharp color="#00308F" />}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
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

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <span> Material Doc.No/GRN :</span>
        </div>
        <Select
          placeholder="Select Material Doc No"
          value={materialDoc}
          onChange={(value) => setMaterialDoc(value)}
          style={{ width: 120, fontWeight: "bold" }}
          showSearch
          // options={pdeResponse}
        >
          {pdeResponse.map((pdeResponse) => (
            <Option value={pdeResponse}>{pdeResponse}</Option>
          ))}
        </Select>
        <Button
          key="Create"
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
          Go to
        </Button>
      </div>

      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
        footer={[
          <Button
            key="submit"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            type="primary"
            onClick={handlePrintChange}
            disabled={printBtnStatus}
          >
            Print
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <span> &nbsp; Select Material Doc.No/GRN :</span>
          </div>
          <Select
            showSearch
            placeholder="Select Material Doc.No/GRN:"
            value={printmaterialDoc}
            onChange={(value) => setPrintMaterialDoc(value)}
            style={{ width: 120, fontWeight: "bold" }}
            // options={values_Specification}
          >
            {pdeResponse.map((pdeResponse) => (
              <Option value={pdeResponse}>{pdeResponse}</Option>
            ))}
          </Select>
        </div>
      </Modal>
      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summary}
        rowKey="id"
      />

      {/* print started here */}
      {/* <GlobalStyle /> */}
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          <table
            style={{ marginTop: "5px", width: "90%", tableLayout: "fixed" }}
          >
            <br /> <br /> <br /> <br />
            <tbody>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  {unit}
                </td>
                <th colSpan="45" rowSpan="4" style={{ textAlign: "center" }}>
                  {formatName}
                </th>
                <td colSpan="20">Format No.:</td>
                <td colSpan="20">{formatNo}</td>
              </tr>
              <tr>
                <td colSpan="20">Revision No.:</td>
                <td colSpan="20">{revisionNo}</td>
              </tr>
              <td colSpan="20">Ref. SOP No.:</td>
              <td colSpan="20">{sopNo}</td>
              <tr>
                <td colSpan="20">Page No.:</td>
                <td colSpan="20">1 of 2</td>
              </tr>
              <br />
              <tr>
                <th rowSpan="3" colSpan="60">
                  Supplier : {printData.supplier}
                </th>
                <th colSpan="40">
                  Material Doc.No/GRN: {printData.materialDocNo}
                </th>
              </tr>
              <tr>
                {" "}
                <th colSpan="40">
                  Chemical Batch No/ Lot No: {printData.chemicalBatchNo}{" "}
                </th>
              </tr>
              <tr>
                {" "}
                <th colSpan="40">
                  Analytical Reference No: {printData.analyticalRequestNo}{" "}
                </th>
              </tr>
              <tr>
                <th rowSpan="2" colSpan="60">
                  Chemical Name : {printData.chemicalName}
                </th>
                <th colSpan="40">
                  Tested Date :{" "}
                  {moment(printData.testedDate).format("DD/MM/YYYY")}{" "}
                </th>
              </tr>
              <tr>
                {" "}
                <th colSpan="40">
                  Sample Date :{" "}
                  {moment(printData.sampleDate).format("DD/MM/YYYY")}{" "}
                </th>
              </tr>
              <tr>
                <th colSpan="5">S.No.</th>
                <th colSpan="20">Parameter</th>
                <th colSpan="20">Specification</th>
                <th colSpan="15">Observation/Test Results</th>
                <th colSpan="40" style={{ textAlign: "center" }}>
                  Calculation
                </th>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="20">Appearance</td>
                <td colSpan="20"> {printData.appearanceSpec}</td>
                <td colSpan="15"> {printData.appearanceObsr}</td>
                <th colSpan="40">
                  Standardized Chemical Lot no:{" "}
                  {printData.standardizedChemicalLotNo}{" "}
                </th>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="20">Colour</td>
                <td colSpan="20">{printData.colorSpec}</td>
                <td colSpan="15"> {printData.colorObsr}</td>
                <th colSpan="40" rowSpan="10" style={{ height: "50px" }}>
                  {" "}
                  <div
                    style={{ maxWidth: 600, margin: "0 auto", padding: "10px" }}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ padding: "10px" }}>
                            Sample weight (g):
                          </td>
                          <td style={{ padding: "10px" }}>
                            {printData.sampleWeight}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px" }}>Burette Reading:</td>
                          <td style={{ padding: "10px" }}>
                            {printData.buretteReading}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px" }}>
                            Normality of the standard solution:
                          </td>
                          <td style={{ padding: "10px" }}>
                            {printData.normalityStandardSolution}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px" }}>
                            Equivalent weight Testing chemical:
                          </td>
                          <td style={{ padding: "10px" }}>
                            {printData.testingChemical}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="2"
                            style={{
                              textAlign: "center",
                              margin: "10px 0",
                              padding: "10px",
                            }}
                          >
                            <p>
                              Purity(%) = (Burette Reading × Normality of the
                              standard solution × Equivalent weight Testing
                              chemical) / (Sample Weight × 10)
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px" }}>Purity (%):</td>
                          <td
                            style={{ padding: "10px" }}
                          >{`${printData.purity}%`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </th>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="20">Odour</td>
                <td colSpan="20">{printData.odourSpec}</td>
                <td colSpan="15">{printData.odourObsr}</td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="20">Solubility in Water</td>
                <td colSpan="20">{printData.solubilityInWaterSpec}</td>
                <td colSpan="15">{printData.solubilityInWaterObsr}</td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="20">Visible / insoluble Impurities</td>
                <td colSpan="20">{printData.visibleSpec}</td>
                <td colSpan="15">{printData.visibleObsr}</td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="20">pH</td>
                <td colSpan="20">{printData.phSpec}</td>
                <td colSpan="15">{printData.phObsr}</td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="20">Purity%</td>
                <td colSpan="20">{printData.puritySpec}</td>
                <td colSpan="15">{printData.purityObsr}</td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="20">Relative density (Kg/Lt)</td>
                <td colSpan="20">{printData.relativeDensitySpec}</td>
                <td colSpan="15">{printData.relativeDensityObsr}</td>
              </tr>

              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="20">Specific Gravity</td>
                <td colSpan="20">{printData.specificGravitySpec}</td>
                <td colSpan="15">{printData.specificGravityObsr}</td>
              </tr>

              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="20">
                  Total Solids % [Non- Volatile matter by weight(g)]
                </td>
                <td colSpan="20">{printData.totalSolidsSpec}</td>
                <td colSpan="15">{printData.totalSolidsObsr}</td>
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan="20">Moisture %</td>
                <td colSpan="20">{printData.moistureSpec}</td>
                <td colSpan="15">{printData.moistureObsr}</td>
              </tr>
              <br />
              <tr style={{ height: "150px" }}>
                <td colSpan="10" style={{ border: "none" }}></td>
              </tr>
              <tr>
                {/* <td style={{padding:'5px', border:'none'}}></td> */}

                <th
                  colSpan="15"
                  rowSpan="4"
                  printDateSubmit
                  style={{
                    textAlign: "center",
                    height: "80px",
                    paddingTop: "20px",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />{" "}
                  <br></br>
                  {unit}
                </th>

                <th colSpan="45" rowSpan="4" style={{ textAlign: "center" }}>
                  {formatName}
                </th>
                <td colSpan="20">Format No.:</td>
                <td colSpan="20">{formatNo}</td>
              </tr>
              <tr>
                <td colSpan="20">Revision No.:</td>
                <td colSpan="20">{revisionNo}</td>
              </tr>
              <td colSpan="20">Ref. SOP No.:</td>
              <td colSpan="20">{sopNo}</td>
              <tr>
                <td colSpan="20">Page No.:</td>
                <td colSpan="20">2 of 2</td>
              </tr>
              <br />
              <tr>
                <td colSpan="100">
                  Disposal Method : {printData.disposalMethod}
                </td>
              </tr>
              <tr>
                {" "}
                <td colSpan="100">Remark : {printData.remark} </td>{" "}
              </tr>
              <tr>
                <td colSpan="33">
                  Qty. Accepted in Kg: {printData.qtyAcceptedInKg}
                </td>
                <td colSpan="33">
                  Qty. Rejected in Kg: {printData.qtyRejectedInKg}
                </td>
                <td colSpan="34">
                  Qty. Accepted under Deviation in Kg:{" "}
                  {printData.qtyAcceptedUnderDeviation}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="50">
                  Tested By (Chemist) :
                  <br />
                  {getImage !== "" && (
                    <img className="signature" src={getImage} alt="Chemist" />
                  )}
                  <br />
                  {printData.chemist_sign} <br />
                  {formattedChemistDate}
                </td>
                <td colSpan="50">
                  Approved By:
                  <br />
                  {getImage1 !== "" && (
                    <img className="signature" src={getImage1} alt="QC" />
                  )}
                  <br />
                  {printData.qc_sign} <br />
                  {formattedQCDate}
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <tr>
                <th colSpan="25">Particulars</th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
                <td colSpan="25"></td>
              </tr>
            </tfoot>
          </table>
        </main>
        <footer className="no-print" />
      </div>

      {/* print ended here */}
    </div>
  );
};

export default QualityControl_f03_Summary;
