/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  Select,
  Form,
  message,
  Tooltip,
  Typography,
  Table,
  Radio,
  Menu,
  Avatar,
  Drawer,
  Modal,
} from "antd";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock } from "react-icons/bi";
import { IoMdPrint } from "react-icons/io";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import logo from "../Assests/logo.png";
import moment from "moment";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const { Paragraph } = Typography;

function Bleaching_f02A_edit(props) {
  const formatName = "House Keeping Clening Check List";
  const formatNo = "PRD01/F-02-A";
  const revisionNo = "03";
  const sopNo = "HRD01-D-55";
  const unit = "UNIT-H";
  const department = "Blow room & Carding, Waste Bale Press";

  const [newDate, setNewDate] = useState("");
  const [newData, setNewData] = useState();
  const [frequency, setFrequency] = useState("");
  const [floorcleaning, setFloorcleaning] = useState("");
  const [removalofunwantedmaterials, setRemovalofunwantedmaterials] =
    useState("");
  const [sidewallscorners, setSidewallscorners] = useState("");
  const [windows, setWindows] = useState("");
  const [emergencyDoors, setEmergencyDoors] = useState("");
  const [fireExtinguishers, setFireExtinguishers] = useState("");
  const [firstAidBox, setFirstAidBox] = useState("");
  const [rapidDoors, setRapidDoors] = useState("");
  const [remark, setRemark] = useState("");
  const [VerifiedbySupervisor, setVerifiedbySupervisor] = useState("");
  const [VerifiedbyHR, setVerifiedbyHR] = useState("");
  const [reviewedbyHOD, setReviewedbyHOD] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [supervisorSign, setSupervisorSign] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState("");
  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState("");
  const [supervisorSubmitId, setSupervisorSubmitId] = useState(0);
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");
  const [hodSign, setHodSign] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const [hodSubmitBy, setHodSubmitBy] = useState("");
  const [hodSubmitId, setHodSubmitId] = useState(0);
  const [hodSubmitOn, setHodSubmitOn] = useState("");
  const [hrSign, setHrSign] = useState("");
  const [hrStatus, setHrStatus] = useState("");
  const [hrSubmitBy, setHrSubmitBy] = useState("");
  const [hrSubmitId, setHrSubmitId] = useState(0);
  const [hrSubmitOn, setHrSubmitOn] = useState("");
  const [disable, setDisable] = useState(false);
  const [mail_status, setMailStatus] = useState("");
  const [clean_id, setclean_id] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [remarkDisable, setRemarkDisable] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cleanedBySign, setCleanedBySign] = useState("");

  // Based on the Frequency we need the validation...
  // const [floorcleaningstatus, setFloorcleaningstatus] = useState(false);
  // const [removalofunwantedmaterialsstatus,setRemovalofunwantedmaterialsstatus] = useState(false);
  // const [sidewallscornersstatus, setSidewallscornersstatus] = useState(false);
  // const [windowsstatus, setWindowsstatus] = useState(false);
  // const [emergencyDoorsstatus, setEmergencyDoorsstatus] = useState(false);
  // const [fireExtinguishersstatus, setFireExtinguishersstatus] = useState(false);
  // const [firstAidBoxstatus, setFirstAidBoxstatus] = useState(false);
  // const [rapidDoorsstatus, setRapidDoorsstatus] = useState(false);
  // const [remarkstatus, setRemarkstatus] = useState(false);
  // const [VerifiedbySupervisorstatus, setVerifiedbySupervisorstatus] =
  //   useState(false);
  // const [VerifiedbyHRstatus, setVerifiedbyHRstatus] = useState(false);
  // const [reviewedbyHODstatus, setReviewedbyHODstatus] = useState(false);

  // Button Validation for based on role....
  // const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const [printBtnStatus, setPrintBtnStatus] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const { Option } = Select;

  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const shiftOption = [
    { id: 1, value: "Once in a day" },
    { id: 2, value: "Twice in a week" },
    { id: 3, value: "Quarterly" },
  ];

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF02A`,
        {
          id: clean_id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-02A/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF02A`,
        {
          id: clean_id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-02A/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  // Get the current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  const currentYear = currentDate.getFullYear();
  // const formattedDate = `${currentDay.toString().padStart(2, "0")}/${currentMonth.toString().padStart(2, "0")}/${currentYear}`;

  const formattedDate = moment(newDate).format("DD/MM/YYYY");
  // const [isChecked, setIsChecked] = useState(false);

  const handlefloorcleaningChange = (e) => {
    // console.log("Floor Cleaning ", e.target.value);
    setFloorcleaning(e.target.value);
  };
  const handleremovalofunwantedmaterialsChange = (e) => {
    setRemovalofunwantedmaterials(e.target.value);
  };
  const handlesidewallscornersChange = (e) => {
    setSidewallscorners(e.target.value);
  };

  const handlewindowsChange = (e) => {
    setWindows(e.target.value);
  };

  const handleemergencyDoorsChange = (e) => {
    setEmergencyDoors(e.target.value);
  };
  const handlefireExtinguishersChange = (e) => {
    setFireExtinguishers(e.target.value);
  };
  const handlefirstAidBoxChange = (e) => {
    setFirstAidBox(e.target.value);
  };

  const handlerapidDoorsChange = (e) => {
    setRapidDoors(e.target.value);
  };

  useEffect(() => {
    // // console.log("props Data : ", props.data);
    const { date, shiftvalue, clean_id } = state || {};
    // console.log("first Id", clean_id);
    // console.log("Date", date);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .get(`${API.prodUrl}/Precot/api/Bleaching/Service/getDateHouseKeepingF02A`, {
        headers,
        params: {
          date: date,
        },
      })
      .then((res) => {
        // console.log("response", res.data);
        if (res.data.length == 0) {
          // console.log(" Length", res.data.length);
          if (
            localStorage.getItem("role") == "ROLE_SUPERVISOR" &&
            res.data.length == 0
          ) {
            // setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setPrintBtnStatus(false);
          } else if (
            localStorage.getItem("role") == "ROLE_HR" &&
            res.data.length == 0
          ) {
            setSubmitBtnStatus(false);
            setPrintBtnStatus(false);
          } else if (
            localStorage.getItem("role") == "ROLE_HOD" &&
            res.data.length == 0
          ) {
            setSubmitBtnStatus(false);
            setPrintBtnStatus(false);
          }
        } else if (res.data.length != 0) {
          // console.log("floor cleaning", res.data[0].floor_cleaninh);
          // // console.log(" Hod status",res.data.hod_status)
          // // console.log("Supervisor ",res.data.supervisor_status)
          setclean_id(res.data[0].clean_id);
          setNewDate(res.data[0].date);
          setFloorcleaning(res.data[0].floor_cleaninh);
          setRemovalofunwantedmaterials(res.data[0].removel_unwanted_meterials);
          setSidewallscorners(res.data[0].side_wall_corners);
          setWindows(res.data[0].windows);
          setEmergencyDoors(res.data[0].emergency_door);
          setFireExtinguishers(res.data[0].fire_extinguishers);
          setFirstAidBox(res.data[0].first_aid_box);
          setRapidDoors(res.data[0].rapid_doors);
          setMonth(res.data[0].month);
          setYear(res.data[0].year);
          setMailStatus(res.data[0].mail_status);
          setSupervisorStatus(res.data[0].supervisor_status);
          setSupervisorSubmitOn(res.data[0].supervisor_submit_on);
          setSupervisorSubmitBy(res.data[0].supervisor_submit_by);
          setSupervisorSubmitId(res.data[0].supervisor_submit_id);
          setSupervisorSign(res.data[0].supervisor_sign);
          setHodStatus(res.data[0].hod_status);
          setHodSubmitOn(res.data[0].hod_submit_on);
          setHodSubmitBy(res.data[0].hod_submit_by);
          setHodSubmitId(res.data[0].hod_submit_id);
          setHodSign(res.data[0].hod_sign);
          setHrSign(res.data[0].hr_sign);
          setHrStatus(res.data[0].hr_status);
          setHrSubmitBy(res.data[0].hr_submit_by);
          setHrSubmitId(res.data[0].hr_submit_id);
          setHrSubmitOn(res.data[0].hr_submit_on);
          setRemark(res.data[0].remarks);
          setCleanedBySign(res.data[0].cleaned_by);

          const data = res.data[0];

          const isRole = (roleCheck) => role === roleCheck;
          const isStatus = (key, value) => data[key] === value;

          // Initial state
          setSubmitBtnStatus(false);
          setPrintBtnStatus(false);
          setDisable(true);
          setRemarkDisable(false);

          if (isRole("ROLE_SUPERVISOR")) {
            if (
              isStatus("hr_status", "WAITING_FOR_APPROVAL") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
              isStatus("hod_status", "")
            ) {
              setDisable(true);
            } else if (
              isStatus("hr_status", "HR_REJECTED") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
              isStatus("hod_status", "")
            ) {
              setSubmitBtnStatus(true);
              setDisable(false);
            } else if (
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
              isStatus("hod_status", "HOD_REJECTED")
            ) {
              setSubmitBtnStatus(true);
              setDisable(false);
            } else if (
              isStatus("supervisor_status", "") &&
              isStatus("hr_status", "") &&
              isStatus("hod_status", "")
            ) {
              setSubmitBtnStatus(true);
              setDisable(false);
            } else if (isStatus("hr_status", "HR_REJECTED")) {
              setSubmitBtnStatus(true);
              setDisable(false);
            }
          } else if (isRole("ROLE_HR")) {
            if (
              isStatus("hr_status", "WAITING_FOR_APPROVAL") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
              isStatus("hod_status", "")
            ) {
              setSubmitBtnStatus(true);
              setRemarkDisable(true);
            } else if (
              isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
              (isStatus("hr_status", "HR_APPROVED") ||
                isStatus("hr_status", "HR_REJECTED")) &&
              (isStatus("hod_status", "HOD_REJECTED") ||
                isStatus("hod_status", "HOD_APPROVED"))
            ) {
              setRemarkDisable(true);
              setSubmitBtnStatus(false);
            } else if (
              isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
              isStatus("hr_status", "HR_REJECTED") &&
              isStatus("hod_status", "WAITING_FOR_APPROVAL")
            ) {
              setRemarkDisable(false);
            } else if (
              isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("hod_status", "WAITING_FOR_APPROVAL")
            ) {
              setRemarkDisable(true);
              setSubmitBtnStatus(false);
              // console.log("Condition check for HOD");
            }
          } else if (isRole("ROLE_HOD")) {
            if (
              isStatus("hod_status", "WAITING_FOR_APPROVAL") &&
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED")
            ) {
              setSubmitBtnStatus(true);
              setDisable(true);
              setRemarkDisable(true);
            } else if (
              isStatus("hod_status", "HOD_REJECTED") &&
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED")
            ) {
              setSubmitBtnStatus(false);
              setDisable(true);
              setRemarkDisable(true);
            } else if (
              isStatus("hod_status", "HOD_APPROVED") &&
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED")
            ) {
              setSubmitBtnStatus(false);
              setDisable(true);
              setRemarkDisable(true);
            } else if (
              isStatus("hod_status", "") &&
              isStatus("hr_status", "") &&
              isStatus("supervisor_status", "")
            ) {
              setRemarkDisable(true);
            }
          } else if (isRole("ROLE_DESIGNEE")) {
            if (
              isStatus("hod_status", "WAITING_FOR_APPROVAL") &&
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "SUPERVISOR_APPROVED")
            ) {
              setSubmitBtnStatus(true);
              setDisable(false);
              setRemarkDisable(true);
            } else if (
              isStatus("hod_status", "") &&
              isStatus("hr_status", "") &&
              isStatus("supervisor_status", "")
            ) {
              setRemarkDisable(true);
            }
          } else if (
            isStatus("hod_status", "HOD_APPROVED") &&
            isStatus("hr_status", "HR_APPROVED") &&
            isStatus("supervisor_status", "SUPERVISOR_APPROVED")
          ) {
            setPrintBtnStatus(true);
            setRemarkDisable(true);
          }
          // setNewData(res.data);
          // console.log("new Data", res.data);
        }
      })
      .catch((err) => {
        // console.log("error", err);
      });

    // // console.log("Props Data", props.data);
  }, [props]);

  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.toLocaleString("default", { year: "numeric" });
    setMonth(month);
    setYear(year);
  }, []);
  // console.log("Month", month);
  // console.log("Year", year);

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-02A/Summary");
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    
    if(cleanedBySign =="null" || cleanedBySign==""){
      message.warning("Cleaned By Name Required");
      setSubmitLoading(false);
      return;
    }
    const payload = {
      clean_id: clean_id,
      unit: unit,
      formatName: formatName,
      formatNo: formatNo,
      revisionNo: revisionNo,
      refSopNo: sopNo,
      frequency: frequency,
      date: newDate,
      month: month,
      year: year,
      department: department,
      //   floor_cleaninh: floorcleaning == "" ? "NA" : floorcleaning,
      //   removel_unwanted_meterials:
      //     removalofunwantedmaterials == "" ? "NA" : removalofunwantedmaterials,
      //   side_wall_corners: sidewallscorners == "" ? "NA" : sidewallscorners,
      //   windows: windows == "" ? "NA" : windows,
      //   emergency_door: emergencyDoors == "" ? "NA" : emergencyDoors,
      //   fire_extinguishers: fireExtinguishers == "" ? "NA" : fireExtinguishers,
      //   first_aid_box: firstAidBox == "" ? "NA" : firstAidBox,
      //   rapid_doors: rapidDoors == "" ? "NA" : rapidDoors,
      floor_cleaninh: floorcleaning,
      removel_unwanted_meterials: removalofunwantedmaterials,
      side_wall_corners: sidewallscorners,
      windows: windows,
      emergency_door: emergencyDoors,
      fire_extinguishers: fireExtinguishers,
      first_aid_box: firstAidBox,
      rapid_doors: rapidDoors,
      // roof_cleaning: "Cleaned",
      remarks: remark,
      supervisor_status: supervisorStatus,
      hod_status: hodStatus,
      mail_status: mail_status,
      supervisor_submit_on: supervisorSubmitOn,
      supervisor_submit_by: supervisorSubmitBy,
      supervisor_submit_id: supervisorSubmitId,
      supervisor_sign: supervisorSign,
      hod_submit_on: hodSubmitOn,
      hod_submit_by: hodSubmitBy,
      hod_submit_id: hodSubmitId,
      hod_sign: hodSign,
      hr_submit_on: hrSubmitOn,
      hr_submit_by: hrSubmitBy,
      hr_submit_id: hrSubmitId,
      hr_sign: hrSign,
      hr_status: hrStatus,
      cleaned_by:cleanedBySign
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios
        .post(
          `${API.prodUrl}/Precot/api/Bleaching/Service/SubmitHouseKeepingF02A`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          messageApi.open({
            type: "success",
            content: "Submitted Successfully",
          });
          navigate("/Precot/Bleaching/F-02A/Summary");
        })
        .catch((err) => {
          // console.log("Erorr", err);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
      // console.log("API Response:", payload);
      // console.log("Response", response.data);
    } catch (error) {
      console.error("Error:", error);
      //   alert("Failed to save data.");
    }
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      width: 10,
      align: "center",
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      title: "Cleaning Area",
      dataIndex: "cleaningArea",
      key: "cleaningArea",
      width: 60,
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      width: 30,
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      title: formattedDate,
      dataIndex: "actions",
      key: "actions",
      align: "center",
      // render: (text, record) => moment(record.date).format('YYYY-MM-DD')
      render: (text, record) => {
        if (record.key === "1") {
          return (
            <Radio.Group
              onChange={handlefloorcleaningChange}
              value={floorcleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
          // return <input type="checkbox" className="large-checkbox" checked={isChecked}
          // onChange={handleChange}/>;
        }
        if (record.key === "2") {
          return (
            <Radio.Group
              onChange={handleremovalofunwantedmaterialsChange}
              value={removalofunwantedmaterials}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
        }
        if (record.key === "3") {
          return (
            <Radio.Group
              onChange={handlesidewallscornersChange}
              value={sidewallscorners}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
        }
        if (record.key === "4") {
          return (
            <Radio.Group
              onChange={handlewindowsChange}
              value={windows}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
        }
        if (record.key === "5") {
          return (
            <Radio.Group
              onChange={handleemergencyDoorsChange}
              value={emergencyDoors}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
        }
        if (record.key === "6") {
          return (
            <Radio.Group
              onChange={handlefireExtinguishersChange}
              value={fireExtinguishers}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
        }
        if (record.key === "7") {
          return (
            <Radio.Group
              onChange={handlefirstAidBoxChange}
              value={firstAidBox}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
        }
        if (record.key === "8") {
          return (
            <Radio.Group
              onChange={handlerapidDoorsChange}
              value={rapidDoors}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group>
          );
        }
        // return <Input  />;
        else {
          return <span style={{ fontSize: "12px" }}>{text}</span>;
        }
      },
      width: 80,
    },
  ];

  const data = [
    {
      key: "1",
      srNo: "1",
      cleaningArea: "Floor cleaning - Dry",
      frequency: "Once in a day",
      [newDate]: <Input />,
    },
    {
      key: "2",
      srNo: "2",
      cleaningArea: "Removal of unwanted materials",
      frequency: "Once in a day",
      [newDate]: <Input />,
    },
    {
      key: "3",
      srNo: "3",
      cleaningArea: "Side walls & corners ",
      frequency: "Once in a day",
      [newDate]: <Input />,
    },
    {
      key: "4",
      srNo: "4",
      cleaningArea: "Windows ",
      frequency: "Once in a day",
      [newDate]: <Input />,
    },
    {
      key: "5",
      srNo: "5",
      cleaningArea: "Emergency Doors ",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "6",
      srNo: "6",
      cleaningArea: "Fire Extinguishers",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "7",
      srNo: "7",
      cleaningArea: "First Aid Box ",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "8",
      srNo: "8",
      cleaningArea: "Rapid Doors ",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    // {
    //   key: "9",
    //   srNo: "9",
    //   cleaningArea: "Roof cleaning ",
    //   frequency: "Quarterly",
    //   // [`day${currentDay}`]: <Input />,
    // },
    // {
    //   srNo:"Remark / Comment (in case of any abnormality observed) : "
    // },
    // {
    //   srNo:"Verified by (Production Supervisor): "
    // },
    // {
    //   srNo:"Verified by (HR):  "
    // }
  ];
  return (
    <div>
      <Drawer
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
            role === "ROLE_QA"
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
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
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
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
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
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
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
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
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
      </Drawer>
      <BleachingHeader
        unit={unit}
        formName={formatName}
        formatNo={formatNo}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_HOD" ||
          role === "ROLE_HR" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: submitBtnStatus ? "block" : "none",
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: submitBtnStatus ? "block" : "none",
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={handleRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              {/* <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: printBtnStatus ? "block" : "none",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={() => window.print()}
          >
            &nbsp;Print
          </Button>, 
          // <Button
          //   type="primary"
          //   style={{
          //     backgroundColor: "#E5EEF9",
          //     color: "#00308F",
          //     fontWeight: "bold",
          //     display: saveBtnStatus ? "block" : "none",
          //   }}
          //   onClick={handleSave}
          //   shape="round"
          //   icon={<IoSave color="#00308F" />}
          // >
          //   &nbsp;Save
          // </Button>,
          */}
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: submitBtnStatus ? "block" : "none",
                }}
                shape="round"
                onClick={handleSubmit}
                icon={<GrDocumentStore color="#00308F" />}
              >
                &nbsp;Submit
              </Button>
            </>
          ),
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            // icon={<IoCaretBackCircleSharp color="#00308F" />}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
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
      <Modal
        title="Reject"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
        showSearch
        footer={[
          <Button
            key="submit"
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
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>

      <Form
        layout="horizontal"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <Form.Item label="Date" style={{ marginBottom: 0, fontWeight: "bold" }}>
          <p style={{ margin: 0 }}>{formattedDate}</p>
          {/* <Input
            // addonBefore="Date"
            // placeholder="Date"
            type="date"
            size="small"
            value={newDate}
            // style={{ fontWeight: "bold" }}
            onChange={(e) => setNewDate(e.target.value)}
          /> */}
          {/* <Form.Item  style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{newDate}</p>
        </Form.Item> */}
        </Form.Item>
        <Form.Item style={{ marginBottom: 0, display: "flex" }}>
          <p style={{ fontWeight: "bold" }}>
            Date for the Month & Year of: {month} / {year}
          </p>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <p style={{ fontWeight: "bold" }}>
            Department: Blow room & Carding, Waste Bale Press{" "}
          </p>
        </Form.Item>
      </Form>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          {/* <Input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          size="small"
          value={newDate}
          style={{ fontWeight: "bold" }}
          onChange={(e) => setNewDate(e.target.value)}
        /> */}
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            rowClassName={(record) => {
              if (record.srNo === "2")
                return "row-with-bottom-border left-align";
              if (record.srNo === "1") return "left-align";
              if (record.key === "3") return "cleaned-by-row";
              return "";
            }}
          />
        </Col>
      </Row>
      <div>
        <Input
          addonBefore="Remark / Comment (in case of any abnormality observed) : "
          // placeholder="Date"
          type="text"
          size="small"
          value={remark}
          style={{ fontWeight: "bold" }}
          onChange={(e) => setRemark(e.target.value)}
          // disabled={remarkDisable}
          disabled={disable}
        />
          <Input
          addonBefore="Cleaned by (Trained person) : "
          // placeholder="Date"
          type="text"
          size="small"
          value={`${cleanedBySign}`}
          style={{ fontWeight: "bold" }}
          onChange={(e) => setCleanedBySign(e.target.value)}
          disabled={disable}
        />
        <Input
          addonBefore="Verified by (Production Supervisor): "
          // placeholder="Date"
          type="text"
          size="small"
          value={supervisorSign}
          style={{ fontWeight: "bold" }}
          onChange={(e) => setVerifiedbySupervisor(e.target.value)}
          disabled="none"
        />
        <Input
          addonBefore="Verified by (HR): "
          // placeholder="Date"
          type="text"
          size="small"
          value={hrSign}
          style={{ fontWeight: "bold" }}
          onChange={(e) => setVerifiedbyHR(e.target.value)}
          disabled="none"
        />
        <Input
          addonBefore="Reviewed by HOD (atleast once in a month) :  "
          // placeholder="Date"
          type="text"
          size="small"
          value={hodSign}
          style={{ fontWeight: "bold" }}
          onChange={(e) => setReviewedbyHOD(e.target.value)}
          disabled="none"
        />
      </div>
      {/* print started here */}
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          <table className="f18table" style={{ width: "100%", height: "50%" }}>
            <tbody>
              <tr>
                <th colSpan="10" rowSpan="4" style={{ textAlign: "center" }}>
                  UNIT H
                </th>

                <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                  House Keeping Clening Check List
                </th>
                <td colSpan="10">Format No:</td>
                <td colSpan="10">PRD01/F-02-A</td>
              </tr>
              <tr>
                <td colSpan="10">Revision No:</td>
                <td colSpan="10">03</td>
              </tr>
              <td colSpan="10">Ref. SOP No:</td>
              <td colSpan="10">HRD01-D-55</td>
              <tr>
                <td colSpan="10">Page NO:</td>
                <td colSpan="10">1 of 1</td>
              </tr>
              <tr>
                <td colSpan="5" rowSpan="2">
                  Sr.No
                </td>
                <td colSpan="15" rowSpan="2">
                  Cleaning Area
                </td>
                <td colSpan="8" rowSpan="2">
                  Frequency
                </td>
                <td colSpan="31">
                  Date for the Month & Year of: {month}/{year}{" "}
                </td>
                <td colSpan="31">
                  Department: Blow room & Carding, Waste Bale Press{" "}
                </td>
              </tr>
              <tr>
                <th colSpan="2">1</th>
                <th colSpan="2">2</th>
                <th colSpan="2">3</th>
                <th colSpan="2">4</th>
                <th colSpan="2">5</th>
                <th colSpan="2">6</th>
                <th colSpan="2">7</th>
                <th colSpan="2">8</th>
                <th colSpan="2">9</th>
                <th colSpan="2">10</th>
                <th colSpan="2">11</th>
                <th colSpan="2">12</th>
                <th colSpan="2">13</th>
                <th colSpan="2">14</th>
                <th colSpan="2">15</th>
                <th colSpan="2">16</th>
                <th colSpan="2">17</th>
                <th colSpan="2">18</th>
                <th colSpan="2">19</th>
                <th colSpan="2">20</th>
                <th colSpan="2">21</th>
                <th colSpan="2">22</th>
                <th colSpan="2">23</th>
                <th colSpan="2">24</th>
                <th colSpan="2">25</th>
                <th colSpan="2">26</th>
                <th colSpan="2">27</th>
                <th colSpan="2">28</th>
                <th colSpan="2">29</th>
                <th colSpan="2">30</th>
                <th colSpan="2">31</th>
              </tr>
              <tr>
                <td colSpan="5"> 1</td>
                <td colSpan="15"> Floor cleaning - Dry</td>
                <td
                  colSpan="8"
                  rowSpan="4"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  Once in a day
                </td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="5"> 2</td>
                <td colSpan="15"> Removal of unwanted materials</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="5"> 3</td>
                <td colSpan="15"> Side walls & corners </td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="5"> 4</td>
                <td colSpan="15"> Windows</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>

              <tr>
                <td colSpan="5"> 5</td>
                <td colSpan="15"> Emergency Doors</td>
                <td colSpan="8" rowSpan="4">
                  {" "}
                  Twice in a week
                </td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="5"> 6</td>
                <td colSpan="15"> Fire Extinguishers</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="5"> 7</td>
                <td colSpan="15"> First Aid Box </td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="5"> 8</td>
                <td colSpan="15"> Rapid Doors</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
              </tr>
              <tr style={{ height: "60px" }}>
                <td colSpan="5">9 </td>
                <td colSpan="15">Roof cleaning</td>
                <td colSpan="8">Quarterly </td>
                <td
                  colSpan="20"
                  style={{ verticalAlign: "top", textAlign: "center" }}
                >
                  Cleaning carried by{" "}
                </td>
                <td
                  colSpan="20"
                  style={{ verticalAlign: "top", textAlign: "center" }}
                >
                  Cleaning completed On{" "}
                </td>
                <td
                  colSpan="22"
                  style={{ verticalAlign: "top", textAlign: "center" }}
                >
                  Cleaning verified by{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="90">
                  Remark / Comment (in case of any abnormality observed) :
                </td>
              </tr>
              <tr>
                <td colSpan="28">Verified by (Production Supervisor)</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td> <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td> <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td> <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="28">Verified by (HR)</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td> <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td> <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td> <td colSpan="2"></td>
              </tr>

              <tr>
                <td colspan="90" style={{ height: "10px" }}></td>
              </tr>
              <tr>
                <td colSpan="23">Particulars</td>
                <td colSpan="23">Prepard by</td>
                <td colSpan="22">Reviewed by</td>
                <td colSpan="22">Approved by</td>
              </tr>

              <tr>
                <td colSpan="23">Name</td>
                <td colSpan="23"></td>
                <td colSpan="22"></td>
                <td colSpan="22"></td>
              </tr>
              <tr>
                <td colSpan="23">Signature & Date</td>
                <td colSpan="23"></td>
                <td colSpan="22"></td>
                <td colSpan="22"></td>
              </tr>
            </tbody>
          </table>
        </main>
        <footer className="no-print" />
      </div>
      {/* print ended here */}
    </div>
  );
}

export default Bleaching_f02A_edit;
