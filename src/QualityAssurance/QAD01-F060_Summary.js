/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
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
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f60_Summary = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState("");
  const [PrintDate, setPrintDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [PrintDepartmentName, setPrintDepartmentName] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [departmentList, setdepartmentList] = useState();

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2040);
  const monthNames = [
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const onChangeDepartment = async (value, option) => {
    const selectedLabel = option.label;

    setDepartmentName(selectedLabel);
  };
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };

  useEffect(() => {
    // Fetch department options from the API
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );

        const formattedData = response.data.map((x) => ({
          value: x.id,
          label: x.department,
        }));

        setdepartmentList(formattedData);
      } catch (error) {
        console.error("Error fetching department list:", error);
      }
    };

    fetchDepartments();
  }, []);

  const printSubmit = async () => {
    if (!isPrinting) {
      setIsPrinting(true); // Prevent multiple triggers
      await fetchPrintData();
      setIsPrinting(false); // Reset printing state
    }
  };

  // Function to fetch print data
  const fetchPrintData = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${API.prodUrl}/Precot/api/QA/Service/MasterListSharpList/PrintForMasterListSharpTools?`;

      if (PrintDate) url += `&date=${PrintDate}`;
      if (selectedMonth) url += `&month=${selectedMonth}`;
      if (yearPrint) url += `&year=${yearPrint}`;
      if (PrintDepartmentName) url += `&department=${PrintDepartmentName}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.data &&
        response.data.success &&
        response.data.message === "No data"
      ) {
        message.error("No data available.");
        handleModalClose();
      } else if (response.data && response.data.length > 0) {
        setPrintResponseData(response.data); // Set data to trigger useEffect
      } else {
        message.warning("No data available.");
        handleModalClose();
      }
    } catch (error) {
      message.error("Error fetching data. Please try again.");
      console.error("API Error:", error);
    }
  };

  // Function to fetch images
  const fetchImages = async () => {
    const token = localStorage.getItem("token");
    setImagesLoaded(false);

    try {
      const promises = printResponseData.map((item, dataIndex) => {
        const qaInspectorUsername = item?.qaInspectorSign;
        const managerUsername = item?.managerSign;
        const requests = [];

        if (qaInspectorUsername) {
          const qaRequest = axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${qaInspectorUsername}`,
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
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImage1((prevImages) => ({
                ...prevImages,
                [dataIndex]: url,
              }));
            })
            .catch((err) => {
              if (err.response?.status !== 400) throw err;
            });
          requests.push(qaRequest);
        }

        if (managerUsername) {
          const managerRequest = axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${managerUsername}`,
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
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImage2((prevImages) => ({
                ...prevImages,
                [dataIndex]: url,
              }));
            })
            .catch((err) => {
              if (err.response?.status !== 400) throw err;
            });
          requests.push(managerRequest);
        }

        return Promise.all(requests);
      });

      await Promise.all(promises);
      setImagesLoaded(true); // Set to true once all images are fetched
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  // Trigger the print
  const triggerPrint = () => {
    if (imagesLoaded) {
      window.print();
    } else {
    }
  };

  // Effect to handle the sequence when printResponseData changes
  useEffect(() => {
    if (printResponseData && printResponseData.length > 0) {
      fetchImages(); // Trigger fetchImages after printResponseData is set
    }
  }, [printResponseData]);

  // Effect to trigger the print once images are loaded
  useEffect(() => {
    if (imagesLoaded) {
      triggerPrint(); // Trigger print when all images are loaded
    }
  }, [imagesLoaded]);

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
  };

  const onChangePrintDepartment = async (value, option) => {
    const selectedLabel = option.label;

    setPrintDepartmentName(selectedLabel);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setPrintDate(null);
    setSelectedMonth("");
    setPrintDepartmentName("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   handle edit
  const handleEdit = (record) => {
    const { date, department } = record;

    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QA/F-060", {
      state: {
        date: date,
        department: department,
      },
    });
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/QA/Service/MasterListSharpList/getAll`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data && Array.isArray(data)) {
        if (data.length > 0) {
          setTableData(
            data.map((item, index) => ({
              key: item.header_id,
              date: item.date,
              department: item.department,
              qaInspectorStatus: item.qaInspectorStatus,
              managerStatus: item.managerStatus,
              id: item.id,
              sno: index + 1,
              reason: item.reason,
            }))
          );
        } else {
          message.error("No records found.");
        }
      } else if (data && data.message) {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      } else {
        message.error("Unexpected response from the server.");
      }
    } catch (error) {
      message.error("Error fetching data: " + error.message);
    }
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of tableData) {
        if (
          data.managerStatus === "QA_MANAGER_REJECTED" ||
          data?.managerStatus == "MR_REJECTED" ||
          data?.managerStatus == "DESIGNEE_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [tableData]);

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },

    {
      title: "QA Inspector Status",
      dataIndex: "qaInspectorStatus",
      key: "qaInspectorStatus",
      align: "center",
    },
    {
      title: "QA_Manager/QA_Designee/QA_MR Status",
      dataIndex: "managerStatus",
      key: "managerStatus",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "80%" }}
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

  const goTo = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please  Select the Date");
      return;
    }

    if (departmentName == "" || departmentName == "") {
      message.warning("Please select the Department");
      return;
    }
    navigate("/Precot/QA/F-060", {
      state: {
        date: newDate,
        department: departmentName,
      },
    });
  };

  return (
    <div>
      <div id="section-to-print">
        {printResponseData?.map((data, dataIndex) => (
          <div key={dataIndex} style={{ pageBreakBefore: "always" }}>
            <table
              style={{ marginTop: "10px", tableLayout: "fixed", width: "90%" }}
            >
              <thead>
                <tr>
                  <td style={{ border: "none" }} colSpan="90"></td>
                </tr>
                <tr>
                  <td colSpan="15" rowSpan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th colSpan="45" rowSpan="4" style={{ textAlign: "center" }}>
                    MASTER LIST OF SHARP TOOLS
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="15">PH-QAD01-F-023</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="15">01</td>
                </tr>
                <tr>
                  <td colSpan="15">Ref. SOP No.:</td>
                  <td colSpan="15">PH-QAD01-D-22</td>
                </tr>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="15">
                    {dataIndex + 1} of {printResponseData.length}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none" }} colSpan="90"></td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="45">date:{formattedDate(data?.date)}</td>
                  <td colSpan="45">Department:{data?.department}</td>
                </tr>
                <tr>
                  <td colSpan="10">S.No</td>
                  <td colSpan="20">Item Description</td>
                  <td colSpan="20">Identification No. On The Tool</td>
                  <td colSpan="20">Location</td>
                  <td colSpan="20">Remarks</td>
                </tr>

                {data?.details?.map((row, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {index + 1}
                      </td>
                      <td colSpan="20" style={{ textAlign: "center" }}>
                        {row.itemDescription}
                      </td>

                      <td colSpan="20" style={{ textAlign: "center" }}>
                        {row.identificationNoOnTheTool}
                      </td>
                      <td colSpan="20" style={{ textAlign: "center" }}>
                        {row.location}
                      </td>
                      <td colSpan="20" style={{ textAlign: "center" }}>
                        {row.remarks}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                <tr>
                  <td colSpan="90">
                    Note :- <br />
                    1. In case of a tool kit, individual items should be
                    mentioned. <br />
                    2. Identification number will be given by the user
                    department.
                    <br />
                    3. Sharp tool Dept. wise Identification number <br />
                    (Blow Room - BR-XX, Bleaching - BLG-XX, Spunlace - SP-XX,
                    Ball Making - BM-XX, Pleat - PLT- XX, Wool Roll - WR-XX, Pad
                    Punching - PP-XX, Store - STR-XX, Quality - QC-XX)
                    <br />
                  </td>
                </tr>

                <tr>
                  <td colSpan="45" style={{ textAlign: "center" }}>
                    Prepared by
                  </td>

                  <td colSpan="45" style={{ textAlign: "center" }}>
                    Verified by
                  </td>
                </tr>

                <tr>
                  <td colSpan="45" style={{ textAlign: "center" }}>
                    {getImage1[dataIndex] && (
                      <img
                        src={getImage1[dataIndex]}
                        alt={"QAinspector Sign"}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "60px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}
                    <div style={{ textAlign: "center" }}>
                      {data?.qaInspectorSign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDate(data?.qaInspectorSubmittedOn)}
                    </div>
                  </td>

                  <td colSpan="45" style={{ textAlign: "center" }}>
                    {getImage2[dataIndex] && (
                      <img
                        src={getImage2[dataIndex]}
                        alt="QA Manager/MR Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          textAlign: "center",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}
                    <div style={{ textAlign: "center" }}>
                      {data?.managerSign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDate(data?.managerSubmittedOn)}
                    </div>
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td style={{ border: "none" }} colSpan="90"></td>
                </tr>
                <tr>
                  <th colSpan="15">Particular</th>
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
                  <th colSpan="15">Name</th>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                </tr>
                <tr>
                  <th colSpan="15">Signature & Date</th>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                  <td colSpan="25"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="MASTER LIST OF SHARP TOOLS"
          formatNo="PH-QAD01-F-060"
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
                confirm("Are you sure want to Logout") == true
                  ? navigate("/Precot")
                  : null;
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

        {/* Go To Row */}

        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            <Input
              addonBefore="Date"
              placeholder="Date"
              type="date"
              size="small"
              value={newDate}
              style={{ width: "200px", fontWeight: "bold", marginRight: "1em" }}
              onChange={(e) => {
                setNewDate(e.target.value);
              }}
              max={getCurrentDate()}
            />
          </Col>
          <Col>
            <label>Department</label>
            <Select
              value={departmentName} // Ensures the component shows the placeholder when cleared
              onChange={onChangeDepartment}
              options={departmentList}
              size="small"
              style={{ width: "150px", height: "30px", marginLeft: "10px" }}
              placeholder="Select Department"
            />
          </Col>
          <Col>
            <Button
              key="go"
              onClick={goTo}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                width: "100%",
              }}
              shape="round"
              icon={<BiNavigation color="#00308F" />}
              type="primary"
            >
              Go to
            </Button>
          </Col>
        </Row>
      </div>

      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "95%",
          }}
          columns={columns}
          dataSource={tableData}
        />
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            type="date"
            size="small"
            value={PrintDate}
            style={{ width: "250px", fontWeight: "bold", marginRight: "1em" }}
            onChange={(e) => setPrintDate(e.target.value)}
            max={getCurrentDate()}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={setYearPrint}
            style={{ width: "250px", height: "32px" }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled>
              Select Year
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Month:
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              width: "250px",
              height: "32px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              padding: "4px 8px",
              backgroundColor: "#fff",
              fontSize: "14px",
            }}
          >
            <option value="">--Select Month--</option>
            {monthNames.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Department:
          </label>
          <Select
            value={PrintDepartmentName} // Ensures the component shows the placeholder when cleared
            onChange={onChangePrintDepartment}
            options={departmentList}
            size="small"
            style={{ width: "250px", height: "32px" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default QA_f60_Summary;
