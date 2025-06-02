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
  Checkbox,
} from "antd";
import { CiBoxList } from "react-icons/ci";
import { FaLock, FaRectangleList, FaTableList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoCreate, IoDownload } from "react-icons/io5";
import { IoIosApps } from "react-icons/io";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import API from "../baseUrl.json";
import { AiOutlineSignature } from "react-icons/ai";
import addUser from "../Assests/add-user.png";

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
const UserCreate = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmailId] = useState("");

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [openalert, setopenalert] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [departmentId, setdepartmentId] = useState("");
  const [departmentList, setdepartmentList] = useState();
  const [selectedDepartments, setSelectedDepartments] = useState([]);
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

  // Shift Get api for show the shift values.....
  useEffect(() => {
    // Fetch shift options from the API
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );
        // setdepartmentList(response.data);
        // console.log("Shift Lov ", response.data);
        const a = response.data.map((x, i) => {
          return {
            value: x.id,
            label: x.department,
          };
        });
        setdepartmentList(a);

        // console.log("Aaaa", a);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  const [userRolesLov, setUserRolesLov] = useState();
  const [userRole, setUserRoles] = useState();
  // console.log("User Roles", userRole);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${ API.prodUrl}/Precot/api/Users/Service/getListOfRoles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("RFQ", res.data);
        // const set = new Set(res.data);
        // console.log("set",set)
        const a = res.data.map((x, i) => {
          return {
            value: x.name,
            label: x.name,
          };
        });
        console.log("Roles", a);
        setUserRolesLov(a);
      })
      .catch((err) => {
        // console.log("Error in userRole", err);
      });
  }, []);

  const handleRole = (e) => {
    setUserRoles(e.target.value);
  };

  // const onChangeDepartment = (values) => {
  //   // console.log("Department Values :", values);
  //   setdepartmentId(values);
  // };

  const onChangeDepartment = (value) => {
    // Update selected departments when user selects/deselects departments
    setSelectedDepartments(value);

    console.log("Selected Department IDs: ", value); // Log the selected department IDs
  };

  const onChangeRole = (values) => {
    // console.log("Role Values :", values);
    setUserRoles(values);
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

  const onFinish = (values) => {
    setButtonLoading(true);
    axios
      .post(`${ API.prodUrl}/Precot/api/auth/signup`, {
        name: name,
        username: username,
        email: email,
        password: password,
        userRoles: userRole,
        // departmentId: departmentId,
        departmentId: selectedDepartments,
      })
      .then((res) => {
        message.success({
          content: res.data.message,
        });
        if (res.status == 200 || res.status == 201) {
          message.success(res.data.message);
          setButtonLoading(false);
          setTimeout(() => {
            navigate("/Precot/userlist");
          }, [1000]);
        }
        // If additional handling of the response is needed
        if (res.data.status === "false") {
          setTimeout(() => {
            message.error({
              content: res.data.message,
            });
            setButtonLoading(false);
            navigate("/Precot/userlist");
          }, [1000]);
        }
      })
      .catch((err) => {
        console.error("Error", err.response.data);
        if (err.response && err.response.data) {
          const errorMessage = [];
          const errorMessage2 = [];
          if (
            err.response.data.message == "User Created! but unable to Send Mail"
          ) {
            errorMessage.push(err.response.data.message);
          }
          if (
            err.response.data.message &&
            err.response.data.message !==
              "User Created! but unable to Send Mail"
          ) {
            errorMessage2.push(err.response.data.message);
          }
          if (err.response.data.email) {
            errorMessage.push(`Email: ${err.response.data.email}`);
          }
          if (err.response.data.name) {
            errorMessage2.push(`Name: ${err.response.data.name}`);
          }
          if (err.response.data.username) {
            errorMessage.push(`Username: ${err.response.data.username}`);
          }
          if (err.response.data.password) {
            errorMessage2.push(`Password: ${err.response.data.password}`);
          }
          if (errorMessage.length > 0) {
            openNotification("error", errorMessage.join(", "), "navigate");
          } else if (errorMessage2.length > 0) {
            openNotification("error", errorMessage2.join(", "), "nonavigate");
          }
        } else {
          openNotification("error", "An error occurred", "nonavigate");
        }
      });
    // .finally(() => {
    //   setLoading(false);
    // });
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
                        fontSize: "1.0rem",
                        fontWeight: "bold",
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
                  <img
                    src={addUser}
                    alt="Group Icon"
                    color="#00308F"
                    style={{
                      width: "30px",
                      height: "30px",
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
                    Create User
                  </h3>
                </span>
              </div>
            </center>
            <Form.Item
              style={{
                margin: "0.4em",
              }}
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              style={{
                margin: "0.4em",
              }}
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              style={{
                margin: "0.4em",
              }}
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              style={{
                margin: "0.4em",
              }}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
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
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select Departments"
                value={selectedDepartments}
                onChange={onChangeDepartment}
                options={departmentList}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <div
                      style={{
                        padding: "8px",
                        textAlign: "center",
                        borderTop: "1px solid #e8e8e8",
                      }}
                    >
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDepartments(
                              departmentList.map((d) => d.value)
                            );
                          } else {
                            setSelectedDepartments([]);
                          }
                        }}
                        checked={
                          selectedDepartments &&
                          departmentList &&
                          selectedDepartments.length === departmentList.length
                        }
                      >
                        Select All
                      </Checkbox>
                    </div>
                  </div>
                )}
                optionRender={(option) => (
                  <Space>
                    <Checkbox
                      checked={selectedDepartments.includes(option.value)}
                      onChange={() => {}}
                    />
                    <span>{option.label}</span>
                  </Space>
                )}
              />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
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
                onChange={onChangeRole}
                options={userRolesLov && userRolesLov}
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
                  Create
                </Button>
                <Button type="default" htmlType="reset" loading={buttonLoading}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserCreate;
