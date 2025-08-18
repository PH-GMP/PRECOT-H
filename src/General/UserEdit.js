import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Switch
} from "antd";
import { useEffect, useState } from "react";

import axios from "axios";
import { AiOutlineSignature } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaLock, FaRectangleList } from "react-icons/fa6";
import { IoCreate, IoDownload } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import editIcon from "../Assests/edit-icon.png";
import API from "../baseUrl.json";

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
  const { Option } = Select;
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
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

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
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );
        const a = response.data.map((x, i) => {
          return {
            value: x.id,
            label: x.department,
          };
        });
        setDepartmentList(a);
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
    console.log("validDepartmentIds", validDepartmentIds);
    // Basic form validation
    setLoading(true);
    // API endpoint for sign-up
    axios
      .put(
        `${API.prodUrl}/Precot/api/Users/Service/updateUserDetails`,
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
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
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
  const departmentOptions = Object.keys(departmentMapping).map((id) => ({
    value: Number(id),
    label: departmentMapping[id],
  }));
  // Function to get department names from an array of IDs
  const getDepartmentName = (deptIDs) => {
    if (!deptIDs || deptIDs.length === 0) return [];
    return deptIDs
      .map((id) => departmentMapping[id] || "")
      .filter((name) => name);
  };

  const handleChange = (selectedValues) => {
    if (selectedValues.includes("ALL")) {
      // Select all departments
      const allIds = departmentList.map((item) => item.value);
      const allNames = departmentList.map((item) => item.label);
      console.log("allIds", allIds);
      console.log("allNames", allNames);
      setDepartmentId(allIds);
      setSelectedDepartments(allNames);
    } else {
      // Filter out "ALL" if it was accidentally left in selected
      const validIds = selectedValues.filter((val) => val !== "ALL");
      const selectedNames = departmentList
        .filter((item) => validIds.includes(item.value))
        .map((item) => item.label);
      console.log("validIds", validIds);
      console.log("selectedNames", selectedNames);
      setDepartmentId(validIds);
      setSelectedDepartments(selectedNames);
    }
  };

  const getSelectedValues = () => {
    // Convert current departmentId state to match <Select> value
    return departmentId;
  };

  console.log("departmentOptions", departmentOptions);

  useEffect(() => {
    // console.log("token", token);
    const fetchData = async () => {
      try {
        // console.log("g", localStorage.getItem("token"));
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
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

        setId(newArray[0].id);
        setName(newArray[0].name);
        setUserName(newArray[0].username);
        const randomPassword = generateRandomPassword();
        setPassword(randomPassword);
        setEmail(newArray[0].email);
        setRole(newArray[0].roles[0].name);
        let departmentIds = [];
        if (newArray[0].departments?.length > 0) {
          departmentIds = newArray[0].departments.map((dept) => dept.id);
        } else if (newArray[0].departmentId) {
          departmentIds = [newArray[0].departmentId];
        }
        setSelectedDepartments(getDepartmentName(departmentIds));
        setDepartmentId(departmentIds);
        console.log("departmentIds", departmentIds);
        const fetchedUserActive = newArray[0].is_Active;
        setUserActive(fetchedUserActive);
        setData(response.data);
      } catch (error) {
        // console.log("Error in userRole", error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(" sdf", token);
    axios
      .get(`${API.prodUrl}/Precot/api/Users/Service/getListOfRoles`, {
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
      .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
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

                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Select departments"
                  value={getSelectedValues()}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                >
                  <Option key="ALL" value="ALL">
                    Select All
                  </Option>
                  {departmentList.map((dept) => (
                    <Option key={dept.value} value={dept.value}>
                      {dept.label}
                    </Option>
                  ))}
                </Select>
                {/* Display selected names below */}
                <div style={{ marginTop: 10 }}></div>
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
