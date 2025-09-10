import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const COTTON_BUDS_f02_Summary = () => {
  const [open, setOpen] = useState(false);
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  }
`;

  const [cakingData, setCakingData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState([]);
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState([]);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState(null);
  const [shiftLov, setShiftLov] = useState([]);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = printResponseData?.length * 2;
  const token = localStorage.getItem("token");
  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yearF}-${monthF}-${day}`;

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.supervisor_sign;
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
            setImagesLoaded((loaded) => loaded + 1);
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hod_submit_by;
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
            setImagesLoaded((loaded) => loaded + 1);
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [token]);

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2080);
  const monthOptions = [
    { id: 1, value: "January" },
    { id: 2, value: "February" },
    { id: 3, value: "March" },
    { id: 4, value: "April" },
    { id: 5, value: "May" },
    { id: 6, value: "June" },
    { id: 7, value: "July" },
    { id: 8, value: "August" },
    { id: 9, value: "September" },
    { id: 10, value: "October" },
    { id: 11, value: "November" },
    { id: 12, value: "December" },
  ];

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

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
        return date.format("DD/MM/YYYY ");
      }
    }
    return "";
  };

  const handlePrint = () => {
    setShowModal(true);
  };

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0 && imagesLoaded === totalImages) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 200);
    }
  }, [imagesLoaded, totalImages, printResponseData]);

  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift;
    }
  };

  const fetchPrintValue = () => {
    try {
      let dateP = datePrint || "";
      let shiftP = shiftPrint || "";
      let yearP = yearPrint || "";

      // Map month names to their corresponding numbers
      const monthMap = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12",
      };

      // Check for monthPrint and get corresponding number from monthMap
      let monthP = monthPrint ? monthMap[monthPrint] : "";

      axios
        .get(
          `${API.prodUrl}/Precot/api/buds/Service/printLogbookSummary?month=${monthP}&date=${dateP}&shift=${shiftP}&year=${yearP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Data Found");
            handleModalClose();
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in fetchPrintValue:", error);
    }
  };

  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }
    if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/COTTON_BUDS/F-02", {
      state: {
        date: date,
        shift: shift,
      },
    });
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/buds/Service/getLogbookSummary`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_HOD" ||
        role === "ROLE_DESIGNEE"
      ) {
        setCakingData(data);
      }
      if (
        role === "ROLE_HOD" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_DESIGNEE"
      ) {
        setSummaryData(
          data.map((item, index) => ({
            key: item.header_id,
            logShift: item.logShift,
            logDate: item.logDate,
            supervisor_status: item.supervisor_status,
            hod_status: item.hod_status,
            id: item.id,
            sno: index + 1,
            rejectReason: item.rejectReason,
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);

  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setYearPrint(null);
    setMonthPrint(null);
    setImagesLoaded(0);
  };
  const handleEdit = (record) => {
    const { logDate } = record;
    const { logShift } = record;
    navigate("/Precot/COTTON_BUDS/F-02", {
      state: {
        date: logDate,
        shift: logShift,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
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
      title: "Shift",
      dataIndex: "logShift",
      key: "logShift",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "logDate",
      key: "logDate",
      align: "center",
      render: (text) => formattedDate(text),
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "HOD/Designee  Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
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
  const Reason = {
    title: "Reason",
    dataIndex: "rejectReason",
    key: "rejectReason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {printResponseData?.map((datam, index) => (
          <table
            style={{ marginTop: "10px", scale: "92%", tableLayout: "fixed" }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="20" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="55" rowSpan="4" style={{ textAlign: "center" }}>
                  LOG BOOK – COTTON BUDS
                </th>
                <td colSpan="20">Format No.:</td>
                <td colSpan="20">PH-PRD06/F-002</td>
              </tr>
              <tr>
                <td colSpan="20">Revision No.:</td>
                <td colSpan="20">01</td>
              </tr>
              <td colSpan="20">Ref. SOP No.:</td>
              <td colSpan="20">PH-PRD04/F-004</td>
              <tr>
                <td colSpan="20">Page No.:</td>
                <td colSpan="20">
                  {index + 1} of {printResponseData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead>

            <br />
            <br />
            <tbody>
              <tr>
                <th colSpan="65">
                  A . Machine Allocation & Production Details:
                </th>
                <td colSpan="25">Date: {datam.logDate}</td>
                <td colSpan="25">Shift:{datam.logShift}</td>
              </tr>
              <tr>
                <td colSpan="25" style={{ textAlign: "center" }}>
                  Machine Name & No.{" "}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  Manpower Allocation{" "}
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  BMR No.{" "}
                </td>
                <td colSpan="60" style={{ textAlign: "center" }}>
                  Product Name
                </td>
              </tr>
              {datam.productionLine?.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      colSpan="25"
                      rowSpan="2"
                      style={{ textAlign: "center" }}
                    >
                      {row.machineName}{" "}
                    </td>
                    <td
                      colSpan="10"
                      rowSpan="2"
                      style={{ textAlign: "center" }}
                    >
                      {row.manPowerAllocation1}{" "}
                    </td>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      Running{" "}
                    </td>
                    <td colSpan="15" style={{ textAlign: "center" }}>
                      {row.bmrNumber1}
                    </td>
                    <td colSpan="45" style={{ textAlign: "center" }}>
                      {row.productaName1}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="20" style={{ textAlign: "center" }}>
                      Next{" "}
                    </td>
                    <td colSpan="15" style={{ textAlign: "center" }}>
                      {row.bmrNumber2}{" "}
                    </td>
                    <td colSpan="45" style={{ textAlign: "center" }}>
                      {" "}
                      {row.productaName2}{" "}
                    </td>
                  </tr>{" "}
                </React.Fragment>
              ))}
              <tr>
                <td colSpan="115">
                  B. Stoppage details:
                  <br />
                  {datam.stoppageDetails}
                </td>
              </tr>
              <tr>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  Performed by Supervisor Sign & Date
                </td>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  Reviewed by HOD / Designee Sign & Date
                </td>
                <td colSpan="35" rowSpan="2" style={{ verticalAlign: "top" }}>
                  {" "}
                  Remarks:{datam.remarks}
                </td>
              </tr>
              <tr>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`Supervisor Sign ${index + 1}`}
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
                  {datam.supervisor_sign || ""}
                  <br />
                  {formattedDatewithTime(datam?.supervisor_submit_on)}
                </td>
                <td colSpan="40" style={{ textAlign: "center" }}>
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`HOD/Designee Sign ${index + 1}`}
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
                  {datam.hod_submit_by || ""}
                  <br />
                  {formattedDatewithTime(datam?.hod_submit_on)}
                </td>
              </tr>
            </tbody>

            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="30">Particulars</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="25" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="30">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="25"></td>
              </tr>
              <tr>
                <th colSpan="30">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="25"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>
      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="LOG BOOK – COTTON BUDS"
          formatNo="PH-PRD06/F-002"
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
              onClick={handleBack}
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
                marginRight: "10px",
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

        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "2px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            {" "}
            <label>Date:</label>
          </Col>
          <Col>
            <Input
              placeholder="Date"
              type="date"
              size="Medium"
              value={date}
              max={formattedToday}
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
          <Col>
            {" "}
            <label>Shift:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={shift}
              onChange={(value) => setShift(value)}
              style={{ width: "100%", marginBottom: "10px" }}
              placeholder="Search Shift"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Shift
              </Select.Option>
              {shiftLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
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

      <Table columns={columns} dataSource={summaryData} />

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
            onChange={(e) => setDatePrint(e.target.value)}
            type="date"
            value={datePrint}
            size="small"
            max={formattedToday}
            style={{ width: "100%", height: "30px" }}
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
            Shift:
          </label>

          <Select
            showSearch
            value={shiftPrint}
            onChange={(value) => setShiftPrint(value)}
            style={{ width: "100%" }}
            placeholder="Shift"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Shift
            </Select.Option>
            {shiftLov.map((option) => (
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
            Month :
          </label>
          <Select
            showSearch
            value={monthPrint}
            onChange={(value) => setMonthPrint(value)}
            style={{ width: "100%" }}
            placeholder="Search Month Name"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Month Name
            </Select.Option>
            {monthOptions.map((option) => (
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
            Year :
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={(value) => setYearPrint(value)}
            style={{ width: "100%" }}
            placeholder="Search Year Name"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Year Name
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

export default COTTON_BUDS_f02_Summary;
