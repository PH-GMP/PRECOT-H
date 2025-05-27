package com.focusr.Precot.util;

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
import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationOfMechineAndSurfaceF01;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMixingChangeMachineCleaningF38Repository;
import com.focusr.Precot.security.JwtTokenProvider;

@Service
public class BleachMailFunction {

	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	EmailHtmlLoader emailhtmlloader;

	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(BleachShiftLogBookF36.class);

	// F36//
	public void sendEmailToHODF36(BleachShiftLogBookF36 logbook) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.slbhodSubject;
			String text = emailhtmlloader.shiftLogbook(logbook);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//F01//
	public void sendEmailToHODF01(BleachSanitizationOfMechineAndSurfaceF01 sanitization) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.sanitizationF01Sub;
			String text = emailhtmlloader.sanitizationOfMechineAndSurfaces(sanitization);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//F09//
	public void sendEmailToHODF09(BleachEquipmentUsageLogBookCakePressF09 equip) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.EquipUsageCakePressF09;
			String text = emailhtmlloader.bleachEquipmentUsageLogBookCakePressF09(equip);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//F34//
	public void sendEmailToHODF34(BleachEquipmentUsageLogbookBlowroomAndCardingF34 equip) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.EquipUsageBandcF34;
			String text = emailhtmlloader.bleachEquipmentUsageLogBookCakePressF34(equip);
//		String text = null;
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//F41//

	public void sendEmailToHODF41(BleachHandSanitizationABPressF41 handsanitization) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.handSanitizationF41;
			String text = emailhtmlloader.handSanitizationF41(handsanitization);
//		String text = null;
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//F42
	public void sendEmailToHOD42(BleachLayDownCheckListF42 laydown) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.laydownhodSubject;

			String text = emailhtmlloader.laydownForm1(laydown);
//        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//F33
	public void sendMailToHODf33(List<BleachEquipmentUsageLogBookF33> detailList) {
		try {

			String date = detailList.get(0).getDate();

			Long id = detailList.get(0).getId();

			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.EquipmentUsgaelogBookSubject;

			String text = emailhtmlloader.laydownFormF33(detailList);

//        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F04
	public void sendEmailToHODF04(BleachAppliedContRawCottonF04 appliedraw) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.appliedrawF04;

			String text = emailhtmlloader.appliedRawCottonF04(appliedraw);
//	        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F08
	public void sendEmailToHODF08(BleachAppliedContAbCottonF08 appliedAb) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.appliedContAbF08;

			String text = emailhtmlloader.appliedContaminationAbF08(appliedAb);
//			        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F38
	public void sendEmailToHODF38(BleachMixingChangeMachineCleaningF38 mixing) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.mixingF38;

			String text = emailhtmlloader.mixingchangeoverAndMechineDetailsF38(mixing);
//			        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F02 ---HR
	public void sendEmailToHRF02(BleachHouseKeepingCheckListF02 housekeep02) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getHrDetails();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.housekeepingF2;

			String text = emailhtmlloader.houseKeeping02Hr(housekeep02);
//					        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F02 ---HOD
	public void sendEmailToHODF02(BleachHouseKeepingCheckListF02 housekeep02A) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.housekeepingF2;

			String text = emailhtmlloader.houseKeeping02Hod(housekeep02A);
//				        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F13--HOD
	public void sendEmailToHODF13(BleachJobCardF13 jobcard) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.bleachJobCardF13;

			String text = emailhtmlloader.bleachJobCardHod(jobcard);
//				        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F13--QA
	public void sendEmailToQAF13(BleachJobCardF13 jobcard) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> qaDetails = userrepository.getQADetails();

			for (BleachHodHrQaDetails qa : qaDetails) {
				String mailId = qa.getemail();
				String subject = AppConstants.bleachJobCardF13;

				String text = emailhtmlloader.bleachJobCardQA(jobcard,qa.getid());
//				        String token = tokenProvider.createTokenForUser(userId);
				send_mail(mailId, emailSubject, text, subject);
			}
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F2A--HR
	public void sendEmailToHRF02A(BleachHouseKeepingCheckListF02A housekeep02A) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getHrDetails();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.housekeepingF2A;

			String text = emailhtmlloader.houseKeepingHrF02A(housekeep02A);
//				        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F2A --HOD
	public void sendEmailToHODF02A(BleachHouseKeepingCheckListF02A housekeep02A) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.housekeepingF2A;

			String text = emailhtmlloader.houseKeepingHodF02A(housekeep02A);
//				        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//		F18
	public void sendMailToHODf18(BleachContAbsBleachedCottonF18 request) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
//				String mailId = "gayathrisukumar406@gmail.com";
			String subject = AppConstants.ContChcekingReportSubject;

			String text = emailhtmlloader.bleachContAbsCottonF18(request);
//	        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//		F05
	public void sendMailToHODf05(BleachContRawCottonF05 request) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.ContRawCottonSubject;

			String text = emailhtmlloader.bleachContRawCottonF05(request);
//	        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//		F11
	public void sendMailToHODf11(EquipLogBookHydroExtractorF11 request) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.EquipLogHydroExtractorSubject;

			String text = emailhtmlloader.equipmentLogbookF11(request);
//	        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

//		F03
	public void sendMailToHODf03(MetalDetectorCheckListF03 request) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.MetalDetectorSubjectF03;

			String text = emailhtmlloader.metalDetectorCheckListF03(request);
//	        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	public void sendMailToHODf16(BleachMachineCleaningRecordF16 request) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstants.machineCleaningSubjectF16;
 
			String text = emailhtmlloader.machineCleaningRecordF16Hod(request);
//	        String token = tokenProvider.createTokenForUser(userId);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
//******************************************SEND MAIL *****************************************************************************************************************//
	public void send_mail(String mailId, EmailSubject emailSubject, String text1, String subject) {

		String emailFrom = new String();
		List<String> emailTo = new ArrayList<String>();
		List<String> emailCC = new ArrayList<String>();
//String subject = "";

//EmailSubject emailSubject = null;
		String text = text1;

		emailTo.add(mailId);
//emailTo.add(new_manager_mail);
		String fromEmail = emailSubject.getUsername();

		emailFrom = fromEmail;

		emailSubject.init(emailFrom, emailTo, emailCC, null, subject, text);
		emailSubject.setHTML(true);

		SendMail sm = new SendMail();

		sm.sendMail(emailSubject);

	}
}
