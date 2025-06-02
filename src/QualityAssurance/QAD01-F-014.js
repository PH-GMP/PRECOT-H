/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Tabs, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f14 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { year, IAr } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [department, setDepartment] = useState(false);
  const [Iardetails, setIardetails] = useState([]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-14/Summary");
  };

  useEffect(() => {
    fetchDetailsByDep();
    fetchDetailsByParam();
  }, []);

  const fetchDetailsByDep = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditDepartments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        const filteredDepartments = response.data
          .map((item) => item.auditDepartment)
          .filter((dept) => dept !== "MR [SMR01]");

        setDepartment(filteredDepartments);
      } else {
        message.error("No data found for the selected year");
      }
    } catch (error) {
      console.error("Error fetching audit departments:", error);
      message.error(
        error.response?.data?.message || "Error fetching audit departments"
      );
    }
  };

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSummary/getInternalAuditSummary?year=${year}&iarNo=${IAr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data !== "No data") {
        setIardetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching supplier audit plan:", error);
      message.error(error.message);
    }
  };

  const fixedColSpans = {
    clauseNo: 5,
    requirements: 10,
    totalFindings: 12,
    ncStatus: 9,
  };

  const departmentColSpan = department.length * 4;

  const totalColSpan =
    fixedColSpans.clauseNo +
    fixedColSpans.requirements +
    departmentColSpan +
    fixedColSpans.totalFindings +
    fixedColSpans.ncStatus;

  const items = [
    {
      key: "1",
      label: <p>Internal Audit Summary</p>,
      children: (
        <div>
          <table
            style={{ width: "105%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan={totalColSpan} style={{ textAlign: "left" }}>
                  {" "}
                  Internal Audit Based On Standard:
                  {Iardetails[0]?.standard}
                </th>
              </tr>
              <tr>
                <th colSpan={5} rowSpan={2}>
                  Clause No.
                </th>
                <th
                  colSpan={10}
                  rowSpan={2}
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Requirements/IAR No
                </th>
                <th colSpan={department.length * 4}>Department</th>
                <th colSpan={12}>Total No of Findings</th>
                <th
                  colSpan={9}
                  rowSpan={2}
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Status of NCs(open/closed)
                </th>
              </tr>

              <tr>
                {Array.isArray(department) &&
                  department.map((department, index) => (
                    <th
                      key={index}
                      colSpan={4}
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      {department}
                    </th>
                  ))}

                <th
                  colSpan={4}
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Observation
                </th>
                <th
                  colSpan={4}
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Minor NCs
                </th>
                <th
                  colSpan={4}
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Major NCs
                </th>
              </tr>
            </thead>
            <tbody>
              {Iardetails &&
                Array.isArray(Iardetails) &&
                Iardetails.map((iarDetail, index) => (
                  <tr key={index}>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      {iarDetail?.clauseNos}
                    </td>
                    <td colSpan={10} style={{ textAlign: "center" }}>
                      {iarDetail?.iarNo}
                    </td>

                    {Array.isArray(department) &&
                      department.map((dept, deptIndex) => (
                        <td
                          key={deptIndex}
                          colSpan={4}
                          style={{ textAlign: "center" }}
                        >
                          {iarDetail?.department === dept ? 1 : 0}
                        </td>
                      ))}

                    <td colSpan={4} style={{ textAlign: "center" }}>
                      {iarDetail?.observations}
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      {iarDetail?.minorNcs}
                    </td>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      {iarDetail?.majorNcs}
                    </td>
                    <td colSpan={9} style={{ textAlign: "center" }}>
                      {iarDetail?.statusOfNcs}
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={15}>TOTAL No. of NCs</td>

                {Array.isArray(department) &&
                  department.map((dept, deptIndex) => {
                    const total = Array.isArray(Iardetails)
                      ? Iardetails.reduce((sum, iarDetail) => {
                          return sum + (iarDetail?.department === dept ? 1 : 0);
                        }, 0)
                      : 0;

                    return (
                      <td
                        key={deptIndex}
                        colSpan={4}
                        style={{ textAlign: "center" }}
                      >
                        {total}
                      </td>
                    );
                  })}

                <td colSpan={4} style={{ textAlign: "center" }}>
                  {Array.isArray(Iardetails)
                    ? Iardetails.reduce(
                        (sum, iarDetail) =>
                          sum + (Number(iarDetail?.observations) || 0),
                        0
                      )
                    : 0}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  {Array.isArray(Iardetails)
                    ? Iardetails.reduce(
                        (sum, iarDetail) =>
                          sum + (Number(iarDetail?.minorNcs) || 0),
                        0
                      )
                    : 0}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  {Array.isArray(Iardetails)
                    ? Iardetails.reduce(
                        (sum, iarDetail) =>
                          sum + (Number(iarDetail?.majorNcs) || 0),
                        0
                      )
                    : 0}
                </td>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  {Array.isArray(Iardetails) && Iardetails.length > 0
                    ? Iardetails.every(
                        (iarDetail) => iarDetail?.statusOfNcs === "Closed"
                      )
                      ? "Closed"
                      : "Open"
                    : "No Data"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const buttonsArray = [
    ...(role === "QA_MANAGER" || role === "ROLE_MR"
      ? [
          <Button
            key="back"
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
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user"
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
        ]
      : []),
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
        formName="SUMMARY OF INTERNAL AUDIT"
        formatNo="PH-QAD01-F-014"
        sopNo="PH-QAD01-D-18"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={buttonsArray}
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
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="IAR:"
          placeholder="IAR"
          value={IAr}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
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

export default QA_f14;
