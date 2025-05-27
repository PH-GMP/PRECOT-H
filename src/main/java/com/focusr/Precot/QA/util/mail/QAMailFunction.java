package com.focusr.Precot.QA.util.mail;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.crypto.NoSuchPaddingException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.AnnualProductReview;
import com.focusr.Precot.QA.model.BmrIssueRegisterF045;
import com.focusr.Precot.QA.model.ControlOfGHpWc;
import com.focusr.Precot.QA.model.CorrectiveActionReport;
import com.focusr.Precot.QA.model.FinalInspectionReportF037;
import com.focusr.Precot.QA.model.InternalAuditNCReport;
import com.focusr.Precot.QA.model.InternalAuditReport;
import com.focusr.Precot.QA.model.InwardInspectionReport;
import com.focusr.Precot.QA.model.ListOfGHpWc;
import com.focusr.Precot.QA.model.ListOfSharpTools;
import com.focusr.Precot.QA.model.ManagementOfIncidence;
import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecord;
import com.focusr.Precot.QA.model.MetalDetectorPassReport;
import com.focusr.Precot.QA.model.MomMockRecall;
import com.focusr.Precot.QA.model.ProductDispositionLogBookF049;
import com.focusr.Precot.QA.model.QASummaryOfTraceability;
import com.focusr.Precot.QA.model.QaBreakageReport;
import com.focusr.Precot.QA.model.QaChangeControlLogBookF042;
import com.focusr.Precot.QA.model.QaContainerInspectionReport;
import com.focusr.Precot.QA.model.QaCustomerComplaintRegisterForm;
import com.focusr.Precot.QA.model.QaMasterListOfSharpToolsF060;
import com.focusr.Precot.QA.model.QaNonConformityReport;
import com.focusr.Precot.QA.model.QaOnlineInspectionReport;
import com.focusr.Precot.QA.model.QaPestController;
import com.focusr.Precot.QA.model.QaQualityReviewMeetings;
import com.focusr.Precot.QA.model.QaRodentBoxCheckList;
import com.focusr.Precot.QA.model.QaTrainingNeedIdentificationForm;
import com.focusr.Precot.QA.model.RequestAndIssunceOfDocumentF002;
import com.focusr.Precot.QA.model.SupplierAuditPlan;
import com.focusr.Precot.QA.model.SupplierAuditReport;
import com.focusr.Precot.QA.model.TemplateForRecall;
import com.focusr.Precot.QA.model.batchReleaseChecklist;
import com.focusr.Precot.QA.model.productionretainedsampleregister40;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.service.bleaching.FormatService;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SendMail;

@Service
public class QAMailFunction {
	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private FormatService formatService;

	@Autowired
	QAEmailHtmlLoader emailHtmlLoader;

	private static final Logger log = LoggerFactory.getLogger(QAMailFunction.class);

