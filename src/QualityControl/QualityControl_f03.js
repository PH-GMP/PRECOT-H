/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f03 = () => {
  const formatName = "Chemical Analysis Report";
  const formatNo = "PH-QCL01-AR-F-003";
  const revisionNo = "02";
  const sopNo = "PH-QCL01-D-05";
  const unit = "Unit H";

  const navigate = useNavigate();
  const { state } = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("username");

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [printData, setPrintData] = useState("");

  //   Form States
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [chemicalName, setChemicalName] = useState("");
  const [materialDocNo, setMaterialDocNo] = useState("");
  const [chemicalBatchNo, setChemicalBatchNo] = useState("");
  const [analyticalRequest, setAnalyticalRequest] = useState("");
  const [testedDate, setTestedDate] = useState("");
  const [sampleDate, setSampleDate] = useState("");
  const [appearanceSpecification, setAppearanceSpecification] = useState("");
  const [appearanceObservation, setappearanceObservation] = useState("");
  const [colourSpecification, setColourSpecification] = useState("");
  const [colourObservation, setColourObservation] = useState("");
  const [odourSpecification, setodourSpecification] = useState("");
  const [odourObservation, setodourObservation] = useState("");
  const [solubilitySpecification, setsolubilitySpecification] = useState("");
  const [solubilityObservation, setsolubilityObservation] = useState("");
  const [visibleSpecification, setvisibleSpecification] = useState("");
  const [visibleObservation, setvisibleObservation] = useState("");
  const [pHSpecification, setpHSpecification] = useState("");
  const [pHObservation, setpHObservation] = useState("");
  const [puritySpecification, setpuritySpecification] = useState("");
  const [purityObservation, setpurityObservation] = useState("");
  const [relativeSpecification, setrelativeSpecification] = useState("");
  const [relativeObservation, setrelativeObservation] = useState("");
  const [specificSpecification, setspecificSpecification] = useState("");
  const [specificObservation, setspecificObservation] = useState("");
  const [totalSolidsSpecification, setTotalSolidsSpecification] = useState("");
  const [totalSolidsObservation, setTotalSolidsObservation] = useState("");
  const [moistureSpecification, setMoistureSpecification] = useState("");
  const [moistureObservation, setMoistureObservation] = useState("");
  const [calculationStanchemist, setCalculationStanchemist] = useState("");
  const [calculationRemarks, setCalculationRemarks] = useState("");
  const [disposal, setDisposal] = useState("");
  const [remarks, setremarks] = useState("");
  const [qtyAcceptedInKg, setQtyAcceptedInKg] = useState("");
  const [qtyRejectedInKg, setQtyRejectedInKg] = useState("");
  const [qtyAcceptedDevInKg, setQtyAcceptedDevInKg] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const initialized = useRef(false);
  const [sampleWeight, setSampleWeight] = useState("");
  const [buretteReading, setBuretteReading] = useState("");
  const [normalityStandardSolution, setNormalityStandardSolution] =
    useState("");
  const [testingChemical, setTestingChemical] = useState("");
  const [purity, setPurity] = useState("");

  useEffect(() => {
    const calculatePurity = () => {
      const purityValue =
        (parseFloat(buretteReading) *
          parseFloat(normalityStandardSolution) *
          parseFloat(testingChemical)) /
        (parseFloat(sampleWeight) * 10);

      setPurity(!isNaN(purityValue) ? purityValue.toFixed(4) : "");
    };
    calculatePurity();
  }, [
    sampleWeight,
    buretteReading,
    normalityStandardSolution,
    testingChemical,
  ]);

  const values_Specification = [
    { value: "Soluble in Water", label: "Soluble in Water" },
    { value: "Soluble in warm water", label: "Soluble in warm water" },
    { value: "Soluble in Org.", label: "Soluble in Org." },
    { value: "Solvent", label: "Solvent" },
  ];

  let formattedChemistDate;
  if (printData.chemist_submit_on) {
    formattedChemistDate = moment(printData.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (printData.qc_submit_on) {
    formattedQCDate = moment(printData.qc_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData.chemist_sign;
    if (username) {
      // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
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
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData.qc_sign;
    if (username) {
      // console.log("usernameparams", username);

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
    }
  }, [printData,API.prodUrl, token]);

  // Get the PDE details.....
  useEffect(() => {
    const { materialDoc } = state || {};
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/GetChemicalAnalysisReportPdeData`,
        {
          headers,
        }
      )
      .then((res) => {
        const m = res.data.filter((x, i) => {
          return x.matDoc == materialDoc;
        });
        console.log("M", m);
        setSupplier(m[0].suplier);
        setChemicalName(m[0].matDec);
        setChemicalBatchNo(m[0].batchNo);
        console.log("filtered data", m[0].suplier);
      })
      .catch(() => {});
    console.log("material doc", materialDoc);
  }, []);

  const chemicalBasedSpecifications = (chemical) => {
    if (chemical) {
      axios
        .get(
          `${API.prodUrl}/Precot/api/qc/getChemicalData?chemical=${chemical}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const data = res.data;
          setAppearanceSpecification(data.appearance || "");
          setColourSpecification(data.colour || "");
          setodourSpecification(data.odour || "");
          setsolubilitySpecification(data.solubilityInwater || "");
          setvisibleSpecification(data.visualInsolubleImpurity || "");
          setpHSpecification(data.ph || "");
          setpuritySpecification(data.purity || "");
          setrelativeSpecification(data.relativeDensity || "");
          setspecificSpecification(data.specificGravity || "");
          setTotalSolidsSpecification(data.totalSolids || "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // UseEffect for the Get the Details.....
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const { materialDoc } = state || {};

      setMaterialDocNo(materialDoc);
      // setShift(shiftvalue);
      console.log("Material Doc", materialDoc);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .get(
          `${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/GetByMaterialDocNo`,
          {
            headers,
            params: {
              materialDocNo: materialDoc,
            },
          }
        )
        .then((response) => {
          console.log("responseresponseresponse ", response.data);

          if (response.data === "No Data Found") {
            console.log("No Data FoundNo Data Found", chemicalName);

            axios
              .get(
                `${API.prodUrl}/Precot/api/qc/ChemicalAnalysisReport/GetChemicalAnalysisReportPdeData`,
                {
                  headers,
                }
              )
              .then((res) => {
                const m = res.data.filter((x, i) => {
                  return x.matDoc == materialDoc;
                });

                chemicalBasedSpecifications(m[0].matDec);
              })
              .catch(() => {});
          }

          if (response.data.length !== 0) {
            if (role === "QA_MANAGER" || role === "QC_MANAGER") {
              if (
                (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
                  response.data[0]?.qc_status === "QC_REJECTED") ||
                (response.data[0]?.chemist_status === "CHEMIST_APPROVED" &&
                  response.data[0]?.qc_status === "QA_REJECTED")
              ) {
                message.warning("Chemist Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-03/Summary");
                }, 1500);
              }
            }

            console.log(" Response", response.data);
            setId(response.data[0].id);
            setDate(response.data[0].date);
            setSupplier(response.data[0].supplier);
            setChemicalName(response.data[0].chemicalName);
            setChemicalBatchNo(response.data[0].chemicalBatchNo);
            setAnalyticalRequest(response.data[0].analyticalRequestNo);
            setTestedDate(response.data[0].testedDate);
            setSampleDate(response.data[0].sampleDate);
            setappearanceObservation(response.data[0].appearanceObsr);
            setAppearanceSpecification(response.data[0].appearanceSpec);
            setpHObservation(response.data[0].phObsr);
            setpHSpecification(response.data[0].phSpec);
            setpurityObservation(response.data[0].purityObsr);
            setpuritySpecification(response.data[0].puritySpec);
            setodourObservation(response.data[0].odourObsr);
            setodourSpecification(response.data[0].odourSpec);
            setColourObservation(response.data[0].colorObsr);
            setColourSpecification(response.data[0].colorSpec);
            setsolubilityObservation(response.data[0].solubilityInWaterObsr);
            setsolubilitySpecification(response.data[0].solubilityInWaterSpec);
            setvisibleObservation(response.data[0].visibleObsr);
            setvisibleSpecification(response.data[0].visibleSpec);
            setrelativeObservation(response.data[0].relativeDensityObsr);
            setrelativeSpecification(response.data[0].relativeDensitySpec);
            setspecificObservation(response.data[0].specificGravityObsr);
            setspecificSpecification(response.data[0].specificGravitySpec);
            setMoistureObservation(response.data[0].moistureObsr);
            setMoistureSpecification(response.data[0].moistureSpec);
            setCalculationStanchemist(
              response.data[0].standardizedChemicalLotNo
            );
            setCalculationRemarks(response.data[0].calculation);
            setDisposal(response.data[0].disposalMethod);
            setremarks(response.data[0].remark);
            setQtyAcceptedInKg(response.data[0].qtyAcceptedInKg);
            setQtyRejectedInKg(response.data[0].qtyRejectedInKg);
            setQtyAcceptedDevInKg(response.data[0].qtyAcceptedUnderDeviation);
            setTotalSolidsObservation(response.data[0].totalSolidsObsr);
            setTotalSolidsSpecification(response.data[0].totalSolidsSpec);
            setSampleWeight(response.data[0].sampleWeight);
            setBuretteReading(response.data[0].buretteReading);
            setNormalityStandardSolution(
              response.data[0].normalityStandardSolution
            );
            setTestingChemical(response.data[0].testingChemical);
            setPrintData(response.data[0]);

            if (
              role == "ROLE_CHEMIST" &&
              (response.data[0].chemist_status == "CHEMIST_APPROVED" ||
                response.data[0].chemist_status == "CHEMIST_SUBMITTED") &&
              response.data[0].qc_status == "WAITING_FOR_APPROVAL"
            ) {
              console.log("condition 1");
              setSaveBtnStatus(false);
              setSubmitBtnStatus(false);
              setDisable(true);
            } else if (
              role == "ROLE_CHEMIST" &&
              (response.data[0].chemist_status == "" ||
                response.data[0].chemist_status == null) &&
              (response.data[0].qc_status == "" ||
                response.data[0].qc_status == null)
            ) {
              console.log("condition check");
              setSaveBtnStatus(true);
              setSubmitBtnStatus(true);
              setDisable(false);
            } else if (
              role == "ROLE_CHEMIST" &&
              response.data[0].chemist_status == "CHEMIST_SAVED" &&
              (response.data[0].qc_status == "" ||
                response.data[0].qc_status == null)
            ) {
              setSaveBtnStatus(true);
              setSubmitBtnStatus(true);
              setDisable(false);
            } else if (
              role == "ROLE_CHEMIST" &&
              (response.data[0].chemist_status == "CHEMIST_APPROVED" ||
                response.data[0].chemist_status == "CHEMIST_SUBMITTED") &&
              (response.data[0].qc_status == "QC_REJECTED" ||
                response.data[0].qc_status == "QA_REJECTED")
            ) {
              setSaveBtnStatus(false);
              setSubmitBtnStatus(true);
              setDisable(false);
            } else if (
              (role == "QC_MANAGER" || role == "QA_MANAGER") &&
              (response.data[0].chemist_status == "CHEMIST_APPROVED" ||
                response.data[0].chemist_status == "CHEMIST_SUBMITTED") &&
              response.data[0].qc_status == "WAITING_FOR_APPROVAL"
            ) {
              setSaveBtnStatus(true);
              setSubmitBtnStatus(true);
              setDisable(true);
            } else if (
              (role == "QC_MANAGER" || role == "QA_MANAGER") &&
              (response.data[0].chemist_status == "CHEMIST_APPROVED" ||
                response.data[0].chemist_status == "CHEMIST_SUBMITTED") &&
              (response.data[0].qc_status == "QC_REJECTED" ||
                response.data[0].qc_status == "QA_REJECTED")
            ) {
              setSaveBtnStatus(false);
              setSubmitBtnStatus(false);
              setDisable(true);
            } else if (
              (role == "QC_MANAGER" ||
                role == "QA_MANAGER" ||
                role == "ROLE_CHEMIST") &&
              (response.data[0].chemist_status == "CHEMIST_APPROVED" ||
                response.data[0].chemist_status == "CHEMIST_SUBMITTED") &&
              (response.data[0].qc_status == "QC_APPROVED" ||
                response.data[0].qc_status == "QA_APPROVED")
            ) {
              setSaveBtnStatus(false);
              setSubmitBtnStatus(false);
              setDisable(true);
            }
          } else {
            console.log(" Response in else section", response.data);
            setDate("");
            setSupplier("");
            setChemicalName("");
            setChemicalBatchNo("");
            setAnalyticalRequest("");
            setTestedDate("");
            setSampleDate("");
            setappearanceObservation("");
            setAppearanceSpecification("");
            setpHObservation("");
            setpHSpecification("");
            setpurityObservation("");
            setpuritySpecification("");
            setodourObservation("");
            setodourSpecification("");
            setColourObservation("");
            setColourSpecification("");
            setsolubilityObservation("");
            setsolubilitySpecification("");
            setvisibleObservation("");
            setvisibleSpecification("");
            setrelativeObservation("");
            setrelativeSpecification("");
            setspecificObservation("");
            setspecificSpecification("");
            setTotalSolidsObservation("");
            setTotalSolidsSpecification("");
            setMoistureObservation("");
            setMoistureSpecification("");
            setCalculationStanchemist("");
            setCalculationRemarks("");
            setremarks("");
            setQtyAcceptedInKg("");
            setQtyRejectedInKg("");
            setQtyAcceptedDevInKg("");
          }
        })
        .catch((err) => {});
    }
  }, []);

  const handleSelectText = (e, name) => {
    // Restricting input to valid keys
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }

    // Handling Enter key for custom text input
    if (e.key === "Enter") {
      const value = e.target.value;

      if (name === "solubilitySpecification") {
        setsolubilitySpecification(value);
      }
      if (name === "solubilityObservation") {
        setsolubilityObservation(value);
      }
    }
  };

  const handleChange_pH = (e) => {
    const inputValue = e.target.value;
    setpHObservation(inputValue);
  };

  const handle_blur_pHSP = () => {
    if (pHSpecification < 6.5 || pHSpecification > 7.5) {
      message.error("Please enter a number between 6.5 and 7.5 for pH");
    }
  };
  // const handleInput_pHSP = (e) => {
  //   const inputValue = e.target.value;
  // };
  const handleChange_pHSP = (e) => {
    const inputValue = e.target.value;
    setpHSpecification(inputValue);
  };

  const handleChange_purityOB = (e) => {
    const inputValue = e.target.value;
    setpurityObservation(inputValue);
  };

  // Purity Specification
  const handle_blur_puritySP = () => {
    if (puritySpecification < 6.5 || puritySpecification > 7.5) {
      message.error(
        "Please enter a number between 6.5 and 7.5 for for Purity Specification"
      );
    }
  };

  const handleChange_puritySP = (e) => {
    const inputValue = e.target.value;
    setpuritySpecification(inputValue);
  };

  const handleChange_relativeOB = (e) => {
    const inputValue = e.target.value;
    // if (inputValue.length <= 3) {
    setrelativeObservation(inputValue);
    // }
  };

  const handleChange_relativeSP = (e) => {
    const inputValue = e.target.value;
    // if (inputValue.length <= 3) {
    setrelativeSpecification(inputValue);
    // }
  };

  const handleChange_specificOB = (e) => {
    const inputValue = e.target.value;
    setspecificObservation(inputValue);
  };

  const handleChange_specificSP = (e) => {
    const inputValue = e.target.value;
    setspecificSpecification(inputValue);
  };

  const handleChange_totalSolidOB = (e) => {
    const inputValue = e.target.value;
    setTotalSolidsObservation(inputValue);
  };

  const handleChange_totalSolidSP = (e) => {
    const inputValue = e.target.value;

    setTotalSolidsSpecification(inputValue);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-03/Summary");
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qc/ApproveChemicalAnalysisReport`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-03/Summary");
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
        `${API.prodUrl}/Precot/api/qc/ApproveChemicalAnalysisReport`,
        {
          id: id,
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
        navigate("/Precot/QualityControl/F-03/Summary");
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

  const handleSave = () => {
    // setSaveLoading()
    const payload = {
      id: id,
      formatNo: formatNo,
      revisionNo: revisionNo,
      formatName: formatName,
      refSopNo: sopNo,
      materialDocNo: materialDocNo,
      date: "date",
      supplier: supplier,
      chemicalName: chemicalName,
      chemicalBatchNo: chemicalBatchNo,
      analyticalRequestNo: analyticalRequest,
      testedDate: testedDate,
      sampleDate: sampleDate,
      appearanceSpec: appearanceSpecification,
      appearanceObsr: appearanceObservation,
      colorSpec: colourSpecification,
      colorObsr: colourObservation,
      odourSpec: odourSpecification,
      odourObsr: odourObservation,
      solubilityInWaterSpec: solubilitySpecification,
      solubilityInWaterObsr: solubilityObservation,
      visibleSpec: visibleSpecification,
      visibleObsr: visibleObservation,
      phSpec: pHSpecification,
      phObsr: pHObservation,
      puritySpec: puritySpecification,
      purityObsr: purityObservation,
      relativeDensitySpec: relativeSpecification,
      relativeDensityObsr: relativeObservation,
      specificGravitySpec: specificSpecification,
      specificGravityObsr: specificObservation,
      totalSolidsSpec: totalSolidsSpecification,
      totalSolidsObsr: totalSolidsObservation,
      moistureSpec: moistureSpecification,
      moistureObsr: moistureObservation,
      standardizedChemicalLotNo: calculationStanchemist,
      calculation: calculationRemarks,
      disposalMethod: disposal,
      remark: remarks,
      qtyAcceptedInKg: qtyAcceptedInKg,
      qtyRejectedInKg: qtyRejectedInKg,
      qtyAcceptedUnderDeviation: qtyAcceptedDevInKg,
      sampleWeight: sampleWeight,
      testingChemical: testingChemical,
      normalityStandardSolution: normalityStandardSolution,
      buretteReading: buretteReading,
      purity: purity,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(`${API.prodUrl}/Precot/api/qc/SaveChemicalAnalysisReport`, payload, {
        headers,
      })
      .then((response) => {
        message.success("Chemical Analysis Report Save Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-03/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    try {
      if (!solubilitySpecification || !solubilityObservation) {
        let errorMessage = "";
        if (!solubilitySpecification)
          errorMessage += "Please fill in Solubility Specification field.\n";
        if (!solubilityObservation)
          errorMessage += "Please fill in Solubility Observation field.\n";
        console.log("checking");
        message.error(errorMessage);
        return false;
      }

      const payload = {
        id: id,
        formatNo: formatNo,
        revisionNo: revisionNo,
        formatName: formatName,
        refSopNo: sopNo,
        materialDocNo: materialDocNo,
        date: date,
        supplier: supplier,
        chemicalName: chemicalName,
        chemicalBatchNo: chemicalBatchNo,
        analyticalRequestNo: analyticalRequest || "NA",
        testedDate: testedDate,
        sampleDate: sampleDate,
        appearanceSpec: appearanceSpecification || "NA",
        appearanceObsr: appearanceObservation || "NA",
        colorSpec: colourSpecification || "NA",
        colorObsr: colourObservation || "NA",
        odourSpec: odourSpecification || "NA",
        odourObsr: odourObservation || "NA",
        solubilityInWaterSpec: solubilitySpecification,
        solubilityInWaterObsr: solubilityObservation,
        visibleSpec: visibleSpecification || "NA",
        visibleObsr: visibleObservation || "NA",
        phSpec: pHSpecification || "NA",
        phObsr: pHObservation || "NA",
        puritySpec: puritySpecification || "NA",
        purityObsr: purityObservation || "NA",
        relativeDensitySpec: relativeSpecification || "NA",
        relativeDensityObsr: relativeObservation || "NA",
        specificGravitySpec: specificSpecification || "NA",
        specificGravityObsr: specificObservation || "NA",
        totalSolidsSpec: totalSolidsSpecification || "NA",
        totalSolidsObsr: totalSolidsObservation || "NA",
        moistureSpec: moistureSpecification || "NA",
        moistureObsr: moistureObservation || "NA",
        standardizedChemicalLotNo: calculationStanchemist || "NA",
        calculation: calculationRemarks || "NA",
        disposalMethod: disposal || "NA",
        remark: remarks || "NA",
        qtyAcceptedInKg: qtyAcceptedInKg || "NA",
        qtyRejectedInKg: qtyRejectedInKg || "NA",
        qtyAcceptedUnderDeviation: qtyAcceptedDevInKg || "NA",
        sampleWeight: sampleWeight || "NA",
        testingChemical: testingChemical || "NA",
        normalityStandardSolution: normalityStandardSolution || "NA",
        buretteReading: buretteReading || "NA",
        purity: purity || "NA",
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/qc/SubmitChemicalAnalysisReport`,
          payload,
          { headers }
        )
        .then((response) => {
          // message.success(response.data.message);
          message.success("Chemical Analysis Report Submitted Successfully");
          setSubmitLoading(false);
          setTimeout(() => {
            navigate("/Precot/QualityControl/F-03/Summary");
          }, 2000);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          setSubmitLoading(false);
        });
    } catch (error) {
      console.error("Error:", error);
      // throw new Error(error);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Chemical Analysis Parameter</b>
        </p>
      ),
      children: (
        <div>
          <table>
            <tr>
              <td colSpan="50" style={{ textAlign: "left" }}>
                Supplier :{/* <Input  className= "inp-new" type="text" /> */}
                <span
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  {supplier}
                </span>
              </td>
              <td colSpan="50" style={{ textAlign: "left" }}>
                Chemical Name :
                {/* <Input  className= "inp-new" type="text" /> */}
                <span
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  {chemicalName}
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="50" style={{ textAlign: "left" }}>
                Chemical Batch No/ Lot No:
                {/* <Input  className= "inp-new" type="text" /> */}
                <span
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  {chemicalBatchNo}
                </span>
              </td>
              <td colSpan="50" style={{ textAlign: "left" }}>
                Material Doc.No/GRN:
                <span
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  {materialDocNo}
                </span>
                {/* <Input  className= "inp-new" type="text" /> */}
              </td>
            </tr>
            <tr>
              <td colSpan="25" style={{ textAlign: "left" }}>
                Analytical Reference No:
                <Input
                  className="inp-new"
                  type="text"
                  value={analyticalRequest}
                  disabled={disable}
                  onChange={(e) => setAnalyticalRequest(e.target.value)}
                />
              </td>
              <td colSpan="40" style={{ textAlign: "left" }}>
                Tested Date :
                <Input
                  className="inp-new"
                  type="date"
                  value={testedDate}
                  disabled={disable}
                  onChange={(e) => setTestedDate(e.target.value)}
                />{" "}
              </td>

              <td colSpan="30" style={{ textAlign: "left" }}>
                Sample Date :
                <Input
                  className="inp-new"
                  type="date"
                  value={sampleDate}
                  disabled={disable}
                  onChange={(e) => setSampleDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">S.No.</th>
              <th colSpan="35">Parameter</th>
              <th colSpan="30">Specification</th>
              <th colSpan="30">Observation/Test Results</th>
            </tr>
            <tr>
              <th colSpan="5">1</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Appearance
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={appearanceSpecification}
                  disabled={disable}
                  onChange={(e) => setAppearanceSpecification(e.target.value)}
                />
              </td>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={appearanceObservation}
                  disabled={disable}
                  onChange={(e) => setappearanceObservation(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">2</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Colour
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={colourSpecification}
                  disabled={disable}
                  onChange={(e) => setColourSpecification(e.target.value)}
                />
              </td>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={colourObservation}
                  disabled={disable}
                  onChange={(e) => setColourObservation(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">3</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Odour
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={odourSpecification}
                  disabled={disable}
                  onChange={(e) => setodourSpecification(e.target.value)}
                />
              </td>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={odourObservation}
                  disabled={disable}
                  onChange={(e) => setodourObservation(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">4</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Solubility in Water
              </th>
              <td colSpan="30">
                <Select
                  placeholder="Select Solubility in Water"
                  style={{
                    width: "100%", // Adjust the width as needed
                  }}
                  value={solubilitySpecification}
                  onChange={(value) => setsolubilitySpecification(value)}
                  options={values_Specification}
                  onKeyDown={(e) => {
                    handleSelectText(e, "solubilitySpecification");
                  }}
                  disabled={disable}
                  showSearch
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </td>
              <td colSpan="30">
                <Select
                  placeholder="Select Solubility in Water"
                  style={{
                    width: "100%", // Adjust the width as needed
                  }}
                  value={solubilityObservation}
                  onChange={(value) => setsolubilityObservation(value)}
                  options={values_Specification}
                  disabled={disable}
                  onKeyDown={(e) => {
                    handleSelectText(e, "solubilityObservation");
                  }}
                  showSearch
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">5</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Visible / insoluble Impurities
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={visibleSpecification}
                  disabled={disable}
                  onChange={(e) => setvisibleSpecification(e.target.value)}
                  onKeyDown={(e) => {
                    const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                    // Check if the pressed key is not valid
                    if (
                      !isAlphanumeric.test(e.key) &&
                      ![
                        "Backspace",
                        "Tab",
                        "ArrowLeft",
                        "ArrowRight",
                        "_",
                        " ",
                      ].includes(e.key)
                    ) {
                      e.preventDefault(); // Prevent the default action (character input)
                    }
                  }}
                />
              </td>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={visibleObservation}
                  disabled={disable}
                  onChange={(e) => setvisibleObservation(e.target.value)}
                  onKeyDown={(e) => {
                    const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                    // Check if the pressed key is not valid
                    if (
                      !isAlphanumeric.test(e.key) &&
                      ![
                        "Backspace",
                        "Tab",
                        "ArrowLeft",
                        "ArrowRight",
                        "_",
                        " ",
                      ].includes(e.key)
                    ) {
                      e.preventDefault(); // Prevent the default action (character input)
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">6</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                pH
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={pHSpecification}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_pHSP}
                  onChange={handleChange_pHSP}
                  disabled={disable}
                />
              </td>
              <td colSpan="30">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={pHObservation}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_pH}
                  onChange={handleChange_pH}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">7</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Purity%
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={puritySpecification}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_puritySP}
                  onChange={handleChange_puritySP}
                  disabled={disable}
                />
              </td>
              <td colSpan="30">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={purityObservation}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_purityOB}
                  onChange={handleChange_purityOB}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">8</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Relative Density(Kg/Lt)
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={relativeSpecification}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_relativeSP}
                  onChange={handleChange_relativeSP}
                  disabled={disable}
                />
              </td>
              <td colSpan="30">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={relativeObservation}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_relativeOB}
                  onChange={handleChange_relativeOB}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">9</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Specific Gravity
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={specificSpecification}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_specificSP}
                  onChange={handleChange_specificSP}
                  disabled={disable}
                />
              </td>
              <td colSpan="30">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={specificObservation}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_specificOB}
                  onChange={handleChange_specificOB}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5">10</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Total Solids % [Non- Volatile matter by weight(g)]
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={totalSolidsSpecification}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_totalSolidSP}
                  onChange={handleChange_totalSolidSP}
                  disabled={disable}
                />
              </td>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={totalSolidsObservation}
                  style={{ textAlign: "center", width: "100%" }}
                  // onBlur={handle_blur_totalSolidOB}
                  onChange={handleChange_totalSolidOB}
                  disabled={disable}
                />
              </td>
            </tr>
            {/* <tr>
              <th colSpan="5">11</th>
              <th colSpan="35" style={{ textAlign: "center", height: "25px" }}>
                Moisture %
              </th>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  type="text"
                  value={moistureSpecification}
                  style={{ textAlign: "center", width: "100%" }}
                  onBlur={handle_blur_moistureSP}
                   onChange={handleChange_moistureSP}
                  disabled={disable}
                />
              </td>
              <td colSpan="30">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={moistureObservation}
                  style={{ textAlign: "center", width: "100%" }}
                  onBlur={handle_blur_moistureOB}
                   onChange={handleChange_moistureOB}
                  disabled={disable}
                />
              </td>
            </tr> */}
            <tr>
              <th colSpan="5">Calculation</th>
              <th colSpan="40">
                Standardized Chemical Lot no:{" "}
                <TextArea
                  className="inp-new"
                  type="text"
                  value={calculationStanchemist}
                  disabled={disable}
                  onChange={(e) => setCalculationStanchemist(e.target.value)}
                />
              </th>
              <td colSpan="50" style={{ height: "35px" }}>
                {" "}
                {/* <Input
                  className="inp-new"
                  type="text"
                  value={calculationRemarks}
                  disabled={disable}
                  onChange={(e) => setCalculationRemarks(e.target.value)}
                /> */}
                <div
                  style={{ maxWidth: 600, margin: "0 auto", padding: "10px" }}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ padding: "10px" }}>Sample weight (g):</td>
                        <td style={{ padding: "10px" }}>
                          <Input
                            type="text"
                            placeholder="Number with 4-decimals"
                            value={sampleWeight}
                            disabled={disable}
                            onChange={(e) => {
                              setSampleWeight(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px" }}>Burette Reading:</td>
                        <td style={{ padding: "10px" }}>
                          <Input
                            type="text"
                            placeholder="Number with 4-decimals"
                            value={buretteReading}
                            disabled={disable}
                            onChange={(e) => {
                              setBuretteReading(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px" }}>
                          Normality of the standard solution:
                        </td>
                        <td style={{ padding: "10px" }}>
                          <Input
                            type="text"
                            placeholder="Number with 4-decimals"
                            value={normalityStandardSolution}
                            disabled={disable}
                            onChange={(e) => {
                              setNormalityStandardSolution(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px" }}>
                          Equivalent weight Testing chemical:
                        </td>
                        <td style={{ padding: "10px" }}>
                          <Input
                            type="text"
                            placeholder="Number with 4-decimals"
                            value={testingChemical}
                            disabled={disable}
                            onChange={(e) => {
                              setTestingChemical(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan="2"
                          style={{
                            textAlign: "center",
                            margin: "10px 0",
                            padding: "10px",
                          }}
                        >
                          <p>
                            Purity(%) = (Burette Reading × Normality of the
                            standard solution × Equivalent weight Testing
                            chemical) / (Sample Weight × 10)
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px" }}>Purity (%):</td>
                        <td style={{ padding: "10px" }}>
                          <Input
                            type="text"
                            placeholder="Calculated Purity"
                            value={purity}
                            disabled={disable}
                            readOnly
                            style={{ fontWeight: "bold" }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              {/* <td colSpan="25"></td> */}
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "35px" }}>
                Disposal Method
              </th>
              <td colSpan="95">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={
                    disposal
                      ? disposal
                      : "Tested chemicals/residuals are diluted &drained to ETP"
                  }
                  disabled={disable}
                  onChange={(e) => setDisposal(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "35px" }}>
                Remarks
              </th>
              <td colSpan="95">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={remarks}
                  disabled={disable}
                  onChange={(e) => setremarks(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan="10"
                style={{ textAlign: "center", padding: "10px", height: "35px" }}
              >
                Qty. Accepted in Kg:{" "}
              </td>
              <td colSpan="20">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={qtyAcceptedInKg}
                  disabled={disable}
                  onChange={(e) => setQtyAcceptedInKg(e.target.value)}
                />
              </td>
              <td colSpan="10" style={{ textAlign: "center", padding: "10px" }}>
                Qty. Rejected in Kg:{" "}
              </td>
              <td colSpan="20">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={qtyRejectedInKg}
                  disabled={disable}
                  onChange={(e) => setQtyRejectedInKg(e.target.value)}
                />
              </td>
              <td colSpan="10" style={{ textAlign: "center", padding: "10px" }}>
                Qty. Accepted under Deviation in Kg:{" "}
              </td>
              <td colSpan="30">
                {" "}
                <Input
                  className="inp-new"
                  type="text"
                  value={qtyAcceptedDevInKg}
                  disabled={disable}
                  onChange={(e) => setQtyAcceptedDevInKg(e.target.value)}
                />
              </td>
            </tr>
          </table>
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
                <b>Tested By (Chemist) : Sign and Date </b>
              </td>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Approved By : Sign and Date </b>
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
                {printData?.chemist_status === "CHEMIST_APPROVED" && (
                  <>
                    <br />
                    {getImage !== "" && (
                      <img className="signature" src={getImage} alt="Chemist" />
                    )}
                    <br />
                    {printData.chemist_sign} <br />
                    {formattedChemistDate}
                  </>
                )}
                {/* {moment(printData.chemist_submit_on).format("DD/MM/YYYY HH:mm")} */}
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
                {(printData?.qc_status === "QC_REJECTED" ||
                  printData?.qc_status === "QC_APPROVED" ||
                  printData?.qc_status === "QA_REJECTED" ||
                  printData?.qc_status === "QA_APPROVED") && (
                  <>
                    {getImage1 !== "" && (
                      <img className="signature" src={getImage1} alt="QC" />
                    )}
                    <br />
                    {printData.qc_sign} <br />
                    {formattedQCDate}
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
          role === "QC_MANAGER" || role === "QA_MANAGER" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  // display: canDisplayButtons(),
                  display: submitBtnStatus ? "block" : "none",
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
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  // display: canDisplayButtons(),
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
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  //   display: canDisplayButton2(),
                  display: saveBtnStatus ? "block" : "none",
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
                  // display: canDisplayButtons(),
                  display: submitBtnStatus ? "block" : "none",
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
            // onClick={handleLogout}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
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
        {/* <Form.Item label="Date" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{newDate}</p>
        </Form.Item>
        <Form.Item label="Shift" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{shift}</p>
        </Form.Item> */}
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
      <div></div>
    </div>
  );
};

export default QualityControl_f03;
