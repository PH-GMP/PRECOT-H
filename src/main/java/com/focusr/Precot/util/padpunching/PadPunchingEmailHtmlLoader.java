package com.focusr.Precot.util.padpunching;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
import com.focusr.Precot.mssql.database.model.padpunching.DailyRollConsumptionReportF002;
import com.focusr.Precot.mssql.database.model.padpunching.MachineCleaningCheckListF005;
import com.focusr.Precot.mssql.database.model.padpunching.MetalDetectorCheckList007;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF26;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingLogBookBagMakingF003;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingSanitizationOfMachinesAndSurfacesF21;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailsLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;
import com.focusr.Precot.util.AppConstants;
@Component
public class PadPunchingEmailHtmlLoader {

	Logger logger = LoggerFactory.getLogger(PadPunchingEmailHtmlLoader.class);

	// F001
	public String productionDetailLogBookF001Hod(ProductionDetailLogBook01 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F001
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F001No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by()
				+ "</p>" + "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F002
	public String rollConsumptionF002Supervisor(DailyRollConsumptionReportF002 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F002
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F002No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String rollConsumptionF002Hod(DailyRollConsumptionReportF002 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F002
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F002No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>" + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F003
	public String punchingProductChangeOverF03Hod(PunchingProductChangeOverF03 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F003
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F003No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String punchingProductChangeOverF03QA(PunchingProductChangeOverF03 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F003
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F003No + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HOD): " + details.getHod_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F004
	public String dailyProdPackingDetailsF004Hod(DailyProdPackingDetailsF004 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F004
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F004No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F005
	public String machineCleaningCheckListF005Hod(MachineCleaningCheckListF005 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F005
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F005No + "</p>" + "<p>Date : " + details.getDate()
				+ "</p>"  + "<p>Machine Name : " + details.getMachineName()
				+ "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F006
	public String punchingHandSanitationF006Hod(PunchingHandSanitationF24 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F006
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F006No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F007
	public String metalDetectorCheckList007Hod(MetalDetectorCheckList007 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F007
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F007No + "</p>" + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F008
	public String padPunchingSanitizationOfMachinesAndSurfacesF21Hod(
			PadPunchingSanitizationOfMachinesAndSurfacesF21 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F008
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F008No + "</p>" + "<p>Month : " + details.getMonth()
				+ "</p>" + "<p>Year : " + details.getYear() + "</p>" + "<p>Week : " + details.getWeekNo() + "</p>"
				+ "<p>Date : " + details.getDate() + "</p>" + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F009
	public String padPunchingHouseKeepingCheckListF26HR(PadPunchingHouseKeepingCheckListF26 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F009
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F009No + "</p>" + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F009
	public String padPunchingHouseKeepingCheckListF26Hod(PadPunchingHouseKeepingCheckListF26 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F009
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F009No + "</p>" + "<p>Date : " + details.getDate()
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HR): " + details.getHr_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F012
	public String padPunchingLogBookBagMakingF003Hod(PadPunchingLogBookBagMakingF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F012
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F012No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Operator): "
				+ details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F013
	public String padPunchingBagMakingDailyProductionDetailsF001Hod(
			PadPunchingBagMakingDailyProductionDetailsF001 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F013
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F013No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Operator): "
				+ details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F014
	public String bagMakingSpecificationDetailsF014Hod(BagMakingSpecificationDetailsF014 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F014
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F014No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Product Name : " + details.getProductName() + "</p>" + "<p>Submitted by (Operator): "
				+ details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F015
	public String padPunchingHouseKeepingCheckListF010HR(PadPunchingHouseKeepingCheckListF010 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F015
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F015No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String padPunchingHouseKeepingCheckListF010Hod(PadPunchingHouseKeepingCheckListF010 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsPadPunching.F015
				+ "</p>" + "<p>Format No : " + AppConstantsPadPunching.F015No + "</p>" + "<p>Date : " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (HR): " + details.getHr_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
}
