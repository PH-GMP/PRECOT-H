import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Tabs, Button, Select, Input, Tooltip, message, Modal } from "antd";
import { FaLock, FaTrash } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import moment from "moment";

const QualityControlF021 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate } = location.state || {};
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const token = localStorage.getItem("token");
  const { confirm } = Modal;
  const roleauth = localStorage.getItem("role");
  const [mainId, setMainId] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);

  // extract month year from date
  useEffect(() => {
    console.log("uniqueDate", selectedDate);
    if (selectedDate) {
      const dateObj = new Date(selectedDate); // Convert string to Date object

      // Extract the year and month
      const year = dateObj.getFullYear();
      const monthNumber = dateObj.getMonth(); // getMonth() returns 0-11 (Jan-Dec)

      // Array of month names
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

      // Update the formValues state directly with the month and year
      setMonth(monthNames[monthNumber]);
      setYear(year);
    }
  }, [selectedDate]);

  const [inputFieldsData, setInputFieldsData] = useState([
    {
      id: "",
      testedIncubationStart: selectedDate,
      mediaName: "",
      manufacturedDate: "",
      lotNo: "",
      // expiryDate: "",
      expiryYear: "",
      expiryMonth: "",
      culture: "",
      testCompletionDate: "",
      testedBy: "",
      approvedBy: "",
      remarks: "",
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...inputFieldsData];
    updatedData[index][field] = value;
    setInputFieldsData(updatedData);
  };

  const addRow = () => {
    setInputFieldsData([
      ...inputFieldsData,
      {
        testedIncubationStart: selectedDate,
        mediaName: "",
        manufacturedDate: "",
        lotNo: "",
        // expiryDate: "",
        expiryYear: "",
        expiryMonth: "",
        culture: "",
        testCompletionDate: "",
        testedBy: "",
        approvedBy: "",
        remarks: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    if (inputFieldsData.length === 1) {
      alert("At least one row is required.");
      return;
    }
    confirm({
      title: "Are you sure you want to delete this row?",
      content: "This action cannot be undone.",
      onOk() {
        const updatedRows = inputFieldsData.filter((row, i) => i !== index); // Filter out the row at the specified index
        setInputFieldsData(updatedRows); // Update the rows state
      },
      onCancel() {
        console.log("User canceled deletion.");
      },
    });
  };

  // get api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${   API.prodUrl}/Precot/api/qc/MediaGrowthF021Report/GetByIncubationStartOn?incubationStartOn=${selectedDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          }
        );

        if (response.data && response.data.length > 0) {
          setMainId(response.data[0].id);
          setSelectedRow(response.data[0]);

          const username = response.data[0]?.microbiologist_submit_by;
          console.log("username", username);
          //getImage
          axios
            .get(
              `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              // console.log("Response:", res.data);
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
              // console.log("Error in fetching image:", err);
            });

          const username2 = response.data[0]?.manager_submit_by;
          console.log("username", username2);
          //getImage

          axios
            .get(
              `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                responseType: "arraybuffer",
              }
            )
            .then((res) => {
              // console.log("Response:", res.data);
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const url = `data:image/jpeg;base64,${base64}`;
              setGetImage2(url);
            })
            .catch((err) => {
              // console.log("Error in fetching image:", err);
            });

          if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
            if (
              (response.data[0]?.microbiologist_status ===
                "MICROBIOLOGIST_APPROVED" &&
                response.data[0]?.manager_status === "QC_REJECTED") ||
              (response.data[0]?.microbiologist_status ===
                "MICROBIOLOGIST_APPROVED" &&
                response.data[0]?.manager_status === "QA_REJECTED")
            ) {
              message.warning("Microbiologist Not Yet Approved");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-021/Summary");
              }, 1500);
            }
          }

          const details = response.data[0].details; // Assuming you're interested in the first object
          const formattedData = details.map((item) => {
            const [month, year] = item.expiryDate
              ? item.expiryDate.split(" ")
              : ["", ""];

            return {
              id: item.id || "",
              testedIncubationStart: item.testedIncubationStart || selectedDate,
              mediaName: item.mediaName,
              manufacturedDate: item.manufacturedDate,
              lotNo: item.lotNo,
              expiryMonth: month,
              expiryYear: year,
              culture: item.nameOfCulture,
              testCompletionDate: item.testCompletionDate,
              testedBy: item.testedBy || "",
              approvedBy: item.approvedBy || "",
              remarks: item.remarks,
            };
          });

          setInputFieldsData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      fetchData();
    }
  }, [selectedDate]);

  const handleSave = async () => {
    console.log("uniqueDate", selectedDate, month, year);
    setSaveLoading(true);
    const payload = {
      id: "" || mainId,
      formatNo: "PH-QCL01/F-021",
      revisionNo: "02",
      formatName: "Media Growth Promotion Test Report",
      refSopNo: "PH-QCL01-D-07",
      sno: 1,
      month: month,
      year: year,
      incubationStartOn: selectedDate,
      details: inputFieldsData.map((item) => ({
        id: item.id || "",
        mediaName: item.mediaName,
        manufacturedDate: item.manufacturedDate,
        lotNo: item.lotNo,
        expiryDate: `${item.expiryMonth} ${item.expiryYear}`,
        nameOfCulture: item.culture,
        testCompletionDate: item.testCompletionDate,
        remarks: item.remarks,
      })),
    };
    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SaveMediaGrowthF010Report`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Media Growth Promotion Test Report saved successfully!");
      console.log("Save successful:", response.data);
      setSaveLoading(false);

      navigate("/Precot/QualityControl/F-021/Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("Error saving data:", error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  const handleSubmit = async () => {
    console.log("uniqueDate", selectedDate, month, year);
    setSubmitLoading(true);

    // Check if inputFieldsData is empty or all fields in each entry are empty
    const isAllFieldsEmpty = inputFieldsData.every(
      (item) =>
        !item.mediaName &&
        !item.manufacturedDate &&
        !item.lotNo &&
        // !item.expiryDate &&
        !item.expiryYear &&
        !item.expiryMonth &&
        !item.culture &&
        !item.testCompletionDate
    );

    if (isAllFieldsEmpty) {
      message.error("No fields are entered.");
      setSubmitLoading(false);
      return; // Stop further execution
    }

    // Validation for mandatory fields
    let isValid = true; // Flag to track validation
    const errors = []; // Array to collect error messages

    inputFieldsData.forEach((item, index) => {
      if (!item.mediaName) {
        isValid = false;
        errors.push(`Media Name is required for entry`);
      }
      if (!item.manufacturedDate) {
        isValid = false;
        errors.push(`Manufactured Date is required for entry`);
      }
      if (!item.lotNo) {
        isValid = false;
        errors.push(`Lot Number is required for entry`);
      }
      if (!item.expiryMonth) {
        isValid = false;
        errors.push(`Expiry Month is required for entry`);
      }
      if (!item.expiryYear) {
        isValid = false;
        errors.push(`Expiry Year is required for entry`);
      }
      if (!item.culture) {
        isValid = false;
        errors.push(`Name of Culture is required for entry`);
      }
      if (!item.testCompletionDate) {
        isValid = false;
        errors.push(`Test Completion Date is required for entry`);
      }
    });

    // If validation fails, show error messages and stop submission
    if (!isValid) {
      errors.forEach((error) => message.error(error));
      setSubmitLoading(false);
      return; // Stop further execution
    }

    const payload = {
      id: "" || mainId,
      formatNo: "PH-QCL01/F-021",
      revisionNo: "02",
      formatName: "Media Growth Promotion Test Report",
      refSopNo: "PH-QCL01-D-07",
      sno: 1,
      month: month,
      year: year,
      incubationStartOn: selectedDate,
      details: inputFieldsData.map((item) => ({
        id: item.id || "",
        mediaName: item.mediaName,
        manufacturedDate: item.manufacturedDate,
        lotNo: item.lotNo,
        expiryDate: `${item.expiryMonth} ${item.expiryYear}`,
        nameOfCulture: item.culture,
        testCompletionDate: item.testCompletionDate,
        remarks: item.remarks || "NA",
      })),
    };
    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SubmitMediaGrowthF010Report`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(
        "Media Growth Promotion Test Report submitted successfully!"
      );
      console.log("Submit successful:", response.data);
      setSubmitLoading(false);
      navigate("/Precot/QualityControl/F-021/Summary");
    } catch (error) {
      setSubmitLoading(false);
      console.error("Error saving data:", error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios
      .put(
        `${   API.prodUrl}/Precot/api/qc/ApproveMediaGrowthF021Report`,
        {
          id: mainId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("res in approve", res);
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-021/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleReject = async () => {
    setSubmitLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${   API.prodUrl}/Precot/api/qc/ApproveMediaGrowthF021Report`,
        {
          id: mainId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage reject", res.data.message);
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-021/Summary");
      })
      .catch((err) => {
        // console.log("Err in reject", err.response.data.message);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const canEdit = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      return !(
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "QC_APPROVED") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.manager_status === "QA_APPROVED")
      );
    } else if (
      roleauth === "QC_MANAGER" ||
      roleauth === "QA_MANAGER" ||
      roleauth === "MICRO_DESIGNEE"
    ) {
      return !(
        (selectedRow &&
          selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          (selectedRow.manager_status === "WAITING_FOR_APPROVAL" ||
            selectedRow.manager_status === "QC_REJECTED" ||
            selectedRow.manager_status === "QC_APPROVED" ||
            selectedRow.manager_status === "QA_REJECTED" ||
            selectedRow.manager_status === "QA_APPROVED")) ||
        selectedRow.microbiologist_status === "MICROBIOLOGIST_SAVED"
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED")
      ) {
        return "none";
      } else if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED")
      ) {
        return "block";
      }
    } else if (roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER") {
      if (
        selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
        selectedRow?.manager_status === "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QC_APPROVED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_REJECTED") ||
        (selectedRow?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow?.manager_status === "QA_APPROVED") ||
        selectedRow.microbiologist_status === "MICROBIOLOGIST_SAVED"
      ) {
        return "none";
      }
    }
  };

  let formattedMicroDate;
  if (selectedRow.microbiologist_submit_on) {
    formattedMicroDate = moment(selectedRow.microbiologist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedManagerDate;
  if (selectedRow.manager_submit_on) {
    formattedManagerDate = moment(selectedRow.manager_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedManagerDate = ""; // Or any other default value or error handling
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleBack = () => {
    navigate("/precot/QualityControl/F-021/Summary");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear + i);
  }


  // Generate month options
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

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Media Growth Promotion Test Report</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                width: "90%", // ensures the table takes up the full width of its container
                marginLeft: "20px", // adjust this if necessary for your layout
                marginTop: "30px",
              }}
            >
              <thead>
                <tr style={{ border: "1px solid black" }}>
                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    S.No
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Tested /Incubation Start on
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Media Name
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Manufactured Date
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Lot. No.
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Expiry Date
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Name of the Culture
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Test Completion Date
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    Remarks
                  </th>
                  <th
                    style={{
                      border: "1px solid black",

                      padding: "5px",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {inputFieldsData.map((row, index) => (
                  <tr key={index}>
                    <td
                      className="sno"
                      style={{ padding: "5px", textAlign: "center" }}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="testedIncubationStart"
                      style={{ textAlign: "center", padding: "5px" }}
                    >
                      {formatDate(row.testedIncubationStart)}
                    </td>
                    <td className="mediaName" style={{ padding: "5px" }}>
                      <Select
                        value={row.mediaName}
                        disabled={!isEditable}
                        style={{ width: "100px" }}
                        onChange={(value) =>
                          handleInputChange(index, "mediaName", value)
                        }
                      >
                        <Select.Option value="SCDA">SCDA</Select.Option>
                        <Select.Option value="SDA">SDA</Select.Option>
                        <Select.Option value="VRBA">VRBA</Select.Option>
                        <Select.Option value="Mac.Con.">Mac.Con.</Select.Option>
                        <Select.Option value="Citri.">Citri.</Select.Option>
                        <Select.Option value="VJ">VJ</Select.Option>
                        <Select.Option value="BGA">BGA</Select.Option>
                      </Select>
                    </td>
                    <td className="manufacturedDate" style={{ padding: "5px" }}>
                      <Input
                        type="date"
                        value={row.manufacturedDate}
                        disabled={!isEditable}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "manufacturedDate",
                            e.target.value
                          )
                        }
                        max={row.testedIncubationStart}
                      />
                    </td>
                    <td className="lotNo" style={{ padding: "5px" }}>
                      <Input
                        type="text"
                        disabled={!isEditable}
                        value={row.lotNo}
                        onChange={(e) =>
                          handleInputChange(index, "lotNo", e.target.value)
                        }
                        style={{ width: "70px" }}
                      />
                    </td>
                    <td className="expiryDate" style={{ padding: "5px" }}>
                      {/* <Input
                        type="date"
                        value={row.expiryDate}
                        disabled={!isEditable}
                        onChange={(e) =>
                          handleInputChange(index, "expiryDate", e.target.value)
                        }
                      /> */}
                      <Select
                        style={{
                          width: "135px",
                          height: "28px",
                          color: "black",
                          marginLeft: "",
                        }}
                        disabled={!isEditable}
                        value={row.expiryMonth}
                        placeholder="Select Month"
                        onChange={(value) =>
                          handleInputChange(index, "expiryMonth", value)
                        }
                      >
                        {months.map((month, index) => (
                          <Select.Option key={index} value={month}>
                            {month}
                          </Select.Option>
                        ))}
                      </Select>
                      <Select
                        style={{
                          width: "135px",
                          height: "28px",
                          color: "black",
                        }}
                        disabled={!isEditable}
                        value={row.expiryYear}
                        onChange={(value) =>
                          handleInputChange(index, "expiryYear", value)
                        }
                        placeholder="Select Year"
                      >
                        {years.map((year) => (
                          <Select.Option key={year} value={year}>
                            {year}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td className="culture" style={{ padding: "5px" }}>
                      <Select
                        style={{ width: "200px" }}
                        value={row.culture}
                        disabled={!isEditable}
                        onChange={(value) =>
                          handleInputChange(index, "culture", value)
                        }
                      >
                        <Select.Option value="Aspergillus">
                          Aspergillus
                        </Select.Option>
                        <Select.Option value="Escherechia coli">
                          Escherechia coli
                        </Select.Option>
                        <Select.Option value="Staphylococcos aures">
                          Staphylococcos aures
                        </Select.Option>
                        <Select.Option value="Pseudomonas aerogenosa">
                          Pseudomonas aerogenosa
                        </Select.Option>
                        <Select.Option value="Salmonella">
                          Salmonella
                        </Select.Option>
                        <Select.Option value="Burkholderia cepacia">
                          Burkholderia cepacia
                        </Select.Option>
                        <Select.Option value="Candida albicans">
                          Candida albicans
                        </Select.Option>
                        <Select.Option value="Bacillus subtilis - 8Nos">
                          Bacillus subtilis - 8Nos
                        </Select.Option>
                      </Select>
                    </td>
                    <td
                      className="testCompletionDate"
                      style={{ padding: "5px" }}
                    >
                      <Input
                        type="date"
                        value={row.testCompletionDate}
                        disabled={!isEditable}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "testCompletionDate",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="remarks" style={{ padding: "5px" }}>
                      <Input
                        type="text"
                        style={{ width: "150px" }}
                        disabled={!isEditable}
                        value={row.remarks}
                        onChange={(e) =>
                          handleInputChange(index, "remarks", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        type="primary"
                        danger
                        icon={<FaTrash style={{ fontSize: "10px" }} />}
                        onClick={() => deleteRow(index)}
                        disabled={!isEditable}
                        style={{
                          padding: "2px 4px",
                          fontSize: "10px",
                          height: "24px",
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
                marginTop: "10px",
              }}
              onClick={addRow}
              disabled={!isEditable}
            >
              <AiOutlinePlus style={{ marginRight: "5px" }} />
              Add Row
            </Button>
          </div>
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
                <b>Created by Microbiologist Sign & Date</b>
              </td>

              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Verified by QC/QA Manager Sign & Date</b>
              </td>
            </tr>
            <tr style={{ height: "35px" }}>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {selectedRow?.microbiologist_status ===
                  "MICROBIOLOGIST_APPROVED" && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.microbiologist_sign}
                    <br />
                    {formattedMicroDate}
                  </>
                )}
              </td>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {(selectedRow?.manager_status === "QC_REJECTED" ||
                  selectedRow?.manager_status === "QC_APPROVED" ||
                  selectedRow?.manager_status === "QA_REJECTED" ||
                  selectedRow?.manager_status === "QA_APPROVED") && (
                  <>
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.manager_sign}
                    <br />
                    {formattedManagerDate}
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
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Media Growth Promotion Test Report"
        formatNo="PH-QCL01/F-021"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER" ? (
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
                onClick={handleApprove}
                shape="round"
                icon={
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                }
              >
                &nbsp;Approve
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
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtonSave(),
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
                  // display: submitBtnStatus ? "block" : "none",
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
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
              if (window.confirm("Are you sure want to logout")) {
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
            rows={4}
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
    </>
  );
};

export default QualityControlF021;
