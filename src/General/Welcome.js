/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Flex,
  Layout,
  Menu,
  Row,
  Space,
  Modal,
} from "antd";
import { CiBoxList } from "react-icons/ci";
import { FaLock, FaRectangleList, FaTableList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoCreate, IoDownload } from "react-icons/io5";
import { IoIosApps } from "react-icons/io";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import { AiOutlineSignature } from "react-icons/ai";

const { Header, Footer, Sider, Content } = Layout;

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
const Welcome = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const x = localStorage.getItem("role");
    setRole(x);
  }, []);

  //logout

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Precot");
  };
  const showModal = () => {
    setShowLogoutModal(true);
  };
  const handleCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="hell-1">
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
                margin: "1em",
              }}
            ></Button>
            <Button
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
            </Button>
          </Space>
          <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            width="fit-content"
            style={{
              padding: "1em",
              backgroundColor: "#CEEBF3",
            }}
          >
            <Row align="middle">
              <Col>
                <Avatar
                  style={{
                    backgroundColor: "#1890ff",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {localStorage.getItem("username").at(0)}
                </Avatar>
              </Col>
              <Col
                style={{
                  marginLeft: "1em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#333",
                  }}
                >
                  {localStorage.getItem("username")}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                  }}
                >
                  {localStorage.getItem("role")}
                </div>
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
                marginTop: "30px",
              }}
              items={
                role == "ROLE_QA"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <p
                            style={{
                              color: "#151718",
                            }}
                          >
                            Generation
                          </p>
                        ),
                        onClick: () => navigate("/Precot/Generate"),
                      },

                      {
                        key: "2",
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
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.0rem",
                              fontWeight: "bold",
                              color: "#151718",
                            }}
                          >
                            Logout
                          </div>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : [
                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.0rem",
                              fontWeight: "bold",
                              color: "#151718",
                            }}
                          >
                            User Create
                          </div>
                        ),
                        onClick: () => navigate("/Precot/usercreate"),
                      },
                      {
                        key: "3",
                        icon: <FaRectangleList color="#151718" />,
                        label: (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.0rem",
                              fontWeight: "bold",
                              color: "#151718",
                            }}
                          >
                            User List
                          </div>
                        ),
                        onClick: () => navigate("/Precot/userlist"),
                      },
                      {
                        key: "4",
                        icon: <FaRectangleList color="#151718" />,
                        label: (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.0rem",
                              fontWeight: "bold",
                              color: "#151718",
                            }}
                          >
                            Store List
                          </div>
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
                              fontSize: "1.0rem",
                              fontWeight: "bold",
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
                              fontWeight: "bold",
                              color: "#151718",
                              fontSize: "1.0rem",
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
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.0rem",
                              fontWeight: "bold",
                              color: "#151718",
                            }}
                          >
                            Logout
                          </div>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </Drawer>
          <Modal
            visible={showLogoutModal}
            onOk={handleLogout}
            onCancel={handleCancel}
            okText="Confirm"
            cancelText="Cancel"
          >
            <h3 style={{ color: "red" }}>Are you sure you want to logout?</h3>
          </Modal>
        </>
      </Sider>
      {/* space for content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          // backgroundColor: "#f0f0f0",
          fontFamily: "Arial, sans-serif",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Welcome, {localStorage.getItem("username")}!
      </div>
    </div>
  );
};

export default Welcome;
