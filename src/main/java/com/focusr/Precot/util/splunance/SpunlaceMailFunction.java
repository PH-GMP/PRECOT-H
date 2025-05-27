package com.focusr.Precot.util.splunance;

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
import com.focusr.Precot.mssql.database.model.splunance.DailyProductionReportF006;
import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.mssql.database.model.splunance.DailyStoppageReportSpunlaceF008;
import com.focusr.Precot.mssql.database.model.splunance.FilterBagConsumptionDetailsF004;
import com.focusr.Precot.mssql.database.model.splunance.LogbookSpunlacePlanningF010;
import com.focusr.Precot.mssql.database.model.splunance.MachineCleaningRecordF023;
import com.focusr.Precot.mssql.database.model.splunance.MetalDetectorCheckListF020;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsJetlaceAndDryerF003;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsWinterF005;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationOpeningLineF002;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationRpBalePressF013;
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupVerificationSliterWinderF016;
import com.focusr.Precot.mssql.database.model.splunance.ProductChangeOverCheckListSpunlaceF011;
import com.focusr.Precot.mssql.database.model.splunance.SanitizationOfMachineAndSurfacesF024;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseSliterWinderProdReportF017;
import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseWasteReportSpunlaceF019;
import com.focusr.Precot.mssql.database.model.splunance.SplunanceBaleConsumptionF01;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceGsmAnalysisReportF009;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceRPBalePressStoppageF015;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportF012;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseRPProdSupportF14;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseStoppageReportF018;
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
public class SpunlaceMailFunction {

	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	SpunlaceEmailHtmlLoader emailhtmlloader;

	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(SpunlaceMailFunction.class);


