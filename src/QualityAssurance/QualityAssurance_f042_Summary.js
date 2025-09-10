import { EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Radio, Select, Table, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock, BiNavigation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar";

const QualityAssuranceF042Summary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCNo, setSelectedCNo] = useState(null); // New state for eqno
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [selectedPrintMonth, setSelectedPrintMonth] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [printData, setPrintData] = useState([]);
  const [showReasonColumn, setShowReasonColumn] = useState(false);
  const [entryType, setEntryType] = useState();
  const [getImage1, setGetImage1] = useState({});
  const [getImage2, setGetImage2] = useState({});
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const getImage = (username, type) => {
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
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64}`;

        if (type === "Designee") {
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
      data.details.forEach((detail) => {
        if (detail.issuedBy) {
          getImage(detail.issuedBy, "Designee");
        }
        if (detail.recivedBy) {
          getImage(detail.recivedBy, "MR");
        }
      });
    });
  }, [printData]);

  // get api
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);

      const url = `${API.prodUrl}/Precot/api/QA/Service/changeControlLogBook/getAll`;

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
            cno: item.changeControlNo,
            hod_status: item.hodOrDesigneeStatus,
            qa_status: item.mrOrQaManagerStatus,
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

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/changeControlLogBook/getAllExistingchangeControlNos`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      )
      .then((response) => {
        const changeControlOptions = response.data.map((ccn) => ({
          value: ccn,
          label: ccn,
        }));
        setOptions(changeControlOptions);
      })
      .catch((error) => {
        console.error("Error fetching change control numbers:", error);
      });
  }, []);

  // Function to handle keydown events
  const handleSelectText = (e) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      e.key !== "/" &&
      e.key !== "-"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      setSelectedCNo(e.target.value); // Set the selected value in the state
    }
  };

  // Function to handle dropdown change
  const handleInput = (value) => {
    setSelectedCNo(value); // Set the selected value from dropdown
  };

  const handleRadioChange = (e) => {
    setEntryType(e.target.value);
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
    // Check if selectedCNo is a valid selection from options
    const isValidSelection = options.some(
      (option) => option.value === selectedCNo
    );

    if (selectedCNo && entryType) {
      if (entryType === "Existing Entry" && !isValidSelection) {
        // Show warning if "Existing Entry" is selected and no valid option is selected
        message.warning(
          "Please select a Change Control No. from the dropdown and then select 'Existing Entry'."
        );
      } else if (entryType === "New Entry" && isValidSelection) {
        // Warning for New Entry when a valid selection is made
        message.warning(
          "Please enter new Change Control No. and then select 'Create New Entry' "
        );
      } else {
        navigate("/Precot/QA/QA_F042", {
          state: { selectedCNo: selectedCNo, entryType: entryType },
        });
      }
    } else {
      // Handle the case where no selection is made
      message.error("Please select a Change control no. and Entry type");
    }
  };

  const handleEdit = (record) => {
    navigate("/Precot/QA/QA_F042", {
      state: {
        selectedCNo: record.cno,
        entryType: "Existing Entry",
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
    //
  };

  const handleModalClose = () => {
    setPrintLoading(false);
    setShowModal(false);
    setSelectedPrintMonth(null);
    setSelectedPrintYear(null);
  };

  const printSubmit = () => {
    if (selectedPrintMonth || selectedPrintYear) {
      fetchPrintData();
    } else {
      message.error("Please select a any field before printing.");
      handleModalClose();
    }
  };

  const fetchPrintData = () => {
    let baseUrl = `${API.prodUrl}/Precot/api/QA/Service/changeControlLogBook/PrintForChangeControlLogBook?`;
    let query = [];

    // Construct the query based on selected fields

    if (selectedPrintMonth) {
      query.push(`month=${selectedPrintMonth}`);
    }
    if (selectedPrintYear) {
      query.push(`year=${selectedPrintYear}`);
    }

    // Join the query parameters to the base URL
    let finalUrl = baseUrl + query.join("&");

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
        // Ensure that the response is an array, even if no data is found
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPrintData(response.data);
          setPrintLoading(true);

          setTimeout(() => {
            window.print(); // Proceed with printing
            handleModalClose(); // Close the modal after printing
          }, 3000);
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
      title: "Change Control No.",
      dataIndex: "cno",
      key: "cno",
      align: "center",
    },
    {
      title: "HOD/Designee Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "MR/QA Manager Status",
      dataIndex: "qa_status",
      key: "qa_status",
      align: "center",
    },
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

  return (
    <>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Change control log book"
        formatNo="PH-QAD01/F-042"
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
        <Select
          placeholder="Select Change Control No."
          style={{ marginLeft: "100px", height: "28px", width: "250px" }}
          options={options} // Dropdown options
          value={selectedCNo} // Selected value from state
          onChange={handleInput} // Handle dropdown changes
          onKeyDown={handleSelectText} // Handle key inputs
          dropdownStyle={{ textAlign: "center" }}
          showSearch
          filterOption={false}
        />

        <Radio.Group
          onChange={handleRadioChange}
          value={entryType}
          style={{ marginLeft: "20px" }}
        >
          <Radio value="New Entry">Create New Entry</Radio>
          <Radio value="Existing Entry">Existing Entry</Radio>
        </Radio.Group>

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
        </div>
      </Modal>

      <Table
        columns={baseColumns}
        dataSource={dataSource}
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

        {printData.map((dataObj, mainIndex) => (
          <div key={mainIndex} style={{ pageBreakAfter: "always" }}>
            {/* Header Section */}
            <table
              className="f18table"
              style={{ height: "50%", marginTop: "" }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: "30px", border: "none" }}></td>
                </tr>
                <tr>
                  <th
                    colSpan="10"
                    rowSpan="4"
                    style={{ textAlign: "center", height: "80px" }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "100px", height: "auto" }}
                    />
                    <br />
                    Unit H
                  </th>
                  <th colSpan="60" rowSpan="4" style={{ textAlign: "center" }}>
                    Change control log book
                  </th>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Format No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    PH-QAD01/F-042
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Revision No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    01
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Ref. SOP No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    PH-QAD01-D-37
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    Page No.:
                  </td>
                  <td colSpan="10" style={{ paddingLeft: "5px" }}>
                    {mainIndex + 1} of {printData.length}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Data Table Section */}
            <table
              style={{
                marginTop: "1%",
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ border: "1px solid black" }}>
                  <td>S.No.</td>
                  <td>Change Initiation Date</td>
                  <td>Change Control No.</td>
                  <td>Description of change</td>
                  <td>Issued by sign & Date</td>
                  <td>Issued to Dept.</td>
                  <td>Received by sign & date</td>
                  <td>Tentative Closure Date</td>
                  <td>Actual Closure Date</td>
                  <td>Remarks</td>
                </tr>
              </thead>
              <tbody>
                {dataObj.details.map((detail, detailIndex) => {
                  const formattedDesDate = detail.issuedAt
                    ? moment(detail.issuedAt).format("DD/MM/YYYY HH:mm")
                    : "";
                  const formattedMRDate = detail.recivedAt
                    ? moment(detail.recivedAt).format("DD/MM/YYYY HH:mm")
                    : "";

                  const isLastRow = detailIndex === dataObj.details.length - 1;

                  return (
                    <tr key={detailIndex} style={{ border: "1px solid black" }}>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {detailIndex + 1}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {formatDate(detail.changeInitiationDate)}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {dataObj.changeControlNo}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {dataObj.descriptionOfChange}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {getImage1[detail.issuedBy] && (
                          <img
                            src={getImage1[detail.issuedBy]}
                            alt="Designee or HOD Signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        <br />
                        {detail.issuedBy}
                        <br />
                        {formattedDesDate}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {dataObj.issuedToDepartment || "N/A"}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {getImage2[detail.recivedBy] && (
                          <img
                            src={getImage2[detail.recivedBy]}
                            alt="MR or QA mng Signature"
                            style={{ width: "50px", height: "auto" }}
                          />
                        )}
                        <br />
                        {detail.recivedBy || "N/A"}
                        <br />
                        {formattedMRDate || "N/A"}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {formatDate(detail.tentativeClosureDate) || "N/A"}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {isLastRow
                          ? formatDate(dataObj.actualClouserDate)
                          : "N/A"}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {isLastRow ? dataObj.remark : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Footer Section */}
            <table style={{ marginTop: "1%", width: "100%" }}>
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
        ))}
      </div>
    </>
  );
};

export default QualityAssuranceF042Summary;
