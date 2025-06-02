/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Avatar, Col, Menu, Row, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
 
const PrecotSidebar = ({ open, onClose, role }) => {
  const navigate = useNavigate();
 const departmentId = localStorage.getItem('departmentId')
  return (
    <>
    <style>
      {
        `
      :where(.css-dev-only-do-not-override-3rel02).ant-menu-dark .ant-menu-item-selected, :where(.css-dev-only-do-not-override-3rel02).ant-menu-dark>.ant-menu .ant-menu-item-selected{
      background-color :white
      }


`
      }
    </style>
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={open}
      width="fit-content"
      style={{ padding: "1em" }}
    >
      {departmentId == 2 ? (
        <>
      <Row>
        <Col>
          <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
        </Col>
        <Col style={{ marginLeft: "1em" }}>
          <p>{localStorage.getItem("username")}</p>
          <p style={{ fontSize: "x-small" }}>{localStorage.getItem("role")}</p>
        </Col>
      </Row>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "0",
          margin: "0",
        }}
        items={[
                {
                  key: "1",
                  icon: <IoCreate color="#151718" />,
                  label: <b style={{ color: "#151718" }}>Form Browser</b>,
                  onClick: () => navigate("/Precot/choosenScreen"),
                },
                {
                  key: "2",
                  icon: <IoCreate color="#151718" />,
                  label: (
                    <b
                      style={{
                        color: "#151718",
                      }}
                    >
                      Audit
                    </b>
                  ),
                  onClick: () => navigate("/Precot/Report/Generation"),
                },
                {
                  key: "3",
                  icon: <IoCreate color="#151718" />,
                  label: (
                    <b
                      style={{
                        color: "#151718",
                      }}
                    >
                      Traceability
                    </b>
                  ),
                  onClick: () => navigate("/Precot/Traceability"),
                },
                {
                  key:"4",
                  icon: <IoCreate color="#151718"/>,
                  label:<b style={{color:"#151718"}}>Packing Material</b>,
                  onClick: () => navigate("/Precot/Spunlace/PackingMaterial"),
                },
                {
                  key: "5",
                  icon: (
                    <FaLock
                      color="#151718"
                     
                    />
                  ),
                  label: <b style={{ color: "#151718" }}>Logout</b>,
                  onClick : () => {
                    if (confirm("Are you sure want to logout")) {
                      localStorage.removeItem("token");
                      navigate("/Precot");
                    }
                  }}
              ]
                   }
      />
      </>
    ):departmentId == 3  || 4 ? (<>

<Row>
        <Col>
          <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
        </Col>
        <Col style={{ marginLeft: "1em" }}>
          <p>{localStorage.getItem("username")}</p>
          <p style={{ fontSize: "x-small" }}>{localStorage.getItem("role")}</p>
        </Col>
      </Row>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "0",
          margin: "0",
        }}
        items={[
                {
                  key: "1",
                  icon: <IoCreate color="#151718" />,
                  label: <b style={{ color: "#151718" }}>Form Browser</b>,
                  onClick: () => navigate("/Precot/choosenScreen"),
                },
                {
                  key: "2",
                  icon: <IoCreate color="#151718" />,
                  label: (
                    <b
                      style={{
                        color: "#151718",
                      }}
                    >
                      Audit
                    </b>
                  ),
                  onClick: () => navigate("/Precot/Report/Generation"),
                },
                {
                  key: "3",
                  icon: <IoCreate color="#151718" />,
                  label: (
                    <b
                      style={{
                        color: "#151718",
                      }}
                    >
                      Traceability
                    </b>
                  ),
                  onClick: () => navigate("/Precot/Traceability"),
                },
                {
                  key: "4",
                  icon: (
                    <FaLock
                      color="#151718"
                     
                    />
                  ),
                  label: <b style={{ color: "#151718" }}>Logout</b>,
                  onClick : () => {
                    if (confirm("Are you sure want to logout")) {
                      localStorage.removeItem("token");
                      navigate("/Precot");
                    }
                  }}
              ]
                   }
      />

    </>)
    // QA/QC/PPC/STORE.........
    :departmentId >=5 ? (<>

      <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>
              <Col style={{ marginLeft: "1em" }}>
                <p>{localStorage.getItem("username")}</p>
                <p style={{ fontSize: "x-small" }}>{localStorage.getItem("role")}</p>
              </Col>
            </Row>
            <Menu
              theme="dark"
              mode="inline"
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={[
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: <b style={{ color: "#151718" }}>Form Browser</b>,
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Audit
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Report/Generation"),
                      },
                      {
                        key: "3",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Traceability
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Traceability"),
                      },
                      {
                        key: "5",
                        icon: (
                          <FaLock
                            color="#151718"
                           
                          />
                        ),
                        label: <b style={{ color: "#151718" }}>Logout</b>,
                        onClick : () => {
                          if (confirm("Are you sure want to logout")) {
                            localStorage.removeItem("token");
                            navigate("/Precot");
                          }
                        }}
                    ]
                         }
            />
      
          </>):
    null}
    </Drawer>
    </>
  );
};
 
export default PrecotSidebar;
 
 