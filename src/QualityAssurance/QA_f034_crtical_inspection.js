import { Table, Radio, Select } from "antd";
import React, { useState } from "react";

const QA_f034_crtical_inspection = ({
  labels,
  dataSource,
  onChange,
  disabled,
  type,
}) => {
  
  const defaultValuesMap = {
    f034: {
      "Wrong / Missing FG No.": ["", "", "", ""],
      "Insect Contamination": ["", "", "", ""],
      "Metal Contamination": ["", "", "", ""],
      "Less Count / Weight per bag": ["", "", "", ""],
    },
    f035: {
      "Wrong / Missing FG No.": ["", "", "", ""],
      "Insect Contamination": ["", "", "", ""],
      "Metal Contamination": ["", "", "", ""],
      "Less Count": ["", "", "", ""],
      "Major Discolouration / Breakage at serration": ["", "", "", ""],
    },
    f036: {
      "Sharp or Broken Sticks": ["", "", "", ""],
      "Contamination (Insect/ Metal)": ["", "", "", ""],
      Adhesives: ["", "", "", ""],
      "Less Count": ["", "", "", ""],
      "Wrong / Missing FG No.": ["", "", "", ""],
    },
  };

  const transformDetails = (details) => {
    //  const transformed = { ...defaultValuesMap[type] };
    const transformed =
      type === "f034"
        ? {
            "Wrong / Missing FG No.": [],
            "Insect Contamination": [],
            "Metal Contamination": [],
            "Less Count / Weight per bag": [],
          }
        : type === "f035"
        ? {
            "Wrong / Missing FG No.": [],
            "Insect Contamination": [],
            "Metal Contamination": [],
            "Less Count": [],
            "Major Discolouration / Breakage at serration": [],
          }
        : type === "f036"
        ? {
            "Sharp or Broken Sticks": [],
            "Contamination (Insect/ Metal)": [],
            Adhesives: [],
            "Less Count": [],
            "Wrong / Missing FG No.": [],
          }
        : {}; //

    if (details && details.length > 0) {
      
      details.forEach((item) => {
        if (type === "f034") {
          transformed["Wrong / Missing FG No."].push(
            item.wrongBoxFixed34 || "N/A"
          );
          transformed["Insect Contamination"].push(
            item.insectContamination34 || "N/A"
          );
          transformed["Metal Contamination"].push(
            item.metalContamination34 || "N/A"
          );
          transformed["Less Count / Weight per bag"].push(
            item.lessCountWeightPerBag34 || "N/A"
          );
        } else if (type === "f035") {
          
          transformed["Wrong / Missing FG No."].push(
            item.wrongBoxFixed35 || "N/A"
          );
          transformed["Insect Contamination"].push(
            item.insectContamination35 || "N/A"
          );
          transformed["Metal Contamination"].push(
            item.metalContamination35 || "N/A"
          );
          transformed["Less Count"].push(item.lessCount35 || "N/A");
          transformed["Major Discolouration / Breakage at serration"].push(
            item.majorDiscolourationBreakage35 || "N/A"
          );
        } else if (type === "f036") {
          transformed["Sharp or Broken Sticks"].push(
            item.sharpOrBrokenSticks36 || "N/A"
          );
          transformed["Contamination (Insect/ Metal)"].push(
            item.insectMetalContaminations36 || "N/A"
          );
          transformed["Adhesives"].push(item.adhesives36 || "N/A");
          transformed["Less Count"].push(item.lessCount36 || "N/A");
          transformed["Wrong / Missing FG No."].push(
            item.wrongMissingFgNo36 || "N/A"
          );
        }
      });
    }

    return transformed;
  };

  const transformed =
    dataSource && dataSource.length > 0
      ? transformDetails(dataSource)
      : defaultValuesMap[type];
  

  const templateLabels = [
    "Not Accepted",
    "Not Accepted",
    "Not Accepted",
    "",
    "Not Accepted",
  ];

  // Handle radio button state
  const [radioValues, setRadioValues] = useState(
    labels.reduce((acc, label) => {
      // Fill radioValues based on transformed data or default to 'N/A'
      acc[label] = transformed[label]
        ? transformed[label].slice(0, 4)
        : Array(4).fill("N/A");
      return acc;
    }, {})
  );

  // Handle radio button state
  const [selectValues, setSelectValues] = useState(
    labels.reduce((acc, label) => {
      // Fill radioValues based on transformed data or default to 'N/A'
      acc[label] = transformed[label]
        ? transformed[label].slice(0, 4)
        : Array(4).fill("N/A");
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

  const handleSelectChange = (label, optionIndex, value) => {
    setSelectValues((prevState) => {
      const updatedValues = { ...prevState };
      updatedValues[label][optionIndex] = value;
      onChange(label, updatedValues[label]);
      return updatedValues;
    });
  };

  const tableData = labels.map((label, index) => ({
    key: index,
    inspection: label,
    result: transformed[label] ? transformed[label] : null, // If dataSource is empty, use default values
  }));

  

  const header = () => (
    <tr>
      1. Critical - (No AQL for critical defects. Zero defects are allowed)
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
    {
      // First result option
      dataIndex: "result",
      render: (_, record, index) => (
        <Radio.Group
          disabled={disabled}
          value={radioValues[record.inspection][0]} // Access the first option
          onChange={(e) =>
            handleRadioChange(record.inspection, 0, e.target.value)
          }
        >
          <Radio value="OK">OK</Radio>
          <Radio value="NOT OK">NOT OK</Radio>
          <Radio value="N/A">N/A</Radio>
        </Radio.Group>
      ),
    },
    {
      // Second result option for column 2
      dataIndex: "result",
      render: (_, record, index) => {
        // Check if the type is 'f36'
        if (type === "f036") {
          return (
            <Select
              value={selectValues[record.inspection][1]} // Access the second option (column 2)
              disabled={disabled}
              onChange={(value) =>
                handleSelectChange(record.inspection, 1, value)
              }
              style={{ width: 120 }} // Set width of the dropdown
            >
              <Select.Option value="Sharp">Sharp</Select.Option>
              <Select.Option value="Broken">Broken</Select.Option>
              <Select.Option value="Sticks">Sticks</Select.Option>
            </Select>
          );
        }
        // Default render for other types with Radio buttons
        return (
          <Radio.Group
            disabled={disabled}
            value={radioValues[record.inspection][1]} // Handle other columns by index
            onChange={(e) =>
              handleRadioChange(record.inspection, 1, e.target.value)
            }
          >
            <Radio value="OK">OK</Radio>
            <Radio value="NOT OK">NOT OK</Radio>
            <Radio value="N/A">N/A</Radio>
          </Radio.Group>
        );
      },
    },
    {
      // Third result option
      dataIndex: "result",
      render: (_, record, index) => (
        <Radio.Group
          disabled={disabled}
          value={radioValues[record.inspection][2]} // Access the third option
          onChange={(e) =>
            handleRadioChange(record.inspection, 2, e.target.value)
          }
        >
          <Radio value="OK">OK</Radio>
          <Radio value="NOT OK">NOT OK</Radio>
          <Radio value="N/A">N/A</Radio>
        </Radio.Group>
      ),
    },
    {
      // Second result option for column 2
      dataIndex: "result",
      render: (_, record, index) => {
        // Check if the type is 'f36'
        if (type === "f036") {
          return (
            <Select
              disabled={disabled}
              value={selectValues[record.inspection][3]} // Access the second option (column 2)
              onChange={(value) =>
                handleSelectChange(record.inspection, 3, value)
              }
              style={{ width: 120 }} // Set width of the dropdown
            >
              <Select.Option value="Sharp">Sharp</Select.Option>
              <Select.Option value="Broken">Broken</Select.Option>
              <Select.Option value="Sticks">Sticks</Select.Option>
            </Select>
          );
        }
        // Default render for other types with Radio buttons
        return (
          <Radio.Group
            disabled={disabled}
            value={radioValues[record.inspection][3]} // Handle other columns by index
            onChange={(e) =>
              handleRadioChange(record.inspection, 3, e.target.value)
            }
          >
            <Radio value="OK">OK</Radio>
            <Radio value="NOT OK">NOT OK</Radio>
            <Radio value="N/A">N/A</Radio>
          </Radio.Group>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={tableData} // Use the dataSource passed from the parent
      columns={columns}
      pagination={false}
      bordered
      rowKey="key"
      components={{
        header: {
          cell: (props) => {
            const { children, ...restProps } = props;
            return <th {...restProps}>{children}</th>;
          },
        },
      }}
      title={() => (type !== "f036" ? header() : null)}
    />
  );
};

export default QA_f034_crtical_inspection;
