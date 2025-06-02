
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import BleachingHeader from '../Components/BleachingHeader';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Tabs, Button, Col, Input, Row,Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { Select, } from 'antd';
import API from "../baseUrl.json";


function Bleaching_f05_edit(props) {

  // const { Option } = Select;





  // const[formatName,setFormatName] = useState("");
  // const[FormatNumber,setFormatNumber]= useState("");
  // const[RevisionNO,setRevisionNO]=useState("");
  // const[ SOPNo,setSOPNo]=useState("");

  const [Date, setDate] = useState("");
  const [PHNo, setPHNo] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Supplier, setSupplier] = useState("");
  const [Hair_Cont, setHair_Cont] = useState("");
  const [Hair_Sam, setHair_Sam] = useState("");
  const [Jute_Cont, setJute_Cont] = useState("");
  const [Jute_Sam, setJute_Sam] = useState("");
  const [Thread_Cont, setThread_Cont] = useState("");
  const [Thread_Sam, setThread_Sam] = useState("");
  const [Wrapper_Cont, setWrapper_Cont] = useState("");
  const [Wrapper_Sam, setWrapper_Sam] = useState("");
  const [Metal_Cont, setMetal_Cont] = useState("");
  const [Metal_Sam, setMetal_Sam] = useState("");
  const [Rust_Cont, setRust_Cont] = useState("");
  const [Rust_Sam, setRust_Sam] = useState("");
  const [Plastic_Cont, setPlastic_Cont] = useState("");
  const [Plastic_Sam, setPlastic_Sam] = useState("");
  const [BlackCot_Cont, setBlackCot_Cont] = useState("");
  const [BlackCot_Sam, setBlackCot_Sam] = useState("");
  const [OilCot_Cont, setOilCot_Cont] = useState("");
  const [OilCot_Sam, setOilCot_Sam] = useState("");
  const [YellowCot_Cont, setYellowCot_Cont] = useState("");
  const [YellowCot_Sam, setYellowCot_Sam] = useState("");
  const [Soil_Cont, setSoil_Cont] = useState("");
  const [Soil_Sam, setSoil_Sam] = useState("");
  const [Paper_Cont, setPaper_Cont] = useState("");
  const [Paper_Sam, setPaper_Sam] = useState("");
  const [Stick_Cont, setStick_Cont] = useState("");
  const [Stick_Sam, setStick_Sam] = useState("");
  const [Feather_Cont, setFeather_Cont] = useState("");
  const [Feather_Sam, setFeather_Sam] = useState("");
  const [Cloth_Cont, setCloth_Cont] = useState("");
  const [Cloth_Sam, setCloth_Sam] = useState("");
  const [WhitePoly_Cont, setWhitePoly_Cont] = useState("");
  const [WhitePoly_Sam, setWhitePoly_Sam] = useState("");
  const [ColorPoly_Cont, setColorPoly_Cont] = useState("");
  const [ColorPoly_Sam, setColorPoly_Sam] = useState("");
  const [Rubber_Cont, setRubber_Cont] = useState("");
  const [Rubber_Sam, setRubber_Sam] = useState("");
  const [Total_Cont, setTotal_Cont] = useState("");
  const [Total_Sam, setTotal_Sam] = useState("");
  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [Status, setStatus] = useState("");
  const [mailStatus, setmailStatus] = useState("");
  const [phLovPayload, setPhLovPayload] = useState()
  const [phLovPayloadFiltered, setPhLovPayloadFiltered] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);


  // const handlePHNoChange = (e) => {
  //   const selectedPHNo = e.target.value;
  //   setPHNo(selectedPHNo);
  //   setSupplier(phnoToSupplierMap[selectedPHNo] || '');
  // };

  // const { Option } = Select;
  const navigate = useNavigate();

  const onChange = (key) => {
    console.log(key);
  };


  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await sendContaminationCheck2();
      alert("Contamination Check Report Saved successfully!");
    } catch (error) {
      console.error("Error submitting Contamination Check:", error);
    }


  };

  const sendContaminationCheck2 = async () => {
    try {
      // Format the payload according to the API documentation
      const payload = {

        unit: "Unit-H",
        id: props.data[0].id,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: sopNo,
        date: Date,
        phNo: PHNo,
        quantity: Quantity,
        supplierName: Supplier,
        noOfHair: Hair_Cont,
        refHair: Hair_Sam,
        noOfJute: Jute_Cont,
        refJute: Jute_Sam,
        noOfColourThread: Thread_Cont,
        refColourThread: Thread_Sam,
        noOfWrapper: Wrapper_Cont,
        refWrapper: Wrapper_Sam,
        noOfMetal: Metal_Cont,
        refMetal: Metal_Sam,
        noOfRust: Rust_Cont,
        refRust: Rust_Sam,
        noOfPlastic: Plastic_Cont,
        refPlastic: Plastic_Sam,
        noOfBlackCotton: BlackCot_Cont,
        refBlackCotton: BlackCot_Sam,
        noOfOilCotton: OilCot_Cont,
        refOilCotton: OilCot_Sam,
        noOfSoil: Soil_Cont,
        refOfSoil: Soil_Sam,
        noOfYellowcotton: YellowCot_Cont,
        refYellowcotton: YellowCot_Sam,
        noOfPaper: Paper_Cont,
        refPaper: Paper_Sam,
        noOfStick: Stick_Cont,
        refStick: Stick_Sam,
        noOfFeather: Feather_Cont,
        refFeather: Feather_Sam,
        noOfCloth: Cloth_Cont,
        refCloth: Cloth_Sam,
        noOfwhitePolyPropylene: WhitePoly_Cont,
        refWhitePolyPropylene: WhitePoly_Sam,
        noOfColourPolyPropylene: ColorPoly_Cont,
        refColourPolyPropylene: ColorPoly_Sam,
        noOfRubberPiece: Rubber_Cont,
        refRubberPiece: Rubber_Sam,
        supervisorSign: SupervisorSign,
        hodOrDesigneeSign: HodSign,
        status: Status,
        mailStatus: mailStatus,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/SaveBleachContRawCotton`,
        payload,
        { headers }
      );

      console.log("API Response:", response.data);
      setSaveLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setSaveLoading(false);
      throw new Error("Failed to send bleaching job card");

    }
  };


  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      await sendContaminationCheck();
      alert("Contamination Check Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting Contamination Check:", error);
    }
  };


  const sendContaminationCheck = async () => {
    try {
      // Format the payload according to the API documentation
      const payload = {
        unit: "Unit-H",
        id: props.data[0].id,
        formatName: formatName,
        formatId: formatNo,
        date: Date,
        phNo: PHNo,
        quantity: Quantity,
        supplierName: Supplier,
        noOfHair: Hair_Cont,
        refHair: Hair_Sam,
        noOfJute: Jute_Cont,
        refJute: Jute_Sam,
        noOfColourThread: Thread_Cont,
        refColourThread: Thread_Sam,
        noOfWrapper: Wrapper_Cont,
        refWrapper: Wrapper_Sam,
        noOfMetal: Metal_Cont,
        refMetal: Metal_Sam,
        noOfRust: Rust_Cont,
        refRust: Rust_Sam,
        noOfPlastic: Plastic_Cont,
        refPlastic: Plastic_Sam,
        noOfBlackCotton: BlackCot_Cont,
        refBlackCotton: BlackCot_Sam,
        noOfOilCotton: OilCot_Cont,
        refOilCotton: OilCot_Sam,
        noOfSoil: Soil_Cont,
        refOfSoil: Soil_Sam,
        noOfYellowcotton: YellowCot_Cont,
        refYellowcotton: YellowCot_Sam,
        noOfPaper: Paper_Cont,
        refPaper: Paper_Sam,
        noOfStick: Stick_Cont,
        refStick: Stick_Sam,
        noOfFeather: Feather_Cont,
        refFeather: Feather_Sam,
        noOfCloth: Cloth_Cont,
        refCloth: Cloth_Sam,
        noOfwhitePolyPropylene: WhitePoly_Cont,
        refWhitePolyPropylene: WhitePoly_Sam,
        noOfColourPolyPropylene: ColorPoly_Cont,
        refColourPolyPropylene: ColorPoly_Sam,
        noOfRubberPiece: Rubber_Cont,
        refRubberPiece: Rubber_Sam,
        supervisorSign: SupervisorSign,
        hodOrDesigneeSign: HodSign,
        status: Status,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/SubmitBleachContRawCotton`,
        payload,
        { headers }
      );

      console.log("API Response:", response.data);
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setSubmitLoading(false);
      throw new Error("Failed to send bleaching job card");
    }
  };


  useEffect(() => {
    const fetchPhLovPayload = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ API.prodUrl}/Precot/api/LOV/Service/PhBasedSupplierLOV`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = response.data.map(item => ({
          id: item.id,
          value: item.value,
          label: item.label,
          description: item.description,
        }));
        setPhLovPayload(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhLovPayload();
  }, []);




  const phOnChange = (barkavi) => {
    //  setSupplier(barkavi)
    console.log("hh", phLovPayload.filter((x, i) => {
      return barkavi == x.value
    }))

    const a = phLovPayload.filter((x, i) => {
      return barkavi == x.value
    })

    setSupplier(a[0].description)
  }

  useEffect(() => {
    console.log("Props Data :", props.data);

    if (props.data && props.data.length > 0) {
      setDate(props.data[0].date);
      setQuantity(props.data[0].quantity);
      setPHNo(props.data[0].phNo);
      setSupplier(props.data[0].supplierName);
      setHair_Cont(props.data[0].noOfHair);
      setHair_Sam(props.data[0].refHair);
      setJute_Cont(props.data[0].noOfJute);
      setJute_Sam(props.data[0].refJute);
      setThread_Cont(props.data[0].noOfColourThread);
      setThread_Sam(props.data[0].refColourThread);
      setWrapper_Cont(props.data[0].noOfWrapper);
      setWrapper_Sam(props.data[0].refWrapper);
      setMetal_Cont(props.data[0].noOfMetal);
      setMetal_Sam(props.data[0].refMetal);
      setRust_Cont(props.data[0].noOfRust);
      setRust_Sam(props.data[0].refRust);
      setPlastic_Cont(props.data[0].noOfPlastic);
      setPlastic_Sam(props.data[0].refPlastic);
      setBlackCot_Cont(props.data[0].noOfBlackCotton);
      setBlackCot_Sam(props.data[0].refBlackCotton);
      setOilCot_Cont(props.data[0].noOfOilCotton);
      setOilCot_Sam(props.data[0].refOilCotton);
      setYellowCot_Cont(props.data[0].noOfYellowcotton);
      setYellowCot_Sam(props.data[0].refYellowcotton);
      setSoil_Cont(props.data[0].noOfSoil);
      setSoil_Sam(props.data[0].refSoil);
      setPaper_Cont(props.data[0].noOfPaper);
      setPaper_Sam(props.data[0].refPaper);
      setStick_Cont(props.data[0].noOfStick);
      setStick_Sam(props.data[0].refStick);
      setFeather_Cont(props.data[0].noOfFeather);
      setFeather_Sam(props.data[0].refFeather);
      setCloth_Cont(props.data[0].noOfCloth);
      setCloth_Sam(props.data[0].refCloth);
      setWhitePoly_Cont(props.data[0].noOfwhitePolyPropylene);
      setWhitePoly_Sam(props.data[0].refWhitePolyPropylene);
      setColorPoly_Cont(props.data[0].noOfColourPolyPropylene);
      setColorPoly_Sam(props.data[0].refColourPolyPropylene);
      setRubber_Cont(props.data[0].noOfRubberPiece);
      setRubber_Sam(props.data[0].refRubberPiece);
      setTotal_Cont(props.data[0].total);
      setTotal_Sam(props.data[0].total);
      setHodSign(props.data[0].hodOrDesigneeSign);
      setSupervisorSign(props.data[0].supervisorSign);
    }
  }, [props.data]);


  const handleBack = () => {
    navigate(-1);
  };



  const items = [
    {
      key: "1",
      label: <p>Activity Form - 1</p>,
      children: (
        <div>
          <table>
            <tbody>
              {/* <tr>
                    <td colSpan="3" rowSpan="4">UNIT H</td>
                    <td colSpan="6" rowSpan="4" style={{ textAlign: 'center' }}>CONTAMINATION CHECKING REPORT<br />
                      (Raw Cotton)
                    </td>
                    <td colSpan="3"
                    >Format No:</td>
                    <td colSpan="3">PRD01/F-05</td>
                  </tr>
                  <tr>
                    <td colSpan="3">Revision No:</td>
                    <td colSpan="3">02</td>
                  </tr>
                    <td colSpan="3">Ref SOP No:</td>
                    <td colSpan="3">PRD01-D-09</td>
                  <tr>
                  <td colSpan="3">Page NO:</td>
                    <td colSpan="3">1 of 1</td>
                  </tr>
                  <tr>
                    
                  </tr>
                  <tr>
                  <td colSpan="7">Date:</td>
                    <td colSpan="8">PH NO:</td>
                  </tr>
                  <tr>
                  <td colSpan="7">Quantity in Kg:</td>
                <td colSpan="8">Supplier Name:</td>
                
                  </tr> */}
              <tr >
                <td colSpan="1" style={{ Width: '99px', height: '35px' }}>S.No.</td>
                <td colSpan="4">Types of Contamination</td>
                <td colSpan="5" >No of Contamination</td>
                <td colSpan="5">Ref Sample</td>
              </tr>
              <tr>
                <td colSpan="1" >1</td>
                <td colSpan="4" >Hair</td>
                <td colSpan="5" ><input
                  className="inp-new"
                  value={Hair_Cont}
                  onChange={(e) => setHair_Cont(e.target.value)}

                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                />

                </td>
                <td colSpan="5">
                  <input
                    className="inp-new"
                    value={Hair_Sam}
                    onChange={(e) => setHair_Sam(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: '32px',
                      width: '100%',
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="1">2</td>
                <td colSpan="4">Jute</td>
                <td colSpan="5">
                  <input
                    className="inp-new"
                    value={Jute_Cont}
                    onChange={(e) => setJute_Cont(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: '32px',
                      width: '100%',
                      border: "none",
                    }}
                  />

                </td>
                <td colSpan="5">
                  <input
                    className="inp-new"
                    value={Jute_Sam}
                    onChange={(e) => setJute_Sam(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: '32px',
                      width: '100%',
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="1">3</td>
                <td colSpan="4">Color Thread</td>
                <td colSpan="5">
                  <input
                    className="inp-new"
                    value={Thread_Cont}
                    onChange={(e) => setThread_Cont(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: '32px',
                      width: '100%',
                      border: "none",
                    }}
                  />
                </td>
                <td colSpan="5">
                  <input
                    className="inp-new"
                    value={Thread_Sam}
                    onChange={(e) => setThread_Sam(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      height: '32px',
                      width: '100%',
                      border: "none",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="1">4</td>
                <td colSpan="4">Strapper</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Wrapper_Cont}
                  onChange={(e) => setWrapper_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Wrapper_Sam}
                  onChange={(e) => setWrapper_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">5</td>
                <td colSpan="4">Metal</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Metal_Cont}
                  onChange={(e) => setMetal_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Metal_Sam}
                  onChange={(e) => setMetal_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">6</td>
                <td colSpan="4">Rust</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Rust_Cont}
                  onChange={(e) => setRust_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Rust_Sam}
                  onChange={(e) => setRust_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">7</td>
                <td colSpan="4">Plastic</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Plastic_Cont}
                  onChange={(e) => setPlastic_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Plastic_Sam}
                  onChange={(e) => setPlastic_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">8</td>
                <td colSpan="4">Black Cotton</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={BlackCot_Cont}
                  onChange={(e) => setBlackCot_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={BlackCot_Sam}
                  onChange={(e) => setBlackCot_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">9</td>
                <td colSpan="4">Oil cotton</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={OilCot_Cont}
                  onChange={(e) => setOilCot_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={OilCot_Sam}
                  onChange={(e) => setOilCot_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">10</td>
                <td colSpan="4">Soil</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Soil_Cont}
                  onChange={(e) => setSoil_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Soil_Sam}
                  onChange={(e) => setSoil_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>

            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Activity Form - 2</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colSpan="1">11</td>
                <td colSpan="4">Yellow Cotton</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={YellowCot_Cont}
                  onChange={(e) => setYellowCot_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={YellowCot_Sam}
                  onChange={(e) => setYellowCot_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>

              <tr>
                <td colSpan="1">12</td>
                <td colSpan="4">Paper</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Paper_Cont}
                  onChange={(e) => setPaper_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Paper_Sam}
                  onChange={(e) => setPaper_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">13</td>
                <td colSpan="4">Stick</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Stick_Cont}
                  onChange={(e) => setStick_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Stick_Sam}
                  onChange={(e) => setStick_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">14</td>
                <td colSpan="4">Feather</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Feather_Cont}
                  onChange={(e) => setFeather_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Feather_Sam}
                  onChange={(e) => setFeather_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">15</td>
                <td colSpan="4">Cloth</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Cloth_Cont}
                  onChange={(e) => setCloth_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Cloth_Sam}
                  onChange={(e) => setCloth_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">16</td>
                <td colSpan="4">White Poly Propylene</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={WhitePoly_Cont}
                  onChange={(e) => setWhitePoly_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={WhitePoly_Sam}
                  onChange={(e) => setWhitePoly_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">17</td>
                <td colSpan="4">Color Poly Propylene</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={ColorPoly_Cont}
                  onChange={(e) => setColorPoly_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={ColorPoly_Sam}
                  onChange={(e) => setColorPoly_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">18</td>
                <td colSpan="4">Rubber Piece</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Rubber_Cont}
                  onChange={(e) => setRubber_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Rubber_Sam}
                  onChange={(e) => setRubber_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>
              <tr>
                <td colSpan="1">19</td>
                <td colSpan="4">Total</td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Total_Cont}
                  onChange={(e) => setTotal_Cont(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
                <td colSpan="5"><input
                  className="inp-new"
                  value={Total_Sam}
                  onChange={(e) => setTotal_Sam(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>

            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Review</p>,
      children: (
        <div>
          <table>
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>Supervisor Sign</td>
              <td colSpan="8" style={{ textAlign: 'center' }}>HOD Sign</td>
            </tr>
            <tr>
              <td colSpan="7" style={{ height: '100px' }}><input
                className="inp-new"
                value={SupervisorSign}
                onChange={(e) => setSupervisorSign(e.target.value)}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '100px',
                  width: '100%',
                  border: "none",
                }}
              /></td>
              <td colSpan="8" style={{ height: '100px' }}><input
                className="inp-new"
                value={HodSign}
                onChange={(e) => setHodSign(e.target.value)}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '100px',
                  width: '100%',
                  border: "none",
                }}
              /></td>
            </tr>
          </table>
        </div>
      ),
    },

  ];

  const formatName = "Contamination Checking Report(Raw Cotton)"
  const formatNo = "PR01/F-05"
  const revisionNo = "02"
  const sopNo = "PRD01-D-09"
  return (
    <div>

      <BleachingHeader formName={formatName} formatNo={formatNo} revisionNo={revisionNo} sopNo={sopNo} />
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1em",
          marginBottom: "1em",
          marginLeft: '50em'
        }}
      >



      </Row>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            marginRight: "1em",
            display: "flex",
          }}
        >



        </div>
        <div
          style={{
            width: "100%",
            marginRight: "1em",
            display: "flex",
          }}>

          <Select
            placeholder={'PH NO:'}
            id="ph-select"
            value={PHNo}
            options={phLovPayload}

            onChange={phOnChange}
            size="medium"

          />



          <Input
            addonBefore="SupplierName"
            placeholder="SupplierName"
            type="text"
            size="Medium"
            value={Supplier}
            onChange={(e) => setSupplier(e.target.value)}
            disabled
          />
          <Input
            addonBefore="Quantity"
            placeholder="Quantity"
            type="number"
            size="Medium"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="Date"
            size="Medium"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <Col>
          <div
            style={{
              display: "flex",
              marginTop: '10px',
              marginLeft: '2em'
            }}
          >
            {/* Save button */}
            <Button
            loading={saveLoading}
              onClick={handleSave}
              style={{ backgroundColor: "blue", color: "white", marginRight: "10px" }}
              type="primary"
            >
              Save
            </Button>

            {/* Submit button */}
            <Button
              loading={submitLoading}
              onClick={handleSubmit}
              style={{ backgroundColor: "blue", color: "white", marginRight: '10px' }}
              type="primary"
            >
              Submit
            </Button>

            <Button
              onClick={handleBack}
              style={{ backgroundColor: "blue", color: "white", marginRight: '10px' }}
              type="primary"
            >
              Back
            </Button>

            {/* <Button
              onClick={() => window.print()}
              style={{ backgroundColor: "blue", color: "white" }}
              type="primary"
            >
              Print
            </Button> */}
          </div>
        </Col>

      </div>
      <div>
        <Tabs items={items} onChange={onChange} />
      </div>
    </div>
  );
}





export default Bleaching_f05_edit;