import { Input, Table } from "antd";
import React, { useMemo, useState } from "react";

const QA_f034_major_inspection = ({
  labels,
  dataSource,
  onChange,
  disabled,
  type,
}) => {
  const defaultValuesMap = {
    f034: {
      "Cut Pads": ["", "", "", ""],
      "Improper / Open / Damaged Sealing": ["", "", "", ""],
      "Dirt / Dust Contamination": ["", "", "", ""],
      "Plastic Contamination": ["", "", "", ""],
      "Hair Contamination": ["", "", "", ""],
      "Lower/Higher Filling Height / Less Dia.": ["", "", "", ""],
      "Improper Pad Alignment": ["", "", "", ""],
    },
    f035: {
      "Improper / Open / Damaged Sealing": ["", "", "", ""],
      "Dirt / Dust Contamination": ["", "", "", ""],
      "Plastic Contamination": ["", "", "", ""],
      "Hair Contamination": ["", "", "", ""],
      "No cotton at end / Less Bonding Strength": ["", "", "", ""],
      "Shape or Compactness of balls not correct": ["", "", "", ""],
    },
    f036: {
      "Loose Cotton Tip": ["", "", "", ""], // New item
      "Irregular Tip Shape": ["", "", "", ""], // New item
      "Plastic/Wood Contamination": ["", "", "", ""], // New item
      "Hair Contamination": ["", "", "", ""], // New item
      "Weak Stick": ["", "", "", ""], // New item
      "Compactness of Buds not correct": ["", "", "", ""],
    },
  };

  const templateLabels = [
    "Not Accepted",
    "Not Accepted",
    "Not Accepted",
    "Not Accepted",
    "Not Accepted",
    "Not Accepted",
  ];

  const transformDetails = (details) => {
    const transformed =
      type === "f034"
        ? {
            "Cut Pads": [],
            "Improper / Open / Damaged Sealing": [],
            "Dirt / Dust Contamination": [],
            "Plastic Contamination": [],
            "Hair Contamination": [],
            "Lower/Higher Filling Height / Less Dia.": [],
            "Improper Pad Alignment": [],
          }
        : type === "f035"
        ? {
            "Improper / Open / Damaged Sealing": [],
            "Dirt / Dust Contamination": [],
            "Plastic Contamination": [],
            "Hair Contamination": [],
            "No cotton at end / Less Bonding Strength": [],
            "Shape or Compactness of balls not correct": [],
          }
        : type === "f036"
        ? {
            "Loose Cotton Tip": [], // New item
            "Irregular Tip Shape": [], // New item
            "Plastic/Wood Contamination": [], // New item
            "Hair Contamination": [], // New item
            "Weak Stick": [], // New item
            "Compactness of Buds not correct": [],
            // Add other keys as necessary
          }
        : {};

    if (details && details.length > 0) {
      details.forEach((item) => {
        if (type === "f034") {
          transformed["Cut Pads"].push(item.cutPads34 || "N/A");
          transformed["Improper / Open / Damaged Sealing"].push(
            item.improperOpenDamagedSealing34 || "N/A"
          );
          transformed["Dirt / Dust Contamination"].push(
            item.dirtDustContamination34 || "N/A"
          );
          transformed["Plastic Contamination"].push(
            item.plasticContamination34 || "N/A"
          );
          transformed["Hair Contamination"].push(
            item.hairContamination34 || "N/A"
          );
          transformed["Lower/Higher Filling Height / Less Dia."].push(
            item.lowerHigherFillingHeightLessData34 || "N/A"
          );
          transformed["Improper Pad Alignment"].push(
            item.improperPadAllignment34 || "N/A"
          );
        } else if (type === "f035") {
          transformed["Improper / Open / Damaged Sealing"].push(
            item.improperOpenDamagedSealing35 || "Nil"
          );
          transformed["Dirt / Dust Contamination"].push(
            item.dirtDustContaminatio35n || "Nil"
          );
          transformed["Plastic Contamination"].push(
            item.plasticContamination35 || "Nil"
          );
          transformed["Hair Contamination"].push(
            item.hairContamination35 || "Nil"
          );

          transformed["No cotton at end / Less Bonding Strength"].push(
            item.noCottonAtEndLessBondingStrength35 || "Nil"
          );
          transformed["Shape or Compactness of balls not correct"].push(
            item.shapeOrCompactnessOfBallsNotCorrect35 || "Nil"
          );
        } else if (type === "f036") {
          transformed["Loose Cotton Tip"].push(item.looseCottonTip36 || "Nil"); // New item
          transformed["Irregular Tip Shape"].push(
            item.irregularTipSharp36 || "Nil"
          ); // New item
          transformed["Plastic/Wood Contamination"].push(
            item.plasticWoodContamination36 || "Nil"
          ); // New item
          transformed["Hair Contamination"].push(
            item.hairContamination36 || "Nil"
          ); // New item (make sure this is intentional, if it's duplicate consider renaming)
          transformed["Weak Stick"].push(item.weakStick36 || "Nil"); // New item
          transformed["Compactness of Buds not correct"].push(
            item.compactnessOfBudsNotCorrect36 || "Nil"
          ); // New item
        }
      });
    }

    return transformed;
  };

  const transformed = useMemo(() => {
    return dataSource && dataSource.length > 0
      ? transformDetails(dataSource)
      : defaultValuesMap[type];
  }, [dataSource, type]);

  // Handle radio button state
  const [radioValues, setRadioValues] = useState(
    labels.reduce((acc, label) => {
      acc[label] = transformed[label]
        ? transformed[label].slice(0, 4)
        : Array(4).fill("N/A");
      return acc;
    }, {})
  );

  const [inputValues, setInputValues] = useState(
    labels.reduce((acc, label) => {
      //
      //
      //
      //
      acc[label] = transformed[label]
        ? transformed[label].slice(0, 4)
        : Array(4).fill("Nil");
      return acc;
    }, {})
  );

  // Handle radio button change
  const handleRadioChange = (label, optionIndex, value) => {
    setRadioValues((prevState) => {
      const updatedValues = { ...prevState };
      updatedValues[label][optionIndex] = value;
      onChange(label, updatedValues[label]);
      return updatedValues;
    });
  };

  const tableData = labels.map((label, index) => ({
    key: index,
    inspection: label,
    results: transformed[label], // Change from 'result' to 'results' to hold all four options
  }));

  const header = () => (
    <tr>
      <td>
        Major - (Refer Acceptance Sampling Plan -Doc. No.PH-QAD01-D-029 , AQL -
        2.5 under General Inspection Level II)
      </td>
    </tr>
  );

  const handleInputChange = (label, optionIndex, value) => {
    setInputValues((prevState) => {
      const updatedValues = { ...prevState };

      updatedValues[label][optionIndex] = value;

      onChange(label, updatedValues[label]);
      return updatedValues;
    });
  };

  const columns = [
    {
      title: "Inspection Details",
      dataIndex: "inspection",
      render: (_, __, index) => labels[index],
    },
    ...(type === "f035"
      ? [
          {
            // Additional column with value from labels array
            // title: "Hardcoded Column",
            dataIndex: "hardcoded",
            render: (_, __, index) => <div>{templateLabels[index]}</div>,
          },
        ]
      : []),
    ...Array.from({ length: 4 }, (_, i) => ({
      title: `Result - Option ${i + 1}`,
      dataIndex: `result${i + 1}`,
      render: (_, record, index) => {
        if (type === "f035" || type === "f036" || type === "f034") {
          return (
            <Input
              disabled={disabled}
              onKeyDown={(e) => {
                const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                // Check if the pressed key is not valid
                if (
                  !isAlphanumeric.test(e.key) &&
                  ![
                    "Backspace",
                    "Tab",
                    "ArrowLeft",
                    "ArrowRight",
                    "_",
                    " ",
                  ].includes(e.key)
                ) {
                  e.preventDefault(); // Prevent the default action (character input)
                }
              }}
              value={inputValues[record.inspection][i] || ""} // Default to empty string
              onChange={(e) =>
                handleInputChange(record.inspection, i, e.target.value)
              }
              style={{ width: "100%" }}
            />
          );
        }
      },
    })),
  ];

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={false}
      bordered
      rowKey="key"
      title={() => (type !== "f036" ? header() : null)}
    />
  );
};

export default QA_f034_major_inspection;
