import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import { Input, Button, Table, Select, message, Tooltip, Modal } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import axios from "axios";
import logo from "../Assests/logo.png";
const { Option } = Select;

const QualityControlF029Summary = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState(null); // New state for eqno
  const [reqNo, setReqNo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const [selectedPrintReqno, setSelectedPrintReqno] = useState(null);
  const [printData, setPrintData] = useState([]);
  const [reqNumbers, setReqNumbers] = useState([]); // State for unique eq_no values
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [getImage4, setGetImage4] = useState("");
  const [getImage5, setGetImage5] = useState("");
  const [getImage6, setGetImage6] = useState("");
  const [open, setOpen] = useState(false);

  // Function to fetch data from the API for reqno
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/chemicaltest/CLF029/print?`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "json",
          }
        );
        const data = response.data;
        console.log("data", data);
        // Extract and filter unique eq_no values
        const uniqueReqNos = Array.from(
          new Set(data.map((item) => item.requisitionNo))
        );
        console.log("uniqueEqNos,uniqueEqNos", uniqueReqNos);
        // Set the unique eq_no values in state
        setReqNumbers(uniqueReqNos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Call fetchData when the component mounts
    fetchData();
  }, []);

  // Function to fetch the API data
  // Function to fetch the API data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF029/summary`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );
      const data = response.data; // Assuming the data is an array of objects

      // Filter out the rows where qc_status is "QC_APPROVED" or "QA_APPROVED"
      const filteredData = data.filter(
        (item) =>
          item.qc_status !== "QC_APPROVED" && item.qc_status !== "QA_APPROVED"
      );

      // Map the filtered data to your table fields
      const formattedData = filteredData.map((item, index) => ({
        key: index + 1,
        requisitionNo: item.requisitionNo,
        department: item.department,
        chemist_status: item.chemist_status,
        ins_status: item.ins_status,
        qc_status_b: item.qc_status_b,
        develop_status: item.develop_status,
        hod_status: item.hod_status,
        qc_status: item.qc_status,
        reason: item.reason,
      }));

      // Check if any of the filtered data has rejected status
      const hasRejectedStatus = formattedData.some(
        (item) =>
          item.qc_status === "QC_REJECTED" || item.qc_status === "QA_REJECTED"
      );

      setShowReasonColumn(hasRejectedStatus);

      // Set the filtered and formatted data to the table's dataSource
      setDataSource(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const handleReqNoChange = (value) => {
    setReqNo(value); // Update state with selected value
  };

  const handleGoToChange = () => {
    // Check if any of the fields are empty
    if (!selectedDepartment || !reqNo) {
      message.error("Please fill in all fields.");
      return;
    }

    // Check if the requisitionNo and department match any object in the fetched data
    const matchedObject = dataSource.find(
      (item) =>
        item.requisitionNo === reqNo && item.department === selectedDepartment
    );

    // If the requisitionNo is found with the department, allow navigation
    if (matchedObject) {
      navigate("/precot/QualityControl/F-029", {
        state: {
          uniqueDepartment: selectedDepartment,
          uniqueReqNo: reqNo,
        },
      });
    } else {
      // Check if requisitionNo does not exist, but the department is valid
      const isReqNoNotFound = !dataSource.some(
        (item) => item.requisitionNo === reqNo
      );

      if (isReqNoNotFound) {
        navigate("/precot/QualityControl/F-029", {
          state: {
            uniqueDepartment: selectedDepartment,
            uniqueReqNo: reqNo,
          },
        });
      } else {
        message.error("Invalid RequisitionNo or Department.");
      }
    }
  };

  const handleEdit = (record) => {
    navigate("/precot/QualityControl/F-029", {
      state: {
        uniqueDepartment: record.department,
        uniqueReqNo: record.requisitionNo,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintLoading(false);
    setSelectedPrintReqno(null);
  };

  const printSubmit = () => {
    if (selectedPrintReqno) {
      fetchPrintData();
    } else {
      message.error("Please select a Requisition No field before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    // Join the query parameters to the base URL
    let finalUrl = `${API.prodUrl}/Precot/api/chemicaltest/CLF029/print?requis_num=${selectedPrintReqno}`;
    // Make the API call using axios
    const token = localStorage.getItem("token");
    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        console.log("Fetched data:", response.data);

        // Ensure that the response is an array, even if no data is found
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data[0]);
          setPrintLoading(true);

          //getImage1
          const username = response.data[0]?.qc_sign_b;
          console.log("username", username);
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

          // getimage2
          const username2 = response.data[0]?.develop_sign;
          console.log("username", username);
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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
              setGetImage2(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });

          // getimage3
          const username3 = response.data[0]?.hod_sign;
          console.log("username", username);
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username3}`,
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
              setGetImage3(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });

          // get image4
          const username4 = response.data[0]?.chemist_sign;
          console.log("username", username);
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username4}`,
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
              setGetImage4(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });

          // getimage5
          const username5 = response.data[0]?.ins_sign;
          console.log("username", username);
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username5}`,
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
              setGetImage5(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });

          // getimage6
          const username6 = response.data[0]?.qc_sign;
          console.log("username", username);
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${username6}`,
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
              setGetImage6(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);

          console.log("print data", response.data);
        } else {
          setPrintData([]); // Ensure printData is always an array
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose(); // Close modal if no details found
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let formattedQCBtDate;
  if (printData.qc_submit_on_b) {
    formattedQCBtDate = moment(printData.qc_submit_on_b).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCBtDate = ""; // Or any other default value or error handling
  }

  let formattedDevMngDate;
  if (printData.develop_submit_on) {
    console.log("develop_submit_on", printData.develop_submit_on);
    formattedDevMngDate = moment(printData.develop_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedDevMngDate = ""; // Or any other default value or error handling
  }

  let formattedHodDate;
  if (printData.hod_submit_on) {
    formattedHodDate = moment(printData.hod_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedHodDate = ""; // Or any other default value or error handling
  }

  let formattedOperatorDate;
  if (printData.chemist_submit_on) {
    formattedOperatorDate = moment(printData.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedOperatorDate = ""; // Or any other default value or error handling
  }

  let formattedQAInspectorDate;
  if (printData.ins_submit_on) {
    formattedQAInspectorDate = moment(printData.ins_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQAInspectorDate = ""; // Or any other default value or error handling
  }

  let formattedQCFinalDate;
  if (printData.qc_submit_on) {
    formattedQCFinalDate = moment(printData.qc_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCFinalDate = ""; // Or any other default value or error handling
  }

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Requisition No",
      dataIndex: "requisitionNo", // Mapping 'requisitionNo' from the API response
      key: "requisitionNo",
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department", // Mapping 'department' from the API response
      key: "department",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "chemist_status", // Mapping 'chemist_status' from the API response
      key: "chemist_status",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "ins_status", // Mapping 'ins_status' from the API response
      key: "ins_status",
      align: "center",
    },
    {
      title: "First Production Manager Status",
      dataIndex: "qc_status_b", // Mapping 'qc_status_b' from the API response
      key: "qc_status_b",
      align: "center",
    },
    {
      title: "Development Manager Status",
      dataIndex: "develop_status", // Mapping 'develop_status' from the API response
      key: "develop_status",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status", // Mapping 'hod_status' from the API response
      key: "hod_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "qc_status", // Mapping 'qc_status_b' from the API response
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
          // Add functionality to handle edit here
          onClick={() => handleEdit(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  let columns = [...baseColumns];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Requisition Sample Analysis Report"
        formatNo="PH-QCL01/F-029"
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

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "start",
        }}
      >
        <Select
          placeholder="Select Department."
          style={{ marginLeft: "0px", height: "28px" }}
          onChange={(value) => setSelectedDepartment(value)} // Set the selected equipment number
        >
          <Select.Option value="PAD PUNCHING">PAD PUNCHING</Select.Option>
          <Select.Option value="SPUNLACE">SPUNLACE</Select.Option>
          <Select.Option value="DRY GOODS">DRY GOODS</Select.Option>
          <Select.Option value="BLEACHING">BLEACHING</Select.Option>
          <Select.Option value="COTTON BUDS">COTTON BUDS</Select.Option>
        </Select>
        <Input
          style={{ width: "135px", height: "28px", marginLeft: "" }}
          value={reqNo} // Use state value
          onChange={(e) => handleReqNoChange(e.target.value)}
          // Update state on input change
          placeholder="Enter Requisition No."
        />
        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "10px",
            height: "28px",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "8px", textAlign: "start" }}>
            Select Requisition No:
          </label>
          <Select
            placeholder="Select Requisition.No."
            style={{ marginLeft: "0px", height: "28px", width: "150px" }}
            value={selectedPrintReqno || undefined} // Control the value with state
            onChange={(value) => setSelectedPrintReqno(value)} // Set the selected equipment number
          >
            {reqNumbers.map((reqNo) => (
              <Select.Option key={reqNo} value={reqNo}>
                {reqNo}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>

      <Table
        columns={baseColumns}
        dataSource={dataSource}
        rowKey="key" // Ensure each row has a unique key
      />

      {/*  */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: portrait;
          scale: 60%;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
          transform: scale(0.9);
        }

        body * {
          visibility: hidden;
        }

        #section-to-print, #section-to-print * {
          visibility: visible;
        }

        #section-to-print {
          page-break-after: always;
        }
        .page {
          page-break-after: always;
        }
      }
    `}
        </style>

        <div>
          {/* page 1 */}
          {/* table header */}
          <table
            className="f18table"
            style={{ height: "50%", marginTop: "2%" }}
          >
            <tbody>
              <tr>
                <td style={{ border: "none", padding: "60px" }}></td>
              </tr>
              <tr>
                <td
                  colSpan="10"
                  rowSpan="4"
                  style={{ textAlign: "center", height: "80px" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br /> Unit H
                </td>
                <td colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                  Requisition Sample Analysis Report
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Format No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  PH-QCL01/F-029
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Revision No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  01
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Ref. SOP No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  PH-QCL01-D-13
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Page No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  1 of 3
                </td>
              </tr>
            </tbody>
          </table>
          {/* fields */}
          <table style={{ marginTop: "2%" }}>
            <thead>
              <tr>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={5}>
                  Requisition No.: {printData.requisitionNo}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={6}>
                  Dispatch Date: {formatDate(printData.dispatchDate)}
                </td>
              </tr>
              <tr>
                <td colSpan={11} style={{ padding: "5px", textAlign: "start" }}>
                  Customer: {printData.customer}
                </td>
              </tr>
              <tr>
                <td colSpan={11} style={{ padding: "5px", textAlign: "start" }}>
                  Product Description: {printData.productDescription}
                </td>
              </tr>
              <tr>
                <td colSpan={11} style={{ padding: "5px", textAlign: "start" }}>
                  Mixing: {printData.mixing}
                </td>
              </tr>
              <tr>
                <td colSpan={11} style={{ padding: "5px", textAlign: "start" }}>
                  Bag Type: {printData.bagType}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={11}
                  style={{ padding: "5px", textAlign: "center" }}
                >
                  PRODUCT SPECIFICATION (PAD PUNCHING/SPUNLACE/DRY GOODS)
                </td>
              </tr>
              {/* table cloumn row */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  S.No.
                </td>
                <td
                  style={{ padding: "5px", textAlign: "start" }}
                  colSpan="2"
                  rowSpan={2}
                >
                  Parameter
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  Specification
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  Limit
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  Max.
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  Min.
                </td>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  colSpan={3}
                  rowSpan={1}
                >
                  Observation
                </td>

                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  Avg
                </td>
              </tr>
              <tr>
                <td rowSpan={1} style={{ padding: "5px", textAlign: "center" }}>
                  1
                </td>
                <td rowSpan={1} style={{ padding: "5px", textAlign: "center" }}>
                  2
                </td>
                <td rowSpan={1} style={{ padding: "5px", textAlign: "center" }}>
                  3
                </td>
              </tr>
            </thead>
            <tbody>
              {/* PRODUCT SPECIFICATION (PAD PUNCHING/SPUNLACE/DRY GOODS) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>1</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Pattern
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.pattern || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <span style={{ fontSize: "20px" }}>-</span>
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="6">
                  {printData.pattern_a || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>2</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Edge
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.edge || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <span style={{ fontSize: "20px" }}>-</span>
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="6">
                  {printData.edge_a || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>3</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  GSM / GPM- g/m
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gsmGpm || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gsmGpm_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gsmGpm_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gsmGpm_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gsmGpm_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gsmGpm_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gsmGpm_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>4</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Thickness (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.thickness || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±0.2</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.thickness_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.thickness_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.thickness_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.thickness_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.thickness_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.thickness_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>5</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Single Pad / Ball /Pleat/ Wool Roll/Roll Goods - Weight (g)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.padWeight || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.padWeight_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.padWeight_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.padWeight_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.padWeight_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.padWeight_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.padWeight_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan="3">
                  6
                </td>
                <td
                  style={{ padding: "5px", textAlign: "start" }}
                  rowSpan="3"
                  colSpan={1}
                >
                  Dimension (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  Length
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionLength || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionLength_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionLength_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionLength_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionLength_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionLength_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionLength_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  Width
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionWidth || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionWidth_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionWidth_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionWidth_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionWidth_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionWidth_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionWidth_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  Height
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionHeight || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionHeight_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionHeight_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionHeight_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionHeight_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionHeight_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.dimensionHeight_avg || "NA"}
                </td>
              </tr>

              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>7</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Diameter (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.diameter || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.diameter_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.diameter_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.diameter_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.diameter_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.diameter_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.diameter_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>8</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Moisture (%)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.moisture || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±0.5</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.moisture_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.moisture_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.moisture_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.moisture_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.moisture_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.moisture_avg || "NA"}
                </td>
              </tr>
            </tbody>
          </table>
          {/* table footer */}
          <table style={{ marginTop: "2%" }}>
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
          </table>

          {/* page 2 */}
          {/* table headder */}
          <table
            className="f18table"
            style={{ height: "50%", marginTop: "80%" }}
          >
            <tbody>
              <tr>
                <td style={{ border: "none", padding: "60px" }}></td>
              </tr>
              <tr>
                <td
                  colSpan="10"
                  rowSpan="4"
                  style={{ textAlign: "center", height: "80px" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br /> Unit H
                </td>
                <td colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                  Requisition Sample Analysis Report
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Format No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  PH-QCL01/F-029
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Revision No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  01
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Ref. SOP No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  PH-QCL01-D-13
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Page No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  2 of 3
                </td>
              </tr>
            </tbody>
          </table>
          {/* tests data fields */}
          <table style={{ marginTop: "2%" }}>
            <thead>
              <tr>
                <td rowSpan={2} style={{ padding: "5px", textAlign: "start" }}>
                  S.No.
                </td>
                <td rowSpan={2} style={{ padding: "5px", textAlign: "start" }}>
                  TESTS
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  STD
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  Limit
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  MAX
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  MIN
                </td>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  colSpan={3}
                  rowSpan={1}
                >
                  Observation
                </td>

                <td style={{ padding: "5px", textAlign: "start" }} rowSpan={2}>
                  Avg
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>1</td>
                <td style={{ padding: "5px", textAlign: "center" }}>2</td>
                <td style={{ padding: "5px", textAlign: "center" }}>3</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>1</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Count Per Pack (No's)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.countPerPack || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>-0,± 2</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.countPerPack_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.countPerPack_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.countPerPack_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.countPerPack_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.countPerPack_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.countPerPack_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>2</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/Pack Gross Weight (gm)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packGrossWeight || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packGrossWeight_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packGrossWeight_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packGrossWeight_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packGrossWeight_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packGrossWeight_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packGrossWeight_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>3</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/ Pack filling height (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packFillingHeight || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packFillingHeight_a || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packFillingHeight_b || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packFillingHeight_c || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packFillingHeight_d || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packFillingHeight_e || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packFillingHeight_avg || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>4</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/Pack type
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="8">
                  {printData.packType || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>5</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/Pack dimensions (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>Length</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packDimensionsLength || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>Width</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packDimensionsWidth || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  Gusset/Height
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.gussetHeight || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  Micron /thickness
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.packMicronThickness || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>6</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Over all Appearance
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="8">
                  {printData.overallAppearance || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>7</td>
                <td style={{ padding: "5px", textAlign: "start" }}>CD/MD</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="8">
                  {printData.cdMd || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>8</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Sample Collected From
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="8">
                  {printData.sampleCollectedFrom || "NA"}
                </td>
              </tr>
              {/* AB - Cotton (Bleaching) Results */}
              <tr>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  colSpan={11}
                >
                  AB - Cotton (Bleaching) Results
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>9</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Batch No.
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.batchNo || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>15</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Mixing</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.mixing_b || "NA"}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    width: "60px",
                  }}
                >
                  21
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>Finish</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.finish || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>10</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Absorbency (g/g)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.absorbency || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>16</td>
                <td style={{ padding: "5px", textAlign: "start" }}>L(n) mm</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.ln_mm || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>22</td>
                <td style={{ padding: "5px", textAlign: "start" }}>WSS(%)</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.wss || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>11</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Sinking (Sec)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.sinkingTime || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>17</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Micronaire value (µg/inch)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.micron_value || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>23</td>
                <td style={{ padding: "5px", textAlign: "start" }}>ESS(%)</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.ess || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>12</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Whiteness Index
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.whitenessIndex || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>18</td>
                <td style={{ padding: "5px", textAlign: "start" }}>pH</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.ph || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>24</td>
                <td style={{ padding: "5px", textAlign: "start" }}>S.A</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.sa || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>13</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  UQL(w) mm
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.uql_mm || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>19</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Ash Content %
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.ashContent || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>25</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Neps/gm</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.nepsPerGm || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>14</td>
                <td style={{ padding: "5px", textAlign: "start" }}>L(w) mm</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.lw_mm || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>20</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Fluorescence
                </td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.fluorence || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>26</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Odor</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  {printData.odr || "NA"}
                </td>
              </tr>
            </tbody>
          </table>
          {/* table footer */}
          <table style={{ marginTop: "2%" }}>
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
          </table>

          {/* page 3 */}
          {/* table header */}
          <table
            className="f18table"
            style={{ height: "50%", marginTop: "80%" }}
          >
            <tbody>
              <tr>
                <td style={{ border: "none", padding: "60px" }}></td>
              </tr>
              <tr>
                <td
                  colSpan="10"
                  rowSpan="4"
                  style={{ textAlign: "center", height: "80px" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br /> Unit H
                </td>
                <td colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                  Requisition Sample Analysis Report
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Format No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  PH-QCL01/F-029
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Revision No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  01
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Ref. SOP No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  PH-QCL01-D-13
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Page No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  3 of 3
                </td>
              </tr>
            </tbody>
          </table>

          {/* data showing fields */}
          <table style={{ marginTop: "2%" }}>
            <tbody>
              <tr>
                <td
                  colSpan={11}
                  style={{ padding: "5px", textAlign: "center" }}
                >
                  Cotton Buds Parameters
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  27
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Bud Type
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "start",
                    width: "300px",
                  }}
                  colSpan={2}
                >
                  {printData.budType || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  28
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "start",
                    width: "350px",
                  }}
                  colSpan={2}
                >
                  Stick Made from
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "start",
                    width: "300px",
                  }}
                  colSpan={2}
                >
                  {printData.stickMaterial || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  29
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Stick Diameter (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.stickDiameter || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  30
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Stick Colour
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.stickColor || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  31
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Stick Length (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.stickLength || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  32
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Bud Shape
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.budShape || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  33
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Buds Full length (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.budFullLength || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  34
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Cotton Length (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.cottonLength || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  35
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Single Bud Weight (g)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.singleBudWeight || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  36
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Bud Diameter (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.budDiameter || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  37
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Packaging Type
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.packagingType || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  38
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Packaging made from
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.packagingMaterial || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  39
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Packaging Width (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.packagingWidth || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  40
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Packaging length (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.packagingLength || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  41
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Packaging Height (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.packagingHeight || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  42
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Packaging gross weight (g)
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.packagingGrossWeight || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  43
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={3}>
                  Moisture%
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.finalmoisture || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  44
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  Stick Strength
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan={2}>
                  {printData.stickStrength || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan={11} style={{ padding: "5px", textAlign: "start" }}>
                  Remarks: {printData.remarks || "NA"}
                </td>
              </tr>

              {/* fisrt production */}
              <tr>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  colSpan={11}
                >
                  For 1st production samples verification
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  rowSpan={1}
                  colSpan="4"
                >
                  Approved sample request No.
                </td>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  rowSpan={2}
                  colSpan="4"
                >
                  Verified by (Respective In Charge)
                </td>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  rowSpan={1}
                  colSpan="1"
                >
                  QC/QA
                </td>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  rowSpan={1}
                  colSpan="1"
                >
                  Development
                </td>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  rowSpan={1}
                  colSpan="1"
                >
                  Production
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  rowSpan={1}
                  colSpan="4"
                >
                  {printData.sample_requistion || "NA"}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {getImage1 && (
                    <img className="signature" src={getImage1} alt="Operator" />
                  )}
                  <br />
                  {printData && printData?.qc_sign_b}
                  <br />
                  {formattedQCBtDate}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {getImage2 && (
                    <img className="signature" src={getImage2} alt="Operator" />
                  )}
                  <br />
                  {printData && printData?.develop_sign}
                  <br />
                  {formattedDevMngDate}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {getImage3 && (
                    <img className="signature" src={getImage3} alt="Operator" />
                  )}
                  <br />
                  {printData && printData?.hod_sign}
                  <br />
                  {formattedHodDate}
                </td>
              </tr>
              <tr>
                <td colSpan={11} style={{ padding: "5px", textAlign: "start" }}>
                  Remark: {printData.remark_a || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "center" }}>
                  Prepared by
                </td>
                <td colSpan="4" style={{ padding: "5px", textAlign: "center" }}>
                  Inspected by
                </td>
                <td colSpan="4" style={{ padding: "5px", textAlign: "center" }}>
                  Manager (QC/QA)
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "center" }}>
                  {getImage4 && (
                    <img className="signature" src={getImage4} alt="Operator" />
                  )}
                  <br />
                  {printData && printData.chemist_sign}
                  <br />
                  {formattedOperatorDate}
                </td>
                <td colSpan="4" style={{ padding: "5px", textAlign: "center" }}>
                  {getImage5 && (
                    <img className="signature" src={getImage5} alt="Operator" />
                  )}
                  <br />
                  {printData && printData.ins_sign}
                  <br />
                  {formattedQAInspectorDate}
                </td>
                <td colSpan="4" style={{ padding: "5px", textAlign: "center" }}>
                  {getImage6 && (
                    <img
                      className="signature"
                      src={getImage6}
                      alt="Superviosr Sign"
                    />
                  )}
                  <br />

                  {printData && printData.qc_submit_by}
                  <br />
                  {formattedQCFinalDate}
                </td>
              </tr>
            </tbody>
          </table>

          {/* table footer */}
          <table style={{ marginTop: "2%" }}>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default QualityControlF029Summary;
