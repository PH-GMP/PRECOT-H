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
const QA_F09_Summary = () => {
  const initial = useRef(false);
  const [deaprtment, setdepartment] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  // const [deaprtment_list, setdepartment_list] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [formatteddate, setformatteddate] = useState("");
  const [ccfno_number, setccfno_number] = useState("");
  const [opsignprint, setopsignprint] = useState("");
  const [hodsignprint, sethodsignprint] = useState("");
  const [supsignprint, setsupsignprint] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [availableshiftlov, setAvailableShiftslov] = useState();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno2, setbatchno2] = useState([]);
  const [batchNolist2, setBatchNolist2] = useState("Select Department Name");
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [saveLoading, setSaveLoading] = useState(false);
  const [batchno, setbatchno] = useState([]);
  const [traningid_list, settraningid_list] = useState([]);
  const [traningid_value, settraningid_value] = useState("");
  const [date1, setdate1] = useState([]);
  const [dateformat_op, setdateformat_op] = useState("");
  const [dateprint, setdateprint] = useState("");
  const [dateformat_hod, setdateformat_hod] = useState("");
  const [open, setOpen] = useState(false);
  const [Traningid, setTraningid] = useState("");
  const [month, setmonth] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const roleBase = localStorage.getItem("role");
  const departmentid = localStorage.getItem("departmentId");
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

  const years = Array.from({ length: 21 }, (_, i) => currentYear - i);
  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchDataOrderNumber();
      // fetchDataCCRNO();
      // fetchdata_departmentid();
      // fetchData_dep_by_id();
      fetchData_summary();
      fetchData_traning_id();
    }
  }, []);

  useEffect(() => {
    if (printResponseData && printResponseData.length > 0 && !isPrinting) {
      setIsPrinting(true); // Prevent further executions
      setTimeout(() => {
        window.print();
        setShowModal(false); // Close the modal
        setIsPrinting(false); // Reset after printing (if needed)
      }, 300);
    } else if (!printResponseData || printResponseData.length === 0) {
      setShowModal(false);
    }
  }, [printResponseData]);

  // const fetchdata_departmentid = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     let dep_id = localStorage.getItem("departmentId");

  //     const foundDepartment = response.data?.find((dept) => {
  //       // Log each department ID
  //       const numericDepId = Number(dep_id);

  //       if (dept.id === numericDepId) {
  //         return true; // Return true to indicate a match
  //       } else {
  //         // Log if ID is not found
  //         return false; // Return false to continue searching
  //       }
  //     });

  //     if (foundDepartment) {
  //       setdepartment(foundDepartment.department);
  //       fetchData_dep_by_id(foundDepartment.department);
  //     } else {
  //       setdepartment("Department not found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const fetchData_dep_by_id = async (value) => {
  //   try {
  //     setLoading(true);

  //     if (
  //       roleBase === "ROLE_HOD" ||
  //       roleBase === "HR_EXECUTIVE" ||
  //       roleBase === "QA_MANAGER" ||
  //       roleBase === "ROLE_MR"
  //     ) {
  //       if (value) {
  //         // Second API call for ROLE_SUPERVISOR based on department
  //         const additionalResponse = await axios.get(
  //           `${API.prodUrl}/Precot/api/QA/Service/TrainingCard/trainingSessionNoLov?department=${value}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         if (additionalResponse.data.message !== "No data") {
  //           setdepartment_list(additionalResponse.data);
  //         }
  //       } else {
  //         console.error("Invalid department ID, no API call made.");
  //       }
  //     } else {
  //       setTimeout(() => {
  //         navigate("/Precot/choosenScreen"); // Redirect to the summary page
  //       }, 1500);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 403) {
  //       message.warning("You do not have permission to access this form.");
  //       setTimeout(() => {
  //         navigate("/Precot/choosenScreen"); // Redirect to the summary page
  //       }, 1500);
  //     } else {
  //       console.error("Error fetching data:", error);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData_summary = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/trainingQuestionnaire/getTrainingQuestionnaireSummary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data &&
        (response.data?.length > 0 || response.data?.length == undefined)
      ) {
        setmodalData(response.data);
      }
    } catch (error) {
      // Check if the error is a 403 Forbidden errorf
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
  };

  const handle_traning_section = (event) => {
    settraningid_value(event);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e); // Update selectedYear on change
  };
  const handle_month = (e) => {
    const selectedDate = e;
    setmonth(selectedDate);
  };

  const handleprint_section = async (e) => {
    setSaveLoading(true);
    settraningid_value(e);
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/trainingQuestionnaire/print?traineeIdNumber=${traningid_value}&month=${month}&year=${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data[0]) {
          setPrintResponseData(res.data);
          const formatteddate = moment(res.data[0]?.date).format("DD/MM/YYYY");
          setformatteddate(formatteddate);
          const dateformat_op = moment(res.data[0]?.hodDesigneeSubmitOn).format(
            "DD/MM/YYYY HH:mm"
          );
          const dateformat_supervisor = moment(
            res.data[0]?.hodDesigneeSubmitOn
          ).format("DD/MM/YYYY HH:mm");
          const dateformat_hod = moment(res.data?.hod_submit_on).format(
            "DD/MM/YYYY HH:mm"
          );
          setdateformat_op(dateformat_op);
          setdateformat_hod(dateformat_supervisor);
          setdateprint(formatteddate);
          setdepartment(res.data[0]?.department);
          setopsignprint(res.data[0]?.operator_sign);
          setsupsignprint(res.data[0]?.supervisor_sign);
          sethodsignprint(res.data[0]?.hod_sign);
          message.success("Data Fetched Successfully");
          setSaveLoading(false);
          setIsFetchSuccessful(false);
          await fetchImages(res.data, token);
        } else {
          setPrintResponseData([]);
          message.error("No data found...!");
          setBatchNolist2(null);
          setIsFetchSuccessful(false);
          setShowModal(false);
          setSaveLoading(false);
          return;
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        setShowModal(false);
        setSaveLoading(false);
      });
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

        const supervisorUsername = reportData?.hodDesigneeSign;
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
              setGetImageHOD((prevImages) => ({
                ...prevImages,
                [reportIndex]: url,
              }));
            })
            .catch((err) => {});
        }
      });
  };

  // const fetchDataCCRNO = async () => {
  //   try {
  //     setLoading(true);
  //     axios
  //       .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         const data = res.data?.map((laydownno) => laydownno.department);
  //         setdepartment_list(data);
  //         if (
  //           res.data &&
  //           (res.data?.length > 0 || res.data?.length == undefined)
  //         ) {
  //           const data = res.data?.map((laydownno) => laydownno.department);
  //           setdepartment_list(data);
  //         }
  //       });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData_traning_id = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/trainingQuestionnaire/print`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const data = res.data
              ?.filter(
                (laydownno) =>
                  laydownno.hodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED"
              )
              .map((laydownno) => laydownno.traineeIdNumber);
            const uniqueData = Array.from(new Set(data));

            settraningid_list(uniqueData);
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
      Traningid == null ||
      Traningid == "" ||
      Traningid == "[]" ||
      Traningid == 0
    ) {
      message.warning("Please Select Traningid");
      return;
    } else if (
      availableshiftlov == null ||
      availableshiftlov == "" ||
      availableshiftlov == "[]" ||
      availableshiftlov == 0 ||
      availableshiftlov == "Select TrainingSessionNO"
    ) {
      message.warning("Please Select  TrainingSessionNO");
      return;
    }
    navigate("/Precot/QA/F-09", {
      state: {
        traningid: Traningid,
        traineesession: availableshiftlov,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/F-09", {
      state: {
        traningid: record.traineeIdNumber,
        traineesession: record.trainingSessionNumber,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    setSelectedYear("");
    setmonth("");
    settraningid_value("");
    setShowModal(true);
    setIsFetchSuccessful(true);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
      align: "center",
    },

    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "Training SessionNumber",
      dataIndex: "trainingSessionNumber",
      key: "trainingSessionNumber",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Trainee Id",
      dataIndex: "traineeIdNumber",
      key: "traineeIdNumbereason",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Hod Status",
      dataIndex: "hodDesigneeStatus",
      key: "hodDesigneeStatus",
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
    setSelectedYear("");
    setSelectedMonth("");
    setBatchNolist2(null);
    setdate1(null);
  };
  const handleDatePrintChange = (event) => {};
  const printDateSubmit = async () => {
    window.print();
    setSelectedYear("");
    setmonth("");
    setShowModal(false);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="TRAINING QUESTIONNNAIRE "
        formatNo="PH-QAD01-F-009"
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
            alignItems: "center",
            gap: "10px",
            padding: "10px 0",
          }}
        >
          <div style={{ fontSize: "14px", marginRight: "8px" }}>
            Select Training SessionNO
          </div>

          <Input
            type="text"
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "0px",
              border: "1px solid #ddd",
              backgroundColor: "white",
            }}
            value={availableshiftlov}
            onChange={(e) => {
              setAvailableShiftslov(e.target.value);
            }}
          />

          <div style={{ fontSize: "14px", marginRight: "8px" }}>
            Select TraineeID
          </div>

          <Input
            type="text"
            value={Traningid}
            onChange={(e) => setTraningid(e.target.value)}
            size="small"
            style={{ width: "150px", height: "30px" }}
          />

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
        <div id="section-to-print">
          {printResponseData &&
            printResponseData.map((reportData, index) => {
              const startPage = index * 3 + 1;
              const midPage = startPage + 1;
              const endPage = startPage + 2;
              const totalPages = printResponseData.length * 3; // Total pages

              return (
                <React.Fragment key={index}>
                  {/* Page 1: Text Data */}
                  <div style={{ marginTop: "40px", pageBreakAfter: "always" }}>
                    <table
                      style={{
                        borderCollapse: "collapse",
                        scale: "90%",
                        width: "100%",
                      }}
                    >
                      <thead>
                        {/* Header (Repeats on every page) */}
                        <tr>
                          <td
                            colSpan="5"
                            rowSpan="4"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={logo}
                              alt="Logo"
                              style={{ width: "80px", height: "auto" }}
                            />
                            <br /> Unit H
                          </td>
                          <th
                            colSpan="40"
                            rowSpan="4"
                            style={{ textAlign: "center" }}
                          >
                            TRAINING QUESTIONNAIRE
                          </th>
                          <td colSpan="15">Format No.:</td>
                          <td colSpan="40">PH-QAD01-F-009</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Revision No.:</td>
                          <td colSpan="40">01</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Ref. SOP No.:</td>
                          <td colSpan="40">PH-QAD01-D-15</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Page No.:</td>
                          <td colSpan="40">
                            {startPage} of {totalPages}
                          </td>
                        </tr>
                        <tr style={{ border: "none" }}>
                          <td colSpan="100" style={{ border: "none" }}></td>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Training Details */}
                        <tr>
                          <td colSpan="30">Date</td>
                          <td colSpan="70">
                            {moment(reportData.trainingDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="30">Training Session No.:</td>
                          <td colSpan="70">
                            {reportData.trainingSessionNumber}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="30">Topic Name:</td>
                          <td colSpan="70">{reportData.topicName}</td>
                        </tr>
                        <tr>
                          <td colSpan="30">SOP Number:</td>
                          <td colSpan="70">{reportData.trainingSopNumber}</td>
                        </tr>
                        <tr>
                          <td colSpan="30">Department Name:</td>
                          <td colSpan="70">{reportData.departmentName}</td>
                        </tr>
                        <tr>
                          <td colSpan="30">Name Of the Trainer:</td>
                          <td colSpan="70">{reportData.trainerName}</td>
                        </tr>
                        <tr>
                          <td colSpan="30">Trainee Name:</td>
                          <td colSpan="70">{reportData.traineeName}</td>
                        </tr>
                        <tr>
                          <td colSpan="30">Trainee ID Number:</td>
                          <td colSpan="70">{reportData.traineeIdNumber}</td>
                        </tr>
                        <tr>
                          <td colSpan="30">Venue:</td>
                          <td colSpan="20">{reportData.venue}</td>
                          <td colSpan="30">Mark:</td>
                          <td colSpan="20">{reportData.marks}</td>
                        </tr>
                      </tbody>

                      <tfoot>
                        <tr style={{ border: "none" }}>
                          <td colSpan="100" style={{ border: "none" }}></td>
                        </tr>

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

                  {/* Page 2: Questions Image */}
                  <div style={{ marginTop: "40px", pageBreakAfter: "always" }}>
                    <table
                      style={{
                        borderCollapse: "collapse",
                        scale: "90%",
                        width: "100%",
                      }}
                    >
                      <thead>
                        {/* Header (Repeats on every page) */}
                        <tr>
                          <td
                            colSpan="5"
                            rowSpan="4"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={logo}
                              alt="Logo"
                              style={{ width: "80px", height: "auto" }}
                            />
                            <br /> Unit H
                          </td>
                          <th
                            colSpan="40"
                            rowSpan="4"
                            style={{ textAlign: "center" }}
                          >
                            TRAINING QUESTIONNAIRE
                          </th>
                          <td colSpan="15">Format No.:</td>
                          <td colSpan="40">PH-QAD01-F-009</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Revision No.:</td>
                          <td colSpan="40">01</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Ref. SOP No.:</td>
                          <td colSpan="40">PH-QAD01-D-15</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Page No.:</td>
                          <td colSpan="40">
                            {midPage} of {totalPages}
                          </td>
                        </tr>
                        <tr style={{ border: "none" }}>
                          <td colSpan="100" style={{ border: "none" }}></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="100" style={{ textAlign: "center" }}>
                            Questions Image
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="100">
                            <div style={{ textAlign: "center" }}>
                              <img
                                src={`data:image/png;base64,${reportData.questions}`}
                                alt="Questions Preview"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr style={{ border: "none" }}>
                          <td colSpan="100" style={{ border: "none" }}></td>
                        </tr>
                      </tbody>

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

                  {/* Page 3: Assessment Image */}
                  <div style={{ marginTop: "40px", pageBreakAfter: "always" }}>
                    <table
                      style={{
                        borderCollapse: "collapse",
                        scale: "90%",
                        width: "100%",
                      }}
                    >
                      <thead>
                        {/* Header (Repeats on every page) */}
                        <tr>
                          <td
                            colSpan="5"
                            rowSpan="4"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={logo}
                              alt="Logo"
                              style={{ width: "80px", height: "auto" }}
                            />
                            <br /> Unit H
                          </td>
                          <th
                            colSpan="40"
                            rowSpan="4"
                            style={{ textAlign: "center" }}
                          >
                            TRAINING QUESTIONNAIRE
                          </th>
                          <td colSpan="15">Format No.:</td>
                          <td colSpan="40">PH-QAD01-F-009</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Revision No.:</td>
                          <td colSpan="40">01</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Ref. SOP No.:</td>
                          <td colSpan="40">PH-QAD01-D-15</td>
                        </tr>
                        <tr>
                          <td colSpan="15">Page No.:</td>
                          <td colSpan="40">
                            {endPage} of {totalPages}
                          </td>
                        </tr>
                        <tr style={{ border: "none" }}>
                          <td colSpan="100" style={{ border: "none" }}></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="100" style={{ textAlign: "center" }}>
                            Assessment Question Image
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="100">
                            <div style={{ textAlign: "center" }}>
                              <img
                                src={`data:image/png;base64,${reportData.assessmentOfQuestionnaire}`}
                                alt="Assessment Preview"
                                style={{
                                  width: "100%",
                                  objectFit: "contain",
                                  height: "100%",
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="100" style={{ textAlign: "center" }}>
                            Reviewd By
                            <br />
                            {reportData?.hodDesigneeSign}
                            <br />
                            {dateformat_hod} <br />
                            {getImageHOD[index] && (
                              <img
                                src={getImageHOD[index]}
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
                        </tr>
                        <tr style={{ border: "none" }}>
                          <td colSpan="100" style={{ border: "none" }}></td>
                        </tr>
                      </tbody>

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
                </React.Fragment>
              );
            })}
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
              loading={saveLoading}
              onClick={handleprint_section}
              // disabled={isFetchSuccessful}
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
              Select Year:
            </div>

            {/* <Select
   value={selectedYear} 
   onChange={(e) => setSelectedYear(e.target.value)}
    style={{
      width: "100%",
      height: "40px",
      borderRadius: "0px",
      border: "1px solid #ddd",
      backgroundColor: "white"
    }}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select> */}

            <Select
              style={{
                width: "100%",
                height: "40px",
              }}
              placeholder="Select Year" // Display placeholder when no value is selected
              value={selectedYear || undefined} // Show placeholder if no year is selected
              onChange={handleYearChange} // Pass selected year to handler
            >
              {years.map((year) => (
                <Option key={year} value={year}>
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
                height: "40px",
                borderRadius: "0px",
                border: "1px solid #ddd",
                backgroundColor: "white",
              }}
              placeholder="Select Month"
              value={month}
              onChange={handle_month}
            >
              {months?.map((shiftvalue, index) => (
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
              Select Trainee ID Number:
            </div>

            <Select
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "0px",
                border: "1px solid #ddd",
                backgroundColor: "white",
              }}
              placeholder="Select TraningID"
              value={traningid_value}
              onChange={handle_traning_section}
            >
              {traningid_list?.map((shiftvalue, index) => (
                <Option key={index} value={shiftvalue}>
                  {shiftvalue}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F09_Summary;
