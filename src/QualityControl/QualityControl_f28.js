/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  Radio,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const QualityControl_f28 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { formNo, formid } = location.state;
  const { state } = location;
  const { date, formmonth, formyear } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [planId, setplanId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [disable, setDisable] = useState(false);
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const monthIndex = dateObject.getMonth();
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
  const monthName = monthNames[monthIndex];

  // Custom States
  const [id, setId] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [volumeCapacity, setVolumeCapacity] = useState("");
  const [breakageQty, setBreakageQty] = useState("");
  const [breakageDate, setBreakageDate] = useState("");
  const [disposalStatus, setDisposalStatus] = useState("");
  const [disposerSign, setDisposerSign] = useState("");
  const [disposerDate, setDisposerDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const [formMonth, setFormMonth] = useState("");
  const [formYear, setFormYear] = useState("");

  console.log(
    "month, year , date based on summary page ",
    monthName,
    year,
    day
  );

  const [rows, setRows] = useState([
    {
      id: "",
      materialDescription: "",
      volumeCapacity: "",
      breakageQty: "",
      breakageDate: "",
      disposalStatus: "",
      disposerSign: "",
      remarks: "",
    },
  ]);
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [planingDetailsByDate,      API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [planingDetailsByDate,      API.prodUrl, token]);

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

  useEffect(() => {
    const { date, formmonth, formyear } = state || {};
    console.log("format No : ", date, formmonth, formyear);
    // const formatdate = moment(date).format("DD-MM-YYYY") ;
    setBreakageDate(date);
    setFormMonth(formmonth);
    setFormYear(formyear);
  }, []);

  const handleMaterialDescription = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].materialDescription = value;
    setRows(updatedRows);
  };
  const handleVolumeCapacity = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].volumeCapacity = value;
    setRows(updatedRows);
  };
  const handleBreakageOty = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].breakageQty = value;
    setRows(updatedRows);
  };
  const handleBreakageDate = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].breackageDate = value;
    setRows(updatedRows);
  };
  const handleDisposalStatus = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].disposalStatus = value;
    setRows(updatedRows);
  };
  const handleDisposerSign = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].disposerSign = value;
    setRows(updatedRows);
  };
  const handleDisposerDate = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].disposerDate = value;
    setRows(updatedRows);
  };
  const handleRemarks = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].remarks = value;
    setRows(updatedRows);
  };

  const roleauth = localStorage.getItem("role");

  const disabled =
    (roleauth === "ROLE_SUPERVISOR" &&
      planingDetailsByDate?.supervisor_status === "SUPERVISOR_APPROVED" &&
      planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL") ||
    planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
    (roleauth === "ROLE_HOD" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED")) ||
    (roleauth === "ROLE_DESIGNEE" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED"));

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (formid) {
      fetchDetailsByDate();
    }
  }, []);

  const fetchDetailsByDate = async () => {
    console.log("Format No ", formNo);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/qc/GlasswareBreakageDisposal/GetById/${formid}`,
        { headers }
      );
      console.log("response (details based on date)", response.data);
      setemptyarraycheck(response.data.length);
      setId(response.data.id);
      setMaterialDescription(response.data.materialDescription);
      setVolumeCapacity(response.data.volumeCapacity);
      setBreakageQty(response.data.breakageQty);
      setDisposalStatus(response.data.disposalStatus);
      setRemarks(response.data.remark);

      // if (
      //   role == "ROLE_CHEMIST" &&
      //   (response.data[0].chemist_status == "CHEMIST_APPROVED" || response.data[0].chemist_status == "CHEMIST_SUBMITTED")
      // ) {#$$#$453fgd
      //   console.log("condition 1")
      //   setSaveBtnStatus(false);
      //   setSubmitBtnStatus(false);
      //   setDisable(true);
      // }

      // if (
      //   role == "ROLE_MICROBIOLOGIST" &&
      //   (response.data[0].microbiologist_status == "CHEMIST_APPROVED" || response.data[0].microbiologist_status == "CHEMIST_SUBMITTED")
      // ) {
      //   console.log("condition 1")
      //   setSaveBtnStatus(false);
      //   setSubmitBtnStatus(false);
      //   setDisable(true);
      // }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const handleSave = async () => {
    try {
      await SaveGlassWareBreakage();
    } catch (error) {
      console.error(
        "Error saving GLASSWARES BREAKAGE & DISPOSAL REGISTER Record:",
        error
      );
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitGlasswareBreakage();
    } catch (error) {
      console.error(
        "Error submitting GLASSWARES BREAKAGE & DISPOSAL REGISTER Record..",
        error
      );
    }
  };

  const SaveGlassWareBreakage = async () => {
    setSaveLoading(true);
    console.log("breakageDate", breakageDate);
    try {
      const payload = {
        id: id,
        formatName: "Glassware Breakage & Disposal Register",
        formatNo: "PH-QCL01/F-028",
        revisionNo: 1,
        refSopNo: "NA",
        unit: "unit-H",
        materialDescription: materialDescription,
        volumeCapacity: volumeCapacity,
        breakageQty: breakageQty,
        brakageDate: breakageDate,
        disposalStatus: disposalStatus || "NA",
        remark: remarks,
        month: monthName,
        year: year,
        // prodPlanDetails: rows.map((row) => ({
        //     materialDescription: row.materialDescription,
        //     volumeCapacity: row.volumeCapacity,
        //     breakageQty: row.breakageQty,
        //     breackageDate: row.breakageDate,
        //     disposalStatus: row.disposalStatus,
        //     disposerSign: row.disposerSign,
        //     disposerDate: row.disposerDate,
        //     remarks: row.remarks,
        //            })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SaveGlasswareBreakageDisposalF028`,
        payload,
        { headers }
      );
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-028/Summary");
      }, 1500);
      message.success(
        "Glasswares BreakageDisposal Register Record Saved Successfully.."
      );
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error(
        "Failed to save GLASSWARES BREAKAGE & DISPOSAL REGISTER Record !!"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitGlasswareBreakage = async () => {
    setSubmitLoading(true);
    try {
      // Validation for mandatory fields
      let isValid = true;

      if (!materialDescription || !volumeCapacity || !breakageQty) {
        isValid = false;

        let errorMessage = "";
        if (!materialDescription)
          errorMessage += "Please fill in materialDescription field.\n";
        if (!volumeCapacity)
          errorMessage += "Please fill in volumeCapacity field.\n";
        if (!breakageQty) errorMessage += "Please fill in breakageQty field.\n";
        console.log("checking");
        message.error(errorMessage);
        return false;
      }

      if (!isValid) {
        setSubmitLoading(false);
        return; // Stop execution if validation fails
      }

      const payload = {
        id: id,
        formatName: "Glassware Breakage & Disposal Register",
        formatNo: "PH-QCL01/F-028",
        revisionNo: 1,
        refSopNo: "NA",
        unit: "unit-H",
        materialDescription: materialDescription,
        volumeCapacity: volumeCapacity,
        breakageQty: breakageQty,
        brakageDate: breakageDate,
        disposalStatus: disposalStatus || "NA",
        // disposerSign:disposerSign,
        // disposerDate:disposerDate,
        remark: remarks || "NA",
        month: monthName,
        year: year,
        // prodPlanDetails: rows.map((row) => ({
        //     materialDescription: row.materialDescription,
        //     volumeCapacity: row.volumeCapacity,
        //     breakageQty: row.breakageQty,
        //     breackageDate: row.breakageDate,
        //     disposalStatus: row.disposalStatus,
        //     disposerSign: row.disposerSign,
        //     disposerDate: row.disposerDate,
        //     remarks: row.remarks,
        //            })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${    API.prodUrl}/Precot/api/qc/SubmitGlasswareBreakageDisposalF028`,
        payload,
        { headers }
      );

      message.success(
        "Glasswares BreakageDisposal Register Record Submitted Successfully.."
      );
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-028/Summary");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error(
        "Failed to submit GLASSWARES BREAKAGE & DISPOSAL REGISTER Record!!"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-028/Summary", {
      state: {
        formNo: formatNo,
      },
    });
  };

  const items = [
    {
      key: "1",
      label: <p>GLASSWARES BREAKAGE & DISPOSAL REGISTER</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                S.No.
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Material Description
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Volume/Capacity (ml)
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Breakage Qty in Nos
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Breakage Date
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Disposal status
              </th>
              {/* <th colSpan="15" style={{  textAlign: "center" }}>Disposer Sign & Date</th> */}
              <th colSpan="15" style={{ textAlign: "center" }}>
                Remarks
              </th>
            </tr>
            {/* array....... */}
            {/* {rows.map((row, index) => ( */}
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                {1}
              </td>
              <td colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <input
                  type="text"
                  style={{
                    width: "90%",
                    padding: "2px",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                  }}
                  value={materialDescription}
                  // readOnly={status.fieldMicro || status.fieldStatus}
                  onChange={(e) => {
                    setMaterialDescription(e.target.value);
                  }}
                />
              </td>
              <td colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <input
                  type="number"
                  style={{ width: "95%", border: "none", outline: "none" }}
                  min="0"
                  value={volumeCapacity}
                  // readOnly={status.fieldchemist || status.fieldStatus}
                  onChange={(e) => {
                    setVolumeCapacity(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "E") {
                      e.preventDefault();
                    }
                  }}
                />
              </td>
              <td colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <input
                  type="number"
                  style={{ width: "95%", border: "none", outline: "none" }}
                  min="0"
                  value={breakageQty}
                  // readOnly={status.fieldchemist || status.fieldStatus}
                  onChange={(e) => {
                    setBreakageQty(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "E") {
                      e.preventDefault();
                    }
                  }}
                />
              </td>
              <td colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <Input
                  className="inp-new"
                  type="date"
                  style={{
                    width: "75%",
                    padding: "2px",
                    textAlign: "center",
                  }}
                  value={breakageDate}
                  readOnly
                  // readOnly={status.fieldMicro || status.fieldStatus}
                  // onChange={(e) => setBreakageDate(e.target.value)}
                />
              </td>

              <td colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setDisposalStatus(e.target.value)}
                  value={disposalStatus}
                  // disabled={disable}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              {/* <td colSpan="15" style={{ height: '35px', textAlign: 'center' }}>
            </td> */}

              <td colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <input
                  type="text"
                  className="inp-new"
                  value={remarks}
                  // readOnly={status.fieldMicro || status.fieldStatus}
                  onChange={(e) => {
                    // const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
                    setRemarks(e.target.value);
                  }}
                />
              </td>

              {/* <td
              colSpan="1"
              style={{ height: '35px', textAlign: 'center', cursor: 'pointer', size:"40px" , border:"none" ,display: canDisplayAddDelete()}}
              onClick={() => handleDeleteRow(index)}
              
            >
               <DeleteOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
            </td> */}
            </tr>
            {/* ))} */}
          </table>

          {/* <button
        onClick={handleAddRow}
        style={{
          backgroundColor: 'green',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          fontSize: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          display: canDisplayAddDelete()
          
        }}
      >
        <PlusOutlined style={{ marginRight: '8px' }} />
        Add Row
      </button> */}
        </div>
      ),
    },
  ];

  const formatName = "GLASSWARES BREAKAGE & DISPOSAL REGISTER";
  const formatNo = "PH-QCL01/F-028";
  const revisionNo = "01";
  const sopNo = "NA";

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="Glasswares Breakage & Disposal Register"
        formatNo="PH-QCL01/F-028"
        sopNo="NA"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <>
            <Button
              loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
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
              }}
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit}
              shape="round"
            >
              &nbsp;Submit
            </Button>
          </>,
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
      {/* Unique Param Row*/}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={date}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Month:"
          placeholder="Month"
          value={monthName || formmonth}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={year || formyear}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default QualityControl_f28;
