package com.focusr.Precot.util.splunance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.splunance.DailyProductionReportF006;
import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.mssql.database.model.splunance.DailyStoppageReportSpunlaceF008;
import com.focusr.Precot.mssql.database.model.splunance.FilterBagConsumptionDetailsF004;
import com.focusr.Precot.mssql.database.model.splunance.LogbookSpunlacePlanningF010;
import com.focusr.Precot.mssql.database.model.splunance.MachineCleaningRecordF023;
import com.focusr.Precot.mssql.database.model.splunance.MetalDetectorCheckListF020;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsWinterF005;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationOpeningLineF002;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationRpBalePressF013;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationSliterWinderF016;
import com.focusr.Precot.mssql.database.model.splunance.ProductChangeOverCheckListSpunlaceF011;
import com.focusr.Precot.mssql.database.model.splunance.SanitizationOfMachineAndSurfacesF024;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseSliterWinderProdReportF017;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseWasteReportSpunlaceF019;
import com.focusr.Precot.mssql.database.model.splunance.SplunanceBaleConsumptionF01;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceGsmAnalysisReportF009;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceRPBalePressStoppageF015;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportF012;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseRPProdSupportF14;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseStoppageReportF018;
import com.focusr.Precot.util.AppConstants;
@Component
public class SpunlaceEmailHtmlLoader {

	Logger logger = LoggerFactory.getLogger(SpunlaceEmailHtmlLoader.class);
	
	
	// F007 Supervisor
	public String dailyRejectionReportF007Supervisor(DailyRejectionReportF007 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getOperator_submit_by()
				+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F007 Hod
	public String dailyRejectionReportF007Hod(DailyRejectionReportF007 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getOperator_submit_by()
				+ "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F004 Supervisor
	public String FilterBagConsumptionDetailsF004Supervisor(FilterBagConsumptionDetailsF004 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F004
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getOperator_submit_by()
				+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F004 Hod
	public String FilterBagConsumptionDetailsF004Hod(FilterBagConsumptionDetailsF004 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F004
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getOperator_submit_by()
				+ "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F006 Supervisor
	public String DailyProductionReportF006Supervisor(DailyProductionReportF006 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F006
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F006 Hod
	public String DailyProductionReportF006Hod(DailyProductionReportF006 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F006
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submit_by() + "</p>" + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F010 Hod
	public String LogbookSpunlacePlanningF010Hod(LogbookSpunlacePlanningF010 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F010
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F009 Hod
	public String SpunlaceGsmAnalysisReportF009Hod(SpunlaceGsmAnalysisReportF009 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F009
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Order Number : " + details.getOrderNo() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F016 Supervisor
	public String ProcessSetupVerificationSliterWinderF016Supervisor(ProcessSetupVerificationSliterWinderF016 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F016
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F016 Hod
	public String ProcessSetupVerificationSliterWinderF016Hod(ProcessSetupVerificationSliterWinderF016 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F016
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F013 Supervisor
	public String ProcessSetupVerificationRpBalePressF013Supervisor(ProcessSetupVerificationRpBalePressF013 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F013
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F013 Hod
	public String ProcessSetupVerificationRpBalePressF013Hod(ProcessSetupVerificationRpBalePressF013 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F013
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F020 Hod
	public String MetalDetectorCheckListF020Hod(MetalDetectorCheckListF020 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F020
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F019 Hod
	public String ShiftWiseWasteReportSpunlaceF019Hod(ShiftWiseWasteReportSpunlaceF019 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F019
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F024 Hod
	public String SanitizationOfMachineAndSurfacesF024Hod(SanitizationOfMachineAndSurfacesF024 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F024
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Week : " + details.getWeek() + "<p>Month : "
				+ details.getMonth() + "<p>Year : " + details.getYear() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F011 Hod
	public String ProductChangeOverCheckListSpunlaceF011Supervisor(ProductChangeOverCheckListSpunlaceF011 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F011
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number From : " + details.getOrderNoFrom() + "</p>"
				+ "<p>Order Number To : " + details.getOrderNoTo() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F011 QA
	public String ProductChangeOverCheckListSpunlaceF011Hod(ProductChangeOverCheckListSpunlaceF011 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F011
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number From : " + details.getOrderNoFrom() + "</p>"
				+ "<p>Order Number To : " + details.getOrderNoTo() + "</p>" + "</p>" + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HOD): " + details.getHod_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F025 Hod
	public String SpunlaceHandSanitizationReportF025Hod(SpunlaceHandSanitizationReportF025 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F025
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F023 Hod
	public String MachineCleaningRecordF023Hod(MachineCleaningRecordF023 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F023
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "</p>" + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F017 Supervisor
	public String ShiftWiseSliterWinderProdReportF017Supervisor(ShiftWiseSliterWinderProdReportF017 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F017
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F017 Hod
	public String ShiftWiseSliterWinderProdReportF017Hod(ShiftWiseSliterWinderProdReportF017 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F017
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F001 Supervisor
	public String SplunanceBaleConsumptionF01Supervisor(SplunanceBaleConsumptionF01 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F001
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNumber() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F001 Hod
	public String SplunanceBaleConsumptionF01Hod(SplunanceBaleConsumptionF01 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F001
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNumber() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F005 Supervisor
	public String ProcessSetupDetailsWinterF005Supervisor(ProcessSetupDetailsWinterF005 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F005
				+ "</p>" + "<p>Format No: " + details.getFormat_no() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F005 Hod
	public String ProcessSetupDetailsWinterF005Hod(ProcessSetupDetailsWinterF005 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F005
				+ "</p>" + "<p>Format No: " + details.getFormat_no() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F003 Supervisor
	public String ProcessSetupDetailsJetlaceAndDryerF003Supervisor(ProcessSetupDetailsJetlaceAndDryerF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F003
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F003 Hod
	public String ProcessSetupDetailsJetlaceAndDryerF003Hod(ProcessSetupDetailsJetlaceAndDryerF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F003
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F002 Supervisor
	public String ProcessSetupVerificationOpeningLineF002Supervisor(ProcessSetupVerificationOpeningLineF002 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F002
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F002 Hod
	public String ProcessSetupVerificationOpeningLineF002Hod(ProcessSetupVerificationOpeningLineF002 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F002
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F008 Hod
	public String DailyStoppageReportSpunlaceF008Hod(DailyStoppageReportSpunlaceF008 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F008
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F012 Hod
	public String SpunlaceSampleReportF012Supervisor(SpunlaceSampleReportF012 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F012
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F012 QC
	public String SpunlaceSampleReportF012Hod(SpunlaceSampleReportF012 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F012
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrder_no() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HOD): " + details.getHod_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F014 Supervisor
	public String SpunlaceShiftWiseRPProdSupportF14Supervisor(SpunlaceShiftWiseRPProdSupportF14 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F014
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F014 Hod
	public String SpunlaceShiftWiseRPProdSupportF14Hod(SpunlaceShiftWiseRPProdSupportF14 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F014
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Order Number : " + details.getOrderNo() + "</p>" + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F018 Hod
	public String SpunlaceShiftWiseStoppageReportF018Hod(SpunlaceShiftWiseStoppageReportF018 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F018
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F015 Hod
	public String SpunlaceRPBalePressStoppageF015Hod(SpunlaceRPBalePressStoppageF015 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F015
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
}
