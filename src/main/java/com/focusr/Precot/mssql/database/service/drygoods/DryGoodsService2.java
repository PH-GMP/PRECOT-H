package com.focusr.Precot.mssql.database.service.drygoods;

import java.time.LocalDateTime;
import java.time.ZoneId;
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
import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsHouseKeepingCheckListF14;
import com.focusr.Precot.mssql.database.model.drygoods.audit.DryGoodsHouseKeepingCheckListHistoryF14;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.DryGoodsHouseKeepingCheckListF14Repo;
import com.focusr.Precot.mssql.database.repository.drygoods.audit.DryGoodsHouseKeepingCheckListHistoryF14Repo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.EmailHtmlLoader;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.DryGoodsMailFunction;

@Service
public class DryGoodsService2 {

	@Autowired
	private EmailHtmlLoader emailhtmlloader;

	@Autowired
	private EmailDetailsRepository emaildetailsrepository;

	@Autowired
	UserRepository userrepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserImageDetailsRepository imageRepository;

	SCAUtil sca = new SCAUtil();

	Logger log = LoggerFactory.getLogger(DryGoodsService2.class);

	@Autowired
	private DryGoodsHouseKeepingCheckListF14Repo dryGoodsHouseKeepingCheckListF14Repo;

	@Autowired
	private DryGoodsHouseKeepingCheckListHistoryF14Repo dryGoodsHouseKeepingCheckListHistoryF14Repo;
	
	@Autowired
	private DryGoodsMailFunction  dryGoodsMailFunction;

