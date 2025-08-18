/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Select, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { FaPrint } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BiLock, BiNavigation, BiEdit } from "react-icons/bi";
import API from "../baseUrl.json";

import { FaUserCircle } from "react-icons/fa";
import BleachingHeader from "../Components/BleachingHeader";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import { IoIosNavigate } from "react-icons/io";
import moment from "moment";

import { Modal, DatePicker, Form, Col, Drawer, Row, Menu, Avatar } from "antd";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import BleachingPrintHeader from "../Components/BleachingPrintHeader";
import BleachingTail from "../Components/BleachingTail";
import { GoArrowLeft } from "react-icons/go";
import { createGlobalStyle } from "styled-components";

const Bleaching_f02_Summary = () => {
  const [reason, setReason] = useState(false);
  const formatName = "House Keeping Cleaning Check List";
  const formName = "House Keeping Cleaning Check List";
  const formatNo = "PRD01/F-02";
  const revisionNo = "03";
  const sopNo = "HRD01-D-55";
  const unit = "Unit-H";
  const department = "Bleaching & AB Cotton Godown";
  const [selectedRow, setSelectedRow] = useState("");
  const [isModalVisible, setIsModalVisible] = useState();
  const [modalData, setmodalData] = useState();
  const [newDate, setNewDate] = useState("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [summary, setSummary] = useState([]);

  const [gotobtn, setGotobtn] = useState(true);
  const [open, setOpen] = useState(false);
  const notificationMessage = (messageType, errorMessage) => {
    messageApi.open({
      type: messageType,
      content: errorMessage,
    });
  };

  //   const GlobalStyle = createGlobalStyle`
  //   @media print {
  //     @page {
  //       size: landscape;
  //     }
  //   }
  // `;

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  }
`;

  const { Option } = Select;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setIsPrintModalOpen(false);
    setSelectMonth("");
    setSelectYear("");
  };

  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const formattedDate = moment(newDate).format("DD-MM-YYYY HH:mm");

  const transformValue = (value) => {
    switch (value) {
      case "Y":
        return "√";
      case "N":
        return "×";
      case "NA":
        return "NA";
      default:
        return value;
    }
  };

  const fetchPrintData = (date) => {
    // console.log("machineDatadate", date);
    // console.log("print data machine", printData);
    const record = printData.find((record) => record.date == date);
    // console.log("finded Data", record);
    let result = {
      floor_cleaninh: "",
      removel_unwanted_meterials: "",
      side_wall_corners: "",
      windows: "",
      drink_water_tank: "",
      emergency_door: "",
      fire_extinguishers: "",
      first_aid_box: "",
      rapid_doors: "",
      roof_cleaning: "",
      remarks: "",
      cleaned_by: "",
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
        cleaned_by: record.cleaned_by,
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
        cleaned_by: "",
        supervisor_submit_by: "",
        hr_submit_by: "",
        hod_submit_by: "",
      };
    }

    // console.log("result", result);

    return result;
  };

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/getHouseKeepingSummeryF02`,
        {
          headers,
        }
      )
      .then((res) => {
        // console.log("post", res.data);
        const a = res.data.map((x, i) => {
          return {
            formatName: x.formatName,
            formatNo: x.formatNo,
            formatDate: x.date,
            revisionNo: x.revisionNo,
            sopNumber: x.refSopNo,
            unit: x.unit,
            date: x.date,
            clean_id: x.clean_id,
            department: x.department,
            emergencyDoors: x.emergency_door,
            fireExtinguishers: x.fire_extinguishers,
            firstAidBox: x.first_aid_box,
            floorcleaning: x.floor_cleaning,
            month: x.month,
            removalofunwantedmaterials: x.removal_unwanted_materials,
            rapidDoors: x.rapid_doors,
            roofCleaning: x.roof_cleaning,
            sidewallscorners: x.side_wall_corners,
            windows: x.windows,
            year: x.year,
            remarks: x.remarks,
            supervisor_sign: x.supervisor_sign,
            supervisor_status: x.supervisor_status,
            hr_status: x.hr_status,
            hod_status: x.hod_status,
            hod_sign: x.hod_sign,
            hr_status: x.hr_status,
            reason: x.reason,
          };
        });
        // console.log("aaa", a);
        setSummary(a);
      })
      .catch((err) => {
        // console.log("Error", err);
        // notificationMessage("error", err.response.data.message);
      });
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of summary) {
        if (
          data.hod_status == "HOD_REJECTED" ||
          data.hr_status == "HR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

  const generateselectMonthDates = (month, year) => {
    const dates = [];

    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      if (day < 10) {
        day = "0" + day;
      }
      const date = `${year}-${month}-${day}`;
      // console.log("date", date);
      dates.push(date);
    }

    return dates;
  };

  const getMonthFrom_Date = (dateStr) => {
    const dateParts = dateStr.split("-");
    return dateParts[1];
  };

  const handleEdit = (record) => {
    const x = summary.filter((x, i) => {
      return record.clean_id == x.clean_id;
    });
    // console.log("X", x);
    const dateParts = record.date.split("-");
    const month = dateParts[1];
    const year = dateParts[0];
    const monthSummary = generateselectMonthDates(month, year);
    // console.log("month summary in edit", monthSummary);
    // console.log("clean_Id", x[0].clean_id);
    setmodalData(x);
    navigate("/Precot/Bleaching/F-02/Edit", {
      state: {
        date: record.date,

        clean_id: x[0].clean_id,
        monthSummary: monthSummary,
      },
    });
  };

  const handleDateChanges = (e) => {
    // console.log(" Date ", e.target.value);
    setNewDate(e.target.value);
    setGotobtn(false);
  };

  const handleGoToChange = () => {
    if (newDate == "") {
      // setError('Please select a date');
      message.warning("Please Select Date");
      return;
    }
    const dateParts = newDate.split("-");
    const month = dateParts[1];
    const year = dateParts[0];
    const monthSummary = generateselectMonthDates(month, year);
    // console.log("goto", monthSummary);
    navigate("/Precot/Bleaching/F-02", {
      state: {
        date: newDate,
        monthSummary: monthSummary,
      },
    });
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
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

  const baseColumns = [
    {
      title: "S. NO",
      dataIndex: "sNo",
      key: "sNo",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },

    {
      title: "HR Status",
      dataIndex: "hr_status",
      key: "hr_status",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "slb_id",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<BiEdit />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
  } else {
    columns = baseColumns;
  }

  const [printButtonLoading, setPrintButtonLoading] = useState("");
  const [printData, setPrintData] = useState([
    {
      supervisor_submit_by: "",
      hr_submit_by: "",
      hod_submit_by: "",
      remarks: "",
    },
  ]);
  const [selectMonthDates, setSelectMonthDates] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  const handlePrintSummary = () => {
    setPrintButtonLoading(true);

    // Validate if all fields are selected
    if (selectMonth === "" || selectMonth === null) {
      message.warning("Please Select Month!");
      setPrintButtonLoading(false);
      return;
    } else if (selectYear === "" || selectYear === null) {
      message.warning("Please Select Year!");
      setPrintButtonLoading(false);
      return;
    }

    const monthDates = generateselectMonthDates(selectMonth, selectYear);
    setSelectMonthDates(monthDates);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/getHouseKeepingMonthYearSummeryF02`,
        {
          headers,
          params: {
            month: selectMonth,
            year: selectYear,
          },
        }
      )
      .then((res) => {
        const data = res.data;

        if (data && data.length > 0) {
          setPrintData(data);

          // Delay before printing to ensure data is set
          setTimeout(() => {
            window.print();
          }, 1000);
        } else {
          message.error("No data found");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        message.error("Error fetching data. Please try again.");
      })
      .finally(() => {
        // Ensure loading state is cleared after success or error
        setPrintButtonLoading(false);
      });
  };

  const monthNames = [
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

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print" style={{ marginTop: "10px" }}>
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <BleachingPrintHeader
            formName={formName}
            formatNo={formatNo}
            revisionNo={revisionNo}
            refSopNo={sopNo}
            pageNo={"1 of 2"}
          />
          <br />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "1px" }}>
          <table style={{ borderCollapse: "collapse", width: "97%" }}>
            <tbody>
              <tr>
                <td className="data-border" rowSpan={2}>
                  S.No.
                </td>
                <td className="data-border" rowSpan={2}>
                  Cleaning Area
                </td>
                <td className="data-border" rowSpan={2}>
                  <p style={{ width: "2px", fontSize: "10px" }}>Frequency</p>
                </td>
                <td className="data-border" colSpan={15}>
                  Date for the Month & Year of : {monthNames[selectMonth - 1]}/
                  {selectYear}
                </td>
                <td className="data-border" colSpan={16}>
                  Department: Bleaching & AB Cotton Godown
                </td>
              </tr>
              <tr>
                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {rowIndex + 1}
                    </p>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="data-border">1</td>
                <td className="data-border">Floor cleaning- Dry</td>
                <td
                  className="data-border"
                  style={{ width: "2px" }}
                  rowSpan={4}
                >
                  <p
                    style={{ textAlign: "center", transform: "rotate(270deg)" }}
                  >
                    Once in a day
                  </p>
                </td>
                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).floor_cleaninh
                        ? fetchPrintData(record).floor_cleaninh
                        : "" || "NA"}
                      {/* {"hi"} */}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">2</td>
                <td className="data-border">Removal of Unwanted Materials</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).removel_unwanted_meterials
                        ? fetchPrintData(record).removel_unwanted_meterials
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">3</td>
                <td className="data-border">Side walls & corners</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).side_wall_corners
                        ? fetchPrintData(record).side_wall_corners
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">4</td>
                <td className="data-border">windows</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).windows
                        ? fetchPrintData(record).windows
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">5</td>
                <td className="data-border">Drinking water Tank</td>
                <td
                  className="data-border"
                  style={{ width: "2px" }}
                  rowSpan={6}
                >
                  <p style={{ transform: "rotate(270deg)" }}>Twice in a week</p>
                </td>
                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).drink_water_tank
                        ? fetchPrintData(record).drink_water_tank
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">6</td>
                <td className="data-border">Emergency Doors</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).emergency_door
                        ? fetchPrintData(record).emergency_door
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">7</td>
                <td className="data-border">Fire Extinguishers</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).fire_extinguishers
                        ? fetchPrintData(record).fire_extinguishers
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">8</td>
                <td className="data-border">First Aid Box</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).first_aid_box
                        ? fetchPrintData(record).first_aid_box
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">9</td>
                <td className="data-border">Rapid Doors</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).rapid_doors
                        ? fetchPrintData(record).rapid_doors
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="data-border">10</td>
                <td className="data-border">Roof Cleaning</td>

                {selectMonthDates.map((record, rowIndex) => (
                  <td key={rowIndex} className="data-border">
                    <p
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fetchPrintData(record).roof_cleaning
                        ? fetchPrintData(record).roof_cleaning
                        : "" || "NA"}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td>11</td>

                <td colSpan={11} style={{ paddingBottom: "10px" }}>
                  Cleaning carried By
                </td>
                <td colSpan={11} style={{ paddingBottom: "10px" }}>
                  cleaning Completed On
                </td>
                <td colSpan={10} style={{ paddingBottom: "10px" }}>
                  cleaning Verified By
                </td>
              </tr>

              <tr>
                {" "}
                <td colSpan="34" style={{ height: "20px" }}>
                  Remarks :
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ margin: "2px 0", marginTop: "10px" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <BleachingTail />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div style={{ marginBottom: "10px", marginTop: "40px" }}>
            <BleachingPrintHeader
              formName={formName}
              formatNo={formatNo}
              revisionNo={revisionNo}
              refSopNo={sopNo}
              pageNo={"2 of 2"}
            />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <table>
            <tr>
              <td className="data-border" colSpan={3}>
                Cleaned By(Trained Person):
              </td>

              {selectMonthDates.map((record, rowIndex) => (
                <td key={rowIndex} className="data-border">
                  <p
                    style={{
                      width: "5px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      height: "90px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "rotate(270deg)",
                    }}
                  >
                    {" "}
                    {fetchPrintData(record).cleaned_by
                      ? fetchPrintData(record).cleaned_by
                      : "" || "NA"}
                  </p>
                </td>
              ))}
            </tr>
            <tr>
              <td className="data-border" colSpan={3}>
                Verified By (Production Supervisor):
              </td>
              {selectMonthDates.map((record, rowIndex) => (
                <td key={rowIndex} className="data-border">
                  <p
                    style={{
                      width: "5px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      height: "90px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "rotate(270deg)",
                    }}
                  >
                    {fetchPrintData(record).supervisor_submit_by
                      ? fetchPrintData(record).supervisor_submit_by
                      : "NA"}
                  </p>
                </td>
              ))}
            </tr>
            <tr>
              <td className="data-border" colSpan={3}>
                Verified By (HR):
              </td>
              {selectMonthDates.map((record, rowIndex) => (
                <td key={rowIndex} className="data-border">
                  <p
                    style={{
                      width: "5px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      height: "90px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "rotate(270deg)",
                    }}
                  >
                    {fetchPrintData(record).hr_submit_by
                      ? fetchPrintData(record).hr_submit_by
                      : "NA"}
                  </p>
                </td>
              ))}
            </tr>
            <tr>
              <td className="data-border" colSpan={3}>
                Reviewed By HOD:
              </td>
              {selectMonthDates.map((record, rowIndex) => (
                <td key={rowIndex} className="data-border">
                  <p
                    style={{
                      width: "5px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      height: "90px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "rotate(270deg)",
                    }}
                  >
                    {fetchPrintData(record).hod_submit_by
                      ? fetchPrintData(record).hod_submit_by
                      : "NA"}
                  </p>
                </td>
              ))}
            </tr>

            <tr>
              {" "}
              <td colSpan="34">
                Note: Tick mark "√" indicates activity completed & Cross mark
                '"×" indicate not completed "NA" indicate no data.
              </td>
            </tr>
          </table>
        </div>
        <br />
        <br />
        <div style={{ margin: "2px 0", marginTop: "10px" }}>
          <BleachingTail />
        </div>
      </div>

      <Modal
        title="Print"
        open={isPrintModalOpen}
        onOk={() => setIsPrintModalOpen(false)}
        onCancel={() => handleCancel()}
        destroyOnClose={true}
        footer={[
          <Button
            loading={printButtonLoading}
            key="submit"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            type="primary"
            icon={<FaPrint color="#00308F" />}
            onClick={handlePrintSummary}
          >
            Print
          </Button>,
        ]}
      >
        {" "}
        <div>
          <label htmlFor="yearSelect">Select Year</label>
          <Select
            id="yearSelect"
            style={{
              width: "100%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            // value={selectYear}
            onChange={(value) => setSelectYear(value)}
            placeholder="Select Year"
          >
            {years.map((year) => (
              <Select.Option key={year.value} value={year.value}>
                {year.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="monthSelect">Select Month</label>
          <Select
            id="monthSelect"
            style={{
              width: "100%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            onChange={(value) => setSelectMonth(value)}
            placeholder="Select Month"
          >
            {months.map((month) => (
              <Option key={month.value} value={month.value}>
                {month.label}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
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
      {contextHolder}
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
          <Button
            key="submit"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            type="primary"
            icon={<FaPrint color="#00308F" />}
            onClick={() => setIsPrintModalOpen(true)}
          >
            Print
          </Button>,
          <Button
            key="back"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
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
              // eslint-disable-next-line no-unused-expressions
              confirm("You Want to logged out") == true
                ? navigate("/Precot")
                : null;
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
      <div
        style={{
          width: "100%",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Form.Item
          label="Date"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: 0,
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Input
              placeholder="Date"
              type="date"
              size="small"
              value={newDate}
              onChange={handleDateChanges}
              style={{ flex: 1 }}
              max={formattedToday}
            />
            <Button
              key="Create"
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
              shape="round"
              icon={<BiNavigation />}
              onClick={handleGoToChange}
            >
              Go To
            </Button>
          </div>
        </Form.Item>
      </div>
      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summary}
      />
    </div>
  );
};

export default Bleaching_f02_Summary;
