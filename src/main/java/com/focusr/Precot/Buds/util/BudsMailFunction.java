package com.focusr.Precot.Buds.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.focusr.Precot.Buds.model.BudsDailyProductionSliverHeader;
import com.focusr.Precot.Buds.model.BudsEquipmentUsuageHeader;
import com.focusr.Precot.Buds.model.BudsLogbookHeader;
import com.focusr.Precot.Buds.model.BudsProductChangeOver;
import com.focusr.Precot.Buds.repository.BudsProductChangeOverRepository;
import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.BleachHodHrQaDetails;
import com.focusr.Precot.util.BleachMailFunction;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.EmailSubject;
import com.focusr.Precot.util.SCAUtil;

@Service
public class BudsMailFunction {

	
	
	@Autowired
	private BudsProductChangeOverRepository produtChangeOverRepository;
	
	@Autowired
	private EmailDetailsRepository emailDetailsRepository;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	BudsEmailHtmlLoader emailHtmlLoader;
	
	@Autowired
	BleachMailFunction mailFunction;
	
	private static final Logger logger = LoggerFactory.getLogger(BudsProductChangeOver.class);
	
	public void sendProductChangeOverMailInspector(BudsProductChangeOver productChangeOver) {
		
		try {
			
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = produtChangeOverRepository.getCottonBudsInspector();
			
			String mailId = hodDetails.getemail();
			
			String subject = AppConstantsBuds.productChangeSubject;
			String text = emailHtmlLoader.productChangeOverInspector(productChangeOver);
			
			mailFunction.send_mail(mailId, emailSubject, text, subject);
			
		} catch(Exception ex) {
			logger.error("!!! **** Unable to get mail details !!!***" + ex);
			throw new AppException("Failed to fetch mail details !!!" + ex.getMessage());
		}
		
	}
	
		// FOR HOD
	
	public void sendproductChangeOverMailHod(BudsProductChangeOver productChangeOver) {
		
		try {
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = produtChangeOverRepository.getCottonBudsHod();
			
			String mailId = hodDetails.getemail();
			String subject = AppConstantsBuds.productChangeSubject;
			
			String text = emailHtmlLoader.productChangeOverHod(productChangeOver);
			
			mailFunction.send_mail(mailId, emailSubject, text, subject);
			
		}catch(Exception ex) {
			logger.error("!!! **** Unable to get mail details !!!***" + ex);
			throw new AppException("Failed to fetch mail details !!!" + ex.getMessage());
		}
		
	}
	
		// LOGBOOK HEADER
	
	public void sendLogbookMailHod(BudsLogbookHeader logbookHeader) {
		
		try {
			
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = produtChangeOverRepository.getCottonBudsHod();
			
			String mailId = hodDetails.getemail();
			String subject = AppConstantsBuds.logbookSubject;
			
			String text = emailHtmlLoader.logbookHod(logbookHeader);
			
			mailFunction.send_mail(mailId, emailSubject, text, subject);
			
		} catch(Exception ex) {
			logger.error("!!! **** Unable to get mail details !!!***" + ex);
			throw new AppException("Failed to fetch mail details !!!" + ex.getMessage());
		}
		
	}
	
	
		// EQUIPMENT HEADER
	
	public void equipmentMailSupervisor(BudsEquipmentUsuageHeader equipmentUsuage) {
		
		try {
			
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = produtChangeOverRepository.getCottonBudsSupervisor();
			
			String mailId = hodDetails.getemail();
			String subject = AppConstantsBuds.equipmentSubject;
			
			String text = emailHtmlLoader.equipmentUsuageSupervisor(equipmentUsuage);
			
			mailFunction.send_mail(mailId, emailSubject, text, subject);
			
		} catch(Exception ex) {
			logger.error("!!! **** Unable to get mail details !!!***" + ex);
			throw new AppException("Failed to fetch mail details !!!" + ex.getMessage());
		}
		
	}
	
	public void equipmentMailHod(BudsEquipmentUsuageHeader equipmentUsuage) {
		
		try {
			
			EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
			BleachHodHrQaDetails hodDetails = produtChangeOverRepository.getCottonBudsHod();
			
			String mailId = hodDetails.getemail();
			String subject = AppConstantsBuds.equipmentSubject;
			
			String text = emailHtmlLoader.equipmentUsuageHod(equipmentUsuage);
			
			mailFunction.send_mail(mailId, emailSubject, text, subject);
			
		} catch(Exception ex) {
			logger.error("!!! **** Unable to get mail details !!!***" + ex);
			throw new AppException("Failed to fetch mail details !!!" + ex.getMessage());
		}
		
	}
	
	// DAILY SLIVER PRODUCTION HEADER
	
		public void sliverProductionMailSupervisor(BudsDailyProductionSliverHeader equipmentUsuage) {
			
			try {
				
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				BleachHodHrQaDetails hodDetails = produtChangeOverRepository.getCottonBudsSupervisor();
				
				String mailId = hodDetails.getemail();
				String subject = AppConstantsBuds.sliverproductionSubject;
				
				String text = emailHtmlLoader.sliverProductionSupervisor(equipmentUsuage);
				
				mailFunction.send_mail(mailId, emailSubject, text, subject);
				
			} catch(Exception ex) {
				logger.error("!!! **** Unable to get mail details !!!***" + ex);
				throw new AppException("Failed to fetch mail details !!!" + ex.getMessage());
			}
			
		}
		
		public void sliverProductionMailHod(BudsDailyProductionSliverHeader equipmentUsuage) {
			
			try {
				
				EmailSubject emailSubject = EmailSubject.getInstance(emailDetailsRepository);
				BleachHodHrQaDetails hodDetails = produtChangeOverRepository.getCottonBudsHod();
				
				String mailId = hodDetails.getemail();
				String subject = AppConstantsBuds.sliverproductionSubject;
				
				String text = emailHtmlLoader.sliverProductionHod(equipmentUsuage);
				
				mailFunction.send_mail(mailId, emailSubject, text, subject);
				
			} catch(Exception ex) {
				logger.error("!!! **** Unable to get mail details !!!***" + ex);
				throw new AppException("Failed to fetch mail details !!!" + ex.getMessage());
			}
			
		}
	
}
