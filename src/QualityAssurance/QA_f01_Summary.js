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
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QA_f01_Summary = () => {
  PrintPageOrientation({ orientation: "portrait", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [yearPrint, setYearPrint] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [departments, setDepartments] = useState([]);
  const departmentId = localStorage.getItem("departmentId");
  const [departmentName, setDepartmentName] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yearF}-${monthF}-${day}`;

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2040);

  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
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
    const token = localStorage.getItem("token");
    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hod_sign;
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qa_manager_sign;
      setSaveLoading(true);
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
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
              setSaveLoading(false);
            }
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.plant_head_sign;
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
            setGetImage3((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {})
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData, API.prodUrl, token]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
        if (departmentId) {
          const foundDepartment = response.data.find(
            (department) => department.id === parseInt(departmentId)
          );
          if (foundDepartment) {
            setDepartmentName(foundDepartment.department);
            fetchData(foundDepartment.department);
          }
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleYearPrintChange = (value) => {
    setYearPrint(value);
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
  };

  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.qa_manager_status === "QA_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  //   handle edit
  const handleEdit = (record) => {
    const { date } = record;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QA/F-01", {
      state: {
        date: formattedDate,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const fetchData = async (departmentName) => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/qa/getSummarydetailsIncidence?department=${departmentName}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "QA_MANAGER" ||
        role === "ROLE_MR" ||
        role === "ROLE_PLANT_HEAD" ||
        role === "ROLE_HOD"
      ) {
        setCakingData(data);
      }

      if (data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            date: item.date,
            month: item.month,
            year: item.year,
            qa_manager_status: item.qa_manager_status,
            plant_head_status: item.plant_head_status,
            hod_status: item.hod_status,
            id: item.id,
            sno: index + 1,
            reason: item.reason,
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      message.error(error.data.message);
    } finally {
    }
  };

  // Table Summary
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
      key: "formatDate",
      align: "center",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Hod/Designee Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "QA Manager/MR Status",
      dataIndex: "qa_manager_status",
      key: "qa_manager_status",
      align: "center",
    },
    {
      title: "Plant Head Status",
      dataIndex: "plant_head_status",
      key: "plant_head_status",
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
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }
  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 2000);
    }
  }, [printResponseData]);

  function convertShift(shift) {
    switch (shift) {
      case "1":
        return "I";
      case "2":
        return "II";
      case "3":
        return "III";
      default:
        return null;
    }
  }
  const fetchPrintValue = (value) => {
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/qa/getdetailsForPrintIncidence?year=${yearPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.body.message !== "No data") {
            const printResponseData = res.data.body;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No data");
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/QA/F-01", {
      state: {
        date: date,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((slice, index) => (
          <table style={{ marginTop: "10px", scale: "94%" }}>
            <br />
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                  MANAGEMENT OF INCIDENCE
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QAD01/F-001</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QAD01-D-05</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15">
                  {index + 1} of {printResponseData?.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td  colSpan="35">
                  <b>Year :</b> {printResponseData?.[index]?.year}
                </td>
                <td  colSpan="40">
                  <b>Month :</b> {printResponseData?.[index]?.month}{" "}
                </td>
                <td  colSpan="40">
                  <b>Date & Shift/Time :</b>
                  {formattedDate(printResponseData?.[index]?.date)}&
                  {convertShift(printResponseData?.[index]?.shift)} /
                  {printResponseData?.[index]?.time}
                </td>
              </tr>
              <tr>
                <td  colSpan="115">
                  <b>Department : </b> {printResponseData?.[index]?.department}
                </td>
              </tr>
              <tr>
                <td  colSpan="115">
                  <b>Incident No.: </b>
                  {printResponseData?.[index]?.incident_no}
                </td>
              </tr>
              <tr>
                <td
                  style={{ height: "30px", verticalAlign: "top" }}
                  colSpan="115"
                >
                  <b>Details of Incident : </b>{" "}
                  {printResponseData?.[index]?.details_of_incidence}
                </td>
              </tr>
              <tr>
                <td
                  style={{ height: "55px", verticalAlign: "top" }}
                  colSpan="115"
                >
                  <b>Information Communicated to : </b>{" "}
                  {printResponseData?.[index]?.information_communicated_to}{" "}
                </td>
              </tr>
              <tr>
                <td
                  style={{ height: "55px", verticalAlign: "top" }}
                  colSpan="115"
                >
                  <b>Effect / Impact of Incident : </b>
                  {printResponseData?.[index]?.impact_of_incidence}{" "}
                </td>
              </tr>
              <tr>
                <td  colSpan="115">
                  <b>Severity :</b> {printResponseData?.[index]?.severity}{" "}
                </td>
              </tr>
              <tr>
                <td
                  style={{ height: "70px", verticalAlign: "top" }}
                  colSpan="115"
                >
                  <b>Root Cause : </b> {printResponseData?.[index]?.root_cause}
                </td>
              </tr>
              <tr>
                <td
                  style={{ height: "70px", verticalAlign: "top" }}
                  colSpan="115"
                >
                  <b>Action Taken :</b>{" "}
                  {printResponseData?.[index]?.action_taken}{" "}
                </td>
              </tr>
              <tr>
                <td
                  style={{ height: "70px", verticalAlign: "top" }}
                  colSpan="115"
                >
                  <b>Remark : </b> {printResponseData?.[index]?.remarks}
                </td>
              </tr>
              <tr>
                <td  colSpan="115">
                  <b>Status of Action Taken : </b>{" "}
                  {printResponseData?.[index]?.status_of_action_taken}
                </td>
              </tr>

              <tr>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  HOD/ Designee Sign & Date
                </td>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  QA Manager/MR Sign & Date
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Plant Head Sign & Date
                </td>
              </tr>
              <tr>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`HOD Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData?.[index]?.hod_sign || ""}
                  <br />
                  {formattedDatewithTime(
                    printResponseData?.[index]?.hod_submit_on
                  )}
                </td>
                <td
                  colSpan="40"
                  style={{ height: "40px", textAlign: "center" }}
                >
                  {" "}
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`MR Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData?.[index]?.qa_manager_sign || ""}
                  <br />
                  {formattedDatewithTime(
                    printResponseData?.[index]?.qa_manager_approved_on
                  )}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {getImage3[index] && (
                    <img
                      src={getImage3[index]}
                      alt={`Plant Head Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <br />
                  {printResponseData?.[index]?.plant_head_sign || ""}
                  <br />
                  {formattedDatewithTime(
                    printResponseData?.[index]?.plant_head_approved_on
                  )}
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particular</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="MANAGEMENT OF INCIDENCE"
          formatNo="PH-QAD01/F-001"
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
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              size="small"
              max={formattedToday}
              style={{ width: "100%", height: "30px" }}
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
      {/* Table...Summary */}
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={tableData}
        />
      </div>

      {/* SUMMARY PRINT */}
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
            disabled={!yearPrint}
            loading={saveLoading}
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
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={handleYearPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Year
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QA_f01_Summary;
