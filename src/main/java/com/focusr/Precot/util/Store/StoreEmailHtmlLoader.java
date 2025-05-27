package com.focusr.Precot.util.Store;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.Store.EyeWashConditionChecklistF009;
import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.util.AppConstants;



@Component
public class StoreEmailHtmlLoader {
	
	Logger logger = LoggerFactory.getLogger(StoreEmailHtmlLoader.class);
	
	public String ReceptionCheckListF03Hod(ReceptionCheckListF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantStore.F003
				+ "</p>" + "<p>Format No : " + AppConstantStore.F003No + "<p>Date : " + details.getDate() + "<p>INVOICE_NO : " 
				+ details.getInvoiceNo()  +"<p> Material Description : " + details.getDescription() + "</p>"
				+ "<p>Submitted by (STORE_OPERATOR): " + details.getOperator_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String nonReturnableGatePassHOD06(NonReturnableGatePassF006 nonReturnableGatePass) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantStore.F006
				+ "</p>" + "<p>Format No : " + AppConstantStore.F006No + "<p>Date : " + nonReturnableGatePass.getDate() + "<p>GATE PASS NO : " 
				+ nonReturnableGatePass.getGatePassNo()   + "</p>"
				+ "<p>Submitted by (Store_In_Charge ): " + nonReturnableGatePass.getStoreInchargeSubmitBy() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String ForkliftMovementCheckListHOD08(ForkliftMovementCheckListF008 submitForkliftCheckList) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantStore.F008
				+ "</p>" + "<p>Format No : " + AppConstantStore.F008No + "<p>Date : " + submitForkliftCheckList.getDate()  
				   + "</p>"
				+ "<p>Submitted by (STORE_OPERATOR): " + submitForkliftCheckList.getOperator_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	public String EyeWashConditionChecklistF009(EyeWashConditionChecklistF009 submitEyeChecklist) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantStore.F009
				+ "</p>" + "<p>Format No : " + AppConstantStore.F009No + "<p>Date : " + submitEyeChecklist.getDate()  
				   + "</p>"
				+ "<p>Submitted by (STORE_OPERATOR): " + submitEyeChecklist.getOperator_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	

}
