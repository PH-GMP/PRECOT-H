/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
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

const DryGoods_f03 = () => {
  const initial = useRef(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const [batchno, setbatchno] = useState([]);
  const [batchno2, setbatchno2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [batchNolist, setBatchNolist] = useState("");

  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  // console.log("date from smmary",date)
  const [selectedRow, setSelectedRow] = useState(null);
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [splInstruction, setSplInstruction] = useState("");
  const [planId, setplanId] = useState("");
  const [Id, setId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderDetails, setOrderDetails] = useState("");
  const [stoppagedata, setstoppagedata] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOrderNumbers, setSelectedOrderNumbers] = useState({});
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [Product, setProduct] = useState("");
  const [customer_Name, setcustomer_Name] = useState("");
  const [Ball_Bag, setBall_Bag] = useState("");
  const [Sale_Order_No, setSale_Order_No] = useState("");
  const [Brand, setBrand] = useState("");
  const [Cutting_Length, setCutting_Length] = useState("");
  const [Feed_Roller_speed, setFeed_Roller_speed] = useState("");
  const [std_Bags, setstd_Bags] = useState("");
  const [Bag_Box, setBag_Box] = useState("");
  const [count_Bags, setcount_Bags] = useState("");
  const [Ball_weight, setBall_weight] = useState("");
  const [Sliver_Weight, setSliver_Weight] = useState("");
  const [Cutting_Roller, setCutting_Roller] = useState("");
  const [Feed_Roller_percentage, setFeed_Roller_percentage] = useState("");
  const [Cutting_Length_in_mm, setCutting_Length_in_mm] = useState("");
  const [Bags1, setBags1] = useState("");
  const [Bags2, setBags2] = useState("");
  const [Bags3, setBags3] = useState("");
  const [Bags4, setBags4] = useState("");
  const [Bags5, setBags5] = useState("");
  const [Bags6, setBags6] = useState("");
  const [Bags7, setBags7] = useState("");
  const [Bags8, setBags8] = useState("");

  const [Box1, setBox1] = useState("");
  const [Box2, setBox2] = useState("");
  const [Box3, setBox3] = useState("");
  const [Box4, setBox4] = useState("");
  const [Box5, setBox5] = useState("");
  const [Box6, setBox6] = useState("");
  const [Box7, setBox7] = useState("");
  const [Box8, setBox8] = useState("");
  const [BoxTotal, setBoxTotal] = useState("");
  const [BagTotal, setBagTotal] = useState("");
  const [drygoodsdetails, setdrygoodsdetails] = useState("");
  const [stoppage, setstoppage] = useState("");
  const [Orderdetails, setOrderdetails] = useState("");
  const [silver_weight_kg, setsilver_weight_kg] = useState("");
  const [Ball_weight_kg, setBall_weight_kg] = useState("");
  const [MachinceValue, setMachinceValue] = useState("");
  const machineNameLov = [
    { value: "TC10-1", label: "TC10-1 " },
    { value: "TC10-2", label: "TC10-2" },
  ];
  const [rows, setRows] = useState([{}]);
  const { Option } = Select;
  const { date, shift, machincevalue, machineName, order_no } = state || {};
  console.log(
    "machince name,shift, order_no",
    machincevalue,
    shift,
    machincevalue,
    order_no
  );
  useEffect(() => {
    if (machineName === "TEXCOR") {
      setMachinceValue("BL1");
    } else {
      setMachinceValue("BL2"); // or any other default value
    }
  }, [machineName]);
  // const handleChangeOrderNo = (e) => {
  //   setBatchNolist(e);

  // };
  useEffect(() => {
    fetchData_StoppageDetails(order_no);
  }, []);
  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift; // Return the original value if it doesn't match any case
    }
  };
  const roleBase = localStorage.getItem("role");
  const handleOrderNumberChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].orderNumber = value;
    setRows(updatedRows);

    setSelectedOrderNumbers((prevSelectedOrderNumbers) => ({
      ...prevSelectedOrderNumbers,
      [index]: value,
    }));
  };
  const handleKeyDown_text = (e) => {
    // Allow only numbers, letters, underscore, and dot
    if (
      !/[0-9a-zA-Z._]/.test(e.key) && // Exclude the space character from the regex pattern
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault(); // Prevent the default action if the key is not allowed
    }
  };
  const handleKeyDown = (e) => {
    // Allow numbers, underscore, dot, backspace, delete, arrow keys, and tab
    if (
      !/[0-9._]/.test(e.key) && // Check if the key is not a digit, underscore, or dot
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    console.log("state value", date, shift, machineName);
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
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
  }, [planingDetailsByDate, API.prodUrl, token]);
  useEffect(() => {
    console.log("state value", date, shift);
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.operator_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [planingDetailsByDate, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [planingDetailsByDate, API.prodUrl, token]);

  const filteredOrderNumberLov = (index) => {
    const selectedOrderNumbersList = Object.values(selectedOrderNumbers);
    return orderNumberLov.filter(
      (order) =>
        !selectedOrderNumbersList.includes(order.value) ||
        selectedOrderNumbers[index] === order.value
    );
  };

  const handleAddRow = () => {
    setRows([...rows, { orderNumber: "" }]);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);

      setSelectedOrderNumbers((prevSelectedOrderNumbers) => {
        const updatedSelectedOrderNumbers = { ...prevSelectedOrderNumbers };
        delete updatedSelectedOrderNumbers[index];
        return updatedSelectedOrderNumbers;
      });
    }
  };
  // Spunlace row
  const [spunlaceStdPh, setSpunlaceStdPh] = useState("");
  const [spunlaceStdOther, setSpunlaceStdOther] = useState("");
  const [spunlacePh1S, setSpunlacePh1S] = useState("");
  const [spunlaceOther1S, setSpunlaceOther1S] = useState("");
  const [spunlacePh2S, setSpunlacePh2S] = useState("");
  const [spunlaceOther2S, setSpunlaceOther2S] = useState("");
  const [spunlacePh3S, setSpunlacePh3S] = useState("");
  const [spunlaceOther3S, setSpunlaceOther3S] = useState("");
  const [spunlacePhGS, setSpunlacePhGS] = useState("");
  const [spunlaceOtherGS, setSpunlaceOtherGS] = useState("");

  // rp
  const [rpBaleStdPh, setRpBaleStdPh] = useState("");
  const [rpBaleStdOther, setRpBaleStdOther] = useState("");
  const [rpBalePh1S, setRpBalePh1S] = useState("");
  const [rpBaleOther1S, setRpBaleOther1S] = useState("");
  const [rpBalePh2S, setRpBalePh2S] = useState("");
  const [rpBaleOther2S, setRpBaleOther2S] = useState("");
  const [rpBalePh3S, setRpBalePh3S] = useState("");
  const [rpBaleOther3S, setRpBaleOther3S] = useState("");
  const [rpBalePhGS, setRpBalePhGS] = useState("");
  const [rpBaleOtherGS, setRpBaleOtherGS] = useState("");

  // data entry
  const [sliterWinderStdPh, setSliterWinderStdPh] = useState("");
  const [sliterWinderStdOther, setSliterWinderStdOther] = useState("");
  const [sliterWinderPh1S, setSliterWinderPh1S] = useState("");
  const [sliterWinderOther1S, setSliterWinderOther1S] = useState("");
  const [sliterWinderPh2S, setSliterWinderPh2S] = useState("");
  const [sliterWinderOther2S, setSliterWinderOther2S] = useState("");
  const [sliterWinderPh3S, setSliterWinderPh3S] = useState("");
  const [sliterWinderOther3S, setSliterWinderOther3S] = useState("");
  const [sliterWinderPhGS, setSliterWinderPhGS] = useState("");
  const [sliterWinderOtherGS, setSliterWinderOtherGS] = useState("");

  // total
  const [totalStdPh, setTotalStdPh] = useState("");
  const [totalStdOther, setTotalStdOther] = useState("");
  const [totalPh1S, setTotalPh1S] = useState("");
  const [totalOther1S, setTotalOther1S] = useState("");
  const [totalPh2S, setTotalPh2S] = useState("");
  const [totalOther2S, setTotalOther2S] = useState("");
  const [totalPh3S, setTotalPh3S] = useState("");
  const [totalOther3S, setTotalOther3S] = useState("");
  const [totalPhGS, setTotalPhGS] = useState("");
  const [totalOtherGS, setTotalOtherGS] = useState("");
  const [showModal, setShowModal] = useState(false);
  const calculateTotal = () => {
    const isValidNumber = (value) => {
      const number = Number(value);
      return !isNaN(number) && typeof number === "number";
    };

    return (
      (isValidNumber(Bags1) ? Number(Bags1) : 0) +
      (isValidNumber(Bags2) ? Number(Bags2) : 0) +
      (isValidNumber(Bags3) ? Number(Bags3) : 0) +
      (isValidNumber(Bags4) ? Number(Bags4) : 0) +
      (isValidNumber(Bags5) ? Number(Bags5) : 0) +
      (isValidNumber(Bags6) ? Number(Bags6) : 0) +
      (isValidNumber(Bags7) ? Number(Bags7) : 0) +
      (isValidNumber(Bags8) ? Number(Bags8) : 0)
    );
  };

  const calculateTotal_box = () => {
    const isValidNumber = (value) => {
      const number = Number(value);
      return !isNaN(number) && typeof number === "number";
    };

    return (
      (isValidNumber(Box1) ? Number(Box1) : 0) +
      (isValidNumber(Box2) ? Number(Box2) : 0) +
      (isValidNumber(Box3) ? Number(Box3) : 0) +
      (isValidNumber(Box4) ? Number(Box4) : 0) +
      (isValidNumber(Box5) ? Number(Box5) : 0) +
      (isValidNumber(Box6) ? Number(Box6) : 0) +
      (isValidNumber(Box7) ? Number(Box7) : 0) +
      (isValidNumber(Box8) ? Number(Box8) : 0)
    );
  };

  // Function to handle changes in any of the bag inputs
  const handleBagChange = (value, setBagState) => {
    setBagState(value); // Update the state of the specific bag input
  };
  // Function to handle changes in any of the bag inputs
  const handleBoxChange = (value, setBagState) => {
    setBagState(value); // Update the state of the specific bag input
  };
  const roleauth = localStorage.getItem("role");

  const disabled =
    (roleauth === "ROLE_SUPERVISOR" &&
      planingDetailsByDate?.supervisor_status === "SUPERVISOR_APPROVED" &&
      planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL") ||
    planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
    (roleauth === "ROLE_HOD" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED")) ||
    (roleauth === "ROLE_DESIGNEE" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED"));

  const calculateStdPh = () => {
    let total = 0;

    const apunlacestdphInput = document.getElementById("spunlacestd-ph");
    if (apunlacestdphInput) {
      total += parseInt(apunlacestdphInput.value || "0");
    }

    const rpbasedstdphInput = document.getElementById("rpBalestd-ph");
    if (rpbasedstdphInput) {
      total += parseInt(rpbasedstdphInput.value || "0");
    }

    const sliterwinderstdphInput =
      document.getElementById("sliterWinderstd-ph");
    if (sliterwinderstdphInput) {
      total += parseInt(sliterwinderstdphInput.value || "0");
    }
    setTotalStdPh(total.toString());
  };

  const calculateStdothers = () => {
    let total = 0;

    const apunlacestdotherInput = document.getElementById("spunlacestd-other");
    if (apunlacestdotherInput) {
      total += parseInt(apunlacestdotherInput.value || "0");
    }

    const rpbasedstdotherInput = document.getElementById("rpBalestd-other");
    if (rpbasedstdotherInput) {
      total += parseInt(rpbasedstdotherInput.value || "0");
    }

    const sliterwinderstdotherInput = document.getElementById(
      "sliterWinderstd-other"
    );
    if (sliterwinderstdotherInput) {
      total += parseInt(sliterwinderstdotherInput.value || "0");
    }
    setTotalStdOther(total.toString());
  };

  const calculate1sPh = () => {
    let total = 0;

    const spunlace1sphInput = document.getElementById("spunlace1s-ph");
    if (spunlace1sphInput) {
      total += parseInt(spunlace1sphInput.value || "0");
    }

    const rpbased1sphInput = document.getElementById("rpBale1s-ph");
    if (rpbased1sphInput) {
      total += parseInt(rpbased1sphInput.value || "0");
    }

    const sliterwinder1sphInput = document.getElementById("sliterWinder1s-ph");
    if (sliterwinder1sphInput) {
      total += parseInt(sliterwinder1sphInput.value || "0");
    }
    setTotalPh1S(total.toString());
  };
  const calculate1sothers = () => {
    let total = 0;

    const spunlace1sotherInput = document.getElementById("spunlace1s-other");
    if (spunlace1sotherInput) {
      total += parseInt(spunlace1sotherInput.value || "0");
    }

    const rpbased1sotherInput = document.getElementById("rpBale1s-other");
    if (rpbased1sotherInput) {
      total += parseInt(rpbased1sotherInput.value || "0");
    }

    const sliterwinder1sotherInput = document.getElementById(
      "sliterWinder1s-other"
    );
    if (sliterwinder1sotherInput) {
      total += parseInt(sliterwinder1sotherInput.value || "0");
    }
    setTotalOther1S(total.toString());
  };

  const calculate2sPh = () => {
    let total = 0;

    const spunlace2sphInput = document.getElementById("spunlace2s-ph");
    if (spunlace2sphInput) {
      total += parseInt(spunlace2sphInput.value || "0");
    }

    const rpbased2sphInput = document.getElementById("rpBale2s-ph");
    if (rpbased2sphInput) {
      total += parseInt(rpbased2sphInput.value || "0");
    }

    const sliterwinder2sphInput = document.getElementById("sliterWinder2s-ph");
    if (sliterwinder2sphInput) {
      total += parseInt(sliterwinder2sphInput.value || "0");
    }
    setTotalPh2S(total.toString());
  };

  const calculate2sothers = () => {
    let total = 0;

    const spunlace2sotherInput = document.getElementById("spunlace2s-other");
    if (spunlace2sotherInput) {
      total += parseInt(spunlace2sotherInput.value || "0");
    }

    const rpbased2sotherInput = document.getElementById("rpBale2s-other");
    if (rpbased2sotherInput) {
      total += parseInt(rpbased2sotherInput.value || "0");
    }

    const sliterwinder2sotherInput = document.getElementById(
      "sliterWinder2s-other"
    );
    if (sliterwinder2sotherInput) {
      total += parseInt(sliterwinder2sotherInput.value || "0");
    }
    setTotalOther2S(total.toString());
  };
  const calculate3sPh = () => {
    let total = 0;

    const spunlace3sphInput = document.getElementById("spunlace3s-ph");
    if (spunlace3sphInput) {
      total += parseInt(spunlace3sphInput.value || "0");
    }

    const rpbased3sphInput = document.getElementById("rpBale3s-ph");
    if (rpbased3sphInput) {
      total += parseInt(rpbased3sphInput.value || "0");
    }

    const sliterwinder3sphInput = document.getElementById("sliterWinder3s-ph");
    if (sliterwinder3sphInput) {
      total += parseInt(sliterwinder3sphInput.value || "0");
    }
    setTotalPh3S(total.toString());
  };

  const calculate3sothers = () => {
    let total = 0;

    const spunlace3sotherInput = document.getElementById("spunlace3s-other");
    if (spunlace3sotherInput) {
      total += parseInt(spunlace3sotherInput.value || "0");
    }

    const rpbased3sotherInput = document.getElementById("rpBale3s-other");
    if (rpbased3sotherInput) {
      total += parseInt(rpbased3sotherInput.value || "0");
    }

    const sliterwinder3sotherInput = document.getElementById(
      "sliterWinder3s-other"
    );
    if (sliterwinder3sotherInput) {
      total += parseInt(sliterwinder3sotherInput.value || "0");
    }
    setTotalOther3S(total.toString());
  };

  const calculateGsPh = () => {
    let total = 0;

    const spunlaceGsphInput = document.getElementById("spunlaceGs-ph");
    if (spunlaceGsphInput) {
      total += parseInt(spunlaceGsphInput.value || "0");
    }

    const rpbasedGsphInput = document.getElementById("rpBaleGs-ph");
    if (rpbasedGsphInput) {
      total += parseInt(rpbasedGsphInput.value || "0");
    }

    const sliterwinderGsphInput = document.getElementById("sliterWinderGs-ph");
    if (sliterwinderGsphInput) {
      total += parseInt(sliterwinderGsphInput.value || "0");
    }
    setTotalPhGS(total.toString());
  };

  const calculateGsothers = () => {
    let total = 0;

    const spunlaceGsotherInput = document.getElementById("spunlaceGs-other");
    if (spunlaceGsotherInput) {
      total += parseInt(spunlaceGsotherInput.value || "0");
    }

    const rpbasedGsotherInput = document.getElementById("rpBaleGs-other");
    if (rpbasedGsotherInput) {
      total += parseInt(rpbasedGsotherInput.value || "0");
    }

    const sliterwinderGsotherInput = document.getElementById(
      "sliterWinderGs-other"
    );
    if (sliterwinderGsotherInput) {
      total += parseInt(sliterwinderGsotherInput.value || "0");
    }
    setTotalOtherGS(total.toString());
  };

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orders`,
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
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };

    fetchOrderNumberOptions();
    fetchDataOrderNumber();
  }, [token]);

  const fetchDataOrderNumber = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getDrygoodsOrderNoLov`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavalues", data);

      // console.log("Summary Get List",data)
      if (data && data.length >= 0) {
        // setOrderdetails(data);
        setbatchno(data);
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.data.message);
    } finally {
    }
  };

  const datefomrat = moment(date).format("DD/MM/YYYY");
  const fetchData_drygoodsdetailsDetails = async (value) => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const numberShift = convertShiftValue(shift);
      let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getDrygoodsOrderDetailsPdeF003?order_no=${value}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavalues", data);

      // console.log("Summary Get List",data)
      if (data && data.length >= 0) {
        setdrygoodsdetails(data);
        // const brand = data[0]?.Material.substring(0, 3);
        setProduct(data[0]?.customer_name);
        setSale_Order_No(data[0]?.Saleorder);
        // setBag_Box(data[0]?.bag_by_box);
        setBag_Box(data[0]?.Bags);
        // setBrand(data[0]?.Material);
        setBall_Bag(data[0]?.MaterialAfterDash);
        console.log("setstoppage", data);
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.data.message);
    } finally {
    }
  };

  const fetchData_StoppageDetails = async (value) => {
    let machine_param = "";
    if (machineName === "TEXCOR") {
      machine_param = "BL1";
    } else {
      machine_param = "BL2";
    }
    try {
      const token = localStorage.getItem("token");
      const numberShift = convertShiftValue(shift);
      let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getDrygoodsStoppageDetailsF003?date=${date}&shift=${numberShift}&order_no=${value}&machine_name=${machine_param}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("datavalues", data);

      // console.log("Summary Get List",data)
      if (data && data.length >= 0) {
        setstoppagedata(data);
        console.log("setstoppage", data);
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.data.message);
    } finally {
    }
  };
  const formattedDate = () => {
    if (planingDetailsByDate?.hod_submit_on) {
      const date = moment(planingDetailsByDate?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate_operator = () => {
    if (planingDetailsByDate?.operator_submitted_on) {
      const date = moment(planingDetailsByDate?.operator_submitted_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (planingDetailsByDate?.supervisor_submit_on) {
      const date = moment(planingDetailsByDate?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  //fetch Machine name
  const fetchDataMachineNumber = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/drygoods/getDrygoodsOrderNoLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          const data = res.data.map((laydownno) => laydownno);
          setbatchno(data);
          setbatchno2(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // order based details

  const handlecan_no = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].can_no = value;
    setRows(updatedRows);
  };
  const handlenet_weight_kg = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].net_weight_kg = value;
    setRows(updatedRows);
  };
  const handleGrams_mtrs = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].gram_or_mtrs = value;
    setRows(updatedRows);
  };
  const handleCarding_MC_No = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].carding_mc_no = value;
    setRows(updatedRows);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleBase === "ROLE_OPERATOR") {
      if (
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status === "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      }
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleBase == "ROLE_OPERATOR") {
      if (selectedRow?.operator_status == "OPERATOR_APPROVED") {
        return "none";
      } else if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status == "WAITING_FOR_APPROVAL" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canEdit = () => {
    if (roleBase === "ROLE_OPERATOR") {
      return !(
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status !== "HOD_REJECTED"
      );
    } else if (roleBase === "ROLE_SUPERVISOR") {
      return !(
        (selectedRow &&
          selectedRow?.operator_status === "OPERATOR_APPROVED" &&
          (selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
            selectedRow?.supervisor_status === "WAITING_FOR_APPROVAL") &&
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
        "HOD_APPROVED"
      );
    } else if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        (selectedRow?.hod_status === "HOD_APPROVED" ||
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };
  const isEditable = canEdit();
  const canDisplayAddDelete = () => {
    if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      return "none";
    }
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/drygoods/DailyProductionCottonBallsF003/approveOrReject`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-03/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/drygoods/DailyProductionCottonBallsF003/approveOrReject`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/DryGoods/F-03/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const containerStyle = {
    position: "relative",
    // marginLeft:'60px',
  };

  const handleSave = async () => {
    try {
      await sendContaminationCheck2();
    } catch (error) {
      console.error("Error saving Daily Production - Cotton Balls:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await sendContaminationCheck();
    } catch (error) {
      console.error("Error submitting Daily Production - Cotton Balls", error);
    }
  };

  const sendContaminationCheck2 = async () => {
    const boxtotal =
      Number(Box1 || 0) +
      Number(Box2 || 0) +
      Number(Box3 || 0) +
      Number(Box4 || 0) +
      Number(Box5 || 0) +
      Number(Box6 || 0) +
      Number(Box7 || 0) +
      Number(Box8 || 0);
    const bagtotal =
      Number(Bags1 || 0) +
      Number(Bags2 || 0) +
      Number(Bags3 || 0) +
      Number(Bags4 || 0) +
      Number(Bags5 || 0) +
      Number(Bags6 || 0) +
      Number(Bags7 || 0) +
      Number(Bags8 || 0);
    console.log("id", planId);
    setSaveLoading(true);

    try {
      const payload = {
        cottonballs_id: Id,
        formatName: "Daily Production - Cotton Balls",
        formatNo: "PH-PRD04/F-003",
        revisionNo: "01",
        sopNumber: "PH-PRD04-D-03",
        unit: "H",
        shift: shift,
        machine_name: machineName,
        order_no: batchNolist || order_no,
        product_name: Product,
        coustomer_name: customer_Name,
        sale_order_no: Sale_Order_No || 0,
        ball_or_bag: Ball_Bag || 0,
        brand: Brand,
        bag_or_box: Bag_Box || 0,
        cutting_length: Cutting_Length || 0,
        feed_roller: Feed_Roller_percentage || 0,
        cutting_roller: Cutting_Roller || 0,
        sliver_weight_grams: Sliver_Weight || 0,
        ball_weight_grams: Ball_weight || 0,
        bag_counts: count_Bags || 0,
        std_bags_per_hr: std_Bags || 0,
        bag_hour1: Bags1 || 0,
        bag_hour2: Bags2 || 0,
        bag_hour3: Bags3 || 0,
        bag_hour4: Bags4 || 0,
        bag_hour5: Bags5 || 0,
        bag_hour6: Bags6 || 0,
        bag_hour7: Bags7 || 0,
        bag_hour8: Bags8 || 0,
        box_hour1: Box1 || 0,
        box_hour2: Box2 || 0,
        box_hour3: Box3 || 0,
        box_hour4: Box4 || 0,
        box_hour5: Box5 || 0,
        box_hour6: Box6 || 0,
        box_hour7: Box7 || 0,
        box_hour8: Box8 || 0,
        box_total_hour: boxtotal || 0,
        bag_total_hour: bagtotal || 0,
        sliver_weight_kg: silver_weight_kg || 0,
        ball_weight_kg: Ball_weight_kg || 0,

        date: date,

        sliverreceiptdetails: rows.map((row) => ({
          can_no: row.can_no || "NA",
          gram_or_mtrs: row.gram_or_mtrs,
          carding_mc_no: row.carding_mc_no,
          net_weight_kg: row.net_weight_kg || 0,
          sliver_id: row.sliver_id,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/drygoods/saveDailyProductionCottonBallsF003`,
        payload,
        { headers }
      );
      // console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/DryGoods/F-03/Summary");
      }, 1500);
      message.success("Daily Production - Cotton Balls Saved Successfully..");
      setSaveLoading(false);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      setSaveLoading(false);
      throw new Error("Failed to save Daily Production - Cotton Balls !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const sendContaminationCheck = async () => {
    setSubmitLoading(true);

    console.log("batchNolist", batchNolist);
    const isValid = () => {
      if (!order_no) return "Order No is required";
      setSubmitLoading(false);
      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    const boxtotal =
      Number(Box1 || 0) +
      Number(Box2 || 0) +
      Number(Box3 || 0) +
      Number(Box4 || 0) +
      Number(Box5 || 0) +
      Number(Box6 || 0) +
      Number(Box7 || 0) +
      Number(Box8 || 0);
    const bagtotal =
      Number(Bags1 || 0) +
      Number(Bags2 || 0) +
      Number(Bags3 || 0) +
      Number(Bags4 || 0) +
      Number(Bags5 || 0) +
      Number(Bags6 || 0) +
      Number(Bags7 || 0) +
      Number(Bags8 || 0);
    try {
      const payload = {
        cottonballs_id: Id,
        formatName: "Daily Production - Cotton Balls",
        formatNo: "PH-PRD04/F-003",
        revisionNo: "01",
        sopNumber: "PH-PRD04-D-03",
        unit: "H",
        shift: shift,
        machine_name: machineName,
        order_no: batchNolist || order_no,
        coustomer_name: customer_Name,
        sale_order_no: Sale_Order_No || 0,
        ball_or_bag: Ball_Bag || 0,
        brand: Brand,
        bag_or_box: Bag_Box || 0,
        cutting_length: Cutting_Length || 0,
        feed_roller: Feed_Roller_percentage || 0,
        cutting_roller: Cutting_Roller || 0,
        sliver_weight_grams: Sliver_Weight || 0,
        ball_weight_grams: Ball_weight || 0,
        bag_counts: count_Bags || 0,
        std_bags_per_hr: std_Bags || 0,
        product_name: Product,
        bag_hour1: Bags1 || 0,
        bag_hour2: Bags2 || 0,
        bag_hour3: Bags3 || 0,
        bag_hour4: Bags4 || 0,
        bag_hour5: Bags5 || 0,
        bag_hour6: Bags6 || 0,
        bag_hour7: Bags7 || 0,
        bag_hour8: Bags8 || 0,
        box_hour1: Box1 || 0,
        box_hour2: Box2 || 0,
        box_hour3: Box3 || 0,
        box_hour4: Box4 || 0,
        box_hour5: Box5 || 0,
        box_hour6: Box6 || 0,
        box_hour7: Box7 || 0,
        box_hour8: Box8 || 0,
        box_total_hour: bagtotal || 0,
        bag_total_hour: boxtotal || 0,
        sliver_weight_kg: silver_weight_kg || 0,
        ball_weight_kg: Ball_weight_kg || 0,
        //reason: "Routine Production",

        date: date,

        sliverreceiptdetails: rows.map((row) => ({
          can_no: row.can_no || "NA",
          gram_or_mtrs: row.gram_or_mtrs,
          carding_mc_no: row.carding_mc_no,
          net_weight_kg: row.net_weight_kg || 0,
          sliver_id: row.sliver_id,
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/drygoods/submitDailyProductionCottonBallsF003`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/DryGoods/F-03/Summary");
      }, 1500);
      setSubmitLoading(false);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      setSubmitLoading(false);

      throw new Error("Failed to submit Daily Production - Cotton Balls!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/DryGoods/F-03/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
    fetchDataMachineNumber();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/drygoods/getdetailsbyParamF003?date=${date}&shift=${shift}&machine_name=${machineName}&order_no=${order_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response weight", response.data?.sliver_weight_grams);
      setemptyarraycheck(response.data?.length);
      setPlaningDetailsByDate(response.data);
      setSelectedRow(response.data);

      console.log("cottonballsid", response.data?.cottonballs_id);
      console.log(
        " fetchData_StoppageDetails_edit",
        response.data.machine_name
      );
      if (response?.data) {
        fetchData_StoppageDetails_edit(response.data);
        setBags1(response.data?.bag_hour1);
        setBags2(response.data?.bag_hour2);
        setBags3(response.data?.bag_hour3);
        setBags4(response.data?.bag_hour4);
        setBags5(response.data?.bag_hour5);
        setBags6(response.data?.bag_hour6);
        setBags7(response.data?.bag_hour7);
        setBags8(response.data?.bag_hour8);
        setBagTotal(response.data?.bag_total_hour);
        setBox1(response.data?.box_hour1);
        setBox2(response.data?.box_hour2);
        setBox3(response.data?.box_hour3);
        setBox4(response.data?.box_hour4);
        setBox5(response.data?.box_hour5);
        setBox6(response.data?.box_hour6);
        setBox7(response.data?.box_hour7);
        setBox8(response.data?.box_hour8);
        setBoxTotal(response.data?.box_total_hour);
        setplanId(response.data?.cottonballs_id);
        setId(response.data?.cottonballs_id);
        setProduct(response.data?.product_name);
        setcustomer_Name(response.data?.coustomer_name);
        setSale_Order_No(response.data?.sale_order_no);
        setBag_Box(response.data?.bag_or_box);
        setBrand(response.data?.brand);
        setBall_Bag(response.data?.ball_or_bag);
        setstd_Bags(response.data?.std_bags_per_hr);
        setCutting_Length(response.data?.cutting_length);
        setCutting_Roller(response.data?.cutting_roller);
        setFeed_Roller_percentage(response.data?.feed_roller);
        setsilver_weight_kg(response.data?.sliver_weight_kg);
        setBall_weight_kg(response.data?.ball_weight_kg);
        setSliver_Weight(response.data?.sliver_weight_grams);
        setBall_weight(response.data?.ball_weight_grams);
        setcount_Bags(response.data?.bag_counts);
        setBatchNolist(response.data?.order_no);
        console.log("responsedata", response.data);
        console.log("responsedata", response.data?.sliverreceiptdetails);

        setcustomer_Name(response.data.coustomer_name);
      } else {
        fetchData_drygoodsdetailsDetails(order_no);
        // fetchCustomerName(order_no);
      }

      if (roleBase === "ROLE_SUPERVISOR") {
        if (
          response.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          response.data?.hod_status === "HOD_REJECTED"
        ) {
          message.warning(
            "Operator Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/DryGoods/F-03/Summary");
          }, 1500);
        }
      }

      if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
        if (
          response.data?.operator_status !== "OPERATOR_APPROVED" ||
          response.data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
          response.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          response.data?.hod_status === "HOD_REJECTED"
        ) {
          message.warning(
            "Operator Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/DryGoods/F-03/Summary");
          }, 1500);
        }
      }

      if (response.data) {
        const data = response.data;
        setplanId(data.planId);

        if (data.sliverreceiptdetails) {
          setRows(
            data.sliverreceiptdetails.map((item) => ({
              can_no: item.can_no,
              gram_or_mtrs: item.gram_or_mtrs,
              carding_mc_no: item.carding_mc_no,
              net_weight_kg: item.net_weight_kg,
              sliver_id: item.sliver_id,
            }))
          );
        } else {
          setRows([]);
        }
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    }
  };
  const fetchData_StoppageDetails_edit = async (value) => {
    if (value) {
      let machincevalue;
      try {
        console.log("valuesss", value.order_no);
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const numberShift = convertShiftValue(value.shift);
        console.log("value.machine_name", value.machine_name);
        if (value.machine_name == "TEXCOR") {
          machincevalue = "BL1";
        } else {
          machincevalue = "BL2";
        }
        console.log("value of batch", batchNolist);
        let apiUrl = `${API.prodUrl}/Precot/api/drygoods/getDrygoodsStoppageDetailsF003?date=${date}&shift=${numberShift}&order_no=${value.order_no}&machine_name=${machincevalue}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("datavalues", data);

        // console.log("Summary Get List",data)
        if (data && data.length >= 0) {
          setstoppagedata(data);
          console.log("setstoppage", data);
        } else {
          message.error(data.message);
          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.data.message);
      } finally {
      }
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Machine Parameters:</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                1. Machine Parameters:
              </th>
            </tr>
            <tr>
              <th colSpan={10}>Cutting Length in mm</th>
              <th colSpan={10}>Feed Roller Speed in %</th>
              <th colSpan={20}>Cutting Roller Speed in %</th>
              <th colSpan={25}>Sliver Weight in Grams</th>
              <th colSpan={15}>Ball Weight in Grams</th>
              <th colSpan={10}>Counts / Bag</th>
              {/* <th colSpan={10}>Std. Bags/Hr</th> */}
            </tr>
            <tr>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Cutting_Length}
                  onChange={(e) => setCutting_Length(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Feed_Roller_percentage}
                  onChange={(e) => setFeed_Roller_percentage(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={20}>
                <input
                  type="number"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Cutting_Roller}
                  onChange={(e) => setCutting_Roller(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={25}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Sliver_Weight}
                  onChange={(e) => setSliver_Weight(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={15}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Ball_weight}
                  onChange={(e) => setBall_weight(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={count_Bags}
                  onChange={(e) => setcount_Bags(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td>
              {/* <td colSpan={10}>
                <input
                  type="number"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={std_Bags}
                  onChange={(e) => setstd_Bags(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  min="0"
                />
              </td> */}
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Sliver Receipt</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                2. Sliver Receipt:
              </th>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                S. No.
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                Can No.
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                Grams/ MTRS
              </th>
              <th colSpan="30" style={{ height: "35px", textAlign: "center" }}>
                Carding M/C No.
              </th>
              <th colSpan="20" style={{ height: "35px", textAlign: "center" }}>
                Net Wt in Kg
              </th>
              <th
                colSpan="5"
                style={{
                  height: "35px",
                  textAlign: "center",
                  display: canDisplayAddDelete(),
                }}
              >
                Delete
              </th>
            </tr>
            {/* array....... */}

            {rows.map((row, index) => (
              <tr key={index}>
                <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td colSpan="20">
                  <input
                    type="text"
                    className="inp-new"
                    style={{
                      width: "90%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    value={row.can_no}
                    onChange={(e) => handlecan_no(e.target.value, index)}
                    // onKeyDown={(e) => handleKeyDown_text(e, index)}
                    disabled={!isEditable}
                  />
                </td>

                <td
                  colSpan="20"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <Input
                    type="text"
                    value={row.gram_or_mtrs}
                    onChange={(e) => handleGrams_mtrs(e.target.value, index)}
                    style={{ width: "100%" }}
                    disabled={!isEditable}
                    onKeyDown={(e) => handleKeyDown_text(e, index)}
                    placeholder="  Grams/ MTRS"
                  />
                </td>
                <td
                  colSpan="30"
                  style={{ height: "35px", textAlign: "center" }}
                >
                  <Select
                    value={row.carding_mc_no}
                    onChange={(value) => handleCarding_MC_No(value, index)}
                    style={{ width: "100%" }}
                    disabled={!isEditable}
                    placeholder="Carding M/C No"
                  >
                    <Select.Option value="" disabled selected>
                      Carding M/C No.
                    </Select.Option>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                  </Select>
                </td>
                <td colSpan="20">
                  <input
                    type="text"
                    className="inp-new"
                    style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                    value={row.net_weight_kg}
                    onChange={(e) => handlenet_weight_kg(e.target.value, index)}
                    // onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={!isEditable}
                  />
                </td>

                <td
                  colSpan="5"
                  style={{
                    height: "35px",
                    textAlign: "center",
                    cursor: isEditable ? "pointer" : "not-allowed",
                    size: "40px",
                    display: canDisplayAddDelete(),
                    opacity: isEditable ? 1 : 0.5, // Visual cue for disabled state
                  }}
                  onClick={isEditable ? () => handleDeleteRow(index) : null} // Only assign the handler if editable
                >
                  <DeleteOutlined
                    style={{ fontSize: "24px", color: "#ff4d4f" }}
                  />
                </td>
              </tr>
            ))}
          </table>

          <button
            onClick={handleAddRow}
            style={{
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isEditable ? 1 : 0.5,
              display: canDisplayAddDelete(),
              cursor: isEditable ? "pointer" : "not-allowed",
            }}
            disabled={!isEditable}
          >
            <PlusOutlined style={{ marginRight: "8px" }} />
            Add Row
          </button>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Out Put Details</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="100" style={{ textAlign: "left" }}>
                OutPut Details:
              </th>
            </tr>
            <tr>
              <th colSpan={10}>Hours</th>
              <th colSpan={10}>1</th>
              <th colSpan={10}>2</th>
              <th colSpan={10}>3</th>
              <th colSpan={10}>4</th>
              <th colSpan={10}>5</th>
              <th colSpan={10}>6</th>
              <th colSpan={10}>7</th>
              <th colSpan={10}>8</th>
              <th colSpan={10}>Total</th>
            </tr>

            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Box
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box1}
                  onChange={(e) => handleBoxChange(e.target.value, setBox1)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box2}
                  onChange={(e) => handleBoxChange(e.target.value, setBox2)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box3}
                  onChange={(e) => handleBoxChange(e.target.value, setBox3)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box4}
                  onChange={(e) => handleBoxChange(e.target.value, setBox4)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box5}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                  onChange={(e) => handleBoxChange(e.target.value, setBox5)}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box6}
                  onChange={(e) => handleBoxChange(e.target.value, setBox6)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box7}
                  onChange={(e) => handleBoxChange(e.target.value, setBox7)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Box8}
                  onChange={(e) => handleBoxChange(e.target.value, setBox8)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  max={0}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={calculateTotal_box()}
                  onChange={(e) => setBoxTotal(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  max={0}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Bags
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags1}
                  disabled={!isEditable}
                  onChange={(e) => handleBagChange(e.target.value, setBags1)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags2}
                  onChange={(e) => handleBagChange(e.target.value, setBags2)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags3}
                  onChange={(e) => handleBagChange(e.target.value, setBags3)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags4}
                  onChange={(e) => handleBagChange(e.target.value, setBags4)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags5}
                  onChange={(e) => handleBagChange(e.target.value, setBags5)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags6}
                  onChange={(e) => handleBagChange(e.target.value, setBags6)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags7}
                  onChange={(e) => handleBagChange(e.target.value, setBags7)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={Bags8}
                  onChange={(e) => handleBagChange(e.target.value, setBags8)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  disabled={!isEditable}
                />
              </td>
              <td colSpan={10}>
                <input
                  type="text"
                  className="inp-new"
                  style={{ width: "90%", height: "35px", paddingLeft: "2px" }}
                  value={calculateTotal()}
                  onChange={(e) => setBagTotal(e.target.value)}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  max={0}
                  disabled={!isEditable}
                />
              </td>
            </tr>
            <tr>
              <th rowSpan={2} colSpan={40}>
                Waste in Kg:
              </th>
              <th colSpan={30}>Sliver weight in Kg</th>
              <th colSpan={30}>Ball Weight in Kg</th>
            </tr>
            <tr>
              <th colSpan={30}>
                {" "}
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={silver_weight_kg}
                  onChange={(e) => setsilver_weight_kg(e.target.value)}
                  disabled={!isEditable}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  min="0"
                />
              </th>
              <th colSpan={300}>
                <input
                  type="text"
                  className="inp-new"
                  style={{
                    width: "98%",
                    border: "none",
                    height: "35px",
                    paddingLeft: "2px",
                  }}
                  value={Ball_weight_kg}
                  onChange={(e) => setBall_weight_kg(e.target.value)}
                  disabled={!isEditable}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  min="0"
                />
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "5",
      label: <p>Stoppage</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <thead>
              <tr>
                <th colSpan={25}>Nature Of Problem</th>
                <th colSpan={25}>Stop. Time</th>
                <th colSpan={25}>Restart Time</th>
                <th colSpan={25}>Idle Time (in Min)</th>
                <th colSpan={25}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {(stoppagedata || []).map((item, index) => (
                <tr key={index}>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.SCAUSE}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.FTime}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.TTime}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.TotHrs}
                  </td>
                  <td colSpan={25} style={{ textAlign: "center" }}>
                    {item.Remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "6",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="30" style={{ height: "35px", textAlign: "center" }}>
                Operator Sign & Date
              </td>
              <td colSpan="35" style={{ textAlign: "center" }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="35" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="30"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {planingDetailsByDate?.operator_status ===
                  "OPERATOR_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{planingDetailsByDate?.operator_sign}</div>
                        <div>{formattedDate_operator()}</div>
                      </div>
                      {getImage3 && (
                        <img
                          src={getImage3}
                          alt="Supervisor Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>
              <td
                colSpan="35"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {(planingDetailsByDate?.supervisor_status ===
                  "SUPERVISOR_APPROVED" ||
                  planingDetailsByDate?.supervisor_status ===
                    "SUPERVISOR_REJECTED" ||
                  planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
                  planingDetailsByDate?.hod_status === "HOD_REJECTED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{planingDetailsByDate?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Supervisor Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>
              {/* <td colSpan="50" style={{ textAlign: "center"}}>{planingDetailsByDate.hod_sign}<br/>{formattedDate()}
              </td> */}
              <td
                colSpan="35"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(planingDetailsByDate?.hod_status === "HOD_REJECTED" ||
                  planingDetailsByDate?.hod_status === "HOD_APPROVED") && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{planingDetailsByDate.hod_sign}</div>
                        <div>{formattedDate()}</div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="HOD Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                    </div>{" "}
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const formatName = "CONTAMINATION CHECKING REPORT(Absorbent Bleached Cotton)";
  const formatNo = "PRD01/F-18";
  const revisionNo = "02";
  const sopNo = "PRD01-D-09";

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="Daily Production - Cotton Balls"
        formatNo="PH-PRD04/F-003"
        sopNo="PH-PRD04-D-03"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(roleBase === "ROLE_HOD" ||
          roleBase === "ROLE_SUPERVISOR" ||
          roleBase === "ROLE_QC" ||
          roleBase === "ROLE_DESIGNEE"
            ? [
                <Button
                  key="approve"
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
                  icon={<img src={approveIcon} alt="Approve Icon" />}
                >
                  &nbsp;Approve
                </Button>,
                <Button
                  key="reject"
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
                </Button>,
              ]
            : [
                <Button
                  key="save"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButton2(),
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={submitLoading}
                  type="primary"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<GrDocumentStore color="#00308F" />}
                  shape="round"
                >
                  Submit
                </Button>,
              ]),
          <Button
            key="logout"
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
                navigate("/Precot"); // Ensure navigate is defined or imported
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
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
          </Modal>,
        ]}
      />

      {/* date row */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Machince Name:"
          placeholder="Machince Name"
          type="text"
          value={machineName}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />

        <Input
          addonBefore="Date:"
          placeholder="Date"
          type="text"
          // max ={ formattedToday }
          value={datefomrat}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="Shift:"
          placeholder="Shift"
          type="text"
          // max ={ formattedToday }
          value={shift}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "30%",
            height: "35px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0px 10px",
              border: "1px solid #d9d9d9",
              borderRight: "none",
              borderRadius: "2px 0 0 2px",
              backgroundColor: "#f5f5f5",
              fontSize: "13px",
              height: "100%",
              width: "100px",
            }}
          >
            Order No:
          </span>
          <Select
            style={{ width: "150px", height: "100%" }}
            placeholder="Select Order No"
            value={order_no || batchNolist}
            // onChange={handleChangeOrderNo}
            showSearch
            disabled
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Product:"
          placeholder="Product"
          type="text"
          // max ={ formattedToday }
          value={Product}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="Customer Name:"
          placeholder="Customer Name"
          type="text"
          onChange={(e) => {
            setcustomer_Name(e.target.value);
          }}
          value={customer_Name}
          style={{ width: "30%", height: "35px" }}
          disabled={!isEditable}
        />
        <Input
          addonBefore="Ball/Bag:"
          placeholder="Ball/Bag"
          type="text"
          // max ={ formattedToday }
          value={Ball_Bag}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Sale Order No:"
          placeholder="Sale Order No"
          type="text"
          // max ={ formattedToday }
          value={Sale_Order_No}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="Brand:"
          placeholder="Brand"
          type="text"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          // max ={ formattedToday }
          value={Brand}
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="Bag/Box:"
          placeholder="Bag/Box"
          type="text"
          // max ={ formattedToday }
          value={Bag_Box}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
      </div>
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
        // onChange={onChange}
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

export default DryGoods_f03;
