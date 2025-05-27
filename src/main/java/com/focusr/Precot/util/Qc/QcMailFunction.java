package com.focusr.Precot.util.Qc;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.NoSuchPaddingException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;
import com.focusr.Precot.mssql.database.model.Qc.CoaAbCottonF26;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonBallsF26B;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonPadsF26A;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonRollGoodsF26E;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolPleatF26D;
import com.focusr.Precot.mssql.database.model.Qc.CoaCottonWoolRollF26C;
import com.focusr.Precot.mssql.database.model.Qc.CoaInfusedCottonPadsF26F;
import com.focusr.Precot.mssql.database.model.Qc.CoaMoistureF26G;
import com.focusr.Precot.mssql.database.model.Qc.DigitalColonyCounterF030;
import com.focusr.Precot.mssql.database.model.Qc.DisposalRecord;
import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.QcPhMeterCalibrationReportF006;
import com.focusr.Precot.mssql.database.model.Qc.QcReagentPreparationRecordF017;
import com.focusr.Precot.mssql.database.model.Qc.QcShelfLifePeriodPhysicChemMicroF026;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;
import com.focusr.Precot.mssql.database.model.Qc.Qc_BacterialIncubatorTempCalibrationF012;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaGrowthPromotionTestReportF021;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaPreparationAndConsumptionRecordF019;
import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedAnalyticalReportF004;
import com.focusr.Precot.mssql.database.model.Qc.Qc_ValidationForAutoclaveByChemicalIndicatorF014;
import com.focusr.Precot.mssql.database.model.Qc.Qc_WiraFiberFinenessTesterReportF010;
import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.Qc.RequistionF029;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookF001_F002_F003;
import com.focusr.Precot.mssql.database.model.Qc.StandarizationOfChemicalReportF016;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalAnalysisARF008_009_010;
import com.focusr.Precot.mssql.database.model.Qc.WaterAnalysisReportF007;
import com.focusr.Precot.mssql.database.model.Qc.absorbentbleachedcottonreportCLF005Parent;
import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
import com.focusr.Precot.mssql.database.model.Qc.distillwaterconsumF27;
import com.focusr.Precot.mssql.database.model.Qc.exfoliatingfabricanalysisreport;
import com.focusr.Precot.mssql.database.model.Qc.finishedproductanalysisreportF006;
import com.focusr.Precot.mssql.database.model.Qc.fumigationARF011;
import com.focusr.Precot.mssql.database.model.Qc.fungalIncubatorReportCLF013;
import com.focusr.Precot.mssql.database.model.Qc.mediaDisposalCLF022;
import com.focusr.Precot.mssql.database.model.Qc.microbiologicalAnalyisisReportF20;
import com.focusr.Precot.mssql.database.model.Qc.non_woven_F005;
import com.focusr.Precot.mssql.database.model.Qc.physicalandchemicaltest;
import com.focusr.Precot.mssql.database.model.Qc.potableWaterARF013Report;
import com.focusr.Precot.mssql.database.model.Qc.spectrophotometerReportClF011;
import com.focusr.Precot.mssql.database.model.Qc.temperatureRelativeF018;
import com.focusr.Precot.mssql.database.model.Qc.turbiditycalibrationreportCLF009;
import com.focusr.Precot.mssql.database.model.Qc.validationAutoclave;
import com.focusr.Precot.mssql.database.model.Qc.weighingscalecalibrationreportCLF007;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;

@Service
public class QcMailFunction {

	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired

	QcEmailHtmlLoader emailhtmlloader;

	SCAUtil sca = new SCAUtil();

	private static final Logger log = LoggerFactory.getLogger(QcMailFunction.class);

