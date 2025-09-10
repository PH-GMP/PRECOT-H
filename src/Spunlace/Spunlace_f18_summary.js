/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { Tooltip } from "antd";
import API from "../baseUrl.json";
import { FaUserCircle } from "react-icons/fa";
import { createGlobalStyle } from "styled-components";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { Tabs, Button, Col, Input, Row, message } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { GoArrowLeft } from "react-icons/go";
import { jwtDecode } from "jwt-decode";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f18_summary = () => {
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

  const [newDate, setNewDate] = useState("");
  const [printButtonDisabled, setPrintButtonDisabled] = useState(false);
  const [modalData, setmodalData] = useState();
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNoPayload, setorderNoPayload] = useState();
  const [PrintByDate, setPrintByDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [printresponseData, setPrintResponseData] = useState([]);
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orderNumberPrint, setOrderNumberPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [SecondResponseData, setSecondResponseData] = useState([]);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const fetchOrderbasedHeadersPrint = (value) => {
    setOrderNumberPrint(value);
  };
  const printSubmit = () => {
    // console.log("datePrint:", datePrint);
    // console.log("printButtonDisabled:", printButtonDisabled);

    if (!datePrint || printButtonDisabled) {
      message.error("Please select a date .");
      return;
    }

    window.print();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setOrderNumberPrint(null);
  };

  const [getImage, setGetImage] = useState("");
  //// console.log("sup",modalData?.supervisor_sign)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData[0]?.supervisor_sign;
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
  }, [printresponseData,API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData[0]?.hod_sign;
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
  }, [printresponseData,API.prodUrl]);

  const handleShiftChange = (value) => {
    // console.log(" Shift ", value);
    setShift(value);
  };

  const goTo = () => {
    if (!newDate) {
      message.warning("Please select Shift ");
      return;
    }
    navigate("/Precot/Spunlace/F-18", {
      state: {
        newdate: newDate,
      },
    });
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  useEffect(() => {
    if (PrintByDate) {
      fetchPrintValue(PrintByDate);
    }
  }, [PrintByDate]);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDatePrint(selectedDate);
    fetchPrintValue(selectedDate); // Fetch data for the selected date
  };

  const fetchPrintValue = async (selectedDate) => {
    try {
      // console.log(`Fetching data for date: ${selectedDate}`);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response1 = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/report/printStoppageReport?date=${selectedDate}`,
        { headers }
      );

      if (response1.data && response1.data.length > 0) {
        setPrintResponseData(response1.data);
        // console.log("res", response1.data);
        const response2 = await axios.get(
          `${API.prodUrl}/Precot/api/spulance/sliterwinderStoppageReport?date=${selectedDate}`,
          { headers }
        );

        if (response2.data && response2.data.length > 0) {
          setSecondResponseData(response2.data);
          // console.log("Second API response:", response2.data);
          setPrintButtonDisabled(false); // Enable the print button when data is available
        } else {
          message.error("No data found for sliter winder StoppageReport!");
          setPrintButtonDisabled(true);
        }
      } else {
        message.error("No data found for print StoppageReport!");
        setPrintButtonDisabled(true);
      }
    } catch (error) {
      console.error("Error in fetchPrintValue:", error);
      message.error("Error fetching data");
      setPrintButtonDisabled(true);
    }
  };

  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
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

  const Shift = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  useEffect(() => {
    if (SecondResponseData.length > 0) {
      //window.print();
    }
  }, [SecondResponseData]);

  // console.log("selected print date",);
  const handleprintSave = () => {
    // Handle save logic here
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = "";
        if (
          role === "ROLE_HOD" ||
          role === "ROLE_DESIGNEE" ||
          role === "ROLE_SUPERVISOR"
        ) {
          apiUrl = `${API.prodUrl}/Precot/api/spulance/report/hodSummaryF018`;
        } else {
          throw new Error("Role not found in localStorage.");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();

        // console.log("Fetched data:", data);

        if (!data || !Array.isArray(data)) {
          throw new Error("Data is not an array or undefined");
        }

        setmodalData(data);

        setContaminationData(
          data.map((item) => ({
            key: item.header_id, // Assuming header_id is unique
            formatName: item.formatName,
            formatNo: item.formatNo,
            revisionNo: item.revisionNo,
            date: item.date,

            productName: item.product_name,

            shift: item.shift,
            reason: item.reason,
            status: item.status,
            hod_status: item.hod_status,
            supervisor_status: item.supervisor_status,
            mailstatus: item.mail_status,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of ContaminationData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [ContaminationData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Precot");
  };

  useEffect(() => {
    // console.log("modal", modalData);
  }, [modalData]);

  const handleEdit = (record) => {
    // console.log("recorddd",record)

    const { date, shift } = record;

    // const formattedDate = moment(date).format("DD/MM/YYYY");

    navigate("/Precot/Spunlace/F-18", {
      state: {
        newdate: date,
        shiftvalue: shift,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new window.Date(dateString);
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

    // {
    //   title: "Shift",
    //   dataIndex: "shift",
    //   key: "shift",
    //   align: 'center',

    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      // render: (text) => formatDate(text),
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   align:'center'
    // },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "HOD Status",
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
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns = [...baseColumns];

  // Insert the "Reason" column before the "Action" column if `reason` exists
  if (reason) {
    const actionIndex = columns.findIndex((col) => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  let numberOfPages = Math.ceil(printresponseData.length / 1);

  // console.log("pr", printresponseData[0]?.date)

  return (
    <div>
      {contextHolder}
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>
      </Drawer>
      <GlobalStyle />
      <div id="section-to-print">
        <table style={{ width: "95%", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
            <tr>
              <td colSpan="5" rowSpan="4">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <div style={{ textAlign: "center" }}>Unit H </div>
              </td>

              <td colSpan="15" rowSpan="4" style={{ textAlign: "center" }}>
                Shift Wise Stoppage Report Of Sliter Winder
              </td>
              <td colSpan="5">Format No.:</td>
              <td colSpan="5">PH-PRD02/F-017</td>
            </tr>
            <tr>
              <td colSpan="5">Revision No.:</td>
              <td colSpan="5">01</td>
            </tr>
            <td colSpan="5">Ref SOP No.:</td>
            <td colSpan="5">PH-PRD02-D-03</td>
            <tr>
              <td colSpan="5">Page NO.:</td>
              <td colSpan="5"></td>
            </tr>

            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="30"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="3" rowSpan="2" style={{ textAlign: "center" }}>
                Date
              </td>
              <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                Shift
              </td>
              <td colSpan="4" rowSpan="2" style={{ textAlign: "center" }}>
                Product Name
              </td>
              <td colSpan="3" rowSpan="2" style={{ textAlign: "center" }}>
                Order No
              </td>
              <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                Prod in Kg
              </td>
              <td colSpan="8" style={{ textAlign: "center" }}>
                DOWN TIME IN MIN
              </td>
              <td colSpan="6" style={{ textAlign: "center" }}>
                BREAK DOWN IN{" "}
              </td>
              <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                TOTAL TIME IN MIN
              </td>
            </tr>

            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                LC
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                GR Clean
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Others
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Total
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                ER
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                MR
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Total
              </td>
            </tr>

            {SecondResponseData.map((detail, index) => (
              <tr key={index}>
                <td colSpan="3" style={{ textAlign: "center", padding: "4px" }}>
                  {printresponseData[0]?.date
                    ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(printresponseData[0].date))
                    : ""}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.ShiftID || "NA"}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {detail.ProductName || "NA"}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {detail.OrderNo || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.ProdInKg || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.LC_TotalHours || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.SCL_TotalHours + detail.CL_TotalHours || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.MI_TotalHours || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.SCL_TotalHours + detail.CL_TotalHours + detail.MI_TotalHours + detail.LC_TotalHours || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.ER_TotalHours || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.MR_TotalHours || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.ER_TotalHours + detail.MR_TotalHours || "NA"}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {detail.SCL_TotalHours + detail.CL_TotalHours + detail.MI_TotalHours + detail.LC_TotalHours + detail.ER_TotalHours + detail.MR_TotalHours || "NA"}
                </td>
              </tr>
            ))}

            <tr></tr>
            <tr>
              <td colSpan="30">
                Remarks: {printresponseData[0]?.remarks || "NA"}
              </td>
            </tr>

            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>

              <td colSpan="15" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
            </tr>

            <tr>
              <td
                colSpan="15"
                style={{ textAlign: "center", verticalAlign: "buttom" }}
              >
                {printresponseData[0]?.supervisor_sign}
                <br />
                {printresponseData[0]?.supervisor_submit_on
                  ? new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }).format(
                    new Date(printresponseData[0].supervisor_submit_on)
                  )
                  : ""}
                <br />
                <img
                  src={getImage}
                  alt="Supervisor Sign"
                  style={{
                    width: "50px",
                    height: "70px",
                    marginLeft: "20px",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    justifyContent: "space-evenly",
                  }}
                />
              </td>

              <td
                colSpan="15"
                style={{
                  height: "40px",
                  textAlign: "center",
                  verticalAlign: "buttom",
                }}
              >
                {printresponseData[0]?.hod_sign}
                <br />
                {printresponseData[0]?.hod_submit_on
                  ? new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }).format(new Date(printresponseData[0].hod_submit_on))
                  : ""}
                <br />
                <img
                  src={getImage1}
                  alt="Hod Sign"
                  style={{
                    width: "50px",
                    height: "70px",
                    marginLeft: "20px",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    justifyContent: "space-evenly",
                  }}
                />
              </td>
            </tr>
          </tbody>

          <br />

          <tfoot>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="30"></td>
            </tr>

            <tr>
              <td colSpan="6">Particular </td>
              <td colSpan="8">prepared By</td>
              <td colSpan="8">Reviewed By</td>
              <td colSpan="8">Approved By</td>
            </tr>

            <tr>
              <td colSpan="6">Name </td>
              <td colSpan="8"></td>
              <td colSpan="8"></td>
              <td colSpan="8"></td>
            </tr>
            <tr>
              <td colSpan="6">Signature & Date</td>
              <td colSpan="8"></td>
              <td colSpan="8"></td>
              <td colSpan="8"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="SHIFT WISE STOPPAGE REPORT OF SLITER WINDER"
          formatNo="PH-PRD02/F-017"
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
            <PrecotSidebar
              open={open}
              onClose={onClose}
              role={localStorage.getItem("role")}
            />,
          ]}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "16px",
          }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="Medium"
            format="DD/MM/YYYY"
            value={newDate}
            style={{
              fontWeight: "bold",
              width: "135px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
            onChange={(e) => setNewDate(e.target.value)}
            max={getCurrentDate()}
          />

          <Button
            type="primary"
            style={{
              color: "#00308F",
              fontWeight: "bold",
              backgroundColor: "#E5EEF9",
              margin: "10px",
              marginLeft: "60px",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={goTo}
          //disabled={!shift || !OrderNo || !newDate}
          >
            Go To
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={ContaminationData} />

      <Modal
        title="Print"
        open={showModal}
        destroyOnClose={true}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printSubmit}
            disabled={printButtonDisabled}
          >
            Print
          </Button>,
        ]}
      >
        <Input addonBefore="Date" type="date" onChange={handleDateChange} />
      </Modal>
    </div>
  );
};

export default Spunlace_f18_summary;
