
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import BleachingHeader from '../Components/BleachingHeader';
import BleachingTail from '../Components/BleachingTail';
import { Button, Spin, message, Tooltip, Table, Space, Tag } from "antd";
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import axios from 'axios';
import moment from 'moment';
import { DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import BleachingPrintHeader from '../Components/BleachingPrintHeader';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import logo from "../Assests/logo.png"
// import "./Nishatharan.css"
import { IoSave, IoPrint } from 'react-icons/io5';
import { GrDocumentStore } from 'react-icons/gr';
import { BiLock } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import API from "../baseUrl.json";
import { IoCreate } from 'react-icons/io5';
import { Modal, Form, Drawer, Menu, Avatar, Row, Col } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { GoArrowLeft } from 'react-icons/go';
import TextArea from 'antd/es/input/TextArea';
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Bleaching_f33 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { slashDate } = location.state || {};
    const convertDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };
    const ddFormat = convertDate(slashDate);
    const[pageNumber,setTotalPageNumber] =useState();

    const [displayFormat, setDisplayFormat] = useState(ddFormat);
    // console.log('slashsdfffff', slashDate);


    const formName = "Equipment Usage Log Book - Waste Bale Press";
    const formatNo = "PH-PRD01/F-015";
    const revisionNo = "01";
    const sopNo = "PRD01-D";
    const pageNo = "01 of 01";
    // const yearformattedDate = slashDate && moment(slashDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    // // console.log('yearFormatted', yearformattedDate);
    // const todayFormatted = yearformattedDate ? yearformattedDate : moment().format('YYYY-MM-DD');
    // // console.log("todayFormatted", todayFormatted);
    // const todaySlashFormatted = slashDate ? slashDate : moment().format('DD/MM/YYYY');
    // console.log("toodayslashhhh", slashDate);




    // const [todaySlashFormatted, setTodaySlashFormatted] = useState(moment().format('DD/MM/YYYY'));
    // const [todaySlashFormatted,setTodaySlashFormatted] = useState(moment().format('DD/MM/YYYY'));
    // // console.log("today", todayFormatted);
    const [saveLoading, setSaveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [rejectRemarks, setRejectRemarks] = useState("");
    const[id,setId]=useState("");
    const role = localStorage.getItem('role');
    const [messageApi, contextHolder] = message.useMessage();
    const [isSupervisorSubmitted, setIsSupervisorSubmitted] = useState(false);
    const notificationMessage = (messageType, errorMessage) => {
        messageApi.open({
            type: messageType,
            content: errorMessage,
        });
    };
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

  //   const [getImage, setGetImage] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const username = formData?.supervisor_sign;
  //   if (username) {
  //     // console.log("usernameparams", username);

  //     axios
  //       .get(
  //         `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           responseType: "arraybuffer",
  //         }
  //       )
  //       .then((res) => {
  //         // console.log("Response:", res.data);
  //         const base64 = btoa(
  //           new Uint8Array(res.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );
  //         const url = `data:image/jpeg;base64,${base64}`;
  //         setGetImage(url);
  //       })
  //       .catch((err) => {
  //         // console.log("Error in fetching image:", err);
  //       });
  //   }
  // }, [formData,API.prodUrl, token]);

  // const [getImage1, setGetImage1] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const username = formData?.hod_sign;
  //   if (username) {
  //     // console.log("usernameparams", username);

  //     axios
  //       .get(
  //         `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           responseType: "arraybuffer",
  //         }
  //       )
  //       .then((res) => {
  //         // console.log("Response:", res.data);
  //         const base64 = btoa(
  //           new Uint8Array(res.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );
  //         const url = `data:image/jpeg;base64,${base64}`;
  //         setGetImage1(url);
  //       })
  //       .catch((err) => {
  //         // console.log("Error in fetching image:", err);
  //       });
  //   }
  // }, [formData,API.prodUrl, token]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
       
        return `${day}/${month}/${year} ${hours}:${minutes}`;

       
    };

    // let formattedDate = moment().format('DD-MM-YYYY');
    // let formattedDate = format(currentDate, 'yyyy-MM-dd');
    // // console.log(currentDate);
    const [formattedDate, setFormattedDate] = useState('');
    const [formatted_date, setFormatted_Date] = useState();
    const freshFormData = [
        {
            id:id,
            date: slashDate,
            formatName: formName,
            formatNo: formatNo,
            revisionNo: revisionNo,
            refSopNo: sopNo,
            waste_code: '',
            bale_no: '',
            gross_weight: '',
            net_weight: '',
            remarks: '',
            supervisor_sign: '',
            hod_sign: '',
            status: 'DRAFT'
        }
    ];

    const [formData, setFormData] = useState(
        [
            {

                id: id,
                date: slashDate,
                formatName: formName,
                formatNo: formatNo,
                revisionNo: revisionNo,
                refSopNo: sopNo,
                waste_code: '',
                bale_no: '',
                gross_weight: '',
                net_weight: '',
                remarks: '',
                supervisor_status: 'DRAFT',
                hod_status: '',
                supervisor_sign: '',
                hod_sign: ''
            },

        ]
    );

    const handleChange = (key, value, rowIndex) => {
        // console.log("key", key)
        // console.log("value", value)
        setFormData(prevFormData => {
            const updatedFormData = [...prevFormData];
            // console.log('check', updatedFormData[rowIndex]);
            updatedFormData[rowIndex] = { ...updatedFormData[rowIndex], [key]: value };
            return updatedFormData;
        });
    };
    // const [selectedDate, setSelectedDate] = useState(todayFormatted);
    const validateFields = () => {
        let errors = {};
        formData.map((entry, index) => {

            if (entry.waste_code === '') {
                errors.waste_code = `Entry ${index + 1}: Waste code is required`;
                notificationMessage('error', `Entry ${index + 1}: Waste code is required`);
            }
            if (entry.bale_no === '') {
                errors.bale_no = `Entry ${index + 1}: Bale number is required`;
                notificationMessage('error', `Entry ${index + 1}: Bale number is required`);
            }
            if (entry.gross_weight === '') {
                errors.gross_weight = `Entry ${index + 1}: Gross weight is required`;
                notificationMessage('error', `Entry ${index + 1}: Gross weight is required`)
            }
            if (entry.net_weight === '') {
                errors.net_weight = `Entry ${index + 1}: Net weight is required`;
                notificationMessage('error', `Entry ${index + 1}: Net weight is required`)
            }
        });
        return errors;
    };

    const getBySapDate = (valueFormatted) => {
        const accessToken = localStorage.getItem('token');
        axios.get(`${API.prodUrl}/Precot/api/bleaching/generation/wasteBaleResponse?date=${valueFormatted}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

            .then(response => {

                const newFormData = [];
                response.data.map((row, rowIndex) => {
                    let oneData = {
                        id:row.id,
                        date: slashDate,
                        formatName: formName,
                        formatNo: formatNo,
                        revisionNo: revisionNo,
                        refSopNo: sopNo,
                        waste_code: row.waste_code,
                        bale_no: row.bale_no,
                        gross_weight: row.gross_weight,
                        net_weight: row.net_weight,
                        remarks: '',
                        supervisor_status: '',
                        hod_status: '',
                        supervisor_sign: '',
                        hod_sign: ''
                    }
                    newFormData.push(oneData);
                })
                setFormData(newFormData);
            }

            )
            .catch((error) => {

                notificationMessage('error', error.response.data.message);
                // handleBack();
                setTimeout(() => {
                    handleBack();
                }, 1000);
                return;

            })
    }


    const handleDateChange = (selectDate) => {
        // console.log("selectedDateString", selectDate);
        setLoading(true);
        // const formatted = moment(selectDate).format('DD/MM/YYYY');
        const formatted = selectDate;
        // const valueFormatted = moment(selectDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const valueFormatted = selectDate;
        // console.log('valueF', valueFormatted);
        setFormatted_Date(valueFormatted);
        // // console.log(formatted);
        setFormattedDate(selectDate);


        // API call on click the date
        const accessToken = localStorage.getItem("token");
        axios.get(`${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/EquipmentUsageF33/GetByDate?date=${valueFormatted}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {

                if (!(response.data.length > 0)) {
                    // console.log('entering if');
                    getBySapDate(valueFormatted);
                }
                // console.log('Response:', response.data);
                const updatedFormData = formData.map(item => ({
                    ...item,
                    date: formatted
                }));
                // console.log("updatedFormData", updatedFormData);

                const updatedFreshFormData = freshFormData.map(item => ({
                    ...item,
                    date: formatted
                }));

                // console.log('updatedFreshFormData', updatedFreshFormData);

                setFormData(response.data.length > 0 ? response.data : updatedFreshFormData);

                setIsSupervisorSubmitted(response.data.length > 0 && response.data[0].supervisor_status == "SUPERVISOR_APPROVED" && role == "ROLE_SUPERVISOR" ? true : false);
                // console.log('response Data', formData);

            })
            .catch(error => {
                console.error('There was an error!', error);
                notificationMessage('error', error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            })
            ;
        // console.log("formData", formData);
        // setSelectedDate(selectDate);
        // const ddFormat=convertDate(selectDate);
        setDisplayFormat(ddFormat);

    };



    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");
    const stopLoading = () => {
        setLoading(false);
    };



    const handleApprove = async () => {
      const { slashDate } = location.state || {};
        setSaveLoading(true);
    
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Adjust content type if needed
        };
    
        const res = await axios
          .put(
            `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/approveWasteBaleF33`,
            {
              formatNo : slashDate,
              status: "Approve",
            },
            { headers }
          )
          .then((res) => {
            setLoading(false);
            // console.log("messsage", res);
            // window.location.reload();
            message.success(res.data.message);
            navigate("/Precot/Bleaching/F-33/Summary");
          })
          .catch((err) => {
            setLoading(false);
            // console.log("Err", err.response.data.message);
            message.error(err.response.data.message);
          })
          .finally(() => {
            setSaveLoading(false);
          });
      };
    
      const handleRejectModal = () => {
        setShowModal(true);
        // window.print()
        // console.log("print screen works");
        // Add any other print-related logic here
      };
      const handleReject = async () => {
        setSaveLoading(true);
    
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Adjust content type if needed
        };
    
        if(!rejectRemarks) {
          message.warning('Please Enter the Remarks!');
          setSaveLoading(false);
          return;
        }
    
        const res = await axios
          .put(
            `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/approveWasteBaleF33`,
            {
              formatNo : slashDate,
              status: "Reject",
              remarks: rejectRemarks,
            },
            { headers }
          )
          .then((res) => {
            setLoading(false);
            // console.log("messsage", res.data.message);
            // window.location.reload();
            message.success(res.data.message);
            navigate("/Precot/Bleaching/F-33/Summary");
          })
          .catch((err) => {
            setLoading(false);
            // console.log("Err", err.response.data.message);
            message.error(err.response.data.message);
          })
          .finally(() => {
            setSaveLoading(false);
          });
      };

    const handleSave = () => {
        setSaveLoading(true);
        const accessToken = localStorage.getItem("token");
        if (role == "ROLE_SUPERVISOR") {

            axios.post(`${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/saveEquipmentUsageF33`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    // console.log('Response:', response.data);
                    // handleDateChange(selectedDate);
                    setFormData(response.data);
                    notificationMessage('success', 'Form saved successFully');
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    notificationMessage('error', 'Unable to save');
                })
                .finally(() => {
                    setSaveLoading(false);
                })
                ;
        }
        else if (role == "ROLE_HOD") {
            axios.post(`${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/saveEquipmentUsageF33`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    // console.log('Response:', response.data);
                    // handleDateChange(selectedDate);
                    setFormData(response.data);
                    notificationMessage('success', 'Form saved successFully');
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    notificationMessage('error', 'Unable to save');
                })
                .finally(() => {
                    setSaveLoading(false);
                })
                ;
        }

        // console.log("formData", formData);
    };

    const handleBack = () => {
        // console.log("back button clicked");
        navigate('/Precot/Bleaching/F-33/Summary');
    }
    const handleSubmit = () => {
        setSubmitLoading(true);

        const validationErrors = validateFields();
        // console.log('validate', validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setSubmitLoading(false);
            return;
        }

        const payloads = formData.map(form => ({
            id:form.id,
            date: formatted_date,
            waste_code: form.waste_code,
            gross_weight: form.gross_weight,
            net_weight: form.net_weight,
            bale_no: form.bale_no,
            formatName: formName,
            formatNo: formatNo,
            revisionNo: revisionNo,
            refSopNo: sopNo,
            remarks: form.remarks,
            unit: 'H'
        }));




        // console.log("submitted clicked with payload", payloads)
        const accessToken = localStorage.getItem("token")
        if (role == "ROLE_SUPERVISOR") {
            axios.post(`${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/submitEquipmentUsageF33`, payloads, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    // console.log('Response:', response.data);
                    // handleDateChange(selectedDate);
                    setIsSupervisorSubmitted(true);
                    // setFormData(response.data);
                    notificationMessage('success', response.data.message);

                })
                .catch(error => {
                    console.error('There was an error!', error);
                    notificationMessage('error', error.response.data.message);
                })
                .finally(() => {
                    setSubmitLoading(false);
                    setTimeout(() => {
                        handleBack();
                    }, 1000)

                }
                )

                ;
        }
        else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
            axios.post(`${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/submitEquipmentUsageF33`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    // console.log('Response:', response.data);
                    // handleDateChange(selectedDate);
                    // setFormData(response.data);
                    notificationMessage('success', response.data.message);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    // console.log('errorMessage', error.response.data.message);
                    notificationMessage('error', error.response.data.message);
                })
                .finally(() => {
                    setSubmitLoading(false);
                    setTimeout(() => {
                        handleBack();
                    }, 1000)
                })
                ;
        }


    };



    const [options, setOptions] = useState([]);

    const addRow = () => {
        const lastRow = formData[formData.length - 1];
        let newSn = parseInt(lastRow.sNo) + 1;
        let newDate = lastRow.date


        setFormData([...formData, { sNo: newSn, date: newDate, waste_code: '', bale_no: '', gross_weight: '', net_weight: '', remarks: '' }]);
    };
    const removeLastRow = () => {
        if (formData.length > 1) {
            setFormData(formData.slice(0, -1));
        }
    };



    useEffect(() => {
        // Fetch data from the API
        // setTodaySlashFormatted(slashDate);

        const accessToken = localStorage.getItem('token');
        const fetchData = () => {
            axios.get(`${API.prodUrl}/Precot/api/LOV/Service/baleNumbersLOV`, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include accessToken in the request headers
                }
            })
                .then(response => {
                    const data = response.data;
                    // Map API response to the format needed for options
                    const mappedOptions = data.map(item => ({
                        value: item.value,
                        label: item.value,
                        title: item.description // Tooltip text
                    }));
                    setOptions(mappedOptions);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData(); // Call the function to fetch data
        // console.log('slash date in ble', slashDate);
        handleDateChange(slashDate);
    }, []);


    const handlePrint = () => {



        window.print();


    }

    const handleValidateReadOnly = (data) => {

        if (role == "ROLE_SUPERVISOR") {
            return data.supervisor_status == "SUPERVISOR_APPROVED";
        }
        else {
            return data.hod_status === "HOD_SUBMITTED" || data.hod_status === "HOD_APPROVED";
        }

    }

    const canDisplayButtons = () => {
        if (role == "ROLE_SUPERVISOR") {
            if (formData[0].supervisor_status == "SUPERVISOR_APPROVED" && (formData[0].hod_status == "HOD_APPROVED" || formData[0].hod_status == "WAITING_FOR_APPROVAL")) {
                return "none";
            }
            return "block";
        }
        else {
            if (formData[0].supervisor_status == "" || formData[0].hod_status == "HOD_APPROVED" || formData[0].hod_status == "HOD_REJECTED") {
                return "none";
            }
            return "block";
        }

    }
    const canDisplayAddRow = () => {
        if (role == "ROLE_SUPERVISOR") {
            if (formData[0].supervisor_status == "SUPERVISOR_APPROVED") {
                return "none";
            }
            return "block";
        }
        return "none";
    }

    const canDisplayPrintButtons = () => {

        if (formData[0].hod_status == "HOD_APPROVED") {
            return "block"
        }
        return "none";

    }


    const [isPrintHeaderVis, setIsPrintHeaderVis] = useState(false);
    const dateFormat = 'DD/MM/YYYY';
    const defaultDateFormat = 'YYYY-MM-DD';
    const columns = [
        {
            title: 'Format Name',
            dataIndex: 'formatName',
            key: 'formatName',
            // render: (text) => <a>{text}</a>,
            align: 'center',

        },
        {
            title: 'Format No',
            dataIndex: 'formatNo',
            key: 'formatNo',
            align: 'center',
        },
        {
            title: 'Revision No',
            dataIndex: 'revisionNo',
            key: 'revisionNo',
            align: 'center',
        },
        {
            title: 'Format Date',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
        },
        {
            title: 'Mail Status',
            dataIndex: 'mailStatus',
            key: 'mailStatus',
            align: 'center',
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Review </a>

                </Space>
            ),
        },
    ];
    const data = formData;
    const entriesPerPage = 13;
    let numberOfPages = Math.ceil(formData.length / entriesPerPage);
    const wasteBale= [];
    
    if (formData||formData.length>0 ) {
      for (let i = 0; i < formData.length; i += entriesPerPage) {
        wasteBale.push(formData.slice(i, i + entriesPerPage));
        
      }
    }
    // console.log(numberOfPages)
    
    
  

    return (
        <div id='f-33-print'>
            {/* <Table columns={columns} dataSource={data} /> */}
            <div>
                {contextHolder}


                <div className='no-print'>
                    <Drawer
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        open={open}
                        width="fit-content"
                        style={{
                            padding: "1em",
                        }}
                    >
                        <Row>
                            <Col>
                                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
                            </Col>

                            <Col
                                style={{
                                    marginLeft: "1em",
                                }}
                            >
                                <p>{localStorage.getItem("username")}</p>
                                <p
                                    style={{
                                        fontSize: "x-small",
                                    }}
                                >
                                    {localStorage.getItem("role")}
                                </p>
                            </Col>
                        </Row>

                        <Menu
  theme="dark"
  mode="inline"
  // defaultSelectedKeys={["1"]}
  style={{
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "0",
    margin: "0",
  }}
  items={
    role === "ROLE_QA"
      ? [
          {
            key: "1",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Form Browser
              </b>
            ),
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
                Generation
              </b>
            ),
            onClick: () => navigate("/Precot/Generate"),
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
                Mapping
              </b>
            ),
            onClick: () => navigate("/Precot/Bleaching_Mapping"),
          },
          {
            key: "4",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Closing
              </b>
            ),
            onClick: () => navigate("/Precot/Closing"),
          }
         ,
          {
            key: "5",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
              />
            ),
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Logout
              </b>
            ),
            onClick: () => navigate("/Precot"),
          },
        ]
      : role === "ROLE_SUPERVISOR" || role === "ROLE_HOD" || role === "ROLE_DESIGNEE"
      ? [
          {
            key: "1",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Form Browser
              </b>
            ),
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
                Mapping
              </b>
            ),
            onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
                Closing
              </b>
            ),
            onClick: () => navigate("/Precot/Closing"),
          },
          {
            key: "4",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Chemical Issue
              </b>
            ),
            onClick: () => navigate("/Precot/RawMaterialIssue"),
          },
          {
            key: "5",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
              />
            ),
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Logout
              </b>
            ),
            onClick: () => navigate("/Precot"),
          },
        ]
      : [
          {
            key: "1",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Form Browser
              </b>
            ),
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
                Mapping
              </b>
            ),
            onClick: () => navigate("/Precot/Bleaching_Mapping"),
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
                Closing
              </b>
            ),
            onClick: () => navigate("/Precot/Closing"),
          },
          {
            key: "4",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
              />
            ),
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Logout
              </b>
            ),
            onClick: () => navigate("/Precot"),
          },
        ]
  }
