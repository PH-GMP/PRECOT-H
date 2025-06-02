/* eslint-disable no-restricted-globals */

import { Button, Input, message, Table, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import {
  handleKeyDown,
  printDateFormat,
  slashFormatDate,
} from "../util/util.js";

const QA_F017 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialized = useRef(false);
  const navigateSummary = "/Precot/QA/QA_F017_Summary";
  const formName = "Minutes of MRM";
  const formatNo = "PH-QAD01-F-017";
  const role = localStorage.getItem("role");
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [eSign, setESign] = useState({
    mrOrQaManagerSign: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["mrOrQaManagerSign"];
    signatureKeys.forEach((key) => {
      if (formData) {
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
              setESign((prevSign) => ({
                ...prevSign,
                [key]: url,
              }));
            })
            .catch((err) => {});
        }
      }
    });
  }, [formData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!initialized.current) {
      initialized.current = true;
      const fetchFromPreviousForm = () => {
        const year = state.year;
        const month = state.month;
        const headings = state.headings;
        axios
          .get(
            `${API.prodUrl}/Precot/api/qa/getdetailsbyAgendaParamMOM?year=${year}&month=${month}&headings=${headings}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
              },
            }
          )
          .then((response) => {
            if (response.data.body.message === "No data") {
              message.warning("No data available for this month!!");
            } else {
              console.log(
                "old line object",
                response.data.body[0].agendatopicslines
              );
              // response.data.body must a one object
              let newlineObject = [];
              let mrmNumber = "";
              let date = "";
              response.data.body.map((data) => {
                newlineObject = fetchlinesfromPrevious(data.agendatopicslines);
                mrmNumber = data.meetingNo;
                date = data.date;
              });

              setFormData((prevFormData) => ({
                ...prevFormData,
                date: date,
                mrm_no: mrmNumber,
                minutesofmrmlines: newlineObject,
                headings: headings,
              }));
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error); // Handle any errors
          });
      };

      const fetchData = () => {
        // Get the token from localStorage
        const year = state.year;
        const month = state.month;
        const headings = state.headings;
        axios
          .get(
            `${API.prodUrl}/Precot/api/qa/getdetailsbyParamMOM?year=${year}&month=${month}&headings=${headings}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
              },
            }
          )
          .then((response) => {
            if (response.data.body.message === "No data") {
              fetchFromPreviousForm();
            } else {
              setFormData(response.data.body);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error); // Handle any errors
          });
      };
      fetchData();
      // fetchFromPreviousForm();
    }
  }, []);
  const convertFormData = () => {
    const payload = {
      ...formData,
      participants: formData.participants || "NA", // Check participants

      // Map through minutesofmrmlines to prepare the data
      minutesofmrmlines: formData.minutesofmrmlines.map((line) => ({
        ...line,
        details_of_discussion: line.details_of_discussion || "NA",
        actions_decided: line.actions_decided || "NA",
        remark: line.remark || "NA",
        responsibility: line.responsibility || "NA",
      })),
    };

    return payload;
  };

  const checkMandatoryFields = () => {
    const { subject, period_of_review, participants } = formData;
    const missingFields = [];
    if (!subject) missingFields.push("Subject");
    if (!period_of_review) missingFields.push("Period of Review");
    if (!participants) missingFields.push("Participants is mandatory!");

    return missingFields;
  };

  const fetchlinesfromPrevious = (prevagenobject) => {
    const newMinutesofMrmlines = prevagenobject.map((data) => ({
      topics: data.topics,
      details_of_discussion: "",
      actions_decided: "",
      responsibility: "",
      target_date: "",
    }));
    return newMinutesofMrmlines;
  };

  const [formData, setFormData] = useState({
    unit: "Unit H",
    formatNo: "FMT-001",
    formatName: "Review Meeting",
    sopNumber: "SOP-100",
    revisionNo: "Rev-3",
    date: null,
    month: state.month,
    year: state.year,
    period_of_review: "",
    mrm_no: null,
    subject: "",
    participants: "",
    remark: null,
    mrOrQaManagerStatus: null,
    mrOrQaManagerSavedOn: null,
    mrOrQaManagerSavedBy: null,
    mrOrQaManagerSavedId: null,
    mrOrQaManagerSubmittedOn: null,
    mrOrQaManagerSubmittedBy: null,
    mrOrQaManagerSubmittedId: null,
    mrOrQaManagerSign: null,
    minutesofmrmlines: [
      {
        topics: "",
        details_of_discussion: "",
        actions_decided: "",
        responsibility: "",
        target_date: "",
        remark: "",
      },
    ],
  });

  const columns = [
    {
      title: "S. No",
      key: "sno",
      align: "center",
      render: (text, record, index) => {
        return (currentPage - 1) * pageSize + (index + 1);
      },
    },
    {
      title: "Subject",
      dataIndex: "topics",
      key: "topics",
      align: "center",
    },
    {
      title: "Details of Discussion",
      dataIndex: "details_of_discussion",
      key: "details_of_discussion",
      align: "center",
      render: (text, record, index) => (
        <Input
          value={
            formData.minutesofmrmlines.length > 0 &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index] &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index]
              .details_of_discussion
          }
          onChange={(e) =>
            handleInputChange(
              (currentPage - 1) * pageSize + index,
              "details_of_discussion",
              e.target.value
            )
          }
          onKeyDown={handleKeyDown}
          disabled={canDisable()}
        />
      ),
    },
    {
      title: "Actions Decided",
      dataIndex: "actions_decided",
      key: "actions_decided",
      align: "center",
      render: (text, record, index) => (
        <Input
          value={
            formData.minutesofmrmlines.length > 0 &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index] &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index]
              .actions_decided
          }
          onChange={(e) =>
            handleInputChange(
              (currentPage - 1) * pageSize + index,
              "actions_decided",
              e.target.value
            )
          }
          onKeyDown={handleKeyDown}
          disabled={canDisable()}
        />
      ),
    },

    {
      title: "Responsibility ",
      dataIndex: "responsibility",
      key: "responsibility",
      align: "center",
      render: (text, record, index) => (
        <Input
          value={
            formData.minutesofmrmlines.length > 0 &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index] &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index]
              .responsibility
          }
          onChange={(e) =>
            handleInputChange(
              (currentPage - 1) * pageSize + index,
              "responsibility",
              e.target.value
            )
          }
          onKeyDown={handleKeyDown}
          disabled={canDisable()}
        />
      ),
    },

    {
      title: "Target Date",
      dataIndex: "target_date",
      key: "target_date",
      align: "center",
      render: (text, record, index) => (
        <input
          disabled={canDisable()}
          type="date"
          value={
            formData.minutesofmrmlines.length > 0 &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index] &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index]
              .target_date
          }
          onChange={(e) =>
            handleInputChange(
              (currentPage - 1) * pageSize + index,
              "target_date",
              e.target.value
            )
          }
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "0",
            margin: "0",
            appearance: "none",
          }}
        />
      ),
    },

    {
      title: "Remark / Reference Annexure",
      dataIndex: "remarks",
      key: "remarks",
      align: "center",
      render: (text, record, index) => (
        <Input
          value={
            formData.minutesofmrmlines.length > 0 &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index] &&
            formData.minutesofmrmlines[(currentPage - 1) * pageSize + index]
              .remark
          }
          onChange={(e) =>
            handleInputChange(
              (currentPage - 1) * pageSize + index,
              "remark",
              e.target.value
            )
          }
          disabled={canDisable()}
        />
      ),
    },
  ];

  const canDisplayButtons = () => {
    // MR_OR QA_MANAGER_SUBMITTED
    if (formData.mrOrQaManagerStatus === "MR_OR QA_MANAGER_SUBMITTED") {
      return "none";
    }
  };

  const canDisable = () => {
    if (formData.mrOrQaManagerStatus === "MR_OR QA_MANAGER_SUBMITTED") {
      return true;
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const handleBack = () => {
    navigate(navigateSummary);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleInputChange = (index, key, value) => {
    const updatedData = [...formData.minutesofmrmlines];
    updatedData[index][key] = value;
    // setFormData({ minutesofmrmlines: updatedData });
    setFormData((prevFormData) => ({
      ...prevFormData,
      minutesofmrmlines: updatedData,
    }));
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    axios
      .post(`${API.prodUrl}/Precot/api/qa/saveMOM`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success("Successfully Saved!");
        navigate(navigateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const missingFields = checkMandatoryFields();

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        message.warning(`Please fill in the mandatory field: ${field}`);
      });
      return;
    }
    // converting fields to NA if not entered
    const payload = convertFormData();

    // submitting process
    axios
      .post(`${API.prodUrl}/Precot/api/qa/submitMOM`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success("Successfully Submitted!");
        navigate(navigateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <BleachingHeader
        formName={formName}
        formatNo={formatNo}
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
              display: canDisplayButtons(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_PCI_TRAINED_PERSON" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
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
              display: canDisplayButtons(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_PCI_TRAINED_PERSON" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
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

      <div>
        <Input
          addonBefore="Date:"
          style={{ width: "40%", margin: "0.5rem" }}
          value={slashFormatDate(formData.date)}
          disabled
        />
        <Input
          addonBefore="MRM No:"
          style={{ width: "40%", margin: "0.5rem" }}
          value={formData.mrm_no}
          disabled
        />
        <Input
          addonBefore="Period of Review"
          style={{ width: "80%", margin: "0.5rem" }}
          value={formData.period_of_review}
          onChange={(e) => handleChange("period_of_review", e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={canDisable()}
        />
        <Input
          addonBefore="Subject"
          style={{ width: "80%", margin: "0.5rem" }}
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={canDisable()}
        />
        <Input
          addonBefore="Participants"
          style={{ width: "80%", margin: "0.5rem" }}
          value={formData.participants}
          onChange={(e) => handleChange("participants", e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={canDisable()}
        />
      </div>
      <div>
        <Table
          dataSource={formData.minutesofmrmlines}
          columns={columns}
          style={{ margin: "0.5rem" }}
          pagination={{
            pageSize: pageSize,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
      <div>
        <table>
          <tr>
            <td style={{ textAlign: "center" }}>
              <span>Prepared by :</span>
              <b>
                {formData.mrOrQaManagerSign}
                <br></br>
                {printDateFormat(formData.mrOrQaManagerSubmittedOn)}
              </b>
              <br></br>
              {eSign.mrOrQaManagerSign ? (
                <img
                  src={eSign.mrOrQaManagerSign}
                  alt="mrOrQaManagerSign"
                  style={{
                    width: "100px",
                    height: "50px",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                  }}
                />
              ) : null}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default QA_F017;
