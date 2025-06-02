import React, { useRef, useEffect, useState } from "react";
import qs from "qs";
import {
  Button,
  Drawer,
  Layout,
  Space,
  Breadcrumb,
  Input,
  Col,
  Row,
  notification,
  Select,
  Card,
  Modal,
  Switch,
  Menu,
  Avatar,
  Form,
  message,
  Checkbox,
} from "antd";

import {
  Link as RouterLink,
  useNavigate,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { IoCreate, IoDownload } from "react-icons/io5";
import { FaLock, FaRectangleList } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import API from "../baseUrl.json";
import { BiLock } from "react-icons/bi";
import { AiOutlineSignature } from "react-icons/ai";
import editIcon from "../Assests/edit-icon.png";

////////////////////////////////////////////////////////////////////////////////
const { Header, Footer, Sider, Content } = Layout;
const contentStyle = {
  color: "#000",
};
const siderStyle = {
  color: "#fff",
  backgroundColor: "white",
};
const layoutStyle = {
  width: "100%",
  height: "100vh",
};

export default function UserEdit() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departmentLOV, setDepartmentLOV] = useState();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    userRoles: "",
    departmentId: "",
    is_active: "",
  });
  const [data, setData] = useState();
  const params = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userActive, setUserActive] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  // const [departmentName, setdepartmentName] = useState([]);
  // const [departmentList, setDepartmentList] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const regex = /^[a-zA-Z0-9]+$/;

    if (name === "name" || name === "username") {
      if (!regex.test(e.key)) {
        e.preventDefault();
        openNotification(
          "error",
          `Special characters are not allowed in ${name}`
        );
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData("text");
    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(pastedText)) {
      e.preventDefault();
      openNotification("error", "Pasting special characters is not allowed");
      return;
    }
  };

  // const onChangeDepartment = (values) => {
  //   // console.log("Department Values :", values);
  //   setDepartmentId(values);
  // };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = useRef(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const token = localStorage.getItem("token");

  const [visible, setVisible] = useState(false);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    // console.log("Logging out...");

    navigate("/Precot");
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setLogoutModalVisible(false);
  };

  const handleMenuClick = (e) => {
    setVisible(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const fixedHeaderStyle = {
    position: "fixed",
    width: "100%",
    zIndex: 1000,
  };

  const fixedSiderStyle = {
    position: "fixed",
    height: "100%",
    overflowY: "auto",
    zIndex: 100,
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

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
        // setDepartmentList(response.data);
        // console.log("Shift Lov ", response.data);
        const a = response.data.map((x, i) => {
          return {
            value: x.id,
            label: x.department,
          };
        });
        setDepartmentList(a);

        // console.log("Aaaa", a);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  const userUpdate = () => {
    const validDepartmentIds = departmentId.map((val) => {
      const foundDept = departmentList.find((dept) => dept.label === val);
      return foundDept ? foundDept.value : val;
    });
    // Basic form validation
    setLoading(true);
    // API endpoint for sign-up
    axios
      .put(
        `${ API.prodUrl}/Precot/api/Users/Service/updateUserDetails`,
        {
          id: id,
          name: name,
          username: userName,
          password: password,
          email: email,
          userRoles: role,
          is_active: userActive,
          // departmentId: departmentId,
          departmentId: validDepartmentIds,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
        }
      )
      .then((res) => {
        // console.log("Sign Up Response:", res.data);
        // console.log("Sign Up Response:", res.data);
        openNotification("success", res.data.message);
        setLoading(false);

        // If additional handling of the response is needed
        if (res.data.status === "false") {
          message.error({
            content: res.data.message,
          });
        }
      })
      .then((res) => {
        // Additional then handler if needed
        // You can chain more .then() here if required
        navigate("/Precot/userlist");
      })
      .catch((err) => {
        console.error("Error", err.response.data);

        if (err.response && err.response.data) {
          const errorMessage = [];

          if (err.response.data.message) {
            errorMessage.push(err.response.data.message);
          }
          if (err.response.data.email) {
            errorMessage.push(`Email: ${err.response.data.email}`);
          }
          if (err.response.data.name) {
            errorMessage.push(`Name: ${err.response.data.name}`);
          }
          if (err.response.data.username) {
            errorMessage.push(`Username: ${err.response.data.username}`);
          }
          if (err.response.data.password) {
            errorMessage.push(`Password: ${err.response.data.password}`);
          }

          openNotification("error", errorMessage.join(", "));
          // setLoading(false);
        } else {
          openNotification("error", "An error occurred");
          // setLoading(false);
        }
      })
      .finally(() => {
        // Stop loading regardless of success or error
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch departments from the API
    const fetchDepartments = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );

        const departments = response.data.map((x) => ({
          value: x.id,
          label: x.department,
        }));
        setDepartmentList(departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [token]);

  const onChangeDepartment = (value) => {
    setSelectedDepartments(value);
    setDepartmentId(value);
    console.log("Selected Department IDs: ", value);
  };

  // const getDepartmentName = (departmentIds) => {
  //   // Check if departmentIds is an array, if not return an empty array
  //   const ids = Array.isArray(departmentIds) ? departmentIds : [];

  //   return ids.map((id) => {
  //     const department = departmentList.find((dept) => dept.value === id);
  //     return department ? department.label : null;
  //   });
  // };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).substring(7); // Generate a random alphanumeric string
    return randomPassword;
  };

  const departmentMapping = {
    1: "BLEACHING",
    2: "SPUNLACE",
    3: "PAD_PUNCHING",
    4: "DRY_GOODS",
    5: "QUALITY_CONTROL",
    6: "QUALITY_ASSURANCE",
    7: "PPC",
    8: "STORE",
    9: "DISPATCH",
    10: "PRODUCT_DEVELOPMENT",
    11: "ENGINEERING",
    12: "COTTON_BUDS",
    13: "MARKETING",
    14: "HR",
  };

  // Function to get department names from an array of IDs
  const getDepartmentName = (deptIDs) => {
    if (!deptIDs || deptIDs.length === 0) return [];
    return deptIDs
      .map((id) => departmentMapping[id] || "")
      .filter((name) => name);
  };

  const departmentOptions = Object.keys(departmentMapping).map((id) => ({
    value: Number(id),
    label: departmentMapping[id],
  }));

  useEffect(() => {
    // console.log("token", token);
    const fetchData = async () => {
      try {
        // console.log("g", localStorage.getItem("token"));
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const newArray = response.data.filter((value) => {
          return value.id == params.id;
        });

        // console.log("This Is NewArray", newArray);
        setId(newArray[0].id);
        setName(newArray[0].name);
        setUserName(newArray[0].username);
        const randomPassword = generateRandomPassword();
        setPassword(randomPassword);
        setEmail(newArray[0].email);
        setRole(newArray[0].roles[0].name);
        // setDepartmentId(newArray[0].departmentId);
        let departmentIds = [];
        if (newArray[0].departmentId) {
          departmentIds = [newArray[0].departmentId];
        } else if (newArray[0].departments?.length > 0) {
          departmentIds = newArray[0].departments.map((dept) => dept.id);
        }
        setSelectedDepartments(getDepartmentName(departmentIds));
        setDepartmentId(departmentIds);
        console.log("departmentIds", departmentIds);
        const fetchedUserActive = newArray[0].is_Active;
        // console.log("Fetched User Active:", fetchedUserActive);
        setUserActive(fetchedUserActive);
        setData(response.data);
      } catch (error) {
        // console.log("Error in userRole", error);
      }
    };
    fetchData();
  }, [token]);

  // const getDepartmentName = (deptID) => {
  //   switch (Number(deptID)) {
  //     case 1:
  //       return "BLEACHING";
  //     case 2:
  //       return "SPUNLACE";
  //     case 3:
  //       return "PAD_PUNCHING";
  //     case 4:
  //       return "DRY_GOODS";
  //     case 5:
  //       return "QUALITY_CONTROL";
  //     case 6:
  //       return "QUALITY_ASSURANCE";
  //     case 7:
  //       return "PPC";
  //     case 8:
  //       return "STORE";
  //     case 9:
  //       return "DISPATCH";
  //     case 10:
  //       return "PRODUCT_DEVELOPMENT";
  //     case 11:
  //       return "ENGINEERING";
  //     case 12:
  //       return "COTTON_BUDS";
  //     case 13:
  //       return "MARKETTING";
  //     default:
  //       return "";
  //   }
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(" sdf", token);
    axios
      .get(`${ API.prodUrl}/Precot/api/Users/Service/getListOfRoles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log("Role", res.data);
        setUserRole(res.data);
      })
      .catch((err) => {
        // console.log("Error in userRole", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(" sdf", token);
    axios
      .get(`${ API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log("Response", res.data);
        // setDepartmentLOV(res.data);
        // console.log("Deparment Lov ", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.id,
            label: x.department,
          };
        });
        setDepartmentLOV(a);

        // console.log("User Edit Aaaa", a);
      })
      .catch((err) => {
        // console.log("Error in userRole", err);
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };
  return (
    <div>
      {/* command */}
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
                        fontSize: "1.0rem",
                        fontWeight: "bold",
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
                        if (window.confirm("Are you sure want to logout")) {
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

      <div className="content-div" style={{ margin: "0px" }}>
        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "2px",
          }}
        >
          <div
            style={{
              boxShadow: "10px",
              width: "30vh",
              border: "1px solid lightblue",
              height: "40px",
              alignItems: "center",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              marginLeft: "50px",
            }}
          >
            <span>
              <img
                src={editIcon}
                alt="Group Icon"
                color="#00308F"
                style={{ width: "30px", height: "30px", marginLeft: "27px" }}
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
                Edit Info
              </h3>
            </span>
          </div>
          <div>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Col
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                <label htmlFor="name">Name</label>
                <Input
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // onKeyDown={handleInputChange}
                  // onPaste={handlePaste}
                  required
                  autoComplete="off"
                  onKeyPress={(e) => {
                    const regex = /^[A-Za-z0-9]+$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{ textAlign: "center" }}
                />
              </Col>
              <Col
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                <label htmlFor="userName">Username</label>
                <Input
                  placeholder="User Name"
                  name="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)} // onKeyDown={handleInputChange}
                  // onPaste={handlePaste}
                  required
                  autoComplete="off"
                  onKeyPress={(e) => {
                    const regex = /^[A-Za-z0-9]+$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{ textAlign: "center" }}
                />
              </Col>
              <Col
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                <label htmlFor="Password">Password</label>
                <Input
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="off"
                  style={{ textAlign: "center" }}
                />
              </Col>
              <Col
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                <label htmlFor="E-mail">Email</label>
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                  style={{ textAlign: "center" }}
                />
              </Col>
              <Col
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                <label htmlFor="E-mail">Department</label>
                {/* <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select departments"
                  value={getDepartmentName(departmentId) || selectedDepartments}
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
                              setDepartmentId(
                                departmentList.map((d) => d.value)
                              );
                            } else {
                              setSelectedDepartments([]);
                              setDepartmentId([]);
                            }
                          }}
                          checked={
                            (departmentList?.length || 0) > 0 &&
                            (selectedDepartments?.length || 0) ===
                              (departmentList?.length || 0)
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
                /> */}
                {/* <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select departments"
                  value={selectedDepartments}
                  onChange={(values) => {
                    setSelectedDepartments(values);
                    console.log("values", values);
                    setDepartmentId(
                      values.map((name) =>
                        Number(
                          Object.keys(departmentMapping).find(
                            (key) => departmentMapping[key] === name
                          )
                        )
                      )
                    );
                  }}
                  options={departmentOptions} // Using renamed variable
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
                                departmentOptions.map((d) => d.label)
                              );
                              setDepartmentId(
                                departmentOptions.map((d) => d.value)
                              );
                            } else {
                              setSelectedDepartments([]);
                              setDepartmentId([]);
                            }
                          }}
                          checked={
                            departmentOptions.length > 0 &&
                            selectedDepartments.length ===
                              departmentOptions.length
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
                        checked={selectedDepartments.includes(option.label)}
                        onChange={() => {}}
                      />
                      <span>{option.label}</span>
                    </Space>
                  )}
                /> */}
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select departments"
                  value={selectedDepartments}
                  onChange={(values) => {
                    console.log("Selected values:", values);

                    // Ensure all selected values are department names
                    const updatedNames = values.map((val) => {
                      // If val is an ID, find the corresponding name
                      return departmentMapping[val] || val;
                    });

                    setSelectedDepartments(updatedNames);

                    // Convert names back to IDs for API submission
                    const updatedIds = updatedNames.map((name) =>
                      Number(
                        Object.keys(departmentMapping).find(
                          (key) => departmentMapping[key] === name
                        )
                      )
                    );

                    setDepartmentId(updatedIds);
                  }}
                  options={departmentOptions}
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
                              const allNames = departmentOptions.map(
                                (d) => d.label
                              );
                              const allIds = departmentOptions.map(
                                (d) => d.value
                              );

                              setSelectedDepartments(allNames);
                              setDepartmentId(allIds);
                            } else {
                              setSelectedDepartments([]);
                              setDepartmentId([]);
                            }
                          }}
                          checked={
                            departmentOptions.length > 0 &&
                            selectedDepartments.length ===
                              departmentOptions.length
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
                        checked={selectedDepartments.includes(option.label)}
                        onChange={() => {}}
                      />
                      <span>{option.label}</span>
                    </Space>
                  )}
                />
                
              </Col>

              <Col
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                <label htmlFor="Roles">Roles</label>
                <Select
                  showSearch
                  placeholder="Select Role"
                  value={role}
                  onChange={(selectedRole) => setRole(selectedRole)}
                  style={{ width: "100%", textAlign: "center" }}
                  filterOption={(inputValue, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0
                  }
                  required
                >
                  {userRole.map((role) => (
                    <Select.Option key={role.id} value={role.name}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                <Switch
                  checkedChildren="ACTIVE"
                  unCheckedChildren="INACTIVE"
                  checked={userActive == "Y"}
                  onChange={(checked) => setUserActive(checked ? "Y" : "N")}
                />
              </Col>
            </Row>
          </div>
          <Space
            size="large"
            style={{
              marginTop: "1em",
            }}
          >
            <Button type="primary" loading={loading} onClick={userUpdate}>
              Update
            </Button>

            <Button onClick={handleGoBack}>Back</Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}
