import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl.json";
import { Empty } from "antd";

const Packing_Material_Issue = (props) => {
  const [state, setState] = useState([]);
  const [hadData, setHadData] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${ API.prodUrl}/Precot/api/spunlace/summary/03.GetPackingMeterialIssue?order_no=${props.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        if (res.data.length > 0) {
          setHadData(true);
          console.log("ddd", res.data[0].detailsRecords03);
          setState(res.data[0].detailsRecords03);
        } else {
          setHadData(false);
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, [props.batchNo]);

  return (
    <div>
      {hadData ? (
        <>
          <table
            style={{
              width: "100%",
            }}
          >
            <thead>
              <th>S.No</th>
              <th>Particulars</th>
              <th>Batch No</th>
              <th>Qunatity</th>
              <th>Remarks</th>
              <th>Unit</th>
            </thead>
            <tbody>
              {state &&
                state.map((x, i) => {
                  return (
                    <tr key={i}>
                      <td align="center">{i + 1}</td>
                      <td align="center">{x.particulars}</td>
                      <td align="center">{x.batch_no}</td>
                      <td align="center">{x.quantity}</td>
                      <td align="center">{x.remarks.length > 0 ? x.remarks : "NA"}</td>
                      <td align="center">{x.unit}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Packing_Material_Issue;
