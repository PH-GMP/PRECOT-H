import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
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

const QualityAssuranceF008Summary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState([]);
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [selectedDep, setSelectedDepartment] = useState(null); // New state for eqno
  const [selectedPrintEmpId, setSelectedPrintEmpId] = useState("");
  const [selectedPrintDepartment, setSelectedPrintDepartment] = useState(null); // New state for eqno
  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [equipmentNumbers, setEquipmentNumbers] = useState([]); // State for unique eq_no values

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/Print`,
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
        const uniqueEqNos = Array.from(
          new Set(data.map((item) => item.employeeNo))
        );

        // Set the unique eq_no values in state
        setEquipmentNumbers(uniqueEqNos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const getImage = (username, type) => {
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

        if (type === "hod") {
          setGetImage1((prev) => ({ ...prev, [username]: url }));
        } else {
          setGetImage2((prev) => ({ ...prev, [username]: url }));
        }
      })
      .catch((err) => {
        console.error("Error in fetching image:", err);
      });
  };

  // Fetch chemist and QC images for all data in printData
  useEffect(() => {
    printData.forEach((data) => {
      data.details.forEach((detail) => {
        if (detail.traineeName) {
          getImage(detail.traineeName, "hod");
        }
        if (detail.trainerName) {
          getImage(detail.trainerName, "trainer");
        }
      });
    });
  }, [printData]);

  // Fetch chemist and QC images for all data in printData
  useEffect(() => {
    printData.forEach((data) => {
      if (data.microbiologist_sign) {
        getImage(data.microbiologist_sign, "micro");
      }
      if (data.manager_sign) {
        getImage(data.manager_sign, "manager");
      }
    });
  }, [printData]);

  const [departmentName, setDepartmentName] = useState("");
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
    const initializeDepartmentName = async () => {
      const departmentID = localStorage.getItem("departmentId");

      if (departmentID && departmentMap[departmentID]) {
        setDepartmentName(departmentMap[departmentID]);
      } else {
        setDepartmentName("Unknown Department");
      }
    };

    initializeDepartmentName();
  }, []);

  useEffect(() => {
    if (departmentName) {
      // Make the API call here using departmentName once it's set
      fetchData(departmentName);
    }
  }, [departmentName]);

  // get api
  const fetchData = async (departmentName) => {
    // setLoading(true);

    const url = `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/Summary?department=${departmentName}`;

    if (url) {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        });
        const fetchedData = response.data.map((item) => ({
          ...item,
          date: item.date,
          employeeNo: item.employeeNo,
          department: item.department,
          hodStatus: item.hodStatus,
          reason: item.reason || "N/A",
        }));

        setDataSource(fetchedData);

        const hasRejectedStatus = fetchedData.some(
          (item) =>
            item.manager_status === "QC_REJECTED" ||
            item.manager_status === "QA_REJECTED" ||
            item.manager_status === "MICRO_DESIGNEE_REJECTED"
        );
        setShowReasonColumn(hasRejectedStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data");
      }
    }
    // setLoading(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

  // Generate year options from current year to previous 20 years
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }

  // Generate month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleGoToChange = () => {
    if (selectedDep !== departmentName) {
      message.error(
        "The selected department cannot be the same as the current department."
      );
      return;
    }

    if (selectedDate && selectedEmpId) {
      navigate("/Precot/QA/QA_F008", {
        state: {
          uniqueDate: selectedDate,
          uniqueEmpId: selectedEmpId,
          uniqueDep: selectedDep,
        },
      });
    } else {
      // Handle the case where year or month is not selected
      message.error("Please select a Date EmployeeID and Department");
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/QA_F008", {
      state: {
        uniqueDate: record.date,
        uniqueEmpId: record.employeeNo,
        uniqueDep: record.department,
      },
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
    //
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintMonth(null);
    setSelectedPrintEmpId(null);
    setSelectedPrintDepartment(null);
    setSelectedPrintYear(null);
  };

  console.log(
    "!selectedPrintDepartment selectedPrintMonth electedPrintYear selectedPrintEmpId",
    selectedPrintDepartment,
    selectedPrintMonth,
    selectedPrintYear,
    selectedPrintEmpId
  );

  const printSubmit = () => {
    // Check if selectedPrintDepartment and selectedPrintEmpId are selected
    if (
      (selectedPrintDepartment && selectedPrintEmpId) ||
      selectedPrintYear ||
      selectedPrintMonth
    ) {
      fetchPrintData();
    } else {
      message.error(
        "Please select both Department and Employee ID, or include Year and Month with at least one of them."
      );
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    let baseUrl = `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/Print?`;
    let query = [];

    if (selectedPrintEmpId) {
      query.push(`employeeNo=${selectedPrintEmpId}`);
    }
    if (selectedPrintDepartment) {
      query.push(`department=${selectedPrintDepartment}`);
    }
    if (selectedPrintMonth) {
      query.push(`month=${selectedPrintMonth}`);
    }
    if (selectedPrintYear) {
      query.push(`year=${selectedPrintYear}`);
    }

    let finalUrl = baseUrl + query.join("&");

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
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
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
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Employee No",
      dataIndex: "employeeNo",
      key: "employeeNo",
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hodStatus",
      key: "hodStatus",
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
  let columns = [...baseColumns];

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Training Card"
        formatNo="PH-QAD01-F-008"
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
        <Input
          placeholder="Date"
          type="date"
          size="small"
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ fontWeight: "", width: "135px", marginLeft: "" }}
          max={getCurrentDate()}
        />

        <Input
          type="text"
          style={{ marginLeft: "40px", width: "200px", height: "28px" }}
          placeholder="Enter Employee id"
          onKeyDown={(e) => {
            const isAlphanumeric = /^[a-zA-Z0-9]$/;
            // Check if the pressed key is not valid
            if (
              !isAlphanumeric.test(e.key) &&
              ![
                "Backspace",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "_",
                "/",
                "-",
              ].includes(e.key)
            ) {
              e.preventDefault(); // Prevent the default action (character input)
            }
          }}
          onChange={(e) => {
            setSelectedEmpId(e.target.value);
          }}
        />

        <Select
          placeholder="Select Department Name"
          style={{ width: "200px", marginLeft: "20px", height: "28px" }}
          onChange={(value) => setSelectedDepartment(value)} // Set the selected equipment number
        >
          <Select.Option value="BLEACHING">BLEACHING</Select.Option>
          <Select.Option value="SPUNLACE">SPUNLACE</Select.Option>
          <Select.Option value="PAD_PUNCHING">PAD PUNCHING</Select.Option>
          <Select.Option value="DRY_GOODS">DRY GOODS</Select.Option>
          <Select.Option value="QUALITY_CONTROL">QUALITY CONTROL</Select.Option>
          <Select.Option value="QUALITY_ASSURANCE">
            QUALITY ASSURANCE
          </Select.Option>
          <Select.Option value="PPC">PPC</Select.Option>
          <Select.Option value="STORE">STORE</Select.Option>
          <Select.Option value="DISPATCH">DISPATCH</Select.Option>
          <Select.Option value="PRODUCT_DEVELOPMENT">
            PRODUCT DEVELOPMENT
          </Select.Option>
          <Select.Option value="ENGINEERING">ENGINEERING</Select.Option>
          <Select.Option value="COTTON_BUDS">COTTON BUDS</Select.Option>
          <Select.Option value="MARKETING">MARKETING</Select.Option>
        </Select>

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            height: "28px",
            marginLeft: "40px",
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
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* fields */}

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
              {months.map((month, index) => (
                <Select.Option key={index} value={month}>
                  {month}
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
              Select Department:
            </label>
            <Select
              placeholder="Select Department Name"
              style={{ width: "135px", height: "28px", color: "black" }}
              onChange={(value) => setSelectedPrintDepartment(value)} // Set the selected equipment number
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
                PRODUCT DEVELOPMENT
              </Select.Option>

              <Select.Option value="ENGINEERING">ENGINEERING</Select.Option>
              <Select.Option value="COTTON_BUDS">COTTON BUDS</Select.Option>
              <Select.Option value="MARKETING">MARKETING</Select.Option>
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
              Select Employee ID:
            </label>
            <Select
              placeholder="Select EQ.No."
              style={{ marginLeft: "0px", height: "28px" }}
              value={selectedPrintEmpId || undefined} // Control the value with state
              onChange={(value) => setSelectedPrintEmpId(value)} // Set the selected equipment number
            >
              {equipmentNumbers.map((eqNo) => (
                <Select.Option key={eqNo} value={eqNo}>
                  {eqNo}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      <Table
        columns={baseColumns}
        dataSource={dataSource}
        rowKey="id" // Ensure each row has a unique key
      />

      {/* */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
          scale: 90%;
        }
        // body {
        //   -webkit-print-color-adjust: exact;
        // }
        body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {printData.map((dataObj, mainIndex) => (
          <div key={mainIndex} style={{ pageBreakAfter: "always" }}>
            <table
              className="f18table"
              style={{ height: "50%", marginTop: "" }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: "30px", border: "none" }}></td>
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
                    <br></br>
                    Unit H
                  </td>

                  <td colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                    Training Card
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Format No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    PH-QAD01-F-008
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
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  Ref. SOP No.:
                </td>
                <td colSpan="10" style={{ paddingLeft: "5px" }}>
                  PH-QAD01-D-15
                </td>
                <tr>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Page No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    {mainIndex + 1} of {printData.length}
                  </td>
                </tr>
              </tbody>
            </table>

            <table style={{ marginTop: "1%" }}>
              <thead>
                <tr style={{ border: "1px solid black" }}>
                  <td
                    colSpan={3}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Name of Employee: {dataObj.employeeName}
                  </td>
                  <td
                    colSpan={3}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Training Card No.: {dataObj.trainingCardNo}
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Issued by: {dataObj.issuedBy}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Department: {dataObj.department}
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Employee No.: {dataObj.employeeNo}
                  </td>
                  <td
                    colSpan={2}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Designation: {dataObj.designation}
                  </td>
                  <td
                    colSpan={4}
                    style={{
                      border: "1px solid black",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    Date of Joining: {formatDate(dataObj.dateOfJoining)}
                  </td>
                </tr>

                <tr style={{ border: "1px solid black" }}>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    S.No.
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Date{" "}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Training Session No.{" "}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Topic Name
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    SOP Number
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Trainee Sign & Date{" "}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Trainer Sign & Date{" "}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Mode of Training
                  </td>
                  <td style={{ border: "1px solid black", padding: "5px" }}>
                    Remark
                  </td>
                </tr>
              </thead>
              <tbody>
                {dataObj.details.map((detail, detailIndex) => {
                  const formattedHODDate = dataObj.hodSubmitOn
                    ? moment(dataObj.hodSubmitOn).format("DD/MM/YYYY HH:mm")
                    : "";

                  return (
                    <tr key={detailIndex} style={{ border: "1px solid black" }}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {detailIndex + 1}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {formatDate(dataObj.date)}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {detail.trainingSessionNo}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {detail.topicName}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {detail.sopNo}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {getImage1[detail.traineeName] && (
                          <img
                            src={getImage1[detail.traineeName]}
                            alt="signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        {detail.traineeName}
                        <br />
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {getImage2[detail.trainerName] && (
                          <img
                            src={getImage2[detail.trainerName]}
                            alt="Signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        <br />
                        {detail.trainerName || "N/A"}
                        <br />
                        {formattedHODDate || "N/A"}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {detail.modeOfTraining}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {detail.remarks}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table style={{ marginTop: "1%" }}>
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
        ))}
      </div>
    </>
  );
};

export default QualityAssuranceF008Summary;
