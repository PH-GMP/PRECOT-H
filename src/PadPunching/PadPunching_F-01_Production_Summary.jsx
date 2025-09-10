/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  Select,
  Table,
  Tooltip,
  message,
  Input,
  Modal,
  Form,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BiLock, BiNavigation } from "react-icons/bi";
import logo from "../Assests/logo.png";

import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";

import { TbMenuDeep } from "react-icons/tb";
import API from "../baseUrl.json";

import "../index.css";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { createGlobalStyle } from "styled-components";

const PadPunchingSummary = () => {
  const [formatNo, setFormatNo] = useState("PH-QAD01-F-054");
  const [formName, setFormName] = useState("Production Details - Log Book");
  const [reason, setReason] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [printSelectDate, setPrintSelectDate] = useState("");
  const [printShift, setPrintShift] = useState("");
  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString().split("T")[0];
  const token = localStorage.getItem("token");
  const [formParams, setFormParams] = useState({
    date: "",
    shift: "",
  });

  const [eSign, setESign] = useState({
    takeover_supervisor_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const formatPrintDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const [printData, setPrintData] = useState([]);

  const formattedSupervisorSubmitOn = formatPrintDate(
    printData && printData.hod_submit_on
  );
  const formattedHodSubmitOn = formatPrintDate(
    printData && printData.hod_submit_on
  );
  const formattedTakeOverSubmitOn = formatPrintDate(
    printData && printData.takeOverSupervisorDate
  );

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "clean_id",
      key: "clean_id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
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
      title: "Actions",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
  } else {
    columns = baseColumns;
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  const options = [
    { value: "1", label: "I" },
    { value: "2", label: "II" },
    { value: "3", label: "III" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleEdit = (record) => {
    navigate(`/Precot/PadPunching/F-01`, {
      state: {
        date: record.date,
        shift: record.shift,
      },
    });
  };
  const handleGoToChange = () => {
    if (formParams.date == "" || formParams.date == null) {
      message.warning("Please Select Date");
      return;
    } else if (formParams.shift == "" || formParams.shift == null) {
      message.warning("Please Select Shift");
      return;
    }

    navigate(`/Precot/PadPunching/F-01`, {
      state: {
        date: formParams.date,
        shift: formParams.shift,
      },
    });
  };

  const handleShift = (selectedOption) => {
    setFormParams((prevState) => ({
      ...prevState,
      shift: selectedOption,
    }));
  };

  const handlePrintShift = (selectedOption) => {
    if (printSelectDate === "") {
      message.warning("please select date!");
      return;
    }
    setPrintShift(selectedOption);
  };

  const handleDateChanges = (e) => {
    setFormParams((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  };
  const handlePrintDateChanges = (e) => {
    setPrintSelectDate(e.target.value);
  };

  const [printLoading, setPrintLoading] = useState(false);
  const handlePrint = () => {
    // Log current states
    // setPrintLoading(true);
    console.log("print Date", printSelectDate);
    console.log("print shift", printShift);

    if (printSelectDate === "") {
      message.warning("Please select Date");
      return;
    }
    if (printShift === "") {
      message.warning("Please select Shift");
      return;
    }

    // Fetch the token from local storage
    const token = localStorage.getItem("token");

    // Make the API call using axios
    axios
      .get(`${API.prodUrl}/Precot/api/Punching/Service/getProdDetailsPrintF01`, {
        params: {
          date: printSelectDate,
          shift: printShift,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Set the response data in printData
        if (!response.data.length > 0) {
          message.warning("no data available for this month");
          return;
        }
        setPrintData(response.data[0]);
        // Print the page
        setTimeout(() => {
          window.print();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setPrintLoading(false);
      });
  };

  const handleModalClose = () => {
    setPrintSelectDate(""); // Reset printSelectDate when the modal is closed
    setPrintShift("");
    setPrintData([]);
    setPrintLoading(false);
    setIsModalPrint(false); // Close the modal
  };
  // Utility function to ensure the value is a number, defaulting to 0 if not
  const toNumber = (value) => {
    return isNaN(Number(value)) ? 0 : Number(value);
  };

  const handleEmpRequiredTotal = () => {
    const result =
      toNumber(printData.ph_male_emp_req) +
      toNumber(printData.ph_female_emp_req) +
      toNumber(printData.cont_male_emp_req) +
      toNumber(printData.con_female_emp_req);
    return result;
  };

  const handlePresentTotal = () => {
    const result =
      toNumber(printData.ph_male_present) +
      toNumber(printData.ph_female_present) +
      toNumber(printData.con_male_present) +
      toNumber(printData.con_female_present);
    return result;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "takeover_supervisor_sign",
      "supervisor_sign",
      "hod_sign",
    ];
    signatureKeys.forEach((key) => {
      console.log("new Data", printData);
      if (printData) {
        const username = printData[key];
        console.log("usernameparams", username);

        if (username) {
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
              setESign((prevSign) => ({
                ...prevSign,
                [key]: url,
              }));
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        }
      }
    });
  }, [token, printData]);

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Make the API call
    axios
      .get(`${API.prodUrl}/Precot/api/Punching/Service/summaryProductionF01`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Set the response data in summaryData
        setSummaryData(response.data);
        // const hasReason = response.data.some(item => item.reason !== null && item.reason !== '');
        const hasReason = response.data.some((item) => item.reason !== null);
        setReason(hasReason);
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle error here
      });
  }, []);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(printData?.details?.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

  return (
    <>
      <div id="section-to-print" style={{ padding: "20px", width: "100%" }}>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table
              key={pageIndex}
              className="f18table"
              style={{ marginTop: "2%", width: "100%" }}
            >
              <thead>
                <tr>
                  <td rowSpan="4" style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br></br>
                    {"UNIT H"}
                  </td>
                  <th rowSpan="4" style={{ textAlign: "center" }} colSpan={5}>
                    {formName}
                  </th>
                  <td colSpan={2}>Format No:</td>
                  <td colSpan={2}>{formatNo}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Revision No:</td>
                  <td colSpan={2}>{"04"}</td>
                </tr>
                <td colSpan={2}>Ref. SOP No:</td>
                <td colSpan={2}>{"PH-PRD04-D-03"}</td>
                <tr>
                  <td colSpan={2}>Page No:</td>
                  <td colSpan={2}>
                    {" "}
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
              </thead>
              <br></br>
              <tbody>
                <tr>
                  <td colSpan={7}>A. Machine & Production Details :</td>
                  <td colSpan={2}>Date: {printSelectDate}</td>
                  <td>shift: {printShift}</td>
                </tr>
                <tr>
                  <td>Machine Name</td>
                  <td>
                    ManPower <br></br>Allocation
                  </td>
                  <td colSpan={2}>Product Name</td>

                  <td>Order NO./BMR NO.</td>
                  <td>PO Number</td>
                  <td>Opening Qty in Nos</td>
                  <td>Packed Qty in Nos</td>
                  <td>Balance Qty in Nos</td>
                  <td>Status</td>
                </tr>
                {paginateData(printData.details, pageIndex + 1).map(
                  (item, index) => (
                    // {printData && paginateData && printData.details.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td rowSpan={2} style={{ textAlign: "center" }}>
                          {item.machine_name}
                        </td>
                        <td rowSpan={2} style={{ textAlign: "center" }}>
                          {item.man_power_allocation}
                        </td>
                        <td style={{ textAlign: "center" }}>Running</td>
                        <td style={{ textAlign: "center" }}>
                          {item.running_product_name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.running_order_no}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.running_po_number}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.running_opening_qty}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.running_packed_qty}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.running_balancr_qty}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.running_status}
                        </td>
                      </tr>
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>Next</td>
                        <td style={{ textAlign: "center" }}>
                          {item.next_product_name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.next_order_no}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.next_po_number}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.next_opening_qty}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.next_packed_qty}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.next_balance_qty}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.next_status}
                        </td>
                      </tr>
                    </>
                  )
                )}
                {pageIndex + 1 === totalPages && (
                  <>
                    <tr>
                      <td colSpan={10}>B. Manpower Details :</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Category</td>
                      <td colSpan={2}>Employees Required</td>
                      <td colSpan={2}>Present</td>
                      <td colSpan={4}>Remarks</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>PH- Male</td>
                      <td colSpan={2}>
                        {printData && printData.ph_male_emp_req}
                      </td>
                      <td colSpan={2}>
                        {printData && printData.ph_male_present}
                      </td>
                      <td colSpan={4} rowSpan={5}>
                        {printData && printData.remarks}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>PH- Female</td>
                      <td colSpan={2}>
                        {printData && printData.ph_female_emp_req}
                      </td>
                      <td colSpan={2}>
                        {printData && printData.ph_female_present}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Contract - Male</td>
                      <td colSpan={2}>
                        {printData && printData.cont_male_emp_req}
                      </td>
                      <td colSpan={2}>
                        {printData && printData.con_male_present}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Contract - Female</td>
                      <td colSpan={2}>
                        {printData && printData.con_female_emp_req}
                      </td>
                      <td colSpan={2}>
                        {printData && printData.con_female_present}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Total</td>
                      <td colSpan={2}>
                        {printData && handleEmpRequiredTotal(printData)}
                      </td>
                      <td colSpan={2}>
                        {printData && handlePresentTotal(printData)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        Production Supervisor Sign & Date:
                        <br></br>
                        <br></br>
                        {eSign.supervisor_sign ? (
                          <img
                            src={eSign.supervisor_sign}
                            alt="HOD eSign"
                            style={{
                              width: "100px",
                              height: "50px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                        <br />
                        <br />
                        <b>
                          {printData ? printData.supervisor_sign : ""}
                          <br></br>
                          {formattedSupervisorSubmitOn}
                        </b>
                      </td>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        Takeover Production Supervisor<br></br>
                        Sign & Date:
                        <br></br>
                        <br></br>
                        {eSign.takeover_supervisor_sign ? (
                          <img
                            src={eSign.takeover_supervisor_sign}
                            alt="HOD eSign"
                            style={{
                              width: "100px",
                              height: "50px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                        <br />
                        <br />
                        <b>
                          {printData ? printData.takeover_supervisor_sign : ""}
                          <br></br>
                          {formattedTakeOverSubmitOn}
                        </b>
                      </td>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        HOD / Designee Sign & Date:
                        <br></br>
                        <br></br>
                        {eSign.hod_sign ? (
                          <img
                            src={eSign.hod_sign}
                            alt="HOD eSign"
                            style={{
                              width: "100px",
                              height: "50px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                        <br />
                        <br />
                        <b>
                          {printData ? printData.hod_submit_by : ""}
                          <br></br>
                          {formattedHodSubmitOn}
                        </b>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
              <br></br>
              <tfoot>
                <tr>
                  <td>Particulars</td>
                  <td colSpan={3}>Prepard by</td>
                  <td colSpan={3}>Reviewed by</td>
                  <td colSpan={3}>Approved by</td>
                </tr>

                <tr>
                  <td>Name</td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                </tr>
                <tr>
                  <td>Signature & Date</td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      <BleachingHeader
        formName={formName}
        formatNo={formatNo}
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
            icon={<FaPrint color="#00308F" />}
            onClick={showPrintModal}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="Production Summary (Print)"
        open={isModalPrint}
        width={380}
        destroyOnClose={true}
        onOk={() => setIsModalPrint(false)}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            type="primary"
            onClick={handlePrint}
            loading={printLoading}
          >
            Print
          </Button>,
        ]}
      >
        <div>
          <label htmlFor="yearSelect">Select Date: </label>
          <Input
            style={{ width: "150px" }}
            type="date"
            onChange={handlePrintDateChanges}
            max={today}
          ></Input>
        </div>
        <div>
          <label htmlFor="monthSelect">Select shift: </label>
          <Select
            options={options}
            placeholder="Shift"
            onChange={handlePrintShift}
            style={{
              width: "150px",
              borderRadius: "40px",
              textAlign: "center",
              margin: "5px",
            }}
            dropdownStyle={{
              color: "#00308F",
              textAlign: "center",
            }}
          />
        </div>
      </Modal>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <label style={{ marginTop: "8px" }}>Date : </label>
        <Input
          style={{ width: "150px" }}
          type="date"
          onChange={handleDateChanges}
          max={today}
        ></Input>
        <label style={{ marginTop: "8px" }}>Shift : </label>
        <Select
          options={options}
          placeholder="Shift"
          onChange={handleShift}
          style={{
            width: "150px",
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />

        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={handleGoToChange}
        >
          Go To
        </Button>
      </div>

      {/* Summary table */}
      <Table columns={columns} dataSource={summaryData} />
    </>
  );
};

export default PadPunchingSummary;