	// F007// hod
	public void sendEmailToHodF007(DailyRejectionReportF007 details) {
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
			String mailId = hodDetails.getemail();
			String subject = AppConstantsSplunance.subF007;
			String text = emailhtmlloader.dailyRejectionReportF007Hod(details);
			send_mail(mailId, emailSubject, text, subject);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeySpecException e) {
			log.error("Unable to get Email details", e);
			throw new AppException("Unable to get Email details");
		}
	}
	// F007// supervisor
		public void sendEmailToSupervisorsF007(DailyRejectionReportF007 details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
				
				String subject = AppConstantsSplunance.subF007;
				String text = emailhtmlloader.dailyRejectionReportF007Hod(details);
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
	
	// F004// hod
		public void sendEmailToHodF004(FilterBagConsumptionDetailsF004 details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
				String mailId = hodDetails.getemail();
				String subject = AppConstantsSplunance.subF004;
				String text = emailhtmlloader.FilterBagConsumptionDetailsF004Hod(details);
				send_mail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		// F004// hod
				public void sendEmailToSupervisorF004(FilterBagConsumptionDetailsF004 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
					
						String subject = AppConstantsSplunance.subF004;
						String text = emailhtmlloader.FilterBagConsumptionDetailsF004Hod(details);
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

		// F006// hod
				public void sendEmailToHodF006(DailyProductionReportF006 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF006;
						String text = emailhtmlloader.DailyProductionReportF006Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F006// supervisor
				public void sendEmailToSupervisorF006(DailyProductionReportF006 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
						
						String subject = AppConstantsSplunance.subF006;
						String text = emailhtmlloader.DailyProductionReportF006Hod(details);
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
				
				// F010// hod
				public void sendEmailToHodF010(LogbookSpunlacePlanningF010 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF010;
						String text = emailhtmlloader.LogbookSpunlacePlanningF010Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F009// hod
				public void sendEmailToHodF009(SpunlaceGsmAnalysisReportF009 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF009;
						String text = emailhtmlloader.SpunlaceGsmAnalysisReportF009Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F016// hod
				public void sendEmailToHodF016(ProcessSetupVerificationSliterWinderF016 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF016;
						String text = emailhtmlloader.ProcessSetupVerificationSliterWinderF016Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				// F016// hod
				public void sendEmailToSupervisorF016(ProcessSetupVerificationSliterWinderF016 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
					
						String subject = AppConstantsSplunance.subF016;
						String text = emailhtmlloader.ProcessSetupVerificationSliterWinderF016Hod(details);
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
				
				// F013// hod
				public void sendEmailToHodF013(ProcessSetupVerificationRpBalePressF013 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF013;
						String text = emailhtmlloader.ProcessSetupVerificationRpBalePressF013Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F013// Supervisor
				public void sendEmailToSupervisorF013(ProcessSetupVerificationRpBalePressF013 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();						
						String subject = AppConstantsSplunance.subF013;
						String text = emailhtmlloader.ProcessSetupVerificationRpBalePressF013Hod(details);
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
				
				// F020// hod
				public void sendEmailToHodF020(MetalDetectorCheckListF020 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF020;
						String text = emailhtmlloader.MetalDetectorCheckListF020Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F019// hod
				public void sendEmailToHodF019(ShiftWiseWasteReportSpunlaceF019 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF019;
						String text = emailhtmlloader.ShiftWiseWasteReportSpunlaceF019Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F024// hod
				public void sendEmailToHodF024(SanitizationOfMachineAndSurfacesF024 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF024;
						String text = emailhtmlloader.SanitizationOfMachineAndSurfacesF024Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F011// hod
				public void sendEmailToHodF011(ProductChangeOverCheckListSpunlaceF011 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF011;
						String text = emailhtmlloader.ProductChangeOverCheckListSpunlaceF011Supervisor(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				// F011//Supervisor
				public void sendEmailToSupervisorF011(ProductChangeOverCheckListSpunlaceF011 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
						
						String subject = AppConstantsSplunance.subF011;
						String text = emailhtmlloader.ProductChangeOverCheckListSpunlaceF011Supervisor(details);
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
				
				// F011// QA
				public void sendEmailToQaF011(ProductChangeOverCheckListSpunlaceF011 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceQADetails();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF011;
						String text = emailhtmlloader.ProductChangeOverCheckListSpunlaceF011Supervisor(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F025 Hod
				public void sendEmailToHodF025(SpunlaceHandSanitizationReportF025 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF025;
						String text = emailhtmlloader.SpunlaceHandSanitizationReportF025Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F023 Hod
				public void sendEmailToHodF023(MachineCleaningRecordF023 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF023;
						String text = emailhtmlloader.MachineCleaningRecordF023Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F017 Hod
				public void sendEmailToHodF017(ShiftWiseSliterWinderProdReportF017 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF017;
						String text = emailhtmlloader.ShiftWiseSliterWinderProdReportF017Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F017 Supervisor
				public void sendEmailToSupervisorF017(ShiftWiseSliterWinderProdReportF017 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
						String subject = AppConstantsSplunance.subF017;
						String text = emailhtmlloader.ShiftWiseSliterWinderProdReportF017Hod(details);
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
				// F001 Hod
				public void sendEmailToHodF001(SplunanceBaleConsumptionF01 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF001;
						String text = emailhtmlloader.SplunanceBaleConsumptionF01Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F001 Supervisor
				public void sendEmailToSupervisorF001(SplunanceBaleConsumptionF01 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
					 List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
						
						String subject = AppConstantsSplunance.subF001;
						String text = emailhtmlloader.SplunanceBaleConsumptionF01Hod(details);
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
				
				// F005 Hod
				public void sendEmailToHodF005(ProcessSetupDetailsWinterF005 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF005;
						String text = emailhtmlloader.ProcessSetupDetailsWinterF005Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				// F005 Supervisor
				public void sendEmailToSupervisorF005(ProcessSetupDetailsWinterF005 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
						String subject = AppConstantsSplunance.subF005;
						String text = emailhtmlloader.ProcessSetupDetailsWinterF005Hod(details);
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
				
				// F003 Hod
				public void sendEmailToHodF003(ProcessSetupDetailsJetlaceAndDryerF003 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF003;
						String text = emailhtmlloader.ProcessSetupDetailsJetlaceAndDryerF003Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				// F003 Supervisor
				public void sendEmailToSupervisorF003(ProcessSetupDetailsJetlaceAndDryerF003 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
						String subject = AppConstantsSplunance.subF003;
						String text = emailhtmlloader.ProcessSetupDetailsJetlaceAndDryerF003Hod(details);
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
				
				// F002 Hod
				public void sendEmailToHodF002(ProcessSetupVerificationOpeningLineF002 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF002;
						String text = emailhtmlloader.ProcessSetupVerificationOpeningLineF002Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F002 Supervisor
				public void sendEmailToSupervisorsF002(ProcessSetupVerificationOpeningLineF002 details) {
				    try {
				        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				        List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
				        String subject = AppConstantsSplunance.subF002;
				        String text = emailhtmlloader.ProcessSetupVerificationOpeningLineF002Hod(details);

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
				
				// F008 Hod
				public void sendEmailToHodF008(DailyStoppageReportSpunlaceF008 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF008;
						String text = emailhtmlloader.DailyStoppageReportSpunlaceF008Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				
				// F012 Hod
				public void sendEmailToHodF012(SpunlaceSampleReportF012 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF012;
						String text = emailhtmlloader.SpunlaceSampleReportF012Supervisor(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F012 qc
				public void sendEmailToQcF012(SpunlaceSampleReportF012 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						  List<BleachHodHrQaDetails> qcDetailsList = userrepository.getSpunlaceDepartQc();						
						String subject = AppConstantsSplunance.subF012;
						String text = emailhtmlloader.SpunlaceSampleReportF012Supervisor(details);
						  for (BleachHodHrQaDetails qcDetails : qcDetailsList) {
					            String mailId = qcDetails.getemail();
					            send_mail(mailId, emailSubject, text, subject);
					        }
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				
				
				// F018 Hod
				public void sendEmailToHodF018(SpunlaceShiftWiseStoppageReportF018 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF018;
						String text = emailhtmlloader.SpunlaceShiftWiseStoppageReportF018Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F015 Hod
				public void sendEmailToHodF015(SpunlaceRPBalePressStoppageF015 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF012;
						String text = emailhtmlloader.SpunlaceRPBalePressStoppageF015Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				// F014 Hod
				public void sendEmailToHodF014(SpunlaceShiftWiseRPProdSupportF14 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getSpunlaceDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantsSplunance.subF012;
						String text = emailhtmlloader.SpunlaceShiftWiseRPProdSupportF14Hod(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
				
				//F014 supervisor
				public void sendEmailToSupervisorsF014(SpunlaceShiftWiseRPProdSupportF14 details) {
				    try {
				        EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				        List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getSpunlaceDepartSupervisors();
				        String subject = AppConstantsSplunance.subF002;
				        String text = emailhtmlloader.SpunlaceShiftWiseRPProdSupportF14Supervisor(details);

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
				
				//-----------------------------------------------------//
				
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
