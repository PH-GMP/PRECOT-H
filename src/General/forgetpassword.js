import React, { useEffect,useState,useNavigate } from 'react';
import { IoSave } from 'react-icons/io5';
import axios from "axios";
import { Table,message, Row,Button, Modal,DatePicker ,Select,Input,Form,Col} from "antd";
import API from "../baseUrl.json";

const ForgetPassword = () => {
    const [email, setemail] = useState("");
    // const navigate = useNavigate();
  useEffect(() => {
  
  }, []);
  const handleSave = async () => {
   
    const token = localStorage.getItem("token");
  
    const payload = {
     email: email,
    forgetPasswordUrl: `${ API.prodUrl}/Precot/api/auth/updateNewPassword`
    };
  
    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/auth/forgetPassword`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.token);

      message.success("Mail Send Succesfully");
     
    } catch (error) {
      console.error("Error response:", error.response.data.message);
      message.error(error.response.data.message);
    //   if (error.response && error.response.status === 401) {
    //     message.error("Unauthorized. Please log in again.");
    //   } else {
    //     message.error("Failed to save form");
    //   }
    }
  };
  
  return (
    <div>
            <>
      <Row
        style={{
          height: "100vh",
        }}
      >
        <Col md={12} xs={0} className="login-left">
          {/* just for image holder */}
        </Col>
        <Col
          xs={24}
          md={12}
          className="signin-form"
        >
           <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            style={{
              width: "50%",
              position: "relative",
              height: "100%",
            }}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
          
            
            autoComplete="off"
          >
 <Form.Item style={{
              textAlign:'center'
            }}>
              <h1>Forget Password</h1>
            </Form.Item>
            <input
                      type="text"
                      style={{
                        width: "95%",
                        height: "40px",
                        border: "1px solid #dddd",
                        borderRadius:"3px",
                        textAlign: "center",
                      }}
                      onChange={(e) => setemail(e.target.value)}
                    />
                     <Form.Item style={{
              textAlign:'center'
            }}>
          <Button
                  type="primary"
                  style={{
                      backgroundColor: "#0000",
                      color: "#00308F",
                      fontWeight: "bold",
                      textAlign:"center",
                      marginTop:"10px"
                  }}
                  onClick={handleSave}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
              >
                  &nbsp;Submit
              </Button>
              </Form.Item>
              </Form>
          
        </Col>
      </Row>
    </>

    </div>
  );
};

export default ForgetPassword;