/>
                    </Drawer>
                    <BleachingHeader
                        formName={formName}
                        formatNo={formatNo}
                        unit={"Unit H"}
                        MenuBtn={
                            <Button
                                type="primary"
                                icon={<TbMenuDeep />}
                                onClick={showDrawer}
                            ></Button>
                        }
                        buttonsArray={[
                            role === "ROLE_HOD" ||
                            role === "ROLE_QA" ||
                            role === "ROLE_QC" ||
                            role === "ROLE_DESIGNEE" ? (
                              <>
                                <Button
                                  loading={saveLoading}
                                  type="primary"
                                  style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                    display: canDisplayButtons(),
                                  }}
                                  onClick={handleApprove}
                                  shape="round"
                                  icon={ <img src={approveIcon} alt="Approve Icon" />}
                                >
                                  &nbsp;Approve
                                </Button>
                                <Button
                                  loading={saveLoading}
                                  type="primary"
                                  style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                    display: canDisplayButtons(),
                                  }}
                                  icon={<img src={rejectIcon} alt="Reject Icon" />}
                                  onClick={handleRejectModal}
                                  shape="round"
                                >
                                  &nbsp;Reject
                                </Button>
                              </>
                            ) : (
                              <>
                            <Button
                                type="primary"
                                loading={submitLoading}
                                style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                    display: canDisplayButtons()
                                }}
                                shape="round"
                                icon={<GrDocumentStore color="#00308F" />}
                                onClick={handleSubmit}
                            >
                                &nbsp;Submit
                            </Button>
                            </>
                            ),
                            <Button
                                style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                }}
                                onClick={() => handleBack()}
                                shape="round"
                                icon={<GoArrowLeft color="#00308F" />}
                            >
                                Back
                            </Button>,
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "#E5EEF9",
                                    color: "#00308F",
                                    fontWeight: "bold",
                                }}
                                shape="round"
                                icon={<BiLock color="#00308F" />}
                                onClick={() => {
                                    if (confirm("Are you sure want to logout")) {
                                      localStorage.removeItem("token");
                                      navigate("/Precot");
                                    }
                                  }}
                            >
                                Logout
                            </Button>,
                            <Tooltip
                                trigger="click"
                                style={{
                                    backgroundColor: "#fff",
                                }}
                                title={
                                    <div>
                                        <h3>{localStorage.getItem("username")}</h3>
                                        <p>{localStorage.getItem("role")}</p>
                                    </div>
                                }
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "#E5EEF9",
                                    }}
                                    shape="circle"
                                    icon={<FaUserCircle color="#00308F" size={20} />}
                                />
                            </Tooltip>,


                        ]}
                    />
                    <Modal
          title="Reject"
          open={showModal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          destroyOnClose={true}
          showSearch
          footer={[
            <Button
              key="submit"
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              onClick={handleReject}
            >
              Submit
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ marginRight: "8px" }}>Remarks:</label>
            <TextArea
              value={rejectRemarks}
              onChange={(e) => setRejectRemarks(e.target.value)}
              rows={4} // Adjust the number of rows as needed
              style={{ width: "100%" }} // Adjust the width as needed
            />
          </div>
        </Modal>
                </div>


                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ margin: '5px' }}>
                        {loading && (
                            <Spin
                                indicator={
                                    <LoadingOutlined
                                        style={{
                                            fontSize: 15,
                                            marginLeft: '1rem'
                                        }}
                                        spin
                                    />
                                }
                            />
                        )}
                    </div>

                </div>


                <div>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }} className='no-print' >
                        <thead>
                            <tr>
                                <td  rowSpan={2}style={{ textAlign: 'center' }}>SI.No</td>
                                <td  rowSpan={2}style={{ textAlign: 'center' }}>Date</td>
                                <td  rowSpan={2}style={{ textAlign: 'center' }}>Waste Code</td>
                                <td rowSpan={2}style={{ textAlign: 'center' }}>Bale No.</td>
                                <td  colSpan={2} style={{ textAlign: 'center' }}>Weight in KG</td>
                                <td  rowSpan={2}style={{ textAlign: 'center' }}>Remarks</td>
                                <td  rowSpan={2}>Performed by <br></br>Prod. Supervisior <br></br>Date & sign</td>
                                <td  rowSpan={2}>Reviewed by <br></br>Hod/Designee <br></br>Date & sign</td>
                            </tr>
                            <tr>
                                <td className='data-border-header'>
                                    Gross Weight
                                </td>
                                <td className='data-border-header'>
                                    Net Weight
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.map((data, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{
                                        padding: "1em"
                                    }}>{rowIndex + 1}</td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        <input type="text" className="inp-new" name="date-picker" onChange={(e) => handleChange('date', e.target.value, rowIndex)} value={displayFormat} style={{ width: '5rem' }} readOnly></input>

                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }} >

                                        <input type='text' className='inp-new' onChange={(e) => handleChange('waste_code', e.target.value, rowIndex)} value={data.waste_code} readOnly={true} style={{ width: '5rem' }}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        {/* <input type='text' className='inp-new' onChange={(e) => handleChange('bale_no', e.target.value, rowIndex)} value={data.bale_no} readOnly={handleValidateReadOnly(data)} style={{ width: '5rem' }}></input> */}
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('bale_no', e.target.value, rowIndex)} value={data.bale_no} readOnly={true} style={{ width: '5rem' }}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        {/* <input type='text' className='inp-new' onChange={(e) => handleChange('gross_weight', e.target.value, rowIndex)} value={data.gross_weight} readOnly={handleValidateReadOnly(data)}></input> */}
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('gross_weight', e.target.value, rowIndex)} value={data.gross_weight} readOnly={true}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        {/* <input type='text' className='inp-new' onChange={(e) => handleChange('net_weight', e.target.value, rowIndex)} value={data.net_weight} readOnly={handleValidateReadOnly(data)}></input> */}
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('net_weight', e.target.value, rowIndex)} value={data.net_weight} readOnly={true}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('remarks', e.target.value, rowIndex)} value={data.remarks ? data.remarks : 'N/A'} readOnly={handleValidateReadOnly(data)}></input>
                                    </td>

                                    <td className='signature' style={{ height: "50px", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center" }}>{data.supervisor_sign} <br></br>{formatDate(data.supervisor_submit_on)}
                                    {/* <img
                          // src={getImage}
                          alt="logo"
                          style={{
                            width: "15%",
                            height: "10%",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        /> */}
                                    </td>
                                    <td className='signature' style={{ border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center" }}>{data.hod_sign}<br></br>{formatDate(data.hod_submit_on)}
                                    {/* <img
                          // src={getImage1}
                          alt="logo"
                          style={{
                            width: "15%",
                            height: "10%",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        /> */}
                                    </td>
                                </tr>
                            ))}




                        </tbody>
                    </table>
                </div>
                {/* <div style={{ margin: '5px', display: 'flex', flexDirection: 'row-reverse' }} className='no-print'>
                    <Button

                        icon={<MinusOutlined />}
                        shape="round"
                        style={{
                            display: canDisplayAddRow(), backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                        }}
                        type="primary"
                        onClick={removeLastRow}

                    >
                        Remove Row
                    </Button>
                    <Button

                        icon={<PlusOutlined />}
                        shape="round"
                        style={{
                            display: canDisplayAddRow(), backgroundColor: "#E5EEF9",
                            color: "#00308F",
                            fontWeight: "bold",
                        }}
                        type="primary"
                        onClick={addRow}

                    >
                        Add Row
                    </Button>
                </div> */}

                <div className='print-header' style={{ margin: '20px 0' }}>
                <style>
    {`
      @media print {
        @page {
          size: landscape;
        }
      }
    `}
  </style>
                {wasteBale.map((bodyContent, pageIndex) => (<table>

                        <thead>

                        <tr style={{ border: "none" }}>
                                <td style={{ border: "none", padding: "5px" }} colSpan="10" ></td>
                            </tr>
                            <tr style={{ border: "none" }}>
                                <td style={{ border: "none", padding: "5px" }} colSpan="10" ></td>
                            </tr>
                           
                            
                            
                            <tr>
                                <td rowspan="4" style={{ textAlign: "center" }} colspan="2">
                                    <img src={logo} alt="Logo" style={{ width: '90px', height: 'auto', textAlign: 'center' }} /><br /> Unit H
                                </td>
                                <td rowspan="4" style={{ textAlign: "center" }} colspan="5">{formName}</td>
                                <td colspan="1" style={{ textAlign: "center" }}>Format No.:</td>
                                <td style={{ border: "1px solid black", textAlign: "center" }} colSpan="1">{formatNo}</td>
                            </tr>
                            <tr>
                                <td colspan="1" style={{ textAlign: "center" }}>Revision No.:</td>
                                <td style={{ border: "1px solid black", textAlign: "center" }} colSpan="1">{revisionNo}</td>
                            </tr>
                            <tr>
                                <td colspan="1" style={{ textAlign: "center" }}>Ref.SOP No.:</td>
                                <td style={{ textAlign: "center" }} colSpan="1">{sopNo}</td>
                            </tr>
                            <tr>
                                <td colspan="1" style={{ textAlign: "center" }}>Page No.:</td>
                                <td style={{ textAlign: "center" }} colSpan="1">{pageIndex + 1} of {numberOfPages}</td>
                            </tr>

                            <tr style={{ border: "none" }}>
                                <td style={{ border: "none", padding: "5px" }} colSpan="10"></td>
                            </tr>
                            <tr>
                                <td className='data-border-header' rowSpan={2}>S.No</td>
                                <td className='data-border-header' rowSpan={2}>Date</td>
                                <td className='data-border-header' rowSpan={2}>Waste Code</td>
                                <td className='data-border-header' rowSpan={2}>Bale No.</td>
                                <td className='data-border-header' colSpan={2} style={{ textAlign: 'center' }}>Weight in KG</td>
                                <td className='data-border-header' rowSpan={2}>Remarks</td>
                                <td className='data-border-header' rowSpan={2}>Performed by <br></br>Prod. Supervisior <br></br></td>
                                <td className='data-border-header' rowSpan={2}>Reviewed by <br></br>Hod/Designee <br></br></td>
                            </tr>
                            <tr>
                                <td className='data-border-header'>
                                    Gross Weight
                                </td>
                                <td className='data-border-header'>
                                    Net Weight
                                </td>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {bodyContent.map((data, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{
                                        padding: "1em"
                                    }}>{rowIndex + 1}</td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        <input type="text" className="inp-new" name="date-picker" onChange={(e) => handleChange('date', e.target.value, rowIndex)} value={displayFormat} style={{ width: '5rem' }} readOnly></input>

                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }} >

                                        <input type='text' className='inp-new' onChange={(e) => handleChange('waste_code', e.target.value, rowIndex)} value={data.waste_code} readOnly={true} style={{ width: '5rem' }}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        {/* <input type='text' className='inp-new' onChange={(e) => handleChange('bale_no', e.target.value, rowIndex)} value={data.bale_no} readOnly={handleValidateReadOnly(data)} style={{ width: '5rem' }}></input> */}
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('bale_no', e.target.value, rowIndex)} value={data.bale_no} readOnly={true} style={{ width: '5rem' }}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        {/* <input type='text' className='inp-new' onChange={(e) => handleChange('gross_weight', e.target.value, rowIndex)} value={data.gross_weight} readOnly={handleValidateReadOnly(data)}></input> */}
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('gross_weight', e.target.value, rowIndex)} value={data.gross_weight} readOnly={true}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        {/* <input type='text' className='inp-new' onChange={(e) => handleChange('net_weight', e.target.value, rowIndex)} value={data.net_weight} readOnly={handleValidateReadOnly(data)}></input> */}
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('net_weight', e.target.value, rowIndex)} value={data.net_weight} readOnly={true}></input>
                                    </td>
                                    <td style={{
                                        padding: "1em"
                                    }}>
                                        <input type='text' className='inp-new' onChange={(e) => handleChange('remarks', e.target.value, rowIndex)} value={data.remarks} readOnly={handleValidateReadOnly(data)}></input>
                                    </td>

                                    <td className='signature' style={{ height: "50px", border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center" }}>{data.supervisor_sign} <br></br>{formatDate(data.supervisor_submit_on)}<br></br>Sign&Date</td>
                                    <td className='signature' style={{ border: "1px solid black", letterSpacing: "0.4px", fontSize: "14px", textAlign: "center" }}>{data.hod_sign}<br></br>{formatDate(data.hod_submit_on)}<br></br>Sign&Date</td>
                                </tr>
                            ))}




                        </tbody>
                        <br/>
                        <tfoot>
                            <tr style={{ border: "none" }}>
                                <td style={{ border: "none", padding: "5px" }} colSpan="10" ></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1em' }} colSpan="3">Particulars</td>
                                <td style={{ padding: '1em' }} colSpan="2">Prepared By</td>
                                <td style={{ padding: '1em' }} colSpan="2">Reviewed By</td>
                                <td style={{ padding: '1em' }} colSpan="2">Approved By</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1em' }} colSpan="3">Name</td>
                                <td style={{ padding: '1em' }} colSpan="2"></td>
                                <td style={{ padding: '1em' }} colSpan="2"></td>
                                <td style={{ padding: '1em' }} colSpan="2"></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1em' }} colSpan="3">Signature & Date</td>
                                <td style={{ padding: '1em' }} colSpan="2"></td>
                                <td style={{ padding: '1em' }} colSpan="2"></td>
                                <td style={{ padding: '1em' }} colSpan="2"></td>
                            </tr>
                        </tfoot>
                    </table>

))}

                </div>

            </div>
        </div>
    )
}


export default Bleaching_f33;