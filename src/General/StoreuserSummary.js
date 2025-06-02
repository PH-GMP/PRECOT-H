import React, { useState, useEffect } from "react";
import { Button, Spin, Table, message } from "antd";
import {
  Col,
  Input,
  Row,
  Tabs,
  Select,
  Form,
  Menu,
  Avatar,
  Drawer,
  Modal,
  Layout,
  Space,
} from "antd";
import axios from "axios";
import API from "../baseUrl.json";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import BleachingHeader from "../Components/BleachingHeader"; // Ensure to import your BleachingHeader component correctly
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { FaRectangleList, FaTableList } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Tooltip } from "antd";
import { FaUserCircle } from "react-icons/fa";
import {
  IoPrint,
  IoSave,
  IoLockClosedOutline,
  IoCreate,
  IoDownload
} from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineSignature } from "react-icons/ai";
import { GrDocumentStore } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";

const UserSummary = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { Header, Footer, Sider, Content } = Layout;
  const [messageApi, contextHolder] = message.useMessage();
  const contentStyle = {
    color: "#000",
    backgroundColor: "#fce410",
  };
  const siderStyle = {
    color: "#fff",
    backgroundColor: "white",
  };
  const layoutStyle = {
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/bleachStorePersons/getAll`,
          {
            headers,
          }
        );

        // Filter out users with incomplete data
        const filteredUsers = response.data.filter(
          (user) => user.departmentName !== null && user.name !== null
        );

        setUsers(filteredUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to fetch users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusToggle = async (id, isActive, departmentName, name) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      // Toggle isActive value
      const newStatus = isActive === "Y" ? "N" : "Y";

      const data = {
        id: id,
        isActive: newStatus,
        departmentName: departmentName,
        name: name,
      };

      await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/bleachStorePersons/CreateOrUpdate`,
        data,
        { headers }
      );

      // Update user list after status change
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return { ...user, isActive: newStatus };
        }
        return user;
      });

      setUsers(updatedUsers);
      message.success("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Failed to update user status. Please try again.");
    }
  };

  const navigateToStoreUser = () => {
    navigate("/Precot/storeuser"); // Navigate to /Precot/storeuser
  };

  const columns = [
    {
      title: "S.No",
      key: "serial",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Department Name",
      dataIndex: "departmentName",
      key: "departmentName",
      align: "center",
      render: (departmentName) => departmentName || "-",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => name || "-",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive) => (
        <span>{isActive === "Y" ? "Active" : "Inactive"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Button
          onClick={() =>
            handleStatusToggle(
              record.id,
              record.isActive,
              record.departmentName,
              record.name
            )
          }
          type="link"
        >
          {record.isActive === "Y" ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  const handleBack = () => {
    navigate("/Precot/welcome");
  };

  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to Logout?",
      onOk() {
        navigate("/Precot");
      },
      onCancel() {
        // console.log("Cancel");
      },
      okText: "Yes",
      cancelText: "No",
    });
  };
  return (
    <>
      {" "}
      <div>
        {contextHolder}
        <Sider width="100%" style={siderStyle} className="sider-layout">
          <>
            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="primary"
                icon={<TbMenuDeep />}
                onClick={showDrawer}
                style={{
                  margin: "0.5em",
                }}
              ></Button>
            </Space>
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
                }}
                items={[
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <p
                        style={{
                          color: "#151718",
                        }}
                      >
                        User Create
                      </p>
                    ),
                    onClick: () => navigate("/Precot/usercreate"),
                  },
                  {
                    key: "3",
                    icon: <FaRectangleList color="#151718" />,
                    label: (
                      <p
                        style={{
                          color: "#151718",
                        }}
                      >
                        User List
                      </p>
                    ),
                    onClick: () => navigate("/Precot/userlist"),
                  },
                  {
                    key: "4",
                    icon: <FaRectangleList color="#151718" />,
                    label: (
                      <p
                        style={{
                          color: "#151718",
                          fontSize: "1.0rem",
                          fontWeight: "bold",
                        }}
                      >
                        Store list
                      </p>
                    ),
                    onClick: () => navigate("/Precot/storeusersummary"),
                  },
                  {
                    key: "5",
                    icon: <AiOutlineSignature color="#151718" />,
                    label: (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
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
                    icon: <IoDownload color="#151718" />,
                    label: (
                      <p
                        style={{
                          color: "#151718",
                        }}
                      >
                        Report
                      </p>
                    ),
                    onClick: () => navigate("/Precot/reportDown"),
                  },
                  {
                    key: "7",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => {
                          // if (confirm("Are you sure want to logout"))
                          {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                      />
                    ),
                    label: (
                      <p
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </p>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]}
              />
            </Drawer>
          </>
        </Sider>
        <BleachingHeader
          formName=" Store User Summary"
          buttonsArray={[
            <Button
              onClick={navigateToStoreUser}
              type="primary"
              style={{
                marginRight: "10px",
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<GoArrowRight color="#00308F" />}
            >
              Create Store User
            </Button>,
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              icon={<GoArrowLeft color="#00308F" />}
              onClick={handleBack}
            >
              &nbsp;Back
            </Button>,
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: "2%",
              }}
              shape="round"
              icon={<BiLock color="#00308F" />}
              onClick={showConfirm}
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
      </div>
      <div style={{ padding: "20px" }}>
        {}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        ></div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 7 }}
            rowKey="id"
          />
        )}
      </div>
    </>
  );
};

export default UserSummary;
