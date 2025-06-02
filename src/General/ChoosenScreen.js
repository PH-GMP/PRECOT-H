/* eslint-disable no-restricted-globals */
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Menu,
  message,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaLaravel, FaLock, FaUserCircle } from "react-icons/fa";
import { FaRectangleList } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiLock } from "react-icons/bi";

const ChoosenScreen = () => {
  const navigate = useNavigate();
  const [enableBmr, setenableBmr] = useState(false);
  const [btnenable, setbtnenable] = useState(true);
  const [routePath, setRoutePath] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [formNo, setFormNo] = useState("");
  const departmentId = localStorage.getItem("departmentId");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("departmentId", departmentId);
    const x = localStorage.getItem("role");
    setRole(x);
    const dept = Number(localStorage.getItem("departmentId"));
    // console.log("department" , dept);
    setDepartment(dept);
  }, []);

  const qualityAssuranceAllOptions = [
    {
      value: "PH-QAD01F-001",
      label: "PH-QAD01F-001 MANAGEMENT OF INCIDENCE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01/F-002",
      label: "PH-QAD01/F-002 REQUEST & ISSUANCE OF DOCUMENT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-005",
      label: "PH-QAD01-F-005 TRAINING NEED IDENTIFICATION FORM",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-007",
      label: "PH-QAD01-F-007 TRAINING RECORD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-008",
      label: "PH-QAD01-F-008 TRAINING CARD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-009",
      label: "PH-QAD01-F-009 TRAINING QUESSIONNAIRE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-012",
      label: "PH-QAD01-F-012 INTERNAL AUDIT REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-013",
      label: "PH-QAD01-F-013 INTERNAL AUDIT NC REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-018",
      label: "PH-QAD01-F-018 CUSTOMER COMPLAINT REGISTER FORM",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-020",
      label:
        "PH-QAD01-F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
      roles: [
        "ROLE_SUPERVISOR",
        "ROLE_HOD",
        "ROLE_DESIGNEE",
        "QC_MANAGER",
        "ROLE_CHEMIST",
      ],
    },
    {
      value: "PH-QAD01-F023",
      label: "PH-QAD01-F023 SUPPLIER AUDIT REPORT",
      roles: ["ROLE_HOD"],
    },

    {
      value: "PH-QAD01-F-034",
      label:
        "PH-QAD01-F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS) ",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-035",
      label: "PH-QAD01-F-035 ONLINE INSPECTION FOR BALLS",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-036",
      label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-039",
      label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
      roles: ["DISPATCH_SUPERVISOR", "SECURITY"],
    },
    {
      value: "PH-QAD01-F-041",
      label: "PH-QAD01-F-041 CHANGE CONTROL FORM",
      roles: ["QA_MANAGER", "ROLE_DESIGNEE", "ROLE_HOD"],
    },
    {
      value: "PH-QAD01-F-042",
      label: "PH-QAD01-F-042 CHANGE CONTROL LOG BOOK",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-045",
      label: "PH-QAD01-F-045 BMR - ISSUE REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-047",
      label: "PH-QAD01-F-047 BATCH RELEASE CHECKLIST",
      roles: ["ROLE_CHEMIST"],
    },
    {
      value: "PH-QAD01/F-048",
      label: "PH-QAD01/F-048 DEVIATION FORM",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-051",
      label: "PH-QAD01-F-051 CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-052",
      label: "PH-QAD01-F-052 BREAKAGE REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-058",
      label: "PH-QAD01-F-058 METAL DETECTOR CALIBRATION RECORD",
      roles: ["ROLE_SUPERVISOR", "ROLE_OPERATOR"],
    },
    {
      value: "PH-QAD01-F-059",
      label: "PH-QAD01-F-059 METAL DETECTOR PASS REPORT",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01/F-062",
      label: "PH-QAD01/F-062 SHARP TOOLS ISSUE & VERIFICATION REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-076",
      label: "PH-QAD01-F-076 TRAINING SESSION ALLOTMENT REGISTER",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QCL01-F-029",
      label: "PH-QCL01-F-029 NEW SAMPLE REQUEST",
      roles: ["QC_MANAGER", "MARKET_REPRESENTATIVE"],
    },
  ];

  const qualityAssuranceAllOptionsHR = [
    {
      value: "PH-QAD01-F-007",
      label: "PH-QAD01-F-007 TRAINING RECORD",
      roles: ["ROLE_HOD", "HR_EXECUTIVE"],
    },
    {
      value: "PH-QAD01-F-009",
      label: "PH-QAD01-F-009 TRAINING QUESSIONNAIRE",
      roles: ["ROLE_HOD", "HR_EXECUTIVE"],
    },
    {
      value: "PH-QAD01-F-013",
      label: "PH-QAD01-F-013 INTERNAL AUDIT NC REPORT",
      roles: ["ROLE_HOD"],
    },
  ];

  const qualityAssuranceAllOptionsSpunlace = [
    {
      value: "PH-QAD01F-001",
      label: "PH-QAD01F-001 MANAGEMENT OF INCIDENCE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01/F-002",
      label: "PH-QAD01/F-002 REQUEST & ISSUANCE OF DOCUMENT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-005",
      label: "PH-QAD01-F-005 TRAINING NEED IDENTIFICATION FORM",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-007",
      label: "PH-QAD01-F-007 TRAINING RECORD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-008",
      label: "PH-QAD01-F-008 TRAINING CARD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-009",
      label: "PH-QAD01-F-009 TRAINING QUESSIONNAIRE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-012",
      label: "PH-QAD01-F-012 INTERNAL AUDIT REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-013",
      label: "PH-QAD01-F-013 INTERNAL AUDIT NC REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    // {
    //   value: "PH-QAD01-F-018",
    //   label: "PH-QAD01-F-018 CUSTOMER COMPLAINT REGISTER FORM",
    //   roles: ["ROLE_SUPERVISOR"],
    // },
    {
      value: "PH-QAD01-F-020",
      label:
        "PH-QAD01-F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
      roles: [
        "ROLE_SUPERVISOR",
        "ROLE_HOD",
        "ROLE_DESIGNEE",
        "QC_MANAGER",
        "ROLE_CHEMIST",
      ],
    },
    {
      value: "PH-QAD01-F023",
      label: "PH-QAD01-F023 SUPPLIER AUDIT REPORT",
      roles: ["ROLE_HOD"],
    },

    // {
    //   value: "PH-QAD01-F-034",
    //   label:
    //     "PH-QAD01-F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS) ",
    //   roles: ["ROLE_SUPERVISOR"],
    // },
    // {
    //   value: "PH-QAD01-F-035",
    //   label: "PH-QAD01-F-035 ONLINE INSPECTION FOR BALLS",
    //   roles: ["ROLE_SUPERVISOR"],
    // },
    // {
    //   value: "PH-QAD01-F-036",
    //   label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
    //   roles: ["ROLE_SUPERVISOR"],
    // },
    {
      value: "PH-QAD01-F-039",
      label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
      roles: ["DISPATCH_SUPERVISOR", "SECURITY"],
    },
    {
      value: "PH-QAD01-F-041",
      label: "PH-QAD01-F-041 CHANGE CONTROL FORM",
      roles: ["QA_MANAGER", "ROLE_DESIGNEE", "ROLE_HOD"],
    },
    {
      value: "PH-QAD01-F-042",
      label: "PH-QAD01-F-042 CHANGE CONTROL LOG BOOK",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-045",
      label: "PH-QAD01-F-045 BMR - ISSUE REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-047",
      label: "PH-QAD01-F-047 BATCH RELEASE CHECKLIST",
      roles: ["ROLE_CHEMIST"],
    },
    {
      value: "PH-QAD01/F-048",
      label: "PH-QAD01/F-048 DEVIATION FORM",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-051",
      label: "PH-QAD01-F-051 CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-052",
      label: "PH-QAD01-F-052 BREAKAGE REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-058",
      label: "PH-QAD01-F-058 METAL DETECTOR CALIBRATION RECORD",
      roles: ["ROLE_SUPERVISOR", "ROLE_OPERATOR"],
    },
    {
      value: "PH-QAD01-F-059",
      label: "PH-QAD01-F-059 METAL DETECTOR PASS REPORT",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01/F-062",
      label: "PH-QAD01/F-062 SHARP TOOLS ISSUE & VERIFICATION REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-076",
      label: "PH-QAD01-F-076 TRAINING SESSION ALLOTMENT REGISTER",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QCL01-F-029",
      label: "PH-QCL01-F-029 NEW SAMPLE REQUEST",
      roles: ["QC_MANAGER", "MARKET_REPRESENTATIVE"],
    },
  ];

  const qualityAssuranceAllOptionsPadpunching = [
    {
      value: "PH-QAD01F-001",
      label: "PH-QAD01F-001 MANAGEMENT OF INCIDENCE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01/F-002",
      label: "PH-QAD01/F-002 REQUEST & ISSUANCE OF DOCUMENT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-005",
      label: "PH-QAD01-F-005 TRAINING NEED IDENTIFICATION FORM",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-007",
      label: "PH-QAD01-F-007 TRAINING RECORD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-008",
      label: "PH-QAD01-F-008 TRAINING CARD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-009",
      label: "PH-QAD01-F-009 TRAINING QUESSIONNAIRE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-012",
      label: "PH-QAD01-F-012 INTERNAL AUDIT REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-013",
      label: "PH-QAD01-F-013 INTERNAL AUDIT NC REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    // {
    //   value: "PH-QAD01-F-018",
    //   label: "PH-QAD01-F-018 CUSTOMER COMPLAINT REGISTER FORM",
    //   roles: ["ROLE_SUPERVISOR"],
    // },
    {
      value: "PH-QAD01-F-020",
      label:
        "PH-QAD01-F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
      roles: [
        "ROLE_SUPERVISOR",
        "ROLE_HOD",
        "ROLE_DESIGNEE",
        "QC_MANAGER",
        "ROLE_CHEMIST",
      ],
    },
    {
      value: "PH-QAD01-F023",
      label: "PH-QAD01-F023 SUPPLIER AUDIT REPORT",
      roles: ["ROLE_HOD"],
    },

    {
      value: "PH-QAD01-F-034",
      label:
        "PH-QAD01-F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS) ",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-035",
      label: "PH-QAD01-F-035 ONLINE INSPECTION FOR BALLS",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-036",
      label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-039",
      label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
      roles: ["DISPATCH_SUPERVISOR", "SECURITY"],
    },
    {
      value: "PH-QAD01-F-041",
      label: "PH-QAD01-F-041 CHANGE CONTROL FORM",
      roles: ["QA_MANAGER", "ROLE_DESIGNEE", "ROLE_HOD"],
    },
    {
      value: "PH-QAD01-F-042",
      label: "PH-QAD01-F-042 CHANGE CONTROL LOG BOOK",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-045",
      label: "PH-QAD01-F-045 BMR - ISSUE REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-047",
      label: "PH-QAD01-F-047 BATCH RELEASE CHECKLIST",
      roles: ["ROLE_CHEMIST"],
    },
    {
      value: "PH-QAD01/F-048",
      label: "PH-QAD01/F-048 DEVIATION FORM",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-051",
      label: "PH-QAD01-F-051 CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-052",
      label: "PH-QAD01-F-052 BREAKAGE REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-058",
      label: "PH-QAD01-F-058 METAL DETECTOR CALIBRATION RECORD",
      roles: ["ROLE_OPERATOR", "ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-059",
      label: "PH-QAD01-F-059 METAL DETECTOR PASS REPORT",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01/F-062",
      label: "PH-QAD01/F-062 SHARP TOOLS ISSUE & VERIFICATION REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-076",
      label: "PH-QAD01-F-076 TRAINING SESSION ALLOTMENT REGISTER",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QCL01-F-029",
      label: "PH-QCL01-F-029 NEW SAMPLE REQUEST",
      roles: ["QC_MANAGER", "MARKET_REPRESENTATIVE"],
    },
  ];

  const qualityAssuranceAllOptionsDryGoods = [
    {
      value: "PH-QAD01F-001",
      label: "PH-QAD01F-001 MANAGEMENT OF INCIDENCE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01/F-002",
      label: "PH-QAD01/F-002 REQUEST & ISSUANCE OF DOCUMENT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-005",
      label: "PH-QAD01-F-005 TRAINING NEED IDENTIFICATION FORM",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-007",
      label: "PH-QAD01-F-007 TRAINING RECORD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-008",
      label: "PH-QAD01-F-008 TRAINING CARD",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-009",
      label: "PH-QAD01-F-009 TRAINING QUESSIONNAIRE",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-012",
      label: "PH-QAD01-F-012 INTERNAL AUDIT REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-013",
      label: "PH-QAD01-F-013 INTERNAL AUDIT NC REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    // {
    //   value: "PH-QAD01-F-018",
    //   label: "PH-QAD01-F-018 CUSTOMER COMPLAINT REGISTER FORM",
    //   roles: ["ROLE_SUPERVISOR"],
    // },
    {
      value: "PH-QAD01-F-020",
      label:
        "PH-QAD01-F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
      roles: [
        "ROLE_SUPERVISOR",
        "ROLE_HOD",
        "ROLE_DESIGNEE",
        "QC_MANAGER",
        "ROLE_CHEMIST",
      ],
    },
    {
      value: "PH-QAD01-F023",
      label: "PH-QAD01-F023 SUPPLIER AUDIT REPORT",
      roles: ["ROLE_HOD"],
    },

    {
      value: "PH-QAD01-F-034",
      label:
        "PH-QAD01-F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS) ",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-035",
      label: "PH-QAD01-F-035 ONLINE INSPECTION FOR BALLS",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-036",
      label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-039",
      label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
      roles: ["DISPATCH_SUPERVISOR", "SECURITY"],
    },
    {
      value: "PH-QAD01-F-041",
      label: "PH-QAD01-F-041 CHANGE CONTROL FORM",
      roles: ["QA_MANAGER", "ROLE_DESIGNEE", "ROLE_HOD"],
    },
    {
      value: "PH-QAD01-F-042",
      label: "PH-QAD01-F-042 CHANGE CONTROL LOG BOOK",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-045",
      label: "PH-QAD01-F-045 BMR - ISSUE REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-047",
      label: "PH-QAD01-F-047 BATCH RELEASE CHECKLIST",
      roles: ["ROLE_CHEMIST"],
    },
    {
      value: "PH-QAD01/F-048",
      label: "PH-QAD01/F-048 DEVIATION FORM",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-051",
      label: "PH-QAD01-F-051 CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC",
      roles: ["ROLE_SUPERVISOR", "ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-052",
      label: "PH-QAD01-F-052 BREAKAGE REPORT",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QAD01-F-058",
      label: "PH-QAD01-F-058 METAL DETECTOR CALIBRATION RECORD",
      roles: ["ROLE_SUPERVISOR", "ROLE_OPERATOR"],
    },
    {
      value: "PH-QAD01-F-059",
      label: "PH-QAD01-F-059 METAL DETECTOR PASS REPORT",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01/F-062",
      label: "PH-QAD01/F-062 SHARP TOOLS ISSUE & VERIFICATION REGISTER",
      roles: ["ROLE_SUPERVISOR"],
    },
    {
      value: "PH-QAD01-F-076",
      label: "PH-QAD01-F-076 TRAINING SESSION ALLOTMENT REGISTER",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-QCL01-F-029",
      label: "PH-QCL01-F-029 NEW SAMPLE REQUEST",
      roles: ["QC_MANAGER", "MARKET_REPRESENTATIVE"],
    },
  ];

  const engineeringAllOptions = [
    // { value: "PH-QAD01F-001", label: "PH-QAD01F-001 Management of Incidence", roles: ["ROLE_HOD", "ROLE_DESIGNEE"] },
    {
      value: "PH-ENG01/FC-003",
      label: "PH-ENG01/FC-003  BREAKDOWN INTIMATION SLIP",
      roles: [
        "ROLE_SUPERVISOR",
        "ROLE_ENGINEER",
        "ROLE_MECHANICAL",
        "ROLE_ELECTRICAL",
      ],
    },
    {
      value: "PH-ENG01/FC-004",
      label: "PH-ENG01/FC-004  ROOT CAUSE ANALYSIS",
      roles: [
        "ROLE_HOD",
        "ROLE_DESIGNEE",
        "ROLE_ENGINEER",
        "ROLE_MECHANICAL",
        "ROLE_ELECTRICAL",
      ],
    },
    {
      value: "PH-ENG01/FC-016",
      label: "PH-ENG01/FC-016 WEIGHING SCALES CALIBRATION RECORD",
      roles: ["ROLE_HOD", "ROLE_SUPERVISOR", "ROLE_DESIGNEE"],
    },
    {
      value: "PH-ENG01/FC-020",
      label: "PH-ENG01/FC-020  WORK ORDER REQUEST FORM",
      roles: [
        "ROLE_HOD",
        "ROLE_DESIGNEE",
        "ROLE_ENGINEER",
        "ROLE_CIVIL",
        "ROLE_MECHANICAL",
        "ROLE_ELECTRICAL",
      ],
    },
  ];
  const DevelopmentAllOptions = [
    {
      value: "PH-DVP01/F-001",
      label: "PH-DVP01/F-001 - PRODUCT DEVELOPMENT SHEET",
      roles: ["ROLE_HOD", "ROLE_DESIGNEE", "QC_MANAGER", "QA_MANAGER"],
    },
  ];

  const StoreAllOptions = [
    {
      value: "PH-STR01F-006",
      label: "PH-STR01F-006 NON RETURNABLE GATE PASS",
      roles: ["DISPATCH_SUPERVISOR"],
    },
    // {
    //   value: "PH-STR01F-008",
    //   label: "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
    //   roles: ["DISPATCH_SUPERVISOR"],
    // },
  ];

  const qualityAssuranceOptions = qualityAssuranceAllOptions.filter((option) =>
    option.roles.includes(role)
  );

  const qualityAssuranceOptionsHR = qualityAssuranceAllOptionsHR.filter(
    (option) => option.roles.includes(role)
  );

  const qualityAssuranceOptionsSpunlace =
    qualityAssuranceAllOptionsSpunlace.filter((option) =>
      option.roles.includes(role)
    );

  const qualityAssuranceOptionsPadpunching =
    qualityAssuranceAllOptionsPadpunching.filter((option) =>
      option.roles.includes(role)
    );
  const qualityAssuranceOptionsDryGoods =
    qualityAssuranceAllOptionsDryGoods.filter((option) =>
      option.roles.includes(role)
    );

  const engineeringOptions = engineeringAllOptions.filter((option) =>
    option.roles.includes(role)
  );
  const DevelopmentOptions = DevelopmentAllOptions.filter((option) =>
    option.roles.includes(role)
  );
  const StoreOptions = StoreAllOptions.filter((option) =>
    option.roles.includes(role)
  );

  const BleachingForm =
    [
      {
        label: <span>Bleaching</span>,
        title: "Bleaching HOD",
        options: [
          {
            value: "PH-PRD01/F-001",
            label: "PH-PRD01/F-001 LAYDOWN CHECKLIST",
          },
          {
            value: "PH-PRD01/F-002",
            label: "PH-PRD01/F-002 METAL DETECTOR CHECK LIST",
          },
          {
            value: "PH-PRD01/F-003",
            label: "PH-PRD01/F-003 APPLIED CONTAMINATION REPORT (RAW COTTON)",
          },
          {
            value: "PH-PRD01/F-004",
            label: "PH-PRD01/F-004 CONTAMINATION REPORT (RAW COTTON)",
          },
          {
            value: "PH-PRD01/F-005",
            label:
              "PH-PRD01/F-005 EQUIPMENT USAGE LOG BOOK - BLOW ROOM & CARDING",
          },
          {
            value: "PH-PRD01/F-006",
            label: "PH-PRD01/F-006 EQUIPMENT USAGE LOG BOOK - CAKE PRESS",
          },
          {
            value: "PH-PRD01/F-007",
            label: "PH-PRD01/F-007 BLEACHING JOB CARD",
          },
          {
            value: "PH-PRD01/F-008",
            label: "PH-PRD01/F-008 EQUIPMENT USAGE LOG BOOK HYDRO EXTRACTOR",
          },
          {
            value: "PH-PRD01/F-009",
            label: "PH-PRD01/F-009 SANITIZATION OF MACHINES & SURFACES",
          },
          {
            value: "PH-PRD01/F-010",
            label:
              "PH-PRD01/F-010 BLEACHING HAND SANITIZATION REPORT AB BALE PRESS MACHINE",
          },
          {
            value: "PH-PRD01/F-011",
            label:
              "PH-PRD01/F-011 APPLIED CONTAMINATION REPORT (ABSORBENT BLEACHED COTTON)",
          },
          {
            value: "PH-PRD01/F-012",
            label:
              "PH-PRD01/F-012 CONTAMINATION CHECKING REPORT (ABSORBENT BLEACHED COTTON)",
          },
          { value: "PH-PRD01/F-013", label: "PH-PRD01/F-013 SHIFT LOG BOOK" },
          {
            value: "PH-PRD01/F-014",
            label:
              "PH-PRD01/F-014 MIXING CHANGE OVER & MACHINE CLEANING CHECK LIST BLOW ROOM & BLEACHING",
          },
          {
            value: "PH-PRD01/F-015",
            label: "PH-PRD01/F-015 EQUIPMENT USAGE LOG BOOK WASTE BALE PRESS",
          },
          {
            value: "PH-PRD01/F-016",
            label: "PH-PRD01/F-016 MACHINE CLEANING RECORD (DAILY)",
          },
          {
            value: "PRD01/F-02",
            label: "PRD01/F-02 HOUSE KEEPING CLEANING CHECKLIST",
          },
          {
            value: "PRD01/F-02A",
            label: "PRD01/F-02A HOUSE KEEPING CLEANING CHECK LIST",
          },
          {
            value: "PRD01/F-43",
            label: "PRD01/F-43 BATCH MANUFACTURING RECORD",
          },
          {
            value: "PH-PRD01/F-016 RE-PROCESSING REPORT",
            label: " PH-PRD01/F-016 RE-PROCESSING REPORT",
          },
        ],
      },
      {
        label: <span>Quality Assurance</span>,
        title: "Quality Assurance HOD",
        options: qualityAssuranceOptions,
      },
      {
        label: <span>Engineering</span>,
        title: "Engineering",
        options: engineeringOptions,
      },
      {
        label: <span>Development</span>,
        title: "Development",
        options: DevelopmentOptions,
      },
    ].filter(Boolean) || [];

  const SpunlaceForm = [
    {
      label: <span>Spunlace</span>,
      title: "Spunlace",
      options: [
        {
          value: "PH-PRD02/F-001",
          label: "PH-PRD02/F-001 BALE CONSUMPTION REPORT",
        },
        {
          value: "PH-PRD02/F-002",
          label: "PH-PRD02/F-002 PROCESS SETUP VERIFICATION OPENING LINE",
        },
        {
          value: "PH-PRD02/F-003",
          label: "PH-PRD02/F-003 PROCESS SETUP DETAILS JETLACE & DRYER",
        },
        {
          value: "PH-PRD02/F-004",
          label: "PH-PRD02/F-004 FILTER BAG CONSUMPTION DETAILS",
        },
        {
          value: "PH-PRD02/F-005",
          label: "PH-PRD02/F-005 PROCESS SETUP DETAILS - WINDER",
        },
        {
          value: "PH-PRD02/F-006",
          label: "PH-PRD02/F-006 DAILY PRODUCTION REPORT - SPUNLACE",
        },
        {
          value: "PH-PRD02/F-007",
          label: "PH-PRD02/F-007 DAILY REJECTION REPORT - SPUNLACE",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD02/F-008",
                label: "PH-PRD02/F-008 DAILY STOPPAGE REPORT - SPUNLACE",
              },
              {
                value: "PH-PRD02/F-009",
                label: "PH-PRD02/F-009 SPUNLACE GSM ANALYSIS REPORT",
              },
              {
                value: "PH-PRD02/F-010",
                label: "PH-QAD01/F-052 LOGBOOK – SPUNLACE PLANNING",
              },
              {
                value: "PH-PRD02/F-011",
                label: "PH-PRD02/F-010 PRODUCT CHANGE OVER CHECK LIST SPUNLACE",
              },
              {
                value: "PH-PRD02/F-012",
                label: "PH-PRD02/F-011 SAMPLE REPORT - SPUNLACE",
              },
              {
                value: "PH-PRD02/F-015",
                label: "PH-PRD02/F-014 RP BALE PRESS STOPPAGE REPORT",
              },
              {
                value: "PH-PRD02/F-019",
                label:
                  "PH-PRD02/F-020 SHIFT WISE COTTON WASTE REPORT OF SPUNLCAE",
              },
              {
                value: "PH-PRD02/F-020",
                label: "PH-PRD02/F-019 METAL DETECTOR CHECKLIST",
              },
              {
                value: "PH-PRD02/F-023",
                label: "PH-PRD02/F-023 MACHINE CLEANING RECORD (WEEKLY) ",
              },
              {
                value: "PH-PRD02/F-024",
                label: "PH-PRD02/F-021 SANITIZATION OF MACHINES & SURFACES ",
              },
              {
                value: "PH-PRD02/F-025",
                label: "PH-PRD02/F-025 SPUNLACE HAND SANITIASITON REPORT",
              },

              {
                value: "PRD02/F-26",
                label: "PRD02/F-26 BATCH MANUFACTURING RECORD BMR - Spunlace ",
              },
              {
                value: "PRD02/F-27",
                label: "PRD02/F-27 BATCH MANUFACTURING RECORD BMR - RP ",
              },
            ]
          : []),

        {
          value: "PH-PRD02/F-013",
          label: "PH-PRD02/F-012 PROCESS SETUP VERIFICATION - RP BALE PRESS",
        },
        {
          value: "PH-PRD02/F-014",
          label: "PH-PRD02/F-013 SHIFT WISE RP PRODUCTION REPORT",
        },

        {
          value: "PH-PRD02/F-016",
          label: "PH-PRD02/F-015 PROCESS SETUP VERIFICATION SLITER WINDER",
        },
        {
          value: "PH-PRD02/F-017",
          label: "PH-PRD02/F-016 SHIFT WISE SLITER WINDER PRODUCTION REPORT",
        },
        {
          value: "PH-PRD02/F-018",
          label: "PH-PRD02/F-017 SHIFT WISE STOPPAGE REPORT OF SLITER WINDER",
        },
      ],
    },
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: qualityAssuranceOptionsSpunlace,
    },
    {
      label: <span>Engineering</span>,
      title: "Engineering",
      options: engineeringOptions,
    },
    {
      label: <span>Development</span>,
      title: "Development",
      options: DevelopmentOptions,
    },
  ];

  const PadPunchingForm = [
    {
      label: <span>Pad Punching</span>,
      title: "Pad Punching",
      options: [
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD03/F-001",
                label: "PH-PRD03/F-001 PRODUCTION DETAILS - LOG BOOK",
              },
            ]
          : []),
        {
          value: "PH-PRD03/F-002",
          label: "PH-PRD03/F-002 DAILY ROLL CONSUMPTION REPORT-PAD PUNCHING",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD03/F-003",
                label: "PH-PRD03/F-003 PRODUCT CHANGE OVER",
              },
              {
                value: "PH-PRD03/F-004",
                label: "PH-PRD03/F-004 DAILY PRODUCTION PACKING DETAILS",
              },
              {
                value: "PH-PRD03/F-005",
                label: "PH-PRD03/F-005 MACHINE CLEANING CHECK LIST",
              },
              {
                value: "PH-HRD03/F-006",
                label: "PH-HRD03/F-006 HAND SANITISATION REPORT",
              },
              {
                value: "PH-PRD03/F-007",
                label: "PH-PRD03/F-007 ARGUS METAL DETECTOR- CHECK LIST",
              },
              {
                value: "PH-PRD03/F-008",
                label: "PH-PRD03/F-008 SANITIZATION OF MACHINES & SURFACES",
              },
              {
                value: "PH-HRD01/F-006",
                label:
                  "PH-HRD01/F-006 HOUSE KEEPING CLEANING CHECK LIST (Pad Punching)",
              },
              {
                value: "PH-PRD03/F-009",
                label: "PH-PRD03/F-009 BATCH MANUFACTURING RECORD",
              },
            ]
          : []),

        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD05/F-003",
                label: "PH-PRD05/F-003 LOG BOOK - BAG MAKING",
              },
              {
                value: "PH-PRD05/F-001",
                label: "PH-PRD05/F-001 BAG MAKING DAILY PRODUCTION DETAILS",
              },
              {
                value: "PH-PRD05/F-002",
                label: "PH-PRD05/F-002 BAG MAKING - SPECIFICATION DETAILS",
              },
            ]
          : []),

        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-HRD01/F-010",
                label:
                  "PH-HRD01/F-010 HOUSE KEEPING CLEANING CHECK LIST (Bag Making)",
              },
            ]
          : []),
      ],
    },
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: qualityAssuranceOptionsPadpunching,
    },
    {
      label: <span>Engineering</span>,
      title: "Engineering",
      options: engineeringOptions,
    },
    {
      label: <span>Development</span>,
      title: "Development",
      options: DevelopmentOptions,
    },
  ];

  // Dry Goods.....
  const DryGoods = [
    {
      label: <span>Dry Goods</span>,
      title: "Dry Goods",
      options: [
        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD04/F-001",
                label: "PH-PRD04/F-001 BALE CONSUMPTION REPORT",
              },
              {
                value: "PH-PRD04/F-002",
                label: "PH-PRD04/F-002 DAILY PRODUCTION - SLIVER MAKING",
              },
            ]
          : []),

        {
          value: "PH-PRD04/F-003",
          label: "PH-PRD04/F-003 DAILY PRODUCTION - COTTON BALLS",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD04/F-004",
                label:
                  "PH-PRD04/F-004 BATCH MANUFACTURING RECORD - COTTON BALL",
              },
            ]
          : []),

        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD04/F-005",
                label: "PH-PRD04/F-005 PRODUCTION REPORT - MINI ROLL",
              },
            ]
          : []),

        {
          value: "PH-PRD04/F-006",
          label: "PH-PRD04/F-006 DAILY PRODUCTION (PLEAT / WOOL ROLL)",
        },

        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD04/F-007",
                label: "PH-PRD04/F-007 BATCH MANUFACTURING RECORD - PLEAT",
              },
              {
                value: "PH-PRD04/F-008",
                label: "PH-PRD04/F-008 BATCH MANUFACTURING RECORD - WOOL ROLL",
              },
              ...(role === "ROLE_SUPERVISOR" ||
              role === "ROLE_HOD" ||
              role === "ROLE_QA" ||
              role === "ROLE_DESIGNEE"
                ? [
                    {
                      value: "PH-PRD04/F-009",
                      label: "PH-PRD04/F-009 PRODUCT CHANGE OVER - DRY GOODS",
                    },
                  ]
                : []),
              {
                value: "PH-PRD04/F-010",
                label: "PH-PRD04/F-010 LOG BOOK - DRY GOODS",
              },
              {
                value: "PH-PRD04/F-011",
                label:
                  "PH-PRD04/F-011 BALL, PLEAT & WOOL ROLL FINISHED GOODS TRANSFER RECORD",
              },
              {
                value: "PH-PRD04/F-012",
                label:
                  "PH-PRD04/F-012 SANITIZATION OF MACHINES & SURFACES - DRY GOODS",
              },
              {
                value: "PH-PRD04/F-013",
                label: "PH-PRD04/F-023 HAND SANITIZATION REPORT - DRY GOODS",
              },
              {
                value: "PH-HRD01/F-004",
                label:
                  "PH-HRD01/F-004 HOUSE KEEPING CLEANING CHECK LIST - DRY GOODS",
              },
            ]
          : []),
      ],
    },

    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: qualityAssuranceOptionsDryGoods,
    },
    {
      label: <span>Engineering</span>,
      title: "Engineering",
      options: engineeringOptions,
    },
    {
      label: <span>Development</span>,
      title: "Development",
      options: DevelopmentOptions,
    },
  ];

  // Quality Control
  const QCForm = [
    {
      label: <span>Quality Control</span>,
      title: "Quality Control",
      options: [
        ...(role === "ROLE_QA"
          ? [
              {
                value: "PH-QCL01-AR-F-005",
                label: "PH-QCL01-AR-F-005 NON-WOVEN FLEECE ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),

        ...(role === "ROLE_MICROBIOLOGIST"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-008",
                label:
                  "PH-QCL01-AR-F-008 FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-009",
                label:
                  "PH-QCL01-AR-F-009 HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-010",
                label:
                  "PH-QCL01-AR-F-010 MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01F-002",
                label: "PH-QCL01F-002	MICROBIOLOGY LAB SAMPLE INWARD BOOK",
              },
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-014",
                label:
                  "PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-015",
                label:
                  "PH-QCL01/F-015 VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01F-021",
                label: "PH-QCL01F-021 MEDIA GROWTH PROMOTION TEST REPORT",
              },
              {
                value: "PH-QCL01F-022",
                label: "PH-QCL01F-022 - MEDIA DISPOSAL RECORD",
              },
              {
                value: "PH-QCL01/F-023",
                label: "PH-QCL01/F-023 CLEANING OF AUTOCLAVES",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01/F-027",
                label: "PH-QCL01/F-027 DISTILLED WATER CONSUMPTION REPORT",
              },
              {
                value: "PH-QCL01F-028",
                label: "PH-QCL01F-028 GLASSWARES BREAKAGE & DISPOSAL REGISTER",
              },
              {
                value: "PH-QCL01/F-030",
                label:
                  "PH-QCL01/F-030 DIGITAL COLONY COUNTER CALIBRATION REPORT",
              },
            ]
          : []),
        ...(role === "ROLE_CHEMIST"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-003",
                label: "PH-QCL01-AR-F-003 CHEMICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-012",
                label: "PH-QCL01-AR-F-012	DISTILLED WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-014",
                label: "PH-QCL01-AR-F-014 BRIQUETTES ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01F-001",
                label:
                  "PH-QCL01F-001	PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK",
              },
              {
                value: "PH-QCL01F-003",
                label: "PH-QCL01F-003	ETP LAB SAMPLE INWARD BOOK",
              },
              {
                value: "PH-QCL01/F-004",
                label:
                  "PH-QCL01/F-004 RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-005",
                label:
                  "PH-QCL01/F-005  ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT ",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01/F-016",
                label: "PH-QCL01/F-016 STANDARDIZATION OF CHEMICAL SOLUTION",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },

              {
                value: "PH-QCL01/F-027",
                label: "PH-QCL01/F-027 DISTILLED WATER CONSUMPTION REPORT",
              },
              {
                value: "PH-QCL01F-028",
                label: "PH-QCL01F-028 GLASSWARES BREAKAGE & DISPOSAL REGISTER",
              },
            ]
          : []),

        ...(role === "ROLE_ETP"
          ? [
              {
                value: "PH-QCL01F-003",
                label: "PH-QCL01F-003	ETP LAB SAMPLE INWARD BOOK",
              },
            ]
          : []),
        ...(role === "QA_EXECUTIVE"
          ? [
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },
            ]
          : []),
        ...(role === "QA_MANAGER"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-003",
                label: "PH-QCL01-AR-F-003 CHEMICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-005",
                label: "PH-QCL01-AR-F-005 NON-WOVEN FLEECE ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-008",
                label:
                  "PH-QCL01-AR-F-008 FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-009",
                label:
                  "PH-QCL01-AR-F-009 HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-010",
                label:
                  "PH-QCL01-AR-F-010 MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-012",
                label: "PH-QCL01-AR-F-012	DISTILLED WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-014",
                label: "PH-QCL01-AR-F-014 BRIQUETTES ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01/F-004",
                label:
                  "PH-QCL01/F-004 RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-005",
                label:
                  "PH-QCL01/F-005  ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT ",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-014",
                label:
                  "PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-015",
                label:
                  "PH-QCL01/F-015 VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-016",
                label: "PH-QCL01/F-016 STANDARDIZATION OF CHEMICAL SOLUTION",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01F-021",
                label: "PH-QCL01F-021 MEDIA GROWTH PROMOTION TEST REPORT",
              },
              {
                value: "PH-QCL01F-022",
                label: "PH-QCL01F-022 - MEDIA DISPOSAL RECORD",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),
        ...(role === "QC_MANAGER"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },

              {
                value: "PH-QCL01-AR-F-003",
                label: "PH-QCL01-AR-F-003 CHEMICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-008",
                label:
                  "PH-QCL01-AR-F-008 FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-009",
                label:
                  "PH-QCL01-AR-F-009 HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-010",
                label:
                  "PH-QCL01-AR-F-010 MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-012",
                label: "PH-QCL01-AR-F-012	DISTILLED WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-014",
                label: "PH-QCL01-AR-F-014 BRIQUETTES ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01/F-004",
                label:
                  "PH-QCL01/F-004 RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-005",
                label:
                  "PH-QCL01/F-005  ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-014",
                label:
                  "PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-015",
                label:
                  "PH-QCL01/F-015 VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-016",
                label: "PH-QCL01/F-016 STANDARDIZATION OF CHEMICAL SOLUTION",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01F-021",
                label: "PH-QCL01F-021 MEDIA GROWTH PROMOTION TEST REPORT",
              },
              {
                value: "PH-QCL01F-022",
                label: "PH-QCL01F-022 - MEDIA DISPOSAL RECORD",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),

        ...(role === "CHEMIST_DESIGNEE"
          ? [
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT ",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
            ]
          : []),

        ...(role === "MICRO_DESIGNEE"
          ? [
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01/F-030",
                label:
                  "PH-QCL01/F-030 DIGITAL COLONY COUNTER CALIBRATION REPORT",
              },
            ]
          : []),
        ...(role === "LAB_ASSISTANT"
          ? [
              {
                value: "PH-QCL01F-024",
                label: "PH-QCL01F-024 DISPOSAL RECORD (CHEMICAL/MEDIA)",
              },
            ]
          : []),
        ...(role === "ROLE_OPERATOR"
          ? [
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),
      ],
    },
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: qualityAssuranceOptions,
    },
    {
      label: <span>Engineering</span>,
      title: "Engineering",
      options: engineeringOptions,
    },
    {
      label: <span>Development</span>,
      title: "Development",
      options: DevelopmentOptions,
    },
  ];

  const QAForm = [
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: [
        ...(role !== "ROLE_PCI_TRAINED_PERSON"
          ? [
              {
                value: "PH-QAD01F-001",
                label: "PH-QAD01F-001 MANAGEMENT OF INCIDENCE",
              },
              {
                value: "PH-QAD01/F-002",
                label: "PH-QAD01/F-002 REQUEST & ISSUANCE OF DOCUMENT",
              },
              {
                value: "PH-QAD01/F-003",
                label: "PH-QAD01/F-003 DISTRIBUTION AND DESTRUCTION RECORD",
              },
              {
                value: "PH-QAD01-F-005",
                label: "PH-QAD01-F-005 TRAINING NEED IDENTIFICATION FORM",
              },
              {
                value: "PH-QAD01-F-006",
                label: "PH-QAD01-F-006 TRAINING CALENDAR",
              },
              {
                value: "PH-QAD01-F-007",
                label: "PH-QAD01-F-007 TRAINING RECORD",
              },
              {
                value: "PH-QAD01-F-008",
                label: "PH-QAD01-F-008 TRAINING CARD",
              },

              {
                value: "PH-QAD01-F-009",
                label: "PH-QAD01-F-009 TRAINING QUESSIONNAIRE",
              },
              {
                value: "PH-QAD01-F-010",
                label: "PH-QAD01-F-010 INTERNAL AUDIT SCHEDULE",
              },
              {
                value: "PH-QAD01-F-012",
                label: "PH-QAD01-F-012 INTERNAL AUDIT REPORT",
              },
              {
                value: "PH-QAD01-F-013",
                label: "PH-QAD01-F-013 INTERNAL AUDIT NC REPORT",
              },
              {
                value: "PH-QAD01-F-014",
                label: "PH-QAD01-F-014   SUMMARY OF INTERNAL AUDIT",
              },
              {
                value: "PH-QAD01-F-015",
                label: "PH-QAD01-F-015   ANNUAL PLAN",
              },
              {
                value: "PH-QAD01-F-016",
                label: "PH-QAD01-F-016   AGENDA FOR MANAGEMENT REVIEW MEETING",
              },
              {
                value: "PH-QAD01-F-017",
                label: "PH-QAD01-F-017 MINUTES OF MRM",
              },
              {
                value: "PH-QAD01-F-018",
                label: "PH-QAD01-F-018 CUSTOMER COMPLAINT REGISTER FORM",
              },

              {
                value: "PH-QAD01-F-019",
                label: "PH-QAD01-F-019 CUSTOMER COMPLAINT REGISTER",
              },

              {
                value: "PH-QAD01-F-020",
                label:
                  "PH-QAD01-F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
              },

              {
                value: "PH-QAD01-F-021",
                label: "PH-QAD01-F-021 NON-CONFORMITY LOG BOOK",
              },
              {
                value: "PH-QAD01-F-022",
                label: "PH-QAD01-F-022   SUPPLIER'S AUDIT PLAN",
              },
              {
                value: "PH-QAD01-F023",
                label: "PH-QAD01-F023 SUPPLIER AUDIT REPORT",
              },
              {
                value: "PH-QAD01-F-25",
                label: "PH-QAD01-F-25  SUMMARY OF TRACEABILITY",
              },
              {
                value: "PH-QAD01-F-026",
                label: "PH-QAD01-F-026 TEMPLATE FOR RECALL / MOCK RECALL",
              },
              {
                value: "PH-QAD01-F-027",
                label: "PH-QAD01-F-027 MINUTES OF MEETING - MOCK RECALL",
              },
              {
                value: "PH-QAD01-F-028",
                label: "PH-QAD01-F-028 ANNUAL PRODUCT REVIEW",
              },
              {
                value: "PH-QCL01-F-029",
                label: "PH-QCL01-F-029 NEW SAMPLE REQUEST",
              },
              {
                value: "PH-QAD01-F-029",
                label: "PH-QAD01-F-029   INWARD(CARTON) INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-030",
                label: "PH-QAD01-F-030   INWARD (FILM)  INSPECTION REPORT",
              },

              {
                value: "PH-QAD01-F-031",
                label: "PH-QAD01-F-031   INWARD (ZIPLOCK) INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-032",
                label: "PH-QAD01-F-032 INWARD (STICK) INSPECTION",
              },
              {
                value: "PH-QAD01-F-033",
                label: "PH-QAD01-F-033 INWARD INSPECTION JAR",
              },
              {
                value: "PH-QAD01-F-034",
                label:
                  "PH-QAD01-F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS) ",
              },
              {
                value: "PH-QAD01-F-035",
                label: "PH-QAD01-F-035 ONLINE INSPECTION FOR BALLS",
              },
              {
                value: "PH-QAD01-F-036",
                label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
              },

              {
                value: "PH-QAD01-F-037",
                label: "PH-QAD01-F-037 FINAL INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-038",
                label: "PH-QAD01-F-038 FINAL INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-039",
                label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-040",
                label: "PH-QAD01-F-040 PRODUCTION RETAINED SAMPLE REGISTER",
              },
              {
                value: "PH-QAD01-F-041",
                label: "PH-QAD01-F-041 CHANGE CONTROL FORM",
              },
              {
                value: "PH-QAD01-F-042",
                label: "PH-QAD01-F-042 CHANGE CONTROL LOG BOOK",
              },
              {
                value: "PH-QAD01-F-043",
                label: "PH-QAD01-F-043 QUALITY REVIEW MEETING",
              },

              {
                value: "PH-QAD01-F-044",
                label: "PH-QAD01-F-044 CORRECTIVE ACTION REPORT",
              },

              {
                value: "PH-QAD01-F-045",
                label: "PH-QAD01-F-045 BMR - ISSUE REGISTER",
              },

              {
                value: "PH-QAD01-F-046",
                label: "PH-QAD01-F-046 BATCH RELEASE NOTE",
              },

              {
                value: "PH-QAD01-F-047",
                label: "PH-QAD01-F-047 BATCH RELEASE CHECKLIST",
              },

              {
                value: "PH-QAD01/F-048",
                label: "PH-QAD01/F-048 DEVIATION FORM",
              },

              // PH-QAD01-F-049
              {
                value: "PH-QAD01-F-049",
                label: "PH-QAD01-F-049 PRODUCTION DISPOSITION LOGBOOK",
              },
              {
                value: "PH-QAD01-F-050",
                label:
                  "PH-QAD01-F-050 LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC",
              },

              {
                value: "PH-QAD01-F-051",
                label:
                  "PH-QAD01-F-051 CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC",
              },

              {
                value: "PH-QAD01-F-052",
                label: "PH-QAD01-F-052 BREAKAGE REPORT",
              },
              {
                value: "PH-QAD01-F-058",
                label: "PH-QAD01-F-058 METAL DETECTOR CALIBRATION RECORD",
              },
              {
                value: "PH-QAD01-F-059",
                label: "PH-QAD01-F-059 METAL DETECTOR PASS REPORT",
              },
              {
                value: "PH-QAD01-F-060",
                label: "PH-QAD01-F-060 MASTER LIST OF SHARP TOOLS",
              },

              {
                value: "PH-QAD01-f-60",
                label: "PH-QAD01-f-60 LIST OF SHARP TOOLS",
              },

              {
                value: "PH-QAD01-F-076",
                label: "PH-QAD01-F-076 TRAINING SESSION ALLOTMENT REGISTER",
              },
            ]
          : []),
        {
          value: "PH-HRD01-F-013",
          label: "PH-HRD01-F-013 RODENT BOX CHECK LIST",
        },

        {
          value: "PH-HRD01-F-014",
          label:
            "PH-HRD01-F-014 PEST CONTROL SERVICE REPORT - IMM (INTEGRATED MOSQUITO MANAGEMENT) SERVICE FOR MOSQUITOES",
        },
        {
          value: "PH-HRD01-F-015",
          label:
            "PH-HRD01-F-015  PEST CONTROL SERVICE REPORT 1 -INTEGRATED FLYING INSECT MANAGEMENT FOR HOUSE FLIES, DRAIN FLIES, FLESH FLIES",
        },
        {
          value: "PH-HRD01-F-016",
          label:
            "PH-HRD01-F-016 PEST CONTROL SERVICE REPORT 2 -INTEGRATED LIZARD MANAGEMENT (ILM) SERVICE FOR HOUSE LIZARDS",
        },
        {
          value: "PH-HRD01-F-017",
          label:
            "PH-HRD01-F-017 PEST CONTROL SERVICE REPORT 3 -INTEGRATED SPIDER MANAGEMENT SERVICE FOR SPIDER & CRAWLING INSECTS",
        },
        {
          value: "PH-HRD01-F-018",
          label:
            "PH-HRD01-F-018 PEST CONTROL SERVICE REPORT 4 -IPM (THERMAL FOGGING) FOR MOSQUITOES",
        },
        {
          value: "PH-HRD01-F-019",
          label:
            "PH-HRD01-F-019 PEST CONTROL SERVICE REPORT 5 -PRO-GUARD SERVICE FOR CRAWLING INSECTS",
        },
      ],
    },
    // {
    //   label: <span>Engineering</span>,
    //   title: "Engineering",
    //   options: engineeringOptions,
    // },
    {
      label: <span>Development</span>,
      title: "Development",
      options: DevelopmentOptions,
    },
  ];

  const storeForm = [
    {
      label: <span>Store</span>,
      title: "Store",
      options: [
        ...(role === "STORE_OPERATOR"
          ? [
              {
                value: "PH-STR01F-003",
                label: "PH-STR01F-003 RECEPTION CHECK LIST",
              },
              // {
              //   value: "PH-STR01F-008",
              //   label: "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
              // },
              {
                value: "PH-STR01F-009",
                label: "PH-STR01F-009 EYE WASH WITH SHOWER",
              },
            ]
          : []),
        ...(role === "STORE_INCHARGE"
          ? [
              {
                value: "PH-STR01F-001",
                label: "PH-STR01F-001 Material Inward Register",
              },
              {
                value: "PH-STR01F-003",
                label: "PH-STR01F-003 RECEPTION CHECK LIST",
              },
              {
                value: "PH-STR01F-006",
                label: "PH-STR01F-006 NON RETURNABLE GATE PASS",
              },
              {
                value: "PH-STR01F-008",
                label: "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
              },
              {
                value: "PH-STR01F-009",
                label: "PH-STR01F-009 EYE WASH WITH SHOWER",
              },
            ]
          : []),
        ...(role === "ROLE_HOD"
          ? [
              {
                value: "PH-STR01F-006",
                label: "PH-STR01F-006 NON RETURNABLE GATE PASS",
              },
            ]
          : []),
      ],
    },

    {
      label: <span>Engineering</span>,
      title: "Engineering",
      options: engineeringOptions,
    },
  ];

  const PPCForm = [
    ...(role === "PPC_ASSISTANT"
      ? [
          {
            value: "PH-PPC01/F-003",
            label: "PH-PPC01/F-003 Contract Review Meeting",
          },
          {
            value: "PH-PPC01/F-002",
            label: "PH-PPC01/F-002 Monthly plan Summary Details",
          },
        ]
      : []),
    ...(role === "PPC_INCHARGE"
      ? [
          {
            value: "PH-PPC01/F-002",
            label: "PH-PPC01/F-002 Monthly plan Summary Details",
          },
        ]
      : []),
    ...(role === "MARKET_REPRESENTATIVE"
      ? [
          {
            value: "PH-PPC01/F-003",
            label: "PH-PPC01/F-003 Contract Review Meeting",
          },
        ]
      : []),
    ...(role === "ROLE_QA"
      ? [
          {
            value: "PH-PPC01/F-004",
            label: "PH-PPC01/F-004 Pre-Production meeting",
          },
        ]
      : []),
    {
      label: <span>Development</span>,
      title: "Development",
      options: DevelopmentOptions,
    },
  ];

  const DispatchForms = [
    {
      label: <span>Dispatch</span>,
      title: "Dispatch",
      options: [
        ...(role !== "DISPATCH_OPEARTOR"
          ? [
              {
                value: "PH-DIS01/F-001",
                label: "PH-DIS01/F-001  FINISHED GOODS STOCK REGISTER",
              },
            ]
          : []),
        {
          value: "PH-STR01F-008",
          label: "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
        },
        // {
        //   value: "PH-QAD01-F-039",
        //   label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
        // },
      ],
    },
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: qualityAssuranceOptions,
    },
    // {
    //   label: <span>Engineering</span>,
    //   title: "Engineering",
    //   options: engineeringOptions,
    // },
    {
      label: <span>Stores</span>,
      title: "Stores",
      options: StoreOptions,
    },
  ];

  const DevelopmentForms = [
    ...(role === "DEVELOPMENT_MANAGER"
      ? [
          {
            value: "PH-QCL01F-029",
            label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
          },
          {
            value: "PH-DVP01/F-001",
            label: "PH-DVP01/F-001  PRODUCT DEVELOPMENT SHEET",
          },
        ]
      : []),
  ];

  const HRForm = [
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: qualityAssuranceOptionsHR,
    },
  ];

  // Buds
  const CottonBuds = [
    {
      label: <span>Cotton Buds</span>,
      title: "Cotton Buds",
      options: [
        {
          value: "PH-PRD06/F-001",
          label: "PH-PRD06/F-001 EQUIPMENT USAGE LOGBOOK - COTTON BUDS",
        },

        {
          value: "PH-PRD06/F-002",
          label: "PH-PRD06/F-002 LOG BOOK – COTTON BUDS",
        },
        {
          value: "PH-PRD06/F-003",
          label:
            "PH-PRD06/F-003 DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS",
        },
        {
          value: "PH-PRD04/f-004",
          label: "PH-PRD04/F-004 PRODUCT CHANGE OVER - COTTON BUDS",
        },
        {
          value: "PH-PRD06/F-004",
          label: "PH-PRD06/F-004 BATCH MANUFACTURING RECORD",
        },
        {
          value: "PH-QAD01-F-038",
          label: "PH-QAD01-F-038 FINAL INSPECTION REPORT",
        },
      ],
    },
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: [
        {
          value: "PH-QAD01-F-036",
          label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
        },
      ],
    },
  ];

  const marketting = [
    {
      label: <span>Market Representative</span>,
      title: "Market Representative",
      options: [
        {
          value: "PH-PPC01/F-003",
          label: "PH-PPC01/F-003 Contract Review Meeting",
        },
      ],
    },
  ];

  const QARELATEDFORMS = [
    {
      label: <span>Bleaching</span>,
      title: "Bleaching HOD",
      options: [
        {
          value: "PH-PRD01/F-001",
          label: "PH-PRD01/F-001 LAYDOWN CHECKLIST",
        },
        {
          value: "PH-PRD01/F-002",
          label: "PH-PRD01/F-002 METAL DETECTOR CHECK LIST",
        },
        {
          value: "PH-PRD01/F-003",
          label: "PH-PRD01/F-003 APPLIED CONTAMINATION REPORT (RAW COTTON)",
        },
        {
          value: "PH-PRD01/F-004",
          label: "PH-PRD01/F-004 CONTAMINATION REPORT (RAW COTTON)",
        },
        {
          value: "PH-PRD01/F-005",
          label:
            "PH-PRD01/F-005 EQUIPMENT USAGE LOG BOOK - BLOW ROOM & CARDING",
        },
        {
          value: "PH-PRD01/F-006",
          label: "PH-PRD01/F-006 EQUIPMENT USAGE LOG BOOK - CAKE PRESS",
        },
        {
          value: "PH-PRD01/F-007",
          label: "PH-PRD01/F-007 BLEACHING JOB CARD",
        },
        {
          value: "PH-PRD01/F-008",
          label: "PH-PRD01/F-008 EQUIPMENT USAGE LOG BOOK HYDRO EXTRACTOR",
        },
        {
          value: "PH-PRD01/F-009",
          label: "PH-PRD01/F-009 SANITIZATION OF MACHINES & SURFACES",
        },
        {
          value: "PH-PRD01/F-010",
          label:
            "PH-PRD01/F-010 BLEACHING HAND SANITIZATION REPORT AB BALE PRESS MACHINE",
        },
        {
          value: "PH-PRD01/F-011",
          label:
            "PH-PRD01/F-011 APPLIED CONTAMINATION REPORT (ABSORBENT BLEACHED COTTON)",
        },
        {
          value: "PH-PRD01/F-012",
          label:
            "PH-PRD01/F-012 CONTAMINATION CHECKING REPORT (ABSORBENT BLEACHED COTTON)",
        },
        { value: "PH-PRD01/F-013", label: "PH-PRD01/F-013 SHIFT LOG BOOK" },
        {
          value: "PH-PRD01/F-014",
          label:
            "PH-PRD01/F-014 MIXING CHANGE OVER & MACHINE CLEANING CHECK LIST BLOW ROOM & BLEACHING",
        },
        {
          value: "PH-PRD01/F-015",
          label: "PH-PRD01/F-015 EQUIPMENT USAGE LOG BOOK WASTE BALE PRESS",
        },
        {
          value: "PH-PRD01/F-016",
          label: "PH-PRD01/F-016 MACHINE CLEANING RECORD (DAILY)",
        },
        {
          value: "PRD01/F-02",
          label: "PRD01/F-02 HOUSE KEEPING CLEANING CHECKLIST",
        },
        {
          value: "PRD01/F-02A",
          label: "PRD01/F-02A HOUSE KEEPING CLEANING CHECK LIST",
        },
        {
          value: "PRD01/F-43",
          label: "PRD01/F-43 BATCH MANUFACTURING RECORD",
        },
        {
          value: "PH-PRD01/F-016 RE-PROCESSING REPORT",
          label: " PH-PRD01/F-016 RE-PROCESSING REPORT",
        },
      ],
    },
    {
      label: <span>Spunlace</span>,
      title: "Spunlace",
      options: [
        {
          value: "PH-PRD02/F-001",
          label: "PH-PRD02/F-001 BALE CONSUMPTION REPORT",
        },
        {
          value: "PH-PRD02/F-002",
          label: "PH-PRD02/F-002 PROCESS SETUP VERIFICATION OPENING LINE",
        },
        {
          value: "PH-PRD02/F-003",
          label: "PH-PRD02/F-003 PROCESS SETUP DETAILS JETLACE & DRYER",
        },
        {
          value: "PH-PRD02/F-004",
          label: "PH-PRD02/F-004 FILTER BAG CONSUMPTION DETAILS",
        },
        {
          value: "PH-PRD02/F-005",
          label: "PH-PRD02/F-005 PROCESS SETUP DETAILS - WINDER",
        },
        {
          value: "PH-PRD02/F-006",
          label: "PH-PRD02/F-006 DAILY PRODUCTION REPORT - SPUNLACE",
        },
        {
          value: "PH-PRD02/F-007",
          label: "PH-PRD02/F-007 DAILY REJECTION REPORT - SPUNLACE",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD02/F-008",
                label: "PH-PRD02/F-008 DAILY STOPPAGE REPORT - SPUNLACE",
              },
              {
                value: "PH-PRD02/F-009",
                label: "PH-PRD02/F-009 SPUNLACE GSM ANALYSIS REPORT",
              },
              {
                value: "PH-PRD02/F-010",
                label: "PH-QAD01/F-052 LOGBOOK – SPUNLACE PLANNING",
              },
              {
                value: "PH-PRD02/F-011",
                label: "PH-PRD02/F-010 PRODUCT CHANGE OVER CHECK LIST SPUNLACE",
              },
              {
                value: "PH-PRD02/F-012",
                label: "PH-PRD02/F-011 SAMPLE REPORT - SPUNLACE",
              },
              {
                value: "PH-PRD02/F-015",
                label: "PH-PRD02/F-014 RP BALE PRESS STOPPAGE REPORT",
              },
              {
                value: "PH-PRD02/F-019",
                label:
                  "PH-PRD02/F-020 SHIFT WISE COTTON WASTE REPORT OF SPUNLCAE",
              },
              {
                value: "PH-PRD02/F-020",
                label: "PH-PRD02/F-019 METAL DETECTOR CHECKLIST",
              },
              {
                value: "PH-PRD02/F-023",
                label: "PH-PRD02/F-023 MACHINE CLEANING RECORD (WEEKLY) ",
              },
              {
                value: "PH-PRD02/F-024",
                label: "PH-PRD02/F-021 SANITIZATION OF MACHINES & SURFACES ",
              },
              {
                value: "PH-PRD02/F-025",
                label: "PH-PRD02/F-025 SPUNLACE HAND SANITIASITON REPORT",
              },

              {
                value: "PRD02/F-26",
                label: "PRD02/F-26 BATCH MANUFACTURING RECORD BMR - Spunlace ",
              },
              {
                value: "PRD02/F-27",
                label: "PRD02/F-27 BATCH MANUFACTURING RECORD BMR - RP ",
              },
            ]
          : []),

        {
          value: "PH-PRD02/F-013",
          label: "PH-PRD02/F-012 PROCESS SETUP VERIFICATION - RP BALE PRESS",
        },
        {
          value: "PH-PRD02/F-014",
          label: "PH-PRD02/F-013 SHIFT WISE RP PRODUCTION REPORT",
        },

        {
          value: "PH-PRD02/F-016",
          label: "PH-PRD02/F-015 PROCESS SETUP VERIFICATION SLITER WINDER",
        },
        {
          value: "PH-PRD02/F-017",
          label: "PH-PRD02/F-016 SHIFT WISE SLITER WINDER PRODUCTION REPORT",
        },
        {
          value: "PH-PRD02/F-018",
          label: "PH-PRD02/F-017 SHIFT WISE STOPPAGE REPORT OF SLITER WINDER",
        },
      ],
    },
    {
      label: <span>Pad Punching</span>,
      title: "Pad Punching",
      options: [
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD03/F-001",
                label: "PH-PRD03/F-001 PRODUCTION DETAILS - LOG BOOK",
              },
            ]
          : []),
        {
          value: "PH-PRD03/F-002",
          label: "PH-PRD03/F-002 DAILY ROLL CONSUMPTION REPORT-PAD PUNCHING",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD03/F-003",
                label: "PH-PRD03/F-003 PRODUCT CHANGE OVER",
              },
              {
                value: "PH-PRD03/F-004",
                label: "PH-PRD03/F-004 DAILY PRODUCTION PACKING DETAILS",
              },
              {
                value: "PH-PRD03/F-005",
                label: "PH-PRD03/F-005 MACHINE CLEANING CHECK LIST",
              },
              {
                value: "PH-HRD03/F-006",
                label: "PH-HRD03/F-006 HAND SANITISATION REPORT",
              },
              {
                value: "PH-PRD03/F-007",
                label: "PH-PRD03/F-007 ARGUS METAL DETECTOR- CHECK LIST",
              },
              {
                value: "PH-PRD03/F-008",
                label: "PH-PRD03/F-008 SANITIZATION OF MACHINES & SURFACES",
              },
              {
                value: "PH-HRD01/F-006",
                label:
                  "PH-HRD01/F-006 HOUSE KEEPING CLEANING CHECK LIST (Pad Punching)",
              },
              {
                value: "PH-PRD03/F-009",
                label: "PH-PRD03/F-009 BATCH MANUFACTURING RECORD",
              },
            ]
          : []),

        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD05/F-003",
                label: "PH-PRD05/F-003 LOG BOOK - BAG MAKING",
              },
              {
                value: "PH-PRD05/F-001",
                label: "PH-PRD05/F-001 BAG MAKING DAILY PRODUCTION DETAILS",
              },
              {
                value: "PH-PRD05/F-002",
                label: "PH-PRD05/F-002 BAG MAKING - SPECIFICATION DETAILS",
              },
            ]
          : []),

        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-HRD01/F-010",
                label:
                  "PH-HRD01/F-010 HOUSE KEEPING CLEANING CHECK LIST (Bag Making)",
              },
            ]
          : []),
      ],
    },
    {
      label: <span>Dry Goods</span>,
      title: "Dry Goods",
      options: [
        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD04/F-001",
                label: "PH-PRD04/F-001 BALE CONSUMPTION REPORT",
              },
              {
                value: "PH-PRD04/F-002",
                label: "PH-PRD04/F-002 DAILY PRODUCTION - SLIVER MAKING",
              },
            ]
          : []),

        {
          value: "PH-PRD04/F-003",
          label: "PH-PRD04/F-003 DAILY PRODUCTION - COTTON BALLS",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD04/F-004",
                label:
                  "PH-PRD04/F-004 BATCH MANUFACTURING RECORD - COTTON BALL",
              },
            ]
          : []),

        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD04/F-005",
                label: "PH-PRD04/F-005 PRODUCTION REPORT - MINI ROLL",
              },
            ]
          : []),

        {
          value: "PH-PRD04/F-006",
          label: "PH-PRD04/F-006 DAILY PRODUCTION (PLEAT / WOOL ROLL)",
        },

        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD04/F-007",
                label: "PH-PRD04/F-007 BATCH MANUFACTURING RECORD - PLEAT",
              },
              {
                value: "PH-PRD04/F-008",
                label: "PH-PRD04/F-008 BATCH MANUFACTURING RECORD - WOOL ROLL",
              },
              ...(role === "ROLE_SUPERVISOR" ||
              role === "ROLE_HOD" ||
              role === "ROLE_QA" ||
              role === "ROLE_DESIGNEE"
                ? [
                    {
                      value: "PH-PRD04/F-009",
                      label: "PH-PRD04/F-009 PRODUCT CHANGE OVER - DRY GOODS",
                    },
                  ]
                : []),
              {
                value: "PH-PRD04/F-010",
                label: "PH-PRD04/F-010 LOG BOOK - DRY GOODS",
              },
              {
                value: "PH-PRD04/F-011",
                label:
                  "PH-PRD04/F-011 BALL, PLEAT & WOOL ROLL FINISHED GOODS TRANSFER RECORD",
              },
              {
                value: "PH-PRD04/F-012",
                label:
                  "PH-PRD04/F-012 SANITIZATION OF MACHINES & SURFACES - DRY GOODS",
              },
              {
                value: "PH-PRD04/F-013",
                label: "PH-PRD04/F-023 HAND SANITIZATION REPORT - DRY GOODS",
              },
              {
                value: "PH-HRD01/F-004",
                label:
                  "PH-HRD01/F-004 HOUSE KEEPING CLEANING CHECK LIST - DRY GOODS",
              },
            ]
          : []),
      ],
    },
    {
      label: <span>Cotton Buds</span>,
      title: "Cotton Buds",
      options: [
        {
          value: "PH-PRD04/f-004",
          label: "PH-PRD04/F-004 PRODUCT CHANGE OVER - COTTON BUDS",
        },
      ],
    },
    {
      label: <span>PPC</span>,
      title: "PPC",
      options: [
        {
          value: "PH-PPC01/F-004",
          label: "PH-PPC01/F-004 Pre-Production meeting",
        },
      ],
    },
    {
      label: <span>Quality Control</span>,
      title: "Quality Control",
      options: [
        ...(role === "ROLE_QA"
          ? [
              {
                value: "PH-QCL01-AR-F-005",
                label: "PH-QCL01-AR-F-005 NON-WOVEN FLEECE ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),
      ],
    },
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: [
        {
          value: "PH-QAD01-F-020",
          label:
            "PH-QAD01-F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
        },
        {
          value: "PH-QAD01-F-026",
          label: "PH-QAD01-F-026 TEMPLATE FOR RECALL / MOCK RECALL",
        },
        {
          value: "PH-QAD01-F-029",
          label: "PH-QAD01-F-029   INWARD(CARTON) INSPECTION REPORT",
        },
        {
          value: "PH-QAD01-F-030",
          label: "PH-QAD01-F-030   INWARD (FILM)  INSPECTION REPORT",
        },
        {
          value: "PH-QAD01-F-031",
          label: "PH-QAD01-F-031   INWARD (ZIPLOCK) INSPECTION REPORT",
        },
        {
          value: "PH-QAD01-F-032",
          label: "PH-QAD01-F-032 INWARD (STICK) INSPECTION",
        },
        {
          value: "PH-QAD01-F-033",
          label: "PH-QAD01-F-033 INWARD INSPECTION JAR",
        },
        {
          value: "PH-QAD01-F-034",
          label:
            "PH-QAD01-F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS) ",
        },
        {
          value: "PH-QAD01-F-035",
          label: "PH-QAD01-F-035 ONLINE INSPECTION FOR BALLS",
        },
        {
          value: "PH-QAD01-F-036",
          label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
        },
        {
          value: "PH-QAD01-F-037",
          label: "PH-QAD01-F-037 FINAL INSPECTION REPORT",
        },
        {
          value: "PH-QAD01-F-038",
          label: "PH-QAD01-F-038 FINAL INSPECTION REPORT",
        },
        {
          value: "PH-QAD01-F-039",
          label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
        },
        {
          value: "PH-QAD01-F-040",
          label: "PH-QAD01-F-040 PRODUCTION RETAINED SAMPLE REGISTER",
        },
        {
          value: "PH-QAD01-F-043",
          label: "PH-QAD01-F-043 QUALITY REVIEW MEETING",
        },
        {
          value: "PH-QAD01-F-044",
          label: "PH-QAD01-F-044 CORRECTIVE ACTION REPORT",
        },
        {
          value: "PH-QAD01-F-045",
          label: "PH-QAD01-F-045 BMR - ISSUE REGISTER",
        },
        {
          value: "PH-QAD01-F-047",
          label: "PH-QAD01-F-047 BATCH RELEASE CHECKLIST",
        },
        {
          value: "PH-QAD01-F-049",
          label: "PH-QAD01-F-049 PRODUCTION DISPOSITION LOGBOOK",
        },
        {
          value: "PH-QAD01-F-050",
          label: "PH-QAD01-F-050 LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC",
        },
        {
          value: "PH-QAD01-F-052",
          label: "PH-QAD01-F-052 BREAKAGE REPORT",
        },
        {
          value: "PH-QAD01-F-058",
          label: "PH-QAD01-F-058 METAL DETECTOR CALIBRATION RECORD",
        },
        {
          value: "PH-QAD01-F-059",
          label: "PH-QAD01-F-059 METAL DETECTOR PASS REPORT",
        },
        {
          value: "PH-QAD01-F-060",
          label: "PH-QAD01-F-060 MASTER LIST OF SHARP TOOLS",
        },
      ],
    },
  ];
  // multiple departments selection section
  const BleachingFormMS = [
    {
      label: <span>Bleaching</span>,
      title: "Bleaching HOD",
      options: [
        {
          value: "PH-PRD01/F-001",
          label: "PH-PRD01/F-001 LAYDOWN CHECKLIST",
        },
        {
          value: "PH-PRD01/F-002",
          label: "PH-PRD01/F-002 METAL DETECTOR CHECK LIST",
        },
        {
          value: "PH-PRD01/F-003",
          label: "PH-PRD01/F-003 APPLIED CONTAMINATION REPORT (RAW COTTON)",
        },
        {
          value: "PH-PRD01/F-004",
          label: "PH-PRD01/F-004 CONTAMINATION REPORT (RAW COTTON)",
        },
        {
          value: "PH-PRD01/F-005",
          label:
            "PH-PRD01/F-005 EQUIPMENT USAGE LOG BOOK - BLOW ROOM & CARDING",
        },
        {
          value: "PH-PRD01/F-006",
          label: "PH-PRD01/F-006 EQUIPMENT USAGE LOG BOOK - CAKE PRESS",
        },
        {
          value: "PH-PRD01/F-007",
          label: "PH-PRD01/F-007 BLEACHING JOB CARD",
        },
        {
          value: "PH-PRD01/F-008",
          label: "PH-PRD01/F-008 EQUIPMENT USAGE LOG BOOK HYDRO EXTRACTOR",
        },
        {
          value: "PH-PRD01/F-009",
          label: "PH-PRD01/F-009 SANITIZATION OF MACHINES & SURFACES",
        },
        {
          value: "PH-PRD01/F-010",
          label:
            "PH-PRD01/F-010 BLEACHING HAND SANITIZATION REPORT AB BALE PRESS MACHINE",
        },
        {
          value: "PH-PRD01/F-011",
          label:
            "PH-PRD01/F-011 APPLIED CONTAMINATION REPORT (ABSORBENT BLEACHED COTTON)",
        },
        {
          value: "PH-PRD01/F-012",
          label:
            "PH-PRD01/F-012 CONTAMINATION CHECKING REPORT (ABSORBENT BLEACHED COTTON)",
        },
        { value: "PH-PRD01/F-013", label: "PH-PRD01/F-013 SHIFT LOG BOOK" },
        {
          value: "PH-PRD01/F-014",
          label:
            "PH-PRD01/F-014 MIXING CHANGE OVER & MACHINE CLEANING CHECK LIST BLOW ROOM & BLEACHING",
        },
        {
          value: "PH-PRD01/F-015",
          label: "PH-PRD01/F-015 EQUIPMENT USAGE LOG BOOK WASTE BALE PRESS",
        },
        {
          value: "PH-PRD01/F-016",
          label: "PH-PRD01/F-016 MACHINE CLEANING RECORD (DAILY)",
        },
        {
          value: "PRD01/F-02",
          label: "PRD01/F-02 HOUSE KEEPING CLEANING CHECKLIST",
        },
        {
          value: "PRD01/F-02A",
          label: "PRD01/F-02A HOUSE KEEPING CLEANING CHECK LIST",
        },
        {
          value: "PRD01/F-43",
          label: "PRD01/F-43 BATCH MANUFACTURING RECORD",
        },
        {
          value: "PH-PRD01/F-016 RE-PROCESSING REPORT",
          label: " PH-PRD01/F-016 RE-PROCESSING REPORT",
        },
      ],
    },
  ];
  const SpunlaceFormMS = [
    {
      label: <span>Spunlace</span>,
      title: "Spunlace",
      options: [
        {
          value: "PH-PRD02/F-001",
          label: "PH-PRD02/F-001 BALE CONSUMPTION REPORT",
        },
        {
          value: "PH-PRD02/F-002",
          label: "PH-PRD02/F-002 PROCESS SETUP VERIFICATION OPENING LINE",
        },
        {
          value: "PH-PRD02/F-003",
          label: "PH-PRD02/F-003 PROCESS SETUP DETAILS JETLACE & DRYER",
        },
        {
          value: "PH-PRD02/F-004",
          label: "PH-PRD02/F-004 FILTER BAG CONSUMPTION DETAILS",
        },
        {
          value: "PH-PRD02/F-005",
          label: "PH-PRD02/F-005 PROCESS SETUP DETAILS - WINDER",
        },
        {
          value: "PH-PRD02/F-006",
          label: "PH-PRD02/F-006 DAILY PRODUCTION REPORT - SPUNLACE",
        },
        {
          value: "PH-PRD02/F-007",
          label: "PH-PRD02/F-007 DAILY REJECTION REPORT - SPUNLACE",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD02/F-008",
                label: "PH-PRD02/F-008 DAILY STOPPAGE REPORT - SPUNLACE",
              },
              {
                value: "PH-PRD02/F-009",
                label: "PH-PRD02/F-009 SPUNLACE GSM ANALYSIS REPORT",
              },
              {
                value: "PH-PRD02/F-010",
                label: "PH-QAD01/F-052 LOGBOOK – SPUNLACE PLANNING",
              },
              {
                value: "PH-PRD02/F-011",
                label: "PH-PRD02/F-010 PRODUCT CHANGE OVER CHECK LIST SPUNLACE",
              },
              {
                value: "PH-PRD02/F-012",
                label: "PH-PRD02/F-011 SAMPLE REPORT - SPUNLACE",
              },
              {
                value: "PH-PRD02/F-015",
                label: "PH-PRD02/F-014 RP BALE PRESS STOPPAGE REPORT",
              },
              {
                value: "PH-PRD02/F-019",
                label:
                  "PH-PRD02/F-020 SHIFT WISE COTTON WASTE REPORT OF SPUNLCAE",
              },
              {
                value: "PH-PRD02/F-020",
                label: "PH-PRD02/F-019 METAL DETECTOR CHECKLIST",
              },
              {
                value: "PH-PRD02/F-023",
                label: "PH-PRD02/F-023 MACHINE CLEANING RECORD (WEEKLY) ",
              },
              {
                value: "PH-PRD02/F-024",
                label: "PH-PRD02/F-021 SANITIZATION OF MACHINES & SURFACES ",
              },
              {
                value: "PH-PRD02/F-025",
                label: "PH-PRD02/F-025 SPUNLACE HAND SANITIASITON REPORT",
              },

              {
                value: "PRD02/F-26",
                label: "PRD02/F-26 BATCH MANUFACTURING RECORD BMR - Spunlace ",
              },
              {
                value: "PRD02/F-27",
                label: "PRD02/F-27 BATCH MANUFACTURING RECORD BMR - RP ",
              },
            ]
          : []),

        {
          value: "PH-PRD02/F-013",
          label: "PH-PRD02/F-012 PROCESS SETUP VERIFICATION - RP BALE PRESS",
        },
        {
          value: "PH-PRD02/F-014",
          label: "PH-PRD02/F-013 SHIFT WISE RP PRODUCTION REPORT",
        },

        {
          value: "PH-PRD02/F-016",
          label: "PH-PRD02/F-015 PROCESS SETUP VERIFICATION SLITER WINDER",
        },
        {
          value: "PH-PRD02/F-017",
          label: "PH-PRD02/F-016 SHIFT WISE SLITER WINDER PRODUCTION REPORT",
        },
        {
          value: "PH-PRD02/F-018",
          label: "PH-PRD02/F-017 SHIFT WISE STOPPAGE REPORT OF SLITER WINDER",
        },
      ],
    },
  ];

  const PadPunchingFormMS = [
    {
      label: <span>Pad Punching</span>,
      title: "Pad Punching",
      options: [
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD03/F-001",
                label: "PH-PRD03/F-001 PRODUCTION DETAILS - LOG BOOK",
              },
            ]
          : []),
        {
          value: "PH-PRD03/F-002",
          label: "PH-PRD03/F-002 DAILY ROLL CONSUMPTION REPORT-PAD PUNCHING",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD03/F-003",
                label: "PH-PRD03/F-003 PRODUCT CHANGE OVER",
              },
              {
                value: "PH-PRD03/F-004",
                label: "PH-PRD03/F-004 DAILY PRODUCTION PACKING DETAILS",
              },
              {
                value: "PH-PRD03/F-005",
                label: "PH-PRD03/F-005 MACHINE CLEANING CHECK LIST",
              },
              {
                value: "PH-HRD03/F-006",
                label: "PH-HRD03/F-006 HAND SANITISATION REPORT",
              },
              {
                value: "PH-PRD03/F-007",
                label: "PH-PRD03/F-007 ARGUS METAL DETECTOR- CHECK LIST",
              },
              {
                value: "PH-PRD03/F-008",
                label: "PH-PRD03/F-008 SANITIZATION OF MACHINES & SURFACES",
              },
              {
                value: "PH-HRD01/F-006",
                label:
                  "PH-HRD01/F-006 HOUSE KEEPING CLEANING CHECK LIST (Pad Punching)",
              },
              {
                value: "PH-PRD03/F-009",
                label: "PH-PRD03/F-009 BATCH MANUFACTURING RECORD",
              },
            ]
          : []),

        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD05/F-003",
                label: "PH-PRD05/F-003 LOG BOOK - BAG MAKING",
              },
              {
                value: "PH-PRD05/F-001",
                label: "PH-PRD05/F-001 BAG MAKING DAILY PRODUCTION DETAILS",
              },
              {
                value: "PH-PRD05/F-002",
                label: "PH-PRD05/F-002 BAG MAKING - SPECIFICATION DETAILS",
              },
            ]
          : []),

        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-HRD01/F-010",
                label:
                  "PH-HRD01/F-010 HOUSE KEEPING CLEANING CHECK LIST (Bag Making)",
              },
            ]
          : []),
      ],
    },
  ];

  const DryGoodsMS = [
    {
      label: <span>Dry Goods</span>,
      title: "Dry Goods",
      options: [
        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD04/F-001",
                label: "PH-PRD04/F-001 BALE CONSUMPTION REPORT",
              },
              {
                value: "PH-PRD04/F-002",
                label: "PH-PRD04/F-002 DAILY PRODUCTION - SLIVER MAKING",
              },
            ]
          : []),

        {
          value: "PH-PRD04/F-003",
          label: "PH-PRD04/F-003 DAILY PRODUCTION - COTTON BALLS",
        },
        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD04/F-004",
                label:
                  "PH-PRD04/F-004 BATCH MANUFACTURING RECORD - COTTON BALL",
              },
            ]
          : []),

        ...(role !== "ROLE_SUPERVISOR"
          ? [
              {
                value: "PH-PRD04/F-005",
                label: "PH-PRD04/F-005 PRODUCTION REPORT - MINI ROLL",
              },
            ]
          : []),

        {
          value: "PH-PRD04/F-006",
          label: "PH-PRD04/F-006 DAILY PRODUCTION (PLEAT / WOOL ROLL)",
        },

        ...(role !== "ROLE_OPERATOR"
          ? [
              {
                value: "PH-PRD04/F-007",
                label: "PH-PRD04/F-007 BATCH MANUFACTURING RECORD - PLEAT",
              },
              {
                value: "PH-PRD04/F-008",
                label: "PH-PRD04/F-008 BATCH MANUFACTURING RECORD - WOOL ROLL",
              },
              ...(role === "ROLE_SUPERVISOR" ||
              role === "ROLE_HOD" ||
              role === "ROLE_QA" ||
              role === "ROLE_DESIGNEE"
                ? [
                    {
                      value: "PH-PRD04/F-009",
                      label: "PH-PRD04/F-009 PRODUCT CHANGE OVER - DRY GOODS",
                    },
                  ]
                : []),
              {
                value: "PH-PRD04/F-010",
                label: "PH-PRD04/F-010 LOG BOOK - DRY GOODS",
              },
              {
                value: "PH-PRD04/F-011",
                label:
                  "PH-PRD04/F-011 BALL, PLEAT & WOOL ROLL FINISHED GOODS TRANSFER RECORD",
              },
              {
                value: "PH-PRD04/F-012",
                label:
                  "PH-PRD04/F-012 SANITIZATION OF MACHINES & SURFACES - DRY GOODS",
              },
              {
                value: "PH-PRD04/F-013",
                label: "PH-PRD04/F-023 HAND SANITIZATION REPORT - DRY GOODS",
              },
              {
                value: "PH-HRD01/F-004",
                label:
                  "PH-HRD01/F-004 HOUSE KEEPING CLEANING CHECK LIST - DRY GOODS",
              },
            ]
          : []),
      ],
    },
  ];

  const QCFormMS = [
    {
      label: <span>Quality Control</span>,
      title: "Quality Control",
      options: [
        ...(role === "ROLE_QA"
          ? [
              {
                value: "PH-QCL01-AR-F-005",
                label: "PH-QCL01-AR-F-005 NON-WOVEN FLEECE ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),

        ...(role === "ROLE_MICROBIOLOGIST"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-008",
                label:
                  "PH-QCL01-AR-F-008 FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-009",
                label:
                  "PH-QCL01-AR-F-009 HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-010",
                label:
                  "PH-QCL01-AR-F-010 MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01F-002",
                label: "PH-QCL01F-002	MICROBIOLOGY LAB SAMPLE INWARD BOOK",
              },
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-014",
                label:
                  "PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-015",
                label:
                  "PH-QCL01/F-015 VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01F-021",
                label: "PH-QCL01F-021 MEDIA GROWTH PROMOTION TEST REPORT",
              },
              {
                value: "PH-QCL01F-022",
                label: "PH-QCL01F-022 - MEDIA DISPOSAL RECORD",
              },
              {
                value: "PH-QCL01/F-023",
                label: "PH-QCL01/F-023 CLEANING OF AUTOCLAVES",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01/F-027",
                label: "PH-QCL01/F-027 DISTILLED WATER CONSUMPTION REPORT",
              },
              {
                value: "PH-QCL01F-028",
                label: "PH-QCL01F-028 GLASSWARES BREAKAGE & DISPOSAL REGISTER",
              },
              {
                value: "PH-QCL01/F-030",
                label:
                  "PH-QCL01/F-030 DIGITAL COLONY COUNTER CALIBRATION REPORT",
              },
            ]
          : []),
        ...(role === "ROLE_CHEMIST"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-003",
                label: "PH-QCL01-AR-F-003 CHEMICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-012",
                label: "PH-QCL01-AR-F-012	DISTILLED WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-014",
                label: "PH-QCL01-AR-F-014 BRIQUETTES ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01F-001",
                label:
                  "PH-QCL01F-001	PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK",
              },
              {
                value: "PH-QCL01F-003",
                label: "PH-QCL01F-003	ETP LAB SAMPLE INWARD BOOK",
              },
              {
                value: "PH-QCL01/F-004",
                label:
                  "PH-QCL01/F-004 RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-005",
                label:
                  "PH-QCL01/F-005  ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT ",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01/F-016",
                label: "PH-QCL01/F-016 STANDARDIZATION OF CHEMICAL SOLUTION",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },

              {
                value: "PH-QCL01/F-027",
                label: "PH-QCL01/F-027 DISTILLED WATER CONSUMPTION REPORT",
              },
              {
                value: "PH-QCL01F-028",
                label: "PH-QCL01F-028 GLASSWARES BREAKAGE & DISPOSAL REGISTER",
              },
            ]
          : []),

        ...(role === "ROLE_ETP"
          ? [
              {
                value: "PH-QCL01F-003",
                label: "PH-QCL01F-003	ETP LAB SAMPLE INWARD BOOK",
              },
            ]
          : []),
        ...(role === "QA_EXECUTIVE"
          ? [
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },
            ]
          : []),
        ...(role === "QA_MANAGER"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-003",
                label: "PH-QCL01-AR-F-003 CHEMICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-005",
                label: "PH-QCL01-AR-F-005 NON-WOVEN FLEECE ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-008",
                label:
                  "PH-QCL01-AR-F-008 FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-009",
                label:
                  "PH-QCL01-AR-F-009 HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-010",
                label:
                  "PH-QCL01-AR-F-010 MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-012",
                label: "PH-QCL01-AR-F-012	DISTILLED WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-014",
                label: "PH-QCL01-AR-F-014 BRIQUETTES ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01/F-004",
                label:
                  "PH-QCL01/F-004 RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-005",
                label:
                  "PH-QCL01/F-005  ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT ",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-014",
                label:
                  "PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-015",
                label:
                  "PH-QCL01/F-015 VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-016",
                label: "PH-QCL01/F-016 STANDARDIZATION OF CHEMICAL SOLUTION",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01F-021",
                label: "PH-QCL01F-021 MEDIA GROWTH PROMOTION TEST REPORT",
              },
              {
                value: "PH-QCL01F-022",
                label: "PH-QCL01F-022 - MEDIA DISPOSAL RECORD",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),
        ...(role === "QC_MANAGER"
          ? [
              {
                value: "PH-QCL01-AR-F-001",
                label:
                  "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
              },
              {
                value: "PH-QCL01-AR-F-002",
                label:
                  "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
              },

              {
                value: "PH-QCL01-AR-F-003",
                label: "PH-QCL01-AR-F-003 CHEMICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-004",
                label: "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-006",
                label: "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-007",
                label: "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-008",
                label:
                  "PH-QCL01-AR-F-008 FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-009",
                label:
                  "PH-QCL01-AR-F-009 HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-010",
                label:
                  "PH-QCL01-AR-F-010 MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
              },
              {
                value: "PH-QCL01-AR-F-011",
                label:
                  "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
              },
              {
                value: "PH-QCL01-AR-F-012",
                label: "PH-QCL01-AR-F-012	DISTILLED WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-013",
                label: "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01-AR-F-014",
                label: "PH-QCL01-AR-F-014 BRIQUETTES ANALYSIS REPORT",
              },
              {
                value: "PH-QCL01/F-004",
                label:
                  "PH-QCL01/F-004 RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-005",
                label:
                  "PH-QCL01/F-005  ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
              },
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-014",
                label:
                  "PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-015",
                label:
                  "PH-QCL01/F-015 VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
              },
              {
                value: "PH-QCL01/F-016",
                label: "PH-QCL01/F-016 STANDARDIZATION OF CHEMICAL SOLUTION",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01F-021",
                label: "PH-QCL01F-021 MEDIA GROWTH PROMOTION TEST REPORT",
              },
              {
                value: "PH-QCL01F-022",
                label: "PH-QCL01F-022 - MEDIA DISPOSAL RECORD",
              },
              {
                value: "PH-QCL01F-025",
                label:
                  "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
              },
              {
                value: "PH-QCL01-F-26",
                label:
                  "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
              },

              {
                value: "PH-QCL01-F-26A",
                label:
                  "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026B",
                label:
                  "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
              },
              {
                value: "PH-QCL01/F-026C",
                label:
                  "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
              },
              {
                value: "PH-QCL01/F-026D",
                label:
                  "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
              },
              {
                value: "PH-QCL01/F-026E",
                label:
                  "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
              },
              {
                value: "PH-QCL01/F-026F",
                label:
                  "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
              },
              {
                value: "PH-QCL01/F-026G",
                label:
                  "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%) ",
              },
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),

        ...(role === "CHEMIST_DESIGNEE"
          ? [
              {
                value: "PH-QCL01/F-006",
                label: "PH-QCL01/F-006 pH-METER CALIBRATION REPORT ",
              },
              {
                value: "PH-QCL01/F-007",
                label: "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-008",
                label: "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-009",
                label: "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-010",
                label:
                  "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-011",
                label:
                  "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
            ]
          : []),

        ...(role === "MICRO_DESIGNEE"
          ? [
              {
                value: "PH-QCL01F-012",
                label:
                  "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-013",
                label:
                  "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
              },
              {
                value: "PH-QCL01F-017",
                label: "PH-QCL01F-017 REAGENT PREPARATION RECORD",
              },
              {
                value: "PH-QCL01F-018",
                label:
                  "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
              },
              {
                value: "PH-QCL01F-019",
                label: "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
              },
              {
                value: "PH-QCL01/F-020",
                label:
                  "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS ",
              },
              {
                value: "PH-QCL01/F-030",
                label:
                  "PH-QCL01/F-030 DIGITAL COLONY COUNTER CALIBRATION REPORT",
              },
            ]
          : []),
        ...(role === "LAB_ASSISTANT"
          ? [
              {
                value: "PH-QCL01F-024",
                label: "PH-QCL01F-024 DISPOSAL RECORD (CHEMICAL/MEDIA)",
              },
            ]
          : []),
        ...(role === "ROLE_OPERATOR"
          ? [
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
            ]
          : []),
      ],
    },
  ];

  const QAFormMS = [
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: [
        ...(role !== "ROLE_PCI_TRAINED_PERSON"
          ? [
              {
                value: "PH-QAD01F-001",
                label: "PH-QAD01F-001 MANAGEMENT OF INCIDENCE",
              },
              {
                value: "PH-QAD01/F-002",
                label: "PH-QAD01/F-002 REQUEST & ISSUANCE OF DOCUMENT",
              },
              {
                value: "PH-QAD01/F-003",
                label: "PH-QAD01/F-003 DISTRIBUTION AND DESTRUCTION RECORD",
              },
              {
                value: "PH-QAD01-F-005",
                label: "PH-QAD01-F-005 TRAINING NEED IDENTIFICATION FORM",
              },
              {
                value: "PH-QAD01-F-006",
                label: "PH-QAD01-F-006 TRAINING CALENDAR",
              },
              {
                value: "PH-QAD01-F-007",
                label: "PH-QAD01-F-007 TRAINING RECORD",
              },
              {
                value: "PH-QAD01-F-008",
                label: "PH-QAD01-F-008 TRAINING CARD",
              },
              {
                value: "PH-QAD01-F-009",
                label: "PH-QAD01-F-009 TRAINING QUESSIONNAIRE",
              },
              {
                value: "PH-QAD01-F-010",
                label: "PH-QAD01-F-010 INTERNAL AUDIT SCHEDULE",
              },
              {
                value: "PH-QAD01-F-012",
                label: "PH-QAD01-F-012 INTERNAL AUDIT REPORT",
              },
              {
                value: "PH-QAD01-F-013",
                label: "PH-QAD01-F-013 INTERNAL AUDIT NC REPORT",
              },
              {
                value: "PH-QAD01-F-014",
                label: "PH-QAD01-F-014   SUMMARY OF INTERNAL AUDIT",
              },
              {
                value: "PH-QAD01-F-015",
                label: "PH-QAD01-F-015   ANNUAL PLAN",
              },
              {
                value: "PH-QAD01-F-016",
                label: "PH-QAD01-F-016   AGENDA FOR MANAGEMENT REVIEW MEETING",
              },
              {
                value: "PH-QAD01-F-017",
                label: "PH-QAD01-F-017 MINUTES OF MRM",
              },
              {
                value: "PH-QAD01-F-018",
                label: "PH-QAD01-F-018 CUSTOMER COMPLAINT REGISTER FORM",
              },

              {
                value: "PH-QAD01-F-019",
                label: "PH-QAD01-F-019 CUSTOMER COMPLAINT REGISTER",
              },

              {
                value: "PH-QAD01-F-020",
                label:
                  "PH-QAD01-F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
              },

              {
                value: "PH-QAD01-F-021",
                label: "PH-QAD01-F-021 NON-CONFORMITY LOG BOOK",
              },
              {
                value: "PH-QAD01-F-022",
                label: "PH-QAD01-F-022   SUPPLIER'S AUDIT PLAN",
              },
              {
                value: "PH-QAD01-F023",
                label: "PH-QAD01-F023 SUPPLIER AUDIT REPORT",
              },
              {
                value: "PH-QAD01-F-25",
                label: "PH-QAD01-F-25  SUMMARY OF TRACEABILITY",
              },
              {
                value: "PH-QAD01-F-026",
                label: "PH-QAD01-F-026 TEMPLATE FOR RECALL / MOCK RECALL",
              },
              {
                value: "PH-QAD01-F-027",
                label: "PH-QAD01-F-027 MINUTES OF MEETING - MOCK RECALL",
              },
              {
                value: "PH-QAD01-F-028",
                label: "PH-QAD01-F-028 ANNUAL PRODUCT REVIEW",
              },
              {
                value: "PH-QCL01-F-029",
                label: "PH-QCL01-F-029 NEW SAMPLE REQUEST",
              },
              {
                value: "PH-QAD01-F-029",
                label: "PH-QAD01-F-029   INWARD(CARTON) INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-030",
                label: "PH-QAD01-F-030   INWARD (FILM)  INSPECTION REPORT",
              },

              {
                value: "PH-QAD01-F-031",
                label: "PH-QAD01-F-031   INWARD (ZIPLOCK) INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-032",
                label: "PH-QAD01-F-032 INWARD (STICK) INSPECTION",
              },
              {
                value: "PH-QAD01-F-033",
                label: "PH-QAD01-F-033 INWARD INSPECTION JAR",
              },
              {
                value: "PH-QAD01-F-034",
                label:
                  "PH-QAD01-F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS) ",
              },
              {
                value: "PH-QAD01-F-035",
                label: "PH-QAD01-F-035 ONLINE INSPECTION FOR BALLS",
              },
              {
                value: "PH-QAD01-F-036",
                label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
              },

              {
                value: "PH-QAD01-F-037",
                label: "PH-QAD01-F-037 FINAL INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-038",
                label: "PH-QAD01-F-038 FINAL INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-039",
                label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
              },
              {
                value: "PH-QAD01-F-040",
                label: "PH-QAD01-F-040 PRODUCTION RETAINED SAMPLE REGISTER",
              },
              {
                value: "PH-QAD01-F-041",
                label: "PH-QAD01-F-041 CHANGE CONTROL FORM",
              },
              {
                value: "PH-QAD01-F-042",
                label: "PH-QAD01-F-042 CHANGE CONTROL LOG BOOK",
              },
              {
                value: "PH-QAD01-F-043",
                label: "PH-QAD01-F-043 QUALITY REVIEW MEETING",
              },

              {
                value: "PH-QAD01-F-044",
                label: "PH-QAD01-F-044 CORRECTIVE ACTION REPORT",
              },

              {
                value: "PH-QAD01-F-045",
                label: "PH-QAD01-F-045 BMR - ISSUE REGISTER",
              },

              {
                value: "PH-QAD01-F-046",
                label: "PH-QAD01-F-046 BATCH RELEASE NOTE",
              },

              {
                value: "PH-QAD01-F-047",
                label: "PH-QAD01-F-047 BATCH RELEASE CHECKLIST",
              },

              {
                value: "PH-QAD01/F-048",
                label: "PH-QAD01/F-048 DEVIATION FORM",
              },

              // PH-QAD01-F-049
              {
                value: "PH-QAD01-F-049",
                label: "PH-QAD01-F-049 PRODUCTION DISPOSITION LOGBOOK",
              },
              {
                value: "PH-QAD01-F-050",
                label:
                  "PH-QAD01-F-050 LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC",
              },

              {
                value: "PH-QAD01-F-051",
                label:
                  "PH-QAD01-F-051 CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC",
              },

              {
                value: "PH-QAD01-F-052",
                label: "PH-QAD01-F-052 BREAKAGE REPORT",
              },
              {
                value: "PH-QAD01-F-058",
                label: "PH-QAD01-F-058 METAL DETECTOR CALIBRATION RECORD",
              },
              {
                value: "PH-QAD01-F-059",
                label: "PH-QAD01-F-059 METAL DETECTOR PASS REPORT",
              },
              {
                value: "PH-QAD01-F-060",
                label: "PH-QAD01-F-060 MASTER LIST OF SHARP TOOLS",
              },

              {
                value: "PH-QAD01-f-60",
                label: "PH-QAD01-f-60 LIST OF SHARP TOOLS",
              },

              {
                value: "PH-QAD01-F-076",
                label: "PH-QAD01-F-076 TRAINING SESSION ALLOTMENT REGISTER",
              },
            ]
          : []),
        {
          value: "PH-HRD01-F-013",
          label: "PH-HRD01-F-013 RODENT BOX CHECK LIST",
        },

        {
          value: "PH-HRD01-F-014",
          label:
            "PH-HRD01-F-014 PEST CONTROL SERVICE REPORT - IMM (INTEGRATED MOSQUITO MANAGEMENT) SERVICE FOR MOSQUITOES",
        },
        {
          value: "PH-HRD01-F-015",
          label:
            "PH-HRD01-F-015  PEST CONTROL SERVICE REPORT 1 -INTEGRATED FLYING INSECT MANAGEMENT FOR HOUSE FLIES, DRAIN FLIES, FLESH FLIES",
        },
        {
          value: "PH-HRD01-F-016",
          label:
            "PH-HRD01-F-016 PEST CONTROL SERVICE REPORT 2 -INTEGRATED LIZARD MANAGEMENT (ILM) SERVICE FOR HOUSE LIZARDS",
        },
        {
          value: "PH-HRD01-F-017",
          label:
            "PH-HRD01-F-017 PEST CONTROL SERVICE REPORT 3 -INTEGRATED SPIDER MANAGEMENT SERVICE FOR SPIDER & CRAWLING INSECTS",
        },
        {
          value: "PH-HRD01-F-018",
          label:
            "PH-HRD01-F-018 PEST CONTROL SERVICE REPORT 4 -IPM (THERMAL FOGGING) FOR MOSQUITOES",
        },
        {
          value: "PH-HRD01-F-019",
          label:
            "PH-HRD01-F-019 PEST CONTROL SERVICE REPORT 5 -PRO-GUARD SERVICE FOR CRAWLING INSECTS",
        },
      ],
    },
    // {
    //   label: <span>Engineering</span>,
    //   title: "Engineering",
    //   options: engineeringOptions,
    // },
    {
      label: <span>Development</span>,
      title: "Development",
      options: DevelopmentOptions,
    },
  ];

  const PPCFormMS = [
    {
      label: <span>PPC</span>,
      title: "PPC",
      options: [
        ...(role === "PPC_ASSISTANT"
          ? [
              {
                value: "PH-PPC01/F-003",
                label: "PH-PPC01/F-003 Contract Review Meeting",
              },
              {
                value: "PH-PPC01/F-002",
                label: "PH-PPC01/F-002 Monthly plan Summary Details",
              },
            ]
          : []),
        ...(role === "PPC_INCHARGE"
          ? [
              {
                value: "PH-PPC01/F-002",
                label: "PH-PPC01/F-002 Monthly plan Summary Details",
              },
            ]
          : []),
        ...(role === "MARKET_REPRESENTATIVE"
          ? [
              {
                value: "PH-PPC01/F-003",
                label: "PH-PPC01/F-003 Contract Review Meeting",
              },
            ]
          : []),

        ...(role === "ROLE_QA"
          ? [
              {
                value: "PH-PPC01/F-004",
                label: "PH-PPC01/F-004 Pre-Production meeting",
              },
            ]
          : []),
      ],
    },
  ];

  const storeFormMS = [
    {
      label: <span>Store</span>,
      title: "Store",
      options: [
        ...(role === "STORE_OPERATOR"
          ? [
              {
                value: "PH-STR01F-003",
                label: "PH-STR01F-003 RECEPTION CHECK LIST",
              },
              // {
              //   value: "PH-STR01F-008",
              //   label: "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
              // },
              {
                value: "PH-STR01F-009",
                label: "PH-STR01F-009 EYE WASH WITH SHOWER",
              },
            ]
          : []),
        ...(role === "STORE_INCHARGE"
          ? [
              {
                value: "PH-STR01F-001",
                label: "PH-STR01F-001 Material Inward Register",
              },
              {
                value: "PH-STR01F-003",
                label: "PH-STR01F-003 RECEPTION CHECK LIST",
              },
              {
                value: "PH-STR01F-006",
                label: "PH-STR01F-006 NON RETURNABLE GATE PASS",
              },
              {
                value: "PH-STR01F-008",
                label: "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
              },
              {
                value: "PH-STR01F-009",
                label: "PH-STR01F-009 EYE WASH WITH SHOWER",
              },
            ]
          : []),
        ...(role === "ROLE_HOD"
          ? [
              {
                value: "PH-STR01F-006",
                label: "PH-STR01F-006 NON RETURNABLE GATE PASS",
              },
            ]
          : []),
      ],
    },
  ];

  const DispatchFormsMS = [
    {
      label: <span>Dispatch</span>,
      title: "Dispatch",
      options: [
        {
          value: "PH-DIS01/F-001",
          label: "PH-DIS01/F-001  FINISHED GOODS STOCK REGISTER",
        },
        {
          value: "PH-STR01F-008",
          label: "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
        },
        // {
        //   value: "PH-QAD01-F-039",
        //   label: "PH-QAD01-F-039 CONTAINER INSPECTION REPORT",
        // },
      ],
    },
  ];

  const DevelopmentFormsMS = [
    {
      label: <span>Development</span>,
      title: "Development",
      options: [
        ...(role === "DEVELOPMENT_MANAGER"
          ? [
              {
                value: "PH-QCL01F-029",
                label: "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
              },
              {
                value: "PH-DVP01/F-001",
                label: "PH-DVP01/F-001  PRODUCT DEVELOPMENT SHEET",
              },
            ]
          : []),
      ],
    },
  ];

  const CottonBudsMS = [
    {
      label: <span>Cotton Buds</span>,
      title: "Cotton Buds",
      options: [
        {
          value: "PH-PRD06/F-001",
          label: "PH-PRD06/F-001 EQUIPMENT USAGE LOGBOOK - COTTON BUDS",
        },

        {
          value: "PH-PRD06/F-002",
          label: "PH-PRD06/F-002 LOG BOOK – COTTON BUDS",
        },
        {
          value: "PH-PRD06/F-003",
          label:
            "PH-PRD06/F-003 DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS",
        },
        {
          value: "PH-PRD04/f-004",
          label: "PH-PRD04/F-004 PRODUCT CHANGE OVER - COTTON BUDS",
        },
        {
          value: "PH-PRD06/F-004",
          label: "PH-PRD06/F-004 BATCH MANUFACTURING RECORD",
        },
        {
          value: "PH-QAD01-F-038",
          label: "PH-QAD01-F-038 FINAL INSPECTION REPORT",
        },
      ],
    },
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: [
        {
          value: "PH-QAD01-F-036",
          label: "PH-QAD01-F-036 INPROCESS INSPECTION REPORT  BUDS",
        },
      ],
    },
  ];

  const markettingMS = [
    {
      label: <span>Market Representative</span>,
      title: "Market Representative",
      options: [
        {
          value: "PH-PPC01/F-003",
          label: "PH-PPC01/F-003 Contract Review Meeting",
        },
      ],
    },
  ];

  const HRFormMS = [
    {
      label: <span>Quality Assurance</span>,
      title: "Quality Assurance",
      options: qualityAssuranceOptionsHR,
    },
  ];

  const departmentIds =
    localStorage.getItem("departmentId")?.split(",").map(Number) || [];

  console.log("departmentIds", departmentIds);
  // Mapping department numbers to corresponding form objects
  const departmentFormsMap = {
    1: BleachingFormMS,
    2: SpunlaceFormMS,
    3: PadPunchingFormMS,
    4: DryGoodsMS,
    5: QCFormMS,
    6: QAFormMS,
    7: PPCFormMS,
    8: storeFormMS,
    9: DispatchFormsMS,
    10: DevelopmentFormsMS,
    12: CottonBudsMS,
    13: markettingMS,
    14: HRFormMS,
  };

  // Constructing the `forms` array dynamically
  let mulitpleDepartmentsForms = departmentIds.reduce((acc, id) => {
    if (departmentFormsMap[id]) {
      acc.push(...departmentFormsMap[id]);
    }
    return acc;
  }, []);

  console.log("forms2", mulitpleDepartmentsForms);

  let forms;
  if (role === "ROLE_QA") {
    forms = QARELATEDFORMS;
    console.log("QARELATEDFORMS", QARELATEDFORMS);
  } else {
    switch (department) {
      case 1:
        forms = BleachingForm;
        break;
      case 2:
        forms = SpunlaceForm;
        break;
      case 3:
        forms = PadPunchingForm;
        break;
      case 4:
        forms = DryGoods;
        break;
      case 5:
        forms = QCForm;
        break;
      case 6:
        forms = QAForm;
        break;
      case 7:
        forms = PPCForm;
        break;
      case 8:
        forms = storeForm;
        break;
      case 9:
        forms = DispatchForms;
        break;
      case 10:
        forms = DevelopmentForms;
        break;
      case 12:
        forms = CottonBuds;
        break;
      case 13:
        forms = marketting;
        break;
      case 14:
        forms = HRForm;
        break;
      default:
        forms = mulitpleDepartmentsForms;
        break;
    }
  }

  const handleChange = (value) => {
    // console.log(`selected ${value}`);

    switch (value) {
      case "PH-PRD01/F-008":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-11/Summary");
        break;
      case "PRD01/F-02":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/F-02/Summary");
        // navigate("/Precot/Bleaching/F-02/Summary");
        break;
      case "PH-PRD01/F-002":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-03/Summary");
        break;
      case "PH-PRD01/F-003":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-04/Summary");
        break;
      case "PH-PRD01/F-004":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-05/Summary");
        break;
      case "PH-PRD01/F-006":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-09/Summary");
        break;

      case "PH-PRD01/F-012":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-18/Summary");
        break;
      case "PH-PRD01/F-001":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-42/Summary");
        break;
      case "PH-PRD01/F-009":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-01/Summary");
        break;
      case "PH-PRD01/F-007":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-13/Summary");
        break;

      case "PH-PRD01/F-015":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/F-33/Summary");
        break;

      case "PH-PRD01/F-016 RE-PROCESSING REPORT":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/ReprocessSummary");
        break;

      case "PH-PRD01/F-013":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/F-36/Summary");
        break;
      case "PH-PRD01/F-010":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/F-41/Summary");
        break;
      case "PRD01/F-02A":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/F-02A/Summary");
        break;
      case "PH-PRD01/F-014":
        setenableBmr(false);
        setbtnenable(false);
        if (
          localStorage.getItem("role") == "ROLE_HOD" ||
          localStorage.getItem("role") === "ROLE_DESIGNEE"
        ) {
          setRoutePath("/Precot/Bleaching/F-38/HOD_Summary");
        } else {
          setRoutePath("/Precot/Bleaching/F-38/Supervisor_Summary");
        }
        break;
      case "PH-PRD01/F-005":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Bleaching/F-34/Summary");
        break;
      case "PH-PRD01/F-011":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/F-08/Summary");
        break;
      case "PRD01/F-43":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/BMR/Summary");
        break;
      case "PH-PRD01/F-016":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Bleaching/F-16/Summary");
        break;

      // Spunlace Department
      case "PH-PRD02/F-001":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-001");
        setRoutePath("/Precot/Spunlace/F-01/Summary");
        break;

      case "PH-PRD02/F-002":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-002");
        setRoutePath("/Precot/Spunlace/F-02/Summary");
        break;
      case "PH-PRD02/F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-003");
        setRoutePath("/Precot/Spunlace/F-03/Summary");
        break;
      case "PH-PRD02/F-004":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-004");
        setRoutePath("/Precot/Spunlace/F-04/Summary");
        break;
      case "PH-PRD02/F-005":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-005");
        setRoutePath("/Precot/Spunlace/F-05/Summary");
        break;
      case "PH-PRD02/F-006":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-006");
        setRoutePath("/Precot/Spunlace/F-06/Summary");
        break;
      case "PH-PRD02/F-007":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-007");
        setRoutePath("/Precot/Spunlace/F-07/Summary");
        break;
      case "PH-PRD02/F-008":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-008");
        setRoutePath("/Precot/Spunlace/F-08/Summary");
        break;
      case "PH-PRD02/F-009":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-009");
        setRoutePath("/Precot/Spunlace/F-09/Summary");
        break;
      case "PH-PRD02/F-010":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-010");
        setRoutePath("/Precot/Spunlace/F-10/Summary");
        break;
      case "PH-PRD02/F-011":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-011");
        setRoutePath("/Precot/Spunlace/F-11/Summary");
        break;
      case "PH-PRD02/F-012":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-012");
        setRoutePath("/Precot/Spunlace/F-12/Summary");
        break;
      case "PH-PRD02/F-013":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-013");
        setRoutePath("/Precot/Spunlace/F-13/Summary");
        break;
      case "PH-PRD02/F-014":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-014");
        setRoutePath("/Precot/Spunlace/F-14/Summary");
        break;
      case "PH-PRD02/F-015":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-015");
        setRoutePath("/Precot/Spunlace/F-15/Summary");
        break;
      case "PH-PRD02/F-016":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-016");
        setRoutePath("/Precot/Spunlace/F-16/Summary");
        break;
      case "PH-PRD02/F-017":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-017");
        setRoutePath("/Precot/Spunlace/F-17/Summary");
        break;
      case "PH-PRD02/F-018":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-018");
        setRoutePath("/Precot/Spunlace/F-18/Summary");
        break;
      case "PH-PRD02/F-019":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-019");
        setRoutePath("/Precot/Spunlace/F-19/Summary");
        break;
      case "PH-PRD02/F-020":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-020");
        setRoutePath("/Precot/Spunlace/F-20/Summary");
        break;
      case "PRD02/F-26":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PRD02/F-26");
        setRoutePath("/Precot/Spunlace/F-26");
        break;
      case "PRD02/F-27":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PRD02/F-27");
        setRoutePath("/Precot/Spunlace/F-21/BMR-RP");
        break;

      case "PH-PRD02/F-023":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-023");
        setRoutePath("/Precot/Spunlace/F-23/Summary");
        break;
      case "PH-PRD02/F-024":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-024");
        setRoutePath("/Precot/Spunlace/F-24/Summary");
        break;
      case "PH-PRD02/F-025":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD02/F-025");
        setRoutePath("/Precot/Spunlace/F-25/Summary");
        break;
      // Pad Punching Forms

      case "PH-PRD03/F-001":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-001");
        setRoutePath("/Precot/PadPunching/F-01/Summary");
        break;

      case "PH-PRD03/F-002":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-002");
        setRoutePath("/Precot/PadPunching/F-02/Summary");
        break;

      case "PH-PRD03/F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-003");
        setRoutePath("/Precot/PadPunching/F-03/Summary");
        break;
      case "PH-PRD03/F-004":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-004");
        setRoutePath("/Precot/PadPunching/F-04/Summary");
        break;
      case "PH-PRD05/F-002":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD05/F-002");
        setRoutePath("/Precot/PadPunching/F-14/Summary");
        break;

      case "PH-PRD05/F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD05/F-003");
        setRoutePath("/Precot/PadPunching/F-00/Summary");
        break;

      case "PH-PRD03/F-005":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-005");
        setRoutePath("/Precot/PadPunching/F-05/Summary");
        break;

      case "PH-PRD03/F-008":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-008");
        setRoutePath("/Precot/PadPunching/F-08/Summary");
        break;

      case "PH-HRD03/F-006":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-HRD03/F-006");
        setRoutePath("/Precot/PadPunching/F-06/Summary");
        break;

      case "PH-PRD05/F-001":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD05/F-001");
        setRoutePath("/Precot/PadPunching/F-05_f001/Summary");
        break;

      case "PH-PRD03/F-007":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-007");
        setRoutePath("/Precot/PadPunching/F-17/Summary");
        break;

      case "PH-HRD01/F-006":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-HRD01/F-006");
        setRoutePath("/Precot/PadPunching/houseKeepingSummaryF006");
        break;

      case "PH-PRD03/F-009":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD03/F-009");
        setRoutePath("/Precot/PadPunching/F-009");
        break;

      case "PH-HRD01/F-010":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-HRD01/F-010");
        setRoutePath("/Precot/PadPunching/houseKeepingSummaryF010");
        break;

      // Dry Goods.....
      case "PH-PRD04/F-001":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-001");
        setRoutePath("/Precot/DryGoods/F-01/Summary");
        break;

      case "PH-PRD04/F-002":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-002");
        setRoutePath("/Precot/DryGoods/F-002/Summary");
        break;

      case "PH-PRD04/F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-003");
        setRoutePath("/Precot/DryGoods/F-03/Summary");
        break;

      case "PH-PRD04/F-004":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-004");
        setRoutePath("/Precot/DryGoods/F-08/BMRSummary/CottonBall");
        break;

      case "PH-PRD04/F-005":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-005");
        setRoutePath("/Precot/DryGoods/F-05/Summary");
        break;

      case "PH-PRD04/F-006":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-006");
        setRoutePath("/Precot/DryGoods/F-06/Summary");
        break;

      case "PH-PRD04/F-007":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-007");
        setRoutePath("/Precot/DryGoods/F-07/BMRSummary/Pleat");
        break;

      case "PH-PRD04/F-008":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-008");
        setRoutePath("/Precot/DryGoods/F-08/BMRSummary/WoolRoll");
        break;

      case "PH-PRD04/F-009":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-009");
        setRoutePath("/Precot/DryGoods/F-09/Summary");
        break;

      case "PH-PRD04/F-010":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-010");
        setRoutePath("/Precot/DryGoods/F-10/Summary");
        break;

      case "PH-PRD04/F-011":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-011");
        setRoutePath("/Precot/DryGoods/F-011/Summary");
        break;

      case "PH-PRD04/F-012":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-012");
        setRoutePath("/Precot/DryGoods/F-012/Summary");
        break;

      case "PH-PRD04/F-013":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PRD04/F-013");
        setRoutePath("/Precot/DryGoods/F-013/Summary");
        break;

      case "PH-HRD01/F-004":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-HRD01/F-004");
        setRoutePath("/Precot/DryGoods/F-14/summary");
        break;

      case "PH-STR01F-001":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-STR01F-001");
        setRoutePath("/Precot/Stores/F-001/Summary");
        break;

      case "PH-STR01F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-STR01F-003");
        setRoutePath("/Precot/Stores/F-003/Summary");
        break;

      case "PH-STR01F-006":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-STR01F-006");
        setRoutePath("/Precot/Stores/F-006/Summary");
        break;
      case "PH-STR01F-008":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-STR01F-008");
        setRoutePath("/Precot/Stores/F-008/Summary");
        break;
      case "PH-STR01F-009":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-STR01F-009");
        setRoutePath("/Precot/Stores/F-009/Summary");
        break;

      // Quality control

      case "PH-QCL01-AR-F-001":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-001");
        // setRoutePath("/Precot/QualityControl/F-001/Summary");
        setRoutePath("/Precot/PH-QCL01-AR-F-001/Summary/");
        break;
      case "PH-QCL01-AR-F-002":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-002");
        setRoutePath("/Precot/QualityControl/AR-F-002/Summary");
        break;

      case "PH-QCL01-AR-F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-003");
        setRoutePath("/Precot/QualityControl/F-03/Summary");
        break;

      case "PH-QCL01-AR-F-004":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-004");
        setRoutePath("/Precot/QualityControl/AR-F-004/Summary");
        break;

      case "PH-QCL01-AR-F-005":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-005");
        setRoutePath("/Precot/QualityControl/AR_F-005/Summary");
        break;

      case "PH-QCL01-AR-F-006":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-006");
        // setRoutePath("/Precot/QualityControl/F-001/Summary");
        setRoutePath("/Precot/QualityControl/ARF-006/Summary");
        break;

      case "PH-QCL01-AR-F-007":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-007");
        setRoutePath("/Precot/QualityControl/AR-F-007/Summary");
        break;

      case "PH-QCL01-AR-F-008":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-008");
        setRoutePath("/Precot/QualityControl/Microbiology/Summary");
        break;

      case "PH-QCL01-AR-F-009":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-009");
        setRoutePath("/Precot/QualityControl/Microbiology/Summary");
        break;

      case "PH-QCL01-AR-F-010":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-010");
        setRoutePath("/Precot/QualityControl/Microbiology/Summary");
        break;

      case "PH-QCL01-AR-F-011":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-011");
        setRoutePath("/Precot/QualityControl/ARF011/Summary");
        break;

      case "PH-QCL01-AR-F-012":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-012");
        setRoutePath("/Precot/QualityControl/AR_F-012/Summary");
        break;

      case "PH-QCL01-AR-F-013":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-013");
        setRoutePath("/Precot/QualityControl/F-13/Summary");
        break;

      case "PH-QCL01-AR-F-014":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-AR-F-014");
        setRoutePath("/Precot/QualityControl/AR_F-014/Summary");
        break;

      case "PH-QCL01F-001":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-001");
        setRoutePath("/Precot/QualityControl/InwardBook/Summary");
        break;
      case "PH-QCL01F-002":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-002");
        setRoutePath("/Precot/QualityControl/InwardBook/Summary");
        break;
      case "PH-QCL01F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-003");
        setRoutePath("/Precot/QualityControl/InwardBook/Summary");
        break;

      case "PH-QCL01F-004":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-004");
        setRoutePath("/Precot/QualityControl/F-004/Summary");
        break;

      case "PH-QCL01F-005":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-005");
        setRoutePath("/Precot/QualityControl/F-005/Summary");
        break;
      case "PH-QCL01/F-004":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QC/F-04/Summary");
        break;
      case "PH-QCL01/F-005":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QC/F-05/Summary");
        break;
      case "PH-QCL01/F-006":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-006");
        setRoutePath("/Precot/QualityControl/F-006/Summary");
        break;
      case "PH-QCL01/F-007":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QCL01/F-007");
        setRoutePath("/Precot/QC/F-07/Summary");
        break;

      case "PH-QCL01F-007":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-007");
        setRoutePath("/Precot/QualityControl/F-007/Summary");
        break;

      case "PH-QCL01F-008":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-008");
        setRoutePath("/Precot/QualityControl/F-008/Summary");
        break;
      case "PH-QCL01F-009":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-009");
        setRoutePath("/Precot/QualityControl/F-009/Summary");
        break;

      case "PH-QCL01F-010":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-010");
        setRoutePath("/Precot/QualityControl/F-010/Summary");
        break;

      case "PH-QCL01F-011":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-011");
        setRoutePath("/Precot/QualityControl/F-011/Summary");
        break;

      case "PH-QCL01F-012":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-012");
        setRoutePath("/Precot/QualityControl/F-012/Summary");
        break;

      case "PH-QCL01F-013":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-013");
        setRoutePath("/Precot/QualityControl/F-013/Summary");
        break;

      case "PH-QCL01F-014":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-014");
        setRoutePath("/Precot/QualityControl/F-014/Summary");
        break;
      case "PH-QCL01/F-015":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-015");
        setRoutePath("/Precot/QualityControl/F-015/Summary");
        break;

      case "PH-QCL01/F-016":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-016");
        setRoutePath("/Precot/QualityControl/F-016/Summary");
        break;

      case "PH-QCL01F-017":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-017");
        setRoutePath("/Precot/QualityControl/F-017/Summary");
        break;
      case "PH-QCL01F-018":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-018");
        setRoutePath("/Precot/QualityControl/F-018/Summary");
        break;
      case "PH-QCL01F-019":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-019");
        setRoutePath("/Precot/QualityControl/F-019/Summary");
        break;
      case "PH-QCL01/F-020":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-020");
        setRoutePath("/Precot/QualityControl/F-020/Summary");
        break;

      // case "PH-QCL01F-020":
      //   setenableBmr(false);
      //   setbtnenable(false);
      //   setFormNo("PH-QCL01F-020");
      //   setRoutePath("/Precot/QualityControl/F-020/Summary");
      //   break;

      case "PH-QCL01F-021":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-021");
        setRoutePath("/Precot/QualityControl/F-021/Summary");
        break;

      case "PH-QCL01F-022":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-022");
        setRoutePath("/Precot/QualityControl/F-022/Summary");
        break;

      case "PH-QCL01/F-023":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-023");
        setRoutePath("/Precot/QualityControl/F-023/Summary");
        break;

      case "PH-QCL01F-024":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-024");
        setRoutePath("/Precot/QualityControl/F-024/Summary");
        break;

      case "PH-QCL01F-025":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-025");
        setRoutePath("/Precot/QualityControl/F-025/Summary");
        break;

      case "PH-QCL01-F-26":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-F-26");
        setRoutePath("/Precot/QualityControl/F-026/Summary");
        break;

      case "PH-QCL01-F-26A":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01-F-26A");
        setRoutePath("/Precot/QualityControl/F-026A/Summary");
        break;

      case "PH-QCL01/F-026B":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-026B");
        setRoutePath("/Precot/QualityControl/F-026B/Summary");
        break;

      case "PH-QCL01/F-026C":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-026C");
        setRoutePath("/Precot/QualityControl/F-026C/Summary");
        break;

      case "PH-QCL01/F-026D":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-026D");
        setRoutePath("/Precot/QualityControl/F-026D/Summary");
        break;

      case "PH-QCL01/F-026E":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-026E");
        setRoutePath("/Precot/QualityControl/F-026E/Summary");
        break;

      case "PH-QCL01/F-026F":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-026F");
        setRoutePath("/Precot/QualityControl/F-026F/Summary");
        break;
      case "PH-QCL01/F-026G":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-026G");
        setRoutePath("/Precot/QualityControl/F-026G/Summary");
        break;

      case "PH-QCL01/F-027":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-027");
        setRoutePath("/precot/QualityControl/PH-QCF-027/Summary");
        break;

      case "PH-QCL01F-028":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-028");
        setRoutePath("/Precot/QualityControl/F-028/Summary");
        break;

      case "PH-QCL01F-029":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01F-029");
        setRoutePath("/Precot/QualityControl/F-029/Summary");
        break;
      case "PH-QCL01/F-030":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QCL01/F-002-F-003-F-004");
        setRoutePath("/Precot/QualityControl/PH-QCF-030/Summary");
        break;

      // Quality Assurance

      case "PH-HRD01-F-015":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-HRD01-F-015");
        setRoutePath("/Precot/QA/PestControl/Summary");
        break;
      case "PH-HRD01-F-016":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-HRD01-F-016");
        setRoutePath("/Precot/QA/PestControl/Summary");
        break;
      case "PH-HRD01-F-017":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-HRD01-F-017");
        setRoutePath("/Precot/QA/PestControl/Summary");
        break;
      case "PH-HRD01-F-018":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-HRD01-F-018");
        setRoutePath("/Precot/QA/PestControl/Summary");
        break;
      case "PH-HRD01-F-019":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-HRD01-F-019");
        setRoutePath("/Precot/QA/PestControl/Summary");
        break;
      case "PH-HRD01-F-014":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-HRD01-F-014");
        setRoutePath("/Precot/QA/PestControl/Summary");
        break;

      case "PH-QAD01F-001":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01F-001");
        setRoutePath("/Precot/QA/F-01/Summary");
        break;
      case "PH-QAD01-F-010":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-010");
        setRoutePath(
          "/Precot/QualityAssurance/F-010/internal_audit_schedule_summary"
        );
        break;

      case "PH-QAD01-F-008":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-008");
        setRoutePath("/Precot/QA/QA_F008_Summary");
        break;

      case "PH-QAD01-F-009":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-009");
        setRoutePath("/Precot/QA/F-09/Summary");
        break;

      case "PH-QAD01-F-015":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-015");
        setRoutePath("/Precot/QA/F-15/Summary");
        break;

      case "PH-QAD01-F-016":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/F-16/Summary");
        break;
      case "PH-QAD01-F-052":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/F-52/Summary");
        break;
      case "PH-QAD01-F-041":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-041");
        setRoutePath("/Precot/QualityAssurance/QA_F_041_Summary");
        break;
      case "PH-QAD01-F-042":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/QA_F042_Summary");
        break;
      case "PH-QAD01-F-044":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/F-044/corrective_summary");
        break;
      case "PH-QAD01-F-058":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/F-58/Summary");
        break;
      case "PH-QAD01-F-059":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01/F-059");
        setRoutePath("/Precot/QA/F-59/Summary");
        break;
      case "PH-QAD01-F-25":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-25");
        setRoutePath("/Precot/QA/F-25/Summary");
        break;
      case "PH-QAD01-F-026":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/F-26/Summary");
        break;

      case "PH-QAD01-F-060":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-060");
        setRoutePath("/Precot/QA/F-060/Summary");
        break;

      case "PH-QAD01-f-60":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-060");
        setRoutePath("/Precot/QA/f-60/Summary");
        break;

      case "PH-QAD01/F-002":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01/F-002");
        setRoutePath("/Precot/QA/F-002/Summary");
        break;

      case "PH-QAD01-F-005":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-005");
        setRoutePath("/Precot/QualityAssurance/QA_F005_Summary");
        break;

      case "PH-QAD01-F-017":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-017");
        setRoutePath("/Precot/QA/QA_F017_Summary");
        break;

      case "PH-QAD01-F-018":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-018");
        setRoutePath("/Precot/QA/F-18/Summary");
        break;

      case "PH-QAD01-F-019":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-019");
        setRoutePath("/Precot/QA/cusRegisterSummary");
        break;

      case "PH-QAD01-F-020":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-020");
        setRoutePath("/Precot/QA/QA_F020_Summary");
        break;

      case "PH-QAD01-F-022":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-022");
        setRoutePath("/Precot/QA/F-22/Summary");
        break;

      case "PH-QAD01-F-012":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-012");
        setRoutePath(
          "/Precot/QualityAssurance/F-012/internal_audit_report_summary"
        );
        break;

      case "PH-QAD01-F-007":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-007");
        setRoutePath("/Precot/QA/F007/Summary");
        break;

      case "PH-QAD01-F-013":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-013");
        setRoutePath("/Precot/QA/QA_F013_Summary");
        break;

      case "PH-QAD01-F-014":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-014");
        setRoutePath("/Precot/QA/F-14/Summary");
        break;

      case "PH-QAD01-F-029":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-029");
        setRoutePath("/Precot/QA/Inward029/Summary");
        break;
      case "PH-QAD01-F-027":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-027");
        setRoutePath("/Precot/QualityAssurance/F-027/Summary");
        break;

      case "PH-QAD01-F-028":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-028");
        setRoutePath("/Precot/QA/F-028_summary");
        break;

      case "PH-QCL01-F-029":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QCL01-F-029");
        setRoutePath(
          "/Precot/QualityAssurance/F-029/QA_f029_new_sample_request_summary"
        );
        break;

      case "PH-QAD01-F-030":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-030");
        setRoutePath("/Precot/QA/Inward030/Summary");
        break;
      case "PH-QAD01-F-031":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-031");
        setRoutePath("/Precot/QA/Inward031/Summary");
        break;
      case "PH-QAD01-F-032":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-032");
        setRoutePath("/Precot/QA/Inward032/Summary");
        break;
      case "PH-QAD01-F-033":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-033");
        setRoutePath("/Precot/QA/Inward033/Summary");
        break;
      case "PH-QAD01-F-034":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-034");
        setRoutePath(
          "/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
        );
        break;
      case "PH-QAD01-F-035":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-035");
        setRoutePath(
          "/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
        );
        break;
      case "PH-QAD01-F-036":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-036");
        setRoutePath(
          "/Precot/QualityAssurance/F-036/inprocess_inspection_report_summary"
        );
        break;
      case "PH-QAD01-F-043":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-043");
        setRoutePath("/Precot/QualityAssurance/F-043/Summary");
        break;
      case "PH-QAD01-F-050":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-050");
        setRoutePath("/Precot/QA/F-50/Summary");
        break;
      case "PH-QAD01-F-076":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-076");
        setRoutePath(
          "/Precot/QualityAssurance/F-076/QA_f076_training_session_allotment_register_summary"
        );
        break;
      case "PH-QAD01-F-039":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-039");
        setRoutePath("/Precot/QA/F-39/Summary");
        break;
      case "PH-QAD01/F-062":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/F-62");
        break;
      case "PH-QAD01-F-040":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-040");
        setRoutePath("/Precot/QualityAssurance/F-040/Summary");
        break;

      case "PH-QAD01-F-045":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-045");
        setRoutePath("/Precot/QualityAssurance/F-045/Summary");
        break;

      case "PH-QAD01-F-046":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-046");
        setRoutePath("/Precot/QualityAssurance/QA_F_046_Summary");
        break;

      case "PH-QAD01-F-047":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-047");
        setRoutePath("/Precot/QA/QA_F047_Summary");
        break;

      case "PH-QAD01/F-048":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01/F-048");
        setRoutePath("/Precot/QA/F-048/Summary");
        break;

      case "PH-QAD01-F-049":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-049");
        setRoutePath("/Precot/QA/F-49/Summary");
        break;
      case "PH-QAD01-F-051":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-QAD01-F-051");
        setRoutePath("/Precot/QualityAssurance/F-051/Summary");
        break;

      case "PH-QAD01-F023":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F023");
        setRoutePath("/Precot/QA/F-23/Summary");
        break;
      case "PH-QAD01/F-003":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01/F-003");
        setRoutePath("/Precot/QA/F-03/Summary");
        break;
      case "PH-QAD01-F-006":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/QA/F-06/Summary");
        break;
      case "PH-QAD01-F-037":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-037");
        setRoutePath("/Precot/QualityAssurance/QA_F037_Summary");
        break;
      case "PH-QAD01-F-021":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-QAD01-F-021");
        setRoutePath("/Precot/QA/F-21/Summary");
        break;
      case "PH-HRD01-F-013":
        setenableBmr(true);
        setbtnenable(true);
        setFormNo("PH-HRD01-F-013");
        setRoutePath("/Precot/QA/rodentBoxSummary");
        break;

      // ppcform

      case "PH-PPC01/F-002":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PPC01/F-002");
        setRoutePath("/Precot/PPC/F-002/Summary");
        break;

      case "PH-PPC01/F-003":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PPC01/F-003");
        setRoutePath("/Precot/PPC/F-003/Summary");
        break;

      case "PH-PPC01/F-004":
        setenableBmr(false);
        setbtnenable(false);
        setFormNo("PH-PPC01/F-004");
        setRoutePath("/Precot/PPC/F-004/Summary");
        break;

      case "PH-DIS01/F-001":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Dispatch/F-001/Summary");
        break;

      // development
      case "PH-DVP01/F-001":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Development/F-001/Summary");
        break;

      // Engineering
      case "PH-ENG01/FC-003":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Engineering/FC-003/Summary");
        break;
      case "PH-ENG01/FC-004":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Engineering/FC-004/Summary");
        break;
      case "PH-ENG01/FC-016":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Engineering/FC-016/Summary");
        break;
      case "PH-ENG01/FC-020":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/Engineering/FC-020/Summary");
        break;

      // buds

      case "PH-PRD06/F-001":
        setenableBmr(false);
        setbtnenable(false);
        setRoutePath("/Precot/CottonBuds/F-001/Summary");
        break;
      case "PH-PRD04/f-004":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/COTTON_BUDS/F-04/Summary");
        break;

      case "PH-PRD06/F-002":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/COTTON_BUDS/F-02/Summary");
        break;

      case "PH-PRD06/F-004":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/CottonBuds/BMR");
        break;

      case "PH-PRD06/F-003":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/COTTON_BUDS/F-002/Summary");
        break;

      case "PH-QAD01-F-038":
        setenableBmr(true);
        setbtnenable(true);
        setRoutePath("/Precot/Buds/Buds_F038_Summary");
        break;

      ///Precot/Bleaching/BMR/Summary
      default:
        setenableBmr(false);
        setbtnenable(false);
        break;
    }
    // console.log("BMR array", bmrArray);
  };

  const bmrHandleChange = (values) => {
    setbtnenable(false);
    // console.log("Values of BMR Select", values);
    localStorage.setItem("formatNo", values);
  };

  const goTo = () => {
    // List of forms that Operator is not allowed to access
    const restrictedFormsForOperator = [
      "PH-PRD02/F-008",
      "PH-PRD02/F-009",
      "PH-PRD02/F-010",
      "PH-PRD02/F-011",
      "PH-PRD02/F-012",
      "PH-PRD02/F-015",
      "PH-PRD02/F-018",
      "PH-PRD02/F-019",
      "PH-PRD02/F-020",
      "PH-PRD02/F-023",
      "PH-PRD02/F-024",
      "PH-PRD02/F-025",
      "PRD02/F-26",
      "PRD02/F-27",
      "RE-PROCESSING REPORT",

      // PadPunching.....
      "PH-PRD03/F-001",
      "PH-PRD03/F-003",
      "PH-PRD03/F-004",
      "PH-PRD03/F-005",
      "PH-HRD03/F-006",
      "PH-PRD03/F-007",
      "PH-PRD03/F-008",
      "PH-PRD03/F-009",

      // Dry Goods.....
      "PH-HRD01/F-004",
      "PH-PRD04/F-012",
      "PH-PRD04/F-011",
      "PH-PRD04/F-009",
      "PH-PRD04/F-010",
    ]; // replace with actual form numbers or names

    const restrictedFormsForSupervisor = [
      // PadPunching......
      "PH-PRD05/F-003",
      "PH-PRD05/F-001",
      "PH-PRD05/F-002",

      //DryGoods .......
      "PH-PRD04/F-001",
      "PH-PRD04/F-002",
      "PH-PRD04/F-005",
      // "PH-PRD04/F-010",
    ];

    // Check if the user is an Operator and trying to access a restricted form
    if (
      role === "ROLE_OPERATOR" &&
      restrictedFormsForOperator.includes(formNo)
    ) {
      message.warning("You are not authorized to access this form.");
      return; // Stop further execution if validation fails
    }
    if (
      role === "ROLE_SUPERVISOR" &&
      restrictedFormsForSupervisor.includes(formNo)
    ) {
      message.warning("You are not authorized to access this form.");
      return; // Stop further execution if validation fails
    } else {
      navigate(routePath, {
        state: {
          formNo: formNo,
        },
      });
    }
  };

  return (
    <div className="hell-2">
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
        {departmentId == 1 ? (
          <>
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
                            Audit
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Report/Generation"),
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
                            Mapping
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Bleaching_Mapping"),
                      },
                      {
                        key: "5",
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
                        key: "6",
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
                        key: "7",
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
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
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
                      // {
                      //   key: "2",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //      Dash Board
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Dashboard"),
                      // },

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
                      },
                      {
                        key: "5",
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
                        key: "6",
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
          </>
        ) : departmentId == 2 ? (
          <>
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
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
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
                            Packing Material
                          </b>
                        ),
                        onClick: () =>
                          navigate("/Precot/Spunlace/PackingMaterial"),
                      },
                      {
                        key: "3",
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
                            Packing Material
                          </b>
                        ),
                        onClick: () =>
                          navigate("/Precot/Spunlace/PackingMaterial"),
                      },
                      {
                        key: "3",
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
          </>
        ) : departmentId == 3 ? (
          <>
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
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
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
          </>
        ) : departmentId == 4 ? (
          <>
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
                            Audit
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Report/Generation"),
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
                            Mapping
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Mapping"),
                      },
                      {
                        key: "5",
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
                        key: "6",
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
                        key: "7",
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
                  : role === "ROLE_OPERATOR"
                  ? [
                      {
                        key: "4",
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
                        onClick: () => navigate("/Precot/Mapping"),
                      },
                      {
                        key: "7",
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
                  : role === "ROLE_SUPERVISOR" ||
                    role === "ROLE_HOD" ||
                    role === "ROLE_DESIGNEE" ||
                    role === "ROLE_HR"
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
          </>
        ) : departmentId == 5 || departmentId == 12 ? (
          <>
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
                role == "QA_MANAGER" ||
                role == "QC_MANAGER" ||
                role == "ROLE_QA"
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
                      // {
                      //   key: "2",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //       Generation
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Generate"),
                      // },
                      {
                        key: "3",
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

                      // {
                      //   key: "4",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //       Mapping
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Mapping"),
                      // },
                      // {
                      //   key: "5",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //       Closing
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Closing"),
                      // },
                      {
                        key: "6",
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
                        key: "7",
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
                  : role !== "QA_MANAGER" && role !== "QC_MANAGER"
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
          </>
        ) : department == 6 ? (
          <>
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
                role == "QA_MANAGER"
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
                      // {
                      //   key: "2",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //       Generation
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Generate"),
                      // },
                      {
                        key: "3",
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

                      // {
                      //   key: "4",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //       Mapping
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Mapping"),
                      // },
                      // {
                      //   key: "5",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //       Closing
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Closing"),
                      // },
                      // {
                      //   key: "6",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //       Traceability
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Traceability"),
                      // },
                      {
                        key: "7",
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
                  : role !== "QA_MANAGER"
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
          </>
        ) : (
          <>
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
                role === "ROLE_HOD"
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
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (
                                window.confirm("Are you sure want to logout")
                              ) {
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
                  : null
              }
            />
          </>
        )}
      </Drawer>
      <BleachingHeader
        formName={<h3>Form Browser</h3>}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <Form
          name="forms"
          style={{
            width: "45%",
          }}
          layout="vertical"
        >
          <Form.Item label="Select Forms">
            <Select options={forms} showSearch onChange={handleChange} />
          </Form.Item>

          {/* {enableBmr == true ? (
            <Form.Item label="Select BMR">
              <Select options={bmrArray} onChange={bmrHandleChange} />
            </Form.Item>
          ) : null} */}

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="primary" onClick={goTo}>
              Go To Forms
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChoosenScreen;
