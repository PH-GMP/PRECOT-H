/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Row,
  Avatar,
  Col,
  Drawer,
  message,
  Input,
  notification,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import logo from "../Assests/logo.png";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;
const roleBase = localStorage.getItem("role");
const Spunlace_f02_summary = () => {
  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMR No");
  const [cakingData, setCakingData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [formatteddate, setformatteddate] = useState("");
  const [opsignprint, setopsignprint] = useState("");
  const [hodsignprint, sethodsignprint] = useState("");
  const [supsignprint, setsupsignprint] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [printRecord, setPrintRecord] = useState([]);
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] = useState("");
  const [availableshift2, setAvailableShifts2] = useState([]);
  const [availableshiftlov2, setAvailableShiftslov2] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno2, setbatchno2] = useState([]);
  const [batchNolist2, setBatchNolist2] = useState("Select Order No");
  const [batchno, setbatchno] = useState([]);
  const [batchNolist, setBatchNolist] = useState("Select Order No");
  const [date, setdate] = useState("");
  const [date1, setdate1] = useState("");
  const [dateformat_op, setdateformat_op] = useState("");
  const [dateprint, setdateprint] = useState("");
  const [dateformat_supervisor, setdateformat_supervisor] = useState("");
  const [dateformat_hod, setdateformat_hod] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const role = localStorage.getItem("role");
  const [messageApi, contextHolder] = message.useMessage();
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const roleBase = localStorage.getItem("role");
  useEffect(() => {
    fetchdataSummary_f003();

    fetchDataShift();
  }, []);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const fetchdataSummary_f003 = async () => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/getSummarydetailsF002`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setnewData(response.data);
      setmodalData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange_getbatch = (event) => {
    setAvailableBMRnoLov(event.target.value);
  };

  const handleprint_section = async (value) => {
    setBatchNolist2(value);

    axios
      .get(
        `${ API.prodUrl}/Precot/api/spulance/getdetailsForPrintF002?date=${date1}&shift=${availableshiftlov2}&order_no=${value}`,
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

          const formatteddate = moment(res.data.date).format("DD/MM/YYYY");
          setformatteddate(formatteddate);
          const dateformat_op = moment(res.data.operator_submitted_on).format(
            "DD/MM/YYYY HH:mm"
          );
          const dateformat_supervisor = moment(
            res.data.supervisor_submit_on
          ).format("DD/MM/YYYY HH:mm");
          const dateformat_hod = moment(res.data.hod_submit_on).format(
            "DD/MM/YYYY HH:mm"
          );
          setdateformat_op(dateformat_op);
          setdateformat_supervisor(dateformat_supervisor);
          setdateformat_hod(dateformat_hod);
          setdateprint(formatteddate);
          setopsignprint(res.data[0].operator_sign);
          setsupsignprint(res.data[0].supervisor_sign);
          sethodsignprint(res.data[0].hod_sign);
          // console.log("operator_sign",res.data[0]);
          message.success("Data Fetched Successfully");
          // setPrintLaydown(value);
          setIsFetchSuccessful(true);

          //api image for operator
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.operator_sign}`,
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
              setGetImageOP(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });
          //api image for supervisor
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.supervisor_sign}`,
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
              setGetImageSUP(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });
          //api image for supervisor
          axios
            .get(
              `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0]?.hod_sign}`,
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
              setGetImageHOD(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });
        } else {
          setPrintResponseData([]);
          message.error("No data found...!");
          setBatchNolist2(null);
          setIsFetchSuccessful(false);
          return;
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        // console.log("Error", err);
        notification.warning({
          message: "Notification",
          description: err.response.data.message,
        });
      });
  };

  const handleAvailableBMRnoLovChange = (value) => {
    setAvailableBMRnoLov(value);
    setBatchNolist(null); // Clear the batch number list
    // Assuming this is an existing function to fetch data
  };
  const fetchDataShift = async () => {
    try {
      setLoading(true);
      axios
        .get(`${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          // // console.log("Shift details fetched:", res.data);

          setAvailableShifts(res.data);
          setAvailableShifts2(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataOrderNumber = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/spulance/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.map((laydownno) => laydownno.value);
        setbatchno(data);
        setbatchno2(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call API only when both date and shift are selected
   
      fetchDataOrderNumber();
   
  }, []);

  // useEffect(() => {
  //   const fetchDataOrderNumberPrint = async () => {
  //     let shiftparam = "";
  //     if (availableshiftlov2 == "I") {
  //       shiftparam = "1";
  //     } else if (availableshiftlov2 == "II") {
  //       shiftparam = "2";
  //     } else {
  //       shiftparam = "3";
  //     }
  //     try {
  //       setLoading(true);
  //       axios
  //         .get(
  //           `${ API.prodUrl}/Precot/api/spulance/orderByDate?date=${date1}&shift=${shiftparam}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           // // console.log("Shift details fetched:", res.data);
  //           const data = res.data.map((laydownno) => laydownno.value);

  //           setbatchno2(data);
  //           setLoading(false);
  //         });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };
  //   if (date1 && availableshiftlov2) {
  //     fetchDataOrderNumberPrint();
  //   }
  // }, [date1, availableshiftlov2, token]);

  const handleGo = async () => {
    // console.log("vales",availableshiftlov,batchNolist,date)

    if (date == null || date == "Select Date" || date == "[]" || date == 0) {
      message.warning("Please Select Date");
      return;
    } else if (
      availableshiftlov == null ||
      availableshiftlov == "" ||
      availableshiftlov == "[]" ||
      availableshiftlov == "Select Shift" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Shift No");
      return;
    } else if (
      batchNolist == null ||
      batchNolist == "" ||
      batchNolist == "[]" ||
      batchNolist == "Select Order No" ||
      batchNolist == 0
    ) {
      message.warning("Please Select Order No");
      return;
    }

    navigate("/Precot/Spunlace/F-02", {
      state: {
        date: date,
        shift: availableshiftlov,
        order_no: batchNolist,
      },
    });
  };

  const handleViewDetails = (record) => {
    const x = newData.filter((x, i) => {
      return record.headerID === x.header_id;
    });
    setSelectedRow(x);
    setIsModalVisible(true);
  };
  const handlebatchchange = (value) => {
    // console.log('Selected value:', value);
    setBatchNolist2(value);
    handleprint_section(value);
  };

  const handleEdit = (record) => {
    // console.log("wer", record);
    const x = record;

    navigate("/Precot/Spunlace/F-02", {
      state: {
        date: record.date,
        shift: record.shift,
        order_no: record.order_no,
      },
    });
  };

  const handleCreate = () => {
    navigate("/Precot/Spunlace/F-02");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    // window.print();
    setShowModal(true);
  };

  const commonColumns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      render: (text) => (
        <div style={{ padding: "8px", textAlign: "center" }}>{text}</div>
      ),
    },
    {
      title: "Order No",
      dataIndex: "order_no",
      key: "order_no",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Mixing",
      dataIndex: "mixing",
      key: "mixing",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "STD GSM",
      dataIndex: "std_gsm",
      key: "std_gsm",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, x) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const handleModalClose = () => {
    setShowModal(false);
    setdate1(null);
    setAvailableShiftslov2(null);
    setBatchNolist2(null);
  };
  const handleDatePrintChange = (event) => {};
  const printDateSubmit = () => {
    window.print();
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let columns = [...commonColumns];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="PROCESS SETUP VERIFICATION OPENING LINE "
        formatNo="PH-PRD02/F-002"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            Print
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

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Date :
          </div>
          <Input
            type="date"
            style={{ width: "150px" }}
            placeholder="Select Date"
            value={date}
            max={getCurrentDate()}
            onChange={(e) => setdate(e.target.value)}
          />
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Shift :
          </div>
          <Select
            style={{
              width: "150px",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Shift No"
            value={availableshiftlov}
            onChange={(value) => {
              setAvailableShiftslov(value);
            }}
            disabled={
              (roleBase === "ROLE_SUPERVISOR" &&
                selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
              (roleBase === "ROLE_HOD" &&
                selectedRow?.hod_status === "HOD_APPROVED") ||
              (roleBase === "ROLE_QA" &&
                selectedRow?.qa_status === "QA_APPROVED") ||
              (roleBase === "ROLE_DESIGNEE" &&
                selectedRow?.hod_status === "HOD_APPROVED")
            }
          >
            {availableshift.map((shift) => (
              <Option key={shift.id} value={shift.value}>
                {shift.value}
              </Option>
            ))}
          </Select>
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Order No :
          </div>
          <Select
            style={{ width: "150px" }}
            placeholder="Select Order No"
            value={batchNolist}
            onChange={setBatchNolist}
            showSearch
          >
            {batchno.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
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
          dataSource={modalData}
        />
        <div id="section-to-print">
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid #0000",
              padding: "5px",
              paddingTop: "70px",
              scale: "90%",
            }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr>
                <td colSpan="2" rowSpan="4">
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: "40px", height: "20px" }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>Unit H</div>
                </td>
                <th
                  colSpan="6"
                  rowSpan="4"
                  style={{ textAlign: "center", fontSize: 14, width: "50%" }}
                >
                  PROCESS SETUP VERIFICATION OPENING LINE
                </th>
                <td colSpan={3}>Format No.: </td>
                <td colSpan={11} style={{ fontSize: "11px" }}>
                  PH-PRD02/F-002
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Revision No.:</td>
                <td colSpan={11}>01</td>
              </tr>
              <tr>
                <td colSpan={3}>Ref.SOP No.:</td>
                <td colSpan={11}>PH-PRD02-D-03</td>
              </tr>
              <tr>
                <td colSpan={3}>Page No.:</td>
                <td colSpan={10}>1 of 1</td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
            </thead>
            {Array.isArray(printResponseData) &&
              printResponseData.map((item, index) => (
                <tbody>
                  <tr>
                    <td
                      colSpan={7}
                      style={{ paddingLeft: "5px", textAlign: "left" }}
                    >
                      Date :{formatteddate}
                    </td>
                    <td colSpan={13} style={{ textAlign: "left" }}>
                      Shift:{item.shift}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={7} style={{ textAlign: "left" }}>
                      OrderNo:{item.order_no}
                    </td>

                    <td colSpan={13} style={{ textAlign: "left" }}>
                      Material Code:{item.material_code}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={7} style={{ textAlign: "left" }}>
                      Customer Name:{item.customer_name}
                    </td>
                    {/* <td colSpan={5}>Material Code:{item.material_code}</td> */}
                    <td colSpan={11}>STD GSM : {item.std_gsm}</td>
                  </tr>
                  <br />
                  <tr>
                    <th colSpan={4} style={{ fontWeight: "bold" }}>
                      DESCRIPTION
                    </th>
                    <th
                      colSpan={4}
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Std.
                    </th>
                    <th
                      colSpan={5}
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      UNIT
                    </th>
                    <th
                      colSpan={7}
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      SETUP SPEED
                    </th>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      BO- Striper roller speed
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      50 -100
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.bo_striper_roller_speed}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      BO- SPIKED lattice speed
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      50 -100
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.bo_spiked_lattice_speed}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      BO-Wiper roller speed
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      50 -100
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.bo_wiper_roller_speed}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      BO Transport FAN Speed
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      65 -100
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.bo_transport_fan_speed}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={8}
                      style={{ paddingLeft: "5px", fontWeight: "bold" }}
                    >
                      WBO
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      WBO-1
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      WBO-2
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      SCALE SETTING
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      RATIO
                    </td>

                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.scale_setting_1}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.scale_setting_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      TOTAL WEIGHT
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      GRAMS/CYCLE
                    </td>
                    <td colSpan={14} style={{ textAlign: "center" }}>
                      {item.total_weight_1}
                    </td>
                    {/* <td colSpan={7} style={{textAlign:"center"}}> 
              {item.total_weight_2}
              </td> */}
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      WBO-1
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      2000-3000
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      Grams
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.wbo_1_1}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.wbo_1_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      WBO-2
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      1200 - 2200
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      Grams
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.wbo_2_1}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.wbo_2_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      WBO - Stripper roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      50 - 100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.wbo_stripper_roller_speed_1}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.wbo_stripper_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      WBO - SPIKED lattice speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      50 - 100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.wbo_spiked_lattice_speed_1}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.wbo_spiked_lattice_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      WBO - Wiper roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      50 - 100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.wbo_wiper_roller_speed_1}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.wbo_wiper_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      CMO Feed roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      75-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={12} style={{ textAlign: "center" }}>
                      {item.cmo_feed_roller_speed}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Transport Fan speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      65-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={12} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={20} style={{ paddingLeft: "5px" }}>
                      Feed roller speed
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Feed roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      75-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={12} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_for}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Transport Fan speed{" "}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      85-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={12} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed_for}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ paddingLeft: "5px" }}>
                      Fine Opener ALC
                    </td>
                    {/* <td  colSpan={3} style={{paddingLeft:"5px"}}></td>
              <td  colSpan={2} style={{paddingLeft:"5px"}}></td> */}
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      ALC-1
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      ALC-2
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Feed roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      80-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_foa}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_foa_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Transport Fan speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      80-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed_foa}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed_foa_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ paddingLeft: "5px" }}>
                      Pre-Opener-Reiter
                    </td>

                    <td colSpan={5} style={{ textAlign: "center" }}>
                      R-1{" "}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      R1-2
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Feed roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      20-30
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_por}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_por_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Transport Fan{" "}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      85-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed_por}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed_por_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ paddingLeft: "5px" }}>
                      Pre-Opener -ALC
                    </td>

                    <td colSpan={5} style={{ textAlign: "center" }}>
                      ALC-1
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      ALC-2
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Feed roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      1.5-30
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_poa}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_poa_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Transport Fan speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      60-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      %
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed_poa}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.transport_fan_speed_poa_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ paddingLeft: "5px" }}>
                      REITER CARDING
                    </td>

                    <td colSpan={5} style={{ textAlign: "center" }}>
                      R-1
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      R-2
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Reiter Chute feed Roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      950- 1150
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      RPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.reiter_chute_feed_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.reiter_chute_feed_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Feed roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      950- 1150
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      RPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_rc}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.feed_roller_speed_rc_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Licker in speed{" "}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      1300 - 1500
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      RPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.licker_in_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.licker_in_speed_2}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Flat speed{" "}
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      0.15 - 2.0
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.flat_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.flat_speed_2}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Condenser roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      01-02
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.condenser_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.condenser_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Reiter Card -1 Delivery speed (Doffer)
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      0.6 - 1.5
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.reiter_card_1_delivery_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.reiter_card_1_delivery_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ paddingLeft: "5px" }}>
                      AIR LAY CARDING
                    </td>

                    <td colSpan={5} style={{ textAlign: "center" }}>
                      ACL-1
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      ALC-2
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      AlC - Top chute pressure
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      450-600
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.alc_top_chute_pressure}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.alc_top_chute_pressure_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - Bottom chute pressure
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      60-100
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.alc_bottom_chute_pressure}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.alc_bottom_chute_pressure_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - Feed Roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      1.5 - 3.0
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.alc_feed_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.alc_feed_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - K1 Roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      60 - 80
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.alc_k1_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.alc_k1_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - K2 Roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      180 - 220
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.alc_k2_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.alc_k2_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - K3 Roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      600 - 640
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.alc_k3_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.alc_k3_roller_speed_2}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - Turbo Roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      2300 - 2500
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.turbo_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.turbo_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - Press roller speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      35 - 45
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.press_roller_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.press_roller_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      ALC - Mesh belt speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      35 - 45
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.mesh_belt_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.mesh_belt_speed_2}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ paddingLeft: "5px" }}>
                      Collecting belt speed
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      18 -60
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      MPM
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {item.collecting_belt_speed}
                    </td>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      {item.collecting_belt_speed_2}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      Operator Sign & Date
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Performed by Production Supervisor
                    </td>
                    <td colSpan="11" style={{ textAlign: "center" }}>
                      Reviewed by HOD / Designees
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <div
                        style={{
                          fontSize: "12px !important",
                          height: "100px",

                          textAlign: "center",
                        }}
                      >
                        {printResponseData?.[0]?.operator_sign}
                        <br />
                        {dateformat_op}
                        <br />

                        {getImageOP && (
                          <img
                            src={getImageOP}
                            alt="logo"
                            className="signature"
                          />
                        )}
                      </div>
                    </td>
                    <td colSpan="5">
                      <div
                        style={{
                          fontSize: "12px !important",
                          height: "100px",
                          textAlign: "center",
                        }}
                      >
                        {printResponseData?.[0]?.supervisor_sign}
                        <br></br>
                        {/* <span style={{ marginLeft: '5px', marginRight: '5px' }}> - </span> */}
                        {dateformat_supervisor}
                        <br></br>

                        {getImageSUP && (
                          <img
                            src={getImageSUP}
                            alt="logo"
                            className="signature"
                          />
                        )}
                      </div>
                    </td>
                    <td colSpan="11">
                      <div
                        style={{
                          fontSize: "12px !important",
                          height: "100px",
                          textAlign: "center",
                        }}
                      >
                        {printResponseData?.[0]?.hod_sign}
                        <br></br>
                        {dateformat_hod} <br></br>
                        {getImageHOD && (
                          <img
                            src={getImageHOD}
                            alt="logo"
                            className="signature"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            <tfoot>
              <br />

              <tr>
                <td style={{ padding: "1em" }} colSpan="5">
                  Particulars
                </td>
                <td style={{ padding: "1em" }} colSpan="3">
                  Prepared By
                </td>
                <td style={{ padding: "1em" }} colSpan="7">
                  Reviewed By
                </td>
                <td style={{ padding: "1em" }} colSpan="5">
                  Approved By
                </td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan="5">
                  Name
                </td>
                <td style={{ padding: "1em" }} colSpan="3"></td>
                <td style={{ padding: "1em" }} colSpan="7"></td>
                <td style={{ padding: "1em" }} colSpan="5"></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan="5">
                  Signature & Date
                </td>
                <td style={{ padding: "1em" }} colSpan="3"></td>
                <td style={{ padding: "1em" }} colSpan="7"></td>
                <td style={{ padding: "1em" }} colSpan="5"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <Modal
          title="Print"
          open={showModal}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          footer={[
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: 190,
              }}
              icon={<IoPrint color="#00308F" />}
              key="submit"
              type="primary"
              onClick={printDateSubmit}
              disabled={!isFetchSuccessful}
            >
              Print
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Date :
            </div>
            <Input
              type="date"
              style={{ width: "100%" }}
              placeholder="Select Date"
              value={date1}
              onChange={(e) => setdate1(e.target.value)}
            />
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Shift :
            </div>
            <Select
              style={{
                width: "100%",
                height: "40x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Shift No"
              value={availableshiftlov2}
              onChange={(value) => {
                setAvailableShiftslov2(value);
              }}
              disabled={
                (roleBase === "ROLE_SUPERVISOR" &&
                  selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                (roleBase === "ROLE_HOD" &&
                  selectedRow?.hod_status === "HOD_APPROVED") ||
                (roleBase === "ROLE_QA" &&
                  selectedRow?.qa_status === "QA_APPROVED") ||
                (roleBase === "ROLE_DESIGNEE" &&
                  selectedRow?.hod_status === "HOD_APPROVED")
              }
            >
              {availableshift2.map((shift) => (
                <Option key={shift.id} value={shift.value}>
                  {shift.value}{" "}
                  {/* Display shift value like "I", "II", "III" */}
                </Option>
              ))}
            </Select>
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Order No :
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Order No"
              value={batchNolist2}
              onChange={handleprint_section}
              showSearch
            >
              {batchno2.map((MacLOV, index) => (
                <Option key={index} value={MacLOV}>
                  {MacLOV}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Spunlace_f02_summary;
