import {
  EditOutlined
} from "@ant-design/icons";
import { Button, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";

const { Option } = Select;

const QCLARF05Summary = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBMRValue, setSelectedBMRValue] = useState(null);
  const [selectedPrintBMRValue, setSelectedPrintBMRValue] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [bmrData, setBmrData] = useState([]);
  const roleauth = localStorage.getItem("role");
  const [printData, setPrintData] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const [qaInspectorImages, setQaInspectorImages] = useState([]);
  const [qaMngImages, setQaMngImages] = useState([]);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [showReasonColumn, setShowReasonColumn] = useState(false);

  // Fetch images for QA and Manager
  useEffect(() => {
    const fetchImages = async () => {
      const inspectorPromises = printData.map((item) => {
        if (item.qa_inspector_sign) {
          return axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${item.qa_inspector_sign}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
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
              return `data:image/jpeg;base64,${base64}`;
            })
            .catch(() => null); // Handle errors for individual image requests
        }
        return Promise.resolve(null);
      });

      const mngPromises = printData.map((item) => {
        if (item.qa_mng_sign) {
          return axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${item.qa_mng_sign}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
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
              return `data:image/jpeg;base64,${base64}`;
            })
            .catch(() => null);
        }
        return Promise.resolve(null);
      });

      const inspectorImages = await Promise.all(inspectorPromises);
      const mngImages = await Promise.all(mngPromises);

      setQaInspectorImages(inspectorImages);
      setQaMngImages(mngImages);
    };

    fetchImages();
  }, [printData, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBMRNumbers = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spulance/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        );
        setBmrData(response.data); // Update state with fetched BMR numbers
      } catch (error) {
        console.error("Error fetching BMR numbers:", error);
        message.error("Failed to load BMR numbers.");
      }
    };
    fetchBMRNumbers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        let apiUrl = "";
        if (roleauth === "ROLE_QA") {
          apiUrl = `${API.prodUrl}/Precot/api/chemicaltest/ARF005/approveList`;
        } else if (roleauth === "QA_MANAGER") {
          apiUrl = `${API.prodUrl}/Precot/api/chemicaltest/ARF005/getAll`;
        }

        if (apiUrl) {
          const response = await axios.get(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          });
          let snoCounter = 1;
          const transformedData = response.data.map((item) => {
            const firstLine = item.line1?.[0] || {};
            return {
              Sno: snoCounter++,
              bmr_no: item.bmr_no || "N/A",

              product_name: firstLine.product_name || "N/A",
              qa_inspector_status: item.qa_inspector_status || "N/A",
              qa_mng_status: item.qa_mng_status || "N/A",
              reason: item.reason || "N/A",
            };
          });

          setTableData(transformedData);

          const hasRejectedStatus = transformedData.some(
            (item) => item.qa_mng_status === "QA_MANAGER_REJECTED"
          );
          setShowReasonColumn(hasRejectedStatus);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleGoToChange = () => {
    if (selectedBMRValue) {
      navigate("/Precot/QualityControl/AR_F-005", {
        state: { BMR_No: selectedBMRValue },
      });
    } else {
      // Handle the case where year or month is not selected
      message.error("Please Select a BMR No.");
    }
  };

  const handleEdit = (record) => {
    if (record.bmr_no) {
      navigate("/Precot/QualityControl/AR_F-005", {
        state: { BMR_No: record.bmr_no }, // Pass bmr_no as BMR_No in state
      });
    } else {
      message.error("BMR No is not available.");
    }
  };

  // Function to handle when the select value changes
  const handleBMRSelectChange = (value) => {
    setSelectedBMRValue(value);
  };

  const handlePrintBMRSelectChange = (value) => {
    setSelectedPrintBMRValue(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintBMRValue(null);
  };

  const printSubmit = () => {
    if (selectedPrintBMRValue) {
      fetchPrintData();
    } else {
      message.error("Please select a BMR.NO field before printing.");
      handleModalClose();
    }
  };

  // Fetch Print Data from API
  const fetchPrintData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/chemicaltest/ARF005/print/${selectedPrintBMRValue}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );

      if (response.data && response.data.length > 0) {
        setPrintData(response.data);
        setPrintLoading(true);

        setTimeout(() => {
          window.print(); // Proceed with printing
          handleModalClose(); // Close the modal after printing
        }, 3000);
      } else {
        setPrintData([]); // Ensure printData is always an array
        setPrintLoading(false);
        message.error("No details found for the selected form. Cannot print.");
        handleModalClose(); // Close modal if no details found
      }
    } catch (error) {
      setPrintLoading(false);
      console.error("Error fetching print data:", error);
      message.error("An error occurred while fetching the print data.");
    }
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "Sno",
      key: "Sno",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "BMRNo",
      dataIndex: "bmr_no",
      key: "bmr_no",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "qa_mng_status",
      key: "qa_mng_status",
      align: "center",
    },
    ...(showReasonColumn
      ? [
        {
          title: "Reason",
          dataIndex: "reason",
          key: "reason",
          align: "center",
        },
      ]
      : []),
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          style={{ width: "100%" }}
          onClick={() => handleEdit(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Non-Woven Fleece Analysis Report"
        formatNo="PH-QCL01-AR-F-005"
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
              if (window.confirm("Are you sure want to logout")) {
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
        <Select
          style={{ width: "200px", margin: "20px 0px 20px 20px" }}
          placeholder="Select BMR No."
          showSearch
          onChange={handleBMRSelectChange} // Update state on change
          value={selectedBMRValue} // Set the value from state
        >
          {bmrData.map((bmr) => (
            <Option key={bmr.id} value={bmr.value}>
              {bmr.value}
            </Option>
          ))}
        </Select>

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "20px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>

      <Table columns={baseColumns} dataSource={tableData} rowKey="Sno" />

      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
            loading={printLoading}
          >
            Submit
          </Button>,
        ]}
      >
        Select BMR No:
        <Select
          style={{
            width: "200px",
            margin: "20px 0px 20px 20px",
            color: "black",
          }}
          placeholder="Select Print BMR No."
          showSearch
          onChange={handlePrintBMRSelectChange} // Update state on change
          value={selectedPrintBMRValue} // Set the value from state
        >
          {bmrData.map((bmr) => (
            <Option key={bmr.id} value={bmr.value}>
              {bmr.value}
            </Option>
          ))}
        </Select>
      </Modal>


      <div
        id="section-to-print"
        style={{
          fontFamily: "sans-serif",
          scale: "97%",
        }}
      >
        <style>
          {`
      @media print {
        @page {
          size: landscape;
          margin: 0;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
          transform: scale(0.9);
          transform-origin: top left right bottom;
        }
        .page {
          page-break-after: always;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .page:last-child {
          page-break-after: auto;
        }
      }
    `}
        </style>

        {(() => {
          const entriesPerPage = 4;
          const allLineItems = printData.flatMap((item) => item.line1 || []);
          const totalPages = Math.ceil(allLineItems.length / entriesPerPage);

          // Split the data into pages
          const pages = Array.from({ length: totalPages }, (_, i) =>
            allLineItems.slice(i * entriesPerPage, (i + 1) * entriesPerPage)
          );

          return pages.map((pageData, pageIndex) => (
            <div className="page" key={pageIndex}>
              {/* Header Section - Same for all pages */}
              <table
                className="f18table"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <tbody>
                  <tr>
                    <th
                      colSpan="10"
                      rowSpan="4"
                      style={{ textAlign: "center", height: "80px" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <br></br>
                      Unit H
                    </th>

                    <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                      Non-Woven Fleece Analysis Report
                    </th>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01-AR-F-005
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Revision No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      03
                    </td>
                  </tr>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Ref. SOP No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    PH-QCL01-D-05
                  </td>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Page NO.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {`${pageIndex + 1} of ${totalPages}`}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Main Content Table */}
              <div style={{ flex: 1 }}>
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr key="">
                      <td
                        rowSpan="2"
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                      >
                        S.No.
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Analysis .Reference Number
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Spunlace BMR No.
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                          width: "100px",
                        }}
                        rowSpan="2"
                      >
                        Date / Shift
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Product Name
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Shaft No.
                      </td>
                      <td
                        style={{
                          width: "50px",
                          height: "100px",
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        colSpan="2"
                      >
                        Jetlace <br />
                        Parameters
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Mixing
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        GSM
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Pattern
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                        colSpan="2"
                      >
                        Moisture
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Thickness (mm)
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                          width: "100px",
                        }}
                        rowSpan="2"
                      >
                        Strength in Cross Direction (CD) (N)
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                          width: "100px",
                        }}
                        rowSpan="2"
                      >
                        Strength in Machine Direction (MD) (N)
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                          fontSize: "30px",
                        }}
                        rowSpan="2"
                      >
                        Friction (N)
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Appearance
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Tested By (QA)
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                        rowSpan="2"
                      >
                        Approved By
                      </td>
                    </tr>

                    <tr key="">
                      <td
                        style={{
                          width: "10px",
                          height: "100px",
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                      >
                        Pressure
                      </td>
                      <td
                        style={{
                          width: "20px",
                          height: "100px",
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                      >
                        Text
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                      >
                        Mahlo (%)
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          transform: "rotate(270deg)",
                        }}
                      >
                        Probe (%)
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    {pageData.map((item, index) => {
                      const overallIndex = pageIndex * entriesPerPage + index + 1;
                      const formattedQAINSDate = item.qa_inspector_submit_on
                        ? moment(item.qa_inspector_submit_on).format("DD/MM/YYYY HH:mm")
                        : "";

                      const formattedQAMNGDate = item.qa_mng_submit_on
                        ? moment(item.qa_mng_submit_on).format("DD/MM/YYYY HH:mm")
                        : "";

                      return (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {overallIndex}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.analysis_request_number}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.bmr_no || printData[0]?.bmr_no}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {formatDate(item.date)} / {item.shift}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.product_name}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.shaft_no}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.jetlace_parameters_pressure}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.jetlace_parameters_text}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.mixing}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.gsm}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.pattern}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.moisture_mahlo}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.moisture_phobe}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.thickness}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.strength_cross_direction}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.strength_machine_direction}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.friction}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {item.appearance}
                          </td>
                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {qaInspectorImages[index] && (
                              <img
                                src={qaInspectorImages[index]}
                                alt="QA Inspector Sign"
                                width="50"
                              />
                            )}
                            <br />
                            {item.qa_inspector_sign || printData[0]?.qa_inspector_sign} <br />
                            {formattedQAINSDate}
                          </td>

                          <td
                            style={{
                              padding: "50px 20px 50px 20px",
                              textAlign: "center",
                              transform: "rotate(270deg)",
                            }}
                          >
                            {qaMngImages[index] && (
                              <img
                                src={qaMngImages[index]}
                                alt="QA Manager Sign"
                                width="50"
                              />
                            )}
                            <br />
                            {item.qa_mng_sign || printData[0]?.qa_mng_sign} <br />
                            {formattedQAMNGDate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer Section - Same for all pages */}
              <table style={{ width: "100%", marginTop: "auto" }}>
                <tbody>
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                    >
                      Particulars
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Prepared by
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Reviewed by
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Approved by
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                    >
                      Name
                    </td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                    >
                      Signature & Date
                    </td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ));
        })()}
      </div>
    </>
  );
};

export default QCLARF05Summary;
