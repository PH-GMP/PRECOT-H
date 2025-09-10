import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import API from "../baseUrl.json";

const QA_f076_training_session_register_summary = () => {
  const navigate = useNavigate();
  const [department_list, setdepartment_list] = useState([]);

  const [selectedDep, setSelectedDepartment] = useState("");
  // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "", // Default empty value for date
  });
  const { getDepartmentName } = useLocation().state || {}
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState([]);
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [selectedPrintDepart, setSelectedPrintDepart] = useState(null);

  const token = localStorage.getItem("token");
  const [summary, setSummary] = useState([]); // State for the summary data
  const [loading, setLoading] = useState(false);
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
    return `${day}-${month}-${year}`;
  };
  const today = new Date().toISOString().split("T")[0];


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
  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };
  const handlePrintMonthChange = (e) => {
    if (e) {
      setSelectedPrintMonth(e);
    }
  };
  const handlePrintDepartChange = (e) => {
    if (e) {
      setSelectedPrintDepart(e);
    }
  };


  useEffect(() => {

    fetchDataCCRNO();

  }, [])

  const departmentMap = {
    1: "BLEACHING",
    2: "SPUNLACE",
    3: "PAD_PUNCHING",
    4: "DRY_GOODS",
    5: "QUALITY_CONTROL",
    6: "QUALITY_ASSURANCE",
    7: "PPC",
    8: "STORE",
    9: "DISPATCH",
    10: "PRODUCT_DEVELOPMENT",
    11: "ENGINEERING",
    12: "COTTEN_BUDS",
    13: "MARKETING",
  };

  useEffect(() => {
    setLoading(true);

    const storedIds = localStorage.getItem("departmentId");

    const getDepartmentName = storedIds
      ?.split(",")
      .map((id) => departmentMap[parseInt(id)])
      .filter(Boolean)
      .join(",");

    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/TrainingSessionAllotmentRegister/Summary`,
        {
          params: { department: getDepartmentName },
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSummary(response.data); // Set the summary data
      })
      .catch((error) => {
        console.error("Error fetching training session data:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading indicator
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
      title: "Department Name",
      dataIndex: "department",
      key: "department",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "HOD Status",
      dataIndex: "hodStatus",
      key: "hodStatus",
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
  let columns = [...baseColumns];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };


  const printSubmit = () => {
    if (!selectedPrintDepart) {
      message.error("Department are mandatory");
      return;
    }
    fetchPrintData();
  };

  const fetchPrintData = () => {
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingSessionAllotmentRegister/Print?month=${selectedPrintMonth}&year=${selectedPrintYear}&department=${selectedPrintDepart}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
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

  const fetchDataCCRNO = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.length > 0) {
            const data = res.data?.map((item) => {
              return {
                label: item.department,
                value: item.department,
                id: item.id
              }
            })
            setdepartment_list(data)
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToChange = () => {

    // Get departmentId list from localStorage and convert to array of numbers
    const departmentIdListString = localStorage.getItem("departmentId");
    const departmentIdList = departmentIdListString
      ?.split(",")
      .map((id) => parseInt(id.trim()));

    console.log("departmentIdList", departmentIdList)

    // Check if selected department id is in the list
    if (!departmentIdList?.includes(selectedDep.id)) {
      message.warning("Selected department is not in your department list");
      return;
    }


    if (!selectedDate) {
      message.error("Please select a Date.");
      return;
    }
    if (!selectedDep) {
      message.error("Please select a Department.");
      return;
    }
    console.log("selectedDep.value selectedDate, ", selectedDate, selectedDep.value)
    if (selectedDate) {
      navigate(
        "/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register",
        {
          state: {
            uniqueDate: selectedDate,
            uniqueDep: selectedDep.value,
          },
        }
      );
    }
  };

  const handleEdit = (record) => {
    navigate(
      "/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register",
      {
        state: {
          uniqueDate: record.date,
          uniqueDep: record.department,
        },
      }
    );
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
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPrintYear(null);
    setSelectedPrintDepart(null);
    setSelectedPrintMonth(null);
  };

  return (
    <>
      {/* id="section-to-print" */}
      <div id="section-to-print">
        <style>
          {`
    @media print {
      @page {
        size: landscape;
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
        page-break-after: always;
        table-layout: fixed;
      }

      table {
        width: 100%;
        margin: auto;
      }
    }
  `}
        </style>

        {printResponseData.map((dataObj, mainIndex) => (
          <div key={mainIndex} style={{ pageBreakAfter: "always" }}>
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
                    TRAINING SESSION ALLOTMENT REGISTER
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
                    PH-QAD01/F-076
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
                    PH-QAD01-D-15
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
                    {mainIndex + 1} of {printResponseData.length}
                  </td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <th
                    colSpan="30"
                    style={{ padding: "3px", textAlign: "left" }}
                  >
                    Department:{selectedPrintDepart}
                  </th>
                </tr>
                <tr>
                  <th colSpan="1" style={{ textAlign: "center" }}>
                    S. No.
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Date
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Training Session No.
                  </th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Topic Name
                  </th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    SOP Number
                  </th>
                  <th colSpan="6" style={{ textAlign: "center" }}>
                    Training Session Allotment by
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Remarks
                  </th>
                </tr>

                {dataObj.details.map((detail, detailIndex) => {
                  const formattedHODDate = dataObj.hodSubmitOn
                    ? moment(dataObj.hodSubmitOn).format("DD/MM/YYYY HH:mm")
                    : "";

                  return (
                    <tr key={detail.lineId}>
                      <td colSpan="1" style={{ padding: "6px" }}>
                        {detailIndex + 1}{" "}
                        {/* or some other unique identifier */}
                      </td>
                      <td colSpan="3">
                        {moment(dataObj.date).format("DD/MM/YYYY") || "N/A"}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {detail.trainingSessionNumber || "N/A"}
                      </td>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        {detail.topicName || "N/A"}
                      </td>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        {detail.sopNumber || "N/A"}
                      </td>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        {dataObj.hodSign || "N/A"}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {detail.remarks || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
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
          </div>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="TRAINING SESSION ALLOTMENT REGISTER SUMMARY"
        formatNo="PH-QAL01-F-076"
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
        <input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          // size="small"
          format="DD-MM-YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ fontWeight: "bold", width: "135px" }}
          max={today}
        />

        <Select
          options={department_list}
          value={selectedDep}
          onChange={(value, option) => {
            setSelectedDepartment(option);
          }}
          size="small"
          style={{ width: "10%", height: "30px" }}
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
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={summary}
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
            Select Department.:
          </label>
          <Select
            placeholder="Select Department."
            style={{ marginLeft: "0px", height: "28px" }}
            value={selectedPrintDepart} // Control the value with state
            onChange={handlePrintDepartChange} // Set the selected lot number
          >
            <Select.Option value="BLEACHING">BLEACHING</Select.Option>
            <Select.Option value="SPUNLACE">SPUNLACE</Select.Option>
            <Select.Option value="PAD_PUNCHING">PAD PUNCHING</Select.Option>
            <Select.Option value="DRY_GOODS">DRY GOODS</Select.Option>
            <Select.Option value="QUALITY_CONTROL">
              QUALITY CONTROL
            </Select.Option>
            <Select.Option value="QUALITY_ASSURANCE">
              QUALITY ASSURANCE
            </Select.Option>
            <Select.Option value="PPC">PPC</Select.Option>
            <Select.Option value="STORE">STORE</Select.Option>
            <Select.Option value="DISPATCH">DISPATCH</Select.Option>
            <Select.Option value="PRODUCT_DEVELOPMENT">
              PRODUCT_DEVELOPMENT
            </Select.Option>
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
      </Modal>
    </>
  );
};
export default QA_f076_training_session_register_summary;
