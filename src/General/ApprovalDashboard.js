import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseOutlined,
    EyeOutlined,
    FileDoneOutlined,
    RocketOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    Avatar,
    Badge,
    Button,
    Card,
    Col,
    Drawer,
    Input,
    Menu,
    Modal,
    Row, Spin,
    Tabs,
    Tag, theme, Tooltip,
    Typography
} from "antd";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaLock, FaSearch } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import API from "../baseUrl.json";

const { Text, Title } = Typography;
const { useToken } = theme;
const { Search } = Input;

// Header Component
const BleachingHeader = ({ formName, formatNo, MenuBtn, buttonsArray }) => {
    const username = localStorage.getItem("username") || "User";
    const role = localStorage.getItem("role") || "Role";
    const { token } = useToken();

    return (
        <div
            style={{
                background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #00308F 100%)`,
                color: "white",
                padding: "12px 20px",
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
            }} />

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {MenuBtn}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                                width: 42,
                                height: 42,
                                borderRadius: 12,
                                background: 'rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <RocketOutlined style={{ color: "white", fontSize: "24px" }} />
                            </div>
                            <div>
                                <h1 style={{
                                    color: "white",
                                    margin: 0,
                                    fontWeight: 700,
                                    fontSize: '20px',
                                    lineHeight: 1.2
                                }}>
                                    {formName}
                                </h1>
                                <p style={{
                                    color: "rgba(255,255,255,0.9)",
                                    margin: 0,
                                    fontSize: '13px',
                                    fontWeight: 400
                                }}>
                                    {formatNo}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "8px 16px",
                        background: '#e5eef923',
                        borderRadius: 12,
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end"
                        }}>
                            <Text strong style={{
                                color: "white",
                                fontSize: "14px",
                                lineHeight: 1.2
                            }}>
                                {username}
                            </Text>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                            }}>
                                <div style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    backgroundColor: '#10B981'
                                }} />
                                <Text style={{
                                    color: "rgba(255,255,255,0.8)",
                                    fontSize: "12px"
                                }}>
                                    {role.replace(/^ROLE_/, "").replace(/_/g, " ")}
                                </Text>
                            </div>
                        </div>
                        <Avatar
                            size="large"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                border: '2px solid rgba(255,255,255,0.3)'
                            }}
                            icon={<UserOutlined />}
                        />
                    </div>

                    {buttonsArray.map((button, index) =>
                        React.cloneElement(button, {
                            key: index,
                            style: {
                                ...button.props.style,
                                background: 'rgba(255,255,255,0.2)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(10px)',
                                fontWeight: 600,
                                borderRadius: 12,
                                height: '40px',
                                padding: '0 20px'
                            }
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

// Sidebar Component
const PrecotSidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const departmentId = localStorage.getItem("departmentId");

    const commonMenuItems = [
        {
            key: "1",
            icon: <IoCreate color="#151718" />,
            label: <b style={{ color: "#151718" }}>Form Browser</b>,
            onClick: () => navigate("/Precot/choosenScreen"),
        },
        {
            key: "logout",
            icon: <FaLock color="#151718" />,
            label: <b style={{ color: "#493f3fff" }}>Logout</b>,
            onClick: () => {
                if (window.confirm("Are you sure want to logout")) {
                    localStorage.removeItem("token");
                    navigate("/Precot");
                }
            },
        },
    ];

    return (
        <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            width="fit-content"
            style={{ padding: "1em" }}
        >
            <Row>
                <Col>
                    <Avatar>{localStorage.getItem("username")?.at(0) || "U"}</Avatar>
                </Col>
                <Col style={{ marginLeft: "1em" }}>
                    <p>{localStorage.getItem("username") || "User"}</p>
                    <p style={{ fontSize: "x-small" }}>
                        {localStorage.getItem("role") || "Role"}
                    </p>
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
                items={commonMenuItems}
            />
        </Drawer>
    );
};

// BMR Modal Component
const BMRModal = ({ visible, onClose, formData }) => {
    const { token } = useToken();
    const [searchText, setSearchText] = useState("");
    const [filteredBmrNos, setFilteredBmrNos] = useState([]);

    useEffect(() => {
        if (formData && formData.pendingBmrNos) {
            setFilteredBmrNos(formData.pendingBmrNos);
        }
    }, [formData]);

    const handleSearch = (value) => {
        setSearchText(value);
        if (!value.trim()) {
            setFilteredBmrNos(formData.pendingBmrNos);
        } else {
            const filtered = formData.pendingBmrNos.filter(bmrNo =>
                bmrNo.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBmrNos(filtered);
        }
    };

    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closable={false}
            footer={null}
            width={900}
            closeIcon={<CloseOutlined style={{ color: token.colorTextSecondary }} />}
            style={{
                top: 20,
            }}
            bodyStyle={{
                padding: 0,
                borderRadius: 16,
                overflow: 'hidden',
            }}
        >
            <div style={{
                background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #00308F 100%)`,
                padding: '24px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <Title level={3} style={{ color: 'white', margin: 0, marginBottom: 8 }}>
                        {formData?.formName}
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>
                        Pending Batch Manufacturing Records
                    </Text>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        marginTop: 16,
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            padding: '8px 16px',
                            borderRadius: 20,
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Text strong style={{ color: 'white', fontSize: 14 }}>
                                Total Pending: {formData?.pendingCount}
                            </Text>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            padding: '8px 16px',
                            borderRadius: 20,
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Text strong style={{ color: 'white', fontSize: 14 }}>
                                Department: {formData?.departmentName}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                background: token.colorBgContainer
            }}>
                <Search
                    placeholder="Search BMR numbers..."
                    allowClear
                    enterButton={
                        <Button
                            type="primary"
                            icon={<FaSearch />}
                            style={{
                                background: token.colorPrimary,
                                borderColor: token.colorPrimary
                            }}
                        >
                            Search
                        </Button>
                    }
                    size="large"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    onSearch={handleSearch}
                    style={{
                        borderRadius: 12,
                    }}
                />
            </div>

            <div style={{
                maxHeight: '500px',
                overflowY: 'auto',
                padding: '16px 20px'
            }}>
                {filteredBmrNos.length > 0 ? (
                    <Row gutter={[12, 12]}>
                        {filteredBmrNos.map((bmrNo, index) => (
                            <Col xs={24} sm={12} lg={8} key={index}>
                                <div
                                    style={{
                                        padding: '5px 5px',
                                        justifyContent: "center",
                                        borderRadius: 8,
                                        border: `1px solid ${token.colorBorderSecondary}`,
                                        background: token.colorBgContainer,
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10
                                    }}
                                >
                                    <Text
                                        strong
                                        style={{
                                            fontSize: '13px',
                                            color: token.colorTextHeading,
                                            lineHeight: 1.2,
                                            wordBreak: 'break-all'
                                        }}
                                    >
                                        {bmrNo}
                                    </Text>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: token.colorTextTertiary
                    }}>
                        <FileDoneOutlined style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }} />
                        <div>
                            <Text style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>
                                No BMR records found
                            </Text>
                            <Text type="secondary">
                                {searchText ? 'Try adjusting your search terms' : 'All BMR records are processed'}
                            </Text>
                        </div>
                    </div>
                )}
            </div>

            <div style={{
                padding: '16px 24px',
                borderTop: `1px solid ${token.colorBorderSecondary}`,
                background: token.colorBgContainer,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text type="secondary" style={{ fontSize: 14 }}>
                    Showing {filteredBmrNos.length} of {formData?.pendingBmrNos?.length} records
                </Text>
                <Button
                    onClick={onClose}
                    style={{
                        borderRadius: 8,
                        padding: '8px 24px',
                        height: 'auto'
                    }}
                >
                    Close
                </Button>
            </div>
        </Modal>
    );
};

// Helper function to get display role name
const getDisplayRoleName = (roleValue) => {
    if (Array.isArray(roleValue)) {
        roleValue = roleValue[0];
    }

    if (typeof roleValue === "string") {
        return roleValue
            .replace(/^ROLE_/, "")
            .replace(/_/g, " ")
            .trim();
    }

    return roleValue;
};

// Helper function to check if role matches and get pending count - UPDATED for all special forms
const getRolePendingCount = (formsData, userRole) => {
    let rolePendingCount = 0;
    let roleTotalForms = 0;

    formsData.forEach(form => {
        // Check if this is the first special form
        if (form.formName === "PH-ENG01/FC-003  BREAKDOWN INTIMATION SLIP") {
            // Flatten userRole array and find matching indices
            const flatUserRoles = [];
            const indexMapping = [];

            form.userRole.forEach((roleItem, phaseIndex) => {
                if (Array.isArray(roleItem)) {
                    roleItem.forEach((subRole, subIndex) => {
                        flatUserRoles.push(subRole);
                        indexMapping.push({ phaseIndex, subIndex });
                    });
                } else {
                    flatUserRoles.push(roleItem);
                    indexMapping.push({ phaseIndex, subIndex: 0 });
                }
            });

            // Find all occurrences of userRole in flat array
            flatUserRoles.forEach((role, flatIndex) => {
                if (role === userRole) {
                    const { phaseIndex, subIndex } = indexMapping[flatIndex];

                    // For this special form, handle the mapping based on phase
                    if (phaseIndex === 0) {
                        // Phase I: match formStatus[0]
                        if (form.formStatus.length > 0) {
                            rolePendingCount += form.formStatus[0] || 0;
                        }
                    } else if (phaseIndex === 1) {
                        // Phase II: match formStatus based on subIndex + 1
                        const statusIndex = 1 + subIndex;
                        if (form.formStatus.length > statusIndex) {
                            rolePendingCount += form.formStatus[statusIndex] || 0;
                        }
                    } else if (phaseIndex === 2) {
                        // Phase III: match formStatus based on subIndex + 4
                        const statusIndex = 4 + subIndex;
                        if (form.formStatus.length > statusIndex) {
                            rolePendingCount += form.formStatus[statusIndex] || 0;
                        }
                    } else if (phaseIndex === 3) {
                        // Phase IV: match formStatus[7]
                        if (form.formStatus.length > 7) {
                            rolePendingCount += form.formStatus[7] || 0;
                        }
                    }
                    roleTotalForms++;
                }
            });
        }
        // Check if this is the second special form
        else if (form.formName === "PH-ENG01/FC-004  ROOT CAUSE ANALYSIS") {
            // Flatten userRole array and find matching indices
            const flatUserRoles = [];
            const indexMapping = [];

            form.userRole.forEach((roleItem, phaseIndex) => {
                if (Array.isArray(roleItem)) {
                    roleItem.forEach((subRole, subIndex) => {
                        flatUserRoles.push(subRole);
                        indexMapping.push({ phaseIndex, subIndex });
                    });
                } else {
                    flatUserRoles.push(roleItem);
                    indexMapping.push({ phaseIndex, subIndex: 0 });
                }
            });

            // Find all occurrences of userRole in flat array
            flatUserRoles.forEach((role, flatIndex) => {
                if (role === userRole) {
                    const { phaseIndex, subIndex } = indexMapping[flatIndex];

                    // For this special form, handle the mapping based on phase
                    if (phaseIndex === 0) {
                        // Phase I: match formStatus based on subIndex
                        const statusIndex = subIndex;
                        if (form.formStatus.length > statusIndex) {
                            rolePendingCount += form.formStatus[statusIndex] || 0;
                        }
                    } else if (phaseIndex === 1) {
                        // Phase II: match formStatus[3] for both HOD and DESIGNEE
                        if (form.formStatus.length > 3) {
                            rolePendingCount += form.formStatus[3] || 0;
                        }
                    }
                    roleTotalForms++;
                }
            });
        }
        // Check if this is the third special form
        else if (form.formName === "PH-ENG01/FC-020  WORK ORDER REQUEST FORM") {
            // Flatten userRole array and find matching indices
            const flatUserRoles = [];
            const indexMapping = [];

            form.userRole.forEach((roleItem, phaseIndex) => {
                if (Array.isArray(roleItem)) {
                    roleItem.forEach((subRole, subIndex) => {
                        flatUserRoles.push(subRole);
                        indexMapping.push({ phaseIndex, subIndex });
                    });
                } else {
                    flatUserRoles.push(roleItem);
                    indexMapping.push({ phaseIndex, subIndex: 0 });
                }
            });

            // Find all occurrences of userRole in flat array
            flatUserRoles.forEach((role, flatIndex) => {
                if (role === userRole) {
                    const { phaseIndex, subIndex } = indexMapping[flatIndex];

                    // For this special form, handle the mapping based on phase
                    if (phaseIndex === 0) {
                        // Phase I: match formStatus[0]
                        if (form.formStatus.length > 0) {
                            rolePendingCount += form.formStatus[0] || 0;
                        }
                    } else if (phaseIndex === 1) {
                        // Phase II: match formStatus based on subIndex + 1
                        const statusIndex = 1 + subIndex;
                        if (form.formStatus.length > statusIndex) {
                            rolePendingCount += form.formStatus[statusIndex] || 0;
                        }
                    } else if (phaseIndex === 2) {
                        // Phase III: match formStatus[5]
                        if (form.formStatus.length > 5) {
                            rolePendingCount += form.formStatus[5] || 0;
                        }
                    }
                    roleTotalForms++;
                }
            });
        } else {
            // Normal form handling
            form.userRole.forEach((roleValue, index) => {
                if (Array.isArray(roleValue)) {
                    if (roleValue.includes(userRole)) {
                        roleTotalForms++;
                        if (index < form.formStatus.length) {
                            rolePendingCount += form.formStatus[index];
                        }
                    }
                } else {
                    if (roleValue === userRole) {
                        roleTotalForms++;
                        if (index < form.formStatus.length) {
                            rolePendingCount += form.formStatus[index];
                        }
                    }
                }
            });
        }
    });

    return { rolePendingCount, roleTotalForms };
};

// Helper function to get status counts for first special form
const getSpecialFormStatusCounts = (formStatus, phaseIndex) => {
    if (!formStatus || formStatus.length === 0) return [];

    if (phaseIndex === 0) {
        // Phase I: Show only supervisor status
        return [{ status: formStatus[0] || 0, role: "SUPERVISOR" }];
    } else if (phaseIndex === 1) {
        // Phase II: Show all three status values
        return [
            { status: formStatus.length > 1 ? formStatus[1] || 0 : 0, role: "ENGINEER" },
            { status: formStatus.length > 2 ? formStatus[2] || 0 : 0, role: "MECHANICAL" },
            { status: formStatus.length > 3 ? formStatus[3] || 0 : 0, role: "ELECTRICAL" }
        ];
    } else if (phaseIndex === 2) {
        // Phase III: Show all three status values
        return [
            { status: formStatus.length > 4 ? formStatus[4] || 0 : 0, role: "ENGINEER" },
            { status: formStatus.length > 5 ? formStatus[5] || 0 : 0, role: "MECHANICAL" },
            { status: formStatus.length > 6 ? formStatus[6] || 0 : 0, role: "ELECTRICAL" }
        ];
    } else if (phaseIndex === 3) {
        // Phase IV: Show only supervisor status
        return [{ status: formStatus.length > 7 ? formStatus[7] || 0 : 0, role: "SUPERVISOR" }];
    }

    return [];
};

// Helper function to get status counts for second special form (ROOT CAUSE ANALYSIS)
const getRootCauseAnalysisStatusCounts = (formStatus, phaseIndex) => {
    if (!formStatus || formStatus.length === 0) return [];

    if (phaseIndex === 0) {
        // Phase I: Show all three engineering roles
        return [
            { status: formStatus.length > 0 ? formStatus[0] || 0 : 0, role: "ENGINEER" },
            { status: formStatus.length > 1 ? formStatus[1] || 0 : 0, role: "MECHANICAL" },
            { status: formStatus.length > 2 ? formStatus[2] || 0 : 0, role: "ELECTRICAL" }
        ];
    } else if (phaseIndex === 1) {
        // Phase II: Show HOD and DESIGNEE with same status
        return [
            { status: formStatus.length > 3 ? formStatus[3] || 0 : 0, role: "HOD" },
            { status: formStatus.length > 3 ? formStatus[3] || 0 : 0, role: "DESIGNEE" }
        ];
    }

    return [];
};

// Helper function to get status counts for third special form (WORK ORDER REQUEST FORM)
const getWorkOrderFormStatusCounts = (formStatus, phaseIndex) => {
    if (!formStatus || formStatus.length === 0) return [];

    if (phaseIndex === 0) {
        // Phase I: Show HOD role
        return [{ status: formStatus.length > 0 ? formStatus[0] || 0 : 0, role: "HOD" }];
    } else if (phaseIndex === 1) {
        // Phase II: Show all four engineering roles
        return [
            { status: formStatus.length > 1 ? formStatus[1] || 0 : 0, role: "ENGINEER" },
            { status: formStatus.length > 2 ? formStatus[2] || 0 : 0, role: "MECHANICAL" },
            { status: formStatus.length > 3 ? formStatus[3] || 0 : 0, role: "ELECTRICAL" },
            { status: formStatus.length > 4 ? formStatus[4] || 0 : 0, role: "CIVIL" }
        ];
    } else if (phaseIndex === 2) {
        // Phase III: Show HOD role again
        return [{ status: formStatus.length > 5 ? formStatus[5] || 0 : 0, role: "HOD" }];
    }

    return [];
};

// Helper function to check if current user role is in role array for first special form
const isCurrentUserRoleInSpecialForm = (roleArray, phaseIndex, statusIndex = 0) => {
    const currentUserRole = localStorage.getItem("role");

    if (!Array.isArray(roleArray)) {
        return roleArray === currentUserRole;
    }

    if (phaseIndex === 0 || phaseIndex === 3) {
        // Phase I & IV: check supervisor
        return roleArray.includes(currentUserRole);
    } else if (phaseIndex === 1 || phaseIndex === 2) {
        // Phase II & III: check specific role based on statusIndex
        if (statusIndex < roleArray.length) {
            return roleArray[statusIndex] === currentUserRole;
        }
        return false;
    }

    return false;
};

// Helper function to check if current user role is in role array for second special form
const isCurrentUserRoleInRootCauseForm = (roleArray, phaseIndex, statusIndex = 0) => {
    const currentUserRole = localStorage.getItem("role");

    if (!Array.isArray(roleArray)) {
        return false;
    }

    if (phaseIndex === 0) {
        // Phase I: check if current role matches at statusIndex
        if (statusIndex < roleArray.length) {
            return roleArray[statusIndex] === currentUserRole;
        }
        return false;
    } else if (phaseIndex === 1) {
        // Phase II: check if current role matches at statusIndex
        if (statusIndex < roleArray.length) {
            return roleArray[statusIndex] === currentUserRole;
        }
        return false;
    }

    return false;
};

// Helper function to check if current user role is in role array for third special form
const isCurrentUserRoleInWorkOrderForm = (roleArray, phaseIndex, statusIndex = 0) => {
    const currentUserRole = localStorage.getItem("role");

    if (phaseIndex === 0 || phaseIndex === 2) {
        // Phase I & III: check HOD
        if (!Array.isArray(roleArray)) {
            return roleArray === currentUserRole;
        }
        return roleArray === currentUserRole;
    } else if (phaseIndex === 1) {
        // Phase II: check specific engineering role based on statusIndex
        if (!Array.isArray(roleArray)) return false;
        if (statusIndex < roleArray.length) {
            return roleArray[statusIndex] === currentUserRole;
        }
        return false;
    }

    return false;
};

// Dashboard Component
const DashboardPage = () => {
    const { token } = useToken();
    const [departmentId, setDepartmentId] = useState(null);
    const [formsData, setFormsData] = useState([]);
    const [bmrData, setBmrData] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [bmrModalVisible, setBmrModalVisible] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Loading states
    const [isFormsLoading, setIsFormsLoading] = useState(true);
    const [isBmrLoading, setIsBmrLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);

    useEffect(() => {
        const deptId = parseInt(localStorage.getItem("departmentId"), 10);
        setDepartmentId(deptId);

        const fetchData = async () => {
            try {
                setIsFormsLoading(true);
                setIsTableLoading(true);
                const response = await axios.get(`${API.prodUrl}/Precot/api/dashboard/dahsboardNewApproach`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = response.data;
                console.log("first,data", data);
                setFormsData(data.forms);
            } catch (error) {
                console.error("Error fetching forms data:", error);
                setFormsData([]);
            } finally {
                setIsFormsLoading(false);
                setIsTableLoading(false);
            }
        }
        fetchData()

        const BMRData = async () => {
            try {
                setIsBmrLoading(true);
                const response = await axios.get(`${API.prodUrl}/Precot/api/dashboard/dahsboardBmr`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = response.data;
                setBmrData(data.forms);
            } catch (error) {
                console.error("Error fetching BMR data:", error);
                setBmrData([]);
            } finally {
                setIsBmrLoading(false);
            }
        }
        BMRData()
    }, []);

    // Get current user role from localStorage
    const currentUserRole = localStorage.getItem("role");

    // Calculate overall statistics
    const totalForms = formsData.length;
    const totalPending = formsData.reduce((acc, item) => {
        return acc + item.formStatus.reduce((sum, status) => sum + (status || 0), 0);
    }, 0);

    // Calculate role-specific statistics
    const { rolePendingCount, roleTotalForms } = getRolePendingCount(formsData, currentUserRole);
    const roleCompletionRate = roleTotalForms > 0 ? (((roleTotalForms - rolePendingCount / roleTotalForms) / roleTotalForms) * 100).toFixed(1) : 0;

    // Calculate max phases for table headers
    const maxPhases = Math.max(...formsData.map((item) => {
        if (item.formName === "PH-ENG01/FC-003  BREAKDOWN INTIMATION SLIP") {
            return 4; // First special form has 4 phases
        }
        if (item.formName === "PH-ENG01/FC-004  ROOT CAUSE ANALYSIS") {
            return 2; // Second special form has 2 phases
        }
        if (item.formName === "PH-ENG01/FC-020  WORK ORDER REQUEST FORM") {
            return 3; // Third special form has 3 phases
        }
        return item.formStatus.length || 0;
    }), 0);

    const romanLetters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

    // Pagination calculations
    const totalItems = formsData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Get current page data
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return formsData.slice(startIndex, endIndex);
    };

    const currentPageData = getCurrentPageData();

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle page size change
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    // Handle BMR view
    const handleViewBmr = (form) => {
        setSelectedForm(form);
        setBmrModalVisible(true);
    };

    // Render first special form cell
    const renderFirstSpecialFormCell = (formStatus, phaseIndex, roleArray) => {
        const statusCounts = getSpecialFormStatusCounts(formStatus, phaseIndex);

        if (statusCounts.length === 0) {
            return (
                <div style={{
                    padding: "5px 3px",
                    borderRadius: 8,
                    backgroundColor: `${token.colorBorderSecondary}10`,
                    border: `2px solid ${token.colorBorderSecondary}20`
                }}>
                    <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                        -
                    </Text>
                </div>
            );
        }

        if (phaseIndex === 0 || phaseIndex === 3) {
            // Phase I & IV: Single status display
            const status = statusCounts[0];
            const isCurrentUserRole = isCurrentUserRoleInSpecialForm(roleArray, phaseIndex);

            if (status.status > 0) {
                return (
                    <Tooltip title={`Approver: ${status.role}${isCurrentUserRole ? ' (Your Responsibility)' : ''}`} placement="top">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <span style={{ fontSize: 15, fontWeight: "bold" }}>
                                {status.status}
                            </span>
                            <div
                                style={{
                                    marginTop: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: 11,
                                }}
                            >
                                <UserOutlined
                                    style={{
                                        marginRight: 6,
                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                        fontWeight: isCurrentUserRole ? 700 : 600
                                    }}
                                >
                                    {status.role}
                                </Text>
                            </div>
                        </div>
                    </Tooltip>
                );
            } else {
                return (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Tag
                            icon={<CheckCircleOutlined />}
                            color="success"
                            style={{
                                margin: 0,
                                border: "none",
                                fontWeight: 600,
                                fontSize: 11
                            }}
                        >
                            Approved
                        </Tag>
                        <div
                            style={{
                                marginTop: 8,
                                display: "flex",
                                alignItems: "center",
                                fontSize: 11,
                            }}
                        >
                            <UserOutlined
                                style={{
                                    marginRight: 6,
                                    color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                    fontWeight: 600
                                }}
                            >
                                {status.role}
                            </Text>
                        </div>
                    </div>
                );
            }
        } else if (phaseIndex === 1 || phaseIndex === 2) {
            // Phase II & III: Multiple status display
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    width: "100%"
                }}>
                    {statusCounts.map((status, index) => {
                        const isCurrentUserRole = isCurrentUserRoleInSpecialForm(roleArray, phaseIndex, index);

                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "4px 8px",
                                    backgroundColor: isCurrentUserRole ? `${token.colorPrimary}12` : `${token.colorBgContainer}`,
                                    borderRadius: 6,
                                    border: `1px solid ${isCurrentUserRole ? token.colorPrimary : token.colorBorderSecondary}30`
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontWeight: isCurrentUserRole ? 600 : 500,
                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary
                                    }}
                                >
                                    {status.role}
                                </Text>
                                <Text
                                    strong
                                    style={{
                                        fontSize: 11,
                                        color: status.status > 0 ? "black" : token.colorSuccess
                                    }}
                                >
                                    {status.status > 0 ? status.status : "Approved"}
                                </Text>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    // Render second special form cell (ROOT CAUSE ANALYSIS)
    const renderSecondSpecialFormCell = (formStatus, phaseIndex, roleArray) => {
        const statusCounts = getRootCauseAnalysisStatusCounts(formStatus, phaseIndex);

        if (statusCounts.length === 0) {
            return (
                <div style={{
                    padding: "5px 3px",
                    borderRadius: 8,
                    backgroundColor: `${token.colorBorderSecondary}10`,
                    border: `2px solid ${token.colorBorderSecondary}20`
                }}>
                    <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                        -
                    </Text>
                </div>
            );
        }

        // Phase I: Multiple engineering roles
        if (phaseIndex === 0) {
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    width: "100%"
                }}>
                    {statusCounts.map((status, index) => {
                        const isCurrentUserRole = isCurrentUserRoleInRootCauseForm(roleArray, phaseIndex, index);

                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "4px 8px",
                                    backgroundColor: isCurrentUserRole ? `${token.colorPrimary}12` : `${token.colorBgContainer}`,
                                    borderRadius: 6,
                                    border: `1px solid ${isCurrentUserRole ? token.colorPrimary : token.colorBorderSecondary}30`
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontWeight: isCurrentUserRole ? 600 : 500,
                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary
                                    }}
                                >
                                    {status.role}
                                </Text>
                                <Text
                                    strong
                                    style={{
                                        fontSize: 11,
                                        color: status.status > 0 ? "black" : token.colorSuccess
                                    }}
                                >
                                    {status.status > 0 ? status.status : "Approved"}
                                </Text>
                            </div>
                        );
                    })}
                </div>
            );
        }
        // Phase II: Show only one role based on current user
        else if (phaseIndex === 1) {
            const currentUserRole = localStorage.getItem("role");

            // Determine which role to show
            let displayStatus = null;
            let displayRole = "";
            let isCurrentUserResponsible = false;

            if (currentUserRole === "ROLE_HOD") {
                // Show HOD role
                displayStatus = statusCounts.find(s => s.role === "HOD");
                displayRole = "HOD";
                isCurrentUserResponsible = isCurrentUserRoleInRootCauseForm(roleArray, phaseIndex, 0); // HOD is at index 0
            } else if (currentUserRole === "ROLE_DESIGNEE") {
                // Show DESIGNEE role
                displayStatus = statusCounts.find(s => s.role === "DESIGNEE");
                displayRole = "DESIGNEE";
                isCurrentUserResponsible = isCurrentUserRoleInRootCauseForm(roleArray, phaseIndex, 1); // DESIGNEE is at index 1
            } else {
                // Show HOD by default (or first role)
                displayStatus = statusCounts[0];
                displayRole = "HOD";
                isCurrentUserResponsible = false;
            }

            if (!displayStatus) return null;

            // Single role display like normal forms
            if (displayStatus.status > 0) {
                return (
                    <Tooltip title={`Approver: ${displayRole}${isCurrentUserResponsible ? ' (Your Responsibility)' : ''}`} placement="top">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <span style={{ fontSize: 15, fontWeight: "bold" }}>
                                {displayStatus.status}
                            </span>
                            <div
                                style={{
                                    marginTop: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: 11,
                                }}
                            >
                                <UserOutlined
                                    style={{
                                        marginRight: 6,
                                        color: isCurrentUserResponsible ? token.colorPrimary : token.colorTextTertiary,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: isCurrentUserResponsible ? token.colorPrimary : token.colorTextTertiary,
                                        fontWeight: isCurrentUserResponsible ? 700 : 600
                                    }}
                                >
                                    {displayRole}
                                </Text>
                            </div>
                        </div>
                    </Tooltip>
                );
            } else {
                return (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Tag
                            icon={<CheckCircleOutlined />}
                            color="success"
                            style={{
                                margin: 0,
                                border: "none",
                                fontWeight: 600,
                                fontSize: 11
                            }}
                        >
                            Approved
                        </Tag>
                        <div
                            style={{
                                marginTop: 8,
                                display: "flex",
                                alignItems: "center",
                                fontSize: 11,
                            }}
                        >
                            <UserOutlined
                                style={{
                                    marginRight: 6,
                                    color: isCurrentUserResponsible ? token.colorPrimary : token.colorTextTertiary,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: isCurrentUserResponsible ? token.colorPrimary : token.colorTextTertiary,
                                    fontWeight: 600
                                }}
                            >
                                {displayRole}
                            </Text>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div style={{
                padding: "5px 3px",
                borderRadius: 8,
                backgroundColor: `${token.colorBorderSecondary}10`,
                border: `2px solid ${token.colorBorderSecondary}20`
            }}>
                <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                    -
                </Text>
            </div>
        );
    };

    // Render third special form cell (WORK ORDER REQUEST FORM)
    const renderThirdSpecialFormCell = (formStatus, phaseIndex, roleArray) => {
        const statusCounts = getWorkOrderFormStatusCounts(formStatus, phaseIndex);

        if (statusCounts.length === 0) {
            return (
                <div style={{
                    padding: "5px 3px",
                    borderRadius: 8,
                    backgroundColor: `${token.colorBorderSecondary}10`,
                    border: `2px solid ${token.colorBorderSecondary}20`
                }}>
                    <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                        -
                    </Text>
                </div>
            );
        }

        if (phaseIndex === 0 || phaseIndex === 2) {
            // Phase I & III: Single status display (HOD)
            const status = statusCounts[0];
            const isCurrentUserRole = isCurrentUserRoleInWorkOrderForm(roleArray, phaseIndex);

            if (status.status > 0) {
                return (
                    <Tooltip title={`Approver: ${status.role}${isCurrentUserRole ? ' (Your Responsibility)' : ''}`} placement="top">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <span style={{ fontSize: 15, fontWeight: "bold" }}>
                                {status.status}
                            </span>
                            <div
                                style={{
                                    marginTop: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: 11,
                                }}
                            >
                                <UserOutlined
                                    style={{
                                        marginRight: 6,
                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                        fontWeight: isCurrentUserRole ? 700 : 600
                                    }}
                                >
                                    {status.role}
                                </Text>
                            </div>
                        </div>
                    </Tooltip>
                );
            } else {
                return (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Tag
                            icon={<CheckCircleOutlined />}
                            color="success"
                            style={{
                                margin: 0,
                                border: "none",
                                fontWeight: 600,
                                fontSize: 11
                            }}
                        >
                            Approved
                        </Tag>
                        <div
                            style={{
                                marginTop: 8,
                                display: "flex",
                                alignItems: "center",
                                fontSize: 11,
                            }}
                        >
                            <UserOutlined
                                style={{
                                    marginRight: 6,
                                    color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                    fontWeight: 600
                                }}
                            >
                                {status.role}
                            </Text>
                        </div>
                    </div>
                );
            }
        } else if (phaseIndex === 1) {
            // Phase II: Multiple status display (all four engineering roles)
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    width: "100%"
                }}>
                    {statusCounts.map((status, index) => {
                        const isCurrentUserRole = isCurrentUserRoleInWorkOrderForm(roleArray, phaseIndex, index);

                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "4px 8px",
                                    backgroundColor: isCurrentUserRole ? `${token.colorPrimary}12` : `${token.colorBgContainer}`,
                                    borderRadius: 6,
                                    border: `1px solid ${isCurrentUserRole ? token.colorPrimary : token.colorBorderSecondary}30`
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 10,
                                        fontWeight: isCurrentUserRole ? 600 : 500,
                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary
                                    }}
                                >
                                    {status.role}
                                </Text>
                                <Text
                                    strong
                                    style={{
                                        fontSize: 11,
                                        color: status.status > 0 ? "black" : token.colorSuccess
                                    }}
                                >
                                    {status.status > 0 ? status.status : "Approved"}
                                </Text>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    // Approval Status Tab Content
    const renderApprovalStatusTab = () => (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: token.colorPrimary,
                                    borderRadius: "4px",
                                }}
                            />
                            <Text style={{ fontSize: "13px", color: token.colorTextSecondary }}>
                                Your Pending
                            </Text>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: token.colorTextTertiary,
                                    borderRadius: "4px",
                                }}
                            />
                            <Text style={{ fontSize: "13px", color: token.colorTextSecondary }}>
                                Others Pending
                            </Text>
                        </div>
                    </div>
                </Col>
            </Row>

            <Spin
                spinning={isTableLoading}
                tip="Loading forms data..."
                size="large"
                style={{ width: '100%' }}
            >
                <div style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                    background: token.colorBgContainer,
                    margin: "0 0 24px 0",
                    transition: "all 0.3s ease",
                    border: "none",
                    opacity: isTableLoading ? 0.7 : 1,
                }}>
                    <div style={{
                        overflowX: "auto",
                        width: "100%"
                    }}>
                        <table
                            style={{
                                width: "auto",
                                minWidth: "100%",
                                borderCollapse: "collapse",
                                backgroundColor: token.colorBgContainer,
                                border: "none",
                            }}
                        >
                            <thead>
                                <tr style={{
                                    background: "#3e6cc7ff",
                                    border: "none",
                                }}>
                                    <th style={{
                                        padding: "8px 8px",
                                        textAlign: "center",
                                        color: "white",
                                        border: "none",
                                        borderRight: `2px solid ${token.colorPrimary}80`,
                                        borderBottom: `2px solid ${token.colorPrimary}80`,
                                        minWidth: "80px",
                                    }}>
                                        <Text strong style={{ fontSize: '15px', fontWeight: 'bolder', color: "white" }}>
                                            S.No
                                        </Text>
                                    </th>
                                    <th style={{
                                        padding: "8px 8px",
                                        textAlign: "center",
                                        color: "white",
                                        border: "none",
                                        borderRight: `2px solid ${token.colorPrimary}80`,
                                        borderBottom: `2px solid ${token.colorPrimary}80`,
                                        minWidth: "250px",
                                    }}>
                                        <Text strong style={{ fontSize: '15px', fontWeight: 'bolder', color: "white" }}>
                                            Form Name
                                        </Text>
                                    </th>
                                    {Array.from({ length: maxPhases }).map((_, index) => (
                                        <th key={index} style={{
                                            padding: "8px 8px",
                                            textAlign: "center",
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: "white",
                                            border: "none",
                                            borderRight: `2px solid ${token.colorPrimary}80`,
                                            borderBottom: `2px solid ${token.colorPrimary}80`,
                                            minWidth: index === 0 || index === 1 ? "160px" : "140px"
                                        }}>
                                            <div style={{ textAlign: "center" }}>
                                                <div style={{ fontSize: "14px" }}>
                                                    {romanLetters[index]}
                                                </div>
                                                <div>
                                                    <Text strong style={{ fontSize: '15px', fontWeight: 'bolder', color: "white" }}>
                                                        Approval
                                                    </Text>
                                                    <br />
                                                    <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.9)" }}>
                                                        Pending
                                                    </Text>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={maxPhases + 2}
                                            style={{
                                                textAlign: "center",
                                                padding: "40px 20px",
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                color: token.colorTextSecondary,
                                                borderBottom: `2px solid ${token.colorBorderSecondary}`,
                                                borderRight: `2px solid ${token.colorBorderSecondary}`,
                                                borderLeft: `2px solid ${token.colorBorderSecondary}`,
                                                backgroundColor: token.colorBgContainer
                                            }}
                                        >
                                            No Records Found
                                        </td>
                                    </tr>
                                ) : (
                                    currentPageData.map((record, rowIndex) => {
                                        const globalIndex = (currentPage - 1) * pageSize + rowIndex;
                                        const isFirstSpecialForm = record.formName === "PH-ENG01/FC-003  BREAKDOWN INTIMATION SLIP";
                                        const isSecondSpecialForm = record.formName === "PH-ENG01/FC-004  ROOT CAUSE ANALYSIS";
                                        const isThirdSpecialForm = record.formName === "PH-ENG01/FC-020  WORK ORDER REQUEST FORM";

                                        return (
                                            <tr
                                                key={globalIndex}
                                                style={{
                                                    border: "none",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <td style={{
                                                    padding: "10px 8px",
                                                    textAlign: "center",
                                                    verticalAlign: "middle",
                                                    border: "none",
                                                    borderRight: `2px solid ${token.colorBorderSecondary}`,
                                                    borderBottom: `2px solid ${token.colorBorderSecondary}`,
                                                    backgroundColor: token.colorBgContainer,
                                                }}>
                                                    <div style={{ fontSize: "14px" }}>
                                                        {globalIndex + 1}
                                                    </div>
                                                </td>

                                                <td style={{
                                                    padding: "10px 8px",
                                                    textAlign: "left",
                                                    verticalAlign: "middle",
                                                    border: "none",
                                                    borderRight: `2px solid ${token.colorBorderSecondary}`,
                                                    borderBottom: `2px solid ${token.colorBorderSecondary}`,
                                                    backgroundColor: token.colorBgContainer,
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}>
                                                        <Avatar
                                                            icon={<FileDoneOutlined />}
                                                            style={{
                                                                backgroundColor: token.colorPrimary,
                                                                color: "white",
                                                                marginLeft: 10,
                                                                marginRight: 10,
                                                                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                                                                width: "30px",
                                                                height: "30px",
                                                                minWidth: "30px",
                                                                flexShrink: 0,
                                                                fontSize: "15px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center"
                                                            }}
                                                        />
                                                        <Text strong style={{ color: token.colorTextHeading, fontSize: 12 }}>
                                                            {record.formName}
                                                        </Text>
                                                    </div>
                                                </td>

                                                {Array.from({ length: maxPhases }).map((_, phaseIndex) => {
                                                    if (isFirstSpecialForm) {
                                                        // First special form handling
                                                        const hasStatus = record.formStatus.length > 0;

                                                        if (hasStatus && phaseIndex < 4) { // First special form has max 4 phases
                                                            const roleValue = record.userRole[phaseIndex];
                                                            const isCurrentUserRole = isCurrentUserRoleInSpecialForm(roleValue, phaseIndex);
                                                            const isSupervisor = localStorage.getItem("role") === "ROLE_SUPERVISOR"
                                                            const cellStyle = {
                                                                padding: "10px 8px",
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                border: `1px solid ${token.colorBorderSecondary}`,
                                                                borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                transition: "all 0.3s ease",
                                                                backgroundColor: isCurrentUserRole && isSupervisor ? `${token.colorPrimary}12` : `${token.colorBgContainer}`,
                                                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                                            };

                                                            return (
                                                                <td key={phaseIndex} style={cellStyle}>
                                                                    {renderFirstSpecialFormCell(record.formStatus, phaseIndex, roleValue)}
                                                                </td>
                                                            );
                                                        } else {
                                                            // Return empty cell with borders for phases beyond form's actual phases
                                                            return (
                                                                <td key={phaseIndex} style={{
                                                                    padding: "10px 8px",
                                                                    textAlign: "center",
                                                                    verticalAlign: "middle",
                                                                    border: `1px solid ${token.colorBorderSecondary}`,
                                                                    borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                    backgroundColor: token.colorBgContainer
                                                                }}>
                                                                    <div style={{
                                                                        padding: "5px 3px",
                                                                        borderRadius: 8,
                                                                        backgroundColor: `${token.colorBorderSecondary}10`,
                                                                        border: `2px solid ${token.colorBorderSecondary}20`
                                                                    }}>
                                                                        <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                                                                            -
                                                                        </Text>
                                                                    </div>
                                                                </td>
                                                            );
                                                        }
                                                    }
                                                    else if (isSecondSpecialForm) {
                                                        // Second special form handling
                                                        const hasStatus = record.formStatus.length > 0;

                                                        if (hasStatus && phaseIndex < 2) { // Second special form has max 2 phases
                                                            const roleValue = record.userRole[phaseIndex];
                                                            const currentUserRole = localStorage.getItem("role");
                                                            const isHODorDes = currentUserRole === "ROLE_HOD" || currentUserRole === "ROLE_DESIGNEE";
                                                            let isCurrentUserRole = false;
                                                            if (phaseIndex === 0) {
                                                                isCurrentUserRole = isCurrentUserRoleInRootCauseForm(roleValue, phaseIndex);
                                                            } else if (phaseIndex === 1) {
                                                                console.log("Array.isArray(roleValue) 2", Array.isArray(roleValue))
                                                                // Phase II: Check if current user is HOD or DESIGNEE
                                                                if (Array.isArray(roleValue)) {
                                                                    isCurrentUserRole = roleValue.includes(currentUserRole);
                                                                } else {
                                                                    isCurrentUserRole = roleValue === currentUserRole;
                                                                }
                                                            }
                                                            const cellStyle = {
                                                                padding: "10px 8px",
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                border: `1px solid ${token.colorBorderSecondary}`,
                                                                borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                transition: "all 0.3s ease",
                                                                backgroundColor: isHODorDes && isCurrentUserRole ? `${token.colorPrimary}12` : `${token.colorBgContainer}`,
                                                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                                            };

                                                            return (
                                                                <td key={phaseIndex} style={cellStyle}>
                                                                    {renderSecondSpecialFormCell(record.formStatus, phaseIndex, roleValue)}
                                                                </td>
                                                            );
                                                        } else {
                                                            // Return empty cell with borders for phases beyond form's actual phases
                                                            return (
                                                                <td key={phaseIndex} style={{
                                                                    padding: "10px 8px",
                                                                    textAlign: "center",
                                                                    verticalAlign: "middle",
                                                                    border: `1px solid ${token.colorBorderSecondary}`,
                                                                    borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                    backgroundColor: token.colorBgContainer
                                                                }}>
                                                                    <div style={{
                                                                        padding: "5px 3px",
                                                                        borderRadius: 8,
                                                                        backgroundColor: `${token.colorBorderSecondary}10`,
                                                                        border: `2px solid ${token.colorBorderSecondary}20`
                                                                    }}>
                                                                        <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                                                                            -
                                                                        </Text>
                                                                    </div>
                                                                </td>
                                                            );
                                                        }
                                                    }
                                                    else if (isThirdSpecialForm) {
                                                        // Third special form handling
                                                        const hasStatus = record.formStatus.length > 0;

                                                        if (hasStatus && phaseIndex < 3) { // Third special form has max 3 phases
                                                            const roleValue = record.userRole[phaseIndex];
                                                            const currentUserRole = localStorage.getItem("role");

                                                            const isHOD = currentUserRole === "ROLE_HOD";
                                                            let isCurrentUserRole = false;
                                                            if (phaseIndex === 0 || phaseIndex === 2) {
                                                                // Phase I & III: Check HOD role
                                                                console.log("Array.isArray(roleValue) 3", Array.isArray(roleValue))
                                                                if (Array.isArray(roleValue)) {
                                                                    isCurrentUserRole = roleValue.includes(currentUserRole);
                                                                } else {
                                                                    isCurrentUserRole = roleValue === currentUserRole;
                                                                }
                                                            } else if (phaseIndex === 1) {
                                                                // Phase II: Check engineering roles
                                                                if (Array.isArray(roleValue)) {
                                                                    isCurrentUserRole = roleValue.includes(currentUserRole);
                                                                }
                                                            }

                                                            const cellStyle = {
                                                                padding: "10px 8px",
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                border: `1px solid ${token.colorBorderSecondary}`,
                                                                borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                transition: "all 0.3s ease",
                                                                backgroundColor: isHOD && isCurrentUserRole ? `${token.colorPrimary}12` : `${token.colorBgContainer}`,
                                                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                                            };

                                                            return (
                                                                <td key={phaseIndex} style={cellStyle}>
                                                                    {renderThirdSpecialFormCell(record.formStatus, phaseIndex, roleValue)}
                                                                </td>
                                                            );
                                                        } else {
                                                            // Return empty cell with borders for phases beyond form's actual phases
                                                            return (
                                                                <td key={phaseIndex} style={{
                                                                    padding: "10px 8px",
                                                                    textAlign: "center",
                                                                    verticalAlign: "middle",
                                                                    border: `1px solid ${token.colorBorderSecondary}`,
                                                                    borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                    backgroundColor: token.colorBgContainer
                                                                }}>
                                                                    <div style={{
                                                                        padding: "5px 3px",
                                                                        borderRadius: 8,
                                                                        backgroundColor: `${token.colorBorderSecondary}10`,
                                                                        border: `2px solid ${token.colorBorderSecondary}20`
                                                                    }}>
                                                                        <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                                                                            -
                                                                        </Text>
                                                                    </div>
                                                                </td>
                                                            );
                                                        }
                                                    }
                                                    else {
                                                        // Normal form handling
                                                        const hasStatus = record.formStatus.length > phaseIndex;

                                                        if (hasStatus) {
                                                            const statusCount = record.formStatus[phaseIndex];
                                                            const currentUserRole = localStorage.getItem("role");

                                                            let isCurrentUserRole = false;
                                                            if (Array.isArray(record.userRole[phaseIndex])) {
                                                                isCurrentUserRole = record.userRole[phaseIndex].includes(currentUserRole);
                                                            } else {
                                                                isCurrentUserRole = record.userRole[phaseIndex] === currentUserRole;
                                                            }

                                                            const roleForPhase = (() => {
                                                                const roleValue = record.userRole[phaseIndex];

                                                                if (Array.isArray(roleValue)) {
                                                                    if (roleValue.includes(currentUserRole)) {
                                                                        return currentUserRole
                                                                            .replace(/^ROLE_/, "")
                                                                            .replace(/_/g, " ")
                                                                            .trim();
                                                                    } else {
                                                                        return getDisplayRoleName(roleValue[0]);
                                                                    }
                                                                } else {
                                                                    return getDisplayRoleName(roleValue);
                                                                }
                                                            })();

                                                            const cellStyle = {
                                                                padding: "10px 8px",
                                                                textAlign: "center",
                                                                verticalAlign: "middle",
                                                                border: `1px solid ${token.colorBorderSecondary}`,
                                                                borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                transition: "all 0.3s ease",
                                                                backgroundColor: isCurrentUserRole ? `${token.colorPrimary}12` : `${token.colorBgContainer}`,
                                                                borderLeft: `1px solid ${token.colorBorderSecondary}`,
                                                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                                            };

                                                            if (statusCount > 0) {
                                                                return (
                                                                    <td key={phaseIndex} style={cellStyle}>
                                                                        <Tooltip title={`Approver: ${roleForPhase}${isCurrentUserRole ? ' (Your Responsibility)' : ''}`} placement="top">
                                                                            <div style={{
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                alignItems: "center",
                                                                                justifyContent: "center",
                                                                            }}>
                                                                                <span style={{ fontSize: 15, fontWeight: "bold" }}>
                                                                                    {statusCount}
                                                                                </span>
                                                                                <div
                                                                                    style={{
                                                                                        marginTop: 12,
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        fontSize: 11,
                                                                                    }}
                                                                                >
                                                                                    <UserOutlined
                                                                                        style={{
                                                                                            marginRight: 6,
                                                                                            color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                                                                        }}
                                                                                    />
                                                                                    <Text
                                                                                        style={{
                                                                                            fontSize: 11,
                                                                                            color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                                                                            fontWeight: isCurrentUserRole ? 700 : 600
                                                                                        }}
                                                                                    >
                                                                                        {roleForPhase}
                                                                                    </Text>
                                                                                </div>
                                                                            </div>
                                                                        </Tooltip>
                                                                    </td>
                                                                );
                                                            } else {
                                                                return (
                                                                    <td key={phaseIndex} style={cellStyle}>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                        }}>
                                                                            <Tag
                                                                                icon={<CheckCircleOutlined />}
                                                                                color="success"
                                                                                style={{
                                                                                    margin: 0,
                                                                                    border: "none",
                                                                                    fontWeight: 600,
                                                                                    fontSize: 11
                                                                                }}
                                                                            >
                                                                                Approved
                                                                            </Tag>
                                                                            <div
                                                                                style={{
                                                                                    marginTop: 8,
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    fontSize: 11,
                                                                                }}
                                                                            >
                                                                                <UserOutlined
                                                                                    style={{
                                                                                        marginRight: 6,
                                                                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                                                                    }}
                                                                                />
                                                                                <Text
                                                                                    style={{
                                                                                        fontSize: 11,
                                                                                        color: isCurrentUserRole ? token.colorPrimary : token.colorTextTertiary,
                                                                                        fontWeight: 600
                                                                                    }}
                                                                                >
                                                                                    {roleForPhase}
                                                                                </Text>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                );
                                                            }
                                                        } else {
                                                            // Return empty cell with borders for phases beyond form's actual phases
                                                            return (
                                                                <td key={phaseIndex} style={{
                                                                    padding: "10px 8px",
                                                                    textAlign: "center",
                                                                    verticalAlign: "middle",
                                                                    border: `1px solid ${token.colorBorderSecondary}`,
                                                                    borderRight: phaseIndex === maxPhases - 1 ? `1px solid ${token.colorBorderSecondary}` : `1px solid ${token.colorBorderSecondary}`,
                                                                    borderBottom: `1px solid ${token.colorBorderSecondary}`,
                                                                    backgroundColor: token.colorBgContainer
                                                                }}>
                                                                    <div style={{
                                                                        padding: "5px 3px",
                                                                        borderRadius: 8,
                                                                        backgroundColor: `${token.colorBorderSecondary}10`,
                                                                        border: `2px solid ${token.colorBorderSecondary}20`
                                                                    }}>
                                                                        <Text type="secondary" style={{ fontSize: 20, fontWeight: "600" }}>
                                                                            -
                                                                        </Text>
                                                                    </div>
                                                                </td>
                                                            );
                                                        }
                                                    }
                                                })}
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Spin>

            <div style={{
                padding: "16px",
                borderTop: `2px solid ${token.colorBorderSecondary}`,
                backgroundColor: token.colorBgContainer,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px"
            }}>
                <Text strong style={{ color: token.colorTextSecondary }}>
                    {`Showing ${((currentPage - 1) * pageSize) + 1} to ${Math.min(currentPage * pageSize, totalItems)} of ${totalItems} forms`}
                </Text>


                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <Button
                            size="small"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </Button>

                        {getPageNumbers().map(page => (
                            <Button
                                key={page}
                                size="small"
                                type={currentPage === page ? "primary" : "default"}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            size="small"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Pending BMR Tab Content
    const renderPendingBmrTab = () => (
        <div>
            <Spin
                spinning={isBmrLoading}
                tip="Loading BMR data..."
                size="large"
                style={{ width: '100%' }}
            >
                <Row gutter={[16, 16]}>
                    {bmrData.map((form, index) => (
                        <Col xs={24} lg={12} key={index}>
                            <Card
                                bordered={false}
                                style={{
                                    borderRadius: 16,
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                    border: `1px solid ${token.colorBorderSecondary}`,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    ':hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                                    }
                                }}
                                bodyStyle={{ padding: '20px' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div style={{ flex: 1 }}>
                                        <Title level={5} style={{
                                            margin: 0,
                                            marginBottom: 8,
                                            color: token.colorTextHeading,
                                            lineHeight: 1.4
                                        }}>
                                            {form.formName}
                                        </Title>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                            <Tag color="blue" style={{ margin: 0, border: 'none', fontWeight: 600 }}>
                                                {form.departmentName}
                                            </Tag>
                                        </div>
                                    </div>
                                    <Badge
                                        count={form.pendingCount}
                                        style={{
                                            backgroundColor: token.colorError,
                                            boxShadow: `0 0 0 2px ${token.colorBgContainer}`
                                        }}
                                    />
                                </div>

                                <div style={{
                                    background: `${token.colorPrimary}08`,
                                    padding: '16px',
                                    borderRadius: 12,
                                    marginBottom: 16,
                                    border: `1px solid ${token.colorPrimary}20`
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Text strong style={{ color: token.colorPrimary, fontSize: 14 }}>
                                                Pending BMR Records
                                            </Text>
                                            <Text style={{ display: 'block', color: token.colorTextSecondary, fontSize: 12 }}>
                                                {form.pendingCount === 0 ? `No records to close` : `${form.pendingCount} records need to close`}
                                            </Text>
                                        </div>
                                        <Button
                                            type="primary"
                                            icon={<EyeOutlined />}
                                            onClick={() => handleViewBmr(form)}
                                            style={{
                                                background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #00308F 100%)`,
                                                border: 'none',
                                                borderRadius: 8,
                                                fontWeight: 600,
                                                boxShadow: '0 2px 8px rgba(0, 48, 143, 0.3)'
                                            }}
                                        >
                                            View BMR
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Spin>
        </div>
    );

    return (
        <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
            <BleachingHeader
                formName={"Pending Approval Dashboard"}
                formatNo={"Monitor form-level pending approvals across different phases"}
                MenuBtn={
                    <Button
                        type="primary"
                        icon={<TbMenuDeep />}
                        onClick={() => setSidebarOpen(true)}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 8
                        }}
                    />
                }
                buttonsArray={[
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "#e5eef923",
                            color: "#ffffffff",
                            fontWeight: "bold",
                        }}
                        shape="round"
                        icon={<BiLock color="#ffffffff" />}
                        onClick={() => {
                            if (window.confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                            }
                        }}
                    >
                        Logout
                    </Button>,
                ]}
            />

            <PrecotSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* <Spin
                spinning={isFormsLoading && isBmrLoading}
                tip="Loading dashboard..."
                size="large"
                style={{ width: '100%', minHeight: '400px' }}
            > */}
            <Card
                bordered={false}
                style={{
                    margin: "20px",
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    opacity: (isFormsLoading || isBmrLoading) ? 0.8 : 1,
                }}
                bodyStyle={{ padding: 0 }}
            >
                <div style={{ padding: "24px" }}>
                    <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
                        <Col xs={24} sm={8}>
                            <Card
                                bordered={false}
                                bodyStyle={{ padding: '20px 24px' }}
                                style={{
                                    background: `linear-gradient(135deg, ${token.colorPrimary}15 0%, ${token.colorPrimary}05 100%)`,
                                    borderRadius: 12,
                                    border: `2px solid ${token.colorPrimary}20`,
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: 14,
                                            color: token.colorTextSecondary,
                                            marginBottom: 8,
                                            fontWeight: 500
                                        }}>
                                            Total Forms
                                        </div>
                                        <div style={{
                                            fontSize: 32,
                                            fontWeight: 700,
                                            color: token.colorPrimary,
                                            lineHeight: 1,
                                        }}>
                                            {totalForms}
                                        </div>
                                        <div style={{
                                            fontSize: 12,
                                            color: token.colorTextTertiary,
                                            marginTop: 4,
                                        }}>
                                            Accessible forms
                                        </div>
                                    </div>
                                    <div style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 12,
                                        background: `${token.colorPrimary}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <FileDoneOutlined style={{
                                            fontSize: 28,
                                            color: token.colorPrimary,
                                        }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={8}>
                            <Card
                                bordered={false}
                                bodyStyle={{ padding: '20px 24px' }}
                                style={{
                                    background: `linear-gradient(135deg, #f59e0b15 0%, #f59e0b05 100%)`,
                                    borderRadius: 12,
                                    border: `2px solid #ef444420`,
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: 14,
                                            color: '#dc2626',
                                            marginBottom: 8,
                                            fontWeight: 500
                                        }}>
                                            Overall Pending
                                        </div>
                                        <div style={{
                                            fontSize: 32,
                                            fontWeight: 700,
                                            color: '#dc2626',
                                            lineHeight: 1,
                                        }}>
                                            {totalPending}
                                        </div>
                                        <div style={{
                                            fontSize: 12,
                                            color: '#dc2626',
                                            marginTop: 4,
                                        }}>
                                            Across all roles
                                        </div>
                                    </div>
                                    <div style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 12,
                                        background: `#f59e0b15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <ClockCircleOutlined style={{
                                            fontSize: 28,
                                            color: '#dc2626',
                                        }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={8}>
                            <Card
                                bordered={false}
                                bodyStyle={{ padding: '20px 24px' }}
                                style={{
                                    background: `linear-gradient(135deg, #10b98115 0%, #10b98105 100%)`,
                                    borderRadius: 12,
                                    border: `2px solid #10b98120`,
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: 14,
                                            color: '#059669',
                                            marginBottom: 8,
                                            fontWeight: 500
                                        }}>
                                            Your Pending
                                        </div>
                                        <div style={{
                                            fontSize: 32,
                                            fontWeight: 700,
                                            color: '#059669',
                                            lineHeight: 1,
                                        }}>
                                            {rolePendingCount}
                                        </div>
                                        <div style={{
                                            fontSize: 12,
                                            color: '#059669',
                                            marginTop: 4,
                                        }}>
                                            Your responsibility
                                        </div>
                                    </div>
                                    <div style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 12,
                                        background: "#10b98115",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <UserOutlined style={{
                                            fontSize: 28,
                                            color: '#059669',
                                        }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Tabs
                        defaultActiveKey="approval-status"
                        style={{
                            background: token.colorBgContainer,
                            borderRadius: 12,
                        }}
                        items={[
                            {
                                key: "approval-status",
                                label: (
                                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <FileDoneOutlined />
                                        Pending Form Status
                                    </span>
                                ),
                                children: renderApprovalStatusTab(),
                            },
                            ...(departmentId === 1 ||
                                departmentId === 2 ||
                                departmentId === 3 ||
                                departmentId === 4 ||
                                departmentId === 12 &&
                                bmrData?.length > 0
                                ? [
                                    {
                                        key: "pending-bmr",
                                        label: (
                                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <ClockCircleOutlined />
                                                Pending BMR
                                                <Badge
                                                    count={bmrData.reduce(
                                                        (sum, form) => sum + form.pendingCount,
                                                        0
                                                    )}
                                                    style={{
                                                        backgroundColor: token.colorError,
                                                        marginLeft: 4,
                                                    }}
                                                />
                                            </span>
                                        ),
                                        children: renderPendingBmrTab(),
                                    },
                                ]
                                : []),
                        ]}
                    />
                </div>
            </Card>
            {/* </Spin> */}

            <BMRModal
                visible={bmrModalVisible}
                onClose={() => setBmrModalVisible(false)}
                formData={selectedForm}
            />
        </div>
    );
};

export default DashboardPage;