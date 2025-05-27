package com.focusr.Precot.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonF08;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookCakePressF09;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookF33;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02A;
import com.focusr.Precot.mssql.database.model.bleaching.BleachJobCardF13;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMachineCleaningRecordF16;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationListF41;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationOfMechineAndSurfaceF01;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMixingChangeMachineCleaningF38Repository;

@Component
public class EmailHtmlLoader {

	Logger logger = LoggerFactory.getLogger(EmailHtmlLoader.class);
	
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	
	

	@Autowired
	private TemplateEngine templateEngine;

	public String getText(String templateName, String forgetPasswordContent) {

		Context context = new Context();

		String body = new String();

		if ("email/forgetpassword_template".equals(templateName)) {

			body = loadForgetPasswordText(context, templateName, forgetPasswordContent);

//			logger.info("***************** Email Template body *********************\n" + body);

		}

		return body;
	}

	private String loadForgetPasswordText(Context context, String templateName, String forgetPasswordContent) {

//		logger.info("***************** Email ForgetPassword Link *********************\n" + forgetPasswordContent);

		context.setVariable("password_link", forgetPasswordContent);
		String body = templateEngine.process(templateName, context);

		return body;

	}

	public String sendSignInCredentials(User user, String password) {

		String body = "<html>" + "<head>" + "<style>" + ".container {" + "    max-width: 600px;" + "    margin: 0 auto;"
				+ "    font-family: Arial, sans-serif;" + "    padding: 20px;" + "    background-color: #F5F5F5;" + "}"
				+ ".logo {" + "    text-align: center;" + "    margin-bottom: 20px;" + "}" + ".content {"
				+ "    font-size: 16px;" + "    color: #333333;" + "}" + ".highlight {"
				+ "    background-color: #FFFF00;" + "    font-weight: bold;" + "}" + ".cta-button {"
				+ "    display: inline-block;" + "    margin-top: 20px;" + "    padding: 10px 20px;"
				+ "    background-color: #007BFF;" + "    color: #FFFFFF;" + "    text-decoration: none;"
				+ "    border-radius: 4px;" + "}" + "</style>" + "</head>" + "<body>" + "<div class='container'>"
				+ "<div class='logo'>"
//	            + "<img src='https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico'>"
				+ "</div>" + "<div class='content'>" + "<h2>Welcome to Precot</h2>" + "<p>Dear <strong>"
				+ user.getUsername() + "</strong>,</p>"
				+ "<p>Thank you for joining Precot. Here are your login credentials:</p>" + "<ul>"
				+ "<li><strong>Username:</strong> " + user.getUsername() + "</li>" + "<li><strong>Password:</strong> "
				+ password + "</li>" + "</ul>" + "<p>Please click the button below to login:</p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a>"
				+ "<p>Thank you and enjoy your experience with Precot!</p>" + "<p>Sincerely,</p>"
				+ "<p>The Precot Team</p>" + "</div>" + "</div>" + "</body>" + "</html>";

		return body;
	}

