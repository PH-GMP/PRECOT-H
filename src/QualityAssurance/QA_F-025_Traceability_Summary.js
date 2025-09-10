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

const QA_f25_Summary = () => {
  const token = localStorage.getItem("token");
  const [isPrinting, setIsPrinting] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [BmrList, SetBmrList] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState([]);
  const [reason, setReason] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [departmentList, setdepartmentList] = useState();
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [BMRNo, SetBmrNo] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
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

  const [departmentName, setDepartmentName] = useState("");

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

  const onChangeDepartment = async (value, option) => {
    const selectedLabel = option.label;

    setDepartmentName(selectedLabel);
    SetBmrNo("");
    SetBmrList([]); // Clear the BmrList initially

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Engineering/getProductionDetails?department=${selectedLabel}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      SetBmrList(response.data); // Update with new data
    } catch (error) {
      console.error("Error fetching production details:", error);
    }
  };

  const printSubmit = async () => {
    if (!isPrinting) {
      setIsPrinting(true); // Prevent multiple triggers

      // Step 1: Fetch print data
      await fetchPrintValue();

      setIsPrinting(false); // Reset printing state
    }
  };

  // Function to fetch print data

  const fetchPrintValue = async () => {
    const token = localStorage.getItem("token");
    let url = `${API.prodUrl}/Precot/api/qa/getdetailsForPrintSummaryOfTraceability?`;

    if (selectedMonth) url += `month=${selectedMonth}&`;
    if (yearPrint) url += `year=${yearPrint}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.body && res.data.body.message !== "No data") {
          setPrintResponseData(res.data.body);
        } else {
          message.error("No data");
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  // Function to fetch images
  const fetchImages = async () => {
    const token = localStorage.getItem("token");
    setImagesLoaded(false);

    try {
      const promises = printResponseData.map((item, dataIndex) => {
        const qaInspectorUsername = item?.qaManagerOrDesigneeSign;
        const managerUsername = item?.qaManagerOrMrSign;
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
          label: x.department
            .split("_")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ) // Capitalize first letter and lower the rest
            .join("_"),
        }));
        setdepartmentList(formattedData);
      } catch (error) {
        console.error("Error fetching department list:", error);
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
    setSelectedMonth("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   handle edit
  const handleEdit = (record) => {
    const { date, department, bmrNo } = record;

    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QA/F-25", {
      state: {
        date: formattedDate,
        departments: department,
        BMRNo: bmrNo,
      },
    });
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const apiUrl = `${API.prodUrl}/Precot/api/qa/getSummaryTracebility`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        message.error(
          "Access denied. User is not authorized to access this form"
        );
        navigate("/Precot/choosenScreen");
        return;
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        if (data.length > 0) {
          setTableData(
            data.map((item, index) => ({
              key: item.header_id,
              date: item.date,
              qaManagerOrDesigneeStatus: item.qaManagerOrDesigneeStatus,
              qaManagerOrMrStatus: item.qaManagerOrMrStatus,
              department: item.department,
              bmrNo: item.bmrNo,
              id: item.id,
              sno: index + 1,
              reason: item.reason,
            }))
          );
        }
      } else if (data && data.message) {
        message.error(data.message);
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
        if (data.qaManagerOrMrStatus === "QA_MANAGER_MR_REJECTED") {
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
      title: "Depeartment",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "QA Manager/Designee",
      dataIndex: "qaManagerOrDesigneeStatus",
      key: "qaManagerOrDesigneeStatus",
      align: "center",
    },
    {
      title: "QA Manager/MR",
      dataIndex: "qaManagerOrMrStatus",
      key: "qaManagerOrMrStatus",
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
            //   disabled={record.status == "SUBMIT" ? true : false}
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
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }

    if (departmentName == "" || departmentName == "") {
      message.warning("Please Enter Department");
      return;
    }
    navigate("/Precot/QA/F-25", {
      state: {
        date: date,
        departments: departmentName,
        BMRNo: BMRNo,
      },
    });
  };

  return (
    <div>
      <div id="section-to-print">
        {printResponseData?.map((data, dataIndex) => (
          <div key={dataIndex} style={{ pageBreakBefore: "always" }}>
            <table
              style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
            >
              <br />
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
                <tr>
                  <td colSpan="15" rowSpan="4 " style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br></br>
                    Unit H
                  </td>
                  <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                    SUMMARY OF TRACEABILITY
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="15">PH-QAD01/F-025</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="15">01</td>
                </tr>
                <td colSpan="15">Ref. SOP No.:</td>
                <td colSpan="15">PH-QAD01-D-23</td>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="15">
                    {dataIndex + 1} of {printResponseData.length}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <td colSpan="50">Parameters</td>
                  <td colSpan="50">Details</td>
                </tr>

                <tr>
                  <td colSpan="50">Traceability Study conducted on : </td>
                  <td colSpan="50">{formattedDate(data?.date)}</td>
                </tr>

                <tr>
                  <td colSpan="50">
                    Reason for conducting Traceability study:{" "}
                  </td>
                  <td colSpan="50">{data?.reasonForTraceability}</td>
                </tr>

                <tr>
                  <td colSpan="50">
                    Methodology for selecting Product & Lot No.:{" "}
                  </td>
                  <td colSpan="50">{data?.methodologyForSelecting}</td>
                </tr>

                <tr>
                  <td colSpan="50">No. of Peoples involved : </td>
                  <td colSpan="50">{data?.noOfPeopleInvolved}</td>
                </tr>

                <tr>
                  <td colSpan="50">Team Members : </td>
                  <td colSpan="50">{data?.teamMembers}</td>
                </tr>

                <tr>
                  <td colSpan="50" rowSpan="2">
                    Total Time taken to complete the study :{" "}
                  </td>
                  <td colSpan="50">{data?.totalTimeTakenToCompleteTheStudy}</td>
                </tr>

                <tr>
                  <td colSpan="15">startTime</td>
                  <td colSpan="10">{data?.start_time}</td>
                  <td colSpan="15">EndTime</td>
                  <td colSpan="10">{data?.endTime}</td>
                </tr>
                <tr>
                  <td colSpan="50">BMR No: </td>
                  <td colSpan="50">{data?.bmrNo}</td>
                </tr>

                {(data.department === "Dry_Goods" ||
                  data.department === "Pad_Punching" ||
                  data.department === "Cotton_Buds") && (
                  <tr>
                    <td colSpan="50">Customer: </td>
                    <td colSpan="50">{data?.customer}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="50">Product: </td>
                  <td colSpan="50">{data?.product}</td>
                </tr>

                {(data.department === "Bleaching" ||
                  data.department === "Spunlace") && (
                  <>
                    <tr>
                      <td colSpan="50">Start Batch: </td>
                      <td colSpan="50">{data?.poNo}</td>
                    </tr>

                    <tr>
                      <td colSpan="50">End Batch: </td>
                      <td colSpan="50">{data?.batchNo}</td>
                    </tr>
                  </>
                )}
                {(data.department === "Dry_Goods" ||
                  data.department === "Pad_Punching" ||
                  data.department === "Cotton_Buds") && (
                  <>
                    <tr>
                      <td colSpan="50">Lot No. / Batch No. : </td>
                      <td colSpan="50">{data?.lotNo}</td>
                    </tr>

                    <tr>
                      <td colSpan="50">PO No.: </td>
                      <td colSpan="50">{data?.poNo}</td>
                    </tr>
                  </>
                )}
                {(data.department === "Dry_Goods" ||
                  data.department === "Pad_Punching" ||
                  data.department === "Cotton_Buds") && (
                  <>
                    <tr>
                      <td colSpan="30" rowSpan="2">
                        Total Quantity :
                      </td>
                      <td colSpan="20">No. of Cartons - </td>
                      <td colSpan="50">{data?.totalQuantityQartons}</td>
                    </tr>

                    <tr>
                      <td colSpan="20">No. of Bags - </td>
                      <td colSpan="50">{data?.totalQuantityBags}</td>
                    </tr>

                    <tr>
                      <td colSpan="30" rowSpan="2">
                        Quantity Dispatched :
                      </td>
                      <td colSpan="20">No. of Cartons - </td>
                      <td colSpan="50">{data?.quantityDispachedCartons}</td>
                    </tr>

                    <tr>
                      <td colSpan="20">No. of Bags - </td>
                      <td colSpan="50">{data?.quantityDispachedBags}</td>
                    </tr>

                    <tr>
                      <td colSpan="30" rowSpan="2">
                        Quantity Available in FG Godown :
                      </td>
                      <td colSpan="20">No. of Cartons - </td>
                      <td colSpan="50">{data?.quantityAvailableInFgCartons}</td>
                    </tr>

                    <tr>
                      <td colSpan="20">No. of Bags - </td>
                      <td colSpan="50">{data?.quantityAvailableInFgBags}</td>
                    </tr>
                  </>
                )}

                {(data.department === "Bleaching" ||
                  data.department === "Spunlace") && (
                  <>
                    <tr>
                      <td colSpan="50">Total Quantity :</td>

                      <td colSpan="50">{data?.totalQuantityQartons}</td>
                    </tr>

                    <tr>
                      <td colSpan="50">Quantity Dispatched :</td>

                      <td colSpan="50">{data?.quantityDispachedCartons}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td colSpan="100">
                    Problem faced during conducting the traceability study
                    (Explain in details) :{data?.problemFaced}
                  </td>
                </tr>

                <tr>
                  <td colSpan="100">
                    Action Taken to resolve the problem : {data?.actionTaken}
                  </td>
                </tr>

                <tr>
                  <td colSpan="50">
                    Recommendation / Suggestion (if any) :{data?.suggestion}
                  </td>

                  <td colSpan="50">
                    Final Conclusion :{data?.finalConclusion}
                  </td>
                </tr>

                <tr>
                  <td colSpan="50">Prepared </td>
                  <td colSpan="50">Reviewed</td>
                </tr>

                <tr>
                  <td colSpan="50" style={{ textAlign: "center" }}>
                    {getImage1[dataIndex] && (
                      <img
                        src={getImage1[dataIndex]}
                        alt={"Sign"}
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
                      {data?.qaManagerOrDesigneeSign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDatewithTime(data?.qaManagerOrDesigneeSubmitOn)}
                    </div>
                  </td>

                  <td colSpan="50" style={{ textAlign: "center" }}>
                    {getImage2[dataIndex] && (
                      <img
                        src={getImage2[dataIndex]}
                        alt={"Sign"}
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
                      {data?.qaManagerOrMrSign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDatewithTime(data?.qaManagerOrMrApprovedOn)}
                    </div>
                  </td>
                </tr>
              </tbody>
              <br />
              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
                <tr>
                  <th colSpan="25">Particular</th>
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
          formName="SUMMARY OF TRACEABILITY"
          formatNo="PH-QAD01/F-025"
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
              max={getCurrentDate()} 
              style={{ width: "100%", height: "30px" }}
            />
          </Col>
          <Col style={{ display: "flex", alignItems: "center" }}>
            <label
              htmlFor="department"
              style={{ marginRight: "1px", minWidth: "100px" }}
            >
              {" "}
              Department:
            </label>

            <Select
              onChange={onChangeDepartment}
              options={departmentList}
              size="small"
              style={{ width: "150px", height: "30px" }}
            /> 
          </Col>
          <Col style={{ display: "flex", alignItems: "center" }}>
            <label
              htmlFor="BMRNo"
              style={{ marginRight: "1px", minWidth: "100px" }}
            >
              BMR NO:
            </label>

            <Select
              id="BMRNo"
              value={BMRNo}
              onChange={(value) => SetBmrNo(value)}
              size="small"
              style={{ width: "150px", height: "30px" }}
              showSearch // Enables search functionality
              placeholder="Select BMR NO"
              optionFilterProp="children" // Filters based on option labels
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={BmrList.map((bmr) => ({
                value: bmr,
                label: bmr,
              }))}
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
            width: "100%",
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
              SelectYear
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
              width: "350px",
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
      </Modal>
    </div>
  );
};

export default QA_f25_Summary;
