/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoAdd, IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f16 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { month, year, type } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [fetchedData, setFetchedData] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getMemberImages, setGetMemberImages] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [rows, setRows] = useState([{}]);
  const [nameOfNewArea, setNameOfNewArea] = useState("");
  const [newTopics, setNewTopics] = useState([]);
  const [presentedBy, setPresentedBy] = useState([]);
  const [timeAlloted, setTimeAlloted] = useState([]);
  const [lineIdTopicsget, setLineIdTopicsget] = useState([]);
  const [lineIdTopics, setLineIdTopics] = useState([]);
  const [lineIdaAttendees, setLineIdAttendees] = useState([]);
  const [lineIdTopicGetDelete, setLineIdTopicGetDelete] = useState([]);
  const [topics, setTopics] = useState([]);
  const [lineIdDelete, setLineIdDelete] = useState([]);
  const [memberNameLov, setMemberNameLov] = useState([]);
  const [time, setTime] = useState("");
  const [chairPerson, setChairPerson] = useState("");
  const [meetingNo, setMeetingNO] = useState("");
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [venue, setVenue] = useState("");
  const [CustomVenue, setCustomVenue] = useState("");
  const [showModalNewArea, setShowModalNewArea] = useState(false);
  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const selectedMonth = monthMap[month];
  const MinDate = `${year}-${selectedMonth}-01`;
  const lastDay = new Date(year, selectedMonth, 0).getDate();
  const MaxDate = `${year}-${selectedMonth}-${lastDay}`;
  const [mrmId, setMrmId] = useState("");
  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z.0-9:]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      ![
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "_",
        " ",
        "Delete",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    const isAlphanumeric = /^[a-zA-Z.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      ![
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "_",
        " ",
        "Delete",
        "/",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    rows.forEach((item, index) => {
      const username = item.name;
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
            setGetMemberImages((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {})
          .finally(() => {});
      }
    });
  }, [rows, API.prodUrl, token]);

  useEffect(() => {
    const feetchMemeberNames = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setMemberNameLov(data);
        } else {
          console.error("API response is not an array", data);
          setMemberNameLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setMemberNameLov([]);
      }
    };

    feetchMemeberNames();
  }, [token]);

  const handleNameChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].name = value;
    setRows(updatedRows);
  };
  const handlePresentedByChange = (index, value) => {
    const newpresentedBy = [...presentedBy];
    newpresentedBy[index] = value;
    setPresentedBy(newpresentedBy);
  };
  const handleTimeAllotedChange = (index, value) => {
    const newTimeAlloated = [...timeAlloted];
    newTimeAlloated[index] = value;
    setTimeAlloted(newTimeAlloated);
  };

  const handleAddTopic = () => {
    setShowModalNewArea(true);
  };
  const handleModalClose = () => {
    setShowModalNewArea(false);
    setNameOfNewArea(null);
  };

  const Venues = [
    { id: 1, value: " Board Room" },
    { id: 2, value: "Training Hall" },
  ];

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const handleVenueChange = (value) => {
    setVenue(value);
    if (value === "Other") {
      setCustomVenue(value);
    }
  };
  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row? This action will be finalized after saving."
    );

    if (confirmDelete) {
      const lineIdTopics1 = lineIdTopics[index];
      const lineIdTopicsGet = lineIdTopicsget[index];

      if (lineIdTopics1 !== undefined) {
        setLineIdDelete((prev) => [...prev, lineIdTopics1]);
      }
      if (lineIdTopicsGet !== undefined) {
        setLineIdTopicGetDelete((prev) => [...prev, lineIdTopicsGet]);
      }
      const updatedTopics = topics.filter((_, i) => i !== index);
      const updatedPresentedBy = presentedBy.filter((_, i) => i !== index);
      const updatedTimeAlloted = timeAlloted.filter((_, i) => i !== index);
      setTopics(updatedTopics);
      setPresentedBy(updatedPresentedBy);
      setTimeAlloted(updatedTimeAlloted);
    } else {
    }
  };
  const handleDeleteRow2 = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };
  const selectedNames = rows.map((row) => row.name).filter(Boolean);
  const getAvailableOptions = () => {
    return memberNameLov.filter(
      (option) => !selectedNames.includes(option.name)
    );
  };
  const fetchTopics = async (type) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/agenda/GetTopics?headings=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response1 = response.data;
      if (fetchedData?.message == "No data") {
        setTopics(response1.map((item) => item.topics));
      }
      setLineIdTopics(response1.map((item) => item.id));
    } catch (error) {
    } finally {
    }
  };

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedData?.mrOrQaManagerSign;
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
  }, [fetchedData, API.prodUrl, token]);

  const disabled =
    (roleauth === "ROLE_MR" || roleauth === "QA_MANAGER") &&
    fetchedData?.mrOrQaManagerStatus === "MR_OR QA_MANAGER_SUBMITTED";

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth === "ROLE_MR" || roleauth === "QA_MANAGER") {
      if (fetchedData?.mrOrQaManagerStatus === "MR_OR QA_MANAGER_SUBMITTED") {
        return "none";
      }
    }
  };

  const handleSave = async () => {
    try {
      await SaveAgendaForMRM();
    } catch (error) {
      console.error(
        "Error saving Agenda for Management Review Metting:",
        error
      );
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitAgendaForMRM();
    } catch (error) {
      console.error(
        "Error submitting Agenda for Management Review Metting",
        error
      );
    }
  };

  const SaveAgendaForMRM = async () => {
    setSaveLoading(true);

    try {
      const payload = {
        id: mrmId,
        formatName: "AGENDA FOR MANAGEMENT REVIEW MEETING",
        formatNo: "PH-QAD01-F-016",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-18",
        unit: "Unit H",
        date: date,
        year: year,
        month: month,
        headings: type,
        meetingNo: meetingNo,
        time: time,
        chairPerson: chairPerson,
        venue: venue === "Other" ? CustomVenue : venue,
        time: time,
        remarks: remarks || "NA",
        agendatopicslines: topics.map((topic, index) => ({
          topics: topic,
          presentedBy: presentedBy[index] || "NA",
          timeAlloted: timeAlloted[index] || "NA",
          lineId: lineIdTopicsget[index] || "",
        })),
        agendaformanagementattendees: rows.map((row, index) => ({
          name: row.name || "NA",
          lineId: lineIdaAttendees[index],
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.post(`${API.prodUrl}/Precot/api/qa/saveAgenda`, payload, {
        headers,
      });
      if (lineIdTopicGetDelete.length > 0) {
        await Promise.all(
          lineIdTopicGetDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/qa/AgendaDetails/delete?id=${id}`,
              { headers }
            );
          })
        );
        setLineIdTopicGetDelete([]);
      }
      if (lineIdDelete.length > 0) {
        await Promise.all(
          lineIdDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/qa/agenda/delete?id=${id}`,
              { headers }
            );
          })
        );
        setLineIdDelete([]);
      }
      if (newTopics.length > 0) {
        await Promise.all(
          newTopics.map(async (topic) => {
            try {
              await axios.post(
                `${API.prodUrl}/Precot/api/qa/agenda/addTopic`,
                {
                  topics: topic,
                  headings: type,
                },
                { headers }
              );
            } catch (error) {
              console.error(
                `Failed to add Topic ${topic}:`,
                error.response?.data?.message || error.message
              );
              message.error(`Failed to add Topic ${topic}`);
            }
          })
        );
        setNewTopics([]);
      }

      setTimeout(() => {
        navigate("/Precot/QA/F-16/Summary");
      }, 1500);

      message.success(
        "Agenda for Management Review Metting Saved Successfully.."
      );
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Failed to save Agenda for Management Review Metting Record!!"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitAgendaForMRM = async () => {
    setSubmitLoading(true);

    if (date == "null" || date == "") {
      message.warning("Date Required");
      setSubmitLoading(false);
      return;
    }
    if (time == "null" || time == "") {
      message.warning("Time Required");
      setSubmitLoading(false);
      return;
    }
    if (meetingNo == "null" || meetingNo == "") {
      message.warning("Meeting Number Required");
      setSubmitLoading(false);
      return;
    }
    if (chairPerson == "null" || chairPerson == "") {
      message.warning("Chair Person Name Required");
      setSubmitLoading(false);
      return;
    }
    if (venue == "null" || venue == "") {
      message.warning("Venue Required");
      setSubmitLoading(false);
      return;
    }
    try {
      const payload = {
        id: mrmId,
        formatName: "AGENDA FOR MANAGEMENT REVIEW MEETING",
        formatNo: "PH-QAD01-F-016",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-18",
        unit: "Unit H",
        date: date,
        year: year,
        month: month,
        headings: type,
        meetingNo: meetingNo,
        time: time,
        chairPerson: chairPerson,
        venue: venue === "Other" ? CustomVenue : venue,
        time: time,
        remarks: remarks || "NA",
        agendatopicslines: topics.map((topic, index) => ({
          topics: topic,
          presentedBy: presentedBy[index] || "NA",
          timeAlloted: timeAlloted[index] || "NA",
          lineId: lineIdTopicsget[index] || "",
        })),
        agendaformanagementattendees: rows.map((row, index) => ({
          name: row.name || "NA",
          lineId: lineIdaAttendees[index],
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qa/submitAgenda`,
        payload,
        { headers }
      );

      if (lineIdDelete.length > 0) {
        await Promise.all(
          lineIdDelete.map(async (id) => {
            await axios.delete(
              `${API.prodUrl}/Precot/api/qa/agenda/delete?id=${id}`,
              { headers }
            );
          })
        );
        setLineIdDelete([]);
      }
      if (newTopics.length > 0) {
        await Promise.all(
          newTopics.map(async (topic) => {
            try {
              await axios.post(
                `${API.prodUrl}/Precot/api/qa/agenda/addTopic`,
                {
                  topics: topic,
                  headings: type,
                },
                { headers }
              );
            } catch (error) {
              console.error(
                `Failed to add Topic ${topic}:`,
                error.response?.data?.message || error.message
              );
              message.error(`Failed to add Topic ${topic}`);
            }
          })
        );
        setNewTopics([]);
      }
      setTimeout(() => {
        navigate("/Precot/QA/F-16/Summary");
      }, 1500);
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-16/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);
  useEffect(() => {
    const { type } = state || {};
    fetchTopics(type);
  }, [fetchedData]);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/getdetailsbyParamAgenda?year=${year}&month=${month}&headings=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setFetchedData(response.data.body);

      if (response.data && response.data.body.message !== "No data") {
        const data = response.data.body;
        setTopics(data.agendatopicslines.map((item) => item.topics));
        setPresentedBy(data.agendatopicslines.map((item) => item.presentedBy));
        setTimeAlloted(data.agendatopicslines.map((item) => item.timeAlloted));
        setLineIdTopicsget(data.agendatopicslines.map((item) => item.lineId));
        setLineIdAttendees(
          data.agendaformanagementattendees.map((item) => item.lineId)
        );
        setMrmId(data.id);
        setDate(data.date);
        setTime(data.time);
        setMeetingNO(data.meetingNo);
        setChairPerson(data.chairPerson);
        setVenue(data.venue);
        setRemarks(data.remarks);
        setRows(
          data.agendaformanagementattendees?.map((item) => ({
            name: item.name,
          }))
        );
      } else {
        setLineIdTopicsget([]);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const handleAddNewTopic = () => {
    if (!nameOfNewArea) {
      message.warning("Please Enter the Name of New Topic!");
      return;
    }
    setTopics((prev) => [...prev, nameOfNewArea]);
    setNewTopics((prev) => [...prev, nameOfNewArea]);
    message.success(
      "New Area marked for addition. It will be added after saving."
    );
    handleModalClose();
    setNameOfNewArea("");
  };

  const items = [
    {
      key: "1",
      label: <p>Agenda for MRM</p>,
      children: (
        <div>
          <table
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="10" style={{ textAlign: "center", height: "30px" }}>
                S. No.
              </th>
              <th colSpan="50" style={{ textAlign: "center" }}>
                Topic
              </th>
              <th colSpan="30" style={{ textAlign: "center" }}>
                Presented by
              </th>
              <th colSpan="25" style={{ textAlign: "center" }}>
                Time alloted
              </th>
            </tr>
            {topics.map((topic, index) => (
              <tr key={index}>
                <td
                  colSpan="10"
                  style={{ textAlign: "center", height: "20px" }}
                >
                  {index + 1}
                </td>
                <td colSpan="50" style={{ textAlign: "center" }}>
                  {topic}
                </td>
                <td colSpan="30" style={{ textAlign: "center" }}>
                  {" "}
                  <input
                    type="text"
                    disabled={disabled}
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={presentedBy[index]}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      handlePresentedByChange(index, e.target.value)
                    }
                  />
                </td>
                <td colSpan="25" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    disabled={disabled}
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={timeAlloted[index]}
                    onKeyDown={handleKeyDown2}
                    onChange={(e) =>
                      handleTimeAllotedChange(index, e.target.value)
                    }
                  />
                </td>
                <td
                  colSpan="1"
                  style={{
                    height: "35px",
                    textAlign: "center",
                    cursor: "pointer",
                    size: "40px",
                    border: "none",
                    display: disabled ? "none" : "block",
                  }}
                  onClick={() => handleDeleteRow(index)}
                >
                  <DeleteOutlined
                    style={{ fontSize: "24px", color: "#ff4d4f" }}
                  />
                </td>
              </tr>
            ))}
          </table>
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "8px",
              display: canDisplayButtons(),
            }}
            icon={<IoAdd color="#00308F" />}
            onClick={handleAddTopic}
            shape="round"
          >
            Add New Topic
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Members Present</p>,
      children: (
        <div>
          <table
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="5"
                style={{ textAlign: "center", width: "30%", height: "30px" }}
              >
                S.No.
              </th>
              <th
                colSpan="25"
                style={{ textAlign: "center", width: "30%", height: "30px" }}
              >
                Name
              </th>
              <th colSpan="25" style={{ textAlign: "center", width: "30%" }}>
                Sign.
              </th>
            </tr>
            {rows.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", width: "30%", height: "20px" }}
                >
                  {index + 1}
                </td>
                <td
                  colSpan="25"
                  style={{ textAlign: "center", width: "30%", height: "20px" }}
                >
                  <Select
                    showSearch
                    value={row.name}
                    onChange={(value) => {
                      handleNameChange(value, index);
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select Name"
                    optionFilterProp="children"
                    disabled={disabled}
                  >
                    <Select.Option value="" disabled selected>
                      Select Participant Name
                    </Select.Option>
                    {getAvailableOptions().map((option) => (
                      <Select.Option key={option.id} value={option.name}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </td>
                <td
                  colSpan="25"
                  style={{
                    textAlign: "center",
                    width: "30%",
                    marginBottom: "20px",
                  }}
                >
                  {getMemberImages[index] && (
                    <img
                      src={getMemberImages[index]}
                      alt={`MR/QA Manager Sign ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        objectFit: "contain",
                        marginTop: "20px",
                      }}
                    />
                  )}
                </td>
                <td
                  colSpan="1"
                  style={{
                    height: "35px",
                    cursor: "pointer",
                    size: "40px",
                    border: "none",
                    display: disabled ? "none" : "block",
                  }}
                  onClick={() => handleDeleteRow2(index)}
                >
                  <DeleteOutlined
                    style={{ fontSize: "24px", color: "#ff4d4f" }}
                  />
                </td>
              </tr>
            ))}
            <br />
            <br />
            <button
              onClick={handleAddRow}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                width: "100px",
                display: canDisplayButtons(),
                border: "none",
                padding: "4px",
              }}
              disabled={disabled}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
            <br />
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th
                colSpan="70"
                rowSpan="2"
                style={{ height: "35px", textAlign: "left" }}
              >
                {" "}
                Remarks:{" "}
                <TextArea
                  value={remarks}
                  disabled={disabled}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  style={{ width: "100%" }}
                />
              </th>
              <td
                colSpan="30"
                style={{
                  textAlign: "center",
                  height: "30px",
                  verticalAlign: "top",
                  borderBottom: "none",
                }}
              >
                MR/QA Manager Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="30"
                style={{ textAlign: "center", borderTop: "none" }}
              >
                {" "}
                {fetchedData?.mrOrQaManagerStatus ===
                  "MR_OR QA_MANAGER_SUBMITTED" && (
                  <>
                    {getImage1 && (
                      <img
                        src={getImage1}
                        alt="MR/QA Manager Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      />
                    )}

                    <div>
                      {" "}
                      <div>{fetchedData?.mrOrQaManagerSign}</div>
                      <div style={{ verticalAlign: "bottom" }}>
                        {formattedDate(fetchedData?.mrOrQaManagerSubmittedOn)}
                      </div>
                    </div>
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="AGENDA FOR MANAGEMENT REVIEW MEETING"
        formatNo="PH-QAD01-F-016"
        sopNo="PH-QAD01-D-18"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_MR" || role === "QA_MANAGER" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ) : (
            <></>
          ),
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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

      {/* Unique Param Row*/}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
        }}
      >
        <Input
          addonBefore="Month:"
          placeholder="Month"
          value={month}
          style={{ width: "15%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          style={{ width: "15%", height: "35px" }}
        />
        <Input
          addonBefore="Date:"
          type="Date"
          value={date}
          min={MinDate}
          max={MaxDate}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "15%", height: "35px", marginLeft: "10px" }}
          placeholder="Select Date"
          disabled={disabled}
        />
        <Input
          addonBefore="Time:"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: "15%", height: "35px", marginLeft: "10px" }}
          placeholder="Select Time"
          disabled={disabled}
        />
        <Input
          addonBefore="Meeting No. :"
          type="text"
          value={meetingNo}
          onKeyDown={handleKeyDown2}
          onChange={(e) => setMeetingNO(e.target.value)}
          style={{ width: "20%", height: "35px", marginLeft: "5px" }}
          placeholder="Enter No."
          disabled={disabled}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
        }}
      >
        <Input
          addonBefore="Type:"
          placeholder="Type"
          value={type}
          style={{ width: "55%", height: "35px" }}
        />
        <Input
          addonBefore="Chair Person :"
          type="text"
          value={chairPerson}
          onKeyDown={handleKeyDown}
          onChange={(e) => setChairPerson(e.target.value)}
          style={{ width: "35%", height: "35px", marginLeft: "10px" }}
          placeholder="Enter Name"
          disabled={disabled}
        />
        <Input.Group compact>
          <div style={{ width: "9%" }}>
            <Input
              addonBefore="Venue:"
              style={{ width: "100%", height: "35px" }}
              disabled
            />
          </div>
          <Select
            value={venue}
            onChange={handleVenueChange}
            style={{
              width: "25%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            disabled={disabled}
          >
            <Select.Option value="" disabled selected>
              Select Venue
            </Select.Option>
            {Venues.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
            <option value="Other">Other</option>
          </Select>
          {venue === "Other" && (
            <input
              className="inp-new"
              type="text"
              value={CustomVenue}
              onKeyDown={handleKeyDown}
              onChange={(e) => setCustomVenue(e.target.value)}
              style={{
                width: "20%",
                height: "31px",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
                marginLeft: "5px",
              }}
              placeholder="Enter Your Venue"
            />
          )}
        </Input.Group>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
        }}
      ></div>
      <Modal
        title="Add New Topic"
        open={showModalNewArea}
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
            icon={<IoAdd color="#00308F" />}
            onClick={() => {
              if (confirm("Are you sure want to Add the New Topic ??")) {
                handleAddNewTopic();
              }
            }}
          >
            Add
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
            Add New Topic:
          </label>
          <TextArea
            value={nameOfNewArea}
            onChange={(e) => setNameOfNewArea(e.target.value)}
            rows={4}
            placeholder="Enter the Name of New Topic"
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

      <Tabs
        defaultActiveKey="1"
        items={items}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default QA_f16;
