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
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const COTTON_BUDS_f04_Summary = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const [printResponseData, setPrintResponseData] = useState(null);
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState([]);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [machineNamePrint, setMacineNamePrint] = useState("");
  const [orderNoLov, setOrderNoLov] = useState([]);
  const [machineNameLov, setmachineNameLov] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = printResponseData?.length * 3;
  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yearF}-${monthF}-${day}`;

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.supervisorName;
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
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
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            setImagesLoaded((loaded) => loaded + 1);
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.qaName;
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
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
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            setImagesLoaded((loaded) => loaded + 1);
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.forEach((item, index) => {
      const username = printResponseData[index]?.hodName;
      setSaveLoading(true);
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
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
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            setImagesLoaded((loaded) => loaded + 1);
            if (index === printResponseData.length - 1) {
              setSaveLoading(false);
            }
          });
      }
    });
  }, [printResponseData,API.prodUrl, token]);

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/buds/sap/Service/orderInfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const orderNumberLov = data.map((order) => ({
            value: order,
          }));
          setOrderNoLov(orderNumberLov);
        } else {
          console.error("API response is not an array", data);
          setOrderNoLov([]);
        }
      } catch (error) {
        console.error("Error fetching Order Number options:", error);
        setOrderNoLov([]);
      }
    };

    fetchOrderNumberOptions();
  }, [token]);
  useEffect(() => {
    const fetchmachineNameOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/buds/sap/Service/machineList`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setmachineNameLov(data);
        } else {
          console.error("API response is not an array", data);
          setmachineNameLov([]);
        }
      } catch (error) {
        console.error("Error fetching Machine Name options:", error);
        setmachineNameLov([]);
      }
    };

    fetchmachineNameOptions();
  }, [token]);

  //   print Model
  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    console.log("tatal images", totalImages, imagesLoaded);
    if (printResponseData?.length > 0 && imagesLoaded === totalImages) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 200);
    }
  }, [imagesLoaded, totalImages, printResponseData]);

  const handleModalClose = () => {
    setShowModal(false);
    setMacineNamePrint(null);
    setDatePrint(null);
    setImagesLoaded(0);
  };

  //   handle edit
  const handleEdit = (record) => {
    const { orderNo1 } = record;
    navigate("/Precot/COTTON_BUDS/F-04", {
      state: {
        orderNo: orderNo1,
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

      let apiUrl = `${API.prodUrl}/Precot/api/buds/Service/productChangeOverSummary`;

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
        role === "ROLE_DESIGNEE" ||
        role === "ROLE_QA"
      ) {
        setCakingData(data);
      }
      if (
        role === "ROLE_HOD" ||
        role === "ROLE_SUPERVISOR" ||
        role === "ROLE_DESIGNEE" ||
        role === "ROLE_QA"
      ) {
        setSummaryData(
          data.map((item, index) => ({
            key: item.header_id,
            orderNo1: item.orderNo1,
            supervisorStatus: item.supervisorStatus,
            hodStatus: item.hodStatus,
            date: item.date,
            qaStatus: item.qaStatus,
            hod_status: item.hod_status,
            id: item.id,
            sno: index + 1,
            reason: item.reason,
          }))
        );
      } else {
        message.error(data?.message || "Unexpected response format");
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
      if (Array.isArray(cakingData)) {
        for (const data of cakingData) {
          if (
            data.hodStatus === "HOD_REJECTED" ||
            data.qaStatus === "QA_REJECTED"
          ) {
            setReason(true);
            break;
          }
        }
      }
    };
    findReason();
  }, [cakingData]);

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },
    {
      title: "Order Number",
      dataIndex: "orderNo1",
      key: "orderNo1",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisorStatus",
      key: "supervisorStatus",
      align: "center",
    },
    {
      title: "QA Inspector Status",
      dataIndex: "qaStatus",
      key: "qaStatus",
      align: "center",
    },
    {
      title: "Hod/Designee Status",
      dataIndex: "hodStatus",
      key: "hodStatus",
      align: "center",
    },

    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
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

  const fetchPrintValue = () => {
    try {
      let dateP;
      let machineP;
      if (datePrint == null) {
        dateP = "";
      } else {
        dateP = datePrint;
      }
      if (machineNamePrint == null) {
        machineP = "";
      } else {
        machineP = machineNamePrint;
      }

      axios
        .get(
          `${API.prodUrl}/Precot/api/buds/Service/printProductChangeOver?date=${dateP}&machineName=${machineP}`,
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
            console.log("set print response", printResponseData);
          } else {
            message.error("No Data Found");
            handleModalClose();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //goto button
  const goTo = () => {
    if (orderNo == "" || orderNo == null) {
      message.warning("Please Select Order Number");
      return;
    }
    navigate("/Precot/COTTON_BUDS/F-04", {
      state: {
        orderNo: orderNo,
      },
    });
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {printResponseData?.map((datam, index) => (
          <table
            style={{ marginTop: "10px", scale: "92%", tableLayout: "fixed" }}
            key={index}
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
                  PRODUCT CHANGE OVER - COTTON BUDS
                </th>
                <td colSpan="20">Format No.:</td>
                <td colSpan="20">PH-PRD04/F-004</td>
              </tr>
              <tr>
                <td colSpan="20">Revision No.:</td>
                <td colSpan="20">01</td>
              </tr>
              <td colSpan="20">Ref. SOP No.:</td>
              <td colSpan="20">PH-PRD04-D-03</td>
              <tr>
                <td colSpan="20">Page No.:</td>
                <td colSpan="20">
                  {index + 1} of {printResponseData.length}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="20">Date :{formattedDate(datam.date)}</th>
                <th colSpan="30">Time :{datam.time}</th>
                <th colSpan="30">Section :{datam.section}</th>
                <th colSpan="35">Machine No.:{datam.machineName}</th>
              </tr>
              <tr>
                <th colSpan="115">A.Product Details:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Check Points
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Running Production
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Change Over To
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Product Name
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.productName1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.productName2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Lot No.
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.lotNo1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.lotNo2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  BMR No.{" "}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.orderNo1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.orderNo2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Sliver Weight{" "}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.sliverWeight1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.sliverWeight2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Pack Size (Qty. per bag)
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.packSize1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.packSize2 || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  PDS No./Rev. No.
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.pdsNumber1 || "NA"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.pdsNumber2 || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="115">
                  B. Removed of Unwanted Packing Materials of Running Product:
                </th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Packaging Materials
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Removed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remark
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Blister
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.blister === "Y"
                      ? "Yes"
                      : datam.blister === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.blisterRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Container
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.container === "Y"
                      ? "Yes"
                      : datam.container === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.containerRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Zip lock / Drawstring
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.zipLock === "Y"
                      ? "Yes"
                      : datam.zipLock === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.zipLockRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Outer carton
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.outerCarton === "Y"
                      ? "Yes"
                      : datam.outerCarton === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.outerCartonRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Sliver if any
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.silverWeight === "Y"
                      ? "Yes"
                      : datam.silverWeight === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.silverWeightRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="115">C. Tool & Machine Settings:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Activity
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Completed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remark
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Tool Change required
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.toolChangeRequired === "Y"
                      ? "Yes"
                      : datam.toolChangeRequired === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.toolChangeRequiredRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Tool Change Done
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.toolChangeDone === "Y"
                      ? "Yes"
                      : datam.toolChangeDone === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.toolChangeDoneRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="115">D.CCP Setting:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Activity
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Completed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remove
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Functioning Check of Metal Detector
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.metalDetectorCheck === "Y"
                      ? "Yes"
                      : datam.metalDetectorCheck === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.metalDetectorRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <th colSpan="115">E. Production Start:</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  S. No.
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Activity
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Completed (Yes / No)
                </th>
                <th colSpan="35" style={{ textAlign: "center" }}>
                  Remark
                </th>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  Production ready to start
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.productionCheck === "Y"
                      ? "Yes"
                      : datam.productionCheck === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.productionCheckRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  First Piece Inspection /Quality verification{" "}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {" "}
                  {printResponseData
                    ? datam.qualityVerification === "Y"
                      ? "Yes"
                      : datam.qualityVerification === "N"
                      ? "No"
                      : "N/A"
                    : "N/A"}
                </td>
                <td colSpan="35" style={{ textAlign: "center" }}>
                  {datam.qualityVerificationRemarks || "NA"}
                </td>
              </tr>
              {/* <br/><br/><tr style={{ border: "none" }}>
      <td style={{ border: "none" }} colSpan="115"></td>
    </tr><tr style={{ border: "none" }}>
      <td style={{ border: "none" }} colSpan="115"></td>
    </tr> */}
              {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
              <tr style={{ pageBreakBefore: "always" }}>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  Performed by Production Supervisor
                </td>
                <td colSpan="25" style={{ textAlign: "center" }}>
                  CCP Maintained by
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {" "}
                  Verified by QA
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by HOD / Designee{" "}
                </td>
              </tr>

              <tr style={{ borderTop: "10px" }}>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt={`hod Sign ${index + 1}`}
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
                  {datam.supervisorName || ""}
                  <br />
                  {formattedDatewithTime(datam?.supervisorSubmittedDate)}
                </td>
                <td
                  colSpan="25"
                  style={{ height: "40px", textAlign: "center" }}
                >
                  {" "}
                  {datam.ccpMaintainedBy || "NA"}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt={`QA Inspector Sign ${index + 1}`}
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
                  {datam.qaName || ""}
                  <br />
                  {formattedDatewithTime(datam?.qaApprovedDate)}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {getImage3[index] && (
                    <img
                      src={getImage3[index]}
                      alt={`hod/Designee Sign ${index + 1}`}
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
                  {datam.hodName || ""}
                  <br />
                  {formattedDatewithTime(datam?.hodDate)}
                </td>
              </tr>
            </tbody>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <tfoot>
              <br />
              <br />
              <br />
              <br />
              <tr style={{ borderTop: "60px" }}>
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
      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="PRODUCT CHANGE OVER - COTTON BUDS"
          formatNo="PH-PRD04/F-004"
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

        {/* Go To Row */}

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
            <label>Order Number:</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={orderNo}
              onChange={(value) => setOrderNo(value)}
              style={{ width: "100%" }}
              placeholder="Search Order No"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Order No.
              </Select.Option>
              {orderNoLov.map((option) => (
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
      {/* Table...Summary */}
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summaryData}
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
            Date :
          </label>
          <Input
            onChange={(e) => setDatePrint(e.target.value)}
            type="date"
            value={datePrint}
            size="small"
            style={{ width: "100%", height: "30px" }}
            max={formattedToday}
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
            Machine Name :
          </label>
          <Select
            showSearch
            value={machineNamePrint}
            onChange={setMacineNamePrint}
            style={{ width: "100%" }}
            placeholder="Search Machine Name"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Machine Name
            </Select.Option>
            {machineNameLov.map((option) => (
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

export default COTTON_BUDS_f04_Summary;
