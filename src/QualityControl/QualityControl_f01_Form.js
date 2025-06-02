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
  Row,
  Col,
  Select,
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
import { TbMenuDeep } from "react-icons/tb";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { FaUserCircle } from "react-icons/fa";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f01_Form = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { subbatch, bmrnos2, formID } = location.state || {};

  const [payload, setPayload] = useState({
    millBatchNo: bmrnos2,
    formatNo: "PH-QCL01-AR-F-001",
    // millBatchNo: "SAP/(PH)202407",
    revisionNo: "05",
    formatName: "Raw Cotton Analysis Report",
    refSopNo: "PH-QCL01-D-05",
    physicalAndChemicalTests: [
      {
        id: null,
        rawCottenAnalysisId: "",
        supplier: "",
        station: "",
        billOrInvoiceNo: "",
        dateOfReceipt: "",
        testedDate: "",
        arNo: "",
        cottonVaritey: "",
        noOfBale: "",
        quantity: "",
        sampleSize: "",
        identificationTestObsr: "",
        identificationTestRmrk: "",
        micronaireValueObsra: "",
        micronaireValueObsrb: "",
        micronaireValueObsrc: "",
        micronaireValueObsrd: "",
        micronaireValueObsr: null,

        micronaireValueRmrk: "",
        avarageLengthObsr: "",
        avarageLengthRmrk: "",
        nepsObsr: "",
        nepsRmrk: "",
        upperQuartileLengthObsra: "",
        upperQuartileLengthObsrb: "",
        upperQuartileLengthObsrc: "",
        upperQuartileLengthObsrd: "",

        upperQuartileLengthObsr: "",
        upperQuartileLengthRmrk: "",
        lengthByWeightObsr: "",
        lengthByWeightRmrk: "",
        lengthByNoObsr: "",
        lengthByNoRmrk: "",
        shortFiberCntByWtObsr: "",
        shortFiberContentByWtRmrk: "",
        shortFiberContentByNoObsr: "",
        shortFiberContentByNoRmrk: "",
        whitenessIndicesObsr: "",
        whitenessIndicesRmrk: "",
        flourescenceObsr: "",
        flourescenceRmrk: "",
        ashContentFlWtObsr: "",
        ashContentIlWtObsr: "",
        ashContentFrBAObsr: "",
        ashContentFrResObsr: "",
        ashContentRmrk: "",
        eitherSolSubFlWtObsr: "",
        eitherSolSubIlWtObsr: "",
        eitherSolSubFrYXObsr: "",
        eitherSolSubFrResObsr: "",
        eitherSolSubRmrk: "",
        moistureContentIlWtObsr: "",
        moistureContentFlWtObsr: "",
        moistureContentFrKlObsr: "",
        moistureContentFrResObsr: "",
        moistureContentRmrk: "",
        trashCottonWtMObsr: "",
        trashTrashWtNObsr: "",
        trashResObsr: "",
        trashRemark: "",
        finalRemark: "",
        lotStatus: "",
        lotStatusAccepted: "",
        lotStatusAcceptedUnderDeviation: "",
        lotStatusRejected: "",
      },
    ],
    microbiologicalTests: [
      {
        id: null,
        rawCottenAnalysisId: "",
        sampledOn: "",
        testedOrIncubationStartOn: "",
        totalViableCount: "",
        totalFungalCount: "",
        coliform: "",
        ecoli: "",
        saur: "",
        paer: "",
        sal: "",
        testCompletionDate: "",
        remark: "",
        product: "",
      },
    ],
  });

  // Function to calculate average and set payload
  const calculateAverage = (micronaireValues) => {
    const total = micronaireValues.reduce(
      (sum, val) => sum + (parseFloat(val) || 0),
      0
    );
    const average = total / micronaireValues.length;

    return average.toFixed(2); // Return the calculated average as a string
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;

    setPayload((prev) => {
      const updatedTest = {
        ...prev.physicalAndChemicalTests[0],
        [fieldName]: value,
      };

      // Calculate average after updating the relevant field
      const micronaireValues = [
        updatedTest.micronaireValueObsra,
        updatedTest.micronaireValueObsrb,
        updatedTest.micronaireValueObsrc,
        updatedTest.micronaireValueObsrd,
      ];

      const average = calculateAverage(micronaireValues);

      return {
        ...prev,
        physicalAndChemicalTests: [
          {
            ...updatedTest,
            micronaireValueObsr: average, // Set the calculated average
          },
        ],
      };
    });
  };

  const calculateAverage1 = (qulValues) => {
    const total = qulValues.reduce(
      (sum, val) => sum + (parseFloat(val) || 0),
      0
    );
    const average = total / qulValues.length;

    return average.toFixed(2); // Return the calculated average as a string
  };

  const handleInputChange1 = (e, fieldName) => {
    const { value } = e.target;

    setPayload((prev) => {
      const updatedTest = {
        ...prev.physicalAndChemicalTests[0],
        [fieldName]: value,
      };

      // Calculate average after updating the relevant field
      const uqleValues = [
        updatedTest.upperQuartileLengthObsra,
        updatedTest.upperQuartileLengthObsrb,
        updatedTest.upperQuartileLengthObsrc,
        updatedTest.upperQuartileLengthObsrd,
      ];

      const average = calculateAverage1(uqleValues);

      return {
        ...prev,
        physicalAndChemicalTests: [
          {
            ...updatedTest,
            upperQuartileLengthObsr: average, // Set the calculated average
          },
        ],
      };
    });
  };

  //Signature Images
  const [printData, setPrintData] = useState([]);

  const [roleFunction, setRoleFunction] = useState("");
  console.log("rolee", roleFunction);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const [tabNo, setTabNo] = useState("1");
  const [statusLoader, setStatusLoader] = useState(false);
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [open, setOpen] = useState(false);
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
  const [eSign, setESign] = useState({
    chemist_sign: "",
    microbiologist_sign: "",
    qc_sign: "",
  });

  // useEffect(() => {
  //   if (
  //     payload.physicalAndChemicalTests[0]?.ashContentFrResObsr > 1.5 &&
  //     tabNo === "3"
  //   ) {
  //     message.warning("AshContentFr Obsr Result value more than 1.5");
  //   }
  // }, [payload.physicalAndChemicalTests[0]?.ashContentFrResObsr, tabNo]);

  // useEffect(() => {
  //   if (
  //     payload.physicalAndChemicalTests[0]?.eitherSolSubFrResObsr > 0.75 &&
  //     tabNo === "3"
  //   ) {
  //     message.warning("EitherSolSubFr Obsr Result value more than 0.75");
  //   }
  // }, [payload.physicalAndChemicalTests[0]?.eitherSolSubFrResObsr, tabNo]);

  // useEffect(() => {
  //   if (
  //     payload.physicalAndChemicalTests[0]?.moistureContentFrResObsr > 8.0 &&
  //     tabNo === "4"
  //   ) {
  //     message.warning("MoistureContentFr Obsr Result value more than 8.0");
  //   }
  // }, [payload.physicalAndChemicalTests[0]?.moistureContentFrResObsr, tabNo]);

  // useEffect(() => {
  //   if (
  //     payload.physicalAndChemicalTests[0]?.trashResObsr > 3.5 &&
  //     tabNo === "4"
  //   ) {
  //     message.warning("Trash Obsr Result value more than 3.5");
  //   }
  // }, [payload.physicalAndChemicalTests[0]?.trashResObsr, tabNo]);

  const LotLov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
    { value: "Accepted Under Deviation", label: "Accepted Under Deviation" },
    { value: "On Hold", label: "On Hold" },
  ];

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "microbiologist_sign", "qc_sign"];
    signatureKeys.forEach((key) => {
      const username = payload[key];
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [
    token,
    payload.chemist_sign,
    payload.microbiologist_sign,
    payload.qc_sign,
  ]);

  useEffect(() => {
    if (role == "ROLE_MICROBIOLOGIST") {
      setTabNo("7");
    }
  }, [role]);

  // Separate function to handle changes to avarageLengthObsr
  const handleChangeAvarageLengthObsr = (index, value) => {
    setPayload((prevPayload) => {
      const updatedTests = [...prevPayload.physicalAndChemicalTests];
      updatedTests[index].avarageLengthObsr = value;
      return {
        ...prevPayload,
        physicalAndChemicalTests: updatedTests,
      };
    });
  };

  // Function to handle onBlur validations for avarageLengthObsr
  const handleBlurAvarageLengthObsr = (index, value) => {
    const firstNumber = parseFloat(value.split("-")[0]);

    if (!isNaN(firstNumber)) {
      if (firstNumber < 8) {
        message.warning("Entered value is less than 8");
      }
    }
  };

  useEffect(() => {
    const username1 = payload?.chemist_sign;
    const username2 = payload?.qc_sign;
    const username3 = payload?.microbiologist_sign;
    let valid = 0;

    console.log("chemist sigh", payload?.chemist_sign);
    console.log("chemist qc", payload?.qc_sign);
    console.log("chemist micro", payload?.microbiologist_sign);

    // console.log("usernameparams", username);

    axios
      .get(
        `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username1}`,
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
        setGetImage(url); // Update the image URL state
        valid += 1;
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });

    axios
      .get(
        `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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

        valid += 1;
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });

    axios
      .get(
        `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username3}`,
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
        setGetImage2(url);

        valid += 1;
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });
  }, []);
  //

  const remarkLov = [
    { value: "Pass", label: "Pass" },
    { value: "Fail", label: "Fail" },
  ];

  const productLov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Accepted Under Deviation", label: "Accepted Under Deviation" },
    { value: "Rejected", label: "Rejected" },
  ];
  const product2Lov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
  ];
  const product3Lov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
    { value: "NA", label: "NA" },
  ];

  //Button Validation
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });

  const statusFunction = (responseData) => {
    console.log("stat", responseData);

    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }

    if (
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.microbiologist_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }

    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED" &&
      (responseData.qc_status == "QC_APPROVED" ||
        responseData.qc_status == "QA_APPROVED" ||
        responseData.qc_status == "WAITING_FOR_APPROVAL" ||
        responseData.qc_status == "")
    ) {
      console.log("Entered");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    // if (
    //   role == "ROLE_MICROBIOLOGIST" &&
    //   (responseData.qc_status == "QA_REJECTED" ||
    //     responseData.qc_status == "QC_REJECTED")
    // ) {
    //   message.warning("Chemist Yet To Approve");
    //   setTimeout(() => {
    //     navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
    //   }, 1000);
    //   setStatus((formStatus) => ({
    //     ...formStatus,
    //     submitStatus: true,
    //   }));
    // }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.microbiologist_status == "MICROBIOLOGIST_APPROVED" &&
      (responseData.qc_status == "QC_APPROVED" ||
        responseData.qc_status == "QA_APPROVED" ||
        responseData.qc_status == "WAITING_FOR_APPROVAL" ||
        responseData.qc_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }

    // if (
    //   (role == "QA_MANAGER" || role == "QC_MANAGER") &&
    //   responseData.microbiologist_status == ""
    // ) {
    //   message.warning("QA Executive Yet To Approve");
    //   setTimeout(() => {
    //     navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
    //   }, 1000);
    // }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.qc_status == "QC_APPROVED" ||
        responseData.qc_status == "QA_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.qc_status == "QC_REJECTED" ||
        responseData.qc_status == "QA_REJECTED")
    ) {
      message.warning("Chemist or Micro Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };
  useEffect(() => {
    console.log("Status", status);
  }, [status]);
  //

  //Common
  const formatName = "RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)";
  const formatNo = "PH-QCL01-AR-F-001";
  const revisionNo = "05";
  const sopNo = "PH-QCL01-D-05";
  const unit = "Unit H";

  const [millBatchNo, setMillBatchNo] = useState("");
  //

  //Field Validation
  const [disable, setDisable] = useState({
    physicalAndChemicalTests: role === "ROLE_CHEMIST" ? false : true,
    microbiologist: role === "ROLE_MICROBIOLOGIST" ? false : true,
  });
  //

  //Approve and Reject
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const handleReject = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/approveRawCottonAnalysisReport`,
        {
          id: payload.id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((response) => {
        message.success("Raw Cotton Analysis Report Rejected Successfully");
        // setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        // setSaveLoading(false);
      });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleRejectModal = () => {
    console.log("rejectmodal", "Button Click");
    setShowModal(true);
  };

  const handleApprove = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/approveRawCottonAnalysisReport`,
        {
          id: payload.id,
          status: "Approve",
        },
        { headers }
      )
      .then((response) => {
        message.success("Raw Cotton Analysis Report Approved Successfully");
        // setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        // setSaveLoading(false);
      });
  };

  const [physicalAndChemicalTests, setPhysicalAndChemicalTests] = useState([
    {
      supplier: "",
      station: "",
      billOrInvoiceNo: "",
      dateOfReceipt: "",
      testedDate: "",
      arNo: "",
      cottonVariety: "",
      noOfBale: "",
      quantity: "",
      sampleSize: "",
      identificationTestObsr: "",
      identificationTestRmrk: "",
      micronaireValueObsr: "",
      micronaireValueRmrk: "",
      avarageLengthObsr: "",
      avarageLengthRmrk: "",
      nepsObsr: "",
      nepsRmrk: "",
      upperQuartileLengthObsr: "",
      upperQuartileLengthRmrk: "",
      lengthByWeightObsr: "",
      lengthByWeightRmrk: "",
      lengthByNoObsr: "",
      lengthByNoRmrk: "",
      shortFiberCntByWtObsr: "",
      shortFiberContentByWtRmrk: "",
      shortFiberContentByNoObsr: "",
      shortFiberContentByNoRmrk: "",
      whitenessIndicesObsr: "",
      whitenessIndicesRmrk: "",
      flourescenceObsr: "",
      flourescenceRmrk: "",
      ashContentFlWtObsr: "",
      ashContentIlWtObsr: "",
      ashContentFrBAObsr: "",
      ashContentFrResObsr: "",
      ashContentRmrk: "",
      eitherSolSubFlWtObsr: "",
      eitherSolSubIlWtObsr: "",
      eitherSolSubFrYXObsr: "",
      eitherSolSubFrResObsr: "",
      eitherSolSubRmrk: "",
      moistureContentIlWtObsr: "",
      moistureContentFlWtObsr: "",
      moistureContentFrKlObsr: "",
      moistureContentFrResObsr: "",
      moistureContentRmrk: "",
      trashCottonWtMObsr: "",
      trashTrashWtNObsr: "",
      trashResObsr: "",
      trashRemark: "",
      finalRemark: "",
      lotStatus: "",
      lotStatusAccepted: "",
      lotStatusAcceptedUnderDeviation: "",
      lotStatusRejected: "",
    },
  ]);

  const { TabPane } = Tabs;

  useEffect(() => {
    if (role == "ROLE_MICROBIOLOGIST") {
      setTabNo("7");
    }
  }, [role]);

  //API calls for form values
  useEffect(() => {
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

    setMillBatchNo(bmrnos2);

    console.log("Mill batch No ", bmrnos2);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (bmrnos2) {
      axios
        .get(
          `${    API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetByMillBatchNo`,
          {
            headers,
            params: {
              millBatchNo: bmrnos2,
            },
          }
        )
        .then((response) => {
          if (!response.data.length == 0) {
            console.log(" Response", response.data);
            statusFunction(response.data[0]);
            setPayload(response.data[0]);
            setPrintData(response.data[0]);

            if (response.data[0].chemist_status === "CHEMIST_APPROVED") {
              disable.physicalAndChemicalTests = true;
            }
            if (
              response.data[0].microbiologist_status ===
              "MICROBIOLOGIST_APPROVED"
            ) {
              disable.microbiologist = true;
            }
            if (
              response.data[0].qc_status === "QA_REJECTED" ||
              response.data[0].qc_status === "QC_REJECTED"
            ) {
              if (role === "ROLE_MICROBIOLOGIST") {
                disable.microbiologist = false;
              } else if (role === "ROLE_CHEMIST") {
                disable.physicalAndChemicalTests = false;
              }
            }
          } else {
            console.log(" Response", response.data);

            axios
              .get(
                `${    API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetRawCottonReportByPdeData?PH=${bmrnos2}`,
                {
                  headers,
                }
              )
              .then((response) => {
                if (response.data.length > 0) {
                  console.log("Response", response.data);
                  // Extracting the first object from the response array
                  const responseData = response.data[0];
                  statusFunction(responseData);

                  // Setting the extracted values into the payload
                  setPayload((prevPayload) => ({
                    ...prevPayload, // Spread the existing payload
                    millBatchNo:
                      responseData.batchNo || prevPayload.millBatchNo,
                    date: responseData.date
                      ? moment(responseData.date).format("DD/MM/YYYY")
                      : prevPayload.date,
                    physicalAndChemicalTests: [
                      {
                        ...prevPayload.physicalAndChemicalTests[0],
                        supplier:
                          responseData.supplier ||
                          prevPayload.physicalAndChemicalTests[0].supplier,
                        billOrInvoiceNo:
                          responseData.invoice ||
                          prevPayload.physicalAndChemicalTests[0]
                            .billOrInvoiceNo,
                        station:
                          responseData.station ||
                          prevPayload.physicalAndChemicalTests[0].station,
                        noOfBale:
                          responseData.noofBales ||
                          prevPayload.physicalAndChemicalTests[0].noOfBale,
                        quantity:
                          responseData.weight ||
                          prevPayload.physicalAndChemicalTests[0].quantity,
                        // Add other mappings if necessary
                      },
                    ],
                  }));
                } else {
                  console.log("No data found in the response", response.data);
                }
              })
              .catch((err) => {
                console.error("Error fetching data", err);
              });
          }
        })
        .catch((err) => {});
    } else {
      axios
        .get(
          `${    API.prodUrl}/Precot/api/qc/RawCottonAnalysisReport/GetById/${formID}`,
          {
            headers,
          }
        )
        .then((response) => {
          console.log(" Response", response.data);
          setPayload(response.data);
          setRoleFunction(response.data.qc_status);
          const responseData = response.data;
          if (responseData.chemist_status === "CHEMIST_APPROVED") {
            disable.physicalAndChemicalTests = true;
          }
          if (
            responseData.microbiologist_status === "MICROBIOLOGIST_APPROVED"
          ) {
            disable.microbiologist = true;
          }

          if (
            responseData.qc_status === "QA_REJECTED" ||
            responseData.qc_status === "QC_REJECTED"
          ) {
            if (role === "ROLE_MICROBIOLOGIST") {
              disable.microbiologist = false;
            } else if (role === "ROLE_CHEMIST") {
              disable.physicalAndChemicalTests = false;
            }
          }
          statusFunction(responseData);
        })
        .catch((err) => {});
    }
  }, []);

  //Save and Submit
  const handleSave = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    setStatusLoader(true);

    axios
      .post(
        `${    API.prodUrl}/Precot/api/qc/saveRawCottonAnalysisReport`,
        role === "ROLE_CHEMIST"
          ? { ...payload, microbiologicalTests: [] }
          : { ...payload },
        { headers }
      )
      .then((response) => {
        message.success("Raw Cotton Analysis Report Save Successfully");
        // setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
        }, 2000);
        setStatusLoader(false);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        // setSaveLoading(false);
        setStatusLoader(false);
      });
  };
  const handleMicrobiologicalRemark = () => {
    if (
      !payload.microbiologicalTests ||
      payload.microbiologicalTests.length === 0
    ) {
      // If microbiologicalTests is undefined or empty, return an empty array
      return [];
    }

    const updatedMicroTests = [...payload.microbiologicalTests];

    // Ensure the first element exists and handle the 'remark' field
    if (!updatedMicroTests[0].remark || updatedMicroTests[0].remark === "") {
      updatedMicroTests[0].remark = "N/A";
    }

    return updatedMicroTests;
  };

  const handleSubmit = () => {
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      if (role == "ROLE_CHEMIST") {
        const keysToValidateFormFields = [
          "arNo",
          "dateOfReceipt",
          "testedDate",
          "sampleSize",
          "identificationTestObsr",
          "micronaireValueObsr",
          "avarageLengthObsr",
          "nepsObsr",
          "upperQuartileLengthObsr",
          "lengthByWeightObsr",
          "lengthByNoObsr",
          "shortFiberCntByWtObsr",
          "shortFiberContentByNoObsr",
          "whitenessIndicesObsr",
          "flourescenceObsr",
          "ashContentFlWtObsr",
          "ashContentIlWtObsr",
          "eitherSolSubIlWtObsr",
          "moistureContentIlWtObsr",
          "moistureContentFlWtObsr",
          "trashCottonWtMObsr",
          "trashTrashWtNObsr",
        ];

        const getFieldName = (key) => {
          switch (key) {
            case "arNo":
              return "AR No Field";
            case "dateOfReceipt":
              return "Date Of Receipt";
            case "testedDate":
              return "Tested Date Field";
            case "sampleSize":
              return "Sample Size Field";
            case "identificationTestObsr":
              return "Identification Observation Field";
            case "micronaireValueObsr":
              return "Micronaire value Observation Field";
            case "avarageLengthObsr":
              return "Average Length Observation Field";
            case "nepsObsr":
              return "Neps count Observation Field";
            case "upperQuartileLengthObsr":
              return "Upper Quartile Length Observation Field";
            case "lengthByWeightObsr":
              return "Length by weight Observation Field";
            case "lengthByNoObsr":
              return "Length by Number Observation Field";
            case "shortFiberCntByWtObsr":
              return "Short fiber Content Weight Observation Field";
            case "shortFiberContentByNoObsr":
              return "Short fiber Content. by number Observation Field";
            case "whitenessIndicesObsr":
              return "Whiteness Indices  Observation Field";
            case "flourescenceObsr":
              return "Fluorescence Observation Field";
            case "ashContentFlWtObsr":
              return "Ash content Final Wt Observation";
            case "ashContentIlWtObsr":
              return "Ash content Initial Wt Observation";
            case "eitherSolSubFlWtObsr":
              return "Ether Soluble Substances Final Wt Observation";
            case "eitherSolSubIlWtObsr":
              return "Ether Soluble Substances Final Wt Observation";
            case "moistureContentIlWtObsr":
              return "Moisture conten Initial Wt Observation";
            case "moistureContentFlWtObsr":
              return "Moisture conten Final Wt Observation";
            case "trashCottonWtMObsr":
              return "Trash Cotton Wt";
            case "trashTrashWtNObsr":
              return "STrash 	Trash Wt";
          }
        };

        for (const key of keysToValidateFormFields) {
          if (
            payload.physicalAndChemicalTests[0][key] == "" ||
            payload.physicalAndChemicalTests[0][key] == null
          ) {
            message.error(`Please Fill ${getFieldName(key)}`);
            return;
          }
        }
      }

      if (role == "ROLE_MICROBIOLOGIST") {
        if (
          payload.microbiologicalTests[0].product == "" ||
          payload.microbiologicalTests[0].product == null
        ) {
          message.warning("Please Select Product Lov");
          return;
        }
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const mandatoryFieldsPhysicalChemical = [
        "dateOfReceipt",
        "testedDate",
        "arNo",
        "identificationTestRmrk",
        "micronaireValueRmrk",
        "avarageLengthRmrk",
        "nepsRmrk",
        "upperQuartileLengthRmrk",
        "lengthByWeightRmrk",
      ];

      const mandatoryFieldsMicrobiological = [
        "coliform",
        "ecoli",
        "saur",
        "paer",
        "sal",
      ];

      const checkMandatoryFieldsInTests = (tests, mandatoryFields) => {
        return tests.every((test) =>
          mandatoryFields.every((field) => test[field] && test[field] !== "")
        );
      };

      const isPhysicalTestsValid = checkMandatoryFieldsInTests(
        payload.physicalAndChemicalTests,
        mandatoryFieldsPhysicalChemical
      );

      const isMicrobiologicalTestsValid =
        role === "ROLE_CHEMIST" ||
        checkMandatoryFieldsInTests(
          payload.microbiologicalTests,
          mandatoryFieldsMicrobiological
        );

      const replaceEmptyFieldsWithNA = (obj) => {
        if (Array.isArray(obj)) {
          return obj.map((item) => replaceEmptyFieldsWithNA(item));
        } else if (typeof obj === "object" && obj !== null) {
          const updatedObj = { ...obj };
          for (const key in updatedObj) {
            if (
              key.endsWith("Rmrk") ||
              key === "finalRemark" ||
              key === "trashRemark"
            ) {
              updatedObj[key] =
                updatedObj[key] === "" ? "N/A" : updatedObj[key];
            } else {
              updatedObj[key] = replaceEmptyFieldsWithNA(updatedObj[key]);
            }
          }
          return updatedObj;
        }
        return obj;
      };

      const updatedPayload = {
        ...replaceEmptyFieldsWithNA(payload),
        microbiologicalTests: handleMicrobiologicalRemark(),
      };

      // const updatedPayload = replaceEmptyFieldsWithNA(payload);

      const finalPayload =
        role === "ROLE_CHEMIST"
          ? { ...updatedPayload, microbiologicalTests: [] }
          : updatedPayload;
      setStatusLoader(true);

      axios
        .post(
          `${    API.prodUrl}/Precot/api/qc/SubmitRawCottonAnalysisReport`,
          finalPayload,
          { headers }
        )
        .then((response) => {
          message.success("Raw Cotton Analysis Report Submitted Successfully");
          setStatusLoader(false);
          setTimeout(() => {
            navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
          }, 2000);
        })
        .catch((error) => {
          setStatusLoader(false);
          message.error(error.response.data.message);
        });
    }
  };
  //

  //Handle Back
  const handleBack = () => {
    navigate("/Precot/PH-QCL01-AR-F-001/Summary/");
  };
  //

  // Field Update Funtions
  // const calculateAndUpdate = (key, key2, A, B, K, L) => {
  //   const difference = B - A;

  //   let result;

  //   if (key2 === "Kl") {
  //     result = (difference * 100) / A;
  //   } else if (K && L && K > 0) {
  //     result = ((K - L) * 100) / K;
  //   } else {
  //     result = (difference * 100) / 5;
  //   }

  //   setPayload((prevPayload) => {
  //     const updatedTest = { ...prevPayload.physicalAndChemicalTests[0] };
  //     updatedTest[`${key}FlWtObsr`] = B;
  //     updatedTest[`${key}IlWtObsr`] = A;
  //     updatedTest[`${key}Fr${key2}Obsr`] = difference || 0;
  //     updatedTest[`${key}FrResObsr`] = result || 0;

  //     return {
  //       ...prevPayload,
  //       physicalAndChemicalTests: [updatedTest],
  //     };
  //   });
  // };

  const handleSelectText = (e) => {
    if (
      !/[0-9._ -]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  const calculateAndUpdate = (key, key2, A, B, K, L) => {
    let difference;
    let result;

    if (key2 === "Kl") {
      difference = Math.abs(B - A);
      result = (difference * 100) / A;
    } else if (K && L && K > 0) {
      difference = Math.abs(K - L);
      result = (difference * 100) / K;
    } else {
      difference = Math.abs(B - A);
      result = (difference * 100) / 5;
    }

    setPayload((prevPayload) => {
      const updatedTest = { ...prevPayload.physicalAndChemicalTests[0] };

      updatedTest[`${key}FlWtObsr`] = B;
      updatedTest[`${key}IlWtObsr`] = A;
      updatedTest[`${key}Fr${key2}Obsr`] = difference.toFixed(4) || 0;
      updatedTest[`${key}FrResObsr`] = result.toFixed(2) || 0;

      return {
        ...prevPayload,
        physicalAndChemicalTests: [updatedTest],
      };
    });
  };

  const handleChangeA = (key, key2, value) => {
    const B = payload.physicalAndChemicalTests[0][`${key}FlWtObsr`];
    calculateAndUpdate(key, key2, value, B);
  };

  const handleChangeB = (key, key2, value) => {
    const A = payload.physicalAndChemicalTests[0][`${key}IlWtObsr`];
    const K = payload.physicalAndChemicalTests[0].moistureContentFlWtObsr; // Assume K is stored here
    const L = value;
    calculateAndUpdate(key, key2, A, value, K, L);
  };

  const calculateAndUpdateNM = (A, B) => {
    const result = (A * 100) / B;

    setPayload((prevPayload) => {
      const updatedTest = { ...prevPayload.physicalAndChemicalTests[0] };
      updatedTest[`trashCottonWtMObsr`] = B;
      updatedTest[`trashTrashWtNObsr`] = A;
      updatedTest[`trashResObsr`] = result.toFixed(2) || 0;

      return {
        ...prevPayload,
        physicalAndChemicalTests: [updatedTest],
      };
    });
  };

  const handleChangeN = (value) => {
    const B = payload.physicalAndChemicalTests[0].trashCottonWtMObsr;

    calculateAndUpdateNM(value, B);
  };

  const handleChangeM = (value) => {
    const A = payload.physicalAndChemicalTests[0].trashTrashWtNObsr;

    calculateAndUpdateNM(A, value);
  };

  const createHandleDateChange = (key) => (e) => {
    const dateString = e.target.value;
    handleChange(key, dateString);
    console.log("dateString", dateString);
  };

  const updatePayload = (keyword, value, payload) => {
    const keys = keyword
      .replace(/\[(\d+)\]/g, ".$1") // Convert array indices to dot notation
      .split(".");

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

  const getDropdownItems = (dropdownKey) => [
    {
      key: "1",
      label: <a onClick={() => handleChange(dropdownKey, "PASS")}>Pass</a>,
    },
    {
      key: "2",
      label: <a onClick={() => handleChange(dropdownKey, "FAIL")}>Fail</a>,
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

  //

  // Table Styles
  const tableStyle = {
    borderCollapse: "collapse",
    width: "90%",
  };

  const pathogenLov = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
  ];

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
  //

  function callback(key) {
    console.log(key);
  }

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.replace(/\//g, "-");
  };

  return (
    <>
      <BleachingHeader
        formName={"RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)"}
        formatNo={"PPH-QCL01-AR-F-001"}
        unit={"UNIT H"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "QC_MANAGER" || role === "QA_MANAGER" ? (
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
                  display: status.submitStatus ? "none" : "flex",
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

                  display: status.submitStatus ? "none" : "flex",
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
                  // display: canDisplayButtons(),
                  // display: submitBtnStatus ? "block" : "none",
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <Input
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
      {(role == "ROLE_CHEMIST" ||
        role == "QA_MANAGER" ||
        role == "QC_MANAGER") &&
        Number(tabNo) <= 6 && (
          <>
            <div style={{ margin: "5px", display: "flex" }}>
              <Row gutter={[8, 8]} align="middle">
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="text"
                      value={bmrnos2 || payload.millBatchNo}
                      addonBefore="Mill Batch No.:"
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly
                    />
                    <Input
                      type="text"
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].noOfBale
                      }
                      addonBefore="No.of Bales"
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly
                    />
                  </Space>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      addonBefore="AR.No.:"
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].arNo
                      }
                      style={{ width: "100%", textAlign: "center" }}
                      onChange={(e) =>
                        handleChange(
                          "physicalAndChemicalTests[0].arNo",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].billOrInvoiceNo
                      }
                      addonBefore="Bill/ Invoice No:"
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly
                    />
                  </Space>
                </Col>
                <br></br>
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="text"
                      addonBefore="Supplier:"
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].supplier
                      }
                      readOnly
                    />
                    <Input
                      type="text"
                      addonBefore="Quantity:"
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].quantity
                      }
                      readOnly
                    />
                    {/* <Input
                    type="date"
                    addonBefore="Tested Date: "
                    value={payload.tested_Date}
                    style={{ textAlign: "center" }}
                    max={today}
                    onChange={(e) => {
                      handleInput(e.target.value, "tested_Date");
                    }}
                    readOnly={status.fieldStatus}
                  /> */}
                  </Space>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="text"
                      addonBefore="Cotton variety:"
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].cottonVaritey
                      }
                      readOnly
                    />
                    <Input
                      type="text"
                      addonBefore="Station:"
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].station
                      }
                      readOnly
                    />
                  </Space>
                </Col>
              </Row>
            </div>
            <div style={{ display: "flex", gap: "2px" }}>
              <Input
                type="date"
                addonBefore="Date of Receipt: "
                value={payload.physicalAndChemicalTests[0].dateOfReceipt}
                style={{ textAlign: "center", width: "100%" }}
                max={today}
                onChange={createHandleDateChange(
                  "physicalAndChemicalTests[0].dateOfReceipt"
                )}
                disabled={disable.physicalAndChemicalTests}
              />
              <Input
                type="date"
                max={today}
                addonBefore="Tested Date: "
                onChange={createHandleDateChange(
                  "physicalAndChemicalTests[0].testedDate"
                )}
                value={payload.physicalAndChemicalTests[0].testedDate}
                disabled={disable.physicalAndChemicalTests}
              />
              <Input
                type="number"
                onChange={(e) =>
                  handleChange(
                    "physicalAndChemicalTests[0].sampleSize",
                    e.target.value
                  )
                }
                value={
                  payload.physicalAndChemicalTests[0] &&
                  payload.physicalAndChemicalTests[0].sampleSize
                }
                disabled={
                  payload.physicalAndChemicalTests[0] &&
                  disable.physicalAndChemicalTests
                }
                addonBefore="Sample Size:"
              />
            </div>
          </>
        )}
      {(role == "ROLE_MICROBIOLOGIST" ||
        role == "QC_MANAGER" ||
        role == "QA_MANAGER") &&
        Number(tabNo) >= 7 && (
          <div style={{ margin: "5px", display: "flex" }}>
            <Input
              type="date"
              addonBefore="Sampled on:"
              value={formatDateForInput(
                payload.microbiologicalTests[0]?.sampledOn || ""
              )} // Ensure default value isn't undefined
              style={{ textAlign: "center", width: "100%" }}
              max={today} // Assuming you have "today" calculated as current date
              onChange={createHandleDateChange(
                "microbiologicalTests[0].sampledOn"
              )}
              disabled={disable.microbiologist}
            />
            <Input
              type="date"
              addonBefore="Tested /Incubation Start on:"
              value={formatDateForInput(
                payload.microbiologicalTests[0]?.testedOrIncubationStartOn || ""
              )} // Default to empty string if undefined
              style={{ textAlign: "center", width: "100%" }}
              max={today}
              onChange={createHandleDateChange(
                "microbiologicalTests[0].testedOrIncubationStartOn"
              )}
              disabled={disable.microbiologist}
            />
          </div>
        )}
      <Tabs
        defaultActiveKey="1"
        onChange={(e) => {
          setTabNo(e);
        }}
      >
        {(role == "ROLE_CHEMIST" ||
          role == "QA_MANAGER" ||
          role == "QC_MANAGER") && (
          <>
            <TabPane tab="Phy And Che Test I" key="1">
              <table style={{ tableLayout: "fixed" }}>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "10%",
                    }}
                  >
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "20%" }}>
                    Parameter Tested
                  </td>
                  <td colSpan={3} style={{ textAlign: "center", width: "40%" }}>
                    Tolerance/ Range / Requirements
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }}>Remark</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "center" }}>Identification Test</td>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    Fibers are 100% Cotton Under microscopic observation
                  </td>
                  <td>
                    <Input
                      type="text"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].identificationTestObsr",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .identificationTestObsr
                      }
                      disabled={disable.physicalAndChemicalTests}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={
                        payload.physicalAndChemicalTests[0]
                          .identificationTestRmrk
                      }
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].identificationTestRmrk",
                          value || "NA"
                        );
                      }}
                      filterOption={false}
                      showSearch
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].identificationTestRmrk",
                      //       e.target.value || "NA"
                      //     );
                      //   }
                      // }}
                      disabled={disable.physicalAndChemicalTests}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td rowSpan="3" style={{ textAlign: "center" }}>
                    2
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan="3">
                    Micronaire value. µg/in
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>(3.5-8.0)</td>
                  <td rowSpan="3">
                    <Input
                      type="number"
                      step={0.01}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 2.8 || value > 8.0) {
                          message.warning(
                            "Entered value is not between 2.8 and 8"
                          );
                        }
                      }}
                      min={0}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      value={
                        payload.physicalAndChemicalTests[0].micronaireValueObsra
                      }
                      onChange={(e) =>
                        handleInputChange(e, "micronaireValueObsra")
                      }
                    />
                    <Input
                      type="number"
                      step={0.01}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 2.8 || value > 8.0) {
                          message.warning(
                            "Entered value is no between 2.8 and 8"
                          );
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      value={
                        payload.physicalAndChemicalTests[0].micronaireValueObsrb
                      }
                      onChange={(e) =>
                        handleInputChange(e, "micronaireValueObsrb")
                      }
                    />
                    <Input
                      type="number"
                      step={0.01}
                      value={
                        payload.physicalAndChemicalTests[0].micronaireValueObsrc
                      }
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 2.8 || value > 8.0) {
                          message.warning(
                            "Entered value is not between 2.8 and 8"
                          );
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(e) =>
                        handleInputChange(e, "micronaireValueObsrc")
                      }
                    />
                    <Input
                      type="number"
                      step={0.01}
                      value={
                        payload.physicalAndChemicalTests[0].micronaireValueObsrd
                      }
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 2.8 || value > 8.0) {
                          message.warning(
                            "Entered value is not between 2.8 and 8"
                          );
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(e) =>
                        handleInputChange(e, "micronaireValueObsrd")
                      }
                    />
                    <br />

                    <span>
                      Average:{" "}
                      {payload.physicalAndChemicalTests[0]
                        ?.micronaireValueObsr || ""}
                    </span>
                  </td>

                  <td rowSpan="3">
                    <Select
                      value={
                        payload.physicalAndChemicalTests[0]?.micronaireValueRmrk
                      }
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].micronaireValueRmrk",
                          value || "NA"
                        );
                      }}
                      showSearch
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].micronaireValueRmrk",
                      //       e.target.value || "NA"
                      //     );
                      //   }
                      // }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={disable.physicalAndChemicalTests}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>(2.8-4.5)</td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2
                  </td>
                  <td style={{ textAlign: "center" }}>(2.8-4.5)</td>
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    3
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Average Length. mm (manual)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.10</td>{" "}
                  <td style={{ textAlign: "center" }} rowSpan={3}>
                    <Input
                      type="text"
                      value={
                        payload.physicalAndChemicalTests[0]
                          ?.avarageLengthObsr || ""
                      }
                      onChange={(e) =>
                        handleChangeAvarageLengthObsr(0, e.target.value)
                      }
                      onBlur={(e) =>
                        handleBlurAvarageLengthObsr(0, e.target.value.trim())
                      }
                      style={{ width: "100%", textAlign: "center" }}
                    />
                  </td>
                  <td rowSpan={3}>
                    <Select
                      value={
                        payload.physicalAndChemicalTests[0].avarageLengthRmrk
                      }
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].avarageLengthRmrk",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={disable.physicalAndChemicalTests}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.10</td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2
                  </td>
                  <td style={{ textAlign: "center" }}>min.8.0</td>
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    4
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Neps. count/gm
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.700</td>
                  <td rowSpan={3}>
                    <InputNumber
                      // max={5000}
                      disabled={disable.physicalAndChemicalTests}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].nepsObsr",
                          value
                        );
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value > 5000) {
                          message.warning("Entered value is greater than 5000");
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      style={{ width: "100%" }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].nepsObsr
                      }
                    />
                  </td>
                  <td rowSpan={3}>
                    <Select
                      value={payload.physicalAndChemicalTests[0].nepsRmrk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].nepsRmrk",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={disable.physicalAndChemicalTests}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.1000</td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2
                  </td>
                  <td style={{ textAlign: "center" }}>max.5000</td>
                </tr>
                <tr>
                  <td rowSpan={5} style={{ textAlign: "center" }}>
                    5
                  </td>
                  <td rowSpan={5} style={{ textAlign: "center" }}>
                    Upper Quartile Length.mm by wt. UQL (w)
                  </td>
                  <td rowSpan={3} colSpan={1} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    Long{" "}
                  </td>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    (25-39)
                  </td>

                  <td rowSpan="5">
                    <Input
                      type="number"
                      step={0.01}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value < 10 || value > 39) {
                          message.warning(
                            "Entered value is not between 10 and 39"
                          );
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      value={
                        payload.physicalAndChemicalTests[0]
                          .upperQuartileLengthObsra
                      }
                      onChange={(e) =>
                        handleInputChange1(e, "upperQuartileLengthObsra")
                      }
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <Input
                      type="number"
                      step={0.01}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value < 10 || value > 39) {
                          message.warning(
                            "Entered value is not between 10 and 39"
                          );
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      value={
                        payload.physicalAndChemicalTests[0]
                          .upperQuartileLengthObsrb
                      }
                      onChange={(e) =>
                        handleInputChange1(e, "upperQuartileLengthObsrb")
                      }
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <Input
                      type="number"
                      step={0.01}
                      value={
                        payload.physicalAndChemicalTests[0]
                          .upperQuartileLengthObsrc
                      }
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value < 10 || value > 39) {
                          message.warning(
                            "Entered value is not between 10 and 39"
                          );
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(e) =>
                        handleInputChange1(e, "upperQuartileLengthObsrc")
                      }
                    />
                    <Input
                      type="number"
                      step={0.01}
                      value={
                        payload.physicalAndChemicalTests[0]
                          .upperQuartileLengthObsrd
                      }
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value < 10 || value > 39) {
                          message.warning(
                            "Entered value is not between 10 and 39"
                          );
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(e) =>
                        handleInputChange1(e, "upperQuartileLengthObsrd")
                      }
                    />
                    <br />
                    <span>
                      Average:{" "}
                      {payload.physicalAndChemicalTests[0]
                        ?.upperQuartileLengthObsr || ""}
                    </span>
                  </td>

                  <td rowSpan={5}>
                    <Select
                      value={
                        payload.physicalAndChemicalTests[0]
                          .upperQuartileLengthRmrk
                      }
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].upperQuartileLengthRmrk",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={disable.physicalAndChemicalTests}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    Medium{" "}
                  </td>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    (21-24)
                  </td>
                </tr>
                <tr>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    Short
                  </td>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    (13-20)
                  </td>
                </tr>
                <tr>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    CN
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    min. 12
                  </td>
                </tr>
                <tr>
                  <td colSpan={1} style={{ textAlign: "center" }}>
                    CN-2
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    min. 10
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test II" key="2">
              <table style={{ tableLayout: "fixed" }}>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "10%",
                    }}
                  >
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "20%" }}>
                    Parameter Tested
                  </td>
                  <td colSpan={3} style={{ textAlign: "center", width: "40%" }}>
                    Tolerance/ Range / Requirements
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }}>Remark</td>
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    6
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Length by weight. mm L (w)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.15</td>{" "}
                  <td rowSpan={3}>
                    <InputNumber
                      style={{ width: "100%" }}
                      // min={8}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].lengthByWeightObsr",
                          value
                        );
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value < 8) {
                          message.warning("Entered value is less than 8");
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].lengthByWeightObsr
                      }
                    />
                  </td>
                  <td rowSpan={3}>
                    <Select
                      value={
                        payload.physicalAndChemicalTests[0].lengthByWeightRmrk
                      }
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].lengthByWeightRmrk",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.10</td>{" "}
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.8</td>{" "}
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    7
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Length by number.mm L(n)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min. 13</td>{" "}
                  <td rowSpan={3}>
                    <InputNumber
                      // min={6}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      style={{ width: "100%" }}
                      disabled={disable.physicalAndChemicalTests}
                      // onChange={(value) => {
                      //   if (value < 6) {
                      //     message.warning(
                      //       "Value must be greater than or equal to 6"
                      //     );
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].lengthByNoObsr",
                      //       null
                      //     );
                      //   } else {
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].lengthByNoObsr",
                      //       value
                      //     );
                      //   }
                      // }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].lengthByNoObsr",
                          value
                        );
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value < 6) {
                          message.warning("Entered value is less than 6");
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].lengthByNoObsr
                      }
                    />
                  </td>
                  <td rowSpan={3}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].lengthByNoRmrk",
                          e.target.value,
                          e || "NA"
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].lengthByNoRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min. 7</td>{" "}
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min. 6</td>{" "}
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    8
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Short fiber Content. by wt.% SFC(w)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.25</td>{" "}
                  <td rowSpan={3}>
                    <InputNumber
                      style={{ width: "100%" }}
                      // max={85}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      // onChange={(value) => {
                      //   if (value > 85) {
                      //     message.warning(
                      //       "Value must be less than or equal to 85"
                      //     );
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].shortFiberCntByWtObsr",
                      //       null
                      //     );
                      //   } else {
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].shortFiberCntByWtObsr",
                      //       value
                      //     );
                      //   }
                      // }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].shortFiberCntByWtObsr",
                          value
                        );
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value > 85) {
                          message.warning("Entered value is greater than 85");
                        }
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .shortFiberCntByWtObsr
                      }
                    />
                  </td>
                  <td rowSpan={3}>
                    <Input
                      style={{ maxWidth: "100%" }}
                      disabled={disable.physicalAndChemicalTests}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].shortFiberContentByWtRmrk",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .shortFiberContentByWtRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.85</td>{" "}
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.85</td>{" "}
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    9
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Short fiber Content. by number % SFC(n)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.45</td>{" "}
                  <td rowSpan={3}>
                    <InputNumber
                      // max={95}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      style={{ width: "100%" }}
                      disabled={disable.physicalAndChemicalTests}
                      // onChange={(value) => {
                      //   if (value > 95) {
                      //     message.warning(
                      //       "Value must be less than or equal to 95"
                      //     );
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].shortFiberContentByNoObsr",
                      //       null
                      //     );
                      //   } else {
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].shortFiberContentByNoObsr",
                      //       value
                      //     );
                      //   }
                      // }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].shortFiberContentByNoObsr",
                          value
                        );
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value > 95) {
                          message.warning("Entered value is greater than 95");
                        }
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .shortFiberContentByNoObsr
                      }
                    />
                  </td>
                  <td style={cellStyle} rowSpan={3}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].shortFiberContentByNoRmrk",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .shortFiberContentByNoRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.90</td>{" "}
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max.95</td>{" "}
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    10
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Whiteness Indices (Berger 10deg/D65)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.25</td>{" "}
                  <td rowSpan={3}>
                    <InputNumber
                      disabled={disable.physicalAndChemicalTests}
                      // min={20}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      // onChange={(value) => {
                      //   if (value < 20) {
                      //     message.warning(
                      //       "Value must be greater than or equal to 20"
                      //     );
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].whitenessIndicesObsr",
                      //       null
                      //     );
                      //   } else {
                      //     handleChange(
                      //       "physicalAndChemicalTests[0].whitenessIndicesObsr",
                      //       value
                      //     );
                      //   }
                      // }}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].whitenessIndicesObsr",
                          value
                        );
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        if (value < 75) {
                          message.warning("Entered value is less than 75");
                        }
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].whitenessIndicesObsr
                      }
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td rowSpan={3}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].whitenessIndicesRmrk",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].whitenessIndicesRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.20</td>{" "}
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>min.75</td>{" "}
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test III" key="3">
              <table style={{ tableLayout: "fixed" }}>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "10%",
                    }}
                  >
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "20%" }}>
                    Parameter Tested
                  </td>
                  <td colSpan={3} style={{ textAlign: "center", width: "40%" }}>
                    Tolerance/ Range / Requirements
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }} colSpan={2}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }}>Remark</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>11</td>
                  <td style={{ textAlign: "center" }}>
                    Fluorescence (Under UV)
                  </td>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    No intense blue fluorescence. Few isolated fibers passable.
                  </td>
                  <td colSpan={2}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(
                          /[^a-zA-Z0-9 ._]/g,
                          ""
                        );
                        handleChange(
                          "physicalAndChemicalTests[0].flourescenceObsr",
                          sanitizedValue
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].flourescenceObsr
                      }
                    />
                  </td>
                  <td>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].flourescenceRmrk",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].flourescenceRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    12
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Ash content (%) RESULT = [(B-A) x100]/ 5 <br />
                    A= Crucible Wt.(g) <br /> B= Crucible Wt.with 5 g. sample's
                    ash. content (g)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    max. 1.50
                  </td>{" "}
                  <td style={{ textAlign: "left" }}>Final Wt.(g)-B</td>
                  <td>
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      // max={1.5}
                      // min={0}
                      step={0.1}
                      onChange={(value) => {
                        handleChangeB("ashContent", "BA", value);
                      }}
                      value={
                        payload.physicalAndChemicalTests[0].ashContentFlWtObsr
                      }
                    />
                  </td>
                  <td style={cellStyle} rowSpan={4}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].ashContentRmrk",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].ashContentRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "left" }}>Initial Wt.(g)-A</td>
                  <td>
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      // max={1.5}
                      step={0.1}
                      onChange={(value) => {
                        handleChangeA("ashContent", "BA", value);
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].ashContentIlWtObsr
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }} rowSpan={2}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={2}>
                    max. 0.5
                  </td>{" "}
                  <td style={{ textAlign: "left" }}>B-A</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].ashContentFrBAObsr
                      }
                      disabled
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "left" }}>
                    {/* <Input
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].ashContentFrResObsr
                      }
                     
                      disabled
                    ></Input>{" "} */}
                    <div>
                      {payload.physicalAndChemicalTests[0].ashContentFrResObsr}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    13
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Ether Soluble Substances % RESULT = [(Y-X) x100]/ 5
                    <br />
                    X= Flask Wt.(g) <br /> Y= Flask Wt.with 5 g. sample's Ether
                    soluble extract.(g)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    max.0.75
                  </td>{" "}
                  <td style={{ textAlign: "left" }}>Final Wt.(g)-Y</td>
                  <td>
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      // max={0.75}
                      step={0.1}
                      onChange={(value) => {
                        handleChangeB("eitherSolSub", "YX", value);
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].eitherSolSubFlWtObsr
                      }
                    />
                  </td>
                  <td rowSpan={4}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].eitherSolSubRmrk",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].eitherSolSubRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "left" }}>Initial Wt.(g)-X</td>
                  <td>
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      // max={0.75}
                      step={0.1}
                      onChange={(value) => {
                        // Check if the value is greater than the max allowed value

                        handleChangeA("eitherSolSub", "YX", value); // Update state with valid value
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].eitherSolSubIlWtObsr
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }} rowSpan={2}>
                    CN-2{" "}
                  </td>
                  {/* <td style={{ textAlign: "center" }} rowSpan={2}>
                    max. 0.5
                  </td>{" "} */}
                  <td style={{ textAlign: "left" }}>Y-X</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].eitherSolSubFrYXObsr
                      }
                      disabled
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "left" }}>
                    <div>
                      {
                        payload.physicalAndChemicalTests[0]
                          .eitherSolSubFrResObsr
                      }
                    </div>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test IV" key="4">
              <table style={{ tableLayout: "fixed" }}>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "10%",
                    }}
                  >
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "20%" }}>
                    Parameter Tested
                  </td>
                  <td colSpan={3} style={{ textAlign: "center", width: "40%" }}>
                    Tolerance/ Range / Requirements
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }} colSpan={2}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "15%" }}>Remark</td>
                </tr>
                <tr>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    14
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Moisture content (%) RESULT = [(K-L) x100]/ K
                    <br />
                    K= Cotton Wt.(g) before dry <br /> L= Cotton Wt.(g) after
                    dry
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    max. 8.0
                  </td>{" "}
                  <td style={{ textAlign: "left" }}>Initial Wt.(g)-K</td>
                  <td>
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      // max={8.0}
                      step={0.1}
                      onChange={(value) => {
                        handleChangeA("moistureContent", "Kl", value);
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .moistureContentIlWtObsr
                      }
                    />
                  </td>
                  <td rowSpan={4}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].moistureContentRmrk",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].moistureContentRmrk
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "left" }}>Final Wt.(g)-L</td>
                  <td>
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={disable.physicalAndChemicalTests}
                      step={0.1}
                      // onChange={(value) => {
                      //   if (value > 8.0) {
                      //     message.warning(
                      //       "Value must be less than or equal to 8.0"
                      //     );
                      //     handleChangeB("moistureContent", "Kl", null);
                      //   } else {
                      //     handleChangeB("moistureContent", "Kl", value);
                      //   }
                      // }}
                      onChange={(value) => {
                        const initialWeight =
                          payload.physicalAndChemicalTests[0]
                            ?.moistureContentIlWtObsr;

                        handleChangeB("moistureContent", "Kl", value);
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .moistureContentFlWtObsr
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }} rowSpan={2}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "left" }}>K-L</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .moistureContentFrKlObsr
                      }
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "left" }}>
                    <div>
                      {
                        payload.physicalAndChemicalTests[0]
                          .moistureContentFrResObsr
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    15
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Trash (%) RESULTS= [N x 100]/M
                    <br />
                    M= Cotton Wt.(g) <br /> N= Trash Wt.(g)
                  </td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    VC{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max. 3.5</td>{" "}
                  <td style={{ textAlign: "left" }}>Cotton Wt.(g)-M</td>
                  <td>
                    <InputNumber
                      disabled={disable.physicalAndChemicalTests}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      style={{ maxWidth: "100%" }}
                      // max={3.5}
                      step={0.1}
                      onChange={(value) => {
                        handleChangeM(value);
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].trashCottonWtMObsr
                      }
                    />
                  </td>
                  <td rowSpan={3}>
                    <Input
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "100%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].trashRemark",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].trashRemark
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    CN{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>max. 0.6</td>{" "}
                  <td style={{ textAlign: "left" }}>Trash Wt.(g)-N</td>
                  <td>
                    <InputNumber
                      disabled={disable.physicalAndChemicalTests}
                      // max={0.6}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      step={0.1}
                      style={{ maxWidth: "100%" }}
                      onChange={(value) => {
                        // Check if the value exceeds the maximum limit

                        handleChangeN(value); // Update state with valid value
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].trashTrashWtNObsr
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }} rowSpan={2}>
                    CN-2{" "}
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={2}>
                    Not Applicable
                  </td>{" "}
                  <td style={{ textAlign: "left" }}>RESULTS (%)</td>
                  <td style={{ textAlign: "center" }}>
                    <div>
                      {payload.physicalAndChemicalTests[0].trashResObsr}
                    </div>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test V" key="5">
              <table>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={6}>
                    Remark(s):{" "}
                    <Input
                      type="text"
                      disabled={disable.physicalAndChemicalTests}
                      style={{ maxWidth: "70%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "physicalAndChemicalTests[0].finalRemark",
                          e.target.value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].finalRemark
                      }
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={6}>
                    Note : Abbreviations: CN- Comber Noils, VC-Virgin cotton.
                    CN2-Exfoliating products opened material. Max.-Maximum,
                    Min.-Minimum, mm-millimeter, Wt.-weight, g.-gram,
                    sec.-Seconds, µg/in-Microgram per inch, Avg.-Average, A.R.
                    No- Analytical Reference Number.
                  </td>
                </tr>
                {/* <tr>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Lot Status : Accepted (Kg):
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      step={0.1}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].lotStatusAccepted",
                          value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].lotStatusAccepted
                      }
                    />
                  </td>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Accepted Under Deviation (Kg):
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      step={0.1}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].lotStatusAcceptedUnderDeviation",
                          value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0]
                          .lotStatusAcceptedUnderDeviation
                      }
                    />
                  </td>
                  <td style={{ padding: "5px" }} colSpan={2}>
                    Rejected (Kg):
                    <InputNumber
                      style={{ width: "100%" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      step={0.1}
                      disabled={disable.physicalAndChemicalTests}
                      onChange={(value) => {
                        handleChange(
                          "physicalAndChemicalTests[0].lotStatusRejected",
                          value
                        );
                      }}
                      value={
                        payload.physicalAndChemicalTests[0] &&
                        payload.physicalAndChemicalTests[0].lotStatusRejected
                      }
                    />
                  </td>
                </tr> */}
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <span style={{ float: "left" }}>
                      Lot Status :{" "}
                      <Select
                        value={payload.physicalAndChemicalTests[0].lotStatus}
                        options={LotLov}
                        style={{ textAlign: "center", width: "200px" }}
                        onChange={(e) => {
                          handleChange(
                            "physicalAndChemicalTests[0].lotStatus",
                            e
                          );
                        }}
                        dropdownStyle={{ textAlign: "center" }}
                        disabled={disable.physicalAndChemicalTests}
                        // onBlur={handleBlur}
                      ></Select>{" "}
                    </span>
                    <span style={{ marginLeft: "70px" }}>
                      Accepted Quantity(Kg):
                      <Input
                        type="number"
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        step={0.1}
                        disabled={disable.physicalAndChemicalTests}
                        style={{ textAlign: "center", width: "150px" }}
                        onChange={(e) => {
                          handleChange(
                            "physicalAndChemicalTests[0].lotStatusAccepted",
                            e.target.value
                          );
                        }}
                        value={
                          payload.physicalAndChemicalTests[0] &&
                          payload.physicalAndChemicalTests[0].lotStatusAccepted
                        }
                      ></Input>
                    </span>
                    <span style={{ float: "right", marginLeft: "20px" }}>
                      Accepted Under Deviation Quantity (Kg):{" "}
                      <Input
                        type="number"
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        step={0.1}
                        style={{ textAlign: "center", width: "150px" }}
                        disabled={disable.physicalAndChemicalTests}
                        onChange={(e) => {
                          handleChange(
                            "physicalAndChemicalTests[0].lotStatusAcceptedUnderDeviation",
                            e.target.value
                          );
                        }}
                        value={
                          payload.physicalAndChemicalTests[0] &&
                          payload.physicalAndChemicalTests[0]
                            .lotStatusAcceptedUnderDeviation
                        }
                      ></Input>
                    </span>
                    <br></br>
                    <br />
                    <span>
                      Rejected Quantity(Kg):{" "}
                      <Input
                        type="number"
                        onKeyDown={(e) => {
                          handleSelectText(e);
                        }}
                        step={0.1}
                        disabled={disable.physicalAndChemicalTests}
                        onChange={(e) => {
                          handleChange(
                            "physicalAndChemicalTests[0].lotStatusRejected",
                            e.target.value
                          );
                        }}
                        value={
                          payload.physicalAndChemicalTests[0] &&
                          payload.physicalAndChemicalTests[0].lotStatusRejected
                        }
                        style={{ textAlign: "center", width: "150px" }}
                      ></Input>
                    </span>{" "}
                  </td>
                </tr>
              </table>
            </TabPane>
            {role == "ROLE_CHEMIST" && (
              <TabPane tab="Reviews" key="6">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Chemist):
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "35%" }}
                      >
                        Approved by:
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {payload.chemist_sign}
                              <br />
                              {formatDateAndTime(payload.chemist_submit_on)}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.chemist_sign ? (
                              <img
                                src={eSign.chemist_sign}
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
                        </div>
                      </td>

                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        {payload.qc_status !== "WAITING_FOR_APPROVAL" &&
                          payload.qc_status !== "" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ textAlign: "center" }}>
                                  {payload.qc_sign}
                                  <br />
                                  {formatDateAndTime(payload.qc_submit_on)}
                                </div>
                              </div>
                              <div style={{ marginLeft: "20px" }}>
                                {eSign.qc_sign ? (
                                  <img
                                    src={eSign.qc_sign}
                                    alt="HOD eSign"
                                    style={{
                                      width: "150px",
                                      height: "70px",
                                      objectFit: "contain",
                                      mixBlendMode: "multiply",
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          )}
                      </td>
                    </tr>
                  </table>
                </div>
              </TabPane>
            )}
          </>
        )}
        {(role == "ROLE_MICROBIOLOGIST" ||
          role == "QA_MANAGER" ||
          role == "QC_MANAGER") && (
          <>
            <TabPane tab="Micro Test I" key="7">
              <table>
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={7}
                  >
                    Test Parameters & Specification{" "}
                  </td>

                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={3}
                  >
                    Test Completion Date{" "}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    Total Viable Count (TVC- cfu/g)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    Total Fungal Count (TFC- cfu/g)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={5}
                  >
                    {" "}
                    Pathogens{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Gram negative bacteria or Coliform
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {" "}
                    Escherechia coli (E.coli)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Staphylococcos aures (S.aur )
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Pseudomonas aerogenosa (P.aer)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Salmonella (Sal.)
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <InputNumber
                      disabled={disable.microbiologist}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      placeholder="SAP"
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleChange(
                          "microbiologicalTests[0].totalViableCount",
                          value
                        )
                      }
                      value={
                        payload.microbiologicalTests.length > 0
                          ? payload.microbiologicalTests[0].totalViableCount
                          : ""
                      }
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <InputNumber
                      disabled={disable.microbiologist}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      placeholder="SAP"
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleChange(
                          "microbiologicalTests[0].totalFungalCount",
                          value
                        )
                      }
                      value={
                        payload.microbiologicalTests.length > 0
                          ? payload.microbiologicalTests[0].totalFungalCount
                          : ""
                      }
                    />
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={payload.microbiologicalTests[0]?.coliform}
                      options={pathogenLov}
                      onChange={(value) => {
                        handleChange(
                          "microbiologicalTests[0].coliform",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={disable.microbiologist}
                      // onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={payload.microbiologicalTests[0]?.ecoli}
                      options={pathogenLov}
                      onChange={(value) => {
                        handleChange(
                          "microbiologicalTests[0].ecoli",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={disable.microbiologist}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={payload.microbiologicalTests[0]?.saur}
                      options={pathogenLov}
                      onChange={(value) => {
                        handleChange(
                          "microbiologicalTests[0].saur",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={disable.microbiologist}
                      // onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={payload.microbiologicalTests[0]?.paer}
                      options={pathogenLov}
                      onChange={(value) => {
                        handleChange(
                          "microbiologicalTests[0].paer",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={disable.microbiologist}
                      // onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={payload.microbiologicalTests[0]?.sal}
                      options={pathogenLov}
                      onChange={(value) => {
                        handleChange(
                          "microbiologicalTests[0].sal",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={disable.microbiologist}
                      // onBlur={handleBlurMicro}
                    ></Select>
                  </td>

                  <td style={{ textAlign: "center", padding: "5px" }}>
                    {/* <Input
                      type="date"
                      style={{ width: "100%" }}
                      value={
                        payload.microbiologicalTests[0]?.testCompletionDate
                      }
                      max={today}
                      onChange={createHandleDateChange(
                        "microbiologicalTests[0]?.testCompletionDate"
                      )}
                      disabled={disable.microbiologist}

                      // value={
                      //   payload.microbiologicalTests &&
                      //   payload.microbiologicalTests[0] &&
                      //   payload.microbiologicalTests[0]?.testCompletionDate
                      // }

                    ></Input> */}
                    <Input
                      type="date"
                      value={formatDateForInput(
                        payload.microbiologicalTests[0]?.testCompletionDate ||
                          ""
                      )} // Default to empty string if undefined
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={createHandleDateChange(
                        "microbiologicalTests[0].testCompletionDate"
                      )}
                      disabled={disable.microbiologist}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td colSpan={5} rowSpan={2}>
                    Note : cfu/g- Colony forming unit per gram.
                  </td>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", padding: "5px" }}
                  >
                    Remark:{" "}
                    <Input
                      disabled={disable.microbiologist}
                      style={{ maxWidth: "70%" }}
                      placeholder="Please Enter..."
                      onChange={(e) => {
                        handleChange(
                          "microbiologicalTests[0].remark",
                          e.target.value
                        );
                      }}
                      value={payload.microbiologicalTests[0]?.remark || ""}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "5px" }}
                    colSpan={4}
                  >
                    {" "}
                    Product:{" "}
                    <Select
                      value={payload.microbiologicalTests[0]?.product}
                      options={product3Lov}
                      onChange={(value) => {
                        handleChange(
                          "microbiologicalTests[0].product",
                          value || "NA"
                        );
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={disable.microbiologist}
                      style={{ textAlign: "center", width: "70%" }}
                    ></Select>
                  </td>
                </tr>
              </table>
            </TabPane>
            {role == "ROLE_MICROBIOLOGIST" && (
              <TabPane tab="Reviews" key="8">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Microbiologist):
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "35%" }}
                      >
                        Approved by:
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {payload.microbiologist_sign}
                              <br />
                              {formatDateAndTime(
                                payload.microbiologist_submit_on
                              )}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.microbiologist_sign ? (
                              <img
                                src={eSign.microbiologist_sign}
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
                        </div>
                      </td>

                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        {payload.qc_status !== "WAITING_FOR_APPROVAL" &&
                          payload.qc_status !== "" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ textAlign: "center" }}>
                                  {payload.qc_sign}
                                  <br />
                                  {formatDateAndTime(payload.qc_submit_on)}
                                </div>
                              </div>
                              <div style={{ marginLeft: "20px" }}>
                                {eSign.qc_sign ? (
                                  <img
                                    src={eSign.qc_sign}
                                    alt="HOD eSign"
                                    style={{
                                      width: "150px",
                                      height: "70px",
                                      objectFit: "contain",
                                      mixBlendMode: "multiply",
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          )}
                      </td>
                    </tr>
                  </table>
                </div>
              </TabPane>
            )}
            {(role == "QA_MANAGER" || role == "QC_MANAGER") && (
              <TabPane tab="Reviews" key="9">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Chemist):
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Microbiologist):
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "35%" }}
                      >
                        Approved by:
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {payload.chemist_sign}
                              <br />
                              {formatDateAndTime(payload.chemist_submit_on)}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.chemist_sign ? (
                              <img
                                src={eSign.chemist_sign}
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
                        </div>
                      </td>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {payload.microbiologist_sign}
                              <br />
                              {formatDateAndTime(
                                payload.microbiologist_submit_on
                              )}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.microbiologist_sign ? (
                              <img
                                src={eSign.microbiologist_sign}
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
                        </div>
                      </td>

                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        {payload.qc_status !== "WAITING_FOR_APPROVAL" &&
                          payload.qc_status !== "" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ textAlign: "center" }}>
                                  {payload.qc_sign}
                                  <br />
                                  {formatDateAndTime(payload.qc_submit_on)}
                                </div>
                              </div>
                              <div style={{ marginLeft: "20px" }}>
                                {eSign.qc_sign ? (
                                  <img
                                    src={eSign.qc_sign}
                                    alt="HOD eSign"
                                    style={{
                                      width: "150px",
                                      height: "70px",
                                      objectFit: "contain",
                                      mixBlendMode: "multiply",
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          )}
                      </td>
                    </tr>
                  </table>
                </div>
              </TabPane>
            )}
          </>
        )}
      </Tabs>
    </>
  );
};

export default QualityControl_f01_Form;
