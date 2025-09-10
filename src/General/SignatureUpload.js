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
  Upload,
} from "antd";
import { CiBoxList } from "react-icons/ci";
import { FaLock, FaRectangleList, FaTableList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoCreate, IoDownload } from "react-icons/io5";
import { IoIosApps } from "react-icons/io";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import API from "../baseUrl.json";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
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

const SignatureUpload = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmailId] = useState("");

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [openalert, setopenalert] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [departmentId, setdepartmentId] = useState("");
  const [departmentList, setdepartmentList] = useState();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const { Option } = Select;

  const token = localStorage.getItem("token");
  // console.log("first", token);

  const [usernameList, setUsernameList] = useState();
  const [fileList, setFileList] = useState([]);
  const [userRole, setUserRoles] = useState();
  const [imageId, setImageId] = useState(null);

  // console.log("User Roles", userRole);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API.prodUrl}/Precot/api/Users/Service/getListOfUsers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log("Responce data", res.data);
        const filteredUsers = res.data.filter((user) => user.name !== "admin");
        const a = filteredUsers.map((x, i) => {
          return {
            value: x.username,
            label: x.username,
          };
        });
        setUsernameList(a);
      })
      .catch((err) => {
        // console.log("Error in userRole", err);
      });
  }, []);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .delete(
        `${API.prodUrl}/Precot/api/Format/Service/deleteImage?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        message.success("Image deleted successfully!");
        setGetImage("");
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to delete image.");
        // console.log("Error in deleting image:", err);
        setLoading(false);
      });
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    if (username) {
      const token = localStorage.getItem("token");
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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
          setFileList([]);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [username]);

  // console.log("get image", getImage);

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const [loading1, setLoading1] = useState(false);

  const handleUpload = () => {
    if (!username || fileList.length === 0) {
      message.error("Please select a username and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);

    const token = localStorage.getItem("token");
    // console.log("token", token);
    setLoading1(true);

    axios
      .post(
        `${API.prodUrl}/Precot/api/Format/Service/uploadImage?username=${username}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        message.success(res.data.message);
        // console.log("Response:", res.data);
        setLoading1(false);
        navigate("/Precot/welcome");
      })
      .catch((err) => {
        message.error("Upload failed.");
        // console.log("Error:", err);
        setLoading1(false);
      });
  };

  const handleRole = (e) => {
    setUserRoles(e.target.value);
  };

  const onChangeDepartment = (values) => {
    // console.log("Department Values :", values);
    setdepartmentId(values);
  };

  const onChangeName = (values) => {
    // console.log("Role Values :", values);
    setUserName(values);
    setGetImage("");
    setFileList([]);
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
            // onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <center>
              <h1>Signature Upload</h1>
            </center>

            <Form.Item
              label="User Name"
              name="username"
              style={{
                margin: "0.4em",
              }}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{ width: "500px" }}
                showSearch
                onChange={onChangeName}
                options={usernameList && usernameList}
              />
            </Form.Item>
            <Form.Item
              label="Upload Signature"
              style={{
                margin: "0.4em",
              }}
            >
              {getImage ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={getImage}
                    alt="Signature"
                    style={{ width: "50%", height: "auto" }}
                  />
                  <Button
                    type="text"
                    loading={loading}
                    icon={<DeleteOutlined />}
                    style={{ position: "absolute", color: "red" }}
                    onClick={handleDelete}
                  />
                </div>
              ) : (
                <Upload
                  fileList={fileList}
                  onChange={onUploadChange}
                  beforeUpload={() => false}
                >
                  <Button style={{ width: "500px" }} icon={<UploadOutlined />}>
                    Select Image
                  </Button>
                </Upload>
              )}
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
                  onClick={handleUpload}
                  loading={loading1}
                >
                  Upload
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignatureUpload;