	public ResponseEntity<?> SubmitHouseKeepingF14(DryGoodsHouseKeepingCheckListF14 details, HttpServletRequest http) {

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			switch (userRole) {

			case "ROLE_SUPERVISOR":

				details.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				details.setSupervisor_submit_on(date);
				details.setSupervisor_submit_by(userName);
				details.setSupervisor_submit_id(userId);
				details.setSupervisor_sign(userName);
				details.setHr_status(AppConstants.waitingStatus);
				details.setHr_mail_status(AppConstants.waitingStatus);
				details.setHod_status("");

				// IMAGE

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				details.setSupervisisorSignature(signature);

				dryGoodsHouseKeepingCheckListF14Repo.save(details);

				// AUDIT

				DryGoodsHouseKeepingCheckListHistoryF14 houseKeepingCheckListHistoryF14 = new DryGoodsHouseKeepingCheckListHistoryF14();

				BeanUtils.copyProperties(details, houseKeepingCheckListHistoryF14);

				String historyDate = houseKeepingCheckListHistoryF14.getDate();

				int version = dryGoodsHouseKeepingCheckListHistoryF14Repo.getMaximumVersion(historyDate)
						.map(temp -> temp + 1).orElse(1);

				houseKeepingCheckListHistoryF14.setVersion(version);

				dryGoodsHouseKeepingCheckListHistoryF14Repo.save(houseKeepingCheckListHistoryF14);
				


				break;
				

			default:
				return new ResponseEntity<>(
						new ApiResponse(false, userRole
								+ " Cannot submit House keeping forms. Please login as Supervisor to submit form"),
						HttpStatus.FORBIDDEN);
			}
			
//          Malil logic

				try {

					dryGoodsMailFunction.sendEmailToHrF014(details);
				} catch (Exception ex) {
					return new ResponseEntity<>(
							new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}

			return new ResponseEntity(new ApiResponse(true, "Supervisior Submitted Sucessfully"), HttpStatus.OK);

		} catch (Exception e) {
			log.error(
					"***************** Unable to Submit House Keeping Check List F14 Details!  *********************\n"
							+ e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Submit House Keeping Check List F14 Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getHouseKeepingF14(String date, HttpServletRequest http) {

		List<DryGoodsHouseKeepingCheckListF14> details = null;

		try {
			String userRole = getUserRole();

			Long userId = sca.getUserIdFromRequest(http, tokenProvider);

			details = dryGoodsHouseKeepingCheckListF14Repo.getDetailsBaseDate(date);

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House Keeping F14: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// SUMMARY

	public ResponseEntity<?> getHouseKeepingSummaryF14(HttpServletRequest http) {

		List<DryGoodsHouseKeepingCheckListF14> details = null;

		try {
			String userRole = getUserRole();

			if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HR")
					|| userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) 
			{

				details = dryGoodsHouseKeepingCheckListF14Repo.getSummary();
			}

//			} else if (userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
//
//				details = dryGoodsHouseKeepingCheckListF14Repo.getHodSummaryDetails();
//				
//			} else if (userRole.equals("ROLE_SUPERVISOR")) {
//
//				details = dryGoodsHouseKeepingCheckListF14Repo.getHRSummaryDetails();
//			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Please log in with the correct role"),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House Keeping Details: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> getHouseKeepingMonthYearSummaryF14(String month, String year) {

		List<DryGoodsHouseKeepingCheckListF14> details = null;

		try {

			details = dryGoodsHouseKeepingCheckListF14Repo.getMonthandYear(month, year);

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting House Keeping Details F14: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<?> approveRejectHouseKeepingF14(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		DryGoodsHouseKeepingCheckListF14 bleachContRawCottonF05 = new DryGoodsHouseKeepingCheckListF14();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userrepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			bleachContRawCottonF05 = dryGoodsHouseKeepingCheckListF14Repo
					.getHousekeepingRecordById(approvalResponse.getId());

			DryGoodsHouseKeepingCheckListHistoryF14 bleachLayDownCheckListF42History = new DryGoodsHouseKeepingCheckListHistoryF14();

			String supervisiorStatus = bleachContRawCottonF05.getSupervisor_status();

			String hrStatus = bleachContRawCottonF05.getHr_status();

			String hodStatus = bleachContRawCottonF05.getHod_status();

			if (userRole.equalsIgnoreCase("ROLE_HR")) {

				if (supervisiorStatus.equalsIgnoreCase(AppConstants.supervisorApprovedStatus)
						&& hrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setHr_sign(userName);
						bleachContRawCottonF05.setHr_status(AppConstants.hrApprovedStatus);
						bleachContRawCottonF05.setHr_submit_by(userName);
						bleachContRawCottonF05.setHr_submit_id(userId);
						bleachContRawCottonF05.setHr_submit_on(date);
						bleachContRawCottonF05.setHod_status(AppConstants.waitingStatus);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						bleachContRawCottonF05.setHrSignature(signature);

						dryGoodsHouseKeepingCheckListF14Repo.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dryGoodsHouseKeepingCheckListHistoryF14Repo
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setHr_sign(userName);
						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrApprovedStatus);
						bleachLayDownCheckListF42History.setHr_submit_by(userName);
						bleachLayDownCheckListF42History.setHr_submit_id(userId);
						bleachLayDownCheckListF42History.setHr_submit_on(date);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.waitingStatus);

						dryGoodsHouseKeepingCheckListHistoryF14Repo.save(bleachLayDownCheckListF42History);
						

						
						
						return new ResponseEntity<>(new ApiResponse(true, "HR Approved Successfully"), HttpStatus.OK);
						
						
					} else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHr_sign(userName);
						bleachContRawCottonF05.setHr_status(AppConstants.hrRejectedStatus);
						bleachContRawCottonF05.setHr_submit_by(userName);
						bleachContRawCottonF05.setHr_submit_id(userId);
						bleachContRawCottonF05.setHr_submit_on(date);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						bleachContRawCottonF05.setHrSignature(signature);

						dryGoodsHouseKeepingCheckListF14Repo.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dryGoodsHouseKeepingCheckListHistoryF14Repo
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHr_sign(userName);
						bleachLayDownCheckListF42History.setHr_status(AppConstants.hrRejectedStatus);
						bleachLayDownCheckListF42History.setHr_submit_by(userName);
						bleachLayDownCheckListF42History.setHr_submit_id(userId);
						bleachLayDownCheckListF42History.setHr_submit_on(date);

						dryGoodsHouseKeepingCheckListHistoryF14Repo.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "HR Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"),
								HttpStatus.BAD_REQUEST);
					}

				} else if (hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus)
						|| hrStatus.equalsIgnoreCase(AppConstants.hrRejectedStatus)) {

					return new ResponseEntity(new ApiResponse(false, "Already HR Approved or Rejected"),
							HttpStatus.BAD_REQUEST);
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status for HR Approval"),
							HttpStatus.BAD_REQUEST);
				}

			} else if (userRole.equalsIgnoreCase("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				if (hrStatus.equalsIgnoreCase(AppConstants.hrApprovedStatus)
						&& hodStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

					if (approvalResponse.getStatus().equals("Approve")) {

						bleachContRawCottonF05.setHod_sign(userName);
						bleachContRawCottonF05.setHod_status(AppConstants.hodApprovedStatus);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);
						bleachContRawCottonF05.setHod_submit_on(date);

						Optional<UserImageDetails> imageDetailsOpt = imageRepository
								.fetchItemDetailsByUsername(userName);
						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
						bleachContRawCottonF05.setHodSignature(signature);

						dryGoodsHouseKeepingCheckListF14Repo.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dryGoodsHouseKeepingCheckListHistoryF14Repo
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodApprovedStatus);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_submit_on(date);

						dryGoodsHouseKeepingCheckListHistoryF14Repo.save(bleachLayDownCheckListF42History);
						
						try {

							dryGoodsMailFunction.sendEmailToHodF014Hod(bleachContRawCottonF05);
						} catch (Exception ex) {
							return new ResponseEntity<>(
									new ApiResponse(false, "Approved but Unable to send mail ! "),
									HttpStatus.OK);
						}

						return new ResponseEntity<>(new ApiResponse(true, "Hod Approved Successfully"), HttpStatus.OK);

					} else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						bleachContRawCottonF05.setReason(reason);
						bleachContRawCottonF05.setHod_sign(userName);
						bleachContRawCottonF05.setHod_status(AppConstants.hodRejectedStatus);
						bleachContRawCottonF05.setHod_submit_by(userName);
						bleachContRawCottonF05.setHod_submit_id(userId);
						bleachContRawCottonF05.setHod_submit_on(date);

//						Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
//						byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
//						bleachContRawCottonF05.setHrSignature(signature);