	// INWARD INSPECTION REPORT
	public void sendMailToQaManagerInward(InwardInspectionReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.inwardInspection(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// MANAGEMENT O0F INCIDENCE
	// QA Manager
	public void sendMailToQaManagerIncidence(ManagementOfIncidence details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.managementOfIncidenceQaManager(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// plant head
	public void sendMailToPlantHeadIncidence(ManagementOfIncidence details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_PLANT_HEAD";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.managementOfIncidencePlantHead(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//LIST OF SHARP TOOLS
	// QA manager
	public void sendMailToQaManagerListOfSharptools(ListOfSharpTools details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.listOfSharpTools(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// PEST CONTROLLER
	// QA manager
	public void sendMailToQaManagerPestController(QaPestController details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.pestController(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// RODENT BOX CHECKLIST
	// QA manager
	public void sendMailToQaManagerRodentBox(QaRodentBoxCheckList details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.rodentBoxCheckList(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// CUSTOMER COMPLAINT REGISTER FORM
	// QA manager
	public void sendMailToQaManagerCustomerComplaint(QaCustomerComplaintRegisterForm details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.customerComplaintRegisterQAMR(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	// HOD 
		public void sendMailToHodCustomerComplaint(QaCustomerComplaintRegisterForm details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "ROLE_HOD";
				String departmentName = details.getDepartment() ;
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = getSubjectForFormat(details.getFormat_no());
				String text = emailHtmlLoader.customerComplaintRegisterHod(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}

	// QA ONLINE INSPECTION
	// Prod Supervisor
	public void sendMailToProdSupervisor(QaOnlineInspectionReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "";
			String department = details.getDepartment();
			if (department.equalsIgnoreCase("pad punching")) {
				departmentName = "PAD_PUNCHING";
			} else {
				departmentName = "DRY_GOODS";
			}
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.onlineInspectionReportSupervisor(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// QA manager
	public void sendMailToQaManagerOnlineInspection(QaOnlineInspectionReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.onlineInspectionReportQaMr(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// REQUEST AND ISSUNCE OF DOCUMENT F002
	// MR
	public void sendMailToMRRequestAndIssuanceOfDocument(RequestAndIssunceOfDocumentF002 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_MR";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.requestAndIssunceOfDocument(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// FINAL INSPECTION REPORTF037
	// QaManager
	public void sendMailToQaManagerFinalInspectionReportF037(FinalInspectionReportF037 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.finalInspectionReport(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// QACONTAINER INSPECTION REPORT
	// security
	public void sendMailToSecurityContainerInspection(QaContainerInspectionReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "SECURITY";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.containerInspectionReportSecurity(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// Dispatch Supervisor
	public void sendMailToDispatchSupervisor(QaContainerInspectionReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "DISPATCH_SUPERVISOR";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.containerInspectionReportDispatchSupervisor(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// QA Manager
	public void sendMailToContainerInspectionQAmanager(QaContainerInspectionReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.containerInspectionReportQaManager(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// NON CONFIRMATORY REPORT
	// Prod Supervisor
	public void sendMailToProdSupervisorTabA(QaNonConformityReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_SUPERVISOR";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.NCReportTabA(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// QA Inspector
	public void sendMailToQaInspectorNcTabBCD(QaNonConformityReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_QA";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.NCReportTabBCD(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// prod Supervisor 2nd level
	public void sendMailToProdSupervisor2ndLevel(QaNonConformityReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_SUPERVISOR";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.NCReportProdSupervisor(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// prod head
	public void sendMailToProdHead(QaNonConformityReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_HOD";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.NCReportProdHead(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// Qa Manager
	public void sendMailToQaManager(QaNonConformityReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormat_no());
			String text = emailHtmlLoader.NCReportQAManager(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// INTERNAL AUDIT REPORT
	//Auditor
	public void sendMailToAuditorInternalAudit(InternalAuditReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_HOD";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.internalAuditReportAuditor(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// Qa Manager
	public void sendMailToQaManagerInternalAudit(InternalAuditReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.internalAuditReportQaMr(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// SUPPLIER AUDIT PLAN
	// MR
	public void sendMailToMRSupplierAuditPlan(SupplierAuditPlan details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_MR";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.supplierAuditPlan(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	
	
	// Supplier Audit Report
			public String supplierAuditReportPdfContent(SupplierAuditReport report,byte[] signature)throws IOException {
				byte[] imageBytes = Files.readAllBytes(Paths.get("src/main/resources/static/images/logo.png"));
				String base64ImageLogo = Base64.getEncoder().encodeToString(imageBytes);
				String base64Image = Base64.getEncoder().encodeToString(signature);
				String body = "<html>\n" +
					    "<body>\n" +
					    "<div id=\"section-to-print\">\n" +
					    "<table border=\"1\" style=\"margin-top:10px;border-collapse: collapse; scale:94%;\">\n" +
					    "<br/>\n" +
					    "<thead>\n" +
					    "<tr style=\"border: none;\">\n" +
					    "<td style=\"border: none;\" colSpan=\"115\"></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"15\" rowspan=\"4\" style=\"text-align:center;\">\n" +
					    "<img src=\"data:image/jpeg;base64," + base64ImageLogo + "\" style=\"width: 100px; height: auto;text-align:center;display: inline-block;\" /> "+
					    "<br>\n" +
					    "Unit H\n" +
					    "</td>\n" +
					    "<th colSpan=\"70\" rowSpan=\"4\" style=\"text-align: center;\">Supplier Audit Report</th>\n" +
					    "<td colSpan=\"15\">Format No.:</td>\n" +
					    "<td colSpan=\"15\">"+report.getFormatNo()+"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"15\">Revision No.:</td>\n" +
					    "<td colSpan=\"15\">"+report.getRevisionNo()+"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"15\">Ref. SOP No.:</td>\n" +
					    "<td colSpan=\"15\">"+report.getSopNumber()+"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"15\">Page No.:</td>\n" +
					    "<td colSpan=\"15\">1</td>\n" +
					    "</tr>\n" +
					    "<tr style=\"border: none;\">\n" +
					    "<td style=\"border: none;\" colSpan=\"115\"></td>\n" +
					    "</tr>\n" +
					    "</thead>\n" +
					    "<br/>\n" +
					    "<tbody>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"115\">Date:"+report.getReportDate() +"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"70\">Supplier Name:"+report.getSupplierName()+"</td>\n" +
					    "<td colSpan=\"45\" rowspan=\"3\">Address:"+report.getAddress()+"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"70\">Supplier’s Representative:"+report.getSupplierRepresentative()+"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"70\">Auditor(s):"+report.getAuditors()+"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"115\">Objectives:"+report.getObjectives()+" <br/></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"115\">Scope:"+report.getScope()+" <br/></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"115\">Methodology:"+report.getMethodology()+"<br/></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"115\">Areas Audited:"+report.getAreasAudited()+"<br/></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"115\">Attachments:"+report.getAttachments()+"<br/></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"115\">Observation:"+report.getObservation()+"</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"60\" style=\"text-align:center;\">Auditee</td>\n" +
					    "<td colSpan=\"55\" style=\"text-align:center;\">Auditor(s)</td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<td colSpan=\"60\" style=\"text-align:center;height:50px;\"></td>\n" +
					    "<td colSpan=\"55\" style=\"text-align:center;\">"+report.getAuditorSubmitBy()+"<br>"+report.getAuditorSubmitOn() +"<br>"+
					    "<img src=\"data:image/jpeg;base64," + base64Image + "\" style=\"width: 60px; height: 60px;display: inline-block;\" /></td>\n"+
					    "</tr>\n" +
					    "</tbody>\n" +
					    "<br/>\n" +
					    "<tfoot>\n" +
					    "<tr style=\"border: none;\">\n" +
					    "<td style=\"border: none;\" colSpan=\"115\"></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<th colSpan=\"25\">Particular</th>\n" +
					    "<th colSpan=\"30\" style=\"text-align: center;\">Prepared by</th>\n" +
					    "<th colSpan=\"30\" style=\"text-align: center;\">Reviewed by</th>\n" +
					    "<th colSpan=\"30\" style=\"text-align: center;\">Approved by</th>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<th colSpan=\"25\">Name</th>\n" +
					    "<td colSpan=\"30\"></td>\n" +
					    "<td colSpan=\"30\"></td>\n" +
					    "<td colSpan=\"30\"></td>\n" +
					    "</tr>\n" +
					    "<tr>\n" +
					    "<th colSpan=\"25\">Signature & Date</th>\n" +
					    "<td colSpan=\"30\"></td>\n" +
					    "<td colSpan=\"30\"></td>\n" +
					    "<td colSpan=\"30\"></td>\n" +
					    "</tr>\n" +
					    "</tfoot>\n" +
					    "</table>\n" +
					    "</div>\n" +
					    "</body>\n" +
					    "</html>";

				return body;
			}
//			public void sendMailToSupplierForSupplierAuditReport(SupplierAuditReport report) {
//				try {
//					EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
//					String mailTo = report.getSupplierEmailId();
//					String mailFrom = report.getAuditorEmailId();
//					String subject = getSubjectForFormat(report.getFormatNo());
//					String text = emailHtmlLoader.supplierAuditReport(report);
//					String pdfContent = emailHtmlLoader.supplierAuditReportPdfContent(report,formatService.getUserSignature(report.getAuditorSign()).getBody());
//					sendEmailToSupplier(mailTo,mailFrom, emailSubject, text, subject,pdfContent,report.getFileName());
//				} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
//						| InvalidKeySpecException e) {
//					log.error("Unable to get Email details", e);
//					throw new AppException("Unable to get Email details");
//				}
//				catch(IOException ioEx)
//				{
//					log.error("Unable to read logo", ioEx);
//					throw new AppException("Unable to read logo");
//		}
//	}
			
			public void sendMailToSupplierForSupplierAuditReport(SupplierAuditReport report) {
				try {
					EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
					String mailTo = report.getSupplierEmailId();
					String mailFrom = report.getAuditorEmailId();
					String subject = report.getFormatName();
					String text = emailHtmlLoader.supplierAuditReport(report);
					String pdfContent = emailHtmlLoader.supplierAuditReportPdfContent(report,formatService.getUserSignature(report.getAuditorSign()).getBody());
					DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
			        String formattedDate = report.getReportDate().format(formatter);
			        String fileName = report.getSupplierName()+"_"+formattedDate;
					sendEmailToSupplier(mailTo,mailFrom, emailSubject, text, subject,pdfContent,fileName);
				} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
						| InvalidKeySpecException e) {
					log.error("Unable to get Email details", e);
					throw new AppException("Unable to get Email details");
				}
				catch(IOException ioEx)
				{
					log.error("Unable to read logo", ioEx);
					throw new AppException("Unable to read logo");
		}
	}

	// INTERNAL AUDIT NC REPORT
	// Autittee
	public void sendMailToInternalAuditeeNcReport(InternalAuditNCReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_HOD";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.internalAuditNcAuditee(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
		// Autitor
		public void sendMailToInternalAuditorNcReport(InternalAuditNCReport details) {
		    try {
		        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
		        String roleName = "ROLE_HOD";

		        // Fetching all HOD emails for the given department
		        List<String> mailIds = userRepository.findEmailsByRole(roleName);

		        // Constructing subject and email body
		        String subject = getSubjectForFormat(details.getFormatNo());
		        String text = emailHtmlLoader.internalAuditNcAuditorAndQAManager(details);

		        // Sending email to all recipients
		        for (String mailId : mailIds) {
		            sendEmail(mailId, emailSubject, text, subject);
		        }
		    } catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException 
		            | NoSuchPaddingException | InvalidKeySpecException e) {
		        log.error("Unable to get Email details", e);
		        throw new AppException("Unable to get Email details");
		    }
		}
		// QaManager
		public void sendMailToInternalAuditeeNcReportQaManager(InternalAuditNCReport details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "QA_MANAGER";
				String departmentName = "QUALITY_ASSURANCE";

				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = getSubjectForFormat(details.getFormatNo());
				String text = emailHtmlLoader.internalAuditNcAuditorAndQAManager(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}

//QaService7		
		public void sendMailToQaManagerF042 (QaChangeControlLogBookF042 details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "QA_MANAGER";
				String departmentName = "QUALITY_ASSURANCE";
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = getSubjectForFormat(details.getFormatNo());
				String text = emailHtmlLoader.changeControllLogBookF042(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
	public void sendMailToMrManagerF042(QaChangeControlLogBookF042 details) {
		try {
			
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_MR";
			String departmentName = details.getIssuedToDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.changeControllLogBookF042(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendMailToQaManagerF060 (QaMasterListOfSharpToolsF060 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.changeControllLogBookF060(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendMailToMrManagerF060(QaMasterListOfSharpToolsF060 details) {
		try {

			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_MR";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.changeControllLogBookF060(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
//QaService3(kavya)
	//F025
	public void sendMailToQaManagerF025 (QASummaryOfTraceability details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.SummaryOfTraceablityF025(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	public void sendMailToMrManagerF025(QASummaryOfTraceability details) {
		try {

			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_MR";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.SummaryOfTraceablityF025(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	//F028
		public void sendMailToQaManagerF028 (AnnualProductReview details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "QA_MANAGER";
				String departmentName = "QUALITY_ASSURANCE";
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = QaAppConstants.annualProductReview;
				String text = emailHtmlLoader.annualProductReview(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
	
		public void sendMailToMrManagerF028(AnnualProductReview details) {
			try {

				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "ROLE_MR";
				String departmentName = "QUALITY_ASSURANCE";

				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = QaAppConstants.annualProductReview;
				String text = emailHtmlLoader.annualProductReview(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
//QaService1	
	public void sendMailToQaManagerF005 (QaTrainingNeedIdentificationForm details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.TrainingNeedIdentificationF005(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendMailToDesigneeF005(QaTrainingNeedIdentificationForm details) {
		try {

			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_DESIGNEE";
			String departmentName = details.getDepartment();

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.TrainingNeedIdentificationF005(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
//srimathi
//Qaservice 5
	
	public void sendMailToQaManagerF044 (CorrectiveActionReport details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "QA_MANAGER";
			String departmentName = "QUALITY_ASSURANCE";
			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.correctiveActionReportF044(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendMailToDesigneeF044 (CorrectiveActionReport details) {
		try {

			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_DESIGNEE";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.correctiveActionReportF044(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendMailToMrManagerF044(CorrectiveActionReport details) {
		try {

			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			String roleName = "ROLE_MR";
			String departmentName = "QUALITY_ASSURANCE";

			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
			String subject = getSubjectForFormat(details.getFormatNo());
			String text = emailHtmlLoader.correctiveActionReportF044(details);
			sendEmail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	
	private String getSubjectForFormat(String formatNo) {
		switch (formatNo) {
		case QaAppConstants.inward_formt_carton:
			return QaAppConstants.inwardCarton;
		case QaAppConstants.inward_format_ziplock:
			return QaAppConstants.inwardZiplock;
		case QaAppConstants.inward_format_film:
			return QaAppConstants.inwardFilm;
		case QaAppConstants.inward_format_stick:
			return QaAppConstants.inwardStick;
		case QaAppConstants.inward_format_jar:
			return QaAppConstants.inwardJar;
		case QaAppConstants.PC_Format:
		case QaAppConstants.PC_Format_1:
		case QaAppConstants.PC_Format_2:
		case QaAppConstants.PC_Format_3:
		case QaAppConstants.PC_Format_4:
		case QaAppConstants.PC_Format_5:

			return QaAppConstants.pestControl;
		case QaAppConstants.managementOfIncidence:
			return QaAppConstants.incidence;

		case QaAppConstants.customerComplaint:
			return QaAppConstants.customerComplaintForm;
		case QaAppConstants.nonConfirmityReport:
			return QaAppConstants.nonConfirmity;
		case QaAppConstants.listOfSharpTools:
			return QaAppConstants.listOfSharpTool;
		case QaAppConstants.rodentBox:
			return QaAppConstants.rodent;
		case QaAppConstants.inprocessInsBud:
			return QaAppConstants.inspectionBuds;
		case QaAppConstants.inprocessInsPleates:
			return QaAppConstants.inspectionPleates;
		case QaAppConstants.finalInspection:
			return QaAppConstants.finnalDispatch;
		case QaAppConstants.internalAuditReport:
			return QaAppConstants.internalAuditReportSub;
		case QaAppConstants.containerInspection:
			return QaAppConstants.containerIns;
		case QaAppConstants.changeControlLogBook:
			return QaAppConstants.changeControlLogBookSub;
		case QaAppConstants.summaryOfTraceability:
			return QaAppConstants.SummaryOfTraceabilitySub;
		case QaAppConstants.trainingNeedIdentification:
			return QaAppConstants.trainingNeedIdentificationSub;
		case QaAppConstants.correctiveActionReport:
			return QaAppConstants.correctiveActionReportSub;	
			
		default:
			return "Invalid Format Number";
		}
	}

	// Common method to send email
	public void sendEmail(String mailId, EmailSubject emailSubject, String content, String subject) {
		List<String> emailTo = new ArrayList<>();
		emailTo.add(mailId);
		String fromEmail = emailSubject.getUsername();

		emailSubject.init(fromEmail, emailTo, new ArrayList<>(), null, subject, content);
		emailSubject.setHTML(true);

		SendMail sm = new SendMail();
		sm.sendMail(emailSubject);
	}
	
	// Method for Supplier Audit Report - send pdf as attachement
	public void sendEmailToSupplier(String mailTo,String mailFrom,EmailSubject emailSubject, String content, String subject, String pdfContent,String fileName) {
		List<String> emailTo = new ArrayList<>();
		emailTo.add(mailTo);
		String fromEmail = mailFrom;

		emailSubject.init(fromEmail, emailTo, new ArrayList<>(), null, subject, content);
		emailSubject.setHTML(true);

		SendMail sm = new SendMail();
		sm.sendMailForSupplierAuditReport(emailSubject,pdfContent,fileName);
	}
	
	// Siva
		// Send Mail to department Hod to
	 
		public void sendMailToBreakageReportDepartmentHod(QaBreakageReport details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "ROLE_HOD";
				String departmentName = details.getDepartment();
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = getSubjectForFormat(details.getFormat_no());
				String text = emailHtmlLoader.qaBreackageMailTemplate(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
	 
		
		
		// Send Mail to QaManager  
		public void sendMailToBreakageReportDepartmentManager(QaBreakageReport details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "QA_MANAGER";
				String departmentName = "QUALITY_ASSURANCE";
	 
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = getSubjectForFormat(details.getFormat_no());
				String text = emailHtmlLoader.qaBreackageMailTemplate(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		
		
		
		// Send Mail to department Hod to
		
		public void sendMailToControlOfGHpWc(ControlOfGHpWc details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "ROLE_HOD";
				String departmentName = details.getDepartment();
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = getSubjectForFormat(details.getFormatNo());
				String text = emailHtmlLoader.ControlOfGHpWcMailTemplate(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		

		public void sendMailToListOfGHpWc(ListOfGHpWc details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "QA_MANAGER";
				String departmentName = "QUALITY_ASSURANCE";
	 
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				String subject = getSubjectForFormat(details.getFormatNo());
				String text = emailHtmlLoader.ListOfGHpWcMailTemplate(details);
				sendEmail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
//vijay
		
		public void sendMailToQaManagerTemplate(TemplateForRecall details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "QA_MANAGER";
				String departmentName = "QUALITY_ASSURANCE";
				
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				
//				String subject = getSubjectForFormat(details.getFormatNo());
				
				String subject = "TEMPLATE FOR MOCK RECALL";
				
				String text = emailHtmlLoader.templateList(details);
				
				sendEmail(mailId, emailSubject, text, subject);
				
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		// SEND MAIL TO SUPERVISOR
		
		public void sendMailToSupervisor(MetalDetectorCalibrationRecord details) {
			
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "ROLE_SUPERVISOR";
				String departmentName = details.getDepartment();
				
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				
//				String subject = getSubjectForFormat(details.getFormatNo());
				String subject = "METAL DETECTOR CALIBRATION RECORD";
				
				String text = emailHtmlLoader.metalDetectorCalibration(details);
				
				sendEmail(mailId, emailSubject, text, subject);
				
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
	      public void sendMailToQaInspector(MetalDetectorCalibrationRecord details) {
			
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				String roleName = "ROLE_QA";
				String departmentName = "QUALITY_ASSURANCE";
				
				String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
				
//				String subject = getSubjectForFormat(details.getFormatNo());
				
				String subject = "METAL DETECTOR CALIBRATION RECORD";
				
				String text = emailHtmlLoader.metalDetectorCalibrationQaInspector(details);
				
				sendEmail(mailId, emailSubject, text, subject);
				
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
	      
	      // METAL DETECTOR PASS REPORT
	      
	      
	      public void sendMailToQaInspectorMetalDetectorPass(MetalDetectorPassReport details) {
	  		
	  		try {
	  			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	  			String roleName = "ROLE_SUPERVISOR";
	  			String departmentName = details.getDepartment();
	  			
	  			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
	  			
//	  	    String subject = getSubjectForFormat(details.getFormatNo());
	  			
	  			String subject = "METAL DETECTOR PASS REPORT";
	  			
	  			String text = emailHtmlLoader.metalDetectorPassQaInspector(details);
	  			
	  			sendEmail(mailId, emailSubject, text, subject);
	  			
	  		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
	  				| InvalidKeySpecException e) {
	  			log.error("Unable to get Email details", e);
	  			throw new AppException("Unable to get Email details");
	  		}
	  	}
	      
	      
	      
// PRODUCT DISPOSITION LOG BOOK
	      
	      
	      public void sendMailToQaManagerRoleDesigneeProductDisposition(ProductDispositionLogBookF049 details) {
				
				try {
					EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
					String roleName = "QA_MANAGER";
					String departmentName = "QUALITY_ASSURANCE";
					
					String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
					
//					String subject = getSubjectForFormat(details.getFormatNo());
					
					String subject = "PRODUCT DISPOSITION LOGBOOK";
					
					String text = emailHtmlLoader.productDispositionLogBook(details);
					
					sendEmail(mailId, emailSubject, text, subject);
					
				} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
						| InvalidKeySpecException e) {
					log.error("Unable to get Email details", e);
					throw new AppException("Unable to get Email details");
				}
			}
	      
	      
	      
// BMR ISSUE REGISTER
	      
	      
	      public void sendMailToRoleSupervisorBmrIssueRegister(BmrIssueRegisterF045 details) {
				
				try {
					EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
					String roleName = "ROLE_SUPERVISOR";
					String departmentName = "QUALITY_ASSURANCE";
					
					String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
					
//					String subject = getSubjectForFormat(details.getFormatNo());
					
					String subject = "PRODUCT DISPOSITION LOGBOOK";
					
					String text = emailHtmlLoader.bmrIssueRegister(details);
					
					sendEmail(mailId, emailSubject, text, subject);
					
				} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
						| InvalidKeySpecException e) {
					log.error("Unable to get Email details", e);
					throw new AppException("Unable to get Email details");
				}
			}
	      
	      
// BMR ISSUE REGISTER
	      
	      
	      public void sendMailToQaManagerQualityReviewMeeting(QaQualityReviewMeetings details) {
				
				try {
					EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
					String roleName = "ROLE_SUPERVISOR";
					String departmentName = "QUALITY_ASSURANCE";
					
					String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
					
//					String subject = getSubjectForFormat(details.getFormatNo());
					
					String subject = "PRODUCT DISPOSITION LOGBOOK";
					
					String text = emailHtmlLoader.qualityReviewMeetings(details);
					
					sendEmail(mailId, emailSubject, text, subject);
					
				} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
						| InvalidKeySpecException e) {
					log.error("Unable to get Email details", e);
					throw new AppException("Unable to get Email details");
				}
			}

	      public void sendMailToTrainingNeedIdentificationQaManager(QaTrainingNeedIdentificationForm details) {
	  		try {
	  			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	  			String roleName = "QA_MANAGER";
	  			String departmentName = "QUALITY_ASSURANCE";
	   
	  			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
	  			String subject = "Training Need Identification Form Approval Required";
	  			String text = emailHtmlLoader.trainingNeedIdentificationQAManager(details);
	  			sendEmail(mailId, emailSubject, text, subject);
	  		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
	  				| InvalidKeySpecException e) {
	  			log.error("Unable to get Email details", e);
	  			throw new AppException("Unable to get Email details");
	  		}
	  	}
	      
	      
	      public void sendMailToPlantHead(MomMockRecall details) {
	  		try {
	  			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	  			String roleName = "ROLE_PLANT_HEAD";
	  			String departmentName = "QUALITY_ASSURANCE";
	   
	  			String mailId = userRepository.findEmailByRoleAndDepartment(roleName, departmentName);
	  			String subject = getSubjectForFormat(details.getFormatNo());
	  			String text = emailHtmlLoader.SendMailTOMomRecall(details);
	  			sendEmail(mailId, emailSubject, text, subject);
	  		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
	  				| InvalidKeySpecException e) {
	  			log.error("Unable to get Email details", e);
	  			throw new AppException("Unable to get Email details");
	  		}
	  	}

		public void sendMailToBatchChecklist(@Valid batchReleaseChecklist batchrelease, String userRole) {
			try {
	  			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	  			
	  			String departmentName = "QUALITY_ASSURANCE";
	   
	  			String mailId = userRepository.findEmailByRoleAndDepartment(userRole, departmentName);
	  			String subject = "BATCH RELEASE CHECKLIST";
	  			String text = emailHtmlLoader.SendMailTOBATCHCHECKLIST(batchrelease);
	  			sendEmail(mailId, emailSubject, text, subject);
	  		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
	  				| InvalidKeySpecException e) {
	  			log.error("Unable to get Email details", e);
	  			throw new AppException("Unable to get Email details");
	  		}
			
		}

		public void sendMailToProductionRetainList(productionretainedsampleregister40 productionRetain,
			String userRole) {
			try {
	  			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	  			
	  			String departmentName = "QUALITY_ASSURANCE";
	   
	  			String mailId = userRepository.findEmailByRoleAndDepartment(userRole, departmentName);
	  			String subject = "PRODUCTION RETAINED SAMPLE REGISTER";
	  			String text = emailHtmlLoader.SendMailTOPRODUCTIONRETAIN(productionRetain);
	  			sendEmail(mailId, emailSubject, text, subject);
	  		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
	  				| InvalidKeySpecException e) {
	  			log.error("Unable to get Email details", e);
	  			throw new AppException("Unable to get Email details");
	  		}
			
			
		}   
	      
	      
	      
	      
	      
}
