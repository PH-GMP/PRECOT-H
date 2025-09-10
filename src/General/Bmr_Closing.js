/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Table,
  Input,
  Checkbox,
  Modal,
  Tooltip,
  message,
  Form,
  Drawer,
  Menu,
  Col,
  Avatar,
  Row,
  Card,
} from "antd";
import axios from "axios";

import BleachingHeader from "../Components/BleachingHeader";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import API from "../baseUrl.json";
import { BiBorderAll, BiBorderRadius } from "react-icons/bi";
function Bmr_Closing() {
  const [bmrOptions, setBmrOptions] = useState([]);
  const [bmr, setBmr] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [batchData, setBatchData] = useState([]);
  const [bmrData, setBmrData] = useState(null); // Initialize bmrData as null
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [countOfSelectedBatches, setCountOFSelectedBatches] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [apiBatch, setApiBatch] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const departmentId = localStorage.getItem("departmentId");
  const [dryGoodsLaydown, setDryGoodsLaydown] = useState({
    drygoods_laydown_number: "",
    bale_no: "",
    department_id: 4,
    start_date: "",
    createdAt: "",
    createdBy: "",
  });
  const [laydownDetails, setLaydownDetails] = useState([]);
  const [laydownLov, setLaydownLov] = useState([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  console.log("Department Id", departmentId);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Format date
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Format time
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    const fetchBmrOptions = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((option) => ({
          value: option.BMR_NO,
          label: option.BMR_NO,
        }));
        setBmrOptions(options);
      } catch (error) {
        console.error("Error fetching BMR options:", error);
      }
    };

    fetchBmrOptions();
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/goodsLaydown/LaydownLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          setLaydownDetails(response.data);
          const a = response.data.map((option) => ({
            value: option.drygoods_laydown_number,
            label: option.drygoods_laydown_number,
          }));
          setLaydownLov(a);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const laydownChange = (e) => {
    setDryGoodsLaydown((prevState) => ({
      ...prevState,
      drygoods_laydown_number: e,
    }));
    const selectedLaydown = laydownDetails.find(
      (item) => item.drygoods_laydown_number === e
    );
    if (selectedLaydown) {
      setDryGoodsLaydown((prevState) => ({
        ...prevState,
        createdAt: selectedLaydown.createdAt,
        createdBy: selectedLaydown.createdBy,
      }));
    }
  };

  const bmrHandleChange = async (value) => {
    setBmr(value);
    setShowButton(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/fetchBatch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res", response.data);
      const batchData = response.data.map((batch) => ({
        sno: batch.id,
        batch: batch.value,
        key: batch.id,
        select: batch.description,
      }));
      setBatchData(batchData);
    } catch (error) {
      console.error("Error fetching batch data:", error);
    }
  };

  const handleGo = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/getStartDate?MappingBmr_No=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // let formattedStartDate = batchData.startDate
      //   ? new Date(batchData.startDate)
      //   : null;
      // // console.log(formattedStartDate);
      // setStartDateTime(formattedStartDate);
      // console.log("console", formatDateTime(response.data.start_date));
      setStartDateTime(formatDateTime(response.data.start_date));
      setShowTable(true);
    } catch (error) {
      if (error.response) {
        const errorMessage = String(error.response.data);
        message.error(errorMessage);
      }
      console.error("Error fetching batch data:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (departmentId == 4) {
      try {
        if (dryGoodsLaydown.drygoods_laydown_number == "") {
          message.warning("Please Select Laydown Number");
          return;
        }
        const payload = {
          drygoods_laydown_number: dryGoodsLaydown.drygoods_laydown_number,
          department_id: 4,
        };
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/goodsLaydown/closingLaydown`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 200 || response.status == 201) {
          messageApi.open({
            type: "success",
            content: "Laydown Closed Successfully",
          });
          const fetchData = async () => {
            try {
              const response = await axios.get(
                `${API.prodUrl}/Precot/api/goodsLaydown/LaydownLov`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (response.data.length > 0) {
                setLaydownDetails(response.data);
                const a = response.data.map((option) => ({
                  value: option.drygoods_laydown_number,
                  label: option.drygoods_laydown_number,
                }));
                setLaydownLov(a);
              }
            } catch (error) {}
          };
          fetchData();
        }
      } catch (error) {
        message.error(error.response.data.message);
      }
    } else {
      if (bmr === "") {
        message.warning("Please Select the BMR");
        return;
      }
      if (endDateTime === "") {
        message.warning("Please Select End Date");
        return;
      }

      const batchNo = selectedBatches.map((batchNo) => Number(batchNo));
      let response;
      console.log("apiBatch", apiBatch);
      try {
        response = await axios.post(
          `${API.prodUrl}/Precot/api/bleaching/generation/closingBMR`,
          {
            bmrNo: bmr,
            endDate: endDateTime,
            batchNos: apiBatch,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Post response:", response.data);

        if (response.status == 200) {
          messageApi.open({
            type: "success",
            content: "BMR Closed Successfully",
          });

          setTimeout(() => {
            navigate("/Precot/choosenScreen");
          }, 3000);
        } else {
          messageApi.open({
            type: "error",
            content: "Error Occurred" + " " + response.statusText,
          });
        }
      } catch (error) {
        if (error.response) {
          message.error(error.response?.data?.message);
        }
      } finally {
        setIsModalVisible(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const handleCheckboxChange = (batchNo) => {
    setSelectedBatches((prev) => {
      if (prev.includes(batchNo)) {
        return prev.filter((no) => no !== batchNo);
      } else {
        return [...prev, batchNo];
      }
    });
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      align: "center",
    },
    {
      title: "Batch No",
      dataIndex: "batch",
      key: "batch",
      align: "center",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCountOFSelectedBatches(selectedRows.length);
      console.log(countOfSelectedBatches, "is Counted");
      console.log("Selected ROws", selectedRows);
      // // console.log(
      //   "selectedRows: ",
      //   selectedRows.map((x, i) => {
      //     return Number(x.batch);
      //   })
      // );
      const validBatches = selectedRows
        .filter((x) => x.batch !== null && x.batch !== undefined && x.batch !== NaN) // Filter out null/undefined
        .map((x) => x.batch);  

      setApiBatch(validBatches);
      console.log("Valid Batches:", validBatches);
    },
  };

  return (
    <>
      {contextHolder}
      <BleachingHeader
        formName={
          departmentId == 4
            ? "Laydown Closing"
            : "Batch Manufacturing Record Closing Screen"
        }
        formatNo={departmentId == 4 ? "(Laydown)" : "(BMR)"}
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
            }}
            shape="round"
            onClick={showModal}
          >
            {departmentId == 4 ? "Close Laydown" : "Close BMR"}
          </Button>,
          <Button
            onClick={handleBack}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            Back
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Form
            style={{
              display: "flex",
            }}
          >
            {departmentId == 4 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "15px",
                  }}
                >
                  <Form.Item
                    label="Select Laydown"
                    style={{
                      marginRight: "1em",
                    }}
                  >
                    <Select
                      className="select-create"
                      options={laydownLov}
                      style={{ textAlign: "center" }}
                      onChange={(e) => {
                        laydownChange(e);
                      }}
                      placeholder="Select Laydown"
                      dropdownStyle={{ textAlign: "center" }}
                    />
                  </Form.Item>
                </div>
              </>
            ) : (
              <>
                <Form.Item
                  label="Select BMR"
                  style={{
                    marginRight: "1em",
                  }}
                >
                  <Select
                    className="select-create"
                    options={bmrOptions}
                    onChange={bmrHandleChange}
                    placeholder="Select BMR"
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    marginRight: "1em",
                  }}
                >
                  <Button
                    onClick={handleGo}
                    type="primary"
                    style={{
                      backgroundColor: "#E5EEF9",
                      color: "#00308F",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                    shape="round"
                  >
                    Go
                  </Button>
                </Form.Item>
                <Form.Item
                  label="Start Date & Time"
                  style={{
                    marginRight: "1em",
                  }}
                >
                  <Input type="text" value={startDateTime} readOnly />
                </Form.Item>

                <Form.Item
                  label="End Date & Time"
                  style={{
                    marginRight: "1em",
                  }}
                >
                  {/* <Input
                type="datetime-local"
                value={
                  endDateTime ? endDateTime.toISOString().slice(0, -8) : ""
                }
                onChange={(e) => setEndDateTime(new Date(e.target.value))}
              /> */}
                  <Input
                    type="datetime-local"
                    value={
                      endDateTime
                        ? new Date(endDateTime).toISOString().slice(0, -8)
                        : ""
                    }
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      // Adjust for timezone offset
                      const adjustedDate = new Date(
                        selectedDate.getTime() -
                          selectedDate.getTimezoneOffset() * 60000
                      );
                      setEndDateTime(adjustedDate);
                    }}
                  />
                </Form.Item>
              </>
            )}
          </Form>
          {departmentId == 4 ? (
            <>
              <Card
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <label>
                  <b>Selected Laydown : </b>{" "}
                </label>
                {dryGoodsLaydown.drygoods_laydown_number
                  ? dryGoodsLaydown.drygoods_laydown_number
                  : "NA"}
                <br />
                <label>
                  <b>Created By : </b>{" "}
                </label>
                {dryGoodsLaydown.createdBy ? dryGoodsLaydown.createdBy : "NA"}
                <br />
                <label>
                  <b>Created At :</b>{" "}
                </label>
                {dryGoodsLaydown.createdAt ? dryGoodsLaydown.createdAt : "NA"}
                <br />
              </Card>
            </>
          ) : (
            <>
              <div
                style={{
                  float: "Right",
                  border: "1px solid grey",
                  padding: "3px",
                  borderRadius: "5px",
                  margin: "8px",
                  boxShadow: "5px 5px #888888",
                }}
              >
                <span style={{ color: "red" }}>
                  <b>{countOfSelectedBatches}</b>
                </span>{" "}
                <b>Batches Selected </b>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  margin: "auto",
                  marginTop: "20px",
                }}
              >
                {/* <Table
                  dataSource={batchData}
                  columns={columns}
                  pagination={false}
                  style={{ width: "100%" }}
                /> */}
                <Table
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={batchData}
                />
              </div>
            </>
          )}
          <Modal
            title="Confirm Post"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Confirm"
            cancelText="Cancel"
          >
            {departmentId == 4 ? (
              <p>Are you sure to close Laydown?</p>
            ) : (
              <p>Are you sure to close BMR?</p>
            )}
          </Modal>
        </div>

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
              localStorage.getItem("role") == "ROLE_QA"
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
                      icon: <IoCreate color="#151718" />,
                      label: (
                        <b
                          style={{
                            color: "#151718",
                          }}
                        >
                          Raw Material Isuue
                        </b>
                      ),
                      onClick: () => navigate("/Precot/RawMaterialIssue"),
                    },
                    {
                      key: "6",
                      icon: (
                        <FaLock
                          color="#151718"
                          onClick={() => navigate("/Precot")}
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
                          onClick={() => navigate("/Precot")}
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
      </div>
    </>
  );
}

export default Bmr_Closing;