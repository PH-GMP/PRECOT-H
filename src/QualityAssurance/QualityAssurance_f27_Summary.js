/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const Drygoods_f01_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
    date: "",
  });
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const [eSign, setESign] = useState({
    qa_inspector_sign: "",
    qa_mr_sign: "",
  });
  const [printLov, setPrintLov] = useState({
    monthLov: [],
    yearLov: [],
  });
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
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
          .catch((err) => {});
      }
    });
  }, [token, printData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        response.data.map((data, index) =>
          fetchSignature(data.username, data.username)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, []);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/ListOfMomRecallsummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.plant_head_status === "PLANT_HEAD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);
  //---------------------------------------------------------------------------

  // ---------------------------- Summary Table Column -------------------------
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
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
      title: "QA Manager/ Designee Status",
      dataIndex: "manager_status",
      key: "manager_status",
      align: "center",
    },
    {
      title: "Plant Head Status",
      dataIndex: "plant_head_status",
      key: "plant_head_status",
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
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }

  const handleFormParam = (value, key) => {
    setFormParams((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "year") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
        date: "",
      }));
    }
    if (name === "month") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: "",
      }));
    }
    if (name === "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
        year: "",
      }));
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleGo = () => {
    if (formParams.date === "") {
      message.warning("Please Select The Date");
      return;
    }
    navigate(`/Precot/QualityAssurance/F-027`, {
      state: {
        date: formParams.date,
      },
    });
  };

  const handleEdit = (record) => {
    navigate(`/Precot/QualityAssurance/F-027`, {
      state: {
        date: record.date,
      },
    });
  };

  const handlePrint = async () => {
    if (
      printParams.year === "" &&
      printParams.month === "" &&
      printParams.date === ""
    ) {
      message.warning("Please Select Atleast One Field");
      return;
    }
    if (printParams.month !== "" && printParams.year === "") {
      message.warning("Please Select The Year");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/ListOfMomRecallPrint?year=${printParams.year}&month=${printParams.month}&date=${printParams.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length === "") {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }
      const uniqueSigns = new Set();

      const fetchSignatures = async () => {
        for (const entry of response.data) {
          const { manager_sign, plant_head_sign } = entry;

          if (manager_sign && !uniqueSigns.has(manager_sign)) {
            uniqueSigns.add(manager_sign);
            fetchSignature(manager_sign, manager_sign);
          }
          if (plant_head_sign && !uniqueSigns.has(plant_head_sign)) {
            uniqueSigns.add(plant_head_sign);
            fetchSignature(plant_head_sign, plant_head_sign);
          }
        }
      };

      await fetchSignatures();

      setPrintData(response.data);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (printData.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [4000]);
    }
  }, [printData]);

  const fetchSignature = async (sign, key) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${sign}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {}
  };
  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      year: "",
      month: "",
      date: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }
    const currentMonth = new Date().getMonth() + 1;
    const allMonths = [
      { value: "01", label: "JAN" },
      { value: "02", label: "FEB" },
      { value: "03", label: "MAR" },
      { value: "04", label: "APR" },
      { value: "05", label: "MAY" },
      { value: "06", label: "JUN" },
      { value: "07", label: "JUL" },
      { value: "08", label: "AUG" },
      { value: "09", label: "SEP" },
      { value: "10", label: "OCT" },
      { value: "11", label: "NOV" },
      { value: "12", label: "DEC" },
    ];

    const filteredMonthBasedOnYear = allMonths.filter(
      (month) => parseInt(month.value) <= currentMonth
    );
    const months =
      printParams.year == currentYear ? filteredMonthBasedOnYear : allMonths;
    setPrintLov((prevState) => ({
      ...prevState,
      yearLov: years,
      monthLov: months,
    }));
  }, [printParams.year]);

  const GlobalStyle = createGlobalStyle`
    @media print {
      @page {
        size: landscape;
      }
      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 100%;
        transform: scale(0.8); /* Adjust scale as needed */
        transform-origin: top left right bottom; /* Adjust the origin if needed */
      }
    }
                      .page-break {
                page-break-after: always;
            }
  `;

  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />

        {printData.map((data, index) => (
          <div className="page-break">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "20px" }}></td>
                </tr>
                <tr>
                  <td rowSpan={4} colSpan={1}>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          width: "80px",
                          height: "auto",
                          textAlign: "center",
                        }}
                      />
                      <br></br>
                      <br></br>

                      <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "0.5em",
                      textAlign: "center",
                      fontWeight: "bold",
                      width: "60%",
                    }}
                    colSpan={3}
                    rowSpan={4}
                  >
                    MINUTES OF MEETING - MOCK RECALL
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01-F-027</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>01</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01-D-24</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Page No.:</td>
                  <td style={{ padding: "0.5em" }}>
                    {index + 1} of {printData.length}
                  </td>
                </tr>
                {/* <tr>
                                    <td style={{ border: "none", padding: '10px' }}></td>
                                </tr> */}
              </thead>
              <br />
              <tbody>
                <tr>
                  <td colSpan={6}>Date : {formatDate(data.date)} </td>
                </tr>
                <tr>
                  <td colSpan={6}>Venue : {data.venue} </td>
                </tr>
                <tr>
                  <td colSpan={6}>Members Present: </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>S. No.</td>
                  <td style={{ textAlign: "center" }}>Name </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Department{" "}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Signature{" "}
                  </td>
                </tr>
                {data.momHeaderDetails.map((row, rowIndex) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{rowIndex + 1}</td>
                    <td style={{ textAlign: "center" }}>{row.name}</td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {row.department}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {" "}
                      {eSign[row.name] ? (
                        <img
                          src={eSign[row.name]}
                          alt="eSign"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ textAlign: "center" }}>Agenda / Topic</td>
                  <td style={{ textAlign: "center" }}>Details of Discussion</td>
                  <td style={{ textAlign: "center" }}>Action Taken</td>
                  <td style={{ textAlign: "center" }}>Responsibility</td>
                  <td style={{ textAlign: "center" }}>Target Date</td>
                  <td style={{ textAlign: "center" }}>Status</td>
                </tr>
                {data.momLineDetails.map((row, rowIndex) => (
                  <tr>
                    {rowIndex === 0 ? (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                        rowSpan={data.momLineDetails.length}
                      >
                        {data.agenda}
                      </td>
                    ) : null}
                    <td style={{ textAlign: "center" }}>
                      {row.details_discussion}
                    </td>
                    <td style={{ textAlign: "center" }}>{row.actn_taken}</td>
                    <td style={{ textAlign: "center" }}>
                      {row.responsibility}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {formatDate(row.target_date)}
                    </td>
                    <td style={{ textAlign: "center" }}>{row.status}</td>
                  </tr>
                ))}

                <tr>
                  <td style={{ textAlign: "center" }} colSpan={3}>
                    Prepared by:{" "}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={3}>
                    Approved by:{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={3}>
                    {eSign[data.manager_sign] ? (
                      <img
                        src={eSign[data.manager_sign]}
                        alt="Operator eSign"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <br />
                    {data.manager_sign}
                    <br />
                    {formatDateAndTime(data.manager_submitted_on)}
                  </td>
                  <td
                    style={{ textAlign: "center", borderTop: "none" }}
                    colSpan={3}
                  >
                    {eSign[data.plant_head_sign] ? (
                      <img
                        src={eSign[data.plant_head_sign]}
                        alt="Operator eSign"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <br />
                    {data.plant_head_sign}
                    <br />
                    {formatDateAndTime(data.plant_head_approved_on)}
                  </td>
                </tr>
              </tbody>
              <br />
              <tfoot>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Prepared By
                  </td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Reviewed By
                  </td>
                  <td style={{ padding: "1em", textAlign: "center" }}>
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={1}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={1}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>
      <BleachingHeader
        formName={"MINUTES OF MEETING - MOCK RECALL"}
        formatNo={"PH-QAD01-F-027"}
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
        title="MINUTES OF MEETING - MOCK RECALL (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            OK
          </Button>,
        ]}
      >
        <span style={{ marginRight: "10px", marginLeft: "10px" }}>
          {" "}
          Year :{" "}
        </span>
        <Select
          options={printLov.yearLov}
          value={printParams.year}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "year");
          }}
          disabled={printParams.date !== ""}
        ></Select>

        <br></br>
        <br />
        <span style={{ marginRight: "10px", marginLeft: "2px" }}>
          {" "}
          Month :{" "}
        </span>
        <Select
          options={printLov.monthLov}
          value={printParams.month}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "month");
          }}
          disabled={printParams.date !== ""}
        ></Select>
        <br></br>
        <br />
        <span style={{ marginRight: "10px", marginLeft: "12px" }}>
          {" "}
          Date :{" "}
        </span>
        <Input
          type="date"
          value={printParams.date}
          style={{ textAlign: "center", width: "200px" }}
          onChange={(e) => {
            handlePrintParams(e.target.value, "date");
          }}
          max={today}
          readOnly={printParams.year !== "" || printParams.month !== ""}
        ></Input>
      </Modal>
      <div style={{ margin: "10px" }}>
        <span> Date </span>
        <Input
          type="date"
          style={{ textAlign: "center", width: "150px" }}
          onChange={(e) => {
            handleFormParam(e.target.value, "date");
          }}
          max={today}
        ></Input>
        <Button
          key="go"
          onClick={handleGo}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          type="primary"
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default Drygoods_f01_Summary;
