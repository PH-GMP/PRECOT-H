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

const QualityControl_f28_Summary = () => {
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
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [formNo, setFormNo] = useState("");

  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [printData, setPrintData] = useState([]);

  useEffect(() => {
    const { formNo } = state || {};
    console.log("format No : ", formNo);
    setFormNo(formNo);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

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

  const handlePrintDate = (e) => {
    setSelectDate(e.target.value);
  };

  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    printData?.forEach((item, index) => {
      const username = printData[index]?.chemist_sign;
      // setSaveLoading(true);
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
  }, [printData,      API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    printData?.forEach((item, index) => {
      const username = printData[index]?.microbiologist_sign;
      // setSaveLoading(true);
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
  }, [printData,      API.prodUrl, token]);

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

  // Get the All Summary.....
  useEffect(() => {
    const { formNo } = state || {};
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${    API.prodUrl}/Precot/api/qc/GlasswareBreakageDisposal/GetAll`, {
        headers,
      })
      .then((response) => {
        setGetData(response.data);

        console.log(" Response", response.data);
        const a = response.data.map((x, i) => {
          return {
            formatName: x.formatName,
            formatNo: x.formatNo,
            revisionNo: x.revisionNo,
            refSopNo: x.refSopNo,
            unit: x.unit,
            brakageDate: x.brakageDate,
            id: x.id,
            month: x.month,
            year: x.year,
            chemist_status: x.chemist_status || "NA",
            microbiologist_status: x.microbiologist_status || "NA",
          };
        });
        // console.log("aaa", a);
        setSummary(a);
        // setSummary(a);
      })
      .catch(() => {});
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectDate("");
    setSelectMonth("");
    setSelectYear("");
  };

  const handlePrintChange = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .get(`${    API.prodUrl}/Precot/api/qc/GlasswareBreakageDisposal/PrintForF028`, {
        headers,
        params: {
          date: selectDate,
          month: selectMonth,
          year: selectYear,
        },
      })
      .then((res) => {
        if (res.data === `No data found for the provided parameters`) {
          message.info("No Data Found");
        } else {
          setPrintData(res.data); // Set the print data

          // After setting data, wait for images to load
          setTimeout(() => {
            window.print();
            handleModalClose(); // Close the modal after printing
          }, 3000); // Optional small delay to ensure data is rendered
        }
      })
      .catch((err) => {
        message.error(err.response.message);
      });
  };

  // Function to load all images before printing

  //   handle edit
  const handleEdit = (record) => {
    const x = summary.filter((x, i) => {
      return record.id == x.id;
    });
    console.log("X", x);
    const formattedDate = moment(x[0].date).format("YYYY-MM-DD");
    navigate("/Precot/QualityControl/F-028", {
      state: {
        date: x[0].brakageDate,
        formNo: x[0].formatNo,
        formid: x[0].id,
        formmonth: x[0].month,
        formyear: x[0].year,
      },
    });
  };

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
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Brakage Date",
      dataIndex: "brakageDate",
      key: "brakageDate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "Microbiologist Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
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

  // const printSubmit = () => {
  //   window.print();
  // };
  // const fetchPrintValue = (value) => {
  //   try {
  //     axios
  //       .get(
  //         `${
  //                API.prodUrl
  //         }/Precot/api/spulance/fetchBaleConsumption?order=${12}&date=${datePrint}&shift=${value}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data && res.data.message !== "No data") {
  //           const printResponseData = res.data[0];
  //           setPrintResponseData(printResponseData);
  //         } else {
  //         }
  //       })
  //       .catch((err) => {});
  //   } catch (error) {}
  // };
  //   goto button
  const goTo = () => {
    // const { formNo } = state || {};
    if (date == "" || date == null) {
      message.warning("Please Select Date");
      return;
    }

    navigate("/Precot/QualityControl/F-028", {
      state: {
        date: date,
        formNo: formNo,
        formid: "",
      },
    });
  };
  return (
    // print section
    <div>
      <div id="section-to-print">
        <style>
          {`
    @media print {
      @page {
        size: portrait;
      }
      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 100%;
        transform: scale(0.9);
      }
      #section-to-print {
        page-break-after: always;
      }
    }
  `}
        </style>

        {(() => {
          const itemsPerPage = 6; // Number of items per page
          const totalPages = Math.ceil(printData.length / itemsPerPage); // Total pages needed

          // Split the printData into chunks for each page
          const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
            const startIndex = pageIndex * itemsPerPage;
            const pageData = printData.slice(
              startIndex,
              startIndex + itemsPerPage
            );

            return (
              <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
                {/* Header */}
                <table
                  className="f18table"
                  style={{ width: "90%", height: "50%", marginTop: "7%" }}
                >
                  <tbody>
                    <tr>
                      <td
                        colSpan="10"
                        rowSpan="4"
                        style={{ textAlign: "center", height: "80px" }}
                      >
                        <img
                          src={logo}
                          alt="Logo"
                          style={{ width: "100px", height: "auto" }}
                        />
                        <br />
                        Unit H
                      </td>
                      <td
                        colSpan="60"
                        rowSpan="4"
                        style={{ textAlign: "center" }}
                      >
                        Glasswares Breakage & Disposal Register
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        Format No.:
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        PH-QCL01/F-028
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        Revision No.:
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        01
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        Ref. SOP No.:
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        NA
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        Page No.:
                      </td>
                      <td colSpan="10" style={{ paddingLeft: "5px" }}>
                        {pageIndex + 1} of {totalPages}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Table Data */}
                <table style={{ marginTop: "2%", width: "90%" }}>
                  <thead>
                    <tr>
                      <th colSpan="5" style={{ textAlign: "center" }}>
                        S.No.
                      </th>
                      <th colSpan="20" style={{ textAlign: "center" }}>
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
                      <th colSpan="15" style={{ textAlign: "center" }}>
                        Disposer Sign & Date
                      </th>
                      <th colSpan="15" style={{ textAlign: "center" }}>
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((data, index) => (
                      <tr key={index}>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          {startIndex + index + 1}
                        </td>
                        <td colSpan="20" style={{ textAlign: "center" }}>
                          {data.materialDescription}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {data.volumeCapacity}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {data.breakageQty}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {formatDate(data.brakageDate)}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {data.disposalStatus}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {/* chemist data */}
                          {data.chemist_sign && data.chemist_submit_on && (
                            <>
                              {/* Render chemist's signature image if available */}
                              {getImage[index] && (
                                <img
                                  className="signature"
                                  src={getImage[index]}
                                  alt="Chemist Signature"
                                />
                              )}
                              <br />
                              {/* Render chemist's name */}
                              {data.chemist_sign}
                              <br />
                              {/* Render chemist's submission date */}
                              {moment(data.chemist_submit_on).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                              <br />
                            </>
                          )}

                          {/* Microbiologist Section */}
                          {data.microbiologist_sign &&
                            data.microbiologist_submit_on && (
                              <>
                                {/* Render microbiologist's signature image if available */}
                                {getImage1[index] && (
                                  <img
                                    className="signature"
                                    src={getImage1[index]}
                                    alt="Microbiologist Signature"
                                  />
                                )}
                                <br />
                                {/* Render microbiologist's name */}
                                {data.microbiologist_sign}
                                <br />
                                {/* Render microbiologist's submission date */}
                                {moment(data.microbiologist_submit_on).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </>
                            )}
                        </td>
                        <td colSpan="15" style={{ textAlign: "center" }}>
                          {data.remark || "NA"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer */}
                <table style={{ marginTop: "2%", width: "90%" }}>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "start",
                        padding: "5px 0px 5px 10px",
                      }}
                    >
                      Particulars
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Prepared by
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Reviewed by
                    </td>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Approved by
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "start",
                        padding: "5px 0px 5px 10px",
                      }}
                    >
                      Name
                    </td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                  </tr>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "start",
                        padding: "5px 0px 5px 10px",
                      }}
                    >
                      Signature & Date
                    </td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                    <td colSpan="5"></td>
                  </tr>
                </table>
              </div>
            );
          });

          return pages; // Render all pages
        })()}
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
          formName="Glasswares Breakage & Disposal Register"
          formatNo="PH-QCL01/F-028"
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

        <Row
          align="middle"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "flex-start",
            display: "flex",
            gap: "10px",
            justifyContent: "left",
            marginLeft: "10px",
          }}
        >
          <Col>
            <label>Date :</label>
          </Col>
          <Col>
            <Input
              onChange={handleDateChange}
              type="date"
              value={date}
              max={getCurrentDate()}
              size="small"
              style={{ width: "100%", height: "30px" }}
            />
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
          columns={baseColumns}
          dataSource={summary}
        />
      </div>

      {/* SUMMARY PRINT */}
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
          >
            Print
          </Button>,
        ]}
      >
        <h4
          style={{ textAlign: "center", color: "blueviolet" }}
          htmlFor="yearSelect"
        >
          {formNo}
        </h4>{" "}
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
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          <label
            htmlFor="monthSelect"
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>
          <Input
            placeholder="Date"
            type="date"
            size="small"
            value={selectDate}
            onChange={handlePrintDate}
            style={{ width: "100%" }}
            max={getCurrentDate()}
          />
        </div>
      </Modal>
    </div>
  );
};

export default QualityControl_f28_Summary;
