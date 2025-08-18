/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-pascal-case */
import {
  Button,
  Tabs,
  Tooltip,
  Row,
  Select,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import React, { useEffect, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import API from "../baseUrl.json";
import axios from "axios";
import useMessage from "antd/es/message/useMessage";
import moment from "moment";
import Production_Details from "./PadPunching_BMR_Components/Production_Details";
import Packing_Material_Issue from "./PadPunching_BMR_Components/Packing_Material_Issue";
import Reference_Documents from "./PadPunching_BMR_Components/Reference_Documents";
import Verification_Records from "./PadPunching_BMR_Components/Verification_Records";
import Manufacturing_Steps from "./PadPunching_BMR_Components/Manufacturing_Steps";
import Product_Reconciliation from "./PadPunching_BMR_Components/Product_Reconciliation";
import Process_Delay from "./PadPunching_BMR_Components/Process_Delay";
import Process_Deviation from "./PadPunching_BMR_Components/Process_Deviation";
import List_Of_Enclosures from "./PadPunching_BMR_Components/List_Of_Enclosures";
import Post_Production from "./PadPunching_BMR_Components/Post_Production";
import Qa_release from "./PadPunching_BMR_Components/Qa_release";
import Product_Release from "./PadPunching_BMR_Components/Product_Release";
import Equipment_Used_Process from "./PadPunching_BMR_Components/Equipment_Used_Process";
import Rework from "./PadPunching_BMR_Components/Rework";

const Pad_Punching_BMR = () => {
  const [open, setOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [messageApi, contextHolder] = useMessage();
  const [selectedOrderNo, setSelectedOrderNo] = useState("");

  const [New, setNew] = useState("");
  const [order, setOrder] = useState("");
  const [printData, setPrintData] = useState({
    productionDetails: [],
    productRelease: [],
    verificationOfRecords: [],
    postProductionReview: [],
    equipmentDetails: [],
    enclosureList: [],
    deviationRecord: [],
    stoppage: [],
    manufactureSteps: [],
    qualityRelease: [],
    dailyProductionDetailsBmrResponses: [],
    reconillation: [],
    packingMaterial: [],
    rework: [],
  });
  //All states for API here
  const [apiData, setApiData] = useState({
    baleConsumption: [],
    equipmentUsedProcess: [],
    listOfEnclosures: [],
    manufactureSteps: [],
    PackingMaterialIssue: [],
    PostProduction: [],
    ProcessDelay: [],
    ProcessDeviation: [],
    ProductReconciliation: [],
    ProductRelease: [],
    ProductionDetails: [],
    QaRelease: [],
    VerificationOfRecords: [],
    rework: [],
  });
  const [baleData, setBaleData] = useState([]);
  //All States for LOV Here
  const [Lov, setLov] = useState({
    qaLov: [],
    supLov: [],
    HodLov: [],
    machineLov: [],
    orderNoLov: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [baleDate, setBaleDate] = useState("");
  const [baleMachine, setBaleMachine] = useState("");
  const [baleShift, setBaleShift] = useState("");
  const [oderNoLovs, setOrderNoLov] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
    baleConsumptionReport();
    // onPrint()
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const formatDate1 = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //States of API update here in standard approach
  const updateAPIData = (updates) => {
    setApiData((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  //States of LOV update here in standard approach
  const updateLovData = (updates) => {
    setLov((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const onOrderChange = (selectedOrder) => {
    setNew(selectedOrder);
    setOrder("");
    const batchNo = selectedOrder.includes("-")
      ? selectedOrder.split("-")[0]
      : selectedOrder;

    axios
      .get(
        `${API.prodUrl}/Precot/api/punching/bmr/getOrderByBatchNo?batchNo=${batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        const options = res.data.map((x, i) => {
          return {
            value: x.value, // Ensure these keys exist in the API response
            label: x.value,
          };
        });
        updateLovData({ orderNoLov: options });
        setOrderNoLov(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
        updateLovData([]);
      });
  };

  useEffect(() => {
    axios
      .get(`${API.prodUrl}/Precot/api/punching/bmr/fetchProductionDetails`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("batchNo", res.data);
        // setBmrStore(res.data);
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        setOrderList(a);
        // setFindLaydown(res.data);
        // message.success("Closed BMR Values Fetched Successfully");
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch BMR Caused Network Error",
        });
      });

    axios
      .get(`${API.prodUrl}/Precot/api/Users/Service/getQA`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("QA", res.data);

        const a = res.data.map((option) => ({
          value: option.username,
          label: option.username,
        }));
        updateLovData({ qaLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch QA Caused Network Error",
        });
      });

    //prodLov
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getRoleDetails?departmentId=3`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.username,
          label: option.username,
        }));
        updateLovData({ supLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch Production Department Caused Network Error",
        });
      });
    //hodLov
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=PAD_PUNCHING`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        // const a = res.data.map((option) => ({
        //   value: option.username,
        //   label: option.username,
        // }));
        const b = res.data.filter(
          (x) => x.role == "ROLE_DESIGNEE" || x.role == "ROLE_HOD"
        );
        console.log("b", b);
        const a = b.map((x) => ({
          value: x.name,
          label: x.name,
        }));
        updateLovData({ HodLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch Production Department Caused Network Error",
        });
      });

    //Machine LOV
    axios
      .get(`${API.prodUrl}/Precot/api/padpunching/MachineLov`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.MCN,
          label: option.MCN,
        }));
        console.log("User Lov", a);
        updateLovData({ machineLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
      });

    //Print Prevent
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault();
        message.error("Print function is disabled on this screen.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendOrderNo = () => {
    setSelectedOrderNo(New);
  };
  //    setSelectedOrderNo(selectedOrder);

  const [reworkList, setreworkList] = useState([]);

  const onPrint = () => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/punching/bmr/punchingprint?batchNo=${selectedOrderNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        setPrintData(res.data[0]);
        setreworkList(res.data.reworkList);
        console.log("resposne", res.data[0].enclosureList);
        if (res.data[0].enclosureList[0].remarks1 == "ATTACHED") {
          setIsModalOpen(true);
        } else {
          setTimeout(() => {
            window.print();
          }, 1500);
        }
      })
      .catch((err) => {
        message.error("No Data Found");
      });
  };

  const baleConsumptionReport = () => {
    axios
      .get(
        `${API.prodUrl
        }/Precot/api/PadPunching/Service/RollConsumptionReport/getByDateShiftMachinePrint?date=${moment(
          baleDate
        ).format("YYYY-MM-DD")}&shift=${baleShift}&machineName=${baleMachine}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("REsposne data", res.data);
        if (res.data && res.data.length > 0) {
          //setPrintResponseData(res.data);
          setBaleData(res.data);
          axios
            .get(
              `${API.prodUrl}/Precot/api/punching/bmr/punchingprint?batchNo=${selectedOrderNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              console.log("Response", res.data);
              setPrintData(res.data[0]);
              setTimeout(() => {
                window.print();
              }, 1500);
            })
            .catch((err) => {
              message.error("No Data Found");
            });
        } else {
          message.error("No Data");
          //  handleModalClose();
        }
      })

      .catch((err) => {
        console.log("Error", err);
      });
  };
  const items = [
    {
      key: "1",
      label: "Production Details",
      children: (
        <Production_Details
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "2",
      label: "Packing Material Issue",
      children: (
        <Packing_Material_Issue
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "3",
      label: "Reference Documents",
      children: (
        <Reference_Documents
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo=""
          qaLov={[]}
          supLov={[]}
          hodLov={[]}
        />
      ),
    },
    {
      key: "4",
      label: "Equipment Used For The Process",
      children: (
        <Equipment_Used_Process
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          machineLov={Lov.machineLov}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "5",
      label: "Verification of Record",
      children: (
        <Verification_Records
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "6",
      label: "Manufacturing Steps",
      children: (
        <Manufacturing_Steps
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          machineLov={Lov.machineLov}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "7",
      label: "Product Reconciliation",
      children: (
        <Product_Reconciliation
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "8",
      label: "Process delay Equipment breakdown record",
      children: (
        <Process_Delay
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          machineLov={Lov.machineLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "9",
      label: "Process Deviation Record",
      children: (
        <Process_Deviation
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "10",
      label: "List of Enclosures",
      children: (
        <List_Of_Enclosures
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "11",
      label: "Post Production Review",
      children: (
        <Post_Production
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQaManQADes={
            localStorage.getItem("role") == "QA_MANAGER" ||
              localStorage.getItem("role") == "QA_DESIGNEE"
              ? true
              : false
          }
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "12",
      label: "QA Release",
      children: (
        <Qa_release
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQaManQADes={
            localStorage.getItem("role") == "QA_MANAGER" ||
              localStorage.getItem("role") == "QA_DESIGNEE"
              ? true
              : false
          }
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "13",
      label: "Product Release",
      children: (
        <Product_Release
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "14",
      label: "Rework",
      children: (
        <Rework
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
              localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
  ];
  return (
    <div>
      <Modal
        title="Pad Punching BMR - Bale Consumption"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={baleConsumptionReport}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Date:">
            <Input
              value={baleDate}
              onChange={(e) => setBaleDate(e.target.value)}
              type="date"
            />
          </Form.Item>
          <Form.Item label="Shift:">
            <Select
              value={baleShift}
              onChange={(e) => setBaleShift(e)}
              options={[
                { value: "I", label: "I" },
                { value: "II", label: "II" },
                { value: "III", label: "III" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Machine:">
            <Select
              value={baleMachine}
              onChange={(e) => setBaleMachine(e)}
              options={Lov.machineLov}
            />
          </Form.Item>
        </Form>
      </Modal>
      <BleachingHeader
        formName={"Batch Manufacturing Record"}
        formatNo={"(BMR)"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            onClick={onPrint}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              //   display: printBtnEnable ? "block" : "none",
            }}
            shape="round"
          >
            Print
          </Button>,
          // <Button onClick={a}>a</Button>,
          <Button
            // onClick={handleBack}
            onClick={() => window.history.back()}
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
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: saveBtnStatus ? "block" : "none",
            }}
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              confirm("You Want to logged out") == true
                ? navigate("/Precot")
                : null;
            }}
            shape="round"
            icon={<FaLock color="#00308F" />}
          >
            &nbsp;Logout
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
      <Row
        style={{
          display: "flex",
          width: "98%",
          position: "relative",
          left: "1%",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <label>
          Select Batch No :
          <Select
            showSearch
            onChange={onOrderChange}
            options={orderList}
            placeholder="Select Batch No"
            style={{
              marginRight: "2em",
            }}
          />
          Select Order No :
          <Select
            showSearch
            onChange={(value) => setOrder(value)}
            options={oderNoLovs}
            placeholder="Select Batch No"
            style={{
              width: "180px",
              marginRight: "2em",
            }}
          />
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: saveBtnStatus ? "block" : "none",
            }}
            shape="round"
            onClick={sendOrderNo}
          >
            Go
          </Button>
        </label>
      </Row>
      <Tabs
        style={{
          width: "98%",
          position: "relative",
          left: "1%",
        }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      {/* section to print */}
      <div id="section-to-print">
        <table style={{ width: "90%", tableLayout: "fixed" }}>
          <br></br>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>

            <tr>
              <th
                colspan="5"
                rowSpan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Unit H
              </th>
              <th
                colspan="9"
                rowSpan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Batch Manufacturing Record
              </th>
              <th
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Format.:
              </th>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01/F-070
              </td>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Revision No.:
              </th>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                01
              </td>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ref SOP No.:
              </th>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QAD01-D-64
              </td>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Page NO.:
              </th>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>

            <br />
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Department Name
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Spunlace
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                BMR No. / Rev. No.
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SL-RG-001 / 01
              </td>
            </tr>

            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Name
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Roll Goods
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Effective Date{" "}
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
            <tr></tr>
          </thead>
          <br></br>
          <tbody>
            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1.0 PRODUCTION DETAILS{" "}
              </th>
            </tr>
            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                BATCH NO:{" "}
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].batchNo.length > 0
                    ? printData.productionDetails[0].batchNo
                    : "NA"
                  : "NA"}
              </th>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PO No{" "}
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].poNumber.length > 0
                    ? printData.productionDetails[0].poNumber
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Production Order No
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].orderNumber.length > 0
                    ? printData.productionDetails[0].orderNumber
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Description
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].productDescription !== null
                    ? printData.productionDetails[0].productDescription
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Code
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].productCode.length > 0
                    ? printData.productionDetails[0].productCode
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            {/* // */}
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PO Qty. in No of Bag:
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].poQuantityBags !== null
                    ? printData.productionDetails[0].poQuantityBags
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PO Qty. in No of Boxes:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].poQuantityBoxes !== null
                    ? printData.productionDetails[0].poQuantityBoxes
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            {/* // */}
            {/* // */}
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                So far Packed Qty. in No of Bags:
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].packedQuantityBags !== null
                    ? printData.productionDetails[0].packedQuantityBags
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                So far Packed Qty. in No of Boxes:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].packedQuantityBoxes !== null
                    ? printData.productionDetails[0].packedQuantityBoxes
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            {/* // */}
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remaining Qty.in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].remainingQuantityBags !==
                    null
                    ? printData.productionDetails[0].remainingQuantityBags
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remaining Qty.in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].remainingQuantityBoxes !==
                    null
                    ? printData.productionDetails[0].remainingQuantityBoxes
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                On date packed Qty.in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].packDateQtyBag.length > 0
                    ? printData.productionDetails[0].packDateQtyBag
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                On date packed Qty.in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].packDateQtyBox.length > 0
                    ? printData.productionDetails[0].packDateQtyBox
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PO Completion Status:{" "}
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].poStatus.length > 0
                    ? printData.productionDetails[0].poStatus
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Lot No :{" "}
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].lotNumber.length > 0
                    ? printData.productionDetails[0].lotNumber
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing Start Date
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing End Date{" "}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date{" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData &&
                    printData.productionDetails[0].manufactureStartDate.length >
                    0
                    ? moment(
                      printData &&
                      printData.productionDetails[0].manufactureStartDate
                    ).format("DD/MM/YYYY - HH:mm")
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time{" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].manufactureStartTime.length >
                    0
                    ? printData.productionDetails[0].manufactureStartTime
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData &&
                    printData.productionDetails[0].manufactureEndDate.length > 0
                    ? moment(
                      printData &&
                      printData.productionDetails[0].manufactureEndDate
                    ).format("DD/MM/YYYY - HH:mm")
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].manufactureEndTime.length > 0
                    ? printData.productionDetails[0].manufactureEndTime.length
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing Completion Date{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date{" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {/* {printData && printData.productionDetails.length > 0
                  ? printData &&
                    printData.productionDetails[0].manufactureCompletionDate.length > 0
                    ? moment(
                        printData &&
                          printData.productionDetails[0].manufactureCompletionDate
                      ).format("DD/MM/YYYY - HH:mm")
                    : "NA"
                  : "NA"} */}
                {printData &&
                  printData.productionDetails &&
                  printData.productionDetails.length > 0
                  ? printData.productionDetails[0].manufactureCompletionDate &&
                    printData.productionDetails[0].manufactureCompletionDate
                      .length > 0
                    ? moment(
                      printData.productionDetails[0].manufactureCompletionDate
                    ).format("DD/MM/YYYY - HH:mm")
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time{" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {/* {printData && printData.productionDetails.length > 0
                  ? printData.productionDetails[0].manufactureCompletionTime.length > 0
                    ? printData.productionDetails[0].manufactureCompletionTime.length
                    : "NA"
                  : "NA"} */}
                {printData &&
                  printData.productionDetails &&
                  printData.productionDetails.length > 0
                  ? printData.productionDetails[0].manufactureCompletionTime &&
                    printData.productionDetails[0].manufactureCompletionTime
                      .length > 0
                    ? printData.productionDetails[0].manufactureCompletionTime
                      .length
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <br />

            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRODUCTION BATCH RECORD ISSUANCE DETAILS{" "}
              </th>
            </tr>
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Issued by: Quality Assurance has reviewed the Batch Record to
                ensure that the copy is a complete, accurate copy of the Master
                Batch Record.
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Received by: Production has reviewed the Batch Record to ensure
                that the copy is complete and correct. Production is responsible
                for the Batch Record, following the issuance.
              </td>
            </tr>

            <tr>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "50px",
                }}
              >
                Issued by (QA)
                <div style={{ verticalAlign: "Bottom" }}>
                  {printData && printData.productionDetails.length > 0
                    ? printData.productionDetails[0].qaName
                    : "NA"}
                  <br></br>
                  {printData && printData.productionDetails.length > 0
                    ? moment(printData.productionDetails[0].qaDate).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                    : "NA"}
                </div>{" "}
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "50px",
                }}
              >
                Received by (Production)
                <div style={{ verticalAlign: "Bottom" }}>
                  {printData && printData.productionDetails.length > 0
                    ? printData.productionDetails[0].supervisiorName
                    : "NA"}
                  <br></br>
                  {printData && printData.productionDetails.length > 0
                    ? moment(
                      printData &&
                      printData.productionDetails[0].supervisiorDate
                    ).format("DD/MM/YYYY - HH:mm")
                    : "NA"}
                </div>
              </td>
            </tr>

            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                  border: "none",
                }}
              >
                <strong>
                  {" "}
                  Instructions while filling in BMR: <br />
                </strong>
                1. Record all data in blue ink. <br />
                2. Record time as HR: MM in 24 hours format. <br />
                3. Record date in DD/MM/YYYY or DD/MM/YY format.
                <br />
                4. Do not leave any blank space. If there is any blank space, NA
                should be written, and the line should be <br />
                marked as "Z" Shape with sign and date. 5. Blue ink should be
                used by QA for review. <br />
                6. Immediately do the entry in BMR, along with the completion of
                activity. The time entered should be <br />
                considered as completion time of the activity.
                <br />
                7. Time of starting the batch shall be considered as start time
                and end of the completion of activity from <br />
                the equipment should be considered as completion time of batch.
                <br />
                8.Whenever any Deviation occurs, raise the deviation,
                investigation of deviation shall be performed & <br /> enter the
                deviation in the BMR.
                <br />
                9. Note: Tick mark "√" indicates activity selected /completed &
                Cross mark '"×" <br />
                indicate not selected/ not completed. <br />
                <strong>Safety Instructions: </strong>
                <br />
                Use personal Protective Equipment like Apron, Helmet, Safety
                goggles, Nose mask and hand gloves, etc <br />
                during material handling and sampling. Ear plugs are used in
                high noise areas.
              </td>
            </tr>

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                2.0 BALE CONSUMPTION: Refer the attachment. (Format# PRD02/F-08)
              </th>
            </tr>
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                3.0 PACKING MATERIAL ISSUE:{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="2">S.No</th>
              <th colSpan="4">Particulars</th>
              <th colSpan="4">Batch No</th>
              <th colSpan="4">Quantity</th>
              <th colSpan="4">Remarks</th>
              <th colSpan="2">Unit</th>
            </tr>
            {printData && printData.packingMaterial.length > 0
              ? printData.packingMaterial[0].pckdetails.map((x, i) => {
                return (
                  <tr>
                    <td colSpan="2">{i + 1}</td>
                    <td colSpan="4">{x.name_of_the_meterial}</td>
                    <td colSpan="4">{x.packing_batch_no}</td>
                    <td colSpan="4">{x.quantity}</td>
                    <td colSpan="4">{x.remarks}</td>
                    <td colSpan="2">{x.unit}</td>
                  </tr>
                );
              })
              : null}
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                4.0 REFERENCE DOCUMENTS:{" "}
              </th>
            </tr>

            <tr>
              <th
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Sl.No.
              </th>
              <th
                colspan="12"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Title{" "}
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Document No.{" "}
              </th>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Good Documentation Practices{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-10
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cleaning Machine & Sanitization
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD03-D-04
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Pad Punching Operation
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD03-D-03
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviations Management
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-41
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Change Control
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-37
              </td>
            </tr>
            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5.0 EQUPEMENTS USED FOR THE PROCESS:
              </td>
            </tr>
            <tr>
              <th colSpan="4">S No.</th>
              <th colSpan="2">Equipment Name</th>
              <th colSpan="2">Equipment code</th>
              <th colSpan="4">Date of Calibration</th>
              <th colSpan="4">Calibration due on</th>
              <th colSpan="4">Checked by Sign & Date</th>
            </tr>
            {printData.equipmentDetails.length > 0
              ? printData.equipmentDetails[0].details.map((x, i) => {
                return (
                  <tr>
                    <td colSpan="4">{i + 1}</td>
                    <td colSpan="2">{x.equipmentName}</td>
                    <td colSpan="2">{x.equipmentCode}</td>
                    <td colSpan="4">
                      {moment(x.dateOfCalibration).format(
                        "DD/MM/YYYY - HH:mm"
                      )}
                    </td>
                    <td colSpan="4">
                      {moment(x.calibrationDueOn).format(
                        "DD/MM/YYYY - HH:mm"
                      )}
                    </td>
                    <td colSpan="4">
                      {x.checked_name}
                      <br />
                      {moment(x.checked_date).format("DD/MM/YYYY - HH:mm")}
                    </td>
                  </tr>
                );
              })
              : null}
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6.0 VERIFICATION OF RECORDS:
              </th>
            </tr>

            <tr>
              <th
                colspan="7"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name of the Record{" "}
              </th>
              <th
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by/Date{" "}
              </th>
              <th
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Verified by/Date{" "}
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Status
              </th>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Housekeeping cleaning checking list
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[0].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[0].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[0].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[0]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[0]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[0]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Machine Cleaning Record{" "}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[1].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[1].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[1].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[1]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[1]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[1]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Logbook
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[2].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[2].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[2].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[2]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[2]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[2]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Production Records
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[3].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[3].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[3].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[3]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[3]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[3]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Bale Consumption Record
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[4].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[4].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[4].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[4]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[4]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[4]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product change over
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[5].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[5].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[5].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[5]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[5]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[5]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sharp tool issue record
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[6].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[6].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[6].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[6]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[6]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[6]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Machine sanitizer
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[7].checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[7].checked_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[7].verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.verificationOfRecords.length > 0
                  ? moment(
                    printData.verificationOfRecords[0].details[7]
                      .verified_date
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[7]
                    .satisfactory == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.verificationOfRecords.length > 0
                  ? printData.verificationOfRecords[0].details[7]
                    .satisfactory == "NOT SATISFACTORY"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <br />
            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7.0 MANUFACTURING STEPS:
              </th>
            </tr>
            <tr>
              <th
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Step No
              </th>
              <th
                colSpan="7"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Operation
              </th>
              <th
                colSpan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Observation
              </th>
              <th
                colSpan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed by (Sign & Date){" "}
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by(Sign & Date){" "}
              </th>
            </tr>
            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Roll Goods arrangement: Check the roll storage area for
                Cleanliness and verify the arrangement of the rolls for the
                readiness of process of allocated machine.
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[0]?.observation ==
                  "READY"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[0]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[0]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[0]?.checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[0]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Not Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[0]?.observation ==
                  "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colSpan="7"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Switch ON the{" "}
                {printData.manufactureSteps[0]?.details[1]?.machineName}{" "}
                machine.
                <br />
                Machine start time:{" "}
                {printData.manufactureSteps[0]?.details[1]?.machineStartTime}
                <br />
                Machine end time:{" "}
                {printData.manufactureSteps[0]?.details[1]?.machineEndTime}
                <br />
                Set parameters.
                <br />
                No of Pad:{" "}
                {printData.manufactureSteps[0]?.details[1]?.padCount1}
                <br />
                Machine Speed (RPM):{" "}
                {printData.manufactureSteps[0]?.details[1]?.machineSpeed1}
                <br />
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[1]?.observation ==
                  "READY"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[1]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[1]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[1].checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[1]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Not Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[1]?.observation ==
                  "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                No of Pad:{" "}
                {printData.manufactureSteps[0]?.details[1]?.padCount2}
                <br />
                Machine Speed (RPM):{" "}
                {printData.manufactureSteps[0]?.details[1]?.machineSpeed2}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Check the metal detector setting with FE – 1.0 mm & SS – 1.2 mm
                Refer Metal detector calibration record. (Format No.:
                QAD01/F-35)
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[2]?.observation ==
                  "CHECKED"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[2]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[2]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[2]?.checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[2]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[2]?.observation ==
                  "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Perform the packing as per the Product Development Sheet (Format
                # DVP01/F-05) PDS No.{" "}
                {printData.manufactureSteps[0]?.details[3]?.pdsNumber}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[3]?.observation ==
                  "PERFORMED"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[3]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[3]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[3]?.checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[3]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Performed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[3]?.observation ==
                  "NOT PERFORMED"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Roll Goods arrangement: Check the roll storage area for
                Cleanliness and verify the arrangement of the rolls for the
                readiness of process of allocated machine.
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[4]?.observation ==
                  "READY"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[4]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[4]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[4]?.checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[4]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[4]?.observation ==
                  "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6
              </td>
              <td
                colSpan="7"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Switch ON the{" "}
                {printData.manufactureSteps[0]?.details[5]?.machineName}{" "}
                machine.
                <br />
                Machine start time:{" "}
                {printData.manufactureSteps[0]?.details[5]?.machineStartTime}
                <br />
                Machine end time:{" "}
                {printData.manufactureSteps[0]?.details[5]?.machineEndTime}
                <br />
                Set parameters.
                <br />
                No of Pad:{" "}
                {printData.manufactureSteps[0]?.details[5]?.padCount1}
                <br />
                Machine Speed (RPM):{" "}
                {printData.manufactureSteps[0]?.details[5]?.machineSpeed1}
                <br />
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[5]?.observation ==
                  "READY"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[5]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[5]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[5]?.checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[5]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[5]?.observation ==
                  "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                No of Pad:{" "}
                {printData.manufactureSteps[0]?.details[5]?.padCount2}
                <br />
                Text Machine Speed (RPM):{" "}
                {printData.manufactureSteps[0]?.details[5]?.machineSpeed2}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Check the metal detector setting with FE – 1.0 mm & SS – 1.2 mm
                Refer Metal detector calibration record. (Format No.:
                QAD01/F-35)
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[6]?.observation ==
                  "CHECKED"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[6]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[6]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[6]?.checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[6]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[6]?.observation ==
                  "NOT CHECKED"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                8
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Perform the packing as per the Product Development Sheet (Format
                # DVP01/F-05) PDS No.
                {printData.manufactureSteps[0]?.details[7]?.pdsNumber}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[7]?.observation ==
                  "PERFORMED"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[7]?.performed_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[7]?.performed_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[7]?.checked_name}
                <br></br>
                {moment(
                  printData.manufactureSteps[0]?.details[7]?.checked_date
                ).format("DD/MM/YYYY - HH:mm")}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Performed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0]?.details[7]?.observation ==
                  "NOT PERFORMED"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>
            <br />
            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <strong>8.0 PRODUCT RECONCILIATION:</strong> <br />
                Yield in % = (Output Qty / Input Qty) x 100
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Input Quantity
                <br /> (Kgs)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {/* {printData && printData.reconillation.length > 0
                  ? printData.reconillation[0].input_quantity
                   "output": "0",
            "input": "0",
            "batchNo": "948644120-1",
            "yield": "0",
            "order": "800012843"
                  : "NA"} */}
                {printData.reconillation[0]?.input !== null ||
                  printData.reconillation[0]?.input.length > 0
                  ? printData.reconillation[0]?.input
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Output Quantity <br /> (Kgs){" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {/* {printData && printData.reconillation.length > 0
                  ? printData.reconillation[0].output_quantity
                  : "NA"} */}
                {printData.reconillation[0]?.output !== null ||
                  printData.reconillation[0]?.output.length > 0
                  ? printData.reconillation[0]?.output
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                % Yield (Specification: 55% to 70%)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {/* {printData && printData.reconillation.length > 0
                  ? printData.reconillation[0].calculation
                  : "NA"} */}
                {printData.reconillation[0]?.calculation !== null ||
                  printData.reconillation[0]?.calculation.length > 0
                  ? printData.reconillation[0]?.calculation
                  : "NA"}
              </td>
            </tr>
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                9.0 PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD
              </th>
            </tr>
            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S.No.
              </td>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>

              <td
                colspan="9"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Process Delay / Down Time
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remarks
              </td>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                From (hours or Minutes)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                To (hours or Minutes)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Total (hours or Minutes)
              </td>
            </tr>

            {printData && printData.stoppage.length > 0
              ? printData.stoppage[0].details.map((x, i) => {
                return (
                  <tr>
                    <td
                      colspan="2"
                      style={{
                        textAlign: "center",
                        fontSize: "10pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      colspan="2"
                      style={{
                        textAlign: "left",
                        fontSize: "10pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {moment(x.date).format("DD/MM/YYYY")}
                    </td>
                    <td
                      colspan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "10pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.fromTime}
                    </td>
                    <td
                      colspan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "10pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.toTime}
                    </td>
                    <td
                      colspan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "10pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.totalTime}
                    </td>
                    <td
                      colspan="4"
                      style={{
                        textAlign: "left",
                        fontSize: "10pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.remarks}
                    </td>
                    <td
                      colspan="3"
                      style={{
                        textAlign: "left",
                        fontSize: "10pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {x.supervisorName.length > 0 ||
                        x.supervisorName !== null
                        ? x.supervisorName
                        : "NA"}
                      <br></br>
                      {x.supervisorDate.length > 0 ||
                        x.supervisorDate !== null
                        ? x.supervisorDate
                        : "NA"}
                    </td>
                  </tr>
                );
              })
              : null}
            <br />
            {/* // */}
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                10.0 LIST OF ENCLOSURES:
              </th>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S No.
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Title
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remarks
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1.
              </td>
              <td
                colspan="10"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Roll Goods Consumption Report
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.enclosureList.length > 0
                  ? printData.enclosureList[0].remarks1 == "ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.enclosureList.length > 0
                  ? printData.enclosureList[0].remarks1 == "NOT ATTACHED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2.
              </td>
              <td
                colspan="10"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Packing Material Issue & Consumption Report
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.enclosureList.length > 0
                  ? printData.enclosureList[0].remarks2 == "ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.enclosureList.length > 0
                  ? printData.enclosureList[0].remarks2 == "NOT ATTACHED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3.
              </td>
              <td
                colspan="10"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.enclosureList.length > 0
                  ? printData.enclosureList[0].title3.length > 0 ||
                    printData.enclosureList[0].title3 !== null
                    ? printData.enclosureList[0].title3
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.enclosureList.length > 0
                  ? printData.enclosureList[0].remarks3 == "ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.enclosureList.length > 0
                  ? printData.enclosureList[0].remarks3 == "NOT ATTACHED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <br />
            {/* // */}
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                11.0 PROCESS DEVIATION RECORD
              </th>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S No.
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviation Log No
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QA Remarks
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[0].deviationLogNo
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[0].supervisorName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[0].supervisorDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[0].qaRemarks
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[0].qaName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[0].qaDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[1].deviationLogNo
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[1].supervisorName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[1].supervisorDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[1].qaRemarks
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[1].qaName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[1].qaDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[2].deviationLogNo
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[2].supervisorName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[2].supervisorDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[2].qaRemarks
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[2].qaName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[2].qaDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[3].deviationLogNo
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[3].supervisorName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[3].supervisorDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[3].qaRemarks
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.deviationRecord.length > 0
                  ? printData.deviationRecord[0].details[3].qaName
                  : "NA"}
                <br></br>
                {printData && printData.deviationRecord.length > 0
                  ? moment(
                    printData.deviationRecord[0].details[3].qaDate
                  ).format("DD/MM/YYYY")
                  : "NA"}
              </td>
            </tr>

            <br />
            {/* // */}
            {/* // */}
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                12.0 POST-PRODUCTION REVIEW:
              </th>
            </tr>
            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Designation
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Production Supervisor
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Head of the Department/ Designee
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Approved by Manager-QA/ Designee
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Signature
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.postProductionReview.length > 0
                  ? printData.postProductionReview[0].supervisorName
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.postProductionReview.length > 0
                  ? printData.postProductionReview[0].hodName
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.postProductionReview.length > 0
                  ? printData.postProductionReview[0].qaName
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.postProductionReview.length > 0
                  ? moment(
                    printData.postProductionReview[0].supervisiorSubmittedDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.postProductionReview.length > 0
                  ? moment(
                    printData.postProductionReview[0].hodSubmittedDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.postProductionReview.length > 0
                  ? moment(
                    printData.postProductionReview[0].qaSubmittedDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                13.0 QA RELEASE:
              </th>
            </tr>
            <tr>
              <th
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S.No
              </th>
              <th
                colspan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Description
              </th>
              <th
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Status
              </th>
              <th
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </th>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                All critical process parameters reviewed. (Within/Not within
                range)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[0].qaStatus ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[0].qaName
                  : "NA"}
                <br></br>
                {printData && printData.qualityRelease.length > 0
                  ? moment(
                    printData.qualityRelease[0].details[0].qaDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[0].qaStatus ==
                    "NOT REVIEWED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                In process checks reviewed. (Meeting/Not meeting the
                specification)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[1].qaStatus ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[1].qaName
                  : "NA"}
                <br></br>
                {printData && printData.qualityRelease.length > 0
                  ? moment(
                    printData.qualityRelease[0].details[1].qaDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[1].qaStatus ==
                    "NOT REVIEWED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviations reviewed. (Found/Not found)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[2].qaStatus ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[2].qaName
                  : "NA"}
                <br></br>
                {printData && printData.qualityRelease.length > 0
                  ? moment(
                    printData.qualityRelease[0].details[2].qaDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[2].qaStatus ==
                    "NOT REVIEWED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                If deviations are logged
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Closed{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[3].qaStatus ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[3].qaName
                  : "NA"}
                <br></br>
                {printData && printData.qualityRelease.length > 0
                  ? moment(
                    printData.qualityRelease[0].details[3].qaDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Closed{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[3].qaStatus ==
                    "NOT REVIEWED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                The Batch is released to next step.
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[4].qaStatus ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[4].qaName
                  : "NA"}
                <br></br>
                {printData && printData.qualityRelease.length > 0
                  ? moment(
                    printData.qualityRelease[0].details[4].qaDate
                  ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.qualityRelease.length > 0
                  ? printData.qualityRelease[0].details[4].qaStatus ==
                    "NOT REVIEWED"
                    ? "✕"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <br />
            <br />
            <br />

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                14.0 PRODUCT RELEASE
              </th>
            </tr>
            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                The material produced through the execution of this Batch Record
                shall be archival by QA according to Product Release Procedure
                (SOP-QAD01-D-61) and documented as per the Format: QAD01/F-34
              </td>
            </tr>
            <br></br>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Particulars
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by QA
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Approved by Manager-QA / Designee
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productRelease.length > 0
                  ? printData.productRelease[0].checkedBy
                  : "NA"}
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productRelease.length > 0
                  ? printData.productRelease[0].approvedBy
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign & Date
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productRelease.length > 0
                  ? printData.productRelease[0].checkedBy
                  : "NA"}
                <br></br>
                {printData && printData.productRelease.length > 0
                  ? moment(printData.productRelease[0].checkedOn).format(
                    "DD/MM/YYYY - HH:mm"
                  )
                  : "NA"}
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.productRelease.length > 0
                  ? printData.productRelease[0].approvedBy
                  : "NA"}
                <br></br>
                {printData && printData.productRelease.length > 0
                  ? moment(printData.productRelease[0].approvedOn).format(
                    "DD/MM/YYYY - HH:mm"
                  )
                  : "NA"}
              </td>
            </tr>

            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
          </tbody>
          <br />
          <br />

          <br></br>
          {/* //attached here */}
          {printData?.enclosureList[0]?.remarks1 == "ATTACHED"
            ? baleData?.map((machine, index) => (
              //    <table style={{ marginTop: "10px", scale: "95%" }} >
              <tbody style={{ width: "90%" }} key={index}>
                <tr>
                  <th colSpan="10">
                    DATE:
                    {moment(baleData?.[index]?.date).format("DD/MM/YYYY")}
                  </th>
                  <th colSpan="10">SHIFT:{baleData?.[index]?.shift}</th>
                </tr>
                <tr>
                  <th colSpan="4" rowSpan="2" style={{ textAlign: "center" }}>
                    Machine Name
                  </th>
                  <th colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                    Type Of Pad
                  </th>
                  <th colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                    Product Name
                  </th>
                  <th colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                    BMR NO. / ORDER NO.
                  </th>
                  <th colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                    Pattern
                  </th>
                  <th colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                    GSM
                  </th>
                  <th colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
                    Edge
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    No of Pads / Bags{" "}
                  </th>
                </tr>
                <tr>
                  <th colSpan="2" style={{ textAlign: "center" }}>
                    STD
                  </th>
                  <th colSpan="2" style={{ textAlign: "center" }}>
                    Act
                  </th>
                </tr>

                {baleData?.[index]?.machineDetails?.map((slice, index) => (
                  <tr key={index}>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {machine.machineName}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.typeOfPad}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.productName}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.bmrNo}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.pattern}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.gsm}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.edge}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.noOfPadsStd}
                    </td>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      {slice.noOfPadsAct}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th colSpan="20">Roll Consumption Details</th>
                </tr>
                <tr>
                  <th colSpan="2" style={{ textAlign: "center" }}>
                    Date
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Time
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    BMR NO. / ORDER NO
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Roll No
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Shaft No.
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Net Wt.
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Balance Wt.
                  </th>
                </tr>
                {baleData?.[index]?.rollConsumptionDetails?.map(
                  (slice, index) => (
                    <tr key={index}>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        {moment(slice.date).format("DD/MM/YYYY")}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {moment(slice.time).format("DD/MM/YYYY")}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {slice.bmrNo}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {slice.rollNo}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {slice.shaftNo}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {slice.netWt}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        {slice.balanceWt}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <th colSpan="20">Stoppage Details</th>
                </tr>
                <tr>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    M/c stop time (min)
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    M/c start time (min)
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Total min
                  </th>
                  <th colSpan="3" style={{ textAlign: "center" }}>
                    Reason
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Attend by
                  </th>
                  <th colSpan="4" style={{ textAlign: "center" }}>
                    Remarks
                  </th>
                </tr>
                {baleData?.[index]?.stoppageDetails?.map((slice, index) => (
                  <tr key={index}>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {slice.stopTime}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {slice.startTime}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {slice.totalMin}
                    </td>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      {slice.reason}
                    </td>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      {slice.attendBy}
                    </td>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      {slice.remarks}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th colSpan="20" style={{ height: "30px" }}>
                    Production Details in Bags :
                    {baleData?.[index]?.prodDetailsInBags || "NA"}{" "}
                  </th>
                </tr>
                <tr>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Operator Sign & Date
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    Production Supervisor Sign & Date
                  </th>
                  <th colSpan="5" style={{ textAlign: "center" }}>
                    HOD/Designee Sign & Date
                  </th>
                  <th
                    colSpan="5"
                    rowSpan="2"
                    style={{ verticalAlign: "top" }}
                  >
                    Remarks:
                    {baleData?.[index]?.prodDetailsInBags || "NA"}{" "}
                  </th>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", height: "30px" }}
                  >
                    {baleData[index].operator_sign || ""}
                    <br />
                    {moment(baleData[index]?.operator_submitted_on).format(
                      "DD/MM/YYYY - HH:mm"
                    )}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData[index].supervisor_sign || ""}
                    <br />
                    {moment(baleData[index]?.supervisor_submit_on).format(
                      "DD/MM/YYYY - HH:mm"
                    )}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData[index].hod_sign || ""}
                    <br />
                    {moment(baleData[index]?.hod_submit_on).format(
                      "DD/MM/YYYY - HH:mm"
                    )}
                  </td>
                </tr>
              </tbody>
            ))
            : null}

          {reworkList && reworkList.length > 0 && (
            <>
              <tr>
                <th
                  colSpan="20"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  15.0 Rework Report
                </th>
              </tr>

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Date:
                </td>
                <td
                  colSpan="16"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? formatDate1(reworkList[0].reworkDate)
                    : "NA"}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Department Name
                </td>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].departmentName
                    : "NA"}
                </td>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Machine No
                </td>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].machineName
                    : "NA"}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  BMR No
                </td>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].bmrNumber
                    : "NA"}
                </td>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Lot No./ Julian Date
                </td>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].lotNumber
                    : "NA"}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Reason for Rework
                </td>
                <td
                  colSpan="16"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].reworkReason
                    : "NA"}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Rework Qty. In Bags/ Boxes
                </td>
                <td
                  colSpan="16"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].reworkQuantity
                    : "NA"}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Reference NC No (if)
                </td>
                <td
                  colSpan="16"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].referenceNcNumber
                    : "NA"}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Action Taken:
                </td>
                <td
                  colSpan="16"
                  style={{
                    textAlign: "left",
                    fontSize: "10pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  {reworkList && reworkList.length > 0
                    ? reworkList[0].actionTaken
                    : "NA"}
                </td>
              </tr>
            </>
          )}

          <br />
          <br />
          {/* // */}
          <tfoot>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Particulars
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Prepared by
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed by
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Apporved by
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Signature & Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
          </tfoot>
        </table>

        {/* print layout ended here */}
      </div>
      {/* section to print */}
    </div>
  );
};

export default Pad_Punching_BMR;
