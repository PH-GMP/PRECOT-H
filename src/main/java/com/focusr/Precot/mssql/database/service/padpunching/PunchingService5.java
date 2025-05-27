package com.focusr.Precot.mssql.database.service.padpunching;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHandSanitizationABPressHistoryF41;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingSanitationListF24;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingHandSanitationHistoryF24;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingProductChangeOverHistoryF03;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingSanitationListHistoryF24;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.PunchingHandSanitationRepositoryF24;
import com.focusr.Precot.mssql.database.repository.padpunching.PunchingProductChangeOverRepositoryF03;
import com.focusr.Precot.mssql.database.repository.padpunching.PunchingSanitationListRepositoryF24;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PunchingHandSanitationHistoryRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PunchingProductChangeOverRepositoryHistoryF03;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PunchingSanitationListHistoryRepository;
import com.focusr.Precot.mssql.database.service.splunance.SpulanceService5;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.padpunching.PadPunchingMailFunction;

/**
 * @author Jawahar.M
 * F03 - Product Change Over,
 * F24 - Hand Sanitation List
 */

@Service
public class PunchingService5 {

	Logger logger = LoggerFactory.getLogger(PunchingService5.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserImageDetailsRepository imageRepository;
	
	@Autowired
	private PunchingProductChangeOverRepositoryF03 productChangeOverRepositoryF03;
	
	@Autowired
	private PunchingProductChangeOverRepositoryHistoryF03 productChangeOverRepositoryHistoryF03;
	
	@Autowired
	private PunchingHandSanitationRepositoryF24 handSanitationRepository;
	
	@Autowired
	private PunchingSanitationListRepositoryF24 sanitationListRepository;
	
	@Autowired
	private PunchingHandSanitationHistoryRepository handSanitationRepositoryHistory;
	
	@Autowired
	private PunchingSanitationListHistoryRepository sanitationListHistoyRepository;
	
	@Autowired
	private PadPunchingMailFunction padPunchingMailFunction;
	
	
			// ****** F03 --> PRODUCT CHANGE OVER *********** 
	
	public ResponseEntity<?> saveProductChangeOver(PunchingProductChangeOverF03 productChangeOver, HttpServletRequest http) {
		
		PunchingProductChangeOverF03 punchingExistingObj;
		
		try {
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			
			Long id = productChangeOver.getProductId();
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				if(id != null) {
					punchingExistingObj = productChangeOverRepositoryF03.productChangeoverDetailsById(id);
					
					productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
					productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
				} 
				
				productChangeOver.setSupervisor_status(AppConstants.supervisorSave);
				productChangeOver.setSupervisor_sign(userName);
				productChangeOver.setSupervisor_save_id(userId);
				productChangeOver.setSupervisor_save_on(date);
				
				productChangeOverRepositoryF03.save(productChangeOver);
				
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save product change over form !!!"), HttpStatus.BAD_REQUEST);
			}
			
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Product Change over" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Save Product Change over" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity(productChangeOver, HttpStatus.OK);
		
	}
	
	
	public ResponseEntity<?> submitProductChangeOver(PunchingProductChangeOverF03 productChangeOver, HttpServletRequest http) {
		
		PunchingProductChangeOverF03 punchingExistingObj;
		
		try {
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			
			Long id = productChangeOver.getProductId();
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				if(id != null) {
					punchingExistingObj = productChangeOverRepositoryF03.productChangeoverDetailsById(id);
					
					productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
					productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
					
					productChangeOver.setSupervisor_save_by(punchingExistingObj.getSupervisor_save_by());
					productChangeOver.setSupervisor_save_id(punchingExistingObj.getSupervisor_save_id());
					productChangeOver.setSupervisor_save_on(punchingExistingObj.getSupervisor_save_on());
				} 
				
				productChangeOver.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				productChangeOver.setSupervisor_sign(userName);
				productChangeOver.setSupervisor_submit_id(userId);
				productChangeOver.setSupervisor_submit_by(userName);
				productChangeOver.setSupervisor_submit_on(date);
				
				productChangeOver.setHod_status(AppConstants.waitingStatus);
				productChangeOver.setQa_status("");
				
					// SAVE IMAGE
				
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				productChangeOver.setSupervisor_signature_image(signature);
				
				productChangeOverRepositoryF03.save(productChangeOver);
				
						// SAVE HISTORY 
				
				PunchingProductChangeOverHistoryF03 productChangeOverHistoryF03 = new PunchingProductChangeOverHistoryF03();
				BeanUtils.copyProperties(productChangeOver, productChangeOverHistoryF03, "productId");
				
					// SET VERSION BASED ON UNIQUE FIELDS
				
				String historyDate = productChangeOverHistoryF03.getDate();
				String historyShift = productChangeOverHistoryF03.getShift();
				String historyMachine = productChangeOverHistoryF03.getMachineName();
				
				int version = productChangeOverRepositoryHistoryF03.getMaximumVersion(historyDate, historyShift, historyMachine).map(temp -> temp + 1).orElse(1);
				
				System.out.println("Version" + version);
				
				productChangeOverHistoryF03.setVersion(version);
				
				productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);
				
						// SEND MAIL 
				
				try {

					padPunchingMailFunction.sendEmailToHodF003(productChangeOver);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
				
				
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Submit product change over form !!!"), HttpStatus.BAD_REQUEST);
			}
			
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Product Change over" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit Product Change over" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Successfully"), HttpStatus.OK);
		
	}
	
	public ResponseEntity<?> getProductDetailsbyUniquefIELD(String date, String shift, String machine) {
		
		PunchingProductChangeOverF03 punchingProductChangeOverF03;
		
		try {
			punchingProductChangeOverF03 = productChangeOverRepositoryF03.productChangeoverDetailsByDateMachineShift(date, shift, machine);
			
			if(punchingProductChangeOverF03 == null) {
				return new ResponseEntity(new ApiResponse(false, "No Records Found"),
						HttpStatus.BAD_REQUEST);
			}
			
		}  catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Product Change over Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Product Change over Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(punchingProductChangeOverF03, HttpStatus.OK);
		
	}
	
	public ResponseEntity<?> getSummaryRoles() {
		
		List<PunchingProductChangeOverF03> productChangeOverF03List = new ArrayList<>();
		
		try {
			String userRole = getUserRole();
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				productChangeOverF03List = productChangeOverRepositoryF03.getPunchingSupervisorSummary();
				
			} else if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE") || userRole.equalsIgnoreCase("ROLE_QA"))  {
				productChangeOverF03List = productChangeOverRepositoryF03.getPunchingHodQASummary();
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access form !!!"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Product Change over Summary Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Product Change over  Summary Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(productChangeOverF03List, HttpStatus.OK);
	}
	
	
//	public ResponseEntity<?> approveRejectProductChangeOver(ApproveResponse approveResponse, HttpServletRequest http) {
//
//		String userRole = getUserRole();
//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//		String userName = userRepository.getUserName(userId);
//		LocalDateTime currentDate = LocalDateTime.now();
//		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//		try {
//
//			PunchingProductChangeOverF03 productChangeOverF03 = productChangeOverRepositoryF03
//					.productChangeoverDetailsById(approveResponse.getId());
//
//			PunchingProductChangeOverHistoryF03 productChangeOverHistoryF03 = new PunchingProductChangeOverHistoryF03();
//
//			String supervisorStatus = productChangeOverF03.getSupervisor_status();
//
//			String hodStatus = productChangeOverF03.getHod_status();
//
//			UserImageDetails imageDetails = new UserImageDetails();
//
//			if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
//
//				if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
//						&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
//
//					if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
//
//						productChangeOverF03.setHod_status(AppConstants.hodApprovedStatus);
//						productChangeOverF03.setHod_submit_by(userName);
//						productChangeOverF03.setHod_submit_id(userId);
//						productChangeOverF03.setHod_submit_on(date);
//						productChangeOverF03.setQa_status(AppConstants.waitingStatus);
//
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						productChangeOverF03.setHod_signature_image(signature);
//
//						productChangeOverF03.setHod_sign(userName);
//
//						productChangeOverRepositoryF03.save(productChangeOverF03);
//
//						// HISTORY
//
//						productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(
//								productChangeOverF03.getDate(), productChangeOverF03.getShift(),
//								productChangeOverF03.getMachineName());
//						productChangeOverHistoryF03.setHod_status(AppConstants.hodApprovedStatus);
//						productChangeOverHistoryF03.setHod_submit_on(date);
//						productChangeOverHistoryF03.setHod_submit_by(userName);
//						productChangeOverHistoryF03.setHod_submit_id(userId);
//						productChangeOverHistoryF03.setHod_sign(userName);
//
//						productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);
//
//						return new ResponseEntity(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);
//
//					} else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
//
//						productChangeOverF03.setHod_status(AppConstants.hodRejectedStatus);
//						productChangeOverF03.setHod_submit_by(userName);
//						productChangeOverF03.setHod_submit_id(userId);
//						productChangeOverF03.setHod_submit_on(date);
//
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						productChangeOverF03.setHod_signature_image(signature);
//
//						productChangeOverF03.setHod_sign(userName);
//
//						productChangeOverRepositoryF03.save(productChangeOverF03);
//
//						// HISTORY
//
//						productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(
//								productChangeOverF03.getDate(), productChangeOverF03.getShift(),
//								productChangeOverF03.getMachineName());
//						productChangeOverHistoryF03.setHod_status(AppConstants.hodRejectedStatus);
//						productChangeOverHistoryF03.setHod_submit_on(date);
//						productChangeOverHistoryF03.setHod_submit_by(userName);
//						productChangeOverHistoryF03.setHod_submit_id(userId);
//						productChangeOverHistoryF03.setHod_sign(userName);
//
//						productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);
//
//						return new ResponseEntity(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);
//
//					}
//
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status to Hod Approve"),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			} else if (userRole.equalsIgnoreCase("ROLE_QA")) {
//
//				if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
//						&& hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus)
//						&& productChangeOverF03.getQa_status().equalsIgnoreCase(AppConstants.waitingStatus)) {
//
//					if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
//
//						productChangeOverF03.setQa_status(AppConstants.qaApprovedStatus);
//						productChangeOverF03.setQa_submit_by(userName);
//						productChangeOverF03.setQa_submit_id(userId);
//						productChangeOverF03.setQa_submit_on(date);
//
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						productChangeOverF03.setQa_signature_image(signature);
//
//						productChangeOverF03.setQa_sign(userName);
//
//						productChangeOverRepositoryF03.save(productChangeOverF03);
//
//						// HISTORY
//
//						productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(
//								productChangeOverF03.getDate(), productChangeOverF03.getShift(),
//								productChangeOverF03.getMachineName());
//						productChangeOverHistoryF03.setQa_status(AppConstants.qaApprovedStatus);
//						productChangeOverHistoryF03.setQa_submit_on(date);
//						productChangeOverHistoryF03.setQa_submit_by(userName);
//						productChangeOverHistoryF03.setQa_submit_id(userId);
//						productChangeOverHistoryF03.setQa_sign(userName);
//
//						productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);
//
//						return new ResponseEntity(new ApiResponse(true, "QA Approved Successfully"), HttpStatus.OK);
//
//					} else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
//
//						productChangeOverF03.setQa_status(AppConstants.qaRejectedStatus);
//						productChangeOverF03.setQa_submit_by(userName);
//						productChangeOverF03.setQa_submit_id(userId);
//						productChangeOverF03.setQa_submit_on(date);
//
//						Optional<UserImageDetails> imageDetailsOpt = imageRepository
//								.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						productChangeOverF03.setQa_signature_image(signature);
//
//						productChangeOverF03.setQa_sign(userName);
//
//						productChangeOverRepositoryF03.save(productChangeOverF03);
//
//						// HISTORY
//
//						productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(
//								productChangeOverF03.getDate(), productChangeOverF03.getShift(),
//								productChangeOverF03.getMachineName());
//						productChangeOverHistoryF03.setQa_status(AppConstants.qaRejectedStatus);
//						productChangeOverHistoryF03.setQa_submit_on(date);
//						productChangeOverHistoryF03.setQa_submit_by(userName);
//						productChangeOverHistoryF03.setQa_submit_id(userId);
//						productChangeOverHistoryF03.setQa_sign(userName);
//
//						productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);
//
//						return new ResponseEntity(new ApiResponse(true, "QA Rejected Successfully"), HttpStatus.OK);
//
//					}
//
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "Invalid Status to Hod Approve"),
//							HttpStatus.BAD_REQUEST);
//				}
//			} else {
//				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to approve form !!!"),
//						HttpStatus.BAD_REQUEST);
//			}
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Get Product Change over Summary Details" + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(
//					new ApiResponse(false, "Failed to Get Product Change over  Summary Details" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}
	
