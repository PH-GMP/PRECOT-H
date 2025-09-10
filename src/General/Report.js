/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Flex,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Row,
  Select,
  Space,
  notification,
  Modal,
} from "antd";
import { CiBoxList } from "react-icons/ci";
import { FaLock, FaRectangleList, FaTableList } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoCreate, IoDownload } from "react-icons/io5";
import { IoIosApps } from "react-icons/io";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import API from "../baseUrl.json";
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
const Report = () => {
  const [role, setRole] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [departmentList, setdepartmentList] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const openNotification = (type, message, nav) => {
    if (nav == "navigate") {
      setTimeout(() => {
        setButtonLoading(false);
        navigate("/Precot/userlist");
        notification[type]({
          message: message,
        });
      }, [1000]);
    } else if (nav == "nonavigate") {
      setButtonLoading(false);
      notification[type]({
        message: message,
      });
    }
  };

  const { Option } = Select;

  const token = localStorage.getItem("token");

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

  const navigate = useNavigate();
  useEffect(() => {
    const x = localStorage.getItem("role");
    setRole(x);
  }, []);

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "Please fill all fields",
    });
  };

  const onFinish = () => {
    if (!fromDate || !toDate) {
      message.error("Both From Date and To Date are required!");
      return;
    }

    setButtonLoading(true);

    axios
      .get(`${API.prodUrl}/Precot/api/document/formCounts`, {
        params: { fromdate: fromDate, todate: toDate },
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `Report_${fromDate}_to_${toDate}.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        message.success("Report downloaded successfully!");
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
        message.error("Failed to download report. Please try again.");
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
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
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: "500%",
              }}
              shape="round"
              icon={<BiLock color="#00308F" />}
              onClick={showConfirm}
            >
              Logout
            </Button>
            ,
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
                        fontSize: "1.0rem",
                        fontWeight: "bold",
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
      {/* space for content */}
      <Row>
        <Col
          xs={24}
          md={24}
          style={{
            display: "flex",
            flexDirection: "coulmn",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            name="basic"
            style={{
              width: "40%",
              position: "relative",
            }}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <center>
              <div
                style={{
                  width: "30vh",
                  border: "1px solid lightblue",
                  height: "40px",
                  alignItems: "center",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  padding: "5px",
                }}
              >
                <span>
                  <FaDownload
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "27px",
                    }}
                  />
                </span>
                <span>
                  <h3
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#333",
                      margin: "0",
                    }}
                  >
                    Report
                  </h3>
                </span>
              </div>
            </center>
            <Form.Item
              style={{
                margin: "0.4em",
                marginTop: "2rem",
              }}
              label="From Date"
              name="fromDate"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              style={{
                margin: "0.4em",
              }}
              label="To Date"
              name="toDate"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              style={{
                marginLeft: "0.4em",
                marginRight: "0em",
                marginTop: "1em",
              }}
            >
              <Space size="large">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={buttonLoading}
                >
                  Download
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Report;
