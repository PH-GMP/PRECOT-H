package com.focusr.Precot.util.Engineering;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.RootCauseAnalysisF004;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationF016;
import com.focusr.Precot.mssql.database.model.engineering.WorkOrderRequestFormF020;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.engineering.WorkOrderRequestFormRepoF020;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;



@Service
public class EngineeringMailfunction {
	
	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	 engineeringHtmlLoader emailhtmlloader;
	
	@Autowired
	private WorkOrderRequestFormRepoF020 WorkOrderRequestRepo;
	
	
	

	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(EngineeringMailfunction.class);
	
	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}
	
	
	public void sendEmailToHod(WeightScalesCalibrationF016 weightScalesF016, HttpServletRequest http) {
	    try {
	        // Step 1: Get user ID from the HTTP request
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);

	        // Step 2: Retrieve department ID associated with this user
	        String departmentId = userrepository.getDepartmentById(userId);
	        
	        if (departmentId == null) {
	            throw new AppException("Department ID not found for user ID: " + userId);
	        }

	        // Step 3: Get HOD details for the department
	        BleachHodHrQaDetails hodDetails = userrepository.getHodByDepartment(departmentId);
	        if (hodDetails == null || hodDetails.getemail() == null) {
	            throw new AppException("HOD details not found for department ID: " + departmentId);
	        }

	        // Prepare email content
	        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	        String mailId = hodDetails.getemail();
	        String subject = AppConstantEngineering.subF003;
	        String text = emailhtmlloader.WeightScalesCalibrationF03Hod(weightScalesF016);
	        
	        // Send email
	    	send_mail(mailId, emailSubject, text, subject);
	    } catch (Exception e) {
	        log.error("Unable to send email to HOD", e);
	        throw new AppException("Unable to send email to HOD");
	    }
	}

	
	public void sendEmailToRole(BreakdownIntimationSlipF003 breakdownSlip, String role, HttpServletRequest http) {
	    try {
	        // Step 1: Get user ID from the HTTP request
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);

	        // Step 2: Retrieve department ID associated with this user
	        String departmentId = userrepository.getDepartmentById(userId);
	        if (departmentId == null) {
	            throw new AppException("Department ID not found for user ID: " + userId);
	        }

	        // Step 3: Retrieve role-specific contact details
	        BleachHodHrQaDetails roleDetails = userrepository.getContactByRoleAndDepartment(role, departmentId);
	        if (roleDetails == null || roleDetails.getemail() == null) {
	            throw new AppException("Role contact details not found for department ID: " + departmentId + " and role: " + role);
	        }

	        // Step 4: Prepare email content
	        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	        String mailId = roleDetails.getemail();
	        String subject = AppConstantEngineering.subF003;
	        String text = emailhtmlloader.breakdownSlipRoleNotification(breakdownSlip);

	        // Step 5: Send email
	        send_mail(mailId, emailSubject, text, subject);

	    } catch (Exception e) {
	        log.error("Unable to send email to role: " + role, e);
	        throw new AppException("Unable to send email to role: " + role);
	    }
	}

	
	
	public void sendEmailToHod(RootCauseAnalysisF004 rootCauseAnalysisF004, HttpServletRequest http) {
	    try {
	        // Step 1: Get user ID from the HTTP request
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);

	        // Step 2: Retrieve department ID associated with this user
	        String departmentId = userrepository.getDepartmentById(userId);
	        
	        if (departmentId == null) {
	            throw new AppException("Department ID not found for user ID: " + userId);
	        }

	        // Step 3: Get HOD details for the department
	        BleachHodHrQaDetails hodDetails = userrepository.getHodByDepartment(departmentId);
	        if (hodDetails == null || hodDetails.getemail() == null) {
	            throw new AppException("HOD details not found for department ID: " + departmentId);
	        }

	        // Prepare email content
	        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	        String mailId = hodDetails.getemail();
	        String subject = AppConstantEngineering.subF004;
	        String text = emailhtmlloader.rootCauseAnalysisF004F03Hod(rootCauseAnalysisF004);
	        
	        // Send email
	    	send_mail(mailId, emailSubject, text, subject);
	    } catch (Exception e) {
	        log.error("Unable to send email to HOD", e);
	        throw new AppException("Unable to send email to HOD");
	    }
	}
	
	
	public void sendEmailToRole(WorkOrderRequestFormF020 breakdownSlip, String role, HttpServletRequest http) {
	    try {
	        // Step 1: Get user ID from the HTTP request
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);

	        // Step 2: Retrieve department ID associated with this user
	        String departmentId = userrepository.getDepartmentById(userId);
	        if (departmentId == null) {
	            throw new AppException("Department ID not found for user ID: " + userId);
	        }

	        // Step 3: Retrieve role-specific contact details
	        BleachHodHrQaDetails roleDetails = userrepository.getContactByRoleAndDepartment(role, departmentId);
	        if (roleDetails == null || roleDetails.getemail() == null) {
	            throw new AppException("Role contact details not found for department ID: " + departmentId + " and role: " + role);
	        }

	        // Step 4: Prepare email content
	        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	        String mailId = roleDetails.getemail();
	        String subject = AppConstantEngineering.subF020;
	        String text = emailhtmlloader.Workdoneemail(breakdownSlip);

	        // Step 5: Send email
	        send_mail(mailId, emailSubject, text, subject);

	    } catch (Exception e) {
	        log.error("Unable to send email to role: " + role, e);
	        throw new AppException("Unable to send email to role: " + role);
	    }
	}
	
	
	
	public void sendEmailToSubmitter(WorkOrderRequestFormF020 details, String submitterEmail) {
	    try {
	        // Get email subject instance
	        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

	        // Define the email subject
	        String subject = AppConstantEngineering.subF020; // Email subject

	        // Create the email body using the HTML loader
	        String text = emailhtmlloader.WorkdoneAppoveemail(details);

	        // Send the email to the submitter
	        send_mail(submitterEmail, emailSubject, text, subject);
	    } catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException 
	            | NoSuchPaddingException | InvalidKeySpecException e) {
	        log.error("Unable to get Email details", e);
	        throw new AppException("Unable to get Email details");
	    }
	}
	
	public void sendEmailToAppoved(WorkOrderRequestFormF020 details, String submitterEmail) {
	    try {
	        // Get email subject instance
	        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

	        // Define the email subject
	        String subject = AppConstantEngineering.subF020; // Email subject

	        // Create the email body using the HTML loader
	        String text = emailhtmlloader.WorkdoneCompletedEmail(details);

	        // Send the email to the submitter
	        send_mail(submitterEmail, emailSubject, text, subject);
	    } catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException 
	            | NoSuchPaddingException | InvalidKeySpecException e) {
	        log.error("Unable to get Email details", e);
	        throw new AppException("Unable to get Email details");
	    }
	}

	
	// ******************************************SEND MAIL *****************************************************************************************************************//

	public void send_mail(String mailId, EmailSubject emailSubject, String text1, String subject) {

	String emailFrom = new String();
	List<String> emailTo = new ArrayList<String>();
	List<String> emailCC = new ArrayList<String>();
	// String subject = "";

	// EmailSubject emailSubject = null;
	String text = text1;

	emailTo.add(mailId);
	// emailTo.add(new_manager_mail);
	String fromEmail = emailSubject.getUsername();

	emailFrom = fromEmail;

	emailSubject.init(emailFrom, emailTo, emailCC, null, subject, text);
	emailSubject.setHTML(true);

	SendMail sm = new SendMail();

	sm.sendMail(emailSubject);

	}




	
	





}




	
	
	
