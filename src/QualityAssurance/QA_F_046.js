/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Select, Tabs, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const { TabPane } = Tabs;
const QA_F_046 = () => {
  const location = useLocation();
  const { department, date } = location.state;
  const [open, setOpen] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    unit: "",
    formatNo: "",
    formatName: "",
    sopNumber: "",
    revisionNo: "",
    date: date,
    month: "",
    year: "",
    department: "",
    batchreleasenoteslines: [
      {
        bmrNo: "",
        productName: "",
        lotNo: "",
        totalQty: "",
        releasedQty: "",
      },
    ],
  });
  const [deleteId, setDeleteId] = useState([]);
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    qaManagerOrDesigneeSubmitBy: "",
    supervisor_sign: "",
  });
  const initialized = useRef(false);
  const [bmrLOV, setBMRLOV] = useState([]);

  useEffect(() => {
    const signatureKeys = ["qaManagerOrDesigneeSubmitBy", "supervisor_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
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
            },
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                "",
              ),
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {});
      }
    });
  }, [formData.qaManagerOrDesigneeSubmitBy]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/qa/getdetailsbyParamBatchReleaseNotes?date=${date}&department=QA`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (response.data.body.message !== "No data") {
            const data = response.data.body;
         
            setFormData(data);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    const bmrLovAPI = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/qa/getAllBmrNumberByDate?date=${date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBMRLOV(response.data);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    bmrLovAPI();
  }, [token]);

  const fetchBMRDetails = async (bmrNo, department, index) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/SummaryOfTraceabilityBMRDetails?department=${department}&batchNo=${bmrNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const details = response.data;
      setFormData((prevState) => {
        const updatedRows = [...prevState.batchreleasenoteslines];
        updatedRows[index] = { ...updatedRows[index], ...details };
        return { ...prevState, batchreleasenoteslines: updatedRows };
      });
    } catch (error) {
      console.error("Error fetching BMR details:", error);
    }
  };

  
  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") {
      if (deleteId.length > 0) {
        try {
          for (let i = 0; i < deleteId.length; i++) {
            handleDelete(deleteId[i]);
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/qa/saveBatchReleaseNotes`;
      payload = {
        id: formData.id,
        unit: "Unit H",
        formatNo: "PH-QAD01/F-046",
        formatName: "BATCH RELEASE NOTE",
        sopNumber: "PH-QAD01-D-43",
        revisionNo: "01",
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        department: "QA",
        batchreleasenoteslines: formData.batchreleasenoteslines.map(
          (row, index) => ({
            ...row,
            lineId: row.lineId,
            bmrNo: row.bmrNo,
            productName: row.productName || row[0]?.product,
            lotNo: row.lotNo || row[0]?.lotNo,
            totalQty: row.totalQty || row[0]?.cartons,
            releasedQty: row.releasedQty,
          }),
        ),
      };
    }

    try {
      setStatusLoader(true);
      const response = await axios.post(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/QA_F_046_Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    let apiurl, payload, succesMsg;
    if (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") {
      for (
        let index = 0;
        index < formData.batchreleasenoteslines.length;
        index++
      ) {
        const row = formData.batchreleasenoteslines[index];
        if (row.bmrNo === "") {
          message.warning(`Please Enter BMR No ${index + 1}`);
          return;
        }
        if (row.releasedQty === "") {
          message.warning(`Please Enter Released Quantity ${index + 1}`);
          return;
        }
      }

      if (deleteId.length > 0) {
        try {
          for (let i = 0; i < deleteId.length; i++) {
            handleDelete(deleteId[i]);
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Submitted Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/qa/submitBatchReleaseNotes`;
      payload = {
        id: formData.id,
        unit: "Unit H",
        formatNo: "PH-QAD01/F-046",
        formatName: "BATCH RELEASE NOTE",
        sopNumber: "PH-QAD01-D-43",
        revisionNo: "01",
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        department: "QA",
        batchreleasenoteslines: formData.batchreleasenoteslines.map(
          (row, index) => ({
            ...row,
            lineId: row.lineId,
            bmrNo: row.bmrNo,
            productName: row.productName || row[0]?.product,
            lotNo: row.lotNo || row[0]?.lotNo,
            totalQty: row.totalQty || row[0]?.cartons,
            releasedQty: row.releasedQty,
          }),
        ),
      };
    }

    try {
      setStatusLoader(true);

      const response = await axios.post(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/QA_F_046_Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleFormParams = (value, fieldName, index) => {
    if (fieldName === "bmrNo") {
      const selectedBmr = bmrLOV.find((bmr) => bmr.value === value);
      const department = selectedBmr ? selectedBmr.department : "";
      fetchBMRDetails(value, department, index);
    }

    setFormData((prevState) => {
      const updatedRows = [...prevState.batchreleasenoteslines];
      updatedRows[index] = { ...updatedRows[index], [fieldName]: value };
      return { ...prevState, batchreleasenoteslines: updatedRows };
    });
  };

  const handleSelectText = (e) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };
  const handleDelete = async (rowId) => {
    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/qa/BatchReleaseNotesLines/delete?id=${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status == 200 || response.status == 201) {
      }
    } catch (err) {
      setStatusLoader(false);
      message.error(err.response.data.message);
    }
  };
  const handleDeleteRow = async (index, rowId) => {
    if (formData.batchreleasenoteslines.length == 1) {
      return;
    }
    const confirm = window.confirm("Are You Sure To Delete This Row?");
    if (confirm) {
      if (rowId && formData.batchreleasenoteslines.length !== 1) {
        setDeleteId((prevDeleteId) => [...prevDeleteId, rowId]);
        setFormData((prevState) => ({
          ...prevState,
          batchreleasenoteslines: prevState.batchreleasenoteslines.filter(
            (_, i) => i !== index,
          ),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          batchreleasenoteslines: prevState.batchreleasenoteslines.filter(
            (_, i) => i !== index,
          ),
        }));
      }
    }
  };

  const handleAddRow = () => {
    setFormData((prevState) => ({
      ...prevState,
      batchreleasenoteslines: [
        ...prevState.batchreleasenoteslines,
        {
          bmrNo: "",
          productName: "",
          lotNo: "",
          totalQty: "",
          releasedQty: "",
        },
      ],
    }));
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityAssurance/QA_F_046_Summary");
  };

  const getMonthAndYear = (dateString) => {
    const formatDate = dateString.split("-");
    return { month: formatDate[1], year: formatDate[0] };
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

  return (
    <>
      <BleachingHeader
        formName={"BATCH RELEASE NOTE"}
        formatNo={"PH-QAD01/F-046"}
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
              display:
                formData.qaManagerOrDesigneeStatus ==
                "DESIGNEE_OR_QA_MANAGER_SUBMITTED"
                  ? "none"
                  : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={<IoSave color="#00308F" />}
            onClick={handleSave}
            loading={statusLoader}
          >
            Save
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display:
                formData.qaManagerOrDesigneeStatus ==
                "DESIGNEE_OR_QA_MANAGER_SUBMITTED"
                  ? "none"
                  : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={<GrDocumentStore color="#00308F" />}
            onClick={handleSubmit}
            loading={statusLoader}
          >
            Submit
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
      <div style={{ margin: "10px" }}>
        <Input
          value={formatDate(date)}
          addonBefore="Date :"
          style={{ textAlign: "center", width: "250px", marginLeft: "10px" }}
          readOnly
        ></Input>
      </div>
      <Tabs>
        <TabPane tab="BMR Count" key="1">
          <div style={{ height: "50vh" }}>
            <table style={{ width: "90%", tableLayout: "fixed" }}>
              <tr>
                <td
                  rowSpan={2}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  S. No.
                </td>
                <td
                  rowSpan={2}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  BMR No.
                </td>
                <td
                  rowSpan={2}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Product Name
                </td>
                <td
                  rowSpan={2}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Batch No. / Lot No.
                </td>
                <td
                  colSpan={2}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Quantity (Kg)
                </td>
                <td
                  rowSpan={2}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  Action
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>Total</td>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  Released
                </td>
              </tr>
              {formData.batchreleasenoteslines?.map((row, index) => (
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Select
                      value={row.bmrNo}
                      options={bmrLOV.map((bmr) => ({
                        value: bmr.value,
                        label: `${bmr.value} - ${bmr.department}`,
                      }))}
                      onChange={(value) =>
                        handleFormParams(value, "bmrNo", index)
                      }
                      dropdownStyle={{ textAlign: "center" }}
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                      disabled={
                        formData.qaManagerOrDesigneeStatus ==
                        "DESIGNEE_OR_QA_MANAGER_SUBMITTED"
                      }
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {row[0]?.product || row.productName}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {row[0]?.lotNo || row.lotNo}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {row[0]?.cartons || row.totalQty}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <Input
                      value={row.releasedQty}
                      min={1}
                      onChange={(e) => {
                        handleFormParams(e.target.value, "releasedQty", index);
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly={
                        formData.qaManagerOrDesigneeStatus ==
                        "DESIGNEE_OR_QA_MANAGER_SUBMITTED"
                      }
                      onKeyDown={handleSelectText}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Button
                      style={{
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "white",
                        gap: "0px",
                      }}
                      onClick={() => {
                        handleDeleteRow(index, row.lineId);
                      }}
                      disabled={
                        formData.qaManagerOrDesigneeStatus ==
                        "DESIGNEE_OR_QA_MANAGER_SUBMITTED"
                      }
                      loading={statusLoader}
                    >
                      {" "}
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
              <Button
                onClick={handleAddRow}
                disabled={
                  formData.qaManagerOrDesigneeStatus ==
                  "DESIGNEE_OR_QA_MANAGER_SUBMITTED"
                }
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="2">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="4" style={{ textAlign: "center", width: "35%" }}>
                  Initiator and Approve
                </td>
              </tr>
              <tr>
                <td colspan="4" style={{ height: "60%", textAlign: "center" }}>
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
                        {formData.qaManagerOrDesigneeSubmitBy}
                        <br />
                        {formatDateAndTime(
                          formData.qaManagerOrDesigneeSubmitOn,
                        )}{" "}
                        <br />
                        {eSign.qaManagerOrDesigneeSubmitBy ? (
                          <img
                            src={eSign.qaManagerOrDesigneeSubmitBy}
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
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default QA_F_046;
