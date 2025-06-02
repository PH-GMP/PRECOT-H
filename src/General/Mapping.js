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
  Input,
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
const Mapping = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [selectedLength, setSelectedLength] = useState(0);
  const [departmentList, setdepartmentList] = useState();
  const [BmrData, setBmrData] = useState();
  const [laydownData, setLaydownData] = useState();
  const [jobcard, setJobcard] = useState([]);
  const [bmr, setbmr] = useState("");
  const [laydown, setlaydown] = useState("");
  const [joborder, setjoborder] = useState([]);

  const [department, setdepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [baleConatinerShow, setBaleContainerShow] = useState(false);
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
    console.log("department", department);
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
  // const onChange2 = (values) => {
  //   setBaleContainerShow(true);
  //   console.log("Values", values);
  //   setjoborder(values);
  //   setSelectedLength(Array.isArray(values) ? values.length : 0);
  //   if (values.length == 0) {
  //     setBaleContainerShow(false);
  //   }
  // };

  const onChange2 = (values) => {
    console.log("Values", values);
    setBaleContainerShow(true);
    // Add the selected items to the `joborder` state
    setjoborder((prev) => [...prev, ...values]);

    // Update the selected items count
    setSelectedLength((prev) => prev + values.length);

    // Disable the selected items in the dropdown
    setJobcard((prev) =>
      prev.map((item) => ({
        ...item,
        disabled: joborder.includes(item.value) || values.includes(item.value),
      }))
    );
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
        ? `${ API.prodUrl}/Precot/api/goodsLaydown/getLaydownForMappingByDepartment?department_id=${values}`
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
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [token]);

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
                  startDate: selectedDate,
                  shift: selectedShift,
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
          gap: "150px",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px",
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
          <Form.Item>
            Select Date
            <Input
              type="date"
              placeholder="Select a Laydown No"
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              value={selectedDate}
            />
          </Form.Item>
          <Form.Item>
            Select Shift
            <Select
              placeholder="Select a Shift"
              onChange={(value) => {
                setSelectedShift(value);
              }}
              value={selectedShift}
            >
              {shiftLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
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
              <div>
                {" "}
                {department == "4" ? "Select Bale" : "Select Job Card"}{" "}
                {/* Selected: {selectedLength} item{selectedLength > 1 ? "s" : ""} */}
              </div>
              <div></div>
              {/* <Select
                placeholder={
                  department == "4" ? "Select Bale" : "Select Job Card"
                }
                optionFilterProp="label"
                onChange={onChange2}
                options={jobcard}
                name="batch"
                style={{ width: 350 }}
                mode={department == "4" ? "multiple" : undefined}
              /> */}
              <Select
                placeholder={
                  department == "4" ? "Select Bale" : "Select Job Card"
                }
                optionFilterProp="label"
                onChange={onChange2}
                options={jobcard.map((item) => ({
                  ...item,
                  disabled: joborder.includes(item.value), // Disable selected items
                }))}
                name="batch"
                style={{ width: 350 }}
                mode={department == "4" ? "multiple" : undefined}
                value={[]} // Clear the dropdown value after selection
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

        <div
          style={{
            flex: 1,
            padding: "16px",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            display: baleConatinerShow ? "block" : "none",
            maxHeight: "400px",
            maxWidth: "300px",
            overflowY: "auto",
          }}
        >
          {/* <h3>Selected {department == "4" ? "Bales" : "Job Cards"}</h3>
          <h4>
            Total Selected: {selectedLength} item{selectedLength > 1 ? "s" : ""}
          </h4>
          <div>
            {Array.isArray(joborder) &&
              joborder.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px",
                    margin: "4px 0",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                  }}
                >
                  {item}
                </div>
              ))}
          </div> */}

          <h3 style={{ marginBottom: "16px", fontSize: "18px", color: "#333" }}>
            Selected {department == "4" ? "Bales" : "Job Cards"}
          </h3>
          <p style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
            Total Selected: {selectedLength} item{selectedLength > 1 ? "s" : ""}
          </p>
          <div>
            {joborder.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  margin: "8px 0",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f8f8";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "14px", color: "#444" }}>{item}</span>
                <button
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => {
                    // Remove the item from the `joborder` state
                    const updatedItems = joborder.filter((_, i) => i !== index);
                    setjoborder(updatedItems);
                    setSelectedLength(updatedItems.length);
                    if (updatedItems.length == 0) {
                      setBaleContainerShow(false);
                    }

                    // Re-enable the item in the dropdown
                    setJobcard((prev) =>
                      prev.map((option) =>
                        option.value === item
                          ? { ...option, disabled: false }
                          : option
                      )
                    );
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff7875";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff4d4f";
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </Row>
      {contextHolder}
    </div>
  );
};

export default Mapping;
