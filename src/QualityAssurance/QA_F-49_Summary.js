/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  notification,
  Select,
  Table,
  Tooltip,
} from "antd";
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

const QA_F49_Summary = () => {
  const initial = useRef(false);
  const [deaprtment, setdepartment] = useState([]);
  const [deaprtment_list, setdepartment_list] = useState([]);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMR No");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [formatteddate, setformatteddate] = useState("");
  const [ccfno_number, setccfno_number] = useState("");
  const [opsignprint, setopsignprint] = useState("");
  const [hodsignprint, sethodsignprint] = useState("");
  const [supsignprint, setsupsignprint] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno2, setbatchno2] = useState([]);
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

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchDataOrderNumber();
      fetchDataCCRNO();
      fetchdata_departmentid();
      fetchData_dep_by_id();
    }
  }, []);

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

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getProductDispositionLogBookSummary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the request is successful, handle the response data
      if (
        response.data &&
        (response.data?.length > 0 || response.data?.length == undefined)
      ) {
        setmodalData(response.data);
      }
    } catch (error) {
      // Check if the error is a 403 Forbidden error
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
        const supervisorUsername = reportData?.qa_mr_sign;
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

  const fetchDataCCRNO = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data?.map((laydownno) => laydownno.department);
          setdepartment_list(data);
          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            const data = res.data?.map((laydownno) => laydownno.department);
            setdepartment_list(data);
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
      date == null ||
      date == "" ||
      date == "[]" ||
      availableshiftlov == "Select Date" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Date");
      return;
    }
    navigate("/Precot/QA/F-49", {
      state: {
        depno: availableshiftlov,
        datevalue: date,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/F-49", {
      state: {
        datevalue: record.date,
        depno: record.department,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
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
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "QA Manager status",
      dataIndex: "qa_mr_status",
      key: "qa_mr_status",
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
    const date_month = moment(date1);
    var year = date_month.year();
    var month = date_month.format("MMMM");
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/findByParamProductDispositionLogBook?date=${date1}&month=${year}&year=${month}`,
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
      setIsLoading(false); // Stop loading
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

  let columns = [...commonColumns];

  const recordsPerPage = 8;
  const paginateData = (data, recordsPerPage) => {
    if (!data || !Array.isArray(data)) return []; // Ensure data is an array

    let paginatedData = [];

    data.forEach((reportData) => {
      if (!reportData.details || !Array.isArray(reportData.details)) return; // Handle missing details array

      for (let i = 0; i < reportData.details.length; i += recordsPerPage) {
        paginatedData.push({
          ...reportData,
          details: reportData.details.slice(i, i + recordsPerPage),
        });
      }
    });

    return paginatedData;
  };
  const paginatedPrintData = paginateData(
    printResponseData || [],
    recordsPerPage
  );

  return (
    <div>
      <div id="section-to-print">
        {paginatedPrintData.map((reportData, reportIndex) => (
          <div key={reportIndex} style={{ pageBreakAfter: "always" }}>
            <table style={{ borderCollapse: "collapse", scale:'90%' }}>
              <thead>
                <tr>
                  <td colSpan={5} rowspan="4 " style={{ textAlign: "center" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "80px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </td>
                  <th colSpan={65} rowSpan="4" style={{ textAlign: "center" }}>
                    PRODUCT DISPOSITION LOG BOOK
                  </th>
                  <td colSpan={20}>Format No.:</td>
                  <td colSpan={10}>PH-QAD01/F-049</td>
                </tr>
                <tr>
                  <td colSpan={20}>Revision No.:</td>
                  <td colSpan={10}>01</td>
                </tr>
                <tr>
                  <td colSpan={20}>Ref. SOP No.:</td>
                  <td colSpan={10}>PH-QAD01-D-26</td>
                </tr>
                <tr>
                  <td colSpan={20}>Page No.:</td>
                  <td colSpan={10}>
                    {reportIndex + 1} of {paginatedPrintData.length}
                  </td>
                </tr>
                <br />
              </thead>
              <tbody>
                <tr>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    S.No.
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Date
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Batch No.
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Product Name
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Quantity
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    UOM
                  </th>
                  <th colSpan="10" style={{ textAlign: "center" }}>
                    Reason for disposal
                  </th>
                  <th colSpan="15" style={{ textAlign: "center" }}>
                    Done by Sign & Date
                  </th>
                  <th colSpan="15" style={{ textAlign: "center" }}>
                    Checked by Sign & Date
                  </th>
                </tr>

                {reportData.details.map((item, index) => (
                  <tr key={index}>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {/* {index  + 1} */}
                      {index + 1 + reportIndex * recordsPerPage}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {moment(reportData.date).format("DD/MM/YYYY")}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {item.batchNo || "N/A"}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {item.productName || "N/A"}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {item.quantity || "N/A"}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {item.uom || "N/A"}
                    </td>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      {item.reasonForDisposal || "N/A"}
                    </td>
                    <td colSpan="15" style={{ textAlign: "center" }}>
                      {reportData.qa_inspector_sign} <br />
                      {dateformat_op} <br />
                      {getImageOP[reportIndex] && (
                        <img
                          src={getImageOP[reportIndex]}
                          alt="QA Inspector Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      )}
                    </td>
                    <td colSpan="15" style={{ textAlign: "center" }}>
                      {reportData.qa_mr_sign} <br />
                      {dateformat_supervisor} <br />
                      {getImageSUP[reportIndex] && (
                        <img
                          src={getImageSUP[reportIndex]}
                          alt="Supervisor Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
                <br />
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="20" style={{ padding: "1em" }}>
                    Particulars
                  </td>
                  <td colSpan="20" style={{ padding: "1em" }}>
                    Prepared By
                  </td>
                  <td colSpan="30" style={{ padding: "1em" }}>
                    Reviewed By
                  </td>
                  <td colSpan="30" style={{ padding: "1em" }}>
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td colSpan="20" style={{ padding: "1em" }}>
                    Name
                  </td>
                  <td colSpan="20" style={{ padding: "1em" }}></td>
                  <td colSpan="30" style={{ padding: "1em" }}></td>
                  <td colSpan="30" style={{ padding: "1em" }}></td>
                </tr>
                <tr>
                  <td colSpan="20" style={{ padding: "1em" }}>
                    Signature & Date
                  </td>
                  <td colSpan="20" style={{ padding: "1em" }}></td>
                  <td colSpan="30" style={{ padding: "1em" }}></td>
                  <td colSpan="30" style={{ padding: "1em" }}></td>
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
        formName="PRODUCT DISPOSITION LOG BOOK"
        formatNo="PH-QAD01/F-049"
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
              //  disabled={isFetchSuccessful}
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
            <Input
              type="date"
              value={date1}
              // onChange={handleDateChange}
              onChange={(e) => setdate1(e.target.value)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F49_Summary;
