/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
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
  Table,
  Tag,
} from "antd";
import { CiBoxList } from "react-icons/ci";
import { FaLock, FaRectangleList, FaTableList } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoCreate, IoDownload } from "react-icons/io5";
import { IoIosApps } from "react-icons/io";
import { TbMenuDeep } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import API from "../baseUrl.json";
import { BiLock } from "react-icons/bi";
import { AiOutlineSignature } from "react-icons/ai";
import groupIcon from "../Assests/group.png";

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
const UserList = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [openalert, setopenalert] = useState(false);
  const [department, setDepartment] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getDepartmentName = (deptID) => {
    console.log("deptIDgetDepartmentName", deptID);
    switch (Number(deptID)) {
      case 1:
        return "BLEACHING";
      case 2:
        return "SPUNLACE";
      case 3:
        return "PAD_PUNCHING";
      case 4:
        return "DRY_GOODS";
      case 5:
        return "QUALITY_CONTROL";
      case 6:
        return "QUALITY_ASSURANCE";
      case 7:
        return "PPC";
      case 8:
        return "STORE";
      case 9:
        return "DISPATCH";
      case 10:
        return "PRODUCT_DEVELOPMENT";
      case 11:
        return "ENGINEERING";
      case 12:
        return "COTTON_BUDS";
      case 13:
        return "MARKETTING";
      case 14:
        return "HR";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("first", response.data);
        setData(response.data.slice(1));
        setLoading(false);
        axios
          .get(`${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            // console.log("Response", res.data);
            setDepartment(res.data);
          })
          .catch((err) => {
            // console.log("Error", err);
          });
      } catch (error) {
        // console.log("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleGoBack = () => {
    navigate(-1);
  };
  const paginationOptions = {
    pageSize: 11,
    showSizeChanger: true,
    pageSizeOptions: ["6", "8", "10"],
  };

  const columns = [
    {
      title: (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Role
        </h2>
      ),
      dataIndex: "roles",
      key: "roles",
      render: (roles) =>
        roles.map((role) => (
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {role.name}
          </p>
        )),
    },
    {
      title: (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Name
        </h2>
      ),
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {text}
        </p>
      ),
    },
    {
      title: (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Username
        </h2>
      ),
      key: "username",
      dataIndex: "username",
      render: (text) => (
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {text}
        </p>
      ),
    },
    // {
    //   title: (
    //     <h2
    //       style={{
    //         textAlign: "center",
    //       }}
    //     >
    //       Department
    //     </h2>
    //   ),
    //   key: "departmentId",
    //   dataIndex: "departmentId",
    //   filters: [
    //     { text: "BLEACHING", value: 1 },
    //     { text: "SPUNLACE", value: 2 },
    //     { text: "PAD_PUNCHING", value: 3 },
    //     { text: "DRY_GOODS", value: 4 },
    //     { text: "QUALITY_CONTROL", value: 5 },
    //     { text: "QUALITY_ASSURANCE", value: 6 },
    //     { text: "PPC", value: 7 },
    //     { text: "STORE", value: 8 },
    //     { text: "DISPATCH", value: 9 },
    //     { text: "PRODUCT_DEVELOPMENT", value: 10 },
    //     { text: "ENGINEERING", value: 11 },
    //     { text: "COTTON_BUDS", value: 12 },
    //     { text: "MARKETTING", value: 13 },
    //   ],
    //   onFilter: (value, record) => record.departmentId === value,
    //   render: (text) => (
    //     <p
    //       style={{
    //         fontSize: "16px",
    //         fontWeight: "bold",
    //         textAlign: "center",
    //       }}
    //     >
    //       {getDepartmentName(text)}
    //     </p>
    //   ),
    // },
    {
      title: <h2 style={{ textAlign: "center" }}>Department</h2>,
      key: "departments",
      dataIndex: "departments",
      filters: [
        { text: "BLEACHING", value: "BLEACHING" },
        { text: "SPUNLACE", value: "SPUNLACE" },
        { text: "PAD_PUNCHING", value: "PAD_PUNCHING" },
        { text: "DRY_GOODS", value: "DRY_GOODS" },
        { text: "QUALITY_CONTROL", value: "QUALITY_CONTROL" },
        { text: "QUALITY_ASSURANCE", value: "QUALITY_ASSURANCE" },
        { text: "PPC", value: "PPC" },
        { text: "STORE", value: "STORE" },
        { text: "DISPATCH", value: "DISPATCH" },
        { text: "PRODUCT_DEVELOPMENT", value: "PRODUCT_DEVELOPMENT" },
        { text: "ENGINEERING", value: "ENGINEERING" },
        { text: "COTTON_BUDS", value: "COTTON_BUDS" },
        { text: "MARKETING", value: "MARKETING" },
        { text: "HR", value: "HR" },
      ],
      onFilter: (value, record) => {
        // If departmentId exists, check if its mapped name matches the filter
        const departmentName = record.departmentId
          ? getDepartmentName(record.departmentId)
          : null;

        // Check if departmentId matches OR if departments array contains the value
        return (
          departmentName === value ||
          record.departments?.some((dept) => dept.department === value)
        );
      },
      render: (departments, record) => {
        // If departmentId is present, use getDepartmentName function
        if (record.departmentId) {
          return (
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {getDepartmentName(record.departmentId)}
            </p>
          );
        }

        // If departmentId is null, show all department names from the array
        return (
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {departments.map((dept) => dept.department).join(", ")}
          </p>
        );
      },
    },
    {
      title: (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Email
        </h2>
      ),
      dataIndex: "email",
      render: (text) => (
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {text}
        </p>
      ),
    },
    {
      title: (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Status
        </h2>
      ),
      dataIndex: "is_Active",
      render: (is_Active) => (
        <div
          style={{
            backgroundColor: "#fce410",
          }}
        >
          {is_Active === "Y" ? (
            <Tag
              style={{
                width: "100%",
                textAlign: "center",
              }}
              color="#87d068"
            >
              Active
            </Tag>
          ) : (
            <Tag
              style={{
                width: "100%",
                textAlign: "center",
              }}
              color="#f50"
            >
              Inactive
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Action
        </h2>
      ),
      dataIndex: "id",
      render: (id) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link to={`/Precot/userEdit/${id}`}>
            <FaEdit style={{ cursor: "pointer", color: "black" }} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="hell-2">
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
                margin: "10px",
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
                      Users List
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
      <center>
        <div
          style={{
            boxShadow: "10px",
            width: "30vh",
            border: "1px solid lightblue",
            height: "40px",
            alignItems: "center",
            borderRadius: "5px",
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <span>
            <img
              src={groupIcon}
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
              Users List
            </h3>
          </span>
        </div>
      </center>
      <Table
        columns={columns}
        dataSource={data}
        style={{
          marginTop: "0%",
          padding: "20px",
          backgroundColor: "#fff",
          height: "100%",
        }}
        pagination={paginationOptions}
        loading={loading}
        className="custom-table"
      />
    </div>
  );
};

export default UserList;
