/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BleachingEdit from "./BleachingEdit";
import { BiLock } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
const BleachingSummary = () => {
  const [cakingData, setCakingData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setnewModal] = useState(false);
  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [newStatus, setNewStatus] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Caking/Service/getListofBleachingJobCard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setnewData(response.data);
      setmodalData(response.data);
      // Assuming the response data structure matches the payload structure you provided
      setCakingData(
        response.data.map((item) => ({
          key: item.header_id, // Assuming header_id is unique
          formatName: item.formatName,
          formatNo: item.formatNo,
          revisionNo: item.revisionNo,
          formatDate: item.formatDate,
          remarks: item.remarks,
          unit: item.unit,
          shift: item.shift,
          startTime: item.start_time,
          endTime: item.end_time,
          headerID: item.header_id,
          status: item.status,
          mail_status: item.mail_status,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewDetails = (record) => {
    const x = newData.filter((x, i) => {
      return record.headerID == x.header_id;
    });
    setSelectedRow(x);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    console.log("wer", record);
    // navigate(`/edit/${record.formatNo}`);

    const x = newData.filter((x, i) => {
      return record.headerID == x.header_id;
    });
    console.log("x", x);
    console.log("dummy", x[0].status);
    setNewStatus(x[0].status);
    setmodalData(x);
    setnewModal(true);
  };

  const handleCreate = () => {
    navigate("/Precot/bleaching");
  };

  const handleBack = () => {
    navigate("/Precot/BleachingSummary");
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    {
      title: "Format Name",
      dataIndex: "formatName",
      key: "formatName",
    },
    {
      title: "Format No",
      dataIndex: "formatNo",
      key: "formatNo",
    },
    {
      title: "Revision No",
      dataIndex: "revisionNo",
      key: "revisionNo",
    },
    {
      title: "Format Date",
      dataIndex: "formatDate",
      key: "formatDate",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Mail Status",
      dataIndex: "mail_status",
      key: "mail_status",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (_, x) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(x)}
            style={{ marginRight: 8 }}
            z
          >
            Review
          </Button>
          <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(x)}>
            View
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div id="section-to-print">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">unit H</td>
              <th colSpan="7" style={{ height: "60px" }}>
                BLEACHING JOB CARD
              </th>
              <td colSpan="3">Format# PRD01-(R-03)/F-13</td>
            </tr>

            <tr>
              <td colSpan="2">BMR NO</td>
              <td colSpan="4">{modalData && modalData[0].bmr_no}</td>
              <td colSpan="3">M/c No</td>
              <td colSpan="3">{modalData && modalData[0].mc_no}</td>
            </tr>
            <tr>
              <td colSpan="2">Date</td>
              <td colSpan="4">{modalData && modalData[0].date}</td>
              <td colSpan="3">Batch No</td>
              <td colSpan="3">{modalData && modalData[0].batch_no}</td>
            </tr>
            <tr>
              <td colSpan="2">Shift</td>
              <td colSpan="4">{modalData && modalData[0].shift}</td>
              <td colSpan="3">Start Time</td>
              <td colSpan="3">{modalData && modalData[0].start_time}</td>
            </tr>
            <tr>
              <td colSpan="2">Finish</td>
              <td colSpan="4">{modalData && modalData[0].finish}</td>
              <td colSpan="3">End Time</td>
              <td colSpan="3">{modalData && modalData[0].end_time}</td>
            </tr>
            <tr>
              <td colSpan="1">S.No</td>
              <td colSpan="1">Process Name</td>
              <td colSpan="2">Chemicals Name</td>
              <td colSpan="2">Activity</td>
              <td colSpan="1">Standard Time in Minutes</td>
              <td colSpan="2">Actual Time in Minutes</td>
              <td colSpan="3">Observations</td>
            </tr>
            <tr>
              <td colSpan="1" rowspan="4">
                1
              </td>
              <td colSpan="1" rowspan="4">
                Pre - Wetting
              </td>
              <td colSpan="2" rowspan="4">
                NA
              </td>
              <td colSpan="2">Water Filling and level maintaining</td>
              <td colSpan="1">02 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].wetting[0].water_level}
              </td>
              <td colSpan="3" rowspan="4" contentEditable="False">
                Actual temperature during circulation :{" "}
                {modalData && modalData[0].wetting[0].actual_temp}℃
              </td>
            </tr>
            <tr>
              <td colSpan="2">Temperature raising to 70 ℃</td>
              <td colSpan="1">10 +/- 3</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].wetting[0].temp_raising}
              </td>
            </tr>
            <tr>
              <td colSpan="2">Circulation @ 70 +/- 5 ℃</td>
              <td colSpan="1">09 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].wetting[0].circulation}
              </td>
            </tr>
            <tr>
              <td colSpan="2">Draining</td>
              <td colSpan="1">03 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].wetting[0].draining}
              </td>
            </tr>

            {/* sorcing */}
            <tr>
              <td colSpan="1" rowspan="8">
                2
              </td>
              <td colSpan="1" rowspan="8">
                Sourcing & Bleaching
              </td>
              <td colSpan="2" rowspan="2">
                NA
              </td>
              <td colSpan="2">Water Filling and level maintaining</td>
              <td colSpan="1">02 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].scouring[0].water_level}
              </td>
              <td colSpan="3" rowspan="8" contentEditable="False">
                Actual temperature during circulation :
                {modalData && modalData[0].scouring[0].actual_temp}℃
              </td>
            </tr>

            <tr>
              <td colSpan="2">Temperature raising to 70 ℃</td>
              <td colSpan="1">08 +/-3</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].scouring[0].temp_raising_one}
              </td>
            </tr>

            <tr>
              <td colSpan="2">Caustic Soda Flakes</td>
              <td colSpan="2">Chemical transfering</td>
              <td colSpan="1">10 +/-2</td>
              <td colSpan="2" contentEditable="False">
                {" "}
                {modalData && modalData[0].scouring[0].chemical_trans_one}
              </td>
            </tr>

            <tr>
              <td colSpan="2">Haipolene & Sarofom</td>
              <td colSpan="2">Chemical transfering</td>
              <td colSpan="1">05 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].scouring[0].chemical_trans_two}
              </td>
            </tr>

            <tr>
              <td colSpan="2">Hydrogen peroxide</td>
              <td colSpan="2">Chemical transfering</td>
              <td colSpan="1">05 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].scouring[0].chemical_trans_three}
              </td>
            </tr>

            <tr>
              <td colSpan="2" rowspan="3">
                NA
              </td>
              <td colSpan="2">Temperature raising to 110 ℃</td>
              <td colSpan="1">15 +/-5</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].scouring[0].temp_raising_two}
              </td>
            </tr>

            <tr>
              <td colSpan="2">Circulation @ 110+/-5℃</td>
              <td colSpan="1">50 +/-10</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].scouring[0].circulation}
              </td>
            </tr>

            <tr>
              <td colSpan="2">Draining</td>
              <td colSpan="1">05 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].scouring[0].draining}
              </td>
            </tr>
            {/* Hot wash1 */}
            <tr>
              <td colSpan="1" rowspan="4">
                3
              </td>
              <td colSpan="1" rowspan="4">
                Hot Wash 01
              </td>
              <td colSpan="2" rowspan="4">
                NA
              </td>
              <td colSpan="2">Water Filling and level maintaining</td>
              <td colSpan="1">02 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].hotwashOne[0].water_level}
              </td>
              <td colSpan="3" rowspan="4" contentEditable="False">
                Actual temperature during circulation :_
                {modalData && modalData[0].hotwashOne[0].water_level}℃
              </td>
            </tr>

            <tr>
              <td colSpan="2">Temperature raising to 95 ℃</td>
              <td colSpan="1">10 +/-3</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].hotwashOne[0].temp_raising}
              </td>
            </tr>
            <tr>
              <td colSpan="2">Circulation @ 95+/-5℃</td>
              <td colSpan="1">09 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].hotwashOne[0].circulation}
              </td>
            </tr>

            <tr>
              <td colSpan="2">Draining</td>
              <td colSpan="1">03 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].hotwashOne[0].draining}
              </td>
            </tr>

            {/* Hot wash2 */}
            <tr>
              <td colSpan="1" rowspan="4">
                4
              </td>
              <td colSpan="1" rowspan="4">
                Hot Wash 02
              </td>
              <td colSpan="2" rowspan="4">
                NA
              </td>
              <td colSpan="2">Water Filling and level maintaining</td>
              <td colSpan="1">02 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].hotwashTwo[0].water_level}
              </td>
              <td colSpan="3" rowspan="4" contentEditable="False">
                Actual temperature during circulation :__
                {modalData && modalData[0].hotwashTwo[0].actual_temp}___℃
              </td>
            </tr>

            <tr>
              <td colSpan="2">Temperature raising to 90 ℃</td>
              <td colSpan="1">10 +/-3</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].hotwashTwo[0].temp_raising}
              </td>
            </tr>
            <tr>
              <td colSpan="2">Circulation @ 90+/-5℃</td>
              <td colSpan="1">09 +/-1</td>
              <td colSpan="2" contentEditable="False"></td>
              {modalData && modalData[0].hotwashTwo[0].circulation}
            </tr>

            <tr>
              <td colSpan="2">Draining</td>
              <td colSpan="1">03 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].hotwashTwo[0].draining}
              </td>
            </tr>

            {/* Nutralizing Wash */}

            <tr>
              <td colSpan="1" rowspan="5">
                5
              </td>
              <td colSpan="1" rowspan="5">
                Nutralizing Wash{" "}
              </td>
              <td colSpan="2">NA</td>
              <td colSpan="2">Water Filling and level maintaining</td>
              <td colSpan="1">02 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].newtralizing[0].water_level}
              </td>
              <td colSpan="3" rowspan="5" contentEditable="False">
                Actual temperature during circulation :
                {modalData && modalData[0].newtralizing[0].actual_temp}_____℃
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Citric Acid, Sarofom, Setilon KN/Persoftal 9490 (for Crispy
                finish Only)
              </td>
              <td colSpan="2">Chemical transfering</td>
              <td colSpan="1">10 +/-3</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].newtralizing[0].chemical_transf}
              </td>
            </tr>
            <tr>
              <td colSpan="2" rowspan="3">
                NA
              </td>
              <td colSpan="2">Temperature raising to 70 ℃</td>
              <td colSpan="1">7 +/-3</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].newtralizing[0].temp_raising}
              </td>
            </tr>

            <tr>
              <td colSpan="2">Circulation @ 70+/-5℃</td>
              <td colSpan="1">09 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].newtralizing[0].circulation}
              </td>
            </tr>
            <tr>
              <td colSpan="2">Draining</td>
              <td colSpan="1">03 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].newtralizing[0].draining}
              </td>
            </tr>
            {/* Final Cloud*/}

            <tr>
              <td colSpan="1" rowspan="4">
                6
              </td>
              <td colSpan="1" rowspan="4">
                Final Cloud{" "}
              </td>
              <td colSpan="2" rowspan="4">
                NA
              </td>
              <td colSpan="2">Water Filling and level maintaining</td>
              <td colSpan="1">02 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].finalprocess[0].water_level}
              </td>
              <td colSpan="3" contentEditable="False">
                pH Standard:5.5-6.5
              </td>
            </tr>

            <tr>
              <td colSpan="2">Circulation @ Normal Temperature</td>
              <td colSpan="1">10 +/-3</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].finalprocess[0].circulation_temp}
              </td>
              <td colSpan="3" contentEditable="False">
                pH actual:{modalData && modalData[0].finalprocess[0].ph_actual}
              </td>
            </tr>
            <tr>
              <td colSpan="2">Surface Activity & pH conformation</td>
              <td colSpan="1">05 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].finalprocess[0].surface}
              </td>
              <td colSpan="3" contentEditable="False">
                pH actual:{modalData && modalData[0].finalprocess[0].ph_actual}
              </td>
            </tr>
            <tr>
              <td colSpan="2">Draining</td>
              <td colSpan="1">03 +/-1</td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].finalprocess[0].draining}
              </td>
              <td colSpan="3" contentEditable="False">
                Surface Activity Standard: 6 sec
              </td>
            </tr>

            <tr>
              <td colSpan="12">Chemical Consumption details / Batch</td>
            </tr>

            <tr>
              <td colSpan="4">Chemical Name</td>
              <td colSpan="2">Standards</td>
              <td colSpan="1">Actual</td>
              <td colSpan="2">unit</td>
              <td colSpan="3" rowSpan="7">
                Remarks
              </td>
            </tr>

            <tr>
              <td colSpan="4">Caustic soda Flakes</td>
              <td colSpan="2">28-42</td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].caustic_soda_flakes}
              </td>
              <td colSpan="2">kgs</td>
            </tr>
            <tr>
              <td colSpan="4">Haipolene</td>
              <td colSpan="2">10-12</td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].haipolene}
              </td>
              <td colSpan="2">kgs</td>
            </tr>
            <tr>
              <td colSpan="4">Sarofom</td>
              <td colSpan="2">7.0-16.0</td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].sarofom}
              </td>
              <td colSpan="2">kgs</td>
            </tr>
            <tr>
              <td colSpan="4">Hydrogen peroxide</td>
              <td colSpan="2">50-70</td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].hydrogen_peroxide}
              </td>
              <td colSpan="2">liters</td>
            </tr>
            <tr>
              <td colSpan="4">Setilon KN / Persoftal 9490</td>
              <td colSpan="2">1.5-3.5</td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].setilon_kn}
              </td>
              <td colSpan="2">kgs</td>
            </tr>
            <tr>
              <td colSpan="4">Citric acid</td>
              <td colSpan="2">6.5-9.5</td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].citric_acid}
              </td>
              <td colSpan="2">kgs</td>
            </tr>

            <tr>
              <td colSpan="12">
                Special instructions: Setilon KN or Persoftal 9490 chemicals
                should be added only for Crispy finish.
              </td>
            </tr>

            <tr>
              <td colSpan="4">Shift IN-Charge</td>
              <td colSpan="2">
                Reviewed by Head of the Department/Production In-Charge
              </td>
              <td colSpan="6">QA</td>
            </tr>

            <tr>
              <td colSpan="2">Signature</td>
              <td colSpan="2">Date</td>
              <td colSpan="1">Signature</td>
              <td colSpan="1">Date</td>
              <td colSpan="3">Signature</td>
              <td colSpan="3">Date</td>
            </tr>

            <tr>
              <td
                colSpan="2"
                contentEditable="False"
                style={{ height: "60px" }}
              >
                {modalData && modalData[0].shift_sign}
              </td>
              <td colSpan="2" contentEditable="False">
                {modalData && modalData[0].shift_date}
              </td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].department_sign}
              </td>
              <td colSpan="1" contentEditable="False">
                {modalData && modalData[0].department_date}
              </td>
              <td colSpan="3" contentEditable="False">
                {modalData && modalData[0].qa_sign}
              </td>
              <td colSpan="3" contentEditable="False">
                {modalData && modalData[0].qa_date}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <BleachingHeader
        unit="Unit-H"
        formName="BLEACHING JOB CARD"
        formatNo="PRD01/F-11"
        buttonsArray={[
          <Button
            key="create"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            style={{
              marginRight: "12px",
              display:
                localStorage.getItem("role") == "OPERATOR" ? "block" : "none",
            }}
            type="primary"
          >
            Create
          </Button>,
          <Button
            key="back"
            icon={<LeftOutlined />}
            onClick={handleBack}
            style={{ backgroundColor: "blue", marginRight: "12px" }}
            type="primary"
          >
            Back
          </Button>,
          <Button
            icon={<BiLock />}
              onClick={() => {
              if (confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
            style={{ backgroundColor: "blue", marginRight: "12px" }}
            type="primary"
          >
            Logout
          </Button>,
        ]}
      />
      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={cakingData}
      />
      <Modal
        title="View Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={<Button onClick={handlePrint}>Print</Button>}
      >
        <div className="modal-content">
          <p>Unit: {selectedRow && selectedRow[0].unit}</p>
          <p>Format Name: {selectedRow && selectedRow[0].formatName}</p>
          <p>Format No: {selectedRow && selectedRow[0].formatNo}</p>
          <p>Pages: {selectedRow && selectedRow[0].pages}</p>
          <p>BMR No: {selectedRow && selectedRow[0].bmr_no}</p>
          <p>Date: {selectedRow && selectedRow[0].date}</p>
          <p>Shift: {selectedRow && selectedRow[0].shift}</p>
          <p>Finish: {selectedRow && selectedRow[0].finish}</p>
          <p>MC No: {selectedRow && selectedRow[0].mc_no}</p>
          <p>Batch No: {selectedRow && selectedRow[0].batch_no}</p>
          <p>Start Time: {selectedRow && selectedRow[0].start_time}</p>
          <p>End Time: {selectedRow && selectedRow[0].end_time}</p>
          <p>
            Caustic Soda Flakes:{" "}
            {selectedRow && selectedRow[0].caustic_soda_flakes}
          </p>
          <p>Haipolene: {selectedRow && selectedRow[0].haipolene}</p>
          <p>Sarofom: {selectedRow && selectedRow[0].sarofom}</p>
          <p>
            Hydrogen Peroxide: {selectedRow && selectedRow[0].hydrogen_peroxide}
          </p>
          <p>Setilon KN: {selectedRow && selectedRow[0].setilon_kn}</p>
          <p>Remarks: {selectedRow && selectedRow[0].remarks}</p>
          <p>Shift Sign: {selectedRow && selectedRow[0].shift_sign}</p>
          <p>Shift Date: {selectedRow && selectedRow[0].shift_date}</p>
          <p>
            Department Sign: {selectedRow && selectedRow[0].department_sign}
          </p>
          <p>
            Department Date: {selectedRow && selectedRow[0].department_date}
          </p>

          {/* Repeat similar structures for other sections */}
        </div>
      </Modal>
      <Modal
        title="Edit Form"
        visible={newModal}
        onCancel={() => setnewModal(false)}
        width="100vw"
      >
        <BleachingEdit data={modalData} status={newStatus} />
      </Modal>
    </div>
  );
};

export default BleachingSummary;
