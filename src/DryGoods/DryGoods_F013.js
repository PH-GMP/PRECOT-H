import PrecotSidebar from "../Components/PrecotSidebar.js";
import BleachingHeader from "../Components/BleachingHeader";
import {
  Button,
  Form,
  Input,
  message,
  Select,
  Tabs,
  Tooltip,
  Modal,
  Radio,
} from "antd";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock, FaTrash } from "react-icons/fa6";
import { BiLock } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import API from "../baseUrl.json";
import axios from "axios";
import TextArea from "antd/es/input/TextArea.js";

const DryGoods_F012 = () => {
  const roleauth = localStorage.getItem("role");
  const role = localStorage.getItem("role");
  const formatName = "Hand Sanitiasiton Report - Dry Goods";
  const formatNo = "PH-PRD04/F-013";
  const revisionNo = "01";
  const sopNo = "PH-HRD01-D-29";
  const unit = "Unit H";
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const [newDate, setNewDate] = useState("");
  const [shift, setShift] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [editResponse, seteditResponse] = useState(null);
  const initialized = useRef(false);
  const { confirm } = Modal;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [statusLoader, setStatusLoader] = useState(false);
  const [idNumbers, setIdNumbers] = useState([]); // To store fetched idNumber values

  const { state } = location;
  const { date, shiftvalue } = state || {};
  console.log("date", date);
  console.log("shift", shiftvalue);
  const [reviews, setReviews] = useState({
    operator_sign: "",
    operator_submitted_on: "",
    hod_sign: "",
    hod_submit_on: "",
    operator_status: "",
    supervisor_sign: "",
    supervisor_status: "",
    hod_status: "",
    supervisor_submit_on: "",
  });
  console.log("2345", reviews.supervisor_status);
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });

  const [handSanitizationIdState, setHandSanitizationIdState] = useState();
  const [details, setRows] = useState([
    {
      serialNumber: "",
      idNumber: "",
      hour1: "",
      hour2: "",
      hour3: "",
      hour4: "",
      hour5: "",
      hour6: "",
      hour7: "",
      hour8: "",
      remarks: "",
    },
  ]);

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

  const statusFunction = (responseData) => {
    console.log("432", responseData);
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      (responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "HOD_APPROVED")
    ) {
      console.log("Condition 2");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      console.log("Condition 2");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
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
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-013/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (editResponse?.hod_status == "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const [rejectModal, setRejectModal] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setRejectModal(false);
    setRejectRemarks("");
  };

  const handleBack = () => {
    navigate("/Precot/DryGoods/F-013/Summary");
  };
  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {},
    });
  };

  const mapApiResponseToRadioValue = (value) => {
    switch (value) {
      case "Yes":
        return "TICK";
      case "No":
        return "CROSS";
      case "NA":
      default:
        return "NA";
    }
  };

  const mapRadioValueToApiRequest = (value) => {
    switch (value) {
      case "TICK":
        return "Yes";
      case "CROSS":
        return "No";
      case "NA":
      default:
        return "NA";
    }
  };

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = reviews[key];
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
  }, [reviews]);

  useEffect(() => {
    if (!initialized.current) {
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
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/goods/getHandSanitationF013?date=${date}&shift=${shiftvalue}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.data && role !== "ROLE_SUPERVISOR") {
            message.warning("Operator Yet To Submit");
            setTimeout(() => {
              navigate("/Precot/DryGoods/F-013/Summary");
            }, 1000);
          }

          if (response.data) {
            const data = response.data;
            console.log("Responsed", data);
            setHandSanitizationIdState(response.data.handSanitizationId);
            const sanitizedData = response.data.sanitizationList.map(
              (item) => ({
                id: item.id,
                serialNumber: item.serialNumber,
                idNumber: item.idNumber,
                hour1: mapApiResponseToRadioValue(item.hour1),
                hour2: mapApiResponseToRadioValue(item.hour2),
                hour3: mapApiResponseToRadioValue(item.hour3),
                hour4: mapApiResponseToRadioValue(item.hour4),
                hour5: mapApiResponseToRadioValue(item.hour5),
                hour6: mapApiResponseToRadioValue(item.hour6),
                hour7: mapApiResponseToRadioValue(item.hour7),
                hour8: mapApiResponseToRadioValue(item.hour8),
                remarks: item.remarks,
              })
            );
            setRows(sanitizedData);
            setReviews((prevState) => ({
              ...prevState,
              operator_sign: data?.operator_sign,
              operator_submitted_on: data?.operator_submitted_on,
              hod_sign: data?.hod_sign,
              hod_submit_on: data?.hod_submit_on,
              operator_status: data?.operator_status,
              hod_status: data?.hod_status,
              supervisor_sign: data?.supervisor_sign,
              supervisor_submit_on: data?.supervisor_submit_on,
              supervisor_status: data?.supervisor_status,
            }));
            statusFunction(data);
          }
        } catch (error) {
          // message.error("No data Found");
        }
      };
      fetchData();
    }
  });

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [token]);

  const fetchIDNo = async () => {
    console.log("fetchIDNo valled");
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/fetchHandSanitationIdNumbers?department=4`,
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

        setIdNumbers(response.data); // Assuming response.data is an array
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchIDNo();
  }, []);

  const handleInputChange1 = (index, name, value) => {
    const newRows = [...details];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleRadioChange = (index, hourField, event) => {
    const newRows = [...details];
    newRows[index][hourField] = event.target.value;
    setRows(newRows);
  };

  const handleKeyDown = (e) => {
    if (
      ["e", "E", "+", "-"].includes(e.key) ||
      (e.target.value.length >= 3 && e.key !== "Backspace")
    ) {
      e.preventDefault();
    }
    if (e.target.value.length >= 2 && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  //   const handleEndDateChange = (e) => {
  //     const newEndDate = e.target.value;
  //     if (new Date(newEndDate) >= new Date(row.start_date)) {
  //       setRows((prevRows) => ({
  //         ...prevRows,
  //         end_date: newEndDate,
  //       }));
  //     }
  //   };

  const deleteRow = (rowIndex, id) => {
    if (rowIndex == 0) {
      message.warning("One Row Mandatory");
      return;
    }
    if (id && reviews.supervisor_status == "SUPERVISOR_SAVED") {
      return;
    }
    confirm({
      title: "Are you sure you want to delete this row?",
      onOk() {
        setRows(details.filter((_, index) => index !== rowIndex));
      },
      onCancel() {},
    });
  };

  const addRow = () => {
    setRows([
      ...details,
      {
        serialNumber: "",
        idNumber: "",
        hour1: "",
        hour2: "",
        hour3: "",
        hour4: "",
        hour5: "",
        hour6: "",
        hour7: "",
        hour8: "",
        remarks: "",
      },
    ]);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const rejectFlow = () => {
    setRejectModal(true);
  };

  const handleSave = () => {
    setSaveLoading(true);
    const payload = {
      handSanitizationId: handSanitizationIdState,
      unit: "Unit H",
      formatNo: "PH-PRD04/F-013",
      revisionNo: "01",
      sopNumber: "PH-HRD01-D-29",
      formatName: "Hand Sanitiasiton Report - Dry Goods",
      date: date,
      shift: shiftvalue,
      sanitizationList: details.map((row) => ({
        id: row.id,
        serialNumber: row.serialNumber,
        idNumber: row.idNumber,
        hour1: mapRadioValueToApiRequest(row.hour1),
        hour2: mapRadioValueToApiRequest(row.hour2),
        hour3: mapRadioValueToApiRequest(row.hour3),
        hour4: mapRadioValueToApiRequest(row.hour4),
        hour5: mapRadioValueToApiRequest(row.hour5),
        hour6: mapRadioValueToApiRequest(row.hour6),
        hour7: mapRadioValueToApiRequest(row.hour7),
        hour8: mapRadioValueToApiRequest(row.hour8),
        remarks: row.remarks || "NA",
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/goods/saveHandSanitationF013`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Hand Sanitiasiton Report details Save Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-013/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    setSubmitLoading(true);
    const payload = {
      handSanitizationId: handSanitizationIdState,
      unit: "Unit H",
      formatNo: "PH-PRD04/F-013",
      revisionNo: "01",
      sopNumber: "PH-HRD01-D-29",
      formatName: "Hand Sanitiasiton Report - Dry Goods",
      date: date,
      shift: shiftvalue,
      sanitizationList: details.map((row) => ({
        id: row.id,
        serialNumber: row.serialNumber,
        idNumber: row.idNumber,
        hour1: mapRadioValueToApiRequest(row.hour1),
        hour2: mapRadioValueToApiRequest(row.hour2),
        hour3: mapRadioValueToApiRequest(row.hour3),
        hour4: mapRadioValueToApiRequest(row.hour4),
        hour5: mapRadioValueToApiRequest(row.hour5),
        hour6: mapRadioValueToApiRequest(row.hour6),
        hour7: mapRadioValueToApiRequest(row.hour7),
        hour8: mapRadioValueToApiRequest(row.hour8),
        remarks: row.remarks || "NA",
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/goods/submitHandSanitationF013`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Hand Sanitiasiton Report details Submit Successfully");
        setSubmitLoading(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-013/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setLoadingApprove(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/goods/approveHandSanitationF013`,
        {
          id: handSanitizationIdState,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoadingApprove(false);

        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-013/Summary");
      })
      .catch((err) => {
        setLoadingApprove(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoadingApprove(false);
      });
  };

  const handleReject = async () => {
    setStatusLoader(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setStatusLoader(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/goods/approveHandSanitationF013`,
        {
          id: handSanitizationIdState,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setStatusLoader(false);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-013/Summary");
      })
      .catch((err) => {
        setStatusLoader(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
          editResponse?.hod_status == "WAITING_FOR_APPROVAL") ||
        editResponse?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Details</b>
        </p>
      ),
      children: (
        <div>
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
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  ID-NO
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  1 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  2 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  3 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  4 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  5 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  6 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  7 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  8 Hour
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Remarks
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {details.map((row, index) => (
                <tr key={index} style={{ padding: "1em 1em" }}>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Select
                      name="idNumber"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleInputChange1(index, "idNumber", e.target.value);
                        }
                      }}
                      value={row.idNumber}
                      disabled={disable}
                      onChange={(value) =>
                        handleInputChange1(index, "idNumber", value)
                      }
                      readOnly={status.fieldStatus}
                      style={{ width: "180px" }}
                      filterOption={false}
                      showSearch
                    >
                      {idNumbers.map(({ id, value }) => (
                        <Select.Option key={id} value={value}>
                          {value}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      padding: "1em 1em",
                    }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour1}
                      onChange={(e) => handleRadioChange(index, "hour1", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour2}
                      onChange={(e) => handleRadioChange(index, "hour2", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour3}
                      onChange={(e) => handleRadioChange(index, "hour3", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour4}
                      onChange={(e) => handleRadioChange(index, "hour4", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour5}
                      onChange={(e) => handleRadioChange(index, "hour5", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour6}
                      onChange={(e) => handleRadioChange(index, "hour6", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour7}
                      onChange={(e) => handleRadioChange(index, "hour7", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Radio.Group
                      //   style={{ display: "flex" }}
                      value={row.hour8}
                      onChange={(e) => handleRadioChange(index, "hour8", e)}
                      disabled={status.fieldStatus}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="remarks"
                      value={row.remarks}
                      // disabled={disable}
                      onChange={(e) =>
                        handleInputChange1(index, "remarks", e.target.value)
                      }
                      readOnly={status.fieldStatus}
                    />
                  </td>
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
                      icon={<FaTrash style={{ fontSize: "10px" }} />}
                      onClick={() => deleteRow(index, row.id)}
                      // disabled={!isEditable}
                      disabled={status.fieldStatus}
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
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
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
              display: status.fieldStatus ? "none" : "flex",
            }}
            disabled={status.fieldStatus}
            // disabled={!isEditable}
            onClick={addRow}
            icon={
              <AiOutlinePlus style={{ color: "#00308F", marginRight: "1px" }} />
            }
          >
            Add Row
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          <b> Reviews </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Verified by Prod. Supervisor Sign & Date</b>
              </td>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Reviewed by Head of the Department / Designee Sign & Date</b>
              </td>
            </tr>
            <tr style={{ height: "35px" }}>
              <td colSpan="2">
                <div style={{ textAlign: "center" }}>
                  {reviews.supervisor_sign}
                  <br />
                  {formatDateAndTime(reviews.supervisor_submit_on)}
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {eSign.supervisor_sign ? (
                    <img
                      src={eSign.supervisor_sign}
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
              </td>
              <td colSpan="2">
                <div style={{ textAlign: "center" }}>
                  {reviews.hod_sign}
                  <br />
                  {formatDateAndTime(reviews.hod_submit_on)}
                </div>
                <div style={{ marginLeft: "28px" }}>
                  {eSign.hod_sign ? (
                    <img
                      src={eSign.hod_sign}
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

          role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={loadingApprove}
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
              </Button>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={rejectFlow}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                  display: status.saveStatus ? "none" : "flex",
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
                  display: status.submitStatus ? "none" : "flex",
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
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
            icon={<BiLock color="#00308F" />}
            onClick={handleLogout}
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
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={380}
        showSearch
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleReject}
            loading={statusLoader}
          >
            Reject
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
      <Form
        layout="horizontal"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <Form.Item label="Date" style={{ marginBottom: 0, marginLeft: "1rem" }}>
          <p style={{ margin: 0 }}>{formatDate(date)}</p>
        </Form.Item>
        <Form.Item label="Shift" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{shiftvalue}</p>
        </Form.Item>
      </Form>
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

export default DryGoods_F012;
