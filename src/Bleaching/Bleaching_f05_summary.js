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
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import BleContaminationCheckEdit from "./BleContaminationCheckEdit_f05";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { Tabs, Button, Col, Input, Row, message } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { GoArrowLeft } from "react-icons/go";
import { jwtDecode } from "jwt-decode";

const Bleaching_f05_summary = () => {
  const [ContaminationData, setContaminationData] = useState([]);
  const [reason, setReason] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [phLovPayload, setPhLovPayload] = useState();
  const [phLovPayloads, setPhLovPayloads] = useState();
  const [PHNo, setPHNo] = useState();
  const [PHNos, setPHNos] = useState();
  const [Supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [printresponseData, setPrintResponseData] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData?.[0]?.supervisor_sign;
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
          setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printresponseData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printresponseData?.[0]?.hod_sign;
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
          setLoading(true);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printresponseData,API.prodUrl, token]);

  const navigate = useNavigate();

  

  const handlePrint = () => {
    setShowModal(true);
  };

  
  // const printDateSubmit = () => {
  //   setLoading(true); 
  //   checkDateExists();
    
  // };

  const printDateSubmit = async () => {
    setLoading(true);  // Set loading to true when the submit button is clicked
    try {
      await checkDateExists();  // Your existing function for checking the date
    } finally {
      setLoading(false);  // Set loading to false after data is fetched
    }
  }

  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
  };

  const phOnChanges = (value) => {
    const a = phLovPayloads.filter((x, i) => {
      return value == x.value;
    });
    console.log("PHNOs", a[0].value);
    setPHNos(a[0].value);

    setSupplier(a[0].descriptions);
    setDate(a[0].date);
  };

  const checkDateExists = async () => {
    try {
      const printByDate = PrintByDate;
      const date = new Date(printByDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
      const year = date.getFullYear();
      const customDate = `${formattedDay}/${formattedMonth}/${year}`;

      if (!PHNos) {
        message.warning("Please select a PH NO & Date");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/getByDateF05?phNo=${PHNos}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.length === 0) {
        message.warning("No data available to print.");
        setPHNos(null);
        setShowModal(false);
        setLoading(false);
        return;
      } else {
        setPrintResponseData(response.data);
        //setLoading(true)
        setTimeout(() => {
          // setLoading(false)
          setLoading(false);
          window.print();
        }, 1000);
      }

      // if (response.data && response.data.length > 0) {
      //   setPrintResponseData(response.data);
      // } else {
      //   setPrintResponseData([]);
      // }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      setLoading(false); 
    }
    // finally {
    //   setPrintByDate('');
    // setPHNos(null);
    //   setShowModal(false);
    // }
  };
  // console.log("print", printresponseData);
  // useEffect(() => {
  //   if (printresponseData.length > 0 && loading === true) {
  //     setLoading(false);
  //     setPrintByDate('');
  //     setPHNos(null);
  //     window.print();
  //   }
  // }, [printresponseData]);

  // console.log("selected print date");
  const handleprintSave = () => {
    // Handle save logic here
    setShowModal(false);
  };

  // useEffect(() => {
  //   if (token) {
  //     fetchData();
  //   }
  // }, [token]);

  const goTo = () => {
    if (PHNo == "" || PHNo == null) {
      // setError('Please select a date');
      message.warning("Please Enter PHNo");
      return;
    }
    navigate("/Precot/Bleaching/F-05", {
      state: {
        phnos: PHNo,
        supplier: Supplier,
        date: date,
      },
    });
    // console.log("PHno", PHNo);
    // console.log("Supplier", Supplier);
    // console.log("date", date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = "";
        if (role === "ROLE_SUPERVISOR") {
          apiUrl = `${API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/getAllSupervisorNotSubmitted`;
        } else if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
          apiUrl = `${API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/getAllHodNotSubmitted`;
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

        // console.log("Fetched data:", data); // Log the fetched data to inspect its structure

        if (!data || !Array.isArray(data)) {
          throw new Error("Data is not an array or undefined");
        }

        setnewData(data);
        setmodalData(data);

        setContaminationData(
          data.map((item) => ({
            key: item.header_id, // Assuming header_id is unique
            formatName: item.formatName,
            formatNo: item.formatNo,
            revisionNo: item.revisionNo,
            date: item.date,

            supplier: item.supplierName,
            id: item.id,
            phno: item.phNo,
            status: item.status,
            hod_status: item.hod_status,
            supervisor_status: item.supervisor_status,
            mailstatus: item.mail_status,
            reason: item.reason,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Ensure this dependency array is correct for your use case

  useEffect(() => {
    const findReason = () => {
      for (const data of ContaminationData) {
        if (data.hod_status == "HOD_REJECTED") {
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

  const isSubmitDisabled = !PHNos;

  console.log("PrintByDate", PrintByDate);

  const printSubmit = () => {
    window.print();
  };

  useEffect(() => {
    // console.log("modal", modalData);
  }, [modalData]);

  // const fetchData = async () => {
  //   try {set
  //     const response = await axios.get(
  //       "https://secure.focusrtech.com:5050/Precot/api/bleaching/Service/BleachContRawCotton/GetAll",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setnewData(response.data);
  //     setmodalData(response.data);

  // };

  const handleViewDetails = (record) => {
    // console.log("View Details:", record);

    const x = newData.filter((x) => record.id == x.id);
    // console.log("Filtered Data for View:", x);

    setSelectedRow(x);
    // console.log("Slected", selectedRow);
    setIsModalVisible(true);
  };

  const phOnChange = (barkavi) => {
    //  setSupplier(barkavi)
    //  console.log(
    //   "hh",
    //   phLovPayload.filter((x, i) => {
    //     return barkavi == x.value;
    //   })
    // );

    const a = phLovPayload.filter((x, i) => {
      return barkavi == x.value;
    });
    setPHNo(a[0].value);

    setSupplier(a[0].descriptions);
    setDate(a[0].date);
  };

  useEffect(() => {
    const fetchPhLovPayload = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/rawCottonData`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.map((item) => ({
          phNo: item.batchNo,
          value: item.id,
          date: item.date,
          description: item.supplier,
        }));
        const a = response.data.map((x, i) => {
          return {
            value: x.batchNo,
            label: x.batchNo,
            descriptions: x.supplier,
            date: x.date,
          };
        });
        setPhLovPayload(a);
        // console.log("lov", a);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPhLovPayload();
  }, []);

  useEffect(() => {
    const fetchPhLovPayloads = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/summary/fetchApprovedBMR?formNumber=PRD01/F05`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.map((item) => ({
          phNo: item.batchNo,
          value: item.id,
          date: item.date,
          description: item.supplier,
        }));
        const a = response.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
            // descriptions: x.supplier,
            // date: x.date,
          };
        });
        setPhLovPayloads(a);
        // console.log("lov", a);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPhLovPayloads();
  }, []);

  const handleEdit = (record) => {
    // console.log("recorddd", record);

    const { phno, supplier, date } = record;

    navigate("/Precot/Bleaching/F-05", {
      state: {
        phnos: phno,
        supplier: supplier,
        date: date,
      },
    });
  };

  const handleModalClose = () => {
    console.log("Modal closing...");
    console.log("Resetting Date:", PrintByDate);
    console.log("Resetting PHNos:", PHNos);

    setShowModal(false);
    setPrintByDate("");
    setPHNos(null);

    console.log("State after reset:", PrintByDate, PHNos);
  };

  useEffect(() => {
    console.log("State after reset:", { PrintByDate, PHNos });
  }, [PrintByDate, PHNos]);

  const containerStyle = {
    position: "relative",
    marginLeft: "50px",
    marginTop: "30px",
  };
  const beforeStyle = {
    content: '"Select:"',
    zIndex: "9",

    position: "absolute",
    backgroundColor: "#fafafa",
    border: "1px solid #dddd",
    left: "-48px",
    borderRadius: "5px 0px 1px 5px",
    top: "48%",
    padding: "5px",
    transform: "translateY(-50%)",
    marginRight: "8px",
    fontSize: "12px",
    color: "#000",
  };

  // const handleEdit = (record) => {
  //   // console.log("wer", record);
  //   // navigate(`/edit/${record.formatNo}`);

  //   const x = newData.filter((x, i) => {
  //     return record.id == x.id;
  //   });
  //   // console.log("x", x);
  //   setmodalData(x);
  //   setnewModal(true);
  // };

  const handleCreate = () => {
    navigate("/Precot/ContaminationCheck");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new window.Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year} `;
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
      title: "PH NO",
      dataIndex: "phno",
      key: "phNo",
      align: "center",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier",
      key: "supplierName",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      // render: (text) => formatDate(text),
    },
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
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
  } else {
    columns = baseColumns;
  }

  let numberOfPages = Math.ceil(printresponseData.length / 1);

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
      <div id="section-to-print">
        <br />
        {printresponseData.map((item, index) => (
          <table
            key={index}
            style={{
              height: "1000px",
              width: "90%",
            }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="15"></td>
              </tr>
              <tr>
                <td colSpan="2" rowSpan="4" style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  <br></br>
                  Unit H {item[index]}
                </td>

                <td colSpan="7" rowSpan="4" style={{ textAlign: "center" }}>
                  Contamination Checking Report
                  <br />
                  (Raw Cotton)
                </td>
                <td colSpan="3">Format No.:</td>
                <td colSpan="3">PH-PRD01/F-004 </td>
              </tr>
              <tr>
                <td colSpan="3">Revision No.:</td>
                <td colSpan="3">01</td>
              </tr>
              <td colSpan="3">Ref SOP No.:</td>
              <td colSpan="3">PH-PRD01-D-03</td>
              <tr>
                <td colSpan="3">Page NO.:</td>
                <td colSpan="3">
                  {index + 1} of {numberOfPages}
                </td>
              </tr>
            </thead>
            <br />

            <tbody>
              <tr>
                <td colSpan="7">Date: {item.date}</td>
                <td colSpan="8">PH No .: {item.phNo}</td>
              </tr>
              <tr>
                <td colSpan="7">Sample Quantity in Kg: {item.quantity}</td>
                <td colSpan="8">Supplier Name: {item.supplierName}</td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{ Width: "99px", height: "35px", textAlign: "center" }}
                >
                  S.No.
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Types of Contamination
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No of Contamination
                </td>
                {/* <td colSpan="5" style={{ textAlign: "center" }}>
                  Ref. Sample
                </td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Hair
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfHair !== null && item.noOfHair !== undefined
                    ? item.noOfHair
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Jute
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfJute !== null && item.noOfJute !== undefined
                    ? item.noOfJute
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Color Thread
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfColourThread !== null &&
                  item.noOfColourThread !== undefined
                    ? item.noOfColourThread
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                Strapper
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfWrapper !== null && item.noOfWrapper !== undefined
                    ? item.noOfWrapper
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Metal
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfMetal !== null && item.noOfMetal !== undefined
                    ? item.noOfMetal
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Rust
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfRust !== null && item.noOfRust !== undefined
                    ? item.noOfRust
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Plastic
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfPlastic !== null && item.noOfPlastic !== undefined
                    ? item.noOfPlastic
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Black Cotton
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfBlackCotton !== null &&
                  item.noOfBlackCotton !== undefined
                    ? item.noOfBlackCotton
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Oil cotton
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfOilCotton !== null &&
                  item.noOfOilCotton !== undefined
                    ? item.noOfOilCotton
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Soil
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfSoil !== null && item.noOfSoil !== undefined
                    ? item.noOfSoil
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  11
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Yellow Cotton
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfYellowCotton !== null &&
                  item.noOfYellowCotton !== undefined
                    ? item.noOfYellowCotton
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>

              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  12
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Paper
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfPaper !== null && item.noOfPaper !== undefined
                    ? item.noOfPaper
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  13
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Stick
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfStick !== null && item.noOfStick !== undefined
                    ? item.noOfStick
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  14
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Feather
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfFeather !== null && item.noOfFeather !== undefined
                    ? item.noOfFeather
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  15
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Cloth
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfCloth !== null && item.noOfCloth !== undefined
                    ? item.noOfCloth
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  16
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                White Poly Propylene
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfwhitePolyPropylene !== null &&
                  item.noOfwhitePolyPropylene !== undefined
                    ? item.noOfwhitePolyPropylene
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  17
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                Color Poly Propylene
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfColourPolyPropylene !== null &&
                  item.noOfColourPolyPropylene !== undefined
                    ? item.noOfColourPolyPropylene
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="1" style={{ textAlign: "center" }}>
                  18
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                Rubber Piece
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.noOfRubberPiece !== null &&
                  item.noOfRubberPiece !== undefined
                    ? item.noOfRubberPiece
                    : 0}
                </td>
                {/* <td colSpan="5"></td> */}
              </tr>
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Total
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {" "}
                  {item.total}
                </td>
                {/* <td colSpan="5"> {item.refTotal}</td> */}
              </tr>
              <tr>
                <td colSpan="7" style={{ textAlign: "center", height: "50%" }}>
                  Performed by Production Supervisor
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <div style={{ textAlign: "center" }}>
                    {item.supervisor_sign}
                    <br />
                    {new Date(item.supervisor_submit_on).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                    <br></br>
                    {getImage !== "" && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Supervisor"
                      />
                    )}
                    <br></br>
                    Sign&Date
                  </div>
                </td>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", marginTop: "1%" }}
                >
                  Reviewed by Head of the Department / Designee
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <div style={{ textAlign: "center" }}>
                    {item.hod_sign}
                    <br />
                    {new Date(item.hod_submit_on).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <br></br>
                    {getImage1 !== "" && (
                      <img className="signature" src={getImage1} alt="HOD" />
                    )}
                    <br></br>
                    Sign&Date
                  </div>
                </td>
              </tr>
            </tbody>

            <br />

            <tfoot>
              <tr>
                <td colSpan="3">Particular </td>
                <td colSpan="4">prepared By</td>
                <td colSpan="4">Reviewed By</td>
                <td colSpan="4">Approved By</td>
              </tr>

              <tr>
                <td colSpan="3">Name </td>
                <td colSpan="4"></td>
                <td colSpan="4"></td>
                <td colSpan="4"></td>
              </tr>
              <tr>
                <td colSpan="3">Signature & Date</td>
                <td colSpan="4"></td>
                <td colSpan="4"></td>
                <td colSpan="4"></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="CONTAMINATION CHECKING REPORT "
          formatNo="PH-PRD01/F-004"
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[
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
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "16px",
          }}
        >
          <Select
            showSearch
            placeholder="PH NO"
            id="ph-select"
            options={phLovPayload}
            onChange={phOnChange}
            value={PHNo}
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",

              width: "200px", // Adjust the width as needed
            }}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />

          <Button
            type="primary"
            style={{
              backgroundColor: PHNo ? "#E5EEF9" : "#f5f5f5",
              color: "#00308F",
              fontWeight: "bold",
              backgroundColor: "#E5EEF9",
              margin: "10px",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={goTo}
          >
            Go To
          </Button>
        </div>
      </div>

      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
      <Select
        placeholder="PH NO"
        id="ph-select"
        options={phLovPayload}
        onChange={phOnChange}
        value={PHNo}
        size="medium"
        style={{
          backgroundColor: "#E5EEF9",
          fontWeight: "bold",
          marginRight: "10px",
          marginLeft: "10px",
          width: "200px", // Adjust the width as needed
        }}
      />
      
      <Button
        type="primary"
        style={{
          backgroundColor: PHNo ? "#E5EEF9" : "#f5f5f5",
          color: PHNo ? "#00308F" : "#d9d9d9",
          fontWeight: "bold",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        shape="round"
        icon={< BiNavigation color={PHNo ? "#00308F" : "#d9d9d9"} />}
        onClick={goTo}
        disabled={!PHNo} 
      >
        GoTo
      </Button>







 */}

      {/* {localStorage.getItem("role") == "ROLE_SUPERVISOR" ? (  
         
           <Button
           type="primary"
           style={{
             backgroundColor: "#E5EEF9",
             color: "#00308F",
             fontWeight: "bold",
             marginRight:"10px",
           }}
           shape="round"
           icon={<PlusOutlined color="#00308F" />}
           onClick={handleCreate}
         >
          Create
         </Button>
          ) : null}   */}
      {/* <Button
           type="primary"
           style={{
             backgroundColor: "#E5EEF9",
             color: "#00308F",
             fontWeight: "bold",
             marginRight:"10px",
             // display: saveBtnStatus ? "block" : "none",
           }}
           onClick={handleBack}
           shape="round"
           icon={<GoArrowLeft color="#00308F" />}
         >
           &nbsp;Back
         </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight:"10px",
              // display: printBtnStatus ? "block" : "none",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            &nbsp;Print
          </Button>

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
        
      </div> */}
      <Table columns={columns} dataSource={ContaminationData} />
      <Modal
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>View Details</span>
            {/* {selectedRow && selectedRow[0].supervisor_status === "SUPERVISOR_APPROVED" && selectedRow[0].hod_status === "HOD_APPROVED" && ( */}
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: "20px",
              }}
              disabled={isSubmitDisabled}
              shape="round"
              icon={<IoPrint color="#00308F" />}
              onClick={handlePrint}
              
            >
              &nbsp;Print
            </Button>
            {/* )} */}
          </div>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="modal-content">
          <p>Unit: {selectedRow && selectedRow[0].unit}</p>
          <p>Format Name: {selectedRow && selectedRow[0].formatName}</p>
          <p>Format No: {selectedRow && selectedRow[0].formatNo}</p>
          <p>Date: {selectedRow && selectedRow[0].date}</p>
          <p>Revision No:{selectedRow && selectedRow[0].revisionNo}</p>
          <p>RefSop No:{selectedRow && selectedRow[0].refSopNo}</p>
          <p>PH No:{selectedRow && selectedRow[0].phNo}</p>
          <p>Quantity:{selectedRow && selectedRow[0].quantity}</p>
          <p>SupplierName:{selectedRow && selectedRow[0].supplierName}</p>
          <p>Hair : {selectedRow && selectedRow[0].noOfHair}</p>
          <p>Hair Sample: {selectedRow && selectedRow[0].refHair}</p>
          <p>Jute : {selectedRow && selectedRow[0].noOfJute}</p>
          <p>Jute Sample: {selectedRow && selectedRow[0].refJute}</p>
          <p>Color Thread : {selectedRow && selectedRow[0].noOfColourThread}</p>
          <p>
            Color Thread Sample: {selectedRow && selectedRow[0].refColourThread}
          </p>
          <p>Wrapper : {selectedRow && selectedRow[0].noOfWrapper}</p>
          <p>Wrapper Sample: {selectedRow && selectedRow[0].refWrapper}</p>
          <p>Metal : {selectedRow && selectedRow[0].noOfMetal}</p>
          <p>Metal Sample: {selectedRow && selectedRow[0].refMetal}</p>
          <p>Rust : {selectedRow && selectedRow[0].noOfRust}</p>
          <p>Rust Sample: {selectedRow && selectedRow[0].refRust}</p>
          <p>Plastic : {selectedRow && selectedRow[0].noOfPlastic}</p>
          <p>Plastic Sample: {selectedRow && selectedRow[0].refPlastic}</p>
          <p>Black cotton : {selectedRow && selectedRow[0].noOfBlackCotton}</p>
          <p>
            Black cotton Sample: {selectedRow && selectedRow[0].refBlackCotton}
          </p>
          <p>Oil cotton : {selectedRow && selectedRow[0].noOfOilCotton}</p>
          <p>Oil cotton Sample: {selectedRow && selectedRow[0].refOilCotton}</p>
          <p>Yellow cotton: {selectedRow && selectedRow[0].noOfYellowCotton}</p>
          <p>
            Yellow cotton Sample:{" "}
            {selectedRow && selectedRow[0].refYellowCotton}
          </p>
          <p>Soil : {selectedRow && selectedRow[0].noOfSoil}</p>
          <p>Soil Sample: {selectedRow && selectedRow[0].refSoil}</p>
          <p>Paper : {selectedRow && selectedRow[0].noOfPaper}</p>
          <p>Paper Sample: {selectedRow && selectedRow[0].refPaper}</p>
          <p>Stick : {selectedRow && selectedRow[0].noOfStick}</p>
          <p>Stick Sample: {selectedRow && selectedRow[0].refStick}</p>
          <p>Feather : {selectedRow && selectedRow[0].noOfFeather}</p>
          <p>Feather Sample: {selectedRow && selectedRow[0].refFeather}</p>
          <p>Cloth : {selectedRow && selectedRow[0].noOfCloth}</p>
          <p>Cloth Sample: {selectedRow && selectedRow[0].refCloth}</p>
          <p>
            whitePolyPropylene :{" "}
            {selectedRow && selectedRow[0].noOfwhitePolyPropylene}
          </p>
          <p>
            whitePolyPropylene Sample:{" "}
            {selectedRow && selectedRow[0].refWhitePolyPropylene}
          </p>
          <p>
            ColourPolyPropylene:{" "}
            {selectedRow && selectedRow[0].noOfColourPolyPropylene}
          </p>
          <p>
            ColourPolyPropylene Sample:{" "}
            {selectedRow && selectedRow[0].refColourPolyPropylene}
          </p>
          <p>RubberPiece : {selectedRow && selectedRow[0].noOfRubberPiece}</p>
          <p>
            RubberPiece Sample: {selectedRow && selectedRow[0].refRubberPiece}
          </p>
          <p>Total : {selectedRow && selectedRow[0].total}</p>
          <p>Total Sample: {selectedRow && selectedRow[0].refTotal}</p>
          <p>
            SupervisorSign : {selectedRow && selectedRow[0].supervisor_sign}
          </p>
          <p>HodSign: {selectedRow && selectedRow[0].hod_sign}</p>
          <p>
            SupervisorStatus : {selectedRow && selectedRow[0].supervisor_status}
          </p>
          <p>HODStatus : {selectedRow && selectedRow[0].hod_status}</p>

          {/* Repeat similar structures for other sections */}
        </div>
      </Modal>

      <Modal
        title="Print"
        open={showModal}
        destroyOnClose={true}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            loading={loading}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>,
        ]}
      >
        {/* <Input 
    addonBefore="Date" 
    type="date" 
    onChange={handleDateChange} 
    
  /> */}
        <div style={containerStyle}>
          <div style={beforeStyle}>PH No</div>
          <Select
            showSearch
            placeholder="PH NO"
            id="ph-select"
            options={phLovPayloads}
            onChange={phOnChanges}
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              width: "415px",
              marginLeft: "1px",
            }}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
      </Modal>

      {/* <Modal
        title="Print"
        open={showModal}
        destroyOnClose={true}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="submit" type="primary" onClick={printDateSubmit}
            >
            Submit
          </Button>,
        ]}
      >
        {" "}
        <Input addonBefore="Date" type="date" onChange={handleDateChange} />
        <div style={containerStyle}>
        <div style={beforeStyle}>PH No</div>
  
  <Select
    showSearch
    
    placeholder="PH NO"
    id="ph-select"
    options={phLovPayloads}
    onChange={phOnChanges}
    // value={PHNos}
    size="medium"
    style={{
      backgroundColor: "#E5EEF9",
      fontWeight: "bold",
      width: "415px",
      marginLeft:"1px"
    }}
    filterOption={(input, option) =>
      option.label.toLowerCase().includes(input.toLowerCase())
    }
  />
</div>

  

      

      </Modal> */}

      {/* <Modal
        title="Edit Form"
        visible={newModal}
        onCancel={() => setnewModal(false)}
        width="100vw"
      >
        <BleContaminationCheckEdit data={modalData} />
      </Modal> */}
    </div>
  );
};

export default Bleaching_f05_summary;
