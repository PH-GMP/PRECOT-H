package com.focusr.Precot.QA.util.mail;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
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
import com.focusr.Precot.util.AppConstants;

@Service
public class QAEmailHtmlLoader {
	Logger logger = LoggerFactory.getLogger(QAEmailHtmlLoader.class);

	// Inward Inspection
	public String inwardInspection(InwardInspectionReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>IIR No: " + details.getIir_no() + "</p>" + "<p>Invoice No: " + details.getInvoice_no() + "</p>"
				+ "<p>Submitted by (QA Inspector): " + details.getQa_inspector_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Pest Controller
	public String pestController(QaPestController details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Type of Service: "
				+ details.getType_of_service() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
//				+ "<p>Month: "+ details.getMonth()+ "</p>"  + "<p>Year: " + details.getYear() + "</p>"
				+ "<p>Submitted by (PCI Trained Person): " + details.getPci_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Rodent Box
	public String rodentBoxCheckList(QaRodentBoxCheckList details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Submitted by (PCI Trained Person): " + details.getPci_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Customer Complaint Register HOD
	public String customerComplaintRegisterHod(QaCustomerComplaintRegisterForm details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>CCF Number: " + details.getCcf_no() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Customer Name: " + details.getCustomer_name() + "</p>"
				+ "<p>Customer Complaint Ref. Number: " + details.getCustomer_complaint_ref_no() + "</p>"
				+ "<p>Submitted by (QA Manager / Designee): " + details.getQa_mr_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Customer Complaint Register QA_Manager
	public String customerComplaintRegisterQAMR(QaCustomerComplaintRegisterForm details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>CCF Number: " + details.getCcf_no() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Customer Name: " + details.getCustomer_name() + "</p>"
				+ "<p>Customer Complaint Ref. Number: " + details.getCustomer_complaint_ref_no() + "</p>"
				+ "<p>Submitted by (QA Manager / Designee): " + details.getQa_mr_submit_by() + "</p>"
				+ "<p>Approved by (HOD): " + details.getHod_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Non Conformity Report Prod Supervisor tab A
	public String NCReportTabA(QaNonConformityReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>NCR Number: " + details.getNcrNumber() + "</p>" + "<p>BMR Number: " + details.getBmrNumber()
				+ "</p>" + "<p>Product: " + details.getProduct() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Nature Of Non Conformity: " + details.getNonConfirmityNature() + "</p>"
				+ "<p>Submitted by (QA Inspector / QC Chemist): " + details.getQaInspectorA() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Non Conformity Report QA Inspector / QC Chemist tab BCD
	public String NCReportTabBCD(QaNonConformityReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>NCR Number: " + details.getNcrNumber() + "</p>" + "<p>BMR Number: " + details.getBmrNumber()
				+ "</p>" + "<p>Product: " + details.getProduct() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Nature Of Non Conformity: " + details.getNonConfirmityNature() + "</p>"
				+ "<p>Submitted by (QA Inspector / QC Chemist): " + details.getQaInspectorA() + "</p>"
				+ "<p>Submitted by (Production Supervisor): " + details.getProductionSupervisorBCD() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Non Conformity Report Prod Supervisor 2nd Approval
	public String NCReportProdSupervisor(QaNonConformityReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>NCR Number: " + details.getNcrNumber() + "</p>" + "<p>BMR Number: " + details.getBmrNumber()
				+ "</p>" + "<p>Product: " + details.getProduct() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Nature Of Non Conformity: " + details.getNonConfirmityNature() + "</p>"
				+ "<p>Submitted by (QA Inspector / QC Chemist): " + details.getQaInspectorA() + "</p>"
				+ "<p>Submitted by (Production Supervisor): " + details.getProductionSupervisorBCD() + "</p>"
				+ "<p>Approved by (QA Inspector / QC Chemist): " + details.getQaInspectorSubmittedBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Non Conformity Report Prod Head 3nd Approval
	public String NCReportProdHead(QaNonConformityReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>NCR Number: " + details.getNcrNumber() + "</p>" + "<p>BMR Number: " + details.getBmrNumber()
				+ "</p>" + "<p>Product: " + details.getProduct() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Nature Of Non Conformity: " + details.getNonConfirmityNature() + "</p>"
				+ "<p>Submitted by (QA Inspector / QC Chemist): " + details.getQaInspectorA() + "</p>"
				+ "<p>Submitted by (Production Supervisor): " + details.getProductionSupervisorBCD() + "</p>"
				+ "<p>Approved by (QA Inspector / QC Chemist): " + details.getQaInspectorSubmittedBy() + "</p>"
				+ "<p>Approved by (Production Supervisor): " + details.getProductionSupervisorSubmittedBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Non Conformity Report QA Manager / QC Manager 4nd Approval
	public String NCReportQAManager(QaNonConformityReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>NCR Number: " + details.getNcrNumber() + "</p>" + "<p>BMR Number: " + details.getBmrNumber()
				+ "</p>" + "<p>Product: " + details.getProduct() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Nature Of Non Conformity: " + details.getNonConfirmityNature() + "</p>"
				+ "<p>Submitted by (QA Inspector / QC Chemist): " + details.getQaInspectorA() + "</p>"
				+ "<p>Submitted by (Production Supervisor): " + details.getProductionSupervisorBCD() + "</p>"
				+ "<p>Approved by (QA Inspector / QC Chemist): " + details.getQaInspectorSubmittedBy() + "</p>"
				+ "<p>Approved by (Production Supervisor): " + details.getProductionSupervisorSubmittedBy() + "</p>"
				+ "<p>Approved by (Production Head): " + details.getProductionHeadSubmittedBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Management of Incidence QA Manager
	public String managementOfIncidenceQaManager(ManagementOfIncidence details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Date: " + details.getDate() + "</p>" + "<p>Shift: " + details.getShift() + "</p>"
				+ "<p>Incident Number: " + details.getIncident_no() + "</p>" + "<p>Submitted by (HOD / Designee): "
				+ details.getHod_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Management of Incidence Plant head
	public String managementOfIncidencePlantHead(ManagementOfIncidence details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>" + "<p>Date: " + details.getDate() + "</p>" + "<p>Shift: " + details.getShift() + "</p>"
				+ "<p>Incident Number: " + details.getIncident_no() + "</p>" + "<p>Submitted by (HOD / Designee): "
				+ details.getHod_submit_by() + "</p>" + "<p>Approved by (QA Manager / MR): "
				+ details.getQa_manager_approved_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// List Of Sharp Tools
	public String listOfSharpTools(ListOfSharpTools details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Submitted by (QA Inspector): "
				+ details.getQa_inspector_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Internal Audit Report Auditor
	public String internalAuditReportAuditor(InternalAuditReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getReportDate() + "</p>"
				+ "<p>IAR Number: " + details.getIarNo() + "</p>" + "<p>Department: " + details.getDepartment() + "</p>"
				+ "<p>Auditor Name: " + details.getAuditorName() + "</p>" + "<p>Auditee Name: "
				+ details.getAuditeeName() + "</p>" + "<p>Total Number Of NC raised: " + details.getTotalNoOfNc()
				+ "</p>" + "<p>Submitted by (Auditee): " + details.getAuditeeSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Internal Audit Report QA Manager
	public String internalAuditReportQaMr(InternalAuditReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getReportDate() + "</p>"
				+ "<p>IAR Number: " + details.getIarNo() + "</p>" + "<p>Department: " + details.getDepartment() + "</p>"
				+ "<p>Auditor Name: " + details.getAuditorName() + "</p>" + "<p>Auditee Name: "
				+ details.getAuditeeName() + "</p>" + "<p>Total Number Of NC raised: " + details.getTotalNoOfNc()
				+ "</p>" + "<p>Submitted by (Auditee): " + details.getAuditeeSubmitBy() + "</p>"
				+ "<p>Approved by (Auditor): " + details.getAuditorSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Online Inspection Report Supervisor
	public String onlineInspectionReportSupervisor(QaOnlineInspectionReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>BMR Number: " + details.getBmrNo() + "</p>"
				+ "<p>Shift: " + details.getShift() + "</p>" + "<p>Product Description: "
				+ details.getProductDescription() + "</p>" + "<p>POrder: " + details.getPOrder() + "</p>"
				+ "<p>Submitted by (QA Inspector): " + details.getQa_inspector_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Online Inspection Report QA_Manager / Designee
	public String onlineInspectionReportQaMr(QaOnlineInspectionReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>BMR Number: " + details.getBmrNo() + "</p>"
				+ "<p>Shift: " + details.getShift() + "</p>" + "<p>Product Description: "
				+ details.getProductDescription() + "</p>" + "<p>POrder: " + details.getPOrder() + "</p>"
				+ "<p>Submitted by (QA Inspector): " + details.getQa_inspector_submit_by() + "</p>"
				+ "<p>Approved by (Supervisor): " + details.getProd_supervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Container Inspection Report Security
	public String containerInspectionReportSecurity(QaContainerInspectionReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>CIR Number: " + details.getCirNo() + "</p>" + "<p>Container Number: " + details.getContainerNO()
				+ "</p>" + "<p>Submitted by (QA Inspector): " + details.getQa_inspector_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Container Inspection Report Dispatch Supervisor
	public String containerInspectionReportDispatchSupervisor(QaContainerInspectionReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>CIR Number: " + details.getCirNo() + "</p>" + "<p>Container Number: " + details.getContainerNO()
				+ "</p>" + "<p>Submitted by (QA Inspector): " + details.getQa_inspector_submit_by() + "</p>"
				+ "<p>Approved by (Security): " + details.getSecurity_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Container Inspection Report QA Manager / Designee
	public String containerInspectionReportQaManager(QaContainerInspectionReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>CIR Number: " + details.getCirNo() + "</p>" + "<p>Container Number: " + details.getContainerNO()
				+ "</p>" + "<p>Submitted by (QA Inspector): " + details.getQa_inspector_submit_by() + "</p>"
				+ "<p>Approved by (Security): " + details.getSecurity_submit_by() + "</p>"
				+ "<p>Approved by (Dispatch Supervisor): " + details.getDispatch_supervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Request And Issuance Of Document
	public String requestAndIssunceOfDocument(RequestAndIssunceOfDocumentF002 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Submitted by (HOD / Designee): " + details.getQa_hod_designee_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Final Inspection Report
	public String finalInspectionReport(FinalInspectionReportF037 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>FIR Number: " + details.getFirNo() + "</p>" + "<p>BMR Number: " + details.getBmrNo() + "</p>"
				+ "<p>Product Description: " + details.getProductDescription() + "</p>" + "<p>POrder: "
				+ details.getPOrder() + "</p>" + "<p>Submitted by (QA Inspector): "
				+ details.getQa_inspector_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Supplier Audit Plan
	public String supplierAuditPlan(SupplierAuditPlan details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Finacial Year: " + details.getFinancialYear()
				+ "</p>" + "<p>Submitted by (Designee): " + details.getDesigneeSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Supplier Audit Report
	public String supplierAuditReport(SupplierAuditReport report) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + report.getFormatName() + "</p>"
				+ "<p>Format No: " + report.getFormatNo() + "</p>" + "<p>Report Date: " + report.getReportDate()
				+ "</p>" + "<p>Submitted by (Auditor): " + report.getAuditorEmailId() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Supplier Audit Report
public String supplierAuditReportPdfContent(SupplierAuditReport report, byte[] signature) throws IOException {
	byte[] imageBytes = loadImage();
	String base64ImageLogo = Base64.getEncoder().encodeToString(imageBytes);
	String base64Image = Base64.getEncoder().encodeToString(signature);
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    String formattedDate = report.getReportDate().format(formatter);
    String body =
    		"<html>\n" 
    		+ "<head>"
    		+"<style>"
   				+" td, th { border: 1px solid black; }"
   			+"</style>"
     		+ " </head>"
    		+ "<body>\n" 
			+ "<div style=\"border:none;\">\n"
			+ "<table style=\"margin-top:10px;width:100%;border-spacing: 0px;border-collapse: collapse;\">\n"
			//+ "<br/>\n"
			+ "<thead>\n"
//			+ "<tr style=\"border: none;\">\n" 
//				+ "<td style=\"border: none;\" colSpan=\"115\"></td>\n"
//			+ "</tr>\n" 
			+ "<tr>\n" 
			+ "<td colSpan=\"15\" rowspan=\"4\" style=\"text-align:center;\">\n"
				+ "<img src=\"data:image/jpeg;base64," + base64ImageLogo
				+ "\" style=\"width: 100px; height: auto;text-align:center;display: inline-block;\" /> " 
				+ "<br>\n"
				+ "Unit H\n"
			+ "</td>\n"
			+ "<th colSpan=\"70\" rowSpan=\"4\" style=\"text-align: center;\">Supplier Audit Report</th>\n"
			+ "<td colSpan=\"15\">Format No.:</td>\n" + "<td colSpan=\"15\">"
				+ report.getFormatNo() + 
			"</td>\n"
			+ "</tr>\n"
			+ "<tr>\n" 
				+ "<td colSpan=\"15\">Revision No.:</td>\n" 
				+ "<td colSpan=\"15\">"
					+"0"+report.getRevisionNo()
				+ "</td>\n" 
			+ "</tr>\n" 
			+ "<tr>\n" 
				+ "<td colSpan=\"15\">Ref. SOP No.:</td>\n"
				+ "<td colSpan=\"15\">" + report.getSopNumber() 
				+ "</td>\n" 
			+ "</tr>\n" 
			+ "<tr>\n"
				+ "<td colSpan=\"15\">Page No.:</td>\n" 
				+ "<td colSpan=\"15\">1</td>\n" 
			+ "</tr>\n"
//			+ "<tr style=\"border: none;\">\n" 
//				+ "<td style=\"border: none;\" colSpan=\"115\"></td>\n" 
//			+ "</tr>\n"
			+ "</thead>\n"
			+ "<tr >\n" 
				+ "<td style=\"border: none;padding:5px;\" colSpan=\"115\"></td>\n" 
			+ "</tr>\n"
			+ "<tbody>\n" 
				+ "<tr>\n" 
					+ "<td colSpan=\"115\"><b>Date:</b>" + formattedDate + "</td>\n"
				+ "</tr>\n"
				+ "<tr>\n" 
					+ "<td colSpan=\"70\"><b>Supplier Name:</b>"+ report.getSupplierName()+ "</td>\n" 
					+ "<td colSpan=\"45\" rowspan=\"3\" style=\"text-align: left; vertical-align: top;\"><b>Address:</b>"
						+ report.getAddress() 
					+ "</td>\n"
					+ "</tr>\n" 
				+ "<tr>\n"
					+ "<td colSpan=\"70\"><b>Supplier’s Representative:</b>" + report.getSupplierRepresentative() + "</td>\n"
				+ "</tr>\n" 
				+ "<tr>\n" 
					+ "<td colSpan=\"70\"><b>Auditor(s):</b>" + report.getAuditors() + "</td>\n"
				+ "</tr>\n"
				+ "<tr>\n" 
					+ "<td colSpan=\"115\" style=\"border-bottom: none;height: 100px;vertical-align:top;\"><b>Objectives:</b>" + report.getObjectives() + " <br/></td>\n" 
				+ "</tr>\n"
				+ "<tr>\n"
					+ "<td colSpan=\"115\" style=\"border-top: none;border-bottom: none;height:100px;vertical-align:top;\"><b>Scope:</b>" + report.getScope() + " <br/></td>\n" 
				+ "</tr>\n" 
				+ "<tr>\n"
					+ "<td colSpan=\"115\" style=\"border-top: none;border-bottom: none;height:100px;vertical-align:top;\"><b>Methodology:</b>" + report.getMethodology() + "<br/></td>\n" 
				+ "</tr>\n" 
				+ "<tr>\n"
					+ "<td colSpan=\"115\" style=\"border-top: none;border-bottom: none;height:100px;vertical-align:top;\"><b>Areas Audited:</b>" + report.getAreasAudited() + "<br/></td>\n"
				+ "</tr>\n"
				+ "<tr>\n" 
					+ "<td colSpan=\"115\" style=\"border-top: none;border-bottom: none;height:100px;vertical-align:top;\"><b>Attachments:</b>" + report.getAttachments() + "<br/></td>\n" 
				+ "</tr>\n"
				+ "<tr>\n" 
					+ "<td colSpan=\"115\" style=\"border-top: none;height:100px;\"><b>Observation:</b>" + report.getObservation() + "</td>\n"
				+ "</tr>\n"
				+ "<tr>\n" 
					+ "<td colSpan=\"60\" style=\"text-align:center;\">Auditee</td>\n"
					+ "<td colSpan=\"55\" style=\"text-align:center;\">Auditor(s)</td>\n" 
				+ "</tr>\n" 
				+ "<tr>\n"
					+ "<td colSpan=\"60\" style=\"text-align:center;height:50px;\"><b>Name:</b></td>\n"
					+ "<td colSpan=\"55\" style=\"text-align:center;height:50px;\"><b>Name:</b>"+ report.getAuditorSubmitBy()+"</td>\n"
				+ "</tr>\n"
				+ "<tr>\n"	
					+ "<td colSpan=\"60\" style=\"text-align:center;height:50px;\"></td>\n"
					+ "<td colSpan=\"55\" style=\"text-align:center;\">" 
						+ report.getAuditorSubmitOn() + "<br>" + "<img src=\"data:image/jpeg;base64," + base64Image
						+ "\" style=\"width: 60px; height: 60px;display: inline-block;\" /></td>\n" 
				+ "</tr>\n"
				+ "<tr>\n" 
					+ "<td style=\"border: none;padding:30px;\" colSpan=\"115\"></td>\n" 
				+ "</tr>\n"		
				+ "</tbody>\n"
				
			+ "<tfoot>\n"
				+ "<tr style=\"border: none;\">\n"
				+ "<td style=\"border: none;\" colSpan=\"115\"></td>\n" 
				+ "</tr>\n" 
				+ "<tr>\n"
					+ "<th colSpan=\"25\">Particular</th>\n"
					+ "<th colSpan=\"30\" style=\"text-align: center;\">Prepared by</th>\n"
					+ "<th colSpan=\"30\" style=\"text-align: center;\">Reviewed by</th>\n"
					+ "<th colSpan=\"30\" style=\"text-align: center;\">Approved by</th>\n" 
				+ "</tr>\n" 
				+ "<tr>\n"
					+ "<th colSpan=\"25\">Name</th>\n" + "<td colSpan=\"30\"></td>\n" + "<td colSpan=\"30\"></td>\n"
					+ "<td colSpan=\"30\"></td>\n" + "</tr>\n" + "<tr>\n" + "<th colSpan=\"25\">Signature & Date</th>\n"
					+ "<td colSpan=\"30\"></td>\n" + "<td colSpan=\"30\"></td>\n" + "<td colSpan=\"30\"></td>\n" 
				+ "</tr>\n"
			+ "</tfoot>\n" 
			+ "</table>\n" 
			+ "</div>\n" 
			+ "</body>\n" 
			+ "</html>";
	return body;
}

	// INTERNAL AUDIT NC REPORT
	// auditee
	public String internalAuditNcAuditee(InternalAuditNCReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getReportDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Date: " + details.getNcrNo() + "</p>"

				+ "<p>Auditor : " + details.getFirstAuditorSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// auditee
	public String internalAuditNcAuditorAndQAManager(InternalAuditNCReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getReportDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Date: " + details.getNcrNo() + "</p>"

				+ "<p>Auditor : " + details.getFirstAuditorSubmitBy() + "</p>" + "<p>Auditee : "
				+ details.getAuditeeSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String changeControllLogBookF042(QaChangeControlLogBookF042 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Change Controll No: "
				+ details.getChangeControlNo() + "</p>" + "<p>Department: " + details.getIssuedToDepartment() + "</p>"
				+ "<p>Submitted by (QA Inspector): " + details.getHodOrDesigneeSubmittedBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String changeControllLogBookF060(QaMasterListOfSharpToolsF060 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Submitted by (QA Inspector): "
				+ details.getQaInspectorStatus() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
//kavya 
	
	public String SummaryOfTraceablityF025(QASummaryOfTraceability details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"+"<p>Bmr No: " + details.getBmrNo() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Submitted by (QA Manager/Designee): "
				+ details.getQaManagerOrDesigneeSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	public String annualProductReview(AnnualProductReview details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"+"<p>Product Name: " + details.getProductName() + "</p>"
				+ "<p>Product Code: " + details.getProductCode() + "</p>" + "<p>Submitted by (QA Designee): "
				+ details.getQaDesigneeSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	public String TrainingNeedIdentificationF005(QaTrainingNeedIdentificationForm details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"+"<p>Bmr No: " 
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Submitted by (Hod): "
				+ details.getHodSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
//srimathi
	
	public String correctiveActionReportF044(CorrectiveActionReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Report Date: " + details.getReportDate() + "</p>"
				+ "<p>Submitted by (QA Inspector): "+ details.getQaInspectorSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// Siva
	public String qaBreackageMailTemplate(QaBreakageReport details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormat_name() + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>seqNo: " + details.getRep_seq_no() + "</p>"

	        + "<p>Auditor : " + details.getQa_inspector_submitted_on() + "</p>" + "<p>Auditee : "
	        + details.getQa_inspector_submitted_on() + "</p>"
	        + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
	        + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
	        + "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String ControlOfGHpWcMailTemplate(ControlOfGHpWc details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>"

	        + "<p>Auditor : " + details.getHod_submitted_on() + "</p>" + "<p>Auditee : "
	        + details.getHod_submitted_by() + "</p>"
	        + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
	        + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
	        + "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String ListOfGHpWcMailTemplate(ListOfGHpWc details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Department: " + details.getDepartment()
				+ "</p>"

	        + "<p>Auditor : " + details.getManager_submitted_on() + "</p>" + "<p>Auditee : "
	        + details.getManager_submitted_by() + "</p>"
	        + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
	        + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
	        + "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
//vijay
	
	public String templateList (TemplateForRecall details) {
		
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>"
				+ "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>"
				+ "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Product Name: " + details.getProduct_name() + "</p>"
				+ "<p>Customer Name: " + details.getCustomer_name() + "</p>"
				+ "<p>Po No: " + details.getPo_no_and_date()+ "</p>"
				+ "<p>Lot No: " + details.getLot_no() + "</p>"
				+ "<p>Submitted by (QA_INSPECTOR): " + details.getQa_inspector_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
public String metalDetectorCalibration (MetalDetectorCalibrationRecord details) {
		
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>"
				+ "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>"
				+ "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment()+ "</p>"
				+ "<p>EquipmentId: " + details.getEq_id()+ "</p>"
				+ "<p>Date: " + details.getDate()+ "</p>"
				+ "<p>Month: " + details.getMonth()+ "</p>"
				+ "<p>Year: " + details.getYear()+ "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}


public String metalDetectorCalibrationQaInspector(MetalDetectorCalibrationRecord details) {
	
	String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
			+ "<p><b>Kindly Find the Form Details:</b></p>"
			+ "<p>Format Name: " + details.getFormatName() + "</p>"
			+ "<p>Format No: " + details.getFormatNo() + "</p>"
			+ "<p>Date: " + details.getDate() + "</p>"
			+ "<p>Department: " + details.getDepartment()+ "</p>"
			+ "<p>EquipmentId: " + details.getEq_id()+ "</p>"
			+ "<p>Date: " + details.getDate()+ "</p>"
			+ "<p>Month: " + details.getMonth()+ "</p>"
			+ "<p>Year: " + details.getYear()+ "</p>"
			+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
			+ "<p>Approved by (Supervisor): " + details.getSupervisor_submit_by()+ "</p>"
			+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
			+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
			+ "<p>Team-Precot</p>" + "</body></html>";
	return body;
}


// METAL DETECTOR PASS REPORT

public String metalDetectorPassQaInspector(MetalDetectorPassReport details) {
	
	String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
			+ "<p><b>Kindly Find the Form Details:</b></p>"
			+ "<p>Format Name: " + details.getFormatName() + "</p>"
			+ "<p>Format No: " + details.getFormatNo() + "</p>"
			+ "<p>Date: " + details.getDate() + "</p>"
			+ "<p>Shift: " + details.getShift()+ "</p>"
			+ "<p>Department: " + details.getDepartment()+ "</p>"
			+ "<p>Submitted by (supervisor): " + details.getSupervisor_submit_by() + "</p>"
			+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
			+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
			+ "<p>Team-Precot</p>" + "</body></html>";
	return body;
}

//Menaga

//Product Disposition Logbook


	public String productDispositionLogBook (ProductDispositionLogBookF049 details) {
		
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>"
				+ "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>"
				+ "<p>Date: " + details.getDate() + "</p>"				
				+ "<p>Submitted by (QA_INSPECTOR): " + details.getQa_inspector_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	
//	Bmr Issue Register
	
public String bmrIssueRegister (BmrIssueRegisterF045 details) {
		
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>"
				+ "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>"
				+ "<p>Date: " + details.getDate() + "</p>"			
						+ "<p>Department: " + details.getDepartmentName() + "</p>"	
				+ "<p>Submitted by (QA_INSPECTOR): " + details.getQa_inspector_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
//Quality Review Meetings

public String qualityReviewMeetings (QaQualityReviewMeetings details) {
	
	String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
			+ "<p><b>Kindly Find the Form Details:</b></p>"
			+ "<p>Format Name: " + details.getFormatName() + "</p>"
			+ "<p>Format No: " + details.getFormatNo() + "</p>"
			+ "<p>Date: " + details.getDate() + "</p>"			
//					+ "<p>Department: " + details.getDepartmentName() + "</p>"	
+ "<p>Month: " + details.getMonth()+ "</p>"
+ "<p>Year: " + details.getYear()+ "</p>"
			+ "<p>Submitted by (QA_INSPECTOR): " + details.getQa_inspector_submit_by() + "</p>"
			+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
			+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
			+ "<p>Team-Precot</p>" + "</body></html>";
	return body;
}

public byte[] loadImage() throws IOException {
    // Load image from classpath
    ClassPathResource resource = new ClassPathResource("static/images/logo.png");
    
    try (InputStream inputStream = resource.getInputStream();
         ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
        
        byte[] buffer = new byte[1024];
        int length;
        
        // Read the image byte-by-byte and write it to the ByteArrayOutputStream
        while ((length = inputStream.read(buffer)) != -1) {
            byteArrayOutputStream.write(buffer, 0, length);
        }
        
        // Return the byte array
        return byteArrayOutputStream.toByteArray();
    }
}

public String trainingNeedIdentificationQAManager(QaTrainingNeedIdentificationForm details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Department: " + details.getDepartment() + "</p>" + "<p>Submitted by (HOD / Designee): "
				+ details.getHodSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}



public String SendMailTOMomRecall(MomMockRecall details) {
	String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
			+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + details.getFormatName() + "</p>"
			+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
			+ "<p>Venue: " + details.getVenue() + "</p>" + "<p>AGENDA: " + details.getAgenda()
			+ "</p>"

			+ "<p>Auditor : " + details.getManager_submitted_on() + "</p>" + "<p>Auditee : "
			+ details.getManager_submitted_by() + "</p>"
			+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
			+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
			+ "<p>Team-Precot</p>" + "</body></html>";
	return body;
}

public String SendMailTOBATCHCHECKLIST(@Valid batchReleaseChecklist batchrelease) {
	String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
			+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + batchrelease.getFormat() + "</p>"
			+ "<p>Format No: " + batchrelease.getFormat_no() + "</p>" + "<p>Date: " + batchrelease.getDate() + "</p>"
		

			+ "<p>Inspector Approved Date : " + batchrelease.getIns_submit_on() + "</p>" + "<p>Inspector : "
			+ batchrelease.getIns_submit_by() + "</p>"
			+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
			+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
			+ "<p>Team-Precot</p>" + "</body></html>";
	return body;
}

public String SendMailTOPRODUCTIONRETAIN(productionretainedsampleregister40 productionRetain) {
	String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
			+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + productionRetain.getFormat() + "</p>"
			+ "<p>Format No: " + productionRetain.getFormat_no() + "</p>" + "<p>Date: " + productionRetain.getDate() + "</p>"
		

			+ "<p>Inspector Approved Date : " + productionRetain.getIns_submit_on() + "</p>" + "<p>Inspector : "
			+ productionRetain.getIns_submit_by() + "</p>"
			+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
			+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
			+ "<p>Team-Precot</p>" + "</body></html>";
	return body;
}	

}
