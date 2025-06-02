import { Input, Select, Table } from "antd";
import React, { useState } from "react";

const { Option } = Select;

const QA_f034_minor_inspection = ({
  labels,
  dataSource,
  onChange,
  disabled,
  type,
}) => {
  const defaultValuesMap = {
    f034: {
      "Black Contamination": ["", "", "", ""],
      "Colour Contamination": ["", "", "", ""],
      "Edge Condition (Open/Closed/Stitched)": ["", "", "", ""],
      "Folded Pads / No. of folds for pleat": ["", "", "", ""],
      "Improper or Illegible printing of FG No.": ["", "", "", ""],
      Result: [null, null, null, null],
    },
    f035: {
      "Black Contamination": ["", "", "", ""],
      "Colour Contamination": ["", "", "", ""],
      "Less Weight/Sliver Defect(Loose Sliver/ Flat Shape/ More Hairiness)": [
        "",
        "",
        "",
        "",
      ],
      "Loose Cotton / Less Cotton / Tail Ends": ["", "", "", ""],
      "Improper or Illegible printing of FG No.": ["", "", "", ""],
      Result: [null, null, null, null],
    },
    f036: {
      "Uneven Cotton Coverage": ["", "", "", ""],
      "Colour Contamination": ["", "", "", ""],
      "Small Surface Defects": ["", "", "", ""],
      "Loose Cotton / Less Cotton": ["", "", "", ""],
      "Improper or Illegible printing of FG No.": ["", "", "", ""],
      Result: [null, null, null, null],
    },
  };

  const transformDetails = (details) => {
    const transformed =
      type === "f034"
        ? {
            "Black Contamination": [],
            "Colour Contamination": [],
            "Edge Condition (Open/Closed/Stitched)": [],
            "Folded Pads / No. of folds for pleat": [],
            "Improper or Illegible printing of FG No.": [],
            Result: [],
          }
        : type === "f035"
        ? {
            "Black Contamination": [],
            "Colour Contamination": [],
            "Less Weight/Sliver Defect(Loose Sliver/ Flat Shape/ More Hairiness)":
              [],
            "Loose Cotton / Less Cotton / Tail Ends": [],
            "Improper or Illegible printing of FG No.": [],
            Result: [],
          }
        : type === "f036"
        ? {
            "Uneven Cotton Coverage": [],
            "Colour Contamination": [],
            "Small Surface Defects": [],
            "Loose Cotton / Less Cotton": [],
            "Improper or Illegible printing of FG No.": [],
            Result: [],
          }
        : {};

    if (details && details.length > 0) {
      details.forEach((item) => {
        if (type === "f034") {
          transformed["Black Contamination"].push(
            item.blackContamintion || "N/A"
          );
          transformed["Colour Contamination"].push(
            item.coloutContamination34 || "N/A"
          );
          transformed["Edge Condition (Open/Closed/Stitched)"].push(
            item.edgeCondition34 || "N/A"
          );
          transformed["Folded Pads / No. of folds for pleat"].push(
            item.folderPads34 || "N/A"
          );
          transformed["Improper or Illegible printing of FG No."].push(
            item.improperOrIllegiblePrintingOfFgNo34 || "N/A"
          );
          transformed["Result"].push(
            item.result !== undefined ? item.result : null
          );
        } else if (type === "f035") {
          transformed["Black Contamination"].push(
            item.blackContamination35 || "Nil"
          );
          transformed["Colour Contamination"].push(
            item.colourContamination35 || "Nil"
          );

          transformed[
            "Less Weight/Sliver Defect(Loose Sliver/ Flat Shape/ More Hairiness)"
          ].push(item.lessWeightSliverDefect35 || "Nil");
          transformed["Loose Cotton / Less Cotton / Tail Ends"].push(
            item.looseCottonLessCotton35 || "Nil"
          );
          transformed["Improper or Illegible printing of FG No."].push(
            item.improperOrIllegiblePrintingFgNo35 || "Nil"
          );

          transformed["Result"].push(
            item.result !== undefined ? item.result : null
          );
        } else if (type === "f036") {
          transformed["Uneven Cotton Coverage"].push(
            item.unevenCottonCoverage36 || "Nil"
          ); // New item
          transformed["Colour Contamination"].push(
            item.colourContamination36 || "Nil"
          ); // New item
          transformed["Small Surface Defects"].push(
            item.smallSurfaceDefects36 || "Nil"
          ); // New item
          transformed["Loose Cotton / Less Cotton"].push(
            item.looseCottonLessCotton36 || "Nil"
          ); // New item
          transformed["Improper or Illegible printing of FG No."].push(
            item.improperOrIllegiblePrintingFgNo36 || "Nil"
          ); // New item
          transformed["Result"].push(
            item.result !== undefined ? item.result : null
          );
        }

        //transformed['Result'] = [item.result || null, ...transformed['Result']];
        //
      });
    }

    return transformed;
  };

  const transformed =
    dataSource && dataSource.length > 0
      ? transformDetails(dataSource)
      : defaultValuesMap[type];

  const [radioValues, setRadioValues] = useState(
    labels.reduce((acc, label) => {
      acc[label] = transformed[label]
        ? transformed[label].slice(0, 4)
        : Array(4).fill("N/A");
      return acc;
    }, {})
  );

  const [statusValues, setStatusValues] = useState(
    labels.reduce((acc, label) => {
      acc[label] = transformed[label]
        ? transformed[label].slice(0, 4)
        : Array(4).fill(null);
      return acc;
    }, {})
  );

  const [inputValues, setInputValues] = useState(
    labels.reduce((acc, label) => {
      acc[label] = transformed[label]
        ? transformed[label].slice(0, 4)
        : Array(4).fill("Nil");
      return acc;
    }, {})
  );

  const templateLabels = [
    "Not Accepted",
    "Not Accepted",
    "-",
    "Not Accepted",
    "Easily Readable",
  ];

  const handleRadioChange = (label, optionIndex, value) => {
    setRadioValues((prevState) => {
      const updatedValues = { ...prevState };
      updatedValues[label][optionIndex] = value;

      onChange(label, updatedValues[label], statusValues["Result"]);
      return updatedValues;
    });
  };

  const handleInputChange = (label, optionIndex, value) => {
    setInputValues((prevState) => {
      const updatedValues = { ...prevState };
      updatedValues[label][optionIndex] = value;

      onChange(label, updatedValues[label], statusValues["Result"]);
      return updatedValues;
    });
  };

  const handleStatusChange = (label, optionIndex, value) => {
    setStatusValues((prev) => {
      const updatedStatus = { ...prev };
      updatedStatus[label][optionIndex] = value;
      if (type === "f035" || type === "f036") {
        onChange(label, inputValues, updatedStatus[label]);
      } else if (type === "f034") {
        onChange(label, radioValues, updatedStatus[label]);
      }

      return updatedStatus;
    });
  };

  const tableData = labels.map((label, index) => ({
    key: index,
    inspection: label,
    result: transformed[label],
  }));

  const header = () => (
    <tr>
      3. Minor - (Refer Acceptance Sampling Plan - Doc. No. PH-QAD01-D-029, AQL
      - 4.0 under General Inspection Level II)
    </tr>
  );

  const columns = [
    {
      title: "Inspection Details",
      dataIndex: "inspection",
      render: (_, __, index) => {
        return <div>{labels[index]}</div>; // Display the label for each row
      },
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
        if (type === "f035" || type === "f036" || type == "f034") {
          // For type f035, the first four rows are input fields
          if (index < labels.length - 1) {
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
          } else {
            // Render LOV for the last option in f035
            return (
              <Select
                disabled={disabled}
                value={statusValues[record.inspection][i] || undefined} // Set to undefined for no selection
                onChange={(value) =>
                  handleStatusChange(record.inspection, i, value)
                } // Update status for Option i
                style={{ width: "100%" }}
              >
                <Option value="Accepted">Accepted</Option>
                <Option value="Rejected">Rejected</Option>
                {/* Add more LOV options as necessary */}
              </Select>
            );
          }
        }
      },
    })),
  ];

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        bordered
        pagination={false}
        title={() => (type !== "f036" ? header() : null)}
        rowClassName="my-row-class"
      />
    </div>
  );
};

export default QA_f034_minor_inspection;
