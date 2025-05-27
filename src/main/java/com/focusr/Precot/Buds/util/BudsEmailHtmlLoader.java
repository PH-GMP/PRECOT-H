package com.focusr.Precot.Buds.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverHeader;
import com.focusr.Precot.Buds.model.BudsEquipmentUsuageHeader;
import com.focusr.Precot.Buds.model.BudsLogbookHeader;
import com.focusr.Precot.Buds.model.BudsProductChangeOver;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.padpunching.AppConstantsPadPunching;

@Component
public class BudsEmailHtmlLoader {

	Logger logger = LoggerFactory.getLogger(BudsEmailHtmlLoader.class);
	
	
			// LOGBOOK HEADER - SUPERVISOR
			
	public String logbookHod(BudsLogbookHeader details) {
		String body = "<html><body>" + "<p>Dear,</p>"  + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsBuds.logbook
				+ "</p>" + "<p>Format No : " + AppConstantsBuds.logbookNumber + "<p>Date : " + details.getLogDate()
				+ "<p>Shift : " + details.getLogShift() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
		// PRODUCT CHANGE OVER
	
	public String productChangeOverInspector(BudsProductChangeOver details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsBuds.productChangeOver
				+ "</p>" + "<p>Format No : " + AppConstantsBuds.productChangeNumber + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getSection() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisorSubmittedName() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	public String productChangeOverHod(BudsProductChangeOver details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsBuds.productChangeOver
				+ "</p>" + "<p>Format No : " + AppConstantsBuds.productChangeNumber + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getSection() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisorSubmittedName() + "</p>"
				+ "<p>Approved by (QA Inspector): " + details.getQaName() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
		// EQUIPMENT USUAGE 
	
	public String equipmentUsuageSupervisor(BudsEquipmentUsuageHeader details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsBuds.equipment
				+ "</p>" + "<p>Format No : " + AppConstantsBuds.equipmentNumber + "<p>Date : " + details.getEquipmentDate() + "<p>Shift : "
				+ details.getEquipmentShift()  + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	public String equipmentUsuageHod(BudsEquipmentUsuageHeader details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsBuds.equipment
				+ "</p>" + "<p>Format No : " + AppConstantsBuds.equipmentNumber + "<p>Date : " + details.getEquipmentDate() + "<p>Shift : "
				+ details.getEquipmentShift() +  "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Approved by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
		
		// DALIY PRODUCTION - SLIVER
	
	public String sliverProductionSupervisor(BudsDailyProductionSliverHeader details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsBuds.sliverProduction
				+ "</p>" + "<p>Format No : " + AppConstantsBuds.sliverProductionNumber + "<p>Date : " + details.getMachineDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	public String sliverProductionHod(BudsDailyProductionSliverHeader details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsBuds.sliverProduction
				+ "</p>" + "<p>Format No : " + AppConstantsBuds.sliverProductionNumber + "<p>Date : " + details.getMachineDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Approved by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
}
