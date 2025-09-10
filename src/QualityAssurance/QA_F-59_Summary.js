/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
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

const { Option } = Select;
const QA_F59_Summary = () => {
  const initial = useRef(false);
  const [deaprtment, setdepartment] = useState([]);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [formatteddate, setformatteddate] = useState("");
  const [opsignprint, setopsignprint] = useState("");
  const [hodsignprint, sethodsignprint] = useState("");
  const [supsignprint, setsupsignprint] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshift_value, setAvailableShifts_value] =
    useState("Select Shift");
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno2, setbatchno2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [batchNolist2, setBatchNolist2] = useState("Select Department Name");
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [batchno, setbatchno] = useState([]);
  const [date, setdate] = useState([]);
  const [date1, setdate1] = useState([]);
  const [dateformat_op, setdateformat_op] = useState("");
  const [dateprint, setdateprint] = useState("");
  const [dateformat_supervisor, setdateformat_supervisor] = useState("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const roleBase = localStorage.getItem("role");
  const departmentlist_value = ["PAD_PUNCHING", "DRY_GOODS", "COTTON_BUDS"];
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
    if (!initial.current) {
      initial.current = true;
      fetchDataOrderNumber();
      fetchshiftlov();
      fetchdata_departmentid();
      fetchData_dep_by_id();
    }
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const fetchdata_departmentid = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let dep_id = localStorage.getItem("departmentId");

      const foundDepartment = response.data?.find((dept) => {
        // Log each department ID

        const numericDepId = Number(dep_id);

        if (dept.id === numericDepId) {
          // Log if ID is found

          return true; // Return true to indicate a match
        } else {
          // Log if ID is not found
          return false; // Return false to continue searching
        }
      });

      if (foundDepartment) {
        setdepartment(foundDepartment.department);
        // setbatchno2(foundDepartment.department)

        fetchData_dep_by_id(foundDepartment.department);
      } else {
        setdepartment("Department not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData_dep_by_id = async () => {
    try {
      setLoading(true);
      if (
        roleBase === "ROLE_QA" ||
        roleBase == "ROLE_MR" ||
        roleBase == "QA_MANAGER"
      ) {
        // First API call for QA_MANAGER
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/MetalPassSummary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response from the first API
        if (
          response.data &&
          (response.data.length > 0 || response.data.length === undefined)
        ) {
          setmodalData(response.data);
        }
      } else if (roleBase === "ROLE_SUPERVISOR") {
        // Get departmentId and map it to department name
        const dep_id = localStorage.getItem("departmentId");
        let department;
        console.log("department", department);
        switch (dep_id) {
          case "3":
            department = "PAD_PUNCHING";
            break;
          case "4":
            department = "DRY_GOODS";
            break;
          case "12":
            department = "COTTON_BUDS";
            break;
          default:
            department = null;
            console.warn("Unexpected department ID:", dep_id);
        }
        if (department) {
          // Second API call for ROLE_SUPERVISOR based on department
          const additionalResponse = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/MetalPassSummary?department=${department}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Handle the additional response data
          console.log(
            "Response data from MetalPassSummary with department",
            additionalResponse.data
          );
          setmodalData(additionalResponse.data);
        } else {
          console.error("Invalid department ID, no API call made.");
        }
      } else {
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (e) => {
    setdate1(e.target.value);
  };

  const fetchshiftlov = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const shifts = res.data.map((shift) => shift.value);
          setAvailableShifts(shifts);

          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const shifts = res.data.map((shift) => shift.value);
            setAvailableShifts(shifts);
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
    if (date == null || date == "" || date == "[]") {
      message.warning("Please Select Date");
      return;
    }
    if (
      availableshiftlov == "" ||
      availableshiftlov == null ||
      availableshiftlov == "Select Department" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Department");
      return;
    }
    if (
      availableshift_value == "" ||
      availableshift_value == null ||
      availableshift_value == "Select Shift" ||
      availableshift_value == 0
    ) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/QA/F-59", {
      state: {
        depno: availableshiftlov,
        datevalue: date,
        shift: availableshift_value,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/F-59", {
      state: {
        datevalue: record.date,
        depno: record.department,
        shift: record.shift,
        idvalue: record.metal_id,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    // window.print();
    setdate1(null);
    setShowModal(true);
    setIsFetchSuccessful(true);
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "date",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "QA Inspector status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
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
    setdate1(null);
  };

  const printDateSubmit = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/MetalDetectorPassPrint?date=${date1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const resData = response.data;

      if (resData) {
        setPrintResponseData(resData);

        const formattedDate = moment(resData[0].date).format("DD/MM/YYYY");
        const dateformatOp = moment(resData.qa_inspector_submitted_on).format(
          "DD/MM/YYYY HH:mm"
        );
        const dateformatSupervisor = moment(
          resData.supervisor_submit_on
        ).format("DD/MM/YYYY HH:mm");

        setformatteddate(formattedDate);
        setdateformat_op(dateformatOp);
        setdateformat_supervisor(dateformatSupervisor);
        setdateprint(formattedDate);
        setdepartment(resData.department);
        setopsignprint(resData.operator_sign);
        setsupsignprint(resData.supervisor_sign);
        sethodsignprint(resData.hod_sign);

        // Fetch images after report data is fetched
        await fetchImages(resData, token); // Ensure images are fetched

        message.success("Data Fetched Successfully");
        setIsFetchSuccessful(true);
      } else {
        setPrintResponseData([]);
        message.error("No data found...!");
        setShowModal(false);
      }
    } catch (err) {
      setPrintResponseData([]);

      message.error("No Data Found");
      setnewModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImages = async (printResponseData, token) => {
    printResponseData &&
      printResponseData.forEach((reportData, reportIndex) => {
        const username = reportData?.qa_inspector_sign;
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
              setGetImageOP((prevImages) => ({
                ...prevImages,
                [reportIndex]: url,
              }));
            })
            .catch((err) => {});
        }

        // Similarly, fetch and set image for supervisor_sign
        const supervisorUsername = reportData?.supervisor_sign;
        if (supervisorUsername) {
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${supervisorUsername}`,
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
              setGetImageSUP((prevImages) => ({
                ...prevImages,
                [reportIndex]: url,
              }));
            })
            .catch((err) => {});
        }
      });
  };

  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 300);
    } else {
      setShowModal(false);
    }
  }, [printResponseData]);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let columns = [...commonColumns];

  const recordsPerPage = 7;
  const totalPages = Math.ceil(
    Array.isArray(printResponseData) && printResponseData.length > 0
      ? (printResponseData[0].details?.length || 0) / recordsPerPage
      : 0
  );

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };

  return (
    <div>
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table
              key={pageIndex}
              style={{
                borderCollapse: "collapse",
                border: "1px solid #0000",
                padding: "5px",
                paddingTop: "70px",
                scale: "90%",
              }}
            >
              <thead>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
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
                    METAL DETECTOR PASS REPORT
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="40">PH-QAD01/F-059</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="40">01</td>
                </tr>
                <td colSpan="15">Ref. SOP No.:</td>
                <td colSpan="40">PH-QAD01-D-44</td>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="40">
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <td colSpan="40" style={{ paddingLeft: "10px" }}>
                    Department Name: {printResponseData[0]?.department}
                  </td>
                  <td colSpan="30" style={{ paddingLeft: "10px" }}>
                    Date: {moment(printResponseData?.date).format("DD/MM/YYYY")}
                  </td>
                  <td colSpan="30" style={{ paddingLeft: "10px" }}>
                    Shift: {printResponseData[0]?.shift}
                  </td>
                </tr>

                {/* Header Row */}
                <tr>
                  <th rowSpan="2" colSpan="10" style={{ textAlign: "center" }}>
                    S.No.
                  </th>
                  <th rowSpan="2" colSpan="20" style={{ textAlign: "center" }}>
                    Machine Name
                  </th>
                  <th rowSpan="2" colSpan="10" style={{ textAlign: "center" }}>
                    Product Description
                  </th>
                  <th rowSpan="2" colSpan="10" style={{ textAlign: "center" }}>
                    No. of Bags Passed
                  </th>
                  <th rowSpan="2" colSpan="10" style={{ textAlign: "center" }}>
                    OK Bags
                  </th>
                  <th rowSpan="2" colSpan="10" style={{ textAlign: "center" }}>
                    Rejected Bags
                  </th>
                  <th colSpan="30" style={{ textAlign: "center" }}>
                    Sign & Date
                  </th>
                </tr>
                <tr>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    Production Supervisor
                  </td>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    QA Inspector
                  </td>
                </tr>

                {printResponseData[0]?.details &&
                  paginateData(
                    printResponseData[0]?.details,
                    pageIndex + 1
                  ).map((item, index) => (
                    <tr key={index}>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {index + 1 + pageIndex * recordsPerPage}
                      </td>
                      <td colSpan="20" style={{ textAlign: "center" }}>
                        {item.machine_name || "N/A"}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {item.product_description || "N/A"}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {item.no_of_bags_passed || "N/A"}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {item.ok_bags || "N/A"}
                      </td>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        {item.rejected_bags || "N/A"}
                      </td>
                      <td colSpan="15" style={{ textAlign: "center" }}>
                        {printResponseData?.supervisor_sign} <br />
                        {dateformat_supervisor} <br />
                        {getImageSUP[index] && (
                          <img
                            src={getImageSUP[index]}
                            alt="Supervisor Sign"
                            style={{
                              width: "60px",
                              height: "60px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        )}
                      </td>
                      <td colSpan="15" style={{ textAlign: "center" }}>
                        {printResponseData?.qa_inspector_sign} <br />
                        {dateformat_op} <br />
                        {getImageOP[index] && (
                          <img
                            src={getImageOP[index]}
                            alt="QA Inspector Sign"
                            style={{
                              width: "60px",
                              height: "60px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                {/* ) : (
                          <tr>
                            <td colSpan="100%">No data available</td>
                          </tr>
                        )} */}
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
          </div>
        ))}
      </div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="METAL DETECTOR PASS REPORT"
        formatNo="PH-QAD01/F-059"
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
            Select Date
          </div>
          <Input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            size="small"
            max={getCurrentDate()}
            style={{ width: "10%", height: "30px" }}
          />
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Department
          </div>
          <Select
            style={{
              width: "150px",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Department"
            value={availableshiftlov}
            onChange={setAvailableShiftslov}
          >
            {departmentlist_value?.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
              </Option>
            ))}
          </Select>
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Shift
          </div>
          <Select
            style={{
              width: "150px",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Shift No"
            value={availableshift_value}
            onChange={setAvailableShifts_value}
          >
            {availableshift.map((shiftvalue, index) => (
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
        </div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={modalData}
        />

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
              loading={isLoading}
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
              Select Date:
            </div>
            <Input type="date" value={date1} onChange={handleDateChange} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F59_Summary;
