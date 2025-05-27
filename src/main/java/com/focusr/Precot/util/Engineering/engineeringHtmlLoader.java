package com.focusr.Precot.util.Engineering;

import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;
import com.focusr.Precot.mssql.database.model.engineering.WorkOrderRequestFormF020;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.Store.AppConstantStore;


@Component
public class engineeringHtmlLoader {

	
	public String WeightScalesCalibrationF03Hod(WeightScalesCalibrationF016 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantEngineering.F003
				+ "</p>" + "<p>Format No : " + AppConstantEngineering.F016No + "<p>Date : " + details.getDate() + "<p>DEPARTMENT : " 
				+ details.getDepartment()  +"<p> MACHINE_ID : " + details.getMachineIdNo() + "</p>"
				+ "<p>Submitted by (SUPERVISOR): " + details.getEngineeringSupervisorSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	public String breakdownSlipRoleNotification(BreakdownIntimationSlipF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantEngineering.F003
				+ "</p>" + "<p>Format No : " + AppConstantEngineering.F003No + "<p>Date : " + details.getDate() + "<p>DEPARTMENT : " 
				+ details.getIssuerDepartment()  +"<p> BSI_NO : " + details.getBisNo() + "</p>"
				+ "<p>Submitted by (SUPERVISOR): " + details.getSupervisorStatus() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	public String rootCauseAnalysisF004F03Hod(RootCauseAnalysisF004 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantEngineering.F004
				+ "</p>" + "<p>Format No : " + AppConstantEngineering.F004No + "<p>Date : " + details.getDate() + "<p>DEPARTMENT : " 
				+ details.getDepartment()  +"<p> RCA No. : " + details.getRcaNo() + "</p>"
				+ "<p>Submitted by (SUPERVISOR): " + details.getSupervisorSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	public String Workdoneemail(WorkOrderRequestFormF020 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantEngineering.F004
				+ "</p>" + "<p>Format No : " + AppConstantEngineering.F020No + "<p>Date : " + details.getDateOfRequest() + "<p>DEPARTMENT : " 
				+ details.getDepartment()  +"<p> WOR No. : " + details.getWorNo() + "</p>"
				+ "<p>Submitted by (HOD): " + details.getRequesterSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	public String WorkdoneAppoveemail(WorkOrderRequestFormF020 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantEngineering.F004
				+ "</p>" + "<p>Format No : " + AppConstantEngineering.F020No + "<p>Date : " + details.getDateOfRequest() + "<p>DEPARTMENT : " 
				+ details.getDepartment()  +"<p> WOR No. : " + details.getWorNo() + "</p>"
				+ "<p>Accepted Your Request " +  "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String WorkdoneCompletedEmail(WorkOrderRequestFormF020 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantEngineering.F004
				+ "</p>" + "<p>Format No : " + AppConstantEngineering.F020No + "<p>Date : " + details.getDateOfRequest() + "<p>DEPARTMENT : " 
				+ details.getDepartment()  +"<p> WOR No. : " + details.getWorNo() + "</p>"
				+ "<p>Completed Your Request " +  "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
}
