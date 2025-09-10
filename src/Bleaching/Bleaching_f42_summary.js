/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Col,
  Avatar,
  Row,
  Drawer,
  message,
  notification,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { EditOutlined } from "@ant-design/icons";
import { BiLock, BiNavigation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
// import { CgLayoutGrid } from "react-icons/cg";
import API from "../baseUrl.json";
import "./style.css";
// import { IoIosArrowBack, IoIosNavigate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate, IoPrint } from "react-icons/io5";
const { Option } = Select;

const Bleaching_f42_summary = () => {
  const [cakingData, setCakingData] = useState([]);
  const role = localStorage.getItem("role");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [allBMRno, setAllBMRno] = useState([]);
  const [newData, setNewData] = useState();
  const [availableBMRnoLov, setAvailableBMRnoLov] =
    useState("Select LaydownNo");
  const [availableLaydownno, setLaydownnoSelect] = useState([]);
  const [availableLaydownLov, setAvailableLaydownLov] =
    useState("Select LaydownNo");
  const [PrintLaydown, setPrintLaydown] = useState(null);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [Bmrnolist, setBMRNO] = useState("");
  const [laydownResponse, setLaydownResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [reason, setReason] = useState(false);

  const formattedDate = () => {
    if (printResponseData?.[0]?.hod_submit_on) {
      const date = moment(printResponseData?.[0]?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (printResponseData?.[0]?.supervisor_submit_on) {
      const date = moment(printResponseData?.[0]?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  //  const GlobalStyle = createGlobalStyle`
  //   @media print {
  //     @page {
  //       size: landscape;
  //     }
  //   }
  // `;

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

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const printDateSubmit = () => {
    window.print();
  };
  useEffect(() => {
    if (token) {
      fetchData();
      fetchDataLOV_BMRNO();
      fetchAllBMRNOAndLayDown();
    }
  }, [token]);
  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };

  const [loading, setLoading] = useState(false);


  const handleDatePrintChange = (value) => {
    setLoading(true); 
    try {
      setPrintLaydown(value);
      axios
        .get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/LayDownChecklistDetailsF42?layDownNo=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setPrintResponseData(res.data);
            // console.log("laydown print value", printResponseData);
            // setPrintLaydown(value);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
          }
        })
        .finally(() => {
          setLoading(false); // Set loading to false when the API call finishes
        })
        .catch((err) => {
          // console.log("Error", err);
          notification.warning({
            message: "Notification",
            description: err.response.data.message,
          });
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
      // Handle the error, e.g., display an error message to the user
      setLoading(false);
    }
  };


  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.supervisor_sign;
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
  }, [printResponseData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.hod_sign;
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
  }, [printResponseData,API.prodUrl, token]);

  // console.log("get image", getImage);

  const fetchDataLOV_BMRNO = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/getMappingLaydown`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvailableBMRno(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  const fetchAllBMRNOAndLayDown = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/summary/fetchApprovedBMR?formNumber=PH-PRD01/F01`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllBMRno(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  const fetchDataBMRwiseLaydown = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/getMapBMR?MappingBmr_No=${availableBMRnoLov}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const laydownNo = response.data[0].bmr_no;
      setLaydownResponse(laydownNo);
      localStorage.setItem("laydownnumber", laydownNo);
      return laydownNo;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    } finally {
    }
  };

  const fetchData = async () => {
    // Start loader

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/LaydownChechListF33Summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCakingData(response.data);
      // console.log("response data", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [cakingData]);

  const handleViewDetails = (record) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    const { bmrNo, layDownNo } = record;
    navigate("/Precot/Bleaching/F-42", {
      state: {
        bmrnos: bmrNo,
        bmrnos2: layDownNo,
      },
    });
  };

  const handleGo = async () => {
    const laydownNo = await fetchDataBMRwiseLaydown();
    if (!laydownNo) {
      message.warning("Please Select BMR");
      return;
    }
    if (laydownNo) {
      // console.log(availableBMRnoLov);
      // console.log("laydownresponse", laydownNo);
      navigate("/Precot/Bleaching/F-42", {
        state: {
          bmrnos: laydownNo,
          bmrnos2: availableBMRnoLov,
        },
      });
    } else {
      console.error("Failed to fetch laydown number.");
    }
  };

  const handleCreate = () => {
    navigate("/Precot/laydownChecklist");
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-42/Summary");
  };

  // const handlePrint = () => {
  //   window.print();
  // };
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
      title: "BMRNO",
      dataIndex: "bmrNo",
      key: "bmrNo",
      align: "center",
    },
    {
      title: "LayDownNo",
      dataIndex: "layDownNo",
      key: "layDownNo",
      align: "center",
    },
    {
      title: "Start Date",
      dataIndex: "layDownStartdate",
      key: "layDownStartdate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Start Time",
      dataIndex: "layDownStartTime",
      key: "layDownStartTime",
      align: "center",
    },
    {
      title: "End Date",
      dataIndex: "layDownEnddate",
      key: "layDownEnddate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "End Time",
      dataIndex: "layDownEndTime",
      key: "layDownEndTime",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
          {/* <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button> */}
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
    columns = [...baseColumns.slice(0, 9), Reason, ...baseColumns.slice(9)];
  } else {
    columns = baseColumns;
  }

  return (
    <div class="laydownchecklist2">
      <GlobalStyle />
      <div id="section-to-print" style={{ fontSize: "11px", padding: "5px" }}>
        <table
          className="laydownchecklist"
          style={{
            fontSize: "11px",
            padding: "5px",
            width: "90%",
            marginTop: 3,
          }}
        >
          <tr>
            <td colSpan="4" rowSpan="5" style={{ textAlign: "center" }}>
              <div>
                {" "}
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "40px", height: "20px" }}
                />
              </div>
              <br></br>
              <div
                style={{ fontFamily: "Times New Roman", textAlign: "center" }}
              >
                Unit H
              </div>
            </td>
            <td colSpan="6" rowSpan="5" style={{ textAlign: "center" }}>
              Lay Down Checklist
            </td>
            <td colSpan="3">Format No.:</td>
            <td colSpan="4">PH-PRD01/F-001</td>
          </tr>
          <tr>
            <td colSpan="3">Revision No.:</td>
            <td colSpan="4">01</td>
          </tr>
          <td colSpan="3">Ref. SOP No.:</td>
          <td colSpan="4">PH-PRD01-D-03</td>
          <tr>
            <td colSpan="3">Page No.:</td>
            <td colSpan="4">1 0f 1</td>
          </tr>
        </table>
        <table
          className="laydownchecklist"
          style={{ fontSize: "11px", padding: "5px", width: "90%" }}
        >
          <tbody>
            <tr>
              <td colSpan="5">Lay down No: </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.layDownNo}
              </td>
              <td colSpan="5">BMRNo: </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.bmrNo}
              </td>
            </tr>
            <tr>
              <td colSpan="5">Lay down Start date :</td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {formatDate(printResponseData?.[0]?.layDownStartdate)}
              </td>
              <td colSpan="5">Lay down End date :</td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {formatDate(printResponseData?.[0]?.layDownEnddate)}
              </td>
            </tr>
            <tr>
              <td colSpan="5">Lay down Start Time:</td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.layDownStartTime}
              </td>
              <td colSpan="5">Lay down End Time:</td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.layDownEndTime}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                S.No.
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                Particular's
              </td>
              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                }}
              >
                Status
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan="9">
                Checking bale conditions (appearance of packing)
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.checkBaleCondition}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan="9">Checks forklift cleanliness</td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.checkForkliftClean}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan="9">Checking the cleanliness of lay down place</td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.checkCleanLayDown}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan="9">Type of straps used for supplied bales</td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.suppliedBales}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan="9">Type of tools used for cutting the straps</td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.toolsForCuttingStraps}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan="9">Type of Packing Material used for cover</td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.packingMaterial}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                7
              </td>
              <td colSpan="9">
                What type of bags are used to handle waste during the lay down
                process ?
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.typeOfBags}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                8
              </td>
              <td colSpan="9">
                After the laydown is completed - Contamination inspection done
                or not ?{" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.contaminationInspection}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                9
              </td>
              <td colSpan="9">
                Are samples of Contamination kept lay down wise for future
                reference ?
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.layDownWise}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                10
              </td>
              <td colSpan="9">
                Do the reference samples contain the following information like{" "}
                <br></br>date, shift ,BMR number?
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.referenceSample}
              </td>
            </tr>
            <tr>
              <td colSpan="3">Remarks :</td>
              <td colSpan="17">{printResponseData?.[0]?.remarks}</td>
            </tr>
          </tbody>
        </table>
        <table style={{ width: "100%", width: "90%" }}>
          <tr>
            <td colSpan="10" style={{ height: "35px", textAlign: "center" }}>
              Performed by Production Supervisor
              <br></br>
              {/* <br></br>
              <br></br> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                <div>
                {getImage !== "" && (
                  <img className="signature" src={getImage} alt="Supervisor" />
                )}
                  <br/>
                    {printResponseData?.[0]?.supervisor_sign}
                    {<br />}
                    {formattedDatesupervisor()}
                  </div>
                  <div>Sign & Date</div>
                </div>
                
              </div>
            </td>

            <td colSpan="10" style={{ textAlign: "center" }}>
              Reviewed By Head of the Department/Designee
              <br></br>
              {/* <br></br>
              <br></br> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                {getImage1 !== "" && (
                  <img className="signature" src={getImage1} alt="HOD" />
                )}
                <br/>
                  {" "}
                  {printResponseData?.[0]?.hod_sign}
                  {<br />}
                  {formattedDate()}
                  <div>Sign & Date</div>
                </div>

                {/* <img
                  src={getImage1}
                  alt="HOD"
                  style={{
                    width: "60px",
                    height: "60px",
                    marginLeft: "20px",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    justifyContent: "space-evenly",
                  }}
                /> */}
                
              </div>
            </td>
          </tr>
          <tr>
            {/* <td
                  colSpan="10"
                  style={{
                    height: "80px",
                    textAlign: "center",
                    marginBottom: "auto",
                    verticalAlign: "bottom",
                  }}
                >
                  <div>{printResponseData?.[0]?.supervisor_sign}{<br/>}{
  printResponseData?.[0]?.supervisor_submit_on
    ? new Date(printResponseData[0].supervisor_submit_on).toLocaleDateString()
    : ""
}</div>
                  <div>Sign & Date</div>
                </td> */}

            {/* <td
                  colSpan="10"
                  style={{ textAlign: "center", verticalAlign: "bottom" }}
                >
                  <div> {printResponseData?.[0]?.hod_sign}{<br/>}{
  printResponseData?.[0]?.supervisor_submit_on
    ? new Date(printResponseData[0].hod_submit_on).toLocaleDateString()
    : ""
}</div>
                  <div>Sign & Date</div>
                </td> */}
          </tr>
        </table>
        <table style={{ marginTop: 5, width: "90%" }}>
          <tr>
            <th colSpan="5">Particular</th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Prepared by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Reviewed by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Approved by</centre>
            </th>
          </tr>
          <tr>
            <th colSpan="5">Name</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <th colSpan="5">Signature & Date</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
        </table>
      </div>
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

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            role === "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <BleachingHeader
        unit="Unit-H"
        formName="LAY DOWN CHECKLIST "
        formatNo="PH-PRD01/F-001"
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={() => navigate("/Precot/choosenScreen")}
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
        ]}
      />
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Select
          style={{ width: "200px" }}
          placeholder="Select BMR  No"
          value={availableBMRnoLov}
          onChange={setAvailableBMRnoLov}
          showSearch
        >
          {availableBMRno.map((Bmrnolist, index) => (
            <Option key={index} value={Bmrnolist.BLEACH_LAYDOWN_NUMBER}>
              {Bmrnolist.BLEACH_LAYDOWN_NUMBER}
            </Option>
          ))}
        </Select>
        <Button
          key="go"
          onClick={handleGo}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          type="primary"
        >
          Go To
        </Button>
      </div>
      <Table
        bordered
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={cakingData}
      />
      <Modal
        title="Print"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
        showSearch
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={printDateSubmit}
            // disabled={!PrintLaydown}
              disabled={loading || !PrintLaydown}
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "8px" }}>Laydown Number:</label>
          <Select
            style={{ width: "200px" }}
            placeholder="Select Laydown No"
            value={PrintLaydown}
            onChange={handleDatePrintChange}
            showSearch
          >
            {allBMRno.map((Bmrnolist, index) => (
              <Option key={index} value={Bmrnolist.value}>
                {Bmrnolist.value}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Bleaching_f42_summary;