	public ResponseEntity<?> approveRejectProductChangeOver(ApproveResponse approveResponse, HttpServletRequest http) {
	    String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	    try {
	        PunchingProductChangeOverF03 productChangeOverF03 = productChangeOverRepositoryF03.productChangeoverDetailsById(approveResponse.getId());

	        PunchingProductChangeOverHistoryF03 productChangeOverHistoryF03 = new PunchingProductChangeOverHistoryF03();

	        String supervisorStatus = productChangeOverF03.getSupervisor_status();
	        String hodStatus = productChangeOverF03.getHod_status();

	        if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

	            if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

	                if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
	                    productChangeOverF03.setHod_status(AppConstants.hodApprovedStatus);
	                    productChangeOverF03.setHod_submit_by(userName);
	                    productChangeOverF03.setHod_submit_id(userId);
	                    productChangeOverF03.setHod_submit_on(date);
	                    productChangeOverF03.setQa_status(AppConstants.waitingStatus);

	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    productChangeOverF03.setHod_signature_image(signature);
	                    productChangeOverF03.setHod_sign(userName);

	                    productChangeOverRepositoryF03.save(productChangeOverF03);

	                    // HISTORY
	                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getShift(), productChangeOverF03.getMachineName());
	                    productChangeOverHistoryF03.setHod_status(AppConstants.hodApprovedStatus);
	                    productChangeOverHistoryF03.setHod_submit_on(date);
	                    productChangeOverHistoryF03.setHod_submit_by(userName);
	                    productChangeOverHistoryF03.setHod_submit_id(userId);
	                    productChangeOverHistoryF03.setHod_sign(userName);

	                    productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);
	                    
