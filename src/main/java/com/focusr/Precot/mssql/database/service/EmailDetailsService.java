package com.focusr.Precot.mssql.database.service;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.exception.AppException;
import com.focusr.Precot.exception.ResourceNotFoundException;
import com.focusr.Precot.mssql.database.model.EmailDetails;
import com.focusr.Precot.mssql.database.model.MsXoauthSMTP;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.MsXoauthSMTPRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.EncryptionUtil;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.XoauthEncryptionUtil;

@Service
public class EmailDetailsService {

	@Autowired
	private EmailDetailsRepository emailDetailsRepository;
	
	@Autowired
	private MsXoauthSMTPRepository msXoauthSMTPRepo;

	private EncryptionUtil encryptionUtil;
	
	private XoauthEncryptionUtil xoauthEncryptionUtil;

	public EmailDetails findEmailDetails(String username) {

		EmailDetails emailDetailsList = emailDetailsRepository.findOneEmailDetails()
				.orElseThrow(() -> new ResourceNotFoundException("SMTP details  does not exist!", "", ""));

		try {

			encryptionUtil = EncryptionUtil.getInstance();

			encryptionUtil.decryptEmailDetails(emailDetailsList);

		} catch (Exception e) {
			throw new AppException("Unable to get Email details");
		}

		return emailDetailsList;
	}

	public EmailDetails saveOrUpdateEmailDetails(EmailDetails emailDetails) {

		try {

			encryptionUtil = EncryptionUtil.getInstance();

			encryptionUtil.encryptEmailDetails(emailDetails);

			emailDetailsRepository.save(emailDetails);

			encryptionUtil.decryptEmailDetails(emailDetails);
			return emailDetails;

		} catch (Exception e) {
			throw new AppException("Unable to update Email details");
		}

	}
	


	public boolean updateSMTP(Long id, EmailDetails emailDetails) {
		
		Optional<EmailDetails> emailDetail = emailDetailsRepository.findById(id);
		if (emailDetail.isPresent()) {

			try {
				EmailDetails existingEmailDetails = emailDetail.get();
				 existingEmailDetails.setSmtp_host(emailDetails.getSmtp_host());
				 existingEmailDetails.setPort(emailDetails.getPort());
				 existingEmailDetails.setUsername(emailDetails.getUsername());
				 existingEmailDetails.setPassword(emailDetails.getPassword());
				encryptionUtil = EncryptionUtil.getInstance();

				encryptionUtil.encryptEmailDetails(existingEmailDetails);

				emailDetailsRepository.save(existingEmailDetails);

				return true;

			} catch (Exception e) {
				throw new AppException("Unable to update Email details");
			}

		} else {
			return false;
		}
	}

	// GetById
	public EmailDetails findById(Long id)

	{

		EmailDetails emailDetails = emailDetailsRepository.findById(id).orElseThrow(

				() -> new ResourceNotFoundException("SMTP details  does not exist!", "", ""));

		try {

			encryptionUtil = EncryptionUtil.getInstance();

			encryptionUtil.decryptEmailDetails(emailDetails);

		} catch (Exception e) {

			throw new AppException("Unable to get Email details");

		}

		return emailDetails;

	}

	 // delete--priya

	public void deleteById(Long id) {
		EmailDetails emailDetails = emailDetailsRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("SMTP details with ID " + id + " does not exist!", "", ""));

		emailDetailsRepository.delete(emailDetails);
	}

	public void deleteAll() {
		emailDetailsRepository.deleteAll();
	}

	
	// Create and updates SMTP for XOAUTH......
	public ResponseEntity<?> createOrUpdateXOAUTHSMTPDetails(MsXoauthSMTP msXoauthAuth, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		try {

//			xoauthEncryptionUtil = XoauthEncryptionUtil.getInstance();
//
//			xoauthEncryptionUtil.encryptEmailDetails(msXoauthAuth);

			msXoauthSMTPRepo.save(msXoauthAuth);

//			xoauthEncryptionUtil.decryptEmailDetails(msXoauthAuth);

		} catch (Exception e) {

			// log.error("***!!! Unable to Retrive Project!!! ***");

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Facing issue to get Project!" + msg),
					HttpStatus.BAD_REQUEST);

		}
		return new ResponseEntity(msXoauthAuth, HttpStatus.OK);
	}
}
