import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Card,
  message,
  Tooltip,
  Menu,
  Avatar,
  Col,
  Row,
  Drawer,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSave } from "react-icons/io5";
import API from "../baseUrl.json";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import BleachingHeader from "../Components/BleachingHeader";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { AiOutlineSignature } from "react-icons/ai";

const { Option } = Select;

const UserForm = () => {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active"); // Default status is active
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );
        console.log("Department List: ", response.data);
        const departmentList = response.data.map((dept) => ({
          value: dept.department,
          label: dept.department,
        }));
        setDepartments(departmentList);
        console.log("Formatted Departments: ", departmentList);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = (value) => {
    setDepartment(value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSubmit = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    const data = {
      departmentName: "BLEACHING", // Assuming fixed department for this form
      name: name,
      isActive: status === "active" ? "Y" : "N",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/bleaching/bleachStorePersons/CreateOrUpdate`,
        data,
        { headers }
      )
      .then((response) => {
        console.log("API Response:", response.data);
        message.success("User details saved successfully");
        navigate("/Precot/storeusersummary"); // Redirect to summary page after saving
      })
      .catch((error) => {
        console.error("Error saving user details:", error);
        message.error("Failed to save user details. Please try again.");
      });
  };

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").charAt(0)}</Avatar>
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
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            role === "ROLE_ADMIN"
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
                        Create User
                      </b>
                    ),
                    onClick: () => navigate("/Precot/usercreate"),
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
                        User List
                      </b>
                    ),
                    onClick: () => navigate("/Precot/userlist"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                          fontSize: "1.0rem",
                          fontWeight: "bold",
                        }}
                      >
                        Store Users
                      </b>
                    ),
                    onClick: () => navigate("/Precot/storeusersummary"),
                  },
                  {
                    key: "5",
                    icon: <AiOutlineSignature color="#151718" />,
                    label: (
                      <div
                        style={{
                          color: "#151718",
                        }}
                      >
                        Signature Upload
                      </div>
                    ),
                    onClick: () => navigate("/Precot/signatureUpload"),
                  },

                  {
                    key: "6",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          if ("Are you sure want to logout") {
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
              : []
          }
        />
      </Drawer>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <BleachingHeader
          formName="Store User Details"
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[
            <Button
              // loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
              shape="round"
              icon={<IoSave color="#00308F" />}
            >
              &nbsp;Save
            </Button>,
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/Precot/storeusersummary")}
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
                if ("Are you sure want to logout") {
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            style={{ width: 500, textAlign: "center" }}
          >
            <Form.Item label="Department" style={{ marginBottom: 20 }}>
              <Select
                style={{ width: "100%" }}
                onChange={handleDepartmentChange}
                value={department}
              >
                {departments.map((dept) => (
                  <Select.Option key={dept.value} value={dept.value}>
                    {dept.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Name" style={{ marginBottom: 20 }}>
              <Input value={name} onChange={handleNameChange} />
            </Form.Item>

            <Form.Item label="Status" style={{ marginBottom: 20 }}>
              <Select
                style={{ width: "100%" }}
                onChange={handleStatusChange}
                value={status}
              >
                {statusOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8 }}></Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserForm;
