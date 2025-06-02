import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Table,
  Tabs,
  Button,
  Tooltip,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  message,
  Modal,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { TbMenuDeep } from "react-icons/tb";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API from "../baseUrl.json";
import moment from "moment";
import {
  handleKeyDown,
  handleNumberKeyDown,
  printDateFormat,
  handleDecimalNumberKeyDown,
  getYearAndMonth,
} from "../util/util.js";

const { TabPane } = Tabs;

const role = localStorage.getItem("role");

const selecteddate = localStorage.getItem("Mediadate");

export default function Qualitycontrol_f19() {
  const [activeKey, setActiveKey] = useState("1");

  const navigate = useNavigate();
  const location = useLocation();

  const { TextArea } = Input;
  const { date, loadno } = location.state || {};
  // const { date } = state || {};
  // const { loadno } = state || {};

  const [selectedRow, setSelectedRow] = useState("");

  const [rejectModal, setRejectModal] = useState(false);

  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [isSaveButton, setIsSaveButton] = useState("block");
  const [isSubmitButton, setIsSubmitButton] = useState("block");
  const [isLoading, setIsLoading] = useState(false);

  const [eSign, setESign] = useState({
    microbiologist_sign: null,
    manager_sign: null,
  });

  const { year, month } = getYearAndMonth(date);

  const [formData, setFormData] = useState({
    formatNo: "F019",
    revisionNo: "02",
    formatName: "MEDIA PREPARATION & CONSUMPTION RECORD",
    refSopNo: "PH-QCL01-D-07",
    month: month,
    year: year,
    preparationDate: date,
    loadNo: loadno,
    scdaMediaWeight: "",
    scdaDistilledWater: "",
    scdaMediaQuantity: "",
    scdaPhOfMediaRequired: "",
    scdaPhMediaObserved: "",
    scdaNoOfPlates: "",
    scdaMediaPoured: "",
    scdaQuantityUsed: "",
    scdaRemainingQuantiy: "",
    scdaRemarks: "",
    scdaPreparedBy: "",
    scdaVerifiedBy: "",
    sdaMediaWeight: "",
    sdaDistilledWater: "",
    sdaMediaQuantity: "",
    sdaPhOfMediaRequired: "",
    sdaPhMediaObsereved: "",
    sdaNoOfPlates: "",
    sdaMediaPoured: "",
    sdaQuantityUsed: "",
    sdaRemainingQuantiy: "",
    sdaRemarks: "",
    sdaPreparedBy: "",
    sdaVerifiedBy: "",
    vrbaMediaWeight: "",
    vrbaDistilledWater: "",
    vrbaMediaQuantity: "",
    vrbaPhOfMediaRequired: "",
    vrbaPhMediaObsereved: "",
    vrbaNoOfPlates: "",
    vrbaMediaPoured: "",
    vrbaQuantityUsed: "",
    vrbaRemainingQuantiy: "",
    vrbaRemarks: "",
    vrbaPreparedBy: "",
    vrbaVerifiedBy: "",
    maccOnMediaWeight: "",
    maccOnDistilledWater: "",
    maccOnMediaQuantity: "",
    maccOnPhOfMediaRequired: "",
    maccOnPhMediaObsereved: "",
    maccOnNoOfPlates: "",
    maccOnMediaPoured: "",
    maccOnQuantityUsed: "",
    maccOnRemainingQuantiy: "",
    maccOnRemarks: "",
    maccOnPreparedBy: "",
    maccOnVerifiedBy: "",
    citricMediaWeight: "",
    citricDistilledWater: "",
    citricMediaQuantity: "",
    citricPhOfMediaRequired: "",
    citricPhMediaObsereved: "",
    citricNoOfPlates: "",
    citricMediaPoured: "",
    citricQuantityUsed: "",
    citricRemainingQuantiy: "",
    citricRemarks: "",
    citricPreparedBy: "",
    citricVerifiedBy: "",
    vjMediaWeight: "",
    vjDistilledWater: "",
    vjMediaQuantity: "",
    vjPhOfMediaRequired: "",
    vjPhMediaObsereved: "",
    vjNoOfPlates: "",
    vjMediaPoured: "",
    vjQuantityUsed: "",
    vjRemainingQuantiy: "",
    vjRemarks: "",
    vjPreparedBy: "",
    vjVerifiedBy: "",
    bgaMediaWeight: "",
    bgaDistilledWater: "",
    bgaMediaQuantity: "",
    bgaPhOfMediaRequired: "",
    bgaPhMediaObsereved: "",
    bgaNoOfPlates: "",
    bgaMediaPoured: "",
    bgaQuantityUsed: "",
    bgaRemainingQuantiy: "",
    bgaRemarks: "",
    bgaPreparedBy: "",
    bgaVerifiedBy: "",
    naclMediaWeight: "",
    naclDistilledWater: "",
    naclMediaQuantity: "",
    kh2po4MediaWeight: "",
    kh2po4DistilledWater: "",
    kh2po4MediaQuantity: "",
    peptoneWaterMediaWeight: "",
    peptoneWaterDistilledWater: "",
    peptoneWaterMediaQuantity: "",
    tween80MediaWeight: "",
    tween80DistilledWater: "",
    tween80MediaQuantity: "",
    bufferSolPhMediaRequired: "",
    bufferSolPhMediaObsereved: "",
    bufferSolNoOfPlates: "",
    bufferSolMediaPoured: "",
    bufferSolQuantityUsed: "",
    bufferSolRemainingQuantiy: "",
    bufferSolRemarks: "",
    bufferSolPreparedBy: "",
    bufferSolVerifiedBy: "",
    microbiologist_status: "",
    microbiologist_saved_on: "",
    microbiologist_saved_by: "",
    microbiologist_saved_id: "",
    microbiologist_submit_on: null,
    microbiologist_submit_by: null,
    microbiologist_submit_id: null,
    microbiologist_sign: null,
    manager_status: null,
    manager_submit_on: null,
    manager_submit_by: null,
    manager_submit_id: null,
    manager_sign: null,
    reason: null,
    mail_status: null,
  });

  const [rejectReason, setRejectReason] = useState();

  const handleOpenRejectModal = () => {
    setRejectModal(true);
  };

  const handleCancel = () => {
    setRejectModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const role = localStorage.getItem("role");

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

  // const Reviews = () => {
  //   const columns = [
  //     {
  //       title: 'Created by Microbiologist Sign & Date',
  //       dataIndex: 'preparedBy',
  //       key: 'preparedBy',
  //       render: () => (
  //         <td
  //           colSpan="2"
  //           style={{
  //             display: 'table-cell',
  //             height: '80px',
  //             textAlign: 'center',
  //             verticalAlign: 'bottom',
  //           }}
  //         >
  //           {selectedRow?.microbiologist_status === 'MICROBIOLOGIST_APPROVED' && (
  //             <>
  //               {getImage1 && <img className="signature" src={getImage1} alt="Operator" />}
  //               <br />
  //               {selectedRow?.microbiologist_sign}
  //               <br />
  //               {formattedMicroDate}
  //             </>
  //           )}
  //         </td>
  //       ),
  //     },

  //     {
  //       title: 'Verified by QC/QA Manager or Microbiologist Designee Sign & Date',
  //       dataIndex: 'approvedBy',
  //       key: 'approvedBy',
  //       render: (text) => <span>{text}</span>,
  //     },
  //   ];

  //   return <Table columns={columns} dataSource={dataSource} pagination={false} rowKey="key" />;
  // };

  const Reviews = () => {
    // Ensure that the dataSource contains only one row
    const dataSource = [
      {
        key: "1",
        preparedBy: selectedRow?.microbiologist_sign, // Data for the first column
        approvedBy: selectedRow?.qc_sign, // Data for the second column
      },
    ];

    const columns = [
      // {
      //   title: 'Created by Microbiologist Sign & Date',
      //   dataIndex: 'preparedBy',
      //   key: 'preparedBy',
      //   render: () => (
      //     <td
      //       colSpan="2"
      //       style={{
      //         display: 'table-cell',
      //         height: '80px',
      //         textAlign: 'center',
      //         verticalAlign: 'bottom',
      //         margin: 20,
      //       }}
      //     >
      //       {selectedRow?.microbiologist_status === 'MICROBIOLOGIST_APPROVED' && (
      //         <>
      //           {getImage1 && <img className="signature" src={getImage1} alt="Operator" />}
      //           <br />
      //           {selectedRow?.microbiologist_sign}
      //           <br />
      //           {formattedMicroDate}
      //         </>
      //       )}
      //     </td>
      //   ),
      // },
      // {
      //   title: 'Verified by QC/QA Manager or Microbiologist Designee Sign & Date',
      //   dataIndex: 'approvedBy',
      //   key: 'approvedBy',
      //   render: () => (
      //     <td
      //       colSpan="2"
      //       style={{
      //         display: 'table-cell',
      //         height: '80px',
      //         textAlign: 'center',
      //         verticalAlign: 'bottom',
      //         margin: 20,
      //       }}
      //     >
      //       {(selectedRow?.manager_status === 'QC_REJECTED' ||
      //         selectedRow?.manager_status === 'QC_APPROVED' ||
      //         selectedRow?.manager_status === 'QA_REJECTED' ||
      //         selectedRow?.manager_status === 'QA_APPROVED' ||
      //         selectedRow?.manager_status === 'MICRO_DESIGNEE_APPROVED' ||
      //         selectedRow?.manager_status === 'MICRO_DESIGNEE_REJECTED') && (
      //           <>
      //             {getImage2 && <img className="signature" src={getImage2} alt="Superviosr Sign" />}
      //             <br />
      //             {selectedRow && selectedRow.manager_sign}
      //             <br />
      //             {formattedManagerDate}
      //           </>
      //         )}
      //     </td>
      //   ),
      // },
    ];

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="key"
      />
    );
  };

  const [mediaPreparationData, setMediaPreparationData] = useState(null);

  const validateDisableFields = (response) => {
    if (role === "ROLE_MICROBIOLOGIST") {
      if (
        response.manager_status === "QC_REJECTED" ||
        response.manager_status === "QA_REJECTED" ||
        response.manager_status === "MICRO_DESIGNEE_REJECTED"
      ) {
        setIsFieldsDisabled(false);
        return;
      }

      if (response.microbiologist_status === "MICROBIOLOGIST_APPROVED") {
        setIsFieldsDisabled(true);
      } else {
        setIsFieldsDisabled(false);
      }
    } else if (role === "QA_MANAGER" || role === "QC_MANAGER") {
      setIsFieldsDisabled(true);
    } else {
      setIsFieldsDisabled(true);
    }
  };

  const validateHideButtons = (response) => {
    if (role === "ROLE_MICROBIOLOGIST") {
      if (
        response.manager_status === "QC_REJECTED" ||
        response.manager_status === "QA_REJECTED" ||
        response.manager_status === "MICRO_DESIGNEE_REJECTED"
      ) {
        setIsSaveButton("none");
        setIsSubmitButton("block");
        return;
      }

      if (response.microbiologist_status === "MICROBIOLOGIST_APPROVED") {
        setIsSaveButton("none");
        setIsSubmitButton("none");
      } else {
        setIsSaveButton("block");
        setIsSubmitButton("block");
      }
    } else if (
      role === "QA_MANAGER" ||
      role === "QC_MANAGER" ||
      role === "MICRO_DESIGNEE"
    ) {
      if (response.manager_status === "WAITING_FOR_APPROVAL") {
        setIsSaveButton("block");
        setIsSubmitButton("block");
      } else {
        setIsSaveButton("none");
        setIsSubmitButton("none");
      }
    } else {
      setIsSaveButton("none");
      setIsSubmitButton("none");
    }
  };

  const navigateBack = (responseData) => {
    if (
      role === "QA_MANAGER" ||
      role === "QC_MANAGER" ||
      role === "MICRO_DESIGNEE"
    ) {
      if (
        (responseData?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          responseData?.manager_status === "QC_REJECTED") ||
        (responseData?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          responseData?.manager_status === "QA_REJECTED") ||
        (responseData?.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          responseData?.manager_status === "MICRO_DESIGNEE_REJECTED")
      ) {
        message.warning("Microbiologist Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-019/Summary");
        }, 1500);
      }
    }
  };

  // useEffect to call fetch function when the component mounts

  const fetchDataByPreparationdateandLoadNo = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${   API.prodUrl}/Precot/api/qc/MediaPreparationF019/GetByPreparationDateAndLoadno?preparationDate=${date}&loadNo=${loadno}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data !== "No data found for the provided parameters") {
          setFormData(response.data[0]);
          validateDisableFields(response.data[0]);
          validateHideButtons(response.data[0]);
          navigateBack(response.data[0]);
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  // useEffect to call fetch function when the component mounts
  useEffect(() => {
    fetchDataByPreparationdateandLoadNo();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["microbiologist_sign", "manager_sign"];
    signatureKeys.forEach((key) => {
      console.log("new Data", formData);
      if (formData) {
        const username = formData[key];
        console.log("usernameparams", username);

        if (username) {
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
      }
    });
  }, [formData]);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    console.log("Payload being sent:", formData);
    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SaveMediaPreparationF019`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data saved successfully:", response.data);
      message.success(
        "MEDIA PREPARATION & CONSUMPTION RECORD Saved Successfully"
      );
      navigate("/Precot/QualityControl/F-019/Summary");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Save Form");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!formData.scdaRemarks) {
      formData.scdaRemarks = "N/A";
    }
    if (!formData.sdaRemarks) {
      formData.sdaRemarks = "N/A";
    }
    if (!formData.vrbaRemarks) {
      formData.vrbaRemarks = "N/A";
    }
    if (!formData.maccOnRemarks) {
      formData.maccOnRemarks = "N/A";
    }
    if (!formData.citricRemarks) {
      formData.citricRemarks = "N/A";
    }
    if (!formData.vjRemarks) {
      formData.vjRemarks = "N/A";
    }
    if (!formData.bgaRemarks) {
      formData.bgaRemarks = "N/A";
    }

    if (!formData.bufferSolRemarks) {
      formData.bufferSolRemarks = "N/A";
    }

    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/qc/SubmitMediaPreparationF019`,
        formData, // Ensure the payload is sent in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data saved successfully:", response.data);
      message.success(
        "MEDIA PREPARATION & CONSUMPTION RECORD Submitted Successfully"
      );
      setIsLoading(false);
      navigate("/Precot/QualityControl/F-019/Summary");
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Submit Form");
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${   API.prodUrl}/Precot/api/qc/ApproveMediaPreparationF019`,
        {
          id: formData.id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setIsLoading(false);
        navigate("/Precot/QualityControl/F-019/Summary");
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {});
  };

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${   API.prodUrl}/Precot/api/qc/ApproveMediaPreparationF019`,
        {
          id: formData.id,
          status: "Reject",
          remarks: rejectReason,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setIsLoading(false);
        navigate("/Precot/QualityControl/F-019/Summary");
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {});
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-019/Summary");
  };

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="MEDIA PREPARATION & CONSUMPTION RECORD"
        formatNo="PH-QCL01/F-019"
        sopNo="PH-QCL01-D-05"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        const
        buttonsArray={[
          role === "QC_MANAGER" ||
          role === "MICRO_DESIGNEE" ||
          role === "QA_MANAGER" ? (
            <>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSaveButton,
                  // display: 'block',
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSubmitButton,
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={handleOpenRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSaveButton,
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSubmitButton,
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
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure want to logout")) {
                // localStorage.removeItem('token');
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                // Clear role state
                // setRole(null);
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

      {/* <Col>
            <Form.Item label="Preparation Date" name="preparationDate">
              <DatePicker />
            </Form.Item>
          </Col> */}
      <Form layout="inline">
        <Row gutter={20} align="middle" justify="start">
          <Col span={10}>
            <Form.Item label="Date:" required>
              <input
                type="date"
                style={{
                  width: "100%",
                  padding: "4px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                }}
                value={date}
                disabled
              />
            </Form.Item>
          </Col>

          <Col span={13}>
            <Form.Item label="Load No">
              <input
                style={{
                  width: "100%",
                  padding: "4px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                }}
                value={loadno}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleReject}
            loading={isLoading}
          >
            Reject
          </Button>,
        ]}
      >
        <label>Reason : </label>
        <br></br>
        <br></br>
        <TextArea
          type="textArea"
          style={{ height: "100px" }}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        ></TextArea>
      </Modal>

      <Tabs activeKey={activeKey} onChange={onChange}>
        <TabPane tab="Preparation Data" key="1">
          {/* <PreparationDataTable /> */}

          <table>
            <thead>
              <tr>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Media Name
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Media Weight (g)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Distilled Water (ml)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Media Quantity (ml)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  pH of the Media Required
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  pH of the Media Observed
                </th>
                <th colSpan={3} style={{ padding: "0.5rem" }}>
                  Media Consumption
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Remaining Quantity (ml)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Remarks
                </th>
              </tr>
              <tr>
                <th style={{ padding: "0.5rem" }}>No.of plates prepared</th>
                <th style={{ padding: "0.5rem" }}>
                  Media poured / Plate (ml.)
                </th>
                <th style={{ padding: "0.5rem" }}>Quantity used (ml)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>SCDA</td>
                {/* Media weight */}
                <td>
                  <Input
                    type="text"
                    name="scdaMediaWeight"
                    value={formData.scdaMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                     
                  />
                </td>
                {/* Distilled water */}
                <td>
                  <Input
                    type="number"
                    name="scdaDistilledWater"
                    value={formData.scdaDistilledWater}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media Quantity */}
                <td>
                  <Input
                    type="number"
                    name="scdaMediaQuantity"
                    value={formData.scdaMediaQuantity}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* ph media required */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="scdaPhOfMediaRequired"
                    onChange={handleChange}
                    value={formData.scdaPhOfMediaRequired}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                  />
                </td>
                {/* pH of the Media Observed */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="scdaPhMediaObserved"
                    value={formData.scdaPhMediaObserved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* No.of plates prepared */}
                <td>
                  <Input
                    type="number"
                    name="scdaNoOfPlates"
                    value={formData.scdaNoOfPlates}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                {/* Media poured / Plate (ml.) */}
                <td>
                  <Input
                    type="number"
                    name="scdaMediaPoured"
                    value={formData.scdaMediaPoured}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Quantity used (ml) */}
                <td>
                  <Input
                    type="number"
                    name="scdaQuantityUsed"
                    value={formData.scdaQuantityUsed}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remaining Quantity (ml) */}
                <td>
                  <Input
                    type="number"
                    name="scdaRemainingQuantiy"
                    value={formData.scdaRemainingQuantiy}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remarks */}
                <td>
                  <Input
                    name="scdaRemarks"
                    value={formData.scdaRemarks}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                  />
                </td>
              </tr>
              {/* SDA */}
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>SDA</td>
                {/* Media weight */}
                <td>
                  <Input
                    type="text"
                    name="sdaMediaWeight"
                    value={formData.sdaMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                {/* Distilled water */}
                <td>
                  <Input
                    type="number"
                    name="sdaDistilledWater"
                    value={formData.sdaDistilledWater}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media Quantity */}
                <td>
                  <Input
                    type="number"
                    name="sdaMediaQuantity"
                    value={formData.sdaMediaQuantity}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* ph media required */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="sdaPhOfMediaRequired"
                    onChange={handleChange}
                    value={formData.sdaPhOfMediaRequired}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* pH of the Media Observed */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="sdaPhMediaObsereved"
                    value={formData.sdaPhMediaObsereved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* No.of plates prepared */}
                <td>
                  <Input
                    type="number"
                    name="sdaNoOfPlates"
                    value={formData.sdaNoOfPlates}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media poured / Plate (ml.) */}
                <td>
                  <Input
                    type="number"
                    name="sdaMediaPoured"
                    value={formData.sdaMediaPoured}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Quantity used (ml) */}
                <td>
                  <Input
                    type="number"
                    name="sdaQuantityUsed"
                    value={formData.sdaQuantityUsed}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remaining Quantity (ml) */}
                <td>
                  <Input
                    type="number"
                    name="sdaRemainingQuantiy"
                    value={formData.sdaRemainingQuantiy}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remarks */}
                <td>
                  <Input
                    name="sdaRemarks"
                    value={formData.sdaRemarks}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>VRBA</td>
                {/* Media weight */}
                <td>
                  <Input
                    type="text"
                    name="vrbaMediaWeight"
                    value={formData.vrbaMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                {/* Distilled water */}
                <td>
                  <Input
                    type="number"
                    name="vrbaDistilledWater"
                    value={formData.vrbaDistilledWater}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media Quantity */}
                <td>
                  <Input
                    type="number"
                    name="vrbaMediaQuantity"
                    value={formData.vrbaMediaQuantity}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* ph media required */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="vrbaPhOfMediaRequired"
                    onChange={handleChange}
                    value={formData.vrbaPhOfMediaRequired}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* pH of the Media Observed */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="vrbaPhMediaObsereved"
                    value={formData.vrbaPhMediaObsereved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* No.of plates prepared */}
                <td>
                  <Input
                    type="number"
                    name="vrbaNoOfPlates"
                    value={formData.vrbaNoOfPlates}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media poured / Plate (ml.) */}
                <td>
                  <Input
                    type="number"
                    name="vrbaMediaPoured"
                    value={formData.vrbaMediaPoured}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Quantity used (ml) */}
                <td>
                  <Input
                    type="number"
                    name="vrbaQuantityUsed"
                    value={formData.vrbaQuantityUsed}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remaining Quantity (ml) */}
                <td>
                  <Input
                    type="number"
                    name="vrbaRemainingQuantiy"
                    value={formData.vrbaRemainingQuantiy}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remarks */}
                <td>
                  <Input
                    name="vrbaRemarks"
                    value={formData.vrbaRemarks}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                  />
                </td>
              </tr>
              {/* Mac.Con */}
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  Mac.Con
                </td>
                {/* Media weight */}
                <td>
                  <Input
                    type="text"
                    name="maccOnMediaWeight"
                    value={formData.maccOnMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                {/* Distilled water */}
                <td>
                  <Input
                    type="number"
                    name="maccOnDistilledWater"
                    value={formData.maccOnDistilledWater}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media Quantity */}
                <td>
                  <Input
                    type="number"
                    name="maccOnMediaQuantity"
                    value={formData.maccOnMediaQuantity}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* ph media required */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="maccOnPhOfMediaRequired"
                    onChange={handleChange}
                    value={formData.maccOnPhOfMediaRequired}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* pH of the Media Observed */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="maccOnPhMediaObsereved"
                    value={formData.maccOnPhMediaObsereved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* No.of plates prepared */}
                <td>
                  <Input
                    type="number"
                    name="maccOnNoOfPlates"
                    value={formData.maccOnNoOfPlates}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media poured / Plate (ml.) */}
                <td>
                  <Input
                    type="number"
                    name="maccOnMediaPoured"
                    value={formData.maccOnMediaPoured}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Quantity used (ml) */}
                <td>
                  <Input
                    type="number"
                    name="maccOnQuantityUsed"
                    value={formData.maccOnQuantityUsed}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remaining Quantity (ml) */}
                <td>
                  <Input
                    type="number"
                    name="maccOnRemainingQuantiy"
                    value={formData.maccOnRemainingQuantiy}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remarks */}
                <td>
                  <Input
                    name="maccOnRemarks"
                    value={formData.maccOnRemarks}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                  />
                </td>
              </tr>
              {/* Citric */}
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  Citric
                </td>
                {/* Media weight */}
                <td>
                  <Input
                    type="text"
                    name="citricMediaWeight"
                    value={formData.citricMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                {/* Distilled water */}
                <td>
                  <Input
                    type="number"
                    name="citricDistilledWater"
                    value={formData.citricDistilledWater}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media Quantity */}
                <td>
                  <Input
                    type="number"
                    name="citricMediaQuantity"
                    value={formData.citricMediaQuantity}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* ph media required */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="citricPhOfMediaRequired"
                    onChange={handleChange}
                    value={formData.citricPhOfMediaRequired}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* pH of the Media Observed */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="citricPhMediaObsereved"
                    value={formData.citricPhMediaObsereved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* No.of plates prepared */}
                <td>
                  <Input
                    type="number"
                    name="citricNoOfPlates"
                    value={formData.citricNoOfPlates}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media poured / Plate (ml.) */}
                <td>
                  <Input
                    type="number"
                    name="citricMediaPoured"
                    value={formData.citricMediaPoured}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Quantity used (ml) */}
                <td>
                  <Input
                    type="number"
                    name="citricQuantityUsed"
                    value={formData.citricQuantityUsed}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remaining Quantity (ml) */}
                <td>
                  <Input
                    type="number"
                    name="citricRemainingQuantiy"
                    value={formData.citricRemainingQuantiy}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remarks */}
                <td>
                  <Input
                    name="citricRemarks"
                    value={formData.citricRemarks}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                  />
                </td>
              </tr>
              {/* vj */}
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>VJ</td>
                {/* Media weight */}
                <td>
                  <Input
                    type="text"
                    name="vjMediaWeight"
                    value={formData.vjMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                {/* Distilled water */}
                <td>
                  <Input
                    type="number"
                    name="vjDistilledWater"
                    value={formData.vjDistilledWater}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media Quantity */}
                <td>
                  <Input
                    type="number"
                    name="vjMediaQuantity"
                    value={formData.vjMediaQuantity}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* ph media required */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="vjPhOfMediaRequired"
                    onChange={handleChange}
                    value={formData.vjPhOfMediaRequired}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* pH of the Media Observed */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="vjPhMediaObsereved"
                    value={formData.vjPhMediaObsereved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* No.of plates prepared */}
                <td>
                  <Input
                    type="number"
                    name="vjNoOfPlates"
                    value={formData.vjNoOfPlates}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media poured / Plate (ml.) */}
                <td>
                  <Input
                    type="number"
                    name="vjMediaPoured"
                    value={formData.vjMediaPoured}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Quantity used (ml) */}
                <td>
                  <Input
                    type="number"
                    name="vjQuantityUsed"
                    value={formData.vjQuantityUsed}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remaining Quantity (ml) */}
                <td>
                  <Input
                    type="number"
                    name="vjRemainingQuantiy"
                    value={formData.vjRemainingQuantiy}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remarks */}
                <td>
                  <Input
                    name="vjRemarks"
                    value={formData.vjRemarks}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                  />
                </td>
              </tr>
              {/* BGA */}
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>BGA</td>
                {/* Media weight */}
                <td>
                  <Input
                    type="text"
                    name="bgaMediaWeight"
                    value={formData.bgaMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                {/* Distilled water */}
                <td>
                  <Input
                    type="number"
                    name="bgaDistilledWater"
                    value={formData.bgaDistilledWater}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media Quantity */}
                <td>
                  <Input
                    type="number"
                    name="bgaMediaQuantity"
                    value={formData.bgaMediaQuantity}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* ph media required */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="bgaPhOfMediaRequired"
                    value={formData.bgaPhOfMediaRequired}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* pH of the Media Observed */}
                <td>
                  {/* decimal */}
                  <Input
                    type="number"
                    name="bgaPhMediaObsereved"
                    value={formData.bgaPhMediaObsereved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                {/* No.of plates prepared */}
                <td>
                  <Input
                    type="number"
                    name="bgaNoOfPlates"
                    value={formData.bgaNoOfPlates}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Media poured / Plate (ml.) */}
                <td>
                  <Input
                    type="number"
                    name="bgaMediaPoured"
                    value={formData.bgaMediaPoured}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Quantity used (ml) */}
                <td>
                  <Input
                    type="number"
                    name="bgaQuantityUsed"
                    value={formData.bgaQuantityUsed}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remaining Quantity (ml) */}
                <td>
                  <Input
                    type="number"
                    name="bgaRemainingQuantiy"
                    value={formData.bgaRemainingQuantiy}
                    onKeyDown={handleNumberKeyDown}
                    onChange={handleChange}
                    min={0}
                    disabled={isFieldsDisabled}
                  />
                </td>
                {/* Remarks */}
                <td>
                  <Input
                    name="bgaRemarks"
                    value={formData.bgaRemarks}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
        <TabPane tab="Buffer Solution" key="2">
          {/* <BufferSolution /> */}
          {/* <br></br> */}
          {/* <h5>
            Note: 1. Soybean Casein Digest Agar [SCDA], Sabouraud Dextrose Agar (SDA), Violet Red
            Bile Agar (VRBA), Mac-Conkey Agar ( Mac.Con. ), Vogel- Johnson Agar Base( VJ), Brilliant
            Green Agar [BGA], Cetrimide Agar( Citri), Burkholderia Cepacia selective agar [BCSA],
            Potassium dihydrogen phosphate [KH2PO4] , Sodium chloride[ NaCl]{' '}
          </h5> */}
          {/* <h5> 2. Media required for pour plate method- 15 to 20ml., for others - 20 to 25 ml.</h5> */}
          <table>
            <thead>
              <tr>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Media Name
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Media Weight (g)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Distilled Water (ml)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Media Quantity (ml)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  pH of the Media Required
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  pH of the Media Observed
                </th>
                <th colSpan={3} style={{ padding: "0.5rem" }}>
                  Media Consumption
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Remaining Quantity (ml)
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  Remarks
                </th>
              </tr>
              <tr>
                <th style={{ padding: "0.5rem" }}>No.of plates prepared</th>
                <th style={{ padding: "0.5rem" }}>
                  Media poured / Plate (ml.)
                </th>
                <th style={{ padding: "0.5rem" }}>Quantity used (ml)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>NaCl</td>
                <td>
                  <Input
                    type="text"
                    name="naclMediaWeight"
                    value={formData.naclMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    // onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="naclDistilledWater"
                    value={formData.naclDistilledWater}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="naclMediaQuantity"
                    value={formData.naclMediaQuantity}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td rowSpan={4}>
                  <Input
                    type="number"
                    name="bufferSolPhMediaRequired"
                    value={formData.bufferSolPhMediaRequired}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                <td rowSpan={4}>
                  <Input
                    type="number"
                    name="bufferSolPhMediaObsereved"
                    value={formData.bufferSolPhMediaObsereved}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleDecimalNumberKeyDown}
                    min={0}
                  />
                </td>
                <td rowSpan={4}>
                  <Input
                    type="number"
                    name="bufferSolNoOfPlates"
                    value={formData.bufferSolNoOfPlates}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td rowSpan={4}>
                  <Input
                    type="number"
                    name="bufferSolMediaPoured"
                    value={formData.bufferSolMediaPoured}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td rowSpan={4}>
                  <Input
                    type="number"
                    name="bufferSolQuantityUsed"
                    value={formData.bufferSolQuantityUsed}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td rowSpan={4}>
                  <Input
                    type="number"
                    name="bufferSolRemainingQuantiy"
                    value={formData.bufferSolRemainingQuantiy}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td rowSpan={4}>
                  <Input
                    name="bufferSolRemarks"
                    value={formData.bufferSolRemarks}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}

                    // style={{height:'100%'}}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  KH2PO4
                </td>
                <td>
                  <Input
                    type="text"
                    name="kh2po4MediaWeight"
                    value={formData.kh2po4MediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="kh2po4DistilledWater"
                    value={formData.kh2po4DistilledWater}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="kh2po4MediaQuantity"
                    value={formData.kh2po4MediaQuantity}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                    min={0}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Peptone Water</td>
                <td>
                  <Input
                    type="text"
                    name="peptoneWaterMediaWeight"
                    value={formData.peptoneWaterMediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="peptoneWaterDistilledWater"
                    value={formData.peptoneWaterDistilledWater}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="peptoneWaterMediaQuantity"
                    value={formData.peptoneWaterMediaQuantity}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                    min={0}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Tween 80</td>
                <td>
                  <Input
                    type="text"
                    name="tween80MediaWeight"
                    value={formData.tween80MediaWeight}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    min={0}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="tween80DistilledWater"
                    value={formData.tween80DistilledWater}
                    onChange={handleChange}
                    onKeyDown={handleNumberKeyDown}
                    disabled={isFieldsDisabled}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    name="tween80MediaQuantity"
                    value={formData.tween80MediaQuantity}
                    onChange={handleChange}
                    disabled={isFieldsDisabled}
                    onKeyDown={handleKeyDown}
                    min={0}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          {/* <Reviews /> */}
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0.5rem" }}>Prepared By</th>
                <th style={{ padding: "0.5rem" }}>Verified By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  <div>
                    <div>{formData.microbiologist_sign}</div>
                    <div>
                      {printDateFormat(formData.microbiologist_submit_on)}
                    </div>
                    <div>
                      {eSign.microbiologist_sign ? (
                        <img
                          src={eSign.microbiologist_sign}
                          alt="microbiologist_sign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                    <div>Micro-Biologist Sign</div>
                  </div>
                </td>
                <td style={{ padding: "0.5rem", textAlign: "center" }}>
                  <div>
                    <div>{formData.manager_sign}</div>
                    <div>{printDateFormat(formData.manager_submit_on)}</div>
                    <div>
                      {eSign.manager_sign ? (
                        <img
                          src={eSign.manager_sign}
                          alt="manager_sign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                    <div>QC-Manager/QA-Manager</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </TabPane>
      </Tabs>
      <div style={{ display: "flex" }}>
        {/* <Button
          type="primary"
          onClick={handleSave}
          style={{
            marginTop: '16px',
          }}
        >
          Save
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{
            marginTop: '16px',
            marginLeft: '8px',
          }}
        >
          Submit
        </Button> */}
      </div>
    </div>
  );
}
