/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { PrintPageOrientation } from "../General/PrintPageOrientation.js";

const QA_f15_Summary = () => {
  PrintPageOrientation({ orientation: "landscape", scale: 0.9 });
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [year, setYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const navigate = useNavigate();
  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.mr_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [printResponseData, API.prodUrl, token]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
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
    setYearPrint(null);
  };

  //   handle edit
  const handleEdit = (record) => {
    const { year } = record;
    navigate("/Precot/QA/F-15", {
      state: {
        year: year,
      },
    });
  };
  function generateYearRanges(startYear, endYear) {
    const yearRanges = [];
    for (let year = startYear; year < endYear; year++) {
      yearRanges.push({
        key: `${year}-${year + 1}`,
        value: `${year}-${year + 1}`,
      });
    }
    return yearRanges;
  }

  const yearOptions = generateYearRanges(2024, 2100);

  const handleYearChange = (value) => {
    setYear(value);
  };
  const handleYearPrintChange = (value) => {
    setYearPrint(value);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  //   summary table Get api
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      let apiUrl = `${API.prodUrl}/Precot/api/qa/getSummarydetailsAnnualplan`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            year: item.year,
            mr_status: item.mr_status,
            id: item.id,
            sno: index + 1,
          }))
        );
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.data.message);
    } finally {
    }
  };

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },

    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      title: "QA Manager/MR Status",
      dataIndex: "mr_status",
      key: "mr_status",
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

  const printSubmit = () => {
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
    }
  }, [printResponseData]);

  const fetchPrintValue = (value) => {
    try {
      axios
        .get(
          `${API.prodUrl}/Precot/api/qa/getdetailsForPrintAnnualplan?year=${yearPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.body.message !== "No data") {
            const printResponseData = res.data.body;
            setPrintResponseData(printResponseData);
          } else {
            message.error(res.data.body.message);
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };
  //   goto button
  const goTo = () => {
    if (year == "" || year == null) {
      message.warning("Please Select Year");
      return;
    }
    navigate("/Precot/QA/F-15", {
      state: {
        year: year,
      },
    });
  };
  const recordsPerPage = 4;
  const totalRecords = printResponseData?.[0]?.annualplanlines?.length || 0;
  const totalPages = Math.ceil(totalRecords / recordsPerPage) || 1;
  const paginateData = (data, pageNumber) => {
    if (!data) return [];

    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

  return (
    // print section
    <div>
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table
              key={pageIndex}
              style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
            >
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
                    Annual Plan
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="15">PH-QAD01-F-015</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="15">01</td>
                </tr>
                <td colSpan="15">Ref. SOP No.:</td>
                <td colSpan="15">PH-QAD01-D-18</td>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="15">
                    {" "}
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="115"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <td style={{}} colSpan="115">
                    Year:{printResponseData?.[0]?.year}
                  </td>
                </tr>
                <tr>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    S.No.
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Process
                  </th>
                  <th colSpan="30" style={{ textAlign: "center" }}>
                    Activity
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Apr.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    May.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Jun.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Jul.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Aug.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Sept.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Oct.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Nov.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Dec.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Jan.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Feb.
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Mar.
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Remark
                  </th>
                </tr>

                {paginateData(
                  printResponseData?.[0]?.annualplanlines,
                  pageIndex + 1
                ).map((row, index) => (
                  <React.Fragment key={index}>
                    <tr key={index}>
                      <td
                        colSpan="5"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        {index + 1}
                      </td>
                      {index === 0 && (
                        <td
                          colSpan="10"
                          rowSpan={
                            printResponseData?.[0]?.annualplanlines?.length * 2
                          }
                          style={{
                            textAlign: "center",
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          MRM
                        </td>
                      )}
                      <td
                        colSpan="20"
                        rowSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        {row.activity}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        Plan
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.apr_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.may_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.jun_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.jul_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.aug_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.sept_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.oct_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.nov_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.dec_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.jan_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.feb_plan}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.mar_plan}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {row.plan_remarks}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        Status
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.apr_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.may_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.jun_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.jul_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.aug_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.sept_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.oct_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.nov_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.dec_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.jan_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.feb_status}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.mar_status}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {row.status_remarks}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
                <tr>
                  <td colSpan="55">
                    {getImage1 && (
                      <img
                        src={getImage1}
                        alt="MR/QA Manager Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "200px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}
                    <div style={{ textAlign: "center" }}>
                      {printResponseData?.[0]?.mr_sign}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {formattedDate(printResponseData?.[0]?.mr_submitted_on)}
                    </div>
                  </td>
                  <td colSpan="30">
                    Letters used: ‘P’ for Plan, and ‘C’ for Completed
                  </td>
                  <td colSpan="30">
                    Updated ON:
                    {formattedDate(printResponseData?.[0]?.updatedAt)}
                  </td>
                </tr>
              </tbody>
              <br />
              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="115"></td>
                </tr>
                <tr>
                  <th colSpan="25">Particulars</th>
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
          </div>
        ))}
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
          formName="Annual Plan"
          formatNo="PH-QAD01-F-015"
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
            <label>Year :</label>
          </Col>
          <Col>
            <Select
              showSearch
              value={year}
              onChange={handleYearChange}
              style={{ width: "100%" }}
              placeholder="Search Year"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                SelectYear
              </Select.Option>
              {yearOptions.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
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
          dataSource={tableData}
        />
      </div>

      {/* SUMMARY PRINT */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
            disabled={!yearPrint}
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Year:
          </label>
          <Select
            showSearch
            value={yearPrint}
            onChange={handleYearPrintChange}
            style={{ width: "100%" }}
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              SelectYear
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QA_f15_Summary;
