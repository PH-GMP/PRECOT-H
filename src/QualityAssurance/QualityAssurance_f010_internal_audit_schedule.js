import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import API from "../baseUrl.json";
import {
  Button,
  Select,
  Input,
  Form,
  Table,
  DatePicker,
  Space,
  Popconfirm,
  message,
  TimePicker,
  Tabs,
  Tooltip,
  Modal,
} from "antd";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { BiLock } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { FaLock, FaTrash } from "react-icons/fa6";
//const { state } = useLocation();

const { Option } = Select;
const { TabPane } = Tabs;

const QualityAssurance_f010_internal_audit_schedule = () => {
  const navigate = useNavigate();
  const [auditSchedule, setAuditSchedule] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(null);
  const [auditees, setauditees] = useState([]);
  const [auditors, setauditors] = useState([]);
  const [auditTypes, setAuditTypes] = useState([]);
  const [newauditee, setNewauditee] = useState("");
  const [newauditor, setNewauditor] = useState("");
  const [newAuditType, setNewAuditType] = useState("");
  const [getImage, setGetImage] = useState("");
  const [form] = Form.useForm();
  const role = localStorage.getItem("role");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [scheduleId, setScheduledId] = useState("");
  const location = useLocation();
  const { editYear, editMonth, status } = location.state || {};
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  const [saveDisable, setSaveDisabled] = useState(false);
  const [date, setDate] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });
  const [selectedAuditors, setSelectedAuditors] = useState({});

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const canDisplayButtons = () => {};

  const handleApprove = () => {};

  const handleBack = () => {
    navigate("/Precot/QualityAssurance/F-010/internal_audit_schedule_summary");
  };

  const handleDeleteOption = () => {};

  // useEffect(() => {
  //   
  //   
  //   if (state && state.year && state.month) {
  //     setYear(state.year);
  //     setMonth(state.month);
  //   }
  // }, [state]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Construct the payload data

        const filteredAuditSchedule = auditSchedule.map(
          ({
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
            scheduleId,
            ...rest
          }) => {
            return { ...rest };
          }
        );

        const payloadData = {
          unit: "Unit H",
          formatNo: "PH-QAD01/F-010",
          formatName: "INTERNAL AUDIT SCHEDULE",
          sopNumber: "PH-QAD01-D-17",
          revisionNo: "02",
          auditScheduleYear: year,
          auditScheduleMonth: month,
          scheduleId: scheduleId,
          internalAuditList: filteredAuditSchedule,
        };

        

        // Get the Bearer token from localStorage (or however you are storing it)
        const token = localStorage.getItem("token");

        // Make the API call
        axios
          .post(
            `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/submitAuditSchedule`,
            payloadData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            
            navigate(
              "/Precot/QualityAssurance/F-010/internal_audit_schedule_summary"
            );
            message.success("Audit Schedule submitted successfully!");
          })
          .catch((error) => {
            console.error("API Error:", error);
            message.error("Failed to submit the audit schedule.");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
        message.error("Please fill all required fields.");
      });
  };

  const handleAddRow = () => {
    
    setAuditSchedule([
      ...auditSchedule,
      {
        id: auditSchedule.length,
        department: "",
        auditee: "",
        auditor: "",
        auditDate: "",
        auditTime: "",
        isNew: true,
        auditId: "",
      },
    ]);
  };

  const fetchAuditSchedule = async () => {
    
    const token = localStorage.getItem("token");
    if (editYear && editMonth) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditSchedule?year=${editYear}&month=${editMonth}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // Check if the response contains a valid 'internalAuditList' array
        if (
          response.data &&
          Array.isArray(response.data.internalAuditList) &&
          response.data.internalAuditList.length > 0
        ) {
          

          const formattedAuditList = Array.isArray(
            response.data.internalAuditList
          )
            ? response.data.internalAuditList.map(
                (internalAuditList, index) => ({
                  department: internalAuditList.department,
                  id: index, // Use index or a unique identifier if available
                  auditee: internalAuditList.auditee,
                  auditor: internalAuditList.auditor,
                  auditType: internalAuditList.auditType,
                  auditDate: internalAuditList.auditDate,
                  auditTime: internalAuditList.auditTime,
                  auditId: internalAuditList.auditId,
                })
              )
            : [];

          //setAuditList(formattedAuditList);

          
          // setAuditSchedule(fetchedDepartments);
          setAuditSchedule(formattedAuditList);
          setScheduledId(response.data.scheduleId);

          // signature part
          const scheduleStatus = response.data.auditScheduleStatus;
          if (scheduleStatus == "SCHEDULE_SUBMITTED") {
            setSaveDisabled(true);
            if (response.data.scheduleSubmitOn) {
              const dateObj = new Date(response.data.scheduleSubmitOn);
              const formattedDate = `${dateObj.getDate()}/${
                dateObj.getMonth() + 1
              }/${dateObj.getFullYear()}`;
              setDate(formattedDate);
            }

            // call Api to get signature
            //alert("in if");

            if (username) {
              fetchSignature(username, token); // Call signature fetching function
            }
          }
        } else {
          

          const [DepartmentsResponse] = await Promise.all([
            axios.get(
              `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditDepartments`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

          if (DepartmentsResponse.data) {
            const filteredDepartments = DepartmentsResponse.data.filter(
              (Department) =>
                Department.auditDepartment !== "MR [SMR01]" &&
                Department.auditDepartment !== "Marketing [MKT01]"
            );

            const fetchedDepartments = filteredDepartments.map(
              (Department, index) => ({
                department:
                  Department.auditDepartment ===
                  "Sliver, Balls, Rolls, Pleat Making [PRD04]"
                    ? "Dry Goods"
                    : Department.auditDepartment,
                id: index, 
                auditee: Department.auditId,
                auditor: "",
                auditType: "",
                auditDate: "",
                auditTime: "",
                auditId: "",
              })
            );

            setAuditSchedule(fetchedDepartments);
          }
        }
      } catch (error) {
        console.error("Error fetching audit schedule:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Signature fetching function
  const fetchSignature = async (username, token) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer", // Expecting an image as a binary response
        }
      );

      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setGetImage(url);

      
      // You can now use `imgSrc` to display the image in the UI
    } catch (error) {
      console.error("Error fetching signature:", error);
    }
  };

  // Call the fetch function when the component mounts
  useEffect(() => {
    if (editYear) {
      setYear(editYear);
    }
    if (editMonth) {
      setMonth(editMonth);
    }

    // Programmatically set the form values
    form.setFieldsValue({
      year: editYear,
      month: editMonth,
    });
    

    fetchAuditSchedule();
  }, [editYear, editMonth, form]);

  const handleAddAuditParticipant = async (type) => {
    const token = localStorage.getItem("token");

    // Determine the input and state based on the type
    const participantName = type === "auditor" ? newauditor : newauditee;
    //const setParticipantList = type === 'auditor' ? setauditors : setauditees;

    if (participantName) {
      try {
        

        // Make the API call to add the participant
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/addAuditParticipant`,
          { participant: participantName, formatNo: "PH-QAD01/F-010" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        
        message.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`
        );

        // Reset the input field
        type === "auditor" ? setNewauditor("") : setNewauditee("");

        // Re-fetch the updated participant list
        const participantResponse = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditParticipants`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        
        setauditors(participantResponse.data);
        setauditees(participantResponse.data);
      } catch (error) {
        console.error(`Error adding ${type}:`, error);
        message.error(`Failed to add ${type}/Already Exists`);
      }
    }
  };

  const handleDeleteAuditType = async (auditType, index) => {
    const token = localStorage.getItem("token");
    
    try {
      await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/deleteAuditType?id=${auditType.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success("Audit Type deleted successfully");
      // If the deleted item was selected, clear it

      handleInputChange(index, "auditType", null); // Adjust this part to reset the selected value

      // Re-fetch auditees to refresh the list
      const auditTypeResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditTypes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      
      setAuditTypes(auditTypeResponse.data);
    } catch (error) {
      message.error("Failed to delete auditee");
    }
  };

  const handleDeleteParticipant = async (participants, index, type) => {
    const token = localStorage.getItem("token");
    
    try {
      await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/deleteAuditParticipant?id=${participants.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success("Audit participant deleted successfully");
      // If the deleted item was selected, clear it

      handleInputChange(index, type, null); // Adjust this part to reset the selected value

      // Re-fetch auditees to refresh the list
      const auditParticipantResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditParticipants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      
      setauditees(auditParticipantResponse.data);
      setauditors(auditParticipantResponse.data);
    } catch (error) {
      message.error("Failed to delete auditee");
    }
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Construct the payload data
        const filteredAuditSchedule = auditSchedule.map(
          ({
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
            scheduleId,
            id,
            isNew,
            ...rest
          }) => {
            return { ...rest };
          }
        );

        const payloadData = {
          unit: "Unit H",
          formatNo: "PH-QAD01/F-010",
          formatName: "INTERNAL AUDIT SCHEDULE",
          sopNumber: "PH-QAD01-D-17",
          revisionNo: "02",
          auditScheduleYear: year,
          auditScheduleMonth: month,
          internalAuditList: filteredAuditSchedule,
          scheduleId: scheduleId,
        };

        

        // Get the Bearer token from localStorage (or however you are storing it)
        const token = localStorage.getItem("token");

        // Make the API call
        axios
          .post(
            `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/saveAuditSchedule`,
            payloadData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            
            navigate(
              "/Precot/QualityAssurance/F-010/internal_audit_schedule_summary"
            );
            message.success("Audit Schedule saved successfully!");
          })
          .catch((error) => {
            console.error("API Error:", error);
            message.error("Failed to save the audit schedule.");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
        message.error("Please fill all required fields.");
      });
  };

  const handleauditeeChange = (value, index) => {
    const newSchedule = [...auditSchedule];
    newSchedule[index].auditee = value; // Update the auditee for the specific row
    setAuditSchedule(newSchedule);
  };

  const { confirm } = Modal;

  const deleteRow = (rowId, auditId) => {
    
    if (auditId != "") {
    } else {
      confirm({
        title: "Are you sure you want to delete this row?",
        onOk() {
          setAuditSchedule(auditSchedule.filter((_, index) => index !== rowId));
        },
        onCancel() {},
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    
    if (!editMonth) {
      
      
    } else {
      
    }
    
    if (editYear && editMonth) {
      const fetchData = async () => {
        try {
          const [DepartmentsResponse, auditeesResponse, auditTypeResponse] =
            await Promise.all([
              axios.get(
                `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditDepartments`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              ),
              axios.get(
                `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditParticipants`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              ),
              axios.get(
                `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditTypes`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              ),
            ]);

          // if (DepartmentsResponse.data ) {
          //   const fetchedDepartments = DepartmentsResponse.data.map((Department, index) => ({
          //     department: Department.auditDepartment,
          //     id: index , // Set the id based on the loop index
          //     auditee: Department.auditId,
          //     auditor: "",
          //     auditType: "",
          //     auditDate: "",
          //     auditTime: "",
          //     auditId:"",
          //   }));
          //   setAuditSchedule(fetchedDepartments);
          // }

          if (auditeesResponse.data && Array.isArray(auditeesResponse.data)) {
            
            setauditees(auditeesResponse.data);
            setauditors(auditeesResponse.data);
          }

          if (auditTypeResponse.data) {
            
            setAuditTypes(auditTypeResponse.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [editYear, editMonth]);

  const handleAddAuditType = async () => {
    const token = localStorage.getItem("token");
    if (newAuditType) {
      try {
        
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/addAuditType`,
          { auditType: newAuditType, formatNo: "PH-QAD01/F-010" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        
        message.success("Audit Type added successfully");
        setNewAuditType(""); // Reset input

        // Re-fetch audit types to refresh the list
        const auditTypeResponse = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditTypes`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        
        setAuditTypes(auditTypeResponse.data);
      } catch (error) {
        console.error("Error adding audit type:", error);
        message.error("Failed to add Audit Type/Already Exists");
      }
    }
  };

  const handleInputChange = (index, name, value) => {
    // setSelectedAuditors((prev) => ({
    //   ...prev,
    //   [index]: value, // Store the selected auditor for this row
    // }));

    
    const updatedSchedule = [...auditSchedule];
    updatedSchedule[index][name] = value;
    setAuditSchedule(updatedSchedule);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleInputChange(record.id, "department", e.target.value)
          }
          // disabled={text !== ""}
          disabled={record.isNew ? false : saveDisable ? true : text != ""}
        />
      ),
    },
    {
      title: "auditee",
      dataIndex: "auditee",
      key: "auditee",
      render: (text, record, index) => {
        // Filter the auditees based on the record
        const filteredAuditees = auditees.filter((auditee) => {
          // Always include the current auditee if it matches record.auditee
          if (auditee.participant === record.auditee) {
            return true;
          }
          // Exclude the auditee if it matches the record.auditor
          return auditee.participant !== record.auditor;
        });

        // Log the filtered auditees
        //
        return (
          <Select
            value={record.auditee || undefined}
            style={{ width: "100%" }}
            placeholder="Select or Add auditee"
            disabled={saveDisable}
            onChange={(value) => handleInputChange(record.id, "auditee", value)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <div style={{ display: "flex", padding: 8 }}>
                  <Input
                    style={{ flex: "auto" }}
                    value={newauditee}
                    onChange={(e) => setNewauditee(e.target.value)}
                    placeholder="Add new auditee"
                    disabled={saveDisable}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      handleAddAuditParticipant("auditee");
                      setNewauditee("");
                    }}
                    disabled={saveDisable}
                  >
                    Add
                  </Button>
                </div>
              </>
            )}
          >
            {filteredAuditees.map((auditee) => (
              <Select.Option
                key={auditee.participant}
                value={auditee.participant}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {auditee.participant}
                  <Popconfirm
                    title={`Delete ${auditee.participant}?`}
                    onConfirm={() =>
                      handleDeleteParticipant(auditee, index, "auditee")
                    }
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      size="small"
                      style={{ padding: 0, marginLeft: 8 }}
                      disabled={saveDisable}
                    />
                  </Popconfirm>
                </div>
              </Select.Option>
            ))}
          </Select>
        );
      },
    },

    {
      title: "auditor",
      dataIndex: "auditor",
      key: "auditor",
      render: (text, record, index) => (
        <Select
          value={text || undefined}
          style={{ width: "100%" }}
          placeholder="Select or Add auditor"
          disabled={saveDisable}
          onChange={(value) => handleInputChange(record.id, "auditor", value)}
          dropdownRender={(menu) => (
            <>
              {menu}
              <div style={{ display: "flex", padding: 8 }}>
                <Input
                  style={{ flex: "auto" }}
                  value={newauditor}
                  onChange={(e) => setNewauditor(e.target.value)}
                  placeholder="Add new auditor"
                  disabled={saveDisable}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleAddAuditParticipant("auditor");
                    setNewauditor("");
                  }}
                  disabled={saveDisable}
                >
                  Add
                </Button>
              </div>
            </>
          )}
        >
          {auditors
            .filter((auditor) => auditor.participant !== record.auditee) // Filter out selected auditee
            .map((auditor) => (
              <Select.Option
                key={auditor.participant}
                value={auditor.participant}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {auditor.participant}
                  <Popconfirm
                    title={`Delete ${auditor.participant}?`}
                    onConfirm={() =>
                      handleDeleteParticipant(auditor, index, "auditor")
                    }
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      size="small"
                      style={{ padding: 0, marginLeft: 8 }}
                      disabled={saveDisable}
                    />
                  </Popconfirm>
                </div>
              </Select.Option>
            ))}
        </Select>
      ),
    },

    {
      title: "Audit Type",
      dataIndex: "auditType",
      key: "auditType",
      render: (text, record, index) => (
        <Select
          value={text || undefined} // Handle undefined value gracefully
          style={{ width: "100%" }}
          placeholder="Select or Add Audit Type"
          disabled={saveDisable}
          onChange={(value) => handleInputChange(record.id, "auditType", value)}
          dropdownRender={(menu) => (
            <>
              {menu}
              <div style={{ display: "flex", padding: 8 }}>
                <Input
                  style={{ flex: "auto" }}
                  value={newAuditType} // Bind input to newAuditType state
                  onChange={(e) => setNewAuditType(e.target.value)} // Update state on input change
                  placeholder="Add new Audit Type"
                  disabled={saveDisable}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleAddAuditType(); // Call function to add new audit type
                    setNewAuditType(""); // Clear input field after adding
                  }}
                  disabled={saveDisable}
                >
                  Add
                </Button>
              </div>
            </>
          )}
        >
          {Array.isArray(auditTypes) &&
            auditTypes.map((auditType) => (
              <Select.Option key={auditType.id} value={auditType.auditType}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {auditType.auditType}
                  <Popconfirm
                    title={`Delete ${auditType.auditType}?`}
                    onConfirm={() => handleDeleteAuditType(auditType, index)} // Call delete function
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      size="small"
                      style={{ padding: 0, marginLeft: 8 }}
                      disabled={saveDisable}
                    />
                  </Popconfirm>
                </div>
              </Select.Option>
            ))}
        </Select>
      ),
    },

    {
      title: "Date",
      dataIndex: "auditDate",
      key: "auditDate",
      render: (text, record, index) => (
        <DatePicker
          value={text ? moment(text) : null}
          onChange={(date, dateString) =>
            handleInputChange(record.id, "auditDate", dateString)
          }
          style={{ width: "100%" }}
          disabled={saveDisable}
        />
      ),
    },
    {
      title: "Time",
      dataIndex: "auditTime",
      key: "auditTime",
      render: (text, record, index) => (
        <TimePicker
          format="HH:mm"
          value={text ? moment(text, "HH:mm") : null}
          onChange={(time, timeString) => {
            
            console.log(
              `Changing auditTime at index ${record} ${index}: ${timeString}`
            ); // Log for debugging
            handleInputChange(record.id, "auditTime", timeString); // Call your handler
          }}
          style={{ width: "100%" }}
          disabled={saveDisable}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Button
          type="primary"
          danger
          icon={<FaTrash style={{ fontSize: "10px" }} />}
          onClick={() => deleteRow(record.id, record.auditId)}
          disabled={record.isNew ? false : saveDisable ? true : text != ""}
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
        formName="INTERNAL AUDIT SCHEDULE "
        formatNo="PH-QAD01/F-010 "
        sopNo="PA-QAD01-D-17 "
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
            loading={saveLoading}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: saveDisable ? "none" : "block",
            }}
            onClick={handleSave}
            shape="round"
            icon={<IoSave color="#00308F" />}
          >
            &nbsp;Save
          </Button>,
          <Button
            loading={submitLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: saveDisable ? "none" : "block",
            }}
            icon={<GrDocumentStore color="#00308F" />}
            onClick={handleSubmit}
            shape="round"
            key="submit" // Added a unique key
          >
            &nbsp;Submit
          </Button>,

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
            key="back" // Added a unique key
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
              if (confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
            key="logout" // Added a unique key
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
            key="tooltip" // Added a unique key
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
      <Form form={form} layout="horizontal">
        <Space>
          <Form.Item label="Select Year">
            <Input
              type="number"
              value={year}
              disabled={saveDisable}
              onChange={(e) => setYear(e.target.value)}
              style={{ width: 100 }}
            />
          </Form.Item>
          <Form.Item
            label="Select Month"
            name="month"
            rules={[{ required: true, message: "Please select a month" }]}
          >
            <Select
              style={{ width: 200 }}
              placeholder="Select a month"
              value={month}
              disabled={saveDisable}
              onChange={(value) => setMonth(value)} // Store selected month
            >
              {months.map((month) => (
                <Option key={month.value} value={month.value}>
                  {month.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>
      </Form>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Departments" key="1">
          <Button
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleAddRow}
            disabled={saveDisable}
          >
            Add Row
          </Button>
          <Table
            dataSource={auditSchedule}
            columns={columns}
            rowKey="id"
            onChange={handleTableChange}
            pagination={pagination} // Example for pagination
          />
        </TabPane>
        <TabPane tab="Signature" key="2">
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td className="data-border-signature">
                  <div style={{ marginTop: "10px" }}>
                    <strong>Note:</strong>
                    <ol style={{ paddingLeft: "15px" }}>
                      <li>
                        All auditees are requested to co-operate with auditors
                        and be available for the audit on the planned date &
                        time.
                      </li>
                      <li>
                        In case of leave, inform MR / Asst. MR for re-scheduling
                        the audit at least 2 days before the scheduled date.
                      </li>
                      <li>Audit is based on the requirements of ISO.</li>
                      <li>
                        Please note that the audit is on the system, not on
                        individual performance.
                      </li>
                      <li>
                        All auditors are requested to fill up the audit report /
                        NC report after conducting the audit.
                      </li>
                      <li>
                        Please verify the effectiveness of previous
                        Non-conformity closed.
                      </li>
                    </ol>
                  </div>
                </td>
                <td className="data-border-signature" style={{ width: "30%" }}>
                  <p>QA/MR - Sign & Date</p>
                  <div>
                    {username}

                    <br />
                    {date}
                    <br />
                  </div>
                  {getImage !== "" && (
                    <img className="signature" src={getImage} alt="HOD" />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default QualityAssurance_f010_internal_audit_schedule;
