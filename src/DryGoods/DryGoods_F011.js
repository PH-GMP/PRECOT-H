import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tooltip,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const DryGoods_F011 = () => {
  const roleauth = localStorage.getItem("role");
  const formatName = "Ball, Pleat & Wool Roll Finished Goods Transfer Record";
  const formatNo = "PH-PRD04/F-011";
  const revisionNo = "01";
  const sopNo = "PH-PRD02-D-03";
  const unit = "Unit H";
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const [newDate, setNewDate] = useState("");
  const [shift, setShift] = useState("");
  const [shiftPrint, setShiftPrint] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const [disable, setDisable] = useState(false);
  const { confirm } = Modal;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { state } = location;
  const { date, shiftvalue } = state || {};
  console.log("date", date);
  console.log("shift", shiftvalue);
  const [statusLoader, setStatusLoader] = useState(false);
  const [finishedGoodsId, setFinishedGoodsId] = useState();
  const [submitLoader, setStatusSubmitLoader] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [supervisorStatus, setSuperviserStatue] = useState("");
  const [operatorstatus, setOperatorstatus] = useState("");
  const [deleteId, setDeleteId] = useState([]);
  const [fgSignLov, setfgSignLov] = useState([]); // To store fetched idNumber values

  const [reviews, setReviews] = useState({
    operator_sign: "",
    operator_submitted_on: "",
    hod_sign: "",
    hod_submit_on: "",
    operator_status: "",
    hod_status: "",
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });

  const [details, setRows] = useState([
    {
      po_no: "",
      product_name: "",
      material_code_no: "",
      no_of_boxes_in_pallet: "",
      no_of_pallet: "",
      total_box: "",
      fg_name: "",
    },
  ]);
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/DryGoods/F-011/Summary");
  };
  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {},
    });
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

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

  const handleInputChange = (index, name, value) => {
    const newRows = [...details];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const fetchFGSign = async () => {
    console.log("fetchIDNo valled");
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/drygoods/fetchRecordSignature`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );
      console.log("fetchIDNo valled312e12");

      if (response.data && Array.isArray(response.data)) {
        console.log("fetchIDNo valled213333333");
        setfgSignLov(response.data); // Assuming response.data is an array
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFGSign();
  }, []);

  const handleKeyDown = (e) => {
    const value = e.target.value;

    if (e.key === "Backspace" || e.key === ".") {
      return;
    }

    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
      return;
    }

    const hasDecimal = value.includes(".");

    if (hasDecimal) {
      const decimalIndex = value.indexOf(".");
      const decimalPart = value.slice(decimalIndex + 1);

      if (decimalPart.length >= 2 && e.key !== "Backspace") {
        e.preventDefault();
      }
    }

    if (value.length >= 20 && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  console.log("operrr", supervisorStatus);

  const statusFunction = (responseData) => {
    console.log("wer3", responseData);
    if (
      roleauth === "ROLE_SUPERVISOR" &&
      responseData.supervisor_status === "SUPERVISOR_APPROVED"
    ) {
      console.log("Condition met, hiding Submit button");
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    } else {
      console.log("Condition not met");
    }
  };

  
  const addRow = () => {
    setRows([
      ...details,
      {
        po_no: "",
        product_name: "",
        material_code_no: "",
        no_of_boxes_in_pallet: "",
        no_of_pallet: "",
        total_box: "",
        fg_name: "",
      },
    ]);
  };

  const deleteRow = (index, line_goods_id) => {
    if (details.length === 1) {
      alert("At least one row is required.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      if (line_goods_id) {
        setDeleteId((prevDeleteId) => [...prevDeleteId, line_goods_id]);
      }

      setRows((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  // Function to actually delete a row by ID after saving
  const handleDelete = async (rowId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/drygoods/deleteGoodsTransferLine?id=${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Row deleted successfully:", rowId);
      }
    } catch (err) {
      console.error("Error deleting row:", err);
      message.error("An error occurred while deleting a row.");
    }
  };

  useEffect(() => {
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = reviews[key];
      if (username) {
        console.log("usernameparams", username);

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
            console.log("Response:", res.data);
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [reviews]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/drygoods/getdetailsbyParamF011?date=${date}&shift=${shiftvalue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          const data = response.data;
          console.log("Responsed", data);
          setFinishedGoodsId(data.finished_goods_id);
          setSuperviserStatue(data.supervisor_status);
          console.log("first", operatorstatus);
          console.log("stts", supervisorStatus);
          setReviews((prevState) => ({
            ...prevState,
            supervisor_sign: data.supervisor_sign,
            supervisor_submit_on: data.supervisor_submit_on,
 
          }));

          if (data.finishedLines) {
            setRows(
              data.finishedLines.map((detail) => ({
                line_goods_id: detail.line_goods_id,
                po_no: detail.po_no,
                product_name: detail.product_name,
                material_code_no: detail.material_code_no,
                no_of_boxes_in_pallet: detail.no_of_boxes_in_pallet,
                no_of_pallet: detail.no_of_pallet,
                total_box: detail.total_box,
                fg_name: detail.fg_name,
              }))
            );
          }
          statusFunction(data);
        }
      } catch (error) {
        message.error(error.response.data.message);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-011/Summary");
        }, 1000);
      }
    };

    fetchData();
  }, [shift, date]);

  const handleSave = async () => {
    setStatusLoader(true);
    const payload = {
      unit: "Unit H",
      formatNo: "PH-PRD04/F-011",
      formatName: "Ball,Pleate & Wool Roll Finished Goods Transfer Record",
      sopNumber: "PH-PRD04-D-03",
      revisionNo: "01",
      finished_goods_id: finishedGoodsId,
      date: date,
      shift: shiftvalue,
      finishedLines: details,
      finishedLines: details.map((detail) => ({
        line_goods_id: detail.line_goods_id,
        po_no: detail.po_no,
        product_name: detail.product_name,
        material_code_no: detail.material_code_no,
        no_of_boxes_in_pallet: detail.no_of_boxes_in_pallet,
        no_of_pallet: detail.no_of_pallet,
        total_box: detail.total_box,
        fg_name: detail.fg_name,
      })),
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/drygoods/savefinishedgoodsDetailsF011`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 201 || response.status == 200) {
        // If save is successful, delete rows in deleteId
        if (deleteId.length > 0) {
          for (let i = 0; i < deleteId.length; i++) {
            await handleDelete(deleteId[i]);
          }
          setDeleteId([]); // Clear the deleteId array after successful deletion
        }
        message.success("Saved Successfully");
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-011/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setStatusLoader(false);
    }
  };

  const handleSubmit = async () => {
    const errors = details
      .map((detail, index) => {
        if (
          !detail.po_no ||
          !detail.product_name ||
          !detail.material_code_no ||
          !detail.no_of_boxes_in_pallet ||
          !detail.no_of_pallet ||
          !detail.total_box ||
          !detail.fg_name
        ) {
          return `Row ${index + 1}: Fields are required.`;
        }
        return null;
      })
      .filter((error) => error !== null);

    if (errors.length > 0) {
      errors.forEach((error) => message.warning(error));
      return;
    }
    setStatusSubmitLoader(true);
    const payload = {
      unit: "Unit H",
      formatNo: "PH-PRD04/F-011",
      formatName: "Ball,Pleate & Wool Roll Finished Goods Transfer Record",
      sopNumber: "PH-PRD04-D-03",
      revisionNo: "01",
      finished_goods_id: finishedGoodsId,
      date: date,
      shift: shiftvalue,
      finishedLines: details,
      finishedLines: details.map((detail) => ({
        line_goods_id: detail.line_goods_id,
        po_no: detail.po_no,
        product_name: detail.product_name,
        material_code_no: detail.material_code_no,
        no_of_boxes_in_pallet: detail.no_of_boxes_in_pallet,
        no_of_pallet: detail.no_of_pallet,
        total_box: detail.total_box,
        fg_name: detail.fg_name,
      })),
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/drygoods/submitfinishedgoodsDetailsF011`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 201 || response.status == 200) {
        // If save is successful, delete rows in deleteId
        if (deleteId.length > 0) {
          for (let i = 0; i < deleteId.length; i++) {
            await handleDelete(deleteId[i]);
          }
          setDeleteId([]); // Clear the deleteId array after successful deletion
        }
        message.success("Submitted Successfully");
        setStatusSubmitLoader(false);
        setTimeout(() => {
          navigate("/Precot/DryGoods/F-011/Summary");
        }, 1000);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setStatusSubmitLoader(false);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Details</b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "95%",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                  }}
                >
                  S.No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  PO No.
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Product Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Material Code No.
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  No. Of Box in Pallet
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  No. Of Pallet
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Total Box in Nos
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  FG Sign
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {details.map((row, index) => (
                <tr key={index}>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="po_no"
                      type="text"
                      value={row.po_no}
                      readOnly={status.fieldStatus}
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      }
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="product_name"
                      value={row.product_name}
                      readOnly={status.fieldStatus}
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      }
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="material_code_no"
                      value={row.material_code_no}
                      readOnly={status.fieldStatus}
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      }
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="no_of_boxes_in_pallet"
                      value={row.no_of_boxes_in_pallet}
                      readOnly={status.fieldStatus}
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      }
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="no_of_pallet"
                      value={row.no_of_pallet}
                      readOnly={status.fieldStatus}
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      } // onBlur={() => setEditable(false)}
                      // onFocus={() => setEditable(true)}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="total_box"
                      value={row.total_box}
                      readOnly={status.fieldStatus}
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, e.target.name, e.target.value)
                      }
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Select
                      showSearch
                      value={row.fg_name}
                      onChange={(e) => handleInputChange(index, "fg_name", e)}
                      onKeyDown={(e) => {
                        const isAlphanumeric = /^[a-zA-Z0-9]$/;
                        // Check if the pressed key is not valid
                        if (
                          !isAlphanumeric.test(e.key) &&
                          ![
                            "Backspace",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                            "_",
                            "/",
                            " ",
                          ].includes(e.key)
                        ) {
                          e.preventDefault(); 
                        }

                        if (e.key === "Enter") {
                          handleInputChange(index, "fg_name", e.target.value);
                        }
                      }}
                      style={{ width: "200px" }}
                      placeholder="Search Batch No"
                      optionFilterProp="children"
                      disabled={status.fieldStatus}
                      filterOption={false}
                    >
                      {fgSignLov.map((option) => (
                        <Select.Option key={option.id} value={option.value}>
                          {option.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      minWidth: "50px",
                      width: "50px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash style={{ fontSize: "10px" }} />}
                      onClick={() => deleteRow(index, row.line_goods_id)}
                      disabled={status.fieldStatus}
                      // disabled={!isEditable}
                      style={{
                        padding: "2px 4px",
                        fontSize: "10px",
                        lineHeight: "12px",
                        height: "24px",
                        width: "auto",
                        minWidth: "auto",
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              border: "1px solid #00308F",
              padding: "8px 12px",
              fontSize: "12px",
              marginRight: "50%",
              marginLeft: "35px",
              display: status.submitStatus ? "none" : "flex",
            }}
            // disabled={disable}
            // disabled={!isEditable}
            onClick={addRow}
            icon={
              <AiOutlinePlus style={{ color: "#00308F", marginRight: "1px" }} />
            }
          >
            Add Row
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          <b> Reviews </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Verified by Prod. Supervisor Sign & Date</b>
              </td>
            </tr>
            <tr>
              <td
                colSpan="10"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      {reviews.supervisor_sign}
                      <br />
                      {formatDateAndTime(reviews.supervisor_submit_on)}
                    </div>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    {eSign.supervisor_sign ? (
                      <img
                        src={eSign.supervisor_sign}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit={unit}
        formName={formatName}
        formatNo={formatNo}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_SUPERVISOR" ? (
            <>
              <Button
                loading={statusLoader}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: status.saveStatus ? "none" : "flex",
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={submitLoader}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: status.submitStatus ? "none" : "flex",
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ) : null,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // marginRight: "20px",
            }}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            shape="round"
          >
            Back
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
            onClick={handleLogout}
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
      <Form
        layout="horizontal"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <Form.Item label="Date" style={{ marginBottom: 0, marginLeft: "1rem" }}>
          <p style={{ margin: 0 }}>{moment(date).format("DD/MM/YYYY")}</p>
        </Form.Item>
        <Form.Item label="Shift" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{shiftvalue}</p>
        </Form.Item>
      </Form>
      <Tabs
        defaultActiveKey="1"
        items={items}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default DryGoods_F011;
