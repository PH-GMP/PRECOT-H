import React, { useState, useEffect } from "react";
import { DatePicker, Button, Row, Col, Tooltip, Select, Card ,  Drawer,Avatar,Menu} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { BiLock } from 'react-icons/bi';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import approvedImg from "../Assests/approvedImg.jpg";
import rejectedImg from "../Assests/rejectedImg.png";
import waitingImg from "../Assests/waitingImg.jpg";
import API from "../baseUrl.json";
import axios from "axios";
import { IoCreate } from "react-icons/io5";


const { Option } = Select;

const Dashboard = () => {
  const [dates, setDates] = useState([null, null]);
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [dataOverall, setDataOverall] = useState([]);
  const [waitingForApproval, setWaitingForApproval] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const COLORS = ["#FDDE55", "#399918", "#FF0000"];
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [formName, setFormName] = useState(null);
  const navigate = useNavigate();

  const formNames = [
    { id: 1, name: 'Applied Contamination Report (Raw Cotton)' },
    { id: 2, name: 'Contamination Report (Raw Cotton)' },
    { id: 3, name: 'Laydown Checklist' },
    { id: 4, name: 'Equipment Usage Log Book - Blow Room & Carding' },
    { id: 5, name: 'Sanitization of Machines & Surfaces' },
    { id: 6, name: 'Bleaching Hand Sanitization Report (AB Bale Press Machine)' },
    { id: 7, name: 'SHIFT LOG BOOK' },
    // Add more forms as needed
  ];

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [token]);

  const handleSearch = async () => {
    const [startDate, endDate] = dates;

    if (!startDate || !endDate) return;

    const month = startDate.month() + 1; // Ant Design's DatePicker months are 0-indexed
    const year = startDate.year();

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/Bleaching/audit/dashboard`,
        { month, year },
        { headers }
      );

      const fetchedData = response.data;

      setWaitingForApproval(fetchedData.supervisiorSubmitted);
      setApprovedCount(fetchedData.hodApproved);
      setRejectedCount(fetchedData.hodRejected);

      const dataOverall = [
        {
          name: "Supervisor Submitted",
          value: fetchedData.supervisiorSubmitted,
        },
        { name: "Approved", value: fetchedData.hodApproved },
        { name: "Rejected", value: fetchedData.hodRejected },
      ];

      setDataOverall(dataOverall);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleBack = () => navigate("/Precot/choosenScreen");

  return (
    <div style={{padding: '0.7%'}} >
      <BleachingHeader
        formName={"Dashboard"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            onClick={handleBack}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
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
        ]}
      />
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
          }
         ,
          {
            key: "5",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
                  if (window.confirm("Are you sure want to logout")) {
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
      : role === "ROLE_SUPERVISOR" || role === "ROLE_HOD" || role === "ROLE_DESIGNEE"
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
                Dash Board
              </b>
            ),
            
            onClick: () => navigate("/Precot/Dashboard"),
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
            key: "6",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
                  if (window.confirm("Are you sure want to logout")) {
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
                  if (window.confirm("Are you sure want to logout")) {
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

      <Row gutter={16} style={{ marginBottom: 16 }}>
  <Col>
    <DatePicker
      value={dates[0]}
      onChange={(date) => setDates([date, dates[1]])}
      format="MM/YYYY"
      picker="month"
      style={{ width: 200, marginRight: 8 }}
      placeholder="From Date"
    />
  </Col>
  <Col>
    <DatePicker
      value={dates[1]}
      onChange={(date) => setDates([dates[0], date])}
      format="MM/YYYY"
      picker="month"
      style={{ width: 200, marginRight: 8 }}
      placeholder="To Date"
    />
  </Col>
  <Col>
    <Select
      placeholder="Department"
      style={{ width: 200, marginRight: 8 }}
      onChange={(value) => setDepartment(value)}
    >
      {departments.map((dept) => (
        <Option key={dept.department} value={dept.name}>
          {dept.name}
        </Option>
      ))}
    </Select>
  </Col>
  <Col>
    <Select
      placeholder="Form Name"
      style={{ width: 200, marginRight: 8 }}
      onChange={(value) => setFormName(value)}
    >
      {formNames.map((form) => (
        <Option key={form.id} value={form.name}>
          {form.name}
        </Option>
      ))}
    </Select>
  </Col>
  <Col>
    <Button type="primary" onClick={handleSearch}>
      Search
    </Button>
  </Col>
</Row>


<Row gutter={16}>
  <Col span={8}>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          style={{
            textAlign: "center",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            background: "#ffffff",
            border: "1px solid #f0f0f0",
            // padding: 12,
            fontSize: 12,
            height: 130,
          }}
        >
          <div
            style={{
              background: "rgba(255, 193, 7, 0.1)",
              padding: 8,
              borderBottom: "1px solid #e0e0e0",
              position: "relative",
            }}
          >
            <img
              src={waitingImg}
              alt="Waiting"
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "#ffc107",
                color: "#fff",
                borderRadius: "50%",
                width: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
              }}
            >
              !
            </div>
          </div>
          <div style={{ padding: 8 }}>
            <p style={{ marginBottom: 4, fontWeight: "600", fontSize: 12 }}>
              Supervisor Submitted
            </p>
            <p style={{ marginBottom: 0, fontSize: 16, color: "#ffc107" }}>
              {waitingForApproval}
            </p>
          </div>
        </Card>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          style={{
            textAlign: "center",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            background: "#ffffff",
            border: "1px solid #f0f0f0",
            // padding: 12,
            fontSize: 12,
            height: 130,
          }}
        >
          <div
            style={{
              background: "rgba(40, 167, 69, 0.1)",
              padding: 8,
              borderBottom: "1px solid #e0e0e0",
              position: "relative",
            }}
          >
            <img
              src={approvedImg}
              alt="Approved"
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "#28a745",
                color: "#fff",
                borderRadius: "50%",
                width: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
              }}
            >
              ✓
            </div>
          </div>
          <div style={{ padding: 8 }}>
            <p style={{ marginBottom: 4, fontWeight: "600", fontSize: 12 }}>
              Approved
            </p>
            <p style={{ marginBottom: 0, fontSize: 16, color: "#28a745" }}>
              {approvedCount}
            </p>
          </div>
        </Card>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          style={{
            textAlign: "center",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            background: "#ffffff",
            border: "1px solid #f0f0f0",
            // padding: 12,
            fontSize: 12,
            height: 130,
          }}
        >
          <div
            style={{
              background: "rgba(220, 53, 69, 0.1)",
              padding: 8,
              borderBottom: "1px solid #e0e0e0",
              position: "relative",
            }}
          >
            <img
              src={rejectedImg}
              alt="Rejected"
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "#dc3545",
                color: "#fff",
                borderRadius: "50%",
                width: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
              }}
            >
              ×
            </div>
          </div>
          <div style={{ padding: 8 }}>
            <p style={{ marginBottom: 4, fontWeight: "600", fontSize: 12 }}>
              Rejected
            </p>
            <p style={{ marginBottom: 0, fontSize: 16, color: "#dc3545" }}>
              {rejectedCount}
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  </Col>
  <Col span={16}>
    <Card
      title="Overall Status"
      style={{
        borderRadius: 8,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid #f0f0f0",
        padding: 16,
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PieChart width={350} height={350}>
        <Pie
          data={dataOverall}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {dataOverall.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <RechartsTooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </Card>
  </Col>
</Row>

    </div>
  );
};

export default Dashboard;
