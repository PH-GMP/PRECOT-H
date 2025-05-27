package com.focusr.Precot.mssql.database.service.Store;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.NoSuchPaddingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.mssql.database.model.Store.EyeWashConditionChecklistF009;
import com.focusr.Precot.mssql.database.model.Store.ForkliftMovementCheckListF008;
import com.focusr.Precot.mssql.database.model.Store.NonReturnableGatePassF006;
import com.focusr.Precot.mssql.database.model.Store.ReceptionCheckListF003;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;
import com.focusr.Precot.util.Store.AppConstantStore;
import com.focusr.Precot.util.Store.StoreEmailHtmlLoader;
import com.focusr.Precot.util.padpunching.AppConstantsPadPunching;
import com.focusr.Precot.util.padpunching.PadPunchingEmailHtmlLoader;
import com.focusr.Precot.util.padpunching.PadPunchingMailFunction;


@Service
public class StoreMailFunction {

	
	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	
	@Autowired
	StoreEmailHtmlLoader emailhtmlloader;
	
	
	

	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(StoreMailFunction.class);
	
	
	
	
	
	
	public void sendEmailToStoreIncharge03(ReceptionCheckListF003 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getStoreINcharge();
			String mailId = hodDetails.getemail();
			String subject = AppConstantStore.subF003;
			String text = emailhtmlloader.ReceptionCheckListF03Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailToStoreHod06(NonReturnableGatePassF006 nonReturnableGatePass) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getstorehod();
			String mailId = hodDetails.getemail();
			String subject = AppConstantStore.subF006;
			String text = emailhtmlloader.nonReturnableGatePassHOD06(nonReturnableGatePass);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToHODF08(ForkliftMovementCheckListF008 submitForkliftCheckList) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getStoreINcharge();
			String mailId = hodDetails.getemail();
			String subject = AppConstantStore.subF008;
			String text = emailhtmlloader.ForkliftMovementCheckListHOD08(submitForkliftCheckList);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
		
	}
	
	public void sendEmailToHODF09(EyeWashConditionChecklistF009 submitEyeChecklist) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getStoreINcharge();
			String mailId = hodDetails.getemail();
			String subject = AppConstantStore.subF009;
			String text = emailhtmlloader.EyeWashConditionChecklistF009(submitEyeChecklist);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
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