	                    try {

	    					padPunchingMailFunction.sendEmailToQAF003(productChangeOverF03);
	    				} catch (Exception ex) {
	    					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
	    							HttpStatus.OK);
	    				}

	                    return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

	                } else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
	                    productChangeOverF03.setHod_status(AppConstants.hodRejectedStatus);
	                    productChangeOverF03.setHod_submit_by(userName);
	                    productChangeOverF03.setHod_submit_id(userId);
	                    productChangeOverF03.setHod_submit_on(date);

	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    productChangeOverF03.setHod_signature_image(signature);
	                    productChangeOverF03.setHod_sign(userName);
	                    
	                    productChangeOverF03.setReason(approveResponse.getRemarks());

	                    productChangeOverRepositoryF03.save(productChangeOverF03);

	                    // HISTORY
	                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getShift(), productChangeOverF03.getMachineName());
	                    productChangeOverHistoryF03.setHod_status(AppConstants.hodRejectedStatus);
	                    productChangeOverHistoryF03.setHod_submit_on(date);
	                    productChangeOverHistoryF03.setHod_submit_by(userName);
	                    productChangeOverHistoryF03.setHod_submit_id(userId);
	                    productChangeOverHistoryF03.setHod_sign(userName);

	                    productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);

	                    return new ResponseEntity<>(new ApiResponse(true, "HOD Rejected Successfully"), HttpStatus.OK);
	                }

	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "please check Supervisor is Approved or not"), HttpStatus.BAD_REQUEST);
	            }

	        } else if (userRole.equalsIgnoreCase("ROLE_QA")) {

	            if (supervisorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus) && productChangeOverF03.getQa_status().equalsIgnoreCase(AppConstants.waitingStatus)) {

	                if (approveResponse.getStatus().equalsIgnoreCase("Approve")) {
	                    productChangeOverF03.setQa_status(AppConstants.qaApprovedStatus);
	                    productChangeOverF03.setQa_submit_by(userName);
	                    productChangeOverF03.setQa_submit_id(userId);
	                    productChangeOverF03.setQa_submit_on(date);

	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    productChangeOverF03.setQa_signature_image(signature);
	                    productChangeOverF03.setQa_sign(userName);

	                    productChangeOverRepositoryF03.save(productChangeOverF03);

	                    // HISTORY
	                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getShift(), productChangeOverF03.getMachineName());
	                    productChangeOverHistoryF03.setQa_status(AppConstants.qaApprovedStatus);
	                    productChangeOverHistoryF03.setQa_submit_on(date);
	                    productChangeOverHistoryF03.setQa_submit_by(userName);
	                    productChangeOverHistoryF03.setQa_submit_id(userId);
	                    productChangeOverHistoryF03.setQa_sign(userName);

	                    productChangeOverHistoryF03.setReason(approveResponse.getRemarks());
	                    
	                    productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);

	                    return new ResponseEntity<>(new ApiResponse(true, "QA Approved Successfully"), HttpStatus.OK);

	                } else if (approveResponse.getStatus().equalsIgnoreCase("Reject")) {
	                    productChangeOverF03.setQa_status(AppConstants.qaRejectedStatus);
	                    productChangeOverF03.setQa_submit_by(userName);
	                    productChangeOverF03.setQa_submit_id(userId);
	                    productChangeOverF03.setQa_submit_on(date);

	                    Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
	                    byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
	                    productChangeOverF03.setQa_signature_image(signature);
	                    productChangeOverF03.setQa_sign(userName);

	                    productChangeOverF03.setReason(approveResponse.getRemarks());
	                    
	                    productChangeOverRepositoryF03.save(productChangeOverF03);

	                    // HISTORY
	                    productChangeOverHistoryF03 = productChangeOverRepositoryHistoryF03.findLastSubmittedRecord(productChangeOverF03.getDate(), productChangeOverF03.getShift(), productChangeOverF03.getMachineName());
	                    productChangeOverHistoryF03.setQa_status(AppConstants.qaRejectedStatus);
	                    productChangeOverHistoryF03.setQa_submit_on(date);
	                    productChangeOverHistoryF03.setQa_submit_by(userName);
	                    productChangeOverHistoryF03.setQa_submit_id(userId);
	                    productChangeOverHistoryF03.setQa_sign(userName);
	                    
	                    productChangeOverHistoryF03.setReason(approveResponse.getRemarks());

	                    productChangeOverRepositoryHistoryF03.save(productChangeOverHistoryF03);

	                    return new ResponseEntity<>(new ApiResponse(true, "QA Rejected Successfully"), HttpStatus.OK);
	                }

	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "please check Hod Approvals !!!"), HttpStatus.BAD_REQUEST);
	            }
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to approve form !!!"), HttpStatus.BAD_REQUEST);
	        }

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to Get Product Change over Summary Details" + msg);
	        ex.printStackTrace();

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Get Product Change over Summary Details: " + msg), HttpStatus.BAD_REQUEST);
	    }
	    
	    return null;
	}

	
		// FOR PRINT 
	public ResponseEntity<?> fetchPunchingPrintParameters(String date, String shift, String machine) {
		
		List<PunchingProductChangeOverF03> productChangeOverF03List = new ArrayList<>();
		
		try {
			
			System.out.println("Date" + date + "Shuft" + shift + "Machine" + machine);
			
			productChangeOverF03List = productChangeOverRepositoryF03.productChangeoverDetailsPrint(date, shift, machine);
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Get Product Change over Summary Details" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Get Product Change over  Summary Details" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(productChangeOverF03List, HttpStatus.OK);
	}
	
	
		// SAVE HAND SANITATION REPORT
	
	@SuppressWarnings("null")
	public ResponseEntity<?> saveHandSanitation(PunchingHandSanitationF24 productChangeOver, HttpServletRequest http) {
		
		PunchingHandSanitationF24 punchingExistingObj;
		
		try {
			
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			
			Long id = productChangeOver.getHandSanitizationId();
			
			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
				
				if(id != null) {
					punchingExistingObj = handSanitationRepository.fetchHandSanitizationABPressF41ById(id);
					
					productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
					productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
					
					List<PunchingSanitationListF24> sanitationListF24 = productChangeOver.getSanitizationList();
					
					if(sanitationListF24 != null || !sanitationListF24.isEmpty()) {
						
						for(PunchingSanitationListF24 punchSanitationList : sanitationListF24) {
							
							Long sanitationId = punchSanitationList.getId();
							
							if(sanitationId != null) {
								PunchingSanitationListF24 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
								
								punchSanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
								punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
								punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
								punchSanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
							}
							
							sanitationListRepository.save(punchSanitationList);
						}
						
					}
					
				} 
				
				productChangeOver.setSupervisor_status(AppConstants.supervisorSave);
				productChangeOver.setSupervisor_sign(userName);
				productChangeOver.setSupervisor_save_id(userId);
				productChangeOver.setSupervisor_save_on(date);
				
				handSanitationRepository.save(productChangeOver);
				
				List<PunchingSanitationListF24> sanitationListF24 = productChangeOver.getSanitizationList();
				
				for(PunchingSanitationListF24 punchSanitationList : sanitationListF24) {
					
					Long sanitationId = punchSanitationList.getId();
					
					if(sanitationId != null) {
						PunchingSanitationListF24 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
						
						punchSanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
						punchSanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
						punchSanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
						punchSanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
					}
					
					sanitationListRepository.save(punchSanitationList);
				}
				
				
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save hand sanitation form !!!"), HttpStatus.BAD_REQUEST);
			}
			
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save hand sanitation form" + msg);
			ex.printStackTrace();

			return new ResponseEntity(new ApiResponse(false, "Failed to Save hand sanitation form" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity(productChangeOver, HttpStatus.OK);
		
	}
	
	
	// SUBMIT HAND SANITATION REPORT
	
//	public ResponseEntity<?> submitHandSanitationReport(PunchingHandSanitationF24 productChangeOver, HttpServletRequest http) {
//		
//		PunchingHandSanitationF24 punchingExistingObj;
//		
//		try {
//			
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			
//			Long id = productChangeOver.getHandSanitizationId();
//			
//			if(userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
//				
//				if(id != null) {
//					punchingExistingObj = handSanitationRepository.fetchHandSanitizationABPressF41ById(id);
//					
//					productChangeOver.setCreatedAt(punchingExistingObj.getCreatedAt());
//					productChangeOver.setCreatedBy(punchingExistingObj.getCreatedBy());
//					
//					productChangeOver.setSupervisor_save_by(punchingExistingObj.getSupervisor_save_by());
//					productChangeOver.setSupervisor_save_id(punchingExistingObj.getSupervisor_save_id());
//					productChangeOver.setSupervisor_save_on(punchingExistingObj.getSupervisor_save_on());
//					
//					List<PunchingSanitationListF24> sanitationListF24s = productChangeOver.getSanitizationList();
//					
////					for(PunchingSanitationListF24 sanitationListpunch : sanitationListF24s) {
////						
////						Long sanitationId = sanitationListpunch.getId();
////						
////						if(sanitationId != null) {
////							PunchingSanitationListF24 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
////							
////							sanitationListpunch.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
////							sanitationListpunch.setCreatedAt(existingSanitationObj.getCreatedAt());
////							sanitationListpunch.setCreatedBy(existingSanitationObj.getCreatedBy());
////						}
////						
////						sanitationListRepository.save(sanitationListpunch);
////						
////					}
//				} 
//				
//				productChangeOver.setSupervisor_status(AppConstants.supervisorApprovedStatus);
//				productChangeOver.setSupervisor_sign(userName);
//				productChangeOver.setSupervisor_submit_id(userId);
//				productChangeOver.setSupervisor_submit_by(userName);
//				productChangeOver.setSupervisor_submit_on(date);
//				
//				productChangeOver.setHod_status(AppConstants.waitingStatus);
//				
//				handSanitationRepository.save(productChangeOver);
//				
//				List<PunchingSanitationListF24> sanitationListF24s = productChangeOver.getSanitizationList();
//				
//				for(PunchingSanitationListF24 sanitationListpunch : sanitationListF24s) {
//					
//					Long sanitationId = sanitationListpunch.getId();
//					
//					System.out.println("Sanitation" + sanitationId);
//					
//					if(sanitationId != null) {
//						PunchingSanitationListF24 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
//						
//						sanitationListpunch.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
//						sanitationListpunch.setCreatedAt(existingSanitationObj.getCreatedAt());
//						sanitationListpunch.setCreatedBy(existingSanitationObj.getCreatedBy());
//					}
//					
//					sanitationListRepository.save(sanitationListpunch);
//					
//				}
//				
//				
//						// SAVE HISTORY 
//				
//				PunchingHandSanitationHistoryF24 productChangeOverHistoryF03 = new PunchingHandSanitationHistoryF24();
//				
//				productChangeOverHistoryF03.setUnit(productChangeOver.getUnit());
//				productChangeOverHistoryF03.setFormatName(productChangeOver.getFormatName());
//				productChangeOverHistoryF03.setFormatNo(productChangeOver.getFormatNo());
//				productChangeOverHistoryF03.setRevisionNo(productChangeOver.getRevisionNo());
//				productChangeOverHistoryF03.setSopNumber(productChangeOver.getSopNumber());
//				productChangeOverHistoryF03.setDate(productChangeOver.getDate());
//				productChangeOverHistoryF03.setShift(productChangeOver.getShift());
//				
//					// STATUS
//				productChangeOverHistoryF03.setSupervisor_status(productChangeOver.getSupervisor_status());
//				productChangeOverHistoryF03.setSupervisor_sign(productChangeOver.getSupervisor_sign());
//				productChangeOverHistoryF03.setSupervisor_submit_by(productChangeOver.getSupervisor_submit_by());
//				productChangeOverHistoryF03.setSupervisor_submit_id(productChangeOver.getSupervisor_submit_id());
//				productChangeOverHistoryF03.setSupervisor_submit_on(productChangeOver.getSupervisor_submit_on());
//				productChangeOverHistoryF03.setHod_status(productChangeOver.getHod_status());
//				
//					// SET VERSION BASED ON UNIQUE FIELDS
//				
//				String historyDate = productChangeOverHistoryF03.getDate();
//				String historyShift = productChangeOverHistoryF03.getShift();
//				
//				
//				int version = handSanitationRepositoryHistory.getMaximumVersion(historyDate, historyShift).map(temp -> temp + 1).orElse(1);
//				
//				System.out.println("Version" + version);
//				
//				productChangeOverHistoryF03.setVersion(version);
//				
//				handSanitationRepositoryHistory.save(productChangeOverHistoryF03);
//				
//				
//				for(PunchingSanitationListF24 sanitationListHistoryF24 : productChangeOver.getSanitizationList()) {
//					
//					PunchingSanitationListHistoryF24 history = new PunchingSanitationListHistoryF24();
//					
//					Long historyId = productChangeOverHistoryF03.getHandSanitizationId();
//					
////					Long sanitationId = sanitationListHistoryF24.getId();
//					
//					history.setHandSanitizationId(historyId);
//					history.setHour1(sanitationListHistoryF24.getHour1());
//					history.setHour2(sanitationListHistoryF24.getHour2());
//					history.setHour3(sanitationListHistoryF24.getHour3());
//					history.setHour4(sanitationListHistoryF24.getHour4());
//					history.setHour5(sanitationListHistoryF24.getHour5());
//					history.setHour6(sanitationListHistoryF24.getHour6());
//					history.setHour7(sanitationListHistoryF24.getHour7());
//					history.setHour8(sanitationListHistoryF24.getHour8());
//					history.setIdNumber(sanitationListHistoryF24.getIdNumber());
//					history.setRemarks(sanitationListHistoryF24.getRemarks());
//					history.setSerialNumber(sanitationListHistoryF24.getSerialNumber());
//					history.setName(sanitationListHistoryF24.getName());
//					
//					sanitationListHistoyRepository.save(history);
//					
//				}
//				
//						// SEND MAIL 
//				
////				try {
////
////					bleachmailfunction.sendEmailToHOD42(details);
////				} catch (Exception ex) {
////					return new ResponseEntity<>(new ApiResponse(false, "Unable to send mail to HOD! "),
////							HttpStatus.BAD_REQUEST);
////				}
//				
//				
//			} else {
//				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Submit hand Sanitation form !!!"), HttpStatus.BAD_REQUEST);
//			}
//			
//			
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Submit hand Sanitation form" + msg);
//			ex.printStackTrace();
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to Submit hand Sanitation form" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(new ApiResponse(true,"Supervisior Submitted Successfully"), HttpStatus.OK);
//		
//	}
	
	
	public ResponseEntity<?> submitHandSanitationReport(PunchingHandSanitationF24 productChangeOver, HttpServletRequest http) {
	    PunchingHandSanitationF24 punchingExistingObj;

	    try {
	        String userRole = getUserRole();
	        Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	        String userName = userRepository.getUserName(userId);
	        LocalDateTime currentDate = LocalDateTime.now();
	        Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	        if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {
	            Long id = productChangeOver.getHandSanitizationId();

	            if (id != null) {
	                punchingExistingObj = handSanitationRepository.fetchHandSanitizationABPressF41ById(id);
	                if (punchingExistingObj == null) {
	                    return new ResponseEntity<>(new ApiResponse(false, "Record not found for update"), HttpStatus.NOT_FOUND);
	                }
	                updateExistingRecord(productChangeOver, punchingExistingObj);
	            }

	            saveSupervisorDetails(productChangeOver, userId, userName, date);
	            handSanitationRepository.save(productChangeOver);

	            processSanitizationList(productChangeOver.getSanitizationList());

	            saveHistory(productChangeOver, date);

//	             SEND MAIL 
	            try {

					padPunchingMailFunction.sendEmailToHodF006(productChangeOver);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}

	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to Submit hand Sanitation form !!!"), HttpStatus.BAD_REQUEST);
	        }

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to Submit hand Sanitation form: " + msg);
	        ex.printStackTrace();
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Submit hand Sanitation form: " + msg), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(new ApiResponse(true, "Supervisor Submitted Successfully"), HttpStatus.OK);
	}

	private void updateExistingRecord(PunchingHandSanitationF24 newRecord, PunchingHandSanitationF24 existingRecord) {
	    newRecord.setCreatedAt(existingRecord.getCreatedAt());
	    newRecord.setCreatedBy(existingRecord.getCreatedBy());
	    newRecord.setSupervisor_save_by(existingRecord.getSupervisor_save_by());
	    newRecord.setSupervisor_save_id(existingRecord.getSupervisor_save_id());
	    newRecord.setSupervisor_save_on(existingRecord.getSupervisor_save_on());
	}

	private void saveSupervisorDetails(PunchingHandSanitationF24 record, Long userId, String userName, Date date) {
	    record.setSupervisor_status(AppConstants.supervisorApprovedStatus);
	    record.setSupervisor_sign(userName);
	    record.setSupervisor_submit_id(userId);
	    record.setSupervisor_submit_by(userName);
	    record.setSupervisor_submit_on(date);
	    record.setHod_status(AppConstants.waitingStatus);
	}

	private void processSanitizationList(List<PunchingSanitationListF24> sanitationListF24s) {
	    for (PunchingSanitationListF24 sanitationList : sanitationListF24s) {
	        Long sanitationId = sanitationList.getId();

	        if (sanitationId != null) {
	            PunchingSanitationListF24 existingSanitationObj = sanitationListRepository.getSanitationListById(sanitationId);
	            sanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
	            sanitationList.setCreatedAt(existingSanitationObj.getCreatedAt());
	            sanitationList.setCreatedBy(existingSanitationObj.getCreatedBy());
//	            sanitationList.setHandSanitizationId(existingSanitationObj.getHandSanitizationId());
	        }

	        sanitationListRepository.save(sanitationList);
	    }
	}

	private void saveHistory(PunchingHandSanitationF24 productChangeOver, Date date) {
	    PunchingHandSanitationHistoryF24 productChangeOverHistory = new PunchingHandSanitationHistoryF24();
	    copyDetailsToHistory(productChangeOver, productChangeOverHistory);

	    String historyDate = productChangeOverHistory.getDate();
	    String historyShift = productChangeOverHistory.getShift();

	    int version = handSanitationRepositoryHistory.getMaximumVersion(historyDate, historyShift)
	                    .map(temp -> temp + 1).orElse(1);
	    productChangeOverHistory.setVersion(version);
	    handSanitationRepositoryHistory.save(productChangeOverHistory);

	    saveHistorySanitizationList(productChangeOver, productChangeOverHistory);
	}

	private void copyDetailsToHistory(PunchingHandSanitationF24 source, PunchingHandSanitationHistoryF24 target) {
	    target.setUnit(source.getUnit());
	    target.setFormatName(source.getFormatName());
	    target.setFormatNo(source.getFormatNo());
	    target.setRevisionNo(source.getRevisionNo());
	    target.setSopNumber(source.getSopNumber());
	    target.setDate(source.getDate());
	    target.setShift(source.getShift());
	    target.setSupervisor_status(source.getSupervisor_status());
	    target.setSupervisor_sign(source.getSupervisor_sign());
	    target.setSupervisor_submit_by(source.getSupervisor_submit_by());
	    target.setSupervisor_submit_id(source.getSupervisor_submit_id());
	    target.setSupervisor_submit_on(source.getSupervisor_submit_on());
	    target.setHod_status(source.getHod_status());
	}

	private void saveHistorySanitizationList(PunchingHandSanitationF24 productChangeOver, PunchingHandSanitationHistoryF24 historyRecord) {
	    for (PunchingSanitationListF24 sanitationList : productChangeOver.getSanitizationList()) {
	        PunchingSanitationListHistoryF24 history = new PunchingSanitationListHistoryF24();
	        history.setHandSanitizationId(historyRecord.getHandSanitizationId());
	        history.setHour1(sanitationList.getHour1());
	        history.setHour2(sanitationList.getHour2());
	        history.setHour3(sanitationList.getHour3());
	        history.setHour4(sanitationList.getHour4());
	        history.setHour5(sanitationList.getHour5());
	        history.setHour6(sanitationList.getHour6());
	        history.setHour7(sanitationList.getHour7());
	        history.setHour8(sanitationList.getHour8());
	        history.setIdNumber(sanitationList.getIdNumber());
	        history.setRemarks(sanitationList.getRemarks());
	        history.setSerialNumber(sanitationList.getSerialNumber());
	        history.setName(sanitationList.getName());
	        sanitationListHistoyRepository.save(history);
	    }
	}

	
		// APPROVE OR REJECT
	
	public ResponseEntity<?> approveOrRejectHandSanitation(ApproveResponse approveResponse, HttpServletRequest http) {
		
		SCAUtil sca = new SCAUtil();
		
		PunchingHandSanitationF24 bleachCheckListF42 = new PunchingHandSanitationF24();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			bleachCheckListF42 = handSanitationRepository.fetchHandSanitizationABPressF41ById(approveResponse.getId());
			
			PunchingHandSanitationHistoryF24 bleachLayDownCheckListF42History = new PunchingHandSanitationHistoryF24();
			
			String supervisiorStatus = bleachCheckListF42.getSupervisor_status();
			
			String hodStatus = bleachCheckListF42.getHod_status();
			
			if(supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus) && hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {
				
				if(userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
					
					if(approveResponse.getStatus().equals("Approve")) {
						
						bleachCheckListF42.setHod_status(AppConstants.hodApprovedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_by(userName);
						bleachCheckListF42.setHod_submit_id(userId);
						
						bleachCheckListF42.setHod_sign(userName);
						
						handSanitationRepository.save(bleachCheckListF42);
						
						bleachLayDownCheckListF42History = handSanitationRepositoryHistory.findLastSubmittedRecord(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
					
						
						handSanitationRepositoryHistory.save(bleachLayDownCheckListF42History);
						
						bleachCheckListF42 = null;
						bleachLayDownCheckListF42History = null;
						
						return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);
						
					}
					
					else if(approveResponse.getStatus().equals("Reject")) {
						
						String reason = approveResponse.getRemarks();
						bleachCheckListF42.setReason(reason);
						bleachCheckListF42.setHod_status(AppConstants.hodRejectedStatus);
						bleachCheckListF42.setHod_submit_on(date);
						bleachCheckListF42.setHod_submit_id(userId);
						bleachCheckListF42.setHod_submit_by(userName);
						
						bleachCheckListF42.setHod_sign(userName);
						
						handSanitationRepository.save(bleachCheckListF42);

						
						bleachLayDownCheckListF42History = handSanitationRepositoryHistory.findLastSubmittedRecord(bleachCheckListF42.getDate(), bleachCheckListF42.getShift());
						
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_submit_on(date);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						
						handSanitationRepositoryHistory.save(bleachLayDownCheckListF42History);
						
						bleachCheckListF42 = null;
						bleachLayDownCheckListF42History = null;
						
						return new ResponseEntity<>(new ApiResponse(true, "Hod Rejected Successfully"), HttpStatus.OK);
						
					} 
					
					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					
				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
				
			}
			
			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Submitted"), HttpStatus.BAD_REQUEST);
			}
			
		} catch(Exception e) {
			
			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(
					new ApiResponse(false, "Failed to approve/reject Hand Sanitation " + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
	}
	
	
	public ResponseEntity<?> getHandSanitationByDateShift(String date, String shift) {
		
		PunchingHandSanitationF24 handSanitationF24;
		
		try {
			handSanitationF24 = handSanitationRepository.handSanitationDetailsByDate(date, shift);
		} catch(Exception e) {
			
			String msg = e.getMessage();
			e.printStackTrace();
			logger.error("Unable to get record" + msg);
			return new ResponseEntity(
					new ApiResponse(false, "Failed to get record" + msg),
					HttpStatus.BAD_REQUEST);
			
			
		}
		
		return new ResponseEntity(handSanitationF24, HttpStatus.OK);
	}
	
	
	public ResponseEntity<?> getHandSanitationSummary() {
		
		String userRole = getUserRole();
		
		List<PunchingHandSanitationF24> handSanitationF24s = new ArrayList<>();
		
		try {
			
			if(userRole.equals("ROLE_SUPERVISOR")) {
				
				handSanitationF24s = handSanitationRepository.getPunchingSupervisorSummary();
				
			} else if(userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
				
				handSanitationF24s = handSanitationRepository.getPunchingHodSummary();
				
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authorized to access Hand Sanitation form"), HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity(handSanitationF24s, HttpStatus.OK);
		} catch(Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get summary record" + msg);
			return new ResponseEntity(
					new ApiResponse(false, "Failed to get summary record" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
	}
	
		// HAND SANITATION - PRINTING PARAMETERS
	
	public ResponseEntity<?> handSanitationPrint(String date, String shift) {
		
		List<PunchingHandSanitationF24> handSanitationList = new ArrayList<>();
		
		try {
			
			handSanitationList = handSanitationRepository.getHandSanitationPrint(date, shift);
			
		} catch(Exception ex) {
			String msg = ex.getMessage();
			ex.printStackTrace();
			logger.error("Unable to get hand Sanitation List" + msg);
			return new ResponseEntity(
					new ApiResponse(false, "Unable to get hand Sanitation List" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(handSanitationList, HttpStatus.OK);
		
	}
	
	
	// GET USER ROLE
		private String getUserRole() {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (authentication != null && authentication.isAuthenticated()) {
				return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
						.orElse(null);
			}
			return null;
		}
	
	
}
