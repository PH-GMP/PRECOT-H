package com.focusr.Precot.mssql.database.service.ppc;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.crypto.NoSuchPaddingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingExcel;
import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingF003;
import com.focusr.Precot.mssql.database.model.PPC.MonthlyplanSummaryF002;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.ppc.ContractReviewMeetingExcelRepo;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;
import com.focusr.Precot.util.Store.AppConstantStore;
import com.focusr.Precot.util.Store.StoreEmailHtmlLoader;
import com.focusr.Precot.util.ppc.AppConstantPpc;
import com.focusr.Precot.util.ppc.PpcEmailHtmlLoader;

@Service
public class PpcMailFunction {
	
	
	
	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	
	@Autowired
	PpcEmailHtmlLoader emailhtmlloader;
	
	
	@Autowired
	private ContractReviewMeetingExcelRepo contractReviewMeetingExcelRepo;
	
	
	
	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(PpcMailFunction.class);

	public void sendEmailTomonthlyPlan(MonthlyplanSummaryF002 monthlyPlan) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPpchod();
			String mailId = hodDetails.getemail();
			String subject = AppConstantPpc.F003No;
			String text = emailhtmlloader.MonthlyplanSummaryF002Hod(monthlyPlan);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	

//	public void sendEmailContractreViewMeeting(ContractReviewMeetingF003 monthlyPlan) {
//		try {
//			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
//			BleachHodHrQaDetails hodDetails = userrepository.getHodByDepartmentContractReview();
//			String mailId = hodDetails.getemail();
//			String subject = AppConstantPpc.F005No;
//			String text = emailhtmlloader.ContractReviewMeetingF003Hod(monthlyPlan);
//			send_mail(mailId, emailSubject, text, subject);
//		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
//				| InvalidKeySpecException e) {
//			log.error("Unable to get Email details", e);
//			throw new AppException("Unable to get Email details");
//		}
//		
//	}
	
	public void sendEmailContractreViewMeeting(ContractReviewMeetingF003 monthlyPlan) {
	    try {
	        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
	        BleachHodHrQaDetails hodDetails = userrepository.getHodByDepartmentContractReview();
	        String mailId = hodDetails.getemail();
	        String subject = AppConstantPpc.F005No;
	        String text = emailhtmlloader.ContractReviewMeetingF003Hod(monthlyPlan);

	        // Check for the matching attachment based on date
	        Optional<ContractReviewMeetingExcel> optionalAttachmentRecord = contractReviewMeetingExcelRepo
	                .findByDate(monthlyPlan.getDate());
	        File tempFile = null;

	        if (optionalAttachmentRecord.isPresent()) {
	            ContractReviewMeetingExcel attachmentRecord = optionalAttachmentRecord.get();
	            byte[] excelFile = attachmentRecord.getExcelFile();

	            // Create a temporary file
	            tempFile = File.createTempFile("ContractReviewMeeting", ".xlsx");
	            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
	                fos.write(excelFile);
	            }
	        }

	        // Call the method to send mail with attachment
	        send_mail_with_attachment(mailId, emailSubject, text, subject, tempFile);

	        // Clean up the temporary file
	        if (tempFile != null && tempFile.exists()) {
	            tempFile.delete();
	        }
	    } catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
	            | InvalidKeySpecException e) {
	        log.error("Unable to get Email details", e);
	        throw new AppException("Unable to get Email details");
	    } catch (IOException e) {
	        log.error("Error while handling the attachment file", e);
	        throw new AppException("Error while handling the attachment file");
	    }
	}


	
	public void send_mail_with_attachment(String mailId, EmailSubject emailSubject, String text1, String subject, File attachment) {
	    try {
	        String emailFrom = new String();
	        List<String> emailTo = new ArrayList<>();
	        List<String> emailCC = new ArrayList<>();
	        List<File> files = new ArrayList<>();

	        String text = text1;
	        emailTo.add(mailId);

	        String fromEmail = emailSubject.getUsername();
	        emailFrom = fromEmail;

	        // Add attachment if provided
	        if (attachment != null) {
	            files.add(attachment);
	        }

	        // Initialize the email subject with all necessary details
	        emailSubject.init(emailFrom, emailTo, emailCC, files, subject, text);
	        emailSubject.setHTML(true);

	        // Use the SendMail instance to send the email
	        SendMail sm = new SendMail();
	        sm.sendMail(emailSubject);
	    } catch (Exception e) {
	        throw new AppException("Unable to send email with attachment: " + e.getMessage(), e);
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
