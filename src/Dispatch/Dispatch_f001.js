/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Form, Input, message, Row, Select, Tabs, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const { Option } = Select;
const Dispatch_f001 = () => {
  const [saveLoading, setSaveLoading] = useState(false);

  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const [reportDetails, setReportDetails] = useState([]);

  const token = localStorage.getItem("token");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingProductCode, setLoadingProductCode] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const [editResponse, seteditResponse] = useState([]);

  const [openingStock, setOpeningStock] = useState([]);
  const [closingStockres, setclosingStockres] = useState([]);
  const [receiptQty, setReceiptQty] = useState("");
  const [dispatchedQty, setDispatchedQty] = useState("");
  const [issuedQty, setIssuedQty] = useState("");
  const [closingStock, setClosingStock] = useState("");
  const [department, setDepartment] = useState("");
  const [receivedByProduction, setReceivedByProduction] = useState("");
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [remark, setRemark] = useState("");
  const [rows, setRows] = useState([
    { description: "", production: "", days: "", avgProd: "" },
  ]);

  const handleSelectText = (e, name) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      setReceivedByProduction(e.target.value);
    }
  };

  const formatDateUser = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const shiftSelector = [
    { label: "I", value: "I" },
    { label: "II", value: "II" },
    { label: "III", value: "III" },
  ];

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productCode, setProductCode] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProductCode, setSelectedProductCode] = useState("");
  useEffect(() => {
    if (state.id) {
      fetchData();
    }
  }, [state.id]);

  useEffect(() => {
    fetchOpeningStock();
  }, [selectedCustomer, selectedProduct, selectedProductCode]);

  useEffect(() => {
    const opening = parseInt(openingStock || 0, 10);
    const receipt = parseInt(receiptQty || 0, 10);
    const dispatched = parseInt(dispatchedQty || 0, 10);
    const issued = parseInt(issuedQty || 0, 10);

    const closing = opening + receipt - (issued + dispatched);
    setClosingStock(closing > 0 ? closing : 0);
  }, [openingStock, receiptQty, dispatchedQty, issuedQty]);

  useEffect(() => {
    const fetchReciever = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Dispatch/fetchreceivedname`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((item) => ({
          label: item.value || "Unknown",
          value: item.value,
        }));
        setReceiverOptions(options);
        setFilteredOptions(options);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };

    fetchReciever();
  }, []);

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredOptions(receiverOptions);
    } else {
      const filtered = receiverOptions.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const fetchProductCode = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Dispatch/getProductname`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };

  const fetchProductCodes = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Dispatch/fetchProductCode`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductCode(response.data);
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };

  const fetchCustomerName = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Dispatch/getCustomerName`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };

  useEffect(() => {
    const fetchFilteredLOVs = async () => {
      if (selectedProduct || selectedProductCode || selectedCustomer) {
        setLoadingProducts(true);
        setLoadingProductCode(true);
        setLoadingCustomers(true);
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/Dispatch/fetchAllDetails`,
            {
              params: {
                Productname: selectedProduct || "",
                customer: selectedCustomer || "",
                material: selectedProductCode || "",
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // product name
          if (selectedProduct) {
            if (response.data.customers?.length === 0) {
              setCustomers(
                (response.data.customers || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
              setSelectedCustomer("");
            } else if (response.data.customers !== null) {
              setCustomers(
                (response.data.customers || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }
            if (response.data.materials?.length === 0) {
              setProductCode(
                (response.data.materials || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
              setSelectedProductCode("");
            } else if (response.data.materials !== null) {
              setProductCode(
                (response.data.materials || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }

            if (response.data.productNames !== null) {
              setProducts(
                (response.data.productNames || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }
          }

          //customer
          if (selectedCustomer) {
            if (response.data.productNames?.length === 0) {
              setProducts(
                (response.data.productNames || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
              setSelectedProduct("");
            } else if (response.data.productNames !== null) {
              setProducts(
                (response.data.productNames || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }

            if (response.data.materials?.length === 0) {
              setProductCode(
                (response.data.materials || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
              setSelectedProductCode("");
            } else if (response.data.materials !== null) {
              setProductCode(
                (response.data.materials || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }

            if (response.data.customers !== null) {
              setCustomers(
                (response.data.customers || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }
          }

          //product code
          if (selectedProductCode) {
            if (response.data.productNames?.length === 0) {
              setProducts(
                (response.data.productNames || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
              setSelectedProduct("");
            } else if (response.data.productNames !== null) {
              setProducts(
                (response.data.productNames || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }

            if (response.data.customers?.length === 0) {
              setCustomers(
                (response.data.customers || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
              setSelectedCustomer("");
            } else if (response.data.customers !== null) {
              setCustomers(
                (response.data.customers || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }

            if (response.data.materials !== null) {
              setProductCode(
                (response.data.materials || []).map((item, index) => ({
                  id: index + 1,
                  value: item,
                }))
              );
            }
          }
        } catch (error) {
          console.error("Error fetching filtered LOVs:", error);
        } finally {
          // Disable loading states after fetching
          setLoadingProducts(false);
          setLoadingProductCode(false);
          setLoadingCustomers(false);
        }
      }
    };

    fetchFilteredLOVs();
  }, [selectedProduct, selectedProductCode, selectedCustomer]);

  const fetchOpeningStock = async () => {
    if (selectedCustomer && selectedProduct && selectedProductCode) {
      try {
        const encodedCustomer = encodeURIComponent(selectedCustomer);
        const encodedProductName = encodeURIComponent(selectedProduct);
        const encodedProductCode = encodeURIComponent(selectedProductCode);

        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Dispatch/closingstock?product=${encodedProductCode}&productName=${encodedProductName}&customer=${encodedCustomer}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const stock =
          Array.isArray(response.data) && response.data.length > 0
            ? response.data[0]
            : 0;

        setclosingStockres(stock);

        // ✅ Ensure openingStock is updated only if it's empty or null
        if (openingStock === null || openingStock.length === 0) {
          setOpeningStock(stock);
        }

        // Fetch other necessary data
        await Promise.all([
          fetchProductCode(),
          fetchProductCodes(),
          fetchCustomerName(),
        ]);
      } catch (error) {
        console.error("Error fetching opening stock:", error);
      }
    }
  };

  const handleProductCodeChange = (e) => {
    setSelectedCustomer(null);
    setSelectedProductCode(e);
  };
  const handleProductChange = (e) => {
    setSelectedCustomer(null);
    setSelectedProductCode(null);
    setSelectedProduct(e);
  };
  const loaderContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    fontSize: "14px",
    color: "#555",
  };

  const spinnerStyle = {
    width: "14px",
    height: "14px",
    border: "2px solid #ccc",
    borderTopColor: "#007bff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
    marginRight: "8px",
  };

  // Add animation to document style
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleTag);

  useEffect(() => {
    fetchProductCode();
    fetchProductCodes();
    fetchCustomerName();
  }, [closingStockres, openingStock]);

  const fetchData = async () => {
    try {
      if (!state.id) {
        console.error("Error: state.id is undefined");
        return;
      }

      const response = await fetch(
        `${API.prodUrl}/Precot/api/Dispatch/finishedgoods/${state.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      seteditResponse(data);

      // Set opening stock correctly
      const openingStockValue =
        data.dispatchSupervisorStatus === "SUPERVISOR_SAVED"
          ? data.openingStockNoOfCartons
          : await fetchOpeningStock();
      setOpeningStock(openingStockValue);

      setSelectedProductCode(data.product);
      setSelectedProduct(data.productname);
      setDate(data.date);
      setShift(data.shift);
      setSelectedCustomer(data.customer);
      setReceiptQty(data.receiptQtyNoOfCartons);
      setDispatchedQty(data.dispatchedQtyNoOfCartons);
      setDepartment(data.department);
      setIssuedQty(data.issuedQtyNoOfCartons);
      setClosingStock(data.closingStockNoOfCartons);
      setReceivedByProduction(data.receivedByProduction);
      setRemark(data.remark);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Dispatch/F-001/Summary");
  };
  const handleSave = () => {
    setSaveLoading(true);
    const remarkToSave = (remark || "").trim() === "" ? "NA" : remark;
    const monthYear = `${state.year}-${state.month}`;

    const payload = {
      id: state.id || null,
      formatName: "FINISHED GOODS STOCK REGISTER",
      formatNo: "PH-DIS01/F-001",
      revisionNo: "01",
      sopNumber: "PH-PPC01-D-01",
      unit: "Unit H",
      date: state.date,
      shift: shift,
      product: selectedProductCode,
      productname: selectedProduct,
      customer: selectedCustomer,
      openingStockNoOfCartons: openingStock,
      receiptQtyNoOfCartons: receiptQty,
      dispatchedQtyNoOfCartons: dispatchedQty,
      issuedQtyNoOfCartons: issuedQty,
      closingStockNoOfCartons: closingStock,
      department: department,
      receivedByProduction: receivedByProduction,
      remark: remarkToSave,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/Dispatch/FinishedGoodsStock/Save`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Sucessfully Saved");
        navigate("/Precot/Dispatch/F-001/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSubmit = async () => {
    if (
      !selectedProduct ||
      !selectedCustomer ||
      openingStock == null ||
      openingStock == undefined ||
      receiptQty == null ||
      receiptQty == undefined ||
      dispatchedQty == null ||
      dispatchedQty == undefined ||
      issuedQty == null ||
      issuedQty == undefined ||
      closingStock == null ||
      closingStock == undefined ||
      !receivedByProduction ||
      !department
    ) {
      message.error("Please fill all the required fields.");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      id: state.id || null,
      formatName: "FINISHED GOODS STOCK REGISTER",
      formatNo: "PH-DIS01/F-001",
      revisionNo: "01",
      sopNumber: "PH-PPC01-D-01",
      unit: "Unit H",
      product: selectedProductCode,
      productname: selectedProduct,
      date: state.date,
      shift: shift,
      customer: selectedCustomer,
      openingStockNoOfCartons: openingStock,
      receiptQtyNoOfCartons: receiptQty,
      dispatchedQtyNoOfCartons: dispatchedQty,
      issuedQtyNoOfCartons: issuedQty,
      closingStockNoOfCartons: closingStock,
      department: department,
      receivedByProduction: receivedByProduction,
      remark: remark || "NA",
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/Dispatch/FinishedGoodsStock/Submit`,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        setSubmitLoading(false);
        message.success("Sucessfully Submitted");
        navigate("/Precot/Dispatch/F-001/Summary");
      })
      .catch((err) => {
        setSubmitLoading(false);
        message.error(err.response.data.message);
      });
  };

  const items = [
    {
      key: "1",
      label: <p>Summary Details </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "70%", margin: "auto", textSizeAdjust: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <td
                style={{
                  width: "40%",
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Date
              </td>
              <td
                style={{
                  height: "30px",
                  textAlign: "center",
                  paddingLeft: "2em",
                }}
                disabled
              >
                {formatDateUser(state.date)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Shift
              </td>
              <td style={{ height: "30px", textAlign: "left" }}>
                <Select
                  onChange={(e) => setShift(e)}
                  options={shiftSelector}
                  placeholder="Shift"
                  value={shift}
                  style={{
                    width: "auto",
                    display: "flex",
                    textAlign: "center",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Opening Stock (No. of Cartons)
              </td>
              <td>
                <input
                  className="inp-new"
                  value={openingStock}
                  onChange={(e) => setOpeningStock(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[0-9]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                  // disabled={openingStock !== 0}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Receipt Qty. (No. of cartons)
              </td>
              <td>
                <input
                  className="inp-new"
                  value={receiptQty}
                  onChange={(e) => setReceiptQty(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[0-9]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Dispatched Qty. (No. of Cartons)
              </td>
              <td>
                <input
                  className="inp-new"
                  value={dispatchedQty}
                  onChange={(e) => setDispatchedQty(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[0-9]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Issued Qty. (No. of Cartons)
              </td>
              <td>
                <input
                  className="inp-new"
                  value={issuedQty}
                  onChange={(e) => setIssuedQty(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[0-9]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Closing Stock (No. of Cartons)
              </td>
              <td>
                <input
                  className="inp-new"
                  value={closingStock}
                  onChange={(e) => setClosingStock(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[0-9]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: "30px",
                  textAlign: "left",
                  paddingLeft: "2em",
                }}
              >
                Department
              </td>
              <td>
                <input
                  className="inp-new"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[a-zA-Z0-9._ ]*$/.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: "Remarks",
      children: (
        <table
          align="left"
          style={{ height: "50px", width: "50%", alignItems: "left" }}
        >
          <p>Remark:</p>
          <Input.TextArea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </table>
      ),
    },
    {
      key: "3",
      label: "Reviews",
      children: (
        <>
          <table
            align="left"
            style={{ width: "50%", borderCollapse: "collapse" }}
          >
            <tr>
              <td
                style={{
                  width: "50%",
                  padding: "2em",
                  borderRight: "1px solid",
                }}
              >
                <p>Received By (All)</p>
                <b>Sign & Date</b>
              </td>
              <td>
                <p style={{ textAlign: "center" }}></p>
                <Select
                  value={receivedByProduction}
                  style={{
                    width: "100%",
                    height: "36px",
                    borderRadius: "0px",
                    border: "1px solid #dddd",
                    backgroundColor: "white",
                  }}
                  onInputKeyDown={(e) => {
                    handleSelectText(e, "receivedByProduction");
                  }}
                  onChange={(e) => setReceivedByProduction(e)}
                  dropdownStyle={{ textAlign: "center" }}
                  onSearch={handleSearch}
                  showSearch
                  filterOption={false}
                  onKeyDown={(e) => {
                    handleSelectText(e, "receivedByProduction");
                  }}
                >
                  {filteredOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="FINISHED GOODS STOCK REGISTER"
        formatNo="PH-DIS01/F-001"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            loading={saveLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleSave}
            shape="round"
            icon={<IoSave color="#00308F" />}
          >
            &nbsp;Save
          </Button>,
          <Button
            loading={submitLoading}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            icon={<GrDocumentStore color="#00308F" />}
            onClick={handleSubmit}
            shape="round"
          >
            &nbsp;Submit
          </Button>,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Form
        layout="inline"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "20px",
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Form.Item label="Product Name">
          <Select
            id="product-select"
            value={selectedProduct}
            onChange={(value) => setSelectedProduct(value)}
            style={{ width: 400 }}
            placeholder="Please select a product"
            showSearch
            dropdownRender={(menu) => (
              <>
                {loadingProducts && (
                  <div style={loaderContainerStyle}>
                    <span style={spinnerStyle}></span> Loading...
                  </div>
                )}
                {menu}
              </>
            )}
          >
            {products.map((product) => (
              <Option key={product.id} value={product.value}>
                {product.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Product Code">
          <Select
            id="product-select"
            value={selectedProductCode}
            dropdownRender={(menu) => (
              <>
                {loadingProductCode && (
                  <div style={loaderContainerStyle}>
                    <span style={spinnerStyle}></span> Loading...
                  </div>
                )}
                {menu}
              </>
            )}
            onChange={(value) => setSelectedProductCode(value)}
            style={{ width: 250 }}
            placeholder="Please select a product"
            showSearch
            // disabled={!selectedProduct}
          >
            {productCode.map((product) => (
              <Option key={product.id} value={product.value}>
                {product.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Customer">
          <Select
            id="customer-select"
            value={selectedCustomer}
            onChange={(value) => setSelectedCustomer(value)}
            style={{ width: 250 }}
            dropdownRender={(menu) => (
              <>
                {loadingCustomers && (
                  <div style={loaderContainerStyle}>
                    <span style={spinnerStyle}></span> Loading...
                  </div>
                )}
                {menu}
              </>
            )}
            placeholder="Please select a customer"
            showSearch
            // disabled={!selectedProductCode}
          >
            {customers.map((customer) => (
              <Option key={customer.id} value={customer.value}>
                {customer.value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button
          onClick={() => {
            setSelectedCustomer("");
            setSelectedProduct("");
            setSelectedProductCode("");
            fetchProductCode();
            fetchProductCodes();
            fetchCustomerName();
            setOpeningStock([]);
            setclosingStockres([]);
            setClosingStock("");
          }}
        >
          Clear Filter
        </Button>
      </Form>
      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          dataSource={reportDetails}
          pagination={{ pageSize: 5 }}
          bordered
          //onChange={onChange}
          style={{
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
      </Row>
    </div>
  );
};

export default Dispatch_f001;
