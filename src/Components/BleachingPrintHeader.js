import logo from "../Assests/logo.png";
const BleachingPrintHeader = ({
  formName,
  formatNo,
  revisionNo,
  refSopNo,
  pageNo,
}) => {
  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "97%" }}>
        <tr>
          <td rowSpan={4}>
            <div style={{ textAlign: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "80px", height: "auto", textAlign: "center" }}
              />
              <br></br>
              <br></br>

              <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
            </div>
          </td>

          <td
            style={{
              padding: "0.5em",
              textAlign: "center",
              fontWeight: "bold",
              width: "60%",
            }}
            rowSpan={4}
          >
            {formName}
          </td>
          <td style={{ padding: "0.5em" }}>Format No .:</td>
          <td style={{ padding: "0.5em" }}>{formatNo}</td>
        </tr>
        <tr>
          <td style={{ padding: "0.5em" }}>Revision No .:</td>
          <td style={{ padding: "0.5em" }}>{revisionNo}</td>
        </tr>
        <tr>
          <td style={{ padding: "0.5em" }}>Ref Sop.No .:</td>
          <td style={{ padding: "0.5em" }}>{refSopNo}</td>
        </tr>
        <tr>
          <td style={{ padding: "0.5em" }}>Page No .:</td>
          <td style={{ padding: "0.5em" }}>{pageNo}</td>
        </tr>
      </table>
    </div>
  );
};

export default BleachingPrintHeader;
