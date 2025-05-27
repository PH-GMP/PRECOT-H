package com.focusr.Precot.util.drygoods;

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
import com.focusr.Precot.mssql.database.model.drygoods.BaleConsumptionReportDryGoodsF001;
import com.focusr.Precot.mssql.database.model.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionCottonBallsF003;
import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionDetailsPleateAndWoolRollF006;
import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsHouseKeepingCheckListF14;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsHandSanitationF06;
import com.focusr.Precot.mssql.database.model.drygoods.GoodsProductChangeOverF09;
import com.focusr.Precot.mssql.database.model.drygoods.LogBookHeader;
import com.focusr.Precot.mssql.database.model.drygoods.MiniRoll;
import com.focusr.Precot.mssql.database.model.drygoods.SanitizationDetails;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;
import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.SendMail;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceEmailHtmlLoader;
import com.focusr.Precot.util.splunance.SpunlaceMailFunction;
@Service
public class DryGoodsMailFunction {
	@Autowired
	EmailDetailsRepository emailDetailsRepository;

	@Autowired
	private UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	DryGoodsEmailHtmlLoader emailhtmlloader;
	
	SCAUtil sca = new SCAUtil();
	private static final Logger log = LoggerFactory.getLogger(SpunlaceMailFunction.class);

	// F001// hod
			public void sendEmailToHodF001(BaleConsumptionReportDryGoodsF001 details) {
				try {
					EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
					BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
					String mailId = hodDetails.getemail();
					String subject = AppConstantDryGoods.f001;
					String text = emailhtmlloader.baleConsumptionReportF001(details);
					send_mail(mailId, emailSubject, text, subject);
				} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
						| InvalidKeySpecException e) {
					log.error("Unable to get Email details", e);
					throw new AppException("Unable to get Email details");
				}
			}
			
			
			
			// F002// hod
						public void sendEmailToHodF002(SliverMakingHeader details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
								String mailId = hodDetails.getemail();
								String subject = AppConstantDryGoods.f002;
								String text = emailhtmlloader.dailyProductionSliverMakingF002(details);
								send_mail(mailId, emailSubject, text, subject);
							} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
									| InvalidKeySpecException e) {
								log.error("Unable to get Email details", e);
								throw new AppException("Unable to get Email details");
							}
						}
						
						
						// F003// Supervisor

						
						public void sendEmailSupervisorF003(DailyProductionCottonBallsF003 details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getDrGoodsDepartSupervisors();
								
								String subject = AppConstantsSplunance.subF007;
								String text = emailhtmlloader.dailyProductionCottonBallsSupervisorF003(details);
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
						
						//F003//Supervisor
						
						
						
						
						
						// F003// Hod
						public void sendEmailToHodF003(DailyProductionCottonBallsF003 details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
								String mailId = hodDetails.getemail();
								String subject = AppConstantDryGoods.f003;
								String text = emailhtmlloader.dailyProductionCottonBallsHodF003(details);
								send_mail(mailId, emailSubject, text, subject);
							} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
									| InvalidKeySpecException e) {
								log.error("Unable to get Email details", e);
								throw new AppException("Unable to get Email details");
							}
						}
						
						
						// F004// Hod
						
						public void sendEmailToHodF004(MiniRoll details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
								String mailId = hodDetails.getemail();
								String subject = AppConstantDryGoods.f005;
								String text = emailhtmlloader.productionReportMiniRollF004(details);
								send_mail(mailId, emailSubject, text, subject);
							} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
									| InvalidKeySpecException e) {
								log.error("Unable to get Email details", e);
								throw new AppException("Unable to get Email details");
							}
						}
						
						
						//F005 //Supervisor
						
						
						public void sendEmailToSupervisorF005(DailyProductionDetailsPleateAndWoolRollF006 details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								  List<BleachHodHrQaDetails> supervisorDetailsList = userrepository.getDrGoodsDepartSupervisors();
								
								String subject = AppConstantDryGoods.f006;
								String text = emailhtmlloader.productionPleatWoolRollSupervisorF005(details);
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
						
						
//F005 //Hod
						
						

						public void sendEmailToHodF005(DailyProductionDetailsPleateAndWoolRollF006 details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
								String mailId = hodDetails.getemail();
								String subject = AppConstantDryGoods.f006;
								String text = emailhtmlloader.productionPleatWoolRollHodF005(details);
								send_mail(mailId, emailSubject, text, subject);
							} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
									| InvalidKeySpecException e) {
								log.error("Unable to get Email details", e);
								throw new AppException("Unable to get Email details");
							}
						}
						
						

						
						
						
