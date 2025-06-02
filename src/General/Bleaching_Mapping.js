/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Menu,
  message,
  Row,
  Select,
  Space,
  Modal,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";
const Bleaching_Mapping = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [selectedLength, setSelectedLength] = useState(0);
  const [departmentList, setdepartmentList] = useState();
  const [BmrData, setBmrData] = useState();
  const [laydownData, setLaydownData] = useState();
  const [jobcard, setJobcard] = useState();
  const [bmr, setbmr] = useState("");
  const [laydown, setlaydown] = useState("");
  const [joborder, setjoborder] = useState("");
  const [department, setdepartment] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const x = localStorage.getItem("role");
    setRole(x);
  }, []);

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    // Fetch shift options from the API

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );
        // setdepartmentList(response.data);
        const a = response.data.map((x, i) => {
          return {
            value: x.id,
            label: x.department,
          };
        });
        setdepartmentList(a);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);
  const navigate = useNavigate();

  const onChange = (values) => {
    console.log("Values", values);
    setbmr(values);
  };

  const onChange1 = (values) => {
    console.log("Valueskljo", values);
    setlaydown(values);
  };

  const onChange2 = (values) => {
    console.log("Values", values);
    setjoborder(values);
    setSelectedLength(Array.isArray(values) ? values.length : 0);
  };
  const onChange3 = (values) => {
    console.log("Select", values);
    setdepartment(values);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // Precot/api/goodsLaydown/getLaydownByDepartment?department_id=4
    const newURL =
      values == "4"
        ? `${ API.prodUrl}/Precot/api/goodsLaydown/getLaydownByDepartment?department_id=${values}`
        : `${ API.prodUrl}/Precot/api/bleaching/generation/getLaydown?department_id=${values}`;
    axios
      .get(newURL, {
        headers,
      })
      .then((res) => {
        console.log("ddd", department);
        console.log("Laydown", res.data);
        const a = res.data.map((x, i) => {
          return {
            value:
              values == "4" ? x.drygoods_laydown_number : x.bleach_laydown_no,
            label:
              values == "4" ? x.drygoods_laydown_number : x.bleach_laydown_no,
          };
        });
        console.log("fff", a);
        setLaydownData(a);
        axios
          .get(
            `${ API.prodUrl}/Precot/api/bleaching/generation/getBMR?department_id=${values}`,
            {
              headers,
            }
          )
          .then((res) => {
            console.log("bmr", res.data);
            const a = res.data.map((x, i) => {
              return {
                value: x.bleach_bmr_no,
                label: x.bleach_bmr_no,
              };
            });
            setBmrData(a);
            const urlNEW =
              values == "4"
                ? `${ API.prodUrl}/Precot/api/goodsLaydown/BaleNoLov`
                : `${ API.prodUrl}/Precot/api/bleaching/generation/getJobCard`;
            axios
              .get(urlNEW, {
                headers,
              })
              .then((res) => {
                const a = res.data.map((x, i) => {
                  return {
                    value: values == "4" ? x : x.POrder,
                    label: values == "4" ? x : x.POrder,
                  };
                });
                setJobcard(a);
              })
              .catch((err) => {
                console.log("Error", err);
              });
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onFinish = (values) => {
    console.log("Values", values);
  };

  const createMapping = () => {
    if (laydown === "" || department === "" || joborder === "") {
      message.error("Please Select All Values");
    } else {
      Modal.confirm({
        title:
          department == "4"
            ? "Are you sure you want to map specific Bale No and Laydown number?"
            : "Are you sure you want to map specific BMR and Laydown number?",
        onOk() {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          };
          const URL =
            department == "4"
              ? `${ API.prodUrl}/Precot/api/goodsLaydown/LaydownBaleNoMapping`
              : `${ API.prodUrl}/Precot/api/bleaching/generation/BmrLaydownMapping`;
          const payload_2 =
            department == "4"
              ? {
                  laydownNo: laydown,
                  baleNumbers: joborder,
                  department_id: department,
                }
              : {
                  bmrNo: bmr,
                  laydownNo: laydown,
                  joborderNo: joborder,
                  departmentId: department,
                };

          axios
            .post(URL, payload_2, { headers })
            .then((res) => {
              console.log("post", res.data);
              message.success("Mapping Created Successfully");
              setbmr("");
              setlaydown("");
              setjoborder("");
              setdepartment("");
              setDate("");
              navigate("/Precot/choosenScreen"); // Navigate to chosen screen
            })
            .catch((err) => {
              console.log("Error", err);
              message.error("Failed to Create Mapping");
            });
        },
      });
    }
  };

  return (
    <div>
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
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
      <div
        style={{
          display: "flex",
          margin: "1em",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          icon={<TbMenuDeep />}
          onClick={showDrawer}
        ></Button>

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
            if (confirm("Are you sure want to logout")) {
              localStorage.removeItem("token");
              navigate("/Precot");
            }
          }}
        >
          Logout
        </Button>
      </div>
      <Row
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Form onFinish={onFinish} name="mappingForm">
          <Form.Item>
            <h1>Create Mapping</h1>
          </Form.Item>
          <Form.Item>
            Select Department
            <Select
              placeholder="Select a Department"
              optionFilterProp="label"
              onChange={onChange3}
              name="bmr"
              options={departmentList}
            />
          </Form.Item>
          {department == "4" ? null : (
            <Form.Item>
              Select BMR
              <Select
                placeholder="Select a BMR"
                optionFilterProp="label"
                onChange={onChange}
                name="bmr"
                options={BmrData}
              />
            </Form.Item>
          )}
          <Form.Item>
            Select Laydown No
            <Select
              placeholder="Select a Laydown No"
              optionFilterProp="label"
              onChange={onChange1}
              options={laydownData}
              name="laydown"
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              maxHeight: "200px",
            }}
          >
            <Form.Item>
              <div>{"Select Job Card"}</div>
              <div></div>
              <Select
                placeholder={"Select Job Card"}
                optionFilterProp="label"
                onChange={onChange2}
                options={jobcard}
                name="batch"
                style={{ width: 350 }}
                mode={department == "4" ? "multiple" : undefined}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              onClick={createMapping}
            >
              Create Mapping
            </Button>
          </Form.Item>
        </Form>
      </Row>
      {contextHolder}
    </div>
  );
};

export default Bleaching_Mapping;
