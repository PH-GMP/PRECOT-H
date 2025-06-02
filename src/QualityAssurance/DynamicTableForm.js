import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";

const DynamicTableForm = ({ labels, dataSource, onChange, disabled, type }) => {
  // Initialize input values state
  const [inputValues, setInputValues] = useState({});

  const defaultSampleSizes = {
    f034: {
      "Surface Pattern": "5 bags",
      "Average GSM / Weight": "10 bags",
      "Product Size /  / Dia. of Rolls": "5 bags",
      "No. of Folds(Pleat)": "5 bags",
      "Artwork printing on bags / Label": "5 bags",
      "No. of Bags per carton": "5 cartons",
      "Filled Box Gross weight": "5 cartons",
      "Moisture %": "5 bags",
    },
    f035: {
      "Bag Weight": "05 bags",
      "Average Weight of Balls": "05 balls",
      "No. of Balls Per Pack": "05 bags",
      "Balls Dia": "05 balls",
      "Artwork printing on bags / Label": "05 bags",
      "No. of Pack per carton": "05 cartons",
    },
    f036: {
      "Bag / Box weight": "05 Buds",
      "Average Weight of Buds": "10 Buds",
      "No. of Buds per pack": "05 Buds",
      "Buds size / Diameter": "05 Buds",
      "Artwork printing on bags / Label": "05 Buds",
      "No. of Pack per carton": "05 cartons",
    },
  };

  const specificationMapping = {
    f034: {
      "Surface Pattern": "surfacePatternSpecification",
      "Average GSM / Weight": "averageGsmWeightSpecification",
      "Product Size /  / Dia. of Rolls": "productSizeDiaOfRollsSpecification",
      "No. of Folds(Pleat)": "noOfFoldsPleatSpecification",
      "Artwork printing on bags / Label":
        "artworkPrintingOnBagsLablesSpecification",
      "No. of Bags per carton": "noofBagsPerCartonSpecification",
      "Filled Box Gross weight": "5 cartons",
      "Moisture %": "moistureSpecification",
    },
    f035: {
      "Bag Weight": "bagWeightSpecification",
      "Average Weight of Balls": "averageWeightOfBallsSpecification",
      "No. of Balls Per Pack": "noOfBallsPerPackSpecification",
      "Balls Dia": "ballsDiaSpecification",
      "Artwork printing on bags / Label":
        "artworkPrintingOnBagsLabelsSpecification",
      "No. of Pack per carton": "noOfPackPerCotton35Specification",
    },
    f036: {
      "Bag / Box weight": "bagBoxWeightSpecification",
      "Average Weight of Buds": "averageWeightOfBudsSpecification",
      "No. of Buds per pack": "noOfBudsPerPackSpecification",
      "Buds size / Diameter": "budssizedDiameterSpecification",
      "Artwork printing on bags / Label":
        "artworkPrintingOnBudsLabelsSpecification",
      "No. of Pack per carton": "noOfPackPerCotton36Specification",
    },
  };

  const observationMapping = {
    f034: {
      "Surface Pattern": "surfacePatternObservation",
      "Average GSM / Weight": "averageGsmWeightObservation",
      "Product Size /  / Dia. of Rolls": "productSizeDiaOfRollsObservation",
      "No. of Folds(Pleat)": "noOfFoldsPleatObservation",
      "Artwork printing on bags / Label":
        "artworkPrintingOnBagsLablesObservation",
      "No. of Bags per carton": "noofBagsPerCartonObservation",
      "Filled Box Gross weight": "5 cartons",
      "Moisture %": "moistureObservation",
    },
    f035: {
      "Bag Weight": "bagWeightObservation",
      "Average Weight of Balls": "averageWeightOfBallsObservation",
      "No. of Balls Per Pack": "noOfBallsPerPackObservation",
      "Balls Dia": "ballsDiaObservation",
      "Artwork printing on bags / Label":
        "artworkPrintingOnBagsLabelsObservation",
      "No. of Pack per carton": "noOfPackPerCotton35Observation",
    },
    f036: {
      "Bag / Box weight": "bagBoxWeightObservation",
      "Average Weight of Buds": "averageWeightOfBudsObservation",
      "No. of Buds per pack": "noOfBudsPerPackObservation",
      "Buds size / Diameter": "budssizedDiameterObservation",
      "Artwork printing on bags / Label":
        "artworkPrintingOnBudsLabelsObservation",
      "No. of Pack per carton": "noOfPackPerCotton36Observation",
    },
  };

  // Initialize input values based on labels and data source
  useEffect(() => {
    if (Array.isArray(labels)) {
      const initialValues = labels.reduce((acc, label) => {
        const labelData = dataSource[label];

        acc[label] = {
          specification:
            labelData?.specification || (label === "Moisture %" ? "≤7" : ""),
          //  observation: dataSource[label].observation || (label === 'Moisture %' ? '<7' : ''),
          observation: labelData?.observation,
        };
        return acc;
      }, {});

      setInputValues(initialValues);
    }
  }, [labels, dataSource, type]);

  // Handle input change for both specification and observation
  const handleInputChange = (label, field, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [label]: {
        ...prevValues[label],
        [field]: value,
      },
    }));

    // Trigger the parent `onChange` callback with updated values
    if (onChange) {
      onChange({
        ...inputValues,
        [label]: {
          ...inputValues[label],
          [field]: value,
        },
      });
    }
  };

  // Generate table data dynamically based on `type`
  const tableData = labels.map((label, index) => ({
    key: index,
    parameter: label,
    specification:
      dataSource[specificationMapping[type]?.[label]] ||
      inputValues[label]?.specification ||
      "",
    sampleSize: defaultSampleSizes[type]?.[label] || "",
    observation:
      dataSource[observationMapping[type]?.[label]] ||
      inputValues[label]?.observation ||
      "",
  }));

  // Define table columns
  const columns = [
    {
      title: "Parameters",
      dataIndex: "parameter",
      key: "parameter",
    },
    {
      title: "Specification",
      dataIndex: "specification",
      key: "specification",
      render: (_, record) => (
        <Input
          value={inputValues[record.parameter]?.specification || ""}
          onChange={(e) =>
            handleInputChange(record.parameter, "specification", e.target.value)
          }
          placeholder="Enter specification"
          disabled={record.parameter === "Moisture %" || disabled}
        />
      ),
    },
    {
      title: "Sample Size",
      dataIndex: "sampleSize",
      key: "sampleSize",
    },

    {
      title: "Actual finding / Observation",
      dataIndex: "observation",
      key: "observation",
      render: (_, record) => (
        <div>
          <Input
            value={inputValues[record.parameter]?.observation || ""}
            onChange={(e) =>
              handleInputChange(record.parameter, "observation", e.target.value)
            }
            placeholder="Enter observation"
            disabled={disabled}
          />
          {record.parameter === "Moisture %" &&
            inputValues[record.parameter]?.observation > 7 && (
              <div style={{ color: "red", marginTop: "4px" }}>
                * Moisture % should be less than or Equal to 7
              </div>
            )}
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={false}
      bordered
      rowKey="key"
    />
  );
};

export default DynamicTableForm;
