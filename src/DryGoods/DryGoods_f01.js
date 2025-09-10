/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Modal, Pagination, Row, Space, Tabs, Tooltip, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const { TabPane } = Tabs;
const DryGoods_f01 = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const { shift, date, laydownNo } = location.state;
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    date: date,
    shift: shift,
    mixing: "AB 100%",
    laydown_no: laydownNo,
    reason: "",
    operator_status: "",
    operator_save_by: "",
    operator_save_on: "",
    operator_submitted_by: "",
    operator_submitted_on: "",
    operator_sign: "",
    hod_status: "",
    hod_save_on: "",
    hod_save_by: "",
    hod_submit_on: "",
    hod_submit_by: "",
    hod_sign: "",
    consumptionReports: [
      {
        BaleNo: "",
        NetWt: "",
        BatchNo: "",
      },
    ],
  });
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const initialized = useRef(false);
  const paginatedData = formData.consumptionReports
    ? formData.consumptionReports.slice(startIndex, endIndex)
    : [];
  useEffect(() => {
    console.log("Form Data", formData);
    console.log("Paginated Data", paginatedData);
  }, [formData, paginatedData, date.shift]);

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [token, formData]);

  useEffect(() => {
    if (!initialized.current) {
      if (role == "ROLE_OPERATOR") {
        setStatus((prevStatus) => ({
          ...prevStatus,
          saveStatus: true,
        }));
      }
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        setStatus((prevStatus) => ({
          ...prevStatus,
          fieldStatus: true,
        }));
      }
      if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        if (role == "ROLE_OPERATOR") {
          setStatus((prevStatus) => ({
            ...prevStatus,
            fieldStatus: true,
          }));
        }
      }
      initialized.current = true;
      const fetchBaleReport = async () => {
        let pdeShift;
        switch (shift) {
          case "I":
            pdeShift = 1;
            break;
          case "II":
            pdeShift = 2;
            break;
          case "III":
            pdeShift = 3;
            break;
        }

        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/drygoods/baleReport?date=${date}&shift=${pdeShift}&laydown_no=${laydownNo}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.length > 0) {
            setFormData((prevState) => ({
              ...prevState,
              consumptionReports: response.data,
            }));
          } else if (response.data.length == 0 && role == "ROLE_OPERATOR") {
            message.warning("No Record Found");
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-01/Summary");
            }, [2000]);
          }
        } catch (error) {
          message.error(error.response.data.message);
          setTimeout(() => {
            navigate("/Precot/DryGoods/F-01/Summary");
          }, 1000);
        }
      };
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/drygoods/getdetailsbyParamF001?date=${date}&shift=${shift}&laydown_no=${laydownNo}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.data && role !== "ROLE_OPERATOR") {
            message.warning("Operator Yet To Submit");
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-01/Summary");
            }, 1000);
          }
          if (response.data) {
            const data = response.data;
            console.log("Responsed", data);
            setFormData((prevState) => ({
              ...prevState,
              bale_report_id: data.bale_report_id,
              date: data.date,
              shift: data.shift,
              mixing: data.mixing,
              laydown_no: data.laydown_no,
              operator_submitted_id: data.operator_submitted_id,
              operator_sign: data.operator_sign,
              operator_status: data.operator_status,
              operator_submitted_on: data.operator_submitted_on,
              hod_submit_id: data.hod_submit_id,
              hod_sign: data.hod_sign,
              hod_status: data.hod_status,
              hod_submit_on: data.hod_submit_on,
            }));
            statusFunction(data);
          }
        } catch (error) {
          message.error(error.response.data.message);
          setTimeout(() => {
            navigate("/Precot/DryGoods/F-01/Summary");
          }, 1000);
        }
      };

      fetchData();
      fetchBaleReport();
    }
  }, [shift, date]);

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_OPERATOR" &&
      responseData.operator_status == "OPERATOR_APPROVED" &&
      (responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "HOD_APPROVED")
    ) {
      console.log("Condition 2");
      setStatus((formStatus) => ({
        ...formStatus,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_APPROVED"
    ) {
      console.log("Condition 4");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      message.warning("Operator Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-01/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSave = async () => {
    setStatusLoader(true);
    const payload = {
      id: formData.bale_report_id,
      status: "Approve",
    };
    try {
      const response = await axios.put(
        `${API.prodUrl}/Precot/api/drygoods/BaleConsumptionReportF001/approveOrReject`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 201 || response.status == 200) {
        message.success(response.data.message);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-01/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setStatusLoader(false);
    }
  };
  const handleSubmit = async () => {
    let apiurl, payload;
    if (role == "ROLE_OPERATOR") {
      apiurl = `${API.prodUrl}/Precot/api/drygoods/submitBaleConsumptionReportF001`;
      payload = {
        unit: "Unit H",
        formatNo: "F001",
        formatName: "BALE CONSUMPTION REPORT",
        sopNumber: "PH-PRD04-D-03",
        revisionNo: "01",
        date: formData.date,
        shift: formData.shift,
        mixing: formData.mixing,
        laydown_no: formData.laydown_no,
      };
      const keysToCheck = [
        "operator_status",
        "operator_submitted_by",
        "operator_submitted_on",
        "operator_submitted_id",
        "hod_status",
        "hod_submit_on",
        "hod_submit_by",
        "hod_submit_id",
        "hod_sign",
        "bale_report_id",
      ];

      keysToCheck.forEach((key) => {
        if (formData[key]) {
          payload[key] = formData[key];
        }
      });
    } else {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter The Reason");
        return;
      }
      apiurl = `${API.prodUrl}/Precot/api/drygoods/BaleConsumptionReportF001/approveOrReject`;
      payload = {
        id: formData.bale_report_id,
        status: "Reject",
        remarks: formData.reason,
      };
    }
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_OPERATOR" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200 || response.data == 201) {
        message.success(response.data.message);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-01/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setStatusLoader(false);
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
  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/DryGoods/F-01/Summary");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((prevState) => ({
      ...prevState,
      reason: "",
    }));
  };
  const handleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name == "mixing") {
      setFormData((prevState) => ({
        ...prevState,
        mixing: value,
      }));
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSizeChange = (current, size) => {
    setRecordsPerPage(size);
    setCurrentPage(1);
  };
  const pageSizeOptions = [
    "5",
    "10",
    "20",
    "50",
    "100",
    formData.consumptionReports.length.toString(),
  ].map(Number);
  pageSizeOptions.sort((a, b) => a - b);
  let netWeightTotal = 0;
  paginatedData.forEach((details) => {
    netWeightTotal +=
      details.NetWt == null || details.NetWt == "N/A" ? 0 : details.NetWt;
  });
  return (
    <>
      <BleachingHeader
        formName={"BALE CONSUMPTION REPORT"}
        formatNo={"PH-PRD04/F-001"}
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.saveStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={<img src={approveIcon} alt="Approve Icon" color="#00308F" />}
            onClick={handleSave}
            loading={statusLoader}
          >
            Approve
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.submitStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_OPERATOR" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_OPERATOR" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_OPERATOR" ? " Submit" : "   Reject"}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleSubmit}
            loading={statusLoader}
          >
            Reject
          </Button>,
        ]}
      >
        <label>Reason : </label>
        <br></br>
        <br></br>
        <TextArea
          type="textArea"
          style={{ height: "100px" }}
          onChange={handleRejectReason}
        ></TextArea>
      </Modal>
      <div style={{ margin: "20px" }}>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={18} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Date :"
                value={formatDate(formData.date)}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Shift :"
                value={formData.shift}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Mixing :"
                name="mixing"
                value={formData.mixing}
                onChange={handleInput}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              ></Input>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={5}>
            <Space direction="vertical">
              <Input
                type="text"
                addonBefore="Laydown No :"
                value={formData.laydown_no}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              ></Input>
            </Space>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Consumption Report" key="1">
          <table style={{ width: "70%" }}>
            <thead>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Batch No</td>
                <td style={{ textAlign: "center" }}>Bale No</td>
                <td style={{ textAlign: "center" }}>Net Weight in Kg</td>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((details, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    {startIndex + index + 1}
                  </td>
                  <td style={{ textAlign: "center" }}>{details.BatchNo}</td>
                  <td style={{ textAlign: "center" }}>{details.BaleNo}</td>
                  <td style={{ textAlign: "center" }}>{details.NetWt}</td>
                </tr>
              ))}
              <br></br>
              <tr>
                <th
                  colSpan={3}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  {" "}
                  Total
                </th>
                <td style={{ textAlign: "center" }}>
                  {netWeightTotal == 0
                    ? netWeightTotal
                    : netWeightTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            pageSize={recordsPerPage}
            total={formData.consumptionReports.length}
            onChange={handlePageChange}
            onShowSizeChange={handleSizeChange}
            showSizeChanger
            pageSizeOptions={pageSizeOptions.map((size) => size.toString())}
            style={{
              textAlign: "center",
              marginTop: "20px",
              float: "right",
            }}
          />
        </TabPane>
        <TabPane tab="Reviews" key="2">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  OPERATOR SIGN & DATE
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  HOD/DESIGNEE SIGN & DATE
                </td>
              </tr>
              <tr>
                <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        {formData.operator_sign}
                        <br />
                        {formatDateAndTime(formData.operator_submitted_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.operator_sign ? (
                        <img
                          src={eSign.operator_sign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </td>
                <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
                  {formData.hod_status !== "WAITING_FOR_APPROVAL" &&
                    formData.hod_status !== "" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            {formData.hod_sign}
                            <br />
                            {formatDateAndTime(formData.hod_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.hod_sign ? (
                            <img
                              src={eSign.hod_sign}
                              alt="HOD eSign"
                              style={{
                                width: "150px",
                                height: "70px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    )}
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default DryGoods_f01;
