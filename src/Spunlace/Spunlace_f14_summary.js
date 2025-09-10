/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../baseUrl.json";

import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Row,
  Avatar,
  Col,
  Drawer,
  message,
  Input,
  notification,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import logo from "../Assests/logo.png";
const { Option } = Select;
const roleBase = localStorage.getItem("role");
const Spunlace_f14_summary = () => {
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [chunkedData, setchunkeData] = useState([]);
  const [chunkedData_array, setchunkeData_array] = useState([]);
  const [totalweight, settotalweight] = useState(0);
  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMR No");
  const [cakingData, setCakingData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [dateformat, setdateformat] = useState("");
  const [shiftprintdata, setshiftprintdata] = useState("");
  const [ordernodataprint, setOrderdataprint] = useState("");
  const [printResponseData, setPrintResponseData] = useState("");
  const [rpmixingprintData, setrpmixingprintData] = useState("");
  const [printRecord, setPrintRecord] = useState([]);
  const [Shiftnumber, setShiftnumber] = useState([]);
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] = useState("");
  const [availableshift2, setAvailableShifts2] = useState([]);
  const [availableshiftlov2, setAvailableShiftslov2] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [batchno2, setbatchno2] = useState([]);
  const [batchNolist2, setBatchNolist2] = useState("Select Order No");
  const [batchno, setbatchno] = useState([]);
  const [batchNolist, setBatchNolist] = useState("Select Order No");
  const [date, setdate] = useState("");
  const [date1, setdate1] = useState("");
  const [id, setid] = useState("");
  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState("");
  const [OperatorSign, setOperatorSign] = useState("");
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState("");
  const [Operatorstatus, setOperatorstatus] = useState("");
  const [SupervisorStatus, setSupervisorStatus] = useState("");
  const [HodStatus, setHodStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const role = localStorage.getItem("role");
  const [messageApi, contextHolder] = message.useMessage();
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [reason, setReason] = useState(false);
  const [getData, setGetData] = useState([]);
  const data1 = [
    { id: 1, name: "John", age: 28 },
    { id: 2, name: "Jane", age: 32 },
    { id: 3, name: "Doe", age: 24 },
  ];

  const data2 = [
    { id: 1, city: "New York", country: "USA" },
    { id: 2, city: "London", country: "UK" },
    { id: 3, city: "Paris", country: "France" },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formattedOperatorDate = OperatorSubmitOn
    ? moment(OperatorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedSupervisorDate = SupervisorSubmitOn
    ? moment(SupervisorSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = HodSubmitOn
    ? moment(HodSubmitOn).format("DD/MM/YYYY HH:mm")
    : "";

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchDataShift();
  }, []);
  const fetchDataBy_status = async (value) => {
    const convertedShiftValue = convertShiftValue(availableshiftlov2);
    console.log("availableshift", convertedShiftValue);
    // const dateformat = moment(newdate).format("DD/MM/YYYY");

    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/report/fetchRPProdReport?order=${value}&shift=${availableshiftlov2}&date=${date1}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const data = res.data.map((laydownno) => laydownno.value);
            // console.log("data format -status", res.data[0].operator_status);
            // setOperatorstatus(res.data[0].operator_status);
            // setSupervisorStatus(res.data[0].supervisor_status);
            // setHodStatus(res.data[0].hod_status);
            setSelectedRow(res.data[0]);
            setid(res.data[0].id);
            const datefomrat = moment(res.data[0].date).format("DD/MM/YYYY");
            setdateformat(datefomrat);
            setshiftprintdata(res.data[0].shift);
            setOrderdataprint(res.data[0].orderNo);
            setrpmixingprintData(res.data[0].rp_mixing);

            setSupervisorSubmitOn(res.data[0].supervisor_submit_on);
            setOperatorSubmitOn(res.data[0].operator_submitted_on);
            setHodSubmitOn(res.data[0].hod_submit_on);
            setOperatorSign(res.data[0].operator_sign);
            setOperatorstatus(res.data[0].operator_status);
            setHodStatus(res.data[0].hod_status);
            setHodSign(res.data[0].hod_sign);
            setSupervisorStatus(res.data[0].supervisor_sign);
            // setbatchno(data);
            // setbatchno2(data);

            setSupervisorSign(res.data[0].supervisor_sign);
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0].operator_sign}`,
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
                setGetImageOP(url);
              })
              .catch((err) => {
                console.log("Error in fetching image:", err);
              });

            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0].supervisor_sign}`,
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
                setGetImageSUP(url);
              })
              .catch((err) => {
                console.log("Error in fetching image:", err);
              });
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data[0].hod_sign}`,
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
                setGetImageHOD(url);
              })
              .catch((err) => {
                console.log("Error in fetching image:", err);
              });
          }
          // console.log("Shift details fetched:", res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchdataSummary_f003 = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/report/SummarydetailsF014`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const a = response.data;
      setGetData(response.data);
      setnewData(response.data);
      setmodalData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      if (localStorage.getItem("role") === "ROLE_OPERATOR") {
        fetchdataSummary_f003();
      } else if (localStorage.getItem("role") === "ROLE_SUPERVISOR") {
        fetchdataSummary_f003();
      } else if (
        localStorage.getItem("role") === "ROLE_HOD" ||
        localStorage.getItem("role") === "ROLE_DESIGNEE"
      ) {
        fetchdataSummary_f003();
      }
    }
  }, [token]);

  const handleChange_getbatch = (event) => {
    setAvailableBMRnoLov(event.target.value);
  };
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
  const handleprint_section = async (value) => {
    fetchDataBy_status(value);
    setBatchNolist2(value);

    console.log(availableshiftlov);
    const convertedShiftValue = convertShiftValue(availableshiftlov2);
    console.log("availableshift", convertedShiftValue);

    axios
      .get(
        `${API.prodUrl}/Precot/api/spulance/baleWeight?order=${value}&shift=${convertedShiftValue}&date=${date1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setPrintResponseData(res.data);
          const flattenedData = res.data.reduce((acc, item) => {
            acc.push(item.BaleNo, item.NetWt);
            return acc;
          }, []);
          const totalWeight = res.data.reduce(
            (sum, item) => sum + parseFloat(item.NetWt),
            0
          );
          settotalweight(totalWeight);
          const chunkArray = (array, chunkSize) => {
            const result = [];
            for (let i = 0; i < array.length; i += chunkSize) {
              result.push(array.slice(i, i + chunkSize));
            }
            return result;
          };

          // Chunk the flattened data into rows of 4 items
          const chunkedData = chunkArray(flattenedData, 6);
          setchunkeData(chunkedData);
          message.success("Data Fetched Successfully...!");
          // setbatchno(data);
          // setbatchno2(data);
          // setPrintLaydown(value);
          setIsFetchSuccessful(true);
        } else {
          setPrintResponseData([]);
          message.error("No data found...!");
          setBatchNolist2(null);
          setIsFetchSuccessful(false);

          return;
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        console.log("Error", err);
        notification.warning({
          message: "Notification",
          description: err.response.data.message,
        });
      });
  };

  const fetchdata = async (value) => {
    const convertedShiftValue = convertShiftValue(availableshiftlov);
    console.log("availableshift", convertedShiftValue);

    axios
      .get(
        `${API.prodUrl}/Precot/api/spulance/baleWeight?order=${value}&shift=${convertedShiftValue}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setPrintResponseData(res.data);
          const flattenedData = res.data.reduce((acc, item) => {
            acc.push(item.BaleNo, item.NetWt);
            return acc;
          }, []);
          const totalWeight = res.data.reduce(
            (sum, item) => sum + parseFloat(item.NetWt),
            0
          );
          settotalweight(totalWeight);
          const chunkArray = (array, chunkSize) => {
            const result = [];
            for (let i = 0; i < array.length; i += chunkSize) {
              result.push(array.slice(i, i + chunkSize));
            }
            return result;
          };

          // Chunk the flattened data into rows of 4 items
          const chunkedData = chunkArray(flattenedData, 6);
          setchunkeData(chunkedData);
          setchunkeData_array(chunkedData.length);
          if (chunkedData.length === 0) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }

          message.success("Fetched Data Successfully...!");
          // setbatchno(data);
          // setbatchno2(data);
          // setPrintLaydown(value);
        } else {
          setPrintResponseData([]);

          if (chunkedData_array == 0) {
            message.error("no data found...!");
          }
          setBatchNolist2(null);
          setdate(null);
          setAvailableShiftslov(null);
          setBatchNolist(null);
          return;
        }
      })
      .catch((err) => {
        setPrintResponseData([]);
        console.log("Error", err);
        notification.warning({
          message: "Notification",
          description: err.response.data.message,
        });
      });
  };
  const handleAvailableBMRnoLovChange = (value) => {
    setAvailableBMRnoLov(value);
    setBatchNolist(null); // Clear the batch number list
    // Assuming this is an existing function to fetch data
  };
  const fetchDataShift = async () => {
    try {
      setLoading(true);
      axios
        .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const shifts = res.data.map((shift) => shift.value);
          console.log("Shift Value", shifts);

          const convertShiftValue = (shift) => {
            switch (shift) {
              case "I":
                return 1;
              case "II":
                return 2;
              case "III":
                return 3;
              default:
                return shift;
            }
          };

          // Map over the shifts array to convert each value
          const convertedShifts = shifts.map((shift) =>
            convertShiftValue(shift)
          );
          console.log("Converted Shift Value", convertedShifts);

          setAvailableShifts(shifts);
          setShiftnumber(convertedShifts);

          setAvailableShifts2(shifts);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataOrderNumber = async () => {
      let shiftparam = "";
      if (availableshiftlov == "I") {
        shiftparam = "1";
      } else if (availableshiftlov == "II") {
        shiftparam = "2";
      } else if (availableshiftlov == "III") {
        shiftparam = "3";
      }
      try {
        setLoading(true);
        axios
          .get(
            `${API.prodUrl}/Precot/api/spulance/ordersRbBale?date=${date}&shift=${shiftparam}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            // console.log("Shift details fetched:", res.data);
            const data = res.data.map((laydownno) => laydownno.value);
            console.log("data format", data);
            const flattenedData = res.data.reduce((acc, item) => {
              acc.push(item.id, item.value);
              return acc;
            }, []);
            const totalWeight = parseFloat(
              res.data
                .reduce((sum, item) => sum + parseFloat(item.value), 0)
                .toFixed(3)
            );

            settotalweight(totalWeight);
            const chunkArray = (array, chunkSize) => {
              const result = [];
              for (let i = 0; i < array.length; i += chunkSize) {
                result.push(array.slice(i, i + chunkSize));
              }
              return result;
            };

            // Chunk the flattened data into rows of 4 items
            const chunkedData = chunkArray(flattenedData, 6);
            setchunkeData(chunkedData);

            setbatchno(data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (date && availableshiftlov) {
      fetchDataOrderNumber();
    }
  }, [date, availableshiftlov]);

  useEffect(() => {
    const fetchDataOrderNumber2 = async () => {
      let shiftparam = "";
      if (availableshiftlov2 == "I") {
        shiftparam = "1";
      } else if (availableshiftlov2 == "II") {
        shiftparam = "2";
      } else if (availableshiftlov2 == "III") {
        shiftparam = "3";
      }
      try {
        setLoading(true);
        axios
          .get(
            `${API.prodUrl}/Precot/api/spulance/ordersRbBale?date=${date1}&shift=${shiftparam}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            // console.log("Shift details fetched:", res.data);
            const data = res.data.map((laydownno) => laydownno.value);
            console.log("data format", data);
            const flattenedData = res.data.reduce((acc, item) => {
              acc.push(item.id, item.value);
              return acc;
            }, []);
            const totalWeight = parseFloat(
              res.data
                .reduce((sum, item) => sum + parseFloat(item.value), 0)
                .toFixed(3)
            );

            settotalweight(totalWeight);
            const chunkArray = (array, chunkSize) => {
              const result = [];
              for (let i = 0; i < array.length; i += chunkSize) {
                result.push(array.slice(i, i + chunkSize));
              }
              return result;
            };

            // Chunk the flattened data into rows of 4 items
            const chunkedData = chunkArray(flattenedData, 6);
            setchunkeData(chunkedData);

            setbatchno2(data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (date1 && availableshiftlov2) {
      fetchDataOrderNumber2();
    }
  }, [date1, availableshiftlov2]);

  const handleGo = async () => {
    console.log("ddddd", availableBMRno, batchNolist, date);

    if (date == null || date == "[]" || date.length == 0) {
      message.warning("Please Select Date");
      return;
    } else if (
      availableshiftlov == null ||
      availableshiftlov == "[]" ||
      availableshiftlov.length == 0 ||
      availableshiftlov == "Select Shift"
    ) {
      message.warning("Please Select Shift");
      return;
    } else if (
      batchNolist == null ||
      batchNolist == "" ||
      batchNolist == "Select Order No"
    ) {
      message.warning("Please Select OrderNo");
      return;
    }

    navigate("/Precot/Spunlace/F-14", {
      state: {
        newdate: date,
        shiftvalue: availableshiftlov,
        orderNo: batchNolist,
        shiftNo: Shiftnumber,
      },
    });
  };
  const handleorderno = (value) => {
    setBatchNolist(value); // Update the selected value in state
    console.log("Selected Batch No:", value);
    fetchdata(value); // Optional: log the selected value
  };

  const handleViewDetails = (record) => {
    const x = newData.filter((x, i) => {
      return record.headerID === x.header_id;
    });
    setSelectedRow(x);
    setIsModalVisible(true);
  };
  const handlebatchchange = (value) => {
    console.log("Selected value:", value);
    setBatchNolist2(value);
    handleprint_section(value);
  };

  const handleEdit = (record) => {
    console.log("wer", record);
    const x = newData.filter((x) => {
      return record.id === x.id;
    });

    if (x.length > 0) {
      const firstElement = x[0];
      console.log("x", firstElement);
      const dateformat = moment(firstElement.date).format("YYYY-MM-DD");
      navigate("/Precot/Spunlace/F-14", {
        state: {
          newdate: dateformat,
          shiftvalue: firstElement.shift,
          orderNo: firstElement.orderNo,
        },
      });
    } else {
      console.error("No matching record found");
    }
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData.operator_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

  console.log("get image", getImage);

  const handleCreate = () => {
    navigate("/Precot/Spunlace/F-14");
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handlePrint = () => {
    // window.print();
    setShowModal(true);
  };
  const formatDates = (dateStr) => {
    if (!dateStr) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDates(text),
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      render: (text) => (
        <div style={{ padding: "8px", textAlign: "center" }}>{text}</div>
      ),
    },

    {
      title: "OrderNo",
      dataIndex: "orderNo",
      key: "orderNo",
      render: (text) => (
        <div style={{ padding: "8px", textAlign: "left" }}>{text}</div>
      ),
    },

    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      render: (text) => <div style={{ padding: "8px" }}>{text}</div>,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, x) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.supervisor_status === "SUPERVISOR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

  const handleModalClose = () => {
    setShowModal(false);
    setdate1(null);
    setAvailableShiftslov2(null);
    setBatchNolist2(null);
  };
  const handleDatePrintChange = (event) => {};
  const printDateSubmit = () => {
    window.print();
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            role === "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Chemical Issue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "5",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <BleachingHeader
        unit="Unit-H"
        formName="SHIFT WISE RP PRODUCTION REPORT"
        formatNo="PH-PRD02/F-013"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            key="create"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            style={{
              marginRight: "12px",
              display:
                localStorage.getItem("role") === "OPERATOR" ? "block" : "none",
            }}
            type="primary"
          >
            Create
          </Button>,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<IoPrint color="#00308F" />}
            onClick={handlePrint}
          >
            Print
          </Button>,
          <Button
            key="back"
            // icon={<LeftOutlined />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            type="primary"
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
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

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Date :
          </div>
          <Input
            type="date"
            style={{ width: "150px" }}
            placeholder="Select Date"
            value={date}
            max={getCurrentDate()}
            onChange={(e) => setdate(e.target.value)}
          />
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Shift :
          </div>
          <Select
            style={{
              width: "150px",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Shift No"
            value={availableshiftlov}
            onChange={setAvailableShiftslov}
          >
            {availableshift.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
              </Option>
            ))}
          </Select>
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Select Order No :
          </div>
          <Select
            style={{ width: "150px" }}
            placeholder="Select Order No"
            value={batchNolist}
            onChange={handleorderno}
            showSearch
          >
            {batchno.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
              </Option>
            ))}
          </Select>

          <Button
            key="go"
            onClick={handleGo}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            type="primary"
          >
            Go To
          </Button>
        </div>

        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={modalData}
        />

        <div id="section-to-print">
          {/* {Array.isArray(printResponseData) &&printResponseData.map((item, index) => ( */}

          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid #0000",
              padding: "5px",
              width: "100%",
              scale: "90%",
            }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
              <tr>
                <td colSpan="2" rowSpan="4">
                  <div style={{ textAlign: "center" }}>
                    {" "}
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: "40px", height: "20px" }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>Unit H</div>
                </td>
                <th
                  colSpan="11"
                  rowSpan="4"
                  style={{ textAlign: "center", fontSize: 14, width: "50%" }}
                >
                  SHIFT WISE RP PRODUCTION REPORT
                </th>
                <td colSpan="1">Format No.: </td>
                <td colSpan="5">PH-PRD02/F-013</td>
              </tr>
              <tr>
                <td colSpan="1">Revision No.:</td>
                <td colSpan="5">01</td>
              </tr>
              <tr>
                <td colSpan="1">Ref.SOP No.:</td>
                <td colSpan="5">PH-PRD02-D-03</td>
              </tr>
              <tr>
                <td colSpan="1">Page No.:</td>
                <td colSpan="5">1 of 1</td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="10"></td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Date : {dateformat}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Shift : {shiftprintdata}
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Order No : {ordernodataprint}
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  RP Mixing : {rpmixingprintData}
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  BALE NO
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  WEIGHT IN KG
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  BALE NO
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  WEIGHT IN KG
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  BALE NO
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  WEIGHT IN KG
                </td>
              </tr>
              {chunkedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, cellIndex) => (
                    <td
                      colSpan="3"
                      style={{ textAlign: "center", fontSize: "14px" }}
                      key={cellIndex}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  Grand total in Kgs
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {totalweight}
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Operator Sign & Date
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Production Supervisor Sign & Date
                </td>

                <td colSpan="8" style={{ textAlign: "center" }}>
                  HOD / Designee Sign & Date
                </td>
              </tr>

              <tr>
                <td colSpan="4" style={{ height: "70px", textAlign: "center" }}>
                  <div>
                    {OperatorSign}
                    <br />
                    {formattedOperatorDate}
                    <br />
                    {getImageOP && (
                      <img src={getImageOP} alt="logo" className="signature" />
                    )}
                  </div>
                </td>
                <td colSpan="8" style={{ height: "70px", textAlign: "center" }}>
                  <div>
                    {SupervisorSign}
                    <br />
                    {formattedSupervisorDate}
                    <br />
                    {getImageSUP && (
                      <img src={getImageSUP} alt="logo" className="signature" />
                    )}
                  </div>
                </td>

                <td colSpan="8" style={{ height: "70px", textAlign: "center" }}>
                  <div>
                    {HodSign}
                    <br />
                    {formattedhodDate}
                    <br />
                    {getImageHOD && (
                      <img src={getImageHOD} alt="logo" className="signature" />
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <br />

              <tr>
                <td style={{ padding: "1em" }} colSpan="5">
                  Particulars
                </td>
                <td style={{ padding: "1em" }} colSpan="5">
                  Prepared By
                </td>
                <td style={{ padding: "1em" }} colSpan="4">
                  Reviewed By
                </td>
                <td style={{ padding: "1em" }} colSpan="6">
                  Approved By
                </td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan="5">
                  Name
                </td>
                <td style={{ padding: "1em" }} colSpan="5"></td>
                <td style={{ padding: "1em" }} colSpan="4"></td>
                <td style={{ padding: "1em" }} colSpan="6"></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }} colSpan="5">
                  Signature & Date
                </td>
                <td style={{ padding: "1em" }} colSpan="5"></td>
                <td style={{ padding: "1em" }} colSpan="4"></td>
                <td style={{ padding: "1em" }} colSpan="6"></td>
              </tr>
            </tfoot>
          </table>
          {/* ))}  */}
        </div>
        <Modal
          title="Print"
          open={showModal}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          footer={[
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: 190,
              }}
              icon={<IoPrint color="#00308F" />}
              key="submit"
              type="primary"
              onClick={printDateSubmit}
              disabled={!isFetchSuccessful}
            >
              Print
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Date :
            </div>
            <Input
              type="date"
              style={{ width: "100%" }}
              placeholder="Select Date"
              value={date1}
              onChange={(e) => setdate1(e.target.value)}
            />
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Shift :
            </div>
            <Select
              style={{
                width: "100%",
                height: "40x",
                borderRadius: "0px",
                border: "1px solid #dddd",
                backgroundColor: "white",
              }}
              placeholder="Select Shift No"
              value={availableshiftlov2}
              onChange={setAvailableShiftslov2}
            >
              {availableshift2.map((shiftvalue, index) => (
                <Option key={index} value={shiftvalue}>
                  {shiftvalue}
                </Option>
              ))}
            </Select>
            <div
              style={{
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Select Order No :
            </div>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Order No"
              value={batchNolist2}
              onChange={handleprint_section}
              showSearch
            >
              {batchno2.map((MacLOV, index) => (
                <Option key={index} value={MacLOV}>
                  {MacLOV}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Spunlace_f14_summary;
