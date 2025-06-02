/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import {
  getDepartmentName,
  getFullMonthFromNumber,
  slashFormatDate,
} from "../util/util.js";

const QA_F007_TrainingRec_summary = () => {
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
  });
  const initialized = useRef(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [summary, setSummaryData] = useState([]);
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [printDatas, setPrintDatas] = useState([
    {
      formatName: "Training Record",
      formatNo: "PH-QAD01-F-007",
      revisionNo: "03",
      refSopNo: "PH-QAD01-D-15",
      unit: "Unit H",
      date: "",
      month: "",
      year: "",
      department: "",
      mode_of_training: "",
      topic: "",
      training_session_no: "",
      content: "",
      venue: "",
      start_time: "",
      end_time: "",
      name_of_trainer: "",
      reference_document: "",
      trainer_signature_and_date: "",
      reason: "",
      hod_status: "",
      hod_saved_on: "",
      hod_saved_by: "",
      hod_saved_id: "",
      hod_submitted_on: "",
      hod_submitted_by: null,
      hod_submitted_id: null,
      hod_sign: "",
      details: [
        {
          name_of_the_employee: "",
          employee_id: "",
          department: "",
          signature: "",
        },
      ],
    },
  ]);
  const [eSign, setESign] = useState([
    {
      hod_sign: null,
    },
  ]);

  useEffect(() => {
    const signatureKeys = ["hod_sign"];
    signatureKeys.forEach((key) => {
      if (printDatas && printDatas.length > 0) {
        printDatas.forEach((dataItem, index) => {
          let newSign = {}; // Create a new object for the current printData item

          signatureKeys.forEach((key) => {
            const username = dataItem[key];

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
                  newSign[key] = url;

                  setESign((prevSign) => {
                    const updatedSigns = [...prevSign];
                    updatedSigns[index] = {
                      ...updatedSigns[index],
                      ...newSign,
                    };
                    return updatedSigns;
                  });

                  console.log("esign on each iternation", eSign);
                })
                .catch((err) => {});
            }
          });
        });
      }
    });
  }, [printDatas]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const departmentId = localStorage.getItem("departmentId");

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${
              API.prodUrl
            }/Precot/api/QA/Service/TrainingRecordSummary?department=${getDepartmentName(
              departmentId
            )}`,
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
      for (const data of summary) {
        if (
          data.qc_status == "QC_REJECTED" ||
          data.qc_status == "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

  const columns = [
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
      render: (text) => slashFormatDate(text),
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
      render: (text) => text || "NA",
    },

    {
      title: "Training Session Number",
      dataIndex: "training_session_no",
      key: "training_session_no",
      align: "center",
      render: (text) => text || "NA",
    },

    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
      render: (text) => text || "NA",
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              navigate("/Precot/QA/F007", {
                state: {
                  date: record.date,
                },
              })
            }
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGo = async () => {
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }

    navigate("/Precot/QA/F007", {
      state: {
        date: formParams.date,
      },
    });
  };

  const handlePrint = () => {
    if (printParams.year === "" && printParams.month === "") {
      message.warning("Please Select Month and year");
      return;
    }

    setPrintButtonLoading(true);

    axios
      .get(
        `${
          API.prodUrl
        }/Precot/api/QA/Service/TrainingRecordPrint?month=${getFullMonthFromNumber(
          printParams.year,
          printParams.month
        )}&year=${printParams.year}&department=${getDepartmentName(
          localStorage.getItem("departmentId")
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.length === 0) {
          message.warning("No Data Available To Print");
          setPrintButtonLoading(false);
          return;
        }

        setPrintDatas(response.data[0]);

        setTimeout(() => {
          setPrintButtonLoading(false);
          window.print();
        }, 1000);
      })
      .catch((error) => {
        setPrintButtonLoading(false);
        message.error(error.response.data.message);
      });
  };

  const handlePrintCancel = () => {
    setPrintParams({
      month: "",
      year: "",
    });
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  
  const formatDates = (dateString) => {
    if (!dateString) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateString)) {
      return dateString;
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handlePrintMonthChange = (e) => {
    const [year, month] = e.target.value.split("-");

    setPrintParams({
      year: year,
      month: month,
    });
  };

  const recordsPerPage = 15;
  const totalPages = Math.ceil(printDatas?.details?.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

  return (
    <div>
      <div id="section-to-print">
        <style>
          {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print table th,
  #section-to-print table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
        </style>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table key={pageIndex}>
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "30px" }}></td>
                </tr>

                <tr>
                  <th
                    colSpan="1"
                    rowSpan="4"
                    printDateSubmit
                    style={{ textAlign: "center", height: "80px" }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />{" "}
                    <br></br>
                    Unit H
                  </th>
                  <th colSpan="2" rowSpan="4" style={{ textAlign: "center" }}>
                    {"TRAINING RECORD"}
                  </th>
                  <th style={{ padding: "0.5rem" }}>Format No.:</th>
                  <th style={{ padding: "0.5rem" }}>PH-QAD01-F-007</th>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem" }}>Revision No.:</th>
                  <th style={{ padding: "0.5rem" }}>01</th>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem" }}>Ref. SOP No.:</th>
                  <th style={{ padding: "0.5rem" }}>PH-QAD01-D-15</th>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem" }}>Page No.:</th>
                  <th style={{ padding: "0.5rem" }}>
                    {" "}
                    {pageIndex + 1} of {totalPages}
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
              </thead>
              <tbody>
                {pageIndex === 0 && (
                  <>
                    <tr>
                      <td style={{ padding: "0.5rem" }}>Mode of Training</td>
                      <td colSpan="4" style={{ padding: "0.5rem" }}>
                        {printDatas.mode_of_training}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ padding: "0.5rem" }}>
                        Topic:{printDatas.topic}
                      </td>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        Date:{formatDates(printDatas.date)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.5rem" }}>
                        Training Session No.
                      </td>
                      <td colSpan={4} style={{ padding: "0.5rem" }}>
                        {printDatas.training_session_no}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        rowSpan="4"
                        style={{ padding: "0.5rem", verticalAlign: "top" }}
                      >
                        Contents:
                        {printDatas.content}
                      </td>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        Venue:{printDatas.venue}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        Start Time:{printDatas.start_time}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ padding: "0.5rem" }}>
                        End Time:{printDatas.end_time}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.5rem" }}>
                        Name of Trainer:{printDatas.name_of_trainer}
                      </td>
                      <td style={{ padding: "0.5rem" }}>
                        Reference Document, if any:{" "}
                        {printDatas.reference_document}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        S. No.
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        Name of Employee
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        Employee Id.
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        Dept.
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        signature
                      </td>
                    </tr>
                  </>
                )}
                {paginateData(printDatas?.details, pageIndex + 1).map(
                  (detail, index) => (
                    <tr key={index}>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {index + 1 + recordsPerPage * pageIndex}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {detail.name_of_the_employee}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {detail.employee_id}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {detail.department}
                      </td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        {detail.signature}
                      </td>
                    </tr>
                  )
                )}
                {pageIndex + 1 === totalPages && (
                  <>
                    <tr>
                      <td
                        colSpan={5}
                        style={{ padding: "0.5rem", textAlign: "center" }}
                      >
                        <div>Trainer Signature & Date:</div>
                        <div>
                          <div>{printDatas.hod_sign}</div>
                          <div>
                            {formatDates(printDatas.hod_submitted_on)}
                          </div>
                          <div>
                            {eSign[0]?.hod_sign ? (
                              <img
                                src={eSign[0]?.hod_sign}
                                alt="hod_sign"
                                style={{
                                  width: "100px",
                                  height: "50px",
                                  objectFit: "contain",
                                  mixBlendMode: "multiply",
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: "0.5rem", border: "none" }}></td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: "0.5rem" }}>
                    Particulars
                  </td>
                  <td style={{ padding: "0.5rem" }}>Prepared By</td>
                  <td style={{ padding: "0.5rem" }}>Reviewed By</td>
                  <td style={{ padding: "0.5rem" }}>Approved By</td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: "0.5rem" }}>
                    Name
                  </td>
                  <td style={{ padding: "0.5rem" }}></td>
                  <td style={{ padding: "0.5rem" }}></td>
                  <td style={{ padding: "0.5rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: "0.5rem" }}>
                    Signature & Date
                  </td>
                  <td style={{ padding: "0.5rem" }}></td>
                  <td style={{ padding: "0.5rem" }}></td>
                  <td style={{ padding: "0.5rem" }}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>
      <BleachingHeader
        formName={"TRANING RECORD"}
        formatNo={"PH-QAD01-F-007"}
        unit={"UNIT H"}
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
            Date :
          </div>
          <Input
            type="date"
            max={today}
            onChange={(e) => {
              handleFormParams(e.target.value, "date");
            }}
            style={{ width: "150px", textAlign: "center" }}
          ></Input>

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
          dataSource={summary}
        />
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <Modal
          title="Training Record (Print)"
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
              Print
            </Button>,
          ]}
        >
          {/* disabled={printParams.date !== ''} */}
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ margin: "0.5rem", width: "30%" }}>
              Month & Year :{" "}
            </span>
            <input
              type="month"
              onChange={handlePrintMonthChange}
              style={{ margin: "0.5rem" }}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F007_TrainingRec_summary;
