import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QA_f029_new_sample_request_summary = () => {
  const [loading, setLoading] = useState();
  const [reason, setReason] = useState(false);
  const [summary, setSummary] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedprintReq, setReq] = useState(null); // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [selectedPrintDate, setSelectedPrintDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    eqNo: "", // Default empty value for equipment number
    date: "", // Default empty value for date
  });
  const [ReqNumber, setReqNumbers] = useState([]);
  // State for unique eq_no values

  const [showModal, setShowModal] = useState(false);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };
  // Generate year options from current year to previous 20 years
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleCreate = () => {
    navigate("/Precot/Bleaching/F-13");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setShowModal(true);
  };

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const handleGoToChange = () => {
    // Check if no fields are selected

    if (!selectedDate) {
      message.error("Please select a Date.");
      return;
    }

    if (selectedDate) {
      navigate("/Precot/QualityAssurance/F-029/QA_f029_new_sample_request", {
        state: {
          uniqueDate: selectedDate,
        },
      });
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityAssurance/F-029/QA_f029_new_sample_request", {
      state: {
        uniqueDate: record.date,
        uniqueReq: record.requisitionNo,
      },
    });
  };

  useEffect(() => {
    axios
      .get(`${API.prodUrl}/Precot/api/QA/CL01/GETALL`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedData = response.data;
        setSummary(fetchedData);

        const hasReasonField = fetchedData.some((item) => item.reason);
        setReason(hasReasonField);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1, // Auto-increment S.No.
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },

    {
      title: "Mark Rep Status",
      dataIndex: "mark_rep_status",
      key: "mark_rep_status",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "QC Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Mark Rep Status B",
      dataIndex: "mark_rep_status_b",
      key: "mark_rep_status_b",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          style={{ width: "100%" }}
        >
          Review
        </Button>
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
  if (reason) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  }

  const handlePrintDateChange = (event) => {
    setSelectedPrintDate(event.target.value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

  const printSubmit = () => {
    fetchPrintData();
  };

  const fetchPrintData = () => {
    try {
      axios
        .get(` ${API.prodUrl}/Precot/api/QA/CL01/print`, {
          params: {
            requis_no: selectedprintReq,
            year: selectedPrintYear,
            month: selectedPrintMonth,
            date: selectedPrintDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setPrintResponseData(res.data);

            setTimeout(() => {
              window.print();
              handleModalClose();
            }, 3000);
          } else {
            setPrintResponseData([]);
            message.error(res.data.message || "No data available");
            handleModalClose();
          }
        })
        .catch((err) => {
          message.error("Failed to fetch print data. Please try again.");
        });
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/CL01/print`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "json",
          }
        );
        const data = response.data;

        // Extract and filter unique eq_no values
        const requisitionNo = Array.from(
          new Set(data.map((item) => item.requisitionNo))
        );

        // Set the unique eq_no values in state
        setReqNumbers(requisitionNo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPrintDate(null);
    setReq(null);
    setSelectedPrintYear(null);
    setSelectedPrintMonth(null);
  };

  return (
    <>
      <div id="section-to-print">
        <style>
          {`
    @media print {
      @page {
        size: potrait;
        margin: 8mm; /* Add uniform margins to the printed page */
      }

      body {
        -webkit-print-color-adjust: exact;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      #section-to-print {
        width: 100%;
        margin: 0 auto; /* Centers content horizontally */
        padding-left: 5mm; /* Adjust this value if needed */
        padding-right: 5mm; /* Ensure some balance for print alignment */
        page-break-after: always,
         tableLayout: "fixed";
      }

      table {
        width: 100%;
        margin: auto;
      }
    }
  `}
        </style>

        {printResponseData.map((data, index) => {
          return (
            <div className="page" key={index}>
              <table>
                <thead>
                  <tr>
                    <td
                      colSpan="5"
                      rowSpan="4"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                        textAlign: "center",
                      }}
                    >
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
                    </td>
                    <td
                      colSpan="15"
                      rowSpan="4"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      NEW SAMPLE REQUEST
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Format No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      PH-QCL01-F-029
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Revision No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      01
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Ref. SOP No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      PH-QCL01-D-16
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      Page No.:
                    </td>
                    <td
                      colSpan="5"
                      style={{
                        fontSize: "12pt",
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      {index + 1} of {printResponseData.length}
                    </td>
                  </tr>
                </thead>
                <br />
                <tbody>
                  <tr>
                    <td colSpan="15">Date</td>
                    <td colSpan="15">{data?.date || ""}</td>{" "}
                  </tr>
                  <tr>
                    <td colSpan="15">Requisition No.</td>
                    <td colSpan="15">{data?.requisitionNo || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Sample requisition posted by</td>
                    <td colSpan="15">{data?.postedBy || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Remarks by unit</td>
                    <td colSpan="15">{data?.unitRemarks || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Dispatch Date</td>
                    <td colSpan="15">{data?.dispatchDate || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Customer Name</td>
                    <td colSpan="15">{data?.customerName || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Product type</td>
                    <td colSpan="15">{data?.productType || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Types of Raw Material</td>
                    <td colSpan="15">{data?.rawMaterialType || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Raw Material certificate if any</td>
                    <td colSpan="15">{data?.rawMaterialCertificate || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Shape</td>
                    <td colSpan="15">{data?.shape || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">
                      Width and Length
                      <br />
                      (Applicable for Pleat, Wool roll & Roll goods)
                    </td>
                    <td colSpan="15">{data?.widthLength || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">GSM</td>
                    <td colSpan="15">{data?.gsm || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Pattern</td>
                    <td colSpan="15">{data?.pattern || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Edge</td>
                    <td colSpan="15">{data?.edge || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">No. of Pieces/bag</td>
                    <td colSpan="15">{data?.piecesPerBag || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Bag type</td>
                    <td colSpan="15">{data?.bagType || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">No of packs required</td>
                    <td colSpan="15">{data?.packsRequired || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Sample weight</td>
                    <td colSpan="15">{data?.sampleWeight || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Collect by:</td>
                    <td colSpan="15">{data?.collectedBy || ""}</td>
                  </tr>

                  <br />
                  <tr>
                    <td colSpan="15">Sale order No.</td>
                    <td colSpan="15">{data?.saleOrderNo || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Reference Image</td>
                    <td colSpan="15">
                      {" "}
                      {data?.referenceImage ? (
                        <>referenceImage uploaded. see below</>
                      ) : (
                        <>N/A</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="15">Sample Reference No.</td>
                    <td colSpan="15">{data?.sampleReferenceNo || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Sample Prepared by</td>
                    <td colSpan="15">{data?.samplePreparedBy || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Sample Approved by</td>
                    <td colSpan="15">{data?.sampleApprovedBy || ""}</td>
                  </tr>

                  <br />

                  <tr>
                    <td colSpan="15">Sample received by at CO office</td>
                    <td colSpan="15">
                      {data?.sampleReceivedByAtCoOffice || ""}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="15">Comments</td>
                    <td colSpan="15">{data?.comments || ""}</td>
                  </tr>
                  <tr>
                    <td colSpan="15">Status</td>
                    <td colSpan="15">{data?.status || ""}</td>
                  </tr>
                </tbody>
                <br />
                <br />
                <tfoot>
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Particulars
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Prepared by
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Reviewed by
                    </td>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Approved by
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Name
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="8" style={{ textAlign: "center" }}></td>
                  </tr>
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Signature & Date
                    </td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="7" style={{ textAlign: "center" }}></td>
                    <td colSpan="8" style={{ textAlign: "center" }}></td>
                  </tr>
                </tfoot>
              </table>

              <img
                src={`data:image/png;base64,${data?.referenceImage}`}
                alt="Reference Preview"
                style={{
                  width: "800px",
                  height: "600px",
                  marginTop: "10px",
                }}
              />
            </div>
          );
        })}
      </div>
      <BleachingHeader
        unit="Unit-H"
        formName="NEW SAMPLE REQUEST"
        formatNo="PH-QCL01-F-029"
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
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
        <Input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          size="small"
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ fontWeight: "bold", width: "135px" }}
          max={getCurrentDate()}
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

      <Table
        bordered
        loading={loading}
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={summary}
        rowKey="test_id" // Assuming test_id is unique for each row
      />

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
            Select Requisition No.:
          </label>
          <Select
            placeholder="Select Requistion No."
            style={{ marginLeft: "0px", height: "28px" }}
            value={selectedprintReq || undefined} // Control the value with state
            onChange={(value) => setReq(value)} // Set the selected lot number
          >
            {(ReqNumber || []).map((ReqNumber) => (
              <Select.Option key={ReqNumber} value={ReqNumber}>
                {ReqNumber}
              </Select.Option>
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
          <label style={{ marginRight: "8px", textAlign: "start" }}>
            Select Year:
          </label>
          <Select
            style={{ width: "135px", height: "28px", color: "black" }}
            value={selectedPrintYear}
            onChange={handlePrintYearChange}
            placeholder="Select Year"
          >
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
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
          <label style={{ marginRight: "8px", textAlign: "start" }}>
            Select Month:
          </label>
          <Select
            style={{
              width: "135px",
              height: "28px",
              color: "black",
              marginLeft: "",
            }}
            value={selectedPrintMonth}
            placeholder="Select Month"
            onChange={handlePrintMonthChange}
          >
            {months.map((month) => (
              <Select.Option key={month.value} value={month.value}>
                {month.label}
              </Select.Option>
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
          <label style={{ marginRight: "8px", textAlign: "start" }}>
            Select Date:
          </label>
          <Input
            placeholder="Date"
            type="date"
            size="small"
            format="DD/MM/YYYY"
            value={selectedPrintDate}
            onChange={handlePrintDateChange}
            style={{ fontWeight: "", width: "135px", marginLeft: "" }}
            max={getCurrentDate()}
          />
        </div>
      </Modal>
    </>
  );
};

export default QA_f029_new_sample_request_summary;
