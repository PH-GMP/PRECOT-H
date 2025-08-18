/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Modal,
  notification,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation, BiSolidAddToQueue } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;
const QA_F018_Summary = () => {
  const initial = useRef(false);
  const [deaprtment, setdepartment] = useState([]);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMR No");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [ccfno_number, setccfno_number] = useState("");
  const [showSaveSubmitButtons, setShowSaveSubmitButtons] = useState(false);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);
  const [printResponseData, setPrintResponseData] = useState([]);
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] = useState("Select CCFNo");
  const [availableshift2, setAvailableShifts2] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno2, setbatchno2] = useState([]);
  const [batchNolist2, setBatchNolist2] = useState("Select Department Name");
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [batchno, setbatchno] = useState([]);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const roleBase = localStorage.getItem("role");
  const months = [
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
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  
  useEffect(() => {
    fetchData_dep_by_id()
    if (!initial.current) {
      initial.current = true;
      fetchDataOrderNumber();
      fetchDataCCRNO();
    }
  }, []);


  const departmentMap = {
    1: "BLEACHING",
    2: "SPUNLACE",
    3: "PAD_PUNCHING",
    4: "DRY_GOODS",
    5: "QUALITY_CONTROL",
    6: "QUALITY_ASSURANCE",
    7: "PPC",
    8: "STORE",
    9: "DISPATCH",
    10: "PRODUCT_DEVELOPMENT",
    11: "ENGINEERING",
    12: "COTTON_BUDS",
    13: "MARKETING",
    14: "HR",
  };
  const storedIds = localStorage.getItem("departmentId");

  const getDepartmentName = storedIds
    ?.split(",")
    .map((id) => departmentMap[parseInt(id)])
    .filter(Boolean)
    .join(",");

  const Desginee_access = getDepartmentName?.includes("QUALITY_ASSURANCE");

  const fetchData_dep_by_id = async () => {
    if (
      roleBase === "ROLE_HOD" ||
      (roleBase === "ROLE_DESIGNEE" && !Desginee_access)
    ) {
      console.log("(roleBase === ROLE_DESIGNEE && !Desginee_access)")
      try {
        setLoading(true);
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getSummaryHod`,
          {
            params: { department: getDepartmentName },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (
          response.data &&
          (response.data?.length > 0 || response.data?.length === undefined)
        ) {
          setmodalData(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          message.warning("You do not have permission to access this form.");
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    }
    else if (
      roleBase === "QA_MANAGER" ||
      (roleBase === "ROLE_DESIGNEE" && Desginee_access)
    ) {
      try {
        console.log("      (roleBase === ROLE_DESIGNEE && Desginee_access")
        setLoading(true);

        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getSummaryQaManager`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If the request is successful, handle the response data
        if (
          response.data &&
          (response.data?.length > 0 || response.data?.length == undefined)
        ) {
          setmodalData(response.data);
        }
      } catch (error) {
        // Check if the error is a 403 Forbidden error
        if (error.response && error.response.status === 403) {
          message.warning("You do not have permission to access this form.");
          setTimeout(() => {
            navigate("/Precot/choosenScreen"); // Redirect to the summary page
          }, 1500);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };


  const handleSelectChange = (type, value) => {
    let updatedMonth = selectedMonth;
    let updatedYear = selectedYear;
    let updatedDepartment = batchNolist2;

    if (type === "month") {
      setSelectedMonth(value);
      updatedMonth = value; // Update the local variable
    } else if (type === "year") {
      setSelectedYear(value);
      updatedYear = value; // Update the local variable
    } else if (type === "department") {
      setBatchNolist2(value);
      updatedDepartment = value; // Update the local variable
    }
    handleprint_section(updatedMonth, updatedYear, updatedDepartment);
  };

  // Call API on select change
  const handleprint_section = async (month, year, department) => {
    axios
      .get(
        `${API.prodUrl
        }/Precot/api/QA/Service/CustomerComplaintRegisterForm/print?month=${month || ""
        }&year=${year || ""}&department=${department || ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data && res.data.length > 0) {
          // Your logic for setting response data and images
          // ...
          message.success("Data Fetched Successfully");
          setIsFetchSuccessful(false);
          setPrintResponseData(res.data);

          //api image for inspector
          const complaintsWithImages = await fetchImagesForComplaints(res.data);
          setPrintResponseData(complaintsWithImages);
        } else {
          setPrintResponseData([]);
          message.error("No data found...!");
          setIsFetchSuccessful(true);
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        notification.warning({
          message: "Notification",
          description:
            err.response?.data?.message ||
            "Error occurred while fetching data.",
        });
      });
  };
  const fetchImagesForComplaints = async (complaints) => {
    const imagePromises = complaints.map(async (complaint) => {
      try {
        // Fetch HOD image
        const hodResponse = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${complaint.hod_sign}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        );

        const hodBase64 = btoa(
          new Uint8Array(hodResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const imageHOD = `data:image/jpeg;base64,${hodBase64}`;

        // Fetch QA image
        const qaResponse = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${complaint.qa_mr_sign}`, // Assuming qa_sign is the field for QA's signature
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        );

        const qaBase64 = btoa(
          new Uint8Array(qaResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const imageQA = `data:image/jpeg;base64,${qaBase64}`;

        // Return complaint data with both images
        return { ...complaint, imageHOD, imageQA };
      } catch (error) {
        console.error("Error fetching images for complaint:", error);
        return { ...complaint, imageHOD: null, imageQA: null }; // Handle errors gracefully
      }
    });

    return Promise.all(imagePromises);
  };

  const fetchDataCCRNO = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/CustomerComplaintRegisterForm/getCcfLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // //
          // //
          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const ccfno2 = Array.isArray(res.data)
              ? res.data.map((shift) => shift.value)
              : [];
            setAvailableShifts(ccfno2);
            setAvailableShifts2(ccfno2);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataOrderNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const data = res.data?.map((laydownno) => laydownno.department);
            setbatchno(data);
            setbatchno2(data);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGo = async () => {
    if (
      availableshiftlov == null ||
      availableshiftlov == "" ||
      availableshiftlov == "[]" ||
      availableshiftlov == "Select CCFNo" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select CCF No");
      return;
    }

    navigate("/Precot/QA/F-18", {
      state: {
        depno: deaprtment,
        ccfno: availableshiftlov,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/F-18", {
      state: {
        ccfno: record.ccf_no,
      },
    });
  };

  const getccfnodata = async () => {
    try {
      const res = await axios.get(
        `${API.prodUrl}/Precot/api/qa/number/generation?formNumber=PH-QAD01-F-018`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set the state with the generated number
      setccfno_number(res.data);

      // Navigate after the state is updated
      navigate("/Precot/QA/F-18", {
        state: {
          ccfno: res.data, // Use res.data directly
        },
      });
    } catch (error) {
      console.error("Error generating ccfno number:", error);
    }
  };

  const handleCreate = () => {
    setShowSaveSubmitButtons(true);
    getccfnodata(); // Fetch data and navigate inside the function
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setShowModal(true);
    setSelectedYear(null);
    setSelectedMonth(null);
    setBatchNolist2(null);
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
      title: "CCF No",
      dataIndex: "ccf_no",
      key: "mixing",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "QA Manager / Designee Status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
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
    setSelectedYear(null);
    setSelectedMonth(null);
    setBatchNolist2(null);
  };
  const handleDatePrintChange = (event) => { };
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
        formName="CUSTOMER COMPLAINT REGISTER FORM "
        formatNo="PH-QAD01-F-018"
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
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            Print
          </Button>,
          <Button
            key="back"
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
            Select CCF No.:
          </div>
          <Select
            style={{
              width: "150px",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select CCF No"
            value={availableshiftlov}
            onChange={setAvailableShiftslov}
            disabled={
              (roleBase === "QA_MANAGER" &&
                selectedRow?.supervisor_status === "QA_APPROVED") ||
              (roleBase === "ROLE_HOD" &&
                selectedRow?.hod_status === "HOD_APPROVED")
            }
          >
            {availableshift?.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
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

          <Button
            key="create"
            onClick={handleCreate}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display:
                localStorage.getItem("role") === "QA_MANAGER" ||
                  (localStorage.getItem("role") === "ROLE_DESIGNEE" &&
                    Desginee_access)
                  ? "block"
                  : "none",
            }}
            shape="round"
            icon={<BiSolidAddToQueue color="#00308F" />}
            type="primary"
          >
            Create
          </Button>
        </div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={modalData}
        />
        <div id="section-to-print">
          {printResponseData.map((complaint, index) => (
            <table style={{ borderCollapse: "collapse", scale: "90%" }}>
              <thead>
                <tr>
                  <td colSpan="5" rowspan="4 " style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "80px", height: "auto" }}
                    />
                    <br></br>
                    Unit H
                  </td>
                  <th colSpan="40" rowSpan="4" style={{ textAlign: "center" }}>
                    CUSTOMER COMPLAINT REGISTER FORM
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="40">PH-QAD01-F-018</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="40">01</td>
                </tr>
                <td colSpan="15">Ref. SOP No.:</td>
                <td colSpan="40">PH-QAD01-D-19</td>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="40">
                    {index + 1} of {printResponseData?.length}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                {printResponseData && printResponseData?.length > 0 ? (
                  <React.Fragment key={index}>
                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        CCF No.:{" "}
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {complaint.ccf_no}
                      </td>
                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Date:
                      </td>
                      <td colSpan="52" style={{ paddingLeft: "10px" }}>
                        {moment(complaint.date).format("DD/MM/YYYY")}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Complaint Received Date:
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {complaint.complaint_received_date}
                      </td>
                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Invoice No. / Date:
                      </td>
                      <td colSpan="52" style={{ paddingLeft: "10px" }}>
                        {complaint.invoice_no}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Customer Name:
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {complaint.customer_name}
                      </td>
                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Product Name:
                      </td>
                      <td colSpan="52" style={{ paddingLeft: "10px" }}>
                        {complaint.product_name}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Customer Complaint Ref. No.:
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {complaint.customer_complaint_ref_no}
                      </td>
                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Sale Order No. /Date:
                      </td>
                      <td colSpan="52" style={{ paddingLeft: "10px" }}>
                        {complaint.sale_order_no}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Batch No. / Lot No. /FG No.:
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {complaint.batch_no}
                      </td>
                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Container No.:
                      </td>
                      <td colSpan="52" style={{ paddingLeft: "10px" }}>
                        {complaint.container_no}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Production Date:
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {complaint.production_date}
                      </td>
                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Sample Received On:
                      </td>
                      <td colSpan="52">{complaint.sample_received_on}</td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Complaint Sample Received On:
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {complaint.complaint_sample_received}
                      </td>
                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Complaint Replied On:
                      </td>
                      <td colSpan="52" style={{ paddingLeft: "10px" }}>
                        {complaint.complaint_replied_on}
                      </td>
                    </tr>

                    <tr>
                      <td
                        colSpan="100"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        Department: {complaint.department}
                      </td>
                    </tr>

                    <tr>
                      <td
                        colSpan="100"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        Nature of Complaint:
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Strength of Product
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.strength_of_product}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Lesser count
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.lesser_count}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Classification:
                      </td>
                      <td
                        colSpan="20"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      ></td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Packing:
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.packing}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Contamination:
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.contamination}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Critical:
                      </td>
                      <td
                        colSpan="20"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.critical}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Grammage (GSM)
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.grammage}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Less Qty, (Load ability)
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.less_qty}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Major
                      </td>
                      <td
                        colSpan="20"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.major}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Chemical; pH
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.chemical}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Others:
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.others}
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Minor
                      </td>
                      <td
                        colSpan="25"
                        style={{ paddingLeft: "10px", textAlign: "center" }}
                      >
                        {complaint.minor}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="100">
                        Nature of Non-Conformity (in detail):{" "}
                        {complaint.nature_of_non_conformity}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={100} style={{ paddingLeft: "10px" }}>
                        Complaint Investigation / Analysis:
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="100">Why1: {complaint.why1}</td>
                    </tr>
                    <tr>
                      <td colSpan="100">Why2: {complaint.why2}</td>
                    </tr>
                    <tr>
                      <td colSpan="100">Why3: {complaint.why3}</td>
                    </tr>
                    <tr>
                      <td colSpan="100">Why4: {complaint.why4}</td>
                    </tr>
                    <tr>
                      <td colSpan="100">Why5: {complaint.why5}</td>
                    </tr>

                    <tr>
                      <td colSpan={70} rowSpan={2}>
                        <div>Corrective Action / Preventive Action:</div>
                        {complaint.corrective_action}
                      </td>
                      <td colSpan={30}>
                        Responsibility
                        <div>{complaint.hod_sign}</div>
                        <div>
                          {moment(complaint.hod_submit_on).format(
                            "DD-MM-YYYY HH:mm"
                          )}
                        </div>
                        {complaint.imageHOD && (
                          <img
                            src={complaint.imageHOD}
                            alt="HOD Sign"
                            style={{
                              width: "60px",
                              height: "60px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={30}>Target Date: {complaint.target_date}</td>
                    </tr>

                    <tr>
                      <td colSpan={70} rowSpan={2}>
                        <div>
                          Verification for Effectiveness of Action(s) Taken:
                        </div>
                        {complaint.verification_for_effectiveness}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={30} style={{ textAlign: "center" }}>
                        <div>{complaint.qa_mr_sign}</div>
                        <div>
                          {moment(complaint.qa_mr_submit_on).format(
                            "DD-MM-YYYY HH:mm"
                          )}
                        </div>

                        {complaint.imageQA && (
                          <img
                            src={complaint.imageQA}
                            alt="QA Sign"
                            style={{
                              width: "60px",
                              height: "60px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                        <div style={{ width: "100%" }}>
                          --------------------------------------
                        </div>
                        <div style={{ width: "100%" }}>
                          (Signature of Manager - QA)
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ) : (
                  <tr>
                    <td colSpan="100" style={{ textAlign: "center" }}>
                      No complaints available.
                    </td>
                  </tr>
                )}
              </tbody>
              <br />

              <tfoot>
                <tr>
                  <td colspan="20" style={{ padding: "1em" }}>
                    Particulars
                  </td>
                  <td colspan="20" style={{ padding: "1em" }}>
                    Prepared By
                  </td>
                  <td colspan="30" style={{ padding: "1em" }}>
                    Reviewed By
                  </td>
                  <td colspan="30" style={{ padding: "1em" }}>
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td colspan="20" style={{ padding: "1em" }}>
                    Name
                  </td>
                  <td colspan="20" style={{ padding: "1em" }}></td>
                  <td colspan="30" style={{ padding: "1em" }}></td>
                  <td colspan="30" style={{ padding: "1em" }}></td>
                </tr>
                <tr>
                  <td colspan="20" style={{ padding: "1em" }}>
                    Signature & Date
                  </td>
                  <td colspan="20" style={{ padding: "1em" }}></td>
                  <td colspan="30" style={{ padding: "1em" }}></td>
                  <td colspan="30" style={{ padding: "1em" }}></td>
                </tr>
              </tfoot>
            </table>
          ))}
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
              disabled={isFetchSuccessful}
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
              Select Year :
            </div>
            <Select
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Year"
              value={selectedYear}
              onChange={(value) => handleSelectChange("year", value)}
            >
              {years?.map((year, index) => (
                <Option key={index} value={year}>
                  {year}
                </Option>
              ))}
            </Select>

            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Month:
            </div>
            <Select
              style={{
                width: "100%",
                height: "40px", // Fixed typo '40x' to '40px'
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Month"
              value={selectedMonth}
              onChange={(value) => handleSelectChange("month", value)}
            >
              {months?.map((month, index) => (
                <Option key={index} value={month}>
                  {month}
                </Option>
              ))}
            </Select>
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Department Name:
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Department Name"
              value={batchNolist2}
              onChange={(value) => handleSelectChange("department", value)}
              showSearch
            >
              {batchno2?.map((MacLOV, index) => (
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

export default QA_F018_Summary;
