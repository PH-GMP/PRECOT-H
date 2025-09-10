/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Table, Tooltip, Select } from "antd";
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
import { getFullMonthFromNumber, slashFormatDate } from "../util/util.js";

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
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDepartmentPrint, setSelectedDepartmentPrint] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [printDatas, setPrintDatas] = useState([]);
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
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
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
    12: "COTTEN_BUDS",
    13: "MARKETING",
    14: "HR",
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const storedIds = localStorage.getItem("departmentId");
      const getDepartmentName = storedIds
        ?.split(",")
        .map((id) => departmentMap[parseInt(id)])
        .filter(Boolean)
        .join(",");

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/TrainingRecordSummary?department=${getDepartmentName}`,
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
                  selectedDepartment: record.department,
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
    if (!selectedDepartment) {
      message.warning("Please Select Department");
      return;
    }

    const storedIds = localStorage.getItem("departmentId");

    let singleDepartmentId = null;

    if (storedIds && !storedIds.includes(",")) {
      singleDepartmentId = storedIds;
    }

    if (
      singleDepartmentId &&
      selectedDepartment != departmentMap[singleDepartmentId]
    ) {
      message.warning("Please Select Your Current Department");
      return;
    }

    //multiple department user check
    const DepartmentName = storedIds
      ?.split(",")
      .map((id) => departmentMap[parseInt(id)])
      .filter(Boolean)
      .join(",");

    console.log("DepartmentName", DepartmentName);
    console.log(
      "DepartmentName?.includes(selectedDepartment)",
      DepartmentName?.includes(selectedDepartment)
    );

    // Check if selected department id is in the list
    if (!DepartmentName?.includes(selectedDepartment)) {
      message.warning("Selected department is not in your department list");
      return;
    }

    navigate("/Precot/QA/F007", {
      state: {
        date: formParams.date,
        selectedDepartment: selectedDepartment,
      },
    });
  };

  const handlePrint = () => {
    if (printParams.year === "" && printParams.month === "") {
      message.warning("Please Select Month and year");
      return;
    } else if (!selectedDepartmentPrint) {
      message.warning("Please select department");
    }

    setPrintButtonLoading(true);

    axios
      .get(
        `${
          API.prodUrl
        }/Precot/api/QA/Service/TrainingRecordPrint?month=${getFullMonthFromNumber(
          printParams.year,
          printParams.month
        )}&year=${printParams.year}&department=${selectedDepartmentPrint}`,
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

        setPrintDatas(response.data);

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
    setSelectedDepartmentPrint("");
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

        {(() => {
          const recordsPerPage = 5; // Changed from 5 to 8 as requested

          // Calculate total pages across ALL records
          const totalPagesAllRecords = printDatas.reduce((sum, record) => {
            const detailsCount = record?.details?.length || 0;
            // pages needed for this record
            const pagesForThisRecord = Math.ceil(detailsCount / recordsPerPage);
            return sum + pagesForThisRecord;
          }, 0);

          // Running counter for global page numbering
          let globalPageCounter = 0;

          return printDatas?.map((record, recordIndex) => {
            const totalPagesForThisRecord = Math.ceil(
              record?.details?.length / recordsPerPage
            );

            const paginateData = (data, pageNumber) => {
              const start = (pageNumber - 1) * recordsPerPage;
              return data.slice(start, start + recordsPerPage);
            };

            return (
              <div key={recordIndex}>
                {Array.from({ length: totalPagesForThisRecord }).map(
                  (_, pageIndex) => {
                    globalPageCounter++;

                    return (
                      <div
                        key={pageIndex}
                        className="page-break"
                        style={{ marginTop: "40px" }}
                      >
                        <table>
                          <thead>
                            <tr>
                              <td
                                style={{ border: "none", padding: "30px" }}
                              ></td>
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
                              <th
                                colSpan="2"
                                rowSpan="4"
                                style={{ textAlign: "center" }}
                              >
                                {"TRAINING RECORD"}
                              </th>
                              <th style={{ padding: "0.5rem" }}>Format No.:</th>
                              <th style={{ padding: "0.5rem" }}>
                                PH-QAD01/F-007
                              </th>
                            </tr>
                            <tr>
                              <th style={{ padding: "0.5rem" }}>
                                Revision No.:
                              </th>
                              <th style={{ padding: "0.5rem" }}>01</th>
                            </tr>
                            <tr>
                              <th style={{ padding: "0.5rem" }}>
                                Ref. SOP No.:
                              </th>
                              <th style={{ padding: "0.5rem" }}>
                                PH-QAD01-D-15
                              </th>
                            </tr>
                            <tr>
                              <th style={{ padding: "0.5rem" }}>Page No.:</th>
                              <th style={{ padding: "0.5rem" }}>
                                {globalPageCounter} of {totalPagesAllRecords}
                              </th>
                            </tr>
                            <tr>
                              <td
                                style={{ padding: "0.5rem", border: "none" }}
                              ></td>
                            </tr>
                          </thead>
                          <tbody>
                            {pageIndex === 0 && (
                              <>
                                <tr>
                                  <td style={{ padding: "0.5rem" }}>
                                    Mode of Training
                                  </td>
                                  <td colSpan="4" style={{ padding: "0.5rem" }}>
                                    {record.mode_of_training}
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={3} style={{ padding: "0.5rem" }}>
                                    Topic: {record.topic}
                                  </td>
                                  <td colSpan={2} style={{ padding: "0.5rem" }}>
                                    Date: {formatDates(record.date)}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ padding: "0.5rem" }}>
                                    Training Session No.
                                  </td>
                                  <td colSpan={4} style={{ padding: "0.5rem" }}>
                                    {record.training_session_no}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    colSpan={3}
                                    rowSpan="4"
                                    style={{
                                      padding: "0.5rem",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    Contents: {record.content}
                                  </td>
                                  <td colSpan={2} style={{ padding: "0.5rem" }}>
                                    Venue: {record.venue}
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2} style={{ padding: "0.5rem" }}>
                                    Start Time: {record.start_time}
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2} style={{ padding: "0.5rem" }}>
                                    End Time: {record.end_time}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ padding: "0.5rem" }}>
                                    Name of Trainer: {record.name_of_trainer}
                                  </td>
                                  <td style={{ padding: "0.5rem" }}>
                                    Reference Document, if any:{" "}
                                    {record.reference_document}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    S. No.
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    Name of Employee
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    Employee Id.
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    Dept.
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    signature
                                  </td>
                                </tr>
                              </>
                            )}
                            {paginateData(record.details, pageIndex + 1).map(
                              (detail, index) => (
                                <tr key={index}>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    {index + 1 + recordsPerPage * pageIndex}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    {detail.name_of_the_employee}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    {detail.employee_id}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    {detail.department}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    <img
                                      src={`data:image/png;base64,${detail.signature}`}
                                      alt="Signature"
                                      style={{ maxHeight: "50px" }}
                                    />
                                    <div>
                                      {formatDates(record?.hod_submitted_on)}
                                    </div>
                                  </td>
                                </tr>
                              )
                            )}
                            {pageIndex + 1 === totalPagesForThisRecord && (
                              <>
                                <tr>
                                  <td
                                    colSpan={5}
                                    style={{
                                      padding: "0.5rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    <div>Trainer Signature & Date:</div>
                                    <div>
                                      <div>{record.hod_sign}</div>
                                      <div>
                                        {formatDates(record.hod_submitted_on)}
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
                              <td
                                style={{
                                  padding: "0.5rem",
                                  border: "none",
                                }}
                              ></td>
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
                    );
                  }
                )}
              </div>
            );
          });
        })()}
      </div>

      <BleachingHeader
        formName={"TRANING RECORD"}
        formatNo={"PH-QAD01/F-007"}
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
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Department :
          </div>
          <Select
            placeholder="Select Department"
            value={selectedDepartment}
            onChange={(value) => {
              setSelectedDepartment(value);
            }}
            style={{ width: "180px", textAlign: "center" }}
          >
            {departments.map((dept) => (
              <Select.Option
                key={dept.department}
                value={dept.department}
                style={{ textAlign: "center" }}
              >
                {dept.department}
              </Select.Option>
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
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ margin: "0.5rem", width: "50%" }}>
              Department :{" "}
            </span>
            <Select
              placeholder="Select Department"
              value={selectedDepartmentPrint}
              onChange={(value) => {
                setSelectedDepartmentPrint(value);
              }}
              style={{ width: "80%", textAlign: "center" }}
            >
              {departments.map((dept) => (
                <Select.Option
                  key={dept.department}
                  value={dept.department}
                  style={{ textAlign: "center" }}
                >
                  {dept.department}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F007_TrainingRec_summary;
