/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Menu,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import { IoCreate } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { FiCopy } from "react-icons/fi";
import BleachingHeader from "../Components/BleachingHeader";
import { IoChevronBackSharp } from "react-icons/io5";
import { BiLock } from "react-icons/bi";
import { Tooltip } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import moment from "moment";

const CreateBMR = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [bmrtableData, setBmrTableData] = useState([]);
  const [laydowntableData, setLaydownTableData] = useState([]);
  const [bmrModal, setBmrModal] = useState(false);
  const [laydownModal, setLaydownModal] = useState(false);
  const [Copied, setCopied] = useState("");
  const [department, setDepartment] = useState("");
  const [bmr, setBmr] = useState("");
  const [laydown, setLaydown] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [departmentNew, setDepartmentNew] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  useEffect(() => {
    const x = localStorage.getItem("role");
    console.log("Department", localStorage.getItem("departmentId"));
    setDepartmentNew(localStorage.getItem("departmentId"));
    setRole(x);
  }, []);
  const navigate = useNavigate();
  const onChange = (value) => {
    setBtnDisable(false);
    setDepartment(value);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/getBMR?department_id=${value}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("bmr summary", res.data);
        // setLaydown(res.data.bleach_laydown_no);
        setBmrTableData(
          res.data.map((x, i) => {
            return {
              sNo: ++i,
              bmr: x.bleach_bmr_no,
              created_by: x.createdBy,
              // created_date: String(x.createdAt).slice(0,10),
              created_date: new Date(x.createdAt)
                .toISOString()
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("/"),

              status: x.status,
            };
          })
        );
        const newURL = value == "4" ?  `${ API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDepartment?department_id=${value}` : `${ API.prodUrl}/Precot/api/bleaching/generation/getLaydown?department_id=${value}`
        axios
          .get(
            newURL,
            {
              headers,
            }
          )
          
          .then((res) => {
            console.log("bmr summary", res.data);
            // setLaydown(res.data.bleach_laydown_no);
            setLaydownTableData(
              res.data.map((x, i) => {
                return {
                  sNo: ++i,
                  laydown: value == "4" ? x.drygoods_laydown_number : x.bleach_laydown_no,
                  created_by: x.createdBy,
                  // created_date: String(x.createdAt).slice(0,10),
                  created_date: moment(x.createdAt).format("DD/MM/YYYY - HH:mm"),

                  status: x.status,
                };
              })
            );
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const generateBmr = () => {
    setBmrModal(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/bmr?department_id=${department}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("BMR", res.data);
        setBmr(res.data.bleach_bmr_no);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const generateLaydown = () => {
    setLaydownModal(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    
    const newURL = department == "4" ? `${ API.prodUrl}/Precot/api/goodsLaydown/generation?department_id=${department}` : `${ API.prodUrl}/Precot/api/bleaching/generation/laydown?department_id=${department}`
    axios
      .get(
        newURL,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("Laydown", res.data);
        setLaydown(department == "4" ? res.data.drygoods_laydown_number : res.data.bleach_laydown_no);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const [departmentList, setdepartmentList] = useState();

  const token = localStorage.getItem("token");

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
        console.log("Shift Lov ", response.data);
        const a = response.data.map((x, i) => {
          return {
            value: x.id,
            label: x.department,
          };
        });
        setdepartmentList(a);

        console.log("Aaaa", a);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  const columns = [
    {
      title: "S.No",
      dataIndex: "sNo",
      key: "sno",
    },
    {
      title: "BMR",
      dataIndex: "bmr",
      key: "bmr",
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const columns2 = [
    {
      title: "S.No",
      dataIndex: "sNo",
      key: "sno",
    },
    {
      title: "Laydown",
      dataIndex: "laydown",
      key: "laydown",
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const items = [
    {
      key: "1",
      label: "BMR List",
      children: (
        <>
          <Table
            bordered
            style={{
              textAlign: "center",
            }}
            columns={columns}
            dataSource={bmrtableData}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Laydown List",
      children: (
        <>
          <Table
            bordered
            style={{
              textAlign: "center",
            }}
            columns={columns2}
            dataSource={laydowntableData}
          />
        </>
      ),
    },
  ];

  const onChangeTab = (key) => {
    console.log(key);
  };

  const handleOk = () => {
    setBmrModal(false);
    setCopied("");
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/getBMR?department_id=${department}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("bmr summary", res.data);
        // setLaydown(res.data.bleach_laydown_no);
        setBmrTableData(
          res.data.map((x, i) => {
            return {
              sNo: ++i,
              bmr: x.bleach_bmr_no,
              created_by: x.createdBy,
              created_date: String(x.createdAt).slice(0, 10),
              status: x.status,
            };
          })
        );
        const newURL = department == "4" ?  `${ API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDepartment?department_id=${department}` : `${ API.prodUrl}/Precot/api/bleaching/generation/getLaydown?department_id=${department}`
        axios
          .get(
            newURL,
            {
              headers,
            }
          )
          .then((res) => {
            console.log("bmr summary", res.data);
            // setLaydown(res.data.bleach_laydown_no);
            setLaydownTableData(
              res.data.map((x, i) => {
                return {
                  sNo: ++i,
                  laydown: department == "4" ? x.drygoods_laydown_number :  x.bleach_laydown_no,
                  created_by: x.createdBy,
                  created_date: moment(x.createdAt).format("DD/MM/YYYY - HH:mm"),
                  status: x.status,
                };
              })
            );
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const handleCancel = () => {
    setBmrModal(false);
    setCopied("");
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/getBMR?department_id=${department}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("bmr summary", res.data);
        // setLaydown(res.data.bleach_laydown_no);
        setBmrTableData(
          res.data.map((x, i) => {
            return {
              sNo: ++i,
              bmr: x.bleach_bmr_no,
              created_by: x.createdBy,
              created_date: String(x.createdAt).slice(0, 10),
              status: x.status,
            };
          })
        );
        //Precot/api/goodsLaydown/getLaydownByDepartment?department_id=4
        const newURL = department == "4" ?  `${ API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDepartment?department_id=${department}` : `${ API.prodUrl}/Precot/api/bleaching/generation/getLaydown?department_id=${department}`
        axios
          .get(
            newURL,
            {
              headers,
            }
          )
          .then((res) => {
            console.log("bmr summary", res.data);
            // setLaydown(res.data.bleach_laydown_no);
            setLaydownTableData(
              res.data.map((x, i) => {
                return {
                  sNo: ++i,
                  laydown: department == "4" ? x.drygoods_laydown_number :  x.bleach_laydown_no,
                  created_by: x.createdBy,
                  created_date: moment(x.createdAt).format("DD/MM/YYYY - HH:mm"),
                  status: x.status,
                };
              })
            );
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleOk2 = () => {
    setLaydownModal(false);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/getBMR?department_id=${department}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("bmr summary", res.data);
        // setLaydown(res.data.bleach_laydown_no);
        setBmrTableData(
          res.data.map((x, i) => {
            return {
              sNo: ++i,
              bmr: x.bleach_bmr_no,
              created_by: x.createdBy,
              created_date: String(x.createdAt).slice(0, 10),
              status: x.status,
            };
          })
        );
        const newURL = department == "4" ?  `${ API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDepartment?department_id=${department}` : `${ API.prodUrl}/Precot/api/bleaching/generation/getLaydown?department_id=${department}`

        axios
          .get(
             newURL,
            {
              headers,
            }
          )
          .then((res) => {
            console.log("bmr summary", res.data);
            // setLaydown(res.data.bleach_laydown_no);
            setLaydownTableData(
              res.data.map((x, i) => {
                return {
                  sNo: ++i,
                  laydown:  department == "4" ? x.drygoods_laydown_number :  x.bleach_laydown_no,
                  created_by: x.createdBy,
                  created_date: moment(x.createdAt).format("DD/MM/YYYY - HH:mm"),
                  status: x.status,
                };
              })
            );
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const handleCancel2 = () => {
    setLaydownModal(false);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    axios
      .get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/getBMR?department_id=${department}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log("bmr summary", res.data);
        // setLaydown(res.data.bleach_laydown_no);
        setBmrTableData(
          res.data.map((x, i) => {
            return {
              sNo: ++i,
              bmr: x.bleach_bmr_no,
              created_by: x.createdBy,
              created_date: String(x.createdAt).slice(0, 10),
              status: x.status,
            };
          })
        );
       const newURL = department == "4" ?  `${ API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDepartment?department_id=${department}` : `${ API.prodUrl}/Precot/api/bleaching/generation/getLaydown?department_id=${department}`

        axios
          .get(
            newURL,
            {
              headers,
            }
          )
          .then((res) => {
            console.log("bmr summary", res.data);
            // setLaydown(res.data.bleach_laydown_no);
            setLaydownTableData(
              res.data.map((x, i) => {
                return {
                  sNo: ++i,
                  laydown:  department == "4" ? x.drygoods_laydown_number :  x.bleach_laydown_no,
                  created_by: x.createdBy,
                  created_date: moment(x.createdAt).format("DD/MM/YYYY - HH:mm"),
                  status: x.status,
                };
              })
            );
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    setCopied("");
  }, []);
  return (
    <div>
      <BleachingHeader
        formName={
          department == "4"
            ? "LAYDOWN GENERATION"
            : department == "1"
            ? "BMR GENERATION"
            : "BMR GENERATION"
        }
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: saveBtnStatus ? "block" : "none",
            }}
            onClick={handleBack}
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
            // onClick={handleLogout}
            onClick={() => {
              if (confirm("Are you sure want to logout")) {
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
                  },
                  {
                    key: "5",
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
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
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
                    key: "5",
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
                          if (confirm("Are you sure want to logout")) {
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

      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      ></Space>
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "1em",
        }}
      >
        <Select
          showSearch
          placeholder="Select a Department"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={departmentList}
        />
        <Button.Group>
          {department != "1" ? null : (
            <Button type="primary" onClick={generateBmr} disabled={btnDisable}>
              Generate BMR
            </Button>
          )}
          <Button
            type="primary"
            onClick={generateLaydown}
            disabled={btnDisable}
            style={{
              display: department == "4" || department == "1" ? "block" : 'none'
            }}
          >
            Generate Laydown
          </Button>
          {/* <Button type="primary">Generate Batch</Button> */}
        </Button.Group>
      </Row>
      <Row>
        <Tabs
          defaultActiveKey="1"
          items={department == "1" ? items : items.splice(1)}
          onChange={onChangeTab}
          style={{
            width: "90%",
            position: "relative",
            left: "2.5%",
          }}
        />
      </Row>
      {/* bmr generation */}
      {/* navigator.clipboard.writeText */}
      <Modal
        title="Generated BMR"
        open={bmrModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>{bmr}</h1>
            <FiCopy
              size={36}
              style={{
                marginLeft: "1em",
                cursor: "pointer",
              }}
              onClick={() =>
                navigator.clipboard
                  .writeText(bmr)
                  .then((c) => setCopied("Copied Sucessfully"))
              }
            />
            <b
              style={{
                color: "green",
                marginLeft: "1em",
              }}
            >
              {Copied}
            </b>
          </Col>
        </Row>
      </Modal>
      {/* laydown generation */}
      <Modal
        title="Generated Laydown"
        open={laydownModal}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={false}
      >
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>{laydown}</h1>
            <FiCopy
              size={36}
              style={{
                marginLeft: "1em",
                cursor: "pointer",
              }}
              onClick={() =>
                navigator.clipboard
                  .writeText(laydown)
                  .then((c) => setCopied("Copied Sucessfully"))
              }
            />
            <b
              style={{
                color: "green",
                marginLeft: "1em",
              }}
            >
              {Copied}
            </b>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CreateBMR;
