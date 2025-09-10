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

const { Option } = Select;
const QA_F60_Summary = () => {
  const initial = useRef(false);
  const [, setdepartment] = useState([]);
  const [deaprtment_list, setdepartment_list] = useState([]);
  const [, setAvailableBMRnoLov] = useState("Select BMR No");
  const [, setSelectedRow] = useState(null);
  const [, setIsModalVisible] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData] = useState([]);
  const [, setSelectedYear] = useState("Select Year");
  const [, setformatteddate] = useState("");
  const [, setccfno_number] = useState("");
  const [, setopsignprint] = useState("");
  const [, sethodsignprint] = useState("");
  const [, setsupsignprint] = useState("");
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);
  const [printResponseData, setPrintResponseData] = useState(null);
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const token = localStorage.getItem("token");
  const [, setLoading] = useState(false);
  const navigate = useNavigate();
  const [batchno2, setbatchno2] = useState([]);
  const [batchNolist2, setBatchNolist2] = useState("Select Department Name");
  const [, setSelectedMonth] = useState("Select Month");
  const [, setbatchno] = useState([]);
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
        },
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

        // setbatchno2(foundDepartment.department);
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
        `${API.prodUrl}/Precot/api/qa/getSummarydetailsSharpTools`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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

  const handleprint_section = async (value) => {
    setBatchNolist2(value);

    axios
      .get(
        `${API.prodUrl}/Precot/api/qa/getdetailsForPrintSharpTools?date=${date1}&department=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        if (res.data.body[0]) {
          setPrintResponseData(res.data.body[0]);

          const formatteddate = moment(res.data.body[0]?.date).format(
            "DD/MM/YYYY",
          );

          setformatteddate(formatteddate);
          const dateformat_op = moment(
            res.data.body[0]?.qa_inspector_submitted_on,
          ).format("DD/MM/YYYY HH:mm");
          const dateformat_supervisor = moment(
            res.data.body[0]?.qa_manager_approved_on,
          ).format("DD/MM/YYYY HH:mm");

          setdateformat_op(dateformat_op);
          setdateformat_supervisor(dateformat_supervisor);

          setdateprint(formatteddate);
          setdepartment(res.data.body[0]?.department);
          setopsignprint(res.data.body[0]?.operator_sign);
          setsupsignprint(res.data.body[0]?.supervisor_sign);
          sethodsignprint(res.data.body[0]?.hod_sign);
          message.success("Data Fetched Successfully");
          setIsFetchSuccessful(false);

          //api image for inspector
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data.body[0]?.qa_inspector_sign}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              },
            )
            .then((res) => {
              //
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  "",
                ),
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImageOP(url);
            })
            .catch((err) => {
              //
            });
          //api image for manager sign
          axios
            .get(
              `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data.body[0]?.qa_manager_sign}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              },
            )
            .then((res) => {
              //
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  "",
                ),
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImageSUP(url);
            })
            .catch((err) => {});
        } else {
          setPrintResponseData([]);
          message.error("No data found...!");
          setBatchNolist2(null);
          setIsFetchSuccessful(false);
          setShowModal(false);
          return;
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        setShowModal(false);
        notification.warning({
          message: "Notification",
          description: err.response.data?.message,
        });
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
          // //
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
      availableshiftlov == null ||
      availableshiftlov == "" ||
      availableshiftlov == "[]" ||
      availableshiftlov == "Select Department" ||
      availableshiftlov == 0
    ) {
      message.warning("Please Select Department");
      return;
    }

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
    navigate("/Precot/QA/F-60", {
      state: {
        depno: availableshiftlov,
        datevalue: date,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/F-60", {
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
      // render: text => <div style={{ padding: '8px'}}>{text}</div>
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "date",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "QA Inspector Status",
      dataIndex: "qa_inspector_status",
      key: "qa_inspector_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },

    {
      title: "QA Manager status",
      dataIndex: "qa_manager_status",
      key: "qa_manager_status",
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
  const printDateSubmit = () => {
    window.print();
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

  const recordsPerPage = 15;
  const totalPages = Math.ceil(
    printResponseData?.listofsharptoolslines?.length / recordsPerPage,
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
                    LIST OF SHARP TOOLS
                  </th>
                  <td colSpan="15">Format No.:</td>
                  <td colSpan="40">PH-QAD01/F-060</td>
                </tr>
                <tr>
                  <td colSpan="15">Revision No.:</td>
                  <td colSpan="40">01</td>
                </tr>
                <td colSpan="15">Ref. SOP No.:</td>
                <td colSpan="40">PH-QAD01-D-45</td>
                <tr>
                  <td colSpan="15">Page No.:</td>
                  <td colSpan="40">
                    {" "}
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="100"></td>
                </tr>
              </thead>
              <br />
              <tbody>
                {pageIndex === 0 && (
                  <>
                    <tr>
                      <td colSpan="10" style={{ paddingLeft: "10px" }}>
                        Date:{" "}
                      </td>
                      <td colSpan="30" style={{ paddingLeft: "10px" }}>
                        {dateprint}
                      </td>

                      <td colSpan="8" style={{ paddingLeft: "10px" }}>
                        Department
                      </td>
                      <td colSpan="52" style={{ paddingLeft: "10px" }}>
                        {printResponseData?.department}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th colSpan="10"> S.No.</th>
                  <th colSpan="20">Item Description</th>
                  <th colSpan="10">Identification No. On The Tool</th>
                  <th colSpan="10">Verification Frequency</th>
                  <th colSpan="20">Location</th>
                  <th colSpan="30">Remarks</th>
                </tr>
                {printResponseData?.listofsharptoolslines?.length > 0 ? (
                  paginateData(
                    printResponseData.listofsharptoolslines,
                    pageIndex + 1,
                  ).map((item, index) => (
                    <tr key={index}>
                      {
                        <td colSpan="10">
                          {" "}
                          {index + 1 + pageIndex * recordsPerPage}
                        </td>
                      }
                      {item.item_description && (
                        <td colSpan="20">{item.item_description}</td>
                      )}
                      {item.identification_no && (
                        <td colSpan="10">{item.identification_no}</td>
                      )}
                      {item.verification_frequency && (
                        <td colSpan="10">{item.verification_frequency}</td>
                      )}
                      {item.location && <td colSpan="20">{item.location}</td>}
                      {item.remarks && <td colSpan="30">{item.remarks}</td>}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="100%">No data available</td>
                  </tr>
                )}
                <br />
                {pageIndex + 1 === totalPages && (
                  <>
                    <tr>
                      <td colspan="40">
                        Prepared by:{printResponseData?.qa_inspector_sign}&nbsp;
                        {dateformat_op}
                        <div>
                          {getImageOP && (
                            <img
                              src={getImageOP}
                              alt="QA Sign"
                              style={{
                                width: "60px",
                                height: "60px",
                                marginLeft: "20px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                                justifyContent: "space-evenly",
                              }}
                            />
                          )}
                        </div>{" "}
                      </td>
                      <td colspan="60">
                        Verified by:{printResponseData?.qa_manager_sign} &nbsp;
                        {dateformat_supervisor}
                        <div>
                          {getImageSUP && (
                            <img
                              src={getImageSUP}
                              alt="QA Sign"
                              style={{
                                width: "60px",
                                height: "60px",
                                marginLeft: "20px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                                justifyContent: "space-evenly",
                              }}
                            />
                          )}
                        </div>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="100">
                        Note :-
                        <div>
                          1) In case of a tool kit, individul items should be
                          mentioned.{" "}
                        </div>
                        <div>
                          2) Identification number will be given by the user
                          department.
                        </div>
                        <div>
                          3) Sharp tool Dept. wise Identification number (Blow
                          Room - BR-XX, Bleaching - BLG-XX, Spunlace - SP-XX,
                          Ball Making - BM-XX, Pleat - PLT- XX, Wool Roll -
                          WR-XX, Pad Punching - PP-XX, Store - STR-XX, Quality -
                          QC-XX)
                        </div>
                      </td>
                    </tr>
                  </>
                )}
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
        formName="LIST OF SHARP TOOLS "
        formatNo="PH-QAD01/F-060"
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
            {deaprtment_list?.map((shiftvalue, index) => (
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
              disabled={isFetchSuccessful}
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
              onChange={(e) => setdate1(e.target.value)}
            />
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Department Name:
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Department Name"
              value={batchNolist2}
              onChange={handleprint_section}
              showSearch
            >
              {batchno2?.map((MacLOV, index) => (
                <Option key={index} value={MacLOV}>
                  {MacLOV}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default QA_F60_Summary;
