import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  message,
  Select,
  Form,
  Menu,
  Avatar,
  Drawer,
  Modal,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader.js";
import API from "../baseUrl.json";
import { Tooltip } from "antd";
import { FaUserCircle } from "react-icons/fa";
import {
  IoPrint,
  IoSave,
  IoLockClosedOutline,
  IoCreate,
} from "react-icons/io5";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { MdLockOutline } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

const QC_f04 = (props) => {
  const [loading, setLoading] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [rows, setRows] = useState([{}]);
  const [RawDetails, setRawDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const [getImage, setGetImage] = useState("");
  const roleauth = localStorage.getItem("role");
  const [fetchedDetails, setFetchedDetails] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [id, setId] = useState("");
  const [childId, setChildId] = useState([]);
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
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

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_CHEMIST") {
      if (
        fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
        (fetchedDetails?.[0]?.manager_status == "QA_REJECTED" ||
          fetchedDetails?.[0]?.manager_status == "QC_REJECTED")
      ) {
        return "block";
      } else if (
        (fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
          fetchedDetails?.[0]?.manager_status == "WAITING_FOR_APPROVAL") ||
        fetchedDetails?.[0]?.manager_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QC_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") {
      if (
        fetchedDetails?.[0]?.manager_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.manager_status == "QC_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        fetchedDetails?.[0]?.manager_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.manager_status == "QC_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_CHEMIST") {
      if (
        fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
        (fetchedDetails?.[0]?.manager_status == "QA_REJECTED" ||
          fetchedDetails?.[0]?.manager_status == "QC_REJECTED")
      ) {
        return "none";
      } else if (
        fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
        (fetchedDetails?.[0]?.manager_status == "WAITING_FOR_APPROVAL" ||
          fetchedDetails?.[0]?.manager_status == "QA_APPROVED" ||
          fetchedDetails?.[0]?.manager_status == "QC_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") {
      if (
        fetchedDetails?.[0]?.manager_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.manager_status == "QC_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        fetchedDetails?.[0]?.manager_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.manager_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.manager_status == "QC_APPROVED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedDetails?.[0]?.chemist_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [fetchedDetails,API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedDetails?.[0]?.manager_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [fetchedDetails,API.prodUrl]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qc/ApproveRawCottonConsolidatedF004`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/QC/F-04/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    console.log("print screen works");
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qc/ApproveRawCottonConsolidatedF004`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/QC/F-04/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSave = async () => {
    try {
      await SaveRowCottonReport();
    } catch (error) {
      console.error("Error saving Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitRowCottonReport();
    } catch (error) {
      console.error("Error submitting Record..", error);
    }
  };

  const SaveRowCottonReport = async () => {
    setSaveLoading(true);
    console.log("Report details", RawDetails);
    try {
      const payload = {
        id: id,
        formatName: "RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
        formatNo: "PH-QCL01/F-004",
        revisionNo: 2,
        refSopNo: "PH-QCL01-D-05",
        unit: "H",
        bleachingBmrNo: bmr,
        details: RawDetails.map((record, index) => ({
          id: childId[index],
          date: record.dateOfReceipt,
          arNo: record.arNo,
          dateOfReceipt: record.dateOfReceipt,
          testedDate: record.testedDate,
          mbNo: record.mbNo,
          supplier: record.supplier,
          station: record.station,
          verity: record.verity,
          invoiceNo: record.invoiceNo,
          noOfBale: record.noOfBale,
          quantity: record.quantity,
          flourescence: record.flourescence,
          whiteness: record.whiteness,
          micronaire: record.micronaire,
          nepsCount: record.nepsCount,
          uql: record.uql,
          lengthByWeightMm: record.lengthByWeightMm,
          lengthByNoMm: record.lengthByNoMm,
          sfc_n: record.sfc_n,
          sfc_w: record.sfc_w,
          ash: record.ash,
          ess_ext: record.ess_ext,
          moisture: record.moisture,
          trash: record.trash,
          remark: record.remark,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qc/SaveRawCottonConsolidatedF004`,
        payload,
        { headers }
      );
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QC/F-04/Summary");
      }, 1500);
      message.success(
        "RAW COTTON CONSOLIDATED ANALYTICAL  Record Saved Successfully.."
      );
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error(
        "Failed to save RAW COTTON CONSOLIDATED ANALYTICAL  Record !!"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitRowCottonReport = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        id: id,
        formatName: "RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
        formatNo: "PH-QCL01/F-004",
        revisionNo: 2,
        refSopNo: "PH-QCL01-D-05",
        unit: "H",
        bleachingBmrNo: bmr,
        details: RawDetails.map((record, index) => ({
          id: childId[index],
          date: record.dateOfReceipt || "NA",
          arNo: record.arNo || 0,
          dateOfReceipt: record.dateOfReceipt || "NA",
          testedDate: record.testedDate || "NA",
          mbNo: record.mbNo || "NA",
          supplier: record.supplier || "NA",
          station: record.station || "NA",
          verity: record.verity || "NA",
          invoiceNo: record.invoiceNo || "NA",
          noOfBale: record.noOfBale || "NA",
          quantity: record.quantity || "NA",
          flourescence: record.flourescence || "NA",
          whiteness: record.whiteness || 0,
          micronaire: record.micronaire || 0,
          nepsCount: record.nepsCount || 0,
          uql: record.uql || 0,
          lengthByWeightMm: record.lengthByWeightMm || 0,
          lengthByNoMm: record.lengthByNoMm || 0,
          sfc_n: record.sfc_n || "NA",
          sfc_w: record.sfc_w || "NA",
          ash: record.ash || 0,
          ess_ext: record.ess_ext || 0,
          moisture: record.moisture || 0,
          trash: record.trash || 0,
          remark: record.remark || "NA",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qc/SubmitRawCottonConsolidatedF004`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QC/F-04/Summary");
      }, 1500);

      message.success("Submitted Successfully..!");
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error(
        "Failed to submit RAW COTTON CONSOLIDATED ANALYTICAL  Record!!"
      );
    } finally {
      setSubmitLoading(false);
    }
  };
  // useEffect(() => {
  //   const {bmr} = state || {}
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   };
  //       axios.get(
  //         `${   API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/batch-numbers`,
  //         { headers,
  //           params : {
  //             bmrNo : bmr
  //           }
  //          }
  //       ).then((response) => {
  //         setRawDetails(response.data);
  //         console.log("BMR Based Details" , RawDetails);
  //       }).catch(() => {

  //       })
  // }, []);
  const { bmr } = state || {};
  useEffect(() => {
    fetchDetailsByDate();
  }, []);
  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/GetByBmrNo?bleachingBmrNo=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setFetchedDetails(response.data);
      if (
        ((roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") &&
          response.data?.[0]?.chemist_status !== "CHEMIST_APPROVED") ||
        ((roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") &&
          (response.data?.[0]?.manager_status == "QA_REJECTED" ||
            response.data?.[0]?.manager_status == "QC_REJECTED"))
      ) {
        message.error("Chemist Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/QC/F-04/Summary");
        }, 1500);
      }
      console.log("responsed data", response.data);
      if (Array.isArray(response.data)) {
        setRawDetails(response.data[0].details);
        setId(response.data[0].id);
        setChildId(response.data[0].details.map((item) => item.id));
      } else {
        fetchDetailsPDE();
        setId("");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };
  const fetchDetailsPDE = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/batch-numbers?bmrNo=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setRawDetails(response.data);
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Row Cotton Report</p>,
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "90%",
              marginLeft: "50px",
              tableLayout: "fixed",
              marginRight: "0px",
            }}
          >
            <thead>
              <tr>
                <th
                  colSpan="10"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Specification
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  No Intense Blue Fluorescence Spots
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN min.20, VC min.25
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN(2.8-4.5), VC (3.5-8.0),CN2: min.10
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC:max.700, CN: max.1000,
                  <br /> CN2:max.5000
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN (12-21), VC( Long (12-21),
                  <br />
                  Medium(25-39), Short(13-20)),
                  <br /> CN-2: min 10
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC: min.15, CN: min 10, CN2: min 8
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC: min.13, CN: min 7, CN2: min 6
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC:max.25, CN: max.85, CN2:max.85
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC:max.45, CN: max.90, CN2:max.90
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC & CN: max.1.50, CN2: max.0.50
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC ,CN,CN2: max. 0.75
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC ,CN,CN2: max. 8.0
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN: max.0.6, VC :max. 3.5 , CN2:NA
                </th>
                <th
                  rowSpan="2"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Remarks
                </th>
                {/* <th rowSpan="2" style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'center' }}>Reported by (Chemist)</th>
                    <th rowSpan="2" style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'center' }}>Approved by</th> */}
              </tr>

              <tr>
                <th>AR. No</th>
                <th>Date of Receipt</th>
                <th>Tested Date</th>
                <th>MB NO</th>
                <th>Supplier</th>
                <th>Station</th>
                <th>Verity</th>
                <th>Invoice No.</th>
                <th>No. Bales</th>
                <th>Quantity Kg</th>
                <th>
                  Fluore
                  <br />
                  scence
                </th>
                <th>
                  White <br /> ness
                  <br />
                  (Berger <br />
                  10 deg /D65)
                </th>
                <th>
                  Micro
                  <br />
                  naire µg/in
                </th>
                <th>
                  Neps count
                  <br />
                  /gm
                </th>
                <th>
                  UQL in
                  <br /> mm
                </th>
                <th>
                  L(w)
                  <br />
                  mm
                </th>
                <th>L(n) mm</th>
                <th>SFC (w) (%)</th>
                <th>SFC(n)(%)</th>
                <th>Ash (%)</th>
                <th>E.S.S. Ext. (%)</th>
                <th>
                  Moisture
                  <br /> (%)
                </th>
                <th>
                  Trash
                  <br />
                  (%)
                </th>
              </tr>

              {/* <tr>
                <th style={{ textAlign: "center",transform: 'rotate(270deg)',height:'195px', maxWidth: "55px", whiteSpace: "nowrap",    }}>Remarks</th>
                <th style={{ textAlign: "center",transform: 'rotate(270deg)', maxWidth: "35px", whiteSpace: "nowrap",    }}>Delete</th>
                </tr> */}
            </thead>
            <tbody>
              {RawDetails?.map((record, recordIndex) => (
                <tr key={recordIndex}>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.arNo}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {formattedDate(record?.dateOfReceipt)}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {formattedDate(record?.testedDate)}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.mbNo}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.supplier}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.station}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.verity}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.invoiceNo}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.noOfBale}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.quantity}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.flourescence}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.whiteness}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.micronaire}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.nepsCount}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.uql}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.lengthByWeightMm}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.lengthByNoMm}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.sfc_w}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.sfc_n}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.ash}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.ess_ext}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.moisture}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.trash}
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    {record?.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <table
              style={{
                width: "95%",
              }}
            ></table>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "80%", margin: "auto", tableLayout: "fixed" }}>
            <tr>
              <td
                colSpan="50"
                style={{ height: "35px", textAlign: "center", width: "30%" }}
              >
                Reported by(Chemist) Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", width: "35%" }}>
                Approved by(QC Manager & QA Manager) Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {fetchedDetails?.[0]?.chemist_status === "CHEMIST_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{fetchedDetails?.[0]?.chemist_sign}</div>
                        <div>
                          {formattedDatewithTime(
                            fetchedDetails?.[0]?.chemist_submit_on
                          )}
                        </div>
                      </div>
                      {getImage && (
                        <img
                          src={getImage}
                          alt="chemist Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {(fetchedDetails?.[0]?.manager_status === "QC_APPROVED" ||
                  fetchedDetails?.[0]?.manager_status === "QA_APPROVED" ||
                  fetchedDetails?.[0]?.manager_status === "QA_REJECTED" ||
                  fetchedDetails?.[0]?.manager_status === "QC_REJECTED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{fetchedDetails?.[0]?.manager_sign}</div>
                        <div>
                          {formattedDate(
                            fetchedDetails?.[0]?.manager_submit_on
                          )}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="QA manager Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const handleBack = () => {
    navigate("/Precot/QC/F-04/Summary");
  };

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="RAW COTTON CONSOLIDATED ANALYTICAL REPORT"
        formatNo="PH-QCL01/F-004"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={handleRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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
      <Modal
        title="Reject"
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
            onClick={handleReject}
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
          <label style={{ marginRight: "8px" }}>Remarks:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "center",
          width: "200px",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Input addonBefore="BMR No" size="Medium" value={bmr} readOnly />
      </div>
      <Tabs defaultActiveKey="1" items={items} style={{ marginTop: "1%" }} />
    </div>
  );
};

export default QC_f04;
