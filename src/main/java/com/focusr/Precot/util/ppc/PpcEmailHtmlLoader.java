package com.focusr.Precot.util.ppc;

import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingF003;
import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummaryF002;
import com.focusr.Precot.mssql.database.model.Store.EyeWashConditionChecklistF009;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.Store.AppConstantStore;


@Component
public class PpcEmailHtmlLoader {

	public String MonthlyplanSummaryF002Hod(MonthlyplanSummaryF002 monthlyPlan) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantPpc.F003
				+ "</p>" + "<p>Format No : " + AppConstantPpc.F003No + "<p>Date : " + monthlyPlan.getDate()  
				   + "</p>"
				+ "<p>Submitted by (PPC_ASSISTANT ): " + monthlyPlan.getAssistant_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
//	public String ContractReviewMeetingF003Hod(ContractReviewMeetingF003 monthlyPlan) {
//		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
//				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantPpc.F003
//				+ "</p>" + "<p>Format No : " + AppConstantPpc.F003No + "<p>Date : " + monthlyPlan.getDate()  
//				   + "</p>"
//				+ "<p>Submitted by (PPC_ASSISTANT ): " + monthlyPlan.getAssistantSubmitBy() + "</p>"
//				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
//				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
//				+ "<p>Team-Precot</p>" + "</body></html>";
//		return body;
//	}
	
	public String ContractReviewMeetingF003Hod(ContractReviewMeetingF003 monthlyPlan) {
	    String body = "<html>" +
	            "<body style='font-family: Arial, sans-serif; line-height: 1.6;'>" +
	            "    <p>Dear Team,</p>" +
	            "    <p>Please find the contract review meeting Excel sheet.</p>" +
	            "    <p><strong>Date:</strong> " + monthlyPlan.getDate() + "</p>" +
	            "    <p>Thanks & Regards,</p>" +
	            "    <p>S. Rubeshkumar</p>" +
	            "    <p>Precot Ltd.<br>" +
	            "       (O) +91 422 4321100 Ex-144<br>" +
	            "       (M) +91 75300 00718<br>" +
	            "       <a href='http://www.precot.com' target='_blank'>www.precot.com</a>" +
	            "    </p>" +
	            "</body>" +
	            "</html>";
	    return body;
	}


	

}
