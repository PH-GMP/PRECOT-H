import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import API from "../baseUrl.json";

import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";

import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { printDateFormat, slashFormatDate } from "../util/util.js";

const BudsF001Equip = () => {
  const navigate = useNavigate();
  const navigateSummary = "/Precot/CottonBuds/F-001/Summary";
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const initialized = useRef(false);
  const role = localStorage.getItem("role");
  const [rejectModal, setRejectModal] = useState(false);
  const { date, shift, saleOrderNo } = location.state;
  const { TextArea } = Input;

  const [rejectReason, setRejectReason] = useState();

  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);
  const [isSaveButton, setIsSaveButton] = useState("none");
  const [isSubmitButton, setIsSubmitButton] = useState("none");
  const [isApprovalButtons, setIsApprovalButtons] = useState("none");
  const [isLoading, setIsLoading] = useState(false);

  const [machineIdLov, setMachineIdLov] = useState([]);
  const [prodOrderNoLov, setProdOrderNoLov] = useState([
    { value: "800002591", id: 1 },
    { value: "800002592", id: 2 },
  ]);

  const [eSign, setESign] = useState({
    operator_submitted_by: null,
    supervisor_submit_by: null,
    hod_submit_by: null,
  });

  const [formData, setFormData] = useState({
    operator_status: "",
    operator_save_by: "",
    operator_save_on: "",
    operator_save_id: "",
    operator_submitted_by: "",
    operator_submitted_on: "",
    operator_submitted_id: "",
    operator_sign: "",
    supervisor_status: "",
    supervisor_submit_on: "",
    supervisor_submit_by: "",
    supervisor_submit_id: "",
    supervisor_sign: "",
    hod_status: "",
    hod_submit_on: "",
    hod_submit_by: "",
    hod_submit_id: "",
    hod_sign: "",
    hod_signature_image: "",
    operator_signature_image: "",
    supervisor_signature_image: "",
    equipmentId: "",
    formName: "EQUIPMENT USAGE LOGBOOK - COTTON BUDS",
    formNumber: "PH-PRD06/F-001",
    department: "Manufacturing",
    rejectReason: null,
    equipmentDate: date,
    equipmentShift: shift,
    saleOrderNo: saleOrderNo,
    equipmentLine: [
      {
        machineName: "",
        productionOrder: "",
        productName: "",
        openQuantity: "",
        prodQuantity: "",
        balanceQuantity: "",
        startOperation: "",
        endOperation: "",
        startCleaning: "",
        endCleaning: "",
        startBreakdown: "",
        endBreakdown: "",
      },
    ],
  });

  const mandatoryFields = [
    {
      path: "equipmentLine.productionOrder",
      message: "Production Order Number is required",
    },
    { path: "equipmentLine.machineName", message: "Machine Id is required" },
  ];

  const validateFormData = () => {
    const newErrors = {};

    const validateFieldPath = (fieldPath, data, message) => {
      const fieldParts = fieldPath.split(".");
      let value = data;

      for (const part of fieldParts) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            validateFieldPath(
              fieldParts.slice(1).join("."),
              item,
              `${message} (Item ${index + 1})`
            );
          });
          return;
        } else if (value && typeof value === "object") {
          value = value[part];
        } else {
          value = undefined;
          break;
        }
      }

      if (!value) {
        newErrors[fieldPath] = message;
      }
    };

    mandatoryFields.forEach(({ path, message }) => {
      validateFieldPath(path, formData, message);
    });

    return newErrors;
  };
  const updateEmptyStringsToNA = (data, excludeFields = []) => {
    if (Array.isArray(data)) {
      return data.map((item) => updateEmptyStringsToNA(item, excludeFields));
    } else if (typeof data === "object" && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        if (excludeFields.includes(key)) {
          acc[key] = data[key];
        } else {
          acc[key] = updateEmptyStringsToNA(data[key], excludeFields);
        }
        return acc;
      }, {});
    } else {
      return data === "" ? "N/A" : data;
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(formData.equipmentLine.length / recordsPerPage);

  const currentRecords = formData.equipmentLine.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleChange = (name, value, index) => {
    setFormData((prevFormData) => {
      const updatedRawmaterDetails = [...prevFormData.equipmentLine];
      updatedRawmaterDetails[index] = {
        ...updatedRawmaterDetails[index],
        [name]: value,
      };

      return {
        ...prevFormData,
        equipmentLine: updatedRawmaterDetails,
      };
    });
  };

  const handleSelectChange = (name, value, index) => {
    const balanceQty = formData.equipmentLine
      .slice()
      .reverse()
      .find((equip) => equip.productionOrder === value)?.balanceQuantity;

    setFormData((prevFormData) => {
      const updatedRawmaterDetails = [...prevFormData.equipmentLine];
      updatedRawmaterDetails[index] = {
        ...updatedRawmaterDetails[index],
        [name]: value,
        openQuantity: balanceQty,
      };

      return {
        ...prevFormData,
        equipmentLine: updatedRawmaterDetails,
      };
    });
  };

  const handleQuantityChange = (field, value, index) => {
    const updatedFormData = { ...formData };
    updatedFormData.equipmentLine[index][field] = value;

    if (field === "openQuantity" || field === "prodQuantity") {
      const openQuantity =
        parseFloat(updatedFormData.equipmentLine[index].openQuantity) || 0;
      const prodQuantity =
        parseFloat(updatedFormData.equipmentLine[index].prodQuantity) || 0;
      const balanceQuantity = openQuantity - prodQuantity;
      updatedFormData.equipmentLine[index].balanceQuantity = balanceQuantity;
    }

    setFormData(updatedFormData);
  };

  const handleCheckBoxChange = (index) => {
    setFormData((prevData) => {
      const updatedDetails = prevData.equipmentLine.map((detail, i) => ({
        ...detail,
        selected: i === index ? !detail.selected : false, 
      }));
      return {
        ...prevData,
        equipmentLine: updatedDetails,
      };
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${API.prodUrl}/Precot/api/buds/Service/saveEquipmentDetails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success("saved succesfully!");
        navigate(navigateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSubmit = () => {
    setIsLoading(true);
    const errors = validateFormData();

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, error]) => {
        message.warning(error);
      });
      setIsLoading(false);
      return;
    }

    const updatedData = updateEmptyStringsToNA(formData, [
      "balanceQuantity",
      "operator_save_on",
      "operator_submitted_on",
      "supervisor_submit_on",
      "hod_submit_on",
      "operator_save_id",
      "operator_submitted_id",
      "supervisor_submit_id",
      "hod_submit_id",
      "equipmentId",
      "supervisor_submit_by",
      "operator_submitted_by",
      "hod_submit_by",
    ]);

    updatedData["reason"] = null;

    const token = localStorage.getItem("token");
    try {
      const response = axios.post(
        `${API.prodUrl}/Precot/api/buds/Service/submitEquipmentDetails`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Submitted Successfully");
      setIsLoading(false);
      navigate(navigateSummary);
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Unable to Submit Form");
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/buds/Service/approveEquipmentDetails`,
        {
          id: formData.equipmentId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setIsLoading(false);
        navigate(navigateSummary);
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {});
  };
  const handleReject = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/buds/Service/approveEquipmentDetails`,
        {
          id: formData.equipmentId,
          status: "Reject",
          remarks: rejectReason,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        setIsLoading(false);
        navigate(navigateSummary);
      })
      .catch((err) => {
        setIsLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {});
  };
  const handleAddRow = () => {
    if (formData.equipmentLine.length > 0) {
      if (
        formData.equipmentLine[formData.equipmentLine.length - 1]
          .openQuantity === "" ||
        formData.equipmentLine[formData.equipmentLine.length - 1]
          .prodQuantity === ""
      ) {
        message.warning("Before proceeding enter open and prod Quantity");
        return;
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      equipmentLine: [
        ...prevFormData.equipmentLine,
        {
          machineName: "",
          productionOrder: "",
          productName: "",
          openQuantity: "",
          prodQuantity: "",
          balanceQuantity: "",
          startOperation: "",
          endOperation: "",
          startCleaning: "",
          endCleaning: "",
          startBreakdown: "",
          endBreakdown: "",
        },
      ],
    }));
  };
  const handleDeleteRow = () => {
    const selectedIdsArray = formData.equipmentLine
      .filter((row) => row.selected)
      .map((row) => row.id);

    if (selectedIdsArray.length === 0) {
      message.warning("No rows selected for deletion");
      return;
    }

    const token = localStorage.getItem("token");

    if (selectedIdsArray[0] !== undefined) {
      axios
        .delete(
          `${API.prodUrl}/Precot/api/buds/Service/deleteEquipmentDetails?id=${selectedIdsArray[0]}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          message.success("Deleted successfully");
          fetchData();
        })
        .catch((error) => {
          message.error("Failed to delete selected rows");
        });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        equipmentLine: prevFormData.equipmentLine.filter(
          (row) => !row.selected
        ),
      }));
    }
  };

  const items = [
    {
      key: 1,
      label: <p>Equipment Usage</p>,
      children: (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0.5rem" }} rowSpan={2}></th>

                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  <p>Machine ID.</p>
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  <p>Prod. Order No.</p>
                </th>
                <th rowSpan={2} style={{ padding: "0.5rem" }}>
                  <p>Product Name</p>
                </th>
                <th colSpan={3} style={{ padding: "0.5rem" }}>
                  <p>QTY</p>
                </th>
                <th colSpan={2} style={{ padding: "0.5rem" }}>
                  <p>Operation</p>
                </th>
                <th colSpan={2} style={{ padding: "0.5rem" }}>
                  <p>Cleaning</p>
                </th>
                <th colSpan={2} style={{ padding: "0.5rem" }}>
                  <p>Breakdown /</p>
                  <p>Preventive Maintenance</p>
                </th>
              </tr>
              <tr>
                <th style={{ padding: "0.5rem" }}>
                  <p>Open Qty.</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>Prod. Qty.</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>Bal. Qty.</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>Start</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>End</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>Start</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>End</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>Start</p>
                </th>
                <th style={{ padding: "0.5rem" }}>
                  <p>End</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((equipmentLine, index) => (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={equipmentLine.selected}
                       onChange={(e) => handleCheckBoxChange(index)}
                      disabled={isFieldsDisabled}
                    />
                  </td>
         
                  <td>
                    <Select
                      value={equipmentLine.machineName}
                      style={{ width: "100%" }}
                      options={machineIdLov}
                      onChange={(value) =>
                        handleChange(
                          "machineName",
                          value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <Select
                      value={equipmentLine.productionOrder}
                      style={{ width: "100%" }}
                      options={prodOrderNoLov}
                      placeholder="prod order"
                      onChange={(value) =>
                        handleSelectChange(
                          "productionOrder",
                          value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <Input
                      value={equipmentLine.productName}
                      onChange={(e) =>
                        handleChange(
                          "productName",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <Input
               
                      value={equipmentLine.openQuantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          "openQuantity",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <Input
                      
                      value={equipmentLine.prodQuantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          "prodQuantity",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <p style={{ width: "5rem", textAlign: "center" }}>
                      {equipmentLine.balanceQuantity || "N/A"}
                    </p>
                  </td>
                  <td>
                    <input
                      type="time"
                      value={equipmentLine.startOperation}
                      onChange={(e) =>
                        handleChange(
                          "startOperation",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={equipmentLine.endOperation}
                      onChange={(e) =>
                        handleChange(
                          "endOperation",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={equipmentLine.startCleaning}
                      onChange={(e) =>
                        handleChange(
                          "startCleaning",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={equipmentLine.endCleaning}
                      onChange={(e) =>
                        handleChange(
                          "endCleaning",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={equipmentLine.startBreakdown}
                      onChange={(e) =>
                        handleChange(
                          "startBreakdown",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={equipmentLine.endBreakdown}
                      onChange={(e) =>
                        handleChange(
                          "endBreakdown",
                          e.target.value,
                          (currentPage - 1) * recordsPerPage + index
                        )
                      }
                      disabled={isFieldsDisabled}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ border: "none", padding: "1rem" }}></td>
              </tr>
              <tr>
                <td style={{ border: "none" }}>
                  <Button
                    onClick={handleAddRow}
                    style={{ display: isSubmitButton }}
                  >
                    Add Row
                  </Button>
                </td>

                <td style={{ border: "none" }}>
                  <Button
                    onClick={handleDeleteRow}
                    style={{ display: isSubmitButton }}
                  >
                    Remove Row
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
          <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
            <Button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </Button>
            <span style={{ margin: "0 1rem" }}>
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </>
      ),
    },
    {
      key: 2,
      label: <p>Signature</p>,
      children: (
        <>
          <table>
            <tr>
              <td style={{ padding: "0.5rem", textAlign: "center" }}>
                <div>Done By Sign & Date</div>

                <div>{formData.operator_submitted_by}</div>
                <div>{printDateFormat(formData.operator_submitted_on)}</div>
                <div>
                  {eSign.operator_submitted_by ? (
                    <img
                      src={eSign.operator_submitted_by}
                      alt="operator_sign"
                      style={{
                        width: "100px",
                        height: "50px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                </div>
              </td>
              <td style={{ padding: "0.5rem", textAlign: "center" }}>
                <div>Checked By Sign & Date</div>

                {formData.supervisor_status !== "WAITING_FOR_APPROVAL" && (
                  <div>
                    <div>{formData.supervisor_submit_by}</div>
                    <div>{printDateFormat(formData.supervisor_submit_on)}</div>
                    <div>
                      {eSign.supervisor_submit_by ? (
                        <img
                          src={eSign.supervisor_submit_by}
                          alt="supervisor_sign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </td>
              <td style={{ padding: "0.5rem", textAlign: "center" }}>
                <div>Reviewed by Sign & Date</div>
                {(formData.hod_status === "HOD_APPROVED" ||
                  formData.hod_status === "HOD_REJECTED") && (
                  <div>
                    <div>{formData.hod_submit_by}</div>
                    <div>{printDateFormat(formData.hod_submit_on)}</div>
                    <div>
                      {eSign.hod_submit_by ? (
                        <img
                          src={eSign.hod_submit_by}
                          alt="hod_sign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const validateForms = (response) => {
    if (role === "ROLE_OPERATOR") {
      if (response.operator_status === "") {
        setIsSaveButton("block");
        setIsSubmitButton("block");
        setIsFieldsDisabled(false);
      } else if (response.operator_status === "OPERATOR_SAVED") {
        setIsSaveButton("block");
        setIsSubmitButton("block");
        setIsFieldsDisabled(false);
      } else if (
        response.operator_status === "OPERATOR_APPROVED" &&
        (response.supervisor_status === "SUPERVISOR_REJECTED" ||
          response.hod_status === "HOD_REJECTED")
      ) {
        // setIsSaveButton('none');
        setIsSubmitButton("block");
        setIsFieldsDisabled(false);
      }
    } else if (role === "ROLE_SUPERVISOR") {
      if (response.supervisor_status === "WAITING_FOR_APPROVAL") {
        setIsApprovalButtons("block");
      } else if (
        response.supervisor_status === "SUPERVISOR_APPROVED" &&
        response.hod_status !== "HOD_REJECTED"
      ) {
      } else {
        message.warning("Operator is not Approved yet!");
        navigate(navigateSummary);
      }
    } else if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      if (response.hod_status === "WAITING_FOR_APPROVAL") {
        setIsApprovalButtons("block");
      } else if (response.hod_status === "HOD_APPROVED") {
      } else {
        message.warning("supervisor is not Approved yet!");
        navigate(navigateSummary);
      }
    }
  };

  const navigateBack = () => {};

  const handleBack = () => {
    navigate(navigateSummary);
  };

  const handleOpenRejectModal = () => {
    setRejectModal(true);
  };

  const handleCancel = () => {
    setRejectModal(false);
  };

  const fetchData = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/Service/getEquipmentDetails?date=${date}&shift=${shift}&bmrNumber=${saleOrderNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setFormData(response.data[0]);
          navigateBack(response.data[0]);
          validateForms(response.data[0]);
        } else {
          validateForms(formData);
        }
      })
      .catch((error) => {
        // message.error(error);
      });
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const token = localStorage.getItem("token");
      const fetchProdOrderNo = async () => {
        try {
          const response = await axios.get(
            `${
             API.prodUrl
            }/Precot/api/buds/bmr/getOrderByBatchNumber?batchNumber=${
              saleOrderNo.split("-")[0]
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // setBmrLov(response.data)
          // setProdOrderNoLov(response.data)
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      const fetchMachineId = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/buds/sap/Service/machineList`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMachineIdLov(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      //

      fetchProdOrderNo();
      fetchData();
      fetchMachineId();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "operator_submitted_by",
      "supervisor_submit_by",
      "hod_submit_by",
    ];
    signatureKeys.forEach((key) => {
      if (formData) {
        const username = formData[key];

        if (username) {
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
            .catch((err) => {});
        }
      }
    });
  }, [formData]);

  return (
    <>
      <BleachingHeader
        formName={"EQUIPMENT USAGE LOGBOOK - COTTON BUDS"}
        formatNo={"PH-PRD06/F-001"}
        unit={"UNIT H"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_HOD" ||
          role === "ROLE_DESIGNEE" ||
          role === "ROLE_SUPERVISOR" ? (
            <>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isApprovalButtons,
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isApprovalButtons,
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={handleOpenRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSaveButton,
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: isSubmitButton,
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
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
            onClick={() => {
              if (window.confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <div>
        {/* <input type='date' style={{ margin: '0.5rem' }} /> */}
        <Input
          addonBefore="Date"
          value={slashFormatDate(date)}
          style={{ margin: "0.5rem", width: "15%" }}
          readOnly
        />
        <Input
          addonBefore="Shift"
          value={shift}
          style={{ margin: "0.5rem", width: "15%" }}
          readOnly
        />
        <Input
          addonBefore="Sale Order No"
          value={saleOrderNo}
          style={{ margin: "0.5rem", width: "25%" }}
          readOnly
        />
      </div>
      <div>
        <Modal
          title="Reason For Reject"
          open={rejectModal}
          onCancel={handleCancel}
          width={380}
          destroyOnClose={true}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="reject"
              type="primary"
              onClick={handleReject}
              loading={isLoading}
            >
              Reject
            </Button>,
          ]}
        >
          <label>Reason : </label>
          <br></br>
          <br></br>
          <TextArea
            type="textArea"
            style={{ height: "100px" }}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          ></TextArea>
        </Modal>
      </div>
      <div>
        <Tabs items={items} style={{ margin: "0.5rem" }} />
      </div>
    </>
  );
};

export default BudsF001Equip;
