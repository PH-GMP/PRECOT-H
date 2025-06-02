import React from "react";

const Reference_Documents = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <b>REFERENCE DOCUMENTS</b>
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <tr>
          <th colSpan="1">SI. No.</th>
          <th colSpan="1">Title </th>
          <th colSpan="1">Document </th>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
            1
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
            Good Documentation Practices{" "}
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          PH-QAD01-D-10
          </td>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
            2
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          Cleaning Machine & Sanitization 
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          PH-PRD03-D-04
          </td>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
            3
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          Pad Punching Operation
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          PH-PRD03-D-03
          </td>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
            4
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          Deviations Management
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          PH-QAD01-D-41 
          </td>
        </tr>
        <tr>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
            5
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          Change Control
          </td>
          <td colSpan="1" style={{ textAlign: "center", padding: "0.5em" }}>
          PH-QAD01-D-37
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Reference_Documents;
