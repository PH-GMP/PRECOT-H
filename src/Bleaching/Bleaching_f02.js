/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Radio,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { GrDocumentStore } from "react-icons/gr";
import { IoCaretBackCircleSharp, IoCreate } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
const { Paragraph } = Typography;

function Bleaching_f02() {
  const formName = "House Keeping Cleaning Check List";
  const formatNo = "PRD01/F-02";
  const revisionNo = "03";
  const sopNo = "HRD01-D-55";
  const unit = "UNIT-H";
  const department = "Bleaching & AB Cotton Godown";

  const [newDate, setNewDate] = useState("");

  const [frequency, setFrequency] = useState("");

  const [floorcleaning, setFloorcleaning] = useState("");
  const [removalofunwantedmaterials, setRemovalofunwantedmaterials] =
    useState("");
  const [sidewallscorners, setSidewallscorners] = useState("");
  const [windows, setWindows] = useState("");
  const [drinkingWaterTank, setDrinkingWaterTank] = useState("");
  const [emergencyDoors, setEmergencyDoors] = useState("");
  const [fireExtinguishers, setFireExtinguishers] = useState("");
  const [firstAidBox, setFirstAidBox] = useState("");
  const [rapidDoors, setRapidDoors] = useState("");
  const [roofCleaning, setRoofCleaning] = useState("");
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
  const [mail_status, setMailStatus] = useState("");
  const [clean_id, setclean_id] = useState();
  const [disable, setDisable] = useState(false);
  const [remarkDisable, setRemarkDisable] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [displayPrintData, setDisplayPrintData] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cleanedBySign, setCleanedBySign] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const [printBtnStatus, setPrintBtnStatus] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const { state } = useLocation();
  const formattedDate = moment(newDate).format("DD/MM/YYYY");

  // Function to transform the value based on conditions
  const transformValue = (value) => {
    switch (value) {
      case "Y":
        return "√";
      case "N":
        return "×";
      case "NA":
        return "-";
      default:
        return value;
    }
  };
  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF02`,
        {
          id: clean_id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-02/Summary");
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
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF02`,
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
        navigate("/Precot/Bleaching/F-02/Summary");
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handlePrint = () => {
    window.print();
  };

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

  const handleDrinkingWaterChange = (e) => {
    setDrinkingWaterTank(e.target.value);
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

  const handleroofCleaningChange = (e) => {
    setRoofCleaning(e.target.value);
  };

  const [datesForMonth, setDatesForMonth] = useState([]);

  useEffect(() => {
    setDatesForMonth(state.monthSummary);
    fetchData();
    const dateParts = state.date.split("-");
    const month = dateParts[1];
    const year = dateParts[0];
    // const monthSummary = generateDatesForMonth(month, year);
    setMonth(month);
    setYear(year);

    setTimeout(() => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };
      axios
        .get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/getHouseKeepingMonthYearSummeryF02`,
          {
            headers,
            params: {
              month: month,
              year: year,
            },
          }
        )
        .then((res) => {
          res.data.forEach((item) => {});
          setPrintData(res.data);
        })
        .catch((err) => {});
    }, 1000);
  }, []);

  const handleBack = () => {
    if (role == "ROLE_HR") {
      navigate("/Precot/Bleaching/F-02/Summary");
    } else {
      navigate("/Precot/Bleaching/F-02/Summary");
    }
  };

  const fetchData = async () => {
    const { date, clean_id } = state || {};
    setNewDate(date);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/getDateHouseKeepingF02/`,
        {
          headers,
          params: {
            date: date,
          },
        }
      )
      .then((res) => {
        // console.log("post", res.data);
        if (res.data.length == 0) {
          // console.log(" Length", res.data.length);
          if (
            localStorage.getItem("role") == "ROLE_HR" &&
            res.data.length == 0
          ) {
            // setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setPrintBtnStatus(false);
          } else if (
            localStorage.getItem("role") == "ROLE_SUPERVISOR" &&
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
          setclean_id(res.data[0].clean_id);
          setNewDate(res.data[0].date);
          setFloorcleaning(res.data[0].floor_cleaninh);
          setRemovalofunwantedmaterials(res.data[0].removel_unwanted_meterials);
          setSidewallscorners(res.data[0].side_wall_corners);
          setWindows(res.data[0].windows);
          setDrinkingWaterTank(res.data[0].drink_water_tank);
          setEmergencyDoors(res.data[0].emergency_door);
          setFireExtinguishers(res.data[0].fire_extinguishers);
          setFirstAidBox(res.data[0].first_aid_box);
          setRapidDoors(res.data[0].rapid_doors);
          setRoofCleaning(res.data[0].roof_cleaning);
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

          if (isRole("ROLE_HR")) {
            if (
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "WAITING_FOR_APPROVAL") &&
              isStatus("hod_status", "")
            ) {
              setDisable(true);
            } else if (
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "SUPERVISOR_REJECTED") &&
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
            } else if (isStatus("supervisor_status", "SUPERVISOR_REJECTED")) {
              setSubmitBtnStatus(true);
              setDisable(false);
            }
          } else if (isRole("ROLE_SUPERVISOR")) {
            if (
              isStatus("hr_status", "HR_APPROVED") &&
              isStatus("supervisor_status", "WAITING_FOR_APPROVAL") &&
              isStatus("hod_status", "")
            ) {
              setSubmitBtnStatus(true);
              setRemarkDisable(true);
            } else if (
              isStatus("hr_status", "HR_APPROVED") &&
              (isStatus("supervisor_status", "SUPERVISOR_APPROVED") ||
                isStatus("supervisor_status", "SUPERVISOR_REJECTED")) &&
              (isStatus("hod_status", "HOD_REJECTED") ||
                isStatus("hod_status", "HOD_APPROVED"))
            ) {
              setRemarkDisable(true);
              setSubmitBtnStatus(false);
            } else if (
              isStatus("supervisor_status", "SUPERVISOR_REJECTED") &&
              isStatus("hr_status", "HR_APPROVED") &&
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
        // console.log("Error", err);
      });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    if (cleanedBySign == "null" || cleanedBySign == "") {
      message.warning("Cleaned By Name Required");
      setSubmitLoading(false);
      return;
    }

    const payload = {
      unit: unit,
      formName: formName,
      formatNo: formatNo,
      revisionNo: revisionNo,
      refSopNo: sopNo,
      frequency: frequency,
      date: newDate,
      month: month,
      year: year,
      department: department,
      floor_cleaninh: floorcleaning == "" ? "NA" : floorcleaning,
      removel_unwanted_meterials:
        removalofunwantedmaterials == "" ? "NA" : removalofunwantedmaterials,
      side_wall_corners: sidewallscorners == "" ? "NA" : sidewallscorners,
      windows: windows == "" ? "NA" : windows,
      drink_water_tank: drinkingWaterTank == "" ? "NA" : drinkingWaterTank,
      emergency_door: emergencyDoors == "" ? "NA" : emergencyDoors,

      fire_extinguishers: fireExtinguishers == "" ? "NA" : fireExtinguishers,
      first_aid_box: firstAidBox == "" ? "NA" : firstAidBox,
      rapid_doors: rapidDoors == "" ? "NA" : rapidDoors,
      roof_cleaning: roofCleaning == "" ? "NA" : roofCleaning,
      // roof_cleaning: "Cleaned",
      remarks: remark == "" ? "N/A" : remark,
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
      cleaned_by: cleanedBySign,
    };
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const response = await axios
      .post(
        `${API.prodUrl}/Precot/api/Bleaching/Service/SubmitHouseKeepingF02`,
        payload,
        { headers }
      )
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Submitted Successfully",
        });
      })
      .catch((err) => {
        // console.log("Erorr", err);
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      })
      .finally(() => {
        setSubmitLoading(false);
        setTimeout(() => {
          if (role == "ROLE_SUPERVISOR") {
            navigate("/Precot/Bleaching/F-02/Summary");
          } else {
            navigate("/Precot/Bleaching/F-02/Summary");
          }
        }, 1500);
      });
    // console.log("API Response:", payload);
    //    // console.log("Response", response.data);
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
              onChange={handleDrinkingWaterChange}
              value={drinkingWaterTank}
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
        if (record.key === "7") {
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
        if (record.key === "8") {
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
        if (record.key === "9") {
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
        if (record.key === "10") {
          return (
            <Radio.Group
              onChange={handleroofCleaningChange}
              value={roofCleaning}
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
      cleaningArea: "Drinking Water Tank ",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "6",
      srNo: "6",
      cleaningArea: "Emergency Doors ",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "7",
      srNo: "7",
      cleaningArea: "Fire Extinguishers",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "8",
      srNo: "8",
      cleaningArea: "First Aid Box ",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "9",
      srNo: "9",
      cleaningArea: "Rapid Doors ",
      frequency: "Twice in a week",
      [newDate]: <Input />,
    },
    {
      key: "10",
      srNo: "10",
      cleaningArea: "Roof Cleaning",
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
  const [printData, setPrintData] = useState([
    {
      remarks: "",
    },
  ]);

  // Function to transform the value based on conditions

  const fetchPrintData = (date) => {
    // console.log("machineDatadate", date);
    // console.log("print data machine", printData);
    const record = printData.find((record) => record.date == date);
    // console.log("finded Data", record);
    let result = {
      floor_cleaninh: "",
      roof_cleaning: "",
      removel_unwanted_meterials: "",
      side_wall_corners: "",
      windows: "",
      drink_water_tank: "",
      emergency_door: "",
      fire_extinguishers: "",
      first_aid_box: "",
      rapid_doors: "",
      remarks: "",
      supervisor_submit_by: "",
      hr_submit_by: "",
      hod_submit_by: "",
    };

    if (record) {
      result = {
        floor_cleaninh: transformValue(record.floor_cleaninh),
        roof_cleaning: transformValue(record.roof_cleaning),
        removel_unwanted_meterials: transformValue(
          record.removel_unwanted_meterials
        ),
        side_wall_corners: transformValue(record.side_wall_corners),
        windows: transformValue(record.windows),
        drink_water_tank: transformValue(record.drink_water_tank),
        emergency_door: transformValue(record.emergency_door),
        fire_extinguishers: transformValue(record.fire_extinguishers),
        first_aid_box: transformValue(record.first_aid_box),
        rapid_doors: transformValue(record.rapid_doors),
        remarks: record.remarks,
        supervisor_submit_by: record.supervisor_submit_by,
        hr_submit_by: record.hr_submit_by,
        hod_submit_by: record.hod_submit_by,
      };
    } else {
      result = {
        floor_cleaninh: "",
        roof_cleaning: "",
        removel_unwanted_meterials: "",
        side_wall_corners: "",
        windows: "",
        drink_water_tank: "",
        emergency_door: "",
        fire_extinguishers: "",
        first_aid_box: "",
        rapid_doors: "",
        remarks: "",
        supervisor_submit_by: "",
        hr_submit_by: "",
        hod_submit_by: "",
      };
    }

    // console.log("result", result);

    return result;
  };

  const getMonthName = (monthNumber) => {
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
    return months[monthNumber - 1]; // Adjust month index
  };
  const initialValues = {};
  const dateFormat = "DD-MM-YYYY";
  const handleDateChange = (date) => {
    // console.log("date in this format", date);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  return (
    <div>
      {contextHolder}

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
        </Drawer>
        <BleachingHeader
          unit={unit}
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
            role === "ROLE_HOD" ||
            role === "ROLE_SUPERVISOR" ||
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
              icon={<IoCaretBackCircleSharp color="#00308F" />}
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
                if (confirm("You Want to logged out")) {
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
          <Form.Item
            label="Date"
            style={{ marginBottom: 0, fontWeight: "bold" }}
          >
            <p style={{ margin: 0 }}>{formattedDate}</p>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, display: "flex" }}>
            <p style={{ fontWeight: "bold" }}>
              Date for the Month & Year: {getMonthName(month)} / {year}
            </p>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <p style={{ fontWeight: "bold" }}>Bleaching & AB Cotton Godown </p>
          </Form.Item>
        </Form>

        <Row gutter={[16, 16]}>
          <Col span={24}>
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
            disabled={disable}
          />
          <Input
            addonBefore="Cleaned by (Trained person) : "
            type="text"
            size="small"
            value={`${cleanedBySign}`}
            style={{ fontWeight: "bold" }}
            onChange={(e) => setCleanedBySign(e.target.value)}
            disabled={disable}
          />
          <Input
            addonBefore="Verified by (Production Supervisor): "
            type="text"
            size="small"
            value={`${supervisorSign}   ${formatDate(supervisorSubmitOn)}`}
            style={{ fontWeight: "bold" }}
            disabled="none"
          ></Input>
          <Input
            addonBefore="Verified by (HR): "
            type="text"
            size="small"
            value={`${hrSign}   ${formatDate(hrSubmitOn)}`}
            style={{ fontWeight: "bold" }}
            disabled="none"
          />
          <Input
            addonBefore="Reviewed by HOD (atleast once in a month) :  "
            // placeholder="Date"
            type="text"
            size="small"
            value={`${hodSign}   ${formatDate(hodSubmitOn)}`}
            style={{ fontWeight: "bold" }}
            // onChange={(e) => setReviewedbyHOD(e.target.value)}
            disabled="none"
          />
        </div>
      </div>
    </div>
  );
}

export default Bleaching_f02;
