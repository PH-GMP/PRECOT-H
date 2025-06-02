import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Modal, Row, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useMessage from "antd/es/message/useMessage";
import API from "../baseUrl.json";
import { MdMail, MdOutlinePassword } from "react-icons/md";

const SignIn = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const [messageApi, contextHolder] = message;
  const [isOpen, setIsOpen] = useState(false);
  const [mail, setMail] = useState("");

  const onFinish = (values) => {
    // console.log("Success:", values);
    axios
      .post(`${API.prodUrl}/Precot/api/auth/signin`, {
        usernameOrEmail: values.username,
        password: values.password,
      })
      .then((res) => {
        // console.log("Res:", res.data);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("departmentId", res.data.departmentId);
        const decoded = jwtDecode(res.data.accessToken);
        // console.log("Decoded :", decoded);
        localStorage.setItem("username", decoded.username);
        switch (decoded.role) {
          case "ROLE_ADMIN":
            navigate("/Precot/welcome");
            break;
          case "ROLE_IT":
            navigate("/Precot/choosenScreen");
            break;
          default:
            navigate("/Precot/choosenScreen");
            break;
        }
        //alert("User Logged In Sucessfully")
        messageApi.open({
          type: "success",
          content: "User Logged In Successfully",
          duration: "1000",
        });

        // navigate("/Precot/welcome");
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message ||
          "Something went wrong. Please try again.";
        messageApi.open({
          type: "warning",
          content: errorMsg,
          duration: 2,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const onFinishForgotPassword = (values) => {
    // console.log("Values",values);
  };

  const sendMail = () => {
    if (mail == "") {
      messageApi.open({
        type: "error",
        content: "Please enter values",
      });
    } else {
      const payload = {
        email: mail,
        forgetPasswordUrl: `${API.prodUrl}/Precot/api/auth/updateNewPassword`,
      };
      axios
        .post(`${API.prodUrl}/Precot/api/auth/forgetPassword`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("Response",res)
          messageApi.open({
            type: "success",
            content: "Mail Send Successfully",
          });
          setMail("");
          setIsOpen(false);
          // const res= data.response;
          // // console.log("forger password",)
        })
        .catch((err) => {
          // console.log("Error",err.response.data.message)
          messageApi.open({
            type: "error",
            content: err.response.data.message,
          });
        });
    }
  };
  const onFinishFailedForgotPassword = (values) => {
    // console.log("Error",values)
  };
  return (
    <>
      {contextHolder}
      <Row
        style={{
          height: "100vh",
        }}
      >
        <Col md={12} xs={0} className="login-left">
          {/* just for image holder */}
        </Col>
        <Col xs={24} md={12} className="signin-form">
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{
                textAlign: "center",
              }}
            >
              <h1>Welcome Back</h1>
            </Form.Item>
            <Form.Item
              style={{
                textAlign: "center",
              }}
            >
              <p>Enter your username and password to login</p>
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              style={{
                fontWeight: "bold",
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              style={{
                fontWeight: "bold",
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="link"
                onClick={() => setIsOpen(true)}
                icon={<MdOutlinePassword />}
                style={{
                  padding: "0",
                  margin: "0",
                }}
              >
                Forgot password?
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#010101",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Modal
          open={isOpen}
          onOk={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          footer={false}
          title="Forgot Password"
        >
          <Form layout="vertical">
            <Form.Item label="Email">
              <Input value={mail} onChange={(e) => setMail(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button icon={<MdMail />} type="primary" onClick={sendMail}>
                Send Mail
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};
export default SignIn;
