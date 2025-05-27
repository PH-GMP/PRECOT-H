package com.focusr.Precot.util.productDevelopment;

import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;
import com.focusr.Precot.util.AppConstants;


@Component
public class productDevelopementEmailHtmlLoader {

	
	
	public String productionDevelopment(ProductDevelopmentSheetF001 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " +AppConstantsproductdevelopment.F001 + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getRevisionDate() + "</p>"
				+ "</p>" + "<p>PDS No: " + details.getPdsNo() + "</p>"
				+ "</p>" + "<p>Submitted by (Supervisor):" + details.getDevelopmentSupervisorSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}
	
	public String productionDevelopmentQA(ProductDevelopmentSheetF001 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " +AppConstantsproductdevelopment.F001 + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getRevisionDate() + "</p>"
				+ "</p>" + "<p>PDS No: " + details.getPdsNo() + "</p>"
				+ "</p>" + "<p>APPROVED  by (QC MANAGER):" + details.getDevelopmentSupervisorSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}
	
	

}
