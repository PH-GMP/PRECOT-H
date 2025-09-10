/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import {
  Table,
  Modal,
  Select,
  InputGroup,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";

import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import gif from "../Assests/gif.gif";
import BleachingHeader from "../Components/BleachingHeader";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
// import  './sutharsana.css';

import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";

const Bleaching_f18_summary = () => {
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [bmrOptions, setBmrOptions] = useState([]);
  const [bmrOptionsNew, setBmrOptionsNew] = useState([]);
  const [bmrOptionsValue, setBmrOptionsValue] = useState("");
  const [bmrOptionsValuePrint, setBmrOptionsValuePrint] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [batch_No, setBatch_No] = useState("");
  const [bale_No, setBaleNo] = useState("");
  const [batch_NoPrint, setBatch_NoPrint] = useState("");
  const [bale_NoPrint, setBaleNoPrint] = useState("");
  const [baleOptions, setBaleOptions] = useState([]);
  const [batchNoOptions, setBatchNoOptions] = useState([]);
  const [baleOptionsPrint, setBaleOptionsPrint] = useState([]);
  const [batchNoOptionsPrint, setBatchNoOptionsPrint] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [PrintValue, setPrintValue] = useState(null);
  const [reason, setReason] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const role = localStorage.getItem("role");

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

  useEffect(() => {

    //Filtered API Response
    axios
        .get(
          `${API.prodUrl}/Precot/api/bleaching/summary/fetchApprovedBMR?formNumber=PH-PRD01/F-012`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          }
        )
        .then((res) => {
          console.log("Response:c", res.data);
         const a = res.data.map((x,i) =>{
          return {
            label:x.value,
            value:x.value
          }
         })
          
         console.log("AAAA",a)

         setBmrOptionsNew(a)
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
  },[])

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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const printDateSubmit = () => {
    window.print();
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBmrOptionsValuePrint(null);
    setBaleNoPrint(null);
    setBatch_NoPrint(null);
  };
  const handleBatchSelectChange = (value) => {
    setBatch_No(value);
    // console.log("value of bactch", value);

    fetchBaleOptions(value);
  };
  const handleBatchSelectChangePrint = (value) => {
    setBatch_NoPrint(value);
    // console.log("value of bactch", value);

    fetchBaleOptionsPrint(value);
  };
  const handleBaleSelectChangePrint = (value) => {
    setBaleNoPrint(value);
  };

  const handleBaleSelectChange = (value) => {
    setBaleNo(value);
    if (value) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };
  const handlePrintChange = (value) => {
    try {
      setBaleNoPrint(value);
      axios
        .get(
          `${API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCottonByBmrAndSubbatchAndBale?bmrNo=${bmrOptionsValuePrint}&batchNo=${batch_NoPrint}&baleNo=${value}`,
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
            // console.log("print response", printResponseData);
            // setPrintValue(value);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
          }
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const fetchBaleOptions = async (value) => {
    // console.log("value of fetch", value);
    try {
      const bmr = localStorage.getItem("selectedBmrDescription");
      const response = await fetch(
        `${API.prodUrl}/Precot/api/bleaching/generation/fetchBaleByBatch?batchNo=${value}&bmr_no=${bmr}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // console.log("bale", data);

      if (Array.isArray(data)) {
        setBaleOptions(data);
        // setBaleOptionsPrint(data);
        console.error("API response is not an array", data);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBaleOptions([]);
    }
  };

  const fetchBaleOptionsPrint = async (value) => {
    
    console.log("value of fetch", bmrOptionsValuePrint);
    try {
      const bmr = localStorage.getItem("selectedBmrDescription");
      const response = await fetch(
        `${API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/baleNoLov?bmrNo=${bmrOptionsValuePrint}&batchNo=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // console.log("bale", data);

      if (Array.isArray(data)) {
        setBaleOptionsPrint(data);
        // setBaleOptionsPrint(data);
        console.error("API response is not an array", data);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBaleOptionsPrint([]);
    }
  };
  const fetchBatchOptions = async (value) => {
    try {
      const bmrNolocal = localStorage.getItem("selectedBmrDescription");
      const response = await fetch(
        `${API.prodUrl}/Precot/api/bleaching/generation/fetchBatchByBMR?bmr_no=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // console.log(data);

      if (Array.isArray(data)) {
        setBatchNoOptions(data);
      } else {
        console.error("API response is not an array", data);
        setBatchNoOptions([]);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBatchNoOptions([]);
    }
  };
  const fetchBatchOptionsPrint = async (value) => {
    try {
      const bmrNolocal = localStorage.getItem("selectedBmrDescription");
      const response = await fetch(
        `${API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/batchNoLov?bmrNo=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // console.log(data);

      if (Array.isArray(data)) {
        setBatchNoOptionsPrint(data);
      } else {
        console.error("API response is not an array", data);
        setBatchNoOptionsPrint([]);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
      setBatchNoOptionsPrint([]);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  const goTo = () => {
    if (bmrOptionsValue == "" || bmrOptionsValue == null) {
      message.warning("Please Select BMR");
      return;
    } else if (batch_No == "" || batch_No == null) {
      message.warning("Please Select Batch No");
      return;
    } else if (bale_No == "" || bale_No == null) {
      message.warning("Please Select Bale No");
      return;
    }
    navigate("/Precot/Bleaching/F-18", {
      state: {
        bmrnos: bmrOptionsValue,
        batch: batch_No,
        bale: bale_No,
      },
    });
    // console.log("bbmmrr", bmrOptionsValue);
    // console.log("batchh", batch_No);
  };
  const handleBmrChange = (value) => {
    setBmrOptionsValue(value);
    if (value) {
      localStorage.setItem("selectedBmrDescription", value);
      // setIsButtonDisabled(false);
    } else {
      localStorage.setItem("selectedBmrDescription", "");
      // setIsButtonDisabled(true);
    }
    fetchBatchOptions(value);
  };
  const handleBmrChangePrint = (value) => {
    setBmrOptionsValuePrint(value);
    fetchBatchOptionsPrint(value);
  };

  // const handleBmrChange = (value) => {
  //   setBmrOptionsValue(value);
  //   localStorage.setItem('bmrOptionsValue', value.description); // Store value in local storage
  // };
  // const handleBmrChange = (value) => {
  //   setBmrOptionsValue(value);
  //   const selectedOption = bmrOptions.find(option => option.value === value);
  //   if (selectedOption) {
  //     localStorage.setItem('selectedBmrDescription', selectedOption.description); // Store description in local storage
  //   }
  // };
  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  useEffect(() => {
    const fetchBmrOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/bleaching/generation/getcloseBMR`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        fetchBatchOptions();
        // console.log(data);

        if (Array.isArray(data)) {
          setBmrOptions(data);
        } else {
          console.error("API response is not an array", data);
          setBmrOptions([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setBmrOptions([]);
      }
    };

    fetchBmrOptions();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = "";
      if (role === "ROLE_SUPERVISOR") {
        apiUrl = `${API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/getAllSupervisorNotSubmitted`;
      } else if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
        apiUrl = `${API.prodUrl}/Precot/api/bleaching/Service/BleachAbsCotton/getAllHodNotSubmitted`;
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
      const data = await response.json();

      // console.log("role based get list", data);
      // data.reverse();
      setnewData(response.data);
      setmodalData(response.data);

      setContaminationData(
        data.map((item, index) => ({
          key: item.header_id,
          formatName: item.formatName,
          formatNo: item.formatNo,
          revisionNo: item.revisionNo,
          date: item.date,
          supervisor_status: item.supervisor_status,
          hod_status: item.hod_status,
          unit: item.unit,
          supplier: item.supplierName,
          id: item.id,
          status: item.status,
          mailstatus: item.mailStatus,
          bmrNo: item.bmrNo,
          batchNo: item.batchNo,
          baleNo: item.baleNo,
          reason: item.reason,
          sno: index + 1,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.message);
    } finally {
      // setLoading(false);
    }
  };
  // console.log("model", modalData);

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
  // const handlebmrChange = (value) => {
  //   setBmrOptions(value);
  // };
  //  setBmrOptionsValue=(value)=>{
  //   localStorage.setItem()
  // }
  // useEffect(() => {
  //   localStorage.setItem('bmrOptionsValue', bmrOptionsValue);
  // }, [selectedOption]);

  const handleViewDetails = (record) => {
    // console.log("View Details:", record);

    const x = newData.filter((x) => record.id == x.id);
    // console.log("Filtered Data for View:", x);

    setSelectedRow(x);
    // console.log("Slected", selectedRow);
    setIsModalVisible(true);
  };
  const handleEdit = (record) => {
    // console.log("recorddd", record);

    const { bmrNo } = record;
    const { batchNo } = record;
    const { baleNo } = record;

    navigate("/Precot/Bleaching/F-18", {
      state: {
        bmrnos: bmrNo,
        batch: batchNo,
        bale: baleNo,
      },
    });
  };

  const handleCreate = () => {
    navigate("/Precot/Ble_ContaminationChecking");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
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
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },

    {
      title: "BMR No",
      dataIndex: "bmrNo",
      key: "bmrNo",
      align: "center",
    },
    {
      title: "Batch No",
      dataIndex: "batchNo",
      key: "batchNo",
      align: "center",
    },
    {
      title: "Bale No",
      dataIndex: "baleNo",
      key: "baleNo",
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
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
            disabled={record.status == "SUBMIT" ? true : false}
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
  const userRole = localStorage.getItem("role");
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

  return (
    <div>
      <div id="section-to-print">
        <table style={{ width: "90%", height: "50%", marginTop: "2%" }}>
          <tbody>
            <tr>
              <td colSpan="3" rowspan="4 " style={{ textAlign: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <br></br>
                <br></br>
                Unit H
              </td>
              <th colSpan="7" rowSpan="4" style={{ textAlign: "center" }}>
                Contamination Checking Report
                <br />
                (Absorbent Bleached Cotton)
              </th>
              <td colSpan="2">Format No.:</td>
              <td colSpan="3">PH-PRD01/F-012</td>
            </tr>
            <tr>
              <td colSpan="2">Revision No.:</td>
              <td colSpan="3">01</td>
            </tr>
            <td colSpan="2">Ref. SOP No.:</td>
            <td colSpan="3">PH-PRD01-D-03</td>
            <tr>
              <td colSpan="2">Page NO.:</td>
              <td colSpan="3">1 of 1</td>
            </tr>{" "}
          </tbody>
        </table>
        <br></br>
        <table style={{ width: "90%", height: "50%" }}>
          <tbody>
            <tr>
              <td colspan="8" style={{ height: "15px", paddingLeft: "8px" }}>
                Date:
                {printResponseData?.[0]?.date && (
                  <span>
                    {new Date(printResponseData?.[0]?.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </span>
                )}
              </td>

              <td colspan="7" style={{ paddingLeft: "8px" }}>
                BMR No:{printResponseData?.[0]?.bmrNo}
              </td>
            </tr>
            <tr>
              <td colspan="5" style={{ height: "15px", paddingLeft: "8px" }}>
              Sample Quantity in Kg :{printResponseData?.[0]?.quantity}
              </td>
              {/* <td colspan="2">{printResponseData?.[0]?.quantity} </td> */}
              <td
                colspan="5"
                style={{ paddingLeft: "8px", textAlign: "center" }}
              >
                Batch No:{printResponseData?.[0]?.batchNo}
              </td>
              {/* <td colspan="3">{printResponseData?.[0]?.batchNo} </td> */}
              <td
                colspan="5"
                style={{ paddingLeft: "8px", textAlign: "center" }}
              >
                Bale No:{printResponseData?.[0]?.baleNo}
              </td>
              {/* <td colspan="3">{printResponseData?.[0]?.baleNo}</td> */}
            </tr>
            <tr>
              <td
                style={{
                  wight: "10px !important",
                  height: "15px",
                  textAlign: "center",
                }}
              >
                S.No.
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Types of Contamination
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No .of Contamination
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                Ref .Sample
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                1
              </td>
              <td colSpan="4">Hair</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.[0]?.noOfHair ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}></td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                2
              </td>
              <td colSpan="4">Jute</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfJute ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refJute}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                3
              </td>
              <td colSpan="4">Colour Threads</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfColourThread ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refColourThread}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                4
              </td>
              <td colSpan="4">Wrapper</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfWrapper ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refWrapper}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                5
              </td>
              <td colSpan="4">Metal piece</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfMetal ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refMetal}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                6
              </td>
              <td colSpan="4">Brown/Rusty cotton</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfRust ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refRust}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                7
              </td>
              <td colSpan="4">Plastic</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfPlastic ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refPlastic}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                8
              </td>
              <td colSpan="4">Black Cotton</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfBlackCotton ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refBlackCotton}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                9
              </td>
              <td colSpan="4">Unbleached cotton</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfUnBleachedCotton ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refUnBleachedCotton}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                10
              </td>
              <td colSpan="4">Oil cotton</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfOilCotton ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refOilCotton}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                11
              </td>
              <td colSpan="4">Soils</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.[0]?.noOfSoil ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refSoil}
              </td> */}
            </tr>

            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                12
              </td>
              <td colSpan="4">Yellow Cotton</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.[0]?.noOfYellowCotton ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refYellowCotton}
              </td> */}
            </tr>

            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                13
              </td>
              <td colSpan="4">Paper</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfPaper ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refPaper}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                14
              </td>
              <td colSpan="4">Stick</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.[0]?.noOfStick ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refStick}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                15
              </td>
              <td colSpan="4">Feather</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfFeather ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refFeather}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                16
              </td>
              <td colSpan="4">Cloth</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfCloth ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refCloth}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                17
              </td>
              <td colSpan="4">White Poly Propylene</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfwhitePolyPropylene ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refWhitePolyPropylene}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                18
              </td>
              <td colSpan="4">Colour Poly Propylene</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfColourPolyPropylene ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refColourPolyPropylene}
              </td> */}
            </tr>
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                19
              </td>
              <td colSpan="4">Rubber Piece</td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {printResponseData?.[0]?.noOfRubberPiece ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {selectedRow && selectedRow[0].refRubberPiece}
              </td> */}
            </tr>
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                TOTAL:
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                {" "}
                {printResponseData?.[0]?.total ?? 0}
              </td>
              {/* <td colSpan="5" style={{ textAlign: "center" }}>
                {" "}
                {selectedRow && selectedRow[0].refTotal}
              </td> */}
            </tr>

            <tr>
              <th colSpan="7" style={{ textAlign: "center", height: "25%" }}>
                Performed by Production Supervisor
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {/* <div style={{ fontSize: "12px !important" }}>{printResponseData?.[0]?.supervisor_sign}
          <br></br>
          {printResponseData?.[0]?.supervisor_submit_on && new Date(printResponseData?.[0]?.supervisor_submit_on).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
   
})}
</div> Sign&Date</th> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div>
                      {printResponseData?.[0]?.supervisor_sign}
                      {<br />}
                      {printResponseData?.[0]?.supervisor_submit_on &&
                        new Date(
                          printResponseData?.[0]?.supervisor_submit_on
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </div>
                    <div>Sign & Date</div>
                  </div>
                  {getImage !== "" && (
                  <img className="signature"
                    src={getImage}
                    alt="Supervisor"
                    
                  />)}
                </div>
              </th>
              <th colSpan="8" style={{ textAlign: "center", height: "25%" }}>
                Reviewed by HOD/Designee
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {/* <div style={{ fontSize: "12px !important" }}>{printResponseData?.[0]?.hod_sign}

        <br></br>
        {printResponseData?.[0]?.hod_submit_on && new Date(printResponseData?.[0]?.hod_submit_on).toLocaleDateString('en-GB' , {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
   
})}
        
        </div> Sign&Date</th> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    {" "}
                    {printResponseData?.[0]?.hod_sign}
                    {<br />}
                    {printResponseData?.[0]?.hod_submit_on &&
                      new Date(
                        printResponseData?.[0]?.hod_submit_on
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    <div>Sign & Date</div>
                  </div>
                  {getImage1 !== "" && (
                  <img className="signature"
                    src={getImage1}
                    alt="HOD"
                    
                  />
                  )}
                </div>
              </th>
            </tr>

            <tr>
              {/* <th colSpan="7" style={{ height: "70px", textAlign: "center", marginBottom: "auto", verticalAlign: "bottom" }}>
        <div style={{ fontSize: "12px !important" }}>{printResponseData?.[0]?.supervisor_sign}
          <br></br>
    
        {printResponseData?.[0]?.supervisor_submit_on && new Date(printResponseData?.[0]?.supervisor_submit_on).toLocaleDateString('en-GB')}</div>
        <div style={{ fontSize: "12px !important" }}> Sign & Date</div></th> */}

              {/* <th colSpan="8" style={{ textAlign: "center", verticalAlign: "bottom" }}>

        <div style={{ fontSize: "12px !important" }}>{printResponseData?.[0]?.hod_sign}
    
        <br></br>
        {printResponseData?.[0]?.hod_submit_on && new Date(printResponseData?.[0]?.hod_submit_on).toLocaleDateString('en-GB')}</div>
        <div style={{ fontSize: "12px !important" }}>Sign & Date</div></th> */}
            </tr>
          </tbody>
        </table>
        <br></br>
        <table style={{ width: "90%", height: "50%" }}>
          <tbody>
            <tr>
              <th colSpan="3">Particular</th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Prepared by
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Reviewed by
              </th>
              <th colSpan="4" style={{ textAlign: "center" }}>
                Approved by
              </th>
            </tr>
            <tr>
              <th colSpan="3">Name</th>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
            </tr>
            <tr>
              <th colSpan="3">Signature & Date</th>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* {
        loading == true ?
          <div style={{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            backgroundColor: 'rgba(233,242,234,.3)',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
           
          </div>
          : null
      } */}
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
            localStorage.getItem("role") == "ROLE_QA"
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
                        Choosen Screen
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
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Raw Material Isuue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "6",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
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
                        Choosen Screen
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
                        onClick={() => navigate("/Precot")}
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

      <div
        style={{
          // display: "flex",
          // justifyContent: "flex-end",
          marginBottom: "40px",
          marginTop: "20px",
        }}
      >
        <BleachingHeader
          unit="Unit-H"
          formName="CONTAMINATION CHECKING REPORT (ABSORBENT BLEACHED COTTON)"
          formatNo="PH-PRD01/F-012"
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
                // eslint-disable-next-line no-unused-expressions
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
        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
          }}
        >
          <Col>
            <label>BMR Number:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={bmrOptionsValue}
              onChange={handleBmrChange}
              style={{ width: "100%" }}
              placeholder="Search BMR Number"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select BMR Number
              </Select.Option>
              {bmrOptions.map((option) => (
                <Select.Option
                  key={option.bleach_bmr_no}
                  value={option.bleach_bmr_no}
                >
                  {option.bleach_bmr_no}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            {" "}
            <label>Batch No:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={batch_No}
              onChange={handleBatchSelectChange}
              style={{ width: "100%" }}
              placeholder="Search Batch No"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Batch No
              </Select.Option>
              {batchNoOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.description}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <label>Bale No:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={bale_No}
              onChange={handleBaleSelectChange}
              style={{ width: "100%" }}
              placeholder="Search Bale NO"
              optionFilterProp="children"
              required
            >
              <Select.Option value="" disabled selected>
                Select Bale NO
              </Select.Option>
              {baleOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.description}
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

      <Table
        bordered
        style={{
          textAlign: "center",
          width: "100%",
        }}
        columns={columns}
        dataSource={ContaminationData}
      />
      <Modal
        title="Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={<Button onClick={handlePrint}>Print</Button>}
      >
        <div className="f18">
          {/* <p>Unit: {modalData && modalData[0].unit}</p> */}
          <p>Format Name: {selectedRow && selectedRow[0].formatName}</p>
          <p>Format No: {selectedRow && selectedRow[0].formatNo}</p>
          <p>Date: {selectedRow && selectedRow[0].date}</p>
          <p>Revision No:{selectedRow && selectedRow[0].revisionNo}</p>
          <p>RefSop No:{selectedRow && selectedRow[0].refSopNo}</p>
          <p> Bmr No: {selectedRow && selectedRow[0].bmrNo}</p>
          <p>Quantity:{selectedRow && selectedRow[0].quantity}</p>
          <p>Hair : {selectedRow && selectedRow[0].noOfHair}</p>
          <p>Jute : {selectedRow && selectedRow[0].noOfJute}</p>

          <p>Color Thread : {selectedRow && selectedRow[0].noOfColourThread}</p>

          <p>Wrapper : {selectedRow && selectedRow[0].noOfWrapper}</p>

          <p>Metal : {selectedRow && selectedRow[0].noOfMetal}</p>

          <p>Rust : {selectedRow && selectedRow[0].noOfRust}</p>

          <p>Plastic : {selectedRow && selectedRow[0].noOfPlastic}</p>

          <p>Black cotton : {selectedRow && selectedRow[0].noOfBlackCotton}</p>

          <p>Oil cotton : {selectedRow && selectedRow[0].noOfOilCotton}</p>

          <p>Yellow cotton: {selectedRow && selectedRow[0].noOfYellowCotton}</p>

          <p>Soil : {selectedRow && selectedRow[0].noOfSoil}</p>

          <p>Paper : {selectedRow && selectedRow[0].noOfPaper}</p>

          <p>Stick : {selectedRow && selectedRow[0].noOfStick}</p>

          <p>Feather : {selectedRow && selectedRow[0].noOfFeather}</p>

          <p>Cloth : {selectedRow && selectedRow[0].noOfCloth}</p>

          <p>
            whitePolyPropylene :{" "}
            {selectedRow && selectedRow[0].noOfwhitePolyPropylene}
          </p>

          <p>
            ColourPolyPropylene:{" "}
            {selectedRow && selectedRow[0].noOfColourPolyPropylene}
          </p>

          <p>RubberPiece : {selectedRow && selectedRow[0].noOfRubberPiece}</p>

          <p>Total : {selectedRow && selectedRow[0].total}</p>

          <p>SupervisorSign : {selectedRow && selectedRow[0].supervisorSign}</p>
          <p>HodSign: {selectedRow && selectedRow[0].hodOrDesigneeSign}</p>
          <p>Status : {selectedRow && selectedRow[0].status}</p>

          {/* Repeat similar structures for other sections */}
        </div>
      </Modal>
      {/* <Modal
        title="Edit Form"
        visible={newModal}
        onCancel={() => setnewModal(false)}
        width="100vw"
      >
        <BleContaminationCheckEdit_f18 data={modalData} />
      </Modal> */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            disabled={!bale_NoPrint}
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
          <label style={{ marginRight: "8px" }}>BMR Number:</label>
          <Select
            showSearch
            value={bmrOptionsValuePrint}
            onChange={handleBmrChangePrint}
            style={{ width: "50%" }}
            placeholder="Search BMR Number"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select BMR Number
            </Select.Option>
            {bmrOptionsNew.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
              >
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
          <label style={{ marginRight: "8px" }}>Batch Number:</label>

          <Select
            showSearch
            value={batch_NoPrint}
            onChange={handleBatchSelectChangePrint}
            style={{ width: "50%" }}
            placeholder="Search Batch No"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Batch No
            </Select.Option>
            {batchNoOptionsPrint.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.description}
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
          <label style={{ marginRight: "8px" }}>Bale Number:</label>

          <Select
            showSearch
            value={bale_NoPrint}
            onChange={handlePrintChange}
            style={{ width: "50%" }}
            placeholder="Search Bale NO"
            optionFilterProp="children"
            required
          >
            <Select.Option value="" disabled selected>
              Select Bale NO
            </Select.Option>
            {baleOptionsPrint.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.description}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Bleaching_f18_summary;
