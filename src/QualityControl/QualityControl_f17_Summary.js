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
import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f17_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  }
`;
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [GlasswareBreakage, setGlasswareBreakage] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [summary, setSummary] = useState();
  const [getData, setGetData] = useState([]);
  const [printData, setPrintData] = useState([]);
  // const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  // const [cakingData, setCakingData] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

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

  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (role == "ROLE_MICROBIOLOGIST") {
        message.info("This form cant be accessed by Microbiologist");
        navigate("/Precot/choosenScreen");
      }
    }, 2000);

    printData?.forEach((item, index) => {
      const username = printData[index]?.chemist_sign;
      // setSaveLoading(true);
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
            setGetImage((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [printData,   API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printData?.forEach((item, index) => {
      const username = printData[index]?.microbiologist_sign;
      // setSaveLoading(true);
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          });
      }
    });
  }, [printData,   API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printData?.forEach((item, index) => {
      const username = printData[index]?.manager_sign;
      // setSaveLoading(true);
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          });
      }
    });
  }, [printData,   API.prodUrl, token]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.manager_status == "CHEMIST_DESIGNEE_REJECTED" ||
          data.manager_status == "MICRO_DESIGNEE_REJECTED"
        ) {
          console.log("Manager", data.manager_status);
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

  const handlePrintChange = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${  API.prodUrl}/Precot/api/qc/RegantPreparationReport/GetByMonthYear/print`,
        {
          headers,
          params: {
            month: selectMonth,
            year: selectYear,
          },
        }
      )
      .then((res) => {
        //       console.log("first response", res.data);
        //       setPrintData(res.data);
        //       setTimeout(() => {
        //         // setLoading(false)
        //         window.print();
        //       }, 1000);
        //     })
        //     .catch((err) => {
        //       console.log("Error", err);
        //       message.error(err.res.data);
        //     });
        if (Array.isArray(res.data) && res.data.length > 0) {
          console.log("First response", res.data);
          setPrintData(res.data);
          setTimeout(() => {
            window.print();
          }, 1000);
        } else {
          setPrintData([]);
          message.error("No data found for the provided parameters.");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        message.error(err?.response?.data || "An error occurred.");
      });
  };

  //   handle edit
  const handleEdit = (record) => {
    const x = summary.filter((x, i) => {
      return record.id == x.id;
    });
    const { date } = record;
    console.log("first ", x);
    // const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate("/Precot/QualityControl/F-017", {
      state: {
        month: x[0].month,
        year: x[0].year,
        id: x[0].id,
        date: x[0].preparationDate,
      },
    });
  };

  // Get the All Summary.....
  // useEffect(() => {
  //   const { formNo } = state || {};
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   };

  //   axios
  //     .get(`${   API.prodUrl}/Precot/api/qc/RegantPreparationReport/GetAll`, {
  //       headers,
  //     })
  //     .then((response) => {
  //       if (response.data && response.data.length !== 0) {
  //         setReason(true);
  //       } else {
  //         setReason(false);
  //       }
  //       // setGetData(response.data);
  //       setGetData(response.data);

  //       console.log(" Response", response.data);
  //       const a = response.data.map((x, i) => {
  //         return {
  //           formatName: x.formatName,
  //           formatNo: x.formatNo,
  //           revisionNo: x.revisionNo,
  //           refSopNo: x.refSopNo,
  //           unit: x.unit,
  //           preparationDate: x.preparationDate,
  //           id: x.id,
  //           month: x.month,
  //           year: x.year,
  //           chemist_status: x.chemist_status,
  //           microbiologist_status: x.microbiologist_status,
  //           manager_status: x.manager_status,
  //           reason: x.reason,
  //         };
  //       });
  //       // console.log("aaa", a);
  //       setSummary(a);
  //       // setSummary(a);
  //     })
  //     .catch(() => {});
  // }, []);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${  API.prodUrl}/Precot/api/qc/RegantPreparationReport/GetAll`, {
        headers,
      })
      .then((response) => {
        if (response.data && response.data.length !== 0) {
          setGetData(response.data);
          const rejectedData = response.data.filter(
            (data) =>
              data.manager_status === "CHEMIST_DESIGNEE_REJECTED" ||
              data.manager_status === "MICRO_DESIGNEE_REJECTED"
          );

          setReason(rejectedData.length > 0);

          const summaryData = response.data.map((x) => ({
            formatName: x.formatName,
            formatNo: x.formatNo,
            revisionNo: x.revisionNo,
            refSopNo: x.refSopNo,
            unit: x.unit,
            preparationDate: x.preparationDate,
            id: x.id,
            month: x.month,
            year: x.year,
            chemist_status: x.chemist_status,
            microbiologist_status: x.microbiologist_status,
            manager_status: x.manager_status,
            reason: x.reason,
          }));

          setSummary(summaryData);
        } else {
          setGetData([]);
          setReason(false);
        }
      })
      .catch(() => {});
  }, []);

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    // {
    //   title: "Preparation Date",
    //   dataIndex: "preparationDate",
    //   key: "preparationDate",
    //   align: "center",
    //   render: (text) => formatDate(text),
    // },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "manager_status",
      key: "manager_status",
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
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  // Add role-based columns
  const chemistColumn = {
    title: "Chemist Status",
    dataIndex: "chemist_status",
    key: "chemist_status",
    align: "center",
  };

  const microbiologistColumn = {
    title: "Microbiologist Status",
    dataIndex: "microbiologist_status",
    key: "microbiologist_status",
    align: "center",
  };

  // Define the Reason column
  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  // Get the columns based on the role and reason
  let columns = [...baseColumns];

  // Add role-specific columns
  if (role == "ROLE_CHEMIST" || role == "CHEMIST_DESIGNEE") {
    columns.splice(3, 0, chemistColumn);
  }
  //  else if (role == "ROLE_MICROBIOLOGIST" || role == "MICRO_DESIGNEE") {
  //   columns.splice(3, 0, microbiologistColumn);
  // }

  // Add the reason column if applicable
  if (reason) {
    columns = [...columns.slice(0, 5), Reason, ...columns.slice(5)];
  }

  //   goto button
  const goTo = () => {
    if (selectYear == "" && selectMonth == "") {
      message.warning("Please Select Year and Month");
      return;
    }
    navigate("/Precot/QualityControl/F-017", {
      state: {
        month: selectMonth,
        year: selectYear,
        date: "",
      },
    });
  };
  return (
    // print section
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {printData?.map((slice, index) => (
          <table style={{ marginTop: "10px", scale: "94%" }}>
            <br />
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                  REAGENT PREPARATION RECORD
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QCL01/F-017</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">01</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QCL01-D-12</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15">
                  {index + 1} of {printData.length}
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115">
                  {/* Month & Year : {printData?.[index]?.month}/{printData?.[index]?.year} */}
                </td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan="115">
                  Month & Year : {printData?.[index]?.month}/
                  {printData?.[index]?.year}
                </td>
              </tr>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Chemical Name{" "}
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Chemical Quantity used(g){" "}
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Prepared Solution Quantity (ml){" "}
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Dilution / Normality / Molarity
                </th>
                <th colSpan="15" style={{ textAlign: "center" }}>
                  Preparation Date{" "}
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Expiry Date{" "}
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Prepared By{" "}
                </th>
                <th colSpan="10" style={{ textAlign: "center" }}>
                  Verified By{" "}
                </th>
              </tr>
              {printData.map((record, recordIndex) =>
                record.qcReagentPreparationRecordF017ChemTables.map(
                  (chem, index) => (
                    <tr key={`${record.id}-${index}`}>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {index + 1}
                      </td>
                      <td colSpan="20" style={{ textAlign: "center" }}>
                        {chem.chemicalName}
                      </td>
                      <td colSpan="15" style={{ textAlign: "center" }}>
                        {chem.chemicalQuantityUsed}
                      </td>
                      <td colSpan="15" style={{ textAlign: "center" }}>
                        {chem.preparedSolutionQuantity}
                      </td>
                      <td colSpan="15" style={{ textAlign: "center" }}>
                        {chem.dilution_normality_morality}
                      </td>
                      <td colSpan="15" style={{ textAlign: "center" }}>
                        {chem.preparedDate
                          ? moment(chem.preparedDate).format("DD/MM/YYYY")
                          : "-"}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {chem.expiryDate
                          ? moment(chem.expiryDate).format("DD/MM/YYYY")
                          : "-"}
                      </td>
                      {/* <td colSpan="10" style={{ textAlign: "center" }}>{record.preparedBy}</td> */}
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {record.chemist_sign && record.chemist_submit_on ? (
                          <>
                            <img
                              className="signature"
                              src={getImage[recordIndex] || ""}
                              // alt="Chemist Signature"
                            />
                            <br />
                            {record.chemist_sign}
                            <br />
                            {moment(record.chemist_submit_on).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {record.manager_sign && record.manager_submit_on ? (
                          <>
                            <img
                              className="signature"
                              src={getImage2[recordIndex] || ""}
                              // alt="Manager Signature"
                            />
                            <br />
                            {record.manager_sign}
                            <br />
                            {moment(record.manager_submit_on).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particular</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Approved by
                </th>
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

      {/* HEADER */}
      <div div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="REAGENT PREPARATION RECORD"
          formatNo="PH-QCL01/F-017"
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

        {/* Go To Row */}

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <label htmlFor="yearSelect">Select Year</label>
            <Select
              id="yearSelect"
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onChange={(value) => setSelectYear(value)}
              placeholder="Select Year"
            >
              <Select.Option value="" disabled selected hidden>
                Select Year
              </Select.Option>
              {years.map((year) => (
                <Select.Option key={year.value} value={year.value}>
                  {year.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="monthSelect">Select Month</label>
            <Select
              id="monthSelect"
              style={{
                width: "100%",
                height: "36x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onChange={(value) => setSelectMonth(value)}
              // onChange={(value) => handleDatePrintChange(value)}
              placeholder="Select Month"
            >
              <Select.Option value="" disabled selected hidden>
                Select Month
              </Select.Option>
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          {/* <div>
         <Input
              placeholder="Date"
              type="date"
              size="small"
              value={newDate}
              onChange={handleDateChanges}
              style={{ flex: 1 }}
              max={getCurrentDate()}
            />
            </div> */}
          <Button
            key="Create"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            onClick={goTo}
          >
            Go to
          </Button>
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
            dataSource={summary}
          />
        </div>

        {/* SUMMARY PRINT */}
      </div>
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
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
            onClick={handlePrintChange}
            // disabled={printBtnStatus}
          >
            Print
          </Button>,
        ]}
      >
        {/* <h4  style={{ textAlign: "center" , color: "blueviolet"}} htmlFor="yearSelect">{formNo}</h4>  */}{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "16px",
          }}
        >
          <label
            htmlFor="yearSelect"
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Select Year
          </label>
          <Select
            id="yearSelect"
            style={{
              width: "100%",
            }}
            onChange={(value) => setSelectYear(value)}
            placeholder="Select Year"
            showSearch
          >
            <Select.Option value="" disabled selected hidden>
              Select Year
            </Select.Option>
            {years.map((year) => (
              <Select.Option key={year.value} value={year.value}>
                {year.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "16px",
          }}
        >
          <>
            <label
              htmlFor="monthSelect"
              style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
            >
              Select Month
            </label>
            <Select
              id="monthSelect"
              style={{
                width: "100%",
              }}
              onChange={(value) => setSelectMonth(value)}
              // onChange={(value) => handleDatePrintChange(value)}
              placeholder="Select Month"
            >
              <Select.Option value="" disabled selected hidden>
                Select Month
              </Select.Option>
              {months.map((month) => (
                <Select.Option key={month.value} value={month.value}>
                  {month.label}
                </Select.Option>
              ))}
            </Select>
          </>
        </div>
      </Modal>
    </div>
  );
};

export default QualityControl_f17_Summary;