	public String laydownForm(BleachLayDownCheckListF42 details) {
//		 String baseUrl = "https://secure.focusrtech.com:5050/Precot/api/auth/approveLayDownCheckF42/"+details.getId();

		String body = "<html>" + "<head>" + "<style>" + ".container {" + "    max-width: 600px;" + "    margin: 0 auto;"
				+ "    font-family: Arial, sans-serif;" + "    padding: 20px;" + "    background-color: #F5F5F5;" + "}"
				+ ".logo {" + "    text-align: center;" + "    margin-bottom: 20px;" + "}" + ".content {"
				+ "    font-size: 16px;" + "    color: #333333;" + "}" + ".highlight {"
				+ "    background-color: #FFFF00;" + "    font-weight: bold;" + "}" + ".cta-button {"
				+ "    display: inline-block;" + "    margin-top: 20px;" + "    padding: 10px 20px;"
				+ "    background-color: #007BFF;" + "    color: #FFFFFF;" + "    text-decoration: none;"
				+ "    border-radius: 4px;" + "}" + "table, th, td {" + "    border: 1px solid black;"
				+ "    border-collapse: collapse;" + "    font-family: 'Times New Roman', Times, serif;"
				+ "    font-size: 2rem;" + "}" + ".laydownchecklist {" + "    width: 100%;" + "    table-layout: fixed;"
				+ "    border: 1px solid black;" + "    border-collapse: collapse;" + "    margin-top: 5px;" + "}"
				+ ".loader-overlay {" + "    position: fixed;" + "    top: 0;" + "    left: 0;" + "    width: 100%;"
				+ "    height: 100%;" + "    background: rgba(255, 255, 255, 0.8);" + "    display: flex;"
				+ "    justify-content: center;" + "    align-items: center;" + "    z-index: 9999;" + "}" + ".loader {"
				+ "    border: 16px solid #f3f3f3;" + "    border-top: 16px solid #3498db;" + "    border-radius: 50%;"
				+ "    width: 40px;" + "    height: 40px;" + "    animation: spin 2s linear infinite;" + "}"
				+ "@keyframes spin {" + "    0% { transform: rotate(0deg); }"
				+ "    100% { transform: rotate(360deg); }" + "}" + ".adminname {" + "    text-align: center;"
				+ "    background-color: transparent;" + "}" + ".laydownchecklist select.custom-select {"
				+ "    width: 33%;" + "    padding: 5px;" + "    border: 1px solid #ddd;" + "    border-radius: 3px;"
				+ "}" + ".laydownchecklist th, .laydownchecklist td {" + "    border: 1px solid black;"
				+ "    font-size: 14px !important;" + "    padding: 0px;" + "    text-align: left;"
				+ "    white-space: pre-wrap;" + "    word-break: break-word;" + "    padding: 4px;" + "}"
				+ ".ant-select-selector {" + "    border: 1px solid #ddd !important;" + "}"
				+ ".laydownchecklist2 button.ant-btn.css-dev-only-do-not-override-3rel02.ant-btn-default {"
				+ "    margin: 1px !important;" + "}" + "</style>" + "</head>" + "<body>"
				+ "<div id='section-to-print'>" + "<div>" + "<table class='laydownchecklist' style='font-size: 12px;'>"
				+ "<tbody>" + "<tr>" + "<td colSpan='4' rowSpan='4' style='text-align: center;'>UNIT H</td>"
				+ "<td colSpan='10' rowSpan='4' style='text-align: center;'>LAY DOWN CHECKLIST</td>"
				+ "<td colSpan='3'>Format No:</td>" + "<td colSpan='3'>PRD01/F-42</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='3'>Revision No:</td>" + "<td colSpan='3'>02</td>" + "</tr>"
				+ "<td colSpan='3'>Ref. SOP No:</td>" + "<td colSpan='3'>PRD01-D-01</td>" + "<tr>"
				+ "<td colSpan='3'>Page NO:</td>" + "<td colSpan='3'>1 of 1</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='5'>Lay down No: </td>" + "<td colSpan='15'>"
				+ (details != null ? details.getLayDownNo() : "") + "</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='5'>Lay down Start date & Time:</td>" + "<td colSpan='5'>"
				+ (details != null ? details.getLayDownStartdate() : "") + " "
				+ (details != null ? details.getLayDownStartTime() : "") + "</td>"
				+ "<td colSpan='5'>Lay down End date & Time:</td>" + "<td colSpan='5'>"
				+ (details != null ? details.getLayDownEnddate() : "") + " "
				+ (details != null ? details.getLayDownEndTime() : "") + "</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='2' style='text-align: center;'>SNO</td>" + "<td colSpan='9'>Particular's</td>"
				+ "<td colSpan='9' style='text-align: center;'>Status</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='2' style='text-align: center;'>1</td>"
				+ "<td colSpan='9'>Checking bale conditions(appearance of packing)</td>"
				+ "<td colSpan='9' style='text-align: center;'>"
				+ (details != null ? details.getCheckBaleCondition() : "") + "</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='2' style='text-align: center;'>2</td>"
				+ "<td colSpan='9'>Check forklift cleanliness</td>" + "<td colSpan='9' style='text-align: center;'>"
				+ (details != null ? details.getCheckForkliftClean() : "") + "</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='2' style='text-align: center;'>3</td>"
				+ "<td colSpan='9'>Checking the cleanliness of lay down place</td>"
				+ "<td colSpan='9' style='text-align: center;'>"
				+ (details != null ? details.getCheckCleanLayDown() : "") + "</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='2' style='text-align: center;'>4</td>"
				+ "<td colSpan='9'>Type of straps used for supplied bales</td>"
				+ "<td colSpan='9' style='text-align: center;'>" + (details != null ? details.getSuppliedBales() : "")
				+ "</td>" + "</tr>" + "<tr>" + "<td colSpan='2' style='text-align: center;'>5</td>"
				+ "<td colSpan='9'>Type tools used for cutting the straps</td>"
				+ "<td colSpan='9' style='text-align: center;'>"
				+ (details != null ? details.getToolsForCuttingStraps() : "") + "</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='2' style='text-align: center;'>6</td>"
				+ "<td colSpan='9'>Type of Packing Material used for cover</td>"
				+ "<td colSpan='9' style='text-align: center;'>" + (details != null ? details.getPackingMaterial() : "")
				+ "</td>" + "</tr>" + "<tr>" + "<td colSpan='2' style='text-align: center;'>7</td>"
				+ "<td colSpan='9'>What type of bags are used to handle waste during the lay down process?</td>"
				+ "<td colSpan='9' style='text-align: center;'>" + (details != null ? details.getTypeOfBags() : "")
				+ "</td>" + "</tr>" + "<tr>" + "<td colSpan='2' style='text-align: center;'>8</td>"
				+ "<td colSpan='9'>After the laydown is completed - Contamination inspection done or not?</td>"
				+ "<td colSpan='9' style='text-align: center;'>"
				+ (details != null ? details.getContaminationInspection() : "") + "</td>" + "</tr>" + "<tr>"
				+ "<td colSpan='2' style='text-align: center;'>9</td>"
				+ "<td colSpan='9'>Are samples of Contamination kept lay down wise for future reference?</td>"
				+ "<td colSpan='9' style='text-align: center;'>" + (details != null ? details.getLayDownWise() : "")
				+ "</td>" + "</tr>" + "<tr>" + "<td colSpan='2' style='text-align: center;'>10</td>"
				+ "<td colSpan='9'>Do the reference samples contain the following information like date, shift, BMR number?</td>"
				+ "<td colSpan='9' style='text-align: center;'>" + (details != null ? details.getReferenceSample() : "")
				+ "</td>" + "</tr>" + "<tr>" + "<td colSpan='20'>Remarks</td>" + "</tr>" + "<tr>" + "<td colSpan='20'>"
				+ (details != null ? details.getRemarks() : "") + "</td>" + "</tr>" + "</tbody>" + "</table>"
				+ "<table style='width: 100%; margin: auto;'>" + "<tbody>" + "<tr>"
				+ "<td colSpan='10' style='height: 35px; text-align: center;'>Performed by Production Supervisor</td>"
				+ "<td colSpan='10' style='text-align: center;'>Reviewed By Head of the Department/Designee</td>"
				+ "</tr>" + "<tr>"
				+ "<td colSpan='10' style='height: 80px; text-align: center; margin-bottom: auto; vertical-align: bottom;'>"
				+ "<div>" + (details != null ? details.getSupervisor_sign() : "") + "</div>"
				+ "<div>Signature & Date</div>" + "</td>"
				+ "<td colSpan='10' style='text-align: center; vertical-align: bottom;'>" + "<div>"
				+ (details != null ? details.getHod_sign() : "") + "</div>"
				+ "<p>Please click the button below to Approve:</p>" + "<a href='" + AppConstants.F42Approve
				+ details.getId() + "' class='cta-button'>Login to Precot</a>"
				+ "<p>Thank you and enjoy your experience with Precot!</p>" + "<p>Sincerely,</p>"
				+ "<p>The Precot Team</p>" + "</div>" + "</div>" + "</body>" + "</html>";

		return body;

	}

//sample
	// F42
	public String laydownForm1(BleachLayDownCheckListF42 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F42a + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Lay Down No: " + details.getLayDownNo()
				+ "</p>" + "<p>BMR No: " + details.getBmrNo() + "</p>" + "<p>Supervisor: "
				+ details.getSupervisor_submit_by() + "</p>" 
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F36
	public String shiftLogbook(BleachShiftLogBookF36 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " +AppConstants.F36 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Shift : " + details.getShift() + "</p>" + "<p>BMR No: " + details.getBmrNumber() + "</p>"
				+ "<p>No.of Bales: " + details.getNoOfBales() + "</p>" + "<p>Weight in Kg: " + details.getWeightInKg()+"  PDE"
				+ "</p>" + "<p>Submitted by (Supervisor):" + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F01
	public String sanitizationOfMechineAndSurfaces(BleachSanitizationOfMechineAndSurfaceF01 details) {
		
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name : " + AppConstants.F01 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date : <b>" + details.getWeekAndDate()
				+ "</b></p>" + "<p>Week No : <b>" + details.getWeek() + "</b></p>" + "<p>Month : " + details.getMonth()
				+ "</p>" + "<p>Year: <b>" + details.getYear() + "</b></p>" + "<p>Submitted by (Supervisor): <b>"
				+ details.getSupervisor_submit_by() + "</b></p>" 
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F09
	public String bleachEquipmentUsageLogBookCakePressF09(BleachEquipmentUsageLogBookCakePressF09 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F09 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>BMR No: " + details.getBmrNumber() + "</p>"
				+ "<p>Sub batch no : " + details.getSubbatch_no() + "</p>" + "<p>Mixing : " + details.getMixing()
				+ "</p>" + "<p>M/C No: " + details.getMc_no() + "</p>" + "<p>Supervisor: "
				+ details.getSupervisor_submit_by() + "</p>" 
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F34
	public String bleachEquipmentUsageLogBookCakePressF34(BleachEquipmentUsageLogbookBlowroomAndCardingF34 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F34+ "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>BMR No: " + details.getBmrNumber() + "</p>"
				+ "<p>Mixing : " + details.getMixing() + "</p>" + "<p>No.Of.Bales : " + details.getNo_of_bales()
				+ "</p>" + "<p>Total Weight : " + details.getTotal_weight() + "</p>" + "<p>Working Area : "
				+ details.getWorking_area() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() + "</p>" 
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F41
	public String handSanitizationF41(BleachHandSanitizationABPressF41 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F41a + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" 
				+"<p>Date : " + details.getDate() + "</p>"
			    +"<p>Shift : " + details.getShift() + "</p>"
				+ "<p>Submitted by (Supervisor) : " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>To Approve The Form : " + "<a href='" + AppConstants.F41Approve + details.getHandSanitizationId()
				+ "'>Click Here</a></p>" + "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F33
	public String laydownFormF33(List<BleachEquipmentUsageLogBookF33> detailList) {

		String date = detailList.get(0).getDate();
		Long id = detailList.get(0).getId();
		String format_name = AppConstants.F33a;
		String format_no = detailList.get(0).getFormatNo();
		String sup_sub_by = detailList.get(0).getSupervisor_submit_by();

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: <b>" + format_name + "</b></p>"
				+ "<p>Format No: <b>" + format_no + "</b></p>" + "<p>Date: <b>" + date + "</b></p>"
				+ "<p>Supervisor: <b>" + sup_sub_by + "</b></p>" + "<p>To Approve The Form : " + "<a href='"
				+ AppConstants.F33Approve + id + "'>Click Here</a></p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F04
	public String appliedRawCottonF04(BleachAppliedContRawCottonF04 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F04a + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>BMR No : " + details.getBmrNumber() + "</p>" + "<p>Submitted by (Supervisor):"
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F08
	public String appliedContaminationAbF08(BleachAppliedContAbCottonF08 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F08 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>BMR No : " + details.getBmrNumber() + "</p>" + "<p>Submitted by (Supervisor):"
				+ details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F38
	public String mixingchangeoverAndMechineDetailsF38(BleachMixingChangeMachineCleaningF38 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F38 + "</p>"
				+ "<p>Format No: " + details.getFormat_no() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Mixing Changeover From  : " + details.getMix_changeover_from() + "</p>"
				+ "<p>Mixing Changeover To  : " + details.getMix_changeover_to() + "</p>" + "<p>BMR From : "
				+ details.getBmr_no_from() + "</p>" + "<p>BMR To : " + details.getBmr_no_to() + "</p>"
				+ "<p>Submitted by (Supervisor):" + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F02 --Hr
	public String houseKeeping02Hr(BleachHouseKeepingCheckListF02 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " +AppConstants.F02 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor):" + details.getSupervisor_submit_by() + "</p>" + "<p>To Approve The Form : "
				+ "<a href='" + AppConstants.F02HrApprove + details.getClean_id() + "'>Click Here</a></p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F02--Hod
	public String houseKeeping02Hod(BleachHouseKeepingCheckListF02 details) {

		String body = "<html><body>"

				+ "<p>Dear,</p>" + "<p>Greetings for the day,</p>" + "<p><b>Kindly Find the Form Details:</b></p>"
				+ "<p>Format Name: " +AppConstants.F02 + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Submitted by (HR):"
				+ details.getHr_submit_by() + "</p>" + "<p>To Approve The Form : " + "<a href='"
				+ AppConstants.F02HodApprove + details.getClean_id() + "'>Click Here</a></p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F13 --Hod
	public String bleachJobCardHod(BleachJobCardF13 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F13a + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>BMR No : " + details.getBmr_no() + "</p>" + "<p>Sub batch No : " + details.getSub_batch_no()
				+ "</p>"

				+ "<p>Submitted by (Supervisor):" + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F13--QA
	public String bleachJobCardQA(BleachJobCardF13 details, Long qaId) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F13a + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>BMR No : " + details.getBmr_no() + "</p>" + "<p>Sub batch No : " + details.getSub_batch_no()
				+ "</p>" + "<p>Submitted by (HOD):" + details.getHod_submit_by() + "</p>" + "<p>To Approve The Form : "
				+ "<a href='" + AppConstants.F13qaApprove + details.getHeader_id()+ "/" + qaId + "'>Click Here</a></p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F02A--HR
	public String houseKeepingHrF02A(BleachHouseKeepingCheckListF02A details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F02A + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Submitted by (Supervisor):" + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F02A -- HOD
	public String houseKeepingHodF02A(BleachHouseKeepingCheckListF02A details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F02A + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + details.getDate() + "</p>"
				+ "<p>Submitted by (HR):" + details.getHr_submit_by() + "</p>" 
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F18
	public String bleachContAbsCottonF18(BleachContAbsBleachedCottonF18 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F18 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "<p>Date: " + details.getDate() + "<p>BMR No: "
				+ details.getBmrNo() + "</p>" + "<p>Bale No : " + details.getBaleNo() + "</p>" + "<p>Total Quantity : "
				+ details.getQuantity() + "</p>" + "<p>Batch No : " + details.getBatchNo() + "</p>"
				+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
				+ "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

	// F05
	public String bleachContRawCottonF05(BleachContRawCottonF05 details) {

		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F05 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "<p>Date: " + details.getDate() + "<p>PH No: "
				+ details.getPhNo() + "</p>" + "<p>Supplier Name : " + details.getSupplierName() + "</p>" + "</p>"
				+ "<p>Total Quantity : " + details.getQuantity() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() 
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}

//		// F11
//		public String equipmentLogbookF11(EquipLogBookHydroExtractorF11 details) {
//			StringBuilder body = new StringBuilder();
//			body.append("<html><body>");
//			body.append("<p>Dear,</p>");
//			body.append("<p>Greetings for the day,</p>");
//			body.append("<p><b>Kindly Find the Form Details:</b></p>");
//			body.append("<p>Format Name: ").append(details.getFormatName()).append("</p>");
//			body.append("<p>Format No: ").append(details.getFormatNo()).append("</p>");
//			;
//
//			body.append("<p><b>Equipment Log Details:</b></p>");
//			body.append("<ul>");
//			for (EquipmentLogsF11 log : details.getEquipmentLogDetails()) {
//				body.append("<li>");
//				body.append("<p>BMR No: ").append(log.getBmrNo()).append("</p>");
//				body.append("<p>Mixing: ").append(log.getMixing()).append("</p>");
//				body.append("<p>Sub Batch No: ").append(log.getSubBatchNo()).append("</p>");
//				body.append("<p>MC No: ").append(log.getMcNo()).append("</p>");
//				body.append("<p>Timer Setting: ").append(log.getTimerSetting()).append("</p>");
//				body.append("<p>Remarks: ").append(log.getRemarks()).append("</p>");
//				body.append("</li>");
//			}
//			body.append("</ul>");
//
//			body.append("<p>To Approve The Form: <a href='").append(AppConstants.F11Approve).append(details.getId())
//					.append("'>Click Here</a></p>");
//			body.append("<p>For Further Details Click below link to Login to the Application:</p>");
//			body.append("<a href='").append(AppConstants.projectURL).append("' class='cta-button'>Login to Precot</a>");
//			body.append("<p>Regards,</p>");
//			body.append("<p>Team-Precot</p>");
//			body.append("</body></html>");
//
//			return body.toString();
//		}

	// F11
	public String equipmentLogbookF11(EquipLogBookHydroExtractorF11 details) {
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F11 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "<p>BMR Number : " + details.getBmrNo() + "<p>Mixing : "
				+ details.getMixing() + "</p>" + "<p>M/C Number : " + details.getMcNo() + "</p>"
				+ "<p>Sub Batch Number : " + details.getSubBatchNo() + "</p>" + "<p>Timer setting in Analog Gauge : "
				+ details.getTimerSetting() + "</p>" + "<p>Submitted by (Supervisor): "
				+ details.getSupervisor_submit_by() 
				+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
				+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
				+ "<p>Team-Precot</p>" + "</body></html>";
		return body;
	}

	// F03
	public String metalDetectorCheckListF03(MetalDetectorCheckListF03 details) {

		LocalDate date = LocalDate.parse(details.getDate(), formatter);
		
		String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
				+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F03 + "</p>"
				+ "<p>Format No: " + details.getFormatNo() + "</p>" + "<p>Date: " + date + "</p>"
				+ "<p>Section : " + details.getSection() + "</p>" + "<p>Equipment name : " + details.getEquipmentName()
				+ "</p>" + "<p>Cleaning of Equipment : </p>"
				+ "<p> Machine Cleaning & Removing Ejected (metal contaminated) materials: "
				+ details.getMetalContaminatedMaterials() + "</p>" + "<p>No of Metal Contamination Found : "
				+ details.getNoOfMetalContaminants() + "</p>" + "<p>Cleaned by : : " + details.getCleanedBy()
				+ "</p>" + "<p>Calibration Check Of Equipment: </p>"
				+ "<p>Functioning of Metal Detector / Calibration Check (both detection & ejection) : "
				+ details.getFunctionCheck()
				+ "'>Click Here</a></p>" + "<p>For Further Details Click below link to Login to the Application </p>"
				+ "<a href='" + AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>"
				+ "<p>Regards,</p>" + "<p>Team-Precot</p>" + "</body></html>";
		return body;

	}
	
	// F016 Hod
			public String machineCleaningRecordF16Hod(BleachMachineCleaningRecordF16 details) {
				String body = "<html><body>" + "<p>Dear,</p>" + "<p>Greetings for the day,</p>"
						+ "<p><b>Kindly Find the Form Details:</b></p>" + "<p>Format Name: " + AppConstants.F16
						+ "</p>" + "<p>Format No: " + details.getFormatNo() + "<p>Date : " + details.getDate() + "</p>" + "</p>"
						+ "<p>Submitted by (Supervisor): " + details.getSupervisor_submit_by() + "</p>"
						+ "<p>For Further Details Click below link to Login to the Application </p>" + "<a href='"
						+ AppConstants.projectURL + "' class='cta-button'>Login to Precot</a></p>" + "<p>Regards,</p>"
						+ "<p>Team-Precot</p>" + "</body></html>";
				return body;
			}
}