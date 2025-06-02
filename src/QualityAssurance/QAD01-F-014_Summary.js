/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, message, Modal, Row, Select, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f14_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: portrait; /* A3 size in portrait mode */
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed to fit the A3 size */
      transform-origin: top left; /* Adjust the origin to top left for better alignment */
    }
  }
`;

  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [yearPrint, setYearPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [getImage1, setGetImage1] = useState("");
  const [iarOptions, setIarOptions] = useState([]);
  const [iarOptionPrint, setIarOptionPrint] = useState([]);
  const [Selectediar, setSelectedIar] = useState([]);
  const [selectediarprint, setselectediarprint] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.qaManagerSign;
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
    setIarOptionPrint(null);
    setselectediarprint(null);
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

  const yearOptions = generateYearRanges(2020, 2100);

  useEffect(() => {
    fetchDetailsByDep();
  }, []);

  const fetchDetailsByDep = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditDepartments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        const filteredDepartments = response.data
          .map((item) => item.auditDepartment)
          .filter((dept) => dept !== "MR [SMR01]"); // Exclude "MR [SMR01]"

        setDepartment(filteredDepartments);
      } else {
        message.error("No data found for the selected year");
      }
    } catch (error) {
      console.error("Error fetching audit departments:", error);
      message.error(
        error.response?.data?.message || "Error fetching audit departments"
      );
    }
  };

  const handleChange = async (year) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSummary/getIarForYear?year=${year}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );

      if (response.data) {
        const decodedData = new TextDecoder("utf-8").decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedData);
        if (Array.isArray(parsedData)) {
          setIarOptions(parsedData);
        }
      }
    } catch (error) {
      console.error("Error fetching IAR list:", error);
    }
  };

  const handleChangePrint = async (yearPrint) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSummary/getIarForYear?year=${yearPrint}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );

      if (response.data) {
        const decodedData = new TextDecoder("utf-8").decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedData);
        if (Array.isArray(parsedData)) {
          setIarOptionPrint(parsedData);
        }
      }
    } catch (error) {
      console.error("Error fetching IAR list:", error);
    }
  };

  const handlePrintIar = async (selectediarprint) => {
    const token = localStorage.getItem("token");

    try {
      const iarList = selectediarprint.join(",");

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSummary/getInternalAuditSummaryForPrint?year=${yearPrint}&iarNo=${iarList}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer", // Fetch the response as arraybuffer
        }
      );

      if (response.data) {
        const decodedData = new TextDecoder("utf-8").decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedData);

        setPrintResponseData(parsedData);
      }
    } catch (error) {
      console.error("Error fetching IAR list:", error);
    }
  };

  useEffect(() => {
    if (printResponseData && Object.keys(printResponseData).length > 0) {
      // You can do any necessary data preparation here, but no printing yet
    }
  }, [printResponseData]);

  const printSubmit = () => {
    handlePrintIar(selectediarprint);
    if (printResponseData && Object.keys(printResponseData).length > 0) {
      const validKeys = Object.keys(printResponseData).filter(
        (key) => key !== ""
      );

      if (validKeys.length > 0) {
        const firstKey = validKeys[0]; // Use the first valid key
        const dataArray = printResponseData[firstKey];

        if (Array.isArray(dataArray) && dataArray.length > 0) {
          // Wait a little before calling window.print()
          setTimeout(() => {
            window.print();
            handleModalClose();
          }, 100);
        }
      }
    }
  };

  const goTo = () => {
    if (year == "" || year == null) {
      message.warning("Please Select Year");
      return;
    }
    if (Selectediar == "" || Selectediar == null) {
      message.warning("Please Select IAR No");
      return;
    }
    navigate("/Precot/QA/F-14", {
      state: {
        year: year,
        IAr: Selectediar,
      },
    });
  };

  const departmentLength = department.length;
  const totalColSpan = 20 + 20 + departmentLength * 3 + 12 + 20;
  const dividedColSpan = totalColSpan / 4;

  const rowsPerPage = 10; // Number of rows per page

  const paginateData = (data, rowsPerPage) => {
    if (!data || typeof data !== "object") return []; // Ensure data is valid

    const flattenedData = Object.values(data).flat(); // Convert object into array
    const totalPages = Math.ceil(flattenedData.length / rowsPerPage);
    let paginatedData = [];

    for (let i = 0; i < totalPages; i++) {
      paginatedData.push(
        flattenedData.slice(i * rowsPerPage, (i + 1) * rowsPerPage)
      );
    }
    return paginatedData;
  };

  const paginatedData = paginateData(printResponseData, rowsPerPage);

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {paginatedData.map((pageData, pageIndex) => (
          <div key={pageIndex} style={{ pageBreakAfter: "always" }}>
            <table style={{ marginLeft: "35px", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <td
                    colSpan="80"
                    style={{ border: "none", height: "5px" }}
                  ></td>
                </tr>

                <tr>
                  <th colSpan={22} rowSpan={4} style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{
                        width: "100px",
                        height: "auto",
                        textAlign: "center",
                      }}
                    />
                    <br />
                    Unit H
                  </th>
                  <th
                    colSpan={departmentLength * 3}
                    rowspan={4}
                    style={{ textAlign: "center" }}
                  >
                    SUMMARY OF INTERNAL AUDIT
                  </th>
                  <th colSpan={25}>Format No.:</th>
                  <th colSpan={25}>PH-QAD01-F-014</th>
                </tr>
                <tr>
                  <th colSpan={25}>Revision No.:</th>
                  <th colSpan={25}>01</th>
                </tr>
                <tr>
                  <th colSpan={25}>Ref. SOP No.:</th>
                  <th colSpan={25}>PH-QAD01-D-17</th>
                </tr>
                <tr>
                  <th colSpan={25}>Page No.:</th>
                  <th colSpan={25}>
                    {pageIndex + 1} of {paginatedData.length}
                  </th>
                </tr>
                <tr>
                  <td colSpan={totalColSpan} style={{ border: "none" }}></td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={totalColSpan}>
                    Internal Audit Based on Standard
                  </td>
                </tr>

                <tr>
                  <td colSpan={20} rowSpan="2">
                    Clause No.
                  </td>
                  <td
                    colSpan={20}
                    rowSpan="2"
                    style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                  >
                    Requirements/IAR No
                  </td>
                  <td colSpan={department.length * 3}>Department</td>
                  <td colSpan={12}>Total No. of Findings</td>
                  <td colSpan={20} rowSpan="2">
                    Status of NCs (Open / Closed)
                  </td>
                </tr>

                <tr>
                  {Array.isArray(department) &&
                    department.map((dept, index) => (
                      <th
                        key={index}
                        colSpan={3}
                        style={{
                          transform: "rotate(180deg)",
                          writingMode: "vertical-rl",
                          padding: "10px",
                          textAlign: "left",
                        }}
                      >
                        {dept}
                      </th>
                    ))}
                  <th
                    colSpan={4}
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Observation
                  </th>
                  <th
                    colSpan={4}
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Minor NCs
                  </th>
                  <th
                    colSpan={4}
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Major NCs
                  </th>
                </tr>

                {pageData.map((iarDetail, index) => (
                  <tr key={index}>
                    <td colSpan={20}>{iarDetail.clauseNos}</td>
                    <td colSpan={20}>{iarDetail.iarNo}</td>
                    {Array.isArray(department) &&
                      department.map((dept, deptIndex) => (
                        <td key={deptIndex} colSpan={3}>
                          {iarDetail.department === dept ? 1 : 0}
                        </td>
                      ))}
                    <td colSpan={4}>{iarDetail.observations}</td>
                    <td colSpan={4}>{iarDetail.minorNcs}</td>
                    <td colSpan={4}>{iarDetail.majorNcs}</td>
                    <td colSpan={20}>{iarDetail.statusOfNcs}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={40}>TOTAL No. of NCs</td>

                  {Array.isArray(department) &&
                    department.map((dept, deptIndex) => {
                      const totalDeptFindings = printResponseData
                        ? Object.keys(printResponseData).reduce(
                            (total, iarNo) => {
                              return (
                                total +
                                (printResponseData[iarNo]?.reduce(
                                  (deptTotal, iarDetail) => {
                                    return (
                                      deptTotal +
                                      (iarDetail.department === dept ? 1 : 0)
                                    );
                                  },
                                  0
                                ) || 0)
                              );
                            },
                            0
                          )
                        : 0;

                      return (
                        <td
                          key={deptIndex}
                          colSpan={3}
                          style={{ textAlign: "center" }}
                        >
                          {totalDeptFindings}
                        </td>
                      );
                    })}
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    {printResponseData
                      ? Object.keys(printResponseData).reduce(
                          (totalObs, iarNo) => {
                            return (
                              totalObs +
                              printResponseData[iarNo].reduce(
                                (sum, iarDetail) =>
                                  sum + (Number(iarDetail.observations) || 0),
                                0
                              )
                            );
                          },
                          0
                        )
                      : 0}
                  </td>

                  <td colSpan={4} style={{ textAlign: "center" }}>
                    {printResponseData
                      ? Object.keys(printResponseData).reduce(
                          (totalMinorNcs, iarNo) => {
                            return (
                              totalMinorNcs +
                              printResponseData[iarNo]?.reduce(
                                (sum, iarDetail) =>
                                  sum + (Number(iarDetail.minorNcs) || 0),
                                0
                              )
                            );
                          },
                          0
                        )
                      : 0}
                  </td>

                  <td colSpan={4} style={{ textAlign: "center" }}>
                    {printResponseData
                      ? Object.keys(printResponseData).reduce(
                          (totalMajorNcs, iarNo) => {
                            return (
                              totalMajorNcs +
                              printResponseData[iarNo]?.reduce(
                                (sum, iarDetail) =>
                                  sum + (Number(iarDetail.majorNcs) || 0),
                                0
                              )
                            );
                          },
                          0
                        )
                      : 0}
                  </td>

                  <td colSpan={20} style={{ textAlign: "center" }}>
                    {printResponseData &&
                    Object.keys(printResponseData).length > 0
                      ? Object.keys(printResponseData).every((iarNo) =>
                          printResponseData[iarNo]?.every(
                            (iarDetail) => iarDetail.statusOfNcs === "Closed"
                          )
                        )
                        ? "Closed"
                        : "Open"
                      : "Open"}
                  </td>
                </tr>
              </tbody>
              <br />
              <tfoot>
                <tr>
                  <td colSpan={dividedColSpan}>particular</td>
                  <td colSpan={dividedColSpan}>Prepared By</td>
                  <td colSpan={dividedColSpan}>Reviewed By</td>
                  <td colSpan={dividedColSpan}>Approved By</td>
                </tr>

                <tr>
                  <td colSpan={dividedColSpan}>Name</td>
                  <td colSpan={dividedColSpan}></td>
                  <td colSpan={dividedColSpan}></td>
                  <td colSpan={dividedColSpan}></td>
                </tr>

                <tr>
                  <td colSpan={dividedColSpan}>Signature</td>
                  <td colSpan={dividedColSpan}></td>
                  <td colSpan={dividedColSpan}></td>
                  <td colSpan={dividedColSpan}></td>
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
          formName="SUMMARY OF INTERNAL AUDIT "
          formatNo="PH-QAD01-F-014"
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
              onChange={(value) => {
                setYear(value);
                handleChange(value);
              }}
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
            <label>IAR :</label>
          </Col>
          <Col>
            <Select
              showSearch
              style={{ width: "100%" }}
              value={Selectediar}
              placeholder="Select IAR"
              optionFilterProp="children"
              onChange={(value) => {
                setSelectedIar(value);
              }}
            >
              {iarOptions.map((option, index) => (
                <Select.Option key={index} value={option}>
                  {option}
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
      <div></div>

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
            onClick={printSubmit} // Ensure this points to your submit handler
          >
            Submit
          </Button>,
        ]}
      >
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
            onChange={(value) => {
              setYearPrint(value);
              setIarOptionPrint(""); // Resetting the IAR options
              setselectediarprint(""); // Resetting selected IAR
              handleChangePrint(value);
            }}
            style={{ width: "70%" }} // Adjust width as needed
            placeholder="Search Year"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled>
              Select Year
            </Select.Option>
            {yearOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>

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
            IAR:
          </label>
          <Col style={{ width: "70%" }}>
            <Select
              mode="multiple" // Enable multiple selection
              showSearch
              style={{ width: "100%" }}
              value={selectediarprint}
              placeholder="Select IAR"
              optionFilterProp="children"
              onChange={(value) => {
                setselectediarprint(value); // Value will now be an array of selected options
                handlePrintIar(value); // Pass the array of selected values
              }}
              // tagRender ensures proper rendering of selected options without commas
              tagRender={(props) => {
                const { label, value, onClose } = props;
                return (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "3px 8px",
                      background: "#f0f0f0",
                      borderRadius: "2px",
                      marginRight: "4px",
                    }}
                  >
                    {label}
                    <span
                      onClick={onClose}
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                    >
                      ×
                    </span>
                  </span>
                );
              }}
            >
              {Array.isArray(iarOptionPrint) &&
                iarOptionPrint.length > 0 &&
                iarOptionPrint.map((option, index) => (
                  <Select.Option key={index} value={option}>
                    {option}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        </div>
      </Modal>
    </div>
  );
};

export default QA_f14_Summary;
