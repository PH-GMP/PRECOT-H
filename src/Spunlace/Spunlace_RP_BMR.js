import React from "react";
import {
  Tabs,
  Table,
  InputNumber,
  Input,
  Button,
  message,
  DatePicker,
  TimePicker,
  Radio,
  Select,
  Tooltip,
  Row,
  Form,
  Modal,
} from "antd";
import logo from "../Assests/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { IoPrint } from "react-icons/io5";
import { ContinuousColorLegend } from "@mui/x-charts";
const { TabPane } = Tabs;
const { Column } = Table;
const { Option } = Select;
//1583

const BMRSummaryRP = () => {
  const { DatePicker: AntDatePicker } = DatePicker;
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [userLov, setUserLov] = useState({ qalov: [] });
  const [isSaved, setIsSaved] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [SupervisorLov, setSupervisorLov] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOrderValue, setSelectedOrderValue] = useState("");
  const [isPackingSaveDisabled, setIsPackingSaveDisabled] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [productionDetailsSignSup, setproductionDetailsSignSup] = useState("");
  const [QaLovs, setQaLovs] = useState([]);

  const userName = localStorage.getItem("username");

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentDateTimeQA, setCurrentDateTimeQA] = useState("");
  const [currentDateTimeHOD, setCurrentDateTimeHOD] = useState("");

  useEffect(() => {
    const now = new Date();

    if (role === "ROLE_SUPERVISOR") {
      const formattedDate = formatDateTime(now);
      setCurrentDateTime(formattedDate);
    }

    if (role === "ROLE_QA") {
      const formattedDateQA = formatDateTime(now);
      setCurrentDateTimeQA(formattedDateQA);
    }

    if (role === "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      const formattedDateHOD = formatDateTime(now);
      setCurrentDateTimeHOD(formattedDateHOD);
    }
  }, [role]);

  // Function to format the date and time as 'YYYY-MM-DDTHH:mm'
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateQA, setCurrentDateQA] = useState("");
  const [currentDateQAman_QAdes, setCurrentDateQAman_QAdes] = useState("");
  const [currentTimeQA, setCurrentTimeQA] = useState("");
  const [currentDateHOD, setCurrentDateHOD] = useState("");
  const [currentTimeHOD, setCurrentTimeHOD] = useState("");

  useEffect(() => {
    const now = new Date();

    if (role === "ROLE_SUPERVISOR") {
      const { formattedDate, formattedTime } = formatDateTimes(now);
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }

    if (role === "ROLE_QA") {
      const { formattedDate, formattedTime } = formatDateTimes(now);
      setCurrentDateQA(formattedDate);
      setCurrentTimeQA(formattedTime);
    }

    if (role === "QA_MANAGER" || role === "QA_DESIGNEE") {
      const formattedDate = formatDateTime(now);
      setCurrentDateQAman_QAdes(formattedDate);
    }

    if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      const { formattedDate, formattedTime } = formatDateTimes(now);
      setCurrentDateHOD(formattedDate);
      setCurrentTimeHOD(formattedTime);
    }
  }, [role]);

  // Function to format the date and time as separate 'YYYY-MM-DD' and 'HH:mm'
  const formatDateTimes = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
  };

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValues, setSelectedValues] = useState("");
  const [selectedValueHOD, setSelectedValuesHOD] = useState("");
  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      const matchedValue = SupervisorLov.find(
        (item) => item.value === userName
      );
      if (matchedValue) {
        setSelectedValue(matchedValue.value);
      } else {
        setSelectedValue(productionDetailsSign);
      }
    } else {
      setSelectedValue(productionDetailsSign);
    }
  }, [SupervisorLov]);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      const matchedValue = QaLovs.find((item) => item.value === userName);
      if (matchedValue) {
        setSelectedValues(matchedValue.value);
      } else {
        setSelectedValues(productionDetailsSign);
      }
    } else {
      setSelectedValues(productionDetailsSign);
    }
  }, [QaLovs]);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (Array.isArray(userLov) && userName) {
      const matchedValue = userLov.find((item) => item.value === userName);
      if (matchedValue) {
        setSelectedValuesHOD(matchedValue.value);
      } else {
        setSelectedValuesHOD(productionDetailsSign);
      }
    } else {
      setSelectedValuesHOD(productionDetailsSign);
    }
  }, [userLov]);

  let QAMAN_QADES_Username = "";

  if (role === "QA_MANAGER" || role == "QA_DESIGNEE") {
    QAMAN_QADES_Username = localStorage.getItem("username");
  }

  let hod_desUsername = "";
  if (role === "ROLE_HOD" || role == "ROLE_DESIGNEE") {
    hod_desUsername = localStorage.getItem("username");
  }

  const [loggedInHod, setLoggedInHod] = useState(false);

  useEffect(() => {
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      setLoggedInHod(true);
    }
  }, []);

  // QA login validation.
  const [loggedInQA, setLoggedInQA] = useState(false);
  useEffect(() => {
    if (role == "ROLE_QA") {
      setLoggedInQA(true);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [usernameQA, setUsernameQA] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && role == "ROLE_SUPERVISOR") {
      setUsername(storedUsername);
    } else if (storedUsername && role == "ROLE_QA") {
      setUsernameQA(storedUsername);
    }
    console.log("username", storedUsername);
  }, []);

  const [activeTab, setActiveTab] = useState("1");
  const [validationResponse, setValidationResponse] = useState(null);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const [supervisorUsernames, setSupervisorUsernames] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=SPUNLACE`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Filter response for role 'ROLE_SUPERVISOR'
        const supervisors = response.data.filter(
          (user) => user.role === "ROLE_SUPERVISOR"
        );

        // Map to get only usernames
        const usernames = supervisors.map((user) => user.username);

        // Set the state with the filtered usernames
        setSupervisorUsernames(usernames);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=SPUNLACE`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("QA", res.data);
        let a;
        console.log("Role", role);
        switch (role) {
          case "ROLE_QA":
            a = res.data
              .filter((option) => option.role === "ROLE_QA")
              .map((option) => ({
                value: option.username,
                label: option.username,
              }));
            break;
          case "ROLE_SUPERVISOR":
          case "ROLE_DESIGNEE":
          case "ROLE_HOD":
            console.log("ROle Case Entered");
            a = res.data
              .filter(
                (option) =>
                  option.role === "ROLE_SUPERVISOR" ||
                  option.role === "ROLE_DESIGNEE" ||
                  option.role === "ROLE_HOD"
              )
              .map((option) => ({
                value: option.username,
                label: option.username,
              }));
            console.log("ROLE LOV", a);
            setSupervisorLov(a);
            break;
          default:
            a = [];
        }
        console.log("QA LOgin", a);
        setUserLov(a);
      })

      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch QA Caused Network Error",
        });
      });
  }, [selectedOrderValue]);

  const navigate = useNavigate();
  // const { DatePicker: AntDatePicker } = DatePicker;
  const [batchNo, setBatchNo] = useState([]);
  const [signManifactureingSteps, setsignManifactureingSteps] = useState([]);
  const [signManifactureingStepsQA, setsignManifactureingStepsQA] = useState(
    []
  );
  const [productionDetails, setProductionDetails] = useState(null);
  const [verificationOfRecordsDetails, setVerificationOfRecordsDetails] =
    useState(null);
  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  // tab 3 states
  const [packingId04, setPackingId04] = useState("");
  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  // tab 13 post production review
  const [postProductionDetails, setPostProductionDetails] = useState("");
  const [id13, setId13] = useState("");
  const [id10, setId10] = useState("");
  const [status10, setStatus10] = useState("");
  const [supervisorSign13, setSupervisorSign13] = useState("");
  const [orderNoSelect, setOrderNoSelect] = useState("");
  const [supervisorDate13, setSupervisorDate13] = useState("");
  const [hodSign13, setHodSign13] = useState("");
  const [hodDate13, sethodDate13] = useState("");
  const [qaSign13, setQaSign13] = useState("");
  const [qaDate13, setqaDate13] = useState("");
  const [supervisorId13, setSupervisorId13] = useState("");
  const [status13, setStatus13] = useState("");
  const [hodId13, setHODId13] = useState("");

  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  /*Tab One States */

  const [startTimeOne, setStartTimeOne] = useState("");
  const [endTimeOne, setEndTimeOne] = useState("");
  const [startDateOne, setStartDateOne] = useState("");
  const [endDateOne, setendDateOne] = useState("");
  const [IdOne, setIdOne] = useState("");
  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  // Tab 6 states
  const [IdSix, setIdSix] = useState("");
  const [ProcessingEquipmentDetails06, setProcessingEquipementDetails06] =
    useState("");

  const [shaftData, setShaftData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = `${API.prodUrl}/Precot/api/spunlace/rp/summary/getBaleDetailsByOrderDate?order_no=${orderNoSelect}&fromdate=${startDateOne}&todate=${endDateOne}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setShaftData(response.data || []); // Ensure data is an array
      } catch (err) {
        console.error("Error fetching shaft data:", err);
        setError(err.message || "Failed to fetch data.");
      }
    };

    if (batchNo && startDateOne && endDateOne) {
      fetchData(); // Fetch data when dependencies are valid
    }
  }, [batchNo, startDateOne, endDateOne]);

  const handleChange = (selected) => {
    setSelectedOption(selected); // Update state with selected option
    console.log("Selected Shaft:", selected);
  };

  const handleendChange = (selected) => {
    setSelectedOptions(selected); // Update state with selected option
    console.log("Selected Shaft:", selected);
  };

  // Map the shaft data to options for the Select component
  const optionss = shaftData.map((item) => ({
    value: item.value,
    label: ` ${item.value}`,
  }));

  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  /*Tab Seven States */
  const [checkedbySign, setcheckedbySign] = useState("");
  const [sevenId, setSevenId] = useState("");
  const [Superviosrsaveid, setSuperviosrsaveid] = useState("");
  const [sevenIdHouseKeeping, setSevenIdHouseKeeping] = useState("");
  const [sevenIdProductionRecords, setSevenIdProductionRecords] = useState("");
  const [checkedbySignPR, setcheckedbySignPR] = useState("");
  const [checkedbyDate, setcheckedbyDate] = useState("");
  const [checkedbyDatePR, setcheckedbyDatePR] = useState("");
  const [checkedbyTime, setcheckedbyTime] = useState("");
  const [checkedbyTimePR, setcheckedbyTimePR] = useState("");
  const [activityHouseKeeping, setActivityHouseKeeping] = useState("");
  const [activityProductionRecords, setActivityProductionRecords] =
    useState("");
  const [VerifiedbySign, setVerifiedbySign] = useState("");
  const [VerifiedbySignPR, setVerifiedbySignPR] = useState("");
  const [VerifiedbyDate, setVerifiedbyDate] = useState("");
  const [VerifiedbyDatePR, setVerifiedbyDatePR] = useState("");
  const [VerifiedbyTime, setVerifiedbyTime] = useState("");
  const [VerifiedbyTimePR, setVerifiedbyTimePR] = useState("");

  // [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  const [
    delayEquipmentBreakdownRecordDetails,
    setDelayEquipmentBreakdownRecordDetails,
  ] = useState([]);
  const [stoppageDetailsStore, setStoppageMapList] = useState([]);
  const [bmrSummaryDateList, setBmrSummaryDateList] = useState([]);
  const [stoppageDetailsStatus, setStoppageDetailsStatus] = useState(false);
  const [delayProdDates, setDelayProdDates] = useState([]);
  const [delayProdNames, setDelayProdNames] = useState([]);

  const handleDate11Change = (index, value) => {
    const newDates = [...delayProdDates];
    newDates[index] = value;
    setDelayProdDates(newDates);
  };

  const handleNameChange = (index, value) => {
    const newNames = [...delayProdNames];
    newNames[index] = value;
    setDelayProdNames(newNames);
  };
  const [delayProdTime, setDelayProdTime] = useState("");
  const [delayButtonStatus, setDelayButtonStatus] = useState(false);
  // const [pdeArray, setPdeArray] = useState();
  const [qaReleaseDetails, setQaReleaseDetails] = useState(null);
  const [id14, setId14] = useState(null);
  // const [listOfEnclosures, setListOfEnclosures] = useState(null);
  // const [productReleaseDetails, setProductReleaseDetails] = useState(null);
  const [packingmaterialdata, setpackingmaterialData] = useState([
    {
      key: "1",
      siNo: "1",
      name: "Bale wire",
      batchNo: "",
      quantity: "",
      units: "",
    },
  ]);

  const [inputDetailsofKg, setInputDetailsofKg] = useState([
    {
      input_id: "",
      order_no: "",
      form_no: "PRD02/F-27",
      rejected_rolls: "",
      edge_trim_waste: "",
      skleten_waste: "",
    },
  ]);

  const [inputdetailsBtn, setInputDetailsBtn] = useState(false);

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const [processdeviationdata, setProcessdeviationdata] = useState([
    {
      key: "1",
      id: "",
      stepNo: "",
      deviation: "",
      signature: "",
      qaRemarks: "",
      signatureDate: "",
      supervisorSignature: "",
      supervisorDate: "",
    },
  ]);
  const [qaReleaseData, setQaReleaseData] = useState([
    {
      childId: "",
      key: "1",
      description:
        "All critical process parameters reviewed(Within/Not within range).",
      status: "",
      signAndDate: { qa: "", date: "" },
    },
    {
      childId: "",
      key: "2",
      description:
        "In process checks reviewed(Meeting/Not meeting the specification).",
      status: "",
      signAndDate: { qa: "", date: "" },
    },
    {
      childId: "",
      key: "3",
      description: "Deviations reviewed(Found/Not found).",
      status: "",
      signAndDate: { qa: "", date: "" },
    },
    {
      childId: "",
      key: "4",
      description: "If deviations are logged",
      status: "",
      signAndDate: { qa: "", date: "" },
    },
    {
      childId: "",
      key: "5",
      description: "The Batch is released to next step.",
      status: "",
      signAndDate: { qa: "", date: "" },
    },
  ]);

  // const [ProcessDeviationDisable, setGetProcessDeviationDisable] =useState(false);
  const [productReconciliationdata, setProductReconciliationData] = useState([
    {
      key: "1",
      inputQty: 0,
      outputQty: 0,
      yield: 0,
    },
  ]);
  const [isSatisfactory, setIsSatisfactory] = useState(false);
  const [isNotSatisfactory, setIsNotSatisfactory] = useState(false);
  const [isSatisfactoryRP, setIsSatisfactoryRP] = useState(false);
  const [isNotSatisfactoryRP, setIsNotSatisfactoryRP] = useState(false);
  const [productionDetailsSign, setproductionDetailsSign] = useState("");

  useState("");
  // const token = localStorage.getItem('token');
  const disabled01 =
    (role == "ROLE_SUPERVISOR" &&
      productionDetails?.bmr01rp01productiondetails?.[0]?.status ==
        "SUPERVISOR_APPROVED") ||
    role == "ROLE_QA";
  const disabledQa01 =
    (role == "ROLE_QA" &&
      productionDetails?.bmr01rp01productiondetails?.[0]?.status ==
        "QA_APPROVED") ||
    role == "ROLE_SUPERVISOR";

  const disabledSubmit01 =
    (role == "ROLE_QA" &&
      productionDetails?.bmr01rp01productiondetails?.[0]?.status ==
        "QA_APPROVED") ||
    (role == "ROLE_SUPERVISOR" &&
      productionDetails?.bmr01rp01productiondetails?.[0]?.status ==
        "SUPERVISOR_APPROVED");

  const disabled10Sup =
    (role == "ROLE_SUPERVISOR" && status10 == "SUPERVISOR_APPROVED") ||
    role == "ROLE_QA";

  const disabled14 =
    (role == "QA_MANAGER" || role == "QA_DESIGNEE") &&
    qaReleaseDetails?.[0]?.status == "QA_APPROVED";

  const disabled13Sup =
    (role == "ROLE_SUPERVISOR" &&
      postProductionDetails?.[0]?.status == "SUPERVISOR_APPROVED") ||
    role == "ROLE_HOD" ||
    role == "QA_MANAGER" ||
    role === "QA_DESIGNEE";

  const disabled13Hod =
    (role == "ROLE_HOD" &&
      postProductionDetails?.[0]?.status == "HOD_APPROVED") ||
    role == "ROLE_SUPERVISOR" ||
    role == "QA_MANAGER" ||
    role === "QA_DESIGNEE";

  const disabled13Qa =
    ((role == "QA_MANAGER" || role === "QA_DESIGNEE") &&
      postProductionDetails?.[0]?.status == "QA_APPROVED") ||
    role == "ROLE_SUPERVISOR" ||
    role == "ROLE_HOD";

  const disabled13Submitted =
    ((role == "QA_MANAGER" || role === "QA_DESIGNEE") &&
      postProductionDetails?.[0]?.status == "QA_APPROVED") ||
    (role == "ROLE_HOD" &&
      postProductionDetails?.[0]?.status == "HOD_APPROVED") ||
    (role == "ROLE_SUPERVISOR" &&
      postProductionDetails?.[0]?.status == "SUPERVISOR_APPROVED");

  const disabled10Submit =
    (role == "ROLE_QA" && status10 == "QA_APPROVED") ||
    (role == "ROLE_SUPERVISOR" && status10 == "SUPERVISOR_APPROVED");

  const disabled11 =
    (role == "ROLE_SUPERVISOR" &&
      delayEquipmentBreakdownRecordDetails?.bmrSummaryDateList?.[0]?.status ==
        "SUPERVISOR_APPROVED") ||
    role == "ROLE_HOD" ||
    role == "ROLE_QA";

  const handleProductionDetailsSign = (value) => {
    setproductionDetailsSign(value);
  };
  const handleProductionDetailsSignSup = (value) => {
    setproductionDetailsSignSup(value);
  };

  const [status, setStatus] = useState(
    productionDetails?.bmr01rp01productiondetailsSap?.length > 0
      ? productionDetails.bmr01rp01productiondetailsSap[0]?.po_status || "N/A"
      : "N/A"
  );

  const handleradioChange = (e) => {
    setStatus(e.target.value);
  };

  const [productionDetailsDate, setproductionDetailsDate] = useState("");
  const [productionDetailsDateSup, setproductionDetailsDateSup] = useState("");
  const handleProductionDetailsDate = (event) => {
    const value = event.target.value;
    setproductionDetailsDate(value);
    console.log("date value", value);
  };
  const handleProductionDetailsDateSup = (event) => {
    const value = event.target.value;
    setproductionDetailsDateSup(value);
    console.log("date value", value);
  };

  const [typematerial, setTypematerial] = useState();
  const [noofbales, setNoOfBales] = useState();
  const [batchqty, setBatchqty] = useState();
  const [prodes, setProdes] = useState();

  useEffect(() => {
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }

    if (selectedOption && selectedOptions) {
      const fetchProductionDetails = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/spunlace/rp/summary/getProductionDetailsByBaleOrderDate`,
            {
              params: {
                order_no: orderNoSelect, // Order number
                fromdate: startDateOne, // Start date
                todate: endDateOne, // End date
                frombale: selectedOption, // From Bale
                tobale: selectedOptions, // To Bale
              },
              headers: {
                Authorization: `Bearer ${token}`, // Authorization header with token
              },
            }
          );

          const data = response.data;
          console.log("Production details response", data);

          if (data && data.length > 0) {
            const details = data[0]; // Accessing the first item in the array

            setTypematerial(response.data[0].Type_of_Material);
            console.log(response.data[0].Type_of_Material);
            setNoOfBales(response.data[0].No_of_Bales);
            setBatchqty(response.data[0].Batch_Quantity);
            setProdes(response.data[0].Product_Description);
            // Setting the state with details or fallback values
            setProductionDetailsData([
              {
                key: "1", // Assuming only one item in the response
                batchNo: details.Batch_No || "", // Fallback if no value
                batchQuantity:
                  details.Batch_Quantity !== null
                    ? details.Batch_Quantity
                    : "N/A", // Fallback to "N/A" if null
                productDescription: details.Product_Description || "N/A", // Fallback to "N/A"
                Type_of_Material: details.Type_of_Material || "N/A", // Fallback to "N/A"
                noOfBales:
                  details.No_of_Bales !== null ? details.No_of_Bales : "N/A", // Fallback to "N/A" if null
                baleStartNo: details.Bale_Start_No || "", // Default if no value
                baleEndNo: details.Bale_End_No || "", // Default if no value
                manufacturingStartDate: details.Manufacturing_Start_Date || "", // Default if no value
                manufacturingStartTime: details.Manufacturing_Start_Time || "", // Default if no value
                manufacturingCompletionDate:
                  details.Manufacturing_Completion_Date || "", // Default if no value
                manufacturingCompletionTime:
                  details.Manufacturing_Completion_Time || "", // Default if no value
              },
            ]);
          } else {
            // Reset state if no data is available
            setProductionDetailsData([
              {
                key: "1",
                batchNo: "",
                batchQuantity: "",
                productDescription: "Reprocess Bales", // Default value
                typeOfMaterial: "",
                noOfBales: "",
                baleStartNo: "",
                baleEndNo: "",
                manufacturingStartDate: "",
                manufacturingStartTime: "",
                manufacturingCompletionDate: "",
                manufacturingCompletionTime: "",
              },
            ]);
          }
        } catch (err) {
          console.error("Error fetching production details:", err);
          setError("Failed to fetch production details.");
        }
      };

      // Fetch the data when selectedOption or selectedOptions change
      fetchProductionDetails();
    } else {
      console.error("Missing necessary values for API call.");
    }
  }, [token, selectedOption, selectedOptions]);

  useEffect(() => {
    if (selectedOrderValue) {
      fetchProductionDetails();
    }
  }, [selectedOrderValue, token]);
  const fetchProductionDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/01.GetProductionDetails`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductionDetails(response.data);
      console.log("production details 01", productionDetails);
      const data = response.data;
      if (
        data.bmr01rp01productiondetails &&
        data.bmr01rp01productiondetails.length > 0
      ) {
        setStartDateOne(data.bmr01rp01productiondetails[0].start_date);
        setendDateOne(data.bmr01rp01productiondetails[0].end_date);
        setStartTimeOne(data.bmr01rp01productiondetails[0].start_time);
        setEndTimeOne(data.bmr01rp01productiondetails[0].end_time);
        setIdOne(data.bmr01rp01productiondetails[0].prod_id);
        setproductionDetailsSign(data.bmr01rp01productiondetails[0].issued_by);
        setproductionDetailsSignSup(
          data.bmr01rp01productiondetails[0].received_by
        );
        setproductionDetailsDate(data.bmr01rp01productiondetails[0].issued_on);
        setproductionDetailsDateSup(
          data.bmr01rp01productiondetails[0].received_on
        );
        setIdOne(data.bmr01rp01productiondetails[0].prod_id);
        setStatus(data.bmr01rp01productiondetails[0].poStatus);
        setOrderNoSelect(data.bmr01rp01productiondetails[0].order_no);
        console.log("supervisor sign", productionDetailsSignSup);
      } else {
        // Handle case where data is not available
        setStartDateOne(null);
        setendDateOne(null);
        setStartTimeOne(null);
        setEndTimeOne(null);
        setIdOne(null);
        setproductionDetailsDate(null);
        setproductionDetailsDateSup(null);
        setproductionDetailsSign(null);
        setproductionDetailsSignSup(null);
      }
    } catch (error) {
      console.error("Error fetching production details:", error);
    }
  };

  useEffect(() => {
    const fetchInputDetailsofKg = async () => {
      setInputDetailsofKg([
        {
          key: "1",
          input_id: "",
          order_no: "",
          form_no: "PRD02/F-27",
          rejected_rolls: "",
          edge_trim_waste: "",
          skleten_waste: "",
          status: "",
        },
      ]);
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spunlace/rp/summary/02.GetAnnexurInputDetails`,
          {
            params: { batch_no: selectedOrderValue },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        const details = response.data.length > 0 ? response.data : [];

        if (details.length === 0) {
          console.log("No Input details found for the given order.");
          setInputDetailsofKg([
            {
              key: "1",
              order_no: "",
              input_id: "",
              form_no: "PRD02/F-27",
              rejected_rolls: "",
              edge_trim_waste: "",
              skleten_waste: "",
              // status: "",
            },
          ]);
          setInputDetailsBtn(false);
          if (role == "ROLE_QA") {
            setInputDetailsBtn(true);
          }
        } else {
          // Transform data from the response to match the structure required by the state
          const transformedData = details.map((item, index) => ({
            key: (index + 1).toString(), // Ensuring unique keys if there are multiple items
            order_no: item.order_no,
            form_no: item.form_no,
            input_id: item.input_id,
            rejected_rolls: item.rejected_rolls,
            edge_trim_waste: item.edge_trim_waste,
            skleten_waste: item.skleten_waste,
            status: item.status,
          }));

          console.log("Status", response.data[0].status);
          if (
            response.data[0].status == "SUPERVISOR_APPROVED" ||
            role == "ROLE_QA"
          ) {
            setInputDetailsBtn(true);
          }

          setInputDetailsofKg(transformedData); // Update the state with the transformed data
        }
      } catch (error) {
        console.error(
          "Error fetching packing material details:",
          error.response || error.message
        );
        // Optionally set to initial state on error
        setInputDetailsofKg([
          {
            key: "1",
            order_no: "",
            input_id: "",
            form_no: "PRD02/F-27",
            rejected_rolls: "",
            edge_trim_waste: "",
            skleten_waste: "",
            // status: "",
          },
        ]);
      }
    };

    if (selectedOrderValue) {
      fetchInputDetailsofKg();
    }
  }, [selectedOrderValue, token]);

  useEffect(() => {
    const fetchPackingMaterialDetails = async () => {
      setpackingmaterialData([
        {
          key: "1",
          siNo: "1",
          name: "Bale wire",
          batchNo: "",
          quantity: "",
          units: "",
        },
      ]);
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spunlace/rp/summary/04.GetPackingMeterialDetails`,
          {
            params: { batch_no: selectedOrderValue },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);
        if (response.data.length > 0) {
          setPackingId04(response.data[0].packing_id);
        }
        // Access 'details' from the first element in the response array
        const details =
          response.data.length > 0 ? response.data[0].details || [] : [];

        if (details.length === 0) {
          console.log("No packing material details found for the given order.");
          setpackingmaterialData([
            {
              key: "1",
              siNo: "1",
              name: "Bale wire",
              batchNo: "",
              quantity: "",
              units: "",
            },
          ]);
        }

        setIsPackingSaveDisabled(details.length > 0);
        if (role == "ROLE_QA") {
          setIsPackingSaveDisabled(true);
        }

        // Transform data; if no data, use initial state
        const transformedData =
          details.length > 0
            ? details.map((item, index) => ({
                key: index.toString(),
                siNo: (index + 1).toString(),
                name: item.name_of_pck_meterial,
                batchNo: item.batch_no,
                quantity: item.quantity,
                units: item.unit,
              }))
            : [
                {
                  key: "1",
                  siNo: "1",
                  name: "Bale wire",
                  batchNo: "",
                  quantity: "",
                  units: "",
                },
              ];

        console.log("Transformed Data:", transformedData);

        setpackingmaterialData(transformedData);
      } catch (error) {
        console.error(
          "Error fetching packing material details:",
          error.response || error.message
        );
        // Optionally set to initial state on error
        setpackingmaterialData([
          {
            key: "1",
            siNo: "1",
            name: "Bale wire",
            batchNo: "",
            quantity: "",
            units: "",
          },
        ]);
      }
    };

    if (selectedOrderValue) {
      fetchPackingMaterialDetails();
    }
  }, [selectedOrderValue, token]);

  useEffect(() => {
    if (selectedOrderValue) {
      fetchProcessingEquipmentDetails();
    }
  }, [selectedOrderValue, token]);
  const fetchProcessingEquipmentDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/06.GetProcessingEqupments`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setIdSix(data[0].equp_id);
      setProcessingEquipementDetails06(data);

      const transformedData = response.data[0].detailsRecords06.map(
        (item, index) => ({
          key: item.id.toString(),
          slNo: (index + 1).toString(),
          id: item.id,
          equipmentName: item.equp_name,
          equipmentCode: item.equp_code,
          dateOfCalibration: item.date_calibration,
          calibrationDueOn: item.calibration_due_on,
          checked_by_sign: item.checked_by_sign,
          checked_by_date: item.checked_by_date,
          checkedBy: item.checked_by_name,
        })
      );

      setProcessingEquipmentsData(transformedData);
      // setFormNo(response.data[0].form_no);
      // setStatus(response.data[0].status);

      console.log("EQu", transformedData);
    } catch (error) {
      console.error("Error fetching processing equipment details:", error);
    }
  };
  const [SupervisorStatus07, setSupervisorStatus07] = useState("");
  const [qaStatus07, setQaStatus07] = useState("");

  useEffect(() => {
    if (selectedOrderValue) {
      fetchVerificationOfRecordsDetails();
    }
  }, [selectedOrderValue, token]);

  const [verificationSupervisorStatus, setverificationSupervisorStatus] =
    useState("");
  const [verificationqaStatus, setverificationqaStatus] = useState("");

  const fetchVerificationOfRecordsDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/07.GetVerificationOfRecords`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVerificationOfRecordsDetails(response.data);

      const data = response.data;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
      const formattedTime = currentDate.toTimeString().split(" ")[0];

      if (response.data.length > 0) {
        setcheckedbySign(
          data[0].detailsRecords06[0].checked_sign ||
            localStorage.getItem("username")
        );
        setcheckedbyDate(
          data[0].detailsRecords06[0].checked_date || formattedDate
        );
        setcheckedbyTime(
          data[0].detailsRecords06[0].checked_time || formattedTime
        );
        setVerifiedbySign(
          data[0].detailsRecords06[0].verified_sign ||
            localStorage.getItem("username")
        );
        setVerifiedbyDate(
          data[0].detailsRecords06[0].verified_date || formattedDate
        );
        setVerifiedbyTime(
          data[0].detailsRecords06[0].verified_time || formattedTime
        );

        setcheckedbySignPR(
          data[0].detailsRecords06[1].checked_sign ||
            localStorage.getItem("username")
        );
        setcheckedbyDatePR(
          data[0].detailsRecords06[1].checked_date || formattedDate
        );
        setcheckedbyTimePR(
          data[0].detailsRecords06[1].checked_time || formattedTime
        );
        setVerifiedbySignPR(
          data[0].detailsRecords06[1].verified_sign ||
            localStorage.getItem("username")
        );
        setVerifiedbyDatePR(
          data[0].detailsRecords06[1].verified_date || formattedDate
        );
        setVerifiedbyTimePR(
          data[0].detailsRecords06[1].verified_time || formattedTime
        );
        setSevenId(data[0].verification_id);
        setSuperviosrsaveid(data[0].supervisor_save_id);
        setSevenIdHouseKeeping(data[0].detailsRecords06[0].id);
        setSevenIdProductionRecords(data[0].detailsRecords06[1].id);
        setSupervisorStatus07(data[0].supervisor_status);
        setQaStatus07(data[0].qa_status);
        setverificationSupervisorStatus(data[0].supervisor_status);
        setverificationqaStatus(data[0].qaStatus || "");

        const details = data[0].detailsRecords06;

        setActivityHouseKeeping(details[0].details);
        setActivityProductionRecords(details[1].details);

        // if (details[0].satisfactory === "Tick") {
        //   setActivityHouseKeeping("satisfactory");
        //   setIsSatisfactory(true);
        // } else if (details[0].non_satisfactory === "Tick") {
        //   setActivityHouseKeeping("notSatisfactory");
        //   setIsNotSatisfactory(true);
        // } else if (
        //   details[0].satisfactory === "NA" &&
        //   details[0].non_satisfactory === "NA"
        // ) {
        //   setActivityHouseKeeping("na");
        // }

        // if (details[1].satisfactory === "Tick") {
        //   setActivityProductionRecords("satisfactory");
        //   setIsSatisfactoryRP(true);
        // } else if (details[1].non_satisfactory === "Tick") {
        //   setActivityProductionRecords("notSatisfactory");
        //   setIsNotSatisfactoryRP(true);
        // } else if (
        //   details[1].satisfactory === "NA" &&
        //   details[1].non_satisfactory === "NA"
        // ) {
        //   setActivityProductionRecords("na");
        // }
      } else {
        setcheckedbySign(localStorage.getItem("username") || null);
        setcheckedbyDate(formattedDate);
        setcheckedbyTime(formattedTime);
        setVerifiedbySign(localStorage.getItem("username") || null);
        setVerifiedbyDate(formattedDate);
        setVerifiedbyTime(formattedTime);
        setActivityHouseKeeping(null);
        setcheckedbySignPR(localStorage.getItem("username") || null);
        setcheckedbyDatePR(formattedDate);
        setcheckedbyTimePR(formattedTime);
        setVerifiedbySignPR(localStorage.getItem("username") || null);
        setVerifiedbyDatePR(formattedDate);
        setVerifiedbyTimePR(formattedTime);
        setActivityProductionRecords(null);
        setSupervisorStatus07(null);
        setQaStatus07(null);
      }
    } catch (error) {
      console.error("Error fetching verification of records details:", error);
    }
  };

  const [productionRecBtn, setProductionRecBtn] = useState(false);
  const [isPackingMaterialDisabled, setIsPackingMaterialDisabled] =
    useState(false);

  useEffect(() => {
    if (selectedOrderValue) {
      fetchProductReconciliationDetails();
    }
  }, [selectedOrderValue, token]);

  const [disabled09, set09Disabled] = useState(false);
  const fetchProductReconciliationDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/09.GetProductReconciliation`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      // Transform data only if response is not empty
      const transformedData =
        response.data.length > 0
          ? response.data.map((item, index) => ({
              key: item.id.toString(),
              // id: item.id,
              inputQty: parseFloat(item.input_quantity),
              outputQty: parseFloat(item.output_quantity),
              yield: parseFloat(item.calculation.replace("%", "")) || 0,
            }))
          : [
              {
                key: "1",
                id: "",
                inputQty: 0,
                outputQty: 0,
                yield: 0,
              },
            ];

      if (response.data.length > 0) {
        set09Disabled(true);
      } else {
        set09Disabled(false);
      }
      if (role == "ROLE_QA" || role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
        set09Disabled(true);
      }

      console.log("Transformed Data:", transformedData);

      setProductReconciliationData(transformedData);
      setProductionRecBtn(true);
    } catch (error) {
      console.error("Error fetching product reconciliation details:", error);
      // Optionally set initial state or empty state on error
      setProductReconciliationData([
        {
          key: "1",
          inputQty: 0,
          outputQty: 0,
          yield: 0,
        },
      ]);
    }
  };

  useEffect(() => {
    if (selectedOrderValue) {
      fetchProcessDeviationDetails();
    }
  }, [selectedOrderValue, token]);
  const fetchProcessDeviationDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/10.GetProcessDeviationRecord`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.length > 0) {
        setId10(response.data[0].dev_id);
        setStatus10(response.data[0].status);
      }

      const details =
        response.data.length > 0 ? response.data[0].detailsRecords10 || [] : [];

      if (details.length === 0) {
        console.log("No process deviation details found for the given order.");
        // setGetProcessDeviationDisable(false);
      }
      if (details.length > 0) {
        console.log("need to length", details.length);
        // setGetProcessDeviationDisable(true);
      }
      const transformedData = details.map((item, index) => ({
        key: item.id.toString(),
        id: item.id,
        stepNo: item.step_no,
        deviation: item.deviation,
        signature: item.signature,
        qaRemarks: item.qa_remarks,
        signatureDate: item.sig_date,
        supervisorSignature: item.supervisorSignature,
        supervisorDate: item.supervisorDate,
      }));

      console.log("Transformed Data:", transformedData);

      // If no data, use initial state
      setProcessdeviationdata(
        transformedData.length > 0
          ? transformedData
          : [
              {
                key: "1",
                id: "",
                stepNo: "",
                deviation: "",
                signature: "",
                qaRemarks: "",
                signatureDate: "",
                supervisorSignature: "",
                supervisorDate: "",
              },
            ]
      );
    } catch (error) {
      console.error(
        "Error fetching process deviation details:",
        error.response || error.message
      );
      // Optionally set to initial state on error
      setProcessdeviationdata([
        {
          key: "1",
          id: "",
          stepNo: "",
          deviation: "",
          signature: "",
          qaRemarks: "",
          signatureDate: "",
          supervisorSignature: "",
          supervisorDate: "",
        },
      ]);
    }
  };

  const fetchDelayEquipmentBreakdownRecordDetails = async () => {
    setProcessDelayData(initialProcessDelayData); // Reset data before fetch
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/11.GetDelayEqupmentBrkDwnRecord?batch_no=${selectedOrderValue}&fromdate=${startDateOne}&todate=${endDateOne}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { bmrSummaryDateList, stoppageMapList } = response.data;

      // Map spunlacrdetails data
      const mappedBmrData = bmrSummaryDateList.flatMap((item, index) =>
        item.spunlacrdetails.map((detail, detailIndex) => ({
          key: `${item.id}-${detailIndex}`, // Unique key
          stepNo: index + 1,
          date: detail.pde_date,
          from: detail.pde_from_hr,
          to: detail.pde_to_hr,
          total: detail.pde_total_hr,
          signatureDate: detail.prod_date ? detail.prod_date.split("T")[0] : "",
          remarks: detail.remarks,
          prodSign: detail.prod_sign,
          prodDate: detail.prod_date,
        }))
      );

      // Map stoppageMapList data
      const mappedStoppageData = stoppageMapList.map(
        (stoppage, stoppageIndex) => ({
          key: `stoppage-${stoppageIndex}`, // Unique key for stoppage records
          stepNo: stoppageIndex + 1,
          date: stoppage.PackDate,
          from: stoppage.fromTime,
          to: stoppage.toTime,
          total: stoppage.totalHours,
          signatureDate: "", // No signature date in stoppageMapList
          remarks: stoppage.remarks,
        })
      );

      // Combine both mapped data
      const combinedData = [...mappedBmrData, ...mappedStoppageData];

      // Update the process delay data state
      setProcessDelayData(combinedData);
    } catch (error) {
      console.error(
        "Error fetching delay equipment breakdown record details:",
        error
      );
    }
  };

  // useEffect to call the API when component mounts or when dependencies change
  useEffect(() => {
    if (selectedOrderValue && startDateOne && endDateOne) {
      fetchDelayEquipmentBreakdownRecordDetails();
    }
  }, [selectedOrderValue, startDateOne, endDateOne]);

  useEffect(() => {
    if (selectedOrderValue && startDateOne && endDateOne) {
      fetchDelayEquipmentBreakdownRecordDetails();
    }
  }, [selectedOrderValue, startDateOne, endDateOne]);

  const [listOfEnclosuresData, setListOfEnclosuresData] = useState([
    {
      key: "1",
      slNo: "1.",
      id: "",
      date: "",
      title: "",
      remarks: "",
    },
    {
      key: "2",
      slNo: "2.",
      id: "",
      date: "",
      title: "",
      remarks: "",
    },
  ]);

  const [loEnclose, setLOEnclose] = useState({
    hide: false,
    load: false,
  });

  const [enc_id, setEncId] = useState("");
  useEffect(() => {
    if (selectedOrderValue) {
      fetchListOfEnclosures();
    }
  }, [selectedOrderValue, token]);

  const fetchListOfEnclosures = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/12.GetListOfEnclosurs`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      if (response.data.length > 0) {
        if (response.data[0].status == "SUPERVISOR_APPROVED") {
          setLOEnclose((prevState) => ({
            ...prevState,
            hide: true,
          }));
        }

        setEncId(response.data[0].enc_id);
        console.log("EncId", response.data[0].enc_id);

        const transformedData = response.data[0].detailsRecords12.map(
          (item, index) => ({
            key: (index + 1).toString(),
            id: item.id,
            slNo: item.step_no,
            date: item.date,
            title: item.title,
            remarks: item.remarks,
          })
        );

        setListOfEnclosuresData(transformedData);
      } else {
        setLOEnclose((prevState) => ({
          ...prevState,
          hide: false,
        }));

        setListOfEnclosuresData([
          {
            key: "1",
            slNo: "1.",
            id: null,
            date: null,
            title: null,
            remarks: null,
          },
          {
            key: "2",
            slNo: "2.",
            id: null,
            date: null,
            title: null,
            remarks: null,
          },
        ]);
      }
    } catch (error) {
      console.error(
        "Error fetching list of enclosures:",
        error.response || error.message
      );
      // setListOfEnclosuresData(listOfEnclosuresData);
    }
  };

  //  tab 13 Get Api
  useEffect(() => {
    if (selectedOrderValue) {
      fetchPostProductionReviewDetails();
    }
  }, [selectedOrderValue, token]);
  const fetchPostProductionReviewDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/13.GetPostProductionReview`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPostProductionDetails(response.data);
      if (response.data.length > 0) {
        setId13(response.data[0].id);
        setSupervisorId13(response.data[0].supervisor_id);
        setHODId13(response.data[0].hod_id);
        setStatus13(response.data[0].status);
        setSupervisorSign13(response.data[0].sup_sign);
        setSupervisorDate13(response.data[0].sup_date);
        setHodSign13(response.data[0].designee_sign || hod_desUsername);
        sethodDate13(response.data[0].designee_date);
        setQaSign13(response.data[0].qa_sign);
        setqaDate13(response.data[0].qa_date);
      } else {
        setId13(null);
        setSupervisorSign13(null);
        setSupervisorDate13(null);
        setHodSign13(null);
        sethodDate13(null);
        setQaSign13(null);
        setqaDate13(null);
      }
    } catch (error) {
      console.error("Error fetching post-production review details:", error);
    }
  };

  useEffect(() => {
    if (selectedOrderValue) {
      fetchQAReleaseDetails();
    }
  }, [selectedOrderValue, token]);

  const fetchQAReleaseDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/14.GetQaRelease`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQaReleaseDetails(response.data);
      if (response.data.length > 0) {
        console.log("response.data[0].rls_id", response.data[0].rls_id);
        setId14(response.data[0].rls_id);
      }
      const hasData =
        response.data &&
        response.data[0] &&
        response.data[0].details &&
        response.data[0].details.length > 0;
      setIsSubmitDisabled(hasData);

      console.log("14 get", response.data[0].details[0]);
      const data = response.data[0].details[0];
      const data1 = response.data[0].details[1];
      const data2 = response.data[0].details[2];
      const data3 = response.data[0].details[3];
      const data4 = response.data[0].details[4];
      setQaReleaseData((prevState) => {
        return prevState.map((item) => {
          if (item.key == "1") {
            return {
              ...item,
              status: data.status_1 || item.status,
              childId: data.id,
              signAndDate: {
                ...item.signAndDate,
                qa: data.sign || item.signAndDate.qa,
                date: data.date || item.signAndDate.date,
              },
            };
          }
          if (item.key == "2") {
            return {
              ...item,
              status: data1.status_1 || item.status,
              childId: data1.id,
              signAndDate: {
                ...item.signAndDate,
                qa: data1.sign || item.signAndDate.qa,
                date: data1.date || item.signAndDate.date,
              },
            };
          }
          if (item.key == "3") {
            return {
              ...item,
              status: data2.status_1 || item.status,
              childId: data2.id,
              signAndDate: {
                ...item.signAndDate,
                qa: data2.sign || item.signAndDate.qa,
                date: data2.date || item.signAndDate.date,
              },
            };
          }
          if (item.key == "4") {
            return {
              ...item,
              status: data3.status_1 || item.status,
              childId: data3.id,
              signAndDate: {
                ...item.signAndDate,
                qa: data3.sign || item.signAndDate.qa,
                date: data3.date || item.signAndDate.date,
              },
            };
          }

          if (item.key == "5") {
            return {
              ...item,
              status: data4.status_1 || item.status,
              childId: data4.id,
              signAndDate: {
                ...item.signAndDate,
                qa: data4.sign || item.signAndDate.qa,
                date: data4.date || item.signAndDate.date,
              },
            };
          }
          return item;
        });
      });
    } catch (error) {
      console.error("Error fetching QA release details:", error);
    }
  };

  const [productReleaseData, setProductReleaseData] = useState([
    {
      key: "1",
      role: "Name",
      chk_qa_name: "",
      chk_qa_date: "",
      chk_qa_time: "",
      chk_qa_sign: "",
      apr_qa_name: "",
      apr_qa_date: "",
      apr_qa_time: "",
      apr_qa_sign: "",
    },
    {
      key: "2",
      role: "Sign & Date",
      chk_qa_name: "",
      chk_qa_date: "",
      chk_qa_time: "",
      chk_qa_sign: "",
      apr_qa_name: "",
      apr_qa_date: "",
      apr_qa_time: "",
      apr_qa_sign: "",
    },
  ]);
  console.log("PD", productReleaseData);

  useEffect(() => {
    if (selectedOrderValue) {
      fetchProductReleaseDetails();
    }
  }, [selectedOrderValue, token]);

  const fetchProductReleaseDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/15.GetProductRelease`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      // Ensure the response data and detail[0] are defined
      const detail = response.data;
      if (detail && detail.length > 0) {
        setIsSaveDisabled(true);
      } else {
        setIsSaveDisabled(false);
      }
      if (!detail || !detail[0]) {
        console.error("Details or detail[0] are undefined");
        return;
      }

      setProductReleaseData((prevState) => {
        // Ensure prevState is an array and has elements
        if (!Array.isArray(prevState)) {
          console.error("prevState is not an array");
          return prevState;
        }

        const updatedData = prevState.map((item) => {
          if (item.key === "1" || item.key === "2") {
            return {
              ...item,
              chk_qa_name: detail[0].chk_qa_name || item.chk_qa_name,
              chk_qa_sign: detail[0].chk_qa_sign || item.chk_qa_sign,
              apr_qa_name: detail[0].apr_qa_name || item.apr_qa_name,
              chk_qa_date: detail[0].chk_qa_date || item.chk_qa_date,
              chk_qa_time: detail[0].chk_qa_time || item.chk_qa_time,
              apr_qa_date: detail[0].apr_qa_date || item.apr_qa_date,
              apr_qa_time: detail[0].apr_qa_time || item.apr_qa_time,
            };
          }
          return item;
        });

        // Log the updated data
        console.log("Updated data:", updatedData);

        return updatedData;
      });
    } catch (error) {
      console.error(
        "Error fetching product release details:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spulance/processSetupOrders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // if token is required
              "Content-Type": "application/json",
            },
          }
        );
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/spunlace/rp/summary/01.GetBatchNoSpulanceBmr`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // if token is required
              "Content-Type": "application/json",
            },
          }
        );
        setBatchNo(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBatch();
  }, []);

  const handleOrderChange = (value) => {
    setId14("");
    setSelectedOrderValue(value);
    setQaReleaseData([
      {
        key: "1",
        description:
          "All critical process parameters reviewed(Within/Not within range).",
        status: "",
        signAndDate: { qa: "", date: "" },
      },
      {
        key: "2",
        description:
          "In process checks reviewed (Meeting/Not meeting the specification).",
        status: "",
        signAndDate: { qa: "", date: "" },
      },
      {
        key: "3",
        description: "Deviations reviewed(Found/Not found).",
        status: "",
        signAndDate: { qa: "", date: "" },
      },
      {
        key: "4",
        description: "If deviations are logged",
        status: "",
        signAndDate: { qa: "", date: "" },
      },
      {
        key: "5",
        description: "The Batch is released to next step.",
        status: "",
        signAndDate: { qa: "", date: "" },
      },
    ]);

    setProductReleaseData([
      {
        key: "1",
        role: "Name",
        chk_qa_name: "",
        chk_qa_date: "",
        chk_qa_time: "",
        chk_qa_sign: "",
        apr_qa_name: "",
        apr_qa_date: "",
        apr_qa_time: "",
        apr_qa_sign: "",
      },
      {
        key: "2",
        role: "Sign & Date",
        chk_qa_name: "",
        chk_qa_date: "",
        chk_qa_time: "",
        chk_qa_sign: "",
        apr_qa_name: "",
        apr_qa_date: "",
        apr_qa_time: "",
        apr_qa_sign: "",
      },
    ]);

    setpackingmaterialData([
      {
        key: "1",
        siNo: "1",
        name: "Bale wire",
        batchNo: "",
        quantity: "",
        units: "",
      },
    ]);
    setProcessingEquipmentsData([
      {
        key: "1",
        slNo: "1",
        equipmentName: "RP Bale Press",
        equipmentCode: "PH-E/I-SP13",
        dateOfCalibration: "",
        calibrationDueOn: "",
        checkedBy: "",
      },
      {
        key: "2",
        slNo: "2",
        equipmentName: "Strip Opener",
        equipmentCode: "PH-E/I-SP14",
        dateOfCalibration: "NA",
        calibrationDueOn: "NA",
        checkedBy: "",
      },
      {
        key: "3",
        slNo: "3",
        equipmentName: "Applied",
        equipmentCode: "PH-E/I-SP12",
        dateOfCalibration: "",
        calibrationDueOn: "",
        checkedBy: "",
      },
    ]);
    console.log("Selected order value:", value);
  };
  const handleProductReconciliationSave = (value, key, column) => {
    const newData = productReconciliationdata.map((item) => {
      if (item.key === key) {
        const updatedItem = {
          ...item,
          [column]: value,
        };

        if (updatedItem.inputQty > 0) {
          updatedItem.yield =
            (updatedItem.outputQty / updatedItem.inputQty) * 100;
        } else {
          updatedItem.yield = 0; // Set yield to 0 if inputQty is 0 or less
        }

        return updatedItem;
      }
      return item;
    });

    setProductReconciliationData(newData);
  };

  const handleProductSave = () => {
    const token = localStorage.getItem("token");
    const item = productReconciliationdata[0]; // Assuming single record

    const payload = {
      batchNo: selectedOrderValue,
      order_no: orderNoSelect,
      form_no: "PRD02/F-27",
      // id : item.id,
      input_quantity: item.inputQty,
      output_quantity: item.outputQty,
      calculation: `${item.yield.toFixed(2)}%`,
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/09.SaveProductReconciliation`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Product Reconciliation submitted successfully");
        console.log("Saved data:", response.data);
        fetchProductReconciliationDetails();
        setIsProductSubmitted(true);
      })
      .catch((error) => {
        message.error("Failed to save Form");
        console.error("Error saving data:", error);
      });
  };

  const handlePackingMaterialChange = (value, key, column) => {
    const newData = [...packingmaterialdata];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      item[column] = value;
      newData.splice(index, 1, { ...item });
      setpackingmaterialData(newData);
    }
  };

  const handleprocessdeviationChange = (value, key, column) => {
    const newData = processdeviationdata.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          [column]: value,
        };
      }
      return item;
    });
    setProcessdeviationdata(newData);
  };

  const handleProcessdeviationSave = () => {
    const token = localStorage.getItem("token");
    const payload = {
      dev_id: id10,
      batchNo: selectedOrderValue,
      form_no: "PRD02/F-27",
      status: "Active",
      detailsRecords10: processdeviationdata.map((item) => ({
        id: item.id,
        step_no: item.stepNo,
        deviation: item.deviation,
        signature: item.signature,
        qa_remarks: item.qaRemarks,
        sig_date: item.signatureDate,
        supervisorSignature: item.supervisorSignature,
        supervisorDate: item.supervisorDate,
      })),
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/10.SaveProcessDevRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Form Saved successfully");
        console.log("Saved data:", response.data);
        fetchProcessDeviationDetails();
      })
      .catch((error) => {
        message.error("Failed to Save Form");
        console.error("Error saving data:", error);
      });
  };

  const [isprocessdeviation, setIsprocessdeviation] = useState(false);
  const handleProcessdeviationSubmit = () => {
    const token = localStorage.getItem("token");
    const payload = {
      dev_id: id10,
      batchNo: selectedOrderValue,
      form_no: "PRD02/F-27",
      status: "Active",
      detailsRecords10: processdeviationdata.map((item) => ({
        id: item.id,
        step_no: item.stepNo,
        deviation: item.deviation,
        signature: item.signature,
        qa_remarks: item.qaRemarks,
        sig_date: item.signatureDate,
        supervisorSignature: item.supervisorSignature,
        supervisorDate: item.supervisorDate,
      })),
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/10.SubmitProcessDevRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Form Submitted successfully");
        console.log("Saved data:", response.data);
        fetchProcessDeviationDetails();
        setIsprocessdeviation(true);
      })
      .catch((error) => {
        message.error("Failed to Submit Form");
        console.error("Error saving data:", error);
      });
  };

  // const packingMaterialData = [
  //   {
  //     key: '1',
  //     siNo: '1',
  //     name: 'Bale wire',
  //     batchNo: '',
  //     quantity: '',
  //     units: '',
  //   },
  // ];

  // Handle input change
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDetails = [...inputDetailsofKg];
    updatedDetails[index][name] = value;
    setInputDetailsofKg(updatedDetails);
  };

  // Input Details of Kg Save Api
  const handleInputDetailsSave = () => {
    const token = localStorage.getItem("token");

    const detail = inputDetailsofKg[0]; // Access the first object directly

    const payload = {
      input_id: detail.input_id || "",
      batchNo: detail.batch_no || selectedOrderValue,
      form_no: detail.form_no || "PRD02/F-27",
      rejected_rolls: detail.rejected_rolls || "",
      edge_trim_waste: detail.edge_trim_waste || "",
      skleten_waste: detail.skleten_waste || "",
      // status: detail.status || "",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/02.SaveAnnexurInputDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Input Details Kg Saved successfully");
        setActiveTab("2");
        const fetchInputDetailsofKg = async () => {
          setInputDetailsofKg([
            {
              key: "1",
              input_id: "",
              order_no: "",
              form_no: "PRD02/F-27",
              rejected_rolls: "",
              edge_trim_waste: "",
              skleten_waste: "",
              status: "",
            },
          ]);
          try {
            const response = await axios.get(
              `${API.prodUrl}/Precot/api/spunlace/rp/summary/02.GetAnnexurInputDetails`,
              {
                params: { batch_no: selectedOrderValue },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("API Response:", response.data);

            const details = response.data.length > 0 ? response.data : [];

            if (details.length === 0) {
              console.log("No Input details found for the given order.");
              setInputDetailsofKg([
                {
                  key: "1",
                  order_no: "",
                  input_id: "",
                  form_no: "PRD02/F-27",
                  rejected_rolls: "",
                  edge_trim_waste: "",
                  skleten_waste: "",
                  // status: "",
                },
              ]);
              setInputDetailsBtn(false);
              if (role == "ROLE_QA") {
                setInputDetailsBtn(true);
              }
            } else {
              // Transform data from the response to match the structure required by the state
              const transformedData = details.map((item, index) => ({
                key: (index + 1).toString(), // Ensuring unique keys if there are multiple items
                order_no: item.order_no,
                form_no: item.form_no,
                input_id: item.input_id,
                rejected_rolls: item.rejected_rolls,
                edge_trim_waste: item.edge_trim_waste,
                skleten_waste: item.skleten_waste,
                status: item.status,
              }));

              console.log("Status", response.data[0].status);
              if (
                response.data[0].status == "SUPERVISOR_APPROVED" ||
                role == "ROLE_QA"
              ) {
                setInputDetailsBtn(true);
              }

              setInputDetailsofKg(transformedData); // Update the state with the transformed data
            }
          } catch (error) {
            console.error(
              "Error fetching packing material details:",
              error.response || error.message
            );
            // Optionally set to initial state on error
            setInputDetailsofKg([
              {
                key: "1",
                order_no: "",
                input_id: "",
                form_no: "PRD02/F-27",
                rejected_rolls: "",
                edge_trim_waste: "",
                skleten_waste: "",
                // status: "",
              },
            ]);
          }
        };

        if (selectedOrderValue) {
          fetchInputDetailsofKg();
        }
        console.log("Saved data:", response.data);
      })
      .catch((error) => {
        message.error("Failed to save Form");
        console.error("Error saving data:", error);
      });
  };

  // Input Details of Kg Submit Api
  const handleInputDetailsSubmit = () => {
    const token = localStorage.getItem("token");

    const detail = inputDetailsofKg[0]; // Access the first object directly

    const payload = {
      input_id: detail.input_id || "",
      batchNo: detail.batch_no || selectedOrderValue,
      form_no: detail.form_no || "PRD02/F-27",
      rejected_rolls: detail.rejected_rolls || "",
      edge_trim_waste: detail.edge_trim_waste || "",
      skleten_waste: detail.skleten_waste || "",
      // status: detail.status || "",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/02.SubmitAnnexurInputDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Input Details Kg Submitted successfully");
        setActiveTab("2");
        const fetchInputDetailsofKg = async () => {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/spunlace/rp/summary/02.GetAnnexurInputDetails`,
            {
              params: { batch_no: selectedOrderValue },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const details = response.data.length > 0 ? response.data : [];

          // Transform data from the response to match the structure required by the state
          const transformedData = details.map((item, index) => ({
            key: (index + 1).toString(), // Ensuring unique keys if there are multiple items
            order_no: item.order_no,
            form_no: item.form_no,
            input_id: item.input_id,
            rejected_rolls: item.rejected_rolls,
            edge_trim_waste: item.edge_trim_waste,
            skleten_waste: item.skleten_waste,
            status: item.status,
          }));

          console.log("Status", response.data[0].status);
          if (
            response.data[0].status == "SUPERVISOR_APPROVED" ||
            role == "ROLE_QA"
          ) {
            setInputDetailsBtn(true);
          }

          setInputDetailsofKg(transformedData); // Update the state with the transformed data
        };

        if (selectedOrderValue) {
          fetchInputDetailsofKg();
        }
        console.log("Saved data:", response.data);
        setValidationResponse("success");
      })
      .catch((error) => {
        message.error("Failed to save Form");
        console.error("Error saving data:", error);
      });
  };

  const handlePackingmaterialSave = () => {
    const token = localStorage.getItem("token");
    const payload = {
      packing_id: packingId04,
      batch_no: selectedOrderValue,
      order_no: orderNoSelect,
      form_no: "PRD02/F-27",
      status: "Active",
      details: packingmaterialdata.map((item) => ({
        name_of_pck_meterial: item.name,
        batch_no: item.batchNo,
        quantity: item.quantity,
        unit: item.units,
      })),
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/04.SavePackingMeterialDetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Form Submitted Successfully");
        console.log("Saved data:", response.data);
        setIsPackingMaterialDisabled(true);
      })
      .catch((error) => {
        message.error("Failed to Submit Form");
        console.error("Error saving data:", error);
      });
  };

  const columns = [
    {
      title: "SI. No.",
      dataIndex: "siNo",
      key: "siNo",
    },
    {
      title: "Name of the Packing Material",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Batch No.",
      dataIndex: "batchNo",
      key: "batchNo",
      render: (value, record) => (
        <Input
          defaultValue={value}
          // disabled={isPackingSaveDisabled || loggedInHod}
          disabled={
            role === "ROLE_HOD" ||
            role == "ROLE_QA" ||
            isPackingMaterialDisabled
          }
          onChange={(e) =>
            handlePackingMaterialChange(e.target.value, record.key, "batchNo")
          }
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (value, record) => (
        <InputNumber
          defaultValue={value}
          // disabled={isPackingSaveDisabled || loggedInHod}
          disabled={
            isPackingMaterialDisabled ||
            role === "ROLE_HOD" ||
            role == "ROLE_QA"
          }
          onChange={(value) =>
            handlePackingMaterialChange(value, record.key, "quantity")
          }
        />
      ),
    },
    {
      title: "Units",
      dataIndex: "units",
      key: "units",
      render: (value, record) =>
        // <Input
        //   defaultValue={value}
        //   disabled={isPackingSaveDisabled || loggedInHod}
        //   onChange={(e) =>
        //     handlePackingMaterialChange(e.target.value, record.key, "units")
        //   }
        // />
        "KGS",
    },
  ];
  const referenceDocumentData = [
    {
      key: "1",
      slNo: "1",
      title: "GOOD DOCUMENTATION PRACTICES",
      documentNo: "QAD01-D-50",
    },
    {
      key: "2",
      slNo: "2",
      title: "INSTRUCTION FOR CLEANING",
      documentNo: "PRD02-D-26",
    },
    {
      key: "3",
      slNo: "3",
      title: "RP BALEPRESS",
      documentNo: "PRD02-D-20",
    },
    {
      key: "4",
      slNo: "4",
      title: "DEVIATIONS MANAGEMENT",
      documentNo: "QAD01-D-43",
    },
    {
      key: "5",
      slNo: "5",
      title: "CHANGE CONTROL",
      documentNo: "QAD01-D-41",
    },
  ];

  const referenceDocumentColumns = [
    {
      title: "Sl. No.",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Document No.",
      dataIndex: "documentNo",
      key: "documentNo",
    },
  ];

  // const productReconciliationData = [
  //   {
  //     key: '1',
  //     inputQty: 0,
  //     outputQty: 0,
  //     yield: 0,
  //   },
  // ];

  const [isProductSubmitted, setIsProductSubmitted] = useState(false);

  const handleProductRelease = async () => {
    const chk_qa_name =
      productReleaseData.find((item) => item.role === "Name")?.chk_qa_name ||
      "";
    const chk_qa_date =
      productReleaseData.find((item) => item.role === "Sign & Date")
        ?.chk_qa_date || "";
    const chk_qa_time =
      productReleaseData.find((item) => item.role === "Sign & Date")
        ?.chk_qa_time || "";
    const chk_qa_sign = chk_qa_name;
    const apr_qa_name =
      productReleaseData.find((item) => item.role === "Name")?.apr_qa_name ||
      "";
    const apr_qa_date =
      productReleaseData.find((item) => item.role === "Sign & Date")
        ?.apr_qa_date || "";
    const apr_qa_time =
      productReleaseData.find((item) => item.role === "Sign & Date")
        ?.apr_qa_time || "";
    const apr_qa_sign = apr_qa_name;

    if (
      !chk_qa_name ||
      !chk_qa_date ||
      !chk_qa_time ||
      !chk_qa_sign ||
      !apr_qa_name ||
      !apr_qa_date ||
      !apr_qa_time ||
      !apr_qa_sign
    ) {
      message.error("Please fill in all mandatory fields before saving.");
      return;
    }
    const payload = {
      batchNo: selectedOrderValue,
      form_no: "PRD02/F-27",
      chk_qa_name:
        productReleaseData.find((item) => item.role === "Name")?.chk_qa_name ||
        "",
      chk_qa_date:
        productReleaseData.find((item) => item.role === "Sign & Date")
          ?.chk_qa_date || "",
      chk_qa_time:
        productReleaseData.find((item) => item.role === "Sign & Date")
          ?.chk_qa_time || "",
      chk_qa_sign:
        productReleaseData.find((item) => item.role === "Name")?.chk_qa_name ||
        "", // Ensure this field is included
      apr_qa_name:
        productReleaseData.find((item) => item.role === "Name")?.apr_qa_name ||
        "",
      apr_qa_date:
        productReleaseData.find((item) => item.role === "Sign & Date")
          ?.apr_qa_date || "",
      apr_qa_time:
        productReleaseData.find((item) => item.role === "Sign & Date")
          ?.apr_qa_time || "",
      apr_qa_sign:
        productReleaseData.find((item) => item.role === "Name")?.apr_qa_name ||
        "", // Ensure this field is included
    };

    console.log("Payload:", payload);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/15.SaveProductRelease`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Save successful:", response.data);
      setIsProductSubmitted(true);
      console.log("Setting isProductSubmitted to true");
      message.success("Product Release Submitted successfully");

      fetchProductReleaseDetails();
    } catch (error) {
      console.error("Save failed:", error);
      message.error("Failed to Submit Form");
    }
  };

  const productReconciliationColumns = [
    {
      title: "Input Quantity (Kgs)",
      dataIndex: "inputQty",
      key: "inputQty",

      render: (value, record) => (
        <InputNumber
          // style={{ display: loggedInHod ? "none" : "block" }}
          value={value}
          disabled={
            isProductSubmitted || role === "ROLE_HOD" || role == "ROLE_QA"
          }
          onChange={(value) =>
            handleProductReconciliationSave(value, record.key, "inputQty")
          }
          min={0}
        />
      ),
    },
    {
      title: "Output Quantity (Kgs)",
      dataIndex: "outputQty",
      key: "outputQty",
      render: (value, record) => (
        <InputNumber
          // style={{ display: loggedInHod ? "none" : "block" }}
          value={value}
          disabled={
            isProductSubmitted || role === "ROLE_HOD" || role == "ROLE_QA"
          }
          onChange={(value) =>
            handleProductReconciliationSave(value, record.key, "outputQty")
          }
          min={0}
        />
      ),
    },
    {
      title: "Yield (%)",
      dataIndex: "yield",
      key: "yield",
      render: (value) => `${value.toFixed(2)}%`,
    },
  ];

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getBleachingQA?department=SPUNLACE`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const qaOptions = res.data.map((option) => ({
          value: option.name,
          label: option.name,
        }));
        setQaLovs(qaOptions);
      })
      .catch((err) => {
        console.error("Error fetching QA LOV:", err);
        message.error("Unable to fetch QA due to network error.");
      });
  }, []);

  const handleProductReleaseChange = (key, field, value) => {
    console.log("Updating:", key, field, value); // Add this line to log the updates
    setProductReleaseData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const productReleaseColumns = [
    {
      title: "",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Checked by QA",
      key: "chk_qa",
      render: (_, record) => {
        if (record.role === "Name") {
          return (
            <Select
              placeholder="Select QA Name"
              value={record.chk_qa_name || selectedValues}
              onChange={(value) =>
                handleProductReleaseChange(record.key, "chk_qa_name", value)
              }
              style={{ width: "100%" }}
              disabled={isSaveDisabled}
            >
              {QaLovs.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          );
        } else if (record.role === "Sign & Date") {
          return (
            <>
              <DatePicker
                // value={record.chk_qa_date ? moment(record.chk_qa_date) : null}
                value={
                  record.chk_qa_date
                    ? moment(record.chk_qa_date)
                    : moment(currentDateQA)
                }
                onChange={(date, dateString) =>
                  handleProductReleaseChange(
                    record.key,
                    "chk_qa_date",
                    dateString
                  )
                }
                style={{ width: "100%", marginTop: "8px" }}
                disabled={isSaveDisabled}
              />
              <TimePicker
                format="HH:mm"
                // value={
                //   record.chk_qa_time
                //     ? moment(record.chk_qa_time, "HH:mm")
                //     : null
                // }
                value={
                  record.chk_qa_time
                    ? moment(record.chk_qa_time, "HH:mm")
                    : moment(currentTimeQA, "HH:mm")
                }
                onChange={(time, timeString) =>
                  handleProductReleaseChange(
                    record.key,
                    "chk_qa_time",
                    timeString
                  )
                }
                style={{ width: "100%", marginTop: "8px" }}
                disabled={isSaveDisabled}
              />
            </>
          );
        }
        return null;
      },
    },
    {
      title: "Approved by Manager-QA/Designee",
      key: "apr_qa",
      render: (_, record) => {
        if (record.role === "Name") {
          return (
            <Select
              placeholder="Select QA Name"
              value={record.apr_qa_name || selectedValues || selectedValueHOD}
              onChange={(value) =>
                handleProductReleaseChange(record.key, "apr_qa_name", value)
              }
              style={{ width: "100%" }}
              disabled={isSaveDisabled}
            >
              {QaLovs.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
              <Option value="other">Other</Option>
            </Select>
          );
        } else if (record.role === "Sign & Date") {
          return (
            <>
              <DatePicker
                value={
                  record.apr_qa_date
                    ? moment(record.apr_qa_date)
                    : moment(currentDateQA)
                }
                onChange={(date, dateString) =>
                  handleProductReleaseChange(
                    record.key,
                    "apr_qa_date",
                    dateString
                  )
                }
                style={{ width: "100%", marginTop: "8px" }}
                disabled={isSaveDisabled}
              />
              <TimePicker
                format="HH:mm"
                value={
                  record.apr_qa_time
                    ? moment(record.apr_qa_time, "HH:mm")
                    : moment(currentTimeQA, "HH:mm")
                }
                onChange={(time, timeString) =>
                  handleProductReleaseChange(
                    record.key,
                    "apr_qa_time",
                    timeString
                  )
                }
                style={{ width: "100%", marginTop: "8px" }}
                disabled={isSaveDisabled}
              />
            </>
          );
        }
        return null;
      },
    },
  ];

  const PostProductionReview = () => (
    <div>
      <h2>Post-Production Review</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th colSpan="10" style={{ height: "20px" }}>
              Designation
            </th>
            <th colSpan="30">Shift In charge Signature</th>
            <th colSpan="30">
              Reviewed by Production Manager/Head of the Department
            </th>
            <th colSpan="30">Approved by QA-Officer/Executive/Manager</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan="10" style={{ height: "20px" }}>
              Signature
            </th>
            <td colSpan="30">
              {" "}
              <Select
                options={SupervisorLov}
                value={supervisorSign13 || username}
                style={{ width: "100%", textAlign: "center" }}
                dropdownStyle={{ textAlign: "center" }}
                disabled={disabled13Sup}
                onChange={(e) => handleSupervisorSignchange(e)}
              ></Select>
            </td>
            <td colSpan="30">
              {" "}
              <Select
                options={userLov}
                value={hodSign13 || hod_desUsername}
                style={{ width: "100%", textAlign: "center" }}
                dropdownStyle={{ textAlign: "center" }}
                disabled={disabled13Hod}
                onChange={(e) => handleHODSignchange(e)}
              ></Select>
            </td>
            <td colSpan="30">
              {" "}
              <Select
                options={userLov}
                value={qaSign13 || QAMAN_QADES_Username}
                style={{ width: "100%", textAlign: "center" }}
                dropdownStyle={{ textAlign: "center" }}
                disabled={disabled13Qa}
                onChange={(e) => handleQASignchange(e)}
              ></Select>
            </td>
          </tr>
          <tr>
            <th colSpan="10" style={{ height: "20px" }}>
              Date
            </th>
            <td colSpan="30">
              <Input
                type="datetime-local"
                value={supervisorDate13 || currentDateTime}
                disabled={disabled13Sup}
                style={{ width: "100%" }}
                onChange={(e) => handleSupervisorDatechange(e.target.value)}
              ></Input>
            </td>
            <td colSpan="30">
              <Input
                type="datetime-local"
                value={hodDate13 || currentDateTimeHOD}
                disabled={disabled13Hod}
                style={{ width: "100%" }}
                onChange={(e) => handleHODDatechange(e.target.value)}
              ></Input>
            </td>
            <td colSpan="30">
              <Input
                type="datetime-local"
                value={qaDate13 || currentDateQAman_QAdes}
                disabled={disabled13Qa}
                style={{ width: "100%" }}
                onChange={(e) => handleQADatechange(e.target.value)}
              ></Input>
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        type="primary"
        onClick={handlePostProductionSave}
        style={{
          marginTop: "16px",
          display: disabled13Submitted ? "none" : "block",
        }}
        // loading={postProdReview.load}
      >
        Submit
      </Button>
    </div>
  );

  const handleOrderNochange = (value) => {
    setOrderNoSelect(value);
  };

  const handleSupervisorSignchange = (value) => {
    setSupervisorSign13(value);
  };
  const handleHODSignchange = (value) => {
    setHodSign13(value);
  };
  const handleQASignchange = (value) => {
    setQaSign13(value);
  };

  const handleSupervisorDatechange = (value) => {
    setSupervisorDate13(value);
  };
  const handleHODDatechange = (value) => {
    sethodDate13(value);
  };
  const handleQADatechange = (value) => {
    setqaDate13(value);
  };

  const handlePostProductionSave = async () => {
    if (selectedOrderValue == "") {
      message.warning("Please Select Order Number");
      return;
    }

    const payload = {
      id: id13,
      batchNo: selectedOrderValue,
      order_no: orderNoSelect,
      form_no: "PRD02/F-27",
      sup_sign: supervisorSign13 || selectedValue,
      sup_date: supervisorDate13 || currentDateTime,
      supervisor_id: supervisorId13,
      hod_id: hodId13,
      status: status13,
      // sup_time: ,
      designee_sign: hodSign13 || hod_desUsername,
      designee_date: hodDate13 || currentDateTimeHOD,
      // designee_time: ,
      qa_sign: qaSign13 || QAMAN_QADES_Username,
      qa_date: qaDate13 || currentDateQAman_QAdes,
      status: status13,
      // qa_time: ,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/13.SubmitPostProductionReview`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPostProductionReviewDetails();
      message.success("Form Submiited Successfully");
    } catch (error) {
      console.error("Save failed:", error);
      // message.error('Failed to Submit Form');
      const errorMessage =
        error.response?.data?.message || "Failed to Submit Form"; // Get the response message if it exists
      message.error(errorMessage);
    }
  };

  const handleEnclosureChange = (key, field, e) => {
    const value = e.target.value;
    setListOfEnclosuresData((prevState) =>
      prevState.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  // const handledelaySignChange = (e, key) => {
  //   setProcessDelayData((prevData) =>
  //     prevData.map((row) => (row.key === key ? { ...row, prodSign: e.target.value } : row)),
  //   );
  // };

  const handledelaySignChange = (value, key) => {
    setProcessDelayData((prevData) =>
      prevData.map((row) =>
        row.key === key ? { ...row, prodSign: value } : row
      )
    );
  };

  const handledelayDateChange = (e, key) => {
    setProcessDelayData((prevData) =>
      prevData.map((row) =>
        row.key === key ? { ...row, prodDate: e.target.value } : row
      )
    );
  };

  // Handle save action
  const handleEnclosureSave = async () => {
    if (selectedOrderValue == "") {
      message.warning("Please Select Order No");
      return;
    }
    // for (const item of listOfEnclosuresData) {
    //   if (item.date === "" || item.title === "" || item.remarks === "") {
    //     message.warning("Please Select All Required Fields");
    //     return;
    //   }
    // }
    setLOEnclose((prevState) => ({
      ...prevState,
      load: true,
    }));
    const payload = {
      enc_id: enc_id,
      batchNo: selectedOrderValue,
      form_no: "PRD02/F-27",
      // status: "Active",
      detailsRecords12: listOfEnclosuresData.map((item) => ({
        id: item.id,
        step_no: item.slNo,
        date: item.date,
        title: item.title,
        remarks: item.remarks,
      })),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/12.SaveListOfEnclosurs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        message.success("List Of Enclosur saved successfully");
        fetchListOfEnclosures();
        // setTimeout(() => {
        //   navigate("/Precot/choosenScreen");
        // }, 1000);
        setLOEnclose((prevState) => ({
          ...prevState,
          load: false,
        }));

        axios.get(
          `${API.prodUrl}/Precot/api/spunlace/rp/summary/12.GetListOfEnclosurs`,
          {
            params: { batch_no: selectedOrderValue },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);
        if (response.data.length > 0) {
          if (response.data[0].status == "SUPERVISOR_APPROVED") {
            setLOEnclose((prevState) => ({
              ...prevState,
              hide: true,
            }));
          }

          setEncId(response.data[0].enc_id);
          console.log("EncId", response.data[0].enc_id);

          const transformedData =
            response.data.length > 0
              ? response.data[0].detailsRecords12.map((item, index) => ({
                  key: (index + 1).toString(),
                  id: item.id,
                  slNo: item.step_no,
                  date: item.date,
                  title: item.title,
                  remarks: item.remarks,
                }))
              : [
                  {
                    key: "1",
                    slNo: "1.",
                    id: null,
                    date: null,
                    title: null,
                    remarks: null,
                  },
                  {
                    key: "2",
                    slNo: "2.",
                    id: null,
                    date: null,
                    title: null,
                    remarks: null,
                  },
                ];

          setListOfEnclosuresData(transformedData);
        } else {
          setLOEnclose((prevState) => ({
            ...prevState,
            hide: false,
          }));
        }
      }
    } catch (error) {
      console.error("Save failed:", error);
      message.error(error.response.data.message);
      setLOEnclose((prevState) => ({
        ...prevState,
        load: false,
      }));
    }
  };

  // Handle Submit for List of Enclosure
  const handleEnclosureSubmit = async () => {
    if (selectedOrderValue == "") {
      message.warning("Please Select Order No");
      return;
    }
    for (const item of listOfEnclosuresData) {
      if (item.date === "" || item.title === "" || item.remarks === "") {
        message.warning("Please Select All Required Fields");
        return;
      }
    }
    setLOEnclose((prevState) => ({
      ...prevState,
      load: true,
    }));
    const payload = {
      enc_id: enc_id,
      batchNo: selectedOrderValue,
      form_no: "PRD02/F-27",
      // status: "Active",
      detailsRecords12: listOfEnclosuresData.map((item) => ({
        id: item.id,
        step_no: item.slNo,
        date: item.date,
        title: item.title,
        remarks: item.remarks,
      })),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/12.SubmitListOfEnclosurs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        message.success("List Of Enclosur Submitted successfully");
        fetchListOfEnclosures();
        // setTimeout(() => {
        //   navigate("/Precot/choosenScreen");
        // }, 1000);
        setLOEnclose((prevState) => ({
          ...prevState,
          load: false,
        }));
      }
    } catch (error) {
      console.error("Save failed:", error);
      message.error(error.response.data.message);
      setLOEnclose((prevState) => ({
        ...prevState,
        load: false,
      }));
    }
  };

  const initialProcessDelayData = [
    // {
    //   key: '1',
    //   stepNo: '',
    //   date: '',
    //   from: '',
    //   to: '',
    //   total: '',
    //   signatureDate: '',
    //   remarks: '',
    // },
    // {
    //   key: '2',
    //   stepNo: '',
    //   date: '',
    //   from: '',
    //   to: '',
    //   total: '',
    //   signatureDate: '',
    //   remarks: '',
    // },
  ];

  const [processDelayData, setProcessDelayData] = useState(
    initialProcessDelayData
  );
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (key) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(key)) {
        return prevSelectedRows.filter((selectedKey) => selectedKey !== key); // Uncheck
      } else {
        return [...prevSelectedRows, key]; // Check
      }
    });
  };

  const handleprocessdelaychange = (value, key, field) => {
    const newData = processDelayData.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setProcessDelayData(newData);
  };

  const [Isdelay, setIdelay] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handledelayequipmentSubmit = async () => {
    const payload = {
      batchNo: selectedOrderValue,
      id: delayEquipmentBreakdownRecordDetails?.bmrSummaryDateList?.[0]?.id,
      form_no: "PRD02/F-27",
      batchNo:
        delayEquipmentBreakdownRecordDetails?.bmrSummaryDateList?.[0]?.batchNo,
      spunlacrdetails: processDelayData
        .filter((item) => selectedRows.includes(item.key)) // Only selected rows
        .map((item, index) => ({
          prod_date: delayProdDates[index], // Ensure the date corresponds correctly
          line_id:
            delayEquipmentBreakdownRecordDetails?.bmrSummaryDateList?.[0]
              ?.spunlacrdetails?.[index]?.line_id,

          prod_name: "",
          prod_sign: delayProdNames[index], // Adjust based on how you track the names
          pde_date: item.date, // PackDate or item.date from table
          pde_from_hr: item.from,
          pde_to_hr: item.to,
          pde_total_hr: item.total,
          remarks: item.remarks,
        })),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/11.SubmitDelayEqupmentBrkDwnRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Save successful:", response.data);
      message.success("Delayequpment BreakDown Record Submitted successfully");
      setIdelay(true);
      const filteredData = processDelayData.filter((row) =>
        selectedRows.includes(row.key)
      );
      setSubmittedData(filteredData);
    } catch (error) {
      console.error("Save failed:", error);

      const errorMessage =
        error.response?.data?.message || "Failed to Submit Form"; // Get the response message if it exists
      message.error(errorMessage);
    }
  };

  const handledelayequipment = async () => {
    const payload = {
      batchNo: selectedOrderValue,
      id: delayEquipmentBreakdownRecordDetails?.bmrSummaryDateList?.[0]?.id,
      form_no: "PRD02/F-27",
      batchNo:
        delayEquipmentBreakdownRecordDetails?.bmrSummaryDateList?.[0]?.batchNo,
      spunlacrdetails: processDelayData
        .filter((item) => selectedRows.includes(item.key)) // Only selected rows
        .map((item, index) => ({
          prod_date: delayProdDates[index], // Ensure the date corresponds correctly
          line_id:
            delayEquipmentBreakdownRecordDetails?.bmrSummaryDateList?.[0]
              ?.spunlacrdetails?.[index]?.line_id,
          prod_name: "",
          prod_sign: delayProdNames[index], // Adjust based on how you track the names
          pde_date: item.date, // PackDate or item.date from table
          pde_from_hr: item.from,
          pde_to_hr: item.to,
          pde_total_hr: item.total,
          remarks: item.remarks,
        })),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/11.SaveDelayEqupmentBrkDwnRecord`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Save successful:", response.data);
      message.success("Delayequpment BreakDown Record saved successfully");
    } catch (error) {
      console.error("Save failed:", error);
      message.error("Failed to save Form");
    }
  };

  // Columns for Process Delay Equipment Breakdown Record
  const processDelayEquipmentBreakDownRecordColumns = [
    {
      title: "Step No.",
      dataIndex: "stepNo",
      key: "stepNo",
      render: (value, record) => (
        <Input
          value={value}
          onChange={(e) =>
            handleprocessdelaychange(e.target.value, record.key, "stepNo")
          }
        />
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value, record) => (
        <input
          type="date"
          value={value}
          onChange={(e) =>
            handleprocessdelaychange(e.target.value, record.key, "date")
          }
        />
      ),
    },
    {
      title: "Process Delay/Down Time",
      children: [
        {
          title: "From",
          dataIndex: "from",
          key: "from",
          render: (value, record) => (
            <Input
              value={value}
              onChange={(e) =>
                handleprocessdelaychange(e.target.value, record.key, "from")
              }
            />
          ),
        },
        {
          title: "To",
          dataIndex: "to",
          key: "to",
          render: (value, record) => (
            <Input
              value={value}
              onChange={(e) =>
                handleprocessdelaychange(e.target.value, record.key, "to")
              }
            />
          ),
        },
        {
          title: "Total",
          dataIndex: "total",
          key: "total",
          render: (value, record) => (
            <Input
              value={value}
              onChange={(e) =>
                handleprocessdelaychange(e.target.value, record.key, "total")
              }
            />
          ),
        },
      ],
    },
    {
      title: "Signature/Date",
      dataIndex: "signatureDate",
      key: "signatureDate",
      render: (value, record) => (
        <input
          type="date"
          value={value}
          onChange={(e) =>
            handleprocessdelaychange(
              e.target.value,
              record.key,
              "signatureDate"
            )
          }
        />
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (value, record) => (
        <Input
          value={value}
          onChange={(e) =>
            handleprocessdelaychange(e.target.value, record.key, "remarks")
          }
        />
      ),
    },
  ];

  const ProcessDelayEquipmentBreakDownRecord = () => (
    <Table
      columns={processDelayEquipmentBreakDownRecordColumns}
      dataSource={processDelayData}
      pagination={false}
      bordered
      style={{ marginTop: "20px" }}
    />
  );

  // Data for Processing Equipment's

  const [processingEquipmentsData, setProcessingEquipmentsData] = useState([
    {
      key: "1",
      slNo: "1",
      equipmentName: "RP Bale Press",
      equipmentCode: "PH-E/I-SP13",
      dateOfCalibration: "",
      calibrationDueOn: "",
      checkedBy: "",
    },

    {
      key: "2",
      slNo: "2",
      equipmentName: "Strip Opener",
      equipmentCode: "PH-E/I-SP14",
      dateOfCalibration: "NA",
      calibrationDueOn: "NA",
      checkedBy: "",
    },
    {
      key: "3",
      slNo: "3",
      equipmentName: "Applied",
      equipmentCode: "PH-E/I-SP12",
      dateOfCalibration: "",
      calibrationDueOn: "",
      checkedBy: "",
    },
  ]);

  const centeredInputStyle = {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
    border: "none",

    width: "100%",
  };

  const processingEquipmentsColumns = [
    {
      title: "Sl. No.",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Equipment Name",
      dataIndex: "equipmentName",
      key: "equipmentName",
    },
    {
      title: "Equipment Code",
      dataIndex: "equipmentCode",
      key: "equipmentCode",
    },
    {
      title: "Date of Calibration",
      dataIndex: "dateOfCalibration",
      key: "dateOfCalibration",
      render: (value, record) =>
        record.equipmentName === "Strip Opener" ? (
          <span>NA</span>
        ) : (
          <input
            type="date"
            value={value || currentDate}
            onChange={(e) =>
              handleDateChange(e, record.key, "dateOfCalibration")
            }
            disabled={role === "ROLE_HOD" || role === "ROLE_QA" || isSubmitted}
            // style={centeredInputStyle}
          />
        ),
    },
    {
      title: "Calibration Due On",
      dataIndex: "calibrationDueOn",
      key: "calibrationDueOn",
      render: (value, record) =>
        record.equipmentName === "Strip Opener" ? (
          <span>NA</span>
        ) : (
          <input
            type="date"
            value={value || currentDate}
            onChange={(e) =>
              handleDateChange(e, record.key, "calibrationDueOn")
            }
            disabled={role === "ROLE_HOD" || role === "ROLE_QA" || isSubmitted}
            // style={centeredInputStyle}
          />
        ),
    },
    {
      title: "Checked By",
      dataIndex: "checkedBy",
      key: "checkedBy",
      render: (value, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Select
            value={value || selectedValue}
            onChange={(newValue) =>
              handleprocessequipmentchange(newValue, record.key, "checkedBy")
            }
            options={userLov}
            style={{ width: "50%" }}
            disabled={role === "ROLE_HOD" || role === "ROLE_QA" || isSubmitted}
          />
          {/* <DatePicker
            value={record.checked_by_date ? moment(record.checked_by_date, 'DD/MM/YYYY') : null}
            onChange={(date, dateString) => handleDateChanges(dateString, record.key, 'checked_by_date')}
            format="DD/MM/YYYY"
            style={{ width: '45%' }}
          /> */}
          <Input
            style={{ width: "50%" }}
            type="datetime-local"
            value={record.checked_by_date || currentDateTime}
            onChange={(e) =>
              handleDateChanges(record.key, "checked_by_date", e.target.value)
            }
            disabled={role === "ROLE_HOD" || role === "ROLE_QA" || isSubmitted}
          />
        </div>
      ),
    },
  ];

  const disabled06 =
    (role == "ROLE_SUPERVISOR" &&
      ProcessingEquipmentDetails06?.[0]?.status == "SUPERVISOR_APPROVED") ||
    role == "ROLE_QA";
  const disabledSubmit06 =
    (role == "ROLE_SUPERVISOR" &&
      ProcessingEquipmentDetails06?.[0]?.status == "SUPERVISOR_APPROVED") ||
    (role == "ROLE_QA" &&
      ProcessingEquipmentDetails06?.[0]?.status == "QA_APPROVED");

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getBleachingQA?department=SPUNLACE`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("QA", res.data);
        if (role == "QA_MANAGER" || "QA_DESIGNEE") {
          return;
        }
        const a = res.data.map((option) => ({
          value: option.name,
          label: option.name,
        }));

        setUserLov(a);
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch QA Caused Network Error",
        });
      });
  }, [selectedOrderValue]);

  const handleDateChange = (event, key, field) => {
    const dateString = event.target.value;
    const newData = processingEquipmentsData.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: dateString };
      }
      return item;
    });
    setProcessingEquipmentsData(newData);
  };
  const handleprocessequipmentchange = (newValue, key, field) => {
    setProcessingEquipmentsData((prevData) =>
      prevData.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            [field]: newValue, // This updates either checkedBy or checkedDate based on the field
          };
        }
        return item;
      })
    );
  };

  const handleDateChanges = (key, field, value) => {
    setProcessingEquipmentsData((prevData) =>
      prevData.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      })
    );
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitProcessingEquipments = () => {
    const token = localStorage.getItem("token");

    // Validate that all mandatory fields are filled
    const isValid = processingEquipmentsData.every((item) => {
      return (
        item.dateOfCalibration &&
        item.calibrationDueOn &&
        item.checked_by_date &&
        item.checkedBy // Both checked_by_sign and checked_by_name are the same, so checking only checkedBy is enough
      );
    });

    if (!isValid) {
      message.error("Please fill in all mandatory fields before saving.");
      return;
    }

    // Prepare the payload
    const payload = {
      batchNo: selectedOrderValue, // Replace with actual order number if dynamic
      form_no: "PRD02/F-27", // Replace with actual form number if dynamic
      status: "Active", // Replace with actual status if dynamic
      equp_id: IdSix,
      detailsRecords06: processingEquipmentsData.map((item) => ({
        id: item.id,
        equp_name: item.equipmentName,
        equp_code: item.equipmentCode,
        date_calibration: item.dateOfCalibration,
        calibration_due_on: item.calibrationDueOn,
        checked_by_date: item.checked_by_date,
        checked_by_sign: item.checkedBy,
        checked_by_name: item.checkedBy,
      })),
    };

    // Make the API call
    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/06.SubmitProcessingEqupments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Processing equipment data Submitted Successfully");
        console.log("Saved data:", response.data);
        fetchProcessingEquipmentDetails();
        setIsSaved(true);
        setIsSubmitted(true);
      })
      .catch((error) => {
        message.error("Failed to save Form");
        console.error("Error saving data:", error);
      });
  };

  const handleSaveProcessingEquipments = () => {
    const token = localStorage.getItem("token");

    // Prepare the payload
    const payload = {
      batchNo: selectedOrderValue, // Replace with actual order number if dynamic
      form_no: "PRD02/F-27", // Replace with actual form number if dynamic
      status: "Active", // Replace with actual status if dynamic
      equp_id: IdSix,
      detailsRecords06: processingEquipmentsData.map((item) => ({
        id: item.id,
        equp_name: item.equipmentName,
        equp_code: item.equipmentCode,
        date_calibration: item.dateOfCalibration,
        calibration_due_on: item.calibrationDueOn,
        checked_by_date: item.checked_by_date,
        checked_by_sign: item.checkedBy,
        checked_by_name: item.checkedBy,
      })),
    };

    // Make the API call
    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/06.SaveProcessingEqupments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Processing equipment data Saved Successfully");
        console.log("Saved data:", response.data);
        fetchProcessingEquipmentDetails();
        setIsSaved(true);
      })
      .catch((error) => {
        message.error("Failed to Save Form");
        console.error("Error saving data:", error);
      });
  };

  const [verificationOfRecordsData, setVerificationOfRecordsData] = useState([
    {
      key: "1",
      nameOfRecord: "House Keeping Cleaning Records",
      checkedByDate: "",
      verifiedByDate: "",
      activity: "Satisfactory",
    },
    {
      key: "2",
      nameOfRecord: "",
      checkedByDate: "",
      verifiedByDate: "",
      activity: "Not Satisfactory",
    },
    {
      key: "3",
      nameOfRecord: "Production Records",
      checkedByDate: "",
      verifiedByDate: "",
      activity: "Satisfactory",
    },
    {
      key: "4",
      nameOfRecord: "",
      checkedByDate: "",
      verifiedByDate: "",
      activity: "Not Satisfactory",
    },
  ]);

  const handleverificationchange = (key, field, value) => {
    setVerificationOfRecordsData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleRadioChange = (key, value) => {
    setVerificationOfRecordsData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, activity: value } : item
      )
    );
  };

  const handleverificationSave = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      batchNo: selectedOrderValue,
      form_no: "PRD02/F-27",
      status: "Active",
      verification_id: sevenId,
      detailsRecords06: [
        {
          id: sevenIdHouseKeeping,
          checked_date: checkedbyDate,
          checked_time: checkedbyTime,
          checked_name: checkedbySign,
          checked_sign: checkedbySign,
          verified_date: VerifiedbyDate,
          verified_time: VerifiedbyTime,
          verified_name: VerifiedbySign,
          verified_sign: VerifiedbySign,

          details: activityHouseKeeping,
          observation: "House Keeping Cleaning Records",
        },
        {
          id: sevenIdProductionRecords,
          checked_date: checkedbyDatePR,
          checked_time: checkedbyTimePR,
          checked_name: checkedbySignPR,
          checked_sign: checkedbySignPR,
          verified_date: VerifiedbyDatePR,
          verified_time: VerifiedbyTimePR,
          verified_name: VerifiedbySignPR,
          verified_sign: VerifiedbySignPR,
          // satisfactory: isSatisfactory ? "Tick" : "NA",
          // non_satisfactory: isNotSatisfactory ? "Tick" : "NA",
          details: activityProductionRecords,
          observation: "Production Records",
        },
      ],
    };

    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/07.SaveVerificationOfRecords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Data saved successfully:", responseData);
      message.success("Verification Of Records saved successfully");
      fetchVerificationOfRecordsDetails();
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Failed to save Form");
    }
  };

  const [isVerificationSubmitted, setisVerificationSubmitted] = useState(false);

  const handleverificationSubmit = async () => {
    const token = localStorage.getItem("token");

    if (
      role == "ROLE_SUPERVISOR" &&
      (checkedbyDate == null ||
        checkedbyTime == null ||
        checkedbySign == null ||
        checkedbyDatePR == null ||
        checkedbyTimePR == null ||
        checkedbySignPR == null)
      // activityHouseKeeping == null ||
      // activityProductionRecords == null
    ) {
      message.warning("Please Select Manditory Fields");
      return;
    }
    if (
      role == "ROLE_QA" &&
      (VerifiedbyDate == null ||
        VerifiedbyTime == null ||
        VerifiedbySign == null ||
        VerifiedbyDatePR == null ||
        VerifiedbySignPR == null ||
        VerifiedbyTime == null)
    ) {
      message.warning("Please Select Manditory Fields");
      return;
    }

    const payload = {
      batchNo: selectedOrderValue,
      form_no: "PRD02/F-27",
      status: "Active",
      supervisor_save_id: Superviosrsaveid,
      verification_id: sevenId,
      supervisor_status: verificationSupervisorStatus,
      qa_status: verificationqaStatus,
      detailsRecords06: [
        {
          id: sevenIdHouseKeeping,
          verification_id: sevenId,
          checked_date: checkedbyDate,
          checked_time: checkedbyTime,
          checked_name: checkedbySign,
          checked_sign: checkedbySign,
          verified_date: VerifiedbyDate,
          verified_time: VerifiedbyTime,
          verified_name: VerifiedbySign,
          verified_sign: VerifiedbySign,
          details: activityHouseKeeping,
          observation: "House Keeping Cleaning Records",
        },
        {
          id: sevenIdProductionRecords,
          verification_id: sevenId,
          checked_date: checkedbyDatePR,
          checked_time: checkedbyTimePR,
          checked_name: checkedbySignPR,
          // checked_sign: checkedbySignPR,
          checked_sign: username,
          verified_date: VerifiedbyDatePR,
          verified_time: VerifiedbyTimePR,
          verified_name: VerifiedbySignPR,
          verified_sign: VerifiedbySignPR,
          details: activityProductionRecords,
          observation: "Production Records",
        },
      ],
    };

    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/07.SubmitVerificationOfRecords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Data saved successfully:", responseData);
      message.success("Verification Record Submitted successfully");
      fetchVerificationOfRecordsDetails();
      setisVerificationSubmitted(true);
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Failed to Submit Form");
    }
  };
  const handleCheckedBySignChange = (value) => {
    setcheckedbySign(value);

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

    setcheckedbyDate(formattedDate);
    setcheckedbyTime(formattedTime);
  };

  const handlecheckedbyDateChange = (event) => {
    setcheckedbyDate(event.target.value);
  };

  const handlecheckedbyTimeChange = (event) => {
    setcheckedbyTime(event.target.value);
  };

  const handleVerifiedBySignChange = (value) => {
    setVerifiedbySign(value);
  };

  const handleVerifiedbyDateChange = (event) => {
    const value = event.target.value;
    setVerifiedbyDate(value);
  };
  const handleVerifiedbyTimeChange = (event) => {
    const value = event.target.value;
    setVerifiedbyTime(value);
  };
  const handleActivityHouseKeepingChange = (event) => {
    const value = event.target.value;
    setActivityHouseKeeping(value);
  };
  const handleActivityProductionRecordsChange = (event) => {
    const value = event.target.value;
    console.log(" activity ", value);
    setActivityProductionRecords(value);
  };
  const handleCheckedBySignChangeRP = (value) => {
    setcheckedbySignPR(value);
  };
  const handlecheckedbyDateChangeRP = (event) => {
    const value = event.target.value;
    setcheckedbyDatePR(value);
  };
  const handlecheckedbyTimeChangeRP = (event) => {
    const value = event.target.value;
    setcheckedbyTimePR(value);
  };
  const handleVerifiedBySignChangeRP = (value) => {
    setVerifiedbySignPR(value);
  };
  const handleVerifiedbyDateChangeRP = (event) => {
    const value = event.target.value;
    setVerifiedbyDatePR(value);
  };
  const handleVerifiedbyTimeChangeRP = (event) => {
    const value = event.target.value;
    setVerifiedbyTimePR(value);
  };
  const disabled07 =
    (role == "ROLE_SUPERVISOR" &&
      SupervisorStatus07 === "SUPERVISOR_APPROVED") ||
    role == "ROLE_QA" ||
    role == "ROLE_HOD" ||
    role == "ROLE_DESIGNEE";
  const disabledQa07 =
    (role == "ROLE_QA" && qaStatus07 == "QA_APPROVED") ||
    role == "ROLE_SUPERVISOR";
  const disabledSubmit07 =
    (role == "ROLE_QA" && qaStatus07 == "QA_APPROVED") ||
    role == "ROLE_HOD" ||
    role == "ROLE_DESIGNEE" ||
    (role == "ROLE_SUPERVISOR" && SupervisorStatus07 === "SUPERVISOR_APPROVED");

  const handleSearch = (searchValue) => {
    if (
      searchValue &&
      !options.some((option) => option.value === searchValue)
    ) {
      // Add the manually entered value to the top of the options array
      setOptions((prev) => [
        { label: searchValue, value: searchValue },
        ...prev,
      ]);
    }
  };
  const VerificationOfRecords = () => (
    <div>
      <table style={{ width: "100%", marginBottom: "10px" }}>
        <tr>
          <th colSpan="10" style={{ height: "40px" }}>
            Name of the Record{" "}
          </th>
          <th colSpan="30">Checked by/Date </th>
          {role == "ROLE_QA" ? <th colSpan="30">Verified by/Date</th> : ""}
          <th colSpan="30">Activity</th>
        </tr>
        <tr>
          <td colSpan="10" style={{ height: "20px" }}>
            House Keeping Cleaning Records
          </td>
          <td colSpan="30">
            <Select
              value={checkedbySign || selectedValue}
              onChange={handleCheckedBySignChange}
              options={SupervisorLov}
              style={{ width: "100%" }}
              // disabled={disabled07}
              disabled={
                role !== "ROLE_SUPERVISOR"
                  ? disabled07
                  : undefined || isVerificationSubmitted
              }
            />

            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                type="date"
                value={checkedbyDate || currentDate}
                onChange={handlecheckedbyDateChange}
                // disabled={disabled07}
                disabled={
                  role !== "ROLE_SUPERVISOR"
                    ? disabled07
                    : undefined || isVerificationSubmitted
                }
              />{" "}
              <Input
                type="time"
                value={checkedbyTime || currentTime}
                onChange={handlecheckedbyTimeChange}
                // disabled={disabled07}
                disabled={
                  role !== "ROLE_SUPERVISOR"
                    ? disabled07
                    : undefined || isVerificationSubmitted
                }
              />
            </div>
          </td>
          {role == "ROLE_QA" ? (
            <td colSpan="30">
              <Select
                value={VerifiedbySign || selectedValues}
                onChange={handleVerifiedBySignChange}
                options={userLov}
                style={{ width: "100%" }}
                // disabled={disabledQa07}
                disabled={isVerificationSubmitted}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="date"
                  value={VerifiedbyDate || currentDateQA}
                  onChange={handleVerifiedbyDateChange}
                  // disabled={disabledQa07}
                  disabled={isVerificationSubmitted}
                />{" "}
                <Input
                  type="time"
                  value={VerifiedbyTime || currentTimeQA}
                  onChange={handleVerifiedbyTimeChange}
                  // disabled={disabledQa07}
                  disabled={isVerificationSubmitted}
                />
              </div>
            </td>
          ) : (
            ""
          )}
          <td colSpan="30">
            <Radio.Group
              value={activityHouseKeeping}
              onChange={handleActivityHouseKeepingChange}
              // disabled={disabled07}
              // disabled={role !== 'ROLE_QA' ? disabled07 : undefined}
              disabled={role !== "ROLE_QA" || isVerificationSubmitted}
            >
              <Radio value="satisfactory">Satisfactory</Radio>
              <Radio value="notSatisfactory">Not Satisfactory</Radio>
              <Radio value="na">NA</Radio>
            </Radio.Group>
          </td>
        </tr>
        <tr>
          <td colSpan="10" style={{ height: "20px" }}>
            Production Records
          </td>
          <td colSpan="30">
            <Select
              placeholder="Checked by Sign"
              value={checkedbySignPR || selectedValue}
              onChange={handleCheckedBySignChangeRP}
              options={SupervisorLov}
              style={{ width: "100%" }}
              // disabled={disabled07}
              disabled={
                role !== "ROLE_SUPERVISOR"
                  ? disabled07
                  : undefined || isVerificationSubmitted
              }
            />

            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                type="date"
                value={checkedbyDatePR || currentDate}
                onChange={handlecheckedbyDateChangeRP}
                // disabled={disabled07}
                disabled={
                  role !== "ROLE_SUPERVISOR"
                    ? disabled07
                    : undefined || isVerificationSubmitted
                }
              />{" "}
              <Input
                type="time"
                value={checkedbyTimePR || currentTime}
                onChange={handlecheckedbyTimeChangeRP}
                // disabled={disabled07}
                disabled={
                  role !== "ROLE_SUPERVISOR"
                    ? disabled07
                    : undefined || isVerificationSubmitted
                }
              />
            </div>
          </td>
          {role == "ROLE_QA" ? (
            <td colSpan="30">
              <Select
                placeholder="Verified by Sign"
                value={VerifiedbySignPR || selectedValues}
                onChange={handleVerifiedBySignChangeRP}
                options={userLov}
                style={{ width: "100%" }}
                disabled={isVerificationSubmitted}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="date"
                  value={VerifiedbyDatePR || currentDateQA}
                  onChange={handleVerifiedbyDateChangeRP}
                  disabled={isVerificationSubmitted}
                />{" "}
                <Input
                  type="time"
                  value={VerifiedbyTimePR || currentTimeQA}
                  onChange={handleVerifiedbyTimeChangeRP}
                  disabled={isVerificationSubmitted}
                />
              </div>
            </td>
          ) : (
            ""
          )}
          <td colSpan="30">
            <Radio.Group
              value={activityProductionRecords}
              onChange={handleActivityProductionRecordsChange}
              // disabled={disabled07}
              // disabled={role !== 'ROLE_QA' ? disabled07 : undefined}
              disabled={role !== "ROLE_QA" || isVerificationSubmitted}
            >
              <Radio value="satisfactory">Satisfactory</Radio>
              <Radio value="notSatisfactory">Not Satisfactory</Radio>
              <Radio value="na">NA</Radio>
            </Radio.Group>
          </td>
        </tr>
      </table>
      <div style={{ display: "flex" }}>
        <Button
          type="primary"
          onClick={handleverificationSave}
          // style={{ display: disabled07 ? 'none' : 'block' }}
        >
          Save
        </Button>
        <Button
          type="primary"
          style={{
            marginLeft: "10px",
            // display: disabledSubmit07 ? 'none' : 'block',
          }}
          onClick={handleverificationSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );

  useEffect(() => {
    console.log("Qa ReleASE", qaReleaseData);
  }, [qaReleaseData]);

  const QARelase = () => {
    const [qaLov, setQaLov] = useState([]);

    // Fetch QA LOVs
    useEffect(() => {
      axios
        .get(
          `${API.prodUrl}/Precot/api/Users/Service/getBleachingQA?department=SPUNLACE`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          const qaOptions = res.data.map((option) => ({
            value: option.name,
            label: option.name,
          }));
          setQaLov(qaOptions);
        })
        .catch((err) => {
          console.error("Error fetching QA LOV:", err);
          message.error("Unable to fetch QA LOV due to a network error.");
        });
    }, []);

    // Update state when status changes
    const handleStatusChange = (key, value) => {
      setQaReleaseData((prevData) =>
        prevData.map((item) =>
          item.key === key ? { ...item, status: value } : item
        )
      );
    };

    // Update state when QA or Date changes
    const handleSignAndDateChange = (key, type, value) => {
      setQaReleaseData((prevData) =>
        prevData.map((item) =>
          item.key === key
            ? { ...item, signAndDate: { ...item.signAndDate, [type]: value } }
            : item
        )
      );
    };

    // Handle submit to API
    const handleSubmit = async () => {
      for (let i = 0; i < qaReleaseData.length; i++) {
        const item = qaReleaseData[i];
        if (!item.status) {
          message.error("Please fill out the Status field.");
          return; // Prevent form submission if validation fails
        }
      }
      const currentTime = moment().format("hh:mm A");
      const payload = {
        rls_id: id14,
        batchNo: selectedOrderValue,
        form_no: "PRD02/F-27",
        status: "Pending",
        details: qaReleaseData.map((item) => ({
          id: item.childId || null,
          date: item.signAndDate.date || currentDateQAman_QAdes,
          time: currentTime,
          name: item.signAndDate.qa || QAMAN_QADES_Username,
          sign: item.signAndDate.qa || QAMAN_QADES_Username,
          status_1: item.status,
          status_2: item.status,
        })),
      };

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/spunlace/rp/summary/14.SubmitQaRelease`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        message.success("QA Submitted successfully");
        fetchQAReleaseDetails();
      } catch (error) {
        console.error("Error saving QA release data:", error);
        message.error("Failed to Submit Form");
      }
    };

    const handleSave = async () => {
      const currentTime = moment().format("hh:mm A");
      const payload = {
        rls_id: id14 || null,
        batchNo: selectedOrderValue,
        form_no: "PRD02/F-27",
        status: "Pending",
        details: qaReleaseData.map((item) => ({
          id: item.childId || null,
          date: item.signAndDate.date || currentDateQAman_QAdes,
          time: currentTime,
          name: item.signAndDate.qa || QAMAN_QADES_Username,
          sign: item.signAndDate.qa || QAMAN_QADES_Username,
          status_1: item.status,
          status_2: item.status,
        })),
      };

      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/spunlace/rp/summary/14.SaveQaRelease`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        message.success("QA Saved successfully");
        fetchQAReleaseDetails();
      } catch (error) {
        console.error("Error saving QA release data:", error);
        message.error("Failed to Save Form");
      }
    };

    return (
      <div>
        <Table
          dataSource={qaReleaseData}
          pagination={false}
          bordered
          showHeader={true}
          rowKey="key"
          style={{ marginTop: "20px" }}
        >
          <Column title="S No" dataIndex="key" key="key" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(text, record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Conditionally render Radio buttons based on Description */}
                {record.description === "If deviations are logged" ? (
                  <>
                    <Radio
                      disabled={disabled14}
                      checked={text === "closed"}
                      onChange={() => handleStatusChange(record.key, "closed")}
                    >
                      Closed
                    </Radio>
                    <Radio
                      disabled={disabled14}
                      checked={text === "NotClosed"}
                      onChange={() =>
                        handleStatusChange(record.key, "NotClosed")
                      }
                    >
                      Not Closed
                    </Radio>
                    <Radio
                      disabled={disabled14}
                      checked={text === "NA"}
                      onChange={() => handleStatusChange(record.key, "NA")}
                    >
                      NA
                    </Radio>
                  </>
                ) : (
                  <>
                    <Radio
                      disabled={disabled14}
                      checked={text === "Reviewed"}
                      onChange={() =>
                        handleStatusChange(record.key, "Reviewed")
                      }
                    >
                      Reviewed
                    </Radio>
                    <Radio
                      disabled={disabled14}
                      checked={text === "Not Reviewed"}
                      onChange={() =>
                        handleStatusChange(record.key, "Not Reviewed")
                      }
                    >
                      Not Reviewed
                    </Radio>
                    <Radio
                      disabled={disabled14}
                      checked={text === "NA"}
                      onChange={() => handleStatusChange(record.key, "NA")}
                    >
                      NA
                    </Radio>
                  </>
                )}
              </div>
            )}
          />
          <Column
            title="Sign and Date"
            dataIndex="signAndDate"
            key="signAndDate"
            render={(text, record) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Select
                  disabled={disabled14}
                  style={{ width: 150, marginRight: 8 }}
                  placeholder="Select QA"
                  value={record.signAndDate.qa || QAMAN_QADES_Username}
                  onChange={(value) =>
                    handleSignAndDateChange(record.key, "qa", value)
                  }
                >
                  {qaLov.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>

                <Input
                  style={{ width: "100%" }}
                  disabled={disabled14}
                  type="datetime-local"
                  value={
                    record.signAndDate.date
                      ? moment(record.signAndDate.date).format(
                          "YYYY-MM-DDTHH:mm"
                        )
                      : currentDateQAman_QAdes
                  }
                  onChange={(e) =>
                    handleSignAndDateChange(record.key, "date", e.target.value)
                  }
                />
              </div>
            )}
          />
        </Table>
        <div style={{ display: "flex" }}>
          <Button
            type="primary"
            onClick={handleSave}
            style={{
              marginTop: "20px",
              display: disabled14 ? "none" : "block",
            }}
          >
            Save
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              marginLeft: "8px",
              display: disabled14 ? "none" : "block",
            }}
          >
            Submit QA Release Data
          </Button>
        </div>
      </div>
    );
  };

  const [SupervisorStatus, setSupervisorStatus] = useState("");
  const [qaStatus, setQaStatus] = useState("");

  useEffect(() => {
    if (selectedOrderValue) {
      fetchManufactureStepsDetails();
    }
  }, [selectedOrderValue, token]);
  const fetchManufactureStepsDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/08.GetManufactureSteps`,
        {
          params: { batch_no: selectedOrderValue },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
      // const formattedTime = currentDate.toTimeString().split(" ")[0];
      if (data && data.length > 0) {
        setSwitchON(data[0].observation1);
        setBaleLength(data[0].observation2);
        setMaxiPressure2(data[0].observation4);
        setMaxiPressure(data[0].observation3);
        setCheckedbyDate08(data[0].checked_by_date);
        setDonebyDate08(data[0].done_by_date || formattedDate);
        setsignManifactureingSteps(
          data[0].done_by_sign || localStorage.getItem("username")
        );
        setsignManifactureingStepsQA(data[0].checked_by_sign);
        setId_18(data[0].mfs_id);
        setSupervisorStatus(data[0].supervisor_status);
        setQaStatus(data[0].qa_status);
      } else {
        setSwitchON("");
        setBaleLength("");
        setMaxiPressure2("");
        setMaxiPressure("");
        setCheckedbyDate08("");
        setDonebyDate08(formattedDate || "");
        setsignManifactureingSteps(localStorage.getItem("username") || "");
        setsignManifactureingStepsQA("");

        setSupervisorStatus("");
        setId_18("");
      }
    } catch (error) {
      console.error("Error fetching manufacture steps details:", error);
    }
  };

  // Handle save
  const handlemanufactureStepsSave = async () => {
    const payload = {
      mfs_id: id_18,
      batch_no: selectedOrderValue,
      order_no: orderNoSelect,
      form_no: "PRD02/F-27",
      observation1: SwitchON,
      observation2: BaleLength,
      observation3: MaxiPressure,
      observation4: MaxiPressure2,
      done_by_date: DonebyDate08,
      done_by_sign: signManifactureingSteps,
      checked_by_date: CheckedbyDate08,
      checked_by_sign: signManifactureingStepsQA,
    };

    try {
      await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/08.SaveManufactureSteps`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      // Handle success
      console.log("Data saved successfully!");
      message.success("Manufacturesteps saved successfully");
      fetchManufactureStepsDetails();
    } catch (error) {
      // Handle error
      console.error("Error saving data:", error);
      message.error("Failed to save Form");
    }
  };

  // Handle Submit
  const handlemanufactureStepsSubmit = async () => {
    const payload = {
      mfs_id: id_18,
      batch_no: selectedOrderValue,
      order_no: orderNoSelect,
      form_no: "PRD02/F-27",
      observation1: SwitchON,
      observation2: BaleLength,
      observation3: MaxiPressure,
      observation4: MaxiPressure2,
      done_by_date: DonebyDate08,
      done_by_sign: signManifactureingSteps,
      // done_by_name: 'John Doe',
      checked_by_date: CheckedbyDate08,
      // checked_by_sign: signManifactureingStepsQA,
      checked_by_sign: username,
      // checked_by_name: 'Jane Smith',
    };

    try {
      await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/08.SubmitManufactureSteps`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      // Handle success
      console.log("Data saved successfully!");
      message.success("Manufacturesteps submitted successfully");
      fetchManufactureStepsDetails();
    } catch (error) {
      // Handle error
      console.error("Error saving data:", error);
      message.error("Failed to save Form");
    }
  };

  const handleSignChange = (value) => {
    setsignManifactureingSteps(value);
  };
  const handleSignChangeQA = (value) => {
    setsignManifactureingStepsQA(value);
  };
  const disabled =
    (role == "ROLE_SUPERVISOR" && SupervisorStatus === "SUPERVISOR_APPROVED") ||
    role == "ROLE_QA" ||
    role == "ROLE_HOD" ||
    role == "ROLE_DESIGNEE";
  const disabledQa =
    (role == "ROLE_QA" && qaStatus == "QA_APPROVED") ||
    role == "ROLE_SUPERVISOR";
  const disabledSubmit =
    (role == "ROLE_QA" && qaStatus == "QA_APPROVED") ||
    role == "ROLE_HOD" ||
    role == "ROLE_DESIGNEE" ||
    (role == "ROLE_SUPERVISOR" && SupervisorStatus === "SUPERVISOR_APPROVED");
  const [SwitchON, setSwitchON] = useState("");
  const [BaleLength, setBaleLength] = useState("");
  const [MaxiPressure, setMaxiPressure] = useState("");
  const [MaxiPressure2, setMaxiPressure2] = useState("");
  const [DonebyDate08, setDonebyDate08] = useState("");
  const [CheckedbyDate08, setCheckedbyDate08] = useState("");
  const [id_18, setId_18] = useState("");
  const handle_SwitchON = () => {
    if (SwitchON < 50 || SwitchON > 100) {
      message.error("Please enter a number between 50 and 100");
      setSwitchON("");
    } else {
      setSwitchON(SwitchON);
    }
  };
  const handle_BaleLength = () => {
    if (BaleLength < 50 || BaleLength > 100) {
      message.error("Please enter a number between 50 and 100");
      setBaleLength("");
    }
  };
  const handle_MaxiPressure = () => {
    if (MaxiPressure < 50 || MaxiPressure > 200) {
      message.error("Please enter a number between 50 and 200");
      setMaxiPressure("");
    }
  };
  const handle_MaxiPressure2 = () => {
    if (MaxiPressure2 < 50 || MaxiPressure2 > 200) {
      message.error("Please enter a number between 50 and 200");
      setMaxiPressure2("");
    }
  };
  const handleDonebyDate08 = (event) => {
    const value = event.target.value;
    setDonebyDate08(value);
    console.log("date value", value);
  };
  const handleCheckedbyDate08 = (event) => {
    const value = event.target.value;
    setCheckedbyDate08(value);
    console.log("date value", value);
  };
  const handleSwitchONChange = (value) => {
    setSwitchON(value);
  };

  const [productionDetailsData, setProductionDetailsData] = useState([
    {
      key: "1",
      batchNo: "",
      batchQuantity: "",
      productDescription: "Reprocess Bales",
      typeOfMaterial: "",
      noOfBales: "",
      baleStartNo: "",
      baleEndNo: "",
      manufacturingStartDate: "",
      manufacturingStartTime: "",
      manufacturingCompletionDate: "",
      manufacturingCompletionTime: "",
    },
  ]);

  const handlestartdateOneChange = (event) => {
    const value = event.target.value;
    setStartDateOne(value);
    console.log("date value", value);
  };
  const handleEnddateOneChange = (event) => {
    const value = event.target.value;
    setendDateOne(value);
    console.log("date value", value);
  };
  const handlestartTimeOneChange = (event) => {
    const value = event.target.value;
    setStartTimeOne(value);
    console.log("date value", value);
  };
  const handleEndTimeOneChange = (event) => {
    const value = event.target.value;
    setEndTimeOne(value);
    console.log("date value", value);
  };

  const handleProductiondetailssave = async () => {
    const data = productionDetailsData[0];
    const payload = {
      prod_id: IdOne,
      batchNo: selectedOrderValue,
      order_no: orderNoSelect,
      order_no: orderNoSelect,
      form_no: "PRD02/F-27",
      start_date: startDateOne,
      start_time: startTimeOne,
      end_date: endDateOne,
      end_time: endTimeOne,
      issued_by: productionDetailsSign || usernameQA,
      issued_on: productionDetailsDate,
      received_by: productionDetailsSignSup || username,
      received_on: productionDetailsDateSup,
      poStatus: status || "",
    };

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/01.SaveProductionDetails`,
        payload,
        { headers }
      );
      console.log("Production details saved successfully!");
      message.success("Production details Saved successfully");
      setValidationResponse("success");
      fetchProductionDetails();
    } catch (error) {
      console.error("Error saving production details:", error);
      message.error("Failed to save Form");
    }
  };

  const [Poroductionsubmit, setProductionSubmit] = useState(false);
  const handleProductiondetailssubmit = async () => {
    const data = productionDetailsData[0];
    const payload = {
      prod_id: IdOne,
      batchNo: selectedOrderValue,
      order_no: orderNoSelect,
      form_no: "PRD02/F-27",
      start_date: startDateOne,
      start_time: startTimeOne,
      end_date: endDateOne,
      end_time: endTimeOne,
      issued_by: productionDetailsSign || usernameQA,
      issued_on: productionDetailsDate,
      received_by: productionDetailsSignSup || username,
      received_on: productionDetailsDateSup,
      poStatus: status,
    };

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.post(
        `${API.prodUrl}/Precot/api/spunlace/rp/summary/01.SubmitProductionDetails`,
        payload,
        { headers }
      );
      console.log("Production details saved successfully!");
      message.success("Production details Submitted successfully");
      fetchProductionDetails();
      setProductionSubmit(true);
      setValidationResponse("success");
    } catch (error) {
      console.error("Error submitting production details:", error);
      message.error("Failed to submit Form");
    }
  };

  const ProductionDetails = () => (
    <table style={{ width: "100%" }}>
      <tr>
        <th colSpan="100" style={{ textAlign: "left", height: "50px" }}>
          BATCH NO: {selectedOrderValue}
        </th>
      </tr>
      <tr>
        <th colspan="25" style={{ height: "30px" }}>
          {" "}
          Batch Quantity in Kgs:
        </th>
        <td colspan="25">
          {productionDetails?.bmr01rp01productiondetailsSap?.[0]
            ?.Batch_Quantity ??
            batchqty ??
            "N/A"}
        </td>
        <th colspan="25"> Product Description:</th>
        <td colspan="25"> Reprocess Bales</td>
      </tr>
      <tr>
        <th colspan="25" style={{ height: "30px" }}>
          {" "}
          Type of Material:
        </th>
        <td colspan="25">
          {productionDetails?.bmr01rp01productiondetailsSap?.[0]
            ?.Type_of_Material ??
            typematerial ??
            "N/A"}
        </td>
        <th colspan="25"> No. of Bales:</th>
        <td colspan="25">
          {productionDetails?.bmr01rp01productiondetailsSap?.[0]?.No_of_Bales ??
            noofbales ??
            "N/A"}
        </td>
      </tr>

      <tr>
        <th colSpan="25" style={{ height: "20px" }}>
          Po Status:
        </th>
        <td colspan="25">
          <input
            type="radio"
            id="open"
            name="status"
            value="Open"
            checked={status === "Open"}
            onChange={handleradioChange}
          />
          <label htmlFor="open">Open</label>

          <input
            type="radio"
            id="close"
            name="status"
            value="Close"
            checked={status === "Close"}
            onChange={handleradioChange}
          />
          <label htmlFor="close">Close</label>
        </td>
        <th colSpan="25">Select Order No:</th>
        <th colSpan="25">
          <Select
            showSearch
            value={orderNoSelect}
            onChange={(e) => handleOrderNochange(e)}
            style={{ width: "100%" }}
            placeholder="Select Order Number"
          >
            <Select.Option value="" disabled selected>
              Select Order Number
            </Select.Option>
            {options.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </th>
      </tr>
      <tr>
        <th colSpan="50" style={{ height: "30px" }}>
          Manufacturing start date
        </th>
        <th colSpan="50">Manufacturing completion date</th>
      </tr>
      <tr>
        <td
          colspan="50"
          style={{ fontSize: "16px", padding: "8px", height: "30px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "48%" }}
            >
              <div>Date:</div>
              <Input
                type="date"
                value={startDateOne}
                onChange={(event) => handlestartdateOneChange(event)}
                // disabled={disabled01}
                disabled={
                  role === "ROLE_HOD" || role === "ROLE_QA" || Poroductionsubmit
                }
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "48%" }}
            >
              <div>Time:</div>
              <Input
                type="time"
                value={startTimeOne}
                onChange={(event) => handlestartTimeOneChange(event)}
                // disabled={disabled01}
                disabled={
                  role === "ROLE_HOD" || role === "ROLE_QA" || Poroductionsubmit
                }
              />
            </div>
          </div>
        </td>
        <td colspan="50">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "48%" }}
            >
              <div>Date:</div>
              <Input
                type="date"
                value={endDateOne}
                onChange={(event) => handleEnddateOneChange(event)}
                disabled={
                  role === "ROLE_HOD" || role === "ROLE_QA" || Poroductionsubmit
                }
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "48%" }}
            >
              <div>Time:</div>
              <Input
                type="time"
                value={endTimeOne}
                onChange={(event) => handleEndTimeOneChange(event)}
                disabled={
                  role === "ROLE_HOD" || role === "ROLE_QA" || Poroductionsubmit
                }
              />
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th colspan="25" style={{ height: "30px" }}>
          {" "}
          Bale Start No:
        </th>
        <td colspan="25">
          {/* {productionDetails?.bmr01rp01productiondetailsSap[0]?.Bale_Start_No ||
            "N/A"} */}
          <Select
            options={optionss}
            value={selectedOption}
            onChange={handleChange}
            placeholder="Select a Bale Number"
            isClearable
          />
        </td>
        <th colspan="25"> Bale End No:</th>
        <td colspan="25">
          {/* {productionDetails?.bmr01rp01productiondetailsSap[0]?.Bale_End_No ||
            "N/A"} */}
          <Select
            options={optionss}
            value={selectedOptions}
            onChange={handleendChange}
            placeholder="Select a Bale Number"
            isClearable
          />
        </td>
      </tr>
      <tr>
        <th colSpan="100" style={{ textAlign: "center", height: "50px" }}>
          PRODUCTION BATCH RECORD ISSUANCE DETAILS
        </th>
      </tr>
      <tr>
        <td colSpan="50">
          Issued by: Quality Assurance has reviewed the Batch Record to ensure
          that the copy is a complete, accurate copy of the Master Batch Record.
        </td>
        <td colSpan="50">
          Received by: Production has reviewed the Batch Record to ensure that
          the copy is complete and correct. Production is responsible for the
          Batch Record, following the issuance.
        </td>
      </tr>
      <tr>
        <td colSpan="20">Issued by (QA)</td>
        <td colSpan="30">
          <Select
            value={productionDetailsSign || selectedValues}
            onChange={handleProductionDetailsSign}
            options={userLov}
            style={{ width: "100%" }}
            disabled={
              role === "ROLE_HOD" ||
              role === "ROLE_SUPERVISOR" ||
              Poroductionsubmit
            }
          />{" "}
          <Input
            type="date"
            value={productionDetailsDate || currentDateQA}
            onChange={(event) => handleProductionDetailsDate(event)}
            disabled={
              role === "ROLE_HOD" ||
              role === "ROLE_SUPERVISOR" ||
              Poroductionsubmit
            }
          />
        </td>{" "}
        <td colSpan="20">Received by (Production)</td>
        <td colSpan="30">
          <Select
            value={productionDetailsSignSup || selectedValue}
            onChange={handleProductionDetailsSignSup}
            options={SupervisorLov}
            style={{ width: "100%" }}
            disabled={
              role === "ROLE_HOD" || role === "ROLE_QA" || Poroductionsubmit
            }
          />{" "}
          <Input
            type="date"
            value={productionDetailsDateSup || currentDate}
            onChange={(event) => handleProductionDetailsDateSup(event)}
            disabled={
              role === "ROLE_HOD" || role === "ROLE_QA" || Poroductionsubmit
            }
          />
        </td>
      </tr>
    </table>
  );
  //[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  //  :)
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderValuePrint, setSelectedOrderValuePrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };
  const handleModalClose = () => {
    setSelectedOrderValuePrint("");
    setShowModal(false);
  };
  const printSubmit = () => {
    if (selectedOrderValuePrint == "" || selectedOrderValuePrint == null) {
      message.warning("Please Select Order Number");
      return;
    }
    window.print();
    handleModalClose();
  };

  const fetchPrintValue = (value) => {
    try {
      setSelectedOrderValuePrint(value);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/rp/summary/GetRpbPrint?batch_no=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.message !== "No data") {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
            console.log("print response...............", res.data);
            console.log("set print response", printResponseData);
          } else {
            message.error(res.data.message);
            handleModalClose();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };

  return (
    <div style={{ padding: "24px" }}>
      <BleachingHeader
        unit="Unit-H"
        formName="Batch Manufacturing Record"
        formatNo="PRD02/F-27"
        buttonsArray={[
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
            shape="round"
          >
            Print
          </Button>,

          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
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
      <div
        style={{
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: "10px" }}>
          {" "}
          <Input
            addonBefore="Department Name:"
            value="Spunlace"
            // disabled
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          {" "}
          <Input
            addonBefore="BMR No. / Rev. No.:"
            value="SL-RP-002 / 01"
            // disabled
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          {" "}
          <Input
            addonBefore="Product Name:"
            value="RP Cotton"
            // disabled
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          {" "}
          <Input
            addonBefore="Effective Date:"
            value=" 01/04/2024"
            // disabled
          />
        </div>
      </div>
      <div style={{ display: "flex", width: 300 }}>
        <span style={{ width: "35%" }}>Bacth No:</span>

        <Select
          showSearch
          value={selectedOrderValue}
          onChange={handleOrderChange}
          style={{ width: "100%", marginLeft: "5px" }}
          placeholder="Select Batch Number"
        >
          <Select.Option value="" disabled selected>
            Select Batch Number
          </Select.Option>
          {batchNo.map((option) => (
            <Select.Option key={option.id} value={option.value}>
              {option.value}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        <TabPane tab="PRODUCTION DETAILS" key="1">
          <ProductionDetails />
          <div style={{ display: "flex" }}>
            <Button
              type="primary"
              onClick={handleProductiondetailssave}
              style={{
                marginTop: "16px",
                display: disabled01 ? "none" : "block",
              }}
            >
              Save
            </Button>
            <Button
              type="primary"
              onClick={handleProductiondetailssubmit}
              style={{
                marginTop: "16px",
                marginLeft: "15px",
                display: disabledSubmit01 ? "none" : "block",
              }}
            >
              Submit
            </Button>{" "}
          </div>
        </TabPane>
        <TabPane tab="INPUT DETAILS (in Kg):" key="2">
          <div>
            {inputDetailsofKg.map((detail, index) => (
              <div key={index}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        REJECTED ROLLS
                      </th>
                      <th
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        EDGE TRIM WASTE
                      </th>
                      <th
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        SKELETON WASTE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        <input
                          className="inp-new"
                          type="number"
                          name="rejected_rolls"
                          value={detail.rejected_rolls}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="Rejected Rolls"
                          disabled={inputdetailsBtn || loggedInHod}
                        />
                      </td>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        <input
                          className="inp-new"
                          type="number"
                          name="edge_trim_waste"
                          value={detail.edge_trim_waste}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="Edge Trim Waste"
                          disabled={inputdetailsBtn || loggedInHod}
                        />
                      </td>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        <input
                          className="inp-new"
                          type="number"
                          name="skleten_waste"
                          value={detail.skleten_waste}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="Skeleton Waste"
                          disabled={inputdetailsBtn || loggedInHod}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
            <div style={{ display: "flex" }}>
              <Button
                type="primary"
                onClick={handleInputDetailsSave}
                style={{
                  marginTop: "3px",
                  marginLeft: "10px",
                  display: inputdetailsBtn || loggedInHod ? "none" : "block",
                }}
              >
                Save
              </Button>
              <Button
                type="primary"
                onClick={handleInputDetailsSubmit}
                style={{
                  marginTop: "3px",
                  marginLeft: "10px",
                  display: inputdetailsBtn || loggedInHod ? "none" : "block",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="PACKING MATERIAL DETAILS" key="3">
          <Table
            dataSource={packingmaterialdata}
            // columns={columns}
            columns={columns.map((col) => ({
              ...col,
              onCell: () => ({
                disabled: isPackingMaterialDisabled, // Disable fields based on state
              }),
            }))}
            pagination={false}
            rowKey="key"
          />
          <div style={{ display: "flex" }}>
            <Button
              type="primary"
              onClick={handlePackingmaterialSave}
              style={{
                marginTop: "16px",
                display:
                  isPackingSaveDisabled || loggedInHod ? "none" : "block",
              }}
            >
              Submit
            </Button>
          </div>
        </TabPane>
        <TabPane tab="REFERENCE DOCUMENTS" key="4">
          <Table
            dataSource={referenceDocumentData}
            columns={referenceDocumentColumns}
            pagination={false}
          />
        </TabPane>
        <TabPane tab="PROCESSING EQUIPMENT’S" key="5">
          <Table
            columns={processingEquipmentsColumns}
            dataSource={processingEquipmentsData}
            pagination={false}
            bordered
            style={{ marginTop: "20px" }}
            rowKey="key"
          />
          <div style={{ display: "flex" }}>
            <Button
              type="primary"
              onClick={handleSaveProcessingEquipments}
              style={{
                marginTop: "16px",
                display: disabled06 ? "none" : "block",
              }}
            >
              Save
            </Button>
            <Button
              type="primary"
              onClick={handleSubmitProcessingEquipments}
              style={{
                marginTop: "16px",
                marginLeft: "15px",
                display: disabledSubmit06 ? "none" : "block",
              }}
              disabled={isSubmitted}
            >
              Submit
            </Button>
          </div>
        </TabPane>
        <TabPane tab="VERIFICATION OF RECORDS" key="6">
          <VerificationOfRecords />
        </TabPane>
        <TabPane tab="MANUFACTURING STEPS" key="7">
          {/* <ManufacturingSteps /> */}
          <div>
            <table>
              <tr>
                <th style={{ height: "35px" }}>Step. No.</th>
                <th>Operation</th>
                <th>STD</th>
                <th>Observation</th>
                <th>Done by (Sign/Date)</th>
                {role == "ROLE_QA" ? <th>Checked by (Sign/Date)</th> : ""}
              </tr>
              <tr>
                <td rowSpan="4" style={{ height: "23px", textAlign: "center" }}>
                  1
                </td>
                <td style={{ height: "23px" }}>
                  {" "}
                  Switch ON all the machines & Sub machines:
                </td>
                <td>50cm to 100cm</td>
                <td>
                  <input
                    className="inp-new"
                    value={SwitchON}
                    onChange={(e) => handleSwitchONChange(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    disabled={disabled}
                    type="number"
                    onBlur={handle_SwitchON}
                  />
                </td>
                <td rowSpan="4">
                  <Select
                    value={selectedValue || signManifactureingSteps}
                    onChange={handleSignChange}
                    options={SupervisorLov}
                    style={{ width: "100%" }}
                    disabled={disabled}
                  />

                  <br />
                  <Input
                    type="date"
                    value={DonebyDate08 || currentDate}
                    onChange={(event) => handleDonebyDate08(event)}
                    disabled={disabled}
                  />
                </td>
                {role == "ROLE_QA" ? (
                  <td rowSpan="4">
                    <Select
                      value={selectedValues || signManifactureingStepsQA}
                      onChange={handleSignChangeQA}
                      options={userLov}
                      style={{ width: "100%" }}
                      disabled={disabledQa}
                    />{" "}
                    <Input
                      type="date"
                      value={CheckedbyDate08 || currentDateQA}
                      onChange={(event) => handleCheckedbyDate08(event)}
                      disabled={disabledQa}
                    />
                  </td>
                ) : (
                  ""
                )}
              </tr>
              <tr>
                <td style={{ height: "23px" }}>
                  {" "}
                  Length of bale: Std 50 to 100 cm
                </td>
                <td>50 cm to 100cm </td>
                <td>
                  <input
                    className="inp-new"
                    value={BaleLength}
                    onChange={(e) => setBaleLength(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    disabled={disabled}
                    onBlur={handle_BaleLength}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ height: "23px" }}>
                  Maxi pressure press plate: Std 50 to 200 Bar
                </td>
                <td>50 to 200 Bar</td>
                <td>
                  <input
                    className="inp-new"
                    value={MaxiPressure}
                    onChange={(e) => setMaxiPressure(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    disabled={disabled}
                    onBlur={handle_MaxiPressure}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ height: "23px" }}>
                  Maxi pressure compensator: Std 50 to 200 Bar
                </td>
                <td>50 to 200 Bar</td>
                <td>
                  <input
                    className="inp-new"
                    value={MaxiPressure2}
                    onChange={(e) => setMaxiPressure2(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    disabled={disabled}
                    onBlur={handle_MaxiPressure2}
                  />
                </td>
              </tr>
            </table>
            <div style={{ display: "flex" }}>
              <Button
                type="primary"
                onClick={handlemanufactureStepsSave}
                style={{
                  marginTop: "16px",
                  display: disabled ? "none" : "block",
                }}
              >
                Save
              </Button>
              <Button
                type="primary"
                onClick={handlemanufactureStepsSubmit}
                style={{
                  marginTop: "16px",
                  marginLeft: "10px",
                  display: disabledSubmit ? "none" : "block",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="PRODUCT RECONCILIATION" key="8">
          <Table
            dataSource={productReconciliationdata}
            columns={productReconciliationColumns}
            pagination={false}
          />
          <Button
            type="primary"
            onClick={handleProductSave}
            style={{
              marginTop: "16px",
              marginLeft: "0",
              display: disabled09 ? "none" : "block",
            }}
          >
            Submit
          </Button>
        </TabPane>

        <>
          <TabPane tab="PROCESS DEVIATION RECORD" key="9">
            <div>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "1em",
                        textAlign: "left",
                      }}
                    >
                      Step No.
                    </th>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "1em",
                        textAlign: "left",
                      }}
                    >
                      Deviation
                    </th>
                    {/* <th style={{ border: '1px solid #ccc', padding: '1em', textAlign: 'left' }}>
              Signature
            </th> */}
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "1em",
                        textAlign: "left",
                      }}
                    >
                      Signature
                    </th>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "1em",
                        textAlign: "left",
                      }}
                    >
                      QA Remarks
                    </th>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "1em",
                        textAlign: "left",
                      }}
                    >
                      Signature/Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {processdeviationdata.map((item) => (
                    <tr key={item.key}>
                      <td style={{ border: "1px solid #ccc", padding: "1em" }}>
                        {/* <Input
                  value={item.stepNo}
                  onChange={(e) => handleprocessdeviationChange(e.target.value, item.key, 'stepNo')}
                /> */}
                        1
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "1em" }}>
                        <Input
                          value={item.deviation}
                          // disabled={disabled10Sup}
                          disabled={
                            role === "ROLE_HOD" ||
                            role === "ROLE_SUPERVISOR" ||
                            isprocessdeviation
                          }
                          onChange={(e) =>
                            handleprocessdeviationChange(
                              e.target.value,
                              item.key,
                              "deviation"
                            )
                          }
                        />
                      </td>

                      <td style={{ border: "1px solid #ccc", padding: "1em" }}>
                        <Select
                          style={{ width: "100%" }}
                          placeholder="Choose Signature"
                          options={userLov}
                          value={item.supervisorSignature || selectedValues}
                          disabled={
                            role === "ROLE_HOD" ||
                            role === "ROLE_SUPERVISOR" ||
                            isprocessdeviation
                          }
                          onChange={(value) =>
                            handleprocessdeviationChange(
                              value,
                              item.key,
                              "supervisorSignature"
                            )
                          }
                        />
                        <br />
                        <Input
                          style={{ width: "100%" }}
                          type="datetime-local"
                          value={item.supervisorDate || currentDateTimeQA}
                          disabled={
                            role === "ROLE_HOD" ||
                            role === "ROLE_SUPERVISOR" ||
                            isprocessdeviation
                          }
                          onChange={(e) =>
                            handleprocessdeviationChange(
                              e.target.value,
                              item.key,
                              "supervisorDate"
                            )
                          }
                        />
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "1em" }}>
                        {/* <Input
                type="text"
                      className="inp-new"
                  value={item.qaRemarks}
                  // value={processdeviationdata.qaRemarks}
                  onChange={(e) =>
                    handleprocessdeviationChange(e.target.value, item.key, 'qaRemarks')
                  }
                /> */}
                        <Input.TextArea
                          value={item.qaRemarks}
                          disabled={
                            role === "ROLE_HOD" ||
                            role === "ROLE_SUPERVISOR" ||
                            isprocessdeviation
                          }
                          onChange={(e) =>
                            handleprocessdeviationChange(
                              e.target.value,
                              item.key,
                              "qaRemarks"
                            )
                          }
                          rows={4}
                          placeholder="Type your remarks here"
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "1em" }}>
                        <Select
                          style={{ width: "100%" }}
                          placeholder="Choose Signature"
                          options={SupervisorLov}
                          value={item.signature || selectedValue}
                          disabled={
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA" ||
                            isprocessdeviation
                          }
                          onChange={(value) =>
                            handleprocessdeviationChange(
                              value,
                              item.key,
                              "signature"
                            )
                          }
                        />
                        <br />
                        <Input
                          style={{ width: "100%" }}
                          type="datetime-local"
                          value={item.signatureDate || currentDateTime}
                          disabled={
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA" ||
                            isprocessdeviation
                          }
                          onChange={(e) =>
                            handleprocessdeviationChange(
                              e.target.value,
                              item.key,
                              "signatureDate"
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex" }}>
                <Button
                  type="primary"
                  onClick={handleProcessdeviationSave}
                  disabled={disabled10Sup}
                  style={{ marginTop: "16px", marginLeft: "0" }}
                >
                  save
                </Button>
                <Button
                  type="primary"
                  onClick={handleProcessdeviationSubmit}
                  disabled={disabled10Submit}
                  style={{ marginTop: "16px", marginLeft: "10px" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </TabPane>
        </>

        <TabPane tab="PROCESS DELAY/EQUIPMENT BREAK DOWN RECORD" key="10">
          <div>
            <Row>
              {stoppageDetailsStatus == true ? (
                <>
                  <table style={{ padding: "100px", width: "100%" }}>
                    <thead>
                      <tr>
                        <th colSpan="7">
                          PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD
                        </th>
                      </tr>
                      <tr>
                        <th colSpan="1" rowSpan="2">
                          S.No
                        </th>
                        <th colSpan="1" rowSpan="2">
                          Date
                        </th>
                        <th colSpan="3">Process Delay / Down Time</th>
                        <th colSpan="1" rowSpan="2">
                          Remarks
                        </th>
                        <th colSpan="1" rowSpan="2">
                          Sign and Date
                        </th>
                      </tr>
                      <tr>
                        <th colSpan="1">From (hours: Minutes)</th>
                        <th colSpan="1">To (hours: Minutes)</th>
                        <th colSpan="1">Total (hours: Minutes)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {delayEquipmentBreakdownRecordDetails?.stoppageMapList?.map(
                        (slice, index) => (
                          <tr key={index}>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {moment(slice.PackDate).format("DD/MM/YYYY")}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {slice.fromTime}
                            </td>
                            <td
                              style={{
                                padding: "0.4em",
                                teslicetAlign: "center",
                              }}
                            >
                              {slice.toTime}
                            </td>
                            <td
                              style={{
                                padding: "0.4em",
                                teslicetAlign: "center",
                              }}
                            >
                              {slice.totalHours}
                            </td>
                            <td
                              style={{
                                padding: "0.4em",
                                teslicetAlign: "center",
                              }}
                            >
                              {slice.remarks}
                            </td>
                            <td
                              style={{
                                padding: "0.4em",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Select
                                style={{ width: "12em" }}
                                options={userLov}
                                onChange={(value) =>
                                  handleNameChange(index, value)
                                }
                                value={delayProdNames[index]}
                              />
                              <input
                                type="datetime-local"
                                onChange={(e) =>
                                  handleDate11Change(index, e.target.value)
                                }
                                value={delayProdDates[index]}
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5em",
                      alignItems: "center",
                    }}
                  ></div>
                  <table style={{ padding: "100px", width: "100%" }}>
                    <thead>
                      <tr>
                        <th colSpan="8">
                          PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD
                        </th>{" "}
                        {/* Updated colSpan */}
                      </tr>
                      <tr>
                        <th colSpan="1" rowSpan="2"></th>{" "}
                        {/* Checkbox column */}
                        <th colSpan="1" rowSpan="2">
                          S.No
                        </th>
                        <th colSpan="1" rowSpan="2">
                          Date
                        </th>
                        <th colSpan="3">Process Delay / Down Time</th>
                        <th colSpan="1" rowSpan="2">
                          Remarks
                        </th>
                        <th colSpan="1" rowSpan="2">
                          Sign and Date
                        </th>
                      </tr>
                      <tr>
                        <th colSpan="1">From (hours: Minutes)</th>
                        <th colSpan="1">To (hours: Minutes)</th>
                        <th colSpan="1">Total (hours: Minutes)</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {processDelayData && processDelayData.length > 0 ? (
                        processDelayData.map((x, i) => (
                          <tr key={x.key || i}>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(x.key)}
                                onChange={() => handleCheckboxChange(x.key)}
                                disabled={Isdelay}
                              />
                            </td>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>{i + 1}</td>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>
                              {moment(x.date).format('DD/MM/YYYY')}
                            </td>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>{x.from}</td>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>{x.to}</td>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>{x.total}</td>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>{x.remarks}</td>
                            <td style={{ padding: '0.4em', textAlign: 'center' }}>
                 

                              <Select
                                options={SupervisorLov || []} 
                                value={x.prodSign || null} 
                                onChange={(value) => handledelaySignChange(value, x.key)} 
                                placeholder="Select Supervisor"
                                disabled={
                                  !selectedRows.includes(x.key) || role === 'ROLE_HOD' || Isdelay
                                }
                                style={{ width: '100%' }}
                              />

                              <input
                                type="date"
                                value={x.prodDate ? moment(x.prodDate).format('YYYY-MM-DD') : ''}
                                disabled={
                                  !selectedRows.includes(x.key) || role === 'ROLE_HOD' || Isdelay
                                } 
                                onChange={(e) => handledelayDateChange(e, x.key)} 
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" style={{ textAlign: 'center', padding: '1em' }}>
                            No data available.
                          </td>
                        </tr>
                      )}
                    </tbody> */}
                    <tbody>
                      {(submittedData || processDelayData).length > 0 ? (
                        (submittedData || processDelayData).map((x, i) => (
                          <tr key={x.key || i}>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(x.key)}
                                onChange={() => handleCheckboxChange(x.key)}
                                disabled={Isdelay || Boolean(submittedData)} // Disable if submitted
                              />
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {i + 1}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {moment(x.date).format("DD/MM/YYYY")}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {x.from}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {x.to}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {x.total}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              {x.remarks}
                            </td>
                            <td
                              style={{ padding: "0.4em", textAlign: "center" }}
                            >
                              <Select
                                options={SupervisorLov || []}
                                value={x.prodSign || null}
                                onChange={(value) =>
                                  handledelaySignChange(value, x.key)
                                }
                                placeholder="Select Supervisor"
                                disabled={
                                  !selectedRows.includes(x.key) ||
                                  role === "ROLE_HOD" ||
                                  Isdelay ||
                                  Boolean(submittedData)
                                }
                                style={{ width: "100%" }}
                              />
                              <input
                                type="date"
                                value={
                                  x.prodDate
                                    ? moment(x.prodDate).format("YYYY-MM-DD")
                                    : ""
                                }
                                disabled={
                                  !selectedRows.includes(x.key) ||
                                  role === "ROLE_HOD" ||
                                  Isdelay ||
                                  Boolean(submittedData)
                                }
                                onChange={(e) =>
                                  handledelayDateChange(e, x.key)
                                }
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            style={{ textAlign: "center", padding: "1em" }}
                          >
                            No data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div style={{ display: "flex" }}>
                    <Button
                      type="primary"
                      onClick={handledelayequipment}
                      style={{
                        marginTop: "16px",
                        display: disabled11 ? "none" : "block",
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      type="primary"
                      onClick={handledelayequipmentSubmit}
                      style={{
                        marginTop: "16px",
                        marginLeft: "8px",
                        display: disabled11 ? "none" : "block",
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </Row>
          </div>
        </TabPane>
        <TabPane tab="LIST OF ENCLOSURES" key="11">
          <div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Sl. No.
                  </th>
                  <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Title
                  </th>
                  <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {listOfEnclosuresData.map((item) => (
                  <tr key={item.key}>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {item.slNo}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      <Input
                        type="date"
                        value={item.date || currentDate || currentDateQA}
                        disabled={loEnclose.hide || loggedInHod}
                        onChange={(e) =>
                          handleEnclosureChange(item.key, "date", e)
                        }
                      />
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      <Input
                        value={item.title || ""}
                        style={{ textAlign: "center" }}
                        disabled={loEnclose.hide || loggedInHod}
                        onChange={(e) =>
                          handleEnclosureChange(item.key, "title", e)
                        }
                      />
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      <Input
                        value={item.remarks || ""}
                        style={{ textAlign: "center" }}
                        disabled={loEnclose.hide || loggedInHod}
                        onChange={(e) =>
                          handleEnclosureChange(item.key, "remarks", e)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex" }}>
              <Button
                type="primary"
                onClick={handleEnclosureSave}
                style={{
                  marginTop: "10px",
                  display: loEnclose.hide || loggedInHod ? "none" : "block",
                }}
                loading={loEnclose.load}
              >
                Save
              </Button>
              <Button
                type="primary"
                onClick={handleEnclosureSubmit}
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  display: loEnclose.hide || loggedInHod ? "none" : "block",
                }}
                loading={loEnclose.load}
              >
                Submit
              </Button>
            </div>
          </div>
        </TabPane>
        {role !== "ROLE_QA" ? (
          <TabPane tab="POST-PRODUCTION REVIEW" key="12">
            <PostProductionReview />
          </TabPane>
        ) : null}

        {role == "QA_MANAGER" || role == "QA_DESIGNEE" ? (
          <>
            <TabPane tab="QA RELEASE" key="13">
              <QARelase />
            </TabPane>
          </>
        ) : null}
        {role == "ROLE_QA" ? (
          <>
            <TabPane tab="PRODUCT RELEASE" key="14">
              <div>
                Material produced through the execution of this Batch Record
                shall be archival by QA according to Product Release Procedure
                (SOP-QAD01-D-61) and documented as per the Format: QAD01/F-34
              </div>
              <Table
                dataSource={productReleaseData}
                columns={productReleaseColumns}
                pagination={false}
              />

              <Button
                type="primary"
                onClick={handleProductRelease}
                disabled={isSaveDisabled}
                style={{
                  marginTop: "16px",
                  display: isSaveDisabled ? "none" : "block",
                }}
              >
                Submit
              </Button>
            </TabPane>
          </>
        ) : null}
      </Tabs>

      {/* Section Print Start */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print table th,
  #section-to-print table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
      }
    `}
        </style>
        <table style={{ borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="8"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="8"></td>
            </tr>
            <tr>
              <td colSpan="1" rowspan="4 " style={{ textAlign: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <br></br>
                UNIT H
              </td>
              <th
                colSpan="5"
                rowSpan="4"
                style={{ textAlign: "center", height: "100px" }}
              >
                Batch Manufacturing Record
              </th>
              <td colSpan="1">Format No:</td>
              <td colSpan="2">PH-PRD02/F-001</td>
            </tr>
            <tr>
              <td colSpan="1">Revision No:</td>
              <td colSpan="2">01</td>
            </tr>
            <td colSpan="1">Ref. SOP No:</td>
            <td colSpan="2">PH-PRD02-D-03</td>
            <tr>
              <td colSpan="1">Page No:</td>
              <td colSpan="2">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="8"></td>
            </tr>
            <br />
            <tr>
              <th colSpan="2" style={{ height: "20px" }}>
                Department Name
              </th>
              <th colSpan="2">Spunlace</th>
              <th colSpan="2">BMR No. / Rev. No.</th>
              <th colSpan="2">SL-RP-002 / 01</th>
            </tr>
            <tr>
              <th colSpan="2" style={{ height: "20px" }}>
                Product Name
              </th>
              <th colSpan="2">RP Cotton</th>
              <th colSpan="2">Effective Date.</th>
              <th colSpan="2">01/04/2024</th>
            </tr>
          </thead>
          <br />
          <br />
          <tr>
            {" "}
            <th colSpan="8" style={{ height: "20px" }}>
              1.0 PRODUCTION DETAILS{" "}
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ height: "20px" }}>
              BATCH NO:{selectedOrderValuePrint}
            </th>
          </tr>
          <tr>
            <th colSpan="2" style={{ height: "20px" }}>
              Batch Quantity in Kgs:
            </th>
            <th colSpan="2" style={{ height: "20px" }}>
              {printResponseData?.rpb01productiondetailsSap[0].Batch_Quantity ||
                "NA"}
            </th>
            <th colSpan="2" style={{ height: "20px" }}>
              Product Description:
            </th>
            <th colSpan="2" style={{ height: "20px" }}>
              {printResponseData?.rpb01productiondetailsSap[0]
                .Product_Description || "NA"}
            </th>
          </tr>
          <tr>
            <th colSpan="2" style={{ height: "20px" }}>
              Type of Material:
            </th>
            <th colSpan="2">
              {printResponseData?.rpb01productiondetailsSap[0]
                .Type_of_Material || "NA"}{" "}
            </th>
            <th colSpan="2">No. of Bales:</th>
            <th colSpan="2">
              {printResponseData?.rpb01productiondetailsSap[0].No_of_Bales ||
                "NA"}
            </th>
          </tr>
          <tr>
            <th colSpan="2" style={{ height: "20px" }}>
              Bale Start No:
            </th>
            <th colSpan="2">
              {printResponseData?.rpb01productiondetailsSap[0].Bale_Start_No ||
                "NA"}
            </th>
            <th colSpan="2">Bale End No:</th>
            <th colSpan="2">
              {printResponseData?.rpb01productiondetailsSap[0].Bale_End_No ||
                "NA"}
            </th>
          </tr>
          <tr>
            <th colSpan="2" style={{ height: "20px" }}>
              Po Status:
            </th>
            <th colSpan="2">
              {printResponseData?.rpb01productiondetailsSap[0].po_status ||
                "NA"}
            </th>
            <th colSpan="2">Order No:</th>
            <th colSpan="2">
              {printResponseData?.rpb01productiondetailsSap[0].order_no || "NA"}
            </th>
          </tr>
          <tr>
            <th colSpan="4" style={{ height: "20px" }}>
              Manufacturing start date
            </th>
            <th colSpan="4">Manufacturing completion date</th>
          </tr>
          <tr>
            <th colSpan="1" style={{ height: "40px", textAlign: "center" }}>
              Date:
            </th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb01productiondetails?.[0]?.start_date
              )}
            </th>
            <th colSpan="1">Time</th>
            <th colSpan="1">
              {printResponseData?.rpb01productiondetails?.[0]?.start_time}
            </th>
            <th colSpan="1">Date:</th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb01productiondetails?.[0]?.end_date
              )}{" "}
            </th>
            <th colSpan="1">Time</th>
            <th colSpan="1">
              {printResponseData?.rpb01productiondetails?.[0]?.end_time}
            </th>
          </tr>
          <br />
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr>
            {" "}
            <th colSpan="8">PRODUCTION BATCH RECORD ISSUANCE DETAILS </th>
          </tr>
          <tr>
            <th colSpan="4" style={{ height: "50px", verticalAlign: "top" }}>
              Issued by: Quality Assurance has reviewed the Batch Record to
              ensure that the copy is a complete, accurate copy of the Master
              Batch Record.
            </th>
            <th colSpan="4" style={{ height: "50px", verticalAlign: "top" }}>
              Received by: Production has reviewed the Batch Record to ensure
              that the copy is complete and correct. Production is responsible
              for the Batch Record, following the issuance.
            </th>
          </tr>
          <tr>
            <th colSpan="4" style={{ height: "100px", textAlign: "center" }}>
              <div style={{ verticalAlign: "top" }}>Issued by (QA)</div> <br />
              {printResponseData?.rpb01productiondetails?.[0]?.issued_by} <br />
              {formattedDate(
                printResponseData?.rpb01productiondetails?.[0]?.issued_on
              )}
              <br />
              <br />
              <br />
              Sign & Date
            </th>
            <th
              colSpan="4"
              style={{
                height: "100px",
                verticalAlign: "top",
                textAlign: "center",
              }}
            >
              <div style={{ verticalAlign: "top" }}>
                {" "}
                Received by (Production){" "}
              </div>
              <br />
              {printResponseData?.rpb01productiondetails?.[0]?.received_by}
              <br />
              {formattedDate(
                printResponseData?.rpb01productiondetails?.[0]?.received_on
              )}
              <br />
              <br />
              <br />
              Sign & Date
            </th>
          </tr>
          <br />
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              Instructions while filling in BMR:
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              1. Record all data in blue ink.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              2. Record time as HR:MM in 24 hours format.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              3. Record date in DD/MM/YYYY or DD/MM/YY format.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              4. Do not leave any blank space. If there is any blank space, NA
              should be written, and the line should be marked as "Z" Shape with
              sign and date.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              5. Blue ink should be used by QA for review.
            </th>
          </tr>
          {/* <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr>
          <tr style={{ border: 'none' }}>
            <td style={{ border: 'none' }} colSpan="8"></td>
          </tr> */}
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              6. Immediately do the entry in BMR, along with the completion of
              activity. The time entered should be considered as completion time
              of the activity.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              7. Time of starting the batch shall be considered as start time
              and end of the completion of activity from the equipment should be
              considered as completion time of batch.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              8. Whenever any Deviation occurs, raise the deviation,
              investigation of deviation shall be performed & enter the
              deviation in the BMR.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              9. Note: Tick mark "√" indicates activity selected /completed &
              Cross mark '"×" indicate not selected/ not completed.
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              Safety Instructions:
            </th>
          </tr>
          <tr>
            <th colSpan="8" style={{ border: "none" }}>
              Use personal Protective Equipment like Apron, Helmet, Safety
              goggles, Nose mask and hand gloves, etc during material handling
              and sampling. Ear plugs are used in high noise area.
            </th>
          </tr>
          <br />
          <br />
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr>
            <th colSpan="8">
              <b> 2.0 INPUT DETAILS (in Kg):</b>
            </th>
          </tr>
          <tr>
            <th colspan="3">REJECTED ROLLS</th>
            <th colspan="3">EDGE TRIM WASTE</th>
            <th colspan="2">SKLETEN WASTE</th>
          </tr>
          <tr>
            <th colspan="3">
              {" "}
              {
                printResponseData?.rp02annexerinputdetailsproductiondetails?.[0]
                  ?.rejected_rolls
              }
            </th>
            <th colspan="3">
              {
                printResponseData?.rp02annexerinputdetailsproductiondetails?.[0]
                  ?.edge_trim_waste
              }
            </th>
            <th colspan="2">
              {
                printResponseData?.rp02annexerinputdetailsproductiondetails?.[0]
                  ?.skleten_waste
              }
            </th>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <br />
          <tr>
            <th colSpan="8">
              <b> 4.0 PACKING MATERIAL DETAILS:</b>
            </th>
          </tr>
          <tr>
            <th colSpan="1">
              <b>SI. No.</b>
            </th>
            <th colSpan="2">
              <b>Name of the Packing Material</b>
            </th>
            <th colSpan="2">
              <b>Batch No.</b>
            </th>
            <th colSpan="2">
              <b>Quantity</b>
            </th>
            <th colSpan="1">
              <b>Units</b>
            </th>
          </tr>
          <tr>
            <th colSpan="1">1</th>
            <th colSpan="2">
              {
                printResponseData?.rpb04packingmeterialdetails?.[0]
                  ?.details?.[0]?.name_of_pck_meterial
              }
            </th>
            <th colSpan="2">
              B
              {
                printResponseData?.rpb04packingmeterialdetails?.[0]
                  ?.details?.[0]?.batch_no
              }
            </th>
            <th colSpan="2">
              {
                printResponseData?.rpb04packingmeterialdetails?.[0]
                  ?.details?.[0]?.quantity
              }
            </th>
            <th colSpan="1">KGS</th>
          </tr>
          <br />
          <tr>
            <th colSpan="8">
              <b>5.0 REFERENCE DOCUMENTS</b>
            </th>
          </tr>
          <tr>
            <th colSpan="1">
              <b>SI. No.</b>
            </th>
            <th colSpan="6" style={{ textAlign: "center" }}>
              <b>Title</b>
            </th>
            <th colSpan="1">
              <b>Document No.</b>
            </th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              1
            </th>
            <th colSpan="6">GOOD DOCUMENTATION PRACTICES</th>
            <th colSpan="1">QAD01-D-50</th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              2
            </th>
            <th colSpan="6">INSTRUCTION FOR CLEANING</th>
            <th colSpan="1">PRD02-D-26</th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              3
            </th>
            <th colSpan="6">RP BALEPRESS</th>
            <th colSpan="1">PRD02-D-20</th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              4
            </th>
            <th colSpan="6">DEVIATIONS MANAGEMENT</th>
            <th colSpan="1">QAD01-D-43</th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              5
            </th>
            <th colSpan="6">CHANGE CONTROL</th>
            <th colSpan="1">QQAD01-D-41</th>
          </tr>
          <br />
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr>
            <th colSpan="8">
              <b>6.0 PROCESSING EQUIPMENT’S</b>
            </th>
          </tr>
          <tr>
            <th colSpan="1">
              <b>SI. No.</b>
            </th>
            <th colSpan="2">
              <b>Equipment Name</b>
            </th>
            <th colSpan="1">
              <b>Equipment code</b>
            </th>
            <th colSpan="2">
              <b>Date of Calibration</b>
            </th>
            <th colSpan="1">
              <b>Calibration due on</b>
            </th>
            <th colSpan="1">
              <b>Checked by</b>
            </th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              1
            </th>
            <th colSpan="2">RP Bale Press </th>
            <th colSpan="1">PH-E/I-SP13</th>
            <th colSpan="2">
              {formattedDate(
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[0]?.date_calibration
              )}
            </th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[0]?.calibration_due_on
              )}
            </th>
            <th colSpan="1">
              {
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[0]?.checked_by_sign
              }
              <br />
              {
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[0]?.checked_by_date
              }
            </th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              2
            </th>
            <th colSpan="2">Strip Opener </th>
            <th colSpan="1">PH-E/I-SP14</th>
            <th colSpan="2">NA</th>
            <th colSpan="1">NA</th>
            <th colSpan="1">
              {
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[1]?.checked_by_sign
              }
              <br />
              {
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[1]?.checked_by_date
              }
            </th>
          </tr>
          <tr>
            <th colSpan="1" style={{ textAlign: "center" }}>
              3
            </th>
            <th colSpan="2">Applied </th>
            <th colSpan="1">PH-E/I-SP12</th>
            <th colSpan="2">
              {formattedDate(
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[2]?.date_calibration
              )}
            </th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[2]?.calibration_due_on
              )}
            </th>
            <th colSpan="1">
              {
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[2]?.checked_by_sign
              }
              <br />
              {
                printResponseData?.rpb06processingequpments?.[0]
                  ?.detailsRecords06?.[2]?.checked_by_date
              }
            </th>
          </tr>
          <br />
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr>
            <th colSpan="8">
              <b>7.0 VERIFICATION OF RECORDS:</b>
            </th>
          </tr>
          <tr>
            <th colSpan="2">Name of the Record</th>
            <th colSpan="2">Checked by/Date</th>
            <th colSpan="2">Verified by/Date</th>
            <th colSpan="2">Activity</th>
          </tr>
          <tr style={{ height: "100px" }}>
            <td colSpan="2" rowSpan="2">
              House Keeping Cleaning Records
            </td>
            <td colSpan="2" rowSpan="2">
              {
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[0]?.checked_sign
              }
              <br />
              {formattedDate(
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[0]?.checked_date
              )}
            </td>
            <td colSpan="2" rowSpan="2">
              {
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[0]?.verified_sign
              }
              <br />
              {formattedDate(
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[0]?.verified_date
              )}
            </td>
            <td>Satisfactory</td>
            <td>
              {printResponseData &&
              printResponseData?.rpb07verificationofrecords?.[0]
                ?.detailsRecords06?.[0]?.details === "satisfactory"
                ? "✓"
                : "NA"}
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td>Not Satisfactory</td>
            <td>
              {printResponseData &&
              printResponseData?.rpb07verificationofrecords?.[0]
                ?.detailsRecords06?.[0]?.details === "notSatisfactory"
                ? "✓"
                : "NA"}
            </td>
          </tr>
          <tr style={{ height: "100px" }}>
            <td colSpan="2" rowSpan="2">
              Production Records
            </td>
            <td colSpan="2" rowSpan="2">
              {
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[1]?.checked_sign
              }
              <br />
              {formattedDate(
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[1]?.checked_date
              )}
            </td>
            <td colSpan="2" rowSpan="2">
              {
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[1]?.verified_sign
              }
              <br />
              {formattedDate(
                printResponseData?.rpb07verificationofrecords?.[0]
                  ?.detailsRecords06?.[1]?.verified_date
              )}
            </td>
            <td>Satisfactory</td>
            <td>
              {printResponseData &&
              printResponseData?.rpb07verificationofrecords?.[0]
                ?.detailsRecords06?.[1]?.details === "satisfactory"
                ? "✓"
                : "NA"}
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td>Not Satisfactory</td>
            <td>
              {printResponseData &&
              printResponseData?.rpb07verificationofrecords?.[0]
                ?.detailsRecords06?.[1]?.details === "notSatisfactory"
                ? "✓"
                : "NA"}
            </td>
          </tr>
          <br />
          <br />
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>{" "}
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan="8"></td>
          </tr>
          <tr>
            <th colspan="8">8.0 MANUFACTURING STEPS</th>
          </tr>
          <tr>
            <th>Step. No.</th>
            <th colspan="2">Operation</th>
            <th>STD</th>
            <th colspan="2">Observation</th>
            <th>
              Done by
              <br />
              (Sign/Date)
            </th>
            <th>
              Checked by
              <br />
              (Sign/Date)
            </th>
          </tr>
          <tr>
            <td
              rowspan="4"
              style={{ textAlign: "center", verticalAlign: "center" }}
            >
              1
            </td>
            <td colspan="2" style={{ border: "none" }}>
              Switch ON all the machines & Sub machines:
            </td>

            <td rowspan="1" class="red-text">
              50cm to 100cm
            </td>
            <td colspan="2">
              {printResponseData?.rpb08manufacturesteps?.[0]?.observation1}
            </td>
            <td rowspan="4" class="red-text">
              {printResponseData?.rpb08manufacturesteps?.[0]?.done_by_sign}
              <br />
              {formattedDate(
                printResponseData?.rpb08manufacturesteps?.[0]?.done_by_date
              )}
            </td>
            <td rowspan="4" class="red-text">
              {printResponseData?.rpb08manufacturesteps?.[0]?.checked_by_sign}
              <br />
              {formattedDate(
                printResponseData?.rpb08manufacturesteps?.[0]?.checked_by_date
              )}
            </td>
          </tr>
          <tr>
            <td colspan="2">Length of bale: Std 50 to 100 cm</td>
            <td class="red-text">50 cm to 100 cm</td>
            <td colspan="2">
              {printResponseData?.rpb08manufacturesteps?.[0]?.observation2}
            </td>
          </tr>
          <tr>
            <td colspan="2">Maxi pressure press plate: Std 50 to 200 Bar</td>
            <td class="red-text">50 to 200 Bar</td>
            <td colspan="2">
              {printResponseData?.rpb08manufacturesteps?.[0]?.observation3}
            </td>
          </tr>
          <tr>
            <td colspan="2">Maxi pressure compensator: Std 50 to 200 Bar</td>
            <td class="red-text">50 to 200 Bar</td>
            <td colspan="2">
              {printResponseData?.rpb08manufacturesteps?.[0]?.observation4}
            </td>
          </tr>
          <br /> <br />
          <br />
          <tr>
            <th colspan="8">
              9.0 PRODUCT RECONCILIATION:
              <br />
              Yield in % = (Output Qty / Input Qty) x 100
            </th>
          </tr>
          <tr>
            <th colSpan="2">Input Quantity (Kgs)</th>
            <th colSpan="1">
              {
                printResponseData?.rpb09productionreconciliation?.[0]
                  ?.input_quantity
              }
            </th>
            <th colSpan="1">Output Quantity (Kgs)</th>
            <th colSpan="1">
              {
                printResponseData?.rpb09productionreconciliation?.[0]
                  ?.output_quantity
              }
            </th>
            <th colSpan="2">% Yield (Specification: 80% to 100%)</th>
            <th colSpan="1">
              {
                printResponseData?.rpb09productionreconciliation?.[0]
                  ?.calculation
              }
            </th>
          </tr>
          <br />
          <tr style={{ height: "30px" }}>
            <th colspan="8">10.0 PROCESS DEVIATION RECORD</th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">Step No.</th>
            <th colSpan="3">Deviation</th>
            <th colSpan="1">Signature</th>
            <th colSpan="2">QA Remarks</th>
            <th colSpan="1">Signature/Date</th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">1</th>
            <th colSpan="3">
              {
                printResponseData?.rpb10processdevrecord?.[0]
                  ?.detailsRecords10?.[0]?.deviation
              }
            </th>
            <th colSpan="1">
              {
                printResponseData?.rpb10processdevrecord?.[0]
                  ?.detailsRecords10?.[0]?.signature
              }
            </th>
            <th colSpan="2">
              {
                printResponseData?.rpb10processdevrecord?.[0]
                  ?.detailsRecords10?.[0]?.qa_remarks
              }{" "}
            </th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb10processdevrecord?.[0]
                  ?.detailsRecords10?.[0]?.sig_date
              )}
            </th>
          </tr>
          <br />
          <tr style={{ height: "30px" }}>
            <th colSpan="8">11.0 PROCESS DELAY/EQUIPMENT BREAK DOWN RECORD</th>
          </tr>
          <tr>
            <th rowSpan="2" colSpan="1">
              Step No.
            </th>
            <th rowSpan="2" colSpan="1">
              Date
            </th>
            <th rowSpan="1" colSpan="3">
              Process Delay/Down Time
            </th>
            <th rowSpan="2" colSpan="2">
              Signature/Date
            </th>
            <th rowSpan="2" colSpan="1">
              Remarks
            </th>
          </tr>
          <tr>
            <th rowSpan="1" colSpan="1">
              From
            </th>
            <th rowSpan="1" colSpan="1">
              To
            </th>
            <th rowSpan="1" colSpan="1">
              Total
            </th>
          </tr>
          {printResponseData?.rpb11processdlyequpbrkdwnrecord?.[0]?.spunlacrdetails?.map(
            (record, index) => (
              <tr key={index}>
                <th colSpan="1">{index + 1}</th>
                <th colSpan="1">{formattedDate(record?.prod_date)}</th>
                <th colSpan="1">{record?.pde_from_hr}</th>
                <th colSpan="1">{record?.pde_to_hr}</th>
                <th colSpan="1">{record?.pde_total_hr}</th>
                <th colSpan="2">
                  {record?.prod_sign}
                  <br />
                  {formattedDate(record?.prod_date)}
                </th>
                <th colSpan="1">{record?.remarks}</th>
              </tr>
            )
          )}
          <br />
          <tr style={{ height: "30px" }}>
            <th colspan="8">12.0 LIST OF ENCLOSURES</th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">Sl. No.</th>
            <th colSpan="1">Date</th>
            <th colSpan="4">Title</th>
            <th colSpan="2">Remarks</th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">1</th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb12listofenclouser?.[0]
                  ?.detailsRecords12?.[0]?.date
              )}
            </th>
            <th colSpan="4">
              {
                printResponseData?.rpb12listofenclouser?.[0]
                  ?.detailsRecords12?.[0]?.title
              }
            </th>
            <th colSpan="2">
              {
                printResponseData?.rpb12listofenclouser?.[0]
                  ?.detailsRecords12?.[0]?.remarks
              }{" "}
            </th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">2</th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb12listofenclouser?.[0]
                  ?.detailsRecords12?.[1]?.date
              )}
            </th>
            <th colSpan="4">
              {
                printResponseData?.rpb12listofenclouser?.[0]
                  ?.detailsRecords12?.[1]?.title
              }
            </th>
            <th colSpan="2">
              {
                printResponseData?.rpb12listofenclouser?.[0]
                  ?.detailsRecords12?.[1]?.remarks
              }
            </th>
          </tr>
          <br />
          <tr style={{ height: "30px" }}>
            <th colspan="8">13.0 POST-PRODUCTION REVIEW</th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">Designation</th>
            <th colSpan="1">Shift In charge</th>
            <th colSpan="4">
              Reviewed by Production Manager/Head of the Department
            </th>
            <th colSpan="2">Approved by QA-Officer/Executive/Manager</th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">Signature</th>
            <th colSpan="1">
              {printResponseData?.rpb13postprodreview?.[0]?.sup_sign}
            </th>
            <th colSpan="4">
              {printResponseData?.rpb13postprodreview?.[0]?.designee_sign}
            </th>
            <th colSpan="2">
              {printResponseData?.rpb13postprodreview?.[0]?.qa_sign}{" "}
            </th>
          </tr>
          <tr style={{ height: "30px" }}>
            <th colSpan="1">Date</th>
            <th colSpan="1">
              {formattedDate(
                printResponseData?.rpb13postprodreview?.[0]?.sup_date
              )}
            </th>
            <th colSpan="4">
              {formattedDate(
                printResponseData?.rpb13postprodreview?.[0]?.designee_date
              )}
            </th>
            <th colSpan="2">
              {formattedDate(
                printResponseData?.rpb13postprodreview?.[0]?.qa_date
              )}
            </th>
          </tr>
          <br />
          <tr>
            <th colspan="8">
              <b>14.0 QA RELEASE:</b>
            </th>
          </tr>
          <tr>
            <th colspan="1">S No</th>
            <th colspan="3">Description</th>
            <th colspan="2">Status</th>
            <th colspan="2">Sign and Date</th>
          </tr>
          <tr>
            <td rowspan="2">1</td>
            <td colspan="3" rowspan="2">
              All critical process parameters reviewed. (Within/Not within
              range)
            </td>
            <td>Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[0]
                    ?.status_1 === "Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
            <td rowspan="2" colspan="2">
              {printResponseData?.rpb14qarelease?.[0]?.details?.[0]?.sign}
              <br />
              {formattedDate(
                printResponseData?.rpb14qarelease?.[0]?.details?.[0]?.date
              )}
            </td>
          </tr>
          <tr>
            <td>Not Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[0]
                    ?.status_1 === "Not Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
          </tr>
          <tr>
            <td rowspan="2">2</td>
            <td colspan="3" rowspan="2">
              In process checks reviewed. (Meeting/Not meeting the
              specification)
            </td>
            <td>Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[1]
                    ?.status_1 === "Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
            <td rowspan="2" colspan="2">
              {printResponseData?.rpb14qarelease?.[0]?.details?.[1]?.sign}
              <br />
              {formattedDate(
                printResponseData?.rpb14qarelease?.[0]?.details?.[1]?.date
              )}
            </td>
          </tr>
          <tr>
            <td>Not Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[1]
                    ?.status_1 === "Not Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
          </tr>
          <tr>
            <td rowspan="2">3</td>
            <td colspan="3" rowspan="2">
              Deviations reviewed. (Found/Not found)
            </td>
            <td>Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[2]
                    ?.status_1 === "Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
            <td rowspan="2" colspan="2">
              {printResponseData?.rpb14qarelease?.[0]?.details?.[2]?.sign}
              <br />
              {formattedDate(
                printResponseData?.rpb14qarelease?.[0]?.details?.[2]?.date
              )}
            </td>
          </tr>
          <tr>
            <td>Not Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[2]
                    ?.status_1 === "Not Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
          </tr>
          <tr>
            <td rowspan="2">4</td>
            <td colspan="3" rowspan="2">
              If deviations are logged
            </td>
            <td>Closed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[3]
                    ?.status_1 === "Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
            <td rowspan="2" colspan="2">
              {printResponseData?.rpb14qarelease?.[0]?.details?.[3]?.sign}
              <br />
              {formattedDate(
                printResponseData?.rpb14qarelease?.[0]?.details?.[3]?.date
              )}
            </td>
          </tr>
          <tr>
            <td>Not closed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[3]
                    ?.status_1 === "Not Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
          </tr>
          <tr>
            <td rowspan="2">5</td>
            <td colspan="3" rowspan="2">
              The Batch is released to next step.
            </td>
            <td>Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[4]
                    ?.status_1 === "Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
            <td rowspan="2" colspan="2">
              {printResponseData?.rpb14qarelease?.[0]?.details?.[4]?.sign}
              <br />
              {formattedDate(
                printResponseData?.rpb14qarelease?.[0]?.details?.[4]?.date
              )}
            </td>
          </tr>
          <tr>
            <td>Not Reviewed</td>
            <td>
              {printResponseData
                ? printResponseData?.rpb14qarelease?.[0]?.details?.[4]
                    ?.status_1 === "Not Reviewed"
                  ? "✓"
                  : "NA"
                : "NA"}
            </td>
          </tr>
          <br />
          <tr>
            <th colSpan="8">15.0 PRODUCT RELEASE</th>
          </tr>
          <tr>
            <th colSpan="8">
              The material produced through the execution of this Batch Record
              shall be archival by QA according to Product Release Procedure
              (SOP-QAD01-D-61) and documented as per the Format: QAD01/F-34
            </th>
          </tr>
          <tr>
            <th colSpan="2"></th>
            <th colSpan="3">Checked by QA</th>
            <th colSpan="3">
              Approved by
              <br />
              Manager-QA / Designee
            </th>
          </tr>
          <tr>
            <th colSpan="2">Name</th>
            <th colSpan="3">
              {printResponseData?.rpb15productrelease?.[0]?.chk_qa_sign}
            </th>
            <th colSpan="3">
              {printResponseData?.rpb15productrelease?.[0]?.apr_qa_sign}{" "}
            </th>
          </tr>
          <tr>
            <th colSpan="2">Sign & Date</th>
            <th colSpan="3">
              {formattedDate(
                printResponseData?.rpb15productrelease?.[0]?.chk_qa_date
              )}
            </th>
            <th colSpan="3">
              {" "}
              {formattedDate(
                printResponseData?.rpb15productrelease?.[0]?.apr_qa_date
              )}
            </th>
          </tr>
          <br />
          <br />
          <tfoot>
            {/* <tr>
              <td colspan="8" style={{ height: "10px" }}></td>
            </tr> */}
            <tr colSpan="8" style={{ height: "30px" }}>
              <td colSpan="2">Particulars</td>
              <td colSpan="3">Prepard by</td>
              <td colSpan="2">Reviewed by</td>
              <td colSpan="2">Approved by</td>
            </tr>

            <tr colSpan="8" style={{ height: "30px" }}>
              <td colSpan="2">Name</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
            <tr colSpan="8" style={{ height: "30px" }}>
              <td colSpan="2">Signature & Date</td>
              <td colSpan="3"></td>
              <td colSpan="2"></td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Section Print End */}

      {/* SUMMARY PRINT */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Batch Number:
          </label>
          <Select
            showSearch
            value={selectedOrderValuePrint}
            onChange={fetchPrintValue}
            style={{ width: "100%" }}
            placeholder="Select Batch Number"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Batch Number
            </Select.Option>
            {batchNo.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default BMRSummaryRP;
