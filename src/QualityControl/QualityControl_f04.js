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
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import API from "../baseUrl.json";

import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
const { Option } = Select;

const QualityControl_f04 = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  //const [date, setDate] = useState("");
  const [shiftSelections, setShiftSelections] = useState("");
  const [dataExists, setDataExists] = useState(false);
  const [searchDate, setSearchDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState({});
  const [hodStatus, setHodStatus] = useState("");
  const [isHODApproved, setIsHODApproved] = useState(false);
  const [isHODLoggedIn, setIsHODLoggedIn] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState();
  const [supervisorSavedOn, setSupervisorSavedOn] = useState("");
  const [supervisorSavedBy, setSupervisorSavedBy] = useState("");
  const [supervisorSavedId, setSupervisorSavedId] = useState("");
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");
  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState("");
  const [supervisorSubmitId, setSupervisorSubmitId] = useState("");

  const [supervisorSign, setSupervisorSign] = useState("");
  const [hodSavedOn, setHodSavedOn] = useState("");
  const [hodSavedBy, setHodSavedBy] = useState("");
  const [hodSavedId, setHodSavedId] = useState("");
  const [hodSubmitOn, setHodSubmitOn] = useState("");
  const [hodSubmitBy, setHodSubmitBy] = useState("");
  const [hodSubmitId, setHodSubmitId] = useState("");
  const [hodSign, setHodSign] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [shift, setShift] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [rows, setRows] = useState([{}]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [RawDetails, setRawDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const initial = useRef(false);
  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        // If row is already selected, unselect it
        return prevSelectedRows.filter((index) => index !== rowIndex);
      } else {
        // Otherwise, add it to the selected rows
        return [...prevSelectedRows, rowIndex];
      }
    });
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = apiData?.supervisor_sign;
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
  }, [apiData,API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = apiData?.hod_sign;
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
  }, [apiData,API.prodUrl]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const roleauth = localStorage.getItem("role");

  const canDisplayButtons = () => {};

  const canDisplayButton2 = () => {};

  //  BMR Based Raw Cotton Details......
  useEffect(() => {
    // Fetch shift options from the API
    const { bmr } = state || {};
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // const fetchBMR = async () => {
    // try {
    axios
      .get(
        `${API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/batch-numbers`,
        {
          headers,
          params: {
            bmrNo: bmr,
          },
        }
      )
      .then((response) => {
        // setShiftOptions(response.data);
        setRawDetails(response.data);
        console.log("BMR Based Details", response.data);
      })
      .catch(() => {});
    // console.log("Shift Lov ", shiftOptions);
    // } catch (error) {
    //   console.error("Error fetching shifts:", error);
    // }
    // };
    // fetchBMR();
  }, []);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/HandSanitizationReport/approveOrReject`,
        {
          // id: OverallID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-25/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/HandSanitizationReport/approveOrReject`,
        {
          // id: OverallID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-25/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const addRow = () => {
    setRows([...rows, {}]);
    setIdNumbers([...idNumbers, ""]);
    setHourSelections([...hourSelections, Array(22).fill("")]);
    setRemarks([...remarks, ""]);
  };

  const { state } = useLocation();

  const [idNumbers, setIdNumbers] = useState(Array(1).fill(""));
  const [remarks, setRemarks] = useState(Array(1).fill(""));
  const navigate = useNavigate();
  // const [hourSelections, setHourSelections] = useState( Array(8).fill(Array(8).fill("")) );
  const [hourSelections, setHourSelections] = useState(
    Array(rows.length).fill(Array(22).fill(""))
  );

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsHODLoggedIn(role === "ROLE_HOD" || role === "ROLE_DESIGNEE");

    setIsHODApproved();
  }, []);

  let formattedSupervisorDate;
  if (supervisorSubmitOn) {
    formattedSupervisorDate =
      moment(supervisorSubmitOn).format("DD/MM/YYYY HH:mm");
  } else {
    formattedSupervisorDate = "";
  }
  let formattedHODDate;
  if (hodSubmitOn) {
    formattedHODDate = moment(hodSubmitOn).format("DD/MM/YYYY HH:mm");
  } else {
    formattedHODDate = "";
  }

  const handlePrint = () => {
    window.print();
  };

  const onChange = (key) => {
    console.log(key);
  };

  const handleSave = async () => {
    setSaveLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found. Please log in again.");
      return;
    }

    const payload = {};

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/qc/SaveRawCottonConsolidatedF004`,
        payload,
        {
          headers,
        }
      )
      .then((response) => {
        message.success("Raw Cotton Save Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/Microbiology/Summary", {
            state: {
              // formNo: formNo,
            },
          });
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    setSaveLoading(true);

    const token = localStorage.getItem("token");

    const payload = {};
    console.log("Payload:", JSON.stringify(payload, null, 2));
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      fetchData();
    }
  }, []);
  const { bmr, date, shiftvalue } = state || {};

  console.log("DDD", date);
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    setNewDate(date);
    setShift(shiftvalue);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/Service/HandSanitizationReport/findByDateShift?date=${date}&shift=${shiftvalue}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      console.log("API Response:", responseData);

      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          responseData.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Not Yet  Approved");
        setTimeout(() => {
          navigate("/Precot/QC/F005");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // message.error(error.response.data);
      navigate("/Precot/QC/F005");
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Training identification Form</p>,
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "90%",
              marginLeft: "50px",
              tableLayout: "fixed",
              marginRight: "0px",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  colSpan="10"
                  style={{ textAlign: "center", padding: "7px" }}
                >
                  BMR Number
                </th>
                <th colSpan="16" style={{ textAlign: "center" }}>
                  {bmr}
                </th>
              </tr>
              <tr>
                <th
                  colSpan="10"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Specification
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  No Intense Blue Fluorescence Spots
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN min.20, VC min.25
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN(2.8-4.5), VC (3.5-8.0),CN2: min.10
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC:max.700, CN: max.1000,
                  <br /> CN2:max.5000
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN (12-21), VC( Long (12-21),
                  <br />
                  Medium(25-39), Short(13-20)),
                  <br /> CN-2: min 10
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC: min.15, CN: min 10, CN2: min 8
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC: min.13, CN: min 7, CN2: min 6
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC:max.25, CN: max.85, CN2:max.85
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC:max.45, CN: max.90, CN2:max.90
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC & CN: max.1.50, CN2: max.0.50
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC ,CN,CN2: max. 0.75
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  VC ,CN,CN2: max. 8.0
                </th>
                <th
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  CN: max.0.6, VC :max. 3.5 , CN2:NA
                </th>
                <th
                  rowSpan="2"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Remarks
                </th>
                <th
                  rowSpan="2"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Reported by (Chemist)
                </th>
                <th
                  rowSpan="2"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Approved by
                </th>
              </tr>

              <tr>
                <th>AR. No</th>
                <th>Date of Receipt</th>
                <th>Tested Date</th>
                <th>MB NO</th>
                <th>Supplier</th>
                <th>Station</th>
                <th>Verity</th>
                <th>Invoice No.</th>
                <th>No. Bales</th>
                <th>Quantity Kg</th>
                <th>
                  Fluore
                  <br />
                  scence
                </th>
                <th>
                  White <br /> ness
                  <br />
                  (Berger <br />
                  10 deg /D65)
                </th>
                <th>
                  Micro
                  <br />
                  naire µg/in
                </th>
                <th>
                  Neps count
                  <br />
                  /gm
                </th>
                <th>
                  UQL in
                  <br /> mm
                </th>
                <th>
                  L(w)
                  <br />
                  mm
                </th>
                <th>L(n) mm</th>
                <th>SFC (w) (%)</th>
                <th>SFC(n)(%)</th>
                <th>Ash (%)</th>
                <th>E.S.S. Ext. (%)</th>
                <th>
                  Moisture
                  <br /> (%)
                </th>
                <th>
                  Trash
                  <br />
                  (%)
                </th>
              </tr>

              {/* <tr>
                <th style={{ textAlign: "center",transform: 'rotate(270deg)',height:'195px', maxWidth: "55px", whiteSpace: "nowrap",    }}>Remarks</th>
                <th style={{ textAlign: "center",transform: 'rotate(270deg)', maxWidth: "35px", whiteSpace: "nowrap",    }}>Delete</th>
                </tr> */}
            </thead>
            <tbody>
              {RawDetails.map((row, index) => (
                <tr key={index}>
                  {row?.physicalAndChemicalTests?.map((row, index) => (
                    <td
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      {row?.arNo}
                    </td>
                  ))}
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Date of Receipt
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Tested Date
                  </td>

                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    MB NO
                  </td>

                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Supplier
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Station
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Verity
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Invoice No.
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    No. Bales
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Quantity Kg
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Fluore
                    <br />
                    scence
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    White <br /> ness
                    <br />
                    (Berger <br />
                    10 deg /D65)
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Micro
                    <br />
                    naire µg/in
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Neps count
                    <br />
                    /gm
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    UQL in
                    <br /> mm
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    L(w)
                    <br />
                    mm
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    L(n) mm
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    SFC (w) (%)
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    SFC(n)(%)
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Ash (%)
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    E.S.S. Ext. (%)
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Moisture
                    <br /> (%)
                  </td>
                  <td
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Trash
                    <br />
                    (%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <table
              style={{
                width: "95%",
              }}
            ></table>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-004/Summary");
  };

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="RAW COTTON CONSOLIDATED ANALYTICAL REPORT"
        formatNo="PH-QCL01/F-004"
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
          ...(role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE"
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
          <PrecotSidebar
            open={open}
            onClose={onClose}
            role={localStorage.getItem("role")}
          />,
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

      <div
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "center",
          width: "200px",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Input addonBefore="BMR No" size="Medium" value={bmr} readOnly />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{ marginTop: "1%" }}
      />
    </div>
  );
};

export default QualityControl_f04;
