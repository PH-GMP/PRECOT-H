/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import {
  InputNumber,
  Dropdown,
  Space,
  Input,
  Form,
  DatePicker,
  Button,
  Tabs,
  message,
  Tooltip,
  Modal,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import API from "../baseUrl.json";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { FaUserCircle } from "react-icons/fa";

const F006 = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { subbatch, bmrnos2, bmrnos3, formID } = location.state || {};

  const initialized = useRef(false);

  const handleBack = () => {
    navigate("/Precot/QualityControl/AR_F-014/Summary");
  };

  const formatName = "BRIQUETTES ANALYSIS REPORT";
  const formatNo = "PH-QCL01-AR-014";
  const revisionNo = "05";
  const sopNo = "PH-QCL01-D-05";
  const unit = "Unit H";

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");

  const [disable, setDisable] = useState({
    physicalAndChemicalTests: role === "ROLE_CHEMIST" ? false : true,
    microbiologist: role === "ROLE_MICROBIOLOGIST" ? false : true,
  });

  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });

  const [form] = Form.useForm();
  const { TabPane } = Tabs;

  const onFinish = (values) => {
    console.log("Form values: ", values);
  };

  const [dropdownValues, setDropdownValues] = useState({
    test1: "SELECT",
    test2: "SELECT",
    test3: "SELECT",
    test4: "SELECT",
    test5: "SELECT",
    test6: "SELECT",
  });

  const [payload, setPayload] = useState({
    test_id: null,
    format: "",
    format_no: "",
    ref_sop_no: "",
    unit: "",
    s_no: "",
    date: "",
    an_re_number: "",
    an_re_number_b: "",
    supplier_name: bmrnos3,
    invoice_no: "",

    ashContent1FlWtObr: "",
    ashContent1IlWtObr: "",
    ashContent1BaObr: "",
    ashContent1ResObr: "",

    ashContent2FlWtObr: "",
    ashContent2IlWtObr: "",
    ashContent2BaObr: "",
    ashContent2ResObr: "",
    remarks1: "",
    moisture1FlWtObr: "",
    moisture1IlWtObr: "",
    moisture1XyObr: "",
    moisture1ResObr: "",

    moisture2FlWtObr: "",
    moisture2IlWtObr: "",
    moisture2XyObr: "",
    moisture2ResObr: "",

    remarks: "",
    qc_status: "",

    status: "",
    revision_no: "",
    chemist_status: "",
    chemist_saved_on: null,
    chemist_saved_by: "",
    chemist_saved_id: 1,
    chemist_submit_on: null,
    chemist_submit_by: "",
    chemist_submit_id: "",
    chemist_sign: "",
    hod_status: "",
    hod_submit_on: null,
    hod_submit_by: null,
    hod_submit_id: "",
    hod_sign: "",
    reason: "",
    report_date: "",
    tested_by: "",
    tested_sign: "",
    tested_sign_date: "",
    approved_by: "",
    approved_sign: "",
    approved_date: null,
  });

  // const statusFunction = (responseData) => {
  //   console.log("stat", responseData);

  //   if (
  //     role == "ROLE_CHEMIST" &&
  //     responseData.chemist_status == "CHEMIST_APPROVED"
  //   ) {
  //     setStatus((formStatus) => ({
  //       ...formStatus,
  //       saveStatus: true,
  //       submitStatus: true,
  //     }));
  //   }

  //   if (
  //     role == "ROLE_CHEMIST" &&
  //     responseData.chemist_status == "CHEMIST_APPROVED" &&
  //     (responseData.microbiologist_status == "MICROBIOLOGIST_APPROVED" ||
  //       responseData.microbiologist_status == "MICROBIOLOGIST_SAVED" ||
  //       responseData.microbiologist_status == "") &&
  //     (responseData.qc_status == "QC_APPROVED" ||
  //       responseData.qc_status == "QA_APPROVED" ||
  //       responseData.qc_status == "WAITING_FOR_APPROVAL" ||
  //       responseData.qc_status == "")
  //   ) {
  //     console.log("Entered");
  //     setStatus((formStatus) => ({
  //       ...formStatus,
  //       saveStatus: true,
  //       submitStatus: true,
  //       fieldStatus: true,
  //     }));
  //   }
  //   if (
  //     role == "ROLE_MICROBIOLOGIST" &&
  //     (responseData.qc_status == "QA_REJECTED" ||
  //       responseData.qc_status == "QC_REJECTED")
  //   ) {
  //     message.warning("Chemist Yet To Approve");
  //     setTimeout(() => {
  //       navigate("/Precot/QualityControl/AR_F-014/Summary");
  //     }, 1000);
  //     setStatus((formStatus) => ({
  //       ...formStatus,
  //       submitStatus: true,
  //     }));
  //   }
  //   if (
  //     role == "ROLE_MICROBIOLOGIST" &&
  //     responseData.microbiologist_status == "MICROBIOLOGIST_APPROVED" &&
  //     (responseData.qc_status == "QC_APPROVED" ||
  //       responseData.qc_status == "QA_APPROVED" ||
  //       responseData.qc_status == "WAITING_FOR_APPROVAL")
  //   ) {
  //     setStatus((formStatus) => ({
  //       ...formStatus,
  //       saveStatus: true,
  //       submitStatus: true,
  //     }));
  //   }
  //   if (
  //     role == "ROLE_MICROBIOLOGIST" &&
  //     responseData.microbiologist_status == "MICROBIOLOGIST_REJECTED"
  //   ) {
  //     message.warning("Chemist Yet To Approve");
  //     setTimeout(() => {
  //       navigate("/Precot/QualityControl/AR_F-014/Summary");
  //     }, 1000);
  //     setStatus((formStatus) => ({
  //       ...formStatus,
  //       saveStatus: true,
  //       submitStatus: true,
  //     }));
  //   }
  //   if (
  //     (role == "QA_MANAGER" || role == "QC_MANAGER") &&
  //     responseData.microbiologist_status == ""
  //   ) {
  //     message.warning("QA Executive Yet To Approve");
  //     setTimeout(() => {
  //       navigate("/Precot/QualityControl/AR_F-014/Summary");
  //     }, 1000);
  //   }
  //   if (
  //     (role == "QA_MANAGER" || role == "QC_MANAGER") &&
  //     (responseData.qc_status == "QC_APPROVED" ||
  //       responseData.qc_status == "QA_APPROVED")
  //   ) {
  //     setStatus((formStatus) => ({
  //       ...formStatus,
  //       saveStatus: true,
  //       submitStatus: true,
  //     }));
  //   }
  //   if (
  //     (role == "QA_MANAGER" || role == "QC_MANAGER") &&
  //     (responseData.qc_status == "QC_REJECTED" ||
  //       responseData.qc_status == "QA_REJECTED")
  //   ) {
  //     message.warning("Chemist Yet To Approve");
  //     setTimeout(() => {
  //       navigate("/Precot/QualityControl/AR_F-014/Summary");
  //     }, 1000);
  //     setStatus((formStatus) => ({
  //       ...formStatus,
  //       saveStatus: true,
  //       submitStatus: true,
  //     }));
  //   }
  // };

  const statusFunction = (data) => {
    if (role == "ROLE_CHEMIST" && data.chemist_status == "CHEMIST_APPROVED") {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_CHEMIST" &&
      data.chemist_status == "CHEMIST_APPROVED" &&
      (data.qc_status == "WAITING_FOR_APPROVAL" ||
        data.qc_status == "QA_APPROVED" ||
        data.qc_status == "QC_APPROVED" ||
        data.qc_status == "" ||
        data.qc_status == null)
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      data.micro_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      data.micro_status == "MICROBIOLOGIST_APPROVED" &&
      (data.qc_status == "WAITING_FOR_APPROVAL" ||
        data.qc_status == "QA_APPROVED" ||
        data.qc_status == "QC_APPROVED" ||
        data.qc_status == "" ||
        data.qc_status == null)
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      data.chemist_status != "CHEMIST_APPROVED"
    ) {
      message.warning("Chemist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/AR_F-014/Summary");
      }, 1000);
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (data.qc_status == "QA_APPROVED" || data.qc_status == "QC_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (data.qc_status == "QC_REJECTED" || data.qc_status == "QA_REJECTED")
    ) {
      message.warning("Chemist  Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/AR_F-014/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };
  const handleSelectText = (e) => {
    if (
      !/[0-9._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  //API
  useEffect(() => {
    if (!initialized.current) {
      if (
        role == "ROLE_MICROBIOLOGIST" ||
        role == "QA_MANAGER" ||
        role == "QC_MANAGER"
      ) {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }

      initialized.current = true;

      console.log("Mill batch No ", bmrnos2);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (bmrnos2) {
        axios
          .get(`${    API.prodUrl}/Precot/api/chemicaltest/ARF014/${bmrnos2}`, {
            headers,
          })
          .then((response) => {
            if (response.data) {
              console.log(" Response", response.data);
              statusFunction(response.data);
              setPayload(response.data);

              if (response.data.chemist_status === "CHEMIST_APPROVED") {
                disable.physicalAndChemicalTests = true;
              }
              if (
                response.data.microbiologist_status ===
                "MICROBIOLOGIST_APPROVED"
              ) {
                disable.physicalAndChemicalTests = true;
              }
            } else {
              console.log(" Response", response.data);
              console.log("invoice", bmrnos2);
              console.log("supplier", bmrnos3);
              setPayload({
                ...payload,
                invoice_no: bmrnos2,
                supplier_name: bmrnos3,
              });
            }
          })
          .catch((err) => {
            console.log("invoice", bmrnos2);
            console.log("supplier", bmrnos3);
            setPayload({
              ...payload,
              invoice_no: bmrnos2,
              supplier_name: bmrnos3,
            });
          });
      } else {
        axios
          .get(`${    API.prodUrl}/Precot/api/chemicaltest/ARF014/Id/${formID}`, {
            headers,
          })
          .then((response) => {
            console.log(" Response", response.data);
            setPayload(response.data);
            const responseData = response.data;
            if (responseData.chemist_status === "CHEMIST_APPROVED") {
              disable.physicalAndChemicalTests = true;
            }
            if (responseData.qc_status === "QC_REJECTED") {
              disable.physicalAndChemicalTests = false;
            }
            if (
              responseData.microbiologist_status === "MICROBIOLOGIST_APPROVED"
            ) {
              disable.physicalAndChemicalTests = true;
            }
            statusFunction(responseData);
          })
          .catch((err) => {});
      }
    }
  }, []);
  //

  const calculateAndUpdate = (key, key2, A, B) => {
    if (key === "moisture1" || key === "moisture2") {
      const difference = A - B;
      const result = (difference * 100) / A;
      setPayload((prevPayload) => {
        const updatedTest = { ...prevPayload };
        updatedTest[`${key}FlWtObr`] = B;
        updatedTest[`${key}IlWtObr`] = A;
        updatedTest[`${key}${key2}Obr`] = difference || 0;
        updatedTest[`${key}ResObr`] = result || 0;
        return updatedTest;
      });
    } else {
      const difference = B - A;
      const result = (difference * 100) / 5;
      setPayload((prevPayload) => {
        const updatedTest = { ...prevPayload };
        updatedTest[`${key}FlWtObr`] = B;
        updatedTest[`${key}IlWtObr`] = A;
        updatedTest[`${key}${key2}Obr`] = difference || 0;
        updatedTest[`${key}ResObr`] = result || 0;

        return updatedTest;
      });
    }
  };

  const handleChangeA = (key, key2, value) => {
    const B = payload[`${key}FlWtObr`];
    calculateAndUpdate(key, key2, value, B);
  };

  const handleChangeB = (key, key2, value) => {
    const A = payload[`${key}IlWtObr`];
    calculateAndUpdate(key, key2, A, value);
  };

  const createHandleDateChange = (key) => (date, dateString) => {
    handleChange(key, dateString);
  };

  //Signature Images
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  useEffect(() => {
    const username1 = payload?.chemist_sign;
    const username2 = payload?.qc_sign;
    const username3 = payload?.microbiologist_sign;
    let valid = 0;

    // console.log("usernameparams", username);

    axios
      .get(`${    API.prodUrl}/Precot/api/Format/Service/image?username=${username1}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer",
      })
      .then((res) => {
        console.log("Response:", res.data);
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64}`;
        setGetImage(url); // Update the image URL state
        valid += 1;
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });

    axios
      .get(`${    API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer",
      })
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

        valid += 1;
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });

    axios
      .get(`${    API.prodUrl}/Precot/api/Format/Service/image?username=${username3}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer",
      })
      .then((res) => {
        console.log("Response:", res.data);
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64}`;
        setGetImage2(url);

        valid += 1;
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });
  }, [payload]);

  console.log("43", payload.qc_status);

  const updatePayload = (keyword, value, payload) => {
    const keys = keyword
      .replace(/\[(\d+)\]/g, ".$1") // Convert array indices to dot notation
      .split("."); // Split the keyword into individual keys

    const deepClone = (obj) => JSON.parse(JSON.stringify(obj)); // Clone the payload to avoid mutation
    const newPayload = deepClone(payload);

    let nestedPayload = newPayload;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!nestedPayload[key]) {
        nestedPayload[key] = {}; // Create the key if it doesn't exist
      }
      nestedPayload = nestedPayload[key];
    }

    nestedPayload[keys[keys.length - 1]] = value; // Set the final key's value

    return newPayload;
  };

  const handleChange = (keyword, value) => {
    const updatedPayload = updatePayload(keyword, value, payload);
    setPayload(updatedPayload);
  };

  const handleRemarksChange = (value) => {
    setPayload({
      ...payload,
      remarks1: value,
    });
  };

  const handleSave = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF014/save/briquettesanalysisreportARF014`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Saved Successfully");
        // setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/AR_F-014/Summary");
        }, 2000);
      })
      .catch((error) => {
        // message.error(error.response.data.message);
        // setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    // List of mandatory fields
    const mandatoryFields = [
      "ashContent1FlWtObr",
      "ashContent1IlWtObr",
      "moisture1FlWtObr",
      "moisture1IlWtObr",
      "date",
      "an_re_number",
      "supplier_name",
      "invoice_no",
      // "ashContent2FlWtObr",
      // "ashContent2IlWtObr",
      // "moisture2FlWtObr",
      // "moisture2IlWtObr",
      // "report_date",
      // "an_re_number_b",
    ];

    // Check if any mandatory field is empty
    for (let field of mandatoryFields) {
      if (!payload[field]) {
        message.error(`${field} is mandatory.`);
        return; // Prevent submission if any mandatory field is empty
      }
    }

    const updatedPayload = { ...payload };

    if (!updatedPayload.remarks || updatedPayload.remarks === "") {
      updatedPayload.remarks = "N/A";
    }

    if (!updatedPayload.remarks1 || updatedPayload.remarks1 === "") {
      updatedPayload.remarks1 = "N/A";
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF014/Submit/briquettesanalysisreportARF014`,
        updatedPayload, // Use the updated payload
        { headers }
      )
      .then((response) => {
        message.success("Submitted Successfully");
        // setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/AR_F-014/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        // setSaveLoading(false);
      });
  };

  const handleApprove = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF014/approve`,
        {
          id: payload.test_id,
          status: "Approve",
        },
        { headers }
      )
      .then((response) => {
        message.success("Approved Successfully");

        setTimeout(() => {
          navigate("/Precot/QualityControl/AR_F-014/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const handleReject = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF014/approve`,
        {
          id: payload.test_id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((response) => {
        message.success("Rejected Successfully");
        // setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/AR_F-014/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        // setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const getDropdownItems = (dropdownKey) => [
    {
      key: "1",
      label: <a onClick={() => handleChange(dropdownKey, "PASS")}>Pass</a>,
    },
    {
      key: "2",
      label: <a onClick={() => handleChange(dropdownKey, "FAIL")}>Fail</a>,
    },
    {
      key: "3",
      label: (
        <a onClick={() => handleChange(dropdownKey, "PASSED UNDER DEVIATION")}>
          PASSED UNDER DEVIATION
        </a>
      ),
    },
  ];

  const getDropdownItems1 = (dropdownKey) => [
    {
      key: "1",
      label: (
        <a onClick={() => handleChange(dropdownKey, "Present")}>Present</a>
      ),
    },
    {
      key: "2",
      label: <a onClick={() => handleChange(dropdownKey, "Absent")}>Absent</a>,
    },
  ];

  const getDropdownItems2 = (dropdownKey) => [
    {
      key: "1",
      label: (
        <a onClick={() => handleChange(dropdownKey, "Accepted")}>Accepted</a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => handleChange(dropdownKey, "Rejected")}>Rejected</a>
      ),
    },
  ];

  const tableStyle = {
    borderCollapse: "collapse",
    width: "90%",
    marginBottom: "2%",
  };

  const cellStyle = {
    textAlign: "center",
    verticalAlign: "middle",
    padding: "4px",
    fontSize: "12px",
  };

  const cellStyle1 = {
    padding: "4px",
    fontSize: "12px",
  };

  const headerStyle = {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  function callback(key) {
    console.log(key);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <Input
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <BleachingHeader
          unit={unit}
          formName={formatName}
          formatNo={formatNo}
          // MenuBtn={
          //   <Button
          //     type="primary"
          //     icon={<TbMenuDeep />}
          //     onClick={showDrawer}
          //   ></Button>
          // }
          buttonsArray={[
            role === "QC_MANAGER" ||
            role === "ROLE_DESIGNEE" ||
            role === "QA_MANAGER" ? (
              <>
                <Button
                  // loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    // display: canDisplayButtons(),
                    // display: submitBtnStatus ? "block" : "none",
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
                  // loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    // display: canDisplayButtons(),
                    // display: submitBtnStatus ? "block" : "none",
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
                  // loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: status.saveStatus ? "none" : "flex",
                  }}
                  onClick={handleSave}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  &nbsp;Save
                </Button>

                <Button
                  // loading={submitLoading}
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
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div>
            <label>Supplier Name</label>
            <Input disabled value={payload.supplier_name} />
          </div>

          <div>
            <label>Invoice No</label>
            <Input disabled value={payload.invoice_no} />
          </div>
        </div>
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Tabs defaultActiveKey="1" onChange={callback} style={{ width: "90%" }}>
          <TabPane tab="Physical and Chemical Test 1" key="1">
            <>
              <table style={tableStyle}>
                <tbody>
                  <tr style={headerStyle}>
                    <td rowspan="2" width="35" style={cellStyle}>
                      <p>
                        <strong>S.No.</strong>
                      </p>
                    </td>
                    <td rowspan="2" width="100" style={cellStyle}>
                      <p>
                        <strong>DATE</strong>
                      </p>
                    </td>
                    <td rowspan="2" width="48" style={cellStyle}>
                      <p>
                        <strong>ANALYTICAL </strong>
                        <strong>REFERENCE NUMBER</strong>
                      </p>
                    </td>
                    {/* <td rowspan="2" width="65" style={cellStyle}>
<p><strong>SUPPLIER NAME</strong></p>
</td>
<td rowspan="2" width="74" style={cellStyle}>
<p><strong>INVOICE . No</strong></p>
</td> */}
                    <td colspan="4" width="324" style={cellStyle}>
                      <p>
                        <strong>Specification </strong>
                      </p>
                    </td>

                    <td rowspan="2" width="100" style={cellStyle}>
                      <p>
                        <strong>REMARKS</strong>
                      </p>
                    </td>
                  </tr>
                  <tr style={headerStyle}>
                    <td colspan="2" width="160" style={cellStyle}>
                      <p>
                        <strong>ASH CONTENT % &lt; 10.0</strong>
                      </p>
                    </td>
                    <td colspan="2" width="163" style={cellStyle}>
                      <p>
                        <strong>MOISTURE % &lt; 12.0</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="4" width="35" style={cellStyle}>
                      <p>1.</p>
                    </td>
                    <td rowspan="4" width="66" style={cellStyle}>
                      <p>
                        <DatePicker
                          disabledDate={(current) =>
                            current.isAfter(moment(), "day")
                          }
                          style={{ width: "100%" }}
                          disabled={status.fieldStatus}
                          // disabled={status.fieldStatus}
                          onChange={createHandleDateChange("date")}
                          value={payload.date && moment(payload.date)}
                        />
                      </p>
                    </td>
                    <td rowspan="4" width="48" style={cellStyle}>
                      <p>
                        <InputNumber
                          readOnly={status.fieldStatus}
                          onChange={(value) =>
                            handleChange("an_re_number", value)
                          }
                          value={payload.an_re_number}
                        />
                      </p>
                    </td>

                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>FINAL Wt.(g)-B</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          // max={10}
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 9.99) {
                              message.error("Value can exceed only <10");
                              
                               
                            } else {
                              handleChangeB("ashContent1", "Ba", value);
                            }
                          }}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                          value={payload.ashContent1FlWtObr}
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>INITIAL Wt.(g)-X</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber
                          defaultValue=""
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 11.99) {
                              message.error("Value can exceed only <12");
                              
                            } else {
                              handleChangeA("moisture1", "Xy", value);
                            }
                          }}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                          value={payload.moisture1IlWtObr}
                        />
                      </p>
                    </td>

                    <td rowspan="4" width="68" style={cellStyle}>
                      <p>
                        <Dropdown
                          menu={{
                            items: getDropdownItems("remarks"),
                          }}
                          disabled={status.fieldStatus}
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              {payload.remarks}
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>INITIAL Wt.(g)-A</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          // max={10}
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 9.99) {
                              message.error("Value can exceed only <10");
                               
                            } else {
                              handleChangeA("ashContent1", "Ba", value);
                            }
                          }}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                          value={payload.ashContent1IlWtObr}
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>FINAL Wt.(g)-Y</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 11.99) {
                              message.error("Value can exceed only <12");
                              
                            } else {
                              handleChangeB("moisture1", "Xy", value);
                            }
                          }}
                          value={payload.moisture1FlWtObr}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                        />
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>[FINAL - INITIAL].Wt(g)B-A</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          value={payload.ashContent1BaObr}
                          disabled
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>[INITIAL- FINAL].Wt(g)</strong>
                        <strong>&nbsp;</strong>
                        <strong>X-Y</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber value={payload.moisture1XyObr} disabled />
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>RESULTS (%) &nbsp;[(B-A)&times;100]/5</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          value={payload.ashContent1ResObr}
                          disabled
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>RESULTS (%) &nbsp;[(X-Y)&times;100]/X</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber value={payload.moisture1ResObr} disabled />
                      </p>
                    </td>
                  </tr>
                  {/* nfn */}
                  {/* <tr>
                    <td rowspan="4" width="35" style={cellStyle}>
                      <p>2.</p>
                    </td>
                    <td rowspan="4" width="66" style={cellStyle}>
                      <p>
                        <DatePicker
                          disabledDate={(current) =>
                            current.isAfter(moment(), "day")
                          }
                          style={{ width: "100%" }}
                          disabled={status.fieldStatus}
                          onChange={createHandleDateChange("report_date")}
                          value={
                            payload.report_date && moment(payload.report_date)
                          }
                        />
                      </p>
                    </td>
                    <td rowspan="4" width="48" style={cellStyle}>
                      <p>
                        <InputNumber
                          readOnly={status.fieldStatus}
                          onChange={(value) =>
                            handleChange("an_re_number_b", value)
                          }
                          value={payload.an_re_number_b}
                        />
                      </p>
                    </td>
                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>FINAL Wt.(g)-B</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          // max={10}
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 9.99) {
                              message.error("Value can exceed only <10");
                              payload.ashContent2FlWtObr = "";
                              handleChangeB("ashContent2", "Ba", null);
                            } else {
                              handleChangeB("ashContent2", "Ba", value);
                            }
                          }}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                          value={payload.ashContent2FlWtObr}
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>INITIAL Wt.(g)-X</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber
                          defaultValue=""
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 11.99) {
                              message.error("Value can exceed only <12");
                              handleChangeA("moisture2", "Xy", null);
                            } else {
                              handleChangeA("moisture2", "Xy", value);
                            }
                          }}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                          value={payload.moisture2IlWtObr}
                        />
                      </p>
                    </td>

                    <td rowspan="4" width="68" style={cellStyle}>
                      <p>
                        <Input
                          value={payload.remarks1}
                          onChange={(e) => handleRemarksChange(e.target.value)}
                          readOnly={status.fieldStatus}
                        />
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>INITIAL Wt.(g)-A</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          // max={10}
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 9.99) {
                              message.error("Value can exceed only <10");
                              payload.ashContent2IlWtObr = "";
                              handleChangeA("ashContent2", "Ba", null);
                            } else {
                              handleChangeA("ashContent2", "Ba", value);
                            }
                          }}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                          value={payload.ashContent2IlWtObr}
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>FINAL Wt.(g)-Y</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber
                          step={0.1}
                          readOnly={status.fieldStatus}
                          onChange={(value) => {
                            if (value > 11.99) {
                              message.error("Value can exceed only <12");
                              payload.moisture2FlWtObr = "";
                              handleChangeB("moisture2", "Xy", null);
                            } else {
                              handleChangeB("moisture2", "Xy", value);
                            }
                          }}
                          value={payload.moisture2FlWtObr}
                          onKeyDown={(e) => {
                            handleSelectText(e);
                          }}
                        />
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>[FINAL - INITIAL].Wt(g)B-A</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          value={payload.ashContent2BaObr}
                          disabled
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>[INITIAL- FINAL].Wt(g)</strong>
                        <strong>&nbsp;</strong>
                        <strong>X-Y</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber value={payload.moisture2XyObr} disabled />
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="85" style={cellStyle}>
                      <p>
                        <strong>RESULTS (%) &nbsp;[(B-A)&times;100]/5</strong>
                      </p>
                    </td>
                    <td width="74" style={cellStyle}>
                      <p>
                        <InputNumber
                          value={payload.ashContent2ResObr}
                          disabled
                        />
                      </p>
                    </td>
                    <td width="82" style={cellStyle}>
                      <p>
                        <strong>RESULTS (%) &nbsp;[(X-Y)&times;100]/X</strong>
                      </p>
                    </td>
                    <td width="81" style={cellStyle}>
                      <p>
                        <InputNumber value={payload.moisture2ResObr} disabled />
                      </p>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </>
          </TabPane>

          <TabPane tab="Review" key="5">
            <table style={tableStyle}>
              <thead>
                <tr style={headerStyle}>
                  <th style={cellStyle}>Chemical Tested By</th>

                  <th style={cellStyle}>Approved By</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {" "}
                {/* Adjust the font size here */}
                <tr>
                  <td style={cellStyle}>
                    {payload.chemist_submit_on && payload.chemist_sign && (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className="signature"
                          src={getImage}
                          alt="Chemist"
                          style={{ width: "20%", height: "auto" }}
                        />
                        :&nbsp; {payload.chemist_sign}&nbsp;
                        {moment(payload.chemist_submit_on).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </div>
                    )}
                  </td>

                  <td style={cellStyle}>
                    {payload.qc_submit_on && payload.qc_sign && (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className="signature"
                          src={getImage1}
                          alt="QC"
                          style={{ width: "20%", height: "auto" }}
                        />
                        :&nbsp; {payload.qc_sign}&nbsp;
                        {moment(payload.qc_submit_on).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default F006;
