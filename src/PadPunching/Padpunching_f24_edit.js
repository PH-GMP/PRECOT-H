/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  message,
  Modal,
  Select,
  Form,
  Menu,
  Avatar,
  Drawer,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { GrDocumentStore } from "react-icons/gr";
import axios from "axios";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Tooltip } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { IoIosArrowBack } from "react-icons/io";
import {
  IoPrint,
  IoSave,
  IoLockClosedOutline,
  IoCreate,
} from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import gif from "../Assests/gif.gif";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import API from "../baseUrl.json";
import moment from "moment";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;

const Padpunching_f25_edit = (props) => {
  const roleauth = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [formatNo, setFormatNo] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [sopNo, setSopNo] = useState("");
  const [pageNo, setPageNo] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [date, setDate] = useState("");
  const [draftModalVisible, setDraftModalVisible] = useState(false);
  const [status, setStatus] = useState("DRAFT");
  const [validationSubmitted, setValidationSubmitted] = useState(false);
  const [isHodLoggedIn, setIsHodLoggedIn] = useState(false);
  const [isSupervisorIn, setIsSupervisorIn] = useState(false);
  const [supervisorStatus, setSupervisorStatus] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const [hod, setHod] = useState("");
  const [apiData, setApiData] = useState({});
  const [dataExists, setDataExists] = useState(false);
  const [handSanitizationId, sethandSanitizationId] = useState("");
  const [shiftnew, setShiftnew] = useState("");
  const [shiftList, setShiftList] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [isSupervisorLoggedIn, setIsSupervisorLoggedIn] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [supervisorSavedOn, setSupervisorSavedOn] = useState("");
  const [supervisorSavedBy, setSupervisorSavedBy] = useState("");
  const [supervisorSavedId, setSupervisorSavedId] = useState("");
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");
  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState("");
  const [supervisorSubmitId, setSupervisorSubmitId] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const [hodSavedOn, setHodSavedOn] = useState("");
  const [hodSavedBy, setHodSavedBy] = useState("");
  const [hodSavedId, setHodSavedId] = useState("");
  const [hodSubmitOn, setHodSubmitOn] = useState("");
  const [hodSubmitBy, setHodSubmitBy] = useState("");
  const [hodSubmitId, setHodSubmitId] = useState("");
  const [hodSign, setHodSign] = useState("");
  const [isHODLoggedIn, setIsHODLoggedIn] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const handleShiftChange = (value) => {
    setShiftnew(value);
  };

  const [availableShifts, setAvailableShifts] = useState([]);
  const [idNumbers, setIdNumbers] = useState(Array(1).fill(""));
  const [idNumbersOptions, setIdNumbersOptions] = useState([]); // To store fetched idNumber values
  const [NameOptions, setNameOptions] = useState([]); // To store fetched idNumber values

  const [remarks, setRemarks] = useState(Array(1).fill(""));
  const [names, setNames] = useState(Array(1).fill(""));
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([{}]);

  const navigate = useNavigate();
  const [hourSelections, setHourSelections] = useState(
    Array(rows.length).fill(Array(8).fill(""))
  );
  const location = useLocation();

  const { state } = location;
  const { shift, date41 } = state || {};
  console.log("edit page ", shift, date41);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow,API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow,API.prodUrl]);
  const canEdit = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        selectedRow.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow.hod_status === "WAITING_FOR_APPROVAL"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        (selectedRow.hod_status === "HOD_APPROVED" ||
          selectedRow.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow.hod_status === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };

  const isEditable = canEdit();

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleApprove = async () => {
    const token = localStorage.getItem("token");
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/punching/approveHandSanitationF24`,
        {
          id: handSanitizationId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-06/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    const token = localStorage.getItem("token");
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/punching/approveHandSanitationF24`,
        {
          id: handSanitizationId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-06/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  useEffect(() => {
    setShiftnew(state.shift);
    if (shift && date41) {
      fetchData(date41, shift);
    }
  }, []);

  let formattedSupervisorDate;
  if (supervisorSubmitOn) {
    formattedSupervisorDate =
      moment(supervisorSubmitOn).format("DD/MM/YYYY HH:mm");
  } else {
    formattedSupervisorDate = "";
  }
  let formattedHODDate;
  if (hodSubmitOn) {
    formattedHODDate = moment(hodSubmitOn).format("DD/MM/YYYY HH:mm");
  } else {
    formattedHODDate = "";
  }

  const fetchData = async (selectedDate, selectedShift) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    setLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/punching/getHandSanitationF24?date=${selectedDate}&shift=${selectedShift}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedRow(response.data);
      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Not Yet  Approved");
        setTimeout(() => {
          navigate("/Precot/Padpunching/F-06/Summary");
        }, 1500);
      }
      setemptyarraycheck(response.data.length);
      console.log("Hell", response.data);
      setSupervisorSign(response.data.supervisor_sign);
      setHodSign(response.data.hod_sign);
      setSupervisorSubmitOn(response.data.supervisor_submit_on);
      setSupervisorSubmitBy(response.data.supervisor_submit_by);
      setSupervisorSubmitId(response.data.supervisor_submit_id);
      setSupervisorSavedOn(response.data.supervisor_saved_on);
      setSupervisorSavedBy(response.data.supervisor_saved_by);
      setSupervisorSavedId(response.data.supervisor_saved_id);
      setHodSubmitOn(response.data.hod_submit_on);
      setHodSubmitBy(response.data.hod_submit_by);
      setHodSubmitId(response.data.hod_submit_id);
      setHodSavedOn(response.data.hod_saved_on);
      setHodSavedId(response.data.hod_saved_id);
      setHodSavedBy(response.data.hod_saved_by);

      const responseData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      if (
        responseData &&
        responseData.sanitizationList &&
        responseData.sanitizationList.length > 0
      ) {
        const { sanitizationList } = responseData;
        console.log("value sanization", sanitizationList);
        const newHourSelections = sanitizationList.map((item) => [
          item.hour1 === "Y" ? "yes" : "no",
          item.hour2 === "Y" ? "yes" : "no",
          item.hour3 === "Y" ? "yes" : "no",
          item.hour4 === "Y" ? "yes" : "no",
          item.hour5 === "Y" ? "yes" : "no",
          item.hour6 === "Y" ? "yes" : "no",
          item.hour7 === "Y" ? "yes" : "no",
          item.hour8 === "Y" ? "yes" : "no",
        ]);

        setApiData(responseData);
        setDataExists(true);
        // setNames(sanitizationList.map((item) => item.name));
        setIdNumbers(sanitizationList.map((item) => item.idNumber));
        setRemarks(sanitizationList.map((item) => item.remarks));
        setHourSelections(newHourSelections);
        setDate(responseData.date);
        setShiftnew(responseData.shift);
        sethandSanitizationId(responseData.handSanitizationId);
        console.log("shift:", responseData.shift);
        console.log("handSanitizationId:", responseData.handSanitizationId);
      } else {
        // No data found scenario
        setDataExists(false);
        setIdNumbers([""]);
        setRemarks([""]);
        setHourSelections([Array(8).fill("no")]); // Assuming default values when no data is found

        message.info("No data found for the selected date and shift.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsHODLoggedIn(role === "ROLE_HOD" || role === "ROLE_DESIGNEE");
    setIsSupervisorLoggedIn(role === "ROLE_SUPERVISOR");
  }, []);

  const handleCheckboxChange = (rowIndex, hourIndex, value) => {
    const updatedSelections = hourSelections.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((selection, hIndex) =>
          hIndex === hourIndex ? value : selection
        );
      }
      return row;
    });
    setHourSelections(updatedSelections);
  };
  const addRow = () => {
    setRows([...rows, {}]);
    setIdNumbers([...idNumbers, ""]);
    setHourSelections([...hourSelections, Array(8).fill("")]);
    setRemarks([...remarks, ""]);
    setSelectedRows([...selectedRows, false]);
    // setNames([...names, ""]);
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      setIsHodLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (props.data) {
      setFormatNo(props.data.formatNo || "");
      setRevisionNo(props.data.revisionNo || "");
      setSopNo(props.data.sopNo || "");
      setPageNo(props.data.pageNo || "");
      setDate(props.data.date || "");

      const initialHourSelections = props.data.sanitizationList.map((item) => {
        return [
          item.hour1 === "Y" ? "yes" : "no",
          item.hour2 === "Y" ? "yes" : "no",
          item.hour3 === "Y" ? "yes" : "no",
          item.hour4 === "Y" ? "yes" : "no",
          item.hour5 === "Y" ? "yes" : "no",
          item.hour6 === "Y" ? "yes" : "no",
          item.hour7 === "Y" ? "yes" : "no",
          item.hour8 === "Y" ? "yes" : "no",
        ];
      });

      const initialIdNumbers = props.data.sanitizationList.map(
        (item) => item.idNumber || ""
      );

      const initialRemarks = props.data.sanitizationList.map(
        (item) => item.remarks || ""
      );

      setHourSelections(initialHourSelections);

      setIdNumbers(initialIdNumbers);
      setRemarks(initialRemarks);

      setStatus(props.data.status || "DRAFT");
      setDataFetched(true);
    }
  }, [props.data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Shift details fetched:", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
          };
        });

        setShiftList(a);
      })
      .catch((err) => {
        console.log("Error fetching shifts:", err);
      });
  }, []);

  // const handleIdChange = (rowIndex, value) => {
  //   if (/^[-Z0-9-]*$/.test(value)) {
  //     const updatedIds = idNumbers.map((id, index) =>
  //       index === rowIndex ? value : id
  //     );
  //     setIdNumbers(updatedIds);
  //   }
  // };

  const handleIdChange = (rowIndex, value) => {
    {
      const updatedIds = idNumbers.map((id, index) =>
        index === rowIndex ? value : id
      );
      setIdNumbers(updatedIds);
    }
  };

  const fetchIDNo = async () => {
    console.log("fetchIDNo valled");
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/fetchHandSanitationIdNumbers?department=3`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );
      console.log("fetchIDNo valled312e12");

      if (response.data && Array.isArray(response.data)) {
        console.log("fetchIDNo valled213333333");

        setIdNumbersOptions(response.data); // Assuming response.data is an array
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchName = async () => {
    console.log("fetchIDNo valled");
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/fetchHandSanitationName`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );
      console.log("fetchIDNo valled312e12");

      if (response.data && Array.isArray(response.data)) {
        console.log("fetchIDNo valled213333333");

        setNameOptions(response.data); // Assuming response.data is an array
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchIDNo();
    fetchName();
  }, []);

  const handleNameChange = (rowIndex, value) => {
    const updatedNames = names.map((name, index) =>
      index === rowIndex ? value : name
    );
    setNames(updatedNames);
  };

  const handleRemarksChange = (rowIndex, value) => {
    const updatedRemarks = remarks.map((remark, index) =>
      index === rowIndex ? value : remark
    );
    setRemarks(updatedRemarks);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const getHourLabel = (hourIndex) => {
    const ordinals = ["th", "st", "nd", "rd"];
    const v = hourIndex + 1;
    const suffix =
      ordinals[((v % 100) - 20) % 10] || ordinals[v % 100] || ordinals[0];
    return `${v}${suffix} Hour`;
  };
  const handleBulkChange = (value) => {
    setHourSelections((prevHourSelections) =>
      prevHourSelections.map((row) => row.map(() => value))
    );
  };

  const deleteRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
    setIdNumbers(idNumbers.filter((_, index) => index !== rowIndex));
    setHourSelections(hourSelections.filter((_, index) => index !== rowIndex));
    setRemarks(remarks.filter((_, index) => index !== rowIndex));
    // setNames(names.filter((_, index) => index !== rowIndex));
  };

  const handleDelete = (rowIndex) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmed) {
      deleteRow(rowIndex);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log("Submit role ", role);

    if (role === "ROLE_SUPERVISOR") {
      setIsSupervisorIn(true);
      setSupervisorStatus("SUPERVISOR_APPROVED");
      setSupervisor(localStorage.getItem("username"));
      console.log("Production sign ", supervisor);
    }

    if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      setIsHodLoggedIn(true);
      setHodStatus("SUPERVISOR_APPROVED");
      setHod(localStorage.getItem("username"));
      console.log("HOD sign ", hod);

      setIsSupervisorIn(true);
      setSupervisorStatus("SUPERVISOR_APPROVED");
    }
  }, []);

  const items = [
    {
      key: "1",
      label: <p>Sanitisation Form</p>,
      children: (
        <div>
          <div style={{ marginBottom: "10px", marginLeft: "82%" }}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "8px",
              }}
              disabled={!isEditable}
              onClick={() => handleBulkChange("yes")}
              icon={
                <AiOutlineCheck
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Bulk Yes
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
              }}
              disabled={!isEditable}
              onClick={() => handleBulkChange("no")}
              icon={
                <AiOutlineClose
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Bulk No
            </Button>
          </div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "95%",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                  }}
                >
                  S.No
                </th>
                {/* <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Name
                </th> */}
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  ID-No
                </th>
                {[...Array(8)].map((_, hourIndex) => (
                  <th
                    key={hourIndex}
                    style={{
                      border: "1px solid black",
                      minWidth: "100px",
                      width: "100px",
                    }}
                  >
                    Hour {hourIndex + 1}
                  </th>
                ))}
                {/* <th style={{ border: '1px solid black', minWidth: '95px', width: '90px' }}>Remarks</th> */}
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                  }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {rows &&
                hourSelections.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td style={{ minWidth: "50px", width: "50px" }}>
                      <input
                        type="text"
                        style={{
                          width: "95%",
                          height: "20px",
                          border: "1px solid black",
                          textAlign: "center",
                          border: "none",
                          outline: "none",
                        }}
                        value={rowIndex + 1}
                        readOnly
                      />
                    </td>
                    {/* <td>
                      

                      <Select
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleNameChange(rowIndex, e.target.value);
                          }
                        }}
                        value={names[rowIndex]}
                        disabled={!isEditable}
                        onChange={(value) =>
                          handleNameChange(rowIndex, value, "name")
                        }
                        style={{ width: "180px" }}
                        filterOption={false}
                        showSearch
                      >
                        {NameOptions.map(({ id, value }) => (
                          <Select.Option key={id} value={value}>
                            {value}
                          </Select.Option>
                        ))}
                      </Select>
                    </td> */}
                    <td
                      style={{
                        border: "1px solid black",
                        minWidth: "100px",
                        width: "100px",
                      }}
                    >
                      {/* <input
                        type="text"
                        style={{
                          width: "95%",
                          height: "20px",
                          border: "1px solid black",
                          textAlign: "center",

                          border: "none",
                          outline: "none",
                        }}
                        value={idNumbers[rowIndex]}
                        onChange={(e) =>
                          handleIdChange(rowIndex, e.target.value)
                        }
                        disabled={!isEditable}
                      /> */}

                      <Select
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleIdChange(rowIndex, e.target.value);
                          }
                        }}
                        value={idNumbers[rowIndex]}
                        // value={row.idNumber}
                        disabled={!isEditable}
                        onChange={(value) => handleIdChange(rowIndex, value)}
                        style={{ width: "180px" }}
                        filterOption={false}
                        showSearch
                      >
                        {idNumbersOptions.map(({ id, value }) => (
                          <Select.Option key={id} value={value}>
                            {value}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    {[...Array(8)].map((_, hourIndex) => (
                      <td
                        key={hourIndex}
                        style={{
                          border: "1px solid black",
                          minWidth: "100px",
                          width: "100px",
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              hourSelections[rowIndex] &&
                              hourSelections[rowIndex][hourIndex] === "yes"
                            }
                            onChange={() =>
                              handleCheckboxChange(rowIndex, hourIndex, "yes")
                            }
                            style={{ marginRight: "5px" }}
                            disabled={!isEditable}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              hourSelections[rowIndex] &&
                              hourSelections[rowIndex][hourIndex] === "no"
                            }
                            onChange={() =>
                              handleCheckboxChange(rowIndex, hourIndex, "no")
                            }
                            style={{ marginRight: "5px" }}
                            disabled={!isEditable}
                          />
                          No
                        </label>
                      </td>
                    ))}
                    {/* <td style={{ border: '1px solid black', minWidth: '95px', width: '95px' }}>
                <input
                  type="text"
                  style={{
                    width: '95%',
                    height: '20px',
                    border: '1px solid black',
                    textAlign: 'center',
                    border:"none",
                    outline:"none"
                  }}
                  disabled={!isEditable}
                  value={remarks[rowIndex]}
                  onChange={(e) => handleRemarksChange(rowIndex, e.target.value)}
                />
              </td> */}
                    <td
                      style={{
                        border: "1px solid black",
                        minWidth: "50px",
                        width: "50px",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(rowIndex)}
                        style={{
                          padding: "2px 4px",
                          fontSize: "10px",
                          lineHeight: "12px",
                          height: "24px",
                          width: "auto",
                          minWidth: "auto",
                          backgroundColor: "#ff4d4f",
                          borderColor: "#ff4d4f",
                        }}
                        disabled={!isEditable}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <table
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                width: "95%",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    ಗಮನಿಸಿ: ALCONOX- ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಹ್ಯಾಂಡ್ ಸ್ಯಾನಿಟೈಜರ್ ಅನ್ನು
                    ಅನ್ವಯಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಗಳನ್ನು ಒಟ್ಟಿಗೆ ಉಜ್ಜಿಕೊಳ್ಳಿ, ಅಂಗೈಗಳು,
                    ಬೆರಳುಗಳು ಮತ್ತು ಉಗುರುಗಳು ಸೇರಿದಂತೆ ನಿಮ್ಮ ಕೈಗಳ ಎಲ್ಲಾ
                    ಬೆರಳುಗಳನ್ನು ಕನಿಷ್ಠ 20 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಜ್ಜಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "50%",
                marginLeft: "35px",
              }}
              disabled={!isEditable}
              onClick={addRow}
              icon={
                <AiOutlinePlus
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Add Row
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "70%",
              tableLayout: "fixed",
            }}
          >
            <tr>
              <td
                colSpan="4"
                style={{
                  height: "35px",
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <b>Verified by (Supervisor) Production Signature & Date</b>
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                <div style={{ marginRight: "20px" }}>
                  <b>Reviewed by Head of the Department / Designee</b>
                </div>
              </td>
            </tr>
            <tr>
              {apiData &&
                apiData?.supervisor_status === "SUPERVISOR_APPROVED" && (
                  <td
                    colSpan="4"
                    style={{
                      height: "80px",
                      textAlign: "center",
                      verticalAlign: "bottom",
                      borderRight: "1px solid black",
                    }}
                  >
                    {supervisorSign}
                    <br />
                    {formattedSupervisorDate}
                    <br />
                    {getImage && (
                      <img
                        src={getImage}
                        alt="Supervisor Sign"
                        style={{
                          width: "70px",
                          height: "50px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "space-evenly",
                        }}
                      />
                    )}
                    {/* Signature & Date */}
                  </td>
                )}

              {((apiData && apiData?.hod_status === "HOD_REJECTED") ||
                (apiData && apiData?.hod_status === "HOD_APPROVED")) && (
                <td
                  colSpan="4"
                  style={{
                    height: "80px",
                    textAlign: "center",
                    verticalAlign: "bottom",
                    borderRight: "1px solid black",
                  }}
                >
                  {hodSign}
                  <br />
                  {formattedHODDate}
                  <br />
                  {getImage1 && (
                    <img
                      src={getImage1}
                      alt="Hod Sign"
                      style={{
                        width: "70px",
                        height: "50px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "space-evenly",
                      }}
                    />
                  )}
                  {/* Signature & Date */}
                </td>
              )}
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const validateForm = () => {
    console.log("ID Numbers:", idNumbers);
    console.log("Hour Selections:", hourSelections);

    // if (!names || names.length === 0) {
    //   message.error("At least one name is required");
    //   return false;
    // }

    if (!idNumbers || idNumbers.length === 0) {
      message.error("At least one ID number is required");
      return false;
    }

    // for (let i = 0; i < names.length; i++) {
    //   if (!names[i]) {
    //     message.error(`Name is required for row ${i + 1}`);
    //     return false;
    //   }
    // }

    for (let i = 0; i < idNumbers.length; i++) {
      if (!idNumbers[i]) {
        message.error(`ID number is required for row ${i + 1}`);
        return false;
      }

      for (let j = 0; j < 8; j++) {
        console.log(
          `Hour selection for row ${i + 1}, ${getHourLabel(j)}:`,
          hourSelections[i][j]
        );
        if (hourSelections[i][j] !== "yes" && hourSelections[i][j] !== "no") {
          message.error(
            `Hour selection is required for row ${i + 1}, ${getHourLabel(j)}`
          );
          return false;
        }
      }
    }

    return true;
  };

  const handleSave = async () => {
    setSaveLoading(true);

    if (!validateForm()) {
      setSaveLoading(false);
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("No token found. Please log in again.");
      return;
    }

    const handSanitizationId = apiData ? apiData.handSanitizationId : null;
    const sanitizedRemarks = remarks.map((remark) =>
      remark.trim() !== "" ? remark : "N/A"
    );

    const payload = {
      unit: "Unit H",
      formatNo: "PH-PRD03/F-006",
      formatName: "API.prodUrlitisation Report",
      revisionNo: "02",
      sopNumber: "PH-HRD04-D-03",
      handSanitizationId: handSanitizationId,
      date: date,
      status: "DRAFT",
      approverStatus: "PENDING",
      shift: shift,

      sanitizationList: hourSelections.map((row, rowIndex) => ({
        serialNumber: rowIndex + 1,
        idNumber: idNumbers[rowIndex],
        // name: names[rowIndex],
        hour1: row[0] === "yes" ? "Y" : "N",
        hour2: row[1] === "yes" ? "Y" : "N",
        hour3: row[2] === "yes" ? "Y" : "N",
        hour4: row[3] === "yes" ? "Y" : "N",
        hour5: row[4] === "yes" ? "Y" : "N",
        hour6: row[5] === "yes" ? "Y" : "N",
        hour7: row[6] === "yes" ? "Y" : "N",
        hour8: row[7] === "yes" ? "Y" : "N",
        remarks: sanitizedRemarks[rowIndex],
      })),
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/punching/saveHandSanitationF24`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Form Saved Successfully");
      setShiftnew(Array(8).fill(""));
      setIdNumbers(Array(3).fill(""));
      setRemarks(Array(3).fill(""));
      setHourSelections(Array(8).fill(Array(8).fill("")));
      setDate(""); // Clear the date input
      navigate("/Precot/Padpunching/F-06/Summary");
      console.log(response.data);
      setSaveLoading(false);
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        message.error(error.response.data.message);
      }
      setSaveLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    if (!validateForm()) {
      setSaveLoading(false);
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("No token found. Please log in again.");
      return;
    }

    const handSanitizationId = apiData ? apiData.handSanitizationId : null;
    const sanitizedRemarks = remarks.map((remark) =>
      remark.trim() !== "" ? remark : "N/A"
    );

    const payload = {
      unit: "Unit H",
      formatNo: "PH-PRD03/F-006",
      formatName: "Hand Sanitisation Report",
      revisionNo: "02",
      sopNumber: "PH-HRD04-D-03",
      date: date,
      handSanitizationId: handSanitizationId,
      shift: shift,
      approverStatus: " ",
      sanitizationList: hourSelections.map((row, rowIndex) => {
        return {
          serialNumber: rowIndex + 1,
          idNumber: idNumbers[rowIndex],
          // name: names[rowIndex],
          hour1: row[0] === "yes" ? "Y" : "N",
          hour2: row[1] === "yes" ? "Y" : "N",
          hour3: row[2] === "yes" ? "Y" : "N",
          hour4: row[3] === "yes" ? "Y" : "N",
          hour5: row[4] === "yes" ? "Y" : "N",
          hour6: row[5] === "yes" ? "Y" : "N",
          hour7: row[6] === "yes" ? "Y" : "N",
          hour8: row[7] === "yes" ? "Y" : "N",
          remarks: sanitizedRemarks[rowIndex],
        };
      }),
    };
    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/punching/submitHandSanitationF24`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Form Submitted Successfully");

      setIdNumbers(Array(3).fill(""));
      setRemarks(Array(3).fill(""));
      setHourSelections(Array(8).fill(Array(8).fill("")));
      setDate("");
      setValidationSubmitted(true);
      navigate("/Precot/Padpunching/F-06/Summary");
      console.log(response.data);
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized. Please log in again.");
      } else {
        message.error(error.response.data.message);
      }
      setSubmitLoading(false);
    }
  };

  const handleDraft = () => {
    setDraftModalVisible(true);
  };

  const handleDraftCancel = () => {
    setDraftModalVisible(false);
  };

  const handleDraftOk = () => {
    handleSave();
    setDraftModalVisible(false);
  };

  const handleBack = () => {
    navigate("/Precot/Padpunching/F-06/Summary");
  };

  const formatName = "Hand  Sanitisation Report";

  const unit = "UNIT-H";
  const role = localStorage.getItem("role");

  const isHod = role === "ROLE_HOD" || role === "ROLE_DESIGNEE";

  const buttonsArray = [];

  buttonsArray.push(
    <Button
      key="back"
      type="primary"
      icon={<GoArrowLeft color="#00308F" />}
      onClick={handleBack}
      style={{
        backgroundColor: "#E5EEF9",
        color: "#00308F",
        fontWeight: "bold",
      }}
      shape="round"
    >
      Back
    </Button>,
    ...(role === "ROLE_HOD" ||
    role === "ROLE_QA" ||
    role === "ROLE_QC" ||
    role === "ROLE_DESIGNEE"
      ? [
          <Button
            key="approve"
            loading={saveLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButtons(),
            }}
            onClick={handleApprove}
            shape="round"
            icon={<img src={approveIcon} alt="Approve Icon" />}
          >
            &nbsp;Approve
          </Button>,
          <Button
            key="reject"
            loading={saveLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButtons(),
            }}
            icon={<img src={rejectIcon} alt="Reject Icon" />}
            onClick={handleRejectModal}
            shape="round"
          >
            &nbsp;Reject
          </Button>,
        ]
      : [
          <Button
            key="save"
            loading={saveLoading}
            type="primary"
            onClick={handleSave}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButton2(),
            }}
            shape="round"
            icon={<IoSave color="#00308F" />}
          >
            Save
          </Button>,
          <Button
            key="submit"
            loading={submitLoading}
            type="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayButtons(),
            }}
            icon={<GrDocumentStore color="#00308F" />}
            shape="round"
          >
            Submit
          </Button>,
        ]),
    <Button
      key="logout"
      type="primary"
      style={{
        backgroundColor: "#E5EEF9",
        color: "#00308F",
        fontWeight: "bold",
      }}
      shape="round"
      icon={<BiLock color="#00308F" />}
      onClick={() => {
        if (window.confirm("Are you sure want to logout")) {
          localStorage.removeItem("token");
          navigate("/Precot");
        }
      }}
    >
      Logout
    </Button>,
    <Tooltip
      key="user-info"
      trigger="click"
      style={{ backgroundColor: "#fff" }}
      title={
        <div>
          <h3>{localStorage.getItem("username")}</h3>
          <p>{localStorage.getItem("role")}</p>
        </div>
      }
    >
      <Button
        type="primary"
        style={{ backgroundColor: "#E5EEF9" }}
        shape="circle"
        icon={<FaUserCircle color="#00308F" size={20} />}
      />
    </Tooltip>,
    <PrecotSidebar
      open={open}
      onClose={onClose}
      role={localStorage.getItem("role")}
    />,
    <Modal
      key="reject-modal"
      title="Reject"
      open={showModal}
      onOk={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
      destroyOnClose={true}
      footer={[
        <Button
          key="submit-reject"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          onClick={handleReject}
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
        <label style={{ marginRight: "8px" }}>Remarks:</label>
        <TextArea
          value={rejectRemarks}
          onChange={(e) => setRejectRemarks(e.target.value)}
          rows={4}
          style={{ width: "100%" }}
        />
      </div>
    </Modal>
  );

  return (
    <>
      <div>
        {/* <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          open={open}
          width="fit-content"
          style={{
            padding: "1em",
          }}
        >
          <Row>
            <Col>
              <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
            </Col>

            <Col
              style={{
                marginLeft: "1em",
              }}
            >
              <p>{localStorage.getItem("username")}</p>
              <p
                style={{
                  fontSize: "x-small",
                }}
              >
                {localStorage.getItem("role")}
              </p>
            </Col>
          </Row>

          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            style={{
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "0",
              margin: "0",
            }}
            items={
              localStorage.getItem("role") == "ROLE_QA"
                ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Raw Material Isuue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "6",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
                : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
            }
          />
        </Drawer> */}
        <BleachingHeader
            unit="Unit-H"
            formName="Hand Sanitisation Report"
            formatNo="PH-HRD01-F-023"
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={buttonsArray}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <div style={{ flex: 1 }}>
            <Input
              addonBefore="Date"
              placeholder="12-Mar-23"
              size="small"
              type="date"
              value={date}
              style={{ width: "50%" }}
              onChange={(e) => setDate(e.target.value)}
              disabled={!isEditable}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Form.Item label="Shift" style={{ margin: 0 }}>
              <Select
                style={{ width: "50%" }}
                options={shiftList}
                onChange={handleShiftChange}
                value={shiftnew}
                disabled={!isEditable}
              />
            </Form.Item>
          </div>
        </div>

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <Modal
          title="Draft Modal"
          visible={draftModalVisible}
          onOk={handleDraftOk}
          onCancel={handleDraftCancel}
        >
          <p>Draft content...</p>
        </Modal>
      </div>
    </>
  );
};

export default Padpunching_f25_edit;