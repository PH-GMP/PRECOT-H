package com.focusr.Precot.util.padpunching;

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
import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
import com.focusr.Precot.mssql.database.model.padpunching.DailyRollConsumptionReportF002;
import com.focusr.Precot.mssql.database.model.padpunching.MachineCleaningCheckListF005;
import com.focusr.Precot.mssql.database.model.padpunching.MetalDetectorCheckList007;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF26;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingLogBookBagMakingF003;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingSanitizationOfMachinesAndSurfacesF21;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.ProductionDetailsLogBook01;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;
import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;

@Service
public class PadPunchingMailFunction {

	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	PadPunchingEmailHtmlLoader emailhtmlloader;

	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(PadPunchingMailFunction.class);
	
	// F001
	public void sendEmailToHodF001(ProductionDetailLogBook01 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF001;
			String text = emailhtmlloader.productionDetailLogBookF001Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F002
	public void sendEmailToSupervisorF002(DailyRollConsumptionReportF002 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getPadPunchingDepartSupervisors();
			String subject = AppConstantsPadPunching.subF002;
			String text = emailhtmlloader.rollConsumptionF002Supervisor(details);
			
			for (BleachHodHrQaDetails supervisorDetails : supervisorDetailsList) {
	            String mailId = supervisorDetails.getemail();
	            send_mail(mailId, emailSubject, text, subject);
	        }
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailToHodF002(DailyRollConsumptionReportF002 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF002;
			String text = emailhtmlloader.rollConsumptionF002Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F003
	public void sendEmailToHodF003(PunchingProductChangeOverF03 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF003;
			String text = emailhtmlloader.punchingProductChangeOverF03Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailToQAF003(PunchingProductChangeOverF03 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> QADetailsList = userrepository.getPadPunchingDepartQA();
			String subject = AppConstantsPadPunching.subF003;
			String text = emailhtmlloader.punchingProductChangeOverF03QA(details);
			
			for (BleachHodHrQaDetails supervisorDetails : QADetailsList) {
	            String mailId = supervisorDetails.getemail();
	            send_mail(mailId, emailSubject, text, subject);
	        }
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F004
	public void sendEmailToHodF004(DailyProdPackingDetailsF004 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF004;
			String text = emailhtmlloader.dailyProdPackingDetailsF004Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F005
	public void sendEmailToHodF005(MachineCleaningCheckListF005 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF005;
			String text = emailhtmlloader.machineCleaningCheckListF005Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F006
	public void sendEmailToHodF006(PunchingHandSanitationF24 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF006;
			String text = emailhtmlloader.punchingHandSanitationF006Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F007
	public void sendEmailToHodF007(MetalDetectorCheckList007 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF007;
			String text = emailhtmlloader.metalDetectorCheckList007Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F008
	public void sendEmailToHodF008(PadPunchingSanitizationOfMachinesAndSurfacesF21 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF008;
			String text = emailhtmlloader.padPunchingSanitizationOfMachinesAndSurfacesF21Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F009
	public void sendEmailToHodF009(PadPunchingHouseKeepingCheckListF26 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF009;
			String text = emailhtmlloader.padPunchingHouseKeepingCheckListF26Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailToHRF009(PadPunchingHouseKeepingCheckListF26 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> HRDetailsList = userrepository.getPadPunchingDepartHR();
			String subject = AppConstantsPadPunching.subF009;
			String text = emailhtmlloader.padPunchingHouseKeepingCheckListF26HR(details);
			
			for (BleachHodHrQaDetails supervisorDetails : HRDetailsList) {
	            String mailId = supervisorDetails.getemail();
	            send_mail(mailId, emailSubject, text, subject);
	        }
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F012
	public void sendEmailToHodF012(PadPunchingLogBookBagMakingF003 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF012;
			String text = emailhtmlloader.padPunchingLogBookBagMakingF003Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F013
	public void sendEmailToHodF013(PadPunchingBagMakingDailyProductionDetailsF001 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF013;
			String text = emailhtmlloader.padPunchingBagMakingDailyProductionDetailsF001Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F014
	public void sendEmailToHodF014(BagMakingSpecificationDetailsF014 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF014;
			String text = emailhtmlloader.bagMakingSpecificationDetailsF014Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F015
	public void sendEmailToHodF015(PadPunchingHouseKeepingCheckListF010 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getPadPunchingDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsPadPunching.subF015;
			String text = emailhtmlloader.padPunchingHouseKeepingCheckListF010Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailToHRF015(PadPunchingHouseKeepingCheckListF010 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> HRDetailsList = userrepository.getPadPunchingDepartHR();
			String subject = AppConstantsPadPunching.subF015;
			String text = emailhtmlloader.padPunchingHouseKeepingCheckListF010HR(details);
			
			for (BleachHodHrQaDetails supervisorDetails : HRDetailsList) {
	            String mailId = supervisorDetails.getemail();
	            send_mail(mailId, emailSubject, text, subject);
	        }
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
