package com.focusr.Precot.util.drygoods;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.focusr.Precot.mssql.database.model.drygoods.BaleConsumptionReportDryGoodsF001;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionCottonBallsF003;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionDetailsPleateAndWoolRollF006;
import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsHouseKeepingCheckListF14;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsHandSanitationF06;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsProductChangeOverF09;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;
import com.focusr.Precot.mssql.database.model.drygoods.MiniRoll;
import com.focusr.Precot.mssql.database.model.drygoods.SanitizationDetails;
import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceEmailHtmlLoader;

@Component
public class DryGoodsEmailHtmlLoader {

	Logger logger = LoggerFactory.getLogger(SpunlaceEmailHtmlLoader.class);

	// F001 Hod
	public String baleConsumptionReportF001(BaleConsumptionReportDryGoodsF001 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift: "
				+ details.getShift() + "<p>Laydown No: " + details.getLaydown_no() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getOperator_submitted_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F002 Hod
	public String dailyProductionSliverMakingF002(SliverMakingHeader details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachine_name() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getOperator_submitted_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F003 Supervisor
	public String dailyProductionCottonBallsSupervisorF003(DailyProductionCottonBallsF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachine_name() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getOperator_submitted_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F003 Hod
	public String dailyProductionCottonBallsHodF003(DailyProductionCottonBallsF003 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Machine Name : " + details.getMachine_name() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F004 Hod
	public String productionReportMiniRollF004(MiniRoll details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getOperator_submitted_by()
				+ "</p>" + "<p>Submitted by (Supervisor): " + details.getOperator_submitted_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F005 Supervisor
	public String productionPleatWoolRollSupervisorF005(DailyProductionDetailsPleateAndWoolRollF006 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Product Name : " + details.getProduct_name() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getOperator_submitted_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getOperator_submitted_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F005 Hod

	public String productionPleatWoolRollHodF005(DailyProductionDetailsPleateAndWoolRollF006 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "<p>Product Name : " + details.getProduct_name() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F006 Hod

	public String productionProductChangeOverHodF006(GoodsProductChangeOverF09 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Section : "
				+ details.getSection() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F006 Qa

	public String productionProductChangeOverQaF006(GoodsProductChangeOverF09 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Section : "
				+ details.getSection() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getHod_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getHod_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	
	// F009 

	public String sanitizationOfMachinesAndSurfacesF009(SanitizationDetails details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Week : " + details.getWeek() + "<p>Month : "
				+ details.getMonth() + "<p>Year : " + details.getYear() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getHod_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getHod_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
	
	
	// F008 Superviosr

		public String goodsLogBookSuperviosrF008(LogBookHeader details) {
			String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
					+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
					+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
					+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getSupervisor_submit_by()
					+ "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_id() + "</p>"
					+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
					+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
					+ "<p>Team-Precot</p>" + "</body></html>";
			return body;
		}

	// F008 Hod

	public String goodsLogBookHodF008(LogBookHeader details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getSupervisor_submit_by()
				+ "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F009 Hod
	public String productChangeOverF009Hod(GoodsProductChangeOverF09 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Section : "
				+ details.getSection() + "<p>Machine Name : " + details.getMachineName() + "</p>"
				+ "<p>Submitted by (Operator): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F010 Hod

	public String goodsHandSanitizationReportF010(GoodsHandSanitationF06 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ details.getShift() + "</p>" + "<p>Submitted by (Operator): " + details.getSupervisor_submit_by()
				+ "</p>" + "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F013 Hod
	public String handSanitizationF013Hod(GoodsHandSanitationF06 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>Submitted by (Operator): "
				+ details.getSupervisor_submit_by() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F014 Hod
	public String houseKeepingF014Hod(DryGoodsHouseKeepingCheckListF14 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ "</p>" + "<p>Submitted by (Operator): " + details.getHr_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getHr_submit_id() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

//				F014 HR

	public String houseKeepingF014HR(DryGoodsHouseKeepingCheckListF14 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstantsSplunance.F007
				+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "<p>Shift : "
				+ "</p>" + "<p>Submitted by (Operator): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}
}
