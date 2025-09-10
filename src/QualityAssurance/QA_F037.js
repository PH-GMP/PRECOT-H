/* eslint-disable no-restricted-globals */

import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
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
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_F037 = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const formName = "Final Inspection Report";
  const formatNo = "PH-QAD01/F-037";
  const [open, setOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState();
  const [rejectModal, setRejectModal] = useState(false);
  const [selectedBMr, setSelectedBMR] = useState("");
  const [selectedpOrder, setSelectedpOrder] = useState("");
  const [poNo, setPoNo] = useState("");
  const [material, setMaterial] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const location = useLocation();
  const { editBMR, editDate, editShift, editpOrder } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isEditable, setIsEditable] = useState();
  const [date, setDate] = useState(null);
  const [fgNo, setFgNo] = useState("");
  const [aqlSampleSize, setAqlSampleSize] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [firNo, setFirNo] = useState("");
  const [paramSampleSize, setParamSampleSize] = useState("");
  const [shift, setShift] = useState(null);
  const [qtyBagSpecification, setQtyBagSpecification] = useState("");
  const [weightBagSpecification, setWeightBagSpecification] = useState("");
  const [fillingHeightSpecification, setFillingHeightSpecification] =
    useState("");
  const [gsmWeightOfBallsSpecification, setGsmWeightOfBallsSpecification] =
    useState("");
  const [surfacePatternSpecification, setSurfacePatternSpecification] =
    useState("");
  const [noOfFoldsSpecification, setNoOfFoldsSpecification] = useState("");
  const [moistureSpecification, setMoistureSpecification] = useState("");
  const [qtyBagActualFindings, setQtyBagActualFindings] = useState("");
  const [weightBagActualFindings, setWeightBagActualFindings] = useState("");
  const [fillingHeightActualFindings, setFillingHeightActualFindings] =
    useState("");
  const [gsmWeightOfBallsActualFindings, setGsmWeightOfBallsActualFindings] =
    useState("");
  const [surfacePatternActualFindings, setSurfacePatternActualFindings] =
    useState("");
  const [noOfFoldsActualFindings, setNoOfFoldsActualFindings] = useState("");
  const [moistureActualFindings, setMoistureActualFindings] = useState("");
  const [lesserQuantity, setLesserQuantity] = useState("");
  const [incorrectPackagingMaterial, setIncorrectPackagingMaterial] =
    useState("");
  const [wrongMissingLotNumber, setWrongMissingLotNumber] = useState("");
  const [metalInsectContamination, setMetalInsectContamination] = useState("");
  const [significantForeignMaterial, setSignificantForeignMaterial] =
    useState("");
  const [incorrectBarCodeOnBag, setIncorrectBarCodeOnBag] = useState("");
  const [improperShaperSize, setImproperShaperSize] = useState("");
  const [majorDiscoloration, setMajorDiscoloration] = useState("");
  const [foldedPads, setFoldedPads] = useState("");
  const [dustContamination, setDustContamination] = useState("");
  const [lowerFillingHeight, setLowerFillingHeight] = useState("");
  const [improperOpenDamagedSealing, setImproperOpenDamagedSealing] =
    useState("");
  const [noCottonAtEnds, setNoCottonAtEnds] = useState("");
  const [minorColourContamination, setMinorColourContamination] = useState("");
  const [blackContamination, setBlackContamination] = useState("");
  const [lessGsm, setLessGsm] = useState("");
  const [edgeCondition, setEdgeCondition] = useState("");
  const [hardBalls, setHardBalls] = useState("");
  const [lessCotton, setLessCotton] = useState("");

  // Defects observed and status initialized with "0"
  const [criticalTotalNoOfDefectObserved, setCriticalTotalNoOfDefectObserved] =
    useState("");
  const [majorTotalNoOfDefectObserved, setMajorTotalNoOfDefectObserved] =
    useState("");
  const [minorTotalNoOfDefectObserved, setMinorTotalNoOfDefectObserved] =
    useState("");
  const [
    criticalMaximumNoOfDefectObserved,
    setCriticalMaximumNoOfDefectObserved,
  ] = useState("");
  const [majorMaximumNoOfDefectObserved, setMajorMaximumNoOfDefectObserved] =
    useState("");
  const [minorMaximumNoOfDefectObserved, setMinorMaximumNoOfDefectObserved] =
    useState("");
  const [lotStatus, setLotStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [finalInspectionId, setFinalInspectionId] = useState("");
  const [response, setResponse] = useState();
  const [showModal, setShowModal] = useState(false);
  const editShown = useRef(false);
  const alertShown = useRef(false);
  const today = new Date().toISOString().split("T")[0];
  const token = localStorage.getItem("token");
  const roleauth = localStorage.getItem("role");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    setIsEditable(canEdit());
  }, [response]);

  const canEdit = () => {
    if (roleauth === "ROLE_QA") {
      return !(
        response &&
        response?.qa_inspector_status === "QA_INS_APPROVED" &&
        response?.qa_mr_status !== "QA_MR_REJECTED"
      );
    } else if (roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") {
      return !(
        response &&
        (response?.qa_mr_status === "QA_MR_APPROVED" ||
          response?.qa_mr_status === "WAITING_FOR_APPROVAL" ||
          response?.qa_mr_status === "QA_MR_REJECTED")
      );
    } else {
      return false;
    }
  };

  let formattedInspectorDate;
  if (response?.qa_inspector_submit_on) {
    formattedInspectorDate = moment(response.qa_inspector_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where auditee is null or undefined
    formattedInspectorDate = ""; // Or any other default value or error handling
  }

  let formattedQAMRDate;
  if (response?.qa_mr_submit_on) {
    formattedQAMRDate = moment(response.qa_mr_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    formattedQAMRDate = "";
  }

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectFinalInspectionReport`,
        {
          id: finalInspectionId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/QualityAssurance/QA_F037_summary");
      })
      .catch((err) => {
        setLoading(false);
        //
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleReject = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectReason) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectFinalInspectionReport`,
        {
          id: finalInspectionId,
          status: "Reject",
          remarks: rejectReason,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityAssurance/QA_F037_summary");
      })
      .catch((err) => {
        setLoading(false);
        //
        message.error(err.res.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const { confirm } = Modal;

  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      // content: "You will be logged out and redirected to the login page.",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {
        // Logic if the user cancels the logout action
      },
    });
  };

  useEffect(() => {
    const username = response?.qa_inspector_sign;

    if (username) {
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
          //
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
          //
        });
    }
  }, [response,API.prodUrl, token]);

  useEffect(() => {
    const username = response?.qa_mr_sign;

    if (username) {
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
          //
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
          //
        });
    }
  }, [response,API.prodUrl, token]);

  useEffect(() => {
    if (editBMR) {
      setSelectedBMR(editBMR);
    }
  }, [editBMR]);

  useEffect(() => {
    fetchInspectionEditDate();
    firgeneration();
  }, []);

  const firgeneration = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/number/generation?formNumber=PH-QAD01/F-037`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFirNo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchInspectionEditDate = async () => {
    const token = localStorage.getItem("token");

    // Prevent multiple alerts
    if (alertShown.current) return;
    alertShown.current = true;

    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/findByParamFinalInspectionReport?date=${editDate}&shift=${editShift}&pOrder=${editpOrder}&bmrNo=${editBMR}&formatNo=PH-QAD01/F-037`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if data is returned
      if (response.data && response.data.length > 0) {
        editShown.current = true;
        const responseData = response.data[0];

        setResponse(responseData);

        setFinalInspectionId(responseData.finalInspectionId);
        setProductDescription(responseData.productDescription);
        setCustomerName(responseData.customerName);
        setTotalQuantity(responseData.totalQantity);
        setAqlSampleSize(responseData.aqlSampleSize);
        setSelectedBMR(responseData.bmrNo);
        setSelectedpOrder(responseData.porder);
        setMaterial(responseData.itemCode);
        setLotNo(responseData.lotNo);

        // Conditionally set FIR number
        if (responseData.firNo) {
          setFirNo(responseData.firNo);
        } else {
          await firgeneration();
        }

        setFgNo(responseData.fgNo);
        setDate(responseData.date);
        setShift(responseData.shift);
        setRemark(responseData.remark);

        setQtyBagSpecification(responseData.qtyBagSpecification);
        setWeightBagSpecification(responseData.weightBagSpecification);
        setFillingHeightSpecification(responseData.fillingHeightSpecification);
        setGsmWeightOfBallsSpecification(
          responseData.gsmWeightOfBallsSpecification
        );
        setSurfacePatternSpecification(
          responseData.surfacePatternSpecification
        );
        setNoOfFoldsSpecification(responseData.noOfFoldsSpecification);
        setMoistureSpecification(responseData.moistureSpecification);

        setParamSampleSize(responseData.qtyBagSamplesize);
        setQtyBagActualFindings(responseData.qtyBagActualFindings);
        setWeightBagActualFindings(responseData.weightBagActualFindings);
        setFillingHeightActualFindings(
          responseData.fillingHeightActualFindings
        );
        setGsmWeightOfBallsActualFindings(
          responseData.gsmWeightOfBallsActualFindings
        );
        setSurfacePatternActualFindings(
          responseData.surfacePatternActualFindings
        );
        setNoOfFoldsActualFindings(responseData.noOfFoldsActualFindings);
        setMoistureActualFindings(responseData.moistureActualFindings);

        // Set additional details
        setLesserQuantity(responseData.lesserQuantity);
        setIncorrectPackagingMaterial(responseData.incorrectPackagingMaterial);
        setWrongMissingLotNumber(responseData.wrongMissingLotNumber);
        setMetalInsectContamination(responseData.metalInsectContamination);
        setSignificantForeignMaterial(responseData.significantForeignMaterial);
        setIncorrectBarCodeOnBag(responseData.incorrectBarCodeOnBag);
        setImproperShaperSize(responseData.improperShaperSize);
        setMajorDiscoloration(responseData.majorDiscoloration);
        setFoldedPads(responseData.foldedPads);
        setDustContamination(responseData.dustContamination);
        setLowerFillingHeight(responseData.lowerFillingHeight);
        setImproperOpenDamagedSealing(responseData.improperOpenDamagedSealing);
        setNoCottonAtEnds(responseData.noCottonAtEnds);
        setMinorColourContamination(responseData.minorColourContamination);
        setBlackContamination(responseData.blackContamination);
        setLessGsm(responseData.lessGsm);
        setEdgeCondition(responseData.edgeCondition);
        setHardBalls(responseData.hardBalls);
        setLessCotton(responseData.lessCotton);
        setCriticalTotalNoOfDefectObserved(
          responseData.criticalTotalNoOfDefectObserved
        );
        setMajorTotalNoOfDefectObserved(
          responseData.majorTotalNoOfDefectObserved
        );
        setMinorTotalNoOfDefectObserved(
          responseData.minorTotalNoOfDefectObserved
        );
        setCriticalMaximumNoOfDefectObserved(
          responseData.criticalMaximumNoOfDefectObserved
        );
        setMajorMaximumNoOfDefectObserved(
          responseData.majorMaximumNoOfDefectObserved
        );
        setMinorMaximumNoOfDefectObserved(
          responseData.minorMaximumNoOfDefectObserved
        );
        setLotStatus(responseData.lotStatus);
      } else {
        await firgeneration();
        setIsEditable(canEdit());
      }

      if (
        (roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") &&
        (response.data[0]?.qa_inspector_status !== "QA_INS_APPROVED" ||
          response.data[0]?.qa_mr_status === "QA_MR_REJECTED")
      ) {
        message.error("QA Inspector Not yet Approved");
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/QA_F037_summary");
        }, 1500);
        alertShown.current = true;
      }
    } catch (error) {
      console.error("Error fetching inspection data:", error);
    }
  };

  useEffect(() => {
    if (editpOrder) {
      fetchPoNoAndDetails();
    }
  }, [editpOrder]);

  const showDrawer = () => {
    setOpen(true);
  };

  const handleBack = () => {
    navigate("/Precot/QualityAssurance/QA_F037_Summary");
  };

  const handleCancel = () => {
    setRejectModal(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      lesserQuantity ||
      incorrectPackagingMaterial ||
      wrongMissingLotNumber ||
      metalInsectContamination ||
      significantForeignMaterial ||
      incorrectBarCodeOnBag ||
      improperShaperSize ||
      majorDiscoloration
    ) {
      const totalValue =
        Number(lesserQuantity) +
        Number(incorrectPackagingMaterial) +
        Number(wrongMissingLotNumber) +
        Number(metalInsectContamination) +
        Number(significantForeignMaterial) +
        Number(incorrectBarCodeOnBag) +
        Number(improperShaperSize) +
        Number(majorDiscoloration);

      setCriticalTotalNoOfDefectObserved(totalValue);
    }
  }, [
    lesserQuantity,
    incorrectPackagingMaterial,
    wrongMissingLotNumber,
    metalInsectContamination,
    significantForeignMaterial,
    incorrectBarCodeOnBag,
    improperShaperSize,
    majorDiscoloration,
  ]);

  useEffect(() => {
    // Logic for calculating total defects for the second set of values
    if (
      foldedPads ||
      dustContamination ||
      lowerFillingHeight ||
      improperOpenDamagedSealing ||
      noCottonAtEnds
    ) {
      const totalValue =
        Number(foldedPads) +
        Number(dustContamination) +
        Number(lowerFillingHeight) +
        Number(improperOpenDamagedSealing) +
        Number(noCottonAtEnds);

      setMajorTotalNoOfDefectObserved(totalValue); // Replace with the appropriate state setter
    }
  }, [
    foldedPads,
    dustContamination,
    lowerFillingHeight,
    improperOpenDamagedSealing,
    noCottonAtEnds,
  ]);

  useEffect(() => {
    // Logic for calculating total defects for the third set of values
    if (
      minorColourContamination ||
      blackContamination ||
      lessGsm ||
      edgeCondition ||
      hardBalls ||
      lessCotton
    ) {
      const totalValue =
        Number(minorColourContamination) +
        Number(blackContamination) +
        Number(lessGsm) +
        Number(edgeCondition) +
        Number(hardBalls) +
        Number(lessCotton);

      setMinorTotalNoOfDefectObserved(totalValue); // Replace with the appropriate state setter
    }
  }, [
    minorColourContamination,
    blackContamination,
    lessGsm,
    edgeCondition,
    hardBalls,
    lessCotton,
  ]);

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_QA") {
      if (
        response &&
        response?.qa_inspector_status === "QA_INS_APPROVED" &&
        response?.qa_mr_status !== "QA_MR_REJECTED"
      ) {
        return "none";
      } else if (
        response &&
        response?.qa_inspector_status === "QA_INS_APPROVED" &&
        response?.qa_mr_status !== "WAITING_FOR_APPROVAL"
      ) {
        return true;
      }
      return "block";
    } else if (roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") {
      if (
        response?.qa_mr_status == "QA_MR_APPROVED" ||
        response?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        response?.qa_mr_status == "QA_MR_APPROVED" ||
        response?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_QA") {
      if (
        response?.qa_inspector_status == "QA_INS_APPROVED" &&
        response?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      } else if (
        response?.qa_inspector_status == "QA_INS_APPROVED" &&
        (response?.qa_mr_status == "WAITING_FOR_APPROVAL" ||
          response?.qa_mr_status == "QA_MR_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") {
      if (
        response?.qa_mr_status == "QA_MR_APPROVED" ||
        response?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        response?.qa_mr_status == "QA_MR_APPROVED" ||
        response?.qa_mr_status == "QA_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleSave = () => {
    const payload = {
      finalInspectionId: finalInspectionId,
      formatName: "FINAL INSPECTION REPORT(PRE - DISPATCH)",
      formatNo: "PH-QAD01/F-037",
      revisionNo: "3",
      refSopNo: "PH-QAD01-D-32",
      productDescription: productDescription,
      bmrNo: editBMR,
      firNo: firNo,
      customerName: customerName,
      porder: editpOrder,
      date: editDate,
      totalQantity: totalQuantity,
      itemCode: material,
      fgNo: fgNo,
      aqlSampleSize: aqlSampleSize,
      lotNo: lotNo,
      shift: editShift,
      qtyBagSpecification: qtyBagSpecification,
      weightBagSpecification: weightBagSpecification,
      fillingHeightSpecification: fillingHeightSpecification,
      gsmWeightOfBallsSpecification: gsmWeightOfBallsSpecification,
      surfacePatternSpecification: surfacePatternSpecification,
      noOfFoldsSpecification: noOfFoldsSpecification,
      moistureSpecification: moistureSpecification,
      qtyBagSamplesize: paramSampleSize,
      weightBagSamplesize: paramSampleSize,
      fillingHeightSamplesize: paramSampleSize,
      gsmWeightOfBallsSamplesize: paramSampleSize,
      surfacePatternSamplesize: paramSampleSize,
      noOfFoldsSamplesize: paramSampleSize,
      moistureSamplesize: paramSampleSize,
      qtyBagActualFindings: qtyBagActualFindings,
      weightBagActualFindings: weightBagActualFindings,
      fillingHeightActualFindings: fillingHeightActualFindings,
      gsmWeightOfBallsActualFindings: gsmWeightOfBallsActualFindings,
      surfacePatternActualFindings: surfacePatternActualFindings,
      noOfFoldsActualFindings: noOfFoldsActualFindings,
      moistureActualFindings: moistureActualFindings,
      lesserQuantity: lesserQuantity,
      incorrectPackagingMaterial: incorrectPackagingMaterial,
      wrongMissingLotNumber: wrongMissingLotNumber,
      metalInsectContamination: metalInsectContamination,
      significantForeignMaterial: significantForeignMaterial,
      incorrectBarCodeOnBag: incorrectBarCodeOnBag,
      improperShaperSize: improperShaperSize,
      majorDiscoloration: majorDiscoloration,
      foldedPads: foldedPads,
      dustContamination: dustContamination,
      lowerFillingHeight: lowerFillingHeight,
      improperOpenDamagedSealing: improperOpenDamagedSealing,
      noCottonAtEnds: noCottonAtEnds,
      minorColourContamination: minorColourContamination,
      blackContamination: blackContamination,
      lessGsm: lessGsm,
      edgeCondition: edgeCondition,
      hardBalls: hardBalls,
      lessCotton: lessCotton,
      criticalTotalNoOfDefectObserved: criticalTotalNoOfDefectObserved,
      majorTotalNoOfDefectObserved: majorTotalNoOfDefectObserved,
      minorTotalNoOfDefectObserved: minorTotalNoOfDefectObserved,
      criticalMaximumNoOfDefectObserved: criticalMaximumNoOfDefectObserved,
      majorMaximumNoOfDefectObserved: majorMaximumNoOfDefectObserved,
      minorMaximumNoOfDefectObserved: minorMaximumNoOfDefectObserved,
      lotStatus: lotStatus,
      remark: remark,
    };

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/api/saveFinalInspectionReport`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Form saved Succcessfully");

        navigate("/Precot/QualityAssurance/QA_F037_summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    if (!editDate) {
      message.error("Date is required");
      return;
    }
    if (!editShift) {
      message.error("Shift is required");
      return;
    }
    if (!firNo) {
      message.error("FIRNo is required");
      return;
    }

    if (!lotStatus) {
      message.error("lotstatus is required");
      return;
    }

    const payload = {
      finalInspectionId: finalInspectionId,
      formatName: " FINAL INSPECTION REPORT(PRE - DISPATCH)",
      formatNo: "PH-QAD01/F-037",
      revisionNo: "3",
      refSopNo: "PH-QAD01-D-32",
      productDescription: productDescription === "" ? "NA" : productDescription,
      bmrNo: editBMR,
      firNo: firNo,
      customerName: customerName,
      porder: editpOrder,
      date: editDate,
      totalQantity: totalQuantity === "" ? "NA" : totalQuantity,
      itemCode: material,
      fgNo: fgNo === "" ? "NA" : fgNo,
      aqlSampleSize: aqlSampleSize === "" ? "NA" : aqlSampleSize,
      lotNo: lotNo === "" ? "NA" : lotNo,
      shift: editShift,
      qtyBagSpecification:
        qtyBagSpecification === "" ? "NA" : qtyBagSpecification,
      weightBagSpecification:
        weightBagSpecification === "" ? "NA" : weightBagSpecification,
      fillingHeightSpecification:
        fillingHeightSpecification === "" ? "NA" : fillingHeightSpecification,
      gsmWeightOfBallsSpecification:
        gsmWeightOfBallsSpecification === ""
          ? "NA"
          : gsmWeightOfBallsSpecification,
      surfacePatternSpecification:
        surfacePatternSpecification === "" ? "NA" : surfacePatternSpecification,
      noOfFoldsSpecification:
        noOfFoldsSpecification === "" ? "NA" : noOfFoldsSpecification,
      moistureSpecification:
        moistureSpecification === "" ? "NA" : moistureSpecification,
      qtyBagSamplesize: paramSampleSize === "" ? "NA" : paramSampleSize,
      weightBagSamplesize: paramSampleSize === "" ? "NA" : paramSampleSize,
      fillingHeightSamplesize: paramSampleSize === "" ? "NA" : paramSampleSize,
      gsmWeightOfBallsSamplesize:
        paramSampleSize === "" ? "NA" : paramSampleSize,
      surfacePatternSamplesize: paramSampleSize === "" ? "NA" : paramSampleSize,
      noOfFoldsSamplesize: paramSampleSize === "" ? "NA" : paramSampleSize,
      moistureSamplesize: paramSampleSize === "" ? "NA" : paramSampleSize,
      qtyBagActualFindings:
        qtyBagActualFindings === "" ? "NA" : qtyBagActualFindings,
      weightBagActualFindings:
        weightBagActualFindings === "" ? "NA" : weightBagActualFindings,
      fillingHeightActualFindings:
        fillingHeightActualFindings === "" ? "NA" : fillingHeightActualFindings,
      gsmWeightOfBallsActualFindings:
        gsmWeightOfBallsActualFindings === ""
          ? "NA"
          : gsmWeightOfBallsActualFindings,
      surfacePatternActualFindings:
        surfacePatternActualFindings === ""
          ? "NA"
          : surfacePatternActualFindings,
      noOfFoldsActualFindings:
        noOfFoldsActualFindings === "" ? "NA" : noOfFoldsActualFindings,
      moistureActualFindings:
        moistureActualFindings === "" ? "NA" : moistureActualFindings,
      lesserQuantity: lesserQuantity,
      incorrectPackagingMaterial: incorrectPackagingMaterial,
      wrongMissingLotNumber: wrongMissingLotNumber,
      metalInsectContamination: metalInsectContamination,
      significantForeignMaterial: significantForeignMaterial,
      incorrectBarCodeOnBag: incorrectBarCodeOnBag,
      improperShaperSize: improperShaperSize,
      majorDiscoloration: majorDiscoloration,
      foldedPads: foldedPads,
      dustContamination: dustContamination,
      lowerFillingHeight: lowerFillingHeight,
      improperOpenDamagedSealing: improperOpenDamagedSealing,
      noCottonAtEnds: noCottonAtEnds,
      minorColourContamination: minorColourContamination,
      blackContamination: blackContamination,
      lessGsm: lessGsm,
      edgeCondition: edgeCondition,
      hardBalls: hardBalls,
      lessCotton: lessCotton,
      criticalTotalNoOfDefectObserved: criticalTotalNoOfDefectObserved,
      majorTotalNoOfDefectObserved: majorTotalNoOfDefectObserved,
      minorTotalNoOfDefectObserved: minorTotalNoOfDefectObserved,
      criticalMaximumNoOfDefectObserved: criticalMaximumNoOfDefectObserved,
      majorMaximumNoOfDefectObserved: majorMaximumNoOfDefectObserved,
      minorMaximumNoOfDefectObserved: minorMaximumNoOfDefectObserved,
      lotStatus: lotStatus === "" ? "NA" : lotStatus,
      remark: remark === "" ? "NA" : remark,
    };

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/api/SubmitFinalInspectionReport`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Form Submitted Succcessfully");

        navigate("/Precot/QualityAssurance/QA_F037_summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPoNoAndDetails = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");

      // Fetch PoNo and Material first
      const poResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/poNoAndMaterial/finalInspectionReport?pOrder=${editpOrder}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const poData = poResponse.data[0]; // Take the first object in the array

      // Check if data is available
      const { PoNo, Itemcode } = poData;

      if (!editShown.current) {
        if (poData) {
          setPoNo(PoNo);
          setMaterial(Itemcode);
        }
      }

      // Now fetch Customer Name and Product Description based on Material
      const custResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/CustomerNameANdProductDesc/finalInspectionReport?material=${Itemcode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Only set Customer Name and Product Description if editShown.current is not true
      // if (!editShown.current) {
      if (!editShown.current) {
        setCustomerName(custResponse.data.customerName);
        setProductDescription(custResponse.data.productDesc);
      }
      // }
    } catch (error) {
      console.error(
        "Error fetching PoNo, Material, Customer Name, or Product Description:",
        error
      );
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const items = [
    {
      key: 1,
      label: <p>Final Inspection Report</p>,
      children: (
        <>
          <table style={{ width: "100%" }}></table>

          <table style={{ marginTop: "50px" }}>
            <thead>
              <tr>
                <td style={{ textAlign: "center" }}>Parameters</td>
                <td style={{ textAlign: "center" }}>Sample Size</td>
                <td style={{ textAlign: "center" }}>Specification</td>
                <td style={{ textAlign: "center" }}>
                  Actual Finding / Reading
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>Qty/ Bag</td>
                <td rowSpan={7}>
                  <Input
                    value={paramSampleSize}
                    disabled={!isEditable}
                    className="inp-new"
                    style={{ border: "none" }}
                    onChange={(e) => setParamSampleSize(e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={qtyBagSpecification}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setQtyBagSpecification(e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={qtyBagActualFindings}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setQtyBagActualFindings(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Weight/Bag</td>
                <td>
                  <Input
                    value={weightBagSpecification}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setWeightBagSpecification(e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={weightBagActualFindings}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setWeightBagActualFindings(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  Filling Height / Roll Dia
                </td>
                <td>
                  <Input
                    value={fillingHeightSpecification}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) =>
                      setFillingHeightSpecification(e.target.value)
                    }
                  />
                </td>
                <td>
                  <Input
                    value={fillingHeightActualFindings}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) =>
                      setFillingHeightActualFindings(e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>GSM / Weight of Balls</td>
                <td>
                  <Input
                    value={gsmWeightOfBallsSpecification}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) =>
                      setGsmWeightOfBallsSpecification(e.target.value)
                    }
                  />
                </td>

                <td>
                  <Input
                    value={gsmWeightOfBallsActualFindings}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) =>
                      setGsmWeightOfBallsActualFindings(e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Surface Pattern</td>
                <td>
                  <Input
                    value={surfacePatternSpecification}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) =>
                      setSurfacePatternSpecification(e.target.value)
                    }
                  />
                </td>
                <td>
                  <Input
                    value={surfacePatternActualFindings}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) =>
                      setSurfacePatternActualFindings(e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>No. of folds (Pleat)</td>
                <td>
                  <Input
                    value={noOfFoldsSpecification}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setNoOfFoldsSpecification(e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={noOfFoldsActualFindings}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setNoOfFoldsActualFindings(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Moisture %</td>
                <td>
                  <Input
                    value={moistureSpecification}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setMoistureSpecification(e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={moistureActualFindings}
                    disabled={!isEditable}
                    className="inp-new"
                    onChange={(e) => setMoistureActualFindings(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },

    {
      key: 2,
      label: "Category",
      children: (
        <>
          <table>
            <thead>
              <tr>
                <td style={{ padding: "5px" }}>Category</td>
                <td style={{ padding: "5px" }}>Defects</td>
                <td style={{ padding: "5px" }}>No. Of Defects Observed</td>
                <td style={{ padding: "5px" }}>
                  Total No. of Defects Observed
                </td>
                <td style={{ padding: "5px" }}>
                  Maximum No. of Defects Allowed
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "5px" }} rowSpan={8}>
                  Critical (Nil)
                </td>

                <td style={{ padding: "5px" }}>Lesser Quantity</td>
                <td>
                  <Input
                    type="text"
                    value={lesserQuantity}
                    style={{ textAlign: "center" }}
                    className="inp-new"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setLesserQuantity(value);
                      }
                    }}
                    disabled={!isEditable}
                  />
                </td>
                <td rowSpan={8}>
                  <Input
                    type="text"
                    value={criticalTotalNoOfDefectObserved}
                    readOnly
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setCriticalTotalNoOfDefectObserved(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
                <td rowSpan={8}>
                  <Input
                    type="text"
                    value={criticalMaximumNoOfDefectObserved}
                    style={{ textAlign: "center" }}
                    className="inp-new"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setCriticalMaximumNoOfDefectObserved(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>

              <tr>
                <td>Incorrect Packaging Material (Poly bag / SRT / Label)</td>
                <td>
                  <Input
                    type="text"
                    value={incorrectPackagingMaterial}
                    style={{ textAlign: "center" }}
                    className="inp-new"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setIncorrectPackagingMaterial(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Wrong / Missing Lot Number</td>
                <td>
                  <Input
                    type="text"
                    value={wrongMissingLotNumber}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setWrongMissingLotNumber(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Metal / Insect Contamination</td>
                <td>
                  <Input
                    type="text"
                    value={metalInsectContamination}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMetalInsectContamination(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Significant Foreign Material</td>
                <td>
                  <Input
                    type="text"
                    value={significantForeignMaterial}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setSignificantForeignMaterial(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Incorrect Bar code on bag / SRP / Label / Shipper</td>
                <td>
                  <Input
                    type="text"
                    value={incorrectBarCodeOnBag}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setIncorrectBarCodeOnBag(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Improper shape & Size</td>
                <td>
                  <Input
                    type="text"
                    value={improperShaperSize}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setImproperShaperSize(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Major Dis-coloration</td>
                <td>
                  <Input
                    type="text"
                    value={majorDiscoloration}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMajorDiscoloration(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }} rowSpan={5}>
                  Major (2.5)
                </td>
                <td style={{ padding: "5px" }}>Folded Pads / Cut Pads</td>
                <td>
                  <Input
                    type="text"
                    value={foldedPads}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setFoldedPads(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
                <td rowSpan={5}>
                  <Input
                    type="text"
                    className="inp-new"
                    readOnly
                    value={majorTotalNoOfDefectObserved}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMajorTotalNoOfDefectObserved(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
                <td rowSpan={5}>
                  <Input
                    type="text"
                    className="inp-new"
                    value={majorMaximumNoOfDefectObserved}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMajorMaximumNoOfDefectObserved(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>

              <tr>
                <td style={{ padding: "5px" }}>
                  Plastic / Hair / Dirt / Dust contamination
                </td>
                <td>
                  <Input
                    type="text"
                    className="inp-new"
                    value={dustContamination}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setDustContamination(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }}>
                  Lower Filling Height / Improper Pad Alignment
                </td>
                <td>
                  <Input
                    type="text"
                    className="inp-new"
                    value={lowerFillingHeight}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setLowerFillingHeight(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }}>
                  Improper / Open / Damaged Sealing
                </td>
                <td>
                  <Input
                    type="text"
                    className="inp-new"
                    value={improperOpenDamagedSealing}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setImproperOpenDamagedSealing(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }}>
                  No cotton at ends / Less Bonding Strength
                </td>
                <td>
                  <Input
                    type="text"
                    value={noCottonAtEnds}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setNoCottonAtEnds(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      key: 3,
      label: <span>Minor Category</span>,
      children: (
        <>
          <table>
            <thead>
              <tr>
                <td style={{ padding: "5px" }}>Category</td>
                <td style={{ padding: "5px" }}>Defects</td>
                <td style={{ padding: "5px" }}>No. Of Defects Observed</td>
                <td style={{ padding: "5px" }}>
                  Total No. of Defects Observed
                </td>
                <td style={{ padding: "5px" }}>
                  Maximum No. of Defects Allowed
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={6}>
                  <span style={{ padding: "5px" }}>Minor</span>
                </td>
                <td>Minor Colour Contamination</td>
                <td>
                  <Input
                    type="text"
                    value={minorColourContamination}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMinorColourContamination(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
                <td rowSpan={6}>
                  <Input
                    type="text"
                    value={minorTotalNoOfDefectObserved}
                    className="inp-new"
                    readOnly
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMinorTotalNoOfDefectObserved(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
                <td rowSpan={6}>
                  <Input
                    type="text"
                    value={minorMaximumNoOfDefectObserved}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setMinorMaximumNoOfDefectObserved(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Black Contamination</td>
                <td>
                  <Input
                    type="text"
                    value={blackContamination}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setBlackContamination(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>

              <tr>
                <td>Less GSM</td>
                <td>
                  <Input
                    type="text"
                    value={lessGsm}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setLessGsm(value);
                      }
                    }}
                    disabled={!isEditable}
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td>Edge Condition</td>
                <td>
                  <Input
                    type="text"
                    value={edgeCondition}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setEdgeCondition(value);
                      }
                    }}
                    min="0"
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td>Hard Balls / Smaller Size Balls</td>
                <td>
                  <Input
                    type="text"
                    value={hardBalls}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setHardBalls(value);
                      }
                    }}
                    min="0"
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td>Less Cotton / Loose Cotton / Tail Ends</td>
                <td>
                  <Input
                    type="text"
                    value={lessCotton}
                    className="inp-new"
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9\b]+$/.test(value)) {
                        setLessCotton(value);
                      }
                    }}
                    min="0"
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Lot Status</td>
                <td colSpan={4} style={{ textAlign: "left" }}>
                  <Select
                    placeholder="Select Lot status"
                    style={{ width: "50%" }}
                    value={lotStatus}
                    disabled={!isEditable}
                    onChange={(value) => setLotStatus(value)}
                  >
                    <Select.Option value="Accepted">Accepted</Select.Option>
                    <Select.Option value="Rejected">Rejected</Select.Option>
                    <Select.Option value="On Hold">On Hold</Select.Option>
                    <Select.Option value="Accepted Under Deviation">
                      Accepted Under Deviation
                    </Select.Option>
                    <Select.Option value="Rework">Rework</Select.Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>remarks</td>
                <td colSpan={4}>
                  <TextArea
                    value={remark}
                    className="inp-new"
                    disabled={!isEditable}
                    onChange={(e) => setRemark(e.target.value)}
                    rows={4}
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      key: 4,
      label: <span>Sign</span>,
      children: (
        <>
          <table style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Inspected By
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: "100px" }}>
                  <div style={{ textAlign: "center" }}>
                    {response?.qa_inspector_status === "QA_INS_APPROVED" && (
                      <>
                        {response && response.qa_inspector_sign}
                        <br />
                        {formattedInspectorDate}
                        <br />
                        {getImage1 && (
                          <img
                            className="signature"
                            src={getImage1}
                            alt="Auditee"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </td>

                <td colSpan={2}>
                  <div style={{ textAlign: "center" }}>
                    {((response &&
                      response?.qa_mr_status === "QA_MR_REJECTED") ||
                      (response &&
                        response?.qa_mr_status === "QA_MR_APPROVED")) && (
                      <>
                        {response && response.qa_mr_sign}
                        <br />
                        {formattedQAMRDate}
                        <br />
                        {getImage2 && (
                          <img
                            className="signature"
                            src={getImage2}
                            alt="Auditee"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  ];

  return (
    <>
      <BleachingHeader
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
          roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE" ? (
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
                loading={saveLoading}
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
                  display: canDisplayButton2(),
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
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

      <Input
        addonBefore="Bmr: "
        placeholder="Bmr: "
        type="text"
        disabled={!isEditable}
        style={{ width: "25%", marginLeft: "10px", marginTop: "10px" }}
        value={editBMR}
        readOnly
      />

      <Input
        addonBefore="FIR NO.:"
        placeholder="FIR NO.:"
        type="text"
        disabled={!isEditable}
        style={{ width: "20%", marginLeft: "10px" }}
        value={firNo}
        onChange={(e) => setFirNo(e.target.value)}
        readOnly
      />

      <Input
        addonBefore="Product Description.:"
        placeholder="Product Description.:"
        type="text"
        disabled={!isEditable}
        style={{ width: "20%", marginLeft: "10px" }}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        readOnly
      />

      <Input
        addonBefore="Customer No.:"
        placeholder="Customer No.:"
        type="text"
        disabled={!isEditable}
        style={{ width: "20%", marginLeft: "10px" }}
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        readOnly
      />

      <Input
        addonBefore="PO NO: "
        placeholder="PO NO: "
        type="text"
        disabled={!isEditable}
        style={{ width: "25%", marginLeft: "10px", marginTop: "10px" }}
        value={editpOrder}
        readOnly
      />

      <Input
        addonBefore="Date.:"
        placeholder="Date.:"
        type="date"
        value={editDate}
        max={today}
        readOnly
        style={{ width: "20%", marginTop: "10px", marginLeft: "10px" }}
        disabled={!isEditable}
        onChange={(e) => setDate(e.target.value)}
      />

      <Input
        addonBefore="Total Quantity"
        placeholder="Total Quantity:"
        value={totalQuantity}
        disabled={!isEditable}
        style={{ width: "20%", marginTop: "10px", marginLeft: "10px" }}
        onChange={(e) => setTotalQuantity(e.target.value)}
      />

      <Input
        addonBefore="Item Code"
        placeholder="Item Code:"
        style={{ width: "20%", marginTop: "10px", marginLeft: "10px" }}
        value={material}
        disabled={!isEditable}
        onChange={(e) => setMaterial(e.target.value)}
      />

      <Input
        addonBefore="shift: "
        placeholder="shift: "
        type="text"
        disabled={!isEditable}
        style={{ width: "25%", marginLeft: "10px", marginTop: "10px" }}
        value={editShift}
        readOnly
      />

      <Input
        addonBefore="AQL Sample Size"
        placeholder="AQL Sample Size"
        style={{ width: "20%", marginTop: "10px", marginLeft: "10px" }}
        value={aqlSampleSize}
        disabled={!isEditable}
        onChange={(e) => setAqlSampleSize(e.target.value)}
      />

      <Input
        addonBefore="Lot No"
        placeholder="Lot No"
        style={{ width: "20%", marginTop: "10px", marginLeft: "10px" }}
        value={lotNo}
        disabled={!isEditable}
        onChange={(e) => setLotNo(e.target.value)}
      />

      <Input
        addonBefore="FG No"
        placeholder="FG No"
        style={{ width: "20%", marginTop: "10px", marginLeft: "10px" }}
        value={fgNo}
        disabled={!isEditable}
        onChange={(e) => setFgNo(e.target.value)}
      />

      <tr>
        <td
          style={{ textAlign: "center", marginTop: "10px", marginLeft: "10px" }}
        >
          {" "}
          General Inspection Level - II
        </td>
      </tr>

      <div>
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
    </>
  );
};

export default QA_F037;
