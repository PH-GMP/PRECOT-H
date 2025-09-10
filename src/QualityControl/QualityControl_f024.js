import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Tabs, Button, Select, Input, Tooltip, message, Modal } from "antd";
import { FaLock, FaTrash } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

import moment from "moment";

const QualityControlF024 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, selectedMonth, selectedYear } = location.state || {};
  const roleauth = localStorage.getItem("role");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [mainId, setMainId] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [uniqueMonth, setUniqueMonth] = useState("");
  const [open, setOpen] = useState(false);
  const [uniqueYear, setUniqueYear] = useState("");

  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate); // Convert string to Date object

      // Extract the year and month
      const year = dateObj.getFullYear();
      const monthNumber = dateObj.getMonth(); // getMonth() returns 0-11 (Jan-Dec)

      // Array of month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Set the states for month and year
      setUniqueYear(year);
      setUniqueMonth(monthNames[monthNumber]);
    }
  }, [selectedDate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [formValues, setFormValues] = useState({
    date: selectedDate,
    disposedMaterial: "",
    disposedQuantity: "",
    disposedBy: "",
    disposalsReceived: "",
  });

  const handleInputChange = (name, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically set the field based on the name
    }));
  };

  useEffect(() => {
    console.log(
      "selectedDate && selectedMonth && selectedYear",
      selectedDate,
      selectedMonth,
      selectedYear
    );
    console.log("mainId", mainId);

    if (selectedDate) {
      axios
        .get(`${   API.prodUrl}/Precot/api/chemicaltest/CLF024?date=${selectedDate}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        })
        .then((response) => {
          const data = response.data[0];
          setSelectedRow(response.data[0]);

          const username = response.data[0]?.chemist_sign;
          console.log("username", username);
          //getImage
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

          setMainId(data.test_id);
          // Set form values based on the API response
          setFormValues({
            date: data.date,
            disposedMaterial: data.disposalName,
            disposedQuantity: data.disposedQuantity,
            disposedBy: data.disposedby,
            disposalsReceived: data.disposalReceived,
          });
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    }
  }, [selectedDate, selectedMonth, selectedYear]);

  const handleSave = async () => {
    console.log("uniwue parmamm", selectedDate, selectedMonth, selectedYear);
    console.log("mainId", mainId);
    // Constructing the payload object
    const payload = {
      test_id: mainId || "",
      format: "Disposal Record (CHEMICAL/MEDIA)",
      format_no: "PH-QCL01/F-024",
      ref_sop_no: "PH-QCL01-D-13",
      date: formValues.date, // format date as needed
      month: selectedMonth || uniqueMonth,
      year: selectedYear || uniqueYear,
      disposalName: formValues.disposedMaterial,
      disposedQuantity: formValues.disposedQuantity,
      disposedby: formValues.disposedBy,
      disposalReceived: formValues.disposalsReceived, // format date as needed
    };

    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF024/save/disposalRecord`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Disposal Record (CHEMICAL/MEDIA) Saved Successfully..");
      console.log("Data saved successfully:", response.data);
      setSaveLoading(false);
      navigate("/Precot/QualityControl/F-024/Summary");
    } catch (error) {
      // Handle error
      console.error("Error saving record:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("uniwue parmamm", selectedDate, selectedMonth, selectedYear);
    console.log("mainId", mainId);

    if (
      !formValues.disposedMaterial.trim() &&
      !formValues.disposedQuantity &&
      !formValues.disposedBy.trim() &&
      !formValues.disposalsReceived.trim()
    ) {
      message.error("No fields entered.");
      return; // Stop execution if any mandatory field is missing
    }

    if (!formValues.disposedMaterial.trim()) {
      message.error("Please fill in the 'Disposed Material' field.");
      return; // Stop execution if 'Disposal Quantity' is empty
    }
    if (!formValues.disposedQuantity) {
      message.error("Please fill in the 'Disposal Quantity' field.");
      return; // Stop execution if 'Disposal Quantity' is empty
    }
    if (!formValues.disposedBy.trim()) {
      message.error("Please fill in the 'Disposed By' field.");
      return; // Stop execution if 'Disposed By' is empty
    }
    if (!formValues.disposalsReceived.trim()) {
      message.error("Please fill in the 'Disposals Received' field.");
      return; // Stop execution if 'Disposed By' is empty
    }

    // Constructing the payload object
    const payload = {
      test_id: mainId || "",
      format: "Disposal Record (CHEMICAL/MEDIA)",
      format_no: "PH-QCL01/F-024",
      ref_sop_no: "PH-QCL01-D-13",
      date: formValues.date, // format date as needed
      month: selectedMonth || uniqueMonth,
      year: selectedYear || uniqueYear,
      disposalName: formValues.disposedMaterial.trim() || "N/A",
      disposedQuantity: formValues.disposedQuantity || 0,
      disposedby: formValues.disposedBy.trim() || "N/A",
      disposalReceived: formValues.disposalsReceived.trim() || "N/A", // format date as needed
    };

    try {
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF024/submit/disposalRecord`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(
        "Disposal Record (CHEMICAL/MEDIA) Submitted Successfully.."
      );
      console.log("Data submitted successfully:", response.data);
      setSaveLoading(false);
      navigate("/Precot/QualityControl/F-024/Summary");
    } catch (error) {
      // Handle error
      console.error("Error saving record:", error);
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "LAB_ASSISTANT") {
      if (selectedRow?.chemist_status === "LAB_ASSISTANT_APPROVED") {
        return "none";
      } else {
        return "block";
      }
    }
  };

  let formattedChemistDate;
  if (selectedRow && selectedRow.chemist_submit_on) {
    formattedChemistDate = moment(selectedRow.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where selectedRow or chemist_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-024/Summary");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Disposal Record</b>
        </p>
      ),
      children: (
        <div>
          <div>
            <table
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                width: "100%", // ensures the table takes up the full width of its container
                maxWidth: "100%", // prevents the table from exceeding the container width
                marginLeft: "20px", // adjust this if necessary for your layout
                marginTop: "30px",
              }}
            >
              <thead>
                <tr style={{ border: "1px solid black" }}>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "5%",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Name of the Disposed material
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Disposed Quantity (in approx. Grams)
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Disposed by
                  </th>

                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px 5px",
                      width: "10%",
                    }}
                  >
                    Disposals Received
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {formatDate(formValues.date)}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <Input
                      type="text"
                      name="disposedMaterial"
                      value={formValues.disposedMaterial}
                      onChange={(e) =>
                        handleInputChange("disposedMaterial", e.target.value)
                      }
                      disabled={
                        roleauth === "LAB_ASSISTANT" &&
                        selectedRow?.chemist_status === "LAB_ASSISTANT_APPROVED"
                      }
                    />
                  </td>
                  <td style={{ padding: "10px" }}>
                    <Input
                      type="number"
                      name="disposedQuantity"
                      step={0.1}
                      min={0}
                      value={formValues.disposedQuantity}
                      onChange={(e) =>
                        handleInputChange("disposedQuantity", e.target.value)
                      }
                      disabled={
                        roleauth === "LAB_ASSISTANT" &&
                        selectedRow?.chemist_status === "LAB_ASSISTANT_APPROVED"
                      }
                      onKeyPress={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "E") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                  <td style={{ padding: "10px" }}>
                    <Input
                      type="text"
                      name="disposedBy"
                      value={formValues.disposedBy}
                      onChange={(e) =>
                        handleInputChange("disposedBy", e.target.value)
                      }
                      disabled={
                        roleauth === "LAB_ASSISTANT" &&
                        selectedRow?.chemist_status === "LAB_ASSISTANT_APPROVED"
                      }
                    />
                  </td>
                  <td style={{ padding: "10px" }}>
                    <Input
                      type="text"
                      name="disposalsReceived"
                      value={formValues.disposalsReceived}
                      onChange={(e) =>
                        handleInputChange("disposalsReceived", e.target.value)
                      }
                      disabled={
                        roleauth === "LAB_ASSISTANT" &&
                        selectedRow?.chemist_status === "LAB_ASSISTANT_APPROVED"
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                <b>Performed by Lab Assistant Sign & Date</b>
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
                {selectedRow?.chemist_status === "LAB_ASSISTANT_APPROVED" && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.chemist_sign}
                    <br />
                    {formattedChemistDate}
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
        unit="Unit H"
        formName="Disposal Record (CHEMICAL/MEDIA)"
        formatNo="PH-QCL01/F-024"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "LAB_ASSISTANT" ? (
            <>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                loading={saveLoading}
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
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ) : (
            <></>
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
  );
};

export default QualityControlF024;
