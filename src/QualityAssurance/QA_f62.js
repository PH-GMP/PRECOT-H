
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import moment from 'moment';
import logo from "../Assests/logo.png";
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QA_f62 = () => {
  PrintPageOrientation({ orientation: 'landscape', scale: 0.9 });
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  const location = useLocation();
  const { state } = location;
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [Id, setId] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [ontimedisable, setOnTimeDisable] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [department, setDepartment] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lineId, setLineId] = useState([]);
  const [RecordTableDelete, setRecordTableDelete] = useState([]);
  const roleauth = localStorage.getItem("role");
  const [departmentPrint, setDepartmentPrint] = useState("");
  const [yearPrint, setYearPrint] = useState("");
  const [monthPrint, setMonthPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${yearF}-${monthF}-${day}`;
  // department Lov
  useEffect(() => {
    const departmentId = localStorage.getItem("departmentId");

    switch (departmentId) {
      case "1":
        setDepartment("BLEACHING");
        break;
      case "2":
        setDepartment("SPUNLACE");
        break;
      case "3":
        setDepartment("PAD_PUNCHING");
        break;
      case "4":
        setDepartment("DRY_GOODS");
        break;
      case "5":
        setDepartment("QUALITY_CONTROL");
        break;
      case "6":
        setDepartment("QUALITY_ASSURANCE");
        break;
      case "7":
        setDepartment("PPC");
        break;
      case "8":
        setDepartment("STORE");
        break;
      case "9":
        setDepartment("DISPATCH");
        break;
      case "10":
        setDepartment("PRODUCT_DEVELOPMENT");
        break;
      case "11":
        setDepartment("ENGINEERING");
        break;
      case "12":
        setDepartment("COTTON_BUDS");
        break;
      default:
        setDepartment("");
        break;
    }
  }, []);
  const [rows, setRows] = useState([
    {
      lineIdF: '',
      idNumber: '',
      issueName: '',
      issueDate: '',
      issueSignature: '',
      verificationLocation: '',
      verificationDate: '',
      verificationTime: '',
      receivedDate: '',
      receivedSignature: '',
      receivedRemarks: '',

    }
  ]);
  // handle key down methods
  const handleKeyDown = (e) => {
    const isAlphanumeric = /^[a-zA-Z.]$/;

    if (!isAlphanumeric.test(e.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', '_', " "].includes(e.key)) {
      e.preventDefault();
    }
  };
  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z.0-9]$/;

    if (!isAlphanumeric.test(e.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', '_', " "].includes(e.key)) {
      e.preventDefault();
    }
  };

  // onchange functions

  const handleChange = (index, fieldName, value) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index][fieldName] = value;

      return updatedRows;
    });
  };

  function generateYearOptions(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ id: year, value: year.toString() });
    }
    return years;
  }
  const yearOptions = generateYearOptions(2024, 2100);

  const monthOptions = [
    { id: 1, value: 'January' },
    { id: 2, value: 'February' },
    { id: 3, value: 'March' },
    { id: 4, value: 'April' },
    { id: 5, value: 'May' },
    { id: 6, value: 'June' },
    { id: 7, value: 'July' },
    { id: 8, value: 'August' },
    { id: 9, value: 'September' },
    { id: 10, value: 'October' },
    { id: 11, value: 'November' },
    { id: 12, value: 'December' },
  ];
  // department LOV
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios.get(
      `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
      { headers }
    ).then((response) => {
      setDepartmentOptions(response.data);
    }).catch(() => {

    })
  }, []);

  const handlePrint = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
    }
  }, [printResponseData]);

  const handleModalClose = () => {
    setShowModal(false);
    setYearPrint(null);
    setDatePrint(null);
    setMonthPrint(null);
    setDepartmentPrint(null);
  };

  const printSubmit = () => {
    fetchPrintValue();
  }

  const fetchPrintValue = () => {

    let dateP;
    let monthP;
    let yearP;
    let departmentP;
    if (monthPrint == null) {
      monthP = "";
    } else {
      monthP = monthPrint;
    }
    if (yearPrint == null) {
      yearP = "";
    } else {
      yearP = yearPrint;
    }
    if (datePrint == null) {
      dateP = "";
    } else {
      dateP = datePrint;
    }
    if (departmentPrint == null) {
      departmentP = "";
    } else {
      departmentP = departmentPrint;
    }
    try {

      axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/SharpToolsAndVerificationRegister/getForPrintSharpTools?department=${departmentP}&year=${yearP}&month=${monthP}&date=${dateP}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.data && res.data.length != 0) {

            const printResponseData = (res.data);
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Data");
          }
        })
        .catch((err) => {
          
        });
    } catch (error) {
      console.error('Error in handleDatePrintChange:', error);

    }
  };

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY');
      }
    }
    return '';
  };
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };

  // signature Image
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const username = DetailsByParam?.mr_sign;
  //   if (username) {
  //     

  //     axios
  //       .get(
  //         `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           responseType: "arraybuffer",
  //         }
  //       )
  //       .then((res) => {
  //         
  //         const base64 = btoa(
  //           new Uint8Array(res.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );
  //         const url = `data:image/jpeg;base64,${base64}`;
  //         setGetImage1(url);
  //       })
  //       .catch((err) => {
  //         
  //       });
  //   }
  // }, [DetailsByParam,API.prodUrl, token]);

  const handleAddRow = () => {
    const currentRows = rows || [];

    const newLineId = currentRows.length > 0
      ? Math.max(...currentRows.map(row => parseInt(row.lineIdF) || 0)) + 1
      : 1;

    const newRow = {
      lineIdF: newLineId.toString(),
      idNumber: '',
      issueName: '',
      issueDate: '',
      issueSignature: '',
      verificationLocation: '',
      verificationDate: '',
      verificationTime: '',
      receivedDate: '',
      receivedSignature: '',
      receivedRemarks: '',
    };

    setRows([...currentRows, newRow]);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this row? This action will be finalized after saving.");

    if (confirmDelete) {
      const lineIdToDelete = lineId[index];
      console.log("line id to delete", lineId[index])

      if (lineIdToDelete !== undefined) {
        setRecordTableDelete(prev => [...prev, lineIdToDelete]);
      }
      const updatedLine = lineId.filter((_, i) => i !== index);
      setLineId(updatedLine);
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    } else {
      
    }
  };

  const disabled = ((roleauth === "ROLE_MR" || roleauth === "QA_MANAGER") &&
    DetailsByParam?.mr_status === "MR_SUBMITTED")

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }


  const handleSave = async () => {
    try {
      await SaveRecord();
    } catch (error) {
      console.error("Error saving Record:", error);
    }

  };
  const handleSubmit = async () => {

    try {
      await SubmitRecord();
    } catch (error) {
      console.error("Error submitting Record..", error);
    }

  };

  const SaveRecord = async () => {
    setSaveLoading(true);
    try {

      const payload = {
        formatName: "SHARP TOOLS ISSUE & VERIFICATION REGISTER",
        formatNo: "PH-QAD01/F-062",
        revisionNo: 1,
        sop_number: "PH-QAD01-D-43",
        unit: "H",
        id: Id,
        department: department,

        details: rows.map((row, index) => {
          const issueDate = new Date(row.issueDate);

          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const month = monthNames[issueDate.getMonth()];

          const year = issueDate.getFullYear();

          return {
            ...(DetailsByParam.length !== 0 && { detailsId: lineId[index] }),
            month: month || "",
            year: year || "",
            nameOfItem: row.idNumber,
            issueDetailsName: row.issueName,
            issueDetailsDate: row.issueDate,
            issueDetailsReciversSign: row.issueSignature,
            verificationLocation: row.verificationLocation,
            verificationDate: row.verificationDate,
            verificationTime: row.verificationTime,
            recivedBackOnDate: row.receivedDate,
            recivedBackOnReciversSign: row.receivedSignature,
            remarks: row.receivedRemarks,
          };
        }),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/saveSharpToolsAndVerificationRegister`,
        payload,
        { headers }
      );

      if (RecordTableDelete.length > 0) {
        await Promise.all(RecordTableDelete.map(async (id) => {
          await axios.delete(`${API.prodUrl}/Precot/api/QA/Service/SharpToolsAndVerificationRegister/deleteChildEntry/${id}`, { headers });
        }));
        setRecordTableDelete([]);
      }
      message.success('Record Saved Successfully..');
      setOnTimeDisable((prev) => !prev);

    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to save Record !!");

    } finally {
      setSaveLoading(false);
    }
  };


  const SubmitRecord = async () => {
    setSubmitLoading(true)

    try {
      for (let row of rows) {
        if (!row.idNumber || row.idNumber.trim() === '') {
          message.error('Item Name/ID Number field is mandatory for all rows.');
          setSubmitLoading(false);
          return;
        }
      }
      const payload = {
        formatName: "SHARP TOOLS ISSUE & VERIFICATION REGISTER",
        formatNo: "PH-QAD01/F-062",
        revisionNo: 1,
        sop_number: "PH-QAD01-D-43",
        unit: "H",
        id: Id,
        department: department,

        details: rows.map((row, index) => {
          const issueDate = new Date(row.issueDate);

          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const month = monthNames[issueDate.getMonth()];

          const year = issueDate.getFullYear();

          return {
            ...(DetailsByParam.length !== 0 && { detailsId: lineId[index] }),
            month: month || "NA",
            year: year || "NA",
            nameOfItem: row.idNumber,
            issueDetailsName: row.issueName || 'NA',
            issueDetailsDate: row.issueDate || 'NA',
            issueDetailsReciversSign: row.issueSignature || 'NA',
            verificationLocation: row.verificationLocation || 'NA',
            verificationDate: row.verificationDate || 'NA',
            verificationTime: row.verificationTime || 'NA',
            recivedBackOnDate: row.receivedDate,
            recivedBackOnReciversSign: row.receivedSignature,
            remarks: row.receivedRemarks || 'NA',
          };
        }),
      };


      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitSharpToolsAndVerificationRegister`,
        payload,
        { headers }
      );

      message.success("Submitted Successfully");
      setOnTimeDisable((prev) => !prev);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");

    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    fetchDetailsByParam();
  }, [ontimedisable]);

  const fetchDetailsByParam = async () => {
    try {

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/SharpToolsAndVerificationRegister/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

        }
      );
      setemptyarraycheck(response.data.length);
      setDetailsByParam(response.data);

      
      if (response.data && response.data.length != 0) {
        const data = response.data[0];
        setId(data.id);
        setRows(
          data.details?.map((item) => ({
            idNumber: item.nameOfItem,
            issueName: item.issueDetailsName,
            issueDate: item.issueDetailsDate,
            issueSignature: item.issueDetailsReciversSign,
            verificationLocation: item.verificationLocation,
            verificationDate: item.verificationDate,
            verificationTime: item.verificationTime,
            receivedDate: item.recivedBackOnDate,
            receivedSignature: item.recivedBackOnReciversSign,
            receivedRemarks: item.remarks,
          })))
        setLineId(data.details.map(item => item.detailsId))

      } else {

      }
    } catch (error) {
      console.error('Error checking BMR existence:', error);
      message.error(error.message);
    } finally {

    }
  };

  const items = [
    {
      key: "1",
      label: <p>Verification Register</p>,
      children: (
        <div>
          <table style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}>

            <tr>
              <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>S.No.</th>
              <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>Name of Item / Identification Number</th>
              <th colSpan="30" style={{ textAlign: "center" }}>Issue Details</th>
              <th colSpan="30" style={{ textAlign: "center" }}>Verification</th>
              <th colSpan="30" style={{ textAlign: "center" }}>Received back on</th>
            </tr>
            <tr>
              <th colSpan="10">Name</th>
              <th colSpan="10">Date</th>
              <th colSpan="10">Receiver's Signature</th>
              <th colSpan="10">Location</th>
              <th colSpan="10">Date</th>
              <th colSpan="10">Time</th>
              <th colSpan="10">Date</th>
              <th colSpan="10">Receiver's Signature</th>
              <th colSpan="10">Remarks</th>
            </tr>
            <tr>

            </tr>

            {rows && rows.map((row, index) => (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", height: "30px" }}>{index + 1}</td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="text"
                  disabled={disabled}
                  
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.idNumber}
                  onChange={(e) => handleChange(index, 'idNumber', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="text"
                  disabled={disabled}
                  onKeyDown={handleKeyDown}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.issueName}
                  onChange={(e) => handleChange(index, 'issueName', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="date"
                  disabled={disabled}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.issueDate}
                  max={formattedToday}
                  onChange={(e) => handleChange(index, 'issueDate', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="text"
                  disabled={disabled}
                  onKeyDown={handleKeyDown}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.issueSignature}
                  onChange={(e) => handleChange(index, 'issueSignature', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="text"
                  disabled={disabled}
                  onKeyDown={handleKeyDown}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.verificationLocation}
                  onChange={(e) => handleChange(index, 'verificationLocation', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="date"
                  disabled={disabled}
                  max={formattedToday}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.verificationDate}
                  onChange={(e) => handleChange(index, 'verificationDate', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="time"
                  disabled={disabled}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.verificationTime}
                  onChange={(e) => handleChange(index, 'verificationTime', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="date"
                  disabled={disabled}
                  max={formattedToday}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.receivedDate}
                  onChange={(e) => handleChange(index, 'receivedDate', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="text"
                  disabled={disabled}
                  onKeyDown={handleKeyDown}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.receivedSignature}
                  onChange={(e) => handleChange(index, 'receivedSignature', e.target.value)}
                /></td>
                <td colSpan="10" style={{ textAlign: "center" }}><input
                  type="text"
                  disabled={disabled}
                  className="inp-new"
                  style={{ width: "85%", border: "none", height: '35px', paddingLeft: "2px" }}
                  value={row.receivedRemarks}
                  onChange={(e) => handleChange(index, 'receivedRemarks', e.target.value)}
                /></td>
                <td
                  colSpan="1"
                  style={{ height: '35px', textAlign: 'center', cursor: 'pointer', size: "40px", border: "none", display: disabled ? 'none' : 'block', }}
                  onClick={() => handleDeleteRow(index)}

                >
                  <DeleteOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                </td>

              </tr>
            ))}
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', marginTop: '20px', width: "100%" }}>
            <button
              onClick={handleAddRow}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "8px",
                padding: "5px",
                border: "none",
                display: disabled ? 'none' : 'block'

              }}
            >
              <PlusOutlined style={{ marginRight: '8px' }} />
              Add Row
            </button>

          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', marginTop: '20px', width: "100%" }}>
            <table style={{ border: "none", borderCollapse: "collapse" }}>
              <tr>
                <td style={{ border: "none" }}><u>Note:</u> Frequency of Verified Once in 4 Hrs & Condition  (Worn/Broken, other visual check, etc) anything absorbed noted in Remarks.</td>
              </tr>
            </table>
          </div>
        </div>
      ),
    }
  ]

  return (
    <div>
      <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />

      <BleachingHeader
        unit="Unit-H"
        formName="Sharp Tools Issue & Verification Register"
        formatNo="PH-QAD01/F-062"
        sopNo="PH-QAD01-D-43"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_SUPERVISOR" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  // display: canDisplayButtons(),
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
                  // display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
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
              </Button>
            </>
          ) : (
            <>
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
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
        <Input
          addonBefore="Department:"
          placeholder="department"
          value={department}
          style={{ width: '20%', height: '35px', marginLeft: "10px" }}
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


      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}

        footer={[
          <Button key="submit" type="primary" shape="round" style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }} onClick={printSubmit}>
            Submit
          </Button>,
        ]}
      >   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Department:</label>
          <Select
            showSearch
            value={departmentPrint}
            onChange={(value) => setDepartmentPrint(value)}
            style={{ width: '100%' }}
            placeholder="Search Department"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Department
            </Select.Option>
            {departmentOptions.map((option) => (
              <Select.Option key={option.id} value={option.department}>
                {option.department}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Year:</label>
          <Select
            showSearch
            value={yearPrint}
            onChange={(value) => setYearPrint(value)}
            style={{ width: '100%' }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Year
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Month:</label>
          <Select
            showSearch
            value={monthPrint}
            onChange={(value) => setMonthPrint(value)}

            style={{ width: '100%' }}
            placeholder="Search Month"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Month
            </Select.Option>
            {monthOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Date:</label>
          <Input
            type="Date"
            value={datePrint}
            max={formattedToday}
            onChange={(e) => setDatePrint(e.target.value)}
            style={{ width: '100%', height: '35px', marginLeft: "10px" }}
            placeholder="Select Date"
            disabled={disabled}
          />
        </div>

      </Modal>

      <div id="section-to-print">
        {printResponseData?.map((rowMain, indexMain) => (
          <table style={{ marginTop: '10px', scale: "94%", tableLayout: "fixed" }}>
            <br />
            <thead >
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: 'center' }}>
                  <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="70" rowSpan="4" style={{ textAlign: 'center' }}>SHARP TOOLS ISSUE & VERIFICATION REGISTER</th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QAD01/F-062</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QAD01-D-43</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15">{indexMain + 1} of {printResponseData.length}</td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
            </thead><br />
            <tbody>
              <tr>
                <th colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>S. No.</th>
                <th colSpan="20" rowSpan="2" style={{ textAlign: "center" }}>Name of Item / Identification Number</th>
                <th colSpan="30" style={{ textAlign: "center" }}>Issue Details</th>
                <th colSpan="30" style={{ textAlign: "center" }}>Verification</th>
                <th colSpan="30" style={{ textAlign: "center" }}>Received back on</th>
              </tr>
              <tr>
                <th colSpan="10" style={{ textAlign: "center" }}>Name</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Date</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Receiver's Signature</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Location</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Date</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Time</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Date</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Receiver's Signature</th>
                <th colSpan="10" style={{ textAlign: "center" }}>Remarks</th>

              </tr>
              {rowMain?.details?.map((row, subIndex) => (
                <tr>
                  <th colSpan="5" style={{ textAlign: "center" }}>{subIndex + 1}</th>
                  <th colSpan="20" style={{ textAlign: "center" }}>{row.nameOfItem}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{row.issueDetailsName}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{formattedDate(row.issueDetailsDate)}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{row.issueDetailsReciversSign}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{row.verificationLocation}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{formattedDate(row.verificationDate)}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{row.verificationTime}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{formattedDate(row.recivedBackOnDate)}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{row.recivedBackOnReciversSign}</th>
                  <th colSpan="10" style={{ textAlign: "center" }}>{row.remarks}</th>
                </tr>
              ))}
            </tbody>
            <br />
            <tr>
              <td colSpan="115"><b>Note:</b>Frequency of Verified Once in 4 Hrs & Condition  (Worn/Broken, other visual check, etc) anything absorbed noted in Remarks</td>
            </tr>
            <tfoot >
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25" >Particulars</th>
                <th colSpan="30" style={{ textAlign: "center" }}>Prepared by</th>
                <th colSpan="30" style={{ textAlign: "center" }}>Reviewed by</th>
                <th colSpan="30" style={{ textAlign: "center" }}>Approved by</th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
            </tfoot>

          </table>
        ))}
      </div>

    </div>

  )
}

export default QA_f62

