/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Tabs, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f03 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [IssuanceRecord, setIssuanceRecord] = useState([]);
  const [distructionId, setDistructionId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getResponse, setGetResponse] = useState();
  const [getImage1, setGetImage1] = useState("");
  const [noOfCopiesReturnedArray, setNoOfCopiesReturnedArray] = useState([]);
  const [noOfCopiesSignArray, setNoOfCopiesSignArray] = useState([]);
  const [detailsLineId, setDetailsLineId] = useState([]);
  const [detailsDate, setDetailsDate] = useState([]);
  const [detailsRequestId, setDetailsRequestId] = useState([]);
  const [detailsRequestLineId, setDetailsRequestLineId] = useState([]);
  const dateObject = new Date(date);
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();
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
  const monthName = monthNames[monthIndex];

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  const formattedDate1 = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    if (
      IssuanceRecord &&
      IssuanceRecord.length > 0 &&
      IssuanceRecord.length > 0
    ) {
      const allDetails = IssuanceRecord.reduce(
        (acc, record) => [...acc, ...record.details],
        []
      );
      const newNoOfCopiesReturnedArray = allDetails.map(
        (detail) => detail.noOfCopiesReturned || ""
      ); // Handle undefined values
      const newNoOfCopiesSignArray = allDetails.map(
        (detail) => detail.returnedByDateAndSign || ""
      );
      // Set the arrays in the state
      setNoOfCopiesReturnedArray(newNoOfCopiesReturnedArray);
      setNoOfCopiesSignArray(newNoOfCopiesSignArray);
      // setDetailsLineId(detailsLineId);
    }
  }, [IssuanceRecord]);

  const handleNoOfCopiesReturnedChange = (value, flatIndex) => {
    // Create a copy of the existing array
    const updatedArray = [...noOfCopiesReturnedArray];
    // Update the value at the correct flatIndex
    updatedArray[flatIndex] = value;
    // Set the updated array in state
    setNoOfCopiesReturnedArray(updatedArray);
  };

  const handleReturnedBySignChange = (value, flatIndex) => {
    // Create a copy of the existing array
    const updatedArray = [...noOfCopiesSignArray];
    // Update the value at the correct flatIndex
    updatedArray[flatIndex] = value;
    // Set the updated array in state
    setNoOfCopiesSignArray(updatedArray);
  };

  const roleauth = localStorage.getItem("role");
  const disabled =
    (roleauth === "ROLE_MR" || roleauth === "ROLE_DESIGNEE") &&
    getResponse?.[0]?.qa_mr_status === "QA_MR_APPROVED";

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_MR" || roleauth === "ROLE_DESIGNEE") {
      if (getResponse?.[0]?.qa_mr_status === "QA_MR_APPROVED") {
        return "none";
      }
    }
  };
  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = getResponse?.[0]?.qa_mr_sign;
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [getResponse, API.prodUrl, token]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await SaveDistributionRecord();
    } catch (error) {
      console.error("Error saving Distribution and destruction Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitDistributionRecord();
    } catch (error) {
      console.error(
        "Error submitting Distribution and destruction Record..",
        error
      );
    }
  };

  const SaveDistributionRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "Distribution and Destruction Record",
        formatNo: "PH-QAD01/F-003",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-12",
        unit: "H",
        date: date,
        month: monthName,
        year: year,
        distructionId: distructionId,

        details: IssuanceRecord.flatMap((record, recordIndex) => {
          // Calculate the starting index for this record's details based on previous records
          const previousDetailsCount = IssuanceRecord.slice(
            0,
            recordIndex
          ).reduce((sum, r) => sum + r.details.length, 0);

          return record.details.map((detail, detailIndex) => {
            // Calculate the flat index for this detail
            const flatIndex = previousDetailsCount + detailIndex;

            const shouldPassIds =
              noOfCopiesReturnedArray[flatIndex] &&
              noOfCopiesSignArray[flatIndex];

            return {
              ...(getResponse.length !== 0 && {
                distructionLineId: detailsLineId[flatIndex],
              }),
              department: detail.department,
              date: detailsDate[flatIndex] || record.date,
              documentName: detail.documentName,
              documentNo: detail.documentNo,
              revisionNo: detail.revisionNo,
              typeOfCopy: detail.typeOfCopy,
              numberOfCopies: detail.numberOfCopies,
              documentGivenBy: detail.documentGivenBy,
              documentCollectedBy: detail.documentCollectedBy,
              noOfCopiesReturned: noOfCopiesReturnedArray[flatIndex],
              returnedByDateAndSign: noOfCopiesSignArray[flatIndex],
              requestId: shouldPassIds ? detail.requestId : "",
              lineId: shouldPassIds ? detail.lineId : "",
            };
          });
        }),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/api/saveDistributionAndDistructionRecord`,
        payload,
        { headers }
      );

      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QA/F-03/Summary");
      }, 1500);
      message.success(
        "Distribution and destruction Record Saved Successfully.."
      );
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Distribution and destruction Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitDistributionRecord = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        formatName: "Distribution and Destruction Record",
        formatNo: "PH-QAD01/F-003",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-12",
        unit: "H",
        date: date,
        month: monthName,
        year: year,
        distructionId: distructionId,
        details: IssuanceRecord.flatMap((record, recordIndex) => {
          // Calculate the starting index for this record's details based on previous records
          const previousDetailsCount = IssuanceRecord.slice(
            0,
            recordIndex
          ).reduce((sum, r) => sum + r.details.length, 0);

          return record.details.map((detail, detailIndex) => {
            // Calculate the flat index for this detail
            const flatIndex = previousDetailsCount + detailIndex;

            const shouldPassIds =
              noOfCopiesReturnedArray[flatIndex] &&
              noOfCopiesSignArray[flatIndex];

            return {
              ...(getResponse.length !== 0 && {
                distructionLineId: detailsLineId[flatIndex],
              }),
              department: detail.department,
              date: detailsDate[flatIndex] || record.date,
              documentName: detail.documentName,
              documentNo: detail.documentNo,
              revisionNo: detail.revisionNo,
              typeOfCopy: detail.typeOfCopy,
              numberOfCopies: detail.numberOfCopies,
              documentGivenBy: detail.documentGivenBy,
              documentCollectedBy: detail.documentCollectedBy,
              noOfCopiesReturned: noOfCopiesReturnedArray[flatIndex],
              returnedByDateAndSign: noOfCopiesSignArray[flatIndex],
              requestId: shouldPassIds ? detail.requestId : "",
              lineId: shouldPassIds ? detail.lineId : "",
              // destroyedByDateAndSign: `${date} / ${detail.destroyedBySign}`,
            };
          });
        }),
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/api/SubmitDistributionAndDistructionRecord`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-03/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit Distribution and destruction Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-03/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);
  useEffect(() => {
    if (getResponse?.length == 0) {
      fetchIssuancerecord();
      setDetailsLineId([]);
      setDetailsRequestId([]);
      setDetailsRequestLineId([]);
    }
  }, [getResponse]);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/findByDistributionAndDestruction?month=${monthName}&year=${year}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setGetResponse(response.data);
      if (response.data && response.data.length > 0) {
        const data = response.data;
        setIssuanceRecord(response.data);
        setDistructionId(data[0].distructionId);
        setDetailsLineId(data[0].details.map((item) => item.distructionLineId));
        setDetailsRequestId(data[0].details.map((item) => item.requestId));
        setDetailsRequestLineId(data[0].details.map((item) => item.lineId));
        setDetailsDate(data[0].details.map((item) => item.date));
      } else {
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error("No Data");
    } finally {
    }
  };

  const fetchIssuancerecord = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/getAllFromRequestAndIssunceOfDocumentApprovedData`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.message !== "No data") {
        setIssuanceRecord(response.data);
        setDetailsRequestId(
          response.data[0].details.map((item) => item.requestId)
        );
        setDetailsRequestLineId(
          response.data[0].details.map((item) => item.lineId)
        );
      }
    } catch (error) {
    } finally {
    }
  };
  let serialNumber = 1;

  const items = [
    {
      key: "1",
      label: <p>Issuance record / Destruction Record</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="3"
                rowSpan="2"
                style={{ height: "35px", textAlign: "center" }}
              >
                S. No.
              </th>
              <th colSpan="86" style={{ height: "35px", textAlign: "center" }}>
                Issuance record
              </th>
              <th colSpan="32" style={{ height: "35px", textAlign: "center" }}>
                Destruction Record
              </th>
            </tr>
            <tr>
              <th colSpan="12" style={{ height: "35px", textAlign: "center" }}>
                Date
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Document No. & Version No.
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Document Name
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Type of Copy
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                No of copies
              </th>
              <th colSpan="12" style={{ textAlign: "center" }}>
                Issued by sign & Date
              </th>
              <th colSpan="10" style={{ textAlign: "center" }}>
                Issued to dept.
              </th>
              <th colSpan="12" style={{ textAlign: "center" }}>
                Received by sign & date
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                No of copies Returned
              </th>
              <th colSpan="17" style={{ textAlign: "center" }}>
                Returned by (Date & Sign){" "}
              </th>
            </tr>
            {IssuanceRecord?.map((record, recordIndex) => {
              const previousDetailsCount = IssuanceRecord.slice(
                0,
                recordIndex
              ).reduce((sum, r) => sum + r.details.length, 0);
              return record.details.map((detail, detailIndex) => {
                const flatIndex = previousDetailsCount + detailIndex;

                return (
                  <tr key={`${recordIndex}-${detailIndex}`}>
                    <td
                      colSpan="3"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {serialNumber++}
                    </td>
                    <td
                      colSpan="12"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {formattedDate1(detailsDate[flatIndex] || record.date)}
                    </td>
                    <td
                      colSpan="10"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {detail.documentNo}
                    </td>
                    <td
                      colSpan="10"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {detail.documentName}
                    </td>
                    <td
                      colSpan="10"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {detail.typeOfCopy}
                    </td>
                    <td
                      colSpan="10"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {detail.numberOfCopies}
                    </td>
                    <td
                      colSpan="12"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {detail.documentGivenBy}
                    </td>
                    <td
                      colSpan="10"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {detail.department}
                    </td>
                    <td
                      colSpan="12"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      {detail.documentCollectedBy}
                    </td>
                    <td
                      colSpan="15"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      <input
                        type="number"
                        min={0}
                        onKeyDown={handleKeyDown}
                        className="inp-new"
                        style={{
                          width: "98%",
                          border: "none",
                          height: "35px",
                          paddingLeft: "2px",
                        }}
                        value={noOfCopiesReturnedArray[flatIndex] || ""}
                        onChange={(e) =>
                          handleNoOfCopiesReturnedChange(
                            e.target.value,
                            flatIndex
                          )
                        }
                        disabled={disabled}
                      />
                    </td>
                    <td
                      colSpan="17"
                      style={{ height: "35px", textAlign: "center" }}
                    >
                      <input
                        className="inp-new"
                        onKeyDown={handleKeyDown2}
                        style={{
                          width: "98%",
                          border: "none",
                          height: "35px",
                          paddingLeft: "2px",
                        }}
                        value={noOfCopiesSignArray[flatIndex] || ""}
                        onChange={(e) =>
                          handleReturnedBySignChange(e.target.value, flatIndex)
                        }
                        disabled={disabled}
                      />
                    </td>
                  </tr>
                );
              });
            })}
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "50%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Destroyed by Date & Sign
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {getResponse?.[0]?.qa_mr_status === "QA_MR_APPROVED" && (
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
                        <div>{getResponse?.[0]?.qa_mr_sign}</div>
                        <div>
                          {formattedDate(getResponse?.[0]?.qa_mr_submit_on)}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="MR/QA Manager Sign"
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
        unit="Unit-H"
        formName="Distribution and Destruction Record"
        formatNo="PH-QAD01/F-003"
        sopNo="PH-QAD01-D-12"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_MR" || role === "ROLE_DESIGNEE" ? (
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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

      {/* Unique Param Row*/}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDate1(date)}
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Month:"
          placeholder="Month"
          value={monthName}
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          style={{ width: "20%", height: "35px" }}
        />
      </div>
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

export default QA_f03;
