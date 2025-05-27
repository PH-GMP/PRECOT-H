package com.focusr.Precot.mssql.database.service.splunance;

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
import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsWinterF005;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsWinterHistoryF005;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupDetailsWinterF005Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupDetailsWinterHistoryF005Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceMailFunction;

/**
 * 
 * @author Sivaprakasam.V
 *
 */

@Service
public class SpulanceService4 {

	Logger log = LoggerFactory.getLogger(SpulanceService4.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	SpunlaceMailFunction spunlacemailfunction;
	
	@Autowired
	private UserRepository userrepository;

	@Autowired
	ProcessSetupDetailsWinterF005Repository processsetupdetailswinterf005repository;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	@Autowired
	ProcessSetupDetailsWinterHistoryF005Repository processsetupdetailswinterhistoryf005repository;

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> saveWinderF005(ProcessSetupDetailsWinterF005 details, HttpServletRequest http) {
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {

				details.setOperator_status(AppConstants.operatorSave);
				details.setOperator_save_by(userName);
				details.setOperator_save_on(date);
				details.setOperator_save_id(userId);
//				details.setSupervisor_status(AppConstants.waitingStatus);
//				details.setHod_status(AppConstants.waitingStatus);
//				details.setSupervisior_mail_status(AppConstants.waitingStatus);
//				details.setHod_mail_status(AppConstants.waitingStatus);
				

				processsetupdetailswinterf005repository.save(details);

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);

		} catch (Exception e) {

			log.error("Unable to Save Winder F005 Details!", e);

			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Winder F005 Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitWinderF005(ProcessSetupDetailsWinterF005 details, HttpServletRequest http) {
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userrepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (userRole.equalsIgnoreCase(AppConstantsSplunance.operatorRole)) {

				details.setOperator_status(AppConstants.operatorApprove);
				details.setOperator_submitted_by(userName);
				details.setOperator_submitted_on(date);
				details.setOperator_submitted_id(userId);
				details.setOperator_sign(userName);
				details.setSupervisor_status(AppConstants.waitingStatus);
				details.setSupervisior_mail_status(AppConstants.waitingStatus);
				
//				details.setHod_status(AppConstants.waitingStatus);
//				details.setHod_mail_status(AppConstants.waitingStatus);
				
				details.setHod_status("");
				details.setHod_mail_status("");

				processsetupdetailswinterf005repository.save(details);

				// IMAGE
				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				details.setOperator_signature_image(signature);

				processsetupdetailswinterf005repository.save(details);

				// AUDIT

				ProcessSetupDetailsWinterHistoryF005 rejectionReportHistory = new ProcessSetupDetailsWinterHistoryF005();

				BeanUtils.copyProperties(details, rejectionReportHistory);

				String date1 = rejectionReportHistory.getDate();

				String shift1 = rejectionReportHistory.getShift();

				String order1 = rejectionReportHistory.getOrder_no();

				int version = processsetupdetailswinterhistoryf005repository.getMaximumVersion(date1, shift1, order1)
						.map(temp -> temp + 1).orElse(1);

				rejectionReportHistory.setVersion(version);

				processsetupdetailswinterhistoryf005repository.save(rejectionReportHistory);
				
				try {

					spunlacemailfunction.sendEmailToSupervisorF005(details);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}

			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity(new ApiResponse(true, "Approved Sucessfully"), HttpStatus.OK);

		} catch (Exception e) {

			log.error("Unable to Submit Winder F005 Details!", e);

			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Winder F005 Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getWinderF005(String order_no, String date, String shift) {

		try {

			List<ProcessSetupDetailsWinterF005> getWinderF005 = processsetupdetailswinterf005repository
					.getDetailstUsageById(order_no, date, shift);

			if (getWinderF005 == null) {

				getWinderF005 = new ArrayList<ProcessSetupDetailsWinterF005>();
			}

			return new ResponseEntity<>(getWinderF005, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Error Get Winder Details!", e);
			return new ResponseEntity<>("Error Get Winder Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	public ResponseEntity<?> getOperatorSummeryF005(HttpServletRequest http) {

		List<ProcessSetupDetailsWinterF005> details = null;
		try {

			details = processsetupdetailswinterf005repository.operatorSummary();

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to Submit Winder F005 Summery Details!", e);

			return new ResponseEntity<>("Unable to Submit Winder F005 Summery Details! " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	public ResponseEntity<?> supervisorHodSummary(HttpServletRequest http) {

		List<ProcessSetupDetailsWinterF005> details = null;
		try {

			details = processsetupdetailswinterf005repository.supervisorHodSummary();

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to Submit Winder F005 Summery Details!", e);

			return new ResponseEntity<>("Unable to Submit Winder F005 Summery Details! " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> getWinderPrintDetailsF005(String order_no, String date, String shift) {

		try {

			List<ProcessSetupDetailsWinterF005> getWinderF005 = processsetupdetailswinterf005repository
					.getPrintDetails(order_no, date, shift);

			if (getWinderF005 == null || getWinderF005.isEmpty()) {

				return new ResponseEntity<>(
						new ApiResponse(false, "HOD not yet Approved for this order_no = " + order_no),
						HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(getWinderF005, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Error Get Winder Details!", e);
			return new ResponseEntity<>("Error Get Winder Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	public ResponseEntity<?> approveRejectionReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ProcessSetupDetailsWinterF005 bleachContRawCottonF05 = new ProcessSetupDetailsWinterF005();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachContRawCottonF05 = processsetupdetailswinterf005repository.findFormById(approvalResponse.getId());

			ProcessSetupDetailsWinterHistoryF005 processsetupdetailswinterhistoryf005 = new ProcessSetupDetailsWinterHistoryF005();

			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();

			String hodStatus = bleachContRawCottonF05.getHod_status();

//			UserImageDetails imageDetails = new UserImageDetails();

			if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
					&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setHod_status(AppConstants.hodApprovedStatus);
						bleachContRawCottonF05.setHod_submit_on(date);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHod_signature_image(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						processsetupdetailswinterf005repository.save(bleachContRawCottonF05);

						processsetupdetailswinterhistoryf005 = processsetupdetailswinterhistoryf005repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

						processsetupdetailswinterhistoryf005.setHod_status(AppConstants.hodApprovedStatus);
						processsetupdetailswinterhistoryf005.setHod_submit_on(date);
						processsetupdetailswinterhistoryf005.setHod_submit_by(userName);
						processsetupdetailswinterhistoryf005.setHod_submit_id(userId);
						processsetupdetailswinterhistoryf005.setHod_sign(userName);

						processsetupdetailswinterhistoryf005repository.save(processsetupdetailswinterhistoryf005);

						return new ResponseEntity<>(new ApiResponse(true, "HOD Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHod_status(AppConstants.hodRejectedStatus);
						bleachContRawCottonF05.setHod_submit_on(date);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHod_signature_image(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						processsetupdetailswinterf005repository.save(bleachContRawCottonF05);

						processsetupdetailswinterhistoryf005 = processsetupdetailswinterhistoryf005repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

						processsetupdetailswinterhistoryf005.setReason(reason);
						processsetupdetailswinterhistoryf005.setHod_status(AppConstants.hodRejectedStatus);
						processsetupdetailswinterhistoryf005.setHod_submit_on(date);
						processsetupdetailswinterhistoryf005.setHod_submit_by(userName);
						processsetupdetailswinterhistoryf005.setHod_submit_id(userId);
						processsetupdetailswinterhistoryf005.setHod_sign(userName);

						processsetupdetailswinterhistoryf005repository.save(processsetupdetailswinterhistoryf005);

						return new ResponseEntity<>(new ApiResponse(true, " HOD Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else if (bleachContRawCottonF05.getOperator_status().equalsIgnoreCase(AppConstants.operatorApprove)
					&& supervisiorStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						bleachContRawCottonF05.setSupervisor_submit_on(date);
						bleachContRawCottonF05.setSupervisor_submit_by(userName);
						bleachContRawCottonF05.setSupervisor_submit_id(userId);
						
						bleachContRawCottonF05.setHod_status(AppConstants.waitingStatus);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setSupervisor_signature_image(signature);

						bleachContRawCottonF05.setSupervisor_sign(userName);

						processsetupdetailswinterf005repository.save(bleachContRawCottonF05);

						processsetupdetailswinterhistoryf005 = processsetupdetailswinterhistoryf005repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

						processsetupdetailswinterhistoryf005
								.setSupervisor_status(AppConstants.supervisorApprovedStatus);
						processsetupdetailswinterhistoryf005.setSupervisor_submit_on(date);
						processsetupdetailswinterhistoryf005.setSupervisor_submit_by(userName);
						processsetupdetailswinterhistoryf005.setSupervisor_submit_id(userId);
						processsetupdetailswinterhistoryf005.setSupervisor_sign(userName);
						processsetupdetailswinterhistoryf005.setHod_status(AppConstants.waitingStatus);

						processsetupdetailswinterhistoryf005repository.save(processsetupdetailswinterhistoryf005);
						
						try {

							spunlacemailfunction.sendEmailToHodF005(bleachContRawCottonF05);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, " Supervisor Approved Successfully"),
								HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						bleachContRawCottonF05.setSupervisor_submit_on(date);
						bleachContRawCottonF05.setSupervisor_submit_by(userName);
						bleachContRawCottonF05.setSupervisor_submit_id(userId);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setSupervisor_signature_image(signature);

						bleachContRawCottonF05.setSupervisor_sign(userName);

						processsetupdetailswinterf005repository.save(bleachContRawCottonF05);

						processsetupdetailswinterhistoryf005 = processsetupdetailswinterhistoryf005repository
								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrder_no());

//						bleachLayDownCheckListF42History = dailyRejectionReportF007RepositoryHistory
//								.fetchLastSubmittedRecord(bleachContRawCottonF05.getDate(),
//										bleachContRawCottonF05.getShift(), bleachContRawCottonF05.getOrderNo());

						processsetupdetailswinterhistoryf005.setReason(reason);
						processsetupdetailswinterhistoryf005
								.setSupervisor_status(AppConstants.supervisorRejectedStatus);
						processsetupdetailswinterhistoryf005.setSupervisor_submit_on(date);
						processsetupdetailswinterhistoryf005.setSupervisor_submit_by(userName);
						processsetupdetailswinterhistoryf005.setSupervisor_submit_id(userId);
						processsetupdetailswinterhistoryf005.setSupervisor_sign(userName);

						processsetupdetailswinterhistoryf005repository.save(processsetupdetailswinterhistoryf005);

						return new ResponseEntity<>(new ApiResponse(true, " Supervisor Rejected Successfully"),
								HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {

					return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Approve"),
							HttpStatus.BAD_REQUEST);

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	// Get User Role

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