	public void sendEmailToQaExeF26(CoaAbCottonF26 details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F26;

			String text = emailhtmlloader.coaAbCottonF26(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// MANAGER
	
	public void sendEmailToManagerF26(CoaAbCottonF26 details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			String subject = AppConstantsQc.F26;

			String text = emailhtmlloader.coaAbCottonF26Man(details);

			for (BleachHodHrQaDetails manDetails : hodDetails) {
				
				String mailId = manDetails.getemail();
				send_mail(mailId, emailSubject, text, subject);
			}

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	public void sendEmailToQaExeF26A(CoaCottonPadsF26A details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F026A;

			String text = emailhtmlloader.coaCottonPadsF26A(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F26A MANAGER
	
	public void sendEmailToManagerF26A(CoaCottonPadsF26A details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			String subject = AppConstantsQc.F026A;

			String text = emailhtmlloader.coaCottonPadsF26AManager(details);

			for (BleachHodHrQaDetails manDetails : hodDetails) {
				
				String mailId = manDetails.getemail();
				send_mail(mailId, emailSubject, text, subject);
			}

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	public void sendEmailToQaExeF26B(CoaCottonBallsF26B details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F026B;

			String text = emailhtmlloader.coaCottonBallsF26B(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F26B MANAGER
	
		public void sendEmailToManagerF26B(CoaCottonBallsF26B details) {

			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

				List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

				String subject = AppConstantsQc.F026B;

				String text = emailhtmlloader.coaCottonBallsF26BManager(details);

				for (BleachHodHrQaDetails manDetails : HRDetailsList) {
					String mailId = manDetails.getemail();
					send_mail(mailId, emailSubject, text, subject);
				}

			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}


	public void sendEmailToQaExeF026C(CoaCottonWoolRollF26C details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F026C;

			String text = emailhtmlloader.coaCottonWoolRollF26C(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F26C MANAGER
	
	public void sendEmailToManagerF26C(CoaCottonWoolRollF26C details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

			String subject = AppConstantsQc.F026C;

			String text = emailhtmlloader.coaCottonWoolRollF26CManager(details);

			for (BleachHodHrQaDetails manDetails : HRDetailsList) {
				String mailId = manDetails.getemail();
				send_mail(mailId, emailSubject, text, subject);
			}

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	public void sendEmailToQaExeF026D(CoaCottonWoolPleatF26D details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F026D;

			String text = emailhtmlloader.coaCottonWoolPleatF26D(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F26D MANAGER
	
	public void sendEmailToManagerF26D(CoaCottonWoolPleatF26D details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

			String subject = AppConstantsQc.F026D;

			String text = emailhtmlloader.coaCottonWoolPleatF26DManager(details);

			for (BleachHodHrQaDetails manDetails : HRDetailsList) {
				String mailId = manDetails.getemail();
				send_mail(mailId, emailSubject, text, subject);
			}

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// 26E

	public void sendEmailToQaExeF026E(CoaCottonRollGoodsF26E details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F026E;

			String text = emailhtmlloader.coaCottonRollGoodsF26E(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F26E MANAGER
	
		public void sendEmailToManagerF26E(CoaCottonRollGoodsF26E details) {

			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

				List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

				String subject = AppConstantsQc.F026E;

				String text = emailhtmlloader.coaCottonRollGoodsF26EManager(details);

				for (BleachHodHrQaDetails manDetails : HRDetailsList) {
					String mailId = manDetails.getemail();
					send_mail(mailId, emailSubject, text, subject);
				}

			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}


	// 26F

	public void sendEmailToQaExeF026F(CoaInfusedCottonPadsF26F details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F026F;

			String text = emailhtmlloader.coaInfusedCottonPadsF26F(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F26F MANAGER
	
			public void sendEmailToManagerF26F(CoaInfusedCottonPadsF26F details) {

				try {
					EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

					List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

					String subject = AppConstantsQc.F026F;

					String text = emailhtmlloader.coaInfusedCottonPadsF26FManager(details);

					for (BleachHodHrQaDetails manDetails : HRDetailsList) {
						String mailId = manDetails.getemail();
						send_mail(mailId, emailSubject, text, subject);
					}

				} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
						| InvalidKeySpecException e) {
					log.error("Unable to get Email details", e);
					throw new AppException("Unable to get Email details");
				}
			}

	// 26G

	public void sendEmailToQaExeF026G(CoaMoistureF26G details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F026G;

			String text = emailhtmlloader.coaMoistureF26G(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// F26G MANAGER
	
	public void sendEmailToManagerF26G(CoaMoistureF26G details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

			String subject = AppConstantsQc.F026G;

			String text = emailhtmlloader.coaMoistureF26GManager(details);

			for (BleachHodHrQaDetails manDetails : HRDetailsList) {
				String mailId = manDetails.getemail();
				send_mail(mailId, emailSubject, text, subject);
			}

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F030 DIGITAL COLONY

	public void sendEmailToQaExeF030(DigitalColonyCounterF030 details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails microDesigneeDetails = userrepository.getQcDepartMicroDesignee();

			String mailId = microDesigneeDetails.getemail();

			String subject = AppConstantsQc.F030;

			String text = emailhtmlloader.digitalColonyCounterF030(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	// F016 STANDARIZATION OF CHEMICAL

	public void sendEmailToQaExeF016(StandarizationOfChemicalReportF016 details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

			String subject = AppConstantsQc.F016;

			String text = emailhtmlloader.standarizationOfChemicalReportF016(details);

			for (BleachHodHrQaDetails manDetails : HRDetailsList) {
				String mailId = manDetails.getemail();
				send_mail(mailId, emailSubject, text, subject);
			}

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}

	}
	
	
	// F007 WATER ANALYSIS REPORT
	
	public void sendEmailToQaExeF007(WaterAnalysisReportF007 details) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			BleachHodHrQaDetails hodDetails = userrepository.getQcDepartQaExe();

			String mailId = hodDetails.getemail();

			String subject = AppConstantsQc.F007;

			String text = emailhtmlloader.waterAnalysisReportF007(details);

			send_mail(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// MICRO TO MANAGER
	
		public void sendEmailToMicroManagerF007(WaterAnalysisReportF007 details) {

			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

				List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

				String subject = AppConstantsQc.F007 ;

				String text = emailhtmlloader.waterAnalysisReportF007MicroToManager(details);

				for (BleachHodHrQaDetails manDetails : HRDetailsList) {
					String mailId = manDetails.getemail();
					send_mail(mailId, emailSubject, text, subject);
				}

			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		
		// QA EXECUTIVE TO MANAGER
		
		
		public void sendEmailToQaExeToManagerF007(WaterAnalysisReportF007 details) {

			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

				List<BleachHodHrQaDetails> HRDetailsList = userrepository.getQcDepartQaQcManager();

				String subject = AppConstantsQc.F007 ;

				String text = emailhtmlloader.waterAnalysisReportF007QaExeToManager(details);

				for (BleachHodHrQaDetails manDetails : HRDetailsList) {
					String mailId = manDetails.getemail();
					send_mail(mailId, emailSubject, text, subject);
				}

			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		

	// ******************************************SEND MAIL
	// *****************************************************************************************************************//

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
	
	public void send_mail_QC8(List<String> mailId, EmailSubject emailSubject, String text1, String subject) {

		String emailFrom = new String();
		List<String> emailTo = new ArrayList<String>();
		List<String> emailCC = new ArrayList<String>();
		// String subject = "";

		// EmailSubject emailSubject = null;
		String text = text1;

		
		// emailTo.add(new_manager_mail);
		String fromEmail = emailSubject.getUsername();

		emailFrom = fromEmail;

		emailSubject.init(emailFrom, mailId, emailCC, null, subject, text);
		emailSubject.setHTML(true);

		SendMail sm = new SendMail();

		sm.sendMail(emailSubject);

	}
	
	//QC 8 



	
	public List<String> toMail(List<BleachHodHrQaDetails>  hod){
	
	List<String> mail = new ArrayList<>();
	
	for(BleachHodHrQaDetails js : hod){
                   mail.add(js.getemail());
	}
	
	return mail;
	}


public void sendEmailToARF002(physicalandchemicaltest physical) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF002;

			String text = emailhtmlloader.physicalandchemicaltestARF002(physical);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToARF005(non_woven_F005 nonwoven) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF005;

			String text = emailhtmlloader.testARF005(nonwoven);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	

	public void sendEmailToARF011(@Valid fumigationARF011 fumigation) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF011;

			String text = emailhtmlloader.testARF011(fumigation);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToARF013(@Valid potableWaterARF013Report potableWaterARF013Report) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF013;

			String text = emailhtmlloader.testARF013(potableWaterARF013Report);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToARF005(@Valid exfoliatingfabricanalysisreport exfo) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF005;

			String text = emailhtmlloader.testARF05(exfo);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToARF006(@Valid finishedproductanalysisreportF006 finished) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF006;

			String text = emailhtmlloader.testARF06(finished);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToF007(@Valid weighingscalecalibrationreportCLF007 wigClf007) {
		
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManagerAndChemistDesgn();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F007;

			String text = emailhtmlloader.testF07(wigClf007);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailToF005(absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F005;

			String text = emailhtmlloader.testF05(absorbentbleachedcottonreportCLF005);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToARF014(@Valid briquettesanalysisreportARF014 physical) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF014;

			String text = emailhtmlloader.testF014(physical);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	public void sendEmailToF009(@Valid turbiditycalibrationreportCLF009 turbidity) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManagerAndChemistDesgn();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F009;

			String text = emailhtmlloader.testF09(turbidity);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToF011(@Valid spectrophotometerReportClF011 spectrometer) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManagerAndChemistDesgn();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F011;

			String text = emailhtmlloader.testF011(spectrometer);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToF013(@Valid fungalIncubatorReportCLF013 fungalIncubator) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManagerAndMicroDesgn();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F013;

			String text = emailhtmlloader.testF013(fungalIncubator);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToF024(@Valid DisposalRecord disposalRecord) {

		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F024;

			String text = emailhtmlloader.testF024(disposalRecord);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}

	public void sendEmailToF015(@Valid validationAutoclave validation) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F015;

			String text = emailhtmlloader.testF015(validation);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}

	public void sendEmailToF018(@Valid temperatureRelativeF018 temperatureRelat) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManagerAndMicroDesgn();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F018;

			String text = emailhtmlloader.testF018(temperatureRelat);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}

	public void sendEmailToF022(@Valid mediaDisposalCLF022 mediaDis) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F022;

			String text = emailhtmlloader.testF022(mediaDis);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToF020(@Valid microbiologicalAnalyisisReportF20 microbipReportF20) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F020;

			String text = emailhtmlloader.testF020(microbipReportF20);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	
	public void sendEmailToF029(@Valid RequistionF029 requis) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F029;

			String text = emailhtmlloader.testF029(requis);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
		
	}
	
	// -------------
	
	public void sendEmailToF027(@Valid distillwaterconsumF27 distillwat) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.F027;

			String text = emailhtmlloader.testF027(distillwat);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
		
	}
	public void sendEmailToManagerARF02(physicalandchemicaltest physicalTest) {

		
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);

			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();

			List<String> mailId = toMail(hodDetails);

			String subject = AppConstantsQc.ARF002;

			String text = emailhtmlloader.physicalandchemicaltestARF002Approve(physicalTest);

			send_mail_QC8(mailId, emailSubject, text, subject);

		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	
	// -------------
	

	// ARF001
	public void sendEmailToHodARF001(RawCottenAnalysisReportARF001 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();
 
			for (BleachHodHrQaDetails hod : hodDetails) {
				String mailId = hod.getemail();
				String subject = AppConstantsQc.subARF001;
				String text = emailhtmlloader.rawCottonAnalysisARF001Hod(details); // Prepare the email content
 
				send_mail(mailId, emailSubject, text, subject);
			}
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
 
 
	// ARF003
	public void sendEmailToSupervisorARF003(ChemicalAnalysisReportARF003 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManager();
			String subject = AppConstantsQc.subARF003;
			String text = emailhtmlloader.chemicalAnalysisARF003Hod(details);
 
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
 
	// F001_2_3
	public void sendEmailToSupervisorF001_2_3(SampleInwardBookF001_F002_F003 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();
			String text = emailhtmlloader.sampleInwardF001_02_03Hod(details); // Prepare the email content
			String subject=null;
			for (BleachHodHrQaDetails hod : hodDetails) {
				String mailId = hod.getemail();
				if (details.getFormatNo().equalsIgnoreCase("PH-QCL01/F-001")){
					subject = AppConstantsQc.subF001;
				}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01/F-002")) {
					subject = AppConstantsQc.subF002;
				}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01/F-003")) {
					subject = AppConstantsQc.subF003;
				}
 
				send_mail(mailId, emailSubject, text, subject);
			}
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
 
	//ARF008_09_10
	public void sendEmailToSupervisorARF008_09_10(SwabMicrobiologicalAnalysisARF008_009_010 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> hodDetails = userrepository.getQcDepartQaQcManager();
			String text = emailhtmlloader.swabMicrobiologicalARF008_09_10Hod(details); // Prepare the email content
			String subject=null;
			for (BleachHodHrQaDetails hod : hodDetails) {
				String mailId = hod.getemail();
				if (details.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-008")){
					subject = AppConstantsQc.subARF008;
				}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-009")) {
					subject = AppConstantsQc.subARF009;
				}else if (details.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-0")) {
					subject = AppConstantsQc.subARF010;
				}
 
				send_mail(mailId, emailSubject, text, subject);
			}
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
 
	// ARF012
	public void sendEmailToSupervisorARF012(DistilledWaterAnalysisReportARF012 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManager();
			String subject = AppConstantsQc.subARF012;
			String text = emailhtmlloader.distilledWaterARF012Hod(details);
 
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
 
	//F008
	public void sendEmailToSupervisorF008(QcTdsMeterCalibrationReportF008 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManagerAndChemistDesgn();
			String subject = AppConstantsQc.subF008;
			String text = emailhtmlloader.tdsCalibrationReportF008Hod(details);
 
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
 
	//F010
	public void sendEmailToSupervisorF010(Qc_WiraFiberFinenessTesterReportF010 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManagerAndChemistDesgn();
			String subject = AppConstantsQc.subF010;
			String text = emailhtmlloader.wiraFiberFinenessF010Hod(details);
 
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
 
	//F004
	public void sendEmailToSupervisorF004(Qc_RawCottenConsolidatedAnalyticalReportF004 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManager();
			String subject = AppConstantsQc.subF004;
			String text = emailhtmlloader.rawCottonConsolidatedF004Hod(details);
 
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
 
	//F012
	public void sendEmailToSupervisorF012(Qc_BacterialIncubatorTempCalibrationF012 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManagerAndMicroDesgn();
			String subject = AppConstantsQc.subF012;
			String text = emailhtmlloader.bacterialIncubatorTempCalibrationF012Hod(details);
 
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
 
	//F014
	public void sendEmailToSupervisorF014(Qc_ValidationForAutoclaveByChemicalIndicatorF014 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManagerAndMicroDesgn();
			String subject = AppConstantsQc.subF014;
			String text = emailhtmlloader.validationmForAutoClaveByChemicalF014Hod(details);
 
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
 
	//F006
	public void sendEmailToSupervisorF006(QcPhMeterCalibrationReportF006 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManagerAndChemistDesgn();
			String subject = AppConstantsQc.subF006;
			String text = emailhtmlloader.phMeterCalibrationReportF006Hod(details);
 
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
 
	//F017
	public void sendEmailToSupervisorF017(QcReagentPreparationRecordF017 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getChemistDesignAndMicroDesgn();
			String subject = AppConstantsQc.subF017;
			String text = emailhtmlloader.regantPreparationRecordF017Hod(details);
 
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
 
	//F026
	public void sendEmailToSupervisorF026(QcShelfLifePeriodPhysicChemMicroF026 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManager();
			String subject = AppConstantsQc.subF026;
			String text = emailhtmlloader.shelfLifePeriodPhysicChemMicroF026Hod(details);
 
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
 
	//F021
	public void sendEmailToSupervisorF021(Qc_MediaGrowthPromotionTestReportF021 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManager();
			String subject = AppConstantsQc.subF021;
			String text = emailhtmlloader.mediaGrowthPromotionTestF021Hod(details);
 
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
 
	//F019
	public void sendEmailToSupervisorF019(Qc_MediaPreparationAndConsumptionRecordF019 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getQcDepartQaQcManagerAndMicroDesgn();
			String subject = AppConstantsQc.subF019;
			String text = emailhtmlloader.mediaPreparationAndConsumptionF019Hod(details);
 
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

}
