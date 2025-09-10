import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Table, Select, message, Tooltip, Modal } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from "react-icons/go";
import { FaLock, FaUserCircle } from "react-icons/fa";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import API from "../baseUrl.json";
import axios from "axios";
import logo from "../Assests/logo.png";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";
import moment from "moment";

const QualityControlF021Summary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loadNo, setLoadNo] = useState(null); // State to store selected form value
  const [selectedEqNo, setSelectedEqNo] = useState(null); // New state for eqno
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrintEqNo, setSelectedPrintEqNo] = useState(null); // New state for eqno
  const [selectedPrintDate, setSelectedPrintDate] = useState("");
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const roleauth = localStorage.getItem("role");
  const [dataSource, setDataSource] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState([]);
  const [showReasonColumn, setShowReasonColumn] = useState(false);

  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});
  const [open, setOpen] = useState(false);

  const getImage = (username, type) => {
    axios
      .get(
        `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64}`;

        if (type === "micro") {
          setGetImage1((prev) => ({ ...prev, [username]: url }));
        } else {
          setGetImage2((prev) => ({ ...prev, [username]: url }));
        }
      })
      .catch((err) => {
        console.error("Error in fetching image:", err);
      });
  };

  // Fetch chemist and QC images for all data in printData
  useEffect(() => {
    printData.forEach((data) => {
      if (data.microbiologist_sign) {
        getImage(data.microbiologist_sign, "micro");
      }
      if (data.manager_sign) {
        getImage(data.manager_sign, "manager");
      }
    });
  }, [printData]);

  // get api
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      const url =
        roleauth === "ROLE_MICROBIOLOGIST"
          ? `${  API.prodUrl}/Precot/api/qc/MediaGrowthF021Report/GetAll`
          : roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER"
          ? `${  API.prodUrl}/Precot/api/qc/MediaGrowthF021Report/getAllManagerNotSubmitted`
          : null;

      if (url) {
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "json",
          });
          const fetchedData = response.data.map((item) => ({
            ...item,
            date: item.incubationStartOn,
            microbiologist_status: item.microbiologist_status,
            manager_status: item.manager_status,
            reason: item.reason || "N/A",
          }));

          setDataSource(fetchedData);

          const hasRejectedStatus = fetchedData.some(
            (item) =>
              item.manager_status === "QC_REJECTED" ||
              item.manager_status === "QA_REJECTED" ||
              item.manager_status === "MICRO_DESIGNEE_REJECTED"
          );
          setShowReasonColumn(hasRejectedStatus);
        } catch (error) {
          console.error("Error fetching data:", error);
          message.error("Failed to fetch data");
        }
      }
      // setLoading(false);
    };

    fetchData();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePrintDateChange = (e) => {
    setSelectedPrintDate(e.target.value);
  };

  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  const handlePrintMonthChange = (value) => {
    setSelectedPrintMonth(value);
  };

  // Generate year options from current year to previous 20 years
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }

  // Generate month options
  const months = [
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

  const handleGoToChange = () => {
    if (selectedDate) {
      navigate("/precot/QualityControl/F-021", {
        state: { selectedDate: selectedDate },
      });
    } else {
      // Handle the case where year or month is not selected
      message.error("Please select a Date, year and month.");
    }
  };

  const handleEdit = (record) => {
    navigate("/precot/QualityControl/F-021", {
      state: {
        selectedDate: record.date,
      },
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintDate(null);
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
  };

  const printSubmit = () => {
    if (selectedPrintDate || selectedPrintMonth || selectedPrintYear) {
      fetchPrintData();
    } else {
      message.error("Please select a any field before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    let baseUrl = `${  API.prodUrl}/Precot/api/qc/MediaGrowthF021Report/GetByIncubationStartOnMonthYear/print?`;
    let query = [];

    // Construct the query based on selected fields
    if (selectedPrintDate) {
      query.push(`incubationStartOn=${selectedPrintDate}`);
    }
    if (selectedPrintMonth) {
      query.push(`month=${selectedPrintMonth}`);
    }
    if (selectedPrintYear) {
      query.push(`year=${selectedPrintYear}`);
    }

    // Join the query parameters to the base URL
    let finalUrl = baseUrl + query.join("&");
    console.log("finalUrl", finalUrl);

    // Make the API call using axios
    const token = localStorage.getItem("token");
    axios
      .get(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
      })
      .then((response) => {
        console.log("Fetched data:", response.data);

        // Ensure that the response is an array, even if no data is found
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);

          console.log("print data", response.data);
        } else {
          setPrintData([]); // Ensure printData is always an array
          setPrintLoading(false);
          message.error(
            "No details found for the selected form. Cannot print."
          );
          handleModalClose(); // Close modal if no details found
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again.");
        setPrintLoading(false);
      });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
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
      title: "incubationStartOn",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Microbiologist Status",
      dataIndex: "microbiologist_status",
      key: "microbiologist_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "manager_status",
      key: "manager_status",
      align: "center",
    },
    ...(showReasonColumn
      ? [
          {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
            align: "center",
          },
        ]
      : []),
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
      ),
    },
  ];
  let columns = [...baseColumns];

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Media Growth Promotion Test Report"
        formatNo="PH-QCL01/F-021"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
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
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "start",
        }}
      >
        {/* <Select
          style={{ width: "120px", color: "black", height: "28px" }}
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Select Year"
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>

        <Select
          style={{
            width: "150px",
            color: "black",
            marginLeft: "",
            height: "28px",
          }}
          value={selectedMonth}
          placeholder="Select Month"
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <Option key={index} value={month}>
              {month}
            </Option>
          ))}
        </Select> */}

        <Input
          addonBefore="Date"
          placeholder="Date"
          type="date"
          size="small"
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ fontWeight: "bold", width: "135px" }}
          max={getCurrentDate()}
        />

        <Button
          key="Create"
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            height: "28px",
            marginLeft: "40px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go to
        </Button>
      </div>

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
            loading={printLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <div
          style={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* fields */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Year:
            </label>
            <Select
              style={{ width: "135px", height: "28px", color: "black" }}
              value={selectedPrintYear}
              onChange={handlePrintYearChange}
              placeholder="Select Year"
            >
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Month:
            </label>

            <Select
              style={{
                width: "135px",
                height: "28px",
                color: "black",
                marginLeft: "",
              }}
              value={selectedPrintMonth}
              placeholder="Select Month"
              onChange={handlePrintMonthChange}
            >
              {months.map((month, index) => (
                <Select.Option key={index} value={month}>
                  {month}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px", textAlign: "start" }}>
              Select Date:
            </label>
            <Input
              placeholder="Date"
              type="date"
              size="small"
              format="DD/MM/YYYY"
              value={selectedPrintDate}
              onChange={handlePrintDateChange}
              style={{ fontWeight: "", width: "135px", marginLeft: "" }}
              max={getCurrentDate()}
            />
          </div>
        </div>
      </Modal>

      <Table
        columns={baseColumns}
        dataSource={dataSource}
        // loading={loading}
        rowKey="id" // Ensure each row has a unique key
      />

      {/* */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
          scale: 90%;
        }
        // body {
        //   -webkit-print-color-adjust: exact;
        // }
        body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {(() => {
          const chunkArray = (data, size) => {
            const result = [];
            for (let i = 0; i < data.length; i += size) {
              result.push(data.slice(i, i + size));
            }
            return result;
          };

          const chunkedData = chunkArray(
            printData.flatMap((data) => data.details),
            4
          );

          return chunkedData.map((dataChunk, pageIndex) => (
            <div key={pageIndex}>
              <table
                className="f18table"
                style={{ height: "50%", marginTop: "" }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: "30px", border: "none" }}></td>
                  </tr>
                  <tr>
                    <td
                      colSpan="10"
                      rowSpan="4"
                      style={{ textAlign: "center", height: "80px" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <br></br>
                      Unit H
                    </td>

                    <td
                      colSpan="60"
                      rowSpan="4"
                      style={{ textAlign: "center" }}
                    >
                      Media Growth Promotion Test Report
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Format No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      PH-QCL01/F-021
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Revision No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      02
                    </td>
                  </tr>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Ref. SOP No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    PH-QCL01-D-07
                  </td>
                  <tr>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      Page No.:
                    </td>
                    <td colSpan="10" style={{ paddingLeft: "5px" }}>
                      {pageIndex + 1} of {chunkedData.length}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style={{ marginTop: "1%" }}>
                <tr key="">
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Serial No.
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Tested /Incubation Start on
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "5px 5px",
                    }}
                  >
                    Media Name
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Manufactured Date
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Lot. No.
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Expiry Date
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Name of the Culture
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Test Completion Date
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Tested by (Sign & Date)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Approved by (Sign & Date)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Remarks
                  </td>
                </tr>

                <tbody>
                  {dataChunk.map((item, index) => {
                    const mainObject = printData.find((pd) =>
                      pd.details.includes(item)
                    );

                    // Format dates for each item
                    let formattedMicroDate = "";
                    if (mainObject.microbiologist_submit_on) {
                      formattedMicroDate = moment(
                        mainObject.microbiologist_submit_on
                      ).format("DD/MM/YYYY HH:mm");
                    }

                    // Format manager date
                    let formattedManagerDate = "";
                    if (mainObject.manager_submit_on) {
                      formattedManagerDate = moment(
                        mainObject.manager_submit_on
                      ).format("DD/MM/YYYY HH:mm");
                    }

                    return (
                      <tr key={item.id}>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {index + 1 + pageIndex * 4}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {formatDate(mainObject.incubationStartOn)}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.mediaName}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {formatDate(item.manufacturedDate)}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.lotNo}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.expiryDate}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.nameOfCulture}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {formatDate(item.testCompletionDate)}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {getImage1[mainObject.microbiologist_sign] && (
                            <img
                              src={getImage1[mainObject.microbiologist_sign]}
                              alt="Micro Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {mainObject.microbiologist_sign}
                          <br />
                          {formattedMicroDate}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {getImage2[mainObject.manager_sign] && (
                            <img
                              src={getImage2[mainObject.manager_sign]}
                              alt="Manager Signature"
                              style={{ width: "50px", height: "auto" }}
                            />
                          )}
                          <br />
                          {mainObject.manager_sign}
                          <br />
                          {formattedManagerDate}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {item.remarks}
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan={11} style={{ padding: "10px" }}>
                      Note 1: Microbilogical test is being conducted based on
                      document no.
                      <br></br>
                      Note 2: 1.Soybean Casein Digest Agar [SCDA], Sabouraud
                      Dextrose Agar (SDA), Violet Red Bile Agar (VRBA),
                      Mac-Conkey Agar ( Mac.Con. ), Vogel- Johnson Agar Base(
                      VJ), Brilliant Green Agar [BGA], Cetrimide Agar( Citri),
                      Burkholderia Cepacia selective agar [BCSA],
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style={{ marginTop: "1%" }}>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Particulars
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Prepared by
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Reviewed by
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Approved by
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Name
                  </td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "start", padding: "5px 0px 5px 10px" }}
                  >
                    Signature & Date
                  </td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                  <td colSpan="5"></td>
                </tr>
              </table>
            </div>
          ));
        })()}
      </div>
    </>
  );
};

export default QualityControlF021Summary;