						bleachContRawCottonF05.setHod_sign(userName);

						dryGoodsHouseKeepingCheckListF14Repo.save(bleachContRawCottonF05);

						bleachLayDownCheckListF42History = dryGoodsHouseKeepingCheckListHistoryF14Repo
								.fetchLastSubmittedRecordLaydown(bleachContRawCottonF05.getDate());

						bleachLayDownCheckListF42History.setReason(reason);
						bleachLayDownCheckListF42History.setHod_sign(userName);
						bleachLayDownCheckListF42History.setHod_status(AppConstants.hodRejectedStatus);
						bleachLayDownCheckListF42History.setHod_submit_by(userName);
						bleachLayDownCheckListF42History.setHod_submit_id(userId);
						bleachLayDownCheckListF42History.setHod_submit_on(date);

						dryGoodsHouseKeepingCheckListHistoryF14Repo.save(bleachLayDownCheckListF42History);

						return new ResponseEntity<>(new ApiResponse(true, "Hod Rejected Successfully"), HttpStatus.OK);

					} else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status for Hod Approval"),
								HttpStatus.BAD_REQUEST);
					}

				} else if (hodStatus.equalsIgnoreCase(AppConstants.hodApprovedStatus)
						|| hodStatus.equalsIgnoreCase(AppConstants.hodRejectedStatus)) {

					return new ResponseEntity(new ApiResponse(false, "Already HOD Approved or Rejected"),
							HttpStatus.BAD_REQUEST);
				} else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status for HOD Approval"),
							HttpStatus.BAD_REQUEST);
				}

			} else {

				return new ResponseEntity(
						new ApiResponse(false, hodStatus + "Login with Valid Role to Approve/Reject Form"),
						HttpStatus.BAD_REQUEST);

			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
