import React, { useEffect,useState } from 'react';
import { IoLockOpen, IoSave } from 'react-icons/io5';
import axios from "axios";
import logo from '../Assests/passwordicon.jpg'
import { Table,message, Row,Button, Modal,DatePicker ,Select,Input,Form,Col} from "antd";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
const ForgetPassword = () => {
  const navigate = useNavigate();
    const { token } = useParams();
    const [password, setpassword] = useState("");
    const [confrimpassword, setconfrimpassword] = useState("");
  useEffect(() => {
  
  }, []);
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= minLength;
  
    return (
      isValidLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  };  
  const handleSave = async () => {
  // console.log(password,confrimpassword);
    // const token = localStorage.getItem("token");
    if(password!==confrimpassword)
    {
  message.error("Password Mismatch");
    }else if (!validatePassword(password)) {
      message.error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.");
    }else{
      // message.success("Password Match");
      const payload = {
        password: password,
       token: token
    };
      try {
        const response = await axios.put(
          `${ API.prodUrl}/Precot/api/auth/updateNewPassword`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response);
        message.success(response.data.message);
        navigate("/precot");
      
      } catch (error) {
        console.error("Error response:", error.response.data.message);
        message.error(error.response.data.message);
      
      }
    };
    }
    
    
    
  
  
  
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
              <h1><img src={logo} style={{
                width:"100px",
                height:"100px"
              }}/></h1>
              <h1 style={{fontSize:"14px",textAlign:"center"}} >Change Password</h1>
            </Form.Item>  
            <Input
             addonBefore=      {<IoLockOpen color="#00308F" />}
                      type="password"
                      placeholder='Change Password'
                      style={{
                        width: "100%",
                        height: "26 px",
                        border: "1px solid #dddd",
                        borderRadius:"3px",
                        textAlign: "left  ",
                      
                      }}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                     <Input
             addonBefore=      {<IoLockOpen color="#00308F" />}
                      type="password"
                      placeholder='Confrim Password'
                      style={{
                        width: "100%",
                        marginTop:"10px",
                        height: "26 px",
                        border: "1px solid #dddd",
                        borderRadius:"3px",
                        textAlign: "left  ",
                      
                      }}
                      onChange={(e) => setconfrimpassword(e.target.value)}
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
                      textAlign:"left ",
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