//F008 //Hod
						
						

						public void sendEmailHodF008(LogBookHeader details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
								String mailId = hodDetails.getemail();
								String subject = AppConstantDryGoods.f010;
								String text = emailhtmlloader.goodsLogBookHodF008(details);
								send_mail(mailId, emailSubject, text, subject);
							} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
									| InvalidKeySpecException e) {
								log.error("Unable to get Email details", e);
								throw new AppException("Unable to get Email details");
							}
						}
						
						
						
						//F009 //Hod
						
						
						public void sendEmailF009Supervisor(SanitizationDetails details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
								String mailId = hodDetails.getemail();
								String subject = AppConstantDryGoods.f012;
								String text = emailhtmlloader.sanitizationOfMachinesAndSurfacesF009(details);
								send_mail(mailId, emailSubject, text, subject);
							} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
									| InvalidKeySpecException e) {
								log.error("Unable to get Email details", e);
								throw new AppException("Unable to get Email details");
							}
						}
						
						
						
						
//F009 //Qa
						
						

						public void sendEmailQaF006(GoodsProductChangeOverF09 details) {
							try {
								EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
								BleachHodHrQaDetails hodDetails = userrepository.getDrygoodsQADetails();
								String mailId = hodDetails.getemail();
								String subject =AppConstantDryGoods.f009;
								String text = emailhtmlloader.productionProductChangeOverQaF006(details);
								send_mail(mailId, emailSubject, text, subject);
							} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
									| InvalidKeySpecException e) {
								log.error("Unable to get Email details", e);
								throw new AppException("Unable to get Email details");
							}
						}
						
						
						
						
	
	// F009// hod
		public void sendEmailToHodF009(GoodsProductChangeOverF09 details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
				String mailId = hodDetails.getemail();
				String subject =  AppConstantDryGoods.f009;
				String text = emailhtmlloader.productChangeOverF009Hod(details);
				send_mail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		
		
		// F010// hod
				public void sendEmailToHodF010(GoodsHandSanitationF06 details) {
					try {
						EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
						BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
						String mailId = hodDetails.getemail();
						String subject = AppConstantDryGoods.f013;
						String text = emailhtmlloader.goodsHandSanitizationReportF010(details);
						send_mail(mailId, emailSubject, text, subject);
					} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
							| InvalidKeySpecException e) {
						log.error("Unable to get Email details", e);
						throw new AppException("Unable to get Email details");
					}
				}
		
		//F013
		
		public void sendEmailToHodF013(GoodsHandSanitationF06 details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
				String mailId = hodDetails.getemail();
				String subject = AppConstantDryGoods.f013;
				String text = emailhtmlloader.handSanitizationF013Hod(details);
				send_mail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		
		//F014 //Hr
		
		public void sendEmailToHrF014(DryGoodsHouseKeepingCheckListF14 details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
				String mailId = hodDetails.getemail();
				String subject =  AppConstantDryGoods.f014;
				String text = emailhtmlloader.houseKeepingF014HR(details);
				send_mail(mailId, emailSubject, text, subject);
			} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException | NoSuchPaddingException
					| InvalidKeySpecException e) {
				log.error("Unable to get Email details", e);
				throw new AppException("Unable to get Email details");
			}
		}
		
		public void sendEmailToHodF014Hod(DryGoodsHouseKeepingCheckListF14 details) {
			try {
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				BleachHodHrQaDetails hodDetails = userrepository.getDryGoodsDepartHOD();
				String mailId = hodDetails.getemail();
				String subject = AppConstantDryGoods.f014;
				String text = emailhtmlloader.houseKeepingF014Hod(details);
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
