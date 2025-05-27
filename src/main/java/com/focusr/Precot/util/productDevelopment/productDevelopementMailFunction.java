package com.focusr.Precot.util.productDevelopment;

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
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;

@Service
public class productDevelopementMailFunction {
	
	
	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	
	@Autowired
	private productDevelopementEmailHtmlLoader emailhtmlloader;

	
	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(productDevelopementMailFunction.class);
	
	public void sendEmailQC01(ProductDevelopmentSheetF001 Product) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getQCDepartHEAD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsproductdevelopment.F001;
			String text = emailhtmlloader.productionDevelopment(Product);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailQA01(ProductDevelopmentSheetF001 Product) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getQADepartHEAD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsproductdevelopment.F001;
			String text = emailhtmlloader.productionDevelopmentQA(Product);
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
